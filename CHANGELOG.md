# QiuLab 周报分析系统 - 修改日志

## 2026-05-25: 修复深度分析跨浏览器同步 Bug

### Bug 描述
在浏览器A中对成员进行深度分析后，浏览器B中打开同一成员页面，显示的是旧的分析结果（日期为旧日期），新分析没有同步过来。

### 根因
`cloudStorage.ts` 的 `loadAllData()` 方法中，`deepAnalyses` 的合并逻辑：
```js
deepAnalyses: { ...cloud.deepAnalyses, ...local.deepAnalyses }
```
**总是用本地数据覆盖云端数据**，没有根据 `lastModified` 时间戳判断哪边更新。

### 修复
改为根据时间戳判断：
```js
deepAnalyses: useCloud
  ? { ...local.deepAnalyses, ...cloud.deepAnalyses }  // 云端更新，云端覆盖本地
  : { ...cloud.deepAnalyses, ...local.deepAnalyses }   // 本地更新，本地覆盖云端
```

**修改文件**：`src/services/cloudStorage.ts` 第667行

---

## 2026-05-25: 修复期数显示，新增需关注成员一键跳转

### 修改文件

#### `src/data/mockTrends.ts`
- 补全 TREND_LABELS：添加 `2026.05.15`、`2026.05.22`，从16期修正为18期
- 同时修正 `2026.02.12` → `2026.02.13`（周五日期）

#### `src/pages/Dashboard.tsx`
- 修复期数计算：`latestWeekNumber` 使用 `TREND_LABELS.length`（18期），不再受动态标签脏数据干扰
- 新增 `atRiskMembers` 列表收集：从动态数据中读取 `problems > 0` 的成员ID
- 「需关注人数」统计卡片改为可点击，点击跳转到 `/analysis?filter=risk&riskIds=...`
- 卡片渲染逻辑区分可点击/不可点击状态

#### `src/pages/AnalysisPage.tsx`
- 支持 `filter=risk` URL 参数：读取 `riskIds` 参数构建风险成员ID集合
- 筛选模式下 Select 下拉框只显示有风险成员，隐藏"全部人员"选项
- 自动选中第一位风险成员，自动加载其AI分析
- 新增红色提示条「仅显示需关注成员 (N人)」+「清除筛选」按钮
- 风险筛选模式下隐藏已出站/已毕业分组

---

## 2026-05-25: 集成 PAINT Lab Logo，统一品牌名为 QiuLab

### 修改文件

#### 品牌统一
- `src/lib/dynamicStorage.ts`: QLab-WID → QiuLab-WID
- `src/components/Footer.tsx`: QLab-WID → QiuLab-WID
- `src/services/cloudStorage.ts`: QLab-WID → QiuLab-WID, X-QLab-Version → X-QiuLab-Version
- `CHANGELOG.md`: QLab → QiuLab

#### Logo 集成
- `public/logo.jpg`: 新增 PAINT Lab logo 图片
- `src/components/Navbar.tsx`: 导航栏左侧用 logo 图片替代 FlaskConical 图标
- `src/components/AuthGuard.tsx`: 登录页标题区域展示 PAINT Lab logo

---

## 2026-05-25: Dashboard UI 视觉优化

### 修改文件

#### `src/pages/Dashboard.tsx`
- **统计卡片**: 图标容器添加渐变色背景（blue→indigo、emerald→teal、orange→red、cyan→blue），添加 `hover:shadow-lg hover:-translate-y-0.5` 悬停动画
- **页面标题**: 添加渐变色文字效果 `bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent`，副标题显示当前期数和日期
- **角色分布卡片**: 每个角色添加专属渐变色图标（研究员:cyan→blue、助研:sky→blue、博后:indigo→purple、博士生:emerald→teal、本科生:amber→orange、访问学生:violet→purple），添加悬停动画
- **AI研判摘要**: 添加空状态提示（图标 + "暂无 AI 研判数据" + "上传周报并分析后将在此显示"）

