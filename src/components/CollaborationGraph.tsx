import { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, ZoomIn, ZoomOut, RotateCcw, Loader2 } from 'lucide-react';

interface CollabNode {
  id: string;
  name: string;
  paperCount: number;
  group: string;
  x: number;
  y: number;
}

interface CollabData {
  nodes: { id: string; name: string; paperCount: number; group: string }[];
  links: { source: string; target: string; value: number }[];
}

const GROUP_COLORS: Record<string, string> = { core: '#d97706', active: '#0891b2', contributor: '#10b981' };
const GROUP_LABELS: Record<string, string> = {
  core: '核心 (≥20篇)', active: '活跃 (10-19篇)', contributor: '贡献 (3-9篇)',
};
const GROUP_RADII: Record<string, number> = { core: 0.22, active: 0.35, contributor: 0.48 };

interface Props { width?: number; height?: number; }

export default function CollaborationGraph({ width = 800, height = 520 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<CollabNode[]>([]);
  const velocitiesRef = useRef<Map<string, { vx: number; vy: number }>>(new Map());
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [data, setData] = useState<CollabData | null>(null);
  const [loading, setLoading] = useState(true);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    fetch('./collaboration.json')
      .then((r) => r.json())
      .then((d: CollabData) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getNodeRadius = (count: number) => Math.max(4, Math.min(10, 3 + Math.sqrt(count) * 0.35));

  const initLayout = useCallback(() => {
    if (!data) return;
    const cx = width / 2, cy = height / 2;
    const maxR = Math.min(width, height) * 0.42;

    const placed: CollabNode[] = [];
    const vels = new Map<string, { vx: number; vy: number }>();

    // 按组分别放在同心圆上，组内均匀分布
    for (const group of ['core', 'active', 'contributor'] as const) {
      const groupNodes = data.nodes.filter((n) => n.group === group);
      const r = maxR * GROUP_RADII[group];
      groupNodes.forEach((n, i) => {
        const angle = (i / Math.max(groupNodes.length, 1)) * Math.PI * 2 + (group === 'core' ? 0 : group === 'active' ? 0.3 : 0.6);
        placed.push({ ...n, x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
        vels.set(n.id, { vx: 0, vy: 0 });
      });
    }
    nodesRef.current = placed;
    velocitiesRef.current = vels;
  }, [data, width, height]);

  useEffect(() => { initLayout(); }, [initLayout]);

  // 力导向模拟（带稳定收敛）
  useEffect(() => {
    if (!data || nodesRef.current.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const links = data.links.map((l) => ({
      ...l,
      s: nodesRef.current.find((n) => n.id === l.source)!,
      t: nodesRef.current.find((n) => n.id === l.target)!,
    })).filter((l) => l.s && l.t);

    const maxVal = Math.max(...data.links.map((l) => l.value), 1);
    const minVal = Math.min(...data.links.map((l) => l.value));
    const cx = width / 2, cy = height / 2;

    let frameCount = 0;

    const simulate = () => {
      const nodes = nodesRef.current;
      const vels = velocitiesRef.current;
      frameCount++;

      // 冷却因子：前300帧逐渐降温
      const cooling = Math.max(0.02, 1 - frameCount / 300);

      // 1. 排斥力（Coulomb）
      for (let i = 0; i < nodes.length; i++) {
        const vi = vels.get(nodes[i].id)!;
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const minDist = getNodeRadius(nodes[i].paperCount) + getNodeRadius(nodes[j].paperCount) + 8;

          let force = 800 / (dist * dist);
          if (dist < minDist) force += 5;
          // 核心之间额外排斥防止重叠
          if (nodes[i].group === 'core' && nodes[j].group === 'core') force *= 1.5;

          const fx = (dx / dist) * force * cooling;
          const fy = (dy / dist) * force * cooling;
          vi.vx -= fx; vi.vy -= fy;
          const vj = vels.get(nodes[j].id)!;
          vj.vx += fx; vj.vy += fy;
        }
      }

      // 2. 连线弹簧力（Hooke）
      for (const link of links) {
        const dx = link.t.x - link.s.x;
        const dy = link.t.y - link.s.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const normalized = (link.value - minVal) / (maxVal - minVal || 1);
        const restLength = 80 + (1 - normalized) * 50;
        const force = (dist - restLength) * 0.008 * cooling;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        const vs = vels.get(link.s.id)!;
        const vt = vels.get(link.t.id)!;
        vs.vx += fx; vs.vy += fy;
        vt.vx -= fx; vt.vy -= fy;
      }

      // 3. 中心引力
      for (const n of nodes) {
        const v = vels.get(n.id)!;
        const dx = cx - n.x, dy = cy - n.y;
        v.vx += dx * 0.001 * cooling;
        v.vy += dy * 0.001 * cooling;
      }

      // 4. 更新
      for (const n of nodes) {
        const v = vels.get(n.id)!;
        v.vx *= 0.9; v.vy *= 0.9; // 阻尼
        n.x += v.vx;
        n.y += v.vy;
        const r = getNodeRadius(n.paperCount) + 2;
        n.x = Math.max(r, Math.min(width - r, n.x));
        n.y = Math.max(r, Math.min(height - r, n.y));
      }

      // ===== 绘制 =====
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // 连线
      for (const link of links) {
        const normalized = (link.value - minVal) / (maxVal - minVal || 1);
        const isRel = hoveredNode && (link.source === hoveredNode || link.target === hoveredNode);
        const isDim = hoveredNode && !isRel;
        ctx.beginPath();
        ctx.moveTo(link.s.x, link.s.y);
        ctx.lineTo(link.t.x, link.t.y);
        ctx.strokeStyle = isDim ? 'rgba(200,210,220,0.1)' : isRel ? `rgba(8,145,178,${0.2 + normalized * 0.4})` : `rgba(148,163,184,${0.08 + normalized * 0.15})`;
        ctx.lineWidth = isRel ? 1.5 + normalized : 0.5 + normalized * 0.5;
        ctx.stroke();
      }

      // 节点
      const drawOrder = ['contributor', 'active', 'core'];
      for (const group of drawOrder) {
        for (const n of nodes) {
          if (n.group !== group) continue;
          const isHov = hoveredNode === n.id;
          const isConn = hoveredNode && links.some((l) => (l.source === hoveredNode && l.target === n.id) || (l.target === hoveredNode && l.source === n.id));
          const isDim = hoveredNode && !isHov && !isConn;
          const r = getNodeRadius(n.paperCount);
          const color = GROUP_COLORS[n.group] || '#94a3b8';

          if (isHov) {
            const g = ctx.createRadialGradient(n.x, n.y, r, n.x, n.y, r * 3);
            g.addColorStop(0, color + '25');
            g.addColorStop(1, 'transparent');
            ctx.beginPath(); ctx.arc(n.x, n.y, r * 3, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(n.x, n.y, isHov ? r + 2 : r, 0, Math.PI * 2);
          ctx.fillStyle = isDim ? '#e2e8f0' : color;
          ctx.fill();
          ctx.strokeStyle = isHov ? '#fff' : '#fff';
          ctx.lineWidth = isHov ? 2.5 : 1.5;
          ctx.stroke();
        }
      }

      // 标签
      for (const n of nodes) {
        const isHov = hoveredNode === n.id;
        const isConn = hoveredNode && links.some((l) => (l.source === hoveredNode && l.target === n.id) || (l.target === hoveredNode && l.source === n.id));
        if (hoveredNode && !isHov && !isConn) continue;
        const r = getNodeRadius(n.paperCount);
        if (isHov) {
          ctx.font = 'bold 11px sans-serif';
          ctx.fillStyle = '#1e293b';
          ctx.textAlign = 'center';
          ctx.fillText(`${n.name} (${n.paperCount}篇)`, n.x, n.y + r + 15);
        } else if (n.group === 'core') {
          ctx.font = '10px sans-serif';
          ctx.fillStyle = '#475569';
          ctx.textAlign = 'center';
          ctx.fillText(n.name, n.x, n.y + r + 12);
        }
      }

      // 连线数字（悬停时）
      if (hoveredNode) {
        for (const link of links) {
          if (link.source !== hoveredNode && link.target !== hoveredNode) continue;
          const normalized = (link.value - minVal) / (maxVal - minVal || 1);
          if (normalized < 0.1) continue;
          const mx = (link.s.x + link.t.x) / 2, my = (link.s.y + link.t.y) / 2;
          const text = `${link.value}`;
          const tw = ctx.measureText(text).width;
          ctx.fillStyle = 'rgba(255,255,255,0.85)';
          ctx.fillRect(mx - tw / 2 - 3, my - 7, tw + 6, 14);
          ctx.font = 'bold 8px sans-serif';
          ctx.fillStyle = '#0891b2';
          ctx.textAlign = 'center';
          ctx.fillText(text, mx, my + 3);
        }
      }

      ctx.restore();

      // 300帧后停止动画，保持静态
      if (frameCount < 400) {
        animRef.current = requestAnimationFrame(simulate);
      }
    };

    simulate();
    return () => cancelAnimationFrame(animRef.current);
  }, [data, width, height, hoveredNode, zoom, pan]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left - pan.x) / zoom;
    const my = (e.clientY - rect.top - pan.y) / zoom;

    if (isDragging.current) {
      setPan((p) => ({ x: p.x + e.clientX - dragStart.current.x, y: p.y + e.clientY - dragStart.current.y }));
      dragStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const found = nodesRef.current.find((n) => {
      const r = getNodeRadius(n.paperCount);
      const dx = mx - n.x, dy = my - n.y;
      return Math.sqrt(dx * dx + dy * dy) < r + 5;
    });
    setHoveredNode(found?.id || null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => { isDragging.current = true; dragStart.current = { x: e.clientX, y: e.clientY }; };
  const handleMouseUp = () => { isDragging.current = false; };
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  const hoveredData = hoveredNode && data ? data.nodes.find((n) => n.id === hoveredNode) : null;
  const connectedLinks = hoveredNode && data ? data.links.filter((l) => l.source === hoveredNode || l.target === hoveredNode).sort((a, b) => b.value - a.value) : [];

  if (loading) return (
    <Card className="border-slate-200"><CardContent className="p-8 text-center">
      <Loader2 className="w-6 h-6 animate-spin text-cyan-600 mx-auto" />
      <p className="text-sm text-slate-400 mt-2">加载合作网络数据...</p>
    </CardContent></Card>
  );

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Users className="w-4 h-4 text-cyan-600" />
            PAINT Lab 论文合作网络（2009-2025，216篇论文）
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}><ZoomIn className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.max(z - 0.2, 0.3))}><ZoomOut className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm" onClick={resetView}><RotateCcw className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <canvas ref={canvasRef} width={width} height={height} className="w-full rounded-lg border border-slate-200 cursor-move bg-slate-50" style={{ maxWidth: '100%' }}
            onMouseMove={handleMouseMove} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} />
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            {Object.entries(GROUP_COLORS).map(([key, color]) => (
              <span key={key} className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />{GROUP_LABELS[key]}</span>
            ))}
            <span className="ml-auto text-slate-400">拖拽平移 | 悬停查看详情 | 滚轮缩放</span>
          </div>
        </CardContent>
      </Card>

      {hoveredData && data && (
        <Card className="border-cyan-200 bg-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-slate-800">{hoveredData.name}</span>
              <Badge variant="outline" className="text-[10px]">{GROUP_LABELS[hoveredData.group]}</Badge>
              <span className="text-xs text-slate-500">{hoveredData.paperCount} 篇论文</span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="font-medium">合作连接 ({connectedLinks.length}):</div>
              {connectedLinks.slice(0, 10).map((link, i) => {
                const otherId = link.source === hoveredNode ? link.target : link.source;
                const other = data.nodes.find((n) => n.id === otherId);
                return <div key={i} className="flex items-center gap-2"><span className="text-slate-700">{other?.name}</span><span className="text-cyan-600 font-medium">{link.value} 篇</span></div>;
              })}
              {connectedLinks.length > 10 && <div className="text-slate-400">... 还有 {connectedLinks.length - 10} 个</div>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
