from __future__ import annotations

from datetime import datetime, timedelta, timezone

from backend.app.api.routes.invites import INVITE_REWARD_DATES, MAX_REWARDED_INVITES, invite_code, user_id_from_code
from backend.app.models import User
from backend.tests.test_friends_and_daily_progress import register


def test_codes_round_trip_and_catch_typos():
    for user_id in (1, 2, 30, 999, 123456, 98765432):
        code = invite_code(user_id)
        assert len(code) >= 6
        assert user_id_from_code(code) == user_id
        assert user_id_from_code(code.lower()) == user_id
        assert user_id_from_code(f"{code[:3]}-{code[3:]}") == user_id
    code = invite_code(42)
    # One changed letter is caught by the check letter.
    swapped = code[:2] + ("Z" if code[2] != "Z" else "Y") + code[3:]
    assert user_id_from_code(swapped) is None
    assert user_id_from_code("") is None
    assert user_id_from_code("hello!") is None


def test_a_new_learner_uses_a_friends_code_and_both_get_dates(client):
    _, aisha = register(client, "Aisha")
    _, omar = register(client, "Omar")
    mine = client.get("/api/invites", headers=aisha).json()
    assert mine["joined"] == 0 and mine["unclaimedDates"] == 0 and mine["rewardDates"] == INVITE_REWARD_DATES

    used = client.post("/api/invites/redeem", headers=omar, json={"code": mine["code"].lower()})
    assert used.status_code == 200, used.text
    assert used.json() == {"rewardDates": INVITE_REWARD_DATES}
    assert client.get("/api/invites", headers=omar).json()["usedCode"] is True

    after = client.get("/api/invites", headers=aisha).json()
    assert after["joined"] == 1 and after["unclaimedDates"] == INVITE_REWARD_DATES
    claimed = client.post("/api/invites/claim", headers=aisha).json()
    assert claimed == {"rewardDates": INVITE_REWARD_DATES, "friends": 1}
    # Paid once only.
    assert client.post("/api/invites/claim", headers=aisha).json()["rewardDates"] == 0


def test_codes_can_be_used_once_not_on_yourself_and_not_back(client):
    _, aisha = register(client, "Aisha")
    _, omar = register(client, "Omar")
    _, zaid = register(client, "Zaid")
    aisha_code = client.get("/api/invites", headers=aisha).json()["code"]
    omar_code = client.get("/api/invites", headers=omar).json()["code"]
    zaid_code = client.get("/api/invites", headers=zaid).json()["code"]

    assert client.post("/api/invites/redeem", headers=aisha, json={"code": aisha_code}).status_code == 400
    assert client.post("/api/invites/redeem", headers=omar, json={"code": aisha_code}).status_code == 200
    assert client.post("/api/invites/redeem", headers=omar, json={"code": zaid_code}).status_code == 409
    # Aisha brought Omar in, so she can't use his code.
    assert client.post("/api/invites/redeem", headers=aisha, json={"code": omar_code}).status_code == 400
    assert client.post("/api/invites/redeem", headers=zaid, json={"code": "XXXXXX"}).status_code == 404


def test_only_new_accounts_can_use_a_code(client):
    from backend.app.db.session import SessionLocal

    _, aisha = register(client, "Aisha")
    old_email, old = register(client, "Old")
    with SessionLocal() as db:
        learner = db.query(User).filter(User.email == old_email).one()
        learner.created_at = datetime.now(timezone.utc) - timedelta(days=30)
        db.commit()
    code = client.get("/api/invites", headers=aisha).json()["code"]
    assert client.get("/api/invites", headers=old).json()["canUseCode"] is False
    assert client.post("/api/invites/redeem", headers=old, json={"code": code}).status_code == 400


def test_rewards_stop_at_the_cap(client):
    _, aisha = register(client, "Aisha")
    code = client.get("/api/invites", headers=aisha).json()["code"]
    for index in range(MAX_REWARDED_INVITES + 2):
        _, friend = register(client, f"Friend{index}")
        assert client.post("/api/invites/redeem", headers=friend, json={"code": code}).status_code == 200
    claimed = client.post("/api/invites/claim", headers=aisha).json()
    assert claimed["friends"] == MAX_REWARDED_INVITES
    assert client.post("/api/invites/claim", headers=aisha).json()["rewardDates"] == 0
