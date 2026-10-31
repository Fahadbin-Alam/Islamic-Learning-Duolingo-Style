import React from "react";
import { View } from "react-native";
import { render, screen } from "@testing-library/react-native";

// The real scroll view, not the jest stand-in: what it does with a tap is patched (patches/react-native+*.patch).
const RealScrollView = jest.requireActual("react-native/Libraries/Components/ScrollView/ScrollView").default;

type Handlers = Record<string, (event?: unknown) => unknown>;

let now = 1000;
beforeEach(() => {
  now = 1000;
  jest.spyOn(global.performance, "now").mockImplementation(() => now);
});
afterEach(() => jest.restoreAllMocks());

async function scrollView(): Promise<Handlers> {
  await render(
    <RealScrollView testID="list">
      <View testID="button" />
    </RealScrollView>
  );
  return screen.getByTestId("list").props as Handlers;
}

const touch = (count: number) => ({ nativeEvent: { touches: Array.from({ length: count }, () => ({})) }, target: {} });
const scrolled = { nativeEvent: { contentOffset: { x: 0, y: 100 }, velocity: { x: 0, y: 0 } } };

describe("a tap after scrolling lands the first time", () => {
  it("still gives a gliding list the tap that stops it", async () => {
    const list = await scrollView();
    list.onMomentumScrollBegin(scrolled);
    now += 16;
    list.onScroll(scrolled);
    now += 16;
    expect(list.onStartShouldSetResponderCapture(touch(1))).toBe(true);
  });

  it("lets the tap through once the glide has stopped, even with no momentum end (a touch stopped it on iPhone)", async () => {
    const list = await scrollView();
    list.onMomentumScrollBegin(scrolled);
    list.onScroll(scrolled);
    // A finger stops the glide: iOS sends a drag but never the momentum end.
    list.onScrollBeginDrag(scrolled);
    list.onScrollEndDrag(scrolled);
    now += 400;
    expect(list.onStartShouldSetResponderCapture(touch(1))).toBe(false);
  });

  it("never takes a tap from a button for a scroll the finger did not start", async () => {
    const list = await scrollView();
    list.onTouchStart(touch(1));
    // The last frames of a glide, or a scroll the app started, while the finger is down.
    list.onScroll(scrolled);
    expect(list.onScrollShouldSetResponder()).toBe(false);
  });

  it("still takes the touch when the finger really drags the list, and forgets it on the next tap", async () => {
    const list = await scrollView();
    list.onTouchStart(touch(1));
    list.onScrollBeginDrag(scrolled);
    list.onScroll(scrolled);
    expect(list.onScrollShouldSetResponder()).toBe(true);
    list.onTouchEnd(touch(0));
    list.onTouchStart(touch(1));
    list.onScroll(scrolled);
    expect(list.onScrollShouldSetResponder()).toBe(false);
  });
});
