from __future__ import annotations

from datetime import datetime, timedelta, timezone

from backend.app.db.session import SessionLocal
from backend.app.models import FamilyLinkCode
from backend.tests.test_friends_and_daily_progress import register, sync


def code_for(client, headers):
    response = client.post("/api/family/code", headers=headers)
    assert response.status_code == 201, response.text
    return response.json()["code"]


def test_parent_links_with_the_childs_code_and_sees_live_progress(client):
    _, kid = register(client, "Yusuf")
    sync(client, kid, totalXp=90, streakDays=3, lastStreakDate="2026-11-02", dailyXp={"date": "2026-11-02", "xp": 25},
         completedLessonIds=["a", "b"], completedNodeIds=["n1"], nodeStars={"n1": 2}, lastTopicId="manners", pathFocusIds={"manners": "manners-salam"})
    _, parent = register(client, "Mum")

    code = code_for(client, kid)
    assert len(code) == 6
    # Lower case and spaces still work, since a parent may type what a child reads out.
    linked = client.post("/api/family/kids?today=2026-11-02", headers=parent, json={"code": f" {code[:3].lower()} {code[3:]} "})
    assert linked.status_code == 201, linked.text
    body = linked.json()
    assert body["name"] == "Yusuf"
    assert body["streakDays"] == 3
    assert body["totalXp"] == 90
    assert body["lessonsDone"] == 2
    assert body["xpByDay"]["2026-11-02"] == 25
    assert body["completedNodeIds"] == ["n1"]
    assert body["nodeStars"] == {"n1": 2}
    assert body["learningNow"] == {"topicId": "manners", "nodeId": "manners-salam"}
    assert "email" not in body

    family = client.get("/api/family?today=2026-11-02", headers=parent).json()
    assert [entry["name"] for entry in family["kids"]] == ["Yusuf"]
    assert family["parents"] == []
    # The child sees who follows them, by name only.
    child_view = client.get("/api/family", headers=kid).json()
    assert [entry["name"] for entry in child_view["parents"]] == ["Mum"]
    assert child_view["kids"] == []


def test_a_code_works_once_and_never_for_yourself(client):
    _, kid = register(client, "Maryam")
    _, parent = register(client, "Dad")
    _, stranger = register(client, "Stranger")

    code = code_for(client, kid)
    assert client.post("/api/family/kids", headers=kid, json={"code": code}).status_code == 400
    assert client.post("/api/family/kids", headers=parent, json={"code": code}).status_code == 201
    assert client.post("/api/family/kids", headers=stranger, json={"code": code}).status_code == 404
    assert client.post("/api/family/kids", headers=parent, json={"code": "ZZZZZZ"}).status_code == 404

    # Already linked: a new code says so.
    assert client.post("/api/family/kids", headers=parent, json={"code": code_for(client, kid)}).status_code == 409


def test_a_new_code_replaces_the_old_one_and_old_codes_expire(client):
    _, kid = register(client, "Ibrahim")
    _, parent = register(client, "Grandma")

    first = code_for(client, kid)
    second = code_for(client, kid)
    assert client.post("/api/family/kids", headers=parent, json={"code": first}).status_code == 404

    with SessionLocal() as db:
        entry = db.get(FamilyLinkCode, second)
        entry.expires_at = datetime.now(timezone.utc) - timedelta(minutes=1)
        db.commit()
    assert client.post("/api/family/kids", headers=parent, json={"code": second}).status_code == 404


def test_either_side_can_unlink(client):
    _, kid = register(client, "Zayd")
    _, parent = register(client, "Aunt")
    kid_id = client.post("/api/family/kids", headers=parent, json={"code": code_for(client, kid)}).json()["id"]

    assert client.delete(f"/api/family/kids/{kid_id}", headers=parent).status_code == 200
    assert client.get("/api/family", headers=parent).json()["kids"] == []
    assert client.delete(f"/api/family/kids/{kid_id}", headers=parent).status_code == 404

    client.post("/api/family/kids", headers=parent, json={"code": code_for(client, kid)})
    parent_id = client.get("/api/family", headers=kid).json()["parents"][0]["id"]
    assert client.delete(f"/api/family/parents/{parent_id}", headers=kid).status_code == 200
    assert client.get("/api/family", headers=parent).json()["kids"] == []


def test_deleting_the_childs_account_removes_the_link(client):
    _, kid = register(client, "Hamza")
    _, parent = register(client, "Uncle")
    client.post("/api/family/kids", headers=parent, json={"code": code_for(client, kid)})

    assert client.delete("/api/profile/me", headers=kid).status_code == 200
    assert client.get("/api/family", headers=parent).json()["kids"] == []


def test_family_needs_an_account(client):
    assert client.get("/api/family").status_code == 401
    assert client.post("/api/family/code").status_code == 401
