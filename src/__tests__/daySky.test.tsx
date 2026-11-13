jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { DAY_OF_PRAYER, DAY_SKY_LESSONS, DAY_TIMES, SKY_HOURS, SKY_STOPS, daySkyText, litMoments, skyForLesson } from "../data/daySky";
import { hajjMapForLesson } from "../data/hajjMap";
import { journeyForLesson } from "../data/seerahMap";
import { surahNumberForTitle } from "../data/surahPictures";
import { t } from "../i18n";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";
import { DayBar } from "../ui/journey/DayBar";
import { DayOfPrayerSheet } from "../ui/journey/DayOfPrayer";
import { DaySky, skyDuration } from "../ui/journey/DaySky";
import type { Rect } from "../ui/journey/JourneyMap";
import { skyLayout, sunAt, sunHeight, skyFrame, skyStars, starAt, starPole } from "../ui/journey/skyArt";
import type { Lesson } from "../types";

const stop = (id: string) => SKY_STOPS.find((each) => each.scene.id === id)!;
const end = (id: string) => stop(id).scene.to;
// The sky's frame on phones 320, 360, 375, 390 and 412 px wide: on a lesson's first page, and in the day of prayer.
const LESSON_FRAMES = [
  [292, 178],
  [332, 201],
  [347, 209],
  [362, 270],
  [384, 287]
];
const SHEET_FRAMES = [
  [288, 225],
  [328, 256],
  [343, 267],
  [358, 279],
  [380, 296]
];
const dayHourOf = (hour: number) => ((hour % 24) + 24) % 24;
const overlap = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
// The middle of the night, and where its last third begins: from sunset to the next dawn.
const MIDDLE = (SKY_HOURS.sunset + SKY_HOURS.nextDawn) / 2;
const LAST_THIRD = SKY_HOURS.sunset + ((SKY_HOURS.nextDawn - SKY_HOURS.sunset) * 2) / 3;

/** What a lesson says, from its title to its lines and its questions. */
function lessonText(lesson: Lesson) {
  return [lesson.title, lesson.intro, lesson.learnLine, lesson.quote?.text, ...(lesson.learnFacts ?? []), lesson.explanationContent, lesson.keyTakeaway, lesson.storyMoment, ...lesson.challenges.map((each) => each.prompt)]
    .filter(Boolean)
    .join(" ");
}

// What a lesson must speak of to open on each sky.
const ABOUT: Record<string, RegExp[]> = {
  "sky-five": [/prayer|salah/i],
  "sky-fajr": [/fajr|dawn/i],
  "sky-sunrise": [/sun ?rise|sun rose|sun has risen/i],
  "sky-duha": [/duha|forenoon/i],
  "sky-zuhr": [/zuhr|midday|noon|sun (has )?passed/i],
  "sky-cool": [/cool/i, /heat|hot/i],
  "sky-asr": [/asr|middle prayer/i],
  "sky-fajr-asr": [/fajr|dawn|before (the )?sun ?rise/i, /asr|before (the )?sun ?set|afternoon/i],
  "sky-arrow": [/maghrib/i],
  "sky-maghrib": [/maghrib/i],
  "sky-midnight": [/isha/i],
  "sky-isha-fajr": [/isha/i, /fajr/i],
  "sky-night-prayer": [/night|witr|tahajjud/i],
  "sky-stand-night": [/night/i],
  "sky-last-third": [/last third/i],
  "sky-sleep": [/sleep|bed|wak(e|ing)|lie down|lying down/i],
  "sky-qadr": [/qadr|thousand months|last ten|(that|this|which|odd) night/i],
  "sky-dawn-oath": [/dawn|fajr|night/i],
  "sky-twilight": [/twilight|shafaq|night/i],
  "sky-sun-oath": [/sun|day|night/i],
  "sky-duha-oath": [/forenoon|duha|morning|night/i],
  "sky-night-day": [/night/i, /day/i],
  "sky-shadows": [/shadow/i],
  "sky-workers": [/asr/i, /sunset/i],
  "sky-suhur": [/suhur|sahur|(eat|drink).*(dawn|fajr)/i],
  "sky-thread": [/thread/i],
  "sky-fast": [/fast/i],
  "sky-iftar": [/iftar|break(ing)? (the|your|their) fast|sun ?set|sun (has )?set/i]
};

