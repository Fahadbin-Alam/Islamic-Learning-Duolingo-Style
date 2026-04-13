from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends

from backend.app.api.deps import DbSession, current_user
from backend.app.models import User
from backend.app.schemas import ProfileUpdateInput, SessionPayload, SocialUpdateInput
from backend.app.service_layer import account_payload, apply_frontend_state, frontend_user_payload


router = APIRouter(tags=["profile"])


@router.get("/profile/me", response_model=SessionPayload)
def get_profile(user: User = Depends(current_user)):
    return SessionPayload(account=account_payload(user), user=frontend_user_payload(user), socialHub=user.social_hub_json or {})


@router.put("/profile/me", response_model=SessionPayload)
def update_profile(payload: ProfileUpdateInput, db: DbSession, user: User = Depends(current_user)):
    apply_frontend_state(user, payload.user)
    user.updated_at = datetime.now(timezone.utc)
    db.add(user)
    db.commit()
    db.refresh(user)
    return SessionPayload(account=account_payload(user), user=frontend_user_payload(user), socialHub=user.social_hub_json or {})


@router.put("/me/user", response_model=SessionPayload)
def update_profile_compat(payload: ProfileUpdateInput, db: DbSession, user: User = Depends(current_user)):
    return update_profile(payload, db, user)


@router.put("/me/social")
def update_social(payload: SocialUpdateInput, db: DbSession, user: User = Depends(current_user)):
    user.social_hub_json = payload.social_hub
    user.updated_at = datetime.now(timezone.utc)
    db.add(user)
    db.commit()
    return {"ok": True, "socialHub": user.social_hub_json}
