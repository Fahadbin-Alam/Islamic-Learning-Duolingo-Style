// Release builds get their API address from EXPO_PUBLIC_API_BASE_URL (set with `eas env:create`).
// Without one, a release build stays fully offline instead of calling localhost on the learner's phone.
// Expo only inlines EXPO_PUBLIC_* values read as a plain `process.env.NAME` expression.
const rawBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL;
const configuredBaseUrl = (rawBaseUrl ?? "").trim().replace(/\/+$/, "");
const isDevelopment = typeof __DEV__ !== "undefined" && __DEV__;

export const BACKEND_CONFIG = {
  baseUrl: configuredBaseUrl || (isDevelopment ? "http://localhost:8000" : ""),
  // The free server sleeps when nobody has used it for a while and takes up to a minute to wake, so a slow answer
  // is waited for. A phone with no internet fails at once and never waits this long.
  requestTimeoutMs: 30000,
  // Log in and sign up wait longer: giving up there would make a phone-only account instead of the real one.
  authTimeoutMs: 60000
} as const;
