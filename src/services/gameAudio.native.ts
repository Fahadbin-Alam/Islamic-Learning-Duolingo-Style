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
  soft_ui: { full: require("../../assets/sounds/soft_ui.wav"), reduced: require("../../assets/sounds/soft_ui_reduced.wav") }
};

const players = new Map<string, AudioPlayer>();
let audioModeSet = false;

export function playGameSound(event: GameSoundEvent, preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return;
  }

  try {
    const reduced = Boolean(preferences?.reduced);
    const key = `${event}${reduced ? "_reduced" : ""}`;
    let player = players.get(key);

    if (!player) {
      player = createAudioPlayer(SOUND_FILES[event][reduced ? "reduced" : "full"]);
      players.set(key, player);
    }

    void player.seekTo(0).catch(() => undefined);
    player.play();
  } catch {
    // Keep sound optional and never block the learning flow.
  }
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
