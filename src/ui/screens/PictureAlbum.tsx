import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { getLessonPicture, LESSON_PICTURE_IDS, type LessonPicture } from "../../data/lessonPictures";
import { useAlbum } from "../../services/pictureAlbum";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { AlbumThumb, PhotoSheet } from "../lesson/LessonPhoto";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";

const COLUMNS = 3;

/** Every picture the album can hold, in the app's own order. */
export const ALBUM_PICTURES: LessonPicture[] = LESSON_PICTURE_IDS.map((id) => getLessonPicture(id)).filter((picture): picture is LessonPicture => Boolean(picture));

/**
 * The picture album: every lesson picture found so far, moving, and a locked card for each still to find. Tapping a
 * found one shows it big with its caption. Lessons fill it, so there is always a reason to start the next one.
 */
export function PictureAlbumSheet({ visible, onClose, topGap = 40, bottomInset = 0 }: { visible: boolean; onClose: () => void; topGap?: number; bottomInset?: number }) {
  useBackToClose(visible, onClose);
  const found = useAlbum();
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState<LessonPicture | null>(null);
  const foundSet = new Set(found);
  const count = ALBUM_PICTURES.filter((picture) => foundSet.has(picture.id)).length;
  // Found first (newest last, as an album fills), then the ones still to find.
  const shown = [...ALBUM_PICTURES.filter((picture) => foundSet.has(picture.id)).sort((a, b) => found.indexOf(a.id) - found.indexOf(b.id)), ...ALBUM_PICTURES.filter((picture) => !foundSet.has(picture.id))];
  const inner = Math.min(560, (width || 390) - 2 * space.lg);
  const size = Math.floor((inner - (COLUMNS - 1) * space.sm) / COLUMNS);
  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="album-sheet">
      <View style={styles.header}>
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
          {t("Picture album")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="album-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      <Text style={styles.count} testID="album-count">
        {t("{count} of {total} found", { count: formatNumber(count), total: formatNumber(ALBUM_PICTURES.length) })}
      </Text>
      <ProgressBar progress={ALBUM_PICTURES.length ? count / ALBUM_PICTURES.length : 0} />
      <ScrollView style={styles.scroll} contentContainerStyle={[styles.grid, { paddingBottom: 32 + bottomInset }]} showsVerticalScrollIndicator={false}>
        {!count ? <Text style={styles.empty}>{t("Finish lessons to collect the pictures of the places and things they teach.")}</Text> : null}
        {shown.map((picture) =>
          foundSet.has(picture.id) ? (
            <Tappable key={picture.id} onPress={() => setOpen(picture)} accessibilityLabel={t(picture.caption)} accessibilityHint={t("Shows the photo bigger")} style={{ width: size }} pressScale={0.95} testID="album-found">
              <AlbumThumb picture={picture} size={size} />
              <Text style={styles.caption} numberOfLines={2}>
                {t(picture.caption)}
              </Text>
            </Tappable>
          ) : (
            <View key={picture.id} style={{ width: size }} testID="album-locked" accessible accessibilityLabel={t("Not found yet")}>
              <View style={[styles.locked, { width: size, height: size }]}>
                <Icon name="lock" size={Math.round(size * 0.3)} color={colors.lineLip} />
              </View>
              <Text style={[styles.caption, styles.lockedCaption]} numberOfLines={1}>
                {t("Not found yet")}
              </Text>
            </View>
          )
        )}
      </ScrollView>
      {open ? <PhotoSheet picture={open} visible onClose={() => setOpen(null)} /> : null}
    </Sheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    paddingTop: 14
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4
  },
  heading: {
    ...text.h2,
    flex: 1,
    minWidth: 0
  },
  close: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  count: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 15,
    color: colors.inkSoft,
    marginBottom: space.xs
  },
  scroll: {
    flex: 1,
    marginTop: space.md
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: space.sm
  },
  empty: {
    width: "100%",
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    lineHeight: 21,
    color: colors.inkSoft,
    textAlign: "center",
    marginBottom: space.sm
  },
  caption: {
    marginTop: 4,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.ink,
    textAlign: "center"
  },
  locked: {
    borderRadius: radii.md,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.line,
    backgroundColor: colors.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  lockedCaption: {
    color: colors.inkSoft
  }
});
