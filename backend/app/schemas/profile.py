from pydantic import BaseModel


class ProfileCreate(BaseModel):
    phone: str | None = None
    college: str | None = None
    degree: str | None = None
    branch: str | None = None   
    passing_year: str | None = None
    cgpa: str | None = None

    skills: str | None = None
    experience: str | None = None

    linkedin: str | None = None
    github: str | None = None

    city: str | None = None
    country: str | None = None

    career_goal: str | None = None  

    certifications: str | None = None

    projects: str | None = None

    career_interests: str | None = None