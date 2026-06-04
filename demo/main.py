"""FastAPI 入口

啟動方式（在 demo 資料夾底下）：
    pip install -r requirements.txt
    uvicorn main:app --reload

啟動後打開：
    http://127.0.0.1:8000/docs   ← 互動式 API 文件，可直接點按測試
    http://127.0.0.1:8000/app    ← 前端模擬頁（卡片清單 + 新增 + 刪除）
"""

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from routers import users

app = FastAPI(
    title="用戶 CRUD Demo",
    description="用本地 JSON 當資料庫，示範最基礎的 CRUD（增刪查改）。",
    version="1.0.0",
)

# 開放 CORS：讓「直接雙擊開啟 index.html（file://）」的前端也能打這支 API。
# 教學用途全開；正式環境請改成只允許自己的網域。
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 把 users router 掛到 app 上
app.include_router(users.router)

# 前端頁面位置
FRONTEND = Path(__file__).parent / "index.html"


@app.get("/", tags=["root"])
def root() -> dict:
    """首頁：給個指路訊息。"""
    return {
        "message": "用戶 CRUD Demo 已啟動",
        "docs": "/docs",
        "app": "/app",
        "users": "/users",
    }


@app.get("/app", tags=["root"], include_in_schema=False)
def frontend() -> FileResponse:
    """由後端直接提供前端模擬頁（同源，免 CORS）。"""
    return FileResponse(FRONTEND)
