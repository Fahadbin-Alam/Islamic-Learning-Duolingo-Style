import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText, isArabicOnly, isQuranText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lip, radii, space, text, topicPalette } from "../theme";
import { useReduceMotion } from "../motion";
import { LessonBottomBar } from "./LessonHeader";
import { looksSame, noBreakHyphens, normalizeText } from "./lessonText";
import { useScrollMore } from "./ScrollHint";
import { AyahListen, useAyahPlayback } from "./AyahListen";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import { parseQuranReference, quranAudioUrl } from "../../services/quranAudio";
import { sourceUrl } from "../../services/sourceLink";
import { openWebPage, useOnline } from "../../services/network";
import { getActiveLanguage, t } from "../../i18n";
import type { LessonPicture } from "../../data/lessonPictures";
import { JourneyCard, type LessonMap } from "../journey/JourneyCard";
import { SkyCard } from "../journey/SkyCard";
import type { LessonSky } from "../../data/daySky";
import { LessonPhoto } from "./LessonPhoto";
import { SurahCover, SurahParts } from "./SurahCover";
import { isCredit, splitLessonFacts } from "./lessonNotes";
import { highlightPieces, plainSummary, saidInSummary, type LearnPageKind, type TeachLesson } from "./lessonPages";
import { Teacher, talkTime, type TeacherLook } from "./Teacher";
import { useReadAloud, type ReadPart } from "./useReadAloud";
import { ReadAloudButton } from "./ReadAloudButton";
import { ReadGlow, ReadingContext, ReadRing } from "./ReadGlow";
import { fitsRecitation, RecitedAyah } from "./RecitedAyah";
import { textScaled } from "../textScale";

export type LearnCardProps = {
  /** Lesson title, e.g. "As-Salamu Alaikum". Hidden when it only repeats the Arabic word's transliteration. */
  title: string;
  /** ONE short sentence the mascot says. */
  line: string;
  arabic?: ArabicTerm;
  /** False when the learner has met this Arabic word before (e.g. the unit's word again): no NEW pill. Default true. */
  isNewWord?: boolean;
  /**
   * Up to 3 short facts, e.g. "Father: Umar", shown as the lines of a short lesson under "What you learn". The ones
   * that only say where it is from ("Told by Anas", "Sahih (Al-Albani)") are shown with the source at the end.
   */
  facts?: string[];
  /** The same facts in English (when `facts` is translated), to tell which ones are about the source. */
  englishFacts?: string[];
  /** A short narration or ayah, shown in full with where it is from. */
  quote?: { text: string; reference?: string };
  mascotVariant: string;
  /** Who teaches the lesson and what they wear (teacherFor(topic)); default the kid in everyday clothes. */
  teacher?: TeacherLook;
  accent: string;
  /**
   * The one source that says what the card says (lesson.learnSource). Its chip shows only the short
   * reference ("Quran 2:43", "Sahih al-Bukhari 6018") on one line, never a page title: no reference, no chip.
   */
  learnSource?: { reference?: string; url: string; highlight?: string; category?: string; summary?: string };
  /** Older call sites: a chip with this label. Ignored when learnSource is given; pass learnSource instead. */
  source?: { label: string; url: string };
  /** Defaults to opening the url in the browser (a short note instead with no internet). */
  onOpenSource?: (url: string) => void;
  /** Shows a round speaker button on the Arabic card (wire expo-speech with language "ar", or a clip). */
  onPlayAudio?: () => void;
  /**
   * The reciter's audio when the Arabic word is a whole ayah: the speaker plays it once (instead of onPlayAudio),
   * and it stops when the card leaves the screen.
   */
  arabicRecitation?: string;
  /** A real photo of the place the lesson is about (Makkah, Uhud...), under the word card. */
  picture?: LessonPicture;
  /** A picture of what this page teaches (the bridge, the ark...), under the teacher on a later page. */
  pagePicture?: LessonPicture;
  /**
   * A Seerah or Hajj lesson's map (src/ui/journey): its first page opens on where it happened and the road that led
   * there, in the place of the photo (the photo moves on to the next page).
   */
  journey?: LessonMap;
  /**
   * A lesson about a time of the day (the prayers, suhur, iftar, the night prayer): its first page opens on the sky at
   * that time, in the place of the photo (the photo moves on to the next page).
   */
  sky?: LessonSky;
  /**
   * The deeper lesson (lesson.learnDeeper): what the ayahs mean, the story, what to take home, and a chip for each
   * tafsir book it comes from. The harder questions ask about it, so it is shown in full.
   */
  deeper?: { meaning: string[]; story?: string; takeaway?: string; sources: { reference?: string; url: string; highlight?: string }[] };
  /**
   * A surah's own lesson ("Surah Al-Baqarah"): a picture of what its name means comes first, and the parts it is
   * taught in are listed under "Inside this surah".
   */
  surah?: { number: number; meaning?: string; parts?: string[] };
  /**
   * One page of the lesson (src/ui/lesson/lessonPages.ts): "start" is the title, the word, the line, the photo and the
   * ayah; "facts" is What you learn with what the source says; "meaning", "story" and "takeaway" are the deeper
   * lesson's parts; "teach" is one Good to know fact; "quiz" says the circle's quiz starts. Unset: everything at once.
   */
  page?: LearnPageKind;
  /**
   * The lesson told plainly, in a sentence or two (lesson.intro when it says more than the mascot's line): it opens
   * "What you learn" on the "facts" page, so the page teaches, not only names the source.
   */
  explain?: string;
  /** What the source says, in one sentence: shown on the "facts" page under the points. */
  summary?: string;
  /** The same summary in English, to tell which facts it already says (the rules compare English words). */
  englishSummary?: string;
  /** Words to highlight on the page: the answers this lesson's questions ask for. */
  marks?: string[];
  /** The "teach" page's fact. */
  teach?: TeachLesson;
  /** How many questions the "quiz" page announces. */
  quizCount?: number;
  /** A unit's test: the "quiz" page says "Test time!" and the pass mark. */
  testPass?: number;
  /** The source's link and credits show on this page (the "facts" page, or the first page without one). */
  sourceHere?: boolean;
  onContinue: () => void;
  bottomInset?: number;
  testID?: string;
};

const GOLD_INK = darken(colors.goldLip, 0.45);

/**
 * A page's parts come in one after another, but quickly: after CONTINUE the next page is there at once, with
 * nothing that keeps the learner waiting for the words (the old half-second wait read as lag).
 */
const soon = (ms: number) => Math.round(ms * 0.35);

/** How long the new Arabic word takes to write itself in. */
const WRITE_MS = 950;

