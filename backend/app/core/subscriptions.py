from __future__ import annotations

from typing import Any, Dict, List


SUBSCRIPTION_PLANS: List[Dict[str, Any]] = [
    {
        "id": "free",
        "title": "Free",
        "price": 0,
        "interval": "lifetime",
        "badge": None,
        "entitlement_name": "free",
        "benefits": [
            "Foundation and starter lesson access",
            "Basic progress tracking",
            "Daily challenge participation"
        ]
    },
    {
        "id": "no_ads_monthly",
        "title": "No Ads Monthly",
        "price": 2.99,
        "interval": "month",
        "badge": None,
        "entitlement_name": "no_ads",
        "benefits": [
            "No ads anywhere in the app",
            "Hearts and lessons stay as on the free plan"
        ]
    },
    {
        "id": "no_ads_yearly",
        "title": "No Ads Yearly",
        "price": 19.99,
        "interval": "year",
        "badge": "44% off yearly",
        "entitlement_name": "no_ads",
        "benefits": [
            "Everything in monthly No Ads",
            "Better long-term value"
        ]
    },
    {
        "id": "premium_monthly",
        "title": "Premium Monthly",
        "price": 6.99,
        "interval": "month",
        "badge": None,
        "entitlement_name": "premium",
        "benefits": [
            "No ads and unlimited hearts",
            "All directories and branches",
            "Advanced lessons and mastery checkpoints",
            "Deeper review mode",
            "Premium quizzes and test-out support",
            "Server-backed entitlement state ready for RevenueCat sync"
        ]
    },
    {
        "id": "premium_yearly",
        "title": "Premium Yearly",
        "price": 49.99,
        "interval": "year",
        "badge": "40% off yearly",
        "entitlement_name": "premium",
        "benefits": [
            "Everything in monthly premium",
            "Better long-term value",
            "Priority-ready path for iOS and Android subscription sync"
        ]
    }
]


def premium_plan_ids() -> set[str]:
    return {plan["id"] for plan in SUBSCRIPTION_PLANS if plan["id"] != "free"}



# Store product ids (Google Play ids may carry a ":basePlanId" suffix) mapped to the plans above.
STORE_PRODUCT_PLANS: Dict[str, str] = {
    "membership_monthly": "premium_monthly",
    "membership_yearly": "premium_yearly",
    "no_ads_monthly": "no_ads_monthly",
    "no_ads_yearly": "no_ads_yearly",
}


def plan_for_store_product(product_id: str | None) -> str:
    base_id = (product_id or "").split(":", 1)[0]
    return STORE_PRODUCT_PLANS.get(base_id, "premium_monthly")


def entitlement_for_plan(plan_id: str | None) -> str:
    plan = next((item for item in SUBSCRIPTION_PLANS if item["id"] == plan_id), None)
    return plan["entitlement_name"] if plan else "premium"


def plan_grants_unlimited_hearts(plan_id: str | None) -> bool:
    # No Ads only takes the ads away; Premium (and any older plan id) also lifts the heart limit.
    return entitlement_for_plan(plan_id) == "premium"
