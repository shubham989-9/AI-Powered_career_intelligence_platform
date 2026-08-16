from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
)

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database import Base


class Feedback(Base):

    __tablename__ = "feedback"

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
    # RATING
    # =====================================================

    rating = Column(
        Integer,
        nullable=False
    )

    # =====================================================
    # CATEGORY
    # =====================================================

    category = Column(
        String(100),
        nullable=True
    )

    # =====================================================
    # MESSAGE
    # =====================================================

    message = Column(
        Text,
        nullable=False
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
    # USER RELATIONSHIP
    # =====================================================

    user = relationship(
        "User"
    )