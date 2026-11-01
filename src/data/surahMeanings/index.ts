import type { Challenge, DifficultyTier, LearningBranch, LearningCourse, LearningNode, Lesson, LessonSource } from "../../types";
import { SURAH_MEANING_AYAHS } from "../surahMeaningAyahs";
import type { Passage, PassageDeep, SurahMeaning } from "./types";
import { ALL_SURAH_MEANINGS } from "./all";
import { DEEP_002 } from "./deep002";
import { DEEP_003 } from "./deep003";
import { DEEP_004 } from "./deep004";
import { DEEP_005 } from "./deep005";
import { DEEP_006 } from "./deep006";
import { DEEP_007 } from "./deep007";
import { DEEP_008 } from "./deep008";
import { DEEP_009 } from "./deep009";
import { DEEP_010 } from "./deep010";
import { DEEP_011 } from "./deep011";
import { DEEP_012 } from "./deep012";
import { DEEP_013 } from "./deep013";
import { DEEP_014 } from "./deep014";
import { DEEP_015 } from "./deep015";
import { DEEP_016 } from "./deep016";
import { DEEP_017 } from "./deep017";
import { DEEP_018 } from "./deep018";
import { DEEP_019 } from "./deep019";
import { DEEP_020 } from "./deep020";
import { DEEP_021 } from "./deep021";
import { DEEP_022 } from "./deep022";
import { DEEP_023 } from "./deep023";
import { DEEP_024 } from "./deep024";
import { DEEP_025 } from "./deep025";
import { DEEP_026 } from "./deep026";
import { DEEP_027 } from "./deep027";
import { DEEP_028 } from "./deep028";
import { DEEP_029 } from "./deep029";
import { DEEP_030 } from "./deep030";
import { DEEP_031 } from "./deep031";
import { DEEP_032 } from "./deep032";
import { DEEP_033 } from "./deep033";
import { DEEP_034 } from "./deep034";
import { DEEP_035 } from "./deep035";
import { DEEP_036 } from "./deep036";
import { DEEP_037 } from "./deep037";
import { DEEP_038 } from "./deep038";
import { DEEP_039 } from "./deep039";
import { DEEP_040 } from "./deep040";
import { DEEP_041 } from "./deep041";
import { DEEP_042 } from "./deep042";
import { DEEP_043 } from "./deep043";
import { DEEP_044 } from "./deep044";
import { DEEP_045 } from "./deep045";
import { DEEP_046 } from "./deep046";
import { DEEP_047 } from "./deep047";
import { DEEP_048 } from "./deep048";
import { DEEP_049 } from "./deep049";
import { DEEP_050 } from "./deep050";
import { DEEP_051 } from "./deep051";
import { DEEP_052 } from "./deep052";
import { DEEP_053 } from "./deep053";
import { DEEP_054 } from "./deep054";
import { DEEP_055 } from "./deep055";
import { DEEP_056 } from "./deep056";
import { DEEP_057 } from "./deep057";
import { DEEP_058 } from "./deep058";
import { DEEP_059 } from "./deep059";
import { DEEP_060 } from "./deep060";
import { DEEP_061 } from "./deep061";
import { DEEP_062 } from "./deep062";
import { DEEP_063 } from "./deep063";
import { DEEP_064 } from "./deep064";
import { DEEP_065 } from "./deep065";
import { DEEP_066 } from "./deep066";
import { DEEP_067 } from "./deep067";
import { DEEP_068 } from "./deep068";
import { DEEP_069 } from "./deep069";
import { DEEP_070 } from "./deep070";
import { DEEP_071 } from "./deep071";
import { DEEP_072 } from "./deep072";
import { DEEP_073 } from "./deep073";
import { DEEP_074 } from "./deep074";
import { DEEP_075 } from "./deep075";
import { DEEP_076 } from "./deep076";
import { DEEP_077 } from "./deep077";
import { DEEP_078 } from "./deep078";
import { DEEP_079 } from "./deep079";
import { DEEP_080 } from "./deep080";
import { DEEP_081 } from "./deep081";
import { DEEP_082 } from "./deep082";
import { DEEP_083 } from "./deep083";
import { DEEP_084 } from "./deep084";
import { DEEP_085 } from "./deep085";
import { DEEP_086 } from "./deep086";
import { DEEP_087 } from "./deep087";
import { surahLearningRank } from "../importedNotes";
import { LESSON_SOURCES } from "../questionSources";

