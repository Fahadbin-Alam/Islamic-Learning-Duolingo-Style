import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { playGameSound } from "../services/gameAudio";
import { CAMEL_REACTIONS, Camel } from "../ui/Camel";
import { Mascot, TAP_REACTIONS } from "../ui/Mascot";
import { FLOWER_KINDS, PathScenery, flowerFor } from "../ui/PathScenery";
import { PathWeather } from "../ui/PathWeather";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const lastSound = () => jest.mocked(playGameSound).mock.calls.at(-1)?.[0];

/** Lets the reaction's clock run out (frame by frame) so the next tap starts the next one. */
async function finish() {
  for (let index = 0; index < 10; index += 1) {
    await act(async () => {
      jest.advanceTimersByTime(400);
    });
  }
}

async function tapAndFinish(testID: string) {
  await fireEvent.press(screen.getAllByTestId(testID)[0]);
  await finish();
}

describe("tapping things on the path", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.mocked(playGameSound).mockClear();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("plays every camel reaction in turn: happy, sad, zoom, spit, laugh, baby, jump", async () => {
    await render(<Camel size={64} range={40} walking tappable testID="camel" />);
    const heard: string[] = [];
    for (let index = 0; index < CAMEL_REACTIONS.length + 1; index += 1) {
      await tapAndFinish("camel");
      heard.push(String(lastSound()));
    }
    expect(heard).toEqual([...CAMEL_REACTIONS.map((reaction) => reaction.sound), CAMEL_REACTIONS[0].sound]);
    expect(CAMEL_REACTIONS.map((reaction) => reaction.kind)).toEqual(["happy", "sad", "zoom", "spit", "laugh", "baby", "jump"]);
  });

  it("only grunts when tapped again in the middle of a reaction", async () => {
    await render(<Camel size={64} tappable testID="camel" />);
    await fireEvent.press(screen.getByTestId("camel"));
    await fireEvent.press(screen.getByTestId("camel"));
    expect(lastSound()).toBe("camel");
  });

  it("walks the mascot through its feelings, one per tap", async () => {
    await render(<Mascot mood="happy" tappable testID="kid" />);
    const heard: string[] = [];
    for (let index = 0; index < TAP_REACTIONS.length; index += 1) {
      await tapAndFinish("kid");
      heard.push(String(lastSound()));
    }
    expect(heard).toEqual(TAP_REACTIONS.map((reaction) => reaction.sound));
    expect(TAP_REACTIONS.map((reaction) => reaction.mood)).toEqual(expect.arrayContaining(["wave", "laugh", "mad", "cry", "love", "surprised"]));
  });

  it("bounces and wilts a flower, then sprouts it, then blooms it again", async () => {
    await render(<PathScenery kind="flowers" tappable seed={3} />);
    await tapAndFinish("scenery-flowers");
    expect(jest.mocked(playGameSound).mock.calls.map((call) => call[0])).toEqual(["boing", "wilt"]);
    await tapAndFinish("scenery-flowers");
    expect(lastSound()).toBe("grow");
    await tapAndFinish("scenery-flowers");
    expect(lastSound()).toBe("sparkle");
    await tapAndFinish("scenery-flowers");
    expect(lastSound()).toBe("wilt");
  });

  it("gives flower spots different kinds and colors", () => {
    const kinds = new Set(Array.from({ length: 16 }, (_, seed) => flowerFor(seed).kind));
    expect([...kinds].sort()).toEqual([...FLOWER_KINDS].sort());
    expect(flowerFor(1).colors).not.toEqual(flowerFor(5).colors);
  });

  it("makes the mountain rumble, snow and show a sunrise", async () => {
    await render(<PathScenery kind="mountain" tappable />);
    const heard: string[] = [];
    for (let index = 0; index < 3; index += 1) {
      await tapAndFinish("scenery-mountain");
      heard.push(String(lastSound()));
    }
    expect(heard).toEqual(["thunder", "sparkle", "grow"]);
  });

  it("lets clouds rain, storm and clear up, and the sun beam, wear sunglasses and wink", async () => {
    await render(<PathWeather weather="sunny" width={390} height={600} animated />);
    const clouds = () => screen.getAllByLabelText("cloud");
    const heard: string[] = [];
    for (let index = 0; index < 3; index += 1) {
      await fireEvent.press(clouds()[0]);
      heard.push(String(lastSound()));
      await finish();
    }
    expect(heard).toEqual(["splash", "thunder", "sparkle"]);
    const sunSounds: string[] = [];
    for (let index = 0; index < 3; index += 1) {
      await fireEvent.press(screen.getByLabelText("sun"));
      sunSounds.push(String(lastSound()));
      await finish();
    }
    expect(sunSounds).toEqual(["grow", "boing", "giggle"]);
  });
});
