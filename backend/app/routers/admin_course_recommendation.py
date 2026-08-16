from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db

from app.models.course_recommendation_analysis import (
    CourseRecommendationAnalysis
)

from app.models.user import User

from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/course-recommendation",
    tags=["Admin - Course Recommendation Analytics"]
)


# =========================================================
# COURSE RECOMMENDATION ANALYTICS
# =========================================================

@router.get("/overview")
def get_course_recommendation_overview(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # ALL ANALYSES
    # =====================================================

    all_analyses = (
        db.query(CourseRecommendationAnalysis)
        .order_by(
            CourseRecommendationAnalysis.created_at.desc()
        )
        .all()
    )

    total_analyses = len(all_analyses)


    # =====================================================
    # BASIC STATISTICS
    # =====================================================

    missing_skill_counts = [
        analysis.total_missing_skills or 0
        for analysis in all_analyses
    ]

    course_counts = [
        analysis.total_courses or 0
        for analysis in all_analyses
    ]


    if missing_skill_counts:

        average_missing_skills = round(
            sum(missing_skill_counts) /
            len(missing_skill_counts)
        )

    else:

        average_missing_skills = 0


    total_courses = sum(course_counts)


    # =====================================================
    # MOST RECOMMENDED / MISSING SKILLS
    # =====================================================

    skill_counter = Counter()


    for analysis in all_analyses:

        if analysis.missing_skills:

            skills = [
                skill.strip()
                for skill in
                analysis.missing_skills.split(",")
                if skill.strip()
            ]

            for skill in skills:

                skill_counter[
                    skill.lower()
                ] += 1


    top_missing_skills = [

        {
            "skill": skill,
            "count": count
        }

        for skill, count
        in skill_counter.most_common(10)

    ]


    # =====================================================
    # SEARCH
    # =====================================================

    search = search.strip()


    query = (
        db.query(
            CourseRecommendationAnalysis,
            User
        )
        .join(
            User,
            CourseRecommendationAnalysis.user_id
            == User.id
        )
    )


    if search:

        search_pattern = f"%{search}%"


        query = query.filter(
            or_(

                User.full_name.ilike(
                    search_pattern
                ),

                User.email.ilike(
                    search_pattern
                ),

                CourseRecommendationAnalysis.missing_skills.ilike(
                    search_pattern
                ),

                CourseRecommendationAnalysis.recommended_courses.ilike(
                    search_pattern
                )

            )
        )


    # =====================================================
    # RECENT ANALYSES
    # =====================================================

    records = (
        query
        .order_by(
            CourseRecommendationAnalysis.created_at.desc()
        )
        .limit(100)
        .all()
    )


    recent_analyses = []


    for analysis, user in records:

        missing_skills = []

        if analysis.missing_skills:

            missing_skills = [
                skill.strip()
                for skill in
                analysis.missing_skills.split(",")
                if skill.strip()
            ]


        recent_analyses.append({

            "id":
                analysis.id,

            "user_id":
                user.id,

            "user_name":
                user.full_name,

            "user_email":
                user.email,

            "resume_id":
                analysis.resume_id,

            "job_description_id":
                analysis.job_description_id,

            "total_missing_skills":
                analysis.total_missing_skills,

            "total_courses":
                analysis.total_courses,

            "missing_skills":
                missing_skills,

            "created_at":
                analysis.created_at

        })


    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "statistics": {

            "total_analyses":
                total_analyses,

            "total_courses":
                total_courses,

            "average_missing_skills":
                average_missing_skills

        },

        "top_missing_skills":
            top_missing_skills,

        "recent_analyses":
            recent_analyses

    }