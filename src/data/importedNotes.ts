import type { LearningBranch, LearningCourse, LearningNode, LearningSection, Lesson, TopicId } from "../types";
import { preciseResourceUrl } from "../services/resourceSupport";
import { HADITH_BASICS } from "./hadithBasics";
import { quranAyahArabic } from "./quranAyahs";

export interface ImportedNotesSection {
  topicId: TopicId;
  branches: LearningBranch[];
  nodes: LearningNode[];
}

export interface ImportedNotesContent {
  sections: ImportedNotesSection[];
  lessonsById: Record<string, Lesson>;
}

// Topics that only exist through imported notes get their section from here.
const NEW_SECTIONS: Partial<Record<TopicId, Omit<LearningSection, "topicId" | "starsTarget" | "branches" | "nodes">>> = {
  hadith: {
    id: "hadith",
    title: "Hadith",
    description: "Narrations of the Prophet ﷺ with their references, one hadith at a time.",
    badge: "Topic 8",
    focus: "The words of the Prophet ﷺ, where they are recorded, and what they teach.",
    mascot: "muslim_man",
    accentColor: "#3E8E7E"
  }
};

// Imported people who already have a whole unit of their own. Their fact lesson opens that unit instead of
// showing up a second time in a list of companions. Keys are the person part of the imported node id.
const PERSON_UNITS: Record<string, string> = {
  "abu-bakr-as-siddiq": "sahabi-abu-bakr",
  "umar-ibn-al-khattab": "sahabi-umar-ibn-al-khattab",
  "uthman-ibn-affan": "sahabi-uthman-ibn-affan",
  "ali-ibn-abi-talib": "sahabi-ali-ibn-abi-talib",
  "khalid-ibn-al-walid": "sahabi-khalid-ibn-al-walid",
  bilal: "sahabi-bilal-ibn-rabah",
  "abu-ubaydah-ibn-al-jarrah": "sahabi-abu-ubaydah-ibn-al-jarrah",
  "zubayr-ibn-al-awwam": "sahabi-az-zubayr-ibn-al-awwam",
  "salmaan-al-faarisiy": "sahabi-salman-al-farisi",
  "abu-dharr-al-ghifaariy": "sahabi-abu-dharr-al-ghifari",
  "abd-allah-ibn-masuud": "sahabi-abdullah-ibn-masud",
  "anas-ibn-malik": "sahabi-anas-ibn-malik"
};

// Imported prophets and women who already have a lesson of their own. Each person is taught once: the
// imported lesson is left out and its facts go on that lesson's learn card. Keys are the person part of the
// imported node id; a lesson about two people (Hud and Salih) gets each one's facts with their name.
export const PERSON_LESSONS: Record<string, string> = {
  adam: "prophets-adam",
  noah: "prophets-nuh",
  ibrahim: "prophets-ibrahim",
  yusuf: "prophets-yusuf",
  musa: "prophets-musa",
  isa: "prophets-isa",
  muhammad: "prophets-muhammad",
  hud: "prophets-early-messengers-hud-and-salih",
  shaleh: "prophets-early-messengers-hud-and-salih",
  lut: "prophets-early-messengers-lut-and-purity",
  ismail: "prophets-family-and-sacrifice-ismail-and-submission",
  yaqub: "prophets-family-and-sacrifice-yaqub-and-sabr",
  harun: "prophets-power-and-deliverance-harun-and-support",
  dawud: "prophets-power-and-deliverance-dawud-and-justice",
  sulaiman: "prophets-power-and-deliverance-sulayman-and-gratitude",
  maryam: "women-maryam",
  "khadijah-bint-khuwaylid": "women-khadijah",
  "aisha-bint-abu-bakr": "women-aishah",
  "hafsa-bint-umar": "women-hafsah",
  "sawdah-bint-zamah": "women-mothers-depth-sawdah-and-stability"
};

// Hadith from the notes come in two units after "Hadith for kids" (src/data/hadithBasics.ts): sayings a
// young child can act on (level 1 to 3), then marriage and family life (level 4 and up), which opens only once
// the unit before it is finished. Each unit keeps the id of an imported unit, so saved progress still counts.
const HADITH_UNITS: { title: string; description: string; maxLevel: number; gated?: boolean }[] = [
  { title: "Safe with Allah", description: "Hold on to Allah's Book and ask Him to keep you safe.", maxLevel: 3 },
  { title: "Marriage in the Sunnah", description: "What the Prophet ﷺ taught about marriage, for older learners.", maxLevel: Infinity, gated: true }
];

