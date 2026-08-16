def generate_chat_response(message: str) -> str:

    message = message.lower().strip()

    # ==========================================
    # Greeting
    # ==========================================

    if any(word in message for word in [
        "hello",
        "hi",
        "hey",
        "hii"
    ]):
        return (
            "Hello! 👋 I'm HirePulse Assistant. "
            "I can help you with careers, resumes, skills, "
            "interviews and learning paths."
        )

    # ==========================================
    # Resume
    # ==========================================

    if "resume" in message or "cv" in message:

        return (
            "I can help you improve your resume. "
            "Focus on a clear summary, relevant technical skills, "
            "measurable project achievements and keywords related "
            "to the target job description."
        )

    # ==========================================
    # ATS
    # ==========================================

    if "ats" in message:

        return (
            "An ATS-friendly resume should use clear section headings, "
            "simple formatting and job-relevant keywords. "
            "Avoid unnecessary graphics, tables and complex layouts."
        )

    # ==========================================
    # Career
    # ==========================================

    if (
        "career" in message
        or "career path" in message
        or "which job" in message
        or "which role" in message
    ):

        return (
            "Choose a career based on your skills, education, interests "
            "and experience. For technical careers, common paths include "
            "AI/ML Engineer, Data Analyst, Backend Developer and "
            "Frontend Developer."
        )

    # ==========================================
    # AI / ML
    # ==========================================

    if (
        "ai" in message
        or "machine learning" in message
        or "ml" in message
    ):

        return (
            "For an AI/ML career, focus on Python, NumPy, Pandas, "
            "scikit-learn, machine learning fundamentals, deep learning "
            "and frameworks such as TensorFlow or PyTorch. "
            "Build practical projects to strengthen your profile."
        )

    # ==========================================
    # Python
    # ==========================================

    if "python" in message:

        return (
            "To improve your Python skills, practice data structures, "
            "functions, OOP, file handling and problem solving. "
            "Then apply Python to projects using libraries such as "
            "NumPy, Pandas and scikit-learn."
        )

    # ==========================================
    # Skills
    # ==========================================

    if (
        "skill" in message
        or "skills" in message
    ):

        return (
            "Start by identifying the skills required for your target "
            "role. Compare them with your current skills, then focus "
            "on the missing skills through projects and structured learning."
        )

    # ==========================================
    # Interview
    # ==========================================

    if (
        "interview" in message
        or "interview preparation" in message
    ):

        return (
            "For technical interviews, prepare DSA, core programming, "
            "OOP, DBMS, SQL and questions related to your projects. "
            "Also practice explaining your projects clearly."
        )

    # ==========================================
    # Job
    # ==========================================

    if (
        "job" in message
        or "job search" in message
        or "job recommendation" in message
    ):

        return (
            "For better job opportunities, keep your resume updated, "
            "build relevant projects, improve your technical skills "
            "and apply to roles matching your current skill set."
        )

    # ==========================================
    # Learning
    # ==========================================

    if (
        "learn" in message
        or "course" in message
        or "roadmap" in message
    ):

        return (
            "A good learning strategy is: learn the fundamentals, "
            "practice regularly, build projects and then work on "
            "real-world problems. Focus on one career path at a time."
        )

    # ==========================================
    # Salary
    # ==========================================

    if "salary" in message:

        return (
            "Salary depends on skills, experience, location, company "
            "and market demand. Strong technical skills, practical "
            "projects and relevant experience can improve your "
            "earning potential."
        )

    # ==========================================
    # Default Response
    # ==========================================

    return (
        "I'm currently a career-focused assistant. "
        "You can ask me about resumes, ATS, careers, AI/ML, "
        "skills, interviews, jobs, learning roadmaps or salary."
    )