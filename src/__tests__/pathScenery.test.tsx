import React from "react";
import { render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import { Camel } from "../ui/Camel";
import { PathScenery, sceneryFor } from "../ui/PathScenery";

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
    for (const kind of ["palm", "dunes", "tent", "well", "bookStand", "inkpot", "flowers", "mountain", "mosque", "kaaba", "coins"] as const) {
      await render(<PathScenery kind={kind} animated />);
      expect(screen.getByTestId(`scenery-${kind}`)).toBeTruthy();
    }
  });

  it("draws the camel standing and walking within its box", async () => {
    await render(<Camel size={64} range={40} walking testID="camel" />);
    expect(screen.getByTestId("camel").props.style).toEqual(expect.arrayContaining([{ width: 104, height: 53 }]));
    await render(<Camel size={48} testID="still" />);
    expect(screen.getByTestId("still")).toBeTruthy();
  });
});
