"""Fixes from the 2026-11-07 code review: usernames, what the app may not set for itself, bad values, guess limits."""
from __future__ import annotations

import uuid

import pytest

from backend.app.core.config import settings
from backend.app.core.rate_limit import limiter
from backend.app.service_layer import DAILY_XP_CAP


USER = {"totalXp": 0, "streakDays": 0, "hearts": {"current": 5, "max": 5, "unlimited": False}}


def register(client, email, password="long-enough-1"):
    return client.post("/api/auth/register", json={"name": "Learner", "email": email, "password": password, "user": USER})


def bearer(response):
    return {"Authorization": f"Bearer {response.json()['token']}"}


def test_two_email_sign_ups_with_the_same_start_both_work(client):
    start = f"ali{uuid.uuid4().hex[:6]}"
    first = register(client, f"{start}@gmail.com")
    second = register(client, f"{start}@yahoo.com")
    assert first.status_code == 201
    assert second.status_code == 201, second.text
    assert first.json()["user"]["username"] == start
    assert second.json()["user"]["username"] == f"{start}2"


def test_saving_never_takes_the_username_from_the_app(client):
    start = f"sara{uuid.uuid4().hex[:6]}"
    register(client, f"{start}@gmail.com")
    second = register(client, f"{start}@yahoo.com")
    # The app guesses the username from the email ("sara..."), which the first account already has.
    saved = client.put("/api/me/user", headers=bearer(second), json={"user": {**USER, "username": start}})
    assert saved.status_code == 200, saved.text
    assert saved.json()["user"]["username"] == f"{start}2"


def test_the_app_cannot_turn_on_unlimited_hearts(client, auth_headers):
    saved = client.put("/api/profile/me", headers=auth_headers, json={"user": {**USER, "hearts": {"current": 5, "max": 5, "unlimited": True}}})
    assert saved.status_code == 200
    assert saved.json()["user"]["hearts"]["unlimited"] is False


def test_huge_xp_from_the_app_is_capped(client, auth_headers):
    saved = client.put(
        "/api/profile/me",
        headers=auth_headers,
        json={"user": {**USER, "totalXp": 99_999_999, "xpByDay": {"2026-11-07": 99_999_999}, "dailyXp": {"date": "2026-11-07", "xp": 99_999_999}}},
    )
    assert saved.status_code == 200
    user = saved.json()["user"]
    assert user["totalXp"] < 99_999_999
    assert user["totalXp"] <= DAILY_XP_CAP * 2
    assert user["dailyXp"]["xp"] == DAILY_XP_CAP


def test_normal_xp_still_saves(client, auth_headers):
    saved = client.put("/api/profile/me", headers=auth_headers, json={"user": {**USER, "totalXp": 340, "xpByDay": {"2026-11-07": 40}}})
    assert saved.json()["user"]["totalXp"] == 340


def test_a_bad_date_from_the_app_does_not_fail_the_save(client, auth_headers):
    saved = client.put("/api/profile/me", headers=auth_headers, json={"user": {**USER, "lastLearningAt": "not a date", "dailyXp": {"date": "2026-11-07", "xp": "lots"}}})
    assert saved.status_code == 200, saved.text


@pytest.fixture()
def limits_on(monkeypatch):
    monkeypatch.setattr(settings, "rate_limit_enabled", True)
    limiter.reset()
    yield
    limiter.reset()


def test_password_guessing_is_slowed_down(client, limits_on):
    email = f"guess-{uuid.uuid4().hex[:8]}@example.com"
    register(client, email, password="the-real-password")
    codes = [client.post("/api/auth/login", json={"email": email, "password": f"wrong-{n}"}).status_code for n in range(10)]
    assert codes == [401] * 10
    # The 11th try within 15 minutes is refused, even with the right password.
    assert client.post("/api/auth/login", json={"email": email, "password": "the-real-password"}).status_code == 429
    # Another email is not affected.
    other = f"other-{uuid.uuid4().hex[:8]}@example.com"
    register(client, other, password="the-real-password")
    assert client.post("/api/auth/login", json={"email": other, "password": "the-real-password"}).status_code == 200


def test_family_code_guessing_is_slowed_down(client, auth_headers, limits_on):
    codes = [client.post("/api/family/kids", headers=auth_headers, json={"code": "ZZZZZZ"}).status_code for _ in range(11)]
    assert codes[:10] == [404] * 10
    assert codes[10] == 429
