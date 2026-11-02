import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Hadid ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Hadid 57:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_57_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Hadid 57:${ayah}`,
    url: `https://quran.com/57:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 57:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q57 = (ayah: number) => quranQuote(57, ayah);

/** Ayahs 1 to 6: all things glorify Allah, His names the First and the Last, and His knowledge of everything. */
const HADID_ONE: DeepUnit = {
  key: "hadid1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-57",
  name: "Al-Hadid, ayahs 1 to 6",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hadid",
  lessons: [
    {
      slug: "everything-glorifies-allah",
      title: "Everything glorifies Allah",
      line: "All that is in the heavens and the earth glorifies Allah.",
      facts: ["Creatures and plants praise Allah", "The surah opens with this praise"],
      quote: q57(1),
      source: ik(1, "Ibn Kathir says everything that exists in the heavens and earth praises and glorifies Allah, including creatures and plants.", "everything that exists in the heavens and earth praises and glorifies Him, including creatures and plants"),
      difficulty: 1,
      questions: [
        { q: "What glorifies Allah, in 57:1?", a: "Whatever is in heavens and earth", wrong: ["Only the angels", "Only the people", "Only the mountains"], why: "Whatever is in the heavens and the earth glorifies Allah." },
        { q: "Do plants glorify Allah too?", a: "Yes, plants praise Him too", wrong: ["No, only people", "Only on Fridays", "Only in Makkah"], why: "Everything that exists in the heavens and earth praises and glorifies Him, including creatures and plants." },
        { tf: true, q: "Al-Hadid begins with the glorification of Allah.", why: "Whatever is in the heavens and the earth glorifies Allah." }
      ]
    },
    {
      slug: "praise-we-cannot-hear",
      title: "Praise we cannot hear",
      line: "All things praise Allah, but we do not understand how.",
      facts: ["Surah 17:44 says the same", "Allah is Forbearing and Forgiving"],
      quote: q57(1),
      source: ik(1, "Ibn Kathir links this to 17:44: there is not a thing but glorifies His praise, but you understand not their glorification.", "there is not a thing but glorifies His praise. But you understand not their glorification"),
      difficulty: 2,
      questions: [
        { q: "Can we understand how all things praise Allah?", a: "No, we do not understand it", wrong: ["Yes, always", "Only scientists can", "Only at night"], why: "But you understand not their glorification. (17:44)" },
        { q: "Which ayah also says all things praise Allah?", a: "17:44", wrong: ["2:255", "112:1", "1:1"], why: "There is not a thing but glorifies His praise. (17:44)" },
        { tf: false, q: "A thing must speak our language to praise Allah.", why: "There is not a thing but glorifies His praise. But you understand not their glorification." }
      ]
    },
    {
      slug: "al-aziz-the-almighty",
      title: "Al-Aziz, the Almighty",
      line: "Allah is the Almighty, and all things submit to Him.",
      facts: ["Al-Aziz means the Almighty", "Every created thing submits to Him"],
      quote: q57(1),
      source: ik(1, "Ibn Kathir explains the Almighty as the One to Whom all things submit in humility.", "the One to Whom all things submit humility"),
      difficulty: 2,
      questions: [
        { q: "What does Almighty mean, per Ibn Kathir?", a: "All things submit to Him", wrong: ["He is very old", "He is far away", "He needs helpers"], why: "The One to Whom all things submit humility." },
        { q: "Which two names end 57:1?", a: "Almighty, All-Wise", wrong: ["First, Last", "Hearing, Seeing", "Rich, Praised"], why: "And He is the Almighty, All-Wise." },
        { tf: true, q: "Nothing in creation can refuse Allah's power.", why: "The One to Whom all things submit humility." }
      ]
    },
    {
      slug: "al-hakim-the-all-wise",
      title: "Al-Hakim, the All-Wise",
      line: "Allah is wise in what He creates, commands and makes law.",
      facts: ["His creation is full of wisdom", "His commands are full of wisdom too"],
      quote: q57(1),
      source: ik(1, "Ibn Kathir says Allah is All-Wise in His creating, commanding and legislating.", "in His creating, commanding and legislating"),
      difficulty: 2,
      questions: [
        { q: "In what three things is Allah All-Wise?", a: "Creating, commanding, legislating", wrong: ["Eating, drinking, sleeping", "Buying, selling, trading", "Only in creating"], why: "All-Wise in His creating, commanding and legislating." },
        { q: "What should we believe about Allah's commands?", a: "They are full of wisdom", wrong: ["They are random", "They are too hard", "They are only for old times"], why: "All-Wise in His creating, commanding and legislating." },
        { tf: true, q: "Allah's laws come from His wisdom.", why: "All-Wise in His creating, commanding and legislating." }
      ]
    },
    {
      slug: "the-whole-kingdom-is-his",
      title: "The whole kingdom is His",
      line: "Allah owns everything, and He gives life and death.",
      facts: ["He is the true Owner of all creation", "Only He gives life and causes death"],
      quote: q57(2),
      source: ik(2, "Ibn Kathir says Allah is the absolute Owner of His creation, bringing life and death and granting what He wills to whom He wills.", "He is the absolute Owner of His creation, bringing life and death"),
      difficulty: 1,
      questions: [
        { q: "Whose is the kingdom of heavens and earth?", a: "Allah's alone", wrong: ["The kings'", "The angels'", "Nobody's"], why: "His is the kingdom of the heavens and the earth." },
        { q: "Who gives life and causes death, in 57:2?", a: "Allah", wrong: ["Doctors", "The stars", "Luck"], why: "It is He Who gives life and causes death." },
        { q: "What does Ibn Kathir call Allah in 57:2?", a: "Absolute Owner of creation", wrong: ["A helper of kings", "One of many owners", "A distant watcher"], why: "He is the absolute Owner of His creation." }
      ]
    },
    {
      slug: "whatever-he-wills-is",
      title: "Whatever He wills, is",
      line: "What Allah wills happens, and what He does not will never does.",
      facts: ["Allah is Able to do all things", "Nothing happens against His will"],
      quote: q57(2),
      source: ik(2, "Ibn Kathir says whatever Allah wills is, and whatever He does not will, will never be.", "whatever He wills, is, and whatever He does not will, will never be"),
      difficulty: 2,
      questions: [
        { q: "What happens to what Allah does not will?", a: "It will never be", wrong: ["It happens later", "It happens half", "People make it happen"], why: "Whatever He does not will, will never be." },
        { q: "How does 57:2 end?", a: "He is Able to do all things", wrong: ["He is far away", "He needs time", "He is tired"], why: "And He is Able to do all things." },
        { tf: false, q: "Something can happen even if Allah does not will it.", why: "Whatever He wills, is, and whatever He does not will, will never be." }
      ]
    },
    {
      slug: "the-first-and-the-last",
      title: "The First and the Last",
      line: "Allah is the First with nothing before Him, and the Last.",
      facts: ["Al-Awwal: nothing came before Him", "Al-Akhir: nothing comes after Him"],
      quote: q57(3),
      source: hadith("muslim", "2713", "Abu Hurayrah", "Sahih", "In a bedtime dua the Prophet ﷺ taught: O Allah, You are the First and there is nothing before You, and You are the Last and there is nothing after You.", "Thou art the First, there is naught before Thee, and Thou art the Last and there is naught after Thee"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Awwal mean, per the dua?", a: "The First, nothing before Him", wrong: ["The strongest", "The richest", "The nearest"], why: "Thou art the First, there is naught before Thee." },
        { q: "What does Al-Akhir mean, per the dua?", a: "The Last, nothing after Him", wrong: ["The latest prophet", "The final day", "The last king"], why: "Thou art the Last and there is naught after Thee." },
        { tf: true, q: "Allah had no beginning and has no end.", why: "Thou art the First, there is naught before Thee, and Thou art the Last and there is naught after Thee." }
      ]
    },
    {
      slug: "evident-and-innermost",
      title: "The Evident, the Innermost",
      line: "Allah is Az-Zahir with nothing above Him, and Al-Batin.",
      facts: ["Az-Zahir: nothing is above Him", "Al-Batin: nothing is beyond Him"],
      quote: q57(3),
      source: hadith("muslim", "2713", "Abu Hurayrah", "Sahih", "The same dua says: You are the Evident and there is nothing above You, and You are the Innermost and there is nothing beyond You.", "Thou art Evident and there is nothing above Thee, and Thou art Innermost and there is nothing beyond Thee"),
      difficulty: 3,
      questions: [
        { q: "What does the dua say about Az-Zahir?", a: "Nothing is above Him", wrong: ["Nothing is beside Him", "He is hidden only", "He is seen by all"], why: "Thou art Evident and there is nothing above Thee." },
        { q: "What does the dua say about Al-Batin?", a: "Nothing is beyond Him", wrong: ["He is under the earth", "He is unknown", "He is small"], why: "Thou art Innermost and there is nothing beyond Thee." },
        { q: "How many names of Allah are in 57:3?", a: "Four", wrong: ["Two", "Seven", "Ninety-nine"], why: "He is Al-Awwal and Al-Akhir, Az-Zahir and Al-Batin." }
      ]
    },
    {
      slug: "a-dua-before-sleep",
      title: "A dua before sleep",
      line: "The Prophet ﷺ taught this dua for when we lie down to sleep.",
      facts: ["Lie down on the right side", "Ask Allah to remove debt and need"],
      quote: q57(3),
      source: hadith("muslim", "2713", "Abu Hurayrah", "Sahih", "The dua with the four names is said when going to sleep, lying on the right side, and it ends asking Allah to remove the burden of debt and relieve us from want.", "he should lie on the bed on his right side…Remove the burden of debt from us and relieve us from want"),
      difficulty: 2,
      questions: [
        { q: "On which side do we lie for this dua?", a: "The right side", wrong: ["The left side", "On the back", "Any side, standing"], why: "He should lie on the bed on his right side." },
        { q: "What does the dua ask at the end?", a: "Remove debt and need", wrong: ["A big house", "Fame", "A long trip"], why: "Remove the burden of debt from us and relieve us from want." },
        { tf: true, q: "The names in 57:3 are part of a bedtime dua.", why: "When any one of you intends to go to sleep... O Allah, Thou art the First." }
      ]
    },
    {
      slug: "a-cure-for-doubts",
      title: "A cure for doubts",
      line: "Ibn Abbas told a worried man to recite 57:3.",
      facts: ["Everyone may feel whispers of doubt", "Recite: He is the First and the Last"],
      quote: q57(3),
      source: ik(3, "Ibn Kathir reports that Ibn Abbas told Abu Zamil, who felt doubts in his heart, to recite 57:3 whenever he felt that.", "When you feel any of this in your heart, recite"),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Abbas advise for doubts?", a: "Recite 57:3", wrong: ["Stop praying", "Ignore the Quran", "Argue loudly"], why: "When you feel any of this in your heart, recite, He is Al-Awwal and Al-Akhir." },
        { q: "How did Ibn Abbas first react to the worry?", a: "He laughed and said none escape it", wrong: ["He got angry", "He walked away", "He cried"], why: "Then laughed. Next, he said, No one can escape this." },
        { tf: true, q: "Feeling a passing doubt does not mean we are lost.", why: "No one can escape this... When you feel any of this in your heart, recite." }
      ]
    },
    {
      slug: "knower-of-everything",
      title: "Knower of everything",
      line: "57:3 ends: He is the All-Knower of everything.",
      facts: ["Nothing is hidden from Allah", "Az-Zahir and Al-Batin both show His knowledge"],
      quote: q57(3),
      source: ik(3, "Ibn Kathir quotes Yahya: Az-Zahir means knowing all things, and Al-Batin means knowing all things.", "Az-Zahir: knowing all things, Al-Batin: knowing all things"),
      difficulty: 3,
      questions: [
        { q: "How does 57:3 end?", a: "He is the All-Knower of everything", wrong: ["He is the King", "He is the Judge", "He is the Rich"], why: "And He is the All-Knower of everything." },
        { q: "How did Yahya explain Az-Zahir and Al-Batin?", a: "Both mean knowing all things", wrong: ["Day and night", "Sky and sea", "Old and new"], why: "Az-Zahir: knowing all things, Al-Batin: knowing all things." },
        { tf: false, q: "Some of our secrets are hidden from Allah.", why: "And He is the All-Knower of everything." }
      ]
    },
    {
      slug: "six-days-then-the-throne",
      title: "Six Days, then the Throne",
      line: "Allah created the heavens and earth in six Days.",
      facts: ["Then He rose over the Throne", "Surah Al-A'raf speaks of it too"],
      quote: q57(4),
      source: ik(4, "Ibn Kathir says Allah created the heavens and earth and all between them in six Days, then rose over the Throne.", "created the heavens and earth, and all that is between them, in six Days and then rose over the Throne"),
      difficulty: 1,
      questions: [
        { q: "In how many Days were heavens and earth made?", a: "Six", wrong: ["One", "Seven", "Forty"], why: "Who created the heavens and the earth in six Days." },
        { q: "What did Allah do after creating them?", a: "He rose over the Throne", wrong: ["He rested", "He left them", "He slept"], why: "And then rose (Istawa) over the Throne." },
        { tf: true, q: "Allah created all that is between the heavens and earth too.", why: "The heavens and earth, and all that is between them, in six Days." }
      ]
    },
    {
      slug: "what-goes-into-the-earth",
      title: "What goes into the earth",
      line: "Allah knows every seed and raindrop that sinks into the soil.",
      facts: ["He knows every seed in the ground", "He knows every plant that grows out"],
      quote: q57(4),
      source: ik(4, "Ibn Kathir says Allah knows the amount of seeds and drops of water that enter the earth, and the plants and fruits that come out of it.", "His knowledge in the amount of seeds and drops of water that enter inside the earth…of plants, vegetation and fruits"),
      difficulty: 2,
      questions: [
        { q: "What goes into the earth, per Ibn Kathir?", a: "Seeds and drops of water", wrong: ["Only gold", "Only rocks", "Only roots"], why: "The amount of seeds and drops of water that enter inside the earth." },
        { q: "What comes forth from the earth?", a: "Plants, vegetation and fruits", wrong: ["Clouds", "Stars", "Wind"], why: "And what comes forth from it) of plants, vegetation and fruits." },
        { tf: true, q: "Allah knows the number of seeds under the ground.", why: "His knowledge in the amount of seeds and drops of water that enter inside the earth." }
      ]
    },
    {
      slug: "not-a-leaf-falls",
      title: "Not a leaf falls",
      line: "No leaf falls anywhere except that Allah knows it.",
      facts: ["Surah 6:59 explains His knowledge", "Every grain in the dark earth is known"],
      quote: q57(4),
      source: ik(4, "Ibn Kathir links this to 6:59: not a leaf falls but He knows it, and there is not a grain in the darkness of the earth but is written.", "not a leaf falls, but He knows it"),
      difficulty: 2,
      questions: [
        { q: "What does 6:59 say about falling leaves?", a: "Allah knows every one", wrong: ["Nobody knows", "Only the trees know", "Only big leaves count"], why: "Not a leaf falls, but He knows it. (6:59)" },
        { q: "Where is every grain written, per 6:59?", a: "In a Clear Record", wrong: ["On a stone", "In the clouds", "Nowhere"], why: "There is not a grain in the darkness of the earth... but is written in a Clear Record." },
        { tf: true, q: "Even a grain hidden in the dark earth is known to Allah.", why: "There is not a grain in the darkness of the earth nor anything fresh or dry, but is written in a Clear Record." }
      ]
    },
    {
      slug: "what-comes-down-from-the-sky",
      title: "What comes down from the sky",
      line: "Allah knows the rain, snow, hail and commands that come down.",
      facts: ["Rain, snow and hail come by His will", "Angels bring down His commands"],
      quote: q57(4),
      source: ik(4, "Ibn Kathir says what descends from heaven means rain, snow, hail and the decisions and commandments brought down by the honorable angels.", "pertains to rain, snow, hail…decisions and commandments brought down by the honorable angels"),
      difficulty: 2,
      questions: [
        { q: "What descends from heaven, per Ibn Kathir?", a: "Rain, snow, hail and commands", wrong: ["Only birds", "Only light", "Only dust"], why: "Pertains to rain, snow, hail and whatever Allah decides descends from heaven." },
        { q: "Who brings down Allah's commandments?", a: "The honorable angels", wrong: ["The birds", "The winds", "The kings"], why: "Decisions and commandments brought down by the honorable angels." },
        { tf: false, q: "Snow falls without Allah knowing.", why: "And what descends from the heaven... pertains to rain, snow, hail." }
      ]
    },
    {
      slug: "deeds-rise-to-him",
      title: "Deeds rise up to Him",
      line: "Our deeds of the night and day are taken up to Allah.",
      facts: ["Night deeds rise before the day", "Day deeds rise before the night"],
      quote: q57(4),
      source: hadith("muslim", "179", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said the deeds of the night are taken up to Allah before the deeds of the day, and the deeds of the day before the deeds of the night.", "The deeds in the night are taken up to Him before the deeds of the day, and the deeds of the day before the deeds of the night"),
      difficulty: 3,
      questions: [
        { q: "What ascends to heaven, per Ibn Kathir?", a: "Angels and deeds", wrong: ["Smoke and dust", "Only birds", "Only prayers in Makkah"], why: "And what ascends thereto, refers to angels and deeds." },
        { q: "When are the night deeds taken up?", a: "Before the deeds of the day", wrong: ["Once a year", "Never", "Only on Fridays"], why: "The deeds in the night are taken up to Him before the deeds of the day." },
        { tf: true, q: "Allah does not sleep, and it does not befit Him.", why: "Verily the Exalted and Mighty God does not sleep, and it does not befit Him to sleep." }
      ]
    },
    {
      slug: "with-you-wherever-you-are",
      title: "With you wherever you are",
      line: "Allah sees our deeds on land or sea, by night or day.",
      facts: ["Allah watches over us everywhere", "Home or desert, all is the same to Him"],
      quote: q57(4),
      source: ik(4, "Ibn Kathir says Allah is watching over you and witnessing your deeds wherever you may be, on land or at sea, by night or day.", "He is watching over you and witnessing your deeds wherever you may be, on land or at sea"),
      difficulty: 2,
      questions: [
        { q: "What does He is with you mean, per Ibn Kathir?", a: "He watches and witnesses our deeds", wrong: ["He sits beside us", "He is only in Makkah", "He forgets us"], why: "He is watching over you and witnessing your deeds wherever you may be." },
        { q: "Where does Allah see our deeds?", a: "Anywhere, land or sea", wrong: ["Only in the masjid", "Only in daytime", "Only at home"], why: "Wherever you may be, on land or at sea, during the night or the day." },
        { tf: true, q: "Being alone in a desert does not hide us from Allah.", why: "At home or in open areas or deserts. All of that is the same before His knowledge." }
      ]
    },
    {
      slug: "he-hears-and-sees",
      title: "He hears and sees",
      line: "Allah hears our speech and knows our secrets and words.",
      facts: ["Secret or spoken, He knows it", "Night or day, nothing is hidden"],
      quote: q57(4),
      source: ik(4, "Ibn Kathir says Allah hears your speech and sees where you are, and knows your secrets and your public statements.", "He hears your speech and sees where you are. He knows your secrets and your public statements"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know about our words?", a: "Secret and public alike", wrong: ["Only loud words", "Only Arabic words", "Only written words"], why: "He knows your secrets and your public statements." },
        { q: "What does 13:10 say about hiding speech?", a: "Hidden or open, it is the same to Him", wrong: ["Whispers are unknown", "Night hides words", "Only open words count"], why: "It is the same (to Him) whether any of you conceals his speech or declares it openly. (13:10)" },
        { tf: true, q: "57:4 ends: Allah is the All-Seer of what you do.", why: "And Allah is the All-Seer of what you do." }
      ]
    },
    {
      slug: "ihsan-worship-as-if-you-see",
      title: "Ihsan: as if you see Him",
      line: "Ihsan is to worship Allah as if you see Him.",
      facts: ["Jibril asked the Prophet ﷺ about Ihsan", "If we cannot see Him, He sees us"],
      quote: q57(4),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "When Jibril asked about Ihsan, the Prophet ﷺ said: to worship Allah as if you see Him, and if you cannot, then know that He is looking at you.", "To worship Allah as if you see Him, and if you cannot achieve this state of devotion then you must consider that He is looking at you"),
      difficulty: 3,
      questions: [
        { q: "What is Ihsan, per Bukhari 50?", a: "Worship Allah as if you see Him", wrong: ["Pray only at night", "Give all your money", "Read fast"], why: "To worship Allah as if you see Him." },
        { q: "Who asked the Prophet ﷺ about Ihsan?", a: "Jibril", wrong: ["Abu Bakr", "A king", "A merchant"], why: "Gabriel came and asked... What is Ihsan (perfection)?" },
        { q: "If we cannot reach that level, what then?", a: "Know that He is looking at us", wrong: ["Give up", "Pray less", "Hide our deeds"], why: "Then you must consider that He is looking at you." }
      ]
    },
    {
      slug: "all-matters-return-to-allah",
      title: "All matters return to Allah",
      line: "On the Day of Resurrection every matter goes back to Allah.",
      facts: ["Allah owns this life and the next", "He will judge His creation"],
      quote: q57(5),
      source: ik(5, "Ibn Kathir says all matters will be referred to Allah on the Day of Resurrection, and He will judge His creation as He wills.", "all matters will be referred to Him on the Day of Resurrection"),
      difficulty: 2,
      questions: [
        { q: "To whom do all matters return, in 57:5?", a: "To Allah", wrong: ["To the kings", "To the judges", "To no one"], why: "And to Allah return all the matters." },
        { q: "When will all matters be referred to Him?", a: "On the Day of Resurrection", wrong: ["Every Friday", "In Ramadan only", "Never"], why: "All matters will be referred to Him on the Day of Resurrection." },
        { tf: true, q: "Allah is King of this life and the Hereafter.", why: "Allah is the King and Owner of this life and the Hereafter." }
      ]
    },
    {
      slug: "never-unjust",
      title: "Never unjust",
      line: "Allah never wrongs anyone, not even by a speck of dust.",
      facts: ["He is the Most Just", "The Balances will be set up that Day"],
      quote: q57(5),
      source: ik(5, "Ibn Kathir says Allah is the Most Just, Who never falls into injustice, not even the weight of a speck of dust.", "Who never falls into injustice, not even the weight of a speck of dust"),
      difficulty: 2,
      questions: [
        { q: "How much injustice will Allah do?", a: "Not even a speck of dust", wrong: ["A little", "Only to sinners", "Only on some days"], why: "Who never falls into injustice, not even the weight of a speck of dust." },
        { q: "What will be set up that Day, per 21:47?", a: "Balances of justice", wrong: ["Thrones of gold", "Tall towers", "Markets"], why: "And We shall set up Balances of justice on the Day of Resurrection. (21:47)" },
        { tf: true, q: "Even a deed the weight of a mustard seed will be brought.", why: "And if there be the weight of a mustard seed, We will bring it. (21:47)" }
      ]
    },
    {
      slug: "good-deeds-multiplied",
      title: "Good deeds multiplied",
      line: "Allah multiplies one good deed up to ten times.",
      facts: ["One good deed can become ten", "He gives a great reward from Himself"],
      quote: q57(5),
      source: ik(5, "Ibn Kathir says if one performs even one good deed, Allah will multiply it up to ten times, and gives a great reward from Himself.", "if one performs even one good deed, Allah will multiply it up to ten times"),
      difficulty: 2,
      questions: [
        { q: "How much can one good deed grow, per Ibn Kathir?", a: "Up to ten times", wrong: ["Not at all", "Half", "Only once"], why: "If one performs even one good deed, Allah will multiply it up to ten times." },
        { q: "What does 4:40 add?", a: "He gives a great reward", wrong: ["He takes it back", "He forgets it", "He delays it forever"], why: "And gives from Him a great reward. (4:40)" },
        { tf: false, q: "Small good deeds are not worth doing.", why: "If one performs even one good deed, Allah will multiply it up to ten times." }
      ]
    },
    {
      slug: "night-into-day",
      title: "Night into day",
      line: "Allah merges night into day and day into night.",
      facts: ["Some nights are long, some short", "Sometimes night and day are equal"],
      quote: q57(6),
      source: ik(6, "Ibn Kathir says Allah alternates night and day by His wisdom: sometimes the night is longer, sometimes the day, and sometimes they are equal.", "Sometimes, He makes the night longer than the day, and sometimes the opposite. Sometimes, He makes the length of night and day equal"),
      difficulty: 1,
      questions: [
        { q: "What does Allah merge, in 57:6?", a: "Night into day, day into night", wrong: ["Sea into land", "Sun into moon", "Rain into snow"], why: "He merges night into day, and merges day into night." },
        { q: "Are night and day always the same length?", a: "No, Allah changes them", wrong: ["Yes, always equal", "Night is always longer", "Day is always longer"], why: "Sometimes, He makes the night longer than the day, and sometimes the opposite." },
        { tf: true, q: "Sometimes night and day are equal in length.", why: "Sometimes, He makes the length of night and day equal." }
      ]
    },
    {
      slug: "the-four-seasons",
      title: "The four seasons",
      line: "Allah turns winter into spring, then summer, then autumn.",
      facts: ["The seasons change by His wisdom", "Everything has a due measure"],
      quote: q57(6),
      source: ik(6, "Ibn Kathir says Allah makes the season winter, then changes it to spring, then summer then autumn, all by His wisdom.", "Sometimes, He makes the season winter, then changes it to spring, then summer then autumn"),
      difficulty: 1,
      questions: [
        { q: "Which season comes after winter, per Ibn Kathir?", a: "Spring", wrong: ["Autumn", "Summer", "Winter again"], why: "He makes the season winter, then changes it to spring." },
        { q: "Why do the seasons change?", a: "By Allah's wisdom and measure", wrong: ["By chance", "By people", "By the kings"], why: "All this He does by His wisdom and His due measure." },
        { tf: true, q: "The changing seasons are a sign of Allah's control.", why: "He does what He wills with His creatures. He alternates the night and day." }
      ]
    },
    {
      slug: "he-knows-the-hearts",
      title: "He knows the hearts",
      line: "Allah knows what is in the breasts, however hidden.",
      facts: ["Allah knows our hidden thoughts", "Clean the heart, not just the outside"],
      quote: q57(6),
      source: ik(6, "Ibn Kathir says Allah knows the secrets, no matter how concealed they are.", "He knows the secrets, no matter how concealed they are"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know fully, in 57:6?", a: "What is in the breasts", wrong: ["Only our clothes", "Only our words", "Only our names"], why: "And He has full knowledge of whatsoever is in the breasts." },
        { q: "How hidden can a secret be from Allah?", a: "No secret is hidden from Him", wrong: ["Very hidden ones", "Night secrets", "Old secrets"], why: "He knows the secrets, no matter how concealed they are." },
        { tf: true, q: "A good intention is known to Allah even if no one sees it.", why: "He has full knowledge of whatsoever is in the breasts." }
      ]
    }
  ]
};

