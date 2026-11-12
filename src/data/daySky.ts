import { bukhari, muslim, quran, type MapSource } from "./seerahMap";

/**
 * Each prayer's time in the sky. The lessons about the times of the day (the five prayers, the sunnah of Fajr, Duha,
 * the night prayer and witr, suhur and iftar) open on a living sky at that time, with a bar of the day's times under
 * it; "The day of prayer" on the Prayer path plays the whole day, from the first light of dawn to the last third of the
 * night.
 *
 * The sky is one day near the equinox at Madinah, seen facing south: the sun rises in the east on the left at 6, is at
 * its height at 12 and sets in the west on the right at 18. The hours run on past midnight (27 is 3 at night), so a
 * sky that goes from the night into the next dawn still plays forward.
 *
 * What a sky says comes from its sources, each a hadith of al-Bukhari or Muslim or an ayah: the times of the prayers as
 * he ﷺ gave them (Sahih Muslim 612d), Zuhr just after midday (Sahih al-Bukhari 547), Asr while the sun is high (550),
 * Maghrib once the sun has gone (561), the young camels in the forenoon heat (Sahih Muslim 748a), the shadows of the
 * hillocks once Zuhr has cooled (539), the arrow still seen after Maghrib (559), the white thread of dawn (Quran 2:187),
 * night coming from the east at iftar (1954, 1956), suhur close to dawn (1921) and the last third of the night (1145).
 *
 * Left out, because the scholars differ: how long a shadow is when Asr begins, which glow of twilight Isha waits for,
 * and whether Fajr is best prayed in the dark or in the light. Nothing in the sky is a person or an angel: only the sun,
 * the moon, the stars, hills, palms, two young camels and an arrow.
 */

export type DayMoment = "dawn" | "sunrise" | "forenoon" | "midday" | "afternoon" | "sunset" | "night" | "lastThird";

export type DayTime = { key: DayMoment; name: string; color: string };

/** The times of the day, in order, as the bar under the sky shows them, each in the colour of its sky. */
export const DAY_TIMES: readonly DayTime[] = [
  { key: "dawn", name: "Dawn", color: "#4B4F9E" },
  { key: "sunrise", name: "Sunrise", color: "#EE8434" },
  { key: "forenoon", name: "Forenoon", color: "#3FA6EA" },
  { key: "midday", name: "Midday", color: "#2585DC" },
  { key: "afternoon", name: "Afternoon", color: "#DC9420" },
  { key: "sunset", name: "Sunset", color: "#DE5536" },
  { key: "night", name: "Night", color: "#2B3474" },
  { key: "lastThird", name: "The last third of the night", color: "#151B47" }
];

/** The sky's day: the first light of dawn, sunrise, midday, sunset, the end of twilight, and the next dawn. */
export const SKY_HOURS = { dawn: 4.75, sunrise: 6, midday: 12, sunset: 18, dusk: 19.25, nextDawn: 28.75 } as const;

/** Where in the day each prayer's name sits in the sky. */
const AT = { fajr: 5.15, sunrise: 6.12, duha: 8.9, zuhr: 12.35, asr: 15.5, maghrib: 18.12, isha: 20.6, midnight: 23.4, lastThird: 27, nextFajr: 29.15 };

/**
 * A touch in the sky, from its scene's sources: the white thread of dawn over the black of night, the heat at midday
 * (it fades as Zuhr cools and the hills cast shadows), the young camels in the forenoon sun, an arrow that lands where
 * it can still be seen after Maghrib, and night coming from the east as the sun sets in the west.
 */
export type SkyTouch = "thread" | "heat" | "camels" | "arrow" | "nightFalls";

/** A prayer's name in the sky, shown once the day reaches its time. */
export type SkyMark = { hour: number; label: string };

export type SkyScene = {
  id: string;
  /** The hours the sky plays between. */
  from: number;
  to: number;
  caption: string;
  sources: MapSource[];
  touches?: SkyTouch[];
  marks?: SkyMark[];
};