// The imported women, by theme: one unit each, in this order. Keys are the person part of the node id.
const WOMEN_UNITS: { title: string; description: string; people: string[] }[] = [
  {
    title: "Mothers",
    description: "Mothers of prophets and of great Muslims.",
    people: ["grandmother-of-isa-wife-of-imran", "hajar", "sarah", "aminah-bint-wahb", "halima-al-sadeya", "umayma-bint-abd-al-muttalib", "barrah-bint-samuel"]
  },
  {
    title: "Wives of the Prophet ﷺ",
    description: "More Mothers of the Believers.",
    people: [
      "juwayriya-bint-al-harith",
      "maymunah-bint-al-harith",
      "safiyyah-bint-huyayy",
      "umm-habibah",
      "umm-salamah-wife-of-the-prophet",
      "zaynab-bint-jahsh",
      "zaynab-bint-khuzayma"
    ]
  },
  {
    title: "Ali's family",
    description: "Ali's wives, his daughters and his family after them.",
    people: [
      "al-sahba-al-taghlibiyyah",
      "khawlah-bint-jafar-al-hanifiyyah",
      "layla-bint-masud-al-tamimiyyah",
      "umm-al-banin",
      "umm-said-bint-urwah-al-thaqafiyyah",
      "umm-kulthoom-bint-ali",
      "zaynab-bint-ali",
      "sayyida-nafisa"
    ]
  }
];

// A unit of imported lessons holds at most this many, so a list of names never becomes a wall.
const MAX_UNIT_SIZE = 10;
// A learn-card chip stays a few words ("Father: Azar").
const MAX_CHIP_WORDS = 5;

/**
 * Where a surah comes in the Quran path: Al-Fatihah first, then Juz Amma from An-Nas back to An-Naba
 * (114, 113, ... 78), the short surahs children learn first, then the rest in the order of the mushaf.
 */
export function surahLearningRank(surah: number) {
  if (surah === 1) return 0;
  if (surah >= 78) return 1 + (114 - surah);
  return 100 + surah;
}

// "https://quran.com/18" is a whole surah; "https://quran.com/18/10" is one ayah of it.
function wholeSurahNumber(url: string | undefined) {
  const match = /^https:\/\/quran\.com\/(\d+)$/.exec(url ?? "");
  return match ? Number(match[1]) : undefined;
}

