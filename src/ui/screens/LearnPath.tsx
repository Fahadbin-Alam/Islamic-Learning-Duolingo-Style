import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type StyleProp,
  type ViewStyle
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { ArabicTerm } from "../../data/arabicTerms";
import { monetizationMode } from "../../services/monetizationConfig";
import type { LearningNodeView } from "../../types";
import { ArabicText, withHonorifics } from "../ArabicText";
import { noBreakHyphens } from "../lesson/lessonText";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Camel } from "../Camel";
import { Mascot } from "../Mascot";
import { PathScenery, sceneryFor, type SceneryKind } from "../PathScenery";
import { PopIn, useShake } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { SpeechBubble } from "../SpeechBubble";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, text, withAlpha } from "../theme";

export type PathChest = { id: string; gemsReward: number; unlocked: boolean; claimed: boolean };

export type PathItem =
  | {
      kind: "node";
      node: LearningNodeView;
      arabic?: ArabicTerm;
      /** Position across the whole topic. Kept for callers; the card shows the place inside the unit. */
      lessonNumber: number;
      /** Optional 0..1 progress inside the current node, drawn as the ring. */
      progress?: number;
    }
  | { kind: "chest"; chest: PathChest };

export interface PathUnit {
  id: string;
  number: number;
  title: string;
  arabic?: ArabicTerm;
  done: number;
  total: number;
  /** Unit needs Premium: nodes look locked and the card offers UNLOCK. */
  premiumLocked?: boolean;
  /**
   * Its circles still to play make a fair test-out: the banner key (current unit only) and the
   * JUMP HERE button on its locked circles open "Jump ahead?". Default: true for the unit of the
   * circle to play next, false for the others.
   */
  canTestOut?: boolean;
  items: PathItem[];
}

export type LearnPathProps = {
  /** Topic color. */
  accent: string;
  topicId: string;
  /** "hijabi" | "muslim_man" */
  mascotVariant: string;
  units: PathUnit[];
  xpForNode: (node: LearningNodeView) => number;
  onStartNode: (node: LearningNodeView) => void;
  onClaimChest: (chest: PathChest) => void;
  /**
   * Test out of a unit. The current unit's banner key and JUMP HERE on a locked circle (units with
   * canTestOut, or the circles in jumpNodeIds) ask "Jump ahead?" first, then call this on START TEST.
   * From JUMP HERE it also gets the tapped circle; from the banner key, no circle.
   */
  onTestOut?: (unitId: string, nodeId?: string) => void;
  /**
   * The locked circles a test can open (getJumpNodeIds). When given, JUMP HERE shows on these only;
   * otherwise on every locked circle of a unit with canTestOut.
   */
  jumpNodeIds?: ReadonlySet<string>;
  /**
   * The "Jump ahead?" sheet's goal for a unit (and the JUMP HERE circle): its question count and pass mark, so the
   * sheet says "Get 8 of 10 right. 3 misses end it." before the test starts. Undefined: the sheet says just its line.
   */
  testOutGoal?: (unitId: string, nodeId?: string) => { total: number; passingScore: number } | undefined;
  /**
   * The circle to play next: START, the ring and the mascot sit on it, and the path scrolls to it. Used while it is
   * open (current or available) outside a premium unit; otherwise, and by default, the first "current" circle.
   */
  currentNodeId?: string;
  /** Tap the Premium pill or the UNLOCK button of a premium-locked unit. */
  onPremium?: (unitId: string) => void;
  /**
   * Premium can be bought in this build. When false (purchases off, e.g. on web) a premium circle's
   * card says why it is locked and shows no UNLOCK. Default: the monetization mode is not "disabled".
   */
  canBuyPremium?: boolean;
  /** The button under the end-of-topic trophy. Usually opens the topic picker. */
  onNextTopic?: () => void;
  /** Optional content rendered above the first unit. */
  header?: React.ReactNode;
  /** Open this node's card on mount (gallery and tests). */
  initialOpenNodeId?: string;
  /** Scroll to this node or chest id on mount instead of the current node. */
  initialFocusId?: string;
  /** Extra bottom padding under the end-of-topic trophy. Default 32. */
  bottomPadding?: number;
};

// ---------- geometry ----------

const OFFSETS = [0, 48, 72, 48, 0, -48, -72, -48];
const NODE = 72;
const NODE_LIP = 7;
const RING = 96;
const ROW_H = 98;
const CURRENT_EXTRA = 46;
const CHEST = 68;
const MASCOT_SIZE = 84;
const MASCOT_W = MASCOT_SIZE;
const MASCOT_H = Math.round((MASCOT_SIZE * 7) / 6);
const DECOR_SIZE = 64;
const SCENERY_EVERY = 4;
const CAMEL_SIZE = 72;
const CAMEL_H = Math.round((CAMEL_SIZE * 100) / 120);
/** Farthest the camel walks back and forth, in px. */
const CAMEL_WALK = 56;
const CARD_ESTIMATE = 220;
/** Card top inside its row, below the node. */
const CARD_GAP = NODE + NODE_LIP + 4;
const UNIT_PAD = 16;
/**
 * Smallest sticky banner block (pill plus its white margins, one-line title). Used until a unit's
 * sticky banner has measured itself: a low guess never lets the real banner peek out under it.
 */
const STICKY_MIN = 64;
const END_NODE = 88;
const END_LIP = 8;
const HINT_MS = 1600;

function offsetFor(index: number) {
  return OFFSETS[index % OFFSETS.length];
}

// ---------- unit colors ----------

function hueOf(hex: string) {
  const raw = hex.replace("#", "");
  const full = raw.length === 3 ? raw.split("").map((c) => c + c).join("") : raw.slice(0, 6);
  const value = /^[0-9a-fA-F]{6}$/.test(full) ? full : colors.green.slice(1);
  const parsed = Number.parseInt(value, 16);
  const r = ((parsed >> 16) & 255) / 255;
  const g = ((parsed >> 8) & 255) / 255;
  const b = (parsed & 255) / 255;
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  if (delta === 0) return 0;
  const h = max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return (h * 60 + 360) % 360;
}

function hueDistance(a: number, b: number) {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

/** Curated unit tints (teal, purple, orange, pink, blue). Units 2-4 take the first three not close to the accent. */
const UNIT_TINTS = ["#14A6A6", "#8B5CF6", "#E07B12", "#E8557A", "#2F8FE0"];

export function unitColors(accent: string): string[] {
  const accentHue = hueOf(accent);
  const picks = UNIT_TINTS.filter((tint) => hueDistance(hueOf(tint), accentHue) >= 45).slice(0, 3);
  return [accent, ...picks];
}

// ---------- small animated pieces ----------

function useLoop(make: (value: Animated.Value) => Animated.CompositeAnimation, active = true) {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) {
      value.setValue(0);
      return undefined;
    }
    const loop = Animated.loop(make(value));
    loop.start();
    return () => loop.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, value]);
  return value;
}

function pingPong(value: Animated.Value, duration: number, delay = 0) {
  return Animated.sequence([
    Animated.timing(value, { toValue: 1, duration, delay, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
    Animated.timing(value, { toValue: 0, duration, easing: Easing.inOut(Easing.quad), useNativeDriver: true })
  ]);
}

function ProgressRing({ color, track, progress }: { color: string; track: string; progress: number }) {
  const target = Math.min(1, Math.max(0, progress));
  const [shown, setShown] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const id = anim.addListener(({ value }) => setShown(value));
    const timing = Animated.timing(anim, { toValue: target, duration: 900, delay: 250, easing: Easing.out(Easing.cubic), useNativeDriver: false });
    timing.start();
    return () => {
      timing.stop();
      anim.removeListener(id);
    };
  }, [anim, target]);

  const stroke = 7;
  const radius = (RING - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return (
    <Svg width={RING} height={RING} style={styles.ring} pointerEvents="none">
      <Circle cx={RING / 2} cy={RING / 2} r={radius} stroke={track} strokeWidth={stroke} fill="none" />
      {shown > 0.001 ? (
        <Circle
          cx={RING / 2}
          cy={RING / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - shown)}
          transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
        />
      ) : null}
    </Svg>
  );
}

