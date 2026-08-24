/**
 * QiuLab-WID 统一云端存储服务 - 多Provider架构
 * 
 * 支持多种云端存储Provider，实现跨设备数据同步：
 * 1. localStorage 模式（默认）- 数据保存在浏览器本地
 * 2. Supabase 云端模式 - PostgreSQL后端，免费额度充足
 * 3. 通用REST API 模式 - 适配任何HTTP后端（阿里云、百度云等）
 * 
 * 切换方式：在设置页面选择Provider并输入配置信息
 */

import type { Person } from '../types';

// ==================== 类型定义 ====================

export type CloudProviderType = 'supabase' | 'rest_api' | 'gist';

/** 深度分析结果数据 */
export interface DeepAnalysisData {
  personId: string;
  personName: string;
  analysisDate: string;  // ISO date string
  model: string;         // e.g. "kimi-k2.6"
  researchProgress: string;
  researchHotspots: string[];
  suggestedDirections: {
    title: string;
    description: string;
    feasibility: string;
    timeline: string;
  }[];
  riskAssessment: string;
  overallAdvice: string;
  inputTokens?: number;
  outputTokens?: number;
}

/** 动态周报趋势数据（与 dynamicStorage.ts 对应） */
export interface DynamicWeekData {
  trends: Record<string, Record<string, unknown>>;  // weekDate -> personId -> WeekTrend
  history: Record<string, Record<string, string>>;   // personName -> weekDate -> summary
  labels: string[];                                   // 日期标签列表
  uploadedDates: string[];                            // 已上传日期
  deepAnalyses: Record<string, DeepAnalysisData>;     // personId -> DeepAnalysisData
}

export interface AppData {
  persons: Person[];
  weekData: StoredWeekData[];
  uploads: UploadRecord[];
  dynamic: DynamicWeekData;  // 动态周报数据（跨设备同步核心）
  version: string;
  lastSync: string;
  lastModified: string;  // 数据最后修改时间 ISO 字符串，用于判断哪个终端数据最新
}

export interface StoredWeekData {
  weekDate: string;
  weekLabel: string;
  personData: Record<string, unknown>;
  uploadDate: string;
}

export interface UploadRecord {
  id: string;
  fileName: string;
  weekDate: string;
  uploadDate: string;
  status: string;
}

export interface ProviderConfig {
  type: CloudProviderType;
  name: string;       // 用户自定义名称，如"我的Supabase"
}

export interface SupabaseConfig extends ProviderConfig {
  type: 'supabase';
  url?: string;       // 可选，为空时使用内置配置
  anonKey?: string;   // 可选，为空时使用内置配置
  rlsSecret?: string; // 可选 RLS 共享密钥，用于纯前端 RLS 策略验证
}

export interface RestApiConfig extends ProviderConfig {
  type: 'rest_api';
  baseUrl: string;      // API基础URL，如 https://my-api.example.com
  apiKey: string;       // API密钥/Token
  getEndpoint?: string;  // 读取数据端点，默认 /qlab/data
  saveEndpoint?: string; // 保存数据端点，默认 /qlab/data
}

/** GitHub Gist 配置 - 使用 Personal Access Token */
export interface GistConfig extends ProviderConfig {
  type: 'gist';
  name: string;
  token: string;
  gistId?: string;
  public?: boolean;
}

export type ProviderConfigs = SupabaseConfig | RestApiConfig | GistConfig;

// ==================== 内置配置 ====================

/** 内置 Supabase 配置 - qlab-sync 项目 */
export const SUPABASE_BUILTIN = {
  url: 'https://avwunqxtcidgdwwfhnlk.supabase.co',
  anonKey: 'sb_publishable_vORN-snY_J6cxlHM7Clqzg_Zb5vddYf',
  // RLS 共享密钥：在 Supabase Dashboard 的 qlab_data 表策略中引用
  // 用于纯前端应用的 RLS 策略验证（替代用户认证）
  rlsSecret: 'qlab-rls-2026-secure-key',
} as const;

// ==================== Provider 接口 ====================

interface CloudProvider {
  getAllData(): Promise<AppData | null>;
  saveAllData(data: AppData): Promise<void>;
  testConnection(): Promise<{ ok: boolean; message: string }>;
}

// ==================== localStorage Provider ====================

// 这些 key 必须与 dynamicStorage.ts 中的 KEYS 保持一致
// v5: 强制清除所有旧缓存，使用与 ALL_PERSONS 完全一致的 ID
const LS_KEYS = {
  PERSONS: 'qlab_persons_v5',
  WEEK_DATA: 'qlab_week_data',
  UPLOADS: 'qlab_uploads',
  SETTINGS: 'qlab_settings',
  SYNC_CONFIG: 'qlab_sync_config',
  PROVIDER_CONFIG: 'qlab_provider_config',
  // 动态周报数据（与 dynamicStorage.ts 同步）
  DYN_TRENDS: 'qlab_dynamic_trends',
  DYN_HISTORY: 'qlab_dynamic_history',
  DYN_LABELS: 'qlab_dynamic_labels',
  DYN_UPLOADED: 'qlab_uploaded_dates',
  DYN_DEEP_ANALYSES: 'qlab_deep_analyses',
  UPLOAD_HISTORY: 'qlab_upload_history',
};

