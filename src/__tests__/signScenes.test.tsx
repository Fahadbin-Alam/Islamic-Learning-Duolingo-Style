jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));

import React from "react";
import { Animated, StyleSheet } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
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
  "sign-look": [/look/i, /camel|sky|mountain|earth/i]
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
  "sign-look": ["Quran 88:17", "Quran 88:18", "Quran 88:19", "Quran 88:20"]
};

const part = (kind: SignKind, name: string): SignPart => {
  const found = signArt(kind).parts.find((each) => each.name === name);
  if (!found) throw new Error(`${kind} has no ${name}`);
  return found;
};
/** A part's keyed value at `t` of its story (or `rest` when it has no such key). */
const value = (kind: SignKind, name: string, key: "opacity" | "x" | "y" | "scale" | "scaleX" | "scaleY", t: number, rest = key === "x" || key === "y" ? 0 : 1) => {
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
    expect(Object.keys(SIGN_LESSONS).length).toBe(77);
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
