jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Text } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { choicePictures, LESSON_PICTURE_IDS } from "../data/lessonPictures";
import { ExerciseView } from "../ui/lesson";
import { questionFormat } from "../ui/lesson/questionFormats";
import { surahScene } from "../data/surahPictures";
import { coverRect, LiveFrame } from "../ui/lesson/LivePicture";
import { PICTURE_LIFE, sceneLife, type Life } from "../ui/lesson/pictureLife";

const shares = (life: Life) => Object.entries(life).filter(([key, value]) => key !== "count" && typeof value === "number") as [string, number][];

describe("living lesson pictures", () => {
  test("every picture the app ships has its own life, and only pictures it ships", () => {
    for (const id of LESSON_PICTURE_IDS) expect(PICTURE_LIFE[id]?.length).toBeGreaterThan(0);
    for (const id of Object.keys(PICTURE_LIFE)) expect(LESSON_PICTURE_IDS).toContain(id);
  });

  test("every place on a picture is inside it", () => {
    for (const life of Object.values(PICTURE_LIFE).flat()) {
      for (const [key, value] of shares(life)) {
        expect([key, value >= 0 && value <= 1]).toEqual([key, true]);
      }
      if ("top" in life && "bottom" in life) expect(life.top).toBeLessThan(life.bottom);
    }
  });

  test("the Ka'bah itself never moves: only the sky around it", () => {
    expect(PICTURE_LIFE.kaaba.map((life) => life.kind).sort()).toEqual(["birds", "cloud", "glow"]);
  });

  test("a surah's picture gets life to match its sky; a letters card only a gleam", () => {
    expect(surahScene(2)).toBe("day");
    expect(sceneLife("sea").map((life) => life.kind)).toContain("waves");
    expect(sceneLife("night").map((life) => life.kind)).not.toContain("birds");
    expect(sceneLife(undefined)).toEqual([{ kind: "shine" }]);
  });

  test("the life is laid over the picture where it shows, when it is cut to fill its box", () => {
    const wide = coverRect(400, 300, 16 / 9);
    expect(wide.left).toBeCloseTo(-66.67, 1);
    expect(wide.width).toBeCloseTo(533.33, 1);
    expect([wide.top, wide.height]).toEqual([0, 300]);
    expect(coverRect(400, 100, 16 / 9)).toEqual({ left: 0, top: -62.5, width: 400, height: 225 });
  });

  test("once it knows its size the picture comes alive", async () => {
    const layout = { nativeEvent: { layout: { width: 320, height: 180 } } };
    await render(
      <LiveFrame aspect={16 / 9} life={PICTURE_LIFE.ark}>
        <Text>picture</Text>
      </LiveFrame>
    );
    expect(screen.getByText("picture")).toBeTruthy();
    expect(screen.queryByTestId("picture-life")).toBeNull();
    await fireEvent(screen.getByTestId("live-frame"), "layout", layout);
    expect(screen.getByTestId("picture-life")).toBeTruthy();
  });

  test("still, it shows just the picture", async () => {
    const layout = { nativeEvent: { layout: { width: 320, height: 180 } } };
    await render(
      <LiveFrame aspect={16 / 9} life={PICTURE_LIFE.ark} still>
        <Text>picture</Text>
      </LiveFrame>
    );
    await fireEvent(screen.getByTestId("live-frame"), "layout", layout);
    expect(screen.getByText("picture")).toBeTruthy();
    expect(screen.queryByTestId("picture-life")).toBeNull();
  });
});

describe("picture answers", () => {
  const places = [
    { id: "a", label: "Mina" },
    { id: "b", label: "Arafah" },
    { id: "c", label: "Muzdalifah" }
  ];

  test("every answer a place with its own picture gives picture cards; one plain answer, or two alike, gives none", () => {
    expect(Object.fromEntries(Object.entries(choicePictures(places) ?? {}).map(([id, picture]) => [id, picture.id]))).toEqual({ a: "mina", b: "arafah", c: "muzdalifah" });
    expect(choicePictures([...places.slice(0, 2), { id: "c", label: "Back home" }])).toBeUndefined();
    expect(choicePictures([{ id: "a", label: "Makkah" }, { id: "b", label: "Mecca" }, { id: "c", label: "Taif" }])).toBeUndefined();
    expect(choicePictures(places.slice(0, 2))).toBeUndefined();
  });

  test("a picture-answer question is asked with its tiles, not as a gap or true-or-false", () => {
    const challenge = { id: "q1", type: "multiple_choice" as const, prompt: "Pilgrims stand at ____ on the 9th.", choices: places, correctChoiceId: "b" };
    const variety = (globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__;
    (globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = true;
    try {
      expect(questionFormat(challenge)).toBe("blank");
      expect(questionFormat(challenge, { pictures: true })).toBe("choose");
    } finally {
      (globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = variety;
    }
  });

  test("each answer tile shows its place", async () => {
    await render(
      <ExerciseView
        kind="multiple_choice"
        prompt="After Arafah, pilgrims spend the night at ____."
        choices={places}
        choicePictures={choicePictures(places)}
        mascotVariant="boy"
        accent="#21B573"
        onSelect={jest.fn()}
        onCheck={jest.fn()}
        onContinue={jest.fn()}
      />
    );
    for (const choice of places) expect(screen.getByTestId(`choice-${choice.id}-picture`, { includeHiddenElements: true })).toBeTruthy();
  });
});
