import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { t } from "../../i18n";
import { withHonorifics } from "../ArabicText";
import type { MascotMood } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { Floater, Sparkle, useOneShot } from "../reactions";
import { Tappable } from "../Tappable";
import { useReduceMotion } from "../motion";
import { colors, darken, fonts, lighten, radii, space, topicPalette } from "../theme";
import { SignSceneView } from "../journey/SignScene";
import { QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult } from "./ExerciseView";
import { CORRECT_TEXT, WRONG_TEXT } from "./FeedbackSheet";
import { GameCue, GameFrame, useGameRoom } from "./WordGames";
import { answerPart, QUESTION_PART } from "./questionAloud";
import { ReadRing } from "./ReadGlow";
import type { SceneQuestion } from "./sceneQuestions";

/**
 * A story question asked on its living scene (see sceneQuestions.ts): the scene plays up to just before the moment
 * the question asks about and waits there, a "?" over it, while the learner picks an answer. CHECK and the answer
 * sheet work as for every other way of asking, so the lesson scores it, takes a heart and shows the source as usual.
 * Once answered, right or wrong, the scene plays the moment with its words: the ark comes to rest on al-Judi, twelve
 * springs gush from the rock. A right answer throws sparkles and turns green; a wrong one shakes and turns red, and the
 * right one turns green.
 *
 * The scenes draw no Prophet, no person and no angel (see signScenes.ts).
 */

export type SceneGameProps = {
  prompt: string;
  /** The answers, in the learner's language. */
  choices: ExerciseChoice[];
  /** The scene, where it waits, and where it stops once answered (sceneQuestionFor, on the English question). */
  ask: SceneQuestion;
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

/** The scene's shape, as on a lesson's first page: everything that tells its story shows (y 11 to 109 of 120). */
const SCENE_ASPECT = 1.64;
/** On a short phone the scene gets smaller (narrower too, keeping its shape) so the answers fit; never below this. */
const MIN_SCENE = 112;
/** A scene before it has been measured (a phone 320 wide). */
const FALLBACK_WIDTH = 288;
/** The scene's frame: a border of 2 all round. */
const FRAME_EDGE = 4;
/** The scene waits a moment after the question shows before it plays. */
const SCENE_DELAY = 300;
/**
 * A scene that would show at less than this share of its full height gets more room: the teacher steps aside (the
 * question takes the full width, in fewer lines), and the gaps and the answers' padding get smaller.
 */
const TIGHT = 0.8;

export function SceneGame(props: SceneGameProps) {
  const { prompt, choices, selectedChoiceId, result, onCheck, onContinue, praiseSeed, playSound, continueSound, bottomInset } = props;
  return (
    <GameFrame
      ready={Boolean(selectedChoiceId)}
      result={result}
      prompt={prompt}
      // Read out: the question, then the answers, each tile glowing as it is said.
      aloud={[{ key: QUESTION_PART, text: prompt }, ...choices.map((choice) => ({ key: answerPart(choice.id), text: choice.label }))]}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID="scene-game"
    >
      <SceneBody {...props} />
    </GameFrame>
  );
}

/** Inside the game's frame, so it can keep the scene in sight once the answer sheet is up. */
function SceneBody({ prompt, choices, ask, correctChoiceId, selectedChoiceId, result, onSelect, mascotVariant, accent, review, attempt }: SceneGameProps) {
  const { compact } = useLessonCompact();
  const still = useReduceMotion();
  const room = useGameRoom();
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [sceneTop, setSceneTop] = useState(0);
  const [tilesHeight, setTilesHeight] = useState(0);
  const [tight, setTight] = useState(false);
  const full = measuredWidth || FALLBACK_WIDTH;
  const checked = Boolean(result);
  const [openedChecked] = useState(checked);
  // The scene fills what is left above the answers and CHECK, up to the full width; on a short phone it is smaller
  // (and narrower, so it keeps its shape), but never lower than MIN_SCENE: below that, the page scrolls.
  const tall = Math.round(full / SCENE_ASPECT);
  const measured = Boolean(room.height && tilesHeight && sceneTop);
  const free = measured ? room.height - sceneTop - FRAME_EDGE - space.sm - tilesHeight - space.sm : tall;
  const height = Math.round(Math.max(Math.min(tall, MIN_SCENE), Math.min(tall, free)));
  const width = Math.min(full, Math.round(height * SCENE_ASPECT));
  // Too little room for the scene: it takes the teacher's and the gaps' (see TIGHT), from its first frames, before the
  // answers have popped in, and for the rest of this question, so nothing moves again (not when the sheet comes up,
  // unless the question opened with its sheet up).
  useEffect(() => {
    if (!tight && (!checked || openedChecked) && measured && free < tall * TIGHT) setTight(true);
  }, [tight, checked, openedChecked, measured, free, tall]);

  const toneOf = (id: string): Tone => {
    const mine = selectedChoiceId === id;
    if (!checked) return mine ? "picked" : "idle";
    if (id === correctChoiceId && (mine || !result?.correct)) return "right";
    return mine ? "wrong" : "idle";
  };
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";

  // Once the answer sheet is up, the scene (now playing its moment) stays in sight above it.
  useEffect(() => {
    if (result) room.reveal(sceneTop + height + FRAME_EDGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, sceneTop, height]);

  // Where the scene starts in the scrolling page, how wide its row is, and how tall the answers under it are.
  const onPlace = (event: LayoutChangeEvent) => {
    const { y, width: rowWidth } = event.nativeEvent.layout;
    if (Math.abs(Math.round(y) - sceneTop) > 1) setSceneTop(Math.round(y));
    const inner = Math.round(rowWidth) - FRAME_EDGE;
    if (inner > 0 && Math.abs(inner - measuredWidth) > 1) setMeasuredWidth(inner);
  };
  const onTiles = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.height);
    if (Math.abs(next - tilesHeight) > 1) setTilesHeight(next);
  };

  return (
    <>
      <GameCue label={t("Watch, then answer")} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact || tight} smallGaps={tight} pick={selectedChoiceId} />
      <View style={[styles.sceneWrap, tight && styles.sceneWrapTight]} onLayout={onPlace} testID="scene-game-row">
        <PopIn from="up" delay={120}>
          <View
            style={[styles.frame, { width: width + FRAME_EDGE, height: height + FRAME_EDGE }]}
            testID="scene-game-scene"
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <SignSceneView
              scene={ask.scene}
              width={width}
              height={height}
              still={still}
              delay={SCENE_DELAY}
              ask={{ pause: ask.pause, reveal: ask.reveal, revealed: checked }}
              testID={`scene-game-${ask.scene.kind}-${checked ? "moment" : "waiting"}`}
            />
          </View>
        </PopIn>
      </View>
      <View style={styles.tiles} onLayout={onTiles} testID="scene-game-tiles">
        {choices.map((choice, index) => (
          <AnswerTile
            key={choice.id}
            choice={choice}
            tone={toneOf(choice.id)}
            accent={accent}
            still={still}
            compact={compact || tight}
            tight={tight}
            disabled={checked}
            delay={220 + index * 70}
            onPress={() => onSelect(choice.id)}
          />
        ))}
      </View>
    </>
  );
}

