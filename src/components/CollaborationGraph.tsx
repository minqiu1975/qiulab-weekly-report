import { useEffect, useRef, useState, useCallback } from 'react';
import type { CollaborationNode } from '../types';
import { MOCK_COLLABORATIONS } from '../data/mockCollaborations';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface SimNode extends CollaborationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Props {
  width?: number;
  height?: number;
}

export default function CollaborationGraph({ width = 800, height = 500 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<SimNode[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const initNodes = useCallback(() => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    nodesRef.current = MOCK_COLLABORATIONS.nodes.map((n, i) => {
      const angle = (i / MOCK_COLLABORATIONS.nodes.length) * Math.PI * 2;
      return {
        ...n,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 60,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 60,
        vx: 0,
        vy: 0,
      };
    });
  }, [width, height]);

  useEffect(() => {
    initNodes();
  }, [initNodes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const links = MOCK_COLLABORATIONS.links.map((l) => ({
      ...l,
      sourceNode: nodesRef.current.find((n) => n.id === l.source)!,
      targetNode: nodesRef.current.find((n) => n.id === l.target)!,
    }));

    const simulate = () => {
      const nodes = nodesRef.current;
      const k = 0.05;
      const repulsion = 800;
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
        const force = (dist - 80) * k * link.strength;
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
        n.vx += dx * 0.001;
        n.vy += dy * 0.001;
        n.vx *= 0.85;
        n.vy *= 0.85;
        n.x += n.vx;
        n.y += n.vy;
        n.x = Math.max(30, Math.min(width - 30, n.x));
        n.y = Math.max(30, Math.min(height - 30, n.y));
      }

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(pan.x, pan.y);
      ctx.scale(zoom, zoom);

      for (const link of links) {
        if (!link.sourceNode || !link.targetNode) continue;
        ctx.beginPath();
        ctx.moveTo(link.sourceNode.x, link.sourceNode.y);
        ctx.lineTo(link.targetNode.x, link.targetNode.y);
        ctx.strokeStyle = `rgba(8, 145, 178, ${link.strength * 0.4})`;
        ctx.lineWidth = link.strength * 2;
        ctx.stroke();
      }

      for (const n of nodes) {
        const isHovered = hoveredNode === n.id;
        const isConnected = hoveredNode && links.some(
          (l) =>
            (l.source === hoveredNode && l.target === n.id) ||
            (l.target === hoveredNode && l.source === n.id)
        );

        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? 10 : 7, 0, Math.PI * 2);
        if (n.role === 'researcher') {
          ctx.fillStyle = isHovered ? '#b45309' : '#d97706';
        } else if (n.role === 'postdoc') {
          ctx.fillStyle = isHovered ? '#0891b2' : '#06b6d4';
        } else {
          ctx.fillStyle = isHovered ? '#059669' : '#10b981';
        }
        if (hoveredNode && !isHovered && !isConnected) {
          ctx.fillStyle = '#cbd5e1';
        }
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.font = `${isHovered ? 'bold 12px' : '11px'} sans-serif`;
        ctx.fillStyle = hoveredNode && !isHovered && !isConnected ? '#94a3b8' : '#334155';
        ctx.textAlign = 'center';
        ctx.fillText(n.name, n.x, n.y + (isHovered ? 18 : 16));
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(simulate);
    };

    simulate();
    return () => cancelAnimationFrame(animRef.current);
  }, [width, height, hoveredNode, zoom, pan]);

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
      const dx = mx - n.x;
      const dy = my - n.y;
      return Math.sqrt(dx * dx + dy * dy) < 15;
    });
    setHoveredNode(found?.id || null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const hoveredData = hoveredNode
    ? MOCK_COLLABORATIONS.nodes.find((n) => n.id === hoveredNode)
    : null;
  const connectedLinks = hoveredNode
    ? MOCK_COLLABORATIONS.links.filter(
        (l) => l.source === hoveredNode || l.target === hoveredNode
      )
    : [];

  return (
    <div className="space-y-4">
      <Card className="border-slate-200">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
            <Users className="w-4 h-4 text-cyan-600" />
            协作关系网络
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
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" />研究员</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />博后</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />博士生</span>
            <span className="ml-auto">拖拽平移 | 滚轮缩放</span>
          </div>
        </CardContent>
      </Card>

      {hoveredData && (
        <Card className="border-cyan-200 bg-cyan-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium text-slate-800">{hoveredData.name}</span>
              <Badge variant="outline" className="text-[10px]">
                {hoveredData.role === 'researcher' ? '研究员' : hoveredData.role === 'postdoc' ? '博后' : '博士生'}
              </Badge>
            </div>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="font-medium">协作连接 ({connectedLinks.length}):</div>
              {connectedLinks.map((link, i) => {
                const otherId = link.source === hoveredNode ? link.target : link.source;
                const other = MOCK_COLLABORATIONS.nodes.find((n) => n.id === otherId);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-slate-700">{other?.name}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-cyan-600">{link.topics.join(', ')}</span>
                    <span className="text-slate-400">(强度: {(link.strength * 100).toFixed(0)}%)</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
