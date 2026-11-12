jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { HAJJ_DAYS, HAJJ_MAP_LESSONS, HAJJ_STOPS, hajjMapForLesson, hajjMapText } from "../data/hajjMap";
import { MAP_PLACES, shownFor, sourcesFor, type MapScene } from "../data/seerahMap";
import { t } from "../i18n";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";
import { HajjDaysBar } from "../ui/journey/HajjDays";
import { HajjMapSheet } from "../ui/journey/HajjMap";
import { JourneyMap, sceneLayout, type Rect } from "../ui/journey/JourneyMap";
import type { Lesson } from "../types";

const stop = (id: string) => HAJJ_STOPS.find((each) => each.scene.id === id)!;
const tagged = (scene: MapScene) => [...scene.legs, ...(scene.effects ?? []), ...(scene.notes ?? [])];
const inBox = (scene: MapScene, [lat, lon]: readonly [number, number]) => lat <= scene.box.north && lat >= scene.box.south && lon >= scene.box.west && lon <= scene.box.east;
const lessonsOf = (sceneId: string) => Object.entries(HAJJ_MAP_LESSONS).filter(([, own]) => own.stop === sceneId).map(([nodeId]) => nodeId);
// The map's frame on phones 320, 360, 375, 390 and 412 px wide: on a lesson's first page, and in the sheet.
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
const overlap = (a: Rect, b: Rect) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));

