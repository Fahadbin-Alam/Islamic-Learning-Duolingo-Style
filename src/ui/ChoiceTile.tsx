import React, { memo, useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, Pressable, StyleSheet, Text, View } from "react-native";
import type { LessonPicture } from "../data/lessonPictures";
import { isRtlLanguage } from "../i18n";
import { ArabicText, isArabicOnly, isQuranText, withHonorifics } from "./ArabicText";
import { Icon, type IconName } from "./Icon";
import { photoAspect } from "./lesson/LessonPhoto";
import { LiveFrame } from "./lesson/LivePicture";
import { noBreakHyphens } from "./lesson/lessonText";
import { PICTURE_LIFE } from "./lesson/pictureLife";
import { useShake } from "./PopIn";
import { useReduceMotion } from "./motion";
import { Sparkle } from "./reactions";
import { haptic, playUi } from "./sound";
import { colors, fonts, lighten, radii } from "./theme";
import { textScaled } from "./textScale";

export type ChoiceTileState = "idle" | "selected" | "correct" | "wrong" | "disabled" | "dimmed";

export type ChoiceTileProps = {
  label: string;
  onPress?: () => void;
  state?: ChoiceTileState;
  badge?: string;
  icon?: IconName;
  /** Icon color in every state but disabled (e.g. a red X next to a green check). */
  iconColor?: string;
  layout?: "row" | "square";
  /** Short phones: smaller text and padding so more tiles fit. */
  compact?: boolean;
  /** Less padding still, for a set of tiles too tall for its screen otherwise (see ExerciseView). */
  tight?: boolean;
  /** Smaller text for long answers. Defaults to this label's length; pass it so a whole set matches. */
  long?: boolean;
  /**
   * The smaller text of long answers whatever the label's length, Arabic script included (it takes the size of a long
   * Arabic answer), for a set of tiles too tall for its screen even tight (see sheetFit's FIT_STEPS).
   */
  smallText?: boolean;
  /** A picture of the answer (a place), shown moving at the tile's start, like a picture card. */
  picture?: LessonPicture;
  testID?: string;
  accessibilityLabel?: string;
};

const LIP = 4;

/** A row tile's padding above and under its text: as usual, on a short phone, and tight. */
const ROW_PAD = 12;
const ROW_PAD_COMPACT = 9;
const ROW_PAD_TIGHT = 6;

/**
 * How much shorter a row tile is at least when it is tight: the padding it gives up above and under its text. Its
 * minimum height is lower by at least as much, so whether a set of tight tiles fits is known before it is drawn.
 */
export function tightSaving(compact?: boolean) {
  return 2 * ((compact ? ROW_PAD_COMPACT : ROW_PAD) - ROW_PAD_TIGHT);
}

type Look = { bg: string; border: string; lip: string; text: string; badgeBorder: string; badgeText: string };

const LOOKS: Record<ChoiceTileState, Look> = {
  idle: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, badgeBorder: colors.line, badgeText: colors.inkSoft },
  selected: {
    bg: lighten(colors.gem, 0.86),
    border: lighten(colors.gem, 0.25),
    lip: colors.gem,
    text: colors.gemLip,
    badgeBorder: lighten(colors.gem, 0.25),
    badgeText: colors.gemLip
  },
  correct: { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, text: colors.correctInk, badgeBorder: colors.green, badgeText: colors.correctInk },
  wrong: { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, text: colors.wrongInk, badgeBorder: colors.heart, badgeText: colors.wrongInk },
  disabled: { bg: colors.white, border: colors.line, lip: colors.line, text: "#A9B4AE", badgeBorder: colors.line, badgeText: "#A9B4AE" },
  dimmed: { bg: colors.white, border: colors.line, lip: colors.lineLip, text: colors.ink, badgeBorder: colors.line, badgeText: colors.inkSoft }
};

/**
 * How far up from its bottom edge a tile holds no text: its lip, its border and the padding under its text. A sheet
 * whose top edge reaches no further into the tile covers none of its lines.
 */
export function tileTextBottom({ compact, tight, square }: { compact?: boolean; tight?: boolean; square?: boolean }) {
  const padding = square ? (compact ? 12 : 16) : tight ? ROW_PAD_TIGHT : compact ? ROW_PAD_COMPACT : ROW_PAD;
  return LIP + 2 + padding;
}

/** How far down from its top edge a tile holds no text: its border and the padding over its text (no lip up there). */
export function tileTextTop(options: { compact?: boolean; tight?: boolean; square?: boolean }) {
  return tileTextBottom(options) - LIP;
}

/** Where a line of text starts on screen in the app's language: right to left in Urdu and Arabic. */
export function lineStart(): "left" | "right" {
  return isRtlLanguage() ? "right" : "left";
}

/** Labels longer than this use a smaller size so a long answer stays a few lines. */
export const LONG_LABEL = 80;

/** Arabic script in a tile: a long answer (or Quran text) in the smaller size, a short one as usual. */
const ARABIC_LONG = 20;
const ARABIC_COMPACT = 22;
const ARABIC = 24;

