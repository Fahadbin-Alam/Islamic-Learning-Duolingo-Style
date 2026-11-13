import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { SvgXml } from "react-native-svg";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { MOMENT_HOURS, type DayMoment, type SkyScene } from "../../data/daySky";
import { t } from "../../i18n";
import { withHonorifics } from "../ArabicText";
import type { MascotMood } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { Floater, Sparkle, useOneShot } from "../reactions";
import { Tappable } from "../Tappable";
import { useReduceMotion } from "../motion";
import { colors, darken, fonts, lighten, radii, space, topicPalette } from "../theme";
import { DaySky } from "../journey/DaySky";
import { momentIcon } from "../journey/skyArt";
import { QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult } from "./ExerciseView";
import { CORRECT_TEXT, WRONG_TEXT } from "./FeedbackSheet";
import { GameCue, GameFrame, useGameRoom } from "./WordGames";
import { answerPart, QUESTION_PART } from "./questionAloud";
import { ReadRing } from "./ReadGlow";
import { openingTime, timeColor, tripTo } from "./skyQuestions";

/**
 * A time question asked in the sky (see skyQuestions.ts): each answer is a tile with a small picture of its time of
 * the day, and the big sky above plays to the time the learner picks: the sun climbing or setting, the stars coming
 * out. A question on a prayer ("In which prayer did he ﷺ recite At-Tur?") is asked the same way, each prayer at its
 * time, and the prayer's name comes into the sky as the sky reaches it. Before a pick, the sky stands at a time no answer is, so it gives nothing away. CHECK and the answer sheet
 * work as for every other way of asking, so the lesson scores it, takes a heart and shows the source as usual. A
 * right answer throws sparkles and turns green; a wrong one shakes and turns red, the right one turns green, and the
 * sky plays on to the right time.
 *
 * Only the sky, the sand, hills and palms are drawn: never a person.
 */

