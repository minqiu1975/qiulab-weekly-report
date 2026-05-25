/**
 * 共享的 Kimi API 调用模块
 * 所有 Kimi k2.6 API 调用必须走此模块，确保模型和端点统一
 */

// 内置默认 API Key（实验室共享）- 用户可在设置页面覆盖
const DEFAULT_API_KEY = 'sk-HjX9XXQNNHzrD1zlJRdD7zqY6HXFRpa4VsW6lSc2F742GHbg';
const API_KEY_STORAGE_KEY = 'qlab_moonshot_api_key';
const API_URL_STORAGE_KEY = 'qlab_moonshot_api_url';
// 默认使用中国站 api.moonshot.cn（对应 platform.moonshot.cn 注册的 Key）
const DEFAULT_BASE_URL = 'https://api.moonshot.cn/v1';

export function getApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || DEFAULT_API_KEY;
}

export function getBaseUrl(): string {
  return localStorage.getItem(API_URL_STORAGE_KEY) || DEFAULT_BASE_URL;
}

export interface KimiApiOptions {
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  enableThinking?: boolean;
}

/**
 * 调用 Kimi k2.6 API
 * 如果 API 不可用，直接抛出错误，绝不降级
 */
export async function callKimiApi(
  userPrompt: string,
  options: KimiApiOptions = {}
): Promise<string> {
  const {
    systemPrompt = '你是一个专业的科研顾问助手。',
    maxTokens = 4000,
    enableThinking = false,
  } = options;

  const apiKey = getApiKey();
  const baseUrl = getBaseUrl();

  const body: Record<string, unknown> = {
    model: 'kimi-k2.6',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    max_tokens: maxTokens,
  };

  if (!enableThinking) {
    body.thinking = { type: 'disabled' };
  }

  const resp = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
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
      throw new Error(`API Key 无效 (${status})。当前端点: ${baseUrl}。中国站 Key 用 api.moonshot.cn，国际站用 api.moonshot.ai。可在「设置」页面修改。详情: ${detail}`);
    }
    if (status === 404) {
      throw new Error(`模型不存在 (${status})。当前端点: ${baseUrl}。详情: ${detail}`);
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

/**
 * 并发控制：同时最多 N 个请求
 */
export async function parallelKimiCalls<T>(
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
