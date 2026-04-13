from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, Optional

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.core.security import hash_token
from backend.app.models import AuthSession, SubscriptionEntitlement, User


def normalize_email(email: str) -> str:
    return email.strip().lower()


def make_username(email: str) -> str:
    return normalize_email(email).split("@")[0] or "learner"


def initials(name: str) -> str:
    parts = [part[:1].upper() for part in name.strip().split()[:2] if part]
    return "".join(parts) or "SP"


def get_current_user_from_token(db: Session, authorization: Optional[str]) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    raw_token = authorization.removeprefix("Bearer ").strip()
    session_token = db.scalar(select(AuthSession).where(AuthSession.token_hash == hash_token(raw_token)))

    if not session_token or session_token.expires_at <= datetime.now(timezone.utc):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    user = db.get(User, session_token.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    return user


def get_active_entitlement(user: User) -> Optional[SubscriptionEntitlement]:
    now = datetime.now(timezone.utc)
    active = [
        entitlement
        for entitlement in user.entitlements
        if entitlement.status in {"active", "trialing"} and (entitlement.expires_at is None or entitlement.expires_at >= now)
    ]
    active.sort(key=lambda item: item.expires_at or now, reverse=True)
    return active[0] if active else None


def account_payload(user: User) -> Dict[str, Any]:
    return {
        "name": user.display_name,
        "email": user.email,
        "provider": user.auth_provider,
        "role": user.account_role,
        "createdAt": user.created_at,
        "reminderPreferences": user.reminder_preferences_json or {}
    }


def frontend_user_payload(user: User) -> Dict[str, Any]:
    entitlement = get_active_entitlement(user)
    last_refill = user.last_heart_refill_at or user.created_at
    return {
        "id": user.id,
        "username": user.username,
        "displayName": user.display_name,
        "avatarInitials": initials(user.display_name),
        "hasAccount": True,
        "accountRole": user.account_role,
        "accountProvider": user.auth_provider,
        "accountEmail": user.email,
        "accountCreatedAt": user.created_at.isoformat(),
        "lastLoginAt": user.last_login_at.isoformat() if user.last_login_at else None,
        "lastLearningAt": user.last_learning_at.isoformat() if user.last_learning_at else None,
        "reminderPreferences": user.reminder_preferences_json or {},
        "preferredLanguage": user.preferred_language,
        "foundationAssessmentSkipped": user.skipped_foundation,
        "soundEffectsEnabled": user.sound_enabled,
        "reducedSoundEffects": user.reduced_sound,
        "reviewHeartRestoreUsed": user.review_heart_restore_used,
        "learnerProfile": user.learner_profile_json or {},
        "streakDays": user.streak_days,
        "totalXp": user.total_xp,
        "dailyGoalXp": user.daily_goal_xp,
        "gems": user.gems,
        "hearts": {
            "current": user.hearts_current,
            "max": user.hearts_max,
            "unlimited": user.hearts_unlimited or bool(entitlement),
            "lastRefillDate": last_refill.date().isoformat() if last_refill else datetime.now(timezone.utc).date().isoformat(),
        },
        "completedLessonIds": user.completed_lesson_ids_json or [],
        "completedNodeIds": user.completed_node_ids_json or [],
        "claimedRewardIds": user.claimed_reward_ids_json or [],
        "activeSubscriptionId": entitlement.plan_type if entitlement else None,
    }


def apply_frontend_state(user: User, snapshot: Dict[str, Any], *, social_hub: Optional[Dict[str, Any]] = None) -> User:
    hearts = snapshot.get("hearts") or {}
    user.display_name = snapshot.get("displayName") or user.display_name
    user.username = snapshot.get("username") or user.username
    user.account_role = snapshot.get("accountRole") or user.account_role
    user.preferred_language = snapshot.get("preferredLanguage") or user.preferred_language
    user.sound_enabled = snapshot.get("soundEffectsEnabled", user.sound_enabled)
    user.reduced_sound = snapshot.get("reducedSoundEffects", user.reduced_sound)
    user.skipped_foundation = snapshot.get("foundationAssessmentSkipped", user.skipped_foundation)
    user.review_heart_restore_used = snapshot.get("reviewHeartRestoreUsed", user.review_heart_restore_used)
    user.streak_days = snapshot.get("streakDays", user.streak_days)
    user.total_xp = snapshot.get("totalXp", user.total_xp)
    user.daily_goal_xp = snapshot.get("dailyGoalXp", user.daily_goal_xp)
    user.gems = snapshot.get("gems", user.gems)
    user.hearts_current = hearts.get("current", user.hearts_current)
    user.hearts_max = hearts.get("max", user.hearts_max)
    user.hearts_unlimited = hearts.get("unlimited", user.hearts_unlimited)
    user.reminder_preferences_json = snapshot.get("reminderPreferences") or user.reminder_preferences_json or {}
    user.learner_profile_json = snapshot.get("learnerProfile") or user.learner_profile_json or {}
    user.completed_lesson_ids_json = snapshot.get("completedLessonIds") or user.completed_lesson_ids_json or []
    user.completed_node_ids_json = snapshot.get("completedNodeIds") or user.completed_node_ids_json or []
    user.claimed_reward_ids_json = snapshot.get("claimedRewardIds") or user.claimed_reward_ids_json or []
    if snapshot.get("lastLearningAt"):
        user.last_learning_at = datetime.fromisoformat(snapshot["lastLearningAt"].replace("Z", "+00:00"))
    if social_hub is not None:
        user.social_hub_json = social_hub
    return user
