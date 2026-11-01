import React, { useEffect, useRef } from "react";
import { Animated, Linking, ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText, isArabicOnly, isQuranText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lip, radii, space, text, topicPalette } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { looksSame, noBreakHyphens, normalizeText } from "./lessonText";
import { useScrollMore } from "./ScrollHint";
import { AyahListen, useAyahPlayback } from "./AyahListen";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import { quranAudioUrl } from "../../services/quranAudio";
import { sourceUrl } from "../../services/sourceLink";
import { getActiveLanguage, t } from "../../i18n";
import type { LessonPicture } from "../../data/lessonPictures";
import { LessonPhoto } from "./LessonPhoto";
import { SurahCover, SurahParts } from "./SurahCover";
import { splitLessonFacts } from "./lessonNotes";
import { highlightPieces, type LearnPageKind, type TeachLesson } from "./lessonPages";

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
  accent: string;
  /**
   * The one source that says what the card says (lesson.learnSource). Its chip shows only the short
   * reference ("Quran 2:43", "Sahih al-Bukhari 6018") on one line, never a page title: no reference, no chip.
   */
  learnSource?: { reference?: string; url: string; highlight?: string; category?: string };
  /** Older call sites: a chip with this label. Ignored when learnSource is given; pass learnSource instead. */
  source?: { label: string; url: string };
  /** Defaults to opening the url with Linking. */
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
  /** What the source says, in one sentence: shown on the "facts" page under the points. */
  summary?: string;
  /** Words to highlight on the page: the answers this lesson's questions ask for. */
  marks?: string[];
  /** The "teach" page's fact. */
  teach?: TeachLesson;
  /** How many questions the "quiz" page announces. */
  quizCount?: number;
  /** The source's link and credits show on this page (the "facts" page, or the first page without one). */
  sourceHere?: boolean;
  onContinue: () => void;
  bottomInset?: number;
  testID?: string;
};

