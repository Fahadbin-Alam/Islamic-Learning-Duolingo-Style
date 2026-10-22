import { Platform } from "react-native";
import { GOOGLE_SIGN_IN_CONFIG } from "../config/auth";
import { readTokenClaims, type SocialSignInResult } from "./socialAuthShared";

export type { SocialIdentity, SocialSignInResult } from "./socialAuthShared";

// The native SDKs load on first use, so a build or test without them still starts.
type GoogleSigninModule = typeof import("@react-native-google-signin/google-signin");
type AppleAuthModule = typeof import("expo-apple-authentication");

let googleModule: GoogleSigninModule | null | undefined;
let googleConfigured = false;

function loadGoogle() {
  if (googleModule === undefined) {
    try {
      googleModule = require("@react-native-google-signin/google-signin") as GoogleSigninModule;
    } catch {
      googleModule = null;
    }
  }
  return googleModule;
}

function loadApple() {
  try {
    return require("expo-apple-authentication") as AppleAuthModule;
  } catch {
    return null;
  }
}

// Google needs the web client id to hand back an id token, and iOS also needs its own client id.
export function isGoogleSignInAvailable() {
  const { webClientId, iosClientId } = GOOGLE_SIGN_IN_CONFIG;
  return Boolean(webClientId && (Platform.OS !== "ios" || iosClientId));
}

export async function isAppleSignInAvailable() {
  if (Platform.OS !== "ios") {
    return false;
  }

  try {
    return (await loadApple()?.isAvailableAsync()) ?? false;
  } catch {
    return false;
  }
}

export async function signInWithGoogle(): Promise<SocialSignInResult> {
  const google = loadGoogle();

  if (!google || !isGoogleSignInAvailable()) {
    return { status: "unavailable" };
  }

  const { GoogleSignin, isErrorWithCode, statusCodes } = google;

  try {
    if (!googleConfigured) {
      GoogleSignin.configure({
        webClientId: GOOGLE_SIGN_IN_CONFIG.webClientId,
        iosClientId: GOOGLE_SIGN_IN_CONFIG.iosClientId || undefined
      });
      googleConfigured = true;
    }

    if (Platform.OS === "android") {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    }

    const response = await GoogleSignin.signIn();

    if (response.type !== "success") {
      return { status: "cancelled" };
    }

    const { idToken, user } = response.data;
    const subject = String(readTokenClaims(idToken ?? "")?.sub ?? user.id);

    if (!idToken || !user.email) {
      return { status: "error", message: "Google did not share an email." };
    }

    return {
      status: "ok",
      identity: { provider: "google", subject, email: user.email, name: user.name ?? user.givenName ?? undefined, idToken }
    };
  } catch (error) {
    if (isErrorWithCode(error) && (error.code === statusCodes.SIGN_IN_CANCELLED || error.code === statusCodes.IN_PROGRESS)) {
      return { status: "cancelled" };
    }
    if (isErrorWithCode(error) && error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return { status: "error", message: "Google Play services are missing." };
    }
    return { status: "error", message: error instanceof Error ? error.message : "Google sign-in failed." };
  }
}

export async function signInWithApple(): Promise<SocialSignInResult> {
  const apple = loadApple();

  if (!apple || !(await isAppleSignInAvailable())) {
    return { status: "unavailable" };
  }

  try {
    const credential = await apple.signInAsync({
      requestedScopes: [apple.AppleAuthenticationScope.FULL_NAME, apple.AppleAuthenticationScope.EMAIL]
    });
    const idToken = credential.identityToken;
    const claims = readTokenClaims(idToken ?? "");
    // The token always carries the email (a private relay address if the person hid theirs).
    const email = credential.email ?? (typeof claims?.email === "string" ? claims.email : "");

    if (!idToken || !email) {
      return { status: "error", message: "Apple did not share an email." };
    }

    const name = [credential.fullName?.givenName, credential.fullName?.familyName].filter(Boolean).join(" ") || undefined;
    return { status: "ok", identity: { provider: "apple", subject: credential.user, email, name, idToken } };
  } catch (error) {
    if ((error as { code?: string } | undefined)?.code === "ERR_REQUEST_CANCELED") {
      return { status: "cancelled" };
    }
    return { status: "error", message: error instanceof Error ? error.message : "Apple sign-in failed." };
  }
}

// Logging out also forgets the Google account, so the next tap shows the account picker again.
export async function signOutOfProviders() {
  const google = loadGoogle();

  if (!google || !googleConfigured) {
    return;
  }

  try {
    await google.GoogleSignin.signOut();
  } catch {
    // Already signed out.
  }
}
