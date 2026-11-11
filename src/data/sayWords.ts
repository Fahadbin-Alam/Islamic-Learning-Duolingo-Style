import type { LessonSource } from "../types";
import { hadith, quran } from "./deepKit";

/**
 * "Say it out loud": everyday Islamic words to say aloud with the teacher (Bismillah, Alhamdulillah, In sha Allah...).
 * Practice only, never scored. Each word says when a Muslim says it, from the Quran or a hadith graded sahih or hasan
 * (number and grade as sunnah.com gives them). The sources are the ones the lessons already cite for the same words;
 * the Arabic is written as the lessons write it. Anything disputed is left out.
 *
 * `syllables` is the transliteration cut into the beats the learner says along with ("Bis·mil·lah"): "·" between
 * beats, spaces between words. The plain transliteration is the same without the dots.
 */
export type SayWord = {
  id: string;
  arabic: string;
  syllables: string;
  meaning: string;
  /** When to say it, as the source says. */
  when: string;
  source: LessonSource;
};

/** The Quran's words to say In sha Allah: 18:23-24, cited as one passage. */
const IN_SHA_ALLAH_SOURCE: LessonSource = {
  ...quran(18, 23, "Never say of anything: I will surely do that tomorrow, without adding: if Allah wills."),
  id: "deep_quran_18_23_24",
  title: "Quran 18:23-24",
  reference: "Quran 18:23-24",
  url: "https://quran.com/18/23-24"
};

const FOUR_WORDS = hadith("muslim", "2137a", "Samurah ibn Jundub", "Sahih", "The most beloved words to Allah are four: Subhanallah, Al-hamdu lillah, La ilaha illallah and Allahu Akbar. It does not matter which of them you begin with.", "The dearest phrases to Allah are four");

/** Meanings and "when" lines, by word id (a table of their own so the translation catalogs find them). */
const SAY_WORD_TEXT = {
  "assalamu-alaykum": { meaning: "Peace be upon you", when: "When you meet someone. Spreading salam brings love between people." },
  "wa-alaykum-salam": { meaning: "And upon you be peace", when: "When someone greets you with salam: answer with the same or better." },
  bismillah: { meaning: "In the name of Allah", when: "Before you eat." },
  alhamdulillah: { meaning: "All praise is for Allah", when: "When you eat and drink: Allah is pleased with the one who praises Him." },
  subhanallah: { meaning: "Glory be to Allah", when: "Any time. It is one of the four words Allah loves most." },
  "allahu-akbar": { meaning: "Allah is the Greatest", when: "Any time. It is one of the four words Allah loves most." },
  "la-ilaha-illallah": { meaning: "There is no god but Allah", when: "Any time. It is one of the four words Allah loves most." },
  "subhanallahi-wa-bihamdih": { meaning: "Glory be to Allah, and all praise is His", when: "Any time. It is light on the tongue and heavy on the Scale." },
  astaghfirullah: { meaning: "I ask Allah's forgiveness", when: "Many times a day: the Prophet ﷺ said it more than seventy times a day." },
  "la-hawla": { meaning: "There is no power and no strength except with Allah", when: "Any time. The Prophet ﷺ called it a treasure of Paradise." },
  "in-sha-allah": { meaning: "If Allah wills", when: "When you say you will do something later." },
  "masha-allah": { meaning: "What Allah wills", when: "When you see something you like." },
  "jazakallahu-khayran": { meaning: "May Allah reward you with good", when: "When you thank someone for something good." },
  yarhamukallah: { meaning: "May Allah have mercy on you", when: "When someone sneezes and says Alhamdulillah." },
  "audhu-billah": { meaning: "I seek refuge in Allah from Shaytan", when: "When you feel angry: it takes the anger away." },
  "inna-lillahi": { meaning: "We belong to Allah, and to Him we return", when: "When something sad or hard happens." },
  "sallallahu-alayhi-wa-sallam": { meaning: "May Allah send blessings and peace upon him", when: "For the Prophet ﷺ: whoever sends blessings on him once, Allah blesses ten times." },
  amin: { meaning: "O Allah, answer our dua", when: "In prayer, when the imam says Amin after Al-Fatihah." },
  "leaving-home": { meaning: "In the name of Allah, I trust in Allah; there is no power and no strength except with Allah", when: "When you leave your home." }
} as const;

type SayWordId = keyof typeof SAY_WORD_TEXT;

