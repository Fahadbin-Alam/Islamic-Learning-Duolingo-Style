from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.core.config import settings
from backend.app.core.security import create_session_token, hash_password, hash_token, session_expiry, verify_password
from backend.app.models import AuthSession, User
from backend.app.schemas import AuthLoginInput, AuthRegisterInput, SessionPayload, SocialLoginInput
from backend.app.service_layer import account_payload, apply_frontend_state, frontend_user_payload, make_username, normalize_email


router = APIRouter(tags=["auth"])


def issue_session(db: DbSession, user: User) -> SessionPayload:
    raw_token = create_session_token()
    db.add(AuthSession(user_id=user.id, token_hash=hash_token(raw_token), expires_at=session_expiry()))
    db.commit()
    db.refresh(user)
    return SessionPayload(token=raw_token, account=account_payload(user), user=frontend_user_payload(user), socialHub=user.social_hub_json or {})


@router.post("/auth/register", response_model=SessionPayload, status_code=status.HTTP_201_CREATED)
def register(payload: AuthRegisterInput, db: DbSession):
    existing = db.scalar(select(User).where(User.email == normalize_email(payload.email)))
    if existing:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="An account with that email already exists.")

    user = User(
        email=normalize_email(payload.email),
        username=make_username(payload.email),
        display_name=payload.name.strip(),
        password_hash=hash_password(payload.password),
        auth_provider="password",
        account_role=payload.role,
        preferred_language=payload.user.get("preferredLanguage") or "en",
        sound_enabled=payload.user.get("soundEffectsEnabled", True),
        reduced_sound=payload.user.get("reducedSoundEffects", False),
        skipped_foundation=payload.user.get("foundationAssessmentSkipped", False),
        premium_status="free",
        review_heart_restore_used=payload.user.get("reviewHeartRestoreUsed", False),
        reminder_preferences_json=payload.reminder_preferences,
        social_hub_json=payload.social_hub,
        last_heart_refill_at=datetime.now(timezone.utc),
        last_login_at=datetime.now(timezone.utc),
        last_learning_at=datetime.now(timezone.utc),
    )
    apply_frontend_state(user, payload.user, social_hub=payload.social_hub)
    db.add(user)
    db.commit()
    db.refresh(user)
    return issue_session(db, user)


@router.post("/auth/login", response_model=SessionPayload)
def login(payload: AuthLoginInput, db: DbSession):
    user = db.scalar(select(User).where(User.email == normalize_email(payload.email)))
    if not user or not user.password_hash or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")

    user.last_login_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(user)
    return issue_session(db, user)


@router.post("/auth/social", response_model=SessionPayload)
def social_login(payload: SocialLoginInput, db: DbSession):
    if not settings.trusted_social_login:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail="Social login requires provider credentials and backend verification setup before it can be enabled safely."
        )

    raise HTTPException(status_code=status.HTTP_501_NOT_IMPLEMENTED, detail="Social login verification is not configured yet.")


@router.post("/auth/logout")
def logout(db: DbSession, authorization: str | None = Header(default=None)):
    if authorization and authorization.startswith("Bearer "):
        token_hash_value = hash_token(authorization.removeprefix("Bearer ").strip())
        session = db.scalar(select(AuthSession).where(AuthSession.token_hash == token_hash_value))
        if session:
            db.delete(session)
            db.commit()
    return {"ok": True}


@router.get("/session", response_model=SessionPayload)
def session(user: User = Depends(current_user)):
    return SessionPayload(account=account_payload(user), user=frontend_user_payload(user), socialHub=user.social_hub_json or {})
