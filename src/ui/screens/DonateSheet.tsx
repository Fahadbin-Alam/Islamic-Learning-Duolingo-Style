import React, { useEffect, useState } from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { CHARITY, carriesAmount, donationUrl, formatDonation, type CharityConfig } from "../../config/charity";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { QrCode } from "../QrCode";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type DonateSheetProps = {
  visible: boolean;
  onClose: () => void;
  charity?: CharityConfig;
  /** Opens the donation page. Default: the phone's browser (Linking.openURL). */
  onOpenLink?: (url: string) => void;
};

const HEART_INK = darken(colors.heart, 0.2);
const QR_SIZE = 168;

/**
 * The Me tab's charity sheet: amount chips, a QR code for the donation page and DONATE, which opens that
 * page in the browser. Nothing is paid inside the app. The Me tab asks a grown-up before it opens.
 */
export function DonateSheet({ visible, onClose, charity = CHARITY, onOpenLink }: DonateSheetProps) {
  useBackToClose(visible, onClose);
  const [amount, setAmount] = useState(charity.amounts[1] ?? charity.amounts[0]);
  // Opens on the second amount each time.
  useEffect(() => {
    if (visible) setAmount(charity.amounts[1] ?? charity.amounts[0]);
  }, [charity.amounts, visible]);

  const url = donationUrl(amount, charity);
  const shown = amount === undefined ? "" : formatDonation(amount, charity);
  const open = () => (onOpenLink ? onOpenLink(url) : void Linking.openURL(url).catch(() => undefined));

  return (
    <Sheet visible={visible} onClose={onClose} testID="donate-sheet">
      <View style={styles.stack}>
        <View style={styles.head}>
          <PopIn key={visible ? "open" : "closed"} delay={60} style={styles.heartCircle}>
            <Icon name="handHeart" size={30} />
          </PopIn>
          <View style={styles.headText}>
            <Text style={styles.title} numberOfLines={1} accessibilityRole="header" testID="donate-title">
              {t("Give charity")}
            </Text>
            <Text style={styles.name} numberOfLines={1} testID="donate-name">
              {charity.name}
            </Text>
          </View>
          <Tappable onPress={onClose} style={styles.close} accessibilityLabel={t("Close")} hitSlop={8} pressScale={0.9} testID="donate-close">
            <Icon name="close" size={20} color={colors.inkSoft} />
          </Tappable>
        </View>

        <View style={styles.amounts} accessibilityRole="radiogroup">
          {charity.amounts.map((value) => {
            const picked = value === amount;
            return (
              <Tappable
                key={value}
                onPress={() => setAmount(value)}
                sound="soft_ui"
                pressScale={0.94}
                accessibilityRole="radio"
                accessibilityState={{ selected: picked }}
                accessibilityLabel={formatDonation(value, charity)}
                testID={`donate-amount-${value}`}
                style={[styles.amount, picked ? styles.amountPicked : null]}
              >
                <Text style={[styles.amountText, picked ? styles.amountTextPicked : null]} numberOfLines={1}>
                  {formatDonation(value, charity)}
                </Text>
              </Tappable>
            );
          })}
        </View>

        <View style={styles.qrCard}>
          <QrCode value={url} size={QR_SIZE} testID="donate-qr" accessibilityLabel={t("QR code for {name}", { name: charity.name })} />
          <Text style={styles.scan} numberOfLines={1}>
            {t("Scan to give")}
          </Text>
        </View>

        {amount !== undefined && !carriesAmount(amount, charity) ? (
          <Text style={styles.note} numberOfLines={2} testID="donate-pick-on-page">
            {t("Choose {amount} on the page.", { amount: shown })}
          </Text>
        ) : null}

        <GameButton label={t("Donate {amount}", { amount: shown })} color={colors.heart} fullWidth onPress={open} testID="donate-open" />
        <Text style={styles.small} numberOfLines={2} testID="donate-outside">
          {t("You pay on {name}'s website, not in the app.", { name: charity.name })}
        </Text>
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  heartCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: lighten(colors.heart, 0.85),
    alignItems: "center",
    justifyContent: "center"
  },
  headText: {
    flex: 1,
    minWidth: 0
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 22,
    lineHeight: 28,
    color: HEART_INK
  },
  name: {
    ...text.small,
    fontFamily: fonts.bodyBold
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  amounts: {
    flexDirection: "row",
    gap: 8
  },
  amount: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  amountPicked: {
    backgroundColor: lighten(colors.heart, 0.88),
    borderColor: lighten(colors.heart, 0.35),
    borderBottomColor: colors.heart
  },
  amountText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 19,
    lineHeight: 24,
    color: colors.ink
  },
  amountTextPicked: {
    color: HEART_INK
  },
  qrCard: {
    alignSelf: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  scan: {
    ...text.tiny,
    marginTop: 2
  },
  note: {
    ...text.small,
    textAlign: "center"
  },
  small: {
    ...text.tiny,
    textAlign: "center"
  }
});
