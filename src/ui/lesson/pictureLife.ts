/**
 * What moves on each lesson picture, so no picture is ever a still photo: birds glide over the deserts, the sun
 * glows, rain falls on the Ark, the sea ripples, steam rises from the iftar cup, ants march to their hill, a camel
 * caravan crosses the plain of Arafah. Places are given (x, y) as a share of the picture (0..1 from its top-left),
 * worked out from the drawings in assets/pictures (1024x576), so the life sits on the thing it belongs to.
 *
 * Only nature and things move: never a person. The Ka'bah itself stays still (only the sky around it moves).
 */

export type Life =
  /** Birds gliding across the sky, between `top` and `bottom`. */
  | { kind: "birds"; top: number; bottom: number; count?: number; color?: string }
  /** A soft cloud drifting across at `y`. */
  | { kind: "cloud"; y: number; size?: number; dark?: boolean }
  /** A sun or moon at (x, y) breathing a warm (or silver) halo, `r` its radius as a share of the width. */
  | { kind: "glow"; x: number; y: number; r: number; moon?: boolean }
  /** Grains of sand blowing along the ground band. */
  | { kind: "dust"; top: number; bottom: number }
  /** Specks of light floating slowly up through a lit room. */
  | { kind: "motes"; left: number; right: number; top: number; bottom: number }
  /** Ripples of light sliding on water between `top` and `bottom`. */
  | { kind: "waves"; top: number; bottom: number; left?: number; right?: number }
  /** Rain falling over the whole picture. */
  | { kind: "rain" }
  /** Bubbles rising through the sea. */
  | { kind: "bubbles"; left: number; right: number; top: number; bottom: number }
  /** A gleam of light passing over the picture now and then (books, pages, gold). */
  | { kind: "shine" }
  /** Two butterflies fluttering over the grass. */
  | { kind: "butterflies"; top: number; bottom: number }
  /** Steam rising from a cup or a pot at (x, y). */
  | { kind: "steam"; x: number; y: number }
  /** A line of ants marching along `y` toward (x) their hill. */
  | { kind: "ants"; y: number; to: number }
  /** Water dripping from (x, y) down to `to` and rippling there. */
  | { kind: "drops"; x: number; y: number; to: number }
  /** Embers rising from below. */
  | { kind: "embers" }
  /** Two camels walking slowly along the ground at `y` (their feet), far away. */
  | { kind: "caravan"; y: number; size?: number };

const sky = (sun?: [number, number]): Life[] => [
  { kind: "birds", top: 0.06, bottom: 0.3 },
  ...(sun ? [{ kind: "glow" as const, x: sun[0], y: sun[1], r: 0.09 }] : [])
];

