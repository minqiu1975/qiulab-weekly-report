import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import AssessmentPanel from '../components/AssessmentPanel';
import DeepAnalysisPanel from '../components/DeepAnalysisPanel';
import { getLatestAssessmentMerged, MOCK_ASSESSMENTS } from '../data/mockAssessments';
import { ROLE_LABEL_MAP, ROLE_ORDER } from '../data/mockPersons';
import { getMergedPersonHistory } from '../lib/dynamicStorage';
import { usePersons, notifyPersonsUpdated } from '../hooks/usePersons';
import { cloudStorage } from '../services/cloudStorage';
import { callKimiApi } from '../lib/kimiApi';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
} from 'recharts';
import { UserSearch, Printer, CalendarDays, History, ChevronDown, ChevronRight, AlertTriangle, Sparkles, Loader2, Users, Lightbulb } from 'lucide-react';

const COLORS = ['#059669', '#d97706', '#dc2626'];

// 每个人的历史工作摘要（16期，最新在前）
const PERSON_HISTORY: Record<string, { week: string; summary: string }[]> = {
  '严巍': [
    { week: '2026.05.09', summary: '等离激元涡旋光学论文修回，PL文章数据补充' },
    { week: '2026.04.30', summary: '等离激元光操控实验推进，论文写作' },
    { week: '2026.04.24', summary: '涡旋光学实验数据采集，文献整理' },
    { week: '2026.04.17', summary: '实验方案优化，设备调试' },
    { week: '2026.04.10', summary: '等离激元领域文献调研' },
    { week: '2026.04.03', summary: '补充PL文章仿真，修改OL文章' },
    { week: '2026.03.27', summary: 'd参数仿真完成PL初稿完成PIERS准备' },
    { week: '2026.03.20', summary: 'PL仿真优化BEM编写d参数计算' },
    { week: '2026.03.13', summary: '粗糙表面d参数计算PIERS推进' },
    { week: '2026.03.06', summary: '补充PL仿真修改OL文章' },
    { week: '2026.02.12', summary: '金片PL双峰模型完善（溅射LSPR+gap plasmon），OL文章回复修改，春节矢量光场建模计划' },
    { week: '2026.02.06', summary: 'PL双峰解释（溅射LSPR+gap plasmon），OL文章回复信修改，春节计划矢量光场传播建模' },
    { week: '2026.01.30', summary: 'PL粗糙度模型反思改善，溅射小颗粒LSPR峰解释575nm，gap plasmon解释620nm，OL文章回复修改返吕未' },
    { week: '2026.01.23', summary: '金片PL双峰解释模型完善，OL文章回复信修改返吕未' },
    { week: '2026.01.16', summary: '金片PL仿真引入溅射小颗粒LSPR模型解释双峰，OL文章回复信修改返给吕未' },
    { week: '2026.01.09', summary: 'PL信号仿真，发现粗糙度模型遗漏FIB溅射效应，引入现象参数解释575nm和620nm双峰' },
  ],
  '陈瑞溢': [
    { week: '2026.05.09', summary: '激光彩钛工艺优化，TiN光学防伪样品制备' },
    { week: '2026.04.30', summary: '微纳光子学实验推进，多线并进数据采集' },
    { week: '2026.04.24', summary: '实验参数优化，样品表征' },
    { week: '2026.04.17', summary: 'TiN薄膜制备工艺改进' },
    { week: '2026.04.10', summary: '文献调研与实验设计' },
    { week: '2026.04.03', summary: '全彩一键打印3分钟完成，单色少色工艺定标确定' },
    { week: '2026.03.27', summary: '全彩图片库建立单色少色工艺确定' },
    { week: '2026.03.20', summary: '全彩一键打印3分钟完成单色少色工艺定标' },
    { week: '2026.03.13', summary: '全彩图片一键化打印代码开发钛合金参数优化' },
    { week: '2026.03.06', summary: '皮秒激光打印设备参数化扫描多基底Ti合金测试' },
    { week: '2026.02.12', summary: '打印软件合同签订，控制卡寄出，钛合金共聚焦压痕，国自然基金投递' },
    { week: '2026.02.06', summary: '打印软件合同付款，控制卡寄出，钛合金共聚焦压痕发现，国自然基金初稿投递' },
    { week: '2026.01.30', summary: '打印软件合同签订付款，控制卡寄出待安装，钛合金共聚焦表征发现压痕，国自然基金初稿投递' },
    { week: '2026.01.23', summary: '打印软件灰度图合同签订，控制卡寄出待安装，钛合金共聚焦表征发现压痕，国自然基金初稿投递' },
    { week: '2026.01.16', summary: '皮秒激光打印软件灰度图方案确定，钛合金磨损测试（钢丝绒1000次褪色），国自然青年基金撰写' },
  ],
  '潘婧': [
    { week: '2026.05.09', summary: '光计算论文修改返修，光纤端面光计算实验推进，SORD计算光谱仪DNN训练优化' },
    { week: '2026.04.30', summary: '光计算论文提交审稿，SORD计算光谱仪DNN训练启动' },
    { week: '2026.04.24', summary: '光纤端面超表面仿真优化，光计算模型调参' },
    { week: '2026.04.17', summary: '光计算理论推导，实验方案设计' },
    { week: '2026.04.10', summary: '文献调研，光计算前沿跟踪' },
    { week: '2026.04.03', summary: '光计算论文修改70%完成，展示墙设计更新' },
    { week: '2026.03.27', summary: '光计算论文修改完成参加国家奖培训会' },
    { week: '2026.03.20', summary: '光计算论文修改70%完成展示墙设计更新' },
    { week: '2026.03.13', summary: '与专利律师沟通完善光计算论文修改至70%展示墙设计更新' },
    { week: '2026.03.06', summary: '提交专利交底书撰写权利要求书初稿' },
    { week: '2026.02.12', summary: 'SORD论文投稿Nature系列，青基润色配图，Fiber论文框架' },
    { week: '2026.02.06', summary: 'SORD论文投稿Nature系列，青基申请书润色配图，Fiber论文框架搭建' },
    { week: '2026.01.30', summary: 'SORD论文全文检查完成，投稿Nature-Nature Photonics-Nature Sensors-Nature Communica' },
    { week: '2026.01.23', summary: 'SORD论文全文检查SI检查参考文献插入，投稿Nature系列' },
    { week: '2026.01.16', summary: 'SORD论文最终版敲定图片编码校对，青基申请书全部文字撰写完成' },
  ],
  '谢宇': [
    { week: '2026.05.09', summary: 'SiC微槽天线论文投稿，FIB加工工艺改进' },
    { week: '2026.04.30', summary: '积极推进论文写作与投稿，SiC纳米加工实验推进' },
    { week: '2026.04.24', summary: '实验数据整理，论文初稿撰写' },
    { week: '2026.04.17', summary: 'FIB加工参数优化' },
    { week: '2026.04.10', summary: 'SiC领域文献调研' },
    { week: '2026.04.03', summary: '图2与图3调整补充，正文润色，支撑文件完善' },
    { week: '2026.03.27', summary: 'SiC微槽天线论文投稿FIB加工工艺改进' },
    { week: '2026.03.20', summary: '积极推进论文写作与投稿SiC纳米加工实验推进' },
    { week: '2026.03.13', summary: '实验数据整理论文初稿撰写' },
    { week: '2026.03.06', summary: 'FIB加工微孔阵列仿真深入散射截面数据补充关键结果优化' },
    { week: '2026.02.12', summary: 'COMSOL-FDTD对比，fs微孔阵列，LPR接收，Light送审，综述' },
    { week: '2026.02.06', summary: 'COMSOL与FDTD对比，fs激光微孔阵列，LPR接收，Light送审，热辐射源文章' },
    { week: '2026.01.30', summary: 'COMSOL仿真与FDTD对比，fs激光微孔阵列仿真，LPR文章接收，SiC微槽天线投稿Light送审，热辐射源文章撰写' },
    { week: '2026.01.23', summary: 'LPR文章接收，SiC微槽天线投稿Light送审，fs激光结构化SiC热辐射源文章撰写，微球热辐射超分辨成像文章' },
    { week: '2026.01.16', summary: 'Au-Ge-SiC微盘阵列FIB刻蚀完成，FTIR测试准备，SiC photonics综述撰写' },
    { week: '2026.01.09', summary: 'Audisk-Spacer-SiC阵列COMSOL多维度仿真，Ge隔离层光谱色散研究，Purcell因子计算，确定刻蚀参数' },
  ],
  '薛环一': [
    { week: '2026.05.09', summary: '扫描热显微镜(SThM)系统调试，TEM表征分析' },
    { week: '2026.04.30', summary: '扫描热显微镜实验推进，TEM数据采集' },
    { week: '2026.04.24', summary: '样品制备与表征测试' },
    { week: '2026.04.17', summary: 'SThM系统校准' },
    { week: '2026.04.10', summary: '热显微镜领域文献调研' },
    { week: '2026.04.03', summary: '噪声降至2nm，21K下扫描成功，探针cooling验证' },
    { week: '2026.03.27', summary: '扫描热显微镜(SThM)系统调试TEM表征分析' },
    { week: '2026.03.20', summary: '扫描热显微镜实验推进TEM数据采集' },
    { week: '2026.03.13', summary: '样品制备与表征测试' },
    { week: '2026.03.06', summary: 'SThM系统校准' },
    { week: '2026.02.12', summary: '20K AFM噪声，样品台优化，温控 redesign' },
    { week: '2026.02.06', summary: '20K低温AFM噪声分析，样品台优化，温控 redesign' },
    { week: '2026.01.30', summary: '低温AFM噪声分析，3D打印样品台重新设计，温控heater redesign' },
    { week: '2026.01.23', summary: '低温AFM噪声分析，3D打印样品台优化，温控heater redesign' },
    { week: '2026.01.16', summary: '20K低温AFM噪声分析，3D打印样品台重新优化设计，温控heater重新设计放置样品台底部' },
    { week: '2026.01.09', summary: 'MBE薄膜制备完成，器件制备解决漏电问题，GM制冷机20K下AFM形貌表征成功' },
  ],
  '赵康': [
    { week: '2026.05.09', summary: '冰刻生物机器人实验推进，冷冻保存方案优化' },
    { week: '2026.04.30', summary: '冰刻技术优化，生物光子学实验数据采集' },
    { week: '2026.04.24', summary: '生物样品制备与测试' },
    { week: '2026.04.17', summary: '冰刻工艺参数调优' },
    { week: '2026.04.10', summary: '冰刻领域文献调研' },
    { week: '2026.04.03', summary: '青年基金定稿提交，长春光标委会议，生物冰刻实验' },
    { week: '2026.03.27', summary: '冰刻生物机器人实验推进冷冻保存方案优化' },
    { week: '2026.03.20', summary: '冰刻技术优化生物光子学实验数据采集' },
    { week: '2026.03.13', summary: '生物样品制备与测试' },
    { week: '2026.03.06', summary: '冰刻工艺参数调优' },
    { week: '2026.02.12', summary: '青基完成，超构光纤文章定稿，大电镜关机' },
    { week: '2026.02.06', summary: '青基完成，超构光纤文章定稿，大电镜关机' },
    { week: '2026.01.30', summary: '青基初稿完成，超构光纤激光器文章修改定稿，大电镜关机' },
    { week: '2026.01.23', summary: '青基初稿完成，超构光纤激光器文章修改定稿，大电镜关机' },
    { week: '2026.01.16', summary: '青基初稿完成，超构光纤激光器文章修改定稿，大电镜检查关机' },
    { week: '2026.01.09', summary: '冷冻传输电镜实验：衣藻冷冻后全部死亡，设计分解实验排查；水凝胶电子器件调研；冰刻超构光纤文章定稿' },
  ],
  '郑豪杰': [
    { week: '2026.05.09', summary: '本科毕业论文撰写接近完成，激光氧化膜厚度计算' },
    { week: '2026.04.30', summary: '本科毕业论文撰写中，下周和导师讨论修改' },
    { week: '2026.04.24', summary: '钛合金氧化膜粘附力测试，讨论改善粗糙度方案' },
    { week: '2026.04.17', summary: '镜面抛光面结构色制备效果提升，确定氧化膜参数' },
    { week: '2026.04.10', summary: '镜面抛光面结构色反射率提升，整理色域范围' },
    { week: '2026.04.03', summary: '样品光谱测试确定厚度，提交中期报告' },
    { week: '2026.03.27', summary: '小型钛合金样品结构色加工，准备粘附力测试' },
    { week: '2026.03.20', summary: '小型钛合金样品结构色加工，反射光谱确认厚度' },
    { week: '2026.03.13', summary: '样品精加工切割，学习论文作图，绘制氧化对比图' },
    { week: '2026.03.06', summary: '多脉冲氧化模型优化，皮秒vs纳秒氧化膜厚度计算' },
    { week: '2026.02.12', summary: '多脉冲氧化模型优化，皮秒vs纳秒氧化膜厚度计算，调研激光与材料作用' },
    { week: '2026.02.06', summary: '补充拉曼和反射光谱测试，氧化膜光谱仿真倒推厚度' },
    { week: '2026.01.30', summary: '补充光谱测试，仿真倒推氧化膜厚度，样品切割' },
    { week: '2026.01.23', summary: '块体钛合金论文讨论写作思路分工，讨论厚度测量方案' },
    { week: '2026.01.16', summary: '单脉冲多脉冲氧化实验，优化多脉冲模型，开题报告修改' },
    { week: '2026.01.09', summary: '单脉冲多脉冲氧化实验，调整仿真模型，修改开题报告格式' },
  ],
  '孙歆语': [
    { week: '2026.05.09', summary: '冰刻剥离转移工艺优化，范德华接触实验推进' },
    { week: '2026.04.30', summary: '冰刻剥离转移实验推进，表征测试' },
    { week: '2026.04.24', summary: '转移工艺改进，样品表征' },
    { week: '2026.04.17', summary: '剥离参数优化' },
    { week: '2026.04.10', summary: '范德华接触领域文献调研' },
    { week: '2026.04.03', summary: '理论数据归纳，两个分类讨论方案' },
    { week: '2026.03.27', summary: '冰刻剥离转移工艺优化范德华接触实验推进' },
    { week: '2026.03.20', summary: '冰刻剥离转移实验推进表征测试' },
    { week: '2026.03.13', summary: '转移工艺改进样品表征' },
    { week: '2026.03.06', summary: '剥离参数优化' },
    { week: '2026.02.12', summary: '耦合强度先升后降实验，文献调研' },
    { week: '2026.02.06', summary: '耦合强度新增先升后降实验，文献调研' },
    { week: '2026.01.30', summary: '耦合强度理论新增先升后降实验，文献调研场强解释' },
    { week: '2026.01.23', summary: '耦合强度理论新增先升后降趋势实验，文献调研场强解释' },
    { week: '2026.01.16', summary: '耦合强度理论解释新增先上升后下降趋势实验，结合文献调研场强解释' },
    { week: '2026.01.09', summary: '论文图片整理基本完成，正文所有图片内容确定，同步补充SI；二维材料转移系统调研采购' },
  ],
  '薛淑雯': [
    { week: '2026.05.09', summary: '大尺寸消色差超透镜设计迭代，SiC微纳结构相位覆盖优化' },
    { week: '2026.04.30', summary: '消色差超透镜设计推进，FDTD仿真计算优化' },
    { week: '2026.04.24', summary: '微纳结构单元仿真，参数扫描' },
    { week: '2026.04.17', summary: '超透镜设计方案优化' },
    { week: '2026.04.10', summary: '超表面领域文献调研' },
    { week: '2026.04.03', summary: '双面超透镜脚本优化，150um仿真完成' },
    { week: '2026.03.27', summary: '大尺寸消色差超透镜设计迭代SiC微纳结构相位覆盖优化' },
    { week: '2026.03.20', summary: '消色差超透镜设计推进FDTD仿真计算优化' },
    { week: '2026.03.13', summary: '微纳结构单元仿真参数扫描' },
    { week: '2026.03.06', summary: '超透镜设计方案优化' },
    { week: '2026.02.12', summary: '青年基金二三部分完成，润色' },
    { week: '2026.02.06', summary: '青年基金二三部分完成，润色' },
    { week: '2026.01.30', summary: '青年基金第二三部分完成，申请书润色' },
    { week: '2026.01.23', summary: '青年基金第二三部分完成，申请书润色' },
    { week: '2026.01.16', summary: '青年基金申请书第二三部分完成（研究内容+可行性分析），600nm周期延迟范围0-24fs' },
    { week: '2026.01.09', summary: '400nm与600nm周期延迟范围对比仿真，600nm周期优势明显（0-24fs覆盖）；青年基金第一部分撰写' },
  ],
  '邵露青': [
    { week: '2026.05.09', summary: '单模光纤激光直写实验推进，TEM微观结构分析' },
    { week: '2026.04.30', summary: 'TEM实验样品微观结构变化分析，工艺优化' },
    { week: '2026.04.24', summary: '光纤激光加工实验推进' },
    { week: '2026.04.17', summary: '激光直写参数优化' },
    { week: '2026.04.10', summary: '光纤激光加工领域文献调研' },
    { week: '2026.04.03', summary: '低温PL数据分析完成，退火600度效果最佳' },
    { week: '2026.03.27', summary: '单模光纤激光直写实验推进TEM微观结构分析' },
    { week: '2026.03.20', summary: 'TEM实验样品微观结构变化分析工艺优化' },
    { week: '2026.03.13', summary: '光纤激光加工实验推进' },
    { week: '2026.03.06', summary: '激光直写参数优化' },
    { week: '2026.02.12', summary: '调休' },
    { week: '2026.02.06', summary: '调休' },
    { week: '2026.01.30', summary: '提前调休' },
    { week: '2026.01.23', summary: '提前申请调休' },
    { week: '2026.01.16', summary: '文章修改，综述S5部分撰写提纲整理，仿真优化' },
    { week: '2026.01.09', summary: '腔结构FDTD建模仿真（Q值340），悬臂梁孔阵列工艺摸索，退火实验多参数对比' },
  ],
  '吕未': [
    { week: '2026.05.09', summary: '微纳光子学实验推进，光场调控表征优化' },
    { week: '2026.04.30', summary: '微纳光子学实验推进，数据采集分析' },
    { week: '2026.04.24', summary: '光子学器件表征测试' },
    { week: '2026.04.17', summary: '光场调控方案优化' },
    { week: '2026.04.10', summary: '微纳光子学文献调研' },
    { week: '2026.04.03', summary: '光场调控实验参数优化，微纳结构表征' },
    { week: '2026.03.27', summary: '微纳光子学实验推进光场调控表征优化' },
    { week: '2026.03.20', summary: '微纳光子学实验推进数据采集分析' },
    { week: '2026.03.13', summary: '光子学器件表征测试' },
    { week: '2026.03.06', summary: '光场调控方案优化' },
    { week: '2026.02.12', summary: '微纳光子学文献阅读，实验方案设计' },
    { week: '2026.02.06', summary: '微纳光子学文献阅读，实验方案设计' },
    { week: '2026.01.30', summary: '微纳光子学文献阅读，实验方案设计' },
    { week: '2026.01.23', summary: '微纳光子学文献阅读，实验方案设计' },
    { week: '2026.01.16', summary: '微纳光子学文献阅读，实验方案设计' },
    { week: '2026.01.09', summary: '微纳光子学文献阅读，实验方案设计' },
  ],
  '刘天远': [
    { week: '2026.05.09', summary: '随机介质涡旋光学理论推导，仿真验证' },
    { week: '2026.04.30', summary: '涡旋光学实验推进，数据获取' },
    { week: '2026.04.24', summary: '随机介质实验方案设计' },
    { week: '2026.04.17', summary: '涡旋光学仿真计算' },
    { week: '2026.04.10', summary: '随机介质涡旋光学文献调研' },
    { week: '2026.04.03', summary: '二维Hamiltonian推导，涡旋光理论验证' },
    { week: '2026.03.27', summary: '随机介质涡旋光学理论推导仿真验证' },
    { week: '2026.03.20', summary: '涡旋光学实验推进数据获取' },
    { week: '2026.03.13', summary: '随机介质实验方案设计' },
    { week: '2026.03.06', summary: '涡旋光学仿真计算' },
    { week: '2026.02.12', summary: 'BIC文献，introduction，量子力学' },
    { week: '2026.02.06', summary: 'BIC文献，introduction，量子力学补习' },
    { week: '2026.01.30', summary: 'BIC文献阅读，粗糙版introduction，假期补习量子力学' },
    { week: '2026.01.23', summary: 'BIC文献阅读，粗糙版introduction撰写中，假期补习量子力学' },
    { week: '2026.01.16', summary: 'BIC综述文献阅读，粗糙版长introduction撰写中' },
    { week: '2026.01.09', summary: '阅读BIC综述和代表性文献，办理进站手续' },
  ],
  '林春博': [
    { week: '2026.05.09', summary: '电子束力(PRL)实验推进，光操控理论研究' },
    { week: '2026.04.30', summary: '电子束力实验数据采集，理论分析' },
    { week: '2026.04.24', summary: '实验装置调试' },
    { week: '2026.04.17', summary: '光操控实验方案优化' },
    { week: '2026.04.10', summary: '电子束力领域文献调研' },
    { week: '2026.04.03', summary: 'Blender三维绘图，纳米线实验推进，ESEM数据获取' },
    { week: '2026.03.27', summary: '电子束力(PRL)实验推进光操控理论研究' },
    { week: '2026.03.20', summary: '电子束力实验数据采集理论分析' },
    { week: '2026.03.13', summary: '实验装置调试' },
    { week: '2026.03.06', summary: '光操控实验方案优化' },
    { week: '2026.02.12', summary: '反射率标定光力拟合k值0.001N/m画图FIB镀膜' },
    { week: '2026.02.06', summary: '反射率标定，光力拟合，k值0.001N/m，画图，FIB镀膜' },
    { week: '2026.01.30', summary: '反射率标定，光力拟合，弹簧k值0.001N/m，FIB镀膜' },
    { week: '2026.01.23', summary: '反射率测量标定，光力计算拟合参数确定，弹簧k值0.001N/m，画图，FIB镀膜' },
    { week: '2026.01.16', summary: '画图实验' },
    { week: '2026.01.09', summary: '反射率透射率光谱测试弹簧制备，画图，安装调试共聚焦侧向观察系统' },
  ],
  '李志浩': [
    { week: '2026.05.09', summary: 'SiC超透镜加工优化，片上集成方案设计' },
    { week: '2026.04.30', summary: 'SiC超透镜实验推进，加工工艺改进' },
    { week: '2026.04.24', summary: '超透镜表征测试' },
    { week: '2026.04.17', summary: 'SiC加工参数优化' },
    { week: '2026.04.10', summary: 'SiC光子学文献调研' },
    { week: '2026.04.03', summary: 'SORD文章修改，博士开题报告PPT制作' },
    { week: '2026.03.27', summary: 'SiC超透镜加工优化片上集成方案设计' },
    { week: '2026.03.20', summary: 'SiC超透镜实验推进加工工艺改进' },
    { week: '2026.03.13', summary: '超透镜表征测试' },
    { week: '2026.03.06', summary: 'SiC加工参数优化' },
    { week: '2026.02.12', summary: 'Fiber文章完成SiC review光计算消色差STOV' },
    { week: '2026.02.06', summary: 'Fiber文章完成，SiC review，光计算，消色差透镜，STOV' },
    { week: '2026.01.30', summary: 'Fiber文章修改完成，SiC review，光计算优化，消色差透镜，STOV' },
    { week: '2026.01.23', summary: 'Fiber Sensor文章修改完成，SiC review整理，光计算优化，消色差透镜设计' },
    { week: '2026.01.16', summary: 'Fiber Sensor文章修改，SiC review整理，光计算优化，消色差透镜设计，STOV时域图' },
    { week: '2026.01.09', summary: 'Fiber Sensor Perception文章修改，SiC review整理，光计算设计，帮薛淑雯消色差透镜计算' },
  ],
  '欧玟': [
    { week: '2026.05.09', summary: '柔性有机光伏(OPV)器件效率优化，新结构设计' },
    { week: '2026.04.30', summary: 'OPV器件制备与测试，效率提升实验' },
    { week: '2026.04.24', summary: '器件表征与数据分析' },
    { week: '2026.04.17', summary: '有机光伏材料合成' },
    { week: '2026.04.10', summary: 'OPV领域文献调研' },
    { week: '2026.04.03', summary: '有机太阳能电池激活小鼠坐骨神经' },
    { week: '2026.03.27', summary: '柔性有机光伏(OPV)器件效率优化新结构设计' },
    { week: '2026.03.20', summary: 'OPV器件制备与测试效率提升实验' },
    { week: '2026.03.13', summary: '器件表征与数据分析' },
    { week: '2026.03.06', summary: '有机光伏材料合成' },
    { week: '2026.02.12', summary: '膜片钳测试伦理申请课题框架Figure1-5' },
    { week: '2026.02.06', summary: '膜片钳测试，伦理申请，课题框架' },
    { week: '2026.01.30', summary: '膜片钳测试，伦理申请，课题框架确定' },
    { week: '2026.01.23', summary: '膜片钳测试，实验动物伦理申请，课题框架Figure1-5确定' },
    { week: '2026.01.16', summary: '膜片钳测试神经细胞光激活，实验动物伦理申请，课题框架确定' },
    { week: '2026.01.09', summary: '膜片钳电生理测试ITO/ZnO/C60/Te/Se/Au器件上神经细胞光激活结果' },
  ],
  '陈博取': [
    { week: '2026.05.09', summary: 'SiC并行激光加工工艺优化，可调超表面设计' },
    { week: '2026.04.30', summary: 'SiC并行加工实验推进，超表面仿真' },
    { week: '2026.04.24', summary: '激光加工参数调优' },
    { week: '2026.04.17', summary: '可调超表面方案设计' },
    { week: '2026.04.10', summary: 'SiC激光加工领域文献调研' },
    { week: '2026.04.03', summary: '预答辩报告准备，Device文章proof校对' },
    { week: '2026.03.27', summary: 'SiC并行激光加工工艺优化可调超表面设计' },
    { week: '2026.03.20', summary: 'SiC并行加工实验推进超表面仿真' },
    { week: '2026.03.13', summary: '激光加工参数调优' },
    { week: '2026.03.06', summary: '可调超表面方案设计' },
    { week: '2026.02.12', summary: '毕业论文第二章完成第三章50% Device审稿回复' },
    { week: '2026.02.06', summary: '毕业论文第二章完成，Device审稿回复' },
    { week: '2026.01.30', summary: '毕业论文第三章50%，Device审稿回复' },
    { week: '2026.01.23', summary: '毕业论文第三章50%，Device文章审稿意见回复' },
    { week: '2026.01.16', summary: '毕业论文第三章50%完成，Device文章proof' },
    { week: '2026.01.09', summary: '毕业论文第二章碳化硅微纳光子器件研究基础撰写' },
  ],
  '陈代吉': [
    { week: '2026.05.09', summary: 'QBIC仿真参数优化，学习光电子学理论' },
    { week: '2026.04.30', summary: '周末考试准备，阅读参考书，等待模拟结果分析' },
    { week: '2026.04.24', summary: '黄金与SiO2/OICE的Chiral QBIC模拟，了解TOPV化学研究背景' },
    { week: '2026.04.17', summary: 'nanorod QBIC模拟，结果与论文不一致需找差别' },
    { week: '2026.04.10', summary: '冰刻制造QBIC结构设计，准备模拟' },
    { week: '2026.04.03', summary: '复现Kühner/Hu/Chen三篇论文模拟，学习TOPV文献' },
    { week: '2026.03.27', summary: '光电子学理论学习，基础实验技能训练' },
    { week: '2026.03.20', summary: '光电子学理论学习，基础实验技能训练' },
    { week: '2026.03.13', summary: '光电子学理论学习，基础实验技能训练' },
    { week: '2026.03.06', summary: '光电子学理论学习，基础实验技能训练' },
    { week: '2026.02.12', summary: '春节假期，光电子学理论学习' },
    { week: '2026.02.06', summary: '春节假期，光电子学理论学习' },
    { week: '2026.01.30', summary: '光电子学理论学习' },
    { week: '2026.01.23', summary: '光电子学理论学习' },
    { week: '2026.01.16', summary: '光电子学理论学习' },
    { week: '2026.01.09', summary: '光电子学理论学习' },
  ],
  '齐利民': [
    { week: '2026.05.09', summary: 'SiC光子学器件测试，设备管理维护' },
    { week: '2026.04.30', summary: 'SiC光子学实验推进' },
    { week: '2026.04.24', summary: '器件表征测试' },
    { week: '2026.04.17', summary: '实验方案优化' },
    { week: '2026.04.10', summary: 'SiC光子学文献调研' },
    { week: '2026.04.03', summary: '毕业论文初稿完成，毕业流程手续办理' },
    { week: '2026.03.27', summary: 'SiC光子学器件测试设备管理维护' },
    { week: '2026.03.20', summary: 'SiC光子学实验推进' },
    { week: '2026.03.13', summary: '器件表征测试' },
    { week: '2026.03.06', summary: '实验方案优化' },
    { week: '2026.02.12', summary: '基金结题修改毕业论文15K字' },
    { week: '2026.02.06', summary: '基金结题修改，毕业论文15K字绪论完成' },
    { week: '2026.01.30', summary: '基金结题，毕业论文15K字' },
    { week: '2026.01.23', summary: '基金结题修改，毕业论文15K字' },
    { week: '2026.01.16', summary: '基金结题修改，毕业论文15K字绪论完成' },
    { week: '2026.01.09', summary: '基金结题报告提交，毕业论文绪论思路整理写了3K字，帮飞霖修温度计、帮治蓉焊接电阻' },
  ],
  '卢奕含': [
    { week: '2026.05.09', summary: 'SiC超表面审稿回复准备，补充实验数据' },
    { week: '2026.04.30', summary: '审稿意见整理，回复方案制定' },
    { week: '2026.04.24', summary: '补充实验推进' },
    { week: '2026.04.17', summary: '审稿回复初稿撰写' },
    { week: '2026.04.10', summary: '审稿意见分析' },
    { week: '2026.04.03', summary: 'Light审稿仿真任务完成，力学仿真准备' },
    { week: '2026.03.27', summary: 'SiC超表面审稿回复准备补充实验数据' },
    { week: '2026.03.20', summary: '审稿意见整理回复方案制定' },
    { week: '2026.03.13', summary: '补充实验推进' },
    { week: '2026.03.06', summary: '审稿回复初稿撰写' },
    { week: '2026.02.12', summary: '大论文第五章100页' },
    { week: '2026.02.06', summary: '大论文第五章100页' },
    { week: '2026.01.30', summary: '大论文第五章100页' },
    { week: '2026.01.23', summary: '大论文第五章基本完成100页' },
    { week: '2026.01.16', summary: '大论文第五章基本完成只剩图片，总进度100页' },
    { week: '2026.01.09', summary: '大论文第五章正文基本完成，总进度95页' },
  ],
  '孙潇雨': [
    { week: '2026.05.09', summary: 'SiC微孔制备工艺优化，毕业论文修改' },
    { week: '2026.04.30', summary: 'SiC微孔制备实验推进，论文写作' },
    { week: '2026.04.24', summary: '微孔结构表征' },
    { week: '2026.04.17', summary: '制备参数优化' },
    { week: '2026.04.10', summary: '毕业论文框架梳理' },
    { week: '2026.04.03', summary: '反射率降至8.5%，大面积5x5mm加工成功' },
    { week: '2026.03.27', summary: 'SiC微孔制备工艺优化毕业论文修改' },
    { week: '2026.03.20', summary: 'SiC微孔制备实验推进论文写作' },
    { week: '2026.03.13', summary: '微孔结构表征' },
    { week: '2026.03.06', summary: '制备参数优化' },
    { week: '2026.02.12', summary: '微孔优化15ps/25kHz/20000脉冲孔深34μm阵列加工' },
    { week: '2026.02.06', summary: '微孔工艺优化（15ps/25kHz/20000脉冲），孔深34μm' },
    { week: '2026.01.30', summary: '微孔优化（15ps/25kHz/20000脉冲），孔深34μm，阵列加工' },
    { week: '2026.01.23', summary: '微孔工艺优化（15ps/25kHz/20000脉冲），孔深34μm，小面积阵列' },
    { week: '2026.01.16', summary: '微孔加工工艺优化（15ps脉宽、25kHz重频、20000脉冲），孔深34μm，小面积阵列加工' },
    { week: '2026.01.09', summary: '毕业论文修改再次送审，协助章子鉴消色差透镜测试和晓萱光路调试' },
  ],
  '裴海月': [
    { week: '2026.05.09', summary: '低温制冷系统集成测试，嵌入式芯片调试' },
    { week: '2026.04.30', summary: '低温制冷系统推进，嵌入式芯片测试' },
    { week: '2026.04.24', summary: '系统组件集成' },
    { week: '2026.04.17', summary: '制冷性能测试' },
    { week: '2026.04.10', summary: '低温制冷领域文献调研' },
    { week: '2026.04.03', summary: 'PCB温控模块完成制作，芯片漏气问题未解决' },
    { week: '2026.03.27', summary: '低温制冷系统集成测试嵌入式芯片调试' },
    { week: '2026.03.20', summary: '低温制冷系统推进嵌入式芯片测试' },
    { week: '2026.03.13', summary: '系统组件集成' },
    { week: '2026.03.06', summary: '制冷性能测试' },
    { week: '2026.02.12', summary: '小型化文章定稿制冷芯片密封问题' },
    { week: '2026.02.06', summary: '小型化文章定稿，制冷芯片密封' },
    { week: '2026.01.30', summary: '小型化文章定稿' },
    { week: '2026.01.23', summary: '小型化文章定稿，制冷芯片密封问题' },
    { week: '2026.01.16', summary: '小型化文章对比表格定稿，制冷芯片铟片密封漏气问题，热设计方法学习' },
    { week: '2026.01.09', summary: '基金年度总结报告4项工作内容整理配图，小型化文章对比表格80%完成' },
  ],
  '杨治蓉': [
    { week: '2026.05.09', summary: '冰刻金属结构优化，水熊虫光热实验推进' },
    { week: '2026.04.30', summary: '冰刻金属结构制备，光热效应测试' },
    { week: '2026.04.24', summary: '金属结构表征' },
    { week: '2026.04.17', summary: '光热实验方案设计' },
    { week: '2026.04.10', summary: '冰刻应用领域文献调研' },
    { week: '2026.04.03', summary: '冷台冰堵排查，催化方案验证不可行' },
    { week: '2026.03.27', summary: '冰刻金属结构优化水熊虫光热实验推进' },
    { week: '2026.03.20', summary: '冰刻金属结构制备光热效应测试' },
    { week: '2026.03.13', summary: '金属结构表征' },
    { week: '2026.03.06', summary: '光热实验方案设计' },
    { week: '2026.02.12', summary: '冷台故障维修完成加热电阻温度计更换水熊虫光热方案设计' },
    { week: '2026.02.06', summary: '冷台维修完成（加热电阻更换），水熊虫光热驱动方案设计' },
    { week: '2026.01.30', summary: '冷台维修，水熊虫文献，捕捉' },
    { week: '2026.01.23', summary: '冷台维修，水熊虫文献阅读，水熊虫捕捉' },
    { week: '2026.01.16', summary: '水熊虫体表金属结构光热驱动方案细化，文献阅读，水熊虫捕捉' },
    { week: '2026.01.09', summary: '冷台故障排查维修（加热电阻断路、温度计短路），水熊虫光热定向驱动方案设计（三阶段实验计划）' },
  ],
  '周子博': [
    { week: '2026.05.09', summary: '毕业论文终稿修改，答辩PPT准备' },
    { week: '2026.04.30', summary: '毕业论文修改完善' },
    { week: '2026.04.24', summary: '论文查重与格式调整' },
    { week: '2026.04.17', summary: '毕业论文初稿完成' },
    { week: '2026.04.10', summary: '论文数据整理' },
    { week: '2026.04.03', summary: '预答辩完成，大论文排版校稿' },
    { week: '2026.03.27', summary: '毕业论文终稿修改答辩PPT准备' },
    { week: '2026.03.20', summary: '毕业论文修改完善' },
    { week: '2026.03.13', summary: '论文查重与格式调整' },
    { week: '2026.03.06', summary: '毕业论文初稿完成' },
    { week: '2026.02.12', summary: '大论文第三章完成资格审查资料' },
    { week: '2026.02.06', summary: '大论文第三章完成，资格审查资料准备' },
    { week: '2026.01.30', summary: '大论文完成，资格审查' },
    { week: '2026.01.23', summary: '大论文完成，资格审查' },
    { week: '2026.01.16', summary: '大论文撰写完成，资格审查资料准备' },
    { week: '2026.01.09', summary: '大论文第三章实验部分完成，讨论部分完成50%' },
  ],
  '邓卉彤': [
    { week: '2026.05.09', summary: '毕业论文盲审回复，论文修改完善' },
    { week: '2026.04.30', summary: '毕业论文修改，盲审意见回复' },
    { week: '2026.04.24', summary: '盲审意见整理' },
    { week: '2026.04.17', summary: '毕业论文完善' },
    { week: '2026.04.10', summary: '论文格式规范调整' },
    { week: '2026.04.03', summary: '预答辩完成，大论文校稿修改' },
    { week: '2026.03.27', summary: '毕业论文盲审回复论文修改完善' },
    { week: '2026.03.20', summary: '毕业论文修改盲审意见回复' },
    { week: '2026.03.13', summary: '盲审意见整理' },
    { week: '2026.03.06', summary: '毕业论文完善' },
    { week: '2026.02.12', summary: '第一章完成初稿完成3.1前两轮修改3.16预答辩' },
    { week: '2026.02.06', summary: '第一章完成，初稿完成，3.1前修改' },
    { week: '2026.01.30', summary: '第一章完成，初稿完成' },
    { week: '2026.01.23', summary: '第一章完成，初稿完成' },
    { week: '2026.01.16', summary: '第一章全部内容完成，参考文献补充' },
    { week: '2026.01.09', summary: '第六章（总结与展望）完成，第一章1.3.3之前完成' },
  ],
  '王启南': [
    { week: '2026.05.09', summary: '钙钛矿探测器性能测试，TRPL表征分析' },
    { week: '2026.04.30', summary: '钙钛矿探测器实验推进，TRPL数据采集' },
    { week: '2026.04.24', summary: '器件性能优化' },
    { week: '2026.04.17', summary: 'TRPL测试方案优化' },
    { week: '2026.04.10', summary: '钙钛矿探测器领域文献调研' },
    { week: '2026.04.03', summary: '钙钛矿探测器器件测试，钙钛矿薄膜形貌表征' },
    { week: '2026.03.27', summary: '钙钛矿探测器性能测试TRPL表征分析' },
    { week: '2026.03.20', summary: '钙钛矿探测器实验推进TRPL数据采集' },
    { week: '2026.03.13', summary: '器件性能优化' },
    { week: '2026.03.06', summary: 'TRPL测试方案优化' },
    { week: '2026.02.12', summary: '三明治电池正文钙钛矿探测器调研表征' },
    { week: '2026.02.06', summary: '三明治电池正文完成，钙钛矿探测器调研' },
    { week: '2026.01.30', summary: '三明治电池正文完成，钙钛矿调研表征' },
    { week: '2026.01.23', summary: '三明治电池正文完成，钙钛矿探测器调研表征' },
    { week: '2026.01.16', summary: '三明治结构电池正文完成，钙钛矿探测器文献调研和SEM表征' },
    { week: '2026.01.09', summary: '三明治结构透明有机太阳能电池文章撰写，钙钛矿/PEIE探测器器件制备测试' },
  ],
  '欧阳祖希': [
    { week: '2026.05.09', summary: '纳米多孔碳制备优化，冰刻应用拓展实验' },
    { week: '2026.04.30', summary: '纳米多孔碳实验推进，冰刻应用探索' },
    { week: '2026.04.24', summary: '多孔碳结构表征' },
    { week: '2026.04.17', summary: '制备工艺优化' },
    { week: '2026.04.10', summary: '纳米多孔碳领域文献调研' },
    { week: '2026.04.03', summary: '多孔润湿加密实验，微流控领域调研' },
    { week: '2026.03.27', summary: '纳米多孔碳制备优化冰刻应用拓展实验' },
    { week: '2026.03.20', summary: '纳米多孔碳实验推进冰刻应用探索' },
    { week: '2026.03.13', summary: '多孔碳结构表征' },
    { week: '2026.03.06', summary: '制备工艺优化' },
    { week: '2026.02.12', summary: 'Sci.Bull实验完成整理润湿CCD更换冰刻间关机' },
    { week: '2026.02.06', summary: 'Sci.Bull补充实验完成，润湿CCD更换' },
    { week: '2026.01.30', summary: 'Sci.Bull实验完成，润湿CCD更换，冰刻间关机' },
    { week: '2026.01.23', summary: 'Sci.Bull文章实验完成整理中，润湿实验CCD更换，冰刻间关机' },
    { week: '2026.01.16', summary: 'Sci.Bull文章补充实验完成，微接触角测试平台CCD更换，冰刻间年前关机' },
    { week: '2026.01.09', summary: 'Sci.Bull文章Fig2e补充实验，润湿恢复时间缩短至1h连续5组成功，冰刻间整改' },
  ],
  '马墨南': [
    { week: '2026.05.09', summary: 'OTE光热驱动实验优化，金片操控精度提升' },
    { week: '2026.04.30', summary: 'WOP系统光束整形实验，金片旋转驱动测试' },
    { week: '2026.04.24', summary: '旋转角度计算程序调试' },
    { week: '2026.04.17', summary: 'SLM光束整形优化' },
    { week: '2026.04.10', summary: 'OTE光热驱动领域文献调研' },
    { week: '2026.04.03', summary: '光热弹性波驱动扫描完成，驱动阈值15nJ' },
    { week: '2026.03.27', summary: 'OTE光热驱动实验优化金片操控精度提升' },
    { week: '2026.03.20', summary: 'WOP系统光束整形实验金片旋转驱动测试' },
    { week: '2026.03.13', summary: '旋转角度计算程序调试' },
    { week: '2026.03.06', summary: 'SLM光束整形优化' },
    { week: '2026.02.12', summary: 'PL理论辅助间隙面SEMSiC衬底金片驱动成功文章修改' },
    { week: '2026.02.06', summary: 'PL理论辅助，间隙面SEM，SiC衬底金片驱动成功' },
    { week: '2026.01.30', summary: 'PL理论解释，SEM形貌分析，SiC衬底金片驱动，文章修改' },
    { week: '2026.01.23', summary: '辅助PL理论解释，间隙面倾斜SEM，SiC衬底金片驱动，文章第三轮修改' },
    { week: '2026.01.16', summary: '辅助严老师PL理论解释，FIB加工面形貌分析，多种衬底金片驱动成功（SiC最优）' },
    { week: '2026.01.09', summary: 'OTE衬底更换调研（SiO2→SiC），SiC衬底金片驱动成功，文章第三轮修改新增Fig4E/4F' },
  ],
  '李晓萱': [
    { week: '2026.05.09', summary: '金刚石超透镜设计优化，冷台系统设计改进' },
    { week: '2026.04.30', summary: '金刚石超透镜实验推进，冷台设计' },
    { week: '2026.04.24', summary: '超透镜仿真优化' },
    { week: '2026.04.17', summary: '冷台系统组件测试' },
    { week: '2026.04.10', summary: '金刚石超透镜领域文献调研' },
    { week: '2026.04.03', summary: '金刚石超透镜热稳定性提升，长时间辐照测试' },
    { week: '2026.03.27', summary: '金刚石超透镜设计优化冷台系统设计改进' },
    { week: '2026.03.20', summary: '金刚石超透镜实验推进冷台设计' },
    { week: '2026.03.13', summary: '超透镜仿真优化' },
    { week: '2026.03.06', summary: '冷台系统组件测试' },
    { week: '2026.02.12', summary: '金刚石超透镜ebl完成void器件刻蚀寄出专利预审键合剥离' },
    { week: '2026.02.06', summary: '金刚石超透镜ebl完成，void器件刻蚀寄出，专利预审，键合剥离' },
    { week: '2026.01.30', summary: '金刚石超透镜ebl完成，void器件寄出，专利预审，键合剥离' },
    { week: '2026.01.23', summary: '金刚石超透镜ebl完成，void器件刻蚀寄出，专利提交预审，键合剥离工艺' },
    { week: '2026.01.16', summary: '金刚石超透镜ebl加工完成，void器件刻蚀完成寄出，专利交底书修改提交预审，键合剥离工艺' },
    { week: '2026.01.09', summary: '金刚石超透镜相位离散化验证不影响光场分布，ebl加工，void器件第二轮刻蚀，碳掩模工艺TiO2选择比测试' },
  ],
  '章子鉴': [
    { week: '2026.05.09', summary: 'SiC消色差超透镜设计迭代，高功率方案验证' },
    { week: '2026.04.30', summary: 'SiC消色差超透镜设计推进，调参优化' },
    { week: '2026.04.24', summary: '设计代码调试' },
    { week: '2026.04.17', summary: '小口径器件可行性验证' },
    { week: '2026.04.10', summary: '消色差超透镜领域文献调研' },
    { week: '2026.04.03', summary: '开题答辩完成，消色差透镜设计参数优化' },
    { week: '2026.03.27', summary: 'SiC消色差超透镜设计迭代高功率方案验证' },
    { week: '2026.03.20', summary: 'SiC消色差超透镜设计推进调参优化' },
    { week: '2026.03.13', summary: '设计代码调试' },
    { week: '2026.03.06', summary: '小口径器件可行性验证' },
    { week: '2026.02.12', summary: '刻蚀完成未测试ICP故障开题PPT' },
    { week: '2026.02.06', summary: '刻蚀完成未测试（ICP故障），开题PPT' },
    { week: '2026.01.30', summary: '刻蚀完成未测试，开题PPT' },
    { week: '2026.01.23', summary: '曝光样品刻蚀完成（未测试），开题报告PPT' },
    { week: '2026.01.16', summary: '上周曝光样品刻蚀完成（平台关停未测试），开题报告PPT撰写' },
    { week: '2026.01.09', summary: '3mm口径消色差透镜灰度曝光，台阶仪测试结构高度20μm与设计一致，鲁汶ICP故障样品真空保存' },
  ],
  '陈飞霖': [
    { week: '2026.05.09', summary: 'SThM扫描热显微镜系统优化，TEM数据补充' },
    { week: '2026.04.30', summary: '扫描热显微镜实验推进，NanoLetter投稿准备' },
    { week: '2026.04.24', summary: 'TEM数据采集与补充' },
    { week: '2026.04.17', summary: '文章修改与完善' },
    { week: '2026.04.10', summary: '扫描热显微镜领域文献调研' },
    { week: '2026.04.03', summary: '扫描热台低温21K测试通过，控温设计规划' },
    { week: '2026.03.27', summary: 'SThM扫描热显微镜系统优化TEM数据补充' },
    { week: '2026.03.20', summary: '扫描热显微镜实验推进NanoLetter投稿准备' },
    { week: '2026.03.13', summary: 'TEM数据采集与补充' },
    { week: '2026.03.06', summary: '文章修改与完善' },
    { week: '2026.02.12', summary: '加热电阻选型SPCM改进迷宫热电异质结' },
    { week: '2026.02.06', summary: '加热电阻选型，SPCM改进，迷宫热电异质结' },
    { week: '2026.01.30', summary: '加热电阻选型，SPCM改进，迷宫热电异质结' },
    { week: '2026.01.23', summary: '加热电阻选型设计，SPCM模拟改进，迷宫热电异质结' },
    { week: '2026.01.16', summary: '扫描热样品台加热电阻选型设计，SPCM文章模拟改进，迷宫样品漏电解决但出现热电异质结' },
    { week: '2026.01.09', summary: '低温扫描热20.2K测试验证，震动约40nm，铜胶带失效bonding线断' },
  ],
  '虞阳': [
    { week: '2026.05.09', summary: 'SiC悬臂梁计算光谱仪仿真优化，结构参数调参' },
    { week: '2026.04.30', summary: 'SiC悬臂梁光谱仪设计推进' },
    { week: '2026.04.24', summary: '光谱仪仿真计算' },
    { week: '2026.04.17', summary: '悬臂梁结构优化' },
    { week: '2026.04.10', summary: '计算光谱仪领域文献调研' },
    { week: '2026.04.03', summary: '3x3并行激光束效率70%，湿法去金属工艺改进' },
    { week: '2026.03.27', summary: 'SiC悬臂梁计算光谱仪仿真优化结构参数调参' },
    { week: '2026.03.20', summary: 'SiC悬臂梁光谱仪设计推进' },
    { week: '2026.03.13', summary: '光谱仪仿真计算' },
    { week: '2026.03.06', summary: '悬臂梁结构优化' },
    { week: '2026.02.12', summary: '分束仿真倾斜光栅优化' },
    { week: '2026.02.06', summary: '分束仿真，倾斜光栅优化' },
    { week: '2026.01.30', summary: '分束仿真，倾斜光栅优化' },
    { week: '2026.01.23', summary: '并行激光束分束仿真，倾斜光栅功率优化' },
    { week: '2026.01.16', summary: '仿真验证并行激光束分束结构可行性，倾斜光栅优化功率分配' },
    { week: '2026.01.09', summary: '悬臂梁浸泡断裂问题解决，反射率测试达峰，与邵露青FIB腔结构工艺验证，角分辨测试年后安排' },
  ],
  '王旭杰': [
    { week: '2026.05.09', summary: '冰刻生物机器人功能测试，冷冻保存实验验证' },
    { week: '2026.04.30', summary: '生物机器人制备推进，功能表征' },
    { week: '2026.04.24', summary: '冰刻结构优化' },
    { week: '2026.04.17', summary: '生物样品测试方案设计' },
    { week: '2026.04.10', summary: '生物光子学文献调研' },
    { week: '2026.04.03', summary: '协助赵康冰刻实验，铜胶带镀金与剥离尝试' },
    { week: '2026.03.27', summary: '冰刻生物机器人功能测试冷冻保存实验验证' },
    { week: '2026.03.20', summary: '生物机器人制备推进功能表征' },
    { week: '2026.03.13', summary: '冰刻结构优化' },
    { week: '2026.03.06', summary: '生物样品测试方案设计' },
    { week: '2026.02.12', summary: '小电镜拉杆断硅藻剥离失败大电镜关机学习' },
    { week: '2026.02.06', summary: '衣藻仅对照组存活，小电镜振动，硅藻镀膜，大电镜校准' },
    { week: '2026.01.30', summary: '拉杆断，硅藻剥离失败，大电镜关机' },
    { week: '2026.01.23', summary: '小电镜拉杆断，硅藻剥离失败，大电镜关机学习' },
    { week: '2026.01.16', summary: '小电镜镀膜拉杆头断裂无备件，硅藻金属膜剥离尝试失败（粘附不够），大电镜关机学习' },
    { week: '2026.01.09', summary: '8个衣藻样品光镜观察仅对照组存活，小电镜振动问题排查，硅藻镀膜，大电镜写场校准' },
  ],
};

