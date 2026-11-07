from __future__ import annotations

from datetime import date, timedelta

from backend.tests.test_friends_and_daily_progress import befriend, register, sync


TODAY = date.today()


def day(offset: int) -> str:
    return (TODAY + timedelta(days=offset)).isoformat()


def pair(client):
    aisha_email, aisha = register(client, "Aisha")
    omar_email, omar = register(client, "Omar")
    befriend(client, omar, aisha, aisha_email, today=day(0))
    return aisha, omar


def streak(client, headers, today: str):
    friends = client.get(f"/api/friends?today={today}", headers=headers).json()["friends"]
    assert len(friends) == 1
    return friends[0]["friendStreak"]


def learn(client, headers, *offsets: int):
    sync(client, headers, xpByDay={day(offset): 20 for offset in offsets})


def test_friend_streak_counts_days_both_learned_in_a_row(client):
    aisha, omar = pair(client)
    learn(client, aisha, 0)
    learn(client, omar, 0)

    mine = streak(client, omar, day(0))
    theirs = streak(client, aisha, day(0))

    assert mine == {"days": 1, "best": 1, "meToday": True, "friendToday": True}
    assert theirs["days"] == 1


def test_one_friend_alone_keeps_nothing_and_shows_who_still_has_to_learn(client):
    aisha, omar = pair(client)
    learn(client, aisha, 0)

    mine = streak(client, omar, day(0))

    assert mine == {"days": 0, "best": 0, "meToday": False, "friendToday": True}


def test_days_before_they_became_friends_do_not_count(client):
    aisha, omar = pair(client)
    learn(client, aisha, -5, -4, -3, 0)
    learn(client, omar, -5, -4, -3, 0)

    assert streak(client, omar, day(0))["days"] == 1


def test_streak_survives_until_tomorrow_then_ends(client):
    aisha, omar = pair(client)
    learn(client, aisha, 0)
    learn(client, omar, 0)

    assert streak(client, omar, day(1))["days"] == 1
    gone = streak(client, omar, day(2))
    assert gone["days"] == 0
    assert gone["best"] == 1


def test_streak_grows_and_restarts_after_a_missed_day(client):
    aisha, omar = pair(client)
    learn(client, aisha, 0, 1, 2)
    learn(client, omar, 0, 1, 2)
    assert streak(client, omar, day(2))["days"] == 3

    # Day 3 only Aisha learned, so day 4 starts over.
    learn(client, aisha, 3, 4)
    learn(client, omar, 4)
    again = streak(client, omar, day(4))
    assert again["days"] == 1
    assert again["best"] == 3


def test_saved_streak_outlives_the_short_xp_history(client):
    aisha, omar = pair(client)
    learn(client, aisha, *range(0, 20))
    learn(client, omar, *range(0, 20))
    assert streak(client, omar, day(19))["days"] == 20

    # The server keeps only 28 days of XP, so days 0 and 1 drop out; the saved count carries on.
    learn(client, aisha, *range(20, 30))
    learn(client, omar, *range(20, 30))
    assert streak(client, aisha, day(29))["days"] == 30


def test_pending_friends_get_no_friend_streak(client):
    aisha_email, aisha = register(client, "Aisha")
    _, omar = register(client, "Omar")
    client.post(f"/api/friends?today={day(0)}", headers=omar, json={"email": aisha_email, "relation": "friend"})

    crew = client.get(f"/api/friends?today={day(0)}", headers=omar).json()

    assert crew["friends"] == []
    assert "friendStreak" not in crew["pending"][0]
