import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Platform, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import Svg, { Line, Polygon, Rect, SvgXml } from "react-native-svg";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { useTextScale } from "../../services/deviceSettings";
import { MAP_PLACES, SEA_LABELS, type MapLevel } from "../../data/seerahMap";
import { t } from "../../i18n";
import { isArabicOnly, withHonorifics } from "../ArabicText";
import type { MascotMood } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { Floater, Sparkle, useOneShot } from "../reactions";
import { Tappable } from "../Tappable";
import { useLiteMotion } from "../liteMotion";
import { useReduceMotion } from "../motion";
import { colors, darken, fonts, lighten, radii, space } from "../theme";
import { distance, kmBetween, pixels, type Pt } from "../journey/mapGeometry";
import { seaShown, terrainSvg } from "../journey/mapTerrain";
import { QuestionBubble, useLessonCompact, type ExerciseChoice, type ExerciseResult } from "./ExerciseView";
import { CORRECT_TEXT, WRONG_TEXT } from "./FeedbackSheet";
import { PANEL_GAP, mapLevelFor, mapPlanFor, mapSizes, mapViewFor, placeLabels, zoneBox, type LabelBox, type PlacedLabel } from "./mapQuestions";
import { GameCue, GameFrame, useGameRoom } from "./WordGames";

/**
 * A place question asked on a map (see mapQuestions.ts): each answer stands at its real place, drawn the way the
 * Seerah maps draw the land, and the learner taps the right one, by its name or the ring round its place. Places
 * too close together to tell apart (Hira, Thawr and Arafah round Makkah, with Uhud far to the north) are marked by a
 * box on the map and drawn again on a close-up under it. CHECK and the answer sheet work as for every other way of
 * asking, so the lesson scores it, takes a heart and shows the source as usual. A right answer throws sparkles from
 * its place and turns green; a wrong one shakes and turns red, and the right one turns green.
 *
 * Only land, water and places are drawn: never a person.
 */

