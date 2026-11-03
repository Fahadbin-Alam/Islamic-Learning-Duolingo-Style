import React, { useRef } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import type { CertificateProgress } from "../../services/certificates";
import { IOS_APP_LIVE } from "../../services/shareApp";
import type { SupportedLanguage } from "../../types";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Portal } from "../Portal";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text, topicPalette } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";
import { getActiveLanguage, t } from "../../i18n";

const PAPER = "#FFFBEF";
const GOLD_INK = darken(colors.gold, 0.5);

const DATE_LOCALES: Record<SupportedLanguage, string> = { en: "en-GB", bn: "bn-BD", ur: "ur-PK", ar: "ar-EG" };

/** "3 November 2026" in the shown language, always with the Gregorian calendar and 0-9 digits like the rest of the app. */
export function certificateDate(iso: string | undefined, language: SupportedLanguage = getActiveLanguage()) {
  if (!iso) return undefined;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return undefined;
  try {
    return date.toLocaleDateString(DATE_LOCALES[language] ?? "en-GB", { day: "numeric", month: "long", year: "numeric", calendar: "gregory", numberingSystem: "latn" });
  } catch {
    return iso.slice(0, 10);
  }
}

export type CertificateCardProps = {
  item: CertificateProgress;
  /** The learner's first name; left out for a guest. */
  name?: string;
};

/**
 * The certificate itself, the part shared as a picture: a framed paper card with the topic's emblem, the learner's
 * name, what they finished, how many lessons it held, the day, and where to get Muslimo. Only emblems and stars, no people.
 */
