import React, { memo, useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import Svg, { Circle, Ellipse, G, Path, Rect } from "react-native-svg";
import { useReduceMotion } from "./Camel";
import { Icon, type IconName } from "./Icon";
import { feedback } from "./sound";

/**
 * Pictures that stand beside the path, picked by topic so the path looks like what is being learned.
 * Only plain, undisputed things: plants, desert, a well, a tent, sheep, dates, books and ink. No crescents, stars,
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
  | "coins"
  | "sheep"
  | "oasis"
  | "rocks"
  | "dates"
  | "bush";

const ICON_KINDS: Partial<Record<SceneryKind, IconName>> = { mosque: "mosque", kaaba: "kaaba", coins: "coins" };

/** Plants sway in the wind; everything else stands still. */
const SWAYS: ReadonlySet<SceneryKind> = new Set<SceneryKind>(["palm", "flowers", "bush"]);

const THEMES: Record<string, SceneryKind[]> = {
  quran_tafseer: ["bookStand", "palm", "oasis", "flowers", "dunes", "sheep", "rocks", "well"],
  sahabah: ["tent", "palm", "well", "sheep", "dunes", "dates", "rocks", "bush"],
  prophets: ["mountain", "well", "sheep", "palm", "dunes", "oasis", "rocks", "tent"],
  // Maryam and the date palm (Maryam 19:25), Hajar and the water.
  women_of_the_book: ["palm", "flowers", "well", "dates", "tent", "oasis", "bush", "sheep"],
  hadith: ["inkpot", "bookStand", "palm", "flowers", "well", "bush", "dates", "rocks"],
  scholars: ["inkpot", "bookStand", "palm", "well", "flowers", "bush", "rocks", "dates"],
  prayer: ["mosque", "palm", "flowers", "oasis", "dunes", "bush", "well", "rocks"],
  manners: ["flowers", "well", "sheep", "palm", "tent", "bush", "dates", "oasis"],
  fasting: ["dates", "palm", "well", "dunes", "tent", "oasis", "rocks", "bush"],
  ramadan: ["dates", "mosque", "palm", "well", "oasis", "tent", "dunes", "bush"],
  zakat: ["coins", "well", "dates", "palm", "flowers", "sheep", "bush", "rocks"],
  hajj: ["kaaba", "mountain", "tent", "palm", "well", "rocks", "dunes", "sheep"],
  marriage: ["flowers", "tent", "palm", "well", "dates", "bush", "oasis", "sheep"],
  aqidah: ["mountain", "palm", "oasis", "flowers", "dunes", "rocks", "bush", "well"],
  foundation: ["palm", "well", "dunes", "sheep", "mountain", "flowers", "oasis", "dates"]
};

const DEFAULT_THEME: SceneryKind[] = ["palm", "well", "dunes", "sheep", "flowers", "mountain", "oasis", "bush"];

/** The picture for a unit's `slot`-th spot beside the path, by topic. Next spots never repeat a picture. */
export function sceneryFor(topicId: string, unitIndex: number, slot: number): SceneryKind {
  const theme = THEMES[topicId] ?? DEFAULT_THEME;
  // Each unit starts a few pictures on, so the units of a long topic don't all open with the same one.
  return theme[(unitIndex * 3 + slot) % theme.length];
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
      // The bucket is drawn on its own layer (WellBucket) so a tap can drop it into the water.
      return (
        <G>
          <Rect x={13} y={10} width={4} height={30} rx={2} fill={TRUNK_DEEP} />
          <Rect x={47} y={10} width={4} height={30} rx={2} fill={TRUNK_DEEP} />
          <Path d="M8 14L32 4L56 14Z" fill={TRUNK} />
          <Rect x={13} y={18} width={38} height={3} rx={1.5} fill={TRUNK_DEEP} />
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
    case "sheep":
      return (
        <G>
          <Rect x={20} y={42} width={5} height={14} rx={2.5} fill="#5A4A42" />
          <Rect x={38} y={42} width={5} height={14} rx={2.5} fill="#5A4A42" />
          <Circle cx={22} cy={36} r={10} fill="#FFFFFF" />
          <Circle cx={32} cy={31} r={11} fill="#FFFFFF" />
          <Circle cx={42} cy={36} r={10} fill="#FFFFFF" />
          <Circle cx={30} cy={42} r={10} fill="#FFFFFF" />
          <Circle cx={18} cy={42} r={6} fill="#F1EEE8" />
          <Circle cx={44} cy={42} r={7} fill="#F1EEE8" />
          <Ellipse cx={51} cy={33} rx={7} ry={8.5} fill="#5A4A42" />
          <Ellipse cx={45} cy={28} rx={4.6} ry={2.4} fill="#5A4A42" transform="rotate(-20 45 28)" />
          <Circle cx={53} cy={31} r={1.7} fill="#FFFFFF" />
          <Circle cx={53.4} cy={31.3} r={0.9} fill={INK} />
          <Ellipse cx={52} cy={38} rx={2.2} ry={1.4} fill="#FF8FA3" opacity={0.7} />
          <Circle cx={46} cy={25} r={4} fill="#FFFFFF" />
          <Ellipse cx={32} cy={58} rx={18} ry={2.6} fill={INK} opacity={0.08} />
        </G>
      );
    case "oasis":
      return (
        <G>
          <Ellipse cx={32} cy={50} rx={28} ry={10} fill={SAND_DEEP} />
          <Ellipse cx={32} cy={49} rx={24} ry={8} fill={WATER} />
          <Ellipse cx={28} cy={47} rx={10} ry={2.4} fill="#8FD3FF" />
          <Path d="M10 46C8 38 9 30 12 24M14 46C14 38 16 32 19 28M52 46C54 38 54 32 52 26M48 46C48 40 46 34 44 30" stroke={LEAF_DEEP} strokeWidth={2.4} strokeLinecap="round" fill="none" />
          <Ellipse cx={12} cy={23} rx={2.4} ry={5} fill={TRUNK} />
          <Ellipse cx={52} cy={25} rx={2.4} ry={5} fill={TRUNK} />
          <Ellipse cx={40} cy={51} rx={5} ry={1.6} fill="#FFFFFF" opacity={0.6} />
        </G>
      );
    case "rocks":
      return (
        <G>
          <Path d="M6 58C6 46 14 38 24 38C34 38 40 46 40 58Z" fill={STONE_DEEP} />
          <Path d="M10 56C10 47 16 42 23 42C27 42 30 44 32 47C26 46 18 48 14 56Z" fill={STONE} />
          <Path d="M32 58C32 50 38 45 46 45C54 45 58 51 58 58Z" fill={STONE} />
          <Path d="M38 54C39 50 42 48 46 48" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={1.8} strokeLinecap="round" fill="none" />
          <Path d="M20 40C22 34 26 32 28 30M28 30C30 32 30 35 28 38" stroke={LEAF} strokeWidth={2.2} strokeLinecap="round" fill="none" />
          <Path d="M2 58H62" stroke={SAND_DEEP} strokeWidth={3} strokeLinecap="round" />
        </G>
      );
    case "dates":
      // A woven basket full of dates.
      return (
        <G>
          <Path d="M10 34C10 28 54 28 54 34" stroke={TRUNK_DEEP} strokeWidth={3} fill="none" />
          {[
            [18, 30], [26, 27], [34, 26], [42, 28], [48, 31], [22, 33], [30, 31], [38, 31], [45, 34]
          ].map(([x, y]) => (
            <Ellipse key={`${x}-${y}`} cx={x} cy={y} rx={4.2} ry={3} fill={(x + y) % 2 === 0 ? "#8E3A1B" : "#A3471F"} />
          ))}
          <Path d="M8 34H56L50 58H14Z" fill={TRUNK} />
          <Path d="M10 40H54M11 46H53M12.5 52H51.5" stroke={TRUNK_DEEP} strokeWidth={1.8} />
          <Path d="M20 34L22 58M32 34V58M44 34L42 58" stroke={TRUNK_DEEP} strokeWidth={1.4} />
          <Rect x={6} y={32} width={52} height={4} rx={2} fill="#D98E4C" />
        </G>
      );
    case "bush":
      return (
        <G>
          <Circle cx={20} cy={44} r={12} fill={LEAF_DEEP} />
          <Circle cx={44} cy={44} r={12} fill={LEAF_DEEP} />
          <Circle cx={32} cy={36} r={14} fill={LEAF} />
          <Circle cx={22} cy={46} r={10} fill={LEAF} />
          <Circle cx={42} cy={46} r={10} fill={LEAF} />
          <Path d="M26 32C28 29 31 28 34 28" stroke="#FFFFFF" strokeOpacity={0.4} strokeWidth={2} strokeLinecap="round" fill="none" />
          <Circle cx={24} cy={40} r={2} fill="#FF7FA6" />
          <Circle cx={38} cy={34} r={2} fill="#FFC21A" />
          <Circle cx={44} cy={46} r={2} fill="#FF7FA6" />
          <Ellipse cx={32} cy={58} rx={22} ry={3} fill={LEAF_DEEP} opacity={0.3} />
        </G>
      );
    default:
      return null;
  }
}

/** The well's rope and bucket, hanging from the beam. */
function WellBucket() {
  return (
    <G>
      <Path d="M32 0V30" stroke={INK} strokeWidth={1.2} />
      <Path d="M27 30H37L36 37H28Z" fill="#9A5724" />
      <Path d="M27 30H37" stroke="#7A421A" strokeWidth={1.4} />
    </G>
  );
}

/** What a tap on each picture does: the well drops its bucket and splashes, the rest hop with a boing. */
const TAP_SOUND: Partial<Record<SceneryKind, GameSoundEvent>> = { well: "splash", oasis: "splash" };

const DROPS = [
  { x: -16, peak: -20, end: 6, size: 5 },
  { x: -6, peak: -28, end: 2, size: 4 },
  { x: 7, peak: -26, end: 4, size: 4.5 },
  { x: 17, peak: -18, end: 8, size: 5 }
];

export type PathSceneryProps = {
  kind: SceneryKind;
  size?: number;
  /** Plants sway when true. Off-screen units pass false to save work on cheap phones. */
  animated?: boolean;
  /** Tapping plays the picture's little animation and sound. */
  tappable?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const PathScenery = memo(function PathScenery({ kind, size = 64, animated = false, tappable = false, style }: PathSceneryProps) {
  const reduceMotion = useReduceMotion();
  const sways = animated && !reduceMotion && SWAYS.has(kind);
  const sway = useRef(new Animated.Value(0)).current;
  const tap = useRef(new Animated.Value(0)).current;
  const busy = useRef(false);
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
  const isWell = kind === "well";
  const splashes = isWell || kind === "oasis";

  const onTap = () => {
    feedback(TAP_SOUND[kind] ?? "boing", "light");
    if (reduceMotion || busy.current) return;
    busy.current = true;
    tap.setValue(0);
    Animated.timing(tap, { toValue: 1, duration: isWell ? 1100 : 650, easing: Easing.linear, useNativeDriver: true }).start(() => {
      busy.current = false;
      tap.setValue(0);
    });
  };

  // A hop for most pictures: up, a squash on landing, a little wobble. The well itself stays put.
  const hop = isWell
    ? []
    : [
        { translateY: tap.interpolate({ inputRange: [0, 0.3, 0.55, 0.7, 1], outputRange: [0, -14, 0, -4, 0] }) },
        { rotate: tap.interpolate({ inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1], outputRange: ["0deg", "-8deg", "7deg", "-4deg", "2deg", "0deg"] }) },
        { scaleY: tap.interpolate({ inputRange: [0, 0.5, 0.58, 0.7, 1], outputRange: [1, 1, 0.86, 1.04, 1] }) }
      ];
  // The bucket goes down into the water, waits a moment, then comes back up.
  const bucketY = tap.interpolate({ inputRange: [0, 0.25, 0.55, 1], outputRange: [0, (size * 14) / 64, (size * 14) / 64, 0] });
  // Drops jump out of the water once the bucket lands (well) or at once (oasis).
  const splashFrom = isWell ? 0.24 : 0.02;
  const splashTo = isWell ? 0.7 : 0.8;
  const waterY = (size * (isWell ? 36 : 46)) / 64;

  const picture = (
    <Animated.View style={{ width: size, height: size, transformOrigin: "bottom", transform: [...(sways ? [{ rotate }] : []), ...hop] }}>
      {iconName ? (
        <Icon name={iconName} size={size} />
      ) : (
        <Svg width={size} height={size} viewBox="0 0 64 64">
          <Drawing kind={kind} />
        </Svg>
      )}
      {isWell ? (
        // Clipped from under the beam down to the water, so the bucket sinks out of sight.
        <View style={[styles.bucketClip, { top: (size * 21) / 64, height: (size * 18) / 64 }]}>
          <Animated.View style={{ width: size, height: size, marginTop: (-size * 21) / 64, transform: [{ translateY: bucketY }] }}>
            <Svg width={size} height={size} viewBox="0 0 64 64">
              <WellBucket />
            </Svg>
          </Animated.View>
        </View>
      ) : null}
    </Animated.View>
  );

  const drops = splashes
    ? DROPS.map((drop) => {
        const p = (value: number) => splashFrom + (splashTo - splashFrom) * value;
        return (
          <Animated.View
            key={drop.x}
            pointerEvents="none"
            style={[
              styles.drop,
              {
                width: drop.size,
                height: drop.size,
                borderRadius: drop.size / 2,
                left: size / 2 - drop.size / 2,
                top: waterY,
                opacity: tap.interpolate({ inputRange: [0, p(0), p(0.05), p(0.8), p(1), 1], outputRange: [0, 0, 1, 1, 0, 0] }),
                transform: [
                  { translateX: tap.interpolate({ inputRange: [0, p(0), p(1), 1], outputRange: [0, 0, drop.x, drop.x] }) },
                  {
                    translateY: tap.interpolate({
                      inputRange: [0, p(0), p(0.45), p(1), 1],
                      outputRange: [0, 0, drop.peak, drop.end, drop.end]
                    })
                  }
                ]
              }
            ]}
          />
        );
      })
    : null;

  if (!tappable) {
    return (
      <View style={[{ width: size, height: size }, style]} pointerEvents="none" testID={`scenery-${kind}`}>
        {picture}
      </View>
    );
  }
  return (
    <Pressable
      onPress={onTap}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={kind}
      style={[{ width: size, height: size }, style]}
      testID={`scenery-${kind}`}
    >
      {picture}
      {drops}
    </Pressable>
  );
});

/** A little grass tuft, pebbles or a sprig for the ground beside the path. Never moves, never tapped. */
export const GroundTuft = memo(function GroundTuft({ variant, size = 26 }: { variant: number; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      {variant === 0 ? (
        <Path d="M5 24C5 18 3 14 1 12M9 24C9 16 10 11 12 7M13 24C14 18 17 14 20 12M17 24C18 20 21 18 24 17" stroke={LEAF} strokeWidth={2.2} strokeLinecap="round" fill="none" />
      ) : variant === 1 ? (
        <G>
          <Ellipse cx={8} cy={21} rx={6} ry={4} fill={STONE} />
          <Ellipse cx={18} cy={22} rx={4.4} ry={3} fill={STONE_DEEP} />
          <Ellipse cx={13} cy={17} rx={3} ry={2.2} fill={STONE} />
          <Path d="M5 19.5C6 18.4 7.4 18 9 18" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" fill="none" />
        </G>
      ) : (
        <G>
          <Path d="M13 25C13 19 12 15 11 11M13 21C10 19 8 19 6 20M13 18C16 16 18 16 20 17" stroke={LEAF_DEEP} strokeWidth={2} strokeLinecap="round" fill="none" />
          <Circle cx={11} cy={9} r={3.2} fill="#FF7FA6" />
          <Circle cx={11} cy={9} r={1.4} fill={CREAM} />
        </G>
      )}
    </Svg>
  );
});

const styles = StyleSheet.create({
  bucketClip: {
    position: "absolute",
    left: 0,
    right: 0,
    overflow: "hidden"
  },
  drop: {
    position: "absolute",
    backgroundColor: "#5BBDFF"
  }
});
