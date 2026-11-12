import { bukhari, INLAND_ROAD, muslim, quran, type MapScene } from "./seerahMap";

/**
 * Hajj on a map, step by step: the miqats, then each day from the 8th to the 13th of Dhul-Hijjah at its own places, as
 * Jabir told of his Hajj ﷺ (Sahih Muslim 1218a), drawn by src/ui/journey like the Seerah maps. Only places, roads and
 * things: never the Prophet ﷺ, a Companion or any pilgrim.
 *
 * Every road and every word on these maps comes from the Quran or a sahih hadith of al-Bukhari or Muslim (each stop
 * names its sources, checked on their English text). What the scholars differ on is left out: where he ﷺ prayed Zuhr
 * on the 10th, the miqat of the people of Iraq, and where exactly his place of sacrifice was in Mina ("the whole of
 * Mina is a place for sacrifice", he ﷺ said in Sahih Muslim 1218). The three Jamarat are drawn as one place: they stand a few
 * hundred metres apart, too close to tell apart at Mina's size.
 */

/** The days of Hajj in Dhul-Hijjah, each shown on the bar under the map. */
export const HAJJ_DAYS = [8, 9, 10, 11, 12, 13] as const;
export type HajjDay = (typeof HAJJ_DAYS)[number];

export interface HajjStop {
  scene: MapScene;
  /** The stop's name on the map of Hajj ("The 9th: Arafah"). */
  title: string;
  /** When it is, under the map ("9th Dhul-Hijjah · Day of Arafah"). */
  when: string;
  /** The days it lights on the bar. */
  days: HajjDay[];
  /** A day some pilgrims stay for and others do not (the 13th: "two days or three", Quran 2:203). */
  maybe?: HajjDay[];
  /** The night between the 9th and the 10th, at Muzdalifah. */
  night?: boolean;
}

const JABIR = muslim("1218a");

const MIQATS: HajjStop = {
  title: "The miqats",
  when: "On the way to Makkah",
  days: [],
  scene: {
    id: "hajj-miqat",
    level: "hijaz",
    box: { north: 24.55, south: 20.4, west: 39.0, east: 40.55 },
    places: ["makkah", "dhulhulayfah", "juhfah", "qarnmanazil", "yalamlam"],
    // Qarn al-Manazil sits just east of Makkah: its name goes above it, clear of Makkah's.
    labels: { qarnmanazil: "top" },
    // His four miqats ﷺ, in the order he named them; each land's road goes on from its miqat to Makkah.
    legs: [
      { kind: "pilgrims", path: ["dhulhulayfah", ...INLAND_ROAD, [21.7, 39.62], "makkah"] },
      { kind: "pilgrims", path: ["juhfah", [22.28, 39.2], [21.93, 39.36], [21.6, 39.58], "makkah"] },
      { kind: "pilgrims", path: ["qarnmanazil", [21.55, 40.2], [21.47, 39.98], "makkah"] },
      { kind: "pilgrims", path: ["yalamlam", [20.9, 39.86], [21.2, 39.84], "makkah"] }
    ],
    notes: [
      { at: "dhulhulayfah", text: "For Madinah" },
      { at: "juhfah", text: "For Sham" },
      { at: "qarnmanazil", text: "For Najd" },
      { at: "yalamlam", text: "For Yemen" }
    ],
    caption: "He ﷺ set a miqat for each land: its pilgrims put on ihram there, then go on to Makkah.",
    sources: [bukhari("1524")]
  }
};

const TARWIYAH: HajjStop = {
  title: "The 8th: Mina",
  when: "8th Dhul-Hijjah · Day of Tarwiyah",
  days: [8],
  scene: {
    id: "hajj-tarwiyah",
    level: "makkah",
    box: { north: 21.44, south: 21.395, west: 39.81, east: 39.91 },
    places: ["makkah", "mina"],
    legs: [{ kind: "his", path: ["makkah", [21.418, 39.85], [21.4205, 39.872], "mina"] }],
    notes: [{ at: "mina", text: "Five prayers" }],
    caption: "On the 8th, the day of Tarwiyah, he ﷺ went to Mina and prayed five prayers there.",
    sources: [JABIR]
  }
};

const ARAFAH: HajjStop = {
  title: "The 9th: Arafah",
  when: "9th Dhul-Hijjah · Day of Arafah",
  days: [9],
  scene: {
    id: "hajj-arafah",
    level: "makkah",
    box: { north: 21.425, south: 21.322, west: 39.875, east: 40.03 },
    places: ["mina", "muzdalifah", "namirah", "arafah"],
    // Namirah's tent and the hill of Arafah stand close: their names go on their outer sides.
    labels: { namirah: "left", arafah: "right" },
    // On through Muzdalifah without stopping, to his tent at Namirah, then the standing at Arafah.
    legs: [{ kind: "his", path: ["mina", [21.402, 39.917], "muzdalifah", [21.37, 39.955], "namirah", [21.356, 39.976], "arafah"] }],
    // The sun goes down in the west of the map once the road reaches Arafah.
    effects: [{ kind: "sunset", at: [21.357, 39.902], after: 0 }],
    notes: [
      { at: "namirah", text: "Till noon" },
      { at: "arafah", text: "Till sunset" }
    ],
    caption: "On the 9th he ﷺ went on to Arafah and stood there, facing the qiblah, until the sun set.",
    sources: [JABIR]
  }
};

