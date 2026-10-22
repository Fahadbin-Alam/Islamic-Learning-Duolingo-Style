const env = typeof process !== "undefined" ? ((process as { env?: Record<string, string | undefined> }).env ?? {}) : {};

function readEnv(name: string) {
  const value = env[name]?.trim() ?? "";
  // Placeholders from .env.example ("ADD_...") count as not set.
  return value.startsWith("ADD_") ? "" : value;
}

/**
 * Google sign-in ids from the Google Cloud console (APIs & Services > Credentials). The web client id
 * is the one the id token is issued for, so the app and the backend both use it. Android needs an
 * Android client registered with the package name and the Play signing SHA-1, but no id in the app.
 * iOS needs its own client id. Sign in with Apple needs no ids: it shows on iOS next to Google.
 */
export const GOOGLE_SIGN_IN_CONFIG = {
  webClientId: readEnv("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID"),
  iosClientId: readEnv("EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID")
} as const;
