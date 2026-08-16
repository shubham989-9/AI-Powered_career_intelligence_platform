from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
)

from datetime import datetime

from app.database import Base


class APIMonitoring(Base):

    __tablename__ = "api_monitoring"

    # =====================================================
    # PRIMARY KEY
    # =====================================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # =====================================================
    # HTTP METHOD
    # =====================================================

    method = Column(
        String(20),
        nullable=False,
        index=True
    )

    # =====================================================
    # API ENDPOINT
    # =====================================================

    endpoint = Column(
        String(255),
        nullable=False,
        index=True
    )

    # =====================================================
    # STATUS CODE
    # =====================================================

    status_code = Column(
        Integer,
        nullable=False,
        index=True
    )

    # =====================================================
    # RESPONSE TIME
    # =====================================================

    response_time = Column(
        Float,
        nullable=False,
        default=0
    )

    # =====================================================
    # STATUS
    # =====================================================

    status = Column(
        String(30),
        nullable=False,
        default="Success",
        index=True
    )

    # =====================================================
    # ERROR MESSAGE
    # =====================================================

    error_message = Column(
        String(500),
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