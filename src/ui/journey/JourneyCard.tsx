import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import { sourcesFor, type LessonJourney, type MapSource } from "../../data/seerahMap";
import { openWebPage } from "../../services/network";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { PopIn } from "../PopIn";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space } from "../theme";
import { bigPhotoMaxHeight } from "../lesson/LessonPhoto";
import { JourneyMap } from "./JourneyMap";
import { LifeBar, LifeLine } from "./LifeBar";

const MAP_ASPECT = 4 / 3;

/** Where the map's roads and notes come from, each opening its page (sunnah.com, quran.com). */
export function MapSources({ sources, onOpen = openWebPage, testID }: { sources: MapSource[]; onOpen?: (url: string) => void; testID?: string }) {
  return (
    <View style={styles.sources} testID={testID}>
      <Text style={styles.sourcesLead}>{t("Map from")}</Text>
      {sources.map((source) => (
        <Tappable key={source.reference} onPress={() => onOpen(source.url)} accessibilityRole="link" accessibilityLabel={t(source.reference)} hitSlop={6} sound={false} style={styles.sourceTap}>
          <Text style={styles.sourceText} numberOfLines={1}>
            {t(source.reference)}
          </Text>
        </Tappable>
      ))}
    </View>
  );
}

/**
 * A Seerah lesson's first page opens on its map (in the place of its photo): where it happened and the road that led
 * there, drawing itself; under it what the map shows, where in his life ﷺ it was, and the map's sources. Tap the map to
 * watch the road again.
 */
export function JourneyCard({ journey, short, delay = 380, onOpenSource }: { journey: LessonJourney; short?: boolean; delay?: number; onOpenSource?: (url: string) => void }) {
  const { height: screenHeight } = useWindowDimensions();
  const still = useReduceMotion();
  const [size, setSize] = useState<{ width: number; height: number } | undefined>(undefined);
  const [play, setPlay] = useState(0);
  const { scene, lessonSlug, focus, era, age } = journey;
  const caption = t(scene.caption);
  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const next = { width: Math.round(width), height: Math.round(height) };
    if (next.width > 0 && next.height > 0 && (next.width !== size?.width || next.height !== size?.height)) setSize(next);
  };
  return (
    <PopIn delay={delay} style={[styles.wrap, short ? styles.wrapShort : null]}>
      <View>
        <Tappable
          onPress={() => setPlay((count) => count + 1)}
          pressScale={0.98}
          accessibilityRole="imagebutton"
          accessibilityLabel={caption}
          accessibilityHint={t("Shows the road again")}
          style={[styles.frame, { maxHeight: bigPhotoMaxHeight(screenHeight || 800, short) }]}
          testID="journey-map"
        >
          <View style={StyleSheet.absoluteFill} onLayout={onLayout} testID="journey-map-frame">
            {size ? <JourneyMap scene={scene} width={size.width} height={size.height} lessonSlug={lessonSlug} focus={focus} still={still} play={play} delay={still ? 0 : delay + 250} /> : null}
          </View>
        </Tappable>
      </View>
      {/* What the map shows, and a button to watch the road again (kept off the map, so it hides no place). */}
      <View style={styles.captionRow}>
        <Text style={[styles.caption, short ? styles.captionShort : null]} testID="journey-caption">
          {withHonorifics(caption)}
        </Text>
        <Tappable onPress={() => setPlay((count) => count + 1)} accessibilityLabel={t("Shows the road again")} hitSlop={8} pressScale={0.88} style={styles.replay} testID="journey-map-replay">
          <Icon name="repeat" size={18} color={colors.inkSoft} />
        </Tappable>
      </View>
      <LifeBar era={era} age={age} testID="journey-life" />
      <View style={styles.bottom}>
        <LifeLine era={era} age={age} />
        <MapSources sources={sourcesFor(scene, lessonSlug)} onOpen={onOpenSource} testID="journey-sources" />
      </View>
    </PopIn>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "stretch", width: "100%", marginTop: space.sm, marginBottom: space.xs },
  wrapShort: { marginTop: space.xs },
  frame: {
    width: "100%",
    aspectRatio: MAP_ASPECT,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: "#F1DFB9",
    borderWidth: 2,
    borderColor: colors.line
  },
  captionRow: { flexDirection: "row", alignItems: "flex-start", gap: space.sm, marginTop: space.sm },
  replay: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderColor: colors.line
  },
  caption: { flex: 1, fontFamily: fonts.bodyBold, fontSize: 15, lineHeight: 21, color: colors.ink },
  captionShort: { fontSize: 14, lineHeight: 19 },
  bottom: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: space.sm, marginTop: 8, flexWrap: "wrap" },
  sources: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "flex-end", columnGap: 6, rowGap: 2, flexShrink: 1 },
  sourcesLead: { fontFamily: fonts.bodyBold, fontSize: 12, lineHeight: 17, color: colors.inkSoft },
  sourceTap: { maxWidth: "100%" },
  sourceText: { fontFamily: fonts.bodyHeavy, fontSize: 12, lineHeight: 17, color: "#1683D1", textDecorationLine: "underline" }
});
