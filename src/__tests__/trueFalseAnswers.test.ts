/**
 * A True/False question whose explanation starts "No." is a statement the source says is wrong, so its answer
 * must be False (two Surat At-Tur cards once said the mountains stay in place on the Last Day).
 */
import { LESSONS_BY_ID } from "../data/course";

test("a True/False card explained with \"No.\" has False as its answer", () => {
  const wrong = Object.values(LESSONS_BY_ID).flatMap((lesson) =>
    lesson.challenges
      .filter((challenge) => challenge.type === "true_false" && challenge.correctChoiceId === "true" && /^No\.\s/.test(challenge.explanation ?? ""))
      .map((challenge) => `${lesson.id}: ${challenge.prompt}`)
  );
  expect(wrong).toEqual([]);
});
