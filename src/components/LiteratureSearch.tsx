import { useState, useMemo } from 'react';
import { searchLiterature, MOCK_LITERATURE } from '../data/mockLiterature';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Search,
  BookOpen,
  Quote,
  ExternalLink,
  Calendar,
  User,
} from 'lucide-react';

export default function LiteratureSearch() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchLiterature(query);
  }, [query]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="输入研究主题、关键词或作者搜索文献..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch} className="bg-cyan-700 hover:bg-cyan-800">
              <Search className="w-4 h-4 mr-1" />
              搜索
            </Button>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {['钙钛矿', '拓扑光子学', '光计算', '超表面', '量子光源'].map((kw) => (
              <button
                key={kw}
                onClick={() => { setQuery(kw); setHasSearched(true); }}
                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600 hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {!hasSearched ? (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              推荐文献
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {MOCK_LITERATURE.slice(0, 5).map((item) => (
                <LiteratureCard key={item.id} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">未找到相关文献，请尝试其他关键词</div>
      ) : (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              搜索结果 ({results.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3">
              {results.map((item) => (
                <LiteratureCard key={item.id} item={item} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function LiteratureCard({ item }: { item: import('../types').LiteratureItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-medium text-slate-800 leading-snug">{item.title}</h3>
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-600 hover:text-cyan-700 flex-shrink-0 mt-0.5"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" />
          {item.authors.slice(0, 2).join(', ')}{item.authors.length > 2 ? ' et al.' : ''}
        </span>
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {item.year}
        </span>
        <Badge variant="outline" className="text-[10px] px-1">{item.source}</Badge>
      </div>
      <div className="mt-2">
        <p className={`text-xs text-slate-600 leading-relaxed ${expanded ? '' : 'line-clamp-2'}`}>
          {item.abstract}
        </p>
        {item.abstract.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-cyan-600 hover:text-cyan-700 mt-1"
          >
            {expanded ? '收起' : '展开摘要'}
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Quote className="w-3 h-3" />
          被引 {item.citationCount} 次
        </span>
        <span className="text-cyan-600 font-medium">相关度 {item.relevanceScore}%</span>
      </div>
    </div>
  );
}
