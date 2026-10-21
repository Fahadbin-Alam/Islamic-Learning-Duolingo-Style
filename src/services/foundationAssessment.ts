import {
  FOUNDATION_CATEGORY_META,
  FOUNDATION_CATEGORY_ORDER,
  FOUNDATION_PROGRESS_LABELS,
  FOUNDATION_QUESTION_BANK,
  FOUNDATION_QUESTIONS_BY_CATEGORY
} from "../data/foundationQuestionBank";
import type {
  AssessmentAnswerRecord,
  AssessmentFeedback,
  DifficultyTier,
  FoundationAssessmentState,
  FoundationCategoryId,
  FoundationQuestion,
  LearnerBand,
  LearnerCategoryProfile,
  LearnerProfile,
  LearnerReadinessLabel,
  SupportedLanguage,
  UserProfile
} from "../types";
import { translateStudyText } from "./contentLocalization";

// One question per skill: the level check is 10 questions, short enough for a young learner.
const PLACEMENT_QUESTIONS_PER_CATEGORY = 1;
const PLACEMENT_EXTRA_QUESTIONS = 0;
const DAILY_CHALLENGE_SIZE = 6;
const REVIEW_SESSION_SIZE = 6;
const SKILL_PRACTICE_SIZE = 5;
const WORD_BANK_SIZE = 4;
// About the last three sessions: their questions wait until the others have had a turn.
const RECENT_ANSWERS = 30;

// A wrong word in a word bank is never a name of Allah or of the Prophet, peace be upon him.
const SACRED_WORDS = /\b(allah|god|lord|rabb|rahman|rahim|muhammad|ahmad|prophet|messenger|rasul)\b/;

/** One planned question: a set question (Review asks the missed ones) or a skill to pick one from. */
export type FoundationPlanStep = { questionId: string } | { category: FoundationCategoryId };

/**
 * What a review, daily challenge or skill practice asks, worked out once at the start so it does not
 * drift as the profile changes after each answer. A missed question is added to `retryIds` and asked
 * once more after the planned ones.
 */
export type FoundationSessionPlan = {
  steps: FoundationPlanStep[];
  retryIds: string[];
  /** Set when the session practices one skill (a "Practice next" chip). */
  focus?: FoundationCategoryId;
};

/** A session's state with its plan. The app keeps it as a FoundationAssessmentState; the plan rides along. */
export type FoundationSessionState = FoundationAssessmentState & { plan?: FoundationSessionPlan };

/** The plan of a review, daily challenge or skill practice. The level check has none. */
export function getSessionPlan(state: FoundationAssessmentState): FoundationSessionPlan | undefined {
  return (state as FoundationSessionState).plan;
}

/** True when the current question was already answered earlier in this session: a missed one asked again. */
export function isRetryQuestion(state: FoundationAssessmentState) {
  // After CHECK the last answer is the current one, so it does not count.
  const earlier = state.feedback ? state.answerHistory.slice(0, -1) : state.answerHistory;
  return earlier.some((answer) => answer.questionId === state.currentQuestion.id);
}

/**
 * The counter and bar a session shows. `total` is what the session promised at the start: a missed question
 * asked again does not add to it, it shows its "Try again!" chip at the last number. `done` counts the questions
 * finished (right, or missed on their second try; the level check asks each once), so the bar never moves back.
 */
export function getSessionProgress(state: FoundationAssessmentState) {
  const plan = getSessionPlan(state);
  const total = Math.max(1, plan ? plan.steps.length : state.totalQuestions);
  const seen = new Set<string>();
  let done = 0;

  for (const answer of state.answerHistory) {
    if (!plan || answer.isCorrect || seen.has(answer.questionId)) {
      done += 1;
    }
    seen.add(answer.questionId);
  }

  return { number: Math.min(state.questionNumber, total), total, done: Math.min(done, total) };
}

/** The screen no longer asks "How sure?"; 0 means "not asked" and the answer itself sets the confidence. */
export const CONFIDENCE_NOT_ASKED = 0;

// Free-text reflections cannot be marked right or wrong, so they never appear in a scored session.
const UNSCORED_TYPES = new Set<FoundationQuestion["type"]>(["reflection_prompt", "confidence_check"]);

function isScored(question: FoundationQuestion) {
  return !UNSCORED_TYPES.has(question.type);
}

export function createEmptyCategoryProfile(): LearnerCategoryProfile {
  return {
    accuracyPercentage: 0,
    currentEstimatedDifficulty: 1,
    confidenceScore: 0,
    streakConsistency: 0,
    questionsAttempted: 0,
    questionsAnsweredCorrectly: 0,
    weaknessTags: [],
    recentMistakeQuestionIds: [],
    averageResponseTimeMs: 0,
    readinessLabel: "New learner"
  };
}

export function createEmptyLearnerProfile(): LearnerProfile {
  return {
    overall_level: "beginner",
    readiness_label: "New learner",
    assessmentCompleted: false,
    category_levels: FOUNDATION_CATEGORY_ORDER.reduce<Record<FoundationCategoryId, LearnerCategoryProfile>>((map, category) => {
      map[category] = createEmptyCategoryProfile();
      return map;
    }, {} as Record<FoundationCategoryId, LearnerCategoryProfile>),
    weak_areas: [],
    strong_areas: [],
    needs_review_question_ids: [],
    assessmentHistory: [],
    totalQuestionsAnswered: 0,
    dailyChallengeQuestionIds: []
  };
}

