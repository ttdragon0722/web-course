# PPT 設計風格規範

> 本文件整理自 `ppt/day1.html`，作為未來生成簡報的設計前後文，確保所有投影片風格一致。
> 風格定位：**極簡編輯風（Editorial Minimal）** — 黑白灰為主、單一強調色、大量留白、A4 橫向、可直接列印成 PDF。

---

## 1. 設計理念（Design Principles）

- **極簡黑白編輯風**：以中性灰階為主，幾乎不使用彩色；視覺重心靠字級層次與留白，而非色塊。
- **內容優先**：裝飾元素極少（僅一條標題裝飾線、項目符號圓點）。
- **列印友善**：以 `mm` 為主要單位、A4 橫向、每頁一張投影片、強制分頁。
- **資訊密度可控**：標題頁、內容頁、表格頁、圖文頁、元件展示頁各有固定版型。

---

## 2. 版面規格（Canvas）

| 項目 | 值 |
|------|-----|
| 投影片尺寸 | `297mm × 210mm`（A4 橫向） |
| 內距 padding | `22mm 26mm`（封面為 `30mm 26mm`） |
| 背景（頁面外） | `--bg: #fafafa` |
| 背景（投影片） | `#fff` |
| 投影片陰影 | `0 2px 16px rgba(0,0,0,0.06)` |
| 投影片間距 | `margin: 16px auto` |
| 分頁 | `page-break-after: always; break-after: page;`（最後一張為 `auto`） |
| 排版方式 | `display: flex; flex-direction: column; overflow: hidden;` |

```css
@page { size: A4 landscape; margin: 0; }
```

列印時：`.slide` 移除 margin 與陰影，維持 `297mm × 210mm` 強制分頁。

---

## 3. 色彩系統（Color Tokens）

```css
:root {
  --text:    #1a1a1a;  /* 主文字 */
  --muted:   #6b7280;  /* 次要文字、eyebrow、頁碼 */
  --line:    #e5e7eb;  /* 分隔線、邊框 */
  --bg:      #fafafa;  /* 頁面外背景、淺底 */
  --accent:  #111;     /* 強調（裝飾線、按鈕、深色 chip） */
  --code-bg: #f3f4f6;  /* 程式碼底、chip 底 */
  --good:    #059669;  /* 成功 / 正向（綠） */
  --bad:     #dc2626;  /* 錯誤 / 警示（紅） */
}
```

**使用規則（60-30-10）**
- 60% 白底 `#fff`
- 30% 中性灰（文字 `#1a1a1a` / `#2d2d2d`、次要 `#6b7280`、線 `#e5e7eb`）
- 10% 強調（黑 `#111` 用於按鈕/裝飾線；綠紅僅用於對照與狀態）

常用文字灰階：標題 `#1a1a1a`、H3 `#374151`、內文 `#2d2d2d`、輔助 `#4b5563`、極淺 `#9ca3af`。

---

## 4. 字體系統（Typography）

**字體家族**
```css
/* 內文 */
font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
             "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif;
/* 程式碼 */
font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
/* 復古還原（如 1991 網頁） */
font-family: "Times New Roman", Times, serif;
```

**字級層級（單位 pt，列印導向）**

| 元素 | 字級 | 字重 | 備註 |
|------|------|------|------|
| 封面 h1 | 44pt | 700 | `letter-spacing: -0.02em; line-height: 1.25` |
| 內容 h1 | 32pt | 700 | `letter-spacing: -0.01em; line-height: 1.2` |
| h2 | 18pt | 600 | 章節標題 |
| h3 | 14pt | 600 | 色 `#374151` |
| lead 導言 | 14pt | — | 色 `#374151` |
| 內文 p / li | 13pt | — | `line-height: 1.7`，色 `#2d2d2d` |
| 表格 | 11.5pt | — | |
| code | 11pt | — | |
| eyebrow | 11pt | 500 | 大寫、`letter-spacing: 0.12em` |
| note | 11pt | — | 斜體、`--muted` |
| 頁碼 / 頁腳 | 9–10pt | — | `--muted` |

- 全域 `line-height: 1.6`，內文段落 `1.7`。
- 啟用 `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;`

---

## 5. 核心元件（Components）

### Eyebrow（頁眉小標）
頁面主題分類，大寫＋寬字距：
```html
<div class="eyebrow">06 · 關鍵字</div>
```
`font-size: 11pt; color: --muted; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 8mm;`

### 標題裝飾線（Title Rule）
H1 下方固定一條短黑線，是全簡報的標誌性元素：
```html
<h1>標題</h1>
<div class="title-rule"></div>
```
`width: 56px; height: 3px; background: --accent; border-radius: 2px; margin-bottom: 8mm;`

