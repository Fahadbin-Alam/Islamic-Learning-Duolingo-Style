/**
 * Each surah's own lesson tells why it has its name (src/data/surahIntros.ts), in every language.
 *
 * Run with SURAH_INTROS_WRITE=1 to write scripts/surah-meanings/translations/surah-intros.json from the reasons in
 * src/data/surahNames.json, then `node scripts/surah-meanings/translate.mjs` to add them to the catalogs.
 */
import fs from "fs";
import path from "path";
import { LESSONS_BY_ID } from "../data/course";
import { SURAH_NAME_REASONS, nameChoice, namePrompt, nameSentence, placeSentence, surahIntro } from "../data/surahIntros";
import type { Lesson } from "../types";

const LANGUAGES = ["bn", "ur", "ar"] as const;
type Language = (typeof LANGUAGES)[number];
const catalog = (language: Language): Record<string, string> =>
  JSON.parse(fs.readFileSync(path.join(__dirname, `../translations/content/${language}.json`), "utf8"));
const catalogs = Object.fromEntries(LANGUAGES.map((language) => [language, catalog(language)])) as Record<Language, Record<string, string>>;

// Openings a catalog does not have yet.
const OPENINGS: Record<string, [string, string, string]> = {
  "Surah Taha is named after its opening letters, Ta Ha.": ["সূরা ত্বা-হা-র নাম এর শুরুর অক্ষর ত্বা হা থেকে।", "سورۃ طٰہٰ کا نام اس کے شروع کے حروف طا ہا پر ہے۔", "سُمّيت سورة طه بالحرفين اللذين تبدأ بهما: طا ها."]
};

const PLACE: Record<Language, Record<string, string>> = {
  bn: { Makkah: "মক্কায়", Madinah: "মদিনায়" },
  ur: { Makkah: "مکہ", Madinah: "مدینہ" },
  ar: { Makkah: "مكة", Madinah: "المدينة" }
};

function nameIn(language: Language, reason: string, ayah: number | null) {
  const forms = {
    bn: ayah ? `নামের কারণ: ${reason} (আয়াত ${ayah})।` : `নামের কারণ: ${reason}।`,
    ur: ayah ? `نام کی وجہ: ${reason} (آیت ${ayah})۔` : `نام کی وجہ: ${reason}۔`,
    ar: ayah ? `سبب التسمية: ${reason} (الآية ${ayah}).` : `سبب التسمية: ${reason}.`
  };
  return forms[language];
}

function placeIn(language: Language, place: string | undefined, ayahs: number | undefined) {
  const where = place ? PLACE[language][place] : undefined;
  if (!ayahs) return where ? { bn: `এটি ${where} নাজিল হয়েছে।`, ur: `یہ ${where} میں نازل ہوئی۔`, ar: `نزلت في ${where}.` }[language] : "";
  if (!where) return { bn: `এতে ${ayahs}টি আয়াত আছে।`, ur: `اس میں ${ayahs} آیات ہیں۔`, ar: `عدد آياتها ${ayahs}.` }[language];
  return { bn: `এটি ${where} নাজিল হয়েছে এবং এতে ${ayahs}টি আয়াত আছে।`, ur: `یہ ${where} میں نازل ہوئی اور اس میں ${ayahs} آیات ہیں۔`, ar: `نزلت في ${where}، وعدد آياتها ${ayahs}.` }[language];
}

function promptIn(language: Language, title: string) {
  return { bn: `একে ${title} বলা হয় কেন?`, ur: `اسے ${title} کیوں کہتے ہیں؟`, ar: `لماذا سُمّيت ${title}؟` }[language];
}

const surahLessons = (Object.values(LESSONS_BY_ID) as Lesson[]).filter((lesson) => lesson.id.startsWith("lesson-notes-quran-tafseer-surahs-"));

