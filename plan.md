# 社團網頁課程大綱 — 完整講義內容規劃

> 設計原則：AI 是入場券，讀懂代碼才是核心競爭力。
> 每堂課節奏：概念 → 看 AI 做 → 自己改一行 → 理解那一行

---

## Day 1 — 認識網頁世界 & 用 AI 快速出作品

### 1. 自我介紹 & 經歷
- 簡短介紹自己：CS 學生、做過什麼（PDF reader、YOLO、VS Code 插件）
- 為什麼教這門課：不是要教「用 AI」，是要教「看懂 AI 生出來的東西」
- 先破題：「今天你們會做出一個網頁，下週你們會知道它為什麼長這樣」

---

### 2. 網頁的歷史（5 分鐘，輕鬆帶過）
- 1991 年 Tim Berners-Lee 發明 HTML — 純文字、無樣式
- 1994 CSS 出現 — 才有顏色和排版
- 2005 AJAX → 網頁開始「不重新整理就更新內容」（Google Maps 震驚世界）
- 重點結論：**網頁從靜態文件 → 變成應用程式**，這就是你們要學的

---

### 3. 網頁應用長什麼樣？
| 類型 | 例子 | 技術關鍵字 |
|------|------|-----------|
| 一般網站 | 個人作品集、部落格 | HTML/CSS/JS |
| Web App | Google Docs、Figma | React / Vue |
| 行動 App | Instagram（底層也是 JS） | React Native / Expo |
| 文件工具 | Notion、Anki 卡片 | Electron / Web |
| VS Code 插件 | 你用的任何插件 | TypeScript + Web API |

> 💡 講解重點：這些東西的底層語言都一樣 — HTML、CSS、JavaScript

---

### 4. 用 AI 製作網頁 — 第一個成就感
**實作目標：用 Claude / ChatGPT 在 10 分鐘內生出一個個人介紹頁面**

步驟：
1. 打開 claude.ai 或 ChatGPT
2. 貼上 Prompt（講師提供）
3. 把生出的 HTML 存成 `index.html`，用瀏覽器打開
4. 看到自己的名字出現在網頁上 ✅

> 這就是「成就感鉤子」— 先讓他們爽到，後面才聽得進去

---

### 5. Prompt 優化 — 為什麼同樣問題輸出差很多？

**概念：Prompt 是你跟 AI 說話的方式**

❌ 爛 Prompt：「幫我做一個網頁」
✅ 好 Prompt：「幫我做一個個人介紹網頁，使用 Tailwind CSS，深色背景，包含姓名、技能標籤、聯絡方式，風格參考 Linear.app」

**差異來源：**
- 沒有指定技術棧 → AI 亂猜
- 沒有視覺參考 → 輸出很醜
- 沒有說元件需求 → 東西不全

---

### 6. Prompt 關鍵字 — 設計語言

讓學生複製這些關鍵字加進 Prompt，立刻看到差異：

**UI/UX 規範關鍵字**
- `Material Design 3` — Google 的設計系統，按鈕、間距、陰影都有規範
- `Apple Human Interface Guidelines` — iOS 風格
- `8px grid system` — 所有間距是 8 的倍數，視覺才整齊

**顏色規範關鍵字**
- `60-30-10 color rule` — 主色60%、輔色30%、強調色10%
- `WCAG AA contrast` — 無障礙對比度標準（文字要看得清楚）
- `neutral palette with accent` — 灰階底色 + 一個亮色點綴

**Modern Design 風格關鍵字**
- `glassmorphism` — 毛玻璃效果
- `neumorphism` — 軟浮雕（比較小眾）
- `flat design` — 無陰影、純色塊
- `brutalist web design` — 刻意粗糙、高對比（近年流行）

---

### 7. Prompt 元件介紹 — 叫 AI 做對的東西

學生常不知道 UI 元件的名字，所以 AI 生出來的不是他們要的：

