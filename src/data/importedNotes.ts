import type { LearningBranch, LearningCourse, LearningNode, LearningSection, Lesson, TopicId } from "../types";
import { preciseResourceUrl } from "../services/resourceSupport";

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

// Adds branches generated from Obsidian notes (scripts/obsidian-import) ahead of each topic's built-in branches.
export function mergeImportedNotes(course: LearningCourse, lessonsById: Record<string, Lesson>, imported: ImportedNotesContent) {
  if (!imported.sections.length) {
    return { course, lessonsById };
  }

  const importedLessons = Object.fromEntries(
    Object.entries(imported.lessonsById).map(([lessonId, lesson]) => {
      const sources = lesson.sources.map((source) => ({ ...source, url: preciseResourceUrl(source.site, source.url, source.reference) }));
      return [lessonId, { ...lesson, sources, sourceReferences: sources }];
    })
  );
  const importedByTopic = new Map(imported.sections.map((section) => [section.topicId, section]));
  const missingSections = imported.sections
    .filter((extra) => !course.sections.some((section) => section.topicId === extra.topicId) && NEW_SECTIONS[extra.topicId])
    .map((extra) => ({ ...NEW_SECTIONS[extra.topicId]!, topicId: extra.topicId, starsTarget: 0, branches: [], nodes: [] }));

  const sections = [...course.sections, ...missingSections].map((section) => {
    const extra = importedByTopic.get(section.topicId);
    if (!extra) return section;

    const existingBranchIds = new Set(section.branches.map((branch) => branch.id));
    const branches = extra.branches.filter((branch) => !existingBranchIds.has(branch.id));
    const keptBranchIds = new Set(branches.map((branch) => branch.id));
    const nodes = [...extra.nodes.filter((node) => keptBranchIds.has(node.branchId)), ...section.nodes];

    // Branches from notes carry real facts, so they come first; the built-in paths follow.
    return {
      ...section,
      branches: [...branches, ...section.branches].map((branch, index) => ({ ...branch, order: index + 1 })),
      nodes,
      starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0)
    };
  });

  return {
    course: { ...course, sections },
    lessonsById: { ...lessonsById, ...importedLessons }
  };
}
