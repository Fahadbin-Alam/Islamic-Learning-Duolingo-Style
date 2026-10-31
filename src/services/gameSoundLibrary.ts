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
  | "boing"
  | "giggle"
  | "sad"
  | "zoom"
  | "spit"
  | "sparkle"
  | "thunder"
  | "grow"
  | "wilt"
  | "grumble"
  | "whoosh"
  | "chirp"
  | "baa"
  | "snore"
  | "sizzle"
  | "pop"
  | "night";

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
  ],
  // Tap reactions on the path's characters and pictures.
  // A bubbly "hee-hee-hee": quick high hops going down.
  giggle: [
    { frequency: 880, durationMs: 60, gain: 0.03, type: "triangle" },
    { frequency: 1040, durationMs: 50, delayMs: 70, gain: 0.03, type: "triangle" },
    { frequency: 820, durationMs: 60, delayMs: 140, gain: 0.03, type: "triangle" },
    { frequency: 980, durationMs: 50, delayMs: 210, gain: 0.028, type: "triangle" },
    { frequency: 760, durationMs: 60, delayMs: 280, gain: 0.026, type: "triangle" },
    { frequency: 900, durationMs: 70, delayMs: 350, gain: 0.024, type: "triangle" }
  ],
  // A sad little "wah-wah" going down.
  sad: [
    { frequency: 440, durationMs: 160, gain: 0.03, type: "sine" },
    { frequency: 392, durationMs: 160, delayMs: 170, gain: 0.03, type: "sine" },
    { frequency: 349, durationMs: 160, delayMs: 340, gain: 0.03, type: "sine" },
    { frequency: 294, durationMs: 320, delayMs: 510, gain: 0.03, type: "sine" }
  ],
  // Running off fast: a rising zip.
  zoom: [
    { frequency: 300, durationMs: 50, gain: 0.03, type: "triangle" },
    { frequency: 450, durationMs: 50, delayMs: 30, gain: 0.03, type: "triangle" },
    { frequency: 650, durationMs: 50, delayMs: 60, gain: 0.03, type: "triangle" },
    { frequency: 900, durationMs: 50, delayMs: 90, gain: 0.03, type: "triangle" },
    { frequency: 1200, durationMs: 80, delayMs: 120, gain: 0.026, type: "triangle" }
  ],
  // A silly "ptoo!": a puff, then a pop.
  spit: [
    { frequency: 180, durationMs: 60, gain: 0.04, type: "sawtooth" },
    { frequency: 900, durationMs: 40, delayMs: 90, gain: 0.04, type: "sine" },
    { frequency: 500, durationMs: 60, delayMs: 130, gain: 0.03, type: "sine" }
  ],
  // Magic sparkle: quick high twinkles going up.
  sparkle: [
    { frequency: 1320, durationMs: 50, gain: 0.022, type: "sine" },
    { frequency: 1760, durationMs: 50, delayMs: 50, gain: 0.022, type: "sine" },
    { frequency: 1580, durationMs: 50, delayMs: 100, gain: 0.02, type: "sine" },
    { frequency: 2100, durationMs: 90, delayMs: 150, gain: 0.02, type: "sine" }
  ],
  // A soft rumble of thunder (kept gentle for little ones).
  thunder: [
    { frequency: 70, durationMs: 220, gain: 0.06, type: "sawtooth" },
    { frequency: 55, durationMs: 260, delayMs: 120, gain: 0.06, type: "sawtooth" },
    { frequency: 62, durationMs: 300, delayMs: 300, gain: 0.05, type: "sawtooth" },
    { frequency: 48, durationMs: 360, delayMs: 520, gain: 0.04, type: "sawtooth" }
  ],
  // Something growing: a slow rising sweep.
  grow: [
    { frequency: 330, durationMs: 80, gain: 0.026, type: "sine" },
    { frequency: 440, durationMs: 80, delayMs: 70, gain: 0.026, type: "sine" },
    { frequency: 554, durationMs: 80, delayMs: 140, gain: 0.026, type: "sine" },
    { frequency: 660, durationMs: 80, delayMs: 210, gain: 0.026, type: "sine" },
    { frequency: 880, durationMs: 140, delayMs: 280, gain: 0.024, type: "sine" }
  ],
  // Drooping: a slow falling sweep.
  wilt: [
    { frequency: 520, durationMs: 120, gain: 0.026, type: "sine" },
    { frequency: 440, durationMs: 120, delayMs: 110, gain: 0.026, type: "sine" },
    { frequency: 370, durationMs: 120, delayMs: 220, gain: 0.024, type: "sine" },
    { frequency: 300, durationMs: 220, delayMs: 330, gain: 0.022, type: "sine" }
  ],
  // A grumpy "hmph-hmph".
  grumble: [
    { frequency: 160, durationMs: 90, gain: 0.04, type: "sawtooth" },
    { frequency: 140, durationMs: 90, delayMs: 120, gain: 0.04, type: "sawtooth" },
    { frequency: 175, durationMs: 120, delayMs: 260, gain: 0.035, type: "sawtooth" }
  ],
  // Wind: a soft rise and fall.
  whoosh: [
    { frequency: 260, durationMs: 120, gain: 0.02, type: "sine" },
    { frequency: 340, durationMs: 120, delayMs: 90, gain: 0.022, type: "sine" },
    { frequency: 300, durationMs: 160, delayMs: 180, gain: 0.02, type: "sine" }
  ],
  // Birds: two quick high tweets.
  chirp: [
    { frequency: 2200, durationMs: 40, gain: 0.02, type: "sine" },
    { frequency: 2900, durationMs: 50, delayMs: 45, gain: 0.02, type: "sine" },
    { frequency: 2300, durationMs: 40, delayMs: 160, gain: 0.018, type: "sine" },
    { frequency: 3100, durationMs: 60, delayMs: 205, gain: 0.018, type: "sine" }
  ],
  // A wobbly sheep "baa-a-a".
  baa: [
    { frequency: 420, durationMs: 90, gain: 0.03, type: "sawtooth" },
    { frequency: 400, durationMs: 90, delayMs: 80, gain: 0.028, type: "sawtooth" },
    { frequency: 430, durationMs: 90, delayMs: 160, gain: 0.026, type: "sawtooth" },
    { frequency: 390, durationMs: 140, delayMs: 240, gain: 0.022, type: "sawtooth" }
  ],
  // A soft snore: a low hum in, a breathy hum out.
  snore: [
    { frequency: 90, durationMs: 380, gain: 0.03, type: "sawtooth" },
    { frequency: 140, durationMs: 300, delayMs: 520, gain: 0.014, type: "sine" }
  ],
  // Cooking on the fire: little crackles.
  sizzle: [
    { frequency: 1800, durationMs: 30, gain: 0.016, type: "sawtooth" },
    { frequency: 2400, durationMs: 25, delayMs: 60, gain: 0.014, type: "sawtooth" },
    { frequency: 2000, durationMs: 30, delayMs: 130, gain: 0.016, type: "sawtooth" },
    { frequency: 2600, durationMs: 25, delayMs: 190, gain: 0.012, type: "sawtooth" },
    { frequency: 2200, durationMs: 30, delayMs: 260, gain: 0.014, type: "sawtooth" },
    { frequency: 2800, durationMs: 25, delayMs: 330, gain: 0.01, type: "sawtooth" }
  ],
  // A bubbly pop.
  pop: [
    { frequency: 500, durationMs: 40, gain: 0.034, type: "sine" },
    { frequency: 1100, durationMs: 50, delayMs: 30, gain: 0.03, type: "sine" }
  ],
  // Night falls: a slow, soft lullaby going down.
  night: [
    { frequency: 784, durationMs: 220, gain: 0.02, type: "sine" },
    { frequency: 659, durationMs: 220, delayMs: 200, gain: 0.02, type: "sine" },
    { frequency: 523, durationMs: 220, delayMs: 400, gain: 0.02, type: "sine" },
    { frequency: 392, durationMs: 420, delayMs: 600, gain: 0.018, type: "sine" }
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
