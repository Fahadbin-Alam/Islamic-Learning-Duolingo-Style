import React, { memo } from "react";
import Svg, { Circle, Ellipse, G, Path, Polygon, Rect } from "react-native-svg";

export type IconName =
  | "flame"
  | "gem"
  | "heart"
  | "heartBroken"
  | "star"
  | "crown"
  | "lock"
  | "check"
  | "close"
  | "book"
  | "bookOpen"
  | "chest"
  | "chestOpen"
  | "speaker"
  | "learn"
  | "practice"
  | "crew"
  | "shop"
  | "profile"
  | "crescent"
  | "mosque"
  | "kaaba"
  | "lantern"
  | "quran"
  | "dua"
  | "palm"
  | "scroll"
  | "sparkle"
  | "trophy"
  | "bolt"
  | "arrowLeft"
  | "chevronDown"
  | "chevronRight"
  | "settings"
  | "info"
  | "key"
  | "infinity"
  | "ring"
  | "family"
  | "people"
  | "moon"
  | "water"
  | "sun"
  | "star8"
  | "bell"
  | "logout"
  | "plus"
  | "play"
  | "handHeart"
  | "shield"
  | "coins";

export type IconProps = {
  name: IconName;
  size?: number;
  /** When set, the icon is drawn as a single-color silhouette in this color. */
  color?: string;
};

// ---------- palette ----------
const C = {
  flame: "#FF8A1F",
  flameDeep: "#F06A0F",
  yellow: "#FFC21A",
  yellowSoft: "#FFE27A",
  gold: "#FFC21A",
  goldLip: "#E09B00",
  goldDeep: "#C98500",
  gem: "#2FA8FF",
  gemLight: "#8AD3FF",
  gemDeep: "#1683D1",
  heart: "#FF4D5E",
  heartDeep: "#D3374A",
  green: "#21B573",
  greenLight: "#5FD69C",
  greenDeep: "#178A56",
  ink: "#1F2D27",
  inkSoft: "#6A7A73",
  gray: "#9AA9A2",
  grayLight: "#C7D0CB",
  grayDeep: "#7D8C85",
  wood: "#C47A3A",
  woodDeep: "#9A5724",
  woodDark: "#7A421A",
  cream: "#FFF3D6",
  parchment: "#F8E2AE",
  parchmentDeep: "#E2BD72",
  skin: "#F7C59A",
  skinDeep: "#E4A06C",
  purple: "#8E5CF7",
  purpleDeep: "#6C3BC6",
  pink: "#FF7FA6",
  indigo: "#4C5BD4",
  indigoDeep: "#3A47B0",
  kaaba: "#2B2D33",
  kaabaSide: "#1C1D22",
  kaabaTop: "#44474F",
  white: "#FFFFFF"
};

// ---------- geometry helpers ----------
function starPoints(cx: number, cy: number, outer: number, inner: number, points: number, rotationDeg = -90) {
  const coords: string[] = [];
  for (let index = 0; index < points * 2; index += 1) {
    const radius = index % 2 === 0 ? outer : inner;
    const angle = ((rotationDeg + (index * 180) / points) * Math.PI) / 180;
    coords.push(`${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`);
  }
  return coords.join(" ");
}

function gearPath(cx: number, cy: number, outer: number, inner: number, teeth: number) {
  const steps = teeth * 4;
  let d = "";
  for (let index = 0; index < steps; index += 1) {
    const phase = index % 4;
    const radius = phase === 0 || phase === 1 ? outer : inner;
    const angle = ((index + 0.5) / steps) * Math.PI * 2;
    const x = (cx + radius * Math.cos(angle)).toFixed(2);
    const y = (cy + radius * Math.sin(angle)).toFixed(2);
    d += `${index === 0 ? "M" : "L"}${x} ${y}`;
  }
  return `${d}Z`;
}

const STAR5 = starPoints(12, 12.8, 10, 4.6, 5);
const STAR5_INNER = starPoints(12, 12.8, 5.2, 2.4, 5);
const STAR8 = starPoints(12, 12, 10.5, 7.6, 8, -90);
const STAR8_SMALL = starPoints(12, 12, 4.4, 3.2, 8, -90);
const CRESCENT_STAR = starPoints(18.2, 12.4, 3.6, 1.5, 5);
const GEAR = gearPath(12, 12, 10.5, 8, 8);
const QURAN_STAR = starPoints(12, 12, 4.2, 3, 8, -90);

// A crescent opening to the right.
const CRESCENT = "M15.25 4.14A8.5 8.5 0 1 0 15.25 20.86A11 11 0 0 1 15.25 4.14Z";
const HEART = "M12 21.2c-.4 0-.8-.1-1.1-.4C7.6 18.3 2.8 14.4 2.8 9.6 2.8 6.6 5.1 4.3 7.9 4.3c1.7 0 3.2.8 4.1 2.1.9-1.3 2.4-2.1 4.1-2.1 2.8 0 5.1 2.3 5.1 5.3 0 4.8-4.8 8.7-8.1 11.2-.3.3-.7.4-1.1.4z";

// ---------- paint helpers ----------
type Paint = { fill?: string; fillOpacity?: number; stroke?: string; strokeOpacity?: number };

