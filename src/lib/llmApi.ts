/**
 * 共享的 LLM API 调用模块
 * 支持 Provider：Kimi (kimi-k2.6) / DeepSeek (deepseek-reasoner)
 * 所有 LLM API 调用必须走此模块，确保模型和端点统一
 */

import { getDatePrefix } from './dateContext';

// ============================================================
// Provider 类型定义
// ============================================================
export type LLMProvider = 'kimi' | 'deepseek';

export interface ProviderConfig {
  provider: LLMProvider;
  displayName: string;
  modelId: string;
  apiKey: string;
  baseUrl: string;
}

// ============================================================
// Kimi 默认配置（不再内置共享 Key，用户需自行配置）
// ============================================================
const KIMI_API_KEY_KEY = 'qlab_moonshot_api_key';
const KIMI_URL_KEY = 'qlab_moonshot_api_url';
const KIMI_DEFAULT_URL = 'https://api.moonshot.cn/v1';
const KIMI_MODEL = 'kimi-k2.6';

// ============================================================
// DeepSeek 默认配置
// ============================================================
const DEEPSEEK_API_KEY_KEY = 'qlab_deepseek_api_key';
const DEEPSEEK_URL_KEY = 'qlab_deepseek_api_url';
const DEEPSEEK_DEFAULT_URL = 'https://api.deepseek.com/v1';
const DEEPSEEK_MODEL = 'deepseek-reasoner'; // DeepSeek 4 (R1)

// ============================================================
// Provider 选择（全局）
// ============================================================
const PROVIDER_KEY = 'qlab_llm_provider';

export function getProvider(): LLMProvider {
  return (localStorage.getItem(PROVIDER_KEY) as LLMProvider) || 'kimi';
}

export function setProvider(provider: LLMProvider): void {
  localStorage.setItem(PROVIDER_KEY, provider);
}

// ============================================================
// 获取当前 Provider 的完整配置
// ============================================================
export function getProviderConfig(): ProviderConfig {
  const provider = getProvider();
  if (provider === 'deepseek') {
    return {
      provider: 'deepseek',
      displayName: 'DeepSeek 4',
      modelId: DEEPSEEK_MODEL,
      apiKey: localStorage.getItem(DEEPSEEK_API_KEY_KEY) || '',
      baseUrl: localStorage.getItem(DEEPSEEK_URL_KEY) || DEEPSEEK_DEFAULT_URL,
    };
  }
  // 默认 Kimi
  return {
    provider: 'kimi',
    displayName: 'Kimi 2.6',
    modelId: KIMI_MODEL,
    apiKey: localStorage.getItem(KIMI_API_KEY_KEY) || '',
    baseUrl: localStorage.getItem(KIMI_URL_KEY) || KIMI_DEFAULT_URL,
  };
}

/** 获取当前模型显示名称（如 "Kimi 2.6" 或 "DeepSeek 4"） */
export function getModelDisplayName(): string {
  return getProviderConfig().displayName;
}

// ============================================================
// Kimi 配置存取（兼容旧代码）
// ============================================================
export function getApiKey(): string {
  return getProviderConfig().apiKey;
}

export function getBaseUrl(): string {
  return getProviderConfig().baseUrl;
}

export function getKimiModel(): string {
  return KIMI_MODEL;
}

// ============================================================
// DeepSeek 配置存取
// ============================================================
export function getDeepSeekApiKey(): string {
  return localStorage.getItem(DEEPSEEK_API_KEY_KEY) || '';
}

export function setDeepSeekApiKey(key: string): void {
  if (key.trim()) {
    localStorage.setItem(DEEPSEEK_API_KEY_KEY, key.trim());
  } else {
    localStorage.removeItem(DEEPSEEK_API_KEY_KEY);
  }
}

export function getDeepSeekBaseUrl(): string {
  return localStorage.getItem(DEEPSEEK_URL_KEY) || DEEPSEEK_DEFAULT_URL;
}

export function setDeepSeekBaseUrl(url: string): void {
  if (url.trim()) {
    localStorage.setItem(DEEPSEEK_URL_KEY, url.trim());
  } else {
    localStorage.removeItem(DEEPSEEK_URL_KEY);
  }
}

// ============================================================
// API 调用接口
// ============================================================
export interface LLMApiOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  enableThinking?: boolean;
}

/**
 * 统一调用 LLM API（根据当前 Provider 自动路由到 Kimi 或 DeepSeek）
 * 所有调用自动注入当前日期前缀，防止AI时间幻觉
 */
