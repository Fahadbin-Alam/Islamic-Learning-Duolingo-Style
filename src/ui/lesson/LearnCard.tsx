import React, { useEffect, useRef } from "react";
import { Animated, Linking, ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText, isQuranText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lip, radii, space, text, topicPalette } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { looksSame, noBreakHyphens, normalizeText } from "./lessonText";
import { ScrollHint, useScrollMore } from "./ScrollHint";

export type LearnCardProps = {
  /** Lesson title, e.g. "As-Salamu Alaikum". Hidden when it only repeats the Arabic word's transliteration. */
  title: string;
  /** ONE short sentence the mascot says. */
  line: string;
  arabic?: ArabicTerm;
  mascotVariant: string;
  accent: string;
  source?: { label: string; url: string };
  /** Defaults to opening the url with Linking. */
  onOpenSource?: (url: string) => void;
  /** Shows a round speaker button on the Arabic card (wire expo-speech with language "ar", or a clip). */
  onPlayAudio?: () => void;
  onContinue: () => void;
  bottomInset?: number;
  testID?: string;
};

const GOLD_INK = darken(colors.goldLip, 0.45);

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

/** The "new word" step: NEW pill, big Arabic card, the mascot saying one line, optional source chip, CONTINUE. */
export function LearnCard({
  title,
  line,
  arabic,
  mascotVariant,
  accent,
  source,
  onOpenSource,
  onPlayAudio,
  onContinue,
  bottomInset,
  testID = "learn-card"
}: LearnCardProps) {
  const palette = topicPalette(accent);
  const { width, height } = useWindowDimensions();
  const short = height > 0 && height < 720;
  const narrow = width > 0 && width < 360;
  // The title is hidden when the word card or the mascot already says the same thing.
  const showTitle =
    normalizeText(line) !== normalizeText(title) && (!arabic || (!looksSame(title, arabic.translit) && !looksSame(title, arabic.meaning)));
  const { ref, scrollProps, more, scrollDown } = useScrollMore();
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
          {/* NEW marks a new word, so it only shows with one. */}
          {arabic ? (
            <PopIn style={styles.newPill}>
              <Icon name="sparkle" size={16} color={GOLD_INK} />
              <Text style={styles.newText}>NEW</Text>
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
                accessibilityLabel={`${arabic.translit}: ${arabic.meaning}`}
              >
                <ArabicText size={arabicSize} weight="bold" quran={quranWord} color={palette.ink} style={styles.arabic} testID="learn-arabic">
                  {arabic.ar}
                </ArabicText>
                {/* The speaker sits next to the transliteration, so the Arabic line keeps the full width. */}
                <View style={styles.translitRow}>
                  {onPlayAudio ? (
                    <Tappable
                      onPress={onPlayAudio}
                      style={[styles.speaker, short || narrow ? styles.speakerSmall : null]}
                      pressScale={0.9}
                      accessibilityLabel={`Play ${arabic.translit}`}
                      testID="learn-audio"
                    >
                      <View style={[styles.speakerLip, short || narrow ? styles.speakerLipSmall : null]} />
                      <View style={[styles.speakerFace, short || narrow ? styles.speakerFaceSmall : null]}>
                        <Icon name="speaker" size={short || narrow ? 20 : 22} color={colors.white} />
                      </View>
                    </Tappable>
                  ) : null}
                  <Text style={[styles.translit, short || narrow ? styles.translitSmall : null]}>{noBreakHyphens(arabic.translit)}</Text>
                </View>
                <Text style={styles.meaning}>{withHonorifics(noBreakHyphens(arabic.meaning))}</Text>
              </View>
            </PopIn>
          ) : null}

          {arabic ? (
            <View style={[styles.talkRow, short ? styles.talkRowShort : null]}>
              <Mascot variant={mascotVariant} mood="happy" accent={accent} size={short ? 64 : 92} />
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

          {source ? (
            <PopIn delay={480} style={[styles.sourceWrap, short ? styles.sourceWrapShort : null]}>
              <Tappable
                onPress={() => openSource(source.url)}
                style={styles.sourceChip}
                accessibilityLabel={`Open source ${source.label}`}
                accessibilityRole="link"
                testID="learn-source"
              >
                <Icon name="book" size={18} />
                <Text style={styles.sourceText} numberOfLines={2}>
                  {withHonorifics(source.label)}
                </Text>
                <View style={styles.sourceChevron}>
                  <Icon name="chevronRight" size={16} color={colors.inkSoft} />
                </View>
              </Tappable>
            </PopIn>
          ) : null}
        </ScrollView>
        <ScrollHint visible={more} onPress={scrollDown} />
      </View>

      <LessonBottomBar bottomInset={bottomInset}>
        <GameButton label="Continue" fullWidth onPress={onContinue} testID="learn-continue" />
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
    marginLeft: 4,
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
  translitRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%"
  },
  speaker: {
    width: SPEAKER,
    height: SPEAKER + lip.button,
    marginRight: space.sm
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
  talkRow: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: space.xl
  },
  talkRowShort: {
    marginTop: space.md
  },
  bubbleWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: space.xs,
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
  sourceWrap: {
    marginTop: space.xl,
    maxWidth: "100%"
  },
  sourceWrapShort: {
    marginTop: space.md
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
    paddingLeft: 14,
    paddingRight: 10,
    paddingVertical: 6
  },
  sourceChevron: {
    marginLeft: 4
  },
  sourceText: {
    marginLeft: 6,
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft
  }
});
