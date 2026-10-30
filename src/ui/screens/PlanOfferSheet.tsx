import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import type { PlanDetails, ShopItem } from "../../types";
import { legalLinks } from "../../services/monetizationConfig";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { useGrownUpGate } from "./GrownUpGate";
import { BenefitList, badgeText, displayName, formatShopPrice, isNoAdsPlan } from "./ShopView";
import { useBackToClose, useOpenSound } from "./sheetParts";
import { t } from "../../i18n";

export type PlanOfferSheetProps = {
  visible: boolean;
  /**
   * "hearts": opened because the hearts ran out; "lessons": after a few finished lessons; "unit": a Premium unit was
   * tapped. Only the line under the title changes.
   */
  reason: "hearts" | "lessons" | "unit";
  /** The shop's items: the plans are picked out of them. */
  items: ShopItem[];
  storePrices: Record<string, string>;
  /** The free trial and price per month the store gives each plan (see MonetizationClient.getPlanDetails). */
  planDetails?: Record<string, PlanDetails>;
  /** The learner's streak: after a few lessons, a streak worth keeping is what the shield protects. */
  streakDays?: number;
  /** A purchase or restore is running: the pressed button spins and the others wait. */
  busy: boolean;
  mascotVariant: string;
  accent?: string;
  /** Called after the grown-up check. */
  onBuy: (item: ShopItem) => void;
  /** Called after the grown-up check. */
  onRestore: () => void;
  /** NO THANKS, the close button, the Android back button. */
  onClose: () => void;
  /** Opens Terms / Privacy (after the grown-up check). Default: Linking.openURL. */
  onOpenLink?: (url: string) => void;
};

/** A streak this long is worth a line of its own. */
const STREAK_WORTH_KEEPING = 3;

function reasonLine(reason: PlanOfferSheetProps["reason"], streakDays = 0) {
  if (reason === "hearts") return t("Never run out of hearts!");
  if (reason === "unit") return t("Unlock every unit!");
  return streakDays >= STREAK_WORTH_KEEPING ? t("Keep your {count}-day streak safe!", { count: streakDays }) : t("Learn with no limits!");
}

/**
 * The plans, offered by themselves now and then (see shouldOfferPlansAfterLesson), when hearts run out, and when a
 * Premium unit is tapped. The learner picks Yearly (picked first: the better deal, with the free trial) or Monthly,
 * then one big button buys it. Store rules: the close button and NO THANKS are there from the first frame, the full
 * price and how often it is charged are the biggest price on each plan, a trial says what it costs after, renewal and
 * the Terms and Privacy links sit under the plans, and RESTORE is offered. Real money waits for the grown-up check.
 */
