from __future__ import annotations

import json
import re
from datetime import date, datetime, timezone
from typing import Any, Dict, List, Optional

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend.app.core.security import hash_token
from backend.app.core.subscriptions import plan_grants_unlimited_hearts
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
    # Premium outranks No Ads when both are active, then the plan that lasts longest.
    active.sort(key=lambda item: (plan_grants_unlimited_hearts(item.plan_type), as_utc(item.expires_at) or now), reverse=True)
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


def merge_xp_by_day(user: User, xp_by_day: Any) -> None:
    """XP per local day from the app; a day another phone already sent more for keeps the bigger number."""
    if not isinstance(xp_by_day, dict):
        return
    history = dict(user.xp_history_json or {})
    for day, xp in xp_by_day.items():
        if isinstance(xp, int) and not isinstance(xp, bool) and xp >= 0 and parse_local_date(day):
            key = str(day)[:10]
            history[key] = max(xp, int(history.get(key) or 0))
    user.xp_history_json = {key: history[key] for key in sorted(history)[-XP_HISTORY_DAYS:]}


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
        # The rest of the profile first, so a column always wins over a stray copy of the same field.
        **(user.progress_extra_json or {}),
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
        "xpByDay": user.xp_history_json or {},
        "dailyGoalXp": user.daily_goal_xp,
        "gems": user.gems,
        "hearts": {
            "current": user.hearts_current,
            "max": user.hearts_max,
            "unlimited": user.hearts_unlimited or bool(entitlement and plan_grants_unlimited_hearts(entitlement.plan_type)),
            "lastRefillDate": as_utc(last_refill).astimezone(timezone.utc).date().isoformat() if last_refill else datetime.now(timezone.utc).date().isoformat(),
        },
        "completedLessonIds": user.completed_lesson_ids_json or [],
        "completedNodeIds": user.completed_node_ids_json or [],
        "claimedRewardIds": user.claimed_reward_ids_json or [],
        "nodeStars": user.node_stars_json or {},
        "lastTopicId": user.last_topic_id,
        "pathFocusIds": user.path_focus_json or {},
        "league": user.league_json or None,
        "ummah": user.ummah_json or None,
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


# Same lists as src/services/ummah.ts: a nickname is one word, one animal and a two-digit number, never typed,
# so no real name can reach the ranking.
NICKNAME_WORDS = ["Brave", "Kind", "Swift", "Bright", "Patient", "Honest", "Gentle", "Wise", "Calm", "Steady", "Happy", "Noble"]
NICKNAME_ANIMALS = ["Falcon", "Camel", "Gazelle", "Eagle", "Lion", "Horse", "Dove", "Owl", "Oryx", "Hoopoe", "Dolphin", "Panther"]
NICKNAME_PATTERN = re.compile(rf"^({'|'.join(NICKNAME_WORDS)}) ({'|'.join(NICKNAME_ANIMALS)}) [1-9][0-9]$")
PROFILE_ICONS = {"lantern", "palm", "moon", "star8", "dates", "sun", "water", "trophy", "crown"}
UMMAH_MAX_TROPHIES = 100000


def clean_count(value: Any, ceiling: int = UMMAH_MAX_TROPHIES) -> int:
    return min(value, ceiling) if isinstance(value, int) and not isinstance(value, bool) and value >= 0 else 0


def clean_ids(value: Any, allowed: Optional[set] = None) -> List[str]:
    if not isinstance(value, list):
        return []
    return [item for item in dict.fromkeys(value) if isinstance(item, str) and 0 < len(item) <= 60 and (allowed is None or item in allowed)][:50]


def is_valid_nickname(value: Any) -> bool:
    return isinstance(value, str) and bool(NICKNAME_PATTERN.match(value))


def clean_ummah(value: Any, fallback: Dict[str, Any]) -> Dict[str, Any]:
    """The app's Ummah state. A nickname outside the word lists is dropped, and without one the learner cannot join."""
    if not isinstance(value, dict):
        return fallback
    trophies = clean_count(value.get("trophies"))
    ummah: Dict[str, Any] = {
        "trophies": trophies,
        "best": max(trophies, clean_count(value.get("best"))),
        "battles": clean_count(value.get("battles"), 10_000_000),
        "wins": clean_count(value.get("wins"), 10_000_000),
        "icons": clean_ids(value.get("icons"), PROFILE_ICONS),
        "secrets": clean_ids(value.get("secrets")),
        "hints": clean_ids(value.get("hints")),
        "hadith": clean_ids(value.get("hadith")),
    }
    nickname = value.get("nickname")
    if is_valid_nickname(nickname):
        ummah["nickname"] = nickname
    ummah["joined"] = value.get("joined") is True and "nickname" in ummah
    icon = value.get("icon")
    if isinstance(icon, str) and icon in ummah["icons"]:
        ummah["icon"] = icon
    return ummah


