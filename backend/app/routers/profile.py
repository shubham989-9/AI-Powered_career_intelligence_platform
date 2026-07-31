from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.profile import Profile
from app.models.user import User
from app.schemas.profile import ProfileCreate
from app.utils.security import get_current_user

router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.post("/save")
def save_profile(
    data: ProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    if profile:

        profile.phone = data.phone
        profile.college = data.college
        profile.degree = data.degree
        profile.branch = data.branch
        profile.passing_year = data.passing_year
        profile.cgpa = data.cgpa
        profile.skills = data.skills
        profile.experience = data.experience
        profile.linkedin = data.linkedin
        profile.github = data.github
        profile.city = data.city
        profile.country = data.country
        profile.career_goal = data.career_goal
        profile.certifications = data.certifications
        profile.projects = data.projects
        profile.career_interests = data.career_interests

    else:

        profile = Profile(
            user_id=current_user.id,
            phone=data.phone,
            college=data.college,
            degree=data.degree,
            branch=data.branch,
            passing_year=data.passing_year,
            cgpa=data.cgpa,
            skills=data.skills,
            experience=data.experience,
            linkedin=data.linkedin,
            github=data.github,
            city=data.city,
            country=data.country,
            career_goal=data.career_goal,
            certifications=data.certifications,
            projects=data.projects,
            career_interests=data.career_interests
        )

        db.add(profile)

    db.commit()

    return {
        "message": "Profile Saved Successfully"
    }


@router.get("/")
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = (
        db.query(Profile)
        .filter(Profile.user_id == current_user.id)
        .first()
    )

    return {
        # =============================================
        # User Information
        # =============================================

        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role,

        # =============================================
        # Personal Information
        # =============================================

        "phone": profile.phone if profile else "",
        "city": profile.city if profile else "",
        "country": profile.country if profile else "",
        "linkedin": profile.linkedin if profile else "",
        "github": profile.github if profile else "",

        # =============================================
        # Education
        # =============================================

        "college": profile.college if profile else "",
        "degree": profile.degree if profile else "",
        "branch": profile.branch if profile else "",
        "passing_year": profile.passing_year if profile else "",
        "cgpa": profile.cgpa if profile else "",

        # =============================================
        # Professional Details
        # =============================================

        "skills": profile.skills if profile else "",
        "experience": profile.experience if profile else "",
        "certifications": profile.certifications if profile else "",
        "projects": profile.projects if profile else "",
        "career_interests": profile.career_interests if profile else "",
        "career_goal": profile.career_goal if profile else "",
    }