export function PlanOfferSheet({ visible, reason, items, storePrices, planDetails = {}, streakDays, busy, mascotVariant, accent, onBuy, onRestore, onClose, onOpenLink }: PlanOfferSheetProps) {
  const { ask, gate } = useGrownUpGate();
  const [pendingId, setPendingId] = useState<string | undefined>(undefined);
  const [pickedId, setPickedId] = useState<string | undefined>(undefined);
  useBackToClose(visible && !busy, onClose);
  useOpenSound(visible, "soft_ui", `plan-offer-${reason}`);

  useEffect(() => {
    if (!busy) setPendingId(undefined);
  }, [busy]);

  const plans = items.filter((item) => item.tier && item.tier !== "free");
  // Yearly first: it is the better deal, and its badge says by how much.
  const byLength = (a: ShopItem, b: ShopItem) => (b.durationDays ?? 0) - (a.durationDays ?? 0);
  const premiumPlans = plans.filter((item) => !isNoAdsPlan(item)).sort(byLength);
  const noAdsPlan = plans.filter(isNoAdsPlan).sort((a, b) => (a.durationDays ?? 0) - (b.durationDays ?? 0))[0];
  const picked = premiumPlans.find((item) => item.id === pickedId) ?? premiumPlans[0];
  const ink = darken(colors.gold, 0.62);
  const trialOf = (item: ShopItem) => planDetails[item.id]?.trialDays ?? 0;

  const buy = (item: ShopItem) =>
    ask(() => {
      setPendingId(item.id);
      onBuy(item);
    });
  const restore = () =>
    ask(() => {
      setPendingId("restore");
      onRestore();
    });
  const open = (url: string) => ask(() => (onOpenLink ? onOpenLink(url) : void Linking.openURL(url).catch(() => undefined)));
  const close = () => {
    if (!busy) onClose();
  };

  const planChoice = (item: ShopItem) => {
    const price = formatShopPrice(item, storePrices);
    const badge = badgeText(item);
    const name = displayName(item);
    const trial = trialOf(item);
    const perMonth = planDetails[item.id]?.perMonth;
    const chosen = item.id === picked?.id;
    return (
      <Tappable
        key={item.id}
        onPress={() => !busy && setPickedId(item.id)}
        sound={busy ? false : "soft_ui"}
        pressScale={0.98}
        accessibilityRole="radio"
        accessibilityState={{ checked: chosen }}
        accessibilityLabel={[name, price, perMonth ? t("{price}/mo", { price: perMonth }) : "", trial ? t("{count} days free", { count: trial }) : "", badge ?? ""].filter(Boolean).join(", ")}
        style={[styles.plan, chosen ? styles.planChosen : null]}
        testID={`plan-offer-row-${item.id}`}
      >
        <View style={[styles.radio, chosen ? styles.radioOn : null]}>{chosen ? <Icon name="check" size={14} color={colors.white} /> : null}</View>
        <View style={styles.planText}>
          <View style={styles.planNameRow}>
            <Text style={styles.planName} numberOfLines={1}>
              {name}
            </Text>
            {badge ? (
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText} numberOfLines={1}>
                  {badge}
                </Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.planPrice} numberOfLines={1} testID={`plan-offer-price-${item.id}`}>
            {price}
          </Text>
          {perMonth || trial ? (
            <Text style={styles.planExtra} numberOfLines={2} testID={`plan-offer-extra-${item.id}`}>
              {[perMonth ? t("Just {price}/mo", { price: perMonth }) : "", trial ? t("{count} days free", { count: trial }) : ""].filter(Boolean).join(" · ")}
            </Text>
          ) : null}
        </View>
      </Tappable>
    );
  };

  const pickedTrial = picked ? trialOf(picked) : 0;
  const pickedPrice = picked ? formatShopPrice(picked, storePrices) : "";
  const pending = busy && picked && pendingId === picked.id;

  return (
    <Sheet visible={visible} onClose={close} dismissOnBackdrop={false} style={styles.tallPanel} testID="plan-offer-sheet">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
        <View style={styles.head}>
          <Mascot variant={mascotVariant} mood="cheer" size={72} accent={accent} />
          <View style={styles.headText}>
            <View style={styles.titleRow}>
              <Icon name="crown" size={26} />
              <Text style={[styles.title, { color: ink }]} numberOfLines={1}>
                {t("Premium")}
              </Text>
            </View>
            <Text style={styles.line} numberOfLines={2} testID="plan-offer-line">
              {reasonLine(reason, streakDays)}
            </Text>
          </View>
          <Tappable onPress={close} style={styles.close} accessibilityLabel={t("Close")} hitSlop={8} pressScale={0.9} testID="plan-offer-close">
            <Icon name="close" size={20} color={colors.inkSoft} />
          </Tappable>
        </View>
        <View style={styles.card}>
          <BenefitList ink={ink} />
        </View>
        {premiumPlans.length ? (
          <View style={styles.choices} accessibilityRole="radiogroup" testID="plan-offer-choices">
            {premiumPlans.map(planChoice)}
          </View>
        ) : null}
        {picked ? (
          <View style={styles.buyArea}>
            {pending ? (
              <View style={styles.bigSpinner} accessibilityLabel={t("Working")} testID={`plan-offer-pending-${picked.id}`}>
                <ActivityIndicator color={colors.green} />
              </View>
            ) : (
              <View style={busy ? styles.dim : null} pointerEvents={busy ? "none" : "auto"}>
                <GameButton
                  label={pickedTrial ? t("Start {count} free days", { count: pickedTrial }) : t("Get Premium")}
                  variant="primary"
                  fullWidth
                  sound={busy ? false : undefined}
                  onPress={() => !busy && buy(picked)}
                  accessibilityLabel={`${t("Premium")} ${displayName(picked)}, ${pickedPrice}`}
                  testID="plan-offer-buy"
                />
              </View>
            )}
            <Text style={styles.terms} testID="plan-offer-terms-line">
              {pickedTrial
                ? t("Free for {count} days, then {price}. Cancel before then and pay nothing.", { count: pickedTrial, price: pickedPrice })
                : t("{price}. Cancel anytime.", { price: pickedPrice })}
            </Text>
          </View>
        ) : null}
        {noAdsPlan ? (
          <View style={styles.noAds} testID="plan-offer-no-ads">
            <Icon name="sparkle" size={22} />
            <Text style={styles.noAdsText} numberOfLines={2}>
              {t("Just no ads")}
            </Text>
            {busy && pendingId === noAdsPlan.id ? (
              <View style={styles.spinner} accessibilityLabel={t("Working")} testID={`plan-offer-pending-${noAdsPlan.id}`}>
                <ActivityIndicator color={colors.green} />
              </View>
            ) : (
              <View style={busy ? styles.dim : null} pointerEvents={busy ? "none" : "auto"}>
                <GameButton
                  label={formatShopPrice(noAdsPlan, storePrices)}
                  size="sm"
                  variant="blue"
                  sound={busy ? false : undefined}
                  onPress={() => !busy && buy(noAdsPlan)}
                  accessibilityLabel={`${t("Just no ads")}, ${formatShopPrice(noAdsPlan, storePrices)}`}
                  testID={`plan-offer-buy-${noAdsPlan.id}`}
                />
              </View>
            )}
          </View>
        ) : null}
        <GameButton label={t("No thanks")} variant="ghost" color={colors.inkSoft} fullWidth onPress={close} testID="plan-offer-no-thanks" />
        <View style={styles.footer}>
          <Text style={styles.legal}>{t("Renews automatically. Cancel anytime in store settings.")}</Text>
          <View style={styles.links}>
            <Tappable onPress={restore} disabled={busy} sound={busy ? false : undefined} style={styles.link} testID="plan-offer-restore">
              {busy && pendingId === "restore" ? <ActivityIndicator color={colors.gem} size="small" /> : <Text style={styles.linkText}>{t("Restore purchases")}</Text>}
            </Tappable>
            <Tappable onPress={() => open(legalLinks.terms)} accessibilityRole="link" style={styles.link} testID="plan-offer-terms">
              <Text style={styles.linkText}>{t("Terms")}</Text>
            </Tappable>
            <Tappable onPress={() => open(legalLinks.privacy)} accessibilityRole="link" style={styles.link} testID="plan-offer-privacy">
              <Text style={styles.linkText}>{t("Privacy")}</Text>
            </Tappable>
          </View>
        </View>
      </ScrollView>
      {gate}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  headText: {
    flex: 1,
    minWidth: 0,
    gap: 2
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 26,
    lineHeight: 32,
    flexShrink: 1
  },
  line: {
    ...text.bodyBold,
    flexShrink: 1
  },
  close: {
    alignSelf: "flex-start",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.snow
  },
  card: {
    padding: 14,
    borderRadius: radii.xl,
    backgroundColor: colors.gold,
    borderBottomWidth: 6,
    borderBottomColor: colors.goldLip
  },
  choices: {
    gap: 10
  },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radii.tile,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip
  },
  planChosen: {
    borderColor: colors.green,
    borderBottomColor: darken(colors.green, 0.2),
    backgroundColor: lighten(colors.green, 0.9)
  },
  radio: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: colors.line,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white
  },
  radioOn: {
    borderColor: colors.green,
    backgroundColor: colors.green
  },
  planText: {
    flex: 1,
    minWidth: 0,
    gap: 2
  },
  planNameRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8
  },
  planName: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 23,
    color: colors.ink,
    flexShrink: 1
  },
  planPrice: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    color: colors.ink
  },
  planExtra: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    color: darken(colors.green, 0.25)
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
  buyArea: {
    gap: 6
  },
  bigSpinner: {
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  terms: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft,
    textAlign: "center"
  },
  noAds: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  noAdsText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.ink,
    flex: 1,
    minWidth: 0
  },
  spinner: {
    minWidth: 76,
    height: 42,
    alignItems: "center",
    justifyContent: "center"
  },
  dim: {
    opacity: 0.6
  },
  footer: {
    alignItems: "center",
    gap: 2
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
    gap: 4
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
