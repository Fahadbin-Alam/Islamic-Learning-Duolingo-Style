import { bukhari, muslim, quran, type MapSource } from "./seerahMap";

/**
 * The moon in the sky. The lessons about the moon and the months open on a living sky of their own, in the place of
 * their photo, as the lessons about the times of the day open on the day's sky (daySky.ts):
 *
 * - the moon split in two, with Hira seen between its halves (Quran 54:1, Sahih al-Bukhari 3868, Sahih Muslim 2800a);
 * - the new moon, low in the west after sunset: the new moons mark the months, for fasting and for Hajj (Quran 2:189,
 *   Sahih al-Bukhari 1909);
 * - the moon's stages, from the new moon to full on the fourteenth night, and back until it is like an old date stalk
 *   (Quran 36:39, Ibn Kathir on it);
 * - the star, the moon and the sun that Ibrahim saw set (Quran 6:76 to 6:78);
 * - the sun by day and the moon by night, each floating in its orbit (Quran 21:33, 36:40);
 * - the twelve months of the year, four of them sacred (Quran 9:36, Sahih al-Bukhari 4662), and the
 *   month a lesson is about: Muharram (Sahih Muslim 1163a), Sha'ban (Sahih al-Bukhari 1969) or Ramadan (Quran 2:185).
 *
 * The sky is seen facing south, as in the day's sky: east on the left, west on the right. Left out, because the
 * scholars differ: how the new moon is to be sighted, or counted. Nothing in the sky is a person or an angel: only the
 * moon, the sun, the stars, the sand, the hills, the mountain of Hira and palms.
 */

export type MoonKind = "split" | "newMoon" | "stages" | "ibrahim" | "courses" | "months";

export type MoonScene = {
  id: string;
  kind: MoonKind;
  caption: string;
  sources: MapSource[];
  /** For the months: the month this lesson is about (0 is Muharram), lit apart from the others. */
  month?: number;
};

/**
 * Tafsir Ibn Kathir on an ayah, on Quran.com, opened at the words that say what the sky shows (`at`: a URL text
 * fragment, as src/services/sourceLink.ts makes them; the same words the lesson on that ayah lights).
 */
const ibnKathir = (surah: number, ayah: number, at: string): MapSource => ({
  reference: `Tafsir Ibn Kathir ${surah}:${ayah}`,
  url: `https://quran.com/${surah}:${ayah}/tafsirs/en-tafisr-ibn-kathir#:~:text=${at}`
});

/** The twelve months of the year, by the moon, in order; the four sacred ones (Sahih al-Bukhari 4662) marked. */
export const MONTHS: readonly { name: string; sacred: boolean }[] = [
  { name: "Muharram", sacred: true },
  { name: "Safar", sacred: false },
  { name: "Rabi al-Awwal", sacred: false },
  { name: "Rabi al-Akhir", sacred: false },
  { name: "Jumada al-Ula", sacred: false },
  { name: "Jumada al-Akhirah", sacred: false },
  { name: "Rajab", sacred: true },
  { name: "Sha'ban", sacred: false },
  { name: "Ramadan", sacred: false },
  { name: "Shawwal", sacred: false },
  { name: "Dhul-Qa'dah", sacred: true },
  { name: "Dhul-Hijjah", sacred: true }
];

export const MOON_SCENES: readonly MoonScene[] = [
  {
    id: "moon-split",
    kind: "split",
    caption: "The moon split in two, and the mountain of Hira was seen between its halves.",
    sources: [quran(54, 1), bukhari("3868"), muslim("2800a")]
  },
  {
    id: "moon-new",
    kind: "newMoon",
    caption: "After sunset, the new moon shows low in the west. The new moons mark the months, for fasting and for Hajj.",
    sources: [quran(2, 189), bukhari("1909")]
  },
  {
    id: "moon-stages",
    kind: "stages",
    caption: "The moon grows from the new moon until it is full on the fourteenth night, then wanes until it is like an old date stalk.",
    sources: [quran(36, 39), ibnKathir(36, 39, "until%20it%20becomes%20full,night%20of%20the%20month")]
  },
  {
    id: "moon-ibrahim",
    kind: "ibrahim",
    caption: "When the star set, Ibrahim said: I do not love things that set. Then the moon set, and then the sun.",
    sources: [quran(6, 76), quran(6, 77), quran(6, 78)]
  },
  {
    id: "moon-courses",
    kind: "courses",
    caption: "The sun by day and the moon by night: each floats in its own orbit.",
    sources: [quran(21, 33), quran(36, 40)]
  },
  {
    id: "months-year",
    kind: "months",
    caption: "Twelve months in the year, and four of them are sacred: Dhul-Qa'dah, Dhul-Hijjah, Muharram and Rajab.",
    sources: [quran(9, 36), bukhari("4662")]
  },
  {
    id: "months-muharram",
    kind: "months",
    month: 0,
    caption: "Muharram is Allah's month: the best fasting after Ramadan is fasting in it.",
    sources: [muslim("1163a")]
  },
  {
    id: "months-shaban",
    kind: "months",
    month: 7,
    caption: "He ﷺ fasted more in Sha'ban than in any other month but Ramadan.",
    sources: [bukhari("1969")]
  },
  {
    id: "months-ramadan",
    kind: "months",
    month: 8,
    caption: "Ramadan is the month in which the Quran was sent down.",
    sources: [quran(2, 185)]
  }
];

