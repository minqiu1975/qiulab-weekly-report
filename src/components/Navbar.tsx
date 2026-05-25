import { useState } from 'react';
import { NavLink, useLocation } from 'react-router';
import {
  LayoutDashboard,
  Upload,
  UserSearch,
  TrendingUp,
  BookOpen,
  Database,
  Users,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import logoImg from '../assets/logo.jpg';
import KimiVersionDisplay from './KimiVersionDisplay';

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/upload', label: '上传', icon: Upload },
  { path: '/analysis', label: '分析', icon: UserSearch },
  { path: '/trends', label: '趋势', icon: TrendingUp },
  { path: '/literature', label: '文献', icon: BookOpen },
  { path: '/baseline', label: '基准库', icon: Database },
  { path: '/collaboration', label: '协作', icon: Users },
  { path: '/settings', label: '设置', icon: Settings },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-[#1e293b] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <img
              src={logoImg}
              alt="PAINT Lab"
              className="h-9 w-auto rounded-md bg-white/10 object-contain"
            />
            <span className="text-lg font-bold tracking-wide">周报分析</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-700 text-white'
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
            <div className="ml-2 pl-2 border-l border-slate-600">
              <KimiVersionDisplay />
            </div>
          </div>

          <button
            className="md:hidden p-2 rounded-md hover:bg-slate-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#1e293b] border-t border-slate-700 px-4 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium transition-colors mt-1 ${
                  isActive
                    ? 'bg-cyan-700 text-white'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
}