#### `src/components/PersonStatusCard.tsx`
- **研究方向 Tooltip**: 鼠标悬停卡片时显示 Tooltip，展示完整姓名、角色、研究方向和状态
- **图标颜色**: 状态图标背景色和文字色与风险级别一致（绿色/橙色/红色）

---

## 2026-05-25: 验证并修复「新增成员」和「周报自动发现新成员」功能

### 背景
验证 plan.md 中规划的两个待办功能的实现状态。

### 验证结果

**功能1: SettingsPage - 新增成员** — ✅ 已完整实现（代码已存在，无需新增）

实现位置：`src/pages/SettingsPage.tsx` 第893-942行（逻辑）和第1002-1153行（UI）

- 团队成员表格上方有「新增成员」按钮
- 点击展开表单：姓名（必填）、角色类别、入学年份（学生）、学制（博士生）、研究方向、入组日期
- `generateNewId(role)` 根据角色自动生成ID（d前缀博士生，x前缀本科生，p前缀其他）
- `confirmAdd()` 保存到 localStorage 并通过 `saveMembers()` 触发云端同步
- 保存后调用 `notifyPersonsUpdated()` 通知所有页面刷新

**功能2: ReportUploader - 周报自动发现新成员** — ✅ 已完整实现（代码已存在，无需新增）

实现位置：`src/components/ReportUploader.tsx`

- `detectNamesFromReport(fullText, existingNames)`（第129-270行）：从周报文本智能提取人名
  - 匹配带编号前缀的行（如 "1. 严巍"）
  - 大量排除词库过滤工作内容短语（200+个动词、技术术语、研究方向）
  - 常见姓氏验证 + 后续行工作内容检查
- `saveNewMember()`（第369-420行）：保存新成员到 localStorage
- `loadCurrentMembers()`（第354-366行）：加载当前成员列表
- `new_members` phase UI（第1092-1188行）：显示检测到的新成员，可选择角色（默认当年入职博士生），可输入研究方向
- 在 `proceedWithParse()` 中集成检测流程（第512-523行）

### 修复

#### `src/components/ReportUploader.tsx` - `saveNewMember()`
- 修复：为博士生/本科生新成员添加 `programDuration` 字段（博士默认5年，本科默认4年）
- 修复：根据 `enrollmentYear + programDuration` 自动生成 `graduationDate`（如 2026 + 5 = `2031-06-30`）
- 之前：新成员缺少这两个字段，导致后续分析中博士生学制信息和毕业时间规划无法正确显示

---

## 2026-05-24: 添加「强制本地上传」按钮

### 需求
在设置页面的云端同步版块，增加一个按钮，用本地全部数据无条件覆盖云端数据。

### 修改文件

#### `src/services/cloudStorage.ts`
- `CloudStorageService` 新增 `forceUploadLocal()` 方法：直接调用 `provider.saveAllData()` 覆盖云端，不经过 `loadAllData` 合并逻辑
- `useCloudStorage` hook 新增 `forceUploadLocal` 回调函数

#### `src/pages/SettingsPage.tsx`
- 在「立即同步」按钮旁边新增「强制上传」按钮（橙色边框，带 ⚠️ 确认对话框）
- 点击后弹出 `window.confirm` 警告
- 确认后执行 `forceUploadLocal()`，成功/失败均弹出提示

### 使用场景
- 某浏览器数据完整，其他浏览器数据缺失或损坏
- 在该浏览器点击「强制上传」→ 本地完整数据覆盖云端 → 其他浏览器刷新后拉取完整数据

---

## 2026-05-24: 修复 persons 合并策略 — 云端为主，本地补充

### 问题
四个浏览器（Edge/Chrome/自带/Firefox）显示不同数据：
- Edge/Chrome/自带：活跃27人 / 上报31人 / 需关注11人
- Firefox：活跃31人 / 上报32人 / 需关注9人 / 博士生19人

### 根因
`loadAllData` persons 合并以**时间戳新的一方为主**：
```typescript
const primaryMap = cloudModified > localModified ? cloudMap : localMap;  // ← 如果本地时间戳较新，用本地旧数据
```
Firefox 之前访问时留下了较新的 `lastModified`，导致 Firefox 本地的旧 persons 数据（含已毕业/已离职成员）覆盖云端的新数据。

