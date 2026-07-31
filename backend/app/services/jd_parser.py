import re

COMMON_SKILLS = [
    "python",
    "java",
    "c",
    "c++",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "html",
    "css",
    "javascript",
    "react",
    "node",
    "express",
    "fastapi",
    "django",
    "flask",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
    "opencv",
    "numpy",
    "pandas",
    "scikit-learn",
    "git",
    "github",
    "docker",
    "aws",
    "azure",
    "gcp",
    "rest api",
    "linux",
    "kubernetes",
    "jira",
    "jenkins",
    "redis",
    "firebase",
]


def extract_required_skills(job_description: str):
    """
    Extract technical skills from Job Description.
    """

    text = job_description.lower()

    found_skills = []

    for skill in COMMON_SKILLS:
        pattern = r"\b" + re.escape(skill) + r"\b"

        if re.search(pattern, text):
            found_skills.append(skill)

    return sorted(list(set(found_skills)))