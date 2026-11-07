jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Animated } from "react-native";
import { render, screen } from "@testing-library/react-native";
import { AppTopBar } from "../ui/screens";
import { DateCoin } from "../ui/DateCoin";
import { ICON_NAMES } from "../ui/Icon";

describe("dates, the app's coin", () => {
  it("has its own icon", () => {
    expect(ICON_NAMES).toContain("date");
  });

  it("is counted as dates in the top bar", async () => {
    await render(
      <AppTopBar topicId="prayer" topicTitle="Prayer" accent="#3A9FE8" streakDays={3} gems={1200} hearts={{ current: 4, max: 5, unlimited: false }} onOpenTopics={jest.fn()} onOpenShop={jest.fn()} />
    );
    expect(screen.getByRole("button", { name: "1,200 dates" })).toBeTruthy();
  });

  it("hops when its count changes, not when it first shows", async () => {
    const timing = jest.spyOn(Animated, "timing");
    const view = await render(<DateCoin size={26} playKey={10} />);
    expect(timing).not.toHaveBeenCalled();
    await view.rerender(<DateCoin size={26} playKey={30} />);
    expect(timing).toHaveBeenCalledTimes(1);
    timing.mockRestore();
  });
});
