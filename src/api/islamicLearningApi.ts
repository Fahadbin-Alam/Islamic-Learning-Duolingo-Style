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
  ShopItem,
  TopicId,
  UserProfile,
  XpSummary
} from "../types";

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
    const firstIncompleteByBranch = new Map(
      COURSE.sections.flatMap((section) =>
        section.branches.map((branch) => [
          branch.id,
          section.nodes.find((node) => node.branchId === branch.id && !completed.has(node.id))
        ] as const)
      )
    );

    return allNodes.map((node) => {
      const isCompleted = completed.has(node.id);
      const prereqsComplete = node.requiredNodeIds.every((id) => completed.has(id));
      const status = isCompleted
        ? "completed"
        : !prereqsComplete
          ? "locked"
          : firstIncompleteByBranch.get(node.branchId)?.id === node.id
            ? "current"
            : "available";

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

    const progressiveLesson = buildProgressiveLesson(lesson);

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
        gainedXp: user.totalXp,
        dailyGoalXp: user.dailyGoalXp,
        date: new Date().toISOString().slice(0, 10),
        streakExtended: user.totalXp >= user.dailyGoalXp,
        totalSessionTime: Math.max(120, user.completedLessonIds.length * 90),
        numSessions: user.completedLessonIds.length
      }
    ];
  }
};

export function refillHeartsForToday(user: UserProfile) {
  const today = new Date().toISOString().slice(0, 10);

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
  const nextXp = alreadyCompleted ? user.totalXp : user.totalXp + lesson.xpReward;

  return {
    ...user,
    totalXp: nextXp,
    streakDays: nextXp >= user.dailyGoalXp ? Math.max(user.streakDays, 1) : user.streakDays,
    completedLessonIds,
    completedNodeIds
  };
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

  return user;
}

export function completeLessonCluster(user: UserProfile, lessons: Lesson[]) {
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

  const nextXp = user.totalXp + gainedXp;

  return {
    ...user,
    totalXp: nextXp,
    streakDays: nextXp >= user.dailyGoalXp ? Math.max(user.streakDays, 1) : user.streakDays,
    completedLessonIds: Array.from(completedLessonIds),
    completedNodeIds: Array.from(completedNodeIds)
  };
}

