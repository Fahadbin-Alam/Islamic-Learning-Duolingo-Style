jest.mock("../services/gameAudio", () => ({ playGameSound: jest.fn(), primeGameAudio: jest.fn(() => true) }));

import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import { InviteCodeCard } from "../ui/screens/CrewView";
import type { InviteInfo } from "../services/backendSync";

const invite: InviteInfo = { code: "K7Q2XY", joined: 0, rewardDates: 50, unclaimedDates: 0, usedCode: false, canUseCode: true };

describe("InviteCodeCard", () => {
  it("shows the code and lets a new learner type a friend's code", async () => {
    const onRedeem = jest.fn();
    await render(<InviteCodeCard invite={invite} onRedeem={onRedeem} />);
    expect(screen.getByTestId("invite-code").props.children).toBe("K7Q2XY");
    expect(screen.getByText("Invite a friend and you both get 50 dates!")).toBeTruthy();

    await act(async () => fireEvent.press(screen.getByTestId("invite-code-open")));
    await act(async () => fireEvent.changeText(screen.getByTestId("invite-code-input"), " ab3cd5 "));
    await act(async () => fireEvent.press(screen.getByTestId("invite-code-use")));
    expect(onRedeem).toHaveBeenCalledWith("ab3cd5");
  });

  it("hides the code box once a code was used, and counts friends who joined", async () => {
    await render(<InviteCodeCard invite={{ ...invite, usedCode: true, canUseCode: false, joined: 3 }} onRedeem={jest.fn()} />);
    expect(screen.queryByTestId("invite-code-open")).toBeNull();
    expect(screen.getByText("Friends who joined with your code: 3")).toBeTruthy();
  });
});
