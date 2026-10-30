import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameButton } from "./GameButton";
import { Mascot } from "./Mascot";
import { colors, space, text } from "./theme";
import { reportError } from "../services/analytics";
import { t } from "../i18n";

type Props = { children: React.ReactNode };
type State = { failed: boolean; tries: number };

/**
 * A screen that breaks shows a sad mascot and TRY AGAIN instead of a blank app, and the crash is reported.
 * Saved progress lives outside the screens, so trying again picks up where the learner was.
 */
export class CrashScreen extends React.Component<Props, State> {
  state: State = { failed: false, tries: 0 };

  static getDerivedStateFromError(): Partial<State> {
    return { failed: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (info.componentStack) err.stack = `${err.stack ?? ""}\n${info.componentStack}`;
    reportError(err, { fatal: true, where: "screen" });
  }

  render() {
    if (!this.state.failed) {
      return <React.Fragment key={this.state.tries}>{this.props.children}</React.Fragment>;
    }

    return (
      <View style={styles.screen} testID="crash-screen">
        <Mascot mood="sad" size={140} />
        <Text style={styles.title}>{t("Something went wrong")}</Text>
        <Text style={styles.line}>{t("Your progress is safe.")}</Text>
        <GameButton
          label={t("Try again")}
          onPress={() => this.setState((current) => ({ failed: false, tries: current.tries + 1 }))}
          testID="crash-try-again"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: space.md,
    padding: space.lg,
    backgroundColor: colors.white
  },
  title: {
    ...text.h2,
    textAlign: "center"
  },
  line: {
    ...text.body,
    textAlign: "center",
    color: colors.inkSoft
  }
});
