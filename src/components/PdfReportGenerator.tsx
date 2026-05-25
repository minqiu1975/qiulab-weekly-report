import { useMemo } from 'react';
import { MOCK_ASSESSMENTS } from '../data/mockAssessments';
import { getMergedTrendByPersonId, getLatestWeekLabel } from '../data/mockTrends';
import { getSyncedPersons } from '../hooks/usePersons';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import {
  TrendingUp,
  AlertTriangle,
  Route,
  ListChecks,
  Star,
  Shield,
  Clock,
  Target,
  Zap,
  Users,
  BookOpen,
  BarChart3,
  Printer,
  ArrowLeft,
  History,
} from 'lucide-react';

const riskConfig = {
  low: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Shield, label: '低风险' },
  medium: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle, label: '中风险' },
  high: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertTriangle, label: '高风险' },
};

interface Props {
  latestWeekLabel?: string;
}

export default function PdfReportGenerator({ latestWeekLabel }: Props) {
  const currentWeekLabel = latestWeekLabel || getLatestWeekLabel();
  const generatedAt = new Date().toLocaleString('zh-CN');

  const persons = useMemo(() => getSyncedPersons(), []);

  const assessments = useMemo(() => {
    // 找到最大 weekNumber（最新一期）
    const maxWeek = Math.max(...MOCK_ASSESSMENTS.map((a) => a.weekNumber));
    return [...MOCK_ASSESSMENTS]
      .filter((a) => a.weekNumber === maxWeek)
      .sort((a, b) => b.overallScore - a.overallScore);
  }, []);

  const personMap = useMemo(() => {
    const map: Record<string, typeof persons[0]> = {};
    persons.forEach((p) => (map[p.id] = p));
    return map;
  }, [persons]);

  return (
    <div className="min-h-screen bg-white">
      {/* Print header */}
      <div className="print:hidden bg-slate-800 text-white px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            打印为PDF
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10 space-y-8">
        {/* Report title */}
        <div className="text-center border-b border-slate-200 pb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">仇旻教授团队周报分析报告</h1>
          <div className="text-sm text-slate-500 space-y-1">
            <p>周报周期：{currentWeekLabel}</p>
            <p>基于最新周报：{latestWeekLabel} 生成</p>
            <p>生成时间：{generatedAt}</p>
            <p>活跃成员总数：{persons.filter(p => p.status !== 'graduated' && p.status !== 'left').length} 人 | 本期评估人数：{assessments.length} 人</p>
          </div>
        </div>

        {/* Summary table */}
        <div className="print:break-inside-avoid">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-600" />
            团队概览
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-slate-200 rounded-lg">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2 font-medium text-slate-700 border-b">姓名</th>
                  <th className="text-left px-4 py-2 font-medium text-slate-700 border-b">角色</th>
                  <th className="text-left px-4 py-2 font-medium text-slate-700 border-b">研究方向</th>
                  <th className="text-center px-4 py-2 font-medium text-slate-700 border-b">综合评分</th>
                  <th className="text-center px-4 py-2 font-medium text-slate-700 border-b">风险等级</th>
                  <th className="text-left px-4 py-2 font-medium text-slate-700 border-b">本周关键进展</th>
                </tr>
              </thead>
              <tbody>
                {assessments.map((a) => {
                  const person = personMap[a.personId];
                  const rc = riskConfig[a.riskLevel];
                  const RiskIcon = rc.icon;
                  return (
                    <tr key={a.id} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-2 font-medium text-slate-800">{a.personName}</td>
                      <td className="px-4 py-2 text-slate-600">{person?.subRole || person?.roleLabel || '-'}</td>
                      <td className="px-4 py-2 text-slate-600">{person?.researchDirection || '-'}</td>
                      <td className="px-4 py-2 text-center font-bold text-cyan-700">{a.overallScore}</td>
                      <td className="px-4 py-2 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${rc.color}`}>
                          <RiskIcon className="w-3 h-3" />{rc.label}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-slate-600 max-w-xs truncate">{a.progressAssessment.milestoneAchievement}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Individual reports */}
        {assessments.map((a) => {
          const person = personMap[a.personId];
          const rc = riskConfig[a.riskLevel];
          const RiskIcon = rc.icon;

          // Get historical trend data for this person (merged static + dynamic)
          const personTrendObj = getMergedTrendByPersonId(a.personId, a.personName);
          const recentTrendData = personTrendObj.data?.slice(-3) || [];

          return (
            <div key={a.id} className="print:break-before-page space-y-4">
              {/* Person header */}
              <div className="border-b border-slate-200 pb-4 mb-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {a.personName}
                  <span className="text-sm font-normal text-slate-500">({person?.subRole || person?.roleLabel} | {person?.researchDirection})</span>
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-500">综合评分：</span>
                    <span className="text-lg font-bold text-cyan-700">{a.overallScore}</span>
                  </div>
                  <Badge className={`${rc.color} border`}>
                    <RiskIcon className="w-3 h-3 mr-1" />{rc.label}
                  </Badge>
                </div>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <div className="text-sm text-slate-500 mb-1">AI综合研判摘要</div>
                <div className="text-sm text-slate-700 leading-relaxed">{a.summary}</div>
              </div>

              {/* Historical trend section */}
              {recentTrendData.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <History className="w-4 h-4 text-cyan-600" />
                    历史趋势（最近{recentTrendData.length}期）
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-xs text-slate-500">
                          <th className="text-left py-1 px-2">日期</th>
                          <th className="text-center py-1 px-2">工作量</th>
                          <th className="text-center py-1 px-2">进展</th>
                          <th className="text-center py-1 px-2">问题数</th>
                          <th className="text-center py-1 px-2">综合</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentTrendData.map((point, idx) => (
                          <tr key={idx} className="border-t border-slate-100">
                            <td className="py-1.5 px-2 font-medium text-slate-700">{point.weekLabel}</td>
                            <td className="py-1.5 px-2 text-center">
                              <span className={`font-medium ${point.workloadScore >= 80 ? 'text-emerald-600' : point.workloadScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                                {point.workloadScore}
                              </span>
                            </td>
                            <td className="py-1.5 px-2 text-center">
                              <span className={`font-medium ${point.progressScore >= 80 ? 'text-emerald-600' : point.progressScore >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                                {point.progressScore}
                              </span>
                            </td>
                            <td className="py-1.5 px-2 text-center">
                              <span className={`font-medium ${point.problemCount === 0 ? 'text-emerald-600' : point.problemCount <= 2 ? 'text-amber-600' : 'text-red-600'}`}>
                                {point.problemCount}
                              </span>
                            </td>
                            <td className="py-1.5 px-2 text-center">
                              <span className={`font-medium ${point.overallScore >= 8 ? 'text-emerald-600' : point.overallScore >= 5 ? 'text-amber-600' : 'text-red-600'}`}>
                                {point.overallScore}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Progress */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-600" />
                  进展评估
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">工作量饱和度</div>
                    <div className="flex items-center gap-2">
                      <Progress value={a.progressAssessment.workloadScore} className="h-2 flex-1" />
                      <span className="text-sm font-semibold text-slate-700">{a.progressAssessment.workloadScore}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">工作质量</div>
                    <div className="flex items-center gap-2">
                      <Progress value={a.progressAssessment.qualityScore} className="h-2 flex-1" />
                      <span className="text-sm font-semibold text-slate-700">{a.progressAssessment.qualityScore}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Target className="w-3 h-3" />里程碑达成</div>
                  <div className="text-sm text-slate-700">{a.progressAssessment.milestoneAchievement}</div>
                </div>
                {a.progressAssessment.highlights.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-emerald-600 mb-1">亮点</div>
                    <ul className="space-y-1">
                      {a.progressAssessment.highlights.map((h, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                          <Star className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {a.progressAssessment.concerns.length > 0 && (
                  <div>
                    <div className="text-xs font-medium text-amber-600 mb-1">关注点</div>
                    <ul className="space-y-1">
                      {a.progressAssessment.concerns.map((c, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Problem */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-cyan-600" />
                  问题诊断
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">瓶颈类型</div>
                    <div className="text-sm font-medium text-slate-700">{a.problemDiagnosis.bottleneckType}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">严重程度</div>
                    <Badge variant={a.problemDiagnosis.severity === 'high' ? 'destructive' : a.problemDiagnosis.severity === 'medium' ? 'default' : 'secondary'}>
                      {a.problemDiagnosis.severity === 'high' ? '严重' : a.problemDiagnosis.severity === 'medium' ? '中等' : '轻微'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">根因分析</div>
                  <div className="text-sm text-slate-700">{a.problemDiagnosis.rootCause}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Zap className="w-3 h-3" />建议方案</div>
                  <div className="text-sm text-slate-700">{a.problemDiagnosis.suggestedSolution}</div>
                </div>
                {a.problemDiagnosis.estimatedResolveTime !== '-' && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>预计解决时间: {a.problemDiagnosis.estimatedResolveTime}</span>
                  </div>
                )}
              </div>

              {/* Path */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Route className="w-4 h-4 text-cyan-600" />
                  道路研判
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">方向合理性</div>
                    <div className="flex items-center gap-2">
                      <Progress value={a.pathAnalysis.directionRationality} className="h-2 flex-1" />
                      <span className="text-sm font-semibold text-slate-700">{a.pathAnalysis.directionRationality}</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">技术路线风险</div>
                    <Badge variant={a.pathAnalysis.techRouteRisk === 'high' ? 'destructive' : a.pathAnalysis.techRouteRisk === 'medium' ? 'default' : 'secondary'}>
                      {a.pathAnalysis.techRouteRisk === 'high' ? '高风险' : a.pathAnalysis.techRouteRisk === 'medium' ? '中等' : '低风险'}
                    </Badge>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">前沿对比</div>
                  <div className="text-sm text-slate-700">{a.pathAnalysis.frontierComparison}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">竞争力分析</div>
                  <div className="text-sm text-slate-700">{a.pathAnalysis.competitiveness}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">调整建议</div>
                  <div className="text-sm text-slate-700">{a.pathAnalysis.adjustmentSuggestion}</div>
                </div>
              </div>

              {/* Literature & Outcome */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  文献调研与成果预测
                </h3>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-2">相关论文</div>
                  <ul className="space-y-2">
                    {a.literatureSurvey.papers.map((p, i) => (
                      <li key={i} className="text-sm text-slate-700">
                        <span className="font-medium">{p.title}</span>
                        <span className="text-slate-500"> — {p.authors}, {p.source}, {p.year}</span>
                        <span className="text-cyan-600 text-xs"> ({p.relevance})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">领域趋势</div>
                  <div className="text-sm text-slate-700">{a.literatureSurvey.fieldTrend}</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">发文章概率</div>
                    <div className="flex items-center gap-2">
                      <Progress value={a.outcomePrediction.paperProbability * 100} className="h-2 flex-1" />
                      <span className="text-sm font-semibold text-slate-700">{Math.round(a.outcomePrediction.paperProbability * 100)}%</span>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                    <div className="text-xs text-slate-500 mb-1">发专利概率</div>
                    <div className="flex items-center gap-2">
                      <Progress value={a.outcomePrediction.patentProbability * 100} className="h-2 flex-1" />
                      <span className="text-sm font-semibold text-slate-700">{Math.round(a.outcomePrediction.patentProbability * 100)}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">预计时间线</div>
                  <div className="text-sm text-slate-700">{a.outcomePrediction.expectedTimeline}</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">推荐投稿期刊</div>
                  <div className="flex flex-wrap gap-2">
                    {a.outcomePrediction.recommendedJournals.map((j, i) => (
                      <Badge key={i} className="bg-cyan-100 text-cyan-700 text-xs">{j}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-cyan-600" />
                  行动建议
                </h3>
                <div>
                  <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1"><Zap className="w-3 h-3" />即时行动</div>
                  <ul className="space-y-1.5">
                    {a.actionRecommendations.immediateActions.map((act, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-amber-600 mb-1.5 flex items-center gap-1"><Target className="w-3 h-3" />短期目标</div>
                  <ul className="space-y-1.5">
                    {a.actionRecommendations.shortTermGoals.map((act, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-cyan-600 mb-1.5 flex items-center gap-1"><TrendingUp className="w-3 h-3" />中期规划</div>
                  <ul className="space-y-1.5">
                    {a.actionRecommendations.midTermPlan.map((act, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-medium text-purple-600 mb-1.5 flex items-center gap-1"><Users className="w-3 h-3" />协作建议</div>
                  <ul className="space-y-1.5">
                    {a.actionRecommendations.collaborationSuggestions.map((act, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                        <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Separator */}
              <div className="border-b border-slate-200 pt-4" />
            </div>
          );
        })}
      </div>

      {/* Print CSS */}
      <style>{`
        @media print {
          @page { size: A4; margin: 15mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
