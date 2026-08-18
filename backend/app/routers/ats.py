from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.user import User
from app.models.ats_analysis import ATSAnalysis
from app.utils.security import get_current_user
from app.services.ats_analyzer import analyze_resume_against_jd
from app.schemas.ats import ATSAnalyzeRequest, ATSAnalyzeResponse

router = APIRouter(
    prefix="/ats",
    tags=["ATS Analysis"]
)


@router.post(
    "/analyze",
    response_model=ATSAnalyzeResponse
)
def analyze_ats(
    data: ATSAnalyzeRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # ==========================
    # Get Resume
    # ==========================
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == data.resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    # ==========================
    # Get Job Description
    # ==========================
    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == data.job_description_id,
            JobDescription.user_id == current_user.id
        )
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job Description not found."
        )

    # ==========================
    # Convert Skills
    # ==========================
    resume_skills = []
    if resume.extracted_skills:
        resume_skills = [
            skill.strip()
            for skill in resume.extracted_skills.split(",")
            if skill.strip()
        ]

    jd_skills = []
    if job.required_skills:
        jd_skills = [
            skill.strip()
            for skill in job.required_skills.split(",")
            if skill.strip()
        ]

    # ==========================
    # Analyze
    # ==========================
    result = analyze_resume_against_jd(
        resume_text=resume.raw_text or "",
        resume_skills=resume_skills,
        jd_text=job.description or "",
        jd_skills=jd_skills
    )

    # ==========================
    # Save ATS Record for Admin Monitoring
    # ==========================
    ats_score_val = float(result.get("ats_score", result.get("score", 0)))
    match_pct_val = float(result.get("match_percentage", ats_score_val))

    matching_skills_str = ", ".join(result.get("matching_skills", []))
    missing_skills_str = ", ".join(result.get("missing_skills", []))
    matching_keywords_str = ", ".join(result.get("matching_keywords", []))
    missing_keywords_str = ", ".join(result.get("missing_keywords", []))
    recommendations_str = ", ".join(result.get("recommendations", []))

    # Update existing analysis for this pair or create new entry
    existing_analysis = (
        db.query(ATSAnalysis)
        .filter(
            ATSAnalysis.user_id == current_user.id,
            ATSAnalysis.resume_id == resume.id,
            ATSAnalysis.job_description_id == job.id
        )
        .first()
    )

    if existing_analysis:
        existing_analysis.ats_score = ats_score_val
        existing_analysis.match_percentage = match_pct_val
        existing_analysis.matching_skills = matching_skills_str
        existing_analysis.missing_skills = missing_skills_str
        existing_analysis.matching_keywords = matching_keywords_str
        existing_analysis.missing_keywords = missing_keywords_str
        existing_analysis.recommendations = recommendations_str
    else:
        new_analysis = ATSAnalysis(
            user_id=current_user.id,
            resume_id=resume.id,
            job_description_id=job.id,
            ats_score=ats_score_val,
            match_percentage=match_pct_val,
            matching_skills=matching_skills_str,
            missing_skills=missing_skills_str,
            matching_keywords=matching_keywords_str,
            missing_keywords=missing_keywords_str,
            recommendations=recommendations_str
        )
        db.add(new_analysis)

    db.commit()

    # ==========================
    # Response
    # ==========================
    return ATSAnalyzeResponse(
        resume={
            "id": resume.id,
            "file_name": resume.file_name
        },
        job_description={
            "id": job.id,
            "job_title": job.job_title,
            "company": job.company
        },
        analysis=result
    )