import type { LearningSection, LessonSource } from "../types";
import type { DeepUnit } from "./deepUnits";

// The Scholars topic: the four imams of the madhhabs and three later scholars, each a deep unit of his life.
// Every fact is from one biography page (IslamQA, or the King Faisal Prize's laureate pages) and only what the
// page states; anything the page itself hedges or calls disputed is left out. SCHOLAR_TREE says who learned
// from whom, for the family tree in the topic picker.

// `highlight` is the page's own words for the fact (copied from the page), which the source opens at.
function islamqa(answer: number, title: string, summary: string, highlight?: string): LessonSource {
  return {
    id: `deep_islamqa_${answer}`,
    site: "IslamQA",
    category: "biography",
    title,
    url: `https://islamqa.info/en/answers/${answer}`,
    reference: `IslamQA ${answer}`,
    from: "Islam Question & Answer",
    grade: "Biography",
    summary,
    highlight
  };
}

function kingFaisalPrize(slug: string, title: string, summary: string, highlight?: string): LessonSource {
  return {
    id: `deep_kfp_${slug.replace(/\W+/g, "_")}`,
    site: "King Faisal Prize",
    category: "biography",
    title,
    url: `https://kingfaisalprize.org/${slug}/`,
    reference: "King Faisal Prize",
    from: "King Faisal Prize, laureate page",
    grade: "Biography",
    summary,
    highlight
  };
}

export const ABU_HANIFAH_PAGE = (summary: string, highlight?: string) => islamqa(46992, "The madhhab of Imam Abu Hanifah", summary, highlight);
export const MALIK_PAGE = (summary: string, highlight?: string) => islamqa(119256, "A brief biography of Imam Malik", summary, highlight);
export const SHAFII_PAGE = (summary: string, highlight?: string) => islamqa(153652, "A brief biography of Imam ash-Shafi'i", summary, highlight);
export const AHMAD_PAGE = (summary: string, highlight?: string) => islamqa(153333, "A brief biography of Imam Ahmad", summary, highlight);
export const IBN_TAYMIYYAH_PAGE = (summary: string, highlight?: string) => islamqa(96323, "Shaykh al-Islam Ibn Taymiyah and the praise of the imams", summary, highlight);
const ALBANI_PAGE = (summary: string, highlight?: string) => islamqa(113687, "Shaykh al-Albani was a great muhaddith and faqih", summary, highlight);
const ALBANI_PRIZE = (summary: string, highlight?: string) => kingFaisalPrize("sheikh-mohammad-nasir-ad-din-al-albani", "Sheikh Mohammad Nasir Ad-Din Al-Albani", summary, highlight);
const IBN_BAZ_PRIZE = (summary: string, highlight?: string) => kingFaisalPrize("shaikh-abd-al-aziz-a-bin-baz", "Shaikh Abd Al-Aziz Bin Baz", summary, highlight);
const IBN_BAZ_TARAJM = (summary: string, highlight?: string): LessonSource => ({
  id: "deep_tarajm_69265",
  site: "Tarajm",
  category: "biography",
  title: "Abd al-Aziz ibn Baz",
  url: "https://www.tarajm.com/people/69265",
  reference: "Tarajm: Ibn Baz",
  from: "Tarajm, biographies of scholars (Arabic)",
  grade: "Biography",
  summary,
  highlight
});

const ABU_HANIFAH: DeepUnit = {
  key: "abuhanifah",
  topicId: "scholars",
  branchId: "scholar-abu-hanifah",
  name: "Abu Hanifah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "his-name",
      title: "An-Nu'man of Kufa",
      line: "Abu Hanifah's name was an-Nu'man ibn Thabit, of Kufa.",
      facts: ["Name: an-Nu'man ibn Thabit", "City: Kufa, in Iraq"],
      source: ABU_HANIFAH_PAGE("Abu Haneefah al-Nu'maan ibn Thaabit al-Taymi al-Kufi.", "Imam Abu Haneefah is the great faqeeh and scholar of Iraq"),
      difficulty: 1,
      questions: [
        { q: "What was Abu Hanifah's own name?", a: "An-Nu'man ibn Thabit", wrong: ["Malik ibn Anas", "Ahmad ibn Hanbal", "Muhammad ibn Idris"], why: "Abu Hanifah is his kunya; an-Nu'man is his name." },
        { q: "Which city was Abu Hanifah from?", a: "Kufa", wrong: ["Madinah", "Baghdad", "Gaza"], why: "He is called al-Kufi, the man of Kufa." },
        { q: "Abu Hanifah and an-Nu'man ibn Thabit are two different men.", tf: false, why: "They are the same imam." }
      ]
    },
    {
      slug: "born-80",
      title: "Born in 80 AH",
      line: "Abu Hanifah was born in 80 AH, when some Sahabah still lived.",
      facts: ["Born 80 AH", "He saw Anas ibn Malik in Kufa"],
      source: ABU_HANIFAH_PAGE("He was born in the year 80 AH, during the lifetime of some of the younger Sahabah, and saw Anas ibn Malik when he came to Kufa.", "He was born in the year 80 AH, during the lifetime of some of the younger Sahabah"),
      difficulty: 1,
      questions: [
        { q: "In which year was Abu Hanifah born?", a: "80 AH", wrong: ["150 AH", "204 AH", "661 AH"], why: "Some younger Sahabah were still alive then." },
        { q: "Which companion did Abu Hanifah see in Kufa?", a: "Anas ibn Malik", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "Anas came to Kufa and he saw him." },
        { q: "Of the four imams, which was born first?", a: "Abu Hanifah", wrong: ["Malik", "Ash-Shafi'i", "Ahmad"], why: "He was born in 80 AH, before the other three." }
      ]
    },
    {
      slug: "his-teacher",
      title: "His greatest shaykh",
      line: "Abu Hanifah's greatest teacher was Ata ibn Abi Rabah.",
      facts: ["Greatest shaykh: Ata", "Also learned from ash-Sha'bi", "He travelled for knowledge"],
      source: ABU_HANIFAH_PAGE("He learned from 'Ata' ibn Abi Rabah, who was his greatest Shaykh, and from al-Shu'bi and many others, and he travelled to seek reports.", "ibn Abi Rabah, who was his greatest Shaykh"),
      difficulty: 2,
      questions: [
        { q: "Who was Abu Hanifah's greatest shaykh?", a: "Ata ibn Abi Rabah", wrong: ["Imam Malik", "Ibn Shihab", "Hushaym"], why: "He learned from him above all others." },
        { q: "Why did Abu Hanifah travel?", a: "To seek reports", wrong: ["To trade", "To fight", "To rest"], why: "He travelled to find hadith and reports." },
        { q: "Abu Hanifah learned from only one teacher.", tf: false, why: "He learned from Ata, ash-Sha'bi and many others." }
      ]
    },
    {
      slug: "the-first-madhhab",
      title: "The first madhhab",
      line: "The Hanafi madhhab was the first of the madhhabs of fiqh.",
      facts: ["First of the madhhabs", "People need him in fiqh"],
      source: ABU_HANIFAH_PAGE("The Hanafi madhhab was the first of the fiqhi madhhabs, and the people are dependent on Abu Haneefah with regard to fiqh.", "it was the first of the fiqhi madhhabs"),
      difficulty: 2,
      questions: [
        { q: "Which madhhab was the first?", a: "The Hanafi madhhab", wrong: ["The Maliki madhhab", "The Shafi'i madhhab", "The Hanbali madhhab"], why: "It began with Abu Hanifah." },
        { q: "In which field do people depend on Abu Hanifah?", a: "Fiqh", wrong: ["Poetry", "Medicine", "Trade"], why: "Fiqh is understanding the rulings of the religion." },
        { q: "Who is the Hanafi madhhab named after?", a: "Abu Hanifah", wrong: ["Ahmad", "Malik", "Ash-Shafi'i"], why: "Each of the four madhhabs carries its imam's name." }
      ]
    },
    {
      slug: "sahih-is-my-madhhab",
      title: "The hadith comes first",
      line: "Abu Hanifah said: if the hadith is sahih, that is my madhhab.",
      facts: ["The other three imams said the same", "He was strict with hadith"],
      source: ABU_HANIFAH_PAGE("He said: If the hadeeth is saheeh then that is my madhhab. He was very strict about accepting ahadeeth, as false reports were widespread in Iraq.", "If the hadeeth is saheeh then that is my madhhab"),
      difficulty: 3,
      questions: [
        { q: "What did Abu Hanifah say about a sahih hadith?", a: "That is my madhhab", wrong: ["Leave it", "Ask a judge", "Only for scholars"], why: "An authentic hadith comes before any opinion." },
        { q: "Why was he strict about accepting hadith?", a: "False reports spread in Iraq", wrong: ["He had no teachers", "He disliked hadith", "He could not read"], why: "So he checked reports carefully." },
        { q: "Malik, ash-Shafi'i and Ahmad followed the same rule.", tf: true, why: "All four imams put the hadith first." }
      ]
    },
    {
      slug: "his-students",
      title: "Abu Yusuf and Muhammad",
      line: "His students Abu Yusuf and Muhammad carried his madhhab on.",
      facts: ["Some Hanafi views are from his students", "Abu Yusuf: he spoke most clearly"],
      source: ABU_HANIFAH_PAGE("The Hanafi madhhab may adopt the view of a student of the imam such as Abu Yoosuf and Muhammad. Abu Yoosuf said he was the most well-spoken and clear of the people.", "may adopt the view of a student of the imam such as Abu Yoosuf and Muhammad"),
      difficulty: 3,
      questions: [
        { q: "Which two students carried on his madhhab?", a: "Abu Yusuf and Muhammad", wrong: ["Malik and Ahmad", "Abu Bakr and Umar", "Nafi and Hushaym"], why: "Some Hanafi views are theirs." },
        { q: "How did Abu Yusuf describe his teacher?", a: "The clearest speaker", wrong: ["Very quiet", "A great poet", "A rich trader"], why: "He was the most well-spoken of the people." },
        { q: "Every Hanafi view is Abu Hanifah's own words.", tf: false, why: "Some views come from his students." }
      ]
    },
    {
      slug: "he-refused",
      title: "He would not be a judge",
      line: "Abu Hanifah turned down wealth and refused to become a judge.",
      facts: ["Offered great wealth: refused", "Hurt to force him: still refused"],
      source: ABU_HANIFAH_PAGE("He was offered worldly gains and a great deal of wealth, but he turned his back on it. He was whipped to force him to accept the position of judge, but he refused.", "He was offered worldly gains and a great deal of wealth, but he turned his back on it"),
      difficulty: 4,
      questions: [
        { q: "What did Abu Hanifah do when offered great wealth?", a: "He turned it down", wrong: ["He took it all", "He hid it", "He traded it"], why: "He did not want the dunya." },
        { q: "Which job did he refuse, even when hurt for it?", a: "Judge", wrong: ["Teacher", "Imam of prayer", "Trader"], why: "He was pressured hard, yet refused." },
        { q: "Abu Hanifah gave in once he was pressured.", tf: false, why: "He refused to the end." }
      ]
    },
    {
      slug: "died-150",
      title: "Died in 150 AH",
      line: "Abu Hanifah died in 150 AH, at about seventy years old.",
      facts: ["Died 150 AH", "Age: seventy", "Adh-Dhahabi: his life needs two volumes"],
      source: ABU_HANIFAH_PAGE("He died as a martyr of dropsy in 150 AH at the age of seventy. Al-Dhahabi said it would take two volumes to tell the story of his life.", "he died as a martyr of dropsy in 150 AH at the age of seventy"),
      difficulty: 4,
      questions: [
        { q: "In which year did Abu Hanifah die?", a: "150 AH", wrong: ["80 AH", "179 AH", "241 AH"], why: "He was about seventy." },
        { q: "How much did adh-Dhahabi say his life story would fill?", a: "Two volumes", wrong: ["One page", "Ten lines", "A short poem"], why: "His life was full of knowledge and worship." },
        { q: "How old was Abu Hanifah when he died?", a: "About seventy", wrong: ["About forty", "About fifty", "About ninety"], why: "Born 80 AH, he died in 150 AH." }
      ]
    }
  ]
};

