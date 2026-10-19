"""The circle each topic's path puts START on is saved with the learner, so a jump ahead survives a reload."""


def test_progress_sync_keeps_the_path_focus_per_topic(client, auth_headers):
    snapshot = {
        "completedNodeIds": ["foundation-niyyah"],
        "pathFocusIds": {
            "quran_tafseer": "notes-quran-tafseer-surahs-114-105-1",
            "sahabah": "",
            "x" * 41: "too-long-topic",
            "hadith": 7,
        },
    }

    # The app syncs through /api/me/user and reads the learner back on the next load.
    response = client.put("/api/me/user", json={"user": snapshot}, headers=auth_headers)
    assert response.status_code == 200, response.text
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["pathFocusIds"] == {"quran_tafseer": "notes-quran-tafseer-surahs-114-105-1"}


def test_a_sync_without_a_path_focus_keeps_the_saved_one(client, auth_headers):
    client.put("/api/me/user", json={"user": {"pathFocusIds": {"quran_tafseer": "quran-surah-masad"}}}, headers=auth_headers)
    client.put("/api/me/user", json={"user": {"totalXp": 40}}, headers=auth_headers)
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["pathFocusIds"] == {"quran_tafseer": "quran-surah-masad"}
    assert user["totalXp"] == 40


def test_a_new_learner_has_no_path_focus(client, auth_headers):
    user = client.get("/api/profile/me", headers=auth_headers).json()["user"]

    assert user["pathFocusIds"] == {}
