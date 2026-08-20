import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import DataMigrationPanel from '../components/DataMigrationPanel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import {
  Settings, Users, Pencil, Save, X, GraduationCap, FlaskConical, BookOpen, UserCog, CheckCircle2, Archive,
  Cloud, CloudOff, Upload, Download, Database, RefreshCw, CheckCircle, AlertTriangle, ExternalLink,
  Lock, LogOut, Eye, EyeOff, BrainCircuit, Cpu, Zap, Trash2, Coins
} from 'lucide-react';
import { notifyPersonsUpdated } from '../hooks/usePersons';
import { useCloudStorage, cloudStorage, BaiduPanProvider, BAIDU_PAN_BUILTIN } from '../services/cloudStorage';
import type { BaiduPanConfig } from '../services/cloudStorage';
import { logout, changePassword } from '../components/AuthGuard';
import { DEFAULT_SETTINGS_MEMBERS } from '../data/mockPersons';
import type { TeamMember } from '../data/mockPersons';
import { getProvider, setProvider, getDeepSeekApiKey, setDeepSeekApiKey, getDeepSeekBaseUrl, setDeepSeekBaseUrl, type LLMProvider } from '../lib/llmApi';

// 必须与 cloudStorage.ts 中的 LS_KEYS.PERSONS 保持一致
const STORAGE_KEY = 'qlab_persons_v5';

// 角色主分类（与 Role 类型对应）
const ROLE_CATEGORY_OPTIONS = [
  { value: 'researcher', label: '研究员' },
  { value: 'associate_researcher', label: '副研究员' },
  { value: 'assistant_researcher', label: '助理研究员' },
  { value: 'postdoc', label: '博士后' },
  { value: 'phd', label: '博士生' },
  { value: 'undergraduate', label: '本科生' },
  { value: 'visitor', label: '访问学生' },
  { value: 'alumni', label: '已出站/已毕业' },
];

