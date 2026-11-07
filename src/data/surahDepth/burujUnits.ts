import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Buruj ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Buruj 85:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_85_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Buruj 85:${ayah}`,
    url: `https://quran.com/85:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 85:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q85 = (ayah: number) => quranQuote(85, ayah);


/** Ayahs 1 to 10: oaths by the sky and the Day, the believers of the ditch who held to their faith, and the open door of repentance. */
const BURUJ_ONE: DeepUnit = {
  key: "buruj1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-85",
  name: "Al-Buruj, ayahs 1-10",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Buruj",
  lessons: [
    {
      slug: "the-sky-of-great-stars",
      title: "The sky of great stars",
      line: "Allah swears by the sky and its great stars.",
      facts: ["Al-Buruj: the great stars", "Ayah 25:61 says the same"],
      quote: q85(1),
      source: ik(1, "Ibn Abbas, Mujahid and others said Al-Buruj are the stars; Ibn Jarir said the stations of the sun and moon.", "The Buruj are the giant stars"),
      difficulty: 1,
      questions: [
        { q: "By what does Allah swear in 85:1?", a: "The heaven holding the Buruj", wrong: ["The sea and its fish", "The desert", "The mountains"], why: "By the heaven holding the Buruj." },
        { q: "What are the Buruj, per Ibn Abbas?", a: "The stars", wrong: ["The clouds", "The winds", "The rivers"], why: "Ibn Abbas, Mujahid, Ad-Dahhak, Al-Hasan, Qatadah and As-Suddi, all said, Al-Buruj are the stars." },
        { q: "How many Buruj did Ibn Jarir count for the sun and moon?", a: "Twelve", wrong: ["Three", "Seven", "Forty"], why: "The positions of the sun and the moon, which are twelve Buruj." }
      ]
    },
    {
      slug: "the-promised-day",
      title: "The Promised Day",
      line: "Allah swears by the Promised Day, the Day of Judgement.",
      facts: ["Al-Yawm al-Maw'ud: the Promised Day", "Allah keeps His promise"],
      quote: q85(2),
      source: ik(2, "Ibn Kathir explains that the Promised Day refers to the Day of Judgement.", "This refers to the Day of Judgement"),
      difficulty: 1,
      questions: [
        { q: "By what Day does Allah swear in 85:2?", a: "The Promised Day", wrong: ["The first day of spring", "A market day", "A wedding day"], why: "And by the Promised Day." },
        { q: "What is the Promised Day?", a: "The Day of Judgement", wrong: ["A holiday", "The day of birth", "A day of rain"], why: "This refers to the Day of Judgement." },
        { tf: false, q: "The Promised Day may never come.", why: "And by the Promised Day. This refers to the Day of Judgement." }
      ]
    },
    {
      slug: "the-witness-and-the-witnessed",
      title: "The Witness and the Witnessed",
      line: "Most say the Witness is Friday and the Witnessed is Arafah.",
      facts: ["Shahid: Witness, Friday", "Mashhud: Witnessed, Arafah"],
      quote: q85(3),
      source: ik(3, "Al-Baghawi said the majority hold that the Witness is Friday and the Witnessed is the day of Arafah.", "The majority considers the Witness to be Friday"),
      difficulty: 3,
      questions: [
        { q: "By what does Allah swear in 85:3?", a: "The Witness and the Witnessed", wrong: ["The sun and moon", "The day and night", "The sea and land"], why: "And by the Witness and by the Witnessed." },
        { q: "What is the Witness, per most scholars?", a: "Friday", wrong: ["Monday", "Ramadan", "Eid"], why: "The majority considers the Witness to be Friday, and the Witnessed to be the day of Arafah." },
        { q: "What is the Witnessed, per most scholars?", a: "The day of Arafah", wrong: ["The day of birth", "A Monday", "The night of travel"], why: "The majority considers the Witness to be Friday, and the Witnessed to be the day of Arafah." }
      ]
    },
    {
      slug: "the-special-hour-of-friday",
      title: "The special hour of Friday",
      line: "Friday has a short hour when duas are answered.",
      facts: ["Jumuah is blessed", "Make dua on Friday"],
      quote: q85(3),
      source: hadith("bukhari", "935", "Abu Hurairah", "Sahih", "The Prophet ﷺ said there is an hour on Friday when a Muslim praying who asks Allah for something will be given it, and he showed it is short.", "then Allah will definitely meet his demand"),
      difficulty: 2,
      questions: [
        { q: "What is special about Friday, per the hadith?", a: "An hour when duas are answered", wrong: ["No one works", "The sun is brighter", "It has no night"], why: "There is an hour on Friday; a Muslim who asks Allah for something then will be given it." },
        { q: "How long is the hour?", a: "Short", wrong: ["The whole day", "Three hours", "A week"], why: "He showed with his hand how short it is." },
        { tf: true, q: "Making dua on Friday is a good habit.", why: "If a Muslim gets it while praying and asks something from Allah, then Allah will definitely meet his demand." }
      ]
    },
    {
      slug: "the-people-of-the-ditch",
      title: "The people of the ditch",
      line: "Cruel people dug a fiery ditch to make believers drop faith.",
      facts: ["Al-Ukhdud: the ditch", "Qutila: cursed"],
      quote: q85(4),
      source: ik(4, "Ibn Kathir says disbelievers dug ditches and lit fires to force believers to give up their faith, but they refused.", "which means ditches in the ground"),
      difficulty: 2,
      questions: [
        { q: "Who were cursed, per 85:4?", a: "The People of the Ditch", wrong: ["The people of the sea", "The people of the cave", "The traders"], why: "Cursed were the People of the Ditch." },
        { q: "What does Ukhdud mean?", a: "A ditch in the ground", wrong: ["A tower", "A river", "A tent"], why: "The plural of Ukhdud is Akhadid, which means ditches in the ground." },
        { q: "What did the believers refuse to do?", a: "Give up their faith", wrong: ["Eat food", "Pay taxes", "Sing songs"], why: "However, the believers refused to recant." }
      ]
    },
    {
      slug: "their-only-fault-was-faith",
      title: "Their only fault was faith",
      line: "The believers did nothing wrong except believe in Allah.",
      facts: ["Al-Aziz: the Almighty", "Al-Hamid: worthy of praise"],
      quote: q85(8),
      source: ik(8, "Ibn Kathir says, in the eyes of their enemies, the only sin of the believers was their faith in Allah.", "they did not commit any sin according to these people, except for their faith in Allah"),
      difficulty: 2,
      questions: [
        { q: "What was their only fault, per 85:8?", a: "That they believed in Allah", wrong: ["That they stole", "That they lied", "That they were lazy"], why: "And they had no fault except that they believed in Allah, the Almighty, Worthy of all praise!" },
        { q: "Who watched what was done, per 85:7?", a: "The people sitting by the ditch", wrong: ["No one", "Only the angels", "Travellers far away"], why: "And they witnessed what they were doing against the believers." },
        { tf: true, q: "Allah is the Almighty and worthy of all praise.", why: "He is the Most Mighty and Most Praiseworthy in all of His statements, actions, legislation, and decrees." }
      ]
    },
    {
      slug: "allah-witnesses-everything",
      title: "Allah witnesses everything",
      line: "Everything belongs to Allah, and nothing is hidden from Him.",
      facts: ["Shahid: Witness", "Allah owns all"],
      quote: q85(9),
      source: ik(9, "Ibn Kathir says Allah owns the heavens and earth, and nothing in them is concealed from Him.", "nothing is concealed from Him"),
      difficulty: 2,
      questions: [
        { q: "To whom does the dominion belong, per 85:9?", a: "To Allah", wrong: ["To the king", "To the rich", "To no one"], why: "To Whom belongs the dominion of the heavens and the earth!" },
        { q: "Over what is Allah a Witness, per 85:9?", a: "Everything", wrong: ["Only the sky", "Only the good", "Only the past"], why: "And Allah is Witness over everything." },
        { tf: false, q: "The cruelty of the ditch was hidden from Allah.", why: "Nothing is concealed from Him in all of the heavens and the earth." }
      ]
    },
    {
      slug: "the-boy-and-the-monk",
      title: "The boy and the monk",
      line: "A boy learned faith from a monk and taught: only Allah cures.",
      facts: ["Only Allah heals", "Faith over magic"],
      quote: q85(4),
      source: ik(4, "Muslim and Ahmad record that a boy sent to learn magic learned faith from a monk, and told people only Allah cures.", "it is only Allah who cures people"),
      difficulty: 3,
      questions: [
        { q: "What was the boy first sent to learn?", a: "Magic from a sorcerer", wrong: ["Farming", "Sailing", "Trading"], why: "Please send me a boy whom I can teach magic." },
        { q: "What did the boy tell the blind man?", a: "Only Allah cures", wrong: ["I cure everyone", "The king cures", "Gifts cure"], why: "I do not cure anybody; it is only Allah who cures people." },
        { tf: true, q: "The blind man believed in Allah and was cured.", why: "So, he believed in and supplicated to Allah, and Allah cured him." }
      ]
    },
    {
      slug: "the-lord-of-the-boy",
      title: "We believe in the Lord of the boy",
      line: "The boy stayed firm, and in the end all the people believed.",
      facts: ["Steadfastness wins hearts", "Allah saved him twice"],
      quote: q85(4),
      source: ik(4, "In the hadith, Allah saved the boy from the mountain and the sea; when the boy gave his life, the people declared their faith.", "We believe in the Lord of the boy"),
      difficulty: 3,
      questions: [
        { q: "What did the boy say each time he was saved?", a: "Allah saved me from them", wrong: ["I escaped alone", "The king let me go", "My friends hid me"], why: "The boy said, Allah saved me from them." },
        { q: "What did the people say at the end?", a: "We believe in the Lord of the boy", wrong: ["We follow the king", "We are afraid", "We will leave"], why: "The people proclaimed, We believe in the Lord of the boy!" },
        { q: "What did the baby tell his mother?", a: "Be patient, you are on the truth", wrong: ["Run away", "Give up", "Go home"], why: "Be patient mother! For verily, you are following the truth!" }
      ]
    },
    {
      slug: "the-door-of-repentance",
      title: "If they do not repent",
      line: "Those who harmed believers are warned, unless they repent.",
      facts: ["Fatanu: tried, harmed", "Tawbah is always open"],
      quote: q85(10),
      source: ik(10, "Ibn Kathir says the warning is for those who do not stop and do not regret what they did.", "and do not regret what they had done before"),
      difficulty: 3,
      questions: [
        { q: "Whom does 85:10 warn?", a: "Those who harmed believing men and women", wrong: ["Those who prayed", "Those who travelled", "Those who fasted"], why: "Verily, those who put into trial the believing men and believing women." },
        { q: "What condition does 85:10 give?", a: "And then do not turn in repentance", wrong: ["And then grow rich", "And then move away", "And then sleep"], why: "And then do not turn in repentance, then they will have the torment of Hell." },
        { tf: true, q: "Even great wrongdoers are called to repent.", why: "They do not cease from what they are doing, and do not regret what they had done before." }
      ]
    }
  ]
};

