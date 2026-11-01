import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Deep units for the Hajj topic, after "Hajj like the Prophet ﷺ": Umrah, the Sacred House, and the three masjids.
// Every card is from the Quran or a sahih hadith (number and grade as sunnah.com gives them). Rites and rulings the
// schools differ on are left out.

const UMRAH: DeepUnit = {
  key: "hajj-umrah",
  topicId: "hajj",
  branchId: "hajj-umrah",
  branch: { title: "Umrah", description: "The smaller pilgrimage: how often he ﷺ did it, and its reward." },
  name: "Umrah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "complete",
      title: "Complete them for Allah",
      line: "Allah says: complete the Hajj and the Umrah for Allah.",
      facts: ["Quran 2:196", "Umrah: the smaller pilgrimage"],
      source: quran(2, 196, "And complete the Hajj and the Umrah for Allah."),
      difficulty: 1,
      questions: [
        { q: "For whom are Hajj and Umrah done?", a: "For Allah", wrong: ["For photos", "For fame", "For a holiday"], why: "Quran 2:196: complete them for Allah." },
        { q: "What is Umrah?", a: "A smaller pilgrimage to Makkah", wrong: ["A Friday prayer", "A fast", "A kind of charity"], why: "It can be done at any time of year." },
        { q: "Umrah can be done outside the Hajj days.", tf: true, why: "Unlike Hajj, it has no fixed days." }
      ]
    },
    {
      slug: "four",
      title: "Four Umrahs, one Hajj",
      line: "He ﷺ made Umrah four times, and Hajj once.",
      facts: ["Told by Anas", "Hajj only once"],
      source: hadith("bukhari", "1778", "Anas ibn Malik", "Sahih", "Qatadah asked Anas how many times the Prophet ﷺ made Umrah. He said: four. And how many Hajj? He said: one."),
      difficulty: 2,
      questions: [
        { q: "How many times did he ﷺ make Umrah?", a: "Four", wrong: ["One", "Ten", "Forty"], why: "Sahih al-Bukhari 1778." },
        { q: "How many times did he ﷺ make Hajj?", a: "Once", wrong: ["Four times", "Every year", "Never"], why: "Anas said: one." },
        { q: "Who answered this question?", a: "Anas", wrong: ["Abu Jahl", "Heraclius", "Abu Lahab"], why: "Qatadah asked Anas." }
      ]
    },
    {
      slug: "ramadan",
      title: "Umrah in Ramadan",
      line: "An Umrah in Ramadan is like a Hajj in reward.",
      facts: ["Said to a woman who missed Hajj"],
      source: hadith("bukhari", "1782", "Ibn Abbas", "Sahih", "He ﷺ asked an Ansari woman what kept her from Hajj with them. She said her family had only one camel to spare. He said: make Umrah when Ramadan comes, for Umrah in Ramadan is like a Hajj."),
      difficulty: 1,
      questions: [
        { q: "An Umrah in Ramadan is like what?", a: "A Hajj", wrong: ["Nothing special", "A fast", "A small charity"], why: "Sahih al-Bukhari 1782." },
        { q: "Why had the woman missed Hajj?", a: "Her family lacked a camel", wrong: ["She was lazy", "She forgot", "It rained"], why: "Their one spare camel was needed." },
        { q: "Umrah in Ramadan replaces the duty of Hajj.", tf: false, why: "It is like Hajj in reward, but the duty stays." }
      ]
    },
    {
      slug: "best-effort",
      title: "The best striving",
      line: "Aishah asked about striving; he ﷺ said: an accepted Hajj.",
      facts: ["Told by Aishah"],
      source: hadith("bukhari", "1520", "Aishah", "Sahih", "Aishah said: we see jihad as the best deed. The Prophet ﷺ said: the best jihad for you women is an accepted Hajj."),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ call the best striving for women?", a: "An accepted Hajj", wrong: ["Staying home always", "Shopping", "Nothing"], why: "Sahih al-Bukhari 1520." },
        { q: "Who asked him ﷺ about it?", a: "Aishah", wrong: ["Abu Jahl", "Heraclius", "Abu Lahab"], why: "The mother of the believers." },
        { q: "Hajj takes real effort and patience.", tf: true, why: "So he ﷺ called it striving." }
      ]
    }
  ]
};

