from __future__ import annotations

from backend.app.core.config import settings


def test_stats_route_is_off_without_a_key(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "")
    assert client.get("/api/admin/stats", headers={"X-Admin-Key": "anything"}).status_code == 404


def test_stats_need_the_right_key(client, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    assert client.get("/api/admin/stats").status_code == 401
    assert client.get("/api/admin/stats", headers={"X-Admin-Key": "wrong"}).status_code == 401


def test_stats_count_users_and_hide_personal_data(client, auth_headers, monkeypatch):
    monkeypatch.setattr(settings, "admin_key", "owner-secret-123")
    response = client.get("/api/admin/stats", headers={"X-Admin-Key": "owner-secret-123"})
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["users"]["total"] >= 1
    assert body["users"]["new"]["today"] >= 1
    assert body["users"]["active"]["last7"] >= 1
    assert len(body["series"]["days"]) == 28 == len(body["series"]["newAccounts"]) == len(body["series"]["learners"])
    assert body["series"]["newAccounts"][-1] >= 1
    assert body["money"]["subscriptionsMonthlyUsd"] >= 0
    assert "@" not in response.text  # no emails leave the server
