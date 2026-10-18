import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Svg, { Defs, Path, Pattern, Rect } from "react-native-svg";
import { colors } from "./theme";

const TILE = 64;

// Outline of an 8-point star (two overlapping squares) centered in the tile.
function khatamPath(cx: number, cy: number, r: number) {
  const points: string[] = [];
  for (let index = 0; index < 16; index += 1) {
    const radius = index % 2 === 0 ? r : r * 0.76;
    const angle = (index * Math.PI) / 8 - Math.PI / 2;
    points.push(`${(cx + radius * Math.cos(angle)).toFixed(2)} ${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return `M${points.join("L")}Z`;
}

const STAR = khatamPath(TILE / 2, TILE / 2, 14);
const CORNER_STARS = [
  khatamPath(0, 0, 6),
  khatamPath(TILE, 0, 6),
  khatamPath(0, TILE, 6),
  khatamPath(TILE, TILE, 6)
].join("");

function Backdrop() {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <Pattern id="khatam" patternUnits="userSpaceOnUse" width={TILE} height={TILE}>
          <Path d={STAR} fill="none" stroke={colors.green} strokeOpacity={0.12} strokeWidth={1.5} />
          <Path d={CORNER_STARS} fill={colors.green} fillOpacity={0.07} />
        </Pattern>
      </Defs>
      <Rect x={0} y={0} width="100%" height="100%" fill="url(#khatam)" />
    </Svg>
  );
}

/** On web, centers the app in a phone-width column over a patterned backdrop. On native, renders children. */
export function PhoneFrame({ children }: { children?: React.ReactNode }) {
  if (Platform.OS !== "web") {
    return <>{children}</>;
  }
  return (
    <View style={styles.backdrop}>
      <Backdrop />
      <View style={styles.column}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.mist,
    alignItems: "center",
    overflow: "hidden"
  },
  column: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    backgroundColor: colors.snow,
    overflow: "hidden",
    shadowColor: "#1F2D27",
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 }
  }
});