export async function callLLMApi(
  userPrompt: string,
  options: LLMApiOptions = {}
): Promise<string> {
  const config = getProviderConfig();
  const {
    systemPrompt = '你是一个专业的科研顾问助手。',
    maxTokens = 4000,
  } = options;

  // 前置检查：API Key 是否已配置
  if (!config.apiKey) {
    const providerName = config.provider === 'kimi' ? 'Kimi' : 'DeepSeek';
    throw new Error(
      `${providerName} API Key 未配置。请在「设置」→「AI 模型配置」中填写您的 API Key 后再试。`
    );
  }

  // 自动注入当前日期前缀
  const datePrefix = getDatePrefix();
  const finalSystemPrompt = `${datePrefix}\n\n${systemPrompt}`;

  if (config.provider === 'deepseek') {
    return _callDeepSeekApi(config, userPrompt, finalSystemPrompt, maxTokens);
  }
  return _callKimiApiInternal(config, userPrompt, finalSystemPrompt, maxTokens, options.enableThinking);
}

// ---- Kimi API (internal) ----
async function _callKimiApiInternal(
  config: ProviderConfig,
  userPrompt: string,
  systemPrompt: string,
  maxTokens: number,
  enableThinking?: boolean
): Promise<string> {
  const body: Record<string, unknown> = {
    model: config.modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: maxTokens,
  };

  if (!enableThinking) {
    body.thinking = { type: 'disabled' };
  }

  const resp = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const status = resp.status;
    let detail = '';
    try {
      const errBody = await resp.json();
      detail = errBody?.error?.message || JSON.stringify(errBody);
    } catch {
      detail = await resp.text();
    }

    if (status === 401) {
      throw new Error(`Kimi API Key 无效 (${status})。当前端点: ${config.baseUrl}。中国站 Key 用 api.moonshot.cn，国际站用 api.moonshot.ai。可在「设置」页面修改。详情: ${detail}`);
    }
    if (status === 404) {
      throw new Error(`Kimi 模型不存在 (${status})。当前模型: ${config.modelId}。详情: ${detail}`);
    }
    if (status >= 500) {
      throw new Error(`Kimi 服务器错误 (${status})。请稍后重试。详情: ${detail}`);
    }
    throw new Error(`Kimi API 调用失败 (${status})。详情: ${detail}`);
  }

  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Kimi API 返回了空内容，请稍后重试。');
  }
  return content;
}

// ---- DeepSeek API (internal) ----
async function _callDeepSeekApi(
  config: ProviderConfig,
  userPrompt: string,
  systemPrompt: string,
  maxTokens: number
): Promise<string> {
  const body = {
    model: config.modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: maxTokens,
    stream: false,
  };

  const resp = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const status = resp.status;
    let detail = '';
    try {
      const errBody = await resp.json();
      detail = errBody?.error?.message || JSON.stringify(errBody);
    } catch {
      detail = await resp.text();
    }

    if (status === 401) {
      throw new Error(`DeepSeek API Key 无效 (${status})。请检查 Key 是否正确，或在「设置」页面重新配置。详情: ${detail}`);
    }
    if (status === 404) {
      throw new Error(`DeepSeek 模型不存在 (${status})。当前模型: ${config.modelId}。详情: ${detail}`);
    }
    if (status === 402) {
      throw new Error(`DeepSeek 账户余额不足 (${status})。请充值后重试。详情: ${detail}`);
    }
    if (status >= 500) {
      throw new Error(`DeepSeek 服务器错误 (${status})。请稍后重试。详情: ${detail}`);
    }
    throw new Error(`DeepSeek API 调用失败 (${status})。详情: ${detail}`);
  }

  const data = await resp.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('DeepSeek API 返回了空内容，请稍后重试。');
  }
  return content;
}

// ============================================================
// 并发控制（兼容旧代码）
// ============================================================
export async function parallelLLMCalls<T>(
  items: T[],
  fn: (item: T, index: number) => Promise<string>,
  concurrency: number = 5
): Promise<{ results: (string | null)[]; errors: { index: number; error: string }[] }> {
  const results: (string | null)[] = new Array(items.length).fill(null);
  const errors: { index: number; error: string }[] = [];

  const executeBatch = async (batch: { item: T; index: number }[]) => {
    await Promise.all(
      batch.map(async ({ item, index }) => {
        try {
          results[index] = await fn(item, index);
        } catch (e) {
          errors.push({ index, error: e instanceof Error ? e.message : String(e) });
          results[index] = null;
        }
      })
    );
  };

  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency).map((item, idx) => ({
      item,
      index: i + idx,
    }));
    await executeBatch(batch);
  }

  return { results, errors };
}

// ============================================================
// 兼容旧导出（保持向后兼容）
// ============================================================
export interface KimiApiOptions extends LLMApiOptions {}

/** 兼容旧代码，调用 callLLMApi */
export async function callKimiApi(
  userPrompt: string,
  options: KimiApiOptions = {}
): Promise<string> {
  return callLLMApi(userPrompt, options);
}

/** 兼容旧代码 */
export function parallelKimiCalls<T>(
  items: T[],
  fn: (item: T, index: number) => Promise<string>,
  concurrency: number = 5
) {
  return parallelLLMCalls(items, fn, concurrency);
}
