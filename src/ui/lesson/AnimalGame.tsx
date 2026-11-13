import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { SvgXml } from "react-native-svg";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { isRtlLanguage, t } from "../../i18n";
import { isArabicOnly, withHonorifics } from "../ArabicText";
import type { MascotMood } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { Floater, Sparkle, useOneShot } from "../reactions";
import { Tappable } from "../Tappable";
import { sampleCurve, useReduceMotion } from "../motion";
import { textScaled } from "../textScale";
import { colors, darken, fonts, lighten, radii, space, topicPalette } from "../theme";
import { QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult } from "./ExerciseView";
import { CORRECT_TEXT, WRONG_TEXT } from "./FeedbackSheet";
import { GameCue, GameFrame, useGameRoom } from "./WordGames";
import { answerPart, QUESTION_PART } from "./questionAloud";
import { ReadRing } from "./ReadGlow";
import { ANIMAL_BOX, animalArt, homeSvg, type AnimalKind, type AnimalMotion } from "./animalArt";
import { CARD_BORDER, CARD_GAP, CARD_NAME_FONT, CARD_NAME_FONT_ARABIC, CARD_NAME_PAD, CARDS_FALLBACK_WIDTH, cardLook, cardRows } from "./animalQuestions";

/**
 * An animal question on picture cards (see animalQuestions.ts): each answer is a card with its animal drawn in its own
 * place (on the sand, in the sky, in the sea, on the ground), moving its own way: walking on the spot, flying with
 * beating wings, buzzing about, swimming, creeping. A card tapped hops, and makes the animal's sound where it has
 * one. CHECK and the answer sheet work as for every other way of asking, so the lesson scores it, takes a heart and
 * shows the source as usual. A right answer throws sparkles and turns green; a wrong one shakes and turns red, and
 * the right one turns green and hops.
 *
 * Only animals are drawn: never a person.
 */

