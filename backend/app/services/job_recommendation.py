from typing import List, Optional


# =====================================================
# Job Database
# =====================================================

JOB_ROLES = {

    "AI/ML Engineer": {
        "skills": [
            "python",
            "machine learning",
            "deep learning",
            "tensorflow",
            "sql",
        ],
        "qualifications": [
            "computer science",
            "artificial intelligence",
            "machine learning",
            "ai",
            "aiml",
            "information technology",
        ],
        "min_experience": 0,
    },

    "Data Scientist": {
        "skills": [
            "python",
            "machine learning",
            "pandas",
            "numpy",
            "sql",
        ],
        "qualifications": [
            "computer science",
            "data science",
            "artificial intelligence",
            "statistics",
            "mathematics",
        ],
        "min_experience": 0,
    },

    "Machine Learning Engineer": {
        "skills": [
            "python",
            "machine learning",
            "scikit-learn",
            "tensorflow",
            "deep learning",
        ],
        "qualifications": [
            "computer science",
            "artificial intelligence",
            "machine learning",
            "aiml",
        ],
        "min_experience": 0,
    },

    "Data Analyst": {
        "skills": [
            "python",
            "sql",
            "excel",
            "power bi",
            "pandas",
        ],
        "qualifications": [
            "computer science",
            "data science",
            "information technology",
            "statistics",
            "mathematics",
        ],
        "min_experience": 0,
    },

    "Backend Developer": {
        "skills": [
            "python",
            "fastapi",
            "sql",
            "postgresql",
            "rest api",
        ],
        "qualifications": [
            "computer science",
            "information technology",
            "software engineering",
        ],
        "min_experience": 0,
    },

    "Frontend Developer": {
        "skills": [
            "html",
            "css",
            "javascript",
            "react",
            "tailwind css",
        ],
        "qualifications": [
            "computer science",
            "information technology",
            "software engineering",
        ],
        "min_experience": 0,
    },

    "Full Stack Developer": {
        "skills": [
            "javascript",
            "react",
            "python",
            "sql",
            "rest api",
        ],
        "qualifications": [
            "computer science",
            "information technology",
            "software engineering",
        ],
        "min_experience": 0,
    },
}


# =====================================================
# Normalize Skills
# =====================================================

def normalize_skills(
    skills: List[str]
) -> List[str]:

    return list({
        skill.strip().lower()
        for skill in skills
        if skill.strip()
    })


# =====================================================
# Experience Detection
# =====================================================

def has_experience(
    experience: Optional[str]
) -> bool:

    if not experience:
        return False

    value = experience.strip().lower()

    no_experience_values = {
        "",
        "none",
        "no",
        "no experience",
        "fresher",
        "0",
        "0 years",
        "0 year",
    }

    return value not in no_experience_values


# =====================================================
# Job Recommendations
# =====================================================

def generate_job_recommendations(
    resume_skills: List[str],
    degree: Optional[str] = None,
    branch: Optional[str] = None,
    experience: Optional[str] = None,
    city: Optional[str] = None,
    country: Optional[str] = None,
):

    resume_skills = normalize_skills(
        resume_skills
    )

    education_text = (
        f"{degree or ''} {branch or ''}"
    ).strip().lower()

    user_has_experience = has_experience(
        experience
    )

    location = ", ".join(
        value
        for value in [city, country]
        if value
    )

    recommendations = []

    # =================================================
    # Compare User Profile With Each Job
    # =================================================

    for job_title, job_data in JOB_ROLES.items():

        required_skills = normalize_skills(
            job_data["skills"]
        )

        # ---------------------------------------------
        # Skill Match
        # ---------------------------------------------

        matching_skills = [
            skill
            for skill in required_skills
            if skill in resume_skills
        ]

        missing_skills = [
            skill
            for skill in required_skills
            if skill not in resume_skills
        ]

        if required_skills:

            skill_score = (
                len(matching_skills)
                / len(required_skills)
            ) * 70

        else:
            skill_score = 0

        # ---------------------------------------------
        # Qualification Match
        # ---------------------------------------------

        qualification_match = False

        for qualification in job_data[
            "qualifications"
        ]:

            if qualification in education_text:
                qualification_match = True
                break

        qualification_score = (
            15 if qualification_match else 0
        )

        # ---------------------------------------------
        # Experience Match
        # ---------------------------------------------

        if job_data["min_experience"] == 0:

            experience_match = True

        else:

            experience_match = user_has_experience

        experience_score = (
            10 if experience_match else 0
        )

        # ---------------------------------------------
        # Location Availability
        # ---------------------------------------------

        location_match = bool(location)

        location_score = (
            5 if location_match else 0
        )

        # ---------------------------------------------
        # Final Match Score
        # ---------------------------------------------

        match_percentage = round(
            skill_score
            + qualification_score
            + experience_score
            + location_score
        )

        match_percentage = min(
            match_percentage,
            100
        )

        # Don't recommend completely unrelated jobs.

        if matching_skills:

            recommendations.append({

                "job_title": job_title,

                "match_percentage":
                    match_percentage,

                "matching_skills":
                    matching_skills,

                "missing_skills":
                    missing_skills,
            })

    # =================================================
    # Highest Matching Jobs First
    # =================================================

    recommendations.sort(
        key=lambda job: job[
            "match_percentage"
        ],
        reverse=True,
    )

    # =================================================
    # Top 5
    # =================================================

    recommendations = recommendations[:5]

    return {
        "total_recommendations":
            len(recommendations),

        "recommendations":
            recommendations,
    }