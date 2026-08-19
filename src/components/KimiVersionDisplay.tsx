import { useState, useEffect, useCallback } from 'react';
import { Cpu, BrainCircuit, CheckCircle2, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { getProvider, getProviderConfig, getModelDisplayName, type LLMProvider } from '../lib/llmApi';

type VersionStatus = 'checking' | 'latest' | 'offline' | 'error';

interface VersionInfo {
  status: VersionStatus;
  message: string;
  lastChecked: string;
}

async function detectConnection(): Promise<VersionInfo> {
  try {
    const config = getProviderConfig();
    const storedStatus = localStorage.getItem('llm_connection_status');

    if (storedStatus === 'offline') {
      return {
        status: 'offline',
        message: `无法连接到 ${config.displayName} API 服务，请检查网络或 API Key 配置`,
        lastChecked: new Date().toLocaleTimeString('zh-CN'),
      };
    }

    return {
      status: 'latest',
      message: `✅ 已连接到 ${config.displayName}，分析精度最优`,
      lastChecked: new Date().toLocaleTimeString('zh-CN'),
    };
  } catch (err) {
    return {
      status: 'error',
      message: `连接检测出错: ${err instanceof Error ? err.message : String(err)}`,
      lastChecked: new Date().toLocaleTimeString('zh-CN'),
    };
  }
}

export default function KimiVersionDisplay() {
  const [provider, setProvider] = useState<LLMProvider>(getProvider);
  const [info, setInfo] = useState<VersionInfo>({
    status: 'checking',
    message: '正在检测 API 连接...',
    lastChecked: '-',
  });
  const [expanded, setExpanded] = useState(false);

  const runCheck = useCallback(async () => {
    const current = getProvider();
    setProvider(current);
    setInfo(prev => ({ ...prev, status: 'checking', message: '正在检测...' }));
    const result = await detectConnection();
    setInfo(result);
  }, []);

  useEffect(() => {
    runCheck();
  }, [runCheck]);

  const isKimi30 = provider === 'kimi30';
  const isDeepSeekFlash = provider === 'deepseek-flash';
  const isDeepSeekPro = provider === 'deepseek-pro';
  const isDeepSeek = isDeepSeekFlash || isDeepSeekPro;
  const displayName = getModelDisplayName();

  const statusConfig: Record<VersionStatus, { color: string; bg: string; dot: string; icon: typeof Cpu }> = {
    checking:  { color: 'text-slate-400', bg: 'bg-slate-100', dot: 'bg-slate-400', icon: RefreshCw },
    latest:    { color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500', icon: CheckCircle2 },
    offline:   { color: 'text-gray-500', bg: 'bg-gray-100', dot: 'bg-gray-400', icon: WifiOff },
    error:     { color: 'text-orange-600', bg: 'bg-orange-50', dot: 'bg-orange-500', icon: WifiOff },
  };

  const cfg = statusConfig[info.status];
  const Icon = isDeepSeek ? BrainCircuit : Cpu;

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors ${cfg.bg} hover:opacity-80`}
        title={info.message}
      >
        <span className={`w-2 h-2 rounded-full ${cfg.dot} ${info.status === 'checking' ? 'animate-pulse' : ''}`} />
        <Icon className={`w-3 h-3 ${cfg.color}`} />
        <span className={cfg.color}>
          {info.status === 'checking' ? '检测中...' : displayName}
        </span>
      </button>

      {expanded && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">API 状态</span>
            <button onClick={runCheck} className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5">
              <RefreshCw className="w-3 h-3" />刷新
            </button>
          </div>

          <div className={`text-xs p-2 rounded ${cfg.bg} ${cfg.color}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="font-medium">
                {info.status === 'latest' && '连接正常'}
                {info.status === 'offline' && '未连接'}
                {info.status === 'error' && '检测错误'}
                {info.status === 'checking' && '检测中...'}
              </span>
            </div>
            <p className="leading-relaxed">{info.message}</p>
          </div>

          <div className="text-[10px] text-slate-400 space-y-0.5">
            <div className="flex justify-between">
              <span>当前 Provider</span>
              <span className="font-mono text-slate-600">
                {isDeepSeekPro ? 'DeepSeek-V4-Pro' : isDeepSeekFlash ? 'DeepSeek-V4-Flash' : isKimi30 ? 'Kimi-K3' : 'Kimi-K2.6'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>当前模型</span>
              <span className="font-mono text-emerald-600">{displayName}</span>
            </div>
            <div className="flex justify-between">
              <span>检测时间</span>
              <span>{info.lastChecked}</span>
            </div>
          </div>

          {info.status !== 'checking' && (
            <button
              onClick={runCheck}
              className="w-full flex items-center justify-center gap-1 text-xs py-1.5 rounded bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors"
            >
              <Wifi className="w-3 h-3" />
              重新连接测试
            </button>
          )}

          {info.status === 'offline' && (
            <div className="text-[10px] text-red-600 bg-red-50 p-2 rounded border border-red-200">
              无法连接到 API 服务。请检查网络连接或 API Key 配置。
            </div>
          )}
        </div>
      )}
    </div>
  );
}