export type MapGameProps = {
  prompt: string;
  /** The answers, in the learner's language. */
  choices: ExerciseChoice[];
  /** Each answer's place on the map (choice id -> place id, from mapPlacesFor on the English question). */
  places: Record<string, string>;
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
type Pin = { choice: ExerciseChoice; placeId: string };

/** A name's bubble: its height, and the room its words get round them (padding and border). */
const LABEL_H = 34;
const LABEL_ROOM = 26;
/** The tap ring round a place's picture (smaller where places sit close). */
const PIN_TAP = 40;
const PIN_LEAST = 28;
/** A map before it has been measured (a phone 320 wide). */
const FALLBACK_WIDTH = 288;

/** A first guess at a name's bubble, until its words have been measured on screen. */
function guessWidth(label: string, max: number, scale: number) {
  return Math.min(max, Math.max(58, Math.round(label.length * 7.8 * scale) + LABEL_ROOM));
}

/** The close-up's title, when its places are all round Makkah or round Madinah. */
function closeTitle(placeIds: string[]) {
  const near = (center: string, reach: number) => placeIds.every((id) => kmBetween(MAP_PLACES[id].at, MAP_PLACES[center].at) <= reach);
  if (near("makkah", 75)) return t("Near Makkah");
  if (near("madinah", 30)) return t("Near Madinah");
  return undefined;
}

export function MapGame(props: MapGameProps) {
  const { prompt, selectedChoiceId, result, onCheck, onContinue, praiseSeed, playSound, continueSound, bottomInset } = props;
  return (
    <GameFrame
      ready={Boolean(selectedChoiceId)}
      result={result}
      prompt={prompt}
      praiseSeed={praiseSeed}
      playSound={playSound}
      continueSound={continueSound}
      bottomInset={bottomInset}
      onCheck={onCheck}
      onContinue={onContinue}
      testID="map-game"
    >
      <MapBody {...props} />
    </GameFrame>
  );
}

/** Inside the game's frame, so it knows the room it has. */
function MapBody({ prompt, choices, places, correctChoiceId, selectedChoiceId, result, onSelect, mascotVariant, accent, review, attempt }: MapGameProps) {
  const { compact } = useLessonCompact();
  const reduce = useReduceMotion();
  const lite = useLiteMotion();
  const room = useGameRoom();
  const textScale = useTextScale();
  const [measuredWidth, setMeasuredWidth] = useState(0);
  const [top, setTop] = useState(0);
  const [measured, setMeasured] = useState<Record<string, number>>({});
  const width = measuredWidth || FALLBACK_WIDTH;
  const checked = Boolean(result);
  const placeKey = choices.map((choice) => places[choice.id]).filter(Boolean).join(",");
  const plan = useMemo(() => {
    const ids = placeKey.split(",").filter((id) => MAP_PLACES[id]);
    return mapPlanFor(ids) ?? { all: ids, main: ids };
  }, [placeKey]);
  const choiceAt = useMemo(() => {
    const byPlace: Record<string, ExerciseChoice> = {};
    for (const choice of choices) if (places[choice.id]) byPlace[places[choice.id]] = choice;
    return byPlace;
  }, [choices, places]);
  // The map fills what is left of the screen under the question, above CHECK.
  const free = room.height ? room.height - top - space.xxl : 320;
  const sizes = useMemo(() => mapSizes(plan, width, free), [free, plan, width]);
  const labelHeight = Math.round(LABEL_H * textScale);
  const maxLabel = Math.max(96, Math.min(180, Math.round(width * 0.5)));
  const widthOf = (choice: ExerciseChoice) => measured[choice.id] ?? guessWidth(choice.label, maxLabel, textScale);
  const toneOf = (id: string): Tone => {
    const picked = selectedChoiceId === id;
    if (!checked) return picked ? "picked" : "idle";
    if (id === correctChoiceId && (picked || !result?.correct)) return "right";
    return picked ? "wrong" : "idle";
  };
  const mood: MascotMood = !result ? "think" : result.correct ? "cheer" : "sad";

  // Where the right answer stands (in the scrolling page), so it stays in sight above the answer sheet.
  const rightSpot = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (result && rightSpot.current !== undefined) room.reveal(top + rightSpot.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, top]);

  const onPlace = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.y);
    if (Math.abs(next - top) > 1) setTop(next);
  };
  const onWidth = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next > 0 && Math.abs(next - measuredWidth) > 1) setMeasuredWidth(next);
  };
  const onWords = (id: string) => (event: LayoutChangeEvent) => {
    const next = Math.min(maxLabel, Math.ceil(event.nativeEvent.layout.width) + 1 + LABEL_ROOM);
    if (next > LABEL_ROOM && Math.abs((measured[id] ?? 0) - next) > 1) setMeasured((all) => ({ ...all, [id]: next }));
  };

  const shared = {
    width,
    labelHeight,
    maxLabel,
    textScale,
    accent,
    checked,
    still: reduce,
    lite,
    widthOf,
    toneOf,
    onSelect
  };
  const mainPins = useMemo<Pin[]>(() => plan.main.flatMap((placeId) => (choiceAt[placeId] ? [{ choice: choiceAt[placeId], placeId }] : [])), [choiceAt, plan]);
  const closePins = useMemo<Pin[]>(() => (plan.close ?? []).flatMap((placeId) => (choiceAt[placeId] ? [{ choice: choiceAt[placeId], placeId }] : [])), [choiceAt, plan]);
  const rightOnClose = closePins.some((pin) => pin.choice.id === correctChoiceId);

  return (
    <>
      <GameCue label={t("Tap it on the map")} review={review} attempt={attempt} accent={accent} />
      <QuestionBubble prompt={prompt} mascotVariant={mascotVariant} accent={accent} mood={mood} hideMascot={compact} pick={selectedChoiceId} />
      <View style={styles.place} onLayout={onPlace}>
        <PopIn from="up" delay={120}>
          <View onLayout={onWidth} style={styles.stack}>
            <MapPanel
              {...shared}
              testID="map-game-map"
              viewIds={plan.all}
              pins={mainPins}
              zoneIds={plan.close}
              level={mapLevelFor(plan.all)}
              height={sizes.main}
              coneTo={plan.close ? sizes.main + PANEL_GAP : undefined}
              delay={200}
              seed={`question-${placeKey}`}
              onRightAt={rightOnClose ? undefined : (y) => (rightSpot.current = y)}
              rightId={correctChoiceId}
              measure={choices.map((choice) => ({ id: choice.id, label: choice.label }))}
              onWords={onWords}
            />
            {plan.close ? (
              <>
                <ConeGap mainHeight={sizes.main} width={width} ids={plan.all} zoneIds={plan.close} />
                <MapPanel
                  {...shared}
                  testID="map-game-closeup"
                  viewIds={plan.close}
                  pins={closePins}
                  level={mapLevelFor(plan.close)}
                  height={sizes.close}
                  title={closeTitle(plan.close)}
                  delay={200 + mainPins.length * 90}
                  seed={`question-close-${placeKey}`}
                  onRightAt={rightOnClose ? (y) => (rightSpot.current = sizes.main + PANEL_GAP + y) : undefined}
                  rightId={correctChoiceId}
                />
              </>
            ) : null}
          </View>
        </PopIn>
      </View>
    </>
  );
}

