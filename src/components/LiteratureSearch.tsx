import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Search,
  BookOpen,
  Calendar,
  User,
} from 'lucide-react';

interface Paper {
  id: number;
  title: string;
  authors: string[];
  journal: string;
  year: number;
}

export default function LiteratureSearch() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [allPapers, setAllPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  // 从 papers.json 加载数据
  useEffect(() => {
    fetch('/papers.json')
      .then(r => r.json())
      .then(data => {
        setAllPapers(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allPapers.filter((item) => {
      if (item.title.toLowerCase().includes(q)) return true;
      if (item.authors.some((a: string) => a.toLowerCase().includes(q))) return true;
      if (item.journal?.toLowerCase().includes(q)) return true;
      if (String(item.year).includes(q)) return true;
      return false;
    });
  }, [query, allPapers]);

  const handleSearch = () => {
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-400 text-sm">
        加载论文数据中...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder={`搜索 ${allPapers.length} 篇论文... 输入标题、作者、期刊或年份`}
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
            {['SiC', 'metalens', 'ice lithography', 'perovskite', 'photonic', 'plasmonic', 'AR waveguide', 'femtosecond', 'metalens'].map((kw) => (
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
              论文列表 ({allPapers.length}篇)
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {allPapers.slice(0, 20).map((item) => (
                <LiteratureCard key={item.id} item={item} query="" />
              ))}
              {allPapers.length > 20 && (
                <p className="text-center text-xs text-slate-400 py-2">
                  ... 还有 {allPapers.length - 20} 篇论文，请使用搜索功能查找
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : results.length === 0 ? (
        <div className="text-center py-12 text-slate-400 text-sm">
          <p>未找到相关文献</p>
          <p className="text-xs mt-1">
            可尝试关键词：SiC, metalens, ice lithography, perovskite, photonic, plasmonic, topological
          </p>
        </div>
      ) : (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <BookOpen className="w-4 h-4 text-cyan-600" />
              搜索结果 ({results.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {results.map((item) => (
                <LiteratureCard key={item.id} item={item} query={query} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function LiteratureCard({ item, query }: { item: Paper; query: string }) {
  // 高亮匹配的文本
  const highlight = (text: string, q: string) => {
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-cyan-100 text-cyan-800 rounded px-0.5">{part}</mark> : part
    );
  };

  return (
    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-900 leading-snug">
            {query ? highlight(item.title, query) : item.title}
          </h3>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {item.authors.slice(0, 3).join(', ')}{item.authors.length > 3 ? ' et al.' : ''}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {item.year}
            </span>
            <Badge variant="outline" className="text-[10px] px-1">
              {item.journal}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
