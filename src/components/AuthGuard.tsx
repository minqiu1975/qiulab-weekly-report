import { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, AlertCircle, LogIn } from 'lucide-react';

const AUTH_STORAGE_KEY = 'qiulab_auth_token';
const PASSWORD_STORAGE_KEY = 'qiulab_custom_password_hash';
const LOCKOUT_KEY = 'qiulab_lockout_until';
const ATTEMPT_COUNT_KEY = 'qiulab_attempt_count';

// Simple SHA-256 hash using Web Crypto API
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyPassword(input: string): Promise<boolean> {
  const inputHash = await sha256(input);
  const customHash = localStorage.getItem(PASSWORD_STORAGE_KEY);
  if (customHash) {
    return inputHash === customHash;
  }
  // Default password: QiuLab2026
  const defaultHash = await sha256('QiuLab2026');
  return inputHash === defaultHash;
}

function isLockedOut(): boolean {
  const lockoutUntil = sessionStorage.getItem(LOCKOUT_KEY);
  if (!lockoutUntil) return false;
  return Date.now() < parseInt(lockoutUntil, 10);
}

function getRemainingLockoutTime(): number {
  const lockoutUntil = sessionStorage.getItem(LOCKOUT_KEY);
  if (!lockoutUntil) return 0;
  const remaining = parseInt(lockoutUntil, 10) - Date.now();
  return remaining > 0 ? remaining : 0;
}

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  });
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [lockoutRemaining, setLockoutRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateLockout = useCallback(() => {
    const remaining = getRemainingLockoutTime();
    setLockoutRemaining(remaining);
    return remaining;
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      const interval = setInterval(() => {
        updateLockout();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, updateLockout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLockedOut()) {
      const remaining = getRemainingLockoutTime();
      const seconds = Math.ceil(remaining / 1000);
      setError(`登录已锁定，请 ${seconds} 秒后再试`);
      return;
    }

    if (!password.trim()) {
      setError('请输入密码');
      return;
    }

    setIsSubmitting(true);
    try {
      const isValid = await verifyPassword(password);
      if (isValid) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
        sessionStorage.removeItem(ATTEMPT_COUNT_KEY);
        sessionStorage.removeItem(LOCKOUT_KEY);
        setIsAuthenticated(true);
        setPassword('');
      } else {
        // Track failed attempts
        const attempts = parseInt(sessionStorage.getItem(ATTEMPT_COUNT_KEY) || '0', 10) + 1;
        sessionStorage.setItem(ATTEMPT_COUNT_KEY, attempts.toString());

        if (attempts >= 5) {
          // Lock out for 5 minutes
          const lockoutUntil = Date.now() + 5 * 60 * 1000;
          sessionStorage.setItem(LOCKOUT_KEY, lockoutUntil.toString());
          sessionStorage.removeItem(ATTEMPT_COUNT_KEY);
          setError('连续5次密码错误，已锁定5分钟');
          updateLockout();
        } else {
          const remainingAttempts = 5 - attempts;
          setError(`密码错误，还剩 ${remainingAttempts} 次机会`);
        }
        setPassword('');
      }
    } catch {
      setError('验证过程出错，请刷新页面重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-2xl bg-white/5 p-2 mb-4">
            <img
              src="/logo.jpg"
              alt="PAINT Lab"
              className="h-14 w-auto rounded-xl object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            仇旻实验室周报系统
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            Qiu Laboratory Weekly Report System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-white">身份验证</h2>
            <p className="text-slate-400 text-sm mt-1">
              请输入访问密码以继续浏览
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                  disabled={isSubmitting || lockoutRemaining > 0}
                  className="w-full px-4 py-3 pr-11 bg-slate-900/60 border border-slate-600/60 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || lockoutRemaining > 0 || !password.trim()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-teal-500/20 disabled:shadow-none"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  登录
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer hint */}
        <p className="text-center text-slate-500 text-xs mt-6">
          默认密码：QiuLab2026 · 登录后可在设置页面修改
        </p>
      </div>
    </div>
  );
}

// Export utilities for use in Settings page
export function logout(): void {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  window.location.reload();
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
  // Verify old password
  const isValid = await verifyPassword(oldPassword);
  if (!isValid) {
    return { success: false, message: '当前密码不正确' };
  }

  if (newPassword.length < 6) {
    return { success: false, message: '新密码至少需要6个字符' };
  }

  const newHash = await sha256(newPassword);
  localStorage.setItem(PASSWORD_STORAGE_KEY, newHash);
  return { success: true, message: '密码修改成功' };
}

export function isAuthenticated(): boolean {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}
