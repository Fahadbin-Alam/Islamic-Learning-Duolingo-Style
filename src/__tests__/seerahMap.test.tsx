jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { SEERAH_UNITS } from "../data/seerahUnits";
import {
  journeyForLesson,
  LIFE_ERAS,
  LIFE_YEARS,
  MAP_PLACES,
  SEERAH_JOURNEYS,
  seerahMapText,
  shownFor,
  sourcesFor,
  type MapScene
} from "../data/seerahMap";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";
import { JourneyCard } from "../ui/journey/JourneyCard";
import { JourneyMap } from "../ui/journey/JourneyMap";
import { LIFE_STOPS, LifeMapSheet } from "../ui/journey/LifeMap";
import { evenPoints, fitView, kmBetween, pixels, roundKm, smoothLine } from "../ui/journey/mapGeometry";
import { terrainSvg } from "../ui/journey/mapTerrain";
import { setLiteMotionForTests } from "../ui/liteMotion";
import type { Lesson } from "../types";

const lesson = (unitKey: string, slug: string) => LESSONS_BY_ID[`lesson-deep-${unitKey}-${slug}`] as Lesson;
const scenes = SEERAH_JOURNEYS.flatMap((journey) => journey.scenes.map((scene) => ({ journey, scene })));
const tagged = (scene: MapScene) => [...scene.legs, ...(scene.effects ?? []), ...(scene.notes ?? [])];
const inBox = (scene: MapScene, [lat, lon]: readonly [number, number]) => lat <= scene.box.north && lat >= scene.box.south && lon >= scene.box.west && lon <= scene.box.east;

describe("the Seerah on a map: its data", () => {
  test("every Seerah unit but his character has a journey, in the order of his life ﷺ", () => {
    const units = SEERAH_UNITS.filter((unit) => unit.key !== "seerah-khuluq");
    expect(SEERAH_JOURNEYS.map((journey) => journey.branchId)).toEqual(units.map((unit) => unit.branchId));
    expect(SEERAH_JOURNEYS.map((journey) => journey.unitKey)).toEqual(units.map((unit) => unit.key));
  });

  test("every lesson of those units opens on a map; no other lesson does", () => {
    for (const unit of SEERAH_UNITS) {
      for (const each of unit.lessons) {
        const found = journeyForLesson(lesson(unit.key, each.slug));
        expect([unit.key, each.slug, Boolean(found)]).toEqual([unit.key, each.slug, unit.key !== "seerah-khuluq"]);
      }
    }
    expect(journeyForLesson({ nodeId: "deep-seerah-hijrah-review-1", branchId: "seerah-hijrah" })?.sceneIndex).toBe(0);
    expect(journeyForLesson({ nodeId: "prophets-musa-1", branchId: "prophets-musa" })).toBeUndefined();
  });

  test("each lesson's own map: its scene, its place, and where it was in his life", () => {
    const quba = journeyForLesson(lesson("seerah-hijrah", "quba"))!;
    expect([quba.scene.id, quba.focus, quba.era, quba.age]).toEqual(["hijrah-quba", "quba", "madinah", 53]);
    const pledge = journeyForLesson(lesson("seerah-hijrah", "aqabah"))!;
    expect([pledge.scene.id, pledge.era, pledge.age]).toEqual(["hijrah-cave", "makkah", undefined]);
    const born = journeyForLesson(lesson("seerah-early", "monday"))!;
    expect([born.era, born.age]).toEqual(["before", 0]);
    expect(journeyForLesson(lesson("seerah-wada", "sixty-three"))!.age).toBe(LIFE_YEARS);
  });

  test("every lesson named in a journey is a real lesson, and its place is on its map", () => {
    for (const journey of SEERAH_JOURNEYS) {
      for (const [slug, own] of Object.entries(journey.lessons)) {
        expect([journey.unitKey, slug, Boolean(lesson(journey.unitKey, slug))]).toEqual([journey.unitKey, slug, true]);
        const scene = journey.scenes[own.scene ?? 0];
        expect(scene).toBeDefined();
        if (own.focus) expect([slug, scene.places]).toEqual([slug, expect.arrayContaining([own.focus])]);
      }
      for (const scene of journey.scenes) {
        for (const item of tagged(scene)) for (const slug of item.lessons ?? []) expect([scene.id, slug, slug in journey.lessons]).toEqual([scene.id, slug, true]);
      }
    }
  });

  test("every place and road point is known, and every drawn place sits inside its map", () => {
    for (const { scene } of scenes) {
      for (const id of scene.places) {
        expect([scene.id, id, Boolean(MAP_PLACES[id])]).toEqual([scene.id, id, true]);
        expect([scene.id, id, inBox(scene, MAP_PLACES[id].at)]).toEqual([scene.id, id, true]);
      }
      for (const leg of scene.legs) for (const point of leg.path) if (typeof point === "string") expect([scene.id, point, Boolean(MAP_PLACES[point])]).toEqual([scene.id, point, true]);
      for (const note of scene.notes ?? []) {
        if (note.at) expect(MAP_PLACES[note.at]).toBeDefined();
        if (note.leg !== undefined) expect(scene.legs[note.leg]).toBeDefined();
      }
    }
  });

  test("every map says where it comes from: a sahih hadith or the Quran, with its link", () => {
    for (const { scene } of scenes) {
      expect(scene.sources.length).toBeGreaterThan(0);
      for (const source of [...scene.sources, ...tagged(scene).flatMap((item) => (item.source ? [item.source] : []))]) {
        const match = /^(Sahih al-Bukhari|Sahih Muslim|Quran) (\S+)$/.exec(source.reference);
        expect([source.reference, Boolean(match)]).toEqual([source.reference, true]);
        const number = match![2].replace(":", "/");
        const site = match![1] === "Quran" ? `https://quran.com/${number}` : `https://sunnah.com/${match![1] === "Sahih Muslim" ? "muslim" : "bukhari"}:${number}`;
        expect(source.url).toBe(site);
      }
    }
  });

  test("a lesson's own road, note or touch shows only on its map, with its own source", () => {
    const calm = journeyForLesson(lesson("seerah-badr", "calm"))!;
    expect(calm.scene.effects!.filter((effect) => shownFor(effect, calm.lessonSlug)).map((effect) => effect.kind)).toContain("rain");
    expect(sourcesFor(calm.scene, calm.lessonSlug).map((source) => source.reference)).toEqual(["Quran 8:42", "Quran 8:11"]);
    const thousand = journeyForLesson(lesson("seerah-badr", "thousand"))!;
    expect(thousand.scene.effects!.filter((effect) => shownFor(effect, thousand.lessonSlug)).map((effect) => effect.kind)).not.toContain("rain");
    expect(sourcesFor(thousand.scene, thousand.lessonSlug).map((source) => source.reference)).toEqual(["Quran 8:42"]);
    // The whole life plays only what every lesson shares.
    expect(sourcesFor(calm.scene).map((source) => source.reference)).toEqual(["Quran 8:42"]);
  });

  test("his life: 40 years before revelation, 13 in Makkah, 10 in Madinah", () => {
    expect(LIFE_ERAS.map((era) => [era.id, era.from, era.years])).toEqual([
      ["before", 0, 40],
      ["makkah", 40, 13],
      ["madinah", 53, 10]
    ]);
    expect(LIFE_ERAS.reduce((sum, era) => sum + era.years, 0)).toBe(LIFE_YEARS);
  });

  test("every word on the maps is translated in every language", () => {
    const text = seerahMapText();
    expect(text.length).toBeGreaterThan(60);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: text.filter((each) => !catalog[each]) }).toEqual({ language, missing: [] });
    }
  });
});

