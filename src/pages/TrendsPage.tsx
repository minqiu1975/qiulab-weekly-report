import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import TrendChart from '../components/TrendChart';
import ExportButton from '../components/ExportButton';
import { TREND_LABELS, PERSON_BASELINE_TRENDS } from '../data/mockTrends';
import { getAllWeekLabels, getMergedPersonTrend } from '../lib/dynamicStorage';
import { usePersons } from '../hooks/usePersons';
import { cloudStorage } from '../services/cloudStorage';
import { ROLE_LABEL_MAP } from '../data/mockPersons';
import { TrendingUp } from 'lucide-react';

export default function TrendsPage() {
  const [selectedId, setSelectedId] = useState('');
  const ALL_PERSONS = usePersons();

  // 打开页面时拉取云端最新数据，确保跨设备同步
  useEffect(() => {
    cloudStorage.loadAllData().catch(() => {});
  }, []);

  // 使用动态合并数据（静态基线 + 用户上传的动态数据）
  const trend = useMemo(() => {
    if (!selectedId || selectedId.startsWith('__')) return null;

    const person = ALL_PERSONS.find((p) => p.id === selectedId);
    if (!person) return null;

    const { labels, trends } = getMergedPersonTrend(
      selectedId,
      TREND_LABELS,
      (pid, weekIdx) => {
        const arr = PERSON_BASELINE_TRENDS[pid];
        return arr ? arr[weekIdx] : undefined;
      }
    );

    if (trends.length === 0) return null;

    // 转换为TrendChart需要的PersonTrend格式
    const data = trends.map((t, i) => ({
      weekNumber: i + 1,
      weekLabel: labels[i] || '',
      workloadScore: t.progress,
      progressScore: t.progress,
      problemCount: t.problems,
      overallScore: Math.round(t.progress / 10),
      isAnomaly: t.progress < 50 || t.problems >= 2,
      anomalyReason: t.problems >= 2 ? '实验困难较多' : t.progress < 50 ? '进展偏慢需关注' : undefined,
    }));

    const result: import('../types').PersonTrend = {
      personId: selectedId,
      personName: person.name,
      data,
    };
    return result;
  }, [selectedId, ALL_PERSONS]);

  // 在职人员（按新角色体系分组）
  const activePersons = useMemo(() => ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left' && p.status !== 'inactive'), [ALL_PERSONS]);

  // 博士生按入学年级分组
  const phdByYear = useMemo(() => {
    const phds = activePersons.filter((p) => p.role === 'phd');
    const years = Array.from(new Set(phds.map((p) => p.enrollmentYear))).sort((a, b) => (b || 0) - (a || 0));
    return years.map((year) => ({
      year,
      persons: phds.filter((p) => p.enrollmentYear === year),
    }));
  }, [activePersons]);

  // 获取所有日期标签（含动态上传的）
  const allLabels = useMemo(() => getAllWeekLabels(TREND_LABELS), []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">历史趋势</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            查看团队成员工作表现趋势
            {allLabels.length > TREND_LABELS.length && (
              <span className="text-cyan-600 ml-1">（含上传数据，共{allLabels.length}期）</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {trend && (
            <ExportButton
              label="导出趋势"
              fileName={`trend-${selectedId}.json`}
              data={trend as unknown as Record<string, unknown>}
            />
          )}
        </div>
      </div>

      <Card className="border-slate-200">
        <CardContent className="pt-6">
          <label className="text-sm font-medium text-slate-700 mb-2 block flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-cyan-600" />
            选择人员
          </label>
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="选择一位团队成员" />
            </SelectTrigger>
            <SelectContent>
              {/* 全部人员（不可选，作为标题） */}
              <SelectItem value="__all" disabled>全部人员</SelectItem>

              {/* 研究员 */}
              {activePersons.filter((p) => p.role === 'researcher').length > 0 && [
                <SelectItem key="__researcher" value="__researcher" disabled>{ROLE_LABEL_MAP.researcher}</SelectItem>,
                ...activePersons.filter((p) => p.role === 'researcher').map((p) => (
                  <SelectItem key={p.id} value={p.id} className="pl-8">
                    {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                  </SelectItem>
                )),
              ]}

              {/* 副研究员 */}
              {activePersons.filter((p) => p.role === 'associate_researcher').length > 0 && [
                <SelectItem key="__associate_researcher" value="__associate_researcher" disabled>{ROLE_LABEL_MAP.associate_researcher}</SelectItem>,
                ...activePersons.filter((p) => p.role === 'associate_researcher').map((p) => (
                  <SelectItem key={p.id} value={p.id} className="pl-8">
                    {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                  </SelectItem>
                )),
              ]}

              {/* 助理研究员 */}
              {activePersons.filter((p) => p.role === 'assistant_researcher').length > 0 && [
                <SelectItem key="__assistant_researcher" value="__assistant_researcher" disabled>{ROLE_LABEL_MAP.assistant_researcher}</SelectItem>,
                ...activePersons.filter((p) => p.role === 'assistant_researcher').map((p) => (
                  <SelectItem key={p.id} value={p.id} className="pl-8">
                    {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                  </SelectItem>
                )),
              ]}

              {/* 博士后 */}
              {activePersons.filter((p) => p.role === 'postdoc').length > 0 && [
                <SelectItem key="__postdoc" value="__postdoc" disabled>{ROLE_LABEL_MAP.postdoc}</SelectItem>,
                ...activePersons.filter((p) => p.role === 'postdoc').map((p) => (
                  <SelectItem key={p.id} value={p.id} className="pl-8">
                    {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                  </SelectItem>
                )),
              ]}

              {/* 博士生 - 按入学年级分组 */}
              {phdByYear.length > 0 && [
                <SelectItem key="__phd" value="__phd" disabled>{ROLE_LABEL_MAP.phd}</SelectItem>,
                ...phdByYear.flatMap(({ year, persons }) => [
                  <SelectItem key={`__phd_${year}`} value={`__phd_${year}`} disabled className="pl-8">{year}级</SelectItem>,
                  ...persons.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="pl-12">
                      {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                    </SelectItem>
                  )),
                ]),
              ]}

              {/* 本科生 */}
              {activePersons.filter((p) => p.role === 'undergraduate').length > 0 && [
                <SelectItem key="__undergraduate" value="__undergraduate" disabled>{ROLE_LABEL_MAP.undergraduate}</SelectItem>,
                ...activePersons.filter((p) => p.role === 'undergraduate').map((p) => (
                  <SelectItem key={p.id} value={p.id} className="pl-8">
                    {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                  </SelectItem>
                )),
              ]}

              {/* 访问学生 */}
              {activePersons.filter((p) => p.role === 'visitor').length > 0 && [
                <SelectItem key="__visitor" value="__visitor" disabled>{ROLE_LABEL_MAP.visitor}</SelectItem>,
                ...activePersons.filter((p) => p.role === 'visitor').map((p) => (
                  <SelectItem key={p.id} value={p.id} className="pl-8">
                    {p.name} - {(p.role === 'phd' || p.role === 'undergraduate') && p.subRole ? `${p.roleLabel}(${p.subRole})` : (p.subRole || p.roleLabel)}
                  </SelectItem>
                )),
              ]}
            </SelectContent>
          </Select>

          {/* 显示所有可用日期标签 */}
          {allLabels.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {allLabels.map((label) => (
                <span
                  key={label}
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    TREND_LABELS.includes(label)
                      ? 'bg-slate-100 text-slate-500'
                      : 'bg-cyan-100 text-cyan-700 font-medium'
                  }`}
                  title={TREND_LABELS.includes(label) ? '基线数据' : '上传数据'}
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {!selectedId || selectedId.startsWith('__') ? (
        <Card className="border-slate-200">
          <CardContent className="py-16 text-center">
            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">请从上方选择一位团队成员查看趋势数据</p>
          </CardContent>
        </Card>
      ) : trend ? (
        <TrendChart trend={trend} />
      ) : (
        <Card className="border-slate-200">
          <CardContent className="py-16 text-center">
            <p className="text-sm text-slate-500">该成员暂无趋势数据</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
