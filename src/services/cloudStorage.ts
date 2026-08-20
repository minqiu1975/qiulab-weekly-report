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

export type CloudProviderType = 'supabase' | 'rest_api' | 'baidu_pan';

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

/** 百度网盘配置 - 使用OAuth2简化模式 */
export interface BaiduPanConfig extends ProviderConfig {
  type: 'baidu_pan';
  appKey: string;        // 百度开放平台 AppKey
  appName: string;       // 应用名称（用于构建写入路径）
  accessToken?: string;  // OAuth2 授权后获得的 access_token
  tokenExpiry?: string;  // token 过期时间 ISO 字符串
}

export type ProviderConfigs = SupabaseConfig | RestApiConfig | BaiduPanConfig;

// ==================== 内置配置 ====================

/** 内置百度网盘应用配置 - 用户已创建 qlabwid 应用 */
export const BAIDU_PAN_BUILTIN = {
  appKey: 'dnuMdkQeUNEqfJAR732aLVZkK1SXrkia',
  appName: 'qlabwid',
} as const;

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

// ==================== 百度网盘 Provider ====================
/**
 * 百度网盘数据同步 Provider
 *
 * 使用 OAuth2 简化模式（Implicit Grant），适合纯前端应用。
 * 数据以单个 JSON 文件形式存储在百度网盘的 /apps/{appName}/ 目录下。
 *
 * 限制说明：
 * - access_token 有效期30天，过期后需重新授权
 * - 文件只能写入 /apps/{appName}/ 目录下
 * - 需要用户自行注册百度开发者账号并创建应用
 */
export class BaiduPanProvider implements CloudProvider {
  private appKey: string;
  private appName: string;
  private accessToken: string;
  private filePath: string;

  constructor(config: BaiduPanConfig) {
    this.appKey = config.appKey;
    this.appName = config.appName || 'qlab';
    this.accessToken = config.accessToken || '';
    this.filePath = `/apps/${this.appName}/qlab-data.json`;
  }

  /** 检查 token 是否有效 */
  isTokenValid(): boolean {
    if (!this.accessToken) return false;
    const stored = this.loadTokenFromStorage();
    if (!stored) return false;
    // 提前1天视为过期
    const expiry = new Date(stored.tokenExpiry);
    expiry.setDate(expiry.getDate() - 1);
    return new Date() < expiry;
  }

  /** 获取 OAuth2 授权 URL（简化模式） */
  getAuthorizeUrl(redirectUri: string): string {
    // 确保 redirectUri 使用 HTTPS（GitHub Pages 要求）
    const secureUri = redirectUri.replace(/^http:/, 'https:');
    const params = new URLSearchParams({
      response_type: 'token',
      client_id: this.appKey,
      redirect_uri: secureUri,
      scope: 'basic netdisk',
      display: 'page',
    });
    return `https://openapi.baidu.com/oauth/2.0/authorize?${params.toString()}`;
  }

  /** 从 URL hash 中解析 access_token（授权回调后调用） */
  static parseTokenFromUrl(): { accessToken: string; expiresIn: number } | null {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return null;
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');
    if (!accessToken) return null;
    return {
      accessToken,
      expiresIn: expiresIn ? parseInt(expiresIn, 10) : 2592000,
    };
  }