describe("Hajj on a map: its data", () => {
  test("Hajj in order: the miqats, the 8th to the 13th of Dhul-Hijjah, the farewell tawaf, then all of it", () => {
    expect(HAJJ_DAYS).toEqual([8, 9, 10, 11, 12, 13]);
    expect(HAJJ_STOPS.map((each) => [each.scene.id, each.days, each.maybe ?? [], Boolean(each.night)])).toEqual([
      ["hajj-miqat", [], [], false],
      ["hajj-tarwiyah", [8], [], false],
      ["hajj-arafah", [9], [], false],
      ["hajj-muzdalifah", [], [], true],
      ["hajj-nahr", [10], [], false],
      ["hajj-tashriq", [11, 12], [13], false],
      ["hajj-farewell", [], [], false],
      ["hajj-all", [8, 9, 10, 11, 12], [13], true]
    ]);
    // The 13th is the day a pilgrim may stay for or not: "two days or three" (Quran 2:203).
    const twoOrThree = stop("hajj-tashriq").scene.notes!.find((note) => note.text === "Two days or three")!;
    expect(twoOrThree.source?.reference).toBe("Quran 2:203");
  });

  test("the four miqats he ﷺ set, for the four lands, in the order of Sahih al-Bukhari 1524", () => {
    const { scene } = stop("hajj-miqat");
    expect(scene.sources.map((source) => source.reference)).toEqual(["Sahih al-Bukhari 1524"]);
    expect(scene.legs.map((leg) => [leg.kind, leg.path[0], leg.path[leg.path.length - 1]])).toEqual([
      ["pilgrims", "dhulhulayfah", "makkah"],
      ["pilgrims", "juhfah", "makkah"],
      ["pilgrims", "qarnmanazil", "makkah"],
      ["pilgrims", "yalamlam", "makkah"]
    ]);
    expect(scene.notes!.map((note) => [note.at, note.text])).toEqual([
      ["dhulhulayfah", "For Madinah"],
      ["juhfah", "For Sham"],
      ["qarnmanazil", "For Najd"],
      ["yalamlam", "For Yemen"]
    ]);
  });

  test("every lesson with a map is a real Hajj lesson, and the place it is about is on its map", () => {
    expect(Object.keys(HAJJ_MAP_LESSONS).length).toBe(15);
    for (const [nodeId, own] of Object.entries(HAJJ_MAP_LESSONS)) {
      const lesson = LESSONS_BY_ID[`lesson-${nodeId}`] as Lesson | undefined;
      expect([nodeId, lesson?.branchId?.startsWith("hajj-")]).toEqual([nodeId, true]);
      const found = hajjMapForLesson(lesson!)!;
      expect([nodeId, found.scene.id, found.lessonSlug]).toEqual([nodeId, own.stop, nodeId]);
      if (own.focus) expect([nodeId, found.scene.places]).toEqual([nodeId, expect.arrayContaining([own.focus])]);
    }
    // A lesson's own note waits for that lesson, and that lesson opens on that map.
    for (const { scene } of HAJJ_STOPS) {
      for (const item of tagged(scene)) for (const nodeId of item.lessons ?? []) expect([scene.id, nodeId, HAJJ_MAP_LESSONS[nodeId]?.stop]).toEqual([scene.id, nodeId, scene.id]);
    }
  });

  test("the other Hajj lessons keep their photo, and no lesson outside Hajj gets a Hajj map", () => {
    const others = (Object.values(LESSONS_BY_ID) as Lesson[]).filter((lesson) => lesson.branchId?.startsWith("hajj-") && !(lesson.nodeId in HAJJ_MAP_LESSONS));
    expect(others.length).toBeGreaterThan(50);
    for (const lesson of others) expect([lesson.nodeId, hajjMapForLesson(lesson)]).toEqual([lesson.nodeId, undefined]);
    expect(hajjMapForLesson({ nodeId: "deep-seerah-hijrah-quba" })).toBeUndefined();
  });

  test("every place and road point is known, and every drawn place sits inside its map", () => {
    for (const { scene } of HAJJ_STOPS) {
      for (const id of scene.places) {
        expect([scene.id, id, Boolean(MAP_PLACES[id])]).toEqual([scene.id, id, true]);
        expect([scene.id, id, inBox(scene, MAP_PLACES[id].at)]).toEqual([scene.id, id, true]);
      }
      for (const leg of scene.legs) for (const point of leg.path) if (typeof point === "string") expect([scene.id, point, Boolean(MAP_PLACES[point])]).toEqual([scene.id, point, true]);
      for (const note of scene.notes ?? []) {
        expect([scene.id, note.text, Boolean(note.at && MAP_PLACES[note.at])]).toEqual([scene.id, note.text, true]);
        if (note.after !== undefined) expect(scene.legs[note.after]).toBeDefined();
      }
      for (const effect of scene.effects ?? []) if (effect.after !== undefined) expect(scene.legs[effect.after]).toBeDefined();
    }
  });

  test("every map says where it comes from: a sahih hadith or the Quran, with its link", () => {
    for (const { scene } of HAJJ_STOPS) {
      expect(scene.sources.length).toBeGreaterThan(0);
      for (const source of [...scene.sources, ...tagged(scene).flatMap((item) => (item.source ? [item.source] : []))]) {
        const match = /^(Sahih al-Bukhari|Sahih Muslim|Quran) (\S+)$/.exec(source.reference);
        expect([source.reference, Boolean(match)]).toEqual([source.reference, true]);
        const number = match![2].replace(":", "/");
        const site = match![1] === "Quran" ? `https://quran.com/${number}` : `https://sunnah.com/${match![1] === "Sahih Muslim" ? "muslim" : "bukhari"}:${number}`;
        expect(source.url).toBe(site);
      }
    }
    // Jabir's long hadith of his Hajj ﷺ is the source of the days.
    for (const id of ["hajj-tarwiyah", "hajj-arafah", "hajj-muzdalifah", "hajj-nahr", "hajj-all"]) expect(stop(id).scene.sources.map((source) => source.reference)).toEqual(["Sahih Muslim 1218a"]);
  });

  test("a lesson's own note shows only on its map, with its own source", () => {
    const { scene } = stop("hajj-nahr");
    const shown = (lessonSlug?: string) => (scene.notes ?? []).filter((note) => shownFor(note, lessonSlug)).map((note) => note.text);
    expect(shown()).toEqual(["Seven pebbles", "Tawaf"]);
    expect(shown("hajj-major-stations-sacrifice-and-release")).toEqual(["Seven pebbles", "Sacrifice, then shave", "Tawaf"]);
    expect(shown("deep-hajj-as-he-taught-it-before-the-sunrise")).toEqual(["Off before sunrise", "Seven pebbles", "Tawaf"]);
    expect(sourcesFor(scene, "deep-hajj-spirit-feed-the-poor").map((source) => source.reference)).toEqual(["Sahih Muslim 1218a", "Sahih Muslim 1305a"]);
    expect(sourcesFor(scene).map((source) => source.reference)).toEqual(["Sahih Muslim 1218a"]);
  });

  test("every word on the Hajj maps is translated in every language", () => {
    const words = [...hajjMapText(), ...new Set(HAJJ_STOPS.flatMap(({ scene }) => scene.places.map((id) => MAP_PLACES[id].name))), "Dhul-Hijjah"];
    expect(words.length).toBeGreaterThan(40);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: words.filter((each) => !catalog[each]) }).toEqual({ language, missing: [] });
    }
  });

  test("on every phone, in every language, no note covers a name, a place or another note, and none is left out", () => {
    for (const language of ["en", "bn", "ur", "ar"] as const) {
      const say = (text: string, params?: Record<string, string>) => t(text, params, language);
      for (const { scene } of HAJJ_STOPS) {
        for (const lessonSlug of [undefined, ...lessonsOf(scene.id)]) {
          // A lesson's map, or the map of Hajj's sheet, on phones 320 to 412 px wide (as measured in the browser).
          for (const [width, height] of lessonSlug ? LESSON_FRAMES : SHEET_FRAMES) {
            const where = `${language} ${scene.id} ${lessonSlug ?? "map of Hajj"} ${width}`;
            const { labels, notes } = sceneLayout(scene, width, height, lessonSlug, say);
            const wanted = (scene.notes ?? []).filter((note) => shownFor(note, lessonSlug)).length;
            expect([where, notes.filter(Boolean).length]).toEqual([where, wanted]);
            const marks = labels.map(({ at }) => ({ x: at.x - 13, y: at.y - 13, w: 26, h: 26 }));
            const spots = notes.flatMap((spot) => (spot ? [spot] : []));
            for (const [index, spot] of spots.entries()) {
              const r = spot.rect;
              expect([where, spot.text, r.x >= 0 && r.y >= 0 && r.x + r.w <= width && r.y + r.h <= height]).toEqual([where, spot.text, true]);
              const covered = [...labels.map(({ rect }) => rect), ...marks, ...spots.filter((_, other) => other !== index).map((other) => other.rect)].reduce((sum, rect) => sum + overlap(r, rect), 0);
              expect([where, spot.text, covered <= 30]).toEqual([where, spot.text, true]);
            }
            for (const [index, label] of labels.entries()) {
              for (const other of labels.slice(index + 1)) expect([where, label.id, other.id, overlap(label.rect, other.rect)]).toEqual([where, label.id, other.id, 0]);
            }
          }
        }
      }
    }
  });
});

