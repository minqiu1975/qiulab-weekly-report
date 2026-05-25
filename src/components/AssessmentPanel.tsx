import { useState } from 'react';
import type { Assessment } from '../types';
import {
  TrendingUp,
  AlertTriangle,
  Route,
  ListChecks,
  ChevronDown,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Target,
  Zap,
  Users,
  BookOpen,
  BarChart3,
  CalendarClock,
  FileText,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface Props {
  assessment: Assessment;
}

const riskConfig = {
  low: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: Shield, label: '低风险' },
  medium: { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: AlertTriangle, label: '中风险' },
  high: { color: 'bg-red-100 text-red-700 border-red-200', icon: AlertTriangle, label: '高风险' },
};

type SectionKey = 'progress' | 'problem' | 'path' | 'literature' | 'action';

export default function AssessmentPanel({ assessment }: Props) {
  const [expanded, setExpanded] = useState<Record<SectionKey, boolean>>({
    progress: true,
    problem: true,
    path: true,
    literature: true,
    action: true,
  });

  const toggle = (key: SectionKey) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  const rc = riskConfig[assessment.riskLevel];
  const RiskIcon = rc.icon;

  const sections: { key: SectionKey; title: string; icon: typeof TrendingUp; content: React.ReactNode }[] = [
    {
      key: 'progress',
      title: '进展评估',
      icon: TrendingUp,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">工作量饱和度</div>
              <div className="flex items-center gap-2">
                <Progress value={assessment.progressAssessment.workloadScore} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-slate-700">{assessment.progressAssessment.workloadScore}</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">工作质量</div>
              <div className="flex items-center gap-2">
                <Progress value={assessment.progressAssessment.qualityScore} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-slate-700">{assessment.progressAssessment.qualityScore}</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Target className="w-3 h-3" />里程碑达成</div>
            <div className="text-sm text-slate-700">{assessment.progressAssessment.milestoneAchievement}</div>
          </div>
          {assessment.progressAssessment.highlights.length > 0 && (
            <div>
              <div className="text-xs font-medium text-emerald-600 mb-1">亮点</div>
              <ul className="space-y-1">
                {assessment.progressAssessment.highlights.map((h, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                    <Star className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {assessment.progressAssessment.concerns.length > 0 && (
            <div>
              <div className="text-xs font-medium text-amber-600 mb-1">关注点</div>
              <ul className="space-y-1">
                {assessment.progressAssessment.concerns.map((c, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'problem',
      title: '问题诊断',
      icon: AlertTriangle,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">瓶颈类型</div>
              <div className="text-sm font-medium text-slate-700">{assessment.problemDiagnosis.bottleneckType}</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">严重程度</div>
              <Badge variant={assessment.problemDiagnosis.severity === 'high' ? 'destructive' : assessment.problemDiagnosis.severity === 'medium' ? 'default' : 'secondary'}>
                {assessment.problemDiagnosis.severity === 'high' ? '严重' : assessment.problemDiagnosis.severity === 'medium' ? '中等' : '轻微'}
              </Badge>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">根因分析</div>
            <div className="text-sm text-slate-700">{assessment.problemDiagnosis.rootCause}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Zap className="w-3 h-3" />建议方案</div>
            <div className="text-sm text-slate-700">{assessment.problemDiagnosis.suggestedSolution}</div>
          </div>
          {assessment.problemDiagnosis.estimatedResolveTime !== '-' && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              <span>预计解决时间: {assessment.problemDiagnosis.estimatedResolveTime}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'path',
      title: '道路研判',
      icon: Route,
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">方向合理性</div>
              <div className="flex items-center gap-2">
                <Progress value={assessment.pathAnalysis.directionRationality} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-slate-700">{assessment.pathAnalysis.directionRationality}</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">技术路线风险</div>
              <Badge variant={assessment.pathAnalysis.techRouteRisk === 'high' ? 'destructive' : assessment.pathAnalysis.techRouteRisk === 'medium' ? 'default' : 'secondary'}>
                {assessment.pathAnalysis.techRouteRisk === 'high' ? '高风险' : assessment.pathAnalysis.techRouteRisk === 'medium' ? '中等' : '低风险'}
              </Badge>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">前沿对比</div>
            <div className="text-sm text-slate-700">{assessment.pathAnalysis.frontierComparison}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">竞争力分析</div>
            <div className="text-sm text-slate-700">{assessment.pathAnalysis.competitiveness}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">调整建议</div>
            <div className="text-sm text-slate-700">{assessment.pathAnalysis.adjustmentSuggestion}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'literature',
      title: '文献调研与成果预测',
      icon: BookOpen,
      content: (
        <div className="space-y-3">
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-2 flex items-center gap-1"><FileText className="w-3 h-3" />相关论文</div>
            <ul className="space-y-2">
              {assessment.literatureSurvey.papers.map((p, i) => (
                <li key={i} className="text-sm text-slate-700">
                  <span className="font-medium">{p.title}</span>
                  <span className="text-slate-500"> — {p.authors}, {p.source}, {p.year}</span>
                  <span className="text-cyan-600 text-xs"> ({p.relevance})</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">领域趋势</div>
            <div className="text-sm text-slate-700">{assessment.literatureSurvey.fieldTrend}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><BarChart3 className="w-3 h-3" />发文章概率</div>
              <div className="flex items-center gap-2">
                <Progress value={assessment.outcomePrediction.paperProbability} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-slate-700">{assessment.outcomePrediction.paperProbability}%</span>
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><BarChart3 className="w-3 h-3" />发专利概率</div>
              <div className="flex items-center gap-2">
                <Progress value={assessment.outcomePrediction.patentProbability} className="h-2 flex-1" />
                <span className="text-sm font-semibold text-slate-700">{assessment.outcomePrediction.patentProbability}%</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><CalendarClock className="w-3 h-3" />预计时间线</div>
            <div className="text-sm text-slate-700">{assessment.outcomePrediction.expectedTimeline}</div>
          </div>
          <div className="bg-slate-50 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">推荐投稿期刊</div>
            <div className="flex flex-wrap gap-2">
              {assessment.outcomePrediction.recommendedJournals.map((j, i) => (
                <Badge key={i} className="bg-cyan-100 text-cyan-700 text-xs">{j}</Badge>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'action',
      title: '行动建议',
      icon: ListChecks,
      content: (
        <div className="space-y-3">
          <div>
            <div className="text-xs font-medium text-red-600 mb-1.5 flex items-center gap-1"><Zap className="w-3 h-3" />即时行动</div>
            <ul className="space-y-1.5">
              {assessment.actionRecommendations.immediateActions.map((a, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium text-amber-600 mb-1.5 flex items-center gap-1"><Target className="w-3 h-3" />短期目标</div>
            <ul className="space-y-1.5">
              {assessment.actionRecommendations.shortTermGoals.map((a, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium text-cyan-600 mb-1.5 flex items-center gap-1"><TrendingUp className="w-3 h-3" />中期规划</div>
            <ul className="space-y-1.5">
              {assessment.actionRecommendations.midTermPlan.map((a, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-xs font-medium text-purple-600 mb-1.5 flex items-center gap-1"><Users className="w-3 h-3" />协作建议</div>
            <ul className="space-y-1.5">
              {assessment.actionRecommendations.collaborationSuggestions.map((a, i) => (
                <li key={i} className="text-sm text-slate-600 flex items-start gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm text-slate-500">AI综合研判摘要</div>
              <div className="text-sm text-slate-700 mt-1 leading-relaxed">{assessment.summary}</div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className="text-xs text-slate-500">综合评分</div>
                <div className="text-2xl font-bold text-cyan-700">{assessment.overallScore}</div>
                <div className="text-[10px] text-slate-400">满分100分</div>
              </div>
              <div className="h-10 w-px bg-slate-200" />
              <Badge className={`${rc.color} border`}>
                <RiskIcon className="w-3 h-3 mr-1" />
                {rc.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {sections.map((section) => {
        const Icon = section.icon;
        const isOpen = expanded[section.key];
        return (
          <Card key={section.key} className="border-slate-200">
            <CardHeader className="py-3 px-4">
              <button
                onClick={() => toggle(section.key)}
                className="flex items-center justify-between w-full text-left"
              >
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                  <Icon className="w-4 h-4 text-cyan-600" />
                  {section.title}
                </CardTitle>
                {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
              </button>
            </CardHeader>
            {isOpen && <CardContent className="pt-0 px-4 pb-4">{section.content}</CardContent>}
          </Card>
        );
      })}
    </div>
  );
}
