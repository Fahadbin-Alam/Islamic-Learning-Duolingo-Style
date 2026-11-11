import { useSyncExternalStore } from "react";

/**
 * Settings that belong to this phone, not to the account: whether taps buzz, a calm mode with less motion, and bigger
 * lesson text. Changed in Settings and applied at once (no Save), like the path scenery.
 */
export type DeviceSettings = {
  /** Small vibrations on taps, answers and matches. On by default. */
  vibration: boolean;
  /** Fewer moving things: the same as the phone's own "reduce motion". */
  calm: boolean;
  /** Bigger words in lessons and questions. */
  bigText: boolean;
};

export const DEFAULT_DEVICE_SETTINGS: DeviceSettings = { vibration: true, calm: false, bigText: false };

/** How much bigger lesson text is with "Bigger text" on. */
export const BIG_TEXT_SCALE = 1.2;

const KEY = "sira-path-device-settings" as const;
const listeners = new Set<() => void>();
let memory: DeviceSettings | undefined;

function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

export function getDeviceSettings(): DeviceSettings {
  if (memory) return memory;
  let saved: Partial<DeviceSettings> = {};
  try {
    const raw = storage()?.getStoredItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : null;
    if (parsed && typeof parsed === "object") saved = parsed as Partial<DeviceSettings>;
  } catch {
    saved = {};
  }
  memory = {
    vibration: typeof saved.vibration === "boolean" ? saved.vibration : DEFAULT_DEVICE_SETTINGS.vibration,
    calm: typeof saved.calm === "boolean" ? saved.calm : DEFAULT_DEVICE_SETTINGS.calm,
    bigText: typeof saved.bigText === "boolean" ? saved.bigText : DEFAULT_DEVICE_SETTINGS.bigText
  };
  return memory;
}

export function setDeviceSetting<K extends keyof DeviceSettings>(key: K, value: DeviceSettings[K]) {
  memory = { ...getDeviceSettings(), [key]: value };
  try {
    storage()?.setStoredItem(KEY, JSON.stringify(memory));
  } catch {
    // Kept in memory for this run.
  }
  for (const listener of listeners) listener();
}

export function subscribeDeviceSettings(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useDeviceSettings(): DeviceSettings {
  return useSyncExternalStore(subscribeDeviceSettings, getDeviceSettings, getDeviceSettings);
}

/** 1, or BIG_TEXT_SCALE with "Bigger text" on: multiply a lesson text's font size and line height by it. */
export function useTextScale(): number {
  return useDeviceSettings().bigText ? BIG_TEXT_SCALE : 1;
}

/** For tests: back to the defaults. */
export function resetDeviceSettingsForTests() {
  memory = undefined;
  storage()?.setStoredItem(KEY, "");
}
