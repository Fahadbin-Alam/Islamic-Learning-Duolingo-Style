from __future__ import annotations

import re
import secrets
from datetime import date, datetime, timedelta, timezone
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy import delete, or_, select

from backend.app.core.rate_limit import check_rate
from backend.app.api.deps import DbSession, current_user
from backend.app.api.routes.friends import learner_today, live_streak
from backend.app.models import FamilyHomework, FamilyLink, FamilyLinkCode, User
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


# Open homework one grown-up can give one learner at a time.
MAX_HOMEWORK = 20
DATE_PATTERN = re.compile(r"^\d{4}-\d{2}-\d{2}$")


class LinkKidInput(BaseModel):
    code: str


class HomeworkInput(BaseModel):
    topicId: str = Field(min_length=1, max_length=40)
    unitId: str = Field(min_length=1, max_length=120)
    # The unit's circles, as the grown-up's app has them: the homework is done once the learner finishes them all.
    nodeIds: List[str] = Field(min_length=1, max_length=60)
    dueDate: Optional[str] = None


def clean_code(code: str) -> str:
    return "".join(character for character in code.upper() if character.isalnum())


def as_aware(moment: datetime) -> datetime:
    # SQLite hands back naive datetimes; Postgres keeps the zone.
    return moment if moment.tzinfo else moment.replace(tzinfo=timezone.utc)


def homework_payload(entry: FamilyHomework, learner: User) -> Dict[str, Any]:
    finished = set(learner.completed_node_ids_json or [])
    node_ids = list(entry.node_ids_json or [])
    done = sum(1 for node_id in node_ids if node_id in finished)
    return {
        "id": entry.id,
        "topicId": entry.topic_id,
        "unitId": entry.unit_id,
        "nodeIds": node_ids,
        "dueDate": entry.due_date,
        "doneCount": done,
        "total": len(node_ids),
        "done": bool(node_ids) and done >= len(node_ids),
        "setBy": person_payload(entry.setter),
        "createdAt": entry.created_at.isoformat() if entry.created_at else None,
    }


def homework_between(db, setter_id: int, learner_id: int) -> List[FamilyHomework]:
    return list(
        db.scalars(
            select(FamilyHomework)
            .where(FamilyHomework.setter_id == setter_id, FamilyHomework.learner_id == learner_id)
            .order_by(FamilyHomework.created_at, FamilyHomework.id)
        ).all()
    )


def kid_payload(child: User, day: date, homework: Optional[List[FamilyHomework]] = None) -> Dict[str, Any]:
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
        "homework": [homework_payload(entry, child) for entry in homework or []],
    }


def person_payload(user: User) -> Dict[str, Any]:
    return {"id": user.id, "name": user.display_name, "avatarInitials": initials(user.display_name)}


@router.post("/family/code", status_code=status.HTTP_201_CREATED)
def make_link_code(db: DbSession, user: User = Depends(current_user)):
    """The child's phone asks for a code (behind the grown-up gate). A new code replaces the old one."""
    db.execute(delete(FamilyLinkCode).where(FamilyLinkCode.child_id == user.id))
    db.execute(delete(FamilyHomework).where(or_(FamilyHomework.setter_id == user.id, FamilyHomework.learner_id == user.id)))
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
    """Learners this account follows (with their progress and the homework it gave them), grown-ups who follow
    this account (names only), and the homework those grown-ups gave this account."""
    day = learner_today(today)
    links = db.scalars(select(FamilyLink).where(or_(FamilyLink.parent_id == user.id, FamilyLink.child_id == user.id)).order_by(FamilyLink.created_at)).all()
    given = db.scalars(
        select(FamilyHomework).where(FamilyHomework.setter_id == user.id).order_by(FamilyHomework.created_at, FamilyHomework.id)
    ).all()
    received = db.scalars(
        select(FamilyHomework).where(FamilyHomework.learner_id == user.id).order_by(FamilyHomework.created_at, FamilyHomework.id)
    ).all()
    return {
        "kids": [
            kid_payload(link.child, day, [entry for entry in given if entry.learner_id == link.child_id])
            for link in links
            if link.parent_id == user.id
        ],
        "parents": [person_payload(link.parent) for link in links if link.child_id == user.id],
        "homework": [homework_payload(entry, user) for entry in received],
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
    return kid_payload(child, learner_today(today), [])


@router.delete("/family/kids/{child_id}")
def unlink_kid(child_id: int, db: DbSession, user: User = Depends(current_user)):
    link = db.scalar(select(FamilyLink).where(FamilyLink.parent_id == user.id, FamilyLink.child_id == child_id))
    if not link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You don't follow that child.")
    db.delete(link)
    db.execute(delete(FamilyHomework).where(FamilyHomework.setter_id == user.id, FamilyHomework.learner_id == child_id))
    db.commit()
    return {"ok": True}


@router.post("/family/kids/{child_id}/homework", status_code=status.HTTP_201_CREATED)
def give_homework(child_id: int, payload: HomeworkInput, db: DbSession, user: User = Depends(current_user)):
    """A linked grown-up asks a learner to finish one unit, maybe by a day. No free text, so nothing but lessons
    passes between accounts."""
    link = db.scalar(select(FamilyLink).where(FamilyLink.parent_id == user.id, FamilyLink.child_id == child_id))
    if not link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="You don't follow that learner.")
    if payload.dueDate is not None and not DATE_PATTERN.match(payload.dueDate):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That date didn't work.")
    node_ids = list(dict.fromkeys(node_id[:120] for node_id in payload.nodeIds if node_id))
    if not node_ids:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That unit has no lessons.")
    existing = homework_between(db, user.id, child_id)
    if any(entry.unit_id == payload.unitId for entry in existing):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="That unit is already their homework.")
    if len(existing) >= MAX_HOMEWORK:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Remove some homework first (20 at most).")
    entry = FamilyHomework(
        setter_id=user.id,
        learner_id=child_id,
        topic_id=payload.topicId,
        unit_id=payload.unitId,
        node_ids_json=node_ids,
        due_date=payload.dueDate,
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return homework_payload(entry, link.child)


@router.delete("/family/homework/{homework_id}")
def remove_homework(homework_id: int, db: DbSession, user: User = Depends(current_user)):
    """Only the grown-up who gave it takes homework back; a learner finishes it instead."""
    entry = db.get(FamilyHomework, homework_id)
    if not entry or entry.setter_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That homework is gone.")
    db.delete(entry)
    db.commit()
    return {"ok": True}


@router.delete("/family/parents/{parent_id}")
def unlink_parent(parent_id: int, db: DbSession, user: User = Depends(current_user)):
    """The child's side can stop a grown-up following them at any time; that grown-up's homework goes too."""
    link = db.scalar(select(FamilyLink).where(FamilyLink.parent_id == parent_id, FamilyLink.child_id == user.id))
    if not link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That grown-up isn't linked.")
    db.delete(link)
    db.execute(delete(FamilyHomework).where(FamilyHomework.setter_id == parent_id, FamilyHomework.learner_id == user.id))
    db.commit()
    return {"ok": True}


def forget_family(db, user: User) -> None:
    """Called when an account is deleted, for databases that don't cascade (SQLite)."""
    db.execute(delete(FamilyLink).where(or_(FamilyLink.parent_id == user.id, FamilyLink.child_id == user.id)))
    db.execute(delete(FamilyLinkCode).where(FamilyLinkCode.child_id == user.id))
    db.execute(delete(FamilyHomework).where(or_(FamilyHomework.setter_id == user.id, FamilyHomework.learner_id == user.id)))
