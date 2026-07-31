from pydantic import BaseModel
from typing import List


class SkillGapRequest(BaseModel):
    resume_id: int
    job_description_id: int


class LearningPath(BaseModel):
    skill: str
    priority: str


class SkillGapResponse(BaseModel):

    skill_match_percentage: int

    matching_skills: List[str]

    missing_skills: List[str]

    strengths: List[str]

    improvements: List[str]

    learning_path: List[LearningPath]