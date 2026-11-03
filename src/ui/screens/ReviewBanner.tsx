import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, fonts, text, topicPalette } from "../theme";

/**
 * On top of the path when questions the learner missed are due again (spaced review, services/reviewDeck): a card
 * that starts a Review of them. It hides once they are done, until the next ones come back.
 */
export function ReviewBanner({ count, onOpen }: { count: number; onOpen: () => void }) {
  const palette = topicPalette(colors.gem);
  const line = count === 1 ? t("1 question you missed is back. Get it right to make it stick.") : t("{count} questions you missed are back. Get them right to make them stick.", { count });
  return (
    <Tappable
      onPress={onOpen}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={`${t("Review your mistakes")}, ${line}`}
      testID="path-review-banner"
      style={[styles.banner, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: palette.lip }]}
    >
      <View style={[styles.icon, { backgroundColor: palette.main }]}>
        <Icon name="practice" size={28} />
      </View>
      <View style={styles.body}>
        <Text style={styles.title} numberOfLines={1}>
          {t("Review your mistakes")}
        </Text>
        <Text style={styles.line} numberOfLines={2}>
          {line}
        </Text>
      </View>
      <Text style={[styles.count, { color: palette.ink }]} testID="path-review-count">
        {String(count)}
      </Text>
      <Icon name="chevronRight" size={20} color={palette.ink} />
    </Tappable>
  );
}

const styles = StyleSheet.create({
  banner: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginTop: 8, marginBottom: 4, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18, borderWidth: 2, borderBottomWidth: 5 },
  icon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  body: { flex: 1, minWidth: 0 },
  title: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 20, color: colors.ink },
  line: { ...text.small, color: colors.inkSoft },
  count: { fontFamily: fonts.displayHeavy, fontSize: 18 }
});
