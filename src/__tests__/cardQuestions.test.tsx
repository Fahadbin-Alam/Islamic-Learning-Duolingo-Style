jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));

import React from "react";
import { StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE, LESSONS_BY_ID } from "../data/course";
import { choicePictures } from "../data/lessonPictures";
import { setActiveLanguage } from "../i18n";
import { localizeLessonContent } from "../services/contentLocalization";
import { setStoredItem } from "../services/appStorage";
import type { Challenge, LearningNodeView, Lesson, SupportedLanguage } from "../types";
import { CardGame } from "../ui/lesson/CardGame";
import { ANIMAL_KINDS } from "../ui/lesson/animalArt";
import { ART_BOX, CARD_KINDS, cardArt, homeSvg, isAnimalKind, type CardKind } from "../ui/lesson/cardArt";
import { animalOfAnswer, cardKindOf, cardLook, cardRows, cardsFor, fittedPicture, nameFits } from "../ui/lesson/cardQuestions";
import { THING_KINDS } from "../ui/lesson/thingArt";
import { mapPlacesFor } from "../ui/lesson/mapQuestions";
import { monthsFor } from "../ui/lesson/monthQuestions";
import { questionFormat } from "../ui/lesson/questionFormats";
import { skyTimesFor } from "../ui/lesson/skyQuestions";
import { withListenQuestion } from "../ui/lesson/listenQuestion";
import { colors } from "../ui/theme";
import { finishMatch, pickRight, questionOnScreen, toQuestion } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad: more interactive questions, with living pictures. A question whose answers are all animals ("The hoopoe",
// "The crow", "The eagle"), or all things that can be drawn ("Dates", "Milk", "Honey"; "The rain", "The wind";
// "Gold", "Iron"), is answered on picture cards: each drawn in its place and moving its own way.

jest.setTimeout(60000);

const variety = (on: boolean) => ((globalThis as { __QUESTION_VARIETY__?: boolean }).__QUESTION_VARIETY__ = on);
const question = (prompt: string, labels: string[], right = 0, type: Challenge["type"] = "multiple_choice"): Challenge => ({
  id: `q-${prompt}`,
  type,
  prompt,
  choices: labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label })),
  correctChoiceId: String.fromCharCode(97 + right),
  explanation: "From the lesson."
});
const hoopoe = question("Which bird brought Sulayman news?", ["The hoopoe", "The crow", "The eagle", "The dove"], 0);
const salih = question("Allah sent Salih's people a special ____ as a sign.", ["horse", "bird", "camel"], 2);
const maryam = question("What fell from the palm for Maryam?", ["Fresh dates", "Apples", "Rain", "Leaves"], 0);
const sign = question("Ayah 73: what was Salih's sign?", ["A star", "A staff", "A she-camel", "A ship"], 2);

// Every question the course asks on picture cards whose answers are all animals, with its right answer's animal: each
// was read to check that its answers are all animals, and that a drawing of them is fitting. A new one fails here
// until it is read and added.
const REVIEWED_ANIMALS: Record<string, CardKind> = {
  "Allah sent Salih's people a special ____ as a sign.": "camel",
  "What did he ﷺ make sit across in front of him?": "camel",
  "What did he hunt?": "donkey",
  "Which bird brought Sulayman news?": "hoopoe",
  "What did he ﷺ tell Umm Hani to keep?": "sheep",
  "Which animals did he ﷺ say have good in their foreheads?": "horse",
  "What pet did little Abu Umayr have?": "bird",
  "Which animal is named in the warning?": "donkey",
  "Laying the forearms flat is compared to...?": "dog",
  "What did the angel give the man who had been blind?": "sheep",
  "What stung the man in this hadith?": "scorpion",
  "What small creature is an example in ayah 26?": "mosquito",
  "Ayah 41: which creatures glorify Allah with wings spread?": "bird",
  "Who warned the other ants, in An-Naml?": "ant",
  "Which animal are people told to look at?": "camel",
  "Ayah 17: which animal are people told to look at?": "camel",
  "Ayah 1: whom did the army bring along?": "elephant",
  "Which small creature does 2:26 mention?": "mosquito",
  "What were they told to sacrifice?": "cow",
  "Whom did your Lord inspire, in 16:68?": "bee",
  "Which bird came to the boat, in the hadith?": "sparrow",
  "What also gathered, in 38:19?": "bird",
  "Which animal gets its right, in the hadith?": "sheep",
  "What was Muadh riding, per Bukhari 2856?": "donkey",
  "What are people compared to, in 54:7?": "locust",
  "What animal is used in the example of 62:5?": "donkey",
  "What comes after the camel?": "cow",
  "What animal is a hypocrite compared to?": "sheep",
  "What were they compared to in 74:50?": "donkey",
  "Which animal claims its right?": "sheep",
  "What was he asked about?": "donkey",
  "Which tiny creature in its hole prays for the teacher of good?": "ant"
};

