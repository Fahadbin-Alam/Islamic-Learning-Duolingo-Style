import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, ScrollView, StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import { SvgXml } from "react-native-svg";
import { LIFE_YEARS, SEERAH_JOURNEYS, sourcesFor, type MapScene, type SeerahJourney } from "../../data/seerahMap";
import { SEERAH_UNITS } from "../../data/seerahUnits";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, text, topicPalette } from "../theme";
import { useBackToClose } from "../screens/sheetParts";
import { MapSources } from "./JourneyCard";
import { JourneyMap } from "./JourneyMap";
import { ERA_COLORS, LifeBar, LifeLegend, LifeLine } from "./LifeBar";

/**
 * "Map of his life ﷺ": the Seerah played in order on the map, one place after another, from Makkah where he ﷺ grew up
 * to the Farewell Hajj, with the bar of his 63 years under it (40 before revelation, 13 in Makkah, 10 in Madinah). It
 * plays by itself (each road draws, rests, then the next comes); back, pause and next, or tap a dot to jump.
 */

export type LifeStop = { journey: SeerahJourney; scene: MapScene; sceneIndex: number };

export const LIFE_STOPS: readonly LifeStop[] = SEERAH_JOURNEYS.flatMap((journey) => journey.scenes.map((scene, sceneIndex) => ({ journey, scene, sceneIndex })));

const UNIT_TITLES = new Map(SEERAH_UNITS.map((unit) => [unit.branchId, unit.branch?.title ?? unit.name]));
export const stopTitle = (stop: LifeStop) => UNIT_TITLES.get(stop.journey.branchId) ?? "";

// How long a stop rests once its road is drawn, before the next one comes.
const REST_MS = 2600;

export const MAP_GLYPH = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M3 7l8-3 10 3 8-3v21l-8 3-10-3-8 3Z" fill="#F6E7C6" stroke="#B48A55" stroke-width="1.6" stroke-linejoin="round"/><path d="M11 4v21M21 7v21" stroke="#D9BD8C" stroke-width="1.4"/><path d="M3 18q4-2 6 1t5 0" fill="none" stroke="#7FC6EA" stroke-width="2.2" stroke-linecap="round"/><circle cx="7" cy="22" r="1.4" fill="#E04E2B"/><circle cx="11" cy="19.5" r="1.4" fill="#E04E2B"/><circle cx="15" cy="16.5" r="1.4" fill="#E04E2B"/><circle cx="18.5" cy="13.5" r="1.4" fill="#E04E2B"/><path d="M23 6.5a4 4 0 0 1 4 4c0 3-4 7-4 7s-4-4-4-7a4 4 0 0 1 4-4Z" fill="#E04E2B" stroke="#FFFFFF" stroke-width="1.2"/><circle cx="23" cy="10.5" r="1.5" fill="#FFFFFF"/></svg>`;

/** The banner on the Prophets path that opens the map of his life ﷺ. */
export function LifeMapBanner({ accent, onOpen }: { accent: string; onOpen: () => void }) {
  const palette = topicPalette(accent);
  return (
    <Tappable
      onPress={onOpen}
      sound="node_tap"
      pressScale={0.97}
      accessibilityLabel={t("Map of his life ﷺ")}
      testID="life-map-banner"
      style={[styles.banner, { backgroundColor: palette.light, borderColor: palette.soft, borderBottomColor: palette.lip }]}
    >
      <View style={[styles.bannerIcon, { backgroundColor: palette.main }]}>
        <SvgXml xml={MAP_GLYPH} width={28} height={28} />
      </View>
      <View style={styles.bannerText}>
        <Text style={styles.bannerTitle} numberOfLines={1}>
          {withHonorifics(t("Map of his life ﷺ"))}
        </Text>
        <Text style={styles.bannerLine} numberOfLines={2}>
          {withHonorifics(t("Where each part of the Seerah happened, in order."))}
        </Text>
      </View>
      <Icon name="chevronRight" size={20} color={palette.ink} />
    </Tappable>
  );
}

