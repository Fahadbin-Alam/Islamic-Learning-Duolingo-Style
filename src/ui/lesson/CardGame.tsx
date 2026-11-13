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
import { LITE_LIFE, useLiteMotion } from "../liteMotion";
import { sampleCurve, useReduceMotion } from "../motion";
import { textScaled } from "../textScale";
import { colors, darken, fonts, lighten, radii, space, topicPalette } from "../theme";
import { QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult } from "./ExerciseView";
import { CORRECT_TEXT, WRONG_TEXT } from "./FeedbackSheet";
import { GameCue, GameFrame, useGameRoom } from "./WordGames";
import { answerPart, QUESTION_PART } from "./questionAloud";
import { ReadRing } from "./ReadGlow";
import { ART_BOX, cardArt, homeSvg, isAnimalKind, type CardKind, type CardLayer, type CardMotion } from "./cardArt";
import { CARD_BORDER, CARD_GAP, CARD_NAME_FONT, CARD_NAME_FONT_ARABIC, CARD_NAME_PAD, CARDS_FALLBACK_WIDTH, cardLook, cardRows, fittedPicture } from "./cardQuestions";

/**
 * A question on picture cards (see cardQuestions.ts): each answer is a card with its picture drawn in its own place,
 * moving its own way. An animal walks, flies with beating wings, buzzes about, swims or creeps; a thing sways in the
 * breeze, bobs on the water, glows, or has its own parts moving: the rain falls, a fire leaps, a river flows, steam
 * rises from bread, a glint comes and goes on gold. A card tapped hops, and makes its sound where it has one. CHECK
 * and the answer sheet work as for every other way of asking, so the lesson scores it, takes a heart and shows the
 * source as usual. A right answer throws sparkles and turns green; a wrong one shakes and turns red, and the right
 * one turns green and hops.
 *
 * Only animals and things are drawn: never a person.
 */

