import { useEffect, useState } from "react";
import { Linking } from "react-native";

/**
 * Whether the phone has internet right now, for the few things that need it (sources on the web, Quran audio
 * not saved yet, sending progress to the server). Lessons, pictures, XP and streaks never need it.
 * expo-network tells us when the connection changes. Until it answers, and wherever it cannot run (tests),
 * the app assumes it is online, so nothing is hidden by mistake.
 */
type NetworkModule = typeof import("expo-network");

let online = true;
let started = false;
const listeners = new Set<(online: boolean) => void>();

// Loaded on first use, so tests and screens that never ask do not start the native module.
function networkModule(): NetworkModule | null {
  try {
    return require("expo-network") as NetworkModule;
  } catch {
    return null;
  }
}

/** Connected and, when the phone knows, able to reach the internet (a Wi-Fi with no internet counts as offline). */
export function readsOnline(state?: { isConnected?: boolean; isInternetReachable?: boolean | null } | null) {
  if (!state) return true;
  if (state.isConnected === false) return false;
  if (state.isInternetReachable === false) return false;
  return true;
}

export function setOnline(next: boolean) {
  if (next === online) return;
  online = next;
  listeners.forEach((listener) => listener(online));
}

function start() {
  if (started) return;
  started = true;
  const network = networkModule();
  if (!network) return;
  try {
    network.addNetworkStateListener((state) => setOnline(readsOnline(state)));
    void network
      .getNetworkStateAsync()
      .then((state) => setOnline(readsOnline(state)))
      .catch(() => undefined);
  } catch {
    // No network module on this device: stay "online" and let each request find out for itself.
  }
}

export function isOnline() {
  start();
  return online;
}

/** Calls `listener` each time the phone goes offline or comes back online. */
export function subscribeOnline(listener: (online: boolean) => void) {
  start();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useOnline() {
  const [value, setValue] = useState(isOnline);
  useEffect(() => {
    setValue(isOnline());
    return subscribeOnline(setValue);
  }, []);
  return value;
}

let offlineNotice: ((url: string) => void) | null = null;

/** What to show when a web page is asked for with no internet (TopicApp shows a short note). */
export function setOfflineLinkNotice(handler: ((url: string) => void) | null) {
  offlineNotice = handler;
}

/**
 * Opens a web page (a source, a photo's credit, the daily hadith). With no internet it says so in the app
 * instead of opening a browser on an error page.
 */
export function openWebPage(url: string) {
  if (!url) return;
  if (!isOnline() && offlineNotice) {
    offlineNotice(url);
    return;
  }
  void Linking.openURL(url).catch(() => undefined);
}

/** Tests only. */
export function resetNetworkForTests(next = true) {
  online = next;
  started = true;
  listeners.clear();
  offlineNotice = null;
}
