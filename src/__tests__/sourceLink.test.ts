import { LESSONS_BY_ID } from "../data/course";
import { SECRET_LESSONS } from "../data/secretLessons";
import { highlightUrl, sourceUrl } from "../services/sourceLink";
import type { LessonSource } from "../types";

describe("highlightUrl", () => {
  it("leaves a link with no highlight as it is", () => {
    expect(highlightUrl("https://islamqa.info/en/answers/119256")).toBe("https://islamqa.info/en/answers/119256");
    expect(highlightUrl("https://islamqa.info/en/answers/119256", "  ")).toBe("https://islamqa.info/en/answers/119256");
  });

  it("names a short passage in full, with the fragment syntax's own characters escaped", () => {
    expect(highlightUrl("https://example.com/a", "Born: August 16, 1914, Shkodër")).toBe(
      "https://example.com/a#:~:text=Born%3A%20August%2016%2C%201914%2C%20Shkod%C3%ABr"
    );
    expect(highlightUrl("https://example.com/a", "al-fiqh & (more)")).toBe("https://example.com/a#:~:text=al%2Dfiqh%20%26%20%28more%29");
  });

  it("names a long passage by its first and last words", () => {
    expect(highlightUrl("https://example.com/a", "He was offered worldly gains and a great deal of wealth, but he turned his back on it")).toBe(
      "https://example.com/a#:~:text=He%20was%20offered%20worldly,his%20back%20on%20it"
    );
  });

  it("lights up everything between the two parts of a highlight joined by …", () => {
    expect(highlightUrl("https://example.com/a", "He studied with Ibn Hormuz … under Imam Ibn Shihab az-Zuhri")).toBe(
      "https://example.com/a#:~:text=He%20studied%20with%20Ibn,Imam%20Ibn%20Shihab%20az%2DZuhri"
    );
  });

  it("keeps a page's own #fragment and replaces an old text directive", () => {
    expect(highlightUrl("https://example.com/a#bio", "one two")).toBe("https://example.com/a#bio:~:text=one%20two");
    expect(highlightUrl("https://example.com/a#:~:text=old", "one two")).toBe("https://example.com/a#:~:text=one%20two");
  });
});

function allSources() {
  const sources: LessonSource[] = [];
  for (const lesson of Object.values(LESSONS_BY_ID)) {
    if (lesson.learnSource) sources.push(lesson.learnSource);
    for (const challenge of lesson.challenges) if (challenge.source) sources.push(challenge.source);
  }
  for (const secret of SECRET_LESSONS) sources.push(secret.source);
  return sources;
}

// Long pages where a learner would otherwise scroll a whole biography to find one line.
const LONG_PAGE = /^https:\/\/(islamqa\.info|kingfaisalprize\.org|www\.tarajm\.com)\//;
// Facts whose words are only in the page's description, not its body: those pages open at the top.
const NO_BODY_TEXT = [
  "His father died when he was three",
  "By the age of 20, he lost his sight",
  "He moved as a child with his family to Damascus",
  "He worked as a clock and watch repairer",
  "In his 1999 prize speech"
];

describe("source highlights", () => {
  const sources = allSources();

  it("opens every scholar biography fact at its line", () => {
    const missing = sources
      .filter((source) => LONG_PAGE.test(source.url) && !source.highlight)
      .filter((source) => !NO_BODY_TEXT.some((start) => source.summary.startsWith(start)))
      .map((source) => source.summary);
    expect(missing).toEqual([]);
  });

  it("uses the page's own spelling: the pages write ’ or ` where our text writes '", () => {
    const straight = sources.filter((source) => source.highlight?.includes("'")).map((source) => source.highlight);
    expect(straight).toEqual([]);
  });

  it("is a link to the source's page with the passage after it", () => {
    for (const source of sources.filter((item) => item.highlight)) {
      expect(sourceUrl(source).startsWith(`${source.url}#:~:text=`)).toBe(true);
    }
  });
});
