import type { LearningBranch, LearningCourse, LearningNode, LearningSection, Lesson, TopicId } from "../types";
import { preciseResourceUrl } from "../services/resourceSupport";
import { CHAINED_TOPICS } from "./scalableCurriculum";

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

const SURAH_RANGE_TITLE = /^Surahs \d+-\d+$/;

// "https://quran.com/18" is a whole surah; "https://quran.com/18/10" is one ayah of it.
function wholeSurahNumber(url: string | undefined) {
  const match = /^https:\/\/quran\.com\/(\d+)$/.exec(url ?? "");
  return match ? Number(match[1]) : undefined;
}

function firstSurahNumber(url: string | undefined) {
  const match = /^https:\/\/quran\.com\/(\d+)(?:[/?#]|$)/.exec(url ?? "");
  return match ? Number(match[1]) : undefined;
}

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
    const person = PERSON_UNITS[node.id.slice(node.branchId.length + 1)];
    const home = (number && surahUnits.get(number)) || person;
    if (home && unitIds.has(home)) homes.set(node.id, home);
  }
  return homes;
}

// Adds branches generated from Obsidian notes (scripts/obsidian-import). Branches from notes carry real
// facts, so they come before each topic's built-in branches, except where that would break the path:
// - a surah or companion that already has its own unit is not shown twice; its imported lesson opens that unit;
// - Quran units follow the order of the surahs;
// - in a topic taught in order (CHAINED_TOPICS), the imported lists of people follow the built-in course.
// Chaining units one after another happens later (chainCourse), once everything is in place.
export function mergeImportedNotes(course: LearningCourse, lessonsById: Record<string, Lesson>, imported: ImportedNotesContent) {
  if (!imported.sections.length) {
    return { course, lessonsById };
  }

  const importedLessons: Record<string, Lesson> = Object.fromEntries(
    Object.entries(imported.lessonsById).map(([lessonId, lesson]) => {
      const sources = lesson.sources.map((source) => ({ ...source, url: preciseResourceUrl(source.site, source.url, source.reference) }));
      return [lessonId, { ...lesson, sources, sourceReferences: sources }];
    })
  );
  const importedByTopic = new Map(imported.sections.map((section) => [section.topicId, section]));
  const missingSections = imported.sections
    .filter((extra) => !course.sections.some((section) => section.topicId === extra.topicId) && NEW_SECTIONS[extra.topicId])
    .map((extra) => ({ ...NEW_SECTIONS[extra.topicId]!, topicId: extra.topicId, starsTarget: 0, branches: [], nodes: [] }));
  const builtInLessons = { ...lessonsById };

  const sections = [...course.sections, ...missingSections].map((section) => {
    const given = importedByTopic.get(section.topicId);
    if (!given) return section;

    const existingBranchIds = new Set(section.branches.map((branch) => branch.id));
    const keptBranchIds = new Set(given.branches.filter((branch) => !existingBranchIds.has(branch.id)).map((branch) => branch.id));
    const extra = { ...given, nodes: given.nodes.filter((node) => keptBranchIds.has(node.branchId)) };
    const homes = homeUnits(section, extra, imported.lessonsById);
    const movedById = new Map(extra.nodes.filter((node) => homes.has(node.id)).map((node) => [node.id, node]));

    // A node that followed a moved node now follows whatever came before it.
    const relink = (ids: string[]): string[] => ids.flatMap((id) => (movedById.has(id) ? relink(movedById.get(id)!.requiredNodeIds) : [id]));
    const staying = extra.nodes.filter((node) => !movedById.has(node.id)).map((node) => ({ ...node, requiredNodeIds: relink(node.requiredNodeIds) }));
    const movedFirst = new Map<string, LearningNode>();
    for (const node of movedById.values()) {
      const home = homes.get(node.id)!;
      movedFirst.set(home, { ...node, branchId: home, requiredNodeIds: [] });
      for (const lessonId of node.lessonIds) {
        if (importedLessons[lessonId]) importedLessons[lessonId] = { ...importedLessons[lessonId], branchId: home, unlockRules: [] };
      }
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

    const importedBranches = given.branches
      .filter((branch) => keptBranchIds.has(branch.id) && staying.some((node) => node.branchId === branch.id))
      .map((branch) => retitleSurahRange(branch, staying, imported.lessonsById));
    const branches = placeBranches(section, importedBranches, [...staying, ...builtInNodes], imported.lessonsById).map((branch, index) => ({ ...branch, order: index + 1 }));
    const branchOrder = new Map(branches.map((branch, index) => [branch.id, index]));
    const placeInUnit = new Map<string, number>();
    const nodes = [...staying, ...builtInNodes]
      .sort((left, right) => (branchOrder.get(left.branchId) ?? 999) - (branchOrder.get(right.branchId) ?? 999))
      .map((node) => {
        const order = (placeInUnit.get(node.branchId) ?? 0) + 1;
        placeInUnit.set(node.branchId, order);
        return order === node.order ? node : { ...node, order };
      });

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

// "Surahs 1-10" without the surahs that moved to their own units becomes "Surahs 6-10".
function retitleSurahRange(branch: LearningBranch, nodes: LearningNode[], lessons: Record<string, Lesson>): LearningBranch {
  if (!SURAH_RANGE_TITLE.test(branch.title)) return branch;
  const numbers = nodes
    .filter((node) => node.branchId === branch.id)
    .map((node) => wholeSurahNumber(lessons[node.lessonIds[0]]?.sources[0]?.url))
    .filter((number): number is number => number !== undefined);
  if (!numbers.length) return branch;
  const low = Math.min(...numbers);
  const high = Math.max(...numbers);
  return { ...branch, title: low === high ? `Surah ${low}` : `Surahs ${low}-${high}` };
}

function placeBranches(section: LearningSection, importedBranches: LearningBranch[], nodes: LearningNode[], lessons: Record<string, Lesson>) {
  if (section.topicId === "quran_tafseer") {
    const firstSurah = (branch: LearningBranch) => {
      if (branch.surahName) return firstSurahNumber(branch.sourceReferences?.[0]?.url);
      const numbers = nodes
        .filter((node) => node.branchId === branch.id)
        .map((node) => wholeSurahNumber(lessons[node.lessonIds[0]]?.sources[0]?.url))
        .filter((number): number is number => number !== undefined);
      return numbers.length ? Math.min(...numbers) : undefined;
    };
    const all = [...importedBranches, ...section.branches];
    const numbered = all.map((branch, index) => ({ branch, index, surah: firstSurah(branch) }));
    if (numbered.every((entry) => entry.surah !== undefined)) {
      return numbered.sort((left, right) => left.surah! - right.surah! || left.index - right.index).map((entry) => entry.branch);
    }
    return all;
  }
  return CHAINED_TOPICS.has(section.topicId) ? [...section.branches, ...importedBranches] : [...importedBranches, ...section.branches];
}
