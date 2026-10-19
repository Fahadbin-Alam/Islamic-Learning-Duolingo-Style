import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { GameButton } from "../GameButton";
import { Sheet } from "../Sheet";
import { colors, fonts, radii, space } from "../theme";
// Sign up / log in, as a sheet inside the phone column.
import { MascotSays, SegmentButton, useBackToClose } from "./sheetParts";

export type AccountSheetProps = {
  visible: boolean;
  mode: "create" | "login";
  mascotVariant: string;
  name: string;
  email: string;
  password: string;
  /** Sign-in providers that are switched on (Google, Facebook). */
  socialProviders?: Array<{ id: string; label: string }>;
  onChangeMode: (mode: "create" | "login") => void;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
  onSocial?: (providerId: string) => void;
  onClose: () => void;
};

export function AccountSheet({
  visible,
  mode,
  mascotVariant,
  name,
  email,
  password,
  socialProviders = [],
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

  return (
    <Sheet visible={visible} onClose={onClose} style={styles.tallPanel} testID="account-sheet">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} contentContainerStyle={styles.stack}>
          <MascotSays variant={mascotVariant} mood="wave" line={creating ? "Save your progress!" : "Welcome back!"} />
          <View style={styles.segments}>
            <SegmentButton label="Sign up" active={creating} onPress={() => onChangeMode("create")} testID="account-mode-create" />
            <SegmentButton label="Log in" active={!creating} onPress={() => onChangeMode("login")} testID="account-mode-login" />
          </View>
          {creating ? (
            <TextInput
              value={name}
              onChangeText={onChangeName}
              placeholder="Your name"
              placeholderTextColor={colors.inkSoft}
              style={styles.input}
              accessibilityLabel="Your name"
              testID="account-name"
            />
          ) : null}
          <TextInput
            value={email}
            onChangeText={onChangeEmail}
            placeholder="Email"
            placeholderTextColor={colors.inkSoft}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            style={styles.input}
            accessibilityLabel="Email"
            testID="account-email"
          />
          <TextInput
            value={password}
            onChangeText={onChangePassword}
            placeholder="Password"
            placeholderTextColor={colors.inkSoft}
            autoCapitalize="none"
            secureTextEntry
            style={styles.input}
            accessibilityLabel="Password"
            testID="account-password"
          />
          <GameButton label={creating ? "Create account" : "Log in"} fullWidth onPress={onSubmit} testID="account-submit" />
          {socialProviders.map((provider) => (
            <GameButton
              key={provider.id}
              label={provider.label}
              variant="white"
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
  input: {
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: colors.line,
    backgroundColor: colors.mist,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.ink,
    minWidth: 0
  }
});
