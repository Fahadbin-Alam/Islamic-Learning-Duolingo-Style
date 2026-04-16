import type {
  LearningNode,
  Lesson,
  LessonSource,
  ResourceSupportType,
  ResourceValidationStatus
} from "../types";

const SOURCE_STATUS_ORDER: Record<ResourceValidationStatus, number> = {
  exact_match: 0,
  strong_support: 1,
  weak_support: 2,
  needs_review: 3
};

const STOP_WORDS = new Set([
  "the",
  "and",
  "with",
  "this",
  "that",
  "from",
  "into",
  "your",
  "about",
  "what",
  "when",
  "then",
  "than",
  "over",
  "under",
  "through",
  "their",
  "there",
  "were",
  "they",
  "them",
  "have",
  "will",
  "just",
  "only",
  "part",
  "after",
  "before",
  "lesson",
  "learn",
  "learning",
  "review",
  "story"
]);

const SUPPLEMENTAL_BRANCH_SOURCES: Record<string, LessonSource> = {
  "sahabi-abu-bakr": {
    id: "yaqeen_abu_bakr_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Abu Bakr (ra): Second to None in the Pursuit of God",
    url: "https://yaqeeninstitute.org/read/post/abu-bakr-al-siddiq-second-to-none-in-the-pursuit-of-god",
    reference: "The Firsts: Abu Bakr (ra): Second to None in the Pursuit of God",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A focused biography explainer on Abu Bakr's truthfulness, sacrifice, and closeness to the Prophet.",
    teaches: "Abu Bakr's branch is strongest when the learner sees his truthfulness, sacrifice, and leadership together.",
    whyAttached: "This support resource gives biography context for Abu Bakr lessons beyond short challenge prompts.",
    reviewed: true
  },
  "sahabi-umar-ibn-al-khattab": {
    id: "yaqeen_umar_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Omar Ibn Al Khattab (ra): His Leadership, His Legacy, His Death",
    url: "https://new.yaqeeninstitute.org/watch/series/omar-ibn-al-khattab-his-leadership-his-legacy-his-death-the-firsts",
    reference: "The Firsts: Omar Ibn Al Khattab (ra): His Leadership, His Legacy, His Death",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A focused lesson on Umar's justice, leadership, and accountability before Allah.",
    teaches: "This resource helps the learner connect Umar's courage with justice, public trust, and fear of Allah.",
    whyAttached: "This support source matches the leadership and character themes across Umar lessons.",
    reviewed: true
  },
  "sahabi-uthman-ibn-affan": {
    id: "yaqeen_uthman_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Uthman Ibn Affan (ra): The Possessor of Two Lights",
    url: "https://new.yaqeeninstitute.org/watch/series/uthman-ibn-affan-the-possessor-of-two-lights",
    reference: "The Firsts: Uthman Ibn Affan (ra): The Possessor of Two Lights",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A biography-focused support lesson on Uthman's modesty, generosity, and preservation of the Qur'an.",
    teaches: "This resource reinforces Uthman's haya, generosity, patience, and service to the written Qur'anic record.",
    whyAttached: "This gives biography depth that fits the exact character lessons in the Uthman branch.",
    reviewed: true
  },
  "sahabi-ali-ibn-abi-talib": {
    id: "yaqeen_ali_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Ali ibn Abi Talib (ra): Courageous & Steadfast",
    url: "https://yaqeeninstitute.org/watch/series/the-firsts/ali-ibn-abi-talib-courageous-and-steadfast",
    reference: "The Firsts: Ali ibn Abi Talib (ra): Courageous & Steadfast",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A support lesson on Ali's courage, nearness to the Prophet, and loyalty under pressure.",
    teaches: "This resource helps the learner see Ali as courage joined to knowledge and steadfast love for the Prophet.",
    whyAttached: "This support source directly matches the Ali branch's core teaching themes.",
    reviewed: true
  },
  "sahabi-khalid-ibn-al-walid": {
    id: "yaqeen_khalid_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Khalid ibn al-Walid (ra): Becoming the Sword of Allah",
    url: "https://yaqeeninstitute.org/watch/series/the-firsts/khalid-ibn-al-walid-ra-becoming-the-sword-of-allah-the-firsts",
    reference: "The Firsts: Khalid ibn al-Walid (ra): Becoming the Sword of Allah",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A support lesson on Khalid's conversion, discipline, and redirected strength in Islam.",
    teaches: "Khalid's lasting lesson is disciplined strength under revelation, not brute force on its own.",
    whyAttached: "This resource supports lessons on strength, obedience, and strategy in the Khalid branch.",
    reviewed: true
  },
  "sahabi-bilal-ibn-rabah": {
    id: "yaqeen_bilal_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Bilal ibn Rabah (ra): The Voice of Certainty",
    url: "https://yaqeeninstitute.org/read/post/bilal-ibn-rabah-the-voice-of-certainty-the-firsts",
    reference: "The Firsts: Bilal ibn Rabah (ra): The Voice of Certainty",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A support reading on Bilal's faith under torture, dignity, and service through the adhan.",
    teaches: "Bilal's lessons become clearer when faith, dignity, and public devotion are seen together.",
    whyAttached: "This biography resource precisely supports Bilal lessons about perseverance and honor.",
    reviewed: true
  },
  "sahabi-sad-ibn-abi-waqqas": {
    id: "yaqeen_saad_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Saad Ibn Abi Waqqas (ra): His Prayers Always Answered",
    url: "https://yaqeeninstitute.org/watch/series/the-firsts/saad-ibn-abi-waqqas-his-prayers-always-answered",
    reference: "The Firsts: Saad Ibn Abi Waqqas (ra): His Prayers Always Answered",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A branch-specific support lesson on Sa'd's obedience, dua, and long service to Islam.",
    teaches: "This resource helps learners connect Sa'd's obedience, answered supplication, and disciplined service.",
    whyAttached: "This matches the Sa'd branch's focus on obedience, dua, and steady service.",
    reviewed: true
  },
  "sahabi-abu-dharr-al-ghifari": {
    id: "yaqeen_abu_dharr_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Abu Dharr Al Ghifari (ra): Living and Dying Alone",
    url: "https://yaqeeninstitute.org/watch/series/the-firsts/abu-dharr-al-ghifari-ra-living-and-dying-alone",
    reference: "The Firsts: Abu Dharr Al Ghifari (ra): Living and Dying Alone",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A focused support lesson on Abu Dharr's truthfulness, detachment from the world, and moral seriousness.",
    teaches: "This resource supports lessons on Abu Dharr's honesty, asceticism, and moral seriousness under guidance.",
    whyAttached: "This matches the Abu Dharr branch more precisely than a broad biography link would.",
    reviewed: true
  },
  "sahabi-abdullah-ibn-masud": {
    id: "yaqeen_ibn_masud_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Abdullah Ibn Masood (ra): A Mighty Legacy of Qur'an",
    url: "https://yaqeeninstitute.org/watch/series/abdullah-ibn-masood-ra-a-mighty-legacy-of-quran",
    reference: "The Firsts: Abdullah Ibn Masood (ra): A Mighty Legacy of Qur'an",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A branch-specific support lesson on Ibn Mas'ud's Qur'an recitation, scholarship, and humility.",
    teaches: "This support source reinforces the branch's focus on Qur'anic precision, scholarship, and humility.",
    whyAttached: "This exact biography support fits the Abdullah ibn Mas'ud branch's learning goals.",
    reviewed: true
  },
  "sahabi-anas-ibn-malik": {
    id: "yaqeen_anas_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Anas ibn Malik (ra): In Service of the Beloved",
    url: "https://yaqeeninstitute.org/watch/series/anas-ibn-malik-ra-in-service-of-the-beloved-the-firsts",
    reference: "The Firsts: Anas ibn Malik (ra): In Service of the Beloved",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A support lesson on Anas's service to the Prophet and the preservation of everyday Sunnah.",
    teaches: "Anas lessons become clearer when the learner sees service, observation, and transmission together.",
    whyAttached: "This support source is a strong match for Anas branch lessons on service and memory.",
    reviewed: true
  },
  "sahabi-salman-al-farisi": {
    id: "yaqeen_salman_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Salman Al Farsi (ra): The Truth Seeker",
    url: "https://yaqeeninstitute.org/read/post/salman-al-farsi-ra-the-truth-seeker-the-firsts",
    reference: "The Firsts: Salman Al Farsi (ra): The Truth Seeker",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A support reading on Salman's long search for truth and how it ended in closeness to the Prophet.",
    teaches: "This resource supports lessons on truth-seeking, patience, and wisdom in the Salman branch.",
    whyAttached: "This resource matches the truth-seeking focus of the Salman branch exactly.",
    reviewed: true
  },
  "sahabi-az-zubayr-ibn-al-awwam": {
    id: "yaqeen_zubayr_support",
    site: "Yaqeen Institute",
    category: "biography",
    title: "Zubayr Ibn Awwam (ra): The Disciple",
    url: "https://yaqeeninstitute.org/watch/series/the-firsts/zubayr-ibn-awwam-the-disciple",
    reference: "The Firsts: Zubayr Ibn Awwam (ra): The Disciple",
    from: "Dr. Omar Suleiman, Yaqeen Institute",
    grade: "Reviewed biography explainer",
    summary: "A support lesson on Zubayr's bravery, loyalty, and readiness to answer the Prophet's call.",
    teaches: "This support source reinforces the Zubayr branch's lessons on loyalty, courage, and restraint.",
    whyAttached: "This is a branch-specific biography resource, not a broad history page.",
    reviewed: true
  }
};

