from typing import List


def predict_salary(
    skills: List[str],
    raw_text: str = "",
):
    """
    Estimate salary based on skills extracted from the user's resume.

    This is a rule-based prediction layer for the first version.
    Later it can be replaced with a trained ML salary prediction model.
    """

    # ==========================================
    # Normalize Resume Data
    # ==========================================

    normalized_skills = {
        skill.strip().lower()
        for skill in skills
        if skill and skill.strip()
    }

    resume_text = (raw_text or "").lower()

    # ==========================================
    # Base Salary
    # ==========================================

    base_salary = 400000

    # ==========================================
    # High-Value Skills
    # ==========================================

    high_value_skills = {
        "machine learning": 90000,
        "deep learning": 100000,
        "tensorflow": 70000,
        "pytorch": 70000,
        "aws": 80000,
        "azure": 70000,
        "gcp": 70000,
        "docker": 60000,
        "fastapi": 50000,
        "django": 50000,
        "react": 45000,
        "python": 60000,
        "java": 55000,
        "sql": 40000,
        "pandas": 35000,
        "numpy": 35000,
        "scikit-learn": 60000,
    }

    skill_bonus = 0

    for skill in normalized_skills:

        if skill in high_value_skills:
            skill_bonus += high_value_skills[skill]

    # ==========================================
    # Number of Relevant Skills
    # ==========================================

    skill_count = len(normalized_skills)

    if skill_count >= 12:
        skill_bonus += 100000

    elif skill_count >= 8:
        skill_bonus += 70000

    elif skill_count >= 5:
        skill_bonus += 40000

    elif skill_count >= 3:
        skill_bonus += 20000

    # ==========================================
    # Career Domain Bonus
    # ==========================================

    ai_skills = {
        "machine learning",
        "deep learning",
        "tensorflow",
        "pytorch",
        "scikit-learn",
        "opencv",
    }

    cloud_skills = {
        "aws",
        "azure",
        "gcp",
        "docker",
    }

    software_skills = {
        "python",
        "java",
        "react",
        "fastapi",
        "django",
        "node",
    }

    ai_count = len(normalized_skills.intersection(ai_skills))
    cloud_count = len(normalized_skills.intersection(cloud_skills))
    software_count = len(normalized_skills.intersection(software_skills))

    if ai_count >= 3:
        skill_bonus += 100000

    elif ai_count >= 1:
        skill_bonus += 40000

    if cloud_count >= 2:
        skill_bonus += 80000

    if software_count >= 3:
        skill_bonus += 50000

    # ==========================================
    # Resume Quality Signal
    # ==========================================

    if len(resume_text) > 3000:
        skill_bonus += 30000

    elif len(resume_text) > 1500:
        skill_bonus += 15000

    # ==========================================
    # Final Estimated Salary
    # ==========================================

    estimated_min = base_salary + skill_bonus

    estimated_max = estimated_min + 250000

    # Keep prediction within a reasonable range
    estimated_min = min(estimated_min, 1500000)
    estimated_max = min(estimated_max, 2000000)

    # ==========================================
    # Market Position
    # ==========================================

    if estimated_min >= 1000000:
        market_position = "Excellent"

    elif estimated_min >= 750000:
        market_position = "Above Average"

    elif estimated_min >= 550000:
        market_position = "Good"

    else:
        market_position = "Developing"

    # ==========================================
    # Confidence
    # ==========================================

    confidence = 55

    if skill_count >= 5:
        confidence += 10

    if skill_count >= 8:
        confidence += 10

    if skill_count >= 12:
        confidence += 10

    if len(resume_text) > 1500:
        confidence += 5

    confidence = min(confidence, 90)

    # ==========================================
    # AI Insight
    # ==========================================

    if ai_count >= 2:

        insight = (
            "Your resume shows strong AI/ML skills with "
            "good potential for high-demand technical roles."
        )

    elif cloud_count >= 2:

        insight = (
            "Your cloud and technical skills can improve "
            "your opportunities in modern software roles."
        )

    elif software_count >= 2:

        insight = (
            "Your software development skills provide "
            "a solid foundation for technical roles."
        )

    else:

        insight = (
            "Developing more industry-relevant technical "
            "skills can improve your salary potential."
        )

    # ==========================================
    # Final Response
    # ==========================================

    return {
        "estimated_min": estimated_min,
        "estimated_max": estimated_max,
        "market_position": market_position,
        "confidence": confidence,
        "insight": insight,
    }