import type { Challenge, ChallengeChoice } from "../../types";
import { hasArabic } from "../ArabicText";

// One question can be asked in more than one way, like Duolingo does: the same fact, the same source, the same
// right answer, but a different game each time. Nothing here writes new content: every format is built from the
// question's own prompt and choices, so its source and its answer stay the ones that were checked.
//
//   choose  tap the right tile (the question as written; true / false questions stay this way)
//   blank   drag (or tap) the right word into the sentence's gap
//   build   a puzzle: put the answer together from word tiles, in order
//   check   true or false: "Is this the answer?" with one choice shown

export type QuestionFormat = "choose" | "blank" | "build" | "check";

/**
 * Whether questions are asked in more than one way (and quiz circles open with a matching round). Always on in
 * the app; the older app tests, written for tiles only, turn it off (scripts/jest/setup.js).
 */
export function questionVariety() {
  return (globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ !== false;
}

export type FormatContext = {
  /** Asked again later (a review, a unit quiz or test, a practice): it should look different from when it was taught. */
  recall?: boolean;
  /** The learner's language: word puzzles are made only from English answers, which split on spaces cleanly. */
  language?: string;
};

const BLANK = /_{2,}/;
const TRUE_FALSE = /^(true|false)$/i;

/** A small steady hash, so the same question gets the same format every time it renders. */
export function formatSeed(text: string) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function answerOf(challenge: Pick<Challenge, "choices" | "correctChoiceId">) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label?.trim() ?? "";
}

function isTrueFalse(challenge: Pick<Challenge, "type" | "choices" | "correctChoiceId">) {
  return challenge.type === "true_false" || TRUE_FALSE.test(answerOf(challenge));
}

/** The words of a label as puzzle tiles: split on spaces, the end stop dropped. */
export function puzzleWords(label: string) {
  return label
    .trim()
    .replace(/[.!?]+$/, "")
    .split(/\s+/)
    .filter(Boolean);
}