function StartTag({ color }: { color: string }) {
  const bounce = useLoop((value) => pingPong(value, 520));
  const translateY = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
  return (
    <Animated.View style={[styles.tagWrap, { transform: [{ translateY }] }]} pointerEvents="none">
      <View style={styles.tag}>
        <Text style={[styles.tagText, { color }]}>START</Text>
      </View>
      <View style={styles.tagTail} />
    </Animated.View>
  );
}

function Sparkle({ delay, style }: { delay: number; style: StyleProp<ViewStyle> }) {
  const twinkle = useLoop((value) => pingPong(value, 600, delay));
  const scale = twinkle.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1.1] });
  const opacity = twinkle.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] });
  return (
    <Animated.View style={[styles.sparkle, style, { opacity, transform: [{ scale }] }]} pointerEvents="none">
      <Icon name="sparkle" size={18} />
    </Animated.View>
  );
}

// ---------- node ----------

type NodeLook = { face: string; lip: string; icon: IconName; iconColor: string; iconDetail?: string };

const LOCKED_ICON = darken(colors.lockedLip, 0.12);
/** Dark brown label on gold, as in the kit's gold GameButton. */
const GOLD_INK = darken(colors.goldLip, 0.52);

function nodeLook(node: LearningNodeView, color: string, unitDone: boolean, premium: boolean): NodeLook {
  const kindIcon: IconName = node.kind === "review" ? "trophy" : node.kind === "story" ? "book" : "star";
  if (premium && node.status !== "completed") {
    return { face: colors.locked, lip: colors.lockedLip, icon: "lock", iconColor: LOCKED_ICON };
  }
  switch (node.status) {
    case "completed":
      return { face: colors.gold, lip: colors.goldLip, icon: unitDone ? "crown" : "check", iconColor: colors.white };
    case "locked":
      return { face: colors.locked, lip: colors.lockedLip, icon: node.kind === "skill" ? "lock" : kindIcon, iconColor: LOCKED_ICON };
    default: {
      const lip = darken(color, 0.22);
      // A white book or trophy keeps its spine and pages in the lip color; the star stays plain white.
      return { face: color, lip, icon: kindIcon, iconColor: colors.white, iconDetail: kindIcon === "star" ? undefined : lip };
    }
  }
}

/**
 * Path node: a round face on a darker lip that sinks into the lip on press, like the kit's
 * GameButton. Tappable only scales, so like GameButton this is built on Pressable and plays
 * the kit feedback (`node_tap` and a medium haptic) itself.
 */
function PathNode({
  node,
  color,
  unitDone,
  premium,
  current,
  progress,
  onPress
}: {
  node: LearningNodeView;
  color: string;
  unitDone: boolean;
  premium: boolean;
  current: boolean;
  progress?: number;
  onPress: () => void;
}) {
  const look = nodeLook(node, color, unitDone, premium);
  const press = useRef(new Animated.Value(0)).current;
  const translateY = press.interpolate({ inputRange: [0, 1], outputRange: [0, NODE_LIP] });

  return (
    <View style={styles.nodeBox}>
      {current ? <ProgressRing color={color} track={lighten(color, 0.78)} progress={progress ?? 0} /> : null}
      <Pressable
        onPress={() => {
          feedback("node_tap", "medium");
          onPress();
        }}
        onPressIn={() => Animated.timing(press, { toValue: 1, duration: 60, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(press, { toValue: 0, friction: 5, tension: 260, useNativeDriver: true }).start()}
        accessibilityRole="button"
        accessibilityLabel={`${node.title}, ${premium ? "premium" : current ? "start" : node.status}`}
        testID={`path-node-${node.id}`}
        style={styles.nodeHit}
      >
        <View style={[styles.nodeLip, { backgroundColor: look.lip }]} pointerEvents="none" />
        <Animated.View style={[styles.nodeFace, { backgroundColor: look.face, transform: [{ translateY }] }]} pointerEvents="none">
          <View style={styles.nodeShine} />
          <Icon name={look.icon} size={34} color={look.iconColor} detailColor={look.iconDetail} />
        </Animated.View>
      </Pressable>
    </View>
  );
}

// ---------- hint bubble ----------

type Hint = { icon: IconName; label: string };

/** A two-word bubble that pops up over a path item for a moment. Each tap re-pops it. */
function useHint() {
  const [hint, setHint] = useState<(Hint & { seq: number }) | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const show = useCallback((next: Hint) => {
    clearTimeout(timer.current);
    setHint((previous) => ({ ...next, seq: (previous?.seq ?? 0) + 1 }));
    timer.current = setTimeout(() => setHint(undefined), HINT_MS);
  }, []);
  return { hint, show };
}

function HintBubble({ hint, bottom }: { hint?: Hint & { seq: number }; bottom: number }) {
  if (!hint) return null;
  return (
    <View style={[styles.hintSlot, { bottom }]} pointerEvents="none">
      <PopIn key={hint.seq} style={styles.hintPop}>
        <View style={styles.hint} testID="path-hint">
          <Icon name={hint.icon} size={18} color={hint.icon === "lock" ? colors.inkSoft : undefined} />
          <Text style={styles.hintText} numberOfLines={1}>
            {hint.label}
          </Text>
        </View>
        <View style={styles.hintTail} />
      </PopIn>
    </View>
  );
}

// ---------- chest ----------

function PathChestView({ chest, onClaim }: { chest: PathChest; onClaim: () => void }) {
  const ready = chest.unlocked && !chest.claimed;
  const wiggle = useLoop(
    (value) =>
      Animated.sequence([
        Animated.timing(value, { toValue: 1, duration: 90, useNativeDriver: true }),
        Animated.timing(value, { toValue: -1, duration: 140, useNativeDriver: true }),
        Animated.timing(value, { toValue: 0.6, duration: 120, useNativeDriver: true }),
        Animated.timing(value, { toValue: 0, duration: 100, useNativeDriver: true }),
        Animated.delay(1300)
      ]),
    ready
  );
  const rotate = wiggle.interpolate({ inputRange: [-1, 1], outputRange: ["-9deg", "9deg"] });
  const { style: shakeStyle, shake } = useShake(6);
  const bounce = useRef(new Animated.Value(1)).current;
  const { hint, show } = useHint();

  // A locked chest shakes "not yet"; an opened one hops. Neither calls onClaim.
  const nudge = () => {
    if (chest.claimed) {
      bounce.setValue(1);
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1.12, duration: 110, useNativeDriver: true }),
        Animated.spring(bounce, { toValue: 1, friction: 4, tension: 220, useNativeDriver: true })
      ]).start();
      show({ icon: "check", label: "Opened!" });
    } else {
      shake();
      show({ icon: "lock", label: "Keep going!" });
    }
  };

  return (
    <View style={styles.chestBox}>
      {ready ? (
        <>
          <Sparkle delay={0} style={styles.sparkleA} />
          <Sparkle delay={350} style={styles.sparkleB} />
          <Sparkle delay={700} style={styles.sparkleC} />
        </>
      ) : null}
      <Tappable
        onPress={ready ? onClaim : nudge}
        sound={ready ? "reward_chest" : "soft_ui"}
        hapticKind={ready ? "success" : "light"}
        pressScale={0.9}
        accessibilityLabel={ready ? `Open chest, ${chest.gemsReward} gems` : chest.claimed ? "Opened chest" : "Locked chest"}
        testID={`path-chest-${chest.id}`}
      >
        <Animated.View style={shakeStyle}>
          <Animated.View style={[styles.chestArt, { transform: [{ scale: bounce }] }]}>
            <View style={styles.groundShadow} />
            <Animated.View style={[{ transform: [{ rotate }] }, ready ? null : chest.claimed ? styles.chestClaimed : styles.chestLocked]}>
              <Icon name={chest.claimed ? "chestOpen" : "chest"} size={CHEST} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
        {ready ? (
          <View style={styles.rewardPill} pointerEvents="none">
            <Icon name="gem" size={14} />
            <Text style={styles.rewardText}>{`+${chest.gemsReward}`}</Text>
          </View>
        ) : null}
      </Tappable>
      <HintBubble hint={hint} bottom={RING - 12} />
    </View>
  );
}

