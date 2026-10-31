import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import type { BattleQuestion } from "../../services/battleQuestions";
import { ARENAS, BATTLE_QUESTIONS, BATTLE_SECONDS, BATTLE_WIN_SCORE, arenaFor, type BattleResult } from "../../services/ummah";
import { ChoiceTile, type ChoiceTileState } from "../ChoiceTile";
import { Confetti } from "../Confetti";
import { GameButton } from "../GameButton";
import { Icon } from "../Icon";
import { Mascot } from "../Mascot";
import { PopIn } from "../PopIn";
import { Portal } from "../Portal";
import { ProgressBar } from "../ProgressBar";
import { feedback } from "../sound";
import { Tappable } from "../Tappable";
import { colors, darken, fonts, lighten, radii, text } from "../theme";
import { formatNumber } from "./FormattedCount";
import { arenaName } from "./UmmahRanks";
import { useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

const ANSWER_PAUSE_MS = 1100;
const TICK_MS = 250;

export type BattleViewProps = {
  questions: BattleQuestion[];
  /** Called once, when the last question is answered or runs out of time, with the right answers. */
  onFinish: (correct: number) => BattleResult;
  /** Leaves the battle. Leaving before the end is a loss. */
  onClose: () => void;
  mascotVariant?: string;
  accent?: string;
};

/** A quiz battle over the whole app: hard questions against the clock, then trophies won or lost. */
export function BattleView({ questions, onFinish, onClose, mascotVariant = "muslim_man", accent = colors.green }: BattleViewProps) {
  const insets = useContext(SafeAreaInsetsContext);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | undefined>(undefined);
  const [timedOut, setTimedOut] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [left, setLeft] = useState(BATTLE_SECONDS * 1000);
  const [result, setResult] = useState<BattleResult | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const finished = useRef(false);
  const question = questions[index];
  const answered = picked !== undefined || timedOut;

  const finish = (score: number) => {
    if (finished.current) return;
    finished.current = true;
    const outcome = onFinish(score);
    setResult(outcome);
    feedback(outcome.outcome === "win" ? "lesson_complete" : "soft_ui", outcome.outcome === "win" ? "success" : "light");
  };

  // Leaving mid-battle counts the answers so far, like running out of time on the rest.
  const leave = () => {
    if (!result) finish(correct);
    onClose();
  };
  useBackToClose(true, result ? onClose : leave);

  const next = (score: number) => {
    timer.current = setTimeout(() => {
      if (index + 1 >= questions.length) {
        finish(score);
        return;
      }
      setIndex(index + 1);
      setPicked(undefined);
      setTimedOut(false);
      setLeft(BATTLE_SECONDS * 1000);
    }, ANSWER_PAUSE_MS);
  };

  useEffect(() => {
    if (answered || result || !question) return;
    const tick = setTimeout(() => {
      const remaining = left - TICK_MS;
      if (remaining > 0) {
        setLeft(remaining);
        return;
      }
      setLeft(0);
      setTimedOut(true);
      feedback("wrong", "error");
      next(correct);
    }, TICK_MS);
    return () => clearTimeout(tick);
  });
  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (choiceId: string) => {
    if (answered || !question) return;
    const right = choiceId === question.correctChoiceId;
    const score = correct + (right ? 1 : 0);
    setPicked(choiceId);
    setCorrect(score);
    feedback(right ? "correct" : "wrong", right ? "success" : "error");
    next(score);
  };

  const tileState = (choiceId: string): ChoiceTileState => {
    if (!answered) return "idle";
    if (choiceId === question?.correctChoiceId) return "correct";
    if (choiceId === picked) return "wrong";
    return "dimmed";
  };

  const pad = { paddingTop: (insets?.top ?? 0) + 12, paddingBottom: (insets?.bottom ?? 0) + 16 };

  return (
    <Portal>
      <View style={[styles.root, pad]} testID="battle-view">
        {result ? (
          <BattleResultView result={result} onDone={onClose} mascotVariant={mascotVariant} accent={accent} />
        ) : question ? (
          <>
            <View style={styles.head}>
              <Tappable onPress={leave} style={styles.close} accessibilityLabel={t("Leave battle")} hitSlop={8} testID="battle-leave">
                <Icon name="close" size={22} color={colors.inkSoft} />
              </Tappable>
              <View style={styles.dots} accessibilityLabel={t("Question {count} of {total}", { count: index + 1, total: questions.length })}>
                {questions.map((item, at) => (
                  <View key={item.id} style={[styles.dot, at < index || (at === index && answered) ? styles.dotDone : null, at === index ? styles.dotNow : null]} />
                ))}
              </View>
              <View style={styles.score} accessibilityLabel={t("{count} right", { count: correct })}>
                <Icon name="check" size={18} color={colors.correctInk} />
                <Text style={styles.scoreText} testID="battle-score">{correct}</Text>
              </View>
            </View>
            <ProgressBar progress={left / (BATTLE_SECONDS * 1000)} color={left < 5000 ? colors.heart : colors.gold} height={12} testID="battle-timer" />
            <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
              <PopIn key={question.id} from="up">
                <Text style={styles.topic} numberOfLines={1}>{question.topic}</Text>
                <Text style={styles.prompt} testID="battle-prompt">{question.prompt}</Text>
              </PopIn>
              <View style={styles.choices}>
                {question.choices.map((choice, at) => (
                  <ChoiceTile key={choice.id} label={choice.label} state={tileState(choice.id)} onPress={() => choose(choice.id)} testID={`battle-choice-${at}`} />
                ))}
              </View>
              {timedOut ? <Text style={styles.timeUp} testID="battle-time-up">{t("Time's up!")}</Text> : null}
            </ScrollView>
          </>
        ) : (
          <BattleResultView result={{ correct: 0, outcome: "loss", change: 0, trophies: 0, newArena: false, gems: 0 }} onDone={onClose} mascotVariant={mascotVariant} accent={accent} />
        )}
      </View>
    </Portal>
  );
}

function BattleResultView({ result, onDone, mascotVariant, accent }: { result: BattleResult; onDone: () => void; mascotVariant: string; accent: string }) {
  const win = result.outcome === "win";
  const arena = arenaFor(result.trophies);
  const title = win ? t("Victory!") : result.outcome === "draw" ? t("So close!") : t("Good try!");
  const change = result.change > 0 ? `+${result.change}` : `${result.change}`;
  return (
    <View style={styles.result} testID="battle-result">
      {win ? <Confetti active count={44} /> : null}
      <Mascot variant={mascotVariant} mood={win ? "cheer" : result.outcome === "draw" ? "think" : "sad"} size={130} accent={accent} />
      <Text style={styles.resultTitle} accessibilityRole="header" testID="battle-result-title">
        {title}
      </Text>
      <Text style={styles.resultLine}>{t("{count} of {total} right", { count: result.correct, total: BATTLE_QUESTIONS })}</Text>
      <PopIn from="scale" delay={150}>
        <View style={styles.trophyPill} accessibilityLabel={t("{count} trophies", { count: change })}>
          <Icon name="trophy" size={30} />
          <Text style={[styles.trophyChange, result.change < 0 ? styles.trophyDown : null]} testID="battle-result-trophies">
            {change}
          </Text>
        </View>
      </PopIn>
      {result.gems ? <Text style={styles.resultGems}>{t("+{count} gems", { count: result.gems })}</Text> : null}
      {result.newArena ? (
        <Text style={[styles.newArena, { color: darken(arena.color, 0.35) }]} testID="battle-new-arena">
          {t("New arena: {name}!", { name: arenaName(ARENAS.indexOf(arena)) })}
        </Text>
      ) : !win ? (
        <Text style={styles.resultHint}>{t("Get {count} right to win.", { count: BATTLE_WIN_SCORE })}</Text>
      ) : null}
      <Text style={styles.resultTotal}>{t("{count} trophies", { count: formatNumber(result.trophies) })}</Text>
      <GameButton label={t("Continue")} fullWidth onPress={onDone} testID="battle-done" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    gap: 12
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  close: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.mist
  },
  dots: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.line
  },
  dotDone: {
    backgroundColor: colors.gold
  },
  dotNow: {
    borderWidth: 2,
    borderColor: colors.goldLip
  },
  score: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    minWidth: 36,
    justifyContent: "flex-end"
  },
  scoreText: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.correctInk
  },
  body: {
    gap: 16,
    paddingTop: 8,
    paddingBottom: 12
  },
  topic: {
    ...text.tiny,
    fontFamily: fonts.bodyHeavy,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4
  },
  prompt: {
    ...text.h2
  },
  choices: {
    gap: 10
  },
  timeUp: {
    fontFamily: fonts.displayHeavy,
    fontSize: 18,
    lineHeight: 24,
    color: colors.wrongInk,
    textAlign: "center"
  },
  result: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  resultTitle: {
    fontFamily: fonts.displayHeavy,
    fontSize: 32,
    lineHeight: 40,
    color: colors.ink,
    textAlign: "center"
  },
  resultLine: {
    ...text.bodyBold,
    textAlign: "center"
  },
  trophyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: lighten(colors.gold, 0.78)
  },
  trophyChange: {
    fontFamily: fonts.displayHeavy,
    fontSize: 28,
    lineHeight: 36,
    color: darken(colors.gold, 0.55)
  },
  trophyDown: {
    color: colors.wrongInk
  },
  resultGems: {
    fontFamily: fonts.displayHeavy,
    fontSize: 16,
    lineHeight: 22,
    color: colors.gemLip
  },
  newArena: {
    fontFamily: fonts.displayHeavy,
    fontSize: 20,
    lineHeight: 26,
    textAlign: "center"
  },
  resultHint: {
    ...text.small,
    textAlign: "center"
  },
  resultTotal: {
    ...text.small,
    textAlign: "center",
    marginBottom: 8
  }
});
