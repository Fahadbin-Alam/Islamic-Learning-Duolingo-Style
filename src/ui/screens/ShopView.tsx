import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { UiStrings } from "../../i18n";
import { VIDEOS_PER_HEART, canSellInStore, legalLinks, monetizationMode, planForProduct, storePlatform } from "../../services/monetizationConfig";
import type { LearningSection, ShopItem, UserProfile } from "../../types";
import { GameButton } from "../GameButton";
import { DateCoin } from "../DateCoin";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn, useShake } from "../PopIn";
import { feedback } from "../sound";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { FormattedCount, formatNumber } from "./FormattedCount";
import { useGrownUpGate } from "./GrownUpGate";
import { SecretTap } from "./SecretTap";
import { PROFILE_ICONS, activeIcon, ownsIcon, type ProfileIconId } from "../../services/ummah";
import { SECRET_HINT_PRICE, nextHintSecret } from "../../data/secretLessons";
import { MAX_STREAK_FREEZES, STREAK_FREEZE_PRICE, streakFreezeCount } from "../../services/streakFreeze";
import { HADITH_CARD_PRICE, HADITH_TREASURES, nextHadith, ownedHadith } from "../../data/hadithTreasures";
import { t } from "../../i18n";

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
  canWatchAds?: boolean;
  /** Videos already watched toward the next free heart (three make one). */
  heartVideosWatched?: number;
  /** Scroll to this part once the shop opens. "premium": the Premium card (or the "can't be bought here" note). */
  focus?: "premium";
  /** Profile icons for gems: buy one (it goes on at once), or switch to an owned one; undefined goes back to initials. */
  onBuyIcon?: (id: ProfileIconId) => void;
  onWearIcon?: (id: ProfileIconId | undefined) => void;
  /** Buys the clue to the next secret lesson. */
  onBuySecretHint?: () => void;
  /** Buys one streak freeze with gems. */
  onBuyStreakFreeze?: () => void;
  /** Opens the hadith chest: the next hadith card for gems. */
  onBuyHadith?: () => void;
  /** Opens "My hadith", the cards bought so far. */
  onOpenHadith?: () => void;
};

const MANAGE_SUBSCRIPTION_URL =
  Platform.OS === "android" ? "https://play.google.com/store/account/subscriptions" : "https://apps.apple.com/account/subscriptions";

/** Same rule as TopicApp's isPremiumUser: any plan, so no ads. */
function isPremium(user: UserProfile) {
  return Boolean(user.activeSubscriptionId);
}

/** Same rule as hasPremiumLessons: Premium learners are not sold anything again. "No ads" learners still buy hearts. */
function isFullPremium(user: UserProfile) {
  return planForProduct(user.activeSubscriptionId) === "premium";
}

export function isNoAdsPlan(item: ShopItem) {
  return Boolean(item.tier) && planForProduct(item.productId ?? item.id) === "no_ads";
}

/** Same rule as canSpendGems in src/api/islamicLearningApi.ts. */
function canSpend(user: UserProfile, item: ShopItem) {
  return item.currencyType === "gems" && !user.hearts.unlimited && user.gems >= item.price && user.hearts.current < user.hearts.max;
}

/** Same rule as TopicApp's shop handler: one more heart would go past the most hearts, so it would give nothing. */
function heartsFull(user: UserProfile) {
  return !user.hearts.unlimited && user.hearts.current >= user.hearts.max;
}

/** The video that gives a heart, not gems. */
function isHeartVideo(item: ShopItem) {
  return item.type === "rewarded_ad" && !item.gemsGranted;
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
  if (item.currencyType === "rewarded_ad") return t("Watch");
  if (item.currencyType === "gems") return formatNumber(item.price);
  const price = storePrices[item.id] ?? `$${item.price.toFixed(2)}`;
  if (item.durationDays) return `${price}${item.durationDays >= 365 ? t("/yr") : t("/mo")}`;
  return price;
}

/** Short kid-friendly names; the catalog names are written for store listings. */
export function displayName(item: ShopItem) {
  switch (item.type) {
    case "monthly_membership":
      return t("Monthly");
    case "yearly_membership":
      return t("Yearly");
    case "gem_heart_refill":
      return t("Refill hearts");
    case "rewarded_ad":
      return item.gemsGranted ? t("Free dates") : t("Free heart");
    default:
      return item.name;
  }
}

