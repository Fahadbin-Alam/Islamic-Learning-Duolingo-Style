from __future__ import annotations

from typing import Annotated

from fastapi import Depends, Header
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.service_layer import get_current_user_from_token


DbSession = Annotated[Session, Depends(get_db)]


def current_user(db: DbSession, authorization: Annotated[str | None, Header()] = None):
    return get_current_user_from_token(db, authorization)
