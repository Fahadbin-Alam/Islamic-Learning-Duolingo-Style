import type { Challenge, LearningCourse, LearningNode, LearningSection, Lesson, TopicId } from "../types";
import { choiceQuestionsOf, fillInsFirst, recallQuestions, reviewQuestions, SET_ASIDE, withoutGiveaways, type TaughtLesson } from "./scalableCurriculum";

// Each person is taught in one unit. A prophet or a woman with a lesson of their own gets the lessons that
// teach more about them (src/data/scalableCurriculum.ts) right after it, in the same unit, and the Mothers of the
// Believers from the notes join the Mothers of the Believers unit, in the order the Prophet ﷺ married them.
// A unit listed here holds these lessons in this order, and then any other lesson it already had; a unit left
// with no lessons is not on the path. Lesson and node ids never change, so saved progress still counts.

interface UnitPlan {
  unit: string;
  /** A new unit of its own: its banner title and description. */
  title?: string;
  description?: string;
  nodes: string[];
}

/** Topics whose units follow the plan's order, new units included (the prophets, from Adam to Muhammad ﷺ). */
const PLAN_ORDERED: ReadonlySet<TopicId> = new Set<TopicId>(["prophets"]);

/**
 * Reviews that named people from other units, left off the path now that each prophet has a unit of his own (each
 * unit's own deep units end with a quiz).
 */
const DROPPED_NODE_IDS: ReadonlySet<string> = new Set([
  "prophets-early-messengers-early-prophets-review",
  "prophets-family-and-sacrifice-family-review",
  "prophets-power-and-deliverance-power-review"
]);

const WIFE = "notes-women-of-the-book-mothers-of-the-believers-from-your-notes";

