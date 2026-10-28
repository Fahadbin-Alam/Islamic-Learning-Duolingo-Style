import {
  COURSE,
  LESSONS_BY_ID,
  SHOP_ITEMS,
  STARTER_USER,
  allNodes,
  findNodeByLessonId
} from "../data/course";
import { lessonForAge } from "../data/ageLevels";
import { asksSameLine, givesAway as namesAnswerOf } from "../data/scalableCurriculum";
import type { AgeGroup } from "../services/monetizationConfig";
import type {
  Challenge,
  LearningCourse,
  LearningNode,
  LearningNodeStatus,
  LearningNodeView,
  LearningSection,
  Lesson,
  LessonSession,
  PremiumStatus,
  ShopItem,
  TopicId,
  UserProfile,
  XpSummary
} from "../types";
import { buildGuidedLesson } from "../services/lessonGuidance";
import { planForProduct } from "../services/monetizationConfig";
import { enrichLessonSources, getPrimaryLessonSource } from "../services/resourceSupport";

export interface IslamicLearningApi {
  getUser(userId: number): Promise<UserProfile>;
  getCoursePath(courseId: string, userId: number): Promise<LearningCourse>;
  getPathNodes(user: UserProfile): LearningNodeView[];
  getLessonSession(lessonId: string, user: UserProfile, ageGroup?: AgeGroup): Promise<LessonSession>;
  getShopItems(): Promise<ShopItem[]>;
  getXpSummaries(user: UserProfile): Promise<XpSummary[]>;
}

// Topics whose units each stand alone (a surah, a companion, a prophet, a woman of the Book, a narration),
// so a learner can start with Al-Ikhlas or Abu Bakr. Every other topic is a skill taught in order.
export const LIBRARY_TOPICS: ReadonlySet<TopicId> = new Set<TopicId>(["quran_tafseer", "sahabah", "prophets", "women_of_the_book", "hadith"]);