/** Ayahs 11 to 22: the great success, the names of Allah, the end of Fir'awn and Thamud, and the Quran on the Preserved Tablet. */
const BURUJ_TWO: DeepUnit = {
  key: "buruj2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-85",
  name: "Al-Buruj, ayahs 11-22",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Buruj",
  lessons: [
    {
      slug: "the-supreme-success",
      title: "The supreme success",
      line: "Believers who do good get gardens: the great success.",
      facts: ["Al-Fawz al-Kabir: the great success", "Faith and good deeds"],
      quote: q85(11),
      source: ik(11, "Ibn Kathir says Allah tells of the gardens prepared for His believing servants, the opposite of the Fire.", "Allah informs about His believing servants that"),
      difficulty: 1,
      questions: [
        { q: "What will believers who do good get, per 85:11?", a: "Gardens under which rivers flow", wrong: ["Gold coins", "Big houses on earth", "Nothing"], why: "For them will be Gardens under which rivers flow." },
        { q: "What does 85:11 call it?", a: "The supreme success", wrong: ["A small prize", "A test", "A dream"], why: "That is the supreme success." },
        { tf: true, q: "The gardens are the opposite of what is prepared for Allah's enemies.", why: "This is the opposite of what he has prepared for His enemies of Fire and Hell." }
      ]
    },
    {
      slug: "the-grip-of-your-lord",
      title: "The grip of your Lord",
      line: "Allah's punishment of the wrongdoers is severe and swift.",
      facts: ["Batsh: seizing", "Allah is Most Strong"],
      quote: q85(12),
      source: ik(12, "Ibn Kathir says whatever Allah wants happens, in the blink of an eye or even faster.", "in the matter of a blinking of an eye, or even swifter"),
      difficulty: 2,
      questions: [
        { q: "How is the punishment of your Lord, per 85:12?", a: "Severe and painful", wrong: ["Light", "Slow", "Unreal"], why: "Verily, the punishment of your Lord is severe and painful." },
        { q: "How fast does Allah's will happen, per Ibn Kathir?", a: "In a blink of an eye or faster", wrong: ["After years", "Never", "Only at night"], why: "In the matter of a blinking of an eye, or even swifter." },
        { tf: false, q: "Allah needs help to do what He wants.", why: "He is the One that whatever He wants, then it will be however He wants it to be." }
      ]
    },
    {
      slug: "he-begins-and-repeats",
      title: "He begins and repeats",
      line: "Allah began creation and will bring it back just as easily.",
      facts: ["Yubdi: begins", "Yu'id: repeats"],
      quote: q85(13),
      source: ik(13, "Ibn Kathir says from His power Allah begins creation and repeats it, without anyone resisting.", "He begins the creation, and He repeats it just as He began it"),
      difficulty: 2,
      questions: [
        { q: "What does Allah do, per 85:13?", a: "Begins and repeats", wrong: ["Forgets and leaves", "Sleeps and wakes", "Waits and hopes"], why: "Verily, He it is Who begins and repeats." },
        { q: "What does Allah repeat, per Ibn Kathir?", a: "The creation", wrong: ["Mistakes", "The weather only", "Nothing"], why: "He begins the creation, and He repeats it just as He began it." },
        { tf: true, q: "Bringing us back to life is easy for Allah.", why: "He repeats it just as He began it, without opposition or resistance." }
      ]
    },
    {
      slug: "the-forgiving-the-loving",
      title: "The Forgiving, the Loving",
      line: "Allah forgives whoever repents, and He is Al-Wadud, the Loving.",
      facts: ["Al-Ghafur: Oft-Forgiving", "Al-Wadud: the Loving"],
      quote: q85(14),
      source: ik(14, "Ibn Kathir says Allah forgives any sin of one who repents; Ibn Abbas said Al-Wadud means the Loving.", "It means Al-Habib"),
      difficulty: 2,
      questions: [
        { q: "Which two names are in 85:14?", a: "Oft-Forgiving and Al-Wadud", wrong: ["The King and the Holy", "The First and the Last", "The Strong and the Rich"], why: "And He is Oft-Forgiving, Al-Wadud." },
        { q: "What does Al-Wadud mean, per Ibn Abbas?", a: "The Loving", wrong: ["The Distant", "The Silent", "The Angry"], why: "Ibn Abbas and others have said about the name Al-Wadud, It means Al-Habib, the Loving." },
        { q: "Whose sins does Allah forgive, per Ibn Kathir?", a: "Whoever repents, whatever the sin", wrong: ["Only small sins", "No one", "Only the rich"], why: "He forgives the sin of whoever repents to Him, no matter what the sin may be." }
      ]
    },
    {
      slug: "forgiven-and-loved",
      title: "Forgiven and loved",
      line: "When sinners repent, Allah forgives them and loves them too.",
      facts: ["As-Sa'di explains", "Al-Ghafur with Al-Wadud"],
      quote: q85(14),
      source: saadi(85, 14, "As-Sa'di says Allah put the Loving next to the Forgiving to show that when sinners turn back to Him, He forgives their sins and loves them as well.", "إذا تابوا إلى الله وأنابوا، غفر لهم ذنوبهم وأحبهم"),
      difficulty: 2,
      questions: [
        { q: "Why is Al-Wadud paired with Al-Ghafur in Al-Buruj?", a: "Repenters are forgiven and loved", wrong: ["Sins are never forgiven", "Love ends after a sin", "Only angels are loved"], why: "He forgives their sins and loves them, says as-Sa'di." },
        { q: "Al-Wadud means...?", a: "The Loving", wrong: ["The Mighty", "The First", "The Judge"], why: "He loves His friends and they love Him." },
        { tf: false, q: "After a sin, Allah forgives but never loves the person again.", why: "As-Sa'di calls that a mistake. As-Sa'di on 85:14." }
      ]
    },
    {
      slug: "owner-of-the-glorious-throne",
      title: "Owner of the Throne",
      line: "Allah owns the mighty Throne above all creation; He is Al-Majid.",
      facts: ["Al-Arsh: the Throne", "Al-Majid: the Glorious"],
      quote: q85(15),
      source: ik(15, "Ibn Kathir says Al-Majid is read two ways, describing Allah or the Throne, and both meanings are correct.", "both meanings are correct"),
      difficulty: 3,
      questions: [
        { q: "What does Allah own, per 85:15?", a: "The Throne", wrong: ["Only the earth", "Only the sea", "Nothing"], why: "Owner of the Throne, Al-Majid, the Glorious." },
        { q: "Where is the Throne, per Ibn Kathir?", a: "Above all of the creation", wrong: ["Under the sea", "In a city", "On a mountain"], why: "The Owner of the Mighty Throne that is above all of the creation." },
        { tf: true, q: "Al-Majid can describe Allah or His Throne, and both are correct.", why: "Nevertheless, both meanings are correct." }
      ]
    },
    {
      slug: "he-does-what-he-wills",
      title: "He does what He wills",
      line: "Allah does whatever He wants; no one can overturn it.",
      facts: ["Fa'al: always doing", "Trust Allah's plan"],
      quote: q85(16),
      source: ik(16, "Ibn Kathir says Allah does whatever He wants; when ill, Abu Bakr said his Doctor said: I do whatever I intend.", "whatever He wants He does it"),
      difficulty: 3,
      questions: [
        { q: "How does 85:16 describe Allah?", a: "Doer of what He intends", wrong: ["Doer of nothing", "Waiting for help", "Unsure"], why: "Doer of what He intends." },
        { q: "Who can counter His ruling, per Ibn Kathir?", a: "No one", wrong: ["The angels", "The kings", "The scholars"], why: "There is no one who can counter His ruling." },
        { q: "Whom did Abu Bakr mean by his doctor?", a: "Allah", wrong: ["A healer from Yemen", "His son", "A neighbour"], why: "He said, I am the Doer of whatever I intend." }
      ]
    },
    {
      slug: "no-helper-needed",
      title: "No helper needed",
      line: "Our wishes need help and can be blocked; Allah's never are.",
      facts: ["As-Sa'di explains", "Only Allah does all He wills"],
      quote: q85(16),
      source: saadi(85, 16, "As-Sa'di says creatures' wishes always need helpers and meet things that block them, but Allah's will needs no helper and nothing can stop it.", "والله لا معاون لإرادته، ولا ممانع له مما أراد"),
      difficulty: 2,
      questions: [
        { q: "What do our wishes always need?", a: "Helpers, and no blocks", wrong: ["Nothing at all", "Only time", "Only money"], why: "A creature's will needs a helper and meets obstacles, says as-Sa'di." },
        { q: "What can stop Allah's will?", a: "Nothing", wrong: ["Kings", "Angels", "Time"], why: "No helper is needed and no one can block it." },
        { tf: true, q: "Only Allah does whatever He wills.", why: "As-Sa'di on 85:16." }
      ]
    },
    {
      slug: "firawn-and-thamud",
      title: "Fir'awn and Thamud",
      line: "Allah reminds us how strong armies like Fir'awn and Thamud fell.",
      facts: ["Al-Junud: the armies", "No power beats Allah"],
      quote: q85(18),
      source: ik(17, "Ibn Kathir asks: has the news reached you of what befell them, a punishment no one could stop?", "has the news reached you of what Allah caused to befall them"),
      difficulty: 2,
      questions: [
        { q: "Whose story does 85:17-18 mention?", a: "Fir'awn and Thamud", wrong: ["Ad and Iram only", "The people of the cave", "The people of Saba"], why: "Has the story reached you of the hosts, of Fir'awn and Thamud?" },
        { q: "What do the disbelievers do, per 85:19?", a: "Persist in denying", wrong: ["Believe at once", "Repent", "Stay silent"], why: "Nay! The disbelievers persisted in denying." },
        { tf: false, q: "Someone was able to stop the punishment of Fir'awn and Thamud.", why: "He sent down upon them the punishment that no one was able to ward off from them." }
      ]
    },
    {
      slug: "allah-surrounds-them",
      title: "Allah surrounds them",
      line: "No one can escape Allah; He surrounds them from every side.",
      facts: ["Muhit: encompassing", "No escape from Allah"],
      quote: q85(20),
      source: ik(20, "Ibn Kathir says Allah has power over them and they cannot escape or evade Him.", "They cannot escape Him or evade Him"),
      difficulty: 2,
      questions: [
        { q: "How does Allah hold them, per 85:20?", a: "He encompasses them from behind", wrong: ["He forgets them", "He is far away", "He ignores them"], why: "And Allah encompasses them from behind!" },
        { q: "Can they escape Him, per Ibn Kathir?", a: "No, they cannot", wrong: ["Yes, by running", "Yes, at night", "Yes, by hiding"], why: "They cannot escape Him or evade Him." },
        { tf: true, q: "Allah has full power over every person.", why: "He has power over them, and is able to compel them." }
      ]
    },
    {
      slug: "a-glorious-quran",
      title: "A Glorious Quran",
      line: "The Quran is glorious, noble and full of honour.",
      facts: ["Majid: glorious", "Honour the Quran"],
      quote: q85(21),
      source: ik(21, "Ibn Kathir says glorious here means magnificent and noble.", "magnificent and noble"),
      difficulty: 1,
      questions: [
        { q: "How is the Quran described in 85:21?", a: "Glorious", wrong: ["Old tales", "Poetry", "Magic"], why: "Nay! This is a Glorious Quran." },
        { q: "What does glorious mean, per Ibn Kathir?", a: "Magnificent and noble", wrong: ["Short and easy", "Hidden", "New"], why: "Meaning, magnificent and noble." },
        { tf: false, q: "The Quran is ordinary speech.", why: "Nay! This is a Glorious Quran, magnificent and noble." }
      ]
    },
    {
      slug: "the-preserved-tablet",
      title: "The Preserved Tablet",
      line: "The Quran is kept in the Preserved Tablet, safe from any change.",
      facts: ["Al-Lawh al-Mahfuz: the Preserved Tablet", "The Quran never changes"],
      quote: q85(22),
      source: ik(22, "Ibn Kathir says the Quran is in the highest gathering, guarded from any increase, decrease or change.", "guarded from any increase, decrease, distortion, or change"),
      difficulty: 2,
      questions: [
        { q: "Where is the Quran kept, per 85:22?", a: "In Al-Lawh Al-Mahfuz", wrong: ["In a cave", "In a palace", "In the sea"], why: "In Al-Lawh Al-Mahfuz!" },
        { q: "What is it guarded from, per Ibn Kathir?", a: "Any increase, decrease or change", wrong: ["Only rain", "Only fire", "Nothing"], why: "Guarded from any increase, decrease, distortion, or change." },
        { tf: true, q: "No one can change a letter of the Quran.", why: "Guarded from any increase, decrease, distortion, or change." }
      ]
    }
  ]
};

export const BURUJ_UNITS: readonly DeepUnit[] = [BURUJ_ONE, BURUJ_TWO];