const MUZDALIFAH: HajjStop = {
  title: "The night at Muzdalifah",
  when: "The night after Arafah",
  days: [],
  night: true,
  scene: {
    id: "hajj-muzdalifah",
    level: "makkah",
    box: { north: 21.41, south: 21.34, west: 39.91, east: 40.0 },
    places: ["arafah", "muzdalifah"],
    // Muzdalifah's name on its left, so the note on its prayers has the room above it.
    labels: { muzdalifah: "left" },
    legs: [{ kind: "his", path: ["arafah", [21.37, 39.962], "muzdalifah"] }],
    effects: [{ kind: "night" }],
    notes: [{ at: "muzdalifah", text: "Maghrib and Isha together" }],
    caption: "After sunset he ﷺ went on to Muzdalifah, prayed Maghrib and Isha there, and rested until dawn.",
    sources: [JABIR]
  }
};

const NAHR: HajjStop = {
  title: "The 10th: the Day of Sacrifice",
  when: "10th Dhul-Hijjah · Day of Sacrifice",
  days: [10],
  scene: {
    id: "hajj-nahr",
    level: "makkah",
    // Room above the Jamarat for its note, over its name.
    box: { north: 21.445, south: 21.375, west: 39.815, east: 39.95 },
    places: ["muzdalifah", "mina", "jamarat", "makkah"],
    // The Jamarat's name over its pillar, clear of Mina's dot; Mina's on its right and Muzdalifah's under it, clear
    // of the notes.
    labels: { jamarat: "top", mina: "right", muzdalifah: "bottom" },
    // Through Mina to the big Jamrah at its far end, then on to the House.
    legs: [
      { kind: "his", path: ["muzdalifah", [21.401, 39.918], [21.4125, 39.897], [21.419, 39.881], "jamarat"] },
      { kind: "his", path: ["jamarat", [21.42, 39.862], [21.418, 39.85], "makkah"] }
    ],
    effects: [{ kind: "pebbles", at: "jamarat" }],
    notes: [
      // The two notes of single lessons, so the day's map is not crowded.
      { at: "muzdalifah", text: "Off before sunrise", lessons: ["deep-hajj-as-he-taught-it-before-the-sunrise"] },
      { at: "jamarat", text: "Seven pebbles" },
      { at: "mina", after: 0, text: "Sacrifice, then shave", source: muslim("1305a"), lessons: ["hajj-major-stations-sacrifice-and-release", "deep-hajj-spirit-feed-the-poor"] },
      { at: "makkah", text: "Tawaf" }
    ],
    caption: "On the 10th he ﷺ threw seven pebbles at the Jamrah, sacrificed, then went to the House.",
    sources: [JABIR]
  }
};

const TASHRIQ: HajjStop = {
  title: "The days at Mina",
  when: "11th to 13th · Days of Tashriq",
  days: [11, 12],
  maybe: [13],
  scene: {
    id: "hajj-tashriq",
    level: "makkah",
    box: { north: 21.43, south: 21.405, west: 39.862, east: 39.903 },
    places: ["mina", "jamarat"],
    legs: [
      { kind: "his", path: ["mina", [21.416, 39.884], "jamarat"] },
      { kind: "home", path: ["jamarat", [21.416, 39.884], "mina"] }
    ],
    effects: [{ kind: "pebbles", at: "jamarat" }],
    notes: [
      { at: "jamarat", text: "Three Jamarat, each day" },
      { at: "mina", text: "Two days or three", source: quran(2, 203) }
    ],
    caption: "On the days after, he ﷺ threw seven pebbles at each of the three Jamarat, with du'a after the first two.",
    sources: [bukhari("1751")]
  }
};

const FAREWELL: HajjStop = {
  title: "The farewell tawaf",
  when: "Before going home",
  days: [],
  scene: {
    id: "hajj-farewell",
    level: "makkah",
    box: { north: 21.44, south: 21.395, west: 39.81, east: 39.91 },
    places: ["mina", "makkah"],
    legs: [{ kind: "his", path: ["mina", [21.4205, 39.872], [21.418, 39.85], "makkah"] }],
    notes: [{ at: "makkah", text: "Farewell tawaf" }],
    caption: "Last of all, before leaving Makkah, a farewell tawaf of the House.",
    sources: [bukhari("1755")]
  }
};

