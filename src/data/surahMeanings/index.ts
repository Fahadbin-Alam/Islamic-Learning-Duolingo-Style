import type { Challenge, DifficultyTier, LearningBranch, LearningCourse, LearningNode, Lesson, LessonSource } from "../../types";
import { SURAH_MEANING_AYAHS } from "../surahMeaningAyahs";
import type { Passage, SurahMeaning } from "./types";
import { ALL_SURAH_MEANINGS } from "./all";
import { surahLearningRank } from "../importedNotes";

export type { Passage, SurahMeaning } from "./types";

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

/** The surahs whose whole meaning is taught so far, in the order the Quran topic teaches them (Juz Amma first). */
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

// The right answer comes first, so the choices turn by a stable hash of the question id (as in deepUnits.ts).
function turn<T>(id: string, items: T[]): T[] {
  let hash = 0;
  for (let index = 0; index < id.length; index += 1) hash = (hash * 31 + id.charCodeAt(index)) | 0;
  const start = Math.abs(hash) % items.length;
  return items.map((_, index) => items[(start + index) % items.length]);
}

function choiceQuestion(id: string, prompt: string, answer: string, wrong: string[], why: string, source: LessonSource): Challenge {
  const choices = turn(id, [answer, ...wrong].map((label, index) => ({ id: "abcd"[index], label })));
  return { id, type: "multiple_choice", prompt, choices, correctChoiceId: "a", explanation: why, resourceLabel: "Open source", resourceUrl: source.url };
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
    lessonType: "surah",
    difficulty,
    xpReward: 10 + difficulty,
    sources: [source],
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

/**
 * Adds each surah's passages to the Quran topic, after the deep units are in (addDeepUnits), before chainCourse.
 * A surah with its own unit gets them at the end of that unit, each opening after the one before. Any other
 * surah gets a new unit that opens with its short lesson, taken out of the unit of several surahs that held it
 * and listed just before that unit, so the path still goes surah by surah (add a whole such unit's surahs in one
 * batch). Lesson and node ids are fixed, so progress stays.
 */
export function addSurahMeanings(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }) {
  const lessonsById = { ...content.lessonsById };
  const sections = content.course.sections.map((section) => {
    if (section.topicId !== "quran_tafseer") return section;
    let nodes = [...section.nodes];
    let branches = [...section.branches];
    for (const unit of surahMeaningUnits()) {
      let own = nodes.filter((node) => node.branchId === unit.branchId);
      let at: number;
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
        at = nodes.indexOf(opener) + 1;
      } else {
        if (!own.length) continue;
        at = nodes.lastIndexOf(own[own.length - 1]) + 1;
      }
      let previous = own[own.length - 1];
      const end = previous;
      const added = unit.lessons.map((lesson, index) => {
        const node: LearningNode = {
          id: lesson.nodeId,
          skillId: `skill_surah_meaning_${unit.surah}_${index + 1}`,
          title: lesson.title,
          topicId: "quran_tafseer",
          branchId: unit.branchId,
          surahName: unit.name,
          ...(lesson.ayahRange ? { ayahRange: lesson.ayahRange } : {}),
          kind: lesson.lessonType === "review" ? "review" : "skill",
          lessonIds: [lesson.id],
          requiredNodeIds: previous ? [previous.id] : [],
          xpReward: lesson.xpReward,
          starsReward: 3,
          order: own.length + index + 1,
          difficulty: lesson.difficulty
        };
        lessonsById[lesson.id] = { ...lesson, unlockRules: previous ? [`Complete ${previous.title}`] : [] };
        previous = node;
        return node;
      });
      // A unit that another unit waited on now hands over at its final quiz.
      const moved = (node: LearningNode) =>
        end && node.branchId !== unit.branchId && node.requiredNodeIds.includes(end.id) ? { ...node, requiredNodeIds: node.requiredNodeIds.map((id) => (id === end.id ? previous.id : id)) } : node;
      nodes = [...nodes.slice(0, at).map(moved), ...added, ...nodes.slice(at).map(moved)];
    }
    // A unit of several surahs whose surahs all have units of their own now is gone.
    branches = branches.filter((branch) => nodes.some((node) => node.branchId === branch.id)).map((branch, index) => ({ ...branch, order: index + 1 }));
    return { ...section, branches, nodes, starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0) };
  });
  return { course: { ...content.course, sections }, lessonsById };
}