/**
 * The new word writes itself in, right to left as Arabic is written: a card-coloured cover slides off the word from
 * its right edge, a little pen riding the edge of the ink. Shown at once when the phone asks for less motion.
 */
function WriteIn({ cover, ink, delay, children }: { cover: string; ink: string; delay: number; children: React.ReactNode }) {
  const reduceMotion = useReduceMotion();
  const [width, setWidth] = useState(0);
  const [done, setDone] = useState(false);
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduceMotion || !width) return undefined;
    const run = Animated.timing(t, { toValue: 1, duration: WRITE_MS, delay, useNativeDriver: true });
    run.start(({ finished }) => finished && setDone(true));
    return () => run.stop();
  }, [reduceMotion, width, delay, t]);
  const writing = !reduceMotion && !done;
  return (
    <View style={styles.writeWrap} onLayout={(event) => setWidth(Math.round(event.nativeEvent.layout.width))}>
      {children}
      {writing ? (
        <>
          {/* Hidden until the width is known, so the word never shows unwritten-then-written. */}
          <Animated.View
            pointerEvents="none"
            style={[StyleSheet.absoluteFill, { backgroundColor: cover, transform: [{ translateX: t.interpolate({ inputRange: [0, 1], outputRange: [0, -(width || 400) - 4] }) }] }]}
            testID="learn-arabic-writing"
          />
          {width ? (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.writePen,
                {
                  opacity: t.interpolate({ inputRange: [0, 0.05, 0.9, 1], outputRange: [0, 1, 1, 0] }),
                  transform: [
                    { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [width - 10, -10] }) },
                    { translateY: t.interpolate({ inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1], outputRange: [0, -6, 2, -5, 1, -3] }) }
                  ]
                }
              ]}
            >
              <Icon name="quill" size={26} color={ink} />
            </Animated.View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

/** A tafsir page on Quran.com that is only in Arabic (as-Sa'di, at-Tanweer). */
const ARABIC_ONLY_TAFSIR = /\/tafsirs\/(?:ar-|arabic-)/;
const MAX_FACTS = 3;

/** True when a quote's reference names the same book and number as the source chip ("Muslim 1400a" in "Sahih Muslim 1400a"). */
export function sameReference(reference: string, label: string) {
  const ref = normalizeText(reference);
  const lab = normalizeText(label);
  if (!ref || !lab) {
    return false;
  }
  if (ref.includes(lab) || lab.includes(ref)) {
    return true;
  }
  const number = (value: string) => value.match(/\d+[a-z]?/i)?.[0]?.toLowerCase();
  const firstWord = normalizeText(label.split(/\s+/)[0] ?? "");
  return Boolean(number(reference) && number(reference) === number(label) && firstWord.length > 2 && ref.includes(firstWord));
}

/** Slides children in from the left (speech bubble entry). */
function SlideIn({
  children,
  delay = 0,
  style,
  onLayout
}: {
  children: React.ReactNode;
  delay?: number;
  style?: object;
  onLayout?: (event: LayoutChangeEvent) => void;
}) {
  const progress = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const animation = Animated.spring(progress, { toValue: 1, delay, friction: 7, tension: 90, useNativeDriver: true });
    animation.start();
    return () => animation.stop();
  }, [delay, progress]);
  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [-28, 0] });
  const opacity = progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 1, 1], extrapolate: "clamp" });
  return (
    <Animated.View style={[style, { opacity, transform: [{ translateX }] }]} onLayout={onLayout}>
      {children}
    </Animated.View>
  );
}

/**
 * The learn step: NEW pill, big Arabic card, the mascot saying one line, then optional fact chips, a quote
 * (a short narration or ayah in full) and the source chip, CONTINUE.
 */