/** Every English text the surah intros add, with its Bengali, Urdu and Arabic. */
function introTranslations() {
  const texts: Record<string, [string, string, string]> = {};
  const index = (language: Language) => LANGUAGES.indexOf(language) + 2;
  for (const lesson of surahLessons) {
    const intro = surahIntro(lesson);
    if (!intro) continue;
    const reasons = SURAH_NAME_REASONS[String(intro.number)];
    const opening = (language: Language) => catalogs[language][intro.opening] ?? OPENINGS[intro.opening]?.[LANGUAGES.indexOf(language)];
    const title = (language: Language) => catalogs[language][lesson.title];
    const each = (build: (language: Language) => string | undefined) => LANGUAGES.map(build) as [string, string, string];
    texts[intro.text] = each((language) =>
      [opening(language), nameIn(language, reasons[index(language)] as string, intro.ayah), placeIn(language, intro.place, intro.ayahs)].filter(Boolean).join(" ")
    );
    texts[nameSentence(intro.reason, intro.ayah)] = each((language) => nameIn(language, reasons[index(language)] as string, intro.ayah));
    texts[nameChoice(intro.reason)] = each((language) => reasons[index(language)] as string);
    texts[namePrompt(lesson.title)] = each((language) => promptIn(language, title(language)));
    texts[`Quran ${intro.number}`] = [`কুরআন ${intro.number}`, `قرآن ${intro.number}`, `القرآن ${intro.number}`];
  }
  return texts;
}

describe("surah intros", () => {
  it("gives every one of the 114 surahs its reason, and its lesson the story and a question on its name", () => {
    expect(Object.keys(SURAH_NAME_REASONS)).toHaveLength(114);
    for (const [number, [ayah, ...reasons]] of Object.entries(SURAH_NAME_REASONS)) {
      expect({ number, ok: reasons.every((text) => text.trim().length > 5) && (ayah === null || ayah > 0) }).toEqual({ number, ok: true });
    }
    expect(surahLessons).toHaveLength(114);
    for (const lesson of surahLessons) {
      const intro = surahIntro(lesson);
      expect(intro).toBeDefined();
      expect(lesson.learnSource?.summary).toBe(intro!.text);
      expect(lesson.learnSource?.url).toMatch(new RegExp(`^https://quran\\.com/${intro!.number}(/|$|\\?|#)`));
      const question = lesson.challenges.find((challenge) => challenge.id === `${lesson.id}_name`)!;
      expect(question.choices).toHaveLength(4);
      expect(new Set(question.choices.map((choice) => choice.label)).size).toBe(4);
      expect(question.choices.find((choice) => choice.id === question.correctChoiceId)?.label).toBe(nameChoice(intro!.reason));
    }
  });

  it("tells Al-Baqarah's story: the cow of ayah 67, Madinah and 286 ayahs", () => {
    const baqarah = LESSONS_BY_ID["lesson-notes-quran-tafseer-surahs-1-10-surah-al-baqarah"] as Lesson;
    expect(baqarah.learnSource?.summary).toBe(
      'Surah Al-Baqarah means "The Cow". The name comes from the cow Allah told the Children of Israel to sacrifice (ayah 67). It was revealed in Madinah and has 286 ayahs.'
    );
    expect(placeSentence(undefined, 7)).toBe("It has 7 ayahs.");
  });

  it("has every text in Bengali, Urdu and Arabic", () => {
    const texts = introTranslations();
    if (process.env.SURAH_INTROS_WRITE) {
      fs.writeFileSync(path.join(__dirname, "../../scripts/surah-meanings/translations/surah-intros.json"), `${JSON.stringify(texts, null, 1)}\n`);
    }
    const missing = Object.entries(texts).filter(([, forms]) => forms.some((form) => !form || /undefined/.test(form)));
    expect(missing.map(([english]) => english)).toEqual([]);
    for (const language of LANGUAGES) {
      // The Why line after the question is cut from the explanation first, so its sentence on its own is not looked up.
      const absent = Object.keys(texts).filter((english) => !english.startsWith("The name comes from") && !/^Quran \d+$/.test(english) && !catalogs[language][english]);
      expect({ language, absent: absent.slice(0, 5) }).toEqual({ language, absent: [] });
    }
  });
});
