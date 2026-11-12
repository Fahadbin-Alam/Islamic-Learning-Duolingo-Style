import { LESSONS_BY_ID, allNodes } from "../../data/course";
import { QURAN_AYAHS } from "../../data/quranAyahs";
import { arabicLetters } from "../../services/arabicVoice";
import { ayahPieces, ayahWordTimes } from "../../services/ayahWords";
import { parseQuranReference, quranAudioUrl } from "../../services/quranAudio";
import { preciseResourceUrl } from "../../services/resourceSupport";
import type { Challenge, Lesson, LessonSource } from "../../types";
import { isArabicOnly } from "../ArabicText";

/**
 * The Quran's listening questions, for a lesson whose quote is a whole ayah. Nothing new is written: the ayahs, their
 * words and the answers are all the Quran text the app already shows (QURAN_AYAHS), and the source is the ayah itself.
 *
 * "How does the ayah end?": the reciter recites the ayah, its words lighting up one by one, and stops before its last
 * word; the learner taps that word from three. The two wrong ones end other ayahs of the same surah (the nearest
 * first), so they sound alike, as a surah's ayahs rhyme.
 *
 * "Which ayah comes next?": the reciter recites the ayah to its end; the learner taps the ayah that follows it, from
 * three of the same surah (the nearest first: the one after it, the one before), and the reciter goes on to it.
 */

export const RECITE_PROMPT = "Listen, then tap how the ayah ends.";
export const RECITE_NEXT_PROMPT = "Listen, then tap the ayah that comes next.";
const WRONG_CHOICES = 2;
/** The reciter reaches the last word within this many seconds, so the learner never waits long for the question. */
const MAX_WAIT_S = 10;
/** At least this many words, so there is something to hear before the gap. */
const MIN_WORDS = 3;
/** "Which ayah comes next?": the ayah is recited to its end within this many seconds. */
const MAX_NEXT_LISTEN_S = 20;
/** Each answer of "Which ayah comes next?" is a whole ayah on a tile: at most this long, so three fit on a phone. */
const MAX_NEXT_CHARS = 90;

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

/** How many ayahs the surah has: the reciter's word timings hold every ayah of the Quran. */
const ayahCounts = new Map<number, number>();
function ayahCount(surah: number) {
  let count = ayahCounts.get(surah);
  if (count === undefined) {
    count = 0;
    while (ayahWordTimes(`${surah}:${count + 1}`)) count += 1;
    ayahCounts.set(surah, count);
  }
  return count;
}

/** True when the app shows every ayah of the surah, so none of its ayahs is missed when comparing them. */
function wholeSurah(surah: number) {
  const count = ayahCount(surah);
  return count > 0 && ayahsOf(surah).length === count;
}

