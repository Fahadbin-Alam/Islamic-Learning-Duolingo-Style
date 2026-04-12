import type { SupportedLanguage, TopicId } from "./types";

export interface LanguageOption {
  id: SupportedLanguage;
  code: string;
  label: string;
  nativeLabel: string;
}

export interface UiStrings {
  loadingPath: string;
  streak: string;
  account: string;
  save: string;
  logIn: string;
  crew: string;
  battle: string;
  hearts: string;
  language: string;
  chooseTopic: string;
  tapTopic: string;
  chooseBranch: string;
  tapBranch: string;
  branch: string;
  lessons: string;
  guideMoment: string;
  guideMomentCopy: string;
  learnTopic: string;
  continueTopic: string;
  xpToday: string;
  heartShop: string;
  keepLearning: string;
  membershipActive: string;
  youHave: string;
  backToPath: string;
  sourceNotes: string;
  reference: string;
  from: string;
  grade: string;
  openSource: string;
  correct: string;
  notQuite: string;
  continue: string;
  check: string;
  pickAnswer: string;
  stars: string;
  starsInPart: string;
  starsForPart: string;
  keepYourProgress: string;
  havingFun: string;
  welcomeBack: string;
  createCopy: string;
  loginCopy: string;
  createAccount: string;
  iAmChild: string;
  iAmParent: string;
  yourName: string;
  emailAddress: string;
  createPassword: string;
  password: string;
  savedAccountHint: string;
  socialHint: string;
  later: string;
  firstHeartReset: string;
  outOfHearts: string;
  reviewCopy: string;
  oneTimeRefill: string;
  reviewRestoreCopy: string;
  maybeLater: string;
  iLeft5Stars: string;
  languageEyebrow: string;
  languageTitle: string;
  languageCopy: string;
  saveLanguage: string;
  changeLanguage: string;
}

export const DEFAULT_LANGUAGE: SupportedLanguage = "en";

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { id: "en", code: "EN", label: "English", nativeLabel: "English" },
  { id: "fr", code: "FR", label: "French", nativeLabel: "Français" },
  { id: "ar", code: "AR", label: "Arabic", nativeLabel: "العربية" },
  { id: "bn", code: "BN", label: "Bengali", nativeLabel: "বাংলা" },
  { id: "ur", code: "UR", label: "Urdu", nativeLabel: "اردو" },
  { id: "hi", code: "HI", label: "Hindi", nativeLabel: "हिन्दी" }
];

