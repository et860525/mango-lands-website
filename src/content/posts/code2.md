---
title: "Code test1"
date: 2026-01-09
tags: [astro, blog]
description: 這是一個非常實用的功能！
---

# 這是第一篇文章。

之後會寫一些技術紀錄，也會寫一些心情。

```bash
npm install
```

這是一個非常實用的功能！為了讓讀者能快速瀏覽文章結構並跳轉到感興趣的段落，我們可以利用 Astro 的 post.render() 取得文章標題 (Headings)，並在頁面右側建立一個「目錄 (Table of Contents)」。

我們會做兩件事：

修改 src/pages/posts/[slug].astro：取得標題資料，並在頁面中加入目錄的 HTML 與 CSS。我們將使用 position: fixed 讓目錄在電腦版螢幕上固定顯示於文章右側。
修改 src/styles/global.css：加入平滑捲動 (Smooth Scrolling) 的效果，這樣點擊目錄跳轉時會有滑順的動畫體驗。
1. 修改文章頁面 (src/pages/posts/[slug].astro)
我們將從 post.render() 解構出 headings，並將其渲染為一個側邊欄。


這是一個非常實用的功能！為了讓讀者能快速瀏覽文章結構並跳轉到感興趣的段落，我們可以利用 Astro 的 post.render() 取得文章標題 (Headings)，並在頁面右側建立一個「目錄 (Table of Contents)」。

我們會做兩件事：

修改 src/pages/posts/[slug].astro：取得標題資料，並在頁面中加入目錄的 HTML 與 CSS。我們將使用 position: fixed 讓目錄在電腦版螢幕上固定顯示於文章右側。
修改 src/styles/global.css：加入平滑捲動 (Smooth Scrolling) 的效果，這樣點擊目錄跳轉時會有滑順的動畫體驗。
1. 修改文章頁面 (src/pages/posts/[slug].astro)
我們將從 post.render() 解構出 headings，並將其渲染為一個側邊欄。

這是一個非常實用的功能！為了讓讀者能快速瀏覽文章結構並跳轉到感興趣的段落，我們可以利用 Astro 的 post.render() 取得文章標題 (Headings)，並在頁面右側建立一個「目錄 (Table of Contents)」。

我們會做兩件事：

修改 src/pages/posts/[slug].astro：取得標題資料，並在頁面中加入目錄的 HTML 與 CSS。我們將使用 position: fixed 讓目錄在電腦版螢幕上固定顯示於文章右側。
修改 src/styles/global.css：加入平滑捲動 (Smooth Scrolling) 的效果，這樣點擊目錄跳轉時會有滑順的動畫體驗。
1. 修改文章頁面 (src/pages/posts/[slug].astro)
我們將從 post.render() 解構出 headings，並將其渲染為一個側邊欄。


## json 測試

```json
{
  "test": "test",
  "int_test": 1234
}
```