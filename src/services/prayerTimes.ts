import { CalculationMethod, Coordinates, HighLatitudeRule, Madhab, PrayerTimes, type CalculationParameters } from "adhan";
import type { PrayerCity } from "../data/prayerCities";

// Prayer times worked out on the phone from the city the learner picks: no location permission,
// nothing leaves the device. The lesson nudges built on them are in prayerNudgePlan.ts.

export type PrayerName = "fajr" | "dhuhr" | "asr" | "maghrib" | "isha";
export type AsrMethod = "standard" | "hanafi";

export interface PrayerNudgePrefs {
  enabled: boolean;
  cityId?: string;
  /** Unset: the usual one where the city is. */
  asr?: AsrMethod;
  prayers: Record<PrayerName, boolean>;
}

export const PRAYERS: PrayerName[] = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
export const PRAYER_LABELS: Record<PrayerName, string> = {
  fajr: "Fajr",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha"
};

export function defaultPrayerNudgePrefs(): PrayerNudgePrefs {
  return { enabled: false, prayers: { fajr: true, dhuhr: true, asr: true, maghrib: true, isha: true } };
}

// Where Hanafi Asr is what most masjids use, it is the starting choice; the learner can switch.
const HANAFI_COUNTRIES = new Set(["BD", "PK", "IN", "AF"]);

export function defaultAsrMethod(city: PrayerCity | undefined): AsrMethod {
  return city && HANAFI_COUNTRIES.has(city.country) ? "hanafi" : "standard";
}

/** The calculation most used in the city's country. */
function methodFor(country: string): CalculationParameters {
  switch (country) {
    case "BD":
    case "PK":
    case "IN":
    case "AF":
      return CalculationMethod.Karachi();
    case "SA":
      return CalculationMethod.UmmAlQura();
    case "AE":
      return CalculationMethod.Dubai();
    case "QA":
      return CalculationMethod.Qatar();
    case "KW":
      return CalculationMethod.Kuwait();
    case "EG":
    case "JO":
    case "PS":
    case "IQ":
    case "SY":
    case "LB":
    case "SO":
      return CalculationMethod.Egyptian();
    case "TR":
      return CalculationMethod.Turkey();
    case "MY":
    case "ID":
    case "SG":
      return CalculationMethod.Singapore();
    case "US":
    case "CA":
      return CalculationMethod.NorthAmerica();
    case "GB":
      return CalculationMethod.MoonsightingCommittee();
    default:
      return CalculationMethod.MuslimWorldLeague();
  }
}

/** The five prayer times on the phone's calendar day of `day`. */
export function getPrayerTimes(city: PrayerCity, day: Date, asr: AsrMethod = defaultAsrMethod(city)): Record<PrayerName, Date> {
  const coordinates = new Coordinates(city.lat, city.lon);
  const params = methodFor(city.country);
  params.madhab = asr === "hanafi" ? Madhab.Hanafi : Madhab.Shafi;
  if (Math.abs(city.lat) > 48) {
    params.highLatitudeRule = HighLatitudeRule.recommended(coordinates);
  }
  const times = new PrayerTimes(coordinates, day, params);
  return { fajr: times.fajr, dhuhr: times.dhuhr, asr: times.asr, maghrib: times.maghrib, isha: times.isha };
}

/** "5:42 AM" style, the way the sheet lists today's times. */
export function formatPrayerClock(date: Date) {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return { clock: `${hours % 12 === 0 ? 12 : hours % 12}:${minutes}`, half: hours < 12 ? ("AM" as const) : ("PM" as const) };
}
