from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User
from app.models.profile import Profile
from app.models.career_recommendation_analysis import CareerRecommendationAnalysis

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
    # =================================================

    result = generate_career_recommendation(
        matching_skills=analysis["matching_skills"],
        missing_skills=analysis["missing_skills"],
        degree=degree,
        branch=branch,
        experience=experience,
    )

    # =================================================
    # Persist Career Analysis in Database for Admin Monitoring
    # =================================================

    best_career_val = result.get("best_career", "Software Engineer")
    match_pct_val = int(result.get("match_percentage", 0))
    growth_outlook_val = result.get("growth_outlook", "High Growth")

    alt_careers_raw = result.get("alternative_careers", [])
    alt_careers_str = (
        ", ".join(alt_careers_raw)
        if isinstance(alt_careers_raw, list)
        else str(alt_careers_raw or "")
    )

    reasons_raw = result.get("reasons", [])
    reasons_str = (
        "; ".join(reasons_raw)
        if isinstance(reasons_raw, list)
        else str(reasons_raw or "")
    )

    existing_record = (
        db.query(CareerRecommendationAnalysis)
        .filter(
            CareerRecommendationAnalysis.user_id == current_user.id,
            CareerRecommendationAnalysis.resume_id == resume.id,
            CareerRecommendationAnalysis.job_description_id == job.id,
        )
        .first()
    )

    if existing_record:
        existing_record.best_career = best_career_val
        existing_record.match_percentage = match_pct_val
        existing_record.growth_outlook = growth_outlook_val
        existing_record.alternative_careers = alt_careers_str
        existing_record.reasons = reasons_str
    else:
        new_analysis = CareerRecommendationAnalysis(
            user_id=current_user.id,
            resume_id=resume.id,
            job_description_id=job.id,
            best_career=best_career_val,
            match_percentage=match_pct_val,
            growth_outlook=growth_outlook_val,
            alternative_careers=alt_careers_str,
            reasons=reasons_str,
        )
        db.add(new_analysis)

    db.commit()

    # =================================================
    # Response
    # =================================================

    return CareerRecommendationResponse(**result)