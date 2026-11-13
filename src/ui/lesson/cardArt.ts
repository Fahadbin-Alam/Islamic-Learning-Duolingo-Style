import { ANIMAL_ART, ANIMAL_KINDS, type AnimalKind } from "./animalArt";
import { THING_ART, THING_KINDS, type ThingKind } from "./thingArt";

/**
 * The pictures of the picture cards (cardQuestions.ts, CardGame.tsx): an animal (animalArt.ts) or a thing
 * (thingArt.ts: a food, a plant, the sun or the rain, a metal, a lamp), each drawn in a box 100 wide and 80 high, in
 * its own place, moving its own way. Only animals and things are drawn: never a person, and nothing that stands for
 * one.
 */

export type CardKind = AnimalKind | ThingKind;

/**
 * How the drawing moves as a whole. An animal walks on the spot, flies, buzzes about, swims or creeps. A thing stands
 * still (its parts may still move), sways from its foot (a tree in the breeze), bobs (a ship on the water), glows (the
 * sun), or drifts to and fro (a cloud).
 */
export type CardMotion = "walk" | "fly" | "buzz" | "swim" | "creep" | "still" | "sway" | "bob" | "glow" | "drift";

/**
 * Where it is drawn, stretched to fill the card's picture: on the sand under the sky, in the sky, in the sea, on the
 * ground close up, at night, on a table, on a plain light ground, under a grey sky, or in the snow.
 */
export type CardHome = "land" | "sky" | "sea" | "ground" | "night" | "table" | "plain" | "grey" | "winter";

/** A part that moves on its own, round and round. */
export type CardLayer = {
  svg: string;
  /**
   * fall: drops or flakes falling down the whole picture (`fill` only); slide: ripples, waves or gusts moving across
   * it to the right (`fill` only); rise: steam, smoke or sparks moving up (or, with a positive `distance`, a drop or a
   * leaf falling) and fading; twinkle: glints coming and going; spin: rays turning about `center`; flicker: a flame
   * leaping from its foot (`center`); sway: a sprig or a pennant swinging to and fro about `center`.
   */
  move: "fall" | "slide" | "rise" | "twinkle" | "spin" | "flicker" | "sway";
  /**
   * Fills the whole picture, stretched like the home and drawn under the drawing (rain, snow, waves); else it is drawn
   * in the drawing's own box, over it, and moves with it.
   */
  fill?: boolean;
  /** How long one round takes, in ms. */
  ms?: number;
  /** Where in its round it starts (0 to 1), so layers alike take turns. */
  phase?: number;
  /** rise: how far it moves, in the box's units (up is negative). */
  distance?: number;
  /** spin, flicker and sway: the point it turns about, or leaps from. */
  center?: { x: number; y: number };
  /** sway: how far it swings each way, in degrees. */
  angle?: number;
};

export type CardArt = {
  kind: CardKind;
  motion: CardMotion;
  home: CardHome;
  /** A scene over the home, stretched like it to fill the picture (the sea to the sky, a river between its banks). */
  scene?: string;
  /** The animal or the thing, but for the wings of one that flies, fitted into the picture; empty when the scene is the thing. */
  body: string;
  /** The wings, drawn over the body, beating up and down about `pivot` (the line where they join the body). */
  wings?: string;
  pivot?: number;
  /** sway: the line the drawing stands on, that it sways from (72 when not given). */
  foot?: number;
  /** Parts that move on their own. */
  layers?: CardLayer[];
};

export const ART_BOX = { width: 100, height: 80 } as const;