/** An answer: its words on a tile. */
function AnswerTile({
  choice,
  tone,
  accent,
  still,
  compact,
  tight,
  disabled,
  delay,
  onPress
}: {
  choice: ExerciseChoice;
  tone: Tone;
  accent: string;
  still: boolean;
  compact: boolean;
  /** Smaller padding and gaps, so the scene has more room. */
  tight: boolean;
  disabled: boolean;
  delay: number;
  onPress: () => void;
}) {
  const { style: shakeStyle, shake } = useShake(6);
  const burst = useOneShot();
  useEffect(() => {
    if (tone === "wrong" && !still) shake();
    // A right answer throws sparkles from its tile.
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
  return (
    <Animated.View style={[styles.tileOuter, compact && styles.tileOuterCompact, tight && styles.tileOuterTight, shakeStyle]}>
      <ReadRing part={answerPart(choice.id)} radius={14} />
      <PopIn delay={delay}>
        <Tappable
          onPress={onPress}
          disabled={disabled}
          pressScale={0.96}
          accessibilityRole="button"
          accessibilityLabel={choice.label}
          accessibilityState={{ selected: tone !== "idle", disabled }}
          testID={`choice-${choice.id}`}
          style={styles.tilePress}
        >
          <View pointerEvents="none" style={[styles.tileLip, { backgroundColor: look.lip }]} />
          <View style={[styles.tileFace, compact && styles.tileFaceCompact, tight && styles.tileFaceTight, { backgroundColor: look.bg, borderColor: look.border }]} testID={`scene-tile-${choice.id}`}>
            <Text style={[styles.tileText, compact && styles.tileTextCompact, { color: look.ink }]}>{withHonorifics(choice.label)}</Text>
          </View>
        </Tappable>
      </PopIn>
      {tone === "right" && !still ? (
        <View style={[StyleSheet.absoluteFill, styles.burst]} pointerEvents="none">
          {[-60, -20, 20, 60, 180].map((angle, index) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            return (
              <Floater key={index} t={burst.value} from={0.02} to={0.9} x={28} y={24} rise={-Math.sin(rad) * 30} drift={Math.cos(rad) * 30}>
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
  sceneWrap: { marginTop: space.md, alignSelf: "stretch", alignItems: "center" },
  sceneWrapTight: { marginTop: space.xs },
  frame: {
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderColor: colors.line
  },
  tiles: { marginTop: space.sm, alignSelf: "stretch" },
  tileOuter: { marginVertical: 4, alignSelf: "stretch" },
  tileOuterCompact: { marginVertical: 3 },
  tileOuterTight: { marginVertical: 2 },
  tilePress: { position: "relative", paddingBottom: TILE_LIP, alignSelf: "stretch" },
  tileLip: { position: "absolute", left: 0, right: 0, top: TILE_LIP, bottom: 0, borderRadius: 14 },
  tileFace: { flexDirection: "row", alignItems: "center", borderWidth: 2, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 10, minHeight: 50 },
  tileFaceCompact: { paddingVertical: 8, minHeight: 44 },
  tileFaceTight: { paddingVertical: 6, minHeight: 40 },
  tileText: { flex: 1, fontFamily: fonts.bodyHeavy, fontSize: 17, lineHeight: 22, textAlign: "center" },
  tileTextCompact: { fontSize: 16, lineHeight: 21 },
  burst: { overflow: "visible" }
});
