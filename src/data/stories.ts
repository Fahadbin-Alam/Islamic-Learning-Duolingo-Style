import type { Challenge, Lesson, LessonSource, TopicId } from "../types";
import { COURSE, LESSONS_BY_ID } from "./course";
import { DEEP_UNITS } from "./deepUnits";
import type { DeepUnit } from "./deepKit";
import { pictureForLesson, pictureForText, type LessonPicture } from "./lessonPictures";
import { SAHABA_UNITS } from "./sahabaUnits";
import { SEERAH_UNITS } from "./seerahUnits";

// Story mode: the Seerah and the lives of the Companions told as stories, chapter by chapter. A story is made
// of the deep lessons already in the course (src/data/seerahUnits.ts, deepUnits.ts, sahabaUnits.ts), in their
// order, so every scene keeps its own checked source (Quran or a hadith with its sunnah.com number and grade)
// and nothing new is said that a lesson does not already teach. The teacher (the camel in its travel cloth)
// tells each scene; a question comes after every second scene and at the end. Pictures are places and things
// only (lessonPictures.ts), never a prophet or a Companion.

export type StoryGroup = "seerah" | "sahaba";

export type StoryScene = {
  /** The deep lesson this scene tells (English; screens localize it). */
  lesson: Lesson;
  source: LessonSource;
  /** A place or thing the scene names, the first time the story names it. */
  picture?: LessonPicture;
  /** Asked right after the scene. */
  question?: Challenge;
};

export type Story = {
  /** "story-<unit key>-<part>", kept stable so progress stays. */
  id: string;
  group: StoryGroup;
  topicId: TopicId;
  /** The unit (branch) the lessons are from. */
  unitId: string;
  /** The unit's title, e.g. "Seerah: the first revelation" or "Abu Bakr as-Siddiq". */
  title: string;
  description: string;
  /** 1-based part of the unit's story, and how many parts it has (long lives are told in parts). */
  part: number;
  parts: number;
  scenes: StoryScene[];
  /** The first picture in the story, for its row in the list. */
  cover?: LessonPicture;
};

/** The Companions told as stories, in the order the Sahabah topic teaches them. */
const SAHABA_KEYS = ["abubakr", "umar", "uthman", "ali", ...SAHABA_UNITS.map((unit) => unit.key), "muhajirun"];

/** A part is at most this many scenes, so a story takes a few minutes. */
export const MAX_SCENES = 7;

function lessonsOf(unit: DeepUnit): Lesson[] {
  return unit.lessons.flatMap((item) => {
    const lesson = LESSONS_BY_ID[`lesson-deep-${unit.key}-${item.slug}`];
    return lesson ? [lesson] : [];
  });
}

/** Splits n scenes into parts as even as can be, none longer than MAX_SCENES. */
export function partSizes(count: number): number[] {
  if (count <= 0) return [];
  const parts = Math.ceil(count / MAX_SCENES);
  const base = Math.floor(count / parts);
  const extra = count % parts;
  return Array.from({ length: parts }, (_, index) => base + (index < extra ? 1 : 0));
}

const longWords = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9' ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3);

/** Whether a scene says a question's answer: a true/false always can; a choice needs a word of its answer in the scene. */
export function sceneAnswers(lesson: Lesson, source: LessonSource | undefined, question: Challenge) {
  if (question.type === "true_false") return true;
  const told = [lesson.title, lesson.learnLine, lesson.intro, ...(lesson.learnFacts ?? []), source?.summary].join(" ").toLowerCase();
  const answer = question.choices.find((choice) => choice.id === question.correctChoiceId)?.label ?? "";
  return longWords(answer).some((word) => told.includes(word.replace(/s$/, "")));
}

/**
 * The question after a scene: one of the scene's own lesson questions whose answer the scene just said, turning
 * through them from scene to scene so true/false and multiple choice both come up.
 */
function questionFor(lesson: Lesson, source: LessonSource | undefined, sceneNumber: number): Challenge | undefined {
  const own = lesson.challenges.filter((challenge) => challenge.type === "multiple_choice" || challenge.type === "true_false");
  if (!own.length) return undefined;
  const turned = own.map((_, index) => own[(sceneNumber + index) % own.length]);
  const picked = turned.find((challenge) => sceneAnswers(lesson, source, challenge));
  return picked ? { ...picked, id: `story-${picked.id}`, sourceLessonId: lesson.id, sourceNodeId: lesson.nodeId } : undefined;
}

function buildStories(group: StoryGroup, units: DeepUnit[]): Story[] {
  return units.flatMap((unit) => {
    const lessons = lessonsOf(unit);
    const section = COURSE.sections.find((item) => item.topicId === unit.topicId);
    const branch = section?.branches.find((item) => item.id === unit.branchId);
    if (!lessons.length || !branch) return [];
    const sizes = partSizes(lessons.length);
    let start = 0;
    return sizes.map((size, index) => {
      const chunk = lessons.slice(start, start + size);
      start += size;
      const shown = new Set<string>();
      const scenes = chunk.map((lesson, sceneIndex): StoryScene => {
        const source = lesson.learnSource ?? lesson.sources[0];
        const found = pictureForLesson(lesson) ?? pictureForText(lesson.learnFacts?.join("\n"));
        const picture = found && !shown.has(found.id) ? found : undefined;
        if (picture) shown.add(picture.id);
        const asks = sceneIndex % 2 === 1 || sceneIndex === chunk.length - 1;
        const question = asks ? questionFor(lesson, source, sceneIndex) : undefined;
        return { lesson, source, ...(picture ? { picture } : {}), ...(question ? { question } : {}) };
      });
      return {
        id: `story-${unit.key}-${index + 1}`,
        group,
        topicId: unit.topicId,
        unitId: unit.branchId,
        title: branch.title,
        description: branch.description,
        part: index + 1,
        parts: sizes.length,
        scenes,
        ...(scenes.find((scene) => scene.picture) ? { cover: scenes.find((scene) => scene.picture)!.picture } : {})
      };
    });
  });
}

const byKey = new Map(DEEP_UNITS.map((unit) => [unit.key, unit]));

export const STORIES: readonly Story[] = [
  ...buildStories("seerah", [...SEERAH_UNITS]),
  ...buildStories(
    "sahaba",
    SAHABA_KEYS.flatMap((key) => {
      const unit = byKey.get(key);
      return unit ? [unit] : [];
    })
  )
];

export function getStory(id: string): Story | undefined {
  return STORIES.find((story) => story.id === id);
}

/** The topics whose path offers story mode. */
export const STORY_TOPICS: readonly TopicId[] = ["prophets", "sahabah"];

export function storyGroupFor(topicId: TopicId | string | undefined): StoryGroup | undefined {
  return topicId === "prophets" ? "seerah" : topicId === "sahabah" ? "sahaba" : undefined;
}
