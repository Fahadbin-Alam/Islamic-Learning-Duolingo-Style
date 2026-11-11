import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Stop } from "react-native-svg";
import type { LessonSource } from "../../types";
import { openWebPage } from "../../services/network";
import { sourceUrl } from "../../services/sourceLink";
import { isStreakMilestone, streakLine, streakWeek, type StreakDay } from "../../services/streakWeek";
import { getActiveLanguage, t } from "../../i18n";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { Tappable } from "../Tappable";
import { useLiteMotion } from "../liteMotion";
import { useReduceMotion } from "../motion";
import { Floater, Sparkle, useOneShot } from "../reactions";
import { haptic, playUi } from "../sound";
import { formatNumber } from "../screens/FormattedCount";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { LessonBottomBar } from "./LessonHeader";
import { useScrollMore } from "./ScrollHint";

/**
 * The streak moment, as on Duolingo: after the day's first lesson, before the learner goes on, a page of its own.
 * The flame flares, yesterday's number rolls up to today's, today's circle in the week lights up and the teacher
 * jumps for joy. A first streak and the big days (a week, a month...) also bring confetti, a fanfare and the
 * Prophet's ﷺ words on keeping at a deed. Everything moves on the native driver; with reduce motion it simply shows.
 */

export type StreakMomentProps = {
  /** The streak with today's lesson in it. */
  days: number;
  /** Today, YYYY-MM-DD (local). */
  today: string;
  /** Days a streak freeze covered (YYYY-MM-DD). */
  frozenDays?: readonly string[];
  mascotVariant: string;
  accent: string;
  /** Default true. */
  playSounds?: boolean;
  bottomInset?: number;
  onContinue: () => void;
  /** Opens the hadith's page; default the phone's browser. */
  onOpenSource?: (url: string) => void;
  testID?: string;
};

/**
 * Sahih al-Bukhari 6464 (Aishah): "...the most beloved deed to Allah is the most regular and constant even if it
 * were little." The same source, at the same line, as the kids' lesson "A little, every day".
 */
export const STREAK_HADITH: Pick<LessonSource, "reference" | "url" | "highlight"> & { text: string } = {
  text: "The deeds Allah loves most are done regularly, even if small.",
  reference: "Sahih al-Bukhari 6464",
  url: "https://sunnah.com/bukhari:6464",
  highlight: "the most beloved deed to Allah is the most regular and constant even if it were little"
};

/** When the flame flares and the number rolls on: once the page has popped in. */
const IGNITE_AT = 650;
/** When today's circle lights up: as the number lands. */
const TODAY_AT = IGNITE_AT + 380;
const FLARE_MS = 1100;

const FLAME_INK = darken(colors.flame, 0.3);
const FLAME_DEEP = "#E8471A";

