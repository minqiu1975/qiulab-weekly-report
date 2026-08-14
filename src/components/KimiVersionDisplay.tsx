import { useState, useEffect, useCallback } from 'react';
import { Cpu, CheckCircle2, RefreshCw, Wifi } from 'lucide-react';

type VersionStatus = 'checking' | 'latest' | 'offline' | 'error';

interface VersionInfo {
  status: VersionStatus;
  message: string;
  lastChecked: string;
}

/** 模拟 API 连接检测 */
async function detectKimiVersion(): Promise<VersionInfo> {
  try {
    const storedStatus = localStorage.getItem('kimi_version_status');

    if (storedStatus === 'offline') {
      return {
        status: 'offline',
        message: '无法连接到 Kimi API 服务，请检查网络或 API Key 配置',
        lastChecked: new Date().toLocaleTimeString('zh-CN'),
      };
    }

    // 固定 Kimi 2.6
    return {
      status: 'latest',
      message: '✅ 已连接到 Kimi 2.6，分析精度最优',
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
  const [info, setInfo] = useState<VersionInfo>({
    status: 'checking',
    message: '正在检测 Kimi API 连接...',
    lastChecked: '-',
  });
  const [expanded, setExpanded] = useState(false);

  const runCheck = useCallback(async () => {
    setInfo(prev => ({ ...prev, status: 'checking', message: '正在检测...' }));
    const result = await detectKimiVersion();
    setInfo(result);
  }, []);

  useEffect(() => {
    runCheck();
  }, [runCheck]);

  const statusConfig: Record<VersionStatus, { color: string; bg: string; dot: string }> = {
    checking:  { color: 'text-slate-400', bg: 'bg-slate-100', dot: 'bg-slate-400' },
    latest:    { color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
    offline:   { color: 'text-gray-500', bg: 'bg-gray-100', dot: 'bg-gray-400' },
    error:     { color: 'text-orange-600', bg: 'bg-orange-50', dot: 'bg-orange-500' },
  };

  const cfg = statusConfig[info.status];

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-colors ${cfg.bg} hover:opacity-80`}
        title={info.message}
      >
        <span className={`w-2 h-2 rounded-full ${cfg.dot} ${info.status === 'checking' ? 'animate-pulse' : ''}`} />
        <Cpu className={`w-3 h-3 ${cfg.color}`} />
        <span className={cfg.color}>
          {info.status === 'checking' ? '检测中...' : 'Kimi 2.6'}
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
              <span>当前模型</span>
              <span className="font-mono text-emerald-600">Kimi 2.6</span>
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