export type SkyStop = {
  scene: SkyScene;
  /** Its name in "The day of prayer" (only the stops it plays have one). */
  title?: string;
  /** When it is: "Dawn · Fajr". */
  when: string;
  /** The times the bar lights. */
  moments: DayMoment[];
  /** Every time from the first to the last is lit (the fast, from dawn to sunset). */
  span?: boolean;
};

const FAJR: SkyStop = {
  title: "Fajr",
  when: "Dawn · Fajr",
  moments: ["dawn"],
  scene: { id: "sky-fajr", from: 3.9, to: AT.fajr, caption: "Fajr: from the first light of dawn until the sun rises.", sources: [muslim("612d")] }
};

const SUNRISE: SkyStop = {
  title: "Sunrise",
  when: "Sunrise",
  moments: ["sunrise"],
  scene: { id: "sky-sunrise", from: AT.fajr, to: AT.sunrise, caption: "The sun rises, and the time of Fajr is over.", sources: [muslim("612d")] }
};

const DUHA: SkyStop = {
  title: "Duha",
  when: "Forenoon · Duha",
  moments: ["forenoon"],
  scene: {
    id: "sky-duha",
    from: AT.sunrise,
    to: AT.duha,
    touches: ["camels"],
    caption: "Duha: two rak'ahs in the forenoon, best when the young camels feel the sun's heat.",
    sources: [muslim("720"), muslim("748a")]
  }
};

const ZUHR: SkyStop = {
  title: "Zuhr",
  when: "Midday · Zuhr",
  moments: ["midday"],
  scene: { id: "sky-zuhr", from: AT.duha, to: AT.zuhr, caption: "Zuhr: once the sun has passed its height at midday.", sources: [bukhari("547")] }
};

const ASR: SkyStop = {
  title: "Asr",
  when: "Afternoon · Asr",
  moments: ["afternoon"],
  scene: { id: "sky-asr", from: AT.zuhr, to: AT.asr, caption: "Asr: while the sun is still high and hot.", sources: [bukhari("550")] }
};

const MAGHRIB: SkyStop = {
  title: "Maghrib",
  when: "Sunset · Maghrib",
  moments: ["sunset"],
  scene: { id: "sky-maghrib", from: AT.asr, to: AT.maghrib, caption: "Maghrib: once the sun has gone down below the horizon.", sources: [bukhari("561")] }
};

const ISHA: SkyStop = {
  title: "Isha",
  when: "Night · Isha",
  moments: ["night"],
  scene: { id: "sky-isha", from: AT.maghrib, to: AT.isha, caption: "Isha: once the twilight has gone, until the middle of the night.", sources: [muslim("612d")] }
};

const LAST_THIRD: SkyStop = {
  title: "The last third of the night",
  when: "The last third of the night",
  moments: ["lastThird"],
  scene: {
    id: "sky-last-third",
    from: AT.isha,
    to: AT.lastThird,
    caption: "In the last third of the night, Allah asks: who will call on Me, that I may answer him?",
    sources: [bukhari("1145")]
  }
};

const FIVE: SkyStop = {
  title: "The five prayers",
  when: "From dawn to night",
  moments: ["dawn", "midday", "afternoon", "sunset", "night"],
  scene: {
    id: "sky-five",
    from: 3.9,
    to: AT.isha,
    marks: [
      { hour: AT.fajr, label: "Fajr" },
      { hour: AT.zuhr, label: "Zuhr" },
      { hour: AT.asr, label: "Asr" },
      { hour: AT.maghrib, label: "Maghrib" },
      { hour: AT.isha, label: "Isha" }
    ],
    caption: "Five prayers, each in its own time, from dawn to night.",
    sources: [muslim("612d")]
  }
};

