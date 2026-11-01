import React, { type ReactNode } from "react";
import { Animated, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";

/**
 * Pictures for the path's other sceneries (beach, forest, snowy mountains, the camp at Badr), plus the
 * book stand and the ink and paper drawn in parts so a tap can move each part on its own. Everything is
 * drawn on the same 64 x 64 box as PathScenery's pictures. Plain, undisputed things only: no writing on
 * banners or pages, no crescents or stars.
 */

export type WorldKind =
  | "crab"
  | "sandcastle"
  | "boat"
  | "shell"
  | "turtle"
  | "pine"
  | "mushroom"
  | "rabbit"
  | "log"
  | "goat"
  | "cave"
  | "horse"
  | "shield"
  | "banner";

export const WORLD_KINDS: readonly WorldKind[] = ["crab", "sandcastle", "boat", "shell", "turtle", "pine", "mushroom", "rabbit", "log", "goat", "cave", "horse", "shield", "banner"];

export function isWorldKind(kind: string): kind is WorldKind {
  return (WORLD_KINDS as readonly string[]).includes(kind);
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
const CREAM = "#FFF3D6";
const PAGE = "#FFFFFF";
const INK = "#1F2D27";
const SHADOW = <Ellipse cx={32} cy={58.5} rx={20} ry={2.6} fill={INK} opacity={0.08} />;

export function WorldDrawing({ kind }: { kind: WorldKind }) {
  switch (kind) {
    case "crab":
      return (
        <G>
          {SHADOW}
          <Path d="M17 46L8 51M18 50L10 57M47 46L56 51M46 50L54 57" stroke="#D9452B" strokeWidth={2.6} strokeLinecap="round" />
          <Path d="M27 35V27M37 35V27" stroke="#D9452B" strokeWidth={2.4} strokeLinecap="round" />
          <Ellipse cx={32} cy={44} rx={17} ry={11} fill="#FF6B4A" />
          <Path d="M22 39Q32 33 42 39" stroke="#FF9B82" strokeWidth={2} strokeLinecap="round" fill="none" />
          <Path d="M15 39C7 37 4 29 9 24C12 28 14 28 16 26C18 30 19 35 15 39Z" fill="#FF6B4A" />
          <Path d="M49 39C57 37 60 29 55 24C52 28 50 28 48 26C46 30 45 35 49 39Z" fill="#FF6B4A" />
          <Circle cx={27} cy={25} r={4} fill={PAGE} />
          <Circle cx={37} cy={25} r={4} fill={PAGE} />
          <Circle cx={27.6} cy={25.6} r={2} fill={INK} />
          <Circle cx={37.6} cy={25.6} r={2} fill={INK} />
          <Path d="M28 47Q32 50 36 47" stroke="#A3271A" strokeWidth={1.6} strokeLinecap="round" fill="none" />
        </G>
      );
    case "sandcastle":
      return (
        <G>
          <Ellipse cx={32} cy={57} rx={29} ry={4} fill={SAND_DEEP} />
          <Rect x={18} y={34} width={28} height={23} fill="#EBC57E" />
          <Rect x={8} y={26} width={13} height={31} fill={SAND} />
          <Rect x={43} y={26} width={13} height={31} fill={SAND} />
          <Path d="M8 26V22H11V24.5H14V22H17V24.5H21V26ZM43 26V22H46V24.5H49V22H52V24.5H56V26ZM18 34V30H22V32H26V30H30V32H34V30H38V32H42V30H46V34Z" fill={SAND} />
          <Path d="M28 57V49A4 4 0 0 1 36 49V57Z" fill="#B98A3E" />
          <Rect x={12.5} y={33} width={4} height={5} rx={2} fill="#B98A3E" />
          <Rect x={47.5} y={33} width={4} height={5} rx={2} fill="#B98A3E" />
          <Path d="M14.5 22V11" stroke={TRUNK_DEEP} strokeWidth={1.6} strokeLinecap="round" />
          <Path d="M15 11L23 14L15 17Z" fill="#FF5A5A" />
          <Circle cx={24} cy={44} r={1.6} fill="#FFB3C7" />
          <Circle cx={40} cy={50} r={1.4} fill={PAGE} />
          <Path d="M10 45H19M45 45H54" stroke={SAND_DEEP} strokeWidth={1.2} />
        </G>
      );
    case "boat":
      return (
        <G>
          <Path d="M32 44V10" stroke={TRUNK_DEEP} strokeWidth={2.4} strokeLinecap="round" />
          <Path d="M33.5 12L52 40H33.5Z" fill={PAGE} stroke="#D5E7F3" strokeWidth={1} />
          <Path d="M30.5 16L15 40H30.5Z" fill={CREAM} stroke="#F0DDB5" strokeWidth={1} />
          <Path d="M32 9L39 11.5L32 14Z" fill="#FF8A1F" />
          <Path d="M10 43H54L47 54H17Z" fill={TRUNK} />
          <Path d="M12 46.5H52" stroke={TRUNK_DEEP} strokeWidth={2} />
          <Circle cx={24} cy={49.5} r={1.6} fill={CREAM} />
          <Circle cx={40} cy={49.5} r={1.6} fill={CREAM} />
          <Path d="M0 54Q8 50 16 54T32 54T48 54T64 54V62H0Z" fill={WATER} />
          <Path d="M4 56Q8 54 12 56M28 57Q32 55 36 57M50 56Q54 54 58 56" stroke="#8FD3FF" strokeWidth={1.4} strokeLinecap="round" fill="none" />
        </G>
      );
    case "shell":
      return (
        <G>
          {SHADOW}
          <Path d="M25 52H39L37 58H27Z" fill="#F28AA6" />
          <Path d="M32 54L13 40C11 25 21 15 32 15C43 15 53 25 51 40Z" fill="#FFB3C7" />
          <Path d="M32 54L21 19M32 54L32 15M32 54L43 19M32 54L15 30M32 54L49 30" stroke="#F28AA6" strokeWidth={1.6} strokeLinecap="round" />
          <Path d="M22 22Q27 18 31 18" stroke={PAGE} strokeOpacity={0.6} strokeWidth={2} strokeLinecap="round" fill="none" />
        </G>
      );
    case "turtle":
      return (
        <G>
          {SHADOW}
          <Ellipse cx={18} cy={52} rx={5.4} ry={3.6} fill="#3CC46E" />
          <Ellipse cx={44} cy={52} rx={5.4} ry={3.6} fill="#3CC46E" />
          <Path d="M9 46L4 48L9 49Z" fill="#3CC46E" />
          <Circle cx={54} cy={41} r={7.4} fill="#3CC46E" />
          <Circle cx={56.4} cy={39} r={1.7} fill={INK} />
          <Path d="M54.5 44Q57 45.6 59.6 43.8" stroke="#178A56" strokeWidth={1.4} strokeLinecap="round" fill="none" />
          <Path d="M9 49C9 35 19 26 31 26C43 26 51 35 51 49Z" fill={LEAF_DEEP} />
          <Path d="M23 30L30 37L23 46M39 30L32 37L39 46M30 37H32M14 42H22M40 42H47" stroke={LEAF} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Rect x={7} y={47} width={46} height={4.4} rx={2.2} fill="#A3D977" />
        </G>
      );
    case "pine":
      return (
        <G>
          <Ellipse cx={32} cy={59} rx={16} ry={2.6} fill={INK} opacity={0.08} />
          <Rect x={29} y={47} width={6} height={12} rx={1.5} fill={TRUNK} />
          <Path d="M32 26L12 50H52Z" fill={LEAF_DEEP} />
          <Path d="M32 15L16 38H48Z" fill={LEAF} />
          <Path d="M32 5L20 26H44Z" fill={LEAF_DEEP} />
          <Path d="M32 9L26 20M32 19L22 33M32 30L18 45" stroke={PAGE} strokeOpacity={0.3} strokeWidth={1.8} strokeLinecap="round" />
          <Circle cx={40} cy={42} r={2} fill="#8A4B1E" />
          <Circle cx={26} cy={31} r={1.8} fill="#8A4B1E" />
        </G>
      );
    case "mushroom":
      return (
        <G>
          <Ellipse cx={32} cy={58.5} rx={22} ry={2.6} fill={LEAF_DEEP} opacity={0.3} />
          <Path d="M25 58C25 49 26 41 28 36H36C38 41 39 49 39 58Z" fill={CREAM} />
          <Path d="M28 50Q32 52 36 50" stroke="#E8D6AE" strokeWidth={1.4} fill="none" />
          <Path d="M9 38C9 22 19 13 32 13C45 13 55 22 55 38C46 41 18 41 9 38Z" fill="#FF5A5A" />
          <Circle cx={21} cy={26} r={4} fill={PAGE} />
          <Circle cx={36} cy={21} r={3.4} fill={PAGE} />
          <Circle cx={45} cy={30} r={3} fill={PAGE} />
          <Circle cx={29} cy={33} r={2.3} fill={PAGE} />
          <Path d="M50 58C50 54 50.5 51 51 49H54C54.5 51 55 54 55 58Z" fill={CREAM} />
          <Path d="M46 50C46 45 49 43 52.5 43C56 43 59 45 59 50C55 51 50 51 46 50Z" fill="#FF8A1F" />
          <Path d="M6 58C6 54 5 52 4 50M10 58C10 54 11 52 12 51" stroke={LEAF} strokeWidth={2} strokeLinecap="round" fill="none" />
        </G>
      );
    case "rabbit":
      // A bunny sitting in the grass, facing right.
      return (
        <G>
          <Ellipse cx={30} cy={58.5} rx={20} ry={2.6} fill={INK} opacity={0.1} />
          <Path d="M36 22C33 12 34 4 38 4C42 4 42 14 40 22Z" fill="#B8A898" />
          <Path d="M37.5 20C36 13 36.5 8 38.4 8C40 8 40 14 39 20Z" fill="#FFB3C7" />
          <Path d="M43 23C44 13 47 6 50.5 7C53.5 8 51 17 47 24Z" fill="#B8A898" />
          <Path d="M45 22C46.5 15 48.5 10.5 50 11C51 11.6 49.5 17 46.6 22.6Z" fill="#FFB3C7" />
          <Ellipse cx={28} cy={45} rx={17} ry={13} fill="#CBBCAD" />
          <Circle cx={12.5} cy={44} r={5} fill={PAGE} />
          <Ellipse cx={30} cy={56} rx={8} ry={3} fill="#B8A898" />
          <Circle cx={42} cy={31} r={10.5} fill="#CBBCAD" />
          <Ellipse cx={47} cy={36} rx={5} ry={3.6} fill="#E8DED3" />
          <Circle cx={45.2} cy={28.6} r={1.9} fill={INK} />
          <Circle cx={45.8} cy={28} r={0.6} fill={PAGE} />
          <Ellipse cx={51.2} cy={33.6} rx={1.6} ry={1.2} fill="#FF7FA0" />
          <Path d="M51 35.5Q50 37.5 48 37" stroke={INK} strokeWidth={0.9} strokeLinecap="round" fill="none" />
          <Ellipse cx={42} cy={56} rx={5} ry={2.6} fill="#E8DED3" />
          <Path d="M4 58C4 54 3 52 2 50M8 58C8 54 9 52 10 51M58 58C58 55 59 53 60 52" stroke={LEAF} strokeWidth={2} strokeLinecap="round" fill="none" />
        </G>
      );
    case "log":
      return (
        <G>
          <Ellipse cx={30} cy={58.5} rx={26} ry={2.6} fill={INK} opacity={0.08} />
          <Rect x={4} y={38} width={50} height={19} rx={9.5} fill={TRUNK} />
          <Path d="M10 44H30M16 51H42M36 43H46" stroke={TRUNK_DEEP} strokeWidth={1.6} strokeLinecap="round" />
          <Ellipse cx={53} cy={47.5} rx={7} ry={9.5} fill="#E2B07A" />
          <Ellipse cx={53} cy={47.5} rx={4} ry={5.6} stroke={TRUNK_DEEP} strokeWidth={1.2} fill="none" />
          <Circle cx={53} cy={47.5} r={1.4} fill={TRUNK_DEEP} />
          <Path d="M8 40C14 35 22 37 26 39C30 36 36 37 40 39" stroke={LEAF} strokeWidth={3} strokeLinecap="round" fill="none" />
          <Path d="M17 38C17 35 17.5 33 18 32H20.5C21 33 21.5 35 21.5 38Z" fill={CREAM} />
          <Path d="M14 33C14 29 16.5 27.5 19.3 27.5C22 27.5 24.5 29 24.5 33C21 34 17.5 34 14 33Z" fill="#FF5A5A" />
          <Circle cx={18} cy={30.5} r={1.1} fill={PAGE} />
        </G>
      );
    case "goat":
      return (
        <G>
          {SHADOW}
          <Rect x={18} y={42} width={4.6} height={14} rx={2.3} fill="#8E8579" />
          <Rect x={36} y={42} width={4.6} height={14} rx={2.3} fill="#8E8579" />
          <Path d="M14 36L10 32" stroke="#E3DED4" strokeWidth={3} strokeLinecap="round" />
          <Ellipse cx={29} cy={39} rx={16} ry={10} fill="#F4F1EA" />
          <Path d="M17 44C22 48 34 49 42 45" stroke="#E3DED4" strokeWidth={2} strokeLinecap="round" fill="none" />
          <Path d="M43 34C45 30 47 27 49 25" stroke="#F4F1EA" strokeWidth={8} strokeLinecap="round" />
          <Path d="M47 21C44 14 47 9 52 11" stroke="#9A8C7A" strokeWidth={2.6} strokeLinecap="round" fill="none" />
          <Ellipse cx={51} cy={27} rx={6.4} ry={7.6} fill="#F4F1EA" />
          <Path d="M45.5 24L40 22.5L45 27Z" fill="#E3DED4" />
          <Path d="M52 33.5L51 40L49 34Z" fill="#D8D2C6" />
          <Circle cx={53} cy={25} r={1.5} fill={INK} />
          <Ellipse cx={55.5} cy={31} rx={1.6} ry={1} fill="#FF8FA3" opacity={0.7} />
        </G>
      );
    case "cave":
      return (
        <G>
          <Path d="M1 59C3 34 17 17 33 17C49 17 62 34 63 59Z" fill={STONE_DEEP} />
          <Path d="M6 59C9 39 19 25 31 23C22 31 18 44 18 59Z" fill={STONE} />
          <Path d="M20 59C20 45 25 37 32 37C39 37 44 45 44 59Z" fill="#2B2F3A" />
          <Path d="M24 59C24 49 27 43 32 43" stroke="#40465A" strokeWidth={2} strokeLinecap="round" fill="none" />
          <Path d="M24 22C28 18 34 17 38 18" stroke={PAGE} strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" fill="none" />
          <Path d="M44 22C46 19 48 18 50 18M47 23C49 21 51 21 53 22" stroke={LEAF} strokeWidth={2} strokeLinecap="round" fill="none" />
          <Ellipse cx={52} cy={58} rx={5} ry={2.4} fill={STONE} />
          <Ellipse cx={10} cy={58.5} rx={4} ry={2} fill={STONE} />
        </G>
      );
    case "horse":
      return (
        <G>
          {SHADOW}
          <Rect x={20} y={40} width={4.6} height={16} rx={2.3} fill="#7E5232" />
          <Rect x={40} y={40} width={4.6} height={16} rx={2.3} fill="#7E5232" />
          <Path d="M14 35C8 38 7 46 9 53" stroke="#4A2F1E" strokeWidth={4} strokeLinecap="round" fill="none" />
          <Rect x={15} y={40} width={4.6} height={16} rx={2.3} fill="#A8703F" />
          <Rect x={35} y={40} width={4.6} height={16} rx={2.3} fill="#A8703F" />
          <Path d="M14.6 54H20M34.6 54H40" stroke="#3B2618" strokeWidth={3} strokeLinecap="round" />
          <Ellipse cx={30} cy={38} rx={17} ry={9.5} fill="#A8703F" />
          <Path d="M40 34C43 27 46 21 50 17L56 21C54 27 50 35 45 41Z" fill="#A8703F" />
          <Path d="M48 14C52 10 58 12 60 18L62 25C62.4 28 59 30 56.6 28.4L50 22Z" fill="#A8703F" />
          <Path d="M49 13L47 8L52 11Z" fill="#7E5232" />
          <Path d="M48.5 14C44 18 41.5 25 40.5 33" stroke="#4A2F1E" strokeWidth={4} strokeLinecap="round" fill="none" />
          <Circle cx={55} cy={18} r={1.6} fill={INK} />
          <Circle cx={60} cy={25.4} r={0.9} fill="#4A2F1E" />
          <Path d="M24 29H38V41C34 43 28 43 24 41Z" fill="#4C9BFF" />
          <Path d="M24 39C28 41 34 41 38 39V41C34 43 28 43 24 41Z" fill="#2F7CD6" />
        </G>
      );
    case "shield":
      return (
        <G>
          {SHADOW}
          <Circle cx={32} cy={35} r={21} fill="#9A5724" />
          <Circle cx={32} cy={35} r={18.5} fill="#C47A3A" />
          <Circle cx={32} cy={35} r={12} fill="#D98E4C" />
          <Circle cx={32} cy={35} r={5.4} fill="#E7ECEA" stroke={STONE_DEEP} strokeWidth={1.4} />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <Circle key={angle} cx={32} cy={19.5} r={1.5} fill="#E7ECEA" transform={`rotate(${angle} 32 35)`} />
          ))}
          <Path d="M20 26Q25 19 33 18" stroke={PAGE} strokeOpacity={0.35} strokeWidth={2.4} strokeLinecap="round" fill="none" />
        </G>
      );
    case "banner":
    default:
      return (
        <G>
          <Ellipse cx={18} cy={58} rx={9} ry={3} fill={STONE} />
          <Path d="M18 58V7" stroke={TRUNK_DEEP} strokeWidth={3} strokeLinecap="round" />
          <Circle cx={18} cy={5.6} r={2.6} fill="#FFC21A" />
          <Path d="M19.5 9C30 5 38 13 52 9V31C38 35 30 27 19.5 31Z" fill={LEAF} />
          <Path d="M19.5 26C30 22 38 30 52 26V31C38 35 30 27 19.5 31Z" fill={LEAF_DEEP} />
          <Path d="M24 13C30 11 34 14 40 13" stroke={PAGE} strokeOpacity={0.4} strokeWidth={2} strokeLinecap="round" fill="none" />
        </G>
      );
  }
}

