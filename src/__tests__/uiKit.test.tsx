import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { ChoiceTile, GameButton, hasArabic, isArabicOnly } from "../ui";
import { isQuranText, withHonorifics } from "../ui/ArabicText";

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
    expect(hasArabic("Salam")).toBe(false);
    expect(hasArabic("")).toBe(false);
  });

  it("treats ﷺ as part of the English line, drawn in the Naskh face", async () => {
    expect(hasArabic("ﷺ")).toBe(false);
    expect(hasArabic("Which tribe was Muhammad ﷺ from?")).toBe(false);
    expect(isArabicOnly("محمد ﷺ")).toBe(true);
    expect(withHonorifics("Salam")).toBe("Salam");
    await render(<ChoiceTile label="Muhammad ﷺ" />);
    expect(screen.getByText("Muhammad ﷺ")).toBeTruthy();
    expect(screen.getByText("ﷺ")).toHaveStyle({ fontFamily: "NotoNaskhArabic_600SemiBold" });
  });

  it("ChoiceTile uses the smaller text for a long set, even on a short label", async () => {
    await render(<ChoiceTile label="Short one" long />);
    expect(screen.getByText("Short one")).toHaveStyle({ fontSize: 15 });
  });

  it("isQuranText spots Uthmani marks and long paragraphs", () => {
    expect(isQuranText("ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ")).toBe(true);
    expect(isQuranText("السَّلَامُ عَلَيْكُمْ")).toBe(false);
  });
});
