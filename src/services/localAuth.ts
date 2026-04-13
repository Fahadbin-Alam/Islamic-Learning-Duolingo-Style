import type { AccountRole, AuthProvider, ReminderPreferences, SupportedLanguage } from "../types";

export interface LocalAuthAccount {
  name: string;
  email: string;
  password?: string;
  provider?: AuthProvider;
  createdAt: string;
  role?: AccountRole;
  reminderPreferences?: ReminderPreferences;
  preferredLanguage?: SupportedLanguage;
}

const STORAGE_KEY = "sira-path-local-auth";

export function loadLocalAuthAccount(): LocalAuthAccount | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<LocalAuthAccount>;

    if (!parsed.name || !parsed.email || !parsed.createdAt) {
      return null;
    }

    return {
      name: parsed.name,
      email: parsed.email,
      password: parsed.password,
      provider: parsed.provider,
      createdAt: parsed.createdAt,
      role: parsed.role,
      reminderPreferences: parsed.reminderPreferences,
      preferredLanguage: parsed.preferredLanguage
    };
  } catch {
    return null;
  }
}

export function createLocalAuthAccount(account: LocalAuthAccount) {
  const normalizedAccount = {
    ...account,
    email: account.email.trim().toLowerCase()
  };

  if (typeof window === "undefined" || !window.localStorage) {
    return normalizedAccount;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedAccount));
  return normalizedAccount;
}

export function updateLocalAuthAccount(updates: Partial<Pick<LocalAuthAccount, "name" | "role" | "reminderPreferences" | "preferredLanguage" | "provider">>) {
  const current = loadLocalAuthAccount();

  if (!current) {
    return null;
  }

  return createLocalAuthAccount({
    ...current,
    ...updates
  });
}

export function loginLocalAuthAccount(email: string, password: string) {
  const account = loadLocalAuthAccount();

  if (!account) {
    return null;
  }

  if (account.email.toLowerCase() !== email.trim().toLowerCase() || account.password !== password) {
    return null;
  }

  return account;
}

export function clearLocalAuthAccount() {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
