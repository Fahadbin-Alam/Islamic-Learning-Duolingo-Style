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

export type LearnCardProps = {
  /** Lesson title, e.g. "As-Salamu Alaikum". Hidden when it only repeats the Arabic word's transliteration. */
  title: string;
  /** ONE short sentence the mascot says. */
  line: string;
  arabic?: ArabicTerm;
  /** False when the learner has met this Arabic word before (e.g. the unit's word again): no NEW pill. Default true. */
  isNewWord?: boolean;
  /** Up to 3 short fact chips, e.g. "Father: Umar". */
  facts?: string[];
  /** A short narration or ayah, shown in full with where it is from. */
  quote?: { text: string; reference?: string };
  mascotVariant: string;
  accent: string;
  /**
   * The one source that says what the card says (lesson.learnSource). Its chip shows only the short
   * reference ("Quran 2:43", "Sahih al-Bukhari 6018") on one line, never a page title: no reference, no chip.
   */
  learnSource?: { reference?: string; url: string; highlight?: string };
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
  onContinue: () => void;
  bottomInset?: number;
  testID?: string;
};

const GOLD_INK = darken(colors.goldLip, 0.45);
const MAX_FACTS = 3;
/** "Father: Umar" splits into a soft key and a bold value. */
const FACT_KEY = /^([^:]{1,18}):\s*(.+)$/;

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
  quote,
  mascotVariant,
  accent,
  learnSource,
  source: legacySource,
  onOpenSource,
  onPlayAudio: speak,
  arabicRecitation,
  picture,
  onContinue,
  bottomInset,
  testID = "learn-card"
}: LearnCardProps) {
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
  const quoteText = quote?.text.trim();
  const quoteReference = quote?.reference?.trim();
  // The quote's reference opens the source when both name the same narration, so it is not said twice.
  const linkedReference = Boolean(quoteText && quoteReference && source && sameReference(quoteReference, source.label));
  // A single ayah in Arabic gets a recitation to listen to and repeat.
  const ayahAudio = quoteText && isArabicOnly(quoteText) ? quranAudioUrl(quoteReference) : null;
  // With facts or a quote to show, the mascot sits small next to its line to leave them room.
  const rich = factList.length > 0 || Boolean(quoteText) || Boolean(picture);
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
          {/* NEW marks a new word, so it only shows with one the learner has not met yet. */}
          {arabic && isNewWord ? (
            <PopIn style={styles.newPill}>
              <Icon name="sparkle" size={16} color={GOLD_INK} />
              <Text style={styles.newText}>{t("NEW")}</Text>
            </PopIn>
          ) : null}
          {showTitle ? (
            <Text style={[styles.title, short ? styles.titleShort : null]} accessibilityRole="header">
              {withHonorifics(noBreakHyphens(title))}
            </Text>
          ) : null}

          {arabic ? (
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

          {arabic || rich ? (
            <View style={[styles.talkRow, short ? styles.talkRowShort : null]}>
              <Mascot variant={mascotVariant} mood={arabic ? "happy" : "wave"} accent={accent} size={short ? (rich ? 56 : 64) : rich ? 80 : 92} />
              <SlideIn delay={320} style={styles.bubbleWrap}>
                <SpeechBubble>{noBreakHyphens(line)}</SpeechBubble>
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
          {picture ? <LessonPhoto picture={picture} short={short} delay={380} /> : null}

          {factList.length > 0 ? (
            <View style={[styles.facts, short ? styles.factsShort : null]} testID="learn-facts">
              {factList.map((fact, index) => {
                const parts = fact.match(FACT_KEY);
                return (
                  <PopIn
                    key={`${index}-${fact}`}
                    delay={420 + index * 90}
                    style={[styles.fact, short ? styles.factShort : null, { backgroundColor: palette.light, borderColor: palette.soft }]}
                  >
                    <Text style={[styles.factText, { color: palette.ink }]}>
                      {parts ? <Text style={styles.factKey}>{`${parts[1]}: `}</Text> : null}
                      {withHonorifics(noBreakHyphens(parts ? parts[2] : fact))}
                    </Text>
                  </PopIn>
                );
              })}
            </View>
          ) : null}

          {quoteText ? (
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
                  {ayahAudio ? <AyahListen url={ayahAudio} accent={palette.main} /> : null}
                </View>
              </View>
            </PopIn>
          ) : null}

          {source && !linkedReference ? (
            <PopIn delay={480} style={[styles.sourceWrap, short ? styles.sourceWrapShort : null]}>
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
    paddingHorizontal: space.lg,
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
  facts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: space.lg
  },
  factsShort: {
    marginTop: 6
  },
  fact: {
    borderWidth: 2,
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 3,
    maxWidth: "100%"
  },
  factShort: {
    paddingVertical: 3,
    margin: 2
  },
  factText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center"
  },
  factKey: {
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
    fontSize: 16,
    lineHeight: 23,
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
    maxWidth: "100%"
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
  sourceText: {
    marginStart: 6,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft
  }
});
