from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.user import User
from app.routers.auth import router as auth_router

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

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "CareerAI Backend Running Successfully 🚀"
    }