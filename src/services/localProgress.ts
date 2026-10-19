import type { FoundationAssessmentState, UserProfile } from "../types";
import { getStoredItem, setStoredItem, removeStoredItem } from "./appStorage";

const STORAGE_KEY = "sira-path-user-profile";
// Progress of an account that logged out on this device, kept until it logs back in.
const ACCOUNT_STORAGE_KEY = "sira-path-account-profile";
// A practice session (level check, review, daily challenge) still running, so a reload picks it up again.
const ASSESSMENT_STORAGE_KEY = "sira-path-active-assessment";

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

// `owner` is the account email, or "guest": a session never resumes for someone else on this device.
export function saveActiveAssessment(owner: string, assessment: FoundationAssessmentState) {
  setStoredItem(ASSESSMENT_STORAGE_KEY, JSON.stringify({ owner, assessment }));
}

export function loadActiveAssessment(owner: string): FoundationAssessmentState | null {
  try {
    const raw = getStoredItem(ASSESSMENT_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as { owner?: string; assessment?: FoundationAssessmentState };
    const assessment = parsed.assessment;

    if (parsed.owner !== owner || !assessment?.currentQuestion?.id || !assessment.mode || !Array.isArray(assessment.answerHistory)) {
      return null;
    }

    return assessment;
  } catch {
    return null;
  }
}

export function clearActiveAssessment() {
  removeStoredItem(ASSESSMENT_STORAGE_KEY);
}
