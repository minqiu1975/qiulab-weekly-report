import { useState, useEffect } from 'react';
import type { Person } from '../types';
import { callKimiApi } from '../lib/kimiApi';
import { saveDeepAnalysis, getDeepAnalysis } from '../lib/dynamicStorage';
import type { DeepAnalysisData } from '../services/cloudStorage';
import { cloudStorage } from '../services/cloudStorage';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  BrainCircuit, Sparkles, Loader2, AlertTriangle, CheckCircle2,
  Lightbulb, TrendingUp, BookOpen, FlaskConical, CircleDollarSign,
  ArrowRight, X, RotateCcw
} from 'lucide-react';

interface Props {
  person: Person;
}

export interface DeepAnalysisResult {
  researchProgress: string;
  researchHotspots: string[];
  suggestedDirections: {
    title: string;
    description: string;
    feasibility: string;
    timeline: string;
  }[];
  riskAssessment: string;
  overallAdvice: string;
}

/** 真实调用 Kimi k2.6 API 进行深度分析 */
async function callKimiDeepAnalysis(person: Person): Promise<DeepAnalysisResult> {
  const prompt = buildAnalysisPrompt(person);

  const content = await callKimiApi(prompt, {
    systemPrompt: '你是一个专业的科研顾问助手，擅长分析科研人员的进展并给出具体的下一步研究建议。请以严格的 JSON 格式输出，不要包含任何其他文字。',
    maxTokens: 4000,
  });

  let parsed: DeepAnalysisResult;
  try {
    const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error('Kimi API 返回的内容无法解析为 JSON，请稍后重试。');
  }

  if (!parsed.researchProgress || !parsed.suggestedDirections || parsed.suggestedDirections.length === 0) {
    throw new Error('Kimi API 返回的数据结构不完整，请稍后重试。');
  }

  return parsed;
}

