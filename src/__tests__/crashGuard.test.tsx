import React from "react";
import { Text } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { CrashGuard } from "../ui/CrashGuard";

// A bug while drawing a screen shows a "try again" page instead of closing the app.

let broken = true;
function Screen() {
  if (broken) throw new Error("boom");
  return <Text>Path</Text>;
}

describe("CrashGuard", () => {
  it("shows TRY AGAIN on a crash and draws the app fresh after it", async () => {
    const quiet = jest.spyOn(console, "error").mockImplementation(() => undefined);
    await render(
      <CrashGuard>
        <Screen />
      </CrashGuard>
    );
    expect(screen.getByTestId("crash-guard")).toBeTruthy();
    expect(screen.getByText("Your progress is saved. Tap below to go back and keep learning.")).toBeTruthy();
    broken = false;
    await fireEvent.press(screen.getByTestId("crash-guard-retry"));
    expect(screen.getByText("Path")).toBeTruthy();
    expect(screen.queryByTestId("crash-guard")).toBeNull();
    quiet.mockRestore();
  });
});