/** Ayahs 7 to 15: believe and spend, the wealth we hold in trust, the handsome loan, and the light of the believers. */
const HADID_TWO: DeepUnit = {
  key: "hadid2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-57",
  name: "Al-Hadid, ayahs 7 to 15",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hadid",
  lessons: [
    {
      slug: "believe-and-spend",
      title: "Believe and spend",
      line: "Allah commands firm faith in Him and His Messenger.",
      facts: ["Hold on to faith and keep firm on it", "Then spend from what Allah gave you"],
      quote: q57(7),
      source: ik(7, "Ibn Kathir says Allah orders perfect faith in Him and His Messenger, and encourages spending from what He has made us trustees of.", "orders having perfect faith in Him and in His Messenger"),
      difficulty: 1,
      questions: [
        { q: "What two things does 57:7 command?", a: "Believe and spend", wrong: ["Sleep and eat", "Travel and trade", "Build and sell"], why: "Believe in Allah and His Messenger, and spend." },
        { q: "What kind of faith does Allah order?", a: "Perfect, firm faith", wrong: ["Faith for one day", "Faith only in words", "Faith only in Ramadan"], why: "Orders having perfect faith in Him and in His Messenger." },
        { tf: true, q: "Those who believe and spend get a great reward.", why: "And such of you as believe and spend, theirs will be a great reward." }
      ]
    },
    {
      slug: "wealth-is-a-trust",
      title: "Wealth is a trust",
      line: "Our wealth was with others before us and came to us.",
      facts: ["We are trustees, not true owners", "Allah lent us this wealth"],
      quote: q57(7),
      source: ik(7, "Ibn Kathir says the wealth Allah lent us was in the hands of those before us and was later transferred to us, so we spend it as He commanded.", "This wealth was in the hands of those before you and was later transferred to you"),
      difficulty: 2,
      questions: [
        { q: "What does Allah make us, in 57:7?", a: "Trustees of wealth", wrong: ["Owners forever", "Kings of the earth", "Guards of gold"], why: "Spend of that whereof He has made you trustees." },
        { q: "Where was our wealth before us?", a: "With people before us", wrong: ["In the sky", "Nowhere", "Under the sea"], why: "This wealth was in the hands of those before you and was later transferred to you." },
        { tf: true, q: "Allah lent us the wealth we have.", why: "The wealth that you – mankind – have, that He has lent you." }
      ]
    },
    {
      slug: "someone-else-will-inherit",
      title: "Someone else will inherit",
      line: "One day we will hand our wealth over to someone else.",
      facts: ["Heirs may use it well or badly", "Better to spend it well ourselves"],
      quote: q57(7),
      source: ik(7, "Ibn Kathir says trustees means we will surrender this wealth to someone else, who may obey Allah with it or disobey Him.", "will surrender this wealth to someone else"),
      difficulty: 2,
      questions: [
        { q: "What will happen to our wealth one day?", a: "We hand it to someone else", wrong: ["We take it to the grave", "It turns to gold", "It stays ours forever"], why: "You – mankind – will surrender this wealth to someone else." },
        { q: "What might heirs do with the wealth?", a: "Obey or disobey Allah with it", wrong: ["Only obey", "Nothing at all", "Only bury it"], why: "Those who will inherit from you might obey Allah with their wealth... They might disobey Allah." },
        { tf: true, q: "Spending in good ways now is wiser than leaving it all.", why: "Spend as Allah commanded you from the wealth that He entrusted to you." }
      ]
    },
    {
      slug: "my-wealth-my-wealth",
      title: "My wealth, my wealth",
      line: "People say my wealth, but little of it is truly theirs.",
      facts: ["Only what we eat, wear, or give is ours", "The rest is left for others"],
      quote: q57(7),
      source: hadith("muslim", "2958", "Abdullah ibn ash-Shikhkhir", "Sahih", "The Prophet ﷺ recited 102:1 and said the son of Adam says my wealth, my wealth, but his only share is what he ate, wore out, or gave in charity and sent forward.", "The son of Adam claims: My wealth, my wealth…is there anything as your belonging except that which you consumed, which you utilised, or which you wore"),
      difficulty: 2,
      questions: [
        { q: "What does the son of Adam claim?", a: "My wealth, my wealth", wrong: ["My family", "My house only", "My name"], why: "The son of Adam claims: My wealth, my wealth." },
        { q: "Which of these is truly ours, per the hadith?", a: "What we consumed or wore", wrong: ["What we stored", "What we hid", "What we counted"], why: "Except that which you consumed, which you utilised, or which you wore." },
        { q: "Which surah was the Prophet ﷺ reciting?", a: "At-Takathur, 102", wrong: ["Al-Fatihah, 1", "Al-Ikhlas, 112", "Yasin, 36"], why: "As he was reciting: Abundance diverts you (cii. 1)." }
      ]
    },
    {
      slug: "what-you-send-forward",
      title: "What you send forward",
      line: "Charity is wealth we send ahead to the Hereafter.",
      facts: ["Charity is sent forward for us", "Allah keeps it waiting for us"],
      quote: q57(7),
      source: hadith("muslim", "2958", "Abdullah ibn ash-Shikhkhir", "Sahih", "The Prophet ﷺ said our share includes what we gave as charity and sent forward.", "you gave as charity and sent it forward"),
      difficulty: 2,
      questions: [
        { q: "What happens to wealth given in charity?", a: "It is sent forward for us", wrong: ["It is lost", "It is wasted", "It is forgotten"], why: "Or you gave as charity and sent it forward." },
        { q: "What happens to wealth we keep and leave?", a: "We leave it to other people", wrong: ["It comes with us", "It turns to light", "It grows in the grave"], why: "Other than that, you will go away from it and leave it behind for other people." },
        { tf: true, q: "Charity is like saving for the Hereafter.", why: "Or you gave as charity and sent it forward." }
      ]
    },
    {
      slug: "what-stops-you-believing",
      title: "What stops you believing?",
      line: "The Messenger ﷺ was among them, calling them with clear proofs.",
      facts: ["The Messenger ﷺ invited them to faith", "He brought clear proofs and evidence"],
      quote: q57(8),
      source: ik(8, "Ibn Kathir says 57:8 asks what prevents you from believing while the Messenger ﷺ is among you calling you to faith with clear proofs.", "what prevents you from believing, while the Messenger ﷺ is among you calling you to faith"),
      difficulty: 2,
      questions: [
        { q: "Who was inviting them to believe, in 57:8?", a: "The Messenger ﷺ", wrong: ["A poet", "A king", "A merchant"], why: "While the Messenger ﷺ invites you to believe in your Lord." },
        { q: "What did the Messenger ﷺ bring with his call?", a: "Clear proofs and evidences", wrong: ["Gold and silver", "Armies", "Magic tricks"], why: "Bringing forward clear proofs and evidences that affirm the truth." },
        { tf: true, q: "57:8 says Allah has taken their covenant.", why: "And He has indeed taken your covenant, if you are real believers." }
      ]
    },
    {
      slug: "the-most-amazing-faith",
      title: "The most amazing faith",
      line: "The Prophet ﷺ praised people who would come after his time.",
      facts: ["They never saw him, yet believe", "They believe in written pages"],
      quote: q57(8),
      source: ik(8, "Ibn Kathir reports the Prophet ﷺ said the believers with the most amazing faith are people who come later, who find pages and believe in them.", "the believers who have the most amazing faith, are some people who will come after you; they will find pages that they will believe in"),
      difficulty: 3,
      questions: [
        { q: "Who has the most amazing faith, per the report?", a: "People who come later", wrong: ["The angels", "The kings", "The poets"], why: "Some people who will come after you; they will find pages that they will believe in." },
        { q: "Why are the angels not the answer?", a: "They are with their Lord", wrong: ["They have no faith", "They sleep", "They are far away"], why: "And what prevents them from believing when they are with their Lord?" },
        { tf: true, q: "Believing without seeing the Prophet ﷺ is very special.", why: "They will find pages that they will believe in." }
      ]
    },
    {
      slug: "from-darkness-into-light",
      title: "From darkness into light",
      line: "Allah sends clear ayat to bring people out of darkness.",
      facts: ["Darkness: ignorance and disbelief", "Light: guidance, certainty and faith"],
      quote: q57(9),
      source: ik(9, "Ibn Kathir says Allah brings people from the darkness of ignorance and disbelief to the light of guidance, certainty and faith.", "from the darkness of ignorance, disbelief and contradictory statements to the light of guidance, certainty and faith"),
      difficulty: 2,
      questions: [
        { q: "To whom does Allah send down clear ayat?", a: "To His servant, the Prophet ﷺ", wrong: ["To the kings", "To the poets", "To the stars"], why: "It is He Who sends down manifest Ayat to His servant." },
        { q: "What is the darkness, per Ibn Kathir?", a: "Ignorance and disbelief", wrong: ["The night sky", "A cave", "The sea"], why: "From the darkness of ignorance, disbelief and contradictory statements." },
        { q: "What is the light, per Ibn Kathir?", a: "Guidance, certainty and faith", wrong: ["The sun", "A lamp", "Fire"], why: "To the light of guidance, certainty and faith." }
      ]
    },
    {
      slug: "allah-is-kind-to-you",
      title: "Allah is kind to you",
      line: "Sending Books and Messengers is Allah's kindness and mercy.",
      facts: ["Allah is full of kindness", "He removes our doubts and confusion"],
      quote: q57(9),
      source: ik(9, "Ibn Kathir says Allah shows kindness by revealing the Divine Books and sending the Messengers to guide mankind, removing doubts and confusion.", "by revealing the Divine Books and sending the Messengers to guide mankind, eradicating doubts and removing confusion"),
      difficulty: 2,
      questions: [
        { q: "How does Allah show His kindness, in 57:9?", a: "By Books and Messengers", wrong: ["By hiding the truth", "By leaving us alone", "By giving only wealth"], why: "By revealing the Divine Books and sending the Messengers to guide mankind." },
        { q: "Which names of Allah end 57:9?", a: "Full of kindness, Most Merciful", wrong: ["Almighty, Wise", "First, Last", "Rich, Praised"], why: "And verily, Allah is to you full of kindness, Most Merciful." },
        { tf: true, q: "Guidance removes doubts and confusion.", why: "Eradicating doubts and removing confusion." }
      ]
    },
    {
      slug: "spend-without-fear",
      title: "Spend without fear",
      line: "Spend and do not fear being poor, for Allah owns everything.",
      facts: ["The heritage of all things is Allah's", "His treasures never run out"],
      quote: q57(10),
      source: ik(10, "Ibn Kathir says spend and do not fear poverty, because the One for Whom you spend owns the heavens and earth and their treasuries.", "spend and do not fear poverty or scarcity"),
      difficulty: 2,
      questions: [
        { q: "What should we not fear when spending?", a: "Poverty or scarcity", wrong: ["Rain", "The night", "Old age"], why: "Spend and do not fear poverty or scarcity." },
        { q: "To whom belongs the heritage of all things?", a: "To Allah", wrong: ["To the rich", "To the strongest", "To no one"], why: "And to Allah belongs the heritage of the heavens and the earth." },
        { tf: true, q: "Those who trust Allah spend without fearing want.", why: "Those who trust in and depend on Allah will spend, and they will not fear poverty." }
      ]
    },
    {
      slug: "allah-replaces-it",
      title: "Allah replaces it",
      line: "Whatever we spend for Allah, He will replace.",
      facts: ["He is the best of providers", "What is with Him lasts forever"],
      quote: q57(10),
      source: ik(10, "Ibn Kathir quotes 34:39: whatever you spend, He will replace it, and 16:96: what is with you runs out and what is with Allah remains.", "And whatsoever you spend of anything, He will replace it…whatever is with you, will be exhausted, and whatever is with Allah will remain"),
      difficulty: 2,
      questions: [
        { q: "What does 34:39 promise to those who spend?", a: "Allah will replace it", wrong: ["They will lose it", "Nothing", "Only praise"], why: "And whatsoever you spend of anything, He will replace it. (34:39)" },
        { q: "What happens to what is with Allah, per 16:96?", a: "It will remain", wrong: ["It runs out", "It is lost", "It shrinks"], why: "Whatever is with you, will be exhausted, and whatever is with Allah will remain. (16:96)" },
        { tf: false, q: "What we keep with us lasts forever.", why: "Whatever is with you, will be exhausted." }
      ]
    },
    {
      slug: "before-the-conquest",
      title: "Before the Conquest",
      line: "Those who gave and strove before the Conquest are higher.",
      facts: ["Before Makkah was opened, life was hard", "Only the righteous accepted Islam then"],
      quote: q57(10),
      source: ik(10, "Ibn Kathir says before Makkah was conquered things were difficult for Muslims and only the righteous embraced Islam, so they are higher in degree.", "Before Makkah was conquered, things were difficult for Muslims and only the righteous ones embraced Islam"),
      difficulty: 3,
      questions: [
        { q: "Which Conquest do most scholars mean?", a: "The conquest of Makkah", wrong: ["Of Rome", "Of Persia", "Of Egypt"], why: "The majority considers the Conquest... to be the conquest of Makkah." },
        { q: "What was life like for Muslims before it?", a: "Difficult", wrong: ["Very easy", "Rich and calm", "Full of rest"], why: "Before Makkah was conquered, things were difficult for Muslims." },
        { tf: true, q: "Those who spent in hard times are higher in degree.", why: "Such are higher in degree than those who spent and fought afterwards." }
      ]
    },
    {
      slug: "after-the-conquest",
      title: "After the Conquest",
      line: "After the Conquest, people entered Islam in crowds.",
      facts: ["Islam spread far and wide", "Giving in easy times is still rewarded"],
      quote: q57(10),
      source: ik(10, "Ibn Kathir says after Makkah was conquered Islam spread tremendously and people embraced the religion of Allah en masse.", "After Makkah was conquered, Islam spread tremendously throughout the known world and people embraced the religion of Allah en masse"),
      difficulty: 2,
      questions: [
        { q: "What happened after Makkah was conquered?", a: "People entered Islam in crowds", wrong: ["Islam stopped", "Everyone left", "Nothing changed"], why: "People embraced the religion of Allah en masse." },
        { q: "How far did Islam spread then?", a: "Throughout the known world", wrong: ["Only one town", "Only one house", "Nowhere"], why: "Islam spread tremendously throughout the known world." },
        { tf: false, q: "Spending after the Conquest earns no reward.", why: "But to all Allah has promised the best (reward)." }
      ]
    },
    {
      slug: "the-best-promised-to-all",
      title: "The best promised to all",
      line: "All who gave, before or after, are promised the best.",
      facts: ["Ranks differ, but all are rewarded", "Allah is All-Aware of what we do"],
      quote: q57(10),
      source: ik(10, "Ibn Kathir says those who spent before and after the conquest of Makkah all will gain a reward, though they differ in rank.", "they all will gain a reward for their good deeds"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise to all of them?", a: "The best reward", wrong: ["Nothing", "Only praise", "Only wealth"], why: "But to all Allah has promised the best (reward)." },
        { q: "Why are their ranks different?", a: "Allah knows their sincerity", wrong: ["By their wealth", "By their tribe", "By chance"], why: "By His knowledge of the intention of the former type and their perfect sincerity to Him." },
        { tf: true, q: "57:10 ends: Allah is All-Aware of what you do.", why: "And Allah is All-Aware of what you do." }
      ]
    },
    {
      slug: "gold-like-mount-uhud",
      title: "Gold like Mount Uhud",
      line: "The Companions' small charity outweighs our mountains of gold.",
      facts: ["Do not speak badly of the Companions", "Their sincerity was very great"],
      quote: q57(10),
      source: hadith("bukhari", "3673", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said do not abuse my companions, for if one of you spent gold equal to Uhud, it would not equal a Mudd or even half a Mudd spent by one of them.", "Do not abuse my companions for if any one of you spent gold equal to Uhud…it would not be equal to a Mud or even a half Mud spent by one of them"),
      difficulty: 3,
      questions: [
        { q: "How should we speak of the Companions?", a: "Never abuse them", wrong: ["Mock them", "Forget them", "Blame them"], why: "Do not abuse my companions." },
        { q: "Gold like which mountain is mentioned?", a: "Uhud", wrong: ["Sinai", "Arafat", "Hira"], why: "If any one of you spent gold equal to Uhud." },
        { q: "What small amount of theirs outweighs it?", a: "A Mudd or half a Mudd", wrong: ["A camel", "A house", "A sack of gold"], why: "It would not be equal to a Mud or even a half Mud spent by one of them." }
      ]
    },
    {
      slug: "strong-and-weak-believers",
      title: "Strong and weak believers",
      line: "The strong believer is better, yet there is good in both.",
      facts: ["Seek what benefits you", "Ask Allah for help and do not lose heart"],
      quote: q57(10),
      source: hadith("muslim", "2664", "Abu Hurairah", "Sahih", "The Prophet ﷺ said a strong believer is better and more loved by Allah than a weak believer, and there is good in everyone.", "A strong believer is better and is more lovable to Allah than a weak believer, and there is good in everyone"),
      difficulty: 2,
      questions: [
        { q: "Who is more loved by Allah, per Muslim 2664?", a: "The strong believer", wrong: ["The richest man", "The loudest man", "The tallest man"], why: "A strong believer is better and is more lovable to Allah than a weak believer." },
        { q: "Is there good in the weak believer too?", a: "Yes, there is good in both", wrong: ["No good at all", "Only if rich", "Only if old"], why: "And there is good in everyone." },
        { q: "What does the hadith say to do in trouble?", a: "Seek Allah's help, do not lose heart", wrong: ["Give up", "Blame others", "Stop praying"], why: "Seek help from Allah and do not lose heart." }
      ]
    },
    {
      slug: "abu-bakr-gave-it-all",
      title: "Abu Bakr gave it all",
      line: "Abu Bakr spent all his wealth seeking the Face of Allah.",
      facts: ["He gave willingly, not to repay a favor", "He has the best share of 57:10"],
      quote: q57(10),
      source: ik(10, "Ibn Kathir says Abu Bakr As-Siddiq has the best share in the meaning of 57:10, since he spent all his wealth seeking the Face of Allah.", "He spent all of his wealth seeking the Face of Allah"),
      difficulty: 2,
      questions: [
        { q: "How much of his wealth did Abu Bakr spend?", a: "All of it", wrong: ["Half", "A tenth", "None"], why: "He spent all of his wealth seeking the Face of Allah." },
        { q: "Why did Abu Bakr spend his wealth?", a: "Seeking the Face of Allah", wrong: ["To be famous", "To repay a debt", "To win a race"], why: "Not to repay a debt or a favor that anyone from mankind had on him." },
        { tf: true, q: "Abu Bakr gave voluntarily, not because he owed anyone.", why: "He did it voluntarily too, not to repay a debt or a favor." }
      ]
    },
    {
      slug: "a-handsome-loan",
      title: "A handsome loan",
      line: "Spending for Allah with a sincere heart is a loan to Him.",
      facts: ["Allah multiplies the loan many times", "The reward is Paradise"],
      quote: q57(11),
      source: ik(11, "Ibn Kathir says the handsome loan covers all who spend in Allah's cause with good intentions and a sincere heart.", "all those who spend in the cause of Allah with good intentions and a sincere heart"),
      difficulty: 2,
      questions: [
        { q: "What is the handsome loan, per Ibn Kathir?", a: "Sincere spending for Allah", wrong: ["Borrowing money", "Selling goods", "A bank loan"], why: "All those who spend in the cause of Allah with good intentions and a sincere heart." },
        { q: "What does Allah do with this loan?", a: "Increases it manifold", wrong: ["Keeps it the same", "Returns half", "Forgets it"], why: "Then He will increase it manifold to his credit." },
        { tf: true, q: "Umar said the loan means spending in Allah's cause.", why: "Umar bin Al-Khattab said that this Ayah refers to spending in Allah's cause." }
      ]
    },
    {
      slug: "a-garden-given-to-allah",
      title: "A garden given to Allah",
      line: "Abu Ad-Dahdah gave his garden of six hundred palms to Allah.",
      facts: ["His wife called it a successful trade", "His reward is date clusters in Paradise"],
      quote: q57(11),
      source: ik(11, "Ibn Kathir reports that when 57:11 came, Abu Ad-Dahdah gave his garden of six hundred date trees as a loan to Allah, and his wife said it was a successful trade.", "He had a garden that contained six hundred date trees…That is a successful trade"),
      difficulty: 3,
      questions: [
        { q: "How many date trees were in the garden?", a: "Six hundred", wrong: ["Six", "Sixty", "Six thousand"], why: "He had a garden that contained six hundred date trees." },
        { q: "What did his wife say about the gift?", a: "A successful trade", wrong: ["A big mistake", "A sad day", "A waste"], why: "She said, That is a successful trade, O Abu Ad-Dahdah!" },
        { tf: true, q: "His family moved out so the garden could be given.", why: "She then transferred her goods and children." }
      ]
    },
    {
      slug: "light-running-before-them",
      title: "Light running before them",
      line: "On that Day, believers have light shining ahead of them.",
      facts: ["Their light matches their deeds", "Men and women believers both have it"],
      quote: q57(12),
      source: ik(12, "Ibn Kathir quotes Ibn Masud: they will pass over the Sirat according to their deeds, with light ahead of them.", "They will pass over the Sirat according to their deeds"),
      difficulty: 2,
      questions: [
        { q: "Where is the believers' light, in 57:12?", a: "Running before them", wrong: ["Behind them", "Under them", "Nowhere"], why: "Their light running forward before them and in their right hands." },
        { q: "How will they cross the Sirat?", a: "According to their deeds", wrong: ["By their wealth", "By their family", "All at the same speed"], why: "They will pass over the Sirat according to their deeds." },
        { tf: true, q: "Believing women also have this light.", why: "The believing men and the believing women – their light running forward before them." }
      ]
    },
    {
      slug: "light-as-big-as-a-mountain",
      title: "Light as big as a mountain",
      line: "Some have light like a mountain, some like a date palm.",
      facts: ["More good deeds, more light", "The least has light like a fingertip"],
      quote: q57(12),
      source: ik(12, "Ibn Kathir quotes Ibn Masud: some will have light as large as a mountain, some as a date tree, some as a standing man, and the least as big as his index finger.", "Some of them will have a light as large as a mountain, some as a date tree"),
      difficulty: 3,
      questions: [
        { q: "What is the biggest light compared to?", a: "A mountain", wrong: ["A star", "A sea", "A city"], why: "Some of them will have a light as large as a mountain." },
        { q: "How big is the least light?", a: "Like his index finger", wrong: ["Like a tree", "Like a house", "Like the sun"], why: "The least among them has a light as big as his index finger." },
        { tf: true, q: "Light differs by the level of good deeds.", why: "With their light preceding them... according to the level of their good deeds." }
      ]
    },
    {
      slug: "perfect-our-light",
      title: "Perfect our light",
      line: "Believers will pray: O our Lord, perfect our light for us.",
      facts: ["The believers turn to Allah in dua", "They ask Him to keep their light whole"],
      quote: q57(12),
      source: ik(12, "Ibn Kathir quotes Ad-Dahhak: at the Sirat the believers will invoke Allah, O our Lord! Perfect our light for us.", "O our Lord! Perfect our light for us"),
      difficulty: 2,
      questions: [
        { q: "What dua will the believers make?", a: "Perfect our light for us", wrong: ["Give us gold", "Take us home", "Let us sleep"], why: "O our Lord! Perfect our light for us." },
        { q: "Where will they make this dua?", a: "When they reach the Sirat", wrong: ["In the market", "At sea", "On a mountain"], why: "When they arrive at the Sirat... the believers will invoke Allah." },
        { tf: true, q: "Even believers will turn to Allah in dua that Day.", why: "This is when the believers will invoke Allah, O our Lord! Perfect our light for us." }
      ]
    },
    {
      slug: "records-in-right-hands",
      title: "Records in right hands",
      line: "Ad-Dahhak said right hands means their Books of Records.",
      facts: ["The good receive records in the right hand", "Surah 17:71 says the same"],
      quote: q57(12),
      source: ik(12, "Ibn Kathir quotes Ad-Dahhak that in their right hands means their Books of Records.", "Their Books of Records"),
      difficulty: 3,
      questions: [
        { q: "What is in their right hands, per Ad-Dahhak?", a: "Their Books of Records", wrong: ["Lamps", "Keys", "Swords"], why: "Ad-Dahhak said: Their Books of Records." },
        { q: "Which ayah also mentions the record in the right hand?", a: "17:71", wrong: ["2:255", "1:5", "112:2"], why: "So whosoever is given his record in his right hand. (17:71)" },
        { tf: true, q: "Receiving the record in the right hand is good news.", why: "Glad tidings for you this Day! Gardens under which rivers flow." }
      ]
    },
    {
      slug: "glad-tidings-for-you",
      title: "Glad tidings for you",
      line: "Believers are told: good news, Gardens with flowing rivers.",
      facts: ["They will stay there forever", "That is the great success"],
      quote: q57(12),
      source: ik(12, "Ibn Kathir says it will be said to them: Receive glad tidings this Day of gardens beneath which rivers flow, to remain therein forever.", "Receive glad tidings this Day, of gardens beneath which rivers flow"),
      difficulty: 1,
      questions: [
        { q: "What flows beneath the Gardens?", a: "Rivers", wrong: ["Lava", "Sand", "Wind"], why: "Gardens beneath which rivers flow." },
        { q: "How long will they stay there?", a: "Forever", wrong: ["One year", "A hundred years", "Until they leave"], why: "You will remain therein forever." },
        { q: "What does 57:12 call this?", a: "The great success", wrong: ["A small prize", "A short rest", "A test"], why: "Truly, this is the great success!" }
      ]
    },
    {
      slug: "wait-for-us",
      title: "Wait for us!",
      line: "The hypocrites will beg the believers to share their light.",
      facts: ["Light guides the believers to Paradise", "The hypocrites lose their light"],
      quote: q57(13),
      source: ik(13, "Ibn Kathir quotes Ibn Abbas: when people gather in darkness, Allah sends light that guides the believers to Paradise, and the hypocrites lose theirs.", "When the people are gathering in darkness, Allah will send light"),
      difficulty: 2,
      questions: [
        { q: "What will the hypocrites say, in 57:13?", a: "Wait for us! Share your light!", wrong: ["Go ahead without us", "We have our own light", "We are not afraid"], why: "Wait for us! Let us get something from your light!" },
        { q: "Where does the light guide the believers?", a: "To Paradise", wrong: ["To the sea", "To a city", "Back home"], why: "This light will be their guide from Allah to Paradise." },
        { tf: false, q: "The hypocrites will keep their light to the end.", why: "Allah will extinguish the light for the hypocrites." }
      ]
    },
    {
      slug: "the-wall-with-a-gate",
      title: "The wall with a gate",
      line: "A wall separates them, with mercy on the inside.",
      facts: ["Inside the wall is Paradise", "This wall is also in 7:46"],
      quote: q57(13),
      source: ik(13, "Ibn Kathir says inside the wall is mercy, meaning Paradise and all that is in it, and links the wall to 7:46.", "meaning, Paradise and all that is in it"),
      difficulty: 2,
      questions: [
        { q: "What will be put up between them?", a: "A wall with a gate", wrong: ["A river", "A mountain", "A tent"], why: "So, a wall will be put up between them, with a gate therein." },
        { q: "What is inside the wall?", a: "Mercy, which is Paradise", wrong: ["Darkness", "A desert", "A market"], why: "Inside it will be mercy, meaning, Paradise and all that is in it." },
        { q: "Which ayah also mentions this barrier?", a: "7:46", wrong: ["2:2", "36:1", "114:1"], why: "And between them will be a (barrier) screen. (7:46)" }
      ]
    },
    {
      slug: "were-we-not-with-you",
      title: "Were we not with you?",
      line: "The hypocrites will say they prayed beside the believers.",
      facts: ["They were with them in body", "Their hearts were not sincere"],
      quote: q57(14),
      source: ik(14, "Ibn Kathir says the hypocrites will remind the believers that they attended Friday and congregational prayers with them.", "attending Friday prayers and congregational prayers"),
      difficulty: 2,
      questions: [
        { q: "What will the hypocrites call out?", a: "Were we not with you?", wrong: ["We never knew you", "Go away", "We are sorry"], why: "The hypocrites will call the believers: Were we not with you?" },
        { q: "What did the hypocrites attend, per Ibn Kathir?", a: "Friday and group prayers", wrong: ["Nothing at all", "Only markets", "Only feasts"], why: "Attending Friday prayers and congregational prayers." },
        { tf: true, q: "The believers will answer: Yes, you were with us.", why: "The believers will answer the hypocrites by saying, Yes, you were with us." }
      ]
    },
    {
      slug: "deceived-by-false-hopes",
      title: "Deceived by false hopes",
      line: "They doubted and were fooled by false hopes until death came.",
      facts: ["The deceiver is Shaytan", "Do not put off repenting"],
      quote: q57(14),
      source: ik(14, "Ibn Kathir says the deceiver is Shaytan, and quotes Qatadah: they were deceived by Ash-Shaytan.", "They were deceived by Ash-Shaytan"),
      difficulty: 3,
      questions: [
        { q: "Who is the deceiver in 57:14?", a: "Shaytan", wrong: ["A king", "A trader", "A neighbor"], why: "They were deceived by Ash-Shaytan." },
        { q: "What false hope did they have?", a: "That they would be forgiven anyway", wrong: ["That rain would come", "That they would be rich", "That they would travel"], why: "You said that you will be forgiven your sins." },
        { tf: true, q: "They stayed on that path until death came to them.", why: "You remained on this path until death came to you." }
      ]
    },
    {
      slug: "with-them-in-body-only",
      title: "With them in body only",
      line: "The hypocrites were with believers in body, not in heart.",
      facts: ["They showed off for people", "They remembered Allah only a little"],
      quote: q57(14),
      source: ik(14, "Ibn Kathir says the believers will tell them: you were with us in bodies, but you showed off for people and remembered Allah little.", "You were showing off for people and remembered Allah, little"),
      difficulty: 3,
      questions: [
        { q: "How were the hypocrites with the believers?", a: "In body, not in heart", wrong: ["In heart only", "Fully sincere", "Not at all"], why: "You were with us in bodies which were heartless and devoid of intentions." },
        { q: "Why did they do good deeds?", a: "To show off for people", wrong: ["For Allah alone", "By mistake", "For their health"], why: "You were showing off for people and remembered Allah, little." },
        { tf: true, q: "A sincere heart matters more than being seen.", why: "You were with us in bodies which were heartless and devoid of intentions." }
      ]
    },
    {
      slug: "no-ransom-that-day",
      title: "No ransom that Day",
      line: "That Day no ransom will be taken to buy anyone free.",
      facts: ["Wealth cannot save anyone then", "Now is the time to believe and do good"],
      quote: q57(15),
      source: ik(15, "Ibn Kathir says the Fire will be the final destination of those who disbelieved and doubted.", "the Fire is your final destination"),
      difficulty: 2,
      questions: [
        { q: "What will not be taken that Day?", a: "Any ransom", wrong: ["Any prayer", "Any name", "Any witness"], why: "So, this Day no ransom shall be taken from you." },
        { q: "When should we fix our faith and deeds?", a: "Now, in this life", wrong: ["After death", "On that Day", "Never"], why: "This Day no ransom shall be taken from you, nor of those who disbelieved." },
        { tf: false, q: "On that Day, people can pay to be freed.", why: "This Day no ransom shall be taken from you." }
      ]
    }
  ]
};

/** Ayahs 16 to 21: soft and humble hearts, the reward of charity, the parable of this life, and the race to forgiveness. */
const HADID_THREE: DeepUnit = {
  key: "hadid3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-57",
  name: "Al-Hadid, ayahs 16 to 21",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hadid",
  lessons: [
    {
      slug: "time-for-hearts-to-soften",
      title: "Time for hearts to soften",
      line: "Allah asks: is it not time for hearts to be humble?",
      facts: ["Hearts soften by remembering Allah", "Listening to the Quran softens them too"],
      quote: q57(16),
      source: ik(16, "Ibn Kathir explains 57:16: has not the time come for the believers to feel humility in their hearts by the remembrance of Allah and the recitation of the Quran?", "Has not the time come for the believers to feel humility in their hearts by the remembrance of Allah"),
      difficulty: 2,
      questions: [
        { q: "What should humble the believers' hearts?", a: "The remembrance of Allah", wrong: ["Loud music", "Big crowds", "Wealth"], why: "That their hearts should be humble for the remembrance of Allah." },
        { q: "What else should humble hearts, in 57:16?", a: "The truth that was revealed", wrong: ["Old poems", "Stories of kings", "The news"], why: "And that which has been revealed of the truth." },
        { tf: true, q: "Ibn Kathir calls 57:16 a lesson in Khushu, humility.", why: "Encouraging Khushu and the Prohibition of imitating the People of the Scriptures." }
      ]
    },
    {
      slug: "only-four-years",
      title: "Only four years",
      line: "Ibn Masud said 57:16 came four years after they became Muslim.",
      facts: ["Allah gently reminded the Companions", "Even good people need reminders"],
      quote: q57(16),
      source: hadith("muslim", "3027", "Abdullah ibn Mas'ud", "Sahih", "Ibn Masud said there was a gap of four years between their accepting Islam and the revelation of 57:16.", "there was a gap of four years"),
      difficulty: 3,
      questions: [
        { q: "How long after they became Muslim did 57:16 come?", a: "Four years", wrong: ["Forty years", "One day", "Ten years"], why: "There was a gap of four years." },
        { q: "Who reported this, in Muslim 3027?", a: "Ibn Masud", wrong: ["Abu Bakr", "Anas", "Aishah"], why: "Ibn Mas'ud said: Since our acceptance of Islam and the revelation of this verse." },
        { tf: true, q: "Muslim placed this report near the end of his book.", why: "This is the narration Muslim collected, just before the end of his book." }
      ]
    },
    {
      slug: "hear-and-obey",
      title: "Hear and obey",
      line: "A humble heart listens to advice, understands, and obeys.",
      facts: ["Listen to gentle advice", "Act on what the Quran teaches"],
      quote: q57(16),
      source: ik(16, "Ibn Kathir says humble hearts hear advice and the recitation, understand, abide by it, and hear and obey.", "abide by it, and hear and obey"),
      difficulty: 2,
      questions: [
        { q: "What does a humble heart do with the Quran?", a: "Understands, abides, obeys", wrong: ["Ignores it", "Only hangs it up", "Only sings it"], why: "So that they may comprehend the Qur'an, abide by it, and hear and obey." },
        { q: "What kind of advice softens hearts?", a: "Subtle, gentle advice", wrong: ["Harsh shouting", "Mocking", "Gossip"], why: "Hearing subtle advice and the recitation of the Qur'an." },
        { tf: false, q: "Hearing the Quran is enough without acting on it.", why: "So that they may comprehend the Qur'an, abide by it, and hear and obey." }
      ]
    },
    {
      slug: "do-not-be-like-them",
      title: "Do not be like them",
      line: "Believers are told not to copy those given Scripture before.",
      facts: ["Their hearts grew hard over time", "Allah warns us so we stay soft"],
      quote: q57(16),
      source: ik(16, "Ibn Kathir says Allah is prohibiting the believers from imitating those who were given the Scriptures before them.", "Allah is prohibiting the believers from imitating those who were given the Scriptures before them"),
      difficulty: 2,
      questions: [
        { q: "What happened to those given Scripture before?", a: "Their hearts were hardened", wrong: ["They grew wings", "They became kings", "Nothing"], why: "And the term was prolonged for them and so their hearts were hardened." },
        { q: "What does Allah forbid the believers, in 57:16?", a: "Imitating them", wrong: ["Reading", "Praying", "Travelling"], why: "Allah is prohibiting the believers from imitating those who were given the Scriptures before them." },
        { tf: true, q: "A long time without reminders can harden hearts.", why: "And the term was prolonged for them and so their hearts were hardened." }
      ]
    },
    {
      slug: "how-hearts-grow-hard",
      title: "How hearts grow hard",
      line: "As time passed, they changed Allah's Book for a small price.",
      facts: ["They left the Book behind their backs", "Then they would not accept advice"],
      quote: q57(16),
      source: ik(16, "Ibn Kathir says as time passed they changed the Book of Allah, and their hearts became hard and would not accept advice.", "As time passed, they changed the Book of Allah that they had…their hearts became hard and they would not accept advice"),
      difficulty: 3,
      questions: [
        { q: "What did they do as time passed?", a: "Changed the Book of Allah", wrong: ["Memorized it", "Taught it well", "Kept it safe"], why: "As time passed, they changed the Book of Allah that they had." },
        { q: "What is one sign of a hard heart?", a: "Not accepting advice", wrong: ["Loving the Quran", "Crying in prayer", "Giving charity"], why: "Their hearts became hard and they would not accept advice." },
        { tf: true, q: "Many of them were rebellious, says 57:16.", why: "And many of them were rebellious." }
      ]
    },
    {
      slug: "life-to-the-dead-earth",
      title: "Life to the dead earth",
      line: "As rain revives dry earth, the Quran revives hard hearts.",
      facts: ["Allah gives life to the earth after death", "The Quran is like rain for the heart"],
      quote: q57(17),
      source: ik(17, "Ibn Kathir says just as Allah brings life back to dry earth with rain, He guides hardened hearts with the proofs of the Quran.", "just as Allah brings life back to the dead and dry earth by sending the needed abundant rain, He also guides the hardened hearts"),
      difficulty: 2,
      questions: [
        { q: "What does Allah revive, in 57:17?", a: "The earth after its death", wrong: ["The ocean", "Old buildings", "The stars"], why: "Know that Allah gives life to the earth after its death!" },
        { q: "What is the Quran like for hard hearts?", a: "Rain on dry earth", wrong: ["A stone", "A storm", "A fire"], why: "Just as Allah brings life back to the dead and dry earth by sending the needed abundant rain, He also guides the hardened hearts." },
        { tf: true, q: "57:17 says Allah made the ayat clear to us.", why: "Indeed We have made clear the Ayat to you, if you but understand." }
      ]
    },
    {
      slug: "hope-for-every-heart",
      title: "Hope for every heart",
      line: "Allah can soften any heart, however hard it has become.",
      facts: ["He guides the confused", "He relieves hardships"],
      quote: q57(17),
      source: ik(17, "Ibn Kathir says Allah brings softness to hearts after they become hard, guides the confused, and relieves hardships.", "He brings subtleness to hearts after they have become hard, guides the confused after they were led astray, and relieves hardships after they have intensified"),
      difficulty: 2,
      questions: [
        { q: "Can a hard heart become soft again?", a: "Yes, Allah can soften it", wrong: ["Never", "Only for kings", "Only when young"], why: "He brings subtleness to hearts after they have become hard." },
        { q: "What else does Allah do, per Ibn Kathir?", a: "Relieves hardships", wrong: ["Forgets people", "Adds hardships", "Stays silent"], why: "And relieves hardships after they have intensified." },
        { tf: true, q: "Nobody should lose hope of becoming better.", why: "Guides the confused after they were led astray." }
      ]
    },
    {
      slug: "charity-with-a-good-heart",
      title: "Charity with a good heart",
      line: "Men and women who give charity for Allah are rewarded.",
      facts: ["They give to the needy and poor", "They seek Allah's pleasure"],
      quote: q57(18),
      source: ik(18, "Ibn Kathir says they give in charity with a good heart seeking the pleasure of Allah.", "they give in charity with a good heart seeking the pleasure of Allah"),
      difficulty: 1,
      questions: [
        { q: "Who gives Sadaqat in 57:18?", a: "Men and women", wrong: ["Only men", "Only kings", "Only the old"], why: "Verily, those who give Sadaqat, men and women." },
        { q: "How do they give, per Ibn Kathir?", a: "With a good heart for Allah", wrong: ["To show off", "With anger", "To get thanks"], why: "They give in charity with a good heart seeking the pleasure of Allah." },
        { tf: true, q: "Charity goes to the needy, the poor and the meek.", why: "On the needy, the poor and the meek." }
      ]
    },
    {
      slug: "no-thanks-wanted",
      title: "No thanks wanted",
      line: "True givers do not want thanks from the people they help.",
      facts: ["They want nothing worldly back", "Their reward is from Allah"],
      quote: q57(18),
      source: ik(18, "Ibn Kathir says they do not seek worldly rewards or appreciation from those to whom they give in charity.", "They do not seek worldly rewards or appreciation from those to whom they give in charity"),
      difficulty: 2,
      questions: [
        { q: "What do sincere givers not seek?", a: "Worldly reward or thanks", wrong: ["Allah's pleasure", "Paradise", "Forgiveness"], why: "They do not seek worldly rewards or appreciation from those to whom they give." },
        { q: "Whose pleasure do they seek?", a: "Allah's", wrong: ["The crowd's", "The rich", "Their own fame"], why: "Seeking the pleasure of Allah." },
        { tf: false, q: "A sincere giver waits to be thanked.", why: "They do not seek worldly rewards or appreciation." }
      ]
    },
    {
      slug: "multiplied-many-times",
      title: "Multiplied many times",
      line: "Charity is multiplied ten times, even seven hundred or more.",
      facts: ["From tenfold up to seven hundredfold", "An honorable reward awaits"],
      quote: q57(18),
      source: ik(18, "Ibn Kathir says Allah will multiply good deeds from tenfold up to seven hundredfold and even more than that.", "from tenfold, up to seven hundredfold and even more than that"),
      difficulty: 2,
      questions: [
        { q: "How far can charity be multiplied?", a: "Seven hundredfold or more", wrong: ["Only double", "Never", "Only tenfold"], why: "From tenfold, up to seven hundredfold and even more than that." },
        { q: "What kind of reward does 57:18 promise?", a: "An honorable good reward", wrong: ["A small gift", "Only praise", "Nothing"], why: "And theirs shall be an honorable good reward." },
        { tf: true, q: "The handsome loan is mentioned again in 57:18.", why: "And lend Allah handsome loan, it shall be increased manifold." }
      ]
    },
    {
      slug: "the-siddiqun",
      title: "The Siddiqun",
      line: "True believers in Allah and His Messengers are Siddiqun.",
      facts: ["Siddiqun means the true believers", "Siddiq is a very high rank"],
      quote: q57(19),
      source: ik(19, "Ibn Kathir says Allah describes those who believe in Him and His Messengers as Siddiqun, true believers, a rank above the martyrs.", "describing them as Siddiqun, true believers"),
      difficulty: 2,
      questions: [
        { q: "What does Siddiqun mean?", a: "True believers", wrong: ["Traders", "Travelers", "Soldiers"], why: "Describing them as Siddiqun, true believers." },
        { q: "Which ayah lists Prophets, Siddiqin, martyrs, righteous?", a: "4:69", wrong: ["1:7", "2:1", "113:1"], why: "Of the Prophets, the Siddiqin, the martyrs, and the righteous. (4:69)" },
        { tf: true, q: "Ibn Kathir says Siddiq is higher than martyr.", why: "So there is no doubt that Siddiq is a better status than the martyr." }
      ]
    },
    {
      slug: "the-lofty-mansions",
      title: "The lofty mansions",
      line: "People of Paradise see the high mansions like distant stars.",
      facts: ["Paradise has many levels", "The higher levels shine like stars"],
      quote: q57(19),
      source: hadith("bukhari", "3256", "Abu Said Al-Khudri", "Sahih", "The Prophet ﷺ said the people of Paradise will look at the dwellers of the lofty mansions as one looks at a brilliant star far away on the horizon.", "The people of Paradise will look at the dwellers of the lofty mansions"),
      difficulty: 3,
      questions: [
        { q: "What are the lofty mansions compared to?", a: "A brilliant faraway star", wrong: ["A tall tree", "A river", "A cloud"], why: "As one looks at a brilliant star far away in the East or in the West on the horizon." },
        { q: "Why are some mansions so high?", a: "Superiority in reward", wrong: ["Chance", "Age", "Wealth in this life"], why: "All that is because of their superiority over one another (in rewards)." },
        { tf: true, q: "Everyone in Paradise is happy, but levels differ.", why: "Because of their superiority over one another (in rewards)." }
      ]
    },
    {
      slug: "not-only-for-prophets",
      title: "Not only for prophets",
      line: "The high mansions are for true believers, not only prophets.",
      facts: ["The Companions thought it was only for prophets", "The Prophet ﷺ said ordinary believers too"],
      quote: q57(19),
      source: hadith("bukhari", "3256", "Abu Said Al-Khudri", "Sahih", "Asked if the mansions were only for the prophets, the Prophet ﷺ said no, they are for men who believed in Allah and believed in the Messengers.", "these are for the men who believed in Allah and also believed in the Apostles"),
      difficulty: 3,
      questions: [
        { q: "Are the lofty mansions only for prophets?", a: "No, for true believers too", wrong: ["Yes, only prophets", "Only for angels", "Only for kings"], why: "No! By Allah... these are for the men who believed in Allah and also believed in the Apostles." },
        { q: "What did the people first ask?", a: "Are they only for the prophets?", wrong: ["Where is Paradise?", "When is the Hour?", "Who is the richest?"], why: "Are these lofty mansions for the prophets which nobody else can reach?" },
        { tf: true, q: "The Prophet ﷺ swore by Allah when answering.", why: "By Allah in whose Hands my life is." }
      ]
    },
    {
      slug: "their-reward-and-their-light",
      title: "Their reward and their light",
      line: "The martyrs are with their Lord, in the gardens of Paradise.",
      facts: ["They have a generous reward", "A great light goes before them"],
      quote: q57(19),
      source: ik(19, "Ibn Kathir says the martyrs will be in the gardens of Paradise, and Allah grants them a generous reward and a tremendous light.", "a generous reward and a tremendous light that will precede before them"),
      difficulty: 2,
      questions: [
        { q: "Where are the martyrs, in 57:19?", a: "With their Lord", wrong: ["Lost", "Far from Him", "Asleep"], why: "And the martyrs with their Lord." },
        { q: "What do they receive, per Ibn Kathir?", a: "A reward and a great light", wrong: ["Only a name", "Only gold", "Nothing yet"], why: "Allah will grant them a generous reward and a tremendous light." },
        { tf: true, q: "Rewards differ by people's good deeds.", why: "The believers vary regarding the level of reward they receive, according to their good actions." }
      ]
    },
    {
      slug: "play-and-amusement",
      title: "Play and amusement",
      line: "Allah says this worldly life is only play and amusement.",
      facts: ["This life is small next to the Hereafter", "Do not let it fool you"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir says Allah degrades the significance of this life and belittles it, calling it play and amusement.", "degrades the significance of this life and belittles it"),
      difficulty: 1,
      questions: [
        { q: "What is this life called first, in 57:20?", a: "Play and amusement", wrong: ["Work and rest", "Sleep and dreams", "War and peace"], why: "The life of this world is only play and amusement." },
        { q: "What does Allah do to this life in 57:20?", a: "Shows how small it is", wrong: ["Praises it most", "Ignores it", "Calls it forever"], why: "Degrades the significance of this life and belittles it." },
        { tf: false, q: "This world matters more than the Hereafter.", why: "This life is insignificant as compared to the Hereafter." }
      ]
    },
    {
      slug: "boasting-and-rivalry",
      title: "Boasting and rivalry",
      line: "People compete in showing off, wealth and children.",
      facts: ["Pomp and boasting fill this life", "People race for more wealth and children"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir quotes the ayah: pomp and mutual boasting among you, and rivalry in respect of wealth and children.", "pomp and mutual boasting among you, and rivalry in respect of wealth and children"),
      difficulty: 2,
      questions: [
        { q: "What do people compete in, per 57:20?", a: "Wealth and children", wrong: ["Prayer only", "Patience", "Silence"], why: "And rivalry in respect of wealth and children." },
        { q: "Which ayah also lists things people love?", a: "3:14", wrong: ["2:1", "18:1", "114:6"], why: "Beautified for men is the love of things they covet... (3:14)" },
        { tf: true, q: "Boasting is one of the things 57:20 names.", why: "Pomp and mutual boasting among you." }
      ]
    },
    {
      slug: "like-rain-and-crops",
      title: "Like rain and crops",
      line: "This life is like crops that farmers admire after rain.",
      facts: ["Ghayth is rain after despair", "Fresh green crops look amazing"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir says farmers admire the vegetation that grows after rain, just as the disbelievers admire this life.", "farmers admire the vegetation that grows in the aftermath of rain"),
      difficulty: 2,
      questions: [
        { q: "What is Ghayth, per Ibn Kathir?", a: "Rain after people despaired", wrong: ["A desert wind", "A river", "Snow"], why: "Which is the rain that comes down to mankind, after they had felt despair." },
        { q: "Who admires the growth, in the parable?", a: "The farmers", wrong: ["The kings", "The birds", "The sailors"], why: "Farmers admire the vegetation that grows in the aftermath of rain." },
        { tf: true, q: "Some people admire this life the way farmers admire crops.", why: "Just as farmers admire vegetation, the disbelievers admire this life." }
      ]
    },
    {
      slug: "yellow-then-straw",
      title: "Yellow, then straw",
      line: "The green crops dry up, turn yellow, and become straw.",
      facts: ["Beauty in this life does not last", "Fresh green soon fades"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir says the vegetation soon turns yellow after being fresh and green, then becomes scattered pieces of dust.", "that vegetation soon turns yellow in color, after being fresh and green"),
      difficulty: 2,
      questions: [
        { q: "What happens to the crops, in 57:20?", a: "Yellow, then straw", wrong: ["They stay green", "They turn to gold", "They grow forever"], why: "Afterwards it dries up and you see it turning yellow; then it becomes straw." },
        { q: "What is the lesson of the drying crops?", a: "This life soon ends", wrong: ["Farm more", "Rain is bad", "Never plant"], why: "This parable indicates the near demise of this life and the imminent end of it." },
        { tf: true, q: "The green fades and becomes scattered pieces of dust.", why: "The green fades away and becomes scattered pieces of dust." }
      ]
    },
    {
      slug: "young-then-old",
      title: "Young, then old",
      line: "People too are young and strong, then grow old and weak.",
      facts: ["Strength comes after weakness", "Then weakness and grey hair return"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir says the parable is also of mankind: young and strong at first, then older, then old and feeble.", "it starts young, then matures and then turns old and feeble"),
      difficulty: 2,
      questions: [
        { q: "What else is the parable about?", a: "People growing old", wrong: ["Ships at sea", "Kings and wars", "Stars at night"], why: "This is also the parable of mankind in this life." },
        { q: "Which ayah says weakness, strength, then grey hair?", a: "30:54", wrong: ["1:2", "97:1", "55:1"], why: "Then after strength gave (you) weakness and grey hair. (30:54)" },
        { tf: true, q: "Youth is a time to use well before it passes.", why: "They are young and strong in the beginning... They then grow old and feeble." }
      ]
    },
    {
      slug: "two-things-in-the-hereafter",
      title: "Two things in the Hereafter",
      line: "The Hereafter holds punishment, or forgiveness and pleasure.",
      facts: ["Allah's forgiveness awaits the believers", "His good pleasure is the best gift"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir says the Hereafter will contain two things: either severe punishment or forgiveness from Allah and His good pleasure.", "either severe punishment or forgiveness from Allah and His good pleasure"),
      difficulty: 2,
      questions: [
        { q: "What two things are in the Hereafter?", a: "Punishment, or forgiveness and pleasure", wrong: ["Wealth and fame", "Sleep and rest", "Nothing"], why: "Either severe punishment or forgiveness from Allah and His good pleasure." },
        { q: "What should hearing the parable make us feel?", a: "Eager for the Hereafter", wrong: ["Careless", "Bored", "Angry"], why: "Be aware of the significance of the Hereafter and feel eagerness in the goodness that it contains." },
        { tf: true, q: "The Hereafter will surely come.", why: "The Hereafter is surely coming." }
      ]
    },
    {
      slug: "a-deceiving-enjoyment",
      title: "A deceiving enjoyment",
      line: "This life is an enjoyment that fools those who lean on it.",
      facts: ["Some think this is the only life", "There is a life after this one"],
      quote: q57(20),
      source: ik(20, "Ibn Kathir says this life is only a form of enjoyment that deceives those who incline to it, so they think there is no life after it.", "this life is only a form of enjoyment that deceives those who incline to it"),
      difficulty: 2,
      questions: [
        { q: "How does 57:20 end?", a: "Only a deceiving enjoyment", wrong: ["Forever and ever", "The best of all", "A lasting home"], why: "And the life of this world is only a deceiving enjoyment." },
        { q: "What might those who love this life wrongly think?", a: "That it is the only life", wrong: ["That it is short", "That Allah sees them", "That charity is good"], why: "They might think that this is the only life, no life or dwelling after it." },
        { tf: false, q: "There is no life after this one.", why: "Yet, in reality, this life is insignificant as compared to the Hereafter." }
      ]
    },
    {
      slug: "nearer-than-a-shoe-strap",
      title: "Nearer than a shoe strap",
      line: "Paradise is nearer to us than the strap of our shoe.",
      facts: ["Good deeds bring Paradise near", "Bad deeds bring the Fire near"],
      quote: q57(20),
      source: hadith("bukhari", "6488", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said Paradise is nearer to any of you than the leather strap of his shoe, and so is the Fire.", "Paradise is nearer to any of you than the Shirak"),
      difficulty: 3,
      questions: [
        { q: "What is Paradise nearer than, per Bukhari 6488?", a: "The strap of one's shoe", wrong: ["The moon", "Makkah", "The next town"], why: "Paradise is nearer to any of you than the Shirak (leather strap) of his shoe." },
        { q: "What lesson does Ibn Kathir draw?", a: "Rush to good deeds", wrong: ["Wait and see", "Stay home", "Do nothing"], why: "Allah the Exalted encouraged mankind to rush to perform acts of righteousness." },
        { tf: true, q: "A small good deed can bring us near Paradise.", why: "Paradise is nearer to any of you than the Shirak (leather strap) of his shoe." }
      ]
    },
    {
      slug: "race-to-forgiveness",
      title: "Race to forgiveness",
      line: "Allah tells us to race each other to His forgiveness.",
      facts: ["Hurry to do good deeds", "Avoid what Allah forbids"],
      quote: q57(21),
      source: ik(21, "Ibn Kathir says Allah encouraged mankind to rush to perform acts of righteousness and obedience and to avoid the prohibitions.", "encouraged mankind to rush to perform acts of righteousness and obedience and to avoid the prohibitions"),
      difficulty: 1,
      questions: [
        { q: "What does 57:21 tell us to race toward?", a: "Forgiveness from our Lord", wrong: ["Wealth", "Fame", "Power"], why: "Race with one another in hastening towards forgiveness from your Lord." },
        { q: "What should we avoid while racing?", a: "What Allah prohibits", wrong: ["Prayer", "Charity", "Kindness"], why: "To rush to perform acts of righteousness and obedience and to avoid the prohibitions." },
        { tf: true, q: "Racing others in good deeds is praised.", why: "Race with one another in hastening towards forgiveness from your Lord." }
      ]
    },
    {
      slug: "as-wide-as-heaven-and-earth",
      title: "As wide as heaven and earth",
      line: "Paradise is as wide as the heaven and the earth.",
      facts: ["Surah 3:133 says the same", "Allah prepared it for the believers"],
      quote: q57(21),
      source: ik(21, "Ibn Kathir links 57:21 to 3:133, Paradise as wide as the heavens and the earth, prepared for those who have Taqwa.", "Paradise as wide as the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "How wide is Paradise, in 57:21?", a: "As the heaven and the earth", wrong: ["As a city", "As a river", "As a garden"], why: "Paradise the width whereof is as the width of the heaven and the earth." },
        { q: "Which ayah also gives Paradise this width?", a: "3:133", wrong: ["2:286", "18:110", "99:8"], why: "And for Paradise as wide as the heavens and the earth. (3:133)" },
        { q: "For whom is it prepared, in 57:21?", a: "Believers in Allah and His Messengers", wrong: ["The rich", "The famous", "Everyone"], why: "Prepared for those who believe in Allah and His Messengers." }
      ]
    },
    {
      slug: "the-grace-of-allah",
      title: "The grace of Allah",
      line: "Paradise is Allah's grace, given to those who please Him.",
      facts: ["All of it comes from His favor", "Allah is the Owner of great bounty"],
      quote: q57(21),
      source: ik(21, "Ibn Kathir says this reward is all a part of Allah's favor, bounty and compassion.", "is all a part of His favor, bounty and compassion"),
      difficulty: 2,
      questions: [
        { q: "What is the reward part of, per Ibn Kathir?", a: "Allah's favor and bounty", wrong: ["Our money", "Our family", "Our luck"], why: "Is all a part of His favor, bounty and compassion." },
        { q: "How does 57:21 end?", a: "Allah is Owner of great bounty", wrong: ["Allah is Severe", "Allah is Near", "Allah is First"], why: "And Allah is the Owner of great bounty." },
        { tf: true, q: "Even the ability to do good is Allah's gift.", why: "This, that Allah has qualified them for, is all a part of His favor." }
      ]
    },
    {
      slug: "the-poor-who-worried",
      title: "The poor who worried",
      line: "Poor Muslims worried the rich would get all the high ranks.",
      facts: ["The rich could give charity and free slaves", "The poor wanted the same reward"],
      quote: q57(21),
      source: hadith("bukhari", "843", "Abu Hurairah", "Sahih", "Some poor people told the Prophet ﷺ the wealthy will get higher grades and permanent enjoyment, because they pray and fast like us and also give charity.", "The wealthy people will get higher grades and will have permanent enjoyment"),
      difficulty: 2,
      questions: [
        { q: "What did the poor people worry about?", a: "The rich getting higher grades", wrong: ["Losing their homes", "Bad weather", "Long prayers"], why: "The wealthy people will get higher grades and will have permanent enjoyment." },
        { q: "What could the rich do that the poor could not?", a: "Give charity and do Hajj", wrong: ["Pray", "Fast", "Make dua"], why: "They have more money by which they perform the Hajj, and Umra... and give in charity." },
        { tf: true, q: "The poor wanted to do more good deeds, not more wealth.", why: "Shall I not tell you a thing upon which if you acted you would catch up with those who have surpassed you?" }
      ]
    },
    {
      slug: "thirty-three-each",
      title: "Thirty-three each",
      line: "The Prophet ﷺ taught dhikr after every prayer to catch up.",
      facts: ["SubhanAllah, Alhamdulillah, Allahu Akbar", "Thirty-three times each after prayer"],
      quote: q57(21),
      source: hadith("bukhari", "843", "Abu Hurairah", "Sahih", "The Prophet ﷺ told them to say Subhan Allah, Alhamdulillah and Allahu Akbar thirty three times each after every prayer.", "thirty three times each after every"),
      difficulty: 2,
      questions: [
        { q: "How many times is each phrase said?", a: "Thirty-three", wrong: ["Ten", "Seven", "One hundred"], why: "Thirty three times each after every (compulsory) prayer." },
        { q: "When is this dhikr said?", a: "After every prayer", wrong: ["Only at night", "Only on Friday", "Only in Ramadan"], why: "Thirty three times each after every (compulsory) prayer." },
        { tf: true, q: "Dhikr is a deed both rich and poor can do.", why: "Shall I not tell you a thing upon which if you acted you would catch up with those who have surpassed you?" }
      ]
    }
  ]
};

/** Ayahs 22 to 29: everything is written, patience and thanks, the Scripture and the Balance, iron, and the double reward. */
const HADID_FOUR: DeepUnit = {
  key: "hadid4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-57",
  name: "Al-Hadid, ayahs 22 to 29",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Hadid",
  lessons: [
    {
      slug: "written-before-it-happens",
      title: "Written before it happens",
      line: "Every hardship is written in a Book before Allah creates it.",
      facts: ["Allah measured all things", "He did it before creating the creation"],
      quote: q57(22),
      source: ik(22, "Ibn Kathir says Allah reminds of His measuring and deciding the destiny of all things before He created the creation.", "His measuring and deciding the destiny of all things before He created the creation"),
      difficulty: 2,
      questions: [
        { q: "Where is every calamity written, in 57:22?", a: "In the Book of Decrees", wrong: ["On the walls", "In the stars", "Nowhere"], why: "But it is inscribed in the Book of Decrees before We bring it into existence." },
        { q: "When was everything measured?", a: "Before creation began", wrong: ["Yesterday", "After it happens", "Every New Year"], why: "His measuring and deciding the destiny of all things before He created the creation." },
        { tf: true, q: "Nothing happens to us that Allah did not already know.", why: "There is nothing that touches you or happens in existence, but it is inscribed." }
      ]
    },
    {
      slug: "on-earth-and-in-ourselves",
      title: "On earth and in ourselves",
      line: "Qatadah said on earth means famine, in ourselves means illness.",
      facts: ["Hard times on earth are written", "Our pains and illnesses are written too"],
      quote: q57(22),
      source: ik(22, "Ibn Kathir quotes Qatadah: on the earth refers to famine, and in yourselves refers to suffering and diseases.", "refers to famine…refers to suffering and diseases"),
      difficulty: 2,
      questions: [
        { q: "What does on the earth mean, per Qatadah?", a: "Famine", wrong: ["Gold", "Rain", "Mountains"], why: "No calamity occurs on the earth) refers to famine." },
        { q: "What does in yourselves mean, per Qatadah?", a: "Suffering and diseases", wrong: ["Our names", "Our clothes", "Our homes"], why: "Nor in yourselves) refers to suffering and diseases." },
        { tf: true, q: "Qatadah said what Allah forgives is even more.", why: "What Allah forgives is even more." }
      ]
    },
    {
      slug: "fifty-thousand-years",
      title: "Fifty thousand years",
      line: "Allah wrote all measures long before the heavens and earth.",
      facts: ["His Throne was upon the water", "Belief in Qadar is part of faith"],
      quote: q57(22),
      source: hadith("muslim", "2653", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said Allah ordained the measures of creation fifty thousand years before He created the heavens and the earth, and His Throne was upon water.", "of the creation fifty thousand years before He created the heavens and the earth, as His Throne was upon water"),
      difficulty: 3,
      questions: [
        { q: "How long before the heavens were measures written?", a: "Fifty thousand years", wrong: ["Fifty years", "One thousand years", "Seven days"], why: "Fifty thousand years before He created the heavens and the earth." },
        { q: "Where was Allah's Throne then?", a: "Upon the water", wrong: ["On a mountain", "In a cave", "On the moon"], why: "As His Throne was upon water." },
        { tf: true, q: "Abdullah ibn Amr heard this from the Prophet ﷺ himself.", why: "I heard Allah's Messenger (ﷺ) as saying." }
      ]
    },
    {
      slug: "easy-for-allah",
      title: "Easy for Allah",
      line: "Writing everything before it happens is easy for Allah.",
      facts: ["He records things exactly as they occur", "He knows even what did not happen"],
      quote: q57(22),
      source: ik(22, "Ibn Kathir says Allah knows all things before they occur, and records them exactly as they will occur, and this is easy for Him.", "He knows all things before they occur, and He records them exactly as they will occur"),
      difficulty: 3,
      questions: [
        { q: "How does 57:22 end?", a: "That is easy for Allah", wrong: ["That is hard", "That is unknown", "That is far"], why: "Verily, that is easy for Allah." },
        { q: "How exactly are things recorded?", a: "Exactly as they will occur", wrong: ["Roughly", "Only big events", "After they happen"], why: "He records them exactly as they will occur when they occur." },
        { tf: true, q: "Allah knows what would happen even for things that never did.", why: "What did not happen, and what shape and form it will take if it were to happen." }
      ]
    },
    {
      slug: "what-missed-you",
      title: "What missed you",
      line: "What is written for you will reach you, and nothing else will.",
      facts: ["This brings peace to the heart", "Do not grieve too much over a loss"],
      quote: q57(23),
      source: ik(23, "Ibn Kathir says Allah told us this so we know that what has met you would never have missed you and what has missed you would never have met you.", "what has met you would never have missed you and what has missed you would never have met you"),
      difficulty: 3,
      questions: [
        { q: "Why does Allah tell us all is written?", a: "So we do not grieve too much", wrong: ["So we stop working", "So we fear everything", "So we boast"], why: "In order that you may not grieve at the things over that you fail to get." },
        { q: "What about what missed you?", a: "It was never going to reach you", wrong: ["It may still come", "You lost it by luck", "Someone stole it"], why: "What has missed you would never have met you." },
        { tf: true, q: "Had a thing been written for you, you would have got it.", why: "Had it been destined for you, you would have achieved it." }
      ]
    },
    {
      slug: "do-not-boast",
      title: "Do not boast",
      line: "Do not boast about blessings, since they came from Allah.",
      facts: ["Our blessings are Allah's provision", "They are not proof we are better"],
      quote: q57(23),
      source: ik(23, "Ibn Kathir says do not boast before people about what Allah has favored you with, because you did not earn it by your efforts alone.", "do not boast before people about what Allah has favored you with"),
      difficulty: 2,
      questions: [
        { q: "What should we not do with Allah's blessings?", a: "Boast before people", wrong: ["Thank Allah", "Share them", "Use them well"], why: "Do not boast before people about what Allah has favored you with." },
        { q: "Why should we not boast, per Ibn Kathir?", a: "Allah destined it for us", wrong: ["It is small", "It is old", "No one cares"], why: "All this came your way because Allah destined them for you." },
        { tf: false, q: "Wealth proves a person is better than others.", why: "Do not use what Allah has granted you as a reason to boast and become arrogant with others." }
      ]
    },
    {
      slug: "joy-with-thanks",
      title: "Joy with thanks",
      line: "Ikrimah said: be happy with thanks, and sad with patience.",
      facts: ["Everyone feels happy and sad", "Thank Allah in joy, be patient in grief"],
      quote: q57(23),
      source: ik(23, "Ibn Kathir quotes Ikrimah: everyone feels happiness and grief, so make your joy with gratitude and endure your grief with patience.", "make your joy with gratitude and endure your grief with patience"),
      difficulty: 2,
      questions: [
        { q: "How should we meet joy, per Ikrimah?", a: "With gratitude", wrong: ["With pride", "With boasting", "With fear"], why: "Make your joy with gratitude." },
        { q: "How should we meet grief, per Ikrimah?", a: "With patience", wrong: ["With anger", "With complaint", "By giving up"], why: "Endure your grief with patience." },
        { tf: true, q: "Feeling happy or sad is normal for everyone.", why: "Everyone of us feels happiness and grief." }
      ]
    },
    {
      slug: "allah-dislikes-the-proud",
      title: "Allah dislikes the proud",
      line: "Allah does not like proud boasters who look down on others.",
      facts: ["Arrogance is disliked by Allah", "Humility is loved"],
      quote: q57(23),
      source: ik(23, "Ibn Kathir explains prideful boasters as one who acts arrogantly with other people.", "who acts arrogantly with other people"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah not like, in 57:23?", a: "Prideful boasters", wrong: ["The poor", "The quiet", "The patient"], why: "And Allah likes not prideful boasters." },
        { q: "What is a prideful boaster, per Ibn Kathir?", a: "One arrogant with people", wrong: ["One who prays", "One who gives", "One who smiles"], why: "Who acts arrogantly with other people." },
        { tf: true, q: "Humility is better than looking down on others.", why: "And Allah likes not prideful boasters." }
      ]
    },
    {
      slug: "misers-who-spread-it",
      title: "Misers who spread it",
      line: "Some are stingy and also tell others to be stingy.",
      facts: ["Being a miser is blamed", "Telling others to be stingy is worse"],
      quote: q57(24),
      source: ik(24, "Ibn Kathir says they are those who commit evil and encourage people to commit it.", "those who commit evil and encourage people to commit it"),
      difficulty: 2,
      questions: [
        { q: "What do the misers do, in 57:24?", a: "Enjoin miserliness on people", wrong: ["Give a lot", "Feed the poor", "Stay silent"], why: "Those who are misers and enjoin miserliness upon people." },
        { q: "How does Ibn Kathir describe them?", a: "Do evil and urge others to it", wrong: ["Do good quietly", "Forgive others", "Help their friends"], why: "Those who commit evil and encourage people to commit it." },
        { tf: false, q: "Telling people to stop giving charity is fine.", why: "Those who are misers and enjoin miserliness upon people." }
      ]
    },
    {
      slug: "allah-is-rich",
      title: "Allah is Rich",
      line: "If people turn away, Allah is Rich and Worthy of all praise.",
      facts: ["Allah needs no one", "Musa said the same in 14:8"],
      quote: q57(24),
      source: ik(24, "Ibn Kathir links this to the words of Musa in 14:8: if you and all on earth disbelieve, Allah is Rich, Owner of all praise.", "If you disbelieve, you and all on earth together, then verily, Allah is Rich, Owner of all praise"),
      difficulty: 3,
      questions: [
        { q: "How does 57:24 end?", a: "Allah is Rich, Worthy of praise", wrong: ["Allah is Near", "Allah is Severe", "Allah is First"], why: "Then Allah is Rich, Worthy of all praise." },
        { q: "Who said 14:8, as Ibn Kathir quotes?", a: "Musa, peace be upon him", wrong: ["Nuh", "Isa", "Yusuf"], why: "As Musa, peace be upon him, said." },
        { tf: true, q: "If all people disbelieved, Allah would lose nothing.", why: "If you disbelieve, you and all on earth together, then verily, Allah is Rich." }
      ]
    },
    {
      slug: "messengers-with-clear-proofs",
      title: "Messengers with clear proofs",
      line: "Allah sent His Messengers with miracles and clear proofs.",
      facts: ["The proofs were plain to see", "Messengers came with the truth"],
      quote: q57(25),
      source: ik(25, "Ibn Kathir says clear proofs means the miracles, the unequivocal evidences and the plain proofs.", "in reference to the miracles, the unequivocal evidences and the plain proofs"),
      difficulty: 2,
      questions: [
        { q: "What did Messengers come with, in 57:25?", a: "Clear proofs", wrong: ["Gold", "Armies", "Riddles"], why: "Indeed We have sent Our Messengers with clear proofs." },
        { q: "What are the clear proofs, per Ibn Kathir?", a: "Miracles and plain evidences", wrong: ["Poems", "Coins", "Castles"], why: "In reference to the miracles, the unequivocal evidences and the plain proofs." },
        { tf: true, q: "Allah also sent down the Scripture with them.", why: "And revealed with them the Scripture." }
      ]
    },
    {
      slug: "the-scripture-and-the-mizan",
      title: "The Scripture and the Mizan",
      line: "With the Messengers came the Book and the Mizan, justice.",
      facts: ["Mizan means the Balance of justice", "Sound minds see this truth"],
      quote: q57(25),
      source: ik(25, "Ibn Kathir says the Mizan means justice, according to Mujahid, Qatadah and others.", "that is, justice, according to Mujahid, Qatadah and others"),
      difficulty: 2,
      questions: [
        { q: "What does Mizan mean, per Mujahid?", a: "Justice", wrong: ["A sword", "A mountain", "A ship"], why: "The Mizan), that is, justice, according to Mujahid, Qatadah and others." },
        { q: "Why were the Book and Mizan sent?", a: "So people keep up justice", wrong: ["For decoration", "For trade only", "To be hidden"], why: "That mankind may keep up justice." },
        { tf: true, q: "Ar-Rahman 55:7 also mentions the Mizan.", why: "And the heaven: He has raised it high, and He has set up the Mizan. (55:7)" }
      ]
    },
    {
      slug: "true-and-just",
      title: "True and just",
      line: "Allah's Word is true in its news and just in its orders.",
      facts: ["His news is always true", "His commands are always fair"],
      quote: q57(25),
      source: ik(25, "Ibn Kathir quotes 6:115 and says Allah's Word is true in what it conveys, and just in all its orders and prohibitions.", "His Word is true in what it conveys, and just in all its orders and prohibitions"),
      difficulty: 3,
      questions: [
        { q: "How is Allah's Word in what it tells?", a: "True", wrong: ["Uncertain", "Partly true", "Old"], why: "His Word is true in what it conveys." },
        { q: "How is Allah's Word in what it orders?", a: "Just", wrong: ["Harsh", "Random", "Unfair"], why: "And just in all its orders and prohibitions." },
        { q: "Which ayah does Ibn Kathir quote for this?", a: "6:115", wrong: ["2:2", "57:1", "112:4"], why: "And the Word of your Lord has been fulfilled in truth and in justice. (6:115)" }
      ]
    },
    {
      slug: "guided-to-this",
      title: "Guided to this",
      line: "In Paradise believers will thank Allah for guiding them.",
      facts: ["Guidance is Allah's gift", "The Messengers came with the truth"],
      quote: q57(25),
      source: ik(25, "Ibn Kathir quotes 7:43, what the believers say in Paradise: All praise is due to Allah, Who has guided us to this.", "All praise is due to Allah, Who has guided us to this"),
      difficulty: 2,
      questions: [
        { q: "What will believers say in Paradise, per 7:43?", a: "Praise Allah Who guided us", wrong: ["We did it alone", "We were lucky", "We are tired"], why: "All praise is due to Allah, Who has guided us to this." },
        { q: "Could they have found guidance alone?", a: "No, only by Allah's guidance", wrong: ["Yes, easily", "With money", "With friends only"], why: "Never could we have found guidance, were it not that Allah had guided us!" },
        { tf: true, q: "The believers will say the Messengers came with the truth.", why: "Indeed, the Messengers of our Lord did come with the truth. (7:43)" }
      ]
    },
    {
      slug: "iron-and-its-benefits",
      title: "Iron and its benefits",
      line: "Allah sent down iron, with great strength and many benefits.",
      facts: ["The surah is named Al-Hadid, Iron", "Iron makes tools for daily life"],
      quote: q57(25),
      source: ik(25, "Ibn Kathir says iron benefits people in their livelihood, used to make coins, hammers, axes, saws, chisels, shovels and many tools.", "such as using it to make coins, hammers, axes, saws chisels, shovels"),
      difficulty: 1,
      questions: [
        { q: "What does Al-Hadid mean?", a: "Iron", wrong: ["Gold", "Light", "Water"], why: "And We brought forth iron wherein is mighty power." },
        { q: "Which of these is made from iron, per Ibn Kathir?", a: "Hammers and axes", wrong: ["Bread", "Clothes of wool", "Clay pots"], why: "Such as using it to make coins, hammers, axes, saws chisels, shovels." },
        { tf: true, q: "Iron is used for farming, cooking and building tools.", why: "Tools that people use for tilting the land, sowing, cooking, making dough." }
      ]
    },
    {
      slug: "allah-needs-no-help",
      title: "Allah needs no help",
      line: "Allah is Powerful and Almighty, and needs no one.",
      facts: ["He tests who will support His religion", "Support is for our own good"],
      quote: q57(25),
      source: ik(25, "Ibn Kathir says Allah is Powerful, Almighty, and He does not need mankind's help; He tests people.", "However, Allah does not need mankind"),
      difficulty: 3,
      questions: [
        { q: "How does 57:25 end?", a: "Allah is Powerful, Almighty", wrong: ["Allah is Gentle", "Allah is First", "Allah is Rich"], why: "Verily, Allah is Powerful, Almighty." },
        { q: "Does Allah need people's help?", a: "No, He needs no one", wrong: ["Yes, always", "Only sometimes", "Only from kings"], why: "However, Allah does not need mankind's help." },
        { tf: true, q: "57:25 says Allah tests who helps His religion in the unseen.", why: "That Allah may test who it is that will help Him (His religion) and His Messengers in the unseen." }
      ]
    },
    {
      slug: "nuh-and-ibrahim",
      title: "Nuh and Ibrahim",
      line: "After Nuh, every prophet came from his offspring.",
      facts: ["All Messengers after Nuh were his descendants", "After Ibrahim, all were from his line"],
      quote: q57(26),
      source: ik(26, "Ibn Kathir says since Nuh, all the Prophets and Messengers Allah sent were from his offspring.", "all the Prophets and Messengers He sent after that were from his offspring"),
      difficulty: 2,
      questions: [
        { q: "Which two prophets are named in 57:26?", a: "Nuh and Ibrahim", wrong: ["Musa and Harun", "Adam and Shith", "Yusuf and Yaqub"], why: "And indeed, We sent Nuh and Ibrahim." },
        { q: "Whose offspring were all later prophets after Nuh?", a: "Nuh's", wrong: ["No one's", "A king's", "Pharaoh's"], why: "All the Prophets and Messengers He sent after that were from his offspring." },
        { tf: true, q: "Ibrahim is called Allah's Khalil, His close friend.", why: "After Ibrahim, Allah's Khalil, peace be upon him." }
      ]
    },
    {
      slug: "books-after-ibrahim",
      title: "Books after Ibrahim",
      line: "Every Book and Messenger after Ibrahim came from his family.",
      facts: ["Prophethood stayed in his line", "Some were guided, many rebellious"],
      quote: q57(26),
      source: ik(26, "Ibn Kathir says all the revealed Books and all the Messengers after Ibrahim were from his offspring.", "All the revealed Divine Books and all the Messengers that received revelation after Ibrahim"),
      difficulty: 2,
      questions: [
        { q: "What did Allah place in their offspring?", a: "Prophethood and Scripture", wrong: ["Kingdoms", "Gold", "Castles"], why: "And placed in their offspring prophethood and Scripture." },
        { q: "How were their descendants, per 57:26?", a: "Some guided, many rebellious", wrong: ["All guided", "All rebellious", "None mentioned"], why: "And among them there are some who are guided; but many of them are rebellious." },
        { tf: true, q: "29:27 also speaks of prophethood in their offspring.", why: "And placed in their offspring prophethood and Scripture. [29:27]" }
      ]
    },
    {
      slug: "isa-and-the-injil",
      title: "Isa and the Injil",
      line: "Allah sent Isa son of Maryam and gave him the Injil.",
      facts: ["He was the last prophet of Bani Israel", "He gave good news of Muhammad ﷺ"],
      quote: q57(27),
      source: ik(27, "Ibn Kathir says the last of the Prophets of the Children of Israel was Isa, who told the good news of the coming of Muhammad.", "The last among the Prophets of the Children of Israel was…who prophecied the good news of the coming of Muhammad"),
      difficulty: 2,
      questions: [
        { q: "Which Book was given to Isa?", a: "The Injil", wrong: ["The Tawrah", "The Zabur", "The Quran"], why: "And We sent Isa the son of Maryam, and gave him the Injil." },
        { q: "Who was the last prophet of the Children of Israel?", a: "Isa", wrong: ["Musa", "Dawud", "Yahya"], why: "The last among the Prophets of the Children of Israel was Isa." },
        { tf: true, q: "Isa gave the good news of Muhammad ﷺ coming.", why: "Who prophecied the good news of the coming of Muhammad." }
      ]
    },
    {
      slug: "compassion-and-mercy",
      title: "Compassion and mercy",
      line: "Allah put compassion and mercy in the hearts of Isa's followers.",
      facts: ["His disciples were tender", "They showed mercy to creatures"],
      quote: q57(27),
      source: ik(27, "Ibn Kathir says Allah put compassion and mercy toward the creatures in the hearts of the disciples of Isa.", "the disciples…toward the creatures"),
      difficulty: 2,
      questions: [
        { q: "What did Allah place in their hearts, in 57:27?", a: "Compassion and mercy", wrong: ["Anger", "Pride", "Greed"], why: "And We ordained in the hearts of those who followed him, compassion and mercy." },
        { q: "Who were those who followed him, per Ibn Kathir?", a: "The disciples", wrong: ["The kings", "The soldiers", "The traders"], why: "Those who followed him... the disciples." },
        { tf: true, q: "Their mercy reached the creatures.", why: "And mercy.) toward the creatures." }
      ]
    },
    {
      slug: "a-practice-they-invented",
      title: "A practice they invented",
      line: "Monasticism was invented by them; Allah did not prescribe it.",
      facts: ["They chose it on their own", "Allah never ordained it"],
      quote: q57(27),
      source: ik(27, "Ibn Kathir says monasticism was invented by the Christian nation; Allah did not ordain it, they chose it themselves.", "refers to the monasticism that the Christian nation invented"),
      difficulty: 3,
      questions: [
        { q: "Who prescribed monasticism, per 57:27?", a: "No one; they invented it", wrong: ["Allah ordered it", "Isa ordered it", "The angels"], why: "But the monasticism which they invented for themselves, We did not prescribe for them." },
        { q: "What is monasticism?", a: "Leaving normal life for worship", wrong: ["A kind of trade", "A city", "A festival"], why: "Build homes (monasteries) for us in the deserts and secluded areas." },
        { tf: false, q: "Allah commanded the followers of Isa to invent it.", why: "We did not prescribe for them... they chose it on their own." }
      ]
    },
    {
      slug: "not-kept-properly",
      title: "Not kept properly",
      line: "They did not even keep the practice they made up.",
      facts: ["Adding to religion is blamed", "Not keeping promises is blamed too"],
      quote: q57(27),
      source: ik(27, "Ibn Kathir says they did not abide by what they ordered themselves to do, and they added to religion what Allah did not legislate.", "they did not abide by what they ordered themselves to do"),
      difficulty: 3,
      questions: [
        { q: "What were they blamed for first?", a: "Adding to their religion", wrong: ["Praying too much", "Giving charity", "Reading Scripture"], why: "They invented in things in their religion, things which Allah did not legislate for them." },
        { q: "What were they blamed for second?", a: "Not keeping what they invented", wrong: ["Keeping it perfectly", "Teaching it", "Writing it down"], why: "They did not abide by what they ordered themselves to do." },
        { tf: true, q: "Allah rewarded those of them who truly believed.", why: "So, We gave those among them who believed, their (due) reward." }
      ]
    },
    {
      slug: "a-double-portion-of-mercy",
      title: "A double portion of mercy",
      line: "Believe in His Messenger, and get a double share of mercy.",
      facts: ["Have Taqwa and believe", "Allah gives light and forgiveness"],
      quote: q57(28),
      source: ik(28, "Ibn Kathir says People of the Scriptures who believe in Islam will earn double their reward.", "they will earn double their reward if they do so"),
      difficulty: 2,
      questions: [
        { q: "What does 57:28 promise those with Taqwa who believe?", a: "A double portion of mercy", wrong: ["Gold", "A kingdom", "A long life"], why: "He will give you a double portion of His mercy." },
        { q: "What else will Allah give them, in 57:28?", a: "A light to walk by", wrong: ["A ship", "A sword", "A castle"], why: "And He will give you a light by which you shall walk (straight)." },
        { tf: true, q: "57:28 ends: Allah is Oft-Forgiving, Most Merciful.", why: "And Allah is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "three-with-double-reward",
      title: "Three with double reward",
      line: "A Christian or Jew who accepts Islam is rewarded twice.",
      facts: ["He believed in his own prophet first", "Then he believed in Muhammad ﷺ"],
      quote: q57(28),
      source: hadith("bukhari", "97", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said three persons will have a double reward, including a person of the scriptures who believed in his prophet and then believed in Muhammad.", "Three persons will have a double reward…A Person from the people of the scriptures who believed in his prophet"),
      difficulty: 3,
      questions: [
        { q: "How many people get a double reward, per Bukhari 97?", a: "Three", wrong: ["Two", "Seven", "Ten"], why: "Three persons will have a double reward." },
        { q: "Who is the first of them?", a: "One of the Scripture who accepts Islam", wrong: ["A rich trader", "A brave king", "A poet"], why: "A Person from the people of the scriptures who believed in his prophet... and then believed in the Prophet ﷺ Muhammad." },
        { tf: true, q: "A loyal servant who serves Allah and his master is another.", why: "A slave who discharges his duties to Allah and his master." }
      ]
    },
    {
      slug: "a-criterion-and-forgiveness",
      title: "A criterion and forgiveness",
      line: "Taqwa brings light, forgiveness, and a sense of right and wrong.",
      facts: ["8:29 promises a criterion", "Taqwa wipes away sins"],
      quote: q57(28),
      source: ik(28, "Ibn Kathir links 57:28 to 8:29: if you have Taqwa of Allah, He will grant you a criterion and forgive your sins.", "If you have Taqwa of Allah, He will grant you a criterion"),
      difficulty: 3,
      questions: [
        { q: "What does 8:29 promise for Taqwa?", a: "A criterion of right and wrong", wrong: ["A palace", "Fame", "A horse"], why: "If you have Taqwa of Allah, He will grant you a criterion. (8:29)" },
        { q: "What else does Taqwa bring, per 8:29?", a: "Sins wiped away", wrong: ["More sins", "Nothing", "Only wealth"], why: "And will expiate for you your sins, and forgive you." },
        { tf: true, q: "Both 57:28 and 8:29 promise forgiveness.", why: "And He will forgive you... and will expiate for you your sins, and forgive you." }
      ]
    },
    {
      slug: "two-portions",
      title: "Two portions",
      line: "Umar praised Allah for giving this Ummah two portions.",
      facts: ["A Kifl means a portion", "Umar thanked Allah for two"],
      quote: q57(28),
      source: ik(28, "Ibn Kathir reports Umar asked a rabbi about the greatest reward; on hearing of one Kifl he said: Praise be to Allah who gave us two Kifls.", "Praise be to Allah who gave us two Kifls"),
      difficulty: 3,
      questions: [
        { q: "What is a Kifl?", a: "A portion", wrong: ["A coin", "A city", "A book"], why: "A Kifl (portion) which is about three hundred and fifty good merits." },
        { q: "What did Umar say?", a: "Praise Allah for two Kifls", wrong: ["I want more gold", "Nothing", "We have one"], why: "Praise be to Allah who gave us two Kifls." },
        { tf: true, q: "Umar linked two Kifls to a double portion of mercy.", why: "He will give you a double portion of His mercy." }
      ]
    },
    {
      slug: "work-until-sunset",
      title: "Work until sunset",
      line: "The Prophet ﷺ compared our Ummah to workers paid double.",
      facts: ["We worked from Asr to sunset", "We were given two Qirats each"],
      quote: q57(29),
      source: hadith("bukhari", "557", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ compared the nations to workers: we worked from Asr to sunset and were given two Qirats each; Allah said that is My blessing I give to whom I wish.", "we were given two Qirats each…That is my blessing I bestow upon whomsoever I wish"),
      difficulty: 3,
      questions: [
        { q: "How long did the last workers work?", a: "From Asr until sunset", wrong: ["All day", "From dawn", "One hour at night"], why: "The period equal to the time between the Asr prayer and sunset." },
        { q: "How much were they given?", a: "Two Qirats each", wrong: ["One Qirat", "Nothing", "Ten Qirats"], why: "We were given two Qirats each." },
        { tf: true, q: "Allah said the extra was His blessing to give.", why: "That is my blessing I bestow upon whomsoever I wish." }
      ]
    },
    {
      slug: "those-who-quit",
      title: "Those who quit",
      line: "In another parable, workers quit and the last ones got all.",
      facts: ["Finish the work you start", "The last batch received both wages"],
      quote: q57(29),
      source: hadith("bukhari", "558", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ compared Muslims, Jews and Christians to laborers; the last batch worked till sunset and received the wages of the two former batches.", "They worked for the rest of the day till sunset, and they received the wages of the two former batches"),
      difficulty: 3,
      questions: [
        { q: "What did the first workers say at midday?", a: "We do not need your reward", wrong: ["We want more work", "We are hungry", "We love this job"], why: "They worked till midday and they said, We are not in need of your reward." },
        { q: "What did the last batch receive?", a: "The wages of both earlier batches", wrong: ["Nothing", "Half a wage", "One small coin"], why: "They received the wages of the two former batches." },
        { tf: true, q: "The last batch worked until sunset.", why: "They worked for the rest of the day till sunset." }
      ]
    },
    {
      slug: "grace-is-in-his-hand",
      title: "Grace is in His Hand",
      line: "No one can stop what Allah gives or give what He withholds.",
      facts: ["All grace is in Allah's Hand", "He gives it to whom He wills"],
      quote: q57(29),
      source: ik(29, "Ibn Kathir says they should know that they cannot prevent what Allah gives, or give what Allah prevents.", "they cannot prevent what Allah gives, or give what Allah prevents"),
      difficulty: 2,
      questions: [
        { q: "Where is all grace, in 57:29?", a: "In Allah's Hand", wrong: ["In the market", "With the kings", "With scholars"], why: "And that (His) grace is in His Hand to bestow it on whomsoever He wills." },
        { q: "Can anyone stop what Allah gives?", a: "No one can", wrong: ["Kings can", "Rich people can", "Jinn can"], why: "They cannot prevent what Allah gives, or give what Allah prevents." },
        { q: "How does Surah Al-Hadid end?", a: "Allah is Owner of great bounty", wrong: ["Allah is Severe", "Allah is the First", "Allah is Near"], why: "And Allah is the Owner of great bounty." }
      ]
    }
  ]
};

export const HADID_UNITS: readonly DeepUnit[] = [HADID_ONE, HADID_TWO, HADID_THREE, HADID_FOUR];
