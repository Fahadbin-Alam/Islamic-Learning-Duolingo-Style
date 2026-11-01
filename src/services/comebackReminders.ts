import type { SupportedLanguage } from "../types";

// Playful come-back reminders in the path camel's voice. The longer a learner is away the
// sillier the camel gets, and after a month it says it will stop. Every step has a plain
// funny message, one with a gentle Islamic touch and an extra-silly one; the streak one says
// how long the streak is. Kept kind and kid-safe:
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

// A third, extra-silly message for each step: the camel's wild ideas while it waits. Same rules: kind,
// kid-safe, no guilt.
const SILLY_COPY: Partial<Record<SupportedLanguage, Record<ComebackStep, ComebackMessage>>> = {
  en: {
    resume: { title: "🐪 Your lesson is sitting all alone", body: "It keeps asking where you went. Come finish it, it's really short!" },
    streak: { title: "🔥 Breaking news: your streak wants a snack", body: "It only eats lessons. One small one tonight will do!" },
    day2: { title: "🐪 Your camel tried learning without you", body: "It answered \"banana\" to every question. Please help!" },
    day3: { title: "🌴 Even the palm trees are asking about you", body: "Your camel told them you'd be back today. Prove it right!" },
    day5: { title: "🐪 Your camel is practicing its sad face", body: "It's getting really good at it. One lesson turns it back into a smile!" },
    day7: { title: "🐪 Your camel made a \"Missing friend\" poster", body: "Last seen: one week ago. Reward: one very happy camel. Come back!" },
    day14: { title: "🐪 Grass grew on your path while you were away", body: "Your camel is eating it to keep busy. Come walk the path again!" },
    day30: { title: "🐪 Okay, your camel is taking a little break too", body: "No more reminders for now. Your path stays right here, whenever you want it." }
  },
  ar: {
    resume: { title: "🐪 درسك جالس وحده", body: "يسأل باستمرار أين ذهبت. تعال وأكمله، إنه قصير جدًا!" },
    streak: { title: "🔥 خبر عاجل: سلسلتك جائعة", body: "إنها لا تأكل إلا الدروس. درس صغير الليلة يكفي!" },
    day2: { title: "🐪 جملك حاول التعلّم من دونك", body: "أجاب «موزة» عن كل سؤال. أرجوك ساعده!" },
    day3: { title: "🌴 حتى النخيل يسأل عنك", body: "جملك أخبرها أنك ستعود اليوم. أثبت أنه على حق!" },
    day5: { title: "🐪 جملك يتدرّب على وجهه الحزين", body: "صار بارعًا فيه جدًا. درس واحد يعيد إليه ابتسامته!" },
    day7: { title: "🐪 جملك علّق ملصق «صديق مفقود»", body: "آخر ظهور: قبل أسبوع. المكافأة: جمل سعيد جدًا. عد إلينا!" },
    day14: { title: "🐪 نبت العشب على طريقك في غيابك", body: "جملك يأكله ليمضي الوقت. عد وامشِ في طريقك من جديد!" },
    day30: { title: "🐪 حسنًا، جملك سيأخذ استراحة صغيرة أيضًا", body: "لا تذكيرات أخرى الآن. طريقك باقٍ هنا متى ما أردته." }
  },
  bn: {
    resume: { title: "🐪 তোমার পাঠটা একা বসে আছে", body: "বারবার জিজ্ঞেস করছে তুমি কোথায় গেলে। এসে শেষ করো, খুব ছোট!" },
    streak: { title: "🔥 ব্রেকিং নিউজ: তোমার স্ট্রিকের খিদে পেয়েছে", body: "সে শুধু পাঠ খায়। আজ রাতে একটা ছোট পাঠ হলেই চলবে!" },
    day2: { title: "🐪 তোমার উট তোমাকে ছাড়া শিখতে চেষ্টা করেছে", body: "সব প্রশ্নের উত্তর দিয়েছে \"কলা\"। প্লিজ সাহায্য করো!" },
    day3: { title: "🌴 খেজুর গাছগুলোও তোমার খোঁজ নিচ্ছে", body: "উট ওদের বলেছে তুমি আজ ফিরবে। প্রমাণ করো সে ঠিক!" },
    day5: { title: "🐪 তোমার উট মন খারাপের মুখ অনুশীলন করছে", body: "সে এতে খুব পাকা হয়ে গেছে। একটা পাঠেই আবার হাসি ফিরবে!" },
    day7: { title: "🐪 তোমার উট \"হারানো বন্ধু\" পোস্টার লাগিয়েছে", body: "শেষ দেখা: এক সপ্তাহ আগে। পুরস্কার: একটা খুশি উট। ফিরে এসো!" },
    day14: { title: "🐪 তুমি নেই, তাই পথে ঘাস গজিয়েছে", body: "উট সময় কাটাতে সেগুলো খাচ্ছে। এসে আবার পথে হাঁটো!" },
    day30: { title: "🐪 ঠিক আছে, তোমার উটও একটু বিশ্রাম নিচ্ছে", body: "আপাতত আর রিমাইন্ডার নয়। যখন চাও, তোমার পথ এখানেই আছে।" }
  },
  ur: {
    resume: { title: "🐪 آپ کا سبق اکیلا بیٹھا ہے", body: "بار بار پوچھ رہا ہے کہ آپ کہاں گئے۔ آئیں اسے مکمل کریں، بہت چھوٹا ہے!" },
    streak: { title: "🔥 تازہ خبر: آپ کی اسٹریک کو بھوک لگی ہے", body: "یہ صرف سبق کھاتی ہے۔ آج رات ایک چھوٹا سبق کافی ہے!" },
    day2: { title: "🐪 آپ کے اونٹ نے آپ کے بغیر سیکھنے کی کوشش کی", body: "اس نے ہر سوال کا جواب \"کیلا\" دیا۔ براہِ کرم مدد کریں!" },
    day3: { title: "🌴 کھجور کے درخت بھی آپ کا پوچھ رہے ہیں", body: "اونٹ نے انہیں بتایا کہ آپ آج آئیں گے۔ اسے سچا ثابت کریں!" },
    day5: { title: "🐪 آپ کا اونٹ اداس چہرہ بنانے کی مشق کر رہا ہے", body: "وہ اس میں ماہر ہو گیا ہے۔ ایک سبق اس کی مسکراہٹ واپس لے آئے گا!" },
    day7: { title: "🐪 آپ کے اونٹ نے \"گمشدہ دوست\" کا پوسٹر لگایا", body: "آخری بار دیکھا گیا: ایک ہفتہ پہلے۔ انعام: ایک خوش اونٹ۔ واپس آئیں!" },
    day14: { title: "🐪 آپ کے جانے کے بعد راستے پر گھاس اگ آئی", body: "اونٹ وقت گزارنے کے لیے اسے کھا رہا ہے۔ آئیں اور پھر سے چلیں!" },
    day30: { title: "🐪 ٹھیک ہے، آپ کا اونٹ بھی تھوڑا آرام کر رہا ہے", body: "فی الحال مزید یاد دہانیاں نہیں۔ جب چاہیں، آپ کا راستہ یہیں ہے۔" }
  }
};

