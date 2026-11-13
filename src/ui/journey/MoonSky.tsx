import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import type { MoonScene } from "../../data/moonSky";
import { t } from "../../i18n";
import { useLiteMotion } from "../liteMotion";
import { fonts } from "../theme";
import { DAWN_BAND, EAST_GLOW, LOW_KEYS, WEST_GLOW } from "./DaySky";
import {
  MOON_DURATION,
  STAGE_AGES,
  coursesMoonP,
  halfMoonSvg,
  hiraAt,
  ibrahimMoonP,
  ibrahimStarAt,
  monthAt,
  monthCellLook,
  monthCells,
  moonHour,
  moonLayout,
  moonSvg,
  mountainsSvg,
  newMoonAt,
  newMoonShown,
  nightMoonAt,
  orbitDots,
  overT,
  shownBetween,
  splitAt,
  stageShown,
  stagesMoonAt,
  type MoonWordBox
} from "./moonArt";
import {
  DARK_KEYS,
  LOW_SUN,
  PALM,
  SMALL_PALM,
  STAR,
  STAR_KEYS,
  SUN_KEYS,
  WORD,
  dawnBandSvg,
  groundSvg,
  hillPaths,
  keyed,
  skyKeysFor,
  skyLayerSvg,
  sunAt,
  sunSvg
} from "./skyArt";

/**
 * The moon in the sky (moonArt.ts has its shapes and places): the moon split over Hira, the new moon after sunset,
 * the moon's stages through a month, the star, the moon and the sun that Ibrahim saw set, the sun and the moon each
 * in its orbit, and the twelve months. Nothing in it is a person or an angel.
 *
 * Everything moves on the native driver, from the one value of the sky's clock; with reduce motion (or Calm mode) the
 * sky shows its end at once (or, for the skies that go through a day, the moon in its night) and stands still, and on
 * a slow phone it keeps fewer stars.
 */

export type MoonSkyProps = {
  scene: MoonScene;
  width: number;
  height: number;
  still?: boolean;
  /** Bump to play the sky again. */
  play?: number;
  delay?: number;
  /** Called once the sky has played to its end. */
  onDrawn?: () => void;
  testID?: string;
};

/** Where a still sky stands: its end, but for the skies that go through a day, the moon high in its night. */
export const MOON_STILL_AT: Record<MoonScene["kind"], number> = { split: 1, newMoon: 1, stages: 1, ibrahim: 0.44, courses: 0.78, months: 1 };

let moonCount = 0;

