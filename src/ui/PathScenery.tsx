import React, { memo, useEffect, useRef } from "react";
import { Animated, Easing, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import { useReduceMotion } from "./Camel";
import { Icon, type IconName } from "./Icon";

/**
 * Pictures that stand beside the path, picked by topic so the path looks like what is being learned.
 * Only plain, undisputed things: plants, desert, a well, a tent, books and ink. No crescents, stars,
 * lanterns or rings (see the content rule in docs/design-system.md).
 */
export type SceneryKind =
  | "palm"
  | "dunes"
  | "tent"
  | "well"
  | "bookStand"
  | "inkpot"
  | "flowers"
  | "mountain"
  | "mosque"
  | "kaaba"
  | "coins";

const ICON_KINDS: Partial<Record<SceneryKind, IconName>> = { mosque: "mosque", kaaba: "kaaba", coins: "coins" };

/** Plants sway in the wind; everything else stands still. */
const SWAYS: ReadonlySet<SceneryKind> = new Set<SceneryKind>(["palm", "flowers"]);

const THEMES: Record<string, SceneryKind[]> = {
  quran_tafseer: ["bookStand", "palm", "dunes", "flowers"],
  sahabah: ["tent", "palm", "well", "dunes"],
  prophets: ["mountain", "well", "palm", "dunes"],
  // Maryam and the date palm (Maryam 19:25), Hajar and the water.
  women_of_the_book: ["palm", "flowers", "well", "tent"],
  hadith: ["inkpot", "bookStand", "palm", "flowers"],
  prayer: ["mosque", "palm", "flowers", "dunes"],
  manners: ["flowers", "well", "palm", "tent"],
  fasting: ["palm", "well", "dunes", "tent"],
  zakat: ["coins", "well", "palm", "flowers"],
  hajj: ["kaaba", "mountain", "tent", "palm"],
  marriage: ["flowers", "tent", "palm", "well"],
  aqidah: ["mountain", "palm", "dunes", "flowers"],
  foundation: ["palm", "dunes", "mountain", "flowers"]
};

const DEFAULT_THEME: SceneryKind[] = ["palm", "dunes", "flowers", "mountain"];

/** The picture for a unit's `slot`-th spot beside the path, by topic. Next spots never repeat a picture. */
export function sceneryFor(topicId: string, unitIndex: number, slot: number): SceneryKind {
  const theme = THEMES[topicId] ?? DEFAULT_THEME;
  return theme[(unitIndex + slot) % theme.length];
}

const SAND = "#F3D598";
const SAND_DEEP = "#E2B967";
const LEAF = "#21B573";
const LEAF_DEEP = "#178A56";
const TRUNK = "#C47A3A";
const TRUNK_DEEP = "#9A5724";
const STONE = "#B9C4BF";
const STONE_DEEP = "#93A29B";
const WATER = "#2FA8FF";
const CLOTH = "#FF8A1F";
const CLOTH_DEEP = "#D96A0A";
const CREAM = "#FFF3D6";
const PAGE = "#FFFFFF";
const INK = "#1F2D27";

function Drawing({ kind }: { kind: SceneryKind }) {
  switch (kind) {
    case "palm":
      return (
        <G>
          <Path d="M30 30C32 40 31 50 27 60H36C38 50 38 40 35 30Z" fill={TRUNK} />
          <Path d="M29 40H36M28.5 47H36.5M28 54H36" stroke={TRUNK_DEEP} strokeWidth={1.6} strokeLinecap="round" />
          <Path d="M32 28C26 18 12 17 4 25C14 24 22 26 32 28Z" fill={LEAF} />
          <Path d="M32 28C38 18 52 17 60 25C50 24 42 26 32 28Z" fill={LEAF} />
          <Path d="M32 28C29 18 22 11 12 10C19 15 25 21 32 28Z" fill={LEAF_DEEP} />
          <Path d="M32 28C35 18 42 11 52 10C45 15 39 21 32 28Z" fill={LEAF_DEEP} />
          <Path d="M32 29C24 30 17 36 14 44C20 38 26 33 32 29ZM32 29C40 30 47 36 50 44C44 38 38 33 32 29Z" fill={LEAF} />
          <Circle cx={29.5} cy={32} r={2.4} fill="#A3471F" />
          <Circle cx={34.5} cy={32} r={2.4} fill="#8E3A1B" />
          <Circle cx={32} cy={35.5} r={2.4} fill="#A3471F" />
        </G>
      );
    case "dunes":
      return (
        <G>
          <Circle cx={46} cy={20} r={8} fill="#FFC21A" />
          <Circle cx={46} cy={20} r={5} fill="#FFE27A" />
          <Path d="M2 58C10 40 24 36 36 44C44 38 54 40 62 50V60H2Z" fill={SAND} />
          <Path d="M36 44C40 50 42 55 42 60H62V50C54 40 44 38 36 44Z" fill={SAND_DEEP} />
          <Path d="M12 50C16 46 20 45 24 46" stroke="#FFF1C9" strokeWidth={2} strokeLinecap="round" fill="none" />
        </G>
      );
    case "tent":
      return (
        <G>
          <Path d="M32 12L4 56H60Z" fill={CLOTH} />
          <Path d="M32 12L60 56H40Z" fill={CLOTH_DEEP} />
          <Path d="M32 26L23 56H41Z" fill="#7A421A" />
          <Path d="M32 26L26 56H32Z" fill="#9A5724" />
          <Path d="M14 40H50" stroke={CREAM} strokeWidth={3} strokeLinecap="round" />
          <Path d="M32 12V6" stroke={TRUNK_DEEP} strokeWidth={2.4} strokeLinecap="round" />
          <Rect x={2} y={55} width={60} height={4} rx={2} fill={SAND_DEEP} />
        </G>
      );
    case "well":
      return (
        <G>
          <Rect x={13} y={10} width={4} height={30} rx={2} fill={TRUNK_DEEP} />
          <Rect x={47} y={10} width={4} height={30} rx={2} fill={TRUNK_DEEP} />
          <Path d="M8 14L32 4L56 14Z" fill={TRUNK} />
          <Rect x={13} y={18} width={38} height={3} rx={1.5} fill={TRUNK_DEEP} />
          <Path d="M32 21V30" stroke={INK} strokeWidth={1.2} />
          <Path d="M27 30H37L36 37H28Z" fill="#9A5724" />
          <Ellipse cx={32} cy={38} rx={22} ry={6} fill={STONE_DEEP} />
          <Path d="M10 38V54C10 58 20 61 32 61C44 61 54 58 54 54V38Z" fill={STONE} />
          <Ellipse cx={32} cy={38} rx={18} ry={4} fill={WATER} />
          <Path d="M10 46C22 50 42 50 54 46M10 54C22 58 42 58 54 54" stroke={STONE_DEEP} strokeWidth={1.6} fill="none" />
          <Path d="M18 44V50M30 47V53M42 44V50" stroke={STONE_DEEP} strokeWidth={1.6} />
        </G>
      );
    case "bookStand":
      // An open book on a wooden folding stand (a rehal). The pages are lines only: no writing is shown.
      return (
        <G>
          <Path d="M12 60L44 30M52 60L20 30" stroke={TRUNK} strokeWidth={6} strokeLinecap="round" />
          <Path d="M12 60L44 30" stroke={TRUNK_DEEP} strokeWidth={2} strokeLinecap="round" />
          <Path d="M6 26C14 22 24 22 32 27C40 22 50 22 58 26V42C50 38 40 38 32 43C24 38 14 38 6 42Z" fill="#178A56" />
          <Path d="M8 24C15 20 24 20 32 25V40C24 35 15 35 8 39Z" fill={PAGE} />
          <Path d="M56 24C49 20 40 20 32 25V40C40 35 49 35 56 39Z" fill={CREAM} />
          <Path d="M12 27C17 25 22 25 27 27.5M12 31C17 29 22 29 27 31.5M37 27.5C42 25 47 25 52 27M37 31.5C42 29 47 29 52 31" stroke="#C7D0CB" strokeWidth={1.3} strokeLinecap="round" fill="none" />
        </G>
      );
    case "inkpot":
      return (
        <G>
          <Path d="M8 20H40L46 58H14Z" fill={PAGE} />
          <Path d="M8 20H40L42 26H9Z" fill={CREAM} />
          <Path d="M14 32H38M15 39H39M16 46H34" stroke="#C7D0CB" strokeWidth={1.6} strokeLinecap="round" />
          <Path d="M44 12L58 44" stroke={TRUNK} strokeWidth={3} strokeLinecap="round" />
          <Path d="M56.5 40.5L58 44L55 42Z" fill={INK} />
          <Rect x={40} y={44} width={20} height={16} rx={5} fill="#4C5BD4" />
          <Rect x={44} y={40} width={12} height={6} rx={2} fill="#3A47B0" />
          <Path d="M43 48C44 46 46 45 48 45" stroke="#FFFFFF" strokeOpacity={0.5} strokeWidth={1.6} strokeLinecap="round" />
        </G>
      );
    case "flowers":
      return (
        <G>
          <Path d="M20 58C20 46 18 38 16 30M34 58C34 44 36 34 38 24M46 58C46 50 48 44 50 38" stroke={LEAF_DEEP} strokeWidth={2.6} strokeLinecap="round" fill="none" />
          <Path d="M20 50C14 46 12 42 13 38C18 40 20 44 20 50ZM34 46C40 42 44 42 46 44C42 48 38 48 34 46Z" fill={LEAF} />
          {[
            { x: 16, y: 28, c: "#FF7FA6" },
            { x: 38, y: 22, c: "#FFC21A" },
            { x: 50, y: 36, c: "#8E5CF7" }
          ].map((flower) => (
            <G key={`${flower.x}`}>
              <Circle cx={flower.x - 4} cy={flower.y} r={4} fill={flower.c} />
              <Circle cx={flower.x + 4} cy={flower.y} r={4} fill={flower.c} />
              <Circle cx={flower.x} cy={flower.y - 4} r={4} fill={flower.c} />
              <Circle cx={flower.x} cy={flower.y + 4} r={4} fill={flower.c} />
              <Circle cx={flower.x} cy={flower.y} r={2.8} fill="#FFF3D6" />
            </G>
          ))}
          <Ellipse cx={32} cy={59} rx={22} ry={3} fill={LEAF_DEEP} opacity={0.35} />
        </G>
      );
    case "mountain":
      return (
        <G>
          <Path d="M2 58L24 18L36 36L44 26L62 58Z" fill={STONE_DEEP} />
          <Path d="M24 18L36 36L32 58H2Z" fill={STONE} />
          <Path d="M44 26L62 58H50Z" fill="#7D8C85" />
          <Path d="M24 18L30 28L26 26L22 30L19 27Z" fill="#FFFFFF" />
          <Path d="M2 58H62" stroke={SAND_DEEP} strokeWidth={3} strokeLinecap="round" />
        </G>
      );
    default:
      return null;
  }
}

export type PathSceneryProps = {
  kind: SceneryKind;
  size?: number;
  /** Plants sway when true. Off-screen units pass false to save work on cheap phones. */
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const PathScenery = memo(function PathScenery({ kind, size = 64, animated = false, style }: PathSceneryProps) {
  const reduceMotion = useReduceMotion();
  const sways = animated && !reduceMotion && SWAYS.has(kind);
  const sway = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    sway.setValue(0);
    if (!sways) return undefined;
    const half = (toValue: number) => Animated.timing(sway, { toValue, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
    const loop = Animated.loop(Animated.sequence([half(1), half(-1), half(0)]));
    loop.start();
    return () => loop.stop();
  }, [sways, sway]);
  const rotate = sway.interpolate({ inputRange: [-1, 1], outputRange: ["-3deg", "3deg"] });
  const iconName = ICON_KINDS[kind];

  return (
    <View style={[{ width: size, height: size }, style]} pointerEvents="none" testID={`scenery-${kind}`}>
      <Animated.View style={{ width: size, height: size, transformOrigin: "bottom", transform: sways ? [{ rotate }] : [] }}>
        {iconName ? (
          <Icon name={iconName} size={size} />
        ) : (
          <Svg width={size} height={size} viewBox="0 0 64 64">
            <Drawing kind={kind} />
          </Svg>
        )}
      </Animated.View>
    </View>
  );
});
