import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { ArabicText, isArabicOnly, withHonorifics } from "./ArabicText";
import { GameButton } from "./GameButton";
import { Icon } from "./Icon";
import { PopIn } from "./PopIn";
import { Sheet } from "./Sheet";
import { Tappable } from "./Tappable";
import { feedback } from "./sound";
import { colors, darken, fonts, lighten, radii, space, text } from "./theme";
import { useBackToClose } from "./screens/sheetParts";
import { t } from "../i18n";
import { DAILY_HADITH } from "../data/dailyCard";
import { openWebPage } from "../services/network";

// A hidden trick on the home path: tap the same picture (the camel, a sheep, the sun, a cloud...) 50 times in a row and
// a hadith pops up. The hadith come from the daily card's list (hadithBasics.ts): short sayings of the Prophet ﷺ already
// checked word for word on sunnah.com and translated, each with its reference and a link to it. Nothing new, nothing
// disputed, and no gems or rewards change hands, so it never undercuts the Shop's hadith chest.

/** Taps on one picture that open the hidden hadith. */
export const SECRET_TAPS = 50;
/** A longer pause than this between two taps starts the count again: the trick is for tapping on and on. */
export const SECRET_GAP_MS = 4000;

type SecretTap = (key: string) => void;
const SecretContext = createContext<SecretTap>(() => undefined);

/** Picks a hadith at random, never the one shown last time. */
export function pickSecretHadith(
  last: number | null,
  random: () => number = Math.random,
) {
  const count = DAILY_HADITH.length;
  if (count < 2) return 0;
  const pick = Math.floor(random() * (count - 1));
  return last !== null && pick >= last ? pick + 1 : pick;
}

/**
 * The tap counter for one picture: call it from the picture's own tap handler. Each picture counts on its own, so two
 * sheep side by side each need their 50. Outside the home path (no SecretHadithProvider) it does nothing.
 */
export function useSecretTap(label: string) {
  const tap = useContext(SecretContext);
  const id = useRef<string | null>(null);
  if (id.current === null)
    id.current = `${label}-${Math.random().toString(36).slice(2, 9)}`;
  return useCallback(() => tap(id.current as string), [tap]);
}

/** Counts the home path's picture taps and shows the hidden hadith on the 50th tap in a row on one picture. */
export function SecretHadithProvider({
  children,
  taps = SECRET_TAPS,
}: {
  children: React.ReactNode;
  taps?: number;
}) {
  const counts = useRef(new Map<string, { count: number; at: number }>());
  const last = useRef<number | null>(null);
  const [shown, setShown] = useState<number | null>(null);

  const tap = useCallback<SecretTap>(
    (key) => {
      const now = Date.now();
      const before = counts.current.get(key);
      // Tapping another picture, or stopping for a while, starts the count again.
      const count =
        before && now - before.at <= SECRET_GAP_MS ? before.count + 1 : 1;
      counts.current.clear();
      if (count >= taps) {
        const pick = pickSecretHadith(last.current);
        last.current = pick;
        feedback("unlock", "success");
        setShown(pick);
        return;
      }
      counts.current.set(key, { count, at: now });
    },
    [taps],
  );

  return (
    <SecretContext.Provider value={tap}>
      {children}
      <SecretHadithSheet index={shown} onClose={() => setShown(null)} />
    </SecretContext.Provider>
  );
}

const COLOR = colors.gem;

function Line({
  value,
  style,
  testID,
}: {
  value: string;
  style: object;
  testID: string;
}) {
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

function SecretHadithSheet({
  index,
  onClose,
}: {
  index: number | null;
  onClose: () => void;
}) {
  const visible = index !== null;
  // Keeps the last hadith on the sheet while it slides away.
  const kept = useRef(0);
  if (index !== null) kept.current = index;
  const hadith = DAILY_HADITH[kept.current];
  useBackToClose(visible, onClose);
  const body = (
    <PopIn
      key={visible ? `secret-${kept.current}` : "secret"}
      delay={80}
      from="up"
    >
      <View
        style={[styles.card, { borderColor: lighten(COLOR, 0.6) }]}
        testID="secret-hadith"
      >
        <View style={[styles.label, { backgroundColor: lighten(COLOR, 0.85) }]}>
          <Icon name="scroll" size={18} />
          <Text
            style={[styles.labelText, { color: darken(COLOR, 0.3) }]}
            numberOfLines={1}
          >
            {t("A hidden hadith")}
          </Text>
        </View>
        <Line
          value={t(hadith.line)}
          style={styles.line}
          testID="secret-hadith-line"
        />
        <Line
          value={t(hadith.quote)}
          style={styles.quote}
          testID="secret-hadith-quote"
        />
        <Tappable
          onPress={() => openWebPage(hadith.url)}
          accessibilityLabel={t("Open source {name}", {
            name: t(hadith.reference),
          })}
          hitSlop={6}
          testID="secret-hadith-ref"
        >
          <Text style={[styles.reference, styles.link]}>
            {t(hadith.reference)}
          </Text>
        </Tappable>
      </View>
    </PopIn>
  );

  return (
    <Sheet visible={visible} onClose={onClose} testID="secret-hadith-sheet">
      <Text style={styles.title} accessibilityRole="header">
        {t("You found a secret!")}
      </Text>
      <Text style={styles.subtitle}>
        {t("All that tapping uncovered a hadith.")}
      </Text>
      {body}
      <GameButton
        label={t("Got it")}
        fullWidth
        onPress={onClose}
        style={styles.button}
        testID="secret-hadith-close"
      />
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
  },
  subtitle: {
    ...text.small,
    textAlign: "center",
    marginBottom: space.md,
  },
  card: {
    borderWidth: 2,
    borderBottomWidth: 4,
    borderRadius: radii.lg,
    padding: space.lg,
    gap: space.sm,
    alignItems: "center",
    backgroundColor: colors.white,
  },
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radii.pill,
    maxWidth: "100%",
  },
  labelText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 13,
    lineHeight: 18,
    flexShrink: 1,
  },
  full: {
    alignSelf: "stretch",
  },
  line: {
    ...text.bodyBold,
    textAlign: "center",
  },
  quote: {
    ...text.small,
    textAlign: "center",
    fontStyle: "italic",
  },
  reference: {
    ...text.tiny,
    textAlign: "center",
  },
  link: {
    color: darken(COLOR, 0.2),
    textDecorationLine: "underline",
  },
  button: {
    marginTop: space.md,
  },
});
