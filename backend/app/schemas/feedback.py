from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# =====================================================
# CREATE FEEDBACK
# =====================================================

class FeedbackCreate(BaseModel):

    rating: int

    category: Optional[str] = None

    message: str


# =====================================================
# FEEDBACK RESPONSE
# =====================================================

class FeedbackResponse(BaseModel):

    id: int

    user_id: int

    rating: int

    category: Optional[str]

    message: str

    created_at: datetime

    class Config:
        from_attributes = True