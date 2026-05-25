import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CollaborationGraph from '../components/CollaborationGraph';
import ExportButton from '../components/ExportButton';
import { MOCK_COLLABORATIONS } from '../data/mockCollaborations';
import {
  Zap,
  ArrowRight,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

export default function CollaborationPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">协作推荐</h1>
          <p className="text-sm text-slate-500 mt-0.5">基于研究方向相似度分析推荐潜在协作组合</p>
        </div>
        <ExportButton
          label="导出协作数据"
          fileName="collaborations.json"
          data={MOCK_COLLABORATIONS as unknown as Record<string, unknown>}
        />
      </div>

      <CollaborationGraph />

      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Zap className="w-4 h-4 text-amber-500" />
            推荐协作对 ({MOCK_COLLABORATIONS.recommendedPairs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 space-y-3">
          {MOCK_COLLABORATIONS.recommendedPairs.map((pair, i) => {
            const isOpen = expandedIndex === i;
            return (
              <div
                key={i}
                className="border border-slate-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-800">{pair.personA}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-sm font-medium text-slate-800">{pair.personB}</span>
                    </div>
                    <Badge className="bg-cyan-100 text-cyan-700 text-[10px]">
                      相似度 {(pair.similarityScore * 100).toFixed(0)}%
                    </Badge>
                  </div>
                  {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="text-xs font-medium text-slate-500 mb-1.5">共同研究主题</div>
                      <div className="flex gap-1.5 flex-wrap">
                        {pair.commonTopics.map((t) => (
                          <Badge key={t} variant="outline" className="text-[10px] bg-slate-50">{t}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500 mb-1.5">推荐理由</div>
                      <p className="text-sm text-slate-700 leading-relaxed">{pair.reason}</p>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-500 mb-1.5">推荐合作项目</div>
                      <ul className="space-y-1">
                        {pair.recommendedProjects.map((p, j) => (
                          <li key={j} className="text-sm text-slate-600 flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