const MALIK: DeepUnit = {
  key: "malik",
  topicId: "scholars",
  branchId: "scholar-malik",
  name: "Imam Malik",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "imam-of-madinah",
      title: "Malik ibn Anas",
      line: "Imam Malik ibn Anas was born in Madinah in 93 AH.",
      facts: ["Born 93 AH, Madinah", "Mother: al-Aliyah"],
      source: MALIK_PAGE("Malik ibn Anas was born in 93 AH in Madinah, according to the majority of scholars; his mother's name was al-'Aliyah bint Shurayk al-Azdiyyah.", "according to the majority of scholars – was born in 93 AH in Madinah"),
      difficulty: 1,
      questions: [
        { q: "In which city was Imam Malik born?", a: "Madinah", wrong: ["Kufa", "Baghdad", "Gaza"], why: "He lived and taught in the Prophet's ﷺ city." },
        { q: "What was his father's name?", a: "Anas", wrong: ["Thabit", "Idris", "Hanbal"], why: "He is Malik ibn Anas." },
        { q: "In which year was he born, as most scholars say?", a: "93 AH", wrong: ["80 AH", "150 AH", "164 AH"], why: "That is the view of the majority." }
      ]
    },
    {
      slug: "a-family-of-knowledge",
      title: "A family of knowledge",
      line: "Malik's grandfather was a Tabi'i; Malik learned the Quran young.",
      facts: ["Grandfather: a senior Tabi'i", "Quran memorized early"],
      source: MALIK_PAGE("His grandfather Malik ibn Abi 'Amir was one of the senior Tabi'in. Imam Malik memorized the Qur'an early in life.", "His grandfather Malik ibn Abi `Amir was one of the senior Tabi`in; Imam Malik memorized the Qur’an early in life – as is the case in many Muslim families"),
      difficulty: 1,
      questions: [
        { q: "Who in Malik's family was a senior Tabi'i?", a: "His grandfather", wrong: ["His son", "His brother", "His uncle"], why: "Malik ibn Abi Amir was among the senior Tabi'in." },
        { q: "What did Malik memorize early in life?", a: "The Quran", wrong: ["Poetry", "Maps", "Trade law"], why: "He began with the Book of Allah." },
        { q: "A Tabi'i is someone who met the Sahabah.", tf: true, why: "The Tabi'in learned from the companions." }
      ]
    },
    {
      slug: "his-teachers",
      title: "His teachers",
      line: "Malik learned from Ibn Hurmuz for seven years, then others.",
      facts: ["Ibn Hurmuz: seven years", "Nafi: freed servant of Ibn Umar", "Ibn Shihab az-Zuhri"],
      source: MALIK_PAGE("He studied with Ibn Hormuz for seven years when he was very young. He studied with Nafi', the freed slave of Ibn 'Umar, and under Imam Ibn Shihab az-Zuhri.", "He studied with Ibn Hormuz for seven years … He studied under Imam Ibn Shihab az-Zuhri"),
      difficulty: 2,
      questions: [
        { q: "How long did Malik study with Ibn Hurmuz?", a: "Seven years", wrong: ["One month", "One year", "Forty years"], why: "He started very young." },
        { q: "Nafi was the freed servant of which companion?", a: "Ibn Umar", wrong: ["Abu Bakr", "Ali", "Anas"], why: "Nafi carried Ibn Umar's knowledge." },
        { q: "Which of these was one of Malik's teachers?", a: "Ibn Shihab az-Zuhri", wrong: ["Ahmad ibn Hanbal", "Abu Yusuf", "Ibn Taymiyyah"], why: "Az-Zuhri was a great scholar of hadith." }
      ]
    },
    {
      slug: "vessel-of-knowledge",
      title: "A vessel of knowledge",
      line: "Az-Zuhri told him forty hadith: you are a vessel of knowledge.",
      facts: ["Forty hadith in one sitting", "Vessel of knowledge"],
      source: MALIK_PAGE("Ibn Shihab narrated forty hadiths to me, then said: Now go, for you are one of the vessels of knowledge.", "So I took out my boards and he narrated forty hadiths to me … Now go, for you are one of the vessels of knowledge"),
      difficulty: 3,
      questions: [
        { q: "How many hadith did az-Zuhri tell him?", a: "Forty", wrong: ["Four", "Ten", "One thousand"], why: "Malik remembered them all." },
        { q: "What did az-Zuhri call Malik?", a: "A vessel of knowledge", wrong: ["A great poet", "A brave fighter", "A fast runner"], why: "He saw how well Malik kept what he heard." },
        { q: "Az-Zuhri thought Malik was too young to learn.", tf: false, why: "He praised him as a vessel of knowledge." }
      ]
    },
    {
      slug: "seventy-testified",
      title: "Seventy said yes",
      line: "Malik only taught once seventy scholars said he was qualified.",
      facts: ["Seventy elders testified", "Then he sat to teach"],
      source: MALIK_PAGE("Malik said: I did not sit in the mosque to teach until seventy elders of great knowledge testified that I was qualified.", "I did not sit in the mosque to teach until seventy elder of great knowledge testified that I was qualified to do that"),
      difficulty: 3,
      questions: [
        { q: "How many scholars testified before Malik began teaching?", a: "Seventy", wrong: ["Two", "Ten", "Three hundred"], why: "He waited until they agreed." },
        { q: "What does this teach us?", a: "Do not rush to teach", wrong: ["Teach before learning", "Ignore elders", "Never teach"], why: "He was careful and humble." },
        { q: "Where did Malik sit to teach?", a: "In the masjid", wrong: ["In the market", "In a palace", "In the desert"], why: "He taught in the Prophet's ﷺ masjid in Madinah." }
      ]
    },
    {
      slug: "ten-years",
      title: "Ten years on one question",
      line: "Malik said: I have thought about one issue for over ten years.",
      facts: ["Very careful with fatwa", "Said to Ibn al-Qasim"],
      source: MALIK_PAGE("His student Ibn al-Qasim heard him say: I have been thinking about an issue for more than ten years, and I have not yet reached any conclusion.", "I have been thinking about an issue for more than ten years, and I have not yet reached any conclusion about it"),
      difficulty: 3,
      questions: [
        { q: "How long had Malik thought about one issue?", a: "More than ten years", wrong: ["One hour", "One day", "One week"], why: "He did not rush to give a ruling." },
        { q: "What does this show about Imam Malik?", a: "He was careful with fatwa", wrong: ["He was lazy", "He disliked questions", "He forgot things"], why: "Speaking about Allah's religion needs care." },
        { q: "Malik answered every question at once, without thinking.", tf: false, why: "He took great care before answering." }
      ]
    },
    {
      slug: "his-circle",
      title: "A quiet circle",
      line: "Malik's circle had no arguing and no raised voices.",
      facts: ["No chatter or shouting", "He honored the Prophet's ﷺ hadith"],
      source: MALIK_PAGE("He greatly venerated the hadith of the Messenger of Allah. There were no arguments in his circle, and no chatter, clamour or raising of voices.", "He greatly venerated the hadith of the Messenger of Allah … no chatter, clamour or raising of voices"),
      difficulty: 4,
      questions: [
        { q: "What was Malik's teaching circle like?", a: "Calm, with no arguing", wrong: ["Loud and busy", "Full of jokes", "Always arguing"], why: "He honored the hadith of the Prophet ﷺ." },
        { q: "What did Malik greatly honor?", a: "The Prophet's ﷺ hadith", wrong: ["His own wealth", "Poetry", "The market"], why: "So his circle was quiet and respectful." },
        { q: "Students shouted questions in Malik's circle.", tf: false, why: "No voices were raised there." }
      ]
    },
    {
      slug: "sold-the-roof",
      title: "He sold his roof",
      line: "Seeking knowledge, Malik spent so much he sold his roof's wood.",
      facts: ["Knocked down his roof", "Sold the wood for knowledge"],
      source: MALIK_PAGE("He spent so much in seeking knowledge that he ended up having to knock down the roof of his house and sell the lumber.", "Malik was so preoccupied with seeking knowledge that he ended up having to knock down the roof of his house and sell the lumber"),
      difficulty: 4,
      questions: [
        { q: "What did Malik sell to keep seeking knowledge?", a: "The wood of his roof", wrong: ["His books", "His horse", "His sword"], why: "He gave everything for knowledge." },
        { q: "What does this teach?", a: "Knowledge is worth sacrifice", wrong: ["Houses need no roof", "Wood is cheap", "Never spend"], why: "He put learning before comfort." },
        { q: "Malik grew rich from seeking knowledge.", tf: false, why: "He spent until he sold his roof's wood." }
      ]
    },
    {
      slug: "the-star",
      title: "Malik is the star",
      line: "Ash-Shafi'i said: in hadith, Malik is the star.",
      facts: ["Praise from ash-Shafi'i", "Arrested and hurt by al-Mansur's men", "Died 179 AH, aged about ninety"],
      source: MALIK_PAGE("Ash-Shafi'i said: When it comes to hadith narrations, Malik is the star. Most historians say he died in 179 AH; he lived about ninety years and people learned from him for about seventy.", "When it comes to hadith narrations, Malik is the star"),
      difficulty: 5,
      questions: [
        { q: "Who said Malik is the star of hadith?", a: "Ash-Shafi'i", wrong: ["Abu Hanifah", "Ibn Baz", "Az-Zuhri"], why: "Ash-Shafi'i was his student." },
        { q: "For how long did people learn from Malik?", a: "About seventy years", wrong: ["About ten years", "About two years", "One summer"], why: "He taught for most of his long life." },
        { q: "In which year did Malik die, as most historians say?", a: "179 AH", wrong: ["150 AH", "204 AH", "241 AH"], why: "He lived about ninety years." }
      ]
    }
  ]
};

