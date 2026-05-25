# GitHub 仓库设置指南

## 第1步：在 GitHub 创建仓库

1. 打开 https://github.com/new
2. Repository name: `qlab-weekly-report`
3. Description: `QLab Weekly Report System - 科研团队周报分析平台`
4. 选择 **Public** 或 **Private**
5. 不要勾选 "Initialize this repository with a README"（我们已有 README）
6. 点击 **Create repository**

## 第2步：推送代码到 GitHub

创建仓库后，GitHub 会显示类似下面的命令。在 Kimi 对话中执行：

```bash
cd /mnt/agents/output/app
git remote add origin https://github.com/YOUR_USERNAME/qlab-weekly-report.git
git branch -M main
git push -u origin main
```

（将 `YOUR_USERNAME` 替换为你的 GitHub 用户名）

## 第3步：验证推送成功

在浏览器中访问 `https://github.com/YOUR_USERNAME/qlab-weekly-report`，确认代码已推送。

## 以后更新代码

每次修改后，在 Kimi 对话中执行：

```bash
cd /mnt/agents/output/app
git add -A
git commit -m "描述本次修改"
git push origin main
```

## 从 GitHub 拉取最新代码（新对话中）

在新的 Kimi 对话中，让 Kimi 克隆仓库：

```bash
git clone https://github.com/YOUR_USERNAME/qlab-weekly-report.git /mnt/agents/output/app
cd /mnt/agents/output/app
npm install
npm run build
```
