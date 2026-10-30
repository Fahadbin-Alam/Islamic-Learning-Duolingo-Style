import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  downloadQuranPack,
  getQuranPack,
  offlineAudioSupported,
  removeQuranPack,
  stopQuranPack,
  subscribeQuranPack
} from "../../services/offlineAudio";
import { t } from "../../i18n";
import { Icon } from "../Icon";
import { Tappable } from "../Tappable";
import { colors, fonts, radii, space, text } from "../theme";

const megabytes = (bytes: number) => (bytes / (1024 * 1024)).toFixed(bytes < 10 * 1024 * 1024 ? 1 : 0);

/**
 * Settings row that saves every Quran recitation on the phone, so Listen works with no internet.
 * Phones only: the web app keeps streaming.
 */
export function QuranOfflineRow() {
  const [pack, setPack] = useState(() => (offlineAudioSupported() ? getQuranPack() : null));
  useEffect(() => (offlineAudioSupported() ? subscribeQuranPack(setPack) : undefined), []);

  if (!pack || pack.total === 0) {
    return null;
  }

  const saving = pack.status === "saving";
  const allSaved = !saving && pack.saved >= pack.total;
  const line = saving
    ? t("Saving {done} of {total}", { done: pack.saved, total: pack.total })
    : pack.status === "error"
      ? t("Some did not save. Check your internet.")
      : allSaved
        ? t("Saved, {size} MB", { size: megabytes(pack.bytes) })
        : t("Listen with no internet");
  const action = saving ? t("Stop") : allSaved ? t("Remove") : pack.status === "error" ? t("Try again") : t("Save");
  const onPress = () => {
    if (saving) {
      stopQuranPack();
    } else if (allSaved) {
      removeQuranPack();
    } else {
      void downloadQuranPack();
    }
  };

  return (
    <View style={styles.row} testID="settings-quran-offline">
      <Icon name="quran" size={26} />
      <View style={styles.words}>
        <Text style={styles.label}>{t("Quran audio offline")}</Text>
        <Text style={[styles.line, pack.status === "error" ? styles.errorLine : null]} testID="settings-quran-offline-status">
          {line}
        </Text>
      </View>
      <Tappable
        onPress={onPress}
        pressScale={0.94}
        style={[styles.button, allSaved ? styles.buttonQuiet : null]}
        accessibilityRole="button"
        accessibilityLabel={`${t("Quran audio offline")}, ${action}`}
        testID="settings-quran-offline-action"
      >
        {saving ? <ActivityIndicator size="small" color={colors.white} /> : null}
        <Text style={[styles.buttonText, allSaved ? styles.buttonTextQuiet : null]}>{action}</Text>
      </Tappable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
    minHeight: 64,
    paddingVertical: space.sm
  },
  words: {
    flex: 1,
    minWidth: 0
  },
  label: {
    ...text.bodyBold
  },
  line: {
    ...text.tiny
  },
  errorLine: {
    color: colors.wrongInk
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.md,
    minHeight: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  buttonQuiet: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.line
  },
  buttonText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 14,
    color: colors.white,
    textTransform: "uppercase"
  },
  buttonTextQuiet: {
    color: colors.inkSoft
  }
});
