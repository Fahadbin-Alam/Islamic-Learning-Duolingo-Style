import { useSyncExternalStore } from "react";
import { answerShowsInText, isContextBound } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { pictureForQuestion } from "../data/lessonPictures";
import { getTopicCopy } from "../i18n";
import type { Challenge, Lesson, SupportedLanguage, TopicId, UserProfile } from "../types";
import { seededRandom } from "./battleQuestions";
import { translateStudyText } from "./contentLocalization";

/**
 * The swipe sprint in Practice: a minute of quick cards from the lessons the learner finished. Each card is a
 * question with one answer shown ("Is it ...?"), or a true or false sentence: swipe to the tick if it is right, to
 * the cross if not. Nothing new is written: every card is a lesson question with its own checked answer, asked the
 * way the lessons' true-or-false format asks it.
 */
export const SPRINT_SECONDS = 60;
/** Every this many right in a row adds a little time. */
export const SPRINT_BONUS_EVERY = 5;
export const SPRINT_BONUS_SECONDS = 3;
/** Fewer cards than this and there is no sprint yet (finish a few lessons first). */
export const SPRINT_MIN_CARDS = 8;
/** Practice pay, kept small for a quick game: 1 XP for every 2 right, at most this many a sprint. */
export const SPRINT_MAX_XP = 10;

const SPRINT_MAX_CARDS = 80;
/** The lessons finished most recently that the cards come from. */
const SPRINT_LESSONS = 60;
// Short enough to read at a glance.
const MAX_PROMPT = 160;
const MAX_ANSWER = 60;
const TRUE_FALSE = /^(true|false)$/i;
const TRUE_FALSE_LEAD = /^true or false[:?,.]?\s*/i;
const BLANK = /_{2,}/;
// Answers that only mean something beside the other choices: "Is it 'All of the above'?" asks nothing.
const NEEDS_THE_OTHERS = /\b(all|none|both|neither) of (the )?(above|these|them|those)\b|^(both|all|none|neither)\b|\babove\b/i;
// A question about "this topic" or "this review lesson" only makes sense inside its lesson.
const POINTS_AT_LESSON = /\b(this|that|these|those)( \w+)? (topic|lesson|review|unit|circle|card|page|section)s?\b/i;

export type SprintCard = {
  id: string;
  /** The question, or a true or false sentence. */
  prompt: string;
  /** The answer shown to judge. None on a true or false sentence. */
  shown?: string;
  /** Whether "yes, it is right" is the right swipe. */
  yes: boolean;
  /** The right answer, said after a miss. A true or false sentence's is true or false itself. */
  answer: string;
  /** A true or false sentence (its answer is "True" or "False"). */
  trueFalse: boolean;
  lessonId: string;
  /** The topic the lesson is in, as a chip on the card, in the topic's color. */
  topic?: { id: TopicId; title: string; accent: string };
  /** A place the question itself names has its living picture on the card (never one from the answers). */
  pictureId?: string;
};

let topicByNode: Map<string, { id: TopicId; accent: string }> | undefined;

function topicOf(lesson: Lesson) {
  if (!topicByNode) {
    topicByNode = new Map();
    for (const section of COURSE.sections) {
      for (const node of section.nodes) topicByNode.set(node.id, { id: section.topicId, accent: section.accentColor });
    }
  }
  const found = topicByNode.get(lesson.nodeId);
  if (found) return found;
  // A few first lessons sit outside the path's circles: their id names the topic ("lesson-prayer-wudu-why"), or
  // they are the first Companions and surahs.
  const topicId = LEGACY_TOPICS[lesson.id];
  const section = COURSE.sections.find((item) => (topicId ? item.topicId === topicId : lesson.id.startsWith(`lesson-${item.topicId}-`)));
  return section ? { id: section.topicId, accent: section.accentColor } : undefined;
}

const LEGACY_TOPICS: Record<string, TopicId> = {
  "lesson-abubakr": "sahabah",
  "lesson-umar": "sahabah",
  "lesson-uthman": "sahabah",
  "lesson-ali": "sahabah",
  "lesson-bilal": "sahabah",
  "lesson-fatiha": "quran_tafseer",
  "lesson-ikhlas": "quran_tafseer",
  "lesson-kursi": "quran_tafseer",
  "lesson-asr": "quran_tafseer",
  "lesson-tafseer": "quran_tafseer"
};

function rightChoice(challenge: Challenge) {
  return challenge.choices.find((choice) => choice.id === challenge.correctChoiceId);
}

/**
 * A lesson question as a sprint card, or nothing when it cannot be judged at a glance on its own. A question with
 * choices shows its right answer `yesChance` of the time (a half unless told), otherwise one of its wrong ones.
 */
export function sprintCardFrom(challenge: Challenge, lessonId: string, random: () => number, yesChance = 0.5): SprintCard | undefined {
  const right = rightChoice(challenge);
  if (!right || challenge.isReview || challenge.listen || challenge.choices.length < 2) return undefined;
  // The card says "True or false?" itself.
  const prompt = challenge.prompt.trim().replace(TRUE_FALSE_LEAD, "");
  if (!prompt || prompt.length > MAX_PROMPT || BLANK.test(prompt) || POINTS_AT_LESSON.test(prompt) || isContextBound(prompt) || answerShowsInText(challenge)) return undefined;
  if (challenge.type === "true_false" || TRUE_FALSE.test(right.label.trim())) {
    if (!TRUE_FALSE.test(right.label.trim())) return undefined;
    const yes = /^true$/i.test(right.label.trim());
    return { id: `sprint-${challenge.id}`, prompt, yes, answer: yes ? "True" : "False", trueFalse: true, lessonId };
  }
  const fits = (label: string) => label.trim().length > 0 && label.length <= MAX_ANSWER && !NEEDS_THE_OTHERS.test(label);
  if (!fits(right.label)) return undefined;
  const wrong = challenge.choices.filter((choice) => choice.id !== right.id && fits(choice.label) && choice.label.trim().toLowerCase() !== right.label.trim().toLowerCase());
  if (!wrong.length) return undefined;
  const yes = random() < yesChance;
  const shown = yes ? right : wrong[Math.floor(random() * wrong.length)];
  return { id: `sprint-${challenge.id}`, prompt, shown: shown.label.trim(), yes, answer: right.label.trim(), trueFalse: false, lessonId };
}