export function LearnCard({
  title,
  line,
  arabic,
  isNewWord = true,
  facts,
  englishFacts,
  quote,
  mascotVariant,
  teacher,
  accent,
  learnSource,
  source: legacySource,
  onOpenSource,
  onPlayAudio: speak,
  arabicRecitation,
  picture,
  pagePicture,
  journey,
  sky,
  deeper,
  surah,
  page,
  explain,
  summary,
  englishSummary,
  marks = [],
  teach,
  quizCount,
  testPass,
  sourceHere,
  onContinue,
  bottomInset,
  testID = "learn-card"
}: LearnCardProps) {
  const all = !page;
  const at = (kind: LearnPageKind) => all || page === kind;
  const palette = topicPalette(accent);
  const onPlayAudio = arabicRecitation ? () => playAyah(arabicRecitation, { once: true }) : speak;
  const playback = useAyahPlayback();
  const online = useOnline();
  const recitationFailed = Boolean(arabicRecitation) && playback.url === arabicRecitation && playback.status === "error";
  useEffect(() => (arabicRecitation ? () => stopAyah(arabicRecitation) : undefined), [arabicRecitation]);
  const { width, height } = useWindowDimensions();
  const short = height > 0 && height < 720;
  const narrow = width > 0 && width < 360;
  // The title is hidden when the word card or the mascot already says the same thing.
  const showTitle =
    normalizeText(line) !== normalizeText(title) && (!arabic || (!looksSame(title, arabic.translit) && !looksSame(title, t(arabic.meaning))));
  const { ref, scrollProps, more, scrollDown } = useScrollMore();
  const learnReference = learnSource?.reference?.trim();
  const source = learnSource
    ? learnReference && learnSource.url
      ? { label: learnReference, url: sourceUrl(learnSource) }
      : undefined
    : legacySource;
  const allFacts = (facts ?? []).map((fact) => fact.trim()).filter(Boolean).slice(0, MAX_FACTS);
  const allEnglish = englishFacts?.map((fact) => fact.trim()).filter(Boolean).slice(0, MAX_FACTS);
  const englishMatch = allEnglish?.length === allFacts.length ? allEnglish : undefined;
  // On the facts page the source's summary sits under the points: a point it already says is not shown twice.
  const sourceSays = page === "facts" ? plainSummary(summary) : undefined;
  // The plain telling, unless the source's summary (or the mascot's line) already says it.
  const explainText =
    page === "facts" && explain?.trim() && !looksSame(explain, line) && !(sourceSays && saidInSummary(explain, sourceSays)) ? explain.trim() : undefined;
  const english = getActiveLanguage() === "en";
  // Only when the summary is in the learner's language: a Bangla learner keeps the Bangla points next to an English summary.
  const summaryTranslated = english || (Boolean(englishSummary?.trim()) && englishSummary?.trim() !== sourceSays);
  const sourceSaysEnglish = sourceSays && summaryTranslated ? englishSummary?.trim() || (english ? sourceSays : undefined) : undefined;
  const keep = allFacts.map((fact, index) => {
    const englishFact = englishMatch?.[index] ?? (english ? fact : undefined);
    return !englishFact || !sourceSaysEnglish || isCredit(englishFact, { reference: learnReference }) || !saidInSummary(englishFact, sourceSaysEnglish);
  });
  const factList = allFacts.filter((_, index) => keep[index]);
  // On the facts page a surah's parts sit in the same card as what you learn, not in a box of their own.
  const partsInCard = Boolean(page === "facts" && sourceHere && surah?.parts?.length);
  const englishList = englishMatch?.filter((_, index) => keep[index]);
  const notes = splitLessonFacts(factList, {
    english: englishList,
    sourceReference: learnReference,
    hadith: learnSource?.category === "hadith" || /^(sahih|sunan|jami|muwatta|riyad|al-adab)/i.test(learnReference ?? ""),
    language: getActiveLanguage()
  });
  const credits = notes.credits.join(" · ");
  const quoteText = quote?.text.trim();
  const quoteReference = quote?.reference?.trim();
  // The quote's reference opens the source when both name the same narration, so it is not said twice.
  const linkedReference = Boolean(quoteText && quoteReference && source && sameReference(quoteReference, source.label));
  // A single ayah in Arabic gets a recitation to listen to and repeat.
  const ayahAudio = quoteText && isArabicOnly(quoteText) ? quranAudioUrl(quoteReference) : null;
  const ayahKey = parseQuranReference(quoteReference);
  // Its words light up as the reciter says them.
  const recited = ayahAudio && ayahKey ? [{ key: `${ayahKey.surah}:${ayahKey.ayah}`, url: ayahAudio }] : [];
  // With facts or a quote to show, the mascot sits small next to its line to leave them room.
  const rich = factList.length > 0 || Boolean(quoteText) || Boolean(picture) || Boolean(journey) || Boolean(sky) || Boolean(deeper) || Boolean(surah);
  const quranWord = arabic ? isQuranText(arabic.ar) : false;
  const arabicSize = quranWord ? (narrow || short ? 24 : 28) : narrow || short ? (narrow ? 30 : 34) : 40;
  const openSource = (url: string) => {
    if (onOpenSource) {
      onOpenSource(url);
    } else {
      openWebPage(url);
    }
  };
  const deeperPart = deeper && (page === "meaning" || page === "story" || page === "takeaway") ? page : undefined;
  const deeperIntro = deeperPart === "meaning" ? t("Let me explain what it means.") : deeperPart === "story" ? t("Let me tell you the story.") : t("Take this home with you.");
  const deeperSaying = deeperPart === "meaning" ? deeper?.meaning.join(" ") : deeperPart === "story" ? deeper?.story : deeper?.takeaway;
  // What the teacher reads out when the speaker is tapped: the words this page shows, in the order it shows them, each
  // with the key of the block that shows it, so that block glows while it is said (see ReadGlow).
  const readParts: ReadPart[] =
    page === "quiz"
      ? [
          { key: "line", text: testPass ? t("Test time!") : t("Quiz time!") },
          { key: "line", text: quizLine(quizCount, testPass) }
        ]
      : page === "teach"
        ? [
            ...(teach?.lines ?? []).map((text) => ({ key: "line", text })),
            { key: "card-question", text: teach?.card?.question },
            { key: "card-answer", text: teach?.card?.answer }
          ]
        : deeperPart
          ? [
              { key: "line", text: deeperIntro },
              { key: "deeper", text: deeperSaying }
            ]
          : [
              ...(at("start")
                ? [
                    { key: "title", text: showTitle ? title : undefined },
                    // The word card: the Arabic word itself for a voice that reads Arabic letters, its Latin spelling for one that does not.
                    { key: "word", text: arabic ? `${readsArabic(getActiveLanguage()) ? arabic.ar : arabic.translit}: ${t(arabic.meaning)}` : undefined },
                    { key: "line", text: line },
                    { key: "quote", text: quoteText && !isArabicOnly(quoteText) ? quoteText : undefined }
                  ]
                : []),
              ...(page === "facts" || all
                ? [
                    { key: "explain", text: explainText },
                    { key: "summary", text: sourceSays },
                    ...notes.points.map((point, index) => ({ key: `point-${index}`, text: point.key ? `${point.key}: ${point.text}` : point.text }))
                  ]
                : [])
            ];
  const aloud = useReadAloud(readParts);
  // Once the learner asks the teacher to read, its mouth moves with the voice (and stops with it).
  const mouth = (ms: number) => aloud.talkMs ?? ms;

  const card = (
    <View style={styles.root} testID={testID}>
      <View style={styles.scrollBox}>
        <ScrollView ref={ref} style={styles.scroll} contentContainerStyle={[styles.content, short ? styles.contentShort : null]} {...scrollProps}>
          {/* Every page after the first names its lesson, small, above what it teaches. */}
          {!all && page !== "start" && page !== "quiz" ? (
            <Text style={styles.pageEyebrow} numberOfLines={2} testID="learn-page-title">
              {withHonorifics(noBreakHyphens(page === "teach" ? t("Good to know") : title))}
            </Text>
          ) : null}
          {/* Every later page opens on a big picture of what it teaches (or one that fits the lesson). */}
          {pagePicture && !all && page !== "start" && page !== "quiz" ? <LessonPhoto picture={pagePicture} short={short} delay={0} big /> : null}
          {page === "teach" && teach ? <TeachPage teach={teach} marks={marks} palette={palette} mascotVariant={mascotVariant} teacher={teacher} accent={accent} short={short} talkMs={aloud.talkMs} /> : null}
          {page === "quiz" ? <QuizPage count={quizCount} testPass={testPass} mascotVariant={mascotVariant} teacher={teacher} accent={accent} short={short} talkMs={aloud.talkMs} /> : null}
          {/* A surah's own lesson opens on a picture of what its name means. */}
          {surah && at("start") ? <SurahCover surah={surah.number} meaning={surah.meaning ?? arabic?.meaning} arabicName={arabic?.ar} short={short} /> : null}
          {/* NEW marks a new word, so it only shows with one the learner has not met yet. */}
          {arabic && isNewWord && at("start") ? (
            <PopIn style={styles.newPill}>
              <Icon name="sparkle" size={16} color={GOLD_INK} />
              <Text style={styles.newText}>{t("NEW")}</Text>
            </PopIn>
          ) : null}
          {showTitle && at("start") ? (
            <ReadGlow part="title" radius={radii.md} style={short ? styles.glowTopShort : styles.glowTop}>
              <Text style={[styles.title, short ? styles.titleShort : null, styles.flushTop]} accessibilityRole="header">
                {withHonorifics(noBreakHyphens(title))}
              </Text>
            </ReadGlow>
          ) : null}

          {arabic && at("start") ? (
            <PopIn delay={soon(120)} style={[styles.cardWrap, short ? styles.cardWrapShort : null]}>
              <ReadRing part="word" radius={radii.lg} />
              <View style={[styles.cardLip, { backgroundColor: palette.soft }]} />
              <View
                style={[styles.card, short ? styles.cardShort : null, { borderColor: palette.soft, backgroundColor: palette.light }]}
                accessible={!onPlayAudio}
                accessibilityRole={showTitle ? undefined : "header"}
                accessibilityLabel={`${arabic.translit}: ${t(arabic.meaning)}`}
              >
                {onPlayAudio ? (
                  // Tapping the word says it too, like the speaker next to it.
                  <Tappable
                    onPress={onPlayAudio}
                    pressScale={0.97}
                    accessibilityLabel={t("Play {word}", { word: arabic.translit })}
                    style={styles.arabicTap}
                    testID="learn-arabic-play"
                  >
                    <WriteIn cover={palette.light} ink={palette.ink} delay={soon(300)}>
                      <ArabicText size={arabicSize} weight="bold" quran={quranWord} color={palette.ink} style={styles.arabic} testID="learn-arabic">
                        {arabic.ar}
                      </ArabicText>
                    </WriteIn>
                  </Tappable>
                ) : (
                  <WriteIn cover={palette.light} ink={palette.ink} delay={soon(300)}>
                    <ArabicText size={arabicSize} weight="bold" quran={quranWord} color={palette.ink} style={styles.arabic} testID="learn-arabic">
                      {arabic.ar}
                    </ArabicText>
                  </WriteIn>
                )}
                {/* The speaker sits next to the transliteration, so the Arabic line keeps the full width. */}
                <View style={styles.translitRow}>
                  {onPlayAudio ? (
                    <Tappable
                      onPress={onPlayAudio}
                      style={[styles.speaker, short || narrow ? styles.speakerSmall : null]}
                      pressScale={0.9}
                      accessibilityLabel={t("Play {word}", { word: arabic.translit })}
                      testID="learn-audio"
                    >
                      <View style={[styles.speakerLip, short || narrow ? styles.speakerLipSmall : null]} />
                      <View style={[styles.speakerFace, short || narrow ? styles.speakerFaceSmall : null]}>
                        <Icon name="speaker" size={short || narrow ? 20 : 22} color={colors.white} />
                      </View>
                    </Tappable>
                  ) : null}
                  {/* Arabic readers read the word itself, so the Latin spelling is left out. */}
                  {getActiveLanguage() === "ar" ? null : (
                    <Text style={[styles.translit, short || narrow ? styles.translitSmall : null]}>
                      {withHonorifics(noBreakHyphens(arabic.translit))}
                    </Text>
                  )}
                </View>
                <Text style={styles.meaning}>{withHonorifics(noBreakHyphens(t(arabic.meaning)))}</Text>
                {recitationFailed ? (
                  <Text style={styles.audioError} testID="learn-audio-error">
                    {online ? t("Could not load. Check your internet.") : t("No internet. This is not saved on your phone yet.")}
                  </Text>
                ) : null}
              </View>
            </PopIn>
          ) : null}

          {!at("start") ? null : arabic || rich ? (
            <View style={[styles.talkRow, short ? styles.talkRowShort : null]}>
              <Teacher look={teacher} variant={mascotVariant} mood={arabic ? "happy" : "wave"} accent={accent} size={short ? (rich ? 52 : 64) : rich ? 68 : 92} talkMs={mouth(talkTime(line))} />
              <SlideIn delay={soon(320)} style={styles.bubbleWrap}>
                {/* The line the lesson teaches: big enough to read at a glance, using the width the mascot leaves. */}
                <SpeechBubble style={styles.bubbleWide} readPart="line">
                  <Text style={[styles.lineText, short || narrow ? styles.lineTextSmall : null]}>{withHonorifics(noBreakHyphens(line))}</Text>
                </SpeechBubble>
              </SlideIn>
            </View>
          ) : (
            <View style={[styles.talkColumn, short ? styles.talkColumnShort : null]}>
              <SlideIn delay={soon(200)} style={styles.bubbleTop}>
                <SpeechBubble tail="down" tailAlign="center" readPart="line">
                  <Text style={styles.bigLine}>{withHonorifics(noBreakHyphens(line))}</Text>
                </SpeechBubble>
              </SlideIn>
              <Teacher look={teacher} variant={mascotVariant} mood="wave" accent={accent} size={short ? 118 : 150} talkMs={mouth(talkTime(line))} />
            </View>
          )}

          {/* Under the mascot's line, so the line the lesson teaches stays in view on small phones. */}
          {journey && at("start") ? (
            <JourneyCard journey={journey} short={short} delay={soon(380)} onOpenSource={openSource} />
          ) : sky && at("start") ? (
            <SkyCard sky={sky} short={short} delay={soon(380)} onOpenSource={openSource} />
          ) : picture && at("start") ? (
            <LessonPhoto picture={picture} short={short} delay={soon(380)} big={!all} />
          ) : null}

          {/* On its own page, each part of the lesson is said by the teacher, who stays on the page talking. */}
          {deeperPart ? (
            <TeacherIntro text={deeperIntro} saying={deeperSaying} teacher={teacher} mascotVariant={mascotVariant} accent={accent} short={short} talkMs={aloud.talkMs} />
          ) : null}

          {(notes.points.length > 0 && at("facts")) || sourceSays || explainText || partsInCard ? (
            // One card: the story in a short paragraph, the points it does not already say, then what the surah is
            // made of. Where it is from is the source at the bottom of the page.
            <PopIn delay={soon(420)} from="up" style={[styles.notesWrap, short ? styles.notesWrapShort : null]}>
              <View style={[styles.notes, { borderColor: palette.soft }]} testID="learn-facts">
                <View style={styles.notesHead}>
                  {page === "facts" ? (
                    <Teacher look={teacher} variant={mascotVariant} accent={accent} size={short ? 40 : 48} talkMs={mouth(talkTime([explain ?? "", sourceSays ?? "", ...notes.points.map((point) => point.text)].join(" ")))} />
                  ) : (
                    <Icon name="bookOpen" size={20} color={palette.ink} />
                  )}
                  <Text style={[styles.notesTitle, { color: palette.ink }]} accessibilityRole="header">
                    {t("What you learn")}
                  </Text>
                </View>
                {explainText ? (
                  <ReadGlow part="explain" radius={radii.sm} style={styles.glowTop}>
                    <Text style={[styles.explainText, short ? styles.explainTextShort : null, styles.flushTop]} testID="learn-explain">
                      <Marked text={noBreakHyphens(explainText)} marks={marks} />
                    </Text>
                  </ReadGlow>
                ) : null}
                {sourceSays ? (
                  <ReadGlow part="summary" radius={radii.sm} style={styles.glowTop}>
                    <Text style={[styles.summaryText, short ? styles.noteTextShort : null, styles.flushTop]} testID="learn-summary">
                      <Marked text={noBreakHyphens(sourceSays)} marks={marks} />
                    </Text>
                  </ReadGlow>
                ) : null}
                {notes.points.map((point, index) => (
                  <View key={`${index}-${point.key ?? ""}-${point.text}`} style={styles.noteRow} testID="learn-fact">
                    <ReadRing part={`point-${index}`} radius={radii.sm} />
                    <View style={[styles.noteNumber, { backgroundColor: palette.main }]}>
                      <Text style={styles.noteNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.noteText, short ? styles.noteTextShort : null]}>
                      {point.key ? <Text style={styles.noteKey}>{`${point.key}: `}</Text> : null}
                      <Marked text={noBreakHyphens(point.text)} marks={marks} />
                    </Text>
                  </View>
                ))}
                {partsInCard ? <SurahParts parts={surah!.parts!} accent={accent} short={short} inline /> : null}
              </View>
            </PopIn>
          ) : null}

          {quoteText && at("start") ? (
            <PopIn delay={soon(460)} from="up" style={[styles.quoteWrap, short ? styles.quoteWrapShort : null]}>
              <ReadRing part="quote" radius={radii.md} />
              <View style={[styles.quote, { borderColor: palette.soft }]} testID="learn-quote">
                <View style={[styles.quoteBar, { backgroundColor: palette.main }]} />
                <View style={styles.quoteBody}>
                  {isArabicOnly(quoteText) ? (
                    ayahAudio ? (
                      // Tapping the ayah recites it again from the start.
                      <Tappable
                        onPress={() => playAyah(ayahAudio)}
                        pressScale={0.98}
                        accessibilityRole="button"
                        accessibilityLabel={t("Listen")}
                        testID="learn-quote-ayah"
                      >
                        <RecitedAyah
                          text={quoteText}
                          ayahs={recited}
                          size={narrow ? 19 : 21}
                          quran
                          color={colors.ink}
                          align="right"
                          style={styles.quoteArabic}
                          testID="learn-quote-text"
                        />
                      </Tappable>
                    ) : (
                      <ArabicText size={narrow ? 19 : 21} quran color={colors.ink} align="right" style={styles.quoteArabic} testID="learn-quote-text">
                        {quoteText}
                      </ArabicText>
                    )
                  ) : (
                    <Text style={[styles.quoteText, quoteText.length > 160 ? styles.quoteTextLong : null]} testID="learn-quote-text">
                      {withHonorifics(noBreakHyphens(quoteText))}
                    </Text>
                  )}
                  {quoteReference && linkedReference && source ? (
                    <Tappable
                      onPress={() => openSource(source.url)}
                      style={styles.quoteLink}
                      accessibilityLabel={t("Open source {name}", { name: quoteReference })}
                      accessibilityRole="link"
                      hitSlop={6}
                      testID="learn-source"
                    >
                      <Icon name="book" size={16} />
                      <Text style={[styles.quoteReference, styles.quoteLinkText]}>{withHonorifics(quoteReference)}</Text>
                      <Icon name="chevronRight" size={14} color={colors.inkSoft} />
                    </Tappable>
                  ) : quoteReference ? (
                    <Text style={styles.quoteReference} testID="learn-quote-reference">
                      {withHonorifics(quoteReference)}
                    </Text>
                  ) : null}
                  {credits && linkedReference ? (
                    <Text style={styles.quoteCredits} testID="learn-credits">
                      {withHonorifics(noBreakHyphens(credits))}
                    </Text>
                  ) : null}
                  {ayahAudio ? <AyahListen url={ayahAudio} accent={palette.main} timed={fitsRecitation(quoteText ?? "", recited)} /> : null}
                </View>
              </View>
            </PopIn>
          ) : null}

          {surah?.parts?.length && (all || sourceHere) && !partsInCard ? <SurahParts parts={surah.parts} accent={accent} short={short} /> : null}

          {deeper && (all || page === "meaning" || page === "story" || page === "takeaway") ? (
            <DeeperLesson deeper={deeper} palette={palette} short={short} onOpen={openSource} part={all ? undefined : (page as "meaning" | "story" | "takeaway")} marks={marks} />
          ) : null}

          {/* Where it is from, at the end of the lesson: the source's link, then who told it and its grade. */}
          {(all || sourceHere) && ((source && !linkedReference) || (credits && !linkedReference)) ? (
            <PopIn delay={soon(480)} style={[styles.sourceWrap, short ? styles.sourceWrapShort : null]}>
              <Text style={styles.sourceLabel}>{t("Source")}</Text>
              {source && !linkedReference ? (
                <Tappable
                  onPress={() => openSource(source.url)}
                  style={styles.sourceChip}
                  accessibilityLabel={t("Open source {name}", { name: source.label })}
                  accessibilityRole="link"
                  testID="learn-source"
                >
                  <Icon name="book" size={18} />
                  <Text style={styles.sourceText} numberOfLines={1}>
                    {withHonorifics(source.label)}
                  </Text>
                  <View style={styles.sourceChevron}>
                    <Icon name="chevronRight" size={16} color={colors.inkSoft} />
                  </View>
                </Tappable>
              ) : null}
              {credits ? (
                <Text style={styles.sourceCredits} testID="learn-credits">
                  {withHonorifics(noBreakHyphens(credits))}
                </Text>
              ) : null}
            </PopIn>
          ) : null}
        </ScrollView>
      </View>

      <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more, onPress: scrollDown }}>
        <View style={styles.barRow}>
          {/* The teacher reads the page out: next to CONTINUE, in the same place on every page. */}
          {aloud.onRead ? <ReadAloudButton reading={aloud.reading} onPress={aloud.onRead} /> : null}
          <View style={styles.barContinue}>
            <GameButton label={t("Continue")} fullWidth onPress={onContinue} testID="learn-continue" />
          </View>
        </View>
      </LessonBottomBar>
    </View>
  );
  // The block the teacher is reading glows: a child who cannot read well yet follows along.
  return <ReadingContext.Provider value={aloud.lit}>{card}</ReadingContext.Provider>;
}

