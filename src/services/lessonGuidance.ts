import type {
  ChallengeChoice,
  LearningNode,
  Lesson,
  LessonPracticeActivity,
  LessonTeachingMoment
} from "../types";
import { getPrimaryLessonSource } from "./resourceSupport";

// Wudu in its taught order (Quran 5:6 and the Prophet's wudu shown by Uthman, Sahih al-Bukhari 164).
const WUDU_STEPS: Array<[string, string]> = [
  ["hands", "Wash the hands"],
  ["mouth", "Rinse the mouth"],
  ["nose", "Rinse the nose"],
  ["face", "Wash the face"],
  ["arms", "Wash the arms"],
  ["head", "Wipe the head"],
  ["ears", "Wipe the ears"],
  ["feet", "Wash the feet"]
];

// One rak'ah through to the end of the prayer. Both sujud are pillars, so both are steps.
const SALAH_STEPS: Array<[string, string]> = [
  ["takbir", "Opening takbir"],
  ["qiyam", "Standing and recitation"],
  ["ruku", "Ruku"],
  ["rise", "Rise from ruku"],
  ["sujud", "First sujud"],
  ["sit", "Sit between sajdahs"],
  ["sujud2", "Second sujud"],
  ["tashahhud", "Tashahhud"],
  ["taslim", "Taslim"]
];

// The bowing and prostrating part of one rak'ah, all taught in the Ruku and sujud unit.
const RAKAH_STEPS: Array<[string, string]> = [
  ["ruku", "Ruku"],
  ["rise", "Rise from ruku"],
  ["sujud", "First sujud"],
  ["sit", "Sit between sajdahs"],
  ["sujud2", "Second sujud"]
];

// Only lessons about the order itself get the ordering game; the rest go straight to their questions.
// A game only uses steps its unit or an earlier one has taught: wudu after the eight single-step
// lessons, the rak'ah after ruku and sujud, the whole salah once tashahhud and taslim are taught too.
const ORDER_GAMES: Record<string, "wudu" | "rakah" | "salah"> = {
  "prayer-wudu-full-order": "wudu",
  "prayer-wudu-demonstration-and-practice": "wudu",
  "prayer-wudu-reinforcement-review": "wudu",
  "prayer-wudu-wudu-mastery-check": "wudu",
  "prayer-ruku-and-sujud-ruku-sujud-review": "rakah",
  "prayer-tashahhud-tashahhud-review": "salah",
  "prayer-review-and-mastery-mixed-review-1": "wudu",
  "prayer-review-and-mastery-mixed-review-2": "salah"
};

export function buildGuidedLesson(lesson: Lesson, node?: LearningNode): Lesson {
  const primarySource = getPrimaryLessonSource(lesson.sources);
  const whatYouWillLearn = lesson.whatYouWillLearn ?? firstSentence(lesson.intro) ?? lesson.title;
  const whyItMatters = lesson.whyItMatters ?? deriveWhyItMatters(lesson, node, whatYouWillLearn);
  const keyTakeaway = lesson.keyTakeaway ?? deriveKeyTakeaway(lesson, whatYouWillLearn);
  const storyMoment = lesson.storyMoment ?? deriveStoryMoment(lesson, node);
  const teachingMoments = lesson.teachingMoments ?? buildTeachingMoments(lesson, node, whatYouWillLearn, whyItMatters, keyTakeaway, storyMoment, primarySource);
  const practiceActivities = lesson.practiceActivities ?? buildPracticeActivities(lesson, node, keyTakeaway);

  return {
    ...lesson,
    whatYouWillLearn,
    whyItMatters,
    keyTakeaway,
    storyMoment,
    teachingMoments,
    practiceActivities
  };
}

