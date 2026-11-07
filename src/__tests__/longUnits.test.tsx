import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { COURSE } from "../data/course";
import type { LearningNodeView } from "../types";
import { LearnPath, type PathUnit } from "../ui/screens";
import { SKY_DRAW_MAX } from "../ui/PathWeather";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// Al-Baqarah is one unit of over 250 circles. Its sky used to be one SVG as tall as the whole unit, which
// Android draws into a single bitmap of hundreds of MB: tapping Al-Baqarah crashed the app.

const quran = COURSE.sections.find((section) => section.nodes.some((node) => node.branchId === "quran-surah-baqarah"))!;

function baqarahUnit(): PathUnit {
  const nodes = quran.nodes.filter((node) => node.branchId === "quran-surah-baqarah");
  return {
    id: "quran-surah-baqarah",
    number: 2,
    title: "Al-Baqarah",
    done: 0,
    total: nodes.length,
    items: nodes.map((node, index): PathUnit["items"][number] => ({
      kind: "node",
      node: { ...node, status: index === 0 ? "current" : "locked", firstLessonId: node.lessonIds[0] } as LearningNodeView,
      lessonNumber: index + 1
    }))
  };
}

describe("long units", () => {
  it("opens Al-Baqarah with a small sky and pictures only near the screen", async () => {
    const unit = baqarahUnit();
    expect(unit.items.length).toBeGreaterThan(200);
    await render(
      <LearnPath
        accent={quran.accentColor}
        topicId={quran.topicId}
        mascotVariant="hijabi"
        units={[unit]}
        xpForNode={(node) => node.xpReward}
        onStartNode={jest.fn()}
        onClaimChest={jest.fn()}
        onTestOut={jest.fn()}
      />
    );
    const sky = screen.getByTestId("sky-gradient");
    expect(sky.props.height).toBeLessThanOrEqual(SKY_DRAW_MAX);
    const decor = () => screen.queryAllByTestId("path-decor").length;
    const before = decor();
    expect(before).toBeGreaterThan(0);
    expect(before).toBeLessThan(15);

    // After measuring and scrolling far down, the pictures move with the screen and stay few.
    const scroll = screen.getByTestId(`learn-path-${quran.topicId}`);
    await fireEvent(scroll, "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 390, height: 800 } } });
    await fireEvent(screen.getByTestId("path-unit-quran-surah-baqarah"), "layout", { nativeEvent: { layout: { x: 0, y: 0, width: 390, height: 30000 } } });
    await fireEvent(scroll, "scroll", { nativeEvent: { contentOffset: { x: 0, y: 12000 }, contentSize: { width: 390, height: 30000 }, layoutMeasurement: { width: 390, height: 800 } } });
    const after = decor();
    // Without the window all 85 or so pictures of the unit would be drawn at once.
    expect(after).toBeGreaterThan(0);
    expect(after).toBeLessThan(20);
    expect(after).not.toBe(before);
    expect(screen.getAllByTestId(/^path-node-/).length).toBe(unit.items.length);
  });
});