export function ensureLearnerProfile(user: UserProfile): UserProfile {
  return user.learnerProfile
    ? user
    : {
        ...user,
        learnerProfile: createEmptyLearnerProfile()
      };
}

export function getFoundationQuestionById(questionId: string) {
  return FOUNDATION_QUESTION_BANK.find((question) => question.id === questionId);
}

export function localizeFoundationQuestion(question: FoundationQuestion, language: SupportedLanguage): FoundationQuestion {
  if (language === "en") {
    return question;
  }

  return {
    ...question,
    prompt: translateStudyText(question.prompt, language),
    scenario: question.scenario ? translateStudyText(question.scenario, language) : question.scenario,
    options: question.options?.map((option) => translateStudyText(option, language)),
    correctAnswer: localizeAnswerShape(question.correctAnswer, language),
    acceptedAnswers: question.acceptedAnswers?.map((answer) => translateStudyText(answer, language)),
    pairs: question.pairs?.map((pair) => ({
      left: translateStudyText(pair.left, language),
      right: translateStudyText(pair.right, language)
    })),
    orderItems: question.orderItems?.map((item) => translateStudyText(item, language)),
    explanationShort: translateStudyText(question.explanationShort, language),
    explanationLong: translateStudyText(question.explanationLong, language),
    misconceptionNotes: question.misconceptionNotes.map((note) => translateStudyText(note, language)),
    wrongAnswerNotes: Object.fromEntries(
      Object.entries(question.wrongAnswerNotes ?? {}).map(([key, value]) => [
        translateStudyText(key, language),
        translateStudyText(value, language)
      ])
    ),
    reviewNext: translateStudyText(question.reviewNext, language),
    whyThisMatters: translateStudyText(question.whyThisMatters, language)
  };
}

export function getFoundationDashboard(profile: LearnerProfile) {
  return FOUNDATION_CATEGORY_ORDER.map((category) => {
    const categoryProfile = profile.category_levels[category];
    const mastery = getCategoryMasteryScore(categoryProfile);

    return {
      category,
      title: FOUNDATION_CATEGORY_META[category].title,
      description: FOUNDATION_CATEGORY_META[category].description,
      accentColor: FOUNDATION_CATEGORY_META[category].accentColor,
      mastery,
      profile: categoryProfile
    };
  });
}

export function createFoundationAssessment(
  profile: LearnerProfile,
  mode: FoundationAssessmentState["mode"],
  /** `focus`: practice one skill (a review of that skill's missed questions, then more of it). */
  options: { focus?: FoundationCategoryId } = {}
): FoundationSessionState {
  const plan = buildSessionPlan(profile, mode, options.focus);
  const totalQuestions = plan ? plan.steps.length : getPlacementQuestionCount();
  const currentQuestion = plan ? selectPlannedQuestion(profile, plan, 0, [], [], mode) : selectNextQuestion(profile, [], [], mode, 1);

  if (!currentQuestion) {
    throw new Error("No foundation questions are available for this mode.");
  }

  return {
    mode,
    currentQuestion,
    questionNumber: 1,
    totalQuestions,
    askedQuestionIds: [currentQuestion.id],
    answerHistory: [],
    feedback: undefined,
    selectedAnswer: undefined,
    confidence: CONFIDENCE_NOT_ASKED,
    startedAt: new Date().toISOString(),
    questionStartedAt: Date.now(),
    ...(plan ? { plan } : {})
  };
}

export function submitFoundationAssessmentAnswer(input: {
  profile: LearnerProfile;
  state: FoundationAssessmentState;
  selectedAnswer: string | string[] | Record<string, string>;
  /** 1 to 4. Leave it out (or pass CONFIDENCE_NOT_ASKED) and it follows the answer, as in lessons. */
  confidence?: number;
  responseTimeMs: number;
}) {
  const { profile, state, selectedAnswer, responseTimeMs } = input;
  const question = state.currentQuestion;
  const isCorrect = evaluateFoundationAnswer(question, selectedAnswer);
  const confidence = input.confidence && input.confidence > CONFIDENCE_NOT_ASKED ? input.confidence : isCorrect ? 3 : 2;
  const answerRecord: AssessmentAnswerRecord = {
    questionId: question.id,
    category: question.category,
    difficulty: question.difficulty,
    selectedAnswer,
    isCorrect,
    confidence,
    responseTimeMs,
    answeredAt: new Date().toISOString()
  };
  const nextProfile = applyAnswerToLearnerProfile(profile, question, answerRecord, state.mode);
  const feedback = buildAssessmentFeedback(question, selectedAnswer, isCorrect, confidence);
  // A practice question missed the first time comes back once, after the planned ones. The level check has no plan.
  const plan = getSessionPlan(state);
  const retry = Boolean(plan) && !isCorrect && !isRetryQuestion(state);
  const stateWithFeedback: FoundationSessionState = {
    ...state,
    ...(plan ? { plan: retry ? { ...plan, retryIds: [...plan.retryIds, question.id] } : plan } : {}),
    totalQuestions: state.totalQuestions + (retry ? 1 : 0),
    answerHistory: [...state.answerHistory, answerRecord],
    feedback,
    selectedAnswer,
    confidence
  };

  return {
    nextProfile,
    stateWithFeedback,
    feedback
  };
}

