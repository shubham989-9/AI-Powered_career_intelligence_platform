import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request

from app.database import (
    Base,
    engine,
    SessionLocal
)

# =========================================================
# MODELS
# =========================================================

from app.models.user import User
from app.models.profile import Profile
from app.models.resume import Resume
from app.models.job_description import JobDescription
from app.models.ats_analysis import ATSAnalysis
from app.models.skill_gap_analysis import SkillGapAnalysis
from app.models.career_recommendation_analysis import CareerRecommendationAnalysis
from app.models.job_recommendation_analysis import JobRecommendationAnalysis
from app.models.course_recommendation_analysis import (
    CourseRecommendationAnalysis
)
from app.models.feedback import Feedback
from app.models.platform_activity import PlatformActivity
from app.models.api_monitoring import APIMonitoring

# =========================================================
# ROUTERS
# =========================================================

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
from app.routers import chat
from app.routers import feedback
from app.routers import admin_api_monitoring

# =========================================================
# ADMIN ROUTERS
# =========================================================

from app.routers import admin
from app.routers import admin_resume_parsing
from app.routers import admin_skill_gap
from app.routers import admin_career_recommendation
from app.routers import admin_job_recommendation
from app.routers import admin_course_recommendation
from app.routers import admin_feedback


# =========================================================
# APPLICATION
# =========================================================

app = FastAPI(
    title="AI-Powered Career Intelligence Platform",
    version="1.0.0"
)

# =========================================================
# CORS MIDDLEWARE (Single Unified Configuration)
# =========================================================

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "https://ai-powered-career-intelligence-plat-hazel.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# SYSTEM / API MONITORING MIDDLEWARE
# =========================================================

@app.middleware("http")
async def api_monitoring_middleware(
    request: Request,
    call_next
):
    start_time = time.perf_counter()
    response = None
    error_message = None

    try:
        response = await call_next(request)
    except Exception as exc:
        error_message = str(exc)
        raise
    finally:
        response_time = (time.perf_counter() - start_time) * 1000
        path = request.url.path

        ignored_paths = [
            "/docs",
            "/redoc",
            "/openapi.json",
            "/favicon.ico",
        ]

        if path not in ignored_paths and request.method != "OPTIONS":
            try:
                db = SessionLocal()
                status_code = response.status_code if response else 500
                status = "Success" if status_code < 400 else "Failed"

                monitoring = APIMonitoring(
                    method=request.method,
                    endpoint=path,
                    status_code=status_code,
                    response_time=round(response_time, 2),
                    status=status,
                    error_message=error_message
                )

                db.add(monitoring)
                db.commit()
                db.close()
            except Exception as monitoring_error:
                print("API monitoring error:", monitoring_error)

    return response


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# REGISTER EXISTING ROUTERS
# =========================================================

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
app.include_router(chat.router)
app.include_router(admin_api_monitoring.router)

# =========================================================
# REGISTER ADMIN ROUTERS
# =========================================================

app.include_router(admin.router)
app.include_router(admin_resume_parsing.router)
app.include_router(admin_skill_gap.router)
app.include_router(admin_career_recommendation.router)
app.include_router(admin_job_recommendation.router)
app.include_router(admin_course_recommendation.router)
app.include_router(feedback.router)
app.include_router(admin_feedback.router)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "CareerAI Backend Running Successfully 🚀"
    }