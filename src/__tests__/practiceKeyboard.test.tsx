jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, Keyboard, StyleSheet } from "react-native";
import { act, render, screen } from "@testing-library/react-native";
import { FoundationAssessmentScreen } from "../components/FoundationLearning";
import { FOUNDATION_QUESTION_BANK } from "../data/foundationQuestionBank";
import { createEmptyLearnerProfile, createFoundationAssessment } from "../services/foundationAssessment";

type Listener = (event?: unknown) => void;

describe("a typed practice answer and the keyboard", () => {
  const listeners = new Map<string, Set<Listener>>();
  const emit = (name: string, event?: unknown) => listeners.get(name)?.forEach((listener) => listener(event));

  beforeEach(() => {
    listeners.clear();
    jest.spyOn(Keyboard, "addListener").mockImplementation(((name: string, listener: Listener) => {
      const set = listeners.get(name) ?? new Set<Listener>();
      set.add(listener);
      listeners.set(name, set);
      return { remove: () => set.delete(listener) };
    }) as never);
  });

  afterEach(() => jest.restoreAllMocks());

  const rootPadding = () => StyleSheet.flatten(screen.getByTestId("assessment-screen").props.style).paddingBottom;

  it("moves CHECK and the field up above the keyboard, then back down when it closes", async () => {
    const question = FOUNDATION_QUESTION_BANK.find((item) => item.type === "reflection_prompt")!;
    const state = { ...createFoundationAssessment(createEmptyLearnerProfile(), "daily_challenge"), currentQuestion: question };
    await render(<FoundationAssessmentScreen assessment={state} language="en" selectedAnswer={undefined} onChangeSelectedAnswer={jest.fn()} onSubmit={jest.fn()} onContinue={jest.fn()} onExit={jest.fn()} />);
    expect(screen.getByPlaceholderText("Write a few words")).toBeTruthy();
    expect(rootPadding()).toBeUndefined();

    const windowHeight = Dimensions.get("window").height;
    await act(async () => {
      emit("keyboardWillChangeFrame", { endCoordinates: { height: 300, screenY: windowHeight - 300, screenX: 0, width: 390 } });
      emit("keyboardDidShow", { endCoordinates: { height: 300, screenY: windowHeight - 300, screenX: 0, width: 390 } });
    });
    expect(rootPadding()).toBe(300);

    await act(async () => {
      emit("keyboardWillHide");
      emit("keyboardDidHide");
    });
    expect(rootPadding()).toBeUndefined();
  });
});
