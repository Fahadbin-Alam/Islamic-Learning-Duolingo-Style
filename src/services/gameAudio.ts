import {
  REDUCED_DURATION_SCALE,
  REDUCED_GAIN_SCALE,
  getSoundTones,
  type GameSoundEvent,
  type SoundPreferences
} from "./gameSoundLibrary";

// Web sounds are synthesized live. Android and iOS use gameAudio.native.ts.

let audioContext: AudioContext | null = null;
let audioUnlocked = false;

/**
 * A sound asked for while the context was still waking up plays when it is running, but only
 * this soon after it was asked for: a resume that waits for a later tap must not play old sounds.
 */
const RESUME_PLAY_WINDOW_MS = 500;

export function playGameSound(event: GameSoundEvent, preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return;
  }

  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === "running") {
    playTones(context, event, preferences);
    return;
  }

  if (context.state === "closed") {
    return;
  }

  // Browsers start the context suspended until the first tap (Safari also "interrupted" after a
  // call). Resume it inside this tap and play once it runs, so the very first tap is not silent.
  const askedAt = Date.now();

  try {
    void context.resume().then(() => {
      audioUnlocked = context.state === "running";

      if (audioUnlocked && Date.now() - askedAt <= RESUME_PLAY_WINDOW_MS) {
        playTones(context, event, preferences);
      }
    }).catch(() => undefined);
  } catch {
    // Sound is optional.
  }
}

function playTones(context: AudioContext, event: GameSoundEvent, preferences?: SoundPreferences) {
  const reduced = Boolean(preferences?.reduced);
  const tones = getSoundTones(event, reduced);
  const now = context.currentTime;

  try {
    for (const tone of tones) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const startAt = now + ((tone.delayMs ?? 0) / 1000);
      const durationSeconds = Math.max(0.03, tone.durationMs / 1000 * (reduced ? REDUCED_DURATION_SCALE : 1));
      const peakGain = Math.max(0.001, (tone.gain ?? 0.03) * (reduced ? REDUCED_GAIN_SCALE : 1));

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

export function primeGameAudio(preferences?: SoundPreferences) {
  if (preferences?.enabled === false) {
    return false;
  }

  const context = getAudioContext();

  if (!context) {
    return false;
  }

  if (context.state === "suspended") {
    void context.resume().then(() => {
      audioUnlocked = context.state === "running";
    }).catch(() => undefined);
  } else {
    audioUnlocked = context.state === "running";
  }

  return audioUnlocked;
}

export function hasUnlockedGameAudio() {
  return audioUnlocked;
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

  return audioContext;
}

export type { GameSoundEvent, SoundPreferences };
