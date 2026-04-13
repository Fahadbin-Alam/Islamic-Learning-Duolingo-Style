import type {
  BattleResult,
  SocialConnection,
  SocialHubState,
  SocialRelation,
  UserProfile
} from "../types";

const STORAGE_KEY = "sira-path-social-hub";

const EMPTY_SOCIAL_STATE: SocialHubState = {
  connections: [],
  battleHistory: []
};

export function loadSocialHubState(): SocialHubState {
  if (typeof window === "undefined" || !window.localStorage) {
    return EMPTY_SOCIAL_STATE;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return EMPTY_SOCIAL_STATE;
    }

    const parsed = JSON.parse(raw) as SocialHubState;
    return {
      connections: (parsed.connections ?? []).map((connection) => ({
        ...connection,
        connectedWithAccount: connection.connectedWithAccount ?? Boolean(connection.email),
        reminderPreferences: connection.reminderPreferences ?? {
          dailyInactivity: true,
          weeklyInactivity: true
        }
      })),
      battleHistory: parsed.battleHistory ?? []
    };
  } catch {
    return EMPTY_SOCIAL_STATE;
  }
}

export function saveSocialHubState(state: SocialHubState) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearSocialHubState() {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function createSocialConnection(input: {
  name: string;
  relation: SocialRelation;
  email?: string;
  connectedWithAccount?: boolean;
  existingCount: number;
}): SocialConnection {
  const createdAt = new Date().toISOString();
  const bias = input.relation === "parent" ? 18 : 10;
  const level = input.existingCount + 1;

  return {
    id: `connection_${Date.now()}_${Math.round(Math.random() * 1000)}`,
    name: input.name.trim(),
    relation: input.relation,
    email: input.email?.trim() || undefined,
    connectedWithAccount: input.connectedWithAccount ?? Boolean(input.email?.trim()),
    reminderPreferences: {
      dailyInactivity: true,
      weeklyInactivity: true
    },
    avatarInitials: getInitials(input.name),
    totalXp: 36 + bias + level * 12,
    streakDays: 2 + level,
    stars: 4 + level + (input.relation === "parent" ? 1 : 0),
    wins: 0,
    losses: 0,
    lastActiveAt: createdAt
  };
}

export function runBattle(input: {
  user: UserProfile;
  userStars: number;
  opponent: SocialConnection;
}): { updatedConnection: SocialConnection; result: BattleResult } {
  const now = new Date().toISOString();
  const userScore = getSocialScore({
    totalXp: input.user.totalXp,
    streakDays: input.user.streakDays,
    stars: input.userStars,
    wins: 0
  }) + Math.floor(Math.random() * 18);
  const opponentScore = getSocialScore(input.opponent) + Math.floor(Math.random() * 18);
  const winner = userScore >= opponentScore ? "user" : "opponent";

  const updatedConnection: SocialConnection = {
    ...input.opponent,
    wins: input.opponent.wins + (winner === "opponent" ? 1 : 0),
    losses: input.opponent.losses + (winner === "user" ? 1 : 0),
    totalXp: input.opponent.totalXp + 6 + Math.floor(Math.random() * 10),
    stars: input.opponent.stars + (winner === "opponent" ? 1 : 0),
    lastActiveAt: now
  };

  const result: BattleResult = {
    id: `battle_${Date.now()}_${Math.round(Math.random() * 1000)}`,
    opponentId: input.opponent.id,
    opponentName: input.opponent.name,
    opponentRelation: input.opponent.relation,
    myScore: userScore,
    theirScore: opponentScore,
    winner,
    createdAt: now
  };

  return {
    updatedConnection,
    result
  };
}

export function getSocialScore(member: {
  totalXp: number;
  streakDays: number;
  stars: number;
  wins: number;
}) {
  return member.totalXp + member.streakDays * 14 + member.stars * 9 + member.wins * 16;
}

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "SP"
  );
}
