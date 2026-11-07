import type { SupportedLanguage, UserProfile } from "../types";
import { localDigits } from "./comebackReminders";
import { LEAGUES, TOP_TIER, leagueAt, leagueWeekKey, leagueZone, nextTier, type LeagueId } from "./leagues";
import { getLastLearningTime, isSameCalendarDay } from "./reminderContent";

// Weekly league reminders, Duolingo style but kind: a home animal "passes you" midweek, the league
// "ends tonight" on Sunday, and Monday morning says where you landed. Leagues measure the learner's
// own XP (no strangers), so the one who passes you is always the path's turtle or rabbit.
//
// Not spammy: at most three a week (Thursday, Sunday, Monday), never on a day the learner already
// had a lesson before the reminder time, never when nothing is at stake, and none for someone away
// over a week (the come-back reminders handle that). They follow the "Come back nudges" toggle.

export type LeagueReminderStep = "midweek" | "endsTonight" | "result";

export interface LeagueReminderSlot {
  id: string;
  step: LeagueReminderStep;
  at: Date;
  title: string;
  body: string;
}

/** Notification ids, one per step, so a reschedule replaces rather than piles up. */
export const LEAGUE_REMINDER_IDS: Record<LeagueReminderStep, string> = {
  midweek: "sira-league-midweek",
  endsTonight: "sira-league-ends",
  result: "sira-league-result"
};

/** Days after the week's Monday and the local hour each reminder goes out (Thursday 16:00, Sunday 16:00, next Monday 09:00). */
const WHEN: Record<LeagueReminderStep, { day: number; hour: number }> = {
  midweek: { day: 3, hour: 16 },
  endsTonight: { day: 6, hour: 16 },
  result: { day: 7, hour: 9 }
};

/** A learner away longer than this gets the come-back reminders only (a little over a week, so last Monday's lesson still earns this Monday's result). */
const MAX_AWAY_MS = 8 * 86_400_000;

type Copy = {
  midweekDown: { title: string; body: string };
  midweekSafe: { title: string; body: string };
  endsUp: { title: string; body: string };
  endsSafe: { title: string; body: string };
  endsDown: { title: string; body: string };
  resultUp: { title: string; body: string };
  resultStay: { title: string; body: string };
  resultDown: { title: string; body: string };
};

