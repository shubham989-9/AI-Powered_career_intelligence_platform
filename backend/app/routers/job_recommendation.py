from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.user import User
from app.models.profile import Profile

from app.utils.security import get_current_user

from app.services.job_recommendation import (
    generate_job_recommendations
)

from app.schemas.job_recommendation import (
    JobRecommendationRequest,
    JobRecommendationResponse
)


router = APIRouter(
    prefix="/job-recommendation",
    tags=["Job Recommendation"]
)


# =====================================================
# Generate Job Recommendations
# =====================================================

@router.post(
    "/recommend",
    response_model=JobRecommendationResponse
)
def recommend_jobs(
    data: JobRecommendationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =================================================
    # Get Selected Resume
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
    # Get User Profile
    # =================================================

    profile = (
        db.query(Profile)
        .filter(
            Profile.user_id == current_user.id
        )
        .first()
    )

    # Default profile values
    degree = None
    branch = None
    experience = None
    city = None
    country = None

    if profile:
        degree = profile.degree
        branch = profile.branch
        experience = profile.experience
        city = profile.city
        country = profile.country

    # =================================================
    # Extract Resume Skills
    # =================================================

    resume_skills = []

    if resume.extracted_skills:
        resume_skills = [
            skill.strip()
            for skill in resume.extracted_skills.split(",")
            if skill.strip()
        ]

    if not resume_skills:
        raise HTTPException(
            status_code=400,
            detail="No skills were extracted from this resume."
        )

    # =================================================
    # Generate Recommendations
    #
    # Uses:
    # Skills
    # Qualification
    # Experience
    # Location
    # =================================================

    result = generate_job_recommendations(
        resume_skills=resume_skills,
        degree=degree,
        branch=branch,
        experience=experience,
        city=city,
        country=country,
    )

    # =================================================
    # Response
    # =================================================

    return JobRecommendationResponse(**result)