from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    Text,
    DateTime,
)
from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class SkillGapAnalysis(Base):

    __tablename__ = "skill_gap_analyses"

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
    # SKILL MATCH
    # =====================================================

    skill_match_percentage = Column(
        Integer,
        nullable=False,
        default=0
    )

    # =====================================================
    # MATCHING SKILLS
    # Stored as comma separated text
    # =====================================================

    matching_skills = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # MISSING SKILLS
    # Stored as comma separated text
    # =====================================================

    missing_skills = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # ANALYSIS DATE
    # =====================================================

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
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