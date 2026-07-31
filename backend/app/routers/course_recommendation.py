from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User

from app.utils.security import get_current_user

from app.services.ats_analyzer import analyze_resume_against_jd
from app.services.course_recommendation import (
    recommend_courses,
    generate_learning_path,
)

from app.schemas.course_recommendation import (
    CourseRecommendationRequest,
    CourseRecommendationResponse,
)


router = APIRouter(
    prefix="/course-recommendation",
    tags=["Course Recommendation"]
)


# =====================================================
# Recommend Courses
# =====================================================

@router.post(
    "/recommend",
    response_model=CourseRecommendationResponse
)
def get_course_recommendations(
    data: CourseRecommendationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # -------------------------------------------------
    # Get Resume
    # -------------------------------------------------

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

    # -------------------------------------------------
    # Get Job Description
    # -------------------------------------------------

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

    # -------------------------------------------------
    # Resume Skills
    # -------------------------------------------------

    resume_skills = []

    if resume.extracted_skills:
        resume_skills = [
            skill.strip()
            for skill in resume.extracted_skills.split(",")
            if skill.strip()
        ]

    # -------------------------------------------------
    # Job Description Skills
    # -------------------------------------------------

    jd_skills = []

    if job.required_skills:
        jd_skills = [
            skill.strip()
            for skill in job.required_skills.split(",")
            if skill.strip()
        ]

    # -------------------------------------------------
    # Detect Missing Skills
    # -------------------------------------------------

    analysis = analyze_resume_against_jd(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        jd_text=job.description or "",
        jd_skills=jd_skills
    )

    missing_skills = analysis["missing_skills"]

    # -------------------------------------------------
    # Recommend Courses
    # -------------------------------------------------

    recommended_courses = recommend_courses(
        missing_skills
    )

    # -------------------------------------------------
    # Generate Learning Path
    # -------------------------------------------------

    learning_path = generate_learning_path(
        missing_skills
    )

    return CourseRecommendationResponse(
        missing_skills=missing_skills,
        recommended_courses=recommended_courses,
        learning_path=learning_path
    )