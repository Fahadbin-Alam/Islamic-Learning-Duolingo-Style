from __future__ import annotations

import uuid


def register(client, name="Learner", **user_fields):
    email = f"{name.lower()}-{uuid.uuid4().hex[:10]}@example.com"
    user = {"totalXp": 0, "streakDays": 0, "hearts": {"current": 5, "max": 5, "unlimited": False}, **user_fields}
    response = client.post("/api/auth/register", json={"name": name, "email": email, "password": "correct-horse-battery", "user": user})
    assert response.status_code == 201, response.text
    return email, {"Authorization": f"Bearer {response.json()['token']}"}


def befriend(client, headers, friend_headers, friend_email, today="2026-10-18"):
    """Both sides add each other, so the crew shows their stats."""
    added = client.post(f"/api/friends?today={today}", headers=headers, json={"email": friend_email, "relation": "friend"})
    assert added.status_code == 201, added.text
    my_id = client.get("/api/friends", headers=headers).json()["me"]["id"]
    accepted = client.post(f"/api/friends/requests/{my_id}/accept", headers=friend_headers)
    return added, accepted


def sync(client, headers, **user_fields):
    response = client.put("/api/me/user", headers=headers, json={"user": user_fields})
    assert response.status_code == 200, response.text
    return response.json()["user"]


def test_daily_xp_streak_date_and_heart_refill_survive_a_reload(client):
    _, headers = register(client)
    sync(
        client,
        headers,
        dailyXp={"date": "2026-10-18", "xp": 48},
        streakDays=3,
        lastStreakDate="2026-10-18",
        hearts={"current": 0, "max": 5, "unlimited": False, "lastRefillDate": "2026-10-18"},
    )

    user = client.get("/api/session", headers=headers).json()["user"]

    assert user["dailyXp"] == {"date": "2026-10-18", "xp": 48}
    assert user["streakDays"] == 3
    assert user["lastStreakDate"] == "2026-10-18"
    # Without the saved refill date, every reload looked like a new day and refilled the hearts.
    assert user["hearts"]["lastRefillDate"] == "2026-10-18"
    assert user["hearts"]["current"] == 0


def test_friend_shows_real_xp_weekly_xp_and_streak(client):
    friend_email, friend_headers = register(client, "Aisha")
    sync(client, friend_headers, totalXp=120, dailyXp={"date": "2026-10-10", "xp": 30}, streakDays=4, lastStreakDate="2026-10-17")
    sync(client, friend_headers, dailyXp={"date": "2026-10-17", "xp": 40})
    sync(client, friend_headers, dailyXp={"date": "2026-10-18", "xp": 15})
    _, headers = register(client, "Omar")
    me_id = client.get("/api/friends", headers=headers).json()["me"]["id"]

    added = client.post("/api/friends?today=2026-10-18", headers=headers, json={"email": friend_email.upper(), "relation": "friend"})
    assert client.post(f"/api/friends/requests/{me_id}/accept", headers=friend_headers).status_code == 201
    crew = client.get("/api/friends?today=2026-10-18", headers=headers).json()

    assert added.status_code == 201, added.text
    assert [friend["name"] for friend in crew["friends"]] == ["Aisha"]
    aisha = crew["friends"][0]
    assert aisha["totalXp"] == 120
    # Only the last seven days count toward the weekly race; the 10th is outside it.
    assert aisha["weeklyXp"] == 55
    assert aisha["streakDays"] == 4
    assert crew["me"]["name"] == "Omar"
    assert "email" not in aisha


def test_lapsed_friend_streak_shows_zero(client):
    friend_email, friend_headers = register(client, "Bilal")
    sync(client, friend_headers, streakDays=9, lastStreakDate="2026-10-01")
    _, headers = register(client, "Zaid")
    befriend(client, headers, friend_headers, friend_email)

    crew = client.get("/api/friends?today=2026-10-18", headers=headers).json()

    assert crew["friends"][0]["streakDays"] == 0


