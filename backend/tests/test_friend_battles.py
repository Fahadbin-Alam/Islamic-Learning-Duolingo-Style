from __future__ import annotations

from backend.tests.test_friends_and_daily_progress import befriend, register


def my_id(client, headers):
    return client.get("/api/friends", headers=headers).json()["me"]["id"]


def friends(client):
    aisha_email, aisha = register(client, "Aisha")
    omar_email, omar = register(client, "Omar")
    befriend(client, aisha, omar, omar_email)
    return aisha, omar, my_id(client, aisha), my_id(client, omar)


def test_a_battle_is_asked_accepted_played_by_both_then_scored(client):
    aisha, omar, aisha_id, omar_id = friends(client)

    started = client.post("/api/battles", headers=aisha, json={"friendId": omar_id})
    assert started.status_code == 201, started.text
    battle = started.json()
    assert battle["status"] == "pending" and battle["youStarted"] is True and battle["friend"]["name"] == "Omar"

    # Omar sees the request with Aisha's name and the same questions (seed).
    incoming = client.get("/api/battles", headers=omar).json()["battles"]
    assert [(item["id"], item["youStarted"], item["friend"]["id"], item["seed"]) for item in incoming] == [(battle["id"], False, aisha_id, battle["seed"])]

    # Nobody can play before Omar says yes.
    assert client.post(f"/api/battles/{battle['id']}/score", headers=aisha, json={"correct": 4}).status_code == 409
    # Only Omar can accept.
    assert client.post(f"/api/battles/{battle['id']}/accept", headers=aisha).status_code == 409
    assert client.post(f"/api/battles/{battle['id']}/accept", headers=omar).json()["status"] == "accepted"

    played = client.post(f"/api/battles/{battle['id']}/score", headers=aisha, json={"correct": 4}).json()
    assert played["yourScore"] == 4 and "theirScore" not in played
    # Omar knows Aisha played, but not her score.
    waiting = client.get("/api/battles", headers=omar).json()["battles"][0]
    assert waiting["theyPlayed"] is True and "theirScore" not in waiting
    assert client.post(f"/api/battles/{battle['id']}/score", headers=aisha, json={"correct": 5}).status_code == 409

    done = client.post(f"/api/battles/{battle['id']}/score", headers=omar, json={"correct": 3}).json()
    assert done["status"] == "done" and done["outcome"] == "loss" and done["theirScore"] == 4
    assert client.get("/api/battles", headers=aisha).json()["battles"][0]["outcome"] == "win"


def test_only_friends_who_added_back_can_battle(client):
    _, aisha = register(client, "Aisha")
    stranger_email, stranger = register(client, "Stranger")
    client.post("/api/friends", headers=aisha, json={"email": stranger_email})

    response = client.post("/api/battles", headers=aisha, json={"friendId": my_id(client, stranger)})

    assert response.status_code == 400


def test_one_open_battle_per_friend_and_a_no_closes_it(client):
    aisha, omar, _, omar_id = friends(client)
    first = client.post("/api/battles", headers=aisha, json={"friendId": omar_id}).json()
    assert client.post("/api/battles", headers=aisha, json={"friendId": omar_id}).status_code == 409

    assert client.post(f"/api/battles/{first['id']}/decline", headers=omar).json() == {"ok": True}

    assert client.get("/api/battles", headers=aisha).json()["battles"] == []
    assert client.post("/api/battles", headers=aisha, json={"friendId": omar_id}).status_code == 201


def test_strangers_cannot_touch_a_battle_and_scores_are_checked(client):
    aisha, omar, _, omar_id = friends(client)
    _, eve = register(client, "Eve")
    battle = client.post("/api/battles", headers=aisha, json={"friendId": omar_id}).json()

    assert client.post(f"/api/battles/{battle['id']}/accept", headers=eve).status_code == 404
    client.post(f"/api/battles/{battle['id']}/accept", headers=omar)
    assert client.post(f"/api/battles/{battle['id']}/score", headers=omar, json={"correct": 9}).status_code == 422
    assert client.get("/api/battles").status_code == 401


def test_removing_a_friend_hides_your_battles_with_them(client):
    aisha, omar, aisha_id, omar_id = friends(client)
    client.post("/api/battles", headers=aisha, json={"friendId": omar_id})

    client.delete(f"/api/friends/{aisha_id}", headers=omar)

    assert client.get("/api/battles", headers=aisha).json()["battles"] == []
