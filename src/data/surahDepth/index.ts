import type { DeepUnit } from "../deepKit";
import { IMRAN_UNITS } from "./imranUnits";
import { NISA_UNITS } from "./nisaUnits";
import { MAIDAH_UNITS } from "./maidahUnits";
import { ANAM_UNITS } from "./anamUnits";
import { ARAF_UNITS } from "./arafUnits";
import { ANFAL_UNITS } from "./anfalUnits";
import { TAWBAH_UNITS } from "./tawbahUnits";
import { YUNUS_UNITS } from "./yunusUnits";
import { HUD_UNITS } from "./hudUnits";
import { YUSUF_UNITS } from "./yusufUnits";
import { RAAD_UNITS } from "./raadUnits";
import { IBRAHIM_UNITS } from "./ibrahimUnits";
import { HIJR_UNITS } from "./hijrUnits";
import { NAHL_UNITS } from "./nahlUnits";
import { ISRA_UNITS } from "./israUnits";

// The surahs after Al-Baqarah taught ayah by ayah, in mushaf order (Al-Baqarah itself is in ../baqarahUnits.ts).
export const SURAH_DEPTH_UNITS: readonly DeepUnit[] = [...IMRAN_UNITS, ...NISA_UNITS, ...MAIDAH_UNITS, ...ANAM_UNITS, ...ARAF_UNITS, ...ANFAL_UNITS, ...TAWBAH_UNITS, ...YUNUS_UNITS, ...HUD_UNITS, ...YUSUF_UNITS, ...RAAD_UNITS, ...IBRAHIM_UNITS, ...HIJR_UNITS, ...NAHL_UNITS, ...ISRA_UNITS];