function shortLine(item: ShopItem, user: UserProfile, heartVideosWatched: number) {
  if (item.refillsHearts) return t("Fill to {count}", { count: user.hearts.max });
  if (item.type === "rewarded_ad" && item.gemsGranted) return t("Watch: +{count} dates", { count: item.gemsGranted });
  if (item.type === "rewarded_ad") {
    return heartVideosWatched
      ? t("{count} of {total} videos watched", { count: heartVideosWatched, total: VIDEOS_PER_HEART })
      : t("{total} videos = 1 heart", { total: VIDEOS_PER_HEART });
  }
  if (item.heartsGranted) return t("+{count} hearts", { count: item.heartsGranted });
  if (item.gemsGranted) return t("+{count} dates", { count: formatNumber(item.gemsGranted) });
  return item.localizedDescription;
}

export function badgeText(item: ShopItem) {
  if (!item.highlightBadge) return undefined;
  const percent = item.highlightBadge.match(/\d+\s*%/);
  return percent ? t("Save {percent}", { percent: percent[0].replace(/\s/g, "") }) : item.highlightBadge;
}

const BENEFITS: { icon: IconName; label: string }[] = [
  { icon: "sparkle", label: "No ads" },
  { icon: "infinity", label: "Unlimited hearts" },
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
  /** Videos watched toward the next free heart. */
  heartVideosWatched?: number;
};

const NUDGE_MS = 1400;

/** While busy, the pressed button spins and every other button dims. */
function BuyButton({ item, busy, pendingId, onBuy, label, variant, icon, muted, accessibilityLabel }: RowProps & { label: string; variant: "blue" | "gold" | "primary"; icon?: IconName; muted?: boolean; accessibilityLabel: string }) {
  if (busy && pendingId === item.id) {
    return (
      <View style={[styles.spinner, styles.itemButton]} testID={`shop-pending-${item.id}`} accessibilityLabel={t("Working")}>
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
        color={variant === "blue" ? colors.date : undefined}
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
  const { item, user, storePrices, onBuy, busy, heartVideosWatched = 0 } = props;
  const gems = item.currencyType === "gems";
  // Full hearts comes first: a learner who needs nothing is never told to save gems for it. The heart video
  // follows the same rule, so no one sits through a video that gives nothing.
  const full = (gems || isHeartVideo(item)) && heartsFull(user);
  // An unaffordable or not-needed item stays pressable but never buys: its line already says why.
  const muted = (gems && !canSpend(user, item)) || full;
  const short = gems && !full && user.gems < item.price ? item.price - user.gems : 0;
  const label = formatShopPrice(item, storePrices);
  const name = displayName(item);
  const line = full ? t("Hearts are full") : short ? t("Need {count} more", { count: formatNumber(short) }) : shortLine(item, user, heartVideosWatched);
  const { style: shakeStyle, shake } = useShake(6);
  const buttonPop = useRef(new Animated.Value(1)).current;
  const rowScale = useRef(new Animated.Value(1)).current;
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

  // The whole card squishes a little under a finger, wherever on it the tap lands (but the BUY button presses itself).
  const squish = (toValue: number) => Animated.spring(rowScale, { toValue, friction: 5, tension: 300, useNativeDriver: true }).start();
  const rowTap = { onPress: pressRow, sound: false, hapticKind: false, pressScale: 1, onPressIn: () => squish(0.98), onPressOut: () => squish(1) } as const;

  // The row's own button (its icon, name and line) and the BUY button sit side by side, never one inside the other,
  // so a screen reader reaches each of them, and on the web neither is a button inside a button.
  return (
    <Animated.View style={[styles.item, { transform: [{ scale: rowScale }] }]} testID={`shop-row-${item.id}`}>
      {/* Taps on the card's edges and around its BUY button answer like the row; screen readers skip it. */}
      <Tappable {...rowTap} hiddenFromAccessibility style={styles.itemEdge} testID={`shop-row-edge-${item.id}`} />
      <Tappable {...rowTap} style={styles.itemMain} accessibilityLabel={`${name}, ${line}`} testID={`shop-item-${item.id}`}>
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
      </Tappable>
      <Animated.View style={[shakeStyle, { transform: [...shakeStyle.transform, { scale: buttonPop }] }]}>
        <BuyButton
          {...props}
          onBuy={press}
          label={label}
          variant={gems ? "blue" : item.type === "rewarded_ad" ? "gold" : "primary"}
          icon={gems ? (short ? "lock" : "date") : item.type === "rewarded_ad" ? "play" : undefined}
          muted={muted}
          accessibilityLabel={`${name}, ${gems ? `${t("{count} dates", { count: formatNumber(item.price) })}${full ? t(", hearts are full") : short ? t(", not enough dates") : ""}` : item.type === "rewarded_ad" ? `${t("watch a video")}${full ? t(", hearts are full") : ""}` : label}`}
        />
      </Animated.View>
    </Animated.View>
  );
}

export function BenefitList({ ink, skipHearts }: { ink: string; skipHearts?: boolean }) {
  return (
    <View style={styles.benefits}>
      {BENEFITS.filter((benefit) => !skipHearts || benefit.icon !== "infinity").map((benefit) => (
        <View key={benefit.label} style={styles.benefitRow}>
          <View style={styles.benefitIcon}>
            <Icon name={benefit.icon} size={18} color={benefit.icon === "infinity" ? colors.heart : undefined} />
          </View>
          <Text style={[styles.benefitText, { color: ink }]} numberOfLines={1}>
            {t(benefit.label)}
          </Text>
        </View>
      ))}
    </View>
  );
}

/** A plan card: "No ads" (ads only) or Premium (no ads, unlimited hearts, every lesson). */
function PremiumCard({ plans, kind = "premium", ...rest }: Omit<RowProps, "item"> & { plans: ShopItem[]; kind?: "premium" | "no_ads" }) {
  const ink = darken(colors.gold, 0.62);
  const title = kind === "no_ads" ? t("No ads") : t("Premium");
  return (
    <View style={styles.premium} testID={kind === "no_ads" ? "shop-no-ads" : "shop-premium"}>
      <View style={styles.premiumHead}>
        <View style={styles.crownCircle}>
          <Icon name={kind === "no_ads" ? "sparkle" : "crown"} size={40} />
        </View>
        <Text style={[styles.premiumTitle, { color: ink }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      {/* "No ads" is its whole benefit, and its title says so. */}
      {kind === "no_ads" ? null : <BenefitList ink={ink} />}
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
            <BuyButton {...rest} item={plan} label={price} variant="primary" accessibilityLabel={`${title} ${displayName(plan)}, ${price}`} />
          </View>
        );
      })}
    </View>
  );
}

