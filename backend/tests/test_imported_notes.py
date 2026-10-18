from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path

from backend.app.catalog_seed import built_in_topic_seed, load_imported_branches, with_imported_branches


def imported_branch(title: str) -> dict:
    return {
        "title": title,
        "description": "From notes.",
        "difficulty_start": 1,
        "difficulty_end": 2,
        "resources": [],
        "lessons": [],
    }


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


if __name__ == "__main__":
    unittest.main()
