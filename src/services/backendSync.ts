import { BACKEND_CONFIG } from "../config/backend";
import type {
  AccountRole,
  ReminderPreferences,
  SocialHubState,
  UserProfile
} from "../types";

const SESSION_KEY = "sira-path-session-token";

type RemoteAccount = {
  name: string;
  email: string;
  role?: AccountRole;
  createdAt: string;
  reminderPreferences?: ReminderPreferences;
};

type RemoteSessionPayload = {
  token?: string;
  account: RemoteAccount;
  user: UserProfile;
  socialHub: SocialHubState;
};

export async function hydrateRemoteSession() {
  const token = getSessionToken();

  if (!token) {
    return null;
  }

  try {
    const payload = await backendRequest<RemoteSessionPayload>("/api/session", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return {
      account: payload.account,
      user: payload.user,
      socialHub: payload.socialHub
    };
  } catch {
    clearSessionToken();
    return null;
  }
}

export async function registerRemoteAccount(input: {
  name: string;
  email: string;
  password: string;
  role?: AccountRole;
  reminderPreferences: ReminderPreferences;
  user: UserProfile;
  socialHub: SocialHubState;
}) {
  const payload = await backendRequest<RemoteSessionPayload>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input)
  });

  if (payload.token) {
    setSessionToken(payload.token);
  }

  return payload;
}

export async function loginRemoteAccount(input: { email: string; password: string }) {
  const payload = await backendRequest<RemoteSessionPayload>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(input)
  });

  if (payload.token) {
    setSessionToken(payload.token);
  }

  return payload;
}

export async function syncRemoteUser(user: UserProfile) {
  const token = getSessionToken();

  if (!token || !user.hasAccount) {
    return;
  }

  await backendRequest("/api/me/user", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ user })
  });
}

export async function syncRemoteSocialHub(socialHub: SocialHubState) {
  const token = getSessionToken();

  if (!token) {
    return;
  }

  await backendRequest("/api/me/social", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ socialHub })
  });
}

export function getSessionToken() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  return window.localStorage.getItem(SESSION_KEY);
}

export function setSessionToken(token: string) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(SESSION_KEY, token);
}

export function clearSessionToken() {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}

async function backendRequest<T = unknown>(path: string, options?: RequestInit) {
  const response = await fetch(`${BACKEND_CONFIG.baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {})
    }
  });

  if (!response.ok) {
    const errorBody = await safeJson(response);
    throw new Error(typeof errorBody?.error === "string" ? errorBody.error : `Backend request failed with ${response.status}`);
  }

  return safeJson(response) as Promise<T>;
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