function buildTeachingMoments(
  lesson: Lesson,
  node: LearningNode | undefined,
  whatYouWillLearn: string,
  whyItMatters: string,
  keyTakeaway: string,
  storyMoment: string | undefined,
  primarySource?: Lesson["sources"][number]
): LessonTeachingMoment[] {
  const moments: LessonTeachingMoment[] = [
    {
      id: `${lesson.id}_learn`,
      kind: "learn",
      eyebrow: "What you are learning",
      title: lesson.title,
      body: whatYouWillLearn
    },
    {
      id: `${lesson.id}_why`,
      kind: "takeaway",
      eyebrow: "Why it matters",
      title: "Carry it into real life",
      body: whyItMatters
    },
    {
      id: `${lesson.id}_reveal`,
      kind: "reveal",
      eyebrow: "Tap to reveal",
      title: "Key takeaway",
      body: "Pause here first so the lesson lands before the question does.",
      revealLabel: "Reveal the takeaway",
      revealBody: keyTakeaway
    }
  ];

  if (storyMoment) {
    moments.splice(1, 0, {
      id: `${lesson.id}_story`,
      kind: "story",
      eyebrow: "Story moment",
      title: "See the scene first",
      body: storyMoment
    });
  }

  if (primarySource) {
    moments.push({
      id: `${lesson.id}_source`,
      kind: primarySource.site === "YouTube" ? "watch" : "read",
      eyebrow: primarySource.site === "YouTube" ? "Watch this first" : "Read this first",
      title: primarySource.title,
      body: primarySource.whyAttached ?? primarySource.summary,
      actionLabel: primarySource.site === "YouTube" ? "Open video guide" : "Open exact source",
      actionUrl: primarySource.url,
      sourceId: primarySource.id
    });
  }

  if (node && ORDER_GAMES[node.id]) {
    moments.push({
      id: `${lesson.id}_training`,
      kind: "takeaway",
      eyebrow: "Guided training",
      title: "Practice before you are judged",
      body: "For prayer and wudu, move through the order first. The question comes after the steps feel familiar."
    });
  }

  return moments;
}

function buildPracticeActivities(
  lesson: Lesson,
  node: LearningNode | undefined,
  keyTakeaway: string
): LessonPracticeActivity[] {
  if (!node) {
    return [buildGuidedChoiceActivity(
      lesson,
      "practice",
      "Practice first",
      keyTakeaway,
      [
        keyTakeaway,
        "Rush past the concept and hope the test explains it later.",
        "Treat the lesson like trivia instead of practice."
      ]
    )];
  }

  const orderGame = ORDER_GAMES[node.id];

  if (orderGame === "wudu") {
    return [
      buildSequenceActivity(lesson, node, "wudu_order", "Try arranging the wudu flow", "Tap the steps in the order they are performed.", WUDU_STEPS,
        "Wudu goes hands, mouth, nose, face, arms, head, ears, then feet.")
    ];
  }

  if (orderGame === "rakah") {
    return [
      buildSequenceActivity(lesson, node, "rakah_order", "Build the rak'ah", "Tap the steps in the order they come.", RAKAH_STEPS,
        "Ruku, stand up, sujud, sit, then the second sujud.")
    ];
  }

  if (orderGame === "salah") {
    return [
      buildSequenceActivity(lesson, node, "salah_order", "Build the salah flow", "Tap the prayer parts in the order they come.", SALAH_STEPS,
        "Each rak'ah has ruku and two sujud; the prayer ends with tashahhud and taslim.")
    ];
  }

  if (node.topicId === "quran_tafseer") {
    return [
      buildGuidedChoiceActivity(lesson, "theme_match", "Match the ayah to its lesson", lesson.keyTakeaway ?? keyTakeaway, [
        lesson.keyTakeaway ?? keyTakeaway,
        "The ayah only matters for recitation, not reflection.",
        "The main job is memorization without theme."
      ])
    ];
  }

  if (node.topicId === "sahabah" || node.topicId === "prophets" || node.topicId === "women_of_the_book") {
    return [
      buildSequenceActivity(lesson, node, "story_arc", "Build the story arc", "Tap the story beats in the order a learner should notice them.", [
        ["scene", "See the setting"],
        ["trial", "Notice the trial or sacrifice"],
        ["lesson", "Carry the lesson into your own life"]
      ], "Biography lessons should move from scene, to sacrifice, to imitation.")
    ];
  }

  return [
    buildGuidedChoiceActivity(lesson, "best_response", "Practice first", keyTakeaway, [
      keyTakeaway,
      "Wait for the quiz to explain what the lesson means.",
      "Keep the idea vague so it stays easy."
    ])
  ];
}

// Each ordering game of a kind starts its steps at its own place (never the taught order), and the game
// shuffles them seeded by that order, so no two games show the same scramble.
function orderGameStart(node: LearningNode, itemCount: number) {
  const sameKind = Object.keys(ORDER_GAMES).filter((id) => ORDER_GAMES[id] === ORDER_GAMES[node.id]);
  return (sameKind.indexOf(node.id) % (itemCount - 1)) + 1;
}