def test_adding_friends_rejects_unknown_self_and_duplicates(client):
    friend_email, _ = register(client, "Hamza")
    my_email, headers = register(client, "Yusuf")

    unknown = client.post("/api/friends", headers=headers, json={"email": "nobody-here@example.com"})
    myself = client.post("/api/friends", headers=headers, json={"email": my_email})
    first = client.post("/api/friends", headers=headers, json={"email": friend_email})
    again = client.post("/api/friends", headers=headers, json={"email": friend_email})

    assert unknown.status_code == 404
    assert myself.status_code == 400
    assert first.status_code == 201
    assert again.status_code == 409


def test_remove_friend_and_auth_required(client):
    friend_email, _ = register(client, "Khadija")
    _, headers = register(client, "Maryam")
    friend_id = client.post("/api/friends", headers=headers, json={"email": friend_email}).json()["id"]

    removed = client.delete(f"/api/friends/{friend_id}", headers=headers)
    crew = client.get("/api/friends", headers=headers).json()

    assert removed.status_code == 200
    assert crew["friends"] == []
    assert client.get("/api/friends").status_code == 401


def test_deleting_an_account_removes_it_from_crews(client):
    friend_email, friend_headers = register(client, "Sumayyah")
    _, headers = register(client, "Asma")
    befriend(client, headers, friend_headers, friend_email)
    assert len(client.get("/api/friends", headers=headers).json()["friends"]) == 1

    assert client.delete("/api/profile/me", headers=friend_headers).status_code == 200
    assert client.get("/api/friends", headers=headers).json()["friends"] == []


def test_one_sided_add_shows_nothing_until_they_add_back(client):
    friend_email, friend_headers = register(client, "Ruqayyah")
    sync(client, friend_headers, totalXp=300, streakDays=7, lastStreakDate="2026-10-18")
    _, headers = register(client, "Stranger")

    added = client.post("/api/friends?today=2026-10-18", headers=headers, json={"email": friend_email})
    crew = client.get("/api/friends?today=2026-10-18", headers=headers).json()

    assert added.status_code == 201
    # Only what the adder already knew: the email they typed. No name, XP, streak or last learning time.
    assert added.json()["pending"] is True
    assert added.json()["name"] == friend_email
    assert crew["friends"] == []
    assert crew["pending"][0]["name"] == friend_email
    assert crew["pending"][0]["totalXp"] == 0
    assert crew["pending"][0]["streakDays"] == 0
    assert crew["pending"][0]["lastLearningAt"] is None

    # The other side sees who asked and can say yes.
    their_crew = client.get("/api/friends", headers=friend_headers).json()
    assert [request["name"] for request in their_crew["requests"]] == ["Stranger"]
    accepted = client.post(f"/api/friends/requests/{their_crew['requests'][0]['id']}/accept", headers=friend_headers)
    assert accepted.status_code == 201

    crew = client.get("/api/friends?today=2026-10-18", headers=headers).json()
    assert crew["pending"] == []
    assert crew["friends"][0]["name"] == "Ruqayyah"
    assert crew["friends"][0]["totalXp"] == 300
    assert client.get("/api/friends", headers=friend_headers).json()["requests"] == []


def test_declining_a_request_removes_it(client):
    friend_email, friend_headers = register(client, "Safiyyah")
    _, headers = register(client, "Asker")
    client.post("/api/friends", headers=headers, json={"email": friend_email})
    request_id = client.get("/api/friends", headers=friend_headers).json()["requests"][0]["id"]

    assert client.delete(f"/api/friends/requests/{request_id}", headers=friend_headers).status_code == 200
    assert client.get("/api/friends", headers=friend_headers).json()["requests"] == []
    assert client.get("/api/friends", headers=headers).json()["pending"] == []
    assert client.post(f"/api/friends/requests/{request_id}/accept", headers=friend_headers).status_code == 404
