import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { HAJJ_DAYS, type HajjStop } from "../../data/hajjMap";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { formatNumber } from "../screens/FormattedCount";
import { colors, fonts } from "../theme";

/**
 * The days of Hajj under a Hajj map, as the life bar is under a Seerah map: the 8th to the 13th of Dhul-Hijjah, with
 * the night at Muzdalifah between the 9th and the 10th as a small moon. The days a stop is about are lit; the 13th,
 * which a pilgrim may stay for or not ("two days or three", Quran 2:203), is lit softly.
 */

export const HAJJ_DAY_COLOR = "#E3A21A";
export const HAJJ_NIGHT_COLOR = "#33407E";

/** The colour a stop is marked with: night blue for the night at Muzdalifah, else the day's gold. */
export const hajjStopColor = (stop: HajjStop) => (stop.night && stop.days.length === 0 ? HAJJ_NIGHT_COLOR : HAJJ_DAY_COLOR);

const moon = (color: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M8.6 1.2A5 5 0 1 0 10.8 8 4 4 0 0 1 8.6 1.2Z" fill="${color}"/></svg>`;

export function HajjDaysBar({ stop, big, testID = "hajj-days" }: { stop: HajjStop; big?: boolean; testID?: string }) {
  const cells: React.ReactNode[] = [];
  HAJJ_DAYS.forEach((day) => {
    if (day === 10) {
      const on = Boolean(stop.night);
      const size = big ? 22 : 16;
      cells.push(
        <View key="night" style={[styles.night, { width: size, height: size, borderRadius: size / 2 }, on ? styles.nightOn : styles.nightOff]} testID={on ? `${testID}-night-on` : `${testID}-night`}>
          <SvgXml xml={moon(on ? "#FFE58A" : "#B9AE98")} width={big ? 12 : 9} height={big ? 12 : 9} />
        </View>
      );
    }
    const on = stop.days.includes(day);
    const maybe = !on && Boolean(stop.maybe?.includes(day));
    cells.push(
      <View key={day} style={[styles.day, big ? styles.dayBig : null, on ? styles.dayOn : maybe ? styles.dayMaybe : styles.dayOff]} testID={on ? `${testID}-on-${day}` : maybe ? `${testID}-maybe-${day}` : `${testID}-${day}`}>
        <Text style={[styles.dayText, big ? styles.dayTextBig : null, on ? styles.dayTextOn : maybe ? styles.dayTextMaybe : null]}>{formatNumber(day)}</Text>
      </View>
    );
  });
  return (
    <View style={[styles.row, big ? styles.rowBig : null]} accessible accessibilityLabel={t(stop.when)} testID={testID}>
      {cells}
    </View>
  );
}

/** "9th Dhul-Hijjah · Day of Arafah": when the stop is. */
export function HajjWhen({ stop, style }: { stop: HajjStop; style?: object }) {
  return (
    <View style={[styles.whenRow, style]}>
      <View style={[styles.whenDot, { backgroundColor: hajjStopColor(stop) }]} />
      <Text style={styles.whenText} numberOfLines={1} testID="hajj-when">
        {withHonorifics(t(stop.when))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 10, width: "100%" },
  rowBig: { gap: 4 },
  day: { flex: 1, height: 18, borderRadius: 6, alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  dayBig: { height: 30, borderRadius: 9, borderWidth: 2 },
  dayOn: { backgroundColor: HAJJ_DAY_COLOR, borderColor: "#C2860C" },
  dayMaybe: { backgroundColor: "#FBE7B5", borderColor: HAJJ_DAY_COLOR, borderStyle: "dashed" },
  dayOff: { backgroundColor: "#F4ECDC", borderColor: "#E6D9BF" },
  dayText: { fontFamily: fonts.bodyHeavy, fontSize: 11, lineHeight: 14, color: "#9C8B70" },
  dayTextBig: { fontSize: 14, lineHeight: 18 },
  dayTextOn: { color: colors.white },
  dayTextMaybe: { color: "#9A6A00" },
  night: { alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  nightOn: { backgroundColor: HAJJ_NIGHT_COLOR, borderColor: "#202A5C" },
  nightOff: { backgroundColor: "#F4ECDC", borderColor: "#E6D9BF" },
  whenRow: { flexDirection: "row", alignItems: "center", gap: 6, flexShrink: 1 },
  whenDot: { width: 9, height: 9, borderRadius: 5 },
  whenText: { flexShrink: 1, fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 17, color: colors.ink }
});