export function StreakMoment({
  days,
  today,
  frozenDays,
  mascotVariant,
  accent,
  playSounds = true,
  bottomInset,
  onContinue,
  onOpenSource = openWebPage,
  testID = "streak-moment"
}: StreakMomentProps) {
  const reduce = useReduceMotion();
  const { width, height } = useWindowDimensions();
  const short = height > 0 && height < 640;
  const flameSize = short ? 104 : 150;
  const mascotSize = short ? 76 : 108;
  // Urdu and Arabic day names are long words ("جمعرات"): a size smaller on a narrow phone, so each fits its column.
  const smallDays = width > 0 && width < 360 && ["ur", "ar"].includes(getActiveLanguage());
  const week = useMemo(() => streakWeek(today, days, frozenDays), [today, days, frozenDays]);
  const party = isStreakMilestone(days);
  const showHadith = party || days <= 1;
  const line = streakLine(days);
  const { ref: scrollRef, scrollProps, more, scrollDown } = useScrollMore();

  // One clock for the flare (the flame's jump and its burst of sparkles), one for the number's roll, one for today.
  const flare = useOneShot();
  const roll = useRef(new Animated.Value(reduce ? 1 : 0)).current;
  const todayPop = useRef(new Animated.Value(reduce ? 1 : 0)).current;
  const [lit, setLit] = useState(reduce);
  const [cheer, setCheer] = useState(0);

  useEffect(() => {
    if (reduce) {
      if (playSounds) playUi("streak");
      return undefined;
    }
    const ignite = setTimeout(() => {
      setLit(true);
      setCheer(1);
      flare.play(FLARE_MS);
      Animated.timing(roll, { toValue: 1, duration: 520, easing: Easing.out(Easing.back(1.7)), useNativeDriver: true }).start();
      if (playSounds) {
        playUi("streak");
        haptic("success");
      }
    }, IGNITE_AT);
    const lightToday = setTimeout(() => {
      Animated.spring(todayPop, { toValue: 1, friction: 5, tension: 140, useNativeDriver: true }).start();
    }, TODAY_AT);
    // The big days: a fanfare after the flare, and the teacher jumps for joy again.
    const fanfare = party
      ? setTimeout(() => {
          if (playSounds) playUi("perfect");
          setCheer(2);
        }, IGNITE_AT + 760)
      : undefined;
    return () => {
      clearTimeout(ignite);
      clearTimeout(lightToday);
      if (fanfare) clearTimeout(fanfare);
    };
    // The moment plays once, when the page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.root} testID={testID}>
      <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={[styles.content, short ? styles.contentShort : null]} {...scrollProps}>
        <View style={[styles.stage, short ? styles.stageShort : null]}>
          <View style={styles.mascot}>
            <Mascot variant={mascotVariant} mood="cheer" accent={accent} size={mascotSize} act={cheer ? { kind: "celebrate", key: cheer } : undefined} />
          </View>
          <PopIn delay={60}>
            <LivingFlame size={flameSize} lit={lit || days > 1} still={reduce} flare={flare.value} />
            <View style={[styles.badgeSlot, { top: flameSize * 0.86 }]} pointerEvents="none">
              <RollingNumber from={Math.max(0, days - 1)} to={days} roll={roll} big={!short} />
            </View>
          </PopIn>
        </View>

        <PopIn delay={160}>
          <Text style={[styles.title, short ? styles.titleShort : null]} accessibilityRole="header" testID="streak-moment-title">
            {t("{count} day streak!", { count: formatNumber(days) })}
          </Text>
        </PopIn>
        <PopIn delay={260}>
          <Text style={styles.line} testID="streak-moment-line">
            {t(line.text, line.values)}
          </Text>
        </PopIn>

        <PopIn delay={360} style={[styles.weekSlot, short ? styles.slotShort : null]}>
          <View style={[styles.week, smallDays ? styles.weekNarrow : null]} testID="streak-week">
            {week.map((day) => (
              <WeekDay key={day.date} day={day} pop={todayPop} still={reduce} small={smallDays} />
            ))}
          </View>
        </PopIn>

        {showHadith ? (
          <PopIn delay={reduce ? 0 : TODAY_AT + 300} style={[styles.hadithSlot, short ? styles.slotShort : null]}>
            <View style={styles.hadith} testID="streak-hadith">
              <Text style={styles.hadithText}>{t("The deeds Allah loves most are done regularly, even if small.")}</Text>
              <Tappable
                onPress={() => onOpenSource(sourceUrl(STREAK_HADITH))}
                style={styles.sourceChip}
                accessibilityRole="link"
                accessibilityLabel={STREAK_HADITH.reference}
                testID="streak-hadith-source"
              >
                <Icon name="book" size={16} />
                <Text style={styles.sourceText}>{STREAK_HADITH.reference}</Text>
              </Tappable>
            </View>
          </PopIn>
        ) : null}
      </ScrollView>

      <LessonBottomBar bottomInset={bottomInset} scrollHint={{ visible: more, onPress: scrollDown }}>
        <GameButton label={t("Continue")} fullWidth color={colors.flame} onPress={onContinue} testID="streak-moment-continue" />
      </LessonBottomBar>

      {party ? <Confetti active={lit} /> : null}
    </View>
  );
}

/** Yesterday's number rolls up and out as today's rolls in, in a white badge at the flame's foot. */
function RollingNumber({ from, to, roll, big }: { from: number; to: number; roll: Animated.Value; big: boolean }) {
  const digits = String(to).length;
  const fontSize = (big ? 40 : 34) - Math.max(0, digits - 2) * 6;
  const lineHeight = Math.round(fontSize * 1.18);
  const outY = roll.interpolate({ inputRange: [0, 1], outputRange: [0, -lineHeight] });
  const inY = roll.interpolate({ inputRange: [0, 1], outputRange: [lineHeight, 0] });
  const scale = roll.interpolate({ inputRange: [0, 0.6, 1], outputRange: [1, 1.12, 1] });
  return (
    <Animated.View style={[styles.badge, { transform: [{ scale }] }]} testID="streak-moment-number" accessible accessibilityLabel={formatNumber(to)}>
      <View style={{ height: lineHeight, overflow: "hidden", alignItems: "center", minWidth: fontSize * 0.7 * digits }}>
        <Animated.Text style={[styles.number, { fontSize, lineHeight, transform: [{ translateY: outY }] }]}>{formatNumber(from)}</Animated.Text>
        <Animated.Text style={[styles.number, styles.numberIn, { fontSize, lineHeight, transform: [{ translateY: inY }] }]}>{formatNumber(to)}</Animated.Text>
      </View>
    </Animated.View>
  );
}

/** One day of this week: done, kept by a freeze, today (it lights up as the number lands), still to come. */
function WeekDay({ day, pop, still, small }: { day: StreakDay; pop: Animated.Value; still: boolean; small: boolean }) {
  const today = day.state === "today";
  const label = t(day.name);
  const said = day.state === "lit" ? t("Done") : day.state === "frozen" ? t("Streak freeze") : today ? t("Today") : undefined;
  return (
    <View style={styles.day} accessible accessibilityLabel={said ? `${label}: ${said}` : label} testID={`streak-day-${day.state}`}>
      <Text style={[styles.dayName, small ? styles.dayNameSmall : null, today ? styles.dayNameToday : null]} numberOfLines={1}>
        {label}
      </Text>
      <View style={styles.dayCircleBox}>
        {day.state === "lit" ? (
          <View style={[styles.dayCircle, styles.dayLit]}>
            <Icon name="check" size={18} color={colors.white} />
          </View>
        ) : day.state === "frozen" ? (
          <View style={[styles.dayCircle, styles.dayFrozen]}>
            <Icon name="freeze" size={20} />
          </View>
        ) : today ? (
          <>
            <View style={[styles.dayCircle, styles.dayWaiting]} />
            <Animated.View
              style={[
                styles.dayCircle,
                styles.dayLit,
                styles.dayOver,
                { opacity: pop.interpolate({ inputRange: [0, 0.25, 1], outputRange: [0, 1, 1], extrapolate: "clamp" }), transform: [{ scale: pop.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }] }
              ]}
              testID="streak-day-today-lit"
            >
              <Icon name="check" size={18} color={colors.white} />
            </Animated.View>
            {still ? null : <TodaySparkles pop={pop} />}
          </>
        ) : (
          <View style={[styles.dayCircle, day.state === "later" ? styles.dayLater : styles.dayNone]} />
        )}
      </View>
    </View>
  );
}

/** A few sparkles that jump off today's circle as it lights. */
function TodaySparkles({ pop }: { pop: Animated.Value }) {
  const bits = [
    { x: -6, y: 2, rise: 16, drift: -12 },
    { x: 26, y: -2, rise: 18, drift: 12 },
    { x: 10, y: -8, rise: 22, drift: 0 }
  ];
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {bits.map((bit, index) => (
        <Floater key={index} t={pop} from={0.05} to={0.95} x={bit.x} y={bit.y} rise={bit.rise} drift={bit.drift}>
          <Sparkle size={10} color={index === 1 ? colors.gold : colors.flame} />
        </Floater>
      ))}
    </View>
  );
}

