from __future__ import annotations

from datetime import datetime
from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AuthRegisterInput(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    role: Optional[Literal["child", "parent"]] = None
    reminder_preferences: Dict[str, Any] = Field(default_factory=dict, alias="reminderPreferences")
    user: Dict[str, Any]
    social_hub: Dict[str, Any] = Field(default_factory=dict, alias="socialHub")


class AuthLoginInput(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class SocialLoginInput(BaseModel):
    provider: Literal["google", "facebook"]
    access_token: Optional[str] = Field(default=None, alias="accessToken")
    id_token: Optional[str] = Field(default=None, alias="idToken")
    role: Optional[Literal["child", "parent"]] = None
    reminder_preferences: Dict[str, Any] = Field(default_factory=dict, alias="reminderPreferences")
    user: Dict[str, Any]
    social_hub: Dict[str, Any] = Field(default_factory=dict, alias="socialHub")


class RemoteAccountRead(BaseModel):
    name: str
    email: str
    provider: str
    role: Optional[str] = None
    created_at: datetime = Field(alias="createdAt")
    reminder_preferences: Dict[str, Any] = Field(default_factory=dict, alias="reminderPreferences")

    model_config = ConfigDict(populate_by_name=True)


class SessionPayload(BaseModel):
    token: Optional[str] = None
    account: RemoteAccountRead
    user: Dict[str, Any]
    social_hub: Dict[str, Any] = Field(default_factory=dict, alias="socialHub")

    model_config = ConfigDict(populate_by_name=True)


class ProfileUpdateInput(BaseModel):
    user: Dict[str, Any]


class SocialUpdateInput(BaseModel):
    social_hub: Dict[str, Any] = Field(default_factory=dict, alias="socialHub")


class TopicRead(BaseModel):
    id: int
    title: str
    slug: str
    description: str
    icon: str
    color_theme: str = Field(alias="colorTheme")
    order_index: int = Field(alias="orderIndex")
    branch_count: int = Field(alias="branchCount")
    lesson_count: int = Field(alias="lessonCount")

    model_config = ConfigDict(populate_by_name=True)


class BranchRead(BaseModel):
    id: int
    topic_id: int = Field(alias="topicId")
    title: str
    slug: str
    description: str
    order_index: int = Field(alias="orderIndex")
    difficulty_start: int = Field(alias="difficultyStart")
    difficulty_end: int = Field(alias="difficultyEnd")
    lesson_count: int = Field(alias="lessonCount")
    source_references: List[Dict[str, Any]] = Field(default_factory=list, alias="sourceReferences")

    model_config = ConfigDict(populate_by_name=True)


class LessonSummaryRead(BaseModel):
    id: int
    branch_id: int = Field(alias="branchId")
    title: str
    slug: str
    description: str
    order_index: int = Field(alias="orderIndex")
    difficulty: int
    is_premium: bool = Field(alias="isPremium")
    xp_reward: int = Field(alias="xpReward")
    lesson_type: str = Field(alias="lessonType")
    estimated_minutes: int = Field(alias="estimatedMinutes")
    mastery_test_eligible: bool = Field(alias="masteryTestEligible")
    surah_name: Optional[str] = Field(default=None, alias="surahName")
    ayah_range: Optional[str] = Field(default=None, alias="ayahRange")

    model_config = ConfigDict(populate_by_name=True)


class QuestionRead(BaseModel):
    id: int
    lesson_id: int = Field(alias="lessonId")
    type: str
    prompt: str
    options_json: List[Dict[str, Any]] = Field(default_factory=list, alias="optionsJson")
    correct_answer_json: Dict[str, Any] = Field(default_factory=dict, alias="correctAnswerJson")
    explanation_short: str = Field(alias="explanationShort")
    explanation_long: str = Field(alias="explanationLong")
    tags_json: List[str] = Field(default_factory=list, alias="tagsJson")
    difficulty: int
    order_index: int = Field(alias="orderIndex")

    model_config = ConfigDict(populate_by_name=True)


class ResourceRead(BaseModel):
    id: int
    lesson_id: int = Field(alias="lessonId")
    title: str
    url: str
    source_type: str = Field(alias="sourceType")
    speaker: Optional[str] = None
    notes: str
    review_status: str = Field(alias="reviewStatus")
    is_sunni_approved: bool = Field(alias="isSunniApproved")

    model_config = ConfigDict(populate_by_name=True)


class LessonDetailRead(BaseModel):
    id: int
    branch_id: int = Field(alias="branchId")
    title: str
    slug: str
    description: str
    content_body: str = Field(alias="contentBody")
    order_index: int = Field(alias="orderIndex")
    difficulty: int
    is_premium: bool = Field(alias="isPremium")
    xp_reward: int = Field(alias="xpReward")
    lesson_type: str = Field(alias="lessonType")
    unlock_rule: Optional[str] = Field(default=None, alias="unlockRule")
    estimated_minutes: int = Field(alias="estimatedMinutes")
    mastery_test_eligible: bool = Field(alias="masteryTestEligible")
    surah_name: Optional[str] = Field(default=None, alias="surahName")
    ayah_range: Optional[str] = Field(default=None, alias="ayahRange")
    questions: List[QuestionRead]
    resources: List[ResourceRead]

    model_config = ConfigDict(populate_by_name=True)


class LessonCompletionInput(BaseModel):
    status: str = "completed"
    mastery_score: int = Field(default=100, alias="masteryScore")
    xp_earned: int = Field(default=0, alias="xpEarned")
    best_score: int = Field(default=100, alias="bestScore")

    model_config = ConfigDict(populate_by_name=True)


class QuestionAttemptInput(BaseModel):
    lesson_id: int = Field(alias="lessonId")
    selected_answer_json: Dict[str, Any] = Field(default_factory=dict, alias="selectedAnswerJson")
    is_correct: bool = Field(alias="isCorrect")
    response_time_ms: Optional[int] = Field(default=None, alias="responseTimeMs")
    confidence_rating: Optional[int] = Field(default=None, alias="confidenceRating")
    topic_id: Optional[int] = Field(default=None, alias="topicId")
    branch_id: Optional[int] = Field(default=None, alias="branchId")

    model_config = ConfigDict(populate_by_name=True)


class ReviewQueueRead(BaseModel):
    id: int
    topic_id: Optional[int] = Field(default=None, alias="topicId")
    branch_id: Optional[int] = Field(default=None, alias="branchId")
    lesson_id: Optional[int] = Field(default=None, alias="lessonId")
    question_id: int = Field(alias="questionId")
    priority: int
    failure_count: int = Field(alias="failureCount")
    next_review_at: Optional[datetime] = Field(default=None, alias="nextReviewAt")
    last_reviewed_at: Optional[datetime] = Field(default=None, alias="lastReviewedAt")

    model_config = ConfigDict(populate_by_name=True)


class SubscriptionPlanRead(BaseModel):
    id: str
    title: str
    price: float
    interval: str
    badge: Optional[str] = None
    entitlement_name: str = Field(alias="entitlementName")
    benefits: List[str]

    model_config = ConfigDict(populate_by_name=True)


class EntitlementRead(BaseModel):
    id: int
    provider: str
    provider_customer_id: Optional[str] = Field(default=None, alias="providerCustomerId")
    plan_type: str = Field(alias="planType")
    status: str
    started_at: Optional[datetime] = Field(default=None, alias="startedAt")
    expires_at: Optional[datetime] = Field(default=None, alias="expiresAt")
    entitlement_name: str = Field(alias="entitlementName")

    model_config = ConfigDict(populate_by_name=True)


class SubscriptionSyncInput(BaseModel):
    provider: str
    provider_customer_id: Optional[str] = Field(default=None, alias="providerCustomerId")
    plan_type: str = Field(alias="planType")
    status: str
    started_at: Optional[datetime] = Field(default=None, alias="startedAt")
    expires_at: Optional[datetime] = Field(default=None, alias="expiresAt")
    entitlement_name: str = Field(alias="entitlementName")

    model_config = ConfigDict(populate_by_name=True)


class EventLogInput(BaseModel):
    event_type: str = Field(alias="eventType")
    payload_json: Dict[str, Any] = Field(default_factory=dict, alias="payloadJson")

    model_config = ConfigDict(populate_by_name=True)