type AnimatedStyle = Animated.WithAnimatedValue<StyleProp<ViewStyle>>;

/** One part of a picture: drawn on the whole 64 x 64 box, moved on its own layer. */
export function Part({ size, style, children }: { size: number; style?: AnimatedStyle; children: ReactNode }) {
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, style]}>
      <Svg width={size} height={size} viewBox="0 0 64 64">
        {children}
      </Svg>
    </Animated.View>
  );
}

/** The wooden folding stand (a rehal) on its own. */
export function BookStandLegs() {
  return (
    <G>
      <Path d="M12 60L44 30M52 60L20 30" stroke={TRUNK} strokeWidth={6} strokeLinecap="round" />
      <Path d="M12 60L44 30" stroke={TRUNK_DEEP} strokeWidth={2} strokeLinecap="round" />
    </G>
  );
}

/** The open book lying on the stand. The pages are lines only: no writing is shown. */
export function OpenBook() {
  return (
    <G>
      <Path d="M6 26C14 22 24 22 32 27C40 22 50 22 58 26V42C50 38 40 38 32 43C24 38 14 38 6 42Z" fill={LEAF_DEEP} />
      <Path d="M8 24C15 20 24 20 32 25V40C24 35 15 35 8 39Z" fill={PAGE} />
      <Path d="M56 24C49 20 40 20 32 25V40C40 35 49 35 56 39Z" fill={CREAM} />
      <Path d="M12 27C17 25 22 25 27 27.5M12 31C17 29 22 29 27 31.5M37 27.5C42 25 47 25 52 27M37 31.5C42 29 47 29 52 31" stroke="#C7D0CB" strokeWidth={1.3} strokeLinecap="round" fill="none" />
    </G>
  );
}

