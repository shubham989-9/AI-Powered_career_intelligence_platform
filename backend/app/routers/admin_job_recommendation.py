from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db

from app.models.job_recommendation_analysis import (
    JobRecommendationAnalysis
)

from app.models.user import User

from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/job-recommendation",
    tags=["Admin - Job Recommendation Analytics"]
)


# =========================================================
# JOB RECOMMENDATION ANALYTICS
# =========================================================

@router.get("/overview")
def get_job_recommendation_overview(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # ALL ANALYSES
    # =====================================================

    all_analyses = (
        db.query(JobRecommendationAnalysis)
        .order_by(
            JobRecommendationAnalysis.created_at.desc()
        )
        .all()
    )

    total_analyses = len(all_analyses)


    # =====================================================
    # TOTAL RECOMMENDATIONS
    # =====================================================

    total_recommendations = sum(
        analysis.total_recommendations or 0
        for analysis in all_analyses
    )


    # =====================================================
    # MATCH SCORES
    # =====================================================

    match_scores = [
        analysis.top_match_percentage or 0
        for analysis in all_analyses
    ]


    if match_scores:

        average_match = round(
            sum(match_scores) /
            len(match_scores)
        )

        highest_match = max(match_scores)

    else:

        average_match = 0
        highest_match = 0


    # =====================================================
    # TOP JOBS
    # =====================================================

    job_counter = Counter()


    for analysis in all_analyses:

        if analysis.top_job_title:

            job_counter[
                analysis.top_job_title
            ] += 1


    top_jobs = [

        {
            "job_title": job_title,
            "count": count
        }

        for job_title, count
        in job_counter.most_common(10)

    ]


    # =====================================================
    # SEARCH
    # =====================================================

    search = search.strip()


    query = (
        db.query(
            JobRecommendationAnalysis,
            User
        )
        .join(
            User,
            JobRecommendationAnalysis.user_id
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

                JobRecommendationAnalysis.top_job_title.ilike(
                    search_pattern
                ),

                JobRecommendationAnalysis.recommendations.ilike(
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
            JobRecommendationAnalysis.created_at.desc()
        )
        .limit(100)
        .all()
    )


    recent_recommendations = []


    for analysis, user in records:

        recent_recommendations.append({

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

            "total_recommendations":
                analysis.total_recommendations,

            "top_job_title":
                analysis.top_job_title,

            "top_match_percentage":
                analysis.top_match_percentage,

            "recommendations":
                analysis.recommendations,

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

            "total_recommendations":
                total_recommendations,

            "average_match":
                average_match,

            "highest_match":
                highest_match

        },

        "top_jobs":
            top_jobs,

        "recent_recommendations":
            recent_recommendations

    }