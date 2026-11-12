import { LESSONS_BY_ID, allNodes } from "../../data/course";
import { QURAN_AYAHS } from "../../data/quranAyahs";
import { SURAH_NAMES } from "../../data/surahMeanings";
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
export const WHICH_SURAH_PROMPT = "Listen, then tap the surah it is from.";
const WRONG_CHOICES = 2;
/** The reciter reaches the last word within this many seconds, so the learner never waits long for the question. */
const MAX_WAIT_S = 10;
/** At least this many words, so there is something to hear before the gap. */
const MIN_WORDS = 3;
/** "Which ayah comes next?": the ayah is recited to its end within this many seconds. */
const MAX_NEXT_LISTEN_S = 20;
/** Each answer of "Which ayah comes next?" is a whole ayah on a tile: at most this long, so three fit on a phone. */
const MAX_NEXT_CHARS = 90;
/** Memorizing a surah, the right ayah may be a little longer (Al-'Asr's last ayah), as the wrong ones are short. */
const MAX_IN_ORDER_ANSWER_CHARS = 110;

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

/**
 * A text's letters (see arabicLetters), worked out once: the same ayahs are compared again and again (a surah's every
 * ayah with each of its others), which would take a slow phone a moment when Memorize surahs opens.
 */
const lettersOfText = new Map<string, string>();
function lettersOf(text: string) {
  let letters = lettersOfText.get(text);
  if (letters === undefined) {
    letters = arabicLetters(text);
    lettersOfText.set(text, letters);
  }
  return letters;
}

