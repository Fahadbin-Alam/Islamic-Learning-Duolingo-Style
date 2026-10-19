import AsyncStorage from "@react-native-async-storage/async-storage";

// Synchronous key/value store for saved progress, accounts and settings.
// Values live in memory and are written through to AsyncStorage, which maps to
// device storage on Android/iOS and to localStorage on web. Call
// hydrateAppStorage() once before the app reads anything so the cache holds
// what was saved in earlier sessions.

const STORAGE_KEYS = [
  "sira-path-user-profile",
  "sira-path-account-profile",
  "sira-path-local-auth",
  "sira-path-social-hub",
  "sira-path-session-token",
  "sira-path-islamic-reminder-history",
  "sira-path-sandbox-premium"
] as const;

type StorageKey = (typeof STORAGE_KEYS)[number];

const cache = new Map<StorageKey, string>();
let hydration: Promise<void> | null = null;

export function hydrateAppStorage() {
  if (!hydration) {
    hydration = AsyncStorage.multiGet([...STORAGE_KEYS])
      .then((entries) => {
        for (const [key, value] of entries) {
          // A write made while hydration was in flight is newer than the stored copy.
          if (value !== null && !cache.has(key as StorageKey)) {
            cache.set(key as StorageKey, value);
          }
        }
      })
      .catch(() => undefined);
  }

  return hydration;
}

export function getStoredItem(key: StorageKey) {
  return cache.get(key) ?? null;
}

export function setStoredItem(key: StorageKey, value: string) {
  cache.set(key, value);
  void AsyncStorage.setItem(key, value).catch(() => undefined);
}

export function removeStoredItem(key: StorageKey) {
  cache.delete(key);
  void AsyncStorage.removeItem(key).catch(() => undefined);
}
