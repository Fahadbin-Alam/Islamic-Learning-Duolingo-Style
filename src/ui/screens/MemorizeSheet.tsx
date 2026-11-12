import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Animated, Platform, ScrollView, StyleSheet, Text, View, type LayoutChangeEvent } from "react-native";
import { getActiveLanguage, t } from "../../i18n";
import { AYAH_WORD_TIMES_CREDIT } from "../../services/ayahWords";
import { useOnline } from "../../services/network";
import { QURAN_AUDIO_SOURCE } from "../../services/quranAudio";
import { ArabicText } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { RecitedAyah } from "../lesson/RecitedAyah";
import { useAyahQueue } from "../lesson/useAyahQueue";
import { useReduceMotion } from "../motion";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { scaleFont } from "../textScale";
import { colors, darken, fonts, lighten, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { useBackToClose } from "./sheetParts";

/** One ayah of a surah to memorize: "112:1", its Quran text, and its recitation. */
export type MemorizeAyah = { key: string; text: string; url: string };

export type MemorizeSheetRow = {
  /** "112", or "92:1-11" for part of a longer surah. */
  id: string;
  surah: number;
  /** "Surah Al-Ikhlas", in the learner's language. */
  title: string;
  /** The surah's name in Arabic, when the title is not in Arabic letters already. */
  arabic?: string;
  /** "4 ayahs", or "Ayahs 1-11" for a part. */
  line: string;
  /** The best stars so far, 0 before the first try. */
  stars: number;
  /** Its ayahs in order, listed on its page to listen to before practising. */
  ayahs: readonly MemorizeAyah[];
  /** How many ayahs the whole surah has ("Ayah 2 of 4"). */
  surahAyahs: number;
};

export type MemorizeSheetProps = {
  visible: boolean;
  onClose: () => void;
  /** Al-Fatihah first, then the short surahs from An-Nas back. */
  rows: MemorizeSheetRow[];
  /** Practice: the surah's questions. */
  onStart: (id: string) => void;
  /** "Which surah is it?" at the top of the list: its best stars, and its questions. */
  which?: { stars: number; onStart: () => void };
  /** The surah (or part) practised last: the list opens scrolled to it. */
  focusId?: string;
  /** Gap above the sheet. Default 40. */
  topGap?: number;
  bottomInset?: number;
};

const GOLD_INK = darken(colors.gold, 0.45);
const GOLD_DEEP = darken(colors.gold, 0.3);
const LISTEN_COLOR = colors.green;
/** With "Each ayah 3 times" on, the reciter says each ayah this many times before the next one. */
const REPEAT_TIMES = 3;
/** The ayahs' size on a surah's page, bigger with "Bigger text" in Settings. */
const AYAH_SIZE = 22;
/** Room under Practice for the iPhone's home bar, as the sheets' own buttons have. */
const FOOTER_INSET = Platform.OS === "ios" ? 30 : 16;
// "Each ayah 3 times" is kept while the app is open, so it is still on after a practice.
let repeatEach = false;

/** Tests only. */
export function resetMemorizeSheetForTests() {
  repeatEach = false;
}

function Stars({ stars, testID }: { stars: number; testID?: string }) {
  return (
    <View style={styles.stars} testID={testID}>
      {[1, 2, 3].map((star) => (
        <Icon key={star} name="star" size={16} color={star <= stars ? colors.gold : colors.line} />
      ))}
    </View>
  );
}

function Emblem({ surah, lit }: { surah: number; lit: boolean }) {
  return (
    <View style={styles.emblem}>
      <Icon name="star8" size={46} color={lit ? colors.gold : lighten(colors.gold, 0.55)} />
      <Text style={styles.emblemNumber} numberOfLines={1}>
        {surah}
      </Text>
    </View>
  );
}

/** Three little bars that bounce while the reciter says an ayah (still with less motion, or while it loads). */
function SoundBars({ moving }: { moving: boolean }) {
  const bars = useRef([0, 1, 2].map(() => new Animated.Value(0.6))).current;
  useEffect(() => {
    if (!moving) {
      bars.forEach((bar) => bar.setValue(0.6));
      return undefined;
    }
    const loops = bars.map((bar, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(bar, { toValue: 1, duration: 220 + index * 70, useNativeDriver: true }),
          Animated.timing(bar, { toValue: 0.3, duration: 220 + index * 70, useNativeDriver: true })
        ])
      )
    );
    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [bars, moving]);
  return (
    <View style={styles.bars} pointerEvents="none" testID="memorize-sound-bars">
      {bars.map((bar, index) => (
        <Animated.View key={index} style={[styles.bar, { transform: [{ scaleY: bar }] }]} />
      ))}
    </View>
  );
}