class Tone {
  constructor(private readonly mono?: string) {}

  get isMono() {
    return Boolean(this.mono);
  }

  /** Main shape: full color, or the silhouette color. */
  f(color: string): Paint {
    return { fill: this.mono ?? color };
  }

  /** Filled and stroked in the same color (rounded corners on polygons). */
  r(color: string): Paint {
    return { fill: this.mono ?? color, stroke: this.mono ?? color };
  }

  /** Detail that sits on top of a main shape: drawn lighter in silhouette mode. */
  d(color: string): Paint {
    return this.mono ? { fill: "#FFFFFF", fillOpacity: 0.5 } : { fill: color };
  }

  /** Main stroke. */
  s(color: string): Paint {
    return { stroke: this.mono ?? color, fill: "none" };
  }

  /** Detail stroke. */
  ds(color: string): Paint {
    return this.mono ? { stroke: "#FFFFFF", strokeOpacity: 0.5, fill: "none" } : { stroke: color, fill: "none" };
  }
}

function Shine({ t, d }: { t: Tone; d: string }) {
  if (t.isMono) {
    return null;
  }
  return <Path d={d} fill="#FFFFFF" fillOpacity={0.55} />;
}

function Person({ t, x, y, s, color, deep }: { t: Tone; x: number; y: number; s: number; color: string; deep: string }) {
  // Head + shoulders, head centered on (x, y), scale s (1 = head radius 3.4).
  const r = 3.4 * s;
  const bodyTop = y + r + 0.9 * s;
  const w = 5.6 * s;
  const h = 6.2 * s;
  return (
    <G>
      <Path
        d={`M${x - w} ${bodyTop + h}v-${(h * 0.35).toFixed(2)}c0-${(h * 0.5).toFixed(2)} ${(w * 0.45).toFixed(2)}-${(h * 0.65).toFixed(2)} ${w.toFixed(2)}-${(h * 0.65).toFixed(2)}s${w.toFixed(2)} ${(h * 0.15).toFixed(2)} ${w.toFixed(2)} ${(h * 0.65).toFixed(2)}v${(h * 0.35).toFixed(2)}z`}
        {...t.f(deep)}
      />
      <Circle cx={x} cy={y} r={r} {...t.f(color)} />
      {!t.isMono ? <Circle cx={x - r * 0.35} cy={y - r * 0.4} r={r * 0.28} fill="#FFFFFF" fillOpacity={0.5} /> : null}
    </G>
  );
}

type Drawer = (t: Tone) => React.ReactNode;

