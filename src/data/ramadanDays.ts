import type { Challenge, LearningBranch, LearningNode, LearningSection, Lesson, LessonSource } from "../types";
import type { ArabicTerm } from "./arabicTerms";
import { quranAyahArabic } from "./quranAyahs";

// "Ramadan": a 30-day path, one short lesson for each day of the month, for Ramadan mode (ramadanCalendar.ts).
// Only what is clear and agreed on, from the Quran and sahih hadith: no rak'ah counts, no fiqh differences, no
// weak du'as. Each hadith's reference, narrator and grade were checked on sunnah.com, and a hadith quote is
// sunnah.com's English word for word, a whole sentence. Each day's Arabic phrase is from its ayah or hadith.
// A day's questions ask only what its card shows.

export const RAMADAN_TOPIC = "ramadan" as const;

export type Question =
  | { prompt: string; answer: string; wrong: [string, string]; explanation: string }
  | { statement: string; answer: boolean; explanation: string };

export type Source =
  | { quran: string; title: string; summary: string }
  | {
      /** sunnah.com address, "bukhari:1899". */
      ref: string;
      /** As sunnah.com writes it, "Sahih al-Bukhari 1899". */
      reference: string;
      narrator: string;
      /** Only for books outside the two Sahihs, "Sahih (Darussalam)". */
      grade?: string;
      title: string;
      summary: string;
    };

export interface Day {
  slug: string;
  title: string;
  line: string;
  source: Source;
  /** A hadith: its English on sunnah.com, word for word. An ayah: true shows its Arabic (quranAyahs.ts). */
  quote?: string | true;
  arabic: ArabicTerm;
  questions: [Question, Question];
}

interface Unit {
  id: string;
  title: string;
  description: string;
  arabic: ArabicTerm;
  days: Day[];
}