type PanelProps = {
  testID: string;
  /** The places the panel's land is fitted round. */
  viewIds: string[];
  /** The answers with a ring and a name on this panel. */
  pins: Pin[];
  /** Places drawn again on the close-up: a box marks them here. */
  zoneIds?: string[];
  level: MapLevel;
  width: number;
  height: number;
  /** The close-up's top, from this panel's top: the box's lines reach for its corners. */
  coneTo?: number;
  title?: string;
  delay: number;
  seed: string;
  labelHeight: number;
  maxLabel: number;
  textScale: number;
  accent: string;
  checked: boolean;
  still: boolean;
  lite: boolean;
  widthOf: (choice: ExerciseChoice) => number;
  toneOf: (id: string) => Tone;
  onSelect: (id: string) => void;
  rightId: string;
  /** Told where the right answer's ring and name reach down to, on this panel. */
  onRightAt?: (y: number) => void;
  /** The answers' names to measure (hidden), so each bubble is as wide as its words. */
  measure?: { id: string; label: string }[];
  onWords?: (id: string) => (event: LayoutChangeEvent) => void;
};

function leastApart(points: Pt[]) {
  let least = Infinity;
  points.forEach((point, index) => {
    for (const other of points.slice(index + 1)) least = Math.min(least, distance(point, other));
  });
  return least;
}

