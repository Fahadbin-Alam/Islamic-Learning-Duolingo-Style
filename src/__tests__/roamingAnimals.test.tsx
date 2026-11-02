import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { playGameSound } from "../services/gameAudio";
import { PathScenery, sceneryFor } from "../ui/PathScenery";
import { PathWeather } from "../ui/PathWeather";
import { WORLD_ITEMS } from "../ui/pathWorlds";
import { GAITS, ROAMERS } from "../ui/roamer";
import { ARK_FIRST_MS, ARK_SHOWS } from "../ui/seaSail";
import { SCENERY_SHOWS } from "../ui/sceneryShows";
import { COURSE } from "../data/course";
import { Animated } from "react-native";
import { SceneProvider } from "../ui/sceneMood";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const sounds = () => jest.mocked(playGameSound).mock.calls.map((call) => String(call[0]));

async function run(ms: number) {
  for (let left = ms; left > 0; left -= 400) {
    await act(async () => {
      jest.advanceTimersByTime(Math.min(400, left));
    });
  }
}

/** The farthest walk the animals were sent on, px (each walk is one timing of the position to a new spot). */
function farthestWalk(timing: jest.SpyInstance) {
  return Math.max(0, ...timing.mock.calls.map((call) => Math.abs(Number((call[1] as { toValue: unknown }).toValue)) || 0));
}

describe("animals that wander their row like the camel", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("lets the sheep, goat, horse, rabbit, turtle and crab roam, at their own pace", () => {
    for (const kind of ["sheep", "goat", "horse", "rabbit", "turtle", "crab"]) expect(ROAMERS.has(kind)).toBe(true);
    // The rabbit hops fastest, the turtle plods slowest, and the crab never turns round (it walks sideways).
    expect(GAITS.rabbit.speed).toBeGreaterThan(GAITS.sheep.speed);
    expect(GAITS.turtle.speed).toBeLessThan(GAITS.sheep.speed / 2);
    expect(GAITS.crab.turns).toBe(false);
    expect(ROAMERS.has("kaaba")).toBe(false);
  });

  it("walks the sheep far along its row, not a little wobble on the spot", async () => {
    const timing = jest.spyOn(Animated, "timing");
    await render(
      <SceneProvider>
        <PathScenery kind="sheep" size={64} animated tappable seed={3} roam={{ width: 390, left: 60 }} />
      </SceneProvider>
    );
    expect(screen.getByTestId("roam-sheep")).toBeTruthy();
    await run(20000);
    expect(farthestWalk(timing)).toBeGreaterThan(60);
    timing.mockRestore();
  });

  it("still plays its tap shows while it roams", async () => {
    await render(
      <SceneProvider>
        <PathScenery kind="rabbit" size={64} animated tappable seed={2} roam={{ width: 390, left: 200 }} />
      </SceneProvider>
    );
    await run(1200);
    await fireEvent.press(screen.getByTestId("scenery-rabbit"));
    expect(sounds()[0]).toBe(SCENERY_SHOWS.rabbit[0].sound);
  });
});

describe("the sea, the Ark and the mini Makkah", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("sails the boat on the beach's water instead of standing it up beside the path", async () => {
    expect(WORLD_ITEMS.beach).not.toContain("boat");
    await render(<PathWeather weather="sunny" world="beach" width={390} height={600} animated />);
    expect(screen.getByTestId("sea-boat")).toBeTruthy();
  });

  it("sails Nuh's Ark across now and then, and plays a show with a matching sound on each tap", async () => {
    await render(
      <SceneProvider>
        <PathWeather weather="sunny" world="beach" width={390} height={600} animated meteor={false} />
      </SceneProvider>
    );
    expect(screen.queryByTestId("sea-ark")).toBeNull();
    await run(ARK_FIRST_MS + 400);
    for (const show of ARK_SHOWS) {
      await fireEvent.press(screen.getByTestId("sea-ark"));
      await run(show.ms + 100);
    }
    expect(sounds()).toEqual(ARK_SHOWS.map((show) => show.sound));
  });

  it("puts a tappable mini Makkah on the desert path of many topics, with six shows that never move the Kaaba", async () => {
    const topics = [...new Set(COURSE.sections.map((section) => section.topicId))];
    const withMakkah = topics.filter((topicId) => [0, 1, 2, 3, 4, 5, 6, 7].some((unit) => [0, 1, 2].some((slot) => sceneryFor(topicId, unit, slot) === "kaaba")));
    expect(withMakkah.length).toBeGreaterThanOrEqual(3);
    expect(SCENERY_SHOWS.kaaba).toHaveLength(6);
    await render(<PathScenery kind="kaaba" tappable animated />);
    for (const show of SCENERY_SHOWS.kaaba) {
      await fireEvent.press(screen.getByTestId("scenery-kaaba"));
      await run(show.ms + 100);
    }
    expect(sounds()).toEqual(SCENERY_SHOWS.kaaba.map((show) => show.sound));
  });
});