export function lsGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function lsSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`[CloudStorage] Failed to save ${key}:`, e);
  }
}

// ==================== Supabase REST API Provider ====================

class SupabaseProvider implements CloudProvider {
  private url: string;
  private key: string;
  private rlsSecret: string;
  private table = 'qlab_data';

  constructor(config?: SupabaseConfig) {
    this.url = (config?.url || SUPABASE_BUILTIN.url).replace(/\/$/, '');
    this.key = config?.anonKey || SUPABASE_BUILTIN.anonKey;
    this.rlsSecret = config?.rlsSecret || SUPABASE_BUILTIN.rlsSecret;
  }

  private async request(method: string, path: string, body?: unknown): Promise<unknown> {
    const headers: Record<string, string> = {
      apikey: this.key,
      Authorization: `Bearer ${this.key}`,
      // RLS 共享密钥：纯前端应用通过自定义 Header 验证身份
      // 对应 Supabase Dashboard 中 qlab_data 表的 RLS 策略条件
      'X-QiuLab-Secret': this.rlsSecret,
    };
    // GET/HEAD 请求不需要 Content-Type 和 Prefer
    if (method !== 'GET' && method !== 'HEAD') {
      headers['Content-Type'] = 'application/json';
      headers.Prefer = 'return=representation';
    }

    const res = await fetch(`${this.url}/rest/v1/${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Supabase ${method} ${path} failed: ${res.status} ${text}`);
    }

    return res.json();
  }

  async getAllData(): Promise<AppData | null> {
    try {
      const rows = await this.request('GET', `${this.table}?select=*&order=created_at.desc&limit=1`) as Array<{ data: AppData }>;
      return rows.length > 0 ? rows[0].data : null;
    } catch (e) {
      console.error('[Supabase] getAllData error:', e);
      return null;
    }
  }

  async saveAllData(data: AppData): Promise<void> {
    try {
      // 查询最新记录（与 getAllData 使用相同的 order，确保操作同一条记录）
      const existing = await this.request('GET', `${this.table}?select=id&order=created_at.desc&limit=1`) as Array<{ id: number }>;
      if (existing.length > 0) {
        // Update: 用数字 id
        const numId = existing[0].id;
        await this.request('PATCH', `${this.table}?id=eq.${numId}`, {
          data,
          updated_at: new Date().toISOString(),
        });
      } else {
        // Insert: 不传 id，让 Supabase 自动生成 bigint
        await this.request('POST', this.table, {
          data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      }
    } catch (e) {
      console.error('[Supabase] saveAllData error:', e);
      throw e;
    }
  }

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    try {
      await this.request('GET', `${this.table}?select=count&limit=0`);
      return { ok: true, message: '云端连接成功' };
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : '连接失败',
      };
    }
  }
}

class RestApiProvider implements CloudProvider {
  private baseUrl: string;
  private apiKey: string;
  private getEndpoint: string;
  private saveEndpoint: string;

  constructor(config: RestApiConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.apiKey = config.apiKey;
    this.getEndpoint = config.getEndpoint || '/qlab/data';
    this.saveEndpoint = config.saveEndpoint || '/qlab/data';
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      'X-QiuLab-Version': '1.0',
    };
  }

  async getAllData(): Promise<AppData | null> {
    try {
      const res = await fetch(`${this.baseUrl}${this.getEndpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`REST API GET failed: ${res.status}`);
      }
      const json = await res.json();
      // 支持两种响应格式：直接返回数据 或 包裹在 data 字段中
      return (json.data || json) as AppData;
    } catch (e) {
      console.error('[RestApi] getAllData error:', e);
      return null;
    }
  }

  async saveAllData(data: AppData): Promise<void> {
    try {
      const res = await fetch(`${this.baseUrl}${this.saveEndpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`REST API POST failed: ${res.status}`);
      }
    } catch (e) {
      console.error('[RestApi] saveAllData error:', e);
      throw e;
    }
  }

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    try {
      const res = await fetch(`${this.baseUrl}${this.getEndpoint}`, {
        method: 'HEAD',
        headers: this.getHeaders(),
      });
      if (res.ok || res.status === 404) {
        return { ok: true, message: 'REST API 连接成功' };
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (e) {
      return {
        ok: false,
        message: e instanceof Error ? e.message : '连接失败',
      };
    }
  }
}

// ==================== GitHub Gist Provider ====================

// GitHub Gist 候选数据结构
export interface GistCandidate {
  id: string;
  lastUploadDate: string;      // 最新周报实际日期（最可靠指标）
  personCount: number;
  uploadCount: number;
  lastModified: string;        // Gist 文件更新时间
}

/**
 * 计算 Gist 数据的新鲜度分数。
 *
 * 策略（按优先级）：
 * 1. 最新周报日期 — 直接比较 uploads[].date 的最大值
 * 2. 人员数量 — 新数据通常人员更多（访问学生加入等）
 * 3. 上传记录数 — 更多上传意味着更完整的历史
 * 4. 最后修改时间 — 仅作为兜底
 */