export type SkyGameProps = {
  prompt: string;
  /** The answers, in the learner's language. */
  choices: ExerciseChoice[];
  /** Each answer's time of the day (choice id -> time, from skyTimesFor on the English question). */
  times: Record<string, DayMoment>;
  /** The answers are prayers ("Maghrib"), each at its time: the learner taps the prayer (answersArePrayers). */
  byPrayer?: boolean;
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

/**
 * The sky is at most half as tall as it is wide. On a short phone it gets lower, so that every answer fits above
 * CHECK, but never lower than MIN_SKY: below that, the page scrolls.
 */
const SKY_ASPECT = 2;
const MIN_SKY = 112;
/** A sky before it has been measured (a phone 320 wide). */
const FALLBACK_WIDTH = 288;
/** The sky's frame: a border of 2 all round. */
const FRAME_EDGE = 4;
const SWATCH = { width: 46, height: 32 };
/** On a phone under 700 high (see useLessonCompact), the answers are a little smaller. */
const SWATCH_COMPACT = { width: 40, height: 28 };

/** How long the sky takes to get to a time: quick for an hour or two, never more than a few seconds round the day. */
export const tripDuration = (from: number, to: number) => Math.round(Math.min(2400, Math.max(900, 700 + (to - from) * 120)));

export function SkyGame(props: SkyGameProps) {
  const { prompt, choices, selectedChoiceId, result, onCheck, onContinue, praiseSeed, playSound, continueSound, bottomInset } = props;
  return (
    <GameFrame
      ready={Boolean(selectedChoiceId)}
      result={result}
      prompt={prompt}
      // Read out: the question, then the times to pick from, each tile glowing as it is said.
      aloud={[{ key: QUESTION_PART, text: prompt }, ...choices.map((choice) => ({ key: answerPart(choice.id), text: choice.label }))]}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID="sky-game"
    >
      <SkyBody {...props} />
    </GameFrame>
  );
}

/** Inside the game's frame, so it can keep the sky in sight once the answer sheet is up. */
function SkyBody({ prompt, choices, times, byPrayer, correctChoiceId, selectedChoiceId, result, onSelect, mascotVariant, accent, review, attempt }: SkyGameProps) {
  const { compact } = useLessonCompact();
  const still = useReduceMotion();
  const room = useGameRoom();
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [skyTop, setSkyTop] = useState(0);
  const [tilesHeight, setTilesHeight] = useState(0);
  const width = measuredWidth || FALLBACK_WIDTH;
  // The sky fills what is left above the answers and CHECK, from MIN_SKY up to half its width.
  const tall = Math.round(width / SKY_ASPECT);
  const free = room.height && tilesHeight ? room.height - skyTop - FRAME_EDGE - space.sm - tilesHeight - space.sm : tall;
  const height = Math.round(Math.max(Math.min(tall, MIN_SKY), Math.min(tall, free)));
  const checked = Boolean(result);
  const opening = useMemo(() => openingTime(times), [times]);
  // Where the sky goes: the picked answer's time; after a wrong answer, the right one's; before a pick, a time no
  // answer is.
  const picked = selectedChoiceId ? times[selectedChoiceId] : undefined;
  const target: DayMoment = result && !result.correct ? times[correctChoiceId] ?? opening : picked ?? opening;
  // The sky's trip, from where it stood to that time; it first comes up to the opening time from a little before.
  const [trip, setTrip] = useState(() => ({ id: 0, time: opening, ...tripTo(MOMENT_HOURS[opening] - 1.6, opening) }));
  useEffect(() => {
    setTrip((was) => (was.time === target ? was : { id: was.id + 1, time: target, ...tripTo(was.to, target) }));
  }, [target]);
  // On a prayer question, the prayer's name comes into the sky as it reaches the prayer's time: the one picked, or the
  // right one after a wrong pick.
  const named = byPrayer ? choices.find((choice) => choice.id === (result && !result.correct ? correctChoiceId : selectedChoiceId)) : undefined;
  const markLabel = named && times[named.id] === trip.time ? named.label : undefined;
  const scene = useMemo<SkyScene>(
    () => ({ id: `sky-question-${trip.id}`, from: trip.from, to: trip.to, caption: "", sources: [], marks: markLabel ? [{ hour: trip.to, label: markLabel }] : undefined }),
    [trip, markLabel]
  );

  const toneOf = (id: string): Tone => {
    const mine = selectedChoiceId === id;
    if (!checked) return mine ? "picked" : "idle";
    if (id === correctChoiceId && (mine || !result?.correct)) return "right";
    return mine ? "wrong" : "idle";
  };
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";

  // Once the answer sheet is up, the sky (now at the right time) stays in sight above it.
  useEffect(() => {
    if (result) room.reveal(skyTop + height + FRAME_EDGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, skyTop, height]);

  // Where the sky starts in the scrolling page, how wide it is, and how tall the answers under it are.
  const onPlace = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.y);
    if (Math.abs(next - skyTop) > 1) setSkyTop(next);
  };
  const onSky = (event: LayoutChangeEvent) => {
    const inner = Math.round(event.nativeEvent.layout.width) - FRAME_EDGE;
    if (inner > 0 && Math.abs(inner - measuredWidth) > 1) setMeasuredWidth(inner);
  };
  const onTiles = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.height);
    if (Math.abs(next - tilesHeight) > 1) setTilesHeight(next);
  };

  return (
    <>
      <GameCue label={t(byPrayer ? "Tap the prayer" : "Tap the time of day")} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} pick={selectedChoiceId} />
      <View style={styles.skyWrap} onLayout={onPlace}>
        <PopIn from="up" delay={120}>
          <View style={[styles.frame, { height: height + FRAME_EDGE }]} onLayout={onSky} testID="sky-game-sky" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
            {/* A sky of its own for each trip, starting where the last one stopped. */}
            <DaySky key={trip.id} testID={`sky-game-at-${trip.time}`} scene={scene} width={width} height={height} still={still} delay={trip.id === 0 ? 260 : 0} duration={tripDuration(trip.from, trip.to)} />
          </View>
        </PopIn>
      </View>
      <View style={styles.tiles} onLayout={onTiles}>
        {choices.map((choice, index) =>
          times[choice.id] ? (
            <TimeTile
              key={choice.id}
              choice={choice}
              time={times[choice.id]}
              tone={toneOf(choice.id)}
              accent={accent}
              still={still}
              compact={compact}
              disabled={checked}
              delay={220 + index * 70}
              onPress={() => onSelect(choice.id)}
            />
          ) : null
        )}
      </View>
    </>
  );
}

