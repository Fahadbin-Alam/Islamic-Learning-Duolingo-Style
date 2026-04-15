import type {
  ChallengeChoice,
  LearningNode,
  Lesson,
  LessonPracticeActivity,
  LessonTeachingMoment
} from "../types";
import { getPrimaryLessonSource } from "./resourceSupport";

export function buildGuidedLesson(lesson: Lesson, node?: LearningNode): Lesson {
  const primarySource = getPrimaryLessonSource(lesson.sources);
  const whatYouWillLearn = lesson.whatYouWillLearn ?? firstSentence(lesson.intro) ?? lesson.title;
  const whyItMatters = lesson.whyItMatters ?? firstSentence(lesson.explanationContent ?? lesson.intro) ?? lesson.intro;
  const keyTakeaway = lesson.keyTakeaway ?? lesson.challenges[0]?.miniLesson ?? whatYouWillLearn;
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

  if (node?.topicId === "prayer") {
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

  if (node.topicId === "prayer" && node.branchId.includes("wudu")) {
    return [
      buildSequenceActivity(lesson, "wudu_order", "Try arranging the wudu flow", "Tap the steps in the order they are performed.", [
        ["hands", "Wash the hands"],
        ["mouth", "Rinse the mouth"],
        ["nose", "Rinse the nose"],
        ["face", "Wash the face"],
        ["arms", "Wash the arms"],
        ["head", "Wipe the head"],
        ["feet", "Wash the feet"]
      ], "Wudu becomes easier when the order lives in the body before the question begins.")
    ];
  }

  if (node.topicId === "prayer") {
    return [
      buildSequenceActivity(lesson, "salah_order", "Build the salah flow", "Tap the prayer parts in the order they come.", [
        ["takbir", "Opening takbir"],
        ["qiyam", "Standing and recitation"],
        ["ruku", "Ruku"],
        ["rise", "Rise from ruku"],
        ["sujud", "Sujud"],
        ["sit", "Sit between sajdahs"],
        ["tashahhud", "Tashahhud"],
        ["taslim", "Taslim"]
      ], "Prayer learning should feel like guided training. The order matters before the recall question arrives.")
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
      buildSequenceActivity(lesson, "story_arc", "Build the story arc", "Tap the story beats in the order a learner should notice them.", [
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

function buildSequenceActivity(
  lesson: Lesson,
  suffix: string,
  title: string,
  instructions: string,
  items: Array<[string, string]>,
  explanation: string
): LessonPracticeActivity {
  return {
    id: `${lesson.id}_${suffix}`,
    kind: "sequence",
    title,
    prompt: lesson.title,
    instructions,
    options: items.map(([id, label]) => ({ id, label })),
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
    return `${firstSentence(lesson.intro) ?? lesson.intro} ${firstSentence(lesson.explanationContent ?? "") ?? ""}`.trim();
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
