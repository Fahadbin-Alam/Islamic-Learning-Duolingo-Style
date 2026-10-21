jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Dimensions, Keyboard, StyleSheet } from "react-native";
import { act, render, screen } from "@testing-library/react-native";
import { AccountSheet } from "../ui/screens/AccountSheet";

type Listener = (event?: unknown) => void;

describe("sheets and the keyboard", () => {
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

  function panelStyle() {
    // The panel is the sheet overlay's last child (after the backdrop).
    const overlay = screen.getByTestId("account-sheet");
    const children = overlay.children as unknown as Array<{ props: { style: unknown } }>;
    return StyleSheet.flatten(children[children.length - 1].props.style as never) as Record<string, unknown>;
  }

  it("lifts the log in sheet above the keyboard, fits it in the space left, and drops it back down", async () => {
    await render(
      <AccountSheet
        visible
        mode="login"
        mascotVariant="hijabi"
        name=""
        email=""
        password=""
        onChangeMode={jest.fn()}
        onChangeName={jest.fn()}
        onChangeEmail={jest.fn()}
        onChangePassword={jest.fn()}
        onSubmit={jest.fn()}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("Welcome back!")).toBeTruthy();
    expect(panelStyle().bottom).toBe(0);

    const windowHeight = Dimensions.get("window").height;
    await act(async () => {
      emit("keyboardWillChangeFrame", { endCoordinates: { height: 300, screenY: windowHeight - 300, screenX: 0, width: 400 } });
    });
    expect(panelStyle().bottom).toBe(300);
    expect(panelStyle().maxHeight).toBe(windowHeight - 300 - 48);
    // The fields stay; the mascot steps aside to make room.
    expect(screen.getByTestId("account-email")).toBeTruthy();
    expect(screen.queryByText("Welcome back!")).toBeNull();

    await act(async () => {
      emit("keyboardWillHide");
    });
    expect(panelStyle().bottom).toBe(0);
    expect(screen.getByText("Welcome back!")).toBeTruthy();
  });
});
