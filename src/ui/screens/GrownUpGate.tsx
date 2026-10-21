import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import type { ChoiceTileState } from "../ChoiceTile";
import { Icon } from "../Icon";
import { useShake } from "../PopIn";
import { Sheet } from "../Sheet";
import { feedback } from "../sound";
import { Tappable } from "../Tappable";
import { colors, fonts, lighten, radii, text } from "../theme";

type Puzzle = { a: number; b: number; options: number[] };

function makePuzzle(random: () => number = Math.random): Puzzle {
  const pick = () => 6 + Math.floor(random() * 4); // 6..9: hard for young children
  const a = pick();
  const b = pick();
  const answer = a * b;
  const wrong = new Set<number>();
  const offsets = [-a, a, -b, b, -1, 1, 10, -10];
  while (wrong.size < 2) {
    const candidate = answer + offsets[Math.floor(random() * offsets.length)];
    if (candidate > 0 && candidate !== answer) wrong.add(candidate);
  }
  const options = [answer, ...wrong];
  // Shuffle so the answer is not always first.
  for (let index = options.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [options[index], options[swap]] = [options[swap], options[index]];
  }
  return { a, b, options };
}

/** The sum and its three answers. A right pick calls onPass; a wrong one buzzes, shakes and brings a new sum. */
export function GrownUpPuzzle({ onPass }: { onPass: () => void }) {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => makePuzzle());
  const [wrongPick, setWrongPick] = useState<number | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { style: shakeStyle, shake } = useShake(8);

  useEffect(() => () => clearTimeout(timer.current), []);

  const answer = (value: number) => {
    if (wrongPick !== undefined) return;
    if (value === puzzle.a * puzzle.b) {
      feedback("soft_ui", "light");
      onPass();
      return;
    }
    // Same as a wrong answer in a lesson: buzz, shake, then a new sum.
    feedback("wrong", "error");
    shake();
    setWrongPick(value);
    timer.current = setTimeout(() => {
      setWrongPick(undefined);
      setPuzzle(makePuzzle());
    }, 700);
  };

  const stateFor = (value: number): ChoiceTileState => (wrongPick === undefined ? "idle" : value === wrongPick ? "wrong" : "dimmed");

  return (
    <>
      <Text style={styles.question} testID="grownup-question" accessibilityLabel={`${puzzle.a} times ${puzzle.b}`}>
        {`${puzzle.a} × ${puzzle.b} = ?`}
      </Text>
      <Animated.View style={[styles.options, shakeStyle]}>
        {puzzle.options.map((value) => (
          <Tappable
            key={`${puzzle.a}x${puzzle.b}-${value}`}
            onPress={() => answer(value)}
            // answer() plays the right or the wrong sound.
            sound={false}
            hapticKind={false}
            disabled={wrongPick !== undefined}
            style={[styles.option, stateFor(value) === "wrong" ? styles.optionWrong : stateFor(value) === "dimmed" ? styles.optionDim : null]}
            testID={`grownup-option-${value}`}
            accessibilityLabel={String(value)}
            pressScale={0.94}
          >
            <Text style={[styles.optionText, stateFor(value) === "wrong" ? { color: colors.wrongInk } : null]}>{value}</Text>
          </Tappable>
        ))}
      </Animated.View>
    </>
  );
}

/** "Ask a grown-up" with its lock, the round close button (when onClose is given) and the sum. */
export function GrownUpCheck({ onPass, onClose }: { onPass: () => void; onClose?: () => void }) {
  return (
    <View testID="grownup-check">
      <View style={styles.head}>
        <View style={styles.lockCircle}>
          <Icon name="lock" size={26} />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          Ask a grown-up
        </Text>
        {onClose ? (
          <Tappable onPress={onClose} style={styles.close} accessibilityLabel="Close" hitSlop={8} pressScale={0.9} testID="grownup-close">
            <Icon name="close" size={20} color={colors.inkSoft} />
          </Tappable>
        ) : null}
      </View>
      <GrownUpPuzzle onPass={onPass} />
    </View>
  );
}

/**
 * Parental gate before real-money purchases, restores, links that leave the app and signing up
 * (Apple guideline 1.3, Kids category). Call `ask(action)` and render `gate` anywhere:
 * it is a kit Sheet, so it covers the whole app shell through the PortalHost.
 */
export function useGrownUpGate() {
  const [pending, setPending] = useState<(() => void) | undefined>(undefined);
  // A fresh sum every time the gate is asked.
  const [round, setRound] = useState(0);

  const ask = useCallback((action: () => void) => {
    setRound((value) => value + 1);
    setPending(() => action);
  }, []);

  const close = useCallback(() => {
    setPending(undefined);
  }, []);

  const pass = () => {
    const action = pending;
    setPending(undefined);
    action?.();
  };

  const gate = (
    <Sheet visible={pending !== undefined} onClose={close} testID="grownup-gate">
      <GrownUpCheck key={round} onPass={pass} onClose={close} />
    </Sheet>
  );

  return { ask, gate, open: pending !== undefined };
}

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  lockCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: lighten(colors.gold, 0.75),
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    ...text.h2,
    fontSize: 22,
    lineHeight: 28,
    flex: 1,
    minWidth: 0
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.mist,
    alignItems: "center",
    justifyContent: "center"
  },
  question: {
    fontFamily: fonts.displayHeavy,
    fontSize: 40,
    lineHeight: 50,
    color: colors.ink,
    textAlign: "center",
    marginTop: 14,
    marginBottom: 10
  },
  options: {
    flexDirection: "row",
    gap: 10
  },
  option: {
    flex: 1,
    flexBasis: 0,
    minWidth: 0,
    minHeight: 72,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.tile,
    borderWidth: 2,
    borderBottomWidth: 5,
    borderColor: colors.line,
    borderBottomColor: colors.lineLip,
    backgroundColor: colors.white
  },
  optionWrong: {
    backgroundColor: colors.wrongBg,
    borderColor: lighten(colors.heart, 0.2),
    borderBottomColor: colors.heart
  },
  optionDim: {
    opacity: 0.45
  },
  optionText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 30,
    lineHeight: 38,
    color: colors.ink
  }
});
