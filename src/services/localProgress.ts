import type { UserProfile } from "../types";
import { getStoredItem, setStoredItem, removeStoredItem } from "./appStorage";

const STORAGE_KEY = "sira-path-user-profile";

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
