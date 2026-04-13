from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlalchemy import JSON, Boolean, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.app.db.base import Base


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False
    )


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(String(80), unique=True, index=True, nullable=False)
    display_name: Mapped[str] = mapped_column(String(120), nullable=False)
    password_hash: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    auth_provider: Mapped[str] = mapped_column(String(40), default="password", nullable=False)
    provider_subject: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    account_role: Mapped[Optional[str]] = mapped_column(String(40), nullable=True)
    preferred_language: Mapped[str] = mapped_column(String(16), default="en", nullable=False)
    sound_enabled: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    reduced_sound: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    skipped_foundation: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    premium_status: Mapped[str] = mapped_column(String(40), default="free", nullable=False)
    review_heart_restore_used: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    streak_days: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    total_xp: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    daily_goal_xp: Mapped[int] = mapped_column(Integer, default=40, nullable=False)
    gems: Mapped[int] = mapped_column(Integer, default=120, nullable=False)
    hearts_current: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    hearts_max: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    hearts_unlimited: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    last_heart_refill_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    last_learning_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    reminder_preferences_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    learner_profile_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    completed_lesson_ids_json: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    completed_node_ids_json: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    claimed_reward_ids_json: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    social_hub_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)

    sessions: Mapped[List["AuthSession"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    progress_entries: Mapped[List["UserProgress"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    question_attempts: Mapped[List["QuestionAttempt"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    review_queue_items: Mapped[List["ReviewQueueItem"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    entitlements: Mapped[List["SubscriptionEntitlement"]] = relationship(back_populates="user", cascade="all, delete-orphan")
    event_logs: Mapped[List["EventLog"]] = relationship(back_populates="user", cascade="all, delete-orphan")


class AuthSession(Base):
    __tablename__ = "auth_sessions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    token_hash: Mapped[str] = mapped_column(String(64), unique=True, nullable=False, index=True)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped[User] = relationship(back_populates="sessions")


class Topic(Base, TimestampMixin):
    __tablename__ = "topics"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    icon: Mapped[str] = mapped_column(String(80), default="book", nullable=False)
    color_theme: Mapped[str] = mapped_column(String(80), default="emerald", nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    branches: Mapped[List["Branch"]] = relationship(back_populates="topic", cascade="all, delete-orphan")
    progress_entries: Mapped[List["UserProgress"]] = relationship(back_populates="topic")
    review_queue_items: Mapped[List["ReviewQueueItem"]] = relationship(back_populates="topic")


class Branch(Base, TimestampMixin):
    __tablename__ = "branches"
    __table_args__ = (UniqueConstraint("topic_id", "slug", name="uq_branch_topic_slug"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(160), nullable=False)
    slug: Mapped[str] = mapped_column(String(160), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    difficulty_start: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    difficulty_end: Mapped[int] = mapped_column(Integer, default=5, nullable=False)
    source_references_json: Mapped[list] = mapped_column(JSON, default=list, nullable=False)

    topic: Mapped[Topic] = relationship(back_populates="branches")
    lessons: Mapped[List["Lesson"]] = relationship(back_populates="branch", cascade="all, delete-orphan")
    progress_entries: Mapped[List["UserProgress"]] = relationship(back_populates="branch")
    review_queue_items: Mapped[List["ReviewQueueItem"]] = relationship(back_populates="branch")


class Lesson(Base, TimestampMixin):
    __tablename__ = "lessons"
    __table_args__ = (UniqueConstraint("branch_id", "slug", name="uq_lesson_branch_slug"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    branch_id: Mapped[int] = mapped_column(ForeignKey("branches.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(180), nullable=False)
    slug: Mapped[str] = mapped_column(String(180), nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text, default="", nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    difficulty: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    is_premium: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    xp_reward: Mapped[int] = mapped_column(Integer, default=10, nullable=False)
    lesson_type: Mapped[str] = mapped_column(String(80), default="guided", nullable=False)
    content_body: Mapped[str] = mapped_column(Text, default="", nullable=False)
    unlock_rule: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    estimated_minutes: Mapped[int] = mapped_column(Integer, default=3, nullable=False)
    surah_name: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    ayah_range: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    mastery_test_eligible: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

    branch: Mapped[Branch] = relationship(back_populates="lessons")
    questions: Mapped[List["Question"]] = relationship(back_populates="lesson", cascade="all, delete-orphan")
    resources: Mapped[List["LessonResource"]] = relationship(back_populates="lesson", cascade="all, delete-orphan")
    progress_entries: Mapped[List["UserProgress"]] = relationship(back_populates="lesson")
    question_attempts: Mapped[List["QuestionAttempt"]] = relationship(back_populates="lesson")
    review_queue_items: Mapped[List["ReviewQueueItem"]] = relationship(back_populates="lesson")


class Question(Base, TimestampMixin):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False, index=True)
    type: Mapped[str] = mapped_column(String(80), nullable=False)
    prompt: Mapped[str] = mapped_column(Text, nullable=False)
    options_json: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    correct_answer_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    explanation_short: Mapped[str] = mapped_column(Text, default="", nullable=False)
    explanation_long: Mapped[str] = mapped_column(Text, default="", nullable=False)
    tags_json: Mapped[list] = mapped_column(JSON, default=list, nullable=False)
    difficulty: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    lesson: Mapped[Lesson] = relationship(back_populates="questions")
    attempts: Mapped[List["QuestionAttempt"]] = relationship(back_populates="question")
    review_queue_items: Mapped[List["ReviewQueueItem"]] = relationship(back_populates="question")


class LessonResource(Base, TimestampMixin):
    __tablename__ = "lesson_resources"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False, index=True)
    title: Mapped[str] = mapped_column(String(180), nullable=False)
    url: Mapped[str] = mapped_column(Text, nullable=False)
    source_type: Mapped[str] = mapped_column(String(80), nullable=False)
    speaker: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    notes: Mapped[str] = mapped_column(Text, default="", nullable=False)
    review_status: Mapped[str] = mapped_column(String(80), default="seeded", nullable=False)
    is_sunni_approved: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    lesson: Mapped[Lesson] = relationship(back_populates="resources")


class UserProgress(Base, TimestampMixin):
    __tablename__ = "user_progress"
    __table_args__ = (UniqueConstraint("user_id", "lesson_id", name="uq_user_progress_lesson"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    topic_id: Mapped[Optional[int]] = mapped_column(ForeignKey("topics.id", ondelete="SET NULL"), nullable=True, index=True)
    branch_id: Mapped[Optional[int]] = mapped_column(ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(40), default="not_started", nullable=False)
    mastery_score: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    xp_earned: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    best_score: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    last_seen_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    user: Mapped[User] = relationship(back_populates="progress_entries")
    topic: Mapped[Optional[Topic]] = relationship(back_populates="progress_entries")
    branch: Mapped[Optional[Branch]] = relationship(back_populates="progress_entries")
    lesson: Mapped[Lesson] = relationship(back_populates="progress_entries")


class QuestionAttempt(Base):
    __tablename__ = "question_attempts"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    question_id: Mapped[int] = mapped_column(ForeignKey("questions.id", ondelete="CASCADE"), nullable=False, index=True)
    lesson_id: Mapped[int] = mapped_column(ForeignKey("lessons.id", ondelete="CASCADE"), nullable=False, index=True)
    selected_answer_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    is_correct: Mapped[bool] = mapped_column(Boolean, nullable=False)
    response_time_ms: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    confidence_rating: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped[User] = relationship(back_populates="question_attempts")
    question: Mapped[Question] = relationship(back_populates="attempts")
    lesson: Mapped[Lesson] = relationship(back_populates="question_attempts")


class ReviewQueueItem(Base, TimestampMixin):
    __tablename__ = "review_queue"
    __table_args__ = (UniqueConstraint("user_id", "question_id", name="uq_review_queue_question"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    topic_id: Mapped[Optional[int]] = mapped_column(ForeignKey("topics.id", ondelete="SET NULL"), nullable=True, index=True)
    branch_id: Mapped[Optional[int]] = mapped_column(ForeignKey("branches.id", ondelete="SET NULL"), nullable=True, index=True)
    lesson_id: Mapped[Optional[int]] = mapped_column(ForeignKey("lessons.id", ondelete="SET NULL"), nullable=True, index=True)
    question_id: Mapped[int] = mapped_column(ForeignKey("questions.id", ondelete="CASCADE"), nullable=False, index=True)
    priority: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    failure_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    next_review_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    last_reviewed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    user: Mapped[User] = relationship(back_populates="review_queue_items")
    topic: Mapped[Optional[Topic]] = relationship(back_populates="review_queue_items")
    branch: Mapped[Optional[Branch]] = relationship(back_populates="review_queue_items")
    lesson: Mapped[Optional[Lesson]] = relationship(back_populates="review_queue_items")
    question: Mapped[Question] = relationship(back_populates="review_queue_items")


class SubscriptionEntitlement(Base, TimestampMixin):
    __tablename__ = "subscription_entitlements"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    provider: Mapped[str] = mapped_column(String(80), nullable=False)
    provider_customer_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    plan_type: Mapped[str] = mapped_column(String(80), nullable=False)
    status: Mapped[str] = mapped_column(String(40), nullable=False)
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    expires_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    entitlement_name: Mapped[str] = mapped_column(String(120), nullable=False)

    user: Mapped[User] = relationship(back_populates="entitlements")


class EventLog(Base):
    __tablename__ = "event_logs"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    event_type: Mapped[str] = mapped_column(String(120), nullable=False, index=True)
    payload_json: Mapped[dict] = mapped_column(JSON, default=dict, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    user: Mapped[Optional[User]] = relationship(back_populates="event_logs")
