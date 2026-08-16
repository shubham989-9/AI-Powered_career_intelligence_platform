from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database import get_db

from app.models.feedback import Feedback
from app.models.user import User

from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/feedback",
    tags=["Admin - User Feedback Management"]
)


# =========================================================
# USER FEEDBACK MANAGEMENT OVERVIEW
# =========================================================

@router.get("/overview")
def get_feedback_overview(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # ALL FEEDBACK
    # =====================================================

    all_feedback = (
        db.query(Feedback)
        .order_by(
            Feedback.created_at.desc()
        )
        .all()
    )

    total_feedback = len(all_feedback)


    # =====================================================
    # BASIC STATISTICS
    # =====================================================

    ratings = [
        feedback.rating
        for feedback in all_feedback
        if feedback.rating is not None
    ]


    if ratings:

        average_rating = round(
            sum(ratings) / len(ratings),
            1
        )

        highest_rating = max(ratings)

        lowest_rating = min(ratings)

    else:

        average_rating = 0

        highest_rating = 0

        lowest_rating = 0


    # =====================================================
    # RATING DISTRIBUTION
    # =====================================================

    rating_counter = Counter(
        ratings
    )


    rating_distribution = [

        {
            "rating": rating,
            "count": rating_counter.get(
                rating,
                0
            )
        }

        for rating in range(5, 0, -1)

    ]


    # =====================================================
    # CATEGORY DISTRIBUTION
    # =====================================================

    category_counter = Counter()


    for feedback in all_feedback:

        if feedback.category:

            category_counter[
                feedback.category.strip()
            ] += 1


    category_distribution = [

        {
            "category": category,
            "count": count
        }

        for category, count
        in category_counter.most_common(10)

    ]


    # =====================================================
    # SEARCH
    # =====================================================

    search = search.strip()


    query = (
        db.query(
            Feedback,
            User
        )
        .join(
            User,
            Feedback.user_id == User.id
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

                Feedback.category.ilike(
                    search_pattern
                ),

                Feedback.message.ilike(
                    search_pattern
                )

            )

        )


    # =====================================================
    # RECENT FEEDBACK
    # =====================================================

    records = (

        query

        .order_by(
            Feedback.created_at.desc()
        )

        .limit(100)

        .all()

    )


    recent_feedback = []


    for feedback, user in records:

        recent_feedback.append({

            "id":
                feedback.id,

            "user_id":
                user.id,

            "user_name":
                user.full_name,

            "user_email":
                user.email,

            "rating":
                feedback.rating,

            "category":
                feedback.category,

            "message":
                feedback.message,

            "created_at":
                feedback.created_at

        })


    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "statistics": {

            "total_feedback":
                total_feedback,

            "average_rating":
                average_rating,

            "highest_rating":
                highest_rating,

            "lowest_rating":
                lowest_rating

        },

        "rating_distribution":
            rating_distribution,

        "category_distribution":
            category_distribution,

        "recent_feedback":
            recent_feedback

    }
