import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import PersonStatusCard from '../components/PersonStatusCard';
import ExportButton from '../components/ExportButton';
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
  FileDown,
  Printer,
  RefreshCw,
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

  const handleSync = async () => {
    setSyncStatus('syncing');
    try {
      await cloudStorage.loadAllData();
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (e) {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
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
  const latestWeekNumber = TREND_LABELS.length;

  const latestAssessments = [...MOCK_ASSESSMENTS]
    .filter((a) => a.weekNumber === latestWeekNumber)
    .sort((a, b) => b.overallScore - a.overallScore)
    .slice(0, 3);

  // Person dynamics
  const currentWeekLabel = `2026年第${latestWeekNumber}期 (${latestWeekLabel})`;
  const statusChanges = getPersonStatusChanges(currentWeekLabel);
  const activePersons = ALL_PERSONS.filter((p) => p.status !== 'graduated' && p.status !== 'left' && p.status !== 'inactive');

  // 从动态数据中读取最新一周的上报情况，找出未提交周报的人
  const notSubmittedLastWeek = (() => {
    try {
      const dynTrends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}') as Record<string, Record<string, { progress: number; problems: number; characterTag: string; summary: string }>>;
      const latestWeek = getLatestWeekLabel();
      const weekData = dynTrends[latestWeek];
      if (!weekData || Object.keys(weekData).length === 0) return [];
      // 找出 active 成员中未提交的人
      const notSubmitted: Array<{ id: string; name: string }> = [];
      for (const person of activePersons) {
        const personTrend = weekData[person.id] || weekData[person.name];
        if (personTrend && personTrend.characterTag === '未提交') {
          notSubmitted.push({ id: person.id, name: person.name });
        }
      }
      return notSubmitted;
    } catch { return []; }
  })();
  const newCount = statusChanges.filter((s) => s.type === 'new').length;
  const leftCount = statusChanges.filter((s) => s.type === 'left').length;
  const sickCount = statusChanges.filter((s) => s.type === 'sick').length;
  const tripCount = statusChanges.filter((s) => s.type === 'business_trip').length;
  const vacationCount = statusChanges.filter((s) => s.type === 'vacation').length;

  const stats = [
    { label: '活跃成员总数', value: totalPeople, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: '本周上报人数', value: submittedCount, icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: '需关注人数', value: problemCount, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50' },
    { label: '平均工作量评分', value: avgWorkload, icon: BarChart3, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  ];

  // 角色分组统计（排除 inactive）
  const roleStats = useMemo(() => getRoleDistribution(ALL_PERSONS), [ALL_PERSONS]);

  const statusConfig = {
    completed: { label: '已完成', className: 'bg-emerald-100 text-emerald-700' },
    parsing: { label: '解析中', className: 'bg-cyan-100 text-cyan-700' },
    pending: { label: '待处理', className: 'bg-slate-100 text-slate-600' },
    error: { label: '失败', className: 'bg-red-100 text-red-700' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800">Dashboard</h1>
        <div className="flex items-center gap-2">
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
          <button
            onClick={() => navigate('/pdf-report')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-800 text-white text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Printer className="w-4 h-4" />
            生成全组PDF报告
          </button>
          <ExportButton label="导出数据" fileName="dashboard-data.json" data={{ stats, timestamp: new Date().toISOString() }} />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-slate-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${s.color}`} />
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
              {roleStats.map((rs) => (
                <div
                  key={rs.key}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <span className="text-xl font-bold text-slate-800">{rs.count}</span>
                  <span className="text-xs text-slate-500 mt-1">{rs.label}</span>
                </div>
              ))}
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
            {sickCount > 0 && (
              <Badge className="bg-red-100 text-red-700 text-xs px-2 py-1">
                <AlertTriangle className="w-3 h-3 mr-1" />生病请假 {sickCount} 人
              </Badge>
            )}
            {tripCount > 0 && (
              <Badge className="bg-blue-100 text-blue-700 text-xs px-2 py-1">
                <FileDown className="w-3 h-3 mr-1" />出差 {tripCount} 人
              </Badge>
            )}
            {vacationCount > 0 && (
              <Badge className="bg-orange-100 text-orange-700 text-xs px-2 py-1">
                休假 {vacationCount} 人
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
                    {change.type === 'sick' && '生病请假中'}
                    {change.type === 'vacation' && '休假中'}
                    {change.type === 'business_trip' && '出差中'}
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
