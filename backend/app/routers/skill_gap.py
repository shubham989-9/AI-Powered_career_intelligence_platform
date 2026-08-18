from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User
from app.models.skill_gap_analysis import SkillGapAnalysis
from app.utils.security import get_current_user
from app.services.ats_analyzer import analyze_resume_against_jd
from app.services.skill_gap import generate_skill_gap
from app.schemas.skill_gap import (
    SkillGapRequest,
    SkillGapResponse
)

router = APIRouter(
    prefix="/skill-gap",
    tags=["Skill Gap"]
)


@router.post(
    "/analyze",
    response_model=SkillGapResponse
)
def analyze_skill_gap(
    data: SkillGapRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = db.query(Resume).filter(
        Resume.id == data.resume_id,
        Resume.user_id == current_user.id
    ).first()

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    job = db.query(JobDescription).filter(
        JobDescription.id == data.job_description_id,
        JobDescription.user_id == current_user.id
    ).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    resume_skills = []
    if resume.extracted_skills:
        resume_skills = [
            x.strip()
            for x in resume.extracted_skills.split(",")
            if x.strip()
        ]

    jd_skills = []
    if job.required_skills:
        jd_skills = [
            x.strip()
            for x in job.required_skills.split(",")
            if x.strip()
        ]

    analysis = analyze_resume_against_jd(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        jd_text=job.description or "",
        jd_skills=jd_skills
    )

    result = generate_skill_gap(
        matching_skills=analysis["matching_skills"],
        missing_skills=analysis["missing_skills"]
    )

    # =====================================================
    # Persist Skill Gap Analysis in Database for Admin Monitoring
    # =====================================================
    match_pct = int(result.get("skill_match_percentage", result.get("match_percentage", 0)))
    matching_str = ", ".join(analysis.get("matching_skills", []))
    missing_str = ", ".join(analysis.get("missing_skills", []))

    # Update existing or insert new record
    existing_record = db.query(SkillGapAnalysis).filter(
        SkillGapAnalysis.user_id == current_user.id,
        SkillGapAnalysis.resume_id == resume.id,
        SkillGapAnalysis.job_description_id == job.id
    ).first()

    if existing_record:
        existing_record.skill_match_percentage = match_pct
        existing_record.matching_skills = matching_str
        existing_record.missing_skills = missing_str
    else:
        new_analysis = SkillGapAnalysis(
            user_id=current_user.id,
            resume_id=resume.id,
            job_description_id=job.id,
            skill_match_percentage=match_pct,
            matching_skills=matching_str,
            missing_skills=missing_str
        )
        db.add(new_analysis)

    db.commit()

    return SkillGapResponse(**result)