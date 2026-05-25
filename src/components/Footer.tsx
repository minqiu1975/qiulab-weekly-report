import KimiVersionDisplay from './KimiVersionDisplay';

export default function Footer() {
  return (
    <footer className="bg-[#1e293b] text-slate-400 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-xs">
          QiuLab-WID 智能周报分析与研判系统 &copy; {new Date().getFullYear()} 仇旻教授团队
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">西湖大学</span>
          <KimiVersionDisplay />
        </div>
      </div>
    </footer>
  );
}
