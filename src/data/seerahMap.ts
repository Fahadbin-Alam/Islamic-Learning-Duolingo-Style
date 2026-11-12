import type { LatLon } from "./seerahMapGeo";

/**
 * The Seerah on a map: for each Seerah unit, where it happened and the road that led there, drawn by
 * src/ui/journey (a dotted road that draws itself, the places, a few moving touches such as the rain before Badr or the
 * fires at Marr az-Zahran) and placed on a timeline of his life ﷺ. Only places, roads and things: never the Prophet ﷺ,
 * a Companion or anyone at all.
 *
 * Every road and every word on the map comes from the Quran or a sahih hadith (each scene names its sources, checked
 * on the text of Sahih al-Bukhari and Sahih Muslim). Places stand at their real positions, so the roads show the real
 * distances; a road's bends between named places only show its general way (the coast road of the Hijrah, the road
 * north to Tabuk), never a claim about exact paths. Dates and places the scholars differ on are left out.
 */

export type MapPlaceKind = "kaaba" | "city" | "masjid" | "aqsa" | "cave" | "mount" | "hill" | "well" | "palms" | "ruins" | "point" | "pillar" | "tent";
export type LabelSide = "top" | "bottom" | "left" | "right";

export interface MapPlace {
  id: string;
  /** English name, translated where it is shown (content catalogs). */
  name: string;
  at: LatLon;
  kind: MapPlaceKind;
  /** Where the name sits next to its picture. Default below. */
  side?: LabelSide;
}

export const MAP_PLACES: Record<string, MapPlace> = {
  makkah: { id: "makkah", name: "Makkah", at: [21.4225, 39.8262], kind: "kaaba", side: "left" },
  madinah: { id: "madinah", name: "Madinah", at: [24.4672, 39.6111], kind: "masjid", side: "right" },
  taif: { id: "taif", name: "Ta'if", at: [21.2703, 40.4158], kind: "city", side: "bottom" },
  aqsa: { id: "aqsa", name: "Al-Masjid al-Aqsa", at: [31.7761, 35.2358], kind: "aqsa", side: "left" },
  hira: { id: "hira", name: "The cave of Hira", at: [21.4576, 39.8617], kind: "cave", side: "right" },
  thawr: { id: "thawr", name: "The cave of Thawr", at: [21.3772, 39.8497], kind: "cave", side: "right" },
  aqabah: { id: "aqabah", name: "Aqabah", at: [21.4235, 39.8722], kind: "point", side: "right" },
  mina: { id: "mina", name: "Mina", at: [21.4133, 39.8933], kind: "point", side: "top" },
  muzdalifah: { id: "muzdalifah", name: "Muzdalifah", at: [21.389, 39.937], kind: "point", side: "top" },
  arafah: { id: "arafah", name: "Arafah", at: [21.3549, 39.9841], kind: "hill", side: "bottom" },
  qarn: { id: "qarn", name: "Qarn ath-Tha'alib", at: [21.63, 40.42], kind: "point", side: "right" },
  quba: { id: "quba", name: "Quba", at: [24.4393, 39.6173], kind: "palms", side: "right" },
  badr: { id: "badr", name: "Badr", at: [23.78, 38.79], kind: "well", side: "left" },
  uhud: { id: "uhud", name: "Mount Uhud", at: [24.5155, 39.62], kind: "mount", side: "top" },
  archers: { id: "archers", name: "The archers' hill", at: [24.5029, 39.6135], kind: "hill", side: "left" },
  hudaybiyah: { id: "hudaybiyah", name: "Hudaybiyah", at: [21.4447, 39.6106], kind: "well", side: "left" },
  dhulhulayfah: { id: "dhulhulayfah", name: "Dhul-Hulayfah", at: [24.413, 39.543], kind: "point", side: "left" },
  khaybar: { id: "khaybar", name: "Khaybar", at: [25.6966, 39.2917], kind: "palms", side: "left" },
  mutah: { id: "mutah", name: "Mu'tah", at: [31.087, 35.699], kind: "point", side: "right" },
  kadid: { id: "kadid", name: "Al-Kadid", at: [22.12, 39.28], kind: "well", side: "left" },
  marr: { id: "marr", name: "Marr az-Zahran", at: [21.617, 39.698], kind: "palms", side: "left" },
  hunayn: { id: "hunayn", name: "Hunayn", at: [21.52, 40.06], kind: "point", side: "top" },
  jiranah: { id: "jiranah", name: "Al-Ji'ranah", at: [21.5622, 39.955], kind: "point", side: "left" },
  hijr: { id: "hijr", name: "Al-Hijr", at: [26.7915, 37.953], kind: "ruins", side: "right" },
  tabuk: { id: "tabuk", name: "Tabuk", at: [28.3835, 36.5662], kind: "palms", side: "right" },
  // The Hajj maps (hajjMap.ts): the miqats he ﷺ set (Sahih al-Bukhari 1524), Namirah where his tent was pitched and
  // the Jamarat at Mina (Sahih Muslim 1218).
  juhfah: { id: "juhfah", name: "Al-Juhfah", at: [22.7055, 39.1469], kind: "point", side: "left" },
  qarnmanazil: { id: "qarnmanazil", name: "Qarn al-Manazil", at: [21.6264, 40.4153], kind: "point", side: "right" },
  yalamlam: { id: "yalamlam", name: "Yalamlam", at: [20.5179, 39.8702], kind: "point", side: "right" },
  namirah: { id: "namirah", name: "Namirah", at: [21.353, 39.9668], kind: "tent", side: "bottom" },
  jamarat: { id: "jamarat", name: "The Jamarat", at: [21.4213, 39.8727], kind: "pillar", side: "bottom" }
};