### 修复
人员数据合并改为**始终云端为主，本地只补充**：
```typescript
const mergedMap = new Map(cloudMap);  // 云端为主
for (const [id, person] of localMap) {
  if (!mergedMap.has(id)) {
    mergedMap.set(id, person);  // 本地独有人员补充
  }
}
```
确保所有浏览器看到一致的最新人员数据。

### 注意
如果某浏览器编辑了人员但还没推送，编辑会暂时丢失（直到该浏览器主动推送）。建议编辑后点击"同步数据"按钮。

---

## 2026-05-24: 修复跨浏览器同步关键 bugs（uploadedDates + ReportUploader 推送 + 重试）

### 问题
三个浏览器（Edge、Chrome、自带浏览器）第一次打开就显示不同数据：活跃成员30 vs 31 vs 30。

### 根因

**Bug 1: `loadAllData` 中 `uploadedDates` 合并重复了 `cloud`**
```typescript
uploadedDates: [...new Set([...(cloud.dynamic?.uploadedDates || []), ...(cloud.dynamic?.uploadedDates || [])])].sort(),
```
应该是 `cloud` + `local`，但写成了 `cloud` + `cloud`。

**Bug 2: `ReportUploader` 直接 `saveAllData` 不先合并**
```typescript
cloudStorage.saveAllData(cloudStorage.loadFromLocal())  // ← 直接推送本地数据，可能覆盖云端其他浏览器的 persons 编辑
```
应该先 `loadAllData` 拉取云端合并，再推送。

**Bug 3: `syncToCloud` 中 `loadAllData` 失败导致中断**
`loadAllData` 失败时异常抛出，`syncToCloud` 中断，后续 `saveAllData` 不执行。

**Bug 4: `loadAllData` 无重试机制**
移动浏览器网络不稳定，单次请求可能失败。

### 修复
- `loadAllData`：`uploadedDates` 修正为 `cloud` + `local`
- `ReportUploader`：先 `loadAllData()` 合并，再 `saveAllData()` 推送
- `syncToCloud`：`loadAllData` 用 try/catch 包裹，失败继续推送
- `loadAllData`：添加 3 次重试，间隔 2 秒

---

## 2026-05-24: 重写 loadAllData — 始终合并双方数据，不再全量覆盖

### 问题
电脑 Edge 上传并分析周报后，手机 Edge 和 Chrome 看不到新数据。

### 根因：`loadAllData` 原逻辑是"哪边新用哪边全量覆盖"
```
电脑A上传周报 → 推送到云端（含新周报dynamic + 旧persons）
手机B打开 → loadAllData → 比较时间戳
  → 如果手机B本地 lastModified > 云端 → 用B的本地数据（旧数据）覆盖云端
  → 如果云端 > B本地 → 用云端覆盖B本地（正确路径）
  → 但B本地的旧 dynamic 数据会"补充"到云端数据中
```
问题：
1. 时间戳比较不可靠（各浏览器 localStorage 中的 lastModified 不同步）
2. 简单选择"winner = cloud"或"winner = local"会丢失另一方的数据
3. 即使 dynamic 做了合并，persons 数据仍然只取一方

### 修复：始终合并双方数据
- **persons**：按 id 合并云端和本地的人员列表，双方都有的 id 以时间戳新的一方为准，另一方独有的 id 补充进来
- **dynamic**：始终合并，不丢失任何周报记录（以时间戳新的一方覆盖同一天冲突数据）
- **uploads**：按 id 去重合并
- **合并后推回云端**：确保两端数据完全一致
- 删除"哪边新用哪边全量覆盖"的逻辑

### 行为
- 电脑A上传周报 → 推送到云端
- 手机B打开 → 拉取云端 → 合并A的周报数据 + B的本地数据 → 保存到B本地 → 推回云端
- 电脑A刷新 → 拉取云端 → 看到B的合并结果 → 两端数据一致

---

## 2026-05-24: 修复 Firefox 同步问题（saveAllData 查询逻辑 + syncToCloud 人员丢失）

