from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, Literal, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import Friendship, User
from backend.app.service_layer import LEAGUE_TOP_TIER, initials, normalize_email


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
    # The same week as the app's league: Monday to today, on the caller's clock.
    first_day = (today - timedelta(days=today.weekday())).isoformat()
    last_day = today.isoformat()
    return sum(int(xp) for day, xp in (user.xp_history_json or {}).items() if first_day <= day <= last_day)


def live_streak(user: User, today: date) -> int:
    # Same rule as the app: a streak survives the day after a lesson was last finished. One extra day of
    # slack covers friends whose own date is ahead of the caller's.
    if not user.last_streak_date:
        return user.streak_days
    return user.streak_days if user.last_streak_date >= (today - timedelta(days=2)).isoformat() else 0


def league_tier(user: User) -> int:
    tier = (user.league_json or {}).get("tier")
    return tier if isinstance(tier, int) and not isinstance(tier, bool) and 0 <= tier <= LEAGUE_TOP_TIER else 0


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
        "league": league_tier(user),
    }


def pending_payload(user: User, relation: str, name: str) -> Dict[str, Any]:
    """Someone who has not agreed yet: nothing about their learning is shown."""
    return {
        "id": user.id,
        "name": name,
        "avatarInitials": initials(name),
        "relation": relation,
        "totalXp": 0,
        "weeklyXp": 0,
        "streakDays": 0,
        "lastLearningAt": None,
        "pending": True,
    }


def follower_ids(db, user: User) -> set:
    return set(db.scalars(select(Friendship.user_id).where(Friendship.friend_id == user.id)).all())


# A crew is mutual: a learner's name, XP and streak are shown only to people they added back. Anyone could type
# an email, and the app is used by children (COPPA, Google Play Families), so one side alone never reveals anything.
@router.get("/friends")
def list_friends(db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    day = learner_today(today)
    friendships = db.scalars(select(Friendship).where(Friendship.user_id == user.id).order_by(Friendship.created_at)).all()
    followers = follower_ids(db, user)
    following = {friendship.friend_id for friendship in friendships}
    # People who added this learner and are waiting for an answer. Their own name is shown: they chose to ask.
    requests = db.scalars(select(Friendship).where(Friendship.friend_id == user.id).order_by(Friendship.created_at)).all()
    return {
        "me": member_payload(user, day, "you"),
        "friends": [member_payload(friendship.friend, day, friendship.relation) for friendship in friendships if friendship.friend_id in followers],
        "pending": [
            # The email the learner typed is all they get back until the other side agrees.
            pending_payload(friendship.friend, friendship.relation, friendship.friend.email)
            for friendship in friendships
            if friendship.friend_id not in followers
        ],
        "requests": [
            pending_payload(request.user, "friend", request.user.display_name)
            for request in requests
            if request.user_id not in following
        ],
    }


@router.post("/friends", status_code=status.HTTP_201_CREATED)
def add_friend(payload: AddFriendInput, db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    email = normalize_email(payload.email)
    friend = db.scalar(select(User).where(User.email == email))

    if not friend:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No Muslimo account uses that email yet. Ask them to sign up first.")
    if friend.id == user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That's your own account.")
    if db.scalar(select(Friendship).where(Friendship.user_id == user.id, Friendship.friend_id == friend.id)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="They are already in your crew.")

    db.add(Friendship(user_id=user.id, friend_id=friend.id, relation=payload.relation))
    db.commit()
    if friend.id in follower_ids(db, user):
        return member_payload(friend, learner_today(today), payload.relation)
    return pending_payload(friend, payload.relation, friend.email)


def find_request(db, user: User, requester_id: int) -> Friendship:
    request = db.scalar(select(Friendship).where(Friendship.user_id == requester_id, Friendship.friend_id == user.id))
    if not request:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That request is gone.")
    return request


@router.post("/friends/requests/{requester_id}/accept", status_code=status.HTTP_201_CREATED)
def accept_request(requester_id: int, db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    request = find_request(db, user, requester_id)
    if not db.scalar(select(Friendship).where(Friendship.user_id == user.id, Friendship.friend_id == requester_id)):
        db.add(Friendship(user_id=user.id, friend_id=requester_id, relation="friend"))
        db.commit()
    return member_payload(request.user, learner_today(today), "friend")


@router.delete("/friends/requests/{requester_id}")
def decline_request(requester_id: int, db: DbSession, user: User = Depends(current_user)):
    db.delete(find_request(db, user, requester_id))
    db.commit()
    return {"ok": True}


@router.delete("/friends/{friend_id}")
def remove_friend(friend_id: int, db: DbSession, user: User = Depends(current_user)):
    friendship = db.scalar(select(Friendship).where(Friendship.user_id == user.id, Friendship.friend_id == friend_id))
    if not friendship:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="They are not in your crew.")
    db.delete(friendship)
    db.commit()
    return {"ok": True}