/** A sea's name, written on the water where a map shows it. */
export const SEA_LABELS: { name: string; at: LatLon }[] = [
  { name: "Red Sea", at: [24.2, 36.3] },
  { name: "Red Sea", at: [21.0, 38.4] },
  { name: "Mediterranean Sea", at: [32.6, 33.2] }
];

/**
 * A road on the map. "his": the way he ﷺ went; "home": his way back (drawn beside the way there); "army": others on
 * the move (the army to Mu'tah, the caravan at Badr); "pilgrims": the pilgrims of a land, from its miqat; "sea": by
 * ship; "letter": his letters to the kings; "trench": the trench round Madinah, drawn as a line. A point is a place id
 * or a [lat, lon] bend on the way.
 * `lessons`: shown only on those lessons' maps (and not when the whole life plays).
 */
export interface MapLeg {
  kind: "his" | "home" | "army" | "pilgrims" | "sea" | "letter" | "trench";
  path: (string | LatLon)[];
  /** A name for whoever is on the move, at the road's start ("The caravan", "To Caesar"). */
  label?: string;
  lessons?: string[];
  /** Where a lesson's own road comes from, when the scene's sources do not say it. */
  source?: MapSource;
}

export type MapEffect = {
  kind: "night" | "rain" | "wind" | "fires" | "ripple" | "cloud" | "rise" | "tents" | "sunset" | "pebbles";
  /** A place id or a point; none for the night. */
  at?: string | LatLon;
  /** The index of a leg it waits for: it comes once that road is drawn (the sun sets once the road reaches Arafah). */
  after?: number;
  /** The tents' name ("Quraysh's camp"). */
  label?: string;
  lessons?: string[];
  source?: MapSource;
};

/** A short note that shows when the road reaches its place ("Three nights"), or on a road's middle (`leg`). */
export interface MapNote {
  /** A place id (the place need not be drawn: a stop on the road such as Dhul-Hulayfah). */
  at?: string;
  /**
   * Which side of its place the note would sit on. Default: above, or below when the place's name is above. When that
   * spot is taken (a name, a picture, another note, a road), the note goes to the freest spot around its place.
   */
  side?: LabelSide;
  /** The index of the leg whose middle it sits on. */
  leg?: number;
  /** The index of a leg the note waits for: it comes once that road is drawn (a road that passes its place first). */
  after?: number;
  text: string;
  /** Filled in for "About {km} km apart": the straight-line distance of the leg's two ends. */
  distance?: boolean;
  lessons?: string[];
  source?: MapSource;
}

export interface MapSource {
  reference: string;
  url: string;
}

/** How close the map comes: the whole region down to one valley. It picks how big the hills and the sea's waves are drawn. */
export type MapLevel = "arabia" | "hijaz" | "makkah" | "madinah" | "valley";

export interface MapBox {
  north: number;
  south: number;
  west: number;
  east: number;
}

export interface MapScene {
  id: string;
  level: MapLevel;
  /** What must be in view; the map widens it to fill its frame. */
  box: MapBox;
  places: string[];
  /** Where a place's name goes on this map, when not on its usual side (two places close together). */
  labels?: Partial<Record<string, LabelSide>>;
  legs: MapLeg[];
  effects?: MapEffect[];
  notes?: MapNote[];
  /** One short sentence, said by the sources under it. */
  caption: string;
  sources: MapSource[];
}

export type LifeEra = "before" | "makkah" | "madinah";

export interface SeerahJourney {
  /** The unit (branch) the journey belongs to, e.g. "seerah-hijrah". */
  branchId: string;
  /** The unit's key in its lesson ids: deep-<unitKey>-<slug>. */
  unitKey: string;
  era: LifeEra;
  /** His age ﷺ when the unit's main event happened, where a sahih source gives it (Sahih al-Bukhari 3902). */
  age?: number;
  scenes: MapScene[];
  /** What each lesson's map shows: its scene, the place it is about, and its own era or age where they differ. */
  lessons: Record<string, { scene?: number; focus?: string; era?: LifeEra; age?: number }>;
}

