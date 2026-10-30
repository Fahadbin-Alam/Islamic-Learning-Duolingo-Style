import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import type { ShopItem } from "../../types";
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
  /** "hearts": opened because the hearts ran out; "lessons": after a few finished lessons. Only the title changes. */
  reason: "hearts" | "lessons";
  /** The shop's items: the plans are picked out of them. */
  items: ShopItem[];
  storePrices: Record<string, string>;
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

/**
 * The plans, offered by themselves now and then (see shouldOfferPlansAfterLesson) and when hearts run out. Store rules:
 * the close button and NO THANKS are there from the first frame, every price says how often it is charged, renewal and
 * the Terms and Privacy links sit under the plans, and RESTORE is offered. Real money waits for the grown-up check.
 */
export function PlanOfferSheet({ visible, reason, items, storePrices, busy, mascotVariant, accent, onBuy, onRestore, onClose, onOpenLink }: PlanOfferSheetProps) {
  const { ask, gate } = useGrownUpGate();
  const [pendingId, setPendingId] = useState<string | undefined>(undefined);
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
  const ink = darken(colors.gold, 0.62);

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

  const planButton = (item: ShopItem, primary: boolean) => {
    const price = formatShopPrice(item, storePrices);
    const badge = badgeText(item);
    const name = displayName(item);
    return (
      <View key={item.id} style={[styles.plan, primary ? styles.planBest : null]} testID={`plan-offer-row-${item.id}`}>
        <View style={styles.planText}>
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
        {busy && pendingId === item.id ? (
          <View style={styles.spinner} accessibilityLabel={t("Working")} testID={`plan-offer-pending-${item.id}`}>
            <ActivityIndicator color={colors.green} />
          </View>
        ) : (
          <View style={busy ? styles.dim : null} pointerEvents={busy ? "none" : "auto"}>
            <GameButton
              label={price}
              size="sm"
              variant={primary ? "primary" : "blue"}
              sound={busy ? false : undefined}
              onPress={() => !busy && buy(item)}
              accessibilityLabel={`${t("Premium")} ${name}, ${price}`}
              testID={`plan-offer-buy-${item.id}`}
            />
          </View>
        )}
      </View>
    );
  };

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
              {reason === "hearts" ? t("Never run out of hearts!") : t("Learn with no limits!")}
            </Text>
          </View>
          <Tappable onPress={close} style={styles.close} accessibilityLabel={t("Close")} hitSlop={8} pressScale={0.9} testID="plan-offer-close">
            <Icon name="close" size={20} color={colors.inkSoft} />
          </Tappable>
        </View>
        <View style={styles.card}>
          <BenefitList ink={ink} />
          {premiumPlans.map((item, index) => planButton(item, index === 0))}
        </View>
        {noAdsPlan ? (
          <View style={styles.noAds} testID="plan-offer-no-ads">
            <View style={styles.noAdsHead}>
              <Icon name="sparkle" size={22} />
              <Text style={styles.noAdsText} numberOfLines={2}>
                {t("Just no ads")}
              </Text>
            </View>
            {planButton(noAdsPlan, false)}
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
    gap: 10,
    borderRadius: radii.xl,
    backgroundColor: colors.gold,
    borderBottomWidth: 6,
    borderBottomColor: colors.goldLip
  },
  plan: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    borderRadius: radii.tile,
    backgroundColor: colors.white,
    borderBottomWidth: 4,
    borderBottomColor: lighten(colors.goldLip, 0.2)
  },
  planBest: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.heartLip
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
  noAds: {
    gap: 8,
    padding: 12,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  noAdsHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  noAdsText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.ink,
    flexShrink: 1
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