export type CardGameProps = {
  prompt: string;
  /** The answers, in the learner's language. */
  choices: ExerciseChoice[];
  /** Each answer's picture (choice id -> animal or thing, from cardsFor on the English question). */
  kinds: Record<string, CardKind>;
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

/** The sound a tapped card makes, where the app has one for it; the others make the usual tap. */
const CARD_SOUND: Partial<Record<CardKind, GameSoundEvent>> = {
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
  whale: "splash",
  water: "splash",
  rain: "splash",
  river: "splash",
  sea: "splash",
  ship: "splash",
  fire: "sizzle",
  wind: "whoosh",
  air: "whoosh",
  cloud: "whoosh",
  smoke: "whoosh",
  sand: "whoosh",
  dust: "whoosh",
  snow: "whoosh",
  sun: "sparkle",
  moon: "sparkle",
  star: "sparkle",
  light: "sparkle",
  lamp: "sparkle",
  gold: "sparkle",
  silver: "sparkle",
  copper: "sparkle",
  pearl: "sparkle",
  crown: "sparkle",
  ice: "sparkle",
  sword: "sparkle",
  tree: "grow",
  palm: "grow",
  garden: "grow",
  seed: "grow",
  leaves: "grow",
  mint: "grow",
  wheat: "grow",
  barley: "grow",
  thorn: "grow",
  dates: "pop",
  figs: "pop",
  grapes: "pop",
  olives: "pop",
  pomegranate: "pop",
  banana: "pop",
  apple: "pop",
  mango: "pop",
  fruit: "pop",
  citron: "pop",
  gourd: "pop",
  garlic: "pop"
};

/** How long one round of each way of moving takes. */
const MOTION_MS: Record<CardMotion, number> = { walk: 2400, fly: 2000, buzz: 1500, swim: 2200, creep: 2800, still: 0, sway: 3200, bob: 2600, glow: 3000, drift: 6000 };
/** How long one beat of the wings takes: a bird's slow, an insect's a blur. */
const WING_MS: Partial<Record<CardMotion, number>> = { fly: 520, buzz: 140 };

export function CardGame(props: CardGameProps) {
  const { prompt, choices, selectedChoiceId, result, onCheck, onContinue, praiseSeed, playSound, continueSound, bottomInset } = props;
  return (
    <GameFrame
      ready={Boolean(selectedChoiceId)}
      result={result}
      prompt={prompt}
      // Read out: the question, then the answers to pick from, each card glowing as it is said.
      aloud={[{ key: QUESTION_PART, text: prompt }, ...choices.map((choice) => ({ key: answerPart(choice.id), text: choice.label }))]}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID="card-game"
    >
      <CardsBody {...props} />
    </GameFrame>
  );
}

/** Inside the game's frame, so it can keep the right card in sight once the answer sheet is up. */
function CardsBody({ prompt, choices, kinds, correctChoiceId, selectedChoiceId, result, onSelect, mascotVariant, accent, review, attempt }: CardGameProps) {
  const { compact } = useLessonCompact();
  const still = useReduceMotion();
  const room = useGameRoom();
  const rtl = isRtlLanguage();
  const [width, setWidth] = useState(0);
  const [cardsTop, setCardsTop] = useState(0);
  // Where the row with the right answer ends, under the top of the cards.
  const [rightBottom, setRightBottom] = useState(0);
  const look = cardLook(width || CARDS_FALLBACK_WIDTH, compact);
  const shown = useMemo(() => choices.filter((choice) => kinds[choice.id]), [choices, kinds]);
  const rows = useMemo(() => cardRows(shown, rtl), [shown, rtl]);
  // How high the cards stand with their pictures as cardLook says. Under a long question (four lines of Urdu) the
  // pictures are lowered so every card, with its name, fits above CHECK.
  const [cardsTall, setCardsTall] = useState(0);
  const pictureHeight = fittedPicture(look, rows.length, cardsTall, room.height && cardsTop ? room.height - cardsTop - space.md : 0);
  const drawnHeight = useRef(pictureHeight);
  drawnHeight.current = pictureHeight;
  const checked = Boolean(result);
  // "Tap the animal" when every card is an animal; else "Tap the picture".
  const cue = shown.every((choice) => isAnimalKind(kinds[choice.id])) ? t("Tap the animal") : t("Tap the picture");

  const toneOf = (id: string): Tone => {
    const mine = selectedChoiceId === id;
    if (!checked) return mine ? "picked" : "idle";
    if (id === correctChoiceId && (mine || !result?.correct)) return "right";
    return mine ? "wrong" : "idle";
  };
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";

  const onCards = (event: LayoutChangeEvent) => {
    const { y, width: wide, height } = event.nativeEvent.layout;
    if (Math.abs(Math.round(y) - cardsTop) > 1) setCardsTop(Math.round(y));
    if (Math.abs(Math.round(wide) - width) > 1) setWidth(Math.round(wide));
    // Measured with the pictures as drawn: as high as they would stand with the pictures as cardLook says.
    const tall = Math.round(height + rows.length * (look.picture - drawnHeight.current));
    if (Math.abs(tall - cardsTall) > 1) setCardsTall(tall);
  };
  // Once the answer sheet is up, the right card stays in sight above it.
  const rightRow = rows.findIndex((row) => row.some((choice) => choice.id === correctChoiceId));
  useEffect(() => {
    if (result) room.reveal(cardsTop + rightBottom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, cardsTop, rightBottom]);

  return (
    <>
      <GameCue label={cue} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} pick={selectedChoiceId} />
      <View style={styles.cards} onLayout={onCards} testID="cards">
        {rows.map((row, rowIndex) => (
          <View
            key={rowIndex}
            style={[styles.row, rowIndex > 0 && styles.rowNext]}
            testID={`card-row-${rowIndex}`}
            onLayout={(event) => {
              const bottom = Math.round(event.nativeEvent.layout.y + event.nativeEvent.layout.height);
              if (rowIndex === rightRow && Math.abs(bottom - rightBottom) > 1) setRightBottom(bottom);
            }}
          >
            {row.map((choice) => (
              <PictureCard
                key={choice.id}
                choice={choice}
                kind={kinds[choice.id]}
                tone={toneOf(choice.id)}
                accent={accent}
                width={look.card}
                pictureWidth={look.inner}
                pictureHeight={pictureHeight}
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

/** An answer's card: its picture in its place, moving, and its name under it. */
function PictureCard({
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
  kind: CardKind;
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
    // A picked card's picture hops; the right one hops again and throws sparkles.
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
    <Animated.View style={[styles.cardOuter, { width }, shakeStyle]} testID={`card-${choice.id}`}>
      <ReadRing part={answerPart(choice.id)} radius={16} />
      <PopIn delay={delay}>
        <Tappable
          onPress={onPress}
          disabled={disabled}
          pressScale={0.95}
          sound={CARD_SOUND[kind] ?? "soft_ui"}
          accessibilityRole="button"
          accessibilityLabel={choice.label}
          accessibilityState={{ selected: tone !== "idle", disabled }}
          testID={`choice-${choice.id}`}
          style={styles.tilePress}
        >
          <View pointerEvents="none" style={[styles.tileLip, { backgroundColor: look.lip }]} />
          <View style={[styles.face, { backgroundColor: look.bg, borderColor: look.border }]} testID={`card-tile-${choice.id}`}>
            <CardPicture kind={kind} width={pictureWidth} height={pictureHeight} still={still} hop={hop.value} testID={`card-picture-${choice.id}-${kind}`}>
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
            </CardPicture>
            <Text style={[styles.name, isArabicOnly(choice.label) && styles.nameArabic, { color: look.ink }]} numberOfLines={2}>
              {withHonorifics(choice.label)}
            </Text>
          </View>
        </Tappable>
      </PopIn>
    </Animated.View>
  );
}

/** How the box (100 by 80) sits in a picture `w` by `h`: how much each unit is across and down, and where it starts. */
type Frame = { w: number; h: number; sx: number; sy: number; ox: number; oy: number };
/** Fitted: as big as it can be in the middle, the way the animal or the thing is drawn. */
const fitted = (w: number, h: number): Frame => {
  const s = Math.min(w / ART_BOX.width, h / ART_BOX.height);
  return { w, h, sx: s, sy: s, ox: (w - ART_BOX.width * s) / 2, oy: (h - ART_BOX.height * s) / 2 };
};
/** Stretched over all of it, the way the home and the scene are drawn. */
const stretched = (w: number, h: number): Frame => ({ w, h, sx: w / ART_BOX.width, sy: h / ART_BOX.height, ox: 0, oy: 0 });
/** A point of the box, from the middle of the picture (where a view turns and grows about). */
const fromMiddle = (frame: Frame, x: number, y: number) => ({ dx: frame.ox + x * frame.sx - frame.w / 2, dy: frame.oy + y * frame.sy - frame.h / 2 });

/**
 * A card's picture, `width` by `height`: its place, its scene and the parts that fill it (the rain, the waves),
 * clipped to the card; over them the animal or the thing, moving its own way on the native driver, with its own
 * moving parts; all still with less motion, and lighter on a slow phone. `hop` (0 to 1, as it plays) lifts it in a
 * little jump; it is not clipped, so it can hop over the top. Also used for the gallery's wall of every picture.
 */
export function CardPicture({
  kind,
  width,
  height,
  still,
  hop,
  testID,
  children
}: {
  kind: CardKind;
  width: number;
  height: number;
  still: boolean;
  hop?: Animated.Value;
  testID?: string;
  children?: React.ReactNode;
}) {
  const art = cardArt(kind);
  const lite = useLiteMotion();
  const home = useMemo(() => homeSvg(art.home), [art.home]);
  const layers = useMemo(() => art.layers ?? [], [art]);
  const idle = useRef(new Animated.Value(0)).current;
  const beat = useRef(new Animated.Value(0)).current;
  const clocks = useMemo(() => layers.map(() => new Animated.Value(0)), [layers]);
  const bodyMoves = art.motion !== "still";
  const wingsBeat = Boolean(art.wings && WING_MS[art.motion]);
  // On a slow phone a picture keeps only its first few moving things (the body's motion and wings first); the parts
  // past them are drawn standing still.
  const movingLayers = lite ? Math.max(0, LITE_LIFE - Number(bodyMoves) - Number(wingsBeat)) : layers.length;
  useEffect(() => {
    if (still) {
      idle.setValue(0);
      beat.setValue(0);
      clocks.forEach((clock) => clock.setValue(0));
      return undefined;
    }
    // Each round in a sequence, as the app's other loops are: a lone timing on the native driver is looped natively,
    // which the web preview cannot do, so there it would stand still.
    const round = (value: Animated.Value, duration: number) =>
      Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })]));
    const loops: Animated.CompositeAnimation[] = [];
    if (bodyMoves) loops.push(round(idle, MOTION_MS[art.motion]));
    const wingMs = WING_MS[art.motion];
    if (art.wings && wingMs) loops.push(round(beat, wingMs));
    layers.forEach((layer, index) => {
      if (index < movingLayers) loops.push(round(clocks[index], layer.ms ?? 2400));
    });
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [art, beat, bodyMoves, clocks, idle, layers, movingLayers, still]);

  const fit = useMemo(() => fitted(width, height), [width, height]);
  const fill = useMemo(() => stretched(width, height), [width, height]);
  const moves = useMemo(() => motionOf(art.motion, kind, idle), [art.motion, kind, idle]);
  const animal = isAnimalKind(kind);
  const lift = hop ? hop.interpolate(sampleCurve(0, 1, 20, (p) => -(animal ? 10 : 6) * Math.sin(Math.PI * p))) : undefined;
  const swell = hop ? hop.interpolate(sampleCurve(0, 1, 20, (p) => 1 + 0.08 * Math.sin(Math.PI * p))) : undefined;
  const grow = moves.scale && swell ? Animated.multiply(moves.scale, swell) : moves.scale ?? swell ?? 1;
  // A swaying drawing turns about the line it stands on; the others about their middle.
  const foot = art.motion === "sway" ? fromMiddle(fit, ART_BOX.width / 2, art.foot ?? 72).dy : 0;
  // The wings beat about the line where they join the body: where that falls in the picture.
  const pivot = fromMiddle(fit, 0, art.pivot ?? 0).dy;
  const flap = beat.interpolate(sampleCurve(0, 1, 16, (p) => (art.motion === "buzz" ? 0.25 + 0.75 * Math.abs(Math.cos(Math.PI * p)) : 0.2 + 0.8 * Math.cos(2 * Math.PI * p))));
  const layerView = (layer: CardLayer, index: number) => (
    <LayerView
      key={index}
      layer={layer}
      clock={clocks[index]}
      frame={layer.fill ? fill : fit}
      still={still || index >= movingLayers}
      testID={testID ? `${testID}-layer-${index}` : undefined}
    />
  );
  return (
    <View style={[styles.picture, { width, height }]} testID={testID}>
      <View style={[StyleSheet.absoluteFill, styles.home]} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <SvgXml xml={home} width={width} height={height} preserveAspectRatio="none" />
        {art.scene ? (
          <View style={StyleSheet.absoluteFill}>
            <SvgXml xml={art.scene} width={width} height={height} preserveAspectRatio="none" />
          </View>
        ) : null}
        {layers.map((layer, index) => (layer.fill ? layerView(layer, index) : null))}
      </View>
      <Animated.View
        pointerEvents="none"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [
              { translateX: moves.x },
              { translateY: lift ? Animated.add(moves.y, lift) : moves.y },
              { translateY: foot },
              { rotate: moves.turn },
              { translateY: -foot },
              { scale: grow }
            ]
          }
        ]}
      >
        {art.body ? <SvgXml xml={art.body} width={width} height={height} /> : null}
        {art.wings ? (
          <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY: pivot }, { scaleY: flap }, { translateY: -pivot }] }]} testID={testID ? `${testID}-wings` : undefined}>
            <SvgXml xml={art.wings} width={width} height={height} />
          </Animated.View>
        ) : null}
        {layers.map((layer, index) => (layer.fill ? null : layerView(layer, index)))}
      </Animated.View>
      {children}
    </View>
  );
}

