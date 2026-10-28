"""The app's weekly league is saved with the learner, and friends who added each other back see each other's league."""

from backend.tests.test_friends_and_daily_progress import befriend, register, sync


def test_progress_sync_keeps_the_league(client, auth_headers):
    league = {"tier": 2, "weekStart": "2026-10-26", "xp": 75, "last": {"weekStart": "2026-10-19", "from": 1, "to": 2, "xp": 120, "seen": True}}
    response = client.put("/api/me/user", json={"user": {"league": league}}, headers=auth_headers)
    assert response.status_code == 200, response.text
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["league"] == league


def test_a_broken_league_is_dropped_and_the_saved_one_kept(client, auth_headers):
    client.put("/api/me/user", json={"user": {"league": {"tier": 3, "weekStart": "2026-10-26", "xp": 10}}}, headers=auth_headers)
    for broken in ({"tier": 9, "weekStart": "2026-10-26", "xp": 1}, {"tier": True, "weekStart": "2026-10-26"}, {"tier": 1, "weekStart": "soon"}, "gold"):
        client.put("/api/me/user", json={"user": {"league": broken}}, headers=auth_headers)
    client.put("/api/me/user", json={"user": {"totalXp": 40}}, headers=auth_headers)
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["league"] == {"tier": 3, "weekStart": "2026-10-26", "xp": 10}


def test_bad_parts_of_a_league_are_cleaned(client, auth_headers):
    league = {"tier": 1, "weekStart": "2026-10-26", "xp": -5, "last": {"from": 0, "to": 12, "weekStart": "2026-10-19"}, "extra": "x"}
    client.put("/api/me/user", json={"user": {"league": league}}, headers=auth_headers)
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["league"] == {"tier": 1, "weekStart": "2026-10-26", "xp": 0}


def test_a_new_learner_has_no_league_yet(client, auth_headers):
    assert client.get("/api/profile/me", headers=auth_headers).json()["user"]["league"] is None


def test_friends_see_each_others_league_but_not_before_adding_back(client):
    friend_email, friend_headers = register(client, "Aisha")
    sync(client, friend_headers, league={"tier": 4, "weekStart": "2026-10-26", "xp": 30})
    _, headers = register(client, "Omar")

    client.post("/api/friends?today=2026-10-28", headers=headers, json={"email": friend_email, "relation": "friend"})
    pending = client.get("/api/friends?today=2026-10-28", headers=headers).json()["pending"][0]
    assert "league" not in pending

    my_id = client.get("/api/friends", headers=headers).json()["me"]["id"]
    assert client.post(f"/api/friends/requests/{my_id}/accept", headers=friend_headers).status_code == 201
    crew = client.get("/api/friends?today=2026-10-28", headers=headers).json()

    assert crew["friends"][0]["league"] == 4
    assert crew["me"]["league"] == 0


def test_the_weekly_race_starts_on_monday(client):
    friend_email, friend_headers = register(client, "Aisha")
    # Sunday the 25th is last week; Monday the 26th and Wednesday the 28th are this week.
    for day, xp in (("2026-10-25", 50), ("2026-10-26", 20), ("2026-10-28", 7)):
        sync(client, friend_headers, dailyXp={"date": day, "xp": xp})
    friend_me = client.get("/api/friends", headers=friend_headers).json()["me"]["id"]
    my_email, headers = register(client, "Omar")
    befriend(client, headers, friend_headers, friend_email)
    crew = client.get("/api/friends?today=2026-10-28", headers=headers).json()

    assert [friend["id"] for friend in crew["friends"]] == [friend_me]
    assert crew["friends"][0]["weeklyXp"] == 27