export const bukhari = (number: string): MapSource => ({ reference: `Sahih al-Bukhari ${number}`, url: `https://sunnah.com/bukhari:${number}` });
export const muslim = (number: string): MapSource => ({ reference: `Sahih Muslim ${number}`, url: `https://sunnah.com/muslim:${number}` });
export const quran = (surah: number, ayah: number): MapSource => ({ reference: `Quran ${surah}:${ayah}`, url: `https://quran.com/${surah}/${ayah}` });

/** The road between Madinah and Makkah, inland, as its bends (north to south). */
export const INLAND_ROAD: LatLon[] = [
  [24.05, 39.4],
  [23.45, 39.34],
  [22.85, 39.33],
  [22.3, 39.36]
];
const reversed = <T,>(items: T[]) => [...items].reverse();

const EARLY: SeerahJourney = {
  branchId: "seerah-early-life",
  unitKey: "seerah-early",
  era: "before",
  scenes: [
    {
      id: "early-makkah",
      level: "makkah",
      box: { north: 21.5, south: 21.35, west: 39.73, east: 39.93 },
      places: ["makkah"],
      legs: [],
      caption: "Makkah, where he ﷺ grew up and herded its people's sheep.",
      sources: [bukhari("2262")]
    }
  ],
  lessons: {
    monday: { focus: "makkah", age: 0 },
    orphan: { focus: "makkah" },
    shepherd: { focus: "makkah" },
    "kabah-stones": { focus: "makkah" },
    "never-lied": { focus: "makkah" },
    "protected-uncle": { focus: "makkah" }
  }
};

const REVELATION: SeerahJourney = {
  branchId: "seerah-revelation",
  unitKey: "seerah-wahy",
  era: "makkah",
  age: 40,
  scenes: [
    {
      id: "revelation-hira",
      level: "makkah",
      box: { north: 21.47, south: 21.405, west: 39.81, east: 39.875 },
      places: ["makkah", "hira"],
      legs: [
        { kind: "his", path: ["makkah", [21.432, 39.838], [21.447, 39.852], "hira"] },
        { kind: "home", path: ["hira", [21.447, 39.852], [21.432, 39.838], "makkah"] }
      ],
      notes: [{ at: "hira", text: "Many nights" }],
      caption: "He ﷺ would go up to the cave of Hira, then come home to Khadijah.",
      sources: [bukhari("3")]
    }
  ],
  lessons: {
    dreams: {},
    hira: { focus: "hira" },
    iqra: { focus: "hira" },
    pen: { focus: "hira" },
    waraqah: { focus: "makkah" },
    // After the pause in revelation, whose length the scholars give differently: no age.
    muddaththir: { focus: "makkah", age: undefined }
  }
};

const MAKKAH_CALL: SeerahJourney = {
  branchId: "seerah-makkah-call",
  unitKey: "seerah-makkah",
  era: "makkah",
  scenes: [
    {
      id: "makkah-call",
      level: "makkah",
      box: { north: 21.47, south: 21.38, west: 39.77, east: 39.89 },
      places: ["makkah"],
      legs: [],
      effects: [{ kind: "ripple", at: "makkah" }],
      caption: "From the hill of Safa, by the Ka'bah, he ﷺ called every clan of Quraysh.",
      sources: [bukhari("4770")]
    }
  ],
  lessons: {
    declare: { focus: "makkah" },
    safa: { focus: "makkah" },
    "abu-lahab": { focus: "makkah" },
    "fatimah-helps": { focus: "makkah" },
    khabbab: { focus: "makkah" },
    "not-you": { focus: "makkah" },
    guidance: { focus: "makkah" }
  }
};

const TAIF: SeerahJourney = {
  branchId: "seerah-taif",
  unitKey: "seerah-taif",
  era: "makkah",
  scenes: [
    {
      id: "taif",
      level: "makkah",
      box: { north: 21.72, south: 21.23, west: 39.78, east: 40.47 },
      places: ["makkah", "taif", "qarn"],
      legs: [
        { kind: "his", path: ["makkah", [21.395, 40.03], [21.33, 40.22], "taif"] },
        { kind: "home", path: ["taif", [21.45, 40.44], "qarn", [21.6, 40.2], [21.52, 40.0], "makkah"] }
      ],
      effects: [{ kind: "cloud", at: "qarn" }],
      caption: "To Ta'if and back. On the way home, a cloud shaded him ﷺ at Qarn ath-Tha'alib.",
      sources: [bukhari("3231")]
    }
  ],
  lessons: {
    "hardest-day": { focus: "taif" },
    cloud: { focus: "qarn" },
    // The angel of the mountains came to him ﷺ there, under the cloud (Sahih al-Bukhari 3231).
    mountains: { focus: "qarn" },
    hope: { focus: "qarn" }
  }
};