/**
 * A part of the picture that moves on its own clock. Rain and snow fall, and waves slide across, as two copies one
 * after the other, so they never run out; the other parts rise and fade, twinkle, turn, leap or sway about a point.
 */
function LayerView({ layer, clock, frame, still, testID }: { layer: CardLayer; clock: Animated.Value; frame: Frame; still: boolean; testID?: string }) {
  const { w, h } = frame;
  const style = useMemo(() => layerMotion(layer, clock, frame), [layer, clock, frame]);
  const picture = <SvgXml xml={layer.svg} width={w} height={h} preserveAspectRatio={layer.fill ? "none" : undefined} />;
  if (still) {
    return (
      <View pointerEvents="none" style={StyleSheet.absoluteFill} testID={testID}>
        {picture}
      </View>
    );
  }
  if (layer.move === "fall" || layer.move === "slide") {
    const across = layer.move === "slide";
    const shift = clock.interpolate({ inputRange: [0, 1], outputRange: [0, across ? w : h] });
    return (
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { transform: across ? [{ translateX: shift }] : [{ translateY: shift }] }]} testID={testID}>
        <View style={[StyleSheet.absoluteFill, across ? { left: -w, right: w } : { top: -h, bottom: h }]}>{picture}</View>
        <View style={StyleSheet.absoluteFill}>{picture}</View>
      </Animated.View>
    );
  }
  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, style]} testID={testID}>
      {picture}
    </Animated.View>
  );
}