export function advanceFoundationAssessment(
  profile: LearnerProfile,
  state: FoundationAssessmentState
) {
  if (state.questionNumber >= state.totalQuestions) {
    return null;
  }

  const plan = getSessionPlan(state);
  const nextQuestion = plan
    ? selectPlannedQuestion(profile, plan, state.questionNumber, state.askedQuestionIds, state.answerHistory, state.mode)
    : selectNextQuestion(profile, state.askedQuestionIds, state.answerHistory, state.mode, state.questionNumber + 1);

  if (!nextQuestion) {
    return null;
  }

  return {
    ...state,
    currentQuestion: nextQuestion,
    questionNumber: state.questionNumber + 1,
    // A retry is already in the list.
    askedQuestionIds: state.askedQuestionIds.includes(nextQuestion.id) ? state.askedQuestionIds : [...state.askedQuestionIds, nextQuestion.id],
    feedback: undefined,
    selectedAnswer: undefined,
    confidence: CONFIDENCE_NOT_ASKED,
    questionStartedAt: Date.now()
  };
}

/** Level 1 to 5 from the readiness label, for the short "Level 2" pill. */
export function getLearnerLevel(label: LearnerReadinessLabel) {
  return Math.max(0, getProgressMapIndex(label)) + 1;
}

export type FoundationSessionSummary = {
  mode: FoundationAssessmentState["mode"];
  /** Questions right the first time they were asked. */
  correct: number;
  /** Questions asked, each once: the total the counter showed. A missed question asked again is not a new one. */
  answered: number;
  /** Left out until the learner has done the level check, so no screen shows a level the Practice hub does not. */
  level?: number;
  /** Up to three weak skills to practice next, weakest first. */
  practiceNext: FoundationCategoryId[];
};

/** What the end-of-practice screen shows: right answers, the level reached and the skills to practice next. */
export function summarizeFoundationSession(state: FoundationAssessmentState, profile: LearnerProfile): FoundationSessionSummary {
  // The first answer to each question: so 5/6 after one miss, out of the same 6 the counter showed.
  const firstTries = new Map<string, boolean>();
  for (const answer of state.answerHistory) {
    if (!firstTries.has(answer.questionId)) {
      firstTries.set(answer.questionId, answer.isCorrect);
    }
  }
  return {
    mode: state.mode,
    correct: [...firstTries.values()].filter(Boolean).length,
    answered: firstTries.size,
    level: profile.assessmentCompleted ? getLearnerLevel(profile.readiness_label) : undefined,
    practiceNext: weakestFirst(profile, profile.weak_areas).slice(0, 3)
  };
}

/**
 * A finished session as its end screen shows it: the session's answers and the profile after
 * finalizeFoundationAssessment. Plain data, so the app can save it and show the end screen again after a reload.
 */
export type FoundationPracticeResult = { assessment: FoundationAssessmentState; profile: LearnerProfile };

const SESSION_MODES = new Set<FoundationAssessmentState["mode"]>(["placement", "daily_challenge", "review"]);

/** A saved practice result read back from storage, or undefined when it is not one (an old or broken save). */
export function readPracticeResult(value: unknown): FoundationPracticeResult | undefined {
  const saved = value as Partial<FoundationPracticeResult> | null | undefined;
  const assessment = saved?.assessment;
  const profile = saved?.profile;
  if (
    !assessment ||
    !profile ||
    !SESSION_MODES.has(assessment.mode) ||
    !assessment.currentQuestion?.id ||
    !Array.isArray(assessment.answerHistory) ||
    !Array.isArray(assessment.askedQuestionIds) ||
    !profile.category_levels ||
    !Array.isArray(profile.weak_areas) ||
    !profile.weak_areas.every((category) => profile.category_levels[category]) ||
    typeof profile.readiness_label !== "string"
  ) {
    return undefined;
  }
  return { assessment, profile };
}

/** The skills, lowest mastery first (ties keep the given order). */
function weakestFirst(profile: LearnerProfile, categories: FoundationCategoryId[]) {
  return unique(categories).sort(
    (left, right) => getCategoryMasteryScore(profile.category_levels[left]) - getCategoryMasteryScore(profile.category_levels[right])
  );
}

/** Stable shuffle (same order every time for the same seed). */
export function seededShuffle<T>(items: T[], seed: string) {
  const result = [...items];
  let state = hashOf(seed) || 1;
  for (let index = result.length - 1; index > 0; index -= 1) {
    state = (state * 1103515245 + 12345) >>> 0;
    const swap = state % (index + 1);
    [result[index], result[swap]] = [result[swap], result[index]];
  }
  return result;
}

/** The same items rotated by one, so none keeps its place (two items swap). */
export function rotateByOne<T>(items: T[]): T[] {
  return items.length > 1 ? [...items.slice(1), items[0]] : items;
}

function sameOrder(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index]);
}

/**
 * The steps of a put-in-order question to pick from: shuffled, and never already in the right order.
 * A retry (`retry` true) deals them in another order than the first try.
 */
export function getShuffledOrderItems(question: FoundationQuestion, retry = false): string[] {
  const items = question.orderItems ?? [];
  const answer = Array.isArray(question.correctAnswer) ? question.correctAnswer : items;
  const deal = (seed: string, avoid: string[][]) => {
    let shuffled = seededShuffle(items, seed);
    for (let turn = 0; turn < items.length && avoid.some((order) => sameOrder(shuffled, order)); turn += 1) {
      shuffled = rotateByOne(shuffled);
    }
    return shuffled;
  };
  const first = deal(question.id, [answer]);
  return retry && items.length > 2 ? deal(`${question.id}:retry`, [answer, first]) : first;
}

