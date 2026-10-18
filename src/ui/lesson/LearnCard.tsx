import React, { useEffect, useRef, useState } from "react";
import { Animated, Linking, ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { ArabicTerm } from "../../data/arabicTerms";
import { ArabicText } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lip, radii, space, text, topicPalette } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { looksSame, noBreakHyphens } from "./lessonText";

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
  const showTitle = !arabic || !looksSame(title, arabic.translit);

  // The down tail sits 28 px into the bubble; slide the mascot under it.
  const [columnWidth, setColumnWidth] = useState(0);
  const [bubbleBox, setBubbleBox] = useState<{ x: number; width: number } | null>(null);
  const waveSize = short ? 118 : 150;
  const tailCenter = bubbleBox ? bubbleBox.x + 2 + 28 + 7 : 0;
  const mascotShift =
    bubbleBox && columnWidth
      ? Math.max(-(columnWidth - waveSize) / 2 - space.sm, Math.min((columnWidth - waveSize) / 2, tailCenter - columnWidth / 2))
      : 0;
  const openSource = (url: string) => {
    if (onOpenSource) {
      onOpenSource(url);
    } else {
      void Linking.openURL(url).catch(() => undefined);
    }
  };

  return (
    <View style={styles.root} testID={testID}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <PopIn style={styles.newPill}>
          <Icon name="sparkle" size={16} color={GOLD_INK} />
          <Text style={styles.newText}>NEW</Text>
        </PopIn>
        {showTitle ? (
          <Text style={styles.title} accessibilityRole="header">
            {noBreakHyphens(title)}
          </Text>
        ) : null}

        {arabic ? (
          <PopIn delay={120} style={styles.cardWrap}>
            <View style={[styles.cardLip, { backgroundColor: palette.soft }]} />
            <View
              style={[
                styles.card,
                onPlayAudio ? (narrow ? styles.cardWithAudioNarrow : styles.cardWithAudio) : null,
                { borderColor: palette.soft, backgroundColor: palette.light }
              ]}
              accessible={!onPlayAudio}
              accessibilityRole={showTitle ? undefined : "header"}
              accessibilityLabel={`${arabic.translit}: ${arabic.meaning}`}
            >
              <ArabicText size={narrow ? 34 : 40} weight="bold" color={palette.ink} style={styles.arabic} testID="learn-arabic">
                {arabic.ar}
              </ArabicText>
              <Text style={[styles.translit, narrow ? styles.translitNarrow : null]}>{noBreakHyphens(arabic.translit)}</Text>
              <Text style={styles.meaning}>{noBreakHyphens(arabic.meaning)}</Text>
            </View>
            {onPlayAudio ? (
              <Tappable
                onPress={onPlayAudio}
                style={[styles.speaker, narrow ? styles.speakerNarrow : null]}
                pressScale={0.9}
                accessibilityLabel={`Play ${arabic.translit}`}
                testID="learn-audio"
              >
                <View style={[styles.speakerLip, narrow ? styles.speakerLipNarrow : null]} />
                <View style={[styles.speakerFace, narrow ? styles.speakerFaceNarrow : null]}>
                  <Icon name="speaker" size={narrow ? 22 : 26} color={colors.white} />
                </View>
              </Tappable>
            ) : null}
          </PopIn>
        ) : null}

        {arabic ? (
          <View style={styles.talkRow}>
            <Mascot variant={mascotVariant} mood="happy" accent={accent} size={short ? 80 : 92} />
            <SlideIn delay={320} style={styles.bubbleWrap}>
              <SpeechBubble>{noBreakHyphens(line)}</SpeechBubble>
            </SlideIn>
          </View>
        ) : (
          <View style={styles.talkColumn} onLayout={(event) => setColumnWidth(event.nativeEvent.layout.width)}>
            <SlideIn
              delay={200}
              style={styles.bubbleTop}
              onLayout={(event) => setBubbleBox({ x: event.nativeEvent.layout.x, width: event.nativeEvent.layout.width })}
            >
              <SpeechBubble tail="down">
                <Text style={styles.bigLine}>{noBreakHyphens(line)}</Text>
              </SpeechBubble>
            </SlideIn>
            <View style={{ transform: [{ translateX: mascotShift }] }}>
              <Mascot variant={mascotVariant} mood="wave" accent={accent} size={waveSize} />
            </View>
          </View>
        )}

        {source ? (
          <PopIn delay={480} style={styles.sourceWrap}>
            <Tappable
              onPress={() => openSource(source.url)}
              style={styles.sourceChip}
              accessibilityLabel={`Open source ${source.label}`}
              accessibilityRole="link"
              testID="learn-source"
            >
              <Icon name="book" size={18} />
              <Text style={styles.sourceText} numberOfLines={2}>
                {source.label}
              </Text>
              <View style={styles.sourceChevron}>
                <Icon name="chevronRight" size={16} color={colors.inkSoft} />
              </View>
            </Tappable>
          </PopIn>
        ) : null}
      </ScrollView>

      <LessonBottomBar bottomInset={bottomInset}>
        <GameButton label="Continue" fullWidth onPress={onContinue} testID="learn-continue" />
      </LessonBottomBar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  scroll: {
    flex: 1
  },
  content: {
    paddingHorizontal: space.lg,
    paddingTop: space.sm,
    paddingBottom: space.huge + space.lg,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
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
  cardWrap: {
    alignSelf: "stretch",
    marginTop: space.lg,
    paddingBottom: lip.tile,
    position: "relative"
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
  cardWithAudio: {
    paddingHorizontal: 56
  },
  cardWithAudioNarrow: {
    paddingHorizontal: 44
  },
  translitNarrow: {
    fontSize: 20,
    lineHeight: 26
  },
  speakerNarrow: {
    top: space.sm,
    left: space.sm,
    width: 40,
    height: 40 + lip.button
  },
  speakerLipNarrow: {
    height: 40,
    borderRadius: 20
  },
  speakerFaceNarrow: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  speaker: {
    position: "absolute",
    top: space.md,
    left: space.md,
    width: 48,
    height: 48 + lip.button
  },
  speakerLip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: lip.button,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gemLip
  },
  speakerFace: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.gem,
    alignItems: "center",
    justifyContent: "center"
  },
  arabic: {
    maxWidth: "100%"
  },
  translit: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    color: colors.ink,
    textAlign: "center",
    flexShrink: 1
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
