# EPAC 易帕包装 AI 智能工作台（演示版）

EPAC 越南工厂内部 AI 工作台的本地演示项目，覆盖销售、采购、行政、审批、经营看板、三语协同、Excel 导入和智能助手等演示场景。

## 在线页面

推送到 GitHub 并由 GitHub Pages 部署后，可分享以下页面：

- 工作台：`https://<GitHub 用户名>.github.io/<仓库名>/`
- AI 工作台价值讲解：`https://<GitHub 用户名>.github.io/<仓库名>/ai-workbench-value-map.html`
- 一页使用说明：`https://<GitHub 用户名>.github.io/<仓库名>/usage-guide.html`

## 本地运行

### 最简单方式（Windows）

双击 `start_epac_workbench.bat`，浏览器会打开：

`http://127.0.0.1:5173/`

请保持弹出的命令窗口开启；关闭窗口后本地演示服务会停止。

### 命令行方式

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5173
```

## 项目内容

- `src/`：React 工作台主界面与样式
- `public/ai-workbench-value-map.html`：AI 工作台价值讲解页
- `public/usage-guide.html`：一页使用说明
- `public/assets/`：EPAC Logo 等静态资源
- `outputs/`：演示用 Excel、PDF 和预览文件

## GitHub Pages 部署

仓库中已包含 GitHub Actions 工作流。推送到 `main` 分支后，工作流会自动构建并部署静态页面。

首次使用时，请在 GitHub 仓库的 **Settings → Pages** 中确认部署源为 **GitHub Actions**。部署完成后可在 Actions 或 Pages 页面获取公开链接。

## 说明

本项目为内部功能演示，所有客户、订单、供应商及员工信息均为模拟数据。
