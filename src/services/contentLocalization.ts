import type { Challenge, Lesson, LessonSource, SupportedLanguage } from "../types";

type LocalizedValue = Record<Exclude<SupportedLanguage, "en">, string>;

function makeLocalized(fr: string, ar: string, bn: string, ur: string, hi: string): LocalizedValue {
  return { fr, ar, bn, ur, hi };
}

const EXACT_REPLACEMENTS: Array<[string, LocalizedValue]> = [
  ["True", makeLocalized("Vrai", "صح", "সত্য", "درست", "सही")],
  ["False", makeLocalized("Faux", "خطأ", "মিথ্যা", "غلط", "गलत")],
  ["Which reference is actually used in this lesson?", makeLocalized("Quelle référence est réellement utilisée dans cette leçon ?", "ما المرجع المستخدم فعلًا في هذا الدرس؟", "এই পাঠে আসলে কোন রেফারেন্সটি ব্যবহার করা হয়েছে?", "اس سبق میں اصل میں کون سا حوالہ استعمال ہوا ہے؟", "इस पाठ में वास्तव में कौन सा संदर्भ इस्तेमाल हुआ है?")],
  ["Which reference best anchors this lesson's evidence?", makeLocalized("Quelle référence ancre le mieux la preuve de cette leçon ?", "أي مرجع يثبت دليل هذا الدرس بأفضل صورة؟", "কোন রেফারেন্সটি এই পাঠের প্রমাণকে সবচেয়ে ভালোভাবে ধরে?", "کون سا حوالہ اس سبق کی دلیل کو سب سے بہتر مضبوط کرتا ہے؟", "कौन सा संदर्भ इस पाठ की दलील को सबसे बेहतर आधार देता है?")],
  ["Later lessons start asking you to notice the evidence, not only the headline.", makeLocalized("Les leçons suivantes commencent à vous demander de remarquer la preuve, pas seulement l'idée générale.", "تبدأ الدروس اللاحقة بطلب ملاحظة الدليل لا العنوان فقط.", "পরের পাঠগুলোতে শুধু শিরোনাম নয়, প্রমাণও লক্ষ্য করতে হবে।", "اگلے اسباق میں صرف عنوان نہیں بلکہ دلیل کو بھی دیکھنا ہوگا۔", "आगे के पाठ सिर्फ शीर्षक नहीं बल्कि दलील पर भी ध्यान दिलाते हैं।")],
  ["Which summary best brings this whole lesson together?", makeLocalized("Quel résumé rassemble le mieux toute cette leçon ?", "أي ملخص يجمع هذا الدرس كله بأفضل صورة؟", "কোন সারসংক্ষেপটি পুরো পাঠটিকে সবচেয়ে ভালোভাবে একসাথে আনে?", "کون سا خلاصہ پورے سبق کو سب سے بہتر جمع کرتا ہے؟", "कौन सा सारांश पूरे पाठ को सबसे अच्छे ढंग से साथ लाता है?")],
  ["A source from a different lesson", makeLocalized("Une source d'une autre leçon", "مصدر من درس آخر", "অন্য একটি পাঠের উৎস", "کسی دوسرے سبق کا ماخذ", "किसी दूसरे पाठ का स्रोत")],
  ["A source that belongs somewhere else", makeLocalized("Une source qui appartient à un autre endroit", "مصدر يخص موضعًا آخر", "অন্য জায়গার একটি উৎস", "ایسا ماخذ جو کہیں اور کا ہے", "ऐसा स्रोत जो किसी और जगह का है")],
  ["See source", makeLocalized("Voir la source", "انظر المصدر", "উৎস দেখুন", "ماخذ دیکھیں", "स्रोत देखें")],
  ["YouTube video guide", makeLocalized("Guide vidéo YouTube", "دليل فيديو من يوتيوب", "ইউটিউব ভিডিও গাইড", "یوٹیوب ویڈیو گائیڈ", "यूट्यूब वीडियो गाइड")],
  ["YouTube walk-through", makeLocalized("Guide visuel YouTube", "شرح مرئي من يوتيوب", "ইউটিউব ভিজ্যুয়াল গাইড", "یوٹیوب عملی رہنمائی", "यूट्यूब दृश्य मार्गदर्शिका")],
  ["Visual walkthrough", makeLocalized("Guide visuel", "شرح مرئي", "চোখে দেখা ধাপভিত্তিক গাইড", "عملی رہنمائی", "दृश्य चरण-दर-चरण गाइड")],
  ["Authentic", makeLocalized("Authentique", "صحيح", "সহীহ", "صحیح", "सहीह")],
  ["Quran", makeLocalized("Coran", "القرآن", "কুরআন", "قرآن", "कुरआन")]
];