function buildAnalysisPrompt(person: Person): string {
  // 根据角色构建规划信息
  let planningInfo = '';
  let planningContext = '';

  if (person.role === 'phd' && (person.graduationDate || (person.enrollmentYear && person.programDuration))) {
    const gradDateStr = person.graduationDate;
    const fallbackYear = person.enrollmentYear && person.programDuration ? person.enrollmentYear + person.programDuration : null;
    const gradDate = gradDateStr
      ? new Date(gradDateStr + 'T00:00:00')
      : (fallbackYear ? new Date(fallbackYear, 5, 1) : new Date());
    const gradYear = gradDate.getFullYear();
    const gradMonth = gradDate.getMonth() + 1;
    const gradDay = gradDate.getDate();
    const now = new Date();
    const monthsUntilGrad = (gradDate.getFullYear() - now.getFullYear()) * 12 + (gradDate.getMonth() - now.getMonth());

    if (monthsUntilGrad < 0) {
      // 已延毕
      const monthsOverdue = Math.abs(monthsUntilGrad);
      const overdueStr = monthsOverdue >= 12
        ? `${Math.floor(monthsOverdue / 12)}年${monthsOverdue % 12}个月`
        : `${monthsOverdue}个月`;
      planningInfo = `\n学制：${person.programDuration || '?'}年制\n应毕业时间：${gradYear}年${gradMonth}月${gradDay}日${person.graduationDate ? '（手动设定）' : ''}\n当前状态：⚠️ 已延毕 ${overdueStr}（当前时间 ${now.getFullYear()}年${now.getMonth() + 1}月）`;
      planningContext = '\n【紧急】该人员为博士生，已严重超期未毕业！延毕期间容易产生心理压力、研究动力下降、经费紧张等问题。分析时必须直面延毕现状，给出明确的加速毕业路线图（如精简研究范围、聚焦可快速产出的方向、加快论文写作等）。建议应务实可行，以尽快毕业为最高优先级，而不是追求更高水平的研究目标。';
    } else if (monthsUntilGrad <= 6) {
      // 即将毕业，6个月内
      planningInfo = `\n学制：${person.programDuration || '?'}年制\n预计毕业时间：${gradYear}年${gradMonth}月${gradDay}日${person.graduationDate ? '（手动设定）' : ''}\n当前状态：⏰ 毕业倒计时 ${monthsUntilGrad} 个月`;
      planningContext = '\n【重要】该人员为博士生，即将面临毕业 deadline，时间非常紧迫。建议的研究方向应聚焦于可在数月内完成的工作，确保能顺利毕业。请给出具体的毕业冲刺策略。';
    } else {
      planningInfo = `\n学制：${person.programDuration || '?'}年制\n预计毕业时间：${gradYear}年${gradMonth}月${gradDay}日${person.graduationDate ? '（手动设定）' : ''}\n当前状态：正常（距毕业约 ${monthsUntilGrad} 个月）`;
      planningContext = '\n【重要】该人员为博士生，请重点考虑其毕业规划。建议的研究方向应考虑在其预计毕业时间之前可以完成，确保不延误毕业。如果时间紧迫，请给出加速策略建议。';
    }
  } else if (person.role === 'postdoc' && person.exitDate) {
    planningInfo = `\n出站日期：${person.exitDate}`;
    planningContext = '\n【重要】该人员为博士后，请重点考虑其出站规划。建议的研究方向应帮助其在出站日期前取得足够成果（如高水平论文、项目结题等），确保顺利出站。如果剩余时间不多，请给出聚焦核心目标的建议。';
  } else if (person.role === 'researcher' || person.role === 'associate_researcher' || person.role === 'assistant_researcher') {
    if (person.contractEndDate) {
      planningInfo = `\n合同到期日期：${person.contractEndDate}`;
    }
    // 研究人员不需要特殊的规划考量
  }

  return `请对以下科研人员进行深度分析，并以 JSON 格式输出：

姓名：${person.name}
身份：${person.roleLabel}${person.subRole ? `(${person.subRole})` : ''}${planningInfo}
研究方向：${person.researchDirection}${planningContext}

请输出以下结构的 JSON：
{
  "researchProgress": "对该人员科研进展的评估（200字左右）",
  "researchHotspots": ["相关领域热点1", "热点2", "热点3"],
  "suggestedDirections": [
    {
      "title": "建议标题",
      "description": "具体描述（应结合上述规划考量，给出时间合理、切实可行的研究方向）",
      "feasibility": "高/中/低",
      "timeline": "预计周期"
    }
  ],
  "riskAssessment": "风险提醒（如有毕业/出站/合同时间压力，请特别说明）",
  "overallAdvice": "总体建议"
}`;
}

/** 预估 Kimi API 调用费用 */
function estimateCost(): { tokens: number; cost: string } {
  const inputTokens = 200;
  const outputTokens = 510;
  const totalTokens = inputTokens + outputTokens;
  const inputCost = (inputTokens / 1_000_000) * 0.95 * 7.2;
  const outputCost = (outputTokens / 1_000_000) * 4.00 * 7.2;
  const totalCost = inputCost + outputCost;
  return { tokens: totalTokens, cost: totalCost.toFixed(3) };
}

type Phase = 'idle' | 'confirming' | 'analyzing' | 'done' | 'error';