/** How a built answer compares: case, end stops and curly quotes do not count. */
export function sameWords(a: string[], b: string[]) {
  const norm = (words: string[]) => words.join(" ").toLowerCase().replace(/[’‘`]/g, "'").replace(/[.!?,]+$/, "").trim();
  return norm(a) === norm(b);
}

/** Extra tiles for a puzzle: words from the wrong choices that are not in the answer. */
export function puzzleExtras(challenge: Pick<Challenge, "choices" | "correctChoiceId" | "id">, count = 3) {
  const answer = new Set(puzzleWords(answerOf(challenge)).map((word) => word.toLowerCase()));
  const extras: string[] = [];
  for (const choice of challenge.choices) {
    if (choice.id === challenge.correctChoiceId) continue;
    for (const word of puzzleWords(choice.label)) {
      const key = word.toLowerCase();
      if (!answer.has(key) && !extras.some((each) => each.toLowerCase() === key) && word.length <= 16) extras.push(word);
    }
  }
  // A steady pick of the extras, so a re-render never swaps them.
  const seed = formatSeed(challenge.id);
  return extras
    .map((word, index) => ({ word, order: formatSeed(`${seed}-${index}-${word}`) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, count)
    .map((each) => each.word);
}

/** A puzzle needs an English answer of 2 to 6 short words, and at least 2 extra words to tell it from the others. */
export function canBuild(challenge: Pick<Challenge, "choices" | "correctChoiceId" | "id">) {
  const answer = answerOf(challenge);
  if (!answer || hasArabic(answer) || !/[A-Za-z]/.test(answer)) return false;
  const words = puzzleWords(answer);
  if (words.length < 2 || words.length > 6 || words.some((word) => word.length > 16)) return false;
  // Two words the same make the puzzle ambiguous ("peace be upon peace"): keep it simple.
  if (new Set(words.map((word) => word.toLowerCase())).size !== words.length) return false;
  return puzzleExtras(challenge).length >= 2;
}

/** A gap to fill needs an English prompt with "___" and short choices that fit in a sentence. */
export function canBlank(challenge: Pick<Challenge, "prompt" | "choices">) {
  return BLANK.test(challenge.prompt) && !hasArabic(challenge.prompt) && challenge.choices.length >= 2 && challenge.choices.every((choice) => choice.label.length <= 40);
}

/** True or false on one choice needs a plain question with a short answer. */
export function canCheck(challenge: Pick<Challenge, "choices" | "correctChoiceId" | "prompt">) {
  const answer = answerOf(challenge);
  return challenge.choices.length >= 2 && answer.length > 0 && answer.length <= 90 && !BLANK.test(challenge.prompt) && challenge.prompt.length <= 220;
}

/**
 * How to ask this question. True / false stays as it is. A sentence with a gap is always a gap to fill. Other
 * questions are a mix of tiles, puzzles and true-or-false, steady per question; asked again later (recall), the
 * mix leans away from plain tiles, so the learner meets the fact in other words than when they learned it.
 */
export function questionFormat(challenge: Pick<Challenge, "id" | "type" | "prompt" | "choices" | "correctChoiceId">, context: FormatContext = {}): QuestionFormat {
  if (!questionVariety() || isTrueFalse(challenge)) return "choose";
  if (canBlank(challenge)) return "blank";
  const english = !context.language || context.language === "en";
  const roll = formatSeed(`${challenge.id}|${context.recall ? "recall" : "learn"}`) % 100;
  const buildShare = english && canBuild(challenge) ? (context.recall ? 40 : 30) : 0;
  const checkShare = canCheck(challenge) ? (context.recall ? 35 : 20) : 0;
  if (roll < buildShare) return "build";
  if (roll < buildShare + checkShare) return "check";
  return "choose";
}

export const CHECK_TRUE = "true";
export const CHECK_FALSE = "false";

/** The choice a true-or-false question shows: the right one about half the time, otherwise a wrong one. */
export function checkCandidate(challenge: Pick<Challenge, "id" | "choices" | "correctChoiceId">): ChallengeChoice {
  const seed = formatSeed(`${challenge.id}|check`);
  const wrong = challenge.choices.filter((choice) => choice.id !== challenge.correctChoiceId);
  const right = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId) ?? challenge.choices[0];
  if (!wrong.length || seed % 2 === 0) return right;
  return wrong[(seed >>> 1) % wrong.length];
}

/**
 * The real choice a true-or-false tap stands for, so the lesson scores it like any other answer: right when the
 * learner judged the shown choice correctly, otherwise a wrong choice.
 */
export function checkAnswerId(challenge: Pick<Challenge, "id" | "choices" | "correctChoiceId">, picked: string) {
  const candidate = checkCandidate(challenge);
  const shownIsRight = candidate.id === challenge.correctChoiceId;
  const judgedRight = (picked === CHECK_TRUE) === shownIsRight;
  if (judgedRight) return challenge.correctChoiceId;
  return challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id ?? `${challenge.correctChoiceId}-wrong`;
}

/** The id that stands for a wrong puzzle or gap (it matches no choice, so it is never right). */
export const WRONG_BUILD = "__built_wrong__";

export type MatchPair = { index: number; left: string; right: string };

/** A question fits a matching round when its prompt and its answer are both short enough to sit on a card. */
export function canMatch(challenge: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "type">) {
  const answer = answerOf(challenge);
  return !isTrueFalse(challenge) && !BLANK.test(challenge.prompt) && answer.length > 0 && answer.length <= 32 && challenge.prompt.length <= 90 && !hasArabic(challenge.prompt);
}

/**
 * Up to `max` questions that make a matching round: each with its own answer, no two with the same answer.
 * Fewer than 3: no round.
 */
export function matchPicks(challenges: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "type">[], max = 4): number[] {
  const picks: number[] = [];
  const answers = new Set<string>();
  challenges.forEach((challenge, index) => {
    if (picks.length >= max || !canMatch(challenge)) return;
    const answer = answerOf(challenge).toLowerCase();
    if (answers.has(answer)) return;
    answers.add(answer);
    picks.push(index);
  });
  return picks.length >= 3 ? picks : [];
}