function isSacredWord(word: string) {
  return SACRED_WORDS.test(normalizeText(word));
}

/**
 * Tap-a-word choices for a fill-in-the-blank question. Each question lists its own: words of the same
 * kind as the answer that fit the blank. Without them, other blanks' answers stand in (same skill first),
 * never a name of Allah or of the Prophet. A retry (`retry` true) moves every word to another place.
 */
export function getFoundationWordBank(question: FoundationQuestion, retry = false): string[] {
  if (question.type !== "fill_in_blank" || typeof question.correctAnswer !== "string") {
    return question.options ?? [];
  }
  const answer = question.correctAnswer;
  const accepted = new Set([answer, ...(question.acceptedAnswers ?? [])].map(normalizeText));
  let words: string[];
  if (question.options && question.options.length > 1) {
    words = seededShuffle(question.options, `${question.id}:words`);
  } else {
    const blanks = FOUNDATION_QUESTION_BANK.filter(
      (candidate) => candidate.id !== question.id && candidate.type === "fill_in_blank" && typeof candidate.correctAnswer === "string"
    );
    const pool = [...blanks.filter((candidate) => candidate.category === question.category), ...blanks.filter((candidate) => candidate.category !== question.category)];
    const others = unique(pool.map((candidate) => candidate.correctAnswer as string)).filter(
      (word) => !accepted.has(normalizeText(word)) && !isSacredWord(word)
    );
    words = seededShuffle([answer, ...others.slice(0, WORD_BANK_SIZE - 1)], `${question.id}:words`);
  }
  return retry ? rotateByOne(words) : words;
}

function hashOf(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }
  return hash;
}

export function finalizeFoundationAssessment(
  profile: LearnerProfile,
  mode: FoundationAssessmentState["mode"],
  askedQuestionIds: string[]
) {
  const nextProfile: LearnerProfile = {
    ...profile,
    assessmentCompleted: mode === "placement" ? true : profile.assessmentCompleted,
    lastAssessmentAt: new Date().toISOString(),
    lastDailyChallengeAt: mode === "daily_challenge" ? new Date().toISOString() : profile.lastDailyChallengeAt,
    dailyChallengeQuestionIds: mode === "daily_challenge" ? askedQuestionIds : profile.dailyChallengeQuestionIds
  };

  return recomputeLearnerProfile(nextProfile);
}

export function applyLessonSignalToLearnerProfile(input: {
  profile: LearnerProfile;
  category: FoundationCategoryId;
  signalId: string;
  difficulty: DifficultyTier;
  correct: boolean;
  responseTimeMs: number;
  confidence?: number;
  tags?: string[];
  prompt?: string;
  reviewNext?: string;
}) {
  const question: FoundationQuestion = {
    id: input.signalId,
    category: input.category,
    subtopic: input.tags?.[0] ?? input.category,
    difficulty: input.difficulty,
    type: "multiple_choice",
    prompt: input.prompt ?? "Lesson mastery signal",
    options: ["Correct", "Incorrect"],
    correctAnswer: "Correct",
    explanationShort: "This lesson result updates the learner profile in the background.",
    explanationLong: "The app uses lesson accuracy and consistency to quietly estimate strengths and weak areas over time.",
    misconceptionNotes: ["Review the lesson path again if this concept keeps slipping."],
    tags: unique([input.category, ...(input.tags ?? [])]).slice(0, 6),
    xpReward: 0,
    reviewNext: input.reviewNext ?? FOUNDATION_CATEGORY_META[input.category].title,
    whyThisMatters: "Background adaptive tracking helps future recommendations match the learner's level."
  };
  const answerRecord: AssessmentAnswerRecord = {
    questionId: question.id,
    category: question.category,
    difficulty: question.difficulty,
    selectedAnswer: input.correct ? "Correct" : "Incorrect",
    isCorrect: input.correct,
    confidence: input.confidence ?? (input.correct ? 3 : 2),
    responseTimeMs: input.responseTimeMs,
    answeredAt: new Date().toISOString()
  };

  return applyAnswerToLearnerProfile(input.profile, question, answerRecord, "review");
}

export function getProgressMapIndex(label: LearnerReadinessLabel) {
  return FOUNDATION_PROGRESS_LABELS.findIndex((value) => value === label);
}

/** The level check's length. Review and the daily challenge take theirs from their plan. */
function getPlacementQuestionCount() {
  return Math.min(
    FOUNDATION_QUESTION_BANK.length,
    FOUNDATION_CATEGORY_ORDER.length * PLACEMENT_QUESTIONS_PER_CATEGORY + PLACEMENT_EXTRA_QUESTIONS
  );
}

/** The level check's next question (and any session without a plan): the least covered, weakest skill first. */
function selectNextQuestion(
  profile: LearnerProfile,
  askedQuestionIds: string[],
  answerHistory: AssessmentAnswerRecord[],
  mode: FoundationAssessmentState["mode"],
  nextQuestionNumber: number
) {
  const targetCategories = pickTargetCategories(profile, answerHistory, nextQuestionNumber);
  return (
    pickFromCategories(profile, targetCategories, askedQuestionIds, answerHistory, mode, nextQuestionNumber) ??
    FOUNDATION_QUESTION_BANK.find((question) => !askedQuestionIds.includes(question.id) && isScored(question))
  );
}

