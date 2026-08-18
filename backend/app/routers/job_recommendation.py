import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.user import User
from app.models.profile import Profile
from app.models.job_recommendation_analysis import JobRecommendationAnalysis

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
    # Persist Job Recommendations in Database for Admin Monitoring
    # =================================================

    job_items = result.get("recommended_jobs", result.get("jobs", result.get("recommendations", [])))
    if isinstance(job_items, list) and len(job_items) > 0:
        total_recs = len(job_items)
        first_item = job_items[0]
        if isinstance(first_item, dict):
            top_title = first_item.get("job_title", first_item.get("title", "Software Developer"))
            top_match = int(first_item.get("match_percentage", first_item.get("match_score", 85)))
        else:
            top_title = str(first_item)
            top_match = 80
    else:
        total_recs = int(result.get("total_recommendations", 0))
        top_title = str(result.get("top_job_title", "Software Developer"))
        top_match = int(result.get("top_match_percentage", 80))

    try:
        recs_json_str = json.dumps(job_items)
    except Exception:
        recs_str = str(job_items)
        recs_json_str = recs_str

    existing_record = (
        db.query(JobRecommendationAnalysis)
        .filter(
            JobRecommendationAnalysis.user_id == current_user.id,
            JobRecommendationAnalysis.resume_id == resume.id
        )
        .first()
    )

    if existing_record:
        existing_record.total_recommendations = total_recs
        existing_record.top_job_title = top_title
        existing_record.top_match_percentage = top_match
        existing_record.recommendations = recs_json_str
    else:
        new_analysis = JobRecommendationAnalysis(
            user_id=current_user.id,
            resume_id=resume.id,
            total_recommendations=total_recs,
            top_job_title=top_title,
            top_match_percentage=top_match,
            recommendations=recs_json_str
        )
        db.add(new_analysis)

    db.commit()

    # =================================================
    # Response
    # =================================================

    return JobRecommendationResponse(**result)