const SHAFII: DeepUnit = {
  key: "shafii",
  topicId: "scholars",
  branchId: "scholar-shafii",
  name: "Imam ash-Shafi'i",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "his-name",
      title: "Muhammad ibn Idris",
      line: "Ash-Shafi'i was Muhammad ibn Idris, of the Prophet's ﷺ tribe.",
      facts: ["Kunya: Abu Abdillah", "Lineage meets the Prophet's ﷺ at Abd Manaf"],
      source: SHAFII_PAGE("Muhammad ibn Idris ibn al-'Abbas ibn 'Uthman ibn Shafi'; his lineage meets that of the Prophet ﷺ in 'Abd Manaf. Muslim ibn Khalid called him Abu 'Abdillah.", "Thus his lineage meets that of the Prophet"),
      difficulty: 1,
      questions: [
        { q: "What was ash-Shafi'i's own name?", a: "Muhammad ibn Idris", wrong: ["Ahmad ibn Hanbal", "Malik ibn Anas", "An-Nu'man ibn Thabit"], why: "Ash-Shafi'i is named after his ancestor Shafi'." },
        { q: "Where does his family line meet the Prophet's ﷺ?", a: "At Abd Manaf", wrong: ["At Adam only", "It never meets", "At Ibn Umar"], why: "Abd Manaf is an ancestor of both." },
        { q: "What was ash-Shafi'i's kunya?", a: "Abu Abdillah", wrong: ["Abu Hanifah", "Abu Turab", "Abu Yusuf"], why: "His teacher Muslim ibn Khalid called him by it." }
      ]
    },
    {
      slug: "orphan-of-gaza",
      title: "A poor orphan",
      line: "Ash-Shafi'i was born in Gaza and grew up a poor orphan.",
      facts: ["Born in Gaza, most say", "Grew up poor, with no father"],
      source: SHAFII_PAGE("Most historians are of the view that ash-Shafi'i was born in Gaza in Palestine. The reports are agreed that he lived the life of a poor orphan.", "Most historians are of the view that ash-Shafa`i was born in Gaza in Palestine"),
      difficulty: 1,
      questions: [
        { q: "Where was ash-Shafi'i born, as most historians say?", a: "Gaza", wrong: ["Madinah", "Kufa", "Baghdad"], why: "Gaza is in Palestine." },
        { q: "How did ash-Shafi'i grow up?", a: "A poor orphan", wrong: ["A rich prince", "With a big army", "As a trader's son"], why: "Every report agrees on this." },
        { q: "Being poor stopped ash-Shafi'i from learning.", tf: false, why: "He became one of the greatest imams." }
      ]
    },
    {
      slug: "with-hudhayl",
      title: "Among the Bedouin",
      line: "Ash-Shafi'i lived with Hudhayl, a tribe, to learn pure Arabic.",
      facts: ["Quran, then hadith", "Hudhayl: a Bedouin tribe"],
      source: SHAFII_PAGE("He memorized the Holy Quran, then the hadith. He said: I left Makkah and stayed with Hudhayl in the wilderness, to learn their speech and adopt their manners.", "I left Makkah and stayed with Hudhayl in the wilderness, to learn their speech and adopt their manners"),
      difficulty: 2,
      questions: [
        { q: "Why did ash-Shafi'i stay with the tribe of Hudhayl?", a: "To learn their Arabic", wrong: ["To trade camels", "To hide", "To fight"], why: "He learned their speech and manners." },
        { q: "Where did he stay with them?", a: "In the desert", wrong: ["In a palace", "On a ship", "In Baghdad"], why: "He left Makkah for the wilderness." },
        { q: "What did he memorize first?", a: "The Quran", wrong: ["Poetry", "Maps", "Medicine"], why: "Then he memorized hadith." }
      ]
    },
    {
      slug: "to-malik",
      title: "To Imam Malik",
      line: "Ash-Shafi'i went to Madinah to study with Imam Malik.",
      facts: ["Carried a letter from Makkah's governor", "Malik: fear Allah and avoid sins"],
      source: SHAFII_PAGE("Ash-Shafi'i went to Malik carrying a letter of recommendation from the governor of Makkah. Malik said: O Muhammad, fear Allah and avoid sins, for you will become very prominent.", "went to Malik carrying a letter … for you will become very prominent"),
      difficulty: 2,
      questions: [
        { q: "Which imam did ash-Shafi'i study with in Madinah?", a: "Imam Malik", wrong: ["Abu Hanifah", "Ahmad", "Ibn Taymiyyah"], why: "Malik was the great scholar of Madinah." },
        { q: "What did Malik advise him?", a: "Fear Allah and avoid sins", wrong: ["Go home", "Become a trader", "Stop asking"], why: "Malik saw he would become prominent." },
        { q: "Ash-Shafi'i came to Malik with a letter.", tf: true, why: "The governor of Makkah wrote it." }
      ]
    },
    {
      slug: "muhammad-ibn-al-hasan",
      title: "Learning from both sides",
      line: "He also learned from Muhammad ibn al-Hasan, a Hanafi.",
      facts: ["Muhammad ibn al-Hasan: Hanafi", "Ash-Shafi'i learned from both schools"],
      source: SHAFII_PAGE("He learned from his companion Muhammad ibn al-Hasan and studied many books with him; Muhammad ibn al-Hasan's testimony helped clear him when he was accused.", "learned from his companion Muhammad ibn al-Hasan and studied many books with him"),
      difficulty: 3,
      questions: [
        { q: "Whose student was Muhammad ibn al-Hasan?", a: "Abu Hanifah", wrong: ["Imam Malik", "Ahmad", "Ash-Shafi'i"], why: "He was one of the two great Hanafi students." },
        { q: "So ash-Shafi'i learned from students of which two imams?", a: "Malik and Abu Hanifah", wrong: ["Ahmad and Ibn Baz", "Ibn Taymiyyah and al-Albani", "Only Malik"], why: "He joined the knowledge of Madinah and Iraq." },
        { q: "Muhammad ibn al-Hasan spoke up for ash-Shafi'i when he was accused.", tf: true, why: "His testimony helped clear him." }
      ]
    },
    {
      slug: "ar-risalah",
      title: "Ar-Risalah",
      line: "Ash-Shafi'i's Ar-Risalah laid the foundations of usul al-fiqh.",
      facts: ["Usul al-fiqh: principles of fiqh", "Rewritten in Egypt"],
      source: SHAFII_PAGE("He wrote a book, Ar-Risalah, for the first time, in which he laid the foundations for the field of usul al-fiqh; when he returned to Egypt, he rewrote it.", "in which he laid the foundations for the field of usul al-fiqh"),
      difficulty: 3,
      questions: [
        { q: "What is ash-Shafi'i's famous book called?", a: "Ar-Risalah", wrong: ["Al-Muwatta", "Al-Musnad", "Sahih al-Bukhari"], why: "It set out the principles of fiqh." },
        { q: "Which field did Ar-Risalah lay the foundations for?", a: "Usul al-fiqh", wrong: ["Poetry", "Medicine", "Astronomy"], why: "The principles used to reach rulings." },
        { q: "Where did ash-Shafi'i rewrite Ar-Risalah?", a: "In Egypt", wrong: ["In Madinah", "In Kufa", "In Gaza"], why: "He revised it after he moved there." }
      ]
    },
    {
      slug: "najran",
      title: "Governor of Najran",
      line: "Ash-Shafi'i became governor of Najran and ruled with justice.",
      facts: ["Najran: in the south of Arabia", "He established justice"],
      source: SHAFII_PAGE("Ash-Shafi'i became the governor of Najran, where he established justice.", "became the governor of Najran, where he established justice"),
      difficulty: 4,
      questions: [
        { q: "Which place did ash-Shafi'i govern?", a: "Najran", wrong: ["Baghdad", "Kufa", "Madinah"], why: "He ruled it with justice." },
        { q: "What did he establish there?", a: "Justice", wrong: ["A market", "A palace", "An army"], why: "A scholar in power must be just." },
        { q: "Ash-Shafi'i ruled Najran unjustly.", tf: false, why: "He established justice there." }
      ]
    },
    {
      slug: "meets-ahmad",
      title: "He taught Ahmad",
      line: "Ahmad ibn Hanbal met ash-Shafi'i and learned fiqh from him.",
      facts: ["Ahmad: like sunshine for the world", "Teacher and student, both imams"],
      source: SHAFII_PAGE("It was at that time that Ahmad ibn Hanbal met him. Ahmad said: Ash-Shafi'i was like sunshine for this world and good health for the body.", "was like sunshine for this world and good health for the body"),
      difficulty: 4,
      questions: [
        { q: "Which imam was ash-Shafi'i's student?", a: "Ahmad ibn Hanbal", wrong: ["Imam Malik", "Abu Hanifah", "Ibn Hurmuz"], why: "Ahmad became the imam of the Hanbali madhhab." },
        { q: "What did Ahmad compare ash-Shafi'i to?", a: "Sunshine for the world", wrong: ["A dark night", "A cold wind", "A small lamp"], why: "And good health for the body." },
        { q: "Ash-Shafi'i was both a student of one imam and teacher of another.", tf: true, why: "He learned from Malik and taught Ahmad." }
      ]
    },
    {
      slug: "died-in-egypt",
      title: "Died in Egypt, 204 AH",
      line: "Ash-Shafi'i died in Egypt in 204 AH, aged fifty-four.",
      facts: ["Last night of Rajab, 204 AH", "His grave is in Egypt"],
      source: SHAFII_PAGE("He died there, in Egypt, on the last night of Rajab 204 AH at the age of fifty-four, and his grave is there.", "then he died there on the last night of Rajab 204 AH at the age of fifty-four"),
      difficulty: 5,
      questions: [
        { q: "Where did ash-Shafi'i die?", a: "Egypt", wrong: ["Gaza", "Madinah", "Baghdad"], why: "His grave is there." },
        { q: "How old was he when he died?", a: "Fifty-four", wrong: ["Seventy", "Ninety", "Thirty"], why: "He died young, yet left a whole madhhab." },
        { q: "In which year did ash-Shafi'i die?", a: "204 AH", wrong: ["150 AH", "179 AH", "241 AH"], why: "On the last night of Rajab." }
      ]
    }
  ]
};

