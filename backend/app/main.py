from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Models
from app.models.user import User
from app.models.profile import Profile
from app.models.resume import Resume
from app.models.job_description import JobDescription

# Routers
from app.routers.auth import router as auth_router
from app.routers.profile import router as profile_router
from app.routers.resume import router as resume_router
from app.routers.job_description import router as job_description_router
from app.routers.skill_gap import router as skill_gap_router
from app.routers.ats import router as ats_router
from app.routers import career_recommendation
from app.routers import job_recommendation
from app.routers import course_recommendation
from app.routers import resume_improvement
from app.routers import dashboard_analytics

app = FastAPI(
    title="CareerAI API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Register Routers
app.include_router(auth_router)
app.include_router(profile_router)
app.include_router(resume_router)
app.include_router(job_description_router)
app.include_router(skill_gap_router)
app.include_router(ats_router)
app.include_router(career_recommendation.router)
app.include_router(job_recommendation.router)
app.include_router(course_recommendation.router)
app.include_router(resume_improvement.router)
app.include_router(dashboard_analytics.router)

@app.get("/")
def home():
    return {
        "message": "CareerAI Backend Running Successfully 🚀"
    }