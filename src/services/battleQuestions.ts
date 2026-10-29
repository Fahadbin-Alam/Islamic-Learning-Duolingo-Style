import { LESSONS_BY_ID, findNodeByLessonId } from "../data/course";
import { answerShowsInText, isContextBound } from "../api/islamicLearningApi";
import { getTopicCopy } from "../i18n";
import type { Challenge, SupportedLanguage, TopicId } from "../types";
import { localizeLessonContent } from "./contentLocalization";
import { BATTLE_QUESTIONS } from "./ummah";

/** `topic` names the question's topic, never its lesson: a lesson title can give the answer away. */
export type BattleQuestion = Challenge & { lessonId: string; topic: string };

let pool: Array<{ lessonId: string; challengeId: string; topicId: TopicId }> | undefined;
let poolMin = 0;

/**
 * Questions fit for a battle: from hard circles (difficulty 4 and up; 3 and up for the youngest), asked on their own
 * (not a review copy, not bound to their lesson's card, not giving the answer away), with a single right choice.
 */
function battlePool(minDifficulty: number) {
  if (pool && poolMin === minDifficulty) return pool;
  const picks: Array<{ lessonId: string; challengeId: string; topicId: TopicId }> = [];
  for (const lesson of Object.values(LESSONS_BY_ID)) {
    const node = findNodeByLessonId(lesson.id);
    if (!node || (node.difficulty ?? 1) < minDifficulty || node.topicId === "ramadan") continue;
    for (const challenge of lesson.challenges) {
      if (challenge.isReview || challenge.choices.length < 2 || isContextBound(challenge.prompt) || answerShowsInText(challenge)) continue;
      if (!challenge.choices.some((choice) => choice.id === challenge.correctChoiceId)) continue;
      picks.push({ lessonId: lesson.id, challengeId: challenge.id, topicId: node.topicId });
    }
  }
  pool = picks;
  poolMin = minDifficulty;
  return picks;
}

function shuffle<T>(items: T[], random: () => number) {
  const list = items.slice();
  for (let index = list.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [list[index], list[swap]] = [list[swap], list[index]];
  }
  return list;
}

/** BATTLE_QUESTIONS hard questions from different lessons, choices shuffled, in the learner's language. */
export function pickBattleQuestions(options: { language?: SupportedLanguage; young?: boolean; random?: () => number } = {}): BattleQuestion[] {
  const random = options.random ?? Math.random;
  const picked: BattleQuestion[] = [];
  const lessons = new Set<string>();
  for (const pick of shuffle(battlePool(options.young ? 3 : 4), random)) {
    if (picked.length >= BATTLE_QUESTIONS) break;
    if (lessons.has(pick.lessonId)) continue;
    const lesson = localizeLessonContent(LESSONS_BY_ID[pick.lessonId], options.language ?? "en");
    const challenge = lesson.challenges.find((item) => item.id === pick.challengeId);
    if (!challenge) continue;
    lessons.add(pick.lessonId);
    picked.push({
      ...challenge,
      id: `battle_${picked.length}_${challenge.id}`,
      choices: challenge.type === "true_false" ? challenge.choices : shuffle(challenge.choices, random),
      lessonId: lesson.id,
      topic: getTopicCopy(pick.topicId, options.language ?? "en").title
    });
  }
  return picked;
}