/** One page turning over, on the right half of the book. */
export function TurningPage() {
  return <Path d="M32 25C40 20 49 20 56 24V39C49 35 40 35 32 40Z" fill={PAGE} stroke="#E3E8E5" strokeWidth={0.8} />;
}

/** The same book closed, seen from the front, about 22 x 16 around (32, 33). */
export function ClosedBook() {
  return (
    <G>
      <Rect x={20} y={25} width={24} height={17} rx={2.4} fill={LEAF_DEEP} />
      <Rect x={22} y={27} width={21} height={13} rx={1.4} fill={CREAM} />
      <Rect x={20} y={25} width={21} height={15} rx={2.4} fill={LEAF} />
      <Rect x={20} y={25} width={4} height={15} rx={1.6} fill={LEAF_DEEP} />
      <Path d="M28 30H37" stroke={PAGE} strokeOpacity={0.5} strokeWidth={1.6} strokeLinecap="round" />
    </G>
  );
}

/** A little wooden wall shelf, drawn across the top of the box (y 8..14). */
export function Shelf() {
  return (
    <G>
      <Rect x={10} y={42} width={44} height={4.4} rx={1.6} fill={TRUNK} />
      <Path d="M16 46.4L20 54M48 46.4L44 54" stroke={TRUNK_DEEP} strokeWidth={2.4} strokeLinecap="round" />
      <Rect x={44} y={27} width={5} height={15} rx={1} fill="#4C9BFF" />
      <Rect x={49.5} y={30} width={4.4} height={12} rx={1} fill="#FF8A1F" />
    </G>
  );
}

