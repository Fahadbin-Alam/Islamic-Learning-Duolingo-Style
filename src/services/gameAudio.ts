type GameSoundEvent =
  | "node_tap"
  | "correct"
  | "wrong"
  | "xp"
  | "unlock"
  | "lesson_complete"
  | "streak"
  | "reward_chest"
  | "soft_ui";

type SoundTone = {
  frequency: number;
  durationMs: number;
  delayMs?: number;
  gain?: number;
  type?: OscillatorType;
};

type SoundPreferences = {
  enabled?: boolean;
  reduced?: boolean;
};

const SOUND_LIBRARY: Record<GameSoundEvent, SoundTone[]> = {
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
  ]
};

let audioContext: AudioContext | null = null;

export function playGameSound(event: GameSoundEvent, preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return;
  }

  const context = getAudioContext();

  if (!context) {
    return;
  }

  const reduced = Boolean(preferences?.reduced);
  const tones = reduced ? SOUND_LIBRARY[event].slice(0, Math.max(1, Math.ceil(SOUND_LIBRARY[event].length / 2))) : SOUND_LIBRARY[event];
  const now = context.currentTime;

  try {
    for (const tone of tones) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = now + ((tone.delayMs ?? 0) / 1000);
      const durationSeconds = Math.max(0.03, tone.durationMs / 1000 * (reduced ? 0.76 : 1));
      const peakGain = Math.max(0.001, (tone.gain ?? 0.03) * (reduced ? 0.6 : 1));

      oscillator.type = tone.type ?? "triangle";
      oscillator.frequency.setValueAtTime(tone.frequency, startAt);
      oscillator.connect(gain);
      gain.connect(context.destination);
      gain.gain.setValueAtTime(0.001, startAt);
      gain.gain.linearRampToValueAtTime(peakGain, startAt + Math.min(0.025, durationSeconds * 0.35));
      gain.gain.exponentialRampToValueAtTime(0.001, startAt + durationSeconds);

      oscillator.start(startAt);
      oscillator.stop(startAt + durationSeconds);
    }
  } catch {
    // Keep sound optional and never block the learning flow.
  }
}

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const AudioCtor =
    (window as typeof window & { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext }).AudioContext ??
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioCtor();
  }

  if (audioContext.state === "suspended") {
    void audioContext.resume().catch(() => undefined);
  }

  return audioContext;
}

export type { GameSoundEvent, SoundPreferences };
