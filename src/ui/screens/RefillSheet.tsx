import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { PopIn } from "../PopIn";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { colors, space, text } from "../theme";
import { MascotSays, useBackToClose } from "./sheetParts";

export type RefillSheetProps = {
  visible: boolean;
  maxHearts: number;
  mascotVariant: string;
  /** Mascot color (topic accent). */
  accent?: string;
  /**
   * "free": the one free refill is still there (REFILL HEARTS / SHOP).
   * "shop": it is used up (GET HEARTS opens the shop / END LESSON). Default "free".
   */
  variant?: "free" | "shop";
  /** "free" only. Called once the hearts have filled up on screen. */
  onRefill?: () => void;
  onShop: () => void;
  /** "shop" only. Default: onShop. */
  onEndLesson?: () => void;
  /** "shop" only: the ghost button. Default "End lesson"; on the path, where no lesson is running, "Not now". */
  endLabel?: string;
  /**
   * "shop" only: the shop can give hearts now (enough gems for a heart item, or a store that sells
   * hearts or videos). When false GET HEARTS is left out, so the sheet never opens a shop that only
   * says "Need more gems". Default true.
   */
  canGetHearts?: boolean;
  /** "shop" only: PRACTICE, shown when no hearts can be had. Practice needs no hearts. */
  onPractice?: () => void;
};

const FILL_STEP = 110;

/** Out of hearts: the row of hearts is empty. A free refill pops them red one by one, then the sheet closes. */
export function RefillSheet({
  visible,
  maxHearts,
  mascotVariant,
  accent,
  variant = "free",
  onRefill,
  onShop,
  onEndLesson,
  endLabel = "End lesson",
  canGetHearts = true,
  onPractice
}: RefillSheetProps) {
  const free = variant === "free";
  const endLesson = onEndLesson ?? onShop;
  const [filled, setFilled] = useState(0);
  const [filling, setFilling] = useState(false);
  const [refilled, setRefilled] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useBackToClose(visible && !filling, free ? onShop : endLesson);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => clearTimers, []);
  useEffect(() => {
    if (visible) {
      clearTimers();
      setFilled(0);
      setFilling(false);
      setRefilled(false);
    }
  }, [visible]);

  const refill = () => {
    // One free refill: a second tap while the sheet slides away does nothing.
    if (filling || refilled) return;
    setFilling(true);
    for (let index = 1; index <= maxHearts; index += 1) {
      timers.current.push(
        setTimeout(() => {
          setFilled(index);
          feedback(index === maxHearts ? "unlock" : "soft_ui", index === maxHearts ? "success" : "light");
        }, index * FILL_STEP)
      );
    }
    // Let the last heart land before the sheet slides away.
    timers.current.push(
      setTimeout(() => {
        setFilling(false);
        setRefilled(true);
        onRefill?.();
      }, maxHearts * FILL_STEP + 420)
    );
  };

  // The bubble cheers in the same frame as the mascot, once the last heart lands.
  const full = filled === maxHearts && maxHearts > 0;
  // With no way to get hearts now, PRACTICE (or END LESSON) takes the big button instead of a dead-end shop.
  const practice = !canGetHearts && onPractice;

  return (
    <Sheet visible={visible} onClose={free ? onShop : endLesson} dismissOnBackdrop={false} testID="refill-sheet">
      <View style={styles.stack}>
        <MascotSays variant={mascotVariant} mood={full ? "cheer" : "sad"} accent={accent} line={full ? "Hearts full!" : "Out of hearts!"} />
        <View style={styles.heartRow} accessibilityLabel={`${filled} of ${maxHearts} hearts`} testID="refill-hearts">
          {Array.from({ length: maxHearts }, (_, index) =>
            index < filled ? (
              <PopIn key={`full-${index}`}>
                <Icon name="heart" size={34} />
              </PopIn>
            ) : (
              <PopIn key={`empty-${index}`} delay={120 + index * 60}>
                <Icon name="heart" size={34} color={colors.lockedLip} />
              </PopIn>
            )
          )}
        </View>
        {free ? (
          <>
            <Text style={styles.centerLine}>Here is one free refill.</Text>
            {/* Not disabled while filling: a grey button would look broken mid-celebration. */}
            <GameButton label="Refill hearts" color={colors.heart} fullWidth onPress={refill} testID="refill-claim" />
            <GameButton label="Shop" variant="ghost" fullWidth onPress={() => !filling && onShop()} testID="refill-shop" />
          </>
        ) : (
          <>
            {/* True to refillHeartsForToday: the hearts fill up again on the next day the app opens. */}
            <Text style={styles.centerLine} testID="refill-tomorrow">
              Full hearts again tomorrow!
            </Text>
            {canGetHearts ? (
              <GameButton label="Get hearts" icon="heart" color={colors.heart} fullWidth onPress={onShop} testID="refill-get" />
            ) : practice ? (
              <GameButton label="Practice" icon="practice" color={accent} fullWidth onPress={practice} testID="refill-practice" />
            ) : null}
            <GameButton
              label={endLabel}
              variant={canGetHearts || practice ? "ghost" : "primary"}
              color={canGetHearts || practice ? colors.inkSoft : accent}
              fullWidth
              onPress={endLesson}
              testID="refill-end"
            />
          </>
        )}
      </View>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  centerLine: {
    ...text.bodyBold,
    textAlign: "center"
  },
  heartRow: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: space.sm
  }
});