/** The sheet of paper. */
export function Paper() {
  return (
    <G>
      <Path d="M8 20H40L46 58H14Z" fill={PAGE} />
      <Path d="M8 20H40L42 26H9Z" fill={CREAM} />
      <Path d="M14 32H38M15 39H39M16 46H34" stroke="#C7D0CB" strokeWidth={1.6} strokeLinecap="round" />
    </G>
  );
}

/** The reed pen, leaning from (44, 12) down to its nib at (58, 44). */
export function Pen() {
  return (
    <G>
      <Path d="M44 12L58 44" stroke={TRUNK} strokeWidth={3} strokeLinecap="round" />
      <Path d="M56.5 40.5L58 44L55 42Z" fill={INK} />
    </G>
  );
}

/** The ink pot. */
export function InkPot() {
  return (
    <G>
      <Rect x={40} y={44} width={20} height={16} rx={5} fill="#4C5BD4" />
      <Rect x={44} y={40} width={12} height={6} rx={2} fill="#3A47B0" />
      <Path d="M43 48C44 46 46 45 48 45" stroke={PAGE} strokeOpacity={0.5} strokeWidth={1.6} strokeLinecap="round" />
    </G>
  );
}

/** A paper plane, for the paper's fly-away show (about 24 x 14). */
export function PaperPlane({ w }: { w: number }) {
  return (
    <Svg width={w} height={w * 0.6} viewBox="0 0 30 18">
      <Path d="M1 9L29 1L12 12Z" fill={PAGE} stroke="#C7D0CB" strokeWidth={0.8} strokeLinejoin="round" />
      <Path d="M12 12L29 1L16 17Z" fill="#E7ECEA" stroke="#C7D0CB" strokeWidth={0.8} strokeLinejoin="round" />
    </Svg>
  );
}

