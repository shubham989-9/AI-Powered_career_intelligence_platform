from typing import List, Dict


# =====================================================
# Certification Mapping
# =====================================================

CERTIFICATION_MAP = {
    "python": "Python Institute - PCEP Certification",

    "machine learning": "AWS Certified Machine Learning Engineer",

    "deep learning": "DeepLearning.AI Deep Learning Specialization",

    "tensorflow": "TensorFlow Developer Certificate",

    "sql": "Oracle Database SQL Certified Associate",

    "aws": "AWS Certified Cloud Practitioner",

    "azure": "Microsoft Certified: Azure AI Fundamentals",

    "power bi": "Microsoft Certified: Power BI Data Analyst",

    "data science": "IBM Data Science Professional Certificate",

    "cybersecurity": "CompTIA Security+",

    "java": "Oracle Certified Professional Java Developer",

    "docker": "Docker Certified Associate",
}


# =====================================================
# Improve Resume Summary
# =====================================================

def improve_resume_summary(
    resume_skills: List[str],
    job_title: str,
    matching_skills: List[str],
) -> str:

    skills = matching_skills[:5]

    if not skills:
        skills = resume_skills[:5]

    skills_text = ", ".join(
        skill.title()
        for skill in skills
    )

    if not skills_text:
        skills_text = "relevant technical skills"

    return (
        f"Motivated professional targeting a {job_title} role "
        f"with hands-on knowledge of {skills_text}. "
        f"Focused on applying technical skills to solve real-world "
        f"problems, build reliable solutions, and continuously "
        f"improve professional expertise."
    )


# =====================================================
# Suggest Missing Keywords
# =====================================================

def suggest_missing_keywords(
    missing_skills: List[str],
) -> List[str]:

    return list(
        dict.fromkeys(
            skill.strip()
            for skill in missing_skills
            if skill.strip()
        )
    )


# =====================================================
# Improve Project Descriptions
# =====================================================

def improve_project_descriptions(
    resume_text: str,
    matching_skills: List[str],
) -> List[Dict]:

    improvements = []

    skills_text = ", ".join(
        skill.title()
        for skill in matching_skills[:4]
    )

    if not skills_text:
        skills_text = "relevant technologies"

    # Current resume parser does not store projects separately,
    # so provide actionable project-description templates.

    improvements.append({
        "original_text":
            "Basic project description",

        "improved_text":
            (
                f"Describe the project using action-oriented statements. "
                f"Explain the problem, your implementation, technologies "
                f"such as {skills_text}, and the measurable result."
            )
    })

    improvements.append({
        "original_text":
            "Developed a project",

        "improved_text":
            (
                f"Designed and developed a solution using {skills_text}. "
                f"Highlight your individual contribution, key features, "
                f"technical challenges solved, and project outcome."
            )
    })

    return improvements


# =====================================================
# Recommend Certifications
# =====================================================

def recommend_certifications(
    missing_skills: List[str],
) -> List[str]:

    certifications = []

    for skill in missing_skills:

        normalized_skill = skill.strip().lower()

        certification = CERTIFICATION_MAP.get(
            normalized_skill
        )

        if certification:
            certifications.append(certification)

    return list(dict.fromkeys(certifications))


# =====================================================
# Generate Complete Resume Improvements
# =====================================================

def generate_resume_improvements(
    resume_text: str,
    resume_skills: List[str],
    job_title: str,
    matching_skills: List[str],
    missing_skills: List[str],
):

    improved_summary = improve_resume_summary(
        resume_skills=resume_skills,
        job_title=job_title,
        matching_skills=matching_skills,
    )

    missing_keywords = suggest_missing_keywords(
        missing_skills
    )

    project_improvements = improve_project_descriptions(
        resume_text=resume_text,
        matching_skills=matching_skills,
    )

    recommended_certifications = recommend_certifications(
        missing_skills
    )

    return {
        "improved_summary": improved_summary,
        "missing_keywords": missing_keywords,
        "project_improvements": project_improvements,
        "recommended_certifications": recommended_certifications,
    }