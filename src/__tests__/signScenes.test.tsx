jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Animated, StyleSheet } from "react-native";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { LESSONS_BY_ID } from "../data/course";
import { DAY_SKY_LESSONS } from "../data/daySky";
import { hajjMapForLesson } from "../data/hajjMap";
import { MOON_LESSONS } from "../data/moonSky";
import { journeyForLesson } from "../data/seerahMap";
import { SIGN_LESSONS, SIGN_SCENES, signForLesson, type SignKind } from "../data/signScenes";
import { surahNumberForTitle } from "../data/surahPictures";
import { setActiveLanguage, t } from "../i18n";
import { getCatalog } from "../translations";
import { LearnCard } from "../ui/lesson";
import { SignCard } from "../ui/journey/SignCard";
import { SignSceneView } from "../ui/journey/SignScene";
import { fitsTwoLines } from "../ui/journey/moonArt";
import { SIGN_ART, SIGN_BOX, keyAt, signArt, signWords, type SignPart } from "../ui/journey/signArt";
import type { Lesson, LessonSource } from "../types";
import type { TestInstance } from "test-renderer";

// The scene's frame on phones 320, 360, 375, 390 and 412 px wide, on a lesson's first page; and on the gallery's wall.
const FRAMES = [
  [292, 178],
  [332, 201],
  [347, 209],
  [362, 271],
  [384, 287],
  [360, 270]
];
const LANGUAGES = ["en", "bn", "ur", "ar"] as const;
// The scene is hidden from screen readers (its card says what it shows), so its parts are found among hidden ones.
const ALL = { includeHiddenElements: true };
const scene = (id: string) => SIGN_SCENES.find((each) => each.id === id)!;

/** What a lesson says, from its title to its questions. */
function lessonText(lesson: Lesson) {
  return [
    lesson.title,
    lesson.intro,
    lesson.learnLine,
    lesson.quote?.text,
    ...(lesson.learnFacts ?? []),
    lesson.explanationContent,
    lesson.keyTakeaway,
    lesson.storyMoment,
    ...lesson.challenges.map((challenge) => challenge.prompt)
  ]
    .filter(Boolean)
    .join(" ");
}

function lessonSources(lesson: Lesson): LessonSource[] {
  return [lesson.learnSource, ...lesson.sources, ...(lesson.learnDeeper?.sources ?? []), ...lesson.challenges.map((challenge) => challenge.source)].filter(Boolean) as LessonSource[];
}