/** One map: the land, the places' pictures, a ring and a name for each answer. */
function MapPanel({
  testID,
  viewIds,
  pins,
  zoneIds,
  level,
  width,
  height,
  coneTo,
  title,
  delay,
  seed,
  labelHeight,
  maxLabel,
  textScale,
  accent,
  checked,
  still,
  lite,
  widthOf,
  toneOf,
  onSelect,
  rightId,
  onRightAt,
  measure,
  onWords
}: PanelProps) {
  const view = useMemo(() => mapViewFor(viewIds, width, height), [viewIds, width, height]);
  const map = useMemo(() => pixels(view, width), [view, width]);
  const spots = useMemo(() => pins.map((pin) => map.of(MAP_PLACES[pin.placeId].at)), [map, pins]);
  const zone = useMemo(() => (zoneIds ? zoneBox(zoneIds.map((id) => map.of(MAP_PLACES[id].at))) : undefined), [map, zoneIds]);
  const terrain = useMemo(
    () => terrainSvg({ level, view, width, height, places: pins.map((pin, index) => ({ kind: MAP_PLACES[pin.placeId].kind, at: spots[index] })), seed }),
    [height, level, pins, seed, spots, view, width]
  );
  const ring = Math.round(Math.max(PIN_LEAST, Math.min(PIN_TAP, leastApart(spots) - 4)));
  // The close-up's title goes in the corner farthest from its places.
  const titleBox = useMemo<LabelBox | undefined>(() => {
    if (!title) return undefined;
    const w = Math.round(title.length * 7 * textScale) + 26;
    const h = 26;
    const corners = [
      { x: 6, y: 6 },
      { x: width - 6 - w, y: 6 },
      { x: 6, y: height - 6 - h },
      { x: width - 6 - w, y: height - 6 - h }
    ];
    const room = (corner: Pt) => Math.min(...spots.map((spot) => Math.hypot(Math.max(corner.x - spot.x, 0, spot.x - corner.x - w), Math.max(corner.y - spot.y, 0, spot.y - corner.y - h))));
    const best = corners.reduce((a, b) => (room(b) > room(a) + 0.5 ? b : a));
    return { ...best, w, h };
  }, [height, spots, textScale, title, width]);
  // Cheap for a few names: worked out on every draw, so a name measured on screen moves to its place at once.
  const labels = placeLabels(
    pins.map((pin, index) => ({ x: spots[index].x, y: spots[index].y, w: widthOf(pin.choice), h: labelHeight })),
    width,
    height,
    [...(zone ? [zone] : []), ...(titleBox ? [titleBox] : [])]
  );
  // A sea's name only where no place or name of an answer is (it never sits under one), and each sea's name once.
  const seas = SEA_LABELS.flatMap((sea, index) => {
    const point = seaShown(sea.at, view, width, height);
    if (!point) return [];
    const box = { x: point.x - 60, y: point.y - 9, w: 120, h: 18 };
    const clear =
      spots.every((spot) => Math.abs(spot.x - point.x) > 60 + ring / 2 || Math.abs(spot.y - point.y) > 9 + ring / 2) &&
      labels.every((label) => !label || label.x > box.x + box.w || label.x + label.w < box.x || label.y > box.y + box.h || label.y + label.h < box.y);
    return clear ? [{ key: `${sea.name}-${index}`, name: sea.name, point }] : [];
  });
  const seaNames = seas.filter((sea, index) => seas.findIndex((other) => other.name === sea.name) === index);
  const rightIndex = pins.findIndex((pin) => pin.choice.id === rightId);
  if (onRightAt && rightIndex >= 0 && labels[rightIndex]) onRightAt(Math.max(spots[rightIndex].y + ring / 2, labels[rightIndex].y + labels[rightIndex].h));
  const fontSize = Math.round(15 * textScale);
  const lineHeight = Math.round(20 * textScale);

  return (
    <View style={[styles.frame, { height }]} testID={testID}>
      <SvgXml xml={terrain} width={width} height={height} />
      {seaNames.map((sea) => (
        <View key={sea.key} style={[styles.abs, { left: sea.point.x - 60, top: sea.point.y - 8, width: 120, alignItems: "center" }]} pointerEvents="none">
          <Text style={styles.sea} numberOfLines={1}>
            {t(sea.name)}
          </Text>
        </View>
      ))}
      <Svg width={width} height={height} style={StyleSheet.absoluteFill} pointerEvents="none">
        {zone && coneTo !== undefined ? (
          <>
            <Polygon
              points={`${zone.x},${zone.y + zone.h} ${zone.x + zone.w},${zone.y + zone.h} ${width - 6},${coneTo} 6,${coneTo}`}
              fill={colors.gold}
              opacity={0.16}
            />
            <Line x1={zone.x} y1={zone.y + zone.h} x2={6} y2={coneTo} stroke={darken(colors.gold, 0.2)} strokeWidth={1.4} strokeDasharray="4 3" />
            <Line x1={zone.x + zone.w} y1={zone.y + zone.h} x2={width - 6} y2={coneTo} stroke={darken(colors.gold, 0.2)} strokeWidth={1.4} strokeDasharray="4 3" />
          </>
        ) : null}
        {zone ? <Rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx={7} fill="rgba(255,255,255,0.25)" stroke={darken(colors.gold, 0.25)} strokeWidth={2} strokeDasharray="5 3" /> : null}
        {pins.map((pin, index) => {
          const box = labels[index];
          if (!box) return null;
          const at = spots[index];
          const x = Math.max(box.x, Math.min(box.x + box.w, at.x));
          const y = Math.max(box.y, Math.min(box.y + box.h, at.y));
          return Math.hypot(x - at.x, y - at.y) > 22 ? (
            <Line key={pin.choice.id} x1={at.x} y1={at.y} x2={x} y2={y} stroke="rgba(31,45,39,0.55)" strokeWidth={1.6} strokeDasharray="3 3" strokeLinecap="round" />
          ) : null;
        })}
      </Svg>
      {title && titleBox ? (
        <View style={[styles.abs, styles.title, { left: titleBox.x, top: titleBox.y }]} pointerEvents="none" testID={`${testID}-title`}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
      ) : null}
      {pins.map((pin, index) => (
        <MapPin
          key={pin.choice.id}
          at={spots[index]}
          size={ring}
          tone={toneOf(pin.choice.id)}
          still={still}
          pulse={!checked && !lite}
          accent={accent}
          disabled={checked}
          onPress={() => onSelect(pin.choice.id)}
          testID={`map-pin-${pin.choice.id}`}
          delay={delay + index * 90}
        />
      ))}
      {pins.map((pin, index) => {
        const box = labels[index];
        if (!box) return null;
        const tone = toneOf(pin.choice.id);
        return (
          <MapLabel
            key={pin.choice.id}
            box={box}
            label={pin.choice.label}
            tone={tone}
            accent={accent}
            fontSize={fontSize}
            lineHeight={lineHeight}
            shake={checked && tone === "wrong"}
            disabled={checked}
            onPress={() => onSelect(pin.choice.id)}
            delay={delay + 60 + index * 90}
            testID={`choice-${pin.choice.id}`}
          />
        );
      })}
      {measure && onWords ? (
        // The names, unseen, at their own width: each bubble is then made just as wide as its words.
        <View style={styles.measure} pointerEvents="none" accessibilityElementsHidden importantForAccessibility="no-hide-descendants" aria-hidden>
          {measure.map((item) => (
            <View key={item.id} style={styles.measureItem} onLayout={onWords(item.id)}>
              <Text style={[styles.labelText, { fontSize, lineHeight }, isArabicOnly(item.label) ? styles.labelArabic : null]} numberOfLines={1}>
                {withHonorifics(item.label)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/** The two lines from the box on the main map down to the close-up's corners, across the gap between them. */
function ConeGap({ mainHeight, width, ids, zoneIds }: { mainHeight: number; width: number; ids: string[]; zoneIds: string[] }) {
  const zone = useMemo(() => {
    const map = pixels(mapViewFor(ids, width, mainHeight), width);
    return zoneBox(zoneIds.map((id) => map.of(MAP_PLACES[id].at)));
  }, [ids, mainHeight, width, zoneIds]);
  const end = mainHeight + PANEL_GAP;
  const bottom = zone.y + zone.h;
  // Where each line leaves the main map's bottom edge.
  const along = (from: number, to: number) => from + ((to - from) * (mainHeight - bottom)) / Math.max(1, end - bottom);
  const left = along(zone.x, 6);
  const right = along(zone.x + zone.w, width - 6);
  return (
    <Svg width={width} height={PANEL_GAP} pointerEvents="none" testID="map-game-cone">
      <Polygon points={`${left},0 ${right},0 ${width - 6},${PANEL_GAP} 6,${PANEL_GAP}`} fill={colors.gold} opacity={0.16} />
      <Line x1={left} y1={0} x2={6} y2={PANEL_GAP} stroke={darken(colors.gold, 0.2)} strokeWidth={1.4} strokeDasharray="4 3" />
      <Line x1={right} y1={0} x2={width - 6} y2={PANEL_GAP} stroke={darken(colors.gold, 0.2)} strokeWidth={1.4} strokeDasharray="4 3" />
    </Svg>
  );
}

/** The ring round a place: it breathes while the question waits, shows the pick, and turns green or red. */
function MapPin({
  at,
  size,
  tone,
  still,
  pulse,
  accent,
  disabled,
  onPress,
  testID,
  delay
}: {
  at: Pt;
  size: number;
  tone: Tone;
  still: boolean;
  pulse: boolean;
  accent: string;
  disabled: boolean;
  onPress: () => void;
  testID: string;
  delay: number;
}) {
  const breathe = useRef(new Animated.Value(0)).current;
  const burst = useOneShot();
  useEffect(() => {
    if (still || !pulse) {
      breathe.stopAnimation();
      breathe.setValue(0);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(breathe, { toValue: 1, duration: 1400, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(breathe, { toValue: 0, duration: 0, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [breathe, delay, pulse, still]);
  // A right answer throws sparkles from its place.
  useEffect(() => {
    if (tone === "right" && !still) burst.play(1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tone]);
  const ring = tone === "right" ? colors.green : tone === "wrong" ? colors.heart : tone === "picked" ? darken(accent, 0.15) : "rgba(255,255,255,0.95)";
  const half = size / 2;
  return (
    <View style={[styles.abs, { left: at.x - half, top: at.y - half, width: size, height: size }]} pointerEvents="box-none">
      {pulse && !still ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.pinPulse,
            {
              left: 4,
              top: 4,
              width: size - 8,
              height: size - 8,
              borderRadius: size,
              borderColor: tone === "picked" ? darken(accent, 0.1) : colors.gold,
              opacity: breathe.interpolate({ inputRange: [0, 1], outputRange: [0.9, 0] }),
              transform: [{ scale: breathe.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1.6] }) }]
            }
          ]}
        />
      ) : null}
      <Tappable
        onPress={onPress}
        disabled={disabled}
        hiddenFromAccessibility
        style={[styles.pinTap, { width: size, height: size, borderRadius: half, borderColor: ring, borderWidth: tone === "idle" ? 2 : 3.5 }]}
        testID={testID}
        hitSlop={4}
      />
      {tone === "right" && !still ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          {[-60, -20, 20, 60, 180].map((angle, index) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            return (
              <Floater key={index} t={burst.value} from={0.02} to={0.9} x={half - 7} y={half - 7} rise={-Math.sin(rad) * 34} drift={Math.cos(rad) * 34}>
                <Sparkle size={14} color={index % 2 ? colors.gold : colors.green} />
              </Floater>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

/** An answer's name in its bubble, next to its place: tap it to pick the place. */
function MapLabel({
  box,
  label,
  tone,
  accent,
  fontSize,
  lineHeight,
  shake: shaking,
  disabled,
  onPress,
  delay,
  testID
}: {
  box: PlacedLabel;
  label: string;
  tone: Tone;
  accent: string;
  fontSize: number;
  lineHeight: number;
  shake: boolean;
  disabled: boolean;
  onPress: () => void;
  delay: number;
  testID: string;
}) {
  const { style: shakeStyle, shake } = useShake(6);
  useEffect(() => {
    if (shaking) shake();
  }, [shaking, shake]);
  const look =
    tone === "right"
      ? { backgroundColor: colors.correctBg, borderColor: colors.green, color: CORRECT_TEXT }
      : tone === "wrong"
        ? { backgroundColor: colors.wrongBg, borderColor: colors.heart, color: WRONG_TEXT }
        : tone === "picked"
          ? { backgroundColor: lighten(accent, 0.82), borderColor: darken(accent, 0.15), color: darken(accent, 0.45) }
          : { backgroundColor: colors.white, borderColor: "rgba(31,45,39,0.22)", color: colors.ink };
  return (
    <Animated.View style={[styles.abs, { left: box.x, top: box.y, width: box.w, height: box.h }, shakeStyle]}>
      <PopIn delay={delay}>
        <Tappable
          onPress={onPress}
          disabled={disabled}
          style={[styles.label, { width: box.w, height: box.h, backgroundColor: look.backgroundColor, borderColor: look.borderColor }]}
          testID={testID}
          accessibilityRole="button"
          accessibilityLabel={label}
          accessibilityState={{ selected: tone === "picked" || tone === "right" || tone === "wrong", disabled }}
        >
          <Text style={[styles.labelText, { fontSize, lineHeight, color: look.color }, isArabicOnly(label) ? styles.labelArabic : null]} numberOfLines={1}>
            {withHonorifics(label)}
          </Text>
        </Tappable>
      </PopIn>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  place: { marginTop: space.md },
  stack: { alignSelf: "stretch" },
  // A map reads the same in every language: east is on the right (the app's own layout turns over for Urdu and Arabic).
  frame: {
    borderRadius: radii.lg,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#E2CFA4",
    backgroundColor: "#F1DFB9",
    ...(Platform.OS === "web" ? null : { direction: "ltr" as const })
  },
  abs: { position: "absolute" },
  sea: { fontFamily: fonts.bodyBold, fontSize: 11, lineHeight: 14, letterSpacing: 0.6, color: "#2B78A0", opacity: 0.9 },
  title: { left: 8, top: 8, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 3, backgroundColor: "rgba(255,255,255,0.88)", borderWidth: 1.5, borderColor: darken(colors.gold, 0.15) },
  titleText: { fontFamily: fonts.bodyHeavy, fontSize: 12, lineHeight: 16, letterSpacing: 0.3, color: darken(colors.gold, 0.5) },
  pinPulse: { position: "absolute", borderWidth: 3 },
  pinTap: {},
  label: {
    borderRadius: radii.pill,
    borderWidth: 2,
    paddingHorizontal: 11,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2
  },
  labelText: { fontFamily: fonts.bodyHeavy, fontSize: 15, lineHeight: 20, color: colors.ink, textAlign: "center" },
  // Arabic and Urdu names in the app's Arabic face, as on the answer tiles.
  labelArabic: { fontFamily: fonts.arabicBold, writingDirection: "rtl" },
  measure: { position: "absolute", left: 0, top: 0, width: 1200, opacity: 0, flexDirection: "column", alignItems: "flex-start" },
  measureItem: { alignSelf: "flex-start" }
});