const rand = (seed: number, index: number) => {
  const x = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

/** A dark copy of a picture, for the night. */
const darken = (svg: string, color = "#0B1233") => svg.replace(/fill="#[0-9A-Fa-f]{6}"/g, `fill="${color}"`).replace(/stroke="#[0-9A-Fa-f]{6}"/g, `stroke="${color}"`);

/** The bright star Ibrahim saw: a soft glow round a four-pointed star. */
const BRIGHT_STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><circle cx="15" cy="15" r="14" fill="#FFF6D0" opacity="0.18"/><circle cx="15" cy="15" r="7" fill="#FFF6D0" opacity="0.3"/><path d="M15 3.5l1.9 9.6 9.6 1.9-9.6 1.9L15 26.5l-1.9-9.6L3.5 15l9.6-1.9Z" fill="#FFFBEA"/></svg>`;

/** A small star by a sacred month. */
const GOLD_STAR = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10"><path d="M5 0.4l1.4 3.1 3.2 0.4-2.4 2.2 0.7 3.3L5 7.7 2.1 9.4l0.7-3.3L0.4 3.9l3.2-0.4Z" fill="#FFD25A"/></svg>`;

/** A loop from 0 to 1 again and again (a lone loop does not run on the web; in a sequence it does). */
function useLoop(ms: number, still: boolean) {
  const value = useRef(new Animated.Value(still ? 0.4 : 0)).current;
  useEffect(() => {
    if (still) return undefined;
    const loop = Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration: ms, easing: Easing.linear, useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [ms, still, value]);
  return value;
}

const ALIGN = { left: "flex-start", right: "flex-end", center: "center" } as const;

/** A word in the sky: a small dark pill, as wide as its word. */
function Word({ text, rect, opacity, testID }: { text: string; rect: MoonWordBox; opacity?: Animated.AnimatedInterpolation<number> | number; testID?: string }) {
  return (
    <Animated.View pointerEvents="none" style={[styles.wordBox, { left: rect.x, top: rect.y, width: rect.w, height: rect.h, alignItems: ALIGN[rect.anchor], opacity: opacity ?? 1 }]}>
      <View style={styles.word} testID={testID}>
        <Text style={styles.wordText} numberOfLines={1}>
          {text}
        </Text>
      </View>
    </Animated.View>
  );
}

export function MoonSky({ scene, width, height, still = false, play = 0, delay = 0, onDrawn, testID = "moon-sky" }: MoonSkyProps) {
  const lite = useLiteMotion();
  const id = useRef(`moon${(moonCount += 1)}`).current;
  const kind = scene.kind;
  const layout = useMemo(() => moonLayout(scene, width, height, (text) => t(text)), [scene, width, height]);
  const frame = layout.frame;
  const stillAt = MOON_STILL_AT[kind];
  const clock = useRef(new Animated.Value(still ? stillAt : 0)).current;
  const drawnRef = useRef(onDrawn);
  drawnRef.current = onDrawn;
  const duration = MOON_DURATION[kind];

  useEffect(() => {
    if (still) {
      clock.setValue(stillAt);
      const timer = setTimeout(() => drawnRef.current?.(), 0);
      return () => clearTimeout(timer);
    }
    clock.setValue(0);
    const run = Animated.timing(clock, { toValue: 1, duration, delay, easing: Easing.inOut(Easing.quad), useNativeDriver: true });
    run.start();
    // Timing callbacks are not reliable everywhere (the tests run them at once): the clock says when it has played.
    const timer = setTimeout(() => drawnRef.current?.(), delay + duration + 250);
    return () => {
      run.stop();
      clearTimeout(timer);
    };
  }, [play, still, stillAt, duration, delay, clock, scene.id]);

  const slow = useLoop(5200, still || lite);
  const by = (fn: (at: number) => number) => clock.interpolate(overT(fn));
  const hourAt = (at: number) => moonHour(kind, at);
  const byHour = (keys: readonly [number, number][], scale = 1) => by((at) => keyed(keys, hourAt(at)) * scale);

  // The sky's colours through its hours.
  const from = moonHour(kind, 0);
  const to = moonHour(kind, 1);
  const keys = useMemo(() => skyKeysFor(from, to), [from, to]);
  const layers = useMemo(() => keys.map((key, index) => skyLayerSvg(frame, key.top, key.low, `${id}k${index}`)), [keys, frame, id]);
  const goesThroughDay = kind === "newMoon" || kind === "ibrahim" || kind === "courses";
  const ground = useMemo(() => groundSvg(frame, scene.id, `${id}g`), [frame, scene.id, id]);
  const groundDark = useMemo(() => {
    const { left, right } = hillPaths(frame);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><path d="${left}" fill="#0B1233"/><path d="${right}" fill="#0B1233"/><rect x="0" y="${frame.horizon}" width="${frame.width}" height="${frame.height - frame.horizon}" fill="#0B1233"/></svg>`;
  }, [frame]);
  const mountains = useMemo(() => (kind === "split" ? mountainsSvg(frame) : ""), [kind, frame]);
  const glow = (side: "east" | "west") =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.width}" height="${frame.height}" viewBox="0 0 ${frame.width} ${frame.height}"><defs><radialGradient id="${id}${side}" cx="${side === "east" ? 0.1 : 0.9}" cy="1" r="0.62"><stop offset="0" stop-color="${side === "east" ? "#FFE3B0" : "#FFB070"}" stop-opacity="0.9"/><stop offset="0.45" stop-color="${side === "east" ? "#F7B9A0" : "#F07A5A"}" stop-opacity="0.35"/><stop offset="1" stop-color="#F07A5A" stop-opacity="0"/></radialGradient></defs><rect width="${frame.width}" height="${frame.horizon}" fill="url(#${id}${side})"/></svg>`;

  // The stars, the fewer on a slow phone.
  const seed = scene.id.length * 11 + 5;
  const stars = Array.from({ length: lite ? 12 : 26 }, (_, index) => ({
    x: Math.round(rand(seed, index) * (frame.width - 8)),
    y: Math.round(4 + rand(seed, index + 40) * ((kind === "months" ? frame.height : frame.horizon) - 26)),
    size: 4 + Math.round(rand(seed, index + 80) * 4),
    shift: rand(seed, index + 120)
  }));

  // The sun, for the skies that go through a day.
  const sunBox = Math.round((frame.sunR * 100) / 19);
  const sunX = by((at) => sunAt(frame, hourAt(at)).x - sunBox / 2);
  const sunY = by((at) => sunAt(frame, hourAt(at)).y - sunBox / 2);

  // The palms, at the east side, so the middle of the sky is clear for the moon and its words.
  const palm = { x: Math.round(frame.width * 0.2), y: Math.round(frame.height - (frame.height - frame.horizon) * 0.16), tall: Math.round((frame.height - frame.horizon) * 0.62 + frame.height * 0.16) };
  const palmWide = Math.round((palm.tall * 60) / 84);
  const small = { x: Math.round(frame.width * 0.88), y: frame.height - 2, tall: Math.round((frame.height - frame.horizon) * 0.5) };
  const smallWide = Math.round((small.tall * 30) / 42);

  const word = (index: number) => {
    const each = layout.words[index];
    const opacity = each.from <= 0 && each.to >= 1 ? 1 : by((at) => shownBetween(at, each.from - (each.from > 0 ? 0.03 : 1), each.from, each.to < 1 ? each.to - 0.03 : 2, each.to < 1 ? each.to : 3));
    return <Word key={each.key} text={each.text} rect={each.rect} opacity={opacity} testID={`moon-word-${each.key}`} />;
  };

  const sky = (
    <>
      {layers.map((xml, index) => (
        <Animated.View
          key={`${scene.id}-${index}`}
          style={[StyleSheet.absoluteFill, index === 0 ? null : { opacity: by((at) => Math.min(1, Math.max(0, (hourAt(at) - keys[index - 1].hour) / (keys[index].hour - keys[index - 1].hour || 1)))) }]}
        >
          <SvgXml xml={xml} width={width} height={height} />
        </Animated.View>
      ))}
      {goesThroughDay ? (
        <>
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: byHour(EAST_GLOW) }]}>
            <SvgXml xml={glow("east")} width={width} height={height} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: byHour(WEST_GLOW) }]}>
            <SvgXml xml={glow("west")} width={width} height={height} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: byHour(DAWN_BAND) }]}>
            <SvgXml xml={dawnBandSvg(frame, `${id}d`)} width={width} height={height} />
          </Animated.View>
        </>
      ) : null}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: byHour(STAR_KEYS) }]}>
        {stars.map((star, index) => (
          <Animated.View
            key={index}
            style={[
              styles.abs,
              {
                left: star.x,
                top: star.y,
                opacity: still || lite ? 0.85 : Animated.modulo(Animated.add(slow, star.shift), 1).interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.95, 0.35, 0.95] })
              }
            ]}
          >
            <SvgXml xml={STAR} width={star.size} height={star.size} />
          </Animated.View>
        ))}
      </Animated.View>
      {kind === "courses" ? <Orbits frame={frame} by={by} /> : null}
      {goesThroughDay ? (
        <Animated.View style={[styles.abs, { left: 0, top: 0, width: sunBox, height: sunBox, opacity: byHour(SUN_KEYS), transform: [{ translateX: sunX }, { translateY: sunY }] }]} testID="moon-sky-sun">
          <SvgXml xml={sunSvg(sunBox, `${id}s`)} width={sunBox} height={sunBox} />
          <Animated.View style={[StyleSheet.absoluteFill, { opacity: by((at) => keyed(SUN_KEYS, hourAt(at)) * keyed(LOW_KEYS, hourAt(at))) }]}>
            <SvgXml xml={LOW_SUN} width={sunBox} height={sunBox} />
          </Animated.View>
        </Animated.View>
      ) : null}
    </>
  );

  // The sand, the hills and the palms, dark at night.
  const sand = (
    <>
      <SvgXml xml={ground} width={width} height={height} style={StyleSheet.absoluteFill} />
      <View style={[styles.abs, { left: small.x - smallWide / 2, top: small.y - small.tall }]}>
        <SvgXml xml={SMALL_PALM} width={smallWide} height={small.tall} />
      </View>
      <View style={[styles.abs, { left: palm.x - palmWide / 2, top: palm.y - palm.tall }]}>
        <SvgXml xml={PALM} width={palmWide} height={palm.tall} />
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: byHour(DARK_KEYS, 0.72) }]}>
          <SvgXml xml={darken(PALM)} width={palmWide} height={palm.tall} />
        </Animated.View>
      </View>
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: byHour(DARK_KEYS, 0.72) }]}>
        <SvgXml xml={groundDark} width={width} height={height} />
      </Animated.View>
    </>
  );

  return (
    <View style={[styles.frame, { width, height }]} pointerEvents="none" testID={testID}>
      {sky}
      {kind === "split" ? <Split frame={frame} by={by} mountains={mountains} width={width} height={height} /> : null}
      {kind === "stages" ? (
        <>
          <Stages frame={frame} by={by} />
          {sand}
        </>
      ) : null}
      {kind === "newMoon" ? (
        <>
          <NewMoon frame={frame} by={by} hourAt={hourAt} />
          {sand}
        </>
      ) : null}
      {kind === "ibrahim" ? (
        <>
          <Ibrahim frame={frame} by={by} />
          {sand}
        </>
      ) : null}
      {kind === "courses" ? (
        <>
          <NightMoon frame={frame} by={by} p={coursesMoonP} testID="moon-sky-moon" />
          {sand}
        </>
      ) : null}
      {kind === "months" ? <Months frame={frame} by={by} month={scene.month} still={still} /> : null}
      {layout.words.map((_, index) => word(index))}
    </View>
  );
}

