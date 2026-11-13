jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { DAY_SKY_LESSONS } from "../data/daySky";
import { hajjMapForLesson } from "../data/hajjMap";
import { MONTHS, MOON_LESSONS, MOON_SCENES, MOON_WORDS, moonForLesson, moonSkyText, type MoonScene } from "../data/moonSky";
import { journeyForLesson } from "../data/seerahMap";
import { surahNumberForTitle } from "../data/surahPictures";
import { setActiveLanguage, t } from "../i18n";
import { highlightUrl } from "../services/sourceLink";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";
import { MoonCard } from "../ui/journey/MoonCard";
import { MOON_STILL_AT, MoonSky } from "../ui/journey/MoonSky";
import {
  MONTH_DAYS,
  MOON_DURATION,
  STAGE_AGES,
  STAGE_AT,
  coursesMoonP,
  fitsTwoLines,
  ibrahimMoonP,
  ibrahimStarAt,
  litShare,
  monthCellLook,
  monthCells,
  moonClockAt,
  moonHour,
  moonLayout,
  moonLitPath,
  newMoonAt,
  newMoonShown,
  nightMoonAt,
  orbitDots,
  splitAt,
  stageShown,
  stagesMoonAt,
  textWidth,
  type Rect
} from "../ui/journey/moonArt";
import { skyFrame, sunAt, type SkyFrame } from "../ui/journey/skyArt";
import type { Lesson, LessonSource } from "../types";

// The moon's frame on phones 320, 360, 375, 390 and 412 px wide, on a lesson's first page; and on the gallery's wall.
const FRAMES = [
  [292, 178],
  [332, 201],
  [347, 209],
  [362, 271],
  [384, 287],
  [360, 270]
];
const LANGUAGES = ["en", "bn", "ur", "ar"] as const;
const scene = (id: string) => MOON_SCENES.find((each) => each.id === id)!;
const overlap = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

/** What a lesson says, from its title to its questions. */
function lessonText(lesson: Lesson) {
  return [
    lesson.title,
    lesson.intro,
    lesson.learnLine,
    lesson.quote?.text,
    ...(lesson.learnFacts ?? []),
    lesson.explanationContent,
    lesson.keyTakeaway,
    lesson.storyMoment,
    ...lesson.challenges.map((challenge) => challenge.prompt)
  ]
    .filter(Boolean)
    .join(" ");
}

/** Every source a lesson gives, for its page and for its questions. */
function lessonSources(lesson: Lesson): LessonSource[] {
  return [lesson.learnSource, ...lesson.sources, ...(lesson.learnDeeper?.sources ?? []), ...lesson.challenges.map((challenge) => challenge.source)].filter(Boolean) as LessonSource[];
}