// ---------- node card ----------

function NodeCard({
  item,
  color,
  arrowX,
  xp,
  place,
  count,
  premium,
  narrow,
  canBuyPremium,
  onStart,
  onPremium,
  onJump,
  onCardLayout
}: {
  item: Extract<PathItem, { kind: "node" }>;
  color: string;
  arrowX: number;
  xp: number;
  place: number;
  count: number;
  premium: boolean;
  /** Under 360 px wide: long Arabic drops a size so the card fits above the tabs. */
  narrow: boolean;
  canBuyPremium: boolean;
  onStart: () => void;
  onPremium?: () => void;
  /** A locked circle whose unit can be tested out: JUMP HERE asks "Jump ahead?" for the unit. */
  onJump?: () => void;
  onCardLayout: (height: number) => void;
}) {
  const { node, arabic } = item;
  const grey = premium || node.status === "locked";
  const face = grey ? colors.locked : color;
  const lipColor = grey ? colors.lockedLip : darken(color, 0.22);
  const ink = grey ? colors.ink : colors.white;
  const arabicSize = narrow && arabic && arabic.ar.length > 16 ? 24 : 28;
  // The card is its own responder, so touches on it never reach the path's tap-to-close handler.
  const swallow = () => true;
  const ignore = () => undefined;

  let action: React.ReactNode;
  if (premium && onPremium && canBuyPremium) {
    action = <GameButton label="Unlock" icon="crown" variant="gold" fullWidth onPress={onPremium} style={styles.cardButton} testID="node-card-unlock" />;
  } else if (grey) {
    // Why it is locked, in a few words, and a way forward when the unit can be tested out.
    action = (
      <>
        <View style={styles.lockedRow} testID="node-card-locked">
          <Icon name={premium ? "crown" : "lock"} size={22} color={premium ? undefined : colors.inkSoft} />
          <Text style={styles.lockedText}>{premium ? "Premium lesson" : "Finish the one before it!"}</Text>
        </View>
        {onJump ? (
          <GameButton label="Jump here" icon="key" variant="white" color={colors.gemLip} fullWidth onPress={onJump} style={styles.cardButton} testID="node-card-jump" />
        ) : null}
      </>
    );
  } else {
    action = (
      <GameButton
        // A finished circle pays nothing again, so its button says just PRACTICE.
        label={xp > 0 ? `${node.status === "completed" ? "Practice" : "Start"} +${xp} XP` : node.status === "completed" ? "Practice" : "Start"}
        variant="white"
        color={color}
        fullWidth
        onPress={onStart}
        style={styles.cardButton}
        testID="node-card-start"
      />
    );
  }

  return (
    <PopIn from="down" style={styles.cardWrap}>
      <View onLayout={(event) => onCardLayout(event.nativeEvent.layout.height)}>
        <View onStartShouldSetResponder={swallow} onResponderRelease={ignore} style={[styles.cardArrow, { left: arrowX - 11, backgroundColor: face }]} />
        <View
          onStartShouldSetResponder={swallow}
          onResponderRelease={ignore}
          style={[styles.card, { backgroundColor: face, borderBottomColor: lipColor }]}
          testID="node-card"
        >
          <Text style={[styles.cardTitle, { color: ink }]}>{withHonorifics(noBreakHyphens(node.title))}</Text>
          {arabic ? (
            <ArabicText
              size={arabicSize}
              weight="bold"
              color={ink}
              align="left"
              style={[styles.cardArabic, { lineHeight: arabicSize === 28 ? 40 : 34 }, grey ? styles.soft : null]}
            >
              {arabic.ar}
            </ArabicText>
          ) : null}
          <Text style={[styles.cardSmall, { color: ink }, grey ? styles.soft : styles.light]}>{`${place} of ${count}`}</Text>
          {action}
        </View>
      </View>
    </PopIn>
  );
}

// ---------- unit banner ----------

function bannerFace(color: string) {
  return darken(color, 0.1);
}

function PremiumPill({ unitId, onPress }: { unitId: string; onPress?: () => void }) {
  const inner = (
    <>
      <Icon name="crown" size={20} />
      <Text style={styles.premiumText}>PREMIUM</Text>
    </>
  );
  if (!onPress) {
    return (
      <View style={styles.premiumPill} testID={`unit-premium-${unitId}`}>
        {inner}
      </View>
    );
  }
  return (
    <Tappable onPress={onPress} pressScale={0.92} accessibilityLabel="Premium" testID={`unit-premium-${unitId}`} style={styles.premiumPill}>
      {inner}
    </Tappable>
  );
}

function UnitBanner({
  unit,
  color,
  onTestOut,
  onPremium,
  onBannerLayout
}: {
  unit: PathUnit;
  color: string;
  onTestOut?: () => void;
  onPremium?: () => void;
  onBannerLayout: (height: number) => void;
}) {
  const progress = unit.total > 0 ? unit.done / unit.total : 0;
  const face = bannerFace(color);
  return (
    <View
      style={[styles.banner, { backgroundColor: face, borderBottomColor: darken(color, 0.3) }]}
      onLayout={(event) => onBannerLayout(event.nativeEvent.layout.height)}
      testID={`unit-banner-${unit.id}`}
    >
      <View style={styles.unitRow}>
        <Text style={styles.unitLabel} numberOfLines={1}>{`UNIT ${unit.number}`}</Text>
        {unit.arabic ? (
          <ArabicText size={unit.arabic.ar.length > 12 ? 18 : 20} weight="bold" color={colors.white} align="right" style={styles.bannerArabic}>
            {unit.arabic.ar}
          </ArabicText>
        ) : null}
      </View>
      {/* A hyphen holds its word together, so a lone "Al-" never ends the line (here, the sticky banner and the node card). */}
      <Text style={styles.bannerTitle} numberOfLines={2}>
        {withHonorifics(noBreakHyphens(unit.title))}
      </Text>
      <View style={styles.bannerBottom}>
        <ProgressBar progress={progress} color={colors.white} trackColor={withAlpha(colors.ink, 0.2)} height={10} style={styles.bannerBar} />
        <Text style={styles.bannerCount}>{`${unit.done}/${unit.total}`}</Text>
        {unit.premiumLocked ? <PremiumPill unitId={unit.id} onPress={onPremium} /> : null}
        {onTestOut ? (
          <Tappable
            onPress={onTestOut}
            pressScale={0.9}
            accessibilityLabel="Jump ahead"
            testID={`unit-test-out-${unit.id}`}
            style={[styles.keyButton, { borderBottomColor: darken(color, 0.3) }]}
          >
            <Icon name="key" size={22} />
          </Tappable>
        ) : null}
      </View>
    </View>
  );
}