/**
 * The questions to leave out, tried in turn while the skill still has others. A daily challenge and the
 * level check ask questions the learner has not seen first, then ones they missed, then ones not asked
 * lately; a review asks missed ones first, then new ones. A question just answered right comes back last.
 */
function skipLists(profile: LearnerProfile, mode: FoundationAssessmentState["mode"], asked: Set<string>) {
  const lastResult = new Map<string, boolean>();
  for (const answer of profile.assessmentHistory) {
    lastResult.set(answer.questionId, answer.isCorrect);
  }
  const missed = new Set(profile.needs_review_question_ids);
  lastResult.forEach((correct, questionId) => {
    if (!correct) missed.add(questionId);
  });
  const seen = [...lastResult.keys(), ...profile.dailyChallengeQuestionIds];
  const answeredRight = seen.filter((questionId) => !missed.has(questionId));
  const recent = [...profile.assessmentHistory.slice(-RECENT_ANSWERS).map((answer) => answer.questionId), ...profile.dailyChallengeQuestionIds];
  const skip = (questionIds: string[]) => new Set([...asked, ...questionIds]);
  return mode === "review" ? [skip(answeredRight), skip(recent), asked] : [skip(seen), skip(answeredRight), skip(recent), asked];
}

/** A question from the first of these skills that has one left that was not asked yet. */
function pickFromCategories(
  profile: LearnerProfile,
  categories: FoundationCategoryId[],
  askedQuestionIds: string[],
  answerHistory: AssessmentAnswerRecord[],
  mode: FoundationAssessmentState["mode"],
  nextQuestionNumber: number
) {
  const passes = skipLists(profile, mode, new Set(askedQuestionIds));

  for (const skip of passes) {
    for (const category of categories) {
      const question = chooseQuestionFromCategory(profile, category, skip, answerHistory, nextQuestionNumber, mode);

      if (question) {
        return question;
      }
    }
  }

  return undefined;
}

/**
 * The question at `index` (0 for the first) of a planned session: the planned question or a question
 * of the planned skill, then the missed ones again, in the order they were missed.
 */
function selectPlannedQuestion(
  profile: LearnerProfile,
  plan: FoundationSessionPlan,
  index: number,
  askedQuestionIds: string[],
  answerHistory: AssessmentAnswerRecord[],
  mode: FoundationAssessmentState["mode"]
) {
  if (index >= plan.steps.length) {
    return getFoundationQuestionById(plan.retryIds[index - plan.steps.length] ?? "");
  }

  const step = plan.steps[index];
  if ("questionId" in step) {
    const planned = getFoundationQuestionById(step.questionId);
    if (planned && !askedQuestionIds.includes(planned.id)) {
      return planned;
    }
  }

  // Stay on the planned skill while it has questions left; only then borrow from the other skills.
  const category = "category" in step ? step.category : getFoundationQuestionById(step.questionId)?.category;
  const others = FOUNDATION_CATEGORY_ORDER.filter((candidate) => candidate !== category);
  return (
    (category ? pickFromCategories(profile, [category], askedQuestionIds, answerHistory, mode, index + 1) : undefined) ??
    pickFromCategories(profile, others, askedQuestionIds, answerHistory, mode, index + 1) ??
    FOUNDATION_QUESTION_BANK.find((question) => !askedQuestionIds.includes(question.id) && isScored(question))
  );
}

/** Missed questions that can still be asked, latest miss first. */
function missedQuestionIds(profile: LearnerProfile) {
  return unique(profile.needs_review_question_ids).filter((questionId) => {
    const question = getFoundationQuestionById(questionId);
    return Boolean(question && isScored(question));
  });
}

/** Weak skills first (weakest first), then the others, least practiced first, so a replay moves on to new skills. */
function rankSkillsForPractice(profile: LearnerProfile) {
  const weak = weakestFirst(profile, profile.weak_areas);
  const attempted = (category: FoundationCategoryId) => profile.category_levels[category].questionsAttempted;
  const others = FOUNDATION_CATEGORY_ORDER.filter((category) => !weak.includes(category)).sort(
    (left, right) =>
      attempted(left) - attempted(right) ||
      getCategoryMasteryScore(profile.category_levels[left]) - getCategoryMasteryScore(profile.category_levels[right])
  );
  return [...weak, ...others];
}

/** The plan of a review, daily challenge or skill practice, made once when it starts. The level check adapts as it goes. */
function buildSessionPlan(
  profile: LearnerProfile,
  mode: FoundationAssessmentState["mode"],
  focus?: FoundationCategoryId
): FoundationSessionPlan | undefined {
  if (focus) {
    // That skill's missed questions first, then more of the skill.
    const missed = missedQuestionIds(profile)
      .filter((questionId) => getFoundationQuestionById(questionId)?.category === focus)
      .slice(0, SKILL_PRACTICE_SIZE);
    const more = Array.from({ length: SKILL_PRACTICE_SIZE - missed.length }, () => ({ category: focus }));
    return { steps: [...missed.map((questionId) => ({ questionId })), ...more], retryIds: [], focus };
  }

  if (mode === "review") {
    // Exactly the missed questions, latest miss first; a short list is topped up from the weakest skills.
    const missed = missedQuestionIds(profile).slice(0, REVIEW_SESSION_SIZE);
    const size = Math.max(3, missed.length || REVIEW_SESSION_SIZE);
    const more = rankSkillsForPractice(profile)
      .slice(0, size - missed.length)
      .map((category) => ({ category }));
    return { steps: [...missed.map((questionId) => ({ questionId })), ...more], retryIds: [] };
  }

  if (mode === "daily_challenge") {
    // One skill per question, weak skills first; a skill comes twice only if there are more questions than skills.
    const skills = rankSkillsForPractice(profile);
    const steps = Array.from({ length: DAILY_CHALLENGE_SIZE }, (_, index) => ({ category: skills[index % skills.length] }));
    return { steps, retryIds: [] };
  }

  return undefined;
}

