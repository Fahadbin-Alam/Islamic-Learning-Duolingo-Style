from __future__ import annotations

import re
from typing import Any, Dict, Iterable, List

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from backend.app.models import Branch, Lesson, LessonResource, Question, Topic


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return re.sub(r"-{2,}", "-", value).strip("-")


def build_lesson_spec(
    *,
    title: str,
    description: str,
    difficulty: int,
    lesson_type: str,
    premium: bool,
    estimated_minutes: int,
    mastery_test_eligible: bool,
) -> Dict[str, Any]:
    return {
        "title": title,
        "description": description,
        "difficulty": difficulty,
        "lesson_type": lesson_type,
        "premium": premium,
        "estimated_minutes": estimated_minutes,
        "mastery_test_eligible": mastery_test_eligible,
        "xp_reward": 10 + difficulty * 4,
        "questions": build_question_specs(title, description, difficulty, lesson_type),
    }


def build_question_specs(title: str, description: str, difficulty: int, lesson_type: str) -> List[Dict[str, Any]]:
    primary_question_type = (
        "multiple_choice" if difficulty <= 2 else
        "scenario_judgment" if lesson_type in {"scenario", "challenge", "mastery"} else
        "identify_mistake" if lesson_type == "mistake_detection" else
        "true_false"
    )
    questions = [
        {
            "type": primary_question_type,
            "prompt": f"What is the main focus of '{title}'?",
            "options_json": [
                {"id": "a", "text": description},
                {"id": "b", "text": "A random topic outside this branch"},
                {"id": "c", "text": "Only decoration with no learning goal"},
                {"id": "d", "text": "A topic from a different directory"},
            ],
            "correct_answer_json": {"choiceId": "a"},
            "explanation_short": f"'{title}' centers on {description.lower()}",
            "explanation_long": "This lesson sits inside a longer branch progression, so the question reinforces what the learner is meant to understand before moving on.",
            "tags_json": [slugify(title), f"difficulty_{difficulty}", lesson_type],
        }
    ]
    if difficulty >= 4:
        questions.append(
            {
                "type": "best_response",
                "prompt": f"A learner is struggling with '{title}'. What should happen next?",
                "options_json": [
                    {"id": "a", "text": "Give a clearer explanation, review suggestion, and one more guided try."},
                    {"id": "b", "text": "Skip teaching and move on immediately."},
                    {"id": "c", "text": "Remove all review support."},
                    {"id": "d", "text": "Turn the lesson into random guessing."},
                ],
                "correct_answer_json": {"choiceId": "a"},
                "explanation_short": "The product is designed to teach after each answer, especially after mistakes.",
                "explanation_long": "Long-term retention grows when the learner gets explanation, review suggestions, and reinforcement instead of just being marked wrong.",
                "tags_json": [slugify(title), "pedagogy", "reinforcement"],
            }
        )
    return questions


