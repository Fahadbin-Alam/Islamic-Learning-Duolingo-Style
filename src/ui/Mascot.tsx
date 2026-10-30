import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";
import { smoothKeys, useReduceMotion } from "./motion";
import { Drop, Floater, Heart, Puff, Sparkle, Word, shake, useCycle, useOneShot } from "./reactions";
import { feedback } from "./sound";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { colors, darken, lighten } from "./theme";

export type MascotMood =
  | "happy"
  | "cheer"
  | "think"
  | "sad"
  | "wave"
  // Tap reactions on the path (see TAP_REACTIONS).
  | "laugh"
  | "mad"
  | "surprised"
  | "cry"
  | "love"
  | "sleepy";
export type MascotVariant = "girl" | "boy";

export type MascotProps = {
  /** 'girl' | 'boy'. Legacy ids: 'hijabi' -> girl, 'muslim_man' -> boy. Anything else -> girl. */
  variant?: string;
  mood?: MascotMood;
  size?: number;
  /**
   * Clothing color. Default: the brand primary (colors.green). Screens pass the topic accent so the
   * mascot keeps one look outside lessons.
   */
  accent?: string;
  animated?: boolean;
  /** A tap makes the mascot react: laugh, get mad, wave, cry, fall in love... one after another. */
  tappable?: boolean;
  testID?: string;
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

function poseFor(mood: MascotMood): Pose {
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
        // The raised arm: drawn in its own layer and swung about the shoulder (see WAVE_*).
        right: { x: 105, y: 70 },
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
    case "mad":
      // Hands on hips.
      return {
        left: { x: 36, y: 110 },
        right: { x: 84, y: 110 },
        leftCtrl: { x: 22, y: 100 },
        rightCtrl: { x: 98, y: 100 }
      };
    case "surprised":
      // Hands up by the cheeks.
      return {
        left: { x: 30, y: 74 },
        right: { x: 90, y: 74 },
        leftCtrl: { x: 26, y: 96 },
        rightCtrl: { x: 94, y: 96 }
      };
    case "love":
      // Hands together at the chest.
      return {
        left: { x: 54, y: 100 },
        right: { x: 66, y: 100 },
        leftCtrl: { x: 38, y: 108 },
        rightCtrl: { x: 82, y: 108 }
      };
    case "laugh":
      // Holding the tummy.
      return {
        left: { x: 46, y: 112 },
        right: { x: 74, y: 112 },
        leftCtrl: { x: 30, y: 108 },
        rightCtrl: { x: 90, y: 108 }
      };
    case "cry":
      return {
        left: { x: 37, y: 120 },
        right: { x: 83, y: 120 },
        leftCtrl: { x: 35, y: 106 },
        rightCtrl: { x: 85, y: 106 }
      };
    case "happy":
    case "sleepy":
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

  if (mood === "laugh") {
    // Squeezed shut: > <
    return (
      <G stroke={EYE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <Path d={`M${leftX - 4.5} ${y - 4} L${leftX + 3.5} ${y} L${leftX - 4.5} ${y + 4}`} />
        <Path d={`M${rightX + 4.5} ${y - 4} L${rightX - 3.5} ${y} L${rightX + 4.5} ${y + 4}`} />
      </G>
    );
  }

  if (mood === "cry") {
    return (
      <G>
        <G stroke={EYE} strokeWidth={3} strokeLinecap="round" fill="none">
          <Path d={`M${leftX - 5} ${y + 1} Q${leftX} ${y - 3} ${leftX + 5} ${y + 1}`} />
          <Path d={`M${rightX - 5} ${y + 1} Q${rightX} ${y - 3} ${rightX + 5} ${y + 1}`} />
          <Path d={`M${leftX - 5.5} ${y - 7} Q${leftX - 1} ${y - 9.6} ${leftX + 4} ${y - 11}`} strokeWidth={2.2} />
          <Path d={`M${rightX + 5.5} ${y - 7} Q${rightX + 1} ${y - 9.6} ${rightX - 4} ${y - 11}`} strokeWidth={2.2} />
        </G>
        {/* tear streams */}
        <Path d={`M${leftX - 3} ${y + 3} Q${leftX - 5} ${y + 10} ${leftX - 4} ${y + 16}`} stroke="#7CC2F2" strokeWidth={3} strokeLinecap="round" fill="none" />
        <Path d={`M${rightX + 3} ${y + 3} Q${rightX + 5} ${y + 10} ${rightX + 4} ${y + 16}`} stroke="#7CC2F2" strokeWidth={3} strokeLinecap="round" fill="none" />
      </G>
    );
  }

  if (mood === "love") {
    return (
      <G fill="#FF5C8A">
        {[leftX, rightX].map((cx) => (
          <Path
            key={cx}
            d={`M${cx} ${y + 6} C${cx} ${y + 6} ${cx - 7} ${y + 1.5} ${cx - 7} ${y - 2.5} C${cx - 7} ${y - 5} ${cx - 5} ${y - 6.5} ${cx - 3} ${y - 6.5} C${cx - 1.6} ${y - 6.5} ${cx - 0.6} ${y - 5.6} ${cx} ${y - 4.5} C${cx + 0.6} ${y - 5.6} ${cx + 1.6} ${y - 6.5} ${cx + 3} ${y - 6.5} C${cx + 5} ${y - 6.5} ${cx + 7} ${y - 5} ${cx + 7} ${y - 2.5} C${cx + 7} ${y + 1.5} ${cx} ${y + 6} ${cx} ${y + 6} Z`}
          />
        ))}
      </G>
    );
  }

  if (mood === "sleepy") {
    return (
      <G stroke={EYE} strokeWidth={2.8} strokeLinecap="round" fill="none">
        <Path d={`M${leftX - 5} ${y + 1} Q${leftX} ${y + 3.5} ${leftX + 5} ${y + 1}`} />
        <Path d={`M${rightX - 5} ${y + 1} Q${rightX} ${y + 3.5} ${rightX + 5} ${y + 1}`} />
      </G>
    );
  }

  if (mood === "surprised" && !blink) {
    return (
      <G>
        {[leftX, rightX].map((cx) => (
          <G key={cx}>
            <Circle cx={cx} cy={y} r={6.6} fill="#FFFFFF" stroke={EYE} strokeWidth={1.6} />
            <Circle cx={cx} cy={y} r={3.4} fill={EYE} />
            <Circle cx={cx + 1.2} cy={y - 1.3} r={1.1} fill="#FFFFFF" />
          </G>
        ))}
        <G stroke={EYE} strokeWidth={2.2} strokeLinecap="round" fill="none">
          <Path d={`M${leftX - 4.5} ${y - 12} Q${leftX} ${y - 15} ${leftX + 4.5} ${y - 12.5}`} />
          <Path d={`M${rightX - 4.5} ${y - 12.5} Q${rightX} ${y - 15} ${rightX + 4.5} ${y - 12}`} />
        </G>
      </G>
    );
  }

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
      {mood === "mad" ? (
        // Cross brows, pointing down to the middle.
        <G stroke={EYE} strokeWidth={2.6} strokeLinecap="round" fill="none">
          <Path d={`M${leftX - 5} ${y - 10.5} L${leftX + 4.5} ${y - 6.5}`} />
          <Path d={`M${rightX + 5} ${y - 10.5} L${rightX - 4.5} ${y - 6.5}`} />
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
    case "laugh":
      return (
        <G>
          <Path d="M48.5 65.5 Q60 64 71.5 65.5 Q70 80 60 80 Q50 80 48.5 65.5 Z" fill={MOUTH} />
          <Path d="M50.5 66.2 Q60 65.2 69.5 66.2 L69 68.2 Q60 67.4 51 68.2 Z" fill="#FFFFFF" />
          <Path d="M53.5 76 Q60 71.5 66.5 76 Q63.8 80 60 80 Q56.2 80 53.5 76 Z" fill={TONGUE} />
        </G>
      );
    case "mad":
      return <Path d="M53.5 72.5 Q57 69.5 60 71 Q63 69.5 66.5 72.5" stroke={MOUTH} strokeWidth={2.8} strokeLinecap="round" fill="none" />;
    case "surprised":
      return <Ellipse cx={60} cy={71.5} rx={4.2} ry={5.2} fill={MOUTH} />;
    case "cry":
      return (
        <G>
          <Path d="M52 74 Q60 64.5 68 74 Q60 71.5 52 74 Z" fill={MOUTH} stroke={MOUTH} strokeWidth={2} strokeLinejoin="round" />
        </G>
      );
    case "sleepy":
      return <Ellipse cx={60} cy={70.5} rx={2.6} ry={3} fill={MOUTH} />;
    case "love":
      return <Path d="M53 67 Q60 74.5 67 67" stroke={MOUTH} strokeWidth={2.8} strokeLinecap="round" fill="none" />;
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
      <Ellipse cx={39} cy={65} rx={5.4} ry={3.4} fill={mood === "mad" ? "#FF5A5A" : CHEEK} fillOpacity={mood === "mad" || mood === "love" ? 0.8 : 0.55} />
      <Ellipse cx={81} cy={65} rx={5.4} ry={3.4} fill={mood === "mad" ? "#FF5A5A" : CHEEK} fillOpacity={mood === "mad" || mood === "love" ? 0.8 : 0.55} />
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

type ArtProps = { variant: MascotVariant; mood: MascotMood; accent: string; blink: boolean };

/**
 * The mascot is drawn in layers so the waving arm can swing smoothly on the native driver:
 * "body" (shadow, feet, robe, still arms), "head", and "front" (hands and little extras). While
 * waving, the raised arm goes between body and head and its hand between head and front.
 */
type Layer = "all" | "body" | "head" | "front";

function MascotArt({ variant, mood, accent, blink, layer }: ArtProps & { layer: Layer }) {
  const robeLip = darken(accent, 0.2);
  const sleeve = darken(accent, 0.07);
  const trim = lighten(accent, 0.55);
  const pose = poseFor(mood);
  const swingsRight = mood === "wave";
  const show = (part: Exclude<Layer, "all">) => layer === "all" || layer === part;

  return (
    <G>
      {show("body") ? (
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
            {layer === "all" || !swingsRight ? <Path d={armPath(SHOULDER_R, pose.rightCtrl, pose.right)} /> : null}
          </G>
        </G>
      ) : null}
      {/* head */}
      {show("head") ? variant === "boy" ? <BoyHead mood={mood} blink={blink} /> : <GirlHead accent={accent} mood={mood} blink={blink} /> : null}
      {show("front") ? (
        <G>
          {/* hands */}
          <Circle cx={pose.left.x} cy={pose.left.y} r={7} fill={SKIN} />
          <Circle cx={pose.left.x - 2} cy={pose.left.y - 2.2} r={2} fill="#FFFFFF" fillOpacity={0.4} />
          {layer === "all" || !swingsRight ? <Hand at={pose.right} /> : null}
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
      ) : null}
    </G>
  );
}

function Hand({ at }: { at: Point }) {
  return (
    <G>
      <Circle cx={at.x} cy={at.y} r={7} fill={SKIN} />
      <Circle cx={at.x - 2} cy={at.y - 2.2} r={2} fill="#FFFFFF" fillOpacity={0.4} />
    </G>
  );
}

/** The waving arm (sleeve only) or its hand, for the swinging layers. */
function WaveArmArt({ accent, part }: { accent: string; part: "arm" | "hand" }) {
  const pose = poseFor("wave");
  if (part === "hand") return <Hand at={pose.right} />;
  return <Path d={armPath(SHOULDER_R, pose.rightCtrl, pose.right)} stroke={darken(accent, 0.07)} strokeWidth={11} strokeLinecap="round" fill="none" />;
}

const MemoArt = memo(MascotArt);
const MemoWaveArm = memo(WaveArmArt);

/** The wave swings the raised arm this far either side, about the shoulder. */
const WAVE_DEG = 11;
const WAVE_MS = 300;

/** The app's mascot: a friendly child (girl in hijab, or boy in a kufi). */
function MascotFigure({ variant, mood = "happy", size = 120, accent = colors.green, animated = true, style }: MascotProps) {
  const resolved = resolveMascotVariant(variant);
  const reduceMotion = useReduceMotion();
  const moving = animated && !reduceMotion;
  const bob = useRef(new Animated.Value(0)).current;
  const wave = useRef(new Animated.Value(0)).current;
  const [blink, setBlink] = useState(false);

  // Bob (or bounce when cheering).
  useEffect(() => {
    if (!moving) {
      bob.setValue(0);
      return undefined;
    }
    const cheer = mood === "cheer";
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: cheer ? 340 : 1300,
          easing: cheer ? Easing.out(Easing.cubic) : Easing.inOut(Easing.sin),
          useNativeDriver: true
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: cheer ? 340 : 1300,
          easing: cheer ? Easing.in(Easing.quad) : Easing.inOut(Easing.sin),
          useNativeDriver: true
        })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [moving, bob, mood]);

  // Blink every few seconds.
  useEffect(() => {
    if (!moving || mood === "cheer") {
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
  }, [moving, mood]);

  // Wave the raised hand: a smooth swing on the native driver, not a redraw.
  const waving = mood === "wave";
  useEffect(() => {
    wave.setValue(0);
    if (!moving || !waving) {
      return undefined;
    }
    const swing = (toValue: number) =>
      Animated.timing(wave, { toValue, duration: WAVE_MS, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
    const loop = Animated.loop(Animated.sequence([swing(1), swing(-1)]));
    // Start from the middle so the first swing is the same length as the rest.
    const start = Animated.timing(wave, { toValue: -1, duration: WAVE_MS / 2, easing: Easing.out(Easing.sin), useNativeDriver: true });
    const all = Animated.sequence([start, loop]);
    all.start();
    return () => all.stop();
  }, [moving, waving, wave]);

  const cheer = mood === "cheer";
  const lift = cheer ? -size * 0.07 : -size * 0.025;
  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, lift] });
  // A cheer squashes a touch at the bottom of each bounce and stretches at the top; idle breathes.
  const scaleY = bob.interpolate({ inputRange: [0, 0.25, 1], outputRange: cheer ? [0.95, 1, 1.03] : [1, 1, 1.012] });
  const scaleX = bob.interpolate({ inputRange: [0, 0.25, 1], outputRange: cheer ? [1.04, 1, 0.98] : [1, 1, 0.995] });
  const rotate = wave.interpolate({ inputRange: [-1, 1], outputRange: [`${-WAVE_DEG}deg`, `${WAVE_DEG}deg`] });
  const height = (size * VIEW_H) / VIEW_W;
  const box = { width: size, height };
  const viewBox = `0 0 ${VIEW_W} ${VIEW_H}`;
  const swingStyle = [
    StyleSheet.absoluteFill,
    { transformOrigin: `${(SHOULDER_R.x / VIEW_W) * 100}% ${(SHOULDER_R.y / VIEW_H) * 100}%`, transform: [{ rotate }] }
  ];

  return (
    <Animated.View
      style={[styles.root, box, { transformOrigin: "bottom", transform: [{ translateY }, { scaleX }, { scaleY }] }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      {waving ? (
        <>
          <Svg width={size} height={height} viewBox={viewBox} style={StyleSheet.absoluteFill}>
            <MemoArt variant={resolved} mood={mood} accent={accent} blink={blink} layer="body" />
          </Svg>
          <Animated.View style={swingStyle} pointerEvents="none">
            <Svg width={size} height={height} viewBox={viewBox}>
              <MemoWaveArm accent={accent} part="arm" />
            </Svg>
          </Animated.View>
          <Svg width={size} height={height} viewBox={viewBox} style={StyleSheet.absoluteFill}>
            <MemoArt variant={resolved} mood={mood} accent={accent} blink={blink} layer="head" />
          </Svg>
          <Animated.View style={swingStyle} pointerEvents="none">
            <Svg width={size} height={height} viewBox={viewBox}>
              <MemoWaveArm accent={accent} part="hand" />
            </Svg>
          </Animated.View>
          <Svg width={size} height={height} viewBox={viewBox} style={StyleSheet.absoluteFill}>
            <MemoArt variant={resolved} mood={mood} accent={accent} blink={blink} layer="front" />
          </Svg>
        </>
      ) : (
        <Svg width={size} height={height} viewBox={viewBox}>
          <MemoArt variant={resolved} mood={mood} accent={accent} blink={blink} layer="all" />
        </Svg>
      )}
    </Animated.View>
  );
}

type TapReaction = { mood: MascotMood; sound: GameSoundEvent; ms: number };

/** What the mascot does on each tap, in turn. Kept gentle: every feeling, nothing mean. */
export const TAP_REACTIONS: TapReaction[] = [
  { mood: "wave", sound: "boing", ms: 1800 },
  { mood: "laugh", sound: "giggle", ms: 1900 },
  { mood: "mad", sound: "grumble", ms: 1800 },
  { mood: "surprised", sound: "boing", ms: 1500 },
  { mood: "love", sound: "sparkle", ms: 2000 },
  { mood: "cry", sound: "sad", ms: 2100 },
  { mood: "cheer", sound: "xp", ms: 1700 },
  { mood: "sleepy", sound: "whoosh", ms: 2200 },
  { mood: "think", sound: "soft_ui", ms: 1700 }
];

/** The little things that pop off the mascot for a reaction, laid out on its box. */
function ReactionBits({ mood, t, size }: { mood: MascotMood; t: Animated.Value; size: number }) {
  const u = size / VIEW_W;
  switch (mood) {
    case "laugh":
      return (
        <>
          <Floater t={t} from={0.05} to={0.6} x={-6 * u} y={20 * u} rise={22 * u} drift={-8 * u}>
            <Word size={Math.max(11, 16 * u)} color="#FF8A1F">HA</Word>
          </Floater>
          <Floater t={t} from={0.3} to={0.9} x={94 * u} y={14 * u} rise={22 * u} drift={8 * u}>
            <Word size={Math.max(11, 16 * u)} color="#FF8A1F">HA</Word>
          </Floater>
        </>
      );
    case "mad":
      return (
        <>
          {[0, 0.25, 0.5].map((from, index) => (
            <React.Fragment key={from}>
              <Floater t={t} from={from} to={from + 0.4} x={14 * u} y={22 * u} rise={18 * u} drift={-10 * u}>
                <Puff size={Math.max(8, (12 - index) * u)} />
              </Floater>
              <Floater t={t} from={from + 0.1} to={from + 0.5} x={96 * u} y={22 * u} rise={18 * u} drift={10 * u}>
                <Puff size={Math.max(8, (12 - index) * u)} />
              </Floater>
            </React.Fragment>
          ))}
        </>
      );
    case "surprised":
      return (
        <Floater t={t} from={0} to={0.7} x={56 * u} y={-6 * u} rise={10 * u}>
          <Word size={Math.max(14, 22 * u)} color="#FF5A5A">!</Word>
        </Floater>
      );
    case "love":
      return (
        <>
          {[
            { x: 10, y: 30, from: 0, drift: -6 },
            { x: 92, y: 24, from: 0.2, drift: 8 },
            { x: 52, y: 4, from: 0.4, drift: 0 }
          ].map((heart) => (
            <Floater key={heart.x} t={t} from={heart.from} to={heart.from + 0.55} x={heart.x * u} y={heart.y * u} rise={30 * u} drift={heart.drift * u}>
              <Heart size={Math.max(10, 16 * u)} />
            </Floater>
          ))}
        </>
      );
    case "cry":
      return (
        <>
          {[0, 0.2, 0.4, 0.6].map((from, index) => (
            <Floater key={from} t={t} from={from} to={from + 0.35} x={(index % 2 === 0 ? 40 : 76) * u} y={66 * u} rise={-26 * u} drift={(index % 2 === 0 ? -8 : 8) * u} pop={false}>
              <Drop size={Math.max(5, 7 * u)} color="#7CC2F2" />
            </Floater>
          ))}
        </>
      );
    case "cheer":
      return (
        <>
          {[
            { x: 4, y: 40, from: 0 },
            { x: 100, y: 30, from: 0.15 },
            { x: 20, y: 6, from: 0.3 },
            { x: 86, y: 0, from: 0.45 }
          ].map((star) => (
            <Floater key={star.x} t={t} from={star.from} to={star.from + 0.45} x={star.x * u} y={star.y * u} rise={16 * u}>
              <Sparkle size={Math.max(10, 14 * u)} />
            </Floater>
          ))}
        </>
      );
    case "sleepy":
      return (
        <>
          {["Z", "z", "z"].map((letter, index) => (
            <Floater key={index} t={t} from={index * 0.22} to={index * 0.22 + 0.5} x={(88 + index * 6) * u} y={(20 - index * 6) * u} rise={20 * u} drift={10 * u}>
              <Word size={Math.max(10, (17 - index * 3) * u)} color="#8C7BF4">{letter}</Word>
            </Floater>
          ))}
        </>
      );
    default:
      return null;
  }
}

/** The app's mascot: a friendly child (girl in hijab, or boy in a kufi). */
export function Mascot(props: MascotProps) {
  const { tappable, mood = "happy", size = 120, style, testID, animated = true } = props;
  const reduceMotion = useReduceMotion();
  const [reaction, setReaction] = useState<MascotMood | null>(null);
  const { value: t, play } = useOneShot();
  const next = useCycle(TAP_REACTIONS.length);
  const height = (size * VIEW_H) / VIEW_W;

  if (!tappable) {
    return <MascotFigure {...props} />;
  }

  const onTap = () => {
    const pick = TAP_REACTIONS[next()];
    feedback(pick.sound, "light");
    setReaction(pick.mood);
    // With reduced motion the face still changes for a moment; only the moving bits are left out.
    play(pick.ms, () => setReaction(null));
  };

  const shown = reaction ?? mood;
  const moves = !reduceMotion && animated;
  // Body moves for each feeling: a happy hop, an angry stomp-shake, a jump of surprise, a sad droop.
  const transform =
    !moves || !reaction
      ? []
      : reaction === "laugh"
        ? [{ rotate: shake(t, 0.05, 0.85, 5, 7) }]
        : reaction === "mad"
          ? [{ translateX: shake(t, 0, 0.6, 2.5, 6, "") }]
          : reaction === "surprised"
            ? [{ translateY: t.interpolate(smoothKeys([0, 0.15, 0.32, 0.42, 1], [0, -size * 0.16, 0, -size * 0.03, 0])) }]
            : reaction === "love"
              ? [{ scale: t.interpolate(smoothKeys([0, 0.15, 0.3, 0.45, 0.6, 1], [1, 1.06, 1, 1.06, 1, 1])) }]
              : reaction === "cry"
                ? [{ scaleY: t.interpolate(smoothKeys([0, 0.15, 0.85, 1], [1, 0.95, 0.95, 1])) }]
                : reaction === "sleepy"
                  ? [{ rotate: t.interpolate(smoothKeys([0, 0.2, 0.8, 1], ["0deg", "-7deg", "-7deg", "0deg"])) }]
                  : [];

  return (
    <Pressable
      onPress={onTap}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel="mascot"
      testID={testID}
      style={[{ width: size, height }, style]}
    >
      <Animated.View style={{ width: size, height, transformOrigin: "bottom", transform }}>
        <MascotFigure {...props} mood={shown} style={undefined} />
      </Animated.View>
      {moves && reaction ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <ReactionBits mood={reaction} t={t} size={size} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center"
  }
});
