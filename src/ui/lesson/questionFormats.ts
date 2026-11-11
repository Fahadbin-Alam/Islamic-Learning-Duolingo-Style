import type { Challenge, ChallengeChoice } from "../../types";
import { hasArabic } from "../ArabicText";

// One question can be asked in more than one way, like Duolingo does: the same fact, the same source, the same
// right answer, but a different game each time. Nothing here writes new content: every format is built from the
// question's own prompt and choices, so its source and its answer stay the ones that were checked.
//
//   choose  tap the right tile (the question as written; true / false questions stay this way)
//   blank   drag (or tap) the right word into the sentence's gap
//   fill    the answer with its key word missing: tap the missing word from a few choices
//   check   true or false: "Is this the answer?" with one choice shown
//   map     every answer a place: tap the right one where it is, on a map of the land (mapQuestions)

export type QuestionFormat = "choose" | "blank" | "fill" | "check" | "map";

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
  /** The learner's language: missing-word answers are made only from English answers, which split on spaces cleanly. */
  language?: string;
  /** Every answer has its own picture (choicePictures): asked as picture cards, the most fun way to pick a place. */
  pictures?: boolean;
  /** Every answer is a place on the map (mapPlacesFor): asked on the map, or (with pictures too) half the time. */
  map?: boolean;
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

// Little words that carry no fact: never the missing piece, never a wrong choice for it.
const SMALL_WORDS = new Set(
  "a an the and or but of to in on at by for from with into onto upon over under about as is are was were be been being it its his her their our your my this that these those who whom which what when where why how not no so than then there they them he she we you i all any some one his him has have had do does did will would can could should may might must very more most just only also".split(" ")
);

