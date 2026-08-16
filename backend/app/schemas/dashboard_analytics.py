from pydantic import BaseModel
from typing import List


# ==========================================
# Career Recommendation
# ==========================================

class DashboardCareer(BaseModel):
    career: str
    match_percentage: float


# ==========================================
# Course Recommendation
# ==========================================

class DashboardCourse(BaseModel):
    skill: str
    course_name: str
    platform: str


# ==========================================
# Salary Prediction
# ==========================================

class DashboardSalaryPrediction(BaseModel):
    estimated_min: int
    estimated_max: int
    market_position: str
    confidence: int
    insight: str


# ==========================================
# Dashboard Analytics Response
# ==========================================

class DashboardAnalyticsResponse(BaseModel):

    # Overview
    ats_score: float
    resume_status: str
    job_description_status: str
    profile_completion: int

    # Skills
    matching_skills: List[str]
    missing_skills: List[str]

    # Recommendations
    recommended_careers: List[DashboardCareer]
    recommended_courses: List[DashboardCourse]

    # Salary Prediction
    salary_prediction: DashboardSalaryPrediction