import {
  COURSE,
  LESSONS_BY_ID,
  SHOP_ITEMS,
  STARTER_USER,
  allNodes,
  findNodeByLessonId
} from "../data/course";
import type {
  Challenge,
  LearningCourse,
  LearningNode,
  LearningNodeView,
  Lesson,
  LessonSession,
  PremiumStatus,
  ShopItem,
  UserProfile,
  XpSummary
} from "../types";
import { buildGuidedLesson } from "../services/lessonGuidance";
import { enrichLessonSources, getPrimaryLessonSource } from "../services/resourceSupport";

export interface IslamicLearningApi {
  getUser(userId: number): Promise<UserProfile>;
  getCoursePath(courseId: string, userId: number): Promise<LearningCourse>;
  getPathNodes(user: UserProfile): LearningNodeView[];
  getLessonSession(lessonId: string, user: UserProfile): Promise<LessonSession>;
  getShopItems(): Promise<ShopItem[]>;
  getXpSummaries(user: UserProfile): Promise<XpSummary[]>;
}

export const learningApi: IslamicLearningApi = {
  async getUser() {
    return refillHeartsForToday(cloneUser(STARTER_USER));
  },
  async getCoursePath() {
    return COURSE;
  },
  getPathNodes(user) {
    const completed = new Set(user.completedNodeIds);
    const premium = isPremiumUser(user);
    // One circle to play next per topic: the first open one in path order. Later open circles
    // (a new surah or companion track) wait their turn; the unit's test-out key jumps ahead.
    const currentIds = new Set(
      COURSE.sections.flatMap((section) => {
        const lockedBranchIds = new Set(section.branches.filter((branch) => branch.premiumOnly && !premium).map((branch) => branch.id));
        const next = section.branches
          .flatMap((branch) => section.nodes.filter((node) => node.branchId === branch.id))
          .find((node) =>
            !completed.has(node.id) &&
            !lockedBranchIds.has(node.branchId) &&
            node.requiredNodeIds.every((id) => completed.has(id))
          );
        return next ? [next.id] : [];
      })
    );

    return allNodes.map((node) => {
      const status = completed.has(node.id) ? "completed" : currentIds.has(node.id) ? "current" : "locked";

      return {
        ...node,
        status,
        firstLessonId: node.lessonIds[0]
      };
    });
  },
  async getLessonSession(lessonId, user) {
    const lesson = LESSONS_BY_ID[lessonId];

    if (!lesson) {
      throw new Error(`Unknown lesson: ${lessonId}`);
    }

    const progressiveLesson = prepareLessonForSession(lesson);

    return {
      id: `session_${lessonId}_${Date.now()}`,
      lesson: progressiveLesson,
      startedAt: new Date().toISOString(),
      heartsAtStart: user.hearts.current
    };
  },
  async getShopItems() {
    return SHOP_ITEMS;
  },
  async getXpSummaries(user) {
    return [
      {
        userId: user.id,
        gainedXp: getXpToday(user),
        dailyGoalXp: user.dailyGoalXp,
        date: localDateKey(),
        streakExtended: getXpToday(user) >= user.dailyGoalXp,
        totalSessionTime: Math.max(120, user.completedLessonIds.length * 90),
        numSessions: user.completedLessonIds.length
      }
    ];
  }
};

// Days follow the learner's own clock, so the daily goal and streak roll over at their midnight, not UTC's.
export function localDateKey(date = new Date()) {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function previousDateKey(now: Date) {
  return localDateKey(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1));
}

// The circle to open next: the current one, else any unlocked one that is not finished yet.
export function findNextPlayableNode<T extends Pick<LearningNodeView, "status">>(nodes: T[]) {
  return nodes.find((node) => node.status === "current") ?? nodes.find((node) => node.status === "available");
}

// Review and the daily challenge pay about what a lesson pays per question, and only for right answers.
// The placement test measures level and pays nothing, so retaking it cannot farm XP.
export const PRACTICE_XP_PER_CORRECT_ANSWER = 2;