const UI_STRINGS: Record<SupportedLanguage, UiStrings> = {
  en: {
    loadingPath: "Preparing your learning path...",
    streak: "Streak",
    account: "Account",
    save: "Save",
    logIn: "Log in",
    crew: "Crew",
    battle: "Battle",
    hearts: "Hearts",
    language: "Language",
    chooseTopic: "Choose a topic",
    tapTopic: "Tap one and move through its circles.",
    chooseBranch: "Choose a branch",
    tapBranch: "Pick the path you want to go deeper in.",
    branch: "Branch",
    lessons: "lessons",
    guideMoment: "Guide moment",
    guideMomentCopy: "Tap the bright button and keep moving.",
    learnTopic: "Learn",
    continueTopic: "Continue topic",
    xpToday: "XP today",
    heartShop: "Heart shop",
    keepLearning: "Keep learning",
    membershipActive: "Membership is active. Hearts stay full.",
    youHave: "You have",
    backToPath: "Back to path",
    sourceNotes: "Source notes",
    reference: "Reference",
    from: "From",
    grade: "Grade",
    openSource: "Open source",
    correct: "Correct",
    notQuite: "Not quite",
    continue: "Continue",
    check: "Check",
    pickAnswer: "Pick the answer that matches best.",
    stars: "stars",
    starsInPart: "Stars in this part",
    starsForPart: "stars for this part",
    keepYourProgress: "Keep your progress",
    havingFun: "Having fun learning?",
    welcomeBack: "Welcome back",
    createCopy: "Create an account to save your progress, stars, streak, and lesson path.",
    loginCopy: "Log in to pick up your path, stars, and streak right where you left them.",
    createAccount: "Create account",
    iAmChild: "I am a child",
    iAmParent: "I am a parent",
    yourName: "Your name",
    emailAddress: "Email address",
    createPassword: "Create a password",
    password: "Password",
    savedAccountHint: "This device already has a saved account, so you can log in any time.",
    socialHint: "Google and Facebook are ready for your app IDs in config when you want to turn them on.",
    later: "Later",
    firstHeartReset: "First heart reset",
    outOfHearts: "Out of hearts?",
    reviewCopy: "Leave a 5-star review on the App Store or Play Store, then tap restore to refill your hearts one time.",
    oneTimeRefill: "One-time refill",
    reviewRestoreCopy: "This only appears the first time someone runs out of hearts.",
    maybeLater: "Maybe later",
    iLeft5Stars: "I left 5 stars",
    languageEyebrow: "Your language",
    languageTitle: "Which language do you prefer?",
    languageCopy: "Pick the language you want for the app. You can change it later too.",
    saveLanguage: "Save language",
    changeLanguage: "Change language"
  },
  fr: {
    loadingPath: "Préparation de votre parcours d'apprentissage...",
    streak: "Série",
    account: "Compte",
    save: "Sauver",
    logIn: "Connexion",
    crew: "Groupe",
    battle: "Défi",
    hearts: "Vies",
    language: "Langue",
    chooseTopic: "Choisissez un thème",
    tapTopic: "Touchez-en un et avancez de cercle en cercle.",
    chooseBranch: "Choisissez une branche",
    tapBranch: "Prenez le chemin dans lequel vous voulez aller plus loin.",
    branch: "Branche",
    lessons: "leçons",
    guideMoment: "Moment guide",
    guideMomentCopy: "Touchez le bouton lumineux et continuez.",
    learnTopic: "Apprendre",
    continueTopic: "Continuer le thème",
    xpToday: "XP aujourd'hui",
    heartShop: "Boutique de vies",
    keepLearning: "Continuer",
    membershipActive: "L'abonnement est actif. Les vies restent pleines.",
    youHave: "Vous avez",
    backToPath: "Retour au parcours",
    sourceNotes: "Notes de source",
    reference: "Référence",
    from: "De",
    grade: "Niveau",
    openSource: "Ouvrir la source",
    correct: "Correct",
    notQuite: "Pas encore",
    continue: "Continuer",
    check: "Vérifier",
    pickAnswer: "Choisissez la réponse la plus juste.",
    stars: "étoiles",
    starsInPart: "Étoiles de cette partie",
    starsForPart: "étoiles pour cette partie",
    keepYourProgress: "Gardez votre progression",
    havingFun: "Vous aimez apprendre ?",
    welcomeBack: "Bon retour",
    createCopy: "Créez un compte pour enregistrer votre progression, vos étoiles, votre série et votre parcours.",
    loginCopy: "Connectez-vous pour reprendre votre parcours, vos étoiles et votre série.",
    createAccount: "Créer un compte",
    iAmChild: "Je suis un enfant",
    iAmParent: "Je suis un parent",
    yourName: "Votre nom",
    emailAddress: "Adresse e-mail",
    createPassword: "Créer un mot de passe",
    password: "Mot de passe",
    savedAccountHint: "Cet appareil a déjà un compte enregistré, vous pouvez vous connecter à tout moment.",
    socialHint: "Google et Facebook sont prêts pour vos identifiants d'application dans la config.",
    later: "Plus tard",
    firstHeartReset: "Premier retour de vies",
    outOfHearts: "Plus de vies ?",
    reviewCopy: "Laissez un avis 5 étoiles sur l'App Store ou le Play Store, puis touchez restaurer pour récupérer vos vies une fois.",
    oneTimeRefill: "Recharge unique",
    reviewRestoreCopy: "Cela apparaît seulement la première fois qu'une personne n'a plus de vies.",
    maybeLater: "Plus tard",
    iLeft5Stars: "J'ai mis 5 étoiles",
    languageEyebrow: "Votre langue",
    languageTitle: "Quelle langue préférez-vous ?",
    languageCopy: "Choisissez la langue de l'application. Vous pourrez la changer plus tard.",
    saveLanguage: "Enregistrer la langue",
    changeLanguage: "Changer la langue"
  },
  ar: {
    loadingPath: "يتم تجهيز مسار التعلم...",
    streak: "المداومة",
    account: "الحساب",
    save: "حفظ",
    logIn: "تسجيل الدخول",
    crew: "المجموعة",
    battle: "منافسة",
    hearts: "القلوب",
    language: "اللغة",
    chooseTopic: "اختر موضوعا",
    tapTopic: "اضغط عليه وتقدم عبر الدوائر.",
    chooseBranch: "اختر مسارا فرعيا",
    tapBranch: "اختر الجزء الذي تريد التعمق فيه.",
    branch: "مسار",
    lessons: "دروس",
    guideMoment: "لحظة إرشاد",
    guideMomentCopy: "اضغط الزر المضيء وواصل التقدم.",
    learnTopic: "تعلم",
    continueTopic: "واصل الموضوع",
    xpToday: "نقاط اليوم",
    heartShop: "متجر القلوب",
    keepLearning: "واصل التعلم",
    membershipActive: "العضوية مفعلة. القلوب ممتلئة دائما.",
    youHave: "لديك",
    backToPath: "العودة إلى المسار",
    sourceNotes: "ملاحظات المصدر",
    reference: "المرجع",
    from: "من",
    grade: "الدرجة",
    openSource: "افتح المصدر",
    correct: "صحيح",
    notQuite: "ليست تماما",
    continue: "متابعة",
    check: "تحقق",
    pickAnswer: "اختر الإجابة الأنسب.",
    stars: "نجوم",
    starsInPart: "نجوم هذا القسم",
    starsForPart: "نجوم لهذا القسم",
    keepYourProgress: "احفظ تقدمك",
    havingFun: "هل تستمتع بالتعلم؟",
    welcomeBack: "مرحبا بعودتك",
    createCopy: "أنشئ حسابا لحفظ تقدمك ونجومك وسلسلتك ومسارك.",
    loginCopy: "سجل الدخول لتكمل مسارك ونجومك وسلسلتك من حيث توقفت.",
    createAccount: "إنشاء حساب",
    iAmChild: "أنا طفل",
    iAmParent: "أنا والد",
    yourName: "اسمك",
    emailAddress: "البريد الإلكتروني",
    createPassword: "أنشئ كلمة مرور",
    password: "كلمة المرور",
    savedAccountHint: "يوجد حساب محفوظ على هذا الجهاز ويمكنك تسجيل الدخول في أي وقت.",
    socialHint: "يمكن تفعيل Google وFacebook بعد إضافة بيانات التطبيق في الإعدادات.",
    later: "لاحقا",
    firstHeartReset: "أول استعادة للقلوب",
    outOfHearts: "نفدت القلوب؟",
    reviewCopy: "اترك تقييما بخمس نجوم في المتجر ثم اضغط استعادة لتعبئة القلوب مرة واحدة.",
    oneTimeRefill: "تعبئة لمرة واحدة",
    reviewRestoreCopy: "يظهر هذا فقط أول مرة تنفد فيها القلوب.",
    maybeLater: "لاحقا",
    iLeft5Stars: "وضعت 5 نجوم",
    languageEyebrow: "لغتك",
    languageTitle: "ما اللغة التي تفضلها؟",
    languageCopy: "اختر اللغة التي تريدها للتطبيق. يمكنك تغييرها لاحقا.",
    saveLanguage: "حفظ اللغة",
    changeLanguage: "تغيير اللغة"
  },
  bn: {
    loadingPath: "আপনার শেখার পথ তৈরি হচ্ছে...",
    streak: "ধারাবাহিকতা",
    account: "অ্যাকাউন্ট",
    save: "সেভ",
    logIn: "লগ ইন",
    crew: "দল",
    battle: "চ্যালেঞ্জ",
    hearts: "হার্ট",
    language: "ভাষা",
    chooseTopic: "একটি বিষয় বেছে নিন",
    tapTopic: "একটি ট্যাপ করে বৃত্ত ধরে এগিয়ে যান।",
    chooseBranch: "একটি শাখা বেছে নিন",
    tapBranch: "যে পথে আরও গভীরে যেতে চান সেটা বেছে নিন।",
    branch: "শাখা",
    lessons: "লেসন",
    guideMoment: "গাইড মুহূর্ত",
    guideMomentCopy: "উজ্জ্বল বোতাম চাপুন এবং এগিয়ে যান।",
    learnTopic: "শিখুন",
    continueTopic: "বিষয় চালিয়ে যান",
    xpToday: "আজকের XP",
    heartShop: "হার্ট শপ",
    keepLearning: "শেখা চালিয়ে যান",
    membershipActive: "মেম্বারশিপ চালু আছে। হার্ট পূর্ণ থাকবে।",
    youHave: "আপনার আছে",
    backToPath: "পথে ফিরে যান",
    sourceNotes: "সূত্র নোট",
    reference: "রেফারেন্স",
    from: "থেকে",
    grade: "গ্রেড",
    openSource: "সূত্র খুলুন",
    correct: "সঠিক",
    notQuite: "এখনও না",
    continue: "চালিয়ে যান",
    check: "চেক করুন",
    pickAnswer: "সবচেয়ে মানানসই উত্তর বেছে নিন।",
    stars: "তারকা",
    starsInPart: "এই অংশের তারকা",
    starsForPart: "এই অংশের জন্য তারকা",
    keepYourProgress: "আপনার অগ্রগতি রাখুন",
    havingFun: "শিখে কি ভালো লাগছে?",
    welcomeBack: "আবার স্বাগতম",
    createCopy: "অ্যাকাউন্ট তৈরি করে আপনার অগ্রগতি, তারকা, স্ট্রিক আর পথ সংরক্ষণ করুন।",
    loginCopy: "লগ ইন করে আপনার পথ, তারকা আর স্ট্রিক আবার শুরু করুন।",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    iAmChild: "আমি শিশু",
    iAmParent: "আমি অভিভাবক",
    yourName: "আপনার নাম",
    emailAddress: "ইমেইল ঠিকানা",
    createPassword: "পাসওয়ার্ড তৈরি করুন",
    password: "পাসওয়ার্ড",
    savedAccountHint: "এই ডিভাইসে আগে থেকেই একটি সেভ করা অ্যাকাউন্ট আছে।",
    socialHint: "Google আর Facebook চালু করতে কনফিগে অ্যাপ আইডি দিন।",
    later: "পরে",
    firstHeartReset: "প্রথম হার্ট রিস্টোর",
    outOfHearts: "হার্ট শেষ?",
    reviewCopy: "App Store বা Play Store-এ ৫ তারকা রিভিউ দিন, তারপর রিস্টোর চাপুন।",
    oneTimeRefill: "একবারের রিফিল",
    reviewRestoreCopy: "এটি শুধু প্রথমবার হার্ট শেষ হলে দেখাবে।",
    maybeLater: "পরে",
    iLeft5Stars: "আমি ৫ তারকা দিয়েছি",
    languageEyebrow: "আপনার ভাষা",
    languageTitle: "আপনি কোন ভাষা পছন্দ করেন?",
    languageCopy: "অ্যাপের জন্য ভাষা বেছে নিন। পরে বদলাতে পারবেন।",
    saveLanguage: "ভাষা সেভ করুন",
    changeLanguage: "ভাষা বদলান"
  },
  ur: {
    loadingPath: "آپ کا سیکھنے کا راستہ تیار ہو رہا ہے...",
    streak: "تسلسل",
    account: "اکاؤنٹ",
    save: "محفوظ",
    logIn: "لاگ اِن",
    crew: "گروپ",
    battle: "مقابلہ",
    hearts: "ہارٹس",
    language: "زبان",
    chooseTopic: "ایک موضوع منتخب کریں",
    tapTopic: "ایک پر دبائیں اور دائروں کے ساتھ آگے بڑھیں۔",
    chooseBranch: "ایک شاخ منتخب کریں",
    tapBranch: "جس راستے میں زیادہ گہرائی میں جانا چاہتے ہیں وہ چنیں۔",
    branch: "شاخ",
    lessons: "اسباق",
    guideMoment: "رہنمائی کا لمحہ",
    guideMomentCopy: "چمکتا بٹن دبائیں اور آگے بڑھیں۔",
    learnTopic: "سیکھیں",
    continueTopic: "موضوع جاری رکھیں",
    xpToday: "آج کا XP",
    heartShop: "ہارٹ شاپ",
    keepLearning: "سیکھنا جاری رکھیں",
    membershipActive: "ممبرشپ فعال ہے۔ ہارٹس بھرے رہیں گے۔",
    youHave: "آپ کے پاس",
    backToPath: "راستے پر واپس جائیں",
    sourceNotes: "ماخذ نوٹس",
    reference: "حوالہ",
    from: "سے",
    grade: "درجہ",
    openSource: "ماخذ کھولیں",
    correct: "درست",
    notQuite: "ابھی نہیں",
    continue: "جاری رکھیں",
    check: "چیک کریں",
    pickAnswer: "سب سے مناسب جواب منتخب کریں۔",
    stars: "ستارے",
    starsInPart: "اس حصے کے ستارے",
    starsForPart: "اس حصے کے لیے ستارے",
    keepYourProgress: "اپنی پیش رفت محفوظ کریں",
    havingFun: "کیا سیکھنا اچھا لگ رہا ہے؟",
    welcomeBack: "واپسی پر خوش آمدید",
    createCopy: "اکاؤنٹ بنا کر اپنی پیش رفت، ستارے، اسٹریک اور راستہ محفوظ کریں۔",
    loginCopy: "لاگ اِن کریں اور وہیں سے شروع کریں جہاں آپ رکے تھے۔",
    createAccount: "اکاؤنٹ بنائیں",
    iAmChild: "میں بچہ ہوں",
    iAmParent: "میں والدین میں سے ہوں",
    yourName: "آپ کا نام",
    emailAddress: "ای میل ایڈریس",
    createPassword: "پاس ورڈ بنائیں",
    password: "پاس ورڈ",
    savedAccountHint: "اس ڈیوائس پر ایک محفوظ اکاؤنٹ پہلے سے موجود ہے۔",
    socialHint: "Google اور Facebook کو فعال کرنے کے لیے config میں app IDs شامل کریں۔",
    later: "بعد میں",
    firstHeartReset: "پہلا ہارٹ ری سیٹ",
    outOfHearts: "ہارٹس ختم ہو گئے؟",
    reviewCopy: "App Store یا Play Store پر 5 ستاروں کا ریویو دیں، پھر restore دبائیں۔",
    oneTimeRefill: "ایک بار بھرائی",
    reviewRestoreCopy: "یہ صرف پہلی بار ہارٹس ختم ہونے پر آتا ہے۔",
    maybeLater: "بعد میں",
    iLeft5Stars: "میں نے 5 ستارے دیے",
    languageEyebrow: "آپ کی زبان",
    languageTitle: "آپ کون سی زبان پسند کرتے ہیں؟",
    languageCopy: "ایپ کے لیے زبان منتخب کریں۔ آپ بعد میں بھی بدل سکتے ہیں۔",
    saveLanguage: "زبان محفوظ کریں",
    changeLanguage: "زبان بدلیں"
  },
  hi: {
    loadingPath: "आपका सीखने का रास्ता तैयार किया जा रहा है...",
    streak: "स्ट्रीक",
    account: "खाता",
    save: "सेव",
    logIn: "लॉग इन",
    crew: "ग्रुप",
    battle: "मुकाबला",
    hearts: "हार्ट्स",
    language: "भाषा",
    chooseTopic: "एक विषय चुनें",
    tapTopic: "एक पर टैप करें और गोलों के साथ आगे बढ़ें।",
    chooseBranch: "एक शाखा चुनें",
    tapBranch: "जिस रास्ते में आप गहराई में जाना चाहते हैं उसे चुनिए।",
    branch: "शाखा",
    lessons: "लेसन",
    guideMoment: "गाइड पल",
    guideMomentCopy: "चमकदार बटन दबाइए और आगे बढ़िए।",
    learnTopic: "सीखें",
    continueTopic: "विषय जारी रखें",
    xpToday: "आज का XP",
    heartShop: "हार्ट शॉप",
    keepLearning: "सीखना जारी रखें",
    membershipActive: "मेंबरशिप चालू है। हार्ट्स भरे रहेंगे।",
    youHave: "आपके पास",
    backToPath: "पाथ पर वापस जाएं",
    sourceNotes: "स्रोत नोट्स",
    reference: "संदर्भ",
    from: "से",
    grade: "ग्रेड",
    openSource: "स्रोत खोलें",
    correct: "सही",
    notQuite: "अभी नहीं",
    continue: "जारी रखें",
    check: "जांचें",
    pickAnswer: "सबसे सही उत्तर चुनें।",
    stars: "सितारे",
    starsInPart: "इस हिस्से के सितारे",
    starsForPart: "इस हिस्से के लिए सितारे",
    keepYourProgress: "अपनी प्रगति बचाइए",
    havingFun: "सीखना अच्छा लग रहा है?",
    welcomeBack: "फिर से स्वागत है",
    createCopy: "खाता बनाकर अपनी प्रगति, सितारे, स्ट्रीक और पाथ बचाइए।",
    loginCopy: "लॉग इन करके वहीं से शुरू कीजिए जहां आपने छोड़ा था।",
    createAccount: "खाता बनाएं",
    iAmChild: "मैं बच्चा हूं",
    iAmParent: "मैं माता-पिता हूं",
    yourName: "आपका नाम",
    emailAddress: "ईमेल पता",
    createPassword: "पासवर्ड बनाएं",
    password: "पासवर्ड",
    savedAccountHint: "इस डिवाइस पर पहले से एक सेव किया हुआ खाता है।",
    socialHint: "Google और Facebook के लिए config में app IDs जोड़ें।",
    later: "बाद में",
    firstHeartReset: "पहला हार्ट रीसेट",
    outOfHearts: "हार्ट्स खत्म हो गए?",
    reviewCopy: "App Store या Play Store पर 5-स्टार रिव्यू दें, फिर restore दबाएं।",
    oneTimeRefill: "एक बार रीफिल",
    reviewRestoreCopy: "यह सिर्फ पहली बार हार्ट्स खत्म होने पर दिखता है।",
    maybeLater: "बाद में",
    iLeft5Stars: "मैंने 5 स्टार दिए",
    languageEyebrow: "आपकी भाषा",
    languageTitle: "आप कौन सी भाषा पसंद करते हैं?",
    languageCopy: "ऐप के लिए भाषा चुनें। बाद में बदल भी सकते हैं।",
    saveLanguage: "भाषा सेव करें",
    changeLanguage: "भाषा बदलें"
  }
};