### 问题
1. Firefox 修改人员信息后，其他浏览器不同步
2. Firefox 打开网站后，覆盖其他浏览器已修改的数据

### 根因 1：`SupabaseProvider.saveAllData` 查询逻辑错误
```
saveAllData: GET /qlab_data?select=id&limit=1        ← 默认 id 升序，取最旧的记录
getAllData:  GET /qlab_data?select=*&order=created_at.desc&limit=1  ← 取最新的记录
```
如果 Supabase 表中有多条记录，save 更新的是最旧的那条，get 读取的是最新的那条——**两者操作的不是同一条记录**！

### 根因 2：`syncToCloud` 中 `loadAllData` 覆盖本地 persons
`loadAllData` 判断云端较新时，会 `saveToLocal(cloud)` 覆盖本地的 persons 修改。
Firefox 修改 → syncToCloud → loadAllData（云端较新）→ 本地 persons 被覆盖为云端旧数据 → 修改丢失。

### 修复
- `SupabaseProvider.saveAllData`：查询添加 `order=created_at.desc`，确保与 `getAllData` 操作同一条记录
- `syncToCloud`：`loadAllData` 之后重新保存 persons 和 lastModified，确保修改不丢失

---

## 2026-05-24: 修复跨浏览器云端同步关键 Bug（dynamic 数据覆盖）

### 问题
浏览器 A 上传并分析周报后，浏览器 B 显示旧数据（静态 MOCK），没有同步云端新数据。

### 根因（`src/services/cloudStorage.ts`）

**Bug 1: `loadAllData()` dynamic 合并逻辑错误**
原代码：当 `source === 'cloud'`（应使用云端数据）但 `localTrendKeys > cloudTrendKeys` 时，用**本地旧 dynamic 覆盖云端新 dynamic**，导致新上传的周报数据丢失。

**Bug 2: 30 秒轮询直接 `saveToLocal(cloud)`**
轮询拉取后直接覆盖 localStorage，不使用合并逻辑。

**Bug 3: `loadAllData()` 未通知监听者**
数据保存后没有 `notifyChange()`，React 组件不重新渲染。

### 修复
- **真正合并 dynamic**：按日期 key 合并 trends/history，去重合并 labels/uploadedDates/deepAnalyses
- **轮询复用 `loadAllData()`**：使用完整合并逻辑
- **添加 `notifyChange()`**：数据更新后通知所有监听者

---

## 2026-05-24: 周报解析结果显示实际提交/未提交成员

### 问题
上传周报后 review 阶段显示"共32人"（全部在职人员），而不是实际在周报中找到内容的人数。未提交周报的成员也会被列出并消耗 API 费用。

### 修改文件

#### `src/components/ReportUploader.tsx`
- `extractPersonReports()`: 未找到某人内容时设为 `''`（之前已修改）
- **Review 阶段渲染重写**：
  - 根据 `parsedReports` 实际内容计算 `submittedNames` / `missingNames`
  - 研究人员和学生分别显示"已提交"（绿色实线 badge）和"未提交"（灰色虚线 badge）
  - 标题显示"已提交 X 人 / 未提交 Y 人"而非"共 Z 人"
- **分析循环重构**：
  - 先遍历所有人，未提交的先生成默认结果（`summary: '此人本周未提交周报。'`）
  - 只对已提交的人构建 `personItems`，调用 Kimi API
  - 费用预估、Token 消耗、耗时均基于实际分析人数
- **进度显示更新**：
  - Analyzing 阶段显示实际分析人数
  - Done 阶段显示"已完成 X 位已提交成员"（未提交已跳过）
  - 日志显示"本周已提交 X 人，未提交 Y 人"

### 行为
| 成员状态 | Review 显示 | AI 分析 | 费用 |
|---------|------------|---------|------|
| 已提交周报 | ✅ 绿色实线 badge | 调用 Kimi API | 计入 |
| 未提交周报 | ⚠️ 灰色虚线 badge | 跳过，直接标注"未提交" | 不计 |

---

# QiuLab 周报分析系统 - 修改日志

