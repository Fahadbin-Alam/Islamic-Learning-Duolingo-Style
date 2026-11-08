import type { ImageSourcePropType } from "react-native";
import type { Lesson } from "../types";
import { PICTURE_IMAGES } from "./lessonPictureImages";

/**
 * Pictures of the places lessons talk about (Makkah, the Kaaba, Uhud, the Cave of Hira...), so a learner can
 * picture them as they were in the early years of Islam. Makkah, Madinah, the Ka'bah and the Hajj places are our
 * own drawings of how they looked long ago (scripts/lesson-pictures/draw.mjs): no towers, cranes or crowds of
 * today. The rest are photos of places that still look as they did (Wikimedia Commons, public domain or CC BY /
 * CC BY-SA, credited in lessonPictureCredits.json). Only places and things: never a picture of a prophet, a
 * Companion or anyone meant to stand for them. They ship inside the app (small JPEGs in assets/pictures), so
 * they show offline.
 */
/**
 * `drawn`: one of our own drawings (scripts/lesson-pictures/draw.mjs), not a photo: of how a place looked long ago,
 * or of a thing a lesson teaches (`note: "thing"`: a wudu jug, a prayer rug), said as just "A drawing".
 * `imagined`: a drawing of something no one alive has seen (the bridge, the Ark), only to help picture it.
 */
export type PictureCredit = {
  file: string;
  page: string;
  author: string;
  license: string;
  licenseUrl: string;
  drawn?: boolean;
  imagined?: boolean;
  note?: "thing";
};

export type LessonPicture = {
  id: string;
  /** Short English caption, translated where it is shown (content catalogs). */
  caption: string;
  image: ImageSourcePropType;
  credit: PictureCredit;
};

/** `broad`: a rule that matches many everyday words (prayer, Quran, home): fine for a lesson page, never for a question. */
type PlaceRule = { id: string; caption: string; match: RegExp; broad?: boolean };

