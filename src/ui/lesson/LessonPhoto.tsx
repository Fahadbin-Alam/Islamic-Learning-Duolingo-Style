import React, { useState } from "react";
import { Image, Linking, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { creditLine, type LessonPicture } from "../../data/lessonPictures";
import { t } from "../../i18n";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space } from "../theme";

const openPage = (url: string) => void Linking.openURL(url).catch(() => undefined);

/** Who took the photo and its license; opens the photo's Wikimedia Commons page. A drawing says it is one. */
function PhotoCredit({ picture, testID }: { picture: LessonPicture; testID?: string }) {
  if (picture.credit.drawn) {
    return (
      <Text style={[styles.credit, styles.creditTap]} numberOfLines={1} testID={testID}>
        {t("A drawing of how it looked long ago")}
      </Text>
    );
  }
  const line = t("Photo: {credit}", { credit: creditLine(picture.credit) });
  return (
    <Tappable
      onPress={() => openPage(picture.credit.page)}
      accessibilityRole="link"
      accessibilityLabel={line}
      hitSlop={6}
      sound={false}
      style={styles.creditTap}
      testID={testID}
    >
      <Text style={styles.credit} numberOfLines={1}>
        {line}
      </Text>
    </Tappable>
  );
}

/** Width over height of a bundled photo; 4:3 when it cannot be read. */
export function photoAspect(picture: LessonPicture) {
  const size = Image.resolveAssetSource?.(picture.image as number);
  return size?.width && size?.height ? size.width / size.height : 4 / 3;
}

/**
 * How big the sheet shows a photo: the whole photo, nothing cut off, as wide as the sheet allows (up to 600) and
 * no taller than 62% of the screen, so the caption and Close stay in view.
 */
export function photoSheetSize(aspect: number, screenWidth: number, screenHeight: number) {
  const maxWidth = Math.min(600, Math.max(200, screenWidth - 2 * space.lg));
  const maxHeight = Math.max(160, screenHeight * 0.62);
  const width = Math.min(maxWidth, maxHeight * aspect);
  return { width: Math.round(width), height: Math.round(width / aspect) };
}

/** The photo large and whole, with its caption and credit, in a sheet over the lesson. */
export function PhotoSheet({ picture, visible, onClose }: { picture: LessonPicture; visible: boolean; onClose: () => void }) {
  const { width, height } = useWindowDimensions();
  const size = photoSheetSize(photoAspect(picture), width || 390, height || 800);
  return (
    <Sheet visible={visible} onClose={onClose} testID="photo-sheet">
      <View style={styles.sheetBody}>
        <Image
          source={picture.image}
          style={[styles.sheetImage, size]}
          resizeMode="contain"
          accessible
          accessibilityLabel={t(picture.caption)}
          testID="photo-sheet-image"
        />
        <Text style={styles.sheetCaption}>{t(picture.caption)}</Text>
        <PhotoCredit picture={picture} testID="photo-sheet-credit" />
        <Tappable onPress={onClose} style={styles.closeButton} accessibilityLabel={t("Close")} testID="photo-sheet-close">
          <Text style={styles.closeText}>{t("Close")}</Text>
        </Tappable>
      </View>
    </Sheet>
  );
}

/**
 * The learn card's photo: full width, 16:9 (shorter on short phones), a caption chip on it and the credit under it.
 * Tapping it shows it large.
 */
export function LessonPhoto({ picture, short, delay = 200 }: { picture: LessonPicture; short?: boolean; delay?: number }) {
  const [open, setOpen] = useState(false);
  return (
    <PopIn delay={delay} style={[styles.photoWrap, short ? styles.photoWrapShort : null]}>
      <Tappable
        onPress={() => setOpen(true)}
        pressScale={0.98}
        accessibilityLabel={t(picture.caption)}
        accessibilityHint={t("Shows the photo bigger")}
        style={[styles.photo, short ? styles.photoShort : null]}
        testID="lesson-photo"
      >
        <Image source={picture.image} style={styles.photoImage} resizeMode="cover" testID="lesson-photo-image" />
        <View style={styles.captionChip}>
          <Text style={styles.captionText} numberOfLines={2}>
            {t(picture.caption)}
          </Text>
        </View>
      </Tappable>
      <PhotoCredit picture={picture} testID="lesson-photo-credit" />
      <PhotoSheet picture={picture} visible={open} onClose={() => setOpen(false)} />
    </PopIn>
  );
}

/** A square photo the size of the mascot, next to a question that names the place. Tapping it shows it large. */
export function QuestionPhoto({ picture, size }: { picture: LessonPicture; size: number }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Tappable
        onPress={() => setOpen(true)}
        pressScale={0.95}
        accessibilityLabel={t(picture.caption)}
        accessibilityHint={t("Shows the photo bigger")}
        style={[styles.thumb, { width: size, height: size }]}
        testID="question-photo"
      >
        <Image source={picture.image} style={styles.photoImage} resizeMode="cover" />
      </Tappable>
      <PhotoSheet picture={picture} visible={open} onClose={() => setOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  photoWrap: {
    alignSelf: "stretch",
    marginTop: space.lg,
    maxWidth: 440,
    width: "100%"
  },
  photoWrapShort: {
    marginTop: space.sm
  },
  photo: {
    width: "100%",
    // Always 16:9, so the photo is never squeezed into a strip that cuts the place off.
    aspectRatio: 16 / 9,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderColor: colors.line
  },
  photoShort: {
    maxHeight: 128
  },
  // Covers the box from its middle, so the place sits in the center of the frame.
  photoImage: {
    width: "100%",
    height: "100%",
    alignSelf: "center"
  },
  captionChip: {
    position: "absolute",
    start: space.sm,
    bottom: space.sm,
    end: space.sm,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center"
  },
  captionText: {
    flexShrink: 1,
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 17,
    color: colors.white,
    backgroundColor: "rgba(31,45,39,0.72)",
    borderRadius: radii.xs,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  creditTap: {
    alignSelf: "flex-end",
    maxWidth: "100%",
    marginTop: 2
  },
  credit: {
    fontFamily: fonts.body,
    fontSize: 11,
    lineHeight: 15,
    color: colors.inkSoft
  },
  thumb: {
    borderRadius: radii.md,
    overflow: "hidden",
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderColor: colors.line
  },
  sheetBody: {
    paddingHorizontal: space.lg,
    paddingTop: space.lg,
    paddingBottom: space.md,
    alignItems: "stretch"
  },
  sheetImage: {
    alignSelf: "center",
    borderRadius: radii.lg,
    backgroundColor: colors.mist
  },
  sheetCaption: {
    marginTop: space.md,
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    color: colors.ink,
    textAlign: "center"
  },
  closeButton: {
    marginTop: space.md,
    alignSelf: "center",
    paddingHorizontal: space.xl,
    paddingVertical: space.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.mist
  },
  closeText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    color: colors.ink
  }
});
