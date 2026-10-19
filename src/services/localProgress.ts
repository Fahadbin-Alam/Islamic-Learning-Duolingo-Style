import type { UserProfile } from "../types";
import { getStoredItem, setStoredItem, removeStoredItem } from "./appStorage";

const STORAGE_KEY = "sira-path-user-profile";
// Progress of an account that logged out on this device, kept until it logs back in.
const ACCOUNT_STORAGE_KEY = "sira-path-account-profile";

export function loadSavedUserProfile(): UserProfile | null {
  try {
    const raw = getStoredItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveUserProfile(user: UserProfile) {
  setStoredItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearSavedUserProfile() {
  removeStoredItem(STORAGE_KEY);
}

export function stashAccountProfile(email: string, user: UserProfile) {
  setStoredItem(ACCOUNT_STORAGE_KEY, JSON.stringify({ email: email.trim().toLowerCase(), user }));
}

// Hands back the stashed progress of this email once, then forgets it.
export function takeAccountProfile(email: string): UserProfile | null {
  try {
    const raw = getStoredItem(ACCOUNT_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as { email?: string; user?: UserProfile };

    if (parsed.email !== email.trim().toLowerCase() || !parsed.user) {
      return null;
    }

    removeStoredItem(ACCOUNT_STORAGE_KEY);
    return parsed.user;
  } catch {
    return null;
  }
}

export function clearAccountProfile() {
  removeStoredItem(ACCOUNT_STORAGE_KEY);
}
