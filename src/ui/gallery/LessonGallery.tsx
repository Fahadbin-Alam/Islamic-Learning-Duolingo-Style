import { Teacher, teacherFor } from "../lesson/Teacher";
import React, { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { getLessonArabic, NODE_ARABIC } from "../../data/arabicTerms";
import { COURSE, LESSONS_BY_ID } from "../../data/course";
import { choicePictures, getLessonPicture, LESSON_PICTURE_IDS, pictureForLesson, pictureForPage, pictureForQuestion } from "../../data/lessonPictures";
import { LessonPhoto } from "../lesson/LessonPhoto";
import { MatchGame } from "../lesson/WordGames";
import { MapGame } from "../lesson/MapGame";
import { mapPlacesFor } from "../lesson/mapQuestions";
import { SkyGame } from "../lesson/SkyGame";
import { skyTimesFor } from "../lesson/skyQuestions";
import { SceneGame } from "../lesson/SceneGame";
import { sceneQuestionFor } from "../lesson/sceneQuestions";
import { MonthGame } from "../lesson/MonthGame";
import { monthsFor } from "../lesson/monthQuestions";
import { CardGame, CardPicture } from "../lesson/CardGame";
import { cardsFor } from "../lesson/cardQuestions";
import { ANIMAL_KINDS } from "../lesson/animalArt";
import { THING_KINDS } from "../lesson/thingArt";
import type { CardKind } from "../lesson/cardArt";
import { SurahCover } from "../lesson/SurahCover";
import { ALBUM_SETS } from "../../data/albumSets";
import { addToAlbum } from "../../services/pictureAlbum";
import { PictureAlbumSheet } from "../screens/PictureAlbum";
import { SayItSheet } from "../screens/SayItSheet";
import { SprintSheet } from "../screens/SprintSheet";
import { StreakMoment } from "../lesson/StreakMoment";
import { localDateKey } from "../../api/islamicLearningApi";
import { shiftDateKey } from "../../services/familyCode";
import { recordSprint, sprintCards, sprintRecord } from "../../services/swipeSprint";
import { markWordSaid } from "../../services/saidWords";
import { surahNumberForTitle, surahParts } from "../../data/surahPictures";
import { localizeLessonContent } from "../../services/contentLocalization";
import { setActiveLanguage } from "../../i18n";
import { highlightWords, lessonSummary } from "../lesson/lessonPages";
import { useAyahPlayback } from "../lesson/AyahListen";
import { firstLessonQuoting, nextAyahChallenge, reciteChallenge } from "../lesson/reciteQuestion";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import type { Challenge, Lesson, SupportedLanguage } from "../../types";
import { ExerciseView, LearnCard, LessonComplete, LessonScreen, OrderGame, QuitSheet, getLessonLine, shortWhy, type LessonHearts } from "../lesson";
import { colors, fonts, space } from "../theme";

// Dev gallery for the lesson screens. #gallery-lesson shows every state stacked in phone frames;
// #gallery-lesson-STATE shows one state full screen.

const FOUNDATION = COURSE.sections.find((section) => section.id === "foundation");
const PRAYER = COURSE.sections.find((section) => section.id === "prayer-expansion");
const FOUNDATION_ACCENT = FOUNDATION?.accentColor ?? colors.green;
const PRAYER_ACCENT = PRAYER?.accentColor ?? colors.gem;

const salam = LESSONS_BY_ID["lesson-foundation-niyyah"] as Lesson;
const wudu = LESSONS_BY_ID["lesson-prayer-wudu-steps"] as Lesson;
const allLessons = Object.values(LESSONS_BY_ID) as Lesson[];
const plainLesson =
  allLessons.find((lesson) => lesson.id.startsWith("lesson-sahabi") && !getLessonArabic(lesson.nodeId, lesson.branchId)) ??
  allLessons.find((lesson) => !getLessonArabic(lesson.nodeId, lesson.branchId)) ??
  salam;
const allChallenges = allLessons.flatMap((lesson) => lesson.challenges);
const forgiveQuestion =
  allChallenges.find((challenge) => challenge.prompt.startsWith("Forgiveness can be a sign of strength")) ?? salam.challenges[1];
const longQuestion =
  allLessons.flatMap((lesson) => lesson.challenges).sort((a, b) => b.prompt.length - a.prompt.length)[0] ?? salam.challenges[0];
// Quran ayah prompts ("What does this ayah mean? <ayah> (Quran 1:3)"), shortest and a long one.
const ayahQuestions = allChallenges.filter((challenge) => challenge.prompt.startsWith("What does this ayah mean?")).sort((a, b) => a.prompt.length - b.prompt.length);
const ayahQuestion = ayahQuestions[0] ?? salam.challenges[0];
const longAyahQuestion = ayahQuestions[Math.floor(ayahQuestions.length * 0.9)] ?? ayahQuestion;
// "Which tribe was Muhammad ﷺ from?": the honorific stays inside the English line.
const honorificQuestion = allChallenges.find((challenge) => /\uFDFA/.test(challenge.prompt) && challenge.choices.length >= 4) ?? salam.challenges[0];
// Four long answers: the short-phone layout and the "more below" hint.
const longChoicesQuestion =
  allChallenges
    .filter((challenge) => challenge.type === "multiple_choice" && challenge.choices.length >= 4)
    .sort((a, b) => b.choices.reduce((sum, choice) => sum + choice.label.length, 0) - a.choices.reduce((sum, choice) => sum + choice.label.length, 0))
    .find((challenge) => challenge.choices.every((choice) => choice.label.length < 140)) ?? salam.challenges[0];
const muhammad = (allLessons.find((lesson) => getLessonArabic(lesson.nodeId, lesson.branchId)?.ar.includes("\uFDFA")) ?? salam) as Lesson;
const hadithLesson = (allLessons.find((lesson) => lesson.id.startsWith("lesson-notes-hadith") && lesson.quote) ??
  allLessons.find((lesson) => lesson.id.startsWith("lesson-notes-hadith")) ??
  salam) as Lesson;
// The longest quote in the course and a lesson with fact chips (a prophet or companion).
const longQuoteLesson = allLessons.filter((lesson) => lesson.quote).sort((a, b) => (b.quote?.text?.length ?? 0) - (a.quote?.text?.length ?? 0))[0] ?? hadithLesson;
// An Arabic ayah with Listen and Repeat under it (a surah lesson).
const ayahLesson =
  allLessons.find((lesson) => /^Quran \d+:\d+$/.test(lesson.quote?.reference ?? "") && /^[\u0600-\u06FF\s]+$/.test(lesson.quote?.text ?? "")) ?? hadithLesson;
const surahMeaningLesson = (LESSONS_BY_ID["lesson-surah-meaning-2-254-257"] ?? ayahLesson) as Lesson;
// Lessons and a question that name a place with a photo (Makkah, the Ka'bah, Uhud...).
const photoLesson = allLessons.find((lesson) => lesson.title === "The Ka'bah") ?? allLessons.find((lesson) => pictureForLesson(lesson)) ?? salam;
const photoArabicLesson = allLessons.find((lesson) => pictureForLesson(lesson) && getLessonArabic(lesson.nodeId, lesson.branchId)) ?? photoLesson;
// Every answer a place with its own picture: picture cards (Arafah, Mina, Muzdalifah...).
const pictureAnswersQuestion =
  allChallenges.find((challenge) => challenge.prompt.startsWith("After Arafah") && choicePictures(challenge.choices)) ??
  allChallenges.find((challenge) => choicePictures(challenge.choices)) ??
  salam.challenges[0];
const photoQuestion = allChallenges.find((challenge) => pictureForQuestion(challenge.prompt)?.id === "uhud") ?? salam.challenges[0];
const eidLesson = (LESSONS_BY_ID["lesson-deep-eid-two-days"] ?? salam) as Lesson;
const factsLesson = allLessons.find((lesson) => (lesson.learnFacts?.length ?? 0) >= 3) ?? allLessons.find((lesson) => lesson.learnFacts?.length) ?? salam;
// A very long right answer (a real course text of about 600 characters, like a full ayah translation):
// the wrong sheet must stay inside the screen and scroll.
const longText =
  allLessons
    .map((lesson) => lesson.explanationContent ?? "")
    .filter((text) => text.length <= 650)
    .sort((a, b) => b.length - a.length)[0] ?? salam.intro;
const longAnswerQuestion: Challenge = {
  ...salam.challenges[0],
  id: "gallery-long-answer",
  choices: [
    { id: "a", label: longText },
    { id: "b", label: salam.challenges[0].choices[1]?.label ?? "See you later" }
  ],
  correctChoiceId: "a"
};

/** A learn card the way TopicApp builds it from a lesson. */
function LearnDemo({ lesson, accent, mascot = "boy", isNewWord }: { lesson: Lesson; accent: string; mascot?: string; isNewWord?: boolean }) {
  const arabic = getLessonArabic(lesson.nodeId, lesson.branchId);
  return (
    <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
      <LearnCard
        title={lesson.title}
        line={getLessonLine(lesson)}
        arabic={arabic}
        isNewWord={isNewWord}
        facts={lesson.learnFacts}
        quote={lesson.quote}
        onPlayAudio={arabic ? noop : undefined}
        learnSource={lesson.learnSource}
        picture={pictureForLesson(lesson)}
        deeper={lesson.learnDeeper}
        mascotVariant={mascot}
        accent={accent}
        onContinue={noop}
        onOpenSource={noop}
      />
    </LessonScreen>
  );
}

/**
 * A lesson's "What you learn" page as the app shows it: the teacher, the page's picture, the facts with what the
 * source says, the surah's parts and the source. ?lang=bn (or ur, ar) shows it in that language.
 */
function FactsPageDemo({ lesson: english }: { lesson: Lesson }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const lesson = localizeLessonContent(english, language);
  const surahNumber = surahNumberForTitle(english.title);
  const picture = pictureForLesson(english);
  const pagePicture = pictureForPage(english, "facts", ["start"]);
  const summaryShown = lessonSummary(english) ? lesson.learnSource?.summary : undefined;
  return (
    <LessonScreen progress={0.12} hearts={FULL_HEARTS} onClose={noop}>
      <LearnCard
        page="facts"
        summary={summaryShown}
        englishSummary={summaryShown ? english.learnSource?.summary : undefined}
        marks={highlightWords(lesson)}
        sourceHere
        title={lesson.title}
        line={getLessonLine(lesson)}
        facts={lesson.learnFacts}
        englishFacts={english.learnFacts}
        quote={lesson.quote}
        learnSource={lesson.learnSource}
        picture={picture}
        pagePicture={pagePicture && pagePicture.id !== picture?.id ? pagePicture : undefined}
        surah={surahNumber ? { number: surahNumber, parts: surahParts(surahNumber) } : undefined}
        teacher={teacherFor(COURSE.sections.find((section) => section.nodes.some((node) => node.id === english.nodeId))?.topicId)}
        mascotVariant="boy"
        accent={accentOf(english)}
        onContinue={noop}
        onOpenSource={noop}
      />
    </LessonScreen>
  );
}

const baqarahLesson = (LESSONS_BY_ID["lesson-notes-quran-tafseer-surahs-1-10-surah-al-baqarah"] ?? salam) as Lesson;

// The accent of the section that holds the lesson's circle. Not the id prefix: the marriage hadith keep
// "lesson-notes-hadith-…" ids but sit in the Marriage topic.
function accentOf(lesson: Lesson) {
  return COURSE.sections.find((section) => section.nodes.some((node) => node.id === lesson.nodeId))?.accentColor ?? colors.gem;
}

const ARABIC_QUESTION: Challenge = {
  id: "gallery-arabic-choices",
  type: "multiple_choice",
  prompt: `Which one means "${NODE_ARABIC["foundation-niyyah"].meaning}"?`,
  choices: [
    { id: "a", label: NODE_ARABIC["foundation-bismillah"].ar },
    { id: "b", label: NODE_ARABIC["foundation-niyyah"].ar },
    { id: "c", label: NODE_ARABIC["foundation-guidance"].ar }
  ],
  correctChoiceId: "b",
  explanation: "As-salamu alaykum means peace be upon you."
};

const ARABIC_PROMPT: Challenge = {
  id: "gallery-arabic-prompt",
  type: "multiple_choice",
  prompt: `What does ${NODE_ARABIC["foundation-bismillah"].ar} mean?`,
  choices: [
    { id: "a", label: NODE_ARABIC["foundation-bismillah"].meaning },
    { id: "b", label: NODE_ARABIC["foundation-guidance"].meaning },
    { id: "c", label: NODE_ARABIC["foundation-niyyah"].meaning }
  ],
  correctChoiceId: "a",
  explanation: "We say it before we start."
};

const WUDU_STEPS = [
  { id: "bismillah", label: "Say Bismillah" },
  { id: "hands", label: "Wash hands" },
  { id: "mouth", label: "Rinse mouth" },
  { id: "nose", label: "Rinse nose" },
  { id: "face", label: "Wash face" },
  { id: "arms", label: "Wash arms to the elbows" },
  { id: "head", label: "Wipe head and ears" },
  { id: "feet", label: "Wash feet" }
];
const WUDU_ORDER = WUDU_STEPS.map((step) => step.id);
// Gallery copy of the two-rak'ah prayer game, like Fajr (the course builds its own in lessonGuidance).
const SALAH_STEPS = [
  { id: "takbir", label: "Opening takbir" },
  { id: "qiyam", label: "Stand and recite" },
  { id: "ruku", label: "Ruku, then stand" },
  { id: "sujud", label: "Two sujud" },
  { id: "qiyam2", label: "Stand for rak'ah 2" },
  { id: "ruku2", label: "Ruku again" },
  { id: "sujud2", label: "Two sujud again" },
  { id: "tashahhud", label: "Tashahhud" },
  { id: "taslim", label: "Taslim" }
];
const SALAH_ORDER = SALAH_STEPS.map((step) => step.id);

const FULL_HEARTS: LessonHearts = { current: 5, max: 5, unlimited: false };
const noop = () => undefined;

function ReciteDemo({ ayahKey = "112:4", next = false }: { ayahKey?: string; next?: boolean }) {
  const lesson = LESSONS_BY_ID[firstLessonQuoting(ayahKey) ?? ""];
  const challenge = lesson ? (next ? nextAyahChallenge(lesson) : reciteChallenge(lesson)) : undefined;
  return challenge ? <ExerciseDemo challenge={challenge} progress={0.7} /> : null;
}

function ExerciseDemo({
  challenge,
  accent = FOUNDATION_ACCENT,
  initialSelected,
  checkNow,
  attempt,
  review,
  whyOpen,
  progress = 0.4
}: {
  challenge: Challenge;
  accent?: string;
  initialSelected?: string;
  checkNow?: boolean;
  /** 1 or more: the question came back after a miss. */
  attempt?: number;
  review?: boolean;
  whyOpen?: boolean;
  progress?: number;
}) {
  const [selected, setSelected] = useState<string | undefined>(initialSelected);
  const [checked, setChecked] = useState(Boolean(checkNow));
  const [hearts, setHearts] = useState<LessonHearts>(FULL_HEARTS);
  // "How does the ayah end?": Listen plays the ayah once from its start, or stops it, as in a lesson.
  const playback = useAyahPlayback();
  const recite = challenge.listen?.recite;
  const recitation = recite ? challenge.listen?.recitation : undefined;
  const reciting = Boolean(recitation) && playback.url === recitation && (playback.status === "playing" || playback.status === "loading");
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  // What TopicApp should pass as `why`: one short, useful sentence (or nothing).
  const why = shortWhy({
    explanation: challenge.explanation,
    easierExplanation: challenge.easierExplanation,
    prompt: challenge.prompt,
    correctLabel
  });

  useEffect(() => {
    // Shows the heart drop animation for a pre-checked wrong answer.
    if (checkNow && initialSelected !== challenge.correctChoiceId) {
      const timer = setTimeout(() => setHearts((value) => ({ ...value, current: value.current - 1 })), 400);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [challenge.correctChoiceId, checkNow, initialSelected]);

  return (
    <LessonScreen progress={checked && correct ? progress + 0.1 : progress} hearts={hearts} onClose={noop}>
      <ExerciseView
        kind={challenge.type}
        prompt={challenge.prompt}
        choices={challenge.choices}
        selectedChoiceId={selected}
        correctChoiceId={challenge.correctChoiceId}
        result={checked ? { correct, correctLabel, why } : undefined}
        attempt={attempt}
        review={review ?? challenge.isReview}
        mascotVariant="girl"
        accent={accent}
        praiseSeed={challenge.id}
        picture={choicePictures(challenge.choices) ? undefined : pictureForQuestion(challenge.prompt)}
        choicePictures={choicePictures(challenge.choices)}
        defaultWhyOpen={whyOpen}
        listen={
          recite && recitation
            ? {
                onPlay: () => (reciting ? stopAyah(recitation) : playAyah(recitation, { once: true })),
                playing: reciting,
                recite: {
                  text: challenge.listen!.ar,
                  ayahKey: recite.key,
                  url: recitation,
                  gap: recite.gap,
                  next: recite.next ? { text: recite.next.text, ayahKey: recite.next.key, url: recite.next.recitation } : undefined
                }
              }
            : undefined
        }
        onSelect={setSelected}
        onCheck={() => {
          setChecked(true);
          if (selected !== challenge.correctChoiceId) {
            setHearts((value) => ({ ...value, current: Math.max(0, value.current - 1) }));
          }
        }}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

function QuitDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <LessonScreen
      progress={0.3}
      hearts={FULL_HEARTS}
      onClose={() => setVisible(true)}
      overlay={<QuitSheet visible={visible} onKeepLearning={() => setVisible(false)} onQuit={() => setVisible(false)} mascotVariant="boy" accent={PRAYER_ACCENT} />}
    >
      <ExerciseView
        kind="multiple_choice"
        prompt={salam.challenges[2].prompt}
        choices={salam.challenges[2].choices}
        mascotVariant="boy"
        accent={PRAYER_ACCENT}
        onSelect={noop}
        onCheck={noop}
        onContinue={noop}
      />
    </LessonScreen>
  );
}

type State = { id: string; render: () => React.ReactElement };

/** The picture album with a few found: #gallery-lesson-album. */
function AlbumDemo() {
  addToAlbum(["kaaba", "ark", "arafah", "mina", "muzdalifah", "ants", "big-fish", "nile", "aqsa", "jerusalem", "damascus"]);
  return <PictureAlbumSheet visible onClose={noop} />;
}

/** Say it out loud, with two words already said: #gallery-lesson-say-it. */
function SayItDemo() {
  markWordSaid("assalamu-alaykum");
  markWordSaid("bismillah");
  return <SayItSheet visible onClose={noop} mascotVariant="girl" accent={FOUNDATION_ACCENT} soundOn={false} />;
}

/** The streak moment for a streak of `days` (?lang=bn, ur or ar), today in this week, with a freeze some days ago. */
function StreakDemo({ days, frozenDaysAgo, variant = "girl" }: { days: number; frozenDaysAgo?: number; variant?: string }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  setActiveLanguage((["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage);
  const today = localDateKey();
  return (
    <StreakMoment
      days={days}
      today={today}
      frozenDays={frozenDaysAgo ? [shiftDateKey(today, -frozenDaysAgo)] : undefined}
      mascotVariant={variant}
      accent={variant === "boy" ? PRAYER_ACCENT : FOUNDATION_ACCENT}
      playSounds={false}
      onContinue={noop}
    />
  );
}

/**
 * A place question asked on the map, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function MapDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const places = mapPlacesFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <MapGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        places={places}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * A month question asked on the year, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function MonthQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const months = monthsFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <MonthGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        months={months}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * A question on picture cards, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function CardQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const kinds = cardsFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <CardGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        kinds={kinds}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/** Every animal (or every thing) the cards can draw, moving, each with its name: to look them all over at once. */
function CardWall({ kinds }: { kinds: CardKind[] }) {
  return (
    <ScrollView contentContainerStyle={styles.wall}>
      {kinds.map((kind) => (
        <View key={kind} style={styles.animalItem} testID={`zoo-${kind}`}>
          <CardPicture kind={kind} width={136} height={104} still={false} />
          <Text style={styles.caption}>{kind}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * A time question asked in the sky, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has `ask`.
 * `pick`: an answer already picked; `check`: and checked (the answer sheet up).
 */
function SkyQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const times = skyTimesFor(english.challenges[index]) ?? {};
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <SkyGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        times={times}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * A story question asked on its living scene, from a real lesson (?lang=bn, ur or ar): the first one whose prompt has
 * `ask`. `pick`: an answer already picked; `check`: and checked (the answer sheet up, the scene playing the moment).
 */
function SceneQuestionDemo({ lessonId, ask, pick, check }: { lessonId: string; ask: string; pick?: "right" | "wrong"; check?: boolean }) {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  const english = LESSONS_BY_ID[lessonId];
  const index = Math.max(0, english.challenges.findIndex((challenge) => challenge.prompt.includes(ask)));
  const challenge = localizeLessonContent(english, language).challenges[index];
  const scene = sceneQuestionFor(english.challenges[index]);
  const wrongId = challenge.choices.find((choice) => choice.id !== challenge.correctChoiceId)?.id;
  const [selected, setSelected] = useState<string | undefined>(pick === "right" ? challenge.correctChoiceId : pick === "wrong" ? wrongId : undefined);
  const [checked, setChecked] = useState(Boolean(check));
  const correctLabel = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label ?? "";
  const correct = selected === challenge.correctChoiceId;
  if (!scene) return <Text style={styles.caption}>No scene for this question</Text>;
  return (
    <LessonScreen progress={0.45} hearts={FULL_HEARTS} onClose={noop}>
      <SceneGame
        prompt={challenge.prompt}
        choices={challenge.choices}
        ask={scene}
        correctChoiceId={challenge.correctChoiceId}
        selectedChoiceId={selected}
        result={checked ? { correct, correctLabel, why: shortWhy({ explanation: challenge.explanation, prompt: challenge.prompt, correctLabel }) } : undefined}
        mascotVariant="girl"
        accent={accentOf(english)}
        praiseSeed={challenge.id}
        playSound={false}
        onSelect={setSelected}
        onCheck={() => setChecked(true)}
        onContinue={() => {
          setChecked(false);
          setSelected(undefined);
        }}
      />
    </LessonScreen>
  );
}

/**
 * The swipe sprint after forty lessons, with a best of 12 kept: #gallery-lesson-sprint (?lang=bn, ur or ar). Each
 * game is six cards, the first with a living picture when one has it, so it can be played to its end in a few taps.
 */
function SprintDemo() {
  const query = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("lang") : null;
  const language = (["en", "bn", "ur", "ar"].includes(query ?? "") ? query : "en") as SupportedLanguage;
  setActiveLanguage(language);
  useState(() => (sprintRecord().best < 12 ? recordSprint(12) : false));
  const lessonIds = allLessons.slice(0, 40).map((lesson) => lesson.id);
  const game = useRef(0);
  const makeCards = () => {
    game.current += 1;
    const cards = sprintCards({ completedLessonIds: lessonIds }, { language, seed: 7 + game.current });
    const pictured = cards.find((card) => card.pictureId);
    return (pictured ? [pictured, ...cards.filter((card) => card !== pictured)] : cards).slice(0, 6);
  };
  return <SprintSheet visible onClose={noop} makeCards={makeCards} mascotVariant="girl" accent={FOUNDATION_ACCENT} />;
}

/** Every lesson picture, living (birds, clouds, rain, ants...), and a few surah covers: #gallery-lesson-pictures. */
function PictureWall() {
  const pictures = LESSON_PICTURE_IDS.map((id) => getLessonPicture(id)).filter((picture) => picture !== undefined);
  return (
    <ScrollView contentContainerStyle={styles.wall}>
      {[2, 71, 105, 112].map((surah) => (
        <View key={`surah-${surah}`} style={styles.wallItem}>
          <SurahCover surah={surah} meaning={`Surah ${surah}`} />
        </View>
      ))}
      {pictures.map((picture) => (
        <View key={picture.id} style={styles.wallItem}>
          <LessonPhoto picture={picture} delay={0} />
        </View>
      ))}
    </ScrollView>
  );
}

const STATES: State[] = [
  { id: "pictures", render: () => <PictureWall /> },
  {
    id: "learn",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={salam.title}
          line={getLessonLine(salam)}
          arabic={getLessonArabic(salam.nodeId, salam.branchId)}
          onPlayAudio={noop}
          learnSource={salam.learnSource}
          mascotVariant="girl"
          accent={FOUNDATION_ACCENT}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-plain",
    render: () => (
      <LessonScreen progress={0.08} hearts={{ current: 3, max: 5, unlimited: false }} onClose={noop}>
        <LearnCard
          title={plainLesson.title}
          line={getLessonLine(plainLesson)}
          learnSource={plainLesson.learnSource}
          mascotVariant="boy"
          accent={COURSE.sections.find((section) => section.id === "sahabah-expansion")?.accentColor ?? colors.green}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "learn-honorific",
    render: () => (
      <LessonScreen progress={0.08} hearts={FULL_HEARTS} onClose={noop}>
        <LearnCard
          title={muhammad.title}
          line={getLessonLine(muhammad)}
          arabic={getLessonArabic(muhammad.nodeId, muhammad.branchId)}
          onPlayAudio={noop}
          learnSource={muhammad.learnSource}
          mascotVariant="boy"
          accent={COURSE.sections.find((section) => section.topicId === "prophets")?.accentColor ?? colors.gem}
          onContinue={noop}
          onOpenSource={noop}
        />
      </LessonScreen>
    )
  },
  { id: "learn-hadith", render: () => <LearnDemo lesson={hadithLesson} accent={accentOf(hadithLesson)} isNewWord={false} /> },
  { id: "learn-quote-long", render: () => <LearnDemo lesson={longQuoteLesson} accent={accentOf(longQuoteLesson)} isNewWord={false} /> },
  { id: "learn-ayah", render: () => <LearnDemo lesson={ayahLesson} accent={accentOf(ayahLesson)} isNewWord={false} /> },
  // A passage of a whole surah's meaning (surahMeanings): its line, facts and a long ayah to listen to.
  { id: "learn-surah-meaning", render: () => <LearnDemo lesson={surahMeaningLesson} accent={accentOf(surahMeaningLesson)} isNewWord={false} /> },
  // A surah's "What you learn" page (the one Fahad found hard to read): facts the source repeats are shown once.
  { id: "learn-surah-facts", render: () => <FactsPageDemo lesson={baqarahLesson} /> },
  { id: "learn-facts", render: () => <LearnDemo lesson={factsLesson} accent={accentOf(factsLesson)} mascot="girl" /> },
  // The facts as a short lesson, and who told it and the grade with the source at the end.
  { id: "learn-eid", render: () => <LearnDemo lesson={eidLesson} accent={accentOf(eidLesson)} mascot="girl" isNewWord={false} /> },
  { id: "learn-photo", render: () => <LearnDemo lesson={photoLesson} accent={accentOf(photoLesson)} isNewWord={false} /> },
  { id: "learn-photo-arabic", render: () => <LearnDemo lesson={photoArabicLesson} accent={accentOf(photoArabicLesson)} /> },
  { id: "mc-pictures", render: () => <ExerciseDemo challenge={pictureAnswersQuestion} progress={0.5} /> },
  // "How does the ayah end?" (reciteQuestion): Al-Ikhlas's last ayah, as its first lesson asks it.
  { id: "recite", render: () => <ReciteDemo /> },
  // "Which ayah comes next?": after Al-Ikhlas's first ayah.
  { id: "recite-next", render: () => <ReciteDemo ayahKey="112:1" next /> },
  { id: "mc-photo", render: () => <ExerciseDemo challenge={photoQuestion} progress={0.3} /> },
  { id: "mc", render: () => <ExerciseDemo challenge={salam.challenges[0]} progress={0.25} /> },
  { id: "mc-selected", render: () => <ExerciseDemo challenge={salam.challenges[0]} initialSelected="a" progress={0.25} /> },
  { id: "mc-correct", render: () => <ExerciseDemo challenge={salam.challenges[0]} initialSelected="a" checkNow progress={0.25} /> },
  { id: "mc-wrong", render: () => <ExerciseDemo challenge={salam.challenges[2]} initialSelected="b" checkNow whyOpen progress={0.55} /> },
  { id: "tf-wrong", render: () => <ExerciseDemo challenge={forgiveQuestion} initialSelected="false" checkNow whyOpen progress={0.5} /> },
  { id: "tf", render: () => <ExerciseDemo challenge={salam.challenges[1]} initialSelected="false" progress={0.4} /> },
  { id: "tf-retry", render: () => <ExerciseDemo challenge={salam.challenges[1]} attempt={1} progress={0.4} /> },
  { id: "mc-retry", render: () => <ExerciseDemo challenge={salam.challenges[0]} attempt={1} progress={0.9} /> },
  { id: "mc-review", render: () => <ExerciseDemo challenge={salam.challenges[2]} review progress={0.8} /> },
  {
    id: "long-answer-wrong",
    render: () => (
      <ExerciseDemo
        challenge={longAnswerQuestion}
        accent={colors.gem}
        initialSelected={longAnswerQuestion.choices.find((choice) => choice.id !== longAnswerQuestion.correctChoiceId)?.id}
        checkNow
        whyOpen
        progress={0.6}
      />
    )
  },
  { id: "arabic", render: () => <ExerciseDemo challenge={ARABIC_QUESTION} initialSelected="b" progress={0.7} /> },
  { id: "arabic-prompt", render: () => <ExerciseDemo challenge={ARABIC_PROMPT} progress={0.7} /> },
  { id: "long", render: () => <ExerciseDemo challenge={longQuestion} accent={colors.gem} initialSelected="true" progress={0.85} /> },
  { id: "long-choices", render: () => <ExerciseDemo challenge={longChoicesQuestion} accent={colors.gem} progress={0.6} /> },
  {
    id: "long-choices-wrong",
    render: () => (
      <ExerciseDemo
        challenge={longChoicesQuestion}
        accent={colors.gem}
        initialSelected={longChoicesQuestion.choices.find((choice) => choice.id !== longChoicesQuestion.correctChoiceId)?.id}
        checkNow
        progress={0.6}
      />
    )
  },
  { id: "ayah", render: () => <ExerciseDemo challenge={ayahQuestion} accent={colors.gem} progress={0.5} /> },
  { id: "ayah-long", render: () => <ExerciseDemo challenge={longAyahQuestion} accent={colors.gem} progress={0.5} /> },
  { id: "honorific", render: () => <ExerciseDemo challenge={honorificQuestion} accent={colors.gem} progress={0.3} /> },
  {
    id: "order",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "hands", "mouth"]}
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-wrong",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["bismillah", "hands", "face", "mouth", "nose", "arms", "head", "feet"]}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-salah-wrong",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title="Salah"
          options={SALAH_STEPS}
          correctOrderIds={SALAH_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={["standing", "takbir", "ruku", "sujud1", "rise", "sit", "sujud2", "tashahhud", "taslim"]}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "order-salah",
    render: () => (
      <LessonScreen progress={0.3} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame title="Salah" options={SALAH_STEPS} correctOrderIds={SALAH_ORDER} mascotVariant="boy" accent={PRAYER_ACCENT} onDone={noop} />
      </LessonScreen>
    )
  },
  {
    id: "order-correct",
    render: () => (
      <LessonScreen progress={0.35} hearts={FULL_HEARTS} onClose={noop}>
        <OrderGame
          title={wudu.title}
          options={WUDU_STEPS}
          correctOrderIds={WUDU_ORDER}
          mascotVariant="boy"
          accent={PRAYER_ACCENT}
          initialPlacedIds={WUDU_ORDER}
          initialChecked
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "complete",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward + 10}
        stars={3}
        streakDays={12}
        unlockedTitle={LESSONS_BY_ID["lesson-foundation-character"]?.title ?? "Wa alaykum as-salam"}
        gemsReward={5}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  {
    id: "complete-album",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward + 10}
        stars={3}
        streakDays={12}
        newPictures={["aqsa", "jerusalem", "damascus"].map((id) => getLessonPicture(id)).filter((picture) => picture !== undefined)}
        finishedSets={ALBUM_SETS.filter((set) => set.id === "lands")}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  { id: "album", render: () => <AlbumDemo /> },
  { id: "say-it", render: () => <SayItDemo /> },
  { id: "sprint", render: () => <SprintDemo /> },
  // Place questions on the map: one map; a close-up of Makkah's hills under the Hijaz; Jerusalem far to the north.
  { id: "map", render: () => <MapDemo lessonId="lesson-deep-hamzah-martyr" ask="Hamzah martyred" /> },
  { id: "map-picked", render: () => <MapDemo lessonId="lesson-deep-hamzah-martyr" ask="Hamzah martyred" pick="right" /> },
  { id: "map-right", render: () => <MapDemo lessonId="lesson-deep-hamzah-martyr" ask="Hamzah martyred" pick="right" check /> },
  { id: "map-closeup", render: () => <MapDemo lessonId="lesson-deep-abubakr-cave-of-thawr" ask="which cave" /> },
  { id: "map-closeup-wrong", render: () => <MapDemo lessonId="lesson-deep-abubakr-cave-of-thawr" ask="which cave" pick="wrong" check /> },
  { id: "map-arabia", render: () => <MapDemo lessonId="lesson-deep-najm1-the-first-sajdah-surah" ask="recite An-Najm" /> },
  { id: "map-quba", render: () => <MapDemo lessonId="lesson-deep-hajj-masjids-three" ask="Jerusalem" /> },
  { id: "map-hajj", render: () => <MapDemo lessonId="lesson-deep-book-hajj-labbayk-as-the-camel-rose" ask="talbiyah" pick="wrong" check /> },
  // Time questions in the sky: suhur before dawn; the last third of the night, answered wrong (the sky plays on to it).
  { id: "sky", render: () => <SkyQuestionDemo lessonId="lesson-deep-fast-suhur-blessing" ask="suhur eaten" /> },
  { id: "sky-picked", render: () => <SkyQuestionDemo lessonId="lesson-deep-fast-suhur-blessing" ask="suhur eaten" pick="right" /> },
  { id: "sky-right", render: () => <SkyQuestionDemo lessonId="lesson-deep-fast-suhur-blessing" ask="suhur eaten" pick="right" check /> },
  { id: "sky-wrong", render: () => <SkyQuestionDemo lessonId="lesson-deep-insan4-prostrate-at-night" ask="who will call" pick="wrong" check /> },
  { id: "sky-zuhr", render: () => <SkyQuestionDemo lessonId="lesson-deep-prayer-sunnah-times-the-times-of-the-five-prayers" ask="pray Zuhr" /> },
  // Story questions on their living scene: where the ark came to rest (waiting, picked, answered: the ark settles on
  // al-Judi); the twelve springs, answered wrong; a true-or-false on the she-camel; the ant's call; the birds held up.
  { id: "scene", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-nuh-judi" ask="come to rest" /> },
  { id: "scene-picked", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-nuh-judi" ask="come to rest" pick="right" /> },
  { id: "scene-right", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-nuh-judi" ask="come to rest" pick="right" check /> },
  { id: "scene-wrong", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-musa-twelve-springs" ask="How many springs" pick="wrong" check /> },
  { id: "scene-true-false", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-salih-turns" ask="was a sign" /> },
  { id: "scene-ants", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-sulayman-ant" ask="tell the other ants" /> },
  { id: "scene-birds", render: () => <SceneQuestionDemo lessonId="lesson-deep-mulk-birds" ask="holds the birds" /> },
  // The Prophets' stories: the stick become a snake, the staff swallowing their tricks, the wall set straight, the iron up
  // to the mountains' tops, the gourd plant over Yunus, the dates falling for Maryam.
  { id: "scene-tur", render: () => <SceneQuestionDemo lessonId="lesson-deep-taha1-the-staff-became-a-snake" ask="What did the stick become" /> },
  { id: "scene-staff", render: () => <SceneQuestionDemo lessonId="lesson-deep-araf4-staff-swallows" ask="What did the staff do" /> },
  { id: "scene-khidr", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf3-the-wall-set-straight" ask="What did Al-Khidr fix" /> },
  { id: "scene-barrier", render: () => <SceneQuestionDemo lessonId="lesson-deep-kahf4-the-iron-barrier" ask="How high did the blocks go" /> },
  { id: "scene-yunus", render: () => <SceneQuestionDemo lessonId="lesson-deep-saffat5-the-gourd-plant" ask="What grew over him" /> },
  { id: "scene-maryam", render: () => <SceneQuestionDemo lessonId="lesson-deep-maryam1-dates-and-a-stream" ask="What fell from the palm" /> },
  // Allah's favors to His Prophets: Dawud's coat of mail, the camels coming to the House, the seven times between Safa
  // and Marwah, the glass floor, the provision in the mihrab, the fire made cool.
  { id: "scene-dawud", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-dawud-mountains-birds" ask="What did Dawud make from the iron" /> },
  { id: "scene-house", render: () => <SceneQuestionDemo lessonId="lesson-deep-hajj-house-proclaim" ask="How would the pilgrims come" /> },
  { id: "scene-zamzam", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-hajar-safa-marwah" ask="How many times did Hajar go" /> },
  { id: "scene-throne", render: () => <SceneQuestionDemo lessonId="lesson-deep-naml2-the-glass-palace" ask="What was under the glass floor" /> },
  { id: "scene-mihrab", render: () => <SceneQuestionDemo lessonId="lesson-deep-quranwomen-maryam-provision" ask="What did Zakariyya find each time" /> },
  { id: "scene-cool-fire", render: () => <SceneQuestionDemo lessonId="lesson-deep-prophet-ibrahim-fire" ask="What did Allah tell the fire" /> },
  // Month questions on the year: Ashura in Muharram; Sha'ban, answered wrong (the right month turns green, its moon full).
  { id: "month", render: () => <MonthQuestionDemo lessonId="lesson-deep-days-ashura" ask="Ashura is in" /> },
  { id: "month-picked", render: () => <MonthQuestionDemo lessonId="lesson-deep-days-ashura" ask="Ashura is in" pick="right" /> },
  { id: "month-right", render: () => <MonthQuestionDemo lessonId="lesson-deep-days-ashura" ask="Ashura is in" pick="right" check /> },
  { id: "month-wrong", render: () => <MonthQuestionDemo lessonId="lesson-deep-fast-extra-shaban" ask="fast most" pick="wrong" check /> },
  { id: "month-qadr", render: () => <MonthQuestionDemo lessonId="lesson-deep-qadr1-in-the-month-of-ramadan" ask="Night of Al-Qadr" /> },
  // Animal questions on picture cards: the hoopoe that brought Sulayman news; the mosquito of 2:26, answered wrong;
  // Salih's she-camel among three; the scorpion among small creatures; the sea's whale and the land's lion together.
  { id: "animal", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-sulayman-hoopoe" ask="brought Sulayman news" /> },
  { id: "animal-picked", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-sulayman-hoopoe" ask="brought Sulayman news" pick="right" /> },
  { id: "animal-right", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-sulayman-hoopoe" ask="brought Sulayman news" pick="right" check /> },
  { id: "animal-wrong", render: () => <CardQuestionDemo lessonId="lesson-deep-baqarah1-mosquito" ask="2:26" pick="wrong" check /> },
  { id: "animal-three", render: () => <CardQuestionDemo lessonId="lesson-prophets-early-messengers-hud-and-salih" ask="Salih's people" /> },
  { id: "animal-sting", render: () => <CardQuestionDemo lessonId="lesson-deep-dua-adhkar-perfect-words" ask="stung" /> },
  { id: "animal-sea", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-2-21-29" ask="ayah 26" /> },
  { id: "animal-zoo", render: () => <CardWall kinds={ANIMAL_KINDS} /> },
  // Things on picture cards: the fresh dates that fell for Maryam; the iron softened for Dawud, answered wrong; foods,
  // fruits and metals; the light, the fire, the water and the clay; the rain, the rivers, the sea; three answers; an
  // animal among things; and a wall of every thing, moving.
  { id: "cards", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-19-16-26" ask="fell from the palm" /> },
  { id: "cards-picked", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-19-16-26" ask="fell from the palm" pick="right" /> },
  { id: "cards-right", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-19-16-26" ask="fell from the palm" pick="right" check /> },
  { id: "cards-wrong", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-34-10-21" ask="soften for Dawud" pick="wrong" check /> },
  { id: "cards-food", render: () => <CardQuestionDemo lessonId="lesson-deep-fasting-suhur-to-iftar-dates-at-suhur" ask="suhur" /> },
  { id: "cards-fruit", render: () => <CardQuestionDemo lessonId="lesson-deep-anam2-rain-gardens" ask="Which fruit" /> },
  { id: "cards-metal", render: () => <CardQuestionDemo lessonId="lesson-deep-prophet-dawud-mountains-birds" ask="Which metal" /> },
  { id: "cards-light", render: () => <CardQuestionDemo lessonId="lesson-deep-kahf2-angels-from-light" ask="angels created" /> },
  { id: "cards-rain", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-71-10-20" ask="pouring down" /> },
  { id: "cards-river", render: () => <CardQuestionDemo lessonId="lesson-deep-tawbah3-fine-dwellings" ask="flows beneath" /> },
  { id: "cards-sea", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-38-15-26" ask="glorified Allah" /> },
  { id: "cards-sky", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-38-27-40" ask="obeyed Sulayman" /> },
  { id: "cards-three", render: () => <CardQuestionDemo lessonId="lesson-women-quran-depth-asiyah-and-steadfastness" ask="Asiyah asked" /> },
  { id: "cards-mixed", render: () => <CardQuestionDemo lessonId="lesson-surah-meaning-7-73-93" ask="Salih's sign" /> },
  { id: "thing-zoo", render: () => <CardWall kinds={THING_KINDS} /> },
  {
    id: "match",
    render: () => (
      <LessonScreen progress={0.5} hearts={FULL_HEARTS} onClose={noop}>
        <MatchGame
          pairs={[
            { index: 0, left: "Where do pilgrims stand on the 9th?", right: "Arafah" },
            { index: 1, left: "Where do pilgrims spend the night after Arafah?", right: "Muzdalifah" },
            { index: 2, left: "Where are the pebbles thrown?", right: "Mina" }
          ]}
          mascotVariant="girl"
          accent={FOUNDATION_ACCENT}
          playSound={false}
          onDone={noop}
        />
      </LessonScreen>
    )
  },
  {
    id: "complete-goal",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={10}
        stars={3}
        streakDays={0}
        goal={{ xpToday: 26, goalXp: 40 }}
        unlockedTitle={LESSONS_BY_ID["lesson-foundation-character"]?.title ?? "Wa alaykum as-salam"}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  {
    id: "complete-jumped",
    render: () => (
      <LessonComplete
        headline="You jumped ahead!"
        title={wudu.title}
        xp={110}
        stars={3}
        streakDays={1}
        unlockedTitle={"Muhammad \uFDFA"}
        nextTitle="Next"
        mascotVariant="boy"
        accent={PRAYER_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  // The streak moment after the day's first lesson: a plain day (with a freeze two days ago), a first streak, a week.
  { id: "streak", render: () => <StreakDemo days={5} frozenDaysAgo={2} /> },
  { id: "streak-first", render: () => <StreakDemo days={1} variant="boy" /> },
  { id: "streak-week", render: () => <StreakDemo days={7} /> },
  {
    id: "complete-streak",
    render: () => (
      <LessonComplete
        title={salam.title}
        xp={salam.xpReward}
        stars={3}
        streakDays={5}
        streakExtended
        streakMoment={{ today: localDateKey() }}
        nextTitle="Next"
        mascotVariant="girl"
        accent={FOUNDATION_ACCENT}
        playSounds={false}
        onContinue={noop}
        onBackToPath={noop}
      />
    )
  },
  { id: "quit", render: () => <QuitDemo /> },
  // Every lesson teacher, in the clothes of its topic (src/ui/lesson/Teacher.tsx).
  {
    id: "teachers",
    render: () => (
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, padding: 16, justifyContent: "center" }} testID="gallery-teachers">
        {TEACHER_TOPICS.map((topic) => (
          <View key={topic} style={{ alignItems: "center", width: 104 }}>
            <Teacher look={teacherFor(topic)} variant={topic === "hajj" || topic === "scholars" ? "boy" : "girl"} accent={PRAYER_ACCENT} size={84} talkMs={4000} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>{topic}</Text>
          </View>
        ))}
        {(["scholars", "hajj"] as const).map((topic) => (
          <View key={`${topic}-girl`} style={{ alignItems: "center", width: 104 }}>
            <Teacher look={teacherFor(topic)} variant="girl" accent={PRAYER_ACCENT} size={84} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>{topic} (girl)</Text>
          </View>
        ))}
      </View>
    )
  }
];

const TEACHER_TOPICS = ["foundation", "quran_tafseer", "prophets", "scholars", "hajj", "akhirah", "eid"];

function readHash() {
  if (Platform.OS !== "web" || typeof window === "undefined") {
    return "";
  }
  return window.location.hash;
}

export default function LessonGallery() {
  const [hash, setHash] = useState(readHash);

  useEffect(() => {
    if (Platform.OS !== "web" || typeof window === "undefined") {
      return undefined;
    }
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  const stateId = hash.replace(/^#gallery-lesson-?/, "");
  const single = STATES.find((state) => state.id === stateId);
  if (single) {
    return (
      <View style={styles.full} key={single.id}>
        {single.render()}
      </View>
    );
  }

  return (
    <ScrollView style={styles.full} contentContainerStyle={styles.list}>
      {STATES.map((state) => (
        <View key={state.id} style={styles.frameBlock}>
          <Text style={styles.caption}>{state.id}</Text>
          <View style={styles.frame}>{state.render()}</View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wall: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: space.sm
  },
  wallItem: {
    width: 300,
    padding: space.xs
  },
  animalItem: {
    width: 152,
    padding: space.xs,
    alignItems: "center"
  },
  full: {
    flex: 1,
    backgroundColor: colors.snow
  },
  list: {
    paddingVertical: space.lg,
    backgroundColor: colors.mist
  },
  frameBlock: {
    marginBottom: space.xxl
  },
  caption: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.inkSoft,
    paddingHorizontal: space.lg,
    marginBottom: space.xs
  },
  frame: {
    height: 760,
    backgroundColor: colors.snow,
    overflow: "hidden"
  }
});
