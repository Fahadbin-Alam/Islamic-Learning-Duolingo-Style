from __future__ import annotations

from backend.tests.test_friends_and_daily_progress import register, sync


def ummah(trophies=0, nickname="Brave Falcon 42", joined=True, **extra):
    return {"trophies": trophies, "best": trophies, "battles": 1, "wins": 1, "nickname": nickname, "joined": joined, **extra}


def test_ranking_shows_only_joined_learners_by_nickname_and_trophies(client):
    _, aisha = register(client, "Aisha")
    _, omar = register(client, "Omar")
    _, hidden = register(client, "Hidden")
    client.post("/api/ummah/rankings", headers=aisha, json={"ummah": ummah(300, "Kind Dove 15")})
    client.post("/api/ummah/rankings", headers=hidden, json={"ummah": ummah(900, "Wise Owl 77", joined=False)})

    response = client.post("/api/ummah/rankings", headers=omar, json={"ummah": ummah(120, "Swift Eagle 31", icon="moon", icons=["moon"])})

    assert response.status_code == 200, response.text
    body = response.json()
    nicknames = [row["nickname"] for row in body["top"]]
    assert nicknames.index("Kind Dove 15") < nicknames.index("Swift Eagle 31")
    assert "Wise Owl 77" not in nicknames
    me = body["me"]
    assert me["nickname"] == "Swift Eagle 31" and me["you"] is True and me["icon"] == "moon"
    # Nothing but the nickname, an icon and trophies.
    assert all(set(row) <= {"rank", "nickname", "trophies", "icon", "you"} for row in body["top"])


def test_typed_names_and_unknown_icons_never_reach_the_ranking(client):
    _, headers = register(client, "Yusuf")

    body = client.post("/api/ummah/rankings", headers=headers, json={"ummah": ummah(50, "Yusuf Ahmed", icon="photo", icons=["photo"])}).json()

    assert body["me"] is None
    assert all(row["nickname"] != "Yusuf Ahmed" for row in body["top"])
    saved = client.get("/api/session", headers=headers).json()["user"]["ummah"]
    assert saved["joined"] is False and "nickname" not in saved and saved["icons"] == [] and "icon" not in saved


def test_ummah_follows_the_learner_through_user_sync(client):
    _, headers = register(client, "Maryam")

    user = sync(client, headers, ummah=ummah(260, "Gentle Gazelle 18", secrets=["secret-charity"], hints=["secret-intentions"]))

    assert user["ummah"]["trophies"] == 260
    assert user["ummah"]["secrets"] == ["secret-charity"]
    assert user["ummah"]["joined"] is True


def test_ranking_needs_a_session(client):
    assert client.post("/api/ummah/rankings", json={"ummah": ummah()}).status_code == 401
