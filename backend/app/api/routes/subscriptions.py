from __future__ import annotations

import hmac
from datetime import datetime, timezone
from typing import Annotated, Any, Dict, Optional

from fastapi import APIRouter, Body, Depends, Header, HTTPException, status
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.core.config import settings
from backend.app.core.subscriptions import SUBSCRIPTION_PLANS, entitlement_for_plan, plan_for_store_product, plan_grants_unlimited_hearts, premium_plan_ids
from backend.app.models import EventLog, SubscriptionEntitlement, User
from backend.app.service_layer import entitlement_grants_access
from backend.app.schemas import EntitlementRead, SubscriptionPlanRead, SubscriptionSyncInput


router = APIRouter(tags=["subscriptions"])


@router.get("/subscriptions/plans", response_model=list[SubscriptionPlanRead])
def get_plans():
    return [SubscriptionPlanRead(**plan) for plan in SUBSCRIPTION_PLANS]


@router.get("/subscriptions/entitlements", response_model=list[EntitlementRead])
def get_entitlements(user: User = Depends(current_user)):
    return [
        EntitlementRead(
            id=item.id,
            provider=item.provider,
            providerCustomerId=item.provider_customer_id,
            planType=item.plan_type,
            status=item.status,
            startedAt=item.started_at,
            expiresAt=item.expires_at,
            entitlementName=item.entitlement_name,
        )
        for item in user.entitlements
    ]


@router.post("/subscriptions/sync", response_model=EntitlementRead)
def sync_entitlement(payload: SubscriptionSyncInput, db: DbSession, user: User = Depends(current_user)):
    # Clients could grant themselves premium through this route, so production only trusts the store webhook.
    if settings.environment == "production":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Subscriptions are synced by the store webhook")

    entitlement = db.scalar(
        select(SubscriptionEntitlement).where(
            SubscriptionEntitlement.user_id == user.id,
            SubscriptionEntitlement.provider == payload.provider,
            SubscriptionEntitlement.plan_type == payload.plan_type,
        )
    )
    if not entitlement:
        entitlement = SubscriptionEntitlement(user_id=user.id, provider=payload.provider, plan_type=payload.plan_type, entitlement_name=payload.entitlement_name, status=payload.status)
        db.add(entitlement)

    entitlement.provider_customer_id = payload.provider_customer_id
    entitlement.status = payload.status
    entitlement.started_at = payload.started_at or entitlement.started_at or datetime.now(timezone.utc)
    entitlement.expires_at = payload.expires_at
    entitlement.entitlement_name = payload.entitlement_name
    user.premium_status = payload.plan_type if payload.plan_type in premium_plan_ids() and payload.status in {"active", "trialing"} else "free"

    db.add(user)
    db.commit()
    db.refresh(entitlement)
    return EntitlementRead(
        id=entitlement.id,
        provider=entitlement.provider,
        providerCustomerId=entitlement.provider_customer_id,
        planType=entitlement.plan_type,
        status=entitlement.status,
        startedAt=entitlement.started_at,
        expiresAt=entitlement.expires_at,
        entitlementName=entitlement.entitlement_name,
    )


REVENUECAT_STATUS_BY_EVENT = {
    "INITIAL_PURCHASE": "active",
    "RENEWAL": "active",
    "UNCANCELLATION": "active",
    "PRODUCT_CHANGE": "active",
    "SUBSCRIPTION_EXTENDED": "active",
    "TEMPORARY_ENTITLEMENT_GRANT": "active",
    "CANCELLATION": "cancelled",
    "BILLING_ISSUE": "billing_issue",
    "EXPIRATION": "expired",
}


def _from_ms(value: Any) -> Optional[datetime]:
    if value in (None, ""):
        return None
    return datetime.fromtimestamp(int(value) / 1000, tz=timezone.utc)


def _find_user(db, event: Dict[str, Any]) -> Optional[User]:
    # The app logs signed-in learners into RevenueCat with their account id; anonymous buyers have no account here.
    candidates = [event.get("app_user_id"), event.get("original_app_user_id"), *(event.get("aliases") or [])]
    for candidate in candidates:
        if isinstance(candidate, str) and candidate.isdigit():
            user = db.get(User, int(candidate))
            if user:
                return user
    return None


@router.post("/subscriptions/revenuecat/webhook")
def revenuecat_webhook(
    db: DbSession,
    payload: Annotated[Dict[str, Any], Body()],
    authorization: Annotated[str | None, Header()] = None,
):
    expected = settings.revenuecat_webhook_auth
    if not expected:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="RevenueCat webhook is not configured")
    if not authorization or not hmac.compare_digest(authorization, expected):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized")

    event = payload.get("event") or {}
    event_type = event.get("type", "")
    next_status = REVENUECAT_STATUS_BY_EVENT.get(event_type)
    user = _find_user(db, event)

    # Consumables, test pings and events for anonymous buyers are acknowledged so RevenueCat stops retrying.
    if not next_status or not user:
        return {"ok": True, "applied": False}

    if event.get("period_type") == "TRIAL" and next_status == "active":
        next_status = "trialing"

    plan_type = plan_for_store_product(event.get("new_product_id") or event.get("product_id"))
    # Premium products also carry the no_ads entitlement, so the plan, not the event's first entitlement, decides.
    entitlement_name = entitlement_for_plan(plan_type)
    entitlement = db.scalar(
        select(SubscriptionEntitlement).where(
            SubscriptionEntitlement.user_id == user.id,
            SubscriptionEntitlement.provider == "revenuecat",
        )
    )
    if not entitlement:
        entitlement = SubscriptionEntitlement(user_id=user.id, provider="revenuecat", plan_type=plan_type, entitlement_name=entitlement_name, status=next_status)
        db.add(entitlement)

    entitlement.plan_type = plan_type
    entitlement.status = next_status
    entitlement.entitlement_name = entitlement_name
    entitlement.provider_customer_id = event.get("original_app_user_id") or event.get("app_user_id")
    entitlement.started_at = _from_ms(event.get("purchased_at_ms")) or entitlement.started_at
    entitlement.expires_at = _from_ms(event.get("expiration_at_ms"))

    has_access = entitlement_grants_access(next_status, entitlement.expires_at, datetime.now(timezone.utc))
    user.premium_status = plan_type if has_access else "free"
    if not has_access or not plan_grants_unlimited_hearts(plan_type):
        user.hearts_unlimited = False

    db.add(EventLog(user_id=user.id, event_type=f"revenuecat.{event_type.lower()}", payload_json={"productId": event.get("product_id"), "store": event.get("store"), "environment": event.get("environment")}))
    db.add(user)
    db.commit()
    return {"ok": True, "applied": True, "status": next_status, "premium": has_access}