/** What the ayahs mean, the story and what to take home, with a chip for each tafsir book it comes from. */
function DeeperLesson({
  deeper,
  palette,
  short,
  onOpen,
  part,
  marks = []
}: {
  deeper: NonNullable<LearnCardProps["deeper"]>;
  palette: ReturnType<typeof topicPalette>;
  short: boolean;
  onOpen: (url: string) => void;
  /** Only this part, on its own page; unset shows all of it. */
  part?: "meaning" | "story" | "takeaway";
  marks?: string[];
}) {
  const meaning = part && part !== "meaning" ? [] : deeper.meaning.map((line) => line.trim()).filter(Boolean);
  const hasStory = Boolean(deeper.story?.trim());
  const hasTakeaway = Boolean(deeper.takeaway?.trim());
  const showStory = hasStory && (!part || part === "story");
  const showTakeaway = hasTakeaway && (!part || part === "takeaway");
  // The tafsir books go on the last page of the deeper lesson.
  const lastPart = hasTakeaway ? "takeaway" : hasStory ? "story" : "meaning";
  const linked = !part || part === lastPart ? deeper.sources.filter((each) => each.reference?.trim() && each.url) : [];
  // Sources open in English: an Arabic-only tafsir (as-Sa'di) is left off when an English one says the same.
  const english = linked.filter((each) => !ARABIC_ONLY_TAFSIR.test(each.url));
  const chips = english.length ? english : linked;
  return (
    <PopIn delay={soon(500)} from="up" style={[styles.deeper, short ? styles.deeperShort : null, { borderColor: palette.soft }]}>
      {part ? <ReadRing part="deeper" radius={radii.lg} inset={7} /> : null}
      <View testID="learn-deeper">
        {meaning.length && !part ? (
          <View style={styles.deeperHead}>
            <Icon name="bookOpen" size={20} color={palette.ink} />
            <Text style={[styles.deeperTitle, { color: palette.ink }]} accessibilityRole="header">
              {t("What it means")}
            </Text>
          </View>
        ) : null}
        {meaning.map((line, index) => (
          // On its own page the lines come in one after another, as the teacher says them.
          <PopIn key={`${index}-${line}`} delay={part ? soon(300 + index * 220) : 0} from="up" distance={part ? 10 : 0}>
            <View style={styles.deeperRow}>
              <View style={[styles.deeperDot, { backgroundColor: palette.main }]} />
              <Text style={[styles.deeperText, part ? styles.pagedText : null]} testID="learn-deeper-meaning">
                <Marked text={noBreakHyphens(line)} marks={marks} />
              </Text>
            </View>
          </PopIn>
        ))}
        {showStory ? (
          <View style={[styles.deeperStory, part ? styles.deeperFirst : null, { backgroundColor: palette.light }]} testID="learn-deeper-story">
            <Text style={[styles.deeperLabel, { color: palette.ink }]}>{t("The story")}</Text>
            <Text style={[styles.deeperText, part ? styles.pagedText : null]}>
              <Marked text={noBreakHyphens(deeper.story!.trim())} marks={marks} />
            </Text>
          </View>
        ) : null}
        {showTakeaway ? (
          <View style={[styles.deeperTake, part ? styles.deeperFirst : null]} testID="learn-deeper-takeaway">
            <Icon name="sparkle" size={18} color={GOLD_INK} />
            <View style={styles.deeperTakeBody}>
              <Text style={[styles.deeperLabel, { color: GOLD_INK }]}>{t("Take home")}</Text>
              <Text style={[styles.deeperText, part ? styles.pagedText : null]}>
                <Marked text={noBreakHyphens(deeper.takeaway!.trim())} marks={marks} />
              </Text>
            </View>
          </View>
        ) : null}
        {chips.length ? (
          <View style={styles.deeperChips}>
            {chips.map((each) => (
              <Tappable
                key={each.url}
                onPress={() => onOpen(sourceUrl(each))}
                style={styles.deeperChip}
                accessibilityLabel={t("Open source {name}", { name: each.reference! })}
                accessibilityRole="link"
                hitSlop={4}
                testID="learn-deeper-source"
              >
                <Icon name="book" size={15} />
                <Text style={styles.deeperChipText} numberOfLines={1}>
                  {withHonorifics(each.reference!)}
                </Text>
              </Tappable>
            ))}
          </View>
        ) : null}
      </View>
    </PopIn>
  );
}

