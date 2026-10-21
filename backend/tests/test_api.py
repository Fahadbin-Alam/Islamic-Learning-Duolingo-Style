from __future__ import annotations

from sqlalchemy import select

from backend.app.db.session import SessionLocal
from backend.app.models import Lesson, Question


def first_lesson_with_question():
    with SessionLocal() as session:
        question = session.scalar(select(Question).order_by(Question.id))
        lesson = session.get(Lesson, question.lesson_id)
        return lesson.slug, lesson.id, lesson.xp_reward, question.id


def test_health(client):
    response = client.get("/api/health")

    assert response.status_code == 200
    assert response.json() == {"ok": True, "service": "sira-path-fastapi", "database": "sqlite"}


def test_topics_are_seeded_in_order_with_counts(client):
    response = client.get("/api/topics")

    assert response.status_code == 200
    topics = response.json()
    assert topics, "seeded catalog should expose topics"
    assert [topic["orderIndex"] for topic in topics] == sorted(topic["orderIndex"] for topic in topics)
    assert all(topic["branchCount"] > 0 and topic["lessonCount"] > 0 for topic in topics)


def test_topic_branches_and_unknown_topic(client):
    slug = client.get("/api/topics").json()[0]["slug"]

    branches = client.get(f"/api/topics/{slug}/branches")
    missing = client.get("/api/topics/not-a-topic/branches")

    assert branches.status_code == 200
    assert branches.json()
    assert missing.status_code == 404


def test_profile_requires_auth(client):
    assert client.get("/api/profile/me").status_code == 401
    assert client.get("/api/profile/me", headers={"Authorization": "Bearer nope"}).status_code == 401


def test_register_then_login(client, auth_headers):
    me = client.get("/api/profile/me", headers=auth_headers).json()
    email = me["account"]["email"]

    good = client.post("/api/auth/login", json={"email": email, "password": "correct-horse-battery"})
    bad = client.post("/api/auth/login", json={"email": email, "password": "wrong-password"})
    duplicate = client.post(
        "/api/auth/register",
        json={"name": "Again", "email": email, "password": "correct-horse-battery", "user": {}},
    )

    assert good.status_code == 200 and good.json()["token"]
    assert bad.status_code == 401
    assert duplicate.status_code == 409


def test_progress_sync_round_trips_xp_streak_and_hearts(client, auth_headers):
    snapshot = {
        "totalXp": 120,
        "streakDays": 4,
        "gems": 50,
        "hearts": {"current": 2, "max": 5, "unlimited": False},
        "completedLessonIds": ["lesson-foundation-niyyah"],
        "completedNodeIds": ["foundation-niyyah"],
    }

    saved = client.put("/api/profile/me", json={"user": snapshot}, headers=auth_headers)
    fetched = client.get("/api/profile/me", headers=auth_headers)

    assert saved.status_code == 200
    user = fetched.json()["user"]
    assert user["totalXp"] == 120
    assert user["streakDays"] == 4
    assert user["hearts"]["current"] == 2
    assert user["completedLessonIds"] == ["lesson-foundation-niyyah"]
    assert user["completedNodeIds"] == ["foundation-niyyah"]


def test_progress_sync_keeps_best_stars_and_last_topic(client, auth_headers):
    snapshot = {
        "completedNodeIds": ["foundation-niyyah"],
        "nodeStars": {"foundation-niyyah": 2, "bad-stars": 9, "not-a-number": "3"},
        "lastTopicId": "sahabah",
    }

    client.put("/api/profile/me", json={"user": snapshot}, headers=auth_headers)
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["nodeStars"] == {"foundation-niyyah": 2}
    assert user["lastTopicId"] == "sahabah"


def test_legacy_sync_route_matches_profile_route(client, auth_headers):
    response = client.put("/api/me/user", json={"user": {"totalXp": 77}}, headers=auth_headers)

    assert response.status_code == 200
    assert response.json()["user"]["totalXp"] == 77


def test_lesson_completion_awards_xp_and_records_lesson(client, auth_headers):
    lesson_slug, _, xp_reward, _ = first_lesson_with_question()

    response = client.post(f"/api/lessons/{lesson_slug}/completion", json={}, headers=auth_headers)
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert response.status_code == 200
    assert user["totalXp"] == xp_reward
    assert lesson_slug in user["completedLessonIds"]


def test_lesson_completion_unknown_lesson(client, auth_headers):
    response = client.post("/api/lessons/not-a-lesson/completion", json={}, headers=auth_headers)

    assert response.status_code == 404


def test_wrong_answers_build_the_review_queue(client, auth_headers):
    _, lesson_id, _, question_id = first_lesson_with_question()
    attempt = {"lessonId": lesson_id, "isCorrect": False}

    client.post(f"/api/questions/{question_id}/attempts", json=attempt, headers=auth_headers)
    client.post(f"/api/questions/{question_id}/attempts", json=attempt, headers=auth_headers)
    queue = client.get("/api/review-queue", headers=auth_headers).json()

    assert len(queue) == 1
    assert queue[0]["questionId"] == question_id
    assert queue[0]["failureCount"] == 2
    assert queue[0]["priority"] == 4

    client.post(f"/api/questions/{question_id}/attempts", json={**attempt, "isCorrect": True}, headers=auth_headers)
    assert client.get("/api/review-queue", headers=auth_headers).json()[0]["priority"] == 3


def test_delete_account_removes_user_and_signs_out(client):
    import uuid

    email = f"leaver-{uuid.uuid4().hex[:10]}@example.com"
    register = client.post(
        "/api/auth/register",
        json={"name": "Leaver", "email": email, "password": "correct-horse-battery", "user": {"totalXp": 40}},
    )
    headers = {"Authorization": f"Bearer {register.json()['token']}"}
    client.post(f"/api/lessons/{first_lesson_with_question()[0]}/completion", headers=headers, json={})

    deleted = client.delete("/api/profile/me", headers=headers)

    assert deleted.status_code == 200
    assert client.get("/api/session", headers=headers).status_code == 401
    login = client.post("/api/auth/login", json={"email": email, "password": "correct-horse-battery"})
    assert login.status_code == 401
    assert client.delete("/api/profile/me").status_code == 401
