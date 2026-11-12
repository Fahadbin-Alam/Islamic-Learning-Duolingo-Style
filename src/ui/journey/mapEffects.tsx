import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";
import type { MapEffect } from "../../data/seerahMap";
import type { Pt } from "./mapGeometry";

/**
 * The small moving touches on a Seerah map, each from its lesson's source: the rain before Badr (Quran 8:11), the wind
 * on the armies at the Trench (Quran 33:9) and at Tabuk, the camp fires at Marr az-Zahran, the cloud that shaded him ﷺ
 * at Qarn ath-Tha'alib, the night of the Isra, the call and the news going out (rings), the way up from Al-Aqsa (a
 * column of light), and the tents of the camps. On the Hajj maps: the sun going down at Arafah, and the seven small
 * pebbles falling at the Jamrah (Sahih Muslim 1218). Only weather, light and things: never anyone.
 *
 * Every one runs on the native driver from one looping value; with reduce motion (or Calm mode) it stands still, and on
 * a slow phone (lite motion) it keeps fewer drops, streaks, flames, rings and sparks.
 */

/** A value that runs from 0 to 1 again and again, `ms` each time, while the effect is shown. */
function useLoop(ms: number, still: boolean) {
  const value = useRef(new Animated.Value(still ? 0.35 : 0)).current;
  useEffect(() => {
    if (still) return undefined;
    // A lone looping timing does not run on the web; inside a sequence it does.
    const loop = Animated.loop(Animated.sequence([Animated.timing(value, { toValue: 1, duration: ms, easing: Easing.linear, useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [ms, still, value]);
  return value;
}

/** On a slow phone a touch keeps only every other piece. */
const fewer = <T,>(items: T[], lite: boolean) => (lite ? items.filter((_, index) => index % 2 === 0) : items);

/** The loop moved on by `shift` (0 to 1), so several drops or rings run out of step. */
const phase = (value: Animated.Value, shift: number) => Animated.modulo(Animated.add(value, shift), 1);

const CLOUD = `<svg xmlns="http://www.w3.org/2000/svg" width="54" height="30" viewBox="0 0 54 30"><path d="M12 27h31a9 9 0 0 0 1-18 12 12 0 0 0-22-3 9 9 0 0 0-11 9 8 8 0 0 0 1 12Z" fill="#FFFFFF" stroke="#C9D6DE" stroke-width="1.4"/><path d="M14 23h28" stroke="#E3ECF1" stroke-width="2" stroke-linecap="round"/></svg>`;
const GREY_CLOUD = CLOUD.replace("#FFFFFF", "#EEF2F5").replace("#C9D6DE", "#A9B8C2");
const FLAME = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14"><path d="M5 0C6 4 10 5 10 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3C3 5 4 2 5 0Z" fill="#FF7A1A"/><path d="M5 6c1 2 3 3 3 5a3 3 0 0 1-6 0c0-1 1-2 1-2 0 1 1 2 2 2C4 9 4 7 5 6Z" fill="#FFD23F"/></svg>`;
const STREAK = `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="12" viewBox="0 0 46 12"><path d="M2 8q10 -7 21 -2t21 -2" stroke="#FFFFFF" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
const TENT = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14"><path d="M1 13L9 1l8 12Z" fill="#F4ECDC" stroke="#8C7558" stroke-width="1.2" stroke-linejoin="round"/><path d="M9 1v12" stroke="#8C7558" stroke-width="1"/><path d="M7 13l2-5 2 5Z" fill="#6B5640"/></svg>`;
const SPARK = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"><path d="M5 0l1.2 3.8L10 5 6.2 6.2 5 10 3.8 6.2 0 5l3.8-1.2Z" fill="#FFF3B0"/></svg>`;

function Rain({ at, still, lite }: { at: Pt; still: boolean; lite: boolean }) {
  const loop = useLoop(900, still);
  const drops = fewer([-20, -12, -5, 2, 9, 16, 23, -16, 5, 19], lite);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 30, top: at.y - 44, width: 60, height: 56 }]} testID="map-rain">
      {drops.map((dx, index) => {
        const value = phase(loop, (index * 0.37) % 1);
        return (
          <Animated.View
            key={index}
            style={[
              styles.drop,
              {
                left: 30 + dx,
                opacity: value.interpolate({ inputRange: [0, 0.15, 0.8, 1], outputRange: [0, 0.9, 0.9, 0] }),
                transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [14, 50] }) }, { rotate: "12deg" }]
              }
            ]}
          />
        );
      })}
      <View style={[styles.abs, { left: 3, top: 0 }]}>
        <SvgXml xml={GREY_CLOUD} width={54} height={30} />
      </View>
    </View>
  );
}

