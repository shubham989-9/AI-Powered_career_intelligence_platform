from typing import List, Dict


# =====================================================
# Course Database
# =====================================================

COURSE_DATABASE = {
    "python": {
        "course_name": "Python for Everybody",
        "platform": "Coursera",
        "level": "Beginner",
        "course_url": "https://www.coursera.org/specializations/python",
    },

    "machine learning": {
        "course_name": "Machine Learning Specialization",
        "platform": "Coursera",
        "level": "Intermediate",
        "course_url": "https://www.coursera.org/specializations/machine-learning-introduction",
    },

    "deep learning": {
        "course_name": "Deep Learning Specialization",
        "platform": "Coursera",
        "level": "Intermediate",
        "course_url": "https://www.coursera.org/specializations/deep-learning",
    },

    "tensorflow": {
        "course_name": "TensorFlow Developer Professional Certificate",
        "platform": "Coursera",
        "level": "Intermediate",
        "course_url": "https://www.coursera.org/professional-certificates/tensorflow-in-practice",
    },

    "sql": {
        "course_name": "SQL for Data Science",
        "platform": "Coursera",
        "level": "Beginner",
        "course_url": "https://www.coursera.org/learn/sql-for-data-science",
    },

    "pytorch": {
        "course_name": "PyTorch for Deep Learning",
        "platform": "Udemy",
        "level": "Intermediate",
        "course_url": "https://www.udemy.com/",
    },

    "data science": {
        "course_name": "IBM Data Science Professional Certificate",
        "platform": "Coursera",
        "level": "Beginner",
        "course_url": "https://www.coursera.org/professional-certificates/ibm-data-science",
    },
}


# =====================================================
# Recommend Courses
# =====================================================

def recommend_courses(
    missing_skills: List[str]
) -> List[Dict]:

    recommendations = []

    for skill in missing_skills:

        normalized_skill = skill.strip().lower()

        course = COURSE_DATABASE.get(normalized_skill)

        if course:

            recommendations.append({
                "skill": normalized_skill,
                "course_name": course["course_name"],
                "platform": course["platform"],
                "level": course["level"],
                "course_url": course["course_url"],
            })

        else:

            # Fallback for skills not available
            # in our predefined course database.

            recommendations.append({
                "skill": normalized_skill,
                "course_name": f"Learn {skill.title()}",
                "platform": "Coursera",
                "level": "Beginner",
                "course_url": "https://www.coursera.org/search?query="
                              + normalized_skill.replace(" ", "%20"),
            })

    return recommendations


# =====================================================
# Generate Learning Path
# =====================================================

def generate_learning_path(
    missing_skills: List[str]
) -> List[Dict]:

    learning_path = []

    for index, skill in enumerate(
        missing_skills,
        start=1
    ):

        learning_path.append({
            "step": index,
            "skill": skill,
            "status": "Recommended",
        })

    return learning_path