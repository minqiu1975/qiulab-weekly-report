import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CollaborationGraph from '../components/CollaborationGraph';
import { callKimiApi } from '../lib/kimiApi';
import {
  Sparkles,
  BookOpen,
  Users,
  ArrowRight,
  Loader2,
  ChevronDown,
  ChevronRight,
  FileText,
  TrendingUp,
  Lightbulb,
} from 'lucide-react';

interface CollabData {
  nodes: { id: string; name: string; paperCount: number; group: string }[];
  links: { source: string; target: string; value: number }[];
}

interface AIAnalysisResult {
  summary: string;
  topCollaborations: { pair: string; count: number; topics: string[] }[];
  potentialCollaborations: { pair: string; reason: string; suggestedTopics: string[] }[];
  researchGaps: string[];
  weeklyTrends: { name: string; trend: string; opportunities: string[] }[];
}

interface WeeklyTrend {
  name: string;
  progress: number;
  characterTag: string;
}

export default function CollaborationPage() {
  const [collabData, setCollabData] = useState<CollabData | null>(null);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [expandedPotential, setExpandedPotential] = useState<number | null>(0);
  const [expandedTrend, setExpandedTrend] = useState<number | null>(0);
  const [weeklyData, setWeeklyData] = useState<Record<string, WeeklyTrend>>({});
  // 加载合作数据
  useEffect(() => {
    fetch('./collaboration.json')
      .then((r) => r.json())
      .then((d: CollabData) => setCollabData(d))
      .catch(() => {});
  }, []);

  // 加载最新周报趋势数据
  useEffect(() => {
    try {
      const trends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}');
      const labels = JSON.parse(localStorage.getItem('qlab_dynamic_labels') || '[]') as string[];
      if (labels.length > 0 && trends[labels[labels.length - 1]]) {
        setWeeklyData(trends[labels[labels.length - 1]]);
      }
    } catch { /* ignore */ }
  }, []);

  // AI 分析协作网络
  const handleAIAnalysis = useCallback(async () => {
    setAiLoading(true);
    setAiError('');
    try {
      // 构建提示
      const topAuthors = collabData?.nodes.slice(0, 20).map((n) =>
        `- ${n.name}: ${n.paperCount}篇论文 (${n.group})`
      ).join('\n') || '';

      const topCollabs = collabData?.links.slice(0, 20).map((l) => {
        const s = collabData.nodes.find((n) => n.id === l.source);
        const t = collabData.nodes.find((n) => n.id === l.target);
        return `- ${s?.name} ↔ ${t?.name}: ${l.value}篇`;
      }).join('\n') || '';

      // 周报动态数据
      const weeklyEntries = Object.entries(weeklyData).slice(0, 30);
      const weeklyStr = weeklyEntries.length > 0
        ? weeklyEntries.map(([name, data]) => `- ${name}: ${data.characterTag}, 进展${data.progress}%`).join('\n')
        : '暂无周报数据';

      const prompt = `作为仇旻实验室（PAINT Lab, 西湖大学）的研究管理顾问，请基于以下论文发表合作数据和最新周报动态，分析团队协作状况并提供深度洞察。

## 论文发表合作数据（2009-2025，共216篇论文）

### 核心作者及论文数
${topAuthors}

### 主要合作关系（共同发表论文数）
${topCollabs}

## 最新周报动态
${weeklyStr}

请用JSON格式返回分析结果（不要包含markdown代码块标记，直接返回JSON）：
{
  "summary": "对团队协作状况的总体评价（2-3句话）",
  "topCollaborations": [
    { "pair": "作者A ↔ 作者B", "count": 共同论文数, "topics": ["研究主题1", "主题2"] }
  ],
  "potentialCollaborations": [
    { "pair": "作者A ↔ 作者B", "reason": "为什么推荐他们合作（基于研究方向交叉）", "suggestedTopics": ["建议合作方向1", "方向2"] }
  ],
  "researchGaps": ["当前研究空白1", "空白2"],
  "weeklyTrends": [
    { "name": "成员姓名", "trend": "近期研究趋势描述", "opportunities": ["合作机会1", "机会2"] }
  ]
}

注意：
1. topCollaborations 列出5个最强的现有合作
2. potentialCollaborations 基于论文研究方向差异和周报动态，推荐5个新的潜在合作组合
3. researchGaps 基于整体论文分布找出研究空白
4. weeklyTrends 分析周报动态中每个人的研究趋势和合作机会`;

      const response = await callKimiApi(prompt, {
        maxTokens: 4000,
        temperature: 0.5,
      });

      // 解析JSON响应
      let jsonStr = response;
      // 去除可能的markdown代码块
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
      const result = JSON.parse(jsonStr) as AIAnalysisResult;
      setAiResult(result);
    } catch (err: any) {
      setAiError(err.message || 'AI分析失败，请检查Kimi API配置');
    } finally {
      setAiLoading(false);
    }
  }, [collabData, weeklyData]);

  // 统计信息（unique papers count, not sum of all author papers）
  const stats = collabData ? {
    totalAuthors: collabData.nodes.length,
    totalLinks: collabData.links.length,
    coreAuthors: collabData.nodes.filter((n) => n.group === 'core').length,
    totalPapers: 216, // 实际去重论文数（从网站抓取）
  } : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            协作分析
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            基于 {stats?.totalPapers || 0} 篇论文发表记录 + 周报动态，AI 驱动的协作洞察
          </p>
        </div>
        <Button
          onClick={handleAIAnalysis}
          disabled={aiLoading}
          className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white"
        >
          {aiLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
          {aiLoading ? 'AI分析中...' : aiResult ? '重新分析' : 'AI 分析协作网络'}
        </Button>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: '合作作者数', value: stats.totalAuthors, icon: Users, color: 'bg-gradient-to-br from-blue-500 to-indigo-600', ring: 'ring-blue-100' },
            { label: '合作关系数', value: stats.totalLinks, icon: ArrowRight, color: 'bg-gradient-to-br from-emerald-500 to-teal-600', ring: 'ring-emerald-100' },
            { label: '核心作者', value: stats.coreAuthors, icon: BookOpen, color: 'bg-gradient-to-br from-amber-500 to-orange-600', ring: 'ring-amber-100' },
            { label: '总论文数', value: stats.totalPapers, color: 'bg-gradient-to-br from-cyan-500 to-blue-600', ring: 'ring-cyan-100' },
          ].map((s) => {
            const Icon = s.icon || BookOpen;
            return (
              <Card key={s.label} className="border-slate-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center shadow-md ring-2 ${s.ring}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* AI 分析结果 */}
      {aiError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 text-sm text-red-700">{aiError}</CardContent>
        </Card>
      )}

      {aiResult && (
        <Card className="border-violet-200 bg-gradient-to-r from-violet-50 to-purple-50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-violet-800">
              <Sparkles className="w-4 h-4" />
              AI 协作洞察
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <p className="text-sm text-slate-700 leading-relaxed">{aiResult.summary}</p>
          </CardContent>
        </Card>
      )}

      {/* 协作网络图 */}
      <CollaborationGraph />

      {/* 经典合作排行 */}
      {collabData && (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              历史合作排行（基于216篇论文）
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {collabData.links
                .sort((a, b) => b.value - a.value)
                .slice(0, 10)
                .map((link, i) => {
                  const s = collabData.nodes.find((n) => n.id === link.source);
                  const t = collabData.nodes.find((n) => n.id === link.target);
                  const maxVal = collabData.links[0].value;
                  const pct = (link.value / maxVal) * 100;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 w-5">{i + 1}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-slate-700">{s?.name}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="text-sm text-slate-700">{t?.name}</span>
                          <Badge variant="outline" className="text-[10px] ml-auto">{link.value} 篇</Badge>
                        </div>
                        <div className="mt-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI 推荐未来合作 */}
      {aiResult?.potentialCollaborations && aiResult.potentialCollaborations.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              AI 推荐未来合作方向 ({aiResult.potentialCollaborations.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {aiResult.potentialCollaborations.map((pair, i) => {
              const isOpen = expandedPotential === i;
              return (
                <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedPotential(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-slate-800">{pair.pair}</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                        潜力合作
                      </Badge>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-3 space-y-3">
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1.5">推荐理由</div>
                        <p className="text-sm text-slate-700 leading-relaxed">{pair.reason}</p>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1.5">建议合作方向</div>
                        <div className="flex gap-1.5 flex-wrap">
                          {pair.suggestedTopics.map((t) => (
                            <Badge key={t} variant="outline" className="text-[10px] bg-violet-50 text-violet-700 border-violet-200">{t}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* 周报趋势分析 */}
      {aiResult?.weeklyTrends && aiResult.weeklyTrends.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-4 h-4 text-cyan-600" />
              基于周报的个人研究趋势与合作机会
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {aiResult.weeklyTrends.slice(0, 8).map((trend, i) => {
              const isOpen = expandedTrend === i;
              return (
                <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedTrend(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-cyan-600" />
                      <span className="text-sm font-medium text-slate-800">{trend.name}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-3 space-y-2">
                      <p className="text-sm text-slate-700 leading-relaxed">{trend.trend}</p>
                      <div>
                        <div className="text-xs font-medium text-slate-500 mb-1">合作机会</div>
                        <div className="flex gap-1.5 flex-wrap">
                          {trend.opportunities.map((o) => (
                            <Badge key={o} variant="outline" className="text-[10px] bg-cyan-50 text-cyan-700 border-cyan-200">{o}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* 研究空白 */}
      {aiResult?.researchGaps && aiResult.researchGaps.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-amber-800">
              <Lightbulb className="w-4 h-4" />
              研究空白与机会
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ul className="space-y-2">
              {aiResult.researchGaps.map((gap, i) => (
                <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  {gap}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
