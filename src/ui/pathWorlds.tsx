import React, { memo, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Ellipse, G, Path } from "react-native-svg";
import type { PathWorld, PathWorldChoice } from "../services/pathWorldChoice";
import { useScene } from "./sceneMood";

/**
 * The places the Learn path can walk through: the desert (the first look), a beach, a forest, snowy
 * mountains, and the Muslims' camp at Badr (tents, wells, horses, shields and plain banners: nothing
 * about the fighting itself). Each unit of a topic is one place. A strip of that place runs along the
 * bottom of the unit (waves rolling in, a line of pines, snowy peaks, the camp's tents), and the
 * pictures beside the path come from that place.
 */

export type { PathWorld, PathWorldChoice };

/** Topics whose path also visits the camp at Badr. */
const CAMP_TOPICS = new Set(["sahabah"]);

/** The place for a unit: the learner's pick, or on "auto" each unit takes the next place in turn. */
export function worldFor(choice: PathWorldChoice, topicId: string, unitIndex: number): PathWorld {
  if (choice !== "auto") return choice;
  const order: PathWorld[] = CAMP_TOPICS.has(topicId) ? ["desert", "camp", "beach", "forest", "snow"] : ["desert", "beach", "forest", "snow"];
  return order[unitIndex % order.length];
}

/** The pictures beside the path in each place (the desert's come by topic, in PathScenery). */
export const WORLD_ITEMS: Record<Exclude<PathWorld, "desert">, string[]> = {
  beach: ["crab", "sandcastle", "boat", "palm", "shell", "turtle", "rocks"],
  forest: ["pine", "mushroom", "rabbit", "log", "bush", "flowers", "oasis"],
  snow: ["mountain", "goat", "pine", "cave", "rocks", "sheep"],
  camp: ["tent", "horse", "well", "banner", "shield", "palm", "dates"]
};

/** Labels for the Settings picker (translated where shown). */
export const WORLD_LABELS: Record<PathWorldChoice, string> = {
  auto: "Mix",
  desert: "Desert",
  beach: "Beach",
  forest: "Forest",
  snow: "Snow",
  camp: "Badr camp"
};

/** The strip's height, in px, at the bottom of the unit. */
export const BACKDROP_H = 92;

function useLoop(active: boolean, duration: number, delay = 0) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    value.setValue(0);
    if (!active) return undefined;
    // In a sequence: a lone native-driver timing loops natively, which the web preview can't do.
    const loop = Animated.loop(Animated.sequence([Animated.delay(delay), Animated.timing(value, { toValue: 1, duration, easing: Easing.linear, useNativeDriver: true })]));
    loop.start();
    return () => loop.stop();
  }, [active, duration, delay, value]);
  return value;
}

const WAVE = 48;

function wavePath(width: number, y: number, amp: number) {
  let d = `M0 ${y}`;
  for (let x = 0; x < width + WAVE * 2; x += WAVE) d += ` Q${x + WAVE / 4} ${y - amp} ${x + WAVE / 2} ${y} T${x + WAVE} ${y}`;
  return `${d} V${BACKDROP_H} H0Z`;
}