type By = (fn: (at: number) => number) => Animated.AnimatedInterpolation<number>;
type Frame = ReturnType<typeof moonLayout>["frame"];

/** The full moon over Hira; a line of light down its middle; then its halves, one to each side of the mountain. */
function Split({ frame, by, mountains, width, height }: { frame: Frame; by: By; mountains: string; width: number; height: number }) {
  const at = splitAt(frame);
  const half = at.size / 2;
  const ease = (p: number) => (p <= 0 ? 0 : p >= 1 ? 1 : p * p * (3 - 2 * p));
  const apart = (clock: number) => ease((clock - 0.36) / 0.34);
  const whole = useMemo(() => moonSvg(at.size, 14.77, { shade: 0 }), [at.size]);
  const left = useMemo(() => halfMoonSvg(at.size, "left"), [at.size]);
  const right = useMemo(() => halfMoonSvg(at.size, "right"), [at.size]);
  const crack = Math.round(at.size * 0.68);
  const hira = hiraAt(frame);
  return (
    <>
      <Animated.View style={[styles.abs, { left: at.whole.x - half, top: at.whole.y - half, opacity: by((t) => (t < 0.36 ? 1 : 0)) }]} testID="moon-sky-whole">
        <SvgXml xml={whole} width={at.size} height={at.size} />
      </Animated.View>
      <Animated.View
        style={[styles.abs, styles.crack, { left: at.whole.x - 1, top: at.whole.y - crack / 2, height: crack, opacity: by((t) => shownBetween(t, 0.25, 0.3, 0.34, 0.4)) }]}
        testID="moon-sky-crack"
      />
      {(["left", "right"] as const).map((side) => (
        <Animated.View
          key={side}
          style={[
            styles.abs,
            {
              left: 0,
              top: 0,
              opacity: by((t) => (t < 0.36 ? 0 : 1)),
              transform: [
                { translateX: by((t) => at.whole.x + (at[side].x - at.whole.x) * apart(t) - half) },
                { translateY: by((t) => at.whole.y + (at[side].y - at.whole.y) * apart(t) - half) }
              ]
            }
          ]}
          testID={`moon-sky-half-${side}`}
        >
          <SvgXml xml={side === "left" ? left : right} width={at.size} height={at.size} />
        </Animated.View>
      ))}
      <SvgXml xml={mountains} width={width} height={height} style={StyleSheet.absoluteFill} />
      <View style={[styles.abs, { left: hira.top.x - 2, top: hira.top.y - 2, width: 4, height: 4 }]} testID="moon-sky-hira" />
    </>
  );
}

