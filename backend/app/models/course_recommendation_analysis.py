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


class CourseRecommendationAnalysis(Base):

    __tablename__ = "course_recommendation_analyses"

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
    # TOTAL MISSING SKILLS
    # =====================================================

    total_missing_skills = Column(
        Integer,
        nullable=False,
        default=0
    )

    # =====================================================
    # TOTAL COURSES
    # =====================================================

    total_courses = Column(
        Integer,
        nullable=False,
        default=0
    )

    # =====================================================
    # MISSING SKILLS
    #
    # Stored as comma-separated text
    # =====================================================

    missing_skills = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # RECOMMENDED COURSES
    #
    # Stored as JSON-like text
    # =====================================================

    recommended_courses = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # LEARNING PATH
    #
    # Stored as JSON-like text
    # =====================================================

    learning_path = Column(
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