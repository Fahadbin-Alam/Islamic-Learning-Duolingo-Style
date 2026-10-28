import { LESSONS_BY_ID } from "../data/course";
import { findAnswerSource } from "../data/answerSource";

const lessons = Object.values(LESSONS_BY_ID);

describe("answer sources", () => {
  test("every deep sub-topic question shows the source it was written from", () => {
    const deep = lessons.filter((lesson) => lesson.challenges.length > 0 && lesson.challenges.every((challenge) => challenge.id.startsWith("deep-")));
    expect(deep.length).toBeGreaterThan(200);
    const missing = deep.flatMap((lesson) =>
      lesson.challenges.filter((challenge) => {
        const source = findAnswerSource(challenge, lesson, LESSONS_BY_ID);
        return !source || source.url !== challenge.resourceUrl || !source.label.trim();
      }).map((challenge) => challenge.id)
    );
    expect(missing.slice(0, 10)).toEqual([]);
  });

  test("a question asked again in a review keeps the source of the lesson it came from", () => {
    const review = lessons.find((lesson) => lesson.challenges.some((challenge) => challenge.isReview && challenge.sourceLessonId && challenge.resourceUrl));
    const challenge = review!.challenges.find((item) => item.isReview && item.sourceLessonId && item.resourceUrl)!;
    const from = LESSONS_BY_ID[challenge.sourceLessonId!]!;
    const source = findAnswerSource(challenge, review!, LESSONS_BY_ID);
    expect(source?.url).toBe(challenge.resourceUrl);
    expect([from.learnSource, ...from.sources].some((item) => item?.reference === source?.label)).toBe(true);
  });
});
