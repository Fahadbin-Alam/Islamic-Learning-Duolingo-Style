import React, { useEffect } from "react";
import { Linking, ScrollView, StyleSheet, Text, View, useWindowDimensions, type StyleProp, type TextStyle } from "react-native";
import { ArabicText, isArabicOnly, withHonorifics } from "../ArabicText";
import { GameButton } from "../GameButton";
import { Icon, type IconName } from "../Icon";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";
import { getActiveLanguage, t } from "../../i18n";
import { getDailyCard } from "../../data/dailyCard";
import { playAyah, stopAyah } from "../../services/ayahPlayer";
import { quranAudioUrl } from "../../services/quranAudio";
import { AyahListen } from "../lesson/AyahListen";

export type DailySheetProps = {
  visible: boolean;
  onClose: () => void;
  /** The day to show. Default: today. */
  date?: Date;
  /** Opened by itself as the app opened: recite the ayah once, straight away. */
  autoPlay?: boolean;
};

const AYAH_COLOR = colors.green;
const HADITH_COLOR = colors.gem;

function CardLabel({ icon, label, color }: { icon: IconName; label: string; color: string }) {
  return (
    <View style={[styles.label, { backgroundColor: lighten(color, 0.85) }]}>
      <Icon name={icon} size={18} />
      <Text style={[styles.labelText, { color: darken(color, 0.3) }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/** A translated line: Urdu and Arabic in the Naskh face, the rest as body text. */
function Line({ value, style, testID }: { value: string; style: StyleProp<TextStyle>; testID: string }) {
  return isArabicOnly(value) ? (
    <ArabicText size={18} quran style={styles.full} testID={testID}>
      {value}
    </ArabicText>
  ) : (
    <Text style={style} testID={testID}>
      {withHonorifics(value)}
    </Text>
  );
}

/** Today's ayah and hadith, from the top bar's book button. Same pair for everyone on that date. */
export function DailySheet({ visible, onClose, date, autoPlay = false }: DailySheetProps) {
  const { height } = useWindowDimensions();
  const { ayah, hadith } = getDailyCard(getActiveLanguage(), date);
  const audio = quranAudioUrl(`Quran ${ayah.ref}`);
  const close = () => {
    if (audio) stopAyah(audio);
    onClose();
  };
  useBackToClose(visible, close);
  useEffect(() => {
    if (visible && autoPlay && audio) playAyah(audio, { once: true });
  }, [audio, autoPlay, visible]);

  return (
    <Sheet visible={visible} onClose={close} testID="daily-sheet">
      <Text style={styles.title} accessibilityRole="header">
        {t("Today")}
      </Text>
      <ScrollView style={{ maxHeight: Math.round(height * 0.62) }} contentContainerStyle={styles.stack} showsVerticalScrollIndicator={false}>
        <PopIn key={visible ? "ayah-open" : "ayah"} delay={60} from="up">
          <View style={[styles.card, { borderColor: lighten(AYAH_COLOR, 0.6) }]} testID="daily-ayah">
            <CardLabel icon="quran" label={t("Ayah of the day")} color={AYAH_COLOR} />
            <ArabicText size={24} quran style={styles.full} testID="daily-ayah-arabic">
              {ayah.arabic}
            </ArabicText>
            {ayah.meaning ? <Line value={ayah.meaning} style={styles.meaning} testID="daily-ayah-meaning" /> : null}
            <Text style={styles.reference} testID="daily-ayah-ref">
              {t("Quran {ref}", { ref: ayah.ref })}
            </Text>
            {audio && visible ? <AyahListen url={audio} accent={AYAH_COLOR} /> : null}
          </View>
        </PopIn>
        <PopIn key={visible ? "hadith-open" : "hadith"} delay={160} from="up">
          <View style={[styles.card, { borderColor: lighten(HADITH_COLOR, 0.6) }]} testID="daily-hadith">
            <CardLabel icon="scroll" label={t("Hadith of the day")} color={HADITH_COLOR} />
            <Line value={t(hadith.line)} style={styles.line} testID="daily-hadith-line" />
            <Line value={t(hadith.quote)} style={styles.quote} testID="daily-hadith-quote" />
            <Tappable
              onPress={() => void Linking.openURL(hadith.url).catch(() => undefined)}
              accessibilityLabel={t("Open source {name}", { name: t(hadith.reference) })}
              hitSlop={6}
              testID="daily-hadith-ref"
            >
              <Text style={[styles.reference, styles.link]}>{t(hadith.reference)}</Text>
            </Tappable>
          </View>
        </PopIn>
      </ScrollView>
      <GameButton label={t("Got it")} fullWidth onPress={close} style={styles.button} testID="daily-close" />
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
  stack: {
    gap: space.md
  },
  card: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: radii.lg,
    padding: space.lg,
    gap: space.sm,
    alignItems: "center",
    backgroundColor: colors.white
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radii.pill,
    maxWidth: "100%"
  },
  labelText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    flexShrink: 1
  },
  full: {
    alignSelf: "stretch"
  },
  meaning: {
    ...text.body,
    textAlign: "center"
  },
  line: {
    ...text.bodyBold,
    textAlign: "center"
  },
  quote: {
    ...text.small,
    textAlign: "center",
    fontStyle: "italic"
  },
  reference: {
    ...text.tiny,
    textAlign: "center"
  },
  link: {
    color: darken(HADITH_COLOR, 0.2),
    textDecorationLine: "underline"
  },
  button: {
    marginTop: space.md
  }
});