| 元件名稱 | 說明 | 常見用途 |
|---------|------|---------|
| `Header / Navbar` | 頁面頂部導覽列 | 每個網站都有 |
| `Hero Section` | 首屏大標題區塊 | Landing page 必備 |
| `Card` | 資訊卡片容器 | 商品列表、文章列表 |
| `Chip / Badge / Tag` | 小標籤 | 技能標籤、分類標記 |
| `Sidebar` | 側邊欄 | 管理後台、文件網站 |
| `Modal / Dialog` | 彈出視窗 | 確認操作、表單 |
| `Toast / Snackbar` | 底部短暫通知 | 「儲存成功」提示 |
| `Breadcrumb` | 麵包屑導覽 | 顯示你在哪一層 |
| `Skeleton Loader` | 骨架載入動畫 | 資料還沒來時的佔位 |

> 實作：讓學生把元件名稱加進 Prompt，對比前後輸出差異

---

### 8. 排版基礎 — UI/UX 觀念

**視覺重心**
- F 型閱讀模式：眼睛先看左上 → 向右 → 向下左側
- 重要資訊放左上、次要放右下
- 標題 > 副標 > 內文，字體大小要有明顯層次（不是 16px vs 18px）

**留白（White Space）**
- 留白不是浪費，是「讓視覺呼吸」
- Apple 網站的高級感 80% 來自留白
- Padding/Margin 至少 16px 起跳

**顏色心理學（30 秒版本）**
- 藍色 = 信任（銀行、科技公司）
- 紅色 = 緊急/優惠（促銷按鈕）
- 綠色 = 成功/確認
- 深色背景 + 淺色文字 = 科技感

---

### 9. GitHub Pages 部署（10 分鐘實作）

目標：讓學生的網頁有公開網址可以傳給朋友

步驟：
1. 建立 GitHub 帳號
2. 建立新 Repository（命名：`username.github.io`）
3. 上傳 `index.html`
4. Settings → Pages → Deploy from branch → main
5. 等 2 分鐘 → 你的網頁上線了 ✅

> 這是第二個成就感鉤子，而且可以發給父母看

---

## Day 2 — 看懂結構 & 自己切版

> 核心目標：AI 生出來的 HTML，你要能讀懂每一行在做什麼

### 1. 看懂 HTML 結構

**樹狀結構概念**
```
html
├── head（給瀏覽器看的設定）
│   ├── title
│   └── link（CSS 引入）
└── body（使用者看到的內容）
    ├── header
    ├── main
    │   ├── section
    │   └── article
    └── footer
```

**語意化標籤 vs 非語意化標籤**
- `<header>` `<nav>` `<main>` `<footer>` = 有意義，SEO 友好
- `<div>` `<span>` = 沒有語意，純排版用
- 為什麼重要：Google 爬蟲靠語意標籤理解網頁內容

---

### 2. 核心標籤介紹

**區塊元素（Block）— 佔滿整行**
```html
<div>   通用容器，無語意
<p>     段落
<h1>~<h6>  標題層次
<section>  邏輯區塊
<article>  獨立內容（文章、卡片）
<ul> <ol> <li>  清單
```

**行內元素（Inline）— 跟著文字流動**
```html
<span>  通用行內容器
<a>     超連結
<strong> 粗體（語意：重要）
<em>    斜體（語意：強調）
<img>   圖片
```

> 💡 關鍵概念：Block 元素預設換行，Inline 不換行 — 這是很多排版問題的根源

---

### 3. Class vs ID

| | `class` | `id` |
|--|---------|------|
| 用途 | 樣式、重複元素 | 唯一識別、JS 操作 |
| 可重複 | ✅ 一頁可多個 | ❌ 一頁只能一個 |
| CSS 選擇器 | `.card` | `#navbar` |
| 優先度 | 低 | 高（盡量少用來寫樣式）|

```html
<!-- 好的用法 -->
<div class="card">...</div>
<div class="card">...</div>   <!-- class 可以重複 -->
<nav id="main-nav">...</nav>  <!-- id 用在唯一元素 -->
```

---

### 4. `data-*` 屬性

自定義資料屬性，讓 HTML 攜帶資料供 JS 讀取：

```html
<button data-product-id="42" data-action="add-to-cart">
  加入購物車
</button>
```

```js
// JS 讀取
const btn = document.querySelector('button');
console.log(btn.dataset.productId);  // "42"
console.log(btn.dataset.action);     // "add-to-cart"
```

> 使用場景：不想為了傳資料而多一個隱藏 input

