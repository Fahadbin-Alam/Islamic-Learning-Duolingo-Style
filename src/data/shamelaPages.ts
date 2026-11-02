/**
 * Shamela's page id for each printed page (volume/page) that a lesson cites, so a source opens on that exact
 * page instead of the book's front page. Shamela numbers its pages in one run through the whole book, which
 * does not follow the printed numbers, so each id here was read off the page on shamela.ws (see
 * scripts/source-highlights/README.md).
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const PAGES: Record<string, number> = require("./shamelaPages.json");

/** The Shamela link for a printed page of a book, or the book itself when the page is not known. */
export function shamelaUrl(book: number, volume: number, page: number) {
  const id = PAGES[`${book}:${volume}/${page}`];
  return id ? `https://shamela.ws/book/${book}/${id}` : `https://shamela.ws/book/${book}`;
}