export function getAssessmentXp(mode: "placement" | "review" | "daily_challenge", correct: boolean) {
  return mode === "placement" || !correct ? 0 : PRACTICE_XP_PER_CORRECT_ANSWER;
}

export function getXpToday(user: UserProfile, now = new Date()) {
  return user.dailyXp?.date === localDateKey(now) ? user.dailyXp.xp : 0;
}

// Any XP counts toward the daily goal. Meeting it extends the streak once per day: by one after a
// goal met yesterday, otherwise the streak starts again at one.
export function addXp(user: UserProfile, amount: number, now = new Date()): UserProfile {
  const today = localDateKey(now);
  const withXp: UserProfile = {
    ...user,
    totalXp: user.totalXp + amount,
    dailyXp: { date: today, xp: getXpToday(user, now) + amount }
  };

  if (amount <= 0 || user.lastStreakDate === today || getXpToday(withXp, now) < user.dailyGoalXp) {
    return withXp;
  }

  const continues = user.lastStreakDate === previousDateKey(now);

  return {
    ...withXp,
    streakDays: continues ? user.streakDays + 1 : 1,
    lastStreakDate: today
  };
}

// A streak survives until the end of the day after the goal was last met; after that it is lost.
export function refreshStreak(user: UserProfile, now = new Date()) {
  if (!user.lastStreakDate || user.streakDays === 0) {
    return user;
  }

  if (user.lastStreakDate === localDateKey(now) || user.lastStreakDate === previousDateKey(now)) {
    return user;
  }

  return { ...user, streakDays: 0 };
}

// Run whenever a saved profile is opened: refill today's hearts and drop a streak that has lapsed.
export function prepareUserForToday(user: UserProfile, now = new Date()) {
  return refreshStreak(refillHeartsForToday(user, now), now);
}

export function didExtendStreak(before: UserProfile, after: UserProfile) {
  return Boolean(after.lastStreakDate) && after.lastStreakDate !== before.lastStreakDate;
}

export function refillHeartsForToday(user: UserProfile, now = new Date()) {
  const today = localDateKey(now);

  if (user.hearts.unlimited || user.hearts.lastRefillDate === today) {
    return user;
  }

  return {
    ...user,
    hearts: {
      ...user.hearts,
      current: user.hearts.max,
      lastRefillDate: today
    }
  };
}

export function completeLesson(user: UserProfile, lesson: Lesson) {
  const node = findNodeByLessonId(lesson.id);
  const alreadyCompleted = user.completedLessonIds.includes(lesson.id);
  const completedLessonIds = alreadyCompleted
    ? user.completedLessonIds
    : [...user.completedLessonIds, lesson.id];
  const completedNodeIds = node && !user.completedNodeIds.includes(node.id)
    ? [...user.completedNodeIds, node.id]
    : user.completedNodeIds;
  const withXp = addXp(user, alreadyCompleted ? 0 : lesson.xpReward);

  return {
    ...withXp,
    completedLessonIds,
    completedNodeIds
  };
}

// Running out of hearts stops a lesson, including on its final question; otherwise the last
// mistake would still finish the lesson and award its XP and stars.
export function isOutOfHeartsAfterAnswer(user: UserProfile, answerState: "correct" | "wrong" | undefined) {
  return isOutOfHearts(user) && answerState === "wrong";
}

// No hearts left (and no unlimited hearts): no more questions until the learner refills.
// A free retry does not get around it.
export function isOutOfHearts(user: UserProfile) {
  return !user.hearts.unlimited && user.hearts.current <= 0;
}

export function loseHeart(user: UserProfile) {
  if (user.hearts.unlimited) {
    return user;
  }

  return {
    ...user,
    hearts: {
      ...user.hearts,
      current: Math.max(0, user.hearts.current - 1)
    }
  };
}

