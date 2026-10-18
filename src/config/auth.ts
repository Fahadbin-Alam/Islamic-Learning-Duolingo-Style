type SocialAuthProviderConfig = {
  enabled: boolean;
  label: string;
  clientId?: string;
  webClientId?: string;
  iosClientId?: string;
  androidClientId?: string;
  appId?: string;
};

const env = typeof process !== "undefined" ? ((process as { env?: Record<string, string | undefined> }).env ?? {}) : {};

function readEnv(name: string) {
  return env[name]?.trim() ?? "";
}

function isConfigured(value?: string) {
  return Boolean(value && !value.startsWith("ADD_"));
}

// The Google/Facebook redirect flow and backend token check are not built yet (the API answers 501),
// so the buttons stay hidden even when ids are set. Turning them on for iOS also requires Sign in with Apple.
const SOCIAL_SIGN_IN_READY = false;

const googleClientId = readEnv("EXPO_PUBLIC_GOOGLE_CLIENT_ID");
const googleWebClientId = readEnv("EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID");
const googleIosClientId = readEnv("EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID");
const googleAndroidClientId = readEnv("EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID");
const facebookAppId = readEnv("EXPO_PUBLIC_FACEBOOK_APP_ID");

export const SOCIAL_AUTH_CONFIG: Record<"google" | "facebook", SocialAuthProviderConfig> = {
  google: {
    enabled: SOCIAL_SIGN_IN_READY && [googleClientId, googleWebClientId, googleIosClientId, googleAndroidClientId].some((value) => isConfigured(value)),
    label: "Continue with Google",
    clientId: googleClientId || undefined,
    webClientId: googleWebClientId || googleClientId || undefined,
    iosClientId: googleIosClientId || googleClientId || undefined,
    androidClientId: googleAndroidClientId || googleClientId || undefined
  },
  facebook: {
    enabled: SOCIAL_SIGN_IN_READY && isConfigured(facebookAppId),
    label: "Continue with Facebook",
    appId: facebookAppId || undefined,
    clientId: facebookAppId || undefined,
    webClientId: facebookAppId || undefined,
    iosClientId: facebookAppId || undefined,
    androidClientId: facebookAppId || undefined
  }
} as const;

export const SOCIAL_AUTH_SETUP = {
  google: [
    "EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID",
    "EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID",
    "EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID"
  ],
  facebook: [
    "EXPO_PUBLIC_FACEBOOK_APP_ID"
  ]
} as const;
