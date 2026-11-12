import { LESSONS_BY_ID, allNodes } from "../../data/course";
import { QURAN_AYAHS } from "../../data/quranAyahs";
import { arabicLetters } from "../../services/arabicVoice";
import { ayahPieces, ayahWordTimes } from "../../services/ayahWords";
import { parseQuranReference, quranAudioUrl } from "../../services/quranAudio";
import { preciseResourceUrl } from "../../services/resourceSupport";
import type { Challenge, Lesson, LessonSource } from "../../types";
import { isArabicOnly } from "../ArabicText";

/**
 * "How does the ayah end?": for a lesson whose quote is a short ayah, the reciter recites it, its words lighting up
 * one by one, and stops before its last word; the learner taps that word from three. The two wrong ones end other
 * ayahs of the same surah (the nearest first), so they sound alike, as a surah's ayahs rhyme. Nothing new is written:
 * the ayah, its words and the endings are all the Quran text the app already shows (QURAN_AYAHS), and its source is
 * the ayah itself.
 */

export const RECITE_PROMPT = "Listen, then tap how the ayah ends.";
const WRONG_CHOICES = 2;
/** The reciter reaches the last word within this many seconds, so the learner never waits long for the question. */
const MAX_WAIT_S = 10;
/** At least this many words, so there is something to hear before the gap. */
const MIN_WORDS = 3;

function seedOf(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return hash;
}

/** The ayah's last word (a piece holding a letter) and its place among its words. */
function lastWord(text: string) {
  const { pieces, words } = ayahPieces(text);
  const piece = [...pieces].reverse().find((item) => item.word >= 0);
  return piece ? { text: piece.text, gap: words - 1, words } : undefined;
}

/** Endings too close to be fair: the same letters, or one inside the other ("ٱلنَّاسِ" and "وَٱلنَّاسِ"). */
function tooClose(a: string, b: string) {
  const x = arabicLetters(a);
  const y = arabicLetters(b);
  return !x || !y || x.includes(y) || y.includes(x);
}

/** The app's ayahs, surah by surah, in order (each surah's keys sorted by ayah). */
let bySurah: Map<number, number[]> | undefined;
function ayahsOf(surah: number) {
  if (!bySurah) {
    bySurah = new Map();
    for (const key of Object.keys(QURAN_AYAHS)) {
      const [s, a] = key.split(":").map(Number);
      const list = bySurah.get(s) ?? [];
      list.push(a);
      bySurah.set(s, list);
    }
    bySurah.forEach((list) => list.sort((x, y) => x - y));
  }
  return bySurah.get(surah) ?? [];
}

/**
 * Wrong endings for the ayah: the endings of the nearest other ayahs of its surah, then of the surahs next to it,
 * never one too close to the right ending or to another wrong one.
 */
export function wrongEndings(surah: number, ayah: number, right: string, count = WRONG_CHOICES) {
  const picked: string[] = [];
  const consider = (s: number, a: number) => {
    const text = QURAN_AYAHS[`${s}:${a}`];
    const ending = text ? lastWord(text)?.text : undefined;
    if (ending && !tooClose(ending, right) && !picked.some((was) => tooClose(was, ending))) picked.push(ending);
  };
  const near = (s: number, from: number) =>
    ayahsOf(s)
      .filter((a) => s !== surah || a !== ayah)
      .sort((x, y) => Math.abs(x - from) - Math.abs(y - from) || x - y);
  for (const a of near(surah, ayah)) {
    if (picked.length >= count) return picked;
    consider(surah, a);
  }
  // A short surah may not have enough different endings: the surahs next to it, their nearest ayahs first.
  for (const s of [surah + 1, surah - 1, surah + 2, surah - 2]) {
    if (s < 1 || s > 114) continue;
    for (const a of near(s, s > surah ? 1 : Number.MAX_SAFE_INTEGER)) {
      if (picked.length >= count) return picked;
      consider(s, a);
    }
  }
  return picked.length >= count ? picked : [];
}

