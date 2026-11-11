/**
 * In Bangla, Urdu and Arabic, the lesson card's own words are never left in English: the plain telling at the top
 * of "What you learn" (the lesson's intro) and the Good to know page's sentence and flash card.
 */
import { LESSONS_BY_ID } from "../data/course";
import { localizeLessonContent } from "../services/contentLocalization";
import { buildLessonFlow, isRecallLesson, lessonExplain, teachLesson } from "../ui/lesson/lessonPages";
import { localizedTeach } from "../ui/lesson/localizedLines";

// Three English words in a row: a sentence left untranslated (names like "Abu Bakr" are two at most).
const ENGLISH = /\b[a-z]{2,}\s+[a-z]{2,}\s+[a-z]{2,}\b/i;
const lessons = Object.values(LESSONS_BY_ID);

describe.each(["bn", "ur", "ar"] as const)("lesson cards in %s", (language) => {
  test("the plain telling on What you learn is translated", () => {
    const english = lessons.filter((lesson) => !isRecallLesson(lesson) && lessonExplain(lesson)).filter((lesson) => ENGLISH.test(localizeLessonContent(lesson, language).intro));
    expect(english.map((lesson) => lesson.id)).toEqual([]);
  });

  test("the Good to know page shows no English and keeps its sentence", () => {
    let pages = 0;
    let sentences = 0;
    const english: string[] = [];
    const dropped: string[] = [];
    for (const lesson of lessons) {
      for (const step of buildLessonFlow(lesson)) {
        if (step.kind !== "learn" || step.page !== "teach" || step.index === undefined) continue;
        const shown = localizedTeach(lesson.challenges[step.index], language);
        pages += 1;
        if (shown.lines.length) sentences += 1;
        else if (teachLesson(lesson.challenges[step.index]).lines.length) dropped.push(`${lesson.id}#${step.index}`);
        expect(shown.lines.length || shown.card).toBeTruthy();
        const words = [...shown.lines, shown.card?.question ?? "", shown.card?.answer ?? ""];
        if (words.some((text) => ENGLISH.test(text))) english.push(`${lesson.id}: ${words.join(" | ")}`);
      }
    }
    expect(english.slice(0, 5)).toEqual([]);
    // Every page keeps the sentence the English page shows: a new Good to know sentence needs its translation.
    expect(dropped.slice(0, 5)).toEqual([]);
    expect(sentences).toBeGreaterThan(1000);
    expect(pages).toBeGreaterThan(1000);
  });
});
