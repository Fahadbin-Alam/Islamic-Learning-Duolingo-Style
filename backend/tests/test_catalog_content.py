from __future__ import annotations

from backend.app.catalog_seed import topic_seed

CHOICE_TYPES = {"multiple_choice", "scenario_judgment", "identify_mistake", "best_response"}


def iter_questions():
    for topic in topic_seed():
        for branch in topic["branches"]:
            for lesson in branch["lessons"]:
                for question in lesson["questions"]:
                    yield topic, lesson, question


def test_every_seeded_question_is_well_formed():
    problems = []
    for topic, lesson, question in iter_questions():
        where = f"{topic.get('title')} / {lesson['title']} / {question['prompt']}"
        options = question["options_json"]
        ids = [option["id"] for option in options]
        texts = [option["text"].strip().lower() for option in options]
        if not question["prompt"].strip():
            problems.append(f"empty prompt: {where}")
        if not question["explanation_short"].strip():
            problems.append(f"empty explanation: {where}")
        if question["correct_answer_json"]["choiceId"] not in ids:
            problems.append(f"answer not among options: {where}")
        if len(set(ids)) != len(ids) or len(set(texts)) != len(texts):
            problems.append(f"duplicate options: {where}")
        if any(not text for text in texts):
            problems.append(f"empty option: {where}")
        if question["type"] == "true_false" and len(options) != 2:
            problems.append(f"true/false question without exactly two options: {where}")
        if question["type"] in CHOICE_TYPES and len(options) < 2:
            problems.append(f"choice question with fewer than two options: {where}")
    assert problems == []


def test_catalog_has_questions():
    assert sum(1 for _ in iter_questions()) > 1000
