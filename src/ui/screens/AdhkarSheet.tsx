import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import * as Speech from "expo-speech";
import { ArabicText, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { ProgressBar } from "../ProgressBar";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { SegmentButton, Toggle, useBackToClose } from "./sheetParts";
import { formatNumber } from "./FormattedCount";
import { ADHKAR, ADHKAR_TITLES, dhikrArabic, type AdhkarTime, type Dhikr } from "../../data/adhkar";
import { localDayNumber } from "../../data/dailyCard";
import { getActiveLanguage, t } from "../../i18n";
import { findArabicVoice } from "../../services/arabicVoice";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import { quranAudioUrl } from "../../services/quranAudio";
import { openSource } from "../../services/sourceLink";
import { useAyahPlayback } from "../lesson/AyahListen";

export type AdhkarSheetProps = {
  visible: boolean;
  /** The list it opens on; the learner can switch. */
  time: AdhkarTime;
  onClose: () => void;
  /** Called once a whole list is counted through. */
  onFinished: (time: AdhkarTime) => void;
  /** The lists already finished today, ticked on their buttons. */
  doneToday: readonly AdhkarTime[];
  remindersOn: boolean;
  onToggleReminders: () => void;
};

export const ADHKAR_COLOR = "#2E9C8F";
const TIMES: readonly AdhkarTime[] = ["morning", "evening", "sleep"];

// Counts made today, kept while the app is open: closing the sheet halfway and coming back keeps your place.
let counted: { day: number; counts: Record<string, number> } = { day: 0, counts: {} };
function todaysCounts() {
  const day = localDayNumber();
  if (counted.day !== day) counted = { day, counts: {} };
  return counted.counts;
}
const countKey = (time: AdhkarTime, dhikr: Dhikr) => `${time}:${dhikr.id}`;

/** Tests only. */
export function resetAdhkarCountsForTests() {
  counted = { day: 0, counts: {} };
}

/** The recitation of a Quran dhikr, ayah by ayah; empty for one that is not from the Quran. */
function recitations(dhikr: Dhikr) {
  return (dhikr.ayahs ?? []).map((key) => quranAudioUrl(`Quran ${key}`)).filter((url): url is string => Boolean(url));
}

/**
 * Plays a dhikr: the reciter for a Quran passage, one ayah after another; the phone's Arabic voice for the rest,
 * when the phone has one (without one the button is hidden, as the letters would be read with an English voice).
 */
function useDhikrAudio(visible: boolean) {
  const playback = useAyahPlayback();
  const [voice, setVoice] = useState<string | null>(null);
  const [queue, setQueue] = useState<{ id: string; urls: string[]; at: number } | null>(null);
  const [speaking, setSpeaking] = useState<string | null>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!visible) return;
    let live = true;
    void findArabicVoice().then((id) => {
      if (live) setVoice(id);
    });
    return () => {
      live = false;
    };
  }, [visible]);

  // The next ayah of a passage starts when the one before it ends.
  useEffect(() => {
    if (!queue) return;
    const url = queue.urls[queue.at];
    if (playback.url === url && (playback.status === "playing" || playback.status === "loading")) {
      started.current = true;
      return;
    }
    if (playback.url === url && playback.status === "idle" && started.current) {
      started.current = false;
      if (queue.at + 1 < queue.urls.length) {
        setQueue({ ...queue, at: queue.at + 1 });
        playAyah(queue.urls[queue.at + 1], { once: true });
      } else {
        setQueue(null);
      }
    } else if (playback.status === "error") {
      setQueue(null);
    }
  }, [playback, queue]);

  const stop = () => {
    if (queue) stopAyah(queue.urls[queue.at]);
    setQueue(null);
    started.current = false;
    if (speaking) {
      try {
        void Speech.stop();
      } catch {
        // Nothing to stop.
      }
      setSpeaking(null);
    }
  };

  useEffect(() => {
    if (!visible) stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const canPlay = (dhikr: Dhikr) => recitations(dhikr).length > 0 || Boolean(voice);
  const playing = (dhikr: Dhikr) => queue?.id === dhikr.id || speaking === dhikr.id;
  const toggle = (dhikr: Dhikr) => {
    const wasMine = playing(dhikr);
    stop();
    if (wasMine) return;
    const urls = recitations(dhikr);
    if (urls.length) {
      started.current = false;
      setQueue({ id: dhikr.id, urls, at: 0 });
      playAyah(urls[0], { once: true });
    } else if (voice) {
      try {
        setSpeaking(dhikr.id);
        Speech.speak(dhikrArabic(dhikr), { language: "ar", voice, rate: 0.8, onDone: () => setSpeaking(null), onStopped: () => setSpeaking(null), onError: () => setSpeaking(null) });
      } catch {
        setSpeaking(null);
      }
    }
  };
  return { canPlay, playing, toggle, stop };
}

function DhikrCard({
  dhikr,
  count,
  onCount,
  audio,
  showLatin
}: {
  dhikr: Dhikr;
  count: number;
  onCount: () => void;
  audio: ReturnType<typeof useDhikrAudio>;
  showLatin: boolean;
}) {
  const done = count >= dhikr.count;
  const playing = audio.playing(dhikr);
  const reference = t(dhikr.source.reference ?? dhikr.source.title);
  return (
    <View style={[styles.card, done && styles.cardDone]} testID={`adhkar-card-${dhikr.id}`}>
      <View style={styles.cardHead}>
        <Text style={styles.cardTitle}>{withHonorifics(t(dhikr.title))}</Text>
        <View style={[styles.times, done && styles.timesDone]}>
          <Text style={[styles.timesText, done && styles.timesTextDone]}>{`×${formatNumber(dhikr.count)}`}</Text>
        </View>
      </View>
      <ArabicText size={22} quran style={styles.arabic} testID={`adhkar-arabic-${dhikr.id}`}>
        {dhikrArabic(dhikr)}
      </ArabicText>
      {showLatin ? <Text style={styles.translit}>{dhikr.translit}</Text> : null}
      {showLatin ? <Text style={styles.meaning}>{withHonorifics(t(dhikr.meaning))}</Text> : null}
      <Text style={styles.reward}>{withHonorifics(t(dhikr.reward))}</Text>
      <Tappable onPress={() => openSource(dhikr.source)} accessibilityLabel={t("Open source {name}", { name: reference })} hitSlop={6} testID={`adhkar-source-${dhikr.id}`}>
        <Text style={styles.source}>{`${reference} · ${t(dhikr.source.grade ?? "")}`}</Text>
      </Tappable>
      <View style={styles.actions}>
        {audio.canPlay(dhikr) ? (
          <Tappable
            onPress={() => audio.toggle(dhikr)}
            style={styles.listen}
            pressScale={0.94}
            accessibilityRole="button"
            accessibilityLabel={playing ? t("Stop") : t("Listen")}
            testID={`adhkar-listen-${dhikr.id}`}
          >
            {playing ? <View style={styles.stopSquare} /> : <Icon name="play" size={16} color={ADHKAR_COLOR} />}
            <Text style={styles.listenText}>{playing ? t("Stop") : t("Listen")}</Text>
          </Tappable>
        ) : null}
        <Tappable
          onPress={onCount}
          disabled={done}
          style={[styles.counter, done && styles.counterDone]}
          pressScale={0.92}
          sound={done ? false : "soft_ui"}
          accessibilityRole="button"
          accessibilityLabel={done ? t("Done") : t("Tap to count")}
          testID={`adhkar-count-${dhikr.id}`}
        >
          {done ? <Icon name="check" size={18} color={colors.white} /> : null}
          <Text style={styles.counterText}>{done ? t("Done") : `${formatNumber(count)} / ${formatNumber(dhikr.count)}`}</Text>
        </Tappable>
      </View>
    </View>
  );
}

/**
 * The daily adhkar: the morning, evening and bedtime lists. Each card shows the words (Arabic, transliteration and
 * meaning), what the hadith promises and its source; tap the counter as you say it. A list counted through is
 * marked done for the day.
 */
export function AdhkarSheet({ visible, time, onClose, onFinished, doneToday, remindersOn, onToggleReminders }: AdhkarSheetProps) {
  const { height } = useWindowDimensions();
  const [shown, setShown] = useState<AdhkarTime>(time);
  const [, redraw] = useState(0);
  const audio = useDhikrAudio(visible);
  const showLatin = getActiveLanguage() !== "ar";
  const list = ADHKAR[shown];
  const counts = todaysCounts();
  const said = list.filter((dhikr) => (counts[countKey(shown, dhikr)] ?? 0) >= dhikr.count).length;
  const finished = said === list.length;
  const scroll = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) setShown(time);
  }, [time, visible]);

  const close = () => {
    audio.stop();
    onClose();
  };
  useBackToClose(visible, close);

  const count = (dhikr: Dhikr) => {
    const key = countKey(shown, dhikr);
    counts[key] = Math.min(dhikr.count, (counts[key] ?? 0) + 1);
    redraw((value) => value + 1);
    if (list.every((item) => (counts[countKey(shown, item)] ?? 0) >= item.count) && !doneToday.includes(shown)) {
      onFinished(shown);
    }
  };

  const tabs = useMemo(() => TIMES.map((item) => ({ item, label: t(ADHKAR_TITLES[item]) })), [visible]);

  return (
    <Sheet visible={visible} onClose={close} testID="adhkar-sheet">
      <Text style={styles.title} accessibilityRole="header">
        {t("Daily adhkar")}
      </Text>
      <View style={styles.tabs}>
        {tabs.map(({ item, label }) => (
          <SegmentButton
            key={item}
            label={doneToday.includes(item) ? `${label} ✓` : label}
            active={item === shown}
            onPress={() => {
              audio.stop();
              setShown(item);
              scroll.current?.scrollTo?.({ y: 0, animated: false });
            }}
            testID={`adhkar-tab-${item}`}
          />
        ))}
      </View>
      <View style={styles.progressRow}>
        <ProgressBar progress={said / list.length} color={ADHKAR_COLOR} height={10} style={styles.bar} />
        <Text style={styles.progressText} testID="adhkar-progress">{`${formatNumber(said)}/${formatNumber(list.length)}`}</Text>
      </View>
      <ScrollView ref={scroll} style={{ maxHeight: Math.round(height * 0.56) }} contentContainerStyle={styles.stack} showsVerticalScrollIndicator={false}>
        {finished ? (
          <PopIn key={`done-${shown}`} from="up">
            <View style={styles.doneCard} testID="adhkar-finished">
              <Icon name="star" size={28} />
              <Text style={styles.doneText}>{t("All done! May Allah accept it from you.")}</Text>
            </View>
          </PopIn>
        ) : null}
        {list.map((dhikr) => (
          <DhikrCard key={`${shown}-${dhikr.id}`} dhikr={dhikr} count={counts[countKey(shown, dhikr)] ?? 0} onCount={() => count(dhikr)} audio={audio} showLatin={showLatin} />
        ))}
        <Toggle label={t("Remind me every morning and evening")} icon="bell" value={remindersOn} onToggle={onToggleReminders} testID="adhkar-reminders" />
      </ScrollView>
      <GameButton label={t("Close")} variant="secondary" fullWidth onPress={close} style={styles.button} testID="adhkar-close" />
    </Sheet>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.displayHeavy,
    fontSize: 26,
    lineHeight: 32,
    color: colors.ink,
    textAlign: "center",
    marginBottom: space.sm
  },
  tabs: {
    flexDirection: "row",
    gap: space.xs,
    marginBottom: space.sm
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    marginBottom: space.sm
  },
  bar: {
    flex: 1
  },
  progressText: {
    ...text.tiny
  },
  stack: {
    gap: space.md,
    paddingBottom: space.sm
  },
  card: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderColor: lighten(ADHKAR_COLOR, 0.6),
    borderRadius: radii.lg,
    padding: space.lg,
    gap: space.sm,
    backgroundColor: colors.white
  },
  cardDone: {
    borderColor: lighten(colors.green, 0.4),
    backgroundColor: colors.correctBg
  },
  cardHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm
  },
  cardTitle: {
    ...text.bodyBold,
    flex: 1,
    color: darken(ADHKAR_COLOR, 0.3)
  },
  times: {
    paddingHorizontal: space.sm,
    paddingVertical: space.xxs,
    borderRadius: radii.pill,
    backgroundColor: lighten(ADHKAR_COLOR, 0.85)
  },
  timesDone: {
    backgroundColor: colors.green
  },
  timesText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: darken(ADHKAR_COLOR, 0.3)
  },
  timesTextDone: {
    color: colors.white
  },
  arabic: {
    alignSelf: "stretch",
    writingDirection: "rtl"
  },
  translit: {
    ...text.small,
    fontStyle: "italic"
  },
  meaning: {
    ...text.body
  },
  reward: {
    ...text.small,
    color: colors.ink
  },
  source: {
    ...text.tiny,
    color: darken(ADHKAR_COLOR, 0.2),
    textDecorationLine: "underline"
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: space.sm,
    marginTop: space.xs
  },
  listen: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.md,
    height: 40,
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: lighten(ADHKAR_COLOR, 0.5),
    backgroundColor: colors.white
  },
  listenText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 18,
    color: darken(ADHKAR_COLOR, 0.2)
  },
  stopSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: ADHKAR_COLOR
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.xs,
    minWidth: 110,
    height: 44,
    paddingHorizontal: space.lg,
    borderRadius: radii.pill,
    backgroundColor: ADHKAR_COLOR,
    borderBottomWidth: 4,
    borderBottomColor: darken(ADHKAR_COLOR)
  },
  counterDone: {
    backgroundColor: colors.green,
    borderBottomColor: colors.greenLip
  },
  counterText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 17,
    lineHeight: 22,
    color: colors.white
  },
  doneCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
    padding: space.md,
    borderRadius: radii.lg,
    backgroundColor: colors.correctBg
  },
  doneText: {
    ...text.bodyBold,
    flex: 1,
    color: colors.correctInk
  },
  button: {
    marginTop: space.md
  }
});
