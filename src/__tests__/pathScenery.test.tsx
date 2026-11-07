import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import { playGameSound } from "../services/gameAudio";
import { Camel } from "../ui/Camel";
import { GroundTuft, PathScenery, sceneryFor } from "../ui/PathScenery";
import { PathWeather, weatherFor, type Weather } from "../ui/PathWeather";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const ALL_KINDS = [
  "palm", "dunes", "tent", "well", "bookStand", "inkpot", "flowers", "mountain", "mosque", "kaaba", "coins",
  "sheep", "oasis", "rocks", "dates", "bush"
] as const;

describe("path scenery", () => {
  it("gives every unit pictures that change from one spot to the next, none of them disputed symbols", () => {
    const topics = [...new Set(COURSE.sections.map((section) => section.topicId)), "unknown"];
    for (const topicId of topics) {
      for (let unit = 0; unit < 6; unit += 1) {
        const first = sceneryFor(topicId, unit, 0);
        const second = sceneryFor(topicId, unit, 1);
        expect(first).not.toEqual(second);
        expect(["lantern", "crescent", "ring", "moon"]).not.toContain(first);
        expect(["lantern", "crescent", "ring", "moon"]).not.toContain(second);
      }
    }
  });

  it("draws each picture", async () => {
    for (const kind of ALL_KINDS) {
      await render(<PathScenery kind={kind} animated />);
      expect(screen.getByTestId(`scenery-${kind}`)).toBeTruthy();
      await render(<PathScenery kind={kind} animated tappable />);
      expect(screen.getByTestId(`scenery-${kind}`)).toBeTruthy();
    }
    for (const variant of [0, 1, 2]) await render(<GroundTuft variant={variant} />);
  });

  it("uses every picture somewhere and gives long topics different pictures from unit to unit", () => {
    const used = new Set<string>();
    for (const section of COURSE.sections) {
      for (let unit = 0; unit < 8; unit += 1) for (let slot = 0; slot < 3; slot += 1) used.add(sceneryFor(section.topicId, unit, slot));
      expect(sceneryFor(section.topicId, 0, 0)).not.toEqual(sceneryFor(section.topicId, 1, 0));
    }
    expect([...used].sort()).toEqual([...ALL_KINDS].sort());
  });

  it("splashes the well, boings the other pictures and makes the camel react when tapped", async () => {
    jest.mocked(playGameSound).mockClear();
    await render(<PathScenery kind="well" tappable />);
    await fireEvent.press(screen.getByTestId("scenery-well"));
    expect(playGameSound).toHaveBeenLastCalledWith("splash", expect.anything());

    await render(<PathScenery kind="sheep" tappable />);
    await fireEvent.press(screen.getByTestId("scenery-sheep"));
    expect(playGameSound).toHaveBeenLastCalledWith("baa", expect.anything());

    await render(<PathScenery kind="dunes" tappable />);
    await fireEvent.press(screen.getByTestId("scenery-dunes"));
    expect(playGameSound).toHaveBeenLastCalledWith("boing", expect.anything());

    await render(<Camel size={64} range={40} walking tappable testID="camel" />);
    await fireEvent.press(screen.getByTestId("camel"));
    // The first tap is the happy camel; the rest come in turn (see pathTaps.test.tsx).
    expect(playGameSound).toHaveBeenLastCalledWith("sparkle", expect.anything());
  });

  it("draws the camel standing and walking within its box", async () => {
    await render(<Camel size={64} range={40} walking testID="camel" />);
    expect(screen.getByTestId("camel").props.style).toEqual(expect.arrayContaining([{ width: 104, height: 53 }]));
    await render(<Camel size={48} testID="still" />);
    expect(screen.getByTestId("still")).toBeTruthy();
  });

  it("changes the weather from one unit to the next and draws every kind", async () => {
    for (const topicId of ["foundation", "sahabah", "quran_tafseer"]) {
      const seen = new Set<Weather>();
      for (let unit = 0; unit < 5; unit += 1) {
        expect(weatherFor(topicId, unit)).not.toEqual(weatherFor(topicId, unit + 1));
        seen.add(weatherFor(topicId, unit));
      }
      expect(seen.size).toBe(5);
    }
    for (const weather of ["sunny", "breeze", "cloudy", "rain", "sunset"] as const) {
      await render(<PathWeather weather={weather} width={320} height={1400} animated />);
      expect(screen.getByTestId(`weather-${weather}`)).toBeTruthy();
    }
  });
});
