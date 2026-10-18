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
import type { LearningNodeView } from "../../types";
import { ArabicText } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { haptic, playUi } from "../sound";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, withAlpha } from "../theme";

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
  /** Optional "jump ahead" key button on the current unit banner. */
  onTestOut?: (unitId: string) => void;
  /** Tap the Premium pill or the UNLOCK button of a premium-locked unit. */
  onPremium?: (unitId: string) => void;
  /** Optional content rendered above the first unit. */
  header?: React.ReactNode;
  /** Open this node's card on mount (gallery and tests). */
  initialOpenNodeId?: string;
  /** Scroll to this node or chest id on mount instead of the current node. */
  initialFocusId?: string;
  /** Extra bottom padding so the last node clears the tab bar. Default 140. */
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
const DECOR: IconName[] = ["lantern", "palm", "mosque", "lantern"];
const DECOR_SIZE = 64;
const CARD_ESTIMATE = 220;
/** Card top inside its row, below the node. */
const CARD_GAP = NODE + NODE_LIP + 4;
const UNIT_PAD = 16;
const STICKY_H = 64;

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

type NodeLook = { face: string; lip: string; icon: IconName; iconColor: string };

const LOCKED_ICON = darken(colors.lockedLip, 0.12);

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
    default:
      return { face: color, lip: darken(color, 0.22), icon: kindIcon, iconColor: colors.white };
  }
}

