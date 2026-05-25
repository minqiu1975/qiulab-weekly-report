import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  UploadCloud,
  FileText,
  Database,
  Search,
  X,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

interface Doc {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  description: string;
  chunkCount: number;
}

const INITIAL_DOCS: Doc[] = [
  { id: 'b1', fileName: '仇旻团队研究规划2025.pdf', fileSize: 2048000, uploadedAt: '2025-01-05T10:00:00Z', description: '2025年度研究规划总纲', chunkCount: 45 },
  { id: 'b2', fileName: '纳米光子学实验手册.pdf', fileSize: 1536000, uploadedAt: '2025-01-08T14:30:00Z', description: '实验操作规范与安全手册', chunkCount: 32 },
  { id: 'b3', fileName: '硅光器件设计规范.pdf', fileSize: 1024000, uploadedAt: '2025-01-10T09:15:00Z', description: '硅光器件设计与仿真规范', chunkCount: 28 },
  { id: 'b4', fileName: '微纳加工工艺手册.pdf', fileSize: 2560000, uploadedAt: '2025-01-12T16:00:00Z', description: 'EBL、IBE等加工工艺参数', chunkCount: 56 },
];

const RAG_RESULTS: Record<string, { content: string; source: string; similarity: number }[]> = {
  'default': [
    { content: '硅光调制器的设计需要考虑多个关键参数，包括PN结的掺杂浓度、掺杂分布、电极结构等。调制效率与载流子浓度变化量成正比，因此需要优化掺杂分布以获得最大的载流子耗尽效应。', source: '仇旻团队研究规划2025.pdf', similarity: 0.92 },
    { content: '在硅光器件设计中，MZI结构是最常用的调制器结构之一。通过改变其中一个臂的折射率，可以实现相位调制，进而转化为强度调制。消光比和插入损耗是评价调制器性能的关键指标。', source: '硅光器件设计规范.pdf', similarity: 0.87 },
    { content: '微纳加工工艺中，电子束曝光（EBL）是实现亚波长结构的关键技术。曝光剂量、显影时间和温度都会影响最终的线宽和形貌。需要建立剂量矩阵来优化工艺参数。', source: '微纳加工工艺手册.pdf', similarity: 0.83 },
  ],
};

export default function BaselinePage() {
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);
  const [query, setQuery] = useState('');
  const [ragResults, setRagResults] = useState<typeof RAG_RESULTS['default']>([]);
  const [ragLoading, setRagLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleRagSearch = () => {
    if (!query.trim()) return;
    setRagLoading(true);
    setTimeout(() => {
      setRagResults(RAG_RESULTS['default']);
      setRagLoading(false);
    }, 1200);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const newDocs = files.map((file) => ({
      id: `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      description: '用户上传文档',
      chunkCount: Math.floor(file.size / 50000) + 1,
    }));
    setDocs((prev) => [...newDocs, ...prev]);
  }, []);

  const removeDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-800">基准库</h1>
        <p className="text-sm text-slate-500 mt-0.5">管理基准文档，基于RAG进行知识检索</p>
      </div>

      <Card
        className={`border-2 border-dashed transition-colors ${isDragging ? 'border-cyan-400 bg-cyan-50' : 'border-slate-300'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <UploadCloud className={`w-10 h-10 mb-2 ${isDragging ? 'text-cyan-500' : 'text-slate-400'}`} />
            <p className="text-sm font-medium text-slate-700">拖拽文档到此处上传</p>
            <p className="text-xs text-slate-500 mt-1">支持 PDF、DOCX、TXT 格式</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Database className="w-4 h-4 text-cyan-600" />
            文档列表 ({docs.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-2">
            {docs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-slate-700 truncate">{doc.fileName}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span>{formatSize(doc.fileSize)}</span>
                      <span>{doc.chunkCount} 个文本块</span>
                      <span>{new Date(doc.uploadedAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Badge variant="outline" className="text-[10px]">{doc.description}</Badge>
                  <button onClick={() => removeDoc(doc.id)} className="p-1 rounded hover:bg-slate-200 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Search className="w-4 h-4 text-cyan-600" />
            RAG知识检索
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex gap-2">
            <Input
              placeholder="输入问题，检索基准库知识..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRagSearch()}
              className="flex-1"
            />
            <Button onClick={handleRagSearch} className="bg-cyan-700 hover:bg-cyan-800" disabled={ragLoading}>
              {ragLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              检索
            </Button>
          </div>

          {ragResults.length > 0 && (
            <div className="mt-4 space-y-3">
              <div className="text-sm font-medium text-slate-700">检索结果：</div>
              {ragResults.map((r, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-cyan-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {r.source}
                    </span>
                    <span className="text-xs text-slate-400">相似度: {(r.similarity * 100).toFixed(0)}%</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