function buildSequenceActivity(
  lesson: Lesson,
  node: LearningNode | undefined,
  suffix: string,
  title: string,
  instructions: string,
  items: Array<[string, string]>,
  explanation: string
): LessonPracticeActivity {
  const start = node && ORDER_GAMES[node.id] ? orderGameStart(node, items.length) : Math.abs(hashCode(lesson.id)) % items.length;
  return {
    id: `${lesson.id}_${suffix}`,
    kind: "sequence",
    title,
    prompt: lesson.title,
    instructions,
    options: rotate(items, start).map(([id, label]) => ({ id, label })),
    correctOrderIds: items.map(([id]) => id),
    explanation,
    successLabel: "Nice. Now the order is in your head before the question.",
    retryLabel: "Reset order"
  };
}

function buildGuidedChoiceActivity(
  lesson: Lesson,
  suffix: string,
  title: string,
  prompt: string,
  choices: string[]
): LessonPracticeActivity {
  return {
    id: `${lesson.id}_${suffix}`,
    kind: "guided_choice",
    title,
    prompt,
    instructions: "Pick the response that best carries the teaching point.",
    options: choices.map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
    correctChoiceId: "a",
    explanation: "Good practice should make the formal question feel clearer, not harsher.",
    successLabel: "Good. You practiced the lesson before being tested."
  };
}

function deriveStoryMoment(lesson: Lesson, node?: LearningNode) {
  if (!node) {
    return undefined;
  }

  if (lesson.lessonType === "story" || node.topicId === "sahabah" || node.topicId === "prophets" || node.topicId === "women_of_the_book") {
    const introSentence = firstSentence(lesson.intro) ?? lesson.intro;
    const explanationSentence = firstSentence(lesson.explanationContent ?? "");

    if (!explanationSentence || normalizeSentence(introSentence) === normalizeSentence(explanationSentence)) {
      return biographyScene(node, introSentence);
    }

    return `${introSentence} ${explanationSentence}`.trim();
  }

  if (node.topicId === "prayer" && node.branchId.includes("wudu")) {
    return "Think of this as training the body and heart together: learn the order calmly, then practice it, then answer.";
  }

  return undefined;
}

function firstSentence(value?: string) {
  if (!value) {
    return undefined;
  }

  return value.match(/^[^.?!]+[.?!]?/)?.[0]?.trim();
}

function deriveWhyItMatters(lesson: Lesson, node: LearningNode | undefined, whatYouWillLearn: string) {
  const explanation = firstSentence(lesson.explanationContent ?? "");

  if (explanation && normalizeSentence(explanation) !== normalizeSentence(whatYouWillLearn)) {
    return explanation;
  }

  if (!node) {
    return `This matters because ${whatYouWillLearn.charAt(0).toLowerCase()}${whatYouWillLearn.slice(1)}`;
  }

  switch (node.topicId) {
    case "foundation":
      return "Small Muslim habits shape the heart early, so it helps to practice them before they are tested.";
    case "prayer":
      return node.branchId.includes("wudu")
        ? "Wudu matters because prayer begins with purification, order, and calm obedience."
        : "Prayer becomes easier when the body learns the sequence and the heart understands why each step matters.";
    case "quran_tafseer":
      return "Quran learning should move from recitation into meaning, worship, and daily guidance.";
    case "sahabah":
    case "prophets":
    case "women_of_the_book":
      return "These lives matter because revelation changed real people, and their examples still teach courage, worship, and character.";
    case "manners":
      return "Character lessons are meant for ordinary moments, not only for ideal situations.";
    default:
      return `This matters because ${whatYouWillLearn.charAt(0).toLowerCase()}${whatYouWillLearn.slice(1)}`;
  }
}

// The lesson's own line, never a sentence shared by a whole topic: the learn card falls back to this one.
function deriveKeyTakeaway(lesson: Lesson, whatYouWillLearn: string) {
  const miniLesson = lesson.challenges[0]?.miniLesson;

  if (lesson.learnLine) {
    return lesson.learnLine;
  }

  if (miniLesson && normalizeSentence(miniLesson) !== normalizeSentence(whatYouWillLearn)) {
    return miniLesson;
  }

  return whatYouWillLearn;
}

function biographyScene(node: LearningNode, introSentence: string) {
  if (node.topicId === "sahabah") {
    return `${introSentence} This branch is easier to feel when you picture a real life being reshaped by revelation.`;
  }

  if (node.topicId === "prophets" || node.topicId === "women_of_the_book") {
    return `${introSentence} Stay with the scene first, then let the lesson unfold from it.`;
  }

  return introSentence;
}

function normalizeSentence(value?: string) {
  return (value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function rotate<T>(items: T[], start: number) {
  return items.map((_, index) => items[(start + index) % items.length]);
}

function hashCode(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }

  return hash;
}