const ISRA: SeerahJourney = {
  branchId: "seerah-isra-miraj",
  unitKey: "seerah-isra",
  era: "makkah",
  scenes: [
    {
      id: "isra",
      level: "arabia",
      box: { north: 32.7, south: 21.1, west: 34.5, east: 40.5 },
      places: ["makkah", "aqsa"],
      legs: [
        { kind: "his", path: ["makkah", [26.9, 38.2], "aqsa"] },
        { kind: "home", path: ["aqsa", [26.9, 38.2], "makkah"] }
      ],
      effects: [{ kind: "night" }, { kind: "rise", at: "aqsa" }],
      notes: [{ leg: 0, text: "About {km} km apart", distance: true }],
      caption: "In one night, from Al-Masjid al-Haram in Makkah to Al-Masjid al-Aqsa, then up through the heavens.",
      sources: [quran(17, 1), muslim("162a")]
    }
  ],
  lessons: {
    "night-journey": { focus: "aqsa" },
    buraq: { focus: "makkah" },
    milk: { focus: "aqsa" },
    gates: { focus: "aqsa" },
    "lower-heavens": { focus: "aqsa" },
    "upper-heavens": { focus: "aqsa" },
    "bayt-mamur": { focus: "aqsa" },
    sidrah: { focus: "aqsa" },
    "fifty-five": { focus: "aqsa" },
    "three-gifts": { focus: "aqsa" },
    "jerusalem-shown": { focus: "makkah" }
  }
};

const HIJRAH: SeerahJourney = {
  branchId: "seerah-hijrah",
  unitKey: "seerah-hijrah",
  era: "madinah",
  age: 53,
  scenes: [
    {
      id: "hijrah-cave",
      level: "makkah",
      box: { north: 21.45, south: 21.36, west: 39.79, east: 39.9 },
      places: ["makkah", "aqabah", "thawr"],
      legs: [{ kind: "his", path: ["makkah", [21.405, 39.836], [21.39, 39.844], "thawr"] }],
      notes: [{ at: "thawr", text: "Three nights" }],
      caption: "He ﷺ and Abu Bakr stayed three nights in a cave on Mount Thawr.",
      sources: [bukhari("3905")]
    },
    {
      id: "hijrah-road",
      level: "hijaz",
      box: { north: 24.56, south: 21.3, west: 38.85, east: 40.0 },
      places: ["makkah", "madinah"],
      legs: [
        {
          kind: "his",
          path: ["thawr", [21.36, 39.62], [21.55, 39.32], [22.0, 39.22], [22.5, 39.17], [22.9, 39.19], [23.3, 39.28], [23.75, 39.4], [24.15, 39.53], "quba", "madinah"]
        }
      ],
      notes: [{ leg: 0, text: "About {km} km apart", distance: true }],
      caption: "Then a guide led them along the coast road, to Quba and on to Madinah.",
      sources: [bukhari("3905"), bukhari("3906")]
    },
    {
      id: "hijrah-quba",
      level: "madinah",
      box: { north: 24.49, south: 24.425, west: 39.58, east: 39.65 },
      places: ["quba", "madinah"],
      legs: [{ kind: "his", path: [[24.418, 39.622], "quba", [24.452, 39.616], "madinah"] }],
      caption: "He ﷺ stopped at Quba and built its mosque, then rode on into Madinah.",
      sources: [bukhari("3906")]
    }
  ],
  lessons: {
    aqabah: { scene: 0, focus: "aqabah", era: "makkah", age: undefined },
    plot: { scene: 0, focus: "makkah", era: "makkah", age: undefined },
    "shows-way": { scene: 1 },
    quba: { scene: 2, focus: "quba" },
    masjid: { scene: 2, focus: "madinah" },
    "first-words": { scene: 2, focus: "madinah" },
    "ibn-salam": { scene: 2, focus: "madinah" },
    calendar: { scene: 2, focus: "madinah" }
  }
};

const BADR: SeerahJourney = {
  branchId: "seerah-badr",
  unitKey: "seerah-badr",
  era: "madinah",
  scenes: [
    {
      id: "badr-march",
      level: "hijaz",
      box: { north: 24.6, south: 23.5, west: 38.45, east: 39.75 },
      places: ["madinah", "badr"],
      legs: [{ kind: "his", path: ["madinah", [24.3, 39.4], [24.02, 39.08], "badr"] }],
      caption: "At Badr the believers were few, and Allah gave them victory.",
      sources: [quran(3, 123)]
    },
    {
      id: "badr-valley",
      level: "valley",
      box: { north: 23.83, south: 23.725, west: 38.72, east: 38.86 },
      places: ["badr"],
      legs: [{ kind: "army", label: "The caravan", path: [[23.845, 38.735], [23.79, 38.738], [23.74, 38.745], [23.7, 38.75]] }],
      effects: [
        { kind: "tents", at: [23.8, 38.81], label: "The believers' camp" },
        { kind: "tents", at: [23.752, 38.795], label: "Quraysh's camp" },
        { kind: "rain", at: [23.8, 38.81], lessons: ["calm"], source: quran(8, 11) }
      ],
      caption: "You were on the near side of the valley, they on the far side, and the caravan lower down.",
      sources: [quran(8, 42)]
    }
  ],
  lessons: {
    few: { scene: 0, focus: "badr" },
    talut: { scene: 0, focus: "badr" },
    calm: { scene: 1 },
    thousand: { scene: 1 },
    "jibril-badr": { scene: 1 },
    "allah-threw": { scene: 1 },
    "people-of-badr": { scene: 0, focus: "badr" }
  }
};

