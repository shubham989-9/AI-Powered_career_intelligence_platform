from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User

from app.utils.security import get_current_user

from app.services.ats_analyzer import analyze_resume_against_jd
from app.services.career_recommendation import (
    generate_career_recommendation
)
from app.services.course_recommendation import (
    recommend_courses
)
from app.services.dashboard_analytics import (
    build_dashboard_analytics
)

from app.schemas.dashboard_analytics import (
    DashboardAnalyticsResponse
)


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard Analytics"]
)


# =====================================================
# Get Dashboard Analytics
# =====================================================

@router.get(
    "/analytics",
    response_model=DashboardAnalyticsResponse
)
def get_dashboard_analytics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =================================================
    # Get Latest Resume
    # =================================================

    resume = (
        db.query(Resume)
        .filter(
            Resume.user_id == current_user.id
        )
        .order_by(
            Resume.id.desc()
        )
        .first()
    )

    # =================================================
    # Get Latest Job Description
    # =================================================

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.user_id == current_user.id
        )
        .order_by(
            JobDescription.id.desc()
        )
        .first()
    )

    resume_exists = resume is not None
    job_description_exists = job is not None

    # =================================================
    # Default Values
    # =================================================

    ats_score = 0

    matching_skills = []
    missing_skills = []

    recommended_careers = []
    recommended_courses = []

    # =================================================
    # Analyze Resume + JD
    # =================================================

    if resume and job:

        resume_skills = []

        if resume.extracted_skills:
            resume_skills = [
                skill.strip()
                for skill in resume.extracted_skills.split(",")
                if skill.strip()
            ]

        jd_skills = []

        if job.required_skills:
            jd_skills = [
                skill.strip()
                for skill in job.required_skills.split(",")
                if skill.strip()
            ]

        analysis = analyze_resume_against_jd(
            resume_text=resume.raw_text or "",
            resume_skills=resume_skills,
            jd_text=job.description or "",
            jd_skills=jd_skills
        )

        ats_score = analysis["ats_score"]

        matching_skills = analysis["matching_skills"]

        missing_skills = analysis["missing_skills"]

        # =============================================
        # Career Recommendation
        # =============================================

        career_result = generate_career_recommendation(
            matching_skills=matching_skills,
            missing_skills=missing_skills
        )

        recommended_careers.append({
            "career": career_result["best_career"],
            "match_percentage": career_result["match_percentage"]
        })

        # Add Alternative Careers

        for career in career_result["alternative_careers"][:2]:

            recommended_careers.append({
                "career": career,
                "match_percentage": max(
                    career_result["match_percentage"] - 10,
                    0
                )
            })

        # =============================================
        # Course Recommendations
        # =============================================

        course_results = recommend_courses(
            missing_skills
        )

        recommended_courses = [
            {
                "skill": course["skill"],
                "course_name": course["course_name"],
                "platform": course["platform"]
            }
            for course in course_results[:4]
        ]

    # =================================================
    # Profile Completion
    # =================================================

    profile_completion = 0

    if current_user:
        profile_completion += 40

    if resume_exists:
        profile_completion += 30

    if job_description_exists:
        profile_completion += 30

    # =================================================
    # Build Dashboard Response
    # =================================================

    result = build_dashboard_analytics(
        ats_score=ats_score,
        resume_exists=resume_exists,
        job_description_exists=job_description_exists,
        profile_completion=profile_completion,
        matching_skills=matching_skills,
        missing_skills=missing_skills,
        recommended_careers=recommended_careers,
        recommended_courses=recommended_courses
    )

    return DashboardAnalyticsResponse(**result)