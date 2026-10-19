import type { LearningCourse, LearningNode, LearningSection, Lesson, TopicId } from "../types";

// Each person is taught in one unit. A prophet or a woman with a lesson of their own gets the lessons that
// teach more about them (src/data/scalableCurriculum.ts) right after it, in the same unit, and the Mothers of the
// Believers from the notes join the Mothers of the Believers unit, in the order the Prophet ﷺ married them.
// A unit listed here holds these lessons in this order, and then any other lesson it already had; a unit left
// with no lessons is not on the path. Lesson and node ids never change, so saved progress still counts.

interface UnitPlan {
  unit: string;
  nodes: string[];
}

const WIFE = "notes-women-of-the-book-mothers-of-the-believers-from-your-notes";

export const UNIT_PLANS: Partial<Record<TopicId, UnitPlan[]>> = {
  prophets: [
    {
      unit: "prophets-beginnings",
      nodes: ["prophets-adam", "prophets-early-messengers-adam-and-repentance", "prophets-nuh", "prophets-early-messengers-nuh-and-patience"]
    },
    {
      unit: "prophets-tested",
      nodes: [
        "prophets-ibrahim",
        "prophets-family-and-sacrifice-ibrahim-and-tawhid",
        "prophets-yusuf",
        "prophets-family-and-sacrifice-yusuf-and-purity",
        "prophets-isa"
      ]
    },
    {
      unit: "prophets-early-messengers",
      nodes: ["prophets-early-messengers-hud-and-salih", "prophets-early-messengers-lut-and-purity", "prophets-early-messengers-early-prophets-review"]
    },
    // Ibrahim's family: his sons Ismail and Ishaq, and his grandson Ya'qub.
    {
      unit: "prophets-family-and-sacrifice",
      nodes: [
        "prophets-family-and-sacrifice-ismail-and-submission",
        "notes-prophets-prophets-from-your-notes-2-ishaq",
        "prophets-family-and-sacrifice-yaqub-and-sabr",
        "prophets-family-and-sacrifice-family-review"
      ]
    },
    {
      unit: "prophets-power-and-deliverance",
      nodes: [
        "prophets-musa",
        "prophets-power-and-deliverance-musa-and-fear",
        "prophets-power-and-deliverance-harun-and-support",
        "prophets-power-and-deliverance-dawud-and-justice",
        "prophets-power-and-deliverance-sulayman-and-gratitude",
        "prophets-power-and-deliverance-power-review"
      ]
    }
  ],
  women_of_the_book: [
    {
      unit: "women-quran",
      nodes: [
        "women-hawwa",
        "women-quran-depth-hawwa-and-return",
        "women-mother-musa",
        "women-quran-depth-mother-of-musa-and-trust",
        "women-asiyah",
        "women-virtues-and-legacy-courage-under-pressure",
        "women-quran-depth-asiyah-and-steadfastness",
        "women-maryam",
        "women-virtues-and-legacy-worship-and-devotion",
        "women-quran-depth-maryam-and-purity",
        "women-quran-depth-quran-women-review"
      ]
    },
    {
      unit: "women-mothers",
      nodes: [
        "women-khadijah",
        "women-virtues-and-legacy-service-to-revelation",
        "women-mothers-depth-khadijah-and-support",
        "women-mothers-depth-sawdah-and-stability",
        "women-aishah",
        "women-mothers-depth-aishah-and-knowledge",
        "women-hafsah",
        "women-mothers-depth-mothers-review",
        `${WIFE}-3-zaynab-bint-khuzayma`,
        `${WIFE}-3-umm-salamah-wife-of-the-prophet`,
        `${WIFE}-3-zaynab-bint-jahsh`,
        `${WIFE}-1-juwayriya-bint-al-harith`,
        `${WIFE}-3-umm-habibah`,
        `${WIFE}-2-safiyyah-bint-huyayy`,
        `${WIFE}-2-maymunah-bint-al-harith`,
        "women-virtues-and-legacy-lessons-for-today",
        "women-virtues-and-legacy-women-legacy-review"
      ]
    }
  ]
};

/** Every node id a unit plan names, for the content tests. */
export const PLANNED_NODE_IDS: readonly string[] = Object.values(UNIT_PLANS).flatMap((plans) => (plans ?? []).flatMap((plan) => plan.nodes));

function arrangeSection(section: LearningSection, plans: UnitPlan[], lessonsById: Record<string, Lesson>): LearningSection {
  const byId = new Map(section.nodes.map((node) => [node.id, node]));
  const planned = new Set(plans.flatMap((plan) => plan.nodes).filter((id) => byId.has(id)));
  const members = new Map<string, LearningNode[]>(section.branches.map((branch) => [branch.id, []]));
  for (const plan of plans) {
    if (members.has(plan.unit)) members.set(plan.unit, plan.nodes.filter((id) => byId.has(id)).map((id) => byId.get(id)!));
  }
  for (const node of section.nodes) {
    if (!planned.has(node.id)) members.get(node.branchId)?.push(node);
  }

  const branches = section.branches.filter((branch) => members.get(branch.id)!.length).map((branch, index) => ({ ...branch, order: index + 1 }));
  const nodes = branches.flatMap((branch) => {
    const unit = members.get(branch.id)!;
    const before = section.nodes.filter((node) => node.branchId === branch.id).map((node) => node.id);
    if (before.join() === unit.map((node) => node.id).join()) return unit;
    // A unit that changed: its first lesson opens it and every other one follows the one before it.
    return unit.map((node, index) => {
      const previous = index > 0 ? unit[index - 1] : undefined;
      for (const lessonId of node.lessonIds) {
        if (lessonsById[lessonId]) lessonsById[lessonId] = { ...lessonsById[lessonId], branchId: branch.id, unlockRules: previous ? [`Complete ${previous.title}`] : [] };
      }
      return { ...node, branchId: branch.id, order: index + 1, requiredNodeIds: previous ? [previous.id] : [] };
    });
  });
  return { ...section, branches, nodes, starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0) };
}

/** Puts each topic's lessons in the units UNIT_PLANS gives. Runs once imported notes are merged in, before chainCourse. */
export function arrangeUnits(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }) {
  const lessonsById = { ...content.lessonsById };
  const sections = content.course.sections.map((section) => {
    const plans = UNIT_PLANS[section.topicId];
    return plans ? arrangeSection(section, plans, lessonsById) : section;
  });
  return { course: { ...content.course, sections }, lessonsById };
}
