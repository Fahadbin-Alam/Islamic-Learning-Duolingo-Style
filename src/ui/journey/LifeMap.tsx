import React from "react";
import { Text, View } from "react-native";
import { LIFE_YEARS, SEERAH_JOURNEYS, type MapScene, type SeerahJourney } from "../../data/seerahMap";
import { SEERAH_UNITS } from "../../data/seerahUnits";
import { t } from "../../i18n";
import { ERA_COLORS, LifeBar, LifeLegend, LifeLine } from "./LifeBar";
import { MapBanner, MapPlayerSheet, playerBox, type PlayerStop } from "./MapPlayer";

/**
 * "Map of his life ﷺ": the Seerah played in order on the map, one place after another, from Makkah where he ﷺ grew up
 * to the Farewell Hajj, with the bar of his 63 years under it (40 before revelation, 13 in Makkah, 10 in Madinah). It
 * plays by itself (each road draws, rests, then the next comes); back, pause and next, or tap a dot to jump.
 */

export type LifeStop = { journey: SeerahJourney; scene: MapScene; sceneIndex: number };

export const LIFE_STOPS: readonly LifeStop[] = SEERAH_JOURNEYS.flatMap((journey) => journey.scenes.map((scene, sceneIndex) => ({ journey, scene, sceneIndex })));

const UNIT_TITLES = new Map(SEERAH_UNITS.map((unit) => [unit.branchId, unit.branch?.title ?? unit.name]));
export const stopTitle = (stop: LifeStop) => UNIT_TITLES.get(stop.journey.branchId) ?? "";

const PLAYER_STOPS: readonly PlayerStop[] = LIFE_STOPS.map((stop) => ({ key: stop.scene.id, scene: stop.scene, title: stopTitle(stop), color: ERA_COLORS[stop.journey.era] }));

/** The banner on the Prophets path that opens the map of his life ﷺ. */
export function LifeMapBanner({ accent, onOpen }: { accent: string; onOpen: () => void }) {
  return <MapBanner title={t("Map of his life ﷺ")} line={t("Where each part of the Seerah happened, in order.")} accent={accent} onOpen={onOpen} testID="life-map-banner" />;
}

/** His years under the stop's map: the era it was in, his age where it is known, and the bar of his 63 years. */
function LifeBox({ index }: { index: number }) {
  const { journey } = LIFE_STOPS[index];
  return (
    <View style={playerBox.box}>
      <View style={playerBox.head}>
        <LifeLine era={journey.era} age={journey.age} />
        <Text style={playerBox.total}>{t("{count} years", { count: LIFE_YEARS })}</Text>
      </View>
      <LifeBar era={journey.era} age={journey.age} big testID="life-map-bar" />
      <LifeLegend />
    </View>
  );
}

export function LifeMapSheet({ visible, onClose, accent, topGap = 40, startAt = 0 }: { visible: boolean; onClose: () => void; accent: string; topGap?: number; startAt?: number }) {
  return (
    <MapPlayerSheet
      visible={visible}
      onClose={onClose}
      accent={accent}
      heading={t("Map of his life ﷺ")}
      stops={PLAYER_STOPS}
      below={(index) => <LifeBox index={index} />}
      testPrefix="life-map"
      topGap={topGap}
      startAt={startAt}
    />
  );
}
