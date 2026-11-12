import React from "react";
import { Text, View } from "react-native";
import { HAJJ_STOPS } from "../../data/hajjMap";
import { t } from "../../i18n";
import { HajjDaysBar, HajjWhen, hajjStopColor } from "./HajjDays";
import { MapBanner, MapPlayerSheet, playerBox, type PlayerStop } from "./MapPlayer";

/**
 * "Map of Hajj", on the Hajj path: Hajj played in order on the map, as Jabir told of his Hajj ﷺ (Sahih Muslim 1218a):
 * the miqats, Mina on the 8th, Arafah on the 9th, the night at Muzdalifah, the Jamrah, the sacrifice and the House on
 * the 10th, the days at Mina, and the farewell tawaf; then all of it together. The days of Hajj are under each map.
 */

const PLAYER_STOPS: readonly PlayerStop[] = HAJJ_STOPS.map((stop) => ({ key: stop.scene.id, scene: stop.scene, title: stop.title, color: hajjStopColor(stop) }));

export function HajjMapBanner({ accent, onOpen }: { accent: string; onOpen: () => void }) {
  return <MapBanner title={t("Map of Hajj")} line={t("Where each step of Hajj happens, in order.")} accent={accent} onOpen={onOpen} testID="hajj-map-banner" />;
}

/** The days of Hajj under the stop's map: when it is, and its days lit. */
function DaysBox({ index }: { index: number }) {
  const stop = HAJJ_STOPS[index];
  return (
    <View style={playerBox.box}>
      <View style={playerBox.head}>
        <HajjWhen stop={stop} />
        <Text style={playerBox.total}>{t("Dhul-Hijjah")}</Text>
      </View>
      <HajjDaysBar stop={stop} big testID="hajj-map-days" />
    </View>
  );
}

export function HajjMapSheet({ visible, onClose, accent, topGap = 40, startAt = 0 }: { visible: boolean; onClose: () => void; accent: string; topGap?: number; startAt?: number }) {
  return (
    <MapPlayerSheet
      visible={visible}
      onClose={onClose}
      accent={accent}
      heading={t("Map of Hajj")}
      stops={PLAYER_STOPS}
      below={(index) => <DaysBox index={index} />}
      testPrefix="hajj-map"
      topGap={topGap}
      startAt={startAt}
    />
  );
}
