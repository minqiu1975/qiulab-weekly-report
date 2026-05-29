import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import CollaborationGraph from '../components/CollaborationGraph';
import { callKimiApi } from '../lib/kimiApi';
import { cloudStorage } from '../services/cloudStorage';
import { usePersons } from '../hooks/usePersons';
import { type Paper } from '../services/pubUpdaterService';
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
  History,
  Trash2,
  ExternalLink,
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

export default function CollaborationPage() {
  const [collabData, setCollabData] = useState<CollabData | null>(null);
  const [aiResult, setAiResult] = useState<AIAnalysisResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [expandedPotential, setExpandedPotential] = useState<number | null>(0);
  const [expandedTrend, setExpandedTrend] = useState<number | null>(0);

  // 文献数据库更新状态
  // (更新功能已改为链接到实验室官网，以下状态保留用于兼容)
  const [localPapers, setLocalPapers] = useState<Paper[]>([]);

  // 历史协作分析记录
  interface SavedCollab {
    key: string;
    memberAName: string;
    memberBName: string;
    result: string;
    timestamp: string;
  }
  const [savedCollabs, setSavedCollabs] = useState<SavedCollab[]>([]);
  const [expandedSaved, setExpandedSaved] = useState<number | null>(null);

  // 从云端 Person 数据加载所有协作分析
  const loadSavedCollabs = useCallback(() => {
    const allData = cloudStorage.loadFromLocal();
    const loaded: SavedCollab[] = [];
    const seenPairs = new Set<string>();

    for (const person of allData.persons) {
      if (!person.collabSuggestions) continue;
      for (const [partnerId, sug] of Object.entries(person.collabSuggestions)) {
        // 用排序后的 pair key 去重（A-B 和 B-A 视为同一条）
        const pairKey = [person.id, partnerId].sort().join('-');
        if (seenPairs.has(pairKey)) continue;
        seenPairs.add(pairKey);
        loaded.push({
          key: pairKey,
          memberAName: person.name,
          memberBName: sug.partnerName,
          result: sug.result,
          timestamp: sug.timestamp,
        });
      }
    }
    // 按时间倒序
    loaded.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setSavedCollabs(loaded);
  }, []);

  useEffect(() => {
    loadSavedCollabs();
  }, [aiResult, loadSavedCollabs]);

  const deleteSavedCollab = async (pairKey: string) => {
    const [idA, idB] = pairKey.split('-');
    if (!idA || !idB) return;
    try {
      const allData = cloudStorage.loadFromLocal();
      const persons = allData.persons.map((p) => {
        if (p.id === idA || p.id === idB) {
          const sug = { ...p.collabSuggestions };
          delete sug[idA === p.id ? idB : idA];
          return { ...p, collabSuggestions: sug };
        }
        return p;
      });
      await cloudStorage.saveAllData({ ...allData, persons, lastModified: new Date().toISOString() });
      loadSavedCollabs();
    } catch (e) {
      console.warn('[Collab] 删除失败:', e);
    }
  };

  // 加载合作数据和论文数据
  useEffect(() => {
    fetch('./collaboration.json')
      .then((r) => r.json())
      .then((d: CollabData) => setCollabData(d))
      .catch(() => {});
    // 加载 papers.json 到本地状态（用于后续更新合并）
    fetch('./papers.json')
      .then((r) => r.json())
      .then((d: Paper[]) => setLocalPapers(d))
      .catch(() => {});
  }, []);


  // AI 分析（使用更新后的数据，仅针对活跃成员）
  const ALL_PERSONS = usePersons();
  const activePersons = ALL_PERSONS.filter((p) => p.status === 'active');
  const activeNames = new Set(activePersons.map((p) => p.name));

  const handleAIAnalysisWithData = async (data: CollabData, papers: Paper[]) => {
    setAiLoading(true);
    setAiError('');
    try {
      // 仅筛选活跃作者的论文数据
      const activeNodes = data.nodes.filter((n) => activeNames.has(n.name));
      const activeNodeIds = new Set(activeNodes.map((n) => n.id));
      const activeLinks = data.links.filter(
        (l) => activeNodeIds.has(l.source) && activeNodeIds.has(l.target)
      );

      const topAuthors = activeNodes
        .slice(0, 10)
        .map((n) => `${n.name}: ${n.paperCount}篇`)
        .join('\n');

      const topCollabs = activeLinks
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
        .map((l) => {
          const a = data.nodes.find((n) => n.id === l.source)?.name || l.source;
          const b = data.nodes.find((n) => n.id === l.target)?.name || l.target;
          return `${a} ↔ ${b}: ${l.value}篇`;
        })
        .join('\n');

      const yearDistStr = Object.entries(
        papers.reduce((acc: Record<number, number>, p) => {
          if (p.year > 0) acc[p.year] = (acc[p.year] || 0) + 1;
          return acc;
        }, {})
      )
        .sort(([a], [b]) => Number(b) - Number(a))
        .slice(0, 10)
        .map(([year, count]) => `${year}: ${count}篇`)
        .join('\n');

      // 活跃成员名单及研究方向
      const activeMembersStr = activePersons
        .map((p) => `- ${p.name}（${p.roleLabel}）：${p.researchDirection}`)
        .join('\n');

      const prompt = `作为仇旻实验室（PAINT Lab, 西湖大学）的研究管理顾问，请基于以下数据提供深度洞察。

【重要】以下分析仅限实验室当前活跃成员（在职研究员+博士后+在读博士生），请勿推荐已毕业/已离职人员的合作。

## 当前活跃成员（${activePersons.length}人）
${activeMembersStr}

## 论文统计（活跃成员参与）
- 总论文数：${papers.length}篇
- 年份分布：
${yearDistStr}

## 活跃核心作者（前10）
${topAuthors}

## 活跃成员主要合作关系（前10）
${topCollabs}

请用JSON格式返回分析结果（不要包含markdown代码块标记，直接返回JSON）：
{
  "summary": "对活跃团队协作状况的总体评价（2-3句话）",
  "topCollaborations": [
    { "pair": "作者A ↔ 作者B", "count": 共同论文数, "topics": ["研究主题1", "主题2"] }
  ],
  "potentialCollaborations": [
    { "pair": "作者A ↔ 作者B", "reason": "为什么推荐他们合作", "suggestedTopics": ["建议方向1", "方向2"] }
  ],
  "researchGaps": ["当前研究空白1", "空白2"],
  "weeklyTrends": []
}

注意：
1. topCollaborations 列出5个最强的现有合作（仅限活跃成员之间）
2. potentialCollaborations 仅限活跃成员之间的组合，推荐5个有潜力但合作较少的组合
3. researchGaps 基于活跃成员的研究方向分布找出研究空白
4. 严禁推荐已毕业/已离职人员的合作`;

      const response = await callKimiApi(prompt, { maxTokens: 4000, temperature: 0.5 });
      let jsonStr = response;
      jsonStr = jsonStr.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
      const result = JSON.parse(jsonStr) as AIAnalysisResult;
      setAiResult(result);
    } catch (err: any) {
      setAiError(err.message || 'AI分析失败');
    } finally {
      setAiLoading(false);
    }
  };

  // 原始的 AI 分析处理函数
  const handleAIAnalysis = useCallback(async () => {
    if (!collabData) return;
    await handleAIAnalysisWithData(collabData, localPapers);
  }, [collabData, localPapers]);

  // 统计信息
  const totalPaperCount = localPapers.length > 0 ? localPapers.length : (collabData ? 365 : 0);
  const stats = collabData ? {
    totalAuthors: collabData.nodes.length,
    totalLinks: collabData.links.length,
    coreAuthors: collabData.nodes.filter((n) => n.group === 'core').length,
    totalPapers: totalPaperCount,
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
            基于 {stats?.totalPapers || 0} 篇同步论文（仇旻教授实际发表
            <a
              href="https://scholar.google.com/citations?user=FgSUsGoAAAAJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-cyan-800 underline inline-flex items-center gap-0.5"
            >
              400+篇SCI <ExternalLink className="w-3 h-3" />
            </a>
            ）+ 周报动态，AI 驱动的协作洞察
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://qiu.lab.westlake.edu.cn/ky/fblw.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-800"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              查看实验室论文
            </Button>
          </a>
          <Button
            onClick={handleAIAnalysis}
            disabled={aiLoading}
            className="bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white"
          >
            {aiLoading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <Sparkles className="w-4 h-4 mr-1" />}
            {aiLoading ? 'AI分析中...' : aiResult ? '重新分析' : 'AI 分析协作网络'}
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: '合作作者数', value: stats.totalAuthors, icon: Users, color: 'bg-gradient-to-br from-blue-500 to-indigo-600', ring: 'ring-blue-100' },
            { label: '合作关系数', value: stats.totalLinks, icon: ArrowRight, color: 'bg-gradient-to-br from-emerald-500 to-teal-600', ring: 'ring-emerald-100' },
            { label: '核心作者', value: stats.coreAuthors, icon: BookOpen, color: 'bg-gradient-to-br from-amber-500 to-orange-600', ring: 'ring-amber-100' },
            {
              label: '总论文数',
              value: stats.totalPapers,
              color: 'bg-gradient-to-br from-cyan-500 to-blue-600',
              ring: 'ring-cyan-100',
              href: 'https://scholar.google.com/citations?user=FgSUsGoAAAAJ',
            },
          ].map((s) => {
            const Icon = s.icon || BookOpen;
            const cardContent = (
              <Card className={`border-slate-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${s.href ? 'cursor-pointer' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center shadow-md ring-2 ${s.ring}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-800">{s.value}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-0.5">
                        {s.label}
                        {s.href && <ExternalLink className="w-3 h-3 text-slate-400" />}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
            return s.href ? (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block no-underline">
                {cardContent}
              </a>
            ) : (
              <div key={s.label}>{cardContent}</div>
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
              历史合作排行（基于{totalPaperCount}篇论文）
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

      {/* 历史协作分析记录 */}
      {savedCollabs.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <History className="w-4 h-4 text-cyan-600" />
              历史协作分析记录 ({savedCollabs.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-3">
            {savedCollabs.map((saved, i) => {
              const isOpen = expandedSaved === i;
              const date = new Date(saved.timestamp);
              const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
              return (
                <div key={saved.key} className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedSaved(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-medium text-violet-700">{saved.memberAName}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="text-sm font-medium text-violet-700">{saved.memberBName}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] text-slate-400">
                        {dateStr}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSavedCollab(saved.key); }}
                        className="p-1 rounded hover:bg-red-100 text-slate-400 hover:text-red-500 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="p-3 bg-violet-50">
                      <div className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{saved.result}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
