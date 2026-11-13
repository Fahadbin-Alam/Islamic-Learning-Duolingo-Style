import React, { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View, type LayoutChangeEvent } from "react-native";
import type { LessonSign } from "../../data/signScenes";
import { withHonorifics } from "../ArabicText";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { useReduceMotion } from "../motion";
import { PopIn } from "../PopIn";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space } from "../theme";
import { bigPhotoMaxHeight } from "../lesson/LessonPhoto";
import { textScaled } from "../textScale";
import { MapSources } from "./JourneyCard";
import { SignSceneView } from "./SignScene";

const SIGN_ASPECT = 4 / 3;

/**
 * A lesson about one of Allah's signs in creation opens on its scene, alive (in the place of its photo, which moves to
 * the next page): rain on a dead land, the clouds piled up, the crops that turn yellow, the seed of seven ears, the two
 * seas, the ships, the mountains like pegs, the bee, the spider's house, the good tree, or the camels, the sky, the
 * mountains and the earth. Under it what the ayahs say, and their sources. Tap the scene to watch it again.
 */
export function SignCard({ sign, short, delay = 380, onOpenSource }: { sign: LessonSign; short?: boolean; delay?: number; onOpenSource?: (url: string) => void }) {
  const { height: screenHeight } = useWindowDimensions();
  const still = useReduceMotion();
  const [size, setSize] = useState<{ width: number; height: number } | undefined>(undefined);
  const [play, setPlay] = useState(0);
  const { scene } = sign;
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
          accessibilityHint={t("Plays the scene again")}
          style={[styles.frame, { maxHeight: bigPhotoMaxHeight(screenHeight || 800, short) }]}
          testID="sign-card"
        >
          <View style={StyleSheet.absoluteFill} onLayout={onLayout} testID="sign-card-frame">
            {size ? <SignSceneView scene={scene} width={size.width} height={size.height} still={still} play={play} delay={still ? 0 : delay + 250} /> : null}
          </View>
        </Tappable>
      </View>
      <View style={styles.captionRow}>
        <Text style={[styles.caption, short ? styles.captionShort : null]} testID="sign-caption">
          {withHonorifics(caption)}
        </Text>
        <Tappable onPress={() => setPlay((count) => count + 1)} accessibilityLabel={t("Plays the scene again")} hitSlop={8} pressScale={0.88} style={styles.replay} testID="sign-replay">
          <Icon name="repeat" size={18} color={colors.inkSoft} />
        </Tappable>
      </View>
      <View style={styles.bottom}>
        <MapSources sources={scene.sources} onOpen={onOpenSource} lead={t("Source")} testID="sign-sources" />
      </View>
    </PopIn>
  );
}

// The caption grows with "Bigger text" in Settings, like the rest of the lesson page.
const styles = textScaled(
  StyleSheet.create({
    wrap: { alignSelf: "stretch", width: "100%", marginTop: space.sm, marginBottom: space.xs },
    wrapShort: { marginTop: space.xs },
    frame: {
      width: "100%",
      aspectRatio: SIGN_ASPECT,
      borderRadius: radii.lg,
      overflow: "hidden",
      backgroundColor: "#E8F1F6",
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
    bottom: { flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", gap: space.sm, marginTop: 8, flexWrap: "wrap" }
  })
);
