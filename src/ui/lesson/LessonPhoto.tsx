import React, { useState } from "react";
import { Image, StyleSheet, Text, useWindowDimensions, View, type GestureResponderEvent } from "react-native";
import { openWebPage } from "../../services/network";
import { creditLine, type LessonPicture } from "../../data/lessonPictures";
import { t } from "../../i18n";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space } from "../theme";
import { Icon } from "../Icon";
import { playUi } from "../sound";
import { LiveFrame, type Poke } from "./LivePicture";
import { PICTURE_LIFE, pokeSound } from "./pictureLife";

/** The picture, moving (see LivePicture): the slow camera drift and its own little life. */
function LiveImage({ picture, testID, cheer, poke, still }: { picture: LessonPicture; testID?: string; cheer?: number | string; poke?: Poke; still?: boolean }) {
  return (
    <LiveFrame aspect={photoAspect(picture)} life={PICTURE_LIFE[picture.id]} cheer={cheer} poke={poke} still={still}>
      <Image source={picture.image} style={styles.photoImage} resizeMode="cover" testID={testID} />
    </LiveFrame>
  );
}

const openPage = (url: string) => openWebPage(url);

/**
 * Tapping a living picture plays with it: sparkles burst from the finger, the picture bounces, and it makes the
 * sound of what lives on it (birds chirp, the sea splashes, the camels grumble). The magnifier opens it big.
 */
function usePoke(picture: LessonPicture) {
  const [poke, setPoke] = useState<Poke | undefined>(undefined);
  const onPoke = (event?: GestureResponderEvent) => {
    const x = event?.nativeEvent?.locationX ?? 60;
    const y = event?.nativeEvent?.locationY ?? 60;
    playUi(pokeSound(picture.id));
    setPoke((was) => ({ key: (was?.key ?? 0) + 1, x, y }));
  };
  return { poke, onPoke };
}

/** The magnifier on a picture's corner: shows it big. */
function OpenBig({ onPress, testID }: { onPress: () => void; testID?: string }) {
  return (
    <Tappable onPress={onPress} accessibilityLabel={t("Shows the photo bigger")} hitSlop={8} pressScale={0.88} style={styles.openBig} testID={testID}>
      <Icon name="search" size={18} color={colors.white} />
    </Tappable>
  );
}

