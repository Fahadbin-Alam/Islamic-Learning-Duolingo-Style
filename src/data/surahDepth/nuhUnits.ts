import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Nuh ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Nuh 71:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_71_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Nuh 71:${ayah}`,
    url: `https://quran.com/71:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 71:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q71 = (ayah: number) => quranQuote(71, ayah);


/** Ayahs 1 to 4: Nuh sent to warn his people, and the promise of forgiveness and a longer life. */
const NUH_ONE: DeepUnit = {
  key: "nuh1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-71",
  name: "Nuh, ayahs 1 to 4",
  kind: "skill",
  lessonType: "surah",
  surahName: "Nuh",
  lessons: [
    {
      slug: "sent-to-warn",
      title: "Sent to warn",
      line: "Allah sent Nuh to warn his people before punishment came.",
      facts: ["Nadhir: a warner", "Warning is a mercy"],
      quote: q71(1),
      source: ik(1, "Ibn Kathir says Allah sent Nuh to warn his people of Allah's punishment before it came, and told them repentance would lift it.", "He was to tell them that if they would repent and turn to Allah, then the punishment would be lifted from them"),
      difficulty: 1,
      questions: [
        { q: "Why was Nuh sent to his people?", a: "To warn them", wrong: ["To rule them", "To trade with them", "To build a city"], why: "Warn your people before there comes to them a painful torment." },
        { q: "What would happen if they repented?", a: "The punishment would be lifted", wrong: ["They would get gold", "Nothing at all", "They would rule others"], why: "If they would repent and turn to Allah, then the punishment would be lifted from them." },
        { tf: false, q: "Allah punished Nuh's people without any warning.", why: "He sent him to his people commanding him to warn them of the punishment of Allah before it befell them." }
      ]
    },
    {
      slug: "a-surah-for-one-story",
      title: "A surah for one story",
      line: "Surah Nuh tells only his story, for his long years of calling.",
      facts: ["As-Sa'di explains", "950 years of da'wah"],
      quote: q71(1),
      source: saadi(71, 1, "As-Sa'di says Allah told only the story of Nuh in Surah Nuh because he stayed so long among his people, calling them again and again to worship Allah alone.", "لم يذكر الله في هذه السورة سوى قصة نوح وحدها لطول لبثه في قومه"),
      difficulty: 1,
      questions: [
        { q: "Why does Surah Nuh tell only Nuh's story?", a: "He called his people so long", wrong: ["It is a short surah", "No other story fit", "It came first"], why: "Because of how long he stayed among them, says as-Sa'di." },
        { q: "What did Nuh keep calling his people to?", a: "Worship Allah alone", wrong: ["Build a city", "Fight a war", "Leave their land"], why: "He kept calling to tawhid and away from shirk." },
        { tf: true, q: "Nuh called his people again and again.", why: "As-Sa'di on 71:1." }
      ]
    },
    {
      slug: "a-plain-warner",
      title: "A clear warner",
      line: "Nuh said: I am a clear warner to you.",
      facts: ["Mubin: clear", "No hidden message"],
      quote: q71(2),
      source: ik(2, "Ibn Kathir says a plain warner means the warning is clear, making the matter apparent and clear.", "clarity of the warning, making the matter apparent and clear"),
      difficulty: 2,
      questions: [
        { q: "How did Nuh describe himself?", a: "A plain warner", wrong: ["A king", "A poet", "A merchant"], why: "He said: O my people! Verily, I am a plain warner to you." },
        { q: "What does plain mean, per Ibn Kathir?", a: "The warning is clear", wrong: ["He was poor", "He was quiet", "He was short"], why: "Meaning, clarity of the warning, making the matter apparent and clear." },
        { tf: true, q: "Prophets made their message clear and easy to see.", why: "Clarity of the warning, making the matter apparent and clear." }
      ]
    },
    {
      slug: "worship-fear-obey",
      title: "Worship, fear, obey",
      line: "Worship Allah, be mindful of Him, and obey His messenger.",
      facts: ["Ibadah: worship", "Taqwa: avoid what He forbids"],
      quote: q71(3),
      source: ik(3, "Ibn Kathir says Taqwa means leaving what Allah forbade and avoiding sin, and obeying Nuh in what he commanded and forbade.", "abandon those things that He has forbidden and avoid that which He has declared to be sinful"),
      difficulty: 2,
      questions: [
        { q: "What three things did Nuh call to?", a: "Worship, Taqwa and obey him", wrong: ["Trade, travel and rest", "Build, farm and sell", "Sing, dance and play"], why: "That you should worship Allah, and have Taqwa of Him, and obey me." },
        { q: "What does Taqwa mean, per Ibn Kathir?", a: "Leaving what Allah forbids", wrong: ["Eating less", "Sleeping more", "Speaking loudly"], why: "Abandon those things that He has forbidden and avoid that which He has declared to be sinful." },
        { tf: false, q: "Obeying a prophet means only listening, not acting.", why: "Obey me in that which I command you to do and that which I forbid you from." }
      ]
    },
    {
      slug: "forgiveness-and-respite",
      title: "Forgiven and given time",
      line: "Belief would bring forgiveness and a longer life.",
      facts: ["Maghfirah: forgiveness", "Obedience brings blessing"],
      quote: q71(4),
      source: ik(4, "Ibn Kathir says Allah would forgive their sins, extend their lives and protect them from the punishment.", "He will extend your life span and protect you from the torment"),
      difficulty: 2,
      questions: [
        { q: "What would Allah forgive if they believed?", a: "Their sins", wrong: ["Their debts to people", "Nothing", "Only small mistakes"], why: "He will forgive you of your sins." },
        { q: "What does respite to an appointed term mean?", a: "A longer life", wrong: ["A bigger house", "More enemies", "A shorter life"], why: "He will extend your life span and protect you from the torment." },
        { tf: true, q: "Some scholars use 71:4 to show obedience can lengthen life.", why: "This Ayah is used as proof by those who say that obedience, righteousness and maintaining the family ties truly increase the life span." }
      ]
    },
    {
      slug: "family-ties-and-life",
      title: "Family ties and long life",
      line: "Keeping good ties with relatives brings more provision and life.",
      facts: ["Silat ar-Rahim: family ties", "Visit and help relatives"],
      quote: q71(4),
      source: hadith("bukhari", "5986", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said whoever loves to have more wealth and a longer life should keep good relations with his relatives.", "then he should keep good relations with his Kith and kin"),
      difficulty: 2,
      questions: [
        { q: "What brings more wealth and life, per the hadith?", a: "Good ties with relatives", wrong: ["Moving far away", "Saving every coin", "Avoiding family"], why: "Whoever loves that he be granted more wealth and that his lease of life be prolonged then he should keep good relations with his Kith and kin." },
        { q: "Who narrated it?", a: "Anas ibn Malik", wrong: ["Umar", "Aishah", "Bilal"], why: "Narrated Anas bin Malik." },
        { tf: false, q: "Cutting off relatives brings barakah.", why: "Whoever loves that he be granted more wealth and that his lease of life be prolonged then he should keep good relations with his Kith and kin." }
      ]
    },
    {
      slug: "allahs-term-cannot-wait",
      title: "Allah's term cannot be delayed",
      line: "When Allah's set time comes, nothing can push it back.",
      facts: ["Ajal: appointed time", "Hurry to obey"],
      quote: q71(4),
      source: ik(4, "Ibn Kathir says it means hasten to obey Allah before His punishment comes, for if He commands it, it cannot be pushed back.", "hasten to the obedience"),
      difficulty: 3,
      questions: [
        { q: "Can Allah's term be delayed when it comes?", a: "No", wrong: ["Yes, easily", "Only by kings", "If people ask"], why: "Verily, the term of Allah when it comes, cannot be delayed, if you but know." },
        { q: "What lesson does Ibn Kathir draw?", a: "Hurry to obey Allah", wrong: ["Wait and see", "Delay repentance", "Ignore warnings"], why: "Means, hasten to the obedience of Allah before the coming of His vengeance." },
        { tf: false, q: "We can put off repentance safely until later.", why: "Hasten to the obedience of Allah before the coming of His vengeance. If He commands that to happen, it cannot be repulsed." }
      ]
    }
  ]
};

/** Ayahs 5 to 12: Nuh calling night and day, openly and in private, and the blessings of seeking forgiveness. */
const NUH_TWO: DeepUnit = {
  key: "nuh2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-71",
  name: "Nuh, ayahs 5 to 12",
  kind: "skill",
  lessonType: "surah",
  surahName: "Nuh",
  lessons: [
    {
      slug: "night-and-day",
      title: "Night and day",
      line: "Nuh called his people night and day, for 950 years.",
      facts: ["Never giving up", "Patience in dawah"],
      quote: q71(5),
      source: ik(5, "Ibn Kathir says Nuh was patient with his people for nine hundred and fifty years, calling them night and day.", "which was nine hundred and fifty years"),
      difficulty: 1,
      questions: [
        { q: "When did Nuh call his people?", a: "Night and day", wrong: ["Only on Fridays", "Once a year", "Only at dawn"], why: "O my Lord! Verily, I have called to my people night and day." },
        { q: "How long was Nuh patient with them?", a: "950 years", wrong: ["40 years", "100 years", "10 years"], why: "He was patient with them for this long period of time, which was nine hundred and fifty years." },
        { tf: true, q: "Nuh never stopped calling his people.", why: "I did not abandon calling them night and day, carrying out Your command." }
      ]
    },
    {
      slug: "calling-made-them-flee",
      title: "The more he called, the more they fled",
      line: "The more Nuh called, the more they ran from the truth.",
      facts: ["Firar: running away", "Hearts can be stubborn"],
      quote: q71(6),
      source: ik(6, "Ibn Kathir says the more Nuh called them to the truth, the more they fled from it and avoided it.", "the more I called them to come to the truth, the more they fled from it and avoided it"),
      difficulty: 2,
      questions: [
        { q: "What did his calling add to them?", a: "Only more flight", wrong: ["More faith", "More wealth", "More friends"], why: "But all my calling added nothing but to their flight." },
        { q: "What did they do as he called more?", a: "Fled and avoided it", wrong: ["Came closer", "Asked questions", "Wrote it down"], why: "The more I called them to come to the truth, the more they fled from it and avoided it." },
        { tf: false, q: "Nuh's people eagerly came to listen.", why: "The more I called them to come to the truth, the more they fled from it." }
      ]
    },
    {
      slug: "fingers-in-ears",
      title: "Fingers in their ears",
      line: "They blocked their ears and covered their heads.",
      facts: ["Refusing to listen", "Pride blocks truth"],
      quote: q71(7),
      source: ik(7, "Ibn Kathir says they closed their ears so they could not hear; Said bin Jubayr and As-Suddi said they covered their heads.", "they closed up their ears so that they could not hear what I was calling them to"),
      difficulty: 2,
      questions: [
        { q: "What did they put in their ears?", a: "Their fingers", wrong: ["Cotton", "Flowers", "Nothing"], why: "They thrust their fingers into their ears, covered themselves up with their garments." },
        { q: "Why did they cover their heads?", a: "So they could not hear", wrong: ["Because of the cold", "To sleep", "To pray"], why: "Said bin Jubayr and As-Suddi both said, They covered their heads so that they could not hear what he was saying." },
        { tf: true, q: "Their refusal came from pride.", why: "And magnified themselves in pride, meaning, they were turned away from following the truth and submitting to it." }
      ]
    },
    {
      slug: "every-way-of-calling",
      title: "Every way of calling",
      line: "Nuh called them in public and also quietly in private.",
      facts: ["Use many good ways", "Wisdom in dawah"],
      quote: q71(9),
      source: ik(9, "Ibn Kathir says Nuh called them openly with a raised voice and also in private discussions, trying many ways to reach them.", "So he tried various types of propagation to be more effective with them"),
      difficulty: 3,
      questions: [
        { q: "How did Nuh call them in 71:8-9?", a: "Openly and in private", wrong: ["Only by letter", "Only in secret", "Only once"], why: "Then verily, I proclaimed to them in public, and I have appealed to them in private." },
        { q: "Why did he use different ways?", a: "To be more effective", wrong: ["To confuse them", "To save time", "By accident"], why: "So he tried various types of propagation to be more effective with them." },
        { tf: false, q: "Nuh only ever spoke to his people in one way.", why: "He tried various types of propagation to be more effective with them." }
      ]
    },
    {
      slug: "ask-forgiveness",
      title: "Ask your Lord's forgiveness",
      line: "Nuh said: ask forgiveness, for Allah is Oft-Forgiving.",
      facts: ["Istighfar: asking forgiveness", "Al-Ghaffar: Oft-Forgiving"],
      quote: q71(10),
      source: ik(10, "Ibn Kathir says Allah is Most Accepting of repentance and accepts it no matter what the sin is.", "He will accept repentance no matter what the sin is"),
      difficulty: 1,
      questions: [
        { q: "What did Nuh tell them to do in 71:10?", a: "Ask forgiveness from their Lord", wrong: ["Build a tower", "Leave the town", "Fight their neighbors"], why: "I said: Ask forgiveness from your Lord, verily, He is Oft-Forgiving." },
        { q: "Which sins can Allah forgive with repentance?", a: "Any sin", wrong: ["Only small ones", "None", "Only old ones"], why: "He will accept repentance no matter what the sin is, even if it is disbelief and polytheism." },
        { tf: false, q: "Some people are too sinful to repent.", why: "He will accept repentance no matter what the sin is." }
      ]
    },
    {
      slug: "seventy-times-a-day",
      title: "Seventy times a day",
      line: "The Prophet ﷺ asked forgiveness more than seventy times a day.",
      facts: ["Astaghfirullah", "Make it a habit"],
      quote: q71(10),
      source: hadith("bukhari", "6307", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: By Allah, I ask Allah for forgiveness and turn to Him in repentance more than seventy times a day.", "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day"),
      difficulty: 2,
      questions: [
        { q: "How often did the Prophet ﷺ ask forgiveness?", a: "Over seventy times a day", wrong: ["Once a year", "Once a week", "Never"], why: "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day." },
        { q: "What else did he do with it?", a: "Turned to Allah in repentance", wrong: ["Boasted", "Rested", "Traded"], why: "I ask for forgiveness from Allah and turn to Him in repentance." },
        { tf: true, q: "Asking forgiveness often is the Sunnah.", why: "I ask for forgiveness from Allah and turn to Him in repentance more than seventy times a day." }
      ]
    },
    {
      slug: "rain-from-istighfar",
      title: "Rain from forgiveness",
      line: "Seeking forgiveness brings rain in abundance.",
      facts: ["Midrar: steady rain", "Istighfar opens the sky"],
      quote: q71(11),
      source: ik(11, "Ibn Kathir says Umar prayed for rain only by asking forgiveness and reciting these ayahs, saying he sought rain with the keys of the sky.", "Verily, I have sought rain with the keys of the sky which cause the rain to descend"),
      difficulty: 2,
      questions: [
        { q: "What does Midrar mean?", a: "Continuous rain", wrong: ["Hot wind", "Snow", "Dry land"], why: "He will send rain to you Midrar, meaning, continuous rain." },
        { q: "What did Umar do when praying for rain?", a: "Asked Allah for forgiveness", wrong: ["Danced", "Sacrificed a camel", "Lit a fire"], why: "He did not do more than seeking Allah's forgiveness and reciting the Ayat that mention seeking Allah's forgiveness." },
        { tf: true, q: "Umar called istighfar the keys of the sky.", why: "Verily, I have sought rain with the keys of the sky which cause the rain to descend." }
      ]
    },
    {
      slug: "wealth-children-gardens",
      title: "Wealth, children and gardens",
      line: "Istighfar brings more wealth, children, gardens and rivers.",
      facts: ["Blessings follow repentance", "Allah is generous"],
      quote: q71(12),
      source: ik(12, "Ibn Kathir says if they repent and obey, Allah will increase their provision, wealth and children, and give gardens with rivers.", "He will increase your provisions for you"),
      difficulty: 2,
      questions: [
        { q: "What does 71:12 promise?", a: "Wealth, children, gardens, rivers", wrong: ["Gold only", "Nothing", "Long nights"], why: "And give you increase in wealth and children, and bestow on you gardens and bestow on you rivers." },
        { q: "What brings these blessings, per Ibn Kathir?", a: "Repenting and obeying Allah", wrong: ["Luck", "Hard work alone", "Magic"], why: "If you repent to Allah, seek His forgiveness and obey Him, He will increase your provisions for you." },
        { tf: false, q: "Repentance has nothing to do with blessings in this life.", why: "If you repent to Allah, seek His forgiveness and obey Him, He will increase your provisions for you." }
      ]
    },
    {
      slug: "best-istighfar",
      title: "The best istighfar",
      line: "Sayyid al-Istighfar is the best way to ask forgiveness.",
      facts: ["Allahumma anta Rabbi", "Morning and evening"],
      quote: q71(10),
      source: hadith("bukhari", "6306", "Shaddad ibn Aws", "Sahih", "The Prophet ﷺ taught the best way to ask forgiveness: Allahumma anta Rabbi la ilaha illa anta, and said whoever says it with firm faith and dies that day is of the people of Paradise.", "The most superior way of asking for forgiveness from Allah is"),
      difficulty: 3,
      questions: [
        { q: "How does Sayyid al-Istighfar begin?", a: "Allahumma anta Rabbi", wrong: ["Bismillah", "Subhanallah", "Alhamdulillah"], why: "The most superior way of asking for forgiveness from Allah is: Allahumma anta Rabbi la ilaha illa anta." },
        { q: "What is promised to one who says it with faith and dies that day?", a: "He is of the people of Paradise", wrong: ["More wealth", "A long trip", "Nothing"], why: "If somebody recites it during the day with firm faith in it, and dies on the same day before the evening, he will be from the people of Paradise." },
        { tf: true, q: "The best istighfar can be said in the day and at night.", why: "If somebody recites it during the day with firm faith, or recites it at night with firm faith, he will be from the people of Paradise." }
      ]
    }
  ]
};

/** Ayahs 13 to 20: Nuh points his people to Allah's greatness in creation. */
const NUH_THREE: DeepUnit = {
  key: "nuh3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-71",
  name: "Nuh, ayahs 13 to 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Nuh",
  lessons: [
    {
      slug: "no-respect-for-allah",
      title: "Why not honor Allah?",
      line: "What is wrong with you that you do not honor Allah's majesty?",
      facts: ["Waqar: majesty", "Give Allah His due"],
      quote: q71(13),
      source: ik(13, "Ibn Abbas, Mujahid and Ad-Dahhak said Waqar means great majesty; Ibn Abbas said they did not honor Allah as He deserves.", "you do not fear His punishment and His vengeance"),
      difficulty: 2,
      questions: [
        { q: "What does Waqar mean, per Ibn Abbas?", a: "Great majesty", wrong: ["Small gift", "Long road", "Fresh water"], why: "Meaning, great majesty. This has been said by Ibn Abbas, Mujahid and Ad-Dahhak." },
        { q: "What were they failing to do?", a: "Honor Allah as He deserves", wrong: ["Build houses", "Plant trees", "Count stars"], why: "That you all do not magnify Allah in the proper manner that He deserves to be magnified." },
        { tf: false, q: "Nuh's people honored Allah properly.", why: "That you all do not magnify Allah in the proper manner that He deserves to be magnified." }
      ]
    },
    {
      slug: "created-in-stages",
      title: "Created in stages",
      line: "Allah created each person in stages, one after another.",
      facts: ["Atwar: stages", "Allah shapes us"],
      quote: q71(14),
      source: ik(13, "Ibn Kathir explains Nuh first encouraged them, then balanced it with a warning, asking why they did not honor Allah who created them.", "This is the position of the invitation with encouragement"),
      difficulty: 2,
      questions: [
        { q: "How did Allah create us, per 71:14?", a: "In stages", wrong: ["All at once", "By chance", "From stone"], why: "While He has created you in Atwar, stages." },
        { q: "How did Nuh balance his call?", a: "Encouragement and warning", wrong: ["Jokes and games", "Threats only", "Silence"], why: "This is the position of the invitation with encouragement. Then He made it balanced for them by using intimidation." },
        { tf: true, q: "Our creation in stages is a sign of Allah's power.", why: "What is the matter with you, that you do not hope for any Waqar from Allah, while He has created you in stages?" }
      ]
    },
    {
      slug: "seven-heavens",
      title: "Seven heavens in layers",
      line: "Allah created seven heavens, one above another.",
      facts: ["Tibaqa: in layers", "Look up and reflect"],
      quote: q71(15),
      source: ik(15, "Ibn Kathir says seven heavens in tiers means one above another.", "See you not how Allah has created the seven heavens in tiers"),
      difficulty: 1,
      questions: [
        { q: "How many heavens are mentioned in 71:15?", a: "Seven", wrong: ["Three", "Five", "Ten"], why: "See you not how Allah has created the seven heavens in tiers?" },
        { q: "What does in tiers mean?", a: "One above another", wrong: ["Side by side", "Mixed up", "Under the earth"], why: "Meaning, one above another." },
        { tf: false, q: "The heavens were made by chance.", why: "See you not how Allah has created the seven heavens in tiers?" }
      ]
    },
    {
      slug: "moon-light-sun-lamp",
      title: "Moon a light, sun a lamp",
      line: "The moon gives light and the sun is a bright lamp.",
      facts: ["Nur: light", "Siraj: a lamp"],
      quote: q71(16),
      source: ik(16, "Ibn Kathir says Allah gave the sun and moon different light, so night and day, months and years may be known, as in 10:5.", "so that the night and day may be known"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make the sun?", a: "A lamp", wrong: ["A mirror", "A stone", "A cloud"], why: "And has made the moon a light therein, and made the sun a lamp." },
        { q: "Why are they different, per Ibn Kathir?", a: "To know night, day and months", wrong: ["For decoration only", "To scare people", "No reason"], why: "He made each one of them in a set manner with a distinct quality so that the night and day may be known. This shows the passing of months and years." },
        { tf: true, q: "The moon's phases help us count months.", why: "He made its light vary so that sometimes it increases, then it begins to decrease. This shows the passing of months and years." }
      ]
    },
    {
      slug: "from-the-earth",
      title: "From the earth and back",
      line: "From the earth we came, to it we return, then rise.",
      facts: ["From earth we came", "Resurrection is sure"],
      quote: q71(18),
      source: ik(18, "Ibn Kathir says Allah returns us to the earth when we die, and on the Day of Judgement repeats our creation as He first made it.", "on the Day of Judgement He will repeat your creation just as He first originated you"),
      difficulty: 2,
      questions: [
        { q: "From what did Allah bring us forth, per 71:17?", a: "The earth", wrong: ["The sea", "The sky", "Fire"], why: "And Allah has brought you forth from the dust of earth." },
        { q: "What happens on the Day of Judgement?", a: "Allah brings us out again", wrong: ["We stay in the earth", "We become stars", "Nothing"], why: "On the Day of Judgement He will repeat your creation just as He first originated you." },
        { tf: false, q: "Once people return to the earth, they are never brought out.", why: "And bring you forth, meaning, on the Day of Judgement He will repeat your creation." }
      ]
    },
    {
      slug: "earth-spread-out",
      title: "The earth spread out",
      line: "Allah spread the earth wide so we can travel its broad roads.",
      facts: ["Bisat: a wide spread", "Travel is a blessing"],
      quote: q71(19),
      source: ik(19, "Ibn Kathir says Allah spread the earth out, leveled it and steadied it with mountains, so we can live and travel wherever we wish.", "He spread it out, leveled it, settled it, and stabilized it with firm and lofty mountains"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make the earth, per 71:19?", a: "A wide expanse", wrong: ["A small island", "A tall tower", "A deep well"], why: "And Allah has made for you the earth a wide expanse." },
        { q: "Why are there broad roads?", a: "So we can travel", wrong: ["To hide treasure", "For animals only", "No reason"], why: "He created it so that you may settle in it and travel in it wherever you wish." },
        { tf: true, q: "Mountains help keep the earth steady.", why: "He spread it out, leveled it, settled it, and stabilized it with firm and lofty mountains." }
      ]
    },
    {
      slug: "so-worship-him-alone",
      title: "So worship Him alone",
      line: "The Creator of sky and earth alone deserves our worship.",
      facts: ["Tawhid: Allah is One", "He has no partner"],
      quote: q71(20),
      source: ik(20, "Ibn Kathir says since Allah made the heaven a building and the earth a bed, He alone must be worshipped with no partner.", "Therefore, He is the One Who it is obligatory to worship"),
      difficulty: 3,
      questions: [
        { q: "What was Nuh showing with these signs?", a: "Allah's power and greatness", wrong: ["His own strength", "The power of idols", "Old stories"], why: "All of this is from what Nuh informed them of concerning Allah's power and His greatness in creating the heavens and the earth." },
        { q: "What follows from Allah being the Creator?", a: "He alone must be worshipped", wrong: ["Idols share worship", "Nothing", "We may worship anyone"], why: "Therefore, He is the One Who it is obligatory to worship, and accept as One God." },
        { tf: false, q: "Allah has a partner or an advisor.", why: "He has no equal, peer, rival, coequal, mate, son, minister or advisor." }
      ]
    }
  ]
};

/** Ayahs 21 to 28: the people follow their chiefs and idols, the flood, and Nuh's dua for the believers. */
const NUH_FOUR: DeepUnit = {
  key: "nuh4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-71",
  name: "Nuh, ayahs 21 to 28",
  kind: "skill",
  lessonType: "surah",
  surahName: "Nuh",
  lessons: [
    {
      slug: "followed-the-wealthy",
      title: "They followed the wealthy",
      line: "They followed rich men whose wealth only hurt them.",
      facts: ["Wealth can be a test", "Follow truth, not riches"],
      quote: q71(21),
      source: ik(21, "Ibn Kathir says their wealth and children were a gradual punishment and a short respite, not an honor or a blessing.", "were also for gradual punishment and temporary respite, not for honor or blessing"),
      difficulty: 2,
      questions: [
        { q: "Whom did they follow instead of Nuh?", a: "Men of wealth and children", wrong: ["Other prophets", "The poor", "Scholars"], why: "And followed one whose wealth and children give him no increase but loss." },
        { q: "What were those riches, per Ibn Kathir?", a: "A gradual punishment", wrong: ["An honor", "A reward", "A blessing"], why: "These things were also for gradual punishment and temporary respite, not for honor or blessing." },
        { tf: false, q: "Having wealth always means Allah is pleased with you.", why: "These things were also for gradual punishment and temporary respite, not for honor or blessing." }
      ]
    },
    {
      slug: "a-mighty-plot",
      title: "A mighty plot",
      line: "The leaders tricked their followers with big plots.",
      facts: ["Makr: a plot", "Leaders who mislead"],
      quote: q71(22),
      source: ik(22, "Ibn Kathir says they plotted a deceptive plot, tricking their followers into believing they followed the truth.", "they plotted a deceptive plot for their followers tricking them into believing that they were following the truth"),
      difficulty: 2,
      questions: [
        { q: "What did the leaders do in 71:22?", a: "Plotted a mighty plot", wrong: ["Built a ship", "Fed the poor", "Asked forgiveness"], why: "And they have plotted a mighty plot." },
        { q: "How did the plot work?", a: "Tricking followers into false belief", wrong: ["Stealing gold", "Burning crops", "Hiding water"], why: "They plotted a deceptive plot for their followers tricking them into believing that they were following the truth." },
        { tf: true, q: "Followers will blame their leaders on the Day of Judgement.", why: "Nay, but it was your plotting by night and day: when you ordered us to disbelieve in Allah. (34:33)" }
      ]
    },
    {
      slug: "names-of-the-idols",
      title: "Names of the idols",
      line: "They said: do not leave Wadd, Suwa, Yaghuth, Yauq and Nasr.",
      facts: ["Five idols named", "Shirk: worshipping others"],
      quote: q71(23),
      source: ik(23, "Ibn Kathir says Wadd, Suwa, Yaghuth, Yauq and Nasr are the names of the idols they worshipped besides Allah.", "These are the names of their idols which they used to worship besides Allah"),
      difficulty: 2,
      questions: [
        { q: "What were Wadd and Suwa?", a: "Idols of Nuh's people", wrong: ["Rivers", "Kings", "Cities"], why: "These are the names of their idols which they used to worship besides Allah." },
        { q: "Which is NOT one of the five idols?", a: "Hubal", wrong: ["Wadd", "Yaghuth", "Nasr"], why: "Nor shall you leave Wadd, nor Suwa, nor Yaghuth, and Yauq and Nasr." },
        { tf: false, q: "Nuh's people told each other to leave their idols.", why: "And they have said: You shall not leave your gods." }
      ]
    },
    {
      slug: "how-idols-began",
      title: "How the idols began",
      line: "The idols were named after righteous men who had died.",
      facts: ["Honoring is not worship", "Shaytan's slow trick"],
      quote: q71(23),
      source: hadith("bukhari", "4920", "Ibn Abbas", "Sahih", "Ibn Abbas said the names of the idols belonged to pious men of Nuh's people; after they died, Satan inspired people to set up statues where they sat.", "formerly belonged to some pious men"),
      difficulty: 3,
      questions: [
        { q: "Whose names did the idols carry?", a: "Pious men of Nuh's people", wrong: ["Kings of Egypt", "Angels", "Animals"], why: "The names of the idols formerly belonged to some pious men of the people of Nuh." },
        { q: "Who whispered to make the statues?", a: "Satan", wrong: ["Nuh", "The pious men", "Angels"], why: "When they died Satan inspired their people to prepare and place idols at the places where they used to sit." },
        { tf: true, q: "The idols of Nuh's people were later worshipped by Arabs.", why: "All the idols which were worshiped by the people of Nuh were worshiped by the Arabs later on." }
      ]
    },
    {
      slug: "when-knowledge-was-lost",
      title: "When knowledge was lost",
      line: "Statues were worshipped once true knowledge was forgotten.",
      facts: ["Knowledge protects faith", "Small steps lead astray"],
      quote: q71(23),
      source: ik(23, "Ibn Kathir quotes Ibn Abbas: the statues were not worshipped until the builders had died and the knowledge was lost.", "were not worshipped until after those people"),
      difficulty: 3,
      questions: [
        { q: "When did people start worshipping the statues?", a: "After knowledge was lost", wrong: ["The same day", "Before the men died", "Never"], why: "These statues were not worshipped until after those people had died and the knowledge was lost." },
        { q: "What did Iblis later tell people?", a: "Their elders worshipped them", wrong: ["Break them", "Ignore them", "Sell them"], why: "Iblis approached them and said, They used to worship these statues and they were granted rain by their worship of them." },
        { tf: false, q: "Losing knowledge of the religion is harmless.", why: "These statues were not worshipped until after those people had died and the knowledge was lost. Then, those statues were later worshipped." }
      ]
    },
    {
      slug: "led-many-astray",
      title: "Many were led astray",
      line: "Idols misled many people across many generations.",
      facts: ["Shirk spreads", "Ask Allah to keep you safe"],
      quote: q71(24),
      source: ik(24, "Ibn Kathir says idol worship continued through many generations, and quotes Ibrahim asking Allah to keep him and his sons away from idols.", "the worship of those idols continued throughout many generations"),
      difficulty: 2,
      questions: [
        { q: "How long did the worship of those idols go on?", a: "Many generations", wrong: ["One day", "One year", "It never began"], why: "The worship of those idols continued throughout many generations until our times today." },
        { q: "What did Ibrahim ask Allah?", a: "Keep me and my sons from idols", wrong: ["Give me gold", "Make me king", "Give me a ship"], why: "And keep me and my sons away from worshipping idols. (14:35)" },
        { tf: true, q: "We can ask Allah to protect us from shirk.", why: "And keep me and my sons away from worshipping idols. (14:35)" }
      ]
    },
    {
      slug: "drowned-for-their-sins",
      title: "Because of their sins",
      line: "Because of their many sins, Nuh's people were drowned.",
      facts: ["Sins have results", "Allah's justice"],
      quote: q71(25),
      source: ik(25, "Ibn Kathir says they were drowned for their many sins, rebellion, persistence in disbelief and opposing their Messengers.", "for their numerous sins, rebellion, persistence in disbelief and opposition to their Messengers"),
      difficulty: 2,
      questions: [
        { q: "Why were Nuh's people drowned?", a: "Because of their sins", wrong: ["By chance", "Because of a storm only", "For being poor"], why: "Because of their sins they were drowned." },
        { q: "Which wrong is named by Ibn Kathir?", a: "Opposing their Messengers", wrong: ["Planting trees", "Building ships", "Trading"], why: "For their numerous sins, rebellion, persistence in disbelief and opposition to their Messengers." },
        { tf: false, q: "The flood came without any reason.", why: "Because of their sins they were drowned." }
      ]
    },
    {
      slug: "none-to-help-them",
      title: "None to help them",
      line: "They found no helper against Allah, as Nuh's son also learned.",
      facts: ["Only Allah saves", "Mercy is from Him"],
      quote: q71(25),
      source: ik(25, "Ibn Kathir says they had no helper or savior against Allah, as in 11:43: no savior today except whom He has mercy on.", "they will have no helper, assistant, or savior"),
      difficulty: 3,
      questions: [
        { q: "Who could help them against Allah?", a: "No one", wrong: ["Their idols", "Their leaders", "Their tribe"], why: "And they found none to help them instead of Allah." },
        { q: "What did Nuh tell his son in 11:43?", a: "No savior except by His mercy", wrong: ["Climb higher", "Swim faster", "Hide in a cave"], why: "This day there is no savior from the decree of Allah except him on whom He has mercy. (11:43)" },
        { tf: true, q: "The believers with Nuh in the ship were saved.", why: "Allah saved the people of the ship who believed with Nuh." }
      ]
    },
    {
      slug: "nuhs-dua",
      title: "Nuh's dua",
      line: "After 950 years, Nuh knew they would only mislead others.",
      facts: ["Allah answered Nuh", "Patience before dua"],
      quote: q71(27),
      source: ik(27, "Ibn Kathir says Nuh said this because of what he knew of them, having lived among them for nine hundred and fifty years.", "since he remained among them for nine hundred and fifty years"),
      difficulty: 3,
      questions: [
        { q: "What did Nuh fear if they remained?", a: "They would mislead Allah's servants", wrong: ["They would get rich", "They would leave", "They would build"], why: "If You leave them, they will mislead Your servants." },
        { q: "Why did Nuh know this about them?", a: "He lived with them 950 years", wrong: ["He guessed", "He read a book", "A dream"], why: "He said this due to what he knew about them since he remained among them for nine hundred and fifty years." },
        { tf: false, q: "Nuh made this dua on the first day he called them.", why: "He said this due to what he knew about them since he remained among them for nine hundred and fifty years." }
      ]
    },
    {
      slug: "forgive-me-and-my-parents",
      title: "Forgive me and my parents",
      line: "Nuh prayed for himself, his parents and all believers.",
      facts: ["Dua for parents", "Dua for all believers"],
      quote: q71(28),
      source: ik(28, "Ibn Kathir says Nuh prayed for all believing men and women, living and dead, and it is recommended to pray like this.", "He supplicated for all of the believing men and women, and that includes those of them who were living and those of them who were dead"),
      difficulty: 2,
      questions: [
        { q: "For whom did Nuh ask forgiveness first?", a: "Himself and his parents", wrong: ["His enemies", "His idols", "No one"], why: "My Lord! Forgive me, and my parents." },
        { q: "Who else is in Nuh's dua?", a: "All believing men and women", wrong: ["Only his family", "Only the living", "Only scholars"], why: "And all the believing men and women." },
        { tf: true, q: "Praying for all believers like Nuh did is recommended.", why: "For this reason, it is recommended to supplicate like this, in following the example of Nuh." }
      ]
    },
    {
      slug: "parents-come-first",
      title: "Parents come first",
      line: "Nuh named his parents in his dua, as their right is great.",
      facts: ["As-Sa'di explains", "Then all believers"],
      quote: q71(28),
      source: saadi(71, 28, "As-Sa'di says Nuh named himself, his parents and those who entered his home first because their right is stronger, then he made dua for all believers.", "خص المذكورين لتأكد حقهم وتقديم برهم"),
      difficulty: 2,
      questions: [
        { q: "Why did Nuh name his parents in his dua?", a: "Their right is great", wrong: ["They were prophets", "By chance", "They asked him"], why: "Their right is stronger and their kindness comes first, says as-Sa'di." },
        { q: "After them, whom did Nuh pray for?", a: "All believers", wrong: ["Only himself", "No one", "Only his ship"], why: "Then he made the dua general for all believers." },
        { tf: true, q: "Making dua for our parents is part of kindness to them.", why: "As-Sa'di on 71:28." }
      ]
    },
    {
      slug: "a-child-who-prays",
      title: "A child who prays",
      line: "A good child's dua keeps helping parents after they die.",
      facts: ["Sadaqah Jariyah", "Pray for your parents"],
      quote: q71(28),
      source: hadith("muslim", "1631", "Abu Hurairah", "Sahih", "The Prophet ﷺ said when a person dies his deeds end except three: ongoing charity, beneficial knowledge, or a righteous child who prays for him.", "a pious son, who prays for him"),
      difficulty: 2,
      questions: [
        { q: "How many deeds continue after death?", a: "Three", wrong: ["One", "Five", "None"], why: "When a man dies, his acts come to an end, but three." },
        { q: "Which is one of them?", a: "A child who prays for him", wrong: ["His house", "His clothes", "His fame"], why: "Recurring charity, or knowledge by which people benefit, or a pious son, who prays for him." },
        { tf: false, q: "Dua for parents stops helping them after they die.", why: "A pious son, who prays for him, for the deceased." }
      ]
    },
    {
      slug: "him-who-enters-my-home",
      title: "Whoever enters my home",
      line: "Nuh prayed for every believer who entered his home.",
      facts: ["Bayt: home", "Good company"],
      quote: q71(28),
      source: ik(28, "Ad-Dahhak said my home means my masjid; Ibn Kathir says the apparent meaning is every believer who entered his house.", "supplicated for every person who entered his house who was a believer"),
      difficulty: 3,
      questions: [
        { q: "What did Ad-Dahhak say my home means?", a: "My masjid", wrong: ["My ship", "My farm", "My tent"], why: "Ad-Dahhak said, This means, my Masjid." },
        { q: "What is the apparent meaning, per Ibn Kathir?", a: "Every believer entering his house", wrong: ["Only his sons", "Only guests", "No one"], why: "He supplicated for every person who entered his house who was a believer." },
        { tf: true, q: "Surah Nuh ends with Nuh's dua.", why: "My Lord! Forgive me, and my parents, and him who enters my home as a believer, and all the believing men and women." }
      ]
    }
  ]
};

export const NUH_UNITS: readonly DeepUnit[] = [NUH_ONE, NUH_TWO, NUH_THREE, NUH_FOUR];