const ICONS: Record<IconName, Drawer> = {
  flame: (t) => (
    <G>
      <Path
        d="M12 1.8c.5 2.9 2.4 4.6 4.3 6.6 1.9 1.9 3.6 4 3.6 7A7.9 7.9 0 0 1 12 23.2a7.9 7.9 0 0 1-7.9-7.8c0-2.6 1.2-4.7 2.9-6.3.2 1.6.9 2.8 2.1 3.5C8.8 8.4 9.8 4.7 12 1.8z"
        {...t.f(C.flame)}
      />
      <Path
        d="M12.2 11.2c1.4 1.6 3.6 3 3.6 5.8a3.8 3.8 0 0 1-7.6.1c0-1.7.8-2.8 1.8-3.7.2.9.6 1.5 1.2 1.9-.2-1.5.2-2.9 1-4.1z"
        {...t.d(C.yellow)}
      />
      <Shine t={t} d="M7.6 12.6c-.9 1.2-1.4 2.4-1.4 3.6 0 .5-.7.6-.8.1-.3-1.5.3-3.1 1.4-4.3.4-.4 1 .1.8.6z" />
    </G>
  ),
  gem: (t) => (
    <G>
      <Path d="M6.6 3.2h10.8l5 6.1L12 21.6 1.6 9.3z" {...t.f(C.gem)} />
      <Path d="M6.6 3.2h10.8l5 6.1H1.6z" {...t.d(C.gemLight)} />
      <Path d="M7.4 9.3h9.2L12 21.6z" {...t.d(C.gemDeep)} />
      <Path d="M8.2 3.2 12 9.3l3.8-6.1z" {...t.d("#B9E5FF")} />
      <Shine t={t} d="M4.4 9.3 7 5.6l.8.5-2.1 3.2z" />
    </G>
  ),
  heart: (t) => (
    <G>
      <Path d={HEART} {...t.f(C.heart)} />
      <Path d="M12 21.2c-.4 0-.8-.1-1.1-.4C7.6 18.3 2.8 14.4 2.8 9.6c0-.4 0-.8.1-1.1.8 4.2 5.1 7.7 8.2 10 .3.2.6.3.9.3s.6-.1.9-.3c3.1-2.3 7.4-5.8 8.2-10 .1.3.1.7.1 1.1 0 4.8-4.8 8.7-8.1 11.2-.3.3-.7.4-1.1.4z" {...t.d(C.heartDeep)} />
      <Shine t={t} d="M6.2 7.6c.7-.9 1.8-1.3 2.8-1.1.5.1.5.8 0 .9-.8.2-1.5.6-2 1.2-.5.6-1.3-.3-.8-1z" />
    </G>
  ),
  heartBroken: (t) => (
    <G>
      <Path d={HEART} {...t.f("#FF9AA4")} />
      <Path d="M12.4 6.4 10.6 10.6l2.6 2.2-1.9 4.2" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...t.ds("#FFFFFF")} />
      <Shine t={t} d="M6.2 7.6c.7-.9 1.8-1.3 2.8-1.1.5.1.5.8 0 .9-.8.2-1.5.6-2 1.2-.5.6-1.3-.3-.8-1z" />
    </G>
  ),
  star: (t) => (
    <G>
      <Polygon points={STAR5} strokeWidth={2.4} strokeLinejoin="round" {...t.r(C.gold)} />
      <Polygon points={STAR5_INNER} {...t.d(C.yellowSoft)} />
    </G>
  ),
  crown: (t) => (
    <G>
      <Path d="M2.6 7.6 7.4 12 12 4.6l4.6 7.4 4.8-4.4-1.9 10.6H4.5z" strokeLinejoin="round" strokeWidth={1.4} {...t.r(C.gold)} />
      <Path d="M4.4 18.2h15.2l-.3 1.9a1.3 1.3 0 0 1-1.3 1.1H6a1.3 1.3 0 0 1-1.3-1.1z" {...t.f(C.goldLip)} />
      <Circle cx={12} cy={13.4} r={1.8} {...t.d(C.heart)} />
      <Circle cx={7} cy={15} r={1.2} {...t.d(C.gem)} />
      <Circle cx={17} cy={15} r={1.2} {...t.d(C.gem)} />
      <Circle cx={2.6} cy={7.6} r={1.5} {...t.f(C.gold)} />
      <Circle cx={12} cy={4.4} r={1.5} {...t.f(C.gold)} />
      <Circle cx={21.4} cy={7.6} r={1.5} {...t.f(C.gold)} />
    </G>
  ),
  lock: (t) => (
    <G>
      <Path d="M7.6 11V8.2a4.4 4.4 0 0 1 8.8 0V11" strokeWidth={2.8} strokeLinecap="round" {...t.s(C.grayDeep)} />
      <Rect x={4.6} y={10} width={14.8} height={11.6} rx={3.2} {...t.f(C.gray)} />
      <Rect x={4.6} y={18.4} width={14.8} height={3.2} rx={1.6} {...t.d(C.grayDeep)} />
      <Circle cx={12} cy={14.6} r={1.8} {...t.d(C.grayDeep)} />
      <Rect x={11.1} y={15.2} width={1.8} height={2.8} rx={0.9} {...t.d(C.grayDeep)} />
    </G>
  ),
  check: (t) => (
    <Path d="M4.8 12.6 9.6 17.4 19.4 7" strokeWidth={3.6} strokeLinecap="round" strokeLinejoin="round" {...t.s(C.green)} />
  ),
  close: (t) => (
    <Path d="M6 6l12 12M18 6 6 18" strokeWidth={3.2} strokeLinecap="round" {...t.s(C.grayDeep)} />
  ),
  book: (t) => (
    <G>
      <Rect x={4} y={2.6} width={16} height={18.8} rx={2.6} {...t.f(C.purple)} />
      <Path d="M6 17.4h14v2.4a1.6 1.6 0 0 1-1.6 1.6H7.4A1.4 1.4 0 0 1 6 20z" {...t.d("#FFFFFF")} />
      <Rect x={4} y={2.6} width={3.2} height={18.8} rx={1.6} {...t.d(C.purpleDeep)} />
      <Polygon points={starPoints(13.4, 9.6, 3.2, 1.4, 4, -90)} {...t.d(C.gold)} />
    </G>
  ),
  bookOpen: (t) => (
    <G>
      <Path d="M1.6 6.8v13.4c3.7-1.3 7.2-1 10.4 1 3.2-2 6.7-2.3 10.4-1V6.8z" {...t.f(C.gemDeep)} />
      <Path d="M2.8 5.2c3.2-1.2 6.3-.9 9.2 1v13.4c-2.9-1.8-6-2.1-9.2-1z" {...t.d("#FFFFFF")} />
      <Path d="M21.2 5.2c-3.2-1.2-6.3-.9-9.2 1v13.4c2.9-1.8 6-2.1 9.2-1z" {...t.d("#F1F6FF")} />
      {!t.isMono ? (
        <G stroke={C.gemLight} strokeWidth={1.2} strokeLinecap="round">
          <Path d="M5 9c1.6-.4 3.1-.2 4.7.5M5 12c1.6-.4 3.1-.2 4.7.5M5 15c1.6-.4 3.1-.2 4.7.5" />
          <Path d="M19 9c-1.6-.4-3.1-.2-4.7.5M19 12c-1.6-.4-3.1-.2-4.7.5M19 15c-1.6-.4-3.1-.2-4.7.5" />
        </G>
      ) : null}
    </G>
  ),
  chest: (t) => (
    <G>
      <Path d="M3 10.6V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v1.6z" {...t.f(C.wood)} />
      <Rect x={3} y={10.6} width={18} height={10} rx={2.2} {...t.f(C.woodDeep)} />
      <Rect x={3} y={9.8} width={18} height={2} {...t.d(C.woodDark)} />
      <Rect x={6.2} y={4.2} width={2.2} height={16.4} {...t.d(C.gold)} />
      <Rect x={15.6} y={4.2} width={2.2} height={16.4} {...t.d(C.gold)} />
      <Rect x={10.2} y={8.6} width={3.6} height={5} rx={1.2} {...t.d(C.gold)} />
      <Circle cx={12} cy={11.2} r={0.8} {...t.d(C.woodDark)} />
    </G>
  ),
  chestOpen: (t) => (
    <G>
      <Path d="M3.4 10.4 4.6 4.6a2 2 0 0 1 2-1.6h10.8a2 2 0 0 1 2 1.6l1.2 5.8z" {...t.f(C.woodDark)} />
      <Path d="M6.9 3h2.2l-.6 7.4H6.2zM14.9 3h2.2l.7 7.4h-2.3z" {...t.d(C.goldLip)} />
      <Ellipse cx={12} cy={11.2} rx={8.4} ry={2.6} {...t.d(C.yellowSoft)} />
      <Circle cx={9.6} cy={10.6} r={1.6} {...t.d(C.gold)} />
      <Circle cx={13.4} cy={10.2} r={1.8} {...t.d(C.gold)} />
      <Rect x={3} y={11.2} width={18} height={9.4} rx={2.2} {...t.f(C.woodDeep)} />
      <Rect x={6.2} y={11.2} width={2.2} height={9.4} {...t.d(C.gold)} />
      <Rect x={15.6} y={11.2} width={2.2} height={9.4} {...t.d(C.gold)} />
      <Rect x={10.2} y={11.2} width={3.6} height={4} rx={1.2} {...t.d(C.gold)} />
    </G>
  ),
  speaker: (t) => (
    <G>
      <Path d="M3.4 9.2c0-.7.5-1.2 1.2-1.2h2.8l4.4-3.6c.8-.6 1.9 0 1.9.9v13.4c0 1-1.1 1.5-1.9.9L7.4 16H4.6c-.7 0-1.2-.5-1.2-1.2z" {...t.f(C.gem)} />
      <Path d="M16.2 9a4.2 4.2 0 0 1 0 6M18.8 6.4a8 8 0 0 1 0 11.2" strokeWidth={2.2} strokeLinecap="round" {...t.s(C.gem)} />
    </G>
  ),
  learn: (t) => (
    <G>
      <Path d="M5 10.6h14v8.8a2.2 2.2 0 0 1-2.2 2.2H7.2A2.2 2.2 0 0 1 5 19.4z" {...t.f(C.cream)} />
      <Path d="M2.6 11.2 12 3.4l9.4 7.8" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...t.s(C.heart)} />
      <Path d="M9.6 21.6v-4.4a2.4 2.4 0 0 1 4.8 0v4.4z" {...t.d(C.wood)} />
      {!t.isMono ? <Rect x={5} y={10.6} width={14} height={11} rx={2.2} fill="none" stroke="#F2D9A8" strokeWidth={1.4} /> : null}
    </G>
  ),
  practice: (t) => (
    <G>
      <Rect x={6} y={10.7} width={12} height={2.6} rx={1.3} {...t.f(C.gray)} />
      <Rect x={3.6} y={6.4} width={3.8} height={11.2} rx={1.6} {...t.f(C.gem)} />
      <Rect x={16.6} y={6.4} width={3.8} height={11.2} rx={1.6} {...t.f(C.gem)} />
      <Rect x={1.4} y={8.6} width={2.6} height={6.8} rx={1.2} {...t.f(C.gemDeep)} />
      <Rect x={20} y={8.6} width={2.6} height={6.8} rx={1.2} {...t.f(C.gemDeep)} />
      <Shine t={t} d="M4.6 7.6h1v5h-1z" />
      <Shine t={t} d="M17.6 7.6h1v5h-1z" />
    </G>
  ),
  crew: (t) => (
    <G>
      <Person t={t} x={5.6} y={8.6} s={0.78} color={C.gemLight} deep={C.gem} />
      <Person t={t} x={18.4} y={8.6} s={0.78} color={C.yellowSoft} deep={C.gold} />
      <Person t={t} x={12} y={7.4} s={1.02} color={C.greenLight} deep={C.green} />
    </G>
  ),
  shop: (t) => (
    <G>
      <Path d="M8.4 9.4V7.2a3.6 3.6 0 0 1 7.2 0v2.2" strokeWidth={2.2} strokeLinecap="round" {...t.s(C.purpleDeep)} />
      <Path d="M4.4 8.4c0-.6.5-1 1-1h13.2c.5 0 1 .4 1 1l-.9 11.4a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8z" {...t.f(C.purple)} />
      <Path d="M4.6 10.8h14.8l-.2 2.2H4.8z" {...t.d(C.gold)} />
      <Circle cx={8.8} cy={10.2} r={1.1} {...t.d(C.purpleDeep)} />
      <Circle cx={15.2} cy={10.2} r={1.1} {...t.d(C.purpleDeep)} />
      <Shine t={t} d="M6.4 14.4h1.2l.4 5h-1.2z" />
    </G>
  ),
  profile: (t) => (
    <G>
      <Path d="M3.6 21.4c0-4.6 3.8-7.6 8.4-7.6s8.4 3 8.4 7.6c0 .3-.2.6-.6.6H4.2c-.3 0-.6-.3-.6-.6z" {...t.f(C.purple)} />
      <Circle cx={12} cy={8.2} r={5} {...t.f(C.skin)} />
      <Path d="M7 8.2a5 5 0 0 1 10 0c-1.4-1.6-3-2.4-5-2.4s-3.6.8-5 2.4z" {...t.d("#4A3426")} />
      {!t.isMono ? <Circle cx={9.9} cy={9.2} r={0.7} fill={C.ink} /> : null}
      {!t.isMono ? <Circle cx={14.1} cy={9.2} r={0.7} fill={C.ink} /> : null}
    </G>
  ),
  crescent: (t) => (
    <G>
      <Path d={CRESCENT} {...t.f(C.gold)} />
      <Polygon points={CRESCENT_STAR} strokeWidth={1} strokeLinejoin="round" {...t.r(C.gold)} />
      <Shine t={t} d="M5.8 8.2c.8-1.4 2-2.5 3.4-3.2.5-.2.8.4.4.7-1.2.7-2.2 1.7-2.9 2.9-.3.5-1.1.1-.9-.4z" />
    </G>
  ),
  mosque: (t) => (
    <G>
      <Rect x={1.8} y={9} width={2.8} height={12.6} rx={0.8} {...t.f(C.greenDeep)} />
      <Path d="M1.8 9.4 3.2 6l1.4 3.4z" {...t.f(C.greenDeep)} />
      <Rect x={19.4} y={9} width={2.8} height={12.6} rx={0.8} {...t.f(C.greenDeep)} />
      <Path d="M19.4 9.4 20.8 6l1.4 3.4z" {...t.f(C.greenDeep)} />
      <Rect x={5.4} y={13} width={13.2} height={8.6} rx={0.8} {...t.f(C.cream)} />
      <Path d="M5.6 13.6c0-4 2.8-6.6 6.4-7.4 3.6.8 6.4 3.4 6.4 7.4z" {...t.f(C.green)} />
      <Path d="M12 3v3.4" strokeWidth={1.2} strokeLinecap="round" {...t.ds(C.goldLip)} />
      <Circle cx={12} cy={2.8} r={1.1} {...t.d(C.gold)} />
      <Path d="M9.8 21.6v-3.2a2.2 2.2 0 0 1 4.4 0v3.2z" {...t.d(C.greenDeep)} />
      <Shine t={t} d="M8 11.2c.6-1.6 1.6-2.8 3-3.6.4-.2.8.3.4.6-1.1.8-1.9 1.9-2.4 3.2-.2.5-1.1.3-1-.2z" />
    </G>
  ),
  kaaba: (t) => (
    <G>
      <Path d="M12 2.8 21 6.4 12 10 3 6.4z" {...t.f(C.kaabaTop)} />
      <Path d="M3 6.4 12 10v11.4l-9-3.6z" {...t.f(C.kaaba)} />
      <Path d="M21 6.4 12 10v11.4l9-3.6z" {...t.f(C.kaabaSide)} />
      <Path d="M3 9 12 12.6v2.2L3 11.2z" {...t.d(C.gold)} />
      <Path d="M21 9 12 12.6v2.2l9-3.6z" {...t.d(C.goldLip)} />
      <Path d="M15.4 20.1v-4l2.6-1.1v4z" {...t.d(C.goldLip)} />
    </G>
  ),
  lantern: (t) => (
    <G>
      <Circle cx={12} cy={2.8} r={1.4} strokeWidth={1.3} {...t.s(C.goldLip)} />
      <Path d="M8.4 7.2 9.6 4.4h4.8l1.2 2.8z" {...t.f(C.gold)} />
      <Path d="M7.4 7.2h9.2l-1 11H8.4z" {...t.f(C.flame)} />
      <Path d="M9.4 9.2h5.2l-.6 7h-4z" {...t.d(C.yellowSoft)} />
      <Path d="M12 10.4c.9 1 1.6 1.8 1.6 2.9a1.6 1.6 0 0 1-3.2 0c0-1.1.7-1.9 1.6-2.9z" {...t.d(C.flame)} />
      <Path d="M8.2 18.2h7.6l-.9 2.8H9.1z" {...t.f(C.goldLip)} />
      <Rect x={6.8} y={6.6} width={10.4} height={1.6} rx={0.8} {...t.f(C.goldLip)} />
    </G>
  ),
  quran: (t) => (
    <G>
      <Rect x={4} y={2.6} width={16} height={18.8} rx={2.6} {...t.f(C.greenDeep)} />
      <Rect x={6} y={4.6} width={12} height={14.8} rx={1.6} strokeWidth={1.2} {...t.ds(C.gold)} />
      <Polygon points={QURAN_STAR} {...t.d(C.gold)} />
      <Circle cx={12} cy={12} r={1.4} {...t.d(C.greenDeep)} />
      <Shine t={t} d="M5.4 5.2h1v6h-1z" />
    </G>
  ),
  dua: (t) => {
    const palm = "M11.2 6.4v11.8a3.4 3.4 0 0 1-3.4 3.4H7a3.6 3.6 0 0 1-3.6-3.6v-4.6c0-1 .8-1.8 1.8-1.8.2 0 .3 0 .4.1V6.4a2.8 2.8 0 0 1 5.6 0z";
    const hand = (
      <G transform="rotate(-8 8 21)">
        <Path d={palm} {...t.f(C.skin)} />
        <Path d="M7.5 4.6v4.6M9.4 4.6v4.6" strokeWidth={0.9} strokeLinecap="round" {...t.ds(C.skinDeep)} />
      </G>
    );
    return (
      <G>
        <G transform="translate(-0.4 0)">{hand}</G>
        <G transform="translate(24.4 0) scale(-1 1)">{hand}</G>
        <Path d="M12 0.8c.3 1.6.8 2.1 2.2 2.4-1.4.3-1.9.8-2.2 2.4-.3-1.6-.8-2.1-2.2-2.4 1.4-.3 1.9-.8 2.2-2.4z" {...t.f(C.gold)} />
      </G>
    );
  },
  palm: (t) => (
    <G>
      <Path d="M11.2 10c.7 4 .4 7.8-1.4 11.6h3.6c1.2-3.8 1.3-7.6.4-11.6z" {...t.f(C.wood)} />
      <Path d="M12 9.4C10 6.2 5.6 5.6 2.4 7.8c3.4.2 6.4 1 9.6 1.6z" {...t.f(C.green)} />
      <Path d="M12 9.4c2-3.2 6.4-3.8 9.6-1.6-3.4.2-6.4 1-9.6 1.6z" {...t.f(C.green)} />
      <Path d="M12 9.4c-1.2-3.4-3.6-5.6-7.2-6 2.2 1.8 4.4 3.6 7.2 6z" {...t.f(C.greenDeep)} />
      <Path d="M12 9.4c1.2-3.4 3.6-5.6 7.2-6-2.2 1.8-4.4 3.6-7.2 6z" {...t.f(C.greenDeep)} />
      <Path d="M12 9.6c-2.6.6-4.8 2.4-5.8 5.4 2-1.8 3.8-3.4 5.8-5.4zM12 9.6c2.6.6 4.8 2.4 5.8 5.4-2-1.8-3.8-3.4-5.8-5.4z" {...t.f(C.green)} />
      <Circle cx={11} cy={10.8} r={1} {...t.d(C.flameDeep)} />
      <Circle cx={13.1} cy={10.9} r={1} {...t.d(C.flameDeep)} />
      <Circle cx={12} cy={12.2} r={1} {...t.d(C.flameDeep)} />
      <Path d="M5.4 22h13.2" strokeWidth={1.6} strokeLinecap="round" {...t.s(C.parchmentDeep)} />
    </G>
  ),
  scroll: (t) => (
    <G>
      <Rect x={5} y={4} width={14} height={16} {...t.f(C.parchment)} />
      <Rect x={3.4} y={2.4} width={17.2} height={3.6} rx={1.8} {...t.f(C.parchmentDeep)} />
      <Rect x={3.4} y={18} width={17.2} height={3.6} rx={1.8} {...t.f(C.parchmentDeep)} />
      <Path d="M8 9h8M8 12h8M8 15h5" strokeWidth={1.4} strokeLinecap="round" {...t.ds("#C08A3E")} />
    </G>
  ),
  sparkle: (t) => (
    <G>
      <Path d="M10 2.4c.7 4.6 2 6.4 7.6 7.6-5.6 1.2-6.9 3-7.6 7.6-.7-4.6-2-6.4-7.6-7.6 5.6-1.2 6.9-3 7.6-7.6z" {...t.f(C.gold)} />
      <Path d="M18.2 13.6c.4 2.4 1 3.2 3.4 3.8-2.4.6-3 1.4-3.4 3.8-.4-2.4-1-3.2-3.4-3.8 2.4-.6 3-1.4 3.4-3.8z" {...t.f(C.gemLight)} />
    </G>
  ),
  trophy: (t) => (
    <G>
      <Path d="M6.4 5H3.6v1.6a4 4 0 0 0 4 4M17.6 5h2.8v1.6a4 4 0 0 1-4 4" strokeWidth={1.8} strokeLinecap="round" {...t.s(C.goldLip)} />
      <Path d="M6.4 2.8h11.2v6a5.6 5.6 0 0 1-11.2 0z" {...t.f(C.gold)} />
      <Rect x={10.6} y={13.8} width={2.8} height={4} {...t.f(C.goldLip)} />
      <Rect x={7.2} y={17.6} width={9.6} height={3.8} rx={1.2} {...t.f(C.goldLip)} />
      <Rect x={9.4} y={18.8} width={5.2} height={1.4} rx={0.7} {...t.d(C.goldDeep)} />
      <Shine t={t} d="M8.6 4.4h1.4v4.4c0 .9.3 1.7.8 2.4l-1 .6a5.4 5.4 0 0 1-1.2-3z" />
    </G>
  ),
  bolt: (t) => (
    <G>
      <Path d="M13.8 1.8 4.6 13.6h6.2l-1.6 8.6 10-12.4h-6.4z" strokeWidth={1.2} strokeLinejoin="round" {...t.r(C.gold)} />
      <Path d="M13.2 9.8h6L9.2 22.2l1.6-8.6z" {...t.d(C.goldLip)} />
    </G>
  ),
  arrowLeft: (t) => (
    <Path d="M19.4 12H5.4M11 5.8 4.8 12l6.2 6.2" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...t.s(C.grayDeep)} />
  ),
  chevronDown: (t) => (
    <Path d="M5.8 9 12 15.2 18.2 9" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...t.s(C.grayDeep)} />
  ),
  chevronRight: (t) => (
    <Path d="M9 5.8 15.2 12 9 18.2" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" {...t.s(C.grayDeep)} />
  ),
  settings: (t) => (
    <G>
      <Path d={GEAR} strokeWidth={1.6} strokeLinejoin="round" {...t.r(C.gray)} />
      <Circle cx={12} cy={12} r={3.4} {...t.d("#FFFFFF")} />
    </G>
  ),
  info: (t) => (
    <G>
      <Circle cx={12} cy={12} r={10} {...t.f(C.gem)} />
      <Circle cx={12} cy={7.4} r={1.6} {...t.d("#FFFFFF")} />
      <Rect x={10.5} y={10.2} width={3} height={7.8} rx={1.5} {...t.d("#FFFFFF")} />
    </G>
  ),
  key: (t) => (
    <G>
      <Rect x={10.4} y={10.6} width={11} height={2.8} rx={1.4} {...t.f(C.goldLip)} />
      <Rect x={16.4} y={12.4} width={2.4} height={4} rx={0.8} {...t.f(C.goldLip)} />
      <Rect x={19.4} y={12.4} width={2} height={3} rx={0.8} {...t.f(C.goldLip)} />
      <Circle cx={7.6} cy={12} r={5.4} {...t.f(C.gold)} />
      <Circle cx={7.6} cy={12} r={2.1} {...t.d(C.goldDeep)} />
      <Shine t={t} d="M4.4 10.2c.5-1.2 1.4-2 2.6-2.4.5-.1.7.6.2.8-.8.3-1.5.9-1.8 1.8-.2.5-1.1.3-1-.2z" />
    </G>
  ),
  infinity: (t) => (
    <Path
      d="M7.2 8.2a3.8 3.8 0 1 0 0 7.6c2.8 0 6.8-7.6 9.6-7.6a3.8 3.8 0 1 1 0 7.6c-2.8 0-6.8-7.6-9.6-7.6z"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...t.s(C.purple)}
    />
  ),
  ring: (t) => (
    <G>
      <Circle cx={12} cy={14.6} r={6.6} strokeWidth={2.8} {...t.s(C.gold)} />
      <Path d="M12 8.4 9 5.6l1.4-2.4h3.2L15 5.6z" {...t.f(C.gem)} />
      <Path d="M9 5.6h6L12 8.4z" {...t.d(C.gemDeep)} />
      <Path d="M8 10.4a5.2 5.2 0 0 0-1.4 2.6" strokeWidth={1.2} strokeLinecap="round" {...t.ds("#FFF1B8")} />
    </G>
  ),
  family: (t) => (
    <G>
      <Person t={t} x={6} y={6.8} s={0.95} color={C.gemLight} deep={C.gem} />
      <Person t={t} x={18} y={6.8} s={0.95} color="#FFB3C6" deep={C.pink} />
      <Person t={t} x={12} y={12.6} s={0.62} color={C.yellowSoft} deep={C.gold} />
    </G>
  ),
  people: (t) => (
    <G>
      <Person t={t} x={15.6} y={6.6} s={0.95} color={C.gemLight} deep={C.gem} />
      <Person t={t} x={8.6} y={8} s={1.02} color={C.greenLight} deep={C.green} />
    </G>
  ),
  moon: (t) => (
    <G>
      <Circle cx={12} cy={12} r={10.4} {...t.f(C.indigo)} />
      <G transform="translate(2.6 2.4) scale(0.72)">
        <Path d={CRESCENT} {...t.d(C.yellowSoft)} />
      </G>
      <Polygon points={starPoints(16.8, 9.4, 1.8, 0.8, 4)} {...t.d("#FFFFFF")} />
      <Circle cx={18.2} cy={14.4} r={0.8} {...t.d("#FFFFFF")} />
    </G>
  ),
  water: (t) => (
    <G>
      <Path d="M12 2.2c3.2 4.2 7 8.2 7 12.4a7 7 0 0 1-14 0c0-4.2 3.8-8.2 7-12.4z" {...t.f(C.gem)} />
      <Path d="M5.2 15.6a7 7 0 0 0 13.6 0 7.3 7.3 0 0 1-13.6 0z" {...t.d(C.gemDeep)} />
      <Shine t={t} d="M8.6 12.4c.3-1.2.9-2.3 1.7-3.4.3-.4 1-.1.8.4-.6 1-1.1 2-1.3 3.2-.1.5-1.3.4-1.2-.2z" />
    </G>
  ),
  sun: (t) => (
    <G>
      <G strokeWidth={2.2} strokeLinecap="round" {...t.s(C.flame)}>
        <Path d="M12 1.6v2.4M12 20v2.4M1.6 12H4M20 12h2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
      </G>
      <Circle cx={12} cy={12} r={5.6} {...t.f(C.gold)} />
      <Shine t={t} d="M9 10.6c.4-1 1.1-1.7 2-2 .5-.2.8.5.3.8-.6.3-1.1.8-1.4 1.5-.2.5-1.1.2-.9-.3z" />
    </G>
  ),
  star8: (t) => (
    <G>
      <Polygon points={STAR8} strokeWidth={1.2} strokeLinejoin="round" {...t.r(C.purple)} />
      <Polygon points={STAR8_SMALL} {...t.d(C.gold)} />
    </G>
  ),
  bell: (t) => (
    <G>
      <Path d="M12 2.4a1.6 1.6 0 0 1 1.6 1.6v.6a6.2 6.2 0 0 1 4.6 6v4l1.8 2.6c.4.6 0 1.4-.8 1.4H4.8c-.8 0-1.2-.8-.8-1.4l1.8-2.6v-4a6.2 6.2 0 0 1 4.6-6V4A1.6 1.6 0 0 1 12 2.4z" {...t.f(C.gold)} />
      <Circle cx={12} cy={20.4} r={2} {...t.f(C.goldLip)} />
      <Shine t={t} d="M8 10.4c.2-1.4 1-2.6 2.2-3.2.5-.2.8.4.4.7-.9.6-1.4 1.5-1.6 2.6-.1.5-1 .4-1-.1z" />
    </G>
  ),
  logout: (t) => (
    <G>
      <Path d="M10 3.6H6.4a2.4 2.4 0 0 0-2.4 2.4v12a2.4 2.4 0 0 0 2.4 2.4H10" strokeWidth={2.6} strokeLinecap="round" {...t.s(C.grayDeep)} />
      <Path d="M14.6 7.4 19.2 12l-4.6 4.6M19 12H9.6" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" {...t.s(C.heart)} />
    </G>
  ),
  plus: (t) => <Path d="M12 4.6v14.8M4.6 12h14.8" strokeWidth={3.4} strokeLinecap="round" {...t.s(C.green)} />,
  play: (t) => (
    <Path d="M7.4 4.8c0-1 1.1-1.6 1.9-1.1l10.4 7.2c.7.5.7 1.6 0 2.1L9.3 20.3c-.8.5-1.9-.1-1.9-1.1z" {...t.f(C.green)} />
  ),
  handHeart: (t) => (
    <G>
      <Path d={HEART} transform="translate(5.6 0.4) scale(0.54)" {...t.f(C.heart)} />
      <Path
        d="M1.6 14.4h3.8c1 0 1.9.3 2.7.8l1.6 1h3.6a1.5 1.5 0 0 1 0 3H9.6h4.2l5.4-3.2a1.6 1.6 0 0 1 1.9 2.5l-5.4 4.2c-.8.6-1.7.9-2.6.9H1.6z"
        {...t.f(C.skin)}
      />
      <Path d="M9.4 19.2h4" strokeWidth={1} strokeLinecap="round" {...t.ds(C.skinDeep)} />
      <Rect x={0.8} y={13.6} width={3.2} height={9.4} rx={1} {...t.f(C.gem)} />
    </G>
  ),
  shield: (t) => (
    <G>
      <Path d="M12 2 20 5.2v6.2c0 5.2-3.4 9.1-8 10.6-4.6-1.5-8-5.4-8-10.6V5.2z" {...t.f(C.gem)} />
      <Path d="M12 2v20c4.6-1.5 8-5.4 8-10.6V5.2z" {...t.d(C.gemDeep)} />
      <Polygon points={starPoints(12, 11.6, 4, 1.7, 5)} {...t.d("#FFFFFF")} />
    </G>
  ),
  coins: (t) => (
    <G>
      <Circle cx={15.4} cy={9.2} r={6.2} {...t.f(C.goldLip)} />
      <Circle cx={15.4} cy={9.2} r={4} strokeWidth={1.2} {...t.ds(C.goldDeep)} />
      <Circle cx={9.2} cy={14.4} r={7} {...t.f(C.gold)} />
      <Circle cx={9.2} cy={14.4} r={4.6} strokeWidth={1.4} {...t.ds(C.goldLip)} />
      <Path d="M9.2 11.6v5.6" strokeWidth={1.8} strokeLinecap="round" {...t.ds(C.goldLip)} />
      <Shine t={t} d="M4.6 12.4c.5-1.4 1.6-2.5 3-3 .5-.2.8.5.3.8-1 .4-1.8 1.3-2.2 2.4-.2.5-1.2.3-1.1-.2z" />
    </G>
  )
};

export const ICON_NAMES = Object.keys(ICONS) as IconName[];

export const Icon = memo(function Icon({ name, size = 24, color }: IconProps) {
  const draw = ICONS[name] ?? ICONS.star;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {draw(new Tone(color))}
    </Svg>
  );
});

const TOPIC_ICONS: Record<string, IconName> = {
  foundation: "crescent",
  prayer: "mosque",
  aqidah: "star8",
  quran_tafseer: "quran",
  manners: "handHeart",
  fasting: "moon",
  zakat: "coins",
  hajj: "kaaba",
  marriage: "ring",
  sahabah: "people",
  prophets: "scroll",
  women_of_the_book: "bookOpen",
  hadith: "book"
};

/** Emblem icon for a topic world id. */
export function topicIcon(topicId: string): IconName {
  return TOPIC_ICONS[topicId] ?? "star";
}
