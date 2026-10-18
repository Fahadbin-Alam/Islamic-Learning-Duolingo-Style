// Renders the game sound library to WAV files for Android and iOS.
// Run with: node scripts/generate-game-sounds.mts (Node 22.18+ strips the types)
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import {
  GAME_SOUND_EVENTS,
  REDUCED_DURATION_SCALE,
  REDUCED_GAIN_SCALE,
  getSoundTones,
  type SoundTone
} from "../src/services/gameSoundLibrary.ts";

const SAMPLE_RATE = 22050;
const FLOOR_GAIN = 0.001;
const OUTPUT_DIR = join(import.meta.dirname, "..", "assets", "sounds");

// Mirrors the Web Audio envelope in gameAudio.ts: a linear attack from the
// floor to the peak, then an exponential decay back to the floor.
function render(tones: SoundTone[], reduced: boolean) {
  const voices = tones.map((tone) => ({
    tone,
    start: (tone.delayMs ?? 0) / 1000,
    duration: Math.max(0.03, (tone.durationMs / 1000) * (reduced ? REDUCED_DURATION_SCALE : 1)),
    peak: Math.max(FLOOR_GAIN, (tone.gain ?? 0.03) * (reduced ? REDUCED_GAIN_SCALE : 1))
  }));
  const totalSeconds = Math.max(...voices.map((voice) => voice.start + voice.duration)) + 0.01;
  const samples = new Float64Array(Math.ceil(totalSeconds * SAMPLE_RATE));

  for (const voice of voices) {
    const attack = Math.min(0.025, voice.duration * 0.35);
    const first = Math.floor(voice.start * SAMPLE_RATE);
    const count = Math.floor(voice.duration * SAMPLE_RATE);

    for (let index = 0; index < count; index += 1) {
      const t = index / SAMPLE_RATE;
      const envelope = t < attack
        ? FLOOR_GAIN + (voice.peak - FLOOR_GAIN) * (t / attack)
        : voice.peak * Math.pow(FLOOR_GAIN / voice.peak, (t - attack) / (voice.duration - attack));
      samples[first + index] += envelope * oscillate(voice.tone.type ?? "triangle", voice.tone.frequency * t);
    }
  }

  return samples;
}

function oscillate(type: NonNullable<SoundTone["type"]>, cycles: number) {
  const phase = cycles - Math.floor(cycles);

  switch (type) {
    case "sine":
      return Math.sin(2 * Math.PI * phase);
    case "sawtooth":
      return 2 * phase - 1;
    default:
      return 1 - 4 * Math.abs(phase - 0.5);
  }
}

function toWav(samples: Float64Array) {
  const dataBytes = samples.length * 2;
  const buffer = Buffer.alloc(44 + dataBytes);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataBytes, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(SAMPLE_RATE * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataBytes, 40);
  samples.forEach((sample, index) => {
    buffer.writeInt16LE(Math.round(Math.max(-1, Math.min(1, sample)) * 32767), 44 + index * 2);
  });
  return buffer;
}

for (const event of GAME_SOUND_EVENTS) {
  for (const reduced of [false, true]) {
    const name = `${event}${reduced ? "_reduced" : ""}.wav`;
    writeFileSync(join(OUTPUT_DIR, name), toWav(render(getSoundTones(event, reduced), reduced)));
  }
}

console.log(`Wrote ${GAME_SOUND_EVENTS.length * 2} sounds to ${OUTPUT_DIR}`);
