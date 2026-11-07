import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Al-Bayyinah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Bayyinah 98:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_98_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Bayyinah 98:${ayah}`,
    url: `https://quran.com/98:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 98:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q98 = (ayah: number) => quranQuote(98, ayah);


/** Ayahs 1 to 5: the clear proof came, pure pages and upright books, and the simple command to worship Allah alone. */
const BAYYINAH_ONE: DeepUnit = {
  key: "bayyinah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-98",
  name: "Al-Bayyinah, ayahs 1-5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Bayyinah",
  lessons: [
    {
      slug: "ubayy-wept",
      title: "Ubayy wept",
      line: "Allah named Ubayy and had Al-Bayyinah recited to him.",
      facts: ["Ubayy ibn Kab: a Quran reciter", "Named by Allah"],
      quote: q98(1),
      source: hadith("bukhari", "4959", "Anas ibn Malik", "Sahih", "The Prophet ﷺ told Ubayy that Allah ordered him to recite Al-Bayyinah to him; Ubayy asked if Allah named him, and wept when told yes.", "Did Allah mention me by name"),
      difficulty: 1,
      questions: [
        { q: "To whom was he ordered to recite Al-Bayyinah?", a: "Ubayy ibn Kab", wrong: ["Abu Bakr", "Umar", "Bilal"], why: "The Prophet ﷺ said to Ubai: Allah has ordered me to recite to you." },
        { q: "What did Ubayy ask?", a: "Did Allah mention me by name?", wrong: ["Can I go home?", "Is it long?", "Who wrote it?"], why: "Ubai said, Did Allah mention me by name?" },
        { tf: true, q: "Ubayy wept when he heard the answer.", why: "The Prophet ﷺ said, Yes. On that, Ubai wept." }
      ]
    },
    {
      slug: "until-the-clear-proof",
      title: "Until the clear proof came",
      line: "People would not leave their ways until the clear proof came.",
      facts: ["Al-Bayyinah: the clear proof", "The proof is the Quran"],
      quote: q98(1),
      source: ik(1, "Mujahid said they would not be finished until the truth became clear to them; the Bayyinah is the Quran.", "they will not be finished until the truth becomes clear to them"),
      difficulty: 1,
      questions: [
        { q: "What does Al-Bayyinah mean?", a: "The clear proof", wrong: ["The cow", "The night", "The dawn"], why: "Until there came to them the Bayyinah, meaning, this Quran." },
        { q: "What did Mujahid say they were waiting for?", a: "The truth to become clear", wrong: ["Rain to fall", "A new king", "Gold to arrive"], why: "They will not be finished until the truth becomes clear to them." },
        { tf: true, q: "The clear proof is the Quran.", why: "Until there came to them the Bayyinah, meaning, this Quran." }
      ]
    },
    {
      slug: "people-of-the-scripture",
      title: "The People of the Scripture",
      line: "People of the Scripture are the Jews and the Christians.",
      facts: ["Ahl al-Kitab: People of the Book", "Mushrikin: idol worshippers"],
      quote: q98(1),
      source: ik(1, "The People of the Scripture are the Jews and the Christians, and the idolators are those who worshipped idols and fire.", "they are the Jews and the Christians"),
      difficulty: 1,
      questions: [
        { q: "Who are the People of the Scripture, per Ibn Kathir?", a: "The Jews and the Christians", wrong: ["The Romans only", "The Arabs only", "The Persians only"], why: "As for the People of the Scripture, they are the Jews and the Christians." },
        { q: "Who are the idolators, per Ibn Kathir?", a: "Worshippers of idols and fire", wrong: ["Traders", "Poets", "Farmers"], why: "The idolators are the worshippers of idols and fire." },
        { tf: false, q: "The idolators were only from the Arabs.", why: "Among the Arabs and the non-Arabs." }
      ]
    },
    {
      slug: "a-messenger-with-pure-pages",
      title: "A Messenger with pure pages",
      line: "Muhammad ﷺ recited the Quran, written in pure pages on high.",
      facts: ["Suhuf mutahharah: pure pages", "Like 80:13-16"],
      quote: q98(2),
      source: ik(2, "The clear proof is Muhammad ﷺ and the Quran he recites, written among the highest gathering in purified pages.", "which is written down among the most high gathering in purified pages"),
      difficulty: 2,
      questions: [
        { q: "What does the Messenger ﷺ recite, per 98:2?", a: "Purified pages", wrong: ["Old poems", "Market lists", "Stories of kings"], why: "A Messenger from Allah reciting purified pages." },
        { q: "Where is the Quran written, per Ibn Kathir?", a: "Among the most high gathering", wrong: ["On city walls", "On the sand", "In a cave"], why: "Which is written down among the most high gathering in purified pages." },
        { q: "Which ayahs does Ibn Kathir compare?", a: "80:13-16", wrong: ["2:255", "1:1-7", "112:1-4"], why: "In Records held in honor. Exalted, purified. 80:13-16" }
      ]
    },
    {
      slug: "upright-books",
      title: "Upright books",
      line: "The pages hold upright books from Allah with no mistakes.",
      facts: ["Kutub qayyimah: upright books", "Just and straight"],
      quote: q98(3),
      source: ik(3, "Ibn Jarir said the pure pages hold upright, just and straight books from Allah, with no mistakes in them.", "They have no mistakes in them because they are from Allah"),
      difficulty: 2,
      questions: [
        { q: "What is in the pages, per 98:3?", a: "Upright books", wrong: ["Old maps", "Lost songs", "Riddles"], why: "Wherein are upright Books." },
        { q: "Why are there no mistakes, per Ibn Jarir?", a: "They are from Allah", wrong: ["They are short", "They are new", "Kings checked them"], why: "They have no mistakes in them because they are from Allah." },
        { tf: true, q: "Ibn Jarir called the books just and straight.", why: "Books from Allah that are upright, just and straight." }
      ]
    },
    {
      slug: "they-differed-after-knowledge",
      title: "They differed after knowledge",
      line: "Earlier nations split only after clear proof had reached them.",
      facts: ["Knowledge came first", "Like 3:105"],
      quote: q98(4),
      source: ik(4, "After Allah gave earlier nations clear proofs, they split and differed about what Allah meant in their books.", "they divided and differed concerning that which Allah had intended in their Scriptures"),
      difficulty: 2,
      questions: [
        { q: "When did the People of the Scripture differ, per 98:4?", a: "After the clear proof came", wrong: ["Before any proof", "Only in war", "Never at all"], why: "Differed not until after there came to them the Bayyinah." },
        { q: "Which ayah warns us not to be like them?", a: "3:105", wrong: ["2:2", "55:13", "103:1"], why: "And be not as those who divided and differed among themselves. 3:105" },
        { tf: false, q: "They split because no proof ever reached them.", why: "After Allah established the proofs and evidences against them, they divided." }
      ]
    },
    {
      slug: "one-root-one-religion",
      title: "One root, one religion",
      line: "All of Allah's Books came with one root and one religion.",
      facts: ["As-Sa'di explains", "Clear proof should unite"],
      quote: q98(4),
      source: saadi(98, 4, "As-Sa'di says the clear proof should have brought them together, since all the Books came with one root and one religion.", "جاءت بأصل واحد"),
      difficulty: 2,
      questions: [
        { q: "What did all of Allah's Books come with?", a: "One root and one religion", wrong: ["Many gods", "Different religions", "Only stories"], why: "All the Books came with one root and one religion, says as-Sa'di." },
        { q: "What should clear proof bring to people?", a: "Unity", wrong: ["Splitting", "Wars", "Pride"], why: "Proof that should bring its people together." },
        { tf: false, q: "Allah's Books taught different religions.", why: "One root, one religion. As-Sa'di on 98:4." }
      ]
    },
    {
      slug: "worship-allah-sincerely",
      title: "Worship Allah sincerely",
      line: "They were only told to worship Allah alone, sincerely.",
      facts: ["Ikhlas: sincerity", "Hunafa: turning from shirk"],
      quote: q98(5),
      source: ik(5, "Hunafa means avoiding shirk and being truly devoted to Tawhid, as every Messenger was told in 21:25 and 16:36.", "avoiding Shirk and being truly devout to Tawhid"),
      difficulty: 2,
      questions: [
        { q: "What were they commanded, per 98:5?", a: "To worship Allah sincerely", wrong: ["To build towers", "To gather wealth", "To follow kings"], why: "That they should worship Allah, making religion purely for Him alone." },
        { q: "What does Hunafa mean, per Ibn Kathir?", a: "Avoiding shirk, devoted to Tawhid", wrong: ["Rich and strong", "Loud and fast", "Many in number"], why: "Avoiding Shirk and being truly devout to Tawhid." },
        { tf: true, q: "Every Messenger brought the same call to Tawhid.", why: "We did not send any Messenger before you but We revealed to him: La ilaha illa Ana. 21:25" }
      ]
    },
    {
      slug: "salah-and-zakah",
      title: "Salah and Zakah",
      line: "Salah is the best body worship; Zakah is kindness to the poor.",
      facts: ["Salah: best body worship", "Zakah: good to the poor"],
      quote: q98(5),
      source: ik(5, "Salah is the best of the physical forms of worship, and Zakah is doing good to the poor and the needy.", "And this is the best of the physical forms of worship"),
      difficulty: 2,
      questions: [
        { q: "What does Ibn Kathir call Salah?", a: "The best physical worship", wrong: ["A small habit", "A trade deal", "A tribal custom"], why: "And this is the best of the physical forms of worship." },
        { q: "What is Zakah, per Ibn Kathir?", a: "Doing good to the poor", wrong: ["A city tax", "A gift to kings", "A prize"], why: "This is doing good to the poor and the needy." },
        { tf: true, q: "98:5 names both Salah and Zakah.", why: "And that they perform Salah and give Zakah." }
      ]
    },
    {
      slug: "built-on-five",
      title: "Islam is built on five",
      line: "Islam stands on five pillars, and Salah and Zakah are two.",
      facts: ["Shahadah, Salah, Zakah", "Hajj and fasting Ramadan"],
      quote: q98(5),
      source: hadith("bukhari", "8", "Ibn Umar", "Sahih", "Islam is built on five: the testimony of faith, prayer, Zakah, Hajj and fasting in Ramadan.", "Islam is based on"),
      difficulty: 3,
      questions: [
        { q: "On how many pillars is Islam built?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "Islam is based on the following five principles." },
        { q: "Which of these is a pillar?", a: "Fasting in Ramadan", wrong: ["Building a house", "Learning poetry", "Owning a horse"], why: "To observe fast during the month of Ramadan." },
        { tf: true, q: "Hajj is one of the five pillars.", why: "To perform Hajj." }
      ]
    },
    {
      slug: "the-right-religion",
      title: "The right religion",
      line: "Tawhid, Salah and Zakah make up the straight, balanced religion.",
      facts: ["Din al-qayyimah: right religion", "Straight and balanced"],
      quote: q98(5),
      source: ik(5, "The right religion means the upright and just religion, the nation that is straight and balanced.", "the upright and just religion"),
      difficulty: 3,
      questions: [
        { q: "How does 98:5 end?", a: "That is the right religion", wrong: ["That is a hard road", "That is for kings", "That is for later"], why: "And that is the right religion." },
        { q: "What does right religion mean, per Ibn Kathir?", a: "Upright and just", wrong: ["Old and forgotten", "Hard and heavy", "New and strange"], why: "Meaning, the upright and just religion." },
        { tf: false, q: "The right religion is crooked and extreme.", why: "The nation that is straight and balanced." }
      ]
    }
  ]
};

/** Ayahs 6 to 8: the worst and the best of creatures, gardens forever, and Allah pleased with them. */
const BAYYINAH_TWO: DeepUnit = {
  key: "bayyinah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-98",
  name: "Al-Bayyinah, ayahs 6-8",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Bayyinah",
  lessons: [
    {
      slug: "two-kinds-of-people",
      title: "Two kinds of people",
      line: "Those who reject and those who believe end very differently.",
      facts: ["98:6: those who reject", "98:7: those who believe"],
      quote: q98(6),
      source: ik(6, "Allah tells the end of those who opposed His books and Prophets, and then the end of the believers.", "Mentioning the Worse and Best of Creation"),
      difficulty: 1,
      questions: [
        { q: "What does 98:6 call those who reject?", a: "The worst of creatures", wrong: ["The best of creatures", "The busiest people", "The richest people"], why: "They are the worst of creatures." },
        { q: "Which ayah tells of the believers next?", a: "98:7", wrong: ["98:1", "98:3", "98:5"], why: "Verily, those who believe and do righteous good deeds, they are the best of creatures." },
        { tf: true, q: "The surah contrasts two groups and their ends.", why: "Mentioning the Worse and Best of Creation and Their Recompense." }
      ]
    },
    {
      slug: "the-best-of-creatures",
      title: "The best of creatures",
      line: "Believers who do good deeds are the best of creatures.",
      facts: ["Iman in the heart", "Good deeds with the body"],
      quote: q98(7),
      source: ik(7, "The righteous believed in their hearts and did good deeds with their bodies, so Allah calls them the best of creatures.", "who believed in their hearts and performed righteous deeds with their bodies"),
      difficulty: 1,
      questions: [
        { q: "Who are the best of creatures, per 98:7?", a: "Those who believe and do good", wrong: ["The strongest", "The richest", "The tallest"], why: "Those who believe and do righteous good deeds, they are the best of creatures." },
        { q: "Where is belief, per Ibn Kathir?", a: "In their hearts", wrong: ["In their pockets", "In their homes", "In their names"], why: "Who believed in their hearts and performed righteous deeds with their bodies." },
        { tf: false, q: "Belief alone with no deeds is enough to be the best.", why: "Those who believe and do righteous good deeds, they are the best of creatures." }
      ]
    },
    {
      slug: "gardens-forever",
      title: "Gardens forever",
      line: "Their reward is gardens with rivers, lasting with no end.",
      facts: ["Jannat Adn: Eternal Gardens", "Rivers flow beneath"],
      quote: q98(8),
      source: ik(8, "Their reward on the Day of Judgement is Eternal Gardens with rivers, lasting forever with no end, break or conclusion.", "having no end, no break and no conclusion"),
      difficulty: 1,
      questions: [
        { q: "What flows beneath the gardens, per 98:8?", a: "Rivers", wrong: ["Sand", "Smoke", "Snow"], why: "Eternal Gardens, underneath which rivers flow." },
        { q: "How long will they stay, per Ibn Kathir?", a: "Forever with no end", wrong: ["A hundred years", "One night", "Until they get bored"], why: "Having no end, no break and no conclusion." },
        { tf: true, q: "The reward is given by their Lord.", why: "Their reward with their Lord is Eternal Gardens." }
      ]
    },
    {
      slug: "gardens-of-adn",
      title: "Gardens of Adn",
      line: "Adn means staying: no one there wants to move or leave.",
      facts: ["As-Sa'di explains", "Adn: a home to stay in"],
      quote: q98(8),
      source: saadi(98, 8, "As-Sa'di says Gardens of Adn are gardens of staying: no leaving, no moving, and no wish for anything above them.", "لا ظعن فيها ولا رحيل"),
      difficulty: 2,
      questions: [
        { q: "What does Adn mean, per as-Sa'di?", a: "Staying", wrong: ["Traveling", "Waiting", "Testing"], why: "Gardens of residence, says as-Sa'di." },
        { q: "Will its people want to leave?", a: "Never", wrong: ["After a while", "Every year", "When bored"], why: "No leaving and no moving away." },
        { tf: true, q: "No one in Paradise wishes for a better place.", why: "No seeking anything above it. As-Sa'di on 98:8." }
      ]
    },
    {
      slug: "pleased-with-each-other",
      title: "Pleased with each other",
      line: "Allah is pleased with them, and they are pleased with Him.",
      facts: ["Radiya Allahu anhum", "The greatest gift"],
      quote: q98(8),
      source: ik(8, "Allah being pleased with them is greater than all the lasting delights they are given; they are pleased with Him for His many favors.", "The condition of Him being pleased with them is more illustrious than all of the everlasting delights"),
      difficulty: 2,
      questions: [
        { q: "What is greater than all the delights, per Ibn Kathir?", a: "Allah being pleased with them", wrong: ["Their palaces", "Their gold", "Their rivers"], why: "Him being pleased with them is more illustrious than all of the everlasting delights." },
        { q: "Why are they pleased with Allah, per Ibn Kathir?", a: "His many favors", wrong: ["Their own deeds", "Their tribe", "Their wealth"], why: "Due to the comprehensive favors He has given them." },
        { tf: true, q: "In 98:8 the pleasure goes both ways.", why: "Allah will be pleased with them, and they well-pleased with Him." }
      ]
    },
    {
      slug: "never-angry-again",
      title: "Never angry again",
      line: "Allah will tell Paradise people He is pleased with them forever.",
      facts: ["Labbaik, our Lord!", "Better than everything"],
      quote: q98(8),
      source: hadith("bukhari", "6549", "Abu Sa'id al-Khudri", "Sahih", "Allah will ask the people of Paradise if they are pleased, then give them something better: His pleasure, and He will never be angry with them again.", "I will bestow My pleasure and contentment upon you so that I will never be angry with you"),
      difficulty: 2,
      questions: [
        { q: "What will Allah ask the people of Paradise?", a: "Are you pleased?", wrong: ["Are you tired?", "Are you hungry?", "Are you lost?"], why: "Allah will say, Are you pleased?" },
        { q: "What will He give that is better than all?", a: "His pleasure forever", wrong: ["A bigger house", "A new garden", "More servants"], why: "I will bestow My pleasure and contentment upon you." },
        { tf: false, q: "Allah may later become angry with the people of Paradise.", why: "So that I will never be angry with you after for-ever." }
      ]
    },
    {
      slug: "for-whoever-fears-his-lord",
      title: "For whoever fears his Lord",
      line: "The reward is for those who fear Allah as He deserves.",
      facts: ["Khashyah: loving awe", "Allah sees you"],
      quote: q98(8),
      source: ik(8, "The reward is for those who revere and fear Allah as He deserves, worshipping Him as if they see Him, knowing He sees them.", "worships Allah as if he sees Him"),
      difficulty: 3,
      questions: [
        { q: "For whom is the reward, per 98:8?", a: "Whoever fears his Lord", wrong: ["Whoever is famous", "Whoever is rich", "Whoever is strong"], why: "That is for him who fears his Lord." },
        { q: "How does such a person worship, per Ibn Kathir?", a: "As if he sees Allah", wrong: ["Only when watched", "Only on Eid", "Only when sad"], why: "This is the person who worships Allah as if he sees Him." },
        { tf: true, q: "Even if we cannot see Allah, He sees us.", why: "He knows that even though he does not see Him, indeed Allah sees him." }
      ]
    },
    {
      slug: "ihsan",
      title: "Ihsan",
      line: "Jibril asked about Ihsan: worship Allah as if you see Him.",
      facts: ["Ihsan: excellence", "Jibril asked the questions"],
      quote: q98(8),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "Jibril asked what Ihsan is; he answered: to worship Allah as if you see Him, and if not, know that He sees you.", "To worship Allah as if you see Him"),
      difficulty: 3,
      questions: [
        { q: "Who came asking about Ihsan?", a: "Jibril", wrong: ["Abu Bakr", "A trader", "A king"], why: "Gabriel came and asked, What is faith?" },
        { q: "What is Ihsan?", a: "Worship as if you see Allah", wrong: ["Speaking loudly", "Giving gifts to kings", "Travelling far"], why: "To worship Allah as if you see Him." },
        { q: "If we cannot reach that, what should we remember?", a: "He is looking at us", wrong: ["Nobody knows", "It does not matter", "Try next year"], why: "Then you must consider that He is looking at you." }
      ]
    }
  ]
};

export const BAYYINAH_UNITS: readonly DeepUnit[] = [BAYYINAH_ONE, BAYYINAH_TWO];
