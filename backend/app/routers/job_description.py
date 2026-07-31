from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db

from app.models.job_description import JobDescription
from app.models.user import User

from app.schemas.job_description import (
    JobDescriptionCreate,
    JobDescriptionUpdate,
)

from app.utils.security import get_current_user

from app.services.jd_parser import extract_required_skills


router = APIRouter(
    prefix="/job-description",
    tags=["Job Description"]
)


# =====================================================
# Add Job Description
# =====================================================

@router.post("/add")
def add_job_description(
    data: JobDescriptionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    skills = extract_required_skills(
        data.description
    )

    job = JobDescription(
        user_id=current_user.id,
        job_title=data.job_title,
        company=data.company,
        location=data.location,
        description=data.description,
        required_skills=", ".join(skills)
    )

    db.add(job)
    db.commit()
    db.refresh(job)

    return {
        "message": "Job Description Added Successfully",
        "job": job
    }


# =====================================================
# Get All Job Descriptions
# =====================================================

@router.get("/")
def get_job_descriptions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    jobs = (
        db.query(JobDescription)
        .filter(
            JobDescription.user_id == current_user.id
        )
        .order_by(
            JobDescription.id.desc()
        )
        .all()
    )

    return jobs


# =====================================================
# Get Single Job Description
# =====================================================

@router.get("/{job_id}")
def get_job_description(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_id,
            JobDescription.user_id == current_user.id
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    return job


# =====================================================
# Update Job Description
# =====================================================

@router.put("/{job_id}")
def update_job_description(
    job_id: int,
    data: JobDescriptionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_id,
            JobDescription.user_id == current_user.id
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    if data.job_title is not None:
        job.job_title = data.job_title

    if data.company is not None:
        job.company = data.company

    if data.location is not None:
        job.location = data.location

    if data.description is not None:
        job.description = data.description

        skills = extract_required_skills(
            data.description
        )

        job.required_skills = ", ".join(skills)

    db.commit()
    db.refresh(job)

    return {
        "message": "Job Description Updated Successfully",
        "job": job
    }


# =====================================================
# Delete Job Description
# =====================================================

@router.delete("/{job_id}")
def delete_job_description(
    job_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_id,
            JobDescription.user_id == current_user.id
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
        "message": "Job Description Deleted Successfully"
    }