// What a lesson must speak of to open on each scene.
const ABOUT: Record<string, RegExp[]> = {
  "sign-rain": [/rain|water|dry earth|dead (land|earth)/i, /dead|dry|barren|life|alive|reviv|grow|crop|food|garden|fruit|wind/i],
  "sign-clouds": [/cloud/i, /rain|lightning|water/i],
  "sign-fade": [/crop|plant|pasture|vegetation|green/i, /yellow|dry|dries|stubble|straw|wither|mown|blow|this life|this world|worldly life/i],
  "sign-seed": [/seed|grain/i, /seven/i],
  "sign-seas": [/sea|water/i, /sweet|salt|two|barrier/i],
  "sign-ships": [/ship/i, /sail|sea/i],
  "sign-mountains": [/earth/i, /mountain|spread|bed|steady|firm/i],
  "sign-bee": [/bee|honey/i],
  "sign-spider": [/spider/i, /house|home/i],
  "sign-tree": [/tree|palm/i],
  "sign-look": [/look/i, /camel|sky|mountain|earth/i],
  "sign-birds": [/bird/i, /wing|sky|air|hold|held|glorif/i],
  "sign-sow": [/sow|seed|plant/i, /grow/i],
  "sign-water": [/water|rain/i, /drink|cloud|salt|sweet|fresh|thank|fruitful/i],
  "sign-fire": [/fire/i, /tree|kindle|light|travel|remind|spark/i],
  "sign-shade": [/shade|shadow/i, /sun|stretch|spread/i],
  "sign-foam": [/foam|scum|valley|flood/i, /rain|water|metal|gold|fire/i],
  "sign-lands": [/land|soil|earth/i, /rain|water/i],
  "sign-ashes": [/ash/i, /wind|storm|blow/i],
  "sign-garden": [/garden|harvest|fruit/i, /night|morning|dawn|burn|black|struck|pick|poor|fruit/i],
  "sign-two-gardens": [/garden/i, /two|grape|palm|river|ruin|destroy/i],
  "sign-ark": [/ark|ship|boat|flood|aboard|drown|wave/i, /Nuh|Noah|flood|water|animal|two|pair|Judi|wave/i],
  "sign-sea": [/\bsea\b/i, /split|part|path|dry|cross|struck|strike|Pharaoh/i],
  "sign-springs": [/spring|manna|quail/i, /twelve|rock|stone|manna|quail|shade|desert|water/i],
  "sign-she-camel": [/she-camel|camel|Thamud/i, /Salih|Thamud|drink|sign|harm|carve/i],
  "sign-ants": [/\bants?\b/i, /valley|warn|Sulayman|smile|grateful|thank/i],
  "sign-hoopoe": [/hoopoe/i, /Saba|Sheba|letter|news|bird/i],
  "sign-dream": [/\bcows?\b|dream/i, /dream|seven|ears|grain|lean|fat|rain/i],
  "sign-cave": [/cave|sleep|slept|asleep|young men/i, /sun|sleep|slept|dog|youth|young|years|centuries|mercy|sign/i],
  "sign-elephant": [/elephant|Abrahah?|Ababil|Sijjil|105:\d|bird/i, /Ka'?bah|bird|stone|Makkah|army|straw|Fil\b|sign|Abrahah?/i],
  "sign-journeys": [/journey|caravan|travel|Quraysh|hunger|fear/i, /winter|summer|hunger|fed|food|safe|safety|House/i],
  "sign-tur": [/fire|Tuwa|valley|bush|snake/i, /Musa|mount|Tur|valley|bush|tree|snake|sandals|shoes/i],
  "sign-staff": [/staff|stick|rope/i, /swallow|magic|sorcer|trick|rope/i],
  "sign-khidr": [/Khidr|two seas|fish|boat|wall/i, /Musa|sea|fish|boat|wall|treasure|orphan|knowledge/i],
  "sign-barrier": [/barrier|wall/i, /Dhul-Qarnayn|mountain|iron|copper|Ya'?juj/i],
  "sign-yunus": [/Yunus|Dhun-Nun|fish|whale|gourd/i, /fish|whale|ship|dark|gourd|shore|believed|town/i],
  "sign-maryam": [/palm|far/i, /Maryam/i],
  "sign-dawud": [/Dawud/i, /mountain|bird|iron|armou?r|mail/i],
  "sign-house": [/House|Ka'?bah|valley|Hajj/i, /Ibrahim|Isma'?il|foundation|crops|Hajj|camel|raise|built|build/i],
  "sign-zamzam": [/Safa|Marwa|Zamzam/i, /Hajar|water|seven|sa'?i|Jurhum|sign|symbol/i],
  "sign-throne": [/throne|glass|palace/i, /Saba|Sulayman|queen|favou?r/i],
  "sign-mihrab": [/Zakariyya|Maryam/i, /mihrab|prayer room|provision|food|from Allah|good child/i],
  "sign-cool-fire": [/fire/i, /Ibrahim|furnace|cool|safe/i]
};

const SOURCES: Record<string, string[]> = {
  "sign-rain": ["Quran 35:9", "Quran 7:57"],
  "sign-clouds": ["Quran 24:43", "Quran 30:48"],
  "sign-fade": ["Quran 57:20", "Quran 18:45"],
  "sign-seed": ["Quran 2:261"],
  "sign-seas": ["Quran 25:53", "Quran 55:19", "Quran 55:20"],
  "sign-ships": ["Quran 22:65", "Quran 42:32", "Quran 45:12"],
  "sign-mountains": ["Quran 78:6", "Quran 78:7", "Quran 16:15"],
  "sign-bee": ["Quran 16:68", "Quran 16:69"],
  "sign-spider": ["Quran 29:41"],
  "sign-tree": ["Quran 14:24", "Quran 14:25", "Sahih al-Bukhari 4698"],
  "sign-look": ["Quran 88:17", "Quran 88:18", "Quran 88:19", "Quran 88:20"],
  "sign-birds": ["Quran 67:19", "Quran 16:79", "Quran 24:41"],
  "sign-sow": ["Quran 56:63", "Quran 56:64"],
  "sign-water": ["Quran 56:68", "Quran 56:69", "Quran 56:70"],
  "sign-fire": ["Quran 56:71", "Quran 56:72", "Quran 56:73", "Quran 36:80"],
  "sign-shade": ["Quran 25:45", "Quran 25:46"],
  "sign-foam": ["Quran 13:17"],
  "sign-lands": ["Quran 7:58", "Sahih al-Bukhari 79"],
  "sign-ashes": ["Quran 14:18"],
  "sign-garden": ["Quran 68:17", "Quran 68:19", "Quran 68:20", "Quran 68:24"],
  "sign-two-gardens": ["Quran 18:32", "Quran 18:33", "Quran 18:35", "Quran 18:42"],
  "sign-ark": ["Quran 11:37", "Quran 11:40", "Quran 11:42", "Quran 11:44", "Quran 54:11", "Quran 54:12", "Quran 54:13"],
  "sign-sea": ["Quran 26:61", "Quran 26:63", "Quran 20:77"],
  "sign-springs": ["Quran 2:57", "Quran 2:60", "Quran 7:160"],
  "sign-she-camel": ["Quran 26:149", "Quran 26:155", "Quran 26:156", "Quran 91:13"],
  "sign-ants": ["Quran 27:18", "Quran 27:19"],
  "sign-hoopoe": ["Quran 27:20", "Quran 27:22", "Quran 27:23", "Quran 27:28"],
  "sign-dream": ["Quran 12:43", "Quran 12:47", "Quran 12:48", "Quran 12:49"],
  "sign-cave": ["Quran 18:10", "Quran 18:11", "Quran 18:17", "Quran 18:18"],
  "sign-elephant": ["Quran 105:1", "Quran 105:2", "Quran 105:3", "Quran 105:4", "Quran 105:5", "Sahih al-Bukhari 2731"],
  "sign-journeys": ["Quran 106:1", "Quran 106:2", "Quran 106:3", "Quran 106:4"],
  "sign-tur": ["Quran 20:10", "Quran 20:12", "Quran 20:20", "Quran 27:7", "Quran 28:29", "Quran 28:30"],
  "sign-staff": ["Quran 7:117", "Quran 7:118", "Quran 20:66", "Quran 26:44", "Quran 26:45"],
  "sign-khidr": ["Quran 18:60", "Quran 18:61", "Quran 18:63", "Quran 18:71", "Quran 18:77", "Quran 18:79", "Quran 18:82"],
  "sign-barrier": ["Quran 18:93", "Quran 18:94", "Quran 18:96", "Quran 18:97"],
  "sign-yunus": ["Quran 37:140", "Quran 37:142", "Quran 21:87", "Quran 21:88", "Quran 37:145", "Quran 37:146", "Quran 37:147", "Quran 37:148"],
  "sign-maryam": ["Quran 19:22", "Quran 19:23", "Quran 19:24", "Quran 19:25", "Quran 19:26"],
  "sign-dawud": ["Quran 21:79", "Quran 21:80", "Quran 34:10", "Quran 34:11", "Quran 38:18", "Quran 38:19"],
  "sign-house": ["Quran 14:37", "Quran 2:127", "Quran 22:26", "Quran 22:27"],
  "sign-zamzam": ["Quran 2:158", "Sahih al-Bukhari 3364"],
  "sign-throne": ["Quran 27:38", "Quran 27:40", "Quran 27:41", "Quran 27:44"],
  "sign-mihrab": ["Quran 3:37", "Quran 3:38"],
  "sign-cool-fire": ["Quran 21:68", "Quran 21:69", "Quran 21:70", "Quran 37:97"]
};

const part = (kind: SignKind, name: string): SignPart => {
  const found = signArt(kind).parts.find((each) => each.name === name);
  if (!found) throw new Error(`${kind} has no ${name}`);
  return found;
};
/** A part's keyed value at `t` of its story (or `rest` when it has no such key). */
const value = (kind: SignKind, name: string, key: "opacity" | "x" | "y" | "scale" | "scaleX" | "scaleY" | "rotate", t: number, rest = key === "x" || key === "y" || key === "rotate" ? 0 : 1) => {
  const keys = part(kind, name).keys;
  const values = keys?.[key];
  return keys && values ? keyAt(keys.at, values, t) : rest;
};
const shown = (kind: SignKind, name: string, t: number) => value(kind, name, "opacity", t);
const wordAt = (kind: SignKind, t: number) => signArt(kind).words.find((word) => t >= word.from && t <= word.to)?.text;

describe("the signs in creation, alive", () => {
  afterEach(() => {
    setActiveLanguage("en");
    jest.useRealTimers();
  });

  test("every lesson with a scene is a real lesson about its sign, and opens on it", () => {
    expect(Object.keys(SIGN_LESSONS).length).toBe(319);
    for (const [nodeId, id] of Object.entries(SIGN_LESSONS)) {
      const lesson = LESSONS_BY_ID[`lesson-${nodeId}`] as Lesson | undefined;
      expect([nodeId, Boolean(lesson)]).toEqual([nodeId, true]);
      const found = signForLesson(lesson!)!;
      expect([nodeId, found?.scene.id, found?.lessonSlug]).toEqual([nodeId, id, nodeId]);
      const text = lessonText(lesson!);
      for (const about of ABOUT[id]) expect([nodeId, id, String(about), about.test(text)]).toEqual([nodeId, id, String(about), true]);
      // No other picture takes its place: no map, no day's sky, no moon's sky, and no surah's own cover.
      expect([nodeId, journeyForLesson(lesson!), hajjMapForLesson(lesson!), nodeId in DAY_SKY_LESSONS, nodeId in MOON_LESSONS, surahNumberForTitle(lesson!.title)]).toEqual([
        nodeId,
        undefined,
        undefined,
        false,
        false,
        undefined
      ]);
    }
    // Every scene has its lessons; the others keep their photo.
    const used = new Set(Object.values(SIGN_LESSONS));
    for (const each of SIGN_SCENES) expect([each.id, used.has(each.id)]).toEqual([each.id, true]);
    expect(signForLesson({ nodeId: "deep-qamar1-the-moon-split" })).toBeUndefined();
    expect(signForLesson({ nodeId: "prayer-times-fajr" })).toBeUndefined();
  });

  test("every scene says where it comes from: the ayahs it shows, and a sahih hadith the course teaches", () => {
    expect(Object.fromEntries(SIGN_SCENES.map((each) => [each.id, each.sources.map((source) => source.reference)]))).toEqual(SOURCES);
    const taught = new Set((Object.values(LESSONS_BY_ID) as Lesson[]).flatMap((lesson) => lessonSources(lesson).map((source) => source.url.split("#")[0])));
    for (const each of SIGN_SCENES) {
      for (const source of each.sources) {
        const match = /^(Sahih al-Bukhari|Quran) (\S+)$/.exec(source.reference);
        expect([source.reference, Boolean(match)]).toEqual([source.reference, true]);
        const [, book, number] = match!;
        if (book === "Quran") expect(source.url).toBe(`https://quran.com/${number.replace(":", "/")}`);
        else {
          expect(source.url).toBe(`https://sunnah.com/bukhari:${number}`);
          expect([source.reference, taught.has(source.url)]).toEqual([source.reference, true]);
        }
      }
    }
    // The date palm is the tree he ﷺ likened to the Muslim, as the lesson on it teaches.
    const palm = LESSONS_BY_ID["lesson-deep-ibrahim3-the-date-palm"] as Lesson;
    expect(lessonSources(palm).some((source) => source.url.split("#")[0] === "https://sunnah.com/bukhari:4698")).toBe(true);
  });

  test("every scene is drawn to play once and keep moving: keys in order, words one at a time, nothing that is not land, sky, sea, plant, animal or thing", () => {
    expect(Object.keys(SIGN_ART).sort()).toEqual([...new Set(SIGN_SCENES.map((each) => each.kind))].sort());
    for (const kind of Object.keys(SIGN_ART) as SignKind[]) {
      const art = signArt(kind);
      expect(art.kind).toBe(kind);
      expect([kind, art.ms >= 6000 && art.ms <= 12000]).toEqual([kind, true]);
      // Something always moves on its own: rain, waves, wind, a sway or a bee.
      expect([kind, art.parts.some((each) => each.loop)]).toEqual([kind, true]);
      for (const each of art.parts) {
        const where = `${kind} ${each.name}`;
        // Drawn shapes only: no words, pictures or links inside the drawing.
        expect([where, /<text|<image|href=|<script|<foreignObject/i.test(each.svg)]).toEqual([where, false]);
        expect([where, each.svg.length > 0]).toEqual([where, true]);
        if (each.keys) {
          const { at, ...values } = each.keys;
          expect([where, at[0] >= 0 && at[at.length - 1] <= 1 && at.every((time, index) => index === 0 || time > at[index - 1])]).toEqual([where, true]);
          for (const [key, list] of Object.entries(values)) expect([where, key, list?.length]).toEqual([where, key, at.length]);
        }
        if (each.loop) expect([where, each.loop.ms >= 400 && each.loop.ms <= 12000]).toEqual([where, true]);
        if (each.origin) expect([where, each.origin.x >= 0 && each.origin.x <= SIGN_BOX.width && each.origin.y >= 0 && each.origin.y <= SIGN_BOX.height]).toEqual([where, true]);
        if (each.clip) expect([where, each.clip.x >= 0 && each.clip.y >= 0 && each.clip.x + each.clip.w <= SIGN_BOX.width && each.clip.y + each.clip.h <= SIGN_BOX.height]).toEqual([where, true]);
      }
      // The words come one at a time, each long enough to read, the last one staying at the end.
      const { words } = art;
      expect([kind, words.length >= 2, words[0].from <= 0.15, words[words.length - 1].to]).toEqual([kind, true, true, 1]);
      words.forEach((word, index) => {
        expect([kind, word.text, word.from < word.to, word.to - word.from >= 0.1]).toEqual([kind, word.text, true, true]);
        if (index > 0) expect([kind, word.text, word.from >= words[index - 1].to]).toEqual([kind, word.text, true]);
      });
    }
  });

  test("each scene shows what its ayahs say, in their order", () => {
    // Rain on a dead land: dry and cracked, the winds drive the clouds in, the rain falls, and the land comes to life.
    expect([shown("rain", "cracks", 0), shown("rain", "dead twigs", 0), shown("rain", "green ground", 0), shown("rain", "rain", 0)]).toEqual([1, 1, 0, 0]);
    expect(value("rain", "rain clouds", "x", 0)).toBeLessThanOrEqual(-SIGN_BOX.width);
    expect([shown("rain", "winds", 0.2), value("rain", "rain clouds", "x", 0.45), shown("rain", "rain", 0.45)]).toEqual([1, 0, 1]);
    expect([shown("rain", "cracks", 1), shown("rain", "green ground", 1), shown("rain", "green hills", 1), shown("rain", "rain", 1), value("rain", "flowers", "scaleY", 1)]).toEqual([0, 1, 1, 0, 1]);
    expect(value("rain", "rain clouds", "x", 1)).toBeGreaterThanOrEqual(SIGN_BOX.width);
    expect([wordAt("rain", 0.1), wordAt("rain", 0.45), wordAt("rain", 1)]).toEqual(["A dead land", "The rain falls", "The land comes to life"]);

    // The clouds: four small ones driven together, piled up into one, and the rain from within it.
    const small = ["cloud 1", "cloud 2", "cloud 3", "cloud 4"];
    expect(small.map((name) => shown("clouds", name, 0))).toEqual([1, 1, 1, 1]);
    expect(small.map((name) => shown("clouds", name, 1))).toEqual([0, 0, 0, 0]);
    expect([value("clouds", "heap", "scale", 0.3), value("clouds", "heap", "scale", 1), shown("clouds", "rain", 0.5), shown("clouds", "rain", 1)]).toEqual([0, 1, 0, 1]);
    // The rain falls only from under the great cloud.
    const clip = part("clouds", "rain").clip!;
    expect(clip.x >= 40 && clip.x + clip.w <= 130 && clip.y >= 56).toBe(true);
    expect([wordAt("clouds", 0.2), wordAt("clouds", 0.4), wordAt("clouds", 0.5), wordAt("clouds", 1)]).toEqual(["Allah drives the clouds", "He brings them together", "He piles them up", "Rain comes out from within"]);

    // Green, then yellow, then broken straw, then scattered by the winds.
    const crops = (t: number) => ["green crops", "yellow crops", "broken straw"].map((name) => shown("fade", name, t));
    expect([crops(0.3), crops(0.6), crops(0.75), crops(1)]).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 0]
    ]);
    expect([shown("fade", "straw blown away", 0.85), shown("fade", "winds", 0.85)]).toEqual([1, 1]);

    // One seed, seven ears, ripe at the end.
    const ears = signArt("seed").parts.filter((each) => /^green ear \d$/.test(each.name));
    expect(ears.length).toBe(7);
    expect(ears.map((each) => (each.svg.match(/<ellipse/g) ?? []).length)).toEqual([1, 1, 1, 1, 1, 1, 1]);
    expect((part("seed", "ripe ears").svg.match(/<ellipse/g) ?? []).length).toBe(7);
    expect([value("seed", "seed", "scale", 0.1), shown("seed", "ripe ears", 0.5), shown("seed", "ripe ears", 1)]).toEqual([1, 0, 1]);

    // Two seas, sweet and salty, and the barrier between them; fish in each.
    expect([shown("seas", "barrier", 0.1), shown("seas", "barrier", 1), shown("seas", "river fish", 1), shown("seas", "sea fish", 1)]).toEqual([0, 1, 1, 1]);

    // Ships on the sea, the tall one sailing in.
    expect([value("ships", "tall ship", "x", 0) < -SIGN_BOX.width / 2, value("ships", "tall ship", "x", 0.4)]).toEqual([true, 0]);

    // The earth spread out, then three mountains set on it, then the tent's pegs.
    expect([value("mountains", "the earth", "scaleX", 0.05) < 0.2, value("mountains", "the earth", "scaleX", 0.3)]).toEqual([true, 1]);
    for (const name of ["mountain 1", "mountain 2", "mountain 3"]) expect([name, shown("mountains", name, 0.28), value("mountains", name, "y", 0.6), shown("mountains", name, 1)]).toEqual([name, 0, 0, 1]);
    expect([shown("mountains", "pegs", 0.5), shown("mountains", "pegs", 1), wordAt("mountains", 0.7)]).toEqual([0, 1, "Like pegs"]);

    // The bees fly out to the flowers and home again; honey of three colors drips from the comb.
    for (const name of ["bee 1", "bee 2", "bee 3"]) {
      const keys = part("bee", name).keys!;
      expect([name, keys.x![1], keys.x![keys.x!.length - 1], Math.max(...keys.x!) > 15]).toEqual([name, 0, 0, true]);
    }
    const honey = ["golden honey", "amber honey", "dark honey"];
    expect(honey.map((name) => shown("bee", name, 0.5))).toEqual([0, 0, 0]);
    expect(honey.map((name) => shown("bee", name, 1))).toEqual([1, 1, 1]);
    expect(new Set(honey.map((name) => /fill="(#[0-9A-F]{6})"/i.exec(part("bee", name).svg)?.[1])).size).toBe(3);

    // The spider builds its web, and a breath of wind shakes it.
    expect([shown("spider", "web", 0.05), shown("spider", "web", 0.5), value("spider", "spider", "y", 1)]).toEqual([0, 1, 0]);
    expect([shown("spider", "winds", 0.7), wordAt("spider", 0.7)]).toEqual([1, "The weakest of houses"]);

    // The good tree: its root first, then its trunk and branches up into the sky, then its fruit.
    expect([value("tree", "roots", "scale", 0.26), value("tree", "palm", "scale", 0.26), value("tree", "palm", "scale", 0.55), shown("tree", "dates", 0.55), shown("tree", "dates", 1)]).toEqual([1, 0, 1, 0, 1]);

    // The camels, the sky, the mountains and the earth: each shown while its words are.
    const look: [string, () => boolean][] = [
      ["The camels, how they were created", () => value("look", "camel", "x", 0.25) === 0 && value("look", "camel behind", "x", 0.25) === 0],
      ["The sky, how it was raised", () => shown("look", "sky raised high", 0.2) === 0 && value("look", "sky raised high", "y", 0.47) === 0],
      ["The mountains, how they were set firm", () => shown("look", "mountains", 0.45) === 0 && value("look", "mountains", "y", 0.67) === 0],
      ["The earth, how it was spread out", () => shown("look", "ripple 1", 0.72) === 1]
    ];
    expect(signArt("look").words.map((word) => word.text)).toEqual(look.map(([text]) => text));
    for (const [text, check] of look) expect([text, check()]).toEqual([text, true]);

    // The birds rise into the sky beating their wings, glide with them spread, fold them in, and are held up at the end.
    for (const bird of ["swallow", "small swallow"]) {
      const beats = part("birds", `${bird} right wing`).keys!;
      const early = beats.rotate!.filter((_, index) => beats.at[index] <= 0.24);
      const turns = early.filter((angle, index) => index > 0 && Math.sign(angle) !== Math.sign(early[index - 1]) && angle !== 0).length;
      expect([bird, turns >= 8]).toEqual([bird, true]);
      expect([value("birds", `${bird} right wing`, "rotate", 0.42), value("birds", `${bird} right wing`, "scaleX", 0.42)]).toEqual([-8, 1]);
      expect([value("birds", `${bird} right wing`, "rotate", 0.59) > 30, value("birds", `${bird} right wing`, "scaleX", 0.59) < 0.5]).toEqual([true, true]);
      expect([value("birds", `${bird} left wing`, "rotate", 0.59) < -30, value("birds", `${bird} right wing`, "rotate", 1), value("birds", `${bird} right wing`, "scaleX", 1)]).toEqual([true, -8, 1]);
      // Its body and wings go together.
      for (const t of [0.1, 0.3, 0.6, 0.9]) {
        const at = (name: string) => [value("birds", name, "x", t), value("birds", name, "y", t)];
        expect([bird, t, at(`${bird} left wing`), at(`${bird} right wing`)]).toEqual([bird, t, at(bird), at(bird)]);
      }
      expect([value("birds", bird, "y", 0) > 50, Math.abs(value("birds", bird, "y", 1)) <= 5]).toEqual([true, true]);
    }
    expect([wordAt("birds", 0.42), wordAt("birds", 0.62), wordAt("birds", 1)]).toEqual(["Their wings spread", "And folded in", "None holds them up but the Most Merciful"]);

    // The seed sown: thrown onto the furrows, covered with earth, then shoots, then wheat with its ears.
    expect([shown("sow", "near seeds", 0.02), shown("sow", "near seeds", 0.3), value("sow", "near seeds", "scale", 0.3), shown("sow", "near seeds", 0.45)]).toEqual([0, 1, 1, 0]);
    expect([shown("sow", "earth over the seeds", 0.3), shown("sow", "earth over the seeds", 0.45), value("sow", "near shoots", "scaleY", 0.4), value("sow", "near shoots", "scaleY", 0.6)]).toEqual([0, 1, 0, 1]);
    expect([value("sow", "near wheat", "scaleY", 0.6), value("sow", "near wheat", "scaleY", 0.85), shown("sow", "ears", 0.7), shown("sow", "ears", 1)]).toEqual([0, 1, 0, 1]);
    expect([wordAt("sow", 0.2), wordAt("sow", 0.5), wordAt("sow", 1)]).toEqual(["The seed you sow", "Who makes it grow?", "Allah makes it grow"]);

    // The water: rain from the clouds fills the pool, then the land turns green and a camel comes to drink.
    expect([shown("water", "rain", 0.1), shown("water", "rain", 0.45), shown("water", "rain", 1)]).toEqual([0, 1, 0]);
    expect([value("water", "pool", "scale", 0.1) < 1, value("water", "pool", "scale", 1), value("water", "camel", "x", 0.5) <= -100, value("water", "camel", "x", 1)]).toEqual([true, 1, true, 0]);
    expect([value("water", "grass and flowers", "scaleY", 0.5), value("water", "grass and flowers", "scaleY", 1), wordAt("water", 0.45), wordAt("water", 0.65)]).toEqual([
      0,
      1,
      "Down from the clouds",
      "Sweet, not salty"
    ]);

    // The fire: a green branch rubbed on another sparks, the fire grows, the green tree it came from shows, and the
    // travelers by their tent are lit by it.
    const rubs = part("fire", "rubbing branch").keys!;
    expect(new Set(rubs.x!.filter((_, index) => rubs.at[index] >= 0.06 && rubs.at[index] <= 0.24)).size).toBe(2);
    expect([shown("fire", "sparks", 0.2), shown("fire", "rubbing branch", 0.4), value("fire", "fire", "scale", 0.2), value("fire", "fire", "scale", 0.5)]).toEqual([1, 0, 0, 1]);
    expect([shown("fire", "green tree", 0.2), shown("fire", "green tree", 0.45), shown("fire", "travelers in the firelight", 0.7), shown("fire", "travelers in the firelight", 1)]).toEqual([0, 1, 0, 1]);
    expect([wordAt("fire", 0.45), wordAt("fire", 1)]).toEqual(["From the green tree", "A gift for travelers"]);

    // The shade: the land in shade, the palm's shadow stretched out long as the sun comes up, then drawn in, little by
    // little, as the sun climbs.
    const stretch = (t: number) => value("shade", "palm's shadow", "scaleX", t);
    expect([shown("shade", "land in shade", 0), shown("shade", "land in shade", 0.4), stretch(0.05), stretch(0.35)]).toEqual([1, 0, 0, 1]);
    expect([stretch(0.66) < stretch(0.4), stretch(1) < stretch(0.66), stretch(1) > 0]).toEqual([true, true, true]);
    const sunY = (t: number) => value("shade", "sun", "y", t);
    expect([sunY(0), sunY(0.4) < 0, sunY(0.66) < sunY(0.4), sunY(1) < sunY(0.66)]).toEqual([0, true, true, true]);

    // The foam: rain fills the valleys, the big one's stream wider; foam rides the flood and the melted gold, then
    // passes away, and the clear water, the green bank and the shining gold remain.
    expect(part("foam", "streams").svg).toMatch(/stroke-width="7"[\s\S]*stroke-width="3"/);
    expect([shown("foam", "rain", 0.1), shown("foam", "rain", 0.5), value("foam", "streams", "scaleY", 0.2)]).toEqual([1, 0, 1]);
    for (const name of ["foam", "foam on the gold"]) {
      expect([name, shown("foam", name, 0.2), shown("foam", name, 0.4), shown("foam", name, 0.8), value("foam", name, "x", 0.6) > value("foam", name, "x", 0.4)]).toEqual([name, 0, 1, 0, true]);
    }
    expect([shown("foam", "clear water", 0.4), shown("foam", "clear water", 1), value("foam", "plants", "scaleY", 1), shown("foam", "gold shining", 1)]).toEqual([0, 1, 1, 1]);

    // The three lands, each in its turn: the good one grows grass, the hard one holds the water (a goat drinks), the
    // barren one keeps nothing; then all three together.
    const dimmed = (t: number) => ["good land dimmed", "hard land dimmed", "barren land dimmed"].map((name) => shown("lands", name, t));
    expect([dimmed(0.2), dimmed(0.42), dimmed(0.64), dimmed(0.86), dimmed(1)]).toEqual([
      [0, 0, 0],
      [0, 1, 1],
      [1, 0, 1],
      [1, 1, 0],
      [0, 0, 0]
    ]);
    expect([shown("lands", "rain", 0.15), shown("lands", "rain", 0.4), value("lands", "grass on the good land", "scaleY", 0.3), value("lands", "grass on the good land", "scaleY", 0.5)]).toEqual([1, 0, 0, 1]);
    expect([value("lands", "water held in the hard land", "scale", 0.35), value("lands", "water held in the hard land", "scale", 1), value("lands", "goat", "x", 0.5) < -50, value("lands", "goat", "x", 0.7)]).toEqual([
      1,
      1,
      true,
      0
    ]);
    expect(signArt("lands").words.map((word) => word.text)).toEqual(["Rain falls on three lands", "Good land grows grass", "Hard land holds water", "Barren land keeps nothing"]);

    // The ashes: a heap, then a stormy wind that blows it all away; standing still, the wind is blowing it.
    const puffs = signArt("ashes").parts.filter((each) => /^ash \d$/.test(each.name));
    expect(puffs.length).toBe(4);
    expect([value("ashes", "heap of ashes", "scaleY", 0.4), value("ashes", "heap of ashes", "scaleY", 1), shown("ashes", "stormy wind", 0.3), shown("ashes", "stormy wind", 0.6)]).toEqual([1, 0, 0, 1]);
    expect(puffs.map((each) => shown("ashes", each.name, 1))).toEqual([0, 0, 0, 0]);
    const still = signArt("ashes").stillAt!;
    expect([wordAt("ashes", still), puffs.some((each) => shown("ashes", each.name, still) === 1 && value("ashes", each.name, "x", still) > 0)]).toEqual(["A stormy wind blows", true]);

    // The garden: full of fruit by day, struck in the night, black and bare by the morning.
    expect([shown("garden", "fruit", 0.3), shown("garden", "trees", 0.3), shown("garden", "night", 0.2), shown("garden", "night", 0.5) > 0.5, shown("garden", "the blow by night", 0.5)]).toEqual([1, 1, 0, true, 1]);
    expect([shown("garden", "fruit", 0.7), shown("garden", "trees", 0.7), shown("garden", "burnt trees", 0.7), shown("garden", "burnt trees", 1), shown("garden", "night", 1)]).toEqual([0, 0, 1, 1, 0]);

    // The two gardens: grapes, then palms around and crops between, then the river; then the fruit gone and the vines
    // fallen on their trellises in a storm.
    expect([shown("twoGardens", "grapes", 0.3), value("twoGardens", "palms", "scaleY", 0.2), value("twoGardens", "palms", "scaleY", 0.45), value("twoGardens", "crops", "scaleY", 0.5)]).toEqual([1, 0, 1, 1]);
    expect([value("twoGardens", "river", "scaleY", 0.45), value("twoGardens", "river", "scaleY", 0.65), shown("twoGardens", "stormy sky", 0.6), shown("twoGardens", "stormy sky", 1)]).toEqual([0, 1, 0, 1]);
    expect([shown("twoGardens", "grapes", 1), value("twoGardens", "crops", "scaleY", 1) < 0.5, shown("twoGardens", "left vines", 1), shown("twoGardens", "left vines fallen", 1)]).toEqual([0, true, 0, 1]);
    expect([value("twoGardens", "left vines fallen", "rotate", 1) < 0, value("twoGardens", "right vines fallen", "rotate", 1) > 0]).toEqual([true, true]);
  });

  test("the stories' scenes show each moment in its order, and draw no Prophet and no person", () => {
    const stories: SignKind[] = ["ark", "sea", "springs", "sheCamel", "ants", "hoopoe", "dream", "cave", "elephant", "journeys"];
    for (const kind of stories) {
      for (const each of signArt(kind).parts) {
        expect([kind, each.name, /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|sleepers?|angels?|child|children|boy|girl|face)\b/i.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    // The ark: built plank by plank on dry land, the animals in by the ramp two by two, then the flood and the waves,
    // the ark afloat, and at the end at rest on al-Judi as the water goes down.
    expect([shown("ark", "keel planks", 0.02), shown("ark", "keel planks", 0.1), shown("ark", "house on the ark", 0.17), shown("ark", "ramp", 0.2)]).toEqual([0, 1, 1, 1]);
    for (const name of ["first camel", "second camel", "first sheep", "second sheep"]) {
      expect([name, value("ark", name, "x", 0.1) <= -60, shown("ark", name, 0.4)]).toEqual([name, true, 0]);
    }
    expect([value("ark", "first camel", "x", 0.25), value("ark", "second sheep", "x", 0.33)]).toEqual([0, 0]);
    expect([value("ark", "flood", "y", 0.3), value("ark", "flood", "y", 0.6), shown("ark", "pouring water", 0.45), value("ark", "springs", "scaleY", 0.5)]).toEqual([58, 0, 1, 1]);
    expect([shown("ark", "ark afloat", 0.6), value("ark", "ark afloat", "y", 0.6), shown("ark", "great waves", 0.64)]).toEqual([1, -30, 1]);
    expect([shown("ark", "ark afloat", 1), shown("ark", "ark on al-Judi", 1), value("ark", "flood", "y", 1), value("ark", "springs", "scaleY", 1), shown("ark", "pouring water", 1)]).toEqual([0, 1, 58, 0, 0]);
    expect(signArt("ark").words.map((word) => word.text)).toEqual(["Build the ark", "Of each kind, two", "The gates of the sky opened", "Waves like mountains", "It came to rest on al-Judi"]);

    // The sea: calm before them, then split, its walls risen like mountains on each side, and a dry path between.
    expect([shown("sea", "left wall of water", 0.2), shown("sea", "right wall of water", 0.2), shown("sea", "dry path", 0.2)]).toEqual([0, 0, 0]);
    expect([value("sea", "left wall of water", "scaleY", 0.5), value("sea", "right wall of water", "scaleY", 0.5), shown("sea", "dry path", 0.5), shown("sea", "foam on the crests", 0.6)]).toEqual([1, 1, 1, 1]);
    expect([wordAt("sea", 0.1), wordAt("sea", 0.3), wordAt("sea", 0.6), wordAt("sea", 1)]).toEqual(["The sea before them", "The sea split", "Each side like a great mountain", "A dry path through the sea"]);

    // The springs: the clouds come over, the manna falls and the quails come down, then twelve streams run from the
    // rock to twelve pools.
    expect([value("springs", "clouds", "x", 0) <= -SIGN_BOX.width, value("springs", "clouds", "x", 0.25), shown("springs", "quails", 0.2), value("springs", "quails", "x", 0.5)]).toEqual([true, 0, 0, 0]);
    expect([shown("springs", "manna falling", 0.36), value("springs", "twelve springs", "scale", 0.5), value("springs", "twelve springs", "scale", 0.7), value("springs", "twelve pools", "scaleY", 0.8)]).toEqual([
      1, 0, 1, 1
    ]);
    expect([(part("springs", "twelve springs").svg.match(/M/g) ?? []).length, (part("springs", "twelve pools").svg.match(/<ellipse/g) ?? []).length]).toEqual([12, 12]);

    // The she-camel: she comes and drinks the trough down on her day; by night it fills, and the people's jars come on theirs.
    expect([value("sheCamel", "she-camel drinking", "x", 0.2) >= 70, value("sheCamel", "she-camel drinking", "x", 0.5), value("sheCamel", "water in the trough", "scaleY", 0.68) < 0.5]).toEqual([true, 0, true]);
    expect([value("sheCamel", "water in the trough", "scaleY", 0.85), shown("sheCamel", "water jars", 0.6), shown("sheCamel", "water jars", 0.85), shown("sheCamel", "she-camel grazing", 0.9)]).toEqual([1, 0, 1, 1]);
    expect([wordAt("sheCamel", 0.5), wordAt("sheCamel", 0.7), wordAt("sheCamel", 1)]).toEqual(["Her day to drink", "Your day to drink", "Do not harm her"]);

    // The ants: the line at work, the ant's warning, all of them gone in before the army's dust passes.
    expect([shown("ants", "the ant who warned", 0.4), shown("ants", "her call", 0.4), shown("ants", "ants carrying seeds", 0.4), shown("ants", "ants carrying seeds", 0.6)]).toEqual([1, 1, 1, 0]);
    const hurrying = signArt("ants").parts.filter((each) => /^ant hurrying home \d$/.test(each.name));
    expect(hurrying.length).toBe(6);
    expect(hurrying.map((each) => [shown("ants", each.name, 0.45), shown("ants", each.name, 0.75)])).toEqual(hurrying.map(() => [0, 0]));
    expect([shown("ants", "the ant who warned", 0.8), shown("ants", "army's dust", 0.6), value("ants", "army's dust", "x", 0.8) > value("ants", "army's dust", "x", 0.5)]).toEqual([0, 1, true]);

    // The hoopoe: its place empty, then back from far off by Saba, then off again with the letter.
    expect([
      shown("hoopoe", "the hoopoe coming back", 0.1),
      shown("hoopoe", "the hoopoe coming back", 0.5),
      value("hoopoe", "the hoopoe coming back", "x", 0.5),
      shown("hoopoe", "the letter", 0.4),
      shown("hoopoe", "the letter", 0.6)
    ]).toEqual([0, 1, 0, 0, 1]);
    expect([value("hoopoe", "the hoopoe flying off", "x", 0.9), value("hoopoe", "the letter", "x", 0.9), shown("hoopoe", "the hoopoe flying off", 1), shown("hoopoe", "the letter", 1)]).toEqual([64, 64, 0, 0]);

    // The dream: seven fat cows, eaten by seven lean ones; seven green ears and seven dry; then the grain stored by day,
    // and the rain.
    const herd = (name: string) => (part("dream", name).svg.match(/<g transform/g) ?? []).length;
    expect([herd("seven fat cows"), herd("seven lean cows"), herd("seven green ears"), herd("seven dry ears")]).toEqual([7, 7, 7, 7]);
    expect([shown("dream", "seven fat cows", 0.1), value("dream", "seven lean cows", "x", 0.1), value("dream", "seven lean cows", "x", 0.35), shown("dream", "seven fat cows", 0.5)]).toEqual([1, 170, 0, 0]);
    expect([value("dream", "seven green ears", "scaleY", 0.5), value("dream", "seven dry ears", "scaleY", 0.55), shown("dream", "storehouse", 0.7), shown("dream", "rain", 0.9)]).toEqual([1, 1, 1, 1]);

    // The cave: nights and days pass over it, the sun always going over the far side, the dog at the entrance throughout.
    expect([part("cave", "their dog").keys, shown("cave", "night", 0.34) > 0.5, shown("cave", "night", 0.5), shown("cave", "sun, first day", 0.1)]).toEqual([undefined, true, 0, 1]);
    expect([value("cave", "bush growing over the years", "scale", 0.2), value("cave", "bush growing over the years", "scale", 1)]).toEqual([0.4, 1]);

    // The elephant: it comes and kneels, held back; the flocks come only after; the stones, then the straw; it stays
    // kneeling.
    expect([value("elephant", "the elephant", "x", 0) >= 100, value("elephant", "the elephant", "x", 0.2), value("elephant", "the elephant", "scaleY", 0.4) < 1, shown("elephant", "the elephant", 1)]).toEqual([
      true,
      0,
      true,
      1
    ]);
    for (const name of ["first flock", "second flock", "third flock"]) expect([name, value("elephant", name, "x", 0.3) <= -200, value("elephant", name, "x", 0.66)]).toEqual([name, true, 0]);
    expect([shown("elephant", "stones of baked clay", 0.7), shown("elephant", "eaten straw", 0.7), shown("elephant", "eaten straw", 1), shown("elephant", "army's dust", 1)]).toEqual([1, 0, 1, 0]);

    // The journeys: south in winter, north in summer, home with food, and the doves of the safe city.
    expect([value("journeys", "winter caravan", "x", 0.13) < 0, value("journeys", "summer caravan", "x", 0.2), value("journeys", "summer caravan", "x", 0.5), value("journeys", "caravan home", "x", 0.7)]).toEqual([
      true,
      -90,
      170,
      0
    ]);
    expect([shown("journeys", "food brought home", 0.6), shown("journeys", "food brought home", 0.8), shown("journeys", "doves, safe", 0.9)]).toEqual([0, 1, 1]);
    expect(signArt("journeys").words.map((word) => word.text)).toEqual(["The winter journey", "The summer journey", "Fed against hunger", "Safe from fear"]);
  });

  test("the Prophets' scenes show each moment in its order, and draw no Prophet and no person", () => {
    const prophets: SignKind[] = ["tur", "staff", "khidr", "barrier", "yunus", "maryam"];
    for (const kind of prophets) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|soldiers?|sorcerers?|magicians?|helper|servant|angels?|child|children|boy|girl|baby|face|hand)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    // At Tur: a cold, dark night; a fire far off on the side of the mount; near, the fire in the green tree he was
    // called from; the holy valley lit; and the staff thrown down there becomes a snake.
    expect(words("tur")).toEqual(["A cold, dark night", "A fire on the side of the mountain", "Called from the tree", "The holy valley of Tuwa", "The staff became a snake"]);
    expect([shown("tur", "far fire", 0.1), shown("tur", "far fire", 0.3), shown("tur", "fire in the bush", 0.3), shown("tur", "far fire", 0.5), shown("tur", "fire in the bush", 0.5)]).toEqual([0, 1, 0, 0, 1]);
    expect([value("tur", "green bush", "scale", 0.3) < 0.5, value("tur", "green bush", "scale", 0.5), shown("tur", "holy valley lit", 0.5), shown("tur", "holy valley lit", 0.7)]).toEqual([true, 1, 0, 1]);
    expect([shown("tur", "staff", 0.84), shown("tur", "snake", 0.84), shown("tur", "staff", 1), shown("tur", "snake", 1)]).toEqual([1, 0, 0, 1]);
    // The staff: their ropes and staffs thrown down, then seeming to move; Musa's staff thrown, the serpent it became
    // swallowing all on the right, then all on the left; and the truth stands.
    expect(words("staff")).toEqual(["Their ropes and staffs", "They seemed to move", "Musa threw down his staff", "It swallowed what they faked", "The truth stood firm"]);
    const sides = (t: number) => ["ropes and staffs thrown, left", "ropes and staffs thrown, right", "seeming to move, left", "seeming to move, right"].map((name) => shown("staff", name, t));
    expect([sides(0.15), sides(0.35), sides(0.6)]).toEqual([
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1]
    ]);
    expect([shown("staff", "Musa's staff", 0.49), shown("staff", "great serpent", 0.49), shown("staff", "Musa's staff", 0.6), shown("staff", "great serpent", 0.6)]).toEqual([1, 0, 0, 1]);
    expect([value("staff", "great serpent", "x", 0.69), sides(0.69), value("staff", "great serpent", "x", 0.77), value("staff", "great serpent", "scaleX", 0.77), sides(0.77)]).toEqual([34, [0, 0, 1, 0], -40, -1, [0, 0, 0, 0]]);
    expect([value("staff", "great serpent", "x", 1), value("staff", "great serpent", "scaleX", 1), shown("staff", "the truth stands", 0.8), shown("staff", "the truth stands", 1)]).toEqual([0, 1, 0, 1]);
    // Where the two seas meet: the fish on the rock, then into the sea along its tunnel; the boat, its plank pulled out
    // and a hole left; the town, its wall leaning about to fall, set straight; and the orphans' treasure beneath it.
    expect(words("khidr")).toEqual(["Where the two seas meet", "The fish took its way into the sea", "A hole in the boat", "A wall about to fall", "It was set straight", "The orphans' treasure beneath"]);
    expect([value("khidr", "the fish", "x", 0.1), shown("khidr", "tunnel in the sea", 0.1), value("khidr", "the fish", "x", 0.3) > 38, shown("khidr", "tunnel in the sea", 0.3), shown("khidr", "the fish", 0.4)]).toEqual([0, 0, true, 1, 0]);
    expect([shown("khidr", "boat", 0.44), shown("khidr", "plank pulled out", 0.44), shown("khidr", "hole in the boat", 0.44), shown("khidr", "plank pulled out", 0.52), shown("khidr", "hole in the boat", 0.52)]).toEqual([1, 1, 0, 0, 1]);
    expect([shown("khidr", "the town", 0.5), shown("khidr", "the town", 0.6), value("khidr", "wall about to fall", "rotate", 0.6), shown("khidr", "cracks", 0.6)]).toEqual([0, 1, 8, 1]);
    expect([value("khidr", "wall about to fall", "rotate", 0.8), shown("khidr", "cracks", 0.8), shown("khidr", "the orphans' treasure", 0.8), shown("khidr", "the orphans' treasure", 1)]).toEqual([0, 0, 0, 1]);
    // The barrier: the gap between two mountains, filled row by row with iron, blown upon until like fire, molten
    // copper poured over it from both sides, and it stands.
    expect(words("barrier")).toEqual(["Between two mountains", "Blocks of iron", "Blown until it was like fire", "Molten copper poured over it", "They could not climb over it"]);
    const rows = (t: number) => [1, 2, 3, 4].map((row) => shown("barrier", `blocks of iron, row ${row}`, t));
    expect([rows(0.19), rows(0.27), rows(0.36)]).toEqual([
      [0, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 1, 1, 1]
    ]);
    expect([shown("barrier", "iron like fire", 0.36), shown("barrier", "iron like fire", 0.5), shown("barrier", "fires at the foot", 0.5), shown("barrier", "molten copper", 0.5)]).toEqual([0, 1, 1, 0]);
    expect([value("barrier", "left pot", "rotate", 0.7) > 0, value("barrier", "right pot", "rotate", 0.7) < 0, shown("barrier", "molten copper", 0.74), value("barrier", "molten copper", "scaleY", 0.74)]).toEqual([true, true, 1, 1]);
    expect(["iron like fire", "molten copper", "left pot", "barrier of iron and copper", "shine"].map((name) => shown("barrier", name, 1))).toEqual([0, 0, 0, 1, 1]);
    // Filled level with the two mountains, up to their tops (18:96, as Ibn Kathir explains it, and the lesson teaches):
    // the top row of iron starts where the mountains' inner sides do, at their tops (y 50, their ridges at 49 to 51).
    const mountains = part("barrier", "two mountains").svg;
    expect([part("barrier", "blocks of iron, row 4").svg.startsWith('<path d="M44 50 L116 50 '), mountains.includes("44 50 L64 96"), mountains.includes("116 50 L96 96")]).toEqual([true, true, true]);
    // Yunus: the laden ship; the great fish rising by it; the darknesses, the fish deep down; then the open shore it
    // comes to, the gourd plant growing there, and far off the town of his people, who believed.
    expect(words("yunus")).toEqual(["The laden ship", "A great fish", "In the darknesses", "Cast on the open shore", "A gourd plant grew", "His people believed"]);
    expect([shown("yunus", "laden ship", 0.1), shown("yunus", "great fish", 0.1), shown("yunus", "great fish", 0.26), shown("yunus", "laden ship", 0.26)]).toEqual([1, 0, 1, 1]);
    expect([shown("yunus", "the darknesses", 0.45), value("yunus", "great fish", "y", 0.45), shown("yunus", "laden ship", 0.45), shown("yunus", "open shore", 0.45)]).toEqual([0.8, 16, 0, 0]);
    expect([shown("yunus", "the darknesses", 0.6), shown("yunus", "open shore", 0.6), value("yunus", "great fish", "x", 0.6), shown("yunus", "gourd plant", 0.6)]).toEqual([0, 1, 56, 0]);
    expect([shown("yunus", "great fish", 0.8), shown("yunus", "gourd plant", 0.8), value("yunus", "gourd plant", "scale", 0.8), shown("yunus", "far town", 0.8), shown("yunus", "far town", 1)]).toEqual([0, 1, 1, 0, 1]);
    // Maryam: the palm tree in a place far away; a stream beneath; the trunk shaken, and fresh ripe dates fall to the
    // ground by it.
    expect(words("maryam")).toEqual(["A place far away", "By the trunk of a palm tree", "A stream beneath", "Fresh ripe dates fell", "Eat, drink and be glad"]);
    expect([shown("maryam", "stream beneath", 0.3), shown("maryam", "stream beneath", 0.5), value("maryam", "stream beneath", "scaleX", 0.6), shown("maryam", "green by the stream", 0.6)]).toEqual([0, 1, 1, 1]);
    const dates = signArt("maryam").parts.filter((each) => /^falling date \d$/.test(each.name));
    expect(dates.length).toBe(4);
    expect([shown("maryam", "ripe dates", 0.5), shown("maryam", "ripe dates", 0.62), value("maryam", "palm tree", "rotate", 0.5), value("maryam", "palm tree", "rotate", 0.61) !== 0]).toEqual([0, 1, 0, true]);
    expect(dates.map((each) => [value("maryam", each.name, "y", 0.6), value("maryam", each.name, "y", 0.8) > 40])).toEqual(dates.map(() => [0, true]));
    expect([shown("maryam", "a calm light", 0.8), shown("maryam", "a calm light", 1)]).toEqual([0, 1]);
  });

  test("the scenes of Allah's favors to His Prophets show each moment in its order, and draw no Prophet and no person", () => {
    const favors: SignKind[] = ["dawud", "house", "zamzam", "throne", "mihrab", "cool-fire"];
    for (const kind of favors) {
      for (const each of signArt(kind).parts) {
        const person = /\b(prophet|man|men|woman|women|person|people|king|queen|soldiers?|helper|servant|angels?|jinn|child|children|boy|girl|baby|mother|father|son|face|hand|feet|foot)\b/i;
        expect([kind, each.name, person.test(each.name)]).toEqual([kind, each.name, false]);
      }
    }
    const words = (kind: SignKind) => signArt(kind).words.map((word) => word.text);
    // Dawud: the mountains glorifying, the birds gathered in, the iron glowing and bending, then the coat of mail, its
    // rings joined row by row from the top, and shining.
    expect(words("dawud")).toEqual(["The mountains glorified with him", "And the birds, gathered", "Iron made soft for him", "Make coats of mail", "The rings just right"]);
    expect([shown("dawud", "praise from the mountains", 0.15), shown("dawud", "birds gathered, left", 0.2), shown("dawud", "birds gathered, left", 0.35), value("dawud", "birds gathered, right", "x", 0.2), value("dawud", "birds gathered, right", "x", 0.35)]).toEqual([1, 0, 1, 44, 0]);
    expect([shown("dawud", "iron", 0.45), shown("dawud", "iron bending", 0.45), shown("dawud", "iron", 0.56), shown("dawud", "iron bending", 0.56), shown("dawud", "coat of mail", 0.56)]).toEqual([1, 0, 0, 1, 0]);
    const bands = [1, 2, 3, 4].map((band) => `rings of the coat, band ${band}`);
    expect([bands.map((name) => shown("dawud", name, 0.62)), bands.map((name) => shown("dawud", name, 0.7) === 1), bands.map((name) => shown("dawud", name, 0.8))]).toEqual([
      [0, 0, 0, 0],
      [true, false, false, false],
      [1, 1, 1, 1]
    ]);
    expect([shown("dawud", "iron bending", 0.8), shown("dawud", "coat of mail", 1), shown("dawud", "rings shining", 0.8), shown("dawud", "rings shining", 1)]).toEqual([0, 1, 0, 1]);
    // The House: a dry valley; its stones rising course by course, from the ground up; accepted; the call going out;
    // and the camels coming from every side, along the paths.
    expect(words("house")).toEqual(["A valley without crops", "Raising the foundations of the House", "Our Lord, accept from us", "Proclaim the Hajj to the people", "From every distant path"]);
    const courses = [1, 2, 3, 4, 5].map((course) => `stones of the House, course ${course}`);
    expect([courses.map((name) => shown("house", name, 0.18)), courses.map((name) => shown("house", name, 0.32) === 1), courses.map((name) => shown("house", name, 0.5))]).toEqual([
      [0, 0, 0, 0, 0],
      [true, true, false, false, false],
      [1, 1, 1, 1, 1]
    ]);
    expect([shown("house", "accepted", 0.5), shown("house", "accepted", 0.62), shown("house", "the call going out, 1", 0.66), shown("house", "the call going out, 1", 0.7) > 0]).toEqual([0, 1, 0, true]);
    expect([shown("house", "camel coming, left", 0.8), shown("house", "paths to the House", 0.8), shown("house", "camel coming, left", 1), value("house", "camel coming, left", "x", 1), shown("house", "paths to the House", 1)]).toEqual([0, 0, 1, 0, 1]);
    // Safa and Marwah: the footsteps going between them, counted seven times; then the water of Zamzam; then a bird
    // circling over it.
    expect(words("zamzam")).toEqual(["Safa and Marwah", "Seven times between them", "The water of Zamzam", "A bird circling over the water"]);
    const times = [1, 2, 3, 4, 5, 6, 7].map((time) => `time ${time}`);
    expect([times.map((name) => shown("zamzam", name, 0.2)), times.filter((name) => shown("zamzam", name, 0.4) === 1).length, times.map((name) => shown("zamzam", name, 0.55))]).toEqual([[0, 0, 0, 0, 0, 0, 0], 4, [1, 1, 1, 1, 1, 1, 1]]);
    expect([shown("zamzam", "footsteps between them", 0.3), shown("zamzam", "the water of Zamzam", 0.58), shown("zamzam", "footsteps between them", 0.7), shown("zamzam", "the water of Zamzam", 0.7)]).toEqual([1, 0, 0, 1]);
    expect([shown("zamzam", "a bird circling over the water", 0.7), shown("zamzam", "a bird circling over the water", 0.9)]).toEqual([0, 1]);
    // The throne: far off in Saba; here, with a flash, before the glance returns; the favor of his Lord; changed; and
    // the floor become glass over water.
    expect(words("throne")).toEqual(["Her throne, far away", "Before your glance returns", "From the favor of my Lord", "Her throne, disguised", "A palace paved with glass"]);
    expect([shown("throne", "her throne, far off", 0.2), shown("throne", "her throne, here", 0.2), shown("throne", "her throne, far off", 0.3), shown("throne", "her throne, here", 0.3), shown("throne", "in the blink of an eye", 0.26)]).toEqual([1, 0, 0, 1, 1]);
    expect([shown("throne", "her throne, changed", 0.5), shown("throne", "her throne, here", 0.7), shown("throne", "her throne, changed", 0.7), shown("throne", "the glass", 0.7), shown("throne", "water under the glass", 1), shown("throne", "the glass", 1)]).toEqual([0, 0, 1, 0, 1, 1]);
    // The mihrab: the door opens by itself, the provision is there, from Allah; and there, Zakariyya calls on his Lord.
    expect(words("mihrab")).toEqual(["In the mihrab", "Each time he came in", "He found provision with her", "It is from Allah", "There, Zakariyya called on his Lord"]);
    expect([value("mihrab", "the door", "scaleX", 0.1), value("mihrab", "the door", "scaleX", 0.35) < 0.2, shown("mihrab", "provision with her", 0.38), shown("mihrab", "provision with her", 0.5)]).toEqual([1, true, 0, 1]);
    expect([shown("mihrab", "from Allah", 0.58), shown("mihrab", "from Allah", 0.7), shown("mihrab", "calling on his Lord", 0.78), shown("mihrab", "calling on his Lord", 0.9)]).toEqual([0, 1, 0, 1]);
    // The fire: blazing; then, at the word, cool and calm; and safe.
    expect(words("cool-fire")).toEqual(["A great blazing fire", "O fire, be coolness", "And safety for Ibrahim"]);
    expect([shown("cool-fire", "the blazing fire", 0.3), shown("cool-fire", "the fire made cool", 0.3), shown("cool-fire", "the blazing fire", 0.5), shown("cool-fire", "the fire made cool", 0.5)]).toEqual([1, 0, 0, 1]);
    expect([shown("cool-fire", "safety", 0.6), shown("cool-fire", "safety", 0.8), shown("cool-fire", "heat of the fire", 1), shown("cool-fire", "coolness", 1)]).toEqual([0, 1, 0, 1]);
  });

  test("every word and caption is translated in every language", () => {
    const words = [...SIGN_SCENES.map((each) => each.caption), ...signWords(), "Source", "Plays the scene again"];
    expect(words.length).toBeGreaterThan(45);
    for (const language of ["bn", "ur", "ar"] as const) {
      const catalog = getCatalog(language);
      expect({ language, missing: words.filter((each) => !catalog[each]) }).toEqual({ language, missing: [] });
    }
  });

  test("on every phone, in every language, each word fits its pill in two lines", () => {
    for (const language of LANGUAGES) {
      for (const text of signWords()) {
        const said = t(text, undefined, language);
        for (const [width] of FRAMES) {
          // The pill is 20 px narrower than the scene, with 10 px inside it on each side.
          expect([language, text, width, fitsTwoLines(said, width - 40, 13)]).toEqual([language, text, width, true]);
        }
      }
    }
  });

  test("a scene shows its parts and its words in the learner's language; with less motion it shows its end", async () => {
    await render(<SignSceneView scene={scene("sign-tree")} width={362} height={271} still />);
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    expect(screen.getAllByTestId(/^sign-scene-part-\d+$/, ALL).length).toBe(signArt("tree").parts.length);
    // Standing still at its end: the last words show, the first ones do not.
    expect(StyleSheet.flatten(screen.getByTestId("sign-scene-words-2", ALL).props.style).opacity).toBe(1);
    expect(StyleSheet.flatten(screen.getByTestId("sign-scene-words-0", ALL).props.style).opacity).toBe(0);
    expect(screen.getByText("Its fruit at every time", ALL)).toBeTruthy();
    // The crops stand still as broken straw, not as the bare soil their story ends on.
    await render(<SignSceneView scene={scene("sign-fade")} width={362} height={271} still />);
    const said = signArt("fade").words.map((_, index) => StyleSheet.flatten(screen.getByTestId(`sign-scene-words-${index}`, ALL).props.style).opacity);
    expect(said).toEqual([0, 0, 1, 0]);
    expect(signArt("fade").stillAt).toBeDefined();
    expect([shown("fade", "broken straw", signArt("fade").stillAt!), wordAt("fade", signArt("fade").stillAt!)]).toEqual([1, "Then broken straw"]);
    setActiveLanguage("bn");
    await render(<SignSceneView scene={scene("sign-mountains")} width={292} height={178} still />);
    expect(screen.getByText("খুঁটির মতো", ALL)).toBeTruthy();
    setActiveLanguage("ar");
    await render(<SignSceneView scene={scene("sign-seas")} width={292} height={178} still />);
    expect(screen.getByText("بينهما حاجز", ALL)).toBeTruthy();
  });

  test("with less motion, a swimming fish or snake stands at an end of its way, facing it, not turned edge-on", async () => {
    const facing = (kind: SignKind, name: string) => {
      const index = signArt(kind).parts.findIndex((each) => each.name === name);
      const picture = screen.getByTestId(`sign-scene-part-${index}`, ALL).children[0] as TestInstance;
      const transform = (StyleSheet.flatten(picture.props.style).transform ?? []) as Record<string, number>[];
      return transform.find((each) => "scaleX" in each)?.scaleX;
    };
    await render(<SignSceneView scene={scene("sign-seas")} width={362} height={271} still />);
    expect([facing("seas", "river fish")! > 0.9, facing("seas", "sea fish")! < -0.9]).toEqual([true, true]);
    await render(<SignSceneView scene={scene("sign-tur")} width={362} height={271} still />);
    expect(Math.abs(facing("tur", "snake")!)).toBeGreaterThan(0.9);
  });

  test("a scene plays its story once, again when asked, and not at all with less motion", async () => {
    const timing = jest.spyOn(Animated, "timing");
    const { ms } = signArt("spider");
    const stories = () => timing.mock.calls.filter(([, config]) => config.toValue === 1 && config.duration === ms).length;
    const { rerender } = await render(<SignSceneView scene={scene("sign-spider")} width={362} height={271} delay={300} />);
    expect(stories()).toBe(1);
    // Its web keeps swaying, and the wind keeps blowing, while it is seen.
    expect(timing.mock.calls.filter(([, config]) => config.duration === 3400 || config.duration === 1600).length).toBe(2);
    await rerender(<SignSceneView scene={scene("sign-spider")} width={362} height={271} delay={300} play={1} />);
    expect(stories()).toBe(2);
    timing.mockClear();
    await render(<SignSceneView scene={scene("sign-spider")} width={362} height={271} still />);
    expect(timing).not.toHaveBeenCalled();
    timing.mockRestore();
  });

  test("a sign lesson's first page opens on its scene instead of its photo, with what it shows and its sources", async () => {
    const lesson = LESSONS_BY_ID["lesson-deep-rahman1-two-seas-meet"] as Lesson;
    const opened = jest.fn();
    await render(<LearnCard page="start" title={lesson.title} line={lesson.learnLine ?? ""} sign={signForLesson(lesson)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} onOpenSource={opened} />);
    expect(screen.getByTestId("sign-card")).toBeTruthy();
    expect(screen.queryByTestId("lesson-photo")).toBeNull();
    expect(screen.queryByTestId("moon-card")).toBeNull();
    await fireEvent(screen.getByTestId("sign-card-frame"), "layout", { nativeEvent: { layout: { width: 362, height: 271 } } });
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    expect(screen.getByTestId("sign-caption")).toHaveTextContent(scene("sign-seas").caption);
    expect(screen.getByText("Source")).toBeTruthy();
    await fireEvent.press(screen.getByText("Quran 55:20"));
    expect(opened).toHaveBeenCalledWith("https://quran.com/55/20");
    // Tap it to watch it again.
    await fireEvent.press(screen.getByTestId("sign-replay"));
    await fireEvent.press(screen.getByTestId("sign-card"));
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    // The next pages do not show it again.
    await render(<LearnCard page="facts" title={lesson.title} line={lesson.learnLine ?? ""} facts={["Two seas meet"]} sign={signForLesson(lesson)} mascotVariant="boy" accent="#2E7D5B" onContinue={jest.fn()} />);
    expect(screen.queryByTestId("sign-card")).toBeNull();
  });

  test("the sign card on its own: the good tree, with its three sources, in Urdu", async () => {
    setActiveLanguage("ur");
    await render(<SignCard sign={signForLesson({ nodeId: "deep-ibrahim3-the-date-palm" })!} />);
    await fireEvent(screen.getByTestId("sign-card-frame"), "layout", { nativeEvent: { layout: { width: 292, height: 178 } } });
    expect(screen.getByTestId("sign-scene", ALL)).toBeTruthy();
    expect(screen.getByLabelText(t(scene("sign-tree").caption))).toBeTruthy();
    expect(screen.getByTestId("sign-caption")).toHaveTextContent(t(scene("sign-tree").caption));
    expect(t(scene("sign-tree").caption)).not.toBe(scene("sign-tree").caption);
    for (const reference of SOURCES["sign-tree"]) expect(screen.getByText(t(reference))).toBeTruthy();
  });
});
