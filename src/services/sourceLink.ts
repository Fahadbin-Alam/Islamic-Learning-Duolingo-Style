import { Linking } from "react-native";
import type { LessonSource } from "../types";

// A passage longer than this many words is named by its first and last words, so the whole passage lights up
// without a link as long as the passage.
const EDGE_WORDS = 4;

// Text fragments match whole words, so each part is encoded with the characters the fragment syntax uses for
// itself (",", "&" and "-") escaped as well.
function encodePart(part: string) {
  return encodeURIComponent(part).replace(/-/g, "%2D").replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

/**
 * A link that opens the page scrolled to `highlight` with it highlighted (a URL text fragment, #:~:text=), in
 * the browsers that support them: Chrome, Edge, Safari 16.1+ and Firefox 131+. Any other browser ignores the
 * fragment and opens the page at the top, as a plain link would. A highlight of two parts joined by " … " lights
 * up everything from the first part to the second.
 */
export function highlightUrl(url: string, highlight?: string) {
  const parts = (highlight ?? "").split("…").map((part) => part.trim().split(/\s+/).filter(Boolean)).filter((words) => words.length > 0);
  if (!url || parts.length === 0) return url;
  const first = parts[0];
  const last = parts[parts.length - 1];
  const words = parts.flat();
  const directive =
    parts.length === 1 && words.length <= EDGE_WORDS * 2 + 1
      ? encodePart(words.join(" "))
      : `${encodePart(first.slice(0, EDGE_WORDS).join(" "))},${encodePart(last.slice(-EDGE_WORDS).join(" "))}`;
  // A page's own #fragment stays, with the text directive after it.
  const base = url.replace(/:~:.*$/, "");
  return `${base}${base.includes("#") ? "" : "#"}:~:text=${directive}`;
}

/** Where a source chip opens: the source's page, at the words that say its fact when they are known. */
export function sourceUrl(source: Pick<LessonSource, "url" | "highlight">) {
  return highlightUrl(source.url, source.highlight);
}

/** Opens a source's page in the browser, at its highlighted words. */
export function openSource(source: Pick<LessonSource, "url" | "highlight">) {
  const url = sourceUrl(source);
  if (url) void Linking.openURL(url).catch(() => undefined);
}