function pickTargetCategories(
  profile: LearnerProfile,
  answerHistory: AssessmentAnswerRecord[],
  nextQuestionNumber: number
) {
  const askedCounts = FOUNDATION_CATEGORY_ORDER.reduce<Record<FoundationCategoryId, number>>((map, category) => {
    map[category] = answerHistory.filter((item) => item.category === category).length;
    return map;
  }, {} as Record<FoundationCategoryId, number>);

  const undercovered = FOUNDATION_CATEGORY_ORDER.filter((category) => askedCounts[category] < PLACEMENT_QUESTIONS_PER_CATEGORY);

  if (undercovered.length) {
    return undercovered.sort((left, right) => {
      const leftScore = getCategoryMasteryScore(profile.category_levels[left]);
      const rightScore = getCategoryMasteryScore(profile.category_levels[right]);
      return leftScore - rightScore || askedCounts[left] - askedCounts[right];
    });
  }

  const mixed = [...profile.weak_areas, ...profile.strong_areas, ...FOUNDATION_CATEGORY_ORDER];

  return unique(
    mixed.sort((left, right) => {
      const leftScore = getCategoryMasteryScore(profile.category_levels[left]);
      const rightScore = getCategoryMasteryScore(profile.category_levels[right]);
      const reviewBias = nextQuestionNumber % 4 === 0 ? leftScore - rightScore : 0;
      return reviewBias || leftScore - rightScore;
    })
  );
}

function chooseQuestionFromCategory(
  profile: LearnerProfile,
  category: FoundationCategoryId,
  asked: Set<string>,
  answerHistory: AssessmentAnswerRecord[],
  nextQuestionNumber: number,
  mode: FoundationAssessmentState["mode"]
) {
  const categoryProfile = profile.category_levels[category];
  const candidates = FOUNDATION_QUESTIONS_BY_CATEGORY[category].filter((question) => !asked.has(question.id) && isScored(question));

  if (!candidates.length) {
    return undefined;
  }

  const targetDifficulty = getTargetDifficulty(categoryProfile, answerHistory, category);
  const recentMistakes = categoryProfile.recentMistakeQuestionIds
    .map((questionId) => getFoundationQuestionById(questionId))
    .filter((question): question is FoundationQuestion => Boolean(question))
    .filter((question) => !asked.has(question.id) && isScored(question));

  if (mode !== "placement" && recentMistakes.length) {
    return recentMistakes.sort((left, right) => Math.abs(left.difficulty - targetDifficulty) - Math.abs(right.difficulty - targetDifficulty))[0];
  }

  const reviewPreferred = nextQuestionNumber % 4 === 0 && recentMistakes.length;

  if (reviewPreferred) {
    return recentMistakes[0];
  }

  const easierMix = nextQuestionNumber % 5 === 0;
  const desiredDifficulty = easierMix ? (Math.max(1, targetDifficulty - 1) as DifficultyTier) : targetDifficulty;

  return [...candidates].sort((left, right) => {
    const leftGap = Math.abs(left.difficulty - desiredDifficulty);
    const rightGap = Math.abs(right.difficulty - desiredDifficulty);
    return leftGap - rightGap || left.difficulty - right.difficulty;
  })[0];
}

function getTargetDifficulty(
  categoryProfile: LearnerCategoryProfile,
  answerHistory: AssessmentAnswerRecord[],
  category: FoundationCategoryId
): DifficultyTier {
  const categoryAnswers = answerHistory.filter((item) => item.category === category).slice(-4);
  const correctStreak = getRecentCorrectStreak(categoryAnswers);
  const recentWrongCount = categoryAnswers.filter((item) => !item.isCorrect).length;
  let difficulty = categoryProfile.currentEstimatedDifficulty;

  if (correctStreak >= 3 && difficulty < 5) {
    difficulty = (difficulty + 1) as DifficultyTier;
  } else if (recentWrongCount >= 2 && difficulty > 1) {
    difficulty = (difficulty - 1) as DifficultyTier;
  }

  return difficulty;
}

