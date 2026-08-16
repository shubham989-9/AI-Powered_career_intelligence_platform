from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.feedback import Feedback
from app.models.user import User

from app.schemas.feedback import (
    FeedbackCreate,
    FeedbackResponse,
)

from app.utils.security import get_current_user


router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
)


# =====================================================
# SUBMIT FEEDBACK
# =====================================================

@router.post(
    "/",
    response_model=FeedbackResponse
)
def submit_feedback(
    data: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # =================================================
    # VALIDATE RATING
    # =================================================

    if data.rating < 1 or data.rating > 5:

        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5."
        )


    # =================================================
    # CREATE FEEDBACK
    # =================================================

    feedback = Feedback(

        user_id=current_user.id,

        rating=data.rating,

        category=data.category,

        message=data.message.strip()
    )


    db.add(feedback)

    db.commit()

    db.refresh(feedback)


    # =================================================
    # RESPONSE
    # =================================================

    return feedback


# =====================================================
# GET MY FEEDBACK
# =====================================================

@router.get(
    "/",
    response_model=list[FeedbackResponse]
)
def get_my_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    feedback = (
        db.query(Feedback)
        .filter(
            Feedback.user_id == current_user.id
        )
        .order_by(
            Feedback.created_at.desc()
        )
        .all()
    )


    return feedback