export default function DeepAnalysisPanel({ person }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [result, setResult] = useState<DeepAnalysisResult | null>(null);
  const [savedInfo, setSavedInfo] = useState<{ date: string; model: string } | null>(null);
  const [error, setError] = useState('');

  // 组件挂载时：加载已保存的深度分析结果
  useEffect(() => {
    const saved = getDeepAnalysis(person.id);
    if (saved) {
      setResult({
        researchProgress: saved.researchProgress,
        researchHotspots: saved.researchHotspots,
        suggestedDirections: saved.suggestedDirections,
        riskAssessment: saved.riskAssessment,
        overallAdvice: saved.overallAdvice,
      });
      setSavedInfo({ date: saved.analysisDate, model: saved.model });
      setPhase('done');
    } else {
      setPhase('idle');
      setResult(null);
      setSavedInfo(null);
    }
  }, [person.id]);

  const persistAnalysis = (analysis: DeepAnalysisResult) => {
    const data: DeepAnalysisData = {
      personId: person.id,
      personName: person.name,
      analysisDate: new Date().toISOString(),
      model: 'kimi-k2.6',
      researchProgress: analysis.researchProgress,
      researchHotspots: analysis.researchHotspots,
      suggestedDirections: analysis.suggestedDirections,
      riskAssessment: analysis.riskAssessment,
      overallAdvice: analysis.overallAdvice,
    };
    saveDeepAnalysis(data);
    setSavedInfo({ date: data.analysisDate, model: data.model });

    if (cloudStorage.isCloudEnabled()) {
      cloudStorage.saveAllData(cloudStorage.loadFromLocal()).catch(() => {});
    }
  };

  // 首次分析：显示确认面板
  const handleStart = () => {
    setPhase('confirming');
  };

  // 重新分析：旧结果继续显示，显示确认面板
  const handleRestart = () => {
    setPhase('confirming');
    setError('');
  };

  // 取消：回到查看状态
  const handleCancel = () => {
    setPhase(result ? 'done' : 'idle');
    setError('');
  };

  // 确认启动分析
  const handleConfirm = async () => {
    setPhase('analyzing');
    setError('');

    try {
      const analysis = await callKimiDeepAnalysis(person);
      setResult(analysis);
      persistAnalysis(analysis);
      setPhase('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : '分析过程中出现错误，请稍后重试');
      setPhase(result ? 'done' : 'error');
    }
  };

  const cost = estimateCost();

  // ─── 渲染 ───

  return (
    <div className="space-y-4">

      {/* ===== 确认面板（首次分析或重新分析都走这里） ===== */}
      {phase === 'confirming' && (
        <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-700">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {result ? '确认重新分析' : '确认启动深度分析'}
                </span>
                {result && (
                  <Badge className="bg-amber-100 text-amber-700 text-xs">
                    已有结果将被覆盖
                  </Badge>
                )}
              </div>
              <div className="text-xs text-slate-600 space-y-1.5 bg-white rounded-lg p-3 border border-slate-200">
                <div className="flex justify-between">
                  <span>分析对象</span>
                  <span className="font-medium">{person.name} ({person.subRole || person.roleLabel})</span>
                </div>
                <div className="flex justify-between">
                  <span>研究方向</span>
                  <span className="font-medium">{person.researchDirection}</span>
                </div>
                <div className="flex justify-between">
                  <span>API 版本</span>
                  <span className="font-medium text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Kimi k2.6
                  </span>
                </div>
                <div className="border-t border-slate-100 pt-1.5 mt-1.5">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><CircleDollarSign className="w-3 h-3" />预估 Token</span>
                    <span className="font-medium">~{cost.tokens.toLocaleString()} tokens</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1"><CircleDollarSign className="w-3 h-3" />预估费用</span>
                    <span className="font-medium text-amber-600">~{cost.cost} 元</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleConfirm}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  {result ? '确认重新分析' : '确认启动'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-2 rounded-md border border-slate-300 text-slate-600 text-sm hover:bg-slate-50 transition-colors"
                >
                  <X className="w-3.5 h-3.5 inline mr-1" />
                  取消
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===== 初始按钮（从未分析过） ===== */}
      {phase === 'idle' && (
        <Card className="border-cyan-200 bg-gradient-to-r from-cyan-50 to-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5 text-cyan-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Kimi AI 深度分析</h3>
                  <p className="text-xs text-slate-500">结合研究热点，给出下一步研究方向建议</p>
                </div>
              </div>
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                深度分析
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===== 分析中 ===== */}
      {phase === 'analyzing' && (
        <Card className="border-cyan-200 bg-cyan-50/50">
          <CardContent className="py-12 text-center">
            <Loader2 className="w-8 h-8 text-cyan-600 animate-spin mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-700">Kimi k2.6 正在深度分析中...</p>
            <p className="text-xs text-slate-500 mt-1">正在分析 {person.name} 的科研进展，结合最新研究热点生成建议</p>
            <div className="mt-4 max-w-xs mx-auto">
              <Progress value={45} className="h-1.5" />
              <p className="text-[10px] text-slate-400 mt-1">预计 10-20 秒</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ===== 错误 ===== */}
      {(phase === 'error' || (phase === 'done' && error)) && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">分析失败</span>
            </div>
            <p className="text-xs text-red-600">{error}</p>
            <button
              onClick={handleRestart}
              className="mt-3 text-xs text-cyan-600 hover:text-cyan-700 font-medium"
            >
              重新分析
            </button>
          </CardContent>
        </Card>
      )}

      {/* ===== 分析结果（done 或 analyzing 时都显示旧结果） ===== */}
      {result && phase !== 'idle' && (
        <div className="space-y-4">

          {/* 头部：标题 + 操作按钮 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm font-semibold text-slate-800">深度分析完成</h3>
              <Badge className="bg-cyan-100 text-cyan-700 text-xs">Kimi k2.6</Badge>
              {savedInfo && (
                <Badge className="bg-emerald-100 text-emerald-700 text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  已保存 {new Date(savedInfo.date).toLocaleDateString('zh-CN')}
                </Badge>
              )}
            </div>
            {/* 只有在非分析中、非确认中状态才显示"重新分析"按钮 */}
            {phase === 'done' && (
              <button
                onClick={handleRestart}
                className="text-xs text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                重新分析
              </button>
            )}
          </div>

          {/* 科研进展评估 */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
                <h4 className="text-sm font-semibold text-slate-800">科研进展评估</h4>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{result.researchProgress}</p>
            </CardContent>
          </Card>

          {/* 领域热点 */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-cyan-600" />
                <h4 className="text-sm font-semibold text-slate-800">相关领域最新研究热点</h4>
              </div>
              <ul className="space-y-2">
                {result.researchHotspots.map((hotspot, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-500 mt-0.5 flex-shrink-0" />
                    <span>{hotspot}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* 建议方向 */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-4 h-4 text-cyan-600" />
                <h4 className="text-sm font-semibold text-slate-800">下一步研究建议（2-3个具体可行方向）</h4>
              </div>
              <div className="space-y-4">
                {result.suggestedDirections.map((dir, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 bg-slate-50/50 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-700 text-xs flex items-center justify-center font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <h5 className="text-sm font-semibold text-slate-800">{dir.title}</h5>
                      <Badge className={`text-xs ml-auto ${
                        dir.feasibility === '高' ? 'bg-emerald-100 text-emerald-700' :
                        dir.feasibility === '中' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        可行性: {dir.feasibility}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed mb-2">{dir.description}</p>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <FlaskConical className="w-3 h-3" />
                      预计周期: <span className="font-medium">{dir.timeline}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 风险提示 */}
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="text-sm font-semibold text-amber-800">风险提醒</h4>
              </div>
              <p className="text-sm text-amber-700 leading-relaxed">{result.riskAssessment}</p>
            </CardContent>
          </Card>

          {/* 总体建议 */}
          <Card className="border-emerald-200 bg-emerald-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h4 className="text-sm font-semibold text-emerald-800">总体建议</h4>
              </div>
              <p className="text-sm text-emerald-700 leading-relaxed">{result.overallAdvice}</p>
            </CardContent>
          </Card>

          {/* 底部：重新分析按钮 */}
          {phase === 'done' && (
            <div className="flex justify-center pt-2">
              <button
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-cyan-300 text-cyan-700 text-sm font-medium hover:bg-cyan-50 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                重新分析
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
