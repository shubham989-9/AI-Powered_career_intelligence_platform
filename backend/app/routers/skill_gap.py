from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User

from app.utils.security import get_current_user

from app.services.ats_analyzer import analyze_resume_against_jd
from app.services.skill_gap import generate_skill_gap

from app.schemas.skill_gap import (
    SkillGapRequest,
    SkillGapResponse
)

router = APIRouter(
    prefix="/skill-gap",
    tags=["Skill Gap"]
)


@router.post(
    "/analyze",
    response_model=SkillGapResponse
)
def analyze_skill_gap(
    data: SkillGapRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    resume = db.query(Resume).filter(
        Resume.id == data.resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    job = db.query(JobDescription).filter(
        JobDescription.id == data.job_description_id,
        JobDescription.user_id == current_user.id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    resume_skills = []

    if resume.extracted_skills:
        resume_skills = [
            x.strip()
            for x in resume.extracted_skills.split(",")
            if x.strip()
        ]

    jd_skills = []

    if job.required_skills:
        jd_skills = [
            x.strip()
            for x in job.required_skills.split(",")
            if x.strip()
        ]

    analysis = analyze_resume_against_jd(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        jd_text=job.description or "",
        jd_skills=jd_skills
    )

    result = generate_skill_gap(
        matching_skills=analysis["matching_skills"],
        missing_skills=analysis["missing_skills"]
    )

    return SkillGapResponse(**result)