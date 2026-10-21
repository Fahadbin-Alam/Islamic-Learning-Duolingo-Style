import React, { useEffect, useRef, useState } from "react";
import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, type TextInput } from "react-native";
import { GameButton } from "../GameButton";
import { PopIn, useShake } from "../PopIn";
import { Sheet } from "../Sheet";
import { playUi, haptic } from "../sound";
import { colors, space, text } from "../theme";
import { GrownUpCheck } from "./GrownUpGate";
// Sign up / log in, as a sheet inside the phone column.
import { MascotSays, SegmentButton, TextField, useBackToClose } from "./sheetParts";
import { t } from "../../i18n";

export type AccountSheetProps = {
  visible: boolean;
  /** "create" asks a grown-up first (Kids category): the form shows once the sum is answered. */
  mode: "create" | "login";
  mascotVariant: string;
  /** Mascot color (topic accent). */
  accent?: string;
  name: string;
  email: string;
  password: string;
  /** Sign-in providers that are switched on (Google, Facebook). */
  socialProviders?: Array<{ id: string; label: string }>;
  /**
   * The age screen said 12 or under: a parent signs up with their own name and email (COPPA), so the
   * fields ask for the parent's and nothing about the child is collected.
   */
  forChild?: boolean;
  /**
   * Short line from the app after a failed submit ("Wrong email or password."). Shown above the
   * button with the wrong sound, a haptic and a shake, like a field hint.
   */
  error?: string;
  /** Bump on each failed submit so the same error plays its feedback again. */
  errorKey?: number;
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
  if (mode === "create" && !name.trim()) return { field: "name", hint: t("Add your name") };
  if (!email.trim()) return { field: "email", hint: t("Add your email") };
  if (mode === "create" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase())) return { field: "email", hint: t("Check your email") };
  if (!password.trim()) return { field: "password", hint: t("Add a password") };
  if (mode === "create" && password.trim().length < 8) return { field: "password", hint: t("Use 8 or more letters") };
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
  forChild = false,
  error,
  errorKey = 0,
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
  const { style: errorShake, shake: shakeError } = useShake(6);
  // Signing up asks for a name and an email, so a grown-up answers the gate first, once per opening.
  const [grownUp, setGrownUp] = useState(false);
  const gated = creating && !grownUp;

  // A fresh start each time the sheet opens or the mode flips.
  useEffect(() => {
    setProblem(undefined);
  }, [mode, visible]);
  useEffect(() => {
    if (!visible) setGrownUp(false);
  }, [visible]);

  // A failed log in or sign up feels the same as a field hint: wrong sound, haptic and a shake.
  // Only a new error (or a bumped errorKey) plays it, not reopening the sheet over an old one.
  const lastError = useRef(error ? `${errorKey}:${error}` : "");
  useEffect(() => {
    const next = error ? `${errorKey}:${error}` : "";
    if (next === lastError.current) return;
    lastError.current = next;
    if (!visible || !error) return;
    playUi("wrong");
    haptic("error");
    shakeError();
  }, [error, errorKey, shakeError, visible]);

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
          <MascotSays variant={mascotVariant} mood="wave" accent={accent} line={creating ? (forChild ? t("A parent signs up for you!") : t("Save your progress!")) : t("Welcome back!")} />
          <View style={styles.segments}>
            <SegmentButton label={t("Sign up")} active={creating} onPress={() => onChangeMode("create")} testID="account-mode-create" />
            <SegmentButton label={t("Log in")} active={!creating} onPress={() => onChangeMode("login")} testID="account-mode-login" />
          </View>
          {gated ? (
            <View testID="account-grownup">
              <GrownUpCheck onPass={() => setGrownUp(true)} />
            </View>
          ) : (
            // The form pops in once the grown-up has answered (or straight away for Log in).
            <PopIn key={creating ? "create" : "login"} from="up" style={styles.form}>
              {creating ? (
                <TextField
                  value={name}
                  onChangeText={edit("name", onChangeName)}
                  placeholder={forChild ? t("Parent's name") : t("Your name")}
                  returnKeyType="next"
                  submitBehavior="submit"
                  onSubmitEditing={() => emailRef.current?.focus()}
                  error={hintFor("name")}
                  shakeKey={tries}
                  accessibilityLabel={forChild ? t("Parent's name") : t("Your name")}
                  testID="account-name"
                />
              ) : null}
              <TextField
                ref={emailRef}
                value={email}
                onChangeText={edit("email", onChangeEmail)}
                placeholder={forChild && creating ? t("Parent's email") : t("Email")}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                submitBehavior="submit"
                onSubmitEditing={() => passwordRef.current?.focus()}
                error={hintFor("email")}
                shakeKey={tries}
                accessibilityLabel={forChild && creating ? t("Parent's email") : t("Email")}
                testID="account-email"
              />
              <TextField
                ref={passwordRef}
                value={password}
                onChangeText={edit("password", onChangePassword)}
                placeholder={t("Password")}
                autoCapitalize="none"
                secureTextEntry
                returnKeyType="go"
                onSubmitEditing={submit}
                error={hintFor("password")}
                shakeKey={tries}
                accessibilityLabel={t("Password")}
                testID="account-password"
              />
              {error && !problem ? (
                <Animated.View style={errorShake}>
                  <Text style={styles.error} accessibilityLiveRegion="polite" testID="account-error">
                    {error}
                  </Text>
                </Animated.View>
              ) : null}
              <GameButton label={creating ? t("Sign up") : t("Log in")} fullWidth onPress={submit} sound={false} testID="account-submit" />
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
            </PopIn>
          )}
          <GameButton label={t("Later")} variant="ghost" fullWidth onPress={onClose} testID="account-later" />
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
  form: {
    gap: space.md
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
