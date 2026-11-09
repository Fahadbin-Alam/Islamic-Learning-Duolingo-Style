import React from "react";
import { act, render, screen } from "@testing-library/react-native";
import { Mascot } from "../ui/Mascot";
import { ChoiceTile } from "../ui/ChoiceTile";
import { ComboBadge, isComboMilestone } from "../ui/lesson/LessonHeader";
import { longAnswerGivesAway, fillPiece, questionFormat } from "../ui/lesson/questionFormats";
import { answerInName } from "../data/importedNotes";
import type { Challenge } from "../types";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

describe("version 18: livelier teacher and answers", () => {
  it("gives every kid its own light-and-shade gradients", async () => {
    const { toJSON } = await render(
      <>
        <Mascot mood="happy" />
        <Mascot mood="happy" />
      </>
    );
    const ids = new Set(JSON.stringify(toJSON()).match(/"(mk\d+)-skin"/g));
    expect(ids.size).toBe(2);
  });

  it("plays an act without breaking the picture", async () => {
    const { rerender } = await render(<Mascot mood="think" act={{ kind: "lean", key: 1 }} />);
    await rerender(<Mascot mood="cheer" act={{ kind: "celebrate", key: 2 }} />);
    await rerender(<Mascot mood="sad" act={{ kind: "no", key: 3 }} />);
    expect(screen.toJSON()).toBeTruthy();
  });

  it("bursts sparkles when a picked tile turns out right, not when the answer is only shown", async () => {
    const { rerender } = await render(<ChoiceTile label="Abu Bakr" state="selected" testID="t" />);
    await rerender(<ChoiceTile label="Abu Bakr" state="correct" testID="t" />);
    expect(screen.queryByTestId("correct-burst")).toBeTruthy();
    const other = await render(<ChoiceTile label="Umar" state="idle" testID="u" />);
    await other.rerender(<ChoiceTile label="Umar" state="correct" testID="u" />);
    expect(other.queryByTestId("correct-burst")).toBeNull();
  });

  it("pops the in-a-row badge at 3, 5, 10, 15", async () => {
    expect([1, 2, 3, 4, 5, 6, 10, 12, 15].filter(isComboMilestone)).toEqual([3, 5, 10, 15]);
    const { rerender } = await render(<ComboBadge inARow={2} top={60} />);
    expect(screen.queryByTestId("combo-badge")).toBeNull();
    await rerender(<ComboBadge inARow={3} top={60} />);
    expect(screen.getByTestId("combo-badge")).toBeTruthy();
    expect(screen.getByText("3 right in a row!")).toBeTruthy();
    await act(async () => {
      await new Promise((done) => setTimeout(done, 2100));
    });
    expect(screen.queryByTestId("combo-badge")).toBeNull();
  });
});

describe("version 18: fairer questions", () => {
  const long: Challenge = {
    id: "asr-x",
    type: "multiple_choice",
    prompt: "According to Surah Al-Asr, what helps rescue a person from loss?",
    choices: [
      { id: "a", label: "Faith, good deeds, truth, and patience" },
      { id: "b", label: "Only having money" },
      { id: "c", label: "Being famous" }
    ],
    correctChoiceId: "a",
    explanation: "Al-Asr 103:3."
  };

  it("never shows tiles whose right answer is given away by its length", () => {
    (globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = true;
    expect(longAnswerGivesAway(long)).toBe(true);
    expect(["check", "fill"]).toContain(questionFormat(long, {}));
    expect(questionFormat(long, { recall: true })).not.toBe("choose");
    (globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = false;
  });

  it("never offers a capitalised word for a lowercase gap", () => {
    const listen: Challenge = {
      id: "parents-x",
      type: "multiple_choice",
      prompt: "How should you listen to your parents?",
      choices: [
        { id: "a", label: "Listen carefully" },
        { id: "b", label: "Interrupt them quickly" },
        { id: "c", label: "Look at your phone instead" }
      ],
      correctChoiceId: "a",
      explanation: "x"
    };
    const fill = fillPiece(listen)!;
    expect(fill.piece).toBe("carefully");
    expect(fill.options.every((word) => /^[a-z]/.test(word))).toBe(true);
  });

  it("drops a father question whose answer is in the name", () => {
    const ask = (prompt: string, answer: string) => ({ prompt, choices: [{ id: "a", label: answer }, { id: "b", label: "Umar" }], correctChoiceId: "a" });
    expect(answerInName(ask("Who was the father of Hamzah ibn Abd al-Muttalib?", "Abd al-Muttalib"))).toBe(true);
    expect(answerInName(ask("Who was the father of Amr ibn al-Jamuh?", "Al-Jamuh"))).toBe(true);
    expect(answerInName(ask("Who was the father of Bilal?", "Rabah"))).toBe(false);
    expect(answerInName(ask("Who was the father of Khalid?", "Ali"))).toBe(false);
  });
});