// {league} this league, {next} the one above, {to} where the learner lands, {n} XP still needed.
const COPY: Record<"en" | "ar" | "bn" | "ur", Copy> = {
  en: {
    midweekDown: {
      title: "🐢 The turtle just passed you in the {league}",
      body: "It's VERY slow, so that's saying something. {n} XP keeps you in the {league}!"
    },
    midweekSafe: {
      title: "🐇 The rabbit just hopped past you",
      body: "{n} XP more and you move up to the {next}. One lesson is about 10 XP!"
    },
    endsUp: {
      title: "🎉 You're moving up to the {next} tonight!",
      body: "Your camel is already packing its bags. The week ends at midnight."
    },
    endsSafe: {
      title: "⏰ The {league} ends tonight",
      body: "Just {n} XP to move up to the {next}. Your camel believes in you!"
    },
    endsDown: {
      title: "⏰ The {league} ends tonight",
      body: "{n} XP keeps you in the {league}. One quick lesson does it!"
    },
    resultUp: {
      title: "🏆 You moved up to the {to}!",
      body: "Your camel did a happy dance. A new week starts today, bismillah!"
    },
    resultStay: {
      title: "🛡️ You stayed in the {to}",
      body: "Solid week! A new one starts today. Can you climb higher?"
    },
    resultDown: {
      title: "🐪 This week you're in the {to}",
      body: "Every climb starts somewhere. Your camel saved you a spot near the top!"
    }
  },
  ar: {
    midweekDown: {
      title: "🐢 السلحفاة تجاوزتك للتو في {league}",
      body: "وهي بطيئة جدًا! {n} نقطة خبرة تبقيك في {league}."
    },
    midweekSafe: {
      title: "🐇 الأرنب قفز من أمامك للتو",
      body: "{n} نقطة خبرة أخرى وتصعد إلى {next}. الدرس الواحد نحو ١٠ نقاط!"
    },
    endsUp: {
      title: "🎉 ستصعد إلى {next} الليلة!",
      body: "جملك يحزم أمتعته منذ الآن. ينتهي الأسبوع عند منتصف الليل."
    },
    endsSafe: {
      title: "⏰ {league} ينتهي الليلة",
      body: "{n} نقطة خبرة فقط للصعود إلى {next}. جملك يثق بك!"
    },
    endsDown: {
      title: "⏰ {league} ينتهي الليلة",
      body: "{n} نقطة خبرة تبقيك في {league}. درس سريع واحد يكفي!"
    },
    resultUp: {
      title: "🏆 صعدت إلى {to}!",
      body: "جملك رقص من الفرح. أسبوع جديد يبدأ اليوم، بسم الله!"
    },
    resultStay: {
      title: "🛡️ بقيت في {to}",
      body: "أسبوع رائع! أسبوع جديد يبدأ اليوم. هل تصعد أعلى؟"
    },
    resultDown: {
      title: "🐪 أنت هذا الأسبوع في {to}",
      body: "كل صعود يبدأ من مكان ما. جملك حجز لك مكانًا قرب القمة!"
    }
  },
  bn: {
    midweekDown: {
      title: "🐢 কচ্ছপ এইমাত্র {league}-এ তোমাকে পেরিয়ে গেল",
      body: "সে কিন্তু খুবই ধীর! {n} XP পেলে তুমি {league}-এ থাকবে।"
    },
    midweekSafe: {
      title: "🐇 খরগোশ এইমাত্র লাফিয়ে তোমাকে পেরিয়ে গেল",
      body: "আর {n} XP হলেই তুমি {next}-এ উঠবে। একটা পাঠে প্রায় ১০ XP!"
    },
    endsUp: {
      title: "🎉 আজ রাতে তুমি {next}-এ উঠছ!",
      body: "তোমার উট এখনই ব্যাগ গোছাচ্ছে। সপ্তাহ শেষ মাঝরাতে।"
    },
    endsSafe: {
      title: "⏰ {league} আজ রাতে শেষ",
      body: "মাত্র {n} XP হলেই {next}-এ উঠবে। তোমার উট তোমার ওপর ভরসা রাখে!"
    },
    endsDown: {
      title: "⏰ {league} আজ রাতে শেষ",
      body: "{n} XP পেলে তুমি {league}-এ থাকবে। একটা ছোট পাঠই যথেষ্ট!"
    },
    resultUp: {
      title: "🏆 তুমি {to}-এ উঠে গেছ!",
      body: "তোমার উট খুশিতে নাচছে। আজ নতুন সপ্তাহ শুরু, বিসমিল্লাহ!"
    },
    resultStay: {
      title: "🛡️ তুমি {to}-এ রয়ে গেছ",
      body: "দারুণ সপ্তাহ! আজ নতুন সপ্তাহ শুরু। আরও ওপরে উঠবে?"
    },
    resultDown: {
      title: "🐪 এই সপ্তাহে তুমি {to}-এ",
      body: "প্রতিটা ওঠা কোথাও থেকে শুরু হয়। তোমার উট ওপরে তোমার জন্য জায়গা রেখেছে!"
    }
  },
  ur: {
    midweekDown: {
      title: "🐢 کچھوا ابھی {league} میں آپ سے آگے نکل گیا",
      body: "اور وہ بہت سست ہے! {n} XP آپ کو {league} میں رکھے گا۔"
    },
    midweekSafe: {
      title: "🐇 خرگوش ابھی چھلانگ لگا کر آگے نکل گیا",
      body: "مزید {n} XP اور آپ {next} میں پہنچ جائیں گے۔ ایک سبق تقریباً ۱۰ XP ہے!"
    },
    endsUp: {
      title: "🎉 آج رات آپ {next} میں جا رہے ہیں!",
      body: "آپ کا اونٹ ابھی سے سامان باندھ رہا ہے۔ ہفتہ آدھی رات کو ختم ہوگا۔"
    },
    endsSafe: {
      title: "⏰ {league} آج رات ختم",
      body: "صرف {n} XP اور آپ {next} میں۔ آپ کے اونٹ کو آپ پر بھروسا ہے!"
    },
    endsDown: {
      title: "⏰ {league} آج رات ختم",
      body: "{n} XP آپ کو {league} میں رکھے گا۔ ایک جلدی سبق کافی ہے!"
    },
    resultUp: {
      title: "🏆 آپ {to} میں پہنچ گئے!",
      body: "آپ کا اونٹ خوشی سے ناچ رہا ہے۔ نیا ہفتہ آج سے، بسم اللہ!"
    },
    resultStay: {
      title: "🛡️ آپ {to} میں رہے",
      body: "زبردست ہفتہ! نیا ہفتہ آج سے۔ کیا اوپر جائیں گے؟"
    },
    resultDown: {
      title: "🐪 اس ہفتے آپ {to} میں ہیں",
      body: "ہر چڑھائی کہیں سے شروع ہوتی ہے۔ آپ کے اونٹ نے اوپر آپ کی جگہ رکھی ہے!"
    }
  }
};