const UNITS: Unit[] = [
  {
    id: "ramadan-welcome",
    title: "Welcome, Ramadan",
    description: "The month of the Quran, suhur, iftar, and fasting with faith.",
    arabic: { ar: "أهلا رمضان", translit: "Ahlan Ramadan", meaning: "Welcome, Ramadan" },
    days: [
      {
        slug: "month-of-the-quran",
        title: "The month of the Quran",
        line: "The Quran was first sent down in the month of Ramadan.",
        source: { quran: "2:185", title: "The month of Ramadan", summary: "The month of Ramadan is the month in which the Quran was sent down, a guidance for people." },
        arabic: { ar: "شَهْرُ رَمَضَانَ", translit: "Shahru Ramadan", meaning: "The month of Ramadan" },
        questions: [
          { prompt: "In which month was the Quran first sent down?", answer: "Ramadan", wrong: ["Shawwal", "Muharram"], explanation: "The Quran was first sent down in Ramadan." },
          { statement: "Allah calls the Quran a guidance for people.", answer: true, explanation: "The ayah calls the Quran a guidance for people." }
        ]
      },
      {
        slug: "why-we-fast",
        title: "Why we fast",
        line: "Fasting was made a duty for us and those before, for taqwa.",
        source: { quran: "2:183", title: "Fasting is prescribed", summary: "O you who believe, fasting is prescribed for you as it was for those before you, so that you may gain taqwa." },
        quote: true,
        arabic: { ar: "لَعَلَّكُمْ تَتَّقُونَ", translit: "La'allakum tattaqun", meaning: "So that you gain taqwa" },
        questions: [
          { prompt: "Why did Allah give us fasting?", answer: "So we gain taqwa", wrong: ["So we get rich", "So we sleep more"], explanation: "Fasting is so that we gain taqwa." },
          { statement: "Fasting was given only to Muslims, never to anyone before.", answer: false, explanation: "Allah says it was prescribed for those before us too." }
        ]
      },
      {
        slug: "gates-open",
        title: "The gates open",
        line: "In Ramadan, the gates of heaven open and the devils are chained.",
        source: { ref: "bukhari:1899", reference: "Sahih al-Bukhari 1899", narrator: "Abu Hurairah", title: "Gates of heaven open", summary: "When Ramadan starts, the gates of heaven are opened, the gates of Hell are closed and the devils are chained." },
        quote: "When the month of Ramadan starts, the gates of the heaven are opened and the gates of Hell are closed and the devils are chained.",
        arabic: { ar: "أَبْوَابُ السَّمَاءِ", translit: "Abwab as-sama'", meaning: "The gates of heaven" },
        questions: [
          { prompt: "What happens to the devils in Ramadan?", answer: "They are chained", wrong: ["They get stronger", "They are set free"], explanation: "When Ramadan starts, the devils are chained." },
          { statement: "When Ramadan starts, the gates of heaven are opened.", answer: true, explanation: "The gates of heaven open, and the gates of Hell close." }
        ]
      },
      {
        slug: "fast-with-faith",
        title: "Fast with faith",
        line: "Fast Ramadan with faith, and Allah forgives your past sins.",
        source: { ref: "bukhari:38", reference: "Sahih al-Bukhari 38", narrator: "Abu Hurairah", title: "Fasting with faith", summary: "Whoever fasts Ramadan out of faith, hoping for Allah's reward, his past sins are forgiven." },
        quote: "Whoever observes fasts during the month of Ramadan out of sincere faith, and hoping to attain Allah's rewards, then all his past sins will be forgiven.",
        arabic: { ar: "إِيمَانًا وَاحْتِسَابًا", translit: "Imanan wa ihtisaban", meaning: "With faith, hoping for reward" },
        questions: [
          { prompt: "How should you fast Ramadan?", answer: "With faith", wrong: ["To show off", "Without caring"], explanation: "Fast with faith, hoping for Allah's reward." },
          { prompt: "What does Allah forgive for whoever fasts this way?", answer: "Their past sins", wrong: ["Nothing at all", "Only one sin"], explanation: "All his past sins will be forgiven." }
        ]
      },
      {
        slug: "suhur",
        title: "Blessed suhur",
        line: "Eat suhur before dawn: there is a blessing in it.",
        source: { ref: "bukhari:1923", reference: "Sahih al-Bukhari 1923", narrator: "Anas bin Malik", title: "Blessing in suhur", summary: "The Prophet ﷺ said: Take suhur, as there is a blessing in it." },
        quote: "Take Suhur as there is a blessing in it.",
        arabic: { ar: "تَسَحَّرُوا", translit: "Tasahharu", meaning: "Eat suhur" },
        questions: [
          { prompt: "What is in suhur, the Prophet ﷺ said?", answer: "A blessing", wrong: ["A harm", "Nothing good"], explanation: "Take suhur, as there is a blessing in it." },
          { statement: "The Prophet ﷺ told us to skip suhur.", answer: false, explanation: "He said: take suhur, there is a blessing in it." }
        ]
      },
      {
        slug: "hurry-to-iftar",
        title: "Hurry to iftar",
        line: "When the sun sets, break your fast right away.",
        source: { ref: "bukhari:1957", reference: "Sahih al-Bukhari 1957", narrator: "Sahl bin Sa'd", title: "Hasten the iftar", summary: "People stay on the right path as long as they hasten to break the fast." },
        quote: "The people will remain on the right path as long as they hasten the breaking of the fast.",
        arabic: { ar: "عَجَّلُوا الْفِطْرَ", translit: "'Ajjalul-fitr", meaning: "They hurry to break the fast" },
        questions: [
          { prompt: "When the sun sets, when should you break your fast?", answer: "Right away", wrong: ["An hour later", "At midnight"], explanation: "People stay on the right path while they hurry to break the fast." },
          { statement: "Waiting long after sunset to eat is the Sunnah.", answer: false, explanation: "The Sunnah is to hurry to break the fast." }
        ]
      },
      {
        slug: "break-with-dates",
        title: "Dates for iftar",
        line: "The Prophet ﷺ broke his fast with dates, else water.",
        source: {
          ref: "abudawud:2356",
          reference: "Sunan Abi Dawud 2356",
          narrator: "Anas ibn Malik",
          grade: "Hasan Sahih (Al-Albani)",
          title: "Breaking the fast with dates",
          summary: "The Prophet ﷺ broke his fast before praying with fresh dates; if there were none, dry dates; if none, sips of water."
        },
        arabic: { ar: "رُطَبَاتٌ", translit: "Rutabat", meaning: "Fresh dates" },
        questions: [
          { prompt: "What did the Prophet ﷺ like to break his fast with?", answer: "Dates", wrong: ["Cake", "Bread"], explanation: "Fresh dates, else dry dates, else a little water." },
          { prompt: "With no dates at all, what did he have?", answer: "A little water", wrong: ["Nothing", "Milk"], explanation: "If there were no dates, he took sips of water." }
        ]
      },
      {
        slug: "two-joys",
        title: "Two joys",
        line: "A fasting person has two joys: at iftar, and when meeting Allah.",
        source: { ref: "bukhari:1904", reference: "Sahih al-Bukhari 1904", narrator: "Abu Hurairah", title: "Two joys of fasting", summary: "There are two joys for the fasting person: when breaking the fast, and when meeting his Lord." },
        quote:
          "There are two pleasures for the fasting person, one at the time of breaking his fast, and the other at the time when he will meet his Lord; then he will be pleased because of his fasting.",
        arabic: { ar: "لِلصَّائِمِ فَرْحَتَانِ", translit: "Lis-sa'imi farhatan", meaning: "Two joys for the fasting" },
        questions: [
          { prompt: "How many joys does a fasting person have?", answer: "Two", wrong: ["One", "Ten"], explanation: "Two joys: at iftar, and when meeting his Lord." },
          { prompt: "When is the first joy?", answer: "When breaking the fast", wrong: ["When waking up", "When fighting"], explanation: "The first joy is at iftar." }
        ]
      },
      {
        slug: "leave-lies",
        title: "Fast from lies too",
        line: "Fasting means leaving lies and bad deeds, not just food.",
        source: { ref: "bukhari:1903", reference: "Sahih al-Bukhari 1903", narrator: "Abu Hurairah", title: "Leave false speech", summary: "Whoever does not give up false speech and evil actions, Allah has no need for him to leave his food and drink." },
        arabic: { ar: "قَوْلَ الزُّورِ", translit: "Qawl az-zur", meaning: "False speech" },
        questions: [
          { prompt: "Besides food and drink, what should a fasting person leave?", answer: "Lies and bad deeds", wrong: ["Kind words", "Good deeds"], explanation: "Leave false speech and evil actions too." },
          { statement: "If you fast, it is fine to tell lies.", answer: false, explanation: "A fast means leaving lies and bad deeds as well." }
        ]
      },
      {
        slug: "if-you-forget",
        title: "If you forget",
        line: "If you eat because you forgot, finish your fast: Allah fed you.",
        source: { ref: "bukhari:1933", reference: "Sahih al-Bukhari 1933", narrator: "Abu Hurairah", title: "If you forget and eat", summary: "If someone eats or drinks because they forgot, they should finish their fast, for Allah fed them and gave them drink." },
        arabic: { ar: "أَطْعَمَهُ اللَّهُ وَسَقَاهُ", translit: "At'amahullahu wa saqah", meaning: "Allah fed him and gave him drink" },
        questions: [
          { prompt: "You forgot and drank water while fasting. What now?", answer: "Finish your fast", wrong: ["Stop fasting", "Fast tomorrow instead"], explanation: "Finish the fast: it was Allah who gave you drink." },
          { statement: "Eating because you forgot still lets your fast count.", answer: true, explanation: "Finish the fast, for Allah fed you." }
        ]
      }
    ]
  },
  {
    id: "ramadan-good-deeds",
    title: "Good deeds in Ramadan",
    description: "Giving, Quran, night prayer, du'a, and helping at home.",
    arabic: { ar: "أعمال رمضان", translit: "A'mal Ramadan", meaning: "Good deeds in Ramadan" },
    days: [
      {
        slug: "ar-rayyan",
        title: "The gate Ar-Rayyan",
        line: "Paradise has a gate, Ar-Rayyan, just for people who fasted.",
        source: { ref: "bukhari:1896", reference: "Sahih al-Bukhari 1896", narrator: "Sahl bin Sa'd", title: "The gate Ar-Rayyan", summary: "There is a gate in Paradise called Ar-Rayyan; only those who fasted will enter through it." },
        quote: "There is a gate in Paradise called Ar-Raiyan, and those who observe fasts will enter through it on the Day of Resurrection and none except them will enter through it.",
        arabic: { ar: "الرَّيَّانُ", translit: "Ar-Rayyan", meaning: "The gate of the fasting" },
        questions: [
          { prompt: "What is Ar-Rayyan?", answer: "A gate of Paradise", wrong: ["A river", "A mountain"], explanation: "Ar-Rayyan is a gate in Paradise." },
          { prompt: "Who will enter through Ar-Rayyan?", answer: "Those who fasted", wrong: ["Everyone at all", "No one"], explanation: "Only those who fasted enter through it." }
        ]
      },
      {
        slug: "feed-a-fasting-person",
        title: "Share your iftar",
        line: "Give a fasting person iftar, and you get their reward too.",
        source: {
          ref: "tirmidhi:807",
          reference: "Jami` at-Tirmidhi 807",
          narrator: "Zaid bin Khalid Al-Juhani",
          grade: "Sahih (Darussalam)",
          title: "Feeding a fasting person",
          summary: "Whoever gives a fasting person food to break his fast gets the same reward, and the fasting person's reward is not lessened."
        },
        quote:
          "Whoever provides the food for a fasting person to break his fast with, then for him is the same reward as his (the fasting person's), without anything being diminished from the reward of the fasting person.",
        arabic: { ar: "مَنْ فَطَّرَ صَائِمًا", translit: "Man fattara sa'iman", meaning: "Who gives a fasting person iftar" },
        questions: [
          { prompt: "You give a fasting person iftar. What do you get?", answer: "The same reward", wrong: ["Nothing at all", "Half a reward"], explanation: "You get the same reward as the fasting person." },
          { statement: "Sharing iftar takes away some of the fasting person's reward.", answer: false, explanation: "Nothing is taken from the fasting person's reward." }
        ]
      },
      {
        slug: "most-generous",
        title: "Most generous",
        line: "The Prophet ﷺ was at his most generous in Ramadan.",
        source: { ref: "bukhari:6", reference: "Sahih al-Bukhari 6", narrator: "Ibn Abbas", title: "Generous in Ramadan", summary: "The Prophet ﷺ was the most generous of people, and most of all in Ramadan when Jibril met him." },
        arabic: { ar: "أَجْوَدُ النَّاسِ", translit: "Ajwad an-nas", meaning: "The most generous of people" },
        questions: [
          { prompt: "When was the Prophet ﷺ most generous?", answer: "In Ramadan", wrong: ["Never", "Only on Fridays"], explanation: "He was at his most generous in Ramadan." },
          { statement: "Ramadan is a good time to give more.", answer: true, explanation: "The Prophet ﷺ gave the most in Ramadan." }
        ]
      },
      {
        slug: "night-prayer",
        title: "Ramadan nights",
        line: "Pray at night in Ramadan with faith: past sins are forgiven.",
        source: { ref: "bukhari:37", reference: "Sahih al-Bukhari 37", narrator: "Abu Hurairah", title: "Praying the nights of Ramadan", summary: "Whoever prays in the nights of Ramadan out of faith, hoping for Allah's reward, his past sins are forgiven." },
        arabic: { ar: "مَنْ قَامَ رَمَضَانَ", translit: "Man qama Ramadan", meaning: "Who prays at night in Ramadan" },
        questions: [
          { prompt: "Besides fasting by day, what is special at night in Ramadan?", answer: "Prayer", wrong: ["Shopping", "Games"], explanation: "Pray in the nights of Ramadan with faith." },
          { statement: "Praying in Ramadan nights with faith brings forgiveness.", answer: true, explanation: "His past sins will be forgiven." }
        ]
      },
      {
        slug: "quran-intercedes",
        title: "Read the Quran",
        line: "Read the Quran: on the Last Day, it speaks up for you.",
        source: { ref: "muslim:804a", reference: "Sahih Muslim 804a", narrator: "Abu Umamah", title: "The Quran will intercede", summary: "Recite the Quran, for on the Day of Resurrection it will come as an intercessor for those who recite it." },
        quote: "Recite the Qur'an, for on the Day of Resurrection it will come as an intercessor for those who recite It.",
        arabic: { ar: "شَفِيعًا", translit: "Shafi'an", meaning: "One who speaks up for you" },
        questions: [
          { prompt: "On the Last Day, who does the Quran speak up for?", answer: "Those who read it", wrong: ["No one", "Only angels"], explanation: "It comes as an intercessor for those who recite it." },
          { statement: "The Prophet ﷺ told us to recite the Quran.", answer: true, explanation: "He said: recite the Quran." }
        ]
      },
      {
        slug: "ten-rewards",
        title: "Ten for one",
        line: "Each letter of the Quran you read brings a reward, times ten.",
        source: {
          ref: "tirmidhi:2910",
          reference: "Jami` at-Tirmidhi 2910",
          narrator: "Abdullah ibn Mas'ud",
          grade: "Hasan (Darussalam)",
          title: "A reward for every letter",
          summary: "Whoever recites a letter from Allah's Book gets a reward, and the reward is ten times over. Alif is a letter, Lam is a letter and Mim is a letter."
        },
        arabic: { ar: "بِعَشْرِ أَمْثَالِهَا", translit: "Bi-'ashri amthaliha", meaning: "Ten times over" },
        questions: [
          { prompt: "Each letter of the Quran brings a reward times what?", answer: "Ten", wrong: ["Two", "None"], explanation: "Every letter is a reward, ten times over." },
          { statement: "Alif Lam Mim counts as three letters.", answer: true, explanation: "Alif is a letter, Lam is a letter and Mim is a letter." }
        ]
      },
      {
        slug: "allah-is-near",
        title: "Allah is near",
        line: "Make du'a: Allah is near, and He answers whoever calls Him.",
        source: { quran: "2:186", title: "I am near", summary: "When My servants ask about Me, I am near. I answer the call of the one who calls upon Me." },
        quote: true,
        arabic: { ar: "فَإِنِّي قَرِيبٌ", translit: "Fa-inni qarib", meaning: "Indeed, I am near" },
        questions: [
          { prompt: "Allah says He is what to His servants?", answer: "Near", wrong: ["Far away", "Asleep"], explanation: "Allah says: I am near." },
          { statement: "Allah answers the one who calls on Him.", answer: true, explanation: "He answers the call of the one who calls upon Him." }
        ]
      },
      {
        slug: "allah-wants-ease",
        title: "Allah wants ease",
        line: "Allah wants ease: a sick person can fast other days later.",
        source: { quran: "2:185", title: "Allah wants ease", summary: "Whoever is sick or traveling fasts the same number of other days. Allah wants ease for you, not hardship." },
        arabic: { ar: "يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ", translit: "Yuridullahu bikumul-yusr", meaning: "Allah wants ease for you" },
        questions: [
          { prompt: "What does Allah want for us?", answer: "Ease", wrong: ["Hardship", "Pain"], explanation: "Allah wants ease for you, not hardship." },
          { prompt: "A sick person misses fasts. What can they do?", answer: "Make them up later", wrong: ["Never fast again", "Lose them forever"], explanation: "The sick and travelers fast other days instead." }
        ]
      },
      {
        slug: "every-good-deed",
        title: "Every good is charity",
        line: "Every good deed you do is a charity.",
        source: { ref: "bukhari:6021", reference: "Sahih al-Bukhari 6021", narrator: "Jabir bin Abdullah", title: "Every good deed is charity", summary: "The Prophet ﷺ said: every good deed is a charity (sadaqah)." },
        arabic: { ar: "كُلُّ مَعْرُوفٍ صَدَقَةٌ", translit: "Kullu ma'rufin sadaqah", meaning: "Every good deed is charity" },
        questions: [
          { prompt: "Which good deeds count as charity?", answer: "Every good deed", wrong: ["Only giving money", "None of them"], explanation: "Every good deed is a charity." },
          { statement: "Only money can be charity.", answer: false, explanation: "Every good deed is a charity, even a small one." }
        ]
      },
      {
        slug: "help-at-home",
        title: "Help at home",
        line: "The Prophet ﷺ helped his family at home, then went to pray.",
        source: { ref: "bukhari:676", reference: "Sahih al-Bukhari 676", narrator: "Aishah", title: "Serving his family", summary: "Aishah said: he used to keep busy serving his family, and when it was time for prayer, he went to pray." },
        arabic: { ar: "خِدْمَةُ أَهْلِهِ", translit: "Khidmatu ahlih", meaning: "Serving his family" },
        questions: [
          { prompt: "What did the Prophet ﷺ do at home?", answer: "Helped his family", wrong: ["Ordered everyone", "Did nothing"], explanation: "He kept busy serving his family." },
          { prompt: "What did he do when prayer time came?", answer: "Went to pray", wrong: ["Kept working", "Went to sleep"], explanation: "When it was time for prayer, he went to it." }
        ]
      }
    ]
  },
  {
    id: "ramadan-last-ten",
    title: "The last ten nights",
    description: "Laylat al-Qadr, i'tikaf, and getting ready for Eid.",
    arabic: { ar: "العشر الأواخر", translit: "Al-'ashr al-awakhir", meaning: "The last ten nights" },
    days: [
      {
        slug: "work-harder",
        title: "Try your hardest",
        line: "The last ten nights, the Prophet ﷺ prayed and woke his family.",
        source: { ref: "bukhari:2024", reference: "Sahih al-Bukhari 2024", narrator: "Aishah", title: "The last ten nights", summary: "In the last ten nights of Ramadan, the Prophet ﷺ worked hard, prayed all night and kept his family awake for the prayers." },
        arabic: { ar: "أَيْقَظَ أَهْلَهُ", translit: "Ayqaza ahlah", meaning: "He woke his family" },
        questions: [
          { prompt: "Who did the Prophet ﷺ wake in the last ten nights?", answer: "His family", wrong: ["No one", "Only guests"], explanation: "He kept his family awake for the prayers." },
          { statement: "In the last ten nights, the Prophet ﷺ prayed less.", answer: false, explanation: "He worked harder, and prayed all night." }
        ]
      },
      {
        slug: "odd-nights",
        title: "The odd nights",
        line: "Look for Laylat al-Qadr on the odd nights of the last ten.",
        source: { ref: "bukhari:2017", reference: "Sahih al-Bukhari 2017", narrator: "Aishah", title: "Seek it in the odd nights", summary: "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan." },
        quote: "Search for the Night of Qadr in the odd nights of the last ten days of Ramadan.",
        arabic: { ar: "فِي الْوِتْرِ", translit: "Fil-witr", meaning: "In the odd nights" },
        questions: [
          { prompt: "On which nights should you look for Laylat al-Qadr?", answer: "The odd nights of the last ten", wrong: ["The first night only", "Any night of the year"], explanation: "Search in the odd nights of the last ten." },
          { prompt: "Which of these is an odd night?", answer: "The 27th", wrong: ["The 22nd", "The 24th"], explanation: "Odd nights: the 21st, 23rd, 25th, 27th and 29th." }
        ]
      },
      {
        slug: "thousand-months",
        title: "Better than a thousand months",
        line: "Laylat al-Qadr is better than a thousand months.",
        source: { quran: "97:3", title: "Better than a thousand months", summary: "The Night of Decree is better than a thousand months." },
        quote: true,
        arabic: { ar: "خَيْرٌ مِنْ أَلْفِ شَهْرٍ", translit: "Khayrun min alfi shahr", meaning: "Better than a thousand months" },
        questions: [
          { prompt: "Laylat al-Qadr is better than how many months?", answer: "A thousand", wrong: ["Ten", "A hundred"], explanation: "It is better than a thousand months." },
          { statement: "Laylat al-Qadr is an ordinary night.", answer: false, explanation: "It is better than a thousand months." }
        ]
      },
      {
        slug: "angels-descend",
        title: "The angels come down",
        line: "On Laylat al-Qadr, the angels and Jibril come down.",
        source: { quran: "97:4", title: "The angels descend", summary: "The angels and the Spirit descend in it by permission of their Lord." },
        quote: true,
        arabic: { ar: "الْمَلَائِكَةُ وَالرُّوحُ", translit: "Al-mala'ikatu war-ruh", meaning: "The angels and the Spirit" },
        questions: [
          { prompt: "Who comes down on Laylat al-Qadr?", answer: "The angels", wrong: ["The stars", "The rain only"], explanation: "The angels and the Spirit, Jibril, come down." },
          { statement: "Jibril comes down on Laylat al-Qadr.", answer: true, explanation: "The angels and the Spirit, Jibril, come down by Allah's permission." }
        ]
      },
      {
        slug: "peace-until-dawn",
        title: "Peace until dawn",
        line: "Laylat al-Qadr is peace, until dawn comes.",
        source: { quran: "97:5", title: "Peace until dawn", summary: "Peace it is, until the rise of dawn." },
        quote: true,
        arabic: { ar: "سَلَامٌ هِيَ", translit: "Salamun hiya", meaning: "It is peace" },
        questions: [
          { prompt: "What is Laylat al-Qadr full of?", answer: "Peace", wrong: ["Fear", "Noise"], explanation: "Peace it is, until dawn." },
          { prompt: "Until when does its peace last?", answer: "Until dawn", wrong: ["Until noon", "Only an hour"], explanation: "Peace, until the rise of dawn." }
        ]
      },
      {
        slug: "pray-on-qadr",
        title: "Pray on that night",
        line: "Pray on Laylat al-Qadr with faith: past sins are forgiven.",
        source: { ref: "bukhari:1901", reference: "Sahih al-Bukhari 1901", narrator: "Abu Hurairah", title: "Praying on the Night of Qadr", summary: "Whoever prays on the Night of Qadr out of faith, hoping for Allah's reward, his past sins are forgiven." },
        arabic: { ar: "لَيْلَةُ الْقَدْرِ", translit: "Laylat al-Qadr", meaning: "The Night of Decree" },
        questions: [
          { prompt: "Pray on Laylat al-Qadr with faith. What happens?", answer: "Past sins are forgiven", wrong: ["Nothing at all", "You must fast a year"], explanation: "All his previous sins will be forgiven." },
          { statement: "You should pray on Laylat al-Qadr hoping for Allah's reward.", answer: true, explanation: "Pray out of faith, hoping for a reward from Allah." }
        ]
      },
      {
        slug: "itikaf",
        title: "I'tikaf",
        line: "I'tikaf: the Prophet ﷺ stayed in the mosque the last ten days.",
        source: { ref: "bukhari:2026", reference: "Sahih al-Bukhari 2026", narrator: "Aishah", title: "I'tikaf in the last ten days", summary: "The Prophet ﷺ used to do i'tikaf in the last ten days of Ramadan until he passed away, and his wives did it after him." },
        arabic: { ar: "الِاعْتِكَافُ", translit: "Al-i'tikaf", meaning: "Staying in the mosque to worship" },
        questions: [
          { prompt: "What is i'tikaf?", answer: "Staying in the mosque to worship", wrong: ["A kind of food", "A long trip"], explanation: "He stayed in the mosque to worship in the last ten days." },
          { statement: "The Prophet ﷺ did i'tikaf in the last ten days of Ramadan.", answer: true, explanation: "He did it every year until he passed away." }
        ]
      },
      {
        slug: "sent-down",
        title: "The night it came down",
        line: "Allah sent the Quran down on Laylat al-Qadr.",
        source: { quran: "97:1", title: "Sent down on the Night of Decree", summary: "Indeed, We sent it down on the Night of Decree." },
        quote: true,
        arabic: { ar: "إِنَّا أَنْزَلْنَاهُ", translit: "Inna anzalnahu", meaning: "We sent it down" },
        questions: [
          { prompt: "What did Allah send down on Laylat al-Qadr?", answer: "The Quran", wrong: ["Rain", "Gold"], explanation: "Allah sent the Quran down on Laylat al-Qadr." },
          { statement: "Surah Al-Qadr is about the Night of Decree.", answer: true, explanation: "It opens: We sent it down on the Night of Decree." }
        ]
      },
      {
        slug: "allahu-akbar",
        title: "Allahu Akbar",
        line: "As Ramadan ends, say Allahu Akbar: Allah guided us.",
        source: { quran: "2:185", title: "Glorify Allah", summary: "Allah wants you to complete the month and to glorify Him for guiding you, so that you may be grateful." },
        arabic: { ar: "وَلِتُكَبِّرُوا اللَّهَ", translit: "Wa litukabbirullah", meaning: "And glorify Allah" },
        questions: [
          { prompt: "When the month is done, what do we say?", answer: "Allahu Akbar", wrong: ["Goodbye", "Nothing"], explanation: "Complete the month, and glorify Allah." },
          { prompt: "Why do we glorify Allah at the end of Ramadan?", answer: "He guided us", wrong: ["We got bored", "No reason"], explanation: "Glorify Allah for guiding you, and be grateful." }
        ]
      },
      {
        slug: "eid-morning",
        title: "Eid morning",
        line: "On Eid al-Fitr, the Prophet ﷺ ate dates before the prayer.",
        source: { ref: "bukhari:953", reference: "Sahih al-Bukhari 953", narrator: "Anas bin Malik", title: "Dates on Eid morning", summary: "The Prophet ﷺ never went out on the day of Eid al-Fitr until he had eaten some dates, an odd number of them." },
        arabic: { ar: "يَوْمُ الْفِطْرِ", translit: "Yawm al-fitr", meaning: "The day of Eid al-Fitr" },
        questions: [
          { prompt: "What did the Prophet ﷺ eat before the Eid prayer?", answer: "Some dates", wrong: ["Nothing", "A big feast"], explanation: "He ate some dates first, an odd number." },
          { statement: "On Eid al-Fitr, he went to pray before eating anything.", answer: false, explanation: "He never went out on Eid al-Fitr before eating some dates." }
        ]
      }
    ]
  }
];

