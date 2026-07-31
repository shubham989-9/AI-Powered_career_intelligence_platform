from typing import List


def generate_skill_gap(
    matching_skills: List[str],
    missing_skills: List[str],
):
    strengths = []
    improvements = []
    learning_path = []

    # =============================
    # Skill Match Percentage
    # =============================

    total_skills = len(matching_skills) + len(missing_skills)

    if total_skills == 0:
        skill_match_percentage = 0
    else:
        skill_match_percentage = round(
            (len(matching_skills) / total_skills) * 100
        )

    # =============================
    # Strengths
    # =============================

    if matching_skills:

        strengths.append(
            f"You already have {len(matching_skills)} required skills."
        )

        strengths.append(
            "Your resume matches important job requirements."
        )

    else:

        strengths.append(
            "No matching skills were found."
        )

    # =============================
    # Improvements
    # =============================

    if missing_skills:

        improvements.append(
            "Learn the missing technical skills."
        )

        improvements.append(
            "Update your resume after learning them."
        )

    else:

        improvements.append(
            "Excellent! No major skill gaps found."
        )

    # =============================
    # Learning Path
    # =============================

    for skill in missing_skills:

        learning_path.append(
            {
                "skill": skill,
                "priority": "High"
            }
        )

    return {

        "skill_match_percentage": skill_match_percentage,

        "matching_skills": matching_skills,

        "missing_skills": missing_skills,

        "strengths": strengths,

        "improvements": improvements,

        "learning_path": learning_path

    }