jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

const mockScheduled: Array<{ identifier: string; content: { title: string; data: { kind: string } } }> = [];
const mockCancelled: string[] = [];
let mockGranted = true;
let mockResponseListener: ((response: unknown) => void) | undefined;

jest.mock("expo-notifications", () => ({
  IosAuthorizationStatus: { PROVISIONAL: 3 },
  AndroidImportance: { DEFAULT: 3 },
  SchedulableTriggerInputTypes: { DATE: "date" },
  getPermissionsAsync: jest.fn(async () => ({ granted: mockGranted, canAskAgain: true })),
  requestPermissionsAsync: jest.fn(async () => ({ granted: true })),
  cancelScheduledNotificationAsync: jest.fn(async (id: string) => void mockCancelled.push(id)),
  scheduleNotificationAsync: jest.fn(async (request) => void mockScheduled.push(request)),
  setNotificationChannelAsync: jest.fn(async () => undefined),
  addNotificationResponseReceivedListener: jest.fn((listener) => {
    mockResponseListener = listener;
    return { remove: jest.fn() };
  }),
  getLastNotificationResponseAsync: jest.fn(async () => null)
}));

import { onPrayerNudgeOpened, schedulePrayerNudges } from "../services/prayerNudges.native";
import { defaultPrayerNudgePrefs } from "../services/prayerTimes";

const on = { ...defaultPrayerNudgePrefs(), enabled: true, cityId: "london" };

beforeEach(() => {
  mockScheduled.length = 0;
  mockCancelled.length = 0;
  mockGranted = true;
});

it("clears only its own nudges and schedules the planned ones", async () => {
  await schedulePrayerNudges(on, undefined, "en");
  expect(mockCancelled.length).toBe(15);
  expect(mockCancelled.every((id) => id.startsWith("muslimo-prayer-"))).toBe(true);
  expect(mockScheduled.length).toBeGreaterThan(0);
  expect(mockScheduled.every((request) => request.identifier.startsWith("muslimo-prayer-") && request.content.data.kind === "prayer")).toBe(true);
});

it("schedules nothing without notification permission or when off", async () => {
  mockGranted = false;
  await schedulePrayerNudges(on, undefined, "en");
  expect(mockScheduled).toEqual([]);

  mockGranted = true;
  await schedulePrayerNudges({ ...on, enabled: false }, undefined, "en");
  expect(mockScheduled).toEqual([]);
  expect(mockCancelled.length).toBe(30);
});

it("opens a lesson only for a tapped prayer nudge", () => {
  const onOpen = jest.fn();
  onPrayerNudgeOpened(onOpen);
  const tap = (kind: string, id = "a") => mockResponseListener?.({ notification: { date: 1, request: { identifier: id, content: { data: { kind } } } } });
  tap("streak");
  expect(onOpen).not.toHaveBeenCalled();
  tap("prayer");
  tap("prayer");
  expect(onOpen).toHaveBeenCalledTimes(1);
});