// The streak reminder when there is a real streak to save, so the learner knows exactly what's at stake:
// it says how many days, and mentions a streak freeze when one is standing by.
const STREAK_COUNT_COPY: Partial<Record<SupportedLanguage, { title: string; body: string; freezeBody: string }>> = {
  en: {
    title: "🔥 Your {count}-day streak is sweating",
    body: "One short lesson tonight keeps all {count} days safe. You've got this!",
    freezeBody: "A streak freeze is standing by, but who needs it? One quick lesson tonight!"
  },
  ar: {
    title: "🔥 سلسلتك وصلت إلى {count} وهي قلقة الآن",
    body: "درس قصير الليلة يحفظ كل أيامك. أنت قادر!",
    freezeBody: "تجميد السلسلة جاهز، لكن من يحتاجه؟ درس سريع الليلة!"
  },
  bn: {
    title: "🔥 তোমার {count} দিনের স্ট্রিক ঘামছে",
    body: "আজ রাতে একটা ছোট পাঠে সব {count} দিন নিরাপদ। তুমি পারবে!",
    freezeBody: "স্ট্রিক ফ্রিজ তৈরি আছে, কিন্তু দরকার কী? আজ রাতে একটা ছোট পাঠ!"
  },
  ur: {
    title: "🔥 آپ کی {count} دن کی اسٹریک کو پسینہ آ رہا ہے",
    body: "آج رات ایک چھوٹا سبق تمام {count} دن محفوظ رکھے گا۔ آپ کر سکتے ہیں!",
    freezeBody: "اسٹریک فریز تیار ہے، مگر اس کی ضرورت کیا؟ آج رات ایک جلدی سبق!"
  }
};

const DIGITS: Partial<Record<SupportedLanguage, string>> = { ar: "٠١٢٣٤٥٦٧٨٩", bn: "০১২৩৪৫৬৭৮৯", ur: "۰۱۲۳۴۵۶۷۸۹" };

/** A number in the language's own digits, like the rest of the copy (٧ in Arabic, ৭ in Bangla). */
export function localDigits(value: number, language: SupportedLanguage) {
  const digits = DIGITS[language];
  const plain = String(Math.round(value));
  return digits ? plain.replace(/\d/g, (digit) => digits[Number(digit)]) : plain;
}

/** What the learner has going on, so a reminder can say what's up (how long the streak is, a freeze ready). */
export interface ComebackStatus {
  streakDays?: number;
  streakFreezes?: number;
}

const VARIANTS = [COPY, ISLAMIC_COPY, SILLY_COPY];

/** Which of a step's three messages a learner gets; changes with the day of their last lesson so repeat absences differ. */
export function messageVariant(lastLearningAt: number) {
  return Math.floor(lastLearningAt / 86_400_000) % VARIANTS.length;
}

export function comebackMessage(language: SupportedLanguage, step: ComebackStep, variant = 0, status: ComebackStatus = {}): ComebackMessage {
  const streak = Math.floor(status.streakDays ?? 0);
  // A streak of two days or more is worth naming: "Your 12-day streak is sweating".
  if (step === "streak" && streak >= 2 && variant % VARIANTS.length !== 1) {
    const copy = STREAK_COUNT_COPY[language] ?? STREAK_COUNT_COPY.en!;
    const count = localDigits(streak, language);
    return {
      title: copy.title.replace("{count}", count),
      body: ((status.streakFreezes ?? 0) > 0 ? copy.freezeBody : copy.body).replace("{count}", count)
    };
  }
  const table = VARIANTS[((variant % VARIANTS.length) + VARIANTS.length) % VARIANTS.length];
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
