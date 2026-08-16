from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.api_monitoring import APIMonitoring
from app.models.user import User
from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/api-monitoring",
    tags=["Admin - System/API Monitoring"]
)


# =========================================================
# SYSTEM / API MONITORING
# =========================================================

@router.get("/overview")
def get_api_monitoring_overview(
    search: str = Query(
        default="",
        max_length=100
    ),

    status: str = Query(
        default="all"
    ),

    method: str = Query(
        default="all"
    ),

    limit: int = Query(
        default=100,
        ge=1,
        le=500
    ),

    db: Session = Depends(get_db),

    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # BASIC STATISTICS
    # =====================================================

    total_requests = (
        db.query(
            func.count(APIMonitoring.id)
        )
        .scalar()
        or 0
    )


    successful_requests = (
        db.query(
            func.count(APIMonitoring.id)
        )
        .filter(
            APIMonitoring.status == "Success"
        )
        .scalar()
        or 0
    )


    failed_requests = (
        db.query(
            func.count(APIMonitoring.id)
        )
        .filter(
            APIMonitoring.status == "Failed"
        )
        .scalar()
        or 0
    )


    # =====================================================
    # TODAY
    # =====================================================

    today = datetime.utcnow().date()

    start_of_today = datetime.combine(
        today,
        datetime.min.time()
    )


    requests_today = (
        db.query(
            func.count(APIMonitoring.id)
        )
        .filter(
            APIMonitoring.created_at >=
            start_of_today
        )
        .scalar()
        or 0
    )


    # =====================================================
    # LAST 7 DAYS
    # =====================================================

    seven_days_ago = (
        datetime.utcnow()
        - timedelta(days=7)
    )


    requests_last_7_days = (
        db.query(
            func.count(APIMonitoring.id)
        )
        .filter(
            APIMonitoring.created_at >=
            seven_days_ago
        )
        .scalar()
        or 0
    )


    # =====================================================
    # AVERAGE RESPONSE TIME
    # =====================================================

    average_response_time = (
        db.query(
            func.avg(
                APIMonitoring.response_time
            )
        )
        .scalar()
        or 0
    )


    average_response_time = round(
        float(average_response_time),
        2
    )


    # =====================================================
    # SUCCESS RATE
    # =====================================================

    if total_requests > 0:

        success_rate = round(
            (
                successful_requests /
                total_requests
            ) * 100,
            2
        )

    else:

        success_rate = 0


    # =====================================================
    # API QUERY
    # =====================================================

    query = (
        db.query(APIMonitoring)
    )


    # =====================================================
    # SEARCH
    # =====================================================

    if search.strip():

        search_value = (
            f"%{search.strip()}%"
        )

        query = query.filter(
            or_(
                APIMonitoring.endpoint.ilike(
                    search_value
                ),

                APIMonitoring.method.ilike(
                    search_value
                ),

                APIMonitoring.status.ilike(
                    search_value
                ),

                APIMonitoring.error_message.ilike(
                    search_value
                )
            )
        )


    # =====================================================
    # STATUS FILTER
    # =====================================================

    if status != "all":

        query = query.filter(
            APIMonitoring.status ==
            status
        )


    # =====================================================
    # METHOD FILTER
    # =====================================================

    if method != "all":

        query = query.filter(
            APIMonitoring.method ==
            method
        )


    # =====================================================
    # RECENT API REQUESTS
    # =====================================================

    records = (
        query
        .order_by(
            APIMonitoring.created_at.desc()
        )
        .limit(limit)
        .all()
    )


    api_requests = []


    for record in records:

        api_requests.append({

            "id":
                record.id,

            "method":
                record.method,

            "endpoint":
                record.endpoint,

            "status_code":
                record.status_code,

            "response_time":
                record.response_time,

            "status":
                record.status,

            "error_message":
                record.error_message,

            "created_at":
                (
                    record.created_at.isoformat()
                    if record.created_at
                    else None
                )

        })


    # =====================================================
    # ENDPOINT STATISTICS
    # =====================================================

    endpoint_rows = (
        db.query(
            APIMonitoring.endpoint,
            func.count(
                APIMonitoring.id
            )
        )
        .group_by(
            APIMonitoring.endpoint
        )
        .order_by(
            func.count(
                APIMonitoring.id
            ).desc()
        )
        .limit(20)
        .all()
    )


    endpoint_statistics = []


    for endpoint, count in endpoint_rows:

        endpoint_statistics.append({

            "endpoint":
                endpoint,

            "count":
                count

        })


    # =====================================================
    # METHOD STATISTICS
    # =====================================================

    method_rows = (
        db.query(
            APIMonitoring.method,
            func.count(
                APIMonitoring.id
            )
        )
        .group_by(
            APIMonitoring.method
        )
        .order_by(
            func.count(
                APIMonitoring.id
            ).desc()
        )
        .all()
    )


    method_statistics = []


    for method_name, count in method_rows:

        method_statistics.append({

            "method":
                method_name,

            "count":
                count

        })


    # =====================================================
    # STATUS CODE STATISTICS
    # =====================================================

    status_rows = (
        db.query(
            APIMonitoring.status_code,
            func.count(
                APIMonitoring.id
            )
        )
        .group_by(
            APIMonitoring.status_code
        )
        .order_by(
            APIMonitoring.status_code
        )
        .all()
    )


    status_statistics = []


    for status_code, count in status_rows:

        status_statistics.append({

            "status_code":
                status_code,

            "count":
                count

        })


    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "system": {

            "backend_status":
                "Online",

            "database_status":
                "Connected"

        },

        "statistics": {

            "total_requests":
                total_requests,

            "requests_today":
                requests_today,

            "requests_last_7_days":
                requests_last_7_days,

            "successful_requests":
                successful_requests,

            "failed_requests":
                failed_requests,

            "success_rate":
                success_rate,

            "average_response_time":
                average_response_time

        },

        "endpoint_statistics":
            endpoint_statistics,

        "method_statistics":
            method_statistics,

        "status_statistics":
            status_statistics,

        "recent_requests":
            api_requests

    }