// And every one whose answers are things that are drawn (foods, plants, the sky and the weather, the earth and its
// waters, metals, a few made things), at times with an animal among them, with its right answer's picture: each was
// read to check that every answer is just such a thing, and that a drawing of them is fitting: no scripture, nothing
// forbidden to eat or drink, never a person. A new one fails here until it is read and added.
const REVIEWED_THINGS: Record<string, CardKind> = {
  "A believer who recites is like what?": "citron",
  "Abu Bakr said he would fight even over a young ____.": "goat",
  "Al-Mulk asks who could bring back your ____ if it sank away.": "water",
  "Asiyah asked Allah for a ____ near Him in Paradise.": "house",
  "Ayah 10: what did Allah soften for Dawud?": "iron",
  "Ayah 11: what did Allah send down at Badr to make them pure?": "rain",
  "Ayah 11: what will Allah send pouring down?": "rain",
  "Ayah 12: what did Iblis say he was made from?": "fire",
  "Ayah 14: what does the sea give us to eat?": "fish",
  "Ayah 15: what are their cups made of?": "silver",
  "Ayah 18: what glorified Allah with Dawud?": "mountain",
  "Ayah 1: what split, in Al-Qamar?": "moon",
  "Ayah 24: what did Ad think the cloud would bring?": "rain",
  "Ayah 30: what did Allah make every living thing from?": "water",
  "Ayah 36: what ran gently by Sulayman's command?": "wind",
  "Ayah 47: what tiny weight will still be counted?": "seed",
  "Ayah 5: what turns, as a sign for people who think?": "wind",
  "Ayah 5: what were we first created from?": "dust",
  "Ayah 71: what are the plates and cups made of?": "gold",
  "Ayah 73: what was Salih's sign?": "camel",
  "By what did Allah teach, per 96:4?": "pen",
  "By what do they guide themselves at night, in 16:16?": "star",
  "By what does Allah swear in 74:32?": "moon",
  "From what did Allah create every creature, in 24:45?": "water",
  "From what did Allah create him, in 18:37?": "dust",
  "From what did Allah create man, in 25:54?": "water",
  "From what did Allah create us, in 30:20?": "dust",
  "From what did He begin man, in 32:7?": "clay",
  "From what is every living thing made, in 21:30?": "water",
  "From what was Adam made, as described in the Quran?": "clay",
  "From what was Adam made, as described?": "clay",
  "From what was Iblis made, in 38:76?": "fire",
  "From what were angels created, in the hadith?": "light",
  "From what were angels made, in the hadith?": "light",
  "From what were angels made, per Muslim 2996?": "light",
  "From what were the angels created, in the hadith?": "light",
  "From what were the jinn created?": "fire",
  "From what were we first created, in 40:67?": "dust",
  "He ﷺ said he won't enter the Fire till what returns to the udder?": "milk",
  "He ﷺ was asked about a drink made from...?": "honey",
  "How small is the deed, in 31:16?": "seed",
  "Quails are a kind of...": "bird",
  "Salman's family in Persia worshipped ____.": "fire",
  "Sulayman understood the ____ and the ants, and thanked Allah.": "bird",
  "What adorns the near heaven, in 37:6?": "star",
  "What are ships like, in 42:32?": "mountain",
  "What are the Buruj, per Ibn Abbas?": "star",
  "What are the cups made of, in Al-Insan?": "silver",
  "What are the Dhariyat, per Ali?": "wind",
  "What are the first three, per Ibn Masud?": "wind",
  "What are the Mu'sirat, per Ibn Abbas?": "cloud",
  "What are the vessels made of, per 76:15?": "silver",
  "What are their bracelets made of, per 76:21?": "silver",
  "What came down over him?": "cloud",
  "What cannot wash the Book away, in the hadith?": "water",
  "What comes before His mercy, the rain?": "wind",
  "What comes from the green tree, in 36:80?": "fire",
  "What did Al-Hasan compare it to?": "lamp",
  "What did Allah fix firmly, per 79:32?": "mountain",
  "What did Allah make Adam from?": "clay",
  "What did Allah make every living thing from, in Al-Anbiya?": "water",
  "What did Allah make soft for him, in 34:10?": "iron",
  "What did Allah make the shadow's guide, in 25:45?": "sun",
  "What did Allah send as a test, in 54:27?": "camel",
  "What did Allah soften for Dawud?": "iron",
  "What did Allah subject to Sulayman, in 21:81?": "wind",
  "What did Allah subject to Sulayman, in 34:12?": "wind",
  "What did Allah teach with?": "pen",
  "What did he ﷺ carry when the Ka'bah was rebuilt?": "stone",
  "What did he ﷺ liken his Ummah to?": "rain",
  "What did Iblis say Adam was made from?": "clay",
  "What did Ibrahim see first that night?": "star",
  "What did Isa shape from clay, in 3:49?": "bird",
  "What did Jabir cool in his hand to prostrate on?": "stone",
  "What did Jabir love ever since that day?": "vinegar",
  "What did Maymunah send him ﷺ?": "milk",
  "What did Musa see before Allah spoke to him, in Taha?": "fire",
  "What did Sa'd give for his mother?": "garden",
  "What did the Prophet ﷺ pick from the dish?": "gourd",
  "What did the Prophet ﷺ tell the man to give, in the hadith?": "honey",
  "What did the Prophet's ﷺ homes have that night?": "water",
  "What did the queen think the palace floor was?": "water",
  "What did they carry in a basket?": "fish",
  "What did Umar give in Allah's cause?": "horse",
  "What do the winds raise, in 35:9?": "cloud",
  "What does Al-Hadid mean?": "iron",
  "What does Al-Muzn mean, per Ibn Abbas?": "cloud",
  "What does Allah say He taught by?": "pen",
  "What does Allah send from the sky, in 16:65?": "water",
  "What does Ar-Raj' mean, per Ibn Abbas?": "rain",
  "What does Qitr mean, per Ibn Kathir?": "copper",
  "What does the night cover, per Ibn Kathir?": "sun",
  "What fell from the palm for Maryam?": "dates",
  "What flowed beneath him, in 43:51?": "river",
  "What flowed from between his ﷺ fingers?": "water",
  "What flows beneath Paradise, in 13:35?": "river",
  "What flows beneath the dwellings, in 29:58?": "river",
  "What flows beneath the Gardens, in 9:72?": "river",
  "What flows beneath the gardens, per 98:8?": "river",
  "What flows beneath the Gardens?": "river",
  "What flows under the Gardens of Adn, in 20:76?": "river",
  "What flows under the Gardens, in 61:12?": "river",
  "What flows under the Gardens?": "river",
  "What helps travelers find their way, in An-Nahl?": "star",
  "What is fire started with, per Ibn Kathir?": "tree",
  "What is guidance compared to, in Bukhari 79?": "rain",
  "What is the gourd, per Ibn Masud and Ibn Abbas?": "gourd",
  "What is the origin of life, per Ibn Kathir?": "water",
  "What is the provision in the sky, per Ibn Kathir?": "rain",
  "What is the shining lamp, per Ibn Kathir?": "sun",
  "What is the trunk of every tree in Paradise made of?": "gold",
  "What keeps the earth from shaking, per Ibn Kathir?": "mountain",
  "What obeyed Sulayman by Allah's will?": "wind",
  "What should we cool a fever with?": "water",
  "What sign did Salih bring, in Ash-Shu'ara?": "camel",
  "What small weight will be brought, in 21:47?": "seed",
  "What split, in Al-Qamar?": "moon",
  "What was cleft asunder, in 54:1?": "moon",
  "What was he riding?": "camel",
  "What was his ﷺ ring made of?": "silver",
  "What was Iblis made from?": "fire",
  "What was made soft for Prophet Dawud?": "iron",
  "What was raised over them, in 7:171?": "mountain",
  "What was sent to Thamud as a clear sign, in 17:59?": "camel",
  "What was subjected to him, in 38:36?": "wind",
  "What was the heaven like, in 41:11?": "smoke",
  "What was the ring made of?": "silver",
  "What were the angels made from?": "light",
  "What were the stones made of, in 51:33?": "clay",
  "What were we created from, in 6:2?": "clay",
  "What were we first created from, in 22:5?": "dust",
  "What were we first made from, in 35:11?": "dust",
  "What would they be made of, per Ibn Kathir?": "silver",
  "Which food did he ﷺ praise for suhur?": "dates",
  "Which food is one of the four in Abasa?": "olives",
  "Which fruit is in 6:99?": "pomegranate",
  "Which metal did Allah make soft for Dawud?": "iron",
  "Which of these has a zakat limit in this hadith?": "dates",
  "Which of these is one of the three not to refuse?": "milk",
  "Which plant did he ﷺ name?": "garlic"
};

