import type { AudioPlayer, AudioStatus } from "expo-audio";
import { isOnline } from "./network";
import { localAyahUri, saveAyahForOffline } from "./offlineAudio";

/**
 * One shared player for ayah recitations (see quranAudio.ts for the source): only one ayah plays at a
 * time, and starting another one stops the first. Repeat loops the ayah until it is turned off, for
 * memorizing. Game sounds keep their own players in gameAudio.
 * An ayah saved on the phone (offlineAudio.ts) plays from there, so it works with no internet; one that
 * streamed is saved after it starts, for next time. Cards still know an ayah by its web url.
 */
export type AyahPlayback = {
  url: string | null;
  status: "idle" | "loading" | "playing" | "error";
  repeat: boolean;
};

/** A recitation that has not started this long after Listen is shown as "could not load". */
export const AYAH_LOAD_TIMEOUT_MS = 12000;
/** How often the player reports where it is. */
const AYAH_STATUS_INTERVAL_MS = 100;

// Loaded on the first Listen, so screens that never play an ayah do not start the audio module.
const expoAudio = () => require("expo-audio") as typeof import("expo-audio");

let player: AudioPlayer | null = null;
let statusSubscription: { remove: () => void } | null = null;
let loadTimer: ReturnType<typeof setTimeout> | null = null;
let playingOnce = false;
let state: AyahPlayback = { url: null, status: "idle", repeat: false };
const listeners = new Set<(playback: AyahPlayback) => void>();

function setState(next: Partial<AyahPlayback>) {
  const wasActive = state.status === "loading" || state.status === "playing";
  state = { ...state, ...next };
  if (wasActive && (state.status === "idle" || state.status === "error")) {
    // Back to the game sounds' mode, which keeps the iPhone's silent switch.
    void expoAudio().setAudioModeAsync({ playsInSilentMode: false, interruptionMode: "mixWithOthers" }).catch(() => undefined);
  }
  listeners.forEach((listener) => listener(state));
}

function clearLoadTimer() {
  if (loadTimer) {
    clearTimeout(loadTimer);
    loadTimer = null;
  }
}

function onStatus(status: AudioStatus) {
  if (state.status === "idle" || state.status === "error") {
    return;
  }
  // The web player says "playing" as soon as play is asked for, even when the file never arrives (offline).
  // Only sound that has loaded counts, so the load timeout can still report a failed download.
  if (status.playing && status.isLoaded && status.duration > 0) {
    clearLoadTimer();
    if (state.status !== "playing") {
      setState({ status: "playing" });
      if (state.url && !localAyahUri(state.url)) {
        void saveAyahForOffline(state.url);
      }
    }
  } else if (status.didJustFinish && (!state.repeat || playingOnce)) {
    setState({ status: "idle" });
  }
}

export function getAyahPlayback() {
  return state;
}

export function subscribeAyahPlayback(listener: (playback: AyahPlayback) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Plays the ayah from its start. With the same ayah already loaded, it starts over without fetching again.
 * `once` plays it a single time even when Repeat is on (the word card's speaker, which has no Stop).
 * `resume` goes on from where stopAyah left it, when it is still the loaded ayah.
 */
export function playAyah(url: string, { once = false, resume = false }: { once?: boolean; resume?: boolean } = {}) {
  const saved = localAyahUri(url);
  // With no internet, an ayah not saved on the phone cannot play: say so now instead of after the load timeout.
  if (!saved && !isOnline()) {
    clearLoadTimer();
    try {
      player?.pause();
    } catch {
      // Nothing was playing.
    }
    setState({ url, status: "error" });
    return;
  }
  try {
    const { createAudioPlayer, setAudioModeAsync } = expoAudio();
    // A recitation the learner asked for plays even with the iPhone's silent switch on.
    void setAudioModeAsync({ playsInSilentMode: true, interruptionMode: "mixWithOthers" }).catch(() => undefined);
    const source = saved ?? url;
    if (!player) {
      // Status every 100 ms, not the default 500: the web player only reports "playing" on such an update, and the
      // first word of an ayah (often under half a second) should light up while it is recited (RecitedAyah).
      player = createAudioPlayer(source, { updateInterval: AYAH_STATUS_INTERVAL_MS });
      statusSubscription = player.addListener("playbackStatusUpdate", onStatus);
    } else if (state.url !== url) {
      player.pause();
      player.replace(source);
    } else if (!resume) {
      void player.seekTo(0).catch(() => undefined);
    }
    player.loop = state.repeat && !once;
    playingOnce = once;
    setState({ url, status: state.url === url && state.status === "playing" ? "playing" : "loading" });
    clearLoadTimer();
    loadTimer = setTimeout(() => {
      loadTimer = null;
      if (state.url === url && state.status === "loading") {
        player?.pause();
        setState({ status: "error" });
      }
    }, AYAH_LOAD_TIMEOUT_MS);
    player.play();
  } catch {
    setState({ url, status: "error" });
  }
}

/**
 * Stops the recitation. With a url, only when that ayah is the one playing (a card leaving the screen). It stops where
 * it is: playAyah(url, { resume: true }) goes on from there.
 */
export function stopAyah(url?: string) {
  if (url && state.url !== url) {
    return;
  }
  clearLoadTimer();
  try {
    player?.pause();
  } catch {
    // Stopping never blocks the lesson.
  }
  if (state.status !== "idle") {
    setState({ status: "idle" });
  }
}

/**
 * How far into the ayah the recitation is, in seconds, while `url` is the one playing (Repeat starts it again from
 * 0); undefined otherwise. For lighting up its words as they are recited (ayahWords.ts).
 */
export function ayahPosition(url: string): number | undefined {
  if (!player || state.url !== url || state.status !== "playing") {
    return undefined;
  }
  try {
    const seconds = player.currentTime;
    return Number.isFinite(seconds) ? seconds : undefined;
  } catch {
    return undefined;
  }
}

export function setAyahRepeat(repeat: boolean) {
  if (player && !playingOnce) {
    player.loop = repeat;
  }
  setState({ repeat });
}

/** Tests only: drops the shared player. */
export function resetAyahPlayerForTests() {
  clearLoadTimer();
  statusSubscription?.remove();
  statusSubscription = null;
  player = null;
  playingOnce = false;
  state = { url: null, status: "idle", repeat: false };
  listeners.clear();
}
