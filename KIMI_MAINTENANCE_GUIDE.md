# Kimi 维护指南

本文档用于在任何新 Kimi 对话中继续维护和编辑本网站。

## 快速开始（新对话中）

让 Kimi 执行以下命令拉取代码并开始工作：

```bash
git clone https://github.com/YOUR_USERNAME/qlab-weekly-report.git /mnt/agents/output/app
cd /mnt/agents/output/app
npm install
```

> 将 `YOUR_USERNAME` 替换为你的实际 GitHub 用户名。

## 项目结构

```
/mnt/agents/output/app/
├── src/
│   ├── types/index.ts              # TypeScript 类型定义
│   ├── data/
│   │   ├── mockPersons.ts          # 人员静态数据 (TeamMember, ALL_PERSONS, ACTIVE_PERSONS)
│   │   └── mockTrends.ts          # 趋势静态数据 (TREND_LABELS, PERSON_BASELINE_TRENDS)
│   ├── lib/
│   │   └── dynamicStorage.ts      # localStorage 动态数据读写 (saveDynamicTrends, getMergedPersonHistory)
│   ├── services/
│   │   └── cloudStorage.ts        # 云端同步 (Supabase REST API)
│   ├── hooks/
│   │   └── usePersons.ts          # 人员数据 hook (mergeWithLocalStorage, useMemo)
│   ├── components/
│   │   ├── ReportUploader.tsx     # 周报上传+AI分析 (核心逻辑)
│   │   ├── DeepAnalysisPanel.tsx  # 深度分析面板 (buildAnalysisPrompt)
│   │   ├── PdfReportGenerator.tsx # PDF报告生成
│   │   ├── Layout.tsx             # 页面布局+侧边栏导航
│   │   └── WeeklyTrendChart.tsx   # 趋势图组件
│   └── pages/
│       ├── Dashboard.tsx          # 首页 (统计卡片、本周上报人数、未提交提醒)
│       ├── AnalysisPage.tsx       # 分析页面 (人员选择、深度分析按钮、信息显示)
│       ├── TrendsPage.tsx         # 趋势页面 (图表、历史摘要)
│       └── SettingsPage.tsx       # 设置页面 (成员管理、分类、云端配置)
├── CHANGELOG.md                   # 修改日志（每次修改后更新）
└── GITHUB_SETUP.md               # GitHub 仓库设置指南
```

## 常用修改速查

### 修改人员数据
编辑 `src/data/mockPersons.ts`：
- `ALL_PERSONS`: 人员列表，每人包含 id, name, role, roleLabel, subRole, researchDirection, status, joinDate, enrollmentYear, programDuration, exitDate, contractEndDate, graduationDate
- `ACTIVE_PERSONS`: 过滤了 graduated/left/inactive 后的活跃成员

### 修改类型定义
编辑 `src/types/index.ts`：
- `Person` 接口：添加/修改字段后，需同步修改 `TeamMember`、`StoredMember` 等对应类型

### 修改 UI 页面
| 页面 | 文件 |
|------|------|
| 首页 Dashboard | `src/pages/Dashboard.tsx` |
| 分析页面 | `src/pages/AnalysisPage.tsx` |
| 趋势页面 | `src/pages/TrendsPage.tsx` |
| 设置页面 | `src/pages/SettingsPage.tsx` |

### 修改周报分析逻辑
- 周报上传: `src/components/ReportUploader.tsx`
- 深度分析 prompt: `src/components/DeepAnalysisPanel.tsx` 中 `buildAnalysisPrompt()`
- 周报分析 prompt: `src/components/ReportUploader.tsx` 中 `startAnalysis()`

### 修改云端同步逻辑
编辑 `src/services/cloudStorage.ts`：
- `loadAllData()`: 拉取云端数据并与本地合并
- `saveAllData()`: 保存数据到云端
- `startAutoSync()`: 30秒轮询自动同步

## 构建和部署

```bash
cd /mnt/agents/output/app
rm -rf dist
npm run build
# 部署 dist/ 目录（在 Kimi 中使用 deploy_website 工具）
```

## 提交代码到 GitHub

```bash
cd /mnt/agents/output/app
git add -A
git commit -m "描述本次修改"
git push origin main
```

## 已知的注意事项

1. **Firefox 同步问题**: 已修复 `saveAllData` 的查询排序和 `syncToCloud` 的 persons 丢失问题
2. **dynamic 数据合并**: `loadAllData()` 按日期 key 合并 trends/history，不丢失任何一方数据
3. **useMemo 缓存**: 涉及 localStorage 数据的显示，优先使用 IIFE 而非 useMemo 以确保刷新
4. **状态为 graduated/left 的成员**: 不计入总人数，不出现在分析/趋势页面，但在设置页面"已离职/毕业"分组中可编辑
