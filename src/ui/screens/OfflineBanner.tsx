import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon } from "../Icon";
import { colors, fonts, radii, space } from "../theme";
import { t } from "../../i18n";

/**
 * A slim strip on the path while the phone has no internet. It tells the learner nothing is lost: lessons work
 * as usual, and progress waits on the phone until it can be sent.
 */
export function OfflineBanner() {
  return (
    <View style={styles.strip} testID="offline-banner" accessibilityRole="alert">
      <Icon name="book" size={22} />
      <Text style={styles.line} numberOfLines={3} testID="offline-banner-line">
        {t("No internet. Lessons still work, and your progress is saved on this phone.")}
      </Text>
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
    borderColor: colors.line,
    backgroundColor: colors.snow
  },
  line: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.display,
    fontSize: 15,
    lineHeight: 20,
    color: colors.inkSoft
  }
});