export function grantHearts(user: UserProfile, hearts: number, capAtMax = false) {
  if (user.hearts.unlimited) {
    return user;
  }

  const nextHeartCount = user.hearts.current + hearts;

  return {
    ...user,
    hearts: {
      ...user.hearts,
      current: capAtMax ? Math.min(user.hearts.max, nextHeartCount) : nextHeartCount
    }
  };
}

export function applyShopItem(user: UserProfile, item: ShopItem) {
  if (item.type === "monthly_membership" || item.type === "yearly_membership") {
    return {
      ...user,
      activeSubscriptionId: item.productId ?? item.id,
      hearts: {
        ...user.hearts,
        current: user.hearts.max,
        unlimited: true
      }
    };
  }

  if (item.type === "heart_pack") {
    return grantHearts(user, item.heartsGranted ?? 0, false);
  }

  if (item.type === "gem_pack") {
    return { ...user, gems: user.gems + (item.gemsGranted ?? 0) };
  }

  if (item.type === "gem_heart_refill") {
    if (!canSpendGems(user, item)) {
      return user;
    }

    return {
      ...user,
      gems: user.gems - item.price,
      hearts: { ...user.hearts, current: Math.max(user.hearts.current, user.hearts.max) }
    };
  }

  return user;
}

export function canSpendGems(user: UserProfile, item: ShopItem) {
  return item.currencyType === "gems" && !user.hearts.unlimited && user.gems >= item.price && user.hearts.current < user.hearts.max;
}

export function isPremiumUser(user: UserProfile) {
  return Boolean(user.activeSubscriptionId);
}

// Store state wins over local state, so a lapsed subscription stops granting unlimited hearts and ad-free study.
export function applyPremiumStatus(user: UserProfile, status: PremiumStatus) {
  if (status.active) {
    if (user.activeSubscriptionId && user.hearts.unlimited) {
      return user;
    }

    return {
      ...user,
      activeSubscriptionId: status.productId ?? user.activeSubscriptionId ?? "premium",
      hearts: { ...user.hearts, current: user.hearts.max, unlimited: true }
    };
  }

  if (!user.activeSubscriptionId && !user.hearts.unlimited) {
    return user;
  }

  return {
    ...user,
    activeSubscriptionId: undefined,
    hearts: { ...user.hearts, current: Math.min(user.hearts.current, user.hearts.max), unlimited: false }
  };
}

// `maxXp` caps the XP: a test-out pays for the lessons it asked about, not for every lesson it skips.
export function completeLessonCluster(user: UserProfile, lessons: Lesson[], maxXp = Number.POSITIVE_INFINITY) {
  const completedLessonIds = new Set(user.completedLessonIds);
  const completedNodeIds = new Set(user.completedNodeIds);
  let gainedXp = 0;

  for (const lesson of lessons) {
    if (!completedLessonIds.has(lesson.id)) {
      completedLessonIds.add(lesson.id);
      gainedXp += lesson.xpReward;
    }

    const node = findNodeByLessonId(lesson.id);
    if (node) {
      completedNodeIds.add(node.id);
    }
  }

  const withXp = addXp(user, Math.min(gainedXp, maxXp));

  return {
    ...withXp,
    completedLessonIds: Array.from(completedLessonIds),
    completedNodeIds: Array.from(completedNodeIds)
  };
}

// A unit test-out asks 3 to 8 questions, whatever the number of lessons it skips.
export const TEST_OUT_MIN_QUESTIONS = 3;
export const TEST_OUT_MAX_QUESTIONS = 8;

// 80% to pass, but never more right answers than there are questions, so a perfect run always passes.
export function testOutPassingScore(questionCount: number) {
  return Math.min(questionCount, Math.max(TEST_OUT_MIN_QUESTIONS, Math.ceil(questionCount * 0.8)));
}