---

### 5. CSS 排版核心 — Flexbox & Grid

**Flexbox — 一維排列（一行或一列）**
```css
.container {
  display: flex;
  justify-content: space-between;  /* 水平分佈 */
  align-items: center;             /* 垂直置中 */
  gap: 16px;
}
```

**Grid — 二維排列（同時控制行和列）**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 三等分 */
  gap: 24px;
}
```

> 記憶口訣：一維用 Flex，二維用 Grid

---

### 6. 實作 — YouTube Card 設計

目標：切出一個 YouTube 影片卡片

```
┌─────────────────────┐
│   縮圖（16:9）      │
├─────────────────────┤
│ 🎵 影片標題（兩行）  │
│ 頻道名稱            │
│ 觀看次數 · 2天前    │
└─────────────────────┘
```

實作步驟：
1. 先用 AI 生出基本卡片
2. 講師逐行解釋 CSS
3. 學生改顏色、換字體、調整 padding
4. 挑戰：做出「懸停時放大」的效果（`transform: scale(1.02)`）

---

## Day 3 — JavaScript & React 初探

### 1. JS 做什麼用？

HTML = 骨架，CSS = 皮膚，**JS = 肌肉（讓網頁動起來）**

```js
// 最簡單的互動
document.querySelector('#btn').addEventListener('click', () => {
  alert('你點到我了！');
});
```

三個核心能力：
- **DOM 操作** — 改變頁面內容
- **事件處理** — 監聽點擊、輸入
- **非同步請求** — 向後端要資料（fetch API）

---

### 2. jQuery — 為什麼提它？

不是要你學，是要讓你理解「框架解決了什麼問題」：

```js
// 原生 JS — 選取所有 .card 並加 class
document.querySelectorAll('.card').forEach(el => {
  el.classList.add('active');
});

