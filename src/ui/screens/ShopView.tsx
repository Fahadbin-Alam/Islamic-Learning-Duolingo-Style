import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { UiStrings } from "../../i18n";
import { legalLinks, monetizationMode } from "../../services/monetizationConfig";
import type { LearningSection, ShopItem, UserProfile } from "../../types";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { feedback } from "../sound";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { FormattedCount, formatNumber } from "./FormattedCount";
import { useGrownUpGate } from "./GrownUpGate";

export type ShopViewProps = {
  user: UserProfile;
  strings: UiStrings;
  items: ShopItem[];
  /** Store-localized prices by item id; they win over the built-in USD price. */
  storePrices: Record<string, string>;
  /** A purchase or restore is running: buying is paused and the pressed button spins. */
  busy: boolean;
  section: LearningSection;
  /** Real-money items reach this only after the grown-up gate. Gem and Watch items go straight through. */
  onUseItem: (item: ShopItem) => void;
  /** Called after the grown-up gate. */
  onRestore: () => void;
  /**
   * KEEP LEARNING under the "Almost every lesson is free!" note (purchases off, e.g. on web).
   * Usually opens the Learn tab. Without it the note has no button.
   */
  onDone?: () => void;
  /** Opens Terms / Privacy / Manage subscription (after the grown-up gate). Default: Linking.openURL. */
  onOpenLink?: (url: string) => void;
  /** Item id (or "restore") whose button spins while busy. Default: the last one pressed here. */
  pendingItemId?: string;
  /**
   * The store can take real money and show reward videos. When false (a web build with
   * purchases switched off) those rows, the plans and Restore are hidden: they could only fail.
   * Default: the monetization mode is not "disabled".
   */
  canBuyWithMoney?: boolean;
  /** Scroll to this part once the shop opens. "premium": the Premium card (or the "can't be bought here" note). */
  focus?: "premium";
};

const MANAGE_SUBSCRIPTION_URL =
  Platform.OS === "android" ? "https://play.google.com/store/account/subscriptions" : "https://apps.apple.com/account/subscriptions";

/** Same rule as TopicApp: premium learners are not sold anything again. */
function isPremium(user: UserProfile) {
  return Boolean(user.activeSubscriptionId);
}

/** Same rule as canSpendGems in src/api/islamicLearningApi.ts. */
function canSpend(user: UserProfile, item: ShopItem) {
  return item.currencyType === "gems" && !user.hearts.unlimited && user.gems >= item.price && user.hearts.current < user.hearts.max;
}

/** Bought with real money or a video: needs the store. */
function needsStore(item: ShopItem) {
  return item.currencyType !== "gems";
}

/** Real money leaves the app: needs the grown-up gate. */
function needsGrownUp(item: ShopItem) {
  return item.currencyType !== "gems" && item.currencyType !== "rewarded_ad";
}

export function formatShopPrice(item: ShopItem, storePrices: Record<string, string> = {}) {
  if (item.currencyType === "rewarded_ad") return "Watch";
  if (item.currencyType === "gems") return formatNumber(item.price);
  const price = storePrices[item.id] ?? `$${item.price.toFixed(2)}`;
  if (item.durationDays) return `${price}${item.durationDays >= 365 ? "/yr" : "/mo"}`;
  return price;
}

/** Short kid-friendly names; the catalog names are written for store listings. */
function displayName(item: ShopItem) {
  switch (item.type) {
    case "monthly_membership":
      return "Monthly";
    case "yearly_membership":
      return "Yearly";
    case "gem_heart_refill":
      return "Full hearts";
    case "rewarded_ad":
      return "Free heart";
    default:
      return item.name;
  }
}

function shortLine(item: ShopItem, user: UserProfile) {
  if (item.refillsHearts) return `Fill to ${user.hearts.max}`;
  if (item.type === "rewarded_ad") return "Watch a video";
  if (item.heartsGranted) return `+${item.heartsGranted} hearts`;
  if (item.gemsGranted) return `+${formatNumber(item.gemsGranted)} gems`;
  return item.localizedDescription;
}

