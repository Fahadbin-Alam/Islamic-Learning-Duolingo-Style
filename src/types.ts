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
  | "quran_tafseer"
  | "hadith"
  | "scholars"
  | "ramadan";

export type CharacterVariant = "hijabi" | "muslim_man";

export type ChallengeType = "multiple_choice" | "true_false";
export type ResourceValidationStatus = "exact_match" | "strong_support" | "weak_support" | "needs_review";
export type ResourceSupportType = "primary" | "support";
export type LessonSourceSite = "Quran.com" | "Sunnah.com" | "YouTube" | "Yaqeen Institute" | "IslamQA" | "King Faisal Prize" | "Tarajm" | "Shamela";
export type LessonSourceCategory = "tafsir" | "hadith" | "video" | "biography" | "article" | "beginner_explainer";

export type LearningNodeStatus = "locked" | "available" | "current" | "completed";

export type ShopItemType =
  | "heart_pack"
  | "monthly_membership"
  | "yearly_membership"
  | "rewarded_ad"
  | "gem_heart_refill"
  | "gem_pack";

export type SocialRelation = "parent" | "friend";
export type AccountRole = "parent" | "child";
export type AuthProvider = "password" | "google" | "apple";
export type SupportedLanguage = "en" | "ar" | "bn" | "ur";

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
  // XP earned on one local calendar day (YYYY-MM-DD, same as the heart refill), for the daily goal.
  dailyXp?: { date: string; xp: number };
  /** XP per local day for the last two weeks, for the family report's week chart. */
  xpByDay?: Record<string, number>;
  // Local day a lesson was last finished; the streak ends once a whole day passes without one.
  lastStreakDate?: string;
  /** Local day Premium's streak shield last saved the streak from one missed day (at most once a week). */
  streakShieldUsedOn?: string;
  dailyGoalXp: number;
  gems: number;
  hearts: HeartsBalance;
  completedLessonIds: string[];
  completedNodeIds: string[];
  /** Best stars (1 to 3) earned on each finished circle, by node id. A finished circle with none (an old save) counts 3. */
  nodeStars?: Record<string, number>;
  /** The topic the learner had open last, so the app opens on it again. */
  lastTopicId?: TopicId;
  /**
   * Per topic, the circle its path puts START on: the one the last lesson or test there opened (or the next open
   * one after it), so a jump into a later unit carries on there after a reload. Used only while it is still open.
   */
  pathFocusIds?: Partial<Record<TopicId, string>>;
  claimedRewardIds?: string[];
  activeSubscriptionId?: string;
  /** This week's league (see src/services/leagues.ts). */
  league?: LeagueState;
  /** Local days (YYYY-MM-DD) of this Ramadan with a Ramadan lesson done, for the Ramadan streak (ramadanCalendar.ts). */
  ramadanDays?: string[];
  /** Ummah tab: trophies, arena, ranking nickname, icons and secret lessons (see src/services/ummah.ts). */
  ummah?: UmmahState;
}

export interface UmmahState {
  /** Trophies from quiz battles; they set the arena. */
  trophies: number;
  /** Most trophies ever, so an arena reached stays unlocked on the ladder. */
  best: number;
  battles: number;
  wins: number;
  /** The only name the Ummah ranking shows: words from fixed lists, never typed (see makeNickname). */
  nickname?: string;
  /** Shows on the Ummah ranking. A child's account joins only after the grown-up gate. */
  joined?: boolean;
  /** Profile icons bought with gems, and the one in use (none: initials). */
  icons?: string[];
  icon?: string;
  /** Secret lessons found, and the ones whose clue was bought. */
  secrets?: string[];
  hints?: string[];
}

/** How a finished league week ended: the league before (`from`) and after (`to`), as indexes into LEAGUES. */
export interface LeagueResult {
  weekStart: string;
  from: number;
  to: number;
  xp: number;
  /** The learner has seen the result card. */
  seen?: boolean;
}

export interface LeagueState {
  /** Index into LEAGUES, 0 (Bronze) to 6 (Diamond). */
  tier: number;
  /** Local date of the Monday that starts the week `xp` was earned in. */
  weekStart: string;
  xp: number;
  last?: LeagueResult;
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
  clusterSize?: number;
  premiumOnly?: boolean;
  surahName?: string;
  ayahRange?: string;
  difficultyRange?: {
    start: DifficultyTier;
    end: DifficultyTier;
  };
  sourceReferences?: LessonSource[];
  /** In a library topic, this unit's first circle opens only once the unit before it is finished (material for older learners). */
  gated?: boolean;
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
  clusterId?: string;
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
  masteryTestEligible?: boolean;
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
  sourceNodeId?: string;
  sourceLessonId?: string;
  miniLesson?: string;
  easierExplanation?: string;
  reviewSuggestion?: string;
  resourceLabel?: string;
  resourceUrl?: string;
  /**
   * The source that says this question's answer, when it is not its lesson's learnSource. The answer sheet shows
   * it as a chip after a right or a wrong answer (src/services/questionSource.ts).
   */
  source?: LessonSource;
  /** Asked again from an earlier lesson; the question shows a small review cue. */
  isReview?: boolean;
}

