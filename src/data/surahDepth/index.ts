import type { DeepUnit } from "../deepKit";
import { IMRAN_UNITS } from "./imranUnits";
import { NISA_UNITS } from "./nisaUnits";
import { MAIDAH_UNITS } from "./maidahUnits";
import { ANAM_UNITS } from "./anamUnits";
import { ARAF_UNITS } from "./arafUnits";

// The surahs after Al-Baqarah taught ayah by ayah, in mushaf order (Al-Baqarah itself is in ../baqarahUnits.ts).
export const SURAH_DEPTH_UNITS: readonly DeepUnit[] = [...IMRAN_UNITS, ...NISA_UNITS, ...MAIDAH_UNITS, ...ANAM_UNITS, ...ARAF_UNITS];
