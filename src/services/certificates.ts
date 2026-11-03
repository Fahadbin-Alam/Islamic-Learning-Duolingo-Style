import { t } from "../i18n";
import type { LearningSection, TopicId, UserProfile } from "../types";
import type { IconName } from "../ui/Icon";

// Certificates: a shareable card for finishing something big, like Juz Amma, the Seerah, a whole surah, a
// companion's life or a whole topic. Each one is earned once every circle in it is finished (lessons or test-outs),
// so it works out from progress alone and an old save gets the ones it already earned. The day it was earned is
// kept on the learner (user.certificates) when the app sees it happen, for the date on the card.

export type CertificateKind = "topic" | "group" | "unit";

export interface Certificate {
  /** "topic:<topicId>", "group:<name>" or "unit:<unitId>": the same in every language. */
  id: string;
  kind: CertificateKind;
  topicId: TopicId;
  /** What was finished, in the shown language ("Juz Amma", "Surah Al-Kahf", "Prayer"). */
  title: string;
  icon: IconName;
  accent: string;
  /** The circles to finish. */
  nodeIds: string[];
}

export interface CertificateProgress {
  certificate: Certificate;
  done: number;
  total: number;
  earned: boolean;
  /** When the app saw it earned (ISO time). An old save's certificates have none. */
  earnedAt?: string;
}

/** Juz Amma: the last juz of the Quran, An-Naba (78) to An-Nas (114). */
export const JUZ_AMMA_FIRST_SURAH = 78;

function surahNumber(unitId: string) {
  const match = /^quran-surah-meaning-(\d+)$/.exec(unitId);
  return match ? Number(match[1]) : undefined;
}

function isJuzAmma(unitId: string) {
  const number = surahNumber(unitId);
  return number !== undefined && number >= JUZ_AMMA_FIRST_SURAH;
}

const TOPIC_ICONS: Partial<Record<TopicId, IconName>> = {
  quran_tafseer: "quran",
  prayer: "mosque",
  hajj: "kaaba",
  ramadan: "moon",
  fasting: "moon",
  zakat: "coins",
  sahabah: "people",
  prophets: "scroll",
  women_of_the_book: "rose",
  hadith: "bookOpen",
  scholars: "quill",
  akhirah: "sun",
  manners: "handHeart",
  marriage: "homeHeart",
  intro: "door",
  eid: "gift",
  foundation: "star8",
  aqidah: "shield"
};

/** Units that each get their own certificate: every surah before Juz Amma, and every companion's life. */
function hasOwnCertificate(section: LearningSection, unitId: string) {
  if (section.topicId === "quran_tafseer") return unitId.startsWith("quran-surah") && !isJuzAmma(unitId);
  return section.topicId === "sahabah";
}

/**
 * Every certificate, from the course as shown (titles already in the learner's language): big groups first
 * (Juz Amma, the Seerah, the Prophets from Adam to Isa), then each whole topic, then surahs and companions.
 */
export function buildCertificates(sections: readonly LearningSection[]): Certificate[] {
  const groups: Certificate[] = [];
  const topics: Certificate[] = [];
  const units: Certificate[] = [];
  const unitNodes = (section: LearningSection, keep: (unitId: string) => boolean) => section.nodes.filter((node) => keep(node.branchId)).map((node) => node.id);

  for (const section of sections) {
    if (!section.nodes.length) continue;
    const base = { topicId: section.topicId, accent: section.accentColor };
    if (section.topicId === "quran_tafseer") {
      groups.push({ ...base, id: "group:juz-amma", kind: "group", title: t("Juz Amma"), icon: "quran", nodeIds: unitNodes(section, isJuzAmma) });
    }
    if (section.topicId === "prophets") {
      groups.push({ ...base, id: "group:seerah", kind: "group", title: t("The Seerah"), icon: "mosque", nodeIds: unitNodes(section, (id) => id.startsWith("seerah-")) });
      groups.push({ ...base, id: "group:prophets", kind: "group", title: t("The Prophets, Adam to Isa"), icon: "scroll", nodeIds: unitNodes(section, (id) => id.startsWith("prophets-unit-")) });
    }
    topics.push({ ...base, id: `topic:${section.topicId}`, kind: "topic", title: section.title, icon: TOPIC_ICONS[section.topicId] ?? "trophy", nodeIds: section.nodes.map((node) => node.id) });
    for (const branch of section.branches) {
      if (!hasOwnCertificate(section, branch.id)) continue;
      units.push({
        ...base,
        id: `unit:${branch.id}`,
        kind: "unit",
        title: branch.title,
        icon: section.topicId === "quran_tafseer" ? "quran" : "star8",
        nodeIds: unitNodes(section, (id) => id === branch.id)
      });
    }
  }
  return [...groups, ...topics, ...units].filter((certificate) => certificate.nodeIds.length > 0);
}

/** How far the learner is on each certificate, in the same order. */
export function certificateProgress(certificates: readonly Certificate[], user: Pick<UserProfile, "completedNodeIds" | "certificates"> | undefined): CertificateProgress[] {
  const completed = new Set(user?.completedNodeIds ?? []);
  return certificates.map((certificate) => {
    const done = certificate.nodeIds.filter((id) => completed.has(id)).length;
    const total = certificate.nodeIds.length;
    const earned = done >= total;
    return { certificate, done, total, earned, earnedAt: earned ? user?.certificates?.[certificate.id] : undefined };
  });
}

/** Ids of the certificates the learner has earned. */
export function earnedCertificateIds(certificates: readonly Certificate[], completedNodeIds: readonly string[] | undefined) {
  const completed = new Set(completedNodeIds ?? []);
  return certificates.filter((certificate) => certificate.nodeIds.every((id) => completed.has(id))).map((certificate) => certificate.id);
}

/** Notes the day these certificates were earned (a date already kept stays). */
export function recordCertificates<T extends Pick<UserProfile, "certificates">>(user: T, ids: readonly string[], now = new Date()): T {
  const missing = ids.filter((id) => !user.certificates?.[id]);
  if (!missing.length) return user;
  const stamp = now.toISOString();
  return { ...user, certificates: { ...user.certificates, ...Object.fromEntries(missing.map((id) => [id, stamp])) } };
}

const KIND_ORDER: Record<CertificateKind, number> = { topic: 0, group: 1, unit: 2 };

/** When one lesson earns several, the biggest shows first: a whole topic, then a group, then a unit. */
export function biggestFirst(certificates: readonly Certificate[]) {
  return [...certificates].sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || b.nodeIds.length - a.nodeIds.length);
}