/** Endings too close to be fair: the same letters, or one inside the other ("ٱلنَّاسِ" and "وَٱلنَّاسِ"). */
function tooClose(a: string, b: string) {
  const x = lettersOf(a);
  const y = lettersOf(b);
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

/**
 * Wrong answers for "Which ayah comes next?" while memorizing a surah in order: as wrongNextAyahs, but never an ayah with
 * this one's words (`twins`) or one that follows such an ayah, nor one like the ayah on the card. A surah too short for
 * two takes the rest from the surahs next to it, their nearest ayahs first (the start of the one after, the end of the
 * one before).
 */
function wrongInOrderAyahs(surah: number, ayah: number, right: string, twins: number[], count = WRONG_CHOICES) {
  const shown = QURAN_AYAHS[`${surah}:${ayah}`] ?? right;
  const skip = new Set([ayah, ayah + 1, ...twins, ...twins.map((twin) => twin + 1)]);
  const picked: string[] = [];
  const consider = (s: number, a: number) => {
    const text = QURAN_AYAHS[`${s}:${a}`];
    if (!text || text.length > MAX_NEXT_CHARS || tooClose(text, right) || tooClose(text, shown) || picked.some((was) => tooClose(was, text))) return;
    picked.push(text);
  };
  const nearest = ayahsOf(surah)
    .filter((a) => !skip.has(a))
    .sort((x, y) => Math.abs(x - ayah - 1) - Math.abs(y - ayah - 1) || x - y);
  for (const a of nearest) {
    if (picked.length >= count) return picked;
    consider(surah, a);
  }
  for (const s of [surah + 1, surah - 1, surah + 2, surah - 2]) {
    if (s < 1 || s > 114) continue;
    const list = ayahsOf(s);
    for (const a of s > surah ? list : [...list].reverse()) {
      if (picked.length >= count) return picked;
      consider(s, a);
    }
  }
  return picked.length >= count ? picked : [];
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

/** An ayah to ask about: where it is, its words as the app shows them and its recitation. */
type AyahAt = { surah: number; ayah: number; text: string; recitation: string };

/**
 * "How does the ayah end?" for the ayah, or undefined when it is too short, the reciter takes too long to reach its last
 * word, his timings do not fit its words, or no fair wrong endings are found.
 */
function endingQuestion(id: string, { surah, ayah, text, recitation }: AyahAt): Challenge | undefined {
  const ayahKey = `${surah}:${ayah}`;
  const end = lastWord(text);
  const times = ayahWordTimes(ayahKey);
  // The timings must fit the text word for word (a whole ayah, as the reciter says it).
  if (!end || !times || times.length - 1 !== end.words || end.words < MIN_WORDS || times[end.gap] > MAX_WAIT_S) return undefined;
  const wrong = wrongEndings(surah, ayah, end.text);
  if (wrong.length < WRONG_CHOICES) return undefined;
  const reference = `Quran ${ayahKey}`;
  return {
    id,
    type: "multiple_choice",
    prompt: RECITE_PROMPT,
    ...turned(id, end.text, wrong),
    explanation: `${reference} ends with ${end.text}.`,
    source: ayahSource(surah, ayah, text),
    listen: { ar: text, translit: "", recitation, recite: { key: ayahKey, gap: end.gap } }
  };
}

/** The lesson's quote, when it is one ayah in Arabic the reciter can recite. */
function quotedAyah(lesson: Lesson): AyahAt | undefined {
  const quote = lesson.quote;
  const key = parseQuranReference(quote?.reference);
  const recitation = quranAudioUrl(quote?.reference);
  if (!quote || !key || !recitation || !isArabicOnly(quote.text)) return undefined;
  return { surah: key.surah, ayah: key.ayah, text: quote.text, recitation };
}

/**
 * The question for this lesson, or undefined when its quote is not one whole short ayah whose words the reciter's
 * timings fit, or no fair wrong endings are found.
 */
export function reciteChallenge(lesson: Lesson, nodeId?: string): Challenge | undefined {
  const at = quotedAyah(lesson);
  const question = at ? endingQuestion(`${lesson.id}-recite`, at) : undefined;
  return question ? { ...question, sourceNodeId: nodeId, sourceLessonId: lesson.id } : undefined;
}

/**
 * "Which ayah comes next?" for the ayah, or undefined when its surah is not one the app shows in full, the reciter's
 * timings do not fit it or the next ayah, the next ayah or two fair wrong ones are too long for a tile, or the ayah is
 * said more than once in its surah (so more than one ayah follows it). Memorizing a surah (`inOrder`), the learner goes
 * through it in order and the card says which ayah it is, so an ayah said twice is asked too, and no wrong answer is one
 * that follows it the other time; the right ayah may be a little longer, and a short surah's wrong ones come from the
 * surahs next to it.
 */
function nextQuestion(id: string, { surah, ayah, text, recitation }: AyahAt, inOrder = false): Challenge | undefined {
  if (!wholeSurah(surah)) return undefined;
  const ayahKey = `${surah}:${ayah}`;
  const nextKey = `${surah}:${ayah + 1}`;
  const next = QURAN_AYAHS[nextKey];
  const nextRecitation = quranAudioUrl(`Quran ${nextKey}`);
  if (!next || !nextRecitation || next.length > (inOrder ? MAX_IN_ORDER_ANSWER_CHARS : MAX_NEXT_CHARS)) return undefined;
  // Both ayahs whole, word for word as the reciter says them, so each word lights up as it is recited.
  if (!fitsTimings(text, ayahKey) || !fitsTimings(next, nextKey)) return undefined;
  const words = ayahPieces(text).words;
  if (ayahWordTimes(ayahKey)![words] > MAX_NEXT_LISTEN_S) return undefined;
  // An ayah said more than once in its surah ("فَبِأَيِّ ءَالَآءِ رَبِّكُمَا تُكَذِّبَانِ") has more than one ayah after it.
  const letters = lettersOf(QURAN_AYAHS[ayahKey] ?? text);
  const twins = ayahsOf(surah).filter((a) => a !== ayah && lettersOf(QURAN_AYAHS[`${surah}:${a}`]) === letters);
  if (twins.length && !inOrder) return undefined;
  const wrong = inOrder ? wrongInOrderAyahs(surah, ayah, next, twins) : wrongNextAyahs(surah, ayah, next);
  if (wrong.length < WRONG_CHOICES) return undefined;
  return {
    id,
    type: "multiple_choice",
    prompt: RECITE_NEXT_PROMPT,
    ...turned(id, next, wrong),
    explanation: `After Quran ${ayahKey} comes Quran ${nextKey}.`,
    source: ayahSource(surah, ayah, `${text} ${next}`, ayah + 1),
    listen: { ar: text, translit: "", recitation, recite: { key: ayahKey, gap: words, next: { key: nextKey, text: next, recitation: nextRecitation } } }
  };
}

/**
 * "Which ayah comes next?" for this lesson, or undefined when its quote is not one whole ayah or the question cannot be
 * made fairly (see nextQuestion).
 */
export function nextAyahChallenge(lesson: Lesson, nodeId?: string): Challenge | undefined {
  const at = quotedAyah(lesson);
  const question = at ? nextQuestion(`${lesson.id}-next-ayah`, at) : undefined;
  return question ? { ...question, sourceNodeId: nodeId, sourceLessonId: lesson.id } : undefined;
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

/** "Memorize surahs" in Practice: a surah, or part of a longer one, gone through ayah by ayah with the reciter. */
export type HifzPart = {
  /** "112", or "92:1-11" for part of a longer surah. */
  id: string;
  surah: number;
  /** Its first and last ayah. */
  from: number;
  to: number;
  /** The surah's number of ayahs. */
  ayahs: number;
};

/** At most this many ayahs at a time: a longer surah comes in parts, each starting on the ayah the one before ends on. */
const MAX_PART_AYAHS = 11;
/** The surahs to memorize, in the order they are usually learned: Al-Fatihah, then the short surahs from An-Nas back. */
const HIFZ_ORDER = [1, ...Array.from({ length: 114 - 78 + 1 }, (_, index) => 114 - index)];

function partsOf(surah: number): HifzPart[] {
  const ayahs = ayahCount(surah);
  const steps = ayahs - 1;
  const count = Math.max(1, Math.ceil(steps / (MAX_PART_AYAHS - 1)));
  return Array.from({ length: count }, (_, index) => {
    const from = 1 + Math.round((steps * index) / count);
    const to = 1 + Math.round((steps * (index + 1)) / count);
    return { id: count === 1 ? `${surah}` : `${surah}:${from}-${to}`, surah, from, to, ayahs };
  });
}

function ayahAt(surah: number, ayah: number): AyahAt | undefined {
  const text = QURAN_AYAHS[`${surah}:${ayah}`];
  const recitation = quranAudioUrl(`Quran ${surah}:${ayah}`);
  return text && recitation ? { surah, ayah, text, recitation } : undefined;
}

/**
 * The part's questions: how its first ayah ends (when that can be asked), then each ayah after it, in order, with the
 * reciter; each card says which ayah of the surah it shows. Undefined when any of its ayahs cannot be asked fairly, so a
 * part is always gone through whole.
 */
export function hifzChallenges(part: HifzPart): Challenge[] | undefined {
  const { surah, from, to } = part;
  const first = ayahAt(surah, from);
  if (!first || to <= from || !wholeSurah(surah)) return undefined;
  const id = (ayah: number, kind: string) => `hifz_${surah}_${ayah}_${kind}`;
  const opening = endingQuestion(id(from, "end"), first);
  const questions: Challenge[] = opening ? [opening] : [];
  for (let ayah = from; ayah < to; ayah += 1) {
    const here = ayahAt(surah, ayah);
    const question = here ? nextQuestion(id(ayah, "next"), here, true) : undefined;
    if (!question?.listen?.recite) return undefined;
    questions.push(question);
  }
  return questions.map((question) => ({ ...question, listen: { ...question.listen!, recite: { ...question.listen!.recite!, ayahs: part.ayahs } } }));
}

/** The part's ayahs in order, each with its Quran text and recitation, to listen to before practising them. */
export function hifzAyahs(part: HifzPart): Array<{ key: string; text: string; url: string }> {
  const ayahs: Array<{ key: string; text: string; url: string }> = [];
  for (let ayah = part.from; ayah <= part.to; ayah += 1) {
    const at = ayahAt(part.surah, ayah);
    if (at) ayahs.push({ key: `${part.surah}:${ayah}`, text: at.text, url: at.recitation });
  }
  return ayahs;
}

/** The surahs (a longer one in parts) to memorize, in order: only those whose every part can be asked. */
let hifzParts: HifzPart[] | undefined;
export function memorizeParts(): HifzPart[] {
  if (!hifzParts) {
    hifzParts = HIFZ_ORDER.filter(wholeSurah).flatMap((surah) => {
      const parts = partsOf(surah);
      return parts.every((part) => hifzChallenges(part)) ? parts : [];
    });
  }
  return hifzParts;
}

/** A seed whose bits are all stirred, so seeds of names that differ by one letter still fall far apart. */
function stirred(text: string) {
  let hash = seedOf(text);
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b) >>> 0;
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b) >>> 0;
  return (hash ^ (hash >>> 16)) >>> 0;
}

/** How many ayahs one round of "Which surah is it?" plays, each from another surah. */
export const WHICH_SURAH_QUESTIONS = 8;

/** The surahs to memorize, each once, in the order they are learned (Al-Fatihah, then An-Nas back). */
export function memorizeSurahNumbers(): number[] {
  return [...new Set(memorizeParts().map((part) => part.surah))];
}

/** The surahs to memorize that are complete: every part of each has been practised to the end (has stars), in order. */
export function completeSurahs(stars: Readonly<Record<string, number>>): number[] {
  const parts = memorizeParts();
  return memorizeSurahNumbers().filter((surah) => parts.every((part) => part.surah !== surah || (stars[part.id] ?? 0) > 0));
}

/**
 * The ayahs of a surah to memorize that "Which surah is it?" can play: two words or more, and none that another of
 * those surahs has too (the same letters, or held in one of its ayahs, or holding one), so only one name is right.
 */
let whichAyahs: Map<number, number[]> | undefined;
export function whichSurahAyahs(surah: number): number[] {
  if (!whichAyahs) {
    const surahs = memorizeSurahNumbers();
    const letters = new Map(surahs.map((each) => [each, ayahsOf(each).map((ayah) => lettersOf(QURAN_AYAHS[`${each}:${ayah}`]))]));
    whichAyahs = new Map(
      surahs.map((each) => {
        const others = surahs.filter((other) => other !== each).flatMap((other) => letters.get(other) ?? []);
        const fair = ayahsOf(each).filter((ayah) => {
          const text = QURAN_AYAHS[`${each}:${ayah}`];
          if (ayahPieces(text).words < 2 || !quranAudioUrl(`Quran ${each}:${ayah}`)) return false;
          const mine = lettersOf(text);
          return !others.some((other) => other.includes(mine) || mine.includes(other));
        });
        return [each, fair];
      })
    );
  }
  return whichAyahs.get(surah) ?? [];
}

/** The wrong names: two of the four surahs nearest in the list (they sound most alike), a different two by seed. */
function wrongSurahs(surah: number, seed: number, count = WRONG_CHOICES) {
  const list = memorizeSurahNumbers();
  const at = list.indexOf(surah);
  const near = list
    .filter((other) => other !== surah)
    .sort((a, b) => Math.abs(list.indexOf(a) - at) - Math.abs(list.indexOf(b) - at) || list.indexOf(a) - list.indexOf(b))
    .slice(0, count * 2);
  const turn = seed % near.length;
  return [...near.slice(turn), ...near.slice(0, turn)].slice(0, count);
}

/**
 * "Which surah is it?" in Memorize surahs: the reciter recites an ayah of one of the surahs (the learner taps the
 * speaker), and the learner taps the surah it is from, out of three: it and two near it in the list. A try plays one
 * ayah from each of 8 surahs, in a mixed order; the next try goes on with the next 8 in the list (the first ones are
 * the best known: Al-Fatihah, An-Nas, Al-Falaq...), so every surah comes round in turn, and each time a surah comes
 * round it plays the next of its ayahs. The source is the ayah itself.
 */
export function whichSurahChallenges(attempt = 0, count = WHICH_SURAH_QUESTIONS): Challenge[] {
  const surahs = memorizeSurahNumbers().filter((surah) => whichSurahAyahs(surah).length > 0);
  if (surahs.length <= WRONG_CHOICES) return [];
  // The surahs come one after another, try after try; `round` is how many times this one came before.
  const picked = Array.from({ length: Math.min(count, surahs.length) }, (_, index) => {
    const at = attempt * count + index;
    return { surah: surahs[at % surahs.length], round: Math.floor(at / surahs.length) };
  });
  const name = (surah: number) => `Surah ${SURAH_NAMES[surah - 1]}`;
  return picked
    .map((item) => ({ ...item, seed: stirred(`which:${attempt}:${item.surah}`) }))
    .sort((a, b) => a.seed - b.seed)
    .map(({ surah, round, seed }) => {
      const ayahs = whichSurahAyahs(surah);
      // A surah starts on an ayah of its own (not always its first), then goes on through them all.
      const ayah = ayahs[(stirred(`which:${surah}`) + round) % ayahs.length];
      const key = `${surah}:${ayah}`;
      const text = QURAN_AYAHS[key];
      const id = `which_${surah}_${ayah}`;
      return {
        id,
        type: "multiple_choice",
        prompt: WHICH_SURAH_PROMPT,
        ...turned(id, name(surah), wrongSurahs(surah, seed).map(name)),
        explanation: `Quran ${key} is in ${name(surah)}.`,
        source: ayahSource(surah, ayah, text),
        listen: { ar: text, translit: "", recitation: quranAudioUrl(`Quran ${key}`) as string, which: { key, ayahs: ayahCount(surah) } }
      } satisfies Challenge;
    });
}