// 角色分组显示配置（用于统计卡片和表格）
const ROLE_GROUPS = [
  { key: 'researcher', label: '研究员', icon: 'FlaskConical', color: 'text-cyan-700', bgColor: 'bg-cyan-50' },
  { key: 'associate_researcher', label: '副研究员', icon: 'FlaskConical', color: 'text-teal-700', bgColor: 'bg-teal-50' },
  { key: 'assistant_researcher', label: '助理研究员', icon: 'FlaskConical', color: 'text-sky-700', bgColor: 'bg-sky-50' },
  { key: 'postdoc', label: '博士后', icon: 'FlaskConical', color: 'text-indigo-700', bgColor: 'bg-indigo-50' },
  { key: 'phd', label: '博士生', icon: 'GraduationCap', color: 'text-emerald-700', bgColor: 'bg-emerald-50' },
  { key: 'undergraduate', label: '本科生', icon: 'BookOpen', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  { key: 'visitor', label: '访问学生', icon: 'UserCog', color: 'text-violet-700', bgColor: 'bg-violet-50' },
  { key: 'alumni', label: '已出站/已毕业', icon: 'BookOpen', color: 'text-gray-500', bgColor: 'bg-gray-50' },
];

// 入学年份选项（2020-2035，仅博士生和本科生需要）
const ENROLLMENT_YEAR_OPTIONS = Array.from({ length: 16 }, (_, i) => 2020 + i);

const STATUS_OPTIONS = [
  { value: 'active', label: '在岗', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'graduated', label: '已毕业', color: 'bg-blue-100 text-blue-700' },
  { value: 'left', label: '已离职', color: 'bg-gray-100 text-gray-700' },
];

/** 遗留状态映射：旧数据中的其他状态显示为对应的有效状态 */
function normalizeStatusForDisplay(status: string): { label: string; color: string } {
  const found = STATUS_OPTIONS.find(o => o.value === status);
  if (found) return { label: found.label, color: found.color };
  // 遗留状态兼容
  if (status === 'inactive') return { label: '已毕业', color: 'bg-blue-100 text-blue-700' };
  if (status === 'sick' || status === 'vacation' || status === 'business_trip') return { label: '不在岗', color: 'bg-amber-100 text-amber-700' };
  if (status === 'warning') return { label: '在岗', color: 'bg-emerald-100 text-emerald-700' };
  return { label: status, color: 'bg-gray-100 text-gray-500' };
}

// ==================== 云端同步面板 ====================

type ProviderTab = 'supabase' | 'rest_api' | 'baidu_pan';

function CloudSyncPanel() {
  const {
    isCloudEnabled, isSyncing, lastSyncTime,
    syncNow, enableCloud, enableBaiduPan, disableCloud, testConnection,
    forceUploadLocal,
  } = useCloudStorage();

  // Supabase state
  const [sbUrl, setSbUrl] = useState('');
  const [sbKey, setSbKey] = useState('');

  // REST API state
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiGetPath, setApiGetPath] = useState('/qlab/data');
  const [apiSavePath, setApiSavePath] = useState('/qlab/data');

  // 百度网盘配置 - 使用内置常量，无需用户手动输入
  const bdAppKey = BAIDU_PAN_BUILTIN.appKey;
  const bdAppName = BAIDU_PAN_BUILTIN.appName;
  const [bdAuthorized] = useState(() => BaiduPanProvider.parseTokenFromUrl() !== null);
  const [bdToken, setBdToken] = useState('');
  const [bdAuthMode, setBdAuthMode] = useState<'oauth' | 'manual'>('oauth');
  const [bdError, setBdError] = useState<string | null>(null);

  const [providerTab, setProviderTab] = useState<ProviderTab>('baidu_pan'); // 百度网盘为默认推荐
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleTest = async () => {
    setTestResult(null);
    if (providerTab === 'supabase') {
      if (!sbUrl || !sbKey) {
        setTestResult({ ok: false, message: '请输入 Supabase URL 和 API Key' });
        return;
      }
    } else if (providerTab === 'baidu_pan') {
      if (!bdAppKey) {
        setTestResult({ ok: false, message: '请输入百度 App Key' });
        return;
      }
    } else {
      if (!apiUrl || !apiKey) {
        setTestResult({ ok: false, message: '请输入 API URL 和 Key' });
        return;
      }
    }
    const res = await testConnection();
    setTestResult(res);
  };

  const handleEnable = async () => {
    setBdError(null);
    if (providerTab === 'supabase') {
      // 如果有手动输入的配置则使用手动配置，否则使用内置配置
      enableCloud(sbUrl || undefined, sbKey || undefined);
    } else if (providerTab === 'baidu_pan') {
      if (!bdAppKey) return;
      if (bdAuthMode === 'manual') {
        // 手动输入 Token 模式
        if (!bdToken.trim()) {
          setBdError('请输入 Access Token');
          return;
        }
        const config: BaiduPanConfig = {
          type: 'baidu_pan',
          name: '百度网盘',
          appKey: bdAppKey,
          appName: bdAppName,
          accessToken: bdToken.trim(),
          tokenExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30天后过期
        };
        enableBaiduPan(config);
        return;
      }
      // 检查是否已授权
      const token = BaiduPanProvider.parseTokenFromUrl();
      if (token) {
        // 从URL获取了授权token
        const config: BaiduPanConfig = {
          type: 'baidu_pan',
          name: '百度网盘',
          appKey: bdAppKey,
          appName: bdAppName,
          accessToken: token.accessToken,
          tokenExpiry: new Date(Date.now() + token.expiresIn * 1000).toISOString(),
        };
        // 保存配置并启用
        enableBaiduPan(config);
        BaiduPanProvider.cleanUrl();
      } else {
        // 跳转到百度授权页面
        const provider = new BaiduPanProvider({
          type: 'baidu_pan',
          name: '百度网盘',
          appKey: bdAppKey,
          appName: bdAppName,
        });
        window.location.href = provider.getAuthorizeUrl(window.location.href.split('#')[0]);
      }
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
          {isCloudEnabled ? <Cloud className="w-4 h-4 text-emerald-500" /> : <CloudOff className="w-4 h-4 text-slate-400" />}
          跨设备云端同步
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        {/* 当前状态 */}
        <div className="flex items-center justify-between p-2 rounded bg-slate-50">
          <span className="text-xs text-slate-600">同步状态</span>
          {isCloudEnabled ? (
            <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              云端同步已启用
            </Badge>
          ) : (
            <Badge variant="outline" className="text-slate-500 flex items-center gap-1">
              <CloudOff className="w-3 h-3" />
              仅本地存储
            </Badge>
          )}
        </div>

        {isCloudEnabled && (
          <>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <span className="text-xs text-slate-600">上次同步</span>
              <span className="text-xs text-slate-500">{lastSyncTime || '未同步'}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-xs flex-1"
                onClick={syncNow}
                disabled={isSyncing}
              >
                {isSyncing ? <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> : <RefreshCw className="w-3 h-3 mr-1" />}
                {isSyncing ? '同步中...' : '立即同步'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs text-orange-600 border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                onClick={async () => {
                  if (!window.confirm(
                    '⚠️ 警告：强制本地上传将用当前浏览器的全部数据无条件覆盖云端数据！\n\n' +
                    '此操作会覆盖其他设备的数据，请确保本浏览器的数据是最新且完整的。\n\n' +
                    '确定要执行强制上传吗？'
                  )) return;
                  try {
                    await forceUploadLocal();
                    window.alert('✅ 强制上传成功！本地数据已覆盖云端。');
                  } catch {
                    window.alert('❌ 强制上传失败，请检查网络连接或云端配置。');
                  }
                }}
                disabled={isSyncing}
              >
                <Upload className="w-3 h-3 mr-1" />
                强制上传
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-xs text-red-600 hover:text-red-700"
                onClick={disableCloud}
              >
                <CloudOff className="w-3 h-3 mr-1" />
                断开云端
              </Button>
            </div>
          </>
        )}

        {/* 配置表单 */}
        {!isCloudEnabled && (
          <>
            {!showForm ? (
              <Button
                size="sm"
                variant="outline"
                className="w-full text-xs"
                onClick={() => setShowForm(true)}
              >
                <Cloud className="w-3 h-3 mr-1" />
                配置云端同步
              </Button>
            ) : (
              <div className="space-y-3">
                {/* Provider 类型选择 */}
                <div className="flex bg-slate-100 rounded-lg p-0.5">
                  <button
                    onClick={() => { setProviderTab('baidu_pan'); setTestResult(null); }}
                    className={`flex-1 text-xs py-1.5 rounded-md transition-all ${providerTab === 'baidu_pan' ? 'bg-white shadow-sm text-slate-800 font-medium' : 'text-slate-500'}`}
                  >
                    百度网盘
                  </button>
                  <button
                    onClick={() => { setProviderTab('supabase'); setTestResult(null); }}
                    className={`flex-1 text-xs py-1.5 rounded-md transition-all ${providerTab === 'supabase' ? 'bg-white shadow-sm text-slate-800 font-medium' : 'text-slate-500'}`}
                  >
                    Supabase
                  </button>
                  <button
                    onClick={() => { setProviderTab('rest_api'); setTestResult(null); }}
                    className={`flex-1 text-xs py-1.5 rounded-md transition-all ${providerTab === 'rest_api' ? 'bg-white shadow-sm text-slate-800 font-medium' : 'text-slate-500'}`}
                  >
                    通用 REST
                  </button>
                </div>

                {providerTab === 'supabase' ? (
                  <>
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed">
                      <div className="font-semibold mb-1.5 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                        Supabase 同步（已停用默认配置）
                      </div>
                      <p className="mb-2">此前内置的 Supabase 项目已停止自动启用。如需继续使用，请自行创建 Supabase 项目并输入配置。</p>
                      <ol className="list-decimal list-outside ml-3.5 space-y-1">
                        <li>访问 <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="underline font-medium inline-flex items-center gap-0.5">Supabase 官网 <ExternalLink className="w-2.5 h-2.5" /></a>，用邮箱注册/登录</li>
                        <li>点击「New project」，创建项目（如 <code className="bg-slate-100 px-1 rounded">qlab-sync</code>）</li>
                        <li>进入 <strong>Database → Tables</strong>，创建表 <code className="bg-slate-100 px-1 rounded">qlab_data</code></li>
                        <li>添加字段：data (jsonb)、created_at、updated_at</li>
                        <li>进入 <strong>Project Settings → API</strong>，复制 URL 和 anon Key 填入下方</li>
                      </ol>
                    </div>

                    <details className="text-xs">
                      <summary className="cursor-pointer text-slate-600 hover:text-slate-800 py-1">手动配置 Supabase 项目</summary>
                      <div className="space-y-2 mt-2 pt-2 border-t border-slate-200">
                        <div>
                          <label className="text-xs text-slate-600 mb-1 block">Project URL</label>
                          <Input placeholder="https://xxxxx.supabase.co" value={sbUrl} onChange={(e) => setSbUrl(e.target.value)} className="text-xs h-8" />
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-1 block">anon public API Key</label>
                          <Input type="password" placeholder="eyJhbGci..." value={sbKey} onChange={(e) => setSbKey(e.target.value)} className="text-xs h-8" />
                        </div>
                      </div>
                    </details>
                  </>
                ) : providerTab === 'baidu_pan' ? (
                  <>
                    <div className="p-2 rounded bg-blue-50 border border-blue-200 text-blue-800 text-xs leading-relaxed">
                      <div className="font-semibold mb-1.5 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        百度网盘同步（推荐）
                      </div>
                      <p className="mb-2">数据以 JSON 文件形式存储在您的百度网盘 <code className="bg-blue-100 px-1 rounded">/apps/qlabwid/qlab-data.json</code>，仅本应用可访问该目录。</p>
                      <ul className="list-disc list-outside ml-3.5 space-y-1">
                        <li>免费，无需额外注册数据库服务</li>
                        <li>数据完全由您掌控，存储在个人网盘</li>
                        <li>支持跨设备同步，换电脑后登录同一百度账号即可恢复数据</li>
                        <li>Token 30 天过期，届时需要重新点击授权</li>
                      </ul>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-600">应用</span>
                      <code className="text-xs text-slate-500 bg-white px-2 py-0.5 rounded border">{bdAppName}</code>
                    </div>

                    {/* 授权模式切换 */}
                    <div className="flex bg-slate-100 rounded-lg p-0.5">
                      <button
                        onClick={() => { setBdAuthMode('oauth'); setBdError(null); }}
                        className={`flex-1 text-xs py-1.5 rounded-md transition-all ${bdAuthMode === 'oauth' ? 'bg-white shadow-sm text-slate-800 font-medium' : 'text-slate-500'}`}
                      >
                        跳转授权
                      </button>
                      <button
                        onClick={() => { setBdAuthMode('manual'); setBdError(null); }}
                        className={`flex-1 text-xs py-1.5 rounded-md transition-all ${bdAuthMode === 'manual' ? 'bg-white shadow-sm text-slate-800 font-medium' : 'text-slate-500'}`}
                      >
                        手动输入 Token
                      </button>
                    </div>

                    {bdAuthMode === 'oauth' ? (
                      <>
                        {bdAuthorized ? (
                          <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-1.5">
                            <CheckCircle className="w-3 h-3" />
                            已检测到授权回调，点击「启用同步」即可
                          </div>
                        ) : (
                          <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-700 text-xs leading-relaxed">
                            <div className="font-medium mb-1">首次使用需要授权</div>
                            <p>点击「前往授权」会跳转至百度登录页面，登录后自动返回本页面。请确保百度账号与当前网盘一致。</p>
                            <div className="mt-1.5 p-1.5 bg-white/50 rounded text-amber-800">
                              <strong>若报错 referer_mismatch：</strong>需要在百度开放平台 → 应用管理 → qlabwid → 安全设置中，添加授权回调地址：
                              <code className="block mt-1 bg-amber-100 px-1 py-0.5 rounded break-all text-[10px]">
                                {typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://your-domain.github.io/qiulab-weekly-report/'}
                              </code>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <div className="p-2 rounded bg-blue-50 border border-blue-200 text-blue-700 text-xs leading-relaxed">
                          <div className="font-medium mb-1">手动输入 Access Token</div>
                          <p>如果跳转授权失败，可以通过以下方式获取 Token：</p>
                          <ol className="list-decimal list-outside ml-3.5 space-y-0.5 mt-1">
                            <li>访问 <a href="https://openapi.baidu.com/oauth/2.0/authorize?client_id=dnuMdkQeUNEqfJAR732aLVZkK1SXrkia&response_type=token&redirect_uri=oob&scope=basic%20netdisk&display=page" target="_blank" rel="noreferrer" className="underline">百度授权页面</a>（oob 模式）</li>
                            <li>登录百度账号并授权</li>
                            <li>授权页面会显示 access_token，复制后粘贴到下方</li>
                          </ol>
                        </div>
                        <div>
                          <label className="text-xs text-slate-600 mb-1 block">Access Token</label>
                          <Input
                            type="password"
                            placeholder="粘贴 access_token 到此处..."
                            value={bdToken}
                            onChange={(e) => setBdToken(e.target.value)}
                            className="text-xs h-8"
                          />
                        </div>
                      </div>
                    )}

                    {bdError && (
                      <div className="p-2 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3" />
                        {bdError}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="p-2 rounded bg-purple-50 border border-purple-200 text-purple-700 text-xs leading-relaxed">
                      <div className="font-medium mb-1">通用 REST API 配置</div>
                      <p className="mb-1">适配任何支持 HTTP 的后端服务（阿里云、百度云、自有服务器等）。</p>
                      <p className="mb-1">您的后端需要实现两个接口：</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li><code className="bg-purple-100 px-1">GET /qlab/data</code> - 返回完整数据对象</li>
                        <li><code className="bg-purple-100 px-1">POST /qlab/data</code> - 接收并保存完整数据</li>
                      </ul>
                      <p className="mt-1">请求头自动携带 <code className="bg-purple-100 px-1">Authorization: Bearer {'{apiKey}'}</code></p>
                    </div>

                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">API Base URL</label>
                      <Input placeholder="https://my-api.example.com" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} className="text-xs h-8" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">API Key / Token</label>
                      <Input type="password" placeholder="your-api-key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="text-xs h-8" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-slate-600 mb-1 block">读取端点</label>
                        <Input placeholder="/qlab/data" value={apiGetPath} onChange={(e) => setApiGetPath(e.target.value)} className="text-xs h-8" />
                      </div>
                      <div>
                        <label className="text-xs text-slate-600 mb-1 block">保存端点</label>
                        <Input placeholder="/qlab/data" value={apiSavePath} onChange={(e) => setApiSavePath(e.target.value)} className="text-xs h-8" />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs flex-1" onClick={handleTest}>
                    <Database className="w-3 h-3 mr-1" />
                    测试连接
                  </Button>
                  <Button size="sm" className="text-xs flex-1 bg-cyan-600 hover:bg-cyan-700" onClick={handleEnable}>
                    <Cloud className="w-3 h-3 mr-1" />
                    {providerTab === 'baidu_pan' && bdAuthMode === 'oauth' && !bdAuthorized ? '前往授权' : '启用同步'}
                  </Button>
                </div>

                {testResult && (
                  <div className={`p-2 rounded text-xs flex items-center gap-1.5 ${
                    testResult.ok ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {testResult.ok ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                    {testResult.message}
                  </div>
                )}

                <Button size="sm" variant="ghost" className="w-full text-xs text-slate-500" onClick={() => setShowForm(false)}>
                  取消
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== Kimi API Key 配置面板 ====================

// 内置默认 Key（与 DeepAnalysisPanel.tsx 保持一致）
const DEFAULT_MOONSHOT_URL = 'https://api.moonshot.cn/v1';

function LLMConfigPanel() {
  const [provider, setProviderState] = useState<LLMProvider>(getProvider);

  // Kimi state (shared between k2.6 and k3.0)
  const [kimiApiKey, setKimiApiKey] = useState(() => localStorage.getItem('qlab_moonshot_api_key') || '');
  const [kimiApiUrl, setKimiApiUrl] = useState(() => localStorage.getItem('qlab_moonshot_api_url') || DEFAULT_MOONSHOT_URL);

  // DeepSeek state
  const [dsApiKey, setDsApiKey] = useState(() => getDeepSeekApiKey());
  const [dsApiUrl, setDsApiUrl] = useState(() => getDeepSeekBaseUrl());

  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasKimiKey = !!kimiApiKey;
  const isCustomKimiUrl = !!kimiApiUrl && kimiApiUrl !== DEFAULT_MOONSHOT_URL;
  const hasDsKey = !!dsApiKey;
  const isKimi26 = provider === 'kimi26';
  const isKimi30 = provider === 'kimi30';
  const isDeepSeekFlash = provider === 'deepseek-flash';
  const isDeepSeekPro = provider === 'deepseek-pro';
  const isDeepSeek = isDeepSeekFlash || isDeepSeekPro;
  const isKimi = isKimi26 || isKimi30;

  const switchProvider = (p: LLMProvider) => {
    setProvider(p);          // 保存到 localStorage
    setProviderState(p);     // 触发 React 重新渲染
    setSaved(false);
  };

  const handleSave = () => {
    // Save Kimi config
    if (kimiApiKey.trim()) {
      localStorage.setItem('qlab_moonshot_api_key', kimiApiKey.trim());
    } else {
      localStorage.removeItem('qlab_moonshot_api_key');
      setKimiApiKey('');
    }
    if (kimiApiUrl.trim()) {
      localStorage.setItem('qlab_moonshot_api_url', kimiApiUrl.trim());
    } else {
      localStorage.removeItem('qlab_moonshot_api_url');
      setKimiApiUrl(DEFAULT_MOONSHOT_URL);
    }
    // Save DeepSeek config
    setDeepSeekApiKey(dsApiKey.trim());
    setDeepSeekBaseUrl(dsApiUrl.trim());

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setKimiApiKey('');
    setKimiApiUrl(DEFAULT_MOONSHOT_URL);
    localStorage.removeItem('qlab_moonshot_api_key');
    localStorage.removeItem('qlab_moonshot_api_url');

    setDsApiKey('');
    setDsApiUrl('https://api.deepseek.com/v1');
    setDeepSeekApiKey('');
    setDeepSeekBaseUrl('');

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
          <BrainCircuit className="w-4 h-4 text-cyan-600" />
          AI 模型配置
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <div className="text-xs text-slate-500 leading-relaxed">
          选择用于周报分析、深度评估和科研协作分析的 AI 模型。Kimi-K2.6 / Kimi-K3 和 DeepSeek-V4-Flash / DeepSeek-V4-Pro 均需要自行配置 API Key，Key 仅保存在浏览器本地，不会上传到服务器。
        </div>

        {/* Provider 选择 */}
        <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
          <label className="text-xs font-medium text-slate-700">选择 AI 模型</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => switchProvider('kimi26')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                isKimi26
                  ? 'border-cyan-300 bg-cyan-50 text-cyan-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <Cpu className={`w-4 h-4 ${isKimi26 ? 'text-cyan-600' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="font-medium">Kimi-K2.6</div>
                <div className="text-[10px] opacity-70">需配置 API Key</div>
              </div>
              {isKimi26 && <CheckCircle className="w-4 h-4 text-cyan-600 ml-auto" />}
            </button>

            <button
              onClick={() => switchProvider('kimi30')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                isKimi30
                  ? 'border-teal-300 bg-teal-50 text-teal-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <Cpu className={`w-4 h-4 ${isKimi30 ? 'text-teal-600' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="font-medium">Kimi-K3</div>
                <div className="text-[10px] opacity-70">需配置 API Key</div>
              </div>
              {isKimi30 && <CheckCircle className="w-4 h-4 text-teal-600 ml-auto" />}
            </button>

            <button
              onClick={() => switchProvider('deepseek-flash')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                isDeepSeekFlash
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDeepSeekFlash ? 'text-indigo-600' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="font-medium">DeepSeek-V4-Flash</div>
                <div className="text-[10px] opacity-70">速度快·价格低</div>
              </div>
              {isDeepSeekFlash && <CheckCircle className="w-4 h-4 text-indigo-600 ml-auto" />}
            </button>

            <button
              onClick={() => switchProvider('deepseek-pro')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                isDeepSeekPro
                  ? 'border-violet-300 bg-violet-50 text-violet-800'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDeepSeekPro ? 'text-violet-600' : 'text-slate-400'}`} />
              <div className="text-left">
                <div className="font-medium">DeepSeek-V4-Pro</div>
                <div className="text-[10px] opacity-70">能力强·价格较高</div>
              </div>
              {isDeepSeekPro && <CheckCircle className="w-4 h-4 text-violet-600 ml-auto" />}
            </button>
          </div>
        </div>

        {/* Kimi 配置 */}
        {isKimi && (
          <div className="space-y-3">
            <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                端点选择说明
              </div>
              <ul className="list-disc list-outside ml-3.5 space-y-1">
                <li><strong>api.moonshot.cn</strong>（默认）— 对应中国大陆站 platform.moonshot.cn 注册的 Key</li>
                <li><strong>api.moonshot.ai</strong> — 对应国际站 platform.moonshot.ai 注册的 Key</li>
                <li>两个端点的 Key 不互通，用错会报 401 Invalid Authentication</li>
              </ul>
            </div>

            <div className="p-2 rounded bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs leading-relaxed">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <Coins className="w-3.5 h-3.5" />
                定价说明
              </div>
              <ul className="list-disc list-outside ml-3.5 space-y-1">
                <li><strong>Kimi-K2.6</strong>: 缓存命中 ¥1.10/M · 输入 ¥6.50/M · 输出 ¥27.00/M</li>
                <li><strong>Kimi-K3</strong>: 缓存命中 ¥2.00/M · 输入 ¥20.00/M · 输出 ¥100.00/M</li>
                <li>K3 价格显著高于 K2.6，请根据分析精度需求选择</li>
              </ul>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <span className="text-xs text-slate-600">Kimi 状态</span>
              <div className="flex gap-1">
                {hasKimiKey ? (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />已配置 Key
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />未配置 Key
                  </Badge>
                )}
                <Badge className={`flex items-center gap-1 ${isCustomKimiUrl ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {kimiApiUrl.includes('.ai') ? '国际站' : '中国站'}
                </Badge>
                <Badge className={`flex items-center gap-1 ${isKimi30 ? 'bg-teal-100 text-teal-700 border-teal-200' : 'bg-cyan-100 text-cyan-700 border-cyan-200'}`}>
                  <Cpu className="w-3 h-3" /> {isKimi30 ? 'Kimi-K3' : 'Kimi-K2.6'}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1 block">Kimi API 端点</label>
              <select
                value={kimiApiUrl}
                onChange={(e) => setKimiApiUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
              >
                <option value="https://api.moonshot.cn/v1">https://api.moonshot.cn/v1（中国站）</option>
                <option value="https://api.moonshot.ai/v1">https://api.moonshot.ai/v1（国际站）</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1 block">Moonshot API Key</label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={kimiApiKey}
                  onChange={(e) => setKimiApiKey(e.target.value)}
                  placeholder="sk-... 从 platform.moonshot.cn 获取"
                  className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DeepSeek 配置 */}
        {isDeepSeek && (
          <div className="space-y-3">
            <div className="p-2 rounded bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs leading-relaxed">
              <div className="font-semibold mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                DeepSeek 配置说明
              </div>
              <ul className="list-disc list-outside ml-3.5 space-y-1">
                <li>需要自行在 <a href="https://platform.deepseek.com/" target="_blank" rel="noreferrer" className="underline">platform.deepseek.com</a> 注册并获取 API Key</li>
                <li>默认使用官方端点 <strong>api.deepseek.com</strong>，通常无需修改</li>
                <li>当前选择: <strong>{isDeepSeekPro ? 'deepseek-v4-pro（能力最强）' : 'deepseek-v4-flash（速度快·价格低）'}</strong></li>
                <li>闲时价格（非高峰）: Flash 输入 ¥1.5/M·输出 ¥4.5/M ｜ Pro 输入 ¥4.5/M·输出 ¥13.5/M</li>
                <li>高峰时段（北京时间 9:00-12:00, 14:00-18:00）价格为闲时的 2 倍</li>
              </ul>
            </div>

            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <span className="text-xs text-slate-600">DeepSeek 状态</span>
              <div className="flex gap-1">
                {hasDsKey ? (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />已配置 Key
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 border-red-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />未配置 Key
                  </Badge>
                )}
                <Badge className={`flex items-center gap-1 ${isDeepSeekPro ? 'bg-violet-100 text-violet-700 border-violet-200' : 'bg-indigo-100 text-indigo-700 border-indigo-200'}`}>
                  <Zap className="w-3 h-3" /> {isDeepSeekPro ? 'V4-Pro' : 'V4-Flash'}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1 block">DeepSeek API 端点</label>
              <select
                value={dsApiUrl}
                onChange={(e) => setDsApiUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
              >
                <option value="https://api.deepseek.com/v1">https://api.deepseek.com/v1（官方）</option>
                <option value="https://api.deepseek.com/v1">其他（手动输入）</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-600 mb-1 block">DeepSeek API Key <span className="text-red-500">*</span></label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={dsApiKey}
                  onChange={(e) => setDsApiKey(e.target.value)}
                  placeholder="sk-... 从 platform.deepseek.com 获取"
                  className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">未配置 Key 时无法使用 DeepSeek 进行分析。</p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button size="sm" className={`text-xs flex-1 ${
            isDeepSeekPro ? 'bg-violet-600 hover:bg-violet-700' : 
            isDeepSeekFlash ? 'bg-indigo-600 hover:bg-indigo-700' : 
            isKimi30 ? 'bg-teal-600 hover:bg-teal-700' : 
            'bg-cyan-600 hover:bg-cyan-700'
          }`} onClick={handleSave}>
            <CheckCircle className="w-3 h-3 mr-1" />
            保存配置
          </Button>
          <Button size="sm" variant="outline" className="text-xs text-red-600 hover:text-red-700" onClick={handleClear}>
            <X className="w-3 h-3 mr-1" />
            恢复默认
          </Button>
        </div>

        {saved && (
          <div className={`p-2 rounded border text-xs flex items-center gap-1.5 ${
            isDeepSeekPro ? 'bg-violet-50 border-violet-200 text-violet-700' : 
            isDeepSeekFlash ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 
            isKimi30 ? 'bg-teal-50 border-teal-200 text-teal-700' : 
            'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            <CheckCircle className="w-3 h-3" />
            配置已保存
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== 数据备份面板 ====================

function DataBackupPanel() {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [importError, setImportError] = useState('');

  const handleExport = () => {
    try {
      const data = cloudStorage.exportToJSON();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qlab-wid-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (e) {
      console.error('Export failed:', e);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        cloudStorage.importFromJSON(json);
        setImportSuccess(true);
        setImportError('');
        window.dispatchEvent(new CustomEvent('qlab-persons-updated'));
        setTimeout(() => {
          setImportSuccess(false);
          window.location.reload();
        }, 2000);
      } catch (err) {
        setImportError(err instanceof Error ? err.message : '文件格式错误');
        setImportSuccess(false);
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
          <Database className="w-4 h-4 text-cyan-600" />
          数据备份与迁移
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <div className="text-xs text-slate-500 leading-relaxed">
          如果您没有配置云端同步，可以通过导出/导入 JSON 文件在不同设备间手动迁移数据。
          在办公室电脑上导出，将文件发送到手机，在手机上导入即可。
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-xs flex-1" onClick={handleExport}>
            <Download className="w-3 h-3 mr-1" />
            导出全部数据
          </Button>
          <label className="flex-1">
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
            <Button size="sm" variant="outline" className="text-xs w-full" asChild>
              <span><Upload className="w-3 h-3 mr-1" />导入数据</span>
            </Button>
          </label>
        </div>

        {exportSuccess && (
          <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3" />
            数据导出成功！请保存好 JSON 文件
          </div>
        )}

        {importSuccess && (
          <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-1.5">
            <CheckCircle className="w-3 h-3" />
            数据导入成功！正在刷新页面...
          </div>
        )}

        {importError && (
          <div className="p-2 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-1.5">
            <AlertTriangle className="w-3 h-3" />
            {importError}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==================== 密码管理面板 ====================

function PasswordPanel() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isChanging, setIsChanging] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage('请填写所有字段');
      setIsError(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('两次输入的新密码不一致');
      setIsError(true);
      return;
    }
    if (newPassword.length < 6) {
      setMessage('新密码至少需要6个字符');
      setIsError(true);
      return;
    }

    setIsChanging(true);
    try {
      const result = await changePassword(oldPassword, newPassword);
      setMessage(result.message);
      setIsError(!result.success);
      if (result.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      setMessage('修改密码时出错');
      setIsError(true);
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <Card className="border-slate-200">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
          <Lock className="w-4 h-4 text-amber-600" />
          访问密码管理
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <form onSubmit={handleChangePassword} className="space-y-3">
          <div>
            <label className="text-xs text-slate-600 mb-1 block">当前密码</label>
            <div className="relative">
              <input
                type={showOld ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="输入当前密码"
                className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
              <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-600 mb-1 block">新密码</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="至少6个字符"
                className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-600 mb-1 block">确认新密码</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="再次输入新密码"
                className="w-full px-3 py-2 pr-10 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500"
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {message && (
            <div className={`p-2 rounded text-xs flex items-center gap-1.5 ${
              isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {isError ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isChanging}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 disabled:from-slate-400 disabled:to-slate-400 text-white font-medium py-2.5 rounded-xl transition-all text-sm"
          >
            {isChanging ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-3.5 h-3.5" />
                修改密码
              </>
            )}
          </button>
        </form>

        <div className="border-t border-slate-200 pt-3 mt-3">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium py-2.5 rounded-xl transition-all text-sm border border-red-200"
          >
            <LogOut className="w-3.5 h-3.5" />
            退出登录
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// 从 mockPersons.ts 自动生成，确保 ID 与 ALL_PERSONS 完全一致
const DEFAULT_MEMBERS = DEFAULT_SETTINGS_MEMBERS;

function loadMembers(): TeamMember[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return DEFAULT_MEMBERS;
}

async function syncToCloud(members: TeamMember[]): Promise<void> {
  const now = new Date().toISOString();
  // 1. 先保存 persons 和 lastModified 到本地
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  localStorage.setItem('qlab_last_modified', JSON.stringify(now));

  // 2. 调用 loadAllData 拉取云端数据并合并（保留其他浏览器的 dynamic 数据）
  //    如果失败（网络问题），继续推送本地数据，不要中断
  try {
    await cloudStorage.loadAllData();
  } catch (e) {
    console.warn('[syncToCloud] loadAllData 失败，继续推送本地数据:', e);
  }

  // 3. 重新设置 persons 和 lastModified（确保人员修改不丢失）
  localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
  localStorage.setItem('qlab_last_modified', JSON.stringify(now));

  // 4. 推送合并后的数据（正确 persons + 合并后的完整 dynamic）到云端
  await cloudStorage.saveAllData(cloudStorage.loadFromLocal());
}

function saveMembers(members: TeamMember[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    // 更新 lastModified，确保 loadAllData 知道本地有最新编辑
    localStorage.setItem('qlab_last_modified', JSON.stringify(new Date().toISOString()));
    // 通知其他页面人员数据已更新
    window.dispatchEvent(new CustomEvent('qlab-persons-updated'));

    // 同时触发云端同步（如果已启用）
    if (cloudStorage.isCloudEnabled()) {
      syncToCloud(members).catch((e) => {
        console.error('[Settings] 云端同步失败:', e);
      });
    }
  } catch (e) {
    console.error('[Settings] saveMembers 异常:', e);
  }
}

export default function SettingsPage() {
  const [members, setMembers] = useState<TeamMember[]>(loadMembers);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<TeamMember | null>(null);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'team' | 'system'>('team');

  useEffect(() => {
    saveMembers(members);
    if (saved) {
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [members, saved]);

  const startEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setEditForm({ ...m });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const confirmEdit = () => {
    if (!editForm) return;
    const updated = members.map(m => m.id === editForm.id ? editForm : m);
    setMembers(updated);
    saveMembers(updated);  // 保存到 localStorage + 云端同步
    setEditingId(null);
    setEditForm(null);
    setSaved(true);
    notifyPersonsUpdated();
  };

  const handleDeleteMember = (m: TeamMember) => {
    if (!window.confirm(`确定要删除成员「${m.name}」吗？\n\n此操作不可恢复。`)) return;
    const updated = members.filter(member => member.id !== m.id);
    setMembers(updated);
    saveMembers(updated);
    setSaved(true);
    notifyPersonsUpdated();
  };

  const getStatusBadge = (status: string) => {
    const { label, color } = normalizeStatusForDisplay(status);
    return <Badge className={color}>{label}</Badge>;
  };

  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<TeamMember>({
    id: '', name: '', role: 'phd', roleLabel: '博士生', subRole: `${new Date().getFullYear()}级`,
    researchDirection: '', joinDate: new Date().toISOString().slice(0, 10),
    status: 'active', group: 'phd', enrollmentYear: new Date().getFullYear(),
    programDuration: 5,
  });

  // 生成新成员ID
  const generateNewId = (role: string) => {
    const prefix = role === 'phd' ? 'd' : role === 'undergraduate' ? 'x' : 'p';
    const existingIds = members.filter(m => m.id.startsWith(prefix)).map(m => {
      const num = parseInt(m.id.slice(prefix.length));
      return isNaN(num) ? 0 : num;
    });
    const maxId = existingIds.length > 0 ? Math.max(...existingIds) : 0;
    return `${prefix}${maxId + 1}`;
  };

  const startAdd = () => {
    const defaultRole = 'phd';
    const newId = generateNewId(defaultRole);
    const currentYear = new Date().getFullYear();
    setAddForm({
      id: newId, name: '', role: defaultRole, roleLabel: '博士生',
      subRole: `${currentYear}级`, researchDirection: '',
      joinDate: new Date().toISOString().slice(0, 10), status: 'active',
      group: defaultRole, enrollmentYear: currentYear,
    });
    setShowAddForm(true);
  };

  const cancelAdd = () => {
    setShowAddForm(false);
  };

  const confirmAdd = () => {
    if (!addForm.name.trim()) return;
    const newMember: TeamMember = {
      ...addForm,
      id: generateNewId(addForm.role),
      name: addForm.name.trim(),
    };
    const updated = [...members, newMember];
    setMembers(updated);
    saveMembers(updated);
    setShowAddForm(false);
    setSaved(true);
    notifyPersonsUpdated();
  };

  // 按角色分组（排除已毕业/已离职/已出站等非活跃成员）
  const getMembersByRole = (role: string) => members.filter(m => m.role === role && m.status !== 'graduated' && m.status !== 'left' && m.status !== 'inactive');
  // 已毕业/已离职/已出站的成员
  const inactiveMembers = members.filter(m => m.status === 'graduated' || m.status === 'left' || m.status === 'inactive');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">系统设置</h1>
          <p className="text-sm text-slate-500 mt-0.5">团队成员管理与系统配置</p>
        </div>
        {saved && (
          <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 已保存（自动同步到云端）
          </Badge>
        )}
      </div>

      {/* Tab切换 */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('team')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'team' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Users className="w-4 h-4 inline mr-1" />
          团队成员
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === 'system' ? 'border-cyan-600 text-cyan-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
        >
          <Settings className="w-4 h-4 inline mr-1" />
          系统配置
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="space-y-6">
          {/* 统计卡片 - 动态显示有成员的角色分组 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-slate-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">{members.filter(m => m.status !== 'graduated' && m.status !== 'left' && m.status !== 'inactive').length}</div>
                <div className="text-xs text-slate-500">活跃成员总数</div>
              </CardContent>
            </Card>
            {ROLE_GROUPS.filter(g => getMembersByRole(g.key).length > 0).map(g => (
              <Card key={g.key} className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <div className={`text-2xl font-bold ${g.color}`}>{getMembersByRole(g.key).length}</div>
                  <div className="text-xs text-slate-500">{g.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 新增成员按钮 */}
          <div className="flex justify-end">
            <Button
              size="sm"
              className="bg-cyan-600 hover:bg-cyan-700 text-xs"
              onClick={startAdd}
              disabled={showAddForm}
            >
              <Users className="w-3.5 h-3.5 mr-1" />
              新增成员
            </Button>
          </div>

          {/* 新增成员表单 */}
          {showAddForm && (
            <Card className="border-cyan-200 bg-cyan-50/30">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-cyan-700">
                  <Users className="w-4 h-4" />
                  新增成员
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">姓名 <span className="text-red-500">*</span></label>
                    <Input
                      value={addForm.name}
                      onChange={e => setAddForm({ ...addForm, name: e.target.value })}
                      placeholder="请输入姓名"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">角色类别</label>
                    <Select
                      value={addForm.role}
                      onValueChange={v => {
                        const newRoleLabel = ROLE_CATEGORY_OPTIONS.find(r => r.value === v)?.label || addForm.roleLabel;
                        const currentYear = new Date().getFullYear();
                        const isStudent = v === 'phd' || v === 'undergraduate';
                        setAddForm({
                          ...addForm,
                          role: v,
                          roleLabel: newRoleLabel,
                          id: generateNewId(v),
                          subRole: isStudent ? `${currentYear}级` : newRoleLabel,
                          enrollmentYear: isStudent ? currentYear : undefined,
                        });
                      }}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLE_CATEGORY_OPTIONS.filter(r => r.value !== 'alumni').map(r => (
                          <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {(addForm.role === 'phd' || addForm.role === 'undergraduate') && (
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">入学年份</label>
                      <Select
                        value={String(addForm.enrollmentYear || '')}
                        onValueChange={v => {
                          const year = Number(v);
                          setAddForm({ ...addForm, enrollmentYear: year, subRole: `${year}级` });
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {ENROLLMENT_YEAR_OPTIONS.map(y => <SelectItem key={y} value={String(y)}>{y}级</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {addForm.role === 'phd' && (
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">学制</label>
                      <Select
                        value={String(addForm.programDuration || 5)}
                        onValueChange={v => {
                          setAddForm({ ...addForm, programDuration: Number(v) });
                        }}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4">4年制</SelectItem>
                          <SelectItem value="5">5年制</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">研究方向</label>
                    <Input
                      value={addForm.researchDirection}
                      onChange={e => setAddForm({ ...addForm, researchDirection: e.target.value })}
                      placeholder="研究方向"
                      className="h-8 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-600 mb-1 block">入组日期</label>
                    <Input
                      type="date"
                      value={addForm.joinDate}
                      onChange={e => setAddForm({ ...addForm, joinDate: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  {addForm.role === 'postdoc' && (
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">出站日期</label>
                      <Input
                        type="date"
                        value={addForm.exitDate || ''}
                        onChange={e => setAddForm({ ...addForm, exitDate: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                  )}
                  {(addForm.role === 'researcher' || addForm.role === 'associate_researcher' || addForm.role === 'assistant_researcher') && (
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">合同到期日期</label>
                      <Input
                        type="date"
                        value={addForm.contractEndDate || ''}
                        onChange={e => setAddForm({ ...addForm, contractEndDate: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                  )}
                  {addForm.role === 'visitor' && (
                    <div>
                      <label className="text-xs text-slate-600 mb-1 block">访问结束日期</label>
                      <Input
                        type="date"
                        value={addForm.exitDate || ''}
                        onChange={e => setAddForm({ ...addForm, exitDate: e.target.value })}
                        className="h-8 text-sm"
                      />
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs bg-cyan-600 hover:bg-cyan-700" onClick={confirmAdd} disabled={!addForm.name.trim()}>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    确认添加
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs" onClick={cancelAdd}>
                    <X className="w-3 h-3 mr-1" />
                    取消
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 按角色分组的表格 */}
          {ROLE_GROUPS.map(group => {
            const groupMembers = getMembersByRole(group.key);
            if (groupMembers.length === 0) return null;
            return (
              <Card key={group.key} className="border-slate-200">
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                    {group.key === 'phd' ? <GraduationCap className={`w-4 h-4 ${group.color}`} /> :
                     group.key === 'undergraduate' ? <BookOpen className={`w-4 h-4 ${group.color}`} /> :
                     group.key === 'visitor' ? <UserCog className={`w-4 h-4 ${group.color}`} /> :
                     <FlaskConical className={`w-4 h-4 ${group.color}`} />}
                    {group.label} ({groupMembers.length}人)
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="text-xs">姓名</TableHead>
                          <TableHead className="text-xs">角色类别</TableHead>
                          <TableHead className="text-xs">研究方向</TableHead>
                          <TableHead className="text-xs">状态</TableHead>
                          <TableHead className="text-xs">入组日期</TableHead>
                          <TableHead className="text-xs">出站/到期</TableHead>
                          <TableHead className="text-xs">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {groupMembers.map(m => (
                          <TableRow key={m.id} className="hover:bg-slate-50">
                            {editingId === m.id && editForm ? (
                              <>
                                <TableCell>
                                  <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="h-8 text-sm" />
                                </TableCell>
                                <TableCell className="space-y-1">
                                  {/* 角色主分类选择 */}
                                  <Select
                                    value={editForm.role}
                                    onValueChange={v => {
                                      const newRole = v;
                                      const newRoleLabel = ROLE_CATEGORY_OPTIONS.find(r => r.value === newRole)?.label || editForm.roleLabel;
                                      const defaultYear = 2024;
                                      const isStudent = newRole === 'phd' || newRole === 'undergraduate';
                                      setEditForm({
                                        ...editForm,
                                        role: newRole,
                                        roleLabel: newRoleLabel,
                                        group: newRole,
                                        subRole: isStudent ? `${defaultYear}级` : newRoleLabel,
                                        enrollmentYear: isStudent ? defaultYear : undefined,
                                      });
                                    }}
                                  >
                                    <SelectTrigger className="h-7 text-xs w-[130px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {ROLE_CATEGORY_OPTIONS.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                  {/* 入学年份（仅博士生和本科生） */}
                                  {(editForm.role === 'phd' || editForm.role === 'undergraduate') && (
                                    <Select
                                      value={String(editForm.enrollmentYear || '')}
                                      onValueChange={v => {
                                        const year = Number(v);
                                        const duration = editForm.programDuration || 5;
                                        const newGradDate = `${year + duration}-06-30`;
                                        setEditForm({ ...editForm, enrollmentYear: year, subRole: `${year}级`, graduationDate: newGradDate });
                                      }}
                                    >
                                      <SelectTrigger className="h-7 text-xs w-[100px]">
                                        <SelectValue placeholder="入学年份" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {ENROLLMENT_YEAR_OPTIONS.map(y => <SelectItem key={y} value={String(y)}>{y}级</SelectItem>)}
                                      </SelectContent>
                                    </Select>
                                  )}
                                  {/* 学制（仅博士生） */}
                                  {editForm.role === 'phd' && (
                                    <Select
                                      value={String(editForm.programDuration || 5)}
                                      onValueChange={v => {
                                        const duration = Number(v);
                                        const year = editForm.enrollmentYear || 2024;
                                        const newGradDate = `${year + duration}-06-30`;
                                        setEditForm({ ...editForm, programDuration: duration, graduationDate: newGradDate });
                                      }}
                                    >
                                      <SelectTrigger className="h-7 text-xs w-[80px]">
                                        <SelectValue placeholder="学制" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="4">4年制</SelectItem>
                                        <SelectItem value="5">5年制</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <Input value={editForm.researchDirection} onChange={e => setEditForm({ ...editForm, researchDirection: e.target.value })} className="h-8 text-sm" />
                                </TableCell>
                                <TableCell>
                                  <Select value={editForm.status} onValueChange={v => setEditForm({ ...editForm, status: v })}>
                                    <SelectTrigger className="h-8 text-sm w-[100px]">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {STATUS_OPTIONS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                                    </SelectContent>
                                  </Select>
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="date"
                                    value={editForm.joinDate || ''}
                                    onChange={e => setEditForm({ ...editForm, joinDate: e.target.value })}
                                    className="h-7 text-xs w-[130px]"
                                  />
                                </TableCell>
                                <TableCell>
                                  {editForm.role === 'phd' && (
                                    <Input
                                      type="date"
                                      value={editForm.graduationDate || ''}
                                      onChange={e => setEditForm({ ...editForm, graduationDate: e.target.value })}
                                      className="h-7 text-xs w-[130px]"
                                      placeholder="预计毕业日期"
                                    />
                                  )}
                                  {editForm.role === 'postdoc' && (
                                    <Input
                                      type="date"
                                      value={editForm.exitDate || ''}
                                      onChange={e => setEditForm({ ...editForm, exitDate: e.target.value })}
                                      className="h-7 text-xs w-[130px]"
                                      placeholder="出站日期"
                                    />
                                  )}
                                  {(editForm.role === 'researcher' || editForm.role === 'associate_researcher' || editForm.role === 'assistant_researcher') && (
                                    <Input
                                      type="date"
                                      value={editForm.contractEndDate || ''}
                                      onChange={e => setEditForm({ ...editForm, contractEndDate: e.target.value })}
                                      className="h-7 text-xs w-[130px]"
                                      placeholder="合同到期"
                                    />
                                  )}
                                  {editForm.role === 'visitor' && (
                                    <Input
                                      type="date"
                                      value={editForm.exitDate || ''}
                                      onChange={e => setEditForm({ ...editForm, exitDate: e.target.value })}
                                      className="h-7 text-xs w-[130px]"
                                      placeholder="访问结束日期"
                                    />
                                  )}
                                  {(editForm.role === 'undergraduate' || editForm.role === 'alumni') && (
                                    <span className="text-xs text-slate-400">-</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-600" onClick={confirmEdit}>
                                      <Save className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400" onClick={cancelEdit}>
                                      <X className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell className="font-medium text-sm">{m.name}</TableCell>
                                <TableCell>
                                  <Badge variant="outline" className="text-xs">
                                    {m.role === 'phd' || m.role === 'undergraduate'
                                      ? `${m.roleLabel}(${m.subRole})`
                                      : (m.subRole || m.roleLabel || '-')}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-slate-600 max-w-[200px] truncate">{m.researchDirection}</TableCell>
                                <TableCell>{getStatusBadge(m.status)}</TableCell>
                                <TableCell className="text-xs text-slate-500">{m.joinDate}</TableCell>
                                <TableCell className="text-xs">
                                  {m.role === 'phd' && m.graduationDate ? (
                                    <span className="text-emerald-600 font-medium">{m.graduationDate}</span>
                                  ) : (m.role === 'postdoc' || m.role === 'visitor') && m.exitDate ? (
                                    <span className="text-amber-600 font-medium">{m.exitDate}</span>
                                  ) : (m.role === 'researcher' || m.role === 'associate_researcher' || m.role === 'assistant_researcher') && m.contractEndDate ? (
                                    <span className="text-blue-600">{m.contractEndDate}</span>
                                  ) : (
                                    <span className="text-slate-400">-</span>
                                  )}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-cyan-600" onClick={() => startEdit(m)}>
                                      <Pencil className="w-3.5 h-3.5" />
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-red-600" onClick={() => handleDeleteMember(m)}>
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* 已离职/毕业成员独立分组 */}
          {inactiveMembers.length > 0 && (
            <Card className="border-slate-300 bg-gray-50">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-gray-600">
                  <Archive className="w-4 h-4" />
                  已离职/毕业 ({inactiveMembers.length}人)
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-100">
                        <TableHead className="text-xs">姓名</TableHead>
                        <TableHead className="text-xs">角色类别</TableHead>
                        <TableHead className="text-xs">研究方向</TableHead>
                        <TableHead className="text-xs">状态</TableHead>
                        <TableHead className="text-xs">入组日期</TableHead>
                        <TableHead className="text-xs">出站/到期</TableHead>
                        <TableHead className="text-xs">操作</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inactiveMembers.map(m => (
                        <TableRow key={m.id} className="hover:bg-slate-100 opacity-75">
                          {editingId === m.id && editForm ? (
                            <>
                              <TableCell>
                                <Input value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="h-8 text-sm" />
                              </TableCell>
                              <TableCell className="space-y-1">
                                <Select value={editForm.role} onValueChange={v => { const rl = ROLE_CATEGORY_OPTIONS.find(r => r.value === v)?.label || editForm.roleLabel; const isS = v === 'phd' || v === 'undergraduate'; setEditForm({ ...editForm, role: v, roleLabel: rl, group: v, subRole: isS ? `${editForm.enrollmentYear || 2024}级` : rl, enrollmentYear: isS ? (editForm.enrollmentYear || 2024) : undefined }); }}>
                                  <SelectTrigger className="h-7 text-xs w-[130px]"><SelectValue /></SelectTrigger>
                                  <SelectContent>{ROLE_CATEGORY_OPTIONS.map(r => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}</SelectContent>
                                </Select>
                                {(editForm.role === 'phd' || editForm.role === 'undergraduate') && (
                                  <Select value={String(editForm.enrollmentYear || '')} onValueChange={v => { const y = Number(v); const d = editForm.programDuration || 5; setEditForm({ ...editForm, enrollmentYear: y, subRole: `${y}级`, graduationDate: `${y + d}-06-30` }); }}>
                                    <SelectTrigger className="h-7 text-xs w-[100px]"><SelectValue placeholder="入学年份" /></SelectTrigger>
                                    <SelectContent>{ENROLLMENT_YEAR_OPTIONS.map(y => <SelectItem key={y} value={String(y)}>{y}级</SelectItem>)}</SelectContent>
                                  </Select>
                                )}
                                {editForm.role === 'phd' && (
                                  <Select value={String(editForm.programDuration || 5)} onValueChange={v => { const d = Number(v); const y = editForm.enrollmentYear || 2024; setEditForm({ ...editForm, programDuration: d, graduationDate: `${y + d}-06-30` }); }}>
                                    <SelectTrigger className="h-7 text-xs w-[80px]"><SelectValue placeholder="学制" /></SelectTrigger>
                                    <SelectContent><SelectItem value="4">4年制</SelectItem><SelectItem value="5">5年制</SelectItem></SelectContent>
                                  </Select>
                                )}
                              </TableCell>
                              <TableCell><Input value={editForm.researchDirection} onChange={e => setEditForm({ ...editForm, researchDirection: e.target.value })} className="h-8 text-sm" /></TableCell>
                              <TableCell>
                                <Select value={editForm.status} onValueChange={v => setEditForm({ ...editForm, status: v })}>
                                  <SelectTrigger className="h-8 text-sm w-[100px]"><SelectValue /></SelectTrigger>
                                  <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                                </Select>
                              </TableCell>
                              <TableCell><Input type="date" value={editForm.joinDate || ''} onChange={e => setEditForm({ ...editForm, joinDate: e.target.value })} className="h-7 text-xs w-[130px]" /></TableCell>
                              <TableCell>
                                {editForm.role === 'phd' && <Input type="date" value={editForm.graduationDate || ''} onChange={e => setEditForm({ ...editForm, graduationDate: e.target.value })} className="h-7 text-xs w-[130px]" placeholder="预计毕业日期" />}
                                {editForm.role === 'postdoc' && <Input type="date" value={editForm.exitDate || ''} onChange={e => setEditForm({ ...editForm, exitDate: e.target.value })} className="h-7 text-xs w-[130px]" placeholder="出站日期" />}
                                {(editForm.role === 'researcher' || editForm.role === 'associate_researcher' || editForm.role === 'assistant_researcher') && <Input type="date" value={editForm.contractEndDate || ''} onChange={e => setEditForm({ ...editForm, contractEndDate: e.target.value })} className="h-7 text-xs w-[130px]" placeholder="合同到期" />}
                                {editForm.role === 'visitor' && <Input type="date" value={editForm.exitDate || ''} onChange={e => setEditForm({ ...editForm, exitDate: e.target.value })} className="h-7 text-xs w-[130px]" placeholder="访问结束日期" />}
                                {(editForm.role === 'undergraduate' || editForm.role === 'alumni') && <span className="text-xs text-slate-400">-</span>}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-emerald-600" onClick={confirmEdit}><Save className="w-3.5 h-3.5" /></Button>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400" onClick={cancelEdit}><X className="w-3.5 h-3.5" /></Button>
                                </div>
                              </TableCell>
                            </>
                          ) : (
                            <>
                              <TableCell className="font-medium text-sm text-gray-500">{m.name}</TableCell>
                              <TableCell><Badge variant="outline" className="text-xs bg-gray-100">{m.role === 'phd' || m.role === 'undergraduate' ? `${m.roleLabel}(${m.subRole})` : (m.subRole || m.roleLabel || '-')}</Badge></TableCell>
                              <TableCell className="text-xs text-slate-500 max-w-[200px] truncate">{m.researchDirection}</TableCell>
                              <TableCell>{getStatusBadge(m.status)}</TableCell>
                              <TableCell className="text-xs text-slate-400">{m.joinDate}</TableCell>
                              <TableCell className="text-xs">
                                {m.role === 'phd' && m.graduationDate ? <span className="text-emerald-500">{m.graduationDate}</span> : (m.role === 'postdoc' || m.role === 'visitor') && m.exitDate ? <span className="text-amber-500">{m.exitDate}</span> : (m.role === 'researcher' || m.role === 'associate_researcher' || m.role === 'assistant_researcher') && m.contractEndDate ? <span className="text-blue-400">{m.contractEndDate}</span> : <span className="text-slate-300">-</span>}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-cyan-600" onClick={() => startEdit(m)}><Pencil className="w-3.5 h-3.5" /></Button>
                                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-slate-400 hover:text-red-600" onClick={() => handleDeleteMember(m)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 说明 */}
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            所有修改自动保存到浏览器本地存储，刷新页面后数据不会丢失
          </div>
        </div>
      )}

      {activeTab === 'system' && (
        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                <UserCog className="w-4 h-4 text-cyan-600" />
                系统配置
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xs text-slate-600 space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                  <span>数据存储方式</span>
                  <Badge variant="outline">localStorage（本地）</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                  <span>活跃成员数</span>
                  <Badge variant="outline">{members.filter(m => m.status !== 'graduated' && m.status !== 'left' && m.status !== 'inactive').length}人</Badge>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50">
                  <span>已保存周报</span>
                  <Badge variant="outline">6期</Badge>
                </div>
                <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-700">
                  提示：清除浏览器缓存将导致本地保存的团队成员编辑数据丢失。建议定期导出重要数据。
                </div>
              </div>
            </CardContent>
          </Card>

          <LLMConfigPanel />
          <DataMigrationPanel />
          <PasswordPanel />
          <CloudSyncPanel />
          <DataBackupPanel />
        </div>
      )}
    </div>
  );
}
