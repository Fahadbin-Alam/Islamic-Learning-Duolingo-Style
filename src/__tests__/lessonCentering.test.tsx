jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { StyleSheet, View } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ExerciseView } from "../ui/lesson";
import { centerSpace } from "../ui/lesson/sheetFit";

// A short question sits in the middle of the room above CHECK, not stuck at the top with a gap under it.
const layout = (height: number, y = 0) => ({ nativeEvent: { layout: { x: 0, y, width: 358, height } } });

const question = {
  kind: "true_false" as const,
  prompt: "The Quran teaches believers to answer a greeting with one equal or better.",
  choices: [
    { id: "t", label: "True" },
    { id: "f", label: "False" }
  ],
  mascotVariant: "hijabi",
  accent: "#21B573",
  onSelect: jest.fn(),
  onCheck: jest.fn(),
  onContinue: jest.fn()
};

/** The space above the question: the scroll content's top padding past its usual 8. */
const topSpace = () => {
  const scroll = screen.getByTestId("exercise-prompt").parent!.parent!.parent!;
  let node = scroll;
  while (!node.props.contentContainerStyle) node = node.parent!;
  return (StyleSheet.flatten(node.props.contentContainerStyle).paddingTop as number) - 8;
};

async function laidOut(roomHeight: number, questionHeight: number) {
  const box = screen.getByTestId("exercise-view").children[0] as unknown as Parameters<typeof fireEvent>[0];
  await fireEvent(box, "layout", layout(roomHeight));
  let block = screen.getByTestId("exercise-prompt").parent!;
  while (!block.props.onLayout) block = block.parent!;
  await fireEvent(block, "layout", layout(questionHeight, 8 + topSpace()));
}

describe("lesson question placement", () => {
  it("splits the free room above and below a question that fits, and gives none to one that does not", () => {
    expect(centerSpace(600, 300, 24)).toBe(138);
    expect(centerSpace(400, 380, 24)).toBe(0);
  });

  it("moves a short question down to the middle and keeps it there through CHECK", async () => {
    const { rerender } = await render(<ExerciseView {...question} />);
    await laidOut(700, 320);
    // (700 - (8 + 320) - 24) / 2
    expect(topSpace()).toBe(174);

    await rerender(<ExerciseView {...question} selectedChoiceId="t" result={{ correct: true, correctLabel: "True", why: "Surah An-Nisa 4:86." }} />);
    await laidOut(700, 200);
    expect(topSpace()).toBe(174);
  });

  it("leaves a question that fills the screen at the top", async () => {
    await render(<ExerciseView {...question} />);
    await laidOut(400, 420);
    expect(topSpace()).toBe(0);
  });

  it("is first drawn in the middle where a view can say its size before the frame is drawn", async () => {
    // On the web and in the New Architecture a view reads its laid-out size at once; onLayout only tells after the
    // first frame is painted, so a question placed by it shows at the top for a frame or two and then drops.
    const heights: Record<string, number> = { "exercise-room": 700, "exercise-question": 320 };
    Object.defineProperty(View.prototype, "offsetHeight", {
      configurable: true,
      get(this: { props: { testID?: string } }) {
        return heights[this.props.testID ?? ""] ?? 0;
      }
    });
    try {
      await render(<ExerciseView {...question} />);
      // No layout event yet: the space was there in the frame the question first showed.
      expect(topSpace()).toBe(174);
    } finally {
      delete (View.prototype as { offsetHeight?: number }).offsetHeight;
    }
  });
});
