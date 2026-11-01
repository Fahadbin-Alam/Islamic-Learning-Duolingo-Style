import type { DeepUnit } from "../deepKit";
import { IMRAN_UNITS } from "./imranUnits";
import { NISA_UNITS } from "./nisaUnits";

// The surahs after Al-Baqarah taught ayah by ayah, in mushaf order (Al-Baqarah itself is in ../baqarahUnits.ts).
export const SURAH_DEPTH_UNITS: readonly DeepUnit[] = [...IMRAN_UNITS, ...NISA_UNITS];
