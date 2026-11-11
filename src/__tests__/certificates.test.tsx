jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("../services/gameAudio", () => ({
  playGameSound: jest.fn(),
  primeGameAudio: jest.fn(() => true)
}));
jest.mock("expo-speech", () => ({ speak: jest.fn(), stop: jest.fn(() => Promise.resolve()) }));
jest.mock("../services/monetization", () => ({
  monetizationClient: {
    initialize: jest.fn(async () => undefined),
    getPremiumStatus: jest.fn(async () => null),
    getStorePrices: jest.fn(async () => ({})),
    showLessonBreakAd: jest.fn(async () => undefined),
    setAdAudience: jest.fn(),
    showRewardedAd: jest.fn(async () => ({ ok: false })),
    purchaseShopItem: jest.fn(async () => ({ ok: false, cancelled: true })),
    restorePurchases: jest.fn(async () => ({}))
  }
}));
jest.mock("../components/AdBanner", () => ({ AdBanner: () => null }));
jest.mock("../services/islamicNotifications", () => ({
  requestIslamicNotificationPermission: jest.fn(async () => false),
  scheduleIslamicReminderChecks: jest.fn(() => () => undefined)
}));

import React from "react";
import { Share } from "react-native";
import { act, fireEvent, render, screen } from "@testing-library/react-native";
import TopicApp from "../TopicApp";
import { learningApi, localDateKey } from "../api/islamicLearningApi";
import { COURSE } from "../data/course";
import { getStoredItem, setStoredItem } from "../services/appStorage";
import { biggestFirst, buildCertificates, certificateProgress, earnedCertificateIds, recordCertificates } from "../services/certificates";
import { certificateShareMessage } from "../services/shareApp";
import { CertificateCard, CertificatesSheet, certificateDate } from "../ui/screens/Certificates";
import type { LearningNodeView, UserProfile } from "../types";
import { finishLessonRight } from "./lessonDriver";
import { makeUser } from "./testUtils";

// Fahad picked certificates: finishing a big unit (Juz Amma, the Seerah) gives a card to share, which brings in new users.

const PROFILE_KEY = "sira-path-user-profile";
const savedUser = () => JSON.parse(getStoredItem(PROFILE_KEY) ?? "{}") as UserProfile;
const CERTIFICATES = buildCertificates(COURSE.sections);
const byId = (id: string) => CERTIFICATES.find((certificate) => certificate.id === id)!;
const section = (topicId: string) => COURSE.sections.find((item) => item.topicId === topicId)!;

async function press(testID: string) {
  await act(async () => {
    fireEvent.press(screen.getByTestId(testID));
  });
}

