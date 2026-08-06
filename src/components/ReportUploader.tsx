import { useState, useCallback, useRef } from 'react';
import mammoth from 'mammoth';
import { ACTIVE_PERSONS, ALL_PERSONS } from '../data/mockPersons';
import { usePersons } from '../hooks/usePersons';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  UploadCloud, FileText, CheckCircle2, CheckCircle, AlertCircle, AlertTriangle, Loader2,
  X, Users, GraduationCap, BrainCircuit, Coins, FileCheck,
  ChevronRight, Sparkles, BarChart3, CalendarDays, Settings,
  RefreshCw
} from 'lucide-react';
import { saveDynamicTrends, saveDynamicHistory, addUploadedDate, addWeekLabel, addUploadHistory, getUploadedDates } from '../lib/dynamicStorage';
import { notifyPersonsUpdated } from '../hooks/usePersons';
import { cloudStorage } from '../services/cloudStorage';
import { getTodayStr, formatTimeInfo } from '../lib/dateContext';
import { callKimiApi } from '../lib/kimiApi';
import { callKimiDeepAnalysis, estimateDeepAnalysisCost } from './DeepAnalysisPanel';
import { saveDeepAnalysis } from '../lib/dynamicStorage';
import type { WeekTrend } from '../data/mockTrends';


type Phase = 'upload' | 'inactive_check' | 'new_members' | 'review' | 'analyzing' | 'done';

interface AnalysisProgress {
  currentPerson: string;
  completed: number;
  total: number;
  estimatedCost: number;
  tokensUsed: number;
  logs: string[];
}

// 注意：以下函数替代了原来的静态常量，确保使用动态人员数据
function getActiveResearcherNames(persons: typeof ACTIVE_PERSONS) { return persons.filter(p => ['researcher', 'associate_researcher', 'assistant_researcher', 'postdoc'].includes(p.role)).map(p => p.name); }
function getActiveStudentNames(persons: typeof ACTIVE_PERSONS) { return persons.filter(p => ['phd', 'undergraduate', 'visitor'].includes(p.role)).map(p => p.name); }

// Cost estimation: Kimi k2.6（周报批量分析）
// 官方定价 (platform.kimi.com)：
// - 输入(缓存未命中): ¥6.50/百万tokens
// - 输入(缓存命中): ¥1.10/百万tokens
// - 输出: ¥27.00/百万tokens
// 实际消耗：~400 tokens 输入（含周报全文）+ ~70 tokens 输出 = ~470 tokens/人
const TOKENS_PER_PERSON = 470;
// 保守预估按缓存未命中计算
const COST_PER_PERSON = (400 / 1_000_000) * 6.50 + (70 / 1_000_000) * 27.00; // ≈ 0.0045元/人

/**
 * Parse date from filename.
 * Supports formats like: 2026.4.30, 2026.04.30, 2026-04-30, etc.
 * Returns normalized date string like '2026.04.30' or null if not found.
 */
function parseDateFromFileName(fileName: string): string | null {
  // Match patterns like 2026.4.30, 2026.04.30, 2026-04-30, 2026/04/30, 2026年04月30日
  const patterns = [
    /(2026)[.\-/](\d{1,2})[.\-/](\d{1,2})/,
    /(2026)年(\d{1,2})月(\d{1,2})日/,
  ];

  for (const pattern of patterns) {
    const match = fileName.match(pattern);
    if (match) {
      const [, year, month, day] = match;
      const normalizedMonth = month.padStart(2, '0');
      const normalizedDay = day.padStart(2, '0');
      return `${year}.${normalizedMonth}.${normalizedDay}`;
    }
  }

  return null;
}

/**
 * 从 docx 文件中提取纯文本 + HTML
 * HTML 用于检测新成员（保留列表结构）
 */
async function extractTextFromDocx(file: File): Promise<{ text: string; html: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const [textResult, htmlResult] = await Promise.all([
    mammoth.extractRawText({ arrayBuffer }),
    mammoth.convertToHtml({ arrayBuffer }),
  ]);
  return { text: textResult.value, html: htmlResult.value };
}

/**
 * 从周报全文中按编号提取每个人名及其周报内容
 * 基于中文编号（一、二、三...）自动识别所有成员，不依赖现有成员列表
 * 返回：人名 → 该人的周报段落文本
 */
function extractPersonReports(fullText: string): Record<string, string> {
  const reports: Record<string, string> = {};
  const lines = fullText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  // 人名编号行：必须以中文数字+顿号开头（如 "一、虞阳"）
  // 注意：顿号后可能有空格（如 "十二、 陈飞霖"）
  const nameLineRegex = /^[一二三四五六七八九十百]+、\s*(.+)$/;

  // 从编号行提取人名
  function extractName(line: string): string | null {
    const match = line.match(nameLineRegex);
    if (!match) return null;
    const namePart = match[1].trim();
    if (!namePart) return null;

    // 尝试提取中文名（最后的中文名部分）
    const cnMatch = namePart.match(/([\u4e00-\u9fa5]{2,4})$/);
    if (cnMatch) return cnMatch[1];

    // 纯英文名（如 Sara Elena Bruj）
    if (/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(namePart)) return namePart;

    // 英文名+中文名混合（如 Jonah Johnson 江骏浪）— 提取中文名
    const mixedMatch = namePart.match(/([\u4e00-\u9fa5]{2,4})$/);
    if (mixedMatch) return mixedMatch[1];

    return namePart;
  }

  let currentName: string | null = null;
  let currentContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检查是否是人名编号行（中文数字+顿号开头）
    const newName = extractName(line);
    if (newName) {
      // 保存前一个人的内容
      if (currentName && currentContent.length > 0) {
        const content = currentContent.join('\n');
        if (content.length >= 10) {
          reports[currentName] = content;
        }
      }
      // 开始新的人
      currentName = newName;
      currentContent = [];
    } else if (currentName) {
      // 不是人名编号行 → 积累为当前人的周报内容
      // 周报内容中的阿拉伯数字（1. 2. 3.）不需要特殊处理
      currentContent.push(line);
    }
  }

  // 保存最后一个人的内容
  if (currentName && currentContent.length > 0) {
    const content = currentContent.join('\n');
    if (content.length >= 10) {
      reports[currentName] = content;
    }
  }

  console.log('[Extract] 从周报中提取到', Object.keys(reports).length, '人:', Object.keys(reports).join('、'));
  return reports;
}

/**
 * 从 docx 转换的 HTML 中检测新成员
 * 周报中的成员名在 <p> 段落中，格式为 "N、名字" 或 "N、英文名 中文名"
 */
function detectNewMembersFromHtml(html: string, existingNames: string[]): string[] {
  const detectedNames: string[] = [];
  const existingNamesSet = new Set(existingNames);
  const commonSurnames = new Set([
    '王','李','张','刘','陈','杨','赵','黄','周','吴','徐','孙','胡','朱','高','林','何','郭','马','罗',
    '梁','宋','郑','谢','韩','唐','冯','于','董','萧','程','曹','袁','邓','许','傅','沈','曾','彭','吕',
    '苏','卢','蒋','蔡','贾','丁','魏','薛','叶','阎','余','潘','杜','戴','夏','钟','汪','田','任','姜',
    '范','方','石','姚','谭','廖','邹','熊','金','陆','郝','孔','白','崔','康','毛','邱','秦','江','史',
    '顾','侯','邵','孟','龙','万','段','雷','钱','汤','尹','黎','易','常','武','乔','贺','赖','龚','文',
    '严','欧','虞',
  ]);

  // 提取所有 <p> 标签的内容（成员名在 <p> 段落中，不在 <li> 中）
  const pMatches = html.matchAll(/<p>(.*?)<\/p>/gi);
  for (const match of pMatches) {
    const pContent = match[1].replace(/<[^>]+>/g, '').trim(); // 去掉 <strong> 等内部标签
    if (!pContent || pContent.length < 3) continue;

    // 匹配模式："N、名字" 或 "N、英文名 中文名"
    // 如 "一、王旭杰", "十六、Jonah Johnson 江骏浪", "十七、王晨荷"
    let candidate: string | null = null;

    // 模式1: "N、中文名" (一、王旭杰, 十七、王晨荷) — 注意顿号后可能有空格如 "十二、 陈飞霖"
    const match1 = pContent.match(/^[一二三四五六七八九十百]+、\s*([\u4e00-\u9fa5]{2,4})\s*$/);
    if (match1) {
      candidate = match1[1];
    } else {
      // 模式2: "N、英文名 中文名" (十六、Jonah Johnson 江骏浪) — 顿号后可能有空格
      const match2 = pContent.match(/^[一二三四五六七八九十百]+、\s*[A-Za-z\s]+\s+([\u4e00-\u9fa5]{2,4})\s*$/);
      if (match2) {
        candidate = match2[1];
      }
    }

    if (!candidate) continue;

    // 排除已知成员
    if (existingNamesSet.has(candidate)) continue;

    // 排除排除词库
    const excludeWords = new Set(['本周','下周','基于','通过','利用','研究','设计','实验','分析','测试','制备','优化']);
    if (excludeWords.has(candidate)) continue;

    // 验证：候选的第一个字应该是常见姓氏
    if (!commonSurnames.has(candidate.charAt(0))) continue;

    if (!detectedNames.includes(candidate)) {
      console.log('[Detect] ✅ HTML检测到新成员:', candidate, '| 原文:', pContent);
      detectedNames.push(candidate);
    }
  }

  console.log('[Detect] HTML检测结果:', detectedNames);
  return detectedNames;
}

/**
 * 从周报全文中自动发现人名（备用方案：基于纯文本编号行）
 */