/** The moon through the month: each night's shape fading into the next. */
function Stages({ frame, by }: { frame: Frame; by: By }) {
  const at = stagesMoonAt(frame);
  const shapes = useMemo(() => STAGE_AGES.map((age) => moonSvg(at.size, age)), [at.size]);
  return (
    <>
      {shapes.map((xml, index) => (
        <Animated.View key={index} style={[styles.abs, { left: at.x - at.size / 2, top: at.y - at.size / 2, opacity: by((t) => stageShown(index, t)) }]} testID={`moon-sky-stage-${index}`}>
          <SvgXml xml={xml} width={at.size} height={at.size} />
        </Animated.View>
      ))}
    </>
  );
}

/** The new moon after sunset: it shows once the sky has darkened, low in the west, and sinks after the sun. */
function NewMoon({ frame, by, hourAt }: { frame: Frame; by: By; hourAt: (at: number) => number }) {
  const end = newMoonAt(frame, hourAt(1));
  const xml = useMemo(() => moonSvg(end.size, 3.4, { shade: 0, tilt: end.tilt }), [end.size, end.tilt]);
  return (
    <Animated.View
      style={[
        styles.abs,
        {
          left: 0,
          top: 0,
          opacity: by((t) => newMoonShown(hourAt(t))),
          transform: [{ translateX: by((t) => newMoonAt(frame, hourAt(t)).x - end.size / 2) }, { translateY: by((t) => newMoonAt(frame, hourAt(t)).y - end.size / 2) }]
        }
      ]}
      testID="moon-sky-new-moon"
    >
      <SvgXml xml={xml} width={end.size} height={end.size} />
    </Animated.View>
  );
}