/**
 * "Which surah is it?" at the top of the list: hear an ayah, tap its surah. Its speaker badge wears a little "?" that
 * wobbles now and then (still with less motion), and its stars are its best try on this phone.
 */
function WhichSurahRow({ stars, onStart }: { stars: number; onStart: () => void }) {
  const reduceMotion = useReduceMotion();
  const wobble = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (reduceMotion) {
      wobble.setValue(0);
      return undefined;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(1600),
        Animated.timing(wobble, { toValue: 1, duration: 140, useNativeDriver: true }),
        Animated.timing(wobble, { toValue: -1, duration: 220, useNativeDriver: true }),
        Animated.timing(wobble, { toValue: 0.5, duration: 160, useNativeDriver: true }),
        Animated.timing(wobble, { toValue: 0, duration: 140, useNativeDriver: true })
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [reduceMotion, wobble]);
  const turn = wobble.interpolate({ inputRange: [-1, 1], outputRange: ["-14deg", "14deg"] });
  const title = t("Which surah is it?");
  const line = t("Hear an ayah, tap its surah");
  return (
    <Tappable
      onPress={onStart}
      sound="node_tap"
      pressScale={0.97}
      accessibilityRole="button"
      accessibilityLabel={`${title}, ${line}${stars ? `, ${t("{count} of {max} stars", { count: stars, max: 3 })}` : ""}`}
      testID="memorize-which"
      style={[styles.row, styles.whichRow]}
    >
      <View style={styles.whichBadge}>
        <Icon name="speaker" size={24} color={colors.white} />
        <Animated.View style={[styles.whichMark, { transform: [{ rotate: turn }] }]}>
          <Text style={styles.whichMarkText}>{getActiveLanguage() === "ar" || getActiveLanguage() === "ur" ? "؟" : "?"}</Text>
        </Animated.View>
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.rowLine} numberOfLines={2}>
          {line}
        </Text>
      </View>
      <Stars stars={stars} testID="memorize-which-stars" />
    </Tappable>
  );
}

/** How many of the surahs are complete (each part of it practised to the end, so has stars), out of all of them. */
export function surahsComplete(rows: readonly MemorizeSheetRow[]) {
  const surahs = new Map<number, boolean>();
  for (const row of rows) surahs.set(row.surah, (surahs.get(row.surah) ?? true) && row.stars > 0);
  return { done: [...surahs.values()].filter(Boolean).length, total: surahs.size };
}

/** The bar on top of the list: how many of the surahs are complete, filling up in gold. */
function SurahsProgress({ done, total }: { done: number; total: number }) {
  const count = t("{count} of {total} surahs complete", { count: formatNumber(done), total: formatNumber(total) });
  return (
    <View style={styles.progress} testID="memorize-progress" accessible accessibilityLabel={count}>
      <View style={styles.progressHead}>
        <Icon name="crown" size={20} color={done > 0 ? undefined : colors.lockedLip} />
        <Text style={styles.progressText} testID="memorize-progress-count">
          {count}
        </Text>
      </View>
      <ProgressBar progress={total ? done / total : 0} color={colors.gold} trackColor={lighten(colors.gold, 0.6)} height={12} testID="memorize-progress-bar" />
    </View>
  );
}

