import React from "react";
import { Platform, StyleSheet, Text } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import * as Haptics from "expo-haptics";
import { getDeviceSettings, resetDeviceSettingsForTests, setDeviceSetting } from "../services/deviceSettings";
import { haptic } from "../ui/sound";
import { useReduceMotion } from "../ui/motion";
import { scaleFont, textScaled } from "../ui/textScale";
import { SettingsSheet } from "../ui/screens";

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: "light", Medium: "medium", Heavy: "heavy" },
  NotificationFeedbackType: { Success: "success", Error: "error", Warning: "warning" }
}));

jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

const settingsProps = {
  visible: true,
  streakReminder: true,
  islamicReminder: false,
  dailyCheckIn: false,
  weeklyCheckIn: false,
  soundEnabled: true,
  softSound: false,
  onSelectRole: jest.fn(),
  onToggleStreak: jest.fn(),
  onToggleIslamic: jest.fn(),
  onToggleDaily: jest.fn(),
  onToggleWeekly: jest.fn(),
  onToggleSound: jest.fn(),
  onToggleSoftSound: jest.fn(),
  onSave: jest.fn(),
  onClose: jest.fn()
};

function MotionProbe() {
  return <Text testID="motion">{useReduceMotion() ? "calm" : "moving"}</Text>;
}

describe("this phone's settings", () => {
  beforeEach(() => {
    resetDeviceSettingsForTests();
    jest.clearAllMocks();
  });

  it("starts with vibration on, calm mode off and normal text", () => {
    expect(getDeviceSettings()).toEqual({ vibration: true, calm: false, bigText: false });
  });

  it("turning Vibration off stops every buzz", () => {
    const os = Platform.OS;
    Object.defineProperty(Platform, "OS", { value: "android", configurable: true });
    try {
      haptic("light");
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
      setDeviceSetting("vibration", false);
      haptic("light");
      haptic("success");
      expect(Haptics.impactAsync).toHaveBeenCalledTimes(1);
      expect(Haptics.notificationAsync).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(Platform, "OS", { value: os, configurable: true });
    }
  });

  it("calm mode stills the moving pictures, like the phone's reduce motion", async () => {
    await render(<MotionProbe />);
    expect(screen.getByTestId("motion")).toHaveTextContent("moving");
    await act(async () => setDeviceSetting("calm", true));
    expect(screen.getByTestId("motion")).toHaveTextContent("calm");
    await act(async () => setDeviceSetting("calm", false));
    expect(screen.getByTestId("motion")).toHaveTextContent("moving");
  });

  it("bigger text grows reading text but leaves small labels as they are", () => {
    const styles = textScaled(StyleSheet.create({ body: { fontSize: 20, lineHeight: 28 }, chip: { fontSize: 12, lineHeight: 16 }, box: { padding: 4 } }));
    expect(styles.body).toMatchObject({ fontSize: 20, lineHeight: 28 });
    expect(scaleFont(19)).toBe(19);
    setDeviceSetting("bigText", true);
    expect(styles.body).toMatchObject({ fontSize: 24, lineHeight: 34 });
    expect(styles.chip).toMatchObject({ fontSize: 12, lineHeight: 16 });
    expect(styles.box).toMatchObject({ padding: 4 });
    expect(scaleFont(19)).toBe(23);
  });

  it("Settings has switches for bigger text and calm mode that work at once", async () => {
    await render(<SettingsSheet {...settingsProps} />);
    expect(screen.getByTestId("settings-big-text").props.accessibilityState).toMatchObject({ checked: false });
    await fireEvent.press(screen.getByTestId("settings-big-text"));
    expect(getDeviceSettings().bigText).toBe(true);
    expect(screen.getByTestId("settings-big-text").props.accessibilityState).toMatchObject({ checked: true });
    await fireEvent.press(screen.getByTestId("settings-calm"));
    expect(getDeviceSettings().calm).toBe(true);
    // The save button is not needed for these.
    expect(settingsProps.onSave).not.toHaveBeenCalled();
  });

  it("shows the Vibration switch on phones", async () => {
    const os = Platform.OS;
    Object.defineProperty(Platform, "OS", { value: "ios", configurable: true });
    try {
      await render(<SettingsSheet {...settingsProps} />);
      await fireEvent.press(screen.getByTestId("settings-vibration"));
      expect(getDeviceSettings().vibration).toBe(false);
    } finally {
      Object.defineProperty(Platform, "OS", { value: os, configurable: true });
    }
  });
});

describe("smooth on slower phones", () => {
  const { looksLikeSlowPhone, framesLookSlow, setLiteMotionForTests } = jest.requireActual("../ui/liteMotion") as typeof import("../ui/liteMotion");

  afterEach(() => setLiteMotionForTests(false));

  it("counts old or low-resolution Androids as slow, never iPhones", () => {
    expect(looksLikeSlowPhone("android", 26, 2.75)).toBe(true);
    expect(looksLikeSlowPhone("android", 33, 1.5)).toBe(true);
    expect(looksLikeSlowPhone("android", 33, 2.75)).toBe(false);
    expect(looksLikeSlowPhone("ios", "15.0", 1)).toBe(false);
  });

  it("reads a slow frame rate from the middle frame, so one hiccup does not count", () => {
    expect(framesLookSlow(Array.from({ length: 60 }, () => 16.7))).toBe(false);
    expect(framesLookSlow([...Array.from({ length: 50 }, () => 16.7), ...Array.from({ length: 10 }, () => 200)])).toBe(false);
    expect(framesLookSlow(Array.from({ length: 60 }, () => 33))).toBe(true);
    expect(framesLookSlow([40, 40])).toBe(false);
  });

  it("a picture on a slow phone keeps only its first two moving things", async () => {
    const { LiveFrame } = jest.requireActual("../ui/lesson/LivePicture") as typeof import("../ui/lesson/LivePicture");
    // Four clouds: each draws one view, so the count is the number of moving things kept.
    const life = [0.15, 0.17, 0.19, 0.21].map((y) => ({ kind: "cloud" as const, y }));
    setLiteMotionForTests(true);
    await render(
      <LiveFrame aspect={4 / 3} life={life}>
        <Text>picture</Text>
      </LiveFrame>
    );
    await fireEvent(screen.getByTestId("live-frame"), "layout", { nativeEvent: { layout: { width: 320, height: 240 } } });
    expect(screen.getByTestId("picture-life").children).toHaveLength(2);
  });
});
