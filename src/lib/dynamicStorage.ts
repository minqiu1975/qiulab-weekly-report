/**
 * QLab-WID 动态数据存储系统
 *
 * 存储用户上传周报后生成的动态趋势数据和历史摘要。
 * 与静态基线数据（mockTrends.ts, mockAssessments.ts）合并后展示。
 *
 * localStorage keys:
 * - qlab_dynamic_trends: 动态趋势数据（每人每期的progress/problems/tag/summary）
 * - qlab_dynamic_history: 动态历史摘要（每人每期的summary）
 * - qlab_dynamic_labels: 动态日期标签列表（去重排序）
 */

import type { WeekTrend } from '../data/mockTrends';
import { getPersonById } from '../data/mockPersons';
import type { DeepAnalysisData } from '../services/cloudStorage';

const KEYS = {
  TRENDS: 'qlab_dynamic_trends',
  HISTORY: 'qlab_dynamic_history',
  LABELS: 'qlab_dynamic_labels',
  UPLOADED_DATES: 'qlab_uploaded_dates',
  DEEP_ANALYSES: 'qlab_deep_analyses',
  UPLOAD_HISTORY: 'qlab_uploads',  // 与云端同步统一 key
};

// ─── 类型定义 ───

export interface DynamicTrends {
  [weekDate: string]: {
    [personId: string]: WeekTrend;
  };
}

export interface DynamicHistory {
  [personName: string]: {
    [weekDate: string]: string; // summary
  };
}

// ─── 辅助函数 ───

