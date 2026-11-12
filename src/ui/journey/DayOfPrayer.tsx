import React from "react";
import { View } from "react-native";
import { DAY_OF_PRAYER, skyStopColor } from "../../data/daySky";
import { t } from "../../i18n";
import { DayBar, SkyWhen } from "./DayBar";
import { DaySky } from "./DaySky";
import { MapBanner, MapPlayerSheet, playerBox, type PlayerStop } from "./MapPlayer";

/**
 * "The day of prayer", on the Prayer path: one day played in the sky, each prayer in its time as he ﷺ gave them
 * (Sahih Muslim 612d): Fajr at the first light of dawn, sunrise when its time ends, Duha in the forenoon, Zuhr once the
 * sun has passed its height, Asr while it is high, Maghrib once it has set, Isha once twilight has gone, and the last
 * third of the night; then all five together. The times of the day are under each sky.
 */

const PLAYER_STOPS: readonly PlayerStop[] = DAY_OF_PRAYER.map((stop) => ({
  key: stop.scene.id,
  title: stop.title ?? stop.when,
  color: skyStopColor(stop),
  caption: stop.scene.caption,
  sources: stop.scene.sources,
  draw: ({ width, height, still, delay, onDrawn }) => <DaySky scene={stop.scene} width={width} height={height} still={still} delay={delay} onDrawn={onDrawn} />
}));

export function DayOfPrayerBanner({ accent, onOpen }: { accent: string; onOpen: () => void }) {
  return <MapBanner title={t("The day of prayer")} line={t("Each prayer in its time, in the sky from dawn to night.")} accent={accent} onOpen={onOpen} testID="day-of-prayer-banner" />;
}

/** The times of the day under the stop's sky: when it is, and its time lit. */
function TimesBox({ index }: { index: number }) {
  const stop = DAY_OF_PRAYER[index];
  return (
    <View style={playerBox.box}>
      <View style={playerBox.head}>
        <SkyWhen stop={stop} />
      </View>
      <DayBar stop={stop} big testID="day-of-prayer-bar" />
    </View>
  );
}

export function DayOfPrayerSheet({ visible, onClose, accent, topGap = 40, startAt = 0 }: { visible: boolean; onClose: () => void; accent: string; topGap?: number; startAt?: number }) {
  return (
    <MapPlayerSheet
      visible={visible}
      onClose={onClose}
      accent={accent}
      heading={t("The day of prayer")}
      stops={PLAYER_STOPS}
      below={(index) => <TimesBox index={index} />}
      testPrefix="day-of-prayer"
      topGap={topGap}
      startAt={startAt}
      sourcesLead={t("Times from")}
      frameColor="#0A1233"
    />
  );
}
