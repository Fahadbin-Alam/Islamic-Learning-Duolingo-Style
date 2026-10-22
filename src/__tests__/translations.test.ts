import { getCatalog } from "../translations";
import type { SupportedLanguage } from "../types";

const { extract } = require("../../scripts/i18n/ui-strings.cjs") as { extract: () => string[] };

const LANGUAGES: SupportedLanguage[] = ["bn", "ur", "ar"];
const SCRIPT: Record<string, RegExp> = { bn: /[ঀ-৿]/, ur: /[؀-ۿ]/, ar: /[؀-ۿ]/ };
// Shown the same in every language.
const KEEP_AS_IS = new Set(["{count} XP"]);
const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();

const uiStrings = extract();

describe.each(LANGUAGES)("%s catalog", (language) => {
  const catalog = getCatalog(language);
  const ui: Record<string, string> = require(`../translations/ui/${language}.json`);

  test("covers every screen string", () => {
    expect(uiStrings.filter((text) => !catalog[text])).toEqual([]);
  });

  test("has no screen strings the app no longer uses", () => {
    const used = new Set(uiStrings);
    expect(Object.keys(ui).filter((key) => !used.has(key))).toEqual([]);
  });

  // Translations may add ﷺ after the Prophet's name, but never drop it.
  test("keeps every {placeholder} and the ﷺ honorific", () => {
    const broken = Object.entries(catalog).filter(
      ([english, translated]) =>
        placeholders(english).join() !== placeholders(translated).join() || (english.includes("ﷺ") && !translated.includes("ﷺ"))
    );
    expect(broken.slice(0, 10)).toEqual([]);
  });

  test("is written in the language's own script", () => {
    const untranslated = Object.entries(catalog).filter(([english, translated]) => !KEEP_AS_IS.has(english) && (!translated.trim() || !SCRIPT[language].test(translated)));
    expect(untranslated.slice(0, 10)).toEqual([]);
  });
});
