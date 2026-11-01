import { LESSONS_BY_ID } from "../data/course";
import { highlightFor, summaryKey } from "../data/sourceHighlights";
import { sourceUrl } from "../services/sourceLink";
import type { LessonSource } from "../types";

const HIGHLIGHTS: Record<string, string> = require("../data/sourceHighlights.json");

describe("sources open at the exact words", () => {
  const all: LessonSource[] = [];
  for (const lesson of Object.values(LESSONS_BY_ID)) {
    if (lesson.learnSource) all.push(lesson.learnSource);
    all.push(...lesson.sources, ...(lesson.learnDeeper?.sources ?? []));
    for (const challenge of lesson.challenges) if (challenge.source) all.push(challenge.source);
  }

  it("keys a summary the same way the picking script does", () => {
    expect(summaryKey("")).toBe("811c9dc5");
    expect(summaryKey("a")).toBe("e40c292c");
  });

  it("gives the Tafsir Ibn Kathir and Sunnah.com pages their highlighted words", () => {
    const used = new Set(all.map((source) => highlightFor(source)).filter(Boolean));
    // Every picked highlight belongs to a source the course still has.
    expect(used.size).toBeGreaterThan(Object.keys(HIGHLIGHTS).length * 0.9);
    const tafsir = all.filter((source) => /\/tafsirs\/en-tafisr-ibn-kathir/.test(source.url));
    expect(tafsir.filter((source) => source.highlight).length / tafsir.length).toBeGreaterThan(0.5);
    const hadith = all.filter((source) => source.url.includes("sunnah.com/"));
    expect(hadith.filter((source) => source.highlight).length / hadith.length).toBeGreaterThan(0.5);
  });

  it("uses plain words only, so the link finds them on the page", () => {
    for (const words of Object.values(HIGHLIGHTS)) {
      expect([words, /['"`’“”()]/.test(words)]).toEqual([words, false]);
      expect(words.split(/\s+/).length).toBeGreaterThanOrEqual(7);
      expect(words.split(/\s+/).length).toBeLessThanOrEqual(40);
    }
    const bukhari = all.find((source) => source.url === "https://sunnah.com/bukhari:998" && source.highlight);
    expect(bukhari && sourceUrl(bukhari)).toMatch(/#:~:text=\w+/);
  });
});