// Their answers are all animals, but one is the apes people were turned into (2:65): not drawn, so they stay tiles.
const LEFT_AS_TILES = ["What were they made like?"];

// The lesson's width on phones 320, 360, 375, 390 and 412 px wide.
const WIDTHS = [288, 328, 343, 358, 380];
const LANGUAGES: SupportedLanguage[] = ["en", "bn", "ur", "ar"];

const allChallenges = () => (Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lesson.challenges.map((challenge, index) => ({ lesson, challenge, index })));

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

afterEach(() => {
  variety(false);
  setActiveLanguage("en");
});

// The pictures are hidden from screen readers (each card says its answer).
const ALL = { includeHiddenElements: true };

describe("which questions are asked on picture cards", () => {
  it("reads an animal's or a thing's name however it is written, and leaves answers that are not just one", () => {
    expect(animalOfAnswer("The hoopoe")).toBe("hoopoe");
    expect(animalOfAnswer("An ant.")).toBe("ant");
    expect(animalOfAnswer("A she-camel")).toBe("camel");
    expect(animalOfAnswer("His she-camel")).toBe("camel");
    expect(animalOfAnswer("Wild donkeys")).toBe("donkey");
    expect(animalOfAnswer("Their dog")).toBe("dog");
    expect(animalOfAnswer("THE HORNLESS SHEEP")).toBe("sheep");
    expect(animalOfAnswer("Spreading locusts")).toBe("locust");
    expect(animalOfAnswer("A little bird")).toBe("bird");
    expect(animalOfAnswer("Fresh fish")).toBe("fish");
    expect(animalOfAnswer("Fresh dates")).toBeUndefined();
    const things: [string, CardKind][] = [
      ["Fresh dates", "dates"],
      ["Only water", "water"],
      ["The strong wind", "wind"],
      ["A mustard seed", "seed"],
      ["Squash", "gourd"],
      ["Firewood", "wood"],
      ["A boat", "ship"],
      ["The stars", "star"],
      ["His garden", "garden"],
      ["Olive oil", "oil"],
      ["The rocks", "stone"],
      ["Heavy rain", "rain"],
      ["Pomegranates", "pomegranate"],
      ["The sea", "sea"],
      ["A she-camel", "camel"]
    ];
    for (const [label, kind] of things) expect([label, cardKindOf(label)]).toEqual([label, kind]);
    // Not just one drawn thing, or never drawn: a scripture, anything forbidden, the apes (2:65), or a person.
    for (const other of [
      "A guard",
      "Nothing; he walked",
      "Moths and insects",
      "A marked sheep in a flock",
      "Apes",
      "Lamb",
      "A thread",
      "The Quran",
      "The Book",
      "The Tablets",
      "The Torah",
      "Wine",
      "Pork",
      "Milk and honey",
      "People and stones",
      "A flood",
      "Thunder",
      "An earthquake"
    ]) {
      expect([other, cardKindOf(other)]).toEqual([other, undefined]);
    }
  });

  it("gives each answer its picture, and leaves to the tiles two answers of one, too few answers, or one that is not drawn", () => {
    expect(cardsFor(hoopoe)).toEqual({ a: "hoopoe", b: "crow", c: "eagle", d: "dove" });
    expect(cardsFor(salih)).toEqual({ a: "horse", b: "bird", c: "camel" });
    expect(cardsFor(maryam)).toEqual({ a: "dates", b: "apple", c: "rain", d: "leaves" });
    expect(cardsFor(sign)).toEqual({ a: "star", b: "staff", c: "camel", d: "ship" });
    expect(cardsFor(question("Which?", ["Camels", "A she-camel", "A horse"]))).toBeUndefined();
    expect(cardsFor(question("Which?", ["Stones", "A rock", "Sand"]))).toBeUndefined();
    expect(cardsFor(question("Which?", ["A camel", "A horse"]))).toBeUndefined();
    expect(cardsFor(question("Who lay at the cave's entrance?", ["A cat", "Their dog", "A lion", "A guard"]))).toBeUndefined();
    expect(cardsFor(question("What was sent down?", ["The Quran", "Rain", "Milk"]))).toBeUndefined();
    expect(cardsFor(question("The hoopoe brought news.", ["True", "False"], 0, "true_false"))).toBeUndefined();
  });

  it("asks the course's animal and thing questions on picture cards, each one read and checked", () => {
    const animals: Record<string, CardKind> = {};
    const things: Record<string, CardKind> = {};
    const places = { animals: 0, things: 0 };
    for (const { challenge } of allChallenges()) {
      const kinds = cardsFor(challenge);
      if (!kinds) continue;
      const allAnimals = Object.values(kinds).every(isAnimalKind);
      places[allAnimals ? "animals" : "things"] += 1;
      (allAnimals ? animals : things)[challenge.prompt] = kinds[challenge.correctChoiceId];
      // Nothing is asked both on picture cards and on the map, in the sky, on the year, or on photo cards.
      expect([challenge.prompt, mapPlacesFor(challenge), skyTimesFor(challenge), monthsFor(challenge), choicePictures(challenge.choices)]).toEqual([challenge.prompt, undefined, undefined, undefined, undefined]);
    }
    expect(animals).toEqual(REVIEWED_ANIMALS);
    expect(things).toEqual(REVIEWED_THINGS);
    expect(places).toEqual({ animals: 41, things: 202 });
    // The apes question stays as tiles: people were turned into apes, and a drawing could make light of it.
    for (const prompt of LEFT_AS_TILES) {
      const found = allChallenges().filter(({ challenge }) => challenge.prompt === prompt);
      expect([prompt, found.length > 0]).toEqual([prompt, true]);
      for (const { challenge } of found) {
        expect(challenge.choices.some((choice) => choice.label === "Apes")).toBe(true);
        expect(cardsFor(challenge)).toBeUndefined();
      }
    }
  });

  it("draws every animal and every thing, each its own drawing in its own place, moving its own way", () => {
    expect(ANIMAL_KINDS).toHaveLength(30);
    expect(THING_KINDS).toHaveLength(65);
    expect(CARD_KINDS).toEqual([...ANIMAL_KINDS, ...THING_KINDS]);
    const viewBox = `viewBox="0 0 ${ART_BOX.width} ${ART_BOX.height}"`;
    const drawings = new Set<string>();
    for (const kind of CARD_KINDS) {
      const art = cardArt(kind);
      const layers = art.layers ?? [];
      expect([kind, art.kind, homeSvg(art.home).startsWith("<svg")]).toEqual([kind, kind, true]);
      // The thing itself fitted into the picture; its scene, and the parts that fill it, stretched over all of it.
      expect([kind, art.body === "" || (art.body.startsWith("<svg") && art.body.includes(viewBox) && !art.body.includes("preserveAspectRatio"))]).toEqual([kind, true]);
      expect([kind, art.body !== "" || Boolean(art.scene)]).toEqual([kind, true]);
      if (art.scene) expect([kind, art.scene.includes('preserveAspectRatio="none"')]).toEqual([kind, true]);
      for (const layer of layers) {
        expect([kind, layer.svg.startsWith("<svg"), layer.svg.includes('preserveAspectRatio="none"')]).toEqual([kind, true, Boolean(layer.fill)]);
        // Rain falls and waves slide over the whole picture; a part that turns, leaps or sways has a point inside the box.
        if (layer.move === "fall" || layer.move === "slide") expect([kind, layer.fill]).toEqual([kind, true]);
        if (layer.move === "spin" || layer.move === "flicker" || layer.move === "sway") {
          const { x, y } = layer.center ?? { x: -1, y: -1 };
          expect([kind, x >= 0 && x <= ART_BOX.width && y >= 0 && y <= ART_BOX.height]).toEqual([kind, true]);
        }
        expect([kind, (layer.ms ?? 2400) >= 900]).toEqual([kind, true]);
      }
      // Nothing written in any picture (so never a scripture's words), and never a face: the drawings are shapes only.
      for (const part of [art.body, art.scene ?? "", art.wings ?? "", ...layers.map((layer) => layer.svg)]) expect([kind, /<text|<image|<use/.test(part)]).toEqual([kind, false]);
      // Every picture is alive: it moves as a whole, or has its own moving parts.
      expect([kind, art.motion !== "still" || layers.length > 0]).toEqual([kind, true]);
      if (art.motion === "fly" || art.motion === "buzz") {
        expect([kind, Boolean(art.wings), art.pivot !== undefined && art.pivot > 0 && art.pivot < ART_BOX.height]).toEqual([kind, true, true]);
      } else expect([kind, art.wings]).toEqual([kind, undefined]);
      drawings.add([art.scene, art.body, ...layers.map((layer) => layer.svg)].join("|"));
    }
    // Each drawn its own way: no two the same drawing.
    expect(drawings.size).toBe(CARD_KINDS.length);
    // Birds fly in the sky, fish swim in the sea, the camel walks on the sand, the ant creeps on the ground.
    expect([cardArt("hoopoe").home, cardArt("whale").home, cardArt("camel").home, cardArt("ant").home]).toEqual(["sky", "sea", "land", "ground"]);
    expect([cardArt("hoopoe").motion, cardArt("bee").motion, cardArt("fish").motion, cardArt("camel").motion, cardArt("spider").motion]).toEqual(["fly", "buzz", "swim", "walk", "creep"]);
    // Dates on a table, the moon at night, rain under a grey sky, snow in the winter.
    expect([cardArt("dates").home, cardArt("moon").home, cardArt("rain").home, cardArt("snow").home]).toEqual(["table", "night", "grey", "winter"]);
    // The rain falls, the fire leaps, the river and the sea flow, the sun's rays turn, steam rises from the bread, trees sway.
    const moves = (kind: CardKind) => (cardArt(kind).layers ?? []).map((layer) => layer.move);
    expect(moves("rain")).toContain("fall");
    expect(moves("fire")).toContain("flicker");
    expect(moves("lamp")).toContain("flicker");
    expect(moves("river")).toContain("slide");
    expect(moves("sea")).toContain("slide");
    expect(moves("sun")).toContain("spin");
    expect(moves("bread")).toContain("rise");
    expect(moves("gold")).toContain("twinkle");
    expect([cardArt("tree").motion, cardArt("ship").motion, cardArt("cloud").motion, cardArt("sun").motion]).toEqual(["sway", "bob", "drift", "glow"]);
  });

  it("is a way of asking of its own, always used for a question on picture cards", () => {
    variety(true);
    expect(questionFormat(hoopoe, { cards: true })).toBe("cards");
    expect(questionFormat(maryam, { cards: true, recall: true, language: "bn" })).toBe("cards");
    expect(questionFormat(hoopoe, {})).not.toBe("cards");
    // A gap sentence whose answers are drawn is asked on picture cards too.
    expect(questionFormat(salih, { cards: true })).toBe("cards");
    variety(false);
    expect(questionFormat(hoopoe, { cards: true })).toBe("choose");
  });

  it("sets the cards two to a row, the third alone, read from the right in Urdu and Arabic, lowering the pictures under a long question", () => {
    expect(cardRows(["a", "b", "c", "d"])).toEqual([["a", "b"], ["c", "d"]]);
    expect(cardRows(["a", "b", "c"])).toEqual([["a", "b"], ["c"]]);
    expect(cardRows(["a", "b", "c", "d"], true)).toEqual([["b", "a"], ["d", "c"]]);
    expect(cardRows(["a", "b", "c"], true)).toEqual([["b", "a"], ["c"]]);
    // On the smallest phone a card is 139 wide; its picture is lower on a short phone.
    expect(cardLook(288)).toMatchObject({ card: 139, inner: 135, picture: 104 });
    expect(cardLook(288, true)).toMatchObject({ card: 139, picture: 82 });
    // Under a long question the pictures are lowered, each row by its share, so every card fits above CHECK; never
    // lower than twice as wide as high (then the cards scroll), and as they are while the room is not yet measured.
    const look = cardLook(350);
    expect(look).toMatchObject({ inner: 166, picture: 128 });
    expect(fittedPicture(look, 2, 360, 0)).toBe(128);
    expect(fittedPicture(look, 2, 360, 360)).toBe(128);
    expect(fittedPicture(look, 2, 360, 323)).toBe(109);
    expect(fittedPicture(look, 2, 600, 300)).toBe(83);
    expect(fittedPicture(look, 0, 0, 300)).toBe(128);
  });

  it("fits every answer's name under its picture in two lines, on every phone and in every language", () => {
    const asked = allChallenges().filter(({ challenge }) => cardsFor(challenge));
    for (const language of LANGUAGES) {
      const names = new Set<string>();
      for (const { lesson, challenge, index } of asked) {
        const shown = language === "en" ? lesson : localizeLessonContent(lesson, language);
        shown.challenges[index].choices.forEach((choice, at) => {
          // In the learner's language, not in English (but for English itself).
          if (language !== "en") expect([language, challenge.prompt, choice.label === challenge.choices[at].label]).toEqual([language, challenge.prompt, false]);
          names.add(choice.label);
        });
      }
      for (const width of WIDTHS) for (const name of names) expect([language, width, name, nameFits(name, width)]).toEqual([language, width, name, true]);
    }
  });
});

