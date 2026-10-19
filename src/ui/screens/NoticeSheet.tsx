import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { GameSoundEvent } from "../../services/gameSoundLibrary";
import { GameButton } from "../GameButton";
import { Mascot, type MascotMood } from "../Mascot";
import { Sheet } from "../Sheet";
import { feedback, type HapticKind } from "../sound";
import { colors, space, text } from "../theme";
import { useBackToClose } from "./sheetParts";
// In-game replacements for Alert.alert and the browser's alert()/confirm().

type MascotLook = {
  /** Default "happy" for a notice, "think" for a confirm. */
  mood?: MascotMood;
  mascotVariant?: string;
  accent?: string;
  /**
   * Played as the sheet opens. Default: matches the mood (sad: wrong, cheer: unlock, others:
   * the soft tap). false: silent, for a sheet that opens with its own sound.
   */
  sound?: GameSoundEvent | false;
};

function moodSound(mood: MascotMood | undefined): GameSoundEvent {
  if (mood === "sad") return "wrong";
  if (mood === "cheer") return "unlock";
  return "soft_ui";
}

function soundHaptic(sound: GameSoundEvent): HapticKind {
  if (sound === "wrong") return "warning";
  if (sound === "soft_ui" || sound === "node_tap") return "light";
  return "success";
}

/** Plays the sheet's sound once when it opens, and again when it shows a new message while open. */
function useOpenSound(visible: boolean, sound: GameSoundEvent | false, message: string) {
  const played = useRef<string | undefined>(undefined);
  useEffect(() => {
    if (!visible) {
      played.current = undefined;
      return;
    }
    if (played.current === message) return;
    played.current = message;
    if (sound) feedback(sound, soundHaptic(sound));
  }, [message, sound, visible]);
}

export type NoticeSheetProps = MascotLook & {
  visible: boolean;
  /** Two to four words: "Logged out", "Need 230 more gems". */
  title: string;
  /** One short line, or nothing. */
  line?: string;
  /** Default "OK". */
  button?: string;
  onClose: () => void;
  testID?: string;
};

export type ConfirmSheetProps = MascotLook & {
  visible: boolean;
  /** A short question: "Remove Yusuf?", "Delete account?". */
  title: string;
  line?: string;
  /** One or two words: "Remove", "Delete". */
  confirmLabel: string;
  /** Default "Keep". */
  cancelLabel?: string;
  /** Red confirm button for things that cannot be undone. Default true. */
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  testID?: string;
};

function Head({ title, line, mood, mascotVariant = "girl", accent }: MascotLook & { title: string; line?: string }) {
  return (
    <View style={styles.head}>
      <Mascot variant={mascotVariant} mood={mood} size={96} accent={accent} />
      <Text style={styles.title} accessibilityRole="header">
        {title}
      </Text>
      {line ? <Text style={styles.line}>{line}</Text> : null}
    </View>
  );
}

/** Mascot, a short title, one short line and OK. */
export function NoticeSheet({ visible, title, line, button = "OK", mood = "happy", mascotVariant, accent, sound, onClose, testID = "notice-sheet" }: NoticeSheetProps) {
  useBackToClose(visible, onClose);
  useOpenSound(visible, sound ?? moodSound(mood), `${title}\n${line ?? ""}`);
  return (
    <Sheet visible={visible} onClose={onClose} testID={testID}>
      <View style={styles.stack}>
        <Head title={title} line={line} mood={mood} mascotVariant={mascotVariant} accent={accent} />
        <GameButton label={button} fullWidth onPress={onClose} testID={`${testID}-ok`} />
      </View>
    </Sheet>
  );
}

/** Mascot, a short question, and two buttons: the action (red when danger) and a safe way out. */
export function ConfirmSheet({
  visible,
  title,
  line,
  confirmLabel,
  cancelLabel = "Keep",
  danger = true,
  mood = "think",
  mascotVariant,
  accent,
  sound,
  onConfirm,
  onCancel,
  testID = "confirm-sheet"
}: ConfirmSheetProps) {
  useBackToClose(visible, onCancel);
  useOpenSound(visible, sound ?? moodSound(mood), `${title}\n${line ?? ""}`);
  return (
    <Sheet visible={visible} onClose={onCancel} testID={testID}>
      <View style={styles.stack}>
        <Head title={title} line={line} mood={mood} mascotVariant={mascotVariant} accent={accent} />
        {danger ? (
          <>
            {/* The safe choice is the big friendly one; the action sits under it in red. */}
            <GameButton label={cancelLabel} fullWidth onPress={onCancel} testID={`${testID}-cancel`} />
            <GameButton label={confirmLabel} variant="secondary" color={colors.wrongInk} fullWidth onPress={onConfirm} testID={`${testID}-confirm`} />
          </>
        ) : (
          <>
            <GameButton label={confirmLabel} fullWidth onPress={onConfirm} testID={`${testID}-confirm`} />
            <GameButton label={cancelLabel} variant="ghost" fullWidth onPress={onCancel} testID={`${testID}-cancel`} />
          </>
        )}
      </View>
    </Sheet>
  );
}