/** Little critters and props the new shows bring on. Each is drawn at width `s`. */
export function Bunny({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 30 30">
      <Ellipse cx={10.5} cy={8} rx={3} ry={8} fill="#F4F1EA" />
      <Ellipse cx={19.5} cy={8} rx={3} ry={8} fill="#F4F1EA" />
      <Ellipse cx={10.5} cy={8} rx={1.4} ry={5.6} fill="#FFB3C7" />
      <Ellipse cx={19.5} cy={8} rx={1.4} ry={5.6} fill="#FFB3C7" />
      <Circle cx={15} cy={20} r={9} fill="#F4F1EA" />
      <Circle cx={11.5} cy={19} r={1.4} fill={INK} />
      <Circle cx={18.5} cy={19} r={1.4} fill={INK} />
      <Ellipse cx={15} cy={22.4} rx={1.6} ry={1.1} fill="#FF8FA3" />
    </Svg>
  );
}

export function Butterfly({ s, color = "#8E5CF7" }: { s: number; color?: string }) {
  return (
    <Svg width={s} height={s * 0.8} viewBox="0 0 20 16">
      <Ellipse cx={5.5} cy={6} rx={5} ry={5.4} fill={color} />
      <Ellipse cx={14.5} cy={6} rx={5} ry={5.4} fill={color} />
      <Ellipse cx={6} cy={12} rx={3.4} ry={3.2} fill="#FF82AB" />
      <Ellipse cx={14} cy={12} rx={3.4} ry={3.2} fill="#FF82AB" />
      <Rect x={9.2} y={3} width={1.6} height={12} rx={0.8} fill={INK} />
    </Svg>
  );
}