// Each sky's sources, as its scene gives them.
const SOURCES: Record<string, string[]> = {
  "sky-fajr": ["Sahih Muslim 612d"],
  "sky-sunrise": ["Sahih Muslim 612d"],
  "sky-duha": ["Sahih Muslim 720", "Sahih Muslim 748a"],
  "sky-zuhr": ["Sahih al-Bukhari 547"],
  "sky-asr": ["Sahih al-Bukhari 550"],
  "sky-maghrib": ["Sahih al-Bukhari 561"],
  "sky-isha": ["Sahih Muslim 612d"],
  "sky-last-third": ["Sahih al-Bukhari 1145"],
  "sky-five": ["Sahih Muslim 612d"],
  "sky-cool": ["Sahih al-Bukhari 539"],
  "sky-arrow": ["Sahih al-Bukhari 559"],
  "sky-thread": ["Quran 2:187", "Sahih al-Bukhari 1916"],
  "sky-iftar": ["Sahih al-Bukhari 1954", "Sahih al-Bukhari 1956"],
  "sky-fast": ["Quran 2:187", "Sahih al-Bukhari 1954"],
  "sky-suhur": ["Sahih al-Bukhari 1921"],
  "sky-fajr-asr": ["Sahih al-Bukhari 554"],
  "sky-isha-fajr": ["Sahih Muslim 612d"],
  "sky-midnight": ["Sahih al-Bukhari 567"],
  "sky-night-prayer": ["Sahih al-Bukhari 1137", "Sahih al-Bukhari 998"],
  "sky-stand-night": ["Quran 73:2", "Quran 73:3", "Quran 73:4"],
  "sky-sleep": ["Quran 25:47"],
  "sky-qadr": ["Quran 97:3", "Quran 97:5"],
  "sky-dawn-oath": ["Quran 89:1", "Quran 89:4", "Quran 74:33", "Quran 74:34"],
  "sky-twilight": ["Quran 84:16", "Quran 84:17"],
  "sky-sun-oath": ["Quran 91:1", "Quran 91:4", "Quran 92:1", "Quran 92:2"],
  "sky-duha-oath": ["Quran 93:1", "Quran 93:2"],
  "sky-night-day": ["Quran 22:61", "Quran 25:62"],
  "sky-shadows": ["Quran 13:15", "Quran 16:48"],
  "sky-workers": ["Sahih al-Bukhari 557"]
};

