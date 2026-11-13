import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { SvgXml } from "react-native-svg";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { isRtlLanguage, t } from "../../i18n";
import { withHonorifics } from "../ArabicText";
import type { MascotMood } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { Floater, Sparkle, useOneShot } from "../reactions";
import { Tappable } from "../Tappable";
import { useReduceMotion } from "../motion";
import { colors, darken, fonts, lighten, radii, space, topicPalette } from "../theme";
import { moonSvg } from "../journey/moonArt";
import { QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult } from "./ExerciseView";
import { CORRECT_TEXT, WRONG_TEXT } from "./FeedbackSheet";
import { GameCue, GameFrame, useGameRoom } from "./WordGames";
import { answerPart, QUESTION_PART } from "./questionAloud";
import { ReadRing } from "./ReadGlow";
import { MONTH_BORDER, MONTH_GAP, MONTH_PAD_X, YEAR_EDGE, YEAR_PAD, monthSizes, yearRows } from "./monthQuestions";

/**
 * A month question asked on the year (see monthQuestions.ts): the twelve months by the moon, in their order, three to
 * a row, read from the right in Urdu and Arabic. The question's answers are bright and can be tapped where they fall
 * in the year; the other months are there, dim, to show the year round them. A month tapped fills its moon, from a
 * thin new moon to full. CHECK and the answer sheet work as for every other way of asking, so the lesson scores it,
 * takes a heart and shows the source as usual. A right answer throws sparkles and turns green; a wrong one shakes and
 * turns red, and the right one turns green with its moon full.
 *
 * Only the moon and the stars are drawn: never a person.
 */

export type MonthGameProps = {
  prompt: string;
  /** The answers, in the learner's language. */
  choices: ExerciseChoice[];
  /** Each answer's month (choice id -> month, 0 is Muharram, from monthsFor on the English question). */
  months: Record<string, number>;
  correctChoiceId: string;
  selectedChoiceId?: string;
  result?: ExerciseResult;
  onSelect: (choiceId: string) => void;
  onCheck: () => void;
  onContinue: () => void;
  mascotVariant: string;
  accent: string;
  review?: boolean | "missed";
  attempt?: number;
  praiseSeed?: string;
  playSound?: boolean;
  continueSound?: GameSoundEvent | false;
  bottomInset?: number;
};

type Tone = "idle" | "picked" | "right" | "wrong";

/** Under each answer, its lip, as on every tile; the other months stand as high, so the rows line up. */
const LIP = 4;
/** Round each moon, its patch of night: a little bigger than the moon. */
const NIGHT_EDGE = 4;
/** How the moon fills, night by night: a thin new moon, the first quarter, nearly full, and full. */
const PHASES = [4.5, 7.4, 11.1, 14.77] as const;

/** A few faint stars behind the months, at shares of the year's width and height. */
const STARS: readonly [number, number, number][] = [
  [0.07, 0.05, 1.2],
  [0.31, 0.02, 0.9],
  [0.55, 0.06, 1.1],
  [0.83, 0.03, 1.3],
  [0.96, 0.3, 0.9],
  [0.02, 0.52, 1],
  [0.97, 0.76, 1.1],
  [0.45, 0.98, 0.9],
  [0.74, 0.97, 1.2],
  [0.18, 0.96, 1]
];

export function MonthGame(props: MonthGameProps) {
  const { prompt, choices, selectedChoiceId, result, onCheck, onContinue, praiseSeed, playSound, continueSound, bottomInset } = props;
  return (
    <GameFrame
      ready={Boolean(selectedChoiceId)}
      result={result}
      prompt={prompt}
      // Read out: the question, then the months to pick from, each glowing as it is said.
      aloud={[{ key: QUESTION_PART, text: prompt }, ...choices.map((choice) => ({ key: answerPart(choice.id), text: choice.label }))]}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID="month-game"
    >
      <YearBody {...props} />
    </GameFrame>
  );
}

