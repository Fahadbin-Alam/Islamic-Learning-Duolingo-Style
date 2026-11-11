from __future__ import annotations

import secrets
from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy import delete, func, or_, select

from backend.app.core.rate_limit import check_rate
from backend.app.api.deps import DbSession, current_user
from backend.app.api.routes.friends import learner_today, learning_now, live_streak
from backend.app.models import FamilyLink, FamilyLinkCode, User
from backend.app.service_layer import initials


router = APIRouter(tags=["family"])

# The code a child's phone shows so a parent can link: short enough to read out, no look-alike letters (0/O, 1/I/L).
CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"
CODE_LENGTH = 6
CODE_LIFETIME = timedelta(hours=24)
# Enough for a teacher's class. (Pasted codes, with no account, keep MAX_FAMILY_KIDS in src/services/familyCode.ts.)
MAX_KIDS = 40
MAX_PARENTS = 4
# Days of XP sent to a parent: enough for the week chart.
KID_XP_DAYS = 14
# The family challenge week: each day someone in the family learns lights one lantern, and the family lights them
# together from Monday to Sunday (the league's week, on the caller's clock). Nobody loses: an unfinished week ends.
LANTERNS_PER_PERSON = 3
# A grown-up following more learners than this is a teacher: a class is not one family, so their links don't join
# families together.
FAMILY_SIZE_LIMIT = 10
FAMILY_MAX_PEOPLE = 30


class LinkKidInput(BaseModel):
    code: str


def clean_code(code: str) -> str:
    return "".join(character for character in code.upper() if character.isalnum())


def as_aware(moment: datetime) -> datetime:
    # SQLite hands back naive datetimes; Postgres keeps the zone.
    return moment if moment.tzinfo else moment.replace(tzinfo=timezone.utc)


def kid_payload(child: User, day: date) -> Dict[str, Any]:
    """What a linked parent sees: the same numbers as the Family report, worked out in the parent's app."""
    first_day = (day - timedelta(days=KID_XP_DAYS - 1)).isoformat()
    history = {key: int(value) for key, value in (child.xp_history_json or {}).items() if first_day <= key <= day.isoformat()}
    return {
        "id": child.id,
        "name": child.display_name,
        "avatarInitials": initials(child.display_name),
        "streakDays": live_streak(child, day),
        "lastStreakDate": child.last_streak_date,
        "totalXp": child.total_xp,
        "xpByDay": history,
        "lessonsDone": len(child.completed_lesson_ids_json or []),
        "completedNodeIds": list(child.completed_node_ids_json or []),
        "nodeStars": dict(child.node_stars_json or {}),
        "lastLearningAt": child.last_learning_at.isoformat() if child.last_learning_at else None,
        "learningNow": learning_now(child),
    }


def person_payload(user: User) -> Dict[str, Any]:
    return {"id": user.id, "name": user.display_name, "avatarInitials": initials(user.display_name)}


def family_circle(db, user: User) -> List[User]:
    """Everyone joined to this account by family links (grown-ups, their learners, their learners' other grown-ups...),
    through grown-ups who follow at most FAMILY_SIZE_LIMIT learners, so every phone in one family counts the same
    people. Nearest first, this account first, at most FAMILY_MAX_PEOPLE."""
    people: Dict[int, User] = {user.id: user}
    frontier = {user.id}
    while frontier and len(people) < FAMILY_MAX_PEOPLE:
        links = db.scalars(
            select(FamilyLink)
            .where(or_(FamilyLink.parent_id.in_(frontier), FamilyLink.child_id.in_(frontier)))
            .order_by(FamilyLink.created_at, FamilyLink.id)
        ).all()
        grown_ups = {link.parent_id for link in links}
        sizes = dict(
            db.execute(select(FamilyLink.parent_id, func.count(FamilyLink.id)).where(FamilyLink.parent_id.in_(grown_ups)).group_by(FamilyLink.parent_id)).all()
        ) if grown_ups else {}
        frontier = set()
        for link in links:
            if sizes.get(link.parent_id, 0) > FAMILY_SIZE_LIMIT:
                continue
            for person in (link.parent, link.child):
                if person.id not in people and len(people) < FAMILY_MAX_PEOPLE:
                    people[person.id] = person
                    frontier.add(person.id)
    return list(people.values())


def xp_on(history: Dict[str, Any], day: str) -> int:
    try:
        return int(history.get(day) or 0)
    except (TypeError, ValueError):
        return 0