function shuffle<T>(items: T[], random: () => number) {
  const list = items.slice();
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [list[index], list[swap]] = [list[swap], list[index]];
  }
  return list;
}

/**
 * A sprint's cards from the lessons the learner finished most recently, shuffled by `seed` (each new sprint passes a
 * new one, so the cards and the answers shown change), in the learner's language. Each question once.
 */
/** The questions from the lessons finished most recently that make cards, each once; stops at `enough`. */
function fittingQuestions(user: Pick<UserProfile, "completedLessonIds">, random: () => number, enough = Number.POSITIVE_INFINITY) {
  const lessonIds = Array.from(new Set(user.completedLessonIds ?? [])).slice(-SPRINT_LESSONS);
  const prompts = new Set<string>();
  const fit: Array<{ card: SprintCard; challenge: Challenge }> = [];
  for (const lessonId of lessonIds) {
    const lesson = LESSONS_BY_ID[lessonId];
    if (!lesson) continue;
    for (const challenge of lesson.challenges) {
      const key = challenge.prompt.trim().toLowerCase();
      if (prompts.has(key)) continue;
      const card = sprintCardFrom(challenge, lessonId, random);
      if (!card) continue;
      prompts.add(key);
      fit.push({ card, challenge });
      if (fit.length >= enough) return fit;
    }
  }
  return fit;
}

export function sprintCards(user: Pick<UserProfile, "completedLessonIds">, options: { language?: SupportedLanguage; seed?: number } = {}): SprintCard[] {
  const random = seededRandom(options.seed ?? Date.now());
  const language = options.language ?? "en";
  const fit = fittingQuestions(user, random);
  // Lesson sentences are mostly true, so the questions with choices show a wrong answer more often, until "yes" is
  // right about half the time overall: always swiping one way never wins.
  const sentences = fit.filter((entry) => entry.card.trueFalse);
  const withChoices = fit.length - sentences.length;
  const sentencesYes = sentences.filter((entry) => entry.card.yes).length;
  const yesChance = withChoices ? Math.max(0.25, Math.min(0.5, (fit.length / 2 - sentencesYes) / withChoices)) : 0.5;
  const cards = fit.map((entry) => (entry.card.trueFalse ? entry.card : (sprintCardFrom(entry.challenge, entry.card.lessonId, random, yesChance) ?? entry.card)));
  return shuffle(cards, random)
    .slice(0, SPRINT_MAX_CARDS)
    .map((card) => {
      const lesson = LESSONS_BY_ID[card.lessonId];
      const topic = lesson ? topicOf(lesson) : undefined;
      const picture = pictureForQuestion(card.prompt);
      return {
        ...card,
        prompt: translateStudyText(card.prompt, language),
        shown: card.shown === undefined ? undefined : translateStudyText(card.shown, language),
        answer: card.trueFalse ? card.answer : translateStudyText(card.answer, language),
        ...(topic ? { topic: { ...topic, title: getTopicCopy(topic.id, language).title } } : {}),
        ...(picture ? { pictureId: picture.id } : {})
      };
    });
}

/** Enough finished lessons for a sprint. */
export function canSprint(user: Pick<UserProfile, "completedLessonIds">) {
  return fittingQuestions(user, seededRandom(1), SPRINT_MIN_CARDS).length >= SPRINT_MIN_CARDS;
}

/** What a sprint pays: 1 XP for every 2 right answers, at most SPRINT_MAX_XP. */
export function sprintXp(right: number) {
  return Math.max(0, Math.min(SPRINT_MAX_XP, Math.floor(right / 2)));
}

// The best sprint on this phone, so a new best can be cheered.
const KEY = "sira-path-sprint-best" as const;
export type SprintRecord = { best: number; plays: number };
const listeners = new Set<() => void>();
let memory: SprintRecord | undefined;
const EMPTY: SprintRecord = { best: 0, plays: 0 };

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

function read(): SprintRecord {
  if (memory) return memory;
  try {
    const raw = storage()?.getStoredItem(KEY);
    const saved = raw ? (JSON.parse(raw) as Partial<SprintRecord>) : {};
    const count = (value: unknown) => (typeof value === "number" && Number.isFinite(value) && value > 0 ? Math.floor(value) : 0);
    memory = { best: count(saved.best), plays: count(saved.plays) };
  } catch {
    memory = EMPTY;
  }
  return memory;
}

export function sprintRecord() {
  return read();
}

/** Keeps a finished sprint's score. True when it is a new best (the first sprint with any right answer is one). */
export function recordSprint(right: number) {
  const before = read();
  const newBest = right > before.best;
  memory = { best: Math.max(before.best, right), plays: before.plays + 1 };
  try {
    storage()?.setStoredItem(KEY, JSON.stringify(memory));
  } catch {
    // Kept for this run.
  }
  for (const listener of listeners) listener();
  return newBest;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSprintRecord() {
  return useSyncExternalStore(subscribe, read, read);
}

/** For tests. */
export function resetSprintForTests() {
  memory = undefined;
  storage()?.setStoredItem(KEY, "");
}
