jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import fs from "fs";
import path from "path";
import React from "react";
import { Dimensions, Linking } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { getLessonPicture, LESSON_PICTURE_IDS, pictureForLesson, pictureForQuestion, pictureForText } from "../data/lessonPictures";
import { getCatalog } from "../translations";
import { ExerciseView, LearnCard } from "../ui/lesson";

const ROOT = path.resolve(__dirname, "../..");
const credits: Record<string, { file: string; page: string; author: string; license: string }> = require("../data/lessonPictureCredits.json");
const places: { id: string; file: string }[] = require("../../scripts/lesson-pictures/places.json");
const imagesSource = fs.readFileSync(path.join(ROOT, "src/data/lessonPictureImages.ts"), "utf8");

async function onSmallPhone(run: () => Promise<void>) {
  const window = Dimensions.get("window");
  const screenSize = Dimensions.get("screen");
  Dimensions.set({ window: { ...window, width: 320, height: 568 }, screen: { ...screenSize, width: 320, height: 568 } });
  try {
    await run();
  } finally {
    screen.unmount();
    Dimensions.set({ window, screen: screenSize });
  }
}

describe("lesson photos", () => {
  test("every photo the app ships is chosen, downloaded, small and credited", () => {
    expect(LESSON_PICTURE_IDS.length).toBeGreaterThanOrEqual(10);
    for (const place of places) {
      const file = path.join(ROOT, "assets/pictures", `${place.id}.jpg`);
      expect(fs.existsSync(file)).toBe(true);
      // Small enough that all of them together barely change the app's size.
      expect(fs.statSync(file).size).toBeLessThan(90 * 1024);
      expect(imagesSource).toContain(`assets/pictures/${place.id}.jpg`);
      expect(credits[place.id]?.file).toBe(place.file);
      expect(LESSON_PICTURE_IDS).toContain(place.id);
    }
    expect(Object.keys(credits).sort()).toEqual(places.map((place) => place.id).sort());
  });

  test("only free licenses, each with an author and its Commons page", () => {
    for (const [id, credit] of Object.entries(credits)) {
      expect([id, credit.license]).toEqual([id, expect.stringMatching(/^(public domain|pd\b|cc0|cc[- ]by(-sa)?[- ]\d)/i)]);
      expect(credit.license).not.toMatch(/\b(nc|nd)\b/i);
      expect(credit.author.trim()).not.toBe("");
      expect(credit.page).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/);
    }
  });

  test("captions are translated in every language", () => {
    for (const language of ["ar", "bn", "ur"] as const) {
      const catalog = getCatalog(language);
      const missing = LESSON_PICTURE_IDS.map((id) => getLessonPicture(id)!.caption).filter((caption) => !catalog[caption]);
      expect([language, missing]).toEqual([language, []]);
    }
  });

  test("the most specific place wins, and names that only look like a place do not match", () => {
    const has = (id: string) => LESSON_PICTURE_IDS.includes(id);
    if (has("hira")) expect(pictureForText("The Cave of Hira is near Makkah.")?.id).toBe("hira");
    if (has("kaaba")) expect(pictureForText("The Ka'bah in Makkah is the House of Allah.")?.id).toBe("kaaba");
    // Ka'b ibn Malik and Ubayy ibn Ka'b are Companions, not the Kaaba.
    expect(pictureForText("Ka'b ibn Malik told the truth.")).toBeUndefined();
    expect(pictureForText("Ubayy ibn Ka'b recited well.")).toBeUndefined();
    expect(pictureForText("Aminah was his mother.")).toBeUndefined();
    expect(pictureForText("Be kind to your parents.")).toBeUndefined();
  });

  test("a question shows a photo only for a place its own prompt names, never one from its answers", () => {
    expect(pictureForQuestion("Where did the first revelation come?")).toBeUndefined();
    if (LESSON_PICTURE_IDS.includes("uhud")) expect(pictureForQuestion("Which mountain is Uhud?")?.id).toBe("uhud");
  });

  test("hundreds of lessons and questions get a photo", () => {
    const lessons = Object.values(LESSONS_BY_ID);
    const withPhoto = lessons.filter((lesson) => pictureForLesson(lesson));
    expect(withPhoto.length).toBeGreaterThan(100);
    const questions = lessons.flatMap((lesson) => lesson.challenges).filter((challenge) => pictureForQuestion(challenge.prompt));
    expect(questions.length).toBeGreaterThan(50);
  });
});