/** Big answer tile. Pops when selected, shakes when wrong. Text always wraps. */
export function ChoiceTile(props: ChoiceTileProps) {
  return <TileFace {...props} rtl={isRtlLanguage()} />;
}

/**
 * The tile itself, drawn again only when what it shows changes (its props, or the way the screen's lines run): a
 * question drawn again while its answer sheet opens leaves its tiles as they are.
 */
const TileFace = memo(function TileFace({
  label,
  onPress,
  state = "idle",
  badge,
  icon,
  iconColor,
  layout = "row",
  compact,
  tight,
  long: longProp,
  smallText,
  picture,
  testID,
  accessibilityLabel,
  rtl
}: ChoiceTileProps & { rtl: boolean }) {
  const start = rtl ? "right" : "left";
  const look = LOOKS[state];
  const interactive = state !== "disabled" && state !== "dimmed";
  const press = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(1)).current;
  const { style: shakeStyle, shake } = useShake(7);
  const previous = useRef(state);
  const reduceMotion = useReduceMotion();
  // Counts the times this tile turned green: each one plays the sparkle burst and the shine once.
  const [bursts, setBursts] = useState(0);

  useEffect(() => {
    const before = previous.current;
    previous.current = state;
    if (before === state) {
      return;
    }
    if (state === "selected" || state === "correct") {
      pop.setValue(state === "correct" ? 0.9 : 0.94);
      Animated.spring(pop, { toValue: 1, friction: state === "correct" ? 3 : 4, tension: 220, useNativeDriver: true }).start();
    }
    if (state === "correct" && before === "selected" && !reduceMotion) {
      setBursts((count) => count + 1);
    }
    if (state === "wrong") {
      shake();
    }
  }, [pop, shake, state, reduceMotion]);

  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, LIP - 1] });
  const arabic = isArabicOnly(label);
  const square = layout === "square";
  const long = smallText || (longProp ?? label.length > LONG_LABEL);
  const labelSize = long ? styles.labelLong : compact ? styles.labelCompact : null;

  const content = (
    <>
      {badge && !square ? (
        <View style={[styles.badge, { borderColor: look.badgeBorder }]}>
          <Text style={[styles.badgeText, { color: look.badgeText }]}>{badge}</Text>
        </View>
      ) : null}
      {picture && !square ? (
        <View style={[styles.picture, compact || tight ? styles.pictureSmall : null, { borderColor: look.border }]} testID={testID ? `${testID}-picture` : undefined}>
          <LiveFrame aspect={photoAspect(picture)} life={PICTURE_LIFE[picture.id]} cheer={bursts || undefined}>
            <Image source={picture.image} style={styles.pictureImage} resizeMode="cover" />
          </LiveFrame>
        </View>
      ) : null}
      {icon ? (
        <View style={square ? styles.squareIcon : styles.rowIcon}>
          <Icon name={icon} size={square ? (compact ? 40 : 48) : 28} color={state === "disabled" ? "#C7D0CB" : iconColor} />
        </View>
      ) : null}
      {arabic ? (
        <ArabicText
          size={isQuranText(label) || smallText ? ARABIC_LONG : compact ? ARABIC_COMPACT : ARABIC}
          weight="bold"
          quran={isQuranText(label)}
          color={look.text}
          align={square ? "center" : "right"}
          style={square ? styles.squareLabel : styles.rowLabel}
        >
          {label}
        </ArabicText>
      ) : (
        // A row tile's text starts where the screen's lines start: on the left left to right, on the right right to left,
        // whatever its own script (a number or a Latin word keeps its own direction, so "start" alone would put it left).
        <Text style={[styles.label, labelSize, square ? styles.squareLabel : styles.rowLabel, { color: look.text, textAlign: square ? "center" : start }]}>
          {withHonorifics(noBreakHyphens(label))}
        </Text>
      )}
    </>
  );

  return (
    <Animated.View style={[square ? styles.squareRoot : styles.rowRoot, shakeStyle, state === "dimmed" ? styles.dimmed : null]}>
      <Animated.View style={{ transform: [{ scale: pop }] }}>
        <Pressable
          onPress={() => {
            if (!interactive) {
              return;
            }
            playUi("soft_ui");
            haptic("light");
            onPress?.();
          }}
          onPressIn={() => interactive && Animated.timing(press, { toValue: 1, duration: 60, useNativeDriver: true }).start()}
          onPressOut={() => Animated.spring(press, { toValue: 0, friction: 5, tension: 260, useNativeDriver: true }).start()}
          disabled={!interactive}
          testID={testID}
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ selected: state === "selected", disabled: !interactive }}
          style={[styles.pressable, { paddingBottom: LIP }]}
        >
          <View pointerEvents="none" style={[styles.lip, { backgroundColor: look.lip }]} />
          <Animated.View
            style={[
              styles.face,
              square ? styles.squareFace : styles.rowFace,
              compact ? (square ? styles.squareFaceCompact : styles.rowFaceCompact) : null,
              tight && !square ? styles.rowFaceTight : null,
              { backgroundColor: look.bg, borderColor: look.border, transform: [{ translateY }] }
            ]}
          >
            {content}
          </Animated.View>
          {badge && square ? (
            <View style={[styles.badge, styles.squareBadge, { borderColor: look.badgeBorder }]} pointerEvents="none">
              <Text style={[styles.badgeText, { color: look.badgeText }]}>{badge}</Text>
            </View>
          ) : null}
          {bursts > 0 && state === "correct" ? <CorrectBurst key={bursts} /> : null}
        </Pressable>
      </Animated.View>
    </Animated.View>
  );
});