## 2026-05-24: 检测周报中非活跃成员并提示更新状态

### 需求
解析周报时，如果检测到已毕业/已离职/非活跃成员的周报内容，提示用户是否将其状态更新为「在研」。

### 修改文件

#### `src/components/ReportUploader.tsx`
- **导入 `ALL_PERSONS`**：完整成员列表（包含所有状态）
- **新增 `detectInactiveMembersInReport()`**：从周报文本中检测已知但状态非 active 的成员
  - 从 localStorage 或静态数据获取 graduated/left/inactive 成员
  - 遍历周报文本，匹配 "N. 名字" 格式并检查后续是否有工作内容
  - 返回检测到的非活跃成员列表（含 id/name/role/status/roleLabel）
- **新增 `reactivateMember()`**：将指定成员状态更新为 active，保存到 localStorage
- **新增 Phase 类型 `inactive_check`**：在 new_members 之前执行
- **新增 State `inactiveMembersDetected`**：存储检测到的非活跃成员
- **修改 `proceedWithParse()` 流程**：
  1. 先调用 `detectInactiveMembersInReport()` 检测非活跃成员
  2. 如有检测到 → 进入 `inactive_check` 阶段
  3. 如无 → 继续原有的新成员检测流程
- **新增 `inactive_check` 阶段 UI**：
  - 橙色卡片显示检测到的非活跃成员（含姓名、角色、当前状态 badge）
  - 「确认更新为在研并继续」→ 更新所有检测到成员的状态为 active → 刷新页面
  - 「跳过，不更新状态」→ 继续新成员检测或直接进入 review
  - 「去设置页面管理成员」→ 跳转到设置页面

### 行为
| 检测对象 | 检测结果 | 处理方式 |
|---------|---------|---------|
| 已毕业/已离职/非活跃成员 | 周报中有内容 | 提示是否更新为「在研」 |
| 完全未知的名字 | 不在任何成员列表中 | 进入新成员确认流程（原有） |
| Active 成员 | 正常 | 直接进入 review 阶段 |

### 问题
Dashboard "本周上报人数"使用的是静态 `MOCK_REPORTS`，而不是基于实际上传解析后的动态数据。未提交周报的人也被计入上报人数。

### 修改文件

#### `src/pages/Dashboard.tsx`
- 新增 `latestDynamicStats` useMemo：从 `qlab_dynamic_trends` localStorage 读取最新一周数据
- `submittedCount`：`characterTag !== '未提交'` 的人数（从动态数据计算）
- `problemCount`：`problems > 0` 的人数（从动态数据计算）
- `avgWorkload`：平均 `progress`（只统计已提交的人）
- 无动态数据时回退到静态 `MOCK_REPORTS` / `MOCK_ASSESSMENTS`
- `latestDynamicStats` 和 `latestUploads` 均使用 IIFE 而非 `useMemo`，确保每次渲染都读取最新 localStorage 数据，上传新周报后 Dashboard 自动刷新

### 行为
- 有动态数据（上传过周报）：上报人数 = 实际解析出周报内容的人数（未提交的不计入）
- 无动态数据：回退到静态模拟数据

## 2026-05-24: 未提交周报正确识别

### 问题
成员因病假等原因未提交周报时，系统显示"周报内容过于简略，未体现具体工作进展..."，而不是"此人本周未提交周报"。

### 根因
`extractPersonReports()` 函数中，当周报文本中找不到某人的内容时，填充了默认文本 `"XX本周科研工作持续推进。"`，然后这个虚假文本被传给 Kimi API 分析，AI 看到几乎为空的内容后返回"内容过于简略"。

### 修改文件

#### `src/components/ReportUploader.tsx`
- `extractPersonReports()`: 找不到某人周报内容时，设为 `''`（空字符串）代替默认文本
- `startAnalysis()` 中 `reportText` 获取：用 `?? ''` 代替 `||` 默认填充
- 分析循环开头：检测 `reportText` 为空或 `< 10` 字符时，**跳过 Kimi API 调用**，直接生成固定结果：`{summary: '此人本周未提交周报。', progress: 0, problems: 0, tag: '未提交'}`