/**
 * Path node: a round face on a darker lip that sinks into the lip on press,
 * like the kit's GameButton. Plays `node_tap` with a medium haptic.
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
          playUi("node_tap");
          haptic("medium");
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
          <Icon name={look.icon} size={34} color={look.iconColor} />
        </Animated.View>
      </Pressable>
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

  const art = (
    <View style={styles.chestArt}>
      <View style={styles.groundShadow} />
      <Animated.View style={[{ transform: [{ rotate }] }, ready ? null : chest.claimed ? styles.chestClaimed : styles.chestLocked]}>
        <Icon name={chest.claimed ? "chestOpen" : "chest"} size={CHEST} />
      </Animated.View>
    </View>
  );

  return (
    <View style={styles.chestBox}>
      {ready ? (
        <>
          <Sparkle delay={0} style={styles.sparkleA} />
          <Sparkle delay={350} style={styles.sparkleB} />
          <Sparkle delay={700} style={styles.sparkleC} />
          <Tappable
            onPress={onClaim}
            sound="reward_chest"
            hapticKind="success"
            pressScale={0.9}
            accessibilityLabel={`Open chest, ${chest.gemsReward} gems`}
            testID={`path-chest-${chest.id}`}
          >
            {art}
            <View style={styles.rewardPill} pointerEvents="none">
              <Icon name="gem" size={14} />
              <Text style={styles.rewardText}>{`+${chest.gemsReward}`}</Text>
            </View>
          </Tappable>
        </>
      ) : (
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={chest.claimed ? "Opened chest" : "Locked chest"}
          testID={`path-chest-${chest.id}`}
        >
          {art}
        </View>
      )}
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
  onStart,
  onPremium,
  onCardLayout
}: {
  item: Extract<PathItem, { kind: "node" }>;
  color: string;
  arrowX: number;
  xp: number;
  place: number;
  count: number;
  premium: boolean;
  onStart: () => void;
  onPremium?: () => void;
  onCardLayout: (height: number) => void;
}) {
  const { node, arabic } = item;
  const grey = premium || node.status === "locked";
  const face = grey ? colors.locked : color;
  const lipColor = grey ? colors.lockedLip : darken(color, 0.22);
  const ink = grey ? colors.ink : colors.white;
  // The card is its own responder, so touches on it never reach the path's tap-to-close handler.
  const swallow = () => true;
  const ignore = () => undefined;

  let action: React.ReactNode;
  if (premium && onPremium) {
    action = <GameButton label="Unlock" icon="gem" variant="gold" fullWidth onPress={onPremium} style={styles.cardButton} testID="node-card-unlock" />;
  } else if (grey) {
    action = (
      <View style={styles.lockedPill} testID="node-card-locked">
        <Icon name="lock" size={22} color={colors.inkSoft} />
        <Text style={styles.lockedText}>LOCKED</Text>
      </View>
    );
  } else {
    action = (
      <GameButton
        label={`${node.status === "completed" ? "Practice" : "Start"} +${xp} XP`}
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
          <Text style={[styles.cardTitle, { color: ink }]}>{node.title}</Text>
          {arabic ? (
            <ArabicText size={28} weight="bold" color={ink} align="left" style={[styles.cardArabic, grey ? styles.soft : null]}>
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
      <Icon name="gem" size={20} />
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
          <ArabicText size={unit.arabic.ar.length > 12 ? 18 : 20} weight="bold" color={colors.white} align="right" numberOfLines={1} style={styles.bannerArabic}>
            {unit.arabic.ar}
          </ArabicText>
        ) : null}
      </View>
      <Text style={styles.bannerTitle} numberOfLines={2}>
        {unit.title}
      </Text>
      <View style={styles.bannerBottom}>
        <ProgressBar progress={progress} color={colors.white} trackColor={withAlpha(colors.ink, 0.2)} height={10} style={styles.bannerBar} />
        <Text style={styles.bannerCount}>{`${unit.done}/${unit.total}`}</Text>
        {unit.premiumLocked ? <PremiumPill unitId={unit.id} onPress={onPremium} /> : null}
        {onTestOut ? (
          <Tappable
            onPress={onTestOut}
            sound="unlock"
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

function StickyBanner({ unit, color }: { unit: PathUnit; color: string }) {
  return (
    <View style={styles.stickyWrap} testID="path-sticky">
      <PopIn from="down">
        <View style={[styles.sticky, { backgroundColor: bannerFace(color), borderBottomColor: darken(color, 0.3) }]} testID={`path-sticky-${unit.id}`}>
          <Text style={styles.stickyUnit} numberOfLines={1}>{`UNIT ${unit.number}`}</Text>
          <Text style={styles.stickyTitle} numberOfLines={1}>
            {unit.title}
          </Text>
          <Text style={styles.stickyCount} numberOfLines={1}>{`${unit.done}/${unit.total}`}</Text>
        </View>
      </PopIn>
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
  onPremium,
  header,
  initialOpenNodeId,
  initialFocusId,
  bottomPadding = 140
}: LearnPathProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [width, setWidth] = useState(390);
  const [openId, setOpenId] = useState<string | undefined>(initialOpenNodeId);
  const [cardH, setCardH] = useState<number | undefined>(undefined);
  const [stickyId, setStickyId] = useState<string | undefined>(undefined);
  const [seenTopic, setSeenTopic] = useState(topicId);
  const viewport = useRef(0);
  const scrollY = useRef(0);
  const unitY = useRef<Record<string, number>>({});
  const bannerH = useRef<Record<string, number>>({});
  const itemsY = useRef<Record<string, number>>({});
  const rowY = useRef<Record<string, number>>({});
  const scrolledToCurrent = useRef(false);
  const focusConsumed = useRef(false);
  const animateFocus = useRef(false);
  const programmaticUntil = useRef(0);
  const openedAtY = useRef(0);
  const cardScrolledFor = useRef<string | undefined>(undefined);
  const lastCurrentKey = useRef<string | undefined>(undefined);

  // A new topic on the same mounted path: drop the open card and re-run the focus scroll.
  if (seenTopic !== topicId) {
    setSeenTopic(topicId);
    setOpenId(undefined);
    setCardH(undefined);
    setStickyId(undefined);
    scrolledToCurrent.current = false;
    focusConsumed.current = true;
    animateFocus.current = false;
  }

  const layout = useMemo(() => {
    let currentUnitId: string | undefined;
    let currentKey: string | undefined;
    const tints = unitColors(accent);
    const byUnit = units.map((unit, unitIndex) => {
      const premium = Boolean(unit.premiumLocked);
      let place = 0;
      const rows: RowSpec[] = unit.items.map((item, index) => {
        const key = item.kind === "node" ? item.node.id : `chest-${item.chest.id}`;
        // The data marks the first open node of every branch as "current"; only the first one on the path is.
        const current = item.kind === "node" && item.node.status === "current" && !premium && !currentKey;
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
      let decorIndex = -1;
      for (const candidate of [2, 6, 1, 3]) {
        if (candidate < rows.length && candidate !== mascotIndex) {
          decorIndex = candidate;
          break;
        }
      }
      return {
        unit,
        premium,
        color: tints[unitIndex % tints.length],
        rows,
        nodeCount: unit.total > 0 ? unit.total : place,
        mascotIndex,
        decorIndex,
        decor: DECOR[unitIndex % DECOR.length]
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
    return { byUnit, currentUnitId, currentKey, focusKey, focusUnitId, focusRatio };
    // Focus targets are read on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accent, units, topicId]);

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

  const updateSticky = useCallback(
    (y: number) => {
      let next: string | undefined;
      const groups = layout.byUnit;
      for (let i = 0; i < groups.length; i += 1) {
        const top = unitY.current[groups[i].unit.id];
        if (top === undefined || top > y) continue;
        const nextTop = i + 1 < groups.length ? unitY.current[groups[i + 1].unit.id] : undefined;
        // Take over as soon as the real banner starts to slide under the top edge.
        const realBannerShowing = y < top + UNIT_PAD + 20;
        const nextBannerArriving = nextTop !== undefined && nextTop - y < STICKY_H;
        next = realBannerShowing || nextBannerArriving ? undefined : groups[i].unit.id;
      }
      setStickyId((previous) => (previous === next ? previous : next));
    },
    [layout]
  );

  /** Never stop with a unit banner half under the top edge: show it whole, or scroll past so the sticky banner takes over. */
  const snapPastBanners = useCallback(
    (target: number, allowUp: boolean) => {
      for (const group of layout.byUnit) {
        const top = unitY.current[group.unit.id];
        const height = bannerH.current[group.unit.id];
        if (top === undefined || height === undefined) continue;
        const whole = top + UNIT_PAD - 8;
        const past = top + UNIT_PAD + height - STICKY_H + 10;
        if (target > whole && target < past) return allowUp && target - whole < past - target ? whole : past;
      }
      return target;
    },
    [layout]
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
    const { focusKey, focusUnitId, focusRatio } = layout;
    if (scrolledToCurrent.current || !focusKey || !focusUnitId || viewport.current <= 0) return;
    const y = absoluteRowY(focusUnitId, focusKey);
    if (y === undefined) return;
    scrolledToCurrent.current = true;
    focusConsumed.current = true;
    scrollTo(y + ROW_H / 2 - viewport.current * focusRatio, animateFocus.current);
    animateFocus.current = false;
  }, [absoluteRowY, layout, scrollTo]);

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
  const onCardLayout = (key: string, unitId: string, top: number, height: number) => {
    setCardH((previous) => (previous !== undefined && Math.abs(previous - height) < 1 ? previous : height));
    if (cardScrolledFor.current === key || viewport.current <= 0) return;
    const y = absoluteRowY(unitId, key);
    if (y === undefined) return;
    cardScrolledFor.current = key;
    const nodeTop = y + top;
    const cardBottom = nodeTop + CARD_GAP + height + 12;
    const visibleBottom = scrollY.current + viewport.current;
    if (cardBottom > visibleBottom) {
      // Scroll the card into view, but never push its node under the sticky banner.
      const target = Math.min(cardBottom - viewport.current + 16, nodeTop - STICKY_H - 16);
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

  const center = width / 2;
  const sticky = stickyId ? layout.byUnit.find((group) => group.unit.id === stickyId) : undefined;
  const openRow = findRow(openId);

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
          if (nextWidth > 0 && Math.abs(nextWidth - width) > 0.5) setWidth(nextWidth);
          tryScrollToCurrent();
        }}
        testID={`learn-path-${topicId}`}
      >
        <View onStartShouldSetResponder={() => Boolean(openId)} onResponderRelease={close} testID="learn-path-content">
          {header}
          {layout.byUnit.map((group) => {
            const { unit, color, rows, premium } = group;
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
                  onTestOut={onTestOut && unit.id === layout.currentUnitId && !premium ? () => onTestOut(unit.id) : undefined}
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
                    const height = isOpen ? Math.max(row.height, top + CARD_GAP + (cardH ?? CARD_ESTIMATE) + 18) : row.height;
                    return (
                      <View
                        key={row.key}
                        style={[styles.row, { height }, isOpen ? styles.raised : null]}
                        onLayout={(event) => {
                          rowY.current[row.key] = event.nativeEvent.layout.y;
                          if (row.key === layout.focusKey) tryScrollToCurrent();
                        }}
                      >
                        {index === group.decorIndex ? (
                          <View style={[styles.decor, { left: decorCenter - DECOR_SIZE / 2, top: top + 6 }]} pointerEvents="none">
                            <View style={styles.decorShadow} />
                            <Icon name={group.decor} size={DECOR_SIZE} />
                          </View>
                        ) : null}
                        {index === group.mascotIndex ? (
                          <View style={[styles.mascot, { left: mascotLeft, top: top + (NODE + NODE_LIP - MASCOT_H) / 2 - 8 }]} pointerEvents="none">
                            <Mascot variant={mascotVariant} mood="happy" size={MASCOT_SIZE} accent={color} />
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
                              onStart={() => onStartNode((row.item as { node: LearningNodeView }).node)}
                              onPremium={onPremium ? () => onPremium(unit.id) : undefined}
                              onCardLayout={(cardHeight) => onCardLayout(row.key, unit.id, top, cardHeight)}
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
        </View>
      </ScrollView>
      {sticky ? <StickyBanner key={sticky.unit.id} unit={sticky.unit} color={sticky.color} /> : null}
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
  lockedPill: {
    marginTop: 14,
    height: 54,
    borderRadius: 16,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  lockedText: {
    marginLeft: 8,
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.6,
    color: colors.inkSoft
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
    borderBottomColor: colors.gemLip
  },
  premiumText: {
    marginLeft: 4,
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.5,
    color: colors.gemLip
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
    height: STICKY_H - 18,
    borderRadius: 16,
    borderBottomWidth: 4,
    paddingHorizontal: 14
  },
  stickyUnit: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 1,
    color: colors.white,
    marginRight: 10
  },
  stickyTitle: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.white
  },
  stickyCount: {
    marginLeft: 10,
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: colors.white
  }
});