const UHUD: SeerahJourney = {
  branchId: "seerah-uhud",
  unitKey: "seerah-uhud",
  era: "madinah",
  scenes: [
    {
      id: "uhud",
      level: "madinah",
      box: { north: 24.525, south: 24.445, west: 39.575, east: 39.66 },
      places: ["madinah", "uhud", "archers"],
      legs: [{ kind: "his", path: ["madinah", [24.482, 39.613], [24.496, 39.617], [24.5065, 39.6165]] }],
      caption: "Uhud is just north of Madinah. Fifty archers were told: stay in your place.",
      sources: [bukhari("3039")]
    }
  ],
  lessons: {
    archers: { focus: "archers" },
    "they-left": { focus: "archers" },
    wounded: { focus: "uhud" },
    "smell-jannah": { focus: "uhud" },
    "do-not-weaken": { focus: "uhud" },
    "loves-us": { focus: "uhud" }
  }
};

const TRENCH: SeerahJourney = {
  branchId: "seerah-trench",
  unitKey: "seerah-khandaq",
  era: "madinah",
  scenes: [
    {
      id: "trench",
      level: "madinah",
      box: { north: 24.528, south: 24.445, west: 39.56, east: 39.665 },
      places: ["madinah", "uhud"],
      legs: [{ kind: "trench", path: [[24.476, 39.574], [24.479, 39.587], [24.482, 39.6], [24.485, 39.612], [24.4865, 39.625]] }],
      effects: [
        { kind: "tents", at: [24.497, 39.585], label: "The armies" },
        { kind: "tents", at: [24.5, 39.643] },
        { kind: "wind", at: [24.499, 39.612], lessons: ["wind"] }
      ],
      caption: "They dug a trench to guard Madinah when the armies came.",
      sources: [bukhari("4099"), quran(33, 9)]
    }
  ],
  lessons: {
    digging: { focus: "madinah" },
    rock: { focus: "madinah" },
    wind: { focus: "madinah" },
    "from-above": { focus: "madinah" },
    promised: { focus: "madinah" },
    turn: { focus: "madinah" }
  }
};

const HUDAYBIYAH: SeerahJourney = {
  branchId: "seerah-hudaybiyah",
  unitKey: "seerah-hudaybiyah",
  era: "madinah",
  scenes: [
    {
      id: "hudaybiyah",
      level: "hijaz",
      box: { north: 24.56, south: 21.3, west: 38.9, east: 40.05 },
      places: ["madinah", "hudaybiyah", "makkah"],
      labels: { makkah: "right" },
      legs: [
        { kind: "his", path: ["madinah", "dhulhulayfah", ...INLAND_ROAD, [21.75, 39.47], "hudaybiyah"] },
        { kind: "home", path: ["hudaybiyah", [21.75, 39.47], ...reversed(INLAND_ROAD), "dhulhulayfah", "madinah"] }
      ],
      notes: [
        { at: "dhulhulayfah", text: "Ihram for Umrah", side: "left" },
        { at: "hudaybiyah", text: "Stopped here" }
      ],
      caption: "On the way to Umrah they were stopped at Hudaybiyah, near Makkah, and went home.",
      sources: [bukhari("1694"), bukhari("1778")]
    },
    {
      id: "letters",
      level: "arabia",
      box: { north: 32.3, south: 19.6, west: 33.0, east: 42.0 },
      places: ["madinah"],
      legs: [
        { kind: "letter", label: "To Caesar", path: ["madinah", [26.8, 37.9], [29.6, 35.9], [32.6, 34.9]] },
        { kind: "letter", label: "To Chosroes", path: ["madinah", [26.4, 40.4], [29.0, 41.3], [31.4, 42.4]] },
        { kind: "letter", label: "To the Negus", path: ["madinah", [22.8, 39.1], [21.2, 38.2], [19.4, 37.95]] }
      ],
      caption: "He ﷺ wrote to Chosroes, Caesar and the Negus, calling them to Allah.",
      sources: [muslim("1774a")]
    }
  ],
  lessons: {
    "fourteen-hundred": { scene: 0 },
    fingers: { scene: 0, focus: "hudaybiyah" },
    tree: { scene: 0, focus: "hudaybiyah" },
    "umar-asks": { scene: 0, focus: "hudaybiyah" },
    "clear-victory": { scene: 0 },
    "real-victory": { scene: 0, focus: "hudaybiyah" },
    seal: { scene: 1, focus: "madinah" }
  }
};

