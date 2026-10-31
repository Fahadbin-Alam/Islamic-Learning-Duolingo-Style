import { t } from "../i18n";
import type { SupportedLanguage } from "../types";
import { DAILY_AYAHS, DAILY_HADITH } from "./dailyCard";

/**
 * What the home-screen widgets show: the daily card's ayahs and hadith in every language, written to
 * widgets/daily.json (Android) and targets/daily-widget/DailyData.swift (iPhone) so the widgets need no app,
 * account or internet. Each widget picks today's pair the way getDailyCard does: local day number modulo the
 * list length. src/__tests__/widgetData.test.ts fails when the files are out of date; run
 * `WRITE_WIDGET_DATA=1 npx jest widgetData` to write them again.
 */
export const WIDGET_LANGUAGES: SupportedLanguage[] = ["en", "bn", "ur", "ar"];

type PerLanguage<T> = Record<SupportedLanguage, T>;

export interface WidgetData {
  labels: PerLanguage<{ ayah: string; hadith: string; quran: string }>;
  ayahs: Array<{ ref: string; ar: string; meaning: Partial<PerLanguage<string>> }>;
  hadith: Array<PerLanguage<{ quote: string; reference: string }>>;
}

function perLanguage<T>(make: (language: SupportedLanguage) => T) {
  return Object.fromEntries(WIDGET_LANGUAGES.map((language) => [language, make(language)])) as PerLanguage<T>;
}

export function buildWidgetData(): WidgetData {
  return {
    labels: perLanguage((language) => ({
      ayah: t("Ayah of the day", undefined, language),
      hadith: t("Hadith of the day", undefined, language),
      // "{ref}" is filled in by the widget.
      quran: t("Quran {ref}", undefined, language)
    })),
    // The Arabic screen shows the ayah itself, so Arabic has no meaning line (as in the app).
    ayahs: DAILY_AYAHS.map((ayah) => ({ ref: ayah.ref, ar: ayah.ar, meaning: { en: ayah.en, bn: ayah.bn, ur: ayah.ur } })),
    hadith: DAILY_HADITH.map((saying) =>
      perLanguage((language) => ({ quote: t(saying.quote, undefined, language), reference: t(saying.reference, undefined, language) }))
    )
  };
}

export function widgetJson(data: WidgetData = buildWidgetData()) {
  return `${JSON.stringify(data, null, 2)}\n`;
}

/** The same data for the iPhone widget, as a Swift string (the target has no resource folder). */
export function widgetSwift(data: WidgetData = buildWidgetData()) {
  const json = JSON.stringify(data);
  if (json.includes('"#')) throw new Error("The widget data would end the Swift raw string early.");
  return [
    "// Written by src/data/widgetData.ts. Do not edit: run `WRITE_WIDGET_DATA=1 npx jest widgetData` instead.",
    "",
    `let dailyWidgetJSON = #"${json}"#`,
    ""
  ].join("\n");
}