export function createTestOutSession(input: {
  branchTitle: string;
  branchId: string;
  lessons: Lesson[];
  nodeIds: string[];
  heartsAtStart: number;
}): LessonSession {
  const selectedLessons = input.lessons.slice(0, 5);
  const uniqueSources = uniqueById(selectedLessons.flatMap((lesson) => lesson.sources));
  const challenges = selectedLessons.map((lesson, lessonIndex) => {
    const progressiveLesson = buildProgressiveLesson(lesson);
    const baseChallenge = progressiveLesson.challenges[0];

    if (!baseChallenge) {
      return undefined;
    }

    return {
      ...baseChallenge,
      id: `test_out_${input.branchId}_${lessonIndex}_${baseChallenge.id}`,
      sourceNodeId: baseChallenge.sourceNodeId ?? lesson.nodeId,
      sourceLessonId: baseChallenge.sourceLessonId ?? lesson.id,
      miniLesson: baseChallenge.miniLesson ?? lesson.explanationContent ?? lesson.intro,
      easierExplanation: baseChallenge.easierExplanation ?? `Start with the main teaching from ${lesson.title}.`,
      reviewSuggestion: baseChallenge.reviewSuggestion ?? `Review ${lesson.title}`,
      resourceLabel: baseChallenge.resourceLabel ?? (lesson.sources[0] ? "Open source" : undefined),
      resourceUrl: baseChallenge.resourceUrl ?? lesson.sources[0]?.url
    };
  }).filter(Boolean) as Challenge[];
  const xpReward = selectedLessons.reduce((total, lesson) => total + lesson.xpReward, 0);

  return {
    id: `session_test_out_${input.branchId}_${Date.now()}`,
    lesson: {
      id: `lesson_test_out_${input.branchId}`,
      nodeId: input.nodeIds[0] ?? selectedLessons[0]?.nodeId ?? input.branchId,
      branchId: input.branchId,
      title: input.branchTitle,
      intro: "Prove this lesson stretch and unlock the next group if you pass.",
      explanationContent: "A test-out should feel like real understanding: recognition, application, and correction under a little pressure.",
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
    targetLessonIds: selectedLessons.map((lesson) => lesson.id),
    passingScore: Math.max(3, Math.ceil(challenges.length * 0.8))
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

const TOPIC_DISTRACTOR_BANK: Record<TopicId, string[]> = {
  foundation: [
    "Rush past remembrance and let habits form on their own",
    "Answer people however you feel without caring about adab",
    "Treat daily Muslim phrases like they do not shape the heart"
  ],
  prayer: [
    "Prayer can begin without any care for purification or order",
    "Wudu is mainly about speed, not about following the taught steps",
    "Preparation for salah matters less than how confident someone feels"
  ],
  aqidah: [
    "Belief stays healthy even when revelation is treated like a background detail",
    "Tawhid can stay theoretical without shaping worship or reliance",
    "Clear belief matters less than spiritual mood"
  ],
  fasting: [
    "The point of fasting is mainly hunger and public discipline",
    "Protecting the stomach matters more than protecting the tongue",
    "Ramadan is mostly a schedule change and not a training season"
  ],
  zakat: [
    "Zakat works best when it follows personal preference instead of revealed categories",
    "The inner state of the giver matters less than just moving money out",
    "Wealth grows purer when its duties stay vague"
  ],
  hajj: [
    "The meaning of Hajj matters less than travel logistics and atmosphere",
    "The rites are strongest when sequence stays loose",
    "Pilgrimage is mainly memory-making rather than submission"
  ],
  manners: [
    "Good character only matters when other people are watching",
    "Family rights are less important than winning arguments",
    "Mercy can be skipped if someone annoys you"
  ],
  marriage: [
    "A home succeeds mainly through image and status",
    "Kindness matters outside the home more than inside it",
    "Marriage works best when mercy is treated as optional"
  ],
  sahabah: [
    "The companions are remembered mainly for wealth and comfort",
    "Their stories matter as history but not for character",
    "Courage in Islam means acting without guidance"
  ],
  prophets: [
    "The prophets teach disconnected stories with no shared lessons",
    "Tests are signs that trust in Allah should be abandoned",
    "Sacred history matters less than personal preference"
  ],
  women_of_the_book: [
    "These women are remembered mostly for status without sacrifice",
    "Their stories are admired but not meant to shape Muslim character",
    "Revelation honors them without giving believers any lesson to follow"
  ],
  quran_tafseer: [
    "The Quran is best approached without reflection or explanation",
    "Verses should be memorized but never connected to life",
    "Tafsir matters less than quick guesses about meaning"
  ]
};

function buildProgressiveLesson(lesson: Lesson): Lesson {
  const node = findNodeByLessonId(lesson.id);

  if (!node) {
    return lesson;
  }

  const tier = getLessonTier(node);
  const baseChallenges = lesson.challenges.map((challenge, index) =>
    widenChallengeChoices(challenge, node.topicId, lesson.id, index, tier)
  );
  const extraChallenges: Challenge[] = [];

  if (tier !== "easy") {
    extraChallenges.push(buildSourceReferenceChallenge(lesson, node, tier));
  }

  if (tier === "hard") {
    extraChallenges.push(buildSynthesisChallenge(lesson, node));
  }

  return {
    ...lesson,
    xpReward: lesson.xpReward + extraChallenges.length * 2,
    challenges: [...baseChallenges, ...extraChallenges]
  };
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

function widenChallengeChoices(
  challenge: Challenge,
  topicId: TopicId,
  lessonId: string,
  index: number,
  tier: LessonTier
): Challenge {
  if (challenge.type !== "multiple_choice" || tier === "easy" || challenge.choices.length >= 4) {
    return challenge;
  }

  const distractor = pickExtraDistractor(topicId, challenge.choices.map((choice) => choice.label), lessonId, index);

  if (!distractor) {
    return challenge;
  }

  return {
    ...challenge,
    choices: [...challenge.choices, { id: `extra_${challenge.id}`, label: distractor }]
  };
}

function pickExtraDistractor(topicId: TopicId, existingLabels: string[], lessonId: string, index: number) {
  const bank = TOPIC_DISTRACTOR_BANK[topicId];

  if (!bank?.length) {
    return undefined;
  }

  const start = Math.abs(hashCode(`${lessonId}:${index}`)) % bank.length;

  for (let offset = 0; offset < bank.length; offset += 1) {
    const candidate = bank[(start + offset) % bank.length];

    if (!existingLabels.includes(candidate)) {
      return candidate;
    }
  }

  return undefined;
}

function buildSourceReferenceChallenge(lesson: Lesson, node: LearningNode, tier: LessonTier): Challenge {
  const correctSource = lesson.sources[0];
  const distractors = getReferenceDistractors(lesson.id, correctSource.reference ?? correctSource.title, 2);

  return {
    id: `${lesson.id}_sources_${tier}`,
    type: "multiple_choice",
    prompt: tier === "medium"
      ? "Which reference is actually used in this lesson?"
      : "Which reference best anchors this lesson's evidence?",
    choices: [
      { id: "a", label: correctSource.reference ?? correctSource.title },
      { id: "b", label: distractors[0] ?? "A source from a different lesson" },
      { id: "c", label: distractors[1] ?? "A source that belongs somewhere else" }
    ],
    correctChoiceId: "a",
    sourceNodeId: lesson.nodeId,
    sourceLessonId: lesson.id,
    explanation:
      tier === "medium"
        ? "Later lessons start asking you to notice the evidence, not only the headline."
        : `This lesson is now asking you to connect the idea to its proof in ${node.title}.`,
    miniLesson: `Evidence matters. This lesson is anchored to ${correctSource.reference ?? correctSource.title}.`,
    easierExplanation: `Look for the source that actually belongs to ${lesson.title}.`,
    reviewSuggestion: `Review the evidence used in ${lesson.title}`,
    resourceLabel: "Open source",
    resourceUrl: correctSource.url
  };
}

function buildSynthesisChallenge(lesson: Lesson, node: LearningNode): Challenge {
  return {
    id: `${lesson.id}_synthesis`,
    type: "multiple_choice",
    prompt: "Which summary best brings this whole lesson together?",
    choices: [
      { id: "a", label: buildLessonSummary(lesson) },
      { id: "b", label: "Revelation matters less than opinion, so practice can be improvised freely" },
      { id: "c", label: "The main goal is to memorize isolated facts without letting them shape character" },
      { id: "d", label: `The lesson on ${node.title} is mostly about historical trivia instead of guidance` }
    ],
    correctChoiceId: "a",
    sourceNodeId: lesson.nodeId,
    sourceLessonId: lesson.id,
    explanation: "The harder lessons now ask for synthesis: not just what happened, but what the believer should carry from it.",
    miniLesson: buildLessonSummary(lesson),
    easierExplanation: `Pick the summary that stays closest to the real teaching of ${lesson.title}.`,
    reviewSuggestion: `Review the main point of ${lesson.title}`,
    resourceLabel: lesson.sources[0] ? "Open source" : undefined,
    resourceUrl: lesson.sources[0]?.url
  };
}

function buildLessonSummary(lesson: Lesson) {
  const intro = lesson.intro.trim();

  if (intro.length <= 88) {
    return intro;
  }

  const shortened = intro.slice(0, 85).trimEnd();
  return shortened.endsWith(".") ? shortened : `${shortened}...`;
}

function getReferenceDistractors(lessonId: string, correctReference: string, count: number) {
  const references = Object.values(LESSONS_BY_ID)
    .filter((item) => item.id !== lessonId)
    .flatMap((item) => item.sources.map((source) => source.reference ?? source.title))
    .filter((reference) => reference !== correctReference);
  const picked: string[] = [];
  const start = Math.abs(hashCode(lessonId)) % Math.max(1, references.length);

  for (let offset = 0; offset < references.length && picked.length < count; offset += 1) {
    const candidate = references[(start + offset) % references.length];

    if (!picked.includes(candidate)) {
      picked.push(candidate);
    }
  }

  return picked;
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
