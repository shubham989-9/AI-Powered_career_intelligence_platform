from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship

from app.database import Base

from sqlalchemy import DateTime
from datetime import datetime

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    file_name = Column(String, nullable=False)

    file_path = Column(String, nullable=False)

    extracted_email = Column(String)

    extracted_phone = Column(String)

    extracted_skills = Column(Text)

    raw_text = Column(Text)

    uploaded_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")