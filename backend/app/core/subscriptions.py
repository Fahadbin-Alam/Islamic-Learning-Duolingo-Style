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
        "id": "premium_monthly",
        "title": "Premium Monthly",
        "price": 9.99,
        "interval": "month",
        "badge": None,
        "entitlement_name": "premium",
        "benefits": [
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
        "price": 95.90,
        "interval": "year",
        "badge": "20% off yearly",
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