const OUTER = "M50 4C55 22 70 32 80 48C88 61 92 72 92 84A42 42 0 0 1 8 84C8 70 14 59 24 49C26 60 31 67 38 71C34 50 38 24 50 4Z";
const INNER = "M51 46C57 58 70 66 72 82A22 22 0 0 1 28 84C28 74 33 67 39 62C41 69 44 73 48 75C45 64 46 55 51 46Z";
const CORE = "M50 72C54 78 60 82 60 90A10 10 0 0 1 40 90C40 85 43 81 46 79C47 82 48 84 50 85C49 80 49 76 50 72Z";

/**
 * A big flame drawn in three layers that flicker each on their own beat (about the flame's foot), a soft glow
 * that breathes, and sparks drifting up. `flare` (a 0..1 clock) makes it leap and throw sparkles once.
 * Unlit, it is a grey ember that catches fire when `lit` turns on.
 */
function LivingFlame({ size, lit, still, flare }: { size: number; lit: boolean; still: boolean; flare: Animated.Value }) {
  const lite = useLiteMotion();
  const height = size * 1.08;
  const beatA = useRef(new Animated.Value(0)).current;
  const beatB = useRef(new Animated.Value(0)).current;
  const breathe = useRef(new Animated.Value(0)).current;
  const heat = useRef(new Animated.Value(lit ? 1 : 0)).current;

  useEffect(() => {
    if (still) return undefined;
    const wave = (value: Animated.Value, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(value, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true })
        ])
      );
    const loops = [wave(beatA, 420), wave(beatB, 300), wave(breathe, 1300)];
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [beatA, beatB, breathe, still]);

  useEffect(() => {
    if (!lit) return;
    if (still) {
      heat.setValue(1);
      return;
    }
    Animated.timing(heat, { toValue: 1, duration: 420, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
  }, [heat, lit, still]);

  // The leap: up and bigger, then back with a little settle.
  const leap = flare.interpolate({ inputRange: [0, 0.18, 0.42, 0.62, 1], outputRange: [1, 1.24, 0.96, 1.03, 1], extrapolate: "clamp" });
  const grow = heat.interpolate({ inputRange: [0, 1], outputRange: [0.62, 1] });
  const foot = { transformOrigin: "50% 100%" } as const;
  const outer = still
    ? []
    : [
        { scaleY: beatA.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.05] }) },
        { scaleX: beatA.interpolate({ inputRange: [0, 1], outputRange: [1.03, 0.97] }) },
        { rotate: beatB.interpolate({ inputRange: [0, 1], outputRange: ["-2.2deg", "2.2deg"] }) }
      ];
  const inner = still
    ? []
    : [
        { scaleY: beatB.interpolate({ inputRange: [0, 1], outputRange: [1.07, 0.94] }) },
        { rotate: beatA.interpolate({ inputRange: [0, 1], outputRange: ["2.5deg", "-2.5deg"] }) }
      ];
  const glow = still ? heat.interpolate({ inputRange: [0, 1], outputRange: [0, 0.8] }) : Animated.multiply(heat, breathe.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }));

  return (
    <Animated.View style={[{ width: size, height }, foot, { transform: [{ scale: leap }, { scale: grow }] }]} testID={lit ? "streak-flame-lit" : "streak-flame-ember"}>
      <Animated.View style={[styles.glow, { width: size * 1.1, height: size * 1.1, left: -size * 0.05, top: height - size * 1.02, opacity: glow }]}>
        <Glow size={size * 1.1} />
      </Animated.View>
      {/* The grey ember, under the fire, seen until it catches. */}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: heat.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}>
        <FlameShape size={size} height={height} colors={["#D9DEDB", "#B9C2BD", "#9AA59F"]} />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, foot, { opacity: heat, transform: outer }]}>
        <FlameShape size={size} height={height} colors={["#FFB23D", colors.flame, FLAME_DEEP]} layer="outer" />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, foot, { opacity: heat, transform: inner }]}>
        <FlameShape size={size} height={height} colors={["#FFF1A8", "#FFD84A", "#FFC21A"]} layer="inner" />
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, foot, { opacity: heat, transform: outer }]}>
        <FlameShape size={size} height={height} colors={["#FFFFFF", "#FFF8DC", "#FFF1A8"]} layer="core" />
      </Animated.View>
      {still || lite ? null : <RisingSparks size={size} height={height} heat={heat} />}
      {still ? null : <FlareBurst size={size} height={height} flare={flare} />}
    </Animated.View>
  );
}

