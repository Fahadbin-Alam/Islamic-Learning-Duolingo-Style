from __future__ import annotations

from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import User
from backend.app.service_layer import clean_ummah


router = APIRouter(tags=["ummah"])

RANKING_SIZE = 50


class RankingsInput(BaseModel):
    ummah: Optional[Dict[str, Any]] = None


def trophies_of(user: User) -> int:
    return int((user.ummah_json or {}).get("trophies") or 0)


def row(user: User, rank: int, me: User) -> Dict[str, Any]:
    """A ranking row: the nickname, the icon and trophies only. Never a name, email or photo."""
    ummah = user.ummah_json or {}
    payload: Dict[str, Any] = {"rank": rank, "nickname": ummah.get("nickname"), "trophies": trophies_of(user)}
    if ummah.get("icon"):
        payload["icon"] = ummah["icon"]
    if user.id == me.id:
        payload["you"] = True
    return payload


@router.post("/ummah/rankings")
def rankings(body: RankingsInput, db: DbSession, user: User = Depends(current_user)):
    """Saves the caller's Ummah state from the app, then ranks everyone who joined by trophies."""
    if body.ummah is not None:
        user.ummah_json = clean_ummah(body.ummah, user.ummah_json or {})
        db.add(user)
        db.commit()
        db.refresh(user)

    # JSON fields can't be filtered the same way on every database, so the joined learners are picked here.
    joined: List[User] = [member for member in db.scalars(select(User)).all() if (member.ummah_json or {}).get("joined") and (member.ummah_json or {}).get("nickname")]
    # Ties go to the one who got there first (the older account).
    joined.sort(key=lambda member: (-trophies_of(member), member.id))

    top = [row(member, index + 1, user) for index, member in enumerate(joined[:RANKING_SIZE])]
    my_index = next((index for index, member in enumerate(joined) if member.id == user.id), None)
    return {
        "top": top,
        "me": row(user, my_index + 1, user) if my_index is not None else None,
        "total": len(joined),
    }
