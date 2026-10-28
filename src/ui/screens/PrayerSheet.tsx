import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PRAYER_CITIES, findPrayerCity, type PrayerCity } from "../../data/prayerCities";
import {
  PRAYERS,
  PRAYER_LABELS,
  defaultAsrMethod,
  formatPrayerClock,
  getPrayerTimes,
  type AsrMethod,
  type PrayerName,
  type PrayerNudgePrefs
} from "../../services/prayerTimes";
import type { SupportedLanguage } from "../../types";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";
// Prayer-time lessons: turn the nudge on, pick a city, and which prayers get one.
import { LinkRow, SegmentButton, SheetTitle, TextField, Toggle, useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type PrayerSheetProps = {
  visible: boolean;
  prefs: PrayerNudgePrefs;
  language: SupportedLanguage;
  onSave: (prefs: PrayerNudgePrefs) => void;
  onClose: () => void;
};

const PRAYER_ICONS: Record<PrayerName, IconName> = { fajr: "sun", dhuhr: "sun", asr: "sun", maghrib: "moon", isha: "moon" };
const MAX_CITY_RESULTS = 12;

export function cityName(city: PrayerCity, language: SupportedLanguage) {
  return city.name[language] ?? city.name.en;
}

export function PrayerSheet({ visible, prefs, language, onSave, onClose }: PrayerSheetProps) {
  useBackToClose(visible, onClose);
  const [draft, setDraft] = useState(prefs);
  const [picking, setPicking] = useState(false);
  const [search, setSearch] = useState("");

  // Each opening starts from what is saved.
  useEffect(() => {
    if (visible) {
      setDraft(prefs);
      setPicking(!prefs.cityId && prefs.enabled);
      setSearch("");
    }
  }, [prefs, visible]);

  const city = findPrayerCity(draft.cityId);
  const asr: AsrMethod = draft.asr ?? defaultAsrMethod(city);
  const times = useMemo(() => (city ? getPrayerTimes(city, new Date(), asr) : undefined), [asr, city]);
  const matches = useMemo(() => {
    const query = search.trim().toLowerCase();
    const found = query
      ? PRAYER_CITIES.filter((entry) => Object.values(entry.name).some((name) => name.toLowerCase().includes(query)))
      : PRAYER_CITIES;
    return found.slice(0, MAX_CITY_RESULTS);
  }, [search]);

  function toggleEnabled() {
    const enabled = !draft.enabled;
    setDraft({ ...draft, enabled });
    setPicking(enabled && !draft.cityId);
  }

  function pickCity(next: PrayerCity) {
    // A new place starts on its own usual Asr time.
    setDraft({ ...draft, cityId: next.id, asr: undefined });
    setPicking(false);
    setSearch("");
  }

  function clock(prayer: PrayerName) {
    if (!times) return "";
    const { clock: value, half } = formatPrayerClock(times[prayer]);
    return `${value} ${t(half === "AM" ? "AM" : "PM")}`;
  }

  const canSave = !draft.enabled || Boolean(city);

  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="prayer-sheet">
      <SheetTitle title={t("Prayer time lessons")} onClose={onClose} closeTestID="prayer-close" />
      <View style={styles.scrollArea}>
        <ScrollView contentContainerStyle={styles.stack} keyboardShouldPersistTaps="handled" testID="prayer-scroll">
          <Text style={styles.hint}>{t("A tiny lesson right after each salah.")}</Text>

          <View style={styles.card}>
            <Toggle label={t("Prayer time lessons")} icon="mosque" value={draft.enabled} onToggle={toggleEnabled} testID="prayer-enabled" />
          </View>

          {draft.enabled ? (
            <>
              {picking ? (
                <View style={styles.picker}>
                  <TextField
                    value={search}
                    onChangeText={setSearch}
                    placeholder={t("Search your city")}
                    autoCorrect={false}
                    testID="prayer-city-search"
                  />
                  <View style={styles.card}>
                    {matches.map((entry, index) => (
                      <View key={entry.id}>
                        {index > 0 ? <View style={styles.divider} /> : null}
                        <Tappable
                          onPress={() => pickCity(entry)}
                          pressScale={0.98}
                          style={styles.cityRow}
                          accessibilityRole="button"
                          testID={`prayer-city-${entry.id}`}
                        >
                          <Text style={styles.cityName} numberOfLines={1}>{cityName(entry, language)}</Text>
                          {entry.id === draft.cityId ? <Icon name="check" size={18} /> : null}
                        </Tappable>
                      </View>
                    ))}
                    {matches.length === 0 ? <Text style={styles.empty}>{t("No city found.")}</Text> : null}
                  </View>
                  <Text style={styles.hint}>{t("Not on the list? Pick the closest big city.")}</Text>
                </View>
              ) : (
                <View style={styles.card}>
                  <LinkRow
                    label={t("City")}
                    value={city ? cityName(city, language) : t("Pick one")}
                    icon="globe"
                    onPress={() => setPicking(true)}
                    testID="prayer-city"
                  />
                </View>
              )}

              {city && !picking ? (
                <>
                  <View style={styles.card}>
                    {PRAYERS.map((prayer, index) => (
                      <View key={prayer}>
                        {index > 0 ? <View style={styles.divider} /> : null}
                        <Toggle
                          label={`${t(PRAYER_LABELS[prayer])}  ${clock(prayer)}`}
                          icon={PRAYER_ICONS[prayer]}
                          value={draft.prayers[prayer]}
                          onToggle={() => setDraft({ ...draft, prayers: { ...draft.prayers, [prayer]: !draft.prayers[prayer] } })}
                          testID={`prayer-${prayer}`}
                        />
                      </View>
                    ))}
                  </View>

                  <View style={styles.asr}>
                    <Text style={styles.label}>{t("Asr time")}</Text>
                    <View style={styles.segments}>
                      <SegmentButton label={t("Standard")} active={asr === "standard"} onPress={() => setDraft({ ...draft, asr: "standard" })} testID="prayer-asr-standard" />
                      <SegmentButton label={t("Hanafi")} active={asr === "hanafi"} onPress={() => setDraft({ ...draft, asr: "hanafi" })} testID="prayer-asr-hanafi" />
                    </View>
                  </View>

                  <Text style={styles.hint}>{t("Times are close guesses. Follow your local masjid.")}</Text>
                </>
              ) : null}
            </>
          ) : null}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <GameButton label={t("Save")} fullWidth disabled={!canSave} onPress={() => onSave(draft)} testID="prayer-save" />
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  scrollArea: {
    flexShrink: 1,
    minHeight: 0,
    marginTop: space.md
  },
  stack: {
    gap: space.md,
    paddingBottom: space.lg
  },
  footer: {
    borderTopWidth: 2,
    borderTopColor: colors.line,
    paddingTop: space.md
  },
  hint: {
    ...text.small,
    textAlign: "center"
  },
  card: {
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 4,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white,
    paddingHorizontal: space.md
  },
  divider: {
    height: 2,
    backgroundColor: colors.line
  },
  picker: {
    gap: space.sm
  },
  cityRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    gap: space.sm
  },
  cityName: {
    flex: 1,
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    color: colors.ink
  },
  empty: {
    ...text.small,
    paddingVertical: space.md,
    textAlign: "center"
  },
  asr: {
    gap: space.xs
  },
  label: {
    ...text.small,
    fontFamily: fonts.displayHeavy,
    textAlign: "center"
  },
  segments: {
    flexDirection: "row",
    gap: space.sm
  }
});