export const UNIT_PLANS: Partial<Record<TopicId, UnitPlan[]>> = {
  // Lives of the Prophets in the order of Ibn Kathir's Stories of the Prophets: a unit for each prophet, from Adam to
  // Muhammad ﷺ (his Seerah units come after his unit). Each prophet's deeper lessons (prophetUnits.ts) join his unit.
  prophets: [
    {
      unit: "prophets-unit-adam",
      title: "Adam",
      description: "The first human: made from clay, taught the names, forgiven, and sent to the earth.",
      nodes: ["prophets-adam", "prophets-early-messengers-adam-and-repentance"]
    },
    {
      unit: "prophets-unit-idris",
      title: "Idris",
      description: "A truthful prophet whom Allah raised to a high place.",
      nodes: ["notes-prophets-prophets-from-your-notes-1-idris"]
    },
    {
      unit: "prophets-unit-nuh",
      title: "Nuh",
      description: "Nine hundred and fifty years of calling, the Ark, and the flood.",
      nodes: ["prophets-nuh", "prophets-early-messengers-nuh-and-patience"]
    },
    {
      unit: "prophets-unit-hud",
      title: "Hud",
      description: "Sent to the strong people of 'Ad, who were taken by a fierce wind.",
      nodes: []
    },
    {
      unit: "prophets-unit-salih",
      title: "Salih",
      description: "Sent to Thamud, who carved homes in the rocks and were given a she-camel as a sign.",
      nodes: ["prophets-early-messengers-hud-and-salih"]
    },
    {
      unit: "prophets-unit-ibrahim",
      title: "Ibrahim",
      description: "The close friend of Allah: the idols, the fire, and his tests.",
      nodes: ["prophets-ibrahim", "prophets-family-and-sacrifice-ibrahim-and-tawhid"]
    },
    {
      unit: "prophets-unit-lut",
      title: "Lut",
      description: "Ibrahim's nephew, who warned his town and was saved with the believers.",
      nodes: ["prophets-early-messengers-lut-and-purity"]
    },
    {
      unit: "prophets-unit-shuaib",
      title: "Shu'ayb",
      description: "Sent to Madyan, whose people cheated on the scales.",
      nodes: ["notes-prophets-prophets-from-your-notes-2-shuaib"]
    },
    {
      unit: "prophets-unit-ismail",
      title: "Ismail",
      description: "Ibrahim's son: Zamzam, the Ka'bah, and his patience.",
      nodes: ["prophets-family-and-sacrifice-ismail-and-submission"]
    },
    {
      unit: "prophets-unit-ishaq-yaqub",
      title: "Ishaq and Ya'qub",
      description: "Ibrahim's son Ishaq and his grandson Ya'qub, also called Isra'il.",
      nodes: ["notes-prophets-prophets-from-your-notes-2-ishaq", "prophets-family-and-sacrifice-yaqub-and-sabr"]
    },
    {
      unit: "prophets-unit-yusuf",
      title: "Yusuf",
      description: "The dream, the well, the prison, and forgiving his brothers.",
      nodes: ["prophets-yusuf", "prophets-family-and-sacrifice-yusuf-and-purity"]
    },
    {
      unit: "prophets-unit-ayyub",
      title: "Ayyub",
      description: "Years of illness and loss, beautiful patience, and Allah's cure.",
      nodes: ["notes-prophets-prophets-from-your-notes-1-ayyub"]
    },
    {
      unit: "prophets-unit-dhul-kifl",
      title: "Dhul-Kifl",
      description: "Named in the Quran among the patient and the best.",
      nodes: ["notes-prophets-prophets-from-your-notes-1-dhu-al-kifl"]
    },
    {
      unit: "prophets-unit-yunus",
      title: "Yunus",
      description: "He left his people, the big fish, and his dua in the dark.",
      nodes: ["notes-prophets-prophets-from-your-notes-3-yunus"]
    },
    {
      unit: "prophets-unit-musa",
      title: "Musa and Harun",
      description: "Pharaoh, the sea, the Tawrah, Bani Isra'il, and the journey with al-Khidr.",
      nodes: ["prophets-musa", "prophets-power-and-deliverance-musa-and-fear", "prophets-power-and-deliverance-harun-and-support"]
    },
    {
      unit: "prophets-unit-yusha",
      title: "Yusha' ibn Nun",
      description: "Musa's helper, who led Bani Isra'il after him.",
      nodes: ["notes-prophets-prophets-from-your-notes-3-yusha-ibn-nun"]
    },
    {
      unit: "prophets-unit-ilyas-alyasa",
      title: "Ilyas and Al-Yasa'",
      description: "Ilyas called his people away from the idol Ba'l, and Al-Yasa' came after him.",
      nodes: ["notes-prophets-prophets-from-your-notes-1-ilyas", "notes-prophets-prophets-from-your-notes-1-alyasa"]
    },
    {
      unit: "prophets-unit-dawud",
      title: "Dawud",
      description: "A king and prophet: the Zabur, iron, fasting, and fair judging.",
      nodes: ["prophets-power-and-deliverance-dawud-and-justice"]
    },
    {
      unit: "prophets-unit-sulayman",
      title: "Sulayman",
      description: "Dawud's son: the wind, the jinn, the ant, and the hoopoe.",
      nodes: ["prophets-power-and-deliverance-sulayman-and-gratitude"]
    },
    {
      unit: "prophets-unit-zakariyya",
      title: "Zakariyya",
      description: "He looked after Maryam and asked Allah for a child in old age.",
      nodes: ["notes-prophets-prophets-from-your-notes-3-zakaria"]
    },
    {
      unit: "prophets-unit-yahya",
      title: "Yahya",
      description: "Zakariyya's son: wise as a boy, kind to his parents.",
      nodes: ["notes-prophets-prophets-from-your-notes-3-yahya"]
    },
    {
      unit: "prophets-unit-isa",
      title: "Isa",
      description: "Born to Maryam without a father: his miracles, his message, and his return.",
      nodes: ["prophets-isa"]
    },
    {
      unit: "prophets-final-example",
      nodes: ["prophets-muhammad"]
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

// A question that names no one ("She was ...") reads right only inside its own lesson.
const UNNAMED_START = /^\W*(he|she|it|its|his|her|they|their)\b/i;

/**
 * A review looks back over the lessons before it in its own unit. A plan moves lessons between units, so each
 * review in a planned unit picks its questions again: from the lessons since the unit's last review first, then
 * from the lessons before that review, and never from another unit. Its own order question stays first. A lesson
 * that teaches a line and also asks from earlier lessons (further on in a unit) picks those again the same way,
 * multiple-choice ones only.
 */
function refreshReviews(unit: LearningNode[], lessonsById: Record<string, Lesson>) {
  const taught: TaughtLesson[] = [];
  let since = 0;
  let recent = new Set<string>();
  for (const node of unit) {
    const lessonId = node.lessonIds[0];
    const lesson = lessonsById[lessonId];
    if (!lesson) continue;
    const own = lesson.challenges.filter((challenge) => !challenge.isReview);
    const looksBack = lesson.challenges.length - own.length;
    const teachesLine = own.some((challenge) => !challenge.id.endsWith("_first"));
    if (looksBack) {
      const picked = teachesLine
        ? recallQuestions(lessonId, own, choiceQuestionsOf([...taught.slice(0, since), ...taught.slice(since)]), looksBack, recent)
        : reviewQuestions(lessonId, taught.slice(since), looksBack, recent, own);
      if (!teachesLine && picked.length < looksBack) picked.push(...reviewQuestions(lessonId, taught.slice(0, since), looksBack - picked.length, recent, [...own, ...picked]));
      const challenges: Challenge[] = !teachesLine
        ? [...own, ...fillInsFirst(lessonId, picked)]
        : picked.length
          ? withoutGiveaways([...own, ...picked])
          : withoutGiveaways([...own, ...(SET_ASIDE.get(lessonId) ?? [])]);
      lessonsById[lessonId] = { ...lesson, challenges };
      recent = new Set(challenges.map((challenge) => challenge.prompt));
      if (!teachesLine) {
        since = taught.length;
        continue;
      }
    } else {
      recent = new Set(lesson.challenges.map((challenge) => challenge.prompt));
    }
    const questions = own.filter((challenge) => !UNNAMED_START.test(challenge.prompt));
    if (questions.length) taught.push({ lessonId, nodeId: node.id, questions });
  }
}

/** Every node id a unit plan names, for the content tests. */
export const PLANNED_NODE_IDS: readonly string[] = Object.values(UNIT_PLANS).flatMap((plans) => (plans ?? []).flatMap((plan) => plan.nodes));

function arrangeSection(section: LearningSection, plans: UnitPlan[], lessonsById: Record<string, Lesson>): LearningSection {
  const byId = new Map(section.nodes.filter((node) => !DROPPED_NODE_IDS.has(node.id)).map((node) => [node.id, node]));
  const planned = new Set(plans.flatMap((plan) => plan.nodes).filter((id) => byId.has(id)));
  // A new unit from the plan is kept even with no lessons yet: deep units (deepUnits.ts) may fill it, and
  // dropEmptyUnits takes it off the path if none do.
  const added = plans
    .filter((plan) => plan.title && !section.branches.some((branch) => branch.id === plan.unit))
    .map((plan) => ({ id: plan.unit, topicId: section.topicId, title: plan.title!, description: plan.description ?? "", order: 0 }));
  const rank = (id: string) => {
    const at = plans.findIndex((plan) => plan.unit === id);
    return at === -1 ? plans.length : at;
  };
  const all = PLAN_ORDERED.has(section.topicId)
    ? [...section.branches, ...added].map((branch, index) => ({ branch, index })).sort((left, right) => rank(left.branch.id) - rank(right.branch.id) || left.index - right.index).map(({ branch }) => branch)
    : [...section.branches, ...added];
  const members = new Map<string, LearningNode[]>(all.map((branch) => [branch.id, []]));
  for (const plan of plans) {
    if (members.has(plan.unit)) members.set(plan.unit, plan.nodes.filter((id) => byId.has(id)).map((id) => byId.get(id)!));
  }
  for (const node of section.nodes) {
    if (!planned.has(node.id) && byId.has(node.id)) members.get(node.branchId)?.push(node);
  }

  const newIds = new Set(added.map((branch) => branch.id));
  const branches = all.filter((branch) => members.get(branch.id)!.length || newIds.has(branch.id)).map((branch, index) => ({ ...branch, order: index + 1 }));
  const nodes = branches.flatMap((branch) => {
    const unit = members.get(branch.id)!;
    const before = section.nodes.filter((node) => node.branchId === branch.id).map((node) => node.id);
    if (before.join() === unit.map((node) => node.id).join()) return unit;
    refreshReviews(unit, lessonsById);
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

/** Takes units with no lessons off the path (a planned unit no deep unit filled). Runs after the deep units are added. */
export function dropEmptyUnits(content: { course: LearningCourse; lessonsById: Record<string, Lesson> }) {
  const sections = content.course.sections.map((section) => {
    const used = new Set(section.nodes.map((node) => node.branchId));
    if (section.branches.every((branch) => used.has(branch.id))) return section;
    return { ...section, branches: section.branches.filter((branch) => used.has(branch.id)).map((branch, index) => ({ ...branch, order: index + 1 })) };
  });
  return { ...content, course: { ...content.course, sections } };
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
