from typing import List, Optional


def generate_career_recommendation(
    matching_skills: List[str],
    missing_skills: List[str],
    degree: Optional[str] = None,
    branch: Optional[str] = None,
    experience: Optional[str] = None,
):

    # ==========================================
    # Normalize Data
    # ==========================================

    skills = [
        skill.strip().lower()
        for skill in matching_skills
        if skill.strip()
    ]

    degree_text = (degree or "").lower()
    branch_text = (branch or "").lower()
    experience_text = (experience or "").lower()

    education_text = f"{degree_text} {branch_text}"

    # ==========================================
    # Default Career
    # ==========================================

    best_career = "Software Engineer"

    alternative_careers = [
        "Software Developer",
        "Backend Developer",
    ]

    growth_outlook = "Good"

    career_score = 0

    # ==========================================
    # AI / ML Engineer
    # ==========================================

    ai_score = 0

    if "python" in skills:
        ai_score += 25

    if "machine learning" in skills:
        ai_score += 25

    if "deep learning" in skills:
        ai_score += 15

    if "tensorflow" in skills or "pytorch" in skills:
        ai_score += 15

    if (
        "artificial intelligence" in education_text
        or "ai" in branch_text
        or "machine learning" in education_text
        or "aiml" in education_text
    ):
        ai_score += 10

    if experience_text:
        ai_score += 10

    # ==========================================
    # Data Analyst
    # ==========================================

    data_score = 0

    if "sql" in skills:
        data_score += 25

    if "python" in skills:
        data_score += 15

    if "excel" in skills:
        data_score += 20

    if "power bi" in skills or "tableau" in skills:
        data_score += 20

    if (
        "data science" in education_text
        or "computer science" in education_text
        or "information technology" in education_text
    ):
        data_score += 10

    if experience_text:
        data_score += 10

    # ==========================================
    # Frontend Developer
    # ==========================================

    frontend_score = 0

    if "html" in skills:
        frontend_score += 15

    if "css" in skills:
        frontend_score += 15

    if "javascript" in skills:
        frontend_score += 25

    if "react" in skills:
        frontend_score += 30

    if experience_text:
        frontend_score += 15

    # ==========================================
    # Backend Developer
    # ==========================================

    backend_score = 0

    if "python" in skills:
        backend_score += 15

    if "java" in skills:
        backend_score += 20

    if "fastapi" in skills:
        backend_score += 25

    if "django" in skills:
        backend_score += 25

    if "spring boot" in skills:
        backend_score += 25

    if "sql" in skills:
        backend_score += 10

    if experience_text:
        backend_score += 10

    # ==========================================
    # Compare Career Scores
    # ==========================================

    career_scores = {
        "AI/ML Engineer": ai_score,
        "Data Analyst": data_score,
        "Frontend Developer": frontend_score,
        "Backend Developer": backend_score,
    }

    sorted_careers = sorted(
        career_scores.items(),
        key=lambda item: item[1],
        reverse=True
    )

    if sorted_careers and sorted_careers[0][1] > 0:

        best_career = sorted_careers[0][0]

        career_score = min(
            sorted_careers[0][1],
            100
        )

        alternative_careers = [
            career
            for career, score in sorted_careers[1:4]
            if score > 0
        ]

    # ==========================================
    # Growth Outlook
    # ==========================================

    if career_score >= 80:
        growth_outlook = "Excellent"

    elif career_score >= 60:
        growth_outlook = "Very Good"

    elif career_score >= 40:
        growth_outlook = "Good"

    else:
        growth_outlook = "Developing"

    # ==========================================
    # ATS Skill Match Percentage
    # ==========================================

    total_skills = (
        len(matching_skills)
        + len(missing_skills)
    )

    if total_skills == 0:
        skill_match_percentage = 0

    else:
        skill_match_percentage = round(
            (
                len(matching_skills)
                / total_skills
            ) * 100
        )

    # ==========================================
    # Reasons
    # ==========================================

    reasons = []

    if degree or branch:

        education = " ".join(
            value
            for value in [degree, branch]
            if value
        )

        reasons.append(
            f"Your education background in {education} "
            f"was considered for this recommendation."
        )

    if matching_skills:

        reasons.append(
            f"You already possess "
            f"{len(matching_skills)} relevant skills."
        )

    if experience:

        reasons.append(
            "Your experience was considered while "
            "evaluating suitable career roles."
        )

    if missing_skills:

        reasons.append(
            f"You can strengthen your profile by learning "
            f"{len(missing_skills)} additional skills."
        )

    reasons.append(
        f"Your overall profile aligns best with "
        f"the {best_career} career path."
    )

    # ==========================================
    # Final Result
    # ==========================================

    return {

        "best_career": best_career,

        "match_percentage": skill_match_percentage,

        "reasons": reasons,

        "alternative_careers": alternative_careers,

        "growth_outlook": growth_outlook,
    }