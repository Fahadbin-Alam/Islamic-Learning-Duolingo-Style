from __future__ import annotations

from fastapi import APIRouter, Depends

from backend.app.api.deps import DbSession, current_user
from backend.app.models import EventLog, User
from backend.app.schemas import EventLogInput


router = APIRouter(tags=["analytics"])


@router.post("/analytics/events")
def track_event(payload: EventLogInput, db: DbSession, user: User = Depends(current_user)):
    db.add(EventLog(user_id=user.id, event_type=payload.event_type, payload_json=payload.payload_json))
    db.commit()
    return {"ok": True}
