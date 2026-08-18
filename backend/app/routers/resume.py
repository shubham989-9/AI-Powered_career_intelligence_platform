from pathlib import Path
import shutil
import os
import uuid
from typing import Optional

from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    HTTPException,
    Query,
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.resume import Resume
from app.models.user import User
from app.utils.security import get_current_user
from app.services.resume_parser import parse_resume
from app.services.ats_score import calculate_ats_score

router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


# Helper function to get user from Header OR Query Token
def get_user_from_header_or_token(
    token: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    if token:
        try:
            from app.utils.security import decode_token
            payload = decode_token(token)
            if payload and "sub" in payload:
                user = db.query(User).filter(User.email == payload["sub"]).first()
                if user:
                    return user
        except Exception:
            pass
    return None


# ==========================================================
# Upload Resume
# ==========================================================

@router.post("/upload")
def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ext = Path(file.filename).suffix.lower()

    if ext not in [".pdf", ".doc", ".docx"]:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOC and DOCX files are allowed."
        )

    filename = f"{current_user.id}_{uuid.uuid4()}{ext}"
    save_path = UPLOAD_DIR / filename

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Parse Resume
    parsed = parse_resume(str(save_path))

    # ATS Score
    ats = calculate_ats_score(parsed["raw_text"])

    # Create new resume record
    resume = Resume(
        user_id=current_user.id,
        file_name=filename,
        file_path=str(save_path),
        extracted_email=parsed["email"],
        extracted_phone=parsed["phone"],
        extracted_skills=", ".join(parsed["skills"]),
        raw_text=parsed["raw_text"],
    )

    db.add(resume)
    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume Uploaded Successfully",
        "id": resume.id,
        "file_name": resume.file_name,
        "email": resume.extracted_email,
        "phone": resume.extracted_phone,
        "skills": parsed["skills"],
        "ats_score": ats["score"],
        "suggestions": ats["suggestions"],
    }


# ==========================================================
# Get All User Resumes
# ==========================================================

@router.get("/")
def get_resumes(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resumes = (
        db.query(Resume)
        .filter(
            Resume.user_id == current_user.id
        )
        .order_by(Resume.id.desc())
        .all()
    )

    response = []

    for resume in resumes:
        ats = calculate_ats_score(
            resume.raw_text or ""
        )

        response.append({
            "id": resume.id,
            "file_name": resume.file_name,
            "email": resume.extracted_email,
            "phone": resume.extracted_phone,
            "skills": (
                resume.extracted_skills.split(", ")
                if resume.extracted_skills
                else []
            ),
            "ats_score": ats["score"],
            "suggestions": ats["suggestions"],
        })

    return response


# ==========================================================
# View Resume (Browser Preview)
# ==========================================================

@router.get("/view/{resume_id}")
def view_resume(
    resume_id: int,
    token: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    user = get_user_from_header_or_token(token, db)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Authentication required to view resume."
        )

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    if not os.path.exists(resume.file_path):
        raise HTTPException(
            status_code=404,
            detail="Resume file not found on server."
        )

    return FileResponse(
        path=resume.file_path,
        media_type="application/pdf",
        headers={"Content-Disposition": "inline"}
    )


# ==========================================================
# Download Resume
# ==========================================================

@router.get("/download/{resume_id}")
def download_resume(
    resume_id: int,
    token: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    user = get_user_from_header_or_token(token, db)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Authentication required to download resume."
        )

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    if not os.path.exists(resume.file_path):
        raise HTTPException(
            status_code=404,
            detail="Resume file not found on server."
        )

    return FileResponse(
        path=resume.file_path,
        filename=resume.file_name,
        media_type="application/pdf",
        headers={"Content-Disposition": f'attachment; filename="{resume.file_name}"'}
    )


# ==========================================================
# Delete Resume
# ==========================================================

@router.delete("/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    if os.path.exists(resume.file_path):
        try:
            os.remove(resume.file_path)
        except Exception:
            pass

    db.delete(resume)
    db.commit()

    return {
        "message": "Resume Deleted Successfully"
    }


# ==========================================================
# Replace Resume
# ==========================================================

@router.put("/replace/{resume_id}")
def replace_resume(
    resume_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == current_user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found."
        )

    ext = Path(file.filename).suffix.lower()

    if ext not in [".pdf", ".doc", ".docx"]:
        raise HTTPException(
            status_code=400,
            detail="Only PDF, DOC and DOCX files are allowed."
        )

    # Delete old file
    if os.path.exists(resume.file_path):
        try:
            os.remove(resume.file_path)
        except Exception:
            pass

    filename = f"{current_user.id}_{uuid.uuid4()}{ext}"
    save_path = UPLOAD_DIR / filename

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    parsed = parse_resume(str(save_path))
    ats = calculate_ats_score(parsed["raw_text"])

    resume.file_name = filename
    resume.file_path = str(save_path)
    resume.extracted_email = parsed["email"]
    resume.extracted_phone = parsed["phone"]
    resume.extracted_skills = ", ".join(parsed["skills"])
    resume.raw_text = parsed["raw_text"]

    db.commit()
    db.refresh(resume)

    return {
        "message": "Resume Replaced Successfully",
        "id": resume.id,
        "file_name": resume.file_name,
        "email": resume.extracted_email,
        "phone": resume.extracted_phone,
        "skills": parsed["skills"],
        "ats_score": ats["score"],
        "suggestions": ats["suggestions"],
    }