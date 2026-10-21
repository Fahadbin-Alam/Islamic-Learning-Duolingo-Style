import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { PortalHost } from "../ui/Portal";
import { AgeSheet } from "../ui/screens";

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

describe("AgeSheet", () => {
  it("picks nothing for the learner and saves only the band they tap", async () => {
    const onSave = jest.fn();
    await render(
      <PortalHost>
        <AgeSheet visible onSave={onSave} />
      </PortalHost>
    );

    await fireEvent.press(screen.getByTestId("age-save"));
    expect(onSave).not.toHaveBeenCalled();
    for (const id of ["6-9", "10-12", "13-17", "18+"]) {
      expect(screen.getByTestId(`age-${id}`).props.accessibilityState).toMatchObject({ selected: false });
    }

    await fireEvent.press(screen.getByTestId("age-10-12"));
    await fireEvent.press(screen.getByTestId("age-save"));
    expect(onSave).toHaveBeenCalledWith("10-12");
  });
});