// What a lesson must speak of to open on each sky.
const ABOUT: Record<string, RegExp[]> = {
  "moon-split": [/moon/i, /split/i],
  "moon-new": [/crescent|new moon|lunar month/i],
  "moon-stages": [/moon/i, /stage|phase|full|date stalk/i],
  "moon-ibrahim": [/Ibrahim/, /star/i, /moon/i, /sun/i],
  "moon-courses": [/sun/i, /moon/i],
  "months-year": [/twelve months|sacred months/i],
  "months-muharram": [/Muharram/],
  "months-shaban": [/Sha'ban/],
  "months-ramadan": [/Ramadan/, /Quran/]
};

const SOURCES: Record<string, string[]> = {
  "moon-split": ["Quran 54:1", "Sahih al-Bukhari 3868", "Sahih Muslim 2800a"],
  "moon-new": ["Quran 2:189", "Sahih al-Bukhari 1909"],
  "moon-stages": ["Quran 36:39", "Tafsir Ibn Kathir 36:39"],
  "moon-ibrahim": ["Quran 6:76", "Quran 6:77", "Quran 6:78"],
  "moon-courses": ["Quran 21:33", "Quran 36:40"],
  "months-year": ["Quran 9:36", "Sahih al-Bukhari 4662"],
  "months-muharram": ["Sahih Muslim 1163a"],
  "months-shaban": ["Sahih al-Bukhari 1969"],
  "months-ramadan": ["Quran 2:185"]
};

/** What of a sky's moon, star and sun can be seen at `t`, each as a box, above the sand (which hides what is below). */
function bodiesAt(each: MoonScene, frame: SkyFrame, t: number): Rect[] {
  const above = (r: Rect): Rect[] => {
    const bottom = Math.min(r.y + r.h, frame.horizon);
    return bottom > r.y ? [{ ...r, h: bottom - r.y }] : [];
  };
  // The moon's disc is 0.68 of its picture's width.
  const disc = (x: number, y: number, size: number, share = 0.68): Rect => ({ x: x - (size * share) / 2, y: y - (size * share) / 2, w: size * share, h: size * share });
  const sun = (hour: number) => {
    const at = sunAt(frame, hour);
    return above({ x: at.x - frame.sunR, y: at.y - frame.sunR, w: frame.sunR * 2, h: frame.sunR * 2 });
  };
  const nightMoon = (p: number) => {
    if (p <= -0.08 || p >= 1.08) return [];
    const at = nightMoonAt(frame, p);
    return above(disc(at.x, at.y, at.size));
  };
  if (each.kind === "split") {
    const at = splitAt(frame);
    const r = at.size * 0.34;
    if (t < 0.36) return [disc(at.whole.x, at.whole.y, at.size)];
    // The halves part along a line from the whole moon's place to their own: every place on it, however they ease.
    const e = Math.min(1, (t - 0.36) / 0.34);
    return (["left", "right"] as const).map((side) => {
      const x = at.whole.x + (at[side].x - at.whole.x) * e;
      const y = at.whole.y + (at[side].y - at.whole.y) * e;
      return { x: side === "left" ? x - r : x, y: y - r, w: r, h: r * 2 };
    });
  }
  if (each.kind === "newMoon") {
    const hour = moonHour("newMoon", t);
    const moon = newMoonAt(frame, hour);
    return [...(newMoonShown(hour) > 0 ? above(disc(moon.x, moon.y, moon.size)) : []), ...sun(hour)];
  }
  if (each.kind === "stages") {
    const moon = stagesMoonAt(frame);
    return [disc(moon.x, moon.y, moon.size)];
  }
  if (each.kind === "ibrahim") {
    const star = ibrahimStarAt(frame, t);
    return [...(t > 0.01 && t < 0.31 ? above(disc(star.x, star.y, star.size, 0.8)) : []), ...nightMoon(ibrahimMoonP(t)), ...sun(moonHour("ibrahim", t))];
  }
  if (each.kind === "courses") return [...nightMoon(coursesMoonP(t)), ...sun(moonHour("courses", t))];
  return [];
}

describe("the moon in the sky", () => {
  test("every lesson with a moon is a real lesson about it, and opens on it", () => {
    expect(Object.keys(MOON_LESSONS).length).toBe(44);
    for (const [nodeId, id] of Object.entries(MOON_LESSONS)) {
      const lesson = LESSONS_BY_ID[`lesson-${nodeId}`] as Lesson | undefined;
      expect([nodeId, Boolean(lesson)]).toEqual([nodeId, true]);
      const found = moonForLesson(lesson!)!;
      expect([nodeId, found?.scene.id, found?.lessonSlug]).toEqual([nodeId, id, nodeId]);
      const text = lessonText(lesson!);
      for (const about of ABOUT[id]) expect([nodeId, id, String(about), about.test(text)]).toEqual([nodeId, id, String(about), true]);
      // No other picture takes its place: no map of his life ﷺ or of Hajj, no day's sky, and no surah's own cover.
      expect([nodeId, journeyForLesson(lesson!), hajjMapForLesson(lesson!), nodeId in DAY_SKY_LESSONS, surahNumberForTitle(lesson!.title)]).toEqual([nodeId, undefined, undefined, false, undefined]);
    }
    // Every sky has its lessons; the others keep their photo.
    const used = new Set(Object.values(MOON_LESSONS));
    for (const each of MOON_SCENES) expect([each.id, used.has(each.id)]).toEqual([each.id, true]);
    expect(moonForLesson({ nodeId: "deep-yasin2-the-laden-ship" })).toBeUndefined();
    expect(moonForLesson({ nodeId: "prayer-times-fajr" })).toBeUndefined();
  });

  test("every sky says where it comes from: the Quran, a sahih hadith the course teaches, or Ibn Kathir at the lesson's own words", () => {
    expect(Object.fromEntries(MOON_SCENES.map((each) => [each.id, each.sources.map((source) => source.reference)]))).toEqual(SOURCES);
    const taught = new Set((Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lessonSources(lesson).map((source) => source.url.split("#")[0])));
    for (const each of MOON_SCENES) {
      for (const source of each.sources) {
        const match = /^(Sahih al-Bukhari|Sahih Muslim|Quran|Tafsir Ibn Kathir) (\S+)$/.exec(source.reference);
        expect([source.reference, Boolean(match)]).toEqual([source.reference, true]);
        const [, book, number] = match!;
        if (book === "Quran") expect(source.url).toBe(`https://quran.com/${number.replace(":", "/")}`);
        else if (book === "Tafsir Ibn Kathir") expect(source.url.startsWith(`https://quran.com/${number}/tafsirs/en-tafisr-ibn-kathir#:~:text=`)).toBe(true);
        else {
          const url = `https://sunnah.com/${book === "Sahih Muslim" ? "muslim" : "bukhari"}:${number}`;
          expect(source.url).toBe(url);
          // The same hadith, by the same number, as a lesson already gives (and its sources were checked line by line).
          expect([source.reference, taught.has(url)]).toEqual([source.reference, true]);
        }
      }
    }
    // Ibn Kathir on 36:39 opens at the words the lesson on that ayah lights: the moon full on the fourteenth night.
    const lesson = LESSONS_BY_ID["lesson-deep-yasin2-stages-of-the-moon"] as Lesson;
    const kathir = lessonSources(lesson).find((source) => source.reference === "Tafsir Ibn Kathir 36:39")!;
    expect(kathir.highlight).toBe("until it becomes full on the fourteenth night of the month");
    expect(scene("moon-stages").sources[1].url).toBe(highlightUrl(kathir.url, kathir.highlight));
  });

  test("the twelve months: four of them sacred, and each month's lesson lights its own month", () => {
    expect(MONTHS.map((month) => month.name)).toEqual([
      "Muharram",
      "Safar",
      "Rabi al-Awwal",
      "Rabi al-Akhir",
      "Jumada al-Ula",
      "Jumada al-Akhirah",
      "Rajab",
      "Sha'ban",
      "Ramadan",
      "Shawwal",
      "Dhul-Qa'dah",
      "Dhul-Hijjah"
    ]);
    // Sahih al-Bukhari 4662: three in a row, Dhul-Qa'dah, Dhul-Hijjah and Muharram, and Rajab.
    expect(MONTHS.filter((month) => month.sacred).map((month) => month.name)).toEqual(["Muharram", "Rajab", "Dhul-Qa'dah", "Dhul-Hijjah"]);
    const months = MOON_SCENES.filter((each) => each.kind === "months");
    expect(months.map((each) => [each.id, each.month])).toEqual([
      ["months-year", undefined],
      ["months-muharram", 0],
      ["months-shaban", 7],
      ["months-ramadan", 8]
    ]);
    for (const each of months.filter((one) => one.month !== undefined)) expect(each.caption).toContain(MONTHS[each.month!].name);
    for (const each of MOON_SCENES.filter((one) => one.kind !== "months")) expect(each.month).toBeUndefined();
  });

  test("the moon's shape on each night: lit on the right as it grows, full on the fourteenth night, lit on the left as it wanes", () => {
    expect(litShare(0)).toBeCloseTo(0, 5);
    expect(litShare(MONTH_DAYS / 2)).toBeCloseTo(1, 5);
    expect(litShare(MONTH_DAYS / 4)).toBeCloseTo(0.5, 5);
    // Each path: from the top down one edge of the moon (its sweep says which side is lit), then back up the edge of
    // the light, which bulges toward the lit side while the moon is a crescent, and past the middle once it is more.
    const parts = (age: number) => {
      const match = /^M(\S+) (\S+)A(\S+) (\S+) 0 0 ([01]) (\S+) (\S+)A(\S+) (\S+) 0 0 ([01]) (\S+) (\S+)Z$/.exec(moonLitPath(50, 50, 30, age));
      expect([age, Boolean(match)]).toEqual([age, true]);
      return { side: match![5] === "1" ? "right" : "left", edge: Number(match![8]), bulges: match![10] === "0" ? "right" : "left" };
    };
    expect(parts(3)).toMatchObject({ side: "right", bulges: "right" });
    expect(parts(10)).toMatchObject({ side: "right", bulges: "left" });
    expect(parts(MONTH_DAYS / 2)).toMatchObject({ side: "right", edge: 30, bulges: "left" });
    expect(parts(20)).toMatchObject({ side: "left", bulges: "right" });
    expect(parts(26)).toMatchObject({ side: "left", bulges: "left" });
    expect(parts(MONTH_DAYS / 4).edge).toBeLessThan(0.5);
    // The stages: from a thin new moon, to full in the middle, to the old date stalk, a thin moon waning.
    expect(litShare(STAGE_AGES[0])).toBeLessThan(0.1);
    expect(litShare(STAGE_AGES[6])).toBeGreaterThan(0.99);
    expect(STAGE_AT[6]).toBe(0.5);
    const last = STAGE_AGES[STAGE_AGES.length - 1];
    expect(litShare(last)).toBeLessThan(0.1);
    expect(last).toBeGreaterThan(MONTH_DAYS / 2);
    expect([...STAGE_AGES].sort((a, b) => a - b)).toEqual(STAGE_AGES);
    expect([...STAGE_AT].sort((a, b) => a - b)).toEqual(STAGE_AT);
    // One night fades into the next: at every moment the stages showing add up to one moon.
    for (let t = 0; t <= 1; t += 0.01) {
      const sum = STAGE_AGES.reduce((total, _, index) => total + stageShown(index, t), 0);
      expect([t, Math.abs(sum - 1) < 1e-9]).toEqual([t, true]);
    }
    // Each word of the stages shows while its night does.
    const { words } = moonLayout(scene("moon-stages"), 362, 270, (text) => text);
    const window = (key: string) => words.find((word) => word.key === key)!;
    expect(window("newMoon").from <= STAGE_AT[0] && STAGE_AT[0] <= window("newMoon").to).toBe(true);
    expect(window("full").from <= STAGE_AT[6] && STAGE_AT[6] <= window("full").to).toBe(true);
    expect(window("stalk").from <= STAGE_AT[12] && STAGE_AT[12] <= window("stalk").to).toBe(true);
  });

  test("the skies' clocks: the new moon after sunset, Ibrahim's star, moon and sun each setting in turn, and the sun and the moon each on its way", () => {
    // The new moon shows once the sun has gone down, low in the west.
    expect(moonHour("newMoon", 0)).toBeLessThan(18);
    expect(newMoonShown(moonHour("newMoon", 0))).toBe(0);
    expect(newMoonShown(moonHour("newMoon", 1))).toBe(1);
    const frame = skyFrame(362, 270);
    const moon = newMoonAt(frame, moonHour("newMoon", 1));
    expect(moon.x).toBeGreaterThan(frame.cx);
    expect(moon.y).toBeLessThan(frame.horizon);
    // Ibrahim: the star sets first, then the moon rises and sets, then the sun rises and sets.
    expect(ibrahimStarAt(frame, 0.29).y).toBeGreaterThan(frame.horizon);
    expect(ibrahimMoonP(0.31)).toBeCloseTo(0, 5);
    expect(ibrahimMoonP(0.56)).toBeCloseTo(1, 5);
    expect(moonHour("ibrahim", 0.66) % 24).toBeCloseTo(6.1, 1);
    expect(moonHour("ibrahim", 0.94) % 24).toBeCloseTo(17.9, 1);
    // The sun by day, the moon by night, each drawing its own way as it goes: the moon's inside the sun's.
    expect(coursesMoonP(moonClockAt("courses", 18))).toBeCloseTo(0, 5);
    expect(coursesMoonP(moonClockAt("courses", 30))).toBeCloseTo(1, 5);
    const sun = orbitDots(frame, "sun");
    const night = orbitDots(frame, "moon");
    expect([sun.length, night.length]).toEqual([18, 18]);
    for (const dots of [sun, night]) for (const [index, dot] of dots.entries()) if (index > 0) expect(dot.at).toBeGreaterThan(dots[index - 1].at);
    expect(sun[sun.length - 1].at).toBeLessThan(night[0].at);
    expect(Math.min(...night.map((dot) => dot.y))).toBeGreaterThan(Math.min(...sun.map((dot) => dot.y)));
    // A still sky (reduce motion, Calm mode) shows its end, or, for the skies through a day, the moon high in its night.
    expect(MOON_STILL_AT).toEqual({ split: 1, newMoon: 1, stages: 1, ibrahim: 0.44, courses: 0.78, months: 1 });
    expect(ibrahimMoonP(MOON_STILL_AT.ibrahim)).toBeGreaterThan(0.4);
    expect(coursesMoonP(MOON_STILL_AT.courses)).toBeGreaterThan(0.4);
  });

  test("every word in the skies is translated in every language", () => {
    const words = [...moonSkyText(), "Source", "Plays the sky again"];
    expect(words.length).toBeGreaterThan(35);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: words.filter((each) => !catalog[each]) }).toEqual({ language, missing: [] });
    }
  });

  test("on every phone, in every language, each word stays in the sky, covers no word shown with it, and never the moon, the star or the sun", () => {
    for (const language of LANGUAGES) {
      const say = (text: string) => t(text, undefined, language);
      for (const each of MOON_SCENES) {
        for (const [width, height] of FRAMES) {
          const where = `${language} ${each.id} ${width}x${height}`;
          const { frame, words, glyphs } = moonLayout(each, width, height, say);
          for (const [index, word] of words.entries()) {
            const r = word.rect;
            expect([where, word.text, r.x >= 0 && r.y >= 0 && r.x + r.w <= width && r.y + r.h <= height]).toEqual([where, word.text, true]);
            for (const other of words.slice(index + 1)) {
              const together = word.from < other.to && other.from < word.to;
              if (together) expect([where, word.text, other.text, overlap(r, other.rect)]).toEqual([where, word.text, other.text, 0]);
            }
            for (const glyph of glyphs) expect([where, word.text, overlap(r, glyph)]).toEqual([where, word.text, 0]);
            // Through all the time it shows, fading in included.
            for (let t = Math.max(0, word.from - 0.03); t <= Math.min(1, word.to); t += 0.005) {
              for (const body of bodiesAt(each, frame, t)) expect([where, word.text, Number(t.toFixed(3)), overlap(r, body)]).toEqual([where, word.text, Number(t.toFixed(3)), 0]);
            }
          }
        }
      }
    }
  });

  test("every month's name fits its cell in two lines, in every language and on every phone", () => {
    // Measured as the browser draws them: "Jumada al-Akhirah" needs two lines, broken after "Jumada".
    expect(textWidth("al-Akhirah", 11)).toBeGreaterThan(55);
    expect(fitsTwoLines("Jumada al-Akhirah", 60, 11)).toBe(true);
    expect(fitsTwoLines("Jumada al-Akhirah", 50, 11)).toBe(false);
    expect(fitsTwoLines("Dhul-Qa'dah", 45, 11)).toBe(true);
    for (const language of LANGUAGES) {
      for (const [width, height] of FRAMES) {
        for (const cell of monthCells(skyFrame(width, height))) {
          const look = monthCellLook(cell.rect);
          const name = t(cell.name, undefined, language);
          const where = `${language} ${width}x${height} ${cell.name} (${name})`;
          expect([where, fitsTwoLines(name, look.text, look.font)]).toEqual([where, true]);
          // Two lines of it, with its moon, inside the cell.
          expect([where, look.line * 2 <= cell.rect.h - look.inset * 2 && look.moon <= cell.rect.h - look.inset * 2]).toEqual([where, true]);
          expect([where, cell.rect.x >= 0 && cell.rect.y >= 0 && cell.rect.x + cell.rect.w <= width && cell.rect.y + cell.rect.h <= height]).toEqual([where, true]);
        }
      }
    }
  });
});