/** Life for each picture id (src/data/lessonPictures.ts). A picture missing here still gets the slow camera move. */
export const PICTURE_LIFE: Record<string, Life[]> = {
  ahqaf: [...sky([0.8, 0.19]), { kind: "dust", top: 0.45, bottom: 0.95 }],
  ants: [{ kind: "glow", x: 0.84, y: 0.14, r: 0.08 }, { kind: "ants", y: 0.82, to: 0.5 }, { kind: "dust", top: 0.6, bottom: 0.95 }],
  aqsa: [{ kind: "birds", top: 0.05, bottom: 0.25 }, { kind: "shine" }],
  arafah: [...sky([0.82, 0.15]), { kind: "cloud", y: 0.17, size: 0.12 }, { kind: "caravan", y: 0.72 }],
  ark: [{ kind: "rain" }, { kind: "waves", top: 0.74, bottom: 0.98 }, { kind: "cloud", y: 0.17, size: 0.16, dark: true }],
  badr: [{ kind: "birds", top: 0.04, bottom: 0.25 }, { kind: "dust", top: 0.55, bottom: 0.95 }],
  "big-fish": [{ kind: "glow", x: 0.16, y: 0.13, r: 0.05, moon: true }, { kind: "bubbles", left: 0.2, right: 0.75, top: 0.35, bottom: 0.95 }, { kind: "waves", top: 0.29, bottom: 0.34 }],
  "book-deeds": [{ kind: "glow", x: 0.5, y: 0.35, r: 0.22 }, { kind: "shine" }, { kind: "motes", left: 0.3, right: 0.7, top: 0.1, bottom: 0.8 }],
  books: [{ kind: "shine" }, { kind: "motes", left: 0.05, right: 0.95, top: 0.1, bottom: 0.9 }],
  cave: [...sky([0.88, 0.18]), { kind: "dust", top: 0.7, bottom: 0.98 }],
  damascus: [{ kind: "birds", top: 0.03, bottom: 0.2 }, { kind: "shine" }],
  "date-palms": [{ kind: "birds", top: 0.05, bottom: 0.35 }, { kind: "butterflies", top: 0.4, bottom: 0.85 }],
  "desert-well": [...sky([0.8, 0.15]), { kind: "cloud", y: 0.17, size: 0.1 }, { kind: "dust", top: 0.6, bottom: 0.95 }],
  desert: [{ kind: "birds", top: 0.05, bottom: 0.3 }, { kind: "dust", top: 0.55, bottom: 0.98 }],
  elephant: [{ kind: "birds", top: 0.04, bottom: 0.28, count: 4 }, { kind: "dust", top: 0.75, bottom: 0.98 }],
  garden: [...sky([0.8, 0.15]), { kind: "butterflies", top: 0.45, bottom: 0.9 }, { kind: "waves", top: 0.55, bottom: 0.95, left: 0.5, right: 0.75 }],
  gathering: [{ kind: "glow", x: 0.5, y: 0.25, r: 0.2 }, { kind: "dust", top: 0.55, bottom: 0.98 }],
  grave: [{ kind: "cloud", y: 0.17, size: 0.14 }, { kind: "dust", top: 0.6, bottom: 0.95 }],
  hegra: [{ kind: "birds", top: 0.02, bottom: 0.15 }, { kind: "dust", top: 0.75, bottom: 0.98 }],
  hira: [{ kind: "glow", x: 0.81, y: 0.17, r: 0.06, moon: true }, { kind: "cloud", y: 0.2, size: 0.12, dark: true }],
  home: [{ kind: "glow", x: 0.18, y: 0.52, r: 0.1 }, { kind: "birds", top: 0.06, bottom: 0.3 }, { kind: "dust", top: 0.75, bottom: 0.98 }],
  iftar: [{ kind: "glow", x: 0.5, y: 0.47, r: 0.1 }, { kind: "steam", x: 0.64, y: 0.76 }, { kind: "birds", top: 0.12, bottom: 0.3, count: 2 }],
  jerusalem: [...sky([0.15, 0.15]), { kind: "cloud", y: 0.17, size: 0.1 }],
  kaaba: [...sky([0.17, 0.15]), { kind: "cloud", y: 0.17, size: 0.1 }],
  madinah: [...sky([0.14, 0.17]), { kind: "cloud", y: 0.17, size: 0.1 }, { kind: "dust", top: 0.75, bottom: 0.98 }],
  makkah: [...sky([0.8, 0.16]), { kind: "cloud", y: 0.17, size: 0.1 }],
  manuscript: [{ kind: "shine" }],
  market: [{ kind: "birds", top: 0.03, bottom: 0.2, count: 2 }, { kind: "dust", top: 0.7, bottom: 0.98 }, { kind: "butterflies", top: 0.35, bottom: 0.7 }],
  masjid: [...sky([0.84, 0.19]), { kind: "cloud", y: 0.17, size: 0.1 }],
  mina: [...sky([0.5, 0.19]), { kind: "cloud", y: 0.17, size: 0.1 }],
  muzdalifah: [{ kind: "glow", x: 0.21, y: 0.19, r: 0.07, moon: true }, { kind: "cloud", y: 0.3, size: 0.12, dark: true }],
  night: [{ kind: "glow", x: 0.76, y: 0.21, r: 0.08, moon: true }, { kind: "cloud", y: 0.35, size: 0.14, dark: true }],
  nile: [...sky([0.17, 0.15]), { kind: "waves", top: 0.56, bottom: 0.76 }],
  pool: [{ kind: "waves", top: 0.48, bottom: 0.6, left: 0.1, right: 0.9 }, { kind: "motes", left: 0.1, right: 0.9, top: 0.3, bottom: 0.6 }],
  prayer: [{ kind: "motes", left: 0.1, right: 0.9, top: 0.15, bottom: 0.75 }, { kind: "glow", x: 0.18, y: 0.18, r: 0.06 }, { kind: "glow", x: 0.82, y: 0.18, r: 0.06 }],
  quran: [{ kind: "shine" }, { kind: "motes", left: 0.2, right: 0.8, top: 0.1, bottom: 0.6 }, { kind: "glow", x: 0.86, y: 0.66, r: 0.04 }],
  rain: [{ kind: "rain" }, { kind: "cloud", y: 0.17, size: 0.16, dark: true }],
  "safa-marwa": [...sky([0.5, 0.15]), { kind: "cloud", y: 0.17, size: 0.1 }],
  scales: [{ kind: "glow", x: 0.5, y: 0.27, r: 0.06 }, { kind: "shine" }],
  scroll: [{ kind: "glow", x: 0.5, y: 0.3, r: 0.12 }, { kind: "motes", left: 0.35, right: 0.65, top: 0.25, bottom: 0.7 }, { kind: "shine" }],
  "sea-split": [...sky([0.84, 0.14]), { kind: "waves", top: 0.48, bottom: 0.98, left: 0, right: 0.36 }, { kind: "waves", top: 0.48, bottom: 0.98, left: 0.64, right: 1 }],
  sharing: [{ kind: "steam", x: 0.6, y: 0.76 }, { kind: "motes", left: 0.3, right: 0.7, top: 0.15, bottom: 0.65 }],
  sheep: [...sky([0.15, 0.17]), { kind: "cloud", y: 0.17, size: 0.1 }, { kind: "butterflies", top: 0.5, bottom: 0.9 }],
  sinai: [{ kind: "birds", top: 0.03, bottom: 0.22 }],
  sirat: [{ kind: "embers" }],
  "sun-west": [{ kind: "glow", x: 0.49, y: 0.53, r: 0.12 }, { kind: "birds", top: 0.1, bottom: 0.35, count: 2 }],
  sunrise: [{ kind: "glow", x: 0.5, y: 0.55, r: 0.14 }, { kind: "birds", top: 0.1, bottom: 0.35 }],
  taif: [...sky([0.86, 0.13]), { kind: "cloud", y: 0.17, size: 0.1 }, { kind: "butterflies", top: 0.55, bottom: 0.95 }],
  uhud: [...sky([0.86, 0.14]), { kind: "cloud", y: 0.17, size: 0.1 }, { kind: "dust", top: 0.75, bottom: 0.98 }],
  wudu: [{ kind: "drops", x: 0.53, y: 0.36, to: 0.66 }],
  zakat: [{ kind: "shine" }, { kind: "birds", top: 0.05, bottom: 0.25, count: 2 }],
  zamzam: [...sky([0.13, 0.15]), { kind: "cloud", y: 0.17, size: 0.1 }]
};

