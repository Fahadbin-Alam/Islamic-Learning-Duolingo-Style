import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";
import { colors, darken, lighten } from "./theme";

export type MascotMood = "happy" | "cheer" | "think" | "sad" | "wave";
export type MascotVariant = "girl" | "boy";

export type MascotProps = {
  /** 'girl' | 'boy'. Legacy ids: 'hijabi' -> girl, 'muslim_man' -> boy. Anything else -> girl. */
  variant?: string;
  mood?: MascotMood;
  size?: number;
  /** Clothing color. */
  accent?: string;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

const VIEW_W = 120;
const VIEW_H = 140;

const SKIN = "#FAD3AE";
const SKIN_DEEP = "#EBAA7C";
const EYE = "#2A2833";
const HAIR = "#3A2820";
const CHEEK = "#FF8FA3";
const MOUTH = "#8A2F3F";
const TONGUE = "#FF7E8E";

export function resolveMascotVariant(variant?: string): MascotVariant {
  if (variant === "boy" || variant === "muslim_man") {
    return "boy";
  }
  return "girl";
}

type Point = { x: number; y: number };
type Pose = { left: Point; right: Point; leftCtrl: Point; rightCtrl: Point };

const SHOULDER_L: Point = { x: 41, y: 94 };
const SHOULDER_R: Point = { x: 79, y: 94 };

function poseFor(mood: MascotMood, waveUp: boolean): Pose {
  switch (mood) {
    case "cheer":
      return {
        left: { x: 20, y: 64 },
        right: { x: 100, y: 64 },
        leftCtrl: { x: 26, y: 88 },
        rightCtrl: { x: 94, y: 88 }
      };
    case "wave":
      return {
        left: { x: 31, y: 117 },
        right: waveUp ? { x: 103, y: 66 } : { x: 107, y: 74 },
        leftCtrl: { x: 32, y: 102 },
        rightCtrl: { x: 96, y: 92 }
      };
    case "think":
      return {
        left: { x: 31, y: 117 },
        right: { x: 76, y: 84 },
        leftCtrl: { x: 32, y: 102 },
        rightCtrl: { x: 92, y: 98 }
      };
    case "sad":
      return {
        left: { x: 37, y: 120 },
        right: { x: 83, y: 120 },
        leftCtrl: { x: 35, y: 106 },
        rightCtrl: { x: 85, y: 106 }
      };
    case "happy":
    default:
      return {
        left: { x: 30, y: 116 },
        right: { x: 90, y: 116 },
        leftCtrl: { x: 31, y: 101 },
        rightCtrl: { x: 89, y: 101 }
      };
  }
}

function armPath(shoulder: Point, ctrl: Point, hand: Point) {
  return `M${shoulder.x} ${shoulder.y} Q${ctrl.x} ${ctrl.y} ${hand.x} ${hand.y}`;
}

function Eyes({ mood, blink }: { mood: MascotMood; blink: boolean }) {
  const leftX = 48.5;
  const rightX = 71.5;
  const y = 56;

  if (mood === "cheer") {
    return (
      <G stroke={EYE} strokeWidth={3.2} strokeLinecap="round" fill="none">
        <Path d={`M${leftX - 5} ${y + 1.5} Q${leftX} ${y - 5.5} ${leftX + 5} ${y + 1.5}`} />
        <Path d={`M${rightX - 5} ${y + 1.5} Q${rightX} ${y - 5.5} ${rightX + 5} ${y + 1.5}`} />
      </G>
    );
  }

  if (blink) {
    return (
      <G stroke={EYE} strokeWidth={2.8} strokeLinecap="round" fill="none">
        <Path d={`M${leftX - 4.5} ${y} Q${leftX} ${y + 3} ${leftX + 4.5} ${y}`} />
        <Path d={`M${rightX - 4.5} ${y} Q${rightX} ${y + 3} ${rightX + 4.5} ${y}`} />
      </G>
    );
  }

  const lookX = mood === "think" ? 1.6 : 0;
  const lookY = mood === "think" ? -2.6 : mood === "sad" ? 1.2 : 0;
  const ry = mood === "sad" ? 5 : 6;

  return (
    <G>
      {[leftX, rightX].map((cx) => (
        <G key={cx}>
          <Ellipse cx={cx + lookX} cy={y + lookY} rx={4.8} ry={ry} fill={EYE} />
          <Circle cx={cx + lookX + 1.7} cy={y + lookY - 2.3} r={1.9} fill="#FFFFFF" />
          <Circle cx={cx + lookX - 1.6} cy={y + lookY + 2.4} r={0.9} fill="#FFFFFF" fillOpacity={0.85} />
        </G>
      ))}
      {mood === "sad" ? (
        <G stroke={EYE} strokeWidth={2.2} strokeLinecap="round" fill="none">
          <Path d={`M${leftX - 5.5} ${y - 6} Q${leftX - 1} ${y - 8.6} ${leftX + 4} ${y - 10}`} />
          <Path d={`M${rightX + 5.5} ${y - 6} Q${rightX + 1} ${y - 8.6} ${rightX - 4} ${y - 10}`} />
        </G>
      ) : null}
      {mood === "think" ? (
        <G stroke={EYE} strokeWidth={2.2} strokeLinecap="round" fill="none">
          <Path d={`M${leftX - 4} ${y - 9.5} Q${leftX} ${y - 11.5} ${leftX + 4} ${y - 10}`} />
          <Path d={`M${rightX - 4} ${y - 12} Q${rightX} ${y - 14} ${rightX + 4} ${y - 12}`} />
        </G>
      ) : null}
    </G>
  );
}

function Mouth({ mood }: { mood: MascotMood }) {
  switch (mood) {
    case "cheer":
      return (
        <G>
          <Path d="M50.5 66.5 Q60 65.5 69.5 66.5 Q68.5 78 60 78 Q51.5 78 50.5 66.5 Z" fill={MOUTH} />
          <Path d="M54 74.2 Q60 70.4 66 74.2 Q63.6 78 60 78 Q56.4 78 54 74.2 Z" fill={TONGUE} />
        </G>
      );
    case "think":
      return <Path d="M57 70 Q61.5 68 65.5 69.5" stroke={MOUTH} strokeWidth={2.6} strokeLinecap="round" fill="none" />;
    case "sad":
      return <Path d="M53.5 72 Q60 66.5 66.5 72" stroke={MOUTH} strokeWidth={2.8} strokeLinecap="round" fill="none" />;
    case "wave":
    case "happy":
    default:
      return (
        <G>
          <Path d="M52 66.5 Q60 75.5 68 66.5 Q60 70 52 66.5 Z" fill={MOUTH} stroke={MOUTH} strokeWidth={2} strokeLinejoin="round" />
        </G>
      );
  }
}

function Face({ mood, blink }: { mood: MascotMood; blink: boolean }) {
  return (
    <G>
      <Ellipse cx={39} cy={65} rx={5.4} ry={3.4} fill={CHEEK} fillOpacity={0.55} />
      <Ellipse cx={81} cy={65} rx={5.4} ry={3.4} fill={CHEEK} fillOpacity={0.55} />
      <Eyes mood={mood} blink={blink} />
      <Path d="M58.2 62.4 Q60 63.8 61.8 62.4" stroke={SKIN_DEEP} strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <Mouth mood={mood} />
    </G>
  );
}

function hueOf(hex: string) {
  const value = hex.replace("#", "");
  const r = Number.parseInt(value.slice(0, 2), 16) / 255;
  const g = Number.parseInt(value.slice(2, 4), 16) / 255;
  const b = Number.parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (!Number.isFinite(delta) || delta === 0) {
    return 0;
  }
  let hue = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
}

// Scarf colors in order of preference; the first one that contrasts with the robe wins.
const SCARF_COLORS = ["#8C7BF4", "#19B3A3", "#FF82AB", "#FFB020"];

function scarfFor(accent: string) {
  const robeHue = hueOf(accent);
  const distance = (hex: string) => {
    const diff = Math.abs(hueOf(hex) - robeHue) % 360;
    return diff > 180 ? 360 - diff : diff;
  };
  return SCARF_COLORS.find((candidate) => distance(candidate) > 70) ?? SCARF_COLORS[0];
}

function GirlHead({ accent, mood, blink }: { accent: string; mood: MascotMood; blink: boolean }) {
  const scarfBase = scarfFor(accent);
  const scarf = scarfBase;
  const scarfDeep = darken(scarfBase, 0.18);
  const band = lighten(scarfBase, 0.7);
  return (
    <G>
      {/* scarf drape over the shoulders, covering hair and neck */}
      <Path
        d="M22 54 A38 38 0 0 1 98 54 L98 72 C98 92 84 101 60 102 C36 101 22 92 22 72 Z"
        fill={scarf}
      />
      <Path d="M30 90 C38 99 50 102 60 102 C70 102 82 99 90 90 C84 97 72 100 60 100 C48 100 36 97 30 90 Z" fill={scarfDeep} />
      {/* soft highlight */}
      <Path d="M32 34 C38 24 47 19 56 18" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={4} strokeLinecap="round" fill="none" />
      {/* under-scarf band framing the face */}
      <Ellipse cx={60} cy={57} rx={28.5} ry={27.5} fill={band} />
      <Ellipse cx={60} cy={58} rx={25.5} ry={24.5} fill={SKIN} />
      <Face mood={mood} blink={blink} />
      {/* little pin */}
      <Circle cx={84} cy={84} r={3} fill={colors.gold} />
      <Circle cx={83.2} cy={83.1} r={1} fill="#FFFFFF" fillOpacity={0.7} />
    </G>
  );
}

function BoyHead({ mood, blink }: { mood: MascotMood; blink: boolean }) {
  return (
    <G>
      {/* ears */}
      <Circle cx={28} cy={60} r={7} fill={SKIN} />
      <Circle cx={92} cy={60} r={7} fill={SKIN} />
      <Circle cx={28.6} cy={60} r={3.4} fill={SKIN_DEEP} fillOpacity={0.55} />
      <Circle cx={91.4} cy={60} r={3.4} fill={SKIN_DEEP} fillOpacity={0.55} />
      {/* head */}
      <Ellipse cx={60} cy={56} rx={32} ry={31} fill={SKIN} />
      {/* short dark hair, visible at the sides under the cap */}
      <Path
        d="M28.2 62 C26.6 34 41 22 60 22 C79 22 93.4 34 91.8 62 C90.4 54.6 88 50.6 84 48.6 C76 47.2 68 46.6 60 46.6 C52 46.6 44 47.2 36 48.6 C32 50.6 29.6 54.6 28.2 62 Z"
        fill={HAIR}
      />
      {/* kufi */}
      <Path
        d="M30 41 C31 25 44 16.5 60 16.5 C76 16.5 89 25 90 41 C81 38 71 37 60 37 C49 37 39 38 30 41 Z"
        fill="#FFFFFF"
        stroke={colors.lineLip}
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
      <Path
        d="M30 41 C39 38 49 37 60 37 C71 37 81 38 90 41 L90.4 44.6 C81 41.6 71 40.6 60 40.6 C49 40.6 39 41.6 29.6 44.6 Z"
        fill={colors.line}
      />
      <G fill={colors.line}>
        <Circle cx={45} cy={28} r={1.6} />
        <Circle cx={60} cy={24} r={1.6} />
        <Circle cx={75} cy={28} r={1.6} />
        <Circle cx={52} cy={33} r={1.4} />
        <Circle cx={68} cy={33} r={1.4} />
      </G>
      <Path d="M37 31 C40 25 46 21 52 19.6" stroke={colors.mist} strokeWidth={3} strokeLinecap="round" fill="none" />
      <Face mood={mood} blink={blink} />
    </G>
  );
}

function MascotArt({ variant, mood, accent, blink, waveUp }: { variant: MascotVariant; mood: MascotMood; accent: string; blink: boolean; waveUp: boolean }) {
  const robeLip = darken(accent, 0.2);
  const sleeve = darken(accent, 0.07);
  const trim = lighten(accent, 0.55);
  const pose = poseFor(mood, waveUp);

  return (
    <G>
      {/* shadow */}
      <Ellipse cx={60} cy={135} rx={30} ry={4} fill="#000000" fillOpacity={0.08} />
      {/* feet */}
      <Ellipse cx={50} cy={131} rx={8} ry={4.6} fill="#4A4F5C" />
      <Ellipse cx={70} cy={131} rx={8} ry={4.6} fill="#4A4F5C" />
      {/* robe */}
      <Path d="M36 92 C36 83 46 80 60 80 C74 80 84 83 84 92 L90 124 C90.8 129 87 131 82 131 L38 131 C33 131 29.2 129 30 124 Z" fill={robeLip} />
      <Path d="M36 92 C36 83 46 80 60 80 C74 80 84 83 84 92 L89.4 120.6 C90.2 125 87 127 82.4 127 L37.6 127 C33 127 29.8 125 30.6 120.6 Z" fill={accent} />
      {variant === "boy" ? (
        <Path d="M60 84 L60 112" stroke={trim} strokeWidth={2.4} strokeLinecap="round" />
      ) : (
        <Path d="M38 116 C46 119 74 119 82 116" stroke={trim} strokeWidth={2.6} strokeLinecap="round" fill="none" />
      )}
      {/* arms */}
      <G stroke={sleeve} strokeWidth={11} strokeLinecap="round" fill="none">
        <Path d={armPath(SHOULDER_L, pose.leftCtrl, pose.left)} />
        <Path d={armPath(SHOULDER_R, pose.rightCtrl, pose.right)} />
      </G>
      {/* head */}
      {variant === "boy" ? (
        <BoyHead mood={mood} blink={blink} />
      ) : (
        <GirlHead accent={accent} mood={mood} blink={blink} />
      )}
      {/* hands */}
      <Circle cx={pose.left.x} cy={pose.left.y} r={7} fill={SKIN} />
      <Circle cx={pose.right.x} cy={pose.right.y} r={7} fill={SKIN} />
      <Circle cx={pose.left.x - 2} cy={pose.left.y - 2.2} r={2} fill="#FFFFFF" fillOpacity={0.4} />
      <Circle cx={pose.right.x - 2} cy={pose.right.y - 2.2} r={2} fill="#FFFFFF" fillOpacity={0.4} />
      {mood === "think" ? (
        <G fill={colors.gem}>
          <Circle cx={100} cy={30} r={3} />
          <Circle cx={106} cy={20} r={4.4} />
          <Circle cx={95} cy={39} r={2} />
        </G>
      ) : null}
      {mood === "cheer" ? (
        <G>
          <Path d="M14 40 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill={colors.gold} />
          <Path d="M104 34 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6z" fill={colors.gold} />
        </G>
      ) : null}
    </G>
  );
}

const MemoArt = memo(MascotArt);

/** The app's mascot: a friendly child (girl in hijab, or boy in a kufi). */
export function Mascot({ variant, mood = "happy", size = 120, accent = colors.green, animated = true, style }: MascotProps) {
  const resolved = resolveMascotVariant(variant);
  const bob = useRef(new Animated.Value(0)).current;
  const [blink, setBlink] = useState(false);
  const [waveUp, setWaveUp] = useState(true);

  // Bob (or bounce when cheering).
  useEffect(() => {
    if (!animated) {
      bob.setValue(0);
      return undefined;
    }
    const cheer = mood === "cheer";
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: cheer ? 320 : 1300,
          easing: cheer ? Easing.out(Easing.quad) : Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: cheer ? 320 : 1300,
          easing: cheer ? Easing.in(Easing.quad) : Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animated, bob, mood]);

  // Blink every few seconds.
  useEffect(() => {
    if (!animated || mood === "cheer") {
      return undefined;
    }
    let open: ReturnType<typeof setTimeout> | undefined;
    let next: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      next = setTimeout(() => {
        setBlink(true);
        open = setTimeout(() => {
          setBlink(false);
          schedule();
        }, 140);
      }, 2400 + Math.random() * 2200);
    };
    schedule();
    return () => {
      if (open) clearTimeout(open);
      if (next) clearTimeout(next);
    };
  }, [animated, mood]);

  // Wave the raised hand.
  useEffect(() => {
    if (!animated || mood !== "wave") {
      return undefined;
    }
    const timer = setInterval(() => setWaveUp((value) => !value), 320);
    return () => clearInterval(timer);
  }, [animated, mood]);

  const lift = mood === "cheer" ? -size * 0.07 : -size * 0.025;
  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, lift] });
  const height = (size * VIEW_H) / VIEW_W;

  return (
    <Animated.View
      style={[styles.root, { width: size, height, transform: [{ translateY }] }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <Svg width={size} height={height} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
        <MemoArt variant={resolved} mood={mood} accent={accent} blink={blink} waveUp={waveUp} />
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center"
  }
});