describe("each prayer's time in the sky: its data", () => {
  test("the day of prayer plays one day in order, each sky beginning where the last one ended", () => {
    expect(DAY_TIMES.map((time) => time.key)).toEqual(["dawn", "sunrise", "forenoon", "midday", "afternoon", "sunset", "night", "lastThird"]);
    expect(DAY_OF_PRAYER.map((each) => [each.scene.id, each.title, each.moments])).toEqual([
      ["sky-fajr", "Fajr", ["dawn"]],
      ["sky-sunrise", "Sunrise", ["sunrise"]],
      ["sky-duha", "Duha", ["forenoon"]],
      ["sky-zuhr", "Zuhr", ["midday"]],
      ["sky-asr", "Asr", ["afternoon"]],
      ["sky-maghrib", "Maghrib", ["sunset"]],
      ["sky-isha", "Isha", ["night"]],
      ["sky-last-third", "The last third of the night", ["lastThird"]],
      ["sky-five", "The five prayers", ["dawn", "midday", "afternoon", "sunset", "night"]]
    ]);
    for (const [index, each] of DAY_OF_PRAYER.slice(1, 8).entries()) expect([each.scene.id, each.scene.from]).toEqual([each.scene.id, DAY_OF_PRAYER[index].scene.to]);
    const ids = SKY_STOPS.map((each) => each.scene.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const each of SKY_STOPS) expect([each.scene.id, each.scene.from < each.scene.to]).toEqual([each.scene.id, true]);
  });

  test("each sky ends in its prayer's time, as he ﷺ gave them", () => {
    // Fajr from the first light of dawn until the sun rises (Sahih Muslim 612d); then the sun is up.
    for (const id of ["sky-fajr", "sky-thread"]) expect([id, end(id) > SKY_HOURS.dawn && end(id) < SKY_HOURS.sunrise]).toEqual([id, true]);
    expect(end("sky-sunrise")).toBeGreaterThan(SKY_HOURS.sunrise);
    // Duha in the forenoon, once the sun is well up and before midday.
    expect(end("sky-duha") > SKY_HOURS.sunrise + 2 && end("sky-duha") < SKY_HOURS.midday).toBe(true);
    // Zuhr once the sun has passed its height (Sahih al-Bukhari 547), and Zuhr in the heat a while after it (539).
    expect(end("sky-zuhr")).toBeGreaterThan(SKY_HOURS.midday);
    expect(stop("sky-cool").scene.from < SKY_HOURS.midday && end("sky-cool") > end("sky-zuhr")).toBe(true);
    // Asr while the sun is still high and hot (550): past the afternoon's middle, the sun more than 30 degrees up.
    expect(end("sky-asr")).toBeGreaterThan(SKY_HOURS.midday + 3);
    expect(sunHeight(end("sky-asr"))).toBeGreaterThan(30);
    // Maghrib once the sun has gone down (561), and the arrow while it is still light (559): before the twilight goes.
    for (const id of ["sky-maghrib", "sky-arrow"]) expect([id, end(id) > SKY_HOURS.sunset && end(id) < SKY_HOURS.dusk]).toEqual([id, true]);
    const frame = skyFrame(360, 270);
    expect(sunAt(frame, end("sky-maghrib")).y).toBeGreaterThan(frame.horizon);
    // Isha once the twilight has gone, until the middle of the night (612d); one night, it waited till the middle (567).
    expect(end("sky-isha") > SKY_HOURS.dusk && end("sky-isha") < MIDDLE).toBe(true);
    expect(Math.abs(end("sky-midnight") - MIDDLE)).toBeLessThan(0.1);
    // The last third of the night (1145), and suhur in it, up to Fajr (1921).
    expect(end("sky-last-third") > LAST_THIRD && end("sky-last-third") < SKY_HOURS.nextDawn).toBe(true);
    expect(stop("sky-suhur").scene.from > LAST_THIRD && end("sky-suhur") > SKY_HOURS.nextDawn).toBe(true);
    // The night prayer from Isha, its witr before dawn (998).
    expect(stop("sky-night-prayer").scene.from).toBe(end("sky-isha"));
    expect(end("sky-night-prayer") > LAST_THIRD && end("sky-night-prayer") < SKY_HOURS.nextDawn).toBe(true);
    // Standing at night, from Isha into the last third, before dawn (Quran 73:2-4).
    expect(stop("sky-stand-night").scene.from).toBe(end("sky-isha"));
    expect(end("sky-stand-night") > LAST_THIRD && end("sky-stand-night") < SKY_HOURS.nextDawn).toBe(true);
    // Sleep and waking: from before sunset, through the night, to the next day's sunrise (25:47).
    expect(stop("sky-sleep").scene.from < SKY_HOURS.sunset && end("sky-sleep") > 24 + SKY_HOURS.sunrise).toBe(true);
    // Laylat al-Qadr from sunset, peace until dawn rises (97:5): it ends once dawn has come, before the sun is up.
    expect(stop("sky-qadr").scene.from > SKY_HOURS.sunset && end("sky-qadr") > SKY_HOURS.nextDawn && end("sky-qadr") < 24 + SKY_HOURS.sunrise).toBe(true);
    // The Quran's oaths: the night leaving and the dawn brightening (89:1, 89:4, 74:33-34), from the last third of the
    // night until dawn has come, before the sun is up; the twilight from before sunset, its glow still in the west as
    // the night draws in (84:16-17); the sun high in the forenoon, through the day, until the night has covered it
    // (91:1-4, 92:1-2); and the still night until the forenoon (93:1-2).
    expect(stop("sky-dawn-oath").scene.from > LAST_THIRD && end("sky-dawn-oath") > SKY_HOURS.nextDawn && end("sky-dawn-oath") < 24 + SKY_HOURS.sunrise).toBe(true);
    expect(stop("sky-twilight").scene.from < SKY_HOURS.sunset && end("sky-twilight") > SKY_HOURS.sunset + 0.5 && end("sky-twilight") < SKY_HOURS.dusk).toBe(true);
    expect(stop("sky-sun-oath").scene.from > SKY_HOURS.sunrise + 2 && stop("sky-sun-oath").scene.from < SKY_HOURS.midday && end("sky-sun-oath") > SKY_HOURS.dusk).toBe(true);
    expect(stop("sky-duha-oath").scene.from > SKY_HOURS.dusk && stop("sky-duha-oath").scene.from < MIDDLE).toBe(true);
    expect(end("sky-duha-oath") > 24 + SKY_HOURS.sunrise + 2 && end("sky-duha-oath") < 24 + SKY_HOURS.midday).toBe(true);
    // Night and day in turn: one whole turn, from a day to the next (22:61, 25:62).
    expect(end("sky-night-day") - stop("sky-night-day").scene.from).toBe(24);
    // The shadows from sunrise to sunset, while the sun is up: long to the west in the morning, long to the east in the
    // evening (13:15, 16:48).
    expect(stop("sky-shadows").scene.from > SKY_HOURS.sunrise && end("sky-shadows") < SKY_HOURS.sunset).toBe(true);
    for (const hour of [stop("sky-shadows").scene.from, end("sky-shadows")]) expect([hour, sunHeight(hour) > 4 && sunHeight(hour) < 15]).toEqual([hour, true]);
    // Our time from Asr until sunset (Sahih al-Bukhari 557): Asr's name comes in at its own time.
    expect(stop("sky-workers").scene.from < end("sky-asr") && end("sky-workers") > SKY_HOURS.sunset && end("sky-workers") < SKY_HOURS.dusk).toBe(true);
    expect(stop("sky-workers").scene.marks!.map((mark) => [mark.label, mark.hour])).toEqual([["Asr", end("sky-asr")]]);
    // The fast from the first light of dawn until the sun has set (Quran 2:187, 1954); iftar as the sun sets.
    expect(stop("sky-fast").scene.from <= SKY_HOURS.dawn && end("sky-fast") > SKY_HOURS.sunset).toBe(true);
    expect(stop("sky-iftar").scene.from < SKY_HOURS.sunset && end("sky-iftar") > SKY_HOURS.sunset).toBe(true);
    // The names of the prayers come in when the day reaches each one, at the same time as in its own sky.
    for (const each of SKY_STOPS) for (const mark of each.scene.marks ?? []) expect([each.scene.id, mark.label, mark.hour >= each.scene.from && mark.hour <= each.scene.to]).toEqual([each.scene.id, mark.label, true]);
    expect(stop("sky-five").scene.marks!.map((mark) => [mark.label, mark.hour])).toEqual([
      ["Fajr", end("sky-fajr")],
      ["Zuhr", end("sky-zuhr")],
      ["Asr", end("sky-asr")],
      ["Maghrib", end("sky-maghrib")],
      ["Isha", end("sky-isha")]
    ]);
    expect(stop("sky-fajr-asr").scene.marks!.map((mark) => mark.label)).toEqual(["Fajr", "Asr"]);
    expect(stop("sky-isha-fajr").scene.marks!.map((mark) => [mark.label, mark.hour > SKY_HOURS.nextDawn || mark.hour < MIDDLE])).toEqual([
      ["Isha", true],
      ["Fajr", true]
    ]);
  });

  test("the bar lights each sky's own times; the fast every one from dawn to sunset", () => {
    expect(litMoments(stop("sky-fast"))).toEqual(["dawn", "sunrise", "forenoon", "midday", "afternoon", "sunset"]);
    expect(litMoments(stop("sky-night-prayer"))).toEqual(["night", "lastThird"]);
    expect(litMoments(stop("sky-suhur"))).toEqual(["lastThird", "dawn"]);
    expect(litMoments(stop("sky-isha-fajr"))).toEqual(["night", "dawn"]);
    expect(litMoments(stop("sky-cool"))).toEqual(["midday"]);
    expect(litMoments(stop("sky-stand-night"))).toEqual(["night", "lastThird"]);
    expect(litMoments(stop("sky-sleep"))).toEqual(["night", "sunrise"]);
    expect(litMoments(stop("sky-qadr"))).toEqual(["night", "lastThird", "dawn"]);
    expect(litMoments(stop("sky-dawn-oath"))).toEqual(["lastThird", "dawn"]);
    expect(litMoments(stop("sky-twilight"))).toEqual(["sunset", "night"]);
    expect(litMoments(stop("sky-sun-oath"))).toEqual(["forenoon", "midday", "afternoon", "sunset", "night"]);
    expect(litMoments(stop("sky-duha-oath"))).toEqual(["night", "lastThird", "dawn", "sunrise", "forenoon"]);
    expect([...litMoments(stop("sky-night-day"))].sort()).toEqual(DAY_TIMES.map((time) => time.key).sort());
    expect(litMoments(stop("sky-shadows"))).toEqual(["sunrise", "forenoon", "midday", "afternoon", "sunset"]);
    expect(litMoments(stop("sky-workers"))).toEqual(["afternoon", "sunset"]);
  });

  test("every lesson with a sky is a real lesson about that time, and opens on it", () => {
    expect(Object.keys(DAY_SKY_LESSONS).length).toBe(233);
    for (const [nodeId, id] of Object.entries(DAY_SKY_LESSONS)) {
      const lesson = LESSONS_BY_ID[`lesson-${nodeId}`] as Lesson | undefined;
      expect([nodeId, Boolean(lesson)]).toEqual([nodeId, true]);
      const found = skyForLesson(lesson!)!;
      expect([nodeId, found?.scene.id, found?.lessonSlug]).toEqual([nodeId, id, nodeId]);
      const text = lessonText(lesson!);
      for (const about of ABOUT[id]) expect([nodeId, id, String(about), about.test(text)]).toEqual([nodeId, id, String(about), true]);
      // No other picture takes its place: no map of his life ﷺ or of Hajj, and no surah's own cover.
      expect([nodeId, journeyForLesson(lesson!), hajjMapForLesson(lesson!), surahNumberForTitle(lesson!.title)]).toEqual([nodeId, undefined, undefined, undefined]);
    }
    // Every sky only a lesson opens on has its lessons.
    const used = new Set(Object.values(DAY_SKY_LESSONS));
    for (const each of SKY_STOPS.filter((sky) => !DAY_OF_PRAYER.includes(sky))) expect([each.scene.id, used.has(each.scene.id)]).toEqual([each.scene.id, true]);
  });

  test("the other lessons keep their photo", () => {
    const prayer = (Object.values(LESSONS_BY_ID) as Lesson[]).filter((lesson) => lesson.branchId?.startsWith("prayer-") && !(lesson.nodeId in DAY_SKY_LESSONS));
    expect(prayer.length).toBeGreaterThan(50);
    for (const lesson of prayer) expect([lesson.nodeId, skyForLesson(lesson)]).toEqual([lesson.nodeId, undefined]);
    expect(skyForLesson({ nodeId: "hajj-major-stations-arafah" })).toBeUndefined();
  });

  test("every sky says where it comes from: a sahih hadith or the Quran, with its link", () => {
    expect(Object.fromEntries(SKY_STOPS.map((each) => [each.scene.id, each.scene.sources.map((source) => source.reference)]))).toEqual(SOURCES);
    for (const { scene } of SKY_STOPS) {
      for (const source of scene.sources) {
        const match = /^(Sahih al-Bukhari|Sahih Muslim|Quran) (\S+)$/.exec(source.reference);
        expect([source.reference, Boolean(match)]).toEqual([source.reference, true]);
        const number = match![2].replace(":", "/");
        const site = match![1] === "Quran" ? `https://quran.com/${number}` : `https://sunnah.com/${match![1] === "Sahih Muslim" ? "muslim" : "bukhari"}:${number}`;
        expect(source.url).toBe(site);
      }
    }
    // What a sky shows beyond the sun and the stars is from its sources: the white thread (Quran 2:187), the young
    // camels in the forenoon (Sahih Muslim 748a), the heat and the hills' shadows (539), the arrow (559), night
    // coming from the east (1954), the night as a covering (Quran 25:47), the night drawing in after the twilight
    // (84:17) and covering the day (91:4, 92:1), and night passing into day (22:61).
    expect(SKY_STOPS.filter((each) => each.scene.touches?.length).map((each) => [each.scene.id, each.scene.touches])).toEqual([
      ["sky-duha", ["camels"]],
      ["sky-cool", ["heat"]],
      ["sky-arrow", ["arrow"]],
      ["sky-thread", ["thread"]],
      ["sky-iftar", ["nightFalls"]],
      ["sky-sleep", ["nightFalls"]],
      ["sky-twilight", ["nightFalls"]],
      ["sky-sun-oath", ["nightFalls"]],
      ["sky-night-day", ["nightFalls"]]
    ]);
  });

  test("the stars turn with the night: they rise in the east, cross high and set in the west, about as many at once", () => {
    for (const [width, height] of [...LESSON_FRAMES, ...SHEET_FRAMES]) {
      const frame = skyFrame(width, height);
      const pole = starPole(frame);
      for (const id of ["sky-night-prayer", "sky-sleep", "sky-fajr", "sky-isha", "sky-duha-oath", "sky-night-day"]) {
        const scene = stop(id).scene;
        const stars = skyStars(frame, scene, 22);
        // The same sky always draws the same stars.
        expect(skyStars(frame, scene, 22)).toEqual(stars);
        // Wherever the night is, about as many stars are in the sky at once.
        for (const hour of [scene.from, (scene.from + scene.to) / 2, scene.to].filter((each) => dayHourOf(each) >= 19.5 || dayHourOf(each) <= 4.6)) {
          const shown = stars.filter((star) => {
            const at = starAt(frame, star, hour);
            return at.x >= 0 && at.x <= frame.width && at.y >= 0 && at.y <= frame.horizon;
          }).length;
          expect([id, width, hour, shown >= 10 && shown <= 40]).toEqual([id, width, hour, true]);
        }
        // A moment on: over the pole they have moved west (right); on the east side they have risen, on the west set.
        for (const star of stars) {
          const a = starAt(frame, star, scene.from);
          const b = starAt(frame, star, scene.from + 0.02);
          if (a.y < pole.y) expect(b.x).toBeGreaterThan(a.x);
          if (a.x < pole.x - 1) expect(b.y).toBeLessThan(a.y);
          if (a.x > pole.x + 1) expect(b.y).toBeGreaterThan(a.y);
        }
      }
      // A sky of the day has none, and a slow phone draws fewer.
      expect(skyStars(frame, stop("sky-zuhr").scene, 22)).toEqual([]);
      expect(skyStars(frame, stop("sky-isha").scene, 10).length).toBeLessThan(skyStars(frame, stop("sky-isha").scene, 22).length);
    }
  });

  test("every word in the skies is translated in every language", () => {
    const words = [...daySkyText(), "Times from", "Plays the sky again", "The day of prayer", "Each prayer in its time, in the sky from dawn to night."];
    expect(words.length).toBeGreaterThan(50);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: words.filter((each) => !catalog[each]) }).toEqual({ language, missing: [] });
    }
  });

  test("on every phone, in every language, every word stays in the sky and covers no other word, nor the sun or the moon", () => {
    const inLessons = new Set(Object.values(DAY_SKY_LESSONS));
    for (const language of ["en", "bn", "ur", "ar"] as const) {
      const say = (text: string) => t(text, undefined, language);
      for (const each of SKY_STOPS) {
        const frames = [...(inLessons.has(each.scene.id) ? LESSON_FRAMES : []), ...(DAY_OF_PRAYER.includes(each) ? SHEET_FRAMES : [])];
        expect([each.scene.id, frames.length > 0]).toEqual([each.scene.id, true]);
        for (const [width, height] of frames) {
          const where = `${language} ${each.scene.id} ${width}x${height}`;
          const { marks, threads, sides, glyphs } = skyLayout(each.scene, width, height, say);
          expect([where, marks.length]).toEqual([where, each.scene.marks?.length ?? 0]);
          const words = [...marks, ...threads, ...sides];
          for (const [index, word] of words.entries()) {
            const r = word.rect;
            expect([where, word.text, r.x >= 0 && r.y >= 0 && r.x + r.w <= width && r.y + r.h <= height]).toEqual([where, word.text, true]);
            for (const other of words.slice(index + 1)) expect([where, word.text, other.text, overlap(r, other.rect)]).toEqual([where, word.text, other.text, 0]);
            for (const glyph of glyphs) expect([where, word.text, overlap(r, glyph)]).toEqual([where, word.text, 0]);
          }
        }
      }
    }
  });
});