const KHAYBAR: SeerahJourney = {
  branchId: "seerah-khaybar",
  unitKey: "seerah-khaybar",
  era: "madinah",
  scenes: [
    {
      id: "khaybar",
      level: "hijaz",
      box: { north: 25.9, south: 24.3, west: 37.7, east: 39.85 },
      places: ["madinah", "khaybar"],
      legs: [
        { kind: "his", path: ["madinah", [24.9, 39.47], [25.35, 39.37], "khaybar"] },
        { kind: "sea", label: "From Abyssinia", path: [[24.2, 36.95], [24.42, 37.38], [24.6, 37.62]], lessons: ["two-hijrahs"], source: bukhari("4230") },
        { kind: "army", path: [[24.6, 37.62], [25.0, 38.4], "khaybar"], lessons: ["two-hijrahs"], source: bukhari("4230") }
      ],
      caption: "He ﷺ marched north to Khaybar and reached it at night.",
      sources: [bukhari("4197")]
    }
  ],
  lessons: {
    "the-march": {},
    "waiting-for-morning": { focus: "khaybar" },
    "the-flag": { focus: "khaybar" },
    "red-camels": { focus: "khaybar" },
    "two-hijrahs": { focus: "khaybar" },
    "the-farms": { focus: "khaybar" },
    "the-stolen-sheet": { focus: "khaybar" },
    "donkey-meat": { focus: "khaybar" },
    "the-poison": { focus: "khaybar" }
  }
};

const MUTAH: SeerahJourney = {
  branchId: "seerah-mutah",
  unitKey: "seerah-mutah",
  era: "madinah",
  scenes: [
    {
      id: "mutah",
      level: "arabia",
      box: { north: 31.5, south: 24.0, west: 34.6, east: 40.4 },
      places: ["madinah", "mutah"],
      legs: [{ kind: "army", label: "The army", path: ["madinah", [25.3, 38.95], [26.6, 37.95], [28.3, 36.65], [29.6, 35.9], [30.4, 35.76], "mutah"] }],
      effects: [{ kind: "ripple", at: "madinah", lessons: ["news-before-news", "sword-of-allah"] }],
      notes: [{ leg: 0, text: "About {km} km apart", distance: true }],
      caption: "The army went north to Mu'tah. In Madinah, he ﷺ told the news before any rider came.",
      sources: [bukhari("4262")]
    }
  ],
  lessons: {
    "three-leaders": { focus: "madinah" },
    "ninety-wounds": { focus: "mutah" },
    "news-before-news": { focus: "madinah" },
    "sword-of-allah": { focus: "mutah" },
    "nine-swords": { focus: "mutah" },
    "two-wings": { focus: "mutah" },
    "food-for-the-family": { focus: "madinah" }
  }
};

const CONQUEST: SeerahJourney = {
  branchId: "seerah-conquest",
  unitKey: "seerah-fath",
  era: "madinah",
  scenes: [
    {
      id: "conquest-road",
      level: "hijaz",
      box: { north: 24.56, south: 21.3, west: 38.9, east: 40.05 },
      places: ["madinah", "makkah"],
      legs: [{ kind: "his", path: ["madinah", ...INLAND_ROAD, "kadid", [21.85, 39.46], "marr", "makkah"] }],
      notes: [{ leg: 0, text: "About {km} km apart", distance: true }],
      caption: "In Ramadan, ten thousand set out from Madinah for Makkah.",
      sources: [bukhari("4276")]
    },
    {
      id: "conquest-camp",
      level: "makkah",
      box: { north: 22.22, south: 21.36, west: 39.2, east: 39.92 },
      places: ["kadid", "marr", "makkah"],
      labels: { makkah: "right" },
      legs: [{ kind: "his", path: [[22.3, 39.36], "kadid", [21.85, 39.46], "marr"] }],
      effects: [{ kind: "fires", at: "marr" }],
      notes: [
        { at: "kadid", text: "Broke the fast", side: "right" },
        { at: "marr", text: "Fires like Arafah's", side: "top" }
      ],
      caption: "They broke the fast at Al-Kadid, then camped at Marr az-Zahran, and their many fires were seen.",
      sources: [bukhari("4276"), bukhari("4280")]
    },
    {
      id: "conquest-makkah",
      level: "makkah",
      box: { north: 21.48, south: 21.385, west: 39.775, east: 39.885 },
      places: ["makkah"],
      legs: [{ kind: "his", path: [[21.478, 39.836], [21.455, 39.832], [21.437, 39.828], "makkah"] }],
      notes: [{ at: "makkah", text: "360 idols", lessons: ["idols"], source: bukhari("4287") }],
      caption: "He ﷺ entered Makkah from Kada, its upper part.",
      sources: [bukhari("4290")]
    }
  ],
  lessons: {
    "ten-thousand": { scene: 0, focus: "madinah" },
    reciting: { scene: 2, focus: "makkah" },
    idols: { scene: 2, focus: "makkah" },
    safe: { scene: 2, focus: "makkah" },
    nasr: { scene: 0 }
  }
};

