import type { Lesson, LessonSource } from "../types";

/**
 * The exact words on a source's page that say what the lesson teaches, for the Quran.com Tafsir Ibn Kathir pages
 * and Sunnah.com hadith pages that had none: the source then opens scrolled to them, highlighted
 * (src/services/sourceLink.ts). Picked by scripts/source-highlights/match.py from the same English texts those
 * pages show (Tafsir Ibn Kathir abridged, the Sunnah.com translations), each checked to be on the page word for
 * word. Keyed by the page's url and a hash of the source's summary, since one page can back several lessons.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const HIGHLIGHTS: Record<string, string> = require("./sourceHighlights.json");

/** FNV-1a over UTF-16 code units, as 8 hex digits (the same as match.py's key). */
export function summaryKey(summary: string) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < summary.length; i += 1) {
    hash ^= summary.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}

export function highlightFor(source: Pick<LessonSource, "url" | "summary">) {
  return HIGHLIGHTS[`${source.url}#${summaryKey(source.summary ?? "")}`];
}

/** Gives every source that has no highlighted words yet the ones picked for it. */
export function applySourceHighlights(lessons: Iterable<Lesson>) {
  const fill = (source: LessonSource | undefined) => {
    if (source && !source.highlight) {
      const words = highlightFor(source);
      if (words) source.highlight = words;
    }
  };
  for (const lesson of lessons) {
    fill(lesson.learnSource);
    lesson.sources.forEach(fill);
    lesson.learnDeeper?.sources.forEach(fill);
    for (const challenge of lesson.challenges) fill(challenge.source);
  }
}
