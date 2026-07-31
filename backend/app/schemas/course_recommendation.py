from pydantic import BaseModel
from typing import List


# Request from frontend
class CourseRecommendationRequest(BaseModel):
    resume_id: int
    job_description_id: int


# Single recommended course
class RecommendedCourse(BaseModel):
    skill: str
    course_name: str
    platform: str
    level: str
    course_url: str


# Single learning path step
class LearningPathStep(BaseModel):
    step: int
    skill: str
    status: str


# Final API response
class CourseRecommendationResponse(BaseModel):
    missing_skills: List[str]
    recommended_courses: List[RecommendedCourse]
    learning_path: List[LearningPathStep]