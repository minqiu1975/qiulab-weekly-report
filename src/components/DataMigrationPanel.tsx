import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Download, Upload, CheckCircle2, AlertTriangle,
  HardDrive, Cloud, ArrowRight
} from 'lucide-react';

/** 所有需要迁移的 localStorage key */
const ALL_DATA_KEYS = [
  'qlab_persons_v5',
  'qlab_dynamic_trends',
  'qlab_dynamic_history',
  'qlab_dynamic_labels',
  'qlab_uploaded_dates',
  'qlab_uploads',
  'qlab_upload_history',
  'qlab_deep_analyses',
  'qlab_last_modified',
  'qlab_moonshot_api_key',
  'qlab_moonshot_api_url',
  'qlab_sync_config',
  'qlab_provider_config',
  'qlab_baidu_token',
  'qlab_settings',
];

/** 导出所有数据为 JSON 文件 */
function exportAllData(): object {
  const data: Record<string, unknown> = {};
  for (const key of ALL_DATA_KEYS) {
    const value = localStorage.getItem(key);
    if (value !== null) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value; // 纯字符串
      }
    }
  }
  data['_export_meta'] = {
    exportedAt: new Date().toISOString(),
    sourceUrl: window.location.href,
    version: '1.0',
  };
  return data;
}

/** 导入数据到 localStorage */
function importAllData(data: Record<string, unknown>): { success: number; failed: number; errors: string[] } {
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (key.startsWith('_')) continue; // 跳过元数据
    try {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      success++;
    } catch (e) {
      failed++;
      errors.push(`${key}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return { success, failed, errors };
}

export default function DataMigrationPanel() {
  const [importResult, setImportResult] = useState<{ success: number; failed: number } | null>(null);
  const [error, setError] = useState('');

  /** 导出按钮 */
  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qiulab-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /** 导入按钮 */
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setImportResult(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (!data || typeof data !== 'object') {
          setError('文件格式错误：必须是 JSON 对象');
          return;
        }
        const result = importAllData(data);
        setImportResult(result);
        if (result.failed === 0) {
          // 导入成功，刷新页面使新数据生效
          setTimeout(() => window.location.reload(), 1500);
        }
      } catch {
        setError('文件解析失败：不是有效的 JSON 文件');
      }
    };
    reader.readAsText(file);
  };

  // 统计现有数据
  const existingKeys = ALL_DATA_KEYS.filter(k => localStorage.getItem(k) !== null);
  const hasData = existingKeys.length > 0;

  return (
    <Card className="border-slate-200">
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-cyan-600" />
          <h3 className="text-sm font-semibold text-slate-800">数据迁移</h3>
          <Badge className="bg-cyan-100 text-cyan-700 text-xs">
            {existingKeys.length} 项数据
          </Badge>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          导出所有本地数据（成员、趋势、深度分析、设置等）为一个 JSON 文件，
          在新网站导入即可完整恢复。也支持从云端自动同步。
        </p>

        {/* 导出 */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-700">导出数据</div>
            <div className="text-xs text-slate-500">
              将 {existingKeys.length} 项本地数据下载为 JSON 文件
            </div>
          </div>
          <Button
            size="sm"
            className="bg-cyan-600 hover:bg-cyan-700 text-xs"
            onClick={handleExport}
            disabled={!hasData}
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            导出 JSON
          </Button>
        </div>

        {/* 导入 */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-700">导入数据</div>
            <div className="text-xs text-slate-500">
              选择之前导出的 JSON 文件恢复数据
            </div>
          </div>
          <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Upload className="w-3.5 h-3.5" />
            导入 JSON
          </label>
        </div>

        {/* 云端同步路径 */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
          <Cloud className="w-5 h-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-medium text-blue-700">云端同步路径（推荐）</div>
            <div className="text-xs text-blue-600 leading-relaxed">
              如果在原网站启用了云端同步（Supabase），
              直接在新网站用相同的配置登录即可自动拉取全部数据，无需手动导出导入。
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0" />
        </div>

        {/* 导入结果 */}
        {importResult && (
          <div className={`p-3 rounded-lg flex items-center gap-2 ${importResult.failed === 0 ? 'bg-emerald-50 border border-emerald-200' : 'bg-amber-50 border border-amber-200'}`}>
            <CheckCircle2 className={`w-4 h-4 ${importResult.failed === 0 ? 'text-emerald-600' : 'text-amber-600'}`} />
            <span className={`text-xs ${importResult.failed === 0 ? 'text-emerald-700' : 'text-amber-700'}`}>
              导入完成：成功 {importResult.success} 项{importResult.failed > 0 ? `，失败 ${importResult.failed} 项` : ''}
              {importResult.failed === 0 && '，页面即将刷新...'}
            </span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-red-700">{error}</span>
          </div>
        )}

        {/* 数据清单 */}
        <div>
          <div className="text-xs font-medium text-slate-600 mb-2">数据清单</div>
          <div className="grid grid-cols-2 gap-1">
            {ALL_DATA_KEYS.map(key => {
              const exists = localStorage.getItem(key) !== null;
              return (
                <div key={key} className="flex items-center gap-1.5 text-[11px]">
                  <div className={`w-1.5 h-1.5 rounded-full ${exists ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                  <span className={exists ? 'text-slate-700' : 'text-slate-400'}>{key}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
