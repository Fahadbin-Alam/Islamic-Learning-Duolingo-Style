import type { AudioPlayer, AudioStatus } from "expo-audio";

/**
 * One shared player for ayah recitations (see quranAudio.ts for the source): only one ayah plays at a
 * time, and starting another one stops the first. Repeat loops the ayah until it is turned off, for
 * memorizing. Game sounds keep their own players in gameAudio.
 */
export type AyahPlayback = {
  url: string | null;
  status: "idle" | "loading" | "playing" | "error";
  repeat: boolean;
};

/** A recitation that has not started this long after Listen is shown as "could not load". */
export const AYAH_LOAD_TIMEOUT_MS = 12000;

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
  if (status.playing) {
    clearLoadTimer();
    if (state.status !== "playing") {
      setState({ status: "playing" });
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
 */
export function playAyah(url: string, { once = false }: { once?: boolean } = {}) {
  try {
    const { createAudioPlayer, setAudioModeAsync } = expoAudio();
    // A recitation the learner asked for plays even with the iPhone's silent switch on.
    void setAudioModeAsync({ playsInSilentMode: true, interruptionMode: "mixWithOthers" }).catch(() => undefined);
    if (!player) {
      player = createAudioPlayer(url);
      statusSubscription = player.addListener("playbackStatusUpdate", onStatus);
    } else if (state.url !== url) {
      player.pause();
      player.replace(url);
    } else {
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

/** Stops the recitation. With a url, only when that ayah is the one playing (a card leaving the screen). */
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