function badgeText(item: ShopItem) {
  if (!item.highlightBadge) return undefined;
  const percent = item.highlightBadge.match(/\d+\s*%/);
  return percent ? `Save ${percent[0].replace(/\s/g, "")}` : item.highlightBadge;
}

const BENEFITS: { icon: IconName; label: string }[] = [
  { icon: "infinity", label: "Unlimited hearts" },
  { icon: "sparkle", label: "No ads" },
  { icon: "bookOpen", label: "Every lesson" }
];

function ItemIcon({ item }: { item: ShopItem }) {
  if (item.type === "rewarded_ad") {
    return (
      <View style={[styles.itemIcon, { backgroundColor: lighten(colors.gold, 0.8) }]}>
        <Icon name="play" size={32} />
      </View>
    );
  }
  if (item.refillsHearts) {
    // A little stack of hearts: "fill them all".
    return (
      <View style={[styles.itemIcon, { backgroundColor: colors.wrongBg }]}>
        <View style={styles.heartStack}>
          <View style={styles.heartBack}>
            <Icon name="heart" size={22} />
          </View>
          <Icon name="heart" size={30} />
        </View>
      </View>
    );
  }
  if (item.heartsGranted) {
    return (
      <View style={[styles.itemIcon, { backgroundColor: colors.wrongBg }]}>
        <Icon name="heart" size={34} />
        <View style={styles.plusBadge}>
          <Text style={styles.plusText}>{`+${item.heartsGranted}`}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={[styles.itemIcon, { backgroundColor: lighten(colors.gem, 0.85) }]}>
      <Icon name={item.gemsGranted ? "chest" : "sparkle"} size={34} />
    </View>
  );
}

type RowProps = {
  item: ShopItem;
  user: UserProfile;
  storePrices: Record<string, string>;
  busy: boolean;
  pendingId?: string;
  onBuy: (item: ShopItem) => void;
};

const NUDGE_MS = 1400;

/** While busy, the pressed button spins and every other button dims. */
function BuyButton({ item, busy, pendingId, onBuy, label, variant, icon, muted, accessibilityLabel }: RowProps & { label: string; variant: "blue" | "gold" | "primary"; icon?: IconName; muted?: boolean; accessibilityLabel: string }) {
  if (busy && pendingId === item.id) {
    return (
      <View style={[styles.spinner, styles.itemButton]} testID={`shop-pending-${item.id}`} accessibilityLabel="Working">
        <ActivityIndicator color={colors.green} />
      </View>
    );
  }
  return (
    <View style={[styles.itemButton, busy ? styles.dimBusy : muted ? styles.dimMuted : null]} pointerEvents={busy ? "none" : "auto"}>
      <GameButton
        label={label}
        size="sm"
        icon={icon}
        variant={variant}
        // A muted item plays its own sound (see ItemRow): the buzz when locked, a soft tap when hearts are full.
        sound={busy || muted ? false : undefined}
        onPress={() => !busy && onBuy(item)}
        testID={`shop-buy-${item.id}`}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

function ItemRow(props: RowProps) {
  const { item, user, storePrices, onBuy, busy } = props;
  const gems = item.currencyType === "gems";
  // An unaffordable or not-needed gem item stays pressable but never buys: its line already says why.
  const muted = gems && !canSpend(user, item);
  // Full hearts comes first: a learner who needs nothing is never told to save gems for it.
  const full = gems && !user.hearts.unlimited && user.hearts.current >= user.hearts.max;
  const short = gems && !full && user.gems < item.price ? item.price - user.gems : 0;
  const label = formatShopPrice(item, storePrices);
  const name = displayName(item);
  const line = full ? "Hearts are full" : short ? `Need ${formatNumber(short)} more` : shortLine(item, user);
  const { style: shakeStyle, shake } = useShake(6);
  const buttonPop = useRef(new Animated.Value(1)).current;
  const [nudges, setNudges] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(flashTimer.current), []);

  /** The line pops and turns bold for a moment, so it says again why nothing was bought. */
  const sayLine = () => {
    setNudges((count) => count + 1);
    setFlashing(true);
    clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlashing(false), NUDGE_MS);
  };
  /** Hearts already full: nothing is wrong, so a soft tap, and the line pops "Hearts are full". */
  const sayFull = () => {
    feedback("soft_ui", "light");
    sayLine();
  };
  /** Not enough gems: the locked button's buzz and shake, and the line pops "Need N more". */
  const buzz = () => {
    shake();
    feedback("wrong", "error");
    sayLine();
  };

  const press = (picked: ShopItem) => {
    if (!muted) {
      onBuy(picked);
      return;
    }
    if (full) {
      sayFull();
    } else {
      buzz();
    }
  };

  // A tap on the row (not its button) never buys, but it always answers: like the button when the item cannot be
  // bought, otherwise a soft tap and a little pop of the button that buys it.
  const pressRow = () => {
    if (busy) {
      feedback("soft_ui", "light");
      return;
    }
    if (muted) {
      press(item);
      return;
    }
    feedback("soft_ui", "light");
    buttonPop.setValue(1.1);
    Animated.spring(buttonPop, { toValue: 1, friction: 4, tension: 180, useNativeDriver: true }).start();
  };

  return (
    <Tappable
      onPress={pressRow}
      sound={false}
      hapticKind={false}
      pressScale={0.98}
      style={styles.item}
      accessibilityLabel={`${name}, ${line}`}
      testID={`shop-item-${item.id}`}
    >
      <ItemIcon item={item} />
      <View style={styles.itemText}>
        <Text style={styles.itemName} numberOfLines={2}>
          {name}
        </Text>
        <PopIn key={nudges} from="scale" style={styles.itemLineWrap}>
          <Text
            style={[styles.itemLine, short ? styles.itemLineShort : full && flashing ? styles.itemLineFull : null, flashing ? styles.itemLineFlash : null]}
            numberOfLines={2}
            testID={`shop-line-${item.id}`}
          >
            {line}
          </Text>
        </PopIn>
      </View>
      <Animated.View style={[shakeStyle, { transform: [...shakeStyle.transform, { scale: buttonPop }] }]}>
        <BuyButton
          {...props}
          onBuy={press}
          label={label}
          variant={gems ? "blue" : item.type === "rewarded_ad" ? "gold" : "primary"}
          icon={gems ? (short ? "lock" : "gem") : item.type === "rewarded_ad" ? "play" : undefined}
          muted={muted}
          accessibilityLabel={`${name}, ${gems ? `${item.price} gems${full ? ", hearts are full" : short ? ", not enough gems" : ""}` : item.type === "rewarded_ad" ? "watch a video" : label}`}
        />
      </Animated.View>
    </Tappable>
  );
}

function BenefitList({ ink, skipHearts }: { ink: string; skipHearts?: boolean }) {
  return (
    <View style={styles.benefits}>
      {BENEFITS.filter((benefit) => !skipHearts || benefit.icon !== "infinity").map((benefit) => (
        <View key={benefit.label} style={styles.benefitRow}>
          <View style={styles.benefitIcon}>
            <Icon name={benefit.icon} size={18} color={benefit.icon === "infinity" ? colors.heart : undefined} />
          </View>
          <Text style={[styles.benefitText, { color: ink }]} numberOfLines={1}>
            {benefit.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PremiumCard({ plans, ...rest }: Omit<RowProps, "item"> & { plans: ShopItem[] }) {
  const ink = darken(colors.gold, 0.62);
  return (
    <View style={styles.premium} testID="shop-premium">
      <View style={styles.premiumHead}>
        <View style={styles.crownCircle}>
          <Icon name="crown" size={40} />
        </View>
        <Text style={[styles.premiumTitle, { color: ink }]} numberOfLines={1}>
          Premium
        </Text>
      </View>
      <BenefitList ink={ink} />
      {plans.map((plan) => {
        const badge = badgeText(plan);
        const price = formatShopPrice(plan, rest.storePrices);
        return (
          <View key={plan.id} style={styles.plan}>
            <View style={styles.planText}>
              <Text style={styles.planName} numberOfLines={1}>
                {displayName(plan)}
              </Text>
              {badge ? (
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText} numberOfLines={1}>
                    {badge}
                  </Text>
                </View>
              ) : null}
            </View>
            <BuyButton {...rest} item={plan} label={price} variant="primary" accessibilityLabel={`Premium ${displayName(plan)}, ${price}`} />
          </View>
        );
      })}
    </View>
  );
}

/** A quick spring from big back to normal size. */
function popValue(value: Animated.Value) {
  value.setValue(1.35);
  Animated.spring(value, { toValue: 1, friction: 4, tension: 180, useNativeDriver: true }).start();
}

/** Shop tab: gem balance, hearts, gem packs and Premium plans. Real money sits behind a grown-up gate. */
export function ShopView({
  user,
  items,
  storePrices,
  busy,
  section,
  onUseItem,
  onRestore,
  onDone,
  onOpenLink,
  pendingItemId,
  canBuyWithMoney = monetizationMode !== "disabled",
  focus
}: ShopViewProps) {
  const premium = isPremium(user);
  const [pendingId, setPendingId] = useState<string | undefined>(undefined);
  const { ask, gate } = useGrownUpGate();
  const heartsPop = useRef(new Animated.Value(1)).current;
  const gemPop = useRef(new Animated.Value(1)).current;
  const last = useRef({ hearts: user.hearts.current, gems: user.gems });
  const scrollRef = useRef<ScrollView>(null);
  const focusDone = useRef(false);
  const focusTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(focusTimer.current), []);

  // Opened from a premium unit's UNLOCK: glide down to Premium instead of showing heart packs.
  const focusPremium = (y: number) => {
    if (focus !== "premium" || focusDone.current) return;
    focusDone.current = true;
    focusTimer.current = setTimeout(() => scrollRef.current?.scrollTo({ y: Math.max(0, y - 12), animated: true }), 120);
  };

  useEffect(() => {
    if (!busy) setPendingId(undefined);
  }, [busy]);

  // A purchase that worked gets a little celebration: the balance pops and a reward sound plays.
  useEffect(() => {
    const before = last.current;
    last.current = { hearts: user.hearts.current, gems: user.gems };
    if (user.hearts.current > before.hearts) {
      popValue(heartsPop);
      feedback("unlock", "success");
    } else if (user.gems > before.gems) {
      popValue(gemPop);
      feedback("xp", "success");
    }
  }, [gemPop, heartsPop, user.gems, user.hearts.current]);

  const visible = premium ? [] : items.filter((item) => canBuyWithMoney || !needsStore(item));
  const hearts = visible.filter((item) => !item.tier && (item.refillsHearts || item.heartsGranted || item.type === "rewarded_ad"));
  const gemPacks = visible.filter((item) => !item.tier && !hearts.includes(item) && item.gemsGranted);
  const powerUps = visible.filter((item) => !item.tier && !hearts.includes(item) && !gemPacks.includes(item));
  const plans = visible.filter((item) => item.tier && item.tier !== "free");

  const open = (url: string) => (onOpenLink ? onOpenLink(url) : void Linking.openURL(url).catch(() => undefined));
  const openGated = (url: string) => ask(() => open(url));
  const buy = (item: ShopItem) => {
    const run = () => {
      if (item.currencyType !== "gems") setPendingId(item.id);
      onUseItem(item);
    };
    if (needsGrownUp(item)) ask(run);
    else run();
  };
  const restore = () =>
    ask(() => {
      setPendingId("restore");
      onRestore();
    });
  const pending = pendingItemId ?? pendingId;
  const rowProps = { user, storePrices, busy, pendingId: pending, onBuy: buy };

  return (
    <View style={styles.root}>
      <ScrollView ref={scrollRef} style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="shop-view">
        <Text style={styles.title}>Shop</Text>

        <PopIn from="scale">
          <View style={styles.balance}>
            <View style={styles.balanceGem}>
              <Animated.View style={{ transform: [{ scale: gemPop }] }}>
                <Icon name="gem" size={46} />
              </Animated.View>
              <FormattedCount value={user.gems} style={styles.balanceValue} testID="shop-gems" />
            </View>
            <Animated.View
              style={[styles.balanceHearts, { transform: [{ scale: heartsPop }] }]}
              accessibilityLabel={user.hearts.unlimited ? "Unlimited hearts" : `${user.hearts.current} of ${user.hearts.max} hearts`}
              testID="shop-hearts"
            >
              <Icon name="heart" size={26} />
              {user.hearts.unlimited ? (
                <Icon name="infinity" size={26} color={colors.heart} />
              ) : (
                <Text style={styles.heartsValue} numberOfLines={1}>{`${user.hearts.current}/${user.hearts.max}`}</Text>
              )}
            </Animated.View>
          </View>
        </PopIn>

        {premium ? (
          <PopIn delay={80} from="up">
            <View style={styles.activeCard} testID="shop-premium-active">
              <View style={styles.activeHead}>
                {/* 80 px leaves room for the crown and the whole word at 320 px. */}
                <Mascot variant={section.mascot} mood="cheer" size={80} accent={section.accentColor} />
                <View style={styles.activeText}>
                  <View style={styles.activeTitleRow}>
                    <Icon name="crown" size={28} />
                    <Text style={[styles.premiumTitle, styles.activeTitle]}>Premium</Text>
                  </View>
                  <Text style={styles.activeLine} numberOfLines={2}>
                    Unlimited hearts!
                  </Text>
                </View>
              </View>
              <BenefitList ink={darken(colors.gold, 0.62)} skipHearts />
            </View>
          </PopIn>
        ) : null}

        {hearts.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Hearts</Text>
            {hearts.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </View>
        ) : null}

        {gemPacks.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Gems</Text>
            {gemPacks.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </View>
        ) : null}

        {powerUps.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Power-ups</Text>
            {powerUps.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </View>
        ) : null}

        {plans.length ? (
          <View style={styles.section} onLayout={(event) => focusPremium(event.nativeEvent.layout.y)}>
            <PremiumCard plans={plans} {...rowProps} />
          </View>
        ) : null}

        {!canBuyWithMoney && !premium ? (
          // Only what is true here, in a child's words: this build cannot sell the crown units (premiumOnly,
          // a handful of circles), so they stay locked, and every other lesson is free to play.
          <View style={styles.appHint} testID="shop-app-hint" onLayout={(event) => focusPremium(event.nativeEvent.layout.y)}>
            <View style={styles.appHintHead}>
              <Icon name="crown" size={30} />
              <View style={styles.appHintTextWrap}>
                <Text style={styles.appHintText} testID="shop-app-hint-line">
                  Almost every lesson is free!
                </Text>
              </View>
            </View>
            {onDone ? <GameButton label="Keep learning" size="md" fullWidth onPress={onDone} testID="shop-keep-learning" /> : null}
          </View>
        ) : null}

        <View style={styles.footer}>
          {premium ? (
            <Tappable onPress={() => openGated(MANAGE_SUBSCRIPTION_URL)} accessibilityRole="link" style={styles.restore} testID="shop-manage">
              <Text style={styles.restoreText}>Manage subscription</Text>
            </Tappable>
          ) : null}
          {canBuyWithMoney ? (
            <Tappable
              onPress={restore}
              disabled={busy}
              sound={busy ? false : undefined}
              style={[styles.restore, busy ? styles.dimBusy : null]}
              testID="shop-restore"
              accessibilityLabel="Restore purchases"
            >
              {busy && pending === "restore" ? <ActivityIndicator color={colors.gem} size="small" /> : null}
              <Text style={styles.restoreText}>Restore purchases</Text>
            </Tappable>
          ) : null}
          {premium || !plans.length ? null : <Text style={styles.legal}>Renews automatically. Cancel anytime in store settings.</Text>}
          <View style={styles.links}>
            <Tappable onPress={() => openGated(legalLinks.terms)} accessibilityRole="link" style={styles.link} testID="shop-terms">
              <Text style={styles.linkText}>Terms</Text>
            </Tappable>
            <Tappable onPress={() => openGated(legalLinks.privacy)} accessibilityRole="link" style={styles.link} testID="shop-privacy">
              <Text style={styles.linkText}>Privacy</Text>
            </Tappable>
          </View>
        </View>
      </ScrollView>
      {gate}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.snow
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32
  },
  title: {
    ...text.h1
  },
  balance: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.lg,
    backgroundColor: lighten(colors.gem, 0.88),
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: lighten(colors.gem, 0.6),
    borderBottomColor: lighten(colors.gem, 0.35)
  },
  balanceGem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 1
  },
  balanceValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 40,
    lineHeight: 48,
    color: colors.gemLip,
    flexShrink: 1
  },
  balanceHearts: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: colors.white
  },
  heartsValue: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.heart
  },
  section: {
    marginTop: 20,
    gap: 10
  },
  sectionHeader: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    color: colors.ink
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  itemIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center"
  },
  heartStack: {
    width: 40,
    height: 34,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  heartBack: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0.85
  },
  plusBadge: {
    position: "absolute",
    right: -6,
    bottom: -2,
    paddingHorizontal: 5,
    minWidth: 26,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.heartLip,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  plusText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 15,
    color: colors.white
  },
  itemText: {
    flex: 1,
    minWidth: 0
  },
  itemName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.ink,
    flexShrink: 1
  },
  itemLine: {
    ...text.tiny,
    fontSize: 14,
    lineHeight: 19,
    flexShrink: 1
  },
  itemLineWrap: {
    alignSelf: "flex-start",
    maxWidth: "100%"
  },
  itemLineShort: {
    color: colors.heartLip
  },
  itemLineFull: {
    color: colors.correctInk
  },
  itemLineFlash: {
    fontFamily: fonts.bodyHeavy
  },
  itemButton: {
    flexShrink: 0,
    maxWidth: 124
  },
  dimBusy: {
    opacity: 0.6
  },
  dimMuted: {
    opacity: 0.5
  },
  spinner: {
    minWidth: 76,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  premium: {
    padding: 16,
    gap: 12,
    borderRadius: radii.xl,
    backgroundColor: colors.gold,
    borderBottomWidth: 6,
    borderBottomColor: colors.goldLip
  },
  premiumHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  crownCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  premiumTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 28,
    lineHeight: 34,
    flexShrink: 1
  },
  benefits: {
    gap: 8
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  benefitIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  benefitText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 16,
    lineHeight: 21,
    flex: 1,
    minWidth: 0
  },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: radii.tile,
    backgroundColor: colors.white,
    borderBottomWidth: 4,
    borderBottomColor: lighten(colors.goldLip, 0.2)
  },
  planText: {
    flex: 1,
    minWidth: 0,
    alignItems: "flex-start",
    gap: 4
  },
  planName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 23,
    color: colors.ink,
    flexShrink: 1
  },
  planBadge: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: radii.pill,
    backgroundColor: colors.heartLip,
    maxWidth: "100%"
  },
  planBadgeText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 12,
    lineHeight: 18,
    color: colors.white,
    textTransform: "uppercase",
    letterSpacing: 0.4
  },
  activeCard: {
    marginTop: 16,
    padding: 16,
    gap: 14,
    borderRadius: radii.xl,
    backgroundColor: lighten(colors.gold, 0.75),
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.gold,
    borderBottomColor: colors.goldLip
  },
  activeHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  activeText: {
    flex: 1,
    minWidth: 0,
    gap: 2
  },
  activeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  activeTitle: {
    color: darken(colors.gold, 0.62)
  },
  activeLine: {
    ...text.bodyBold,
    color: darken(colors.gold, 0.55),
    flexShrink: 1
  },
  appHint: {
    marginTop: 20,
    gap: 12,
    padding: 14,
    borderRadius: radii.tile,
    backgroundColor: lighten(colors.gold, 0.75),
    borderWidth: 2,
    borderColor: lighten(colors.gold, 0.35)
  },
  appHintHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  appHintTextWrap: {
    flex: 1,
    minWidth: 0
  },
  appHintText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: darken(colors.gold, 0.6),
    flexShrink: 1
  },
  footer: {
    marginTop: 18,
    alignItems: "center",
    gap: 4
  },
  restore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    minHeight: 44
  },
  restoreText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 0.4,
    color: colors.gemLip,
    textTransform: "uppercase"
  },
  legal: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 16,
    color: colors.inkSoft,
    textAlign: "center",
    maxWidth: 320
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 6
  },
  link: {
    paddingHorizontal: 10,
    minHeight: 40,
    justifyContent: "center"
  },
  linkText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
    textDecorationLine: "underline"
  }
});
