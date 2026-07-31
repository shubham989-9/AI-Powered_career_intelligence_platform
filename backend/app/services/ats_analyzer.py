import re


def normalize(skills):
    return list(set([skill.strip().lower() for skill in skills if skill.strip()]))


def analyze_resume_against_jd(resume_text, resume_skills, jd_text, jd_skills):

    resume_skills = normalize(resume_skills)
    jd_skills = normalize(jd_skills)

    matching_skills = []

    missing_skills = []

    for skill in jd_skills:

        if skill in resume_skills:
            matching_skills.append(skill)
        else:
            missing_skills.append(skill)

    # ==========================
    # Match Percentage
    # ==========================

    if len(jd_skills) == 0:
        match_percentage = 0
    else:
        match_percentage = round(
            (len(matching_skills) / len(jd_skills)) * 100
        )

    # ==========================
    # Keyword Match
    # ==========================

    resume_words = set(
        re.findall(r"\b[a-zA-Z][a-zA-Z0-9+#.-]*\b", resume_text.lower())
    )

    jd_words = set(
        re.findall(r"\b[a-zA-Z][a-zA-Z0-9+#.-]*\b", jd_text.lower())
    )

    matching_keywords = sorted(list(resume_words & jd_words))

    missing_keywords = sorted(list(jd_words - resume_words))

    # ==========================
    # ATS Score
    # ==========================

    ats_score = min(
        100,
        int(match_percentage * 0.8 + 20)
    )

    # ==========================
    # Recommendations
    # ==========================

    recommendations = []

    if missing_skills:

        recommendations.append(
            "Add missing technical skills to your resume."
        )

    if ats_score < 80:

        recommendations.append(
            "Improve your resume according to the selected Job Description."
        )

    if len(matching_keywords) < 30:

        recommendations.append(
            "Increase relevant keywords to improve ATS compatibility."
        )

    return {

        "ats_score": ats_score,

        "match_percentage": match_percentage,

        "matching_skills": matching_skills,

        "missing_skills": missing_skills,

        "matching_keywords": matching_keywords,

        "missing_keywords": missing_keywords,

        "recommendations": recommendations,

    }