/** Who took the photo and its license; opens the photo's Wikimedia Commons page. A drawing says it is one. */
function PhotoCredit({ picture, testID }: { picture: LessonPicture; testID?: string }) {
  if (picture.credit.drawn) {
    return (
      <Text style={[styles.credit, styles.creditTap]} numberOfLines={1} testID={testID}>
        {picture.credit.imagined ? t("Only a drawing: Allah knows best how it truly is") : picture.credit.note === "thing" ? t("A drawing") : t("A drawing of how it looked long ago")}
      </Text>
    );
  }
  const line = t("Photo: {credit}", { credit: creditLine(picture.credit) });
  return (
    <Tappable onPress={() => openPage(picture.credit.page)} accessibilityRole="link" accessibilityLabel={line} hitSlop={6} sound={false} style={styles.creditTap} testID={testID}>
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
        {/* Big, the picture lives too: its own life, without the camera drift (the whole picture stays in view). */}
        <View style={[styles.sheetImage, size, styles.sheetLive]} testID="photo-sheet-frame">
          <LiveFrame aspect={photoAspect(picture)} life={PICTURE_LIFE[picture.id]} calm>
            <Image source={picture.image} style={styles.photoImage} resizeMode="contain" accessible accessibilityLabel={t(picture.caption)} testID="photo-sheet-image" />
          </LiveFrame>
        </View>
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
 * The tallest a lesson page's big picture gets (it is the full width at 4:3 up to this): about two fifths of the
 * screen (a third on a short phone), so the words under it still start on the first screen.
 */
export function bigPhotoMaxHeight(screenHeight: number, short?: boolean) {
  return Math.round(Math.min(420, Math.max(150, screenHeight * (short ? 0.32 : 0.42))));
}

/**
 * The learn card's photo: full width, 16:9 (shorter on short phones), a caption chip on it and the credit under it.
 * `big`: a lesson page's picture, as big as the page allows (bigPhotoHeight). Tapping it shows it large.
 */
export function LessonPhoto({ picture, short, delay = 200, big }: { picture: LessonPicture; short?: boolean; delay?: number; big?: boolean }) {
  const [open, setOpen] = useState(false);
  const { poke, onPoke } = usePoke(picture);
  const { height } = useWindowDimensions();
  const bigStyle = big ? { aspectRatio: 4 / 3, maxHeight: bigPhotoMaxHeight(height || 800, short) } : null;
  return (
    <PopIn delay={delay} style={[styles.photoWrap, short ? styles.photoWrapShort : null, big ? styles.photoWrapBig : null]}>
      <View>
        <Tappable onPress={onPoke} pressScale={0.98} sound={false} accessibilityLabel={t(picture.caption)} style={[styles.photo, short ? styles.photoShort : null, bigStyle]} testID="lesson-photo">
          <LiveImage picture={picture} testID="lesson-photo-image" poke={poke} />
          <View style={styles.captionChip}>
            <Text style={[styles.captionText, short ? styles.captionTextShort : null, big && !short ? styles.captionTextBig : null]} numberOfLines={2}>
              {t(picture.caption)}
            </Text>
          </View>
        </Tappable>
        <OpenBig onPress={() => setOpen(true)} testID="lesson-photo-open" />
      </View>
      <PhotoCredit picture={picture} testID="lesson-photo-credit" />
      <PhotoSheet picture={picture} visible={open} onClose={() => setOpen(false)} />
    </PopIn>
  );
}

/**
 * A wide picture over a question that names a place: the full width, up to about a quarter of the screen tall, so
 * it is big enough to see while the answers still fit. Tapping it shows it large.
 */
export function QuestionBanner({ picture, cheer }: { picture: LessonPicture; cheer?: number | string }) {
  const [open, setOpen] = useState(false);
  const { height } = useWindowDimensions();
  const maxHeight = Math.round(Math.min(230, Math.max(110, (height || 800) * (height && height < 700 ? 0.21 : 0.26))));
  const { poke, onPoke } = usePoke(picture);
  return (
    <>
      <View style={styles.bannerWrap}>
        <Tappable onPress={onPoke} pressScale={0.98} sound={false} accessibilityLabel={t(picture.caption)} style={[styles.banner, { maxHeight }]} testID="question-photo">
          <LiveImage picture={picture} cheer={cheer} poke={poke} />
        </Tappable>
        <OpenBig onPress={() => setOpen(true)} testID="question-photo-open" />
      </View>
      <PhotoSheet picture={picture} visible={open} onClose={() => setOpen(false)} />
    </>
  );
}

/** A small living picture for the album and the "new in your album" card: square, rounded, moving. */
/** `still`: drawn without motion (the album holds the ones scrolled out of sight still, so a phone only moves what shows). */
export function AlbumThumb({ picture, size, testID, still }: { picture: LessonPicture; size: number; testID?: string; still?: boolean }) {
  return (
    <View style={[styles.thumb, { width: size, height: size }]} testID={testID} accessible accessibilityRole="image" accessibilityLabel={t(picture.caption)}>
      <LiveImage picture={picture} still={still} />
    </View>
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
        <LiveImage picture={picture} />
      </Tappable>
      <PhotoSheet picture={picture} visible={open} onClose={() => setOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  photoWrap: {
    alignSelf: "stretch",
    marginTop: space.lg,
    width: "100%"
  },
  photoWrapShort: {
    marginTop: space.sm
  },
  photoWrapBig: {
    marginTop: space.sm,
    marginBottom: space.xs
  },
  photo: {
    width: "100%",
    // Always 16:9, so the photo is never squeezed into a strip that cuts the place off.
    aspectRatio: 16 / 9,
    maxHeight: 280,
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
    fontSize: 14,
    lineHeight: 19,
    color: colors.white,
    backgroundColor: "rgba(31,45,39,0.82)",
    borderRadius: radii.xs,
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 3
  },
  captionTextBig: {
    fontSize: 16,
    lineHeight: 22
  },
  captionTextShort: {
    fontSize: 13,
    lineHeight: 17
  },
  creditTap: {
    alignSelf: "flex-end",
    maxWidth: "100%",
    marginTop: 2
  },
  credit: {
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.inkSoft
  },
  bannerWrap: {
    alignSelf: "stretch",
    width: "100%"
  },
  openBig: {
    position: "absolute",
    top: 8,
    end: 8,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(31,45,39,0.62)"
  },
  banner: {
    alignSelf: "stretch",
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: radii.lg,
    overflow: "hidden",
    backgroundColor: colors.mist,
    borderWidth: 2,
    borderColor: colors.line,
    marginBottom: space.sm
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
  sheetLive: {
    overflow: "hidden"
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
