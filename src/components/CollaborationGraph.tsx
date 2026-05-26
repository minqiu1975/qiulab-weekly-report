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
  vx: number;
  vy: number;
}

interface CollabData {
  nodes: { id: string; name: string; paperCount: number; group: string }[];
  links: { source: string; target: string; value: number }[];
}

const GROUP_COLORS: Record<string, string> = {
  core: '#d97706',
  active: '#0891b2',
  contributor: '#10b981',
};

const GROUP_LABELS: Record<string, string> = {
  core: '核心作者 (≥20篇)',
  active: '活跃作者 (10-19篇)',
  contributor: '贡献作者 (3-9篇)',
};

interface Props {
  width?: number;
  height?: number;
  onNodeHover?: (name: string | null) => void;
}

export default function CollaborationGraph({ width = 800, height = 520, onNodeHover }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<CollabNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [data, setData] = useState<CollabData | null>(null);
  const [loading, setLoading] = useState(true);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // 加载真实论文合作数据
  useEffect(() => {
    fetch('./collaboration.json')
      .then((r) => r.json())
      .then((d: CollabData) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const initNodes = useCallback(() => {
    if (!data) return;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.3;

    // 按论文数量排序，核心作者放中心
    const sorted = [...data.nodes].sort((a, b) => b.paperCount - a.paperCount);

    nodesRef.current = sorted.map((n, i) => {
      // 核心作者放在内圈，其他放在外圈
      const r = n.group === 'core' ? radius * 0.5 : n.group === 'active' ? radius * 0.8 : radius;
      const angle = (i / sorted.length) * Math.PI * 2 + (n.group === 'core' ? 0 : Math.PI / 4);
      return {
        ...n,
        x: centerX + Math.cos(angle) * r + (Math.random() - 0.5) * 40,
        y: centerY + Math.sin(angle) * r + (Math.random() - 0.5) * 40,
        vx: 0,
        vy: 0,
      };
    });
  }, [data, width, height]);

  useEffect(() => {
    initNodes();
  }, [initNodes]);

  // 绘制图表
  useEffect(() => {
    if (!data || nodesRef.current.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const links = data.links.map((l) => ({
      ...l,
      sourceNode: nodesRef.current.find((n) => n.id === l.source)!,
      targetNode: nodesRef.current.find((n) => n.id === l.target)!,
    }));

    const maxVal = Math.max(...data.links.map((l) => l.value));
    const minVal = Math.min(...data.links.map((l) => l.value));

    const simulate = () => {
      const nodes = nodesRef.current;
      const k = 0.04;
      const repulsion = 600;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = repulsion / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }

      for (const link of links) {
        if (!link.sourceNode || !link.targetNode) continue;
        const dx = link.targetNode.x - link.sourceNode.x;
        const dy = link.targetNode.y - link.sourceNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const normalized = (link.value - minVal) / (maxVal - minVal || 1);
        const force = (dist - 60 - normalized * 40) * k;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        link.sourceNode.vx += fx;
        link.sourceNode.vy += fy;
        link.targetNode.vx -= fx;
        link.targetNode.vy -= fy;
      }

      for (const n of nodes) {
        const dx = centerX - n.x;
        const dy = centerY - n.y;
        n.vx += dx * 0.002;
        n.vy += dy * 0.002;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(30, Math.min(width - 30, n.x));
        n.y = Math.max(30, Math.min(height - 30, n.y));
      }

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      // 绘制连线
      for (const link of links) {
        if (!link.sourceNode || !link.targetNode) continue;
        const normalized = (link.value - minVal) / (maxVal - minVal || 1);

        // 高亮与悬停节点相关的连线
        const isRelated = hoveredNode &&
          ((link.source === hoveredNode && link.target === hoveredNode) ||
           (link.source === hoveredNode || link.target === hoveredNode));
        const isDimmed = hoveredNode && !isRelated;

        ctx.beginPath();
        ctx.moveTo(link.sourceNode.x, link.sourceNode.y);
        ctx.lineTo(link.targetNode.x, link.targetNode.y);
        ctx.strokeStyle = isDimmed
          ? 'rgba(200,210,220,0.15)'
          : isRelated
            ? `rgba(8, 145, 178, ${0.3 + normalized * 0.5})`
            : `rgba(148, 163, 184, ${0.15 + normalized * 0.25})`;
        ctx.lineWidth = isRelated ? 1.5 + normalized * 2 : 0.5 + normalized;
        ctx.stroke();

        // 在线上显示合作次数
        if (isRelated && normalized > 0.3) {
          const mx = (link.sourceNode.x + link.targetNode.x) / 2;
          const my = (link.sourceNode.y + link.targetNode.y) / 2;
          ctx.font = 'bold 9px sans-serif';
          ctx.fillStyle = '#0891b2';
          ctx.textAlign = 'center';
          ctx.fillText(`${link.value}`, mx, my - 4);
        }
      }

      // 绘制节点
      for (const n of nodes) {
        const isHovered = hoveredNode === n.id;
        const isConnected = hoveredNode && links.some(
          (l) => (l.source === hoveredNode && l.target === n.id) ||
                 (l.target === hoveredNode && l.source === n.id)
        );
        const isDimmed = hoveredNode && !isHovered && !isConnected;

        const radius = 5 + Math.sqrt(n.paperCount) * 0.6;
        const color = GROUP_COLORS[n.group] || '#94a3b8';

        // 发光效果（核心作者）
        if (n.group === 'core' && !isDimmed) {
          const gradient = ctx.createRadialGradient(n.x, n.y, radius * 0.5, n.x, n.y, radius * 2.5);
          gradient.addColorStop(0, color + '20');
          gradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(n.x, n.y, radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? radius + 3 : radius, 0, Math.PI * 2);
        ctx.fillStyle = isDimmed ? '#e2e8f0' : color;
        ctx.fill();
        ctx.strokeStyle = isHovered ? '#fff' : isDimmed ? '#cbd5e1' : '#fff';
        ctx.lineWidth = isHovered ? 3 : 2;
        ctx.stroke();

        // 论文数标签
        if ((isHovered || n.group === 'core') && !isDimmed) {
          ctx.font = `${isHovered ? 'bold 11px' : '10px'} sans-serif`;
          ctx.fillStyle = isDimmed ? '#94a3b8' : '#334155';
          ctx.textAlign = 'center';
          ctx.fillText(`${n.name} (${n.paperCount})`, n.x, n.y + radius + (isHovered ? 16 : 14));
        }
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(simulate);
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
      setPan((prev) => ({
        x: prev.x + e.clientX - dragStart.current.x,
        y: prev.y + e.clientY - dragStart.current.y,
      }));
      dragStart.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const found = nodesRef.current.find((n) => {
      const radius = 5 + Math.sqrt(n.paperCount) * 0.6;
      const dx = mx - n.x;
      const dy = my - n.y;
      return Math.sqrt(dx * dx + dy * dy) < radius + 5;
    });
    const newHover = found?.id || null;
    setHoveredNode(newHover);
    onNodeHover?.(found?.name || null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => { isDragging.current = false; };
  const resetView = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  // 获取悬停节点数据
  const hoveredData = hoveredNode && data
    ? data.nodes.find((n) => n.id === hoveredNode)
    : null;
  const connectedLinks = hoveredNode && data
    ? data.links.filter((l) => l.source === hoveredNode || l.target === hoveredNode)
    : [];

  if (loading) {
    return (
      <Card className="border-slate-200">
        <CardContent className="p-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-600 mx-auto" />
          <p className="text-sm text-slate-400 mt-2">加载合作网络数据...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Users className="w-4 h-4 text-cyan-600" />
            PAINT Lab 论文合作网络（2009-2025，216篇论文）
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setZoom((z) => Math.max(z - 0.2, 0.3))}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={resetView}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="w-full rounded-lg border border-slate-200 cursor-move bg-slate-50"
            style={{ maxWidth: '100%' }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
            {Object.entries(GROUP_COLORS).map(([key, color]) => (
              <span key={key} className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                {GROUP_LABELS[key]}
              </span>
            ))}
            <span className="ml-auto text-slate-400">拖拽平移 | 悬停查看详情 | 滚轮缩放</span>
          </div>
        </CardContent>
      </Card>

      {/* 悬停节点详情 */}
      {hoveredData && data && (
        <Card className="border-cyan-200 bg-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-slate-800">{hoveredData.name}</span>
              <Badge variant="outline" className="text-[10px]">
                {GROUP_LABELS[hoveredData.group]}
              </Badge>
              <span className="text-xs text-slate-500">{hoveredData.paperCount} 篇论文</span>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="font-medium">合作连接 ({connectedLinks.length}):</div>
              {connectedLinks.sort((a, b) => b.value - a.value).slice(0, 8).map((link, i) => {
                const otherId = link.source === hoveredNode ? link.target : link.source;
                const other = data.nodes.find((n) => n.id === otherId);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-slate-700">{other?.name}</span>
                    <span className="text-cyan-600 font-medium">{link.value} 篇</span>
                  </div>
                );
              })}
              {connectedLinks.length > 8 && (
                <div className="text-slate-400">... 还有 {connectedLinks.length - 8} 个合作</div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
