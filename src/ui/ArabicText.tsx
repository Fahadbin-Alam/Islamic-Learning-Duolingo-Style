import React from "react";
import { StyleSheet, Text, type StyleProp, type TextProps, type TextStyle } from "react-native";
import { colors, fonts } from "./theme";

const ARABIC_PATTERN = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const LATIN_LETTER_PATTERN = /[A-Za-z]/;

/** True when the text contains any Arabic letters (including presentation forms). */
export function hasArabic(text: string | null | undefined): boolean {
  return typeof text === "string" && ARABIC_PATTERN.test(text);
}

/** True when the text is Arabic with no Latin letters mixed in. */
export function isArabicOnly(text: string | null | undefined): boolean {
  return hasArabic(text) && !LATIN_LETTER_PATTERN.test(text as string);
}

export type ArabicTextProps = Omit<TextProps, "style"> & {
  children?: React.ReactNode;
  size?: number;
  weight?: "regular" | "bold";
  color?: string;
  align?: TextStyle["textAlign"];
  style?: StyleProp<TextStyle>;
};

export function ArabicText({ children, size = 24, weight = "regular", color = colors.ink, align = "center", style, ...rest }: ArabicTextProps) {
  return (
    <Text
      {...rest}
      style={[
        styles.base,
        {
          fontFamily: weight === "bold" ? fonts.arabicBold : fonts.arabic,
          fontSize: size,
          lineHeight: Math.round(size * 1.6),
          color,
          textAlign: align
        },
        style
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    writingDirection: "rtl",
    flexShrink: 1
  }
});