function getLatestUploadDate(uploads: UploadRecord[]): string {
  if (!uploads || uploads.length === 0) return '1970-01-01';
  return uploads
    .map(u => u.weekDate || u.uploadDate || '1970-01-01')
    .sort((a, b) => b.localeCompare(a))[0];
}

function compareFreshness(a: GistCandidate, b: GistCandidate): number {
  // 1. 最新周报日期（决定性指标）
  const dateCompare = b.lastUploadDate.localeCompare(a.lastUploadDate);
  if (dateCompare !== 0) return dateCompare;

  // 2. 人员数量（辅助指标）
  if (b.personCount !== a.personCount) return b.personCount - a.personCount;

  // 3. 上传记录数（辅助指标）
  if (b.uploadCount !== a.uploadCount) return b.uploadCount - a.uploadCount;

  // 4. 最后修改时间（兜底）
  return b.lastModified.localeCompare(a.lastModified);
}

class GistProvider implements CloudProvider {
  private token: string;
  private gistId: string | null;
  private filename: string;
  private description: string;
  private isPublic: boolean;
  private readonly GIST_API = 'https://api.github.com/gists';

  constructor(config: GistConfig) {
    this.token = config.token;
    this.gistId = config.gistId || null;
    this.filename = 'qlab-data.json';
    this.description = config.name || 'QiuLab Weekly Report Data';
    this.isPublic = config.public ?? false;
  }

