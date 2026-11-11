import type { IconName } from "../ui/Icon";
import { LESSON_PICTURE_IDS } from "./lessonPictures";

/**
 * The picture album's sets: pictures that belong together, like pages of a sticker album. Finishing a set (finding
 * every picture in it) gives its badge and a celebration on the lesson's end card. Only pictures the app has are
 * counted, so a set never waits on a picture that cannot be found.
 */
export type AlbumSet = { id: string; title: string; icon: IconName; pictures: string[] };

/** Each set's name, by its id (a table of its own, so the translation catalogs find every name). */
const SET_TITLES = {
  makkah: "Makkah and the Hajj",
  seerah: "The Prophet's journey ﷺ",
  prophets: "Stories of the prophets",
  lands: "Blessed lands",
  "last-day": "The Last Day",
  worship: "Worship",
  "daily-life": "Life long ago"
} as const;

type SetId = keyof typeof SET_TITLES;

const SETS: { id: SetId; icon: IconName; pictures: string[] }[] = [
  { id: "makkah", icon: "kaaba", pictures: ["makkah", "kaaba", "zamzam", "safa-marwa", "hira", "arafah", "mina", "muzdalifah"] },
  { id: "seerah", icon: "palm", pictures: ["elephant", "cave", "taif", "madinah", "badr", "uhud", "scroll"] },
  { id: "prophets", icon: "scroll", pictures: ["ark", "sea-split", "big-fish", "sinai", "nile", "ahqaf", "hegra", "ants"] },
  { id: "lands", icon: "mosque", pictures: ["aqsa", "jerusalem", "damascus"] },
  { id: "last-day", icon: "sun", pictures: ["grave", "gathering", "book-deeds", "scales", "sirat", "pool", "sun-west", "garden"] },
  { id: "worship", icon: "dua", pictures: ["wudu", "prayer", "masjid", "quran", "iftar", "zakat", "manuscript", "books"] },
  { id: "daily-life", icon: "homeHeart", pictures: ["home", "market", "sharing", "sheep", "rain", "night", "sunrise", "desert", "date-palms", "desert-well"] }
];

const HAVE = new Set(LESSON_PICTURE_IDS);

/** The sets, each holding only pictures the app has; a set left with fewer than two is dropped. */
export const ALBUM_SETS: AlbumSet[] = SETS.map((set) => ({ ...set, title: SET_TITLES[set.id], pictures: set.pictures.filter((id) => HAVE.has(id)) })).filter((set) => set.pictures.length >= 2);

/** How many of a set's pictures are found. */
export function setProgress(set: AlbumSet, found: Iterable<string>) {
  const have = new Set(found);
  return set.pictures.filter((id) => have.has(id)).length;
}

export function isSetComplete(set: AlbumSet, found: Iterable<string>) {
  return setProgress(set, found) === set.pictures.length;
}

/** The sets that the new pictures just finished (complete now, not before them). */
export function setsFinishedBy(fresh: string[], foundNow: string[]): AlbumSet[] {
  if (!fresh.length) return [];
  const before = foundNow.filter((id) => !fresh.includes(id));
  return ALBUM_SETS.filter((set) => isSetComplete(set, foundNow) && !isSetComplete(set, before));
}