/** Text with the words the questions ask about picked out, so the eye lands on what will be asked. */
function Marked({ text: value, marks }: { text: string; marks: string[] }) {
  const pieces = highlightPieces(value, marks);
  if (pieces.length === 1 && !pieces[0].mark) {
    return <>{withHonorifics(value)}</>;
  }
  return (
    <>
      {pieces.map((piece, index) =>
        piece.mark ? (
          <Text key={index} style={styles.mark} testID="learn-mark">
            {withHonorifics(piece.text)}
          </Text>
        ) : (
          <React.Fragment key={index}>{withHonorifics(piece.text)}</React.Fragment>
        )
      )}
    </>
  );
}

/**
 * The teacher at the top of a lesson page, saying what the page is about. Its mouth keeps moving for about as long
 * as it takes to say what is on the page (`saying`), so it reads as the teacher telling the lesson.
 */
function TeacherIntro({
  text: intro,
  saying,
  teacher,
  mascotVariant,
  accent,
  short,
  talkMs
}: {
  text: string;
  saying?: string;
  teacher?: TeacherLook;
  mascotVariant: string;
  accent: string;
  short: boolean;
  /** Set once the page is being read aloud: the mouth moves with the voice. */
  talkMs?: number;
}) {
  return (
    <View style={[styles.talkRow, styles.introRow, short ? styles.introRowShort : null]} testID="learn-teacher-intro">
      <Teacher look={teacher} variant={mascotVariant} accent={accent} size={short ? 50 : 60} talkMs={talkMs ?? talkTime(`${intro} ${saying ?? ""}`)} />
      <SlideIn delay={soon(120)} style={styles.bubbleWrap}>
        <SpeechBubble readPart="line">
          <Text style={[styles.lineText, styles.introText]} testID="learn-teacher-line">
            {intro}
          </Text>
        </SpeechBubble>
      </SlideIn>
    </View>
  );
}

