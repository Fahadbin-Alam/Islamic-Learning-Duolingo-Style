import React, { useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, type TextInput } from "react-native";
import { GameButton } from "../GameButton";
import { Sheet } from "../Sheet";
import { playUi, haptic } from "../sound";
import { colors, space, text } from "../theme";
// Sign up / log in, as a sheet inside the phone column.
import { MascotSays, SegmentButton, TextField, useBackToClose } from "./sheetParts";

export type AccountSheetProps = {
  visible: boolean;
  mode: "create" | "login";
  mascotVariant: string;
  /** Mascot color (topic accent). */
  accent?: string;
  name: string;
  email: string;
  password: string;
  /** Sign-in providers that are switched on (Google, Facebook). */
  socialProviders?: Array<{ id: string; label: string }>;
  /** Short line from the app after a failed submit ("Wrong email or password."). Shown above the button. */
  error?: string;
  onChangeMode: (mode: "create" | "login") => void;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  /** Called only when the fields pass the checks below (the sheet shows its own hints). */
  onSubmit: () => void;
  onSocial?: (providerId: string) => void;
  onClose: () => void;
};

type Field = "name" | "email" | "password";

/** Same rules as createAccount in src/TopicApp.tsx. */
export function checkAccountFields(mode: "create" | "login", name: string, email: string, password: string): { field: Field; hint: string } | undefined {
  if (mode === "create" && !name.trim()) return { field: "name", hint: "Add your name" };
  if (!email.trim()) return { field: "email", hint: "Add your email" };
  if (mode === "create" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) return { field: "email", hint: "Check your email" };
  if (!password.trim()) return { field: "password", hint: "Add a password" };
  if (mode === "create" && password.trim().length < 8) return { field: "password", hint: "Use 8 or more letters" };
  return undefined;
}

export function AccountSheet({
  visible,
  mode,
  mascotVariant,
  accent,
  name,
  email,
  password,
  socialProviders = [],
  error,
  onChangeMode,
  onChangeName,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onSocial,
  onClose
}: AccountSheetProps) {
  useBackToClose(visible, onClose);
  const creating = mode === "create";
  const [problem, setProblem] = useState<{ field: Field; hint: string } | undefined>(undefined);
  const [tries, setTries] = useState(0);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // A fresh start each time the sheet opens or the mode flips.
  useEffect(() => {
    setProblem(undefined);
  }, [mode, visible]);

  const submit = () => {
    const found = checkAccountFields(mode, name, email, password);
    if (found) {
      setProblem(found);
      setTries((count) => count + 1);
      // Wrong sound and a shake of the field instead of an alert box.
      playUi("wrong");
      haptic("error");
      return;
    }
    setProblem(undefined);
    playUi("soft_ui");
    onSubmit();
  };

  // Typing in the flagged field clears its hint.
  const edit = (field: Field, change: (value: string) => void) => (value: string) => {
    if (problem?.field === field) setProblem(undefined);
    change(value);
  };
  const hintFor = (field: Field) => (problem?.field === field ? problem.hint : undefined);

  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="account-sheet">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
          <MascotSays variant={mascotVariant} mood="wave" accent={accent} line={creating ? "Save your progress!" : "Welcome back!"} />
          <View style={styles.segments}>
            <SegmentButton label="Sign up" active={creating} onPress={() => onChangeMode("create")} testID="account-mode-create" />
            <SegmentButton label="Log in" active={!creating} onPress={() => onChangeMode("login")} testID="account-mode-login" />
          </View>
          {creating ? (
            <TextField
              value={name}
              onChangeText={edit("name", onChangeName)}
              placeholder="Your name"
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => emailRef.current?.focus()}
              error={hintFor("name")}
              shakeKey={tries}
              accessibilityLabel="Your name"
              testID="account-name"
            />
          ) : null}
          <TextField
            ref={emailRef}
            value={email}
            onChangeText={edit("email", onChangeEmail)}
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={hintFor("email")}
            shakeKey={tries}
            accessibilityLabel="Email"
            testID="account-email"
          />
          <TextField
            ref={passwordRef}
            value={password}
            onChangeText={edit("password", onChangePassword)}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="go"
            onSubmitEditing={submit}
            error={hintFor("password")}
            shakeKey={tries}
            accessibilityLabel="Password"
            testID="account-password"
          />
          {error && !problem ? (
            <Text style={styles.error} accessibilityLiveRegion="polite" testID="account-error">
              {error}
            </Text>
          ) : null}
          <GameButton label={creating ? "Sign up" : "Log in"} fullWidth onPress={submit} sound={false} testID="account-submit" />
          {socialProviders.map((provider) => (
            <GameButton
              key={provider.id}
              label={provider.label}
              variant="secondary"
              color={colors.ink}
              fullWidth
              onPress={() => onSocial?.(provider.id)}
              testID={`account-social-${provider.id}`}
            />
          ))}
          <GameButton label="Later" variant="ghost" fullWidth onPress={onClose} testID="account-later" />
        </ScrollView>
      </KeyboardAvoidingView>
    </Sheet>
  );
}

const styles = StyleSheet.create({
  tallPanel: {
    maxHeight: "92%"
  },
  stack: {
    gap: space.md,
    paddingBottom: space.xs
  },
  segments: {
    flexDirection: "row",
    gap: space.sm
  },
  error: {
    ...text.bodyBold,
    fontSize: 15,
    color: colors.wrongInk,
    textAlign: "center"
  }
});