type NoticeRequest = { kind: "notice"; title: string; line?: string; options: NoticeOptions; resolve: () => void; done?: boolean };
type ConfirmRequest = { kind: "confirm"; title: string; line?: string; confirmLabel: string; options: ConfirmOptions; resolve: (ok: boolean) => void; done?: boolean };
type Request = NoticeRequest | ConfirmRequest;

export type NoticeOptions = MascotLook & { button?: string };
export type ConfirmOptions = MascotLook & { cancelLabel?: string; danger?: boolean };

/**
 * Promise-based notices for app code that used Alert.alert / confirm():
 *
 *   const { notify, confirm, sheets } = useNotices({ mascotVariant, accent });
 *   notify("Logged out");
 *   if (await confirm("Remove Yusuf?", undefined, "Remove")) { ... }
 *   // render {sheets} once, anywhere in the app shell.
 *
 * Requests queue: the next one shows when the current one closes.
 */
export function useNotices(defaults: MascotLook = {}) {
  const [queue, setQueue] = useState<Request[]>([]);
  // The last request of each kind stays drawn while its sheet slides away.
  const [lastNotice, setLastNotice] = useState<NoticeRequest | undefined>(undefined);
  const [lastConfirm, setLastConfirm] = useState<ConfirmRequest | undefined>(undefined);

  const current = queue[0];
  useEffect(() => {
    if (current?.kind === "notice") setLastNotice(current);
    else if (current?.kind === "confirm") setLastConfirm(current);
  }, [current]);

  const notify = useCallback((title: string, line?: string, options: NoticeOptions = {}) => {
    return new Promise<void>((resolve) => {
      setQueue((list) => [...list, { kind: "notice", title, line, options, resolve }]);
    });
  }, []);

  const confirm = useCallback((title: string, line: string | undefined, confirmLabel: string, options: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      setQueue((list) => [...list, { kind: "confirm", title, line, confirmLabel, options, resolve }]);
    });
  }, []);

  const finish = (ok: boolean) => {
    const head = queue[0];
    // A double tap must not close the next request too.
    if (!head || head.done) return;
    head.done = true;
    setQueue((list) => list.slice(1));
    if (head.kind === "confirm") head.resolve(ok);
    else head.resolve();
  };

  const look = (options: MascotLook = {}, mood: MascotMood) => ({
    mood: options.mood ?? defaults.mood ?? mood,
    mascotVariant: options.mascotVariant ?? defaults.mascotVariant,
    accent: options.accent ?? defaults.accent,
    sound: options.sound ?? defaults.sound
  });

  // The current request is drawn from its first frame, so the opening sound matches its mood.
  const notice = current?.kind === "notice" ? current : lastNotice;
  const ask = current?.kind === "confirm" ? current : lastConfirm;

  const sheets = (
    <>
      <NoticeSheet
        visible={current?.kind === "notice"}
        title={notice?.title ?? ""}
        line={notice?.line}
        button={notice?.options.button}
        {...look(notice?.options, "happy")}
        onClose={() => finish(true)}
      />
      <ConfirmSheet
        visible={current?.kind === "confirm"}
        title={ask?.title ?? ""}
        line={ask?.line}
        confirmLabel={ask?.confirmLabel ?? "OK"}
        cancelLabel={ask?.options.cancelLabel}
        danger={ask?.options.danger}
        {...look(ask?.options, "think")}
        onConfirm={() => finish(true)}
        onCancel={() => finish(false)}
      />
    </>
  );

  return { notify, confirm, sheets, open: Boolean(current) };
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  head: {
    alignItems: "center",
    gap: space.xs,
    marginBottom: space.xs
  },
  title: {
    ...text.h2,
    textAlign: "center",
    flexShrink: 1
  },
  line: {
    ...text.body,
    color: colors.inkSoft,
    textAlign: "center",
    flexShrink: 1
  }
});
