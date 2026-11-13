import type { Challenge } from "../../types";
import { isArabicOnly } from "../ArabicText";
import { fitsTwoLines } from "../journey/moonArt";
import type { AnimalKind } from "./animalArt";

/**
 * Animal questions on picture cards: when every answer of a question is an animal ("The hoopoe", "A camel", "Bees"),
 * each answer is a card with its animal drawn and moving, the way picture cards teach words (AnimalGame.tsx).
 * Nothing new is written: the question, its answers, its right answer and its source stay the checked ones; the
 * cards only draw each answer's animal.
 *
 * An answer counts only when it is an animal's name, one or many, with or without "a", "the", "his" or "their":
 * "A she-camel", "Wild donkeys", "The hornless sheep" (drawn without horns), "Spreading locusts". Apes are not
 * drawn: they are the answer where people were turned into apes (2:65), and a cartoon could make light of it.
 */
const ANIMAL_OF_ANSWER: Record<string, AnimalKind> = {
  camel: "camel",
  camels: "camel",
  "she-camel": "camel",
  "she-camels": "camel",
  horse: "horse",
  horses: "horse",
  donkey: "donkey",
  donkeys: "donkey",
  "wild donkey": "donkey",
  "wild donkeys": "donkey",
  mule: "mule",
  mules: "mule",
  cow: "cow",
  cows: "cow",
  goat: "goat",
  goats: "goat",
  sheep: "sheep",
  "hornless sheep": "sheep",
  dog: "dog",
  dogs: "dog",
  cat: "cat",
  cats: "cat",
  lion: "lion",
  lions: "lion",
  wolf: "wolf",
  wolves: "wolf",
  bear: "bear",
  bears: "bear",
  deer: "deer",
  elephant: "elephant",
  elephants: "elephant",
  bird: "bird",
  birds: "bird",
  "little bird": "bird",
  crow: "crow",
  crows: "crow",
  eagle: "eagle",
  eagles: "eagle",
  dove: "dove",
  doves: "dove",
  hoopoe: "hoopoe",
  sparrow: "sparrow",
  sparrows: "sparrow",
  fish: "fish",
  whale: "whale",
  whales: "whale",
  ant: "ant",
  ants: "ant",
  bee: "bee",
  bees: "bee",
  spider: "spider",
  spiders: "spider",
  mosquito: "mosquito",
  mosquitoes: "mosquito",
  fly: "fly",
  flies: "fly",
  locust: "locust",
  locusts: "locust",
  "spreading locusts": "locust",
  scorpion: "scorpion",
  scorpions: "scorpion",
  snake: "snake",
  snakes: "snake"
};

/** An answer as the table above writes it: lower case, plain quotes, no "a", "the", "his" or "their", no stop at the end. */
export function animalKey(label: string) {
  return label
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[.!?;:]+$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(a|an|the|his|her|its|their) /, "");
}

/** The animal an answer names, if it names one. */
export function animalOfAnswer(label: string): AnimalKind | undefined {
  return ANIMAL_OF_ANSWER[animalKey(label)];
}

/**
 * Each answer's animal (choice id -> animal), when the question can be asked on picture cards: at least three
 * answers, each a different animal. Read on the English question.
 */
export function animalsFor(challenge: Pick<Challenge, "choices" | "type">): Record<string, AnimalKind> | undefined {
  if (challenge.type === "true_false" || challenge.choices.length < 3) return undefined;
  const animals: Record<string, AnimalKind> = {};
  const seen = new Set<AnimalKind>();
  for (const choice of challenge.choices) {
    const animal = animalOfAnswer(choice.label);
    if (!animal || seen.has(animal)) return undefined;
    seen.add(animal);
    animals[choice.id] = animal;
  }
  return animals;
}

/** The cards, two to a row (the last alone when there are three), read from the right in Urdu and Arabic. */
export function cardRows<T>(items: T[], rtl = false): T[][] {
  const rows: T[][] = [];
  items.forEach((item, index) => (rows[Math.floor(index / 2)] ??= []).push(item));
  return rtl ? rows.map((row) => [...row].reverse()) : rows;
}

/** The cards' room before it is measured (a phone 320 wide), the gap between the cards, and each card's border. */
export const CARDS_FALLBACK_WIDTH = 288;
export const CARD_GAP = 10;
export const CARD_BORDER = 2;
/** An answer's name under its picture: its size (in Urdu and Arabic, in the Arabic letters' own font), and the room left at its sides. */
export const CARD_NAME_FONT = 16;
export const CARD_NAME_FONT_ARABIC = 18;
export const CARD_NAME_PAD = 6;
/** A picture is this much wider than high; on a short phone a little lower, so both rows fit above CHECK. */
const PICTURE_ASPECT = 1.3;
const PICTURE_ASPECT_COMPACT = 1.65;

/** How the cards are set in a room `width` wide: each card's width, the picture's width and height, and the name's room. */
export function cardLook(width: number, compact = false) {
  const card = Math.floor((width - CARD_GAP) / 2);
  const inner = card - CARD_BORDER * 2;
  return { card, inner, picture: Math.round(inner / (compact ? PICTURE_ASPECT_COMPACT : PICTURE_ASPECT)), text: inner - CARD_NAME_PAD * 2 };
}

/** Whether an answer's name fits under its picture in two lines, on cards set in a room `width` wide. */
export function nameFits(name: string, width: number) {
  return fitsTwoLines(name, cardLook(width).text, isArabicOnly(name) ? CARD_NAME_FONT_ARABIC : CARD_NAME_FONT);
}