/** One ayah on a surah's page: tap it to hear it, and the ayahs after it. */
function AyahCard({
  ayah,
  count,
  current,
  moving,
  heard,
  times,
  onPress
}: {
  ayah: MemorizeAyah;
  count: number;
  current: boolean;
  moving: boolean;
  heard: number;
  times: number;
  onPress: () => void;
}) {
  const number = Number(ayah.key.split(":")[1]);
  const recited = useMemo(() => [{ key: ayah.key, url: ayah.url }], [ayah.key, ayah.url]);
  return (
    <Tappable
      onPress={onPress}
      pressScale={0.98}
      accessibilityLabel={t("Ayah {number} of {count}", { number, count })}
      accessibilityState={{ selected: current }}
      testID={`memorize-ayah-${number}`}
      style={[styles.ayahCard, current ? styles.ayahCardOn : null]}
    >
      {/* The number, and under it (in room every card keeps, so nothing moves) the bars and the times said. */}
      <View style={styles.ayahSide}>
        <View style={[styles.ayahNumber, current ? styles.ayahNumberOn : null]}>
          <Text style={[styles.ayahNumberText, current ? styles.ayahNumberTextOn : null]} numberOfLines={1}>
            {number}
          </Text>
        </View>
        <View style={styles.ayahNow}>
          {current ? <SoundBars moving={moving} /> : null}
          {current && times > 1 ? (
            <View style={styles.dots} testID="memorize-repeat-dots">
              {Array.from({ length: times }, (_, index) => (
                <View key={index} style={[styles.dot, index <= heard ? styles.dotOn : null]} />
              ))}
            </View>
          ) : null}
        </View>
      </View>
      <RecitedAyah text={ayah.text} ayahs={recited} size={scaleFont(AYAH_SIZE)} quran align="right" color={colors.ink} style={styles.ayahText} testID={`memorize-ayah-text-${number}`} />
    </Tappable>
  );
}

/**
 * A surah's page: its ayahs, which the reciter goes through one after another (each 3 times, to say it after him, with
 * "Each ayah 3 times" on) while its words light up, and Practice, which starts its questions. Nothing plays by itself.
 */
