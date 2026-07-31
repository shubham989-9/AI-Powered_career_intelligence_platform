from pydantic import BaseModel
from typing import List, Dict, Any


class ATSAnalyzeRequest(BaseModel):
    resume_id: int
    job_description_id: int


class ATSAnalyzeResponse(BaseModel):
    resume: Dict[str, Any]
    job_description: Dict[str, Any]
    analysis: Dict[str, Any]