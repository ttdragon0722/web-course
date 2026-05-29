
## Day 3 — JavaScript & React 初探

### 1. JS 做什麼用？

HTML = 骨架，CSS = 皮膚，**JS = 房子的電路（讓網頁動起來）**

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

### 2. jQuery — 舊時代的產物？

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

(這裡製作svg時間軸 左到右)
> 歷史脈絡：jQuery → 解決 DOM 繁瑣 → React → 解決狀態管理

---

### 3. 前端框架演進

(svg時間圖)
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


### React 舉例
這裡幫我撰寫CodeSnap圖
撰寫一個複雜的header有script

### React 舉例
React可以濃縮成
<Header />

且元件可以無限重用
(這裡幫我放5個頁面表示不同router，接放入<Header />)


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


### 匠人精神 - 從0開始學習React

### 我認為的與ai需學習與協作
在教學階段，我會比較頃向 還是去看懂程式碼
雖然可以使用ai快速建立一個ai環境
甚至token多的情況 可以一行程式碼都不必看懂就可以做出作品
但是在初期跟學習階段 或者在一些簡單的任務上 能節省token或迅速完成作業還是要自己看得懂
幫我把以上內容整理一張投影片

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
**與ai實作 我們只負責結構 樣式交給ai(教學階段 強調未來在實務上可以全ai 但是學習階段你需要看懂程式碼)**

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