// Questions spread over every lesson the test skips, no prompt asked twice. A question that only makes
// sense inside its own lesson ("What does this step teach?") is used only when the lesson has nothing else.
export function pickTestOutChallenges(lessons: Lesson[]) {
  const picks: { lesson: Lesson; challenge: Challenge }[] = [];

  if (!lessons.length) {
    return picks;
  }

  const target = Math.min(TEST_OUT_MAX_QUESTIONS, Math.max(TEST_OUT_MIN_QUESTIONS, lessons.length));
  // More lessons than questions: one question from every few lessons. Fewer: each lesson gives several, in turn.
  const slots = Array.from({ length: target }, (_, index) =>
    lessons.length >= target ? Math.floor((index * lessons.length) / target) : index % lessons.length
  );
  const used = new Set<string>();
  const prompts = new Set<string>();
  const fits = (lesson: Lesson, challenge: Challenge, strict: boolean) =>
    !used.has(`${lesson.id}:${challenge.id}`) &&
    !prompts.has(challenge.prompt.trim().toLowerCase()) &&
    (!strict || !CONTEXT_BOUND_PROMPT.test(challenge.prompt));

  for (const slot of slots) {
    const lesson = lessons[slot];
    const challenge = lesson.challenges.find((item) => fits(lesson, item, true)) ?? lesson.challenges.find((item) => fits(lesson, item, false));

    if (challenge) {
      used.add(`${lesson.id}:${challenge.id}`);
      prompts.add(challenge.prompt.trim().toLowerCase());
      picks.push({ lesson, challenge });
    }
  }

  return picks;
}

// Too few questions to tell whether the learner knows the unit: no test-out then.
export function canTestOut(lessons: Lesson[]) {
  return pickTestOutChallenges(lessons).length >= TEST_OUT_MIN_QUESTIONS;
}

// Passing completes every lesson in `lessons`, the circles still to do in the unit, locked ones included.
export function createTestOutSession(input: {
  branchTitle: string;
  branchId: string;
  lessons: Lesson[];
  nodeIds: string[];
  heartsAtStart: number;
}): LessonSession {
  const picks = pickTestOutChallenges(input.lessons);
  const prepared = new Map<string, Lesson>();
  const challenges = picks.map(({ lesson, challenge }, index) => {
    const full = prepared.get(lesson.id) ?? prepareLessonForSession(lesson);
    prepared.set(lesson.id, full);
    const base = full.challenges.find((item) => item.id === challenge.id) ?? challenge;

    return {
      ...base,
      id: `test_out_${input.branchId}_${index}_${base.id}`,
      sourceNodeId: base.sourceNodeId ?? lesson.nodeId,
      sourceLessonId: base.sourceLessonId ?? lesson.id,
      miniLesson: base.miniLesson ?? lesson.explanationContent ?? lesson.intro,
      reviewSuggestion: base.reviewSuggestion ?? `Review ${lesson.title}`
    };
  });
  const uniqueSources = uniqueById(Array.from(prepared.values()).flatMap((lesson) => lesson.sources));
  // What the lessons it asked about pay; passing still completes every lesson in `lessons`.
  const xpReward = Array.from(new Set(picks.map((pick) => pick.lesson))).reduce((total, lesson) => total + lesson.xpReward, 0);

  return {
    id: `session_test_out_${input.branchId}_${Date.now()}`,
    lesson: {
      id: `lesson_test_out_${input.branchId}`,
      nodeId: input.nodeIds[0] ?? input.lessons[0]?.nodeId ?? input.branchId,
      branchId: input.branchId,
      title: input.branchTitle,
      intro: "Pass to jump ahead.",
      explanationContent: "Questions from every lesson this test skips.",
      lessonType: "mastery",
      xpReward,
      sources: uniqueSources,
      sourceReferences: uniqueSources,
      masteryState: "mastery",
      masteryTestEligible: true,
      challenges
    },
    startedAt: new Date().toISOString(),
    heartsAtStart: input.heartsAtStart,
    mode: "test_out" as const,
    clusterTitle: input.branchTitle,
    targetNodeIds: input.nodeIds,
    targetLessonIds: input.lessons.map((lesson) => lesson.id),
    passingScore: testOutPassingScore(challenges.length)
  };
}

