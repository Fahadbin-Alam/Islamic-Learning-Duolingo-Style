from __future__ import annotations

from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, Literal, Optional, Tuple

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from backend.app.core.rate_limit import check_rate
from backend.app.api.deps import DbSession, current_user
from backend.app.models import FriendStreak, Friendship, User
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


def learning_now(user: User) -> Optional[Dict[str, Any]]:
    """What the learner has open: their last topic and the circle START sits on there (the app names them). Only
    sent to people they agreed to share with (friends who added each other back, linked grown-ups)."""
    topic_id = user.last_topic_id
    if not topic_id:
        return None
    node_id = (user.path_focus_json or {}).get(topic_id)
    return {"topicId": topic_id, "nodeId": node_id if isinstance(node_id, str) else None}


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
        "lessonsDone": len(user.completed_lesson_ids_json or []),
        "learningNow": learning_now(user),
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


def learned_days(user: User) -> set:
    return {day for day, xp in (user.xp_history_json or {}).items() if int(xp or 0) > 0}


def latest_shared_run(me: User, friend: User, since: str) -> Optional[Tuple[date, date]]:
    """First and last day of the newest run of days in a row on which both learned, from `since` on."""
    shared = sorted(day for day in learned_days(me) & learned_days(friend) if day >= since)
    if not shared:
        return None
    try:
        days = [date.fromisoformat(day) for day in shared]
    except ValueError:
        return None
    end = start = days[-1]
    for day in reversed(days[:-1]):
        if day != start - timedelta(days=1):
            break
        start = day
    return start, end


def friend_streak_payload(db, me: User, friend: User, today: date, since: date) -> Dict[str, Any]:
    """The pair's shared streak, on the caller's clock. It lives while the last day both learned is today or
    yesterday, like a learner's own streak. The saved row carries a run longer than the short XP history."""
    low, high = sorted((me.id, friend.id))
    row = db.scalar(select(FriendStreak).where(FriendStreak.user_low_id == low, FriendStreak.user_high_id == high))
    run = latest_shared_run(me, friend, since.isoformat())
    days = 0
    if run:
        start, end = run
        saved_end = None
        if row and row.last_day and row.days:
            try:
                saved_end = date.fromisoformat(row.last_day)
            except ValueError:
                saved_end = None
        if saved_end and start - timedelta(days=1) <= saved_end <= end:
            # The saved streak runs into this run (its start may have dropped out of the history).
            days = row.days + (end - saved_end).days
        else:
            days = (end - start).days + 1
        if not row:
            row = FriendStreak(user_low_id=low, user_high_id=high, days=0, best_days=0)
            db.add(row)
        if row.days != days or row.last_day != end.isoformat():
            row.days = days
            row.last_day = end.isoformat()
            row.best_days = max(row.best_days or 0, days)
        if end < today - timedelta(days=1):
            days = 0
    # A friend whose own date is already tomorrow counts as having learned "today" too.
    friend_today = any(day >= today.isoformat() for day in learned_days(friend))
    return {
        "days": days,
        "best": max(row.best_days if row else 0, days),
        "meToday": today.isoformat() in learned_days(me),
        "friendToday": friend_today,
    }


def friends_since(db, me: User, friend_id: int, mine: Friendship) -> date:
    """The day the two became friends: the later of the two adds, less a day because that stamp is the server's UTC
    date and the learners' own dates can be behind it. Days before that don't count."""
    theirs = db.scalar(select(Friendship).where(Friendship.user_id == friend_id, Friendship.friend_id == me.id))
    stamps = [stamp for stamp in (mine.created_at, theirs.created_at if theirs else None) if stamp]
    return max(stamps).date() - timedelta(days=1) if stamps else date.min


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
    payload = {
        "me": member_payload(user, day, "you"),
        "friends": [
            {
                **member_payload(friendship.friend, day, friendship.relation),
                "friendStreak": friend_streak_payload(db, user, friendship.friend, day, friends_since(db, user, friendship.friend_id, friendship)),
            }
            for friendship in friendships
            if friendship.friend_id in followers
        ],
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
    # Friend streaks saved above while they were worked out. If the friend's phone saved the same new pair a moment
    # earlier, theirs stands: both work it out the same way.
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
    return payload


@router.post("/friends", status_code=status.HTTP_201_CREATED)
def add_friend(payload: AddFriendInput, db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    # Stops one account from testing thousands of emails to see which ones use Muslimo.
    check_rate("add-friend", str(user.id), 30, 60 * 60)
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
