from __future__ import annotations

from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.core.subscriptions import SUBSCRIPTION_PLANS, premium_plan_ids
from backend.app.models import SubscriptionEntitlement, User
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
