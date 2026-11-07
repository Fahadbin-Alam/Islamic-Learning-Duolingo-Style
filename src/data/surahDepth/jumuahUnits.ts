import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Jumu'ah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Jumu'ah 62:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_62_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Jumu'ah 62:${ayah}`,
    url: `https://quran.com/62:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 62:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q62 = (ayah: number) => quranQuote(62, ayah);

/** Ayahs 1 to 4: Allah the King and Holy, and His favor in sending the Prophet ﷺ to teach and purify. */
const JUMUAH_ONE: DeepUnit = {
  key: "jumuah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-62",
  name: "Al-Jumu'ah, ayahs 1 to 4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jumu'ah",
  lessons: [
    {
      slug: "recited-on-friday",
      title: "Recited at Friday prayer",
      line: "The Prophet ﷺ recited Al-Jumu'ah in the Friday prayer.",
      facts: ["Al-Jumu'ah means Friday", "Revealed in Madinah"],
      quote: q62(1),
      source: ik(1, "Ibn Kathir reports from Ibn Abbas and Abu Hurayrah that the Prophet ﷺ used to recite Al-Jumu'ah and Al-Munafiqun in the Friday prayer, as Muslim collected.", "Surat Al-Munafiqin during the Friday Prayer"),
      difficulty: 2,
      questions: [
        { q: "In which prayer did the Prophet ﷺ recite Al-Jumu'ah?", a: "The Friday prayer", wrong: ["The Eid prayer", "The night prayer", "The rain prayer"], why: "Allah's Messenger used to recite Surat Al-Jumu'ah and Surat Al-Munafiqin during the Friday Prayer." },
        { q: "Which surah did he pair with Al-Jumu'ah?", a: "Al-Munafiqun", wrong: ["Al-Fil", "Al-Kahf", "Yasin"], why: "Allah's Messenger used to recite Surat Al-Jumu'ah and Surat Al-Munafiqin during the Friday Prayer." },
        { tf: true, q: "Al-Jumu'ah means Friday.", why: "Friday is called Al-Jumu'ah because it is derived from Al-Jam', literally, gathering." }
      ]
    },
    {
      slug: "all-things-glorify",
      title: "Everything glorifies Him",
      line: "Living things and even objects glorify Allah's praise.",
      facts: ["17:44 says the same", "Even stones and trees"],
      quote: q62(1),
      source: ik(1, "Ibn Kathir says everything in the heavens and earth glorifies Allah, all living creatures and even lifeless things.", "including all types of living creatures and inanimate objects"),
      difficulty: 2,
      questions: [
        { q: "What glorifies Allah, per Ibn Kathir?", a: "Living and lifeless things", wrong: ["Only people", "Only angels", "Only birds"], why: "Everything in the heavens and the earth glorifies His praises, including all types of living creatures and inanimate objects." },
        { q: "Which ayah does Ibn Kathir quote?", a: "17:44", wrong: ["2:255", "1:2", "112:1"], why: "There is not a thing but glorifies His praise. (17:44)" },
        { tf: true, q: "Even objects without life glorify Allah.", why: "Including all types of living creatures and inanimate objects." }
      ]
    },
    {
      slug: "the-king-the-holy",
      title: "The King, the Holy",
      line: "Allah is King of all, and the Holy, free of all flaws.",
      facts: ["Al-Malik: the King", "Al-Quddus: the Holy"],
      quote: q62(1),
      source: ik(1, "Ibn Kathir says Allah is the Owner and King of the heavens and earth with full control, and the Holy, free of all shortcomings.", "He is the Holy, free of all shortcomings"),
      difficulty: 3,
      questions: [
        { q: "What does Al-Quddus mean, per Ibn Kathir?", a: "Free of all shortcomings", wrong: ["Very far", "Very old", "Very loud"], why: "He is the Holy, free of all shortcomings, His attributes are perfect." },
        { q: "What does Allah control as King?", a: "The heavens and the earth", wrong: ["Only Makkah", "Only the sea", "Only the sky"], why: "He is the Owner and King of the heavens and the earth Who has perfect control over their affairs." },
        { tf: true, q: "62:1 names four of Allah's Names.", why: "The King, the Holy, the Almighty, the All-Wise." }
      ]
    },
    {
      slug: "among-the-unlettered",
      title: "Sent to the unlettered",
      line: "Allah sent a Messenger to the Arabs from among themselves.",
      facts: ["Ummiyyin: the unlettered", "He was one of them"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir says the unlettered in 62:2 refers to the Arabs, to whom Allah sent a Messenger from among themselves.", "refers to the Arabs"),
      difficulty: 2,
      questions: [
        { q: "Who are the unlettered, per Ibn Kathir?", a: "The Arabs", wrong: ["The Romans", "The Persians", "The angels"], why: "The word unlettered refers to the Arabs." },
        { q: "Where was the Messenger ﷺ from, in 62:2?", a: "From among themselves", wrong: ["From a far land", "From the sky", "From Rome"], why: "He it is Who sent among the unlettered ones a Messenger from among themselves." },
        { tf: true, q: "Naming the Arabs means he was sent only to them.", why: "Mentioning the unlettered ones in specific does not mean that Muhammad was only sent to them." }
      ]
    },
    {
      slug: "sent-to-all",
      title: "A Messenger to all",
      line: "The Prophet ﷺ was sent to all people and jinn, not only Arabs.",
      facts: ["7:158 says so", "His message is universal"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir says the Prophet ﷺ was sent to all people, mankind and the jinn alike, as 7:158 shows.", "was sent to all people, mankind and the Jinns alike"),
      difficulty: 3,
      questions: [
        { q: "To whom was the Prophet ﷺ sent?", a: "All people and jinn", wrong: ["Only the Arabs", "Only Makkah", "Only his family"], why: "He was sent to all people, mankind and the Jinns alike." },
        { q: "Which ayah says I am sent to you all?", a: "7:158", wrong: ["2:1", "36:1", "55:1"], why: "Say: O mankind! verily, I am sent to you all as the Messenger of Allah. (7:158)" },
        { tf: true, q: "The Quran is a reminder for non-Arabs too.", why: "Surely, the Qur'an is also a reminder for those other than Arabs to take heed." }
      ]
    },
    {
      slug: "answer-to-ibrahims-dua",
      title: "Ibrahim's dua answered",
      line: "62:2 shows Allah answered Ibrahim's dua for a Messenger.",
      facts: ["2:129 has the dua", "Sent to the people of Makkah"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir says this ayah shows Allah accepted the dua of Ibrahim to send a Messenger to the people of Makkah from among them.", "Allah has indeed accepted the invocation of His friend Ibrahim"),
      difficulty: 3,
      questions: [
        { q: "Whose dua does 62:2 show was answered?", a: "Ibrahim's", wrong: ["Nuh's", "Musa's", "Yunus's"], why: "Allah has indeed accepted the invocation of His friend Ibrahim." },
        { q: "For whom did Ibrahim ask a Messenger?", a: "The people of Makkah", wrong: ["The people of Egypt", "The people of Ad", "The Romans"], why: "When he supplicated Allah to send a Messenger to the people of Makkah from among them." },
        { tf: true, q: "Ibrahim is called Allah's friend.", why: "Allah has indeed accepted the invocation of His friend Ibrahim." }
      ]
    },
    {
      slug: "recite-purify-teach",
      title: "Recite, purify, teach",
      line: "The Prophet ﷺ recites Allah's ayahs, purifies, and teaches.",
      facts: ["The Book: the Quran", "Al-Hikmah: wisdom, the Sunnah"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir quotes 62:2: the Messenger ﷺ recites His Ayat to them, purifies them and teaches them the Book and the Hikmah.", "reciting to them His Ayat, purifying them, and teaching them the Book and the Hikmah"),
      difficulty: 3,
      questions: [
        { q: "What three things does the Messenger ﷺ do, in 62:2?", a: "Recite, purify and teach", wrong: ["Build, trade and rule", "Sing, write and travel", "Count, sell and buy"], why: "Reciting to them His Ayat, purifying them, and teaching them the Book and the Hikmah." },
        { q: "What does he teach besides the Book?", a: "The Hikmah", wrong: ["Poetry", "Magic", "Trade"], why: "And teaching them the Book and the Hikmah." },
        { tf: true, q: "Purifying people is part of his mission.", why: "Reciting to them His Ayat, purifying them." }
      ]
    },
    {
      slug: "in-manifest-error",
      title: "Out of clear error",
      line: "Before him, people had left Ibrahim's religion for idols.",
      facts: ["Tawhid was replaced by shirk", "Certainty by doubt"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir says the Arabs once followed the religion of Ibrahim, then changed it, choosing polytheism over Tawhid.", "the Arabs used to adhere by the religion of Ibrahim"),
      difficulty: 4,
      questions: [
        { q: "Whose religion did the Arabs once follow?", a: "Ibrahim's", wrong: ["Firawn's", "Qarun's", "Namrud's"], why: "In ancient times, the Arabs used to adhere by the religion of Ibrahim." },
        { q: "What did they choose instead of Tawhid?", a: "Polytheism", wrong: ["Fasting", "Charity", "Prayer"], why: "Choosing polytheism instead of Tawhid and doubts instead of certainty." },
        { tf: true, q: "62:2 says they had been in clear error before.", why: "And verily, they had been before in manifest error." }
      ]
    },
    {
      slug: "a-perfect-religion",
      title: "A perfect religion",
      line: "Allah sent Muhammad with a complete religion for all.",
      facts: ["Guidance for this life and the next", "Closer to Paradise"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir says Allah sent Muhammad with a perfect religion suitable for all humans and jinn, with guidance for this life and the Hereafter.", "perfect religion that is suitable for all humans and Jinns"),
      difficulty: 4,
      questions: [
        { q: "For whom is the religion suitable, per Ibn Kathir?", a: "All humans and jinn", wrong: ["Only scholars", "Only Arabs", "Only the rich"], why: "Perfect religion that is suitable for all humans and Jinns." },
        { q: "Where does the religion lead people?", a: "Closer to Paradise", wrong: ["To more wealth", "To fame", "To idleness"], why: "It draws them closer to Paradise and Allah's pleasure." },
        { tf: true, q: "Islam gives guidance for this life and the next.", why: "In it, there is guidance and explanations of all that they need in this life and the Hereafter." }
      ]
    },
    {
      slug: "the-best-of-the-prophets",
      title: "All good gathered",
      line: "Allah gathered in Muhammad the good qualities of all prophets.",
      facts: ["Allah's peace and blessings on him", "Until the Day of Judgement"],
      quote: q62(2),
      source: ik(2, "Ibn Kathir says in Muhammad Allah gathered all the good qualities of the prophets before him.", "Allah gathered all the good qualities of the Prophets before him"),
      difficulty: 4,
      questions: [
        { q: "What did Allah gather in Muhammad?", a: "The prophets' good qualities", wrong: ["Gold and silver", "Many palaces", "Great armies"], why: "In Muhammad Allah gathered all the good qualities of the Prophets before him." },
        { q: "Whose qualities were gathered in him?", a: "The prophets before him", wrong: ["Kings of Rome", "Poets of Makkah", "Traders of Yemen"], why: "All the good qualities of the Prophets before him." },
        { tf: true, q: "Ibn Kathir sends blessings on Muhammad until the Day of Judgement.", why: "May Allah's peace and blessings be on Muhammad until the Day of Judgement." }
      ]
    },
    {
      slug: "others-who-will-join",
      title: "Others yet to join",
      line: "62:3 speaks of others who would join the believers later.",
      facts: ["Revealed while the Companions sat", "Asked three times"],
      quote: q62(3),
      source: hadith("bukhari", "4897", "Abu Hurairah", "Sahih", "Abu Hurayrah asked who the others in 62:3 are, three times, and the Prophet ﷺ put his hand on Salman Al-Farisi.", "did not reply till I repeated my question thrice"),
      difficulty: 3,
      questions: [
        { q: "How many times was the question asked?", a: "Three times", wrong: ["Once", "Ten times", "Seven times"], why: "The Prophet ﷺ did not reply till I repeated my question thrice." },
        { q: "Who was sitting with them?", a: "Salman Al-Farisi", wrong: ["Abu Jahl", "Abu Lahab", "Qarun"], why: "At that time, Salman Al-Farisi was with us." },
        { tf: true, q: "Al-Jumu'ah was revealed while they sat with the Prophet ﷺ.", why: "While we were sitting with the Prophet ﷺ Surat Al-Jumu'a was revealed to him." }
      ]
    },
    {
      slug: "faith-at-the-pleiades",
      title: "Faith at the Pleiades",
      line: "Even if faith were at the stars, Salman's people would reach it.",
      facts: ["Ath-Thurayya: the Pleiades", "Persians would believe"],
      quote: q62(3),
      source: hadith("bukhari", "4897", "Abu Hurairah", "Sahih", "The Prophet ﷺ put his hand on Salman and said: if faith were at Ath-Thurayya, men from these people would attain it.", "If Faith were at…would attain it"),
      difficulty: 4,
      questions: [
        { q: "Where did the Prophet ﷺ say faith might be?", a: "At Ath-Thurayya", wrong: ["Under the sea", "In a cave", "On a ship"], why: "If Faith were at the place of Ath-Thuraiya, even then some men from these people would attain it." },
        { q: "On whom did the Prophet ﷺ put his hand?", a: "Salman Al-Farisi", wrong: ["Abu Hurayrah", "Bilal", "Umar"], why: "Allah's Messenger put his hand on Salman." },
        { tf: true, q: "Ibn Kathir says the Prophet ﷺ meant Persia.", why: "The Prophet ﷺ explained Allah's statement, And others among them, by mentioning Persia." }
      ]
    },
    {
      slug: "letters-to-kings",
      title: "Letters to the kings",
      line: "The Prophet ﷺ wrote to the kings of Persia and Rome.",
      facts: ["His message is for all", "Mujahid: all non-Arab believers"],
      quote: q62(3),
      source: ik(3, "Ibn Kathir says this is why the Prophet ﷺ sent letters to the kings of Persia and Rome, calling them to Allah.", "the Prophet ﷺ sent messages to the kings of Persia and Rome"),
      difficulty: 4,
      questions: [
        { q: "To which kings did the Prophet ﷺ write?", a: "Persia and Rome", wrong: ["India and China", "Yemen and Oman", "Egypt only"], why: "The Prophet ﷺ sent messages to the kings of Persia and Rome, among other kings." },
        { q: "Who are the others, per Mujahid?", a: "Non-Arabs who believe", wrong: ["Angels", "Jinn only", "Animals"], why: "Refers to all non-Arabs who believe in the truth of the Prophet ﷺ." },
        { tf: true, q: "The hadith shows the surah came in Madinah.", why: "This Hadith indicates that Surat Al-Jumu'ah was revealed in Al-Madinah." }
      ]
    },
    {
      slug: "the-grace-of-allah",
      title: "The grace of Allah",
      line: "Prophethood and this Ummah's blessings are Allah's grace.",
      facts: ["Allah gives to whom He wills", "Owner of mighty grace"],
      quote: q62(4),
      source: ik(4, "Ibn Kathir says the grace in 62:4 is the prophethood given to Muhammad and the blessings given to his Ummah.", "refers to the great prophethood that He granted Muhammad"),
      difficulty: 4,
      questions: [
        { q: "What grace does 62:4 mean, per Ibn Kathir?", a: "Muhammad's prophethood", wrong: ["Rain", "Gold", "Long life"], why: "Refers to the great prophethood that He granted Muhammad." },
        { q: "To whom does Allah give His grace?", a: "Whom He wills", wrong: ["Whoever is rich", "Whoever is strong", "No one"], why: "That is the grace of Allah, which He bestows on whom He wills." },
        { tf: true, q: "His Ummah was favored by his being sent.", why: "The qualities that He favored his Ummah with, by sending Muhammad to them." }
      ]
    },
    {
      slug: "faith-above-health-and-wealth",
      title: "Above health and wealth",
      line: "The gift of the religion is greater than health or wealth.",
      facts: ["As-Sa'di explains", "The greatest blessing"],
      quote: q62(4),
      source: saadi(62, 4, "As-Sa'di says sending the Messenger is a bigger favour than good health and wide provision, because no blessing is greater than the religion, which brings lasting happiness.", "وهو أفضل من نعمته عليهم بعافية البدن وسعة الرزق"),
      difficulty: 2,
      questions: [
        { q: "Which blessing is greatest, per as-Sa'di on 62:4?", a: "The religion", wrong: ["Good health", "Lots of money", "A big house"], why: "No blessing is greater than the religion, says as-Sa'di." },
        { q: "Why is the religion the greatest gift?", a: "It brings lasting happiness", wrong: ["It makes us rich", "It ends all work", "It makes us famous"], why: "It is the way to success and happiness forever." },
        { tf: true, q: "Allah did not leave His servants without guidance.", why: "As-Sa'di on 62:4." }
      ]
    }
  ]
};

/** Ayahs 5 to 8: knowledge carried but not acted on, the challenge to wish for death, and death that cannot be escaped. */
const JUMUAH_TWO: DeepUnit = {
  key: "jumuah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-62",
  name: "Al-Jumu'ah, ayahs 5 to 8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jumu'ah",
  lessons: [
    {
      slug: "carrying-without-understanding",
      title: "Carrying but not living it",
      line: "A Book unlived is like books on a donkey's back.",
      facts: ["The donkey cannot read them", "Knowledge must be acted on"],
      quote: q62(5),
      source: ik(5, "Ibn Kathir explains a donkey carrying books does not understand them; it only carries them with its strength.", "it will not understand what these books contain because it is only carrying these books using its strength"),
      difficulty: 2,
      questions: [
        { q: "What animal is used in the example of 62:5?", a: "A donkey", wrong: ["A camel", "A horse", "A sheep"], why: "As the likeness of a donkey which carries huge burdens of books." },
        { q: "What does the donkey understand of the books?", a: "Nothing at all", wrong: ["Every word", "The titles", "Half of them"], why: "It will not understand what these books contain because it is only carrying these books using its strength." },
        { tf: true, q: "Carrying a book is the same as following it.", why: "They read its letter but did not understand its meanings nor abided by them." }
      ]
    },
    {
      slug: "letters-not-meanings",
      title: "Words without meaning",
      line: "They read the Tawrah's words but did not follow its meaning.",
      facts: ["Reading is not enough", "Understand and act"],
      quote: q62(5),
      source: ik(5, "Ibn Kathir says they read the letters of the Tawrah but did not understand its meanings or act on them.", "they read its letter but did not understand its meanings nor abided by them"),
      difficulty: 3,
      questions: [
        { q: "What did they do with the Tawrah, per Ibn Kathir?", a: "Read it without acting on it", wrong: ["Buried it", "Sold it", "Never opened it"], why: "They read its letter but did not understand its meanings nor abided by them." },
        { q: "What were they ordered to do with it?", a: "Abide by it", wrong: ["Hide it", "Sell it", "Sing it"], why: "The Jews who were entrusted with the Tawrah and were ordered to abide by it." },
        { tf: true, q: "We should understand and live by what we learn.", why: "They read its letter but did not understand its meanings nor abided by them." }
      ]
    },
    {
      slug: "minds-that-did-not-help",
      title: "A mind that is not used",
      line: "People can understand, unlike the donkey, so more is expected.",
      facts: ["7:179 says the same", "The heedless lose out"],
      quote: q62(5),
      source: ik(5, "Ibn Kathir says the donkey cannot understand, but people could have understood with their minds, yet did not benefit.", "could have understood using their minds"),
      difficulty: 3,
      questions: [
        { q: "What could people use that the donkey cannot?", a: "Their minds", wrong: ["Their legs", "Their wealth", "Their voices"], why: "They, on the other hand, could have understood using their minds." },
        { q: "Which ayah does Ibn Kathir quote?", a: "7:179", wrong: ["2:255", "36:1", "1:5"], why: "They are like cattle, nay even more astray; those! They are the heedless. (7:179)" },
        { tf: true, q: "62:5 ends: Allah does not guide the wrongdoers.", why: "And Allah does not guide the people who are wrongdoers." }
      ]
    },
    {
      slug: "if-you-are-truthful",
      title: "If you are truthful",
      line: "Those who claimed to be Allah's only friends were challenged.",
      facts: ["A challenge for truth", "2:94 has the same"],
      quote: q62(6),
      source: ik(6, "Ibn Kathir says the challenge was: if you claim to be rightly guided, ask Allah to bring death to whichever group is misguided.", "invoke Allah to bring death to the misguided group among the two"),
      difficulty: 3,
      questions: [
        { q: "What did they claim, in 62:6?", a: "To be Allah's only friends", wrong: ["To be kings", "To be poor", "To be prophets"], why: "If you pretend that you are friends of Allah, to the exclusion of other people." },
        { q: "What was the challenge, per Ibn Kathir?", a: "Ask death for the misguided side", wrong: ["Build a tower", "Bring gold", "Walk on water"], why: "Invoke Allah to bring death to the misguided group among the two, if you are truthful in your claim." },
        { tf: true, q: "A similar challenge is in Al-Baqarah.", why: "We mentioned this challenge to the Jews before in Surat Al-Baqarah." }
      ]
    },
    {
      slug: "they-will-never-wish-it",
      title: "They will never wish it",
      line: "They would never wish it, due to the deeds they sent ahead.",
      facts: ["Deeds go before us", "Allah knows the wrongdoers"],
      quote: q62(7),
      source: ik(7, "Ibn Kathir says they will never wish for it because of the disbelief, injustice and sins they commit.", "because of the disbelief, injustice and sins that they commit"),
      difficulty: 3,
      questions: [
        { q: "Why would they never wish for it, in 62:7?", a: "Because of their deeds", wrong: ["Because of the weather", "Because of travel", "Because of hunger"], why: "But they will never long for it, because of what their hands have sent before them!" },
        { q: "What had their hands sent ahead, per Ibn Kathir?", a: "Disbelief, injustice and sins", wrong: ["Gifts and food", "Letters", "Prayers"], why: "Because of the disbelief, injustice and sins that they commit." },
        { tf: true, q: "62:7 says Allah knows the wrongdoers well.", why: "And Allah knows well the wrongdoers." }
      ]
    },
    {
      slug: "other-challenges",
      title: "Challenges to come forward",
      line: "Others who argued against the truth got similar challenges.",
      facts: ["3:61 with the Christians", "19:75 with the idolaters"],
      quote: q62(6),
      source: ik(6, "Ibn Kathir says a similar challenge was made to the Christians in Al Imran and to the idolaters in Surah Maryam.", "We also mentioned a similar challenge against the Christians"),
      difficulty: 4,
      questions: [
        { q: "Where is the challenge to the Christians?", a: "Surah Al Imran", wrong: ["Surah Al-Fil", "Surah Yusuf", "Surah An-Nas"], why: "We also mentioned a similar challenge against the Christians in Surah Al Imran. (3:61)" },
        { q: "Where is the challenge to the idolaters?", a: "Surah Maryam", wrong: ["Surah Al-Kahf", "Surah Taha", "Surah Al-Asr"], why: "And against the idolators, in Surah Maryam. (19:75)" },
        { tf: true, q: "The truthful side does not fear such a challenge.", why: "Then long for death if you are truthful." }
      ]
    },
    {
      slug: "had-they-wished",
      title: "Had they wished it",
      line: "Had they wished for death, the Prophet ﷺ said, it would come.",
      facts: ["Ibn Abbas reported it", "Al-Bukhari recorded it"],
      quote: q62(7),
      source: ik(7, "Ibn Kathir reports from Ibn Abbas that the Prophet ﷺ said, had the Jews wished for death, they would have perished.", "Had the Jews wished for death, they would all have perished"),
      difficulty: 4,
      questions: [
        { q: "What if they had wished for death?", a: "They would have perished", wrong: ["Nothing at all", "They would be kings", "They would win"], why: "Had the Jews wished for death, they would all have perished." },
        { q: "Who reported this from the Prophet ﷺ?", a: "Ibn Abbas", wrong: ["Abu Jahl", "Umayyah", "Qarun"], why: "Imam Ahmad recorded that Ibn Abbas said." },
        { tf: true, q: "Al-Bukhari also recorded this report.", why: "Al-Bukhari, At-Tirmidhi and An-Nasa'i recorded it." }
      ]
    },
    {
      slug: "death-will-meet-you",
      title: "Death will meet you",
      line: "The death people run from will surely meet them.",
      facts: ["No one escapes it", "4:78 says the same"],
      quote: q62(8),
      source: ik(8, "Ibn Kathir compares 62:8 with 4:78: wherever you are, death will reach you, even in high, strong towers.", "Wheresoever you may be, death will overtake you even if you are in fortresses built up strong and high"),
      difficulty: 3,
      questions: [
        { q: "What happens to the death people run from?", a: "It will meet them", wrong: ["It forgets them", "It goes away", "It waits forever"], why: "Verily, the death from which you flee will surely meet you." },
        { q: "Which ayah does Ibn Kathir compare?", a: "4:78", wrong: ["2:2", "18:10", "112:2"], why: "Wheresoever you may be, death will overtake you even if you are in fortresses built up strong and high. (4:78)" },
        { tf: true, q: "Strong towers can keep death away.", why: "Death will overtake you even if you are in fortresses built up strong and high." }
      ]
    },
    {
      slug: "back-to-the-knower",
      title: "Back to the All-Knowing",
      line: "After death, all return to Allah, who knows the seen and unseen.",
      facts: ["He will tell us our deeds", "Prepare before the meeting"],
      quote: q62(8),
      source: ik(8, "Ibn Kathir quotes 62:8: then you will be sent back to the Knower of the unseen and the seen, and He will inform you of what you did.", "then you will be sent back to the Knower of the unseen and the seen"),
      difficulty: 4,
      questions: [
        { q: "To whom will everyone return, in 62:8?", a: "The Knower of unseen and seen", wrong: ["The kings", "The scholars", "Their families"], why: "Then you will be sent back to the Knower of the unseen and the seen." },
        { q: "What will He tell them?", a: "What they used to do", wrong: ["The weather", "Market prices", "Old poems"], why: "And He will inform you about what you used to do." },
        { tf: true, q: "Allah knows both the seen and the unseen.", why: "The Knower of the unseen and the seen." }
      ]
    },
    {
      slug: "loving-to-meet-allah",
      title: "Loving to meet Allah",
      line: "The believer gets good news at death and loves to meet Allah.",
      facts: ["Allah loves to meet him too", "Good deeds bring good news"],
      quote: q62(8),
      source: hadith("bukhari", "6507", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ said whoever loves to meet Allah, Allah loves to meet him; at death the believer receives good news of Allah's pleasure.", "Who-ever loves to meet Allah"),
      difficulty: 5,
      questions: [
        { q: "Who does Allah love to meet?", a: "Whoever loves to meet Him", wrong: ["Only kings", "Only the rich", "No one"], why: "Who-ever loves to meet Allah, Allah too loves to meet him." },
        { q: "What does a believer receive near death?", a: "Good news of Allah's pleasure", wrong: ["A letter", "Gold", "Nothing"], why: "He receives the good news of Allah's pleasure with him and His blessings upon him." },
        { tf: true, q: "Disliking death means hating to meet Allah.", why: "Aisha said, But we dislike death. He said: It is not like this." }
      ]
    }
  ]
};

/** Ayahs 9 to 11: Friday, the call to prayer, its manners and virtues, and leaving the sermon for trade. */
const JUMUAH_THREE: DeepUnit = {
  key: "jumuah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-62",
  name: "Al-Jumu'ah, ayahs 9 to 11",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jumu'ah",
  lessons: [
    {
      slug: "the-day-of-gathering",
      title: "The day of gathering",
      line: "Friday is named from gathering, as Muslims gather each week.",
      facts: ["Al-Jam: gathering", "Old name: Arubah"],
      quote: q62(9),
      source: ik(9, "Ibn Kathir says Friday is called Al-Jumu'ah from gathering, as Muslims gather every week in the big places of worship.", "The people of Islam gather weekly, on every Friday in the major places of worship"),
      difficulty: 2,
      questions: [
        { q: "What word is Al-Jumu'ah taken from?", a: "Al-Jam, gathering", wrong: ["Al-Jamal, camel", "Al-Jannah, garden", "Al-Jabal, mountain"], why: "Friday is called Al-Jumu'ah because it is derived from Al-Jam', literally, gathering." },
        { q: "What was Friday called in old Arabic?", a: "Arubah", wrong: ["Sabt", "Ahad", "Khamis"], why: "In the ancient language Friday was called, Arubah." },
        { tf: true, q: "Muslims gather every Friday.", why: "The people of Islam gather weekly, on every Friday in the major places of worship." }
      ]
    },
    {
      slug: "the-best-day",
      title: "The best day",
      line: "Friday is the best day; Adam was created on it.",
      facts: ["Adam entered Paradise on it", "The Hour comes on a Friday"],
      quote: q62(9),
      source: hadith("muslim", "854", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the best day the sun rises on is Friday: on it Adam was created and entered Paradise, and the Hour will come on it.", "The best day on which the sun has risen is Friday; on it Adam was created"),
      difficulty: 2,
      questions: [
        { q: "What is the best day the sun rises on?", a: "Friday", wrong: ["Monday", "Saturday", "Sunday"], why: "The best day on which the sun has risen is Friday." },
        { q: "Who was created on a Friday?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "On it Adam was created." },
        { tf: true, q: "The Last Hour will come on a Friday.", why: "And the last hour will take place on no day other than Friday." }
      ]
    },
    {
      slug: "an-hour-of-answered-dua",
      title: "An hour of answered dua",
      line: "Friday has a short hour when good duas are answered.",
      facts: ["The Prophet ﷺ showed it is short", "Keep making dua"],
      quote: q62(9),
      source: hadith("bukhari", "935", "Abu Hurairah", "Sahih", "The Prophet ﷺ said there is an hour on Friday when a Muslim praying who asks Allah for something will be given it, and he showed it is short.", "There is an hour (opportune time) on Friday"),
      difficulty: 3,
      questions: [
        { q: "What is special about an hour on Friday?", a: "Dua is answered", wrong: ["Shops close", "The sun stops", "Rain falls"], why: "If a Muslim gets it while praying and asks something from Allah, then Allah will definitely meet his demand." },
        { q: "How long is that hour?", a: "Short", wrong: ["All day", "A week", "A month"], why: "He pointed out the shortness of that time with his hands." },
        { tf: true, q: "Ibn Kathir mentions the hour of answered dua.", why: "There is an hour during Friday, wherein no faithful servant asks Allah for something good, but Allah will give him what he asked for." }
      ]
    },
    {
      slug: "guided-to-friday",
      title: "Guided to Friday",
      line: "Allah guided this Ummah to Friday, while others took other days.",
      facts: ["Last to come, first to be judged", "Saturday, then Sunday"],
      quote: q62(9),
      source: hadith("bukhari", "876", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said Muslims came last but will be first on the Day of Resurrection, and Allah guided them to Friday.", "So Allah gave us the guidance for it"),
      difficulty: 3,
      questions: [
        { q: "Which day was this Ummah guided to?", a: "Friday", wrong: ["Saturday", "Sunday", "Monday"], why: "So Allah gave us the guidance for it (Friday)." },
        { q: "When will Muslims be foremost?", a: "On the Day of Resurrection", wrong: ["In trade", "In wealth", "In numbers"], why: "We Muslims are the last to come but will be the foremost on the Day of Resurrection." },
        { tf: true, q: "Muslims came last among the nations.", why: "We Muslims are the last to come." }
      ]
    },
    {
      slug: "the-day-creation-finished",
      title: "The day creation was finished",
      line: "Allah chose Friday, the day creation was completed.",
      facts: ["The sixth day", "Others chose other days"],
      quote: q62(9),
      source: ik(9, "Ibn Kathir says Allah chose Friday for this Ummah because it is the day creation was finished.", "Allah chose Friday for this Ummah, because it is the day the creation was finished"),
      difficulty: 4,
      questions: [
        { q: "Why was Friday chosen, per Ibn Kathir?", a: "Creation was finished on it", wrong: ["It is the longest", "It is the coldest", "It is market day"], why: "Allah chose Friday for this Ummah, because it is the day the creation was finished." },
        { q: "Which day of creation was Friday?", a: "The sixth", wrong: ["The first", "The third", "The tenth"], why: "It was during Friday when Allah finished the creation, the sixth day." },
        { tf: true, q: "Earlier nations were told about Friday.", why: "It is a fact that previous nations were informed about Friday, but they were led astray from it." }
      ]
    },
    {
      slug: "hasten-to-remembrance",
      title: "Go to the remembrance",
      line: "When the Friday call is made, go to remember Allah.",
      facts: ["Sa'y: to head for it", "Not running"],
      quote: q62(9),
      source: ik(9, "Ibn Kathir says hasten in 62:9 means go to it and head for it, showing its importance, not walking fast.", "does not refer to walking quickly"),
      difficulty: 3,
      questions: [
        { q: "What should believers do at the Friday call?", a: "Go to remember Allah", wrong: ["Go to the market", "Go to sleep", "Stay home"], why: "When the call is proclaimed for the Salah on Al-Jumu'ah, then hasten to the remembrance of Allah." },
        { q: "What does hasten mean, per Ibn Kathir?", a: "Head for it", wrong: ["Run fast", "Shout", "Jump"], why: "Meaning, go to it and head for it." },
        { tf: true, q: "Hasten in 62:9 means walking fast.", why: "The meaning of Sa'y does not refer to walking quickly. It only refers to the importance of it." }
      ]
    },
    {
      slug: "come-with-calm",
      title: "Come with calm",
      line: "The Prophet ﷺ said to walk to prayer with calm and not rush.",
      facts: ["Pray what you catch", "Complete what you missed"],
      quote: q62(9),
      source: hadith("bukhari", "636", "Abu Hurairah", "Sahih", "The Prophet ﷺ said when you hear the Iqama, go to the prayer with calmness and do not rush; pray what you catch and complete what you missed.", "proceed to offer the prayer with calmness and solemnity and do not make haste"),
      difficulty: 3,
      questions: [
        { q: "How should we walk to the prayer?", a: "With calmness", wrong: ["Running", "Shouting", "Jumping"], why: "Proceed to offer the prayer with calmness and solemnity and do not make haste." },
        { q: "What do you do with the part you missed?", a: "Complete it", wrong: ["Skip it", "Forget it", "Pray it next week"], why: "Pray whatever you are able to pray and complete whatever you have missed." },
        { tf: true, q: "Al-Hasan said hastening is with the heart.", why: "Hastening to the prayer is not accomplished by the feet. Rather it is about the hearts, the intention, and the submission." }
      ]
    },
    {
      slug: "bathe-for-friday",
      title: "Bathe for Friday",
      line: "The Prophet ﷺ told those coming to Friday prayer to take a bath.",
      facts: ["Ghusl: a full bath", "Clean for the gathering"],
      quote: q62(9),
      source: hadith("bukhari", "877", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said anyone of you attending the Friday prayer should take a bath.", "Anyone of you attending the Friday"),
      difficulty: 3,
      questions: [
        { q: "What should one do before Friday prayer?", a: "Take a bath", wrong: ["Fast", "Travel", "Sleep"], why: "Anyone of you attending the Friday prayers should take a bath." },
        { q: "Who narrated it?", a: "Abdullah ibn Umar", wrong: ["Abu Jahl", "Qarun", "Haman"], why: "The Two Sahihs recorded that Abdullah bin Umar said that Allah's Messenger said it." },
        { tf: true, q: "Abu Sa'id narrated it is required for adults.", why: "The taking of a bath on Friday is compulsory for every male Muslim who has attained the age of puberty." }
      ]
    },
    {
      slug: "best-clothes-and-perfume",
      title: "Clean, perfumed, quiet",
      line: "Bathe, perfume, listen quietly: sins till next Friday forgiven.",
      facts: ["Do not push between people", "Stay silent at the sermon"],
      quote: q62(9),
      source: hadith("bukhari", "883", "Salman al-Farisi", "Sahih", "The Prophet ﷺ said whoever bathes, uses perfume, does not separate two people, prays and listens to the khutbah, his sins until the next Friday are forgiven.", "remains silent while the Imam is delivering the Khutba"),
      difficulty: 4,
      questions: [
        { q: "What should one do during the khutbah?", a: "Stay silent", wrong: ["Talk", "Eat", "Walk around"], why: "Then remains silent while the Imam is delivering the Khutba." },
        { q: "What should one not do to people sitting?", a: "Push between two of them", wrong: ["Greet them", "Smile at them", "Sit near them"], why: "Does not separate two persons sitting together in the mosque." },
        { tf: true, q: "Ibn Kathir says to wear one's best clothes for Friday.", why: "It is recommended that one cleans his body, performs Ghusl, wears his best clothes, applies perfume and uses Siwak." }
      ]
    },
    {
      slug: "a-year-for-each-step",
      title: "A year for each step",
      line: "Going early and listening earns a year's reward per step.",
      facts: ["Aws bin Aws narrated it", "Sit close and listen"],
      quote: q62(9),
      source: hadith("tirmidhi", "496", "Aws bin Aws", "Sahih", "The Prophet ﷺ said whoever bathes on Friday, goes early, sits close and listens silently gets, for every step, the reward of a year of fasting and prayer.", "there will be for him in every step he take the reward of a year of fasting and standing"),
      difficulty: 4,
      questions: [
        { q: "What is the reward for each step?", a: "A year of fasting and prayer", wrong: ["One good deed", "A day of rest", "A gift of gold"], why: "There will be for him in every step he take the reward of a year of fasting and standing in prayer." },
        { q: "Where should he sit?", a: "Close to the Imam", wrong: ["At the very back", "Outside", "At home"], why: "Goes early, arriving early, gets close and listens and is silent." },
        { tf: true, q: "Listening silently is part of earning this reward.", why: "Gets close and listens and is silent." }
      ]
    },
    {
      slug: "camel-cow-ram",
      title: "Early comers' reward",
      line: "Coming early to Friday is like giving a camel; later is less.",
      facts: ["Then a cow, a ram, a hen, an egg", "Angels listen when the Imam comes"],
      quote: q62(9),
      source: hadith("bukhari", "881", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said whoever goes early to the Friday prayer is as if he sacrificed a camel, then a cow, a ram, a hen and an egg for later hours.", "it is as if he had sacrificed a camel"),
      difficulty: 4,
      questions: [
        { q: "What is the reward of coming in the first hour?", a: "Like giving a camel", wrong: ["Like giving a hen", "Like giving an egg", "Nothing"], why: "Then goes for the prayer in the first hour, it is as if he had sacrificed a camel." },
        { q: "What comes after the camel?", a: "A cow", wrong: ["A goat", "A horse", "A fish"], why: "Whoever goes in the second hour it is as if he had sacrificed a cow." },
        { tf: true, q: "Angels come to listen when the Imam appears.", why: "When the Imam appears, the angels present themselves to listen to Allah's remembrance." }
      ]
    },
    {
      slug: "the-friday-adhan",
      title: "The Friday adhan",
      line: "In the Prophet's ﷺ time, the adhan was called once he sat.",
      facts: ["Uthman added an earlier call", "The Muslims had grown in number"],
      quote: q62(9),
      source: hadith("bukhari", "912", "As-Saib bin Yazid", "Sahih", "As-Sa'ib said in the time of the Prophet ﷺ, Abu Bakr and Umar, the Friday adhan was called when the Imam sat on the pulpit, and Uthman added a call when Muslims grew in number.", "used to be pronounced when the Imam sat on the pulpit"),
      difficulty: 5,
      questions: [
        { q: "When was the adhan called in the Prophet's ﷺ time?", a: "When the Imam sat on the pulpit", wrong: ["At sunrise", "At midnight", "After the prayer"], why: "The Adhan for the Jumua prayer used to be pronounced when the Imam sat on the pulpit." },
        { q: "Who added another call?", a: "Uthman", wrong: ["Abu Bakr", "Umar", "Ali"], why: "During the Caliphate of Uthman when the Muslims increased in number, another call was added." },
        { tf: true, q: "Az-Zawra was a place near the market of Madinah.", why: "Az-Zaura' is a place in the market of Medina." }
      ]
    },
    {
      slug: "leave-off-business",
      title: "Leave off business",
      line: "At the Friday call, buying and selling must stop.",
      facts: ["Scholars agree on it", "Better for this life and the next"],
      quote: q62(9),
      source: ik(9, "Ibn Kathir says the scholars agree it is forbidden to buy and sell after the second adhan of Friday.", "it is prohibited for Muslims to engage in business transactions after the second Adhan"),
      difficulty: 4,
      questions: [
        { q: "What must stop at the Friday call?", a: "Buying and selling", wrong: ["Breathing", "Talking kindly", "Smiling"], why: "Hasten to the remembrance of Allah and leave off business." },
        { q: "After which adhan is trade forbidden?", a: "The second adhan", wrong: ["The dawn adhan", "Any adhan at all", "No adhan"], why: "It is prohibited for Muslims to engage in business transactions after the second Adhan." },
        { tf: true, q: "Leaving trade for prayer is better for us.", why: "That is better for you if you did but know!" }
      ]
    },
    {
      slug: "spread-out-after",
      title: "Spread out and seek",
      line: "After the prayer, go out and seek Allah's bounty.",
      facts: ["Work is allowed again", "Seek halal provision"],
      quote: q62(10),
      source: ik(10, "Ibn Kathir says after forbidding work at the call, Allah allowed them to spread out and seek His bounty once the prayer ends.", "He allowed them to spread throughout the earth and seek bounty after the prayer is finished"),
      difficulty: 3,
      questions: [
        { q: "What may believers do after the prayer, in 62:10?", a: "Seek Allah's bounty", wrong: ["Stay silent all day", "Leave Islam", "Stop working forever"], why: "Then when the Salah is complete, you may disperse through the land, and seek the bounty of Allah." },
        { q: "When is work allowed again?", a: "After the prayer is finished", wrong: ["During the khutbah", "During the call", "Never"], why: "He allowed them to spread throughout the earth and seek bounty after the prayer is finished." },
        { tf: true, q: "Islam forbids working on Friday at all.", why: "He allowed them to spread throughout the earth and seek bounty after the prayer is finished." }
      ]
    },
    {
      slug: "iraks-dua",
      title: "A dua at the door",
      line: "Irak bin Malik made a dua at the masjid door after Friday.",
      facts: ["He obeyed the call", "He asked for provision"],
      quote: q62(10),
      source: ik(10, "Ibn Kathir reports that after Friday prayer Irak bin Malik stood at the masjid gate asking Allah for His favor, the best of providers.", "You are the best of those who grant provisions"),
      difficulty: 4,
      questions: [
        { q: "Where did Irak bin Malik stand to make dua?", a: "At the masjid gate", wrong: ["On a hill", "In the market", "At home"], why: "Irak bin Malik would stand by the gate of the Masjid and invoke Allah." },
        { q: "What did he ask Allah for?", a: "Of His favor", wrong: ["A palace", "Fame", "Revenge"], why: "Therefore, grant me of Your favor and You are the best of those who grant provisions." },
        { tf: true, q: "He said he had answered Allah's call.", why: "O Allah! I have accepted and complied with Your Call." }
      ]
    },
    {
      slug: "remember-allah-much",
      title: "Remember Allah much",
      line: "Even while trading, remember Allah much to succeed.",
      facts: ["Do not let business distract", "Mujahid: standing, sitting, lying"],
      quote: q62(10),
      source: ik(10, "Ibn Kathir says while buying and selling, remember Allah much and do not let this life distract you from what benefits you in the Hereafter.", "remember Allah much and do not let this life busy you from what benefits you in the Hereafter"),
      difficulty: 4,
      questions: [
        { q: "When should we remember Allah, per Ibn Kathir?", a: "Even while trading", wrong: ["Only at night", "Only in Ramadan", "Only when sad"], why: "While you are buying and selling, giving and taking, remember Allah much." },
        { q: "What did Mujahid say about remembering often?", a: "Standing, sitting and lying down", wrong: ["Only standing", "Only in the masjid", "Only once a day"], why: "A servant will not be among those who remember Allah often, until he does so while standing, sitting and lying down." },
        { tf: true, q: "62:10 links remembering Allah with success.", why: "And remember Allah much, that you may be successful." }
      ]
    },
    {
      slug: "the-caravan-arrives",
      title: "The caravan arrives",
      line: "A caravan came during a sermon, and many left the Prophet ﷺ.",
      facts: ["Only twelve stayed", "62:11 was revealed then"],
      quote: q62(11),
      source: hadith("bukhari", "4899", "Jabir bin Abdullah", "Sahih", "Jabir said a caravan came to Madinah on a Friday and all but twelve left the Prophet ﷺ, so Allah revealed 62:11.", "All the people left"),
      difficulty: 3,
      questions: [
        { q: "What arrived during the Friday sermon?", a: "A caravan", wrong: ["An army", "A storm", "A king"], why: "A caravan of merchandise arrived at Medina on a Friday while we were with the Prophet ﷺ." },
        { q: "How many people stayed?", a: "Twelve", wrong: ["Two", "Forty", "One hundred"], why: "All the people left except twelve persons." },
        { tf: true, q: "62:11 was revealed about this event.", why: "Then Allah revealed: But when they see some bargain or some amusement they disperse headlong to it." }
      ]
    },
    {
      slug: "khutbah-standing",
      title: "The sermon standing",
      line: "The Prophet ﷺ gave two sermons standing, sitting between them.",
      facts: ["Leave you standing proves it", "He recited and reminded"],
      quote: q62(11),
      source: hadith("muslim", "862", "Jabir bin Samurah", "Sahih", "Jabir bin Samurah said the Prophet ﷺ gave two sermons, sitting between them, reciting the Quran and reminding the people.", "gave two sermons between which he sat"),
      difficulty: 4,
      questions: [
        { q: "How many sermons did the Prophet ﷺ give on Friday?", a: "Two", wrong: ["One", "Three", "Five"], why: "The Apostle of Allah gave two sermons between which he sat." },
        { q: "What does leave you standing prove, per Ibn Kathir?", a: "The Imam stands to speak", wrong: ["The Imam sits", "No sermon is needed", "The Imam walks"], why: "Allah's statement, And leave you standing, proves that the Imam should deliver the speech on Friday while standing." },
        { tf: true, q: "He recited the Quran in the sermons.", why: "He sat, recited the Qur'an and exhorted the people." }
      ]
    },
    {
      slug: "what-allah-has-is-better",
      title: "What Allah has is better",
      line: "Allah's reward is better than any amusement or trade.",
      facts: ["Ar-Raziq: the Provider", "Trust Allah for provision"],
      quote: q62(11),
      source: ik(11, "Ibn Kathir says the reward with Allah in the Hereafter is better than any amusement or merchandise, and Allah is the best of providers.", "is better than any amusement or merchandise"),
      difficulty: 4,
      questions: [
        { q: "What is better than any trade, in 62:11?", a: "What Allah has", wrong: ["A bigger caravan", "More gold", "A new market"], why: "Say: That which Allah has is better than any amusement or merchandise!" },
        { q: "How does 62:11 end?", a: "Allah is the best of providers", wrong: ["Allah is the King", "Allah is the Near", "Allah is the Light"], why: "And Allah is the best of providers." },
        { tf: true, q: "Allah provides for those who trust in Him.", why: "For those who trust in Him and seek His provisions when they are allowed to do so." }
      ]
    },
    {
      slug: "allowed-but-not-now",
      title: "Allowed, but not now",
      line: "An allowed thing is wrong when it makes you miss a duty.",
      facts: ["As-Sa'di explains", "Selling at the Friday call"],
      quote: q62(11),
      source: saadi(62, 11, "As-Sa'di says selling was forbidden after the Friday call only because it makes people miss a duty, so anything allowed becomes not allowed when it causes a duty to be missed.", "فدل ذلك على أن كل أمر ولو كان مباحًا في الأصل، إذا كان ينشأ عنه تفويت واجب، فإنه لا يجوز في تلك الحال"),
      difficulty: 3,
      questions: [
        { q: "Why was selling stopped at the Friday call?", a: "It makes people miss a duty", wrong: ["Selling is always wrong", "Money is dirty", "Markets close"], why: "It makes a person miss the duty, says as-Sa'di." },
        { q: "An allowed game that makes you miss a prayer is...?", a: "Not allowed then", wrong: ["Always fine", "Better than prayer", "A good deed"], why: "Anything allowed is not allowed when it makes a duty missed." },
        { tf: true, q: "After the Friday prayer, buying and selling are fine again.", why: "As-Sa'di on 62:9-11." }
      ]
    }
  ]
};

export const JUMUAH_UNITS: readonly DeepUnit[] = [JUMUAH_ONE, JUMUAH_TWO, JUMUAH_THREE];