/** An answer: a small picture of its time of the day, in its sky's colour, and its words. */
function TimeTile({
  choice,
  time,
  tone,
  accent,
  still,
  compact,
  disabled,
  delay,
  onPress
}: {
  choice: ExerciseChoice;
  time: DayMoment;
  tone: Tone;
  accent: string;
  still: boolean;
  compact: boolean;
  disabled: boolean;
  delay: number;
  onPress: () => void;
}) {
  const { style: shakeStyle, shake } = useShake(6);
  const burst = useOneShot();
  useEffect(() => {
    if (tone === "wrong" && !still) shake();
    // A right answer throws sparkles from its little sky.
    if (tone === "right" && !still) burst.play(1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tone]);
  const palette = topicPalette(accent);
  const swatch = compact ? SWATCH_COMPACT : SWATCH;
  const look =
    tone === "right"
      ? { bg: colors.correctBg, border: lighten(colors.green, 0.2), lip: colors.green, ink: CORRECT_TEXT }
      : tone === "wrong"
        ? { bg: colors.wrongBg, border: lighten(colors.heart, 0.2), lip: colors.heart, ink: WRONG_TEXT }
        : tone === "picked"
          ? { bg: lighten(palette.main, 0.88), border: palette.main, lip: darken(palette.main, 0.15), ink: colors.ink }
          : { bg: colors.white, border: colors.line, lip: colors.lineLip, ink: colors.ink };
  return (
    <Animated.View style={[styles.tileOuter, compact && styles.tileOuterCompact, shakeStyle]}>
      <ReadRing part={answerPart(choice.id)} radius={14} />
      <PopIn delay={delay}>
        <Tappable
          onPress={onPress}
          disabled={disabled}
          pressScale={0.96}
          accessibilityRole="button"
          accessibilityLabel={choice.label}
          accessibilityHint={t("Shows this time in the sky")}
          accessibilityState={{ selected: tone !== "idle", disabled }}
          testID={`choice-${choice.id}`}
          style={styles.tilePress}
        >
          <View pointerEvents="none" style={[styles.tileLip, { backgroundColor: look.lip }]} />
          <View style={[styles.tileFace, compact && styles.tileFaceCompact, { backgroundColor: look.bg, borderColor: look.border }]} testID={`sky-tile-${choice.id}`}>
            <View style={[styles.swatch, swatch, { backgroundColor: timeColor(time) }]} testID={`sky-tile-${choice.id}-${time}`}>
              <SvgXml xml={momentIcon(time, true)} width={compact ? 27 : 30} height={compact ? 17 : 19} />
            </View>
            <Text style={[styles.tileText, compact && styles.tileTextCompact, { color: look.ink }]}>{withHonorifics(choice.label)}</Text>
          </View>
        </Tappable>
      </PopIn>
      {tone === "right" && !still ? (
        <View style={[StyleSheet.absoluteFill, styles.burst]} pointerEvents="none">
          {[-60, -20, 20, 60, 180].map((angle, index) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            return (
              <Floater key={index} t={burst.value} from={0.02} to={0.9} x={swatch.width / 2 + 3} y={swatch.height / 2} rise={-Math.sin(rad) * 30} drift={Math.cos(rad) * 30}>
                <Sparkle size={13} color={index % 2 ? colors.gold : colors.green} />
              </Floater>
            );
          })}
        </View>
      ) : null}
    </Animated.View>
  );
}

const TILE_LIP = 4;

const styles = StyleSheet.create({
  skyWrap: { marginTop: space.md, alignSelf: "stretch" },
  frame: {
    alignSelf: "stretch",
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: "#0A1233",
    borderWidth: 2,
    borderColor: colors.line
  },
  tiles: { marginTop: space.sm, alignSelf: "stretch" },
  tileOuter: { marginVertical: 4, alignSelf: "stretch" },
  tileOuterCompact: { marginVertical: 3 },
  tilePress: { position: "relative", paddingBottom: TILE_LIP, alignSelf: "stretch" },
  tileLip: { position: "absolute", left: 0, right: 0, top: TILE_LIP, bottom: 0, borderRadius: 14 },
  tileFace: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 2, borderRadius: 14, paddingLeft: 6, paddingRight: 14, paddingVertical: 6, minHeight: 50 },
  tileFaceCompact: { gap: 10, paddingVertical: 5, minHeight: 44 },
  swatch: { borderRadius: 9, alignItems: "center", justifyContent: "center" },
  tileText: { flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 22 },
  tileTextCompact: { fontSize: 16, lineHeight: 21 },
  burst: { overflow: "visible" }
});
