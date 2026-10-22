import type { SupportedLanguage } from "../types";

// English text -> translated text. `ui/` holds the app's screens; `content/` holds lessons, topics and
// placement questions (see scripts/i18n). Each language loads only when someone picks it.
export type TranslationCatalog = Record<string, string>;

const EMPTY_CATALOG: TranslationCatalog = {};
const loaded: Partial<Record<SupportedLanguage, TranslationCatalog>> = {};

function loadCatalog(language: SupportedLanguage): TranslationCatalog {
  switch (language) {
    case "ar":
      return { ...require("./content/ar.json"), ...require("./ui/ar.json") };
    case "bn":
      return { ...require("./content/bn.json"), ...require("./ui/bn.json") };
    case "ur":
      return { ...require("./content/ur.json"), ...require("./ui/ur.json") };
    default:
      return EMPTY_CATALOG;
  }
}

export function getCatalog(language: SupportedLanguage): TranslationCatalog {
  if (language === "en") {
    return EMPTY_CATALOG;
  }

  return (loaded[language] ??= loadCatalog(language));
}