function cloneUser(user: UserProfile): UserProfile {
  return {
    ...user,
    hearts: { ...user.hearts },
    completedLessonIds: [...user.completedLessonIds],
    completedNodeIds: [...user.completedNodeIds]
  };
}

type LessonTier = "easy" | "medium" | "hard";

// Later lessons mix in one question from the lesson before them in the same unit. They ask a little
// more that way without padding the lesson with off-topic choices or questions it never taught.
function buildProgressiveLesson(lesson: Lesson): Lesson {
  const node = findNodeByLessonId(lesson.id);

  if (!node || getLessonTier(node) === "easy") {
    return lesson;
  }

  const review = buildReviewChallenge(lesson, node);

  if (!review) {
    return lesson;
  }

  return {
    ...lesson,
    xpReward: lesson.xpReward + 2,
    challenges: [...lesson.challenges, review]
  };
}

// A question that only makes sense inside its own lesson ("What does this lesson teach?") can't be reused.
const CONTEXT_BOUND_PROMPT = /\bthis (lesson|step|story|unit|branch)\b/i;

function buildReviewChallenge(lesson: Lesson, node: LearningNode): Challenge | undefined {
  const previousNode = allNodes.find((item) => item.branchId === node.branchId && node.requiredNodeIds.includes(item.id));
  const previousLesson = previousNode ? LESSONS_BY_ID[previousNode.lessonIds[0]] : undefined;

  if (!previousLesson) {
    return undefined;
  }

  const ownPrompts = new Set(lesson.challenges.map((challenge) => challenge.prompt.trim().toLowerCase()));
  const pool = previousLesson.challenges.filter(
    (challenge) => !CONTEXT_BOUND_PROMPT.test(challenge.prompt) && !ownPrompts.has(challenge.prompt.trim().toLowerCase())
  );

  if (!pool.length) {
    return undefined;
  }

  const picked = pool[Math.abs(hashCode(lesson.id)) % pool.length];

  return {
    ...picked,
    id: `${lesson.id}_review_${picked.id}`,
    sourceNodeId: picked.sourceNodeId ?? previousLesson.nodeId,
    sourceLessonId: picked.sourceLessonId ?? previousLesson.id,
    reviewSuggestion: picked.reviewSuggestion ?? `Review ${previousLesson.title}`
  };
}

function prepareLessonForSession(lesson: Lesson): Lesson {
  const node = findNodeByLessonId(lesson.id);
  const progressiveLesson = buildProgressiveLesson(lesson);
  const enrichedSources = enrichLessonSources(progressiveLesson, node);
  const primarySource = getPrimaryLessonSource(enrichedSources);
  const sourcedLesson = {
    ...progressiveLesson,
    sources: enrichedSources,
    sourceReferences: enrichedSources,
    challenges: progressiveLesson.challenges.map((challenge) => ({
      ...challenge,
      resourceUrl: challenge.resourceUrl ?? primarySource?.url,
      resourceLabel: challenge.resourceLabel ?? (primarySource ? "Open exact source" : undefined)
    }))
  };

  return buildGuidedLesson(sourcedLesson, node);
}

function getLessonTier(node: LearningNode): LessonTier {
  if (node.difficulty) {
    if (node.difficulty <= 2) {
      return "easy";
    }

    if (node.difficulty <= 4) {
      return "medium";
    }

    return "hard";
  }

  const section = COURSE.sections.find((item) => item.topicId === node.topicId);

  if (!section || section.nodes.length <= 2) {
    return "easy";
  }

  const index = section.nodes.findIndex((item) => item.id === node.id);
  const progress = index / Math.max(1, section.nodes.length - 1);

  if (progress < 0.34) {
    return "easy";
  }

  if (progress < 0.68) {
    return "medium";
  }

  return "hard";
}

function uniqueById<T extends { id: string }>(items: T[]) {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of items) {
    if (!item || seen.has(item.id)) {
      continue;
    }

    seen.add(item.id);
    result.push(item);
  }

  return result;
}

function hashCode(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return hash;
}
