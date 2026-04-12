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

const PLACEMENT_QUESTIONS_PER_CATEGORY = 2;
const PLACEMENT_EXTRA_QUESTIONS = 4;
const DAILY_CHALLENGE_SIZE = 6;
const REVIEW_SESSION_SIZE = 6;

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
  mode: FoundationAssessmentState["mode"]
): FoundationAssessmentState {
  const totalQuestions = getTargetQuestionCount(profile, mode);
  const currentQuestion = selectNextQuestion(profile, [], [], mode, 1);

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
    confidence: 2,
    startedAt: new Date().toISOString(),
    questionStartedAt: Date.now()
  };
}

export function submitFoundationAssessmentAnswer(input: {
  profile: LearnerProfile;
  state: FoundationAssessmentState;
  selectedAnswer: string | string[] | Record<string, string>;
  confidence: number;
  responseTimeMs: number;
}) {
  const { profile, state, selectedAnswer, confidence, responseTimeMs } = input;
  const question = state.currentQuestion;
  const isCorrect = evaluateFoundationAnswer(question, selectedAnswer);
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

  return {
    nextProfile,
    stateWithFeedback: {
      ...state,
      answerHistory: [...state.answerHistory, answerRecord],
      feedback,
      selectedAnswer,
      confidence
    },
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

  const nextQuestion = selectNextQuestion(
    profile,
    state.askedQuestionIds,
    state.answerHistory,
    state.mode,
    state.questionNumber + 1
  );

  if (!nextQuestion) {
    return null;
  }

  return {
    ...state,
    currentQuestion: nextQuestion,
    questionNumber: state.questionNumber + 1,
    askedQuestionIds: [...state.askedQuestionIds, nextQuestion.id],
    feedback: undefined,
    selectedAnswer: undefined,
    confidence: 2,
    questionStartedAt: Date.now()
  };
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

function getTargetQuestionCount(profile: LearnerProfile, mode: FoundationAssessmentState["mode"]) {
  if (mode === "review") {
    return Math.max(3, Math.min(REVIEW_SESSION_SIZE, profile.needs_review_question_ids.length || REVIEW_SESSION_SIZE));
  }

  if (mode === "daily_challenge") {
    return DAILY_CHALLENGE_SIZE;
  }

  return Math.min(
    FOUNDATION_QUESTION_BANK.length,
    FOUNDATION_CATEGORY_ORDER.length * PLACEMENT_QUESTIONS_PER_CATEGORY + PLACEMENT_EXTRA_QUESTIONS
  );
}

function selectNextQuestion(
  profile: LearnerProfile,
  askedQuestionIds: string[],
  answerHistory: AssessmentAnswerRecord[],
  mode: FoundationAssessmentState["mode"],
  nextQuestionNumber: number
) {
  const asked = new Set(askedQuestionIds);
  const targetCategories = pickTargetCategories(profile, answerHistory, mode, nextQuestionNumber);

  for (const category of targetCategories) {
    const question = chooseQuestionFromCategory(profile, category, asked, answerHistory, nextQuestionNumber, mode);

    if (question) {
      return question;
    }
  }

  return FOUNDATION_QUESTION_BANK.find((question) => !asked.has(question.id));
}

function pickTargetCategories(
  profile: LearnerProfile,
  answerHistory: AssessmentAnswerRecord[],
  mode: FoundationAssessmentState["mode"],
  nextQuestionNumber: number
) {
  if (mode === "review") {
    const reviewCategories = unique(
      profile.needs_review_question_ids
        .map((questionId) => getFoundationQuestionById(questionId)?.category)
        .filter(Boolean) as FoundationCategoryId[]
    );

    if (reviewCategories.length) {
      return reviewCategories;
    }
  }

  if (mode === "daily_challenge") {
    const dailyOrder = [...profile.weak_areas, ...FOUNDATION_CATEGORY_ORDER.filter((category) => !profile.weak_areas.includes(category))];
    return unique(dailyOrder);
  }

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
  const candidates = FOUNDATION_QUESTIONS_BY_CATEGORY[category].filter((question) => !asked.has(question.id));

  if (!candidates.length) {
    return undefined;
  }

  const targetDifficulty = getTargetDifficulty(categoryProfile, answerHistory, category);
  const recentMistakes = categoryProfile.recentMistakeQuestionIds
    .map((questionId) => getFoundationQuestionById(questionId))
    .filter((question): question is FoundationQuestion => Boolean(question))
    .filter((question) => !asked.has(question.id));

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

function evaluateFoundationAnswer(
  question: FoundationQuestion,
  selectedAnswer: string | string[] | Record<string, string>
) {
  if (question.type === "multi_select" || question.type === "correct_order") {
    if (!Array.isArray(selectedAnswer) || !Array.isArray(question.correctAnswer)) {
      return false;
    }

    return normalizeArray(selectedAnswer).join("|") === normalizeArray(question.correctAnswer).join("|");
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

function getWrongAnswerReasons(
  question: FoundationQuestion,
  selectedAnswer: string | string[] | Record<string, string>
) {
  if (Array.isArray(selectedAnswer)) {
    return question.misconceptionNotes.length
      ? question.misconceptionNotes
      : ["Some of the selected choices do not match the strongest Islamic answer here."];
  }

  if (selectedAnswer && typeof selectedAnswer === "object") {
    return question.misconceptionNotes.length
      ? question.misconceptionNotes
      : ["At least one pair does not match the correct relationship."];
  }

  const selectedValue = String(selectedAnswer ?? "");
  const specific = question.wrongAnswerNotes?.[selectedValue];

  if (specific) {
    return [specific, ...question.misconceptionNotes];
  }

  return question.misconceptionNotes.length
    ? question.misconceptionNotes
    : ["This answer misses the core point the question is testing."];
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
    dailyChallengeQuestionIds: mode === "daily_challenge"
      ? [question.id, ...profile.dailyChallengeQuestionIds.filter((questionId) => questionId !== question.id)].slice(0, DAILY_CHALLENGE_SIZE)
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

function normalizeText(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
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
