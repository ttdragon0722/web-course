# 用戶 CRUD Demo（FastAPI + 本地 JSON）

搭配投影片 `future.html` 的「後端科普」單元 —— 把投影片裡那個
「一個人 = 一筆用戶 JSON」的概念，做成一個真的可以打的 API。

```json
{ "名字": "Rex", "出生年月日": "1995-07-22", "身高": 180, "體重": 60 }
```

## 檔案結構

```
demo/
├── main.py            FastAPI 入口，掛上 router
├── models.py          資料模型 / 驗證（Pydantic）
├── database.py        本地 JSON 當資料庫，負責讀寫
├── routers/
│   └── users.py       用戶相關的所有 API 路由
├── data/
│   └── users.json     資料就存在這個檔
├── index.html         前端模擬頁（原生 JS，無依賴）
└── requirements.txt
```

## 前端模擬頁

`index.html` 用原生 `fetch()` 打這支 API，示範完整流程：
**前端 → API → 後端 → JSON → 前端更新畫面**。功能：列出用戶卡片、新增（POST）、刪除（DELETE）。

兩種開法都可以：

1. **後端直接服務**（推薦）：啟動 uvicorn 後打開 <http://127.0.0.1:8000/app>
2. **直接雙擊** `index.html`：以 `file://` 開啟，已開 CORS 所以也能連到本機後端

## 安裝與啟動

在 `demo` 資料夾底下執行：

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

啟動後打開互動式文件，可以直接點按測試每個 API：

> http://127.0.0.1:8000/docs

## API 一覽（對應 CRUD）

| 方法     | 路徑           | 說明           | CRUD   |
| -------- | -------------- | -------------- | ------ |
| `GET`    | `/users`       | 取得所有用戶   | Read   |
| `GET`    | `/users/{id}`  | 取得單一用戶   | Read   |
| `POST`   | `/users`       | 新增用戶       | Create |
| `PUT`    | `/users/{id}`  | 更新用戶       | Update |
| `DELETE` | `/users/{id}`  | 刪除用戶       | Delete |

## 用指令試試看（curl）

```bash
# 取得全部
curl http://127.0.0.1:8000/users

# 新增一筆（POST 送 JSON）
curl -X POST http://127.0.0.1:8000/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"小明\",\"birthday\":\"2000-01-01\",\"height\":170,\"weight\":65}"

# 取得單一
curl http://127.0.0.1:8000/users/1

# 刪除
curl -X DELETE http://127.0.0.1:8000/users/1
```

> Windows PowerShell 裡 curl 是 `Invoke-WebRequest` 的別名，
> 建議直接用 `/docs` 頁面點按測試，最直覺。

## 對應投影片的觀念

- **URL 解析**：`/users/1?...` 就是投影片講的「路徑 + 查詢字串」。
- **HTTP 方法**：GET 要資料、POST 送資料 —— 同一個網址用不同方法做不同事。
- **JSON**：前端送進來、後端回出去的，都是 JSON。
- **Status Code**：成功 `200` / 新增成功 `201` / 找不到 `404`（在 `/docs` 都看得到）。