const AHMAD: DeepUnit = {
  key: "ahmad",
  topicId: "scholars",
  branchId: "scholar-ahmad",
  name: "Imam Ahmad",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "born-in-baghdad",
      title: "Born in Baghdad",
      line: "Imam Ahmad ibn Hanbal was born in Baghdad in 164 AH.",
      facts: ["Rabi al-Awwal, 164 AH", "His mother came from Marw"],
      source: AHMAD_PAGE("He was born in Rabi' al-Awwal 164 AH in Baghdad, where his mother had come when she was pregnant with him from Marw.", "in Baghdad, where his mother had come when she was pregnant with him from Marw"),
      difficulty: 1,
      questions: [
        { q: "In which city was Imam Ahmad born?", a: "Baghdad", wrong: ["Madinah", "Gaza", "Kufa"], why: "His mother came there from Marw." },
        { q: "In which year was he born?", a: "164 AH", wrong: ["80 AH", "93 AH", "661 AH"], why: "In the month of Rabi al-Awwal." },
        { q: "Of the four imams, who was born last?", a: "Ahmad", wrong: ["Abu Hanifah", "Malik", "Ash-Shafi'i"], why: "He was born in 164 AH." }
      ]
    },
    {
      slug: "an-orphan",
      title: "An orphan from Shayban",
      line: "Ahmad's father, an army commander, died when Ahmad was small.",
      facts: ["Tribe of Shayban: Arab", "Raised an orphan"],
      source: AHMAD_PAGE("His father was Shaybani and an army commander, and died when Ahmad was small; growing up as an orphan forced him to be self-reliant.", "His father was an army commander, and died when Ahmad was small"),
      difficulty: 1,
      questions: [
        { q: "What was Ahmad's father?", a: "An army commander", wrong: ["A judge", "A poet", "A farmer"], why: "He died when Ahmad was small." },
        { q: "How did Ahmad grow up?", a: "As an orphan", wrong: ["As a prince", "In a palace", "With great wealth"], why: "It taught him to rely on himself." },
        { q: "Which other imam also grew up an orphan?", a: "Ash-Shafi'i", wrong: ["Imam Malik", "Ibn Hurmuz", "Az-Zuhri"], why: "Both lost their fathers young." }
      ]
    },
    {
      slug: "first-teachers",
      title: "His first teachers",
      line: "Ahmad learned from Abu Yusuf, then Hushaym for four years.",
      facts: ["Abu Yusuf: Abu Hanifah's companion", "Hushaym al-Wasiti: four years"],
      source: AHMAD_PAGE("He first learned hadith from Abu Yusuf, the companion of Abu Hanifah, then remained the student of Hushaym ibn Bashir al-Wasiti for four years.", "he first learned hadith from Abu Yusuf, the companion of Abu Hanifah"),
      difficulty: 2,
      questions: [
        { q: "Who taught Ahmad hadith first?", a: "Abu Yusuf", wrong: ["Imam Malik", "Ibn Taymiyyah", "Nafi"], why: "Abu Yusuf was Abu Hanifah's companion." },
        { q: "How long did Ahmad study with Hushaym?", a: "Four years", wrong: ["Four days", "One month", "Forty years"], why: "Hushaym was a great scholar of hadith." },
        { q: "So Ahmad's first teacher was a student of which imam?", a: "Abu Hanifah", wrong: ["Ash-Shafi'i", "Ahmad", "Ibn Baz"], why: "Abu Yusuf studied with Abu Hanifah." }
      ]
    },
    {
      slug: "travels",
      title: "Travels for hadith",
      line: "Ahmad travelled for hadith and made Hajj five times.",
      facts: ["Three Hajjs on foot", "Met ash-Shafi'i on the journey"],
      source: AHMAD_PAGE("In 186 AH he began his travels in search of hadiths, during which he met ash-Shafi'i. He went for Hajj five times, for three of which he travelled on foot.", "Then in 186 AH, he began his travels in search of hadiths … for three of which he travelled on foot"),
      difficulty: 2,
      questions: [
        { q: "How many times did Ahmad go for Hajj?", a: "Five", wrong: ["Once", "Twice", "Twenty"], why: "Three of them on foot." },
        { q: "How did he travel for three of his Hajjs?", a: "On foot", wrong: ["On a ship", "On a horse", "In a carriage"], why: "Walking all the way to Makkah." },
        { q: "Whom did Ahmad meet on his travels and learn fiqh from?", a: "Ash-Shafi'i", wrong: ["Abu Hanifah", "Imam Malik", "Az-Zuhri"], why: "He learned fiqh and its principles from him." }
      ]
    },
    {
      slug: "to-sanaa",
      title: "All the way to San'a",
      line: "Ahmad went to San'a, in Yemen, to learn from Abd ar-Razzaq.",
      facts: ["San'a: in Yemen", "Friend: Yahya ibn Ma'in"],
      source: AHMAD_PAGE("Yahya ibn Ma'in introduced him: This is your brother Ahmad ibn Hanbal. Ahmad then went to learn from 'Abd al-Razzaq in San'a'.", "This is your brother Ahmad ibn Hanbal"),
      difficulty: 3,
      questions: [
        { q: "Which city did Ahmad travel to, to learn from Abd ar-Razzaq?", a: "San'a", wrong: ["Gaza", "Kufa", "Cairo"], why: "San'a is in Yemen." },
        { q: "Who travelled with Ahmad?", a: "Yahya ibn Ma'in", wrong: ["Imam Malik", "Ibn Hurmuz", "Abu Yusuf"], why: "He was a great scholar of hadith too." },
        { q: "Ahmad only learned from scholars in his own city.", tf: false, why: "He travelled as far as Yemen." }
      ]
    },
    {
      slug: "until-the-grave",
      title: "Until the grave",
      line: "Ahmad said: I will seek knowledge until I enter the grave.",
      facts: ["Taught only from age forty", "Read hadith from his books"],
      source: AHMAD_PAGE("He said: I will continue to seek knowledge until I enter the grave. Ahmad did not start to teach hadith and issue fatwas until he reached forty, and narrated only by reading from his books.", "I will continue to seek knowledge until I enter the grave"),
      difficulty: 3,
      questions: [
        { q: "Until when did Ahmad say he would seek knowledge?", a: "Until the grave", wrong: ["Until age twenty", "Until he got rich", "Until he married"], why: "Learning never ends." },
        { q: "At what age did he start teaching hadith?", a: "Forty", wrong: ["Ten", "Fifteen", "Seventy"], why: "He waited until he was ready." },
        { q: "Ahmad read hadith from his books to be more certain.", tf: true, why: "He wanted every word exact." }
      ]
    },
    {
      slug: "no-gifts",
      title: "He lived on little",
      line: "Ahmad refused gifts from rulers and lived on his father's land.",
      facts: ["Refused caliphs' gifts", "Lived on inherited property"],
      source: AHMAD_PAGE("He refused gifts from the caliphs and lived on the income of property that his father had left to him.", "Ahmad lived on the income of property that his father had left to him"),
      difficulty: 4,
      questions: [
        { q: "What did Ahmad live on?", a: "His father's property", wrong: ["Rulers' gifts", "Begging", "Selling books"], why: "He kept himself free of rulers' money." },
        { q: "Whose gifts did Ahmad refuse?", a: "The caliphs'", wrong: ["His mother's", "His students'", "His friends'"], why: "He stayed independent." },
        { q: "Ahmad grew rich from the caliphs' gifts.", tf: false, why: "He refused them." }
      ]
    },
    {
      slug: "the-trial",
      title: "The great trial",
      line: "Three caliphs jailed and hurt Ahmad, yet he stood firm.",
      facts: ["Al-Ma'mun, al-Mu'tasim, al-Wathiq", "The trial was about the Quran"],
      source: AHMAD_PAGE("He was detained and beaten, for his position on the Qur'an, by three of the caliphs in succession: al-Ma'mun, al-Mu'tasim and al-Wathiq.", "He was detained and beaten for that reason by three of the caliphs in succession"),
      difficulty: 4,
      questions: [
        { q: "How many caliphs tested Ahmad, one after another?", a: "Three", wrong: ["One", "Two", "Ten"], why: "Al-Ma'mun, al-Mu'tasim and al-Wathiq." },
        { q: "What was the trial about?", a: "The Quran", wrong: ["Money", "Land", "A war"], why: "He held to the belief of the Sunnah about the Quran." },
        { q: "What did Ahmad do under pressure?", a: "Stood firm", wrong: ["Gave up", "Ran away", "Changed his belief"], why: "His patience is remembered to this day." }
      ]
    },
    {
      slug: "the-musnad",
      title: "Died in 241 AH",
      line: "Imam Ahmad died in Baghdad on a Friday in 241 AH.",
      facts: ["12 Rabi al-Awwal, 241 AH", "Harmalah: none more pious"],
      source: AHMAD_PAGE("He passed away on a Friday morning, on the twelfth of Rabi' al-Awwal 241 AH, in Baghdad. Harmalah said he never saw anyone more pious or more knowledgeable than Ahmad ibn Hanbal.", "This great scholar passed away on a Friday morning"),
      difficulty: 5,
      questions: [
        { q: "Where did Imam Ahmad die?", a: "Baghdad", wrong: ["San'a", "Makkah", "Egypt"], why: "The city where he was born." },
        { q: "In which year did he die?", a: "241 AH", wrong: ["150 AH", "179 AH", "204 AH"], why: "On a Friday morning." },
        { q: "Harmalah said he never saw anyone more pious than Ahmad.", tf: true, why: "Harmalah was a student of ash-Shafi'i." }
      ]
    }
  ]
};