/** Profile icons: owned ones put on with a tap, others bought with gems. */
function IconShop({ user, onBuy, onWear }: { user: UserProfile; onBuy: (id: ProfileIconId) => void; onWear?: (id: ProfileIconId | undefined) => void }) {
  const wearing = activeIcon(user);
  const { style: shakeStyle, shake } = useShake(6);
  const [shaking, setShaking] = useState<string | undefined>(undefined);
  const press = (id: ProfileIconId, price: number) => {
    if (ownsIcon(user, id)) {
      feedback("soft_ui", "light");
      onWear?.(wearing === id ? undefined : id);
      return;
    }
    if (user.gems < price) {
      setShaking(id);
      shake();
      feedback("wrong", "error");
      return;
    }
    feedback("unlock", "success");
    onBuy(id);
  };
  return (
    <View style={styles.section} testID="shop-icons">
      <Text style={styles.sectionHeader}>{t("Icons")}</Text>
      <View style={styles.iconGrid}>
        {PROFILE_ICONS.map(({ id, price }) => {
          const owned = ownsIcon(user, id);
          const on = wearing === id;
          return (
            <Animated.View key={id} style={[styles.iconCell, shaking === id ? shakeStyle : null]}>
              <Tappable
                onPress={() => press(id, price)}
                sound={false}
                style={[styles.iconTile, on ? styles.iconTileOn : owned ? styles.iconTileOwned : null]}
                accessibilityLabel={on ? t("Wearing") : owned ? t("Wear") : t("{count} dates", { count: formatNumber(price) })}
                accessibilityState={{ selected: on }}
                testID={`shop-icon-${id}`}
              >
                <Icon name={id} size={38} />
                {on ? (
                  <View style={styles.iconTag}>
                    <Icon name="check" size={14} color={colors.white} />
                  </View>
                ) : owned ? (
                  <Text style={styles.iconOwned} numberOfLines={1}>{t("Wear")}</Text>
                ) : (
                  <View style={styles.iconPrice}>
                    <Icon name="date" size={14} />
                    <Text style={styles.iconPriceText} numberOfLines={1}>{formatNumber(price)}</Text>
                  </View>
                )}
              </Tappable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

/** The clue to the next secret lesson. Gone once every secret is found or hinted. */
function SecretHintRow({ user, onBuy }: { user: UserProfile; onBuy: () => void }) {
  const next = nextHintSecret(user);
  const { style: shakeStyle, shake } = useShake(6);
  if (!next) return null;
  const short = Math.max(0, SECRET_HINT_PRICE - user.gems);
  const press = () => {
    if (short) {
      shake();
      feedback("wrong", "error");
      return;
    }
    onBuy();
  };
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{t("Secrets")}</Text>
      <View style={[styles.item, styles.hintRow]} testID="shop-secret-hint">
        <View style={[styles.itemIcon, { backgroundColor: lighten(colors.gold, 0.8) }]}>
          <Icon name="lantern" size={34} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemName} numberOfLines={2}>{t("Secret clue")}</Text>
          <Text style={[styles.itemLine, short ? styles.itemLineShort : null]} numberOfLines={2}>
            {short ? t("Need {count} more", { count: formatNumber(short) }) : t("Where to find a secret lesson")}
          </Text>
        </View>
        <Animated.View style={shakeStyle}>
          <GameButton label={formatNumber(SECRET_HINT_PRICE)} size="sm" icon={short ? "lock" : "date"} variant="blue" color={colors.date} sound={short ? false : undefined} onPress={press} testID="shop-buy-secret-hint" />
        </Animated.View>
      </View>
    </View>
  );
}

/** A streak freeze for gems, up to two held at once. */
function StreakFreezeRow({ user, onBuy }: { user: UserProfile; onBuy: () => void }) {
  const { style: shakeStyle, shake } = useShake(6);
  const owned = streakFreezeCount(user);
  const full = owned >= MAX_STREAK_FREEZES;
  const short = full ? 0 : Math.max(0, STREAK_FREEZE_PRICE - user.gems);
  const press = () => {
    if (short) {
      shake();
      feedback("wrong", "error");
      return;
    }
    onBuy();
  };
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{t("Streak")}</Text>
      <View style={[styles.item, styles.hintRow]} testID="shop-streak-freeze">
        <View style={[styles.itemIcon, { backgroundColor: lighten(colors.gem, 0.85) }]}>
          <Icon name="freeze" size={34} />
        </View>
        <View style={styles.itemText}>
          <Text style={styles.itemName} numberOfLines={2}>{t("Streak freeze")}</Text>
          <Text style={[styles.itemLine, short ? styles.itemLineShort : null]} numberOfLines={2} testID="shop-streak-freeze-line">
            {short ? t("Need {count} more", { count: formatNumber(short) }) : t("{count} of {max} streak freezes", { count: owned, max: MAX_STREAK_FREEZES })}
          </Text>
        </View>
        {full ? (
          <View style={styles.freezeFull} testID="shop-streak-freeze-full">
            <Icon name="check" size={24} />
          </View>
        ) : (
          <Animated.View style={shakeStyle}>
            <GameButton
              label={formatNumber(STREAK_FREEZE_PRICE)}
              size="sm"
              icon={short ? "lock" : "date"}
              variant="blue"
              color={colors.date}
              sound={short ? false : undefined}
              onPress={press}
              accessibilityLabel={t("Buy a streak freeze for {count} dates", { count: formatNumber(STREAK_FREEZE_PRICE) })}
              testID="shop-buy-streak-freeze"
            />
          </Animated.View>
        )}
      </View>
    </View>
  );
}

/** The hadith chest (a new hadith card for gems) and "My hadith". The chest row goes once every card is owned. */
function HadithRows({ user, onBuy, onOpen }: { user: UserProfile; onBuy: () => void; onOpen?: () => void }) {
  const next = nextHadith(user);
  const owned = ownedHadith(user).length;
  const { style: shakeStyle, shake } = useShake(6);
  const short = Math.max(0, HADITH_CARD_PRICE - user.gems);
  const press = () => {
    if (short) {
      shake();
      feedback("wrong", "error");
      return;
    }
    onBuy();
  };
  return (
    <View style={styles.section} testID="shop-hadith">
      <Text style={styles.sectionHeader}>{t("Hadith")}</Text>
      {next ? (
        <View style={[styles.item, styles.hintRow]} testID="shop-hadith-chest">
          <View style={[styles.itemIcon, { backgroundColor: lighten(colors.gem, 0.85) }]}>
            <Icon name="chest" size={34} />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemName} numberOfLines={2}>{t("Hadith chest")}</Text>
            <Text style={[styles.itemLine, short ? styles.itemLineShort : null]} numberOfLines={2} testID="shop-hadith-line">
              {short ? t("Need {count} more", { count: formatNumber(short) }) : t("Open a new hadith")}
            </Text>
          </View>
          <Animated.View style={shakeStyle}>
            <GameButton label={formatNumber(HADITH_CARD_PRICE)} size="sm" icon={short ? "lock" : "date"} variant="blue" color={colors.date} sound={short ? false : undefined} onPress={press} testID="shop-buy-hadith" />
          </Animated.View>
        </View>
      ) : null}
      {owned && onOpen ? (
        <Tappable onPress={onOpen} style={[styles.item, styles.hintRow]} accessibilityLabel={`${t("My hadith")}, ${t("{count} of {total} collected", { count: owned, total: HADITH_TREASURES.length })}`} testID="shop-my-hadith">
          <View style={[styles.itemIcon, { backgroundColor: lighten(colors.gold, 0.8) }]}>
            <Icon name="bookOpen" size={34} />
          </View>
          <View style={styles.itemText}>
            <Text style={styles.itemName} numberOfLines={2}>{t("My hadith")}</Text>
            <Text style={styles.itemLine} numberOfLines={2}>
              {t("{count} of {total} collected", { count: owned, total: HADITH_TREASURES.length })}
            </Text>
          </View>
          <Icon name="chevronRight" size={20} color={colors.inkSoft} />
        </Tappable>
      ) : null}
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
  canBuyWithMoney = canSellInStore(monetizationMode, storePlatform(Platform.OS)),
  canWatchAds = monetizationMode !== "disabled",
  heartVideosWatched = 0,
  focus,
  onBuyIcon,
  onWearIcon,
  onBuySecretHint,
  onBuyStreakFreeze,
  onBuyHadith,
  onOpenHadith
}: ShopViewProps) {
  const premium = isPremium(user);
  const fullPremium = isFullPremium(user);
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

  // Premium needs nothing more. "No ads" still buys hearts and gems, and can move up to Premium, but is
  // not offered videos (they are ads) or its own plan again.
  const visible = fullPremium
    ? []
    : items.filter((item) => (item.currencyType === "rewarded_ad" ? canWatchAds : canBuyWithMoney || !needsStore(item)) && !(premium && (item.type === "rewarded_ad" || isNoAdsPlan(item))));
  const hearts = visible.filter((item) => !item.tier && (item.refillsHearts || item.heartsGranted || (item.type === "rewarded_ad" && !item.gemsGranted)));
  const gemPacks = visible.filter((item) => !item.tier && !hearts.includes(item) && item.gemsGranted);
  const powerUps = visible.filter((item) => !item.tier && !hearts.includes(item) && !gemPacks.includes(item));
  const plans = visible.filter((item) => item.tier && item.tier !== "free");
  const noAdsPlans = plans.filter(isNoAdsPlan);
  const premiumPlans = plans.filter((item) => !isNoAdsPlan(item));

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
  const rowProps = { user, storePrices, busy, pendingId: pending, onBuy: buy, heartVideosWatched };

  return (
    <View style={styles.root}>
      <ScrollView ref={scrollRef} style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="shop-view">
        <Text style={styles.title}>{t("Shop")}</Text>

        <PopIn from="scale">
          <View style={styles.balance} testID="shop-balance">
            <View style={styles.balanceGem}>
              <SecretTap spot="shop_gem">
                <Animated.View style={{ transform: [{ scale: gemPop }] }}>
                  <DateCoin size={46} playKey={user.gems} idle />
                </Animated.View>
              </SecretTap>
              {/* Formatted as in the top bar above it (and on the Me tab): "1,000", "12,345", then "120k". */}
              <FormattedCount value={user.gems} compact style={styles.balanceValue} testID="shop-gems" />
            </View>
            <Animated.View
              style={[styles.balanceHearts, { transform: [{ scale: heartsPop }] }]}
              accessibilityLabel={user.hearts.unlimited ? t("Unlimited hearts") : t("{count} of {max} hearts", { count: user.hearts.current, max: user.hearts.max })}
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
                    <Icon name={fullPremium ? "crown" : "sparkle"} size={28} />
                    <Text style={[styles.premiumTitle, styles.activeTitle]}>{fullPremium ? t("Premium") : t("No ads")}</Text>
                  </View>
                  {fullPremium ? (
                    <Text style={styles.activeLine} numberOfLines={2}>
                      {t("Unlimited hearts!")}
                    </Text>
                  ) : null}
                </View>
              </View>
              {fullPremium ? <BenefitList ink={darken(colors.gold, 0.62)} skipHearts /> : null}
            </View>
          </PopIn>
        ) : null}

        {hearts.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>{t("Hearts")}</Text>
            {hearts.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </View>
        ) : null}

        {gemPacks.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>{t("Dates")}</Text>
            {gemPacks.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </View>
        ) : null}

        {powerUps.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>{t("Power-ups")}</Text>
            {powerUps.map((item) => (
              <ItemRow key={item.id} item={item} {...rowProps} />
            ))}
          </View>
        ) : null}

        {onBuyStreakFreeze ? <StreakFreezeRow user={user} onBuy={onBuyStreakFreeze} /> : null}

        {onBuyHadith ? <HadithRows user={user} onBuy={onBuyHadith} onOpen={onOpenHadith} /> : null}

        {onBuyIcon ? <IconShop user={user} onBuy={onBuyIcon} onWear={onWearIcon} /> : null}

        {onBuySecretHint ? <SecretHintRow user={user} onBuy={onBuySecretHint} /> : null}

        {noAdsPlans.length ? (
          <View style={styles.section}>
            <PremiumCard plans={noAdsPlans} kind="no_ads" {...rowProps} />
          </View>
        ) : null}

        {premiumPlans.length ? (
          <View style={styles.section} onLayout={(event) => focusPremium(event.nativeEvent.layout.y)}>
            <PremiumCard plans={premiumPlans} {...rowProps} />
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
                  {t("Almost every lesson is free!")}
                </Text>
              </View>
            </View>
            {onDone ? <GameButton label={t("Keep learning")} size="md" fullWidth onPress={onDone} testID="shop-keep-learning" /> : null}
          </View>
        ) : null}

        <View style={styles.footer}>
          {premium ? (
            <Tappable onPress={() => openGated(MANAGE_SUBSCRIPTION_URL)} accessibilityRole="link" style={styles.restore} testID="shop-manage">
              <Text style={styles.restoreText}>{t("Manage subscription")}</Text>
            </Tappable>
          ) : null}
          {canBuyWithMoney ? (
            <Tappable
              onPress={restore}
              disabled={busy}
              sound={busy ? false : undefined}
              style={[styles.restore, busy ? styles.dimBusy : null]}
              testID="shop-restore"
              accessibilityLabel={t("Restore purchases")}
            >
              {busy && pending === "restore" ? <ActivityIndicator color={colors.gem} size="small" /> : null}
              <Text style={styles.restoreText}>{t("Restore purchases")}</Text>
            </Tappable>
          ) : null}
          {!plans.length ? null : <Text style={styles.legal}>{t("Renews automatically. Cancel anytime in store settings.")}</Text>}
          <View style={styles.links}>
            <Tappable onPress={() => openGated(legalLinks.terms)} accessibilityRole="link" style={styles.link} testID="shop-terms">
              <Text style={styles.linkText}>{t("Terms")}</Text>
            </Tappable>
            <Tappable onPress={() => openGated(legalLinks.privacy)} accessibilityRole="link" style={styles.link} testID="shop-privacy">
              <Text style={styles.linkText}>{t("Privacy")}</Text>
            </Tappable>
          </View>
        </View>
      </ScrollView>
      {gate}
    </View>
  );
}

const styles = StyleSheet.create({
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  iconCell: {
    width: "30%",
    flexGrow: 1
  },
  iconTile: {
    alignItems: "center",
    gap: 4,
    paddingVertical: 10,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  iconTileOwned: {
    borderColor: lighten(colors.gem, 0.45)
  },
  iconTileOn: {
    borderColor: colors.gem,
    backgroundColor: lighten(colors.gem, 0.88)
  },
  iconTag: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gem
  },
  iconOwned: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    color: colors.gemLip
  },
  iconPrice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  iconPriceText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    color: colors.dateLip
  },
  hintRow: {
    gap: 10
  },
  freezeFull: {
    width: 44,
    alignItems: "center"
  },
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
    backgroundColor: lighten(colors.date, 0.9),
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: lighten(colors.date, 0.65),
    borderBottomColor: lighten(colors.date, 0.4)
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
    color: colors.dateLip,
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
  itemEdge: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -4,
    borderRadius: radii.tile
  },
  itemMain: {
    flex: 1,
    minWidth: 0,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    gap: 12
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