export function evaluateFoundationAnswer(
  question: FoundationQuestion,
  selectedAnswer: string | string[] | Record<string, string>
) {
  if (question.type === "multi_select" || question.type === "correct_order") {
    if (!Array.isArray(selectedAnswer) || !Array.isArray(question.correctAnswer)) {
      return false;
    }

    // Order matters only when putting steps in order; picking several answers can happen in any order.
    const chosen = normalizeArray(selectedAnswer);
    const expected = normalizeArray(question.correctAnswer);

    if (question.type === "multi_select") {
      chosen.sort();
      expected.sort();
    }

    return chosen.join("|") === expected.join("|");
  }

  if (question.type === "match_pairs") {
    if (!selectedAnswer || Array.isArray(selectedAnswer) || typeof selectedAnswer !== "object" || Array.isArray(question.correctAnswer)) {
      return false;
    }

    return Object.entries(question.correctAnswer ?? {}).every(
      ([key, value]) => normalizeText(selectedAnswer[key] ?? "") === normalizeText(String(value))
    );
  }

  if (question.type === "fill_in_blank") {
    const answer = typeof selectedAnswer === "string" ? selectedAnswer : "";
    const accepted = question.acceptedAnswers?.map((value) => normalizeText(value)) ?? [];
    return accepted.includes(normalizeText(answer));
  }

  if (question.type === "reflection_prompt") {
    return typeof selectedAnswer === "string" && selectedAnswer.trim().length >= 6;
  }

  return normalizeText(String(selectedAnswer)) === normalizeText(String(question.correctAnswer ?? ""));
}

function buildAssessmentFeedback(
  question: FoundationQuestion,
  selectedAnswer: string | string[] | Record<string, string>,
  correct: boolean,
  confidence: number
): AssessmentFeedback {
  const wrongAnswerReasons = correct ? [] : getWrongAnswerReasons(question, selectedAnswer);

  return {
    correct,
    explanationShort: question.explanationShort,
    explanationLong: question.explanationLong,
    whyThisMatters: question.whyThisMatters,
    misconceptionNotes: question.misconceptionNotes,
    wrongAnswerReasons,
    reviewNext: question.reviewNext,
    confidenceLabel: getConfidenceLabel(confidence),
    reflectionPrompt: `Think for a moment: ${question.whyThisMatters}`
  };
}

// The note on the picked option first, then the question's misconception notes, each once.
function getWrongAnswerReasons(
  question: FoundationQuestion,
  selectedAnswer: string | string[] | Record<string, string>
) {
  const specific = typeof selectedAnswer === "string" ? question.wrongAnswerNotes?.[selectedAnswer] : undefined;
  return unique([specific ?? "", ...question.misconceptionNotes].map((note) => note.trim()).filter(Boolean));
}

function applyAnswerToLearnerProfile(
  profile: LearnerProfile,
  question: FoundationQuestion,
  answerRecord: AssessmentAnswerRecord,
  mode: FoundationAssessmentState["mode"]
) {
  const categoryProfile = profile.category_levels[question.category];
  const questionsAttempted = categoryProfile.questionsAttempted + 1;
  const questionsAnsweredCorrectly = categoryProfile.questionsAnsweredCorrectly + (answerRecord.isCorrect ? 1 : 0);
  const accuracyPercentage = Math.round((questionsAnsweredCorrectly / questionsAttempted) * 100);
  const confidenceScore = averageNumbers([
    categoryProfile.questionsAttempted ? categoryProfile.confidenceScore : 0,
    normalizeConfidence(answerRecord.confidence)
  ], categoryProfile.questionsAttempted ? 2 : 1);
  const averageResponseTimeMs = averageNumbers([
    categoryProfile.questionsAttempted ? categoryProfile.averageResponseTimeMs : 0,
    answerRecord.responseTimeMs
  ], categoryProfile.questionsAttempted ? 2 : 1);
  const streakConsistency = answerRecord.isCorrect ? Math.min(10, categoryProfile.streakConsistency + 1) : 0;
  const recentMistakeQuestionIds = answerRecord.isCorrect
    ? categoryProfile.recentMistakeQuestionIds.filter((questionId) => questionId !== question.id)
    : [question.id, ...categoryProfile.recentMistakeQuestionIds.filter((questionId) => questionId !== question.id)].slice(0, 8);
  const weaknessTags = answerRecord.isCorrect
    ? categoryProfile.weaknessTags.filter((tag) => !question.tags.includes(tag))
    : unique([...categoryProfile.weaknessTags, ...question.tags]).slice(0, 8);

  const nextCategoryProfile: LearnerCategoryProfile = {
    ...categoryProfile,
    accuracyPercentage,
    currentEstimatedDifficulty: getNextDifficulty(categoryProfile, accuracyPercentage, answerRecord.isCorrect),
    confidenceScore,
    streakConsistency,
    questionsAttempted,
    questionsAnsweredCorrectly,
    weaknessTags,
    recentMistakeQuestionIds,
    averageResponseTimeMs,
    readinessLabel: getReadinessLabelFromScore(
      scoreCategory({
        ...categoryProfile,
        accuracyPercentage,
        currentEstimatedDifficulty: getNextDifficulty(categoryProfile, accuracyPercentage, answerRecord.isCorrect),
        confidenceScore,
        streakConsistency,
        questionsAttempted,
        questionsAnsweredCorrectly,
        weaknessTags,
        recentMistakeQuestionIds,
        averageResponseTimeMs,
        readinessLabel: categoryProfile.readinessLabel
      })
    )
  };

  const nextProfile: LearnerProfile = recomputeLearnerProfile({
    ...profile,
    category_levels: {
      ...profile.category_levels,
      [question.category]: nextCategoryProfile
    },
    assessmentHistory: [...profile.assessmentHistory, answerRecord].slice(-240),
    totalQuestionsAnswered: profile.totalQuestionsAnswered + 1,
    needs_review_question_ids: answerRecord.isCorrect
      ? profile.needs_review_question_ids.filter((questionId) => questionId !== question.id)
      : [question.id, ...profile.needs_review_question_ids.filter((questionId) => questionId !== question.id)].slice(0, 24),
    // Two rounds' worth, so the last round is still known (and skipped) while the next one is played.
    dailyChallengeQuestionIds: mode === "daily_challenge"
      ? [question.id, ...profile.dailyChallengeQuestionIds.filter((questionId) => questionId !== question.id)].slice(0, DAILY_CHALLENGE_SIZE * 2)
      : profile.dailyChallengeQuestionIds
  });

  return nextProfile;
}

