import { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle2, Trash2, FolderOpen } from 'lucide-react';
import ReportUploader from '../components/ReportUploader';
import { Card, CardContent } from '../components/ui/card';
import { getUploadHistory, type UploadRecord } from '../lib/dynamicStorage';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function UploadHistoryPanel() {
  const [records, setRecords] = useState<UploadRecord[]>([]);

  useEffect(() => {
    setRecords(getUploadHistory());
  }, []);

  const handleDelete = (id: string) => {
    const updated = records.filter(r => r.id !== id);
    setRecords(updated);
    localStorage.setItem('qlab_upload_history', JSON.stringify(updated));
  };

  if (records.length === 0) {
    return (
      <Card className="border-slate-200">
        <CardContent className="py-12 text-center">
          <FolderOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">暂无上传记录</p>
          <p className="text-xs text-slate-400 mt-1">上传周报后将在此处显示历史文件</p>
        </CardContent>
      </Card>
    );
  }

  // 按 weekDate 分组
  const byWeek: Record<string, UploadRecord[]> = {};
  for (const r of records) {
    if (!byWeek[r.weekDate]) byWeek[r.weekDate] = [];
    byWeek[r.weekDate].push(r);
  }

  return (
    <Card className="border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Clock className="w-4 h-4 text-cyan-600" />
            上传历史
          </h3>
          <span className="text-xs text-slate-400">共 {records.length} 个文件</span>
        </div>
        <div className="space-y-4">
          {Object.entries(byWeek).sort((a, b) => b[0].localeCompare(a[0])).map(([weekDate, files]) => (
            <div key={weekDate} className="space-y-2">
              <div className="text-xs font-medium text-slate-500 px-1 py-0.5 bg-slate-50 rounded inline-block">
                {weekDate} 周报
              </div>
              {files.map(f => (
                <div key={f.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 px-2 hover:bg-slate-50 rounded transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span className="text-sm text-slate-700 truncate">{f.fileName}</span>
                    <span className="text-[10px] text-slate-400 flex-shrink-0">{formatSize(f.fileSize)}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-[10px] text-slate-400">{formatDate(f.uploadedAt)}</span>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors ml-1"
                      title="删除记录"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">周报上传与分析</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          上传本周两份周报（研究员与博后版 + 博士版），启动AI深度研判
        </p>
      </div>
      <ReportUploader />
      <UploadHistoryPanel />
    </div>
  );
}
