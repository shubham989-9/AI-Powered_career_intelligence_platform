from typing import List, Dict


def build_dashboard_analytics(
    ats_score: float,
    resume_exists: bool,
    job_description_exists: bool,
    profile_completion: int,
    matching_skills: List[str],
    missing_skills: List[str],
    recommended_careers: List[Dict],
    recommended_courses: List[Dict],
    salary_prediction: Dict,
):
    """
    Build the final dashboard analytics response.

    This service only prepares dashboard data.
    It does not access the database or FastAPI router.
    """

    # ==========================================
    # Resume Status
    # ==========================================

    resume_status = (
        "Uploaded"
        if resume_exists
        else "Not Uploaded"
    )

    # ==========================================
    # Job Description Status
    # ==========================================

    job_description_status = (
        "Added"
        if job_description_exists
        else "Not Added"
    )

    # ==========================================
    # Profile Completion
    # ==========================================

    profile_completion = max(
        0,
        min(profile_completion, 100)
    )

    # ==========================================
    # Final Dashboard Data
    # ==========================================

    return {
        "ats_score": round(ats_score, 2),

        "resume_status": resume_status,

        "job_description_status": job_description_status,

        "profile_completion": profile_completion,

        "matching_skills": matching_skills,

        "missing_skills": missing_skills,

        "recommended_careers": recommended_careers,

        "recommended_courses": recommended_courses,

        "salary_prediction": salary_prediction,
    }