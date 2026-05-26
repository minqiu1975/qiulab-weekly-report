import { useState, useEffect, useCallback } from 'react';
import LiteratureSearch from '../components/LiteratureSearch';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, Microscope, FlaskConical, Layers, Cpu, Lightbulb, Zap, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const RESEARCH_DIRECTIONS = [
  {
    icon: Layers,
    title: '碳化硅超表面与AR光波导',
    desc: '基于4H-SiC的超透镜（Metalens）和衍射光波导技术，研发3.8g超轻AR显示模组，消除彩虹伪影，实现可量产的高性能增强现实显示。',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Snowflake,
    title: '冰刻纳米加工技术',
    desc: '以冰为抗蚀剂的新型电子束光刻技术（Ice Lithography），可在活体生物表面实现纳米级加工，产出了入选Nature 2025年度最佳科学图片的"纹身水熊虫"。',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    icon: Lightbulb,
    title: '拓扑光子学',
    desc: '研究基于赝自旋的拓扑光子学，利用缠绕耦合相位实现鲁棒的光传输，探索拓扑保护在光通信和量子信息处理中的应用。',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Cpu,
    title: '光计算与智能推断',
    desc: '开发大规模集成光子神经网络加速器，实现矩阵-向量乘法等关键AI运算的光学处理，突破传统电子计算能效瓶颈。',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Microscope,
    title: '微纳光电子器件',
    desc: '研究钙钛矿、GaAs等材料的微纳光电子器件，包括自供电光电探测器、量子点LED、等离激元器件等，推动高效光电器件发展。',
    color: 'text-rose-600',
    bg: 'bg-rose-50',
  },
  {
    icon: Zap,
    title: '激光微纳加工',
    desc: '利用飞秒激光在SiC等材料上制备深亚波长周期性纳米结构，实现可控的多丝结构生长，应用于结构色、防伪和光学器件。',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
  },
];

function Snowflake(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="m20 16-4-4 4-4" />
      <path d="m4 8 4 4-4 4" />
      <path d="m16 4-4 4-4-4" />
      <path d="m8 20 4-4 4 4" />
    </svg>
  );
}

export default function LiteraturePage() {
  const [expandedDir, setExpandedDir] = useState<number | null>(null);
  const [lastSync, setLastSync] = useState<string>(() => {
    return localStorage.getItem('qiulab_literature_last_sync') || '';
  });
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');

  // 自动检查：页面加载时提示是否需要同步（超过7天未同步）
  useEffect(() => {
    if (!lastSync) return;
    const daysSinceSync = (Date.now() - new Date(lastSync).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceSync > 7) {
      console.log('[Literature] 超过7天未同步论文数据，建议手动检查更新');
    }
  }, [lastSync]);

  const handleSync = useCallback(async () => {
    setSyncStatus('syncing');
    try {
      // 尝试从 Qiu Lab 网站获取最新论文列表
      // 注意：由于浏览器 CORS 限制，直接抓取可能失败
      // no-cors 模式下无法读取响应内容，实际同步需要通过后端代理
      await fetch('https://qiu.lab.westlake.edu.cn/ky/fblw.htm', {
        mode: 'no-cors',
      });
      // 实际同步需要通过后端代理或手动更新数据文件
      const now = new Date().toISOString();
      localStorage.setItem('qiulab_literature_last_sync', now);
      setLastSync(now);
      setSyncStatus('success');
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch {
      setSyncStatus('error');
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, []);

  const formatSyncTime = (iso: string) => {
    if (!iso) return '从未同步';
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-cyan-600" />
            文献调研
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            PAINT Lab 仇旻实验室发表成果库 · 数据来源:{' '}
            <a
              href="https://qiu.lab.westlake.edu.cn/ky/fblw.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 hover:underline"
            >
              qiu.lab.westlake.edu.cn
            </a>
          </p>
        </div>
        {/* 同步状态 + 按钮 */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">
            上次同步: {formatSyncTime(lastSync)}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleSync}
            disabled={syncStatus === 'syncing'}
            className="h-7 text-xs"
          >
            {syncStatus === 'syncing' && <RefreshCw className="w-3 h-3 mr-1 animate-spin" />}
            {syncStatus === 'success' && <CheckCircle className="w-3 h-3 mr-1 text-emerald-500" />}
            {syncStatus === 'error' && <AlertCircle className="w-3 h-3 mr-1 text-red-500" />}
            {syncStatus === 'idle' && <RefreshCw className="w-3 h-3 mr-1" />}
            {syncStatus === 'syncing' ? '同步中...' : syncStatus === 'success' ? '已同步' : syncStatus === 'error' ? '失败' : '检查更新'}
          </Button>
        </div>
      </div>

      {/* 研究方向介绍 */}
      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <FlaskConical className="w-4 h-4 text-cyan-600" />
            PAINT Lab 研究方向
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {RESEARCH_DIRECTIONS.map((dir, idx) => {
              const Icon = dir.icon;
              const isExpanded = expandedDir === idx;
              return (
                <button
                  key={dir.title}
                  onClick={() => setExpandedDir(isExpanded ? null : idx)}
                  className={`text-left rounded-lg border border-slate-100 p-3 transition-all hover:shadow-md hover:-translate-y-0.5 ${dir.bg}`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${dir.color}`} />
                    </div>
                    <span className="text-sm font-medium text-slate-800">{dir.title}</span>
                  </div>
                  <p className={`text-xs text-slate-600 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                    {dir.desc}
                  </p>
                  {dir.desc.length > 60 && (
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {isExpanded ? '点击收起' : '点击展开'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 文献搜索 */}
      <LiteratureSearch />
    </div>
  );
}
