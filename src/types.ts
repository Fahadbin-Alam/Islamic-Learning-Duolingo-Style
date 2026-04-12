export type TopicId =
  | "foundation"
  | "manners"
  | "sahabah"
  | "prophets"
  | "quran_tafseer";

export type CharacterVariant = "hijabi" | "muslim_man";

export type ChallengeType = "multiple_choice" | "true_false";

export type LearningNodeStatus = "locked" | "available" | "current" | "completed";

export type ShopItemType = "heart_pack" | "monthly_membership" | "rewarded_ad";

export type SocialRelation = "parent" | "friend";
export type AccountRole = "parent" | "child";
export type SupportedLanguage = "en" | "fr" | "ar" | "bn" | "ur" | "hi";

export interface ReminderPreferences {
  dailyInactivity: boolean;
  weeklyInactivity: boolean;
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
  accountEmail?: string;
  accountCreatedAt?: string;
  lastLoginAt?: string;
  reminderPreferences?: ReminderPreferences;
  preferredLanguage?: SupportedLanguage;
  reviewHeartRestoreUsed?: boolean;
  streakDays: number;
  totalXp: number;
  dailyGoalXp: number;
  gems: number;
  hearts: HeartsBalance;
  completedLessonIds: string[];
  completedNodeIds: string[];
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
  title: string;
  description: string;
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
  title: string;
  intro: string;
  xpReward: number;
  sources: LessonSource[];
  challenges: Challenge[];
}

export interface LessonSource {
  id: string;
  site: "Quran.com" | "Sunnah.com";
  category: "tafsir" | "hadith";
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
