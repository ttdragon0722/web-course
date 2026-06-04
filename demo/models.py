"""資料模型（Pydantic Schema）

對應投影片裡的「一個人 = 一筆用戶資料」概念：
    {
        "名字": "Rex",
        "出生年月日": "1995-07-22",
        "身高": 180,
        "體重": 60
    }

這裡用英文欄位名（程式好寫），description 標註中文意義。
Pydantic 會在資料進來時自動「驗證」——這就是後端守門的地方。
"""

from pydantic import BaseModel, Field


class UserBase(BaseModel):
    """用戶共用欄位（建立與更新都會用到）。"""

    name: str = Field(..., min_length=1, max_length=50, description="名字")
    birthday: str = Field(..., description="出生年月日，例如 1995-07-22")
    height: float = Field(..., gt=0, lt=300, description="身高（公分）")
    weight: float = Field(..., gt=0, lt=500, description="體重（公斤）")


class UserCreate(UserBase):
    """POST 建立用戶時，前端要送進來的資料（不含 id，由後端產生）。"""


class User(UserBase):
    """回傳給前端的完整用戶（多了一個 id）。"""

    id: int = Field(..., description="用戶編號，由後端自動產生")