export const learningApi: IslamicLearningApi = {
  async getUser() {
    return refillHeartsForToday(cloneUser(STARTER_USER));
  },
  async getCoursePath() {
    return COURSE;
  },
  getPathNodes(user) {
    const completed = new Set(user.completedNodeIds);
    const premium = hasPremiumLessons(user);
    // Circles open in path order, so the path shows the order things unlock. A topic taught in order
    // opens one circle: its first not-done one. A library topic opens the next circle of every unit,
    // and only the first of those is "current" (the START bubble); a gated unit waits until the unit
    // before it is finished. Premium units stay shut to free learners. getTestOutPlan follows the same rule.
    const open = new Map<string, LearningNodeStatus>();

    for (const section of COURSE.sections) {
      const library = LIBRARY_TOPICS.has(section.topicId);
      let hasCurrent = false;
      let previousDone = true;

      for (const branch of section.branches) {
        if ((branch.premiumOnly && !premium) || !section.nodes.some((node) => node.branchId === branch.id)) {
          continue;
        }

        const next = section.nodes.find((node) => node.branchId === branch.id && !completed.has(node.id));
        const shut = library && branch.gated && !previousDone;
        previousDone = !next;

        if (!next || shut) {
          continue;
        }

        open.set(next.id, hasCurrent ? "available" : "current");
        hasCurrent = true;

        if (!library) {
          break;
        }
      }
    }

    return allNodes.map((node) => ({
      ...node,
      status: completed.has(node.id) ? "completed" : open.get(node.id) ?? "locked",
      firstLessonId: node.lessonIds[0]
    }));
  },
  async getLessonSession(lessonId, user, ageGroup) {
    const lesson = LESSONS_BY_ID[lessonId];

    if (!lesson) {
      throw new Error(`Unknown lesson: ${lessonId}`);
    }

    const progressiveLesson = prepareLessonForSession(lessonForAge(lesson, ageGroup));

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
        streakExtended: user.lastStreakDate === localDateKey(),
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

// Any XP counts toward the daily goal, a goal of its own: the streak does not wait for it.
export function addXp(user: UserProfile, amount: number, now = new Date()): UserProfile {
  return {
    ...user,
    totalXp: user.totalXp + amount,
    dailyXp: { date: localDateKey(now), xp: getXpToday(user, now) + amount }
  };
}

// The first lesson finished on a day starts or keeps the streak, as on Duolingo, replays too: one more
// after a lesson yesterday, otherwise it starts again at one. Later lessons that day change nothing. A save
// from before streak days were dated keeps its streak going.
export function keepStreak(user: UserProfile, now = new Date()): UserProfile {
  const today = localDateKey(now);

  if (user.lastStreakDate === today) {
    return user;
  }

  const continues = user.lastStreakDate ? user.lastStreakDate === previousDateKey(now) : user.streakDays > 0;

  return {
    ...user,
    streakDays: continues ? user.streakDays + 1 : 1,
    lastStreakDate: today
  };
}

// A streak survives until the end of the day after the last finished lesson; after that it is lost.
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

const lessonXpCache = new Map<string, number>();

// The XP finishing a lesson really adds: its own XP plus the review bonus its session adds (the same
// buildProgressiveLesson), and nothing for a lesson already finished. The node card, completeLesson and
// so the LessonComplete total all count it this way. A lesson the course does not know pays its own xpReward.
export function getLessonXp(lesson: Lesson | string, user?: Pick<UserProfile, "completedLessonIds">) {
  const lessonId = typeof lesson === "string" ? lesson : lesson.id;
  const base = LESSONS_BY_ID[lessonId];

  if (user?.completedLessonIds.includes(lessonId)) {
    return 0;
  }

  if (!base) {
    return typeof lesson === "string" ? 0 : lesson.xpReward;
  }

  const cached = lessonXpCache.get(lessonId);
  const xp = cached ?? buildProgressiveLesson(base).xpReward;
  lessonXpCache.set(lessonId, xp);
  return xp;
}

// What a circle's START (or PRACTICE) pays this learner: its lesson's XP, 0 once it is finished.
export function getNodeXp(node: Pick<LearningNode, "lessonIds">, user?: Pick<UserProfile, "completedLessonIds">) {
  return node.lessonIds[0] ? getLessonXp(node.lessonIds[0], user) : 0;
}

// A lesson pays at most 3 stars (lessonStars); a finished circle with no record yet counts that many.
export const MAX_LESSON_STARS = 3;

// The learner's best on each circle, kept when a replay goes worse.
function withNodeStars(user: UserProfile, nodeIds: string[], stars: number | undefined) {
  if (stars === undefined || !nodeIds.length) {
    return user.nodeStars;
  }

  const earned = Math.max(1, Math.min(MAX_LESSON_STARS, Math.round(stars)));
  const nodeStars = { ...user.nodeStars };

  for (const nodeId of nodeIds) {
    nodeStars[nodeId] = Math.max(nodeStars[nodeId] ?? 0, earned);
  }

  return nodeStars;
}

// Stars a circle shows: its best run once finished (3 for one finished before stars were kept), else 0.
export function getNodeStars(user: Pick<UserProfile, "completedNodeIds" | "nodeStars">, nodeId: string) {
  return user.completedNodeIds.includes(nodeId) ? user.nodeStars?.[nodeId] ?? MAX_LESSON_STARS : 0;
}

// Total stars over the finished circles (all of the course's, or only `nodeIds`, e.g. one topic's), for Me.
// A saved circle the course no longer has (a removed opener) counts for nothing.
export function getTotalStars(user: Pick<UserProfile, "completedNodeIds" | "nodeStars">, nodeIds?: Iterable<string>) {
  const ids = new Set(nodeIds ?? allNodes.map((node) => node.id));

  return Array.from(new Set(user.completedNodeIds))
    .filter((nodeId) => ids.has(nodeId))
    .reduce((total, nodeId) => total + (user.nodeStars?.[nodeId] ?? MAX_LESSON_STARS), 0);
}

// `stars` is how this run went (lessonStars); the circle keeps its best. Finishing a lesson, a replay
// too, keeps the streak (keepStreak); only a lesson not done before pays XP (getLessonXp).
export function completeLesson(user: UserProfile, lesson: Lesson, stars?: number, now = new Date()) {
  const node = findNodeByLessonId(lesson.id);
  const alreadyCompleted = user.completedLessonIds.includes(lesson.id);
  const completedLessonIds = alreadyCompleted
    ? user.completedLessonIds
    : [...user.completedLessonIds, lesson.id];
  const completedNodeIds = node && !user.completedNodeIds.includes(node.id)
    ? [...user.completedNodeIds, node.id]
    : user.completedNodeIds;
  const withXp = keepStreak(addXp(user, getLessonXp(lesson, user), now), now);
  const nodeStars = withNodeStars(user, node ? [node.id] : [], stars);

  return {
    ...withXp,
    completedLessonIds,
    completedNodeIds,
    ...(nodeStars ? { nodeStars } : {})
  };
}

// Running out of hearts stops a lesson, including on its final question; otherwise the last
// mistake would still finish the lesson and award its XP and stars.
export function isOutOfHeartsAfterAnswer(user: UserProfile, answerState: "correct" | "wrong" | undefined) {
  return isOutOfHearts(user) && answerState === "wrong";
}

// No hearts left (and no unlimited hearts): no more questions until the learner refills.
// A missed question asked again costs a heart too, so tapping on through it cannot get around it.
export function isOutOfHearts(user: UserProfile) {
  return !user.hearts.unlimited && user.hearts.current <= 0;
}

// A brand-new learner's first lessons cost no hearts, so nobody runs out before they know the game.
export const WARM_UP_LESSONS = 3;

export function isWarmUpLearner(user: UserProfile) {
  return (user.completedLessonIds?.length ?? 0) < WARM_UP_LESSONS;
}

// A wrong answer costs a heart, except in a test-out (pass the session): its misses only count against
// the pass mark, so one failed jump cannot use up a child's hearts. The warm-up lessons cost none either.
export function loseHeart(user: UserProfile, session?: LessonSession) {
  if (user.hearts.unlimited || isTestOutSession(session) || isLessonPractice(session) || isWarmUpLearner(user)) {
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
    const activeSubscriptionId = item.productId ?? item.id;
    // "No ads" only takes the ads away: hearts work as before.
    if (planForProduct(activeSubscriptionId) === "no_ads") {
      return { ...user, activeSubscriptionId, hearts: { ...user.hearts, unlimited: false } };
    }

    return {
      ...user,
      activeSubscriptionId,
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

/** Any paid plan: no ads. */
export function isPremiumUser(user: UserProfile) {
  return Boolean(user.activeSubscriptionId);
}

/** Premium, not "No ads": unlimited hearts and the premium units. */
export function hasPremiumLessons(user: UserProfile) {
  return planForProduct(user.activeSubscriptionId) === "premium";
}

// Store state wins over local state, so a lapsed subscription stops granting unlimited hearts and ad-free study,
// and a "No ads" plan never grants unlimited hearts.
export function applyPremiumStatus(user: UserProfile, status: PremiumStatus) {
  if (status.active) {
    const plan = status.plan ?? planForProduct(status.productId) ?? "premium";

    if (plan === "no_ads") {
      const activeSubscriptionId = status.productId ?? (planForProduct(user.activeSubscriptionId) === "no_ads" ? user.activeSubscriptionId : undefined) ?? "no_ads";
      if (user.activeSubscriptionId === activeSubscriptionId && !user.hearts.unlimited) {
        return user;
      }

      return {
        ...user,
        activeSubscriptionId,
        hearts: { ...user.hearts, current: Math.min(user.hearts.current, user.hearts.max), unlimited: false }
      };
    }

    if (hasPremiumLessons(user) && user.hearts.unlimited) {
      return user;
    }

    return {
      ...user,
      activeSubscriptionId: status.productId ?? (hasPremiumLessons(user) ? user.activeSubscriptionId : undefined) ?? "premium",
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

// `maxXp` caps the XP: a test-out pays getTestOutXp, never the XP of every circle it skips. Passing one finishes
// lessons, so it keeps the streak; `stars` (how the test went) becomes each skipped circle's stars unless it has better.
export function completeLessonCluster(user: UserProfile, lessons: Lesson[], maxXp = Number.POSITIVE_INFINITY, stars?: number, now = new Date()) {
  const completedLessonIds = new Set(user.completedLessonIds);
  const completedNodeIds = new Set(user.completedNodeIds);
  const nodeIds: string[] = [];
  let gainedXp = 0;

  for (const lesson of lessons) {
    if (!completedLessonIds.has(lesson.id)) {
      completedLessonIds.add(lesson.id);
      gainedXp += lesson.xpReward;
    }

    const node = findNodeByLessonId(lesson.id);
    if (node) {
      completedNodeIds.add(node.id);
      nodeIds.push(node.id);
    }
  }

  const withXp = addXp(user, Math.min(gainedXp, maxXp), now);
  const withStreak = lessons.length ? keepStreak(withXp, now) : withXp;
  const nodeStars = withNodeStars(user, nodeIds, stars);

  return {
    ...withStreak,
    completedLessonIds: Array.from(completedLessonIds),
    completedNodeIds: Array.from(completedNodeIds),
    ...(nodeStars ? { nodeStars } : {})
  };
}

// A test-out asks one question about every lesson it marks done, so it skips at most 10 circles: at least 3
// questions, and 5 when the lessons have them, so one slip still passes. Fewer than 3 is no test.
export const TEST_OUT_MIN_QUESTIONS = 3;
export const TEST_OUT_MAX_QUESTIONS = 10;
const TEST_OUT_USUAL_MIN_QUESTIONS = 5;

// A passed test-out pays like practice, 2 XP per right answer, and never more than the lessons it marks done
// would have paid (the session's xpReward), so skipping never pays more than learning.
export function getTestOutXp(session: Pick<LessonSession, "lesson">, correct: number) {
  return Math.max(0, Math.min(session.lesson.xpReward, Math.floor(correct) * PRACTICE_XP_PER_CORRECT_ANSWER));
}

// 80% to pass, but never more right answers than there are questions, so a perfect run always passes.
export function testOutPassingScore(questionCount: number) {
  return Math.min(questionCount, Math.max(TEST_OUT_MIN_QUESTIONS, Math.ceil(questionCount * 0.8)));
}

export function isLessonPractice(session: LessonSession | undefined) {
  return session?.mode === "lesson_practice";
}

// The lessons "My lessons" practice asks about: the most recent ones the learner finished, newest last.
const LESSON_PRACTICE_POOL = 12;

export function practiceLessonsFor(user: Pick<UserProfile, "completedLessonIds">) {
  return (user.completedLessonIds ?? [])
    .map((lessonId) => LESSONS_BY_ID[lessonId])
    .filter((lesson): lesson is Lesson => Boolean(lesson))
    .slice(-LESSON_PRACTICE_POOL);
}

export function canPracticeLessons(user: Pick<UserProfile, "completedLessonIds">) {
  return pickTestOutChallenges(practiceLessonsFor(user)).length >= TEST_OUT_MIN_QUESTIONS;
}

// "My lessons" in Practice: up to 10 questions from the lessons the learner finished most recently, across every
// topic, picked like a test-out's (one per lesson first, no giveaways). A miss comes back at the end as in a
// lesson, but it costs no hearts and pays practice XP, 2 per question right on its first try.
export function createLessonPracticeSession(user: UserProfile, attempt = 0): LessonSession | undefined {
  const lessons = practiceLessonsFor(user);
  const picks = pickTestOutChallenges(lessons, attempt);

  if (picks.length < TEST_OUT_MIN_QUESTIONS) {
    return undefined;
  }

  const prepared = new Map<string, Lesson>();
  const challenges = picks.map(({ lesson, challenge }, index) => {
    const full = prepared.get(lesson.id) ?? prepareLessonForSession(lesson);
    prepared.set(lesson.id, full);
    const base = full.challenges.find((item) => item.id === challenge.id) ?? challenge;

    return {
      ...base,
      id: `lesson_practice_${index}_${base.id}`,
      choices: shuffleChoicesForAttempt(base, attempt),
      isReview: true,
      sourceNodeId: base.sourceNodeId ?? lesson.nodeId,
      sourceLessonId: base.sourceLessonId ?? lesson.id,
      miniLesson: base.miniLesson ?? lesson.explanationContent ?? lesson.intro,
      reviewSuggestion: base.reviewSuggestion ?? `Review ${lesson.title}`
    };
  });
  const sources = uniqueById(Array.from(prepared.values()).flatMap((lesson) => lesson.sources));

  return {
    id: `session_lesson_practice_${attempt}_${Date.now()}`,
    lesson: {
      id: "lesson_practice",
      nodeId: lessons[lessons.length - 1].nodeId,
      title: "My lessons",
      intro: "Questions from lessons you finished.",
      explanationContent: "Questions from lessons you finished.",
      lessonType: "review",
      xpReward: challenges.length * PRACTICE_XP_PER_CORRECT_ANSWER,
      sources,
      sourceReferences: sources,
      masteryState: "learning",
      masteryTestEligible: false,
      challenges
    },
    startedAt: new Date().toISOString(),
    heartsAtStart: user.hearts.current,
    mode: "lesson_practice",
    attempt
  };
}

function isTestOutSession(session: LessonSession | undefined) {
  return Boolean(session && (session.isTest || session.mode === "test_out"));
}

// A test-out is lost once it has more misses than its pass mark allows; the app ends it then, at once.
export function isTestLost(session: LessonSession | undefined, misses: number) {
  if (!session || !isTestOutSession(session)) {
    return false;
  }

  const total = session.lesson.challenges.length;

  return misses > total - (session.passingScore ?? testOutPassingScore(total));
}

// What a test-out skips; passing it marks `nodeIds` done, and it asks about each of them.
// "unit" (the banner key): the next circles still to do in the unit, up to 10, locked ones too.
// "jump": the circles still to do before the one that opens. From JUMP HERE (`jumpNodeId`): in a library topic,
// or in the unit already open, the circles before the tapped one, so it is next to play; in a later unit of a
// topic taught in order, every circle before that unit, which opens at its first circle. Without a circle: a
// later unit of a topic taught in order, still shut, so the test opens it. A gated unit (for older learners) is
// never tested into or through: it opens only once the unit before it is finished, lesson by lesson.
export interface TestOutPlan {
  branchId: string;
  kind: "unit" | "jump";
  lessons: Lesson[];
  nodeIds: string[];
  /** The circle JUMP HERE was tapped on, when the plan is for one. */
  jumpNodeId?: string;
}

// Any unfinished unit the learner may open has a plan, not only the one with the current circle; so has any
// circle not yet open, for JUMP HERE. Nothing when there is nothing to skip, when it would skip more than one
// test can ask about (10 circles), for a finished unit, for a premium unit a free learner cannot open, for a
// gated unit, or when it would mark a gated unit's circles done without teaching them.
export function getTestOutPlan(user: UserProfile, branchId: string, jumpNodeId?: string): TestOutPlan | undefined {
  const section = COURSE.sections.find((item) => item.branches.some((branch) => branch.id === branchId));
  const unitIndex = section ? section.branches.findIndex((branch) => branch.id === branchId) : -1;

  if (!section || unitIndex < 0) {
    return undefined;
  }

  const premium = hasPremiumLessons(user);
  const opens = (branchIndex: number) => premium || !section.branches[branchIndex].premiumOnly;
  const done = new Set(user.completedNodeIds);

  if (!opens(unitIndex) || isGatedBranch(section, branchId)) {
    return undefined;
  }

  const unit = section.nodes.filter((node) => node.branchId === branchId);
  const left = unit.filter((node) => !done.has(node.id));
  const before = circlesBeforeUnit(section, unitIndex, done, opens);
  let skipped: LearningNode[];

  if (jumpNodeId) {
    const index = unit.findIndex((node) => node.id === jumpNodeId);

    if (index < 0 || done.has(jumpNodeId)) {
      return undefined;
    }

    const library = LIBRARY_TOPICS.has(section.topicId);
    skipped = [...before, ...(library || !before.length ? unit.slice(0, index).filter((node) => !done.has(node.id)) : [])];
  } else {
    skipped = before.length ? before : left.slice(0, TEST_OUT_MAX_QUESTIONS);
  }

  if (!left.length || !skipped.length || skipped.length > TEST_OUT_MAX_QUESTIONS || skipped.some((node) => isGatedBranch(section, node.branchId))) {
    return undefined;
  }

  return {
    branchId,
    kind: jumpNodeId || before.length ? "jump" : "unit",
    lessons: skipped.flatMap((node) => node.lessonIds).map((lessonId) => LESSONS_BY_ID[lessonId]).filter(Boolean),
    nodeIds: skipped.map((node) => node.id),
    ...(jumpNodeId ? { jumpNodeId } : {})
  };
}

// The locked circles of a topic that JUMP HERE can open: a plan that skips at most 10 circles, with a question
// about each. The path shows JUMP HERE on these only.
export function getJumpNodeIds(user: UserProfile, topicId: TopicId) {
  const ids = new Set<string>();
  const section = COURSE.sections.find((item) => item.topicId === topicId);
  const done = new Set(user.completedNodeIds);

  for (const node of section?.nodes ?? []) {
    const plan = done.has(node.id) ? undefined : getTestOutPlan(user, node.branchId, node.id);

    if (plan && canTestOut(plan.lessons)) {
      ids.add(node.id);
    }
  }

  return ids;
}

// The circles still to do before a unit's first circle opens (same rule as getPathNodes). In a topic taught in
// order: every circle of the units before it. In a library topic: none, as every unit but a gated one opens on its
// own, and a gated unit has no test-out. Units the learner cannot open (premium) are left out.
function circlesBeforeUnit(section: LearningSection, unitIndex: number, done: Set<string>, opens: (branchIndex: number) => boolean): LearningNode[] {
  if (LIBRARY_TOPICS.has(section.topicId)) {
    return [];
  }

  return section.branches
    .slice(0, unitIndex)
    .flatMap((branch, index) => (opens(index) ? section.nodes.filter((node) => node.branchId === branch.id && !done.has(node.id)) : []));
}

// A unit for older learners: its circles are taught one by one, never skipped by a test.
function isGatedBranch(section: LearningSection, branchId: string) {
  return Boolean(section.branches.find((branch) => branch.id === branchId)?.gated);
}

type TestOutPick = { lesson: Lesson; challenge: Challenge };

// Questions spread over every lesson the test skips, each lesson's own, no prompt asked twice, and a mix of
// kinds (fill the gap, true or false, which comes first...). A question whose right answer shares most of its
// words with the prompt can be matched without knowing the unit, so it is never asked. Asked only when nothing
// else is left: a question another one gives away, one that only makes sense inside its own lesson ("What does
// this step teach?"), a review copy of another lesson's question, and (on a retry) one the last try asked.
// Each `attempt` starts from other lessons and other questions, so TRY AGAIN is a new test.
export function pickTestOutChallenges(lessons: Lesson[], attempt = 0): TestOutPick[] {
  const picks: TestOutPick[] = [];

  if (!lessons.length) {
    return picks;
  }

  const target = Math.min(TEST_OUT_MAX_QUESTIONS, Math.max(TEST_OUT_USUAL_MIN_QUESTIONS, lessons.length));
  const order = spreadLessonOrder(lessons.length, target, attempt);
  const lastPicks = attempt > 0 ? pickTestOutChallenges(lessons, attempt - 1) : [];
  const lastTry = new Set(lastPicks.map((pick) => pick.challenge));
  const perLesson = new Map<Lesson, number>();
  const prompts = new Set<string>();
  const kinds = new Map<string, number>();
  const gives = (challenge: Challenge) => picks.some((pick) => givesAway(challenge, pick.challenge));
  // Tier 0: the best questions. Tier 1: may repeat the last try. Tier 2: anything that is not word matching.
  const fits = (challenge: Challenge, tier: number) =>
    !prompts.has(normalizedPrompt(challenge)) &&
    !answerShowsInText(challenge) &&
    (tier >= 2 || (!challenge.isReview && !isContextBound(challenge.prompt) && !gives(challenge))) &&
    (tier >= 1 || !lastTry.has(challenge));
  const choose = (lesson: Lesson, tier: number) => {
    const count = lesson.challenges.length;
    let best: Challenge | undefined;
    let bestScore = Number.POSITIVE_INFINITY;

    lesson.challenges.forEach((challenge, index) => {
      if (!fits(challenge, tier)) {
        return;
      }

      // The kind asked least so far first (a true or false counts a little extra: a guess is right half the
      // time), then each attempt's own turn through the lesson's questions.
      const kindScore = (kinds.get(questionKind(challenge)) ?? 0) * 2 + (challenge.type === "true_false" ? 1 : 0);
      const score = kindScore * count + ((index - (attempt % count) + count) % count);

      if (score < bestScore) {
        best = challenge;
        bestScore = score;
      }
    });

    return best;
  };
  const rounds = Math.max(...lessons.map((lesson) => lesson.challenges.length));

  // Every lesson gives one question before any gives a second, from the best tier it has.
  for (let round = 0; round < rounds && picks.length < target; round += 1) {
    for (let tier = 0; tier <= 2 && picks.length < target; tier += 1) {
      for (const index of order) {
        const lesson = lessons[index];

        if (picks.length >= target || (perLesson.get(lesson) ?? 0) > round) {
          continue;
        }

        const challenge = choose(lesson, tier);

        if (challenge) {
          picks.push({ lesson, challenge });
          perLesson.set(lesson, (perLesson.get(lesson) ?? 0) + 1);
          prompts.add(normalizedPrompt(challenge));
          kinds.set(questionKind(challenge), (kinds.get(questionKind(challenge)) ?? 0) + 1);
        }
      }
    }
  }

  // In path order, so the test walks through the unit; a retry starts somewhere else, never on the question
  // the last try opened with.
  const position = new Map(lessons.map((lesson, index) => [lesson, index]));
  const inOrder = picks.sort((left, right) => (position.get(left.lesson) ?? 0) - (position.get(right.lesson) ?? 0));
  const turned = rotate(inOrder, attempt % Math.max(1, inOrder.length));

  return turned.length > 1 && turned[0].challenge === lastPicks[0]?.challenge ? rotate(turned, 1) : turned;
}

// The lessons a test asks about: one of their own questions, not only a review copy of another lesson's. A
// review circle has nothing but copies of its unit's questions, so asking one of those asks about it.
function askedLessons(picks: TestOutPick[], lessons: Lesson[]) {
  const prompts = new Set(picks.map((pick) => normalizedPrompt(pick.challenge)));

  return new Set(
    lessons.filter((lesson) =>
      lesson.challenges.some((challenge) => !challenge.isReview)
        ? picks.some((pick) => pick.lesson === lesson && !pick.challenge.isReview)
        : lesson.challenges.some((challenge) => prompts.has(normalizedPrompt(challenge)))
    )
  );
}

// A test-out is offered only when it asks about every lesson it would mark done, with at least 3 questions.
export function canTestOut(lessons: Lesson[]) {
  const picks = pickTestOutChallenges(lessons);
  const asked = askedLessons(picks, lessons);

  return picks.length >= TEST_OUT_MIN_QUESTIONS && lessons.every((lesson) => asked.has(lesson));
}

// Passing completes the lessons in `lessons` (a plan from getTestOutPlan), locked ones included: every one the
// test asked about, which canTestOut makes all of them. `attempt` counts the tries from 0: TRY AGAIN passes the
// next one for other questions, in another order. `jumpNodeId` is the plan's, so TRY AGAIN can ask for it again.
export function createTestOutSession(input: {
  branchTitle: string;
  branchId: string;
  lessons: Lesson[];
  nodeIds: string[];
  heartsAtStart: number;
  attempt?: number;
  jumpNodeId?: string;
}): LessonSession {
  const attempt = Math.max(0, Math.floor(input.attempt ?? 0));
  const picks = pickTestOutChallenges(input.lessons, attempt);
  const asked = askedLessons(picks, input.lessons);
  const targetLessons = input.lessons.filter((lesson) => asked.has(lesson));
  const targetNodes = new Set(targetLessons.map((lesson) => findNodeByLessonId(lesson.id)?.id ?? lesson.nodeId));
  const prepared = new Map<string, Lesson>();
  const challenges = picks.map(({ lesson, challenge }, index) => {
    const full = prepared.get(lesson.id) ?? prepareLessonForSession(lesson);
    prepared.set(lesson.id, full);
    const base = full.challenges.find((item) => item.id === challenge.id) ?? challenge;

    return {
      ...base,
      id: `test_out_${input.branchId}_${index}_${base.id}`,
      choices: shuffleChoicesForAttempt(base, attempt),
      // A test asks what the unit teaches; it is not a review of another lesson.
      isReview: false,
      sourceNodeId: base.sourceNodeId ?? lesson.nodeId,
      sourceLessonId: base.sourceLessonId ?? lesson.id,
      miniLesson: base.miniLesson ?? lesson.explanationContent ?? lesson.intro,
      reviewSuggestion: base.reviewSuggestion ?? `Review ${lesson.title}`
    };
  });
  const uniqueSources = uniqueById(Array.from(prepared.values()).flatMap((lesson) => lesson.sources));
  // What the lessons it asked about, and so marks done, would pay: the most a pass pays (getTestOutXp).
  const xpReward = targetLessons.reduce((total, lesson) => total + lesson.xpReward, 0);

  return {
    id: `session_test_out_${input.branchId}_${attempt}_${Date.now()}`,
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
    isTest: true,
    attempt,
    clusterTitle: input.branchTitle,
    targetNodeIds: input.nodeIds.filter((nodeId) => targetNodes.has(nodeId)),
    targetLessonIds: targetLessons.map((lesson) => lesson.id),
    passingScore: testOutPassingScore(challenges.length),
    ...(input.jumpNodeId ? { jumpNodeId: input.jumpNodeId } : {})
  };
}

// Lesson indexes to draw from, spread over the whole unit: `target` evenly spaced ones (shifted on each
// attempt), then the rest, so a lesson with nothing to ask hands its turn to another.
function spreadLessonOrder(length: number, target: number, attempt: number) {
  const all = Array.from({ length }, (_, index) => index);

  if (length <= target) {
    return rotate(all, attempt % length);
  }

  const shift = (attempt * 0.618034) % 1;
  const spaced = Array.from(new Set(Array.from({ length: target }, (_, index) => Math.floor(((index + shift) * length) / target))));

  return [...spaced, ...all.filter((index) => !spaced.includes(index))];
}

// A retry shows the choices in another order (True and False stay put). Each try moves every question's
// choices by its own step, so no two tries in a row look the same.
function shuffleChoicesForAttempt(challenge: Challenge, attempt: number) {
  const count = challenge.choices.length;

  if (attempt === 0 || count < 2 || challenge.type === "true_false") {
    return challenge.choices;
  }

  const step = 1 + (Math.abs(hashCode(challenge.id)) % (count - 1));

  return rotate(challenge.choices, (attempt * step) % count);
}

function rotate<T>(items: T[], by: number) {
  return by ? [...items.slice(by), ...items.slice(0, by)] : items;
}

function normalizedPrompt(challenge: Challenge) {
  return challenge.prompt.trim().toLowerCase();
}

// What kind of question it is, to mix them: true or false, fill the gap, or the prompt's opening words
// with any quoted line left out ("which comes", "how many", "who was").
function questionKind(challenge: Challenge) {
  if (challenge.type === "true_false") {
    return "true_false";
  }

  if (/_{2,}/.test(challenge.prompt)) {
    return "fill";
  }

  return challenge.prompt
    .replace(/[“"][^”"]*[”"]/g, " ")
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter(Boolean)
    .slice(0, 2)
    .join(" ");
}

// Small words, Arabic name links and question words carry no meaning of their own for matching.
const MATCH_STOP_WORDS = new Set([
  "a", "about", "after", "al", "an", "and", "are", "as", "at", "be", "bin", "bint", "by", "can", "did", "do", "does",
  "for", "from", "had", "has", "have", "he", "her", "his", "how", "ibn", "in", "into", "is", "it", "its", "my", "no",
  "not", "of", "on", "or", "our", "she", "that", "the", "their", "them", "they", "this", "to", "was", "we", "were",
  "what", "when", "where", "which", "who", "why", "will", "with", "you", "your"
]);
const matchWordCache = new Map<string, string[]>();

// Lower case words without accents, with a light stem, so "Rinsing" matches "Rinse" and "breaks" matches "break".
function matchWords(text: string) {
  const cached = matchWordCache.get(text);

  if (cached) {
    return cached;
  }

  const words = Array.from(new Set(
    text
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/['’`ʿʾ]/g, "")
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 1 && !MATCH_STOP_WORDS.has(word))
      .map((word) => {
        const stem = word.replace(/(ings|ing|ed|es|s|e)$/, "");
        return stem.length >= 3 ? stem : word;
      })
  ));

  matchWordCache.set(text, words);
  return words;
}

// True when `text` (the question's own prompt unless given) points at the right answer by its words alone:
// most of the answer's words are in it, and no wrong choice shares as many. True or false never counts.
export function answerShowsInText(challenge: Challenge, text = challenge.prompt) {
  const right = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId);

  if (challenge.type === "true_false" || !right) {
    return false;
  }

  const textWords = new Set(matchWords(text));
  const share = (label: string) => {
    const words = matchWords(label);
    return words.length ? words.filter((word) => textWords.has(word)).length / words.length : 0;
  };
  const rightShare = share(right.label);

  return rightShare >= 0.5 && challenge.choices.every((choice) => choice.id === right.id || share(choice.label) < rightShare);
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

// A question that only makes sense inside its own lesson cannot be asked anywhere else (a review, a test-out):
// one that names a thing only by the lesson around it ("this lesson", "that list", "these steps"), opens on
// someone or something it never names ("It begins: ...", "Its last ayahs ..."), or says "here".
const CONTEXT_BOUND_PROMPT = new RegExp(
  [
    String.raw`\b(this|these|those) (lessons?|steps?|story|stories|unit|branch|card|hadith|narrations?|ayahs?|verses?|surahs?|lists?|parts?|sayings?|quotes?|lines?|text|rules?|events?|moment|time|place|man|woman|boy|girl|person|people|companions?|prophets?)\b`,
    String.raw`\bthat (lesson|step|story|unit|card|hadith|narration|ayah|verse|surah|list|saying|quote|line)\b`,
    String.raw`^\W*(it|its|he|his|him|she|her|they|their|them)\b`,
    String.raw`\bhere\b`
  ].join("|"),
  "i"
);
// "...when he said this?", "Why did she do that?": a pointer at something outside the question, unless the
// question holds the quote it means ("“...” What is this about?").
const POINTS_OUTSIDE = /\b(this|that|these|those)\W*$|\b(said|say|says|did|do|does|meant|mean|means|told|tell) (this|these|those)\b/i;
const HOLDS_QUOTE = /[“"][^”"]{4,}[”"]/;
// "he said", "she told" with no one named before it.
const UNNAMED_SPEAKER = /\b(he|she|they) (said|says|told|asked|did|does)\b/i;
// Capitalised words that start a sentence without naming anyone.
const OPENING_WORDS = new Set(["a", "after", "an", "and", "as", "at", "before", "but", "how", "if", "in", "on", "once", "so", "the", "then", "what", "when", "where", "which", "while", "who", "why"]);

export function isContextBound(prompt: string) {
  if (CONTEXT_BOUND_PROMPT.test(prompt) || (!HOLDS_QUOTE.test(prompt) && POINTS_OUTSIDE.test(prompt))) {
    return true;
  }

  const speaker = UNNAMED_SPEAKER.exec(prompt);
  const before = speaker ? prompt.slice(0, speaker.index) : "";
  // A name before it ("Umar ...", "When Musa ...", "the Prophet ﷺ") says who it is.
  const named = before.includes("ﷺ") || (before.match(/[A-Za-z'’-]+/g) ?? []).some((word, index) => /^[A-Z]/.test(word) && (index > 0 || !OPENING_WORDS.has(word.toLowerCase())));

  return Boolean(speaker) && !named;
}

// What a question puts on screen: its prompt, and its right answer on the feedback sheet.
function shownText(challenge: Challenge) {
  return `${challenge.prompt} ${rightLabel(challenge)}`;
}

function rightLabel(challenge: Challenge) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
}

// One question hands the other its answer, or both have the same answer (not True or False): asking both in
// one lesson or test means answering the same thing twice.
function givesAway(left: Challenge, right: Challenge) {
  const sameAnswer =
    left.type !== "true_false" && right.type !== "true_false" && squash(rightLabel(left)) !== "" && squash(rightLabel(left)) === squash(rightLabel(right));

  return sameAnswer || answerShowsInText(left, shownText(right)) || answerShowsInText(right, shownText(left));
}

// Lower case letters and digits only, accents dropped: "Al-'Adiyat" is "aladiyat".
function squash(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

// Topics where each circle teaches its own text, so the circle before is about another surah or hadith.
const OWN_TEXT_TOPICS: ReadonlySet<TopicId> = new Set<TopicId>(["quran_tafseer", "hadith"]);
// A hadith question that asks what was said or done in it, not a fact that stands on its own.
const ABOUT_THE_TEXT = /ﷺ|\b(prophet|messenger|hadith|narration|said|says|told|tell|advised|warned)\b/i;

// A question copied from another surah or hadith must say which one it is about: a surah by its name, a
// hadith by its lesson's title words ("...to hold on to Allah's Book?"). A hadith question that only asks a
// fact ("Who is truly strong?") reads right anywhere. Two lessons of one surah (Al-Kahf) share a subject.
function readsRightIn(challenge: Challenge, source: Lesson, lesson: Lesson, topicId: TopicId) {
  if (!OWN_TEXT_TOPICS.has(topicId)) {
    return true;
  }

  if (topicId === "quran_tafseer") {
    const surah = (item: Lesson) => squash(item.surahName ?? item.title.replace(/^surah\s+/i, ""));
    return surah(source) === surah(lesson) || squash(challenge.prompt).includes(surah(source));
  }

  if (!ABOUT_THE_TEXT.test(challenge.prompt)) {
    return true;
  }

  const promptWords = new Set(matchWords(challenge.prompt));
  const titleWords = matchWords(source.title);

  return titleWords.length > 0 && titleWords.filter((word) => promptWords.has(word)).length / titleWords.length >= 0.5;
}

function buildReviewChallenge(lesson: Lesson, node: LearningNode): Challenge | undefined {
  const ownPrompts = new Set(lesson.challenges.map((challenge) => challenge.prompt.trim().toLowerCase()));
  // It must read right in this lesson, and not repeat one of its questions or their answers. Nor may it ask
  // the same line as one of them, or be handed its answer by one of them (a prompt or Why line that names it):
  // "... his Islam at the ____." after "... his Islam at the market.", whose Why line names the Ka'bah.
  const usableIn = (source: Lesson) =>
    source.challenges.filter(
      (challenge) =>
        !isContextBound(challenge.prompt) &&
        !ownPrompts.has(challenge.prompt.trim().toLowerCase()) &&
        !lesson.challenges.some(
          (own) => givesAway(challenge, own) || asksSameLine(challenge, own) || namesAnswerOf(own, challenge) || namesAnswerOf(challenge, own)
        ) &&
        readsRightIn(challenge, source, lesson, node.topicId)
    );
  // A lesson of only True/False questions gets a question of another kind, so tapping one button never passes it.
  const onlyTrueFalse = lesson.challenges.every((challenge) => challenge.type === "true_false");
  const varied = (list: Challenge[]) => (onlyTrueFalse ? list.filter((challenge) => challenge.type !== "true_false") : list);
  // The lesson just before first; when none of its questions fits, the one before that, and so on up the unit.
  let previousNode = allNodes.find((item) => item.branchId === node.branchId && node.requiredNodeIds.includes(item.id));
  let previousLesson: Lesson | undefined;
  let usable: Challenge[] = [];
  let fallback: { lesson: Lesson; usable: Challenge[] } | undefined;
  const seen = new Set<string>([node.id]);
  while (previousNode && !seen.has(previousNode.id)) {
    seen.add(previousNode.id);
    const candidate = LESSONS_BY_ID[previousNode.lessonIds[0]];
    const fits = candidate ? usableIn(candidate) : [];
    if (candidate && fits.length && !fallback) fallback = { lesson: candidate, usable: fits };
    if (candidate && varied(fits).length) {
      previousLesson = candidate;
      usable = varied(fits);
      break;
    }
    const current: LearningNode = previousNode;
    previousNode = allNodes.find((item) => item.branchId === node.branchId && current.requiredNodeIds.includes(item.id));
  }
  if (!previousLesson && fallback) {
    previousLesson = fallback.lesson;
    usable = fallback.usable;
  }

  if (!previousLesson || !usable.length) {
    return undefined;
  }

  // The lesson before's own questions first; its review copies of older lessons only when it has nothing else.
  const own = usable.filter((challenge) => !challenge.isReview);
  const pool = own.length ? own : usable;

  const picked = pool[Math.abs(hashCode(lesson.id)) % pool.length];

  return {
    ...picked,
    id: `${lesson.id}_review_${picked.id}`,
    // From another lesson, so the question shows its review cue.
    isReview: true,
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
