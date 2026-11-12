import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: sunnahs of the masjid, from Jami at-Tirmidhi, Sahih al-Bukhari, Sunan Abi Dawud, Sunan Ibn
// Majah and Sahih Muslim. Masjids kept clean and scented, the qiblah wall he ﷺ cleaned, seeking refuge on entering,
// coming to learn or to teach, no calling out for lost things, and a prayer in Quba like an Umrah. Every card is one
// sahih hadith with its number, narrator and grade, and its exact English words to highlight. None of these hadith
// is taught anywhere else in the app.

const MASJID: DeepUnit = {
  key: "prayer-masjid-sunnahs",
  topicId: "prayer",
  branchId: "prayer-masjid-sunnahs",
  branch: { title: "Sunnahs of the masjid", description: "Clean and scented masjids, a wall made clean, refuge on entering, learning and teaching, lost things, and a prayer in Quba." },
  name: "sunnahs of the masjid",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "clean-and-scented",
      title: "Clean and scented",
      line: "He ﷺ wanted masjids kept clean and smelling sweet.",
      facts: ["Told by Aishah", "A clean masjid is a joy to pray in", "Scented means smelling sweet"],
      source: hadith("tirmidhi", "594", "Aishah", "Sahih (Al-Albani)", "Aishah said: the Prophet ﷺ ordered that masjids be built among the homes, and that they be kept clean and scented.", "that they be kept clean and scented"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ want masjids to be kept?", a: "Clean and scented", wrong: ["Dark and cold", "Locked and empty", "Bare and dusty"], why: "He ordered that they be kept clean and scented, Aishah said." },
        { q: "What does scented mean?", a: "Smelling sweet", wrong: ["Shining bright", "Standing tall", "Staying cold"], why: "Scented means given a sweet smell, and he ﷺ wanted masjids kept that way." },
        { q: "He ﷺ ordered that masjids be kept clean and scented.", tf: true, why: "The Prophet ﷺ ordered that masjids be kept clean and scented, Aishah said." }
      ]
    },
    {
      slug: "the-qiblah-wall",
      title: "The qiblah wall",
      line: "He ﷺ saw spit on the masjid wall and scraped it off.",
      facts: ["Told by Aishah", "It was on the qiblah wall", "We help keep the masjid clean too"],
      source: hadith("bukhari", "407", "Aishah", "Sahih", "Aishah, the Mother of the Believers, said: the Messenger of Allah ﷺ saw some spit or mucus on the wall of the masjid, on the qiblah side, and scraped it off.", "on the wall of the mosque in the direction of the Qibla and scraped it off"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do when he saw spit on the masjid wall?", a: "He scraped it off", wrong: ["He painted over it", "He hung a cloth on it", "He asked for a new wall"], why: "He saw it on the wall of the mosque in the direction of the Qibla and scraped it off." },
        { q: "Which wall of the masjid was it on?", a: "The qiblah wall", wrong: ["The back wall", "The wall by the door", "The wall of the yard"], why: "It was on the wall of the mosque in the direction of the Qibla, Aishah said." },
        { q: "He ﷺ cleaned the masjid wall himself.", tf: true, why: "He saw it on the wall of the mosque towards the Qibla and scraped it off, Aishah said." }
      ]
    },
    {
      slug: "refuge-on-entering",
      title: "Refuge on entering",
      line: "Entering the masjid, he ﷺ sought refuge in Allah from Shaytan.",
      facts: ["Told by Abdullah ibn Amr", "A'udhu billahil-'Azim wa bi wajhihil-karim", "Shaytan says: he is kept from me all day"],
      source: hadith("abudawud", "466", "Abdullah ibn Amr", "Sahih (Al-Albani)", "Haywah ibn Shurayh said: I met Uqbah ibn Muslim and said: I was told that you narrate from Abdullah ibn Amr that when the Prophet ﷺ entered the masjid he would say: I seek refuge in Allah the Magnificent, in His noble Face and in His eternal authority, from the accursed Shaytan. Uqbah asked: is that all? I said: yes. He said: when someone says it, Shaytan says: he is protected from me for the rest of the day.", "I seek refuge in Allah, the Magnificent, and in His noble face, and in his eternal domain, from the accursed Devil"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say these words of refuge?", a: "On entering the masjid", wrong: ["On waking from sleep", "On finishing a meal", "On riding a camel"], why: "When he entered the mosque, he would say: I seek refuge in Allah, the Magnificent." },
        { q: "How long is he kept safe from Shaytan, the hadith says?", a: "The rest of the day", wrong: ["Only one hour", "Only one minute", "Only one night"], why: "When anyone says so, the devil says: he is protected from me all the day long." },
        { q: "He ﷺ sought refuge in Allah from Shaytan when entering the masjid.", tf: true, why: "When he entered the mosque he would seek refuge in Allah from the accursed Devil." }
      ]
    },
    {
      slug: "to-learn-or-to-teach",
      title: "To learn or to teach",
      line: "Coming to his ﷺ masjid to learn or teach earns a great reward.",
      facts: ["Told by Abu Hurairah", "His ﷺ masjid is in Madinah", "Like one who strives in Allah's cause"],
      source: hadith("ibnmajah", "227", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: I heard the Messenger of Allah ﷺ say: whoever comes to this masjid of mine only for good, to learn it or to teach it, is like one who strives in the cause of Allah. Whoever comes for anything else is like a man looking at what belongs to others.", "only comes for a good purpose, such as to learn or to teach"),
      difficulty: 2,
      questions: [
        { q: "For which good did he ﷺ want people to come to his masjid?", a: "To learn or to teach", wrong: ["To buy or to sell", "To rest or to sleep", "To eat or to drink"], why: "And only comes for a good purpose, such as to learn or to teach, he ﷺ said." },
        { q: "Whose reward is it like, he ﷺ said?", a: "One who strives in Allah's cause", wrong: ["One who builds a house", "One who sells in a market", "One who sails the sea"], why: "His status is like one who fights in Jihad in the cause of Allah, he ﷺ said." },
        { q: "He ﷺ praised coming to his masjid to learn or to teach.", tf: true, why: "Whoever comes to this mosque of mine to learn or to teach is like one in Jihad, he ﷺ said." }
      ]
    },
    {
      slug: "not-for-lost-things",
      title: "Not for lost things",
      line: "Masjids were not built for calling out about lost things.",
      facts: ["Told by Abu Hurairah", "Say: may Allah not return it to you", "Masjids are for prayer and dhikr"],
      source: hadith("muslim", "568a", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: if anyone hears a man calling out in the masjid for something he has lost, he should say: may Allah not return it to you, for masjids were not built for this.", "for the mosques were not built for this"),
      difficulty: 2,
      questions: [
        { q: "What should you say to one calling for a lost thing in the masjid?", a: "May Allah not return it to you", wrong: ["May Allah reward your search", "May you find it very soon", "May Allah give you more"], why: "He should say: May Allah not restore it to you, he ﷺ said." },
        { q: "Why not call out for lost things in the masjid?", a: "Masjids were not built for this", wrong: ["The masjid is too small", "The walls echo too loudly", "Lost things are never found"], why: "For the mosques were not built for this, he ﷺ said." },
        { q: "Masjids were built for calling out about lost things.", tf: false, why: "No. The mosques were not built for this, he ﷺ said." }
      ]
    },
    {
      slug: "a-prayer-in-quba",
      title: "A prayer in Quba",
      line: "A prayer in Masjid Quba is like an Umrah, he ﷺ said.",
      facts: ["Told by Usaid ibn Zuhair al-Ansari", "Quba is just outside Madinah", "He ﷺ stopped at Quba on the Hijrah"],
      source: hadith("tirmidhi", "324", "Usaid ibn Zuhair al-Ansari", "Sahih (Al-Albani)", "Usaid ibn Zuhair al-Ansari, a Companion of the Prophet ﷺ, said: the Prophet ﷺ said: a prayer in Masjid Quba is like an Umrah.", "The Salat in Masjid Quba is like Umrah"),
      difficulty: 1,
      questions: [
        { q: "What is a prayer in Masjid Quba like, he ﷺ said?", a: "An Umrah", wrong: ["A Hajj", "A month of fasting", "A night of Qadr"], why: "The Salat in Masjid Quba is like Umrah, he ﷺ said." },
        { q: "Where is Masjid Quba?", a: "Just outside Madinah", wrong: ["Just outside Makkah", "Near Jerusalem", "Near Ta'if"], why: "Quba is just outside Madinah; he ﷺ stopped there on the Hijrah." },
        { q: "A prayer in Masjid Quba is like an Umrah.", tf: true, why: "The Salat in Masjid Quba is like Umrah, the Prophet ﷺ said." }
      ]
    }
  ]
};

export const PRAYER_MASJID_UNITS: readonly DeepUnit[] = [MASJID];