describe("the map's ruler", () => {
  test("distances are real and said in round numbers", () => {
    expect(Math.round(kmBetween(MAP_PLACES.makkah.at, MAP_PLACES.madinah.at))).toBeGreaterThan(330);
    expect(Math.round(kmBetween(MAP_PLACES.makkah.at, MAP_PLACES.madinah.at))).toBeLessThan(350);
    expect([roundKm(1234), roundKm(342), roundKm(46), roundKm(2)]).toEqual([1200, 340, 45, 5]);
  });

  test("a view fits its box into the frame without squeezing it", () => {
    const view = fitView({ north: 24.56, south: 21.3, west: 38.9, east: 40.05 }, 4 / 3);
    expect(view.w / view.h).toBeCloseTo(4 / 3, 5);
    const map = pixels(view, 400);
    for (const place of [MAP_PLACES.makkah, MAP_PLACES.madinah]) {
      const at = map.of(place.at);
      expect(at.x).toBeGreaterThan(0);
      expect(at.x).toBeLessThan(400);
      expect(at.y).toBeGreaterThan(0);
      expect(at.y).toBeLessThan(300);
    }
  });

  test("a road bends through every one of its points, and its dots are evenly spaced", () => {
    const points = [
      { x: 0, y: 0 },
      { x: 50, y: 20 },
      { x: 52, y: 21 },
      { x: 100, y: 80 }
    ];
    const line = smoothLine(points, 12);
    for (const [index, point] of points.entries()) expect(line[index * 12]).toEqual(point);
    const dots = evenPoints(line, 8);
    expect(dots[0].along).toBe(0);
    expect(dots[dots.length - 1].along).toBe(1);
  });

  test("every map's land is drawn, the same each time", () => {
    for (const { scene } of scenes) {
      const view = fitView(scene.box, 4 / 3);
      const map = pixels(view, 360);
      const places = scene.places.map((id) => ({ kind: MAP_PLACES[id].kind, at: map.of(MAP_PLACES[id].at) }));
      const svg = terrainSvg({ level: scene.level, view, width: 360, height: 270, places, seed: scene.id });
      expect(svg.startsWith("<svg")).toBe(true);
      expect([scene.id, /NaN|Infinity|undefined/.test(svg)]).toEqual([scene.id, false]);
      expect(svg.length).toBeLessThan(140000);
      expect(terrainSvg({ level: scene.level, view, width: 360, height: 270, places, seed: scene.id })).toBe(svg);
    }
  });
});

