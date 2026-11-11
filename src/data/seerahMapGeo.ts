/**
 * The land the Seerah map is drawn on (src/ui/journey): western Arabia, the Red Sea, Sinai and the land of Sham, as
 * [latitude, longitude] points. Coasts, the big lava fields (harrat), the mountains, the sand sea in the north and the
 * green oases are traced by hand from ordinary maps, close enough for a picture map: the places on it (seerahMap.ts)
 * sit at their real positions, so the roads between them show the real distances. Only land and water: no people.
 */

export type LatLon = readonly [number, number];

/** The Red Sea with its two gulfs, Aqaba and Suez, from the Arabian shore round to the African one. */
export const RED_SEA: LatLon[] = [
  // The Arabian shore, south to north.
  [18.4, 41.75],
  [19.13, 41.08],
  [19.7, 40.62],
  [20.15, 40.27],
  [20.45, 39.98],
  [20.85, 39.55],
  [21.1, 39.25],
  [21.5, 39.12],
  [21.8, 39.06],
  [22.28, 39.08],
  [22.42, 39.06],
  [22.8, 38.99],
  [23.1, 38.8],
  [23.57, 38.57],
  [23.85, 38.3],
  [24.08, 38.04],
  [24.5, 37.7],
  [25.03, 37.24],
  [25.6, 36.85],
  [26.23, 36.44],
  [26.8, 36.0],
  [27.35, 35.67],
  [27.7, 35.4],
  [28.0, 35.18],
  [28.05, 34.95],
  [28.35, 34.76],
  [28.75, 34.8],
  [29.1, 34.88],
  [29.29, 34.94],
  [29.53, 35.0],
  // The head of the Gulf of Aqaba, then down the Sinai shore.
  [29.52, 34.93],
  [29.25, 34.75],
  [28.97, 34.66],
  [28.7, 34.6],
  [28.5, 34.52],
  [28.2, 34.42],
  [27.9, 34.32],
  [27.73, 34.25],
  // Up the Gulf of Suez on the Sinai side, and down its African side.
  [28.0, 33.85],
  [28.24, 33.62],
  [28.7, 33.25],
  [29.05, 33.1],
  [29.59, 32.71],
  [29.85, 32.6],
  [29.97, 32.55],
  [29.85, 32.42],
  [29.6, 32.35],
  [29.12, 32.65],
  [28.36, 33.08],
  [27.8, 33.55],
  [27.25, 33.82],
  [26.73, 33.94],
  [26.1, 34.28],
  [25.6, 34.6],
  [25.07, 34.9],
  [24.4, 35.2],
  [23.95, 35.48],
  [23.92, 35.8],
  [23.62, 35.55],
  [23.0, 35.75],
  [22.22, 36.64],
  [21.5, 36.9],
  [20.5, 37.2],
  [19.6, 37.22],
  [18.4, 37.4]
];

/** The Mediterranean, from the north edge down the shore of Sham to the Nile's mouths. */
export const MEDITERRANEAN: LatLon[] = [
  [35.5, 28.0],
  [35.5, 35.95],
  [34.4, 35.85],
  [33.9, 35.48],
  [33.56, 35.36],
  [33.27, 35.19],
  [32.93, 35.07],
  [32.83, 34.96],
  [32.69, 34.94],
  [32.44, 34.88],
  [32.16, 34.79],
  [32.05, 34.75],
  [31.8, 34.63],
  [31.67, 34.55],
  [31.52, 34.43],
  [31.32, 34.23],
  [31.13, 33.8],
  [31.16, 33.3],
  [31.08, 33.05],
  [31.27, 32.31],
  [31.48, 31.82],
  [31.55, 31.3],
  [31.35, 30.4],
  [31.2, 29.9],
  [30.9, 29.2],
  [30.8, 28.0]
];

/** The Dead Sea, down from the Jordan's mouth. */
export const DEAD_SEA: LatLon[] = [
  [31.77, 35.47],
  [31.76, 35.58],
  [31.55, 35.6],
  [31.35, 35.58],
  [31.2, 35.55],
  [31.06, 35.48],
  [31.05, 35.4],
  [31.2, 35.4],
  [31.4, 35.42],
  [31.6, 35.45]
];

export const GALILEE: LatLon[] = [
  [32.89, 35.53],
  [32.88, 35.64],
  [32.8, 35.65],
  [32.71, 35.59],
  [32.75, 35.53]
];

/** The Jordan, from the lake of Galilee down to the Dead Sea. */
export const JORDAN_RIVER: LatLon[] = [
  [32.71, 35.57],
  [32.5, 35.56],
  [32.3, 35.55],
  [32.1, 35.53],
  [31.9, 35.54],
  [31.77, 35.53]
];

/** Every body of water, for the shore lines and the waves. */
export const WATERS: LatLon[][] = [RED_SEA, MEDITERRANEAN, DEAD_SEA, GALILEE];

/**
 * The mountain chains as a middle line and a half width (degrees): the Hijaz and Sarawat range along the Red Sea,
 * running on north into the mountains east of the Gulf of Aqaba and the Dead Sea, and the mountains of Sinai.
 */