  /** 清除 URL 中的 token 信息 */
  static cleanUrl(): void {
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }
  }

  /** 保存 token 到 localStorage */
  saveTokenToStorage(accessToken: string, expiresIn: number): void {
    const expiry = new Date(Date.now() + expiresIn * 1000).toISOString();
    localStorage.setItem('qlab_baidu_token', JSON.stringify({
      accessToken,
      tokenExpiry: expiry,
      appKey: this.appKey,
      appName: this.appName,
    }));
  }

  /** 从 localStorage 加载 token */
  loadTokenFromStorage(): { accessToken: string; tokenExpiry: string; appKey: string; appName: string } | null {
    try {
      const raw = localStorage.getItem('qlab_baidu_token');
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (data.appKey === this.appKey) {
        this.accessToken = data.accessToken;
        return data;
      }
    } catch { /* ignore */ }
    return null;
  }

  /** 清除存储的 token */
  clearToken(): void {
    localStorage.removeItem('qlab_baidu_token');
    this.accessToken = '';
  }

  private async apiRequest(method: string, params: Record<string, string>): Promise<Response> {
    const url = new URL('https://d.pcs.baidu.com/rest/2.0/pcs/file');
    url.searchParams.set('method', method);
    url.searchParams.set('access_token', this.accessToken);
    url.searchParams.set('path', this.filePath);
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
    // 添加 15 秒超时，避免 fetch 永远挂起
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      return await fetch(url.toString(), { signal: controller.signal });
    } finally {
      clearTimeout(timeout);
    }
  }

  async getAllData(): Promise<AppData | null> {
    // 先尝试从存储加载 token
    if (!this.accessToken) {
      const stored = this.loadTokenFromStorage();
      if (!stored) return null;
    }
    try {
      const res = await this.apiRequest('download', {});
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`下载失败: HTTP ${res.status}`);
      }
      return await res.json() as AppData;
    } catch (e) {
      console.error('[BaiduPan] getAllData error:', e);
      return null;
    }
  }

  async saveAllData(data: AppData): Promise<void> {
    if (!this.accessToken) throw new Error('未授权，请先完成百度网盘授权');
    try {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      const formData = new FormData();
      formData.append('file', blob, 'qlab-data.json');

      const url = new URL('https://d.pcs.baidu.com/rest/2.0/pcs/file');
      url.searchParams.set('method', 'upload');
      url.searchParams.set('access_token', this.accessToken);
      url.searchParams.set('path', this.filePath);
      url.searchParams.set('ondup', 'overwrite');

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000); // 30秒上传超时

      const res = await fetch(url.toString(), {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) {
        throw new Error(`上传失败: HTTP ${res.status}`);
      }
    } catch (e) {
      console.error('[BaiduPan] saveAllData error:', e);
      throw e;
    }
  }

  async testConnection(): Promise<{ ok: boolean; message: string }> {
    if (!this.accessToken) {
      return { ok: false, message: '未授权，请先在上方输入 Access Token 并点击「启用同步」' };
    }
    try {
      // 使用 AbortController 防止请求永远挂起（百度 API 可能因 CORS 或网络问题无响应）
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      // 尝试通过 tokeninfo API 验证 token（支持 CORS 的可能性更高）
      const res = await fetch(
        `https://openapi.baidu.com/rest/2.0/oauth/2.0/tokeninfo?access_token=${this.accessToken}`,
        { signal: controller.signal }
      );
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        if (data.error_code) {
          if (data.error_code === 111 || data.error === 'invalid_token') {
            this.clearToken();
            return { ok: false, message: 'Access Token 已过期或无效，请重新获取' };
          }
          return { ok: false, message: `Token 验证失败: ${data.error_description || data.error_msg || '未知错误'}` };
        }
        const daysLeft = data.expires_in ? Math.floor(data.expires_in / 86400) : '未知';
        return { ok: true, message: `百度网盘连接成功，Token 剩余有效期 ${daysLeft} 天` };
      }

      // 如果 tokeninfo 不可用，回退到 xpan API（可能因 CORS 失败）
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), 10000);
      try {
        const res2 = await fetch(
          `https://pan.baidu.com/rest/2.0/xpan/nas?method=uinfo&access_token=${this.accessToken}`,
          { signal: controller2.signal }
        );
        clearTimeout(timeout2);
        if (res2.ok) {
          return { ok: true, message: '百度网盘连接成功' };
        }
        const err = await res2.json().catch(() => ({}));
        if (err.error_code === 111 || err.error === 'invalid_token') {
          this.clearToken();
          return { ok: false, message: 'Access Token 已过期或无效，请重新获取' };
        }
        return { ok: false, message: `连接失败: ${err.error_msg || err.error_description || 'HTTP ' + res2.status}` };
      } catch {
        clearTimeout(timeout2);
        // 如果两个 API 都失败，很可能是 CORS 或网络问题
        return { ok: false, message: '无法连接百度网盘 API（可能被浏览器安全策略阻止）。请尝试直接点击「启用同步」上传数据，或检查网络连接。' };
      }
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        return { ok: false, message: '连接超时（10秒），请检查网络或 Token 是否有效' };
      }
      return { ok: false, message: `连接失败: ${e instanceof Error ? e.message : '网络错误'}` };
    }
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
      case 'baidu_pan':
        return new BaiduPanProvider(config);
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

  const syncNow = useCallback(async () => {
    if (!cloudStorage.isCloudEnabled()) return;
    setIsSyncing(true);
    try {
      const data = cloudStorage.loadFromLocal();
      await cloudStorage.saveAllData(data);
      setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
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
    syncNow();
  }, [syncNow]);

  const enableProvider = useCallback((config: ProviderConfigs) => {
    cloudStorage.setProviderConfig(config);
    setIsCloudEnabled(true);
    syncNow();
  }, [syncNow]);

  const enableBaiduPan = useCallback((config: BaiduPanConfig) => {
    cloudStorage.setProviderConfig(config);
    setIsCloudEnabled(true);
    syncNow();
  }, [syncNow]);

  const disableCloud = useCallback(() => {
    cloudStorage.setProviderConfig(null);
    setIsCloudEnabled(false);
  }, []);

  const forceUploadLocal = useCallback(async () => {
    if (!cloudStorage.isCloudEnabled()) return;
    setIsSyncing(true);
    try {
      await cloudStorage.forceUploadLocal();
      setLastSyncTime(new Date().toLocaleTimeString('zh-CN'));
    } catch (e) {
      console.error('Force upload failed:', e);
      throw e;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return {
    isCloudEnabled,
    isSyncing,
    lastSyncTime,
    syncNow,
    enableCloud,
    enableProvider,
    enableBaiduPan,
    disableCloud,
    forceUploadLocal,
    testConnection: () => cloudStorage.testConnection(),
    exportData: () => cloudStorage.exportToJSON(),
    importData: (json: string) => cloudStorage.importFromJSON(json),
  };
}