/** Each stop's map comes in softly. */
function FadeIn({ children, still }: { children: React.ReactNode; still: boolean }) {
  const shown = useRef(new Animated.Value(still ? 1 : 0)).current;
  useEffect(() => {
    if (still) return undefined;
    const fade = Animated.timing(shown, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: true });
    fade.start();
    return () => fade.stop();
  }, [shown, still]);
  return <Animated.View style={[StyleSheet.absoluteFill, { opacity: shown }]}>{children}</Animated.View>;
}

const PAUSE = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="6" y="5" width="4.2" height="14" rx="1.6" fill="#FFFFFF"/><rect x="13.8" y="5" width="4.2" height="14" rx="1.6" fill="#FFFFFF"/></svg>`;

export function LifeMapSheet({ visible, onClose, accent, topGap = 40, startAt = 0 }: { visible: boolean; onClose: () => void; accent: string; topGap?: number; startAt?: number }) {
  const still = useReduceMotion();
  const { height: screenHeight } = useWindowDimensions();
  const palette = topicPalette(accent);
  const [index, setIndex] = useState(startAt);
  const [playing, setPlaying] = useState(!still);
  const [drawn, setDrawn] = useState(-1);
  const [width, setWidth] = useState(0);
  useBackToClose(visible, onClose);

  useEffect(() => {
    if (visible) {
      setIndex(startAt);
      setDrawn(-1);
      setPlaying(!still);
    }
  }, [startAt, still, visible]);

  // Playing: once a stop's road is drawn, rest, then go on to the next; stop at the end.
  useEffect(() => {
    if (!visible || !playing || drawn !== index) return undefined;
    if (index >= LIFE_STOPS.length - 1) {
      setPlaying(false);
      return undefined;
    }
    const timer = setTimeout(() => setIndex((at) => Math.min(LIFE_STOPS.length - 1, at + 1)), REST_MS);
    return () => clearTimeout(timer);
  }, [drawn, index, playing, visible]);

  const go = (to: number) => {
    setDrawn(-1);
    setIndex(Math.max(0, Math.min(LIFE_STOPS.length - 1, to)));
  };
  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (index >= LIFE_STOPS.length - 1) go(0);
    setPlaying(true);
  };

  const stop = LIFE_STOPS[index];
  const mapHeight = width > 0 ? Math.round(Math.min(width * 0.78, Math.max(200, (screenHeight || 800) * 0.4))) : 0;
  const onLayout = (event: LayoutChangeEvent) => setWidth(Math.round(event.nativeEvent.layout.width));
  const title = t(stopTitle(stop));

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap }]} testID="life-map-sheet">
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.heading} accessibilityRole="header" numberOfLines={1}>
            {withHonorifics(t("Map of his life ﷺ"))}
          </Text>
        </View>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="life-map-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.frame, { height: mapHeight || 220 }]} onLayout={onLayout} testID="life-map-frame">
          {width > 0 ? (
            <FadeIn key={`${stop.scene.id}-${index}`} still={still}>
              <JourneyMap scene={stop.scene} width={width - 4} height={mapHeight - 4} still={still} delay={still ? 0 : 280} onDrawn={() => setDrawn(index)} />
            </FadeIn>
          ) : null}
        </View>
        <View style={styles.stopHead}>
          <View style={[styles.stopBadge, { backgroundColor: ERA_COLORS[stop.journey.era] }]}>
            <Text style={styles.stopBadgeText}>{index + 1}</Text>
          </View>
          <Text style={styles.stopTitle} numberOfLines={2} testID="life-map-title">
            {withHonorifics(title)}
          </Text>
        </View>
        <Text style={styles.caption} testID="life-map-caption">
          {withHonorifics(t(stop.scene.caption))}
        </Text>
        <MapSources sources={sourcesFor(stop.scene)} testID="life-map-sources" />
        <View style={styles.lifeBox}>
          <View style={styles.lifeHead}>
            <LifeLine era={stop.journey.era} age={stop.journey.age} />
            <Text style={styles.lifeTotal}>{t("{count} years", { count: LIFE_YEARS })}</Text>
          </View>
          <LifeBar era={stop.journey.era} age={stop.journey.age} big testID="life-map-bar" />
          <LifeLegend />
        </View>
        <View style={styles.controls}>
          <Tappable onPress={() => go(index - 1)} disabled={index === 0} accessibilityLabel={t("Back")} testID="life-map-back" style={[styles.step, index === 0 ? styles.stepOff : null]} hitSlop={6}>
            <View style={styles.flip}>
              <Icon name="chevronRight" size={24} color={colors.ink} />
            </View>
          </Tappable>
          <Tappable onPress={togglePlay} accessibilityLabel={playing ? t("Pause") : t("Play")} testID="life-map-play" style={[styles.play, { backgroundColor: palette.main, borderBottomColor: palette.lip }]}>
            {playing ? <SvgXml xml={PAUSE} width={26} height={26} /> : <Icon name="play" size={26} color={colors.white} />}
          </Tappable>
          <Tappable onPress={() => go(index + 1)} disabled={index >= LIFE_STOPS.length - 1} accessibilityLabel={t("Next")} testID="life-map-next" style={[styles.step, index >= LIFE_STOPS.length - 1 ? styles.stepOff : null]} hitSlop={6}>
            <Icon name="chevronRight" size={24} color={colors.ink} />
          </Tappable>
        </View>
        <View style={styles.dots}>
          {LIFE_STOPS.map((each, at) => (
            <Tappable key={`${each.scene.id}`} onPress={() => go(at)} accessibilityLabel={`${at + 1}. ${t(stopTitle(each))}`} hitSlop={4} pressScale={0.8} sound={false} style={styles.dotTap} testID={`life-map-dot-${at}`}>
              <View style={[styles.dot, { backgroundColor: ERA_COLORS[each.journey.era], opacity: at <= index ? 1 : 0.35 }, at === index ? styles.dotOn : null]} />
            </Tappable>
          ))}
        </View>
      </ScrollView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  // The same size and spacing as the Story mode banner above it on the path.
  banner: { flexDirection: "row", alignItems: "center", gap: 10, marginHorizontal: 16, marginTop: 8, marginBottom: 4, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18, borderWidth: 2, borderBottomWidth: 5 },
  bannerIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  bannerText: { flex: 1, minWidth: 0 },
  bannerTitle: { fontFamily: fonts.displayHeavy, fontSize: 16, lineHeight: 20, color: colors.ink },
  bannerLine: { ...text.small, color: colors.inkSoft },
  sheet: { paddingTop: 14 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 10, gap: 10 },
  headerText: { flex: 1, minWidth: 0 },
  heading: { ...text.h2 },
  close: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: colors.mist },
  scroll: { flex: 1 },
  content: { paddingBottom: 28 },
  frame: { width: "100%", borderRadius: radii.lg, overflow: "hidden", borderWidth: 2, borderColor: colors.line, backgroundColor: "#F1DFB9" },
  stopHead: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 12 },
  stopBadge: { minWidth: 26, height: 26, borderRadius: 13, paddingHorizontal: 6, alignItems: "center", justifyContent: "center" },
  stopBadgeText: { fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 17, color: colors.white },
  stopTitle: { flex: 1, fontFamily: fonts.displayHeavy, fontSize: 18, lineHeight: 23, color: colors.ink },
  caption: { fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 21, color: colors.ink, marginTop: 4, marginBottom: 6 },
  lifeBox: { marginTop: 12, padding: 12, borderRadius: 16, borderWidth: 2, borderColor: colors.line, backgroundColor: colors.mist },
  lifeHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  lifeTotal: { fontFamily: fonts.bodyHeavy, fontSize: 13, lineHeight: 17, color: colors.inkSoft },
  controls: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 22, marginTop: 14 },
  step: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center", backgroundColor: colors.white, borderWidth: 2, borderColor: colors.line, borderBottomWidth: 4, borderBottomColor: colors.lineLip },
  stepOff: { opacity: 0.4 },
  flip: { transform: [{ scaleX: -1 }] },
  play: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", borderBottomWidth: 5 },
  dots: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 1, marginTop: 14 },
  dotTap: { width: 13, height: 22, alignItems: "center", justifyContent: "center" },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotOn: { width: 13, height: 13, borderRadius: 7, borderWidth: 2, borderColor: colors.white }
});
