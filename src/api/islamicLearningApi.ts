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
  LearningNodeStatus,
  LearningNodeView,
  Lesson,
  LessonSession,
  PremiumStatus,
  ShopItem,
  TopicId,
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
    const premium = isPremiumUser(user);
    // Circles open in path order, so the path shows the order things unlock. A topic taught in order
    // opens one circle: its first not-done one. A library topic opens the next circle of every unit,
    // and only the first of those is "current" (the START bubble). Premium units stay shut to free learners.
    const open = new Map<string, LearningNodeStatus>();

    for (const section of COURSE.sections) {
      const library = LIBRARY_TOPICS.has(section.topicId);
      let hasCurrent = false;

      for (const branch of section.branches) {
        if (branch.premiumOnly && !premium) {
          continue;
        }

        const next = section.nodes.find((node) => node.branchId === branch.id && !completed.has(node.id));

        if (!next) {
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

// A unit test-out asks 3 to 8 questions, whatever the number of lessons it skips: one per lesson, and at
// least 5 when the lessons have them, so one slip still passes. Fewer than 3 is no test.
export const TEST_OUT_MIN_QUESTIONS = 3;
export const TEST_OUT_MAX_QUESTIONS = 8;
const TEST_OUT_USUAL_MIN_QUESTIONS = 5;

// 80% to pass, but never more right answers than there are questions, so a perfect run always passes.
export function testOutPassingScore(questionCount: number) {
  return Math.min(questionCount, Math.max(TEST_OUT_MIN_QUESTIONS, Math.ceil(questionCount * 0.8)));
}

// What a unit's test-out skips. "unit": the circles still to do in it, locked ones too; passing finishes the
// unit. "jump": the unit is still locked in a topic taught in order, so the test covers every circle still to
// do before it (premium units the learner cannot open left out), and passing opens it.
export interface TestOutPlan {
  branchId: string;
  kind: "unit" | "jump";
  lessons: Lesson[];
  nodeIds: string[];
}

// Any unfinished unit the learner may open has a plan, not only the one with the current circle.
// Nothing for a finished unit or a premium unit a free learner cannot open.
export function getTestOutPlan(user: UserProfile, branchId: string): TestOutPlan | undefined {
  const section = COURSE.sections.find((item) => item.branches.some((branch) => branch.id === branchId));
  const unitIndex = section ? section.branches.findIndex((branch) => branch.id === branchId) : -1;

  if (!section || unitIndex < 0) {
    return undefined;
  }

  const premium = isPremiumUser(user);
  const opens = (branchIndex: number) => premium || !section.branches[branchIndex].premiumOnly;
  const done = new Set(user.completedNodeIds);

  if (!opens(unitIndex)) {
    return undefined;
  }

  const unit = section.nodes.filter((node) => node.branchId === branchId && !done.has(node.id));

  if (!unit.length) {
    return undefined;
  }

  // Same rule as getPathNodes: in a topic taught in order the unit opens once every unit before it is done.
  const earlier = new Set(section.branches.slice(0, unitIndex).filter((_, index) => opens(index)).map((branch) => branch.id));
  const before = LIBRARY_TOPICS.has(section.topicId) ? [] : section.nodes.filter((node) => earlier.has(node.branchId) && !done.has(node.id));
  const skipped = before.length ? before : unit;

  return {
    branchId,
    kind: before.length ? "jump" : "unit",
    lessons: skipped.flatMap((node) => node.lessonIds).map((lessonId) => LESSONS_BY_ID[lessonId]).filter(Boolean),
    nodeIds: skipped.map((node) => node.id)
  };
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
  // What a question puts on screen: its prompt, and its right answer on the feedback sheet.
  const shown = (challenge: Challenge) =>
    `${challenge.prompt} ${challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? ""}`;
  const gives = (challenge: Challenge) =>
    picks.some((pick) => answerShowsInText(challenge, shown(pick.challenge)) || answerShowsInText(pick.challenge, shown(challenge)));
  // Tier 0: the best questions. Tier 1: may repeat the last try. Tier 2: anything that is not word matching.
  const fits = (challenge: Challenge, tier: number) =>
    !prompts.has(normalizedPrompt(challenge)) &&
    !answerShowsInText(challenge) &&
    (tier >= 2 || (!challenge.isReview && !CONTEXT_BOUND_PROMPT.test(challenge.prompt) && !gives(challenge))) &&
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

// Too few questions to tell whether the learner knows the unit: no test-out then.
export function canTestOut(lessons: Lesson[]) {
  return pickTestOutChallenges(lessons).length >= TEST_OUT_MIN_QUESTIONS;
}

// Passing completes every lesson in `lessons` (a plan from getTestOutPlan), locked ones included.
// `attempt` counts the tries from 0: TRY AGAIN passes the next one for other questions, in another order.
export function createTestOutSession(input: {
  branchTitle: string;
  branchId: string;
  lessons: Lesson[];
  nodeIds: string[];
  heartsAtStart: number;
  attempt?: number;
}): LessonSession {
  const attempt = Math.max(0, Math.floor(input.attempt ?? 0));
  const picks = pickTestOutChallenges(input.lessons, attempt);
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
  // What the lessons it asked about pay; passing still completes every lesson in `lessons`.
  const xpReward = Array.from(new Set(picks.map((pick) => pick.lesson))).reduce((total, lesson) => total + lesson.xpReward, 0);

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
    targetNodeIds: input.nodeIds,
    targetLessonIds: input.lessons.map((lesson) => lesson.id),
    passingScore: testOutPassingScore(challenges.length)
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

// A question that only makes sense inside its own lesson ("What does this lesson teach?") can't be reused.
const CONTEXT_BOUND_PROMPT = /\bthis (lesson|step|story|unit|branch)\b/i;

function buildReviewChallenge(lesson: Lesson, node: LearningNode): Challenge | undefined {
  const previousNode = allNodes.find((item) => item.branchId === node.branchId && node.requiredNodeIds.includes(item.id));
  const previousLesson = previousNode ? LESSONS_BY_ID[previousNode.lessonIds[0]] : undefined;

  if (!previousLesson) {
    return undefined;
  }

  const ownPrompts = new Set(lesson.challenges.map((challenge) => challenge.prompt.trim().toLowerCase()));
  const usable = previousLesson.challenges.filter(
    (challenge) => !CONTEXT_BOUND_PROMPT.test(challenge.prompt) && !ownPrompts.has(challenge.prompt.trim().toLowerCase())
  );
  // The lesson before's own questions first; its review copies of older lessons only when it has nothing else.
  const own = usable.filter((challenge) => !challenge.isReview);
  const pool = own.length ? own : usable;

  if (!pool.length) {
    return undefined;
  }

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
