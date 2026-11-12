import { NODE_ARABIC, type ArabicTerm } from "../../data/arabicTerms";
import { translateStudyText } from "../../services/contentLocalization";
import type { Challenge, Lesson, SupportedLanguage } from "../../types";

/**
 * A listening question for a lesson whose learn card teaches one of the checked Arabic words (NODE_ARABIC): hear the
 * word, pick what it means. The wrong choices are the meanings of other checked words, close in length so the
 * longest choice never gives the answer away. Its source is the lesson's own learn-card source. Nothing new is
 * written: the word, its meaning and the source are all already in the lesson.
 */

export const LISTEN_PROMPT = "Listen, then pick what it means.";
const WRONG_CHOICES = 3;

function seedOf(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
}

const words = (text: string) => text.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter((word) => word.length > 3);

/** Meanings too close to the right one to be fair (one says what the other says) are never a wrong choice. */
function tooClose(a: string, b: string) {
  const x = a.toLowerCase();
  const y = b.toLowerCase();
  if (x === y || x.includes(y) || y.includes(x)) return true;
  const shared = words(a).filter((word) => words(b).includes(word));
  return shared.length > 0;
}

let pool: ArabicTerm[] | undefined;
function meaningPool() {
  if (!pool) {
    const seen = new Set<string>();
    pool = Object.values(NODE_ARABIC).filter((term) => {
      const key = term.meaning.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
  return pool;
}

export function wrongMeanings(term: ArabicTerm, seed: string, count = WRONG_CHOICES) {
  const length = term.meaning.length;
  const fits = meaningPool()
    .filter((other) => other.ar !== term.ar && !tooClose(other.meaning, term.meaning))
    .map((other) => ({ meaning: other.meaning, score: Math.abs(other.meaning.length - length) + ((seedOf(seed + other.meaning) % 100) / 100) * 6 }))
    .sort((a, b) => a.score - b.score);
  const picked: string[] = [];
  for (const { meaning } of fits) {
    if (picked.length >= count) break;
    if (picked.some((was) => tooClose(was, meaning))) continue;
    picked.push(meaning);
  }
  return picked;
}

/** The listening question for this lesson, or undefined when its word is not a checked one or it has no source. */
export function listenChallenge(lesson: Lesson, nodeId: string, recitation?: string | null): Challenge | undefined {
  const term = Object.prototype.hasOwnProperty.call(NODE_ARABIC, nodeId) ? NODE_ARABIC[nodeId] : undefined;
  const source = lesson.learnSource ?? lesson.sources[0];
  if (!term || !source) return undefined;
  const wrong = wrongMeanings(term, lesson.id);
  if (wrong.length < WRONG_CHOICES) return undefined;
  const id = `${lesson.id}-listen`;
  const all = [term.meaning, ...wrong];
  // The right answer sits in a different place lesson to lesson.
  const turn = seedOf(id) % all.length;
  const ordered = [...all.slice(turn), ...all.slice(0, turn)];
  return {
    id,
    type: "multiple_choice",
    prompt: LISTEN_PROMPT,
    choices: ordered.map((label, index) => ({ id: `${id}-${index}`, label })),
    correctChoiceId: `${id}-${ordered.indexOf(term.meaning)}`,
    explanation: `${term.ar} (${term.translit}): ${term.meaning}.`,
    sourceNodeId: nodeId,
    sourceLessonId: lesson.id,
    source,
    listen: { ar: term.ar, translit: term.translit, recitation: recitation ?? undefined }
  };
}

/** The lesson with its listening question asked after its own questions, before any from earlier circles. */
export function withListenQuestion(lesson: Lesson, nodeId: string, recitation?: string | null): Lesson {
  const listen = listenChallenge(lesson, nodeId, recitation);
  if (!listen || lesson.challenges.some((challenge) => challenge.listen)) return lesson;
  const firstReview = lesson.challenges.findIndex((challenge) => challenge.isReview);
  const at = firstReview < 0 ? lesson.challenges.length : firstReview;
  return { ...lesson, challenges: [...lesson.challenges.slice(0, at), listen, ...lesson.challenges.slice(at)] };
}

/**
 * The Why line of a listening question: the Arabic, how it is said, and its meaning in the learner's language. "How
 * does the ayah end?" has none: the ayah itself, finished by the reciter on screen, and its source chip say it. Nor
 * has "Which surah is it?": once answered, the ayah shows on its card, and its source chip says where it is.
 */
export function listenWhy(challenge: Pick<Challenge, "listen" | "choices" | "correctChoiceId">, language: SupportedLanguage) {
  const meaning = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const listen = challenge.listen;
  if (!listen) return meaning;
  if (listen.recite || listen.which) return "";
  return `${listen.ar} (${listen.translit}): ${translateStudyText(meaning, language)}.`;
}
