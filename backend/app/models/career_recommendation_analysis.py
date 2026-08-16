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


class CareerRecommendationAnalysis(Base):

    __tablename__ = "career_recommendation_analyses"

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
    # JOB DESCRIPTION
    # =====================================================

    job_description_id = Column(
        Integer,
        ForeignKey("job_descriptions.id"),
        nullable=False,
        index=True
    )

    # =====================================================
    # RECOMMENDED CAREER
    # =====================================================

    best_career = Column(
        String(150),
        nullable=False,
        index=True
    )

    # =====================================================
    # MATCH PERCENTAGE
    # =====================================================

    match_percentage = Column(
        Integer,
        nullable=False,
        default=0
    )

    # =====================================================
    # GROWTH OUTLOOK
    # =====================================================

    growth_outlook = Column(
        String(50),
        nullable=False,
        default="Developing"
    )

    # =====================================================
    # ALTERNATIVE CAREERS
    # Stored as comma separated text
    # =====================================================

    alternative_careers = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # REASONS
    # Stored as text
    # =====================================================

    reasons = Column(
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

    job_description = relationship(
        "JobDescription"
    )