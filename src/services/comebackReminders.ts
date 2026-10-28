import type { SupportedLanguage } from "../types";

// Playful come-back reminders in the path camel's voice. The longer a learner is away the
// sillier the camel gets, and after a month it says it will stop. Every step has a plain
// funny message and one with a gentle Islamic touch. Kept kind and kid-safe:
// no guilt, no fear, nothing about sin or reward, just a camel who misses you.

export type ComebackStep = "resume" | "streak" | "day2" | "day3" | "day5" | "day7" | "day14" | "day30";

export interface ComebackMessage {
  title: string;
  body: string;
}

/** Whole days after the last lesson's day on which an evening reminder goes out. Day 1 is the streak one. */
export const COMEBACK_DAYS = [1, 2, 3, 5, 7, 14, 30] as const;

const STEP_FOR_DAY: Record<(typeof COMEBACK_DAYS)[number], ComebackStep> = {
  1: "streak",
  2: "day2",
  3: "day3",
  5: "day5",
  7: "day7",
  14: "day14",
  30: "day30"
};

const COPY: Partial<Record<SupportedLanguage, Record<ComebackStep, ComebackMessage>>> = {
  en: {
    resume: {
      title: "🐪 Psst... your camel is still waiting",
      body: "You stopped halfway down the path. One quick lesson and we're moving again!"
    },
    streak: {
      title: "🔥 Your streak is getting nervous",
      body: "It's not too late! One short lesson tonight keeps it alive."
    },
    day2: {
      title: "🐪 As-salamu alaykum? Anyone there?",
      body: "Your camel checked the path twice today. Just one lesson?"
    },
    day3: {
      title: "🐪 Your camel is pretending not to miss you",
      body: "It's not working. Come learn something good today."
    },
    day5: {
      title: "🐪 Your camel started talking to a palm tree",
      body: "The palm tree never answers. Come back for a quick lesson!"
    },
    day7: {
      title: "🐪 One whole week! Your camel has been counting",
      body: "7 days, 0 lessons, lots of sad humming. Two minutes fixes everything."
    },
    day14: {
      title: "🐪 Your camel wrote you a letter",
      body: "\"Dear friend, the path is quiet without you. See you soon, in sha Allah.\""
    },
    day30: {
      title: "🐪 These reminders don't seem to be working",
      body: "So your camel will stop sending them for now. Your path is here whenever you're ready."
    }
  },
  ar: {
    resume: {
      title: "🐪 مرحبًا... جملك ما زال ينتظرك",
      body: "توقفت في منتصف الطريق. درس سريع واحد ونعود للمسير!"
    },
    streak: {
      title: "🔥 سلسلتك بدأت تقلق",
      body: "لم يفت الأوان! درس قصير الليلة يحافظ عليها."
    },
    day2: {
      title: "🐪 السلام عليكم؟ هل من أحد هنا؟",
      body: "جملك تفقّد الطريق مرتين اليوم. درس واحد فقط؟"
    },
    day3: {
      title: "🐪 جملك يتظاهر بأنه لا يشتاق إليك",
      body: "لكنه لم ينجح. تعال وتعلّم شيئًا طيبًا اليوم."
    },
    day5: {
      title: "🐪 جملك بدأ يتحدث مع نخلة",
      body: "النخلة لا ترد أبدًا. عد لدرس سريع!"
    },
    day7: {
      title: "🐪 أسبوع كامل! جملك يعدّ الأيام",
      body: "٧ أيام، ولا درس، وكثير من الدندنة الحزينة. دقيقتان تصلحان كل شيء."
    },
    day14: {
      title: "🐪 جملك كتب لك رسالة",
      body: "«صديقي العزيز، الطريق هادئ من دونك. أراك قريبًا إن شاء الله.»"
    },
    day30: {
      title: "🐪 يبدو أن هذه التذكيرات لا تنفع",
      body: "لذلك سيتوقف جملك عن إرسالها الآن. طريقك هنا متى ما كنت مستعدًا."
    }
  },
  bn: {
    resume: {
      title: "🐪 এই যে... তোমার উট এখনও অপেক্ষা করছে",
      body: "তুমি পথের মাঝখানে থেমে গেছ। একটা ছোট পাঠ, আবার চলা শুরু!"
    },
    streak: {
      title: "🔥 তোমার স্ট্রিক ভয় পাচ্ছে",
      body: "এখনও দেরি হয়নি! আজ রাতে একটা ছোট পাঠ করলেই স্ট্রিক বেঁচে যাবে।"
    },
    day2: {
      title: "🐪 আসসালামু আলাইকুম? কেউ আছ?",
      body: "তোমার উট আজ দুইবার পথ দেখে এসেছে। একটা পাঠ হবে?"
    },
    day3: {
      title: "🐪 তোমার উট ভান করছে সে তোমাকে মিস করছে না",
      body: "কিন্তু কাজ হচ্ছে না। আজ এসে ভালো কিছু শিখে যাও।"
    },
    day5: {
      title: "🐪 তোমার উট এখন খেজুর গাছের সাথে কথা বলে",
      body: "খেজুর গাছ কখনো উত্তর দেয় না। একটা ছোট পাঠের জন্য ফিরে এসো!"
    },
    day7: {
      title: "🐪 পুরো এক সপ্তাহ! তোমার উট দিন গুনছে",
      body: "৭ দিন, ০ পাঠ, অনেক মন খারাপের গুনগুন। দুই মিনিটেই সব ঠিক।"
    },
    day14: {
      title: "🐪 তোমার উট তোমাকে একটা চিঠি লিখেছে",
      body: "\"প্রিয় বন্ধু, তুমি ছাড়া পথটা চুপচাপ। শিগগিরই দেখা হবে, ইনশাআল্লাহ।\""
    },
    day30: {
      title: "🐪 মনে হচ্ছে এই রিমাইন্ডারে কাজ হচ্ছে না",
      body: "তাই তোমার উট এখন এগুলো পাঠানো বন্ধ রাখবে। যখন চাও, তোমার পথ এখানেই আছে।"
    }
  },
  ur: {
    resume: {
      title: "🐪 سنیں... آپ کا اونٹ ابھی تک انتظار کر رہا ہے",
      body: "آپ راستے کے بیچ میں رک گئے۔ ایک چھوٹا سا سبق، اور ہم پھر چل پڑیں!"
    },
    streak: {
      title: "🔥 آپ کی اسٹریک گھبرا رہی ہے",
      body: "ابھی دیر نہیں ہوئی! آج رات ایک چھوٹا سبق اسے بچا لے گا۔"
    },
    day2: {
      title: "🐪 السلام علیکم؟ کوئی ہے؟",
      body: "آپ کے اونٹ نے آج دو بار راستہ دیکھا۔ بس ایک سبق؟"
    },
    day3: {
      title: "🐪 آپ کا اونٹ ظاہر کر رہا ہے کہ اسے آپ کی یاد نہیں آتی",
      body: "مگر بات بن نہیں رہی۔ آج آئیں اور کچھ اچھا سیکھیں۔"
    },
    day5: {
      title: "🐪 آپ کا اونٹ اب کھجور کے درخت سے باتیں کرتا ہے",
      body: "درخت کبھی جواب نہیں دیتا۔ ایک چھوٹے سبق کے لیے واپس آئیں!"
    },
    day7: {
      title: "🐪 پورا ایک ہفتہ! آپ کا اونٹ دن گن رہا ہے",
      body: "۷ دن، ۰ سبق، اور بہت سی اداس گنگناہٹ۔ دو منٹ میں سب ٹھیک ہو جائے گا۔"
    },
    day14: {
      title: "🐪 آپ کے اونٹ نے آپ کو خط لکھا ہے",
      body: "\"پیارے دوست، آپ کے بغیر راستہ سنسان ہے۔ جلد ملیں گے، ان شاء اللہ۔\""
    },
    day30: {
      title: "🐪 لگتا ہے یہ یاد دہانیاں کام نہیں کر رہیں",
      body: "اس لیے آپ کا اونٹ ابھی انہیں بھیجنا بند کر رہا ہے۔ جب چاہیں، آپ کا راستہ یہیں ہے۔"
    }
  }
};