export function preciseResourceUrl(site: LessonSource["site"], url: string, reference?: string) {
  if (site === "Quran.com") {
    return buildPreciseQuranUrl(reference, url);
  }

  if (site === "YouTube") {
    return normalizeYouTubeUrl(url);
  }

  return url;
}

export function enrichLessonSources(lesson: Lesson, node?: LearningNode) {
  const lessonKeywords = buildKeywordSet([
    lesson.title,
    lesson.intro,
    lesson.explanationContent,
    lesson.whatYouWillLearn,
    lesson.keyTakeaway,
    lesson.storyMoment,
    lesson.surahName,
    lesson.ayahRange,
    node?.title,
    node?.branchId
  ]);
  const lessonAyahRange = normalizeAyahRange(lesson.ayahRange);
  const topicalPractical = node?.topicId === "prayer";
  const candidateSources = dedupeSources([
    ...lesson.sources,
    ...getSupplementalSources(lesson, node)
  ]);

  const enriched = candidateSources.map((source, index) => {
    const preciseUrl = preciseResourceUrl(source.site, source.url, source.reference);
    const validationStatus = validateLessonSource(source, lessonKeywords, lessonAyahRange, topicalPractical);

    return {
      ...source,
      url: preciseUrl,
      teaches: source.teaches ?? extractPrimarySentence(source.summary) ?? source.summary,
      whyAttached: source.whyAttached ?? describeSourceAttachment(source, validationStatus, "support", lesson.title),
      validationStatus,
      supportType: "support" as const,
      reviewed: source.reviewed ?? source.site !== "YouTube"
    } satisfies LessonSource;
  });

  const sorted = enriched.sort((left, right) => {
    return SOURCE_STATUS_ORDER[left.validationStatus ?? "needs_review"] - SOURCE_STATUS_ORDER[right.validationStatus ?? "needs_review"];
  });

  const primaryIndex = sorted.findIndex((source) =>
    source.validationStatus === "exact_match" || source.validationStatus === "strong_support"
  );
  const fallbackPrimaryIndex = primaryIndex >= 0 ? primaryIndex : 0;

  return sorted.map((source, index) => ({
    ...source,
    supportType: (index === fallbackPrimaryIndex ? "primary" : "support") as ResourceSupportType,
    whyAttached: source.whyAttached ?? describeSourceAttachment(
      source,
      source.validationStatus ?? "needs_review",
      (index === fallbackPrimaryIndex ? "primary" : "support") as ResourceSupportType,
      lesson.title
    )
  }));
}