describe("the skies on screen", () => {
  afterEach(() => jest.useRealTimers());

  test("the bar of the day lights the sky's times", async () => {
    await render(<DayBar stop={stop("sky-fast")} />);
    for (const key of ["dawn", "sunrise", "forenoon", "midday", "afternoon", "sunset"]) expect(screen.getByTestId(`day-bar-on-${key}`)).toBeTruthy();
    expect(screen.getByTestId("day-bar-night")).toBeTruthy();
    expect(screen.getByTestId("day-bar-lastThird")).toBeTruthy();
    expect(screen.getByLabelText("Dawn to sunset")).toBeTruthy();
    await render(<DayBar stop={stop("sky-suhur")} testID="suhur" />);
    expect(screen.getByTestId("suhur-on-lastThird")).toBeTruthy();
    expect(screen.getByTestId("suhur-on-dawn")).toBeTruthy();
    expect(screen.getByTestId("suhur-night")).toBeTruthy();
  });

  test("each sky draws what its sources describe, and the names of the prayers in their places", async () => {
    const draw = (id: string) => render(<DaySky scene={stop(id).scene} width={360} height={270} still />);
    await draw("sky-thread");
    expect(screen.getByTestId("sky-thread")).toBeTruthy();
    expect(screen.getByTestId("sky-white-thread")).toHaveTextContent("White thread");
    expect(screen.getByTestId("sky-black-thread")).toHaveTextContent("Black thread");
    expect(screen.getByTestId("sky-east")).toHaveTextContent("East");
    expect(screen.getByTestId("sky-west")).toHaveTextContent("West");
    expect(screen.queryByTestId("sky-camel")).toBeNull();
    await draw("sky-duha");
    expect(screen.getAllByTestId("sky-camel")).toHaveLength(2);
    expect(screen.queryByTestId("sky-thread")).toBeNull();
    await draw("sky-cool");
    expect(screen.getByTestId("sky-heat")).toBeTruthy();
    expect(screen.getByTestId("sky-hill-shadows")).toBeTruthy();
    await draw("sky-arrow");
    expect(screen.getByTestId("sky-arrow")).toBeTruthy();
    await draw("sky-iftar");
    expect(screen.getByTestId("sky-night-falls")).toBeTruthy();
    expect(screen.queryByTestId("sky-arrow")).toBeNull();
    // The night's covering over the sky while it sleeps, and the stars turning over the night.
    await draw("sky-sleep");
    expect(screen.getByTestId("sky-night-falls")).toBeTruthy();
    expect(screen.getByTestId("sky-stars")).toBeTruthy();
    await draw("sky-qadr");
    expect(screen.getByTestId("sky-stars")).toBeTruthy();
    expect(screen.queryByTestId("sky-night-falls")).toBeNull();
    // The Quran's oaths: the night drawing in after the twilight; the shadows of the day, with no stars; and Asr's
    // name over our time until sunset.
    await draw("sky-twilight");
    expect(screen.getByTestId("sky-night-falls")).toBeTruthy();
    await draw("sky-shadows");
    expect(screen.getByTestId("sky-palm-shadow")).toBeTruthy();
    expect(screen.getByTestId("sky-hill-shadows")).toBeTruthy();
    expect(screen.queryByTestId("sky-stars")).toBeNull();
    await draw("sky-workers");
    expect(screen.getByTestId("sky-mark-0")).toHaveTextContent("Asr");
    expect(screen.queryByTestId("sky-mark-1")).toBeNull();
    await draw("sky-zuhr");
    expect(screen.queryByTestId("sky-stars")).toBeNull();
    await draw("sky-five");
    for (const [index, label] of ["Fajr", "Zuhr", "Asr", "Maghrib", "Isha"].entries()) expect(screen.getByTestId(`sky-mark-${index}`)).toHaveTextContent(label);
    expect(screen.queryByTestId("sky-mark-5")).toBeNull();
    await draw("sky-fajr");
    expect(screen.queryByTestId("sky-mark-0")).toBeNull();
    expect(screen.getByTestId("sky-sun")).toBeTruthy();
  });

  test("a sky plays to its time, then says it is drawn; with less motion it is drawn at once", async () => {
    jest.useFakeTimers();
    const scene = stop("sky-fajr").scene;
    const drawn = jest.fn();
    await render(<DaySky scene={scene} width={360} height={270} delay={300} onDrawn={drawn} />);
    await act(async () => jest.advanceTimersByTime(300 + skyDuration(scene)));
    expect(drawn).not.toHaveBeenCalled();
    await act(async () => jest.advanceTimersByTime(300));
    expect(drawn).toHaveBeenCalledTimes(1);
    const still = jest.fn();
    await render(<DaySky scene={scene} width={360} height={270} still onDrawn={still} />);
    await act(async () => jest.advanceTimersByTime(1));
    expect(still).toHaveBeenCalledTimes(1);
    // The longer the sky's day, the longer it plays, within bounds.
    expect(skyDuration(stop("sky-sunrise").scene)).toBe(2000);
    expect(skyDuration(stop("sky-fast").scene)).toBe(5200);
  });

  test("a prayer lesson's first page opens on its sky instead of its photo, with the times of the day and its sources", async () => {
    const fajr = LESSONS_BY_ID["lesson-deep-prayer-sunnah-times-fajr-in-the-dark"] as Lesson;
    await render(<LearnCard page="start" title={fajr.title} line="Fajr is prayed in its time." sky={skyForLesson(fajr)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} />);
    expect(screen.getByTestId("sky-card")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.queryByTestId("journey-map")).toBeNull();
    await fireEvent(screen.getByTestId("sky-card-frame"), "layout", { nativeEvent: { layout: { width: 362, height: 270 } } });
    expect(screen.getByTestId("day-sky")).toBeTruthy();
    expect(screen.getByTestId("sky-caption")).toHaveTextContent("Fajr: from the first light of dawn until the sun rises.");
    expect(screen.getByTestId("sky-day-bar-on-dawn")).toBeTruthy();
    expect(screen.getByTestId("sky-day-bar-sunrise")).toBeTruthy();
    expect(screen.getByTestId("sky-when")).toHaveTextContent("Dawn · Fajr");
    expect(screen.getByText("Times from")).toBeTruthy();
    expect(screen.getByText("Sahih Muslim 612d")).toBeTruthy();
    // Tap it to watch it again.
    await fireEvent.press(screen.getByTestId("sky-replay"));
    await fireEvent.press(screen.getByTestId("sky-card"));
    expect(screen.getByTestId("day-sky")).toBeTruthy();
  });

  test("the day of prayer plays every prayer in its time, and can be paused, stepped and jumped", async () => {
    jest.useFakeTimers();
    await render(<DayOfPrayerSheet visible onClose={jest.fn()} accent="#2E7D5B" />);
    await fireEvent(screen.getByTestId("day-of-prayer-frame"), "layout", { nativeEvent: { layout: { width: 358, height: 280 } } });
    const title = () => screen.getByTestId("day-of-prayer-title");
    expect(title()).toHaveTextContent("Fajr");
    expect(screen.getByTestId("sky-when")).toHaveTextContent("Dawn · Fajr");
    expect(screen.getByTestId("day-of-prayer-bar-on-dawn")).toBeTruthy();
    expect(screen.getByText("Sahih Muslim 612d")).toBeTruthy();
    // Plays by itself: the sky moves to its time, rests, then the next time comes.
    await act(async () => jest.advanceTimersByTime(3000));
    await act(async () => jest.advanceTimersByTime(3000));
    expect(title()).toHaveTextContent("Sunrise");
    expect(screen.getByTestId("day-of-prayer-bar-on-sunrise")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("day-of-prayer-play"));
    await act(async () => jest.advanceTimersByTime(10000));
    await act(async () => jest.advanceTimersByTime(10000));
    expect(title()).toHaveTextContent("Sunrise");
    await fireEvent.press(screen.getByTestId("day-of-prayer-next"));
    expect(screen.getByTestId("day-of-prayer-caption")).toHaveTextContent(stop("sky-duha").scene.caption);
    expect(screen.getByTestId("day-of-prayer-bar-on-forenoon")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("day-of-prayer-back"));
    await fireEvent.press(screen.getByTestId("day-of-prayer-back"));
    expect(title()).toHaveTextContent("Fajr");
    await fireEvent.press(screen.getByTestId("day-of-prayer-dot-7"));
    expect(title()).toHaveTextContent("The last third of the night");
    expect(screen.getByTestId("day-of-prayer-bar-on-lastThird")).toBeTruthy();
    expect(screen.getByText("Sahih al-Bukhari 1145")).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`day-of-prayer-dot-${DAY_OF_PRAYER.length - 1}`));
    expect(screen.getByTestId("day-of-prayer-caption")).toHaveTextContent("Five prayers, each in its own time, from dawn to night.");
    for (const key of ["dawn", "midday", "afternoon", "sunset", "night"]) expect(screen.getByTestId(`day-of-prayer-bar-on-${key}`)).toBeTruthy();
    expect(screen.getByTestId("day-of-prayer-bar-sunrise")).toBeTruthy();
  });
});