export interface LessonTeachingMoment {
  id: string;
  kind: "learn" | "story" | "watch" | "read" | "reveal" | "takeaway";
  eyebrow: string;
  title: string;
  body: string;
  actionLabel?: string;
  actionUrl?: string;
  revealLabel?: string;
  revealBody?: string;
  sourceId?: string;
}

export interface LessonPracticeActivity {
  id: string;
  kind: "sequence" | "guided_choice";
  title: string;
  prompt: string;
  instructions: string;
  options: ChallengeChoice[];
  correctChoiceId?: string;
  correctOrderIds?: string[];
  explanation: string;
  successLabel?: string;
  retryLabel?: string;
}

export interface Lesson {
  id: string;
  nodeId: string;
  branchId?: string;
  surahName?: string;
  ayahRange?: string;
  title: string;
  intro: string;
  explanationContent?: string;
  whatYouWillLearn?: string;
  whyItMatters?: string;
  keyTakeaway?: string;
  storyMoment?: string;
  /** The one short sentence the mascot says on the learn card (12 words or fewer, plain words for a 6-year-old). */
  learnLine?: string;
  /** Up to 3 short facts the learn card shows as chips, e.g. "Father: Umar". Questions only ask what the card shows. */
  learnFacts?: string[];
  /** A short narration or ayah the learn card shows in full, with where it is from. */
  quote?: { text: string; reference?: string };
  /** The one source that says what the learn card says; the card's source chip shows only this, labelled with its short reference. */
  learnSource?: LessonSource;
  lessonType?: "skill" | "story" | "surah" | "scenario" | "review" | "mastery";
  difficulty?: DifficultyTier;
  xpReward: number;
  sources: LessonSource[];
  sourceReferences?: LessonSource[];
  unlockRules?: string[];
  masteryState?: "new" | "learning" | "mastery";
  masteryTestEligible?: boolean;
  teachingMoments?: LessonTeachingMoment[];
  practiceActivities?: LessonPracticeActivity[];
  challenges: Challenge[];
}

export interface LessonSource {
  id: string;
  site: LessonSourceSite;
  category: LessonSourceCategory;
  title: string;
  url: string;
  summary: string;
  reference?: string;
  from?: string;
  grade?: string;
  teaches?: string;
  whyAttached?: string;
  validationStatus?: ResourceValidationStatus;
  supportType?: ResourceSupportType;
  reviewed?: boolean;
}

export interface LessonSession {
  id: string;
  lesson: Lesson;
  startedAt: string;
  heartsAtStart: number;
  /** "lesson_practice": questions from lessons already done (Practice tab); costs no hearts, pays practice XP. */
  mode?: "standard" | "test_out" | "lesson_practice";
  clusterTitle?: string;
  targetNodeIds?: string[];
  targetLessonIds?: string[];
  passingScore?: number;
  /** A test-out (set with mode "test_out"): the screen says it is a test, shows `passingScore`, and gives no free retry. */
  isTest?: boolean;
  /** Which try at this test-out, from 0; TRY AGAIN passes the next one so the questions change. */
  attempt?: number;
  /** A test-out started from JUMP HERE: the circle it was tapped on, so TRY AGAIN tests for the same one. */
  jumpNodeId?: string;
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
  gemsGranted?: number;
  refillsHearts?: boolean;
  unlimitedHearts?: boolean;
  removesAds?: boolean;
  durationDays?: number;
  tier?: "free" | "premium_monthly" | "premium_yearly" | "no_ads_monthly" | "no_ads_yearly";
  highlightBadge?: string;
  benefits?: string[];
  /** Free days before the first charge, when the store offers them (the store's own offer wins, see PlanDetails). */
  trialDays?: number;
}

/** What the store says about a plan beyond its price: the free trial this learner can get, and the price per month. */
export interface PlanDetails {
  trialDays?: number;
  perMonth?: string;
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
  message?: string;
  cancelled?: boolean;
  premium?: PremiumStatus;
}

/** "no_ads" takes the ads away; "premium" also gives unlimited hearts and the premium units. */
export type PremiumPlan = "no_ads" | "premium";

export interface PremiumStatus {
  active: boolean;
  /** Which plan is active. Left out, it is read from productId (see planForProduct). */
  plan?: PremiumPlan;
  productId?: string;
  expiresAt?: string | null;
  willRenew?: boolean;
}

export interface RewardedAdResult {
  ok: boolean;
  transactionId: string;
  heartsGranted: number;
  gemsGranted?: number;
  message?: string;
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
