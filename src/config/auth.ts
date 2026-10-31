// Expo inlines EXPO_PUBLIC_* values only where the code says `process.env.EXPO_PUBLIC_NAME` literally,
// so each id is read by name here; a lookup like env[name] comes back empty in a release build.
function clean(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  // Placeholders from .env.example ("ADD_...") count as not set.
  return trimmed.startsWith("ADD_") ? "" : trimmed;
}

/**
 * Google sign-in ids from the Google Cloud console (APIs & Services > Credentials). The web client id
 * is the one the id token is issued for, so the app and the backend both use it. Android needs an
 * Android client registered with the package name and the Play signing SHA-1, but no id in the app.
 * iOS needs its own client id. Sign in with Apple needs no ids: it shows on iOS next to Google.
 */
export const GOOGLE_SIGN_IN_CONFIG = {
  webClientId: clean(process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID),
  iosClientId: clean(process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID)
} as const;
