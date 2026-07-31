from pydantic import BaseModel
from typing import Optional
from datetime import datetime


# ============================
# Create Job Description
# ============================

class JobDescriptionCreate(BaseModel):
    job_title: str
    company: Optional[str] = None
    location: Optional[str] = None
    description: str


# ============================
# Update Job Description
# ============================

class JobDescriptionUpdate(BaseModel):
    job_title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None


# ============================
# Response Schema
# ============================

class JobDescriptionResponse(BaseModel):
    id: int
    job_title: str
    company: Optional[str]
    location: Optional[str]
    description: str
    required_skills: str
    created_at: datetime

    class Config:
        from_attributes = True