import { useMemo } from 'react';
import type { PersonTrend } from '../types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';

interface Props {
  trend: PersonTrend;
}

export default function TrendChart({ trend }: Props) {
  const data = useMemo(() => {
    return trend.data.map((d) => ({
      ...d,
      overallScorePercent: d.overallScore * 10,
    }));
  }, [trend]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-slate-200">
          <CardContent className="p-3">
            <div className="text-xs text-slate-500">本周工作量</div>
            <div className="text-lg font-bold text-slate-800">{data[data.length - 1]?.workloadScore ?? '-'}</div>
            <div className="text-[10px] text-slate-400">满分100</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-3">
            <div className="text-xs text-slate-500">本周进展</div>
            <div className="text-lg font-bold text-slate-800">{data[data.length - 1]?.progressScore ?? '-'}</div>
            <div className="text-[10px] text-slate-400">满分100</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-3">
            <div className="text-xs text-slate-500">问题数量</div>
            <div className="text-lg font-bold text-slate-800">{data[data.length - 1]?.problemCount ?? '-'}</div>
            <div className="text-[10px] text-slate-400">待解决问题</div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-3">
            <div className="text-xs text-slate-500">综合评分</div>
            <div className="text-lg font-bold text-slate-800">{data[data.length - 1]?.overallScore ?? '-'}</div>
            <div className="text-[10px] text-slate-400">满分10</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-4 h-4 text-cyan-600" />
            工作量与进展评分趋势
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 5, right: 60, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
              <YAxis yAxisId="left" width={45} domain={[0, 100]} tick={{ fontSize: 12 }} />
              {/* 不可见占位右侧Y轴，确保与下方双Y轴图表的绘图区域宽度一致 */}
              <YAxis yAxisId="right" orientation="right" width={45} domain={[0, 10]} tick={{ fill: 'transparent' }} axisLine={{ stroke: 'transparent' }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="workloadScore" name="工作量评分" stroke="#0891b2" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="left" type="monotone" dataKey="progressScore" name="进展评分" stroke="#059669" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            综合评分与问题数量趋势
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data} margin={{ top: 5, right: 60, bottom: 5, left: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="weekLabel" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
              <YAxis yAxisId="left" width={45} domain={[0, 100]} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" width={45} domain={[0, 10]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="left" type="monotone" dataKey="problemCount" name="问题数量" stroke="#dc2626" strokeWidth={2} dot={{ r: 3 }} />
              <Line yAxisId="right" type="monotone" dataKey="overallScore" name="综合评分(0-10)" stroke="#7c3aed" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {data.filter((d) => d.isAnomaly).length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold text-amber-700">异常检测</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            {data
              .filter((d) => d.isAnomaly)
              .map((d) => (
                <div key={d.weekNumber} className="flex items-start gap-2 text-sm text-amber-700">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {d.weekNumber}
                  </span>
                  <span>{d.anomalyReason}</span>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
