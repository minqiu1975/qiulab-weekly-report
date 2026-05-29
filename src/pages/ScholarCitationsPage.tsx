import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import {
  Quote, RefreshCw, ExternalLink, TrendingUp, BookOpen, User,
  AlertTriangle, CheckCircle2, Loader2,
} from 'lucide-react';
import {
  loadScholarData,
  scrapeScholarData,
  type ScholarCitationData,
} from '../services/scholarScraper';

interface YearlyData {
  year: string;
  citations: number;
}

export default function ScholarCitationsPage() {
  const [data, setData] = useState<ScholarCitationData | null>(null);
  const [period, setPeriod] = useState<'all' | 'since2021'>('all');
  const [loading, setLoading] = useState(true);
  const [scraping, setScraping] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 加载数据
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const d = await loadScholarData();
      setData(d);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 抓取更新
  const handleScrape = async () => {
    setScraping(true);
    setError('');
    setSuccess('');
    try {
      const newData = await scrapeScholarData();
      setData(newData);
      setSuccess('数据更新成功！');
      setTimeout(() => setSuccess(''), 3000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setScraping(false);
    }
  };

  // 图表数据
  const chartData: YearlyData[] = useMemo(() => {
    if (!data) return [];
    const entries = Object.entries(data.yearlyCitations)
      .map(([year, citations]) => ({ year, citations }))
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));

    if (period === 'since2021') {
      return entries.filter((d) => parseInt(d.year) >= 2021);
    }
    return entries;
  }, [data, period]);

  // 统计数字
  const stats = useMemo(() => {
    if (!data) return null;
    const s = period === 'all' ? data.stats.allTime : data.stats.since2021;
    const prefix = period === 'all' ? '' : 'Since 2021 ';
    return {
      citations: s.citations,
      hIndex: s.hIndex,
      i10Index: s.i10Index,
      prefix,
    };
  }, [data, period]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-cyan-600 animate-spin" />
        <span className="ml-3 text-slate-500">加载引用数据...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16 text-slate-500">
        <AlertTriangle className="w-12 h-12 mx-auto mb-3 text-amber-500" />
        <p>无法加载 Google Scholar 数据</p>
        <Button variant="outline" className="mt-4" onClick={loadData}>重试</Button>
      </div>
    );
  }

  const lastUpdated = new Date(data.lastUpdated).toLocaleString('zh-CN');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
            <Quote className="w-6 h-6 text-blue-600" />
            Google Scholar 引用分析
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            数据来源：
            <a
              href={`https://scholar.google.com/citations?user=${data.authorId}&hl=zh-CN`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:text-cyan-800 underline inline-flex items-center gap-0.5"
            >
              {data.name} <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-400 mx-2">|</span>
            上次更新：{lastUpdated}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={`https://scholar.google.com/citations?user=${data.authorId}&hl=zh-CN`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
              <ExternalLink className="w-4 h-4 mr-1" />
              访问 Scholar
            </Button>
          </a>
          <Button
            onClick={handleScrape}
            disabled={scraping}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
          >
            {scraping ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />}
            {scraping ? '抓取中...' : '抓取最新数据'}
          </Button>
        </div>
      </div>

      {/* 状态消息 */}
      {error && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm text-amber-800 whitespace-pre-line">{error}</div>
          </CardContent>
        </Card>
      )}
      {success && (
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-4 flex items-center gap-2 text-sm text-emerald-800">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            {success}
          </CardContent>
        </Card>
      )}

      {/* 作者信息 */}
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              <User className="w-10 h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-slate-800">{data.name}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{data.affiliation}</p>
              <a
                href={data.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-600 hover:text-cyan-800 underline inline-flex items-center gap-0.5 mt-0.5"
              >
                {data.homepage} <ExternalLink className="w-3 h-3" />
              </a>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {data.fields.map((f) => (
                  <Badge key={f} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {f}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 统计头部 + 周期切换 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPeriod('all')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              period === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setPeriod('since2021')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              period === 'since2021'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Since 2021
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              label: `${stats.prefix}Citations`,
              value: stats.citations.toLocaleString(),
              icon: TrendingUp,
              color: 'from-blue-500 to-indigo-600',
              ring: 'ring-blue-100',
            },
            {
              label: 'h-index',
              value: stats.hIndex,
              icon: BookOpen,
              color: 'from-emerald-500 to-teal-600',
              ring: 'ring-emerald-100',
            },
            {
              label: 'i10-index',
              value: stats.i10Index,
              icon: Quote,
              color: 'from-amber-500 to-orange-600',
              ring: 'ring-amber-100',
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="border-slate-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center shadow-md ring-2 ${s.ring}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-slate-800">{s.value}</div>
                      <div className="text-xs text-slate-500">{s.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* 年度引用柱状图 */}
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            年度引用次数 {period === 'since2021' ? '(2021-2026)' : '(2001-2026)'}
          </h3>
          <div className="w-full" style={{ height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={{ stroke: '#cbd5e1' }}
                  tickLine={false}
                  tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v)}
                />
                <Tooltip
                  formatter={(value: number) => [value.toLocaleString(), '引用次数']}
                  labelFormatter={(label: string) => `${label}年`}
                  contentStyle={{
                    borderRadius: 8,
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  dataKey="citations"
                  fill="url(#barGradient)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 数据说明 */}
      <div className="text-xs text-slate-400 flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" />
        由于 Google Scholar 的 CORS 限制，"抓取最新数据"按钮可能无法直接获取数据。
        如需要最新数据，请访问
        <a
          href={`https://scholar.google.com/citations?user=${data.authorId}&hl=zh-CN`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-slate-600"
        >
          Google Scholar 页面
        </a>
        手动查看。
      </div>
    </div>
  );
}