const PHRASE_REPLACEMENTS: Array<[string, LocalizedValue]> = [
  ["According to this lesson", makeLocalized("Selon cette leçon", "وفقًا لهذا الدرس", "এই পাঠ অনুযায়ী", "اس سبق کے مطابق", "इस पाठ के अनुसार")],
  ["according to this lesson", makeLocalized("selon cette leçon", "وفقًا لهذا الدرس", "এই পাঠ অনুযায়ী", "اس سبق کے مطابق", "इस पाठ के अनुसार")],
  ["in this lesson", makeLocalized("dans cette leçon", "في هذا الدرس", "এই পাঠে", "اس سبق میں", "इस पाठ में")],
  ["this lesson", makeLocalized("cette leçon", "هذا الدرس", "এই পাঠ", "یہ سبق", "यह पाठ")],
  ["this topic", makeLocalized("ce thème", "هذا الموضوع", "এই বিষয়", "یہ موضوع", "यह विषय")],
  ["What should a Muslim say when", makeLocalized("Que doit dire un musulman quand", "ماذا يجب على المسلم أن يقول عندما", "একজন মুসলিম কী বলবে যখন", "ایک مسلمان کیا کہے جب", "एक मुसलमान क्या कहे जब")],
  ["What should a Muslim", makeLocalized("Que doit un musulman", "ماذا يجب على المسلم أن", "একজন মুসলিমের কী করা উচিত", "ایک مسلمان کو کیا", "एक मुसलमान को क्या")],
  ["What should", makeLocalized("Que devrait", "ماذا يجب أن", "কী করা উচিত", "کیا چاہیے کہ", "क्या करना चाहिए")],
  ["What does", makeLocalized("Que montre", "ماذا يبين", "কী দেখায়", "کیا دکھاتا ہے", "क्या दिखाता है")],
  ["What is", makeLocalized("Qu'est-ce que", "ما", "কি", "کیا", "क्या")],
  ["What are", makeLocalized("Que sont", "ما هي", "কি কী", "کیا ہیں", "क्या हैं")],
  ["What kind of", makeLocalized("Quel genre de", "ما نوع", "কী ধরনের", "کس قسم کا", "किस तरह का")],
  ["What quality", makeLocalized("Quelle qualité", "ما الصفة", "কোন গুণ", "کون سی خوبی", "कौन सी खूबी")],
  ["What major lesson", makeLocalized("Quelle grande leçon", "ما الدرس الكبير", "কোন বড় শিক্ষা", "کون سا بڑا سبق", "कौन सी बड़ी सीख")],
  ["What lesson", makeLocalized("Quelle leçon", "ما الدرس", "কোন শিক্ষা", "کون سا سبق", "कौन सा पाठ")],
  ["What special thing did", makeLocalized("Quelle chose spéciale a", "ما الشيء الخاص الذي", "কোন বিশেষ কাজটি", "کون سی خاص بات", "कौन सी खास बात")],
  ["What special thing is", makeLocalized("Quelle chose spéciale est", "ما الشيء الخاص في", "কোন বিশেষ বিষয়টি", "کون سی خاص چیز", "कौन सी खास चीज")],
  ["What special role did", makeLocalized("Quel rôle spécial a", "ما الدور الخاص الذي", "কোন বিশেষ ভূমিকা", "کون سا خاص کردار", "कौन सी खास भूमिका")],
  ["What special contribution of", makeLocalized("Quelle contribution spéciale de", "ما المساهمة الخاصة لـ", "কোন বিশেষ অবদান", "کون سی خاص خدمت", "कौन सा खास योगदान")],
  ["What shines most in", makeLocalized("Qu'est-ce qui brille le plus chez", "ما الذي يبرز أكثر في", "কোন জিনিসটি সবচেয়ে উজ্জ্বল", "کیا چیز سب سے زیادہ نمایاں ہے", "क्या बात सबसे ज़्यादा उभरती है")],
  ["What stands out in", makeLocalized("Qu'est-ce qui ressort dans", "ما الذي يبرز في", "কোন জিনিসটি চোখে পড়ে", "کیا چیز نمایاں ہے", "क्या बात उभरती है")],
  ["What stands out", makeLocalized("Qu'est-ce qui ressort", "ما الذي يبرز", "কী সবচেয়ে আলাদা", "کیا نمایاں ہے", "क्या सबसे उभरता है")],
  ["Which is the best way to", makeLocalized("Quelle est la meilleure façon de", "ما أفضل طريقة لـ", "কোনটি সবচেয়ে ভালো উপায়", "کون سا بہترین طریقہ ہے", "सबसे अच्छा तरीका क्या है")],
  ["Which phrase best describes", makeLocalized("Quelle phrase décrit le mieux", "أي عبارة تصف أفضل", "কোন বাক্যটি সবচেয়ে ভালোভাবে বোঝায়", "کون سا جملہ سب سے بہتر بیان کرتا ہے", "कौन सा वाक्य सबसे अच्छा बताता है")],
  ["Which picture fits this lesson best", makeLocalized("Quelle image correspond le mieux à cette leçon", "أي صورة تناسب هذا الدرس أكثر", "কোন ছবি এই পাঠের সাথে সবচেয়ে মানায়", "کون سی تصویر اس سبق سے سب سے زیادہ میل کھاتی ہے", "कौन सी तस्वीर इस पाठ से सबसे ज़्यादा मेल खाती है")],
  ["Which action matches this lesson best", makeLocalized("Quelle action correspond le mieux à cette leçon", "أي عمل يوافق هذا الدرس أكثر", "কোন কাজটি এই পাঠের সাথে সবচেয়ে ভালো মেলে", "کون سا عمل اس سبق سے سب سے بہتر میل کھاتا ہے", "कौन सा काम इस पाठ से सबसे अच्छा मेल खाता है")],
  ["Which action matches this lesson", makeLocalized("Quelle action correspond à cette leçon", "أي عمل يوافق هذا الدرس", "কোন কাজটি এই পাঠের সাথে মেলে", "کون سا عمل اس سبق سے میل کھاتا ہے", "कौन सा काम इस पाठ से मेल खाता है")],
  ["Which action fits this lesson best", makeLocalized("Quelle action convient le mieux à cette leçon", "أي عمل يناسب هذا الدرس أكثر", "কোন কাজটি এই পাঠের জন্য সবচেয়ে উপযুক্ত", "کون سا عمل اس سبق کے لیے سب سے مناسب ہے", "कौन सा काम इस पाठ के लिए सबसे उपयुक्त है")],
  ["Which habit fits this lesson best", makeLocalized("Quelle habitude convient le mieux à cette leçon", "أي عادة تناسب هذا الدرس أكثر", "কোন অভ্যাসটি এই পাঠের সাথে সবচেয়ে ভালো মানায়", "کون سی عادت اس سبق کے لیے سب سے مناسب ہے", "कौन सी आदत इस पाठ के लिए सबसे अच्छी है")],
  ["Which habit matches this lesson", makeLocalized("Quelle habitude correspond à cette leçon", "أي عادة توافق هذا الدرس", "কোন অভ্যাসটি এই পাঠের সাথে মেলে", "کون سی عادت اس سبق سے میل کھاتی ہے", "कौन सी आदत इस पाठ से मेल खाती है")],
  ["Which daily practice fits this topic best", makeLocalized("Quelle pratique quotidienne convient le mieux à ce thème", "أي ممارسة يومية تناسب هذا الموضوع أكثر", "কোন দৈনিক অভ্যাসটি এই বিষয়ের সাথে সবচেয়ে ভালো মানায়", "کون سی روزانہ کی مشق اس موضوع سے سب سے بہتر میل کھاتی ہے", "कौन सी रोज़ाना की आदत इस विषय से सबसे अच्छी तरह मेल खाती है")],
  ["Which question fits this lesson best", makeLocalized("Quelle question convient le mieux à cette leçon", "أي سؤال يناسب هذا الدرس أكثر", "কোন প্রশ্নটি এই পাঠের সাথে সবচেয়ে ভালো মেলে", "کون سا سوال اس سبق کے لیے سب سے مناسب ہے", "कौन सा सवाल इस पाठ के लिए सबसे अच्छा है")],
  ["How should a Muslim live with a spouse according to this lesson", makeLocalized("Comment un musulman doit-il vivre avec son époux selon cette leçon", "كيف ينبغي للمسلم أن يعيش مع زوجه وفقًا لهذا الدرس", "এই পাঠ অনুযায়ী একজন মুসলিম কীভাবে সঙ্গীর সাথে জীবনযাপন করবে", "اس سبق کے مطابق ایک مسلمان کو شریک حیات کے ساتھ کیسے رہنا چاہیے", "इस पाठ के अनुसार एक मुसलमान को जीवनसाथी के साथ कैसे रहना चाहिए")],
  ["How should a learner remember", makeLocalized("Comment l'apprenant doit-il se rappeler de", "كيف ينبغي للمتعلم أن يتذكر", "শিক্ষার্থী কীভাবে মনে রাখবে", "سیکھنے والے کو کیسے یاد رکھنا چاہیے", "सीखने वाले को कैसे याद रखना चाहिए")],
  ["How does this lesson complete the topic", makeLocalized("Comment cette leçon complète-t-elle le thème", "كيف يكمل هذا الدرس الموضوع", "এই পাঠটি কীভাবে বিষয়টি পূর্ণ করে", "یہ سبق موضوع کو کیسے مکمل کرتا ہے", "यह पाठ विषय को कैसे पूरा करता है")],
  ["The Prophet", makeLocalized("Le Prophète", "النبي", "নবী", "نبی", "नबी")],
  ["The Quran", makeLocalized("Le Coran", "القرآن", "কুরআন", "قرآن", "कुरआन")],
  ["Allah teaches believers", makeLocalized("Allah enseigne aux croyants", "يعلم الله المؤمنين", "আল্লাহ মুমিনদের শিক্ষা দেন", "اللہ مومنوں کو سکھاتا ہے", "अल्लाह मोमिनों को सिखाता है")],
  ["Allah teaches", makeLocalized("Allah enseigne", "يعلم الله", "আল্লাহ শিক্ষা দেন", "اللہ سکھاتا ہے", "अल्लाह सिखाता है")],
  ["Allah describes", makeLocalized("Allah décrit", "يصف الله", "আল্লাহ বর্ণনা করেন", "اللہ بیان کرتا ہے", "अल्लाह बयान करता है")],
  ["Allah presents", makeLocalized("Allah présente", "يقدم الله", "আল্লাহ তুলে ধরেন", "اللہ پیش کرتا ہے", "अल्लाह पेश करता है")],
  ["Allah inspired", makeLocalized("Allah a inspiré", "أوحى الله", "আল্লাহ অনুপ্রেরণা দিলেন", "اللہ نے الہام کیا", "अल्लाह ने प्रेरणा दी")],
  ["Allah fulfilled His promise", makeLocalized("Allah a accompli Sa promesse", "أوفى الله بوعده", "আল্লাহ তাঁর অঙ্গীকার পূর্ণ করলেন", "اللہ نے اپنا وعدہ پورا کیا", "अल्लाह ने अपना वादा पूरा किया")],
  ["The first family", makeLocalized("La première famille", "أول أسرة", "প্রথম পরিবার", "پہلا خاندان", "पहला परिवार")],
  ["good news", makeLocalized("une bonne nouvelle", "خبرًا طيبًا", "সুসংবাদ", "اچھی خبر", "अच्छी खबर")],
  ["turn back to Allah", makeLocalized("revenir vers Allah", "يرجع إلى الله", "আল্লাহর দিকে ফিরে আসে", "اللہ کی طرف لوٹتا ہے", "अल्लाह की ओर लौटता है")],
  ["peace and warmth", makeLocalized("paix et chaleur", "سلام ودفء", "শান্তি ও উষ্ণতা", "امن اور نرمی", "सुकून और गर्मजोशी")],
  ["with kindness and patience", makeLocalized("avec bonté et patience", "بلطف وصبر", "দয়া ও ধৈর্যের সাথে", "نرمی اور صبر کے ساتھ", "नरमी और सब्र के साथ")],
  ["with humility and mercy", makeLocalized("avec humilité et miséricorde", "بتواضع ورحمة", "নম্রতা ও রহমতের সাথে", "عاجزی اور رحمت کے ساتھ", "नम्रता और रहमत के साथ")],
  ["protection, closeness, and dignity", makeLocalized("protection, proximité et dignité", "الحماية والقرب والكرامة", "সুরক্ষা, ঘনিষ্ঠতা ও মর্যাদা", "حفاظت، قربت اور وقار", "सुरक्षा, निकटता और गरिमा")],
  ["knowledge and closeness to the Prophetic home", makeLocalized("le savoir et la proximité de la maison prophétique", "العلم والقرب من بيت النبوة", "জ্ঞান ও নববী ঘরের নিকটতা", "علم اور نبوی گھرانے سے قربت", "ज्ञान और नबवी घराने से निकटता")],
  ["This lesson is now asking you to connect the idea to its proof in", makeLocalized("Cette leçon vous demande maintenant de relier l'idée à sa preuve dans", "يطلب منك هذا الدرس الآن ربط الفكرة بدليلها في", "এই পাঠ এখন তোমাকে ধারণাটিকে তার প্রমাণের সাথে যুক্ত করতে বলছে", "یہ سبق اب تم سے کہہ رہا ہے کہ خیال کو اس کی دلیل سے جوڑو", "यह पाठ अब तुमसे कह रहा है कि विचार को उसकी दलील से जोड़ो")],
  ["The harder lessons now ask for synthesis: not just what happened, but what the believer should carry from it.", makeLocalized("Les leçons plus difficiles demandent maintenant une synthèse: non seulement ce qui s'est passé, mais ce que le croyant doit en retenir.", "تطلب الدروس الأصعب الآن تلخيصًا وتركيبًا: ليس فقط ما حدث، بل ما ينبغي للمؤمن أن يحمله منه.", "কঠিন পাঠগুলো এখন সমন্বিত বোঝাপড়া চায়: শুধু কী ঘটেছিল তা নয়, বরং মুমিন কী শিক্ষা নেবে তাও।", "اب مشکل اسباق صرف یہ نہیں پوچھتے کہ کیا ہوا بلکہ یہ بھی کہ مومن اس سے کیا لے کر چلے۔", "अब कठिन पाठ सिर्फ यह नहीं पूछते कि क्या हुआ, बल्कि यह भी कि मोमिन उससे क्या सीखे।")]
];