export type AnimalGameProps = {
  prompt: string;
  /** The answers, in the learner's language. */
  choices: ExerciseChoice[];
  /** Each answer's animal (choice id -> animal, from animalsFor on the English question). */
  animals: Record<string, AnimalKind>;
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

/** The lip under each card, that it presses down into. */
const LIP = 4;

/** The sound a tapped animal makes, where the app has one; the others make the usual tap. */
const ANIMAL_SOUND: Partial<Record<AnimalKind, GameSoundEvent>> = {
  camel: "camel",
  sheep: "baa",
  goat: "baa",
  bird: "chirp",
  crow: "chirp",
  eagle: "chirp",
  dove: "chirp",
  hoopoe: "chirp",
  sparrow: "chirp",
  fish: "splash",
  whale: "splash"
};

/** How long one round of each way of moving takes. */
const MOTION_MS: Record<AnimalMotion, number> = { walk: 2400, fly: 2000, buzz: 1500, swim: 2200, creep: 2800 };
/** How long one beat of the wings takes: a bird's slow, an insect's a blur. */
const WING_MS: Partial<Record<AnimalMotion, number>> = { fly: 520, buzz: 140 };

export function AnimalGame(props: AnimalGameProps) {
  const { prompt, choices, selectedChoiceId, result, onCheck, onContinue, praiseSeed, playSound, continueSound, bottomInset } = props;
  return (
    <GameFrame
      ready={Boolean(selectedChoiceId)}
      result={result}
      prompt={prompt}
      // Read out: the question, then the animals to pick from, each card glowing as it is said.
      aloud={[{ key: QUESTION_PART, text: prompt }, ...choices.map((choice) => ({ key: answerPart(choice.id), text: choice.label }))]}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID="animal-game"
    >
      <CardsBody {...props} />
    </GameFrame>
  );
}

/** Inside the game's frame, so it can keep the right card in sight once the answer sheet is up. */
function CardsBody({ prompt, choices, animals, correctChoiceId, selectedChoiceId, result, onSelect, mascotVariant, accent, review, attempt }: AnimalGameProps) {
  const { compact } = useLessonCompact();
  const still = useReduceMotion();
  const room = useGameRoom();
  const rtl = isRtlLanguage();
  const [width, setWidth] = useState(0);
  const [cardsTop, setCardsTop] = useState(0);
  // Where the row with the right answer ends, under the top of the cards.
  const [rightBottom, setRightBottom] = useState(0);
  const look = cardLook(width || CARDS_FALLBACK_WIDTH, compact);
  const shown = useMemo(() => choices.filter((choice) => animals[choice.id]), [choices, animals]);
  const rows = useMemo(() => cardRows(shown, rtl), [shown, rtl]);
  const checked = Boolean(result);

  const toneOf = (id: string): Tone => {
    const mine = selectedChoiceId === id;
    if (!checked) return mine ? "picked" : "idle";
    if (id === correctChoiceId && (mine || !result?.correct)) return "right";
    return mine ? "wrong" : "idle";
  };
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";

  const onCards = (event: LayoutChangeEvent) => {
    const { y, width: wide } = event.nativeEvent.layout;
    if (Math.abs(Math.round(y) - cardsTop) > 1) setCardsTop(Math.round(y));
    if (Math.abs(Math.round(wide) - width) > 1) setWidth(Math.round(wide));
  };
  // Once the answer sheet is up, the right card stays in sight above it.
  const rightRow = rows.findIndex((row) => row.some((choice) => choice.id === correctChoiceId));
  useEffect(() => {
    if (result) room.reveal(cardsTop + rightBottom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, cardsTop, rightBottom]);

  return (
    <>
      <GameCue label={t("Tap the animal")} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} pick={selectedChoiceId} />
      <View style={styles.cards} onLayout={onCards} testID="animal-cards">
        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[styles.row, rowIndex > 0 && styles.rowNext]}
            testID={`animal-row-${rowIndex}`}
            onLayout={(event) => {
              const bottom = Math.round(event.nativeEvent.layout.y + event.nativeEvent.layout.height);
              if (rowIndex === rightRow && Math.abs(bottom - rightBottom) > 1) setRightBottom(bottom);
            }}
          >
            {row.map((choice) => (
              <AnimalCard
                key={choice.id}
                choice={choice}
                kind={animals[choice.id]}
                tone={toneOf(choice.id)}
                accent={accent}
                width={look.card}
                pictureWidth={look.inner}
                pictureHeight={look.picture}
                still={still}
                disabled={checked}
                delay={200 + shown.indexOf(choice) * 90}
                onPress={() => onSelect(choice.id)}
              />
            ))}
          </View>
        ))}
      </View>
    </>
  );
}

