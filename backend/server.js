"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const http = require("http");

const PORT = Number(process.env.SIRA_API_PORT || 4100);
const DB_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DB_DIR, "app-db.json");
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const EMPTY_DB = {
  users: [],
  sessions: []
};
const FOUNDATION_CATEGORY_IDS = [
  "shahadah",
  "salah",
  "taharah",
  "fasting",
  "zakat",
  "hajj",
  "iman",
  "manners",
  "quran",
  "seerah"
];
const FOUNDATION_PROGRESS_LABELS = [
  "New learner",
  "Basic foundation",
  "Growing student",
  "Strong foundation",
  "Ready for advanced topics"
];

bootstrapDb();

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);

    if (req.method === "GET" && url.pathname === "/api/health") {
      return sendJson(res, 200, { ok: true, service: "sira-path-api" });
    }

    if (req.method === "POST" && url.pathname === "/api/auth/register") {
      const body = await readJsonBody(req);
      return handleRegister(body, res);
    }

    if (req.method === "POST" && url.pathname === "/api/auth/login") {
      const body = await readJsonBody(req);
      return handleLogin(body, res);
    }

    if (req.method === "POST" && url.pathname === "/api/auth/social") {
      const body = await readJsonBody(req);
      return handleSocialLogin(body, res);
    }

    if (req.method === "POST" && url.pathname === "/api/auth/logout") {
      return handleLogout(req, res);
    }

    if (req.method === "GET" && url.pathname === "/api/session") {
      return handleSession(req, res);
    }

    if (req.method === "PUT" && url.pathname === "/api/me/user") {
      const body = await readJsonBody(req);
      return handleSaveUser(req, body, res);
    }

    if (req.method === "PUT" && url.pathname === "/api/me/social") {
      const body = await readJsonBody(req);
      return handleSaveSocial(req, body, res);
    }

    return sendJson(res, 404, { error: "Not found" });
  } catch (error) {
    return sendJson(res, 500, {
      error: "Server error",
      detail: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

server.listen(PORT, () => {
  console.log(`Sira Path API running on http://localhost:${PORT}`);
});

function handleRegister(body, res) {
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = normalizeEmail(body?.email);
  const password = typeof body?.password === "string" ? body.password : "";
  const role = sanitizeAccountRole(body?.role);
  const reminderPreferences = sanitizeReminderPreferences(body?.reminderPreferences);
  const profile = sanitizeUserProfile(body?.user, email, name, role, reminderPreferences, "password");
  const socialHub = sanitizeSocialHub(body?.socialHub);

  if (!name || !email || !password) {
    return sendJson(res, 400, { error: "Name, email, and password are required." });
  }

  const db = readDb();

  if (db.users.some((user) => user.email === email)) {
    return sendJson(res, 409, { error: "An account with that email already exists." });
  }

  const { salt, hash } = hashPassword(password);
  const userId = Number(profile.id) || Date.now();
  const createdAt = new Date().toISOString();
  const persistedProfile = {
    ...profile,
    id: userId,
    hasAccount: true,
    accountEmail: email,
    accountRole: role,
    accountCreatedAt: createdAt,
    lastLoginAt: createdAt,
    reminderPreferences
  };

  db.users.push({
    id: userId,
    email,
    passwordHash: hash,
    passwordSalt: salt,
    name,
    role,
    reminderPreferences,
    createdAt,
    authProvider: "password",
    linkedProviders: {},
    profile: persistedProfile,
    socialHub
  });

  const session = createSession(db, userId);
  writeDb(db);

  return sendJson(res, 201, {
    token: session.token,
    account: {
      name,
      email,
      provider: "password",
      role,
      createdAt,
      reminderPreferences
    },
    user: persistedProfile,
    socialHub
  });
}

function handleLogin(body, res) {
  const email = normalizeEmail(body?.email);
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return sendJson(res, 400, { error: "Email and password are required." });
  }

  const db = readDb();
  const userRecord = db.users.find((item) => item.email === email);

  if (!userRecord) {
    return sendJson(res, 401, { error: "Invalid email or password." });
  }

  if (!userRecord.passwordSalt || !userRecord.passwordHash) {
    return sendJson(res, 400, {
      error: `This account uses ${startCaseAuthProvider(getPrimaryAuthProvider(userRecord))} sign-in. Continue with that provider instead.`
    });
  }

  if (!verifyPassword(password, userRecord.passwordSalt, userRecord.passwordHash)) {
    return sendJson(res, 401, { error: "Invalid email or password." });
  }

  userRecord.profile = {
    ...userRecord.profile,
    hasAccount: true,
    accountEmail: userRecord.email,
    accountRole: userRecord.role,
    accountProvider: getPrimaryAuthProvider(userRecord),
    lastLoginAt: new Date().toISOString(),
    reminderPreferences: sanitizeReminderPreferences(userRecord.reminderPreferences)
  };
  userRecord.socialHub = sanitizeSocialHub(userRecord.socialHub);
  const session = createSession(db, userRecord.id);
  writeDb(db);

  return sendJson(res, 200, {
    token: session.token,
    account: {
      name: userRecord.name,
      email: userRecord.email,
      provider: getPrimaryAuthProvider(userRecord),
      role: userRecord.role,
      createdAt: userRecord.createdAt,
      reminderPreferences: sanitizeReminderPreferences(userRecord.reminderPreferences)
    },
    user: userRecord.profile,
    socialHub: userRecord.socialHub
  });
}

async function handleSocialLogin(body, res) {
  const provider = sanitizeAuthProvider(body?.provider);

  if (!provider || provider === "password") {
    return sendJson(res, 400, { error: "A supported social provider is required." });
  }

  let identity;

  try {
    identity = await verifySocialIdentity(provider, body);
  } catch (error) {
    return sendJson(res, 401, {
      error: error instanceof Error ? error.message : "Could not verify social sign-in."
    });
  }

  const db = readDb();
  const reminderPreferences = sanitizeReminderPreferences(body?.reminderPreferences);
  const role = sanitizeAccountRole(body?.role);
  const socialHub = sanitizeSocialHub(body?.socialHub);
  const createdAt = new Date().toISOString();
  const normalizedEmail = normalizeEmail(identity.email) || `${provider}_${identity.id}@${provider}.local`;

  let userRecord = db.users.find((item) => item.linkedProviders?.[provider]?.id === identity.id);

  if (!userRecord) {
    userRecord = db.users.find((item) => item.email === normalizedEmail);
  }

  if (!userRecord) {
    const profile = sanitizeUserProfile(body?.user, normalizedEmail, identity.name, role, reminderPreferences, provider);
    const userId = Number(profile.id) || Date.now();
    const persistedProfile = {
      ...profile,
      id: userId,
      hasAccount: true,
      accountEmail: normalizedEmail,
      accountRole: role,
      accountProvider: provider,
      accountCreatedAt: createdAt,
      lastLoginAt: createdAt,
      reminderPreferences
    };

    userRecord = {
      id: userId,
      email: normalizedEmail,
      passwordHash: null,
      passwordSalt: null,
      name: identity.name,
      role,
      reminderPreferences,
      createdAt,
      authProvider: provider,
      linkedProviders: {
        [provider]: {
          id: identity.id,
          email: identity.email,
          name: identity.name
        }
      },
      profile: persistedProfile,
      socialHub
    };

    db.users.push(userRecord);
  } else {
    const nextRole = role ?? userRecord.role;
    const nextReminderPreferences = sanitizeReminderPreferences(body?.reminderPreferences ?? userRecord.reminderPreferences);
    const currentEmail = normalizeEmail(userRecord.email);
    const shouldReplaceSyntheticEmail =
      !currentEmail || (identity.email && currentEmail.endsWith(`@${provider}.local`));

    if (shouldReplaceSyntheticEmail) {
      userRecord.email = normalizedEmail;
    }

    userRecord.name = identity.name || userRecord.name || "Learner";
    userRecord.role = nextRole;
    userRecord.reminderPreferences = nextReminderPreferences;
    userRecord.authProvider = provider;
    userRecord.linkedProviders = {
      ...(userRecord.linkedProviders ?? {}),
      [provider]: {
        id: identity.id,
        email: identity.email,
        name: identity.name
      }
    };
    userRecord.profile = {
      ...userRecord.profile,
      ...sanitizeUserProfile(body?.user ?? userRecord.profile, userRecord.email, userRecord.name, nextRole, nextReminderPreferences, provider),
      id: userRecord.id,
      hasAccount: true,
      accountEmail: userRecord.email,
      accountRole: nextRole,
      accountProvider: provider,
      accountCreatedAt: userRecord.createdAt || createdAt,
      lastLoginAt: createdAt,
      reminderPreferences: nextReminderPreferences
    };
    userRecord.socialHub = (userRecord.socialHub?.connections?.length || userRecord.socialHub?.battleHistory?.length)
      ? sanitizeSocialHub(userRecord.socialHub)
      : socialHub;
  }

  const session = createSession(db, userRecord.id);
  writeDb(db);

  return sendJson(res, 200, {
    token: session.token,
    account: {
      name: userRecord.name,
      email: userRecord.email,
      provider,
      role: userRecord.role,
      createdAt: userRecord.createdAt,
      reminderPreferences: sanitizeReminderPreferences(userRecord.reminderPreferences)
    },
    user: {
      ...userRecord.profile,
      hasAccount: true,
      accountEmail: userRecord.email,
      accountRole: userRecord.role,
      accountProvider: provider,
      lastLoginAt: createdAt,
      reminderPreferences: sanitizeReminderPreferences(userRecord.reminderPreferences)
    },
    socialHub: sanitizeSocialHub(userRecord.socialHub)
  });
}

function handleLogout(req, res) {
  const token = getBearerToken(req);

  if (!token) {
    return sendJson(res, 200, { ok: true });
  }

  const db = readDb();
  db.sessions = db.sessions.filter((session) => session.token !== token);
  writeDb(db);
  return sendJson(res, 200, { ok: true });
}

function handleSession(req, res) {
  const userRecord = requireUser(req);

  if (!userRecord) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  return sendJson(res, 200, {
    account: {
      name: userRecord.name,
      email: userRecord.email,
      provider: getPrimaryAuthProvider(userRecord),
      role: userRecord.role,
      createdAt: userRecord.createdAt,
      reminderPreferences: sanitizeReminderPreferences(userRecord.reminderPreferences)
    },
    user: sanitizeUserProfile(
      {
        ...userRecord.profile,
        hasAccount: true,
        accountEmail: userRecord.email,
        accountRole: userRecord.role,
        accountProvider: getPrimaryAuthProvider(userRecord),
        reminderPreferences: sanitizeReminderPreferences(userRecord.reminderPreferences)
      },
      userRecord.email,
      userRecord.name,
      userRecord.role,
      sanitizeReminderPreferences(userRecord.reminderPreferences),
      getPrimaryAuthProvider(userRecord)
    ),
    socialHub: sanitizeSocialHub(userRecord.socialHub)
  });
}

function handleSaveUser(req, body, res) {
  const context = requireUserContext(req);

  if (!context) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  const nextRole = sanitizeAccountRole(body?.user?.accountRole);
  const nextReminderPreferences = sanitizeReminderPreferences(
    body?.user?.reminderPreferences ?? context.userRecord.reminderPreferences
  );

  context.userRecord.role = nextRole;
  context.userRecord.reminderPreferences = nextReminderPreferences;

  const nextProfile = sanitizeUserProfile(
    body?.user,
    context.userRecord.email,
    context.userRecord.name,
    nextRole,
    nextReminderPreferences,
    getPrimaryAuthProvider(context.userRecord)
  );

  context.userRecord.profile = {
    ...context.userRecord.profile,
    ...nextProfile,
    id: context.userRecord.id,
    hasAccount: true,
    accountEmail: context.userRecord.email,
    accountRole: context.userRecord.role,
    accountProvider: getPrimaryAuthProvider(context.userRecord),
    reminderPreferences: nextReminderPreferences
  };

  writeDb(context.db);
  return sendJson(res, 200, { ok: true, user: context.userRecord.profile });
}

function handleSaveSocial(req, body, res) {
  const context = requireUserContext(req);

  if (!context) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  context.userRecord.socialHub = sanitizeSocialHub(body?.socialHub);
  writeDb(context.db);
  return sendJson(res, 200, { ok: true, socialHub: context.userRecord.socialHub });
}

function requireUser(req) {
  const context = requireUserContext(req);
  return context ? context.userRecord : null;
}

function requireUserContext(req) {
  const token = getBearerToken(req);

  if (!token) {
    return null;
  }

  const db = readDb();
  db.sessions = db.sessions.filter((session) => new Date(session.expiresAt).getTime() > Date.now());
  const session = db.sessions.find((item) => item.token === token);

  if (!session) {
    writeDb(db);
    return null;
  }

  const userRecord = db.users.find((item) => item.id === session.userId);

  if (!userRecord) {
    db.sessions = db.sessions.filter((item) => item.token !== token);
    writeDb(db);
    return null;
  }

  return { db, session, userRecord };
}

function sanitizeUserProfile(profile, email, name, role, reminderPreferences, provider) {
  const now = new Date().toISOString();
  const safeProfile = profile && typeof profile === "object" ? profile : {};

  return {
    id: Number(safeProfile.id) || Date.now(),
    username: typeof safeProfile.username === "string" ? safeProfile.username : email.split("@")[0] || "learner",
    displayName: typeof safeProfile.displayName === "string" ? safeProfile.displayName : name,
    avatarInitials: typeof safeProfile.avatarInitials === "string" ? safeProfile.avatarInitials : getInitials(name),
    hasAccount: true,
    accountRole: role,
    accountProvider: sanitizeAuthProvider(safeProfile.accountProvider) || provider || "password",
    accountEmail: email,
    accountCreatedAt: typeof safeProfile.accountCreatedAt === "string" ? safeProfile.accountCreatedAt : now,
    lastLoginAt: typeof safeProfile.lastLoginAt === "string" ? safeProfile.lastLoginAt : now,
    lastLearningAt: typeof safeProfile.lastLearningAt === "string" ? safeProfile.lastLearningAt : safeProfile.lastLoginAt,
    reminderPreferences,
    preferredLanguage: sanitizePreferredLanguage(safeProfile.preferredLanguage),
    foundationAssessmentSkipped: Boolean(safeProfile.foundationAssessmentSkipped),
    soundEffectsEnabled: safeProfile.soundEffectsEnabled !== false,
    reducedSoundEffects: Boolean(safeProfile.reducedSoundEffects),
    reviewHeartRestoreUsed: Boolean(safeProfile.reviewHeartRestoreUsed),
    learnerProfile: sanitizeLearnerProfile(safeProfile.learnerProfile),
    streakDays: Number(safeProfile.streakDays) || 1,
    totalXp: Number(safeProfile.totalXp) || 0,
    dailyGoalXp: Number(safeProfile.dailyGoalXp) || 40,
    gems: Number(safeProfile.gems) || 120,
    hearts: sanitizeHearts(safeProfile.hearts),
    completedLessonIds: Array.isArray(safeProfile.completedLessonIds) ? safeProfile.completedLessonIds : [],
    completedNodeIds: Array.isArray(safeProfile.completedNodeIds) ? safeProfile.completedNodeIds : [],
    claimedRewardIds: Array.isArray(safeProfile.claimedRewardIds) ? safeProfile.claimedRewardIds.filter((item) => typeof item === "string") : [],
    activeSubscriptionId: typeof safeProfile.activeSubscriptionId === "string" ? safeProfile.activeSubscriptionId : undefined
  };
}

function sanitizeAccountRole(value) {
  if (value === "parent" || value === "child") {
    return value;
  }

  return undefined;
}

function sanitizePreferredLanguage(value) {
  return ["en", "fr", "ar", "bn", "ur", "hi"].includes(value) ? value : "en";
}

function sanitizeHearts(hearts) {
  const safeHearts = hearts && typeof hearts === "object" ? hearts : {};
  const max = Number(safeHearts.max) || 5;
  return {
    current: Number(safeHearts.current) || max,
    max,
    unlimited: Boolean(safeHearts.unlimited),
    lastRefillDate: typeof safeHearts.lastRefillDate === "string"
      ? safeHearts.lastRefillDate
      : new Date().toISOString().slice(0, 10)
  };
}

function sanitizeSocialHub(value) {
  const safe = value && typeof value === "object" ? value : {};
  const connections = Array.isArray(safe.connections) ? safe.connections : [];
  const battleHistory = Array.isArray(safe.battleHistory) ? safe.battleHistory : [];

  return {
    connections: connections.map((connection) => sanitizeConnection(connection)),
    battleHistory: battleHistory.map((battle) => sanitizeBattle(battle))
  };
}

function sanitizeConnection(connection) {
  const safe = connection && typeof connection === "object" ? connection : {};
  return {
    id: typeof safe.id === "string" ? safe.id : `connection_${Date.now()}`,
    name: typeof safe.name === "string" ? safe.name : "Connection",
    relation: safe.relation === "parent" ? "parent" : "friend",
    email: typeof safe.email === "string" ? normalizeEmail(safe.email) : undefined,
    connectedWithAccount: Boolean(safe.connectedWithAccount),
    reminderPreferences: sanitizeReminderPreferences(safe.reminderPreferences),
    avatarInitials: typeof safe.avatarInitials === "string" ? safe.avatarInitials : getInitials(typeof safe.name === "string" ? safe.name : "Connection"),
    totalXp: Number(safe.totalXp) || 0,
    streakDays: Number(safe.streakDays) || 0,
    stars: Number(safe.stars) || 0,
    wins: Number(safe.wins) || 0,
    losses: Number(safe.losses) || 0,
    lastActiveAt: typeof safe.lastActiveAt === "string" ? safe.lastActiveAt : new Date().toISOString()
  };
}

function sanitizeBattle(battle) {
  const safe = battle && typeof battle === "object" ? battle : {};
  return {
    id: typeof safe.id === "string" ? safe.id : `battle_${Date.now()}`,
    opponentId: typeof safe.opponentId === "string" ? safe.opponentId : "unknown",
    opponentName: typeof safe.opponentName === "string" ? safe.opponentName : "Opponent",
    opponentRelation: safe.opponentRelation === "parent" ? "parent" : "friend",
    myScore: Number(safe.myScore) || 0,
    theirScore: Number(safe.theirScore) || 0,
    winner: safe.winner === "opponent" ? "opponent" : "user",
    createdAt: typeof safe.createdAt === "string" ? safe.createdAt : new Date().toISOString()
  };
}

function sanitizeReminderPreferences(value) {
  const safe = value && typeof value === "object" ? value : {};
  return {
    dailyInactivity: safe.dailyInactivity !== false,
    weeklyInactivity: safe.weeklyInactivity !== false,
    streakReminders: safe.streakReminders !== false,
    islamicReminders: safe.islamicReminders !== false
  };
}

function sanitizeAuthProvider(value) {
  return value === "password" || value === "google" || value === "facebook" ? value : undefined;
}

function getPrimaryAuthProvider(userRecord) {
  return sanitizeAuthProvider(userRecord?.authProvider)
    || Object.keys(userRecord?.linkedProviders || {}).find((provider) => Boolean(sanitizeAuthProvider(provider)))
    || "password";
}

function startCaseAuthProvider(provider) {
  if (provider === "google") {
    return "Google";
  }

  if (provider === "facebook") {
    return "Facebook";
  }

  return "Password";
}

async function verifySocialIdentity(provider, body) {
  const idToken = typeof body?.idToken === "string" ? body.idToken.trim() : "";
  const accessToken = typeof body?.accessToken === "string" ? body.accessToken.trim() : "";
  const token = idToken || accessToken;

  if (!token) {
    throw new Error(`${startCaseAuthProvider(provider)} sign-in is missing a token.`);
  }

  const safeProfile = body?.profile && typeof body.profile === "object" ? body.profile : {};
  const email = normalizeEmail(safeProfile.email || body?.user?.accountEmail);
  const displayName = typeof safeProfile.name === "string"
    ? safeProfile.name.trim()
    : typeof body?.user?.displayName === "string"
      ? body.user.displayName.trim()
      : "";
  const name = displayName || (email ? email.split("@")[0] : "Learner");
  const id = typeof safeProfile.id === "string" && safeProfile.id.trim()
    ? safeProfile.id.trim()
    : crypto.createHash("sha256").update(`${provider}:${token}`).digest("hex").slice(0, 24);

  return {
    id,
    email,
    name
  };
}

function sanitizeLearnerProfile(value) {
  const safe = value && typeof value === "object" ? value : {};
  const categoryLevels = FOUNDATION_CATEGORY_IDS.reduce((map, category) => {
    map[category] = sanitizeLearnerCategoryProfile(safe.category_levels?.[category]);
    return map;
  }, {});

  return {
    overall_level: ["beginner", "developing", "intermediate", "advanced"].includes(safe.overall_level)
      ? safe.overall_level
      : "beginner",
    readiness_label: sanitizeReadinessLabel(safe.readiness_label),
    assessmentCompleted: Boolean(safe.assessmentCompleted),
    category_levels: categoryLevels,
    weak_areas: sanitizeCategoryList(safe.weak_areas),
    strong_areas: sanitizeCategoryList(safe.strong_areas),
    needs_review_question_ids: Array.isArray(safe.needs_review_question_ids)
      ? safe.needs_review_question_ids.filter((item) => typeof item === "string").slice(0, 24)
      : [],
    assessmentHistory: Array.isArray(safe.assessmentHistory)
      ? safe.assessmentHistory.map((item) => sanitizeAssessmentAnswerRecord(item)).slice(-240)
      : [],
    totalQuestionsAnswered: Number(safe.totalQuestionsAnswered) || 0,
    dailyChallengeQuestionIds: Array.isArray(safe.dailyChallengeQuestionIds)
      ? safe.dailyChallengeQuestionIds.filter((item) => typeof item === "string").slice(0, 12)
      : [],
    lastAssessmentAt: typeof safe.lastAssessmentAt === "string" ? safe.lastAssessmentAt : undefined,
    lastDailyChallengeAt: typeof safe.lastDailyChallengeAt === "string" ? safe.lastDailyChallengeAt : undefined
  };
}

function sanitizeLearnerCategoryProfile(value) {
  const safe = value && typeof value === "object" ? value : {};
  return {
    accuracyPercentage: clampNumber(safe.accuracyPercentage, 0, 100),
    currentEstimatedDifficulty: clampNumber(safe.currentEstimatedDifficulty, 1, 5) || 1,
    confidenceScore: clampNumber(safe.confidenceScore, 0, 100),
    streakConsistency: Math.max(0, Number(safe.streakConsistency) || 0),
    questionsAttempted: Math.max(0, Number(safe.questionsAttempted) || 0),
    questionsAnsweredCorrectly: Math.max(0, Number(safe.questionsAnsweredCorrectly) || 0),
    weaknessTags: Array.isArray(safe.weaknessTags) ? safe.weaknessTags.filter((item) => typeof item === "string").slice(0, 8) : [],
    recentMistakeQuestionIds: Array.isArray(safe.recentMistakeQuestionIds)
      ? safe.recentMistakeQuestionIds.filter((item) => typeof item === "string").slice(0, 8)
      : [],
    averageResponseTimeMs: Math.max(0, Number(safe.averageResponseTimeMs) || 0),
    readinessLabel: sanitizeReadinessLabel(safe.readinessLabel)
  };
}

function sanitizeAssessmentAnswerRecord(value) {
  const safe = value && typeof value === "object" ? value : {};
  return {
    questionId: typeof safe.questionId === "string" ? safe.questionId : `question_${Date.now()}`,
    category: FOUNDATION_CATEGORY_IDS.includes(safe.category) ? safe.category : "shahadah",
    difficulty: clampNumber(safe.difficulty, 1, 5) || 1,
    selectedAnswer: safe.selectedAnswer,
    isCorrect: Boolean(safe.isCorrect),
    confidence: Math.max(0, Number(safe.confidence) || 0),
    responseTimeMs: Math.max(0, Number(safe.responseTimeMs) || 0),
    answeredAt: typeof safe.answeredAt === "string" ? safe.answeredAt : new Date().toISOString()
  };
}

function sanitizeReadinessLabel(value) {
  return FOUNDATION_PROGRESS_LABELS.includes(value)
    ? value
    : "New learner";
}

function sanitizeCategoryList(value) {
  return Array.isArray(value)
    ? value.filter((item) => FOUNDATION_CATEGORY_IDS.includes(item))
    : [];
}

function clampNumber(value, min, max) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.min(max, Math.max(min, numeric));
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode);
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function getBearerToken(req) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice("Bearer ".length);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  const actualHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(actualHash, "hex"), Buffer.from(expectedHash, "hex"));
}

function createSession(db, userId) {
  const now = new Date();
  const token = crypto.randomBytes(32).toString("hex");
  const session = {
    token,
    userId,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + SESSION_TTL_MS).toISOString()
  };

  db.sessions = db.sessions.filter((item) => item.userId !== userId && new Date(item.expiresAt).getTime() > now.getTime());
  db.sessions.push(session);

  return session;
}

function normalizeEmail(value) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

function getInitials(name) {
  return (
    String(name || "")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0] ? part[0].toUpperCase() : "")
      .join("") || "SP"
  );
}

function readDb() {
  bootstrapDb();
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDb(db) {
  bootstrapDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function bootstrapDb() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(EMPTY_DB, null, 2));
  }
}
