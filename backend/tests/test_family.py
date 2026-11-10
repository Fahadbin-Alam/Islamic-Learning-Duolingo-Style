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
         completedLessonIds=["a", "b"], completedNodeIds=["n1"], nodeStars={"n1": 2})
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


def link(client, parent, kid):
    response = client.post("/api/family/kids", headers=parent, json={"code": code_for(client, kid)})
    assert response.status_code == 201, response.text
    return response.json()["id"]


def test_a_linked_grown_up_gives_homework_and_sees_when_it_is_done(client):
    _, kid = register(client, "Aisha")
    _, teacher = register(client, "Amina")
    kid_id = link(client, teacher, kid)

    given = client.post(
        f"/api/family/kids/{kid_id}/homework",
        headers=teacher,
        json={"topicId": "prayer", "unitId": "unit-wudu", "nodeIds": ["w1", "w2", "w2", "w3"], "dueDate": "2026-11-14"},
    )
    assert given.status_code == 201, given.text
    body = given.json()
    assert body["nodeIds"] == ["w1", "w2", "w3"]
    assert body["doneCount"] == 0 and body["total"] == 3 and body["done"] is False
    assert body["setBy"]["name"] == "Amina"

    # The learner sees it, with who gave it.
    mine = client.get("/api/family", headers=kid).json()["homework"]
    assert [(entry["unitId"], entry["dueDate"], entry["setBy"]["name"]) for entry in mine] == [("unit-wudu", "2026-11-14", "Amina")]

    # Two of three circles: not done yet. All three: done.
    sync(client, kid, completedNodeIds=["w1", "w2"])
    homework = client.get("/api/family", headers=teacher).json()["kids"][0]["homework"]
    assert (homework[0]["doneCount"], homework[0]["done"]) == (2, False)
    sync(client, kid, completedNodeIds=["w1", "w2", "w3", "other"])
    homework = client.get("/api/family", headers=teacher).json()["kids"][0]["homework"]
    assert (homework[0]["doneCount"], homework[0]["done"]) == (3, True)


def test_only_the_grown_up_who_follows_can_give_or_take_back_homework(client):
    _, kid = register(client, "Bilal")
    _, parent = register(client, "AbuBilal")
    _, stranger = register(client, "Stranger2")
    kid_id = link(client, parent, kid)
    task = {"topicId": "manners", "unitId": "unit-salam", "nodeIds": ["s1"]}

    assert client.post(f"/api/family/kids/{kid_id}/homework", headers=stranger, json=task).status_code == 404
    homework_id = client.post(f"/api/family/kids/{kid_id}/homework", headers=parent, json=task).json()["id"]
    # The same unit twice, a bad date, or no lessons are refused.
    assert client.post(f"/api/family/kids/{kid_id}/homework", headers=parent, json=task).status_code == 409
    assert client.post(f"/api/family/kids/{kid_id}/homework", headers=parent, json={**task, "unitId": "u2", "dueDate": "Friday"}).status_code == 400
    assert client.post(f"/api/family/kids/{kid_id}/homework", headers=parent, json={**task, "unitId": "u3", "nodeIds": []}).status_code == 422

    # Neither a stranger nor the learner can delete it; the grown-up who gave it can.
    assert client.delete(f"/api/family/homework/{homework_id}", headers=stranger).status_code == 404
    assert client.delete(f"/api/family/homework/{homework_id}", headers=kid).status_code == 404
    assert client.delete(f"/api/family/homework/{homework_id}", headers=parent).status_code == 200
    assert client.get("/api/family", headers=kid).json()["homework"] == []


def test_unlinking_takes_that_grown_ups_homework_away(client):
    _, kid = register(client, "Safiyyah")
    _, parent = register(client, "Mama")
    _, teacher = register(client, "Ustadh")
    kid_id = link(client, parent, kid)
    link(client, teacher, kid)
    client.post(f"/api/family/kids/{kid_id}/homework", headers=parent, json={"topicId": "duas", "unitId": "a", "nodeIds": ["d1"]})
    client.post(f"/api/family/kids/{kid_id}/homework", headers=teacher, json={"topicId": "duas", "unitId": "b", "nodeIds": ["d2"]})

    teacher_id = next(entry["id"] for entry in client.get("/api/family", headers=kid).json()["parents"] if entry["name"] == "Ustadh")
    assert client.delete(f"/api/family/parents/{teacher_id}", headers=kid).status_code == 200
    assert [entry["unitId"] for entry in client.get("/api/family", headers=kid).json()["homework"]] == ["a"]

    assert client.delete(f"/api/family/kids/{kid_id}", headers=parent).status_code == 200
    assert client.get("/api/family", headers=kid).json()["homework"] == []
