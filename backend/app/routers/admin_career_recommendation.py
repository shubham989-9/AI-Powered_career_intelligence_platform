from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db

from app.models.career_recommendation_analysis import (
    CareerRecommendationAnalysis
)

from app.models.user import User

from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/career-recommendation",
    tags=["Admin - Career Recommendation Analytics"]
)


# =========================================================
# CAREER RECOMMENDATION ANALYTICS
# =========================================================

@router.get("/overview")
def get_career_recommendation_overview(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # ALL ANALYSES
    # =====================================================

    all_analyses = (
        db.query(CareerRecommendationAnalysis)
        .order_by(
            CareerRecommendationAnalysis.created_at.desc()
        )
        .all()
    )

    total_analyses = len(all_analyses)


    # =====================================================
    # BASIC STATISTICS
    # =====================================================

    match_scores = [
        analysis.match_percentage
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
    # CAREER COUNTER
    # =====================================================

    career_counter = Counter()

    growth_counter = Counter()


    for analysis in all_analyses:

        if analysis.best_career:

            career_counter[
                analysis.best_career
            ] += 1


        if analysis.growth_outlook:

            growth_counter[
                analysis.growth_outlook
            ] += 1


    # =====================================================
    # TOP RECOMMENDED CAREERS
    # =====================================================

    top_careers = [

        {
            "career": career,
            "count": count
        }

        for career, count
        in career_counter.most_common(10)

    ]


    # =====================================================
    # GROWTH OUTLOOK DISTRIBUTION
    # =====================================================

    growth_outlook = [

        {
            "label": label,
            "count": count
        }

        for label, count
        in growth_counter.most_common()

    ]


    # =====================================================
    # SEARCH
    # =====================================================

    search = search.strip()

    query = (
        db.query(
            CareerRecommendationAnalysis,
            User
        )
        .join(
            User,
            CareerRecommendationAnalysis.user_id
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

                CareerRecommendationAnalysis.best_career.ilike(
                    search_pattern
                ),

                CareerRecommendationAnalysis.alternative_careers.ilike(
                    search_pattern
                ),

                CareerRecommendationAnalysis.growth_outlook.ilike(
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
            CareerRecommendationAnalysis.created_at.desc()
        )
        .limit(100)
        .all()
    )


    recent_analyses = []


    for analysis, user in records:

        alternative_careers = []

        if analysis.alternative_careers:

            alternative_careers = [
                career.strip()
                for career in
                analysis.alternative_careers.split(",")
                if career.strip()
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

            "best_career":
                analysis.best_career,

            "match_percentage":
                analysis.match_percentage,

            "growth_outlook":
                analysis.growth_outlook,

            "alternative_careers":
                alternative_careers,

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

            "average_match":
                average_match,

            "highest_match":
                highest_match

        },

        "top_careers":
            top_careers,

        "growth_outlook":
            growth_outlook,

        "recent_analyses":
            recent_analyses

    }