from pydantic import BaseModel, EmailStr
from typing import Literal


# ============================
# User Registration
# ============================

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


# ============================
# Login
# ============================

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Literal["Student", "Admin"]


# ============================
# Google Login
# ============================

class GoogleLoginRequest(BaseModel):
    credential: str