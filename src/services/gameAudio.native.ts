import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from "expo-audio";
import type { GameSoundEvent, SoundPreferences } from "./gameSoundLibrary";

// Android and iOS play the WAV files rendered by scripts/generate-game-sounds.mts
// from the same tone library the web synthesizes live.

const SOUND_FILES: Record<GameSoundEvent, { full: number; reduced: number }> = {
  node_tap: { full: require("../../assets/sounds/node_tap.wav"), reduced: require("../../assets/sounds/node_tap_reduced.wav") },
  correct: { full: require("../../assets/sounds/correct.wav"), reduced: require("../../assets/sounds/correct_reduced.wav") },
  wrong: { full: require("../../assets/sounds/wrong.wav"), reduced: require("../../assets/sounds/wrong_reduced.wav") },
  xp: { full: require("../../assets/sounds/xp.wav"), reduced: require("../../assets/sounds/xp_reduced.wav") },
  unlock: { full: require("../../assets/sounds/unlock.wav"), reduced: require("../../assets/sounds/unlock_reduced.wav") },
  lesson_complete: { full: require("../../assets/sounds/lesson_complete.wav"), reduced: require("../../assets/sounds/lesson_complete_reduced.wav") },
  streak: { full: require("../../assets/sounds/streak.wav"), reduced: require("../../assets/sounds/streak_reduced.wav") },
  reward_chest: { full: require("../../assets/sounds/reward_chest.wav"), reduced: require("../../assets/sounds/reward_chest_reduced.wav") },
  soft_ui: { full: require("../../assets/sounds/soft_ui.wav"), reduced: require("../../assets/sounds/soft_ui_reduced.wav") },
  camel: { full: require("../../assets/sounds/camel.wav"), reduced: require("../../assets/sounds/camel_reduced.wav") },
  splash: { full: require("../../assets/sounds/splash.wav"), reduced: require("../../assets/sounds/splash_reduced.wav") },
  boing: { full: require("../../assets/sounds/boing.wav"), reduced: require("../../assets/sounds/boing_reduced.wav") },
  giggle: { full: require("../../assets/sounds/giggle.wav"), reduced: require("../../assets/sounds/giggle_reduced.wav") },
  sad: { full: require("../../assets/sounds/sad.wav"), reduced: require("../../assets/sounds/sad_reduced.wav") },
  zoom: { full: require("../../assets/sounds/zoom.wav"), reduced: require("../../assets/sounds/zoom_reduced.wav") },
  spit: { full: require("../../assets/sounds/spit.wav"), reduced: require("../../assets/sounds/spit_reduced.wav") },
  sparkle: { full: require("../../assets/sounds/sparkle.wav"), reduced: require("../../assets/sounds/sparkle_reduced.wav") },
  thunder: { full: require("../../assets/sounds/thunder.wav"), reduced: require("../../assets/sounds/thunder_reduced.wav") },
  grow: { full: require("../../assets/sounds/grow.wav"), reduced: require("../../assets/sounds/grow_reduced.wav") },
  wilt: { full: require("../../assets/sounds/wilt.wav"), reduced: require("../../assets/sounds/wilt_reduced.wav") },
  grumble: { full: require("../../assets/sounds/grumble.wav"), reduced: require("../../assets/sounds/grumble_reduced.wav") },
  whoosh: { full: require("../../assets/sounds/whoosh.wav"), reduced: require("../../assets/sounds/whoosh_reduced.wav") }
};

const players = new Map<string, AudioPlayer>();
let audioModeSet = false;

export function playGameSound(event: GameSoundEvent, preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return;
  }

  try {
    const player = playerFor(event, Boolean(preferences?.reduced));

    void player.seekTo(0).catch(() => undefined);
    player.play();
  } catch {
    // Keep sound optional and never block the learning flow.
  }
}

/** The sounds nearly every screen plays: loaded ahead so their first tap does not wait for the file to open. */
const COMMON_SOUNDS: GameSoundEvent[] = ["soft_ui", "node_tap", "correct", "wrong", "xp", "whoosh"];
const PRELOAD_GAP_MS = 120;
let preloadTimer: ReturnType<typeof setTimeout> | undefined;

function playerFor(event: GameSoundEvent, reduced: boolean) {
  const key = `${event}${reduced ? "_reduced" : ""}`;
  let player = players.get(key);
  if (!player) {
    player = createAudioPlayer(SOUND_FILES[event][reduced ? "reduced" : "full"]);
    players.set(key, player);
  }
  return player;
}

/**
 * Opens the common sounds' players one at a time, a little apart, so no single frame pays for all of them. Without
 * it the first tap on each button opened its sound file right then, and that tap felt slow (sometimes like it missed).
 */
export function preloadGameSounds(preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return;
  }
  clearTimeout(preloadTimer);
  const reduced = Boolean(preferences?.reduced);
  const queue = [...COMMON_SOUNDS];
  const next = () => {
    const event = queue.shift();
    if (!event) {
      return;
    }
    try {
      playerFor(event, reduced);
    } catch {
      // Sound is optional.
    }
    preloadTimer = setTimeout(next, PRELOAD_GAP_MS);
  };
  preloadTimer = setTimeout(next, PRELOAD_GAP_MS);
}

export function primeGameAudio(preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return false;
  }

  if (!audioModeSet) {
    audioModeSet = true;
    // Game sounds mix with the learner's music and respect the iOS silent switch.
    void setAudioModeAsync({ playsInSilentMode: false, interruptionMode: "mixWithOthers" }).catch(() => undefined);
  }

  return true;
}

export function hasUnlockedGameAudio() {
  return true;
}

export type { GameSoundEvent, SoundPreferences };