/** "The day of prayer", in order: each prayer in its time (with sunrise and Duha), the last third of the night, then all five. */
export const DAY_OF_PRAYER: readonly SkyStop[] = [FAJR, SUNRISE, DUHA, ZUHR, ASR, MAGHRIB, ISHA, LAST_THIRD, FIVE];

// The skies only a lesson opens on.

const COOL: SkyStop = {
  when: "Midday · Zuhr",
  moments: ["midday"],
  scene: { id: "sky-cool", from: 11.9, to: 14, touches: ["heat"], caption: "In great heat, Zuhr waits until it cools and the hills cast shadows.", sources: [bukhari("539")] }
};

const ARROW: SkyStop = {
  when: "Sunset · Maghrib",
  moments: ["sunset"],
  scene: { id: "sky-arrow", from: 17.8, to: 18.6, touches: ["arrow"], caption: "After Maghrib, it was still light enough to see where an arrow fell.", sources: [bukhari("559")] }
};

const THREAD: SkyStop = {
  when: "Dawn",
  moments: ["dawn"],
  scene: {
    id: "sky-thread",
    from: 3.9,
    to: 5,
    touches: ["thread"],
    caption: "Eat and drink until the white thread of dawn shows from the black thread of night.",
    sources: [quran(2, 187), bukhari("1916")]
  }
};

const IFTAR: SkyStop = {
  when: "Sunset · Iftar",
  moments: ["sunset"],
  scene: {
    id: "sky-iftar",
    from: 17.2,
    to: 18.2,
    touches: ["nightFalls"],
    caption: "Night comes from the east, the day goes in the west, the sun sets: time to break the fast.",
    sources: [bukhari("1954"), bukhari("1956")]
  }
};

const FAST: SkyStop = {
  when: "Dawn to sunset",
  moments: ["dawn", "sunset"],
  span: true,
  scene: { id: "sky-fast", from: 4.5, to: 18.2, caption: "The fast lasts from the first light of dawn until the sun sets.", sources: [quran(2, 187), bukhari("1954")] }
};

const SUHUR: SkyStop = {
  when: "Before dawn · Suhur",
  moments: ["lastThird", "dawn"],
  scene: { id: "sky-suhur", from: 26.2, to: AT.nextFajr, caption: "Suhur close to dawn, about fifty ayat's time before the adhan.", sources: [bukhari("1921")] }
};

const FAJR_ASR: SkyStop = {
  when: "Fajr and Asr",
  moments: ["dawn", "afternoon"],
  scene: {
    id: "sky-fajr-asr",
    from: 3.9,
    to: AT.asr,
    marks: [
      { hour: AT.fajr, label: "Fajr" },
      { hour: AT.asr, label: "Asr" }
    ],
    caption: "Fajr before the sun rises, and Asr before it sets.",
    sources: [bukhari("554")]
  }
};

const ISHA_FAJR: SkyStop = {
  when: "Isha and Fajr",
  moments: ["night", "dawn"],
  scene: {
    id: "sky-isha-fajr",
    from: AT.maghrib + 0.3,
    to: AT.nextFajr,
    marks: [
      { hour: AT.isha, label: "Isha" },
      { hour: AT.nextFajr, label: "Fajr" }
    ],
    caption: "Isha at night, then Fajr at dawn.",
    sources: [muslim("612d")]
  }
};

const MIDNIGHT: SkyStop = {
  when: "The middle of the night · Isha",
  moments: ["night"],
  scene: { id: "sky-midnight", from: 19, to: AT.midnight, caption: "One night, Isha was put off until the middle of the night.", sources: [bukhari("567")] }
};

const NIGHT_PRAYER: SkyStop = {
  when: "The night prayer",
  moments: ["night", "lastThird"],
  span: true,
  scene: {
    id: "sky-night-prayer",
    from: AT.isha,
    to: 28.4,
    caption: "The night prayer is two by two, and witr is its last prayer, before dawn.",
    sources: [bukhari("1137"), bukhari("998")]
  }
};

