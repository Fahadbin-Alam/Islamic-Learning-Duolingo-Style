from __future__ import annotations

import secrets
from typing import Any, Dict, List

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, Field
from sqlalchemy import or_, select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import FriendBattle, Friendship, User
from backend.app.service_layer import initials


router = APIRouter(tags=["battles"])

# Same as BATTLE_QUESTIONS in src/services/ummah.ts.
BATTLE_QUESTIONS = 5
OPEN_STATUSES = ("pending", "accepted")
# Finished battles kept on the list, newest first.
DONE_SHOWN = 10
# Open battles one learner can have at once, so a tap-happy child can't flood a friend.
MAX_OPEN = 20


class StartBattleInput(BaseModel):
    friendId: int


class ScoreInput(BaseModel):
    correct: int = Field(ge=0, le=BATTLE_QUESTIONS)


def are_friends(db, user: User, other_id: int) -> bool:
    """Both added each other: the same rule that lets them see each other on the Friends page."""
    mine = db.scalar(select(Friendship).where(Friendship.user_id == user.id, Friendship.friend_id == other_id))
    theirs = db.scalar(select(Friendship).where(Friendship.user_id == other_id, Friendship.friend_id == user.id))
    return bool(mine and theirs)


def battle_payload(battle: FriendBattle, me: User) -> Dict[str, Any]:
    started = battle.challenger_id == me.id
    friend = battle.opponent if started else battle.challenger
    mine = battle.challenger_score if started else battle.opponent_score
    theirs = battle.opponent_score if started else battle.challenger_score
    payload: Dict[str, Any] = {
        "id": battle.id,
        "friend": {"id": friend.id, "name": friend.display_name, "avatarInitials": initials(friend.display_name)},
        "youStarted": started,
        "status": battle.status,
        "seed": battle.seed,
        "yourScore": mine,
        "theyPlayed": theirs is not None,
        "createdAt": battle.created_at.isoformat() if battle.created_at else None,
    }
    # Their score stays hidden until both have played, so nobody plays knowing the number to beat.
    if battle.status == "done":
        payload["theirScore"] = theirs
        payload["outcome"] = "win" if (mine or 0) > (theirs or 0) else "loss" if (mine or 0) < (theirs or 0) else "draw"
    return payload


def find_battle(db, user: User, battle_id: int) -> FriendBattle:
    battle = db.get(FriendBattle, battle_id)
    if not battle or user.id not in (battle.challenger_id, battle.opponent_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="That battle is gone.")
    return battle


def mine_query(user: User):
    return select(FriendBattle).where(or_(FriendBattle.challenger_id == user.id, FriendBattle.opponent_id == user.id))


@router.get("/battles")
def list_battles(db: DbSession, user: User = Depends(current_user)):
    battles = db.scalars(mine_query(user).order_by(FriendBattle.updated_at.desc(), FriendBattle.id.desc())).all()
    shown: List[FriendBattle] = []
    done = 0
    for battle in battles:
        # A battle with someone who is no longer a friend drops off, finished or not.
        other = battle.opponent_id if battle.challenger_id == user.id else battle.challenger_id
        if not are_friends(db, user, other):
            continue
        if battle.status in OPEN_STATUSES:
            shown.append(battle)
        elif battle.status == "done" and done < DONE_SHOWN:
            shown.append(battle)
            done += 1
    return {"battles": [battle_payload(battle, user) for battle in shown]}


@router.post("/battles", status_code=status.HTTP_201_CREATED)
def start_battle(body: StartBattleInput, db: DbSession, user: User = Depends(current_user)):
    if body.friendId == user.id or not are_friends(db, user, body.friendId):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You can only battle friends who added you back.")
    open_battles = db.scalars(mine_query(user).where(FriendBattle.status.in_(OPEN_STATUSES))).all()
    if any(body.friendId in (battle.challenger_id, battle.opponent_id) for battle in open_battles):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You already have a battle with them.")
    if len(open_battles) >= MAX_OPEN:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Finish a battle first.")
    battle = FriendBattle(challenger_id=user.id, opponent_id=body.friendId, status="pending", seed=secrets.randbelow(2**31 - 1) + 1)
    db.add(battle)
    db.commit()
    db.refresh(battle)
    return battle_payload(battle, user)


@router.post("/battles/{battle_id}/accept")
def accept_battle(battle_id: int, db: DbSession, user: User = Depends(current_user)):
    battle = find_battle(db, user, battle_id)
    if battle.opponent_id != user.id or battle.status != "pending":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="That battle can't be accepted.")
    battle.status = "accepted"
    db.commit()
    db.refresh(battle)
    return battle_payload(battle, user)


@router.post("/battles/{battle_id}/decline")
def decline_battle(battle_id: int, db: DbSession, user: User = Depends(current_user)):
    """The friend says no, or the one who asked takes it back before it starts."""
    battle = find_battle(db, user, battle_id)
    if battle.status != "pending":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="That battle already started.")
    battle.status = "declined"
    db.commit()
    return {"ok": True}


@router.post("/battles/{battle_id}/score")
def submit_score(battle_id: int, body: ScoreInput, db: DbSession, user: User = Depends(current_user)):
    battle = find_battle(db, user, battle_id)
    if battle.status != "accepted":
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="That battle isn't open.")
    if battle.challenger_id == user.id:
        if battle.challenger_score is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You already played this battle.")
        battle.challenger_score = body.correct
    else:
        if battle.opponent_score is not None:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="You already played this battle.")
        battle.opponent_score = body.correct
    if battle.challenger_score is not None and battle.opponent_score is not None:
        battle.status = "done"
    db.commit()
    db.refresh(battle)
    return battle_payload(battle, user)