const TAU = Math.PI * 2;
const deg = (curve: { inputRange: number[]; outputRange: number[] }) => ({ ...curve, outputRange: curve.outputRange.map((value) => `${value}deg`) });
const wave = (fn: (p: number) => number) => sampleCurve(0, 1, 24, fn);

/** One round of `fn` (q from 0 to 1) on a clock, begun `phase` of the way into its round, so parts alike take turns. */
function phased(fn: (q: number) => number, phase = 0, steps = 24) {
  const start = ((phase % 1) + 1) % 1;
  if (!start) return sampleCurve(0, 1, steps, fn);
  const cut = 1 - start;
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  const first = Math.max(2, Math.round(steps * cut));
  for (let index = 0; index <= first; index += 1) {
    inputRange.push((cut * index) / first);
    outputRange.push(Number(fn(start + (cut * index) / first).toFixed(4)));
  }
  const second = Math.max(2, Math.round(steps * start));
  for (let index = 0; index <= second; index += 1) {
    inputRange.push(index ? cut + (start * index) / second : cut + 0.0001);
    outputRange.push(Number(fn((start * index) / second).toFixed(4)));
  }
  return { inputRange, outputRange, extrapolate: "clamp" as const };
}

/** Rising steam or sparks: in at the start, out at the end. */
const fade = (q: number) => (q < 0.2 ? q / 0.2 : q > 0.65 ? Math.max(0, (1 - q) / 0.35) : 1);