### 行为
| 情况 | 之前 | 之后 |
|------|------|------|
| 未提交周报 | 虚假默认文本 → API 分析 → "内容过于简略" | 检测为空 → 跳过 API → "此人本周未提交周报" |
| 提交了但内容极少 | API 分析 → "内容过于简略" | API 分析 → "内容过于简略"（正常） |
| 正常提交 | API 分析 → 正常总结 | 不变 |

## 2026-05-24: 团队总人数只统计活跃成员

### 需求
团队总人数应只统计正式活跃人员，已毕业和已离职人员不计入。

### 修改文件

#### `src/pages/Dashboard.tsx`
- `totalPeople`: `ALL_PERSONS.length` → `ALL_PERSONS.filter(p => p.status !== 'graduated' && p.status !== 'left').length`
- `activePersons` 和 `notSeenLastWeek`: 过滤条件增加 `p.status !== 'graduated' && p.status !== 'left'`
- 统计标签"团队总人数" → "活跃成员总数"
- `getRoleDistribution()`: 过滤条件增加排除 graduated/left

#### `src/pages/SettingsPage.tsx`
- 统计卡片"总人数" → "活跃成员总数": `members.filter(m => m.status !== 'graduated' && m.status !== 'left').length`
- 系统配置 tab "团队成员数" → "活跃成员数": 同上过滤条件

#### `src/data/mockPersons.ts`
- `ACTIVE_PERSONS`: 过滤条件增加 `&& p.status !== 'graduated' && p.status !== 'left'`

#### `src/components/PdfReportGenerator.tsx`
- "团队总人数" → "活跃成员总数": `persons.filter(p => p.status !== 'graduated' && p.status !== 'left').length`

---

## 2026-05-24: 已毕业/已离职成员分组隔离

### 需求
成员被标记为"已毕业"或"已离职"时，自动移到"已离职/毕业"独立分组。不再被分析和显示趋势，但在设置页面仍可编辑。改回非毕业/非离职状态后可重新被分析。

### 修改文件

#### 1. `src/pages/SettingsPage.tsx`
- `getMembersByRole()`: 过滤条件增加 `&& m.status !== 'graduated' && m.status !== 'left'`，已毕业/已离职成员不再出现在角色分组中
- 新增 `inactiveMembers`: `members.filter(m => m.status === 'graduated' || m.status === 'left')`，收集所有已毕业/已离职成员
- 新增"已离职/毕业"独立 Card 渲染：灰色背景(`bg-gray-50`) + `Archive` 图标，显示在角色分组表格之后
- 新增 Card 内的完整表格渲染（支持编辑模式和非编辑模式），与角色分组表格相同的编辑功能
- 导入 `Archive` icon from lucide-react

#### 2. `src/pages/AnalysisPage.tsx`
- 左侧人员 Select 列表：过滤条件 `p.status !== 'graduated' && p.status !== 'left' && p.role === role`
- `scoreDistribution` useMemo：`nameMap` 只构建在职成员（排除 graduated/left）

#### 3. `src/pages/TrendsPage.tsx`
- `activePersons`: 过滤条件 `p.status !== 'graduated' && p.status !== 'left' && p.status !== 'inactive'`

### 行为
| 状态 | 设置页面分组 | 分析页面 | 趋势页面 |
|------|-------------|----------|----------|
| `graduated` / `left` | **已离职/毕业**（底部灰色区域） | 不出现 | 不出现 |
| 其他（active/sick/vacation 等） | 按角色类别正常分组 | 正常显示 | 正常显示 |

### 可逆性
在设置页面编辑已毕业/已离职成员，将状态改回 active 等其他状态后，自动回到原角色分组，重新出现在分析页面和趋势页面。

---

## 2026-05-24: 毕业日期 awareness 修复

### 需求
AI 深度分析时，博士生已延毕的情况下不应说"距毕业仅剩3-4个月"，而应明确指出已延毕。

### 修改文件