function detectNamesFromReport(fullText: string, existingNames: string[]): string[] {
  const lines = fullText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const detectedNames: string[] = [];

  // ===== 排除词库（工作内容动词/技术术语/研究方向等，不可能为人名）=====
  const excludeWords = new Set([
    // 工作内容动词
    '基于', '利用', '通过', '完成', '进行', '开展', '推进', '优化', '改进', '提升',
    '实现', '分析', '研究', '探索', '验证', '测试', '制备', '加工', '仿真', '模拟',
    '计算', '测量', '观察', '记录', '整理', '撰写', '修改', '调整', '确认', '提交',
    '阅读', '学习', '讨论', '汇报', '参加', '协助', '准备', '安排', '计划', '预计',
    '开始', '结束', '继续', '暂停', '恢复', '终止', '随着', '鉴于', '关于', '对于',
    '结合', '对比', '比较', '针对', '围绕', '按照', '根据', '依据', '参照', '参照',
    '采用', '使用', '运用', '应用', '引用', '参考', '借鉴', '沿承', '跟踪', '关注',
    '负责', '承担', '参与', '配合', '协调', '组织', '主持', '指导', '带领', '参与',
    '收集', '汇总', '归纳', '总结', '提取', '获取', '得到', '获得', '取得', '达成',
    '解决', '处理', '应对', '克服', '排除', '消除', '降低', '减少', '增加', '提高',
    '发现', '提出', '建议', '推荐', '指出', '表明', '显示', '证明', '证实', '确认',
    '留附', '见附件', '详见', '如图所示', '如下', '如下文', '上述', '下文', '上文',
    // 技术/物理术语
    '激光', '光纤', '光场', '光束', '光源', '光谱', '光强', '光斑', '光路', '光学',
    '电子', '电场', '电极', '电流', '电压', '电阻', '电容', '电感', '电磁', '电学',
    '磁场', '磁化', '磁力', '磁性', '磁阻', '磁通', '磁矩', '磁共振', '磁光',
    '温度', '温升', '温控', '低温', '高温', '常温', '恒温', '变温', '热导', '热流',
    '应力', '应变', '压力', '压强', '张力', '拉力', '推力', '阻力', '扭力', '剪力',
    '波长', '频率', '周期', '相位', '振幅', '偏振', '干涉', '衍射', '散射', '吸收',
    '反射', '透射', '折射', '全反射', '漫反射', '镜面', '透镜', '棱镜', '光栅', '滤光',
    '扫描', '探测', '检测', '监测', '测量', '标定', '校准', '对准', '聚焦', '成像',
    '脉冲', '脉宽', '脉冲高', '脉冲光', '连续', '连续光', '单色', '多色', '白光', '彩光',
    '结构', '结构色', '微结构', '超结构', '纳米', '微米', '毫米', '厘米', '米制',
    '材料', '器件', '设备', '仪器', '装置', '系统', '平台', '模块', '组件', '单元',
    '表面', '界面', '截面', '平面', '曲面', '球面', '柱面', '锥面', '台面', '坡面',
    '模型', '公式', '方程', '算法', '程序', '代码', '软件', '硬件', '固件', '中间件',
    '数据', '图表', '图像', '曲线', '直方', '散点', '柱状', '饼状', '折线', '等高',
    '参数', '变量', '常量', '系数', '指数', '对数', '因子', '比率', '比例', '百分比',
    '方法', '手段', '途径', '方式', '模式', '形式', '类型', '种类', '类别', '等级',
    // 常见研究方向短语（不可能单独作为人名）
    '水熊虫', '水凝胶', '量子点', '石墨烯', '碳纳米', '氮化硅', '氮化镓', '砷化镓',
    '氧化钛', '二氧化钛', '氧化硅', '氧化铝', '氧化锌', '氧化铟', '氧化锡', '氧化锆',
    '超表面', '超透镜', '超材料', '等离激元', '等离激', '光子晶体', '波导', '微腔',
    '涡旋光', '轨道角', '自旋角', '拓扑', '拓扑光', '拓扑荷', '手性', '手性光',
    '钙钛矿', '太阳能电池', '光伏', '光电', '光热', '光声', '光力', '光镊', '光阱',
    '冷原子', '玻色', '费米', '量子', '量子阱', '量子线', '量子环', '量子点', '量子纠缠',
    '全息', '全息图', '数字全息', '计算成像', '层析', '断层', '显微镜', '望远镜', '内窥镜',
    '光纤', '光纤传感', '光纤通信', '光纤激光', '拉曼', '布里渊', '瑞利', '米氏', '夫琅禾费',
    '光刻', '电子束', '聚焦离子', '离子束', '分子束', '原子层', '化学气相', '物理气相', '溅射',
    '超快', '飞秒', '皮秒', '纳秒', '微秒', '毫秒', '阿秒', '泽秒', '瞬态', '稳态',
    '非线性', '线性', '谐波', '倍频', '和频', '差频', '四波', '三波', '参量', '拉曼放大',
    '表面等', '表面等离', '局域表面', '传播表面', '法诺', '法诺共振', '布洛赫', '布洛赫波',
    '能带', '带隙', '禁带', '导带', '价带', ' continuum', '连续区', '离散', '束缚', '自由',
    '近场', '远场', '隐失波', '倏逝波', '渐逝波', '表面波', '导波', '漏波', '辐射波', '行波',
    '驻波', '相干', '相干光', '部分相干', '非相干', '偏振光', '非偏振', '圆偏振', '线偏振', '椭偏',
    ' quarter', '半波', '四分之一', '全波', '相位板', '波片', '延迟器', '补偿器', '调制器',
    '探测器', '传感器', '接收器', '发射器', '放大器', '振荡器', '混频器', '调制器', '解调器',
    '转换器', '耦合器', '分束器', '合束器', '隔离器', '循环器', '衰减器', '滤波器', '均衡器',
    '博士', '硕士', '教授', '副教授', '导师', '组长', '主任', '院长', '所长', '院士',
    // 格式/文档词汇
    '周报', '周进展', '工作计划', '工作总结', '工作进展', '下周计划', '本周完成',
    '摘要', '关键词', '引言', '正文', '结论', '总结', '致谢', '参考文献', '附录',
    '备注', '说明', '注释', '注', '附注', '脚注', '尾注', '标注', '标记', '标签',
    '图表', '表格', '图示', '图解', '插图', '附图', '附表', '附录', '附件', '附录',
    '序号', '编号', '序号', '代码', '编号', '序号', '项目', '条目', '条款', '章节',
    '一级', '二级', '三级', 'A', 'B', 'C', 'D', 'E', 'F', '甲乙丙丁',
    // 团队/PI名称
    '仇旻', '仇旻教授', '仇老师', '教授', '老师',
  ]);

  // 常见姓氏（中国人名一般为姓氏+1-2字名）
  const commonSurnames = new Set([
    '王', '李', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
    '徐', '孙', '胡', '朱', '高', '林', '何', '郭', '马', '罗',
    '梁', '宋', '郑', '谢', '韩', '唐', '冯', '于', '董', '萧',
    '程', '曹', '袁', '邓', '许', '傅', '沈', '曾', '彭', '吕',
    '苏', '卢', '蒋', '蔡', '贾', '丁', '魏', '薛', '叶', '阎',
    '余', '潘', '杜', '戴', '夏', '钟', '汪', '田', '任', '姜',
    '范', '方', '石', '姚', '谭', '廖', '邹', '熊', '金', '陆',
    '郝', '孔', '白', '崔', '康', '毛', '邱', '秦', '江', '史',
    '顾', '侯', '邵', '孟', '龙', '万', '段', '雷', '钱', '汤',
    '尹', '黎', '易', '常', '武', '乔', '贺', '赖', '龚', '文',
    '严', '欧', '严', '虞', '欧阳', '孙', '齐', '邓', '裴', '章',
    '林', '李', '杨', '卢', '马', '王', '陈', '薛', '赵', '刘',
    '周', '孙', '林', '陈', '郑', '齐', '虞', '薛', '邵', '谢',
    '严', '潘', '欧', '邓', '裴', '章', '欧', '李', '卢', '杨',
  ]);

  // ===== 策略1：匹配带编号前缀的人名行 =====
  // 支持格式：
  //   "1. 严巍" - 纯人名
  //   "1. 严巍（SiC超表面）" - 人名+括号注释
  //   "3. 王晨荷  微纳光学" - 人名+空格+描述（新格式）
  //   "18. Jonah Johnson 江骏浪" - 英文名+中文名
  // 模式：数字[.、] + 空格 + 名字部分
  const numberedNamePattern1 = /^\d+[\.、\s]+([\u4e00-\u9fa5]{2,3})\s*(?:[（(][^)）]*[)）])?\s*$/; // 纯中文名

  console.log('[Detect] 开始检测，现有成员数:', existingNames.length, '总现有:', existingNames);
  console.log('[Detect] 周报总行数:', lines.length);

  for (const line of lines) {
    // 只处理带编号的行（行首是数字）
    if (!/^\d+/.test(line)) continue;

    let candidate: string | null = null;

    // 尝试匹配纯中文名格式 "1. 严巍" 或 "1. 严巍（方向）"
    const match1 = line.match(numberedNamePattern1);
    if (match1) {
      candidate = match1[1];
    } else {
      // 尝试匹配 "3. 王晨荷  微纳光学" 格式
      const match2 = line.match(/^\d+[\.、\s]+([\u4e00-\u9fa5]{2,3})\s+[^\d（(].*$/);
      if (match2) {
        candidate = match2[1];
      } else {
        // 尝试匹配 "Jonah Johnson 江骏浪" 格式
        const match3 = line.match(/^\d+[\.、\s]+[A-Za-z\s]+\s+([\u4e00-\u9fa5]{2,4})\s*$/);
        if (match3) {
          candidate = match3[1];
        }
      }
    }

    if (!candidate) {
      console.log('[Detect] 未匹配行:', line.substring(0, 50));
      continue;
    }
    console.log('[Detect] 候选:', candidate, '| 行:', line.substring(0, 50));

    // 排除已知成员
    if (existingNames.includes(candidate)) {
      console.log('[Detect] 跳过(已存在):', candidate);
      continue;
    }

    // 排除排除词库
    if (excludeWords.has(candidate)) continue;
    // 也检查候选是否以排除词开头
    let isExcluded = false;
    for (const ew of excludeWords) {
      if (ew.length >= 2 && candidate.startsWith(ew)) {
        isExcluded = true;
        break;
      }
    }
    if (isExcluded) continue;

    // 验证：候选的第一个字应该是常见姓氏
    const firstChar = candidate.charAt(0);
    if (!commonSurnames.has(firstChar)) {
      const hasDirectionNote = /[（(][^)）]{3,}[)）]/.test(line);
      if (!hasDirectionNote) {
        console.log('[Detect] 跳过(罕见姓):', candidate, '姓:', firstChar);
        continue;
      }
    }

    // 验证：检查下一行是否有工作内容
    const lineIndex = lines.indexOf(line);
    if (lineIndex >= 0 && lineIndex + 1 < lines.length) {
      const nextLine = lines[lineIndex + 1];
      if (/^\d+[\.、\s]+/.test(nextLine)) {
        console.log('[Detect] 跳过(下一个是人名):', candidate);
        continue;
      }
      if (nextLine.length < 5) {
        console.log('[Detect] 跳过(下一行太短):', candidate, 'next:', nextLine);
        continue;
      }

      // 通过所有检查
      if (!detectedNames.includes(candidate)) {
        console.log('[Detect] ✅ 检测到新成员:', candidate);
        detectedNames.push(candidate);
      }
    } else {
      console.log('[Detect] 跳过(无下一行):', candidate);
    }
  }

  console.log('[Detect] 最终结果:', detectedNames);
  return detectedNames;
}