const WORD_REPLACEMENTS: Array<[string, LocalizedValue]> = [
  ["muslim", makeLocalized("musulman", "مسلم", "মুসলিম", "مسلمان", "मुसलमान")],
  ["say", makeLocalized("dire", "يقول", "বলে", "کہے", "कहे")],
  ["greeting", makeLocalized("salutation", "تحية", "অভিবাদন", "سلام", "अभिवादन")],
  ["peace", makeLocalized("paix", "سلام", "শান্তি", "سلامتی", "अमन")],
  ["answer", makeLocalized("réponse", "إجابة", "উত্তর", "جواب", "जवाब")],
  ["good", makeLocalized("bon", "طيب", "ভাল", "اچھا", "अच्छा")],
  ["news", makeLocalized("nouvelle", "خبر", "খবর", "خبر", "खबर")],
  ["lesson", makeLocalized("leçon", "درس", "পাঠ", "سبق", "पाठ")],
  ["topic", makeLocalized("thème", "موضوع", "বিষয়", "موضوع", "विषय")],
  ["story", makeLocalized("histoire", "قصة", "গল্প", "کہانی", "कहानी")],
  ["life", makeLocalized("vie", "حياة", "জীবন", "زندگی", "ज़िंदगी")],
  ["lives", makeLocalized("vies", "حيوات", "জীবনগুলো", "زندگیاں", "ज़िंदगियाँ")],
  ["teaches", makeLocalized("enseigne", "يعلم", "শেখায়", "سکھاتا ہے", "सिखाता है")],
  ["teach", makeLocalized("enseigner", "يعلم", "শেখানো", "سکھانا", "सिखाना")],
  ["learn", makeLocalized("apprendre", "يتعلم", "শিখতে", "سیکھنا", "सीखना")],
  ["return", makeLocalized("revenir", "يرجع", "ফিরে আসে", "لوٹتا ہے", "लौटता है")],
  ["back", makeLocalized("retour", "عودة", "ফিরে", "واپس", "वापस")],
  ["first", makeLocalized("premier", "أول", "প্রথম", "پہلا", "पहला")],
  ["after", makeLocalized("après", "بعد", "পরে", "بعد", "बाद")],
  ["before", makeLocalized("avant", "قبل", "আগে", "پہلے", "पहले")],
  ["mistake", makeLocalized("erreur", "خطأ", "ভুল", "غلطی", "गलती")],
  ["shared", makeLocalized("partagée", "مشتركة", "ভাগ করা", "مشترکہ", "साझा")],
  ["responsibility", makeLocalized("responsabilité", "مسؤولية", "দায়িত্ব", "ذمہ داری", "ज़िम्मेदारी")],
  ["trust", makeLocalized("confiance", "ثقة", "ভরসা", "بھروسہ", "भरोसा")],
  ["fear", makeLocalized("peur", "خوف", "ভয়", "خوف", "डर")],
  ["courage", makeLocalized("courage", "شجاعة", "সাহস", "ہمت", "हिम्मत")],
  ["purity", makeLocalized("pureté", "طهارة", "পবিত্রতা", "پاکیزگی", "पवित्रता")],
  ["knowledge", makeLocalized("savoir", "علم", "জ্ঞান", "علم", "ज्ञान")],
  ["faith", makeLocalized("foi", "إيمان", "ঈমান", "ایمان", "ईमान")],
  ["kindness", makeLocalized("bonté", "لطف", "দয়া", "نرمی", "नरमी")],
  ["patience", makeLocalized("patience", "صبر", "ধৈর্য", "صبر", "सब्र")],
  ["humility", makeLocalized("humilité", "تواضع", "নম্রতা", "عاجزی", "नम्रता")],
  ["mercy", makeLocalized("miséricorde", "رحمة", "রহমত", "رحمت", "रहमत")],
  ["truth", makeLocalized("vérité", "حق", "সত্য", "سچ", "सच")],
  ["truthfulness", makeLocalized("véracité", "الصدق", "সত্যবাদিতা", "سچائی", "सच्चाई")],
  ["parents", makeLocalized("parents", "الوالدين", "মা-বাবা", "والدین", "माता-पिता")],
  ["mother", makeLocalized("mère", "أم", "মা", "ماں", "मां")],
  ["father", makeLocalized("père", "أب", "বাবা", "باپ", "पिता")],
  ["family", makeLocalized("famille", "عائلة", "পরিবার", "خاندان", "परिवार")],
  ["marriage", makeLocalized("mariage", "زواج", "বিবাহ", "نکاح", "निकाह")],
  ["spouse", makeLocalized("époux", "زوج", "সঙ্গী", "شریک حیات", "जीवनसाथी")],
  ["home", makeLocalized("foyer", "بيت", "ঘর", "گھر", "घर")],
  ["house", makeLocalized("maison", "بيت", "বাড়ি", "گھر", "घर")],
  ["paradise", makeLocalized("Paradis", "الجنة", "জান্নাত", "جنت", "जन्नत")],
  ["quran", makeLocalized("Coran", "القرآن", "কুরআন", "قرآن", "कुरआन")],
  ["tafsir", makeLocalized("tafsir", "تفسير", "তাফসীর", "تفسیر", "तफ़सीर")],
  ["prophet", makeLocalized("prophète", "نبي", "নবী", "نبی", "नबी")],
  ["companions", makeLocalized("compagnons", "الصحابة", "সাহাবিরা", "صحابہ", "सहाबा")],
  ["allah", makeLocalized("Allah", "الله", "আল্লাহ", "اللہ", "अल्लाह")],
  ["believer", makeLocalized("croyant", "مؤمن", "মুমিন", "مومن", "मोमिन")],
  ["believers", makeLocalized("croyants", "المؤمنين", "মুমিনরা", "مومنوں", "मोमिनों")],
  ["women", makeLocalized("femmes", "النساء", "নারীরা", "عورتیں", "औरतें")],
  ["wives", makeLocalized("épouses", "زوجات", "স্ত্রীরা", "بیویاں", "पत्नियां")],
  ["source", makeLocalized("source", "مصدر", "উৎস", "ماخذ", "स्रोत")],
  ["reference", makeLocalized("référence", "مرجع", "রেফারেন্স", "حوالہ", "संदर्भ")],
  ["evidence", makeLocalized("preuve", "دليل", "প্রমাণ", "دلیل", "दलील")],
  ["summary", makeLocalized("résumé", "ملخص", "সারসংক্ষেপ", "خلاصہ", "सारांश")],
  ["action", makeLocalized("action", "عمل", "কাজ", "عمل", "काम")],
  ["habit", makeLocalized("habitude", "عادة", "অভ্যাস", "عادت", "आदत")],
  ["phrase", makeLocalized("phrase", "عبارة", "বাক্য", "فقرہ", "वाक्य")],
  ["question", makeLocalized("question", "سؤال", "প্রশ্ন", "سوال", "सवाल")],
  ["practice", makeLocalized("pratique", "ممارسة", "অনুশীলন", "مشق", "अभ्यास")],
  ["daily", makeLocalized("quotidien", "يومي", "দৈনিক", "روزانہ", "रोज़ाना")],
  ["character", makeLocalized("caractère", "خلق", "চরিত্র", "کردار", "चरित्र")],
  ["guidance", makeLocalized("guidance", "هداية", "হেদায়াত", "ہدایت", "हिदायत")],
  ["protection", makeLocalized("protection", "حماية", "সুরক্ষা", "حفاظت", "सुरक्षा")],
  ["closeness", makeLocalized("proximité", "قرب", "ঘনিষ্ঠতা", "قربت", "निकटता")],
  ["dignity", makeLocalized("dignité", "كرامة", "মর্যাদা", "وقار", "गरिमा")],
  ["support", makeLocalized("soutien", "دعم", "সহায়তা", "سہارا", "सहारा")],
  ["loyalty", makeLocalized("loyauté", "وفاء", "নিষ্ঠা", "وفاداری", "वफ़ादारी")],
  ["calm", makeLocalized("calme", "هدوء", "শান্ত", "سکون", "सुकून")],
  ["honor", makeLocalized("honneur", "تكريم", "সম্মান", "عزت", "सम्मान")],
  ["preserving", makeLocalized("préserver", "حفظ", "সংরক্ষণ", "محفوظ رکھنا", "संरक्षण")],
  ["revelation", makeLocalized("révélation", "وحي", "ওহী", "وحی", "वही")],
  ["role", makeLocalized("rôle", "دور", "ভূমিকা", "کردار", "भूमिका")],
  ["contribution", makeLocalized("contribution", "مساهمة", "অবদান", "خدمت", "योगदान")],
  ["special", makeLocalized("spécial", "خاص", "বিশেষ", "خاص", "खास")],
  ["example", makeLocalized("exemple", "مثال", "উদাহরণ", "نمونہ", "उदाहरण")],
  ["obeyed", makeLocalized("a obéi", "أطاع", "মান্য করেছে", "اطاعت کی", "मान लिया")],
  ["obedience", makeLocalized("obéissance", "طاعة", "আনুগত্য", "اطاعت", "आज्ञाकारिता")],
  ["worship", makeLocalized("adoration", "عبادة", "ইবাদত", "عبادت", "इबादत")],
  ["repentance", makeLocalized("repentir", "توبة", "তওবা", "توبہ", "तौबा")],
  ["comfort", makeLocalized("réconfort", "طمأنينة", "সান্ত্বনা", "تسلی", "सांत्वना")],
  ["promise", makeLocalized("promesse", "وعد", "অঙ্গীকার", "وعدہ", "वादा")],
  ["highest", makeLocalized("le plus élevé", "الأعلى", "সর্বোচ্চ", "سب سے بلند", "सबसे ऊंचा")],
  ["greatest", makeLocalized("le plus grand", "الأعظم", "সর্বশ্রেষ্ঠ", "سب سے بڑا", "सबसे बड़ा")],
  ["quietly", makeLocalized("discrètement", "بهدوء", "নীরবে", "خاموشی سے", "चुपचाप")],
  ["history", makeLocalized("histoire", "تاريخ", "ইতিহাস", "تاریخ", "इतिहास")],
  ["proof", makeLocalized("preuve", "برهان", "দলিল", "ثبوت", "सबूत")]
];

