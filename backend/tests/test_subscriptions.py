from __future__ import annotations

import time

import pytest

from backend.app.core.config import settings

WEBHOOK = "/api/subscriptions/revenuecat/webhook"
SECRET = "Bearer test-webhook-secret"
DAY_MS = 24 * 60 * 60 * 1000


@pytest.fixture()
def webhook_secret(monkeypatch):
    monkeypatch.setattr(settings, "revenuecat_webhook_auth", SECRET)
    return SECRET


def me(client, headers):
    response = client.get("/api/profile/me", headers=headers)
    assert response.status_code == 200, response.text
    return response.json()["user"]


def send(client, user_id, event_type, *, product_id="membership_monthly", expires_in_ms=30 * DAY_MS, **extra):
    now_ms = int(time.time() * 1000)
    event = {
        "type": event_type,
        "app_user_id": str(user_id),
        "original_app_user_id": str(user_id),
        "product_id": product_id,
        "entitlement_ids": ["premium"],
        "purchased_at_ms": now_ms,
        "expiration_at_ms": now_ms + expires_in_ms,
        "store": "PLAY_STORE",
        "environment": "SANDBOX",
        **extra,
    }
    return client.post(WEBHOOK, json={"api_version": "1.0", "event": event}, headers={"Authorization": SECRET})


def test_webhook_rejects_missing_or_wrong_secret(client, webhook_secret):
    assert client.post(WEBHOOK, json={"event": {}}).status_code == 401
    assert client.post(WEBHOOK, json={"event": {}}, headers={"Authorization": "Bearer nope"}).status_code == 401


def test_webhook_is_off_until_a_secret_is_configured(client, monkeypatch):
    monkeypatch.setattr(settings, "revenuecat_webhook_auth", "")

    assert client.post(WEBHOOK, json={"event": {}}, headers={"Authorization": "anything"}).status_code == 503


def test_purchase_grants_premium_and_expiration_removes_it(client, auth_headers, webhook_secret):
    user_id = me(client, auth_headers)["id"]

    bought = send(client, user_id, "INITIAL_PURCHASE", product_id="membership_yearly:yearly")
    assert bought.status_code == 200
    assert bought.json() == {"ok": True, "applied": True, "status": "active", "premium": True}
    user = me(client, auth_headers)
    assert user["activeSubscriptionId"] == "premium_yearly"
    assert user["hearts"]["unlimited"] is True

    expired = send(client, user_id, "EXPIRATION", product_id="membership_yearly:yearly", expires_in_ms=-DAY_MS)
    assert expired.json()["premium"] is False
    user = me(client, auth_headers)
    assert user["activeSubscriptionId"] is None
    assert user["hearts"]["unlimited"] is False


def test_no_ads_plan_takes_ads_away_but_keeps_the_heart_limit(client, auth_headers, webhook_secret):
    user_id = me(client, auth_headers)["id"]

    # RevenueCat lists every entitlement a product carries; the plan decides which one is recorded.
    bought = send(client, user_id, "INITIAL_PURCHASE", product_id="no_ads_monthly:monthly", entitlement_ids=["no_ads"])
    assert bought.json()["premium"] is True
    user = me(client, auth_headers)
    assert user["activeSubscriptionId"] == "no_ads_monthly"
    assert user["hearts"]["unlimited"] is False

    send(client, user_id, "PRODUCT_CHANGE", product_id="no_ads_monthly:monthly", new_product_id="membership_monthly:monthly", entitlement_ids=["no_ads", "premium"])
    user = me(client, auth_headers)
    assert user["activeSubscriptionId"] == "premium_monthly"
    assert user["hearts"]["unlimited"] is True


def test_plans_list_both_tiers(client):
    plans = {plan["id"]: plan for plan in client.get("/api/subscriptions/plans").json()}

    assert plans["no_ads_yearly"]["entitlementName"] == "no_ads"
    assert plans["premium_monthly"]["price"] == 6.99


def test_cancelled_plan_keeps_access_until_the_paid_period_ends(client, auth_headers, webhook_secret):
    user_id = me(client, auth_headers)["id"]
    send(client, user_id, "INITIAL_PURCHASE")

    cancelled = send(client, user_id, "CANCELLATION", expires_in_ms=5 * DAY_MS)

    assert cancelled.json() == {"ok": True, "applied": True, "status": "cancelled", "premium": True}
    assert me(client, auth_headers)["activeSubscriptionId"] == "premium_monthly"


def test_trial_is_recorded_as_trialing(client, auth_headers, webhook_secret):
    user_id = me(client, auth_headers)["id"]

    response = send(client, user_id, "INITIAL_PURCHASE", period_type="TRIAL", expires_in_ms=7 * DAY_MS)

    assert response.json()["status"] == "trialing"
    assert me(client, auth_headers)["activeSubscriptionId"] == "premium_monthly"


def test_consumables_and_unknown_buyers_are_acknowledged_without_changes(client, auth_headers, webhook_secret):
    user_id = me(client, auth_headers)["id"]

    gems = send(client, user_id, "NON_RENEWING_PURCHASE", product_id="gem_pack_medium")
    anonymous = send(client, "$RCAnonymousID:abc123", "INITIAL_PURCHASE")

    assert gems.json() == {"ok": True, "applied": False}
    assert anonymous.json() == {"ok": True, "applied": False}
    assert me(client, auth_headers)["activeSubscriptionId"] is None


def test_client_sync_is_blocked_in_production(client, auth_headers, monkeypatch):
    monkeypatch.setattr(settings, "environment", "production")

    response = client.post(
        "/api/subscriptions/sync",
        json={"provider": "app", "planType": "premium_monthly", "status": "active", "entitlementName": "premium"},
        headers=auth_headers,
    )

    assert response.status_code == 403