  private async api(method: string, path: string, body?: object): Promise<any> {
    const url = path.startsWith('http') ? path : `${this.GIST_API}${path}`;
    const res = await fetch(url, {
      method,
      headers: {
        'Authorization': `token ${this.token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'qiulab-weekly-report',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.message || err.error || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return res.json();
  }

  /**
   * 跨设备同步核心方法：打开即同步
   *
   * 自动判断并切换到数据真正最新的 Gist：
   * 1. 扫描用户名下所有包含 qlab-data.json 的 Gist
   * 2. 读取每个 Gist 的实际内容
   * 3. 按「最新周报日期 → 人员数 → 上传数 → 修改时间」排序
   * 4. 自动切换到数据最新的那个（无需用户手动选择）
   *
   * 这意味着：不管你在哪台电脑、哪个地点推送的数据，
   * 打开网站就会自动汇聚到最新的那份数据。
   */
  async resolveGistId(force = false): Promise<{
    switched: boolean;
    gistId: string | null;
    message: string;
    candidates: GistCandidate[];
  }> {
    // 1. 先尝试从本地配置恢复 gistId（同一浏览器快速路径）
    const raw = localStorage.getItem(LS_KEYS.PROVIDER_CONFIG);
    const localGistId = raw ? (JSON.parse(raw) as GistConfig).gistId : undefined;

    if (!force) {
      if (this.gistId) {
        return { switched: false, gistId: this.gistId, message: '使用当前 Gist', candidates: [] };
      }
      if (localGistId) {
        this.gistId = localGistId;
        return { switched: false, gistId: localGistId, message: '从本地配置恢复 Gist', candidates: [] };
      }
    }

    try {
      // 2. 调用 GitHub API 列出用户的所有 Gist
      const gists: Array<{ id: string; description: string; files: Record<string, { raw_url?: string }> }> =
        await this.api('GET', '?per_page=100');

      // 3. 筛选出包含 qlab-data.json 的 Gist
      const candidates = gists.filter(g => g.files[this.filename] !== undefined);
      if (candidates.length === 0) {
        return { switched: false, gistId: null, message: '未找到任何包含数据的 Gist，将创建新 Gist', candidates: [] };
      }

      // 4. 读取每个候选 Gist 的完整数据，计算新鲜度
      const candidateDetails: GistCandidate[] = [];

      for (const gist of candidates) {
        try {
          const rawUrl = gist.files[this.filename]?.raw_url;
          if (!rawUrl) continue;
          const res = await fetch(rawUrl, { headers: { 'User-Agent': 'qiulab-weekly-report' } });
          if (!res.ok) continue;
          const data = await res.json() as AppData;
          const uploads = data.uploads || [];
          const persons = data.persons || [];
          candidateDetails.push({
            id: gist.id,
            lastUploadDate: getLatestUploadDate(uploads),
            personCount: persons.length,
            uploadCount: uploads.length,
            lastModified: data.lastModified || data.lastSync || '1970-01-01T00:00:00Z',
          });
        } catch (e) {
          console.warn(`[Gist] 读取候选 Gist ${gist.id} 失败:`, e);
        }
      }

      if (candidateDetails.length === 0) {
        return { switched: false, gistId: null, message: '找到 Gist 但无法读取数据，将创建新 Gist', candidates: [] };
      }

      // 5. 按内容新鲜度排序，选数据最新的
      candidateDetails.sort(compareFreshness);
      const best = candidateDetails[0];
      const currentId = this.gistId || localGistId;

      // 6. 如果最佳 Gist 就是当前正在使用的，无需切换
      if (currentId && best.id === currentId) {
        this.gistId = best.id;
        return {
          switched: false,
          gistId: best.id,
          message: `当前 Gist 已是最新数据（最新周报 ${best.lastUploadDate}，${best.personCount} 人，${best.uploadCount} 条上传）`,
          candidates: candidateDetails,
        };
      }

      // 7. 自动切换到数据最新的 Gist
      this.gistId = best.id;

      // 8. 将新的 gistId 写回本地配置
      if (raw) {
        const config = JSON.parse(raw) as GistConfig;
        if (config.type === 'gist') {
          config.gistId = best.id;
          lsSet(LS_KEYS.PROVIDER_CONFIG, config);
        }
      }

      const previousId = currentId ? `${currentId.slice(0, 8)}...` : '无';
      console.log(`[Gist] 自动切换 Gist：从 ${previousId} → ${best.id.slice(0, 8)}...`);
      return {
        switched: true,
        gistId: best.id,
        message: `已自动切换到最新数据 Gist：${best.id.slice(0, 8)}...（最新周报 ${best.lastUploadDate}，${best.personCount} 人，${best.uploadCount} 条上传）`,
        candidates: candidateDetails,
      };
    } catch (e) {
      console.warn('[Gist] 查找 Gist 失败:', e);
      return { switched: false, gistId: this.gistId, message: `查找失败: ${e instanceof Error ? e.message : '未知错误'}`, candidates: [] };
    }
  }

  /** 获取当前正在使用的 Gist ID */
  getCurrentGistId(): string | null {
    return this.gistId;
  }

  /** 手动切换到指定 Gist ID */
  async switchToGist(gistId: string): Promise<void> {
    // 验证该 Gist 存在且包含我们的数据文件
    try {
      const gist = await this.api('GET', `/${gistId}`);
      if (!gist.files?.[this.filename]) {
        throw new Error(`Gist ${gistId} 中不包含 ${this.filename} 文件`);
      }
    } catch (e) {
      throw new Error(`无法访问 Gist ${gistId}: ${e instanceof Error ? e.message : '未知错误'}`);
    }

    this.gistId = gistId;

    // 保存到本地配置
    const raw = localStorage.getItem(LS_KEYS.PROVIDER_CONFIG);
    if (raw) {
      const config = JSON.parse(raw) as GistConfig;
      if (config.type === 'gist') {
        config.gistId = gistId;
        lsSet(LS_KEYS.PROVIDER_CONFIG, config);
      }
    }
  }

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    try {
      // 验证 token 有效性（获取当前用户）
      const user = await this.api('GET', 'https://api.github.com/user');
      const rateInfo = user.rate
        ? `剩余 ${user.rate.remaining} / ${user.rate.limit} 次请求`
        : '';

      // 先尝试解析/查找 gistId（非 force 模式）
      const resolved = await this.resolveGistId(false);

      if (resolved.gistId) {
        return { ok: true, message: `连接成功！用户 ${user.login}，当前 Gist: ${resolved.gistId.slice(0, 8)}...，${rateInfo}` };
      }
      return { ok: true, message: `连接成功！用户 ${user.login}，将自动创建新 Gist，${rateInfo}` };
    } catch (e: any) {
      if (e.message?.includes('401') || e.message?.includes('Bad credentials')) {
        return { ok: false, message: 'GitHub Token 无效或已过期，请重新生成' };
      }
      return { ok: false, message: e.message || '连接失败' };
    }
  }

  async getAllData(): Promise<AppData | null> {
    // 跨设备同步核心：先解析 gistId（非 force 模式，日常同步用）
    const resolved = await this.resolveGistId(false);
    if (!resolved.gistId) return null;

    try {
      const gist = await this.api('GET', `/${resolved.gistId}`);
      const file = gist.files?.[this.filename];
      if (!file) return null;
      const rawUrl = file.raw_url;
      const res = await fetch(rawUrl, {
        headers: { 'User-Agent': 'qiulab-weekly-report' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json() as AppData;
    } catch (e) {
      console.error('[Gist] getAllData error:', e);
      throw e;
    }
  }

  async saveAllData(data: AppData): Promise<void> {
    const content = JSON.stringify(data);
    const files: Record<string, { content: string }> = {
      [this.filename]: { content },
    };

    // 跨设备同步核心：先尝试查找已有 Gist，避免重复创建
    const resolved = await this.resolveGistId(false);

    if (!resolved.gistId) {
      // 创建新 Gist
      const gist = await this.api('POST', '', {
        description: this.description,
        public: this.isPublic,
        files,
      });
      this.gistId = gist.id;
      // 保存 Gist ID 到配置
      const saved = lsGet<ProviderConfigs | null>(LS_KEYS.PROVIDER_CONFIG, null);
      if (saved && saved.type === 'gist') {
        (saved as GistConfig).gistId = this.gistId!;
        lsSet(LS_KEYS.PROVIDER_CONFIG, saved);
      }
      console.log('[Gist] 创建新 Gist:', this.gistId);
      return;
    }

    // 更新现有 Gist
    await this.api('PATCH', `/${resolved.gistId}`, {
      description: this.description,
      files,
    });
    console.log('[Gist] 更新 Gist:', resolved.gistId);
  }
}

// ==================== 统一存储服务 ====================

class CloudStorageService {
  private provider: CloudProvider | null = null;
  private syncTimer: ReturnType<typeof setInterval> | null = null;
  private changeCallbacks: Array<() => void> = [];

  constructor() {
    const config = this.getProviderConfig();
    if (config) {
      this.provider = this.createProvider(config);
    }
    // 注意：不再自动启用任何云端 Provider
    // 用户需要手动在设置中选择并配置
  }

  private createProvider(config: ProviderConfigs): CloudProvider {
    switch (config.type) {
      case 'supabase':
        return new SupabaseProvider(config);
      case 'rest_api':
        return new RestApiProvider(config);
      case 'gist':
        return new GistProvider(config);
      default:
        throw new Error(`Unknown provider type: ${(config as ProviderConfigs).type}`);
    }
  }

  // ---------- 配置管理 ----------

  getProviderConfig(): ProviderConfigs | null {
    // 先读取新格式的多Provider配置
    const newConfig = lsGet<ProviderConfigs | null>(LS_KEYS.PROVIDER_CONFIG, null);
    if (newConfig) return newConfig;
    // 兼容旧格式的Supabase配置
    const legacyConfig = lsGet<SupabaseConfig | null>(LS_KEYS.SYNC_CONFIG, null);
    return legacyConfig;
  }

  setProviderConfig(config: ProviderConfigs | null): void {
    if (config) {
      lsSet(LS_KEYS.PROVIDER_CONFIG, config);
      this.provider = this.createProvider(config);
      this.startAutoSync();
    } else {
      localStorage.removeItem(LS_KEYS.PROVIDER_CONFIG);
      localStorage.removeItem(LS_KEYS.SYNC_CONFIG);
      this.provider = null;
      this.stopAutoSync();
    }
  }

  /** @deprecated 兼容旧API，请使用 getProviderConfig() */
  getSupabaseConfig(): SupabaseConfig | null {
    const config = this.getProviderConfig();
    return config && config.type === 'supabase' ? config : null;
  }

  /** @deprecated 兼容旧API，请使用 setProviderConfig() */
  setSupabaseConfig(config: SupabaseConfig | null): void {
    this.setProviderConfig(config);
  }

  isCloudEnabled(): boolean {
    return this.provider !== null;
  }

  // ---------- Gist 专用方法 ----------

  /** 获取当前 Gist ID（仅当 Provider 为 Gist 时有效） */
  getCurrentGistId(): string | null {
    if (this.provider instanceof GistProvider) {
      return this.provider.getCurrentGistId();
    }
    return null;
  }

  /**
   * 强制重新扫描所有 Gist，选择数据最新的那个。
   * 用于解决多台电脑创建了不同 Gist 的问题。
   */
  async forceResolveGistId(): Promise<{
    ok: boolean;
    switched: boolean;
    message: string;
    candidates: GistCandidate[];
  }> {
    if (!(this.provider instanceof GistProvider)) {
      return { ok: false, switched: false, message: '当前不是 Gist 同步模式', candidates: [] };
    }
    try {
      const result = await this.provider.resolveGistId(true);
      if (result.switched) {
        // 切换后重新加载数据
        await this.loadAllData();
        return {
          ok: true,
          switched: true,
          message: result.message + '（已自动重新加载最新数据）',
          candidates: result.candidates,
        };
      }
      return {
        ok: true,
        switched: false,
        message: result.message,
        candidates: result.candidates,
      };
    } catch (e) {
      return {
        ok: false,
        switched: false,
        message: `切换失败: ${e instanceof Error ? e.message : '未知错误'}`,
        candidates: [],
      };
    }
  }

  /**
   * 手动切换到指定 Gist ID（用于用户从候选列表中选择）
   */
  async switchToGistId(gistId: string): Promise<{ ok: boolean; message: string }> {
    if (!(this.provider instanceof GistProvider)) {
      return { ok: false, message: '当前不是 Gist 同步模式' };
    }
    try {
      const previousId = this.provider.getCurrentGistId();
      await this.provider.switchToGist(gistId);
      await this.loadAllData();
      const currentId = this.provider.getCurrentGistId();
      return {
        ok: true,
        message: `已切换到 Gist ${currentId?.slice(0, 8)}...（从 ${previousId?.slice(0, 8) || '无'}...）并已重新加载数据`,
      };
    } catch (e) {
      return {
        ok: false,
        message: `切换失败: ${e instanceof Error ? e.message : '未知错误'}`,
      };
    }
  }

  // ---------- 连接测试 ----------

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    if (!this.provider) {
      return { ok: false, message: '未配置云端同步' };
    }
    return this.provider.testConnection();
  }

  // ---------- 数据读取 ----------

  async loadAllData(): Promise<AppData> {
    // 先读取本地数据
    const local = this.loadFromLocal();

    // 如果没有云端 Provider，直接返回本地数据
    if (!this.provider) {
      return local;
    }

    try {
      // 从云端加载（带重试，确保跨浏览器同步可靠性）
      let cloud: AppData | null = null;
      let lastError: unknown;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          cloud = await this.provider.getAllData();
          if (cloud) break;
        } catch (e) {
          lastError = e;
          console.warn(`[CloudStorage] loadAllData 第${attempt}次尝试失败，${attempt < 3 ? '2秒后重试...' : '放弃'}`, e);
          if (attempt < 3) await new Promise(r => setTimeout(r, 2000));
        }
      }
      if (!cloud) {
        console.warn('[CloudStorage] 云端加载失败，回退到本地:', lastError);
        return local;
      }

      // ===== 跨浏览器核心：始终合并双方数据，不丢失任何一方的内容 =====
      // 人员数据：云端为主，本地补充（确保所有浏览器看到一致的最新人员数据）
      const localModified = local.lastModified || '';
      const cloudModified = cloud.lastModified || '';
      const useCloud = cloudModified >= localModified;
      const persons = (() => {
        // 构建 id → person 的映射
        const localMap = new Map((local.persons || []).map((p: any) => [p.id, p]));
        const cloudMap = new Map((cloud.persons || []).map((p: any) => [p.id, p]));
        // 根据时间戳判断哪边更新：云端新则云端优先，本地新则本地优先
        const mergedMap = useCloud ? new Map(cloudMap) : new Map(localMap);
        const secondaryMap = useCloud ? localMap : cloudMap;
        for (const [id, person] of secondaryMap) {
          if (!mergedMap.has(id)) {
            mergedMap.set(id, person); // 补充对方独有的人员
          } else {
            // 双方都有的人员：深层字段级合并，避免任何字段修改丢失
            const mergedPerson = mergedMap.get(id)!;
            // 1. 合并 collabSuggestions（以每对伙伴的 timestamp 为准）
            const localSugs = person.collabSuggestions || {};
            const mergedSugs = mergedPerson.collabSuggestions || {};
            const combinedSugs: Record<string, { partnerName: string; result: string; timestamp: string }> = { ...mergedSugs };
            for (const [partnerId, sug] of Object.entries(localSugs)) {
              const typedSug = sug as { partnerName: string; result: string; timestamp: string };
              const existing = combinedSugs[partnerId];
              if (!existing || typedSug.timestamp > existing.timestamp) {
                combinedSugs[partnerId] = typedSug;
              }
            }
            mergedPerson.collabSuggestions = combinedSugs;
            // 2. 补充其他字段：secondaryPerson 有非空值且 mergedPerson 为空/缺失时补充
            for (const [key, value] of Object.entries(person)) {
              if (key === 'collabSuggestions') continue; // 已单独处理
              const mergedVal = (mergedPerson as any)[key];
              if ((mergedVal === undefined || mergedVal === null || mergedVal === '') &&
                  (value !== undefined && value !== null && value !== '')) {
                (mergedPerson as any)[key] = value;
              }
            }
          }
        }
        return Array.from(mergedMap.values());
      })();

      // dynamic 数据：始终合并两边，不丢失任何周报记录
      // trends: 按 weekDate 合并（每天的 person 数据也要深层合并）
      const mergedTrends: Record<string, Record<string, unknown>> = {};
      const allTrendWeeks = new Set([
        ...Object.keys(cloud.dynamic?.trends || {}),
        ...Object.keys(local.dynamic?.trends || {}),
      ]);
      for (const weekDate of allTrendWeeks) {
        const cloudWeek = cloud.dynamic?.trends?.[weekDate] || {};
        const localWeek = local.dynamic?.trends?.[weekDate] || {};
        // 同一天的 person 数据：时间戳新的一方覆盖（但保留另一方独有的 person）
        mergedTrends[weekDate] = useCloud
          ? { ...localWeek, ...cloudWeek }
          : { ...cloudWeek, ...localWeek };
      }

      // history: 按 personName 深层合并（每个人名下的 weekDate 都要保留）
      const mergedHistory: Record<string, Record<string, string>> = {};
      const allHistoryPersons = new Set([
        ...Object.keys(cloud.dynamic?.history || {}),
        ...Object.keys(local.dynamic?.history || {}),
      ]);
      for (const personName of allHistoryPersons) {
        const cloudPerson = cloud.dynamic?.history?.[personName] || {};
        const localPerson = local.dynamic?.history?.[personName] || {};
        // 深层合并：保留双方所有的 weekDate，同一天的根据时间戳决定覆盖方向
        mergedHistory[personName] = useCloud
          ? { ...localPerson, ...cloudPerson }
          : { ...cloudPerson, ...localPerson };
      }

      console.log(`[DEBUG loadAllData] useCloud=${useCloud}, cloudMod=${cloudModified}, localMod=${localModified}, trendsWeeks=[${Object.keys(mergedTrends).slice(-3).join(',')}], historyPersons=${Object.keys(mergedHistory).length}`);

      const mergedDynamic = {
        trends: mergedTrends,
        history: mergedHistory,
        labels: [...new Set([...(cloud.dynamic?.labels || []), ...(local.dynamic?.labels || [])])].sort(),
        uploadedDates: [...new Set([...(cloud.dynamic?.uploadedDates || []), ...(local.dynamic?.uploadedDates || [])])].sort(),
        deepAnalyses: useCloud
          ? { ...local.dynamic?.deepAnalyses, ...cloud.dynamic?.deepAnalyses }
          : { ...cloud.dynamic?.deepAnalyses, ...local.dynamic?.deepAnalyses },
      };

      // uploads：合并两边的上传记录
      const localUploads = local.uploads || [];
      const cloudUploads = cloud.uploads || [];
      const allUploads = [...cloudUploads, ...localUploads];
      const uniqueUploads = Array.from(
        new Map(allUploads.map((u: any) => [u.id, u])).values()
      );

      const winner: AppData = {
        persons,  // ← 使用合并后的 persons（双方并集，冲突以时间戳新的一方为准）
        weekData: cloud.weekData && cloud.weekData.length > 0 ? cloud.weekData : (local.weekData || []),
        uploads: uniqueUploads,
        dynamic: mergedDynamic,  // ← 使用合并后的 dynamic（双方并集）
        version: '1.0',
        lastSync: new Date().toISOString(),
        // lastModified 取最新的那方
        lastModified: cloudModified > localModified ? cloudModified : localModified,
      };

      // 保存到本地
      this.saveToLocal(winner);
      this.notifyChange();

      // 注意：loadAllData 只拉取合并，不自动推回云端
      // 推回云端由调用方（如"同步数据"按钮）显式调用 saveAllData
      return winner;
    } catch (e) {
      console.warn('[CloudStorage] 云端加载失败，回退到本地:', e);
      return local;
    }
  }

  loadFromLocal(): AppData {
    const data = {
      persons: lsGet<Person[]>(LS_KEYS.PERSONS, []),
      weekData: lsGet<StoredWeekData[]>(LS_KEYS.WEEK_DATA, []),
      uploads: lsGet<UploadRecord[]>(LS_KEYS.UPLOADS, []),
      dynamic: {
        trends: lsGet<Record<string, Record<string, unknown>>>(LS_KEYS.DYN_TRENDS, {}),
        history: lsGet<Record<string, Record<string, string>>>(LS_KEYS.DYN_HISTORY, {}),
        labels: lsGet<string[]>(LS_KEYS.DYN_LABELS, []),
        uploadedDates: lsGet<string[]>(LS_KEYS.DYN_UPLOADED, []),
        deepAnalyses: lsGet<Record<string, DeepAnalysisData>>(LS_KEYS.DYN_DEEP_ANALYSES, {}),
      },
      version: '1.0',
      lastSync: lsGet<string>(LS_KEYS.SETTINGS, '') || new Date().toISOString(),
      // lastModified 空表示从未修改过，云端永远优先
      lastModified: lsGet<string>('qlab_last_modified', '') || '',
    };
    const trendWeeks = Object.keys(data.dynamic.trends);
    console.log(`[DEBUG loadFromLocal] persons=${data.persons.length}, trendsWeeks=[${trendWeeks.slice(-3).join(',')}], historyPersons=${Object.keys(data.dynamic.history).length}, labels=${data.dynamic.labels.length}, lastMod=${data.lastModified || 'empty'}`);
    return data;
  }

  // ---------- 数据保存 ----------

  async saveAllData(data: AppData): Promise<void> {
    const now = new Date().toISOString();
    data.lastSync = now;
    data.lastModified = now;

    // 保存到本地
    this.saveToLocal(data);

    // 同步到云端
    if (this.provider) {
      try {
        await this.provider.saveAllData(data);
      } catch (e) {
        console.warn('[CloudStorage] 云端同步失败:', e);
        // 本地已保存，下次启动时会重试同步
        throw e;  // 重新抛出，让外部 .catch() 能捕获
      }
    }

    // 通知监听者
    this.notifyChange();
  }

  saveToLocal(data: AppData): void {
    lsSet(LS_KEYS.PERSONS, data.persons);
    lsSet(LS_KEYS.WEEK_DATA, data.weekData);
    lsSet(LS_KEYS.UPLOADS, data.uploads);
    lsSet(LS_KEYS.SETTINGS, data.lastSync);
    lsSet('qlab_last_modified', data.lastModified);
    // 保存动态周报数据（与 dynamicStorage.ts 共用 key）
    if (data.dynamic) {
      lsSet(LS_KEYS.DYN_TRENDS, data.dynamic.trends);
      lsSet(LS_KEYS.DYN_HISTORY, data.dynamic.history);
      lsSet(LS_KEYS.DYN_LABELS, data.dynamic.labels);
      lsSet(LS_KEYS.DYN_UPLOADED, data.dynamic.uploadedDates);
      lsSet(LS_KEYS.DYN_DEEP_ANALYSES, data.dynamic.deepAnalyses);
    }
  }

  // ---------- 导出/导入 ----------

  exportToJSON(): string {
    const data = this.loadFromLocal();
    return JSON.stringify(data, null, 2);
  }

  importFromJSON(json: string): AppData {
    const data = JSON.parse(json) as AppData;
    this.saveToLocal(data);
    return data;
  }

  // ---------- 自动同步 ----------

  startAutoSync(intervalMs = 30000): void {
    this.stopAutoSync();
    if (!this.provider) return;

    this.syncTimer = setInterval(async () => {
      try {
        // 复用 loadAllData 的完整合并逻辑，确保 dynamic 数据正确合并
        await this.loadAllData();
      } catch (e) {
        console.warn('[CloudStorage] 自动同步失败:', e);
      }
    }, intervalMs);
  }

  stopAutoSync(): void {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
  }

  // ---------- 事件监听 ----------

  onDataChange(callback: () => void): () => void {
    this.changeCallbacks.push(callback);
    return () => {
      this.changeCallbacks = this.changeCallbacks.filter((cb) => cb !== callback);
    };
  }

  private notifyChange(): void {
    this.changeCallbacks.forEach((cb) => cb());
  }

  // ---------- 强制上传 ----------

  /** 强制将本地数据无条件覆盖云端数据（不合并，直接覆盖） */
  async forceUploadLocal(): Promise<void> {
    if (!this.provider) {
      throw new Error('云端 Provider 未配置，无法上传');
    }
    const data = this.loadFromLocal();
    // 直接调用 provider.saveAllData，不经过 loadAllData 合并逻辑
    await this.provider.saveAllData(data);
  }

  // ---------- 清理 ----------

  clearAllData(): void {
    Object.values(LS_KEYS).forEach((key) => localStorage.removeItem(key));
    this.notifyChange();
  }
}

// 单例导出
export const cloudStorage = new CloudStorageService();

// ==================== React Hook ====================

import { useState, useEffect, useCallback } from 'react';

export function useCloudStorage() {
  const [isCloudEnabled, setIsCloudEnabled] = useState(() => cloudStorage.isCloudEnabled());
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('');
  const [currentGistId, setCurrentGistId] = useState<string | null>(() => cloudStorage.getCurrentGistId());

  // 监听 provider 变化时更新 currentGistId
  useEffect(() => {
    return cloudStorage.onDataChange(() => {
      setCurrentGistId(cloudStorage.getCurrentGistId());
    });
  }, []);

  const syncNow = useCallback(async () => {
    if (!cloudStorage.isCloudEnabled()) return;
    setIsSyncing(true);
    try {
      // Gist 跨设备同步核心：先强制扫描所有候选 Gist，自动切换到数据最新的
      const config = cloudStorage.getProviderConfig();
      if (config?.type === 'gist') {
        const result = await cloudStorage.forceResolveGistId();
        if (result.switched) {
          console.log('[CloudSync] 定时同步：已自动切换到最新 Gist:', result.message);
        }
      }

      // 从云端拉取最新数据并合并到本地
      await cloudStorage.loadAllData();
      setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
      setCurrentGistId(cloudStorage.getCurrentGistId());
    } catch (e) {
      console.error('Sync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    return cloudStorage.onDataChange(() => {
      setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
    });
  }, []);

  const enableCloud = useCallback((url?: string, anonKey?: string) => {
    cloudStorage.setProviderConfig({
      type: 'supabase',
      name: 'Supabase',
      url: url || SUPABASE_BUILTIN.url,
      anonKey: anonKey || SUPABASE_BUILTIN.anonKey,
    });
    setIsCloudEnabled(true);
    setCurrentGistId(cloudStorage.getCurrentGistId());
    syncNow();
  }, [syncNow]);

  const enableProvider = useCallback((config: ProviderConfigs) => {
    cloudStorage.setProviderConfig(config);
    setIsCloudEnabled(true);
    setCurrentGistId(cloudStorage.getCurrentGistId());
    syncNow();
  }, [syncNow]);

  const enableGist = useCallback((config: GistConfig) => {
    cloudStorage.setProviderConfig(config);
    setIsCloudEnabled(true);
    setCurrentGistId(cloudStorage.getCurrentGistId());
    syncNow();
  }, [syncNow]);

  const disableCloud = useCallback(() => {
    cloudStorage.setProviderConfig(null);
    setIsCloudEnabled(false);
    setCurrentGistId(null);
  }, []);

  const forceUploadLocal = useCallback(async () => {
    if (!cloudStorage.isCloudEnabled()) return;
    setIsSyncing(true);
    try {
      await cloudStorage.forceUploadLocal();
      setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
      setCurrentGistId(cloudStorage.getCurrentGistId());
    } catch (e) {
      console.error('Force upload failed:', e);
      throw e;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const forceResolveGistId = useCallback(async () => {
    setIsSyncing(true);
    try {
      const result = await cloudStorage.forceResolveGistId();
      if (result.ok) {
        setCurrentGistId(cloudStorage.getCurrentGistId());
        setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
      }
      return result;
    } catch (e) {
      return { ok: false, message: `操作失败: ${e instanceof Error ? e.message : '未知错误'}`, candidates: [] };
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const switchToGistId = useCallback(async (gistId: string) => {
    setIsSyncing(true);
    try {
      const result = await cloudStorage.switchToGistId(gistId);
      if (result.ok) {
        setCurrentGistId(cloudStorage.getCurrentGistId());
        setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
      }
      return result;
    } catch (e) {
      return { ok: false, message: `切换失败: ${e instanceof Error ? e.message : '未知错误'}` };
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    isCloudEnabled,
    isSyncing,
    lastSyncTime,
    currentGistId,
    syncNow,
    enableCloud,
    enableProvider,
    enableGist,
    disableCloud,
    forceUploadLocal,
    forceResolveGistId,
    switchToGistId,
    testConnection: () => cloudStorage.testConnection(),
    exportData: () => cloudStorage.exportToJSON(),
    importData: (json: string) => cloudStorage.importFromJSON(json),
  };
}
