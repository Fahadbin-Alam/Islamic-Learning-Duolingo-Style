import React, { useEffect, useState } from "react";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { HADITH_TREASURES, ownedHadith, type HadithCard } from "../../data/hadithTreasures";
import { SECRET_FOUND_GEMS, SECRET_LESSONS, hasFound, type SecretLesson } from "../../data/secretLessons";
import type { UserProfile } from "../../types";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { playUi } from "../sound";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

const SECRET_INK = darken(colors.gold, 0.6);

/** A secret lesson or a hadith treasure card: what it teaches, the quote and its source. */
function SecretBody({ secret }: { secret: Pick<SecretLesson, "title" | "line" | "quote" | "reference" | "source"> & { kind?: SecretLesson["kind"] } }) {
  return (
    <>
      <Text style={styles.kind}>{secret.kind === "scholar" ? t("A scholar") : t("A hadith")}</Text>
      <Text style={styles.title} accessibilityRole="header" testID="secret-title">
        {t(secret.title)}
      </Text>
      <Text style={styles.line}>{t(secret.line)}</Text>
      <View style={styles.quote}>
        <Text style={styles.quoteText} testID="secret-quote">{`“${secret.quote}”`}</Text>
      </View>
      <Tappable onPress={() => void Linking.openURL(secret.source.url).catch(() => undefined)} style={styles.source} accessibilityRole="link" accessibilityLabel={t("Source: {reference}", { reference: secret.reference })} testID="secret-source">
        <Icon name="book" size={16} />
        <Text style={styles.sourceText} numberOfLines={1}>
          {secret.reference}
        </Text>
      </Tappable>
    </>
  );
}

/** A secret lesson just found (with confetti and its gems) or opened again from the list. */
export function SecretSheet({ secret, isNew, onClose }: { secret?: SecretLesson; isNew?: boolean; onClose: () => void }) {
  const visible = secret !== undefined;
  useBackToClose(visible, onClose);
  useEffect(() => {
    if (visible && isNew) playUi("reward_chest");
  }, [isNew, visible]);

  return (
    <Sheet visible={visible} onClose={onClose} testID="secret-sheet">
      {isNew ? <Confetti active={visible} count={36} /> : null}
      {secret ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <PopIn key={secret.id} from="scale">
            <View style={styles.lantern}>
              <Icon name="lantern" size={52} />
            </View>
          </PopIn>
          {isNew ? <Text style={styles.found}>{t("Secret found! +{count} gems", { count: SECRET_FOUND_GEMS })}</Text> : null}
          <SecretBody secret={secret} />
          <GameButton label={t("Got it")} fullWidth onPress={onClose} testID="secret-close" />
        </ScrollView>
      ) : null}
    </Sheet>
  );
}

/** Every secret: found ones open, bought clues show, the rest are "???". */
export function SecretListSheet({ visible, user, onClose }: { visible: boolean; user: UserProfile; onClose: () => void }) {
  const [open, setOpen] = useState<SecretLesson | undefined>(undefined);
  useBackToClose(visible && !open, onClose);
  const hints = user.ummah?.hints ?? [];

  return (
    <>
      <Sheet visible={visible && !open} onClose={onClose} testID="secret-list">
        <Text style={styles.listTitle}>{t("Secret lessons")}</Text>
        <Text style={styles.listLine}>{t("Tap things 3 times to find them. Clues are in the Shop.")}</Text>
        <View style={styles.list}>
          {SECRET_LESSONS.map((secret) => {
            const found = hasFound(user, secret.id);
            const hinted = hints.includes(secret.id);
            return found ? (
              <Tappable key={secret.id} onPress={() => setOpen(secret)} style={[styles.row, styles.rowFound]} accessibilityLabel={t(secret.title)} testID={`secret-row-${secret.id}`}>
                <Icon name="lantern" size={26} />
                <Text style={styles.rowText} numberOfLines={2}>
                  {t(secret.title)}
                </Text>
                <Icon name="chevronRight" size={18} color={colors.inkSoft} />
              </Tappable>
            ) : (
              <View key={secret.id} style={styles.row} testID={`secret-row-${secret.id}`}>
                <Icon name="lock" size={22} color={colors.lockedLip} />
                <Text style={[styles.rowText, styles.rowLocked]} numberOfLines={3}>
                  {hinted ? t(secret.clue) : "???"}
                </Text>
              </View>
            );
          })}
        </View>
        <GameButton label={t("Close")} variant="secondary" fullWidth onPress={onClose} testID="secret-list-close" />
      </Sheet>
      <SecretSheet secret={open} onClose={() => setOpen(undefined)} />
    </>
  );
}