/** Every sky: the day of prayer, then the ones only a lesson opens on. */
export const SKY_STOPS: readonly SkyStop[] = [...DAY_OF_PRAYER, COOL, ARROW, THREAD, IFTAR, FAST, SUHUR, FAJR_ASR, ISHA_FAJR, MIDNIGHT, NIGHT_PRAYER];

/**
 * The lessons that open on the sky, by their lesson's node id, and the sky each opens on: the times of the five
 * prayers, the sunnah of Fajr, Duha, Zuhr in the heat, Asr, Maghrib, Isha late, the night prayer and witr, the last
 * third of the night, and the fast from suhur to iftar.
 */
export const DAY_SKY_LESSONS: Record<string, string> = {
  // The five prayers and their times.
  "prayer-salah-basics-names-and-order": "sky-five",
  "prayer-times-time-and-worship": "sky-five",
  "prayer-times-fajr-to-isha": "sky-five",
  "prayer-times-general-time-windows": "sky-five",
  "prayer-times-times-review": "sky-five",
  "deep-prayer-sunnah-times-the-times-of-the-five-prayers": "sky-five",
  "deep-isra3-the-prayer-times": "sky-five",
  // Fajr, and its two rak'ahs of sunnah.
  "deep-prayer-sunnah-times-fajr-in-the-dark": "sky-fajr",
  "deep-isra3-fajr-is-witnessed": "sky-fajr",
  "deep-pray-extra-before-fajr": "sky-fajr",
  "deep-tur3-better-than-the-world": "sky-fajr",
  "deep-book-adhan-two-light-rakahs-at-fajr": "sky-fajr",
  "deep-book-night-prayer-light-fajr-sunnah": "sky-fajr",
  "deep-tur3-never-missed-the-sunnah-of-fajr": "sky-fajr",
  "deep-kafirun1-the-two-rakahs-of-fajr": "sky-fajr",
  "deep-book-night-prayer-resting-on-the-right-side": "sky-fajr",
  // Sitting after Fajr until the sun rose, and Duha.
  "deep-book-fadail-sitting-until-sunrise": "sky-sunrise",
  "deep-pray-extra-duha": "sky-duha",
  // Zuhr, and Zuhr in the heat.
  "deep-prayer-little-extras-four-before-four-after": "sky-zuhr",
  "deep-prayer-little-extras-when-heavens-gates-open": "sky-zuhr",
  "deep-prayer-sunnah-times-let-it-cool-down": "sky-cool",
  "deep-qariah2-pray-when-it-cools": "sky-cool",
  // Asr, and Fajr with Asr.
  "deep-prayer-sunnah-times-do-not-miss-asr": "sky-asr",
  "deep-baqarah3-middle-prayer": "sky-asr",
  "deep-pray-reward-two-cool": "sky-fajr-asr",
  "deep-aq-malaikah-fajr-asr": "sky-fajr-asr",
  "deep-raad1-angels-meet-at-fajr-and-asr": "sky-fajr-asr",
  "deep-infitar2-angels-in-shifts": "sky-fajr-asr",
  "deep-qaf3-fajr-and-asr": "sky-fajr-asr",
  "deep-taha3-like-seeing-the-full-moon": "sky-fajr-asr",
  "deep-taha3-be-patient-and-glorify": "sky-fajr-asr",
  // Maghrib.
  "deep-prayer-sunnah-times-maghrib-in-the-light": "sky-arrow",
  "deep-book-night-prayer-pray-before-maghrib": "sky-maghrib",
  "deep-book-adhan-dinner-before-maghrib": "sky-maghrib",
  // Isha, and Isha with Fajr.
  "deep-prayer-sunnah-times-glad-news-at-isha": "sky-midnight",
  "deep-pray-reward-isha-fajr": "sky-isha-fajr",
  "deep-munafiqun1-heavy-prayers": "sky-isha-fajr",
  "deep-tawbah3-lazy-to-prayer": "sky-isha-fajr",
  // The night prayer, witr, and the last third of the night.
  "deep-pray-extra-witr": "sky-night-prayer",
  "deep-marriage-faith-at-home-woken-for-witr": "sky-night-prayer",
  "deep-book-night-prayer-two-by-two": "sky-night-prayer",
  "deep-book-night-prayer-dont-stop-the-night-prayer": "sky-night-prayer",
  "deep-isra3-the-night-prayer": "sky-night-prayer",
  "deep-pray-night-praised-station": "sky-night-prayer",
  "deep-tur3-glorify-at-night": "sky-night-prayer",
  "deep-hadith-forgives-last-third": "sky-last-third",
  "deep-imran1-last-third": "sky-last-third",
  "deep-dhariyat1-the-last-third": "sky-last-third",
  "deep-muzzammil4-the-last-third": "sky-last-third",
  // The fast: suhur, the white thread, the day, and iftar.
  "fasting-times-and-rules-suhur-and-intent": "sky-suhur",
  "deep-fast-suhur-blessing": "sky-suhur",
  "ramadan-suhur": "sky-suhur",
  "deep-fast-suhur-fifty-verses": "sky-suhur",
  "deep-book-fasting-eat-till-the-second-adhan": "sky-suhur",
  "deep-bilal-two-callers": "sky-suhur",
  "deep-book-fasting-suhur-then-fajr": "sky-suhur",
  "deep-fast-suhur-white-thread": "sky-thread",
  "deep-baqarah3-white-thread": "sky-thread",
  "fasting-times-and-rules-start-and-end": "sky-fast",
  "fasting-times-and-rules-timing-review": "sky-fast",
  "fasting-times-and-rules-breaking-the-fast": "sky-iftar",
  "deep-fast-suhur-hasten": "sky-iftar",
  "ramadan-hurry-to-iftar": "sky-iftar"
};

