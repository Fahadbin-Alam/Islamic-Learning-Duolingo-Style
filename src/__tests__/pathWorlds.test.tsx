import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import { playGameSound } from "../services/gameAudio";
import { PATH_WORLD_CHOICES, getPathWorldChoice, setPathWorldChoice, type PathWorld } from "../services/pathWorldChoice";
import { Camel } from "../ui/Camel";
import { IDLE_FIDGETS, Mascot } from "../ui/Mascot";
import { PathScenery, sceneryFor } from "../ui/PathScenery";
import { PathWeather } from "../ui/PathWeather";
import { WORLD_ITEMS, WorldTuft, worldFor } from "../ui/pathWorlds";
import { SCENERY_SHOWS } from "../ui/sceneryShows";
import { WORLD_KINDS } from "../ui/worldArt";

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

const PLACES: PathWorld[] = ["desert", "beach", "forest", "snow", "camp"];

describe("path sceneries", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("walks the units of a topic through the places in turn on Mix, and keeps one place when picked", () => {
    expect([0, 1, 2, 3, 4].map((unit) => worldFor("auto", "prayer", unit))).toEqual(["desert", "beach", "forest", "snow", "desert"]);
    // Only the Sahabah path visits the camp at Badr.
    expect([0, 1, 2, 3, 4].map((unit) => worldFor("auto", "sahabah", unit))).toEqual(["desert", "camp", "beach", "forest", "snow"]);
    for (const place of PLACES) expect(worldFor(place, "prayer", 3)).toBe(place);
  });

  it("puts each place's own pictures beside the path, keeping the topic's own picture first", () => {
    const topics = [...new Set(COURSE.sections.map((section) => section.topicId))];
    for (const place of ["beach", "forest", "snow", "camp"] as const) {
      for (const topicId of topics) {
        for (let unit = 0; unit < 4; unit += 1) {
          const first = sceneryFor(topicId, unit, 0, place);
          const second = sceneryFor(topicId, unit, 1, place);
          expect(first).not.toEqual(second);
          expect(WORLD_ITEMS[place].includes(second)).toBe(true);
        }
      }
    }
    // Quran keeps its book stand, Hadith its ink and paper, wherever the path goes.
    expect(sceneryFor("quran_tafseer", 2, 0, "beach")).toBe("bookStand");
    expect(sceneryFor("hadith", 1, 0, "forest")).toBe("inkpot");
  });

  it("gives every new picture 6 to 8 tap shows with sounds, and plays them in turn", async () => {
    for (const kind of [...WORLD_KINDS, "bookStand", "inkpot", "bush", "rocks"] as const) {
      const shows = SCENERY_SHOWS[kind];
      expect(shows.length).toBeGreaterThanOrEqual(6);
      jest.mocked(playGameSound).mockClear();
      await render(<PathScenery kind={kind} tappable animated />);
      for (const show of shows) {
        await fireEvent.press(screen.getByTestId(`scenery-${kind}`));
        await run(show.ms + 200);
      }
      expect(sounds()).toEqual(shows.map((show) => show.sound));
    }
  });

  it("closes the book onto a shelf on the first tap, and takes it down again on the next", async () => {
    expect(SCENERY_SHOWS.bookStand.slice(0, 2).map((show) => show.name)).toEqual(["shelf", "down"]);
    await render(<PathScenery kind="bookStand" tappable animated />);
    await fireEvent.press(screen.getByTestId("scenery-bookStand"));
    await run(2000);
    await fireEvent.press(screen.getByTestId("scenery-bookStand"));
    await run(2000);
    expect(screen.getByTestId("scenery-bookStand")).toBeTruthy();
  });

  it("draws each place's strip along the bottom of a unit, and none for the desert", async () => {
    for (const place of PLACES) {
      await render(<PathWeather weather="sunny" world={place} width={390} height={700} animated />);
      if (place === "desert") expect(screen.queryByTestId("world-desert")).toBeNull();
      else expect(screen.getByTestId(`world-${place}`)).toBeTruthy();
      for (const variant of [0, 1, 2]) await render(<WorldTuft world={place} variant={variant} size={26} />);
    }
  });

  it("keeps the learner's pick, and falls back to Mix", () => {
    expect(getPathWorldChoice()).toBe("auto");
    setPathWorldChoice("beach");
    expect(getPathWorldChoice()).toBe("beach");
    setPathWorldChoice("auto");
    expect(PATH_WORLD_CHOICES).toContain("camp");
  });

  it("has the kid fidget by itself while waiting, and stops for a tap", async () => {
    expect(IDLE_FIDGETS.length).toBeGreaterThanOrEqual(5);
    await render(<Mascot tappable size={80} testID="kid" />);
    await run(20000);
    // Fidgets are silent: only a tap makes a sound.
    expect(sounds()).toEqual([]);
    await fireEvent.press(screen.getByTestId("kid"));
    expect(sounds()).toHaveLength(1);
    await run(4000);
  });

  it("sprints the camel off to the left and back on its speed tap", async () => {
    await render(<Camel size={72} wrapWidth={390} home={150} walking tappable testID="camel" />);
    const target = screen.getByTestId("camel");
    for (let tap = 0; tap < 4; tap += 1) {
      await fireEvent.press(target);
      await run(3400);
    }
    expect(sounds()).toEqual(["sparkle", "sizzle", "sad", "zoom"]);
    await run(3000);
    expect(screen.getByTestId("camel")).toBeTruthy();
  });
});