const box = (inner: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 100 80" preserveAspectRatio="none">${inner}</svg>`;

/**
 * Each place, stretched to fill a card's picture: the sand under the sky, the open sky with a cloud, the sea with its
 * bubbles, the ground close up with pebbles and grass, the night, a table against a warm wall, a plain light ground,
 * a grey sky, or the snow.
 */
export function homeSvg(home: CardHome) {
  switch (home) {
    case "land":
      return box(
        `<rect width="100" height="80" fill="#D6EFFF"/><rect y="38" width="100" height="24" fill="#EAF6FF"/>` +
          `<path d="M0 62 C20 58 40 60 60 59 C78 58 90 60 100 61 L100 80 L0 80 Z" fill="#F3D8A2"/>` +
          `<path d="M0 72 C24 69 50 71 74 70 C86 70 94 71 100 72 L100 80 L0 80 Z" fill="#EACB8E"/>`
      );
    case "sky":
      return box(
        `<rect width="100" height="80" fill="#BFE4FF"/><rect y="50" width="100" height="30" fill="#DDF1FF"/>` +
          `<ellipse cx="18" cy="16" rx="12" ry="4.5" fill="#FFFFFF" opacity="0.9"/><ellipse cx="26" cy="13" rx="7" ry="4" fill="#FFFFFF" opacity="0.9"/>` +
          `<ellipse cx="84" cy="66" rx="13" ry="4.5" fill="#FFFFFF" opacity="0.85"/><ellipse cx="78" cy="63" rx="7" ry="4" fill="#FFFFFF" opacity="0.85"/>`
      );
    case "sea":
      return box(
        `<rect width="100" height="80" fill="#5AB7E8"/><rect y="44" width="100" height="36" fill="#3F9AD3"/>` +
          `<path d="M0 74 C14 70 24 76 40 73 C56 70 66 76 82 73 C90 72 96 74 100 73 L100 80 L0 80 Z" fill="#E9D3A0"/>` +
          `<circle cx="10" cy="56" r="2" fill="#FFFFFF" opacity="0.55"/><circle cx="15" cy="46" r="1.3" fill="#FFFFFF" opacity="0.55"/>` +
          `<circle cx="90" cy="24" r="1.8" fill="#FFFFFF" opacity="0.55"/><circle cx="94" cy="14" r="1.2" fill="#FFFFFF" opacity="0.55"/>`
      );
    case "ground":
      return box(
        `<rect width="100" height="80" fill="#F6E7C8"/><rect y="58" width="100" height="22" fill="#EAD3A6"/>` +
          `<ellipse cx="14" cy="68" rx="3.4" ry="1.6" fill="#D5B98A"/><ellipse cx="84" cy="66" rx="2.6" ry="1.3" fill="#D5B98A"/><ellipse cx="66" cy="76" rx="2" ry="1" fill="#D5B98A"/>` +
          `<path d="M6 80 L8 72 L10 80 M90 80 L92 71 L94 80 M96 80 L97 74 L99 80" fill="#9CC46A"/>`
      );
    case "night":
      return box(`<rect width="100" height="80" fill="#1E2C58"/><rect y="40" width="100" height="40" fill="#24356A"/><rect y="64" width="100" height="16" fill="#2C3F78"/>`);
    case "table":
      return box(
        `<rect width="100" height="80" fill="#FBF0DC"/><rect y="56" width="100" height="3" fill="#F1DFC0"/>` +
          `<rect y="59" width="100" height="21" fill="#D39A63"/><rect y="59" width="100" height="2.4" fill="#E6B583"/>` +
          `<path d="M0 68 L100 67 M0 75 L100 74.5" stroke="#C0854F" stroke-width="0.8" opacity="0.6"/>`
      );
    case "plain":
      return box(`<rect width="100" height="80" fill="#F5F1E8"/><rect y="60" width="100" height="20" fill="#ECE5D6"/><ellipse cx="50" cy="60" rx="60" ry="2.2" fill="#E3DAC6"/>`);
    case "grey":
      return box(`<rect width="100" height="80" fill="#AFC0D2"/><rect y="40" width="100" height="40" fill="#C2D0DE"/><path d="M0 66 C30 63 60 65 100 64 L100 80 L0 80 Z" fill="#9DB57E"/>`);
    case "winter":
      return box(`<rect width="100" height="80" fill="#CFE6F7"/><rect y="36" width="100" height="30" fill="#E2F0FA"/><path d="M0 64 C24 60 48 63 70 61 C84 60 94 61 100 62 L100 80 L0 80 Z" fill="#FFFFFF"/>`);
  }
}

export const CARD_KINDS: CardKind[] = [...ANIMAL_KINDS, ...THING_KINDS];

export function isAnimalKind(kind: CardKind): kind is AnimalKind {
  return Object.prototype.hasOwnProperty.call(ANIMAL_ART, kind);
}

const drawn = new Map<CardKind, CardArt>();

/** A card's picture, made once. */
export function cardArt(kind: CardKind): CardArt {
  let art = drawn.get(kind);
  if (!art) {
    art = isAnimalKind(kind) ? ANIMAL_ART[kind]() : THING_ART[kind as ThingKind]();
    drawn.set(kind, art);
  }
  return art;
}