const TOPIC_COPY: Record<SupportedLanguage, Partial<Record<TopicId, { title: string; description: string; focus: string; badge: string }>>> = {
  en: {
    foundation: { title: "Foundation", description: "The first Muslim habits: greeting with peace, praising Allah, saying Bismillah, and answering people well.", focus: "Salam, Alhamdulillah, Bismillah, everyday phrases, and gentle replies.", badge: "Start Here" },
    prayer: { title: "Prayer", description: "Get ready for salah with clean, step-by-step wudu and simple prayer readiness.", focus: "Purity, wudu order, calm preparation, and getting ready to stand before Allah.", badge: "Prayer Basics" },
    manners: { title: "Manners", description: "Daily adab for speech, family, mercy, and the way Muslims carry themselves.", focus: "Spread peace, speak truth, honor parents, show mercy, and eat with adab.", badge: "Topic 2" },
    marriage: { title: "Marriage", description: "Learn the Islamic purpose of marriage, how to choose well, and how mercy and kindness build a home.", focus: "Righteous choices, mercy, kindness, rights, and building a peaceful home.", badge: "Topic 3" },
    sahabah: { title: "Sahabah", description: "Stories and qualities from the companions who carried Islam with courage and loyalty.", focus: "Truthfulness, justice, modesty, courage, patience, and firm faith.", badge: "Topic 4" },
    prophets: { title: "Lives of the Prophets", description: "Travel from Adam to Muhammad and learn the big lessons each prophet left for the Ummah.", focus: "Creation, patience, trust, forgiveness, courage, mercy, and the final example.", badge: "Topic 6" },
    women_of_the_book: { title: "Women of the Book", description: "Move in order through women in the Quran and key wives of the Prophet.", focus: "Repentance, trust, courage, purity, knowledge, and preserving revelation.", badge: "Topic 7" },
    quran_tafseer: { title: "Quran and Tafseer", description: "Short lessons on verses, tafsir, and the big meanings Allah wants believers to hold onto.", focus: "Guidance, oneness, protection, patience, and learning to reflect on the Quran.", badge: "Topic 5" }
  },
  fr: {
    foundation: { title: "Fondation", description: "Les premières habitudes musulmanes: le salam, Alhamdulillah, Bismillah et les bonnes réponses.", focus: "Salam, Alhamdulillah, Bismillah et réponses bienveillantes.", badge: "Commencez ici" },
    manners: { title: "Comportement", description: "L'adab quotidien pour la parole, la famille et la miséricorde.", focus: "Paix, vérité, parents, miséricorde et adab à table.", badge: "Thème 2" },
    marriage: { title: "Mariage", description: "Découvrez le but du mariage en Islam, comment bien choisir, et comment la miséricorde construit un foyer.", focus: "Bon choix, miséricorde, bonté, droits et foyer paisible.", badge: "Thème 3" },
    sahabah: { title: "Compagnons", description: "Histoires et qualités des compagnons du Prophète.", focus: "Vérité, justice, pudeur, courage et patience.", badge: "Thème 4" },
    prophets: { title: "Vie des prophètes", description: "Voyagez d'Adam à Muhammad et découvrez leurs grandes leçons.", focus: "Création, patience, confiance, pardon et miséricorde.", badge: "Thème 6" },
    quran_tafseer: { title: "Coran et Tafsir", description: "Courtes leçons sur les versets, le tafsir et les grands sens.", focus: "Guidance, unicité, protection, patience et réflexion.", badge: "Thème 5" }
  },
  ar: {
    foundation: { title: "الأساس", description: "أول العادات الإسلامية: السلام والحمد لله وبسم الله وحسن الجواب.", focus: "السلام والحمد لله وبسم الله والرد اللطيف.", badge: "ابدأ هنا" },
    manners: { title: "الآداب", description: "آداب يومية للكلام والأسرة والرحمة.", focus: "نشر السلام والصدق وبر الوالدين والرحمة وآداب الطعام.", badge: "الموضوع 2" },
    marriage: { title: "الزواج", description: "تعرّف على مقصد الزواج في الإسلام وكيفية حسن الاختيار وبناء بيت فيه رحمة ولطف.", focus: "الاختيار الصالح والرحمة والحقوق وبناء بيت مطمئن.", badge: "الموضوع 3" },
    sahabah: { title: "الصحابة", description: "قصص وصفات الصحابة الذين حملوا الإسلام.", focus: "الصدق والعدل والحياء والشجاعة والصبر.", badge: "الموضوع 4" },
    prophets: { title: "حياة الأنبياء", description: "رحلة من آدم إلى محمد مع أعظم الدروس.", focus: "الخلق والصبر والثقة والمغفرة والرحمة.", badge: "الموضوع 6" },
    quran_tafseer: { title: "القرآن والتفسير", description: "دروس قصيرة في الآيات والتفسير والمعاني الكبرى.", focus: "الهداية والتوحيد والحفظ والصبر والتدبر.", badge: "الموضوع 5" }
  },
  bn: {
    foundation: { title: "ভিত্তি", description: "প্রথম মুসলিম অভ্যাস: সালাম, আলহামদুলিল্লাহ, বিসমিল্লাহ ও সুন্দর জবাব।", focus: "সালাম, আলহামদুলিল্লাহ, বিসমিল্লাহ এবং নরম কথা।", badge: "এখান থেকে শুরু" },
    manners: { title: "আদব", description: "কথা, পরিবার আর দয়ার দৈনন্দিন আদব।", focus: "সালাম, সত্যবাদিতা, বাবা-মা, দয়া আর খাবারের আদব।", badge: "বিষয় ২" },
    marriage: { title: "বিবাহ", description: "ইসলামে বিবাহের উদ্দেশ্য, সঠিকভাবে জীবনসঙ্গী বেছে নেওয়া, আর রহমতে ঘর গড়া শিখুন।", focus: "দীনদার নির্বাচন, দয়া, অধিকার, সৌন্দর্যপূর্ণ ব্যবহার আর শান্ত ঘর।", badge: "বিষয় ৩" },
    sahabah: { title: "সাহাবি", description: "যারা ইসলাম বহন করেছেন সেই সাহাবিদের গল্প।", focus: "সত্য, ন্যায়, লজ্জাশীলতা, সাহস আর ধৈর্য।", badge: "বিষয় ৪" },
    prophets: { title: "নবীদের জীবন", description: "আদম থেকে মুহাম্মদ পর্যন্ত বড় বড় শিক্ষা শিখুন।", focus: "সৃষ্টি, ধৈর্য, ভরসা, ক্ষমা আর রহমত।", badge: "বিষয় ৬" },
    quran_tafseer: { title: "কুরআন ও তাফসীর", description: "আয়াত, তাফসীর ও বড় অর্থ নিয়ে ছোট ছোট পাঠ।", focus: "হেদায়াত, তাওহীদ, সুরক্ষা, ধৈর্য আর চিন্তা।", badge: "বিষয় ৫" }
  },
  ur: {
    foundation: { title: "بنیاد", description: "پہلی مسلم عادات: سلام، الحمدللہ، بسم اللہ اور اچھا جواب۔", focus: "سلام، الحمدللہ، بسم اللہ اور نرم جواب۔", badge: "یہاں سے شروع کریں" },
    manners: { title: "آداب", description: "گفتگو، خاندان اور رحمت کے روزمرہ آداب۔", focus: "سلام، سچائی، والدین، رحمت اور کھانے کے آداب۔", badge: "موضوع 2" },
    marriage: { title: "نکاح", description: "اسلام میں نکاح کا مقصد، اچھا انتخاب، اور رحمت والا گھر کیسے بنتا ہے یہ سیکھیں۔", focus: "دین دار انتخاب، رحمت، نرمی، حقوق، اور پر سکون گھر۔", badge: "موضوع 3" },
    sahabah: { title: "صحابہ", description: "صحابہ کی کہانیاں اور خوبیاں۔", focus: "سچائی، انصاف، حیا، ہمت اور صبر۔", badge: "موضوع 4" },
    prophets: { title: "انبیاء کی زندگیاں", description: "آدم سے محمد تک سفر کریں اور بڑے سبق سیکھیں۔", focus: "تخلیق، صبر، بھروسہ، معافی اور رحمت۔", badge: "موضوع 6" },
    quran_tafseer: { title: "قرآن اور تفسیر", description: "آیات، تفسیر اور بڑے معانی پر مختصر اسباق۔", focus: "ہدایت، توحید، حفاظت، صبر اور غور و فکر۔", badge: "موضوع 5" }
  },
  hi: {
    foundation: { title: "बुनियाद", description: "पहली मुस्लिम आदतें: सलाम, अल्हम्दुलिल्लाह, बिस्मिल्लाह और अच्छा जवाब।", focus: "सलाम, अल्हम्दुलिल्लाह, बिस्मिल्लाह और नरम जवाब।", badge: "यहीं से शुरू" },
    manners: { title: "अदब", description: "बोलचाल, परिवार और रहमत के रोज़मर्रा के अदब।", focus: "सलाम, सच्चाई, माता-पिता, रहमत और खाने का अदब।", badge: "विषय 2" },
    marriage: { title: "निकाह", description: "इस्लाम में निकाह का मकसद, सही चुनाव, और रहमत वाला घर कैसे बनता है यह सीखिए।", focus: "दीनदार चुनाव, रहमत, नरमी, अधिकार, और सुकून वाला घर।", badge: "विषय 3" },
    sahabah: { title: "सहाबा", description: "उन सहाबा की कहानियां और खूबियां जिन्होंने इस्लाम उठाया।", focus: "सच्चाई, इंसाफ, हया, हिम्मत और सब्र।", badge: "विषय 4" },
    prophets: { title: "नबियों की ज़िंदगी", description: "आदम से मुहम्मद तक सफर कीजिए और बड़ी सीखें लीजिए।", focus: "सृष्टि, सब्र, भरोसा, माफी और रहमत।", badge: "विषय 6" },
    quran_tafseer: { title: "कुरआन और तफ़सीर", description: "आयतों, तफ़सीर और बड़े मतलबों पर छोटे पाठ।", focus: "हिदायत, तौहीद, हिफाज़त, सब्र और तदब्बुर।", badge: "विषय 5" }
  }
};

