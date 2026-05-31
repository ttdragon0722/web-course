
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

### 基於以上 Nextjs可以做到什麼
https://nextjs.org/docs/app/api-reference/file-conventions

### 介紹nextjs的架構
* layout
* page

### 常用File-system conventions應用
### default
### error
### loading
### not-found
### parallel route

備註 這裡可以參考 https://nextjs.org/docs/app/api-reference/file-conventions
圖片也可以引用這裡的
以上投影片一張圖一個敘述即可


### frontend <-> api <--> backend
(svg架構圖)

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
這部分你們未來上課會再上到(學校必修課) 


### Query概念
說明在網址內傳入 ..../watch?v={id} (也舉例youtube的例子 並且說明nextjs也可以做到類似的事情)
svg說明過程
id --> api --> backend --> database --> 傳回前端



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

那主要是知道這些東西的存在 在寫prompt或想達成什麼目標時 你能更快更好的表達需求