export const ramadanNodeId = (slug: string) => `ramadan-${slug}`;

export function sourceOf(day: Day, lessonId: string): LessonSource {
  const id = `${lessonId.replace(/-/g, "_")}_src_1`;
  const source = day.source;
  if ("quran" in source) {
    const [surah, ayah] = source.quran.split(":");
    return {
      id,
      site: "Quran.com",
      category: "tafsir",
      title: `Quran ${source.quran}`,
      url: `https://quran.com/${surah}/${ayah}`,
      reference: `Quran ${source.quran}`,
      from: "The Quran with tafsir on Quran.com",
      grade: "Quran",
      summary: source.summary
    };
  }
  return {
    id,
    site: "Sunnah.com",
    category: "hadith",
    // The learn card's chip shows this short reference, never an article title.
    title: source.reference,
    url: `https://sunnah.com/${source.ref}`,
    reference: source.reference,
    from: source.narrator,
    grade: source.grade ?? "Sahih",
    summary: source.summary
  };
}

export function quoteOf(day: Day): Lesson["quote"] {
  const source = day.source;
  if ("quran" in source) {
    const arabic = day.quote === true ? quranAyahArabic(source.quran) : undefined;
    return arabic ? { text: arabic, reference: `Quran ${source.quran}` } : undefined;
  }
  if (typeof day.quote !== "string") return undefined;
  return { text: day.quote, reference: source.grade ? `${source.reference} (${source.grade.replace(/\s*\(([^)]+)\)$/, ", $1")})` : source.reference };
}

