"""Owner-only numbers for the stats page (site/stats.html): how many people use Muslimo and what it earns.

Locked by one secret, SIRA_ADMIN_KEY, sent in the X-Admin-Key header. While that setting is empty the route
answers 404, so a server without it shows nothing. Only counts leave the server: no names, emails or ids.
"""
from __future__ import annotations

import hmac
from collections import Counter
from datetime import datetime, timedelta, timezone
from typing import Annotated, Any, Dict, Optional

from fastapi import APIRouter, Header, HTTPException
from sqlalchemy import select

from backend.app.api.deps import DbSession
from backend.app.core.config import settings
from backend.app.core.subscriptions import SUBSCRIPTION_PLANS
from backend.app.models import Invite, SubscriptionEntitlement, User
from backend.app.service_layer import entitlement_grants_access


router = APIRouter(tags=["admin"])

SERIES_DAYS = 28
# Rough ad money per daily learner per day, low and high (see the growth plan; South Asia sits near the low end).
AD_USD_PER_DAILY_USER = (0.01, 0.03)
# Apple and Google keep 15% from small developers.
STORE_CUT = 0.15


def require_admin(x_admin_key: Optional[str]) -> None:
    expected = settings.admin_key.strip()
    if not expected:
        raise HTTPException(status_code=404, detail="Not found")
    if not x_admin_key or not hmac.compare_digest(x_admin_key.strip().encode(), expected.encode()):
        raise HTTPException(status_code=401, detail="Wrong admin key")


def _aware(value: Optional[datetime]) -> Optional[datetime]:
    if value is None:
        return None
    return value if value.tzinfo else value.replace(tzinfo=timezone.utc)


def _monthly_price(plan_type: str) -> float:
    for plan in SUBSCRIPTION_PLANS:
        if plan["id"] == plan_type:
            price = float(plan.get("price") or 0)
            return price / 12 if plan.get("interval") == "year" else price
    return 0.0


@router.get("/admin/stats")
def admin_stats(db: DbSession, x_admin_key: Annotated[Optional[str], Header()] = None) -> Dict[str, Any]:
    require_admin(x_admin_key)
    now = datetime.now(timezone.utc)
    today = now.date()

    rows = db.execute(
        select(
            User.created_at,
            User.updated_at,
            User.last_login_at,
            User.last_learning_at,
            User.xp_history_json,
            User.auth_provider,
            User.preferred_language,
            User.streak_days,
            User.completed_lesson_ids_json,
        )
    ).all()

    days = [(today - timedelta(days=offset)).isoformat() for offset in range(SERIES_DAYS - 1, -1, -1)]
    signups = Counter()
    learners = Counter()
    active = {1: 0, 7: 0, 30: 0}
    new = {1: 0, 7: 0, 30: 0}
    providers = Counter()
    languages = Counter()
    lessons_done = 0
    streak_7_plus = 0

    for row in rows:
        created = _aware(row.created_at)
        if created:
            signups[created.date().isoformat()] += 1
            for window in new:
                if now - created <= timedelta(days=window):
                    new[window] += 1
        seen = max((stamp for stamp in map(_aware, (row.updated_at, row.last_login_at, row.last_learning_at)) if stamp), default=None)
        if seen:
            for window in active:
                if now - seen <= timedelta(days=window):
                    active[window] += 1
        for day, xp in (row.xp_history_json or {}).items():
            try:
                if int(xp or 0) > 0:
                    learners[str(day)[:10]] += 1
            except (TypeError, ValueError):
                continue
        providers[row.auth_provider or "password"] += 1
        languages[row.preferred_language or "en"] += 1
        lessons_done += len(row.completed_lesson_ids_json or [])
        if (row.streak_days or 0) >= 7:
            streak_7_plus += 1

    subs = db.execute(
        select(SubscriptionEntitlement.plan_type, SubscriptionEntitlement.status, SubscriptionEntitlement.expires_at)
        # Only store purchases (RevenueCat) are real money; test and preview grants are left out.
        .where(SubscriptionEntitlement.provider == "revenuecat")
    ).all()
    paying: Counter = Counter()
    trials = 0
    for plan_type, status, expires_at in subs:
        if plan_type == "free" or not entitlement_grants_access(status, expires_at, now):
            continue
        if status == "trialing":
            trials += 1
        else:
            paying[plan_type] += 1
    monthly_subs_usd = sum(_monthly_price(plan) * count for plan, count in paying.items())

    # Daily learners: yesterday is the last full day everywhere; today is still filling up.
    yesterday = (today - timedelta(days=1)).isoformat()
    week = [(today - timedelta(days=offset)).isoformat() for offset in range(1, 8)]
    avg_daily_learners = sum(learners[day] for day in week) / 7
    low, high = AD_USD_PER_DAILY_USER

    return {
        "generatedAt": now.isoformat(),
        "users": {
            "total": len(rows),
            "new": {"today": new[1], "last7": new[7], "last30": new[30]},
            "active": {"today": active[1], "last7": active[7], "last30": active[30]},
            "dailyLearnersYesterday": learners[yesterday],
            "avgDailyLearners7": round(avg_daily_learners, 1),
            "streak7Plus": streak_7_plus,
            "lessonsDone": lessons_done,
            "invitesUsed": db.query(Invite).count(),
            "signInBy": dict(providers.most_common()),
            "language": dict(languages.most_common()),
        },
        "series": {
            "days": days,
            "newAccounts": [signups[day] for day in days],
            "learners": [learners[day] for day in days],
        },
        "money": {
            "paidPlans": dict(paying),
            "freeTrials": trials,
            "subscriptionsMonthlyUsd": round(monthly_subs_usd * (1 - STORE_CUT), 2),
            "adsPerDayUsd": [round(avg_daily_learners * low, 2), round(avg_daily_learners * high, 2)],
            "adsPerMonthUsd": [round(avg_daily_learners * low * 30, 2), round(avg_daily_learners * high * 30, 2)],
            "adRatePerDailyUserUsd": [low, high],
            "storeCut": STORE_CUT,
        },
    }
