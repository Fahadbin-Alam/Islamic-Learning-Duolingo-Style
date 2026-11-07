import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

/**
 * Catches an error while drawing the app, so a bug in one screen shows a friendly "try again" page instead of
 * closing the app. Progress is saved on the phone as the learner goes, so trying again picks up where they were.
 */
type Props = { children: React.ReactNode };
type State = { error?: Error; tries: number };

export class CrashGuard extends React.Component<Props, State> {
  state: State = { tries: 0 };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Muslimo caught a crash", error, info.componentStack);
  }

  private retry = () => this.setState((state) => ({ error: undefined, tries: state.tries + 1 }));

  render() {
    if (!this.state.error) {
      // A new key after TRY AGAIN draws the app fresh.
      return <React.Fragment key={this.state.tries}>{this.props.children}</React.Fragment>;
    }
    return (
      <View style={styles.page} testID="crash-guard">
        <Text style={styles.emoji}>🐪</Text>
        <Text style={styles.title}>Oops, something went wrong</Text>
        <Text style={styles.body}>Your progress is saved. Tap below to go back and keep learning.</Text>
        <Pressable onPress={this.retry} accessibilityRole="button" style={styles.button} testID="crash-guard-retry">
          <Text style={styles.buttonText}>TRY AGAIN</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, backgroundColor: "#FFFFFF" },
  emoji: { fontSize: 64, marginBottom: 12 },
  title: { fontSize: 22, fontWeight: "800", color: "#1F2D27", textAlign: "center", marginBottom: 8 },
  body: { fontSize: 16, color: "#5B6B63", textAlign: "center", marginBottom: 28, maxWidth: 320 },
  button: { backgroundColor: "#21B573", borderRadius: 16, paddingVertical: 14, paddingHorizontal: 36, borderBottomWidth: 4, borderBottomColor: "#178A57" },
  buttonText: { color: "#FFFFFF", fontSize: 17, fontWeight: "800", letterSpacing: 0.5 }
});
