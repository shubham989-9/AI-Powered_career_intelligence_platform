from pydantic import BaseModel
from typing import List


class CareerRecommendationRequest(BaseModel):
    resume_id: int
    job_description_id: int


class CareerRecommendationResponse(BaseModel):

    best_career: str

    match_percentage: int

    reasons: List[str]

    alternative_careers: List[str]

    growth_outlook: str