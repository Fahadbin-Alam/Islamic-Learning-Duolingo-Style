import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { playGameSound } from "../services/gameAudio";
import { GAME_SOUND_EVENTS } from "../services/gameSoundLibrary";
import { Camel } from "../ui/Camel";
import { PathScenery } from "../ui/PathScenery";
import { BIRD_SHOWS, MOON_PHASES, PathWeather } from "../ui/PathWeather";
import { IDLE_MS, SceneProvider, useScene } from "../ui/sceneMood";
import { SCENERY_SHOWS, type ShowKind } from "../ui/sceneryShows";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const sounds = () => jest.mocked(playGameSound).mock.calls.map((call) => String(call[0]));
const lastSound = () => sounds().at(-1);

async function run(ms: number) {
  for (let left = ms; left > 0; left -= 400) {
    await act(async () => {
      jest.advanceTimersByTime(Math.min(400, left));
    });
  }
}

function Mood() {
  const { night, asleep } = useScene();
  return <>{night ? <Probe id="is-night" /> : null}{asleep ? <Probe id="is-asleep" /> : null}</>;
}

function Probe({ id }: { id: string }) {
  const { View } = jest.requireActual("react-native");
  return <View testID={id} />;
}

describe("home path shows", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("gives the well, palm, sheep, tent, basket and pond 6 to 8 different shows each, all with sounds", () => {
    for (const [kind, shows] of Object.entries(SCENERY_SHOWS)) {
      expect(shows.length).toBeGreaterThanOrEqual(6);
      expect(shows.length).toBeLessThanOrEqual(8);
      expect(new Set(shows.map((show) => show.name)).size).toBe(shows.length);
      for (const show of shows) expect(GAME_SOUND_EVENTS).toContain(show.sound);
      expect(kind).toBeTruthy();
    }
    expect(SCENERY_SHOWS.well.map((show) => show.name)).toContain("grow");
    expect(SCENERY_SHOWS.palm.map((show) => show.name)).toContain("drop");
    expect(BIRD_SHOWS.length).toBeGreaterThanOrEqual(6);
  });

  it.each(Object.keys(SCENERY_SHOWS) as ShowKind[])("plays every %s show in turn, then starts over", async (kind) => {
    await render(<PathScenery kind={kind} tappable animated />);
    const shows = SCENERY_SHOWS[kind];
    for (let index = 0; index < shows.length + 1; index += 1) {
      await fireEvent.press(screen.getByTestId(`scenery-${kind}`));
      expect(lastSound()).toBe(shows[index % shows.length].sound);
      // Half the shows are tapped through mid-way: a tap skips straight to the next one.
      await run(index % 2 ? shows[index % shows.length].ms + 400 : 200);
    }
  });

  it("plays the birds' shows one per tap", async () => {
    await render(<PathWeather weather="sunny" width={390} height={600} animated />);
    const heard: string[] = [];
    for (let index = 0; index < BIRD_SHOWS.length; index += 1) {
      await fireEvent.press(screen.getAllByTestId("sky-birds")[0]);
      heard.push(String(lastSound()));
      await run(2000);
    }
    expect(heard).toEqual(BIRD_SHOWS.map((show) => show.sound));
  });

  it("turns the sun into the moon and back, and night falls over the path", async () => {
    await render(
      <SceneProvider idle={false}>
        <PathWeather weather="sunny" width={390} height={600} animated />
        <Mood />
      </SceneProvider>
    );
    await fireEvent.press(screen.getByLabelText("sun"));
    expect(lastSound()).toBe("night");
    expect(screen.getByTestId("is-night")).toBeTruthy();
    await run(1200);
    // The moon shows its phases (full, gibbous, half) before the day comes back.
    for (let tap = 1; tap < MOON_PHASES.length; tap += 1) {
      await fireEvent.press(screen.getByLabelText("moon"));
      expect(screen.getByTestId("is-night")).toBeTruthy();
      await run(800);
    }
    await fireEvent.press(screen.getByLabelText("moon"));
    expect(screen.queryByTestId("is-night")).toBeNull();
    expect(screen.getByLabelText("sun")).toBeTruthy();
  });

  it("puts everyone to sleep when the screen is left alone, and wakes them on a touch", async () => {
    const wake: { current: (() => void) | null } = { current: null };
    await render(
      <SceneProvider wakeRef={wake}>
        <Camel size={72} wrapWidth={390} home={150} walking tappable testID="camel" />
        <PathScenery kind="sheep" tappable />
        <Mood />
      </SceneProvider>
    );
    expect(screen.queryByTestId("is-asleep")).toBeNull();
    await run(IDLE_MS - 1000);
    expect(screen.queryByTestId("is-asleep")).toBeNull();
    await run(1400);
    expect(screen.getByTestId("is-asleep")).toBeTruthy();
    expect(screen.getByTestId("is-night")).toBeTruthy();
    // Zs over the camel and the sheep.
    expect(screen.getAllByText("Z").length).toBeGreaterThanOrEqual(2);
    await act(async () => wake.current?.());
    expect(screen.queryByTestId("is-asleep")).toBeNull();
    expect(screen.queryAllByText("Z")).toHaveLength(0);
  });

  it("walks the camel across the whole row, but only the camel itself takes taps", async () => {
    await render(<Camel size={72} wrapWidth={390} home={150} walking tappable testID="camel" />);
    await run(30000);
    const target = screen.getByTestId("camel");
    expect(target.props.style).toEqual(expect.objectContaining({ width: 72 }));
    await fireEvent.press(target);
    expect(lastSound()).toBe("sparkle");
    await run(2000);
    await fireEvent.press(target);
    expect(lastSound()).toBe("sizzle");
  });
});