// The right answer moves around the tiles, so its place gives nothing away.
export function challengesOf(day: Day, lessonId: string, nodeId: string, source: LessonSource, index: number): Challenge[] {
  return day.questions.map((question, number) => {
    const base = {
      id: `${lessonId}_q${number + 1}`,
      explanation: question.explanation,
      sourceNodeId: nodeId,
      sourceLessonId: lessonId,
      resourceLabel: "Open source",
      resourceUrl: source.url
    };
    if ("statement" in question) {
      return {
        ...base,
        type: "true_false",
        prompt: question.statement,
        choices: [
          { id: "true", label: "True" },
          { id: "false", label: "False" }
        ],
        correctChoiceId: question.answer ? "true" : "false"
      };
    }
    const labels = [question.answer, ...question.wrong];
    const shift = (index + number + 1) % labels.length;
    const ordered = labels.map((_, slot) => labels[(slot + shift) % labels.length]);
    const choices = ordered.map((label, slot) => ({ id: String.fromCharCode(97 + slot), label }));
    return {
      ...base,
      type: "multiple_choice",
      prompt: question.prompt,
      choices,
      correctChoiceId: choices.find((choice) => choice.label === question.answer)!.id
    };
  });
}

function buildRamadan() {
  const branches: LearningBranch[] = UNITS.map((unit, index) => ({
    id: unit.id,
    topicId: RAMADAN_TOPIC,
    title: unit.title,
    description: unit.description,
    order: index + 1,
    difficultyRange: { start: 1, end: 1 },
    sourceReferences: []
  }));
  const nodes: LearningNode[] = [];
  const lessonsById: Record<string, Lesson> = {};
  const nodeArabic: Record<string, ArabicTerm> = {};
  const branchArabic: Record<string, ArabicTerm> = Object.fromEntries(UNITS.map((unit) => [unit.id, unit.arabic]));

  UNITS.forEach((unit) => {
    unit.days.forEach((day, inUnit) => {
      const index = nodes.length;
      const nodeId = ramadanNodeId(day.slug);
      const lessonId = `lesson-${nodeId}`;
      const source = sourceOf(day, lessonId);
      const previous = nodes[index - 1];
      const quote = quoteOf(day);
      nodeArabic[nodeId] = day.arabic;
      nodes.push({
        id: nodeId,
        skillId: `skill_ramadan_day_${index + 1}`,
        title: day.title,
        topicId: RAMADAN_TOPIC,
        branchId: unit.id,
        kind: "skill",
        lessonIds: [lessonId],
        requiredNodeIds: previous ? [previous.id] : [],
        xpReward: 10,
        starsReward: 3,
        order: inUnit + 1,
        difficulty: 1,
        sourceReferences: [source],
        masteryState: "new",
        masteryTestEligible: false
      });
      lessonsById[lessonId] = {
        id: lessonId,
        nodeId,
        branchId: unit.id,
        title: day.title,
        intro: day.line,
        explanationContent: source.summary,
        learnLine: day.line,
        ...(quote ? { quote } : {}),
        learnSource: source,
        lessonType: "skill",
        difficulty: 1,
        xpReward: 10,
        sources: [source],
        sourceReferences: [source],
        unlockRules: previous ? [`Complete ${previous.title}`] : [],
        masteryState: "learning",
        masteryTestEligible: false,
        challenges: challengesOf(day, lessonId, nodeId, source, index)
      };
    });
  });

  const section: LearningSection = {
    id: "ramadan",
    topicId: RAMADAN_TOPIC,
    title: "Ramadan",
    description: "A 30-day Ramadan path: one short lesson for each day of the month.",
    badge: "Ramadan mode",
    focus: "Fasting with faith, suhur and iftar, good deeds, the last ten nights and Eid.",
    mascot: "muslim_man",
    accentColor: "#7C5CDB",
    starsTarget: nodes.reduce((total, node) => total + node.starsReward, 0),
    branches,
    nodes
  };

  return { section, lessonsById, nodeArabic, branchArabic };
}

/** The Ramadan topic: its section (three units, thirty days in path order), lessons and Arabic words. */
export const RAMADAN = buildRamadan();

/** The circle for a day of Ramadan, 1 to 30 (a 29-day month ends on day 29). */
export function ramadanDayNode(day: number): LearningNode | undefined {
  return RAMADAN.section.nodes[Math.min(Math.max(day, 1), RAMADAN.section.nodes.length) - 1];
}
