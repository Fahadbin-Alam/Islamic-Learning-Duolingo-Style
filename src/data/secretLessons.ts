import type { LessonSource, UserProfile } from "../types";

// Secret lessons: hidden around the app, each found by tapping one thing three times. A clue for the next one can be
// bought with gems in the Shop. Every hadith quote is sunnah.com's English word for word, never cut inside a
// sentence, checked on sunnah.com; the scholar facts are quotes from the same IslamQA biographies the Scholars topic
// uses (src/data/scholarUnits.ts). Nothing disputed.

/** Where a secret hides. Each place wraps its picture in SecretTap with this id. */
export type SecretSpot = "lantern" | "trophy" | "shop_gem" | "avatar" | "league" | "mascot";

export type SecretLesson = {
  id: string;
  kind: "hadith" | "scholar";
  title: string;
  /** What it teaches, in a child's words. */
  line: string;
  quote: string;
  reference: string;
  source: LessonSource;
  spot: SecretSpot;
  clue: string;
};

function sunnah(ref: string, reference: string, narrator: string | undefined, summary: string): LessonSource {
  return {
    id: `secret_${ref.replace(/\W+/g, "_")}`,
    site: "Sunnah.com",
    category: "hadith",
    title: reference,
    url: `https://sunnah.com/${ref}`,
    reference,
    from: narrator ? `Narrated by ${narrator}` : reference,
    grade: "Sahih",
    summary
  };
}

function islamqa(answer: number, title: string, summary: string, highlight?: string): LessonSource {
  return {
    id: `secret_islamqa_${answer}`,
    site: "IslamQA",
    category: "biography",
    title,
    url: `https://islamqa.info/en/answers/${answer}`,
    reference: `IslamQA ${answer}`,
    from: "Islam Question & Answer",
    grade: "Biography",
    summary,
    highlight
  };
}

const INTENTIONS =
  "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended.";
const TONGUE_AND_HANDS =
  "A Muslim is the one who avoids harming Muslims with his tongue and hands. And a Muhajir (emigrant) is the one who gives up (abandons) all what Allah has forbidden.";
const SMALL_AND_STEADY =
  "Do good deeds properly, sincerely and moderately and know that your deeds will not make you enter Paradise, and that the most beloved deed to Allah is the most regular and constant even if it were little.";
const CHARITY =
  "Charity does not decrease wealth, no one forgives another except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status.";
const MALIK_SEVENTY =
  "I did not sit in the mosque to teach until seventy elders of great knowledge testified that I was qualified.";
const SHAFII_RISALAH =
  "He wrote a book, Ar-Risalah, for the first time, in which he laid the foundations for the field of usul al-fiqh; when he returned to Egypt, he rewrote it.";

export const SECRET_LESSONS: SecretLesson[] = [
  {
    id: "secret-intentions",
    kind: "hadith",
    title: "It starts in the heart",
    line: "Allah rewards you for what you meant in your heart.",
    quote: INTENTIONS,
    reference: "Sahih al-Bukhari 1",
    source: sunnah("bukhari:1", "Sahih al-Bukhari 1", undefined, INTENTIONS),
    spot: "lantern",
    clue: "Tap the lantern on the Secret lessons card 3 times."
  },
  {
    id: "secret-tongue-and-hands",
    kind: "hadith",
    title: "Safe from your words",
    line: "A Muslim never hurts others with words or hands.",
    quote: TONGUE_AND_HANDS,
    reference: "Sahih al-Bukhari 10",
    source: sunnah("bukhari:10", "Sahih al-Bukhari 10", "Abdullah bin 'Amr", TONGUE_AND_HANDS),
    spot: "trophy",
    clue: "Tap the big trophy in your arena 3 times."
  },
  {
    id: "secret-small-and-steady",
    kind: "hadith",
    title: "Small but every day",
    line: "Allah loves a good deed done every day, even a small one.",
    quote: SMALL_AND_STEADY,
    reference: "Sahih al-Bukhari 6464",
    source: sunnah("bukhari:6464", "Sahih al-Bukhari 6464", "Aisha", SMALL_AND_STEADY),
    spot: "shop_gem",
    clue: "Tap the big date in the Shop 3 times."
  },
  {
    id: "secret-charity",
    kind: "hadith",
    title: "Giving never makes you poor",
    line: "Charity never makes your money less.",
    quote: CHARITY,
    reference: "Sahih Muslim 2588",
    source: sunnah("muslim:2588", "Sahih Muslim 2588", "Abu Huraira", CHARITY),
    spot: "avatar",
    clue: "Tap your picture on the Me tab 3 times."
  },
  {
    id: "secret-malik-seventy",
    kind: "scholar",
    title: "Imam Malik waited",
    line: "Imam Malik only taught once seventy scholars said he was ready.",
    quote: MALIK_SEVENTY,
    reference: "IslamQA 119256",
    source: islamqa(119256, "A brief biography of Imam Malik", `Malik said: ${MALIK_SEVENTY}`, "I did not sit in the mosque to teach until seventy elder of great knowledge testified that I was qualified to do that"),
    spot: "league",
    clue: "Tap your league shield under Friends 3 times."
  },
  {
    id: "secret-shafii-risalah",
    kind: "scholar",
    title: "Ash-Shafi'i's first book",
    line: "Imam ash-Shafi'i wrote Ar-Risalah, the first book on the rules of fiqh.",
    quote: SHAFII_RISALAH,
    reference: "IslamQA 153652",
    source: islamqa(153652, "A brief biography of Imam ash-Shafi'i", SHAFII_RISALAH, "in which he laid the foundations for the field of usul al-fiqh"),
    spot: "mascot",
    clue: "Tap the helper next to Ummah Battle 3 times."
  }
];

export const SECRET_HINT_PRICE = 30;
export const SECRET_FOUND_GEMS = 10;

export function secretAt(spot: SecretSpot) {
  return SECRET_LESSONS.find((secret) => secret.spot === spot);
}

export function foundSecrets(user: Pick<UserProfile, "ummah">) {
  return user.ummah?.secrets ?? [];
}

export function hasFound(user: Pick<UserProfile, "ummah">, id: string) {
  return foundSecrets(user).includes(id);
}

/** Marks a secret found and pays its gems the first time. */
export function findSecret(user: UserProfile, id: string): UserProfile {
  if (hasFound(user, id) || !SECRET_LESSONS.some((secret) => secret.id === id)) return user;
  const ummah = { trophies: 0, best: 0, battles: 0, wins: 0, ...(user.ummah ?? {}) };
  return { ...user, gems: user.gems + SECRET_FOUND_GEMS, ummah: { ...ummah, secrets: [...(ummah.secrets ?? []), id] } };
}

/** The next secret a bought hint would tell about: not found and not hinted yet. */
export function nextHintSecret(user: Pick<UserProfile, "ummah">) {
  const hints = user.ummah?.hints ?? [];
  return SECRET_LESSONS.find((secret) => !hasFound(user, secret.id) && !hints.includes(secret.id));
}

/** Buys the clue to the next secret, or does nothing when there is none or too few gems. */
export function buySecretHint(user: UserProfile): UserProfile {
  const next = nextHintSecret(user);
  if (!next || user.gems < SECRET_HINT_PRICE) return user;
  const ummah = { trophies: 0, best: 0, battles: 0, wins: 0, ...(user.ummah ?? {}) };
  return { ...user, gems: user.gems - SECRET_HINT_PRICE, ummah: { ...ummah, hints: [...(ummah.hints ?? []), next.id] } };
}
