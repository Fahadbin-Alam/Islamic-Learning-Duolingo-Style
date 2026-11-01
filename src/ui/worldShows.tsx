import React, { type ReactNode } from "react";
import { Animated, View } from "react-native";
import type { GameSoundEvent } from "../services/gameSoundLibrary";
import { bigLook } from "./bigShows";
import { sampleCurve } from "./motion";
import { Drop, Floater, Heart, Puff, Sparkle, Word, shake } from "./reactions";
import { Abs, DateFruit, Faller, Fish, Frog, Gusts, Hopper, LEAF, Leaf, Note, Splash, deg, k, windowOf, type Look } from "./showKit";
import {
  Bat,
  Berry,
  Blossom,
  BookStandLegs,
  Bunny,
  Carrot,
  Butterfly,
  ClosedBook,
  InkPot,
  Ladybug,
  Lizard,
  MiniMushroom,
  OpenBook,
  Paper,
  PaperPlane,
  Part,
  Pearl,
  Pebble,
  Pen,
  Pinecone,
  Seagull,
  Shelf,
  Snail,
  Snowflake,
  Squirrel,
  TurningPage
} from "./worldArt";

/**
 * Tap shows for the rest of the pictures beside the path: the book stand (the book closes and goes up on
 * a shelf, and comes back down), the ink and paper (the pen writes, the paper folds into a plane), the
 * bush and the rocks, and every picture in the beach, forest, snowy mountain and camp sceneries. Built
 * from the same parts as sceneryShows.tsx, on the same 0..1 clock.
 */

export type WorldShowKind =
  | "bookStand"
  | "inkpot"
  | "bush"
  | "rocks"
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

type Show = { name: string; sound: GameSoundEvent; ms: number; strong?: boolean };

const HOP: Show = { name: "hop", sound: "boing", ms: 1300 };
const SPIN: Show = { name: "spin", sound: "zoom", ms: 1300 };
const GROW: Show = { name: "grow", sound: "grow", ms: 1900 };
const WIGGLE: Show = { name: "wiggle", sound: "giggle", ms: 1500 };
const LOVE: Show = { name: "love", sound: "sparkle", ms: 1800 };
const SHINE: Show = { name: "shine", sound: "sparkle", ms: 1700 };
/** The tree grows huge and shrinks back (bigShows.tsx). */
export const GIANT: Show = { name: "giant", sound: "giant", ms: 2600 };
/** A little meteor falls, lands with a bonk and everything settles back (bigShows.tsx). */
export const METEOR: Show = { name: "meteor", sound: "meteor", ms: 2400, strong: true };

export const WORLD_SHOWS: Record<WorldShowKind, Show[]> = {
  // The first tap closes the book and puts it on a shelf; the next takes it down and opens it again.
  bookStand: [
    { name: "shelf", sound: "whoosh", ms: 1700 },
    { name: "down", sound: "pop", ms: 1500 },
    { name: "flip", sound: "whoosh", ms: 1600 },
    { name: "glow", sound: "sparkle", ms: 2000 },
    HOP,
    LOVE
  ],
  inkpot: [
    { name: "write", sound: "pop", ms: 2200 },
    { name: "plane", sound: "whoosh", ms: 2600 },
    { name: "dip", sound: "splash", ms: 1700 },
    { name: "spill", sound: "spit", ms: 2400 },
    { name: "roll", sound: "grow", ms: 1900 },
    { name: "dance", sound: "giggle", ms: 1800 }
  ],
  bush: [
    { name: "rustle", sound: "whoosh", ms: 1500 },
    { name: "bunny", sound: "giggle", ms: 2200 },
    { name: "butterflies", sound: "sparkle", ms: 2400 },
    { name: "bloom", sound: "grow", ms: 2000 },
    { name: "berries", sound: "pop", ms: 1800 },
    GIANT,
    HOP
  ],
  rocks: [
    { name: "lizard", sound: "zoom", ms: 1800 },
    { name: "drum", sound: "boing", ms: 1700 },
    { name: "roll", sound: "pop", ms: 1900 },
    { name: "sprout", sound: "grow", ms: 2000 },
    { name: "snail", sound: "giggle", ms: 2600 },
    METEOR,
    SHINE
  ],
  crab: [{ name: "scuttle", sound: "zoom", ms: 1700 }, { name: "snap", sound: "pop", ms: 1500 }, { name: "dig", sound: "whoosh", ms: 2000 }, HOP, SPIN, LOVE],
  sandcastle: [{ name: "wave", sound: "splash", ms: 2400 }, { name: "tall", sound: "grow", ms: 1800 }, { name: "shells", sound: "pop", ms: 1800 }, HOP, SHINE, LOVE],
  boat: [{ name: "sail", sound: "whoosh", ms: 2400 }, { name: "rock", sound: "splash", ms: 1800 }, { name: "fish", sound: "splash", ms: 1600 }, { name: "gull", sound: "chirp", ms: 2200 }, HOP, LOVE],
  shell: [{ name: "pearl", sound: "sparkle", ms: 2000 }, { name: "listen", sound: "whoosh", ms: 2000 }, HOP, SPIN, GROW, LOVE],
  turtle: [{ name: "swim", sound: "whoosh", ms: 2400 }, { name: "hide", sound: "pop", ms: 2000 }, { name: "babies", sound: "sparkle", ms: 2400 }, HOP, SPIN, LOVE],
  pine: [{ name: "cones", sound: "pop", ms: 1800 }, { name: "squirrel", sound: "giggle", ms: 2200 }, { name: "snow", sound: "sparkle", ms: 2000 }, { name: "wind", sound: "whoosh", ms: 1700 }, GIANT, LOVE],
  mushroom: [{ name: "bounce", sound: "boing", ms: 1900 }, { name: "sprout", sound: "grow", ms: 2000 }, { name: "rain", sound: "splash", ms: 2000 }, HOP, WIGGLE, LOVE],
  rabbit: [{ name: "zoom", sound: "zoom", ms: 2200 }, { name: "nibble", sound: "pop", ms: 2000 }, { name: "dig", sound: "whoosh", ms: 1900 }, { name: "thump", sound: "boing", ms: 1500 }, HOP, LOVE],
  log: [{ name: "squirrel", sound: "giggle", ms: 2200 }, { name: "bugs", sound: "pop", ms: 2400 }, { name: "sprout", sound: "grow", ms: 2000 }, HOP, WIGGLE, LOVE],
  goat: [{ name: "maa", sound: "baa", ms: 1400 }, { name: "climb", sound: "boing", ms: 1700 }, { name: "headbutt", sound: "zoom", ms: 1500 }, { name: "munch", sound: "pop", ms: 1800 }, SPIN, LOVE],
  cave: [{ name: "echo", sound: "giggle", ms: 1900 }, { name: "eyes", sound: "pop", ms: 1800 }, { name: "bats", sound: "whoosh", ms: 2000 }, { name: "glow", sound: "sparkle", ms: 2000 }, { name: "rumble", sound: "thunder", ms: 1400, strong: true }, HOP],
  horse: [{ name: "rear", sound: "boing", ms: 1700 }, { name: "gallop", sound: "zoom", ms: 2000 }, { name: "trot", sound: "boing", ms: 1600 }, { name: "munch", sound: "pop", ms: 1800 }, HOP, LOVE],
  shield: [{ name: "shine", sound: "sparkle", ms: 1600 }, { name: "bounce", sound: "boing", ms: 1700 }, { name: "roll", sound: "zoom", ms: 2000 }, SPIN, HOP, GROW],
  banner: [{ name: "wave", sound: "whoosh", ms: 1900 }, { name: "raise", sound: "grow", ms: 1800 }, SPIN, SHINE, HOP, LOVE]
};