function Beach({ width, moving }: { width: number; moving: boolean }) {
  const roll = useLoop(moving, 2600);
  const roll2 = useLoop(moving, 4200);
  const shore = useLoop(moving, 3200);
  const far = roll.interpolate({ inputRange: [0, 1], outputRange: [0, -WAVE] });
  const near = roll2.interpolate({ inputRange: [0, 1], outputRange: [-WAVE, 0] });
  const foam = shore.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 5, 0] });
  const W = width + WAVE * 2;
  return (
    <>
      <Animated.View style={[styles.layer, { width: W, transform: [{ translateX: far }] }]}>
        <Svg width={W} height={BACKDROP_H}>
          <Path d={wavePath(W, 22, 5)} fill="#7CC8FF" />
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.layer, { width: W, transform: [{ translateX: near }] }]}>
        <Svg width={W} height={BACKDROP_H}>
          <Path d={wavePath(W, 36, 6)} fill="#2FA8FF" />
          {Array.from({ length: Math.ceil(W / WAVE) }, (_, index) => (
            <Path key={index} d={`M${index * WAVE + 8} 38Q${index * WAVE + 14} 34 ${index * WAVE + 20} 38`} stroke="#FFFFFF" strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" fill="none" />
          ))}
        </Svg>
      </Animated.View>
      <Animated.View style={[styles.layer, { transform: [{ translateY: foam }] }]}>
        <Svg width={width} height={BACKDROP_H}>
          <Path d={`M0 58C${width * 0.2} 50 ${width * 0.4} 60 ${width * 0.6} 54C${width * 0.8} 48 ${width * 0.9} 56 ${width} 52V${BACKDROP_H}H0Z`} fill="#FFFFFF" opacity={0.85} />
        </Svg>
      </Animated.View>
      <Svg width={width} height={BACKDROP_H} style={styles.layer}>
        <Path d={`M0 64C${width * 0.2} 56 ${width * 0.4} 66 ${width * 0.6} 60C${width * 0.8} 54 ${width * 0.9} 62 ${width} 58V${BACKDROP_H}H0Z`} fill="#F3D598" />
        <Circle cx={width * 0.15} cy={78} r={2} fill="#FFB3C7" />
        <Circle cx={width * 0.72} cy={82} r={1.6} fill="#FFFFFF" />
        <Ellipse cx={width * 0.45} cy={84} rx={3} ry={1.6} fill="#E2B967" />
      </Svg>
    </>
  );
}

function Forest({ width, moving }: { width: number; moving: boolean }) {
  const sway = useLoop(moving, 5200);
  const fall = useLoop(moving, 6000);
  const fall2 = useLoop(moving, 7400, 1800);
  const lean = sway.interpolate({ inputRange: [0, 0.5, 1], outputRange: ["-1.5deg", "1.5deg", "-1.5deg"] });
  const pines = Math.ceil(width / 34) + 1;
  return (
    <>
      <Svg width={width} height={BACKDROP_H} style={styles.layer}>
        <Path d={`M0 50C${width * 0.25} 34 ${width * 0.5} 44 ${width * 0.7} 36C${width * 0.85} 30 ${width * 0.95} 38 ${width} 36V${BACKDROP_H}H0Z`} fill="#BDE8C9" />
      </Svg>
      <Animated.View style={[styles.layer, { transformOrigin: "bottom", transform: [{ rotate: lean }] }]}>
        <Svg width={width} height={BACKDROP_H}>
          {Array.from({ length: pines }, (_, index) => {
            const x = index * 34 + (index % 2 ? 8 : 0);
            const h = 30 + ((index * 7) % 3) * 8;
            const base = 70;
            return (
              <G key={index}>
                <Path d={`M${x} ${base - h}L${x - 13} ${base}H${x + 13}Z`} fill={index % 2 ? "#2E9E62" : "#178A56"} />
                <Path d={`M${x} ${base - h + 10}L${x - 10} ${base - 8}H${x + 10}Z`} fill={index % 2 ? "#3CB873" : "#21A367"} />
              </G>
            );
          })}
        </Svg>
      </Animated.View>
      <Svg width={width} height={BACKDROP_H} style={styles.layer}>
        <Path d={`M0 74C${width * 0.3} 64 ${width * 0.6} 76 ${width} 68V${BACKDROP_H}H0Z`} fill="#7BC74D" />
        <Circle cx={width * 0.2} cy={80} r={2.4} fill="#FF7FA6" />
        <Circle cx={width * 0.62} cy={84} r={2.2} fill="#FFC21A" />
        <Circle cx={width * 0.85} cy={78} r={2.2} fill="#FFFFFF" />
      </Svg>
      {[fall, fall2].map((clock, index) => (
        <Animated.View
          key={index}
          style={[
            styles.leaf,
            {
              left: width * (0.25 + index * 0.4),
              opacity: clock.interpolate({ inputRange: [0, 0.1, 0.85, 1], outputRange: [0, 1, 1, 0] }),
              transform: [
                { translateY: clock.interpolate({ inputRange: [0, 1], outputRange: [-40, 70] }) },
                { translateX: clock.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 14, 0, 14, 0] }) },
                { rotate: clock.interpolate({ inputRange: [0, 0.5, 1], outputRange: ["-30deg", "40deg", "-30deg"] }) }
              ]
            }
          ]}
        >
          <Svg width={12} height={8} viewBox="0 0 20 12">
            <Path d="M1 6C5 0 15 0 19 6C15 12 5 12 1 6Z" fill={index ? "#FFB020" : "#21B573"} />
          </Svg>
        </Animated.View>
      ))}
    </>
  );
}

