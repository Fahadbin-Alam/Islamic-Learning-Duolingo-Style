import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LIFE_ERAS, LIFE_YEARS, type LifeEra } from "../../data/seerahMap";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { colors, darken, fonts, lighten } from "../theme";

/**
 * His life ﷺ as one bar, each part as long as it lasted: 40 years before revelation, 13 in Makkah, 10 in Madinah
 * (Sahih al-Bukhari 3902). The part a map belongs to is lit, and a marker stands at his age where a sahih source
 * gives it (40 at the first revelation, 53 at the Hijrah, 63 at the end). Other events get no year: it is left out
 * where the scholars differ.
 */

export const ERA_COLORS: Record<LifeEra, string> = { before: "#8FB3A1", makkah: "#E3A21A", madinah: "#21B573" };

export function eraLabel(era: LifeEra) {
  return LIFE_ERAS.find((each) => each.id === era)?.label ?? "";
}

export function LifeBar({ era, age, big, testID }: { era: LifeEra; age?: number; big?: boolean; testID?: string }) {
  const marker = age !== undefined ? Math.max(0, Math.min(1, age / LIFE_YEARS)) : undefined;
  const size = big ? 18 : 12;
  return (
    <View style={[styles.wrap, big ? styles.wrapBig : null]} testID={testID}>
      <View style={[styles.bar, big ? styles.barBig : null]}>
        {LIFE_ERAS.map((each) => {
          const on = each.id === era;
          return (
            <View key={each.id} style={[styles.part, { flex: each.years, backgroundColor: on ? ERA_COLORS[each.id] : lighten(ERA_COLORS[each.id], 0.68) }]} testID={on ? `${testID ?? "life-bar"}-on-${each.id}` : undefined}>
              {big ? <Text style={[styles.years, on ? null : { color: darken(ERA_COLORS[each.id], 0.25) }]}>{each.years}</Text> : null}
            </View>
          );
        })}
      </View>
      {marker !== undefined ? (
        <View pointerEvents="none" style={[styles.marker, { start: `${marker * 100}%`, width: size, height: size, borderRadius: size / 2, marginStart: -size / 2, top: big ? 0 : -2, backgroundColor: ERA_COLORS[era] }]} />
      ) : null}
    </View>
  );
}

/** "In Madinah · Age 53": where in his life ﷺ the map is. */
export function LifeLine({ era, age, style }: { era: LifeEra; age?: number; style?: object }) {
  return (
    <View style={[styles.lineRow, style]}>
      <View style={[styles.lineDot, { backgroundColor: ERA_COLORS[era] }]} />
      <Text style={styles.lineText} numberOfLines={1}>
        {withHonorifics(age !== undefined ? `${t(eraLabel(era))} · ${t("Age {age}", { age })}` : t(eraLabel(era)))}
      </Text>
    </View>
  );
}

/** The three parts named under the big bar, with how long each lasted. */
export function LifeLegend() {
  return (
    <View style={styles.legend}>
      {LIFE_ERAS.map((each) => (
        <View key={each.id} style={styles.legendItem}>
          <View style={[styles.lineDot, { backgroundColor: ERA_COLORS[each.id] }]} />
          <Text style={styles.legendText}>{`${t(each.label)}: ${t("{count} years", { count: each.years })}`}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", height: 8, marginTop: 10, justifyContent: "center" },
  wrapBig: { height: 18 },
  bar: { flexDirection: "row", height: 8, borderRadius: 4, overflow: "hidden", gap: 2 },
  barBig: { height: 18, borderRadius: 9 },
  part: { height: "100%", alignItems: "center", justifyContent: "center" },
  years: { fontFamily: fonts.bodyHeavy, fontSize: 11, lineHeight: 14, color: colors.white },
  marker: { position: "absolute", borderWidth: 3, borderColor: colors.white, shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 2, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
  lineRow: { flexDirection: "row", alignItems: "center", gap: 6, flexShrink: 0 },
  lineDot: { width: 9, height: 9, borderRadius: 5 },
  lineText: { fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 17, color: colors.ink },
  legend: { flexDirection: "row", flexWrap: "wrap", columnGap: 12, rowGap: 2, marginTop: 6 },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  legendText: { fontFamily: fonts.bodyBold, fontSize: 12, lineHeight: 16, color: colors.inkSoft }
});