/** Life for a surah's drawn picture (src/data/surahPictures.ts), by its kind of sky. */
export function sceneLife(scene: "day" | "night" | "dawn" | "dusk" | "sea" | undefined): Life[] {
  switch (scene) {
    case "day":
      return [{ kind: "birds", top: 0.05, bottom: 0.3, count: 2 }, { kind: "cloud", y: 0.17, size: 0.12 }];
    case "dawn":
    case "dusk":
      return [{ kind: "birds", top: 0.08, bottom: 0.35, count: 2 }];
    case "night":
      return [{ kind: "cloud", y: 0.3, size: 0.13, dark: true }];
    case "sea":
      return [{ kind: "birds", top: 0.05, bottom: 0.25, count: 2 }, { kind: "waves", top: 0.66, bottom: 0.98 }];
    default:
      return [{ kind: "shine" }];
  }
}

/** The sound a tap on the picture makes, from what lives on it: birds chirp, water splashes, a camel grumbles. */
export function pokeSound(id: string): "chirp" | "splash" | "baa" | "camel" | "sizzle" | "sparkle" {
  if (id === "sheep") return "baa";
  // The Ka'bah only glints, as on the path.
  if (id === "kaaba") return "sparkle";
  const kinds = new Set((PICTURE_LIFE[id] ?? []).map((life) => life.kind));
  if (kinds.has("caravan")) return "camel";
  if (kinds.has("embers")) return "sizzle";
  if (kinds.has("rain") || kinds.has("waves") || kinds.has("drops") || kinds.has("bubbles")) return "splash";
  if (kinds.has("birds")) return "chirp";
  return "sparkle";
}
