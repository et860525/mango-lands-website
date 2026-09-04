# AGENTS.md - Mango Lands Blog 開發與協作指引

本文件記錄 **Mango Lands Blog** 的專案架構、開發指令、架構約定與代碼風格規範，供開發者與 AI 助手協作時遵循。

---

## 1. 專案概述 (Project Overview)

- **專案名稱**：Mango Lands Blog (`mango-lands-blog`)
- **核心技術棧**：
  - **框架**：[Astro 5.x](https://astro.build/) (純靜態網站產生 SSG)
  - **執行環境與套件管理**：[Bun](https://bun.sh/)
  - **代碼檢查與格式化**：[Biome](https://biomejs.dev/) (`@biomejs/biome`)
  - **樣式系統**：Vanilla CSS + CSS 語意化變數（支援 Light / Dark 雙主題切換、Anti-FOUC 防閃爍、毛玻璃 Sticky Nav）
  - **字型**：100% 本地自建字型 `@fontsource/noto-sans-tc` (思源黑體)、`@fontsource/jetbrains-mono`
  - **內容管理**：Astro Content Collections (Markdown)

---

## 2. 常用指令 (Commands)

所有指令皆使用 **Bun** 執行：

| 指令 | 說明 |
| :--- | :--- |
| `bun dev` | 啟動本機開發伺服器（預設 `http://localhost:4321`，支援 Polling 熱更新） |
| `bun build` | 建置生產環境靜態檔案至 `./dist/` |
| `bun preview` | 本機預覽建置後的 `./dist/` 靜態網站 |
| `bun check` | 執行 Biome 語法與代碼檢查並自動修復（`biome check --write .`） |
| `bun format` | 執行 Biome 程式碼格式化（`biome format --write .`） |
| `bun lint` | 執行 Biome Linter 檢查（`biome lint --write .`） |
| `bun run deploy` | 建置並透過 `rsync` 發布至 Nginx 網站目錄 |

---

## 3. 目錄結構與架構約定 (Project Structure & Conventions)

```text
mango-lands-blog/
├── src/
│   ├── assets/              # 靜態圖片、頭像 (如 avatars-rmback.png)
│   ├── content/             # Astro 內容集合 (Content Collections)
│   │   ├── config.ts        # 文章 Schema 定義 (zod)
│   │   └── posts/           # Markdown 文章檔案（含 programming/, photography/, essays/ 子目錄）
│   ├── layouts/
│   │   └── BaseLayout.astro # 全站基礎 Layout (包含 SEO, Anti-FOUC 腳本, Nav, Footer)
│   ├── pages/               # 頁面與路由
│   │   ├── index.astro      # 首頁（展示三大核心主題最新 3 篇文章）(/)
│   │   ├── programming.astro# 程式設計專題頁 (/programming)
│   │   ├── photography.astro# 攝影專題頁 (/photography)
│   │   ├── essays.astro     # 隨筆札記專題頁 (/essays)
│   │   ├── archives.astro   # 時間軸文章歸檔頁 (/archives)
│   │   ├── about.astro      # 關於我頁面 (/about)
│   │   ├── posts/[...slug].astro # 單篇文章內容頁 (包含 TOC 與代碼複製按鈕)
│   │   └── tags/            # 標籤總覽 (index.astro) 與單一標籤頁 ([tag].astro)
│   └── styles/
│       └── global.css       # 全域樣式、主題變數、排版與元件 CSS
├── biome.json               # Biome 格式化與 Linter 配置
├── astro.config.mjs         # Astro 設定檔
├── package.json
└── tsconfig.json
```

### 內容模型規範 (Content Collection Schema)

在 `src/content/config.ts` 中定義了 `posts` 集合，所有發布於 `src/content/posts/*.md` 的文章需遵循以下 Frontmatter 欄位：

```yaml
---
title: "文章標題"
description: "文章簡述（可選）"
date: 2026-01-15
category: programming  # 必填/預設值：programming | photography | essays
tags: [astro, web, css] # 標籤陣列（可選）
---
```

### 主題導覽結構 (Navigation Structure)

頂部 Nav 採「三段式架構」：
1. **左側 (Brand)**：芒果頭像 + `Mango Lands`（回首頁）
2. **中間 (Topics)**：三大核心主題膠囊群（`程式設計`、`攝影`、`隨筆`），具備路徑匹配高亮（Active State）
3. **右側 (Meta & Actions)**：站點輔助連結（`所有文章`、`標籤`、`關於我`）+ **深淺色主題切換按鈕 ☀️/🌙** + 行動端漢堡選單

---

## 4. 代碼風格與開發規範 (Coding Standards)

### 4.1 CSS & 主題變數規範
- **嚴禁在樣式中寫死固定深/淺色代碼**（例如禁止直接寫 `#1f2933` 或 `#ffffff`）。
- **必須使用 CSS 語意化變數**：
  - 背景色：`var(--bg)`（底色）、`var(--bg-subtle)`（次級底色）、`var(--bg-surface)`（卡片底色）、`var(--bg-surface-hover)`
  - 文字色：`var(--fg)`（主內文）、`var(--fg-strong)`（標題與強調）、`var(--muted)`（次要/日期）
  - 邊框色：`var(--border)`、`var(--border-hover)`
  - 品牌色：`var(--accent)`（琥珀金）、`var(--accent-glow)`、`var(--accent-soft)`、`var(--accent-dim)`
  - 陰影：`var(--card-shadow)`、`var(--card-shadow-hover)`
  - 程式碼：`var(--code-bg)`、`var(--code-inline-bg)`、`var(--code-inline-fg)`
- **CSS Specificity 順序**：一般元素選擇器（如 `a`, `h1-h4`）宣告於頂部，後續再宣告複合/子類別選擇器，避免觸發 Biome 的 `noDescendingSpecificity` 警告。

### 4.2 TypeScript & Astro 規範
- 使用 TypeScript 嚴格型別，善用 Astro 提供的 `getCollection` 與 `InferEntrySchema`。
- `BaseLayout.astro` 內建防閃爍（Anti-FOUC）腳本，任何涉及全域主題設定的邏輯應維持在 `<head>` 內聯執行。
- 在所有非同步操作與靜態路徑產生（`getStaticPaths`）中妥善處理空資料狀態。

### 4.3 程式碼格式化與檢查
- 本專案採用 **Biome** 進行格式化與代碼品質控管：
  - 縮排：2 個空格（Space）
  - 每行最大寬度：80 字元
  - 字串引號：雙引號 `"`
  - 結尾分號：總是加上 `;`
- 提交代碼前務必執行 `bun check` 確保 0 errors 與 0 warnings。