### 頁腳（每頁固定）
左下角章節、右下角頁碼：
```html
<div class="page-section">02 · 網頁歷史</div>
<!-- .page-num 不必手寫，由 script.js 自動生成 -->
```
皆為 `position: absolute; bottom: 10mm;`，`9pt`，`--muted`。

> **頁碼自動化**：`.page-num` 由 `script.js` 的 `numberSlides()` 於載入時自動建立並填入，**不需手寫**。
> 規則：封面 `.cover` 算第 1 張但不顯示頁碼；過場大字頁 `.statement` 不顯示也不佔號；其餘內容頁從 `02` 起連續編號、補零兩位。
> 若 HTML 內殘留手寫 `.page-num`，腳本會覆寫（內容頁）或移除（封面 / 過場頁）。
> `.page-section`（左下章節）仍維持**手動填寫**。

### 清單（List）
- **無序清單**：自訂圓點 `::before`（5px 黑色圓點），`list-style: none`。
- **有序清單**：`counter-reset` 自訂數字，數字色 `--muted; font-weight: 600`。

### 程式碼（Inline Code）
`background: --code-bg; padding: 2px 8px; border-radius: 4px; color: #111;` 等寬字體。

### 表格（Table）
- `border-collapse: collapse; width: 100%;`
- 表頭 `background: #f9fafb; font-weight: 600; border-bottom: 2px solid #d1d5db;`
- 列分隔 `border-bottom: 1px solid --line;`，最後一列無線。

### 引言（Blockquote）
左側 3px 黑邊、淺灰底，用於「講解重點 / 金句」：
```css
border-left: 3px solid var(--text);
padding: 3mm 6mm; background: #fafafa; color: #4b5563; font-size: 12pt;
```

### 關鍵字清單（Keyword List）
每列一條底線分隔，關鍵字用 `.kw` 灰底膠囊標記（等寬字體）：
```html
<ul class="keyword-list">
  <li><span class="kw">60-30-10 color rule</span>主色 60%、輔色 30%、強調色 10%</li>
</ul>
```

### 對照列（Compare Row）
正反範例對照，紅 ✕ / 綠 ✓ 圖示：
```html
<div class="compare-row">
  <span class="icon bad">✕</span>
  <div class="content"><strong>爛 Prompt：</strong>「幫我做一個網頁」</div>
</div>
<div class="compare-row">
  <span class="icon good">✓</span>
  <div class="content"><strong>好 Prompt：</strong>「…具體描述…」</div>
</div>
```

### 圖片預留位（Placeholder）
虛線框佔位，用於待補圖片：
```css
flex: 1; min-height: 70mm; background: #fafafa;
border: 1.5px dashed #d1d5db; border-radius: 4px;
display: flex; align-items: center; justify-content: center;
color: #9ca3af; font-size: 11pt;
```

### Note（頁尾備註）
`font-size: 11pt; color: --muted; font-style: italic; margin-top: auto;`（推到底部）。

---

## 6. 版型範本（Slide Layouts）

每張投影片皆為 `<section class="slide">`，內部用 flex 直向排列。

### A. 封面（Cover）
```html
<section class="slide cover">
  <div class="day-tag">DAY 1</div>           <!-- 14pt, letter-spacing 0.3em -->
  <h1>主標題<br>副主題</h1>                    <!-- 44pt -->
  <div class="subtitle">說明文字</div>          <!-- 14pt, muted -->
  <div class="footer-line">                    <!-- 底部一條分隔線 + 左右資訊 -->
    <span>Web Course · Day 1</span><span>2026</span>
  </div>
</section>
```
特徵：`justify-content: center; align-items: flex-start;`，無 eyebrow / 頁碼。

### B. 標準內容頁
```html
<section class="slide">
  <div class="eyebrow">01 · 開場</div>
  <h1>標題</h1>
  <div class="title-rule"></div>
  <p class="lead">導言（選用）</p>
  <ul>…</ul>
  <div class="page-section">01 · 開場</div>
  <!-- .page-num 由 script.js 自動生成，不必手寫 -->
</section>
```

### C. 表格頁
標題 + 裝飾線 + `<table>` + 選用 `<blockquote>` 講解重點。

### D. 圖文頁（History Grid）
```css
.history-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 10mm; align-items: center; }
```
左文右圖；圖片 `max-height: 110mm; border: 1px solid --line; border-radius: 4px;`，配 `figcaption`（10pt 斜體）。

### E. 元件展示頁（Demo Grid）
2 欄網格，可單格跨欄（`.demo-cell.full`）；每格有 `.demo-label`（大寫小標）+ `.demo-body`（置中展示區）。
```css
.demo-grid { display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: auto 1fr; gap: 6mm; }
```