def build_branch(title: str, description: str, lesson_titles: List[str]) -> Dict[str, Any]:
    lessons = []
    for index, lesson_title in enumerate(lesson_titles, start=1):
        difficulty = min(5, 1 + (index - 1) // 2)
        lesson_type = "mastery" if "mastery" in lesson_title.lower() else "review" if "review" in lesson_title.lower() else "guided"
        lessons.append(
            build_lesson_spec(
                title=lesson_title,
                description=f"{title}: {lesson_title.lower()}.",
                difficulty=difficulty,
                lesson_type=lesson_type,
                premium=difficulty >= 4 and index == len(lesson_titles),
                estimated_minutes=4,
                mastery_test_eligible="mastery" in lesson_title.lower()
            )
        )
    return {
        "title": title,
        "description": description,
        "difficulty_start": 1,
        "difficulty_end": 5,
        "resources": [],
        "lessons": lessons
    }


def generate_prayer_branch_lessons(titles: Iterable[str]) -> List[Dict[str, Any]]:
    lessons = []
    titles = list(titles)
    for index, title in enumerate(titles, start=1):
        difficulty = min(5, 1 + (index - 1) // 4)
        lowered = title.lower()
        if "mastery" in lowered:
            lesson_type = "mastery"
        elif "review" in lowered:
            lesson_type = "review"
        elif "mistake" in lowered:
            lesson_type = "mistake_detection"
        elif "scenario" in lowered or "case" in lowered:
            lesson_type = "scenario"
        else:
            lesson_type = "guided"
        lessons.append(
            build_lesson_spec(
                title=title,
                description=f"{title} with step-by-step structure, teaching, and correction.",
                difficulty=difficulty,
                lesson_type=lesson_type,
                premium=difficulty >= 4 and index >= len(titles) - 1,
                estimated_minutes=4,
                mastery_test_eligible=lesson_type == "mastery"
            )
        )
    return lessons


def generate_sahabi_lessons(name: str) -> List[Dict[str, Any]]:
    phases = [
        ("Early life", 1, "recognition"),
        ("Family and lineage", 1, "recognition"),
        ("Before Islam", 1, "guided"),
        ("First encounters with revelation", 1, "guided"),
        ("Accepting Islam", 1, "guided"),
        ("Support in Makkah", 2, "understanding"),
        ("Sacrifices for Islam", 2, "understanding"),
        ("Migration and hijrah role", 2, "sequence"),
        ("Service beside the Prophet", 2, "sequence"),
        ("Major moments of bravery", 3, "application"),
        ("Softness, mercy, and character", 3, "application"),
        ("Leadership and responsibility", 3, "application"),
        ("Worship and private devotion", 3, "reflection"),
        ("Trust in Allah", 3, "reflection"),
        ("Decisions after the Prophet", 4, "scenario"),
        ("Difficult choices and wisdom", 4, "scenario"),
        ("How scholars describe this companion", 4, "comparison"),
        ("Lessons for daily life", 4, "best_response"),
        ("Common misconceptions", 4, "mistake_detection"),
        ("Timeline review", 4, "review"),
        ("Virtues review", 4, "review"),
        ("Challenge set 1", 5, "challenge"),
        ("Challenge set 2", 5, "challenge"),
        ("Mastery checkpoint", 5, "mastery"),
    ]
    lessons: List[Dict[str, Any]] = []
    for index in range(1, 3):
        for title, difficulty, lesson_type in phases:
            premium = difficulty >= 4 and index == 2
            display_title = title if index == 1 else f"{title} deeper study"
            lessons.append(
                build_lesson_spec(
                    title=display_title,
                    description=f"Structured study of {name}: {display_title.lower()}.",
                    difficulty=difficulty,
                    lesson_type=lesson_type,
                    premium=premium,
                    estimated_minutes=4 if difficulty < 4 else 5,
                    mastery_test_eligible=lesson_type in {"challenge", "mastery"},
                )
            )
    return lessons


def sahabi_branches() -> List[Dict[str, Any]]:
    names = [
        "Abu Bakr",
        "Umar ibn al-Khattab",
        "Uthman ibn Affan",
        "Ali ibn Abi Talib",
        "Khalid ibn al-Walid",
        "Bilal ibn Rabah",
        "Abu Ubaydah ibn al-Jarrah",
        "Talhah ibn Ubaydillah",
        "Az-Zubayr ibn al-Awwam",
        "Sa'd ibn Abi Waqqas",
        "Salman al-Farisi",
        "Abu Dharr al-Ghifari",
        "Abdullah ibn Mas'ud",
        "Anas ibn Malik"
    ]
    return [
        {
            "title": name,
            "description": f"A deep branch following the life, service, virtues, leadership, and lessons from {name}.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": [
                {
                    "title": f"{name} overview",
                    "url": "https://sunnah.com/",
                    "source_type": "reference",
                    "speaker": None,
                    "notes": "Starter Sunnah-backed reference lane for later expansion.",
                }
            ],
            "lessons": generate_sahabi_lessons(name)
        }
        for name in names
    ]


def generate_quran_surah_lessons(surah: str) -> List[Dict[str, Any]]:
    titles = [
        "Surah opening and identity",
        "Recitation recognition",
        "Ayah meaning basics",
        "Key themes",
        "Vocabulary lane",
        "Tafsir starter notes",
        "Daily life reflections",
        "Context and flow",
        "Mistake correction",
        "Memorization support",
        "Mixed review",
        "Mastery checkpoint"
    ]
    lessons: List[Dict[str, Any]] = []
    for index, title in enumerate(titles, start=1):
        difficulty = min(5, 1 + (index - 1) // 2)
        lessons.append(
            build_lesson_spec(
                title=title,
                description=f"{surah}: {title.lower()}.",
                difficulty=difficulty,
                lesson_type="tafsir" if "Tafsir" in title else "guided",
                premium=difficulty >= 4 and index >= 9,
                estimated_minutes=4,
                mastery_test_eligible="checkpoint" in title.lower()
            )
        )
    return lessons


def quran_branches() -> List[Dict[str, Any]]:
    surahs = [
        "Al-Fatihah",
        "Al-Baqarah",
        "Ali Imran",
        "An-Nisa",
        "Al-Ma'idah",
        "Al-An'am",
        "Yusuf",
        "Maryam",
        "Ya-Sin",
        "Al-Mulk"
    ]
    branches = []
    for surah in surahs:
        branches.append(
            {
                "title": surah,
                "description": f"Surah-based track for {surah}: themes, ayah groups, tafsir basics, reflection, and mastery.",
                "difficulty_start": 1,
                "difficulty_end": 5,
                "resources": [
                    {
                        "title": f"{surah} on Quran.com",
                        "url": f"https://quran.com/search?page=1&q={surah.replace(' ', '%20')}",
                        "source_type": "quran",
                        "speaker": None,
                        "notes": "Starter surah entry for future ayah-level expansion."
                    }
                ],
                "lessons": generate_quran_surah_lessons(surah)
            }
        )
    return branches


def generic_topic_branches() -> Dict[str, List[Dict[str, Any]]]:
    return {
        "foundation": [
            build_branch("Shahadah", "Belief, meaning, and living by the testimony.", ["Meaning of shahadah", "Words of shahadah", "What it changes", "Review and mastery"]),
            build_branch("Daily phrases", "Salam, alhamdulillah, bismillah, and daily remembrance.", ["As-salamu alaykum", "Alhamdulillah", "Bismillah", "Reply with excellence", "Review and mastery"]),
            build_branch("Basic Quran literacy", "Recognition, adab, and the earliest literacy lane.", ["Arabic letters", "Short surah recognition", "Reading etiquette", "Review and mastery"]),
            build_branch("Prophets and core seerah", "Early overview of major prophets and the Prophet's mission.", ["Prophets overview", "Why seerah matters", "Timeline basics", "Review and mastery"]),
        ],
        "manners": [
            build_branch("Speech and truth", "Truthfulness, guarding the tongue, and social response.", ["Truthfulness", "Avoiding lying", "Speaking with wisdom", "Best response situations", "Mastery checkpoint"]),
            build_branch("Parents and family", "Rights, gentleness, service, and family adab.", ["Rights of parents", "Serving with humility", "Mercy in the home", "Case studies", "Mastery checkpoint"]),
            build_branch("Mercy in daily life", "Respect, kindness, patience, and everyday adab.", ["Mercy", "Patience", "Respect", "Mistake correction", "Mastery checkpoint"]),
        ],
        "prophets": [
            build_branch("From Adam to Nuh", "Creation, repentance, patience, and steadfast warning.", ["Adam", "Repentance", "Nuh", "Review", "Mastery"]),
            build_branch("Ibrahim to Musa", "Tawakkul, obedience, sacrifice, and rescue.", ["Ibrahim", "Ismail", "Yusuf", "Musa", "Review", "Mastery"]),
            build_branch("Isa to Muhammad", "Mercy, signs, final prophecy, and mission.", ["Isa", "Maryam", "Muhammad", "Seerah overview", "Review", "Mastery"]),
        ],
        "women-of-the-book": [
            build_branch("Women in the Quran", "Ordered study of women honored in revelation.", ["Hawwa", "Mother of Musa", "Asiyah", "Maryam", "Review", "Mastery"]),
            build_branch("Mothers of the Believers", "Khadijah, Aishah, Hafsah, and the household of the Prophet.", ["Khadijah", "Aishah", "Hafsah", "Review", "Mastery"]),
        ],
        "marriage": [
            build_branch("Purpose and choosing well", "Goals, deen, character, and wise selection.", ["Why marriage matters", "Choose for deen", "Compatibility", "Review", "Mastery"]),
            build_branch("Mercy inside the home", "Kindness, rights, reconciliation, and calm homes.", ["Mercy", "Rights and duties", "Conflict repair", "Review", "Mastery"]),
        ],
        "fasting": [
            build_branch("Foundations of fasting", "Meaning, intention, pillars, and beginner practice.", ["What fasting is", "Intention", "What breaks the fast", "Review", "Mastery"]),
            build_branch("Ramadan growth", "Adab, du'a, Qur'an, and protecting the fast.", ["Ramadan adab", "Qur'an in Ramadan", "Night prayer", "Review", "Mastery"]),
        ],
        "zakat": [
            build_branch("Zakat basics", "Meaning, conditions, nisab, and eligible recipients.", ["What zakat is", "Who pays", "Who receives", "Review", "Mastery"]),
            build_branch("Giving with wisdom", "Intentions, categories, distribution, and mistakes.", ["Intention", "Eligible recipients", "Giving mistakes", "Review", "Mastery"]),
        ],
        "hajj": [
            build_branch("Hajj foundations", "What hajj is, pillars, steps, and purpose.", ["What hajj is", "Ihram", "Main rites", "Review", "Mastery"]),
            build_branch("Journey and adab", "Patience, remembrance, and practical scenes.", ["Travel adab", "Crowds and patience", "Reflection", "Review", "Mastery"]),
        ],
        "aqidah": [
            build_branch("Six pillars of iman", "Belief in Allah, angels, books, messengers, last day, and decree.", ["Allah", "Angels", "Books", "Messengers", "Last Day", "Decree", "Review", "Mastery"]),
            build_branch("Belief and daily life", "Statements, misconceptions, and application.", ["Belief statements", "Correcting errors", "Scenarios", "Review", "Mastery"]),
        ]
    }


def prayer_branches() -> List[Dict[str, Any]]:
    videos = [
        {
            "title": "How to pray step by step",
            "url": "https://youtu.be/vx1rz-28HNk?si=zXJCptHWOBVFk7VB",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Prayer walkthrough used as source guidance for sequence and common mistakes."
        },
        {
            "title": "Salah tutorial detail",
            "url": "https://youtu.be/2ZEmsdEOpbk",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used as guidance for prayer detail and correction."
        },
        {
            "title": "Prayer mistakes and correction",
            "url": "https://youtu.be/di0u-K09Su4",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used as guidance for mistake detection and review."
        }
    ]
    wudu_videos = [
        {
            "title": "Wudu guide",
            "url": "https://youtu.be/6kt_POiIVZE?si=6KbLFWt1QZgJvDpt",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used for ordering, mistakes, and how-to guidance."
        },
        {
            "title": "Wudu detail",
            "url": "https://youtu.be/P29LMOHhpjE?si=x1H_8H_kQgI2dCFP",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used for practical detail and reinforcement."
        },
        {
            "title": "Wudu mistakes",
            "url": "https://youtu.be/iaj1wlQHRFA?si=2_nOF0QOGt4k5Nhv",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used for practical correction and mastery."
        }
    ]
    return [
        {
            "title": "Wudu",
            "description": "A full deep branch for taharah, preparation, order, nullifiers, etiquette, and mastery.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": wudu_videos + [
                {"title": "Description of wudu", "url": "https://sunnah.com/abudawud:145", "source_type": "hadith", "speaker": None, "notes": "Starter Sunnah reference."}
            ],
            "lessons": generate_prayer_branch_lessons(["What wudu is", "Why wudu matters", "Conditions before wudu", "Intention basics", "Wash hands first", "Rinse the mouth", "Rinse the nose", "Wash the face", "Wash the arms", "Wipe the head", "Wipe the ears", "Wash the feet", "The full order of wudu", "Fard acts of wudu", "Sunnah acts of wudu", "What breaks wudu", "What does not break wudu", "Bathroom etiquette", "Common mistakes", "Practical how-to guide", "Reinforcement review", "Scenario questions", "Mistake detection", "Mastery check"])
        },
        {
            "title": "Salah basics",
            "description": "Importance, names, order, preparation, and early prayer understanding.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Why salah matters", "The five daily prayers", "Prayer names and order", "Prayer times basics", "Conditions before prayer", "Facing the qiblah", "Awrah basics", "Starting salah", "What makes salah valid", "Foundational review", "Beginner challenge", "Mastery checkpoint"])
        },
        {
            "title": "Prayer times",
            "description": "Recognizing the daily prayer windows and how timing affects worship.",
            "difficulty_start": 1,
            "difficulty_end": 4,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Fajr time", "Dhuhr time", "Asr time", "Maghrib time", "Isha time", "General timing rules", "When a prayer is missed", "Timing review", "Timing scenarios", "Mastery checkpoint"])
        },
        {
            "title": "Adhan and iqamah",
            "description": "The call to prayer, its place, and how to respond.",
            "difficulty_start": 1,
            "difficulty_end": 4,
            "resources": [{"title": "Adhan basics", "url": "https://sunnah.com/bukhari:611", "source_type": "hadith", "speaker": None, "notes": "Starter adhan reference."}],
            "lessons": generate_prayer_branch_lessons(["Why the adhan matters", "Words of the adhan", "Responding to the adhan", "Iqamah basics", "Adhan mistakes", "Review and scenarios", "Mastery checkpoint"])
        },
        {
            "title": "Ruku and sujud",
            "description": "Detailed body positions, wording, calmness, and common corrections.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Going into ruku", "The back and hands in ruku", "Words in ruku", "Rising from ruku", "Going into sujud", "What touches the ground in sujud", "Words in sujud", "Sitting between sajdahs", "Common ruku mistakes", "Common sujud mistakes", "Review and correction", "Mastery checkpoint"])
        },
        {
            "title": "Tashahhud",
            "description": "The sitting positions, recitations, and completion moments of prayer.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["When tashahhud happens", "First tashahhud", "Final tashahhud", "Sitting positions", "Sending salah on the Prophet", "Taslim", "Mistakes and corrections", "Mastery checkpoint"])
        },
        {
            "title": "Khushu",
            "description": "Presence, focus, adab, and how to protect the prayer from distraction.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": [{"title": "Khushu reflection", "url": "https://quran.com/23/1-2", "source_type": "quran", "speaker": None, "notes": "Believers succeed with humility in prayer."}],
            "lessons": generate_prayer_branch_lessons(["What khushu means", "Preparing the heart", "Removing distractions", "Body calmness and khushu", "Khushu in recitation", "Review and scenarios", "Mastery checkpoint"])
        },
        {
            "title": "Invalidators of salah",
            "description": "What breaks prayer, what weakens it, and how to correct mistakes.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Major invalidators", "Speech and laughter", "Movement and distraction", "Losing wudu during salah", "When to restart prayer", "Scenarios and review", "Mastery checkpoint"])
        },
        {
            "title": "Congregational prayer",
            "description": "Prayer with the imam, catching raka'at, rows, and etiquette.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": [{"title": "Congregation basics", "url": "https://sunnah.com/bukhari:722", "source_type": "hadith", "speaker": None, "notes": "Starter congregation reference."}],
            "lessons": generate_prayer_branch_lessons(["Why congregation matters", "Following the imam", "Straightening rows", "Catching a rak'ah", "Latecomer situations", "Review and mastery"])
        },
        {
            "title": "Missed prayers",
            "description": "Making up missed salah, urgency, repentance, and practical judgment.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": [{"title": "Missed prayer reminder", "url": "https://sunnah.com/muslim:684a", "source_type": "hadith", "speaker": None, "notes": "Starter missed-prayer reference."}],
            "lessons": generate_prayer_branch_lessons(["If you slept through prayer", "If you forgot prayer", "Making it up quickly", "Repentance and seriousness", "Case studies", "Mastery checkpoint"])
        },
        {
            "title": "Review and mastery",
            "description": "Long mixed review for test-out, mastery checks, and spaced repetition.",
            "difficulty_start": 3,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Mixed review 1", "Mixed review 2", "Mixed review 3", "Scenario challenge 1", "Scenario challenge 2", "Final mastery test"])
        }
    ]


