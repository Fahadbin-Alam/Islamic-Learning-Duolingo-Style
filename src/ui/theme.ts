import type { TextStyle } from "react-native";

// Design tokens from docs/design-system.md. Keep these in sync with the doc.
export const colors = {
  green: "#21B573",
  greenLip: "#178A56",
  gold: "#FFC21A",
  goldLip: "#E09B00",
  flame: "#FF8A1F",
  gem: "#2FA8FF",
  gemLip: "#1683D1",
  heart: "#FF4D5E",
  heartLip: "#D3374A",
  ink: "#1F2D27",
  inkSoft: "#6A7A73",
  line: "#E3EAE6",
  lineLip: "#CCD6D1",
  snow: "#FFFFFF",
  mist: "#F3F8F5",
  locked: "#E4E9E6",
  lockedLip: "#C7D0CB",
  correctBg: "#DDF7E8",
  correctInk: "#13804C",
  wrongBg: "#FFE3E5",
  wrongInk: "#D3374A",
  white: "#FFFFFF"
} as const;

export const fonts = {
  display: "BalooBhaijaan2_700Bold",
  displayHeavy: "BalooBhaijaan2_800ExtraBold",
  displaySemi: "BalooBhaijaan2_600SemiBold",
  body: "Nunito_600SemiBold",
  bodyBold: "Nunito_700Bold",
  bodyHeavy: "Nunito_800ExtraBold",
  arabic: "BalooBhaijaan2_600SemiBold",
  arabicBold: "BalooBhaijaan2_800ExtraBold",
  /** Quran ayahs, hadith text and the ﷺ sign (Baloo has no Quranic marks and no ﷺ). */
  quran: "NotoNaskhArabic_600SemiBold"
} as const;

export const radii = {
  xs: 8,
  sm: 12,
  button: 16,
  md: 16,
  tile: 18,
  lg: 20,
  sheet: 24,
  xl: 28,
  pill: 999
} as const;

export const space = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48
} as const;

export const lip = {
  button: 4,
  tile: 4,
  node: 7
} as const;

export const text = {
  h1: { fontFamily: fonts.displayHeavy, fontSize: 34, lineHeight: 40, color: colors.ink },
  h2: { fontFamily: fonts.displayHeavy, fontSize: 26, lineHeight: 32, color: colors.ink },
  h3: { fontFamily: fonts.display, fontSize: 20, lineHeight: 26, color: colors.ink },
  body: { fontFamily: fonts.body, fontSize: 17, lineHeight: 24, color: colors.ink },
  bodyBold: { fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 24, color: colors.ink },
  small: { fontFamily: fonts.body, fontSize: 15, lineHeight: 21, color: colors.inkSoft },
  tiny: { fontFamily: fonts.bodyBold, fontSize: 13, lineHeight: 18, color: colors.inkSoft },
  button: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.6,
    textTransform: "uppercase"
  }
} satisfies Record<string, TextStyle>;

// ---------- color helpers ----------

type Rgb = { r: number; g: number; b: number };

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function parseHex(hex: string): Rgb {
  let value = hex.trim().replace(/^#/, "");
  if (value.length === 3 || value.length === 4) {
    value = value
      .slice(0, 3)
      .split("")
      .map((char) => char + char)
      .join("");
  }
  value = value.slice(0, 6);
  const parsed = Number.parseInt(value, 16);
  if (!Number.isFinite(parsed) || value.length !== 6) {
    return { r: 0, g: 0, b: 0 };
  }
  return { r: (parsed >> 16) & 255, g: (parsed >> 8) & 255, b: parsed & 255 };
}

function toHex({ r, g, b }: Rgb) {
  const part = (channel: number) => Math.round(Math.min(255, Math.max(0, channel))).toString(16).padStart(2, "0");
  return `#${part(r)}${part(g)}${part(b)}`.toUpperCase();
}

function mix(hex: string, target: Rgb, amount: number) {
  const source = parseHex(hex);
  const t = clamp01(amount);
  return toHex({
    r: source.r + (target.r - source.r) * t,
    g: source.g + (target.g - source.g) * t,
    b: source.b + (target.b - source.b) * t
  });
}

/** Mix toward black. `amount` 0..1 (0.2 gives the standard 3D lip). */
export function darken(hex: string, amount = 0.2) {
  return mix(hex, { r: 0, g: 0, b: 0 }, amount);
}

/** Mix toward white. `amount` 0..1. */
export function lighten(hex: string, amount = 0.2) {
  return mix(hex, { r: 255, g: 255, b: 255 }, amount);
}

/** `rgba()` string for a hex color. */
export function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = parseHex(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp01(alpha)})`;
}

export type TopicPalette = {
  main: string;
  lip: string;
  light: string;
  soft: string;
  ink: string;
};

/** Palette for a topic world built from its accent color. */
export function topicPalette(accent: string = colors.green): TopicPalette {
  return {
    main: toHex(parseHex(accent)),
    lip: darken(accent, 0.2),
    light: lighten(accent, 0.9),
    soft: lighten(accent, 0.78),
    ink: darken(accent, 0.45)
  };
}