export function Lizard({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.4} viewBox="0 0 40 16">
      <Path d="M2 9C10 4 14 12 22 8C26 6 30 5 34 6C38 7 39 10 36 11C32 12 28 10 24 11C16 14 10 12 2 9Z" fill="#7BC74D" />
      <Path d="M14 10L11 15M24 10L27 15M18 9L16 4M28 7L30 3" stroke="#5DA834" strokeWidth={1.6} strokeLinecap="round" />
      <Circle cx={35} cy={8} r={1} fill={INK} />
    </Svg>
  );
}

export function Snail({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.7} viewBox="0 0 30 21">
      <Path d="M2 19H26C28 19 28 15 25 15H6Z" fill="#E8C9A0" />
      <Path d="M24 15L27 8M26 15L30 9" stroke="#C49A6C" strokeWidth={1.2} strokeLinecap="round" />
      <Circle cx={27} cy={7.5} r={1.2} fill={INK} />
      <Circle cx={30} cy={8.5} r={1.2} fill={INK} />
      <Circle cx={13} cy={11} r={8} fill="#C47A3A" />
      <Path d="M13 11m-4 0a4 4 0 1 0 8 0a2.5 2.5 0 1 0 -5 0" stroke="#8A4B1E" strokeWidth={1.4} fill="none" />
    </Svg>
  );
}

