
## Day 1 — 認識網頁世界 & 用 AI 快速出作品

### 1. 自我介紹 & 經歷
- 簡短介紹自己：CS 學生、做過什麼（PDF reader、YOLO、VS Code 插件）
- 為什麼教這門課：不是要教「用 AI」，是要教「看懂 AI 生出來的東西」
- 先破題：「今天你們會做出一個網頁，下週你們會知道它為什麼長這樣」

### ezBorrow
(圖 暫空)

### vscode 插件
(圖 暫空)

### expo app 阿瓦隆之王
(圖 暫空)

### 各種小作品
(圖 暫空)

---

### 2. 網頁的歷史（5 分鐘，輕鬆帶過）
- 1991 年 Tim Berners-Lee 發明 HTML — 純文字、無樣式
(圖)


### 1994 CSS 出現 — 才有顏色和排版

### 2005 AJAX → 網頁開始「不重新整理就更新內容」（Google Maps 震驚世界）

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

---

### 5. Prompt 工程 — 為什麼同樣問題輸出差很多？

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

### **UI/UX 規範關鍵字**
- `Material Design 3` — Google 的設計系統，按鈕、間距、陰影都有規範
- `Apple Human Interface Guidelines` — iOS 風格
- `8px grid system` — 所有間距是 8 的倍數，視覺才整齊

### **顏色規範關鍵字**
- `60-30-10 color rule` — 主色60%、輔色30%、強調色10%
- `WCAG AA contrast` — 無障礙對比度標準（文字要看得清楚）
- `neutral palette with accent` — 灰階底色 + 一個亮色點綴

### **Modern Design 風格關鍵字**
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

### 元件範例(圖)
### 元件範例(圖)
### 元件範例(圖)

---

### 8. 排版基礎 — UI/UX 觀念
**視覺重心**
- F 型閱讀模式：眼睛先看左上 → 向右 → 向下左側
- 重要資訊放左上、次要放右下
- 標題 > 副標 > 內文，字體大小要有明顯層次（不是 16px vs 18px）

### **留白（White Space）**
- 留白不是浪費，是「讓視覺呼吸」
- Apple 網站的高級感 80% 來自留白
- Padding/Margin 至少 16px 起跳

### **顏色心理學（30 秒版本）**
- 藍色 = 信任（銀行、科技公司）
- 紅色 = 緊急/優惠（促銷按鈕）
- 綠色 = 成功/確認
- 深色背景 + 淺色文字 = 科技感

### 層級 (講解markdown)

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