describe("which certificates there are", () => {
  it("has Juz Amma (An-Naba to An-Nas), the Seerah and the Prophets as big groups", () => {
    const quran = section("quran_tafseer");
    const juzAmma = byId("group:juz-amma");
    const surahs = new Set(quran.nodes.filter((node) => juzAmma.nodeIds.includes(node.id)).map((node) => node.branchId));
    expect(surahs.size).toBe(37);
    expect(surahs.has("quran-surah-meaning-78")).toBe(true);
    expect(surahs.has("quran-surah-meaning-114")).toBe(true);
    expect(surahs.has("quran-surah-meaning-77")).toBe(false);

    const prophets = section("prophets");
    const seerahUnits = new Set(prophets.nodes.filter((node) => byId("group:seerah").nodeIds.includes(node.id)).map((node) => node.branchId));
    expect([...seerahUnits].every((id) => id.startsWith("seerah-"))).toBe(true);
    expect(seerahUnits.size).toBe(17);
    expect(byId("group:prophets").nodeIds.length).toBeGreaterThan(100);
  });

  it("has one for every topic, every surah before Juz Amma and every companion, all with circles", () => {
    for (const item of COURSE.sections) expect(byId(`topic:${item.topicId}`).nodeIds).toHaveLength(item.nodes.length);
    expect(byId("unit:quran-surah-baqarah")).toBeTruthy();
    expect(CERTIFICATES.find((certificate) => certificate.id === "unit:quran-surah-meaning-114")).toBeUndefined();
    for (const branch of section("sahabah").branches) expect(byId(`unit:${branch.id}`)).toBeTruthy();
    expect(new Set(CERTIFICATES.map((certificate) => certificate.id)).size).toBe(CERTIFICATES.length);
    for (const certificate of CERTIFICATES) expect(certificate.nodeIds.length).toBeGreaterThan(0);
  });

  it("is earned only once every circle is done, and keeps the day it was first earned", () => {
    const nas = section("quran_tafseer").nodes.filter((node) => node.branchId === "quran-surah-meaning-114").map((node) => node.id);
    const allButOne = byId("group:juz-amma").nodeIds.slice(1);
    expect(earnedCertificateIds(CERTIFICATES, allButOne)).not.toContain("group:juz-amma");
    expect(earnedCertificateIds(CERTIFICATES, byId("group:juz-amma").nodeIds)).toContain("group:juz-amma");
    expect(nas.every((id) => byId("group:juz-amma").nodeIds.includes(id))).toBe(true);

    const first = recordCertificates({ certificates: undefined }, ["group:juz-amma"], new Date("2026-11-03T10:00:00Z"));
    const again = recordCertificates(first, ["group:juz-amma", "topic:eid"], new Date("2026-12-01T10:00:00Z"));
    expect(again.certificates).toEqual({ "group:juz-amma": "2026-11-03T10:00:00.000Z", "topic:eid": "2026-12-01T10:00:00.000Z" });

    const progress = certificateProgress(CERTIFICATES, { completedNodeIds: allButOne, certificates: again.certificates });
    const juz = progress.find((item) => item.certificate.id === "group:juz-amma")!;
    expect(juz).toMatchObject({ earned: false, done: allButOne.length, total: allButOne.length + 1, earnedAt: undefined });
  });

  it("shows the biggest first when one lesson earns several", () => {
    const order = biggestFirst([byId("unit:quran-surah-baqarah"), byId("group:seerah"), byId("topic:prophets")]).map((item) => item.id);
    expect(order).toEqual(["topic:prophets", "group:seerah", "unit:quran-surah-baqarah"]);
  });
});

describe("the certificate card", () => {
  it("shows the name, what was finished, its lessons, the day and where to get Muslimo", async () => {
    const [item] = certificateProgress([byId("group:juz-amma")], { completedNodeIds: byId("group:juz-amma").nodeIds, certificates: { "group:juz-amma": "2026-11-03T10:00:00Z" } });
    await render(<CertificateCard item={item} name="Fahad" />);
    expect(screen.getByTestId("certificate-name")).toHaveTextContent("Fahad");
    expect(screen.getByTestId("certificate-title")).toHaveTextContent("Juz Amma");
    expect(screen.getByTestId("certificate-lessons")).toHaveTextContent(`${item.total} lessons done`);
    expect(screen.getByTestId("certificate-date")).toHaveTextContent("3 November 2026");
    expect(screen.getByText("Muslimo")).toBeTruthy();
  });

  it("leaves the name off for a guest, and the day off for one earned before certificates came", async () => {
    const [item] = certificateProgress([byId("topic:eid")], { completedNodeIds: byId("topic:eid").nodeIds });
    await render(<CertificateCard item={item} />);
    expect(screen.queryByTestId("certificate-name")).toBeNull();
    expect(screen.queryByTestId("certificate-date")).toBeNull();
    expect(screen.getByText("Awarded for finishing")).toBeTruthy();
  });

  it("writes the day with the Gregorian calendar and 0-9 digits in every language", () => {
    for (const language of ["en", "bn", "ur", "ar"] as const) expect(certificateDate("2026-11-03T10:00:00Z", language)).toMatch(/2026/);
  });

  it("shares a line with the store link", () => {
    expect(certificateShareMessage("Juz Amma", "android", false)).toMatch(/I finished Juz Amma on Muslimo!.*\nhttps:\/\/play\.google\.com/s);
  });
});

