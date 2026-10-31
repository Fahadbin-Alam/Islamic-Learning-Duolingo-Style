import type { ImageSourcePropType } from "react-native";
import type { Lesson } from "../types";
import { PICTURE_IMAGES } from "./lessonPictureImages";

/**
 * Real photos of the places lessons talk about (Makkah, the Kaaba, Uhud, the Cave of Hira...), so a learner can
 * picture them. Every photo is free to use (Wikimedia Commons, public domain or CC BY / CC BY-SA) and credited
 * (lessonPictureCredits.json, written by scripts/lesson-pictures/fetch.mjs). Only places and things: never a
 * picture of a prophet, a Companion or anyone meant to stand for them. The photos ship inside the app (small
 * JPEGs in assets/pictures), so they show offline.
 */
export type PictureCredit = { file: string; page: string; author: string; license: string; licenseUrl: string };

export type LessonPicture = {
  id: string;
  /** Short English caption, translated where it is shown (content catalogs). */
  caption: string;
  image: ImageSourcePropType;
  credit: PictureCredit;
};

type PlaceRule = { id: string; caption: string; match: RegExp };

/** Most specific first: "the Cave of Hira near Makkah" shows Hira, "the Kaaba in Makkah" the Kaaba. */
const PLACES: PlaceRule[] = [
  { id: "hira", caption: "Mount an-Nur, where the Cave of Hira is", match: /\bhira'?\b|\bjabal (?:al-|an-)?nur\b|mountain of light/i },
  { id: "zamzam", caption: "Zamzam water in Makkah", match: /\bzam ?zam\b/i },
  { id: "safa-marwa", caption: "Between Safa and Marwah", match: /\bsafa\b|\bmarwah?\b/i },
  // Not "Ka'b" (Ka'b ibn Malik, Ubayy ibn Ka'b).
  { id: "kaaba", caption: "The Ka'bah in Makkah", match: /\b(?:kaabah?|kabah|ka['‘’]bah?)\b/i },
  // The qiblah is the Ka'bah, whatever else the lesson names (it once faced Jerusalem).
  { id: "kaaba", caption: "The Ka'bah in Makkah", match: /\bqiblah?\b/i },
  { id: "arafah", caption: "Mount Arafat", match: /\barafa[ht]\b|\barafah\b/i },
  { id: "mina", caption: "The tents of Mina", match: /\bmina\b/i },
  { id: "muzdalifah", caption: "Muzdalifah", match: /\bmuzdalifah?\b/i },
  { id: "uhud", caption: "Mount Uhud, near Madinah", match: /\buhud\b/i },
  { id: "badr", caption: "The land around Badr", match: /\bbadr\b/i },
  { id: "aqsa", caption: "Masjid al-Aqsa in Jerusalem", match: /\baqsa\b|\bbayt al-maqdis\b/i },
  { id: "jerusalem", caption: "The old city of Jerusalem", match: /\bjerusalem\b/i },
  { id: "sinai", caption: "Mount Sinai", match: /\bmount (?:sinai|t[uū]r)\b|\bsinai\b/i },
  { id: "hegra", caption: "Al-Hijr, where Thamud carved homes in rock", match: /\bthamud\b|\bhegra\b|\bmada'?in salih\b/i },
  { id: "taif", caption: "The mountains of Ta'if", match: /\bta['‘’]?if\b/i },
  { id: "damascus", caption: "The Umayyad Mosque in Damascus", match: /\bdamascus\b|\bumayyad mosque\b/i },
  { id: "manuscript", caption: "An early page of the Quran", match: /\bmushaf\b|\bmanuscripts?\b|\bcompil(?:ed|ing|ation)\b[^.]*\bquran\b|\bquran\b[^.]*\bcompil(?:ed|ing|ation)\b/i },
  { id: "madinah", caption: "The Prophet's Mosque in Madinah", match: /\bmadinah\b|\bmedina\b|\byathrib\b|\bprophet['‘’]s mosque\b|\bmasjid an-nabawi\b/i },
  { id: "makkah", caption: "Masjid al-Haram in Makkah", match: /\bmakkah\b|\bmecca\b|\bmasjid al-haram\b|\bsacred mosque\b/i },
  { id: "date-palms", caption: "Date palms", match: /\bdate palms?\b|\bpalm trees?\b|\bdate trees?\b/i },
  { id: "desert", caption: "The Arabian desert", match: /\bdesert\b/i }
];

// eslint-disable-next-line @typescript-eslint/no-require-imports
const credits: Record<string, PictureCredit> = require("./lessonPictureCredits.json");

/** Only places with a downloaded, credited photo can show. */
const AVAILABLE = PLACES.filter((place) => PICTURE_IMAGES[place.id] && credits[place.id]);

export const LESSON_PICTURE_IDS = [...new Set(AVAILABLE.map((place) => place.id))];

export function getLessonPicture(id: string): LessonPicture | undefined {
  const place = AVAILABLE.find((entry) => entry.id === id);
  return place ? { id: place.id, caption: place.caption, image: PICTURE_IMAGES[place.id], credit: credits[place.id] } : undefined;
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

/** A question's photo: only a place its own prompt names, never one from its answers. */
export function pictureForQuestion(prompt: string): LessonPicture | undefined {
  return pictureForText(prompt);
}

/** "Photo: Jane Doe, CC BY-SA 4.0" */
export function creditLine(credit: PictureCredit) {
  return `${credit.author}, ${credit.license}`;
}
