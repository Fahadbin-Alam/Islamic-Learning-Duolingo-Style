import { BACKEND_CONFIG } from "../config/backend";
import type {
  AccountRole,
  AuthProvider,
  ReminderPreferences,
  SocialHubState,
  SocialRelation,
  UmmahState,
  UserProfile
} from "../types";
import { getStoredItem, setStoredItem, removeStoredItem } from "./appStorage";
import type { UmmahRankings } from "./ummah";

const SESSION_KEY = "sira-path-session-token";
// Set while this phone has progress the server has not taken yet (made offline, or the send failed).
const PENDING_SYNC_KEY = "sira-path-pending-sync";

type RemoteAccount = {
  name: string;
  email: string;
  provider?: AuthProvider;
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

export type RemoteSubscriptionPlan = {
  id: string;
  title: string;
  price: number;
  interval: string;
  badge?: string | null;
  entitlementName: string;
  benefits: string[];
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
  } catch (error) {
    // Only a rejected token signs the learner out; being offline keeps the saved session.
    if (error instanceof BackendRequestError && error.status === 401) {
      clearSessionToken();
    }
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
    timeoutMs: BACKEND_CONFIG.authTimeoutMs,
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
    timeoutMs: BACKEND_CONFIG.authTimeoutMs,
    body: JSON.stringify(input)
  });

  if (payload.token) {
    setSessionToken(payload.token);
  }

  return payload;
}

export async function socialLoginRemoteAccount(input: {
  provider: Exclude<AuthProvider, "password">;
  idToken: string;
  name?: string;
  /** False from the Log in tab: the server answers 404 instead of making a new account. */
  allowCreate: boolean;
  role?: AccountRole;
  reminderPreferences: ReminderPreferences;
  user: UserProfile;
  socialHub: SocialHubState;
}) {
  const payload = await backendRequest<RemoteSessionPayload>("/api/auth/social", {
    method: "POST",
    timeoutMs: BACKEND_CONFIG.authTimeoutMs,
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

  // Marked first, so an app closed mid-send still knows the server may be behind.
  setStoredItem(PENDING_SYNC_KEY, "1");
  try {
    await backendRequest("/api/me/user", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ user })
    });
  } catch (error) {
    // Set again: an older send that finished meanwhile may have cleared it.
    setStoredItem(PENDING_SYNC_KEY, "1");
    throw error;
  }
  removeStoredItem(PENDING_SYNC_KEY);
}

/** True while progress made on this phone (often offline) still has to reach the server. */
export function hasPendingSync() {
  return getStoredItem(PENDING_SYNC_KEY) === "1";
}

/**
 * Which copy of the learner to start from. The server's copy, unless this phone has progress the server never
 * got (lessons done offline): then the phone's own copy of the same learner wins, and is sent once online.
 */
export function pickStartingUser<T extends { id: number | string }>(remote: T | undefined, saved: T | null | undefined) {
  if (remote && saved && hasPendingSync() && String(saved.id) === String(remote.id)) {
    return saved;
  }
  return remote ?? saved ?? undefined;
}

