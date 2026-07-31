from pydantic import BaseModel
from typing import List


class JobRecommendationRequest(BaseModel):
    resume_id: int


class RecommendedJob(BaseModel):
    job_title: str
    match_percentage: int
    matching_skills: List[str]
    missing_skills: List[str]


class JobRecommendationResponse(BaseModel):
    total_recommendations: int
    recommendations: List[RecommendedJob]