function StickyBanner({ unit, color, onMeasure }: { unit: PathUnit; color: string; onMeasure: (height: number) => void }) {
  return (
    <View style={styles.stickyWrap} testID="path-sticky" onLayout={(event) => onMeasure(event.nativeEvent.layout.height)}>
      <PopIn from="down">
        <View style={[styles.sticky, { backgroundColor: bannerFace(color), borderBottomColor: darken(color, 0.3) }]} testID={`path-sticky-${unit.id}`}>
          <View style={styles.stickyText}>
            <Text style={styles.stickyUnit} numberOfLines={1}>{`UNIT ${unit.number}`}</Text>
            <Text style={styles.stickyTitle} numberOfLines={2}>
              {withHonorifics(noBreakHyphens(unit.title))}
            </Text>
          </View>
          <Text style={styles.stickyCount} numberOfLines={1}>{`${unit.done}/${unit.total}`}</Text>
        </View>
      </PopIn>
    </View>
  );
}

// ---------- test-out sheet ----------

/** "Get 8 of 10 right. 3 misses end it.": the pass mark, and the miss that ends the test. */
export function testOutGoalLine(goal: { total: number; passingScore: number }) {
  const endingMiss = Math.max(1, goal.total - goal.passingScore + 1);
  return `Get ${goal.passingScore} of ${goal.total} right. ${endingMiss} ${endingMiss === 1 ? "miss ends" : "misses end"} it.`;
}

function TestOutSheet({
  visible,
  color,
  accent,
  mascotVariant,
  goal,
  onStart,
  onClose
}: {
  visible: boolean;
  /** The test's question count and pass mark, said before it starts. */
  goal?: { total: number; passingScore: number };
  /** The unit's color, for the key and the button. */
  color: string;
  /** The topic accent, for the mascot. */
  accent: string;
  mascotVariant: string;
  onStart: () => void;
  onClose: () => void;
}) {
  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} testID="test-out-sheet">
      <View style={styles.jumpHead}>
        <View style={[styles.jumpKey, { backgroundColor: lighten(color, 0.86), borderBottomColor: lighten(color, 0.6) }]}>
          <Icon name="key" size={30} />
        </View>
        <Text style={styles.jumpTitle} accessibilityRole="header" numberOfLines={2}>
          Jump ahead?
        </Text>
      </View>
      <View style={styles.jumpMascotRow}>
        <Mascot variant={mascotVariant} mood="think" accent={accent} size={84} />
        <SpeechBubble style={styles.jumpBubble}>Pass a quick test to skip ahead!</SpeechBubble>
      </View>
      {goal ? (
        <View style={[styles.jumpGoal, { backgroundColor: lighten(color, 0.9) }]} testID="test-out-sheet-goal">
          <Icon name="check" size={20} color={darken(color, 0.25)} />
          <Text style={[styles.jumpGoalText, { color: darken(color, 0.45) }]}>{testOutGoalLine(goal)}</Text>
        </View>
      ) : null}
      <GameButton label="Start test" color={color} sound="unlock" fullWidth onPress={onStart} testID="test-out-start" />
      <GameButton label="Not now" variant="ghost" color={colors.inkSoft} fullWidth onPress={onClose} style={styles.jumpGhost} testID="test-out-cancel" />
    </Sheet>
  );
}

// ---------- end of the topic ----------

function PathEnd({
  done,
  color,
  mascotVariant,
  width,
  onNextTopic
}: {
  done: boolean;
  color: string;
  mascotVariant: string;
  width: number;
  onNextTopic?: () => void;
}) {
  const bob = useLoop((value) => pingPong(value, 700), done);
  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
  const { style: shakeStyle, shake } = useShake(6);
  const { hint, show } = useHint();
  const center = width / 2;
  const mascotLeft = Math.max(8, center - END_NODE / 2 - 18 - MASCOT_W);
  const camelStart = center + END_NODE / 2 + 14;
  const camelRange = Math.max(0, Math.min(CAMEL_WALK / 2, width - 8 - camelStart - CAMEL_SIZE));

  return (
    <View style={styles.end} testID="path-end">
      <View style={styles.endStage}>
        <View style={[styles.mascot, { left: mascotLeft, top: (END_NODE + END_LIP - MASCOT_H) / 2 + 4 }]} pointerEvents="none">
          <Mascot variant={mascotVariant} mood={done ? "cheer" : "happy"} size={MASCOT_SIZE} accent={color} />
        </View>
        {width - 8 - camelStart >= CAMEL_SIZE ? (
          <View style={[styles.mascot, { left: camelStart, top: END_NODE + END_LIP - CAMEL_H }]} pointerEvents="none">
            {/* Faces the trophy; it walks a little victory lap once the topic is done. */}
            <Camel size={CAMEL_SIZE} range={camelRange} accent={color} walking={done} faceLeft testID="path-end-camel" />
          </View>
        ) : null}
        <View style={[styles.endSlot, { left: center - END_NODE / 2 }]}>
          <Animated.View style={{ transform: [...shakeStyle.transform, { translateY }] }}>
            <Tappable
              onPress={() => {
                if (done) {
                  show({ icon: "crown", label: "All done!" });
                } else {
                  shake();
                  show({ icon: "lock", label: "Keep going!" });
                }
              }}
              sound={done ? "xp" : "soft_ui"}
              pressScale={0.92}
              accessibilityLabel={done ? "Topic trophy, done" : "Topic trophy, locked"}
              testID="path-end-trophy"
              style={styles.endHit}
            >
              <View style={[styles.endLip, { backgroundColor: done ? colors.goldLip : colors.lockedLip }]} />
              <View style={[styles.endFace, { backgroundColor: done ? colors.gold : colors.locked }]}>
                <View style={styles.nodeShine} />
                {done ? (
                  <Icon name="trophy" size={46} color={colors.white} detailColor={colors.goldLip} />
                ) : (
                  // The real gold cup, faded: the prize ahead, not one more locked review node.
                  <View style={styles.endFaded}>
                    <Icon name="trophy" size={50} />
                  </View>
                )}
              </View>
            </Tappable>
          </Animated.View>
          <HintBubble hint={hint} bottom={END_NODE + END_LIP + 2} />
        </View>
      </View>
      {onNextTopic ? (
        <GameButton
          label={done ? "Next topic" : "More topics"}
          variant={done ? "primary" : "secondary"}
          color={done ? color : undefined}
          fullWidth
          onPress={onNextTopic}
          style={styles.endButton}
          testID="path-next-topic"
        />
      ) : null}
    </View>
  );
}

// ---------- path ----------

type RowSpec = {
  key: string;
  item: PathItem;
  offset: number;
  height: number;
  current: boolean;
  /** 1-based place among the unit's nodes (0 for chests). */
  place: number;
};

function animateLayout() {
  try {
    LayoutAnimation.configureNext(LayoutAnimation.create(220, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity));
  } catch {
    // Layout animation is optional.
  }
}

