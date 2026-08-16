from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

import secrets

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
)

from app.config import GOOGLE_CLIENT_ID

from app.services.platform_activity import log_activity


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================================================
# NORMAL REGISTER
# =========================================================

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(
        user.password
    )

    # IMPORTANT:
    # Every normal registration is always a Student.
    # Users cannot register as Admin.

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_password,
        role="Student",
        is_active=True
    )

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
def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    # -----------------------------------------------------
    # User does not exist
    # -----------------------------------------------------

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # -----------------------------------------------------
    # Account disabled
    # -----------------------------------------------------

    if not user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Your account has been disabled. Please contact administrator."
        )

    # -----------------------------------------------------
    # Password verification
    # -----------------------------------------------------

    if not verify_password(
        data.password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    # -----------------------------------------------------
    # ROLE VERIFICATION
    # -----------------------------------------------------

    if user.role != data.role:

        raise HTTPException(
            status_code=403,
            detail=(
                f"This account is registered as "
                f"{user.role}. Please select the correct role."
            )
        )

    # -----------------------------------------------------
    # Create JWT
    # -----------------------------------------------------

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role
        }
    )

    # -----------------------------------------------------
    # PLATFORM ACTIVITY
    # -----------------------------------------------------

    log_activity(
        db=db,
        user_id=user.id,
        activity_type="Login",
        module="Authentication",
        description="User logged in successfully",
        endpoint="/auth/login"
    )

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }


# =========================================================
# GOOGLE LOGIN / REGISTER
# =========================================================

@router.post("/google")
def google_login(
    data: GoogleLoginRequest,
    db: Session = Depends(get_db)
):

    if not GOOGLE_CLIENT_ID:

        raise HTTPException(
            status_code=500,
            detail="Google Client ID is not configured"
        )

    try:

        # -------------------------------------------------
        # Verify Google ID token
        # -------------------------------------------------

        idinfo = id_token.verify_oauth2_token(
            data.credential,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )

    except ValueError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Google token"
        )

    # -----------------------------------------------------
    # Verify Google email
    # -----------------------------------------------------

    if not idinfo.get("email_verified"):

        raise HTTPException(
            status_code=401,
            detail="Google email is not verified"
        )

    email = idinfo.get("email")

    full_name = (
        idinfo.get("name")
        or "Google User"
    )

    if not email:

        raise HTTPException(
            status_code=400,
            detail="Google account email not available"
        )

    # -----------------------------------------------------
    # Find existing user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    # -----------------------------------------------------
    # Create Google account
    # -----------------------------------------------------

    if not user:

        random_password = secrets.token_urlsafe(
            32
        )

        user = User(
            full_name=full_name,
            email=email,
            password=hash_password(
                random_password
            ),

            # Google users are ALWAYS students.
            role="Student",

            is_active=True
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    # -----------------------------------------------------
    # Check account status
    # -----------------------------------------------------

    if not user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Your account has been disabled. Please contact administrator."
        )

    # -----------------------------------------------------
    # Create HirePulse JWT
    # -----------------------------------------------------

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role
        }
    )

    # -----------------------------------------------------
    # PLATFORM ACTIVITY
    # -----------------------------------------------------

    log_activity(
        db=db,
        user_id=user.id,
        activity_type="Google Login",
        module="Authentication",
        description="User logged in using Google",
        endpoint="/auth/google"
    )

    # -----------------------------------------------------
    # RESPONSE
    # -----------------------------------------------------

    return {
        "message": "Google Login Successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.full_name,
            "email": user.email,
            "role": user.role
        }
    }


# =========================================================
# SWAGGER LOGIN
# =========================================================

@router.post("/token")
def swagger_login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not user.is_active:

        raise HTTPException(
            status_code=403,
            detail="Account is disabled"
        )

    if not verify_password(
        form_data.password,
        user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    token = create_access_token(
        {
            "sub": user.email,
            "role": user.role
        }
    )

    # -----------------------------------------------------
    # PLATFORM ACTIVITY
    # -----------------------------------------------------

    log_activity(
        db=db,
        user_id=user.id,
        activity_type="Swagger Login",
        module="Authentication",
        description="User logged in using Swagger",
        endpoint="/auth/token"
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# =========================================================
# CHANGE PASSWORD
# =========================================================

@router.post("/change-password")
def change_password(
    data: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if not verify_password(
        data.current_password,
        current_user.password
    ):

        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )

    if data.current_password == data.new_password:

        raise HTTPException(
            status_code=400,
            detail="New password must be different"
        )

    current_user.password = hash_password(
        data.new_password
    )

    db.commit()

    # -----------------------------------------------------
    # PLATFORM ACTIVITY
    # -----------------------------------------------------

    log_activity(
        db=db,
        user_id=current_user.id,
        activity_type="Password Changed",
        module="Authentication",
        description="User changed account password",
        endpoint="/auth/change-password"
    )

    return {
        "message": "Password changed successfully"
    }