export const MOUNTAIN_CHAINS: { line: LatLon[]; half: number }[] = [
  {
    half: 0.3,
    line: [
      [18.4, 42.6],
      [19.2, 41.95],
      [20.0, 41.45],
      [20.8, 40.8],
      [21.42, 40.26],
      [22.0, 40.04],
      [22.8, 39.74],
      [23.5, 39.32],
      [24.2, 38.86],
      [25.0, 38.22],
      [25.8, 37.62],
      [26.6, 37.02],
      [27.4, 36.38],
      [28.2, 35.66],
      [28.9, 35.32],
      [29.6, 35.36],
      [30.3, 35.56],
      [31.0, 35.7],
      [31.5, 35.76]
    ]
  },
  {
    half: 0.32,
    line: [
      [28.0, 34.05],
      [28.55, 33.9],
      [29.05, 33.75]
    ]
  }
];

/** The big lava fields: dark, rough land (harrah) south and north of Madinah and west of al-Ula. */
export const LAVA_FIELDS: LatLon[][] = [
  // Harrat Rahat, from Madinah far to the south.
  [
    [24.38, 39.66],
    [24.3, 39.98],
    [23.6, 40.26],
    [22.8, 40.3],
    [22.2, 40.14],
    [22.06, 39.94],
    [22.5, 39.66],
    [23.3, 39.56],
    [24.0, 39.55]
  ],
  // Harrat Khaybar.
  [
    [24.95, 39.55],
    [25.15, 40.4],
    [25.9, 40.7],
    [26.25, 40.25],
    [25.9, 39.65],
    [25.42, 39.4]
  ],
  // Harrat Uwayrid.
  [
    [26.4, 37.35],
    [26.9, 37.25],
    [27.4, 37.55],
    [27.2, 38.05],
    [26.75, 37.82],
    [26.45, 37.68]
  ]
];

/** The great sand sea of the north (an-Nafud): dunes. */
export const SAND_SEA: LatLon[] = [
  [27.6, 39.6],
  [28.4, 39.1],
  [29.4, 39.6],
  [29.8, 41.0],
  [29.3, 42.6],
  [27.9, 42.6],
  [27.5, 41.0]
];

/** Green oases and gardens: date palms and fields, radius in km. */
export const OASES: { at: LatLon; km: number }[] = [
  { at: [24.462, 39.61], km: 5 },
  { at: [24.44, 39.63], km: 3 },
  { at: [25.69, 39.3], km: 5 },
  { at: [21.27, 40.41], km: 5 },
  { at: [28.39, 36.57], km: 5 },
  { at: [26.66, 37.92], km: 6 },
  { at: [23.78, 38.79], km: 2.5 },
  { at: [21.62, 39.7], km: 3 },
  { at: [31.78, 35.22], km: 7 },
  { at: [31.08, 35.7], km: 4 }
];

// ---------- Close up: around Makkah ----------

/**
 * Makkah lies in a dry valley ringed by bare mountains. The open ground where nothing is drawn on (valleys, the
 * plains of Mina, Muzdalifah and Arafah, the wadis) as circles [lat, lon, km]: the hills around Makkah keep off it.
 */
export const MAKKAH_OPEN: [number, number, number][] = [
  [21.4225, 39.8262, 1.6],
  [21.418, 39.845, 1.0],
  [21.414, 39.866, 1.0],
  [21.4133, 39.8933, 1.3],
  [21.4, 39.915, 1.2],
  [21.389, 39.937, 1.5],
  [21.372, 39.958, 1.5],
  [21.355, 39.984, 3.2],
  [21.6, 39.65, 3.0],
  [21.617, 39.698, 2.6],
  [21.6, 39.76, 2.2],
  [21.4447, 39.6106, 3.0],
  [21.5622, 39.955, 2.0],
  [21.52, 40.04, 2.5],
  [21.27, 40.41, 6.0],
  [21.63, 40.42, 2.5],
  [21.44, 39.79, 1.4],
  [21.47, 39.83, 1.0]
];

// ---------- Close up: around Madinah ----------

/** Mount Uhud, north of Madinah: a long red ridge. */
export const UHUD_RIDGE: LatLon[] = [
  [24.506, 39.582],
  [24.514, 39.598],
  [24.523, 39.612],
  [24.521, 39.628],
  [24.514, 39.642],
  [24.506, 39.652],
  [24.501, 39.64],
  [24.505, 39.622],
  [24.507, 39.606],
  [24.503, 39.592]
];

/** The two lava fields that guard Madinah to the east (Waqim) and west (al-Wabrah). */
export const MADINAH_LAVA: LatLon[][] = [
  [
    [24.5, 39.628],
    [24.49, 39.66],
    [24.46, 39.7],
    [24.4, 39.71],
    [24.37, 39.66],
    [24.41, 39.635],
    [24.45, 39.628],
    [24.475, 39.632]
  ],
  [
    [24.505, 39.548],
    [24.48, 39.575],
    [24.45, 39.578],
    [24.42, 39.567],
    [24.39, 39.548],
    [24.4, 39.5],
    [24.47, 39.49],
    [24.51, 39.51]
  ]
];

/** Small hills near Madinah [lat, lon, km across]: Sal' by the trench, Ayr to the south. */
export const MADINAH_HILLS: [number, number, number][] = [
  [24.48, 39.594, 1.0],
  [24.384, 39.583, 1.6],
  [24.396, 39.6, 0.9],
  [24.53, 39.575, 0.9],
  [24.534, 39.66, 1.1]
];

/** Palm groves round Madinah [lat, lon, km]: the city's own, Quba to the south, the high groves (al-Awali). */
export const MADINAH_GROVES: [number, number, number][] = [
  [24.462, 39.6, 1.2],
  [24.455, 39.62, 1.1],
  [24.44, 39.617, 1.3],
  [24.432, 39.632, 1.0],
  [24.448, 39.64, 0.9],
  [24.475, 39.615, 0.7],
  [24.49, 39.62, 0.6]
];