/** A full moon across the night, from the east to the west (`p` turns the sky's clock into its way across). */
function NightMoon({ frame, by, p, testID }: { frame: Frame; by: By; p: (at: number) => number; testID: string }) {
  const size = nightMoonAt(frame, 0.5).size;
  const xml = useMemo(() => moonSvg(size, 14.77, { shade: 0 }), [size]);
  return (
    <Animated.View
      style={[
        styles.abs,
        {
          left: 0,
          top: 0,
          opacity: by((t) => (p(t) > -0.08 && p(t) < 1.08 ? 1 : 0)),
          transform: [{ translateX: by((t) => nightMoonAt(frame, p(t)).x - size / 2) }, { translateY: by((t) => nightMoonAt(frame, p(t)).y - size / 2) }]
        }
      ]}
      testID={testID}
    >
      <SvgXml xml={xml} width={size} height={size} />
    </Animated.View>
  );
}

/** Each in its orbit: the sun's way across the day, in gold, and the moon's across the night, drawn as each goes. */
function Orbits({ frame, by }: { frame: Frame; by: By }) {
  const ways = useMemo(() => [...orbitDots(frame, "sun").map((dot) => ({ ...dot, body: "sun" as const })), ...orbitDots(frame, "moon").map((dot) => ({ ...dot, body: "moon" as const }))], [frame]);
  return (
    <>
      {ways.map((dot, index) => (
        <Animated.View
          key={index}
          style={[styles.abs, styles.dot, dot.body === "sun" ? styles.sunDot : styles.moonDot, { left: dot.x - 2, top: dot.y - 2, opacity: by((t) => shownBetween(t, dot.at, dot.at + 0.025)) }]}
          testID={`moon-sky-orbit-${dot.body}-${index}`}
        />
      ))}
    </>
  );
}

/** What Ibrahim saw set: the star in the west, then the moon from east to west; the sun is the sky's own. */
function Ibrahim({ frame, by }: { frame: Frame; by: By }) {
  const star = ibrahimStarAt(frame, 0);
  return (
    <>
      <Animated.View
        style={[
          styles.abs,
          {
            left: 0,
            top: 0,
            width: star.size,
            height: star.size,
            opacity: by((t) => shownBetween(t, 0.01, 0.05, 0.29, 0.31)),
            transform: [{ translateX: by((t) => ibrahimStarAt(frame, t).x - star.size / 2) }, { translateY: by((t) => ibrahimStarAt(frame, t).y - star.size / 2) }]
          }
        ]}
        testID="moon-sky-star"
      >
        <SvgXml xml={BRIGHT_STAR} width={star.size} height={star.size} />
      </Animated.View>
      <NightMoon frame={frame} by={by} p={ibrahimMoonP} testID="moon-sky-moon" />
    </>
  );
}