/** Where the sparkles start round the tile's edge (share of its width / height) and which way they fly. */
const BURST = [
  { x: 0.04, y: 0.1, dx: -1, dy: -1 },
  { x: 0.3, y: 0, dx: -0.3, dy: -1 },
  { x: 0.62, y: 0, dx: 0.3, dy: -1 },
  { x: 0.96, y: 0.12, dx: 1, dy: -1 },
  { x: 1, y: 0.62, dx: 1, dy: 0.2 },
  { x: 0, y: 0.6, dx: -1, dy: 0.2 },
  { x: 0.45, y: 1, dx: 0, dy: 0.6 }
];
const BURST_COLORS = ["#FFC21A", "#58CC02", "#FF82AB", "#1CB0F6"];

/**
 * A right answer's tile: sparkles burst off its edges and a shine sweeps across it, once, over the tile (it takes no
 * room and lets taps through). Left out when the phone asks for less motion.
 */
function CorrectBurst() {
  const t = useRef(new Animated.Value(0)).current;
  const [box, setBox] = useState<{ width: number; height: number } | undefined>(undefined);
  useEffect(() => {
    const run = Animated.timing(t, { toValue: 1, duration: 760, easing: Easing.out(Easing.quad), useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [t]);
  const shineX = box ? t.interpolate({ inputRange: [0, 0.75, 1], outputRange: [-60, box.width + 60, box.width + 60] }) : 0;
  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { bottom: LIP }]}
      onLayout={(event) => setBox({ width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height })}
      testID="correct-burst"
    >
      {box ? (
        <>
          <View style={[StyleSheet.absoluteFill, styles.shineClip]}>
            <Animated.View style={[styles.shine, { height: box.height * 2, top: -box.height / 2, transform: [{ translateX: shineX }, { rotate: "18deg" }] }]} />
          </View>
          {BURST.map((spark, index) => {
            const distance = 14 + (index % 3) * 6;
            const opacity = t.interpolate({ inputRange: [0, 0.08, 0.6, 1], outputRange: [0, 1, 1, 0] });
            const scale = t.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0.2, 1.2, 0.6] });
            return (
              <Animated.View
                key={index}
                style={{
                  position: "absolute",
                  left: spark.x * box.width - 7,
                  top: spark.y * box.height - 7,
                  opacity,
                  transform: [
                    { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [0, spark.dx * distance] }) },
                    { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [0, spark.dy * distance] }) },
                    { scale }
                  ]
                }}
              >
                <Sparkle size={index % 2 ? 12 : 15} color={BURST_COLORS[index % BURST_COLORS.length]} />
              </Animated.View>
            );
          })}
        </>
      ) : null}
    </View>
  );
}

const styles = textScaled(StyleSheet.create({
  shineClip: {
    borderRadius: radii.tile,
    overflow: "hidden"
  },
  shine: {
    position: "absolute",
    left: 0,
    width: 34,
    backgroundColor: "rgba(255,255,255,0.55)"
  },
  rowRoot: {
    alignSelf: "stretch",
    width: "100%"
  },
  squareRoot: {
    flex: 1,
    minWidth: 0
  },
  dimmed: {
    opacity: 0.45
  },
  pressable: {
    position: "relative"
  },
  lip: {
    position: "absolute",
    left: 0,
    right: 0,
    top: LIP,
    bottom: 0,
    borderRadius: radii.tile
  },
  face: {
    borderWidth: 2,
    borderRadius: radii.tile
  },
  rowFace: {
    minHeight: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: ROW_PAD
  },
  squareFace: {
    minHeight: 132,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  rowFaceCompact: {
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: ROW_PAD_COMPACT
  },
  rowFaceTight: {
    minHeight: 44,
    paddingVertical: ROW_PAD_TIGHT
  },
  squareFaceCompact: {
    minHeight: 104,
    paddingVertical: 12
  },
  picture: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "hidden",
    marginEnd: 12,
    backgroundColor: "#EEF3F0"
  },
  pictureSmall: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginEnd: 10
  },
  pictureImage: {
    width: "100%",
    height: "100%"
  },
  rowIcon: {
    marginEnd: 12
  },
  squareIcon: {
    marginBottom: 8
  },
  label: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 17,
    lineHeight: 23
  },
  labelCompact: {
    fontSize: 16,
    lineHeight: 21
  },
  labelLong: {
    fontSize: 15,
    lineHeight: 20
  },
  rowLabel: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0
  },
  squareLabel: {
    flexShrink: 1,
    maxWidth: "100%"
  },
  badge: {
    minWidth: 30,
    height: 30,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginEnd: 12,
    paddingHorizontal: 4
  },
  squareBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    marginEnd: 0
  },
  badgeText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14
  }
}));