const IBN_TAYMIYYAH: DeepUnit = {
  key: "ibntaymiyyah",
  topicId: "scholars",
  branchId: "scholar-ibn-taymiyyah",
  name: "Ibn Taymiyyah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "his-name",
      title: "Ahmad ibn Abd al-Halim",
      line: "Ibn Taymiyyah's name was Ahmad ibn Abd al-Halim, born in 661 AH.",
      facts: ["Born Rabi al-Awwal, 661 AH", "Called Shaykh al-Islam"],
      source: IBN_TAYMIYYAH_PAGE("Shaykh al-Islam Ahmad ibn 'Abd al-Haleem ibn Taymiyah; al-Suyuti says he was born in Rabee' al-Awwal 661 AH.", "One of the prominent figures, he was born"),
      difficulty: 1,
      questions: [
        { q: "What was Ibn Taymiyyah's own name?", a: "Ahmad ibn Abd al-Halim", wrong: ["Ahmad ibn Hanbal", "Muhammad ibn Idris", "Malik ibn Anas"], why: "Ibn Taymiyyah is his family name." },
        { q: "In which year was he born?", a: "661 AH", wrong: ["80 AH", "164 AH", "1330 AH"], why: "Over four centuries after Imam Ahmad." },
        { q: "What title is he known by?", a: "Shaykh al-Islam", wrong: ["Caliph", "Sultan", "Qadi of Kufa"], why: "Scholars gave him this title." }
      ]
    },
    {
      slug: "from-harran",
      title: "From Harran to Damascus",
      line: "In 667 AH, his father took him from Harran to Damascus.",
      facts: ["Harran: his family's town", "Grandfather: a great imam too"],
      source: IBN_TAYMIYYAH_PAGE("Ibn Hajar: his father took him with him from Harraan in 667 AH. Al-Suyuti names his grandfather, the imam Majd al-Deen 'Abd al-Salam.", "His father took him with him from Harraan in 667 AH"),
      difficulty: 2,
      questions: [
        { q: "Which town did his family come from?", a: "Harran", wrong: ["Gaza", "Kufa", "Madinah"], why: "His father brought him from there in 667 AH." },
        { q: "Who in his family was also a great imam?", a: "His grandfather", wrong: ["His son", "His student", "His neighbor"], why: "Majd ad-Din Abd as-Salam." },
        { q: "How old was he when the family moved, born 661 AH?", a: "About six", wrong: ["About twenty", "About forty", "About one"], why: "667 minus 661 is six." }
      ]
    },
    {
      slug: "teachers",
      title: "His teachers",
      line: "Ibn Taymiyyah had many teachers, and copied Sunan Abi Dawud.",
      facts: ["Teacher: Ibn Abd ad-Da'im", "Copied Sunan Abi Dawud himself"],
      source: IBN_TAYMIYYAH_PAGE("Ibn Hajar: he learned from Ibn 'Abd al-Daa'im, al-Qaasim al-Arbili and others; he read by himself and copied Sunan Abi Dawood.", "He read by himself and copied Sunan Abi Dawood"),
      difficulty: 2,
      questions: [
        { q: "Which of these was one of his teachers?", a: "Ibn Abd ad-Da'im", wrong: ["Imam Malik", "Abu Hanifah", "Ibn Baz"], why: "Ibn Hajar names him first." },
        { q: "Which hadith book did he copy out himself?", a: "Sunan Abi Dawud", wrong: ["Al-Muwatta", "Ar-Risalah", "Silsilah as-Sahihah"], why: "He also read much on his own." },
        { q: "He only learned from books, never from teachers.", tf: false, why: "He had many teachers and also read alone." }
      ]
    },
    {
      slug: "his-students",
      title: "Ibn al-Qayyim and adh-Dhahabi",
      line: "Ibn al-Qayyim was his student; adh-Dhahabi called him shaykh.",
      facts: ["Ibn al-Qayyim: many useful books", "Adh-Dhahabi: unrivalled in knowledge"],
      source: IBN_TAYMIYYAH_PAGE("Ibn Hajar mentions his student Shams al-Deen ibn Qayyim al-Jawziyyah, the author of so many beneficial books. Adh-Dhahabi said: He is our Shaykh, unrivalled in our time in knowledge.", "his student was Shaykh Shams al-Deen ibn Qayyim al-Jawziyyah"),
      difficulty: 3,
      questions: [
        { q: "Which famous scholar was his student?", a: "Ibn al-Qayyim", wrong: ["Imam Ahmad", "Ash-Shafi'i", "Imam Malik"], why: "He wrote many useful books." },
        { q: "What did adh-Dhahabi call him?", a: "Our shaykh", wrong: ["Our caliph", "Our student", "Our judge"], why: "Unrivalled in knowledge in his time." },
        { q: "Ibn al-Qayyim lived before Ibn Taymiyyah.", tf: false, why: "He was his student." }
      ]
    },
    {
      slug: "three-hundred-books",
      title: "Three hundred books",
      line: "Al-Suyuti said Ibn Taymiyyah wrote three hundred books.",
      facts: ["Tafsir, hadith and fiqh", "Quick memory, great courage"],
      source: IBN_TAYMIYYAH_PAGE("Al-Suyuti: he wrote three hundred books. Ibn Hajar: he had an amazing ability to recollect quickly; he was courageous. Adh-Dhahabi: he excelled in tafseer.", "He wrote three hundred books"),
      difficulty: 3,
      questions: [
        { q: "How many books did al-Suyuti say he wrote?", a: "Three hundred", wrong: ["Three", "Thirty", "Ten"], why: "He wrote, taught and gave fatwas." },
        { q: "How did Ibn Hajar describe him?", a: "Courageous, with a quick memory", wrong: ["Shy and forgetful", "Rich and lazy", "Quiet and slow"], why: "Both his mind and heart were strong." },
        { q: "Adh-Dhahabi said he excelled in tafsir.", tf: true, why: "He went deep into the Quran's meanings." }
      ]
    },
    {
      slug: "evidence-first",
      title: "The stronger evidence",
      line: "His fatwas followed the stronger evidence, not one madhhab.",
      facts: ["Followed the dalil", "Like the four imams taught"],
      source: IBN_TAYMIYYAH_PAGE("Adh-Dhahabi: when he issued a fatwa he did not adhere to the view of a madhhab, rather he based his fatwa on whichever view was supported by the stronger evidence.", "when he issued a fatwa he did not adhere to the view of a madhhab"),
      difficulty: 4,
      questions: [
        { q: "What did his fatwas follow?", a: "The stronger evidence", wrong: ["Whatever rulers wanted", "Only his teachers", "His feelings"], why: "Adh-Dhahabi says so." },
        { q: "Which imam's saying matches this?", a: "If the hadith is sahih, that is my madhhab", wrong: ["Never read hadith", "Follow the ruler", "Ignore evidence"], why: "Abu Hanifah and the other imams said it." },
        { q: "Ibn Taymiyyah always kept to one madhhab's view, whatever the evidence.", tf: false, why: "He took the view with stronger evidence." }
      ]
    },
    {
      slug: "prison-and-funeral",
      title: "Prison and a huge funeral",
      line: "Jailed in Cairo and Alexandria, he died in prison in 728 AH.",
      facts: ["Patient under harm", "No funeral gathered more people"],
      source: IBN_TAYMIYYAH_PAGE("Ibn Hajar: he was imprisoned in Cairo, then in Alexandria; he died in 728 AH imprisoned in the citadel. Barzaali: there was no one for whose funeral people gathered as they did for him.", "he was imprisoned in Cairo, then in Alexandria"),
      difficulty: 5,
      questions: [
        { q: "In which two cities was he jailed?", a: "Cairo and Alexandria", wrong: ["Makkah and Madinah", "Kufa and Baghdad", "Gaza and San'a"], why: "He was harmed for holding to the Sunnah." },
        { q: "In which year did he die?", a: "728 AH", wrong: ["661 AH", "241 AH", "1420 AH"], why: "He died while still jailed." },
        { q: "Very few people came to his funeral.", tf: false, why: "Few funerals in history gathered so many." }
      ]
    }
  ]
};