/** Good to know: the one fact the next question asks, said by the mascot, or a small flash card of it. */
function TeachPage({
  teach,
  marks,
  palette,
  mascotVariant,
  teacher,
  accent,
  short,
  talkMs
}: {
  teach: TeachLesson;
  marks: string[];
  palette: ReturnType<typeof topicPalette>;
  mascotVariant: string;
  teacher?: TeacherLook;
  accent: string;
  short: boolean;
  talkMs?: number;
}) {
  const answerMarks = teach.answer ? [teach.answer, ...marks] : marks;
  return (
    <View style={styles.teach} testID="learn-teach">
      {teach.lines.length ? (
        <View style={[styles.talkRow, short ? styles.talkRowShort : null]}>
          <Teacher look={teacher} variant={mascotVariant} accent={accent} size={short ? 56 : 72} talkMs={talkMs ?? talkTime(teach.lines.join(" "))} />
          <SlideIn delay={soon(200)} style={styles.bubbleWrap}>
            <SpeechBubble style={styles.bubbleWide} readPart="line">
              {teach.lines.map((line, index) => (
                <Text key={index} style={[styles.lineText, index > 0 ? styles.teachExtra : null]} testID="learn-teach-line">
                  <Marked text={noBreakHyphens(line)} marks={answerMarks} />
                </Text>
              ))}
            </SpeechBubble>
          </SlideIn>
        </View>
      ) : null}
      {teach.card ? (
        <PopIn delay={soon(teach.lines.length ? 420 : 200)} from="up" style={styles.notesWrap}>
          <View style={[styles.teachCard, { borderColor: palette.soft }]} testID="learn-teach-card">
            <ReadGlow part="card-question" radius={radii.sm}>
              <Text style={styles.teachQuestion}>{withHonorifics(noBreakHyphens(teach.card.question))}</Text>
            </ReadGlow>
            <View
              style={[
                styles.teachAnswer,
                teach.card.isFalse
                  ? { backgroundColor: colors.wrongBg, borderColor: colors.wrongBg }
                  : { backgroundColor: palette.light, borderColor: palette.soft }
              ]}
            >
              <ReadRing part="card-answer" radius={radii.md} inset={7} />
              <Icon name={teach.card.isFalse ? "close" : "check"} size={18} color={teach.card.isFalse ? colors.wrongInk : palette.ink} />
              <Text style={[styles.teachAnswerText, { color: teach.card.isFalse ? colors.wrongInk : palette.ink }]}>{withHonorifics(noBreakHyphens(teach.card.answer))}</Text>
            </View>
          </View>
        </PopIn>
      ) : null}
      {!teach.lines.length ? (
        <View style={styles.teachMascot}>
          <Teacher look={teacher} variant={mascotVariant} accent={accent} size={short ? 72 : 96} talkMs={talkMs} />
        </View>
      ) : null}
    </View>
  );
}