/** The lessons that open on the moon (by node id), and the sky each opens on. */
export const MOON_LESSONS: Record<string, string> = {
  // The moon split, in his ﷺ time.
  "deep-lastday-moon-split": "moon-split",
  "deep-lastday-near": "moon-split",
  "deep-qamar1-the-moon-split": "moon-split",
  "deep-qamar1-bear-witness": "moon-split",
  "deep-qamar1-the-hour-has-drawn-near": "moon-split",
  "surah-meaning-54-1-8": "moon-split",
  // The new moons, and the months they mark.
  "deep-baqarah3-crescents": "moon-new",
  "surah-meaning-2-189-196": "moon-new",
  "deep-book-fasting-fast-when-you-see-the-moon": "moon-new",
  "deep-book-fasting-twenty-nine-or-thirty": "moon-new",
  "deep-book-riqaq-three-crescents": "moon-new",
  // The moon's stages.
  "deep-yasin2-stages-of-the-moon": "moon-stages",
  "deep-yunus1-sun-and-moon": "moon-stages",
  "surah-meaning-10-1-20": "moon-stages",
  "deep-inshiqaq2-the-moon-when-full": "moon-stages",
  // What Ibrahim saw set.
  "deep-prophet-ibrahim-stars": "moon-ibrahim",
  "deep-anam2-star-moon-sun": "moon-ibrahim",
  // The sun and the moon, each in its orbit.
  "deep-anbiya1-each-in-an-orbit": "moon-courses",
  "deep-yasin2-each-in-an-orbit": "moon-courses",
  "surah-meaning-36-33-50": "moon-courses",
  "quran-surah-yasin-signs-in-creation": "moon-courses",
  "deep-rahman1-sun-and-moon-on-courses": "moon-courses",
  "deep-raad1-sun-and-moon-on-a-course": "moon-courses",
  "deep-nahl1-night-day-and-stars": "moon-courses",
  "deep-zumar1-an-appointed-term": "moon-courses",
  "deep-fussilat3-sun-moon-night-and-day": "moon-courses",
  "deep-fussilat3-prostrate-to-allah-alone": "moon-courses",
  "deep-furqan2-sun-lamp-moon-light": "moon-courses",
  "deep-nuh3-moon-light-sun-lamp": "moon-courses",
  "deep-shams1-the-moon-follows": "moon-courses",
  // The twelve months, and the four sacred ones.
  "deep-islamic-year-twelve-months": "months-year",
  "deep-tawbah2-twelve-months": "months-year",
  "deep-tawbah2-do-not-wrong-yourselves": "months-year",
  "deep-tawbah2-moving-the-months": "months-year",
  "surah-meaning-9-30-37": "months-year",
  // Muharram, Sha'ban and Ramadan.
  "deep-islamic-year-muharram": "months-muharram",
  "deep-fast-extra-muharram": "months-muharram",
  "deep-islamic-year-shaban": "months-shaban",
  "deep-fast-extra-shaban": "months-shaban",
  "deep-fasting-making-the-most-of-ramadan-getting-ready-in-shaban": "months-shaban",
  "deep-baqarah3-ramadan-quran": "months-ramadan",
  "ramadan-month-of-the-quran": "months-ramadan",
  "fasting-purpose-ramadan-and-quran": "months-ramadan",
  "deep-qadr1-in-the-month-of-ramadan": "months-ramadan"
};

export type LessonMoon = { scene: MoonScene; lessonSlug: string };

/** The moon a lesson opens on, or undefined for a lesson that has none. */
export function moonForLesson(lesson: { nodeId: string }): LessonMoon | undefined {
  const id = MOON_LESSONS[lesson.nodeId];
  const scene = id ? MOON_SCENES.find((each) => each.id === id) : undefined;
  return scene ? { scene, lessonSlug: lesson.nodeId } : undefined;
}

/** The words the moon's skies show. */
export const MOON_WORDS = {
  newMoon: "The new moon",
  full: "Full moon",
  stalk: "Like an old date stalk",
  hira: "Hira",
  star: "The star",
  moon: "The moon",
  sun: "The sun"
} as const;

/** Every English word the moon's skies can show, for the translation catalogs. */
export function moonSkyText(): string[] {
  const text = new Set<string>(Object.values(MOON_WORDS));
  MONTHS.forEach((month) => text.add(month.name));
  for (const scene of MOON_SCENES) {
    text.add(scene.caption);
    scene.sources.forEach((source) => text.add(source.reference));
  }
  return [...text];
}
