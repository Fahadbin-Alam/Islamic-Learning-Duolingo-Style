import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { LessonSky } from "../../data/daySky";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { PopIn } from "../PopIn";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space } from "../theme";
import { bigPhotoMaxHeight } from "../lesson/LessonPhoto";
import { textScaled } from "../textScale";
import { DayBar, SkyWhen } from "./DayBar";
import { DaySky } from "./DaySky";
import { MapSources } from "./JourneyCard";

const SKY_ASPECT = 4 / 3;

/**
 * A lesson about a time of the day opens on the sky at that time (in the place of its photo, which moves to the next
 * page): the sun moving to where it is for Fajr, Zuhr, Asr, Maghrib or Isha, or the night and its stars, with the
 * sky's touches. Under it what the sky shows, the times of the day with this one lit, when it is, and its sources.
 * Tap the sky to watch it again.
 */
export function SkyCard({ sky, short, delay = 380, onOpenSource }: { sky: LessonSky; short?: boolean; delay?: number; onOpenSource?: (url: string) => void }) {
  const { height: screenHeight } = useWindowDimensions();
  const still = useReduceMotion();
  const [size, setSize] = useState<{ width: number; height: number } | undefined>(undefined);
  const [play, setPlay] = useState(0);
  const { scene, stop } = sky;
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
          accessibilityHint={t("Plays the sky again")}
          style={[styles.frame, { maxHeight: bigPhotoMaxHeight(screenHeight || 800, short) }]}
          testID="sky-card"
        >
          <View style={StyleSheet.absoluteFill} onLayout={onLayout} testID="sky-card-frame">
            {size ? <DaySky scene={scene} width={size.width} height={size.height} still={still} play={play} delay={still ? 0 : delay + 250} /> : null}
          </View>
        </Tappable>
      </View>
      <View style={styles.captionRow}>
        <Text style={[styles.caption, short ? styles.captionShort : null]} testID="sky-caption">
          {withHonorifics(caption)}
        </Text>
        <Tappable onPress={() => setPlay((count) => count + 1)} accessibilityLabel={t("Plays the sky again")} hitSlop={8} pressScale={0.88} style={styles.replay} testID="sky-replay">
          <Icon name="repeat" size={18} color={colors.inkSoft} />
        </Tappable>
      </View>
      <DayBar stop={stop} testID="sky-day-bar" />
      <View style={styles.bottom}>
        <SkyWhen stop={stop} />
        <MapSources sources={scene.sources} onOpen={onOpenSource} lead={t("Times from")} testID="sky-sources" />
      </View>
    </PopIn>
  );
}

// The caption grows with "Bigger text" in Settings, like the rest of the lesson page.
const styles = textScaled(StyleSheet.create({
  wrap: { alignSelf: "stretch", width: "100%", marginTop: space.sm, marginBottom: space.xs },
  wrapShort: { marginTop: space.xs },
  frame: {
    width: "100%",
    aspectRatio: SKY_ASPECT,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: "#0A1233",
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
  bottom: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: space.sm, marginTop: 8, flexWrap: "wrap" }
}));
