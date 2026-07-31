from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User

from app.utils.security import get_current_user

from app.services.ats_analyzer import analyze_resume_against_jd
from app.services.resume_improvement import (
    generate_resume_improvements
)

from app.schemas.resume_improvement import (
    ResumeImprovementRequest,
    ResumeImprovementResponse
)


router = APIRouter(
    prefix="/resume-improvement",
    tags=["Resume Improvement"]
)


# =====================================================
# Generate Resume Improvement Suggestions
# =====================================================

@router.post(
    "/analyze",
    response_model=ResumeImprovementResponse
)
def analyze_resume_improvement(
    data: ResumeImprovementRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =================================================
    # Get Resume
    # =================================================

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == data.resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    # =================================================
    # Get Job Description
    # =================================================

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == data.job_description_id,
            JobDescription.user_id == current_user.id
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    # =================================================
    # Resume Skills
    # =================================================

    resume_skills = []

    if resume.extracted_skills:
        resume_skills = [
            skill.strip()
            for skill in resume.extracted_skills.split(",")
            if skill.strip()
        ]

    # =================================================
    # Job Description Skills
    # =================================================

    jd_skills = []

    if job.required_skills:
        jd_skills = [
            skill.strip()
            for skill in job.required_skills.split(",")
            if skill.strip()
        ]

    # =================================================
    # ATS Comparison
    # =================================================

    analysis = analyze_resume_against_jd(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        jd_text=job.description or "",
        jd_skills=jd_skills
    )

    # =================================================
    # Generate Improvements
    # =================================================

    result = generate_resume_improvements(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        job_title=job.job_title or "Target",
        matching_skills=analysis["matching_skills"],
        missing_skills=analysis["missing_skills"]
    )

    return ResumeImprovementResponse(**result)