describe("photo on the learn card", () => {
  const picture = getLessonPicture(LESSON_PICTURE_IDS[0])!;
  const base = { title: "Growing up", line: "He grew up in Makkah.", mascotVariant: "boy", accent: "#21B573", onContinue: jest.fn() };

  test("shows the photo with its caption and credit, and opens the credit's Commons page", async () => {
    const open = jest.spyOn(Linking, "openURL").mockResolvedValue(true);
    await render(<LearnCard {...base} picture={picture} />);
    expect(screen.getByTestId("lesson-photo-image")).toBeTruthy();
    expect(screen.getByText(picture.caption)).toBeTruthy();
    const credit = screen.getByTestId("lesson-photo-credit");
    expect(credit).toHaveTextContent(`Photo: ${picture.credit.author}, ${picture.credit.license}`);
    await fireEvent.press(credit);
    expect(open).toHaveBeenCalledWith(picture.credit.page);
    open.mockRestore();
  });

  test("tapping the photo shows it big, and Close hides it", async () => {
    await render(<LearnCard {...base} picture={picture} />);
    expect(screen.queryByTestId("photo-sheet-image")).toBeNull();
    await fireEvent.press(screen.getByTestId("lesson-photo"));
    expect(screen.getByTestId("photo-sheet-image")).toBeTruthy();
    expect(screen.getByTestId("photo-sheet-credit")).toBeTruthy();
    await fireEvent.press(screen.getByTestId("photo-sheet-close"));
  });

  test("no photo, no photo box", async () => {
    await render(<LearnCard {...base} />);
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
  });

  test("on a 320px phone the photo fits the width and is shorter", async () => {
    await onSmallPhone(async () => {
      await render(<LearnCard {...base} picture={picture} />);
      const style = Object.assign({}, ...[screen.getByTestId("lesson-photo").props.style].flat(5).filter(Boolean));
      expect(style.width).toBe("100%");
      expect(style.maxHeight).toBeLessThanOrEqual(128);
      expect(screen.getByText(`Photo: ${picture.credit.author}, ${picture.credit.license}`).props.numberOfLines).toBe(1);
    });
  });
});

describe("photo next to a question", () => {
  const picture = getLessonPicture(LESSON_PICTURE_IDS[0])!;
  const question = {
    kind: "multiple_choice" as const,
    prompt: "Where was Abu Bakr born?",
    choices: [
      { id: "a", label: "Makkah" },
      { id: "b", label: "Madinah" }
    ],
    mascotVariant: "boy",
    accent: "#21B573",
    onSelect: jest.fn(),
    onCheck: jest.fn(),
    onContinue: jest.fn()
  };

  test("the photo takes the mascot's place, the same size", async () => {
    await render(<ExerciseView {...question} picture={picture} />);
    const thumb = screen.getByTestId("question-photo");
    const style = Object.assign({}, ...[thumb.props.style].flat(5).filter(Boolean));
    expect(style.width).toBe(96);
    expect(style.height).toBe(96);
  });

  test("on a 320px phone it is the small mascot's size", async () => {
    await onSmallPhone(async () => {
      await render(<ExerciseView {...question} picture={picture} />);
      const style = Object.assign({}, ...[screen.getByTestId("question-photo").props.style].flat(5).filter(Boolean));
      expect(style.width).toBeLessThanOrEqual(72);
    });
  });

  test("without a photo the question has no photo", async () => {
    await render(<ExerciseView {...question} />);
    expect(screen.queryByTestId("question-photo")).toBeNull();
  });
});