function recomputeLearnerProfile(profile: LearnerProfile): LearnerProfile {
  const categoryScores = FOUNDATION_CATEGORY_ORDER.map((category) => ({
    category,
    score: scoreCategory(profile.category_levels[category]),
    profile: profile.category_levels[category]
  }));
  const attempted = categoryScores.filter((item) => item.profile.questionsAttempted > 0);
  const averageScore = attempted.length
    ? Math.round(attempted.reduce((total, item) => total + item.score, 0) / attempted.length)
    : 0;

  return {
    ...profile,
    overall_level: getBandFromScore(averageScore),
    readiness_label: getReadinessLabelFromScore(averageScore),
    weak_areas: categoryScores
      .filter((item) => item.profile.questionsAttempted > 0 && (item.score < 55 || item.profile.recentMistakeQuestionIds.length >= 2))
      .map((item) => item.category),
    strong_areas: categoryScores
      .filter((item) => item.profile.questionsAttempted >= 5 && item.score >= 75)
      .map((item) => item.category)
  };
}

function getNextDifficulty(
  profile: LearnerCategoryProfile,
  accuracyPercentage: number,
  isCorrect: boolean
): DifficultyTier {
  let difficulty = profile.currentEstimatedDifficulty;

  if (isCorrect && profile.streakConsistency >= 2 && difficulty < 5 && accuracyPercentage >= 65) {
    difficulty = (difficulty + 1) as DifficultyTier;
  } else if (!isCorrect && difficulty > 1 && profile.recentMistakeQuestionIds.length >= 1 && accuracyPercentage < 60) {
    difficulty = (difficulty - 1) as DifficultyTier;
  }

  return difficulty;
}

function getCategoryMasteryScore(profile: LearnerCategoryProfile) {
  return scoreCategory(profile);
}

function scoreCategory(profile: LearnerCategoryProfile) {
  const accuracy = profile.accuracyPercentage * 0.45;
  const difficulty = ((profile.currentEstimatedDifficulty - 1) / 4) * 22;
  const confidence = profile.confidenceScore * 0.15;
  const streak = Math.min(profile.streakConsistency, 10) * 1.2;
  const speed = profile.averageResponseTimeMs > 0
    ? Math.max(0, Math.min(6, 6 - profile.averageResponseTimeMs / 4000))
    : 0;
  const weaknessPenalty = Math.min(18, profile.recentMistakeQuestionIds.length * 3 + profile.weaknessTags.length);

  return Math.max(0, Math.min(100, Math.round(accuracy + difficulty + confidence + streak + speed - weaknessPenalty)));
}

function getReadinessLabelFromScore(score: number): LearnerReadinessLabel {
  if (score >= 88) {
    return "Ready for advanced topics";
  }

  if (score >= 72) {
    return "Strong foundation";
  }

  if (score >= 54) {
    return "Growing student";
  }

  if (score >= 30) {
    return "Basic foundation";
  }

  return "New learner";
}

function getBandFromScore(score: number): LearnerBand {
  if (score >= 76) {
    return "advanced";
  }

  if (score >= 56) {
    return "intermediate";
  }

  if (score >= 32) {
    return "developing";
  }

  return "beginner";
}

function getRecentCorrectStreak(answerHistory: AssessmentAnswerRecord[]) {
  let streak = 0;

  for (let index = answerHistory.length - 1; index >= 0; index -= 1) {
    if (!answerHistory[index].isCorrect) {
      break;
    }

    streak += 1;
  }

  return streak;
}

// Typed answers ignore case, punctuation and apostrophe or hyphen style, so "Allah." and "as salamu alaikum" count.
export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/['\u2018\u2019\u02bc\u02bf`]/g, "")
    .replace(/[-\u2010-\u2015_.,!?;:"\u201c\u201d()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function localizeAnswerShape(
  value: FoundationQuestion["correctAnswer"],
  language: SupportedLanguage
): FoundationQuestion["correctAnswer"] {
  if (typeof value === "string") {
    return translateStudyText(value, language);
  }

  if (Array.isArray(value)) {
    return value.map((item) => translateStudyText(item, language));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entryValue]) => [
        translateStudyText(key, language),
        translateStudyText(String(entryValue), language)
      ])
    );
  }

  return value;
}

function normalizeArray(values: string[]) {
  return values.map((value) => normalizeText(value));
}

function normalizeConfidence(confidence: number) {
  return Math.max(0, Math.min(100, confidence * 25));
}

function getConfidenceLabel(confidence: number) {
  if (confidence >= 4) {
    return "Very sure";
  }

  if (confidence >= 3) {
    return "Pretty sure";
  }

  if (confidence >= 2) {
    return "Not fully sure";
  }

  return "Guessing";
}

function averageNumbers(values: number[], count: number) {
  return count ? Math.round(values.reduce((total, value) => total + value, 0) / count) : 0;
}

function unique<T>(values: T[]) {
  return [...new Set(values)];
}
