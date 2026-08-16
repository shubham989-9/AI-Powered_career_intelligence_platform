from sqlalchemy import (
    Column,
    Integer,
    Float,
    Text,
    DateTime,
    ForeignKey,
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class ATSAnalysis(Base):

    __tablename__ = "ats_analyses"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id"),
        nullable=False
    )

    job_description_id = Column(
        Integer,
        ForeignKey("job_descriptions.id"),
        nullable=False
    )

    ats_score = Column(
        Float,
        nullable=False,
        default=0
    )

    match_percentage = Column(
        Float,
        nullable=False,
        default=0
    )

    matching_skills = Column(
        Text,
        default=""
    )

    missing_skills = Column(
        Text,
        default=""
    )

    matching_keywords = Column(
        Text,
        default=""
    )

    missing_keywords = Column(
        Text,
        default=""
    )

    recommendations = Column(
        Text,
        default=""
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship("User")

    resume = relationship("Resume")

    job_description = relationship(
        "JobDescription"
    )