// A second message for each step with a gentle Islamic touch. Each line is either plain
// everyday Islamic words (Bismillah, Alhamdulillah, salaam) or a well-known sahih hadith:
// "the most beloved deeds to Allah are the most regular, even if small" (Bukhari 6464),
// "whoever takes a path seeking knowledge, Allah makes easy a path to Jannah" (Muslim 2699),
// "your smile for your brother is charity" (Tirmidhi 1956), "the best of you learn the Quran
// and teach it" (Bukhari 5027). Arabic keeps the hadith's own words where it quotes one.
const ISLAMIC_COPY: Partial<Record<SupportedLanguage, Record<ComebackStep, ComebackMessage>>> = {
  en: {
    resume: { title: "🐪 Bismillah, let's finish the path!", body: "Your next circle is one tap away. Say Bismillah and go!" },
    streak: { title: "🔥 A little good every day counts", body: "Allah loves good deeds done regularly, even small ones. One lesson tonight?" },
    day2: { title: "🐪 Your camel said Alhamdulillah... then looked for you", body: "Today is a great day to learn something new. Come back for one lesson!" },
    day3: { title: "🐪 Seeking knowledge is a path to Jannah", body: "And your camel is standing right on it. Come walk with us!" },
    day5: { title: "🐪 Smile, it's sadaqah! 😊", body: "Now come back and learn something to smile about." },
    day7: { title: "🐪 7 days! Your camel misses your salaam", body: "Come back and say As-salamu alaykum. Your path missed you." },
    day14: { title: "🐪 Two weeks! Time to be the best of you", body: "The Prophet ﷺ said the best of you learn the Quran and teach it." },
    day30: { title: "🐪 Your camel will stop the reminders now", body: "Your path is waiting. In sha Allah you'll be back soon. We'll be here!" }
  },
  ar: {
    resume: { title: "🐪 بسم الله، لنكمل الطريق!", body: "دائرتك التالية على بُعد لمسة. قل بسم الله وانطلق!" },
    streak: { title: "🔥 القليل من الخير كل يوم له قيمة", body: "«أحبّ الأعمال إلى الله أدومها وإن قلّ». درس واحد الليلة؟" },
    day2: { title: "🐪 جملك قال الحمد لله... ثم بحث عنك", body: "اليوم يوم رائع لتتعلم شيئًا جديدًا. عد لدرس واحد!" },
    day3: { title: "🐪 طلب العلم طريق إلى الجنة", body: "وجملك واقف عليه الآن. تعال وامشِ معنا!" },
    day5: { title: "🐪 ابتسم، فالابتسامة صدقة 😊", body: "والآن عد وتعلّم شيئًا يجعلك تبتسم." },
    day7: { title: "🐪 ٧ أيام! جملك يشتاق إلى سلامك", body: "عد وقل السلام عليكم. طريقك اشتاق إليك." },
    day14: { title: "🐪 أسبوعان! حان وقت أن تكون من خيركم", body: "قال النبي ﷺ: «خيركم من تعلّم القرآن وعلّمه»." },
    day30: { title: "🐪 سيتوقف جملك عن التذكير الآن", body: "طريقك ينتظرك، وإن شاء الله تعود قريبًا. نحن هنا!" }
  },
  bn: {
    resume: { title: "🐪 বিসমিল্লাহ, চলো পথটা শেষ করি!", body: "পরের সার্কেল মাত্র এক ট্যাপ দূরে। বিসমিল্লাহ বলে শুরু করো!" },
    streak: { title: "🔥 প্রতিদিন একটু ভালো কাজও অনেক", body: "আল্লাহ নিয়মিত ভালো কাজ ভালোবাসেন, ছোট হলেও। আজ রাতে একটা পাঠ?" },
    day2: { title: "🐪 উট আলহামদুলিল্লাহ বলল... তারপর তোমাকে খুঁজল", body: "নতুন কিছু শেখার জন্য আজ দারুণ দিন। একটা পাঠের জন্য ফিরে এসো!" },
    day3: { title: "🐪 জ্ঞান খোঁজা জান্নাতের পথ", body: "আর তোমার উট সেই পথেই দাঁড়িয়ে আছে। এসো, একসাথে হাঁটি!" },
    day5: { title: "🐪 হাসো, হাসিও সদকা 😊", body: "এখন ফিরে এসে হাসার মতো কিছু শিখে নাও।" },
    day7: { title: "🐪 ৭ দিন! উট তোমার সালাম মিস করছে", body: "ফিরে এসে সালাম দাও। তোমার পথ তোমাকে মিস করেছে।" },
    day14: { title: "🐪 দুই সপ্তাহ! এবার সেরাদের একজন হও", body: "নবী ﷺ বলেছেন, তোমাদের মধ্যে সেরা সে, যে কুরআন শেখে ও শেখায়।" },
    day30: { title: "🐪 তোমার উট এখন রিমাইন্ডার বন্ধ করছে", body: "তোমার পথ অপেক্ষা করছে। ইনশাআল্লাহ শিগগিরই ফিরবে। আমরা এখানেই আছি!" }
  },
  ur: {
    resume: { title: "🐪 بسم اللہ، آئیں راستہ مکمل کریں!", body: "اگلا دائرہ بس ایک ٹیپ دور ہے۔ بسم اللہ پڑھیں اور چل پڑیں!" },
    streak: { title: "🔥 روز تھوڑی سی نیکی بھی بہت ہے", body: "اللہ کو وہ نیک عمل پسند ہے جو ہمیشہ کیا جائے، چاہے تھوڑا ہو۔ آج رات ایک سبق؟" },
    day2: { title: "🐪 آپ کے اونٹ نے الحمدللہ کہا... پھر آپ کو ڈھونڈا", body: "کچھ نیا سیکھنے کے لیے آج بہترین دن ہے۔ ایک سبق کے لیے واپس آئیں!" },
    day3: { title: "🐪 علم کی تلاش جنت کا راستہ ہے", body: "اور آپ کا اونٹ اسی راستے پر کھڑا ہے۔ آئیں، ساتھ چلیں!" },
    day5: { title: "🐪 مسکرائیں، مسکراہٹ بھی صدقہ ہے 😊", body: "اب واپس آئیں اور کچھ ایسا سیکھیں جس پر مسکرا سکیں۔" },
    day7: { title: "🐪 ۷ دن! اونٹ کو آپ کا سلام یاد آ رہا ہے", body: "واپس آئیں اور السلام علیکم کہیں۔ آپ کا راستہ آپ کو یاد کر رہا ہے۔" },
    day14: { title: "🐪 دو ہفتے! اب بہترین لوگوں میں شامل ہوں", body: "نبی ﷺ نے فرمایا: تم میں سے بہترین وہ ہے جو قرآن سیکھے اور سکھائے۔" },
    day30: { title: "🐪 آپ کا اونٹ اب یاد دہانیاں بند کر رہا ہے", body: "آپ کا راستہ منتظر ہے۔ ان شاء اللہ آپ جلد لوٹیں گے۔ ہم یہیں ہیں!" }
  }
};