/** Where the book sits on the shelf, as parts of the picture's size: just above the stand. */
export const SHELF_AT = { x: 0.06, y: -0.6 };

/** The book stand drawn in parts, for its resting looks (book on the stand, or up on the shelf). */
export function BookStandArt({ size, shelved }: { size: number; shelved: boolean }) {
  return (
    <>
      <Part size={size}>
        <BookStandLegs />
      </Part>
      {shelved ? (
        <Part size={size} style={{ transform: [{ translateX: SHELF_AT.x * size }, { translateY: SHELF_AT.y * size }] }}>
          <Shelf />
          <ClosedBook />
        </Part>
      ) : (
        <Part size={size}>
          <OpenBook />
        </Part>
      )}
    </>
  );
}

/** The ink and paper drawn in parts, so each can move on its own. */
function InkArt({ size, paper, pen, pot }: { size: number; paper?: object; pen?: object; pot?: object }) {
  return (
    <>
      <Part size={size} style={paper as never}>
        <Paper />
      </Part>
      <Part size={size} style={pot as never}>
        <InkPot />
      </Part>
      <Part size={size} style={pen as never}>
        <Pen />
      </Part>
    </>
  );
}

function sparkles(t: Animated.Value, s: number, from = 0, count = 3) {
  return Array.from({ length: count }, (_, index) => (
    <Floater key={`sp${index}`} t={t} from={from + index * 0.1} to={Math.min(1, from + 0.45 + index * 0.1)} x={s * (0.08 + index * (0.8 / Math.max(1, count - 1)) * 0.95)} y={s * (0.1 + (index % 2) * 0.22)} rise={s * 0.2}>
      <Sparkle size={Math.max(9, s * 0.17)} />
    </Floater>
  ));
}

function hearts(t: Animated.Value, s: number) {
  return [0, 0.18, 0.36].map((from, index) => (
    <Floater key={from} t={t} from={from} to={from + 0.55} x={s * (0.2 + index * 0.25)} y={s * 0.1} rise={s * 0.35} drift={(index - 1) * s * 0.1}>
      <Heart size={Math.max(10, s * 0.19)} />
    </Floater>
  ));
}

/** Shows any picture can do. */
function genericLook(name: string, t: Animated.Value, s: number): Look {
  switch (name) {
    case "hop":
      return {
        moves: [
          { translateY: k(t, [0, 0.18, 0.36, 0.54, 0.72, 1], [0, -s * 0.24, 0, -s * 0.12, 0, 0]) },
          { scaleY: k(t, [0, 0.33, 0.38, 0.46, 0.7, 0.75, 0.84, 1], [1, 1, 0.84, 1.05, 1, 0.9, 1.02, 1]) }
        ]
      };
    case "spin":
      return {
        moves: [
          { translateY: k(t, [0, 0.15, 0.5, 0.85, 1], [0, 2, -s * 0.25, 0, 0]) },
          { scaleX: t.interpolate(sampleCurve(0.1, 0.85, 24, (p) => Math.cos(((p - 0.1) / 0.75) * 4 * Math.PI))) }
        ]
      };
    case "grow":
      return {
        moves: [{ scale: k(t, [0, 0.15, 0.3, 0.45, 0.7, 0.85, 1], [1, 1.18, 1.1, 1.32, 1.32, 0.94, 1]) }],
        front: sparkles(t, s, 0.65)
      };
    case "wiggle":
      return { moves: [{ rotate: shake(t, 0, 0.9, 8, 6) }, { scaleY: k(t, [0, 0.5, 0.9, 1], [1, 1.06, 1, 1]) }], front: <Floater t={t} from={0.1} to={0.85} x={s * 0.6} y={0} rise={s * 0.2}><Word size={Math.max(10, s * 0.18)} color="#FF8A1F">hehe</Word></Floater> };
    case "love":
      return { moves: [{ translateY: k(t, [0, 0.2, 0.4, 0.6, 1], [0, -4, 0, -4, 0]) }], front: hearts(t, s) };
    case "shine":
    default:
      return {
        moves: [{ scale: k(t, [0, 0.2, 0.5, 1], [1, 1.08, 1, 1]) }],
        behind: <Abs x={s * 0.1} y={s * 0.1} style={{ width: s * 0.8, height: s * 0.8, borderRadius: s, backgroundColor: "#FFE27A", opacity: t.interpolate({ inputRange: [0, 0.15, 0.7, 1], outputRange: [0, 0.55, 0.3, 0] }) }} />,
        front: sparkles(t, s, 0.05, 4)
      };
  }
}

/** Drops that fall from (x, y) down `fall` px over the window. */
function rainDrops(t: Animated.Value, s: number, y: number, fall: number, count = 6) {
  return Array.from({ length: count }, (_, index) => {
    const from = (index / count) * 0.7;
    return (
      <Floater key={`rain${index}`} t={t} from={from} to={from + 0.25} x={s * (0.08 + ((index * 37) % 80) / 100)} y={y} rise={-fall} pop={false}>
        <Drop size={Math.max(4, s * 0.08)} color="#7CC2F2" />
      </Floater>
    );
  });
}

function pops(t: Animated.Value, s: number, spots: { x: number; y: number; at: number }[], child: (index: number) => ReactNode, until = 0.88) {
  return spots.map((spot, index) => (
    <Abs
      key={`pop${index}`}
      x={spot.x * s}
      y={spot.y * s}
      style={{
        opacity: t.interpolate({ inputRange: [0, spot.at, spot.at + 0.04, until, Math.min(1, until + 0.08), 1], outputRange: [0, 0, 1, 1, 0, 0], extrapolate: "clamp" }),
        transform: [{ scale: k(t, [0, spot.at, spot.at + 0.08, spot.at + 0.13, until, Math.min(1, until + 0.08), 1], [0.1, 0.1, 1.2, 1, 1, 0.2, 0.2]) }]
      }}
    >
      {child(index)}
    </Abs>
  ));
}

