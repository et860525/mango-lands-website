---
title: "架設網站 Ⅰ - 使用 Astro 框架"
date: 2026-01-11
tags: [website, code, astro]
description: ""
---

## 網站呈現

架設前，我在網站呈現上考慮了幾個方案:

1. Hugo
2. Wordpress
3. 自己與 AI 慢慢產生

第一與第二方案其實是類似的，基本上都是找一些現成的框架再根據自己的需求來修改，雖然快速但自由性與有趣程度相對低，所以我選擇與 AI 來場華爾茲(我看它跳的部份)。

<hr />

## 使用技術

我這邊使用 [Astro](https://astro.build/) 框架來進行開發，主要原因有幾個:

1. **以內容為核心**: 適合用來建置主要以呈現內容為主但互動性較低的網站，像是部落格、行銷網站或電子商務平台。
2. **預設零 JavaScript**: 建置時會將頁面渲染成純 HTML，除非明確指定某個元件需要互動，否則不會傳送多餘的 JavaScript 到瀏覽器，這可以讓網站載入速度加快。
3. **開發體驗**: 對 Markdown 的支援，與直覺的檔案路由系統，能在管理文章變得更加輕鬆。

<hr />

## 開發階段

我這邊是使用 Bun 來跑專案，參考官方文件 [Use Bun with Astro](https://docs.astro.build/zh-tw/recipes/bun/)。

```bash
bun create astro blog
```

可以根據自己的需求做選擇，我這邊是都喜歡自己輸入指令所以有些都選 No:

![astro-init](/images/astro-website/astro-init.png)

安裝依賴項:

```bash
bun i
```

### Astro 設定

1. **Hot Reload 功能**: 可以在改變文章時立刻在瀏覽氣上看到變化
2. **Markdown 程式碼樣式**: 設定 markdown 的程式碼樣式

```js
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: "dracula",
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});
```

### 檔案路由

Astro 特別的地方式就是檔案即路由，依標籤(tags)來說:

- **`index.astro`**: 標籤主頁，可同時看到目前部落格里裡的所有標籤，這個檔案在 /tags 資料夾裡，在路由裡就是 `/tags`
- **`[tag].astro`**: `[tag]` 表示它是可變的，在路由裡可以是 `/tags/astro`, `/tags/code` 等

```text
.
├── public/
│   ├── images/      // 文章裡的圖片
│   └── favicon.svg
└── src/
    ├── assets/
    ├── content/
    │   ├── posts/  // 文章內容
    │   │   └── astro-website-1.md
    │   └── config.ts  // 文章的格式
    ├── layouts/
    │   └── BaseLayout.astro  // 基本頁面
    ├── pages/
    │   ├── posts/
    │   │   └── [slug].astro  // 文章頁面
    │   ├── tags/
    │   │   ├── [tag].astro  // 各個標籤的頁面
    │   │   └── index.astro  // 總標籤頁面
    │   ├── [...page].astro  // 文章目錄分頁
    │   └── about.astro  // 關於我
    └── styles/
        └── global.css
```

<hr />

## 發布

發布前要先把專案打包:

```bash
bun run build
```

最後把打包的檔案放到你的 web server，目前我都使用 [Nginx](https://nginx.org/)。

如果是租一台主機那就方便很多，但如果你是像我一樣想架設在自己家裡的，就必須要改兩個重要的東西：

1. 伺服器防火牆通過設定
2. 小烏龜(中華電信給的數據機)的設定

詳細的資訊我下一篇文章再來細講，如果有任何問題請 [email](/about) 來信。