function Wind({ at, still, lite }: { at: Pt; still: boolean; lite: boolean }) {
  const loop = useLoop(1500, still);
  const rows = fewer([-18, -4, 10, 22], lite);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 70, top: at.y - 30, width: 140, height: 60 }]} testID="map-wind">
      {rows.map((dy, index) => {
        const value = phase(loop, index * 0.27);
        return (
          <Animated.View
            key={index}
            style={[
              styles.abs,
              {
                top: 30 + dy,
                left: 0,
                opacity: value.interpolate({ inputRange: [0, 0.2, 0.75, 1], outputRange: [0, 0.95, 0.95, 0] }),
                transform: [{ translateX: value.interpolate({ inputRange: [0, 1], outputRange: [-6 + index * 4, 96 + index * 4] }) }]
              }
            ]}
          >
            <SvgXml xml={STREAK} width={46} height={12} />
          </Animated.View>
        );
      })}
    </View>
  );
}

function Fires({ at, still, lite }: { at: Pt; still: boolean; lite: boolean }) {
  const loop = useLoop(700, still);
  const spots = fewer([
    [-22, 6],
    [-12, -10],
    [-2, 12],
    [8, -4],
    [18, 8],
    [26, -12],
    [-28, -6],
    [12, 18],
    [-14, 20]
  ], lite);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 36, top: at.y - 30, width: 72, height: 60 }]} testID="map-fires">
      {spots.map(([dx, dy], index) => {
        const value = phase(loop, (index * 0.41) % 1);
        return (
          <Animated.View
            key={index}
            style={[
              styles.abs,
              {
                left: 36 + dx - 5,
                top: 30 + dy - 7,
                opacity: value.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.75, 1, 0.75] }),
                transform: [{ scale: value.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.82, 1.12, 0.82] }) }]
              }
            ]}
          >
            <View style={styles.fireGlow} />
            <SvgXml xml={FLAME} width={10} height={14} />
          </Animated.View>
        );
      })}
    </View>
  );
}

function Ripple({ at, still, lite, color }: { at: Pt; still: boolean; lite: boolean; color: string }) {
  const loop = useLoop(2400, still);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 40, top: at.y - 40, width: 80, height: 80 }]} testID="map-ripple">
      {(lite ? [0, 1 / 2] : [0, 1 / 3, 2 / 3]).map((shift) => {
        const value = phase(loop, shift);
        return (
          <Animated.View
            key={shift}
            style={[
              styles.ring,
              {
                borderColor: color,
                opacity: value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0.75, 0] }),
                transform: [{ scale: value.interpolate({ inputRange: [0, 1], outputRange: [0.35, 2.2] }) }]
              }
            ]}
          />
        );
      })}
    </View>
  );
}

function Cloud({ at, still }: { at: Pt; still: boolean }) {
  const loop = useLoop(3200, still);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 30, top: at.y - 36, width: 60, height: 50 }]} testID="map-cloud">
      <View style={styles.shade} />
      <Animated.View style={[styles.abs, { left: 3, top: 0, transform: [{ translateX: loop.interpolate({ inputRange: [0, 0.5, 1], outputRange: [-3, 3, -3] }) }] }]}>
        <SvgXml xml={CLOUD} width={54} height={30} />
      </Animated.View>
    </View>
  );
}

function Rise({ at, still, lite }: { at: Pt; still: boolean; lite: boolean }) {
  const loop = useLoop(2200, still);
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 16, top: at.y - 70, width: 32, height: 68 }]} testID="map-rise">
      <View style={styles.beam} />
      {fewer([0, 0.2, 0.4, 0.6, 0.8], lite).map((shift, index) => {
        const value = phase(loop, shift);
        return (
          <Animated.View
            key={shift}
            style={[
              styles.abs,
              {
                left: 11 + (index % 2 === 0 ? -5 : 5),
                top: 0,
                opacity: value.interpolate({ inputRange: [0, 0.15, 0.7, 1], outputRange: [0, 1, 0.8, 0] }),
                transform: [{ translateY: value.interpolate({ inputRange: [0, 1], outputRange: [56, 0] }) }, { scale: value.interpolate({ inputRange: [0, 1], outputRange: [1, 0.6] }) }]
              }
            ]}
          >
            <SvgXml xml={SPARK} width={10} height={10} />
          </Animated.View>
        );
      })}
    </View>
  );
}

function Tents({ at }: { at: Pt }) {
  const spots = [
    [-12, 2],
    [2, -6],
    [12, 4],
    [-2, 8]
  ];
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 22, top: at.y - 16, width: 44, height: 32 }]} testID="map-tents">
      {spots.map(([dx, dy], index) => (
        <View key={index} style={[styles.abs, { left: 22 + dx - 9, top: 16 + dy - 7 }]}>
          <SvgXml xml={TENT} width={18} height={14} />
        </View>
      ))}
    </View>
  );
}

const SUN = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34"><circle cx="17" cy="17" r="16" fill="#FFB347" opacity="0.28"/><circle cx="17" cy="17" r="11" fill="#FF9A3C" opacity="0.45"/><circle cx="17" cy="17" r="7.5" fill="#FFC94A" stroke="#FF8A2A" stroke-width="1.2"/></svg>`;

/**
 * The sun going down at the end of the day of Arafah (he ﷺ stood "till the sun set... and the disc of the sun had
 * disappeared", Sahih Muslim 1218a): the land turns warm and the sun sinks behind the hills at `at`, again and again.
 */
