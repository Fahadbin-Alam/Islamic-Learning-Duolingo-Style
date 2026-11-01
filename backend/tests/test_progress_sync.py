"""A learner's whole profile survives a new phone, and two phones out of step never lose progress."""
from __future__ import annotations

import uuid


def register(client, **user_fields):
    email = f"sync-{uuid.uuid4().hex[:10]}@example.com"
    user = {"totalXp": 0, "streakDays": 0, "hearts": {"current": 5, "max": 5, "unlimited": False}, **user_fields}
    response = client.post("/api/auth/register", json={"name": "Sync", "email": email, "password": "correct-horse-battery", "user": user})
    assert response.status_code == 201, response.text
    return email, {"Authorization": f"Bearer {response.json()['token']}"}


def sync(client, headers, **user_fields):
    response = client.put("/api/me/user", headers=headers, json={"user": user_fields})
    assert response.status_code == 200, response.text
    return response.json()["user"]


def new_phone(client, email):
    """Log in from a second phone and load the account, like a reinstall does."""
    response = client.post("/api/auth/login", json={"email": email, "password": "correct-horse-battery"})
    assert response.status_code == 200, response.text
    return response.json()["user"], {"Authorization": f"Bearer {response.json()['token']}"}


REVIEW_CARDS = {"seerah-1:q2": {"box": 1, "due": "2026-11-01", "misses": 2}}
QUIZ_SCORES = {"topic:seerah": {"best": 80, "last": 60, "taken": 2, "takenAt": "2026-10-30T10:00:00Z"}}


def test_fields_without_a_column_come_back_on_a_new_phone(client):
    email, headers = register(client)
    sync(
        client,
        headers,
        reviewCards=REVIEW_CARDS,
        quizScores=QUIZ_SCORES,
        ramadanDays=["2026-03-01"],
        streakFreezes={"owned": 2},
        xpByDay={"2026-10-30": 40, "2026-10-31": 25},
    )

    user, _ = new_phone(client, email)

    assert user["reviewCards"] == REVIEW_CARDS
    assert user["quizScores"] == QUIZ_SCORES
    assert user["ramadanDays"] == ["2026-03-01"]
    assert user["streakFreezes"] == {"owned": 2}
    assert user["xpByDay"] == {"2026-10-30": 40, "2026-10-31": 25}


def test_an_extra_field_cannot_overwrite_the_account_or_premium(client):
    email, headers = register(client)
    own_id = sync(client, headers)["id"]
    user = sync(client, headers, accountEmail="someone-else@example.com", activeSubscriptionId="premium_yearly", id=own_id + 999)

    assert user["accountEmail"] == email
    assert user["activeSubscriptionId"] is None
    assert user["id"] == own_id


def test_a_save_too_big_keeps_the_last_good_copy(client):
    _, headers = register(client)
    sync(client, headers, reviewCards=REVIEW_CARDS)

    user = sync(client, headers, reviewCards={f"card-{index}": "x" * 200 for index in range(2000)})

    assert user["reviewCards"] == REVIEW_CARDS


def test_odd_keys_are_dropped(client):
    _, headers = register(client)
    user = sync(client, headers, **{"bad key": 1, "_private": 2, "fine": 3})

    assert "bad key" not in user and "_private" not in user
    assert user["fine"] == 3


def test_a_phone_that_was_offline_does_not_undo_another_phones_lessons(client):
    email, headers = register(client)
    # Phone A finishes two lessons.
    sync(client, headers, totalXp=60, completedLessonIds=["a1", "a2"], completedNodeIds=["n1"], nodeStars={"n1": 3},
         streakDays=4, lastStreakDate="2026-10-31", league={"tier": 2, "weekStart": "2026-10-27", "xp": 60},
         xpByDay={"2026-10-31": 60})

    # Phone B was offline since an older copy and sends what it did meanwhile.
    _, phone_b = new_phone(client, email)
    user = sync(client, phone_b, totalXp=30, completedLessonIds=["b1"], completedNodeIds=["n1", "n2"],
                nodeStars={"n1": 1, "n2": 2}, streakDays=3, lastStreakDate="2026-10-30",
                league={"tier": 2, "weekStart": "2026-10-27", "xp": 30}, xpByDay={"2026-10-30": 30, "2026-10-31": 10})

    assert user["completedLessonIds"] == ["a1", "a2", "b1"]
    assert user["completedNodeIds"] == ["n1", "n2"]
    assert user["nodeStars"] == {"n1": 3, "n2": 2}
    assert user["totalXp"] == 60
    # The older streak day does not replace the newer one.
    assert user["streakDays"] == 4 and user["lastStreakDate"] == "2026-10-31"
    assert user["league"]["xp"] == 60
    assert user["xpByDay"] == {"2026-10-30": 30, "2026-10-31": 60}


def test_a_newer_streak_and_league_week_replace_older_ones(client):
    _, headers = register(client)
    sync(client, headers, streakDays=4, lastStreakDate="2026-10-30", league={"tier": 1, "weekStart": "2026-10-20", "xp": 90})

    user = sync(client, headers, streakDays=0, lastStreakDate="2026-11-02", league={"tier": 2, "weekStart": "2026-10-27", "xp": 10})

    assert user["streakDays"] == 0
    assert user["league"]["tier"] == 2 and user["league"]["xp"] == 10


def test_quiz_scores_and_ramadan_days_merge_across_phones(client):
    _, headers = register(client)
    sync(client, headers, quizScores={"topic:seerah": {"best": 90, "last": 90, "taken": 3, "takenAt": "x", "perfectRewarded": True}},
         ramadanDays=["2026-03-01", "2026-03-02"])

    user = sync(client, headers, quizScores={"topic:seerah": {"best": 70, "last": 70, "taken": 1, "takenAt": "y"}, "unit:u1": {"best": 50, "last": 50, "taken": 1, "takenAt": "z"}},
                ramadanDays=["2026-03-03"])

    assert user["quizScores"]["topic:seerah"] == {"best": 90, "last": 70, "taken": 3, "takenAt": "y", "perfectRewarded": True}
    assert user["quizScores"]["unit:u1"]["best"] == 50
    assert user["ramadanDays"] == ["2026-03-01", "2026-03-02", "2026-03-03"]


def test_gems_take_the_latest_copy(client):
    _, headers = register(client)
    sync(client, headers, gems=300)

    assert sync(client, headers, gems=250)["gems"] == 250
