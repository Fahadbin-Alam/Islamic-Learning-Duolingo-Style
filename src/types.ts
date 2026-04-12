export type TopicId =
  | "foundation"
  | "prayer"
  | "aqidah"
  | "fasting"
  | "zakat"
  | "hajj"
  | "manners"
  | "marriage"
  | "sahabah"
  | "prophets"
  | "women_of_the_book"
  | "quran_tafseer";

export type CharacterVariant = "hijabi" | "muslim_man";

export type ChallengeType = "multiple_choice" | "true_false";

export type LearningNodeStatus = "locked" | "available" | "current" | "completed";

export type ShopItemType = "heart_pack" | "monthly_membership" | "rewarded_ad";

export type SocialRelation = "parent" | "friend";
export type AccountRole = "parent" | "child";
export type AuthProvider = "password" | "google" | "facebook";
export type SupportedLanguage = "en" | "fr" | "ar" | "bn" | "ur" | "hi";

export interface ReminderPreferences {
  dailyInactivity: boolean;
  weeklyInactivity: boolean;
  streakReminders?: boolean;
  islamicReminders?: boolean;
}

export type FoundationCategoryId =
  | "shahadah"
  | "salah"
  | "taharah"
  | "fasting"
  | "zakat"
  | "hajj"
  | "iman"
  | "manners"
  | "quran"
  | "seerah";

export type DifficultyTier = 1 | 2 | 3 | 4 | 5;
export type LearnerBand = "beginner" | "developing" | "intermediate" | "advanced";
export type LearnerReadinessLabel =
  | "New learner"
  | "Basic foundation"
  | "Growing student"
  | "Strong foundation"
  | "Ready for advanced topics";

export type AssessmentQuestionType =
  | "multiple_choice"
  | "multi_select"
  | "true_false"
  | "match_pairs"
  | "correct_order"
  | "fill_in_blank"
  | "scenario_judgment"
  | "identify_mistake"
  | "best_response"
  | "mini_case_study"
  | "confidence_check"
  | "reflection_prompt";

export interface FoundationPair {
  left: string;
  right: string;
}

export interface FoundationQuestion {
  id: string;
  category: FoundationCategoryId;
  subtopic: string;
  difficulty: DifficultyTier;
  type: AssessmentQuestionType;
  prompt: string;
  scenario?: string;
  options?: string[];
  correctAnswer?: string | string[] | Record<string, string>;
  acceptedAnswers?: string[];
  pairs?: FoundationPair[];
  orderItems?: string[];
  explanationShort: string;
  explanationLong: string;
  misconceptionNotes: string[];
  wrongAnswerNotes?: Record<string, string>;
  tags: string[];
  xpReward: number;
  reviewNext: string;
  whyThisMatters: string;
}

export interface LearnerCategoryProfile {
  accuracyPercentage: number;
  currentEstimatedDifficulty: DifficultyTier;
  confidenceScore: number;
  streakConsistency: number;
  questionsAttempted: number;
  questionsAnsweredCorrectly: number;
  weaknessTags: string[];
  recentMistakeQuestionIds: string[];
  averageResponseTimeMs: number;
  readinessLabel: LearnerReadinessLabel;
}

export interface LearnerProfile {
  overall_level: LearnerBand;
  readiness_label: LearnerReadinessLabel;
  assessmentCompleted: boolean;
  category_levels: Record<FoundationCategoryId, LearnerCategoryProfile>;
  weak_areas: FoundationCategoryId[];
  strong_areas: FoundationCategoryId[];
  needs_review_question_ids: string[];
  assessmentHistory: AssessmentAnswerRecord[];
  totalQuestionsAnswered: number;
  dailyChallengeQuestionIds: string[];
  lastAssessmentAt?: string;
  lastDailyChallengeAt?: string;
}

export interface AssessmentAnswerRecord {
  questionId: string;
  category: FoundationCategoryId;
  difficulty: DifficultyTier;
  selectedAnswer?: string | string[] | Record<string, string>;
  isCorrect: boolean;
  confidence: number;
  responseTimeMs: number;
  answeredAt: string;
}

export interface AssessmentFeedback {
  correct: boolean;
  explanationShort: string;
  explanationLong: string;
  whyThisMatters: string;
  misconceptionNotes: string[];
  wrongAnswerReasons: string[];
  reviewNext: string;
  confidenceLabel: string;
  reflectionPrompt: string;
}

export interface FoundationAssessmentState {
  mode: "placement" | "review" | "daily_challenge";
  currentQuestion: FoundationQuestion;
  questionNumber: number;
  totalQuestions: number;
  askedQuestionIds: string[];
  answerHistory: AssessmentAnswerRecord[];
  feedback?: AssessmentFeedback;
  selectedAnswer?: string | string[] | Record<string, string>;
  confidence: number;
  startedAt: string;
  questionStartedAt: number;
}

