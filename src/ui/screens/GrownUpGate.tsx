import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import type { ChoiceTileState } from "../ChoiceTile";
import { Icon } from "../Icon";
import { Sheet } from "../Sheet";
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

/**
 * Parental gate before real-money purchases, restores and links that leave the app
 * (Apple guideline 1.3, Kids category). Call `ask(action)`; render `gate` as the LAST
 * child of a container that fills the screen.
 */
export function useGrownUpGate() {
  const [pending, setPending] = useState<(() => void) | undefined>(undefined);
  const [puzzle, setPuzzle] = useState<Puzzle>(() => makePuzzle());
  const [wrongPick, setWrongPick] = useState<number | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = useCallback((action: () => void) => {
    clearTimeout(timer.current);
    setWrongPick(undefined);
    setPuzzle(makePuzzle());
    setPending(() => action);
  }, []);

  const close = useCallback(() => {
    clearTimeout(timer.current);
    setPending(undefined);
  }, []);

  const answer = (value: number) => {
    if (wrongPick !== undefined) return;
    if (value === puzzle.a * puzzle.b) {
      const action = pending;
      setPending(undefined);
      action?.();
      return;
    }
    setWrongPick(value);
    timer.current = setTimeout(() => {
      setWrongPick(undefined);
      setPuzzle(makePuzzle());
    }, 700);
  };

  const stateFor = (value: number): ChoiceTileState => (wrongPick === undefined ? "idle" : value === wrongPick ? "wrong" : "dimmed");

  const gate = (
    <Sheet visible={pending !== undefined} onClose={close} testID="grownup-gate">
      <View style={styles.head}>
        <View style={styles.lockCircle}>
          <Icon name="lock" size={26} />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          Ask a grown-up
        </Text>
        <Tappable onPress={close} style={styles.close} accessibilityLabel="Close" hitSlop={8} pressScale={0.9} testID="grownup-close">
          <Icon name="close" size={20} color={colors.inkSoft} />
        </Tappable>
      </View>
      <Text style={styles.question} testID="grownup-question" accessibilityLabel={`${puzzle.a} times ${puzzle.b}`}>
        {`${puzzle.a} × ${puzzle.b} = ?`}
      </Text>
      <View style={styles.options}>
        {puzzle.options.map((value) => (
          <Tappable
            key={`${puzzle.a}x${puzzle.b}-${value}`}
            onPress={() => answer(value)}
            disabled={wrongPick !== undefined}
            style={[styles.option, stateFor(value) === "wrong" ? styles.optionWrong : stateFor(value) === "dimmed" ? styles.optionDim : null]}
            testID={`grownup-option-${value}`}
            accessibilityLabel={String(value)}
            pressScale={0.94}
          >
            <Text style={[styles.optionText, stateFor(value) === "wrong" ? { color: colors.wrongInk } : null]}>{value}</Text>
          </Tappable>
        ))}
      </View>
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