export type { Passage, PassageDeep, SurahMeaning } from "./types";

/** The surahs taught in depth, passage by passage, by surah number: Al-Baqarah first, the rest to follow. */
export const DEEP_PASSAGES: Record<number, Record<string, PassageDeep>> = { 2: DEEP_002, 3: DEEP_003, 4: DEEP_004, 5: DEEP_005, 6: DEEP_006, 7: DEEP_007, 8: DEEP_008, 9: DEEP_009, 10: DEEP_010, 11: DEEP_011, 12: DEEP_012, 13: DEEP_013, 14: DEEP_014, 15: DEEP_015, 16: DEEP_016, 17: DEEP_017, 18: DEEP_018, 19: DEEP_019, 20: DEEP_020, 21: DEEP_021, 22: DEEP_022, 23: DEEP_023, 24: DEEP_024, 25: DEEP_025, 26: DEEP_026, 27: DEEP_027, 28: DEEP_028, 29: DEEP_029, 30: DEEP_030, 31: DEEP_031, 32: DEEP_032, 33: DEEP_033, 34: DEEP_034, 35: DEEP_035, 36: DEEP_036, 37: DEEP_037, 38: DEEP_038, 39: DEEP_039, 40: DEEP_040, 41: DEEP_041, 42: DEEP_042, 43: DEEP_043, 44: DEEP_044, 45: DEEP_045, 46: DEEP_046, 47: DEEP_047, 48: DEEP_048, 49: DEEP_049, 50: DEEP_050, 51: DEEP_051, 52: DEEP_052, 53: DEEP_053, 54: DEEP_054, 55: DEEP_055, 56: DEEP_056, 57: DEEP_057, 58: DEEP_058, 59: DEEP_059, 60: DEEP_060, 61: DEEP_061, 62: DEEP_062, 63: DEEP_063, 64: DEEP_064, 65: DEEP_065, 66: DEEP_066, 67: DEEP_067, 68: DEEP_068, 69: DEEP_069, 70: DEEP_070, 71: DEEP_071, 72: DEEP_072, 73: DEEP_073, 74: DEEP_074, 75: DEEP_075, 76: DEEP_076, 77: DEEP_077, 78: DEEP_078, 79: DEEP_079, 80: DEEP_080, 81: DEEP_081, 82: DEEP_082, 83: DEEP_083, 84: DEEP_084, 85: DEEP_085, 86: DEEP_086, 87: DEEP_087 };

// The meaning of whole surahs, passage by passage: one learn card for each passage, so a learner who finishes a
// surah's unit has learned what every one of its ayahs says. Each card shows one ayah of the passage in Arabic
// (with its recitation) and asks about the card. A surah with a unit of its own (Al-Baqarah, Al-Mulk...) gets
// its passages at the end of that unit; any other surah gets a unit of its own, next to its short lesson in the
// Quran topic. Al-Fatihah's own unit already teaches each of its seven ayahs.

/** Surah names as the app writes them, surah 1 first. */
export const SURAH_NAMES: readonly string[] = [
  "Al-Fatihah", "Al-Baqarah", "Ali 'Imran", "An-Nisa", "Al-Ma'idah", "Al-An'am", "Al-A'raf", "Al-Anfal", "At-Tawbah", "Yunus", "Hud", "Yusuf",
  "Ar-Ra'd", "Ibrahim", "Al-Hijr", "An-Nahl", "Al-Isra", "Al-Kahf", "Maryam", "Taha", "Al-Anbya", "Al-Hajj", "Al-Mu'minun", "An-Nur", "Al-Furqan",
  "Ash-Shu'ara", "An-Naml", "Al-Qasas", "Al-'Ankabut", "Ar-Rum", "Luqman", "As-Sajdah", "Al-Ahzab", "Saba", "Fatir", "Ya-Sin", "As-Saffat", "Sad",
  "Az-Zumar", "Ghafir", "Fussilat", "Ash-Shuraa", "Az-Zukhruf", "Ad-Dukhan", "Al-Jathiyah", "Al-Ahqaf", "Muhammad", "Al-Fath", "Al-Hujurat", "Qaf",
  "Adh-Dhariyat", "At-Tur", "An-Najm", "Al-Qamar", "Ar-Rahman", "Al-Waqi'ah", "Al-Hadid", "Al-Mujadila", "Al-Hashr", "Al-Mumtahanah", "As-Saf",
  "Al-Jumu'ah", "Al-Munafiqun", "At-Taghabun", "At-Talaq", "At-Tahrim", "Al-Mulk", "Al-Qalam", "Al-Haqqah", "Al-Ma'arij", "Nuh", "Al-Jinn",
  "Al-Muzzammil", "Al-Muddaththir", "Al-Qiyamah", "Al-Insan", "Al-Mursalat", "An-Naba", "An-Nazi'at", "'Abasa", "At-Takwir", "Al-Infitar",
  "Al-Mutaffifin", "Al-Inshiqaq", "Al-Buruj", "At-Tariq", "Al-A'la", "Al-Ghashiyah", "Al-Fajr", "Al-Balad", "Ash-Shams", "Al-Layl", "Ad-Duhaa",
  "Ash-Sharh", "At-Tin", "Al-'Alaq", "Al-Qadr", "Al-Bayyinah", "Az-Zalzalah", "Al-'Adiyat", "Al-Qari'ah", "At-Takathur", "Al-'Asr", "Al-Humazah",
  "Al-Fil", "Quraysh", "Al-Ma'un", "Al-Kawthar", "Al-Kafirun", "An-Nasr", "Al-Masad", "Al-Ikhlas", "Al-Falaq", "An-Nas"
];