function firstSurahNumber(url: string | undefined) {
  const match = /^https:\/\/quran\.com\/(\d+)(?:[/?#]|$)/.exec(url ?? "");
  return match ? Number(match[1]) : undefined;
}

const personSlug = (node: LearningNode) => node.id.slice(node.branchId.length + 1);

// The built-in unit an imported node belongs in: the surah's own unit, or the person's own unit.
function homeUnits(section: LearningSection, extra: ImportedNotesSection, lessons: Record<string, Lesson>) {
  const unitIds = new Set(section.branches.map((branch) => branch.id));
  const surahUnits = new Map<number, string>();
  for (const branch of section.branches) {
    const number = branch.surahName ? firstSurahNumber(branch.sourceReferences?.[0]?.url) : undefined;
    if (number && !surahUnits.has(number)) surahUnits.set(number, branch.id);
  }

  const homes = new Map<string, string>();
  for (const node of extra.nodes) {
    const lesson = lessons[node.lessonIds[0]];
    const number = section.topicId === "quran_tafseer" && lesson?.sources.length === 1 ? wholeSurahNumber(lesson.sources[0].url) : undefined;
    const person = PERSON_UNITS[personSlug(node)];
    const home = (number && surahUnits.get(number)) || person;
    if (home && unitIds.has(home)) homes.set(node.id, home);
  }
  return homes;
}

// Imported people who already have a built-in lesson, by imported node id.
function personLessons(section: LearningSection, extra: ImportedNotesSection) {
  const nodeIds = new Set(section.nodes.map((node) => node.id));
  const folds = new Map<string, string>();
  for (const node of extra.nodes) {
    const target = PERSON_LESSONS[personSlug(node)];
    if (target && nodeIds.has(target)) folds.set(node.id, target);
  }
  return folds;
}

// Splits items into as few runs of at most `size` as possible, with runs of nearly equal length.
function evenChunks<T>(items: T[], size = MAX_UNIT_SIZE): T[][] {
  const count = Math.ceil(items.length / size);
  const chunks: T[][] = [];
  let start = 0;
  for (let index = 0; index < count; index += 1) {
    const length = Math.ceil((items.length - start) / (count - index));
    chunks.push(items.slice(start, start + length));
    start += length;
  }
  return chunks;
}

function difficultyRange(nodes: LearningNode[]): LearningBranch["difficultyRange"] {
  const levels = nodes.map((node) => node.difficulty).filter((level): level is NonNullable<typeof level> => level !== undefined);
  if (!levels.length) return undefined;
  return { start: Math.min(...levels) as NonNullable<LearningNode["difficulty"]>, end: Math.max(...levels) as NonNullable<LearningNode["difficulty"]> };
}

interface Regrouped {
  branches: LearningBranch[];
  nodes: LearningNode[];
}

// Puts the given nodes into the given units, in order: the first node of a unit opens it and every other
// node follows the one before it.
function chainUnits(groups: { branch: LearningBranch; nodes: LearningNode[] }[], lessons: Record<string, Lesson>): Regrouped {
  const nodes: LearningNode[] = [];
  for (const { branch, nodes: members } of groups) {
    members.forEach((node, index) => {
      const previous = index > 0 ? members[index - 1] : undefined;
      nodes.push({ ...node, branchId: branch.id, requiredNodeIds: previous ? [previous.id] : [] });
      for (const lessonId of node.lessonIds) {
        if (lessons[lessonId]) lessons[lessonId] = { ...lessons[lessonId], branchId: branch.id, unlockRules: previous ? [`Complete ${previous.title}`] : [] };
      }
    });
  }
  return { branches: groups.map(({ branch, nodes: members }) => ({ ...branch, difficultyRange: difficultyRange(members) ?? branch.difficultyRange })), nodes };
}

// Quran: imported surahs, in learning order, in units of up to ten between the surahs with units of their own.
function regroupSurahs(section: LearningSection, given: LearningBranch[], staying: LearningNode[], lessons: Record<string, Lesson>): Regrouped {
  const surahOf = (node: LearningNode) => wholeSurahNumber(lessons[node.lessonIds[0]]?.sources[0]?.url);
  const rankOf = (node: LearningNode) => {
    const number = surahOf(node);
    return number ? surahLearningRank(number) : Infinity;
  };
  const sorted = staying.map((node, index) => ({ node, index, rank: rankOf(node) })).sort((left, right) => left.rank - right.rank || left.index - right.index);
  const unitRanks = section.branches
    .map((branch) => firstSurahNumber(branch.sourceReferences?.[0]?.url))
    .filter((number): number is number => number !== undefined)
    .map(surahLearningRank)
    .sort((left, right) => left - right);

  // Runs of imported surahs that sit between two built-in units.
  const runs: LearningNode[][] = [];
  let run: LearningNode[] = [];
  let boundary = 0;
  for (const { node, rank } of sorted) {
    while (boundary < unitRanks.length && rank > unitRanks[boundary]) {
      boundary += 1;
      if (run.length) runs.push(run);
      run = [];
    }
    run.push(node);
  }
  if (run.length) runs.push(run);

  const template = given[0];
  const groups = runs.flatMap((members) => evenChunks(members)).map((members) => {
    const first = surahOf(members[0]);
    const last = surahOf(members[members.length - 1]);
    const span = first && last ? (first === last ? `${first}` : `${first}-${last}`) : undefined;
    const branch: LearningBranch = {
      ...template,
      id: span ? `notes-quran-tafseer-surahs-${span}` : `${template.id}-${members[0].id}`,
      title: span ? (first === last ? `Surah ${first}` : `Surahs ${span}`) : template.title,
      sourceReferences: []
    };
    return { branch, nodes: members };
  });
  return chainUnits(groups, lessons);
}

// Prophets: the units keep their ids, but lessons are dealt out again in order, so units stay even after
// some lessons moved elsewhere.
function regroupInOrder(given: LearningBranch[], staying: LearningNode[], lessons: Record<string, Lesson>): Regrouped {
  const chunks = evenChunks(staying);
  if (chunks.length > given.length) return { branches: given, nodes: staying };
  const base = given[0].title.replace(/\s+\d+$/, "");
  const groups = chunks.map((members, index) => ({
    branch: { ...given[index], title: chunks.length > 1 ? `${base} ${index + 1}` : base },
    nodes: members
  }));
  return chainUnits(groups, lessons);
}

// A unit like the given one, for a group the notes had no unit for.
function extraBranch(given: LearningBranch[], index: number, suffix: string): LearningBranch {
  return given[index] ?? { ...given[given.length - 1], id: `${given[0].id.replace(/-\d+$/, "")}-${suffix}` };
}

// Hadith: by level into HADITH_UNITS, sayings for young children first.
function regroupHadith(given: LearningBranch[], staying: LearningNode[], lessons: Record<string, Lesson>): Regrouped {
  const levelOf = (node: LearningNode) => lessons[node.lessonIds[0]]?.difficulty ?? node.difficulty ?? 3;
  const ordered = staying
    .map((node, index) => ({ node, index, level: levelOf(node) }))
    .sort((left, right) => left.level - right.level || left.index - right.index)
    .map(({ node }) => node);
  let floor = 0;
  const groups = HADITH_UNITS.map((unit, index) => {
    const members = ordered.filter((node) => levelOf(node) > floor && levelOf(node) <= unit.maxLevel);
    floor = unit.maxLevel;
    const branch: LearningBranch = { ...extraBranch(given, index, `${index + 1}`), title: unit.title, description: unit.description };
    return { branch: unit.gated ? { ...branch, gated: true } : branch, nodes: members };
  }).filter((group) => group.nodes.length);
  return chainUnits(groups, lessons);
}

// Women: one unit per theme in WOMEN_UNITS; anyone the themes do not name goes in a last unit.
function regroupWomen(given: LearningBranch[], staying: LearningNode[], lessons: Record<string, Lesson>): Regrouped {
  const themeOf = new Map(WOMEN_UNITS.flatMap((unit, index) => unit.people.map((person) => [person, index] as const)));
  const groups = WOMEN_UNITS.map((unit, index) => ({
    branch: { ...extraBranch(given, index, `${index + 1}`), title: unit.title, description: unit.description },
    nodes: unit.people.map((person) => staying.find((node) => personSlug(node) === person)).filter((node): node is LearningNode => Boolean(node))
  }));
  const others = staying.filter((node) => !themeOf.has(personSlug(node)));
  if (others.length) groups.push({ branch: { ...extraBranch(given, WOMEN_UNITS.length, "more"), title: "More great women" }, nodes: others });
  return chainUnits(
    groups.filter((group) => group.nodes.length),
    lessons
  );
}

// A gated unit's first circle follows the last circle of the unit before it.
function gateUnits(branches: LearningBranch[], nodes: LearningNode[], lessons: Record<string, Lesson>): LearningNode[] {
  const firstToPrevious = new Map<string, LearningNode>();
  let previousLast: LearningNode | undefined;
  for (const branch of branches) {
    const members = nodes.filter((node) => node.branchId === branch.id);
    if (!members.length) continue;
    if (branch.gated && previousLast) firstToPrevious.set(members[0].id, previousLast);
    previousLast = members[members.length - 1];
  }
  return nodes.map((node) => {
    const previous = firstToPrevious.get(node.id);
    if (!previous) return node;
    for (const lessonId of node.lessonIds) {
      if (lessons[lessonId]) lessons[lessonId] = { ...lessons[lessonId], unlockRules: [`Complete ${previous.title}`] };
    }
    return { ...node, requiredNodeIds: [previous.id] };
  });
}

// "Tribe: Thamud" about Salih on a lesson about Hud and Salih reads "Salih's tribe: Thamud".
function namedChip(name: string, chip: string) {
  const labelled = /^([^:]+):\s*(.+)$/.exec(chip);
  return labelled ? `${name}'s ${labelled[1].toLowerCase()}: ${labelled[2]}` : `${name}: ${chip.charAt(0).toLowerCase()}${chip.slice(1)}`;
}

// The facts of an imported person, for the learn card of their built-in lesson.
function foldFacts(builtIn: Lesson, people: { name: string; lesson: Lesson }[]): Lesson {
  if (builtIn.learnFacts?.length) return builtIn;
  const shared = people.length > 1;
  const chips = people
    .flatMap(({ name, lesson }) => (lesson.learnFacts ?? []).map((chip) => (shared ? namedChip(name, chip) : chip)))
    .filter((chip) => chip.split(/\s+/).length <= MAX_CHIP_WORDS)
    .slice(0, 3);
  const line = !shared ? people[0].lesson.learnLine : undefined;
  return {
    ...builtIn,
    ...(chips.length ? { learnFacts: chips } : {}),
    ...(!builtIn.learnLine && line ? { learnLine: line } : {})
  };
}

// Adds branches generated from Obsidian notes (scripts/obsidian-import) to the built-in course:
// - a surah or companion that already has its own unit is not shown twice; its imported lesson opens that unit;
// - a prophet or woman with a built-in lesson is taught there; the imported facts go on its learn card;
// - Quran units follow the learning order (Al-Fatihah, Juz Amma from An-Nas back, then the mushaf);
// - hadith start with "Hadith for kids" (hadithBasics.ts), then sayings for young children, then marriage,
//   which opens only once the unit before it is finished (gated);
// - imported women are grouped by theme (WOMEN_UNITS);
// - a surah's quote is shown in Arabic (quranAyahs.ts);
// - the built-in units of a topic come first (Abu Bakr, Umar, Uthman and Ali lead the companions), then the
//   imported lists.
// Chaining units one after another happens later (chainCourse), once everything is in place.
export function mergeImportedNotes(course: LearningCourse, lessonsById: Record<string, Lesson>, imported: ImportedNotesContent) {
  if (!imported.sections.length) {
    return { course, lessonsById };
  }

  const importedLessons: Record<string, Lesson> = Object.fromEntries(
    Object.entries(imported.lessonsById).map(([lessonId, lesson]) => {
      const sources = lesson.sources.map((source) => ({ ...source, url: preciseResourceUrl(source.site, source.url, source.reference) }));
      const learnSource = lesson.learnSource && { ...lesson.learnSource, url: preciseResourceUrl(lesson.learnSource.site, lesson.learnSource.url, lesson.learnSource.reference) };
      // The notes quote an ayah in old English ("Woe unto every slandering traducer"); the card shows the ayah itself.
      const arabic = lesson.quote?.reference ? quranAyahArabic(lesson.quote.reference) : undefined;
      return [
        lessonId,
        { ...lesson, sources, sourceReferences: sources, ...(learnSource ? { learnSource } : {}), ...(lesson.quote && arabic ? { quote: { ...lesson.quote, text: arabic } } : {}) }
      ];
    })
  );
  const importedByTopic = new Map(imported.sections.map((section) => [section.topicId, section]));
  const missingSections = imported.sections
    .filter((extra) => !course.sections.some((section) => section.topicId === extra.topicId) && NEW_SECTIONS[extra.topicId])
    .map((extra) =>
      extra.topicId === "hadith"
        ? { ...NEW_SECTIONS.hadith!, topicId: extra.topicId, starsTarget: 0, branches: [HADITH_BASICS.branch], nodes: HADITH_BASICS.nodes }
        : { ...NEW_SECTIONS[extra.topicId]!, topicId: extra.topicId, starsTarget: 0, branches: [], nodes: [] }
    );
  const builtInLessons = { ...lessonsById, ...(missingSections.some((section) => section.topicId === "hadith") ? HADITH_BASICS.lessonsById : {}) };

  const sections = [...course.sections, ...missingSections].map((section) => {
    const given = importedByTopic.get(section.topicId);
    if (!given) return section;

    const existingBranchIds = new Set(section.branches.map((branch) => branch.id));
    const keptBranches = given.branches.filter((branch) => !existingBranchIds.has(branch.id));
    const keptBranchIds = new Set(keptBranches.map((branch) => branch.id));
    const extra = { ...given, nodes: given.nodes.filter((node) => keptBranchIds.has(node.branchId)) };
    const homes = homeUnits(section, extra, imported.lessonsById);
    const folds = personLessons(section, extra);
    const movedById = new Map(extra.nodes.filter((node) => homes.has(node.id)).map((node) => [node.id, node]));
    const foldedById = new Map(extra.nodes.filter((node) => folds.has(node.id) && !homes.has(node.id)).map((node) => [node.id, node]));
    const leaving = new Map([...movedById, ...foldedById]);

    // A node that followed a node that left now follows whatever came before it.
    const relink = (ids: string[]): string[] => ids.flatMap((id) => (leaving.has(id) ? relink(leaving.get(id)!.requiredNodeIds) : [id]));
    const staying = extra.nodes.filter((node) => !leaving.has(node.id)).map((node) => ({ ...node, requiredNodeIds: relink(node.requiredNodeIds) }));

    const movedFirst = new Map<string, LearningNode>();
    for (const node of movedById.values()) {
      const home = homes.get(node.id)!;
      movedFirst.set(home, { ...node, branchId: home, requiredNodeIds: [] });
      for (const lessonId of node.lessonIds) {
        if (importedLessons[lessonId]) importedLessons[lessonId] = { ...importedLessons[lessonId], branchId: home, unlockRules: [] };
      }
    }

    const foldedInto = new Map<string, { name: string; lesson: Lesson }[]>();
    for (const node of foldedById.values()) {
      const target = folds.get(node.id)!;
      const lesson = importedLessons[node.lessonIds[0]];
      if (lesson) foldedInto.set(target, [...(foldedInto.get(target) ?? []), { name: node.title, lesson }]);
      for (const lessonId of node.lessonIds) delete importedLessons[lessonId];
    }
    for (const [target, people] of foldedInto) {
      const node = section.nodes.find((each) => each.id === target)!;
      const lessonId = node.lessonIds[0];
      if (builtInLessons[lessonId]) builtInLessons[lessonId] = foldFacts(builtInLessons[lessonId], people);
    }

    const builtInNodes = section.nodes.flatMap((node, index) => {
      const opener = movedFirst.get(node.branchId);
      const isFirst = opener && section.nodes.findIndex((other) => other.branchId === node.branchId) === index;
      if (!opener || !isFirst) return [node];
      for (const lessonId of node.lessonIds) {
        if (builtInLessons[lessonId]) builtInLessons[lessonId] = { ...builtInLessons[lessonId], unlockRules: [`Complete ${opener.title}`] };
      }
      return [opener, { ...node, requiredNodeIds: node.requiredNodeIds.length ? node.requiredNodeIds : [opener.id] }];
    });

    const regrouped: Regrouped = !staying.length
      ? { branches: [], nodes: [] }
      : section.topicId === "quran_tafseer"
        ? regroupSurahs(section, keptBranches, staying, importedLessons)
        : section.topicId === "sahabah"
          ? { branches: keptBranches, nodes: staying }
          : section.topicId === "hadith"
            ? regroupHadith(keptBranches, staying, importedLessons)
            : section.topicId === "women_of_the_book"
              ? regroupWomen(keptBranches, staying, importedLessons)
              : regroupInOrder(keptBranches, staying, importedLessons);
    const importedBranches = regrouped.branches.filter((branch) => regrouped.nodes.some((node) => node.branchId === branch.id));
    const allNodes = [...regrouped.nodes, ...builtInNodes];
    const branches = placeBranches(section, importedBranches, allNodes, importedLessons).map((branch, index) => ({ ...branch, order: index + 1 }));
    const branchOrder = new Map(branches.map((branch, index) => [branch.id, index]));
    const placeInUnit = new Map<string, number>();
    const sorted = allNodes
      .map((node, index) => ({ node, index }))
      .sort((left, right) => (branchOrder.get(left.node.branchId) ?? 999) - (branchOrder.get(right.node.branchId) ?? 999) || left.index - right.index)
      .map(({ node }) => {
        const order = (placeInUnit.get(node.branchId) ?? 0) + 1;
        placeInUnit.set(node.branchId, order);
        return order === node.order ? node : { ...node, order };
      });
    const nodes = gateUnits(branches, sorted, importedLessons);

    return {
      ...section,
      branches,
      nodes,
      starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0)
    };
  });

  return {
    course: { ...course, sections },
    lessonsById: { ...builtInLessons, ...importedLessons }
  };
}

function placeBranches(section: LearningSection, importedBranches: LearningBranch[], nodes: LearningNode[], lessons: Record<string, Lesson>) {
  if (section.topicId === "quran_tafseer") {
    const firstRank = (branch: LearningBranch) => {
      if (branch.surahName) {
        const number = firstSurahNumber(branch.sourceReferences?.[0]?.url);
        return number ? surahLearningRank(number) : undefined;
      }
      const ranks = nodes
        .filter((node) => node.branchId === branch.id)
        .map((node) => wholeSurahNumber(lessons[node.lessonIds[0]]?.sources[0]?.url))
        .filter((number): number is number => number !== undefined)
        .map(surahLearningRank);
      return ranks.length ? Math.min(...ranks) : undefined;
    };
    const all = [...section.branches, ...importedBranches];
    const ranked = all.map((branch, index) => ({ branch, index, rank: firstRank(branch) }));
    if (ranked.every((entry) => entry.rank !== undefined)) {
      return ranked.sort((left, right) => left.rank! - right.rank! || left.index - right.index).map((entry) => entry.branch);
    }
    return all;
  }
  return [...section.branches, ...importedBranches];
}