/** The ayah itself on Quran.com, as the question's source. */
function ayahSource(surah: number, ayah: number, text: string): LessonSource {
  const reference = `Quran ${surah}:${ayah}`;
  return {
    id: `quran_${surah}_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: reference,
    url: preciseResourceUrl("Quran.com", `https://quran.com/${surah}/${ayah}`, reference),
    reference,
    from: "The Quran on Quran.com",
    grade: "Quran",
    summary: text
  };
}

/**
 * The question for this lesson, or undefined when its quote is not one whole short ayah whose words the reciter's
 * timings fit, or no fair wrong endings are found.
 */
export function reciteChallenge(lesson: Lesson, nodeId?: string): Challenge | undefined {
  const quote = lesson.quote;
  const key = parseQuranReference(quote?.reference);
  const recitation = quranAudioUrl(quote?.reference);
  if (!quote || !key || !recitation || !isArabicOnly(quote.text)) return undefined;
  const ayahKey = `${key.surah}:${key.ayah}`;
  const end = lastWord(quote.text);
  const times = ayahWordTimes(ayahKey);
  // The timings must fit the quote word for word (a whole ayah, as the reciter says it).
  if (!end || !times || times.length - 1 !== end.words || end.words < MIN_WORDS || times[end.gap] > MAX_WAIT_S) return undefined;
  const wrong = wrongEndings(key.surah, key.ayah, end.text);
  if (wrong.length < WRONG_CHOICES) return undefined;
  const id = `${lesson.id}-recite`;
  const all = [end.text, ...wrong];
  // The right ending sits in a different place lesson to lesson.
  const turn = seedOf(id) % all.length;
  const ordered = [...all.slice(turn), ...all.slice(0, turn)];
  const reference = `Quran ${ayahKey}`;
  return {
    id,
    type: "multiple_choice",
    prompt: RECITE_PROMPT,
    choices: ordered.map((label, index) => ({ id: `${id}-${index}`, label })),
    correctChoiceId: `${id}-${ordered.indexOf(end.text)}`,
    explanation: `${reference} ends with ${end.text}.`,
    sourceNodeId: nodeId,
    sourceLessonId: lesson.id,
    source: ayahSource(key.surah, key.ayah, quote.text),
    listen: { ar: quote.text, translit: "", recitation, recite: { key: ayahKey, gap: end.gap } }
  };
}

/** Each ayah's first lesson on the course's path that quotes it in Arabic. */
let firstQuoting: Map<string, string> | undefined;
export function firstLessonQuoting(ayahKey: string) {
  if (!firstQuoting) {
    firstQuoting = new Map();
    for (const node of allNodes) {
      for (const lessonId of node.lessonIds) {
        const quote = LESSONS_BY_ID[lessonId]?.quote;
        const key = quote && isArabicOnly(quote.text) ? parseQuranReference(quote.reference) : null;
        const id = key ? `${key.surah}:${key.ayah}` : undefined;
        if (id && !firstQuoting.has(id)) firstQuoting.set(id, lessonId);
      }
    }
  }
  return firstQuoting.get(ayahKey);
}

/**
 * The lesson with "How does the ayah end?" after its own questions, before any from earlier circles. Only the first
 * lesson on the path that quotes the ayah asks it, so a unit of lessons on one ayah asks it once.
 */
export function withReciteQuestion(lesson: Lesson, nodeId?: string): Lesson {
  if (lesson.challenges.some((challenge) => challenge.listen)) return lesson;
  const key = parseQuranReference(lesson.quote?.reference);
  if (!key || firstLessonQuoting(`${key.surah}:${key.ayah}`) !== lesson.id) return lesson;
  const recite = reciteChallenge(lesson, nodeId);
  if (!recite) return lesson;
  const firstReview = lesson.challenges.findIndex((challenge) => challenge.isReview);
  const at = firstReview < 0 ? lesson.challenges.length : firstReview;
  return { ...lesson, challenges: [...lesson.challenges.slice(0, at), recite, ...lesson.challenges.slice(at)] };
}