/** How a part moves, from one round of its clock. */
function layerMotion(layer: CardLayer, clock: Animated.Value, frame: Frame) {
  const phase = layer.phase ?? 0;
  const curve = (fn: (q: number) => number) => clock.interpolate(phased(fn, phase));
  const turning = (fn: (q: number) => number) => clock.interpolate(deg(phased(fn, phase)));
  switch (layer.move) {
    case "rise": {
      const reach = (layer.distance ?? -12) * frame.sy;
      return { opacity: curve(fade), transform: [{ translateY: curve((q) => reach * q) }] };
    }
    case "twinkle":
      return { opacity: curve((q) => 0.15 + 0.85 * (0.5 - 0.5 * Math.cos(TAU * q))) };
    case "spin": {
      const { dx, dy } = fromMiddle(frame, layer.center?.x ?? 50, layer.center?.y ?? 40);
      return { transform: [{ translateX: dx }, { translateY: dy }, { rotate: turning((q) => 360 * q) }, { translateX: -dx }, { translateY: -dy }] };
    }
    case "flicker": {
      // A flame: taller and shorter, thinner and wider, leaning this way and that, never quite the same twice a round.
      const { dx, dy } = fromMiddle(frame, layer.center?.x ?? 50, layer.center?.y ?? 80);
      return {
        transform: [
          { translateX: dx },
          { translateY: dy },
          { rotate: turning((q) => 2.4 * Math.sin(TAU * 2 * q)) },
          { scaleX: curve((q) => 1 - 0.06 * Math.sin(TAU * 3 * q + 0.6)) },
          { scaleY: curve((q) => 1 + 0.09 * Math.sin(TAU * 3 * q) + 0.05 * Math.sin(TAU * 5 * q + 1)) },
          { translateX: -dx },
          { translateY: -dy }
        ]
      };
    }
    case "sway": {
      const { dx, dy } = fromMiddle(frame, layer.center?.x ?? 50, layer.center?.y ?? 72);
      const angle = layer.angle ?? 4;
      return { transform: [{ translateX: dx }, { translateY: dy }, { rotate: turning((q) => angle * Math.sin(TAU * q)) }, { translateX: -dx }, { translateY: -dy }] };
    }
    default:
      return {};
  }
}

