from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import Friendship, User
from backend.app.service_layer import initials, normalize_email


router = APIRouter(tags=["friends"])


class AddFriendInput(BaseModel):
    email: str
    relation: Literal["friend", "parent"] = "friend"


def learner_today(today: Optional[str]) -> date:
    """The caller's local date; the server's UTC date if it is missing or malformed."""
    try:
        return date.fromisoformat(today) if today else datetime.now(timezone.utc).date()
    except ValueError:
        return datetime.now(timezone.utc).date()


def weekly_xp(user: User, today: date) -> int:
    first_day = (today - timedelta(days=6)).isoformat()
    last_day = today.isoformat()
    return sum(int(xp) for day, xp in (user.xp_history_json or {}).items() if first_day <= day <= last_day)


def live_streak(user: User, today: date) -> int:
    # Same rule as the app: a streak survives the day after a lesson was last finished. One extra day of
    # slack covers friends whose own date is ahead of the caller's.
    if not user.last_streak_date:
        return user.streak_days
    return user.streak_days if user.last_streak_date >= (today - timedelta(days=2)).isoformat() else 0


def member_payload(user: User, today: date, relation: str) -> Dict[str, Any]:
    return {
        "id": user.id,
        "name": user.display_name,
        "avatarInitials": initials(user.display_name),
        "relation": relation,
        "totalXp": user.total_xp,
        "weeklyXp": weekly_xp(user, today),
        "streakDays": live_streak(user, today),
        "lastLearningAt": user.last_learning_at.isoformat() if user.last_learning_at else None,
    }


@router.get("/friends")
def list_friends(db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    day = learner_today(today)
    friendships = db.scalars(select(Friendship).where(Friendship.user_id == user.id).order_by(Friendship.created_at)).all()
    return {
        "me": member_payload(user, day, "you"),
        "friends": [member_payload(friendship.friend, day, friendship.relation) for friendship in friendships],
    }


@router.post("/friends", status_code=status.HTTP_201_CREATED)
def add_friend(payload: AddFriendInput, db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    email = normalize_email(payload.email)
    friend = db.scalar(select(User).where(User.email == email))

    if not friend:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No Sira Path account uses that email yet. Ask them to sign up first.")
    if friend.id == user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That's your own account.")
    if db.scalar(select(Friendship).where(Friendship.user_id == user.id, Friendship.friend_id == friend.id)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="They are already in your crew.")

    db.add(Friendship(user_id=user.id, friend_id=friend.id, relation=payload.relation))
    db.commit()
    return member_payload(friend, learner_today(today), payload.relation)


@router.delete("/friends/{friend_id}")
def remove_friend(friend_id: int, db: DbSession, user: User = Depends(current_user)):
    friendship = db.scalar(select(Friendship).where(Friendship.user_id == user.id, Friendship.friend_id == friend_id))
    if not friendship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="They are not in your crew.")
    db.delete(friendship)
    db.commit()
    return {"ok": True}