const NODE_TITLES: Record<SupportedLanguage, Record<string, string>> = {
  en: {},
  fr: {
    "foundation-niyyah": "As-Salamu Alaikum",
    "foundation-guidance": "Dire Alhamdulillah",
    "foundation-bismillah": "Dire Bismillah",
    "foundation-sneeze": "Les règles de l'éternuement",
    "foundation-character": "Répondre par la paix",
    "manners-salam": "Répandre le salam",
    "manners-truthful": "La sincérité",
    "manners-parents": "Parents et aînés",
    "manners-mother": "Honore ta mère",
    "manners-service": "Servir avec humilité",
    "manners-mercy": "Miséricorde et respect",
    "manners-eating": "Manger avec adab",
    "marriage-purpose": "Pourquoi le mariage compte",
    "marriage-choose": "Choisir pour la religion",
    "marriage-kindness": "Vivre avec bonté",
    "marriage-clothing": "Un vêtement l'un pour l'autre",
    "marriage-mercy": "Un foyer de miséricorde",
    "sahabah-abubakr": "Abou Bakr",
    "sahabah-umar": "Omar ibn al-Khattab",
    "sahabah-uthman": "Othman ibn Affan",
    "sahabah-ali": "Ali ibn Abi Talib",
    "sahabah-bilal": "Bilal ibn Rabah",
    "quran-fatiha": "Al-Fatihah",
    "quran-ikhlas": "Sourate Al-Ikhlas",
    "quran-kursi": "Ayat al-Kursi",
    "quran-asr": "Sourate Al-Asr",
    "quran-tafseer": "Thèmes du tafsir",
    "prophets-adam": "Adam",
    "prophets-nuh": "Noé",
    "prophets-ibrahim": "Ibrahim",
    "prophets-yusuf": "Yusuf",
    "prophets-musa": "Musa",
    "prophets-isa": "Isa",
    "prophets-muhammad": "Muhammad"
  },
  ar: {
    "foundation-niyyah": "السلام عليكم",
    "foundation-guidance": "قل الحمد لله",
    "foundation-bismillah": "قل بسم الله",
    "foundation-sneeze": "آداب العطاس",
    "foundation-character": "رد السلام",
    "manners-salam": "انشر السلام",
    "manners-truthful": "الصدق",
    "manners-parents": "الوالدان والكبار",
    "manners-mother": "بر الأم",
    "manners-service": "الخدمة بتواضع",
    "manners-mercy": "الرحمة والاحترام",
    "manners-eating": "آداب الطعام",
    "marriage-purpose": "لماذا الزواج مهم",
    "marriage-choose": "اختر على أساس الدين",
    "marriage-kindness": "عش بالمعروف",
    "marriage-clothing": "لباس لبعضكما",
    "marriage-mercy": "بيت من الرحمة",
    "sahabah-abubakr": "أبو بكر",
    "sahabah-umar": "عمر بن الخطاب",
    "sahabah-uthman": "عثمان بن عفان",
    "sahabah-ali": "علي بن أبي طالب",
    "sahabah-bilal": "بلال بن رباح",
    "quran-fatiha": "الفاتحة",
    "quran-ikhlas": "سورة الإخلاص",
    "quran-kursi": "آية الكرسي",
    "quran-asr": "سورة العصر",
    "quran-tafseer": "موضوعات التفسير",
    "prophets-adam": "آدم",
    "prophets-nuh": "نوح",
    "prophets-ibrahim": "إبراهيم",
    "prophets-yusuf": "يوسف",
    "prophets-musa": "موسى",
    "prophets-isa": "عيسى",
    "prophets-muhammad": "محمد"
  },
  bn: {
    "foundation-niyyah": "আস-সালামু আলাইকুম",
    "foundation-guidance": "বলুন আলহামদুলিল্লাহ",
    "foundation-bismillah": "বলুন বিসমিল্লাহ",
    "foundation-sneeze": "হাঁচির আদব",
    "foundation-character": "শান্তির উত্তর দিন",
    "manners-salam": "সালাম ছড়ান",
    "manners-truthful": "সত্যবাদিতা",
    "manners-parents": "বাবা-মা ও বড়রা",
    "manners-mother": "মাকে সম্মান করো",
    "manners-service": "নম্রভাবে সেবা করো",
    "manners-mercy": "দয়া ও সম্মান",
    "manners-eating": "খাওয়ার আদব",
    "marriage-purpose": "বিবাহ কেন গুরুত্বপূর্ণ",
    "marriage-choose": "দীনের জন্য বেছে নাও",
    "marriage-kindness": "সৌন্দর্যের সাথে বসবাস",
    "marriage-clothing": "একজন আরেকজনের পোশাক",
    "marriage-mercy": "রহমতের ঘর",
    "sahabah-abubakr": "আবু বকর",
    "sahabah-umar": "উমার ইবনুল খাত্তাব",
    "sahabah-uthman": "উসমান ইবন আফফান",
    "sahabah-ali": "আলী ইবন আবি তালিব",
    "sahabah-bilal": "বিলাল ইবন রাবাহ",
    "quran-fatiha": "আল-ফাতিহা",
    "quran-ikhlas": "সূরা ইখলাস",
    "quran-kursi": "আয়াতুল কুরসি",
    "quran-asr": "সূরা আসর",
    "quran-tafseer": "তাফসীরের বিষয়",
    "prophets-adam": "আদম",
    "prophets-nuh": "নূহ",
    "prophets-ibrahim": "ইবরাহিম",
    "prophets-yusuf": "ইউসুফ",
    "prophets-musa": "মূসা",
    "prophets-isa": "ঈসা",
    "prophets-muhammad": "মুহাম্মদ"
  },
  ur: {
    "foundation-niyyah": "السلام علیکم",
    "foundation-guidance": "الحمدللہ کہیں",
    "foundation-bismillah": "بسم اللہ کہیں",
    "foundation-sneeze": "چھینک کے آداب",
    "foundation-character": "سلام کا جواب دیں",
    "manners-salam": "سلام پھیلائیں",
    "manners-truthful": "سچائی",
    "manners-parents": "والدین اور بڑے",
    "manners-mother": "اپنی ماں کی عزت",
    "manners-service": "عاجزی سے خدمت",
    "manners-mercy": "رحمت اور احترام",
    "manners-eating": "کھانے کے آداب",
    "marriage-purpose": "نکاح کیوں اہم ہے",
    "marriage-choose": "دین کے لیے انتخاب",
    "marriage-kindness": "حسن سلوک سے رہو",
    "marriage-clothing": "ایک دوسرے کا لباس",
    "marriage-mercy": "رحمت والا گھر",
    "sahabah-abubakr": "ابو بکر",
    "sahabah-umar": "عمر بن الخطاب",
    "sahabah-uthman": "عثمان بن عفان",
    "sahabah-ali": "علی بن ابی طالب",
    "sahabah-bilal": "بلال بن رباح",
    "quran-fatiha": "الفاتحہ",
    "quran-ikhlas": "سورہ اخلاص",
    "quran-kursi": "آیۃ الکرسی",
    "quran-asr": "سورہ العصر",
    "quran-tafseer": "تفسیر کے موضوعات",
    "prophets-adam": "آدم",
    "prophets-nuh": "نوح",
    "prophets-ibrahim": "ابراہیم",
    "prophets-yusuf": "یوسف",
    "prophets-musa": "موسیٰ",
    "prophets-isa": "عیسیٰ",
    "prophets-muhammad": "محمد"
  },
  hi: {
    "foundation-niyyah": "अस्सलामु अलैकुम",
    "foundation-guidance": "अल्हम्दुलिल्लाह कहें",
    "foundation-bismillah": "बिस्मिल्लाह कहें",
    "foundation-sneeze": "छींकने का अदब",
    "foundation-character": "सलाम का जवाब दें",
    "manners-salam": "सलाम फैलाइए",
    "manners-truthful": "सच्चाई",
    "manners-parents": "माता-पिता और बड़े",
    "manners-mother": "अपनी मां का सम्मान",
    "manners-service": "नम्रता से सेवा",
    "manners-mercy": "रहमत और सम्मान",
    "manners-eating": "खाने का अदब",
    "marriage-purpose": "निकाह क्यों अहम है",
    "marriage-choose": "दीन के लिए चुनाव",
    "marriage-kindness": "नेकी से साथ रहो",
    "marriage-clothing": "एक-दूसरे का लिबास",
    "marriage-mercy": "रहमत वाला घर",
    "sahabah-abubakr": "अबू बक्र",
    "sahabah-umar": "उमर इब्न अल-ख़त्ताब",
    "sahabah-uthman": "उस्मान इब्न अफ्फान",
    "sahabah-ali": "अली इब्न अबी तालिब",
    "sahabah-bilal": "बिलाल इब्न रबाह",
    "quran-fatiha": "अल-फ़ातिहा",
    "quran-ikhlas": "सूरह इख़लास",
    "quran-kursi": "आयतुल कुर्सी",
    "quran-asr": "सूरह अल-असर",
    "quran-tafseer": "तफ़सीर के विषय",
    "prophets-adam": "आदम",
    "prophets-nuh": "नूह",
    "prophets-ibrahim": "इब्राहीम",
    "prophets-yusuf": "यूसुफ",
    "prophets-musa": "मूसा",
    "prophets-isa": "ईसा",
    "prophets-muhammad": "मुहम्मद"
  }
};

export function getUiStrings(language?: SupportedLanguage) {
  return UI_STRINGS[language ?? DEFAULT_LANGUAGE] ?? UI_STRINGS.en;
}

export function getLanguageOption(language: SupportedLanguage) {
  return LANGUAGE_OPTIONS.find((option) => option.id === language) ?? LANGUAGE_OPTIONS[0];
}

export function getTopicCopy(topicId: TopicId, language?: SupportedLanguage) {
  const selected = TOPIC_COPY[language ?? DEFAULT_LANGUAGE] ?? TOPIC_COPY.en;
  return selected[topicId] ?? TOPIC_COPY.en[topicId]!;
}

export function getNodeTitle(nodeId: string, fallback: string, language?: SupportedLanguage) {
  const selected = NODE_TITLES[language ?? DEFAULT_LANGUAGE] ?? NODE_TITLES.en;
  return selected[nodeId] ?? fallback;
}

export function normalizeLanguage(language?: string): SupportedLanguage {
  return LANGUAGE_OPTIONS.some((option) => option.id === language) ? (language as SupportedLanguage) : DEFAULT_LANGUAGE;
}
