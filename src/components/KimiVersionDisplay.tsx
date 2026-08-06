import { useState, useEffect, useCallback } from 'react';
import { Cpu, AlertTriangle, CheckCircle2, XCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import { getKimiModel, getModelDisplayName } from '../lib/kimiApi';

type VersionStatus = 'checking' | 'latest' | 'downgraded' | 'offline' | 'error';

interface VersionInfo {
  status: VersionStatus;
  detectedVersion: string;
  expectedVersion: string;
  message: string;
  lastChecked: string;
}

/** 模拟 API 版本检测（沙箱环境无法真实调用，但保留完整逻辑架构）
 *  生产环境中，将 mock 替换为真实 fetch 调用 */
async function detectKimiVersion(): Promise<VersionInfo> {
  try {
    // 生产环境替换为：
    // const resp = await fetch(getApiEndpoint(), {
    //   headers: { 'Authorization': `Bearer ${apiKey}` }
    // });
    // const data = await resp.json();
    // const model = data.data?.find((m: any) => m.id.includes('kimi'));
    // const version = model?.id || 'unknown';

    // 沙箱环境：从 localStorage 读取用户配置的版本偏好
    const userPref = localStorage.getItem('kimi_model_preference');
    const storedStatus = localStorage.getItem('kimi_version_status');
    const currentModel = getKimiModel();
    const modelName = getModelDisplayName(currentModel);

    if (storedStatus === 'offline') {
      return {
        status: 'offline',
        detectedVersion: '未连接',
        expectedVersion: modelName,
        message: '无法连接到 Kimi API 服务，请检查网络或 API Key 配置',
        lastChecked: new Date().toLocaleTimeString('zh-CN'),
      };
    }

    if (storedStatus === 'downgraded') {
      return {
        status: 'downgraded',
        detectedVersion: userPref || 'k1.5',
        expectedVersion: modelName,
        message: `⚠️ 版本降级警报：当前使用 ${userPref || 'k1.5'}，而非配置的 ${modelName}。分析精度可能下降！`,
        lastChecked: new Date().toLocaleTimeString('zh-CN'),
      };
    }

    // 默认：正常
    return {
      status: 'latest',
      detectedVersion: modelName,
      expectedVersion: modelName,
      message: `✅ 已连接到 ${modelName}，分析精度最优`,
      lastChecked: new Date().toLocaleTimeString('zh-CN'),
    };
  } catch (err) {
    return {
      status: 'error',
      detectedVersion: 'unknown',
      expectedVersion: getModelDisplayName(getKimiModel()),
      message: `版本检测出错: ${err instanceof Error ? err.message : String(err)}`,
      lastChecked: new Date().toLocaleTimeString('zh-CN'),
    };
  }
}

/** 检查当前版本是否为最新版（与用户配置一致即可） */
export function isLatestKimiVersion(version: string): boolean {
  const currentModel = getKimiModel();
  return version === getModelDisplayName(currentModel);
}

/** 获取期望的 Kimi 版本显示名 */
export function getExpectedKimiVersion(): string {
  return getModelDisplayName(getKimiModel());
}

export default function KimiVersionDisplay() {
  const [info, setInfo] = useState<VersionInfo>({
    status: 'checking',
    detectedVersion: '-',
    expectedVersion: getExpectedKimiVersion(),
    message: '正在检测 Kimi API 版本...',
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

  const statusConfig: Record<VersionStatus, { icon: typeof Cpu; color: string; bg: string; dot: string }> = {
    checking:  { icon: RefreshCw, color: 'text-slate-400', bg: 'bg-slate-100', dot: 'bg-slate-400' },
    latest:    { icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', dot: 'bg-emerald-500' },
    downgraded:{ icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-50', dot: 'bg-red-500' },
    offline:   { icon: WifiOff, color: 'text-gray-500', bg: 'bg-gray-100', dot: 'bg-gray-400' },
    error:     { icon: XCircle, color: 'text-orange-600', bg: 'bg-orange-50', dot: 'bg-orange-500' },
  };

  const cfg = statusConfig[info.status];
  const StatusIcon = cfg.icon;

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
          {info.status === 'checking' ? '检测中...' : info.detectedVersion}
        </span>
        {info.status === 'downgraded' && <AlertTriangle className="w-3 h-3 text-red-500" />}
      </button>

      {expanded && (
        <div className="absolute right-0 top-full mt-1 w-72 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">API 版本状态</span>
            <button onClick={runCheck} className="text-xs text-cyan-600 hover:text-cyan-700 flex items-center gap-0.5">
              <RefreshCw className="w-3 h-3" />刷新
            </button>
          </div>

          <div className={`text-xs p-2 rounded ${cfg.bg} ${cfg.color}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <StatusIcon className="w-3.5 h-3.5" />
              <span className="font-medium">
                {info.status === 'latest' && '版本正常'}
                {info.status === 'downgraded' && '⚠️ 版本降级警报'}
                {info.status === 'offline' && '未连接'}
                {info.status === 'error' && '检测错误'}
                {info.status === 'checking' && '检测中...'}
              </span>
            </div>
            <p className="leading-relaxed">{info.message}</p>
          </div>

          <div className="text-[10px] text-slate-400 space-y-0.5">
            <div className="flex justify-between">
              <span>配置模型</span>
              <span className="font-mono text-slate-600">{info.expectedVersion}</span>
            </div>
            <div className="flex justify-between">
              <span>检测版本</span>
              <span className={`font-mono ${info.detectedVersion === info.expectedVersion ? 'text-emerald-600' : 'text-red-600'}`}>
                {info.detectedVersion}
              </span>
            </div>
            <div className="flex justify-between">
              <span>检测时间</span>
              <span>{info.lastChecked}</span>
            </div>
          </div>

          {/* 连接测试按钮 */}
          {info.status !== 'checking' && (
            <button
              onClick={runCheck}
              className="w-full flex items-center justify-center gap-1 text-xs py-1.5 rounded bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors"
            >
              <Wifi className="w-3 h-3" />
              重新连接测试
            </button>
          )}

          {/* 降级时的警告框 */}
          {info.status === 'downgraded' && (
            <div className="text-[10px] text-red-600 bg-red-50 p-2 rounded border border-red-200">
              <AlertTriangle className="w-3 h-3 inline mr-1" />
              降级使用旧版本可能导致分析质量下降。建议检查 API Key 配置或等待服务恢复。
            </div>
          )}
        </div>
      )}
    </div>
  );
}