const HOUSE: DeepUnit = {
  key: "hajj-house",
  topicId: "hajj",
  branchId: "hajj-sacred-house",
  branch: { title: "The Sacred House", description: "The Ka'bah in the Quran: built by Ibrahim, blessed, and safe." },
  name: "the Sacred House",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "first-house",
      title: "The first House",
      line: "The first House set up for people is at Makkah, blessed.",
      facts: ["Quran 3:96", "A guidance for all"],
      quote: quranQuote(3, 96),
      source: quran(3, 96, "Indeed, the first House set up for mankind is the one at Bakkah, blessed and a guidance for the worlds."),
      difficulty: 1,
      questions: [
        { q: "Where is the first House set up for people?", a: "Makkah", wrong: ["Rome", "Cairo", "Baghdad"], why: "Quran 3:96: at Bakkah." },
        { q: "What is another Quran name for Makkah?", a: "Bakkah", wrong: ["Yathrib", "Taif", "Badr"], why: "The ayah says Bakkah." },
        { q: "The House is a guidance for the whole world.", tf: true, why: "Blessed and a guidance for the worlds." }
      ]
    },
    {
      slug: "raising",
      title: "Raising the foundations",
      line: "Ibrahim and Ismail raised the House: Our Lord, accept from us.",
      facts: ["Quran 2:127", "Father and son"],
      quote: quranQuote(2, 127),
      source: quran(2, 127, "And when Ibrahim was raising the foundations of the House, with Ismail: Our Lord, accept this from us; You are the All-Hearing, the All-Knowing."),
      difficulty: 1,
      questions: [
        { q: "Who raised the foundations of the Ka'bah?", a: "Ibrahim and Ismail", wrong: ["Musa and Harun", "Dawud and Sulayman", "Nuh and his son"], why: "Quran 2:127." },
        { q: "What did they ask while building?", a: "Our Lord, accept from us", wrong: ["Make us famous", "Make us rich", "Nothing"], why: "Our Lord, accept this from us." },
        { q: "Even great deeds need du'a to be accepted.", tf: true, why: "They asked Allah to accept their work." }
      ]
    },
    {
      slug: "valley",
      title: "A valley with no crops",
      line: "Ibrahim left his family in a dry valley by the Sacred House.",
      facts: ["Quran 14:37", "Make hearts love them"],
      quote: quranQuote(14, 37),
      source: quran(14, 37, "Our Lord, I have settled some of my offspring in a valley without crops near Your Sacred House, so that they establish prayer. So make hearts of people incline to them, and provide them with fruits."),
      difficulty: 2,
      questions: [
        { q: "What was the valley like?", a: "Without crops", wrong: ["Full of rivers", "Covered in snow", "A big city"], why: "Quran 14:37." },
        { q: "What did Ibrahim ask for the people there?", a: "That hearts incline to them", wrong: ["That they leave", "Gold mines", "Nothing"], why: "Make hearts of people incline to them." },
        { q: "Why did he leave his family there?", a: "To establish prayer", wrong: ["To trade", "To fight", "To hide"], why: "So that they establish prayer." }
      ]
    },
    {
      slug: "proclaim",
      title: "Call people to Hajj",
      line: "Call people to Hajj; they'll come on foot and on thin camels.",
      facts: ["Quran 22:27", "From far away"],
      quote: quranQuote(22, 27),
      source: quran(22, 27, "And proclaim the Hajj to the people: they will come to you on foot and on every lean camel, from every distant pass."),
      difficulty: 1,
      questions: [
        { q: "Whom did Allah tell to call people to Hajj?", a: "Ibrahim", wrong: ["Firawn", "Qarun", "Haman"], why: "Quran 22:26-27 tells it to Ibrahim." },
        { q: "How would the pilgrims come?", a: "On foot and on camels", wrong: ["Only by ship", "They would not come", "Only kings"], why: "Quran 22:27." },
        { q: "Pilgrims come from every distant place.", tf: true, why: "From every distant pass." }
      ]
    },
    {
      slug: "safe",
      title: "Whoever enters is safe",
      line: "In it is Maqam Ibrahim, and whoever enters it is safe.",
      facts: ["Quran 3:97", "Hajj for those able"],
      quote: quranQuote(3, 97),
      source: quran(3, 97, "In it are clear signs, the standing place of Ibrahim; whoever enters it is safe. And Hajj to the House is a duty to Allah on people, for whoever is able to find a way."),
      difficulty: 2,
      questions: [
        { q: "Which clear sign is named in 3:97?", a: "Maqam Ibrahim", wrong: ["The pyramids", "The Nile", "Mount Sinai"], why: "The standing place of Ibrahim." },
        { q: "Who must make Hajj?", a: "Those who are able", wrong: ["Only kings", "Only children", "Nobody"], why: "For whoever is able to find a way." },
        { q: "The Sacred House is a place of safety.", tf: true, why: "Whoever enters it is safe." }
      ]
    },
    {
      slug: "sanctuary",
      title: "Sacred since creation",
      line: "Allah made Makkah sacred the day He made the heavens and earth.",
      facts: ["Its plants are not cut", "Its game is not chased"],
      source: hadith("bukhari", "1834", "Ibn Abbas", "Sahih", "On the day Makkah was opened, the Prophet ﷺ said: Allah made this land sacred the day He created the heavens and the earth, and it stays sacred until the Day of Resurrection. Its thorny plants are not cut and its game is not chased."),
      difficulty: 2,
      questions: [
        { q: "Since when has Makkah been sacred?", a: "Since the heavens and earth were made", wrong: ["Since last year", "Since Hajj began", "Never"], why: "Sahih al-Bukhari 1834." },
        { q: "What may not be done to its animals?", a: "Chase them", wrong: ["Feed them", "Look at them", "Give them water"], why: "Its game is not chased." },
        { q: "Makkah stays sacred until the Day of Resurrection.", tf: true, why: "As he ﷺ said on the day Makkah was opened." }
      ]
    }
  ]
};