/** An Urdu or Arabic voice reads Arabic letters; an English or Bangla one does not. */
function readsArabic(language: string) {
  return language === "ar" || language === "ur";
}

/** What the quiz page says under "Quiz time!". */
function quizLine(count?: number, testPass?: number) {
  return testPass && count
    ? t("Get {count} of {total} right to pass this unit.", { count: testPass, total: count })
    : count && count > 1
      ? t("{count} questions from your last lessons, in new ways.", { count })
      : t("Get them right to move on.");
}

/** Quiz time: the circle's quiz is next. */
function QuizPage({
  count,
  testPass,
  mascotVariant,
  teacher,
  accent,
  short,
  talkMs
}: {
  count?: number;
  testPass?: number;
  mascotVariant: string;
  teacher?: TeacherLook;
  accent: string;
  short: boolean;
  talkMs?: number;
}) {
  return (
    <View style={[styles.talkColumn, short ? styles.talkColumnShort : null]} testID="learn-quiz">
      <SlideIn delay={soon(150)} style={styles.bubbleTop}>
        <SpeechBubble tail="down" tailAlign="center" readPart="line">
          <Text style={styles.bigLine}>{testPass ? t("Test time!") : t("Quiz time!")}</Text>
          <Text style={styles.quizSub}>{quizLine(count, testPass)}</Text>
        </SpeechBubble>
      </SlideIn>
      <Teacher look={teacher} variant={mascotVariant} mood="cheer" accent={accent} size={short ? 118 : 150} talkMs={talkMs ?? 1400} />
    </View>
  );
}

const SPEAKER = 44;
const SPEAKER_SMALL = 38;

