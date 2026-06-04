"""用戶 Router

把「用戶」相關的所有 API 路由集中在這裡，再由 main.py 掛上去。
這就是投影片講的：前端用不同的「網址 + 方法（GET/POST...）」來要資料或送資料。

對應 CRUD：
    GET    /users        取全部      (Read)
    GET    /users/{id}   取單一      (Read)
    POST   /users        新增        (Create)
    PUT    /users/{id}   更新        (Update)
    DELETE /users/{id}   刪除        (Delete)
"""

from fastapi import APIRouter, HTTPException, status

import database as db
from models import User, UserCreate

# prefix 讓底下每條路由都自動帶 /users 前綴
router = APIRouter(prefix="/users", tags=["users"])


@router.get("", response_model=list[User])
def read_users() -> list[User]:
    """取得所有用戶。"""
    return db.list_users()


@router.get("/{user_id}", response_model=User)
def read_user(user_id: int) -> User:
    """依 id 取得單一用戶；找不到回 404。"""
    user = db.get_user(user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"找不到 id={user_id} 的用戶",
        )
    return user


@router.post("", response_model=User, status_code=status.HTTP_201_CREATED)
def add_user(payload: UserCreate) -> User:
    """新增一筆用戶；成功回 201 與建立後的資料（含 id）。"""
    return db.create_user(payload)


@router.put("/{user_id}", response_model=User)
def edit_user(user_id: int, payload: UserCreate) -> User:
    """更新整筆用戶；找不到回 404。"""
    user = db.update_user(user_id, payload)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"找不到 id={user_id} 的用戶，無法更新",
        )
    return user


@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def remove_user(user_id: int) -> dict:
    """刪除用戶；找不到回 404。"""
    if not db.delete_user(user_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"找不到 id={user_id} 的用戶，無法刪除",
        )
    return {"message": f"已刪除 id={user_id} 的用戶"}
