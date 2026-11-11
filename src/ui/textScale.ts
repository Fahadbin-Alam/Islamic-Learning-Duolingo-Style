import { getDeviceSettings, BIG_TEXT_SCALE } from "../services/deviceSettings";

/** Reading text starts at this size; smaller text (chips, badges, credits) stays as it is so it still fits. */
const READING_SIZE = 15;

type Scalable = { fontSize?: unknown; lineHeight?: unknown };

function scaled<T>(style: T, scale: number): T {
  const entry = style as Scalable;
  if (!style || typeof style !== "object" || typeof entry.fontSize !== "number" || entry.fontSize < READING_SIZE) return style;
  return {
    ...style,
    fontSize: Math.round(entry.fontSize * scale),
    ...(typeof entry.lineHeight === "number" ? { lineHeight: Math.round(entry.lineHeight * scale) } : null)
  } as T;
}

/**
 * A screen's styles that grow with "Bigger text" in Settings: every reading-size text style (15 and up) is drawn
 * BIG_TEXT_SCALE bigger while it is on. Read when a screen draws, so the next lesson opened after a change uses it.
 */
export function textScaled<T extends Record<string, unknown>>(styles: T): T {
  const big = {} as Record<string, unknown>;
  for (const key of Object.keys(styles)) big[key] = scaled(styles[key], BIG_TEXT_SCALE);
  const out = {} as T;
  for (const key of Object.keys(styles)) {
    Object.defineProperty(out, key, {
      enumerable: true,
      get: () => (getDeviceSettings().bigText ? big[key] : styles[key])
    });
  }
  return out;
}

/** A computed font size, bigger with "Bigger text" on. */
export function scaleFont(size: number) {
  return getDeviceSettings().bigText ? Math.round(size * BIG_TEXT_SCALE) : size;
}