# Profile fields kept in their own columns (or never taken from the app, like who the account belongs to). Anything
# else the app sends goes to progress_extra_json as it is, within these limits.
COLUMN_FIELDS = {
    "id", "username", "displayName", "avatarInitials", "hasAccount", "accountRole", "accountProvider", "accountEmail",
    "accountCreatedAt", "lastLoginAt", "lastLearningAt", "reminderPreferences", "preferredLanguage",
    "foundationAssessmentSkipped", "soundEffectsEnabled", "reducedSoundEffects", "reviewHeartRestoreUsed",
    "learnerProfile", "streakDays", "lastStreakDate", "totalXp", "dailyXp", "xpByDay", "dailyGoalXp", "gems", "hearts",
    "completedLessonIds", "completedNodeIds", "claimedRewardIds", "nodeStars", "lastTopicId", "pathFocusIds", "league",
    "ummah", "activeSubscriptionId",
}
EXTRA_STATE_MAX_KEYS = 40
EXTRA_STATE_MAX_BYTES = 256 * 1024
EXTRA_KEY_PATTERN = re.compile(r"^[A-Za-z][A-Za-z0-9_]{0,59}$")


def clean_extra_state(snapshot: Dict[str, Any], fallback: Dict[str, Any]) -> Dict[str, Any]:
    """The profile fields with no column. Too many keys or too big a save keeps the last good copy instead."""
    extra = {
        key: value
        for key, value in snapshot.items()
        if key not in COLUMN_FIELDS and isinstance(key, str) and EXTRA_KEY_PATTERN.match(key) and value is not None
    }
    if len(extra) > EXTRA_STATE_MAX_KEYS or len(json.dumps(extra, default=str)) > EXTRA_STATE_MAX_BYTES:
        return fallback
    merged = dict(extra)
    # Quiz scores from two phones: the better best, the most tries.
    merged_quizzes = merge_quiz_scores((fallback or {}).get("quizScores"), extra.get("quizScores"))
    if merged_quizzes is not None:
        merged["quizScores"] = merged_quizzes
    old_days, new_days = (fallback or {}).get("ramadanDays"), extra.get("ramadanDays")
    if isinstance(old_days, list) and isinstance(new_days, list):
        merged["ramadanDays"] = sorted({day for day in [*old_days, *new_days] if isinstance(day, str)})
    # A field this phone has not heard of (sent by a newer build on another phone) is kept.
    for key, value in (fallback or {}).items():
        merged.setdefault(key, value)
    return merged


def merge_quiz_scores(old: Any, new: Any) -> Optional[Dict[str, Any]]:
    if not isinstance(new, dict):
        return old if isinstance(old, dict) else None
    if not isinstance(old, dict):
        return new
    merged = dict(old)
    for quiz_id, score in new.items():
        before = old.get(quiz_id)
        if not isinstance(score, dict) or not isinstance(before, dict):
            merged[quiz_id] = score
            continue
        combined = dict(score)
        for field in ("best", "taken"):
            values = [value for value in (before.get(field), score.get(field)) if isinstance(value, (int, float)) and not isinstance(value, bool)]
            if values:
                combined[field] = max(values)
        combined["perfectRewarded"] = bool(before.get("perfectRewarded") or score.get("perfectRewarded")) or None
        if combined["perfectRewarded"] is None:
            del combined["perfectRewarded"]
        merged[quiz_id] = combined
    return merged


def union_ids(server: Any, phone: Any) -> List[Any]:
    """Finished lessons from both copies: a phone that was offline never takes away what another phone finished."""
    return list(dict.fromkeys([*(server or []), *(phone if isinstance(phone, list) else [])]))