/** What each show looks like. Anything not drawn here falls back to a generic show. */
export function worldLook(kind: WorldShowKind, name: string, t: Animated.Value, s: number, art: ReactNode): Look {
  const big = bigLook(name, t, s);
  if (big) return big;
  const u = s / 64;
  switch (`${kind}:${name}`) {
    // ---------- the book stand ----------
    case "bookStand:shelf": {
      // The book shuts, hops up onto a shelf that appears above the stand, and stays there.
      const shelfIn = t.interpolate({ inputRange: [0, 0.1, 0.3, 1], outputRange: [0, 0, 1, 1] });
      return {
        art: (
          <>
            <Part size={s}>
              <BookStandLegs />
            </Part>
            <Part size={s} style={{ transformOrigin: "center", opacity: t.interpolate({ inputRange: [0, 0.22, 0.26, 1], outputRange: [1, 1, 0, 0] }), transform: [{ scaleX: k(t, [0, 0.24, 1], [1, 0.25, 0.25]) }] }}>
              <OpenBook />
            </Part>
          </>
        ),
        front: (
          <>
            <Part size={s} style={{ opacity: shelfIn, transform: [{ translateX: SHELF_AT.x * s }, { translateY: SHELF_AT.y * s }, { scaleX: k(t, [0, 0.1, 0.3, 1], [0.2, 0.2, 1, 1]) }] }}>
              <Shelf />
            </Part>
            <Part
              size={s}
              style={{
                opacity: t.interpolate({ inputRange: [0, 0.2, 0.24, 1], outputRange: [0, 0, 1, 1] }),
                transform: [
                  { translateX: k(t, [0, 0.3, 0.75, 1], [0, 0, SHELF_AT.x * s, SHELF_AT.x * s]) },
                  { translateY: t.interpolate(sampleCurve(0.3, 0.75, 12, (p) => SHELF_AT.y * s * ((p - 0.3) / 0.45) - s * 0.35 * Math.sin(Math.PI * ((p - 0.3) / 0.45)))) },
                  { rotate: deg(t, [0, 0.3, 0.55, 0.75, 0.85, 1], [0, 0, -20, 4, -2, 0]) }
                ]
              }}
            >
              <ClosedBook />
            </Part>
            <Floater t={t} from={0.75} to={1} x={s * 0.35} y={SHELF_AT.y * s + s * 0.2} rise={s * 0.15}>
              <Sparkle size={Math.max(9, 12 * u)} />
            </Floater>
          </>
        )
      };
    }
    case "bookStand:down":
      // Back down from the shelf onto the stand, and it opens again.
      return {
        art: (
          <>
            <Part size={s}>
              <BookStandLegs />
            </Part>
            <Part size={s} style={{ transformOrigin: "center", opacity: t.interpolate({ inputRange: [0, 0.62, 0.66, 1], outputRange: [0, 0, 1, 1] }), transform: [{ scaleX: k(t, [0, 0.64, 0.9, 1], [0.25, 0.25, 1.05, 1]) }] }}>
              <OpenBook />
            </Part>
          </>
        ),
        front: (
          <>
            <Part size={s} style={{ opacity: t.interpolate({ inputRange: [0, 0.6, 0.85, 1], outputRange: [1, 1, 0, 0] }), transform: [{ translateX: SHELF_AT.x * s }, { translateY: SHELF_AT.y * s }] }}>
              <Shelf />
            </Part>
            <Part
              size={s}
              style={{
                opacity: t.interpolate({ inputRange: [0, 0.62, 0.66, 1], outputRange: [1, 1, 0, 0] }),
                transform: [
                  { translateX: k(t, [0, 0.1, 0.62, 1], [SHELF_AT.x * s, SHELF_AT.x * s, 0, 0]) },
                  { translateY: t.interpolate(sampleCurve(0.1, 0.62, 12, (p) => SHELF_AT.y * s * (1 - (p - 0.1) / 0.52) - s * 0.2 * Math.sin(Math.PI * ((p - 0.1) / 0.52)))) },
                  { rotate: deg(t, [0, 0.1, 0.4, 0.62, 1], [0, 0, 15, 0, 0]) }
                ]
              }}
            >
              <ClosedBook />
            </Part>
          </>
        )
      };
    case "bookStand:flip":
      // Pages turn over one after another.
      return {
        art: (
          <>
            <Part size={s}>
              <BookStandLegs />
            </Part>
            <Part size={s}>
              <OpenBook />
            </Part>
            {[0, 0.25, 0.5].map((from) => (
              <Part
                key={from}
                size={s}
                style={{
                  opacity: windowOf(t, from, from + 0.35),
                  transformOrigin: "50% 50%",
                  transform: [{ scaleX: t.interpolate({ inputRange: [0, from, from + 0.35, 1], outputRange: [1, 1, -1, -1], extrapolate: "clamp" }) }]
                }}
              >
                <TurningPage />
              </Part>
            ))}
          </>
        ),
        behind: (
          <Abs x={s * 0.45} y={-s * 0.05} style={{ opacity: windowOf(t, 0.1, 0.9), transform: [{ translateX: t.interpolate({ inputRange: [0, 1], outputRange: [0, s * 0.3] }) }] }}>
            <Gusts w={s * 0.5} />
          </Abs>
        )
      };
    case "bookStand:glow":
      return {
        behind: <Abs x={s * 0.05} y={s * 0.05} style={{ width: s * 0.9, height: s * 0.7, borderRadius: s, backgroundColor: "#FFE27A", opacity: t.interpolate({ inputRange: [0, 0.2, 0.75, 1], outputRange: [0, 0.6, 0.45, 0] }) }} />,
        moves: [{ translateY: k(t, [0, 0.25, 0.75, 1], [0, -s * 0.06, -s * 0.06, 0]) }],
        front: (
          <>
            {sparkles(t, s, 0.1, 4)}
            {[0.2, 0.45].map((from, index) => (
              <Floater key={from} t={t} from={from} to={from + 0.5} x={s * (0.25 + index * 0.35)} y={s * 0.2} rise={s * 0.35}>
                <Heart size={Math.max(9, 11 * u)} color="#21B573" />
              </Floater>
            ))}
          </>
        )
      };

    // ---------- the ink and paper ----------
    case "inkpot:write": {
      // The pen lifts off and scribbles along the paper, line by line.
      const lines = [0, 1, 2];
      return {
        art: (
          <InkArt
            size={s}
            pen={{
              transform: [
                { translateX: t.interpolate(sampleCurve(0.1, 0.85, 30, (p) => -s * 0.42 + s * 0.3 * (((p - 0.1) / 0.75) * 3 % 1))) },
                { translateY: t.interpolate(sampleCurve(0.1, 0.85, 30, (p) => -s * 0.3 + Math.floor(((p - 0.1) / 0.75) * 3) * 7 * u + Math.sin(p * 90) * 1.5 * u)) },
                { rotate: "-12deg" }
              ],
              opacity: 1
            }}
          />
        ),
        front: lines.map((line) => (
          <Abs
            key={line}
            x={(14 + line) * u}
            y={(30 + line * 7) * u}
            style={{
              width: 22 * u,
              height: 2.2 * u,
              borderRadius: u,
              backgroundColor: "#3A47B0",
              transformOrigin: "left",
              opacity: t.interpolate({ inputRange: [0, 0.9, 1], outputRange: [1, 1, 0] }),
              transform: [{ scaleX: t.interpolate({ inputRange: [0, 0.1 + line * 0.25, 0.35 + line * 0.25, 1], outputRange: [0, 0, 1, 1], extrapolate: "clamp" }) }]
            }}
          />
        ))
      };
    }
    case "inkpot:plane":
      // The paper folds itself into a plane, loops round the sky and lands back as paper.
      return {
        art: <InkArt size={s} paper={{ opacity: t.interpolate({ inputRange: [0, 0.12, 0.16, 0.84, 0.88, 1], outputRange: [1, 1, 0, 0, 1, 1] }), transformOrigin: "center", transform: [{ scale: k(t, [0, 0.14, 0.86, 1], [1, 0.4, 0.4, 1]) }] }} />,
        front: (
          <Abs
            x={s * 0.2}
            y={s * 0.3}
            style={{
              opacity: t.interpolate({ inputRange: [0, 0.13, 0.16, 0.84, 0.87, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
              transform: [
                { translateX: t.interpolate(sampleCurve(0.15, 0.85, 30, (p) => s * 0.7 * Math.sin(2 * Math.PI * ((p - 0.15) / 0.7)))) },
                { translateY: t.interpolate(sampleCurve(0.15, 0.85, 30, (p) => -s * 0.55 * Math.sin(Math.PI * ((p - 0.15) / 0.7)))) },
                { rotate: t.interpolate({ inputRange: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], outputRange: ["0deg", "-20deg", "-40deg", "160deg", "200deg", "350deg", "360deg"] }) }
              ]
            }}
          >
            <PaperPlane w={24 * u} />
          </Abs>
        )
      };
    case "inkpot:dip":
      return {
        art: (
          <InkArt
            size={s}
            pen={{ transform: [{ translateX: k(t, [0, 0.2, 0.7, 1], [0, -3 * u, -3 * u, 0]) }, { translateY: k(t, [0, 0.2, 0.3, 0.4, 0.5, 0.7, 1], [0, -10 * u, 2 * u, -6 * u, 2 * u, -10 * u, 0]) }] }}
            pot={{ transformOrigin: "bottom", transform: [{ scaleY: k(t, [0, 0.28, 0.33, 0.48, 0.53, 1], [1, 1, 0.92, 1, 0.92, 1]) }] }}
          />
        ),
        front: [0.3, 0.5].map((from, index) => (
          <Floater key={from} t={t} from={from} to={from + 0.3} x={(48 + index * 4) * u} y={40 * u} rise={s * 0.2} drift={(index ? 1 : -1) * s * 0.12} pop={false}>
            <Drop size={Math.max(4, 6 * u)} color="#3A47B0" />
          </Floater>
        ))
      };
    case "inkpot:spill":
      // Oops! The pot wobbles, tips, a puddle spreads... then it's wiped up and the pot stands again.
      return {
        art: <InkArt size={s} pot={{ transformOrigin: "bottom", transform: [{ rotate: deg(t, [0, 0.1, 0.2, 0.3, 0.42, 0.75, 0.88, 1], [0, -8, 8, -6, -70, -70, 6, 0]) }] }} pen={{ transformOrigin: "bottom", transform: [{ rotate: deg(t, [0, 0.35, 0.45, 0.8, 1], [0, 0, 10, 10, 0]) }] }} />,
        front: (
          <>
            <Abs
              x={30 * u}
              y={56 * u}
              style={{
                width: 22 * u,
                height: 6 * u,
                borderRadius: 6 * u,
                backgroundColor: "#3A47B0",
                opacity: t.interpolate({ inputRange: [0, 0.42, 0.46, 0.8, 0.9, 1], outputRange: [0, 0, 0.9, 0.9, 0, 0] }),
                transform: [{ scaleX: k(t, [0, 0.44, 0.65, 1], [0.1, 0.1, 1, 1]) }]
              }}
            />
            <Floater t={t} from={0.45} to={0.85} x={s * 0.05} y={s * 0.1} rise={s * 0.15}>
              <Word size={Math.max(10, 13 * u)} color="#3A47B0">oops!</Word>
            </Floater>
          </>
        )
      };
    case "inkpot:roll":
      // The paper rolls up into a scroll and unrolls again.
      return {
        art: <InkArt size={s} paper={{ transformOrigin: "50% 30%", transform: [{ scaleY: k(t, [0, 0.35, 0.65, 1], [1, 0.12, 0.12, 1]) }] }} />,
        front: (
          <Abs x={9 * u} y={17 * u} style={{ width: 34 * u, height: 7 * u, borderRadius: 4 * u, backgroundColor: "#FFF3D6", borderWidth: 1, borderColor: "#E2B967", opacity: windowOf(t, 0.3, 0.7) }} />
        )
      };
    case "inkpot:dance":
      return {
        art: <InkArt size={s} pen={{ transformOrigin: "50% 70%", transform: [{ rotate: deg(t, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 0.87, 1], [0, -18, 14, -18, 14, -18, 14, -6, 0]) }, { translateY: k(t, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1], [0, -5, 0, -5, 0, -5, 0, 0]) }] }} pot={{ transformOrigin: "bottom", transform: [{ scaleY: k(t, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1], [1, 0.9, 1.05, 0.9, 1.05, 0.9, 1, 1]) }] }} />,
        front: [0.05, 0.3, 0.55].map((from, index) => (
          <Floater key={from} t={t} from={from} to={from + 0.35} x={s * (0.6 + (index % 2) * 0.2)} y={s * 0.05} rise={s * 0.3} drift={(index % 2 ? 1 : -1) * s * 0.1}>
            <Note s={Math.max(11, 14 * u)} />
          </Floater>
        ))
      };

    // ---------- the bush ----------
    case "bush:rustle":
      return {
        moves: [{ rotate: shake(t, 0, 0.7, 6, 6) }, { scaleX: k(t, [0, 0.2, 0.5, 0.8, 1], [1, 1.06, 0.97, 1.03, 1]) }],
        front: Array.from({ length: 5 }, (_, index) => (
          <Floater key={index} t={t} from={0.05 + index * 0.08} to={0.6 + index * 0.08} x={s * (0.1 + index * 0.18)} y={s * 0.4} rise={s * 0.35} drift={(index % 2 ? 1 : -1) * s * 0.2} pop={false}>
            <Leaf s={9 * u} />
          </Floater>
        ))
      };
    case "bush:bunny":
      // A bunny pops up from behind the bush, looks around, and ducks back down.
      return {
        behind: (
          <Abs x={s * 0.32} y={s * 0.15} style={{ opacity: windowOf(t, 0.02, 0.95), transform: [{ translateY: k(t, [0, 0.15, 0.4, 0.5, 0.6, 0.8, 1], [s * 0.3, -s * 0.02, -s * 0.02, -s * 0.12, -s * 0.02, -s * 0.02, s * 0.3]) }, { rotate: deg(t, [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1], [0, 0, -12, 0, 12, 0, 0]) }] }}>
            <Bunny s={22 * u} />
          </Abs>
        ),
        front: (
          <Floater t={t} from={0.35} to={0.8} x={s * 0.6} y={0} rise={s * 0.15}>
            <Word size={Math.max(10, 12 * u)} color="#FF5C8A">hi!</Word>
          </Floater>
        )
      };
    case "bush:butterflies":
      return {
        moves: [{ rotate: shake(t, 0, 0.2, 3, 2) }],
        front: [0, 1].map((index) => (
          <Abs
            key={index}
            x={s * (0.3 + index * 0.2)}
            y={s * 0.4}
            style={{
              opacity: windowOf(t, 0.02 + index * 0.08, 0.95),
              transform: [
                { translateX: t.interpolate(sampleCurve(0, 1, 30, (p) => (index ? -1 : 1) * s * 0.45 * Math.sin(Math.PI * p * 1.5))) },
                { translateY: t.interpolate(sampleCurve(0, 1, 30, (p) => -s * 0.7 * Math.sin(Math.PI * p) + Math.sin(p * 40) * 3 * u)) },
                { scaleX: t.interpolate(sampleCurve(0, 1, 40, (p) => 0.55 + 0.45 * Math.abs(Math.cos(p * 30)))) }
              ]
            }}
          >
            <Butterfly s={13 * u} color={index ? "#FFC21A" : "#8E5CF7"} />
          </Abs>
        ))
      };
    case "bush:bloom":
      return {
        moves: [{ scale: k(t, [0, 0.1, 0.2, 1], [1, 1.06, 1, 1]) }],
        front: pops(t, s, [
          { x: 0.2, y: 0.42, at: 0.05 },
          { x: 0.5, y: 0.3, at: 0.15 },
          { x: 0.66, y: 0.58, at: 0.25 },
          { x: 0.32, y: 0.62, at: 0.35 },
          { x: 0.48, y: 0.5, at: 0.45 }
        ], (index) => <Blossom s={10 * u} color={["#FF7FA6", "#FFC21A", "#FFFFFF", "#8E5CF7", "#FF5A5A"][index]} />)
      };
    case "bush:berries":
      return {
        moves: [{ rotate: shake(t, 0, 0.3, 5, 3) }],
        front: [0, 1, 2, 3].map((index) => (
          <Faller key={index} t={t} from={0.08 + index * 0.08} to={0.7 + index * 0.07} x={s * (0.25 + index * 0.14)} y={s * 0.5} fall={s * 0.38} drift={(index - 1.5) * s * 0.12} spin={index * 90}>
            <Berry s={7 * u} />
          </Faller>
        ))
      };

    // ---------- the rocks ----------
    case "rocks:lizard":
      // A lizard dashes over the rocks, stops for a look, and dashes off.
      return {
        front: (
          <Abs x={-s * 0.1} y={s * 0.48} style={{ opacity: windowOf(t, 0, 1), transform: [{ translateX: k(t, [0, 0.3, 0.6, 1], [-s * 0.4, s * 0.35, s * 0.35, s * 1.2]) }, { translateY: k(t, [0, 0.15, 0.3, 0.6, 0.75, 1], [0, -s * 0.12, -s * 0.08, -s * 0.08, -s * 0.12, 0]) }] }}>
            <Lizard s={24 * u} />
          </Abs>
        )
      };
    case "rocks:drum":
      // The two rocks bounce in turn, like drums.
      return {
        moves: [{ scaleY: k(t, [0, 0.1, 0.18, 0.3, 0.38, 0.5, 0.58, 0.7, 0.78, 1], [1, 0.88, 1.04, 1, 0.88, 1.04, 1, 0.88, 1.04, 1]) }],
        front: [0.08, 0.36, 0.64].map((from, index) => (
          <Floater key={from} t={t} from={from} to={from + 0.3} x={s * (0.2 + index * 0.25)} y={s * 0.25} rise={s * 0.3}>
            <Note s={Math.max(11, 14 * u)} />
          </Floater>
        ))
      };
    case "rocks:roll":
      // A pebble rolls off the top, away, and back.
      return {
        front: (
          <Abs x={s * 0.3} y={s * 0.5} style={{ transform: [{ translateX: k(t, [0, 0.4, 0.55, 1], [0, s * 0.6, s * 0.6, 0]) }, { translateY: k(t, [0, 0.15, 0.4, 0.55, 0.85, 1], [0, s * 0.22, s * 0.22, s * 0.22, s * 0.22, 0]) }, { rotate: deg(t, [0, 0.4, 0.55, 1], [0, 400, 400, 0]) }] }}>
            <Pebble s={11 * u} />
          </Abs>
        )
      };
    case "rocks:sprout":
      return {
        front: (
          <Abs x={s * 0.42} y={s * 0.32} style={{ opacity: windowOf(t, 0.02, 0.97), transformOrigin: "bottom", transform: [{ scaleY: k(t, [0, 0.1, 0.45, 0.6, 0.85, 1], [0.05, 0.05, 1.15, 1, 1, 0.1]) }] }}>
            <View style={{ alignItems: "center" }}>
              <Blossom s={11 * u} color="#FFC21A" />
              <View style={{ width: 2 * u + 0.5, height: 10 * u, backgroundColor: LEAF }} />
            </View>
          </Abs>
        )
      };
    case "rocks:snail":
      return {
        front: (
          <>
            <Abs x={s * 0.05} y={s * 0.72} style={{ opacity: windowOf(t, 0, 1), transform: [{ translateX: k(t, [0, 1], [-s * 0.05, s * 0.55]) }] }}>
              <Snail s={16 * u} />
            </Abs>
            <Floater t={t} from={0.3} to={0.9} x={s * 0.3} y={s * 0.4} rise={s * 0.15}>
              <Word size={Math.max(9, 11 * u)} color="#8A4B1E">slooow</Word>
            </Floater>
          </>
        )
      };

    // ---------- the beach ----------
    case "crab:scuttle":
      return { moves: [{ translateX: k(t, [0, 0.2, 0.45, 0.7, 0.9, 1], [0, -s * 0.3, s * 0.3, -s * 0.2, s * 0.08, 0]) }, { translateY: shake(t, 0, 0.9, 2, 12, "") }] };
    case "crab:snap":
      return {
        moves: [{ rotate: shake(t, 0, 0.8, 4, 5) }],
        front: ["snip!", "snap!"].map((word, index) => (
          <Floater key={word} t={t} from={0.05 + index * 0.35} to={0.5 + index * 0.35} x={index ? s * 0.7 : -s * 0.05} y={s * 0.15} rise={s * 0.2} drift={(index ? 1 : -1) * s * 0.1}>
            <Word size={Math.max(10, 12 * u)} color="#D9452B">{word}</Word>
          </Floater>
        ))
      };
    case "crab:dig":
      return {
        moves: [{ scaleY: k(t, [0, 0.25, 0.6, 0.75, 0.85, 1], [1, 0.12, 0.12, 1.15, 0.95, 1]) }],
        front: [0.05, 0.12, 0.65].map((from, index) => (
          <Floater key={from} t={t} from={from} to={from + 0.3} x={s * (0.2 + index * 0.25)} y={s * 0.75} rise={s * 0.2} drift={(index - 1) * s * 0.2}>
            <Puff size={Math.max(8, 11 * u)} color="#F3D598" />
          </Floater>
        ))
      };
    case "sandcastle:wave":
      // A wave rolls in, washes over the castle (it slumps), rolls out; then it pops back up good as new.
      return {
        moves: [{ scaleY: k(t, [0, 0.3, 0.45, 0.7, 0.85, 1], [1, 1, 0.6, 0.6, 1.08, 1]) }],
        front: (
          <>
            <Abs x={-s * 0.3} y={s * 0.62} style={{ width: s * 0.9, height: s * 0.26, borderRadius: s * 0.13, backgroundColor: "rgba(47,168,255,0.75)", opacity: windowOf(t, 0.1, 0.7), transform: [{ translateX: k(t, [0, 0.1, 0.4, 0.7, 1], [-s * 0.4, -s * 0.4, s * 0.2, -s * 0.4, -s * 0.4]) }] }} />
            {sparkles(t, s, 0.75)}
          </>
        )
      };
    case "sandcastle:tall":
      return { moves: [{ scaleY: k(t, [0, 0.15, 0.45, 0.65, 0.8, 0.9, 1], [1, 0.9, 1.4, 1.4, 0.92, 1.04, 1]) }] };
    case "sandcastle:shells":
      return {
        front: [0, 1, 2].map((index) => (
          <Hopper key={index} t={t} from={index * 0.18} to={index * 0.18 + 0.5} x={s * (0.2 + index * 0.25)} y={s * 0.7} height={s * 0.35} drift={(1 - index) * 6 * u} spin={360}>
            <Pearl s={8 * u} />
          </Hopper>
        ))
      };
    case "boat:sail":
      return {
        moves: [
          { translateX: k(t, [0, 0.45, 0.55, 1], [0, s * 0.45, s * 0.45, 0]) },
          { translateY: t.interpolate(sampleCurve(0, 1, 30, (p) => Math.sin(p * 2 * Math.PI * 3) * 2 * u)) },
          { rotate: shake(t, 0, 1, 4, 3) }
        ]
      };
    case "boat:rock":
      return { moves: [{ rotate: deg(t, [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1], [0, -12, 10, -8, 6, -3, 0]) }], front: <Splash t={t} s={s} waterY={52 * u} from={0.1} to={0.6} /> };
    case "boat:fish":
      return {
        front: (
          <>
            <Hopper t={t} from={0.05} to={0.75} x={s * 0.05} y={50 * u} height={s * 0.7} drift={s * 0.7} spin={160}>
              <Fish s={13 * u} />
            </Hopper>
            <Splash t={t} s={s} waterY={52 * u} from={0.68} to={1} scale={0.7} />
          </>
        )
      };
    case "boat:gull":
      return {
        front: (
          <Abs x={s * 0.42} y={-2 * u} style={{ opacity: windowOf(t, 0, 1), transform: [{ translateX: k(t, [0, 0.25, 0.75, 1], [-s * 0.9, 0, 0, s * 0.9]) }, { translateY: k(t, [0, 0.25, 0.75, 1], [-s * 0.4, 0, 0, -s * 0.5]) }] }}>
            <Seagull s={16 * u} />
          </Abs>
        )
      };
    case "shell:pearl":
      return {
        moves: [{ scaleY: k(t, [0, 0.12, 0.2, 1], [1, 0.9, 1, 1]) }],
        front: (
          <>
            <Abs x={s * 0.4} y={s * 0.35} style={{ opacity: windowOf(t, 0.15, 0.9), transform: [{ translateY: k(t, [0, 0.15, 0.4, 0.8, 1], [0, 0, -s * 0.4, -s * 0.4, 0]) }, { scale: k(t, [0, 0.15, 0.35, 1], [0.2, 0.2, 1.2, 1]) }] }}>
              <Pearl s={13 * u} />
            </Abs>
            {sparkles(t, s, 0.35)}
          </>
        )
      };
    case "shell:listen":
      return {
        moves: [{ rotate: deg(t, [0, 0.2, 0.8, 1], [0, -10, -10, 0]) }],
        front: ["shhh", "whooosh"].map((word, index) => (
          <Floater key={word} t={t} from={0.1 + index * 0.3} to={0.6 + index * 0.3} x={s * (0.5 + index * 0.1)} y={s * 0.1} rise={s * 0.25} drift={s * 0.15}>
            <Word size={Math.max(9, 11 * u)} color="#2F7CD6">{word}</Word>
          </Floater>
        ))
      };
    case "turtle:swim":
      return { moves: [{ translateX: k(t, [0, 0.5, 1], [0, s * 0.4, 0]) }, { translateY: t.interpolate(sampleCurve(0, 1, 30, (p) => Math.sin(p * 2 * Math.PI * 4) * 1.5 * u)) }, { scaleX: t.interpolate({ inputRange: [0, 0.49, 0.51, 1], outputRange: [1, 1, -1, -1] }) }] };
    case "turtle:hide":
      return {
        moves: [{ scaleY: k(t, [0, 0.15, 0.7, 0.85, 1], [1, 0.75, 0.75, 1.1, 1]) }, { scaleX: k(t, [0, 0.15, 0.7, 0.85, 1], [1, 0.88, 0.88, 1, 1]) }],
        front: (
          <Floater t={t} from={0.65} to={1} x={s * 0.6} y={s * 0.1} rise={s * 0.15}>
            <Word size={Math.max(9, 11 * u)} color="#178A56">peekaboo!</Word>
          </Floater>
        )
      };
    case "turtle:babies":
      return {
        front: [0, 1, 2].map((index) => (
          <Abs key={index} x={-s * 0.1} y={s * (0.55 + (index % 2) * 0.08)} style={{ width: s, height: s, opacity: windowOf(t, index * 0.1, 0.9 + index * 0.03), transform: [{ translateX: k(t, [0, index * 0.1, 0.9, 1], [-s * 0.2, -s * 0.2, s * (0.5 + index * 0.25), s * (0.5 + index * 0.25)]) }, { scale: 0.32 }] }}>
            {art}
          </Abs>
        ))
      };

    // ---------- the forest ----------
    case "pine:cones":
      return {
        moves: [{ rotate: shake(t, 0, 0.3, 4, 3) }],
        front: [0, 1, 2].map((index) => (
          <Faller key={index} t={t} from={0.1 + index * 0.1} to={0.7 + index * 0.1} x={s * (0.3 + index * 0.15)} y={s * 0.35} fall={s * 0.45} drift={(index - 1) * s * 0.25} spin={(index - 1) * 140}>
            <Pinecone s={9 * u} />
          </Faller>
        ))
      };
    case "pine:squirrel":
      return {
        front: (
          <Abs x={s * 0.42} y={s * 0.55} style={{ opacity: windowOf(t, 0.02, 0.97), transform: [{ translateY: k(t, [0, 0.3, 0.45, 0.6, 0.75, 1], [0, -s * 0.45, -s * 0.38, -s * 0.45, -s * 0.38, 0]) }, { translateX: k(t, [0, 0.3, 0.75, 1], [s * 0.2, s * 0.1, s * 0.1, s * 0.3]) }] }}>
            <Squirrel s={16 * u} />
          </Abs>
        )
      };
    case "pine:snow":
      return {
        moves: [{ rotate: shake(t, 0.3, 0.5, 3, 2) }],
        front: Array.from({ length: 7 }, (_, index) => (
          <Floater key={index} t={t} from={(index % 4) * 0.15} to={(index % 4) * 0.15 + 0.5} x={s * (0.05 + index * 0.14)} y={0} rise={-s * 0.75} drift={(index % 2 ? 1 : -1) * s * 0.06} pop={false}>
            <Snowflake s={6 * u + 2} />
          </Floater>
        ))
      };
    case "pine:wind":
      return {
        moves: [{ rotate: deg(t, [0, 0.15, 0.32, 0.5, 0.68, 0.84, 1], [0, 10, -5, 8, -3, 2, 0]) }],
        behind: (
          <Abs x={-s * 0.5} y={s * 0.2} style={{ opacity: windowOf(t, 0, 0.7), transform: [{ translateX: t.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0, s * 1.6, s * 1.6] }) }] }}>
            <Gusts w={s * 0.8} />
          </Abs>
        )
      };
    case "mushroom:bounce":
      // A frog bounces on the cap like a trampoline.
      return {
        moves: [{ scaleY: k(t, [0, 0.28, 0.33, 0.4, 0.62, 0.67, 0.74, 1], [1, 1, 0.82, 1.05, 1, 0.82, 1.05, 1]) }],
        front: (
          <>
            <Hopper t={t} from={0} to={0.3} x={s * 0.35} y={s * 0.02} height={s * 0.45} fade={false}>
              <Frog s={14 * u} />
            </Hopper>
            <Abs x={s * 0.35} y={s * 0.02} style={{ opacity: t.interpolate({ inputRange: [0, 0.3, 0.31, 0.96, 1], outputRange: [0, 0, 1, 1, 0] }), transform: [{ translateY: t.interpolate(sampleCurve(0.33, 0.95, 20, (p) => -s * 0.55 * Math.sin(Math.PI * Math.min(1, ((p - 0.33) / 0.31) % 1)))) }] }}>
              <Frog s={14 * u} />
            </Abs>
          </>
        )
      };
    case "mushroom:sprout":
      return { front: pops(t, s, [{ x: 0.02, y: 0.62, at: 0.1 }, { x: 0.68, y: 0.58, at: 0.3 }, { x: 0.18, y: 0.68, at: 0.5 }], (index) => <MiniMushroom s={(12 + index * 2) * u} color={["#FF8A1F", "#FF5A5A", "#8E5CF7"][index]} />) };
    case "mushroom:rain":
      return { moves: [{ scaleX: k(t, [0, 0.2, 0.8, 1], [1, 1.08, 1.08, 1]) }], front: rainDrops(t, s, -s * 0.2, s * 0.25, 8) };
    case "rabbit:zoom":
      // Zooms off to the right, out of sight, and pops back in from the left.
      return {
        moves: [
          { translateX: k(t, [0, 0.1, 0.45, 0.46, 0.55, 0.9, 1], [0, -s * 0.06, s * 1.6, -s * 1.6, -s * 1.6, 0, 0]) },
          { translateY: t.interpolate(sampleCurve(0.1, 0.9, 60, (p) => -s * 0.08 * Math.abs(Math.sin(p * Math.PI * 14)))) }
        ]
      };
    case "rabbit:nibble":
      // A carrot appears in front of the nose and gets eaten bite by bite.
      return {
        moves: [{ rotate: shake(t, 0.15, 0.85, 3, 12) }],
        front: (
          <Abs
            x={s * 0.78}
            y={s * 0.5}
            style={{
              opacity: t.interpolate({ inputRange: [0, 0.05, 0.1, 0.85, 0.9, 1], outputRange: [0, 0, 1, 1, 0, 0] }),
              transformOrigin: "right",
              transform: [{ rotate: "-35deg" }, { scaleX: t.interpolate({ inputRange: [0, 0.15, 0.4, 0.6, 0.85, 1], outputRange: [1, 1, 0.7, 0.4, 0.15, 0.15] }) }]
            }}
          >
            <Carrot s={18 * u} />
          </Abs>
        )
      };
    case "rabbit:dig":
      return {
        moves: [{ rotate: shake(t, 0.05, 0.8, 5, 7) }],
        front: [0, 1, 2, 3].map((index) => (
          <Floater key={index} t={t} from={0.05 + index * 0.15} to={0.4 + index * 0.15} x={s * 0.12} y={s * 0.78} rise={s * 0.3} drift={-s * (0.1 + index * 0.05)}>
            <View style={{ width: 6 * u, height: 6 * u, borderRadius: 6 * u, backgroundColor: "#9A6B45" }} />
          </Floater>
        ))
      };
    case "rabbit:thump":
      // Thumps a back foot twice: a little bounce and a "thump!".
      return {
        moves: [{ translateY: k(t, [0, 0.15, 0.25, 0.4, 0.5, 1], [0, -s * 0.06, 0, -s * 0.06, 0, 0]) }],
        front: (
          <Floater t={t} from={0.2} to={0.9} x={s * 0.05} y={s * 0.6} rise={s * 0.25}>
            <Word size={Math.max(10, 12 * u)} color="#7A5133">thump!</Word>
          </Floater>
        )
      };
    case "log:squirrel":
      return {
        front: (
          <Abs x={s * 0.7} y={s * 0.5} style={{ opacity: windowOf(t, 0.05, 0.95), transform: [{ translateX: k(t, [0, 0.2, 0.4, 0.6, 0.8, 1], [s * 0.1, 0, -s * 0.25, -s * 0.5, -s * 0.25, s * 0.1]) }, { translateY: k(t, [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1], [0, -s * 0.15, -s * 0.3, -s * 0.15, -s * 0.3, -s * 0.15, -s * 0.15, 0]) }] }}>
            <Squirrel s={16 * u} />
          </Abs>
        )
      };
    case "log:bugs":
      return {
        front: [0, 1].map((index) => (
          <Abs key={index} x={s * 0.05} y={s * (0.5 + index * 0.12)} style={{ opacity: windowOf(t, index * 0.15, 0.9 + index * 0.05), transform: [{ translateX: k(t, [0, index * 0.15, 0.9, 1], [0, 0, s * 0.65, s * 0.65]) }, { translateY: t.interpolate(sampleCurve(0, 1, 30, (p) => Math.sin(p * 30 + index) * 1.4 * u)) }] }}>
            <Ladybug s={9 * u} />
          </Abs>
        ))
      };
    case "log:sprout":
      return { front: pops(t, s, [{ x: 0.34, y: 0.42, at: 0.1 }, { x: 0.5, y: 0.44, at: 0.28 }, { x: 0.62, y: 0.42, at: 0.46 }], (index) => <MiniMushroom s={(10 + index) * u} color={["#FF8A1F", "#FFC21A", "#FF5A5A"][index]} />) };

    // ---------- the snowy mountains ----------
    case "goat:maa":
      return {
        moves: [{ translateY: k(t, [0, 0.25, 0.5, 0.62, 1], [0, -s * 0.15, 0, -3, 0]) }],
        front: (
          <Floater t={t} from={0.05} to={0.85} x={s * 0.65} y={s * 0.05} rise={s * 0.2} drift={s * 0.1}>
            <Word size={Math.max(11, 14 * u)} color="#8E8579">MAA</Word>
          </Floater>
        )
      };
    case "goat:climb":
      return {
        moves: [
          { translateY: k(t, [0, 0.1, 0.35, 0.5, 0.7, 0.85, 1], [0, 2, -s * 0.5, -s * 0.45, -s * 0.5, 0, 0]) },
          { rotate: deg(t, [0, 0.1, 0.35, 0.7, 0.85, 1], [0, -8, -15, 5, 0, 0]) }
        ],
        front: sparkles(t, s, 0.35, 2)
      };
    case "goat:headbutt":
      return {
        moves: [{ translateX: k(t, [0, 0.3, 0.42, 0.55, 1], [0, -s * 0.12, s * 0.2, 0, 0]) }, { rotate: deg(t, [0, 0.3, 0.42, 0.55, 1], [0, -4, 10, 0, 0]) }],
        front: (
          <Floater t={t} from={0.4} to={0.9} x={s * 0.8} y={s * 0.15} rise={s * 0.15}>
            <Word size={Math.max(10, 13 * u)} color="#FF8A1F">BONK</Word>
          </Floater>
        )
      };
    case "goat:munch":
    case "horse:munch":
      return {
        moves: [{ rotate: deg(t, [0, 0.12, 0.25, 0.37, 0.5, 0.62, 0.75, 1], [0, 8, 3, 8, 3, 8, 0, 0]) }],
        front: [0.15, 0.4, 0.65].map((from, index) => (
          <Floater key={from} t={t} from={from} to={from + 0.25} x={s * 0.82} y={s * 0.72} rise={s * 0.2} drift={(index - 1) * s * 0.08}>
            <View style={{ width: 3 * u + 1, height: 6 * u + 2, borderRadius: 2, backgroundColor: LEAF }} />
          </Floater>
        ))
      };
    case "cave:echo":
      return {
        front: ["Hello!", "hello!", "hello"].map((word, index) => (
          <Floater key={word} t={t} from={index * 0.25} to={index * 0.25 + 0.4} x={s * (0.3 + index * 0.05)} y={s * 0.55} rise={s * 0.4} drift={(index % 2 ? 1 : -1) * s * 0.15}>
            <Word size={Math.max(8, (14 - index * 3) * u)} color="#5A4E7A">{word}</Word>
          </Floater>
        ))
      };
    case "cave:eyes":
      return {
        front: (
          <Abs x={26 * u} y={44 * u} style={{ opacity: windowOf(t, 0.05, 0.9), flexDirection: "row", gap: 4 * u, transform: [{ scaleY: k(t, [0, 0.4, 0.44, 0.48, 0.7, 0.74, 0.78, 1], [1, 1, 0.1, 1, 1, 0.1, 1, 1]) }, { translateX: k(t, [0, 0.3, 0.5, 0.7, 1], [0, -2 * u, 2 * u, 0, 0]) }] }}>
            {[0, 1].map((eye) => (
              <View key={eye} style={{ width: 4.6 * u, height: 4.6 * u, borderRadius: 4.6 * u, backgroundColor: "#FFE27A" }} />
            ))}
          </Abs>
        )
      };
    case "cave:bats":
      return {
        front: [0, 1, 2].map((index) => (
          <Abs key={index} x={s * 0.4} y={s * 0.62} style={{ opacity: windowOf(t, index * 0.1, 0.7 + index * 0.1), transform: [{ translateX: k(t, [0, index * 0.1, 0.7 + index * 0.1, 1], [0, 0, (index - 1) * s * 0.7, (index - 1) * s * 0.7]) }, { translateY: k(t, [0, index * 0.1, 0.7 + index * 0.1, 1], [0, 0, -s * 0.8, -s * 0.8]) }, { scaleY: t.interpolate(sampleCurve(0, 1, 40, (p) => 0.5 + 0.5 * Math.abs(Math.cos(p * 28)))) }] }}>
            <Bat s={14 * u} />
          </Abs>
        ))
      };
    case "cave:glow":
      return {
        front: (
          <>
            <Abs x={21 * u} y={38 * u} style={{ width: 22 * u, height: 21 * u, borderTopLeftRadius: 11 * u, borderTopRightRadius: 11 * u, backgroundColor: "#FFD43B", opacity: t.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 0.65, 0.65, 0] }) }} />
            {sparkles(t, s, 0.15)}
          </>
        )
      };
    case "cave:rumble":
      return {
        moves: [{ translateX: shake(t, 0, 0.7, 2.4 * u, 7, "") }],
        front: [0, 1, 2].map((index) => (
          <Floater key={index} t={t} from={0.1 + index * 0.12} to={0.6 + index * 0.12} x={s * (0.3 + index * 0.15)} y={s * 0.25} rise={-s * 0.5} drift={(index - 1) * s * 0.3} pop={false}>
            <Pebble s={7 * u} />
          </Floater>
        ))
      };

    // ---------- the camp ----------
    case "horse:rear":
      return {
        moves: [{ rotate: deg(t, [0, 0.25, 0.55, 0.75, 0.85, 1], [0, -22, -22, 3, -1, 0]) }, { translateX: k(t, [0, 0.25, 0.55, 0.75, 1], [0, -s * 0.08, -s * 0.08, 0, 0]) }],
        front: (
          <Floater t={t} from={0.15} to={0.85} x={s * 0.6} y={-s * 0.05} rise={s * 0.2}>
            <Word size={Math.max(10, 13 * u)} color="#7E5232">NEIGH!</Word>
          </Floater>
        )
      };
    case "horse:gallop":
      return {
        moves: [
          { translateX: k(t, [0, 0.4, 0.41, 0.9, 1], [0, s * 2.2, -s * 2.2, 0, 0]) },
          { translateY: t.interpolate(sampleCurve(0, 0.9, 30, (p) => -Math.abs(Math.sin(p * 2 * Math.PI * 5)) * 4 * u)) }
        ],
        front: [0.02, 0.08].map((from, index) => (
          <Floater key={from} t={t} from={from} to={from + 0.3} x={s * (0.1 + index * 0.2)} y={s * 0.8} rise={s * 0.12} drift={-s * 0.3}>
            <Puff size={Math.max(8, 11 * u)} color="#F3D598" />
          </Floater>
        ))
      };
    case "horse:trot":
      return {
        moves: [
          { translateY: k(t, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1], [0, -5 * u, 0, -5 * u, 0, -5 * u, 0, -5 * u, 0, 0]) },
          { rotate: deg(t, [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1], [0, -3, 0, 3, 0, -3, 0, 3, 0, 0]) }
        ]
      };
    case "shield:shine":
      return {
        front: (
          <Abs x={s * 0.2} y={s * 0.1} style={{ width: 5 * u, height: s * 0.7, borderRadius: 3 * u, backgroundColor: "rgba(255,255,255,0.85)", opacity: windowOf(t, 0.05, 0.6), transform: [{ translateX: k(t, [0, 0.05, 0.6, 1], [0, 0, s * 0.55, s * 0.55]) }, { rotate: "20deg" }] }} />
        ),
        behind: sparkles(t, s, 0.5)
      };
    case "shield:bounce":
      // A date flies in, bounces off the shield with a boing, and flies away.
      return {
        moves: [{ translateX: k(t, [0, 0.38, 0.44, 0.55, 1], [0, 0, 3 * u, 0, 0]) }],
        front: (
          <Abs x={s * 0.5} y={s * 0.4} style={{ opacity: windowOf(t, 0, 0.95), transform: [{ translateX: k(t, [0, 0.4, 1], [-s * 1.2, 0, -s * 0.9]) }, { translateY: k(t, [0, 0.4, 0.7, 1], [-s * 0.4, 0, -s * 0.5, -s * 0.2]) }, { rotate: deg(t, [0, 1], [0, 720]) }] }}>
            <DateFruit s={9 * u} />
          </Abs>
        )
      };
    case "shield:roll":
      return { moves: [{ translateX: k(t, [0, 0.45, 0.55, 1], [0, s * 0.6, s * 0.6, 0]) }, { rotate: deg(t, [0, 0.45, 0.55, 1], [0, 300, 300, 0]) }] };
    case "banner:wave":
      return {
        moves: [{ rotate: shake(t, 0, 0.9, 3, 5) }, { scaleX: t.interpolate(sampleCurve(0, 1, 40, (p) => 1 - 0.08 * Math.abs(Math.sin(p * 2 * Math.PI * 4)))) }],
        behind: (
          <Abs x={-s * 0.5} y={s * 0.1} style={{ opacity: windowOf(t, 0, 0.75), transform: [{ translateX: t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [0, s * 1.6, s * 1.6] }) }] }}>
            <Gusts w={s * 0.8} />
          </Abs>
        )
      };
    case "banner:raise":
      return { moves: [{ translateY: k(t, [0, 0.3, 0.7, 1], [0, -s * 0.2, -s * 0.2, 0]) }, { scaleY: k(t, [0, 0.3, 0.7, 0.85, 1], [1, 1.2, 1.2, 0.95, 1]) }], front: sparkles(t, s, 0.3) };
    default:
      return genericLook(name, t, s);
  }
}