/** The surahs whose whole meaning is taught, in the order the Quran topic teaches them: the mushaf order. */
export const SURAH_MEANINGS: readonly SurahMeaning[] = [...ALL_SURAH_MEANINGS].sort((left, right) => surahLearningRank(left.surah) - surahLearningRank(right.surah));

/** The Quran topic's own unit for a surah, when it has one; the passages join the end of it. */
const OWN_UNITS: Record<number, string> = {
  1: "quran-surah-fatihah",
  2: "quran-surah-baqarah",
  3: "quran-surah-ali-imran",
  4: "quran-surah-nisa",
  5: "quran-surah-maidah",
  12: "quran-surah-yusuf",
  18: "quran-surah-kahf",
  19: "quran-surah-maryam",
  36: "quran-surah-yasin",
  67: "quran-surah-mulk"
};

/** "1-7" gives [1, 7]; "255" gives [255, 255]. */
export function passageAyahs(at: string): [number, number] {
  const [from, to = from] = at.split("-").map(Number);
  return [from, to];
}

function meaningSource(surah: number, at: string, line: string): LessonSource {
  const [from, to] = passageAyahs(at);
  return {
    id: `surah_meaning_${surah}_${from}_${to}`,
    site: "Quran.com",
    category: "tafsir",
    title: `${SURAH_NAMES[surah - 1]} ${surah}:${at}`,
    url: `https://quran.com/${surah}/${at}`,
    reference: `Quran ${surah}:${at}`,
    from: "Saheeh International and Tafsir Ibn Kathir, on Quran.com",
    grade: "Quran",
    summary: line
  };
}

/** A tafsir book on one passage, on Quran.com: it opens at the passage's first ayah. */
export function tafsirSource(book: "ibn-kathir" | "saadi", surah: number, at: string, summary: string): LessonSource {
  const [from] = passageAyahs(at);
  const kathir = book === "ibn-kathir";
  const name = kathir ? "Tafsir Ibn Kathir" : "Tafsir as-Sa'di";
  return {
    id: `surah_deep_${kathir ? "ibn_kathir" : "saadi"}_${surah}_${at.replace("-", "_")}`,
    site: "Quran.com",
    category: "tafsir",
    title: `${name} on ${SURAH_NAMES[surah - 1]} ${surah}:${at}`,
    url: `https://quran.com/${surah}:${from}/tafsirs/${kathir ? "en-tafisr-ibn-kathir" : "ar-tafseer-al-saddi"}`,
    reference: `${name} ${surah}:${at}`,
    from: kathir ? "Tafsir Ibn Kathir (abridged English), on Quran.com" : "Tafsir as-Sa'di (Arabic), on Quran.com",
    grade: "Tafsir",
    summary
  };
}

