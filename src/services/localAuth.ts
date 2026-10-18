import type { AccountRole, AuthProvider, ReminderPreferences, SupportedLanguage } from "../types";
import { sha256Hex } from "../utils/sha256";
import { getStoredItem, setStoredItem, removeStoredItem } from "./appStorage";

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
const HASH_PREFIX = "sha256:";
const HASH_ROUNDS = 2000;

// Stored as "sha256:<salt>:<digest>" so the saved account never holds the password itself.
export function hashLocalPassword(password: string, salt = makeSalt()) {
  let digest = `${salt}:${password}`;
  for (let round = 0; round < HASH_ROUNDS; round += 1) {
    digest = sha256Hex(`${digest}:${password}`);
  }
  return `${HASH_PREFIX}${salt}:${digest}`;
}

function matchesStoredPassword(stored: string | undefined, password: string) {
  if (!stored) {
    return false;
  }

  if (!stored.startsWith(HASH_PREFIX)) {
    // Accounts saved by earlier versions kept the raw password.
    return stored === password;
  }

  const salt = stored.slice(HASH_PREFIX.length).split(":")[0];
  return hashLocalPassword(password, salt) === stored;
}

function makeSalt() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 0x100000000).toString(16).padStart(8, "0")).join("");
}

export function loadLocalAuthAccount(): LocalAuthAccount | null {
  try {
    const raw = getStoredItem(STORAGE_KEY);

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
    email: account.email.trim().toLowerCase(),
    password: account.password && !account.password.startsWith(HASH_PREFIX) ? hashLocalPassword(account.password) : account.password
  };

  setStoredItem(STORAGE_KEY, JSON.stringify(normalizedAccount));
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

  if (account.email.toLowerCase() !== email.trim().toLowerCase() || !matchesStoredPassword(account.password, password)) {
    return null;
  }

  if (account.password && !account.password.startsWith(HASH_PREFIX)) {
    return createLocalAuthAccount({ ...account, password });
  }

  return account;
}

export function clearLocalAuthAccount() {
  removeStoredItem(STORAGE_KEY);
}