export const CertificateCard = React.forwardRef<View, CertificateCardProps>(function CertificateCard({ item, name }, ref) {
  const { certificate, total, earnedAt } = item;
  const palette = topicPalette(certificate.accent);
  const day = certificateDate(earnedAt);
  return (
    <View ref={ref} collapsable={false} style={[styles.frame, { borderColor: palette.main }]} testID="certificate-card">
      <View style={styles.paper}>
        {(["tl", "tr", "bl", "br"] as const).map((corner) => (
          <View key={corner} style={[styles.corner, styles[corner]]}>
            <Icon name="star8" size={18} />
          </View>
        ))}
        <Text style={styles.kicker}>{t("Certificate")}</Text>
        <View style={styles.medal}>
          <View style={[styles.emblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
            <Icon name={certificate.icon} size={38} />
          </View>
          <View style={styles.ribbons}>
            <View style={[styles.ribbon, styles.ribbonLeft, { backgroundColor: palette.lip }]} />
            <View style={[styles.ribbon, styles.ribbonRight, { backgroundColor: palette.lip }]} />
          </View>
        </View>
        {name ? (
          <>
            <Text style={styles.small}>{t("This certificate is given to")}</Text>
            <Text style={styles.name} numberOfLines={2} testID="certificate-name">
              {name}
            </Text>
            <Text style={styles.small}>{t("for finishing")}</Text>
          </>
        ) : (
          <Text style={styles.small}>{t("Awarded for finishing")}</Text>
        )}
        <Text style={[styles.title, { color: palette.ink }]} accessibilityRole="header" numberOfLines={3} testID="certificate-title">
          {certificate.title}
        </Text>
        <View style={styles.rule} />
        <Text style={styles.detail} testID="certificate-lessons">
          {t("{count} lessons done", { count: formatNumber(total) })}
        </Text>
        {day ? (
          <Text style={styles.detail} testID="certificate-date">
            {day}
          </Text>
        ) : null}
        <Text style={styles.brand}>Muslimo</Text>
        <Text style={styles.store}>{Platform.OS === "ios" || IOS_APP_LIVE ? t("Learn Islam daily. Free on Google Play and the App Store.") : t("Learn Islam daily. Free on Google Play.")}</Text>
      </View>
    </View>
  );
});

export type CertificatePopProps = {
  item?: CertificateProgress;
  name?: string;
  /** Just earned: confetti and a "You earned a certificate!" line. Opened again from the list: no confetti. */
  fresh?: boolean;
  /** Gets the card's face, to share as a picture (shareCard.native.ts). */
  onShare: (card: View | null) => void;
  onClose: () => void;
};

/** One certificate over the app, with Share and Not now. Pops up when one is earned, and opens from the Certificates list. */
export function CertificatePop({ item, name, fresh = false, onShare, onClose }: CertificatePopProps) {
  useBackToClose(Boolean(item), onClose);
  const face = useRef<View>(null);
  if (!item) return null;
  const accent = item.certificate.accent;
  return (
    <Portal>
      <View style={styles.layer} testID="certificate-pop">
        <Tappable onPress={onClose} pressScale={1} style={StyleSheet.absoluteFill} accessibilityLabel={t("Close")}>
          <View style={[StyleSheet.absoluteFill, styles.backdrop]} />
        </Tappable>
        {fresh ? <Confetti active count={44} /> : null}
        <PopIn style={styles.popCard}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false} contentContainerStyle={styles.popContent}>
            {fresh ? (
              <Text style={styles.popHead} testID="certificate-earned">
                {t("You earned a certificate!")}
              </Text>
            ) : null}
            <CertificateCard ref={face} item={item} name={name} />
            <GameButton label={t("Share")} icon="share" color={accent} fullWidth onPress={() => onShare(face.current)} testID="certificate-share" />
            <GameButton label={fresh ? t("Not now") : t("Close")} variant="ghost" fullWidth onPress={onClose} testID="certificate-close" />
          </ScrollView>
        </PopIn>
      </View>
    </Portal>
  );
}

export type CertificatesSheetProps = {
  visible: boolean;
  /** Every certificate with the learner's progress (certificateProgress). */
  items: CertificateProgress[];
  onOpen: (item: CertificateProgress) => void;
  onClose: () => void;
  topGap?: number;
  bottomInset?: number;
};

/** How many started certificates the sheet lists under "Keep going". */
const NEXT_UP = 6;

/** Me tab > Certificates: the ones earned (tap to see and share), then the started ones closest to done. */
export function CertificatesSheet({ visible, items, onOpen, onClose, topGap = 40, bottomInset = 0 }: CertificatesSheetProps) {
  useBackToClose(visible, onClose);
  const earned = items.filter((item) => item.earned).sort((a, b) => (b.earnedAt ?? "").localeCompare(a.earnedAt ?? ""));
  const started = items
    .filter((item) => !item.earned && item.done > 0)
    .sort((a, b) => b.done / b.total - a.done / a.total)
    .slice(0, NEXT_UP);
  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="certificates-sheet">
      <View style={styles.header}>
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
          {t("Certificates")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="certificates-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 + bottomInset }} showsVerticalScrollIndicator={false}>
        {earned.length ? (
          earned.map((item) => <EarnedRow key={item.certificate.id} item={item} onPress={() => onOpen(item)} />)
        ) : (
          <View style={styles.empty} testID="certificates-empty">
            <Icon name="trophy" size={56} />
            <Text style={styles.emptyLine}>{t("Finish a big unit, like Juz Amma or the Seerah, to earn your first certificate!")}</Text>
          </View>
        )}
        {started.length ? (
          <>
            <Text style={styles.subhead}>{t("Keep going")}</Text>
            {started.map((item) => (
              <StartedRow key={item.certificate.id} item={item} />
            ))}
          </>
        ) : null}
      </ScrollView>
    </Sheet>
  );
}

function EarnedRow({ item, onPress }: { item: CertificateProgress; onPress: () => void }) {
  const palette = topicPalette(item.certificate.accent);
  const day = certificateDate(item.earnedAt);
  return (
    <Tappable onPress={onPress} sound="node_tap" pressScale={0.97} accessibilityLabel={item.certificate.title} testID={`certificate-row-${item.certificate.id}`} style={styles.row}>
      <View style={[styles.rowEmblem, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
        <Icon name={item.certificate.icon} size={26} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.certificate.title}
        </Text>
        <Text style={styles.rowSub} numberOfLines={1}>
          {day ?? t("{count} lessons done", { count: formatNumber(item.total) })}
        </Text>
      </View>
      <Icon name="chevronRight" size={20} color={colors.inkSoft} />
    </Tappable>
  );
}

function StartedRow({ item }: { item: CertificateProgress }) {
  const palette = topicPalette(item.certificate.accent);
  return (
    <View style={[styles.row, styles.rowStarted]} testID={`certificate-next-${item.certificate.id}`}>
      <View style={[styles.rowEmblem, styles.rowEmblemDim]}>
        <Icon name={item.certificate.icon} size={26} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {item.certificate.title}
        </Text>
        <ProgressBar progress={item.done / item.total} color={palette.main} height={10} style={styles.rowBar} />
        <Text style={styles.rowSub} numberOfLines={1}>
          {t("{done} of {total} lessons", { done: formatNumber(item.done), total: formatNumber(item.total) })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    padding: space.lg
  },
  backdrop: {
    backgroundColor: "rgba(20, 32, 27, 0.55)"
  },
  popCard: {
    width: "100%",
    maxWidth: 380,
    maxHeight: "100%",
    borderRadius: radii.xl,
    backgroundColor: colors.white
  },
  popContent: {
    alignItems: "stretch",
    gap: space.sm,
    padding: space.md
  },
  popHead: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center",
    color: colors.ink
  },
  frame: {
    borderWidth: 4,
    borderRadius: radii.lg,
    padding: 4,
    backgroundColor: PAPER,
    marginBottom: space.sm
  },
  paper: {
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.lg,
    paddingVertical: space.lg,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.goldLip,
    backgroundColor: PAPER
  },
  corner: {
    position: "absolute"
  },
  tl: { top: 6, left: 6 },
  tr: { top: 6, right: 6 },
  bl: { bottom: 6, left: 6 },
  br: { bottom: 6, right: 6 },
  kicker: {
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: 3,
    textTransform: "uppercase",
    color: GOLD_INK
  },
  medal: {
    alignItems: "center",
    marginTop: space.xs,
    marginBottom: space.sm
  },
  emblem: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: colors.gold,
    borderBottomWidth: 6,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1
  },
  ribbons: {
    flexDirection: "row",
    gap: 10,
    marginTop: -10
  },
  ribbon: {
    width: 14,
    height: 22,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  ribbonLeft: {
    transform: [{ rotate: "14deg" }]
  },
  ribbonRight: {
    transform: [{ rotate: "-14deg" }]
  },
  small: {
    ...text.small,
    textAlign: "center"
  },
  name: {
    fontFamily: fonts.displayHeavy,
    fontSize: 24,
    lineHeight: 30,
    textAlign: "center",
    color: colors.ink
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center"
  },
  rule: {
    width: 64,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.gold,
    marginVertical: space.xs
  },
  detail: {
    ...text.tiny,
    textAlign: "center",
    color: colors.ink
  },
  brand: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 1,
    color: colors.ink,
    marginTop: space.sm
  },
  store: {
    ...text.tiny,
    textAlign: "center"
  },
  sheet: {
    paddingTop: 14
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12
  },
  heading: {
    ...text.h2,
    flex: 1,
    minWidth: 0
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  scroll: {
    flex: 1
  },
  empty: {
    alignItems: "center",
    gap: space.md,
    paddingVertical: space.xl,
    paddingHorizontal: space.md
  },
  emptyLine: {
    ...text.bodyBold,
    color: colors.inkSoft,
    textAlign: "center"
  },
  subhead: {
    ...text.h3,
    marginTop: space.lg,
    marginBottom: space.sm
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderRadius: radii.lg,
    backgroundColor: colors.white
  },
  rowStarted: {
    backgroundColor: colors.mist
  },
  rowEmblem: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  rowEmblemDim: {
    backgroundColor: lighten(colors.lockedLip, 0.3),
    borderBottomColor: colors.lockedLip,
    opacity: 0.8
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    gap: 2
  },
  rowTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    flexShrink: 1
  },
  rowSub: {
    ...text.tiny
  },
  rowBar: {
    marginVertical: 4
  }
});
