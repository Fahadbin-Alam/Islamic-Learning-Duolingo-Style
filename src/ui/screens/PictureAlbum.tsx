import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { getLessonPicture, LESSON_PICTURE_IDS, type LessonPicture } from "../../data/lessonPictures";
import { useAlbum } from "../../services/pictureAlbum";
import { ALBUM_SETS, setProgress, type AlbumSet } from "../../data/albumSets";
import { withHonorifics } from "../ArabicText";
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
/** A caption under a picture: its margin and two lines. */
const CAPTION_HEIGHT = 4 + 2 * 16;

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
  // Only the rows on screen move: a full album is dozens of living pictures, too many to run at once on a phone.
  const [view, setView] = useState({ top: 0, height: 0 });
  // A set picked above the grid shows only its pictures; null shows them all.
  const [setId, setSetId] = useState<string | null>(null);
  const picked = ALBUM_SETS.find((set) => set.id === setId) ?? null;
  const foundSet = new Set(found);
  const count = ALBUM_PICTURES.filter((picture) => foundSet.has(picture.id)).length;
  // Found first (newest last, as an album fills), then the ones still to find.
  const pool = picked ? ALBUM_PICTURES.filter((picture) => picked.pictures.includes(picture.id)) : ALBUM_PICTURES;
  const shown = [...pool.filter((picture) => foundSet.has(picture.id)).sort((a, b) => found.indexOf(a.id) - found.indexOf(b.id)), ...pool.filter((picture) => !foundSet.has(picture.id))];
  const inner = Math.min(560, (width || 390) - 2 * space.lg);
  const size = Math.floor((inner - (COLUMNS - 1) * space.sm) / COLUMNS);
  const rowHeight = size + CAPTION_HEIGHT + space.sm;
  const onScreen = (index: number) => {
    // Before the list knows its height, the first rows count as shown.
    const bottom = view.top + (view.height || 3 * rowHeight);
    const top = Math.floor(index / COLUMNS) * rowHeight;
    return top + rowHeight > view.top - rowHeight / 2 && top < bottom + rowHeight / 2;
  };
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
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.setsScroll} contentContainerStyle={styles.sets} testID="album-sets">
        <SetChip label={t("All")} active={!picked} onPress={() => setSetId(null)} testID="album-set-all" />
        {ALBUM_SETS.map((set) => (
          <SetChip key={set.id} set={set} have={setProgress(set, found)} active={picked?.id === set.id} onPress={() => setSetId(picked?.id === set.id ? null : set.id)} testID={`album-set-${set.id}`} />
        ))}
      </ScrollView>
      <ScrollView
        key={setId ?? "all"}
        style={styles.scroll}
        onLayout={(event) => {
          const height = event.nativeEvent.layout.height;
          setView((was) => (was.height === height ? was : { ...was, height }));
        }}
        onScroll={(event) => {
          const top = Math.max(0, event.nativeEvent.contentOffset.y);
          // A new row every so often is enough: the half-row margin covers the rest.
          setView((was) => (Math.abs(was.top - top) < rowHeight / 3 ? was : { ...was, top }));
        }}
        scrollEventThrottle={64}
        contentContainerStyle={[styles.grid, { paddingBottom: 32 + bottomInset }]} showsVerticalScrollIndicator={false}>
        {!count ? <Text style={styles.empty}>{t("Finish lessons to collect the pictures of the places and things they teach.")}</Text> : null}
        {shown.map((picture, index) =>
          foundSet.has(picture.id) ? (
            <Tappable key={picture.id} onPress={() => setOpen(picture)} accessibilityLabel={t(picture.caption)} accessibilityHint={t("Shows the photo bigger")} style={{ width: size }} pressScale={0.95} testID="album-found">
              <AlbumThumb picture={picture} size={size} still={!onScreen(index)} />
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

/**
 * A set above the grid: its badge (gold with a crown once every picture in it is found), its name and how many are
 * found. Tapping it shows only that set's pictures.
 */
function SetChip({ set, have = 0, label, active, onPress, testID }: { set?: AlbumSet; have?: number; label?: string; active: boolean; onPress: () => void; testID: string }) {
  const done = Boolean(set) && have === set?.pictures.length;
  const plain = set ? t(set.title) : (label ?? "");
  return (
    <Tappable
      onPress={onPress}
      pressScale={0.94}
      style={[styles.setChip, done ? styles.setChipDone : null, active ? styles.setChipActive : null]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={set ? (done ? t("{set}: set complete", { set: plain }) : t("{set}: {count} of {total} found", { set: plain, count: have, total: set.pictures.length })) : plain}
      testID={testID}
    >
      {set ? <Icon name={done ? "crown" : set.icon} size={20} /> : null}
      <Text style={[styles.setChipText, active ? styles.setChipTextActive : null]} numberOfLines={1}>
        {set ? withHonorifics(plain) : plain}
      </Text>
      {set ? (
        <Text style={[styles.setChipCount, done ? styles.setChipCountDone : null]} testID={`${testID}-count`}>
          {formatNumber(have)}/{formatNumber(set.pictures.length)}
        </Text>
      ) : null}
    </Tappable>
  );
}

const styles = StyleSheet.create({
  setsScroll: {
    flexGrow: 0,
    marginTop: space.sm,
    marginHorizontal: -space.lg
  },
  sets: {
    gap: space.xs,
    paddingHorizontal: space.lg
  },
  setChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 40,
    paddingHorizontal: space.sm,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  setChipDone: {
    borderColor: colors.goldLip,
    backgroundColor: "#FFF4CC"
  },
  setChipActive: {
    borderColor: colors.ink
  },
  setChipText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    color: colors.inkSoft,
    maxWidth: 190
  },
  setChipTextActive: {
    color: colors.ink
  },
  setChipCount: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    color: colors.inkSoft
  },
  setChipCountDone: {
    color: "#8A5A00"
  },
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