const HUNAYN: SeerahJourney = {
  branchId: "seerah-hunayn",
  unitKey: "seerah-hunayn",
  era: "madinah",
  scenes: [
    {
      id: "hunayn",
      level: "makkah",
      box: { north: 21.66, south: 21.23, west: 39.78, east: 40.47 },
      places: ["makkah", "hunayn", "taif", "jiranah"],
      legs: [
        { kind: "his", path: ["makkah", [21.46, 39.93], "hunayn", [21.42, 40.25], "taif"] },
        { kind: "his", path: ["taif", [21.47, 40.27], [21.56, 40.08], "jiranah"] },
        { kind: "his", path: ["jiranah", [21.5, 39.89], "makkah"] }
      ],
      notes: [{ at: "jiranah", text: "Umrah from here" }],
      caption: "From Hunayn to the siege of Ta'if, then Umrah from Al-Ji'ranah.",
      sources: [bukhari("4325"), bukhari("1778")]
    }
  ],
  lessons: {
    "proud-of-numbers": { focus: "hunayn" },
    "standing-firm": { focus: "hunayn" },
    labbayk: { focus: "hunayn" },
    "calm-sent-down": { focus: "hunayn" },
    "siege-of-taif": { focus: "taif" },
    "the-ansar": { focus: "jiranah" },
    "like-musa": { focus: "jiranah" },
    "hawazin-returned": { focus: "jiranah" },
    "umrah-jiranah": { focus: "jiranah" }
  }
};

const TABUK: SeerahJourney = {
  branchId: "seerah-tabuk",
  unitKey: "seerah-tabuk",
  era: "madinah",
  scenes: [
    {
      id: "tabuk",
      level: "arabia",
      box: { north: 28.75, south: 24.1, west: 35.9, east: 40.1 },
      places: ["madinah", "hijr", "tabuk"],
      legs: [
        { kind: "his", path: ["madinah", [25.2, 39.02], [25.95, 38.45], "hijr", [27.4, 37.45], "tabuk"] },
        { kind: "home", path: ["tabuk", [27.4, 37.45], "hijr", [25.95, 38.45], [25.2, 39.02], "madinah"] }
      ],
      effects: [{ kind: "wind", at: "tabuk", lessons: ["the-wind"], source: bukhari("1481") }],
      notes: [{ leg: 0, text: "About {km} km apart", distance: true }],
      caption: "In severe heat, a long journey through the desert, north to Tabuk.",
      sources: [bukhari("4418")]
    }
  ],
  lessons: {
    "go-forth": { focus: "madinah" },
    "army-of-hardship": { focus: "madinah" },
    "tears-of-the-poor": { focus: "madinah" },
    "like-harun": { focus: "madinah" },
    "al-hijr": { focus: "hijr" },
    "the-camel-well": { focus: "hijr" },
    "the-wind": { focus: "tabuk" },
    "held-back-by-excuse": { focus: "madinah" },
    "the-three": { focus: "madinah" }
  }
};

const FAREWELL: SeerahJourney = {
  branchId: "seerah-farewell",
  unitKey: "seerah-wada",
  era: "madinah",
  scenes: [
    {
      id: "farewell-road",
      level: "hijaz",
      box: { north: 24.56, south: 21.3, west: 38.9, east: 40.05 },
      places: ["madinah", "makkah"],
      labels: { makkah: "right" },
      legs: [
        { kind: "his", path: ["madinah", "dhulhulayfah", ...INLAND_ROAD, [21.7, 39.62], "makkah"] },
        { kind: "home", path: ["makkah", [21.7, 39.62], ...reversed(INLAND_ROAD), "dhulhulayfah", "madinah"] }
      ],
      caption: "His one Hajj after the Hijrah: from Madinah to Makkah, and home.",
      sources: [bukhari("4404")]
    },
    {
      id: "farewell-hajj",
      level: "makkah",
      box: { north: 21.44, south: 21.335, west: 39.805, east: 40.005 },
      places: ["makkah", "mina", "muzdalifah", "arafah"],
      legs: [
        { kind: "his", path: ["makkah", [21.418, 39.85], "mina", [21.395, 39.925], [21.372, 39.958], "arafah"] },
        { kind: "home", path: ["arafah", [21.37, 39.962], "muzdalifah", [21.405, 39.915], "mina"] }
      ],
      notes: [{ at: "arafah", text: "Friday", lessons: ["perfected"], source: bukhari("45") }],
      caption: "Mina, then Arafah, then Muzdalifah, and back to Mina.",
      sources: [muslim("1218a")]
    }
  ],
  lessons: {
    sacred: { scene: 1, focus: "mina" },
    convey: { scene: 1, focus: "mina" },
    book: { scene: 1, focus: "arafah" },
    perfected: { scene: 1, focus: "arafah" },
    "abu-bakr-leads": { scene: 0, focus: "madinah" },
    "last-look": { scene: 0, focus: "madinah", age: 63 },
    "highest-companion": { scene: 0, focus: "madinah", age: 63 },
    "sixty-three": { scene: 0, focus: "madinah", age: 63 }
  }
};