/** Most specific first: "the Cave of Hira near Makkah" shows Hira, "the Kaaba in Makkah" the Kaaba. */
const PLACES: PlaceRule[] = [
  { id: "hira", caption: "Mount an-Nur, where the Cave of Hira is", match: /\bhira'?\b|\bjabal (?:al-|an-)?nur\b|mountain of light/i },
  { id: "zamzam", caption: "The well of Zamzam long ago", match: /\bzam ?zam\b/i },
  { id: "safa-marwa", caption: "The hills of Safa and Marwah long ago", match: /\bsafa\b|\bmarwah?\b/i },
  // Not "Ka'b" (Ka'b ibn Malik, Ubayy ibn Ka'b).
  { id: "kaaba", caption: "The Ka'bah long ago", match: /\b(?:kaabah?|kabah|ka['‘’]bah?)\b/i },
  // The qiblah is the Ka'bah, whatever else the lesson names (it once faced Jerusalem).
  { id: "kaaba", caption: "The Ka'bah long ago", match: /\bqiblah?\b/i },
  { id: "arafah", caption: "The plain of Arafah", match: /\barafa[ht]\b|\barafah\b/i },
  { id: "mina", caption: "The valley of Mina long ago", match: /\bmina\b/i },
  { id: "muzdalifah", caption: "Muzdalifah at night", match: /\bmuzdalifah?\b/i },
  { id: "uhud", caption: "Mount Uhud, near Madinah", match: /\buhud\b/i },
  { id: "badr", caption: "The land around Badr", match: /\bbadr\b/i },
  { id: "aqsa", caption: "Masjid al-Aqsa in Jerusalem", match: /\baqsa\b|\bbayt al-maqdis\b/i },
  { id: "jerusalem", caption: "Jerusalem long ago", match: /\bjerusalem\b/i },
  { id: "sinai", caption: "Mount Sinai", match: /\bmount (?:sinai|t[uū]r)\b|\bsinai\b/i },
  { id: "hegra", caption: "Al-Hijr, where Thamud carved homes in rock", match: /\bthamud\b|\bhegra\b|\bmada'?in salih\b/i },
  { id: "taif", caption: "The mountains of Ta'if", match: /\bta['‘’]?if\b/i },
  { id: "damascus", caption: "The Umayyad Mosque in Damascus", match: /\bdamascus\b|\bumayyad mosque\b/i },
  { id: "manuscript", caption: "An early page of the Quran", match: /\bmushaf\b|\bmanuscripts?\b|\bcompil(?:ed|ing|ation)\b[^.]*\bquran\b|\bquran\b[^.]*\bcompil(?:ed|ing|ation)\b/i },
  { id: "madinah", caption: "Madinah long ago, among its date palms", match: /\bmadinah\b|\bmedina\b|\byathrib\b|\bprophet['‘’]s mosque\b|\bmasjid an-nabawi\b/i },
  { id: "makkah", caption: "Makkah long ago", match: /\bmakkah\b|\bmecca\b|\bmasjid al-haram\b|\bsacred mosque\b/i },
  // Things the Quran and sunnah describe, drawn only to help picture them (scripts/lesson-pictures/draw.mjs). The
  // unseen ones (the bridge, the scales, the Pool, Jannah) say they are only a drawing: Allah knows how they truly are.
  { id: "sirat", caption: "The bridge over Jahannam, only as a drawing", match: /\bsirat\b(?!\s+al-mustaqim)|\bthe bridge\b|\bbridge (?:over|across|laid)\b/i },
  { id: "scales", caption: "The scales of the Day, only as a drawing", match: /\bmizan\b(?! al-)|\bthe scales\b(?! (?:in|of) (?:trade|the market))|\bon the scale\b|\bscales? of (?:deeds|justice)\b/i },
  { id: "pool", caption: "The Pool, only as a drawing", match: /\bhawd\b|\bkawthar\b|\bthe pool\b|\bhis ﷺ pool\b/i },
  { id: "sun-west", caption: "The sun rising, here from the west", match: /\bsun (?:will )?rises? (?:from|in) the west\b|\bsun rising (?:from|in) the west\b|\brises in the west\b/i },
  { id: "grave", caption: "A grave in the desert", match: /\bin the grave\b|\bthe grave['’]s\b|\bbarzakh\b|\bout of (?:the|their) graves\b|\bgrave gets\b|\bdeath and the grave\b/i },
  { id: "garden", caption: "Gardens with rivers, only a picture: no eye has seen Jannah", match: /\bgardens? (?:with|beneath|under|of bliss)\b|\brivers? of (?:jannah|paradise)\b|\b(?:jannah|paradise) has\b|\bin (?:jannah|paradise):|\bpeople of jannah\b|\babout jannah\b/i },
  { id: "ark", caption: "The Ark on the waves, as a drawing", match: /\bark\b|\bthe flood\b/i },
  { id: "sea-split", caption: "The sea parted, as a drawing", match: /\bsea (?:was |is )?(?:split|parted)\b|\b(?:split|parted|struck|crossed|crossing) the sea\b|\bred sea\b/i },
  { id: "big-fish", caption: "The big fish in the dark sea, as a drawing", match: /\bwhale\b|\bbig fish\b|\bthe fish\b/i },
  { id: "ants", caption: "An ant hill", match: /\bants?\b/i },
  { id: "nile", caption: "The River Nile long ago", match: /\bnile\b|\b(?:in|into|on) the river\b/i },
  { id: "ahqaf", caption: "The sand hills of al-Ahqaf, land of 'Ad", match: /\b[Aa]hqaf\b|(?:^|[\s(])['‘’]Ad\b/ },
  { id: "desert-well", caption: "A well in the desert long ago", match: /\b(?:a|the) well\b(?!-)/i },
  // What else a lesson teaches about: two more stories, the Last Day, then worship and knowledge.
  { id: "cave", caption: "A cave in the mountains", match: /\b(?:people|youths?|young men|companions|sleepers) of the cave\b|\bashab al-kahf\b|\bcave of thawr\b|\bthawr\b/i },
  { id: "elephant", caption: "The year of the elephant", match: /\babrahah\b|\bal-fil\b|\b(?:army|year|people|owners|companions) of the elephant\b|\bthe elephant\b/i },
  { id: "book-deeds", caption: "The book of deeds", match: /\bbook of (?:deeds|records?)\b|\brecord of deeds\b|\b(?:right|left) hand or (?:left|right)\b|\bgiven (?:his|her|their) (?:book|record)\b/i },
  { id: "gathering", caption: "The wide land of the gathering", match: /\bthe gathering\b|\bmahshar\b|\bgathered (?:together|on|before)\b|\bseven in the shade\b|\bthe sun (?:is )?(?:brought|comes) (?:close|near)\b|\braised (?:up )?(?:from (?:the|their) graves|just as)\b/i },
  { id: "wudu", caption: "Water for wudu", match: /\bwudu'?\b|\bablution\b|\bghusl\b/i },
  { id: "iftar", caption: "Dates and water at sunset", match: /\biftar\b|\bsuhoor\b|\bsuhur\b|\bbreak(?:s|ing)? (?:the|your|their|his|our) fast\b/i },
  { id: "zakat", caption: "Giving zakat from what you have", match: /\bzakat\b|\bzakah\b|\bnisab\b/i },
  { id: "prayer", caption: "A prayer rug before the mihrab", match: /\bprayer (?:mat|rug)\b|\bmihrab\b|\bsujud\b|\bsajdah\b|\bprostrat(?:e|es|ion|ing)\b|\bruku'?\b|\btakbir\b|\bsalah\b|\bsalat\b/i },
  { id: "books", caption: "Books of knowledge", match: /\bwrote\b[^.]{0,40}\bbooks?\b|\bhis books?\b|\bher books?\b|\bauthored\b|\blibrar(?:y|ies)\b|\bmusnad\b|\bal-muwatta\b|\bcompiled\b[^.]{0,40}\bhadith\b/i },
  // More things a lesson can be about (drawn 2026-11-08), so most pages have a picture of what they teach.
  { id: "sheep", caption: "Sheep grazing on the hills", match: /\bsheep\b|\bshepherds?\b|\bflocks?\b|\bgoats?\b|\budhiyah\b|\bqurbani\b|\bsacrific(?:e|ed|es|ing)\b[^.]{0,30}\b(?:animal|ram|lamb)s?\b|\blambs?\b/i, broad: true },
  { id: "rain", caption: "Rain falling on the land", match: /\brain(?:s|fall|ed|ing)?\b|\bclouds?\b|\bthunder\b|\blightning\b/i, broad: true },
  { id: "scroll", caption: "A letter with a seal", match: /\bletters? to\b|\bsent (?:a )?letters?\b|\btreaty\b|\bhudaybiyy?ah\b|\bwrote to\b|\bsealed?\b[^.]{0,20}\bletter\b/i, broad: true },
  { id: "market", caption: "A market long ago", match: /\bmarkets?\b|\bmerchants?\b|\btrad(?:e|er|ers|ing)\b|\bbuy(?:s|ing|er)?\b|\bsell(?:s|ing|er)?\b|\bweighs?\b|\bcheat(?:s|ing)?\b|\briba\b|\binterest on\b/i, broad: true },
  { id: "sharing", caption: "Food shared at the door", match: /\bsadaqah?\b|\bcharity\b|\bfeed(?:s|ing)?\b|\bhungry\b|\bthe poor\b|\bguests?\b|\borphans?\b|\bneighbou?rs?\b|\bgifts?\b/i, broad: true },
  { id: "night", caption: "The crescent moon over the desert", match: /\bnight\b|\bmoon\b|\bcrescent\b|\bhilal\b|\bstars?\b|\blaylat\b|\bqiyam\b|\btahajjud\b|\btarawee?h\b|\bisha\b/i, broad: true },
  { id: "sunrise", caption: "The sun rising over the mountains", match: /\bsunrise\b|\bfajr\b|\bdawn\b|\bmorning\b|\bthe sun\b/i, broad: true },
  { id: "home", caption: "A home at evening", match: /\bparents?\b|\bmothers?\b|\bfathers?\b|\bfamil(?:y|ies)\b|\bhomes?\b|\bhouses?\b|\bchild(?:ren)?\b|\bwi(?:fe|ves)\b|\bhusbands?\b|\bmarri(?:age|ed|y)\b|\bsons?\b|\bdaughters?\b/i, broad: true },
  { id: "masjid", caption: "A masjid long ago", match: /\bmasjids?\b|\bmosques?\b|\bjumu['‘’]?ah\b|\bfriday\b|\badhan\b|\bimam\b|\bcongregation\b|\bpray(?:s|ed|ing|er)?\b/i, broad: true },
  { id: "quran", caption: "The Quran open on its stand", match: /\bqur['‘’]?an\b|\bayahs?\b|\bayat\b|\bsurahs?\b|\brecit(?:e|es|ed|ing|ation)\b|\btafsee?r\b|\brevealed\b|\brevelation\b/i, broad: true },
  { id: "date-palms", caption: "Date palms", match: /\bdate palms?\b|\bpalm trees?\b|\bdate trees?\b/i },
  { id: "desert", caption: "The Arabian desert", match: /\bdesert\b/i }
];

// eslint-disable-next-line @typescript-eslint/no-require-imports
const credits: Record<string, PictureCredit> = require("./lessonPictureCredits.json");

/** Only places with a downloaded, credited photo can show. */
const AVAILABLE = PLACES.filter((place) => PICTURE_IMAGES[place.id] && credits[place.id]);

export const LESSON_PICTURE_IDS = [...new Set(AVAILABLE.map((place) => place.id))];

/**
 * One picture per place, made once: the same place always gives the same object, so a question drawn again (as its
 * answer sheet opens) is handed the same photo and its prompt, which is memoized, is not drawn again for it.
 */
const PICTURES = new Map<string, LessonPicture>();
for (const place of AVAILABLE) {
  if (!PICTURES.has(place.id)) {
    PICTURES.set(place.id, { id: place.id, caption: place.caption, image: PICTURE_IMAGES[place.id], credit: credits[place.id] });
  }
}

export function getLessonPicture(id: string): LessonPicture | undefined {
  return PICTURES.get(id);
}

/** The photo for the first place a text names, most specific place first. */
export function pictureForText(...texts: (string | undefined)[]): LessonPicture | undefined {
  const joined = texts.filter(Boolean).join("\n");
  if (!joined) {
    return undefined;
  }
  const place = AVAILABLE.find((entry) => entry.match.test(joined));
  return place ? getLessonPicture(place.id) : undefined;
}

/** "Revealed in Madinah": where a surah came down, not what it is about. */
const ONLY_WHERE = /\brevealed\s+(?:in|at|near)\s+[A-Z][\w'‘’-]*/g;

/**
 * A lesson's photo: the place its title names, else the place its learn line names, so the photo shows what the
 * lesson teaches. A fact chip ("Revealed in Madinah", "Born in Makkah") only says where, so it never picks the
 * photo: Surah Al-Baqarah is not about the Prophet's Mosque. The questions' answers are never read, so the photo
 * cannot give an answer away.
 */
export function pictureForLesson(lesson: Pick<Lesson, "title" | "learnLine">): LessonPicture | undefined {
  return pictureForText(lesson.title) ?? pictureForText(lesson.learnLine?.replace(ONLY_WHERE, ""));
}

/** A question's photo: only a place its own prompt names, never one from its answers, nor a broad everyday word. */
export function pictureForQuestion(prompt: string): LessonPicture | undefined {
  if (!prompt) return undefined;
  const place = AVAILABLE.find((entry) => !entry.broad && entry.match.test(prompt));
  return place ? getLessonPicture(place.id) : undefined;
}

/** Pictures that fit a whole topic, for a page that names nothing with a picture of its own. */
const TOPIC_PICTURES: Record<string, string[]> = {
  quran_tafseer: ["quran", "manuscript", "night", "sunrise"],
  sahabah: ["madinah", "date-palms", "makkah", "desert"],
  prophets: ["desert", "night", "sunrise", "desert-well"],
  women_of_the_book: ["home", "madinah", "date-palms", "night"],
  scholars: ["books", "scroll", "masjid"],
  sahihayn: ["books", "scroll", "masjid"],
  hadith: ["books", "scroll", "home"],
  manners: ["home", "sharing", "market", "masjid"],
  marriage: ["home", "night", "date-palms"],
  prayer: ["prayer", "masjid", "wudu", "sunrise"],
  akhirah: ["gathering", "night", "book-deeds", "garden"],
  aqidah: ["night", "sunrise", "rain", "quran"],
  foundation: ["masjid", "quran", "sunrise", "night"],
  intro: ["sunrise", "masjid", "quran", "night"],
  fasting: ["iftar", "night", "sunrise"],
  ramadan: ["iftar", "night", "quran"],
  eid: ["masjid", "sharing", "sunrise", "sheep"],
  zakat: ["zakat", "sharing", "market"],
  hajj: ["kaaba", "arafah", "mina", "zamzam"]
};
const ANY_TOPIC = ["sunrise", "desert", "night", "date-palms"];

export function topicPictures(topicId: string | undefined): LessonPicture[] {
  return (TOPIC_PICTURES[topicId ?? ""] ?? ANY_TOPIC).flatMap((id) => getLessonPicture(id) ?? []);
}

export type FlowPage = { page: string; text?: string };

/**
 * A big picture for every page of a lesson, so reading it feels like turning the pages of a picture book: each page
 * shows what it names (the bridge, the Ka'bah, a market), else the lesson's own picture, else one that fits the topic.
 * Two pages in a row never show the same one when another fits, and a picture not seen yet in the lesson comes first.
 * `startPicture` is the lesson's first page's picture (its place, or what its Arabic word means); `cover`: the first
 * page already opens on a picture of its own (a surah's), so it gets no other. A quiz page has none.
 */
export function flowPictures(
  lesson: Pick<Lesson, "title" | "learnLine" | "learnFacts" | "learnDeeper">,
  topicId: string | undefined,
  pages: FlowPage[],
  options: { startPicture?: LessonPicture; cover?: boolean } = {}
): (LessonPicture | undefined)[] {
  const lessonPicture = options.startPicture ?? pictureForLesson(lesson);
  const topic = topicPictures(topicId);
  const used = new Set<string>();
  let previous: string | undefined;
  return pages.map(({ page, text }) => {
    if (page === "quiz" || (page === "start" && options.cover)) {
      previous = undefined;
      return undefined;
    }
    const own = page === "start" ? lessonPicture : pictureForText(text ?? pageText(lesson, page));
    const candidates = [own, lessonPicture, ...topic].filter((each): each is LessonPicture => Boolean(each));
    const pick =
      (own && own.id !== previous && !used.has(own.id) ? own : undefined) ??
      candidates.find((each) => each.id !== previous && !used.has(each.id)) ??
      candidates.find((each) => each.id !== previous) ??
      candidates[0];
    if (pick) used.add(pick.id);
    previous = pick?.id;
    return pick;
  });
}

/** "Photo: Jane Doe, CC BY-SA 4.0" */
export function creditLine(credit: PictureCredit) {
  return `${credit.author}, ${credit.license}`;
}

/** The words a lesson page teaches, in English, for its picture. */
function pageText(lesson: Pick<Lesson, "learnFacts" | "learnDeeper">, page: string) {
  switch (page) {
    case "facts":
      return (lesson.learnFacts ?? []).join("\n");
    case "meaning":
      return (lesson.learnDeeper?.meaning ?? []).join("\n");
    case "story":
      return lesson.learnDeeper?.story;
    case "takeaway":
      return lesson.learnDeeper?.takeaway;
    default:
      return undefined;
  }
}

/**
 * A picture for one page of a lesson (What you learn, What it means, the story, Take home): the first thing that
 * page names that has a picture, e.g. the bridge on the page that teaches the bridge. A picture shows once a
 * lesson: not when the lesson's first page already showed it, nor on a later page after an earlier one did.
 */
export function pictureForPage(
  lesson: Pick<Lesson, "title" | "learnLine" | "learnFacts" | "learnDeeper">,
  page: string,
  pagesBefore: string[] = []
): LessonPicture | undefined {
  const picture = pictureForText(pageText(lesson, page));
  if (!picture) return undefined;
  const shown = new Set([pictureForLesson(lesson)?.id, ...pagesBefore.map((before) => pictureForText(pageText(lesson, before))?.id)]);
  return shown.has(picture.id) ? undefined : picture;
}
