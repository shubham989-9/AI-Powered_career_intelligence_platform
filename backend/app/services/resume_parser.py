import fitz
import docx
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
]


def extract_text(file_path):

    if file_path.endswith(".pdf"):

        text = ""

        pdf = fitz.open(file_path)

        for page in pdf:
            text += page.get_text()

        pdf.close()

        return text

    elif file_path.endswith(".docx"):

        document = docx.Document(file_path)

        text = ""

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text

    return ""


def extract_email(text):

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text,
    )

    return match.group() if match else ""


def extract_phone(text):

    match = re.search(
        r"(\+91[- ]?)?[6-9]\d{9}",
        text,
    )

    return match.group() if match else ""


def extract_skills(text):

    text = text.lower()

    found = []

    for skill in COMMON_SKILLS:

        if skill in text:
            found.append(skill)

    return list(set(found))


def parse_resume(file_path):

    text = extract_text(file_path)

    return {

        "email": extract_email(text),

        "phone": extract_phone(text),

        "skills": extract_skills(text),

        "raw_text": text,

    }