/**
 * 兼容层 — 已迁移至 llmApi.ts
 * 保留此文件以向后兼容，新代码应直接 import from '../lib/llmApi'
 */
export {
  callLLMApi as callKimiApi,
  parallelLLMCalls as parallelKimiCalls,
  getProviderConfig,
  getProvider,
  setProvider,
  getModelDisplayName,
  getApiKey,
  getBaseUrl,
  getKimiModel,
  getDeepSeekApiKey,
  setDeepSeekApiKey,
  getDeepSeekBaseUrl,
  setDeepSeekBaseUrl,
  type LLMProvider,
  type ProviderConfig,
  type LLMApiOptions as KimiApiOptions,
} from './llmApi';
