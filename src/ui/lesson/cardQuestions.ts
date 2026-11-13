import type { Challenge } from "../../types";
import { isArabicOnly } from "../ArabicText";
import { fitsTwoLines } from "../journey/moonArt";
import type { AnimalKind } from "./animalArt";
import type { CardKind } from "./cardArt";
import type { ThingKind } from "./thingArt";

/**
 * Questions on picture cards: when every answer of a question is something that can be drawn (an animal: "The
 * hoopoe", "A camel", "Bees"; or a thing: "Dates", "Milk", "The rain", "Iron"), each answer is a card with its
 * picture drawn and moving, the way picture cards teach words (CardGame.tsx). Nothing new is written: the question,
 * its answers, its right answer and its source stay the checked ones; the cards only draw what each answer names.
 *
 * An answer counts only when it is just the name of one of them, one or many, with or without "a", "the", "his" or
 * "their": "A she-camel", "Wild donkeys", "The hornless sheep" (drawn without horns), "Fresh dates", "The strong
 * wind". Never drawn: apes (the answer where people were turned into apes, 2:65, which a cartoon could make light
 * of), a scripture (the Quran, the Book, the Tablets), anything forbidden to eat or drink, and anything that stands
 * for a person.
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
  "fresh fish": "fish",
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

/** Each thing's names, as `cardKey` writes them. */
const THING_NAMES: Record<ThingKind, string[]> = {
  dates: ["date", "dates", "fresh dates", "dried dates", "ripe dates"],
  milk: ["milk"],
  honey: ["honey"],
  water: ["water", "only water"],
  bread: ["bread"],
  meat: ["meat"],
  barley: ["barley"],
  wheat: ["wheat"],
  grapes: ["grapes"],
  figs: ["figs", "fig"],
  olives: ["olive", "olives"],
  oil: ["oil", "olive oil"],
  pomegranate: ["pomegranate", "pomegranates"],
  banana: ["banana", "bananas"],
  apple: ["apple", "apples"],
  mango: ["mango", "mangoes"],
  rice: ["rice"],
  gourd: ["gourd", "squash"],
  vinegar: ["vinegar"],
  garlic: ["garlic"],
  mint: ["mint"],
  citron: ["citron"],
  coffee: ["coffee"],
  fruit: ["fruit", "fruits"],
  tree: ["tree", "trees"],
  palm: ["date palm", "date palms", "palm tree", "palm trees"],
  leaves: ["leaf", "leaves"],
  seed: ["mustard seed"],
  garden: ["garden", "gardens"],
  thorn: ["thorn"],
  sun: ["sun"],
  moon: ["moon"],
  star: ["star", "stars"],
  cloud: ["cloud", "clouds"],
  rain: ["rain", "heavy rain"],
  wind: ["wind", "winds", "strong wind"],
  air: ["air"],
  snow: ["snow"],
  ice: ["ice"],
  sand: ["sand"],
  dust: ["dust"],
  smoke: ["smoke"],
  fire: ["fire"],
  river: ["river", "rivers"],
  sea: ["sea", "seas"],
  mountain: ["mountain", "mountains"],
  stone: ["stone", "stones", "rock", "rocks"],
  clay: ["clay"],
  light: ["light"],
  gold: ["gold"],
  silver: ["silver"],
  iron: ["iron"],
  copper: ["copper"],
  pearl: ["pearl", "pearls"],
  wood: ["wood", "firewood"],
  lamp: ["lamp"],
  pen: ["pen"],
  ship: ["ship", "boat"],
  sword: ["sword"],
  crown: ["crown"],
  rope: ["rope"],
  tent: ["tent"],
  house: ["house"],
  staff: ["staff"],
  wall: ["wall"]
};

const THING_OF_ANSWER: Record<string, ThingKind> = Object.fromEntries(
  (Object.entries(THING_NAMES) as [ThingKind, string[]][]).flatMap(([kind, names]) => names.map((name) => [name, kind]))
);

/** An answer as the tables above write it: lower case, plain quotes, no "a", "the", "his" or "their", no stop at the end. */
export function cardKey(label: string) {
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
  return ANIMAL_OF_ANSWER[cardKey(label)];
}

/** The animal or the thing an answer names, if it names one that is drawn. */
export function cardKindOf(label: string): CardKind | undefined {
  const key = cardKey(label);
  return ANIMAL_OF_ANSWER[key] ?? THING_OF_ANSWER[key];
}

/**
 * Each answer's picture (choice id -> animal or thing), when the question can be asked on picture cards: at least
 * three answers, each a different one that is drawn. Read on the English question.
 */
export function cardsFor(challenge: Pick<Challenge, "choices" | "type">): Record<string, CardKind> | undefined {
  if (challenge.type === "true_false" || challenge.choices.length < 3) return undefined;
  const kinds: Record<string, CardKind> = {};
  const seen = new Set<CardKind>();
  for (const choice of challenge.choices) {
    const kind = cardKindOf(choice.label);
    if (!kind || seen.has(kind)) return undefined;
    seen.add(kind);
    kinds[choice.id] = kind;
  }
  return kinds;
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
/**
 * A picture is this much wider than high; on a short phone a little lower, so both rows fit above CHECK. Under a long
 * question the pictures are lowered to fit, but never past the last.
 */
const PICTURE_ASPECT = 1.3;
const PICTURE_ASPECT_COMPACT = 1.65;
const PICTURE_ASPECT_LEAST = 2;

/** How the cards are set in a room `width` wide: each card's width, the picture's width and height, and the name's room. */
export function cardLook(width: number, compact = false) {
  const card = Math.floor((width - CARD_GAP) / 2);
  const inner = card - CARD_BORDER * 2;
  return { card, inner, picture: Math.round(inner / (compact ? PICTURE_ASPECT_COMPACT : PICTURE_ASPECT)), text: inner - CARD_NAME_PAD * 2 };
}

/**
 * How high the pictures are drawn so that every card fits in the `room` left under the question, above CHECK: as
 * `cardLook` says when they fit (`tall`, how high the cards stand with those pictures), else each row lower by its share
 * of what is missing, but never lower than a picture twice as wide as it is high (then the cards scroll). With no
 * room measured yet, as `cardLook` says.
 */
export function fittedPicture(look: { inner: number; picture: number }, rows: number, tall: number, room: number) {
  if (rows < 1 || room <= 0 || tall <= room) return look.picture;
  const least = Math.min(look.picture, Math.round(look.inner / PICTURE_ASPECT_LEAST));
  return Math.max(least, look.picture - Math.ceil((tall - room) / rows));
}

/** Whether an answer's name fits under its picture in two lines, on cards set in a room `width` wide. */
export function nameFits(name: string, width: number) {
  return fitsTwoLines(name, cardLook(width).text, isArabicOnly(name) ? CARD_NAME_FONT_ARABIC : CARD_NAME_FONT);
}