/** A hadith card just bought from the Shop's chest (confetti) or opened again from "My hadith". */
export function HadithCardSheet({ card, isNew, onClose }: { card?: HadithCard; isNew?: boolean; onClose: () => void }) {
  const visible = card !== undefined;
  useBackToClose(visible, onClose);
  useEffect(() => {
    if (visible && isNew) playUi("reward_chest");
  }, [isNew, visible]);

  return (
    <Sheet visible={visible} onClose={onClose} testID="hadith-sheet">
      {isNew ? <Confetti active={visible} count={36} /> : null}
      {card ? (
        <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
          <PopIn key={card.id} from="scale">
            <View style={[styles.lantern, styles.chest]}>
              <Icon name="bookOpen" size={50} />
            </View>
          </PopIn>
          {isNew ? <Text style={styles.found}>{t("New hadith!")}</Text> : null}
          <SecretBody secret={card} />
          <GameButton label={t("Got it")} fullWidth onPress={onClose} testID="hadith-close" />
        </ScrollView>
      ) : null}
    </Sheet>
  );
}

/** Every hadith card: owned ones open, the rest wait in the chest. */
export function HadithListSheet({ visible, user, onClose }: { visible: boolean; user: UserProfile; onClose: () => void }) {
  const [open, setOpen] = useState<HadithCard | undefined>(undefined);
  useBackToClose(visible && !open, onClose);
  const owned = ownedHadith(user);
  const locked = HADITH_TREASURES.length - owned.length;

  return (
    <>
      <Sheet visible={visible && !open} onClose={onClose} testID="hadith-list">
        <Text style={styles.listTitle}>{t("My hadith")}</Text>
        <Text style={styles.listLine}>{t("{count} of {total} collected", { count: owned.length, total: HADITH_TREASURES.length })}</Text>
        <View style={styles.list}>
          {owned.map((card) => (
            <Tappable key={card.id} onPress={() => setOpen(card)} style={[styles.row, styles.rowHadith]} accessibilityLabel={t(card.title)} testID={`hadith-row-${card.id}`}>
              <Icon name="bookOpen" size={26} />
              <Text style={styles.rowText} numberOfLines={2}>
                {t(card.title)}
              </Text>
              <Icon name="chevronRight" size={18} color={colors.inkSoft} />
            </Tappable>
          ))}
          {locked ? (
            <View style={styles.row} testID="hadith-row-locked">
              <Icon name="lock" size={22} color={colors.lockedLip} />
              <Text style={[styles.rowText, styles.rowLocked]} numberOfLines={2}>
                {t("{count} more in the chest", { count: locked })}
              </Text>
            </View>
          ) : null}
        </View>
        <GameButton label={t("Close")} variant="secondary" fullWidth onPress={onClose} testID="hadith-list-close" />
      </Sheet>
      <HadithCardSheet card={open} onClose={() => setOpen(undefined)} />
    </>
  );
}

const styles = StyleSheet.create({
  chest: {
    backgroundColor: lighten(colors.gem, 0.82)
  },
  rowHadith: {
    borderColor: lighten(colors.gem, 0.5),
    backgroundColor: lighten(colors.gem, 0.9)
  },
  body: {
    alignItems: "center",
    gap: 10,
    paddingBottom: 4
  },
  lantern: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: lighten(colors.gold, 0.75)
  },
  found: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: colors.gemLip,
    textAlign: "center"
  },
  kind: {
    ...text.tiny,
    fontFamily: fonts.bodyHeavy,
    textTransform: "uppercase",
    letterSpacing: 1
  },
  title: {
    ...text.h2,
    color: SECRET_INK,
    textAlign: "center"
  },
  line: {
    ...text.bodyBold,
    textAlign: "center"
  },
  quote: {
    alignSelf: "stretch",
    padding: 12,
    borderRadius: radii.md,
    backgroundColor: colors.mist
  },
  quoteText: {
    ...text.body,
    fontStyle: "italic"
  },
  source: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gem, 0.88),
    maxWidth: "100%"
  },
  sourceText: {
    fontFamily: fonts.bodyHeavy,
    fontSize: 14,
    lineHeight: 19,
    color: colors.gemLip,
    flexShrink: 1
  },
  listTitle: {
    ...text.h2,
    textAlign: "center"
  },
  listLine: {
    ...text.small,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12
  },
  list: {
    gap: 8,
    marginBottom: 14
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: radii.tile,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.snow
  },
  rowFound: {
    borderColor: lighten(colors.gold, 0.4),
    backgroundColor: lighten(colors.gold, 0.85)
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    fontFamily: fonts.display,
    fontSize: 16,
    lineHeight: 21,
    color: colors.ink
  },
  rowLocked: {
    color: colors.inkSoft,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    lineHeight: 19
  }
});
