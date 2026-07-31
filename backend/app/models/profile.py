from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True,
        nullable=False,
    )

    phone = Column(String, nullable=True)
    college = Column(String, nullable=True)
    degree = Column(String, nullable=True)
    branch = Column(String, nullable=True)
    passing_year = Column(String, nullable=True)
    cgpa = Column(String, nullable=True)

    skills = Column(String, nullable=True)

    experience = Column(String, nullable=True)

    linkedin = Column(String, nullable=True)
    github = Column(String, nullable=True)

    city = Column(String, nullable=True)
    country = Column(String, nullable=True)

    career_goal = Column(String, nullable=True)

    certifications = Column(String, nullable=True)

    projects = Column(String, nullable=True)

    career_interests = Column(String, nullable=True)

    profile_photo = Column(String, nullable=True)

    user = relationship(
        "User",
        back_populates="profile"
    )