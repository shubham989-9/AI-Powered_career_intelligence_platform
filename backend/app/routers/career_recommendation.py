from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User
from app.models.profile import Profile

from app.utils.security import get_current_user

from app.services.ats_analyzer import analyze_resume_against_jd
from app.services.career_recommendation import (
    generate_career_recommendation
)

from app.schemas.career_recommendation import (
    CareerRecommendationRequest,
    CareerRecommendationResponse,
)


router = APIRouter(
    prefix="/career-recommendation",
    tags=["Career Recommendation"]
)


# =====================================================
# Career Recommendation Analysis
# =====================================================

@router.post(
    "/analyze",
    response_model=CareerRecommendationResponse,
)
def analyze_career_recommendation(
    data: CareerRecommendationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    # =================================================
    # Get Resume
    # =================================================

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == data.resume_id,
            Resume.user_id == current_user.id,
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found.",
        )

    # =================================================
    # Get Job Description
    # =================================================

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == data.job_description_id,
            JobDescription.user_id == current_user.id,
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found.",
        )

    # =================================================
    # Get User Profile
    # =================================================

    profile = (
        db.query(Profile)
        .filter(
            Profile.user_id == current_user.id
        )
        .first()
    )

    # Profile is optional.
    # Career recommendation can still work using resume skills.

    degree = None
    branch = None
    experience = None

    if profile:
        degree = profile.degree
        branch = profile.branch
        experience = profile.experience

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
    # ATS Skill Comparison
    # =================================================

    analysis = analyze_resume_against_jd(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        jd_text=job.description or "",
        jd_skills=jd_skills,
    )

    # =================================================
    # Career Recommendation
    #
    # Uses:
    # 1. Education
    # 2. Skills
    # 3. Experience
    # =================================================

    result = generate_career_recommendation(
        matching_skills=analysis["matching_skills"],
        missing_skills=analysis["missing_skills"],
        degree=degree,
        branch=branch,
        experience=experience,
    )

    # =================================================
    # Response
    # =================================================

    return CareerRecommendationResponse(**result)