function SurahPage({ row, onPractice, bottomInset }: { row: MemorizeSheetRow; onPractice: () => void; bottomInset: number }) {
  const { queue, playback, ended, play, stop, setTimes } = useAyahQueue();
  const online = useOnline();
  const reduceMotion = useReduceMotion();
  const [repeat, setRepeat] = useState(repeatEach);
  const times = repeat ? REPEAT_TIMES : 1;
  const urls = useMemo(() => row.ayahs.map((ayah) => ayah.url), [row.ayahs]);
  const active = queue !== null;
  const loading = active && playback.status === "loading";
  const failed = !active && playback.status === "error" && playback.url !== null && urls.includes(playback.url);
  const scroll = useRef<ScrollView>(null);
  const cards = useRef<Array<{ y: number; height: number }>>([]);
  const view = useRef({ y: 0, height: 0 });
  const hop = useRef(new Animated.Value(1)).current;

  // The ayah being recited stays in view.
  const at = queue?.at;
  useEffect(() => {
    if (at === undefined) return;
    const card = cards.current[at];
    if (!card || !view.current.height) return;
    const { y, height } = view.current;
    if (card.y < y || card.y + card.height > y + height) {
      scroll.current?.scrollTo({ y: Math.max(0, card.y - 12), animated: !reduceMotion });
    }
  }, [at, reduceMotion]);

  // The whole surah heard: Practice gives a little hop, to say it is time to try.
  useEffect(() => {
    if (!ended || reduceMotion) return undefined;
    hop.setValue(1);
    const animation = Animated.sequence([
      Animated.timing(hop, { toValue: 1.07, duration: 160, useNativeDriver: true }),
      Animated.spring(hop, { toValue: 1, friction: 4, tension: 180, useNativeDriver: true })
    ]);
    animation.start();
    return () => animation.stop();
  }, [ended, hop, reduceMotion]);

  const toggleRepeat = () => {
    const next = !repeat;
    repeatEach = next;
    setRepeat(next);
    setTimes(next ? REPEAT_TIMES : 1);
  };
  const credit = `${t("Recited by {name}", { name: QURAN_AUDIO_SOURCE.reciter })} · ${t("Word timing: {credit}", { credit: AYAH_WORD_TIMES_CREDIT })}`;

  return (
    <>
      <ScrollView
        ref={scroll}
        style={styles.scroll}
        contentContainerStyle={styles.pageContent}
        onLayout={(event) => {
          view.current.height = event.nativeEvent.layout.height;
        }}
        onScroll={(event) => {
          view.current.y = event.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={32}
        showsVerticalScrollIndicator={false}
        testID="memorize-page"
      >
        <View style={styles.hero}>
          <Emblem surah={row.surah} lit={row.stars > 0} />
          <View style={styles.rowText}>
            {row.arabic ? (
              <ArabicText size={17} weight="bold" color={GOLD_INK} style={styles.rowArabic}>
                {row.arabic}
              </ArabicText>
            ) : null}
            <Text style={styles.rowLine} numberOfLines={1}>
              {row.line}
            </Text>
          </View>
          <Stars stars={row.stars} testID="memorize-page-stars" />
        </View>
        <Text style={styles.line}>{t("Listen and say each ayah after the reciter, then practice.")}</Text>
        <View style={styles.controls}>
          <Tappable
            onPress={() => (active ? stop() : play(urls, 0, times))}
            style={[styles.listen, { backgroundColor: LISTEN_COLOR, borderBottomColor: darken(LISTEN_COLOR, 0.22) }]}
            pressScale={0.94}
            accessibilityLabel={active ? t("Stop") : t("Listen")}
            testID="memorize-listen"
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : active ? (
              <View style={styles.stopSquare} />
            ) : (
              <Icon name="play" size={18} color={colors.white} />
            )}
            <Text style={styles.listenText}>{active ? t("Stop") : t("Listen")}</Text>
          </Tappable>
          <Tappable
            onPress={toggleRepeat}
            style={[styles.toggle, repeat ? styles.toggleOn : null]}
            pressScale={0.94}
            accessibilityRole="switch"
            accessibilityState={{ checked: repeat }}
            accessibilityLabel={t("Each ayah 3 times")}
            testID="memorize-repeat"
          >
            <Icon name="repeat" size={18} color={repeat ? LISTEN_COLOR : colors.inkSoft} />
            <Text style={[styles.toggleText, repeat ? styles.toggleTextOn : null]}>{t("Each ayah 3 times")}</Text>
          </Tappable>
        </View>
        <Text style={styles.note} testID={failed ? "memorize-listen-error" : "memorize-listen-credit"}>
          {failed ? (online ? t("Could not load. Check your internet.") : t("No internet. This is not saved on your phone yet.")) : credit}
        </Text>
        {row.ayahs.map((ayah, index) => {
          const current = queue?.at === index;
          return (
            <View
              key={ayah.key}
              onLayout={(event: LayoutChangeEvent) => {
                cards.current[index] = { y: event.nativeEvent.layout.y, height: event.nativeEvent.layout.height };
              }}
            >
              <AyahCard
                ayah={ayah}
                count={row.surahAyahs}
                current={current}
                moving={current && playback.status === "playing" && !reduceMotion}
                heard={current ? queue.heard : 0}
                times={current ? queue.times : 1}
                onPress={() => play(urls, index, times)}
              />
            </View>
          );
        })}
      </ScrollView>
      <View style={[styles.footer, { paddingBottom: FOOTER_INSET + bottomInset }]}>
        <Animated.View style={{ transform: [{ scale: hop }] }}>
          <GameButton
            label={t("Practice")}
            icon="practice"
            fullWidth
            onPress={() => {
              stop();
              onPractice();
            }}
            testID="memorize-practice"
          />
        </Animated.View>
      </View>
    </>
  );
}

/** The surahs, under "Which surah is it?": each row opens its page; a row's stars are its best try on this phone. */
function SurahList({
  rows,
  which,
  focus,
  onOpen,
  bottomInset
}: {
  rows: MemorizeSheetRow[];
  which?: MemorizeSheetProps["which"];
  focus?: string;
  onOpen: (id: string) => void;
  bottomInset: number;
}) {
  const list = useRef<ScrollView>(null);
  const focused = useRef(false);
  const progress = useMemo(() => surahsComplete(rows), [rows]);
  return (
    <ScrollView ref={list} style={styles.scroll} contentContainerStyle={{ paddingBottom: 32 + bottomInset }} showsVerticalScrollIndicator={false}>
      {which ? <WhichSurahRow stars={which.stars} onStart={which.onStart} /> : null}
      {progress.total ? <SurahsProgress done={progress.done} total={progress.total} /> : null}
      <Text style={styles.line}>{t("Listen to the reciter, then tap each ayah that comes next.")}</Text>
      {rows.map((row) => (
        <View
          key={row.id}
          onLayout={(event: LayoutChangeEvent) => {
            // Back from a surah (or its practice), the list shows it again.
            if (row.id !== focus || focused.current) return;
            focused.current = true;
            list.current?.scrollTo({ y: Math.max(0, event.nativeEvent.layout.y - 60), animated: false });
          }}
        >
          <Tappable
            onPress={() => onOpen(row.id)}
            sound="node_tap"
            pressScale={0.97}
            accessibilityLabel={`${row.title}, ${row.line}${row.stars ? `, ${t("{count} of {max} stars", { count: row.stars, max: 3 })}` : ""}`}
            testID={`memorize-${row.id}`}
            style={[styles.row, row.stars >= 3 ? styles.rowDone : null]}
          >
            <Emblem surah={row.surah} lit={row.stars > 0} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle} numberOfLines={2}>
                {row.title}
              </Text>
              {row.arabic ? (
                <ArabicText size={15} weight="bold" color={GOLD_INK} style={styles.rowArabic}>
                  {row.arabic}
                </ArabicText>
              ) : null}
              <Text style={styles.rowLine} numberOfLines={1}>
                {row.line}
              </Text>
            </View>
            <Stars stars={row.stars} testID={`memorize-stars-${row.id}`} />
          </Tappable>
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * Memorize surahs: Al-Fatihah and the short surahs. A surah's page lets the learner listen to it ayah by ayah with the
 * reciter; Practice then goes through it ayah by ayah ("Which ayah comes next?"), and its stars are the best try on
 * this phone. "Which surah is it?" on top plays ayahs of them all, to name each one's surah.
 */
export function MemorizeSheet({ visible, onClose, rows, onStart, which, focusId, topGap = 40, bottomInset = 0 }: MemorizeSheetProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  // The row the list shows when it opens: the surah just left, or the one practised last.
  const [focus, setFocus] = useState(focusId);
  const open = openId ? rows.find((row) => row.id === openId) : undefined;
  useEffect(() => {
    setFocus(focusId);
  }, [focusId]);
  useEffect(() => {
    if (!visible) setOpenId(null);
  }, [visible]);
  const back = useCallback(() => setOpenId(null), []);
  useBackToClose(visible, open ? back : onClose);
  const openSurah = (id: string) => {
    setFocus(id);
    setOpenId(id);
  };

  return (
    <Sheet visible={visible} onClose={onClose} bottomInset={0} style={[styles.sheet, { top: topGap, paddingBottom: 0 }]} testID="memorize-sheet">
      <View style={styles.header}>
        {open ? (
          <Tappable onPress={back} accessibilityLabel={t("Back")} testID="memorize-back" style={[styles.close, styles.back]} hitSlop={8} pressScale={0.88}>
            <Icon name="arrowLeft" size={22} color={colors.inkSoft} />
          </Tappable>
        ) : null}
        <Text style={styles.heading} accessibilityRole="header" numberOfLines={2}>
          {open ? open.title : t("Memorize surahs")}
        </Text>
        <Tappable onPress={onClose} accessibilityLabel={t("Close")} testID="memorize-sheet-close" style={styles.close} hitSlop={8} pressScale={0.88}>
          <Icon name="close" size={22} color={colors.inkSoft} />
        </Tappable>
      </View>
      {open ? (
        <SurahPage key={open.id} row={open} onPractice={() => onStart(open.id)} bottomInset={bottomInset} />
      ) : (
        <SurahList rows={rows} which={which} focus={focus} onOpen={openSurah} bottomInset={bottomInset} />
      )}
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
    marginBottom: 12
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
  back: {
    marginEnd: 10
  },
  scroll: {
    flex: 1
  },
  line: {
    ...text.bodyBold,
    color: colors.inkSoft,
    marginBottom: 12
  },
  progress: {
    marginBottom: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: lighten(colors.gold, 0.35),
    backgroundColor: lighten(colors.gold, 0.85),
    gap: 8
  },
  progressHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  progressText: {
    flex: 1,
    ...text.bodyBold,
    color: GOLD_INK
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    minHeight: 64,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: colors.lineLip,
    borderRadius: 18,
    backgroundColor: colors.white
  },
  rowDone: {
    borderColor: lighten(colors.gold, 0.4),
    borderBottomColor: lighten(colors.gold, 0.1),
    backgroundColor: lighten(colors.gold, 0.9)
  },
  whichRow: {
    marginBottom: 14,
    borderColor: lighten(LISTEN_COLOR, 0.5),
    borderBottomColor: lighten(LISTEN_COLOR, 0.2),
    backgroundColor: lighten(LISTEN_COLOR, 0.9)
  },
  whichBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: darken(LISTEN_COLOR, 0.22),
    backgroundColor: LISTEN_COLOR
  },
  whichMark: {
    position: "absolute",
    top: -6,
    right: -6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.gold
  },
  whichMarkText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 16,
    color: GOLD_INK
  },
  emblem: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center"
  },
  emblemNumber: {
    position: "absolute",
    fontFamily: fonts.displayHeavy,
    fontSize: 15,
    lineHeight: 20,
    color: GOLD_INK
  },
  rowText: {
    flex: 1,
    minWidth: 0
  },
  rowTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 20,
    color: colors.ink,
    flexShrink: 1
  },
  rowArabic: {
    alignSelf: "flex-start",
    maxWidth: "100%"
  },
  rowLine: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    color: colors.inkSoft
  },
  stars: {
    flexDirection: "row",
    gap: 2
  },
  pageContent: {
    paddingBottom: 20
  },
  hero: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8
  },
  listen: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderBottomWidth: 4
  },
  listenText: {
    marginStart: 6,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 21,
    color: colors.white
  },
  stopSquare: {
    width: 13,
    height: 13,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: colors.white
  },
  toggle: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.white
  },
  toggleOn: {
    borderColor: LISTEN_COLOR,
    backgroundColor: lighten(LISTEN_COLOR, 0.9)
  },
  toggleText: {
    flexShrink: 1,
    marginStart: 6,
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.inkSoft
  },
  toggleTextOn: {
    color: darken(LISTEN_COLOR, 0.2)
  },
  note: {
    marginTop: 8,
    marginBottom: 12,
    fontFamily: fonts.bodyBold,
    fontSize: 12,
    lineHeight: 16,
    color: colors.inkSoft
  },
  ayahCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    borderRadius: 16,
    backgroundColor: colors.white
  },
  ayahCardOn: {
    borderColor: colors.gold,
    borderBottomColor: colors.goldLip,
    backgroundColor: lighten(colors.gold, 0.9)
  },
  ayahSide: {
    width: 44,
    alignItems: "center",
    paddingTop: 4
  },
  ayahNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: lighten(colors.gold, 0.35),
    backgroundColor: lighten(colors.gold, 0.85)
  },
  ayahNumberOn: {
    borderColor: colors.goldLip,
    backgroundColor: colors.gold
  },
  ayahNumberText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 13,
    lineHeight: 17,
    color: GOLD_INK
  },
  ayahNumberTextOn: {
    color: colors.white
  },
  ayahText: {
    flex: 1,
    minWidth: 0
  },
  ayahNow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    height: 14,
    marginTop: 6
  },
  bars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    height: 14
  },
  bar: {
    width: 3,
    height: 14,
    borderRadius: 1.5,
    backgroundColor: GOLD_DEEP
  },
  dots: {
    flexDirection: "row",
    gap: 2
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: lighten(colors.gold, 0.55)
  },
  dotOn: {
    backgroundColor: GOLD_DEEP
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 2,
    borderTopColor: colors.line,
    backgroundColor: colors.white
  }
});