/** The Seerah units in the order of his life ﷺ; the unit on his character has no map. */
export const SEERAH_JOURNEYS: readonly SeerahJourney[] = [
  EARLY,
  REVELATION,
  MAKKAH_CALL,
  TAIF,
  ISRA,
  HIJRAH,
  BADR,
  UHUD,
  TRENCH,
  HUDAYBIYAH,
  KHAYBAR,
  MUTAH,
  CONQUEST,
  HUNAYN,
  TABUK,
  FAREWELL
];

/** His life ﷺ in three parts: 40 years before revelation, 13 in Makkah, 10 in Madinah, 63 in all. */
export const LIFE_ERAS: readonly { id: LifeEra; label: string; years: number; from: number }[] = [
  { id: "before", label: "Before revelation", years: 40, from: 0 },
  { id: "makkah", label: "In Makkah", years: 13, from: 40 },
  { id: "madinah", label: "In Madinah", years: 10, from: 53 }
];
export const LIFE_YEARS = 63;
export const LIFE_SOURCE = bukhari("3902");

export type LessonJourney = {
  journey: SeerahJourney;
  scene: MapScene;
  sceneIndex: number;
  lessonSlug?: string;
  focus?: string;
  era: LifeEra;
  age?: number;
};

const BY_BRANCH = new Map(SEERAH_JOURNEYS.map((journey) => [journey.branchId, journey]));

/**
 * The map a lesson opens on: its unit's journey, the scene the lesson is in and the place it is about. Reviews and the
 * final quiz show the unit's first scene. Undefined for every lesson outside the Seerah's journeys.
 */
export function journeyForLesson(lesson: { nodeId: string; branchId?: string }): LessonJourney | undefined {
  const journey = (lesson.branchId ? BY_BRANCH.get(lesson.branchId) : undefined) ?? SEERAH_JOURNEYS.find((each) => lesson.nodeId.startsWith(`deep-${each.unitKey}-`));
  if (!journey) return undefined;
  const prefix = `deep-${journey.unitKey}-`;
  const slug = lesson.nodeId.startsWith(prefix) ? lesson.nodeId.slice(prefix.length) : undefined;
  const own = slug ? journey.lessons[slug] : undefined;
  const sceneIndex = Math.min(own?.scene ?? 0, journey.scenes.length - 1);
  return {
    journey,
    scene: journey.scenes[sceneIndex],
    sceneIndex,
    lessonSlug: slug,
    focus: own?.focus,
    era: own?.era ?? journey.era,
    // A lesson the map does not know yet gets its unit's first map and era, but never an age it was not checked for.
    age: own ? ("age" in own ? own.age : journey.age) : undefined
  };
}

/** Is this leg, effect or note shown for this lesson? Untagged ones always; tagged ones only on their lessons. */
export function shownFor(item: { lessons?: string[] }, lessonSlug?: string) {
  return !item.lessons || (lessonSlug !== undefined && item.lessons.includes(lessonSlug));
}

/** The sources under a lesson's map: its scene's, then those of the lesson's own roads, notes and touches. */
export function sourcesFor(scene: MapScene, lessonSlug?: string): MapSource[] {
  const own = [...scene.legs, ...(scene.effects ?? []), ...(scene.notes ?? [])].filter((item) => item.source && shownFor(item, lessonSlug)).map((item) => item.source!);
  const seen = new Set<string>();
  return [...scene.sources, ...own].filter((source) => !seen.has(source.reference) && Boolean(seen.add(source.reference)));
}

/** Every English word the map can show, for the translation catalogs. */
export function seerahMapText(): string[] {
  const text = new Set<string>();
  Object.values(MAP_PLACES).forEach((place) => text.add(place.name));
  SEA_LABELS.forEach((sea) => text.add(sea.name));
  LIFE_ERAS.forEach((era) => text.add(era.label));
  text.add(LIFE_SOURCE.reference);
  for (const journey of SEERAH_JOURNEYS) {
    for (const scene of journey.scenes) {
      text.add(scene.caption);
      [...scene.sources, ...scene.legs, ...(scene.effects ?? []), ...(scene.notes ?? [])].forEach((item) => {
        const source = "reference" in item ? item : item.source;
        if (source) text.add(source.reference);
      });
      scene.legs.forEach((leg) => leg.label && text.add(leg.label));
      scene.effects?.forEach((effect) => effect.label && text.add(effect.label));
      scene.notes?.forEach((note) => text.add(note.text));
    }
  }
  return [...text];
}
