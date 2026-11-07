import { LESSONS_BY_ID } from "../data/course";

// A lesson quote with no text (an ayah missing from src/data/quranAyahs.ts) once stopped the whole web app
// from starting, so every quote a lesson shows must carry its words.
describe("lesson quotes", () => {
  it("every lesson quote has its text", () => {
    const missing = Object.values(LESSONS_BY_ID)
      .filter((lesson) => lesson.quote && !(typeof lesson.quote.text === "string" && lesson.quote.text.trim()))
      .map((lesson) => `${lesson.id} (${lesson.quote?.reference ?? "no reference"})`);
    expect(missing).toEqual([]);
  });
});