const IBN_BAZ: DeepUnit = {
  key: "ibnbaz",
  topicId: "scholars",
  branchId: "scholar-ibn-baz",
  name: "Ibn Baz",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "born-in-riyadh",
      title: "Born in Riyadh",
      line: "Shaykh Abd al-Aziz ibn Baz was born in Riyadh in 1912.",
      facts: ["Born 22 November 1912", "Riyadh, Saudi Arabia"],
      source: IBN_BAZ_PRIZE("Born: November 22, 1912, Riyadh, Kingdom of Saudi Arabia.", "Born: November 22, 1912, Riyadh, Kingdom of Saudi Arabia"),
      difficulty: 1,
      questions: [
        { q: "In which city was Ibn Baz born?", a: "Riyadh", wrong: ["Damascus", "Baghdad", "Cairo"], why: "In what is now Saudi Arabia." },
        { q: "In which year was Ibn Baz born?", a: "1912", wrong: ["1800", "1950", "1999"], why: "On 22 November 1912." },
        { q: "Ibn Baz lived in the same century as al-Albani.", tf: true, why: "Both lived through the 1900s." }
      ]
    },
    {
      slug: "worked-young",
      title: "Working young",
      line: "His father died when he was three; by thirteen he worked.",
      facts: ["Father died: age three", "Working by age thirteen"],
      source: IBN_BAZ_PRIZE("His father died when he was three and by the age of 13 he had to work to help support his family."),
      difficulty: 2,
      questions: [
        { q: "How old was Ibn Baz when his father died?", a: "Three", wrong: ["Ten", "Twenty", "Forty"], why: "He grew up without his father." },
        { q: "Why did he work by age thirteen?", a: "To support his family", wrong: ["To buy toys", "To travel", "For fun"], why: "He helped carry his family." },
        { q: "Which of the four imams also lost his father young?", a: "Ahmad", wrong: ["Imam Malik", "Abu Hanifah", "None of them"], why: "Ahmad and ash-Shafi'i grew up orphans." }
      ]
    },
    {
      slug: "quran-before-puberty",
      title: "The Quran as a boy",
      line: "Ibn Baz memorized the Quran before he reached puberty.",
      facts: ["Taught by Abdullah ibn Mufayrij", "Ten years with Muhammad ibn Abd al-Latif"],
      source: IBN_BAZ_TARAJM("I memorized the Quran before puberty under Shaykh Abdullah ibn Mufayrij. He attended the circles of Shaykh Muhammad ibn Abd al-Latif Al ash-Shaykh for about ten years, 1347 to 1357 AH.", "فحفظت القرآن الكريم قبل البلوغ على يد الشيخ عبد الله بن مفيرج"),
      difficulty: 2,
      questions: [
        { q: "When did Ibn Baz memorize the Quran?", a: "Before puberty", wrong: ["At sixty", "After he went blind", "Never"], why: "He began young." },
        { q: "How long did he study with Muhammad ibn Abd al-Latif?", a: "About ten years", wrong: ["One week", "One year", "Forty years"], why: "From 1347 to 1357 AH." },
        { q: "Ibn Baz had only one teacher.", tf: false, why: "He studied with many scholars of Riyadh." }
      ]
    },
    {
      slug: "lost-his-sight",
      title: "Blind by twenty",
      line: "By twenty Ibn Baz had lost his sight, yet kept studying.",
      facts: ["Quran, hadith, fiqh, tafsir", "Blindness did not stop him"],
      source: IBN_BAZ_PRIZE("By the age of 20, he lost his sight completely, while relentlessly pursuing studies of the Qur'an, Hadith, Fiqh and Tafsir."),
      difficulty: 3,
      questions: [
        { q: "By what age had Ibn Baz lost his sight?", a: "Twenty", wrong: ["Five", "Fifty", "Eighty"], why: "He lost it completely." },
        { q: "What did he do after losing his sight?", a: "Kept studying", wrong: ["Gave up learning", "Moved away", "Became a trader"], why: "He studied the Quran, hadith, fiqh and tafsir." },
        { q: "Losing his sight stopped him from becoming a scholar.", tf: false, why: "He became one of the great scholars of his time." }
      ]
    },
    {
      slug: "islamic-university",
      title: "The Islamic University",
      line: "Ibn Baz moved to Madinah and later led its Islamic University.",
      facts: ["Deputy head: 1381 AH", "Head: from 1390 AH"],
      source: IBN_BAZ_TARAJM("In 1381 AH he moved to Madinah as deputy president of the Islamic University; in 1390 AH a royal decree made him its president.", "انتقل ابن باز إلى المدينة النبوية"),
      difficulty: 3,
      questions: [
        { q: "Which university did Ibn Baz lead?", a: "The Islamic University of Madinah", wrong: ["A university in Cairo", "A university in Damascus", "A university in Baghdad"], why: "First as deputy, then as head." },
        { q: "In which year did he become its head?", a: "1390 AH", wrong: ["1330 AH", "1350 AH", "1420 AH"], why: "By a royal decree." },
        { q: "Before he led it, he was its deputy head.", tf: true, why: "From 1381 AH." }
      ]
    },
    {
      slug: "king-faisal-prize",
      title: "Service to Islam",
      line: "In 1982, Ibn Baz won a King Faisal Prize for serving Islam.",
      facts: ["Preaching, research, teaching", "Care for the youth"],
      source: IBN_BAZ_PRIZE("King Faisal Prize in Service to Islam, 1982 Laureate: his activities included preaching, research and Islamic education, and dedicated care to the youth.", "His activities were diverse and included preaching, research, and Islamic education"),
      difficulty: 4,
      questions: [
        { q: "Which prize did Ibn Baz win in 1982?", a: "King Faisal Prize for Service to Islam", wrong: ["A sports medal", "A poetry prize", "A science prize"], why: "For his scholarship and good deeds." },
        { q: "Whom did he give special care to?", a: "The youth", wrong: ["Only rulers", "Only traders", "No one"], why: "He worked to help young Muslims." },
        { q: "What did he tell Muslims to seek?", a: "Islamic knowledge", wrong: ["Fame", "Wealth", "Power"], why: "So they worship Allah with full awareness." }
      ]
    },
    {
      slug: "grand-mufti",
      title: "The Grand Mufti",
      line: "Ibn Baz was Grand Mufti of Saudi Arabia until he died.",
      facts: ["Head of the senior scholars", "Radio fatwas: Nur ala ad-Darb"],
      source: IBN_BAZ_TARAJM("He was appointed Grand Mufti and remained so until his death, chairing the Council of Senior Scholars; he answered questions on the radio programme Nur 'ala ad-Darb for over thirty years.", "مكث عبد العزيز بن باز في برنامج نور على الدرب"),
      difficulty: 4,
      questions: [
        { q: "Which post did Ibn Baz hold until his death?", a: "Grand Mufti", wrong: ["King", "Army general", "Trader"], why: "The country's highest post for fatwas." },
        { q: "What was his radio fatwa programme called?", a: "Nur ala ad-Darb", wrong: ["Al-Muwatta", "Ar-Risalah", "Al-Musnad"], why: "Light on the Path, for over thirty years." },
        { q: "Ibn Baz answered people's questions on the radio.", tf: true, why: "For more than thirty years." }
      ]
    },
    {
      slug: "died-1420",
      title: "Buried in Makkah",
      line: "Ibn Baz died in 1420 AH, 1999, and was buried in Makkah.",
      facts: ["27 Muharram 1420 AH, aged about 89", "Janazah in al-Masjid al-Haram"],
      source: IBN_BAZ_TARAJM("He died at dawn on Thursday 27 Muharram 1420 AH (13 May 1999), aged about 89; he was prayed over after Friday prayer in al-Masjid al-Haram and buried in al-Adl cemetery in Makkah.", "حتى توفي في فجر يوم الخميس 27 محرم 1420"),
      difficulty: 5,
      questions: [
        { q: "Where was Ibn Baz buried?", a: "Makkah", wrong: ["Riyadh", "Damascus", "Madinah"], why: "In al-Adl cemetery." },
        { q: "Where was his funeral prayer held?", a: "Al-Masjid al-Haram", wrong: ["A small village", "His home", "A school"], why: "After the Friday prayer." },
        { q: "About how old was he when he died?", a: "About 89", wrong: ["About 40", "About 54", "About 120"], why: "Born 1912, died 1999." }
      ]
    },
    {
      slug: "praised-albani",
      title: "Praise for al-Albani",
      line: "Ibn Baz signed a fatwa praising al-Albani's work for the Sunnah.",
      facts: ["The Standing Committee", "Known for knowledge and virtue"],
      source: ALBANI_PAGE("A Standing Committee answer, signed by Shaykh Ibn Baaz and others: This man is well known to us for his knowledge and virtue, his veneration of and service to the Sunnah.", "This man is well known to us for his knowledge and virtue"),
      difficulty: 5,
      questions: [
        { q: "Which scholar did Ibn Baz and the committee praise?", a: "Al-Albani", wrong: ["Ibn Hurmuz", "Az-Zuhri", "Hushaym"], why: "For his service to the Sunnah." },
        { q: "What did they say his books were?", a: "Very useful", wrong: ["Useless", "Secret", "Lost"], why: "Though, like any scholar, he could make mistakes." },
        { q: "Scholars of the same time can praise each other's work.", tf: true, why: "Ibn Baz and al-Albani are an example." }
      ]
    }
  ]
};

