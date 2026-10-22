// Tone sequences for game sounds. The web plays them live with Web Audio;
// scripts/generate-game-sounds.ts renders them to WAV files for Android and iOS.

export type GameSoundEvent =
  | "node_tap"
  | "correct"
  | "wrong"
  | "xp"
  | "unlock"
  | "lesson_complete"
  | "streak"
  | "reward_chest"
  | "soft_ui"
  | "camel"
  | "splash"
  | "boing";

export type SoundTone = {
  frequency: number;
  durationMs: number;
  delayMs?: number;
  gain?: number;
  type?: "sine" | "triangle" | "sawtooth";
};

export type SoundPreferences = {
  enabled?: boolean;
  reduced?: boolean;
};

export const SOUND_LIBRARY: Record<GameSoundEvent, SoundTone[]> = {
  node_tap: [
    { frequency: 620, durationMs: 48, gain: 0.03, type: "triangle" },
    { frequency: 820, durationMs: 52, delayMs: 40, gain: 0.026, type: "triangle" }
  ],
  correct: [
    { frequency: 740, durationMs: 60, gain: 0.04, type: "triangle" },
    { frequency: 980, durationMs: 70, delayMs: 44, gain: 0.04, type: "triangle" },
    { frequency: 1240, durationMs: 90, delayMs: 92, gain: 0.032, type: "triangle" }
  ],
  wrong: [
    { frequency: 300, durationMs: 90, gain: 0.04, type: "sawtooth" },
    { frequency: 220, durationMs: 110, delayMs: 54, gain: 0.032, type: "sawtooth" }
  ],
  xp: [
    { frequency: 920, durationMs: 46, gain: 0.028, type: "triangle" },
    { frequency: 1180, durationMs: 54, delayMs: 32, gain: 0.028, type: "triangle" },
    { frequency: 1520, durationMs: 68, delayMs: 70, gain: 0.024, type: "triangle" }
  ],
  unlock: [
    { frequency: 520, durationMs: 54, gain: 0.03, type: "triangle" },
    { frequency: 760, durationMs: 62, delayMs: 36, gain: 0.03, type: "triangle" },
    { frequency: 1080, durationMs: 86, delayMs: 84, gain: 0.03, type: "triangle" }
  ],
  lesson_complete: [
    { frequency: 640, durationMs: 60, gain: 0.034, type: "triangle" },
    { frequency: 880, durationMs: 70, delayMs: 50, gain: 0.034, type: "triangle" },
    { frequency: 1160, durationMs: 84, delayMs: 104, gain: 0.03, type: "triangle" },
    { frequency: 1520, durationMs: 110, delayMs: 162, gain: 0.026, type: "triangle" }
  ],
  streak: [
    { frequency: 760, durationMs: 58, gain: 0.032, type: "triangle" },
    { frequency: 980, durationMs: 58, delayMs: 44, gain: 0.032, type: "triangle" },
    { frequency: 1320, durationMs: 72, delayMs: 92, gain: 0.032, type: "triangle" },
    { frequency: 1680, durationMs: 86, delayMs: 144, gain: 0.028, type: "triangle" }
  ],
  reward_chest: [
    { frequency: 560, durationMs: 52, gain: 0.034, type: "triangle" },
    { frequency: 820, durationMs: 62, delayMs: 34, gain: 0.034, type: "triangle" },
    { frequency: 1120, durationMs: 76, delayMs: 78, gain: 0.03, type: "triangle" },
    { frequency: 1480, durationMs: 90, delayMs: 132, gain: 0.026, type: "triangle" }
  ],
  soft_ui: [
    { frequency: 540, durationMs: 44, gain: 0.018, type: "sine" }
  ],
  // A tapped camel: a silly low gurgle, then a hum.
  camel: [
    { frequency: 150, durationMs: 46, gain: 0.05, type: "sawtooth" },
    { frequency: 118, durationMs: 46, delayMs: 34, gain: 0.05, type: "sawtooth" },
    { frequency: 156, durationMs: 46, delayMs: 68, gain: 0.05, type: "sawtooth" },
    { frequency: 112, durationMs: 46, delayMs: 102, gain: 0.05, type: "sawtooth" },
    { frequency: 150, durationMs: 46, delayMs: 136, gain: 0.05, type: "sawtooth" },
    { frequency: 104, durationMs: 46, delayMs: 170, gain: 0.05, type: "sawtooth" },
    { frequency: 140, durationMs: 46, delayMs: 204, gain: 0.05, type: "sawtooth" },
    { frequency: 96, durationMs: 46, delayMs: 238, gain: 0.05, type: "sawtooth" },
    { frequency: 210, durationMs: 120, delayMs: 292, gain: 0.04, type: "triangle" }
  ],
  // The bucket hits the water: a bloop, then drops falling back in.
  splash: [
    { frequency: 360, durationMs: 70, gain: 0.05, type: "sine" },
    { frequency: 620, durationMs: 70, delayMs: 50, gain: 0.05, type: "sine" },
    { frequency: 980, durationMs: 60, delayMs: 100, gain: 0.04, type: "sine" },
    { frequency: 1400, durationMs: 40, delayMs: 220, gain: 0.025, type: "sine" },
    { frequency: 1250, durationMs: 40, delayMs: 300, gain: 0.022, type: "sine" },
    { frequency: 1550, durationMs: 40, delayMs: 370, gain: 0.02, type: "sine" }
  ],
  // Any other picture beside the path: a springy pop.
  boing: [
    { frequency: 280, durationMs: 60, gain: 0.035, type: "triangle" },
    { frequency: 420, durationMs: 60, delayMs: 40, gain: 0.035, type: "triangle" },
    { frequency: 640, durationMs: 80, delayMs: 80, gain: 0.03, type: "triangle" }
  ]
};

export const GAME_SOUND_EVENTS = Object.keys(SOUND_LIBRARY) as GameSoundEvent[];

// Reduced mode plays the first half of each sequence, shorter and quieter.
export function getSoundTones(event: GameSoundEvent, reduced: boolean): SoundTone[] {
  const tones = SOUND_LIBRARY[event];
  return reduced ? tones.slice(0, Math.max(1, Math.ceil(tones.length / 2))) : tones;
}

export const REDUCED_DURATION_SCALE = 0.76;
export const REDUCED_GAIN_SCALE = 0.6;