export function Carrot({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 30 30">
      <Path d="M4 15C4 12 20 9 26 14C20 19 4 18 4 15Z" fill="#FF8A1F" />
      <Path d="M10 13.6V16.4M15 12.8V16.8" stroke="#E06A00" strokeWidth={1} strokeLinecap="round" />
      <Path d="M25 14L29 10M25 14L30 14M25 14L29 18" stroke="#21B573" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export function Squirrel({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 30 30">
      <Path d="M8 26C0 24 0 12 6 8C10 6 13 9 11 13C9 16 12 20 12 24Z" fill="#C4863A" />
      <Ellipse cx={17} cy={21} rx={7} ry={7.4} fill="#E3A857" />
      <Circle cx={20} cy={11.5} r={5.6} fill="#E3A857" />
      <Path d="M17 7L17.5 3L20 6.4Z" fill="#C4863A" />
      <Circle cx={22} cy={10.6} r={1.2} fill={INK} />
      <Ellipse cx={17.5} cy={23} rx={4} ry={4.6} fill="#F4CB8A" />
      <Ellipse cx={22.5} cy={19.5} rx={2.6} ry={2.2} fill="#8A4B1E" />
    </Svg>
  );
}

export function Bat({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.5} viewBox="0 0 30 15">
      <Path d="M15 5C11 1 6 1 1 4C4 5 5 8 4 10C7 8 10 9 12 11C13 9 14 8 15 8C16 8 17 9 18 11C20 9 23 8 26 10C25 8 26 5 29 4C24 1 19 1 15 5Z" fill="#5A4E7A" />
      <Circle cx={13.6} cy={6.4} r={0.9} fill={PAGE} />
      <Circle cx={16.4} cy={6.4} r={0.9} fill={PAGE} />
    </Svg>
  );
}

export function Pinecone({ s }: { s: number }) {
  return (
    <Svg width={s * 0.7} height={s} viewBox="0 0 14 20">
      <Ellipse cx={7} cy={11} rx={6} ry={8.4} fill="#8A4B1E" />
      <Path d="M2 8H12M1.5 12H12.5M2.5 16H11.5" stroke="#B9763A" strokeWidth={1.4} strokeLinecap="round" />
    </Svg>
  );
}

export function MiniMushroom({ s, color = "#FF5A5A" }: { s: number; color?: string }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 20 20">
      <Path d="M8 20C8 16 8.5 13 9 11H11C11.5 13 12 16 12 20Z" fill={CREAM} />
      <Path d="M2 12C2 6 6 3 10 3C14 3 18 6 18 12C13 13.4 7 13.4 2 12Z" fill={color} />
      <Circle cx={7} cy={7.6} r={1.5} fill={PAGE} />
      <Circle cx={12.6} cy={7} r={1.2} fill={PAGE} />
    </Svg>
  );
}

