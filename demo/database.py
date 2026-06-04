"""本地 JSON「資料庫」

用一個 users.json 檔當作最簡單的資料庫，示範 CRUD 背後其實就是：
讀檔 → 改記憶體裡的資料 → 寫回檔。

設計重點：
- 每次寫入都重新讀檔、產生「新的 list」再寫回，不直接改原物件（immutable 風格）。
- 所有讀寫都包好錯誤處理，檔案不存在或壞掉時給清楚訊息。
"""

import json
from pathlib import Path
from typing import Optional

from models import User, UserCreate

# 資料檔放在 demo/data/users.json
DATA_FILE = Path(__file__).parent / "data" / "users.json"


def _read_all() -> list[dict]:
    """從 JSON 檔讀出所有用戶；檔案不存在就回空陣列。"""
    if not DATA_FILE.exists():
        return []
    try:
        with DATA_FILE.open("r", encoding="utf-8") as f:
            data = json.load(f)
    except json.JSONDecodeError as exc:
        raise ValueError(f"資料檔格式損壞，無法解析 JSON：{exc}") from exc

    if not isinstance(data, list):
        raise ValueError("資料檔格式錯誤，最外層應為陣列 []")
    return data


def _write_all(users: list[dict]) -> None:
    """把整份用戶清單寫回 JSON 檔（覆蓋）。"""
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    with DATA_FILE.open("w", encoding="utf-8") as f:
        json.dump(users, f, ensure_ascii=False, indent=2)


def list_users() -> list[User]:
    """取得所有用戶。"""
    return [User(**row) for row in _read_all()]


def get_user(user_id: int) -> Optional[User]:
    """依 id 取得單一用戶，找不到回 None。"""
    for row in _read_all():
        if row.get("id") == user_id:
            return User(**row)
    return None


def _next_id(users: list[dict]) -> int:
    """產生下一個 id（目前最大值 + 1）。"""
    if not users:
        return 1
    return max(row.get("id", 0) for row in users) + 1


def create_user(payload: UserCreate) -> User:
    """新增一筆用戶並寫回檔案，回傳含 id 的完整資料。"""
    users = _read_all()
    new_user = User(id=_next_id(users), **payload.model_dump())
    # 不直接 append 原 list，組一份新的再寫回
    _write_all([*users, new_user.model_dump()])
    return new_user


def update_user(user_id: int, payload: UserCreate) -> Optional[User]:
    """更新指定用戶；找不到回 None。"""
    users = _read_all()
    if not any(row.get("id") == user_id for row in users):
        return None

    updated = User(id=user_id, **payload.model_dump())
    new_users = [
        updated.model_dump() if row.get("id") == user_id else row
        for row in users
    ]
    _write_all(new_users)
    return updated


def delete_user(user_id: int) -> bool:
    """刪除指定用戶；有刪到回 True，找不到回 False。"""
    users = _read_all()
    remaining = [row for row in users if row.get("id") != user_id]
    if len(remaining) == len(users):
        return False
    _write_all(remaining)
    return True