export function LearnPath({
  accent,
  topicId,
  mascotVariant,
  units,
  xpForNode,
  onStartNode,
  onClaimChest,
  onTestOut,
  jumpNodeIds,
  testOutGoal,
  currentNodeId,
  onPremium,
  canBuyPremium = monetizationMode !== "disabled",
  onNextTopic,
  header,
  initialOpenNodeId,
  initialFocusId,
  bottomPadding = 32
}: LearnPathProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [width, setWidth] = useState(390);
  const [openId, setOpenId] = useState<string | undefined>(initialOpenNodeId);
  const [cardH, setCardH] = useState<number | undefined>(undefined);
  const [stickyId, setStickyId] = useState<string | undefined>(undefined);
  /** Unit (and the JUMP HERE circle) whose "Jump ahead?" sheet is up; the ids stay while the sheet slides away. */
  const [testOut, setTestOut] = useState<{ unitId: string; nodeId?: string; open: boolean } | undefined>(undefined);
  const [seenTopic, setSeenTopic] = useState(topicId);
  const viewport = useRef(0);
  const scrollY = useRef(0);
  const unitY = useRef<Record<string, number>>({});
  const bannerH = useRef<Record<string, number>>({});
  const stickyH = useRef<Record<string, number>>({});
  const itemsY = useRef<Record<string, number>>({});
  const rowY = useRef<Record<string, number>>({});
  const scrolledToCurrent = useRef(false);
  const focusConsumed = useRef(false);
  const animateFocus = useRef(false);
  const programmaticUntil = useRef(0);
  const openedAtY = useRef(0);
  const cardScrolledFor = useRef<string | undefined>(undefined);
  const lastCurrentKey = useRef<string | undefined>(undefined);
  /** The chest the focus scroll kept in sight; when it opens, the path moves on to START. */
  const followChest = useRef<string | undefined>(undefined);
  const followTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // A new topic on the same mounted path: drop the open card and re-run the focus scroll.
  if (seenTopic !== topicId) {
    setSeenTopic(topicId);
    setOpenId(undefined);
    setCardH(undefined);
    setStickyId(undefined);
    setTestOut(undefined);
    scrolledToCurrent.current = false;
    focusConsumed.current = true;
    animateFocus.current = false;
    followChest.current = undefined;
  }

  const layout = useMemo(() => {
    let currentUnitId: string | undefined;
    let currentKey: string | undefined;
    const tints = unitColors(accent);
    // One START on the path: the first "current" circle outside a premium unit, else the first open one.
    // Library topics open the first circle of every unit, so several circles can be open at once.
    const startable = (status: LearningNodeView["status"]) =>
      units.some((unit) => !unit.premiumLocked && unit.items.some((item) => item.kind === "node" && item.node.status === status));
    const startStatus: LearningNodeView["status"] = startable("current") || !startable("available") ? "current" : "available";
    // The caller's circle to play next (the one a jump opened) takes START while it is open outside a premium unit.
    const isPreferred = (item: PathItem) =>
      item.kind === "node" && item.node.id === currentNodeId && (item.node.status === "current" || item.node.status === "available");
    const preferred = currentNodeId && units.some((unit) => !unit.premiumLocked && unit.items.some(isPreferred)) ? currentNodeId : undefined;
    const byUnit = units.map((unit, unitIndex) => {
      const premium = Boolean(unit.premiumLocked);
      let place = 0;
      const rows: RowSpec[] = unit.items.map((item, index) => {
        const key = item.kind === "node" ? item.node.id : `chest-${item.chest.id}`;
        // The data may mark the first open node of every branch as "current"; only the first one on the path is.
        const current = item.kind === "node" && !premium && !currentKey && (preferred ? item.node.id === preferred : item.node.status === startStatus);
        if (current) {
          currentKey = key;
          currentUnitId = unit.id;
        }
        if (item.kind === "node") place += 1;
        return {
          key,
          item,
          offset: offsetFor(index),
          current,
          place: item.kind === "node" ? place : 0,
          height: ROW_H + (current ? CURRENT_EXTRA : 0)
        };
      });
      const mascotIndex = rows.findIndex((row) => row.current);
      // The camel walks beside the circle after the one to play next, heading on down the path.
      const camelIndex = mascotIndex < 0 ? -1 : mascotIndex + 1 < rows.length ? mascotIndex + 1 : mascotIndex - 1;
      // Topic pictures beside the path, about one every SCENERY_EVERY rows (at least one a unit), never on the
      // mascot's or the camel's row.
      const scenery: { index: number; kind: SceneryKind }[] = [];
      const free = (candidate: number) =>
        candidate < rows.length && candidate !== mascotIndex && candidate !== camelIndex && !scenery.some((spot) => spot.index === candidate);
      for (let wanted = 2; wanted < rows.length; wanted += SCENERY_EVERY) {
        const candidate = [wanted, wanted + 1, wanted - 1].find(free);
        if (candidate !== undefined) scenery.push({ index: candidate, kind: sceneryFor(topicId, unitIndex, scenery.length) });
      }
      if (scenery.length === 0) {
        const candidate = [1, 0].find(free);
        if (candidate !== undefined) scenery.push({ index: candidate, kind: sceneryFor(topicId, unitIndex, 0) });
      }
      return {
        unit,
        premium,
        color: tints[unitIndex % tints.length],
        rows,
        nodeCount: unit.total > 0 ? unit.total : place,
        unitIndex,
        mascotIndex,
        camelIndex,
        scenery
      };
    });
    const wanted = focusConsumed.current ? undefined : initialFocusId ?? initialOpenNodeId;
    let focusKey = currentKey;
    let focusUnitId = currentUnitId;
    let focusRatio = 0.45;
    if (wanted) {
      for (const group of byUnit) {
        const row = group.rows.find((candidate) => candidate.key === wanted || candidate.key === `chest-${wanted}`);
        if (row) {
          focusKey = row.key;
          focusUnitId = group.unit.id;
          focusRatio = initialOpenNodeId && !initialFocusId ? 0.24 : 0.45;
          break;
        }
      }
    }
    // A chest sits right after the circle that opens it, so a ready chest just before the circle to play
    // next (maybe at the end of the unit before) was just earned: the focus scroll keeps it in sight.
    const flat = byUnit.flatMap((group) => group.rows.map((row) => ({ row, unitId: group.unit.id })));
    const before = flat[flat.findIndex((entry) => entry.row.key === currentKey) - 1];
    const earnedChest =
      before && before.row.item.kind === "chest" && before.row.item.chest.unlocked && !before.row.item.chest.claimed
        ? { key: before.row.key, unitId: before.unitId }
        : undefined;
    return { byUnit, currentUnitId, currentKey, focusKey, focusUnitId, focusRatio, earnedChest };
    // Focus targets are read on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent, units, topicId, currentNodeId]);

  // When the current node moves (a lesson was finished), follow it.
  if (lastCurrentKey.current !== layout.currentKey) {
    if (lastCurrentKey.current !== undefined && layout.currentKey !== undefined && seenTopic === topicId) {
      scrolledToCurrent.current = false;
      focusConsumed.current = true;
      animateFocus.current = true;
    }
    lastCurrentKey.current = layout.currentKey;
  }

  const findRow = useCallback(
    (key: string | undefined) => {
      if (!key) return undefined;
      for (const group of layout.byUnit) {
        const row = group.rows.find((candidate) => candidate.key === key);
        if (row) return { group, row };
      }
      return undefined;
    },
    [layout]
  );

  const absoluteRowY = useCallback((unitId: string, key: string) => {
    const a = unitY.current[unitId];
    const b = itemsY.current[unitId];
    const c = rowY.current[key];
    if (a === undefined || b === undefined || c === undefined) return undefined;
    return a + b + c;
  }, []);

  /** Height of a unit's sticky banner block once it has been shown. */
  const stickyHeight = useCallback((unit: PathUnit) => stickyH.current[unit.id] ?? STICKY_MIN, []);

  const updateSticky = useCallback(
    (y: number) => {
      let next: string | undefined;
      const groups = layout.byUnit;
      for (let i = 0; i < groups.length; i += 1) {
        const { unit } = groups[i];
        const top = unitY.current[unit.id];
        if (top === undefined || top > y) continue;
        const nextTop = i + 1 < groups.length ? unitY.current[groups[i + 1].unit.id] : undefined;
        const stickyBottom = y + stickyHeight(unit);
        // Take over only once the whole real banner is behind the sticky one, so its bar and count never peek out below.
        const realBannerShowing = top + UNIT_PAD + (bannerH.current[unit.id] ?? 0) > stickyBottom;
        const nextBannerArriving = nextTop !== undefined && nextTop + UNIT_PAD < stickyBottom;
        next = realBannerShowing || nextBannerArriving ? undefined : unit.id;
      }
      setStickyId((previous) => (previous === next ? previous : next));
    },
    [layout, stickyHeight]
  );

  /** Never stop with a unit banner half under the top edge: show it whole, or scroll past so the sticky banner takes over. */
  const snapPastBanners = useCallback(
    (target: number, allowUp: boolean) => {
      for (const group of layout.byUnit) {
        const top = unitY.current[group.unit.id];
        const height = bannerH.current[group.unit.id];
        if (top === undefined || height === undefined) continue;
        const whole = top + UNIT_PAD - 8;
        const past = top + UNIT_PAD + height - stickyHeight(group.unit) + 2;
        if (target > whole && target < past) return allowUp && target - whole < past - target ? whole : past;
      }
      return target;
    },
    [layout, stickyHeight]
  );

  const scrollTo = useCallback(
    (target: number, animated: boolean, allowUp = true) => {
      const y = snapPastBanners(Math.max(0, target), allowUp);
      programmaticUntil.current = Date.now() + 700;
      openedAtY.current = y;
      scrollRef.current?.scrollTo({ y, animated });
      scrollY.current = y;
      updateSticky(y);
    },
    [snapPastBanners, updateSticky]
  );

  const tryScrollToCurrent = useCallback(() => {
    const { focusKey, focusUnitId, focusRatio, earnedChest } = layout;
    if (scrolledToCurrent.current || !focusKey || !focusUnitId || viewport.current <= 0) return;
    const y = absoluteRowY(focusUnitId, focusKey);
    if (y === undefined) return;
    let target = y + ROW_H / 2 - viewport.current * focusRatio;
    // Never scroll the chest just earned out of sight (or under the sticky banner) on the way to START.
    const chestUnit = earnedChest && focusKey === layout.currentKey ? units.find((unit) => unit.id === earnedChest.unitId) : undefined;
    if (earnedChest && chestUnit) {
      const chestY = absoluteRowY(earnedChest.unitId, earnedChest.key);
      if (chestY === undefined) return;
      target = Math.min(target, chestY - stickyHeight(chestUnit) - 16);
      followChest.current = earnedChest.key;
    }
    scrolledToCurrent.current = true;
    focusConsumed.current = true;
    scrollTo(target, animateFocus.current);
    animateFocus.current = false;
  }, [absoluteRowY, layout, scrollTo, stickyHeight, units]);

  // Once that chest is opened, bring the circle to play next into view.
  useEffect(() => {
    const key = followChest.current;
    if (!key || layout.earnedChest?.key === key) return;
    followChest.current = undefined;
    const { currentKey, currentUnitId } = layout;
    const y = currentKey && currentUnitId ? absoluteRowY(currentUnitId, currentKey) : undefined;
    if (y === undefined || viewport.current <= 0) return;
    const nodeBottom = y + CURRENT_EXTRA + NODE + NODE_LIP + 12;
    if (nodeBottom <= scrollY.current + viewport.current) return;
    clearTimeout(followTimer.current);
    followTimer.current = setTimeout(() => scrollTo(y + ROW_H / 2 - viewport.current * 0.45, true), 250);
  }, [absoluteRowY, layout, scrollTo]);
  useEffect(() => () => clearTimeout(followTimer.current), []);

  // Topic switch or a moved current node: jump back to the top, then let the rows' onLayout find the target.
  useEffect(() => {
    if (scrolledToCurrent.current) return undefined;
    if (!animateFocus.current) {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
      scrollY.current = 0;
    }
    const frame = requestAnimationFrame(() => tryScrollToCurrent());
    return () => cancelAnimationFrame(frame);
  }, [topicId, layout.currentKey, tryScrollToCurrent]);

  // Keep the opened card on screen once it has measured itself.
  const onCardLayout = (key: string, unit: PathUnit, top: number, height: number) => {
    setCardH((previous) => (previous !== undefined && Math.abs(previous - height) < 1 ? previous : height));
    if (cardScrolledFor.current === key || viewport.current <= 0) return;
    const y = absoluteRowY(unit.id, key);
    if (y === undefined) return;
    cardScrolledFor.current = key;
    const nodeTop = y + top;
    const cardBottom = nodeTop + CARD_GAP + height + 12;
    const visibleBottom = scrollY.current + viewport.current;
    if (cardBottom > visibleBottom) {
      // Scroll the whole card into view, keeping its node clear of the sticky banner. A card too tall
      // for that may tuck the top half of its node under the banner, never the card's button.
      const showCard = cardBottom - viewport.current + 4;
      const sticky = stickyHeight(unit);
      const nodeClear = nodeTop - sticky - 4;
      const target = showCard <= nodeClear ? showCard : Math.min(showCard, nodeTop + NODE / 2 - sticky);
      if (target > scrollY.current) scrollTo(target, true, false);
    }
  };

  const open = (key: string | undefined) => {
    animateLayout();
    cardScrolledFor.current = undefined;
    openedAtY.current = scrollY.current;
    setCardH(undefined);
    setOpenId(key);
  };
  const toggle = (key: string) => open(openId === key ? undefined : key);
  const close = () => {
    if (openId) open(undefined);
  };
  // A tap on the empty path closes the card with the same soft tap as any button.
  const tapClose = () => {
    if (!openId) return;
    feedback("soft_ui", "light");
    open(undefined);
  };
  const unitCanTestOut = (unit: PathUnit) => !unit.premiumLocked && (unit.canTestOut ?? unit.id === layout.currentUnitId);
  const askTestOut = (unitId: string, nodeId?: string) => setTestOut({ unitId, nodeId, open: true });
  const canJumpTo = (unit: PathUnit, node: LearningNodeView) =>
    node.status === "locked" && (jumpNodeIds ? !unit.premiumLocked && jumpNodeIds.has(node.id) : unitCanTestOut(unit));

  const center = width / 2;
  const currentUnitIndex = layout.byUnit.findIndex((group) => group.unit.id === layout.currentUnitId);
  const sticky = stickyId ? layout.byUnit.find((group) => group.unit.id === stickyId) : undefined;
  const openRow = findRow(openId);
  const testOutGroup = testOut ? layout.byUnit.find((group) => group.unit.id === testOut.unitId) : undefined;
  const closeTestOut = () => setTestOut((previous) => (previous ? { ...previous, open: false } : previous));
  const topicDone = units.length > 0 && units.every((unit) => unit.total > 0 && unit.done >= unit.total);

  return (
    <View style={styles.root}>
      <ScrollView
        ref={scrollRef}
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: bottomPadding }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          const y = event.nativeEvent.contentOffset.y;
          scrollY.current = y;
          updateSticky(y);
          // react-native-web never fires onScrollBeginDrag, so a user scroll closes the card here.
          if (openId && Date.now() > programmaticUntil.current && Math.abs(y - openedAtY.current) > 30) close();
        }}
        onScrollBeginDrag={close}
        onLayout={(event: LayoutChangeEvent) => {
          viewport.current = event.nativeEvent.layout.height;
          const nextWidth = event.nativeEvent.layout.width;
          if (nextWidth > 0 && Math.abs(nextWidth - width) > 0.5) {
            // Titles wrap differently at a new width: let the sticky banners measure again.
            stickyH.current = {};
            setWidth(nextWidth);
          }
          tryScrollToCurrent();
        }}
        testID={`learn-path-${topicId}`}
      >
        <View onStartShouldSetResponder={() => Boolean(openId)} onResponderRelease={tapClose} testID="learn-path-content">
          {header}
          {layout.byUnit.map((group) => {
            const { unit, color, rows, premium } = group;
            // Only units near the circle to play next move their pictures: the rest stay still to spare cheap phones.
            const nearCurrent = currentUnitIndex < 0 ? group.unitIndex < 2 : Math.abs(group.unitIndex - currentUnitIndex) <= 1;
            const unitDone = unit.total > 0 && unit.done >= unit.total;
            const holdsOpen = openRow?.group.unit.id === unit.id;
            return (
              <View
                key={unit.id}
                style={[styles.unit, holdsOpen ? styles.raised : null]}
                onLayout={(event) => {
                  unitY.current[unit.id] = event.nativeEvent.layout.y;
                  tryScrollToCurrent();
                }}
              >
                <UnitBanner
                  unit={unit}
                  color={color}
                  onTestOut={onTestOut && unit.id === layout.currentUnitId && unitCanTestOut(unit) ? () => askTestOut(unit.id) : undefined}
                  onPremium={onPremium ? () => onPremium(unit.id) : undefined}
                  onBannerLayout={(height) => {
                    bannerH.current[unit.id] = height;
                  }}
                />
                <View
                  style={styles.items}
                  onLayout={(event) => {
                    itemsY.current[unit.id] = event.nativeEvent.layout.y;
                    tryScrollToCurrent();
                  }}
                >
                  {rows.map((row, index) => {
                    const nodeCenter = center + row.offset;
                    const top = row.current ? CURRENT_EXTRA : 0;
                    const isOpen = openId === row.key && row.item.kind === "node";
                    const side = row.offset > 0 ? -1 : row.offset < 0 ? 1 : -1;
                    const mascotCenter = nodeCenter + side * (NODE / 2 + 22 + MASCOT_W / 2);
                    const mascotLeft = Math.min(width - 8 - MASCOT_W, Math.max(8, mascotCenter - MASCOT_W / 2));
                    const decorCenter = center + side * Math.min(124, width * 0.3);
                    // The empty side of the row, between the screen edge and the circle, for the camel to walk in.
                    const laneStart = side < 0 ? 8 : nodeCenter + NODE / 2 + 10;
                    const laneEnd = side < 0 ? nodeCenter - NODE / 2 - 10 : width - 8;
                    const camelRange = Math.max(0, Math.min(CAMEL_WALK, laneEnd - laneStart - CAMEL_SIZE));
                    const camelLeft = laneStart + Math.max(0, (laneEnd - laneStart - CAMEL_SIZE - camelRange) / 2);
                    const pictures = group.scenery.find((spot) => spot.index === index);
                    const height = isOpen ? Math.max(row.height, top + CARD_GAP + (cardH ?? CARD_ESTIMATE) + 18) : row.height;
                    return (
                      <View
                        key={row.key}
                        style={[styles.row, { height }, isOpen ? styles.raised : null]}
                        onLayout={(event) => {
                          rowY.current[row.key] = event.nativeEvent.layout.y;
                          if (row.key === layout.focusKey || row.key === layout.earnedChest?.key) tryScrollToCurrent();
                        }}
                      >
                        {pictures ? (
                          <View style={[styles.decor, { left: decorCenter - DECOR_SIZE / 2, top: top + 6 }]} pointerEvents="none">
                            <View style={styles.decorShadow} />
                            <PathScenery kind={pictures.kind} size={DECOR_SIZE} animated={nearCurrent} />
                          </View>
                        ) : null}
                        {index === group.camelIndex ? (
                          <View style={[styles.mascot, { left: camelLeft, top: top + (NODE + NODE_LIP - CAMEL_H) / 2 }]} pointerEvents="none">
                            <Camel size={CAMEL_SIZE} range={camelRange} accent={color} walking testID="path-camel" />
                          </View>
                        ) : null}
                        {index === group.mascotIndex ? (
                          <View style={[styles.mascot, { left: mascotLeft, top: top + (NODE + NODE_LIP - MASCOT_H) / 2 - 8 }]} pointerEvents="none">
                            {/* The topic accent, not the unit tint: the mascot keeps one look across the app. */}
                            <Mascot variant={mascotVariant} mood="happy" size={MASCOT_SIZE} accent={accent} />
                          </View>
                        ) : null}
                        {row.current && !isOpen ? (
                          <View style={[styles.tagSlot, { left: nodeCenter - 50 }]} pointerEvents="none">
                            <StartTag color={color} />
                          </View>
                        ) : null}
                        {row.item.kind === "node" ? (
                          <View style={[styles.slot, { left: nodeCenter - RING / 2, top: top - (RING - NODE - NODE_LIP) / 2 }]}>
                            <PathNode
                              node={row.item.node}
                              color={color}
                              unitDone={unitDone}
                              premium={premium}
                              current={row.current}
                              progress={row.item.progress}
                              onPress={() => toggle(row.key)}
                            />
                          </View>
                        ) : (
                          <View style={[styles.slot, { left: nodeCenter - RING / 2, top: top - (RING - NODE - NODE_LIP) / 2 }]}>
                            <PathChestView chest={row.item.chest} onClaim={() => onClaimChest((row.item as { chest: PathChest }).chest)} />
                          </View>
                        )}
                        {isOpen && row.item.kind === "node" ? (
                          <View style={[styles.cardSlot, { top: top + CARD_GAP }]}>
                            <NodeCard
                              item={row.item}
                              color={color}
                              arrowX={nodeCenter - 16}
                              xp={xpForNode(row.item.node)}
                              place={row.place}
                              count={group.nodeCount}
                              premium={premium && row.item.node.status !== "completed"}
                              narrow={width < 360}
                              canBuyPremium={canBuyPremium}
                              onStart={() => onStartNode((row.item as { node: LearningNodeView }).node)}
                              onPremium={onPremium ? () => onPremium(unit.id) : undefined}
                              onJump={
                                onTestOut && canJumpTo(unit, row.item.node)
                                  ? () => {
                                      open(undefined);
                                      askTestOut(unit.id, (row.item as { node: LearningNodeView }).node.id);
                                    }
                                  : undefined
                              }
                              onCardLayout={(cardHeight) => onCardLayout(row.key, unit, top, cardHeight)}
                            />
                          </View>
                        ) : null}
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })}
          {units.length > 0 ? (
            <PathEnd done={topicDone} color={accent} mascotVariant={mascotVariant} width={width} onNextTopic={onNextTopic} />
          ) : null}
        </View>
      </ScrollView>
      {sticky ? (
        <StickyBanner
          key={sticky.unit.id}
          unit={sticky.unit}
          color={sticky.color}
          onMeasure={(height) => {
            const unitId = sticky.unit.id;
            if (Math.abs((stickyH.current[unitId] ?? 0) - height) < 0.5) return;
            stickyH.current[unitId] = height;
            updateSticky(scrollY.current);
          }}
        />
      ) : null}
      {onTestOut ? (
        <TestOutSheet
          visible={Boolean(testOut?.open)}
          color={testOutGroup?.color ?? accent}
          accent={accent}
          mascotVariant={mascotVariant}
          goal={testOut ? testOutGoal?.(testOut.unitId, testOut.nodeId) : undefined}
          onClose={closeTestOut}
          onStart={() => {
            closeTestOut();
            // The banner key tests the unit; JUMP HERE also names the circle.
            if (testOut?.nodeId) onTestOut(testOut.unitId, testOut.nodeId);
            else if (testOut) onTestOut(testOut.unitId);
          }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.snow
  },
  unit: {
    paddingTop: UNIT_PAD
  },
  raised: {
    zIndex: 20,
    elevation: 20
  },
  items: {
    paddingTop: 22
  },
  row: {
    width: "100%"
  },
  slot: {
    position: "absolute",
    width: RING,
    height: RING,
    alignItems: "center",
    justifyContent: "center"
  },
  nodeBox: {
    width: RING,
    height: RING,
    alignItems: "center",
    justifyContent: "center"
  },
  ring: {
    position: "absolute",
    left: 0,
    top: 0
  },
  nodeHit: {
    width: NODE,
    height: NODE + NODE_LIP,
    marginTop: NODE_LIP / 2
  },
  nodeLip: {
    position: "absolute",
    left: 0,
    top: NODE_LIP,
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2
  },
  nodeFace: {
    width: NODE,
    height: NODE,
    borderRadius: NODE / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  nodeShine: {
    position: "absolute",
    top: 8,
    left: 14,
    width: 22,
    height: 10,
    borderRadius: 6,
    backgroundColor: withAlpha(colors.white, 0.32),
    transform: [{ rotate: "-24deg" }]
  },
  tagSlot: {
    position: "absolute",
    top: 0,
    width: 100,
    alignItems: "center"
  },
  tagWrap: {
    alignItems: "center"
  },
  tag: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 3,
    paddingBottom: 2
  },
  tagText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.8
  },
  tagTail: {
    width: 12,
    height: 12,
    marginTop: -7,
    backgroundColor: colors.white,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.line,
    transform: [{ rotate: "45deg" }]
  },
  chestBox: {
    width: RING,
    height: RING,
    alignItems: "center",
    justifyContent: "center"
  },
  chestArt: {
    width: CHEST + 8,
    height: CHEST,
    alignItems: "center",
    justifyContent: "center"
  },
  groundShadow: {
    position: "absolute",
    bottom: 4,
    width: 56,
    height: 10,
    borderRadius: 5,
    backgroundColor: withAlpha(colors.ink, 0.08)
  },
  chestLocked: {
    opacity: 0.5
  },
  chestClaimed: {
    opacity: 0.45
  },
  sparkle: {
    position: "absolute"
  },
  sparkleA: {
    left: 2,
    top: 10
  },
  sparkleB: {
    right: 0,
    top: 40
  },
  sparkleC: {
    left: 10,
    bottom: 6
  },
  rewardPill: {
    position: "absolute",
    top: -6,
    right: -14,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    paddingRight: 8,
    paddingVertical: 1,
    borderRadius: 999,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: lighten(colors.gem, 0.55)
  },
  rewardText: {
    marginLeft: 3,
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.gemLip
  },
  decor: {
    position: "absolute",
    width: DECOR_SIZE,
    height: DECOR_SIZE,
    alignItems: "center"
  },
  decorShadow: {
    position: "absolute",
    bottom: -2,
    width: 44,
    height: 9,
    borderRadius: 5,
    backgroundColor: withAlpha(colors.ink, 0.07)
  },
  mascot: {
    position: "absolute"
  },
  cardSlot: {
    position: "absolute",
    left: 16,
    right: 16
  },
  cardWrap: {
    width: "100%"
  },
  cardArrow: {
    position: "absolute",
    top: 2,
    width: 22,
    height: 22,
    borderRadius: 4,
    transform: [{ rotate: "45deg" }]
  },
  card: {
    marginTop: 10,
    borderRadius: 20,
    borderBottomWidth: 5,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 16,
    shadowColor: colors.ink,
    shadowOpacity: 0.16,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8
  },
  cardTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    flexShrink: 1
  },
  cardArabic: {
    marginTop: 2,
    lineHeight: 40,
    alignSelf: "flex-start"
  },
  cardSmall: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    marginTop: 2
  },
  light: {
    opacity: 0.9
  },
  soft: {
    opacity: 0.7
  },
  cardButton: {
    marginTop: 14
  },
  lockedRow: {
    marginTop: 12,
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center"
  },
  lockedText: {
    marginLeft: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 21,
    color: colors.inkSoft,
    flexShrink: 1
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 18,
    borderBottomWidth: 5,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14
  },
  unitRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 32
  },
  unitLabel: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 1,
    color: colors.white
  },
  bannerArabic: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12
  },
  bannerTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 27,
    color: colors.white,
    flexShrink: 1
  },
  bannerBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  bannerBar: {
    flex: 1,
    width: undefined,
    minWidth: 0
  },
  bannerCount: {
    marginLeft: 10,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white
  },
  premiumPill: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    height: 34,
    paddingLeft: 7,
    paddingRight: 10,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 3,
    borderBottomColor: colors.goldLip
  },
  premiumText: {
    marginLeft: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: GOLD_INK
  },
  keyButton: {
    marginLeft: 10,
    width: 40,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  stickyWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    backgroundColor: colors.snow
  },
  sticky: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderBottomWidth: 4,
    paddingHorizontal: 14,
    paddingTop: 6,
    paddingBottom: 6
  },
  stickyText: {
    flex: 1,
    minWidth: 0
  },
  stickyUnit: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1,
    color: withAlpha(colors.white, 0.85)
  },
  stickyTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 19,
    color: colors.white,
    flexShrink: 1
  },
  stickyCount: {
    marginLeft: 10,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white
  },
  hintSlot: {
    position: "absolute",
    left: -80,
    right: -80,
    alignItems: "center",
    zIndex: 30,
    elevation: 30
  },
  hintPop: {
    alignItems: "center"
  },
  hint: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 12,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line
  },
  hintText: {
    marginLeft: 5,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink
  },
  hintTail: {
    width: 12,
    height: 12,
    marginTop: -7,
    backgroundColor: colors.white,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.line,
    transform: [{ rotate: "45deg" }]
  },
  jumpHead: {
    flexDirection: "row",
    alignItems: "center"
  },
  jumpKey: {
    width: 52,
    height: 52,
    borderRadius: 16,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  jumpTitle: {
    ...text.h2,
    flex: 1,
    minWidth: 0
  },
  jumpMascotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 18
  },
  jumpBubble: {
    flex: 1,
    minWidth: 0,
    marginLeft: 12
  },
  jumpGoal: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: -4,
    marginBottom: 16
  },
  jumpGoalText: {
    flexShrink: 1,
    marginLeft: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22
  },
  jumpGhost: {
    marginTop: 4
  },
  end: {
    paddingTop: 36,
    paddingHorizontal: 24,
    alignItems: "center"
  },
  endStage: {
    alignSelf: "stretch",
    marginHorizontal: -24,
    height: END_NODE + END_LIP + 8
  },
  endSlot: {
    position: "absolute",
    top: 0,
    width: END_NODE,
    alignItems: "center"
  },
  endHit: {
    width: END_NODE,
    height: END_NODE + END_LIP
  },
  endLip: {
    position: "absolute",
    left: 0,
    top: END_LIP,
    width: END_NODE,
    height: END_NODE,
    borderRadius: END_NODE / 2
  },
  endFace: {
    width: END_NODE,
    height: END_NODE,
    borderRadius: END_NODE / 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  endFaded: {
    opacity: 0.5
  },
  endButton: {
    marginTop: 18,
    maxWidth: 320,
    alignSelf: "center"
  }
});