// jQuery — 同樣事情
$('.card').addClass('active');
```

jQuery 讓 DOM 操作簡單 10 倍，但：
- 2024 年瀏覽器原生 API 已經很強
- React/Vue 直接解決了更根本的問題（狀態同步）

> 歷史脈絡：jQuery → 解決 DOM 繁瑣 → React → 解決狀態管理

---

### 3. 前端框架演進

| 框架 | 誕生 | 使用者 | 特色 |
|------|------|--------|------|
| jQuery | 2006 | 10億+網站 | 選取/操作 DOM |
| Angular | 2010 | 企業後台 | 強型別、全功能 |
| React | 2013 | Facebook | 組件化、生態豐富 |
| Vue | 2014 | 亞洲市場 | 易學、漸進式 |
| Svelte | 2016 | 新興 | 無 Virtual DOM、極輕量 |

---

### 4. React 核心概念

**為什麼 Facebook 要發明 React？**
- 傳統做法：資料變了 → 手動找 DOM 元素 → 手動更新
- React 做法：資料變了 → 畫面自動重新渲染

**Component 思維**
```
整個 Facebook → 切成小組件
├── Navbar
├── NewsFeed
│   ├── Post（可重複使用）
│   │   ├── Avatar
│   │   ├── Content
│   │   └── LikeButton
└── Sidebar
```

---

### 5. React 狀態管理 — useState

```tsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);  // 宣告狀態

  return (
    <div>
      <p>點了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

> 關鍵概念：`count` 變了 → React 自動重新渲染這個組件
> 不需要 `document.getElementById('count').innerText = ...`

---

### 6. 環境建立

```bash
# 建立 React 專案
npx create-react-app my-app
# 或（更快、現代做法）
npm create vite@latest my-app -- --template react-ts

cd my-app
npm install
npm run dev
```

**專案結構解說**
```
my-app/
├── src/
│   ├── App.tsx        ← 根組件，從這裡開始改
│   ├── main.tsx       ← 入口點，不用動
│   └── components/    ← 你的組件放這裡
├── public/            ← 靜態資源
└── package.json       ← 依賴清單
```

---

### 7. 實作 — React Todo List

功能需求：
- 新增待辦事項
- 勾選完成
- 刪除項目

涉及的概念：
- `useState` — 儲存列表資料
- `Array.map()` — 渲染列表
- `filter()` — 刪除項目
- 受控元件（controlled input）

> 挑戰：用 AI 生出基礎版，然後自己加「清空全部」按鈕

---

## Day 4 — 全端概覽 & 真實世界的網頁

### 1. 前端 / 後端 / 資料庫 — 三者關係

```
使用者點按鈕
    ↓
前端（React）發 HTTP Request
    ↓
後端（FastAPI）處理邏輯
    ↓
資料庫（MySQL）存取資料
    ↓
後端回傳 JSON
    ↓
前端更新畫面
```

> 比喻：前端是餐廳大廳、後端是廚房、資料庫是食材倉庫

---

### 2. 前端框架比較

| | React | Vue | Angular |
|--|-------|-----|---------|
| 學習曲線 | 中 | 低 | 高 |
| 就業市場 | ⭐⭐⭐ | ⭐⭐ | ⭐（企業） |
| 生態系 | 最豐富 | 中等 | 完整但封閉 |
| 推薦時機 | 一般首選 | 快速上手 | 大型企業系統 |

---

### 3. 後端框架比較

| | FastAPI | Flask | Express.js | PHP |
|--|---------|-------|-----------|-----|
| 語言 | Python | Python | Node.js | PHP |
| 速度 | 極快 | 中等 | 快 | 慢 |
| 特色 | 自動 API 文件 | 極簡 | JS 全端統一 | 傳統虛擬主機 |
| 推薦 | AI 整合首選 | 快速原型 | JS 全端 | 舊系統維護 |

---

### 4. Next.js — 為什麼 React 還不夠？

**React 的問題：**
- 純前端渲染 → SEO 很差（Google 爬不到內容）
- 沒有路由系統 → 要自己裝 React Router
- 沒有後端 → API 要另外建

**Next.js 解決方案：**
- SSR（Server-Side Rendering）→ SEO 友好
- 檔案即路由 → `app/about/page.tsx` 就是 `/about`
- API Routes → 後端直接寫在同一個專案

---

### 5. URL 完整解析

```
https://api.example.com:8080/users/42?sort=asc&limit=10#profile

└── https://        協議（加密傳輸）
    └── api.        子域名
        └── example.com   主域名
            └── :8080     通訊埠（省略代表預設 443）
                └── /users/42    路徑（Path）
                    └── ?sort=asc&limit=10   查詢參數（Query String）
                        └── #profile          錨點（Hash，前端用）
```

---

### 6. FastAPI 基礎

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int, include_posts: bool = False):
    return {
        "id": user_id,
        "name": "John",
        "posts": [] if not include_posts else ["post1"]
    }
```

- 啟動：`uvicorn main:app --reload`
- 自動文件：打開 `http://localhost:8000/docs` → 可以直接測試 API

---

### 7. 資料庫設計 — MySQL 基礎

**關聯式資料庫概念**
```sql
-- 使用者表
CREATE TABLE users (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  name    VARCHAR(100) NOT NULL,
  email   VARCHAR(255) UNIQUE NOT NULL,
  created_at DATETIME DEFAULT NOW()
);

-- 文章表（外鍵連到使用者）
CREATE TABLE posts (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title   VARCHAR(200),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

> 視覺化工具推薦：TablePlus、DBeaver（讓學生看到資料真的存進去）

---

### 8. 未來展望 — 你現在會了什麼，能做什麼？

**技能地圖**
```
Day 1  →  用 AI 快速出稿 + 部署上線
Day 2  →  讀懂 HTML/CSS + 自己切版
Day 3  →  React 狀態管理 + 組件化思維
Day 4  →  全端架構 + API 設計基礎
```

**接下來可以做的專案（由簡到難）**
1. 個人作品集網站（馬上做、馬上部署）
2. Todo App + 串接本地 FastAPI
3. 簡單的記帳系統（含登入）
4. 你自己想做的任何東西

**學習路徑建議**
- CSS 不夠好 → Tailwind CSS 官方文件，每天練 30 分鐘
- JS 不熟 → javascript.info（最好的免費教材）
- React 深入 → React 官方文件（已全面改版，很好讀）
- 後端 → FastAPI 官方教學（有中文）

> 最後一句話：**AI 會生代碼，但不會理解你的需求。那個人要是你。**