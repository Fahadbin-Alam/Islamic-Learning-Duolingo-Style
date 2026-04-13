from __future__ import annotations

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select

from backend.app.api.deps import DbSession, current_user
from backend.app.models import Branch, Lesson, Question, QuestionAttempt, ReviewQueueItem, Topic, User, UserProgress
from backend.app.schemas import LessonCompletionInput, QuestionAttemptInput, ReviewQueueRead


router = APIRouter(tags=["learning"])


@router.post("/questions/{question_id}/attempts")
def record_question_attempt(question_id: int, payload: QuestionAttemptInput, db: DbSession, user: User = Depends(current_user)):
    question = db.get(Question, question_id)
    if not question:
        raise HTTPException(status_code=404, detail="Question not found.")

    attempt = QuestionAttempt(
        user_id=user.id,
        question_id=question.id,
        lesson_id=payload.lesson_id,
        selected_answer_json=payload.selected_answer_json,
        is_correct=payload.is_correct,
        response_time_ms=payload.response_time_ms,
        confidence_rating=payload.confidence_rating,
    )
    db.add(attempt)

    queue_item = db.scalar(select(ReviewQueueItem).where(ReviewQueueItem.user_id == user.id, ReviewQueueItem.question_id == question.id))
    if payload.is_correct:
        if queue_item:
            queue_item.priority = max(1, queue_item.priority - 1)
            queue_item.last_reviewed_at = datetime.now(timezone.utc)
            queue_item.next_review_at = datetime.now(timezone.utc) + timedelta(days=3)
    else:
        if not queue_item:
            queue_item = ReviewQueueItem(
                user_id=user.id,
                topic_id=payload.topic_id,
                branch_id=payload.branch_id,
                lesson_id=payload.lesson_id,
                question_id=question.id,
                priority=3,
                failure_count=1,
                next_review_at=datetime.now(timezone.utc) + timedelta(days=1),
                last_reviewed_at=datetime.now(timezone.utc),
            )
            db.add(queue_item)
        else:
            queue_item.failure_count += 1
            queue_item.priority = min(10, queue_item.priority + 1)
            queue_item.last_reviewed_at = datetime.now(timezone.utc)
            queue_item.next_review_at = datetime.now(timezone.utc) + timedelta(days=1)

    db.commit()
    return {"ok": True}


@router.post("/lessons/{lesson_slug}/completion")
def complete_lesson(lesson_slug: str, payload: LessonCompletionInput, db: DbSession, user: User = Depends(current_user)):
    lesson = db.scalar(select(Lesson).where(Lesson.slug == lesson_slug))
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found.")

    branch = db.get(Branch, lesson.branch_id)
    topic = db.get(Topic, branch.topic_id) if branch else None
    progress = db.scalar(select(UserProgress).where(UserProgress.user_id == user.id, UserProgress.lesson_id == lesson.id))
    if not progress:
        progress = UserProgress(user_id=user.id, topic_id=topic.id if topic else None, branch_id=branch.id if branch else None, lesson_id=lesson.id)
        db.add(progress)

    progress.status = payload.status
    progress.mastery_score = payload.mastery_score
    progress.xp_earned = max(progress.xp_earned, payload.xp_earned or lesson.xp_reward)
    progress.best_score = max(progress.best_score, payload.best_score)
    progress.last_seen_at = datetime.now(timezone.utc)
    progress.completed_at = datetime.now(timezone.utc) if payload.status == "completed" else progress.completed_at

    completed_lessons = set(user.completed_lesson_ids_json or [])
    completed_lessons.add(lesson.slug)
    user.completed_lesson_ids_json = sorted(completed_lessons)
    user.total_xp += payload.xp_earned or lesson.xp_reward
    user.last_learning_at = datetime.now(timezone.utc)

    db.add(user)
    db.commit()
    return {"ok": True, "progressId": progress.id}


@router.get("/review-queue", response_model=list[ReviewQueueRead])
def get_review_queue(db: DbSession, user: User = Depends(current_user)):
    items = db.scalars(
        select(ReviewQueueItem)
        .where(ReviewQueueItem.user_id == user.id)
        .order_by(ReviewQueueItem.priority.desc(), ReviewQueueItem.next_review_at.asc())
    ).all()
    return [
        ReviewQueueRead(
            id=item.id,
            topicId=item.topic_id,
            branchId=item.branch_id,
            lessonId=item.lesson_id,
            questionId=item.question_id,
            priority=item.priority,
            failureCount=item.failure_count,
            nextReviewAt=item.next_review_at,
            lastReviewedAt=item.last_reviewed_at,
        )
        for item in items
    ]
