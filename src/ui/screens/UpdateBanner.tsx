import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, radii, space } from "../theme";
import { t } from "../../i18n";

export type UpdateBannerProps = {
  /** Opens Muslimo's page in the Play Store or App Store. */
  onUpdate: () => void;
  /** Hides the banner until the app is opened again. */
  onClose: () => void;
};

/** A slim strip under the top bar when the store has a newer Muslimo: a short line, Update, and a close X. */
export function UpdateBanner({ onUpdate, onClose }: UpdateBannerProps) {
  return (
    <View style={styles.strip} testID="update-banner" accessibilityRole="alert">
      <Icon name="sparkle" size={24} />
      <Text style={styles.line} numberOfLines={2} testID="update-banner-line">
        {t("A new update is ready!")}
      </Text>
      <GameButton label={t("Update")} color={colors.gem} size="sm" sound="node_tap" onPress={onUpdate} testID="update-banner-button" />
      <Tappable onPress={onClose} hitSlop={10} pressScale={0.9} accessibilityLabel={t("Close")} testID="update-banner-close">
        <Icon name="close" size={18} color={colors.inkSoft} />
      </Tappable>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    marginHorizontal: space.lg,
    marginTop: space.xs,
    paddingVertical: space.xs,
    paddingHorizontal: space.md,
    borderRadius: radii.lg,
    borderWidth: 2,
    borderColor: "#BFE4FF",
    backgroundColor: "#E8F5FF"
  },
  line: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.display,
    fontSize: 16,
    lineHeight: 21,
    color: darken(colors.gem, 0.35)
  }
});
