import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ChoiceTile, GameButton, hasArabic } from "../ui";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

describe("ui kit", () => {
  it("GameButton calls onPress when pressed", async () => {
    const onPress = jest.fn();
    await render(<GameButton label="Start" onPress={onPress} />);

    await fireEvent.press(screen.getByRole("button", { name: "Start" }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("GameButton ignores presses when disabled", async () => {
    const onPress = jest.fn();
    await render(<GameButton label="Check" onPress={onPress} disabled />);

    await fireEvent.press(screen.getByText("CHECK"));

    expect(onPress).not.toHaveBeenCalled();
  });

  it("ChoiceTile renders its label", async () => {
    await render(<ChoiceTile label="Assalamu alaikum" state="selected" />);

    expect(screen.getByText("Assalamu alaikum")).toBeTruthy();
  });

  it("hasArabic detects Arabic letters", () => {
    expect(hasArabic("السَّلَامُ عَلَيْكُمْ")).toBe(true);
    expect(hasArabic("ﷺ")).toBe(true);
    expect(hasArabic("Salam")).toBe(false);
    expect(hasArabic("")).toBe(false);
  });
});
