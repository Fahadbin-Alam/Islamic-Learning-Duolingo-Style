from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import func, select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import Invite, User


router = APIRouter(tags=["invites"])

# Dates each side gets when a new learner types a friend's code. Same as INVITE_REWARD_DATES in src/services/invites.ts.
INVITE_REWARD_DATES = 50
# A learner is paid for this many friends at most, so made-up accounts can't farm dates forever.
MAX_REWARDED_INVITES = 20
# Only a new account can use a code: an old one was not brought in by the invite.
NEW_ACCOUNT_DAYS = 14

# Codes are the learner's id written with letters and digits that can't be mixed up (no 0/O, 1/I/L), plus one
# check letter so a typo almost never lands on someone else. They say nothing about who the learner is.
ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ"
BASE = len(ALPHABET)
# Added to every id so even the first learners get a 5-letter code (plus the check letter).
OFFSET = BASE**4


def _check_letter(body: str) -> str:
    total = sum((index + 1) * ALPHABET.index(char) for index, char in enumerate(body))
    return ALPHABET[(total * 7 + 3) % BASE]


def invite_code(user_id: int) -> str:
    value = user_id + OFFSET
    body = ""
    while value:
        value, digit = divmod(value, BASE)
        body = ALPHABET[digit] + body
    return body + _check_letter(body)


def user_id_from_code(code: str) -> Optional[int]:
    cleaned = "".join(char for char in code.upper() if not char.isspace() and char != "-")
    if len(cleaned) < 6 or len(cleaned) > 10 or any(char not in ALPHABET for char in cleaned):
        return None
    body, check = cleaned[:-1], cleaned[-1]
    if _check_letter(body) != check:
        return None
    value = 0
    for char in body:
        value = value * BASE + ALPHABET.index(char)
    user_id = value - OFFSET
    return user_id if user_id > 0 else None


class RedeemInput(BaseModel):
    code: str = Field(min_length=1, max_length=20)


def unpaid_rewards(db, user: User) -> int:
    paid = db.scalar(select(func.count()).select_from(Invite).where(Invite.inviter_id == user.id, Invite.inviter_rewarded.is_(True))) or 0
    unpaid = db.scalar(select(func.count()).select_from(Invite).where(Invite.inviter_id == user.id, Invite.inviter_rewarded.is_(False))) or 0
    return max(0, min(unpaid, MAX_REWARDED_INVITES - paid))


def as_utc(moment: datetime) -> datetime:
    return moment if moment.tzinfo else moment.replace(tzinfo=timezone.utc)


@router.get("/invites")
def my_invites(db: DbSession, user: User = Depends(current_user)):
    joined = db.scalar(select(func.count()).select_from(Invite).where(Invite.inviter_id == user.id)) or 0
    used = db.scalar(select(Invite).where(Invite.invitee_id == user.id))
    return {
        "code": invite_code(user.id),
        "joined": joined,
        "rewardDates": INVITE_REWARD_DATES,
        "unclaimedDates": unpaid_rewards(db, user) * INVITE_REWARD_DATES,
        "usedCode": used is not None,
        "canUseCode": used is None and as_utc(user.created_at) >= datetime.now(timezone.utc) - timedelta(days=NEW_ACCOUNT_DAYS),
    }


@router.post("/invites/redeem")
def redeem_code(payload: RedeemInput, db: DbSession, user: User = Depends(current_user)):
    inviter_id = user_id_from_code(payload.code)
    inviter = db.get(User, inviter_id) if inviter_id else None
    if not inviter:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That code doesn't work. Check it and try again.")
    if inviter.id == user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="That's your own code. Send it to a friend!")
    if db.scalar(select(Invite).where(Invite.invitee_id == user.id)):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You already used an invite code.")
    if as_utc(user.created_at) < datetime.now(timezone.utc) - timedelta(days=NEW_ACCOUNT_DAYS):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invite codes are for new accounts.")
    # Two learners can't each use the other's code: one of them was there first.
    if db.scalar(select(Invite).where(Invite.inviter_id == user.id, Invite.invitee_id == inviter.id)):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You invited them, so you can't use their code.")

    db.add(Invite(inviter_id=inviter.id, invitee_id=user.id))
    db.commit()
    return {"rewardDates": INVITE_REWARD_DATES}


@router.post("/invites/claim")
def claim_rewards(db: DbSession, user: User = Depends(current_user)):
    """The inviter's app collects dates for friends who joined since it last asked; each friend pays once."""
    count = unpaid_rewards(db, user)
    if count:
        unpaid = db.scalars(
            select(Invite).where(Invite.inviter_id == user.id, Invite.inviter_rewarded.is_(False)).order_by(Invite.id).limit(count)
        ).all()
        for invite in unpaid:
            invite.inviter_rewarded = True
        db.commit()
    return {"rewardDates": count * INVITE_REWARD_DATES, "friends": count}
