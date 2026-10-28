import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { questionSource, shortReference } from "../services/questionSource";
import { ExerciseView, FeedbackSheet } from "../ui/lesson";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

// After every answer, right or wrong, the sheet names where the answer comes from, and a tap opens it.

describe("the answer sheet's source chip", () => {
  it("comes through ExerciseView's result", async () => {
    const choices = [
      { id: "a", label: "Makkah" },
      { id: "b", label: "Taif" }
    ];
    const view = (result?: React.ComponentProps<typeof ExerciseView>["result"]) => (
      <ExerciseView
        kind="multiple_choice"
        prompt="Abu Bakr grew up in ____."
        choices={choices}
        selectedChoiceId="a"
        correctChoiceId="a"
        result={result}
        mascotVariant="hijabi"
        accent="#1CB66D"
        onSelect={jest.fn()}
        onCheck={jest.fn()}
        onContinue={jest.fn()}
      />
    );
    const { rerender } = await render(view());
    await rerender(view({ correct: true, correctLabel: "Makkah", source: { label: "Bukhari 3905" } }));
    expect(screen.getByTestId("feedback-source")).toHaveTextContent("Bukhari 3905");
  });

  it("shows the source after a right answer and after a wrong one, and opens it", async () => {
    const onOpen = jest.fn();
    const { rerender } = await render(<FeedbackSheet visible correct source={{ label: "Bukhari 3754", onOpen }} onContinue={jest.fn()} />);
    expect(screen.getByTestId("feedback-source")).toHaveTextContent("Bukhari 3754");
    await fireEvent.press(screen.getByTestId("feedback-source"));
    expect(onOpen).toHaveBeenCalledTimes(1);

    await rerender(<FeedbackSheet visible correct={false} correctLabel="Makkah" why="He was from Quraysh." source={{ label: "Quran 9:40", onOpen }} onContinue={jest.fn()} />);
    expect(screen.getByTestId("feedback-source")).toHaveTextContent("Quran 9:40");
    expect(screen.getByLabelText("Open source Quran 9:40")).toBeTruthy();
  });

  it("shows no chip for a question with no source", async () => {
    await render(<FeedbackSheet visible correct onContinue={jest.fn()} />);
    expect(screen.queryByTestId("feedback-source")).toBeNull();
  });

});

describe("questionSource", () => {
  it("prefers the question's own source, then the learn-card source of the lesson it was first asked in", () => {
    const own = { id: "s", site: "Quran.com" as const, category: "tafsir" as const, title: "Quran 1:1", url: "https://quran.com/1/1", summary: "", reference: "Quran 1:1" };
    expect(questionSource({ source: own }, undefined)).toBe(own);
    const origin = Object.values(LESSONS_BY_ID).find((lesson) => lesson.learnSource)!;
    expect(questionSource({ sourceLessonId: origin.id }, { learnSource: own })).toBe(origin.learnSource);
    expect(questionSource({}, { learnSource: own })).toBe(own);
  });

  it("shortens collection names for the chip", () => {
    expect(shortReference("Sahih al-Bukhari 3754")).toBe("Bukhari 3754");
    expect(shortReference("Sahih Muslim 2401")).toBe("Muslim 2401");
    expect(shortReference("Sunan Abi Dawud 856")).toBe("Abu Dawud 856");
    expect(shortReference("Jami` at-Tirmidhi 2689")).toBe("Tirmidhi 2689");
    expect(shortReference("Surah 2")).toBe("Quran 2");
    expect(shortReference("Quran 9:40")).toBe("Quran 9:40");
  });
});
