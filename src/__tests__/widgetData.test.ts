import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DAILY_AYAHS, DAILY_HADITH, getDailyCard, localDayNumber } from "../data/dailyCard";
import { WIDGET_LANGUAGES, buildWidgetData, widgetJson, widgetSwift } from "../data/widgetData";
import { t } from "../i18n";

const ROOT = join(__dirname, "..", "..");
const FILES = {
  json: join(ROOT, "widgets", "daily.json"),
  swift: join(ROOT, "targets", "daily-widget", "DailyData.swift")
};

if (process.env.WRITE_WIDGET_DATA) {
  writeFileSync(FILES.json, widgetJson());
  writeFileSync(FILES.swift, widgetSwift());
}

describe("home-screen widget data", () => {
  it("is up to date with the daily card", () => {
    expect(readFileSync(FILES.json, "utf8")).toBe(widgetJson());
    expect(readFileSync(FILES.swift, "utf8")).toBe(widgetSwift());
  });

  it("holds every ayah and hadith, translated in every language", () => {
    const data = buildWidgetData();
    expect(data.ayahs).toHaveLength(DAILY_AYAHS.length);
    expect(data.hadith).toHaveLength(DAILY_HADITH.length);
    for (const language of WIDGET_LANGUAGES) {
      expect(data.labels[language].quran).toContain("{ref}");
      if (language === "en") continue;
      expect(data.labels[language].ayah).not.toBe("Ayah of the day");
      for (const saying of data.hadith) {
        expect(saying[language].quote).not.toBe(saying.en.quote);
      }
    }
  });

  // The widget runs the same sum natively (DailyAyahWidget.kt, DailyWidget.swift).
  it("picks the same pair as the app's daily card on any day", () => {
    const data = buildWidgetData();
    for (const date of [new Date(2026, 0, 1), new Date(2026, 9, 30, 23, 59), new Date(2027, 2, 14, 0, 1)]) {
      const day = localDayNumber(date);
      for (const language of WIDGET_LANGUAGES) {
        const card = getDailyCard(language, date);
        const ayah = data.ayahs[day % data.ayahs.length];
        expect(ayah.ar).toBe(card.ayah.arabic);
        expect(ayah.meaning[language as "en"]).toBe(card.ayah.meaning);
        expect(data.hadith[day % data.hadith.length][language].quote).toBe(t(card.hadith.quote, undefined, language));
      }
    }
  });
});