const MASJIDS: DeepUnit = {
  key: "hajj-masjids",
  topicId: "hajj",
  branchId: "hajj-three-masjids",
  branch: { title: "The three masjids", description: "Al-Masjid al-Haram, his ﷺ masjid in Madinah, and Al-Aqsa." },
  name: "the three masjids",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "three",
      title: "Travel for three",
      line: "Travel for worship only to three masjids.",
      facts: ["Makkah, Madinah, Jerusalem"],
      source: hadith("bukhari", "1189", "Abu Hurairah", "Sahih", "Do not set out on a journey except to three masjids: Al-Masjid al-Haram, the masjid of the Messenger ﷺ, and Al-Aqsa."),
      difficulty: 1,
      questions: [
        { q: "Which masjid is in Jerusalem?", a: "Al-Aqsa", wrong: ["Al-Haram", "Quba", "An-Nabawi"], why: "Sahih al-Bukhari 1189." },
        { q: "How many masjids are named for travel?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "Al-Haram, his ﷺ masjid, and Al-Aqsa." },
        { q: "Al-Masjid al-Haram is in Makkah.", tf: true, why: "Around the Ka'bah." }
      ]
    },
    {
      slug: "thousand",
      title: "A thousand times better",
      line: "A prayer in his ﷺ masjid beats a thousand prayers elsewhere.",
      facts: ["Except Al-Masjid al-Haram"],
      source: hadith("bukhari", "1190", "Abu Hurairah", "Sahih", "One prayer in my masjid is better than a thousand prayers in any other masjid, except Al-Masjid al-Haram."),
      difficulty: 2,
      questions: [
        { q: "A prayer in his ﷺ masjid beats how many elsewhere?", a: "A thousand", wrong: ["Two", "Ten", "One"], why: "Sahih al-Bukhari 1190." },
        { q: "Which masjid is left out of that count?", a: "Al-Masjid al-Haram", wrong: ["Every masjid", "The local masjid", "None"], why: "Except Al-Masjid al-Haram." },
        { q: "His ﷺ masjid is in Madinah.", tf: true, why: "Al-Masjid an-Nabawi." }
      ]
    },
    {
      slug: "rawdah",
      title: "A garden of Jannah",
      line: "Between his ﷺ house and his minbar is a garden of Jannah.",
      facts: ["Called the Rawdah"],
      source: hadith("bukhari", "1196", "Abu Hurairah", "Sahih", "Between my house and my minbar is a garden of the gardens of Paradise, and my minbar is over my Pool."),
      difficulty: 2,
      questions: [
        { q: "What lies between his ﷺ house and his minbar?", a: "A garden of Jannah", wrong: ["A market", "A river", "A wall"], why: "Sahih al-Bukhari 1196." },
        { q: "What is a minbar?", a: "The pulpit for the khutbah", wrong: ["A prayer mat", "A water jug", "A lamp"], why: "He ﷺ gave khutbahs from it." },
        { q: "His ﷺ minbar is over his Pool, he said.", tf: true, why: "My minbar is over my Pool." }
      ]
    }
  ]
};

export const HAJJ_UNITS: DeepUnit[] = [UMRAH, HOUSE, MASJIDS];