function getSupplementalSources(lesson: Lesson, node?: LearningNode) {
  if (!node?.branchId) {
    return [];
  }

  const branchSupport = SUPPLEMENTAL_BRANCH_SOURCES[node.branchId];

  if (!branchSupport) {
    return [];
  }

  const hasSameSupport = lesson.sources.some((source) => source.id === branchSupport.id || source.url === branchSupport.url);
  return hasSameSupport ? [] : [branchSupport];
}

export function getPrimaryLessonSource(sources: LessonSource[]) {
  return sources.find((source) => source.supportType === "primary")
    ?? sources.find((source) => source.validationStatus === "exact_match")
    ?? sources[0];
}

function buildPreciseQuranUrl(reference?: string, fallbackUrl?: string) {
  if (reference) {
    const referenceMatch = reference.match(/Quran\s+(\d+)(?::(\d+(?:-\d+)?))?/i);

    if (referenceMatch) {
      const surah = referenceMatch[1];
      const ayahRange = referenceMatch[2];
      return ayahRange ? `https://quran.com/${surah}/${ayahRange}` : `https://quran.com/${surah}`;
    }
  }

  return fallbackUrl ?? "https://quran.com";
}

function normalizeYouTubeUrl(url: string) {
  const shortMatch = url.match(/https?:\/\/youtu\.be\/([^?&/]+)/i);

  if (shortMatch) {
    const videoId = shortMatch[1];
    const query = url.includes("?") ? url.slice(url.indexOf("?")) : "";
    return `https://www.youtube.com/watch?v=${videoId}${query.replace("?", "&").replace(/^&/, "&")}`;
  }

  return url;
}