---

## 7. 間距與圓角規範（Spacing & Radius）

- **間距單位**：以 `mm` 為主（列印），UI 細節用 `px`。常見：`2mm / 3mm / 4mm / 6mm / 8mm / 10mm`。
- **標題下方節奏**：h1 `margin-bottom: 6mm` → title-rule `margin-bottom: 8mm`。
- **圓角**：小元件 `3–4px`，膠囊 / chip `999px`，裝飾線 `2px`。
- **邊框**：一律 `1px solid --line`（`#e5e7eb`）；強調邊 `2–3px solid --text/#d1d5db`。
- **陰影**：克制使用。投影片 `0 2px 16px rgba(0,0,0,0.06)`；Modal `0 4px 12px`；Toast `0 2px 8px`。

---

## 8. UI 展示元件樣式（供 Demo 頁複用）

統一語彙：白底、`1px` 灰邊、`3–4px` 圓角、深色 `#111` 作為 primary。

- **Navbar**：左 logo（700）/ 中導覽（10pt #4b5563）/ 右 CTA（黑底白字）。
- **Hero**：置中，h4 18pt + 說明 + 黑底按鈕。
- **Card**：上方漸層圖塊（`linear-gradient(135deg,#e5e7eb,#f3f4f6)`）+ 標題 + 說明。
- **Chip / Badge**：灰底膠囊；`.dark` 黑底白字；`.badge` 紅底白字小標。
- **Sidebar**：左側欄淺灰，`.active` 黑底白字。
- **Modal**：半透明遮罩 `rgba(0,0,0,0.4)` + 白卡片 + primary 黑按鈕。
- **Toast**：黑底白字 + 綠點，置底置中。
- **Breadcrumb**：灰字 + `/` 分隔，current 黑色 500。
- **Skeleton**：灰階線條漸層佔位。

---

## 9. 放映腳本（script.js）

簡報共用 `ppt/script.js`，提供「放映模式」而不破壞捲動瀏覽與列印。
在每份簡報 `</body>` 前加入一行即可：

```html
<script src="script.js"></script>
```

**運作方式**
- 自動抓取所有 `<section class="slide">`，無需額外標記。
- **自動頁碼**（`numberSlides()`）：載入時自動建立並填入 `.page-num`，封面 `.cover` 不顯示頁碼、過場頁 `.statement` 不顯示也不佔號，內容頁從 `02` 起補零兩位；新增投影片不必手寫頁碼。
- 放映用 CSS 由腳本自行注入（`#ppt-script-styles`），HTML 保持乾淨。
- 投影片為固定 `mm` 尺寸，放映時等比縮放並置中（`scaleActive`）。
- 列印（`beforeprint`）時自動退出放映，維持每頁一張的 PDF 輸出。
- 進度／放映位置同步至網址 `#slide-N`，重整可保留位置。

**操作快捷鍵**

| 操作 | 按鍵 |
|------|------|
| 進入放映（嘗試全螢幕） | `F` 或 雙擊投影片 / 右下「▶ 放映」鈕 |
| 退出 / 關閉總覽 | `Esc` |
| 下一張 | `→` `↓` `Space` `PageDown` / 點畫面右半 / 滾輪 |
| 上一張 | `←` `↑` `PageUp` / 點畫面左半 |
| 第一張 / 最後一張 | `Home` / `End` |
| 縮圖總覽 | `O`（點縮圖跳轉） |
| 跳至指定頁 | 輸入數字 + `Enter` |

> 腳本為通用設計：任何遵循本規範的簡報都能直接共用同一支 `script.js`。

---

## 10. 生成新簡報時的檢查清單（Checklist）

- [ ] 每張投影片用 `<section class="slide">`，封面加 `.cover`。
- [ ] 內容頁四件套：`eyebrow` → `h1` → `title-rule` → 內容。
- [ ] 左下 `page-section`（封面除外）手動填寫；右下 `page-num` 交由 `script.js` 自動生成，**不必手寫**。
- [ ] 顏色只用 token；強調色克制（10% 原則），彩色僅限 good/bad 狀態。
- [ ] 字級走既定層級，避免相近字級（如 16 vs 18），層次要明顯。
- [ ] 單位以 `mm` 為主，確保 A4 橫向列印正確。
- [ ] 圖片未備齊時用 `.placeholder` 虛線框佔位。
- [ ] 保留 `@page` 與 `@media print` 區塊，確保匯出 PDF 乾淨分頁。
- [ ] 內容不溢出：`.slide` 為 `overflow: hidden`，注意單頁資訊量。