const styles = textScaled(StyleSheet.create({
  // A block that glows while it is read keeps its room above on the glow's box, so the glow sits round its words.
  glowTop: {
    marginTop: space.sm
  },
  glowTopShort: {
    marginTop: space.xs
  },
  flushTop: {
    marginTop: 0
  },
  barRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.sm
  },
  barContinue: {
    flex: 1,
    minWidth: 0
  },
  writeWrap: {
    alignSelf: "stretch",
    overflow: "hidden"
  },
  writePen: {
    position: "absolute",
    top: 0,
    left: 0
  },
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  scrollBox: {
    flex: 1,
    minHeight: 0,
    position: "relative"
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: space.md,
    paddingTop: space.sm,
    paddingBottom: space.xxxl,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  },
  contentShort: {
    paddingTop: space.xs,
    paddingBottom: space.xl
  },
  newPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 3
  },
  newText: {
    marginStart: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
    color: GOLD_INK
  },
  title: {
    ...text.h2,
    textAlign: "center",
    marginTop: space.sm,
    flexShrink: 1,
    maxWidth: "100%"
  },
  titleShort: {
    fontSize: 23,
    lineHeight: 29,
    marginTop: space.xs
  },
  cardWrap: {
    alignSelf: "stretch",
    marginTop: space.lg,
    paddingBottom: lip.tile,
    position: "relative"
  },
  cardWrapShort: {
    marginTop: space.md
  },
  cardLip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: lip.tile,
    bottom: 0,
    borderRadius: radii.lg
  },
  card: {
    borderWidth: 2,
    borderRadius: radii.lg,
    paddingHorizontal: space.lg,
    paddingTop: space.md,
    paddingBottom: space.lg,
    alignItems: "center"
  },
  cardShort: {
    paddingHorizontal: space.md,
    paddingTop: space.sm,
    paddingBottom: space.md
  },
  arabic: {
    maxWidth: "100%"
  },
  arabicTap: {
    maxWidth: "100%",
    alignItems: "center"
  },
  translitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%"
  },
  speaker: {
    width: SPEAKER,
    height: SPEAKER + lip.button,
    marginEnd: space.sm
  },
  speakerSmall: {
    width: SPEAKER_SMALL,
    height: SPEAKER_SMALL + lip.button
  },
  speakerLip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: lip.button,
    height: SPEAKER,
    borderRadius: SPEAKER / 2,
    backgroundColor: colors.gemLip
  },
  speakerLipSmall: {
    height: SPEAKER_SMALL,
    borderRadius: SPEAKER_SMALL / 2
  },
  speakerFace: {
    width: SPEAKER,
    height: SPEAKER,
    borderRadius: SPEAKER / 2,
    backgroundColor: colors.gem,
    alignItems: "center",
    justifyContent: "center"
  },
  speakerFaceSmall: {
    width: SPEAKER_SMALL,
    height: SPEAKER_SMALL,
    borderRadius: SPEAKER_SMALL / 2
  },
  translit: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1
  },
  translitSmall: {
    fontSize: 18,
    lineHeight: 24
  },
  meaning: {
    ...text.small,
    fontFamily: fonts.bodyBold,
    textAlign: "center",
    marginTop: 2,
    flexShrink: 1
  },
  audioError: {
    ...text.small,
    fontSize: 12,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 4
  },
  talkRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: space.xl
  },
  talkRowShort: {
    marginTop: space.sm
  },
  introRow: {
    marginTop: space.md,
    marginBottom: space.xs
  },
  introRowShort: {
    marginTop: space.xs
  },
  introText: {
    fontSize: 17,
    lineHeight: 23
  },
  bubbleWrap: {
    flex: 1,
    minWidth: 0,
    marginStart: space.xs,
    alignItems: "flex-start"
  },
  bubbleWide: {
    alignSelf: "stretch"
  },
  lineText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 19,
    lineHeight: 26,
    color: colors.ink,
    flexShrink: 1
  },
  lineTextSmall: {
    fontSize: 17,
    lineHeight: 23
  },
  talkColumn: {
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: space.xxl
  },
  talkColumnShort: {
    marginTop: space.lg
  },
  bubbleTop: {
    maxWidth: "100%",
    marginBottom: space.md
  },
  bigLine: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 19,
    lineHeight: 26,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1
  },
  notesWrap: {
    alignSelf: "stretch",
    marginTop: space.lg
  },
  notesWrapShort: {
    marginTop: space.sm
  },
  notes: {
    borderWidth: 2,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingTop: space.sm,
    paddingBottom: space.md
  },
  notesHead: {
    flexDirection: "row",
    alignItems: "center"
  },
  notesTitle: {
    marginStart: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: space.sm
  },
  noteNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 10,
    marginTop: 1
  },
  noteNumberText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: colors.white
  },
  noteText: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 19,
    lineHeight: 28,
    color: colors.ink
  },
  noteTextShort: {
    fontSize: 16,
    lineHeight: 23
  },
  noteKey: {
    fontFamily: fonts.bodyBold,
    color: colors.inkSoft
  },
  quoteWrap: {
    alignSelf: "stretch",
    marginTop: space.lg
  },
  quoteWrapShort: {
    marginTop: space.md
  },
  quote: {
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: radii.md,
    backgroundColor: colors.white,
    overflow: "hidden"
  },
  quoteBar: {
    width: 5
  },
  quoteBody: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: space.md,
    paddingTop: space.sm,
    paddingBottom: space.sm
  },
  quoteText: {
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    lineHeight: 25,
    color: colors.ink
  },
  quoteTextLong: {
    fontSize: 15,
    lineHeight: 21
  },
  quoteArabic: {
    alignSelf: "stretch"
  },
  quoteReference: {
    marginTop: space.xs,
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft,
    textAlign: "right"
  },
  quoteLink: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    maxWidth: "100%",
    marginTop: space.xs,
    minHeight: 28
  },
  quoteLinkText: {
    marginTop: 0,
    marginStart: 5,
    marginEnd: 2
  },
  sourceWrap: {
    marginTop: space.xl,
    maxWidth: "100%",
    alignItems: "center"
  },
  sourceLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.inkSoft,
    marginBottom: 6
  },
  sourceCredits: {
    marginTop: 6,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft,
    textAlign: "center"
  },
  quoteCredits: {
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
    textAlign: "right"
  },
  sourceWrapShort: {
    marginTop: space.sm
  },
  sourceChip: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    minHeight: 40,
    paddingStart: 14,
    paddingEnd: 10,
    paddingVertical: 6
  },
  sourceChevron: {
    marginStart: 4
  },
  deeper: {
    alignSelf: "stretch",
    marginTop: space.lg,
    borderWidth: 2,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingVertical: space.md
  },
  deeperShort: {
    marginTop: space.md
  },
  deeperHead: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: space.xs
  },
  deeperTitle: {
    marginStart: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24
  },
  deeperRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: space.xs
  },
  deeperDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginTop: 8,
    marginEnd: 8
  },
  deeperText: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    lineHeight: 25,
    color: colors.ink
  },
  deeperLabel: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0.5,
    marginBottom: 2
  },
  deeperStory: {
    marginTop: space.sm,
    borderRadius: radii.md,
    paddingHorizontal: space.sm,
    paddingVertical: space.sm
  },
  deeperTake: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: space.sm,
    borderRadius: radii.md,
    backgroundColor: "#FFF6D9",
    paddingHorizontal: space.sm,
    paddingVertical: space.sm
  },
  deeperTakeBody: {
    flex: 1,
    minWidth: 0,
    marginStart: 6
  },
  deeperChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: space.sm,
    gap: 6
  },
  deeperChip: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: "100%",
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.pill,
    minHeight: 32,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  deeperChipText: {
    marginStart: 5,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.ink
  },
  pageEyebrow: {
    alignSelf: "stretch",
    textAlign: "center",
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.ink,
    marginBottom: space.xs
  },
  pagedText: {
    fontSize: 18,
    lineHeight: 27
  },
  deeperFirst: {
    marginTop: 0
  },
  mark: {
    fontFamily: fonts.bodyHeavy,
    color: colors.ink,
    backgroundColor: "#FFE9A8"
  },
  summaryText: {
    marginTop: space.sm,
    fontFamily: fonts.bodyBold,
    fontSize: 19,
    lineHeight: 28,
    color: colors.ink
  },
  // The lesson told plainly: the biggest words on the page.
  explainText: {
    marginTop: space.sm,
    fontFamily: fonts.bodyHeavy,
    fontSize: 21,
    lineHeight: 30,
    color: colors.ink
  },
  explainTextShort: {
    fontSize: 18,
    lineHeight: 26
  },
  teach: {
    alignSelf: "stretch",
    alignItems: "center"
  },
  teachExtra: {
    marginTop: space.xs,
    fontSize: 16,
    lineHeight: 23,
    color: colors.inkSoft
  },
  teachCard: {
    borderWidth: 2,
    borderRadius: radii.lg,
    backgroundColor: colors.white,
    paddingHorizontal: space.md,
    paddingVertical: space.md
  },
  teachQuestion: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    lineHeight: 26,
    color: colors.ink
  },
  teachAnswer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    maxWidth: "100%",
    marginTop: space.sm,
    borderWidth: 2,
    borderRadius: radii.md,
    paddingHorizontal: space.sm,
    paddingVertical: 6,
    gap: 6
  },
  teachAnswerText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 18,
    lineHeight: 25
  },
  teachMascot: {
    marginTop: space.lg,
    alignItems: "center"
  },
  quizSub: {
    marginTop: space.xs,
    textAlign: "center",
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    lineHeight: 23,
    color: colors.inkSoft
  },
  sourceText: {
    marginStart: 6,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink
  }
}));