export default function AnalysisPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(searchParams.get('person') || '');
  const ALL_PERSONS = usePersons();

  const [syncVersion, setSyncVersion] = useState(0);

  // 打开页面时拉取云端最新数据，确保跨设备同步
  useEffect(() => {
    cloudStorage.loadAllData()
      .then(() => setSyncVersion(v => v + 1)) // 同步完成后强制刷新
      .catch(() => {});
  }, []);

  // 双人协作分析状态（成员A跟随当前选中的成员）
  const [memberB, setMemberB] = useState('');
  const [collabAnalyzing, setCollabAnalyzing] = useState(false);
  const [collabResult, setCollabResult] = useState('');
  const [collabError, setCollabError] = useState('');

  // 加载时恢复已保存的协作分析（优先从 Person 云端数据中读取）
  useEffect(() => {
    if (selectedId && memberB) {
      const personA = ALL_PERSONS.find((p) => p.id === selectedId);
      if (personA?.collabSuggestions?.[memberB]) {
        setCollabResult(personA.collabSuggestions[memberB].result);
      } else {
        // 降级：尝试旧版 localStorage
        const sortedIds = [selectedId, memberB].sort();
        const saveKey = `qiulab_collab_${sortedIds[0]}_${sortedIds[1]}`;
        try {
          const saved = JSON.parse(localStorage.getItem(saveKey) || '{}');
          setCollabResult(saved.result || '');
        } catch {
          setCollabResult('');
        }
      }
    } else {
      setCollabResult('');
    }
  }, [selectedId, memberB, ALL_PERSONS]);

  // 支持从 Dashboard 跳转的 filter=risk 参数
  const filterMode = searchParams.get('filter') || '';
  const riskIdsParam = searchParams.get('riskIds') || '';
  const riskIdSet = useMemo(() => {
    if (filterMode === 'risk' && riskIdsParam) {
      return new Set(riskIdsParam.split(','));
    }
    return null;
  }, [filterMode, riskIdsParam]);

  // 如果 filter=risk 且未选中任何人，自动选中第一个风险成员
  useMemo(() => {
    if (filterMode === 'risk' && riskIdSet && !selectedId) {
      const firstRiskPerson = ALL_PERSONS.find((p) => riskIdSet.has(p.id));
      if (firstRiskPerson) {
        setSelectedId(firstRiskPerson.id);
        setSearchParams({ filter: 'risk', riskIds: riskIdsParam, person: firstRiskPerson.id });
      }
    }
  }, [filterMode, riskIdSet, selectedId, ALL_PERSONS, riskIdsParam, setSearchParams]);

  // 双人AI协作分析
  const handleCollabAnalysis = async () => {
    if (!selectedId || !memberB || selectedId === memberB) return;
    setCollabAnalyzing(true);
    setCollabResult('');
    setCollabError('');
    const personA = ALL_PERSONS.find((p) => p.id === selectedId);
    const personB = ALL_PERSONS.find((p) => p.id === memberB);
    if (!personA || !personB) { setCollabError('成员选择无效'); setCollabAnalyzing(false); return; }
    try {
      const trends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}');
      const labels = JSON.parse(localStorage.getItem('qlab_dynamic_labels') || '[]') as string[];
      const latestLabel = labels.length > 0 ? labels[labels.length - 1] : '';
      const weekDataA = latestLabel && trends[latestLabel] ? trends[latestLabel][selectedId] || trends[latestLabel][personA.name] : null;
      const weekDataB = latestLabel && trends[latestLabel] ? trends[latestLabel][memberB] || trends[latestLabel][personB.name] : null;
      const prompt = `你是一位资深的科研合作顾问，精通光子学、微纳加工、材料科学等交叉领域。请基于以下两位仇旻实验室（PAINT Lab）成员的研究背景和最新周报进展，提出**具体、可行的合作研究课题**（不是研究方向，而是具体的研究内容/课题）。

## 成员A：${personA.name}
- 角色：${personA.roleLabel}${personA.subRole ? `(${personA.subRole})` : ''}
- 研究方向：${personA.researchDirection}
- 入组时间：${personA.joinDate || '未知'}
${weekDataA ? `- 最新周报摘要：${weekDataA.summary || '无摘要'}` : ''}

## 成员B：${personB.name}
- 角色：${personB.roleLabel}${personB.subRole ? `(${personB.subRole})` : ''}
- 研究方向：${personB.researchDirection}
- 入组时间：${personB.joinDate || '未知'}
${weekDataB ? `- 最新周报摘要：${weekDataB.summary || '无摘要'}` : ''}

## 实验室整体研究方向
PAINT Lab（Photonics And Instrumentation for NanoTechnology）仇旻实验室主要研究：SiC超表面/超透镜与AR光波导、冰刻纳米加工技术、拓扑光子学、光计算与智能推断、微纳光电子器件、激光微纳加工、钙钛矿光电子器件、等离激元学、辐射制冷/热管理。

## 输出要求
请直接返回纯文本（不要JSON，不要markdown代码块），为两位成员提出3个具体合作课题，每个课题包含：课题名称、研究内容（具体技术路线）、各自分工、预期成果、可行性分析。课题必须具体可行，结合两人实际背景。`;
      const response = await callKimiApi(prompt, { maxTokens: 4000, temperature: 0.7 });
      setCollabResult(response);
      const now = new Date().toISOString();

      // ===== 云端同步：保存到两个人的 collabSuggestions =====
      try {
        const allData = cloudStorage.loadFromLocal();
        const persons = [...allData.persons];
        const idxA = persons.findIndex((p) => p.id === selectedId);
        const idxB = persons.findIndex((p) => p.id === memberB);
        if (idxA >= 0) {
          const sugA = persons[idxA].collabSuggestions || {};
          persons[idxA] = {
            ...persons[idxA],
            collabSuggestions: {
              ...sugA,
              [memberB]: { partnerName: personB.name, result: response, timestamp: now },
            },
          };
        }
        if (idxB >= 0) {
          const sugB = persons[idxB].collabSuggestions || {};
          persons[idxB] = {
            ...persons[idxB],
            collabSuggestions: {
              ...sugB,
              [selectedId]: { partnerName: personA.name, result: response, timestamp: now },
            },
          };
        }
        const updatedData = { ...allData, persons, lastModified: now };
        await cloudStorage.saveAllData(updatedData);
        notifyPersonsUpdated();
      } catch (e) {
        console.warn('[Collab] 云端保存失败，已保留本地结果:', e);
      }
    } catch (err: any) {
      setCollabError(err.message || 'AI分析失败');
    } finally {
      setCollabAnalyzing(false);
    }
  };

  // 直接从 localStorage 读取最新评估（静态+动态合并），不使用 useMemo 缓存
  // syncVersion 变化时重新读取（云端同步后刷新）
  const assessment = (() => {
    if (!selectedId) return null;
    void syncVersion; // 触发重新渲染时重新读取
    const p = ALL_PERSONS.find((x) => x.id === selectedId);
    return getLatestAssessmentMerged(selectedId, p?.name);
  })();

  const person = useMemo(() => {
    return ALL_PERSONS.find((p) => p.id === selectedId);
  }, [selectedId, ALL_PERSONS]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSearchParams({ person: id });
    // 切换成员A时清空成员B和分析结果，避免残留上一对的分析
    setMemberB('');
    setCollabResult('');
    setCollabError('');
  };

  // 从在职成员的最新评估分数中计算分布（100分制），同时收集成员名字
  const scoreDistribution = useMemo(() => {
    // 建立 personId -> personName 映射（仅在职成员，排除已毕业/已离职）
    const activePersons = ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left');
    const nameMap = new Map(activePersons.map((p) => [p.id, p.name]));

    // 为每个在职成员找到最新的一条评估
    const latestByPerson = new Map<string, typeof MOCK_ASSESSMENTS[0]>();
    for (const a of MOCK_ASSESSMENTS) {
      const existing = latestByPerson.get(a.personId);
      if (!existing || a.weekNumber > existing.weekNumber) {
        latestByPerson.set(a.personId, a);
      }
    }
    const excellentNames: string[] = [];
    const goodNames: string[] = [];
    const needsImprovementNames: string[] = [];
    for (const [, a] of latestByPerson) {
      const name = nameMap.get(a.personId) || a.personName || a.personId;
      if (a.overallScore >= 80) excellentNames.push(name);
      else if (a.overallScore >= 60) goodNames.push(name);
      else needsImprovementNames.push(name);
    }
    return [
      { name: '优秀(80-100)', value: excellentNames.length, members: excellentNames },
      { name: '良好(60-80)', value: goodNames.length, members: goodNames },
      { name: '需改进(<60)', value: needsImprovementNames.length, members: needsImprovementNames },
    ];
  }, [ALL_PERSONS]);

  // 获取选中人员的历史数据（静态基线 + 动态上传数据合并）
  // 直接从 localStorage 读取最新历史（静态+动态合并），不使用 useMemo 缓存
  // syncVersion 变化时重新读取（云端同步后刷新）
  const personHistory = (() => {
    if (!person) return null;
    void syncVersion; // 触发重新渲染时重新读取
    const staticData = PERSON_HISTORY[person.name] || [];
    return getMergedPersonHistory(person.name, staticData, person.id);
  })();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">人员分析</h1>
          <p className="text-sm text-slate-500 mt-0.5">选择团队成员查看AI综合研判报告</p>
        </div>
        {assessment && (
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            打印此报告
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
                <UserSearch className="w-4 h-4 text-cyan-600" />
                选择人员
              </label>
              {/* 风险筛选模式提示 */}
              {filterMode === 'risk' && (
                <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  仅显示需关注成员 ({riskIdSet?.size || 0}人)
                  <button
                    className="ml-auto text-red-500 hover:text-red-700 underline"
                    onClick={() => { setSearchParams({}); }}
                  >
                    清除筛选
                  </button>
                </div>
              )}
              <Select value={selectedId} onValueChange={handleSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={filterMode === 'risk' ? '选择需关注成员' : '选择一位团队成员'} />
                </SelectTrigger>
                <SelectContent>
                  {filterMode !== 'risk' && <SelectItem value="__all">全部人员</SelectItem>}
                  {/* 在职人员按角色分组 */}
                  {ROLE_ORDER.map((role) => {
                    let persons = ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left' && p.role === role);
                    // 风险筛选模式下只显示有风险成员
                    if (filterMode === 'risk' && riskIdSet) {
                      persons = persons.filter((p) => riskIdSet.has(p.id));
                    }
                    if (persons.length === 0) return null;
                    if (role === 'phd') {
                      // 博士生按入学年级分组
                      const yearGroups = persons.reduce<Record<number, typeof persons>>((acc, p) => {
                        const year = p.enrollmentYear ?? 0;
                        if (!acc[year]) acc[year] = [];
                        acc[year].push(p);
                        return acc;
                      }, {});
                      return (
                        <div key={role}>
                          <SelectItem value={`__${role}`} disabled>{ROLE_LABEL_MAP[role]}</SelectItem>
                          {Object.entries(yearGroups)
                            .sort(([a], [b]) => Number(b) - Number(a))
                            .map(([year, phds]) => (
                              <div key={year}>
                                <SelectItem value={`__phd_${year}`} disabled className="pl-4 text-xs text-muted-foreground">{year}级</SelectItem>
                                {phds.map((p) => (
                                  <SelectItem key={p.id} value={p.id} className="pl-8">{p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}</SelectItem>
                                ))}
                              </div>
                            ))}
                        </div>
                      );
                    }
                    return (
                      <div key={role}>
                        <SelectItem value={`__${role}`} disabled>{ROLE_LABEL_MAP[role]}</SelectItem>
                        {persons.map((p) => (
                          <SelectItem key={p.id} value={p.id} className="pl-8">{p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}</SelectItem>
                        ))}
                      </div>
                    );
                  })}
                  {/* 已出站/已毕业 */}
                  {filterMode !== 'risk' && (() => {
                    const alumni = ALL_PERSONS.filter((p) => p.status === 'inactive' || p.role === 'alumni');
                    if (alumni.length === 0) return null;
                    return (
                      <div>
                        <SelectItem value="__alumni" disabled>{ROLE_LABEL_MAP.alumni}</SelectItem>
                        {alumni.map((p) => (
                          <SelectItem key={p.id} value={p.id} className="pl-8">{p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}</SelectItem>
                        ))}
                      </div>
                    );
                  })()}
                </SelectContent>
              </Select>

              {person && (
                <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="font-medium text-slate-800">{person.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{(person.role === 'phd' || person.role === 'undergraduate') && person.subRole ? `${person.roleLabel}(${person.subRole})` : (person.subRole || person.roleLabel)}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{person.researchDirection}</div>
                  {person.role === 'phd' && (person.graduationDate || (person.enrollmentYear && person.programDuration)) && (
                    (() => {
                      const gradDateStr = person.graduationDate;
                      const gradDate = gradDateStr
                        ? new Date(gradDateStr + 'T00:00:00')
                        : new Date(person.enrollmentYear! + person.programDuration!, 5, 1);
                      const now = new Date();
                      const monthsUntilGrad = (gradDate.getFullYear() - now.getFullYear()) * 12 + (gradDate.getMonth() - now.getMonth());

                      if (monthsUntilGrad < 0) {
                        // 已延毕
                        const monthsOverdue = Math.abs(monthsUntilGrad);
                        return (
                          <div className="text-xs mt-0.5">
                            <span className="text-red-600 font-bold">⚠️ 已延毕 {monthsOverdue >= 12 ? `${Math.floor(monthsOverdue / 12)}年${monthsOverdue % 12}个月` : `${monthsOverdue}个月`}</span>
                            <span className="text-slate-400 ml-1">(应{gradDate.getFullYear()}年{gradDate.getMonth() + 1}月毕业，{person.programDuration}年制)</span>
                          </div>
                        );
                      } else if (monthsUntilGrad <= 3) {
                        // 即将毕业，3个月内
                        return (
                          <div className="text-xs mt-0.5">
                            <span className="text-orange-600 font-bold">⏰ 即将毕业截止</span>
                            <span className="text-slate-400 ml-1">({person.programDuration}年制，剩余{monthsUntilGrad}个月)</span>
                          </div>
                        );
                      } else {
                        // 正常进行中
                        return (
                          <div className="text-xs text-emerald-600 mt-0.5 font-medium">
                            预计毕业: {gradDate.getFullYear()}年{gradDate.getMonth() + 1}月
                            <span className="text-slate-400 font-normal ml-1">({person.programDuration}年制，还剩{monthsUntilGrad}个月)</span>
                          </div>
                        );
                      }
                    })()
                  )}
                  {person.role === 'postdoc' && person.exitDate && (
                    <div className="text-xs text-purple-600 mt-0.5 font-medium">
                      出站日期: {person.exitDate}
                    </div>
                  )}
                  {(person.role === 'researcher' || person.role === 'associate_researcher' || person.role === 'assistant_researcher') && person.contractEndDate && (
                    <div className="text-xs text-blue-600 mt-0.5">
                      合同到期: {person.contractEndDate}
                    </div>
                  )}
                  <div className="text-xs text-slate-400 mt-1">加入时间: {person.joinDate}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-slate-700 mb-3">团队评分分布</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={scoreDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    nameKey="name"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {scoreDistribution.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const data = payload[0].payload as { name: string; value: number; members: string[] };
                      return (
                        <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3 max-w-[220px]">
                          <div className="text-sm font-medium text-slate-800 mb-1.5">
                            {data.name}: {data.value}人
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {data.members.map((name) => (
                              <span key={name} className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {name}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-3 text-xs text-slate-500">
                {scoreDistribution.map((d, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    {d.name}: {d.value}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 当前成员评分摘要 */}
          {assessment && person && (
            <Card className="border-slate-200">
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-slate-700 mb-3">
                  {person.name} 的综合评分
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="text-xs text-slate-500">综合评分</div>
                    <div className={`text-2xl font-bold ${
                      assessment.overallScore >= 80 ? 'text-emerald-600' :
                      assessment.overallScore >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>{assessment.overallScore}</div>
                    <div className="text-[10px] text-slate-400">满分100分</div>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="flex flex-col gap-1">
                    <Badge className={`${
                      assessment.overallScore >= 80 ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                      assessment.overallScore >= 60 ? 'bg-amber-100 text-amber-700 border-amber-200' :
                      'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      {assessment.overallScore >= 80 ? '优秀' : assessment.overallScore >= 60 ? '良好' : '需改进'}
                    </Badge>
                    <span className="text-xs text-slate-500">{assessment.riskLevel === 'low' ? '低风险' : assessment.riskLevel === 'medium' ? '中风险' : '高风险'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-3">
          {!selectedId || selectedId.startsWith('__') ? (
            <Card className="border-slate-200">
              <CardContent className="py-16 text-center">
                <UserSearch className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">请从左侧选择一位团队成员查看详细研判报告</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* 深度分析按钮（始终显示，无需研判基线） */}
              {person && <DeepAnalysisPanel person={person} />}

              {/* 双人协作分析 */}
              {person && (
                <Card className="border-violet-200">
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-sm font-semibold flex items-center gap-2 text-violet-800">
                      <Users className="w-4 h-4" />
                      双人协作AI深度分析
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 space-y-3">
                    <div className="flex gap-2">
                      {/* 成员A：固定为当前分析的成员 */}
                      <div className="flex-1 px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-700 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium">{person?.name || '未选择'}</span>
                        <span className="text-slate-400">- {person?.researchDirection?.slice(0, 15) || ''}...</span>
                      </div>
                      <span className="text-xs text-slate-400 self-center">↔</span>
                      <Select value={memberB} onValueChange={setMemberB}>
                        <SelectTrigger className="flex-1 text-xs"><SelectValue placeholder="选择协作成员" /></SelectTrigger>
                        <SelectContent>
                          {ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left' && p.status !== 'inactive' && p.id !== selectedId).map((p) => (
                            <SelectItem key={p.id} value={p.id} className="text-xs">{p.name} - {p.researchDirection}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleCollabAnalysis}
                        disabled={collabAnalyzing || !selectedId || !memberB || selectedId === memberB}
                        className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white text-xs h-9"
                      >
                        {collabAnalyzing ? <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
                        {collabAnalyzing ? '分析中...' : 'AI分析'}
                      </Button>
                    </div>
                    {collabError && <p className="text-xs text-red-600">{collabError}</p>}
                    {collabResult && (
                      <div className="bg-violet-50 rounded-lg p-3 space-y-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-semibold text-violet-800">AI 协作分析报告</span>
                          <span className="text-[10px] text-slate-400 ml-auto">{person?.name} ↔ {ALL_PERSONS.find((p) => p.id === memberB)?.name}</span>
                        </div>
                        <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{collabResult}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* 最近一周做了什么 */}
              {personHistory && personHistory.length > 0 && (
                <Card className="border-slate-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <CalendarDays className="w-4 h-4 text-cyan-600" />
                      <h3 className="text-sm font-semibold text-slate-800">最近一周做了什么</h3>
                      <span className="text-xs text-slate-400 ml-auto">{personHistory[0].week}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed bg-cyan-50 rounded-lg p-3 border border-cyan-100">
                      {personHistory[0].summary}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* 历史摘要对比 */}
              {personHistory && personHistory.length > 1 && (
                <HistoryComparisonCard history={personHistory} personName={person?.name || ''} />
              )}

              {/* AI综合研判报告（仅当有评估基线数据时显示） */}
              {assessment && <AssessmentPanel assessment={assessment} />}

              {/* 无研判基线数据时的提示 */}
              {!assessment && (
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardContent className="py-12 text-center">
                    <p className="text-sm text-amber-700">
                      该成员暂无 AI 研判基线数据，可使用上方「深度分析」按钮生成个性化建议
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 历史摘要对比组件
function HistoryComparisonCard({ history, personName }: { history: { week: string; summary: string }[]; personName: string }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="border-slate-200">
      <CardContent className="pt-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-600" />
            <h3 className="text-sm font-semibold text-slate-800">历史摘要对比</h3>
            <span className="text-xs text-slate-400">{personName} 过去{history.length}期关键进展</span>
          </div>
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </button>

        {expanded && (
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className={`flex gap-3 text-sm rounded-lg p-3 ${
                  index === 0
                    ? 'bg-emerald-50 border border-emerald-100'
                    : index === 1
                    ? 'bg-slate-50 border border-slate-100'
                    : 'bg-slate-50/50 border border-slate-100'
                }`}
              >
                <div className="flex-shrink-0">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      index === 0
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.week}
                    {index === 0 && ' (最新)'}
                    {index === 1 && ' (上期)'}
                  </span>
                </div>
                <p
                  className={`leading-relaxed ${
                    index === 0 ? 'text-emerald-800' : 'text-slate-600'
                  }`}
                >
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