describe("the maps on screen", () => {
  afterEach(() => jest.useRealTimers());

  test("a Seerah lesson's first page opens on its map instead of its photo, with its caption, life bar and sources", async () => {
    const quba = lesson("seerah-hijrah", "quba");
    await render(<LearnCard page="start" title={quba.title} line="He ﷺ stopped at Quba." journey={journeyForLesson(quba)} mascotVariant="boy" accent="#C9822B" onContinue={jest.fn()} />);
    expect(screen.getByTestId("journey-map")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.getByTestId("journey-caption")).toHaveTextContent("stopped at Quba and built its mosque", { exact: false });
    expect(screen.getByTestId("journey-life-on-madinah")).toBeTruthy();
    expect(screen.getByText("Sahih al-Bukhari 3906")).toBeTruthy();
  });

  test("the map draws its places and its road, and says when it is drawn", async () => {
    jest.useFakeTimers();
    const onDrawn = jest.fn();
    const { scene } = journeyForLesson(lesson("seerah-hudaybiyah", "tree"))!;
    await render(<JourneyMap scene={scene} width={360} height={270} lessonSlug="tree" focus="hudaybiyah" onDrawn={onDrawn} />);
    expect(screen.getByText("Hudaybiyah")).toBeTruthy();
    expect(screen.getByText("Ihram for Umrah")).toBeTruthy();
    expect(screen.getByText("Stopped here")).toBeTruthy();
    expect(onDrawn).not.toHaveBeenCalled();
    await act(async () => jest.advanceTimersByTime(8000));
    expect(onDrawn).toHaveBeenCalledTimes(1);
  });

  test("a long road says how far apart its two ends are", async () => {
    const { scene } = journeyForLesson(lesson("seerah-isra", "night-journey"))!;
    await render(<JourneyMap scene={scene} width={360} height={270} still />);
    expect(screen.getByText("About 1,200 km apart")).toBeTruthy();
  });

  test("a slow phone keeps the map's touches but with fewer moving pieces", async () => {
    const { scene } = journeyForLesson(lesson("seerah-badr", "calm"))!;
    const pieces = async () => {
      const shown = await render(<JourneyMap scene={scene} width={360} height={270} lessonSlug="calm" />);
      const count = screen.getByTestId("map-rain").children.length;
      await shown.unmount();
      return count;
    };
    try {
      setLiteMotionForTests(false);
      const full = await pieces();
      setLiteMotionForTests(true);
      const lite = await pieces();
      expect(lite).toBeGreaterThan(1);
      expect(lite).toBeLessThan(full);
    } finally {
      setLiteMotionForTests(undefined);
    }
  });

  test("tapping the map draws the road again", async () => {
    const tree = journeyForLesson(lesson("seerah-hudaybiyah", "tree"))!;
    await render(<JourneyCard journey={tree} />);
    await fireEvent(screen.getByTestId("journey-map-frame"), "layout", { nativeEvent: { layout: { width: 360, height: 270 } } });
    expect(screen.getByText("Hudaybiyah")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("journey-map-replay"));
    expect(screen.getByText("Hudaybiyah")).toBeTruthy();
  });

  test("the map of his life plays every place in order, and can be paused, stepped and jumped", async () => {
    jest.useFakeTimers();
    await render(<LifeMapSheet visible onClose={jest.fn()} accent="#C9822B" />);
    await fireEvent(screen.getByTestId("life-map-frame"), "layout", { nativeEvent: { layout: { width: 358, height: 280 } } });
    expect(screen.getByTestId("life-map-title")).toHaveTextContent("Seerah: the early years");
    // Plays by itself: the road is drawn, it rests, then the next place comes.
    await act(async () => jest.advanceTimersByTime(8000));
    await act(async () => jest.advanceTimersByTime(4000));
    expect(screen.getByTestId("life-map-title")).toHaveTextContent("Seerah: the first revelation");
    await fireEvent.press(screen.getByTestId("life-map-play"));
    await act(async () => jest.advanceTimersByTime(10000));
    await act(async () => jest.advanceTimersByTime(10000));
    expect(screen.getByTestId("life-map-title")).toHaveTextContent("Seerah: the first revelation");
    await fireEvent.press(screen.getByTestId("life-map-next"));
    expect(screen.getByTestId("life-map-caption")).toHaveTextContent(LIFE_STOPS[2].scene.caption);
    await fireEvent.press(screen.getByTestId("life-map-back"));
    await fireEvent.press(screen.getByTestId("life-map-back"));
    expect(screen.getByTestId("life-map-title")).toHaveTextContent("Seerah: the early years");
    const last = LIFE_STOPS.length - 1;
    await fireEvent.press(screen.getByTestId(`life-map-dot-${last}`));
    expect(screen.getByTestId("life-map-caption")).toHaveTextContent("Mina, then Arafah, then Muzdalifah, and back to Mina.");
    expect(screen.getByTestId("life-map-bar-on-madinah")).toBeTruthy();
  });
});