#### 1. `src/components/DeepAnalysisPanel.tsx`
- `buildAnalysisPrompt()`: 根据 `graduationDate` 或 `enrollmentYear + programDuration` 计算实际毕业日期
- 与当前时间比较，分三种状态：已延毕(红色紧急)、即将毕业(6个月内，橙色)、正常(绿色)
- prompt 中明确标注当前时间和延毕时长

#### 2. `src/components/ReportUploader.tsx`
- 周报分析 prompt 同样逻辑，区分已延毕/即将毕业/正常三种状态

### 行为
孙潇雨（2021级4年制，当前2026年5月）→ AI 收到 "⚠️ 已延毕 11个月（当前时间 2026年5月）"

---

## 2026-05-24: 入组日期/毕业日期/出站日期/合同到期 全面可编辑

### 需求
所有成员的入组日期都应可编辑。博士生应有可编辑的毕业日期，默认按学制自动计算。博士后和研究员应有出站/到期日期输入框。

### 修改文件

#### 1. `src/types/index.ts`
- `Person` 接口新增 `graduationDate?: string`

#### 2. `src/data/mockPersons.ts`
- `TeamMember` 接口新增 `graduationDate?: string`
- `personToTeamMember()` 传递 `graduationDate`
- 18位博士生全部添加 `graduationDate`（格式：`YYYY-06-30`，由 `enrollmentYear + programDuration` 计算）

#### 3. `src/hooks/usePersons.ts`
- `StoredMember` 接口新增 `graduationDate?: string`
- `mergeWithLocalStorage()`: 合并 `graduationDate` 字段

#### 4. `src/pages/SettingsPage.tsx`
- 编辑模式：入组日期从纯文本改为 `<input type="date">`（所有人）
- 编辑模式：博士生添加毕业日期 `<input type="date">`
- 编辑模式：博士后已有出站日期输入框（保持不变）
- 编辑模式：研究员/副研究员/助理研究员添加合同到期日期 `<input type="date">`
- 非编辑模式：博士生显示 `graduationDate`（绿色文字）
- 修改入学年份时：自动重新计算 `graduationDate = 入学年份 + 学制 → 06-30`
- 修改学制时：同上自动重新计算
- `syncToCloud()`: 传递 `graduationDate` 字段

#### 5. `src/pages/AnalysisPage.tsx`
- 毕业时间显示：优先使用 `graduationDate`，其次回退到 `enrollmentYear + programDuration`
- 三种状态显示：已延毕(红色)、即将截止≤3个月(橙色)、正常(绿色)

#### 6. `src/components/DeepAnalysisPanel.tsx` & `src/components/ReportUploader.tsx`
- AI prompt：优先使用 `graduationDate` 计算延毕状态

---

## 2026-05-24: 学制设置保存修复

### 问题
设置页面修改博士生学制后，分析页面显示未更新。再次打开设置页面还是旧值。

### 根因
- `usePersons.ts` 的 `mergeWithLocalStorage()` 遗漏了 `programDuration`、`exitDate`、`contractEndDate` 字段
- `SettingsPage.tsx` 的 `syncToCloud()` 构造上传数据时手动枚举字段，遗漏了上述三个字段

### 修改文件
- `src/hooks/usePersons.ts`: 合并函数添加三个字段
- `src/pages/SettingsPage.tsx`: syncToCloud 添加三个字段

---

## 2026-05-24: 博士后出站/研究员合同到期日期

### 需求
- 博士后设置出站日期
- 研究员/副研究员/助理研究员设置合同到期日期
- AI 分析时博士生考虑毕业规划、博士后考虑出站规划、研究人员不考虑

### 修改文件
- `src/types/index.ts`: `exitDate` / `contractEndDate` 字段
- `src/data/mockPersons.ts`: `TeamMember` 类型 + 静态数据 + 转换函数
- `src/pages/SettingsPage.tsx`: 编辑/新增表单添加日期输入
- `src/pages/AnalysisPage.tsx`: 显示出站/到期日期信息
- `src/components/DeepAnalysisPanel.tsx`: AI prompt 区分三种角色
- `src/components/ReportUploader.tsx`: 周报分析 prompt 同样区分
