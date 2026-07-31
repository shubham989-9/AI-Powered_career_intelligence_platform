from pydantic import BaseModel
from typing import List


# ==========================================
# Request
# ==========================================

class ResumeImprovementRequest(BaseModel):
    resume_id: int
    job_description_id: int


# ==========================================
# Project Improvement
# ==========================================

class ProjectImprovement(BaseModel):
    original_text: str
    improved_text: str


# ==========================================
# Final Response
# ==========================================

class ResumeImprovementResponse(BaseModel):

    improved_summary: str

    missing_keywords: List[str]

    project_improvements: List[ProjectImprovement]

    recommended_certifications: List[str]