const LEAGUE_NAMES: Record<"en" | "ar" | "bn" | "ur", Record<LeagueId, string>> = {
  en: {
    bronze: "Bronze League",
    silver: "Silver League",
    gold: "Gold League",
    pearl: "Pearl League",
    ruby: "Ruby League",
    emerald: "Emerald League",
    diamond: "Diamond League"
  },
  ar: {
    bronze: "الدوري البرونزي",
    silver: "الدوري الفضي",
    gold: "الدوري الذهبي",
    pearl: "دوري اللؤلؤ",
    ruby: "دوري الياقوت",
    emerald: "دوري الزمرد",
    diamond: "دوري الألماس"
  },
  bn: {
    bronze: "ব্রোঞ্জ লিগ",
    silver: "সিলভার লিগ",
    gold: "গোল্ড লিগ",
    pearl: "মুক্তা লিগ",
    ruby: "রুবি লিগ",
    emerald: "পান্না লিগ",
    diamond: "ডায়মন্ড লিগ"
  },
  ur: {
    bronze: "برونز لیگ",
    silver: "سلور لیگ",
    gold: "گولڈ لیگ",
    pearl: "موتی لیگ",
    ruby: "یاقوت لیگ",
    emerald: "زمرد لیگ",
    diamond: "ہیرا لیگ"
  }
};

function copyFor(language: SupportedLanguage) {
  const key = (language in COPY ? language : "en") as keyof typeof COPY;
  return { copy: COPY[key], names: LEAGUE_NAMES[key] };
}

function fill(text: string, values: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}

/** The local time a step goes out for the league week that started on `weekStart` (a Monday, YYYY-MM-DD). */
function slotTime(weekStart: string, step: LeagueReminderStep) {
  const [year, month, day] = weekStart.split("-").map(Number);
  const when = WHEN[step];
  return new Date(year, month - 1, day + when.day, when.hour, 0, 0, 0);
}

/**
 * The league reminders still ahead this week, worded from the learner's current league XP. The app plans them
 * again after every lesson, so the numbers are always up to date when one arrives.
 */
export function planLeagueReminders(user: UserProfile | undefined, language: SupportedLanguage, now = Date.now()): LeagueReminderSlot[] {
  if (!user || user.reminderPreferences?.islamicReminders === false) {
    return [];
  }

  const league = user.league;
  const lastLearningAt = getLastLearningTime(user);
  // Only this week's numbers can be trusted; an older week settles the next time the app opens.
  if (!league || !lastLearningAt || league.weekStart !== leagueWeekKey(new Date(now))) {
    return [];
  }

  const tier = Number.isInteger(league.tier) ? Math.max(0, Math.min(TOP_TIER, league.tier)) : 0;
  const xp = Math.max(0, league.xp || 0);
  const current = leagueAt(tier);
  const above = tier < TOP_TIER ? LEAGUES[tier + 1] : undefined;
  const zone = leagueZone({ tier, xp });
  const { copy, names } = copyFor(language);
  const values = (extra: Record<string, string> = {}) => ({
    league: names[current.id],
    next: above ? names[above.id] : names[current.id],
    ...extra
  });
  const slots: LeagueReminderSlot[] = [];

  const add = (step: LeagueReminderStep, message: { title: string; body: string }, extra: Record<string, string> = {}) => {
    const at = slotTime(league.weekStart, step);
    if (at.getTime() <= now || at.getTime() - lastLearningAt > MAX_AWAY_MS) {
      return;
    }
    // Already learned today before this time: no nagging.
    if (step !== "result" && isSameCalendarDay(lastLearningAt, at.getTime()) && lastLearningAt < at.getTime()) {
      return;
    }
    const filled = values(extra);
    slots.push({ id: LEAGUE_REMINDER_IDS[step], step, at, title: fill(message.title, filled), body: fill(message.body, filled) });
  };

  const xpToUp = above && current.up !== undefined ? localDigits(current.up - xp, language) : "";
  const xpToKeep = localDigits(current.keep - xp, language);

  // Thursday: someone "passes" you, unless you're already moving up or there's nothing to lose and nowhere to go.
  if (zone === "down") {
    add("midweek", copy.midweekDown, { n: xpToKeep });
  } else if (zone === "safe" && above) {
    add("midweek", copy.midweekSafe, { n: xpToUp });
  }

  // Sunday: the week ends tonight. Diamond learners who are safe are left in peace.
  if (zone === "up") {
    add("endsTonight", copy.endsUp);
  } else if (zone === "down") {
    add("endsTonight", copy.endsDown, { n: xpToKeep });
  } else if (above) {
    add("endsTonight", copy.endsSafe, { n: xpToUp });
  }

  // Monday morning: where the week left you. A Bronze week with no XP is no league at all.
  const to = nextTier(tier, xp);
  if (xp > 0 || to !== tier) {
    const message = to > tier ? copy.resultUp : to < tier ? copy.resultDown : copy.resultStay;
    add("result", message, { to: names[leagueAt(to).id] });
  }

  return slots;
}
