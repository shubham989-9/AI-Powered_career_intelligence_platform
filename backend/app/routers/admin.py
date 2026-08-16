from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_
from app.models.platform_activity import PlatformActivity
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.profile import Profile
from app.models.ats_analysis import ATSAnalysis
from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


# =========================================================
# ADMIN DASHBOARD OVERVIEW
# =========================================================

@router.get("/overview")
def admin_overview(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    total_users = (
        db.query(func.count(User.id))
        .filter(User.role != "Admin")
        .scalar()
        or 0
    )

    active_users = (
        db.query(func.count(User.id))
        .filter(
            User.role != "Admin",
            User.is_active == True
        )
        .scalar()
        or 0
    )

    inactive_users = (
        db.query(func.count(User.id))
        .filter(
            User.role != "Admin",
            User.is_active == False
        )
        .scalar()
        or 0
    )

    total_resumes = (
        db.query(func.count(Resume.id))
        .scalar()
        or 0
    )

    total_job_descriptions = (
        db.query(func.count(JobDescription.id))
        .scalar()
        or 0
    )

    total_profiles = (
        db.query(func.count(Profile.id))
        .scalar()
        or 0
    )

    today = datetime.utcnow().date()

    start_of_today = datetime.combine(
        today,
        datetime.min.time()
    )

    resumes_today = (
        db.query(func.count(Resume.id))
        .filter(
            Resume.uploaded_at >= start_of_today
        )
        .scalar()
        or 0
    )

    jobs_today = (
        db.query(func.count(JobDescription.id))
        .filter(
            JobDescription.created_at >= start_of_today
        )
        .scalar()
        or 0
    )

    seven_days_ago = (
        datetime.utcnow() - timedelta(days=7)
    )

    resumes_last_7_days = (
        db.query(func.count(Resume.id))
        .filter(
            Resume.uploaded_at >= seven_days_ago
        )
        .scalar()
        or 0
    )

    jobs_last_7_days = (
        db.query(func.count(JobDescription.id))
        .filter(
            JobDescription.created_at >= seven_days_ago
        )
        .scalar()
        or 0
    )

    recent_resumes = (
        db.query(Resume)
        .order_by(
            Resume.uploaded_at.desc()
        )
        .limit(5)
        .all()
    )

    resume_list = []

    for resume in recent_resumes:

        resume_list.append({
            "id": resume.id,
            "file_name": resume.file_name,
            "user_id": resume.user_id,
            "uploaded_at": (
                resume.uploaded_at.isoformat()
                if resume.uploaded_at
                else None
            )
        })

    recent_jobs = (
        db.query(JobDescription)
        .order_by(
            JobDescription.created_at.desc()
        )
        .limit(5)
        .all()
    )

    job_list = []

    for job in recent_jobs:

        job_list.append({
            "id": job.id,
            "job_title": job.job_title,
            "company": job.company,
            "location": job.location,
            "user_id": job.user_id,
            "created_at": (
                job.created_at.isoformat()
                if job.created_at
                else None
            )
        })

    analytics_status = {
        "ats": "Tracking integration pending",
        "career_recommendation": "Tracking integration pending",
        "job_recommendation": "Tracking integration pending",
        "feedback": "Tracking integration pending",
        "platform_activity": "Tracking integration pending",
        "system_api": "Tracking integration pending"
    }

    return {

        "admin": {
            "id": current_admin.id,
            "name": current_admin.full_name,
            "email": current_admin.email,
            "role": current_admin.role
        },

        "statistics": {

            "total_users": total_users,
            "active_users": active_users,
            "inactive_users": inactive_users,

            "total_resumes": total_resumes,

            "total_job_descriptions":
                total_job_descriptions,

            "total_profiles": total_profiles,

            "resumes_today": resumes_today,
            "jobs_today": jobs_today,

            "resumes_last_7_days":
                resumes_last_7_days,

            "jobs_last_7_days":
                jobs_last_7_days
        },

        "recent_resumes": resume_list,

        "recent_jobs": job_list,

        "analytics_status": analytics_status
    }


# =========================================================
# USER MANAGEMENT - LIST USERS
# =========================================================

@router.get("/users")
def get_users(
    search: str = Query(
        default="",
        max_length=100
    ),
    status: str = Query(
        default="all"
    ),
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    query = (
        db.query(User)
        .filter(User.role != "Admin")
    )

    # -----------------------------------------------------
    # Search
    # -----------------------------------------------------

    if search.strip():

        search_value = (
            f"%{search.strip()}%"
        )

        query = query.filter(
            (User.full_name.ilike(search_value))
            |
            (User.email.ilike(search_value))
        )

    # -----------------------------------------------------
    # Status filter
    # -----------------------------------------------------

    if status == "active":

        query = query.filter(
            User.is_active == True
        )

    elif status == "inactive":

        query = query.filter(
            User.is_active == False
        )

    users = (
        query
        .order_by(User.id.desc())
        .all()
    )

    return {
        "total": len(users),

        "users": [

            {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "is_active": user.is_active
            }

            for user in users
        ]
    }


# =========================================================
# USER MANAGEMENT - GET SINGLE USER
# =========================================================

@router.get("/users/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    user = (
        db.query(User)
        .filter(
            User.id == user_id,
            User.role != "Admin"
        )
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="Student user not found"
        )

    resume_count = (
        db.query(func.count(Resume.id))
        .filter(
            Resume.user_id == user.id
        )
        .scalar()
        or 0
    )

    job_count = (
        db.query(func.count(JobDescription.id))
        .filter(
            JobDescription.user_id == user.id
        )
        .scalar()
        or 0
    )

    return {

        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
        "is_active": user.is_active,

        "resume_count": resume_count,

        "job_description_count": job_count,

        "has_profile": user.profile is not None
    }


# =========================================================
# USER MANAGEMENT - ACTIVATE / DEACTIVATE
# =========================================================

@router.patch("/users/{user_id}/status")
def update_user_status(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # -----------------------------------------------------
    # Never allow admin account management
    # -----------------------------------------------------

    if user.role.lower() == "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin account cannot be modified here"
        )

    user.is_active = not user.is_active

    db.commit()

    db.refresh(user)

    return {

        "message": (
            "User activated successfully"
            if user.is_active
            else "User deactivated successfully"
        ),

        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "is_active": user.is_active
        }
    }


# =========================================================
# USER MANAGEMENT - DELETE USER
# =========================================================

@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # -----------------------------------------------------
    # SECURITY: Admin cannot be deleted
    # -----------------------------------------------------

    if user.role.lower() == "admin":

        raise HTTPException(
            status_code=403,
            detail="Admin account cannot be deleted"
        )

    # -----------------------------------------------------
    # Delete user's related records first
    # -----------------------------------------------------

    db.query(Resume).filter(
        Resume.user_id == user.id
    ).delete(
        synchronize_session=False
    )

    db.query(JobDescription).filter(
        JobDescription.user_id == user.id
    ).delete(
        synchronize_session=False
    )

    # Profile relationship has cascade delete
    # configured in User model.

    db.delete(user)

    db.commit()

    return {
        "message":
            "User deleted successfully"
    }
    # =========================================================
# RESUME PARSING MONITORING
# =========================================================

@router.get("/resumes/monitoring")
def resume_parsing_monitoring(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # -----------------------------------------------------
    # Basic Statistics
    # -----------------------------------------------------

    total_resumes = (
        db.query(func.count(Resume.id))
        .scalar()
        or 0
    )

    parsed_resumes = (
        db.query(func.count(Resume.id))
        .filter(
            Resume.raw_text.isnot(None),
            Resume.raw_text != ""
        )
        .scalar()
        or 0
    )

    parsing_issues = total_resumes - parsed_resumes

    # -----------------------------------------------------
    # Today
    # -----------------------------------------------------

    today = datetime.utcnow().date()

    start_of_today = datetime.combine(
        today,
        datetime.min.time()
    )

    resumes_today = (
        db.query(func.count(Resume.id))
        .filter(
            Resume.uploaded_at >= start_of_today
        )
        .scalar()
        or 0
    )

    # -----------------------------------------------------
    # Last 7 Days
    # -----------------------------------------------------

    seven_days_ago = (
        datetime.utcnow() - timedelta(days=7)
    )

    resumes_last_7_days = (
        db.query(func.count(Resume.id))
        .filter(
            Resume.uploaded_at >= seven_days_ago
        )
        .scalar()
        or 0
    )

    # -----------------------------------------------------
    # Recent Resumes
    # -----------------------------------------------------

    recent_resumes = (
        db.query(Resume)
        .order_by(
            Resume.uploaded_at.desc()
        )
        .limit(20)
        .all()
    )

    resume_list = []

    for resume in recent_resumes:

        parsed_successfully = bool(
            resume.raw_text and
            resume.raw_text.strip()
        )

        ats_score = 0

        if parsed_successfully:
            try:
                from app.services.ats_score import calculate_ats_score

                ats_result = calculate_ats_score(
                    resume.raw_text
                )

                ats_score = ats_result.get(
                    "score",
                    0
                )

            except Exception:
                ats_score = 0

        resume_list.append({

            "id": resume.id,

            "file_name": resume.file_name,

            "user_id": resume.user_id,

            "extracted_email":
                resume.extracted_email,

            "extracted_phone":
                resume.extracted_phone,

            "skills":
                (
                    resume.extracted_skills.split(", ")
                    if resume.extracted_skills
                    else []
                ),

            "uploaded_at":
                (
                    resume.uploaded_at.isoformat()
                    if resume.uploaded_at
                    else None
                ),

            "ats_score": ats_score,

            "status":
                "Parsed"
                if parsed_successfully
                else "Parsing Issue"
        })

    return {

        "statistics": {

            "total_resumes":
                total_resumes,

            "parsed_resumes":
                parsed_resumes,

            "parsing_issues":
                parsing_issues,

            "resumes_today":
                resumes_today,

            "resumes_last_7_days":
                resumes_last_7_days
        },

        "resumes":
            resume_list
    }
# =========================================================
# JOB DESCRIPTION MANAGEMENT
# =========================================================

@router.get("/jobs/management")
def job_description_management(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # -----------------------------------------------------
    # Statistics
    # -----------------------------------------------------

    total_jobs = (
        db.query(func.count(JobDescription.id))
        .scalar()
        or 0
    )

    today = datetime.utcnow().date()

    start_of_today = datetime.combine(
        today,
        datetime.min.time()
    )

    jobs_today = (
        db.query(func.count(JobDescription.id))
        .filter(
            JobDescription.created_at >= start_of_today
        )
        .scalar()
        or 0
    )

    seven_days_ago = (
        datetime.utcnow() - timedelta(days=7)
    )

    jobs_last_7_days = (
        db.query(func.count(JobDescription.id))
        .filter(
            JobDescription.created_at >= seven_days_ago
        )
        .scalar()
        or 0
    )

    # -----------------------------------------------------
    # Recent Job Descriptions
    # -----------------------------------------------------

    jobs = (
        db.query(JobDescription, User)
        .join(
            User,
            JobDescription.user_id == User.id
        )
        .order_by(
            JobDescription.created_at.desc()
        )
        .all()
    )

    job_list = []

    for job, user in jobs:

        skills = []

        if job.required_skills:

            skills = [
                skill.strip()
                for skill in job.required_skills.split(",")
                if skill.strip()
            ]

        job_list.append({

            "id": job.id,

            "job_title":
                job.job_title,

            "company":
                job.company,

            "location":
                job.location,

            "description":
                job.description,

            "required_skills":
                skills,

            "created_at":
                (
                    job.created_at.isoformat()
                    if job.created_at
                    else None
                ),

            "user": {
                "id": user.id,
                "name": user.full_name,
                "email": user.email,
            }
        })

    return {

        "statistics": {

            "total_jobs":
                total_jobs,

            "jobs_today":
                jobs_today,

            "jobs_last_7_days":
                jobs_last_7_days,
        },

        "jobs":
            job_list
    }


# =========================================================
# DELETE JOB DESCRIPTION - ADMIN
# =========================================================

@router.delete("/jobs/{job_id}")
def admin_delete_job_description(
    job_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_id
        )
        .first()
    )

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    db.delete(job)

    db.commit()

    return {
        "message":
            "Job Description deleted successfully"
    }
# =========================================================
# ATS SCORE & ANALYSIS MONITORING
# =========================================================

@router.get("/ats/monitoring")
def ats_monitoring(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    analyses = (
        db.query(ATSAnalysis, User, Resume, JobDescription)
        .join(
            User,
            ATSAnalysis.user_id == User.id
        )
        .join(
            Resume,
            ATSAnalysis.resume_id == Resume.id
        )
        .join(
            JobDescription,
            ATSAnalysis.job_description_id
            == JobDescription.id
        )
        .order_by(
            ATSAnalysis.created_at.desc()
        )
        .all()
    )

    total_analyses = len(analyses)

    if total_analyses > 0:

        average_score = round(
            sum(
                float(
                    analysis.ats_score or 0
                )
                for analysis, _, _, _ in analyses
            ) / total_analyses,
            1
        )

    else:

        average_score = 0


    high_scores = 0
    medium_scores = 0
    low_scores = 0

    analysis_list = []

    for analysis, user, resume, job in analyses:

        score = float(
            analysis.ats_score or 0
        )

        if score >= 80:

            status = "High"

            high_scores += 1

        elif score >= 60:

            status = "Medium"

            medium_scores += 1

        else:

            status = "Low"

            low_scores += 1


        matching_skills = []

        if analysis.matching_skills:

            matching_skills = [
                skill.strip()
                for skill in
                analysis.matching_skills.split(",")
                if skill.strip()
            ]


        missing_skills = []

        if analysis.missing_skills:

            missing_skills = [
                skill.strip()
                for skill in
                analysis.missing_skills.split(",")
                if skill.strip()
            ]


        analysis_list.append({

            "id": analysis.id,

            "ats_score": score,

            "match_percentage":
                float(
                    analysis.match_percentage or 0
                ),

            "status": status,

            "matching_skills":
                matching_skills,

            "missing_skills":
                missing_skills,

            "resume": {

                "id": resume.id,

                "file_name":
                    resume.file_name
            },

            "job": {

                "id": job.id,

                "job_title":
                    job.job_title,

                "company":
                    job.company
            },

            "user": {

                "id": user.id,

                "name":
                    user.full_name,

                "email":
                    user.email
            },

            "created_at":
                (
                    analysis.created_at.isoformat()
                    if analysis.created_at
                    else None
                )
        })


    return {

        "statistics": {

            "total_analyses":
                total_analyses,

            "average_score":
                average_score,

            "high_scores":
                high_scores,

            "medium_scores":
                medium_scores,

            "low_scores":
                low_scores
        },

        "analyses":
            analysis_list
    }
# =========================================================
# PLATFORM USAGE & ACTIVITY MONITORING
# =========================================================

@router.get("/platform-activity")
def platform_activity_monitoring(
    search: str = Query(
        default="",
        max_length=100
    ),
    module: str = Query(
        default="all"
    ),
    activity_type: str = Query(
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
    # ALL ACTIVITIES
    # =====================================================

    total_activities = (
        db.query(func.count(PlatformActivity.id))
        .scalar()
        or 0
    )


    # =====================================================
    # TODAY'S ACTIVITIES
    # =====================================================

    today = datetime.utcnow().date()

    start_of_today = datetime.combine(
        today,
        datetime.min.time()
    )

    activities_today = (
        db.query(func.count(PlatformActivity.id))
        .filter(
            PlatformActivity.created_at >= start_of_today
        )
        .scalar()
        or 0
    )


    # =====================================================
    # LAST 7 DAYS
    # =====================================================

    seven_days_ago = (
        datetime.utcnow() - timedelta(days=7)
    )

    activities_last_7_days = (
        db.query(func.count(PlatformActivity.id))
        .filter(
            PlatformActivity.created_at >= seven_days_ago
        )
        .scalar()
        or 0
    )


    # =====================================================
    # ACTIVE USERS TODAY
    # =====================================================

    active_users_today = (
        db.query(
            func.count(
                func.distinct(
                    PlatformActivity.user_id
                )
            )
        )
        .filter(
            PlatformActivity.created_at >= start_of_today
        )
        .scalar()
        or 0
    )


    # =====================================================
    # ACTIVITY QUERY
    # =====================================================

    query = (
        db.query(
            PlatformActivity,
            User
        )
        .join(
            User,
            PlatformActivity.user_id == User.id
        )
        .filter(
            User.role != "Admin"
        )
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
                User.full_name.ilike(
                    search_value
                ),

                User.email.ilike(
                    search_value
                ),

                PlatformActivity.activity_type.ilike(
                    search_value
                ),

                PlatformActivity.module.ilike(
                    search_value
                ),

                PlatformActivity.description.ilike(
                    search_value
                ),

                PlatformActivity.endpoint.ilike(
                    search_value
                )
            )
        )


    # =====================================================
    # MODULE FILTER
    # =====================================================

    if module != "all":

        query = query.filter(
            PlatformActivity.module == module
        )


    # =====================================================
    # ACTIVITY TYPE FILTER
    # =====================================================

    if activity_type != "all":

        query = query.filter(
            PlatformActivity.activity_type ==
            activity_type
        )


    # =====================================================
    # RECENT ACTIVITIES
    # =====================================================

    records = (
        query
        .order_by(
            PlatformActivity.created_at.desc()
        )
        .limit(limit)
        .all()
    )


    activity_list = []


    for activity, user in records:

        activity_list.append({

            "id":
                activity.id,

            "user": {

                "id":
                    user.id,

                "name":
                    user.full_name,

                "email":
                    user.email

            },

            "activity_type":
                activity.activity_type,

            "module":
                activity.module,

            "description":
                activity.description,

            "endpoint":
                activity.endpoint,

            "created_at":
                (
                    activity.created_at.isoformat()
                    if activity.created_at
                    else None
                )

        })


    # =====================================================
    # MODULE-WISE ACTIVITY
    # =====================================================

    module_rows = (
        db.query(
            PlatformActivity.module,
            func.count(
                PlatformActivity.id
            )
        )
        .join(
            User,
            PlatformActivity.user_id == User.id
        )
        .filter(
            User.role != "Admin"
        )
        .group_by(
            PlatformActivity.module
        )
        .order_by(
            func.count(
                PlatformActivity.id
            ).desc()
        )
        .all()
    )


    module_statistics = []


    for module_name, count in module_rows:

        module_statistics.append({

            "module":
                module_name or "Other",

            "count":
                count

        })


    # =====================================================
    # ACTIVITY TYPE STATISTICS
    # =====================================================

    activity_rows = (
        db.query(
            PlatformActivity.activity_type,
            func.count(
                PlatformActivity.id
            )
        )
        .join(
            User,
            PlatformActivity.user_id == User.id
        )
        .filter(
            User.role != "Admin"
        )
        .group_by(
            PlatformActivity.activity_type
        )
        .order_by(
            func.count(
                PlatformActivity.id
            ).desc()
        )
        .all()
    )


    activity_statistics = []


    for activity_name, count in activity_rows:

        activity_statistics.append({

            "activity_type":
                activity_name,

            "count":
                count

        })


    # =====================================================
    # UNIQUE USERS WITH ACTIVITY
    # =====================================================

    total_active_users = (
        db.query(
            func.count(
                func.distinct(
                    PlatformActivity.user_id
                )
            )
        )
        .join(
            User,
            PlatformActivity.user_id == User.id
        )
        .filter(
            User.role != "Admin"
        )
        .scalar()
        or 0
    )


    # =====================================================
    # RESPONSE
    # =====================================================

    return {

        "statistics": {

            "total_activities":
                total_activities,

            "activities_today":
                activities_today,

            "activities_last_7_days":
                activities_last_7_days,

            "active_users_today":
                active_users_today,

            "total_active_users":
                total_active_users

        },

        "module_statistics":
            module_statistics,

        "activity_statistics":
            activity_statistics,

        "recent_activities":
            activity_list

    }


# =========================================================
# DATA & SECURITY MANAGEMENT
# =========================================================

@router.get("/data-security")
def data_security_management(
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # =====================================================
    # USER STATISTICS
    # =====================================================

    total_users = (
        db.query(func.count(User.id))
        .scalar()
        or 0
    )

    active_users = (
        db.query(func.count(User.id))
        .filter(
            User.is_active == True
        )
        .scalar()
        or 0
    )

    inactive_users = (
        db.query(func.count(User.id))
        .filter(
            User.is_active == False
        )
        .scalar()
        or 0
    )

    # =====================================================
    # ROLE STATISTICS
    # =====================================================

    total_admins = (
        db.query(func.count(User.id))
        .filter(
            func.lower(User.role) == "admin"
        )
        .scalar()
        or 0
    )

    total_students = (
        db.query(func.count(User.id))
        .filter(
            func.lower(User.role) == "student"
        )
        .scalar()
        or 0
    )

    # =====================================================
    # RESUME DATA
    # =====================================================

    total_resumes = (
        db.query(func.count(Resume.id))
        .scalar()
        or 0
    )

    # =====================================================
    # PLATFORM ACTIVITY
    # =====================================================

    total_activities = (
        db.query(
            func.count(PlatformActivity.id)
        )
        .scalar()
        or 0
    )

    # =====================================================
    # SECURITY STATUS
    # =====================================================

    security_status = "Healthy"

    if inactive_users > 0:
        security_status = "Attention Required"

    # =====================================================
    # RETURN
    # =====================================================

    return {

        "security_status":
            security_status,

        "users": {

            "total":
                total_users,

            "active":
                active_users,

            "inactive":
                inactive_users,

            "admins":
                total_admins,

            "students":
                total_students,

        },

        "data": {

            "total_resumes":
                total_resumes,

            "total_platform_activities":
                total_activities,

        },

        "access_control": {

            "admin_accounts":
                total_admins,

            "student_accounts":
                total_students,

            "admin_protected":
                True,

        },

    }