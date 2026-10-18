import type { LearningBranch, LearningCourse, LearningNode, Lesson, TopicId } from "../types";
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

// Adds branches generated from Obsidian notes (scripts/obsidian-import) after each topic's existing branches.
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

  const sections = course.sections.map((section) => {
    const extra = importedByTopic.get(section.topicId);
    if (!extra) return section;

    const existingBranchIds = new Set(section.branches.map((branch) => branch.id));
    const branches = extra.branches.filter((branch) => !existingBranchIds.has(branch.id));
    const keptBranchIds = new Set(branches.map((branch) => branch.id));
    const nextOrder = section.branches.reduce((highest, branch) => Math.max(highest, branch.order ?? 0), 0) + 1;
    const nodes = [...section.nodes, ...extra.nodes.filter((node) => keptBranchIds.has(node.branchId))];

    return {
      ...section,
      branches: [...section.branches, ...branches.map((branch, index) => ({ ...branch, order: nextOrder + index }))],
      nodes,
      starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0)
    };
  });

  return {
    course: { ...course, sections },
    lessonsById: { ...lessonsById, ...importedLessons }
  };
}