/** The twelve months, lit one by one as the year goes by; the four sacred ones in gold, and the lesson's own month. */
function Months({ frame, by, month, still }: { frame: Frame; by: By; month?: number; still: boolean }) {
  const cells = monthCells(frame);
  const moons = useMemo(() => {
    const size = monthCellLook(cells[0].rect).moon;
    return { size, plain: moonSvg(size, 4.2, { shade: 0.5, tilt: 0 }), full: moonSvg(size, 14.77, { shade: 0 }) };
  }, [cells]);
  return (
    <>
      {cells.map((cell) => {
        const look = monthCellLook(cell.rect);
        const mine = cell.index === month;
        const start = monthAt(cell.index);
        return (
          <Animated.View
            key={cell.index}
            style={[
              styles.abs,
              styles.cell,
              cell.sacred ? styles.cellSacred : null,
              mine ? styles.cellMine : null,
              {
                left: cell.rect.x + look.inset,
                top: cell.rect.y + look.inset,
                width: cell.rect.w - look.inset * 2,
                height: cell.rect.h - look.inset * 2,
                paddingHorizontal: look.padX,
                gap: look.gap,
                opacity: by((t) => (still ? 1 : shownBetween(t, start - 0.05, start + 0.03))),
                transform: [{ scale: by((t) => (mine && t > 0.9 ? 1 + 0.06 * Math.sin(((t - 0.9) / 0.1) * Math.PI) : 1)) }]
              }
            ]}
            testID={`moon-month-${cell.index}${cell.sacred ? "-sacred" : ""}${mine ? "-mine" : ""}`}
          >
            <SvgXml xml={mine ? moons.full : moons.plain} width={moons.size} height={moons.size} />
            <Text
              style={[styles.monthName, { fontSize: look.font, lineHeight: look.line, color: mine ? "#FFFFFF" : cell.sacred ? "#FFE08A" : "#DCE3FF" }]}
              numberOfLines={2}
            >
              {t(cell.name)}
            </Text>
            {cell.sacred ? (
              <View style={styles.goldStar} pointerEvents="none">
                <SvgXml xml={GOLD_STAR} width={10} height={10} />
              </View>
            ) : null}
          </Animated.View>
        );
      })}
    </>
  );
}

const styles = StyleSheet.create({
  frame: { overflow: "hidden", backgroundColor: "#0A1233" },
  abs: { position: "absolute" },
  dot: { width: 4, height: 4, borderRadius: 2 },
  sunDot: { backgroundColor: "#FFD25A" },
  moonDot: { backgroundColor: "#DCE3FF" },
  crack: { width: 2, borderRadius: 1, backgroundColor: "#FFFFFF", shadowColor: "#FFFFFF", shadowOpacity: 0.9, shadowRadius: 6 },
  cell: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "rgba(160,176,255,0.28)",
    backgroundColor: "rgba(20,28,74,0.72)"
  },
  cellSacred: { borderColor: "#E6B847", backgroundColor: "rgba(84,64,20,0.5)" },
  cellMine: { borderColor: "#7BE495", backgroundColor: "rgba(34,120,70,0.62)", borderWidth: 2 },
  monthName: { flex: 1, fontFamily: fonts.bodyHeavy },
  goldStar: { position: "absolute", top: 2, right: 3 },
  wordBox: { position: "absolute", justifyContent: "center" },
  word: {
    borderRadius: 9,
    paddingHorizontal: WORD.padX,
    paddingVertical: WORD.padY,
    backgroundColor: "rgba(16,22,58,0.62)",
    alignItems: "center",
    justifyContent: "center"
  },
  wordText: { fontFamily: fonts.bodyHeavy, fontSize: WORD.font, lineHeight: WORD.line, color: "#FFFFFF" }
});
