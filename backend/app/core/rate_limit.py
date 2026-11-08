"""A small in-memory limit on how often something can be tried: a password for one email, or a code by one account.

Limits are counted per email or per account, not per internet address: behind Render's proxy many phones can share
one address, and a per-address limit would lock out real learners on a busy day.

The API runs as one process on Render, so counts kept in memory are enough. They reset when the server restarts,
which is fine: the limit only has to make guessing passwords or codes slow.
"""
from __future__ import annotations

import threading
import time
from collections import deque
from typing import Deque, Dict, Optional

from fastapi import HTTPException, status

from backend.app.core.config import settings


class RateLimiter:
    def __init__(self) -> None:
        self._hits: Dict[str, Deque[float]] = {}
        self._lock = threading.Lock()
        self._last_sweep = time.monotonic()

    def reset(self) -> None:
        with self._lock:
            self._hits.clear()

    def allow(self, key: str, limit: int, window_seconds: float) -> bool:
        now = time.monotonic()
        with self._lock:
            self._sweep(now)
            hits = self._hits.setdefault(key, deque())
            while hits and now - hits[0] > window_seconds:
                hits.popleft()
            if len(hits) >= limit:
                return False
            hits.append(now)
            return True

    def _sweep(self, now: float) -> None:
        # Forget keys nobody used for an hour, so memory stays small.
        if now - self._last_sweep < 600:
            return
        self._last_sweep = now
        for key in [key for key, hits in self._hits.items() if not hits or now - hits[-1] > 3600]:
            del self._hits[key]


limiter = RateLimiter()


def check_rate(action: str, key: Optional[str], limit: int, window_seconds: float) -> None:
    """Refuses with 429 once `key` tried `action` `limit` times within the window."""
    if not settings.rate_limit_enabled or not key:
        return
    if not limiter.allow(f"{action}:{key}", limit, window_seconds):
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail="Too many tries. Wait a few minutes and try again.")