const ALBANI: DeepUnit = {
  key: "albani",
  topicId: "scholars",
  branchId: "scholar-albani",
  name: "al-Albani",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "born-in-albania",
      title: "Born in Albania",
      line: "Shaykh al-Albani was born in Shkoder, Albania, in 1914.",
      facts: ["Born 16 August 1914", "Al-Albani: the man from Albania"],
      source: ALBANI_PRIZE("Born: August 16, 1914, Shkodër, Republic of Albania.", "Born: August 16, 1914, Shkodër, Republic of Albania"),
      difficulty: 1,
      questions: [
        { q: "Which country was al-Albani born in?", a: "Albania", wrong: ["Egypt", "Iraq", "Yemen"], why: "His name means the one from Albania." },
        { q: "In which year was he born?", a: "1914", wrong: ["1812", "1960", "1999"], why: "On 16 August 1914." },
        { q: "Al-Albani was born two years after Ibn Baz.", tf: true, why: "Ibn Baz was born in 1912." }
      ]
    },
    {
      slug: "to-damascus",
      title: "To Damascus",
      line: "As a child, his family moved to Damascus, where he studied.",
      facts: ["Early schooling in Damascus", "Arabic and Islamic studies"],
      source: ALBANI_PRIZE("He moved as a child with his family to Damascus, where he completed his early education and received tutelage in Arabic and Islamic studies."),
      difficulty: 2,
      questions: [
        { q: "Which city did his family move to?", a: "Damascus", wrong: ["Riyadh", "Baghdad", "Cairo"], why: "He grew up and studied there." },
        { q: "What did he study there?", a: "Arabic and Islamic studies", wrong: ["Only maths", "Only music", "Only sport"], why: "The base of his later work." },
        { q: "Al-Albani grew up in Albania his whole life.", tf: false, why: "He moved to Damascus as a child." }
      ]
    },
    {
      slug: "watch-repairer",
      title: "The watch repairer",
      line: "Al-Albani repaired clocks and watches to support his family.",
      facts: ["A trade with his hands", "Supporting his family"],
      source: ALBANI_PRIZE("He worked as a clock and watch repairer to help support his family."),
      difficulty: 2,
      questions: [
        { q: "What was al-Albani's trade?", a: "Repairing clocks and watches", wrong: ["Selling cloth", "Farming", "Building ships"], why: "He worked to support his family." },
        { q: "Why did he work?", a: "To support his family", wrong: ["To become famous", "To stop studying", "To travel"], why: "Like Ibn Baz, he worked young." },
        { q: "A scholar can also work a trade with his hands.", tf: true, why: "Al-Albani fixed watches and studied hadith." }
      ]
    },
    {
      slug: "sahih-and-daif",
      title: "Sound and weak hadith",
      line: "His best-loved works: a series of sound hadith, and one of weak.",
      facts: ["Silsilah as-Sahihah", "Silsilah ad-Da'ifah", "Irwa al-Ghalil"],
      source: ALBANI_PRIZE("Laureate for contributions to the study, verification and authentication of the Hadith, through works such as Irwa' al-Ghalil and Silsilat al-Ahadith al-Sahihah and al-Da'ifah; in his speech he said these two series were closest to his heart.", "was awarded the prize for his remarkable contributions to the study, verification and authentication of the Hadith"),
      difficulty: 3,
      questions: [
        { q: "Which two works were closest to his heart?", a: "The sound and the weak hadith series", wrong: ["Two poetry books", "Two history books", "Two maps"], why: "As-Silsilah as-Sahihah and ad-Da'ifah." },
        { q: "What did al-Albani's work focus on?", a: "Checking hadith", wrong: ["Medicine", "Astronomy", "Trade"], why: "Which reports are sound and which are weak." },
        { q: "Which of these is one of his books?", a: "Irwa al-Ghalil", wrong: ["Al-Muwatta", "Ar-Risalah", "Al-Musnad"], why: "The others are by the imams of the past." }
      ]
    },
    {
      slug: "a-beginner",
      title: "Still a beginner",
      line: "After fifty years with the Sunnah, he called himself a beginner.",
      facts: ["Fifty years of study", "He revised his own books"],
      source: ALBANI_PRIZE("In his 1999 prize speech: I have been exploring the horizons of the Prophet's Sunnah for the past 50 years; I still consider myself a beginner, and I sometimes reverse my earlier judgment on a hadith."),
      difficulty: 4,
      questions: [
        { q: "How long had he studied the Sunnah by 1999?", a: "Fifty years", wrong: ["Five years", "One year", "Ten years"], why: "He said so in his speech." },
        { q: "What did he still call himself?", a: "A beginner", wrong: ["The greatest", "The last scholar", "A sultan"], why: "Real knowledge brings humility." },
        { q: "Al-Albani never changed a ruling he had made.", tf: false, why: "He revised his books and changed rulings when needed." }
      ]
    },
    {
      slug: "king-faisal-prize",
      title: "Prize in 1999",
      line: "Al-Albani won the King Faisal Prize in Islamic Studies in 1999.",
      facts: ["For his hadith work", "Ibn Baz won his in 1982"],
      source: ALBANI_PRIZE("King Faisal Prize in Islamic Studies, 1999 Laureate, for contributions to the study, verification and authentication of the Hadith.", "was awarded the prize for his remarkable contributions to the study, verification and authentication of the Hadith"),
      difficulty: 4,
      questions: [
        { q: "In which year did al-Albani win the King Faisal Prize?", a: "1999", wrong: ["1914", "1950", "1982"], why: "In Islamic Studies." },
        { q: "What was the prize for?", a: "His work on hadith", wrong: ["Poetry", "Building", "Sport"], why: "Studying and checking hadith." },
        { q: "Who won the same prize earlier, in 1982?", a: "Ibn Baz", wrong: ["Ibn Taymiyyah", "Imam Ahmad", "Imam Malik"], why: "His was for Service to Islam." }
      ]
    },
    {
      slug: "no-blind-following",
      title: "Not blind following",
      line: "Al-Albani told students not to follow him, or anyone, blindly.",
      facts: ["A muhaddith and a faqih", "Human: right and wrong at times"],
      source: ALBANI_PAGE("Shaykh al-Albani was a great muhaddith and a mujtahid faqeeh; he was a human being who got things right and made mistakes, and he was emphatic in telling them not to follow him blindly.", "he was more emphatic in telling them not to follow him blindly"),
      difficulty: 5,
      questions: [
        { q: "What did al-Albani tell his students?", a: "Do not follow me blindly", wrong: ["Never ask questions", "Only read my books", "Stop learning"], why: "Follow the evidence." },
        { q: "IslamQA calls him a muhaddith and what else?", a: "A faqih", wrong: ["A poet", "A king", "A soldier"], why: "He knew both hadith and fiqh." },
        { q: "Every scholar, however great, can make mistakes.", tf: true, why: "Only the Prophet ﷺ was protected from error in the religion." }
      ]
    }
  ]
};