def apply_frontend_state(user: User, snapshot: Dict[str, Any], *, social_hub: Optional[Dict[str, Any]] = None) -> User:
    """
    Saves the app's copy of the learner. Two phones (or one that was offline for a while) can send copies that are
    out of step, so progress that only grows is merged instead of overwritten: finished lessons and rewards are
    joined, stars and total XP keep the higher number, and an older streak or league week never replaces a newer one.
    Spendable things (gems, hearts) and settings take the latest copy.
    """
    hearts = snapshot.get("hearts") or {}
    user.display_name = snapshot.get("displayName") or user.display_name
    user.username = snapshot.get("username") or user.username
    user.account_role = snapshot.get("accountRole") or user.account_role
    user.preferred_language = snapshot.get("preferredLanguage") or user.preferred_language
    user.sound_enabled = snapshot.get("soundEffectsEnabled", user.sound_enabled)
    user.reduced_sound = snapshot.get("reducedSoundEffects", user.reduced_sound)
    user.skipped_foundation = snapshot.get("foundationAssessmentSkipped", user.skipped_foundation)
    user.review_heart_restore_used = snapshot.get("reviewHeartRestoreUsed", user.review_heart_restore_used)
    phone_streak_date = snapshot.get("lastStreakDate")
    server_streak_date = user.last_streak_date
    if not (isinstance(phone_streak_date, str) and isinstance(server_streak_date, str) and phone_streak_date[:10] < server_streak_date[:10]):
        user.streak_days = snapshot.get("streakDays", user.streak_days)
        user.last_streak_date = snapshot.get("lastStreakDate", user.last_streak_date)
    phone_total = snapshot.get("totalXp")
    if isinstance(phone_total, int) and not isinstance(phone_total, bool):
        user.total_xp = max(phone_total, user.total_xp or 0)
    merge_xp_by_day(user, snapshot.get("xpByDay"))
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
    user.completed_lesson_ids_json = union_ids(user.completed_lesson_ids_json, snapshot.get("completedLessonIds"))
    user.completed_node_ids_json = union_ids(user.completed_node_ids_json, snapshot.get("completedNodeIds"))
    user.claimed_reward_ids_json = union_ids(user.claimed_reward_ids_json, snapshot.get("claimedRewardIds"))
    server_stars = user.node_stars_json or {}
    phone_stars = clean_node_stars(snapshot.get("nodeStars"), {})
    user.node_stars_json = {**server_stars, **{node: max(stars, server_stars.get(node, 0)) for node, stars in phone_stars.items()}}
    user.path_focus_json = clean_path_focus(snapshot.get("pathFocusIds"), user.path_focus_json or {})
    user.league_json = merge_league(user.league_json or {}, clean_league(snapshot.get("league"), user.league_json or {}))
    server_best = clean_count((user.ummah_json or {}).get("best"))
    user.ummah_json = clean_ummah(snapshot.get("ummah"), user.ummah_json or {})
    if user.ummah_json:
        # The arenas reached stay unlocked even if an older phone sends a smaller best.
        user.ummah_json = {**user.ummah_json, "best": max(server_best, user.ummah_json.get("best", 0))}
    user.progress_extra_json = clean_extra_state(snapshot, user.progress_extra_json or {})
    last_topic = snapshot.get("lastTopicId")
    if isinstance(last_topic, str) and 0 < len(last_topic) <= 40:
        user.last_topic_id = last_topic
    if snapshot.get("lastLearningAt"):
        phone_learning_at = datetime.fromisoformat(snapshot["lastLearningAt"].replace("Z", "+00:00"))
        server_learning_at = as_utc(user.last_learning_at)
        if not server_learning_at or as_utc(phone_learning_at) >= server_learning_at:
            user.last_learning_at = phone_learning_at
    if social_hub is not None:
        user.social_hub_json = social_hub
    return user


def merge_league(server: Dict[str, Any], phone: Dict[str, Any]) -> Dict[str, Any]:
    """An older week from a phone that was offline keeps the server's week; the same week keeps the higher XP."""
    if not server or not phone or server is phone:
        return phone or server
    server_week, phone_week = str(server.get("weekStart") or ""), str(phone.get("weekStart") or "")
    if phone_week < server_week:
        return server
    if phone_week == server_week:
        return {**phone, "xp": max(int(phone.get("xp") or 0), int(server.get("xp") or 0))}
    return phone