const GOLD_INK = darken(colors.goldLip, 0.45);
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
  accent,
  learnSource,
  source: legacySource,
  onOpenSource,
  onPlayAudio: speak,
  arabicRecitation,
  picture,
  deeper,
  surah,
  page,
  summary,
  marks = [],
  teach,
  quizCount,
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
  const factList = (facts ?? []).map((fact) => fact.trim()).filter(Boolean).slice(0, MAX_FACTS);
  const englishList = englishFacts?.map((fact) => fact.trim()).filter(Boolean).slice(0, MAX_FACTS);
  const notes = splitLessonFacts(factList, {
    english: englishList?.length === factList.length ? englishList : undefined,
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
  // With facts or a quote to show, the mascot sits small next to its line to leave them room.
  const rich = factList.length > 0 || Boolean(quoteText) || Boolean(picture) || Boolean(deeper) || Boolean(surah);
  const quranWord = arabic ? isQuranText(arabic.ar) : false;
  const arabicSize = quranWord ? (narrow || short ? 24 : 28) : narrow || short ? (narrow ? 30 : 34) : 40;
  const openSource = (url: string) => {
    if (onOpenSource) {
      onOpenSource(url);
    } else {
      void Linking.openURL(url).catch(() => undefined);
    }
  };

  return (
    <View style={styles.root} testID={testID}>
      <View style={styles.scrollBox}>
        <ScrollView ref={ref} style={styles.scroll} contentContainerStyle={[styles.content, short ? styles.contentShort : null]} {...scrollProps}>
          {/* Every page after the first names its lesson, small, above what it teaches. */}
          {!all && page !== "start" && page !== "quiz" ? (
            <Text style={styles.pageEyebrow} numberOfLines={2} testID="learn-page-title">
              {withHonorifics(noBreakHyphens(page === "teach" ? t("Good to know") : title))}
            </Text>
          ) : null}
          {page === "teach" && teach ? <TeachPage teach={teach} marks={marks} palette={palette} mascotVariant={mascotVariant} accent={accent} short={short} /> : null}
          {page === "quiz" ? <QuizPage count={quizCount} mascotVariant={mascotVariant} accent={accent} short={short} /> : null}
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
            <Text style={[styles.title, short ? styles.titleShort : null]} accessibilityRole="header">
              {withHonorifics(noBreakHyphens(title))}
            </Text>
          ) : null}

          {arabic && at("start") ? (
            <PopIn delay={120} style={[styles.cardWrap, short ? styles.cardWrapShort : null]}>
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
                    <ArabicText size={arabicSize} weight="bold" quran={quranWord} color={palette.ink} style={styles.arabic} testID="learn-arabic">
                      {arabic.ar}
                    </ArabicText>
                  </Tappable>
                ) : (
                  <ArabicText size={arabicSize} weight="bold" quran={quranWord} color={palette.ink} style={styles.arabic} testID="learn-arabic">
                    {arabic.ar}
                  </ArabicText>
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
                    {t("Could not load. Check your internet.")}
                  </Text>
                ) : null}
              </View>
            </PopIn>
          ) : null}

          {!at("start") ? null : arabic || rich ? (
            <View style={[styles.talkRow, short ? styles.talkRowShort : null]}>
              <Mascot variant={mascotVariant} mood={arabic ? "happy" : "wave"} accent={accent} size={short ? (rich ? 52 : 64) : rich ? 68 : 92} />
              <SlideIn delay={320} style={styles.bubbleWrap}>
                {/* The line the lesson teaches: big enough to read at a glance, using the width the mascot leaves. */}
                <SpeechBubble style={styles.bubbleWide}>
                  <Text style={[styles.lineText, short || narrow ? styles.lineTextSmall : null]}>{withHonorifics(noBreakHyphens(line))}</Text>
                </SpeechBubble>
              </SlideIn>
            </View>
          ) : (
            <View style={[styles.talkColumn, short ? styles.talkColumnShort : null]}>
              <SlideIn delay={200} style={styles.bubbleTop}>
                <SpeechBubble tail="down" tailAlign="center">
                  <Text style={styles.bigLine}>{withHonorifics(noBreakHyphens(line))}</Text>
                </SpeechBubble>
              </SlideIn>
              <Mascot variant={mascotVariant} mood="wave" accent={accent} size={short ? 118 : 150} />
            </View>
          )}

          {/* Under the mascot's line, so the line the lesson teaches stays in view on small phones. */}
          {picture && at("start") ? <LessonPhoto picture={picture} short={short} delay={380} /> : null}

          {notes.points.length > 0 && at("facts") ? (
            // The facts read as a short lesson: a heading, then each fact as its own numbered line.
            <PopIn delay={420} from="up" style={[styles.notesWrap, short ? styles.notesWrapShort : null]}>
              <View style={[styles.notes, { borderColor: palette.soft }]} testID="learn-facts">
                <View style={styles.notesHead}>
                  <Icon name="bookOpen" size={18} color={palette.ink} />
                  <Text style={[styles.notesTitle, { color: palette.ink }]} accessibilityRole="header">
                    {t("What you learn")}
                  </Text>
                </View>
                {notes.points.map((point, index) => (
                  <View key={`${index}-${point.key ?? ""}-${point.text}`} style={styles.noteRow} testID="learn-fact">
                    <View style={[styles.noteNumber, { backgroundColor: palette.main }]}>
                      <Text style={styles.noteNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.noteText, short ? styles.noteTextShort : null]}>
                      {point.key ? <Text style={styles.noteKey}>{`${point.key}: `}</Text> : null}
                      <Marked text={noBreakHyphens(point.text)} marks={marks} />
                    </Text>
                  </View>
                ))}
              </View>
            </PopIn>
          ) : null}

          {page === "facts" && summary?.trim() ? (
            <PopIn delay={notes.points.length ? 520 : 200} from="up" style={[styles.notesWrap, short ? styles.notesWrapShort : null]}>
              <View style={[styles.summary, { backgroundColor: palette.light, borderColor: palette.soft }]} testID="learn-summary">
                <Text style={[styles.deeperLabel, { color: palette.ink }]}>{t("What the source says")}</Text>
                <Text style={[styles.deeperText, styles.summaryText]}>
                  <Marked text={noBreakHyphens(summary.trim())} marks={marks} />
                </Text>
              </View>
            </PopIn>
          ) : null}

          {quoteText && at("start") ? (
            <PopIn delay={460} from="up" style={[styles.quoteWrap, short ? styles.quoteWrapShort : null]}>
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
                        <ArabicText size={narrow ? 19 : 21} quran color={colors.ink} align="right" style={styles.quoteArabic} testID="learn-quote-text">
                          {quoteText}
                        </ArabicText>
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
                  {ayahAudio ? <AyahListen url={ayahAudio} accent={palette.main} /> : null}
                </View>
              </View>
            </PopIn>
          ) : null}

          {surah?.parts?.length && (all || sourceHere) ? <SurahParts parts={surah.parts} accent={accent} short={short} /> : null}

          {deeper && (all || page === "meaning" || page === "story" || page === "takeaway") ? (
            <DeeperLesson deeper={deeper} palette={palette} short={short} onOpen={openSource} part={all ? undefined : (page as "meaning" | "story" | "takeaway")} marks={marks} />
          ) : null}

          {/* Where it is from, at the end of the lesson: the source's link, then who told it and its grade. */}
          {(all || sourceHere) && ((source && !linkedReference) || (credits && !linkedReference)) ? (
            <PopIn delay={480} style={[styles.sourceWrap, short ? styles.sourceWrapShort : null]}>
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
        <GameButton label={t("Continue")} fullWidth onPress={onContinue} testID="learn-continue" />
      </LessonBottomBar>
    </View>
  );
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
  const chips = !part || part === lastPart ? deeper.sources.filter((each) => each.reference?.trim() && each.url) : [];
  return (
    <PopIn delay={500} from="up" style={[styles.deeper, short ? styles.deeperShort : null, { borderColor: palette.soft }]}>
      <View testID="learn-deeper">
        {meaning.length ? (
          <View style={styles.deeperHead}>
            <Icon name="bookOpen" size={20} color={palette.ink} />
            <Text style={[styles.deeperTitle, { color: palette.ink }]} accessibilityRole="header">
              {t("What it means")}
            </Text>
          </View>
        ) : null}
        {meaning.map((line, index) => (
          <View key={`${index}-${line}`} style={styles.deeperRow}>
            <View style={[styles.deeperDot, { backgroundColor: palette.main }]} />
            <Text style={[styles.deeperText, part ? styles.pagedText : null]} testID="learn-deeper-meaning">
              <Marked text={noBreakHyphens(line)} marks={marks} />
            </Text>
          </View>
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

/** Good to know: the one fact the next question asks, said by the mascot, or a small flash card of it. */
function TeachPage({
  teach,
  marks,
  palette,
  mascotVariant,
  accent,
  short
}: {
  teach: TeachLesson;
  marks: string[];
  palette: ReturnType<typeof topicPalette>;
  mascotVariant: string;
  accent: string;
  short: boolean;
}) {
  const answerMarks = teach.answer ? [teach.answer, ...marks] : marks;
  return (
    <View style={styles.teach} testID="learn-teach">
      {teach.lines.length ? (
        <View style={[styles.talkRow, short ? styles.talkRowShort : null]}>
          <Mascot variant={mascotVariant} mood="happy" accent={accent} size={short ? 56 : 72} />
          <SlideIn delay={200} style={styles.bubbleWrap}>
            <SpeechBubble style={styles.bubbleWide}>
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
        <PopIn delay={teach.lines.length ? 420 : 200} from="up" style={styles.notesWrap}>
          <View style={[styles.teachCard, { borderColor: palette.soft }]} testID="learn-teach-card">
            <Text style={styles.teachQuestion}>{withHonorifics(noBreakHyphens(teach.card.question))}</Text>
            <View
              style={[
                styles.teachAnswer,
                teach.card.isFalse
                  ? { backgroundColor: colors.wrongBg, borderColor: colors.wrongBg }
                  : { backgroundColor: palette.light, borderColor: palette.soft }
              ]}
            >
              <Icon name={teach.card.isFalse ? "close" : "check"} size={18} color={teach.card.isFalse ? colors.wrongInk : palette.ink} />
              <Text style={[styles.teachAnswerText, { color: teach.card.isFalse ? colors.wrongInk : palette.ink }]}>{withHonorifics(noBreakHyphens(teach.card.answer))}</Text>
            </View>
          </View>
        </PopIn>
      ) : null}
      {!teach.lines.length ? (
        <View style={styles.teachMascot}>
          <Mascot variant={mascotVariant} mood="happy" accent={accent} size={short ? 72 : 96} />
        </View>
      ) : null}
    </View>
  );
}

/** Quiz time: the circle's quiz is next. */
function QuizPage({ count, mascotVariant, accent, short }: { count?: number; mascotVariant: string; accent: string; short: boolean }) {
  return (
    <View style={[styles.talkColumn, short ? styles.talkColumnShort : null]} testID="learn-quiz">
      <SlideIn delay={150} style={styles.bubbleTop}>
        <SpeechBubble tail="down" tailAlign="center">
          <Text style={styles.bigLine}>{t("Quiz time!")}</Text>
          <Text style={styles.quizSub}>
            {count && count > 1 ? t("{count} questions on this circle. Get them right to move on.", { count }) : t("Get them right to move on.")}
          </Text>
        </SpeechBubble>
      </SlideIn>
      <Mascot variant={mascotVariant} mood="cheer" accent={accent} size={short ? 118 : 150} />
    </View>
  );
}

const SPEAKER = 44;
const SPEAKER_SMALL = 38;

const styles = StyleSheet.create({
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
    alignItems: "center",
    marginBottom: 2
  },
  notesTitle: {
    marginStart: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: space.sm
  },
  noteNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 10,
    marginTop: 1
  },
  noteNumberText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    color: colors.white
  },
  noteText: {
    flex: 1,
    flexShrink: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    lineHeight: 26,
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
    fontSize: 13,
    lineHeight: 18,
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
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.inkSoft,
    marginBottom: 6
  },
  sourceCredits: {
    marginTop: 6,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
    textAlign: "center"
  },
  quoteCredits: {
    marginTop: 2,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 17,
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
    marginStart: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 23
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
    fontSize: 13,
    lineHeight: 18,
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
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft
  },
  pageEyebrow: {
    alignSelf: "stretch",
    textAlign: "center",
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.5,
    color: colors.inkSoft,
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
  summary: {
    borderWidth: 2,
    borderRadius: radii.lg,
    paddingHorizontal: space.md,
    paddingVertical: space.sm
  },
  summaryText: {
    flex: 0
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
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft
  }
});