const FLAKES = [0.08, 0.24, 0.4, 0.56, 0.72, 0.9];

function Snow({ width, moving }: { width: number; moving: boolean }) {
  const fall = useLoop(moving, 5000);
  return (
    <>
      <Svg width={width} height={BACKDROP_H} style={styles.layer}>
        <Path d={`M0 66L${width * 0.16} 22L${width * 0.3} 50L${width * 0.46} 14L${width * 0.66} 54L${width * 0.8} 28L${width} 60V${BACKDROP_H}H0Z`} fill="#A9B8C8" />
        <Path d={`M${width * 0.16} 22L${width * 0.2} 32L${width * 0.17} 30L${width * 0.13} 34L${width * 0.11} 31Z`} fill="#FFFFFF" />
        <Path d={`M${width * 0.46} 14L${width * 0.51} 26L${width * 0.47} 24L${width * 0.43} 28L${width * 0.4} 24Z`} fill="#FFFFFF" />
        <Path d={`M${width * 0.8} 28L${width * 0.84} 37L${width * 0.81} 35L${width * 0.77} 38L${width * 0.75} 35Z`} fill="#FFFFFF" />
        <Path d={`M0 72C${width * 0.3} 62 ${width * 0.6} 74 ${width} 66V${BACKDROP_H}H0Z`} fill="#F4F8FC" />
        <Path d={`M0 80C${width * 0.4} 74 ${width * 0.7} 84 ${width} 78`} stroke="#DCE6F0" strokeWidth={2} fill="none" />
      </Svg>
      {moving
        ? FLAKES.map((x, index) => {
            // Each flake at its own point of the same fall, so they never all line up.
            const phase = 0.08 + ((index * 0.37) % 0.84);
            const cut = 1 - phase;
            return (
              <Animated.View
                key={x}
                style={[
                  styles.flake,
                  {
                    left: width * x,
                    transform: [
                      { translateY: fall.interpolate({ inputRange: [0, cut, cut + 0.0001, 1], outputRange: [-30 + phase * 110, 80, -30, -30 + phase * 110] }) },
                      { translateX: fall.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, 4, 0, -4, 0] }) }
                    ]
                  }
                ]}
              />
            );
          })
        : null}
    </>
  );
}

function Camp({ width, moving }: { width: number; moving: boolean }) {
  const flap = useLoop(moving, 900);
  const flutter = flap.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 0.7, 1] });
  const tents = [0.12, 0.36, 0.62, 0.86];
  return (
    <>
      <Svg width={width} height={BACKDROP_H} style={styles.layer}>
        <Path d={`M0 54C${width * 0.2} 44 ${width * 0.4} 52 ${width * 0.6} 46C${width * 0.8} 40 ${width * 0.9} 48 ${width} 44V${BACKDROP_H}H0Z`} fill="#F6E3B8" />
        {tents.map((x, index) => (
          <G key={x}>
            <Path d={`M${width * x} ${38 + (index % 2) * 6}L${width * x - 15} ${62 + (index % 2) * 4}H${width * x + 15}Z`} fill={index % 2 ? "#E8A35C" : "#D98E4C"} />
            <Path d={`M${width * x} ${46 + (index % 2) * 6}L${width * x - 4} ${62 + (index % 2) * 4}H${width * x + 4}Z`} fill="#8A4B1E" />
          </G>
        ))}
        <Path d={`M${width * 0.5} 50V26`} stroke="#9A5724" strokeWidth={2} />
        <Path d={`M0 70C${width * 0.3} 60 ${width * 0.6} 72 ${width} 64V${BACKDROP_H}H0Z`} fill="#F3D598" />
        <Ellipse cx={width * 0.24} cy={78} rx={14} ry={4} fill="#B9C4BF" />
        <Ellipse cx={width * 0.24} cy={77} rx={10} ry={2.4} fill="#2FA8FF" />
      </Svg>
      <Animated.View style={[styles.flag, { left: width * 0.5 + 1, transformOrigin: "left", transform: [{ scaleX: flutter }] }]}>
        <Svg width={18} height={11} viewBox="0 0 18 11">
          <Path d="M0 0C6 -1 12 2 18 1V10C12 11 6 8 0 9Z" fill="#21B573" />
        </Svg>
      </Animated.View>
    </>
  );
}