function Sunset({ at, still }: { at: Pt; still: boolean }) {
  const loop = useLoop(5200, still);
  return (
    <>
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.warm]} />
      <View pointerEvents="none" style={[styles.abs, styles.horizon, { left: at.x - 24, top: at.y - 46, width: 48, height: 46 }]} testID="map-sunset">
        <Animated.View
          style={[
            styles.abs,
            {
              left: 7,
              top: 0,
              opacity: still ? 1 : loop.interpolate({ inputRange: [0, 0.08, 0.86, 1], outputRange: [0, 1, 1, 0] }),
              transform: [{ translateY: still ? 26 : loop.interpolate({ inputRange: [0, 1], outputRange: [2, 44] }) }]
            }
          ]}
        >
          <SvgXml xml={SUN} width={34} height={34} />
        </Animated.View>
      </View>
      <View pointerEvents="none" style={[styles.abs, styles.horizonLine, { left: at.x - 30, top: at.y - 1, width: 60 }]} />
    </>
  );
}

/** Seven small pebbles, one after another, at the Jamrah (Sahih Muslim 1218a, Sahih al-Bukhari 1751). */
function Pebbles({ at, still, lite }: { at: Pt; still: boolean; lite: boolean }) {
  const loop = useLoop(4200, still);
  const spots = [-5, 3, -2, 6, -6, 1, 4];
  return (
    <View pointerEvents="none" style={[styles.abs, { left: at.x - 20, top: at.y - 40, width: 40, height: 48 }]} testID="map-pebbles">
      {fewer(spots, lite).map((dx, index, all) => {
        if (still) return <View key={index} style={[styles.pebble, { left: 20 + dx * 1.3 - 2.5, top: 40 + (index % 2) * 3 }]} />;
        const value = phase(loop, index / all.length);
        return (
          <Animated.View
            key={index}
            style={[
              styles.pebble,
              {
                left: 20 + dx - 2.5,
                top: 0,
                opacity: value.interpolate({ inputRange: [0, 0.04, 0.3, 0.42, 1], outputRange: [0, 1, 1, 0, 0] }),
                transform: [{ translateY: value.interpolate({ inputRange: [0, 0.22, 1], outputRange: [2, 36, 36], extrapolate: "clamp" }) }]
              }
            ]}
          />
        );
      })}
    </View>
  );
}

/** The night over the whole map (the Isra). */
export function Night({ still }: { still: boolean }) {
  const shown = useRef(new Animated.Value(still ? 1 : 0)).current;
  useEffect(() => {
    if (still) return undefined;
    const fade = Animated.timing(shown, { toValue: 1, duration: 900, easing: Easing.out(Easing.quad), useNativeDriver: true });
    fade.start();
    return () => fade.stop();
  }, [shown, still]);
  return <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.night, { opacity: shown }]} />;
}

/** One effect at its point (the night is drawn by Night). `lite`: a slow phone, so fewer moving pieces. */
export function MapTouch({ kind, at, still, lite = false, color }: { kind: MapEffect["kind"]; at: Pt; still: boolean; lite?: boolean; color: string }) {
  switch (kind) {
    case "rain":
      return <Rain at={at} still={still} lite={lite} />;
    case "wind":
      return <Wind at={at} still={still} lite={lite} />;
    case "fires":
      return <Fires at={at} still={still} lite={lite} />;
    case "ripple":
      return <Ripple at={at} still={still} lite={lite} color={color} />;
    case "cloud":
      return <Cloud at={at} still={still} />;
    case "rise":
      return <Rise at={at} still={still} lite={lite} />;
    case "tents":
      return <Tents at={at} />;
    case "sunset":
      return <Sunset at={at} still={still} />;
    case "pebbles":
      return <Pebbles at={at} still={still} lite={lite} />;
    default:
      return null;
  }
}

const styles = StyleSheet.create({
  abs: { position: "absolute" },
  drop: { position: "absolute", top: 0, width: 2, height: 8, borderRadius: 1, backgroundColor: "#3D8FD1" },
  fireGlow: { position: "absolute", left: -5, top: -2, width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(255,170,60,0.28)" },
  ring: { position: "absolute", left: 22, top: 22, width: 36, height: 36, borderRadius: 18, borderWidth: 2.5 },
  shade: { position: "absolute", left: 10, top: 38, width: 40, height: 11, borderRadius: 6, backgroundColor: "rgba(70,50,30,0.2)" },
  beam: { position: "absolute", left: 11, top: 4, width: 10, height: 64, borderRadius: 5, backgroundColor: "rgba(255,240,170,0.42)" },
  night: { backgroundColor: "rgba(18,26,64,0.46)" },
  warm: { backgroundColor: "rgba(255,130,50,0.14)" },
  horizon: { overflow: "hidden" },
  horizonLine: { height: 2, borderRadius: 1, backgroundColor: "rgba(150,90,40,0.35)" },
  pebble: { position: "absolute", width: 5, height: 5, borderRadius: 2.5, backgroundColor: "#857B6E", borderWidth: 1, borderColor: "#FFFFFF" }
});
