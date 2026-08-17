import secrets
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import func
from sqlalchemy.orm import Session
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from app.database import get_db
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    LoginRequest,
    GoogleLoginRequest,
)
from app.schemas.change_password import ChangePassword
from app.utils.security import (
    get_current_user,
    hash_password,
    verify_password,
    create_access_token,
    normalize_role,
)
from app.config import GOOGLE_CLIENT_ID
from app.services.platform_activity import log_activity

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================================================
# HELPER: GET USER PASSWORD
# =========================================================

def _get_user_password_hash(user: User) -> str:
    """Safely retrieves password hash across different schema attribute names."""
    return getattr(user, "password", None) or getattr(user, "hashed_password", None) or ""


# =========================================================
# NORMAL REGISTER
# =========================================================

@router.post("/register")
@router.post("/register/")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    cleaned_email = user.email.strip().lower()
    existing_user = (
        db.query(User)
        .filter(func.lower(User.email) == cleaned_email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    # Prepare model attributes dynamically based on table columns
    user_kwargs = {
        "email": cleaned_email,
        "role": "student"
    }

    if hasattr(User, "full_name"):
        user_kwargs["full_name"] = user.full_name
    elif hasattr(User, "name"):
        user_kwargs["name"] = user.full_name

    if hasattr(User, "password"):
        user_kwargs["password"] = hashed_password
    else:
        user_kwargs["hashed_password"] = hashed_password

    if hasattr(User, "is_active"):
        user_kwargs["is_active"] = True

    new_user = User(**user_kwargs)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }


# =========================================================
# LOGIN
# =========================================================

@router.post("/login")
@router.post("/login/")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):
    cleaned_email = data.email.strip().lower()
    user = (
        db.query(User)
        .filter(func.lower(User.email) == cleaned_email)
        .first()
    )

    # Check user existence
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Check account active status
    if hasattr(user, "is_active") and user.is_active is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been disabled. Please contact administrator."
        )

    # Verify password hash
    stored_hash = _get_user_password_hash(user)
    if not verify_password(data.password, stored_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    # Standardized Role Verification
    if data.role and user.role:
        req_role = (
            normalize_role(data.role)
            if callable(normalize_role)
            else str(data.role).strip().lower()
        )
        db_role = (
            normalize_role(user.role)
            if callable(normalize_role)
            else str(user.role).strip().lower()
        )

        if req_role != db_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"This account is registered as {user.role}. Please select the correct role."
            )

    # Generate JWT Token
    user_role_clean = str(user.role).lower()
    token = create_access_token(
        {
            "sub": user.email,
            "role": user_role_clean
        }
    )

    # Log Platform Activity safely
    try:
        log_activity(
            db=db,
            user_id=user.id,
            activity_type="Login",
            module="Authentication",
            description="User logged in successfully",
            endpoint="/auth/login"
        )
    except Exception:
        pass

    user_name = getattr(user, "full_name", None) or getattr(user, "name", "User")

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user_name,
            "email": user.email,
            "role": user_role_clean
        }
    }


# =========================================================
# GOOGLE LOGIN / REGISTER
# =========================================================

@router.post("/google")
@router.post("/google/")
def google_login(
    data: GoogleLoginRequest,
    db: Session = Depends(get_db)
):
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google Client ID is not configured"
        )

    try:
        idinfo = id_token.verify_oauth2_token(
            data.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Google token"
        )

    if not idinfo.get("email_verified"):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google email is not verified"
        )

    email = idinfo.get("email", "").strip().lower()
    full_name = idinfo.get("name") or "Google User"

    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Google account email not available"
        )

    user = db.query(User).filter(func.lower(User.email) == email).first()

    if not user:
        random_pwd = hash_password(secrets.token_urlsafe(32))
        create_kwargs = {
            "email": email,
            "role": "student"
        }
        if hasattr(User, "full_name"):
            create_kwargs["full_name"] = full_name
        elif hasattr(User, "name"):
            create_kwargs["name"] = full_name

        if hasattr(User, "password"):
            create_kwargs["password"] = random_pwd
        else:
            create_kwargs["hashed_password"] = random_pwd

        if hasattr(User, "is_active"):
            create_kwargs["is_active"] = True

        user = User(**create_kwargs)
        db.add(user)
        db.commit()
        db.refresh(user)

    if hasattr(user, "is_active") and user.is_active is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Your account has been disabled. Please contact administrator."
        )

    user_role_clean = str(user.role).lower()
    token = create_access_token(
        {
            "sub": user.email,
            "role": user_role_clean
        }
    )

    try:
        log_activity(
            db=db,
            user_id=user.id,
            activity_type="Google Login",
            module="Authentication",
            description="User logged in using Google",
            endpoint="/auth/google"
        )
    except Exception:
        pass

    user_name = getattr(user, "full_name", None) or getattr(user, "name", "User")

    return {
        "message": "Google Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user_name,
            "email": user.email,
            "role": user_role_clean
        }
    }


# =========================================================
# SWAGGER LOGIN
# =========================================================

@router.post("/token")
@router.post("/token/")
def swagger_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    cleaned_email = form_data.username.strip().lower()
    user = (
        db.query(User)
        .filter(func.lower(User.email) == cleaned_email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Email"
        )

    if hasattr(user, "is_active") and user.is_active is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled"
        )

    stored_hash = _get_user_password_hash(user)
    if not verify_password(form_data.password, stored_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Password"
        )

    user_role_clean = str(user.role).lower()
    token = create_access_token(
        {
            "sub": user.email,
            "role": user_role_clean
        }
    )

    try:
        log_activity(
            db=db,
            user_id=user.id,
            activity_type="Swagger Login",
            module="Authentication",
            description="User logged in using Swagger",
            endpoint="/auth/token"
        )
    except Exception:
        pass

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# =========================================================
# CHANGE PASSWORD
# =========================================================

@router.post("/change-password")
@router.post("/change-password/")
def change_password(
    data: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    stored_hash = _get_user_password_hash(current_user)
    if not verify_password(data.current_password, stored_hash):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )

    if data.current_password == data.new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be different"
        )

    new_hash = hash_password(data.new_password)
    if hasattr(current_user, "password"):
        current_user.password = new_hash
    else:
        current_user.hashed_password = new_hash

    db.commit()

    try:
        log_activity(
            db=db,
            user_id=current_user.id,
            activity_type="Password Changed",
            module="Authentication",
            description="User changed account password",
            endpoint="/auth/change-password"
        )
    except Exception:
        pass

    return {
        "message": "Password changed successfully"
    }