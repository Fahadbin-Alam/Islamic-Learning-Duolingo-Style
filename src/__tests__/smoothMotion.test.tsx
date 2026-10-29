import React from "react";
import { render, screen } from "@testing-library/react-native";
import { Mascot } from "../ui/Mascot";
import { sampleCurve, smoothKeys } from "../ui/motion";

describe("smooth motion", () => {
  it("eases between keyframes and keeps every key", () => {
    const config = smoothKeys([0, 0.5, 1], [0, 10, 0], 4);
    expect(config.inputRange).toEqual([0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]);
    expect(config.outputRange[4]).toBe(10);
    expect(config.outputRange[8]).toBe(0);
    // Slow near the key, fast in the middle.
    expect(config.outputRange[1]).toBeLessThan(2.5);
    expect(config.outputRange[2]).toBeCloseTo(5);
  });

  it("keeps the unit on rotations", () => {
    const config = smoothKeys([0, 1], ["0deg", "-8deg"], 2);
    expect(config.outputRange).toEqual(["0deg", "-4deg", "-8deg"]);
  });

  it("samples a curve finely", () => {
    const config = sampleCurve(0, 1, 100, (x) => Math.sin(Math.PI * x));
    expect(config.inputRange).toHaveLength(101);
    expect(config.outputRange[50]).toBeCloseTo(1);
  });

  it("draws the waving mascot in layers and the others in one picture", async () => {
    const { toJSON, rerender } = await render(<Mascot mood="wave" />);
    const count = () => JSON.stringify(toJSON()).split('"type":"RNSVGSvgView"').length - 1;
    expect(count()).toBe(5);
    await rerender(<Mascot mood="happy" />);
    expect(count()).toBe(1);
    expect(screen).toBeTruthy();
  });
});
