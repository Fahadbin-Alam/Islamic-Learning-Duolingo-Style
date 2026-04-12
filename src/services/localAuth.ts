export interface LocalAuthAccount {
  name: string;
  email: string;
  password: string;
  createdAt: string;
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

    return JSON.parse(raw) as LocalAuthAccount;
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