/** The strip of a place along the bottom of a unit. Nothing for the desert, which keeps its old look. */
export const WorldBackdrop = memo(function WorldBackdrop({ world, width, top, moving }: { world: PathWorld; width: number; top: number; moving: boolean }) {
  const { dark } = useScene();
  if (world === "desert" || width <= 0) return null;
  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.strip, { top, width, opacity: dark.interpolate({ inputRange: [0, 1], outputRange: [1, 0.55] }) }]}
      testID={`world-${world}`}
    >
      {world === "beach" ? <Beach width={width} moving={moving} /> : null}
      {world === "forest" ? <Forest width={width} moving={moving} /> : null}
      {world === "snow" ? <Snow width={width} moving={moving} /> : null}
      {world === "camp" ? <Camp width={width} moving={moving} /> : null}
    </Animated.View>
  );
});

/** A ground bit for an empty row, by place: shells on the beach, mushrooms in the forest, snow in the mountains. */
export function WorldTuft({ world, variant, size }: { world: PathWorld; variant: number; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26">
      {world === "beach" ? (
        variant === 0 ? (
          <G>
            <Path d="M13 24L5 17C4 11 8 7 13 7C18 7 22 11 21 17Z" fill="#FFB3C7" />
            <Path d="M13 24L9 9M13 24V7M13 24L17 9" stroke="#F28AA6" strokeWidth={1} />
          </G>
        ) : variant === 1 ? (
          <G>
            <Ellipse cx={9} cy={22} rx={6} ry={3} fill="#E2B967" />
            <Ellipse cx={18} cy={22.6} rx={3.6} ry={2} fill="#FFFFFF" />
          </G>
        ) : (
          <G>
            <Ellipse cx={13} cy={21} rx={7} ry={4} fill="#B9C4BF" />
            <Path d="M9 19.5C10 18.4 11.4 18 13 18" stroke="#FFFFFF" strokeOpacity={0.6} strokeWidth={1.2} strokeLinecap="round" fill="none" />
          </G>
        )
      ) : world === "forest" ? (
        variant === 1 ? (
          <G>
            <Path d="M11 25C11 21 11.5 18 12 16H14C14.5 18 15 21 15 25Z" fill="#FFF3D6" />
            <Path d="M5 17C5 11 9 8 13 8C17 8 21 11 21 17C16 18.4 10 18.4 5 17Z" fill="#FF5A5A" />
            <Circle cx={10} cy={12.6} r={1.6} fill="#FFFFFF" />
            <Circle cx={15.6} cy={12} r={1.3} fill="#FFFFFF" />
          </G>
        ) : (
          <Path d="M5 24C5 18 3 14 1 12M9 24C9 16 10 11 12 7M13 24C14 18 17 14 20 12M17 24C18 20 21 18 24 17" stroke="#178A56" strokeWidth={2.2} strokeLinecap="round" fill="none" />
        )
      ) : world === "snow" ? (
        <G>
          <Ellipse cx={13} cy={22} rx={11} ry={4} fill="#FFFFFF" />
          <Ellipse cx={9} cy={20} rx={5} ry={3} fill="#F4F8FC" />
        </G>
      ) : (
        <G>
          <Ellipse cx={8} cy={21} rx={6} ry={4} fill="#B9C4BF" />
          <Ellipse cx={18} cy={22} rx={4.4} ry={3} fill="#93A29B" />
        </G>
      )}
    </Svg>
  );
}

const styles = StyleSheet.create({
  strip: {
    position: "absolute",
    left: 0,
    height: BACKDROP_H,
    overflow: "hidden"
  },
  layer: {
    position: "absolute",
    left: 0,
    top: 0,
    height: BACKDROP_H
  },
  leaf: {
    position: "absolute",
    top: 10
  },
  flake: {
    position: "absolute",
    top: 0,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#C9D9E8"
  },
  flag: {
    position: "absolute",
    top: 26
  }
});