const ALL: HajjStop = {
  title: "All of Hajj",
  when: "8th to 13th Dhul-Hijjah",
  days: [8, 9, 10, 11, 12],
  maybe: [13],
  night: true,
  scene: {
    id: "hajj-all",
    level: "makkah",
    box: { north: 21.44, south: 21.335, west: 39.805, east: 40.005 },
    places: ["makkah", "mina", "muzdalifah", "arafah"],
    legs: [
      { kind: "his", path: ["makkah", [21.418, 39.85], "mina", [21.395, 39.925], [21.372, 39.958], "arafah"] },
      { kind: "home", path: ["arafah", [21.37, 39.962], "muzdalifah", [21.405, 39.915], "mina", [21.418, 39.85], "makkah"] }
    ],
    caption: "Hajj in order: Mina, Arafah, Muzdalifah, then back to Mina and the House.",
    sources: [JABIR]
  }
};

/** The map of Hajj, in order: the miqats, the days from the 8th to the 13th, the farewell tawaf, then all of it. */
export const HAJJ_STOPS: readonly HajjStop[] = [MIQATS, TARWIYAH, ARAFAH, MUZDALIFAH, NAHR, TASHRIQ, FAREWELL, ALL];

/**
 * The Hajj lessons that open on a map, by their lesson's node id: the stop they are about and the place they are
 * about. Every other Hajj lesson (tawaf, sa'i, the Ka'bah, the masjids...) keeps its photo.
 */
export const HAJJ_MAP_LESSONS: Record<string, { stop: string; focus?: string }> = {
  "hajj-rites-ihram": { stop: "hajj-miqat", focus: "dhulhulayfah" },
  "hajj-rites-days-and-order": { stop: "hajj-all" },
  "hajj-major-stations-arafah": { stop: "hajj-arafah", focus: "arafah" },
  "hajj-major-stations-muzdalifah": { stop: "hajj-muzdalifah", focus: "muzdalifah" },
  "hajj-major-stations-mina": { stop: "hajj-tashriq", focus: "jamarat" },
  "hajj-major-stations-sacrifice-and-release": { stop: "hajj-nahr", focus: "mina" },
  "hajj-major-stations-stations-review": { stop: "hajj-all" },
  "deep-hajj-kabah-farewell-tawaf": { stop: "hajj-farewell", focus: "makkah" },
  "deep-hajj-spirit-be-calm": { stop: "hajj-muzdalifah" },
  "deep-hajj-spirit-ease-for-the-weak": { stop: "hajj-muzdalifah", focus: "muzdalifah" },
  "deep-hajj-spirit-remember-at-mashar": { stop: "hajj-muzdalifah", focus: "muzdalifah" },
  "deep-hajj-spirit-feed-the-poor": { stop: "hajj-nahr", focus: "mina" },
  "deep-hajj-as-he-taught-it-take-your-rites-from-me": { stop: "hajj-nahr", focus: "jamarat" },
  "deep-hajj-as-he-taught-it-ibn-masuds-pebbles": { stop: "hajj-nahr", focus: "jamarat" },
  "deep-hajj-as-he-taught-it-before-the-sunrise": { stop: "hajj-nahr", focus: "muzdalifah" }
};

/** A Hajj lesson's map: its stop, and the place it is about (with a ring). `lessonSlug` is the lesson's node id. */
export type HajjLessonMap = {
  stop: HajjStop;
  stopIndex: number;
  scene: MapScene;
  lessonSlug: string;
  focus?: string;
};

/** The map a Hajj lesson opens on, or undefined for a lesson that has none. */
export function hajjMapForLesson(lesson: { nodeId: string }): HajjLessonMap | undefined {
  const own = HAJJ_MAP_LESSONS[lesson.nodeId];
  if (!own) return undefined;
  const stopIndex = HAJJ_STOPS.findIndex((stop) => stop.scene.id === own.stop);
  if (stopIndex < 0) return undefined;
  const stop = HAJJ_STOPS[stopIndex];
  return { stop, stopIndex, scene: stop.scene, lessonSlug: lesson.nodeId, focus: own.focus };
}

/** Every English word the Hajj maps can show, for the translation catalogs (the places are in seerahMapText). */
export function hajjMapText(): string[] {
  const text = new Set<string>();
  for (const stop of HAJJ_STOPS) {
    text.add(stop.title);
    text.add(stop.when);
    text.add(stop.scene.caption);
    stop.scene.sources.forEach((source) => text.add(source.reference));
    [...stop.scene.legs, ...(stop.scene.effects ?? []), ...(stop.scene.notes ?? [])].forEach((item) => item.source && text.add(item.source.reference));
    stop.scene.legs.forEach((leg) => leg.label && text.add(leg.label));
    stop.scene.effects?.forEach((effect) => effect.label && text.add(effect.label));
    stop.scene.notes?.forEach((note) => text.add(note.text));
  }
  return [...text];
}
