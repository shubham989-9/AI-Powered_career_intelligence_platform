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


class PlatformActivity(Base):

    __tablename__ = "platform_activities"

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
    # ACTIVITY TYPE
    # =====================================================

    activity_type = Column(
        String(100),
        nullable=False,
        index=True
    )

    # =====================================================
    # MODULE
    # =====================================================

    module = Column(
        String(100),
        nullable=True,
        index=True
    )

    # =====================================================
    # DESCRIPTION
    # =====================================================

    description = Column(
        Text,
        nullable=True
    )

    # =====================================================
    # ENDPOINT
    # =====================================================

    endpoint = Column(
        String(255),
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
    # USER RELATIONSHIP
    # =====================================================

    user = relationship(
        "User"
    )