describe("the Certificates list", () => {
  it("lists earned ones to open, and the started ones under Keep going", async () => {
    const done = [...byId("topic:eid").nodeIds, byId("group:juz-amma").nodeIds[0]];
    const items = certificateProgress(CERTIFICATES, { completedNodeIds: done });
    const onOpen = jest.fn();
    await render(<CertificatesSheet visible items={items} onOpen={onOpen} onClose={jest.fn()} />);
    await press("certificate-row-topic:eid");
    expect(onOpen).toHaveBeenCalledWith(expect.objectContaining({ certificate: expect.objectContaining({ id: "topic:eid" }) }));
    expect(screen.getByTestId("certificate-next-group:juz-amma")).toBeTruthy();
    expect(screen.queryByTestId("certificates-empty")).toBeNull();
  });

  it("says how to earn the first one when there are none", async () => {
    await render(<CertificatesSheet visible items={certificateProgress(CERTIFICATES, { completedNodeIds: [] })} onOpen={jest.fn()} onClose={jest.fn()} />);
    expect(screen.getByTestId("certificates-empty")).toBeTruthy();
  });
});

describe("earning one in the app", () => {
  beforeEach(() => {
    jest.spyOn(Share, "share").mockResolvedValue({ action: "sharedAction" });
  });

  it("pops up after the lesson that finishes a topic, keeps the day, shares, and shows on the Me tab", async () => {
    const eid = section("eid");
    const last = eid.nodes[eid.nodes.length - 1];
    const before = eid.nodes.filter((node) => node.id !== last.id);
    const user = makeUser({
      hasAccount: true,
      displayName: "Fahad Alam",
      lastTopicId: "eid",
      hearts: { current: 5, max: 5, unlimited: false, lastRefillDate: localDateKey() },
      completedLessonIds: ["warm-up-1", "warm-up-2", "warm-up-3", ...before.flatMap((node) => node.lessonIds)],
      completedNodeIds: before.map((node) => node.id)
    });
    setStoredItem(PROFILE_KEY, JSON.stringify(user));
    const node = learningApi.getPathNodes(user).find((item) => item.id === last.id) as LearningNodeView;
    expect(node.status).not.toBe("locked");
    const session = await learningApi.getLessonSession(node.firstLessonId, user);

    await render(<TopicApp />);
    await screen.findByTestId("learn-path-eid");
    // Earned before? No: nothing pops on opening the app.
    expect(screen.queryByTestId("certificate-pop")).toBeNull();
    await press(`path-node-${node.id}`);
    await press("node-card-start");
    await finishLessonRight(session.lesson.challenges);
    expect(await screen.findByTestId("lesson-complete")).toBeTruthy();
    // Not over the Lesson complete screen.
    expect(screen.queryByTestId("certificate-pop")).toBeNull();
    await press("complete-continue");

    expect(await screen.findByTestId("certificate-pop")).toBeTruthy();
    expect(screen.getByTestId("certificate-earned")).toBeTruthy();
    expect(screen.getByTestId("certificate-name")).toHaveTextContent("Fahad");
    expect(savedUser().certificates?.["topic:eid"]).toMatch(/^\d{4}-\d\d-\d\dT/);

    await press("certificate-share");
    expect(Share.share).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining("on Muslimo!") }));
    expect(screen.queryByTestId("certificate-pop")).toBeNull();

    await press("tab-me");
    await press("profile-certificates");
    await press("certificate-row-topic:eid");
    expect(screen.getByTestId("certificate-pop")).toBeTruthy();
    expect(screen.queryByTestId("certificate-earned")).toBeNull();
  });
});