/** SVG gradient ids are shared by the whole page on the web: each shape gets its own. */
let shapeIds = 0;

function FlameShape({ size, height, colors: [top, middle, bottom], layer = "outer" }: { size: number; height: number; colors: [string, string, string]; layer?: "outer" | "inner" | "core" }) {
  const id = useRef(`streak-${layer}-${(shapeIds += 1)}`).current;
  const d = layer === "outer" ? OUTER : layer === "inner" ? INNER : CORE;
  return (
    <Svg width={size} height={height} viewBox="0 0 100 108">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={top} />
          <Stop offset="0.55" stopColor={middle} />
          <Stop offset="1" stopColor={bottom} />
        </LinearGradient>
      </Defs>
      <Path d={d} fill={`url(#${id})`} />
    </Svg>
  );
}

/** A soft warm light round the flame, fading out to nothing. */
function Glow({ size }: { size: number }) {
  const id = useRef(`streak-glow-${(shapeIds += 1)}`).current;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <RadialGradient id={id} cx="50" cy="56" r="50" gradientUnits="userSpaceOnUse">
          <Stop offset="0" stopColor="#FFC24A" stopOpacity="0.9" />
          <Stop offset="0.55" stopColor="#FFD98A" stopOpacity="0.45" />
          <Stop offset="1" stopColor="#FFE9C2" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="50" cy="50" r="50" fill={`url(#${id})`} />
    </Svg>
  );
}