export const SCHOLAR_UNITS: readonly DeepUnit[] = [ABU_HANIFAH, MALIK, SHAFII, AHMAD, IBN_TAYMIYYAH, IBN_BAZ, ALBANI];

/** The Scholars topic. Its units hold only deep lessons, added by addDeepUnits. */
export const SCHOLARS_SECTION: LearningSection = {
  id: "scholars",
  topicId: "scholars",
  title: "Scholars",
  description: "The four imams and later scholars, shown as a family tree of who learned from whom.",
  badge: "Topic 9",
  focus: "Abu Hanifah, Malik, ash-Shafi'i, Ahmad, Ibn Taymiyyah, Ibn Baz and al-Albani.",
  mascot: "muslim_man",
  accentColor: "#7A5CC8",
  starsTarget: 0,
  branches: [
    { id: "scholar-abu-hanifah", topicId: "scholars", title: "Abu Hanifah", description: "From Kufa. The first of the four imams.", order: 1 },
    { id: "scholar-malik", topicId: "scholars", title: "Imam Malik", description: "From Madinah. Teacher of ash-Shafi'i.", order: 2 },
    { id: "scholar-shafii", topicId: "scholars", title: "Imam ash-Shafi'i", description: "Learned from Malik, and from Muhammad ibn al-Hasan, Abu Hanifah's student.", order: 3 },
    { id: "scholar-ahmad", topicId: "scholars", title: "Imam Ahmad", description: "Learned from ash-Shafi'i, and first from Abu Yusuf, Abu Hanifah's student.", order: 4 },
    { id: "scholar-ibn-taymiyyah", topicId: "scholars", title: "Ibn Taymiyyah", description: "Centuries later, in Damascus. Teacher of Ibn al-Qayyim.", order: 5 },
    { id: "scholar-ibn-baz", topicId: "scholars", title: "Ibn Baz", description: "From Riyadh. Grand Mufti of Saudi Arabia.", order: 6 },
    { id: "scholar-albani", topicId: "scholars", title: "Al-Albani", description: "From Albania, then Damascus. A scholar of hadith.", order: 7 }
  ],
  nodes: []
};

/** A scholar's years on the tree: born and died, in AH (hijri) or CE; either may be unknown to the page. */
export type ScholarYears = { era: "AH" | "CE"; born?: number; died?: number };

/**
 * The family tree: each scholar's row (oldest first), his years, and the scholars on the tree he learned from,
 * each link from his unit's page. Ash-Shafi'i learned from Malik and from Abu Hanifah's student Muhammad ibn
 * al-Hasan; Ahmad from ash-Shafi'i and from Abu Hanifah's companion Abu Yusuf. The later rows are centuries apart.
 */
export const SCHOLAR_TREE: Record<string, { row: number; years: ScholarYears; learnedFrom?: { id: string; via?: string }[] }> = {
  "scholar-abu-hanifah": { row: 0, years: { era: "AH", born: 80, died: 150 } },
  "scholar-malik": { row: 0, years: { era: "AH", born: 93, died: 179 } },
  "scholar-shafii": { row: 1, years: { era: "AH", died: 204 }, learnedFrom: [{ id: "scholar-malik" }, { id: "scholar-abu-hanifah", via: "Muhammad ibn al-Hasan" }] },
  "scholar-ahmad": { row: 2, years: { era: "AH", born: 164, died: 241 }, learnedFrom: [{ id: "scholar-shafii" }, { id: "scholar-abu-hanifah", via: "Abu Yusuf" }] },
  "scholar-ibn-taymiyyah": { row: 3, years: { era: "AH", born: 661, died: 728 } },
  "scholar-ibn-baz": { row: 4, years: { era: "CE", born: 1912, died: 1999 } },
  "scholar-albani": { row: 4, years: { era: "CE", born: 1914, died: 1999 } }
};