export interface HeartsBalance {
  current: number;
  max: number;
  unlimited: boolean;
  lastRefillDate: string;
}

export interface UserProfile {
  id: number;
  username: string;
  displayName: string;
  avatarInitials: string;
  hasAccount?: boolean;
  accountRole?: AccountRole;
  accountProvider?: AuthProvider;
  accountEmail?: string;
  accountCreatedAt?: string;
  lastLoginAt?: string;
  lastLearningAt?: string;
  reminderPreferences?: ReminderPreferences;
  preferredLanguage?: SupportedLanguage;
  foundationAssessmentSkipped?: boolean;
  soundEffectsEnabled?: boolean;
  reducedSoundEffects?: boolean;
  reviewHeartRestoreUsed?: boolean;
  learnerProfile?: LearnerProfile;
  streakDays: number;
  totalXp: number;
  dailyGoalXp: number;
  gems: number;
  hearts: HeartsBalance;
  completedLessonIds: string[];
  completedNodeIds: string[];
  claimedRewardIds?: string[];
  activeSubscriptionId?: string;
}

export interface LearningCourse {
  id: string;
  title: string;
  subtitle: string;
  sections: LearningSection[];
}

export interface LearningBranch {
  id: string;
  topicId?: TopicId;
  title: string;
  description: string;
  order?: number;
  surahName?: string;
  ayahRange?: string;
  difficultyRange?: {
    start: DifficultyTier;
    end: DifficultyTier;
  };
  sourceReferences?: LessonSource[];
}

export interface LearningSection {
  id: string;
  topicId: TopicId;
  title: string;
  description: string;
  badge: string;
  focus: string;
  mascot: CharacterVariant;
  accentColor: string;
  starsTarget: number;
  pathStyle?: "standard" | "surah";
  branches: LearningBranch[];
  nodes: LearningNode[];
}

export interface LearningNode {
  id: string;
  skillId: string;
  title: string;
  topicId: TopicId;
  branchId: string;
  kind: "skill" | "story" | "review";
  lessonIds: string[];
  requiredNodeIds: string[];
  xpReward: number;
  starsReward: number;
  order?: number;
  difficulty?: DifficultyTier;
  surahName?: string;
  ayahRange?: string;
  sourceReferences?: LessonSource[];
  masteryState?: "new" | "learning" | "mastery";
}

export interface LearningNodeView extends LearningNode {
  status: LearningNodeStatus;
  firstLessonId: string;
}

export interface ChallengeChoice {
  id: string;
  label: string;
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  prompt: string;
  choices: ChallengeChoice[];
  correctChoiceId: string;
  explanation: string;
}

export interface Lesson {
  id: string;
  nodeId: string;
  branchId?: string;
  surahName?: string;
  ayahRange?: string;
  title: string;
  intro: string;
  lessonType?: "skill" | "story" | "surah" | "scenario" | "review" | "mastery";
  difficulty?: DifficultyTier;
  xpReward: number;
  sources: LessonSource[];
  sourceReferences?: LessonSource[];
  unlockRules?: string[];
  masteryState?: "new" | "learning" | "mastery";
  challenges: Challenge[];
}

export interface LessonSource {
  id: string;
  site: "Quran.com" | "Sunnah.com" | "YouTube";
  category: "tafsir" | "hadith" | "video";
  title: string;
  url: string;
  summary: string;
  reference?: string;
  from?: string;
  grade?: string;
}

export interface LessonSession {
  id: string;
  lesson: Lesson;
  startedAt: string;
  heartsAtStart: number;
}

export interface ShopItem {
  id: string;
  type: ShopItemType;
  name: string;
  localizedDescription: string;
  price: number;
  currencyType: "USD" | "gems" | "rewarded_ad";
  productId?: string;
  heartsGranted?: number;
  unlimitedHearts?: boolean;
  removesAds?: boolean;
  durationDays?: number;
}

export interface XpSummary {
  userId: number;
  gainedXp: number;
  dailyGoalXp: number;
  date: string;
  streakExtended: boolean;
  totalSessionTime: number;
  numSessions: number;
}

export interface PurchaseResult {
  ok: boolean;
  transactionId: string;
  itemId: string;
}

export interface RewardedAdResult {
  ok: boolean;
  transactionId: string;
  heartsGranted: number;
}

export interface SocialConnection {
  id: string;
  name: string;
  relation: SocialRelation;
  email?: string;
  connectedWithAccount?: boolean;
  reminderPreferences?: ReminderPreferences;
  avatarInitials: string;
  totalXp: number;
  streakDays: number;
  stars: number;
  wins: number;
  losses: number;
  lastActiveAt: string;
}

export interface BattleResult {
  id: string;
  opponentId: string;
  opponentName: string;
  opponentRelation: SocialRelation;
  myScore: number;
  theirScore: number;
  winner: "user" | "opponent";
  createdAt: string;
}

export interface SocialHubState {
  connections: SocialConnection[];
  battleHistory: BattleResult[];
}
