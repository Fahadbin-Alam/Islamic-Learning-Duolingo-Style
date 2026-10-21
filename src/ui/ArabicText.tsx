import React from "react";
import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { colors, fonts } from "./theme";

// Arabic letters and presentation forms, minus the honorific / word ligatures (ﷺ U+FDFA and friends).
// Those signs are used inside English ("Muhammad ﷺ"), so they never make a text "Arabic".
const ARABIC_PATTERN = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﴿ﵐ-﷎ﹰ-﻿]/;
const LATIN_LETTER_PATTERN = /[A-Za-z]/;
/** Honorific and word ligatures: ﷺ ﷻ ﷽ ﷲ ... Baloo and Nunito have no glyph for them. */
export const HONORIFIC_PATTERN = /[﵀-﵏﷏ﷰ-﷿]/;
const HONORIFIC_RUN = /([﵀-﵏﷏ﷰ-﷿]+)/;
// The space before a sign: "Muhammad ﷺ" keeps the sign on the name's line.
const SPACE_BEFORE_HONORIFIC = / (?=[\uFD40-\uFD4F\uFDCF\uFDF0-\uFDFF])/g;
// Uthmani spelling and Quranic pause / annotation marks (alef wasla, small high letters, waqf signs).
const QURANIC_MARKS = /[ٱۖ-ۭ]/;

/** True when the text contains Arabic letters (an honorific sign alone does not count). */
export function hasArabic(text: string | null | undefined): boolean {
  return typeof text === "string" && ARABIC_PATTERN.test(text);
}

/** True when the text is Arabic with no Latin letters mixed in. */
export function isArabicOnly(text: string | null | undefined): boolean {
  return hasArabic(text) && !LATIN_LETTER_PATTERN.test(text as string);
}

/** True for Quran text (Uthmani marks) or a long Arabic paragraph: both read best in the Naskh face. */
export function isQuranText(text: string | null | undefined): boolean {
  return typeof text === "string" && (QURANIC_MARKS.test(text) || text.trim().length > 60);
}

/**
 * Wraps each honorific sign (ﷺ) in a span with the Naskh face so it has a real glyph, at the size and
 * color of the text around it. Other text is returned unchanged. Use it inside any <Text>. `signStyle` is added
 * to the sign's span (e.g. to keep its line as tall as the others).
 */
export function withHonorifics(value: string, signStyle?: StyleProp<TextStyle>): React.ReactNode {
  if (!HONORIFIC_PATTERN.test(value)) {
    return value;
  }
  // A no-break space before the sign, so it never wraps alone onto the next line.
  return value.replace(SPACE_BEFORE_HONORIFIC, "\u00a0").split(HONORIFIC_RUN).map((part, index) =>
    HONORIFIC_PATTERN.test(part) ? (
      <Text key={index} style={signStyle ? [styles.honorific, signStyle] : styles.honorific}>
        {part}
      </Text>
    ) : (
      part
    )
  );
}

function renderChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") {
    return withHonorifics(children);
  }
  if (Array.isArray(children)) {
    return children.map((child, index) => (typeof child === "string" ? <React.Fragment key={index}>{withHonorifics(child)}</React.Fragment> : child));
  }
  return children;
}

export type ArabicTextProps = Omit<TextProps, "style"> & {
  children?: React.ReactNode;
  size?: number;
  weight?: "regular" | "bold";
  color?: string;
  align?: TextStyle["textAlign"];
  /** Quran ayahs and hadith text: the Naskh face (it has the pause marks) with taller lines. */
  quran?: boolean;
  style?: StyleProp<TextStyle>;
};

export function ArabicText({ children, size = 24, weight = "regular", color = colors.ink, align = "center", quran, style, ...rest }: ArabicTextProps) {
  return (
    <Text
      {...rest}
      style={[
        styles.base,
        {
          fontFamily: quran ? fonts.quran : weight === "bold" ? fonts.arabicBold : fonts.arabic,
          fontSize: size,
          lineHeight: Math.round(size * (quran ? 1.85 : 1.6)),
          color,
          textAlign: align
        },
        style
      ]}
    >
      {renderChildren(children)}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    writingDirection: "rtl",
    flexShrink: 1
  },
  honorific: {
    fontFamily: fonts.quran,
    fontWeight: "normal"
  }
});