/** True when the reciter's word timings fit the text word for word (a whole ayah, as the reciter says it). */
function fitsTimings(text: string, ayahKey: string) {
  const times = ayahWordTimes(ayahKey);
  return Boolean(times) && times!.length - 1 === ayahPieces(text).words;
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

/**
 * Wrong answers for "Which ayah comes next?": the nearest other ayahs of the surah (the one after the answer, then the
 * one before the ayah, and on), never the ayah itself, one too long for a tile, or one like the answer or each other.
 */
export function wrongNextAyahs(surah: number, ayah: number, right: string, count = WRONG_CHOICES) {
  const picked: string[] = [];
  const nearest = ayahsOf(surah)
    .filter((a) => a !== ayah && a !== ayah + 1)
    .sort((x, y) => Math.abs(x - ayah - 1) - Math.abs(y - ayah - 1) || x - y);
  for (const a of nearest) {
    const text = QURAN_AYAHS[`${surah}:${a}`];
    if (!text || text.length > MAX_NEXT_CHARS || tooClose(text, right) || picked.some((was) => tooClose(was, text))) continue;
    picked.push(text);
    if (picked.length >= count) return picked;
  }
  return [];
}

/** The ayah itself on Quran.com (or the ayah and the one after it), as the question's source. */
function ayahSource(surah: number, ayah: number, text: string, to = ayah): LessonSource {
  const ayahs = to > ayah ? `${ayah}-${to}` : `${ayah}`;
  const reference = `Quran ${surah}:${ayahs}`;
  return {
    id: `quran_${surah}_${ayahs.replace("-", "_")}`,
    site: "Quran.com",
    category: "tafsir",
    title: reference,
    url: preciseResourceUrl("Quran.com", `https://quran.com/${surah}/${ayahs}`, reference),
    reference,
    from: "The Quran on Quran.com",
    grade: "Quran",
    summary: text
  };
}

/** The answers in a steady order that differs question to question, so the right one is not always first. */
function turned(id: string, right: string, wrong: string[]) {
  const all = [right, ...wrong];
  const turn = seedOf(id) % all.length;
  const ordered = [...all.slice(turn), ...all.slice(0, turn)];
  return {
    choices: ordered.map((label, index) => ({ id: `${id}-${index}`, label })),
    correctChoiceId: `${id}-${ordered.indexOf(right)}`
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
  const reference = `Quran ${ayahKey}`;
  return {
    id,
    type: "multiple_choice",
    prompt: RECITE_PROMPT,
    ...turned(id, end.text, wrong),
    explanation: `${reference} ends with ${end.text}.`,
    sourceNodeId: nodeId,
    sourceLessonId: lesson.id,
    source: ayahSource(key.surah, key.ayah, quote.text),
    listen: { ar: quote.text, translit: "", recitation, recite: { key: ayahKey, gap: end.gap } }
  };
}

/**
 * "Which ayah comes next?" for this lesson, or undefined when its quote is not one whole ayah of a surah the app shows
 * in full, the reciter's timings do not fit it or the next ayah, the ayah is said more than once in its surah (so more
 * than one ayah follows it), or its next ayah, or two fair wrong ones, are too long for a tile.
 */
export function nextAyahChallenge(lesson: Lesson, nodeId?: string): Challenge | undefined {
  const quote = lesson.quote;
  const key = parseQuranReference(quote?.reference);
  const recitation = quranAudioUrl(quote?.reference);
  if (!quote || !key || !recitation || !isArabicOnly(quote.text) || !wholeSurah(key.surah)) return undefined;
  const { surah, ayah } = key;
  const ayahKey = `${surah}:${ayah}`;
  const nextKey = `${surah}:${ayah + 1}`;
  const next = QURAN_AYAHS[nextKey];
  const nextRecitation = quranAudioUrl(`Quran ${nextKey}`);
  if (!next || !nextRecitation || next.length > MAX_NEXT_CHARS) return undefined;
  // Both ayahs whole, word for word as the reciter says them, so each word lights up as it is recited.
  if (!fitsTimings(quote.text, ayahKey) || !fitsTimings(next, nextKey)) return undefined;
  const words = ayahPieces(quote.text).words;
  if (ayahWordTimes(ayahKey)![words] > MAX_NEXT_LISTEN_S) return undefined;
  // An ayah said more than once in its surah ("فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ") has more than one ayah after it.
  const letters = arabicLetters(QURAN_AYAHS[ayahKey] ?? quote.text);
  if (ayahsOf(surah).some((a) => a !== ayah && arabicLetters(QURAN_AYAHS[`${surah}:${a}`]) === letters)) return undefined;
  const wrong = wrongNextAyahs(surah, ayah, next);
  if (wrong.length < WRONG_CHOICES) return undefined;
  const id = `${lesson.id}-next-ayah`;
  return {
    id,
    type: "multiple_choice",
    prompt: RECITE_NEXT_PROMPT,
    ...turned(id, next, wrong),
    explanation: `After Quran ${ayahKey} comes Quran ${nextKey}.`,
    sourceNodeId: nodeId,
    sourceLessonId: lesson.id,
    source: ayahSource(surah, ayah, `${quote.text} ${next}`, ayah + 1),
    listen: { ar: quote.text, translit: "", recitation, recite: { key: ayahKey, gap: words, next: { key: nextKey, text: next, recitation: nextRecitation } } }
  };
}

/** Each ayah's lessons on the course's path that quote it in Arabic, in path order. */
let quoting: Map<string, string[]> | undefined;
function lessonsQuoting(ayahKey: string) {
  if (!quoting) {
    quoting = new Map();
    for (const node of allNodes) {
      for (const lessonId of node.lessonIds) {
        const quote = LESSONS_BY_ID[lessonId]?.quote;
        const key = quote && isArabicOnly(quote.text) ? parseQuranReference(quote.reference) : null;
        if (!key) continue;
        const id = `${key.surah}:${key.ayah}`;
        const list = quoting.get(id) ?? [];
        if (!list.includes(lessonId)) list.push(lessonId);
        quoting.set(id, list);
      }
    }
  }
  return quoting.get(ayahKey) ?? [];
}

/** Each ayah's first lesson on the course's path that quotes it in Arabic. */
export function firstLessonQuoting(ayahKey: string) {
  return lessonsQuoting(ayahKey)[0];
}

/**
 * The Quran listening question this lesson asks about its ayah, if any. The ayah's first lesson on the path asks "How
 * does the ayah end?", and the next one "Which ayah comes next?" (the first one, when it cannot ask how it ends). So
 * a unit of lessons on one ayah asks each of them once.
 */
function quranQuestionFor(lesson: Lesson, ayahKey: string, nodeId?: string) {
  const [first, second] = lessonsQuoting(ayahKey);
  const firstRecites = first !== undefined && reciteChallenge(LESSONS_BY_ID[first]) !== undefined;
  if (lesson.id === first && firstRecites) return reciteChallenge(lesson, nodeId);
  return lesson.id === (firstRecites ? second : first) ? nextAyahChallenge(lesson, nodeId) : undefined;
}

/**
 * The lesson with its Quran listening question (see quranQuestionFor) after its own questions, before any from
 * earlier circles; never in a lesson that already asks a listening question.
 */
export function withReciteQuestion(lesson: Lesson, nodeId?: string): Lesson {
  if (lesson.challenges.some((challenge) => challenge.listen)) return lesson;
  const key = parseQuranReference(lesson.quote?.reference);
  const recite = key ? quranQuestionFor(lesson, `${key.surah}:${key.ayah}`, nodeId) : undefined;
  if (!recite) return lesson;
  const firstReview = lesson.challenges.findIndex((challenge) => challenge.isReview);
  const at = firstReview < 0 ? lesson.challenges.length : firstReview;
  return { ...lesson, challenges: [...lesson.challenges.slice(0, at), recite, ...lesson.challenges.slice(at)] };
}