describe("the Hajj maps on screen", () => {
  afterEach(() => jest.useRealTimers());

  test("the days of Hajj light the stop's days; the 13th softly, the night at Muzdalifah as a moon", async () => {
    await render(<HajjDaysBar stop={stop("hajj-tashriq")} />);
    expect(screen.getByTestId("hajj-days-on-11")).toBeTruthy();
    expect(screen.getByTestId("hajj-days-on-12")).toBeTruthy();
    expect(screen.getByTestId("hajj-days-maybe-13")).toBeTruthy();
    expect(screen.getByTestId("hajj-days-10")).toBeTruthy();
    expect(screen.getByTestId("hajj-days-night")).toBeTruthy();
    await render(<HajjDaysBar stop={stop("hajj-muzdalifah")} testID="night" />);
    expect(screen.getByTestId("night-night-on")).toBeTruthy();
    expect(screen.queryByTestId("night-on-9")).toBeNull();
    expect(screen.queryByTestId("night-on-10")).toBeNull();
  });

  test("a Hajj lesson's first page opens on its map instead of its photo, with the days of Hajj and its sources", async () => {
    const arafah = LESSONS_BY_ID["lesson-hajj-major-stations-arafah"] as Lesson;
    await render(<LearnCard page="start" title={arafah.title} line="Pilgrims stand at Arafah." journey={hajjMapForLesson(arafah)} mascotVariant="boy" accent="#C9822B" onContinue={jest.fn()} />);
    expect(screen.getByTestId("journey-map")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.getByTestId("journey-caption")).toHaveTextContent("stood there, facing the qiblah, until the sun set", { exact: false });
    expect(screen.getByTestId("journey-days-on-9")).toBeTruthy();
    expect(screen.queryByTestId("journey-life")).toBeNull();
    expect(screen.getByTestId("hajj-when")).toHaveTextContent("9th Dhul-Hijjah · Day of Arafah");
    expect(screen.getByText("Sahih Muslim 1218a")).toBeTruthy();
  });

  test("the sun goes down over Arafah, and the pebbles fall at the Jamarat", async () => {
    await render(<JourneyMap scene={stop("hajj-arafah").scene} width={360} height={270} still />);
    expect(screen.getByTestId("map-sunset")).toBeTruthy();
    expect(screen.getByText("Till sunset")).toBeTruthy();
    await render(<JourneyMap scene={stop("hajj-nahr").scene} width={360} height={270} lessonSlug="deep-hajj-as-he-taught-it-ibn-masuds-pebbles" focus="jamarat" />);
    expect(screen.getByTestId("map-pebbles")).toBeTruthy();
    expect(screen.getByText("Seven pebbles")).toBeTruthy();
    expect(screen.queryByText("Sacrifice, then shave")).toBeNull();
  });

  test("the map of Hajj plays every stop in order, and can be paused, stepped and jumped", async () => {
    jest.useFakeTimers();
    await render(<HajjMapSheet visible onClose={jest.fn()} accent="#C9822B" />);
    await fireEvent(screen.getByTestId("hajj-map-frame"), "layout", { nativeEvent: { layout: { width: 358, height: 280 } } });
    expect(screen.getByTestId("hajj-map-title")).toHaveTextContent("The miqats");
    expect(screen.getByTestId("hajj-when")).toHaveTextContent("On the way to Makkah");
    // Plays by itself: the roads are drawn, they rest, then the next stop comes.
    await act(async () => jest.advanceTimersByTime(8000));
    await act(async () => jest.advanceTimersByTime(4000));
    expect(screen.getByTestId("hajj-map-title")).toHaveTextContent("The 8th: Mina");
    expect(screen.getByTestId("hajj-map-days-on-8")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("hajj-map-play"));
    await act(async () => jest.advanceTimersByTime(10000));
    await act(async () => jest.advanceTimersByTime(10000));
    expect(screen.getByTestId("hajj-map-title")).toHaveTextContent("The 8th: Mina");
    await fireEvent.press(screen.getByTestId("hajj-map-next"));
    expect(screen.getByTestId("hajj-map-caption")).toHaveTextContent(HAJJ_STOPS[2].scene.caption);
    expect(screen.getByTestId("hajj-map-days-on-9")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("hajj-map-back"));
    await fireEvent.press(screen.getByTestId("hajj-map-back"));
    expect(screen.getByTestId("hajj-map-title")).toHaveTextContent("The miqats");
    await fireEvent.press(screen.getByTestId("hajj-map-dot-3"));
    expect(screen.getByTestId("hajj-map-title")).toHaveTextContent("The night at Muzdalifah");
    expect(screen.getByTestId("hajj-map-days-night-on")).toBeTruthy();
    await fireEvent.press(screen.getByTestId(`hajj-map-dot-${HAJJ_STOPS.length - 1}`));
    expect(screen.getByTestId("hajj-map-caption")).toHaveTextContent("Hajj in order: Mina, Arafah, Muzdalifah, then back to Mina and the House.");
  });
});