export function localizeLessonContent(lesson: Lesson, language: SupportedLanguage): Lesson {
  if (language === "en") {
    return lesson;
  }

  return {
    ...lesson,
    intro: translateStudyText(lesson.intro, language),
    sources: lesson.sources.map((source) => localizeSource(source, language)),
    challenges: lesson.challenges.map((challenge) => localizeChallenge(challenge, language))
  };
}

function localizeSource(source: LessonSource, language: SupportedLanguage): LessonSource {
  return {
    ...source,
    title: translateStudyText(source.title, language),
    summary: translateStudyText(source.summary, language),
    from: source.from ? translateStudyText(source.from, language) : source.from,
    grade: source.grade ? translateStudyText(source.grade, language) : source.grade
  };
}

function localizeChallenge(challenge: Challenge, language: SupportedLanguage): Challenge {
  return {
    ...challenge,
    prompt: translateStudyText(challenge.prompt, language),
    explanation: translateStudyText(challenge.explanation, language),
    choices: challenge.choices.map((choice) => ({
      ...choice,
      label: translateStudyText(choice.label, language)
    }))
  };
}

export function translateStudyText(text: string, language: SupportedLanguage) {
  if (language === "en" || !text.trim()) {
    return text;
  }

  const exact = EXACT_REPLACEMENTS.find(([source]) => source === text);

  if (exact) {
    return exact[1][language];
  }

  let translated = text;

  for (const [source, localized] of PHRASE_REPLACEMENTS.sort((left, right) => right[0].length - left[0].length)) {
    translated = replaceCaseInsensitive(translated, source, localized[language]);
  }

  for (const [source, localized] of WORD_REPLACEMENTS) {
    translated = replaceWordInsensitive(translated, source, localized[language]);
  }

  return translated
    .replace(/\s+([?!.,:;])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function replaceCaseInsensitive(value: string, source: string, replacement: string) {
  return value.replace(new RegExp(escapeRegExp(source), "gi"), replacement);
}

function replaceWordInsensitive(value: string, source: string, replacement: string) {
  return value.replace(new RegExp(`\\b${escapeRegExp(source)}\\b`, "gi"), replacement);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