function hadithOf(hadith: NonNullable<PassageDeep["hadith"]>): LessonSource {
  const bukhari = hadith.collection === "bukhari";
  return {
    id: `hadith_${hadith.collection}_${hadith.number}`,
    site: "Sunnah.com",
    category: "hadith",
    title: `${bukhari ? "Sahih al-Bukhari" : "Sahih Muslim"} ${hadith.number}`,
    url: `https://sunnah.com/${hadith.collection}:${hadith.number}`,
    reference: `${bukhari ? "Sahih al-Bukhari" : "Sahih Muslim"} ${hadith.number}`,
    from: `${hadith.narrator}; collected by Imam ${bukhari ? "al-Bukhari" : "Muslim"}`,
    grade: "Sahih",
    summary: hadith.text
  };
}

// The right answer comes first, so the choices turn by a stable hash of the question id (as in deepUnits.ts).
function turn<T>(id: string, items: T[]): T[] {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 31 + id.charCodeAt(index)) | 0;
  const start = Math.abs(hash) % items.length;
  return items.map((_, index) => items[(start + index) % items.length]);
}

function choiceQuestion(id: string, prompt: string, answer: string, wrong: string[], why: string, source: LessonSource, answerSource?: LessonSource): Challenge {
  const choices = turn(id, [answer, ...wrong].map((label, index) => ({ id: "abcd"[index], label })));
  return { id, type: "multiple_choice", prompt, choices, correctChoiceId: "a", explanation: why, resourceLabel: "Open source", resourceUrl: source.url, ...(answerSource ? { source: answerSource } : {}) };
}