const WORDS: { id: SayWordId; arabic: string; syllables: string; source: LessonSource }[] = [
  {
    id: "assalamu-alaykum",
    arabic: "السَّلَامُ عَلَيْكُمْ",
    syllables: "As·sa·la·mu a·lay·kum",
    source: hadith("muslim", "54a", "Abu Hurairah", "Sahih", "The Prophet ﷺ said you will not enter Paradise until you believe, and you will not believe until you love one another. Spreading the greeting of Salam among you builds that love.", "you will not believe as long as you do not love one another")
  },
  {
    id: "wa-alaykum-salam",
    arabic: "وَعَلَيْكُمُ السَّلَامُ",
    syllables: "Wa a·lay·kum as·sa·lam",
    source: quran(4, 86, "When you are greeted with a greeting, greet back with one better, or return it the same.")
  },
  {
    id: "bismillah",
    arabic: "بِسْمِ اللَّهِ",
    syllables: "Bis·mil·lah",
    source: hadith("bukhari", "5376", "Umar bin Abi Salamah", "Sahih", "I was a boy in the care of the Prophet ﷺ and my hand went all over the dish. He said: O boy, mention the name of Allah, eat with your right hand, and eat from what is near you.", "eat with your right hand")
  },
  {
    id: "alhamdulillah",
    arabic: "الْحَمْدُ لِلَّهِ",
    syllables: "Al·ham·du lil·lah",
    source: hadith("muslim", "2734a", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said Allah is pleased with His servant who praises Him when eating a bite and when drinking.", "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food and while drinking")
  },
  { id: "subhanallah", arabic: "سُبْحَانَ اللَّهِ", syllables: "Sub·ha·nal·lah", source: FOUR_WORDS },
  { id: "allahu-akbar", arabic: "اللَّهُ أَكْبَرُ", syllables: "Al·la·hu Ak·bar", source: FOUR_WORDS },
  { id: "la-ilaha-illallah", arabic: "لَا إِلَهَ إِلَّا اللَّهُ", syllables: "La i·la·ha il·lal·lah", source: FOUR_WORDS },
  {
    id: "subhanallahi-wa-bihamdih",
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    syllables: "Sub·ha·nal·la·hi wa bi·ham·dih",
    source: hadith("bukhari", "6406", "Abu Hurairah", "Sahih", "Two words are light on the tongue, heavy on the Scale and loved by the Most Merciful: Subhanallahil-'azim and Subhanallahi wa bihamdih.", "very easy for the tongue to say")
  },
  {
    id: "astaghfirullah",
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    syllables: "As·tagh·fi·rul·lah",
    source: hadith("bukhari", "6307", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: By Allah, I ask Allah for forgiveness and turn to Him in repentance more than seventy times a day.", "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day")
  },
  {
    id: "la-hawla",
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    syllables: "La haw·la wa la quw·wa·ta il·la bil·lah",
    source: hadith("bukhari", "6384", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ told Abu Musa: say La hawla wa la quwwata illa billah, for it is one of the treasures of Paradise.", "one of the treasures of Paradise")
  },
  { id: "in-sha-allah", arabic: "إِنْ شَاءَ اللَّهُ", syllables: "In sha Al·lah", source: IN_SHA_ALLAH_SOURCE },
  {
    id: "masha-allah",
    arabic: "مَا شَاءَ اللَّهُ",
    syllables: "Ma sha Al·lah",
    source: quran(18, 39, "Why did you not say, when you entered your garden: What Allah wills; there is no power except with Allah.")
  },
  {
    id: "jazakallahu-khayran",
    arabic: "جَزَاكَ اللَّهُ خَيْرًا",
    syllables: "Ja·za·kal·la·hu khay·ran",
    source: hadith("bukhari", "336", "Aishah", "Sahih", "When Aishah's lost necklace led to the verse of tayammum, Usayd ibn Hudayr thanked her: Jazakillahu khayran, may Allah reward you with good. Whenever something you disliked happened, Allah brought good from it for you and for the Muslims.", "May Allah reward you. By Allah, whenever anything happened which you did not like")
  },
  {
    id: "yarhamukallah",
    arabic: "يَرْحَمُكَ اللَّهُ",
    syllables: "Yar·ha·mu·kal·lah",
    source: hadith("bukhari", "6224", "Abu Hurairah", "Sahih", "If one of you sneezes, let him say Alhamdulillah, and let his brother say to him Yarhamukallah. When he says that, let the sneezer say: Yahdikumullah wa yuslihu balakum, may Allah guide you and set your affairs right.", "If anyone of you sneezes, he should say")
  },
  {
    id: "audhu-billah",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ",
    syllables: "A·'u·dhu bil·la·hi mi·nash·shay·tan",
    source: hadith("bukhari", "3282", "Sulayman ibn Surad", "Sahih", "Two men were insulting each other and one grew red with anger. The Prophet ﷺ said: I know a word that would take his anger away: I seek refuge with Allah from Satan.", "I seek Refuge with Allah from Satan")
  },
  {
    id: "inna-lillahi",
    arabic: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
    syllables: "In·na lil·la·hi wa in·na i·lay·hi ra·ji·'un",
    source: quran(2, 156, "Who, when a hardship strikes them, say: We belong to Allah, and to Him we will return.")
  },
  {
    id: "sallallahu-alayhi-wa-sallam",
    arabic: "صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ",
    syllables: "Sal·lal·la·hu 'a·lay·hi wa sal·lam",
    source: hadith("muslim", "408", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Whoever sends blessings on me once, Allah will send blessings on him ten times.", "He who blesses me once, Allah would bless him ten times")
  },
  {
    id: "amin",
    arabic: "آمِينَ",
    syllables: "A·min",
    source: hadith("bukhari", "780", "Abu Hurayrah", "Sahih", "Say Amin when the imam says it; whoever's Amin matches the angels' Amin has his past sins forgiven.")
  },
  {
    id: "leaving-home",
    arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    syllables: "Bis·mil·lah, ta·wak·kal·tu 'a·lal·lah, la haw·la wa la quw·wa·ta il·la bil·lah",
    source: hadith("abudawud", "5095", "Anas ibn Malik", "Sahih (Al-Albani)", "When a man leaves his house and says: in the name of Allah, I trust in Allah, there is no might and no power except with Allah, it is said to him: you are guided, defended and protected, and the devils move away from him.", "You are guided, defended and protected")
  }
];

export const SAY_WORDS: SayWord[] = WORDS.map((word) => ({ ...word, ...SAY_WORD_TEXT[word.id] }));

/** The transliteration as it is read: the beats joined back up ("Bismillah"). */
export function sayTranslit(word: SayWord) {
  return word.syllables.replace(/·/g, "");
}

/** The beats to light up one after another as the learner says the word: words cut at their "·". */
export function sayBeats(word: SayWord): string[][] {
  return word.syllables.split(" ").map((part) => part.split("·"));
}
