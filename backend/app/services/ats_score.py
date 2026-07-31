import re


def calculate_ats_score(text: str):

    score = 0

    suggestions = []

    # Email
    if re.search(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text):
        score += 10
    else:
        suggestions.append("Add a professional email address.")

    # Phone
    if re.search(r"\d{10}", text):
        score += 10
    else:
        suggestions.append("Add a phone number.")

    # Education
    education_keywords = [
        "b.tech",
        "bachelor",
        "master",
        "m.tech",
        "degree",
        "college",
        "university",
    ]

    if any(word in text.lower() for word in education_keywords):
        score += 15
    else:
        suggestions.append("Add education details.")

    # Experience
    experience_keywords = [
        "experience",
        "internship",
        "worked",
        "developer",
        "engineer",
    ]

    if any(word in text.lower() for word in experience_keywords):
        score += 15
    else:
        suggestions.append("Add internship or work experience.")

    # Projects
    if "project" in text.lower():
        score += 15
    else:
        suggestions.append("Add projects.")

    # Skills
    skills = [
        "python",
        "java",
        "sql",
        "react",
        "fastapi",
        "tensorflow",
        "pytorch",
        "machine learning",
        "deep learning",
        "docker",
        "aws",
        "git",
    ]

    found = sum(skill in text.lower() for skill in skills)

    score += min(found * 3, 25)

    if found < 5:
        suggestions.append("Add more technical skills.")

    # Length
    words = len(text.split())

    if words >= 250:
        score += 10
    else:
        suggestions.append("Resume is too short.")

    return {
        "score": score,
        "suggestions": suggestions,
    }