/**
 * 检测周报中已毕业/已离职/非活跃的成员
 * 返回：周报中出现内容且已知但状态非 active 的成员列表
 */
function detectInactiveMembersInReport(fullText: string): Array<{ id: string; name: string; role: string; status: string; roleLabel: string }> {
  // 获取完整成员列表（包括 graduated/left/inactive）
  let allMembers: Array<{ id: string; name: string; role: string; status: string; roleLabel: string }> = [];
  try {
    const raw = localStorage.getItem('qlab_persons_v5');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        allMembers = parsed
          .filter((m: any) => m.status === 'graduated' || m.status === 'left' || m.status === 'inactive')
          .map((m: any) => ({ id: m.id, name: m.name, role: m.role, status: m.status, roleLabel: m.roleLabel }));
      }
    }
  } catch { /* ignore */ }
  // 如果 localStorage 为空，从静态数据 ALL_PERSONS 获取
  if (allMembers.length === 0) {
    allMembers = ALL_PERSONS
      .filter(p => p.status === 'graduated' || p.status === 'left' || p.status === 'inactive')
      .map(p => ({ id: p.id, name: p.name, role: p.role, status: p.status, roleLabel: p.roleLabel }));
  }

  if (allMembers.length === 0) return [];

  const lines = fullText.split('\n');
  const inactiveInReport: typeof allMembers = [];

  for (const member of allMembers) {
    // 检查周报中是否有该成员的内容段落
    // 策略：查找包含该成员名字的行，且后面有工作内容
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // 匹配 "N. 名字" 或 "N、名字" 格式
      const escapedName = member.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const namePattern = new RegExp(`^\\d+[\\.、\\s]+${escapedName}\\s*([（(（][^)）]*[)））])?\\s*$`);
      if (namePattern.test(line)) {
        // 找到了名字行，检查后面是否有工作内容（至少5个字符的非编号行）
        let hasContent = false;
        for (let j = i + 1; j < lines.length && j < i + 15; j++) {
          const nextLine = lines[j].trim();
          if (nextLine.length === 0) continue;
          if (/^\d+[\.、\s]+/.test(nextLine)) break; // 下一个人名
          if (nextLine.length >= 5) {
            hasContent = true;
            break;
          }
        }
        if (hasContent && !inactiveInReport.find(m => m.id === member.id)) {
          inactiveInReport.push(member);
        }
        break;
      }
    }
  }

  return inactiveInReport;
}

/** 更新成员状态为 active */
function reactivateMember(memberId: string): boolean {
  try {
    const STORAGE_KEY = 'qlab_persons_v5';
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const members = JSON.parse(raw);
    if (!Array.isArray(members)) return false;

    const idx = members.findIndex((m: any) => m.id === memberId);
    if (idx >= 0) {
      members[idx].status = 'active';
      members[idx].group = members[idx].role; // 恢复 group
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
      localStorage.setItem('qlab_last_modified', JSON.stringify(new Date().toISOString()));
      // 触发云端同步（延迟避免阻塞UI）
      if (cloudStorage.isCloudEnabled()) {
        setTimeout(() => {
          cloudStorage.saveAllData(cloudStorage.loadFromLocal()).catch(() => {});
        }, 100);
      }
      return true;
    }
  } catch { /* ignore */ }
  return false;
}

/** 从 localStorage 加载当前成员列表 */
function loadCurrentMembers(): { id: string; name: string; role: string }[] {
  try {
    const raw = localStorage.getItem('qlab_persons_v5');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((m: any) => ({ id: m.id, name: m.name, role: m.role }));
      }
    }
  } catch { /* ignore */ }
  return ACTIVE_PERSONS.map(p => ({ id: p.id, name: p.name, role: p.role }));
}

/** 保存新成员到 localStorage */
function saveNewMember(
  name: string,
  role: string,
  roleLabel: string,
  subRole: string,
  researchDirection: string
): { id: string; name: string } | null {
  try {
    const STORAGE_KEY = 'qlab_persons_v5';
    const raw = localStorage.getItem(STORAGE_KEY);
    let members: any[] = [];
    if (raw) {
      try { members = JSON.parse(raw); } catch { /* ignore */ }
    }
    if (!Array.isArray(members)) members = [];

    // 生成ID
    const prefix = role === 'phd' ? 'd' : role === 'undergraduate' ? 'x' : 'p';
    const existingIds = members
      .filter((m: any) => m.id?.startsWith(prefix))
      .map((m: any) => {
        const num = parseInt(m.id.slice(prefix.length));
        return isNaN(num) ? 0 : num;
      });
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    const newId = `${prefix}${maxId + 1}`;

    const currentYear = new Date().getFullYear();
    const isStudent = role === 'phd' || role === 'undergraduate';
    const enrollmentYear = isStudent ? currentYear : undefined;
    const programDuration = role === 'phd' ? 5 : role === 'undergraduate' ? 4 : undefined;
    const graduationDate = isStudent && enrollmentYear && programDuration
      ? `${enrollmentYear + programDuration}-06-30`
      : undefined;

    const newMember = {
      id: newId,
      name,
      role,
      roleLabel,
      subRole,
      researchDirection,
      joinDate: new Date().toISOString().slice(0, 10),
      status: 'active',
      group: role === 'alumni' ? 'alumni' : role,
      enrollmentYear,
      programDuration,
      graduationDate,
    };

    members.push(newMember);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    localStorage.setItem('qlab_last_modified', JSON.stringify(new Date().toISOString()));
    notifyPersonsUpdated();

    // 触发云端同步（延迟避免阻塞UI）
    if (cloudStorage.isCloudEnabled()) {
      setTimeout(() => {
        cloudStorage.saveAllData(cloudStorage.loadFromLocal()).catch(() => {});
      }, 100);
    }

    return { id: newId, name };
  } catch (e) {
    console.error('[ReportUploader] saveNewMember error:', e);
    return null;
  }
}

/** 构建周报分析 prompt（使用全局日期工具） */
function buildAnalysisPrompt(
  name: string,
  person: typeof ACTIVE_PERSONS[0] | undefined,
  reportText: string
): string {
  const { planningInfo, planningNote } = formatTimeInfo({
    role: person?.role || '',
    graduationDate: person?.graduationDate,
    exitDate: person?.exitDate,
    contractEndDate: person?.contractEndDate,
    programDuration: person?.programDuration,
    enrollmentYear: person?.enrollmentYear,
  });

  return `请对以下科研人员的周报进行分析，给出简要总结。\n\n【重要】当前日期：${getTodayStr()}。所有时间计算必须以此为基准。\n\n姓名：${name}\n身份：${person?.roleLabel || '成员'}${person?.subRole ? `(${person.subRole})` : ''}${planningInfo}\n研究方向：${person?.researchDirection || ''}${planningNote}\n\n本周报内容：\n${reportText}\n\n请输出以下结构的 JSON（不要有任何其他文字）：\n{\n  "summary": "对该人员本周工作的简要总结（50字左右）",\n  "progress": 70,\n  "problems": 0,\n  "tag": "稳步推进"\n}\nprogress 为 50-95 的整数，problems 为 0-2 的整数，tag 从 ["稳步推进","论文推进","实验攻坚","数据分析","文献调研","毕业准备","出站准备"] 中选择。`;
}