/** A lesson's sky: the stop it opens on. `lessonSlug` is the lesson's node id. */
export type LessonSky = { stop: SkyStop; scene: SkyScene; lessonSlug: string };

/** The sky a lesson opens on, or undefined for a lesson that has none. */
export function skyForLesson(lesson: { nodeId: string }): LessonSky | undefined {
  const id = DAY_SKY_LESSONS[lesson.nodeId];
  const stop = id ? SKY_STOPS.find((each) => each.scene.id === id) : undefined;
  return stop ? { stop, scene: stop.scene, lessonSlug: lesson.nodeId } : undefined;
}

/** The times the bar lights for a stop: its own, or every one from its first to its last. */
export function litMoments(stop: SkyStop): DayMoment[] {
  if (!stop.span) return stop.moments;
  const at = stop.moments.map((moment) => DAY_TIMES.findIndex((time) => time.key === moment));
  const first = Math.min(...at);
  const last = Math.max(...at);
  return DAY_TIMES.slice(first, last + 1).map((time) => time.key);
}

/** The colour a stop is marked with: its first time's sky. */
export const skyStopColor = (stop: SkyStop) => DAY_TIMES.find((time) => time.key === stop.moments[0])?.color ?? DAY_TIMES[0].color;

/** The thread's two names, and the two sides of the sky, as the sky shows them. */
export const SKY_WORDS = { white: "White thread", black: "Black thread", east: "East", west: "West" } as const;

/** Every English word the skies can show, for the translation catalogs. */
export function daySkyText(): string[] {
  const text = new Set<string>(Object.values(SKY_WORDS));
  DAY_TIMES.forEach((time) => text.add(time.name));
  for (const stop of SKY_STOPS) {
    if (stop.title) text.add(stop.title);
    text.add(stop.when);
    text.add(stop.scene.caption);
    stop.scene.sources.forEach((source) => text.add(source.reference));
    stop.scene.marks?.forEach((mark) => text.add(mark.label));
  }
  return [...text];
}
