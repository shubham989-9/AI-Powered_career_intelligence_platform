from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Text,
    DateTime,
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class JobRecommendationAnalysis(Base):

    __tablename__ = "job_recommendation_analyses"

    # =====================================================
    # PRIMARY KEY
    # =====================================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # =====================================================
    # USER
    # =====================================================

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    # =====================================================
    # RESUME
    # =====================================================

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False,
        index=True
    )

    # =====================================================
    # TOTAL RECOMMENDATIONS
    # =====================================================

    total_recommendations = Column(
        Integer,
        nullable=False,
        default=0
    )

    # =====================================================
    # TOP RECOMMENDED JOB
    # =====================================================

    top_job_title = Column(
        String(150),
        nullable=True,
        index=True
    )

    top_match_percentage = Column(
        Integer,
        nullable=False,
        default=0
    )

    # =====================================================
    # ALL RECOMMENDED JOBS
    #
    # Stored as JSON-like text
    # =====================================================

    recommendations = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # CREATED AT
    # =====================================================

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True
    )

    # =====================================================
    # RELATIONSHIPS
    # =====================================================

    user = relationship(
        "User"
    )

    resume = relationship(
        "Resume"
    )