/** The deeper card line that holds a question's answer, for its Why; else the take-home line. */
function deepWhy(deep: PassageDeep, answer: string) {
  const words = answer.toLowerCase().match(/[a-z0-9']{4,}/g) ?? [];
  const lines = [...deep.meaning, ...(deep.story ? [deep.story] : []), deep.takeaway];
  const score = (line: string) => words.filter((word) => line.toLowerCase().includes(word)).length;
  return lines.reduce((best, line) => (score(line) > score(best) ? line : best), deep.takeaway);
}

/** The other passages to borrow wrong answers from: the nearest ones in the same surah, then the next surahs. */
function others(surah: SurahMeaning, index: number): Passage[] {
  const own = surah.passages;
  const near = own
    .map((passage, at) => ({ passage, distance: Math.abs(at - index) }))
    .filter(({ distance }) => distance > 0)
    .sort((left, right) => left.distance - right.distance)
    .map(({ passage }) => passage);
  const rest = SURAH_MEANINGS.filter((each) => each !== surah)
    .sort((left, right) => Math.abs(left.surah - surah.surah) - Math.abs(right.surah - surah.surah))
    .flatMap((each) => each.passages);
  return [...near, ...rest];
}

const OPPOSITE_SHIFT = 0.5;

function passageLesson(surah: SurahMeaning, index: number, branchId: string): Lesson {
  const passage = surah.passages[index];
  const name = SURAH_NAMES[surah.surah - 1];
  const nodeId = `surah-meaning-${surah.surah}-${passage.at}`;
  const source = meaningSource(surah.surah, passage.at, passage.line);
  const many = passage.at.includes("-");
  const pool = others(surah, index);
  const titles = pool.map((each) => each.title).filter((title, at, all) => title !== passage.title && all.indexOf(title) === at).slice(0, 3);
  const [q, a, ...wrong] = passage.q;
  // A false statement is another passage's line, from the far side of the same surah, so it is clearly about
  // something else. A surah of one passage only asks its own line.
  const far = surah.passages[(index + Math.max(1, Math.round(surah.passages.length * OPPOSITE_SHIFT))) % surah.passages.length];
  const statementTrue = index % 2 === 0 || surah.passages.length === 1;
  const challenges: Challenge[] = [
    choiceQuestion(`${nodeId}-q1`, q, a, wrong, passage.why ?? passage.line, source),
    choiceQuestion(`${nodeId}-q2`, many ? `Ayahs ${passage.at}: what are they about?` : `Ayah ${passage.at}: what is it about?`, passage.title, titles, passage.line, source),
    {
      id: `${nodeId}-q3`,
      type: "true_false",
      prompt: `${many ? `Ayahs ${passage.at} say` : `Ayah ${passage.at} says`}: ${statementTrue ? passage.line : far.line}`,
      choices: [
        { id: "true", label: "True" },
        { id: "false", label: "False" }
      ],
      correctChoiceId: statementTrue ? "true" : "false",
      explanation: passage.line,
      resourceLabel: "Open source",
      resourceUrl: source.url
    }
  ];
  // A passage taught in depth adds two harder questions about its meaning, after the card's own three.
  const deep = DEEP_PASSAGES[surah.surah]?.[passage.at];
  const tafsirs = deep ? [tafsirSource("ibn-kathir", surah.surah, passage.at, deep.meaning[0]), tafsirSource("saadi", surah.surah, passage.at, deep.meaning[0])] : [];
  const hadith = deep?.hadith ? hadithOf(deep.hadith) : undefined;
  if (deep) {
    deep.q.forEach(([prompt, answer, ...others], at) => {
      const answerSource = at === 0 && hadith ? hadith : tafsirs[0];
      challenges.push(choiceQuestion(`${nodeId}-deep-${at + 1}`, prompt, answer, others, deepWhy(deep, answer), source, answerSource));
    });
  }
  const [from, to] = passageAyahs(passage.at);
  const shown = passage.ayah === 0 ? undefined : (passage.ayah ?? from);
  const arabic = shown ? SURAH_MEANING_AYAHS[`${surah.surah}:${shown}`] : undefined;
  const difficulty = Math.min(5, 1 + Math.floor((index * 4) / Math.max(1, surah.passages.length - 1))) as DifficultyTier;
  return {
    id: `lesson-${nodeId}`,
    nodeId,
    branchId,
    surahName: name,
    ayahRange: to > from ? `${from}-${to}` : `${from}`,
    title: passage.title,
    intro: passage.line,
    learnLine: passage.line,
    learnFacts: passage.facts,
    ...(arabic ? { quote: { text: arabic, reference: `Quran ${surah.surah}:${shown}` } } : {}),
    learnSource: source,
    ...(deep ? { learnDeeper: { meaning: deep.meaning, ...(deep.story ? { story: deep.story } : {}), takeaway: deep.takeaway, sources: [...tafsirs, ...(hadith ? [hadith] : [])] } } : {}),
    lessonType: "surah",
    difficulty,
    xpReward: 10 + difficulty + (deep ? 2 : 0),
    sources: [source, ...tafsirs, ...(hadith ? [hadith] : [])],
    challenges
  };
}

// A review after every six passages, and a final quiz: one question from each passage before it, a different one
// each time, as the deep units do.
const REVIEW_EVERY = 6;

function reviewLesson(name: string, branchId: string, nodeId: string, title: string, line: string, taught: Lesson[], count: number, difficulty: DifficultyTier): Lesson {
  const picks = taught.slice(-count).map((lesson, index) => {
    const own = lesson.challenges;
    const picked = own[(own.length - 1 + taught.length + index) % own.length];
    return { ...picked, id: `${nodeId}-recall-${index + 1}`, isReview: true, sourceNodeId: lesson.nodeId, sourceLessonId: lesson.id, reviewSuggestion: `Review ${lesson.title}` };
  });
  return { id: `lesson-${nodeId}`, nodeId, branchId, surahName: name, title, intro: line, learnLine: line, lessonType: "review", difficulty, xpReward: 14, sources: [], challenges: picks };
}

export interface SurahMeaningUnit {
  surah: number;
  name: string;
  branchId: string;
  /** A branch to add to the Quran topic, for a surah with no unit of its own yet. */
  branch?: LearningBranch;
  lessons: Lesson[];
}

/** Every surah meaning unit, its lessons in path order (passages, reviews, final quiz). */
export function surahMeaningUnits(): SurahMeaningUnit[] {
  return SURAH_MEANINGS.map((surah) => {
    const name = SURAH_NAMES[surah.surah - 1];
    const own = OWN_UNITS[surah.surah];
    const branchId = own ?? `quran-surah-meaning-${surah.surah}`;
    const lessons: Lesson[] = [];
    const taught: Lesson[] = [];
    surah.passages.forEach((_, index) => {
      const lesson = passageLesson(surah, index, branchId);
      lessons.push(lesson);
      taught.push(lesson);
      const last = index === surah.passages.length - 1;
      if (!last && (index + 1) % REVIEW_EVERY === 0) {
        const round = (index + 1) / REVIEW_EVERY;
        lessons.push(reviewLesson(name, branchId, `surah-meaning-${surah.surah}-review-${round}`, "Deep review", `Can you still remember these about ${name}?`, taught, REVIEW_EVERY, 4));
      }
    });
    if (taught.length > 1) {
      lessons.push(reviewLesson(name, branchId, `surah-meaning-${surah.surah}-final-quiz`, "Final quiz", `The last test: everything about ${name}!`, taught, Math.min(8, taught.length), 5));
    }
    const branch: LearningBranch | undefined = own
      ? undefined
      : { id: branchId, topicId: "quran_tafseer", title: `Surah ${name}`, description: `Every ayah of ${name}, in simple words.`, surahName: name, ayahRange: "All" };
    return { surah: surah.surah, name, branchId, ...(branch ? { branch } : {}), lessons };
  });
}

const quranUrlSurah = (lesson: Lesson | undefined) => Number(lesson?.sources.map((source) => /quran\.com\/(\d+)/.exec(source.url)?.[1]).find(Boolean));

/** The ayah of this surah a topic lesson teaches: from its own source ("quran.com/3/200" gives 200), else its ayah range. */
function citedAyah(lesson: Lesson | undefined, surah: number): number | undefined {
  if (!lesson) return undefined;
  const pattern = new RegExp(`quran\\.com/${surah}[/:](\\d+)`);
  const own = (lesson.learnSource ?? LESSON_SOURCES[lesson.id] ?? lesson.sources[0])?.url ?? "";
  const ayah = Number(pattern.exec(own)?.[1] ?? /^(\d+)/.exec(lesson.ayahRange ?? "")?.[1]);
  return ayah > 0 ? ayah : undefined;
}

/** A topic lesson whose source is a hadith, not an ayah: the ayah its story starts at. */
const TOPIC_AYAHS: Record<string, number> = {
  "quran-surah-kahf-knowledge-and-khidr": 60
};

/**
 * Puts a surah unit's own topic lessons among its passages, each right after the passage that holds its ayah, so
 * the whole unit walks the surah from its start to its end and the learner memorizes the order as well as the
 * meaning. A topic with no ayah of its own, like the topics' review, follows the topic before it.
 */
function inAyahOrder(passages: LearningNode[], topics: LearningNode[], surah: number, lessonsById: Record<string, Lesson>): LearningNode[] {
  let last = 0;
  const waiting = topics
    .map((node, index) => {
      last = TOPIC_AYAHS[node.id] ?? (node.kind === "skill" ? citedAyah(lessonsById[node.lessonIds[0]], surah) : undefined) ?? last;
      return { node, ayah: last, index };
    })
    // The topics' review comes after the last of them.
    .map((each, _, all) => (each.node.kind === "review" ? { ...each, ayah: Math.max(...all.map(({ ayah }) => ayah)) } : each))
    .sort((left, right) => left.ayah - right.ayah || left.index - right.index);
  const sequence: LearningNode[] = [];
  for (const passage of passages) {
    if (passage.kind === "review" && passage === passages[passages.length - 1]) sequence.push(...waiting.splice(0).map(({ node }) => node));
    sequence.push(passage);
    if (passage.kind !== "skill" || !passage.ayahRange) continue;
    const [, to] = passageAyahs(passage.ayahRange);
    while (waiting.length && waiting[0].ayah <= to) sequence.push(waiting.shift()!.node);
  }
  sequence.push(...waiting.map(({ node }) => node));
  // A topic asks from memory only about lessons that now come before it: a question from a lesson that moved after
  // it becomes one from the passages just before it.
  for (const node of topics) {
    const lesson = lessonsById[node.lessonIds[0]];
    const earlier = sequence.slice(0, sequence.indexOf(node));
    const ids = new Set(earlier.map((each) => each.id));
    const recent = earlier.filter((each) => passages.includes(each) && each.kind === "skill").reverse();
    let swapped = 0;
    const challenges = lesson.challenges.map((challenge) => {
      if (!challenge.isReview || ids.has(challenge.sourceNodeId ?? "")) return challenge;
      const from = recent[swapped++];
      if (!from) return undefined;
      const fromLesson = lessonsById[from.lessonIds[0]];
      return { ...fromLesson.challenges[0], id: challenge.id, isReview: true, sourceNodeId: from.id, sourceLessonId: fromLesson.id, reviewSuggestion: `Review ${fromLesson.title}` };
    });
    lessonsById[lesson.id] = { ...lesson, challenges: challenges.filter((challenge): challenge is Challenge => Boolean(challenge)) };
  }
  return sequence;
}

/**
 * Adds each surah's passages to the Quran topic, after the deep units are in (addDeepUnits), before chainCourse.
 * A surah with its own unit gets them after that unit's opening and deep circles, with its topic lessons among
 * them in ayah order (inAyahOrder). Any other surah gets a new unit that opens with its short lesson, taken out of
 * the unit of several surahs that held it and listed just before that unit, so the path still goes surah by surah
 * (add a whole such unit's surahs in one batch). Every circle of the unit opens after the one before it. Lesson
 * and node ids are fixed, so progress stays.
 */
export function addSurahMeanings(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }) {
  const lessonsById = { ...content.lessonsById };
  const sections = content.course.sections.map((section) => {
    if (section.topicId !== "quran_tafseer") return section;
    let nodes = [...section.nodes];
    let branches = [...section.branches];
    for (const unit of surahMeaningUnits()) {
      let own = nodes.filter((node) => node.branchId === unit.branchId);
      let topics: LearningNode[] = [];
      if (unit.branch) {
        // The circle that teaches this surah's short lesson moves out of its unit of several surahs, to open the
        // surah's own unit. A circle that waited on it waits on what it waited on.
        const intro = nodes.find((node) => quranUrlSurah(lessonsById[node.lessonIds[0]]) === unit.surah && !Object.values(OWN_UNITS).includes(node.branchId));
        if (!intro) continue;
        const group = intro.branchId;
        const opener: LearningNode = { ...intro, branchId: unit.branchId, requiredNodeIds: [], order: 1 };
        lessonsById[intro.lessonIds[0]] = { ...lessonsById[intro.lessonIds[0]], branchId: unit.branchId, unlockRules: [] };
        nodes = nodes.map((node) =>
          node === intro ? opener : node.requiredNodeIds.includes(intro.id) ? { ...node, requiredNodeIds: [...node.requiredNodeIds.filter((id) => id !== intro.id), ...intro.requiredNodeIds] } : node
        );
        // Before what is left of that unit, after the surahs already taken out of it, so the path keeps its order.
        const place = branches.findIndex((branch) => branch.id === group);
        branches = [...branches.slice(0, place), unit.branch, ...branches.slice(place)];
        own = [opener];
      } else {
        if (!own.length) continue;
        topics = own.filter((node) => node.id.startsWith(`${unit.branchId}-`));
      }
      const start = own[0];
      const end = own[own.length - 1];
      const passages = unit.lessons.map((lesson, index): LearningNode => {
        lessonsById[lesson.id] = lesson;
        return {
          id: lesson.nodeId,
          skillId: `skill_surah_meaning_${unit.surah}_${index + 1}`,
          title: lesson.title,
          topicId: "quran_tafseer",
          branchId: unit.branchId,
          surahName: unit.name,
          ...(lesson.ayahRange ? { ayahRange: lesson.ayahRange } : {}),
          kind: lesson.lessonType === "review" ? "review" : "skill",
          lessonIds: [lesson.id],
          requiredNodeIds: [],
          xpReward: lesson.xpReward,
          starsReward: 3,
          order: 0,
          difficulty: lesson.difficulty
        };
      });
      const sequence = [...own.filter((node) => !topics.includes(node)), ...inAyahOrder(passages, topics, unit.surah, lessonsById)];
      const unitNodes = sequence.map((node, index) => {
        const before = sequence[index - 1];
        const lesson = lessonsById[node.lessonIds[0]];
        if (before) lessonsById[node.lessonIds[0]] = { ...lesson, unlockRules: [`Complete ${before.title}`] };
        return { ...node, requiredNodeIds: before ? [before.id] : start.requiredNodeIds, order: index + 1 };
      });
      const last = unitNodes[unitNodes.length - 1];
      // A unit that another unit waited on now hands over at its final quiz.
      const moved = (node: LearningNode) => (node.requiredNodeIds.includes(end.id) ? { ...node, requiredNodeIds: node.requiredNodeIds.map((id) => (id === end.id ? last.id : id)) } : node);
      const at = nodes.findIndex((node) => node.branchId === unit.branchId);
      const others = (from: LearningNode[]) => from.filter((node) => node.branchId !== unit.branchId).map(moved);
      nodes = [...others(nodes.slice(0, at)), ...unitNodes, ...others(nodes.slice(at))];
    }
    // A unit of several surahs whose surahs all have units of their own now is gone.
    branches = branches.filter((branch) => nodes.some((node) => node.branchId === branch.id)).map((branch, index) => ({ ...branch, order: index + 1 }));
    return { ...section, branches, nodes, starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0) };
  });
  return { course: { ...content.course, sections }, lessonsById };
}