/** An answer's card: its animal in its place, moving, and its name under it. */
function AnimalCard({
  choice,
  kind,
  tone,
  accent,
  width,
  pictureWidth,
  pictureHeight,
  still,
  disabled,
  delay,
  onPress
}: {
  choice: ExerciseChoice;
  kind: AnimalKind;
  tone: Tone;
  accent: string;
  width: number;
  pictureWidth: number;
  pictureHeight: number;
  still: boolean;
  disabled: boolean;
  delay: number;
  onPress: () => void;
}) {
  const { style: shakeStyle, shake } = useShake(6);
  const burst = useOneShot();
  const hop = useOneShot();
  useEffect(() => {
    if (still) return;
    if (tone === "wrong") shake();
    // A picked animal hops; the right one hops again and throws sparkles.
    if (tone === "picked" || tone === "right") hop.play(560);
    if (tone === "right") burst.play(1000);
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
    <Animated.View style={[styles.cardOuter, { width }, shakeStyle]} testID={`animal-card-${choice.id}`}>
      <ReadRing part={answerPart(choice.id)} radius={16} />
      <PopIn delay={delay}>
        <Tappable
          onPress={onPress}
          disabled={disabled}
          pressScale={0.95}
          sound={ANIMAL_SOUND[kind] ?? "soft_ui"}
          accessibilityRole="button"
          accessibilityLabel={choice.label}
          accessibilityState={{ selected: tone !== "idle", disabled }}
          testID={`choice-${choice.id}`}
          style={styles.tilePress}
        >
          <View pointerEvents="none" style={[styles.tileLip, { backgroundColor: look.lip }]} />
          <View style={[styles.face, { backgroundColor: look.bg, borderColor: look.border }]} testID={`animal-tile-${choice.id}`}>
            <AnimalPicture kind={kind} width={pictureWidth} height={pictureHeight} still={still} hop={hop.value} testID={`animal-picture-${choice.id}-${kind}`}>
              {tone === "right" && !still ? (
                <View style={[styles.burst, { left: pictureWidth / 2, top: pictureHeight / 2 }]} pointerEvents="none">
                  {[-70, -25, 25, 70, 160, 200].map((angle, at) => {
                    const rad = ((angle - 90) * Math.PI) / 180;
                    return (
                      <Floater key={at} t={burst.value} from={0.02} to={0.9} x={-7} y={-7} rise={-Math.sin(rad) * 40} drift={Math.cos(rad) * 40}>
                        <Sparkle size={14} color={at % 2 ? colors.gold : colors.green} />
                      </Floater>
                    );
                  })}
                </View>
              ) : null}
            </AnimalPicture>
            <Text style={[styles.name, isArabicOnly(choice.label) && styles.nameArabic, { color: look.ink }]} numberOfLines={2}>
              {withHonorifics(choice.label)}
            </Text>
          </View>
        </Tappable>
      </PopIn>
    </Animated.View>
  );
}

/**
 * An animal in its place, `width` by `height`, moving its own way on the native driver (still with less motion).
 * `hop` (0 to 1, as it plays) lifts it in a little jump. Its place is clipped to the card; the animal is not, so it
 * can hop over the top. Also used for the gallery's wall of every animal.
 */
export function AnimalPicture({
  kind,
  width,
  height,
  still,
  hop,
  testID,
  children
}: {
  kind: AnimalKind;
  width: number;
  height: number;
  still: boolean;
  hop?: Animated.Value;
  testID?: string;
  children?: React.ReactNode;
}) {
  const art = animalArt(kind);
  const home = useMemo(() => homeSvg(art.home), [art.home]);
  const idle = useRef(new Animated.Value(0)).current;
  const beat = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (still) {
      idle.setValue(0);
      beat.setValue(0);
      return undefined;
    }
    // Each round in a sequence, as the app's other loops are: a lone timing on the native driver is looped natively,
    // which the web preview cannot do, so there it would stand still.
    const round = (value: Animated.Value, duration: number) =>
      Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })]));
    const loops = [round(idle, MOTION_MS[art.motion])];
    const wingMs = WING_MS[art.motion];
    if (art.wings && wingMs) loops.push(round(beat, wingMs));
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [art, beat, idle, still]);

  const moves = useMemo(() => motionOf(art.motion, kind, idle), [art.motion, kind, idle]);
  const lift = hop ? hop.interpolate(sampleCurve(0, 1, 20, (p) => -10 * Math.sin(Math.PI * p))) : 0;
  const swell = hop ? hop.interpolate(sampleCurve(0, 1, 20, (p) => 1 + 0.08 * Math.sin(Math.PI * p))) : 1;
  // The wings beat about the line where they join the body: where that falls in the picture, as the drawing is
  // fitted into it (as wide or as high as it can be, in the middle).
  const scale = Math.min(width / ANIMAL_BOX.width, height / ANIMAL_BOX.height);
  const pivot = (height - ANIMAL_BOX.height * scale) / 2 + (art.pivot ?? 0) * scale - height / 2;
  const flap = beat.interpolate(sampleCurve(0, 1, 16, (p) => (art.motion === "buzz" ? 0.25 + 0.75 * Math.abs(Math.cos(Math.PI * p)) : 0.2 + 0.8 * Math.cos(2 * Math.PI * p))));
  return (
    <View style={[styles.picture, { width, height }]} testID={testID}>
      <View style={[StyleSheet.absoluteFill, styles.home]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <SvgXml xml={home} width={width} height={height} preserveAspectRatio="none" />
      </View>
      <Animated.View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[StyleSheet.absoluteFill, { transform: [{ translateX: moves.x }, { translateY: hop ? Animated.add(moves.y, lift) : moves.y }, { rotate: moves.turn }, { scale: swell }] }]}
      >
        <SvgXml xml={art.body} width={width} height={height} />
        {art.wings ? (
          <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY: pivot }, { scaleY: flap }, { translateY: -pivot }] }]} testID={testID ? `${testID}-wings` : undefined}>
            <SvgXml xml={art.wings} width={width} height={height} />
          </Animated.View>
        ) : null}
      </Animated.View>
      {children}
    </View>
  );
}