def family_week(db, user: User, day: date) -> Optional[Dict[str, Any]]:
    """The family's lanterns this week: one for each day each person learned, the goal, and whether the people this
    account already sees (itself, its learners, its grown-ups) learned today. Everyone else is only counted, so a
    child never learns another child's name from it. None when the account has no family."""
    circle = family_circle(db, user)
    if len(circle) < 2:
        return None
    first = day - timedelta(days=day.weekday())
    days = [(first + timedelta(days=offset)).isoformat() for offset in range(day.weekday() + 1)]
    learned = {person.id: [entry for entry in days if xp_on(person.xp_history_json or {}, entry) > 0] for person in circle}
    known = {user.id}
    known.update(db.scalars(select(FamilyLink.child_id).where(FamilyLink.parent_id == user.id)).all())
    known.update(db.scalars(select(FamilyLink.parent_id).where(FamilyLink.child_id == user.id)).all())
    today = day.isoformat()
    return {
        "weekStart": first.isoformat(),
        "members": len(circle),
        "goal": len(circle) * LANTERNS_PER_PERSON,
        "lit": sum(len(entry) for entry in learned.values()),
        # This account's own days, so its phone can add a lesson the server has not heard about yet.
        "selfDays": learned[user.id],
        "people": [{**person_payload(person), "today": today in learned[person.id]} for person in circle if person.id in known],
    }


@router.post("/family/code", status_code=status.HTTP_201_CREATED)
def make_link_code(db: DbSession, user: User = Depends(current_user)):
    """The child's phone asks for a code (behind the grown-up gate). A new code replaces the old one."""
    db.execute(delete(FamilyLinkCode).where(FamilyLinkCode.child_id == user.id))
    while True:
        code = "".join(secrets.choice(CODE_ALPHABET) for _ in range(CODE_LENGTH))
        if not db.get(FamilyLinkCode, code):
            break
    expires_at = datetime.now(timezone.utc) + CODE_LIFETIME
    db.add(FamilyLinkCode(code=code, child_id=user.id, expires_at=expires_at))
    db.commit()
    return {"code": code, "expiresAt": expires_at.isoformat()}


@router.get("/family")
def family(db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    """Kids this account follows (with their progress) and parents who follow this account (names only)."""
    day = learner_today(today)
    links = db.scalars(select(FamilyLink).where(or_(FamilyLink.parent_id == user.id, FamilyLink.child_id == user.id)).order_by(FamilyLink.created_at)).all()
    return {
        "kids": [kid_payload(link.child, day) for link in links if link.parent_id == user.id],
        "parents": [person_payload(link.parent) for link in links if link.child_id == user.id],
        "familyWeek": family_week(db, user, day),
    }


@router.post("/family/kids", status_code=status.HTTP_201_CREATED)
def link_kid(payload: LinkKidInput, db: DbSession, today: Optional[str] = Query(default=None), user: User = Depends(current_user)):
    # A code is 6 letters; this keeps anyone from trying codes until one belongs to a child.
    check_rate("family-code", str(user.id), 10, 15 * 60)
    entry = db.get(FamilyLinkCode, clean_code(payload.code))
    if not entry or as_aware(entry.expires_at) < datetime.now(timezone.utc):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That code didn't work. Ask for a new one.")
    child = entry.child
    if child.id == user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That code is from your own account.")
    if db.scalar(select(FamilyLink).where(FamilyLink.parent_id == user.id, FamilyLink.child_id == child.id)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You already follow this child.")
    if len(db.scalars(select(FamilyLink.id).where(FamilyLink.parent_id == user.id)).all()) >= MAX_KIDS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You can follow up to 40 learners.")
    if len(db.scalars(select(FamilyLink.id).where(FamilyLink.child_id == child.id)).all()) >= MAX_PARENTS:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This child already has 4 grown-ups linked.")
    # A code works once.
    db.delete(entry)
    db.add(FamilyLink(parent_id=user.id, child_id=child.id))
    db.commit()
    return kid_payload(child, learner_today(today))


@router.delete("/family/kids/{child_id}")
def unlink_kid(child_id: int, db: DbSession, user: User = Depends(current_user)):
    link = db.scalar(select(FamilyLink).where(FamilyLink.parent_id == user.id, FamilyLink.child_id == child_id))
    if not link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You don't follow that child.")
    db.delete(link)
    db.commit()
    return {"ok": True}


@router.delete("/family/parents/{parent_id}")
def unlink_parent(parent_id: int, db: DbSession, user: User = Depends(current_user)):
    """The child's side can stop a grown-up following them at any time."""
    link = db.scalar(select(FamilyLink).where(FamilyLink.parent_id == parent_id, FamilyLink.child_id == user.id))
    if not link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That grown-up isn't linked.")
    db.delete(link)
    db.commit()
    return {"ok": True}


def forget_family(db, user: User) -> None:
    """Called when an account is deleted, for databases that don't cascade (SQLite)."""
    db.execute(delete(FamilyLink).where(or_(FamilyLink.parent_id == user.id, FamilyLink.child_id == user.id)))
    db.execute(delete(FamilyLinkCode).where(FamilyLinkCode.child_id == user.id))
