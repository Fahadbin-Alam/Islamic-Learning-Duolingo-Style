import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { DAY_TIMES, litMoments, skyStopColor, type SkyStop } from "../../data/daySky";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { colors, fonts } from "../theme";
import { momentIcon } from "./skyArt";

/**
 * The times of the day under a sky, as the days of Hajj are under a Hajj map: dawn, sunrise, the forenoon, midday,
 * the afternoon, sunset, the night and its last third, each a small picture of where the sun (or the moon) is. The
 * times a sky is about are lit in their sky's colour; the fast lights every time from dawn to sunset.
 */
export function DayBar({ stop, big, testID = "day-bar" }: { stop: SkyStop; big?: boolean; testID?: string }) {
  const lit = new Set(litMoments(stop));
  return (
    <View style={[styles.row, big ? styles.rowBig : null]} accessible accessibilityLabel={t(stop.when)} testID={testID}>
      {DAY_TIMES.map((time) => {
        const on = lit.has(time.key);
        return (
          <View
            key={time.key}
            style={[styles.cell, big ? styles.cellBig : null, on ? { backgroundColor: time.color, borderColor: time.color } : styles.cellOff]}
            testID={on ? `${testID}-on-${time.key}` : `${testID}-${time.key}`}
          >
            <SvgXml xml={momentIcon(time.key, on)} width={big ? 26 : 20} height={big ? 17 : 13} />
          </View>
        );
      })}
    </View>
  );
}

/** "Dawn · Fajr": when the sky is. */
export function SkyWhen({ stop, style }: { stop: SkyStop; style?: object }) {
  return (
    <View style={[styles.whenRow, style]}>
      <View style={[styles.whenDot, { backgroundColor: skyStopColor(stop) }]} />
      <Text style={styles.whenText} numberOfLines={1} testID="sky-when">
        {withHonorifics(t(stop.when))}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 10, width: "100%" },
  rowBig: { gap: 4 },
  cell: { flex: 1, height: 22, borderRadius: 7, alignItems: "center", justifyContent: "center", borderWidth: 1.5 },
  cellBig: { height: 32, borderRadius: 10, borderWidth: 2 },
  cellOff: { backgroundColor: "#F4EFE6", borderColor: "#E6DCCB" },
  whenRow: { flexDirection: "row", alignItems: "center", gap: 6, flexShrink: 1 },
  whenDot: { width: 9, height: 9, borderRadius: 5 },
  whenText: { flexShrink: 1, fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 17, color: colors.ink }
});
