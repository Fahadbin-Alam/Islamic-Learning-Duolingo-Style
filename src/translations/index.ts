import type { SupportedLanguage } from "../types";

// English text -> translated text. `ui/` holds the app's screens; `content/` holds lessons, topics and
// placement questions (see scripts/i18n). Each language loads only when someone picks it (or searches: the search
// finds names in every language). A language is over 140,000 lines, so its two halves are read where they are,
// never copied into one object: a merged copy would hold every line twice, on top of the files themselves.
export type TranslationCatalog = Record<string, string>;

type Halves = { ui: TranslationCatalog; content: TranslationCatalog };

const EMPTY_CATALOG: TranslationCatalog = {};
const loaded: Partial<Record<SupportedLanguage, Halves>> = {};
const merged: Partial<Record<SupportedLanguage, TranslationCatalog>> = {};
const own = Object.prototype.hasOwnProperty;

function loadHalves(language: SupportedLanguage): Halves | undefined {
  switch (language) {
    case "ar":
      return { content: require("./content/ar.json"), ui: require("./ui/ar.json") };
    case "bn":
      return { content: require("./content/bn.json"), ui: require("./ui/bn.json") };
    case "ur":
      return { content: require("./content/ur.json"), ui: require("./ui/ur.json") };
    default:
      return undefined;
  }
}

function halvesOf(language: SupportedLanguage): Halves | undefined {
  if (language === "en") {
    return undefined;
  }

  return (loaded[language] ??= loadHalves(language));
}

/** The language's text for an English line, or undefined when it has none. A screen's line wins over a lesson's. */
export function translationOf(language: SupportedLanguage, text: string): string | undefined {
  const halves = halvesOf(language);
  if (!halves) {
    return undefined;
  }
  if (own.call(halves.ui, text)) {
    return halves.ui[text];
  }
  return own.call(halves.content, text) ? halves.content[text] : undefined;
}

/**
 * The whole catalog as one object, for checks that walk every line (tests, scripts). It is a merged copy, built the
 * first time it is asked for: the app reads single lines with translationOf instead.
 */
export function getCatalog(language: SupportedLanguage): TranslationCatalog {
  const halves = halvesOf(language);
  if (!halves) {
    return EMPTY_CATALOG;
  }

  return (merged[language] ??= { ...halves.content, ...halves.ui });
}

/** The languages whose text is in memory now (for the test that the app opens without the ones it does not show). */
export function loadedLanguages(): SupportedLanguage[] {
  return (Object.keys(loaded) as SupportedLanguage[]).filter((language) => loaded[language]);
}