/** Which of a step's two messages a learner gets; changes with the day of their last lesson so repeat absences differ. */
export function messageVariant(lastLearningAt: number) {
  return Math.floor(lastLearningAt / 86_400_000) % 2;
}

export function comebackMessage(language: SupportedLanguage, step: ComebackStep, variant = 0): ComebackMessage {
  const table = variant % 2 === 1 ? ISLAMIC_COPY : COPY;
  return (table[language] ?? table.en!)[step];
}

/** The step for an evening reminder `daysAway` calendar days after the last lesson, if one goes out that day. */
export function stepForDay(daysAway: number): ComebackStep | undefined {
  return STEP_FOR_DAY[daysAway as (typeof COMEBACK_DAYS)[number]];
}

/** The latest step a learner who has been away `daysAway` days has reached (web catches up on open). */
export function latestStepForDays(daysAway: number): ComebackStep | undefined {
  const day = [...COMEBACK_DAYS].reverse().find((value) => value <= daysAway);
  return day === undefined ? undefined : STEP_FOR_DAY[day];
}

export function calendarDaysBetween(from: number, to: number) {
  const start = new Date(from);
  start.setHours(12, 0, 0, 0);
  const end = new Date(to);
  end.setHours(12, 0, 0, 0);
  return Math.round((end.getTime() - start.getTime()) / 86_400_000);
}
