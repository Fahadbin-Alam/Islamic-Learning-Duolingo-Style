import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { playGameSound } from "../services/gameAudio";
import { SOUND_LIBRARY } from "../services/gameSoundLibrary";
import { IDLE_OF, idleKindFor } from "../ui/idleLife";
import { IDLE_FIDGETS, Mascot, TAP_REACTIONS } from "../ui/Mascot";
import { PathScenery } from "../ui/PathScenery";
import { PathWeather } from "../ui/PathWeather";
import { SceneProvider } from "../ui/sceneMood";
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

describe("a path where everything moves", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("gives every picture beside the path its own idle move, and never wobbles the buildings", () => {
    const kinds = ["palm", "dunes", "tent", "well", "bookStand", "inkpot", "flowers", "mountain", "sheep", "oasis", "rocks", "dates", "bush", ...WORLD_KINDS];
    for (const kind of kinds) expect(idleKindFor(kind)).toBeTruthy();
    expect(IDLE_OF.sheep).toBe("graze");
    expect(IDLE_OF.kaaba).toBe("glint");
    expect(IDLE_OF.mosque).toBe("glint");
  });

  it("lets the trees grow huge and a meteor land on the rocks, each with its own sound", () => {
    expect(SCENERY_SHOWS.palm.find((show) => show.name === "giant")?.sound).toBe("giant");
    expect(SCENERY_SHOWS.pine.find((show) => show.name === "giant")?.sound).toBe("giant");
    expect(SCENERY_SHOWS.bush.find((show) => show.name === "giant")?.sound).toBe("giant");
    expect(SCENERY_SHOWS.rocks.find((show) => show.name === "meteor")?.sound).toBe("meteor");
    for (const name of ["meteor", "giant", "hello", "yawn"] as const) expect(SOUND_LIBRARY[name].length).toBeGreaterThan(0);
  });

  it("plays the meteor on the rocks and the giant palm through to the end", async () => {
    await render(
      <SceneProvider>
        <PathScenery kind="rocks" size={64} animated tappable seed={1} />
        <PathScenery kind="palm" size={64} animated tappable seed={2} />
      </SceneProvider>
    );
    // Rocks: lizard, drum, roll, sprout, snail, then the meteor.
    for (let tap = 0; tap < 6; tap += 1) {
      await fireEvent.press(screen.getByTestId("scenery-rocks"));
      await run(2800);
    }
    expect(sounds()).toContain("meteor");
    const giantAt = SCENERY_SHOWS.palm.findIndex((show) => show.name === "giant");
    for (let tap = 0; tap <= giantAt; tap += 1) {
      await fireEvent.press(screen.getByTestId("scenery-palm"));
      await run(2800);
    }
    expect(sounds()).toContain("giant");
  });

  it("drops a meteor from the sky now and then, with its sound, and clears it again", async () => {
    await render(
      <SceneProvider>
        <PathWeather weather="sunny" width={390} height={900} animated />
      </SceneProvider>
    );
    expect(screen.queryByTestId("sky-meteor")).toBeNull();
    await act(async () => {
      jest.advanceTimersByTime(9000);
    });
    expect(screen.getByTestId("sky-meteor")).toBeTruthy();
    expect(sounds()).toEqual(["meteor"]);
    await run(3000);
    expect(screen.queryByTestId("sky-meteor")).toBeNull();
  });

  it("keeps the rain cloud and its rain wandering instead of standing still", async () => {
    await render(
      <SceneProvider>
        <PathWeather weather="rain" width={390} height={900} animated />
      </SceneProvider>
    );
    await run(2000);
    expect(screen.getByTestId("weather-rain")).toBeTruthy();
  });

  it("gives the kid more to do: jumps, dances and twirls, with matching sounds", async () => {
    expect(IDLE_FIDGETS).toEqual(expect.arrayContaining(["dance", "jump", "twirl", "yawn", "butterfly"]));
    expect(TAP_REACTIONS.find((reaction) => reaction.mood === "wave")?.sound).toBe("hello");
    expect(TAP_REACTIONS.find((reaction) => reaction.mood === "sleepy")?.sound).toBe("yawn");
    expect(TAP_REACTIONS.filter((reaction) => reaction.move).map((reaction) => reaction.move)).toEqual(["jump", "dance", "twirl"]);
    await render(<Mascot tappable size={80} testID="kid" />);
    // A good while of fidgets, all quiet.
    await run(40000);
    expect(sounds()).toEqual([]);
  });
});
