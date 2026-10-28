from __future__ import annotations

from datetime import date, datetime, timezone
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


def as_utc(value: Optional[datetime]) -> Optional[datetime]:
    # SQLite drops tzinfo on read, so treat naive timestamps as the UTC values we stored.
    if value is None or value.tzinfo is not None:
        return value
    return value.replace(tzinfo=timezone.utc)


def get_current_user_from_token(db: Session, authorization: Optional[str]) -> User:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    raw_token = authorization.removeprefix("Bearer ").strip()
    session_token = db.scalar(select(AuthSession).where(AuthSession.token_hash == hash_token(raw_token)))

    if not session_token or as_utc(session_token.expires_at) <= datetime.now(timezone.utc):
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
        if entitlement_grants_access(entitlement.status, entitlement.expires_at, now)
    ]
    active.sort(key=lambda item: as_utc(item.expires_at) or now, reverse=True)
    return active[0] if active else None


def entitlement_grants_access(status: str, expires_at: Optional[datetime], now: datetime) -> bool:
    # A cancelled plan or one with a failed renewal keeps access until the period it was paid for ends.
    if status in {"active", "trialing"}:
        return expires_at is None or as_utc(expires_at) >= now
    if status in {"cancelled", "billing_issue"}:
        return expires_at is not None and as_utc(expires_at) >= now
    return False


def account_payload(user: User) -> Dict[str, Any]:
    return {
        "name": user.display_name,
        "email": user.email,
        "provider": user.auth_provider,
        "role": user.account_role,
        "createdAt": user.created_at,
        "reminderPreferences": user.reminder_preferences_json or {}
    }


XP_HISTORY_DAYS = 28


def parse_local_date(value: Any) -> Optional[datetime]:
    """Turn a device's YYYY-MM-DD into a timestamp that reads back as the same date."""
    if not isinstance(value, str):
        return None
    try:
        parsed = date.fromisoformat(value[:10])
    except ValueError:
        return None
    return datetime(parsed.year, parsed.month, parsed.day, tzinfo=timezone.utc)


def apply_daily_xp(user: User, daily_xp: Any) -> None:
    if not isinstance(daily_xp, dict) or not parse_local_date(daily_xp.get("date")):
        return
    day = str(daily_xp["date"])[:10]
    xp = max(0, int(daily_xp.get("xp") or 0))
    user.daily_xp_date = day
    user.daily_xp = xp
    history = dict(user.xp_history_json or {})
    history[day] = xp
    # Keep only recent days; ISO dates sort in calendar order.
    user.xp_history_json = {key: history[key] for key in sorted(history)[-XP_HISTORY_DAYS:]}


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
        "lastStreakDate": user.last_streak_date,
        "totalXp": user.total_xp,
        "dailyXp": {"date": user.daily_xp_date, "xp": user.daily_xp} if user.daily_xp_date else None,
        "dailyGoalXp": user.daily_goal_xp,
        "gems": user.gems,
        "hearts": {
            "current": user.hearts_current,
            "max": user.hearts_max,
            "unlimited": user.hearts_unlimited or bool(entitlement),
            "lastRefillDate": as_utc(last_refill).astimezone(timezone.utc).date().isoformat() if last_refill else datetime.now(timezone.utc).date().isoformat(),
        },
        "completedLessonIds": user.completed_lesson_ids_json or [],
        "completedNodeIds": user.completed_node_ids_json or [],
        "claimedRewardIds": user.claimed_reward_ids_json or [],
        "nodeStars": user.node_stars_json or {},
        "lastTopicId": user.last_topic_id,
        "pathFocusIds": user.path_focus_json or {},
        "league": user.league_json or None,
        "activeSubscriptionId": entitlement.plan_type if entitlement else None,
    }


def clean_node_stars(value: Any, fallback: Dict[str, int]) -> Dict[str, int]:
    """Stars per circle from the app: whole numbers from 1 to 3 under short node ids, anything else dropped."""
    if not isinstance(value, dict):
        return fallback
    return {
        str(node_id): stars
        for node_id, stars in value.items()
        if isinstance(node_id, str) and len(node_id) <= 200 and isinstance(stars, int) and not isinstance(stars, bool) and 1 <= stars <= 3
    }


def clean_path_focus(value: Any, fallback: Dict[str, str]) -> Dict[str, str]:
    """Where each topic's path carries on, from the app: short topic ids to short node ids, anything else dropped."""
    if not isinstance(value, dict):
        return fallback
    return {
        topic_id: node_id
        for topic_id, node_id in value.items()
        if isinstance(topic_id, str) and 0 < len(topic_id) <= 40 and isinstance(node_id, str) and 0 < len(node_id) <= 200
    }


LEAGUE_TOP_TIER = 6


def clean_tier(value: Any) -> Optional[int]:
    return value if isinstance(value, int) and not isinstance(value, bool) and 0 <= value <= LEAGUE_TOP_TIER else None


def clean_league(value: Any, fallback: Dict[str, Any]) -> Dict[str, Any]:
    """The app's weekly league: a tier from 0 to 6, a week start date, this week's XP and the last result."""
    if not isinstance(value, dict) or clean_tier(value.get("tier")) is None or not parse_local_date(value.get("weekStart")):
        return fallback
    xp = value.get("xp")
    league: Dict[str, Any] = {
        "tier": value["tier"],
        "weekStart": str(value["weekStart"])[:10],
        "xp": xp if isinstance(xp, int) and not isinstance(xp, bool) and xp >= 0 else 0,
    }
    last = value.get("last")
    if isinstance(last, dict) and clean_tier(last.get("from")) is not None and clean_tier(last.get("to")) is not None and parse_local_date(last.get("weekStart")):
        last_xp = last.get("xp")
        league["last"] = {
            "weekStart": str(last["weekStart"])[:10],
            "from": last["from"],
            "to": last["to"],
            "xp": last_xp if isinstance(last_xp, int) and not isinstance(last_xp, bool) and last_xp >= 0 else 0,
            "seen": last.get("seen") is True,
        }
    return league


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
    user.last_streak_date = snapshot.get("lastStreakDate", user.last_streak_date)
    user.total_xp = snapshot.get("totalXp", user.total_xp)
    apply_daily_xp(user, snapshot.get("dailyXp"))
    refill_date = parse_local_date(hearts.get("lastRefillDate"))
    if refill_date:
        user.last_heart_refill_at = refill_date
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
    user.node_stars_json = clean_node_stars(snapshot.get("nodeStars"), user.node_stars_json or {})
    user.path_focus_json = clean_path_focus(snapshot.get("pathFocusIds"), user.path_focus_json or {})
    user.league_json = clean_league(snapshot.get("league"), user.league_json or {})
    last_topic = snapshot.get("lastTopicId")
    if isinstance(last_topic, str) and 0 < len(last_topic) <= 40:
        user.last_topic_id = last_topic
    if snapshot.get("lastLearningAt"):
        user.last_learning_at = datetime.fromisoformat(snapshot["lastLearningAt"].replace("Z", "+00:00"))
    if social_hub is not None:
        user.social_hub_json = social_hub
    return user