export default function ReportUploader() {
  const [phase, setPhase] = useState<Phase>('upload');
  const [researcherFile, setResearcherFile] = useState<File | null>(null);
  const [phdFile, setPhdFile] = useState<File | null>(null);
  const researcherInputRef = useRef<HTMLInputElement>(null);
  const phdInputRef = useRef<HTMLInputElement>(null);
  const allPersons = usePersons();

  const [analysisProgress, setAnalysisProgress] = useState<AnalysisProgress>({
    currentPerson: '', completed: 0, total: ACTIVE_PERSONS.length, estimatedCost: 0, tokensUsed: 0, logs: [],
  });
  const [error, setError] = useState('');

  // 从 docx 解析出来的周报内容：人名 → 周报原文
  const [parsedReports, setParsedReports] = useState<Record<string, string>>({});

  // 非活跃成员检测相关状态
  const [inactiveMembersDetected, setInactiveMembersDetected] = useState<Array<{ id: string; name: string; role: string; status: string; roleLabel: string }>>([]);
  const [parsedFullText, setParsedFullText] = useState('');
  const [parsedFullHtml, setParsedFullHtml] = useState('');

  // 新成员检测相关状态
  const [newMembersDetected, setNewMembersDetected] = useState<string[]>([]);
  const [newMemberForms, setNewMemberForms] = useState<Record<string, { role: string; roleLabel: string; subRole: string; researchDirection: string }>>({});

  // Track uploaded dates and detect duplicates (from localStorage + static defaults)
  const [uploadedDates, setUploadedDates] = useState<string[]>(() => {
    const saved = getUploadedDates();
    const defaults = ['2026.04.03', '2026.04.10', '2026.04.17', '2026.04.24', '2026.04.30'];
    // 合并去重：localStorage 中的 + 静态默认值
    return [...new Set([...saved, ...defaults])].sort();
  });
  const [showOverrideDialog, setShowOverrideDialog] = useState(false);
  const [detectedDate, setDetectedDate] = useState<string | null>(null);

  // 429 重试机制
  const [failedPersons, setFailedPersons] = useState<Array<{ name: string; person: typeof ACTIVE_PERSONS[0] | undefined; reportText: string; error: string }>>([]);
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);

  // 深度分析选项
  const [includeDeepAnalysis, setIncludeDeepAnalysis] = useState(false);
  const [deepAnalysisProgress, setDeepAnalysisProgress] = useState({ current: 0, total: 0, currentName: '' });
  const [deepAnalysisDone, setDeepAnalysisDone] = useState(false);

  const handleResearcherFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.docx')) {
      setResearcherFile(file);
      setError('');
    } else if (file) {
      setError('请上传 .docx 格式文件');
    }
  }, []);

  const handlePhdFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.docx')) {
      setPhdFile(file);
      setError('');
    } else if (file) {
      setError('请上传 .docx 格式文件');
    }
  }, []);

  // Check if the uploaded file's date already exists
  const checkDateDuplicate = (): { date: string | null; isDuplicate: boolean } => {
    // Try to parse date from either file
    const researcherDate = researcherFile ? parseDateFromFileName(researcherFile.name) : null;
    const phdDate = phdFile ? parseDateFromFileName(phdFile.name) : null;
    const date = researcherDate || phdDate;

    if (date && uploadedDates.includes(date)) {
      return { date, isDuplicate: true };
    }
    return { date, isDuplicate: false };
  };

  // Proceed with parsing after all checks pass
  const proceedWithParse = async () => {
    setShowOverrideDialog(false);
    setError('');

    if (detectedDate && !uploadedDates.includes(detectedDate)) {
      setUploadedDates(prev => [...prev, detectedDate]);
    }

    // 解析两份 docx 文件，提取每个人的周报内容（纯文本 + HTML）
    try {
      const researcherResult = researcherFile ? await extractTextFromDocx(researcherFile) : null;
      const phdResult = phdFile ? await extractTextFromDocx(phdFile) : null;
      const fullText = (researcherResult?.text || '') + '\n' + (phdResult?.text || '');
      const fullHtml = (researcherResult?.html || '') + '\n' + (phdResult?.html || '');

      // 检测周报中是否有已毕业/已离职/非活跃成员的内容
      const inactiveMembers = detectInactiveMembersInReport(fullText);
      console.log('[Parse] 非活跃成员检测:', inactiveMembers);
      
      // 提取周报内容（基于编号自动提取所有人，不依赖现有成员列表）
      const personReports = extractPersonReports(fullText);
      setParsedReports(personReports);
      
      if (inactiveMembers.length > 0) {
        setInactiveMembersDetected(inactiveMembers);
        setParsedFullText(fullText);
        setParsedFullHtml(fullHtml);
        setPhase('inactive_check');
        return;
      }

      // 检测新成员（优先使用 HTML 检测，更可靠）
      const currentMembers = loadCurrentMembers();
      const currentNames = currentMembers.map(m => m.name);
      console.log('[Parse] 现有成员数:', currentNames.length);
      // 先用 HTML 检测（保留列表结构），再用纯文本检测（编号行）
      const detectedFromHtml = detectNewMembersFromHtml(fullHtml, currentNames);
      const detectedFromText = detectNamesFromReport(fullText, currentNames);
      // 合并结果（去重）
      const detectedNewNames = [...new Set([...detectedFromHtml, ...detectedFromText])];
      console.log('[Parse] HTML检测:', detectedFromHtml, '| 文本检测:', detectedFromText, '| 合并:', detectedNewNames);

      if (detectedNewNames.length > 0) {
        // 有新成员发现，进入新成员确认阶段
        setNewMembersDetected(detectedNewNames);
        setParsedFullText(fullText);
        setPhase('new_members');
        return;
      }

      setPhase('review');
    } catch (e) {
      setError('周报文件解析失败: ' + (e instanceof Error ? e.message : String(e)));
      setPhase('upload');
    }
  };

  // Step 1: Parse files after user clicks "确认并解析"
  const startParse = () => {
    if (!researcherFile || !phdFile) {
      setError('请同时上传两份周报文件');
      return;
    }

    const { date, isDuplicate } = checkDateDuplicate();
    setDetectedDate(date);

    if (isDuplicate) {
      setShowOverrideDialog(true);
      return;
    }

    proceedWithParse();
  };

  // Handle override confirmation
  const handleConfirmOverride = () => {
    proceedWithParse();
  };

  // Handle override cancellation
  const handleCancelOverride = () => {
    setShowOverrideDialog(false);
    setDetectedDate(null);
    // Return to upload page
    setPhase('upload');
    setResearcherFile(null);
    setPhdFile(null);
    setError('');
  };

  // Step 2: Start AI analysis after user clicks "开始分析"
  const startAnalysis = async () => {
    // Check Kimi API version before starting
    const userPref = localStorage.getItem('kimi_model_preference');
    const storedStatus = localStorage.getItem('kimi_version_status');
    const EXPECTED_VERSION = 'k2.6';

    let versionAlert: string | null = null;
    let actualVersion = EXPECTED_VERSION;

    if (storedStatus === 'offline') {
      versionAlert = `⚠️ API连接异常：无法连接到 Kimi 服务。请检查网络连接或 API Key 配置后再试。`;
      actualVersion = '未连接';
    } else if (storedStatus === 'downgraded' || (userPref && userPref !== EXPECTED_VERSION)) {
      versionAlert = `⚠️ 版本降级警报：当前配置为 ${userPref || '旧版本'}，而非期望版本 ${EXPECTED_VERSION}。分析精度可能下降，建议更新 API 配置。`;
      actualVersion = userPref || 'unknown';
    }

    if (versionAlert) {
      const proceed = window.confirm(versionAlert + '\n\n是否仍要继续分析？');
      if (!proceed) return;
    }

    setPhase('analyzing');
    setFailedPersons([]);
    setRetryCount(0);
    const weekDate = detectedDate || new Date().toISOString().slice(0, 10).replace(/-/g, '.');
    // 保存文件信息（分析是异步的，state 可能被清空）
    const savedResearcherFile = researcherFile;
    const savedPhdFile = phdFile;

    // ===== 使用最新人员数据（包含 localStorage 修改）=====
    const currentPersons = allPersons.length > 0 ? allPersons : ACTIVE_PERSONS;

    // 排除已毕业/已离职/非活跃人员（这些人不需要提交周报）
    const needSubmitPersons = currentPersons.filter(p =>
      p.status === 'active' || p.status === undefined
    );
    const excludedPersons = currentPersons.filter(p =>
      p.status === 'graduated' || p.status === 'left' || p.status === 'inactive'
    );

    const analysisResults: Record<string, { summary: string; progress: number; problems: number; tag: string }> = {};

    // 先为排除的人生成默认结果
    for (const p of excludedPersons) {
      const statusLabel = p.status === 'graduated' ? '已毕业' : p.status === 'left' ? '已离职' : '非活跃';
      analysisResults[p.name] = {
        summary: `该成员状态为「${statusLabel}」，无需提交周报。`,
        progress: 0,
        problems: 0,
        tag: statusLabel,
      };
    }

    // 处理需要提交周报的人员
    const submittedItems: { name: string; person: typeof ACTIVE_PERSONS[0] | undefined; reportText: string }[] = [];
    const missingNames: string[] = [];
    for (const person of needSubmitPersons) {
      const reportText = parsedReports[person.name] ?? '';
      if (!reportText || reportText.trim().length < 10) {
        // 未提交周报
        analysisResults[person.name] = {
          summary: '此人本周未提交周报。',
          progress: 0,
          problems: 0,
          tag: '未提交',
        };
        missingNames.push(person.name);
      } else {
        // 已提交周报，加入 API 调用队列
        submittedItems.push({ name: person.name, person, reportText });
      }
    }
    const personItems = submittedItems;
    const submittedCount = personItems.length;

    const estimatedCost = submittedCount * COST_PER_PERSON;

    const versionLine = actualVersion === EXPECTED_VERSION
      ? `[${new Date().toLocaleTimeString()}] 模型: Kimi ${actualVersion} ✅`
      : `[${new Date().toLocaleTimeString()}] 模型: Kimi ${actualVersion} ⚠️ (期望: ${EXPECTED_VERSION})`;

    const logs: string[] = [
      `[${new Date().toLocaleTimeString()}] 启动AI分析流程...`,
      versionLine,
    ];
    if (excludedPersons.length > 0) {
      logs.push(`[${new Date().toLocaleTimeString()}] ℹ️ ${excludedPersons.length}人已毕业/离职/非活跃，无需提交周报：${excludedPersons.map(p => p.name).join('、')}`);
    }
    logs.push(`[${new Date().toLocaleTimeString()}] 本周已提交${submittedCount}人，未提交${missingNames.length}人（需提交${needSubmitPersons.length}人），预计消耗: ${submittedCount}人 × ~${TOKENS_PER_PERSON} tokens ≈ ${(submittedCount * TOKENS_PER_PERSON / 1000).toFixed(0)}K tokens / 约¥${estimatedCost.toFixed(4)}（官方定价: 输入¥6.50/百万 + 输出¥27.00/百万）`);

    setAnalysisProgress({
      currentPerson: personItems[0]?.name || '',
      completed: 0,
      total: submittedCount,
      estimatedCost,
      tokensUsed: 0,
      logs,
    });

    // 并行调用 Kimi API，每次最多5个
    const batchSize = 5;
    for (let batchStart = 0; batchStart < personItems.length; batchStart += batchSize) {
      const batch = personItems.slice(batchStart, Math.min(batchStart + batchSize, personItems.length));

      // 更新当前分析的人
      setAnalysisProgress(prev => ({
        ...prev,
        currentPerson: batch[0]?.name || '',
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 批次 ${Math.floor(batchStart / batchSize) + 1}/${Math.ceil(personItems.length / batchSize)}: ${batch.map(b => b.name).join(', ')}`],
      }));

      await Promise.all(
        batch.map(async ({ name, person, reportText }) => {
          try {
            // 如果周报内容为空，说明此人本周未提交周报，跳过 API 调用
            if (!reportText || reportText.trim().length < 10) {
              analysisResults[name] = {
                summary: '此人本周未提交周报。',
                progress: 0,
                problems: 0,
                tag: '未提交',
              };
              setAnalysisProgress(prev => ({
                ...prev,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ⚠️ ${name} 本周未提交周报，跳过分析`],
              }));
              return;
            }

            const prompt = buildAnalysisPrompt(name, person, reportText);

            const content = await callKimiApi(prompt, {
              systemPrompt: '你是一个专业的科研团队管理助手，擅长分析周报并给出简洁的评估。',
              maxTokens: 500,
            });

            // 解析 JSON
            let result: { summary: string; progress: number; problems: number; tag: string };
            try {
              const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
              result = JSON.parse(cleaned);
            } catch {
              // Fallback: use content as summary
              result = { summary: content.slice(0, 100), progress: 70, problems: 0, tag: '稳步推进' };
            }

            analysisResults[name] = result;
          } catch (e) {
            const errMsg = e instanceof Error ? e.message : String(e);
            const is429 = errMsg.includes('429') || errMsg.includes('overloaded');

            if (is429) {
              // 429 错误：记录到重试队列，稍后自动重试
              setFailedPersons(prev => {
                if (prev.some(f => f.name === name)) return prev; // 避免重复
                return [...prev, { name, person, reportText, error: errMsg }];
              });
              analysisResults[name] = {
                summary: `${name}的周报分析暂未完成（API引擎过载，将自动重试）。`,
                progress: 0, problems: 0, tag: '等待重试',
              };
              setAnalysisProgress(prev => ({
                ...prev,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ⚠️ ${name} API引擎过载(429)，加入重试队列`],
              }));
            } else {
              // 其他错误：直接记录失败
              analysisResults[name] = {
                summary: `${name}本周科研工作持续推进。（API调用出错: ${errMsg.slice(0, 50)}）`,
                progress: 70, problems: 0, tag: '稳步推进',
              };
              setAnalysisProgress(prev => ({
                ...prev,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ❌ ${name} 分析失败: ${errMsg.slice(0, 80)}`],
              }));
            }
          }
        })
      );

      // 更新进度
      const completed = Math.min(batchStart + batchSize, personItems.length);
      setAnalysisProgress(prev => ({
        ...prev,
        completed,
        tokensUsed: completed * TOKENS_PER_PERSON,
        currentPerson: completed < personItems.length ? personItems[completed].name : '',
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 完成 ${completed}/${personItems.length} 人`],
      }));
    }

    // ===== 自动重试 429 失败的人员 =====
    let currentFailed = failedPersons;
    let attempt = 0;
    const MAX_RETRY_ATTEMPTS = 3;

    while (currentFailed.length > 0 && attempt < MAX_RETRY_ATTEMPTS) {
      attempt++;
      const waitSec = attempt * 3; // 递增等待：3s, 6s, 9s
      setAnalysisProgress(prev => ({
        ...prev,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 🔄 第${attempt}次重试 ${currentFailed.length}人（等待${waitSec}秒）: ${currentFailed.map(f => f.name).join(', ')}`],
      }));

      await new Promise(r => setTimeout(r, waitSec * 1000));

      const nextFailed: typeof currentFailed = [];
      await Promise.all(
        currentFailed.map(async ({ name, person, reportText }) => {
          try {
            const prompt = buildAnalysisPrompt(name, person, reportText);
            const content = await callKimiApi(prompt, {
              systemPrompt: '你是一个专业的科研团队管理助手，擅长分析周报并给出简洁的评估。',
              maxTokens: 500,
            });
            let result: { summary: string; progress: number; problems: number; tag: string };
            try {
              const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
              result = JSON.parse(cleaned);
            } catch {
              result = { summary: content.slice(0, 100), progress: 70, problems: 0, tag: '稳步推进' };
            }
            analysisResults[name] = result;
            setFailedPersons(prev => prev.filter(f => f.name !== name));
            setAnalysisProgress(prev => ({
              ...prev,
              logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ✅ ${name} 重试成功`],
            }));
          } catch (e: any) {
            const errMsg = e instanceof Error ? e.message : String(e);
            const still429 = errMsg.includes('429') || errMsg.includes('overloaded');
            if (still429 && attempt < MAX_RETRY_ATTEMPTS) {
              nextFailed.push({ name, person, reportText, error: errMsg });
            } else {
              // 最终失败
              analysisResults[name] = {
                summary: `${name}本周科研工作持续推进。（API调用出错: ${errMsg.slice(0, 50)}）`,
                progress: 70, problems: 0, tag: '稳步推进',
              };
              setFailedPersons(prev => prev.filter(f => f.name !== name));
            }
            setAnalysisProgress(prev => ({
              ...prev,
              logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ${still429 && attempt < MAX_RETRY_ATTEMPTS ? '⚠️' : '❌'} ${name} 重试${attempt}失败: ${errMsg.slice(0, 60)}`],
            }));
          }
        })
      );

      currentFailed = nextFailed;
    }

    if (currentFailed.length > 0) {
      // 最终仍有失败的，标记为失败
      for (const { name } of currentFailed) {
        analysisResults[name] = {
          summary: `${name}的周报分析失败（API多次重试后仍不可用，请稍后手动重试）。`,
          progress: 70, problems: 0, tag: '重试失败',
        };
      }
      setAnalysisProgress(prev => ({
        ...prev,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ⚠️ ${currentFailed.length}人经过${MAX_RETRY_ATTEMPTS}次重试后仍失败: ${currentFailed.map(f => f.name).join(', ')}。可点击"仅重试失败人员"按钮稍后重试。`],
      }));
    }

    setRetryCount(attempt);

    // 保存动态数据到 localStorage
    const personTrends: Record<string, WeekTrend> = {};
    const personSummaries: Record<string, string> = {};
    const nameToId = new Map(currentPersons.map(p => [p.name, p.id]));

    for (const [name, result] of Object.entries(analysisResults)) {
      const personId = nameToId.get(name) || name;
      personTrends[personId] = {
        progress: result.progress,
        problems: result.problems,
        characterTag: result.tag,
        summary: result.summary,
      };
      personSummaries[personId] = result.summary;
    }

    saveDynamicTrends(weekDate, personTrends);
    saveDynamicHistory(weekDate, personSummaries);
    addUploadedDate(weekDate);
    addWeekLabel(weekDate);
    // 使用 JSON.stringify 与 cloudStorage.saveToLocal 保持一致
    localStorage.setItem('qlab_last_modified', JSON.stringify(new Date().toISOString()));

    // DEBUG: 验证 localStorage 实际写入的内容
    try {
      const savedTrends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}');
      const savedHistory = JSON.parse(localStorage.getItem('qlab_dynamic_history') || '{}');
      const trendKeys = Object.keys(savedTrends[weekDate] || {});
      const historyKeys = Object.keys(savedHistory).filter(k => savedHistory[k]?.[weekDate]);
      console.log(`[DEBUG ReportUploader] weekDate=${weekDate}, trends saved=${trendKeys.length}, history saved=${historyKeys.length}`);
      console.log(`[DEBUG ReportUploader] sample trends:`, trendKeys.slice(0, 3).map(k => `${k}:${(savedTrends[weekDate][k] as any)?.characterTag || '?'}`));
      console.log(`[DEBUG ReportUploader] sample history:`, historyKeys.slice(0, 3).map(k => `${k}:${savedHistory[k]?.[weekDate]?.slice(0, 20)}...`));
    } catch (e) {
      console.error('[DEBUG ReportUploader] failed to verify save:', e);
    }

    // 保存上传历史记录（用两份文件的名称）
    if (savedResearcherFile) {
      addUploadHistory({
        id: `upload-${Date.now()}-r`,
        fileName: savedResearcherFile.name,
        fileSize: savedResearcherFile.size,
        uploadedAt: new Date().toISOString(),
        status: 'completed',
        weekDate,
      });
    }
    if (savedPhdFile) {
      addUploadHistory({
        id: `upload-${Date.now()}-d`,
        fileName: savedPhdFile.name,
        fileSize: savedPhdFile.size,
        uploadedAt: new Date().toISOString(),
        status: 'completed',
        weekDate,
      });
    }

    if (cloudStorage.isCloudEnabled()) {
      // 先 loadAllData 拉取云端合并（保留其他浏览器的 persons 编辑），再推送
      cloudStorage.loadAllData()
        .then(() => {
          // 合并完成后，本地数据已更新，再推送回云端
          return cloudStorage.saveAllData(cloudStorage.loadFromLocal());
        })
        .catch((e: unknown) => {
          console.warn('[Upload] 云端同步失败:', e);
        });
    }

    // ===== 科研进展深度评估（可选） =====
    if (includeDeepAnalysis) {
      const deepTargetPersons = currentPersons.filter(p => p.status === 'active' || p.status === undefined);
      setDeepAnalysisProgress({ current: 0, total: deepTargetPersons.length, currentName: '' });
      setAnalysisProgress(prev => ({
        ...prev,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 🧠 启动科研进展深度评估：${deepTargetPersons.length}人...`],
      }));

      let deepCompleted = 0;
      const deepBatchSize = 3; // 深度分析每次3个并行（更保守，因为输出更长）
      for (let i = 0; i < deepTargetPersons.length; i += deepBatchSize) {
        const batch = deepTargetPersons.slice(i, Math.min(i + deepBatchSize, deepTargetPersons.length));
        setDeepAnalysisProgress({ current: deepCompleted, total: deepTargetPersons.length, currentName: batch[0]?.name || '' });
        setAnalysisProgress(prev => ({
          ...prev,
          logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 🧠 深度评估批次 ${Math.floor(i / deepBatchSize) + 1}/${Math.ceil(deepTargetPersons.length / deepBatchSize)}: ${batch.map(p => p.name).join(', ')}`],
        }));

        await Promise.all(
          batch.map(async (person) => {
            try {
              const result = await callKimiDeepAnalysis(person);
              // 保存到 localStorage
              saveDeepAnalysis({
                personId: person.id,
                personName: person.name,
                analysisDate: new Date().toISOString(),
                model: 'kimi-k2.6',
                researchProgress: result.researchProgress,
                researchHotspots: result.researchHotspots,
                suggestedDirections: result.suggestedDirections,
                riskAssessment: result.riskAssessment,
                overallAdvice: result.overallAdvice,
              });
              deepCompleted++;
              setDeepAnalysisProgress({ current: deepCompleted, total: deepTargetPersons.length, currentName: '' });
              setAnalysisProgress(prev => ({
                ...prev,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ✅ ${person.name} 深度评估完成`],
              }));
            } catch (e: any) {
              const errMsg = e instanceof Error ? e.message : String(e);
              setAnalysisProgress(prev => ({
                ...prev,
                logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ❌ ${person.name} 深度评估失败: ${errMsg.slice(0, 60)}`],
              }));
            }
          })
        );
      }

      setDeepAnalysisProgress({ current: deepCompleted, total: deepTargetPersons.length, currentName: '' });
      setDeepAnalysisDone(true);
      setAnalysisProgress(prev => ({
        ...prev,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 🧠 科研进展深度评估完成：${deepCompleted}/${deepTargetPersons.length}人`],
      }));

      // 深度分析结果同步到云端
      if (cloudStorage.isCloudEnabled()) {
        cloudStorage.saveAllData(cloudStorage.loadFromLocal()).catch(() => {});
      }
    }

    const retryInfo = attempt > 0 ? `（含${attempt}次自动重试）` : '';
    const deepInfo = includeDeepAnalysis ? ` + ${deepAnalysisProgress.current}人深度评估` : '';
    setAnalysisProgress(prev => ({
      ...prev,
      currentPerson: '',
      completed: prev.total,
      tokensUsed: prev.total * TOKENS_PER_PERSON,
      logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 分析完成${retryInfo}${deepInfo}！共处理 ${prev.total} 位成员（未提交成员已跳过）`, `[${new Date().toLocaleTimeString()}] 总消耗: ~${(prev.total * TOKENS_PER_PERSON / 1000).toFixed(0)}K tokens`, `[${new Date().toLocaleTimeString()}] 数据已保存至本地存储（${weekDate}）`],
    }));
    setPhase('done');
  };

  /** 手动重试：仅对失败的人员重新分析 */
  const handleRetryFailed = async () => {
    if (failedPersons.length === 0) return;
    setIsRetrying(true);
    const weekDate = detectedDate || new Date().toISOString().slice(0, 10).replace(/-/g, '.');

    setAnalysisProgress(prev => ({
      ...prev,
      logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 🔄 手动重试 ${failedPersons.length}人: ${failedPersons.map(f => f.name).join(', ')}`],
    }));

    const stillFailed: typeof failedPersons = [];
    await Promise.all(
      failedPersons.map(async ({ name, person, reportText }) => {
        try {
          await new Promise(r => setTimeout(r, 2000)); // 先等待2秒让引擎恢复
          const prompt = buildAnalysisPrompt(name, person, reportText);
          const content = await callKimiApi(prompt, {
            systemPrompt: '你是一个专业的科研团队管理助手，擅长分析周报并给出简洁的评估。',
            maxTokens: 500,
          });
          let result: { summary: string; progress: number; problems: number; tag: string };
          try {
            const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
            result = JSON.parse(cleaned);
          } catch {
            result = { summary: content.slice(0, 100), progress: 70, problems: 0, tag: '稳步推进' };
          }

          // 更新本地存储的结果
          const savedTrends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}');
          const savedHistory = JSON.parse(localStorage.getItem('qlab_dynamic_history') || '{}');
          const personId = (person?.id) || name;
          if (savedTrends[weekDate]) {
            savedTrends[weekDate][personId] = {
              progress: result.progress,
              problems: result.problems,
              characterTag: result.tag,
              summary: result.summary,
            };
          }
          if (!savedHistory[personId]) savedHistory[personId] = {};
          savedHistory[personId][weekDate] = result.summary;
          localStorage.setItem('qlab_dynamic_trends', JSON.stringify(savedTrends));
          localStorage.setItem('qlab_dynamic_history', JSON.stringify(savedHistory));
          localStorage.setItem('qlab_last_modified', JSON.stringify(new Date().toISOString()));

          setFailedPersons(prev => prev.filter(f => f.name !== name));
          setAnalysisProgress(prev => ({
            ...prev,
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ✅ ${name} 手动重试成功`],
          }));
        } catch (e: any) {
          const errMsg = e instanceof Error ? e.message : String(e);
          stillFailed.push({ name, person, reportText, error: errMsg });
          setAnalysisProgress(prev => ({
            ...prev,
            logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ❌ ${name} 手动重试失败: ${errMsg.slice(0, 60)}`],
          }));
        }
      })
    );

    if (stillFailed.length > 0) {
      setFailedPersons(stillFailed);
      setAnalysisProgress(prev => ({
        ...prev,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] ⚠️ ${stillFailed.length}人手动重试仍失败，可再次点击重试`],
      }));
    } else {
      setAnalysisProgress(prev => ({
        ...prev,
        logs: [...prev.logs, `[${new Date().toLocaleTimeString()}] 🎉 所有失败人员重试成功！`],
      }));
    }

    setIsRetrying(false);
  };

  const reset = () => {
    setPhase('upload');
    setResearcherFile(null);
    setPhdFile(null);
    setError('');
    setShowOverrideDialog(false);
    setDetectedDate(null);
    setFailedPersons([]);
    setRetryCount(0);
    setIsRetrying(false);
    setIncludeDeepAnalysis(false);
    setDeepAnalysisProgress({ current: 0, total: 0, currentName: '' });
    setDeepAnalysisDone(false);
    setAnalysisProgress({ currentPerson: '', completed: 0, total: 0, estimatedCost: 0, tokensUsed: 0, logs: [] });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  // ─── Phase: Upload ───
  if (phase === 'upload') {
    return (
      <div className="space-y-6">
        {/* Upload guidance */}
        <Card className="border-cyan-200 bg-cyan-50/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <FileCheck className="w-5 h-5 text-cyan-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-slate-800 mb-1">上传步骤指引</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>1. 请同时上传两份周报文件（研究员与博后版 + 博士版）</p>
                  <p>2. 点击「确认并解析」验证文件并提取人员信息</p>
                  <p>3. 点击「开始AI分析」启动深度研判（仅对已提交周报的成员进行分析）</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Dual upload areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Researcher file */}
          <Card className={`border-2 border-dashed transition-colors ${
            researcherFile ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-cyan-300'
          }`}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <Users className={`w-8 h-8 mb-2 ${researcherFile ? 'text-emerald-500' : 'text-slate-400'}`} />
                <p className="text-sm font-semibold text-slate-700 mb-0.5">研究员与博后版</p>
                <p className="text-xs text-slate-500 mb-3">包含{getActiveResearcherNames(allPersons).length}位在职研究人员</p>
                {researcherFile ? (
                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="break-all">{researcherFile.name}</span>
                    <span className="text-xs text-emerald-500">({formatSize(researcherFile.size)})</span>
                    <button onClick={() => setResearcherFile(null)} className="text-emerald-400 hover:text-emerald-700 ml-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input ref={researcherInputRef} type="file" accept=".docx" className="hidden" onChange={handleResearcherFileSelect} />
                    <Button variant="outline" size="sm" type="button" onClick={() => researcherInputRef.current?.click()}>
                      <UploadCloud className="w-4 h-4 mr-1" />
                      选择文件
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* PhD file */}
          <Card className={`border-2 border-dashed transition-colors ${
            phdFile ? 'border-emerald-400 bg-emerald-50' : 'border-slate-300 hover:border-cyan-300'
          }`}>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center text-center">
                <GraduationCap className={`w-8 h-8 mb-2 ${phdFile ? 'text-emerald-500' : 'text-slate-400'}`} />
                <p className="text-sm font-semibold text-slate-700 mb-0.5">博士版</p>
                <p className="text-xs text-slate-500 mb-3">包含{getActiveStudentNames(allPersons).length}位学生</p>
                {phdFile ? (
                  <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100 rounded-full px-3 py-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="break-all">{phdFile.name}</span>
                    <span className="text-xs text-emerald-500">({formatSize(phdFile.size)})</span>
                    <button onClick={() => setPhdFile(null)} className="text-emerald-400 hover:text-emerald-700 ml-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <input ref={phdInputRef} type="file" accept=".docx" className="hidden" onChange={handlePhdFileSelect} />
                    <Button variant="outline" size="sm" type="button" onClick={() => phdInputRef.current?.click()}>
                      <UploadCloud className="w-4 h-4 mr-1" />
                      选择文件
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detected date info */}
        {(() => {
          const rDate = researcherFile ? parseDateFromFileName(researcherFile.name) : null;
          const pDate = phdFile ? parseDateFromFileName(phdFile.name) : null;
          const date = rDate || pDate;
          if (!date) return null;
          return (
            <div className="flex items-center gap-2 text-sm text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg px-3 py-2">
              <CalendarDays className="w-4 h-4" />
              <span>检测到周报日期：<strong>{date}</strong></span>
              {uploadedDates.includes(date) && (
                <Badge variant="outline" className="text-amber-600 border-amber-300 bg-amber-50">已存在</Badge>
              )}
            </div>
          );
        })()}

        {/* Confirm parse button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={startParse}
            disabled={!researcherFile || !phdFile}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-8"
          >
            <FileCheck className="w-5 h-5 mr-2" />
            确认并解析
          </Button>
        </div>

        {/* Override confirmation dialog */}
        <Dialog open={showOverrideDialog} onOpenChange={setShowOverrideDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-amber-700">
                <AlertCircle className="w-5 h-5" />
                周报日期重复确认
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                {detectedDate && (
                  <>
                    该日期（<strong>{detectedDate}</strong>）的周报已存在，是否更新替代并重新分析？
                  </>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex flex-row justify-end gap-2">
              <Button variant="outline" onClick={handleCancelOverride}>
                否，返回上传页面
              </Button>
              <Button onClick={handleConfirmOverride} className="bg-cyan-600 hover:bg-cyan-700 text-white">
                是，更新并分析
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ─── Phase: Inactive Members Check ───
  if (phase === 'inactive_check') {
    return (
      <div className="space-y-6">
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="text-sm font-semibold text-orange-800">
                检测到 {inactiveMembersDetected.length} 位非活跃成员提交了周报
              </h3>
              <Badge className="bg-orange-100 text-orange-700 text-xs">
                已毕业/已离职/非活跃
              </Badge>
            </div>
            <p className="text-xs text-orange-700 mb-4">
              以下成员当前状态为非活跃，但周报中检测到他们的工作内容。请确认是否要将其状态更新为「在岗」，以便继续分析和统计。
            </p>

            <div className="space-y-2 mb-4">
              {inactiveMembersDetected.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-800">{member.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {member.roleLabel}
                    </Badge>
                    <Badge className={`text-xs ${
                      member.status === 'graduated' ? 'bg-blue-100 text-blue-700' :
                      member.status === 'left' ? 'bg-gray-100 text-gray-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {member.status === 'graduated' ? '已毕业' :
                       member.status === 'left' ? '已离职' : '非活跃'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-xs"
                onClick={() => {
                  // 更新所有检测到的非活跃成员为 active
                  let successCount = 0;
                  for (const member of inactiveMembersDetected) {
                    if (reactivateMember(member.id)) successCount++;
                  }
                  if (successCount > 0) {
                    // 通知其他组件人员数据已更新
                    notifyPersonsUpdated();
                    // 刷新页面以重新加载 ACTIVE_PERSONS
                    window.location.reload();
                  }
                }}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                确认更新为「在岗」并继续
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => {
                  console.log('[Skip] 跳过非活跃成员，检测新成员...');
                  const currentMembers = loadCurrentMembers();
                  const currentNames = currentMembers.map(m => m.name);
                  const detectedFromHtml = detectNewMembersFromHtml(parsedFullHtml, currentNames);
                  const detectedFromText = detectNamesFromReport(parsedFullText, currentNames);
                  const detectedNewNames = [...new Set([...detectedFromHtml, ...detectedFromText])];
                  console.log('[Skip] HTML检测:', detectedFromHtml, '| 文本检测:', detectedFromText, '| 合并:', detectedNewNames);

                  if (detectedNewNames.length > 0) {
                    setNewMembersDetected(detectedNewNames);
                    setPhase('new_members');
                    return;
                  }

                  // 没有新成员，直接进入 review（周报内容已经提取好了）
                  setPhase('review');
                }}
              >
                <X className="w-3 h-3 mr-1" />
                跳过，不更新状态
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-slate-500"
                onClick={() => {
                  // 去设置页面手动管理
                  window.location.hash = '#/settings';
                }}
              >
                <Settings className="w-3 h-3 mr-1" />
                去设置页面管理成员
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Phase: New Members Confirmation ───
  if (phase === 'new_members') {
    return (
      <div className="space-y-6">
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-semibold text-amber-800">
                发现 {newMembersDetected.length} 位新成员
              </h3>
              <Badge className="bg-amber-100 text-amber-700 text-xs">
                周报中检测到以下不在成员列表中的人名
              </Badge>
            </div>
            <p className="text-xs text-amber-700 mb-4">
              请确认是否要添加这些成员。默认类别为当年入职的博士生，您可以修改。
            </p>

            <div className="space-y-3 mb-4">
              {newMembersDetected.map((name) => {
                const form = newMemberForms[name] || { role: 'phd', roleLabel: '博士生', subRole: `${new Date().getFullYear()}级`, researchDirection: '' };
                return (
                  <div key={name} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                    <span className="text-sm font-medium text-slate-800 w-20">{name}</span>
                    <Select
                      value={form.role}
                      onValueChange={v => {
                        const rl = v === 'phd' ? '博士生' : v === 'postdoc' ? '博士后' : v === 'assistant_researcher' ? '助理研究员' : v === 'researcher' ? '研究员' : v === 'undergraduate' ? '本科生' : '访问学生';
                        const currentYear = new Date().getFullYear();
                        const isStudent = v === 'phd' || v === 'undergraduate';
                        setNewMemberForms(prev => ({
                          ...prev,
                          [name]: { role: v, roleLabel: rl, subRole: isStudent ? `${currentYear}级` : rl, researchDirection: prev[name]?.researchDirection || '' },
                        }));
                      }}
                    >
                      <SelectTrigger className="h-7 text-xs w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phd">博士生</SelectItem>
                        <SelectItem value="postdoc">博士后</SelectItem>
                        <SelectItem value="assistant_researcher">助理研究员</SelectItem>
                        <SelectItem value="researcher">研究员</SelectItem>
                        <SelectItem value="undergraduate">本科生</SelectItem>
                        <SelectItem value="visitor">访问学生</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={form.researchDirection}
                      onChange={e => setNewMemberForms(prev => ({ ...prev, [name]: { ...prev[name], researchDirection: e.target.value } }))}
                      placeholder="研究方向（可选）"
                      className="h-7 text-xs flex-1"
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700 text-xs"
                onClick={() => {
                  // 添加所有确认的成员
                  for (const name of newMembersDetected) {
                    const form = newMemberForms[name] || { role: 'phd', roleLabel: '博士生', subRole: `${new Date().getFullYear()}级`, researchDirection: '' };
                    saveNewMember(name, form.role, form.roleLabel, form.subRole, form.researchDirection);
                  }
                  // 刷新页面以重新加载 ACTIVE_PERSONS
                  window.location.reload();
                }}
              >
                <CheckCircle className="w-3 h-3 mr-1" />
                确认添加并继续
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs"
                onClick={() => {
                  // 跳过新成员，继续解析（周报内容已经提取好了）
                  setPhase('review');
                }}
              >
                <X className="w-3 h-3 mr-1" />
                跳过，继续解析
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Phase: Review (parse complete, ready to analyze) ───
  if (phase === 'review') {
    // parsedReports 现在包含从周报中按编号自动提取的所有人名及其内容
    const detectedNames = Object.keys(parsedReports); // 周报中实际检测到的所有人
    const detectedSet = new Set(detectedNames);
    
    // 构建已知成员查找表
    const activePersonsList = allPersons.length > 0 ? allPersons : ACTIVE_PERSONS;
    const knownNameMap = new Map(activePersonsList.map(p => [p.name, p]));
    const knownNames = new Set(knownNameMap.keys());
    
    console.log('[Review] 周报检测到人:', detectedNames.length, detectedNames.join('、'));
    console.log('[Review] 已知成员:', knownNames.size);
    
    // 分类
    // 1. 已知活跃成员且已提交
    const knownSubmitted = detectedNames.filter(n => knownNames.has(n) && (knownNameMap.get(n)?.status === 'active' || knownNameMap.get(n)?.status === undefined));
    // 2. 已知但已毕业/离职（出现在周报中，但不应计入正常提交）
    const knownInactive = detectedNames.filter(n => knownNames.has(n) && ['graduated','left','inactive'].includes(knownNameMap.get(n)?.status || ''));
    // 3. 未知成员（周报中有但不在成员列表中）
    const unknownSubmitted = detectedNames.filter(n => !knownNames.has(n));
    // 4. 已知活跃但未提交（在 allPersons 中但不在 parsedReports 中）
    const knownMissing = activePersonsList
      .filter(p => (p.status === 'active' || p.status === undefined) && !detectedSet.has(p.name))
      .map(p => p.name);
    
    // 活跃成员总数（用于深度分析费用计算）
    const activeCount = activePersonsList.filter(p => p.status === 'active' || p.status === undefined).length;
    
    // 按角色进一步分组
    const knownSubmittedResearchers = knownSubmitted.filter(n => {
      const r = knownNameMap.get(n)?.role;
      return r && !['phd','undergraduate'].includes(r);
    });
    const knownSubmittedStudents = knownSubmitted.filter(n => {
      const r = knownNameMap.get(n)?.role;
      return r && ['phd','undergraduate'].includes(r);
    });
    const knownMissingResearchers = knownMissing.filter(n => {
      const r = knownNameMap.get(n)?.role;
      return r && !['phd','undergraduate'].includes(r);
    });
    const knownMissingStudents = knownMissing.filter(n => {
      const r = knownNameMap.get(n)?.role;
      return r && ['phd','undergraduate'].includes(r);
    });
    
    const actualCount = knownSubmitted.length; // 实际应分析的人数（活跃且已提交）
    const totalDetected = detectedNames.length; // 周报中检测到的总人数

    return (
      <div className="space-y-6">
        {/* Parse result */}
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-800">文件解析完成</span>
              <Badge className="bg-emerald-100 text-emerald-700 ml-2">
                周报中检测到 {totalDetected} 人 / 应分析 {actualCount} 人 / 未提交 {knownMissing.length} 人
              </Badge>
            </div>

            <div className="space-y-3">
              {/* === 未知成员（周报中有但不在成员列表）=== */}
              {unknownSubmitted.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-xs font-medium text-amber-700">周报中检测到新成员（未入库）({unknownSubmitted.length}人)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {unknownSubmitted.map(name => (
                      <Badge key={name} className="bg-amber-100 text-amber-700 text-[11px] px-2 py-0.5 border border-amber-300">{name}</Badge>
                    ))}
                  </div>
                  <p className="text-[10px] text-amber-600 mt-1">这些人在周报中有内容，但不在成员列表中。如需添加，请重新上传周报或前往设置页面添加。</p>
                </div>
              )}

              {/* === 已知成员 - 已提交 === */}
              {knownSubmittedResearchers.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-600" />
                    <span className="text-xs font-medium text-emerald-700">在职研究人员 - 已提交 ({knownSubmittedResearchers.length}人)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {knownSubmittedResearchers.map(name => (
                      <Badge key={name} className="bg-emerald-100 text-emerald-700 text-[11px] px-2 py-0.5 border border-emerald-300">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {knownSubmittedStudents.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-700">学生 - 已提交 ({knownSubmittedStudents.length}人)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {knownSubmittedStudents.map(name => (
                      <Badge key={name} className="bg-emerald-100 text-emerald-700 text-[11px] px-2 py-0.5 border border-emerald-300">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* === 已知成员 - 未提交 === */}
              {knownMissingResearchers.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">在职研究人员 - 未提交 ({knownMissingResearchers.length}人)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {knownMissingResearchers.map(name => (
                      <Badge key={name} variant="outline" className="text-slate-400 text-[11px] px-2 py-0.5 border-dashed">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}
              {knownMissingStudents.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">学生 - 未提交 ({knownMissingStudents.length}人)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {knownMissingStudents.map(name => (
                      <Badge key={name} variant="outline" className="text-slate-400 text-[11px] px-2 py-0.5 border-dashed">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* === 已知但已毕业/离职（出现在周报中）=== */}
              {knownInactive.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs font-medium text-slate-500">已毕业/离职但周报中有内容 ({knownInactive.length}人)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {knownInactive.map(name => (
                      <Badge key={name} variant="outline" className="text-slate-400 text-[11px] px-2 py-0.5 border-dashed">{name}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* File info */}
            <div className="mt-4 pt-3 border-t border-emerald-200 flex gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{researcherFile?.name}</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" />{phdFile?.name}</span>
            </div>
          </CardContent>
        </Card>

        {/* Cost estimation */}
        <Card className="border-amber-200 bg-amber-50/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">Kimi API 费用预估</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-slate-800">{(((actualCount * TOKENS_PER_PERSON) + (includeDeepAnalysis ? activeCount * estimateDeepAnalysisCost().tokens : 0)) / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-slate-500">预计Token消耗</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-800">{((actualCount * COST_PER_PERSON) + (includeDeepAnalysis ? activeCount * estimateDeepAnalysisCost().cost : 0)).toFixed(2)}</div>
                <div className="text-[10px] text-slate-500">预计费用 (元)</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-800">~{Math.ceil((actualCount * 0.6) + (includeDeepAnalysis ? activeCount * 3 : 0))}</div>
                <div className="text-[10px] text-slate-500">预计耗时 (秒)</div>
              </div>
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              仅对已提交{actualCount}人进行AI分析（未提交{knownMissing.length}人跳过），~{TOKENS_PER_PERSON} tokens/人，约¥{COST_PER_PERSON.toFixed(4)}元/人（Kimi官方: 输入¥6.50/百万 + 输出¥27.00/百万）。
              {includeDeepAnalysis && (
                <span className="text-cyan-600 ml-1">+ 深度评估{activePersonsList.filter(p => p.status === 'active' || p.status === undefined).length}人，~{estimateDeepAnalysisCost().tokens}tokens/人，约¥{estimateDeepAnalysisCost().cost.toFixed(4)}元/人。</span>
              )}
            </div>

            {/* 深度分析选项 */}
            <div className="mt-3 pt-3 border-t border-amber-200">
              <label className="flex items-start gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={includeDeepAnalysis}
                  onChange={e => setIncludeDeepAnalysis(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-700 group-hover:text-cyan-700 transition-colors flex items-center gap-1.5">
                    <BrainCircuit className="w-4 h-4 text-cyan-600" />
                    同时对所有成员进行科研进展深度评估
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    勾选后，在分析完周报后，将对<strong>{activePersonsList.filter(p => p.status === 'active' || p.status === undefined).length}位活跃成员</strong>逐一进行科研进展深度评估（含研究热点分析、下一步建议、风险提示），额外消耗约<strong>{(activePersonsList.filter(p => p.status === 'active' || p.status === undefined).length * estimateDeepAnalysisCost().cost).toFixed(2)}元</strong>。
                  </div>
                </div>
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Start analysis button - PROMINENT */}
        <div className="flex flex-col items-center gap-3 py-4">
          <Button
            size="lg"
            onClick={startAnalysis}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-12 py-6 text-lg shadow-lg"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            开始AI分析
            <ChevronRight className="w-5 h-5 ml-1" />
          </Button>
          <p className="text-xs text-slate-400">将对已提交的{actualCount}位成员进行深度研判，未提交{knownMissing.length}人将标注"本周未提交周报"</p>
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={reset} className="text-slate-400">
            重新上传文件
          </Button>
        </div>
      </div>
    );
  }

  // ─── Phase: Analyzing ───
  if (phase === 'analyzing') {
    const pct = Math.round((analysisProgress.completed / analysisProgress.total) * 100);
    return (
      <div className="space-y-6">
        <Card className="border-cyan-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Loader2 className="w-6 h-6 text-cyan-600 animate-spin" />
              <div>
                <div className="font-semibold text-slate-800">AI分析进行中</div>
                <div className="text-xs text-slate-500">Kimi k2.6 • {analysisProgress.total}人深度研判（未提交成员已跳过）</div>
              </div>
            </div>

            <Progress value={pct} className="h-3 mb-2" />
            <div className="flex justify-between text-xs text-slate-500 mb-4">
              <span>{analysisProgress.completed}/{analysisProgress.total} 人</span>
              <span>{pct}%</span>
            </div>

            {/* Current person */}
            {analysisProgress.currentPerson && (
              <div className="flex items-center gap-2 text-sm text-cyan-700 bg-cyan-50 rounded-lg px-3 py-2 mb-4">
                <BrainCircuit className="w-4 h-4" />
                正在分析: <strong>{analysisProgress.currentPerson}</strong>
              </div>
            )}

            {/* Deep analysis progress */}
            {includeDeepAnalysis && deepAnalysisProgress.total > 0 && (
              <div className="flex items-center gap-2 text-sm text-purple-700 bg-purple-50 rounded-lg px-3 py-2 mb-4">
                <Sparkles className="w-4 h-4 animate-pulse" />
                深度评估: <strong>{deepAnalysisProgress.current}/{deepAnalysisProgress.total}</strong> 人
                {deepAnalysisProgress.currentName && ` (${deepAnalysisProgress.currentName})`}
              </div>
            )}

            {/* Cost tracking */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-slate-700">{(analysisProgress.tokensUsed / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-slate-400">已用Tokens</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-slate-700">{(analysisProgress.completed * COST_PER_PERSON).toFixed(2)}</div>
                <div className="text-[10px] text-slate-400">已花费 (元)</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-2 text-center">
                <div className="text-sm font-bold text-slate-700">{((analysisProgress.total - analysisProgress.completed) * COST_PER_PERSON).toFixed(2)}</div>
                <div className="text-[10px] text-slate-400">剩余预估 (元)</div>
              </div>
            </div>

            {/* Logs */}
            <div className="bg-slate-900 rounded-lg p-3 max-h-40 overflow-y-auto">
              <div className="text-[10px] font-mono text-green-400 space-y-0.5">
                {analysisProgress.logs.slice(-8).map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
                {analysisProgress.currentPerson && (
                  <div className="text-cyan-400 animate-pulse">
                    [{new Date().toLocaleTimeString()}] 分析中: {analysisProgress.currentPerson}...
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Phase: Done ───
  if (phase === 'done') {
    const totalCost = analysisProgress.completed * COST_PER_PERSON;
    return (
      <div className="space-y-6">
        <Card className="border-emerald-200 bg-emerald-50/50">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-emerald-800 mb-1">AI分析完成！</h3>
            <p className="text-sm text-emerald-600 mb-4">
              已完成{analysisProgress.total}位已提交成员的深度研判（未提交成员已跳过）
              {deepAnalysisDone && (
                <span className="text-purple-600 block mt-1">+ {deepAnalysisProgress.current}人科研进展深度评估已完成</span>
              )}
            </p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded-lg p-3">
                <div className="text-xl font-bold text-slate-800">{analysisProgress.total}</div>
                <div className="text-[10px] text-slate-500">分析人数</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xl font-bold text-slate-800">{(analysisProgress.tokensUsed / 1000).toFixed(0)}K</div>
                <div className="text-[10px] text-slate-500">Token消耗</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xl font-bold text-slate-800">{totalCost.toFixed(2)}</div>
                <div className="text-[10px] text-slate-500">总费用 (元)</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-xl font-bold text-slate-800">{retryCount > 0 ? `${retryCount}次` : '—'}</div>
                <div className="text-[10px] text-slate-500">自动重试</div>
              </div>
            </div>

            <div className="flex justify-center gap-3 flex-wrap">
              <Button
                onClick={() => window.location.hash = '#/analysis'}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                查看人员分析
              </Button>
              {deepAnalysisDone && (
                <Button
                  onClick={() => window.location.hash = '#/analysis'}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  查看深度评估结果
                </Button>
              )}
              {failedPersons.length > 0 && (
                <Button
                  onClick={handleRetryFailed}
                  disabled={isRetrying}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  {isRetrying ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
                  {isRetrying ? '重试中...' : `仅重试失败人员 (${failedPersons.length}人)`}
                </Button>
              )}
              <Button
                onClick={() => window.location.hash = '#/pdf-report'}
                variant="outline"
              >
                <FileText className="w-4 h-4 mr-1" />
                生成PDF报告
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed cost breakdown */}
        <Card className="border-slate-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Coins className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-slate-700">Kimi API 费用明细</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">输入Token ({(analysisProgress.completed * 400 / 1000).toFixed(1)}K @ $0.95/M)</span>
                <span className="font-medium">{(analysisProgress.completed * 400 * 6.50 / 1_000_000).toFixed(4)} 元</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">输出Token ({(analysisProgress.completed * 70 / 1000).toFixed(1)}K @ $4.00/M)</span>
                <span className="font-medium">{(analysisProgress.completed * 70 * 27.00 / 1_000_000).toFixed(4)} 元</span>
              </div>
              <div className="flex justify-between py-1 font-semibold text-slate-800">
                <span>合计</span>
                <span className="text-amber-700">{totalCost.toFixed(3)} 元</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button variant="ghost" size="sm" onClick={reset} className="text-slate-400">
            分析新周报
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
