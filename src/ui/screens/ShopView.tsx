import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { UiStrings } from "../../i18n";
import { legalLinks } from "../../services/monetizationConfig";
import type { LearningSection, ShopItem, UserProfile } from "../../types";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
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
  /** Tabs replace the old back button; kept optional for the old call site. */
  onDone?: () => void;
  /** Opens Terms / Privacy / Manage subscription (after the grown-up gate). Default: Linking.openURL. */
  onOpenLink?: (url: string) => void;
  /** Item id (or "restore") whose button spins while busy. Default: the last one pressed here. */
  pendingItemId?: string;
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
        sound={busy ? false : undefined}
        onPress={() => !busy && onBuy(item)}
        testID={`shop-buy-${item.id}`}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

function ItemRow(props: RowProps) {
  const { item, user, storePrices } = props;
  const gems = item.currencyType === "gems";
  // An unaffordable gem item still opens the "why not" alert, so it is only dimmed.
  const muted = gems && !canSpend(user, item);
  const short = gems && user.gems < item.price ? item.price - user.gems : 0;
  const full = gems && !short && !user.hearts.unlimited && user.hearts.current >= user.hearts.max;
  const label = formatShopPrice(item, storePrices);
  const name = displayName(item);
  const line = short ? `Need ${formatNumber(short)} more` : full ? "Hearts are full" : shortLine(item, user);
  return (
    <View style={styles.item} testID={`shop-item-${item.id}`}>
      <ItemIcon item={item} />
      <View style={styles.itemText}>
        <Text style={styles.itemName} numberOfLines={2}>
          {name}
        </Text>
        <Text style={[styles.itemLine, short ? styles.itemLineShort : null]} numberOfLines={2}>
          {line}
        </Text>
      </View>
      <BuyButton
        {...props}
        label={label}
        variant={gems ? "blue" : item.type === "rewarded_ad" ? "gold" : "primary"}
        icon={gems ? (short ? "lock" : "gem") : item.type === "rewarded_ad" ? "play" : undefined}
        muted={muted}
        accessibilityLabel={`${name}, ${gems ? `${item.price} gems${short ? ", not enough gems" : full ? ", hearts are full" : ""}` : item.type === "rewarded_ad" ? "watch a video" : label}`}
      />
    </View>
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

/** Shop tab: gem balance, hearts, gem packs and Premium plans. Real money sits behind a grown-up gate. */
export function ShopView({ user, items, storePrices, busy, section, onUseItem, onRestore, onOpenLink, pendingItemId }: ShopViewProps) {
  const premium = isPremium(user);
  const [pendingId, setPendingId] = useState<string | undefined>(undefined);
  const { ask, gate } = useGrownUpGate();

  useEffect(() => {
    if (!busy) setPendingId(undefined);
  }, [busy]);

  const visible = premium ? [] : items;
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
      <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} testID="shop-view">
        <Text style={styles.title}>Shop</Text>

        <PopIn from="scale">
          <View style={styles.balance}>
            <View style={styles.balanceGem}>
              <Icon name="gem" size={46} />
              <FormattedCount value={user.gems} style={styles.balanceValue} />
            </View>
            <View style={styles.balanceHearts} accessibilityLabel={user.hearts.unlimited ? "Unlimited hearts" : `${user.hearts.current} of ${user.hearts.max} hearts`}>
              <Icon name="heart" size={26} />
              {user.hearts.unlimited ? (
                <Icon name="infinity" size={26} color={colors.heart} />
              ) : (
                <Text style={styles.heartsValue} numberOfLines={1}>{`${user.hearts.current}/${user.hearts.max}`}</Text>
              )}
            </View>
          </View>
        </PopIn>

        {premium ? (
          <PopIn delay={80} from="up">
            <View style={styles.activeCard} testID="shop-premium-active">
              <View style={styles.activeHead}>
                <Mascot variant={section.mascot} mood="cheer" size={96} accent={section.accentColor} />
                <View style={styles.activeText}>
                  <View style={styles.activeTitleRow}>
                    <Icon name="crown" size={28} />
                    <Text style={[styles.premiumTitle, styles.activeTitle]} numberOfLines={1}>
                      Premium
                    </Text>
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
          <View style={styles.section}>
            <PremiumCard plans={plans} {...rowProps} />
          </View>
        ) : null}

        <View style={styles.footer}>
          {premium ? (
            <Tappable onPress={() => openGated(MANAGE_SUBSCRIPTION_URL)} accessibilityRole="link" style={styles.restore} testID="shop-manage">
              <Text style={styles.restoreText}>Manage subscription</Text>
            </Tappable>
          ) : null}
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
          {premium ? null : <Text style={styles.legal}>Renews automatically. Cancel anytime in your App Store or Google Play settings.</Text>}
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
  itemLineShort: {
    color: colors.heartLip
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