const deg = (curve: { inputRange: number[]; outputRange: number[] }) => ({ ...curve, outputRange: curve.outputRange.map((value) => `${value}deg`) });
const wave = (fn: (p: number) => number) => sampleCurve(0, 1, 24, fn);

/** Each way of moving, from one round of its clock: how far across and up, and how much it leans. */
function motionOf(motion: AnimalMotion, kind: AnimalKind, clock: Animated.Value) {
  const TAU = Math.PI * 2;
  switch (motion) {
    case "walk":
      // Two steps a round: up a little at each, leaning a touch forward and back.
      return {
        x: clock.interpolate(wave((p) => 1.2 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => -1.8 * Math.abs(Math.sin(TAU * p)))),
        turn: clock.interpolate(deg(wave((p) => 1.2 * Math.sin(TAU * p))))
      };
    case "fly":
      // Up and down on the air, rising as the wings beat.
      return {
        x: clock.interpolate(wave((p) => 2 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => 4 * Math.sin(TAU * p + Math.PI / 2))),
        turn: clock.interpolate(deg(wave((p) => -2 * Math.sin(TAU * p))))
      };
    case "buzz":
      // A little loop this way and that.
      return {
        x: clock.interpolate(wave((p) => 4 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => 3 * Math.sin(2 * TAU * p))),
        turn: clock.interpolate(deg(wave((p) => 4 * Math.sin(TAU * p))))
      };
    case "swim":
      return {
        x: clock.interpolate(wave((p) => 5 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => 2 * Math.sin(2 * TAU * p))),
        turn: clock.interpolate(deg(wave((p) => 3 * Math.cos(TAU * p))))
      };
    case "creep":
      // The spider rises and falls on its thread; the others creep a little forward and back.
      if (kind === "spider") {
        return { x: clock.interpolate(wave(() => 0)), y: clock.interpolate(wave((p) => 4 * Math.sin(TAU * p))), turn: clock.interpolate(deg(wave(() => 0))) };
      }
      return {
        x: clock.interpolate(wave((p) => 3 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => -0.8 * Math.abs(Math.sin(2 * TAU * p)))),
        turn: clock.interpolate(deg(wave((p) => 0.8 * Math.sin(2 * TAU * p))))
      };
  }
}

const styles = textScaled(
  StyleSheet.create({
    cards: { marginTop: space.md, alignSelf: "stretch" },
    row: { flexDirection: "row", justifyContent: "center", gap: CARD_GAP },
    rowNext: { marginTop: CARD_GAP },
    cardOuter: { position: "relative" },
    tilePress: { position: "relative", paddingBottom: LIP },
    tileLip: { position: "absolute", left: 0, right: 0, top: LIP, bottom: 0, borderRadius: radii.lg },
    face: { borderWidth: CARD_BORDER, borderRadius: radii.lg, alignItems: "stretch" },
    picture: { position: "relative" },
    home: { borderTopLeftRadius: radii.lg - CARD_BORDER, borderTopRightRadius: radii.lg - CARD_BORDER, overflow: "hidden" },
    name: { fontFamily: fonts.bodyHeavy, fontSize: CARD_NAME_FONT, lineHeight: 20, textAlign: "center", paddingHorizontal: CARD_NAME_PAD, paddingTop: 6, paddingBottom: 8 },
    // Urdu and Arabic names in the Arabic letters' own bold font, as on the answer tiles.
    nameArabic: { fontFamily: fonts.arabicBold, fontSize: CARD_NAME_FONT_ARABIC, lineHeight: 26, paddingTop: 4, paddingBottom: 6, writingDirection: "rtl" },
    burst: { position: "absolute", width: 0, height: 0, overflow: "visible" }
  })
);
