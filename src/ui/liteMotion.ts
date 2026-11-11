import { useSyncExternalStore } from "react";
import { InteractionManager, PixelRatio, Platform } from "react-native";

/**
 * Lite motion for slower phones: the moving pictures keep their life but lighter (the camera drift holds still and
 * each picture keeps only its first two moving things), so a cheap phone never stutters. Calm mode in Settings and
 * the phone's own "reduce motion" go further and stop the motion; this only trims it.
 *
 * A phone counts as slow when it is an old or low-resolution Android, or when a quiet moment after start-up shows
 * the app drawing under about 40 frames a second.
 */
const listeners = new Set<() => void>();
let lite: boolean | undefined;
let sampled = false;

/** Old Android (before 9) or a low-density screen: the phones that struggle most. */
export function looksLikeSlowPhone(os: string = Platform.OS, version: unknown = Platform.Version, density: number = PixelRatio.get()) {
  if (os !== "android") return false;
  const api = typeof version === "number" ? version : Number(version);
  return (Number.isFinite(api) && api < 28) || density < 2;
}

/** Frame gaps in ms → too slow? The middle gap tells, so one hiccup does not count. */
export function framesLookSlow(gaps: number[]) {
  if (gaps.length < 20) return false;
  const sorted = [...gaps].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] > 25;
}

function publish(value: boolean) {
  if (lite === value) return;
  lite = value;
  for (const listener of listeners) listener();
}

/** Watches ~2.5 s of frames once, in a quiet moment some seconds after start-up (phones only). */
function sampleFrames() {
  if (sampled || Platform.OS === "web" || typeof requestAnimationFrame !== "function") return;
  sampled = true;
  setTimeout(() => {
    InteractionManager.runAfterInteractions(() => {
      const gaps: number[] = [];
      let last = 0;
      const started = Date.now();
      const tick = (now: number) => {
        if (last) gaps.push(now - last);
        last = now;
        if (Date.now() - started < 2500) requestAnimationFrame(tick);
        else if (framesLookSlow(gaps)) publish(true);
      };
      requestAnimationFrame(tick);
    });
  }, 8000);
}

export function isLiteMotion() {
  if (lite === undefined) {
    lite = looksLikeSlowPhone();
    sampleFrames();
  }
  return lite;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** True on a slow phone: draw moving pictures lighter. */
export function useLiteMotion() {
  return useSyncExternalStore(subscribe, isLiteMotion, isLiteMotion);
}

/** For tests. */
export function setLiteMotionForTests(value: boolean | undefined) {
  sampled = true;
  lite = value;
  for (const listener of listeners) listener();
}

/** How many moving things a picture keeps in lite motion. */
export const LITE_LIFE = 2;