def topic_seed() -> List[Dict[str, Any]]:
    generic = generic_topic_branches()
    return [
        {"title": "Foundation", "slug": "foundation", "description": "Placement-friendly basics for belief, worship, Quran recognition, and everyday Muslim language.", "icon": "sparkle_badge", "color_theme": "emerald", "branches": generic["foundation"]},
        {"title": "Prayer", "slug": "prayer", "description": "Deep scalable prayer learning, including a full Wudu branch and Sunnah-based salah detail.", "icon": "home_heart", "color_theme": "teal", "branches": prayer_branches()},
        {"title": "Quran", "slug": "quran", "description": "Surah-based Quran learning with room to scale by ayah, theme, tafsir, and review.", "icon": "book_open", "color_theme": "gold", "branches": quran_branches()},
        {"title": "Sahabi", "slug": "sahabi", "description": "Companion branches with deep lesson ladders, review, challenge, and mastery.", "icon": "shield_sword", "color_theme": "blue", "branches": sahabi_branches()},
        {"title": "Manners", "slug": "manners", "description": "Daily Islamic adab for speech, family, mercy, and social situations.", "icon": "brain", "color_theme": "rose", "branches": generic["manners"]},
        {"title": "Prophets", "slug": "prophets", "description": "A long-term path through the lives of the prophets from Adam to Muhammad.", "icon": "sparkle_badge", "color_theme": "violet", "branches": generic["prophets"]},
        {"title": "Women of the Book", "slug": "women-of-the-book", "description": "Women in the Quran and the mothers of the believers in ordered study lanes.", "icon": "book_marked", "color_theme": "pink", "branches": generic["women-of-the-book"]},
        {"title": "Marriage", "slug": "marriage", "description": "Purpose, mercy, rights, and practical wisdom for a calm Muslim home.", "icon": "home_heart", "color_theme": "coral", "branches": generic["marriage"]},
        {"title": "Fasting", "slug": "fasting", "description": "Fasting foundations, Ramadan growth, and practical protection of the fast.", "icon": "sparkle_badge", "color_theme": "orange", "branches": generic["fasting"]},
        {"title": "Zakat", "slug": "zakat", "description": "Giving, eligibility, wisdom, and distribution of zakat.", "icon": "book_seal", "color_theme": "green", "branches": generic["zakat"]},
        {"title": "Hajj", "slug": "hajj", "description": "The journey, rites, and adab of hajj with room for mastery and scenarios.", "icon": "book_stack", "color_theme": "sand", "branches": generic["hajj"]},
        {"title": "Aqidah", "slug": "aqidah", "description": "The six pillars of iman and belief application in real understanding.", "icon": "book_closed", "color_theme": "indigo", "branches": generic["aqidah"]},
    ]


