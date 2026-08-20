import { useState, useEffect } from 'react';
import { Cloud, CloudOff, Database, Github } from 'lucide-react';
import { cloudStorage } from '../services/cloudStorage';
import type { ProviderConfigs } from '../services/cloudStorage';

interface SyncInfo {
  enabled: boolean;
  type: string;
  name: string;
  detail: string;
}

function getSyncInfo(): SyncInfo {
  const config = cloudStorage.getProviderConfig() as ProviderConfigs | null;
  if (!config) {
    return { enabled: false, type: 'local', name: '本地存储', detail: '数据仅保存在浏览器本地' };
  }
  switch (config.type) {
    case 'gist':
      return {
        enabled: true,
        type: 'gist',
        name: 'GitHub Gist',
        detail: config.gistId ? `Gist ID: ${config.gistId.slice(0, 8)}...` : '将自动创建新 Gist',
      };
    case 'supabase':
      return { enabled: true, type: 'supabase', name: 'Supabase', detail: 'PostgreSQL 云端同步' };
    case 'rest_api':
      return { enabled: true, type: 'rest', name: 'REST API', detail: config.baseUrl };
    default:
      return { enabled: false, type: 'local', name: '本地存储', detail: '未知配置' };
  }
}

export default function CloudSyncDisplay() {
  const [info, setInfo] = useState<SyncInfo>(getSyncInfo);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handle = setInterval(() => {
      setInfo(getSyncInfo());
    }, 2000); // 每2秒轮询一次配置变化
    return () => clearInterval(handle);
  }, []);

  const Icon = info.enabled ? (info.type === 'gist' ? Github : info.type === 'supabase' ? Database : Cloud) : CloudOff;
  const colorClass = info.enabled
    ? info.type === 'gist' ? 'text-violet-400 bg-violet-500/10' : 'text-cyan-400 bg-cyan-500/10'
    : 'text-slate-400 bg-slate-500/10';

  return (
    <div className="relative">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-colors ${colorClass} hover:opacity-80`}
        title={info.detail}
      >
        <Icon className="w-3 h-3" />
        <span>{info.name}</span>
      </button>

      {expanded && (
        <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg z-50 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-700">同步状态</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
              info.enabled ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {info.enabled ? '已启用' : '未启用'}
            </span>
          </div>

          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-400">存储方式</span>
              <span className="font-medium">{info.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Provider</span>
              <span className="font-mono text-slate-600">{info.type.toUpperCase()}</span>
            </div>
            {info.detail && (
              <div className="text-[10px] text-slate-400 mt-1 pt-1 border-t border-slate-100 break-all">
                {info.detail}
              </div>
            )}
          </div>

          {!info.enabled && (
            <div className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
              数据仅保存在当前浏览器。请前往「设置」→「云端同步」配置 GitHub Gist 或 Supabase 以跨设备同步。
            </div>
          )}
        </div>
      )}
    </div>
  );
}
