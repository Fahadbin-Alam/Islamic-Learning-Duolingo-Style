from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from backend.app.catalog_seed import built_in_topic_seed, load_imported_branches, topic_seed, with_imported_branches


def imported_branch(title: str, lessons: list | None = None) -> dict:
    return {
        "title": title,
        "description": "From notes.",
        "difficulty_start": 1,
        "difficulty_end": 2,
        "resources": [],
        "lessons": lessons or [],
    }


def imported_lesson(title: str, difficulty: int) -> dict:
    return {"title": title, "description": title, "difficulty": difficulty, "questions": []}


def branches_of(topics: list, slug: str) -> list:
    return next(topic for topic in topics if topic["slug"] == slug)["branches"]


class ImportedNotesSeedTest(unittest.TestCase):
    def test_missing_file_means_no_imported_branches(self) -> None:
        self.assertEqual(load_imported_branches(Path("/nonexistent/obsidian_import.json")), {})

    def test_loads_topics_from_import_file(self) -> None:
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "obsidian_import.json"
            path.write_text(json.dumps({"topics": {"sahabi": [imported_branch("Umar")]}}), encoding="utf-8")
            self.assertEqual(list(load_imported_branches(path)), ["sahabi"])

    def test_appends_imported_branches_and_keeps_title_clashes_separate(self) -> None:
        topics = built_in_topic_seed()
        sahabi = next(topic for topic in topics if topic["slug"] == "sahabi")
        existing_title = sahabi["branches"][0]["title"]

        with_imported_branches(topics, {"sahabi": [imported_branch(existing_title), imported_branch("Treaty of Hudaybiyyah study")]})

        titles = [branch["title"] for branch in sahabi["branches"][:2]]
        self.assertEqual(titles, [f"{existing_title} (notes)", "Treaty of Hudaybiyyah study"])


    def test_adds_topics_that_only_come_from_notes(self) -> None:
        topics = with_imported_branches(built_in_topic_seed(), {"hadith": [imported_branch("Hadith from your notes")]})
        hadith = next(topic for topic in topics if topic["slug"] == "hadith")
        self.assertEqual([branch["title"] for branch in hadith["branches"]], ["Hadith from your notes"])

    def test_moves_the_marriage_hadith_to_the_end_of_marriage_like_the_app(self) -> None:
        # src/data/importedNotes.ts moveOlderHadith: level 4 and up is the last Marriage unit; the rest stay in
        # Hadith as "Safe with Allah", easiest first.
        imported = {
            "hadith": [
                imported_branch("Hadith 1", [imported_lesson("Half of the religion", 4), imported_lesson("Seek refuge", 2), imported_lesson("Hold on", 1)]),
                imported_branch("Hadith 2", [imported_lesson("Iblis and his troops", 5), imported_lesson("Every prophet warned", 3)]),
            ]
        }
        topics = with_imported_branches(built_in_topic_seed(), imported)

        hadith = branches_of(topics, "hadith")
        self.assertEqual([branch["title"] for branch in hadith], ["Safe with Allah"])
        self.assertEqual([lesson["title"] for lesson in hadith[0]["lessons"]], ["Hold on", "Seek refuge", "Every prophet warned"])
        self.assertEqual((hadith[0]["difficulty_start"], hadith[0]["difficulty_end"]), (1, 3))

        marriage = branches_of(topics, "marriage")
        built_in = branches_of(built_in_topic_seed(), "marriage")
        self.assertEqual([branch["title"] for branch in marriage], [branch["title"] for branch in built_in] + ["Marriage in the Sunnah"])
        self.assertEqual([lesson["title"] for lesson in marriage[-1]["lessons"]], ["Half of the religion", "Iblis and his troops"])
        self.assertEqual((marriage[-1]["difficulty_start"], marriage[-1]["difficulty_end"]), (4, 5))

    def test_seeds_the_real_import_as_the_app_shows_it(self) -> None:
        topics = topic_seed()
        hadith = branches_of(topics, "hadith")
        self.assertEqual([branch["title"] for branch in hadith], ["Safe with Allah"])
        self.assertEqual([lesson["title"] for lesson in hadith[0]["lessons"]], ["Hold on to Allah's Book", "Seek refuge with Allah", "Every prophet warned"])
        self.assertTrue(all(lesson["difficulty"] <= 3 for lesson in hadith[0]["lessons"]))
        marriage = branches_of(topics, "marriage")
        self.assertEqual(marriage[-1]["title"], "Marriage in the Sunnah")
        self.assertEqual(
            [lesson["title"] for lesson in marriage[-1]["lessons"]],
            ["Half of the religion", "Marriage or fasting", "Iblis and his troops", "Choosing a wife", "A righteous wife"],
        )
        # No marriage hadith is left in the children's Hadith topic.
        titles = {lesson["title"] for branch in hadith for lesson in branch["lessons"]}
        self.assertFalse(titles & {lesson["title"] for lesson in marriage[-1]["lessons"]})
        # The moved lessons keep the app's gentle text: the Dajjal lesson stores only the line its card quotes.
        warned = next(lesson for lesson in hadith[0]["lessons"] if lesson["title"] == "Every prophet warned")
        self.assertNotRegex(warned["description"], r"(?i)\b(kill|neck|one-eyed)\b")


if __name__ == "__main__":
    unittest.main()