describe("the moon on screen", () => {
  afterEach(() => {
    jest.useRealTimers();
    setActiveLanguage("en");
  });

  test("each sky draws what its sources describe", async () => {
    const draw = (id: string) => render(<MoonSky scene={scene(id)} width={360} height={270} still />);
    await draw("moon-split");
    expect(screen.getByTestId("moon-sky-whole")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-half-left")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-half-right")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-hira")).toBeTruthy();
    expect(screen.getByTestId("moon-word-hira")).toHaveTextContent(MOON_WORDS.hira);
    expect(screen.queryByTestId("moon-sky-sun")).toBeNull();
    await draw("moon-new");
    expect(screen.getByTestId("moon-sky-new-moon")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-sun")).toBeTruthy();
    expect(screen.getByTestId("moon-word-newMoon")).toHaveTextContent("The new moon");
    expect(screen.getByTestId("moon-word-west")).toHaveTextContent("West");
    await draw("moon-stages");
    expect(screen.getAllByTestId(/^moon-sky-stage-/)).toHaveLength(STAGE_AGES.length);
    expect(screen.getByTestId("moon-word-stalk")).toHaveTextContent("Like an old date stalk");
    await draw("moon-ibrahim");
    expect(screen.getByTestId("moon-sky-star")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-moon")).toBeTruthy();
    expect(screen.getByTestId("moon-sky-sun")).toBeTruthy();
    for (const key of ["star", "moon", "sun"]) expect(screen.getByTestId(`moon-word-${key}`)).toBeTruthy();
    await draw("moon-courses");
    expect(screen.getAllByTestId(/^moon-sky-orbit-sun-/)).toHaveLength(18);
    expect(screen.getAllByTestId(/^moon-sky-orbit-moon-/)).toHaveLength(18);
    expect(screen.getByTestId("moon-sky-moon")).toBeTruthy();
    expect(screen.queryByTestId("moon-sky-star")).toBeNull();
    await draw("months-shaban");
    expect(screen.getAllByTestId(/^moon-month-/)).toHaveLength(12);
    for (const index of [0, 6, 10, 11]) expect(screen.getByTestId(new RegExp(`^moon-month-${index}-sacred`))).toBeTruthy();
    expect(screen.getByTestId("moon-month-7-mine")).toHaveTextContent("Sha'ban");
    await draw("months-year");
    expect(screen.queryByTestId(/-mine$/)).toBeNull();
  });

  test("the months are named in the learner's language", async () => {
    setActiveLanguage("ar");
    await render(<MoonSky scene={scene("months-year")} width={332} height={201} still />);
    expect(screen.getByTestId("moon-month-10-sacred")).toHaveTextContent("ذو القعدة");
    expect(screen.getByTestId("moon-month-5")).toHaveTextContent("جمادى الآخرة");
    setActiveLanguage("bn");
    await render(<MoonSky scene={scene("moon-split")} width={332} height={201} still />);
    expect(screen.getByTestId("moon-word-hira")).toHaveTextContent("হেরা");
  });

  test("a sky plays, then says it is drawn; with less motion it is drawn at once", async () => {
    jest.useFakeTimers();
    const drawn = jest.fn();
    await render(<MoonSky scene={scene("moon-split")} width={360} height={270} delay={300} onDrawn={drawn} />);
    await act(async () => jest.advanceTimersByTime(300 + MOON_DURATION.split));
    expect(drawn).not.toHaveBeenCalled();
    await act(async () => jest.advanceTimersByTime(300));
    expect(drawn).toHaveBeenCalledTimes(1);
    const still = jest.fn();
    await render(<MoonSky scene={scene("moon-ibrahim")} width={360} height={270} still onDrawn={still} />);
    await act(async () => jest.advanceTimersByTime(1));
    expect(still).toHaveBeenCalledTimes(1);
  });

  test("a moon lesson's first page opens on its sky instead of its photo, with what it shows and its sources", async () => {
    const lesson = LESSONS_BY_ID["lesson-deep-yasin2-stages-of-the-moon"] as Lesson;
    const opened = jest.fn();
    await render(
      <LearnCard page="start" title={lesson.title} line={lesson.learnLine ?? ""} moon={moonForLesson(lesson)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} onOpenSource={opened} />
    );
    expect(screen.getByTestId("moon-card")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.queryByTestId("sky-card")).toBeNull();
    await fireEvent(screen.getByTestId("moon-card-frame"), "layout", { nativeEvent: { layout: { width: 362, height: 270 } } });
    expect(screen.getByTestId("moon-sky")).toBeTruthy();
    expect(screen.getByTestId("moon-caption")).toHaveTextContent(scene("moon-stages").caption);
    expect(screen.getByText("Source")).toBeTruthy();
    await fireEvent.press(screen.getByText("Tafsir Ibn Kathir 36:39"));
    expect(opened).toHaveBeenCalledWith(scene("moon-stages").sources[1].url);
    // Tap it to watch it again.
    await fireEvent.press(screen.getByTestId("moon-replay"));
    await fireEvent.press(screen.getByTestId("moon-card"));
    expect(screen.getByTestId("moon-sky")).toBeTruthy();
    // The next pages do not show it again.
    await render(<LearnCard page="facts" title={lesson.title} line={lesson.learnLine ?? ""} facts={["Full on the fourteenth night"]} moon={moonForLesson(lesson)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} />);
    expect(screen.queryByTestId("moon-card")).toBeNull();
  });

  test("the moon card on its own: the moon split, with its three sources", async () => {
    await render(<MoonCard moon={moonForLesson({ nodeId: "deep-qamar1-the-moon-split" })!} />);
    await fireEvent(screen.getByTestId("moon-card-frame"), "layout", { nativeEvent: { layout: { width: 292, height: 178 } } });
    expect(screen.getByTestId("moon-sky-half-left")).toBeTruthy();
    for (const reference of SOURCES["moon-split"]) expect(screen.getByText(reference)).toBeTruthy();
    expect(screen.getByLabelText(scene("moon-split").caption)).toBeTruthy();
  });
});