function buildKeywordSet(values: Array<string | undefined>) {
  const keywords = new Set<string>();

  for (const value of values) {
    for (const token of extractKeywords(value)) {
      keywords.add(token);
    }
  }

  return keywords;
}

function extractKeywords(value?: string) {
  if (!value) {
    return [];
  }

  return value
    .toLowerCase()
    .replace(/[^a-z0-9:\-'\s]/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^'+|'+$/g, ""))
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function normalizeAyahRange(value?: string) {
  return value?.replace(/\s+/g, "").toLowerCase();
}

function validateLessonSource(
  source: LessonSource,
  lessonKeywords: Set<string>,
  lessonAyahRange?: string,
  topicalPractical?: boolean
): ResourceValidationStatus {
  const sourceKeywords = new Set([
    ...extractKeywords(source.title),
    ...extractKeywords(source.summary),
    ...extractKeywords(source.reference),
    ...extractKeywords(source.from)
  ]);
  const keywordOverlap = Array.from(sourceKeywords).filter((token) => lessonKeywords.has(token)).length;

  if (source.site === "Quran.com") {
    const referenceMatch = source.reference?.match(/Quran\s+(\d+)(?::(\d+(?:-\d+)?))?/i);
    const sourceAyahRange = normalizeAyahRange(referenceMatch?.[2]);

    if (lessonAyahRange && sourceAyahRange && lessonAyahRange === sourceAyahRange) {
      return "exact_match";
    }

    if (referenceMatch?.[2] && keywordOverlap >= 1) {
      return "strong_support";
    }

    if (!referenceMatch?.[2]) {
      return keywordOverlap >= 1 ? "strong_support" : "needs_review";
    }
  }

  if (source.site === "Sunnah.com") {
    const hasExactEntry = /:\d+/i.test(source.url) || /\b\d+\b/.test(source.reference ?? "");

    if (hasExactEntry && keywordOverlap >= 2) {
      return "exact_match";
    }

    if (hasExactEntry && keywordOverlap >= 1) {
      return "strong_support";
    }

    return keywordOverlap >= 1 ? "weak_support" : "needs_review";
  }

  if (source.site === "YouTube") {
    if (topicalPractical && keywordOverlap >= 1) {
      return "strong_support";
    }

    return keywordOverlap >= 1 ? "weak_support" : "needs_review";
  }

  if (source.site === "Yaqeen Institute") {
    if (source.category === "biography" && keywordOverlap >= 1) {
      return "exact_match";
    }

    if (keywordOverlap >= 2) {
      return "strong_support";
    }

    return keywordOverlap >= 1 ? "weak_support" : "needs_review";
  }

  if (keywordOverlap >= 2) {
    return "strong_support";
  }

  if (keywordOverlap === 1) {
    return "weak_support";
  }

  return "needs_review";
}

function describeSourceAttachment(
  source: LessonSource,
  validationStatus: ResourceValidationStatus,
  supportType: ResourceSupportType,
  lessonTitle: string
) {
  const siteLabel = source.site === "Quran.com"
    ? "Quran evidence"
    : source.site === "Sunnah.com"
      ? "Hadith evidence"
      : "support video";

  if (validationStatus === "exact_match") {
    return `${siteLabel} attached as a direct match for ${lessonTitle}.`;
  }

  if (validationStatus === "strong_support") {
    return `${siteLabel} strongly supports the main teaching point in ${lessonTitle}.`;
  }

  if (validationStatus === "weak_support") {
    return `${siteLabel} gives broader support for ${lessonTitle}, but it is not a perfect one-to-one match.`;
  }

  return `${siteLabel} is broader than the lesson point and is marked for review.`;
}

function extractPrimarySentence(value?: string) {
  if (!value) {
    return undefined;
  }

  const match = value.match(/^[^.?!]+[.?!]?/);
  return match?.[0]?.trim();
}

function dedupeSources(sources: LessonSource[]) {
  const seen = new Set<string>();

  return sources.filter((source) => {
    const key = source.id || source.url;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
