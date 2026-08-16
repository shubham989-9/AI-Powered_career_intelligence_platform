from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_, func

from app.database import get_db
from app.models.resume import Resume
from app.models.user import User
from app.utils.security import require_admin


router = APIRouter(
    prefix="/admin/resume-parsing",
    tags=["Admin - Resume Parsing Monitoring"]
)


# =========================================================
# RESUME PARSING MONITORING
# =========================================================

@router.get("/overview")
def get_resume_parsing_overview(
    search: str = "",
    db: Session = Depends(get_db),
    current_admin: User = Depends(require_admin)
):

    # -----------------------------------------------------
    # Base Query
    # -----------------------------------------------------

    query = (
        db.query(Resume, User)
        .join(User, Resume.user_id == User.id)
    )

    # -----------------------------------------------------
    # Search
    # -----------------------------------------------------

    search = search.strip()

    if search:

        search_pattern = f"%{search}%"

        query = query.filter(
            or_(
                Resume.file_name.ilike(search_pattern),
                User.full_name.ilike(search_pattern),
                User.email.ilike(search_pattern),
            )
        )

    # -----------------------------------------------------
    # Get Records
    # -----------------------------------------------------

    records = (
        query
        .order_by(Resume.uploaded_at.desc())
        .all()
    )

    # -----------------------------------------------------
    # Get ALL resumes for statistics
    # -----------------------------------------------------

    all_resumes = (
        db.query(Resume)
        .all()
    )

    total_resumes = len(all_resumes)

    successful_parsing = 0
    failed_parsing = 0

    for resume in all_resumes:

        if resume.raw_text and resume.raw_text.strip():

            successful_parsing += 1

        else:

            failed_parsing += 1

    # -----------------------------------------------------
    # Success Rate
    # -----------------------------------------------------

    if total_resumes > 0:

        success_rate = round(
            (successful_parsing / total_resumes) * 100
        )

    else:

        success_rate = 0

    # -----------------------------------------------------
    # Recent Parsing Records
    # -----------------------------------------------------

    recent_resumes = []

    for resume, user in records:

        if resume.raw_text and resume.raw_text.strip():

            status = "Parsed"

        else:

            status = "Failed"

        # Extract skills

        skills = []

        if resume.extracted_skills:

            skills = [
                skill.strip()
                for skill in resume.extracted_skills.split(",")
                if skill.strip()
            ]

        recent_resumes.append({

            "id": resume.id,

            "file_name": resume.file_name,

            "user_id": user.id,

            "user_name": user.full_name,

            "user_email": user.email,

            "status": status,

            "extracted_email":
                resume.extracted_email,

            "extracted_phone":
                resume.extracted_phone,

            "skills": skills,

            "skill_count": len(skills),

            "uploaded_at":
                resume.uploaded_at,

        })

    # -----------------------------------------------------
    # Return
    # -----------------------------------------------------

    return {

        "statistics": {

            "total_resumes": total_resumes,

            "successful_parsing":
                successful_parsing,

            "failed_parsing":
                failed_parsing,

            "success_rate":
                success_rate,

        },

        "resumes": recent_resumes,

    }