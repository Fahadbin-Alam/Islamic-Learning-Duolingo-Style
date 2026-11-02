import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Icon, type IconName } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { ADHKAR_TITLES, type AdhkarTime } from "../../data/adhkar";
import { t } from "../../i18n";

export type AdhkarBannerProps = {
  accent: string;
  /** The list that fits the time of day, shown first and big. */
  now: AdhkarTime;
  doneToday: readonly AdhkarTime[];
  onOpen: (time: AdhkarTime) => void;
};

const ICONS: Record<AdhkarTime, IconName> = { morning: "sun", evening: "moon", sleep: "star" };
const NOW_LINES: Record<AdhkarTime, string> = {
  morning: "Time for your morning adhkar.",
  evening: "Time for your evening adhkar.",
  sleep: "Time for your bedtime adhkar."
};

/** At the top of the Duas path: today's adhkar, with the list that fits the time of day first. */
export function AdhkarBanner({ accent, now, doneToday, onOpen }: AdhkarBannerProps) {
  const ink = darken(accent, 0.25);
  const nowDone = doneToday.includes(now);
  const order: AdhkarTime[] = [now, ...(["morning", "evening", "sleep"] as const).filter((time) => time !== now)];
  return (
    <View style={[styles.card, { backgroundColor: lighten(accent, 0.88), borderColor: lighten(accent, 0.6) }]} testID="adhkar-banner">
      <View style={styles.row}>
        <View style={[styles.emblem, { backgroundColor: accent, borderBottomColor: darken(accent) }]}>
          <Icon name="dua" size={30} />
        </View>
        <View style={styles.words}>
          <Text style={[styles.title, { color: ink }]} accessibilityRole="header">
            {t("Daily adhkar")}
          </Text>
          <Text style={styles.line} testID="adhkar-banner-line">
            {nowDone ? t("Done for now. Alhamdulillah!") : t(NOW_LINES[now])}
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {order.map((time) => {
          const done = doneToday.includes(time);
          return (
            <Tappable
              key={time}
              onPress={() => onOpen(time)}
              sound="node_tap"
              pressScale={0.95}
              style={[styles.button, time === now && !done ? { backgroundColor: accent, borderBottomColor: darken(accent) } : null, done && styles.buttonDone]}
              accessibilityRole="button"
              accessibilityLabel={t(ADHKAR_TITLES[time])}
              accessibilityState={{ checked: done }}
              testID={`adhkar-open-${time}`}
            >
              <Icon name={done ? "check" : ICONS[time]} size={18} color={time === now && !done ? colors.white : done ? colors.white : ink} />
              <Text style={[styles.buttonText, { color: (time === now && !done) || done ? colors.white : ink }]} numberOfLines={2}>
                {t(ADHKAR_TITLES[time])}
              </Text>
            </Tappable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: space.lg,
    marginTop: space.md,
    marginBottom: space.sm,
    padding: space.md,
    gap: space.md,
    borderRadius: radii.lg,
    borderWidth: 2
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md
  },
  emblem: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderBottomWidth: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  words: {
    flex: 1,
    minWidth: 0
  },
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26
  },
  line: {
    ...text.small,
    color: colors.ink
  },
  buttons: {
    flexDirection: "row",
    gap: space.sm
  },
  button: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.xs,
    minHeight: 44,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    borderRadius: radii.button,
    backgroundColor: colors.white,
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip
  },
  buttonDone: {
    backgroundColor: colors.green,
    borderColor: colors.green,
    borderBottomColor: colors.greenLip
  },
  buttonText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 16,
    flexShrink: 1,
    textAlign: "center"
  }
});