export async function logoutRemoteAccount() {
  const token = getSessionToken();

  if (!token) {
    clearSessionToken();
    return;
  }

  try {
    await backendRequest("/api/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } finally {
    clearSessionToken();
  }
}

export async function deleteRemoteAccount() {
  const token = getSessionToken();

  if (!token) {
    return;
  }

  await backendRequest("/api/profile/me", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  clearSessionToken();
}

export async function recordRemoteQuestionAttempt(input: {
  questionId: number;
  lessonId: number;
  selectedAnswerJson: Record<string, unknown>;
  isCorrect: boolean;
  responseTimeMs?: number;
  confidenceRating?: number;
  topicId?: number;
  branchId?: number;
}) {
  const token = getSessionToken();

  if (!token) {
    return;
  }

  await backendRequest(`/api/questions/${input.questionId}/attempts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(input)
  });
}

export async function completeRemoteLesson(input: {
  lessonSlug: string;
  status: string;
  masteryScore: number;
  xpEarned: number;
  bestScore: number;
}) {
  const token = getSessionToken();

  if (!token) {
    return;
  }

  await backendRequest(`/api/lessons/${input.lessonSlug}/completion`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(input)
  });
}

export async function fetchRemoteSubscriptionPlans() {
  return backendRequest<RemoteSubscriptionPlan[]>("/api/subscriptions/plans");
}

export async function syncSubscriptionEntitlement(input: {
  provider: string;
  providerCustomerId?: string;
  planType: string;
  status: string;
  startedAt?: string;
  expiresAt?: string;
  entitlementName: string;
}) {
  const token = getSessionToken();

  if (!token) {
    return;
  }

  await backendRequest("/api/subscriptions/sync", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(input)
  });
}

export type CrewMember = {
  id: number;
  name: string;
  avatarInitials: string;
  relation: "you" | SocialRelation;
  totalXp: number;
  weeklyXp: number;
  streakDays: number;
  lastLearningAt: string | null;
  /** Their league (index into LEAGUES in src/services/leagues.ts), for friends who added each other back. */
  league?: number;
  /** Not agreed yet: the server sends no learning stats, and for someone you added, only the email you typed. */
  pending?: boolean;
};

export type CrewPayload = {
  me: CrewMember;
  /** Both sides added each other: the weekly race. */
  friends: CrewMember[];
  /** People this learner added who have not added them back. */
  pending?: CrewMember[];
  /** People who added this learner and wait for a yes. */
  requests?: CrewMember[];
};

export function rankWeeklyRace(me: CrewMember, friends: CrewMember[]) {
  // Ties go to the learner, then to the bigger lifetime total.
  return [me, ...friends].sort((left, right) =>
    right.weeklyXp - left.weeklyXp ||
    Number(right.relation === "you") - Number(left.relation === "you") ||
    right.totalXp - left.totalXp
  );
}

function authHeaders() {
  const token = getSessionToken();

  if (!token) {
    throw new BackendRequestError("Log in to see your crew.", 401);
  }

  return { Authorization: `Bearer ${token}` };
}

// `today` is the learner's local date so the weekly race lines up with their own week.
export async function fetchCrew(today: string) {
  return backendRequest<CrewPayload>(`/api/friends?today=${encodeURIComponent(today)}`, { headers: authHeaders() });
}

export async function addCrewMember(input: { email: string; relation: SocialRelation; today: string }) {
  return backendRequest<CrewMember>(`/api/friends?today=${encodeURIComponent(input.today)}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email: input.email, relation: input.relation })
  });
}

export async function acceptCrewRequest(requesterId: number, today: string) {
  return backendRequest<CrewMember>(`/api/friends/requests/${requesterId}/accept?today=${encodeURIComponent(today)}`, {
    method: "POST",
    headers: authHeaders()
  });
}

export async function declineCrewRequest(requesterId: number) {
  await backendRequest(`/api/friends/requests/${requesterId}`, { method: "DELETE", headers: authHeaders() });
}

export async function removeCrewMember(friendId: number) {
  await backendRequest(`/api/friends/${friendId}`, { method: "DELETE", headers: authHeaders() });
}

/** Saves the learner's Ummah state (trophies, nickname, joined) and returns the ranking of everyone who joined. */
export async function fetchUmmahRankings(ummah: UmmahState) {
  return backendRequest<UmmahRankings>("/api/ummah/rankings", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ ummah })
  });
}

export function getSessionToken() {
  return getStoredItem(SESSION_KEY);
}

export function setSessionToken(token: string) {
  setStoredItem(SESSION_KEY, token);
}

export function clearSessionToken() {
  removeStoredItem(SESSION_KEY);
  removeStoredItem(PENDING_SYNC_KEY);
}

export class BackendRequestError extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
    this.name = "BackendRequestError";
  }
}

export function isBackendConfigured() {
  return Boolean(BACKEND_CONFIG.baseUrl);
}

/**
 * Wakes the server when the app opens, so it is awake by the time the learner logs in or opens Crew.
 * Fire and forget: it never throws.
 */
export function wakeBackend() {
  if (!isBackendConfigured()) {
    return;
  }

  void backendRequest("/api/health", { timeoutMs: BACKEND_CONFIG.authTimeoutMs }).catch(() => undefined);
}

async function backendRequest<T = unknown>(path: string, options?: RequestInit & { timeoutMs?: number }) {
  if (!isBackendConfigured()) {
    // Offline-only build: callers treat network errors as "keep working locally".
    throw new Error("Network unavailable: no backend is configured for this build.");
  }

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const { timeoutMs = BACKEND_CONFIG.requestTimeoutMs, ...requestOptions } = options ?? {};
  const timeout = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  let response: Response;

  try {
    response = await fetch(`${BACKEND_CONFIG.baseUrl}${path}`, {
      ...requestOptions,
      signal: controller?.signal,
      headers: {
        "Content-Type": "application/json",
        ...(requestOptions.headers ?? {})
      }
    });
  } catch (error) {
    throw new Error(controller?.signal.aborted ? "Network request timed out." : `Network request failed: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }

  if (!response.ok) {
    const errorBody = await safeJson(response);
    const detail = typeof errorBody?.error === "string" ? errorBody.error : typeof errorBody?.detail === "string" ? errorBody.detail : "";
    throw new BackendRequestError(detail || `Backend request failed with ${response.status}`, response.status);
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