export function Ladybug({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.8} viewBox="0 0 15 12">
      <Circle cx={12} cy={6} r={2.6} fill={INK} />
      <Ellipse cx={7} cy={6.4} rx={6} ry={5} fill="#FF5A5A" />
      <Path d="M7 1.6V11.2" stroke={INK} strokeWidth={0.8} />
      <Circle cx={4.4} cy={5} r={1.1} fill={INK} />
      <Circle cx={9.4} cy={8.4} r={1.1} fill={INK} />
    </Svg>
  );
}

export function Pearl({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={8} fill="#F7F3FF" stroke="#D9D0F2" strokeWidth={1.2} />
      <Circle cx={7.4} cy={7.2} r={2.6} fill={PAGE} />
    </Svg>
  );
}

export function Seagull({ s }: { s: number }) {
  return (
    <Svg width={s} height={s * 0.5} viewBox="0 0 22 11">
      <Path d="M1 4C5 1 9 2 11 7C13 2 17 1 21 4" stroke="#5D6B74" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </Svg>
  );
}

export function Pebble({ s, color = STONE }: { s: number; color?: string }) {
  return (
    <Svg width={s} height={s * 0.75} viewBox="0 0 16 12">
      <Ellipse cx={8} cy={6.4} rx={7.4} ry={5.4} fill={color} />
      <Path d="M3.6 4.6C4.6 3.4 6 3 7.6 3" stroke={PAGE} strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Berry({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 12 12">
      <Circle cx={6} cy={7} r={4.6} fill="#E0245E" />
      <Circle cx={4.6} cy={5.6} r={1.2} fill={PAGE} fillOpacity={0.6} />
      <Path d="M6 2.4L7.6 0.8" stroke={LEAF_DEEP} strokeWidth={1.2} strokeLinecap="round" />
    </Svg>
  );
}

export function Blossom({ s, color = "#FF7FA6" }: { s: number; color?: string }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 12 12">
      <Circle cx={3.4} cy={6} r={2.6} fill={color} />
      <Circle cx={8.6} cy={6} r={2.6} fill={color} />
      <Circle cx={6} cy={3.4} r={2.6} fill={color} />
      <Circle cx={6} cy={8.6} r={2.6} fill={color} />
      <Circle cx={6} cy={6} r={1.8} fill={CREAM} />
    </Svg>
  );
}

export function Snowflake({ s }: { s: number }) {
  return (
    <Svg width={s} height={s} viewBox="0 0 12 12">
      <Circle cx={6} cy={6} r={4.6} fill={PAGE} stroke="#D5E7F3" strokeWidth={0.8} />
    </Svg>
  );
}

export { SAND, SAND_DEEP, WATER, STONE, STONE_DEEP };
