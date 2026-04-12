export type TopicId =
  | "manners"
  | "sahabah"
  | "quran_tafseer";

export type CharacterVariant = "hijabi" | "muslim_man";

export type ChallengeType = "multiple_choice" | "true_false";

export type LearningNodeStatus = "locked" | "available" | "current" | "completed";

export type ShopItemType = "heart_pack" | "monthly_membership" | "rewarded_ad";

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

export interface LearningSection {
  id: string;
  topicId: TopicId;
  title: string;
  description: string;
  badge: string;
  focus: string;
  mascot: CharacterVariant;
  accentColor: string;
  nodes: LearningNode[];
}

export interface LearningNode {
  id: string;
  skillId: string;
  title: string;
  topicId: TopicId;
  kind: "skill" | "story" | "review";
  lessonIds: string[];
  requiredNodeIds: string[];
  xpReward: number;
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
  challenges: Challenge[];
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