function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function lsSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[DynamicStorage] Failed to save ${key}:`, e);
  }
}

// ─── 日期标签管理 ───

/** 获取所有已上传的周报日期标签（含静态基线 + 动态上传），按时间排序 */
export function getAllWeekLabels(staticLabels: string[]): string[] {
  const dynamicLabels = lsGet<string[]>(KEYS.LABELS, []);
  const all = Array.from(new Set([...staticLabels, ...dynamicLabels]));
  // 按日期排序: 2026.02.12 < 2026.03.06 < 2026.05.09
  all.sort((a, b) => {
    const parse = (s: string) => {
      const [y, m, d] = s.split('.').map(Number);
      return y * 10000 + m * 100 + d;
    };
    return parse(a) - parse(b);
  });
  return all;
}

/** 添加新的周报日期标签 */
export function addWeekLabel(weekDate: string): void {
  const labels = lsGet<string[]>(KEYS.LABELS, []);
  if (!labels.includes(weekDate)) {
    labels.push(weekDate);
    labels.sort((a, b) => {
      const parse = (s: string) => {
        const [y, m, d] = s.split('.').map(Number);
        return y * 10000 + m * 100 + d;
      };
      return parse(a) - parse(b);
    });
    lsSet(KEYS.LABELS, labels);
  }
}

// ─── 动态趋势数据管理 ───

/** 保存一批趋势数据（上传一个周报日期后调用） */
export function saveDynamicTrends(
  weekDate: string,
  personTrends: Record<string, WeekTrend>
): void {
  const all = lsGet<DynamicTrends>(KEYS.TRENDS, {});
  all[weekDate] = personTrends;
  lsSet(KEYS.TRENDS, all);
  addWeekLabel(weekDate);
}

/** 获取某人的完整趋势数据（静态 + 动态合并） */
export function getMergedPersonTrend(
  personId: string,
  staticLabels: string[],
  getStaticTrend: (personId: string, weekIdx: number) => WeekTrend | undefined
): { labels: string[]; trends: WeekTrend[] } {
  const allLabels = getAllWeekLabels(staticLabels);
  const dynamicTrends = lsGet<DynamicTrends>(KEYS.TRENDS, {});

  const trends: WeekTrend[] = [];
  // 同时尝试 personId 和人名（兼容两种保存方式）
  const personName = getPersonById(personId)?.name;
  for (const label of allLabels) {
    // 优先使用动态数据（用户上传的），回退到静态基线
    const dynamicWeek = dynamicTrends[label];
    const dynamicTrend = dynamicWeek?.[personId] ?? (personName ? dynamicWeek?.[personName] : undefined);
    if (dynamicTrend) {
      trends.push(dynamicTrend);
    } else {
      const staticIdx = staticLabels.indexOf(label);
      if (staticIdx >= 0) {
        const staticTrend = getStaticTrend(personId, staticIdx);
        // 静态基线数据可能存在缺口（标签多、数据点少），用占位填充以保持图表连续性
        trends.push(
          staticTrend ?? {
            progress: 70,
            problems: 0,
            characterTag: '持续推进',
            summary: '持续推进科研工作',
          }
        );
      }
    }
  }

  return { labels: allLabels, trends };
}

// ─── 动态历史摘要管理 ───

/** 保存一批历史摘要（上传一个周报日期后调用） */
export function saveDynamicHistory(
  weekDate: string,
  personSummaries: Record<string, string>
): void {
  const all = lsGet<DynamicHistory>(KEYS.HISTORY, {});
  for (const [name, summary] of Object.entries(personSummaries)) {
    if (!all[name]) all[name] = {};
    all[name][weekDate] = summary;
  }
  lsSet(KEYS.HISTORY, all);
  addWeekLabel(weekDate);
}

/** 获取某人的历史摘要（静态 + 动态合并），最新在前
 * @param personName 人名（用于静态数据匹配）
 * @param staticHistory 静态历史数据
 * @param personId 成员ID（用于动态数据匹配，因为动态数据保存时用的是 personId）
 */
export function getMergedPersonHistory(
  personName: string,
  staticHistory: { week: string; summary: string }[],
  personId?: string
): { week: string; summary: string }[] {
  const dynamicHistory = lsGet<DynamicHistory>(KEYS.HISTORY, {});
  // 动态数据保存时用的是 personId，读取时同时尝试 personId 和人名
  const personDynamic = dynamicHistory[personId || ''] || dynamicHistory[personName] || {};

  // 合并静态和动态数据
  const mergedMap = new Map<string, string>();

  // 先放入静态数据
  for (const h of staticHistory) {
    mergedMap.set(h.week, h.summary);
  }

  // 动态数据覆盖（用户上传的更及时）
  for (const [week, summary] of Object.entries(personDynamic)) {
    mergedMap.set(week, summary);
  }

  // 转为数组，按日期倒序（最新在前）
  const result = Array.from(mergedMap.entries())
    .map(([week, summary]) => ({ week, summary }))
    .sort((a, b) => {
      const parse = (s: string) => {
        const [y, m, d] = s.split('.').map(Number);
        return y * 10000 + m * 100 + d;
      };
      return parse(b.week) - parse(a.week);
    });

  return result;
}

// ─── 上传日期追踪 ───

/** 获取已上传的日期列表 */
export function getUploadedDates(): string[] {
  return lsGet<string[]>(KEYS.UPLOADED_DATES, []);
}

/** 添加已上传日期 */
export function addUploadedDate(weekDate: string): void {
  const dates = getUploadedDates();
  if (!dates.includes(weekDate)) {
    dates.push(weekDate);
    lsSet(KEYS.UPLOADED_DATES, dates);
  }
}

/** 检查日期是否已上传 */
export function isDateUploaded(weekDate: string): boolean {
  return getUploadedDates().includes(weekDate);
}

// ─── 深度分析结果存储 ───

/** 保存某个成员的深度分析结果 */
export function saveDeepAnalysis(data: DeepAnalysisData): void {
  const all = lsGet<Record<string, DeepAnalysisData>>(KEYS.DEEP_ANALYSES, {});
  all[data.personId] = data;
  lsSet(KEYS.DEEP_ANALYSES, all);
  // 同时更新 lastModified 以便云端同步能检测到变化
  localStorage.setItem('qlab_last_modified', new Date().toISOString());
}

/** 获取某个成员的深度分析结果 */
export function getDeepAnalysis(personId: string): DeepAnalysisData | null {
  const all = lsGet<Record<string, DeepAnalysisData>>(KEYS.DEEP_ANALYSES, {});
  return all[personId] || null;
}

/** 获取所有已保存的深度分析结果 */
export function getAllDeepAnalyses(): Record<string, DeepAnalysisData> {
  return lsGet<Record<string, DeepAnalysisData>>(KEYS.DEEP_ANALYSES, {});
}

/** 删除某个成员的深度分析结果 */
export function removeDeepAnalysis(personId: string): void {
  const all = lsGet<Record<string, DeepAnalysisData>>(KEYS.DEEP_ANALYSES, {});
  delete all[personId];
  lsSet(KEYS.DEEP_ANALYSES, all);
  localStorage.setItem('qlab_last_modified', new Date().toISOString());
}

// ─── 清理 ───

/** 上传历史记录 */
export interface UploadRecord {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  status: 'completed' | 'error' | 'pending';
  weekDate: string;
}

/** 添加上传历史记录 */
export function addUploadHistory(record: UploadRecord): void {
  const all = lsGet<UploadRecord[]>(KEYS.UPLOAD_HISTORY, []);
  // 避免重复添加同一文件
  const exists = all.find(u => u.fileName === record.fileName && u.weekDate === record.weekDate);
  if (!exists) {
    all.unshift(record); // 最新在前
    lsSet(KEYS.UPLOAD_HISTORY, all);
  }
}

/** 获取上传历史记录 */
export function getUploadHistory(): UploadRecord[] {
  return lsGet<UploadRecord[]>(KEYS.UPLOAD_HISTORY, []);
}

/** 清除所有动态数据（谨慎使用） */
export function clearAllDynamicData(): void {
  localStorage.removeItem(KEYS.TRENDS);
  localStorage.removeItem(KEYS.HISTORY);
  localStorage.removeItem(KEYS.LABELS);
  localStorage.removeItem(KEYS.UPLOADED_DATES);
  localStorage.removeItem(KEYS.DEEP_ANALYSES);
  localStorage.removeItem(KEYS.UPLOAD_HISTORY);
}