describe("a question on picture cards", () => {
  const shared = { mascotVariant: "girl", accent: "#58CC02", onCheck: jest.fn(), onContinue: jest.fn(), playSound: false };
  const background = (testID: string) => StyleSheet.flatten(screen.getByTestId(testID).props.style)?.backgroundColor;
  // The cards in the order they are drawn: row by row, each row as it is set.
  const drawnOrder = () => screen.getAllByTestId(/^choice-[a-z]$/).map((card) => String(card.props.testID).replace("choice-", ""));
  const birds = cardsFor(hoopoe)!;

  it("shows each answer on a card with its animal; picking one marks it, and CHECK waits for one", async () => {
    const onSelect = jest.fn();
    const view = await render(<CardGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} kinds={birds} correctChoiceId="a" onSelect={onSelect} />);
    expect(screen.getByText("Tap the animal")).toBeTruthy();
    expect(drawnOrder()).toEqual(["a", "b", "c", "d"]);
    expect(screen.getAllByTestId(/^card-row-\d$/)).toHaveLength(2);
    for (const choice of hoopoe.choices) {
      expect(screen.getByTestId(`choice-${choice.id}`)).toHaveTextContent(choice.label);
      expect(screen.getByTestId(`choice-${choice.id}`).props.accessibilityLabel).toBe(choice.label);
    }
    expect(screen.getByTestId("card-picture-a-hoopoe")).toBeTruthy();
    expect(screen.getByTestId("card-picture-d-dove")).toBeTruthy();
    // Birds beat their wings.
    expect(screen.getByTestId("card-picture-b-crow-wings", ALL)).toBeTruthy();
    expect(screen.getByTestId("exercise-check")).toBeDisabled();
    await press("choice-c");
    await press("choice-a");
    expect(onSelect.mock.calls.map(([id]) => id)).toEqual(["c", "a"]);
    await view.rerender(<CardGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} kinds={birds} correctChoiceId="a" selectedChoiceId="a" onSelect={onSelect} />);
    expect(screen.getByTestId("exercise-check")).not.toBeDisabled();
    expect(screen.getByTestId("choice-a").props.accessibilityState).toMatchObject({ selected: true });
    expect(screen.getByTestId("choice-b").props.accessibilityState).toMatchObject({ selected: false });
    expect(background("card-tile-a")).not.toBe(colors.white);
    expect(background("card-tile-b")).toBe(colors.white);
  });

  it("shows things on cards too, each with its moving parts: the dates that fell for Maryam, the rain falling", async () => {
    await render(<CardGame {...shared} prompt={maryam.prompt} choices={maryam.choices} kinds={cardsFor(maryam)!} correctChoiceId="a" onSelect={jest.fn()} />);
    expect(screen.getByText("Tap the picture")).toBeTruthy();
    expect(drawnOrder()).toEqual(["a", "b", "c", "d"]);
    for (const [id, kind] of Object.entries(cardsFor(maryam)!)) expect(screen.getByTestId(`card-picture-${id}-${kind}`)).toBeTruthy();
    // The rain's drops and splashes, the leaves falling; things have no wings.
    expect(screen.getByTestId("card-picture-c-rain-layer-0", ALL)).toBeTruthy();
    expect(screen.getByTestId("card-picture-c-rain-layer-1", ALL)).toBeTruthy();
    expect(screen.getByTestId("card-picture-d-leaves-layer-1", ALL)).toBeTruthy();
    expect(screen.queryByTestId("card-picture-a-dates-wings", ALL)).toBeNull();
  });

  it("sets three answers two and one; an animal among things, and the camel walking with no wings", async () => {
    const view = await render(<CardGame {...shared} prompt={salih.prompt} choices={salih.choices} kinds={cardsFor(salih)!} correctChoiceId="c" onSelect={jest.fn()} />);
    expect(screen.getAllByTestId(/^card-row-\d$/)).toHaveLength(2);
    expect(screen.getByTestId("card-row-1")).toHaveTextContent("camel");
    expect(screen.getByTestId("card-picture-c-camel")).toBeTruthy();
    expect(screen.queryByTestId("card-picture-c-camel-wings", ALL)).toBeNull();
    expect(screen.getByTestId("card-picture-b-bird-wings", ALL)).toBeTruthy();
    await view.unmount();
    await render(<CardGame {...shared} prompt={sign.prompt} choices={sign.choices} kinds={cardsFor(sign)!} correctChoiceId="c" onSelect={jest.fn()} />);
    // Not all animals: the picture is what to tap.
    expect(screen.getByText("Tap the picture")).toBeTruthy();
    expect(screen.getByTestId("card-picture-c-camel")).toBeTruthy();
    expect(screen.getByTestId("card-picture-d-ship")).toBeTruthy();
  });

  it("turns a right answer green; a wrong one red, and the right one green", async () => {
    const view = await render(
      <CardGame {...shared} prompt={hoopoe.prompt} choices={hoopoe.choices} kinds={birds} correctChoiceId="a" selectedChoiceId="a" result={{ correct: true, correctLabel: "The hoopoe", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("card-tile-a")).toBe(colors.correctBg);
    expect(background("card-tile-b")).toBe(colors.white);
    await view.unmount();
    await render(
      <CardGame {...shared} prompt={maryam.prompt} choices={maryam.choices} kinds={cardsFor(maryam)!} correctChoiceId="a" selectedChoiceId="b" result={{ correct: false, correctLabel: "Fresh dates", why: "" }} onSelect={jest.fn()} />
    );
    expect(background("card-tile-b")).toBe(colors.wrongBg);
    expect(background("card-tile-a")).toBe(colors.correctBg);
    expect(background("card-tile-c")).toBe(colors.white);
    expect(screen.getByTestId("feedback-sheet")).toBeTruthy();
    expect(screen.getByTestId("choice-c")).toBeDisabled();
  });

  it("speaks the learner's language, and sets the cards from the right in Urdu and Arabic", async () => {
    const lesson = LESSONS_BY_ID["lesson-deep-prophet-sulayman-hoopoe"];
    const english = lesson.challenges.find((challenge) => cardsFor(challenge))!;
    const order = english.choices.map((choice) => choice.id);
    for (const language of ["ur", "ar"] as const) {
      setActiveLanguage(language);
      const shown = localizeLessonContent(lesson, language).challenges.find((challenge) => challenge.id === english.id)!;
      const view = await render(<CardGame {...shared} prompt={shown.prompt} choices={shown.choices} kinds={cardsFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
      expect(screen.getByText(language === "ur" ? "جانور پر ٹیپ کریں" : "اضغط على الحيوان")).toBeTruthy();
      // The first answer on the right of the top row.
      expect(drawnOrder()).toEqual([order[1], order[0], order[3], order[2]]);
      expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent(language === "ur" ? "ہدہد" : "الهدهد");
      await view.unmount();
    }
    setActiveLanguage("bn");
    const shown = localizeLessonContent(lesson, "bn").challenges.find((challenge) => challenge.id === english.id)!;
    const view = await render(<CardGame {...shared} prompt={shown.prompt} choices={shown.choices} kinds={cardsFor(english)!} correctChoiceId={shown.correctChoiceId} onSelect={jest.fn()} />);
    expect(screen.getByText("প্রাণীটিতে চাপো")).toBeTruthy();
    expect(drawnOrder()).toEqual(order);
    expect(screen.getByTestId(`choice-${english.correctChoiceId}`)).toHaveTextContent("হুদহুদ");
    await view.unmount();
    // Things: "Tap the picture", in each language.
    const dates = LESSONS_BY_ID["lesson-surah-meaning-19-16-26"];
    const datesQuestion = dates.challenges.find((challenge) => cardsFor(challenge))!;
    for (const [language, cue] of [
      ["bn", "ছবিটিতে চাপো"],
      ["ur", "تصویر پر ٹیپ کریں"],
      ["ar", "اضغط على الصورة"]
    ] as const) {
      setActiveLanguage(language);
      const local = localizeLessonContent(dates, language).challenges.find((challenge) => challenge.id === datesQuestion.id)!;
      const again = await render(<CardGame {...shared} prompt={local.prompt} choices={local.choices} kinds={cardsFor(datesQuestion)!} correctChoiceId={local.correctChoiceId} onSelect={jest.fn()} />);
      expect(screen.getByText(cue)).toBeTruthy();
      await again.unmount();
    }
  });
});

describe("in a lesson", () => {
  /** Plays the Lives of the Prophets lesson to its end, counting the questions asked on picture cards. */
  async function playProphetsLesson(lessonId: string) {
    variety(true);
    const prophets = COURSE.sections.find((section) => section.topicId === "prophets")!;
    const at = prophets.nodes.findIndex((node) => node.lessonIds.includes(lessonId));
    expect(at).toBeGreaterThanOrEqual(0);
    const before = prophets.nodes.slice(0, at);
    const user = makeUser({
      lastTopicId: "prophets",
      hearts: { current: 5, max: 5, unlimited: true, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem("sira-path-user-profile", JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === prophets.nodes[at].id) as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);
    // With its listening question ("Listen, then pick what it means."), as the app adds it.
    const challenges = withListenQuestion(session.lesson, node.id).challenges;
    await render(<TopicApp />);
    await screen.findByTestId("learn-path-prophets", undefined, { timeout: 10000 });
    await press(`path-node-${node.id}`);
    await press("node-card-start");

    const onCards: string[] = [];
    for (let turn = 0; turn < 60 && !screen.queryByTestId("lesson-complete"); turn += 1) {
      await toQuestion();
      if (screen.queryByTestId("match-game")) {
        await finishMatch(challenges);
        continue;
      }
      const shown = questionOnScreen(challenges);
      if (!shown) break;
      if (screen.queryByTestId("card-game")) {
        const kinds = cardsFor(shown)!;
        expect(kinds).toBeTruthy();
        onCards.push(kinds[shown.correctChoiceId]);
        for (const choice of shown.choices) expect(screen.getByTestId(`card-picture-${choice.id}-${kinds[choice.id]}`)).toBeTruthy();
      }
      await pickRight(shown);
      await press("exercise-check");
      await press("feedback-continue");
      // "Want it harder?" after a few right in a row: the lesson stays as it is.
      if (screen.queryByTestId("feedback-continue") && !screen.queryByTestId("lesson-complete")) await press("harder-no");
    }
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    return onCards;
  }

  it("asks which sign Allah sent Salih's people on picture cards, and goes on", async () => {
    expect(await playProphetsLesson("lesson-prophets-early-messengers-hud-and-salih")).toContain("camel");
  });

  it("asks what Allah made Adam from on picture cards (fire, light, clay), and goes on", async () => {
    expect(await playProphetsLesson("lesson-adam")).toContain("clay");
  });
});