/** Each way of moving, from one round of its clock: how far across and up, how much it leans, and how big it is. */
function motionOf(motion: CardMotion, kind: CardKind, clock: Animated.Value) {
  const none = clock.interpolate(wave(() => 0));
  const level = clock.interpolate(deg(wave(() => 0)));
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
      if (kind === "spider") return { x: none, y: clock.interpolate(wave((p) => 4 * Math.sin(TAU * p))), turn: level };
      return {
        x: clock.interpolate(wave((p) => 3 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => -0.8 * Math.abs(Math.sin(2 * TAU * p)))),
        turn: clock.interpolate(deg(wave((p) => 0.8 * Math.sin(2 * TAU * p))))
      };
    case "sway":
      // In the breeze, from its foot.
      return { x: none, y: none, turn: clock.interpolate(deg(wave((p) => 2.2 * Math.sin(TAU * p)))) };
    case "bob":
      // Riding the water: up and down, rocking.
      return {
        x: clock.interpolate(wave((p) => 0.8 * Math.sin(TAU * p))),
        y: clock.interpolate(wave((p) => 2 * Math.sin(TAU * p))),
        turn: clock.interpolate(deg(wave((p) => 1.6 * Math.sin(TAU * p + Math.PI / 3))))
      };
    case "glow":
      // Shining: a little bigger and back.
      return { x: none, y: none, turn: level, scale: clock.interpolate(wave((p) => 1 + 0.035 * Math.sin(TAU * p))) };
    case "drift":
      // To and fro on the air.
      return { x: clock.interpolate(wave((p) => 4 * Math.sin(TAU * p))), y: clock.interpolate(wave((p) => 0.8 * Math.sin(2 * TAU * p))), turn: level };
    case "still":
      return { x: none, y: none, turn: level };
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
