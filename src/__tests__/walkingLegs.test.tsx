import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Animated } from "react-native";
import { PathScenery } from "../ui/PathScenery";
import { SceneProvider } from "../ui/sceneMood";
import { LEG_SETS, WalkingLegs, isLegged } from "../ui/walkingLegs";
import { Mascot } from "../ui/Mascot";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

/** How many leg rectangles are drawn (the legs are the only Rects in these animal pictures). */
function rects(json: unknown): number {
  const text = JSON.stringify(json);
  return (text.match(/"type":"RNSVGRect"/g) ?? []).length;
}

describe("walking legs for the wandering animals", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("gives the sheep, goat and horse four legs in two diagonal pairs", () => {
    for (const kind of ["sheep", "goat", "horse"] as const) {
      expect(isLegged(kind)).toBe(true);
      const legs = LEG_SETS[kind].legs;
      expect(legs).toHaveLength(4);
      expect(legs.filter((leg) => leg.sign > 0)).toHaveLength(2);
    }
    expect(isLegged("rabbit")).toBe(false);
  });

  it("draws a roaming sheep's legs in their own swinging layers, not painted on the body", async () => {
    const view = await render(
      <SceneProvider>
        <PathScenery kind="sheep" size={64} animated tappable seed={1} roam={{ width: 390, left: 60 }} />
      </SceneProvider>
    );
    expect(screen.getByTestId("roam-sheep")).toBeTruthy();
    // 4 swinging legs, and none left on the body.
    expect(rects(view.toJSON())).toBe(4);
  });

  it("keeps the plain picture (two painted legs) when the sheep is not wandering", async () => {
    const view = await render(
      <SceneProvider>
        <PathScenery kind="sheep" size={64} animated tappable seed={1} />
      </SceneProvider>
    );
    expect(rects(view.toJSON())).toBe(2);
  });

  it("stands the legs straight without a walk clock", async () => {
    const view = await render(<WalkingLegs kind="horse" size={64} clock={null} />);
    expect(rects(view.toJSON())).toBe(4);
  });
});

describe("the waving kid", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("waves in short bursts with a rest between, not a non-stop shake", async () => {
    const delay = jest.spyOn(Animated, "delay");
    await render(<Mascot mood="wave" size={72} />);
    expect(delay.mock.calls.some((call) => Number(call[0]) >= 1000)).toBe(true);
    delay.mockRestore();
  });
});
