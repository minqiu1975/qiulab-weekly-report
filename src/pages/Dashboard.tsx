import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PersonStatusCard from '../components/PersonStatusCard';
import { MOCK_REPORTS, getPersonStatusChanges } from '../data/mockReports';
import { getUploadHistory } from '../lib/dynamicStorage';
import { usePersons } from '../hooks/usePersons';
import { ROLE_LABEL_MAP } from '../data/mockPersons';
import { MOCK_ASSESSMENTS } from '../data/mockAssessments';
import { getLatestWeekLabel, TREND_LABELS } from '../data/mockTrends';

import {
  Users,
  FileCheck,
  AlertTriangle,
  BarChart3,
  FileText,
  Sparkles,
  UserPlus,
  UserMinus,
  Printer,
  RefreshCw,
  FlaskConical,
  GraduationCap,
  BookOpen,
  UserCog,
  Microscope,
  Download,
  Upload,
} from 'lucide-react';
import { cloudStorage } from '../services/cloudStorage';

// PersonStatus 类型保留，供可能的后续功能使用

// 角色分布概览辅助函数
function getRoleDistribution(persons: ReturnType<typeof usePersons>) {
  const roleKeys = [
    'researcher',
    'associate_researcher',
    'assistant_researcher',
    'postdoc',
    'phd',
    'undergraduate',
    'visitor',
  ];
  return roleKeys
    .map((key) => ({
      key,
      label: ROLE_LABEL_MAP[key] || key,
      count: persons.filter((p) => p.role === key && p.status !== 'graduated' && p.status !== 'left' && p.status !== 'inactive').length,
    }))
    .filter((rs) => rs.count > 0);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const ALL_PERSONS = usePersons();
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [syncDetail, setSyncDetail] = useState('');
  const [importStatus, setImportStatus] = useState('');

  // 导出所有 QiuLab 数据为 JSON 文件
  const handleExport = () => {
    const data: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('qlab_')) {
        data[key] = localStorage.getItem(key) || '';
      }
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qiulab_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setImportStatus('数据已导出');
    setTimeout(() => setImportStatus(''), 3000);
  };

  // 从 JSON 文件导入数据
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as Record<string, string>;
        let count = 0;
        for (const [key, value] of Object.entries(data)) {
          if (key.startsWith('qlab_')) {
            // 合并策略：如果两边都有，取 timestamp 较新的
            const existing = localStorage.getItem(key);
            if (existing && (key.includes('trends') || key.includes('history'))) {
              try {
                const existingObj = JSON.parse(existing);
                const newObj = JSON.parse(value);
                const merged = { ...existingObj, ...newObj };
                localStorage.setItem(key, JSON.stringify(merged));
              } catch {
                localStorage.setItem(key, value);
              }
            } else {
              localStorage.setItem(key, value);
            }
            count++;
          }
        }
        setImportStatus(`导入完成：${count} 项数据已合并`);
        setTimeout(() => setImportStatus(''), 5000);
        // 刷新页面以应用新数据
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        setImportStatus(`导入失败：${err instanceof Error ? err.message : '文件格式错误'}`);
        setTimeout(() => setImportStatus(''), 5000);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // 允许重复导入同一文件
  };

  // 同步诊断：对比本地 vs 云端数据
  const handleSync = async () => {
    setSyncStatus('syncing');
    setSyncDetail('正在检查云端连接...');

    try {
      // 1. 获取本地数据摘要
      const localData = cloudStorage.loadFromLocal();
      const localTrends = localData.dynamic?.trends || {};
      const localWeeks = Object.keys(localTrends).sort();
      const localLatest = localWeeks.length > 0 ? localWeeks[localWeeks.length - 1] : '无';
      const localCount = localWeeks.length;
      setSyncDetail(`本地: ${localLatest} (${localCount}期) → 正在推送到云端...`);

      // 2. 推送本地数据到云端
      await cloudStorage.saveAllData(localData);
      setSyncDetail(`本地已推送 → 正在从云端拉取...`);

      // 3. 拉取云端数据并合并
      const merged = await cloudStorage.loadAllData();
      const mergedTrends = merged.dynamic?.trends || {};
      const mergedWeeks = Object.keys(mergedTrends).sort();
      const mergedLatest = mergedWeeks.length > 0 ? mergedWeeks[mergedWeeks.length - 1] : '无';
      const mergedCount = mergedWeeks.length;

      if (mergedLatest !== localLatest || mergedCount !== localCount) {
        setSyncDetail(`发现新数据！云端最新: ${mergedLatest} (${mergedCount}期) → 已合并`);
      } else {
        setSyncDetail(`同步完成。本地与云端一致: ${localLatest} (${localCount}期)`);
      }
      setSyncStatus('success');
      setTimeout(() => { setSyncStatus('idle'); setSyncDetail(''); }, 5000);
    } catch (e: any) {
      const msg = e instanceof Error ? e.message : String(e);
      setSyncDetail(`云端不可用(${msg})，请使用导出/导入同步`);
      setSyncStatus('error');
      setTimeout(() => { setSyncStatus('idle'); setSyncDetail(''); }, 8000);
    }
  };
  const activePeople = ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left');
  const totalPeople = activePeople.length;

  // 从动态数据（localStorage）读取最新一周实际上报情况
  // 使用 IIFE 而非 useMemo，确保每次渲染都读取最新数据（上传新周报后自动刷新）
  const latestDynamicStats = (() => {
    try {
      const dynTrends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}') as Record<string, Record<string, { progress: number; problems: number; characterTag: string; summary: string }>>;
      const latestWeek = getLatestWeekLabel();
      const weekData = dynTrends[latestWeek];
      if (!weekData || Object.keys(weekData).length === 0) {
        // 没有动态数据，回退到静态 MOCK
        return {
          submitted: new Set(MOCK_REPORTS.map((r) => r.personId)).size,
          problems: new Set(MOCK_ASSESSMENTS.filter((a) => a.riskLevel !== 'low').map((a) => a.personId)).size,
          avgProgress: MOCK_ASSESSMENTS.length > 0
            ? Math.round(MOCK_ASSESSMENTS.map((a) => a.progressAssessment.workloadScore).reduce((a, b) => a + b, 0) / MOCK_ASSESSMENTS.length)
            : 0,
        };
      }
      // 统计动态数据：characterTag !== '未提交' 表示实际提交了周报
      const trends = Object.values(weekData);
      const submitted = trends.filter((t) => t.characterTag !== '未提交').length;
      const problems = trends.filter((t) => t.problems > 0).length;
      const submittedTrends = trends.filter((t) => t.characterTag !== '未提交');
      const avgProgress = submittedTrends.length > 0
        ? Math.round(submittedTrends.map((t) => t.progress).reduce((a, b) => a + b, 0) / submittedTrends.length)
        : 0;
      return { submitted, problems, avgProgress };
    } catch {
      return { submitted: 0, problems: 0, avgProgress: 0 };
    }
  })();

  const submittedCount = latestDynamicStats.submitted;
  const problemCount = latestDynamicStats.problems;
  const avgWorkload = latestDynamicStats.avgProgress;

  const latestUploads = (() => {
    const history = getUploadHistory();
    if (history.length > 0) {
      return history.slice(0, 5);
    }
    // 无上传历史时显示空提示
    return [];
  })();

  const latestWeekLabel = getLatestWeekLabel();
  // 使用静态TREND_LABELS长度计算期数（避免动态标签中的重复/脏数据干扰）
  const latestWeekNumber = TREND_LABELS.length;

  const latestAssessments = [...MOCK_ASSESSMENTS]
    .filter((a) => a.weekNumber === latestWeekNumber)
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 3);

  // Person dynamics
  const currentWeekLabel = `2026年第${latestWeekNumber}期 (${latestWeekLabel})`;
  const statusChanges = getPersonStatusChanges(currentWeekLabel);
  const activePersons = ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left' && p.status !== 'inactive');

  // 从动态数据中读取最新一周的上报情况，找出未提交周报的人，同时收集有风险成员ID
  const { notSubmittedLastWeek, atRiskMembers } = (() => {
    try {
      const dynTrends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}') as Record<string, Record<string, { progress: number; problems: number; characterTag: string; summary: string }>>;
      const latestWeek = getLatestWeekLabel();
      const weekData = dynTrends[latestWeek];
      if (!weekData || Object.keys(weekData).length === 0) {
        return { notSubmittedLastWeek: [] as Array<{ id: string; name: string }>, atRiskMembers: [] as string[] };
      }
      // 找出 active 成员中未提交的人
      const notSubmitted: Array<{ id: string; name: string }> = [];
      const atRisk: string[] = [];
      for (const person of activePersons) {
        const personTrend = weekData[person.id] || weekData[person.name];
        if (personTrend && personTrend.characterTag === '未提交') {
          notSubmitted.push({ id: person.id, name: person.name });
        }
        if (personTrend && personTrend.problems > 0) {
          atRisk.push(person.id);
        }
      }
      return { notSubmittedLastWeek: notSubmitted, atRiskMembers: atRisk };
    } catch { return { notSubmittedLastWeek: [] as Array<{ id: string; name: string }>, atRiskMembers: [] as string[] }; }
  })();
  const newCount = statusChanges.filter((s) => s.type === 'new').length;
  const leftCount = statusChanges.filter((s) => s.type === 'left').length;


  const stats = [
    { label: '活跃成员总数', value: totalPeople, icon: Users, color: 'text-blue-600', bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', ring: 'ring-blue-100', href: '' as string },
    { label: '本周上报人数', value: submittedCount, icon: FileCheck, color: 'text-emerald-600', bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', ring: 'ring-emerald-100', href: '' as string },
    { label: '需关注人数', value: problemCount, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-gradient-to-br from-orange-500 to-red-600', ring: 'ring-red-100', href: atRiskMembers.length > 0 ? `/analysis?filter=risk&riskIds=${atRiskMembers.join(',')}` : '' as string },
    { label: '平均工作量评分', value: avgWorkload, icon: BarChart3, color: 'text-cyan-600', bg: 'bg-gradient-to-br from-cyan-500 to-blue-600', ring: 'ring-cyan-100', href: '' as string },
  ];

  // 角色分组统计（排除 inactive）
  const roleStats = useMemo(() => getRoleDistribution(ALL_PERSONS), [ALL_PERSONS]);

  // 角色分布图标和颜色配置
  const ROLE_VISUALS: Record<string, { icon: typeof FlaskConical; gradient: string; ring: string }> = {
    researcher: { icon: FlaskConical, gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600', ring: 'ring-cyan-100' },
    associate_researcher: { icon: Microscope, gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600', ring: 'ring-teal-100' },
    assistant_researcher: { icon: FlaskConical, gradient: 'bg-gradient-to-br from-sky-500 to-blue-600', ring: 'ring-sky-100' },
    postdoc: { icon: Microscope, gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600', ring: 'ring-indigo-100' },
    phd: { icon: GraduationCap, gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600', ring: 'ring-emerald-100' },
    undergraduate: { icon: BookOpen, gradient: 'bg-gradient-to-br from-amber-500 to-orange-600', ring: 'ring-amber-100' },
    visitor: { icon: UserCog, gradient: 'bg-gradient-to-br from-violet-500 to-purple-600', ring: 'ring-violet-100' },
  };

  const statusConfig = {
    completed: { label: '已完成', className: 'bg-emerald-100 text-emerald-700' },
    parsing: { label: '解析中', className: 'bg-cyan-100 text-cyan-700' },
    pending: { label: '待处理', className: 'bg-slate-100 text-slate-600' },
    error: { label: '失败', className: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-0.5">团队概况 · 第{latestWeekNumber}期 ({latestWeekLabel})</p>
        </div>
        <div className="flex items-center gap-2 relative">
          <div className="flex flex-col items-end">
            <button
              onClick={handleSync}
              disabled={syncStatus === 'syncing'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                syncStatus === 'success' ? 'bg-emerald-100 text-emerald-700' :
                syncStatus === 'error' ? 'bg-red-100 text-red-700' :
                syncStatus === 'syncing' ? 'bg-amber-100 text-amber-700' :
                'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              {syncStatus === 'syncing' ? '同步中...' :
               syncStatus === 'success' ? '已同步' :
               syncStatus === 'error' ? '同步失败' :
               '同步数据'}
            </button>
            {syncDetail && (
              <span className={`text-[10px] mt-1 max-w-[200px] text-right leading-tight ${
                syncStatus === 'error' ? 'text-red-500' :
                syncStatus === 'success' ? 'text-emerald-600' :
                'text-amber-600'
              }`}>{syncDetail}</span>
            )}
          </div>
          <button
            onClick={() => navigate('/pdf-report')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            生成全组PDF报告
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors"
            title="导出所有周报数据到 JSON 文件，可在其他浏览器导入"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
          <div className="relative">
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors cursor-pointer"
              title="从 JSON 文件导入周报数据"
            >
              <Upload className="w-4 h-4" />
              导入
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            {importStatus && <span className="text-[10px] text-slate-500 absolute left-0 -bottom-5 whitespace-nowrap">{importStatus}</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          const isClickable = s.href && s.href.length > 0;
          const cardContent = (
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center shadow-md ring-2 ${s.ring} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{s.value}</div>
                  <div className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors">{s.label}</div>
                </div>
              </div>
            </CardContent>
          );
          if (isClickable) {
            return (
              <Card key={s.label} className="border-slate-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer" onClick={() => navigate(s.href)}>
                {cardContent}
              </Card>
            );
          }
          return (
            <Card key={s.label} className="border-slate-200/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group cursor-default">
              {cardContent}
            </Card>
          );
        })}
      </div>

      {/* 角色分布概览 */}
      {roleStats.length > 0 && (
        <Card className="border-slate-200">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
              <Users className="w-4 h-4 text-blue-600" />
              角色分布
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {roleStats.map((rs) => {
                const visual = ROLE_VISUALS[rs.key];
                const RoleIcon = visual?.icon || Users;
                return (
                  <div
                    key={rs.key}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-default"
                  >
                    <div className={`w-9 h-9 rounded-lg ${visual?.gradient || 'bg-gradient-to-br from-slate-400 to-slate-600'} flex items-center justify-center shadow-sm ring-2 ${visual?.ring || 'ring-slate-100'} group-hover:scale-110 transition-transform duration-300 mb-2`}>
                      <RoleIcon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors">{rs.count}</span>
                    <span className="text-xs text-slate-500 mt-0.5">{rs.label}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 人员动态区域 */}
      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <UserPlus className="w-4 h-4 text-cyan-600" />
            人员动态（本周）
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {newCount > 0 && (
              <Badge className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1">
                <UserPlus className="w-3 h-3 mr-1" />本周新入 {newCount} 人
              </Badge>
            )}
            {leftCount > 0 && (
              <Badge className="bg-slate-200 text-slate-600 text-xs px-2 py-1">
                <UserMinus className="w-3 h-3 mr-1" />已毕业/离职 {leftCount} 人
              </Badge>
            )}

            {statusChanges.length === 0 && (
              <span className="text-xs text-slate-500">本周无人员状态变动</span>
            )}
          </div>

          {statusChanges.length > 0 && (
            <div className="mb-3 space-y-1.5">
              {statusChanges.map((change, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-slate-700">{change.name}</span>
                  <span className="text-xs text-slate-500">
                    {change.type === 'new' && '新加入团队'}
                    {change.type === 'left' && '已毕业/离职'}
                    {change.type === 'returned' && '已返回团队'}
                  </span>
                  {change.previousWeek && (
                    <span className="text-[10px] text-slate-400">（上周：{change.previousWeek}）</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {notSubmittedLastWeek.length > 0 && (
            <div className="border-t border-slate-100 pt-3">
              <div className="text-xs font-medium text-orange-600 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                本周未提交周报成员（{notSubmittedLastWeek.length}人）
              </div>
              <div className="flex flex-wrap gap-2">
                {notSubmittedLastWeek.map((p) => (
                  <Badge
                    key={p.id}
                    variant="outline"
                    className="text-orange-600 border-orange-300 bg-orange-50 text-[11px] px-2 py-0.5 flex items-center gap-1"
                  >
                    <AlertTriangle className="w-3 h-3 text-orange-500" />
                    {p.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-slate-200">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm font-semibold text-slate-800">人员状态总览</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {activePersons.map((person) => (
                  <PersonStatusCard
                    key={person.id}
                    person={person}
                    onClick={(p) => navigate(`/analysis?person=${p.id}`)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                <FileText className="w-4 h-4 text-cyan-600" />
                最近上传文件
              </CardTitle>
              <button
                onClick={() => navigate('/upload')}
                className="text-xs text-cyan-600 hover:text-cyan-700"
              >
                查看全部
              </button>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2">
                {latestUploads.map((u) => {
                  const sc = statusConfig[u.status] || statusConfig.pending;
                  return (
                    <div key={u.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="text-sm text-slate-700 truncate">{u.fileName}</span>
                      </div>
                      <Badge className={`${sc.className} text-[10px]`}>{sc.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-slate-200">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI研判摘要
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-3">
              {latestAssessments.length === 0 && (
                <div className="text-center py-6">
                  <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm text-slate-400">暂无 AI 研判数据</p>
                  <p className="text-xs text-slate-400 mt-1">上传周报并分析后将在此显示</p>
                </div>
              )}
              {latestAssessments.map((a) => {
                const rc =
                  a.riskLevel === 'high'
                    ? 'text-red-600 bg-red-50'
                    : a.riskLevel === 'medium'
                    ? 'text-amber-600 bg-amber-50'
                    : 'text-emerald-600 bg-emerald-50';
                return (
                  <div
                    key={a.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-cyan-200 transition-colors cursor-pointer"
                    onClick={() => navigate(`/analysis?person=${a.personId}`)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-slate-800">{a.personName}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${rc}`}>
                          {a.riskLevel === 'high' ? '高风险' : a.riskLevel === 'medium' ? '中风险' : '低风险'}
                        </span>
                        <span className="text-xs font-bold text-cyan-700">{a.overallScore}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{a.summary}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