/** Inside the game's frame, so it can keep the right month in sight once the answer sheet is up. */
function YearBody({ prompt, choices, months, correctChoiceId, selectedChoiceId, result, onSelect, mascotVariant, accent, review, attempt }: MonthGameProps) {
  const { compact } = useLessonCompact();
  const still = useReduceMotion();
  const room = useGameRoom();
  const rtl = isRtlLanguage();
  const rows = useMemo(() => yearRows(rtl), [rtl]);
  const look = monthSizes(compact);
  const checked = Boolean(result);
  // Each month's answer, if it is one.
  const answerOf = useMemo(() => {
    const byMonth = new Map<number, ExerciseChoice>();
    for (const choice of choices) if (months[choice.id] !== undefined) byMonth.set(months[choice.id], choice);
    return byMonth;
  }, [choices, months]);
  const moons = useMemo(() => {
    const size = look.moon;
    return { size, phases: PHASES.map((age, index) => moonSvg(size, age, { shade: index === 0 ? 0.55 : 0 })) };
  }, [look.moon]);

  const toneOf = (id: string): Tone => {
    const mine = selectedChoiceId === id;
    if (!checked) return mine ? "picked" : "idle";
    if (id === correctChoiceId && (mine || !result?.correct)) return "right";
    return mine ? "wrong" : "idle";
  };
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";

  // Where the year starts in the scrolling page, and where each of its rows ends.
  const [yearTop, setYearTop] = useState(0);
  const rowBottoms = useRef<number[]>([]);
  const onPlace = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.y);
    if (Math.abs(next - yearTop) > 1) setYearTop(next);
  };
  // Once the answer sheet is up, the right month (now green, its moon full) stays in sight above it: the bottom of its
  // row (as laid out in the year, from the year's top) is kept above the sheet.
  const rightRow = Math.floor((months[correctChoiceId] ?? 11) / 3);
  useEffect(() => {
    if (result) room.reveal(yearTop + (rowBottoms.current[rightRow] ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, yearTop, rightRow]);

  return (
    <>
      <GameCue label={t("Tap the month")} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} pick={selectedChoiceId} />
      <View style={styles.yearWrap} onLayout={onPlace}>
        <PopIn from="up" delay={120}>
          <View style={styles.year} testID="month-game-year">
            <Stars />
            {rows.map((row, rowIndex) => (
              <View
                key={rowIndex}
                style={[styles.row, rowIndex > 0 && styles.rowNext]}
                testID={`month-row-${rowIndex}`}
                onLayout={(event) => {
                  rowBottoms.current[rowIndex] = Math.round(event.nativeEvent.layout.y + event.nativeEvent.layout.height);
                }}
              >
                {row.map((month) => {
                  const choice = answerOf.get(month.index);
                  // The months pop in one by one, as the year goes by.
                  const delay = 200 + month.index * 40;
                  return choice ? (
                    <MonthTile
                      key={month.index}
                      index={month.index}
                      choice={choice}
                      tone={toneOf(choice.id)}
                      accent={accent}
                      moons={moons}
                      font={look.answerFont}
                      still={still}
                      disabled={checked}
                      delay={delay}
                      onPress={() => onSelect(choice.id)}
                    />
                  ) : (
                    <View key={month.index} style={styles.cellOuter} testID={`month-cell-${month.index}`} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                      <PopIn delay={delay} style={styles.cellFill}>
                        <View style={[styles.face, styles.otherFace]}>
                          <View style={[styles.night, styles.otherNight, { width: moons.size + NIGHT_EDGE, height: moons.size + NIGHT_EDGE, borderRadius: (moons.size + NIGHT_EDGE) / 2 }]}>
                            <SvgXml xml={moons.phases[0]} width={moons.size} height={moons.size} />
                          </View>
                          <Text style={[styles.name, styles.otherName, { fontSize: look.otherFont, lineHeight: look.otherFont + 3 }]} numberOfLines={2}>
                            {t(month.name)}
                          </Text>
                        </View>
                      </PopIn>
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        </PopIn>
      </View>
    </>
  );
}

/** The faint stars behind the months, drawn once. */
function Stars() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const xml = useMemo(() => {
    if (!size.width || !size.height) return "";
    const dots = STARS.map(([x, y, r]) => `<circle cx="${(x * size.width).toFixed(1)}" cy="${(y * size.height).toFixed(1)}" r="${r}" fill="#FFFFFF" opacity="0.55"/>`).join("");
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}">${dots}</svg>`;
  }, [size]);
  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
      onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        if (Math.abs(width - size.width) > 1 || Math.abs(height - size.height) > 1) setSize({ width: Math.round(width), height: Math.round(height) });
      }}
    >
      {xml ? <SvgXml xml={xml} width={size.width} height={size.height} /> : null}
    </View>
  );
}

/** An answer's month: its moon in a patch of night, filling when it is picked, and its name. */
function MonthTile({
  index,
  choice,
  tone,
  accent,
  moons,
  font,
  still,
  disabled,
  delay,
  onPress
}: {
  index: number;
  choice: ExerciseChoice;
  tone: Tone;
  accent: string;
  moons: { size: number; phases: string[] };
  font: number;
  still: boolean;
  disabled: boolean;
  delay: number;
  onPress: () => void;
}) {
  const { style: shakeStyle, shake } = useShake(6);
  const burst = useOneShot();
  // The moon is full while the month is picked, and on the right month once checked; a wrong pick goes back to new.
  const full = tone === "picked" || tone === "right";
  const fill = useRef(new Animated.Value(full ? 1 : 0)).current;
  useEffect(() => {
    if (still) {
      fill.setValue(full ? 1 : 0);
      return undefined;
    }
    const run = Animated.timing(fill, { toValue: full ? 1 : 0, duration: full ? 720 : 360, easing: Easing.out(Easing.quad), useNativeDriver: true });
    run.start();
    return () => run.stop();
  }, [fill, full, still]);
  useEffect(() => {
    if (tone === "wrong" && !still) shake();
    // A right answer throws sparkles from its moon.
    if (tone === "right" && !still) burst.play(1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tone]);
  const palette = topicPalette(accent);
  const look =
    tone === "right"
      ? { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, ink: CORRECT_TEXT }
      : tone === "wrong"
        ? { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, ink: WRONG_TEXT }
        : tone === "picked"
          ? { bg: lighten(palette.main, 0.88), border: palette.main, lip: darken(palette.main, 0.15), ink: colors.ink }
          : { bg: colors.white, border: colors.line, lip: colors.lineLip, ink: colors.ink };
  const night = moons.size + NIGHT_EDGE;
  // Each phase shows in its share of the filling; the moon swells a little as it fills.
  const phaseOpacity = (at: number) =>
    at === 0 ? 1 : fill.interpolate({ inputRange: [(at - 1) / (PHASES.length - 1), at / (PHASES.length - 1)], outputRange: [0, 1], extrapolate: "clamp" });
  const swell = fill.interpolate({ inputRange: [0, 0.55, 1], outputRange: [1, 1.22, 1] });
  return (
    <Animated.View style={[styles.cellOuter, shakeStyle]} testID={`month-cell-${index}`}>
      <ReadRing part={answerPart(choice.id)} radius={12} inset={3} />
      <PopIn delay={delay} style={styles.cellFill}>
        <Tappable
          onPress={onPress}
          disabled={disabled}
          pressScale={0.94}
          accessibilityRole="button"
          accessibilityLabel={choice.label}
          accessibilityState={{ selected: tone !== "idle", disabled }}
          testID={`choice-${choice.id}`}
          style={styles.tilePress}
        >
          <View pointerEvents="none" style={[styles.tileLip, { backgroundColor: look.lip }]} />
          <View style={[styles.face, styles.answerFace, { backgroundColor: look.bg, borderColor: look.border }]} testID={`month-tile-${choice.id}`}>
            <View style={{ width: night, height: night }}>
              <Animated.View style={[styles.night, { width: night, height: night, borderRadius: night / 2, transform: [{ scale: swell }] }]} testID={`month-moon-${choice.id}-${full ? "full" : "new"}`}>
                {moons.phases.map((xml, at) => (
                  <Animated.View key={at} style={[styles.phase, { opacity: phaseOpacity(at) }]}>
                    <SvgXml xml={xml} width={moons.size} height={moons.size} />
                  </Animated.View>
                ))}
              </Animated.View>
              {tone === "right" && !still ? (
                <View style={[styles.burst, { width: night, height: night }]} pointerEvents="none">
                  {[-70, -25, 25, 70, 180].map((angle, at) => {
                    const rad = ((angle - 90) * Math.PI) / 180;
                    return (
                      <Floater key={at} t={burst.value} from={0.02} to={0.9} x={night / 2 - 6} y={night / 2 - 6} rise={-Math.sin(rad) * 28} drift={Math.cos(rad) * 28}>
                        <Sparkle size={12} color={at % 2 ? colors.gold : colors.green} />
                      </Floater>
                    );
                  })}
                </View>
              ) : null}
            </View>
            <Text style={[styles.name, { color: look.ink, fontSize: font, lineHeight: font + 3 }]} numberOfLines={2}>
              {withHonorifics(choice.label)}
            </Text>
          </View>
        </Tappable>
      </PopIn>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  yearWrap: { marginTop: space.md, alignSelf: "stretch" },
  year: {
    alignSelf: "stretch",
    borderRadius: radii.lg,
    backgroundColor: "#0A1233",
    borderWidth: YEAR_EDGE,
    borderColor: colors.line,
    padding: YEAR_PAD
  },
  row: { flexDirection: "row", alignItems: "stretch", gap: MONTH_GAP },
  rowNext: { marginTop: MONTH_GAP - 2 },
  cellOuter: { flex: 1, flexBasis: 0, position: "relative" },
  cellFill: { flex: 1 },
  tilePress: { position: "relative", paddingBottom: LIP, flex: 1 },
  tileLip: { position: "absolute", left: 0, right: 0, top: LIP, bottom: 0, borderRadius: 12 },
  face: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    borderWidth: MONTH_BORDER,
    borderRadius: 12,
    paddingHorizontal: MONTH_PAD_X,
    paddingVertical: 4
  },
  answerFace: { minHeight: 52 },
  // The other months stand as high as an answer and its lip, so every row lines up.
  otherFace: { marginBottom: LIP, minHeight: 52, borderColor: "rgba(160,176,255,0.22)", backgroundColor: "rgba(20,28,74,0.72)" },
  night: { alignItems: "center", justifyContent: "center", backgroundColor: "#16205A", overflow: "hidden" },
  otherNight: { backgroundColor: "transparent", opacity: 0.7 },
  phase: { position: "absolute" },
  name: { fontFamily: fonts.bodyHeavy, textAlign: "center", alignSelf: "stretch" },
  otherName: { color: "#AEB8E6" },
  burst: { position: "absolute", left: 0, top: 0, overflow: "visible" }
});
