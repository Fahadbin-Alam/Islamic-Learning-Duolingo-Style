// Release builds get their API address from EXPO_PUBLIC_API_BASE_URL (set per profile in eas.json).
// Without one, a release build stays fully offline instead of calling localhost on the learner's phone.
const configuredBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, "") ?? "";
const isDevelopment = typeof __DEV__ !== "undefined" && __DEV__;

export const BACKEND_CONFIG = {
  baseUrl: configuredBaseUrl || (isDevelopment ? "http://localhost:8000" : ""),
  requestTimeoutMs: 12000
} as const;
