import { useSyncExternalStore } from "react";

/**
 * Which scenery the Learn path shows, picked in Settings and kept on this phone only (it is a look, not
 * progress). "auto" lets each unit of a topic take its own place in turn: desert, beach, forest, snowy
 * mountains (and the camp at Badr on the Sahabah path).
 */
export type PathWorld = "desert" | "beach" | "forest" | "snow" | "camp";
export type PathWorldChoice = "auto" | PathWorld;

export const PATH_WORLD_CHOICES: readonly PathWorldChoice[] = ["auto", "desert", "beach", "forest", "snow", "camp"];

const KEY = "sira-path-path-world" as const;
const listeners = new Set<() => void>();
/** Used when the phone's storage can't load (a test without it): the pick lasts until the app closes. */
let memory: PathWorldChoice = "auto";

// Loaded when first needed, so a screen that shows the path never needs storage just to draw.
function storage(): typeof import("./appStorage") | null {
  try {
    return require("./appStorage") as typeof import("./appStorage");
  } catch {
    return null;
  }
}

export function getPathWorldChoice(): PathWorldChoice {
  const stored = storage()?.getStoredItem(KEY) ?? memory;
  return (PATH_WORLD_CHOICES as readonly string[]).includes(stored) ? (stored as PathWorldChoice) : "auto";
}

export function setPathWorldChoice(choice: PathWorldChoice) {
  memory = choice;
  storage()?.setStoredItem(KEY, choice);
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function usePathWorldChoice(): PathWorldChoice {
  return useSyncExternalStore(subscribe, getPathWorldChoice, getPathWorldChoice);
}
