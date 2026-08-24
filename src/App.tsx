import { Routes, Route } from 'react-router';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import AnalysisPage from './pages/AnalysisPage';
import TrendsPage from './pages/TrendsPage';

import LiteraturePage from './pages/LiteraturePage';
import CollaborationPage from './pages/CollaborationPage';
import ScholarCitationsPage from './pages/ScholarCitationsPage';
import SettingsPage from './pages/SettingsPage';
import PdfReportGenerator from './components/PdfReportGenerator';
import { cloudStorage } from './services/cloudStorage';

/** 首次加载时导入预生成的深度分析种子数据 */
function useSeedDeepAnalyses() {
  useEffect(() => {
    const existing = localStorage.getItem('qlab_deep_analyses');
    if (existing && existing !== '{}') return; // 已有数据，跳过

    fetch('/seed-deep-analyses.json')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.deepAnalyses && Object.keys(data.deepAnalyses).length > 0) {
          localStorage.setItem('qlab_deep_analyses', JSON.stringify(data.deepAnalyses));
          localStorage.setItem('qlab_last_modified', JSON.stringify(new Date().toISOString()));
          console.log(`[Seed] 已导入 ${Object.keys(data.deepAnalyses).length} 人的深度分析数据`);
          // 种子数据导入后同步到云端，确保其他浏览器也能获取
          if (cloudStorage.isCloudEnabled()) {
            setTimeout(() => {
              cloudStorage.saveAllData(cloudStorage.loadFromLocal()).catch(() => {});
            }, 500);
          }
        }
      })
      .catch(() => { /* seed 文件可选 */ });
  }, []);
}

/** 应用首次加载时同步云端数据，确保所有浏览器看到一致的数据 */
function useCloudSync() {
  const [synced, setSynced] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // 清理残留的无效日期标签（2026.02.13 已被更正为 2026.02.12）
    try {
      const dynLabels = JSON.parse(localStorage.getItem('qlab_dynamic_labels') || '[]') as string[];
      if (dynLabels.includes('2026.02.13')) {
        const cleaned = dynLabels.filter(l => l !== '2026.02.13');
        localStorage.setItem('qlab_dynamic_labels', JSON.stringify(cleaned));
        console.log('[Cleanup] 移除残留的动态标签 2026.02.13');
      }
      // 同时清理动态趋势和历史中的 2026.02.13 数据
      const dynTrends = JSON.parse(localStorage.getItem('qlab_dynamic_trends') || '{}') as Record<string, unknown>;
      if (dynTrends['2026.02.13']) {
        delete dynTrends['2026.02.13'];
        localStorage.setItem('qlab_dynamic_trends', JSON.stringify(dynTrends));
        console.log('[Cleanup] 移除残留的动态趋势 2026.02.13');
      }
      const dynHistory = JSON.parse(localStorage.getItem('qlab_dynamic_history') || '{}') as Record<string, Record<string, string>>;
      let historyCleaned = false;
      for (const person of Object.keys(dynHistory)) {
        if (dynHistory[person]?.['2026.02.13']) {
          delete dynHistory[person]['2026.02.13'];
          historyCleaned = true;
        }
      }
      if (historyCleaned) {
        localStorage.setItem('qlab_dynamic_history', JSON.stringify(dynHistory));
        console.log('[Cleanup] 移除残留的动态历史 2026.02.13');
      }
    } catch { /* ignore */ }

    async function doSync() {
      try {
        // 强制重新初始化 provider（避免 Firefox 等浏览器 constructor 中 provider 为 null）
        const config = cloudStorage.getProviderConfig();
        if (config) {
          cloudStorage.setProviderConfig(config);
        }

        if (!cloudStorage.isCloudEnabled()) {
          console.log('[CloudSync] 云端未启用，跳过同步');
          if (!cancelled) setSynced(true);
          return;
        }

        // Gist 跨设备同步核心：强制扫描所有候选 Gist，自动切换到数据最新的那个
        // 这样不管在哪台电脑打开，都会自动拿到最新数据
        if (config?.type === 'gist') {
          console.log('[CloudSync] Gist 模式：正在扫描所有候选 Gist...');
          try {
            const result = await cloudStorage.forceResolveGistId();
            if (result.switched) {
              console.log('[CloudSync] 已自动切换到最新数据 Gist:', result.message);
            } else {
              console.log('[CloudSync] Gist 无需切换:', result.message);
            }
          } catch (e) {
            console.warn('[CloudSync] Gist 扫描失败:', e);
          }
        }

        console.log('[CloudSync] 开始首次加载云端同步...');
        await cloudStorage.loadAllData();
        console.log('[CloudSync] 首次加载云端同步完成');
      } catch (e) {
        console.warn('[CloudSync] 首次加载同步失败:', e);
      }
      if (!cancelled) setSynced(true);
    }

    doSync();
    return () => { cancelled = true; };
  }, []);

  return synced;
}

export default function App() {
  useSeedDeepAnalyses();
  const synced = useCloudSync();

  // 等待首次云端同步完成后再渲染页面，避免显示旧本地数据
  if (!synced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">正在同步云端数据...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/pdf-report" element={<PdfReportGenerator />} />
      <Route path="*" element={
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/trends" element={<TrendsPage />} />
            <Route path="/literature" element={<LiteraturePage />} />
            <Route path="/collaboration" element={<CollaborationPage />} />
            <Route path="/citations" element={<ScholarCitationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
}
