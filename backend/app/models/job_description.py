from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database import Base


class JobDescription(Base):
    __tablename__ = "job_descriptions"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    job_title = Column(
        String,
        nullable=False
    )

    company = Column(
        String,
        nullable=True
    )

    location = Column(
        String,
        nullable=True
    )

    description = Column(
        Text,
        nullable=False
    )

    required_skills = Column(
        Text,
        default=""
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user = relationship("User")