/** A word with the commas, quotes and brackets round it taken off. */
function coreOf(word: string) {
  return word.replace(/^[("'“‘[]+/, "").replace(/[)"'”’\],;:.!?]+$/, "");
}

/** Words that join the parts of a name ("Umar ibn al-Khattab"): never a wrong word to choose from. */
const NAME_LINKS = new Set(["ibn", "bin", "bint", "abu", "abi", "umm", "banu", "bani"]);

/** A word that can be the missing piece or a wrong choice for it: a real fact word, not "the" or "of". */
function isKeyWord(core: string) {
  return core.length >= 3 && core.length <= 16 && /[A-Za-z]/.test(core) && !SMALL_WORDS.has(core.toLowerCase());
}

/** Two words one letter apart (one changed, added or dropped). */
function nearlySame(a: string, b: string) {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  while (i < a.length && i < b.length && a[i] === b[i]) i += 1;
  let j = 0;
  while (j < a.length - i && j < b.length - i && a[a.length - 1 - j] === b[b.length - 1 - j]) j += 1;
  return a.length - i - j <= 1 && b.length - i - j <= 1;
}

export type FillPiece = {
  /** The answer up to the gap. */
  before: string;
  /** The missing word: the right choice. */
  piece: string;
  /** The answer after the gap (with the missing word's own comma or stop). */
  after: string;
  /** The missing word and 2 or 3 key words from the wrong answers, in a steady mixed order. */
  options: string[];
};

/**
 * The answer as a sentence with its key word missing ("Being saved from the ___, into Jannah"), and a few
 * words to pick from: the right one and key words from the wrong answers. The key word is the answer's
 * longest fact word, so the learner recalls the fact, not the grammar. Undefined when the answer is not a
 * short English phrase or the wrong answers give fewer than 2 words to choose from.
 */
export function fillPiece(challenge: Pick<Challenge, "choices" | "correctChoiceId" | "id">): FillPiece | undefined {
  const answer = answerOf(challenge);
  if (!answer || hasArabic(answer) || !/[A-Za-z]/.test(answer)) return undefined;
  const words = answer.replace(/[.!?]+$/, "").split(/\s+/).filter(Boolean);
  if (words.length < 2 || words.length > 9) return undefined;
  let at = -1;
  words.forEach((word, index) => {
    const core = coreOf(word);
    if (isKeyWord(core) && (at < 0 || core.length > coreOf(words[at]).length)) at = index;
  });
  if (at < 0) return undefined;
  const piece = coreOf(words[at]);
  const inAnswer = new Set(words.map((word) => coreOf(word).toLowerCase()));
  // The case should give nothing away: when the missing word has a capital, every choice gets one. When it has none,
  // a wrong word with a capital (a name, or just the start of its answer) is left out: "Listen ___" offering
  // "carefully, quickly, Interrupt" gave the odd one out away by its capital. Name links ("ibn", "bint", "Abu") are
  // never a choice either.
  const capital = /^[A-Z]/.test(piece);
  // A name piece like "as-Siddiq" sits among other names ("Umar", "al-Khattab"): capitals there are how names are spelled.
  const nameLike = /^[a-z]{2}-[A-Z]/.test(piece);
  const wrong: { word: string }[] = [];
  for (const choice of challenge.choices) {
    if (choice.id === challenge.correctChoiceId || hasArabic(choice.label)) continue;
    for (const word of choice.label.split(/\s+/)) {
      const core = coreOf(word);
      const key = core.toLowerCase();
      // A word one letter off the right one ("made" for "make") is a trick, not a fact: left out.
      if (!isKeyWord(core) || NAME_LINKS.has(key) || inAnswer.has(key) || nearlySame(key, piece.toLowerCase()) || wrong.some((each) => each.word.toLowerCase() === key)) continue;
      if (!capital && !nameLike && /^[A-Z]/.test(core)) continue;
      wrong.push({ word: capital ? core.charAt(0).toUpperCase() + core.slice(1) : core });
    }
  }
  if (wrong.length < 2) return undefined;
  // Wrong words that look most like the right one (by length) make a fairer choice; steady per question.
  const seed = formatSeed(challenge.id);
  const picks = wrong
    .map(({ word }, index) => ({ word, order: Math.abs(word.length - piece.length) * 1000 + (formatSeed(`${seed}-${index}-${word}`) % 1000) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, 3)
    .map((each) => each.word);
  const options = [piece, ...picks]
    .map((word, index) => ({ word, order: formatSeed(`${seed}|fill|${index}|${word}`) }))
    .sort((a, b) => a.order - b.order)
    .map((each) => each.word);
  const tail = words[at].slice(words[at].indexOf(piece) + piece.length);
  const head = words[at].slice(0, words[at].indexOf(piece));
  return {
    before: (at > 0 ? words.slice(0, at).join(" ") + " " : "") + head,
    piece,
    after: tail + (at < words.length - 1 ? " " + words.slice(at + 1).join(" ") : ""),
    options
  };
}

/** A missing-word question needs a short English answer with a clear key word and wrong words to choose from. */
export function canFill(challenge: Pick<Challenge, "choices" | "correctChoiceId" | "id">) {
  return Boolean(fillPiece(challenge));
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
 * questions are a mix of tiles, a missing word in the answer, and true-or-false, steady per question; asked again later (recall), the
 * mix leans away from plain tiles, so the learner meets the fact in other words than when they learned it.
 */
export function questionFormat(challenge: Pick<Challenge, "id" | "type" | "prompt" | "choices" | "correctChoiceId" | "listen">, context: FormatContext = {}): QuestionFormat {
  // A listening question is heard, then its meaning picked from the tiles.
  if (!questionVariety() || isTrueFalse(challenge) || challenge.listen) return "choose";
  const roll = formatSeed(`${challenge.id}|${context.recall ? "recall" : "learn"}`) % 100;
  // Places are found on the map; places with their own photos are picture cards the other half of the time, so the
  // same question taught one way is often asked the other way later.
  if (context.map && (!context.pictures || roll % 2 === 0)) return "map";
  if (context.pictures) return "choose";
  if (canBlank(challenge)) return "blank";
  const english = !context.language || context.language === "en";
  // Tiles whose right answer is far longer than every wrong one give it away by its length alone ("Faith, good
  // deeds, truth, and patience" beside "Being famous"). Such a question is asked another way: one answer to judge
  // true or false, or a missing word, where the length shows nothing.
  if (longAnswerGivesAway(challenge) && canCheck(challenge)) {
    return english && canFill(challenge) && roll % 2 === 0 ? "fill" : "check";
  }
  const fillShare = english && canFill(challenge) ? (context.recall ? 40 : 30) : 0;
  const checkShare = canCheck(challenge) ? (context.recall ? 35 : 20) : 0;
  if (roll < fillShare) return "fill";
  if (roll < fillShare + checkShare) return "check";
  return "choose";
}

/** The right answer is at least 1.8 times as long as the longest wrong one (and long enough for that to show). */
export function longAnswerGivesAway(challenge: Pick<Challenge, "choices" | "correctChoiceId">) {
  if (challenge.choices.length < 3) return false;
  const right = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId);
  if (!right || right.label.length < 20) return false;
  const longestWrong = Math.max(...challenge.choices.filter((choice) => choice !== right).map((choice) => choice.label.length));
  return right.label.length >= longestWrong * 1.8;
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

/** The id that stands for a wrong missing word (it matches no choice, so it is never right). */
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
export function matchPicks(challenges: Pick<Challenge, "prompt" | "choices" | "correctChoiceId" | "type" | "listen">[], max = 4): number[] {
  const picks: number[] = [];
  const answers = new Set<string>();
  challenges.forEach((challenge, index) => {
    if (picks.length >= max || challenge.listen || !canMatch(challenge)) return;
    const answer = answerOf(challenge).toLowerCase();
    if (answers.has(answer)) return;
    answers.add(answer);
    picks.push(index);
  });
  return picks.length >= 3 ? picks : [];
}