/** Small sparks that keep drifting up off the flame's tip and fading, each on its own beat. */
function RisingSparks({ size, height, heat }: { size: number; height: number; heat: Animated.Value }) {
  const sparks = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5].map((index) => ({
        x: size * (0.3 + ((index * 37) % 40) / 100),
        drift: (index % 2 === 0 ? -1 : 1) * (6 + ((index * 13) % 12)),
        rise: height * (0.32 + ((index * 17) % 20) / 100),
        dot: 4 + (index % 3),
        duration: 1300 + ((index * 290) % 900),
        delay: index * 260,
        value: new Animated.Value(0)
      })),
    [height, size]
  );
  useEffect(() => {
    const loops = sparks.map((spark) =>
      Animated.loop(Animated.sequence([Animated.delay(spark.delay), Animated.timing(spark.value, { toValue: 1, duration: spark.duration, easing: Easing.out(Easing.quad), useNativeDriver: true })]))
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [sparks]);
  return (
    <Animated.View style={[StyleSheet.absoluteFill, { opacity: heat }]} pointerEvents="none">
      {sparks.map((spark, index) => (
        <Animated.View
          key={index}
          style={[
            styles.spark,
            {
              left: spark.x,
              top: height * 0.34,
              width: spark.dot,
              height: spark.dot,
              borderRadius: spark.dot / 2,
              backgroundColor: index % 2 === 0 ? colors.gold : "#FFB23D",
              opacity: spark.value.interpolate({ inputRange: [0, 0.15, 0.7, 1], outputRange: [0, 1, 0.8, 0] }),
              transform: [
                { translateY: spark.value.interpolate({ inputRange: [0, 1], outputRange: [0, -spark.rise] }) },
                { translateX: spark.value.interpolate({ inputRange: [0, 1], outputRange: [0, spark.drift] }) }
              ]
            }
          ]}
        />
      ))}
    </Animated.View>
  );
}

/** The flare's sparkles, thrown out all round as the flame leaps. */
function FlareBurst({ size, height, flare }: { size: number; height: number; flare: Animated.Value }) {
  const bits = useMemo(
    () =>
      [-70, -35, 0, 35, 70, -110, 110].map((angle, index) => {
        const rad = ((angle - 90) * Math.PI) / 180;
        const reach = size * (0.42 + (index % 3) * 0.08);
        return { x: size / 2 - 7, y: height * 0.42, rise: -Math.sin(rad) * reach, drift: Math.cos(rad) * reach, color: index % 2 === 0 ? colors.gold : colors.flame };
      }),
    [height, size]
  );
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {bits.map((bit, index) => (
        <Floater key={index} t={flare} from={0.04} to={0.85} x={bit.x} y={bit.y} rise={bit.rise} drift={bit.drift}>
          <Sparkle size={14} color={bit.color} />
        </Floater>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, position: "relative", backgroundColor: colors.snow },
  scroll: { flex: 1 },
  content: { flexGrow: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: space.lg, paddingTop: space.xxl, paddingBottom: space.xxl },
  contentShort: { paddingTop: space.md, paddingBottom: space.md },
  stage: { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", marginBottom: space.xxl },
  stageShort: { marginBottom: space.lg },
  slotShort: { marginTop: space.sm },
  mascot: { marginEnd: space.xs, marginBottom: -space.xs },
  badgeSlot: { position: "absolute", left: 0, right: 0, alignItems: "center" },
  badge: {
    minWidth: 64,
    paddingHorizontal: space.md,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.flame,
    alignItems: "center"
  },
  number: { fontFamily: fonts.displayHeavy, color: FLAME_INK, textAlign: "center" },
  numberIn: { position: "absolute", left: 0, right: 0, top: 0 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 30, lineHeight: 38, color: FLAME_INK, textAlign: "center", marginTop: space.md },
  titleShort: { fontSize: 26, lineHeight: 32 },
  line: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 22, color: colors.inkSoft, textAlign: "center", marginTop: space.xs, maxWidth: 340 },
  weekSlot: { alignSelf: "stretch", alignItems: "center", marginTop: space.lg },
  week: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 380,
    paddingVertical: space.md,
    paddingHorizontal: space.sm,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  day: { flex: 1, alignItems: "center" },
  dayName: { fontFamily: fonts.bodyHeavy, fontSize: 12, lineHeight: 16, color: colors.inkSoft, marginBottom: space.xs },
  dayNameSmall: { fontSize: 10, letterSpacing: -0.2 },
  weekNarrow: { paddingHorizontal: space.xxs },
  dayNameToday: { color: FLAME_INK },
  dayCircleBox: { width: 34, height: 34 },
  dayCircle: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
  dayOver: { position: "absolute", left: 0, top: 0, borderWidth: 3, borderColor: colors.gold },
  dayLit: { backgroundColor: colors.flame },
  dayFrozen: { backgroundColor: lighten(colors.gem, 0.78), borderWidth: 2, borderColor: lighten(colors.gem, 0.35) },
  dayWaiting: { borderWidth: 2.5, borderStyle: "dashed", borderColor: colors.flame, backgroundColor: lighten(colors.flame, 0.9) },
  dayLater: { borderWidth: 2, borderColor: colors.line, backgroundColor: colors.white },
  dayNone: { backgroundColor: colors.locked },
  hadithSlot: { alignSelf: "stretch", alignItems: "center", marginTop: space.lg },
  hadith: {
    width: "100%",
    maxWidth: 380,
    padding: space.md,
    borderRadius: radii.lg,
    backgroundColor: lighten(colors.gold, 0.86),
    borderWidth: 2,
    borderColor: lighten(colors.goldLip, 0.55),
    alignItems: "center"
  },
  hadithText: { fontFamily: fonts.bodyHeavy, fontSize: 16, lineHeight: 23, color: darken(colors.goldLip, 0.5), textAlign: "center" },
  sourceChip: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: space.sm,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radii.pill,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: lighten(colors.goldLip, 0.4)
  },
  sourceText: { fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 18, color: darken(colors.goldLip, 0.45), marginStart: space.xs },
  glow: { position: "absolute" },
  spark: { position: "absolute" }
});
