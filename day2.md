
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

### **語意化標籤 vs 非語意化標籤**
- `<header>` `<nav>` `<main>` `<footer>` = 有意義，SEO 友好
- `<div>` `<span>` = 沒有語意，純排版用
- 為什麼重要：Google 爬蟲靠語意標籤理解網頁內容

### seo是什麼 
簡短介紹seo 可以做到什麼


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

### 常用標籤
介紹 button a video img audio form input 這類型的

---

### 3. Class vs ID

| | `class` | `id` |
|--|---------|------|
| 用途 | 樣式、重複元素 | 唯一識別、JS 操作 |
| 可重複 | ✅ 一頁可多個 | ❌ 一頁只能一個 |
| CSS 選擇器 | `.card` | `#navbar` |
| 優先度 | 低 | 高（盡量少用來寫樣式）|

### 3. Class vs ID
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

### 匠人精神 手刻程式碼(?
(這頁面純大字即可)


### 6. 手刻實作 — YouTube Card 設計

目標：切出一個 YouTube 影片卡片
(截圖 yt.png 先引入但暫時空白)