def seed_catalog(session: Session) -> Dict[str, int]:
    totals = {"topics": 0, "branches": 0, "lessons": 0, "questions": 0, "resources": 0}
    for topic_index, topic_def in enumerate(topic_seed(), start=1):
        topic = session.scalar(select(Topic).where(Topic.slug == topic_def["slug"]))
        if not topic:
            topic = Topic(
                slug=topic_def["slug"],
                title=topic_def["title"],
                description=topic_def["description"],
                icon=topic_def["icon"],
                color_theme=topic_def["color_theme"],
                order_index=topic_index,
            )
            session.add(topic)
            session.flush()
            totals["topics"] += 1
        topic.title = topic_def["title"]
        topic.description = topic_def["description"]
        topic.icon = topic_def["icon"]
        topic.color_theme = topic_def["color_theme"]
        topic.order_index = topic_index
        session.flush()

        for branch_index, branch_def in enumerate(topic_def["branches"], start=1):
            branch_slug = slugify(branch_def["title"])
            branch = session.scalar(select(Branch).where(Branch.topic_id == topic.id, Branch.slug == branch_slug))
            if not branch:
                branch = Branch(
                    topic_id=topic.id,
                    slug=branch_slug,
                    title=branch_def["title"],
                    description=branch_def["description"],
                    order_index=branch_index,
                    difficulty_start=branch_def["difficulty_start"],
                    difficulty_end=branch_def["difficulty_end"],
                    source_references_json=branch_def.get("resources", []),
                )
                session.add(branch)
                session.flush()
                totals["branches"] += 1
            branch.title = branch_def["title"]
            branch.description = branch_def["description"]
            branch.order_index = branch_index
            branch.difficulty_start = branch_def["difficulty_start"]
            branch.difficulty_end = branch_def["difficulty_end"]
            branch.source_references_json = branch_def.get("resources", [])
            session.flush()

            for lesson_index, lesson_def in enumerate(branch_def["lessons"], start=1):
                lesson_slug = f"{branch.slug}-{lesson_index:03d}-{slugify(lesson_def['title'])}"
                lesson = session.scalar(select(Lesson).where(Lesson.branch_id == branch.id, Lesson.slug == lesson_slug))
                if not lesson:
                    lesson = Lesson(
                        branch_id=branch.id,
                        slug=lesson_slug,
                        title=lesson_def["title"],
                        description=lesson_def["description"],
                        order_index=lesson_index,
                        difficulty=lesson_def["difficulty"],
                        is_premium=lesson_def["premium"],
                        xp_reward=lesson_def["xp_reward"],
                        lesson_type=lesson_def["lesson_type"],
                        content_body=lesson_def["description"],
                        unlock_rule=None if lesson_index == 1 else "complete_previous",
                        estimated_minutes=lesson_def["estimated_minutes"],
                        mastery_test_eligible=lesson_def["mastery_test_eligible"],
                    )
                    session.add(lesson)
                    session.flush()
                    totals["lessons"] += 1
                lesson.title = lesson_def["title"]
                lesson.description = lesson_def["description"]
                lesson.order_index = lesson_index
                lesson.difficulty = lesson_def["difficulty"]
                lesson.is_premium = lesson_def["premium"]
                lesson.xp_reward = lesson_def["xp_reward"]
                lesson.lesson_type = lesson_def["lesson_type"]
                lesson.content_body = lesson_def["description"]
                lesson.unlock_rule = None if lesson_index == 1 else "complete_previous"
                lesson.estimated_minutes = lesson_def["estimated_minutes"]
                lesson.mastery_test_eligible = lesson_def["mastery_test_eligible"]
                session.flush()

                existing_question_count = session.scalar(select(func.count(Question.id)).where(Question.lesson_id == lesson.id)) or 0
                if existing_question_count == 0:
                    for question_index, question_def in enumerate(lesson_def["questions"], start=1):
                        session.add(Question(lesson_id=lesson.id, type=question_def["type"], prompt=question_def["prompt"], options_json=question_def["options_json"], correct_answer_json=question_def["correct_answer_json"], explanation_short=question_def["explanation_short"], explanation_long=question_def["explanation_long"], tags_json=question_def["tags_json"], difficulty=lesson_def["difficulty"], order_index=question_index))
                        totals["questions"] += 1

                existing_resource_count = session.scalar(select(func.count(LessonResource.id)).where(LessonResource.lesson_id == lesson.id)) or 0
                if existing_resource_count == 0 and lesson_index in {1, len(branch_def["lessons"])}:
                    for resource_def in branch_def.get("resources", []):
                        session.add(LessonResource(lesson_id=lesson.id, title=resource_def["title"], url=resource_def["url"], source_type=resource_def["source_type"], speaker=resource_def.get("speaker"), notes=resource_def.get("notes", ""), review_status="seeded", is_sunni_approved=True))
                        totals["resources"] += 1

    session.commit()
    return totals
    wudu_videos = [
        {
            "title": "Wudu guide",
            "url": "https://youtu.be/6kt_POiIVZE?si=6KbLFWt1QZgJvDpt",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used for ordering, mistakes, and how-to guidance."
        },
        {
            "title": "Wudu detail",
            "url": "https://youtu.be/P29LMOHhpjE?si=x1H_8H_kQgI2dCFP",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used for practical detail and reinforcement."
        },
        {
            "title": "Wudu mistakes",
            "url": "https://youtu.be/iaj1wlQHRFA?si=2_nOF0QOGt4k5Nhv",
            "source_type": "video",
            "speaker": "Shaykh Uthman",
            "notes": "Used for practical correction and mastery."
        }
    ]
    return [
        {
            "title": "Wudu",
            "description": "A full deep branch for taharah, preparation, order, nullifiers, etiquette, and mastery.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": wudu_videos + [
                {"title": "Description of wudu", "url": "https://sunnah.com/abudawud:145", "source_type": "hadith", "speaker": None, "notes": "Starter Sunnah reference."}
            ],
            "lessons": generate_prayer_branch_lessons(
                [
                    "What wudu is",
                    "Why wudu matters",
                    "Conditions before wudu",
                    "Intention basics",
                    "Wash hands first",
                    "Rinse the mouth",
                    "Rinse the nose",
                    "Wash the face",
                    "Wash the arms",
                    "Wipe the head",
                    "Wipe the ears",
                    "Wash the feet",
                    "The full order of wudu",
                    "Fard acts of wudu",
                    "Sunnah acts of wudu",
                    "What breaks wudu",
                    "What does not break wudu",
                    "Bathroom etiquette",
                    "Common mistakes",
                    "Practical how-to guide",
                    "Reinforcement review",
                    "Scenario questions",
                    "Mistake detection",
                    "Mastery check"
                ]
            )
        },
        {
            "title": "Salah basics",
            "description": "Importance, names, order, preparation, and early prayer understanding.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(
                [
                    "Why salah matters",
                    "The five daily prayers",
                    "Prayer names and order",
                    "Prayer times basics",
                    "Conditions before prayer",
                    "Facing the qiblah",
                    "Awrah basics",
                    "Starting salah",
                    "What makes salah valid",
                    "Foundational review",
                    "Beginner challenge",
                    "Mastery checkpoint"
                ]
            )
        },
        {
            "title": "Prayer times",
            "description": "Recognizing the daily prayer windows and how timing affects worship.",
            "difficulty_start": 1,
            "difficulty_end": 4,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(
                [
                    "Fajr time",
                    "Dhuhr time",
                    "Asr time",
                    "Maghrib time",
                    "Isha time",
                    "General timing rules",
                    "When a prayer is missed",
                    "Timing review",
                    "Timing scenarios",
                    "Mastery checkpoint"
                ]
            )
        },
        {
            "title": "Adhan and iqamah",
            "description": "The call to prayer, its place, and how to respond.",
            "difficulty_start": 1,
            "difficulty_end": 4,
            "resources": [{"title": "Adhan basics", "url": "https://sunnah.com/bukhari:611", "source_type": "hadith", "speaker": None, "notes": "Starter adhan reference."}],
            "lessons": generate_prayer_branch_lessons(["Why the adhan matters", "Words of the adhan", "Responding to the adhan", "Iqamah basics", "Adhan mistakes", "Review and scenarios", "Mastery checkpoint"])
        },
        {
            "title": "Ruku and sujud",
            "description": "Detailed body positions, wording, calmness, and common corrections.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Going into ruku", "The back and hands in ruku", "Words in ruku", "Rising from ruku", "Going into sujud", "What touches the ground in sujud", "Words in sujud", "Sitting between sajdahs", "Common ruku mistakes", "Common sujud mistakes", "Review and correction", "Mastery checkpoint"])
        },
        {
            "title": "Tashahhud",
            "description": "The sitting positions, recitations, and completion moments of prayer.",
            "difficulty_start": 1,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["When tashahhud happens", "First tashahhud", "Final tashahhud", "Sitting positions", "Sending salah on the Prophet", "Taslim", "Mistakes and corrections", "Mastery checkpoint"])
        },
        {
            "title": "Khushu",
            "description": "Presence, focus, adab, and how to protect the prayer from distraction.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": [{"title": "Khushu reflection", "url": "https://quran.com/23/1-2", "source_type": "quran", "speaker": None, "notes": "Believers succeed with humility in prayer."}],
            "lessons": generate_prayer_branch_lessons(["What khushu means", "Preparing the heart", "Removing distractions", "Body calmness and khushu", "Khushu in recitation", "Review and scenarios", "Mastery checkpoint"])
        },
        {
            "title": "Invalidators of salah",
            "description": "What breaks prayer, what weakens it, and how to correct mistakes.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Major invalidators", "Speech and laughter", "Movement and distraction", "Losing wudu during salah", "When to restart prayer", "Scenarios and review", "Mastery checkpoint"])
        },
        {
            "title": "Congregational prayer",
            "description": "Prayer with the imam, catching raka'at, rows, and etiquette.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": [{"title": "Congregation basics", "url": "https://sunnah.com/bukhari:722", "source_type": "hadith", "speaker": None, "notes": "Starter congregation reference."}],
            "lessons": generate_prayer_branch_lessons(["Why congregation matters", "Following the imam", "Straightening rows", "Catching a rak'ah", "Latecomer situations", "Review and mastery"])
        },
        {
            "title": "Missed prayers",
            "description": "Making up missed salah, urgency, repentance, and practical judgment.",
            "difficulty_start": 2,
            "difficulty_end": 5,
            "resources": [{"title": "Missed prayer reminder", "url": "https://sunnah.com/muslim:684a", "source_type": "hadith", "speaker": None, "notes": "Starter missed-prayer reference."}],
            "lessons": generate_prayer_branch_lessons(["If you slept through prayer", "If you forgot prayer", "Making it up quickly", "Repentance and seriousness", "Case studies", "Mastery checkpoint"])
        },
        {
            "title": "Review and mastery",
            "description": "Long mixed review for test-out, mastery checks, and spaced repetition.",
            "difficulty_start": 3,
            "difficulty_end": 5,
            "resources": videos,
            "lessons": generate_prayer_branch_lessons(["Mixed review 1", "Mixed review 2", "Mixed review 3", "Scenario challenge 1", "Scenario challenge 2", "Final mastery test"])
        }
    ]
