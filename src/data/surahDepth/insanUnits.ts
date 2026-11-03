import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Insan ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Insan 76:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_76_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Insan 76:${ayah}`,
    url: `https://quran.com/76:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 76:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q76 = (ayah: number) => quranQuote(76, ayah);


/** Ayahs 1 to 6: man made from nothing, tested, shown the way, and the drink of the righteous. */
const INSAN_ONE: DeepUnit = {
  key: "insan1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-76",
  name: "Al-Insan, ayahs 1-6",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Insan",
  lessons: [
    {
      slug: "friday-fajr-surah",
      title: "A Friday Fajr surah",
      line: "The Prophet ﷺ recited Al-Insan in Fajr on Fridays.",
      facts: ["With As-Sajdah", "A Sunnah for Friday Fajr"],
      quote: q76(1),
      source: hadith("bukhari", "891", "Abu Hurairah", "Sahih", "The Prophet ﷺ used to recite Alif Lam Mim Tanzil, As-Sajdah, and Hal ata ala al-Insan in the Fajr prayer on Friday.", "used to recite the following in the Fajr prayer of Friday"),
      difficulty: 1,
      questions: [
        { q: "In which prayer did he recite Al-Insan?", a: "Fajr on Friday", wrong: ["Isha on Monday", "Maghrib on Sunday", "Asr on Thursday"], why: "The Prophet ﷺ used to recite the following in the Fajr prayer of Friday." },
        { q: "Which surah did he recite with it?", a: "As-Sajdah", wrong: ["Al-Baqarah", "Yasin", "Al-Mulk"], why: "Alif, Lam, Mim, Tanzil, Surat As-Sajdah, and Hal ata ala al-Insan." },
        { tf: true, q: "Al-Insan begins with Has there not been over man a period of time.", why: "Has there not been over man a period of time, when he was not a thing worth mentioning?" }
      ]
    },
    {
      slug: "not-a-thing-mentioned",
      title: "Not a thing mentioned",
      line: "There was a time when man was nothing worth mentioning.",
      facts: ["Allah brought us into being", "Humility before Allah"],
      quote: q76(1),
      source: ik(1, "Ibn Kathir says Allah brought man into existence after he was not even a thing worth mentioning, due to his weakness.", "He brought man into existence after he was not even a thing worth mentioning"),
      difficulty: 1,
      questions: [
        { q: "What was man before Allah created him?", a: "Not a thing worth mentioning", wrong: ["A great king", "A star", "An angel"], why: "He brought man into existence after he was not even a thing worth mentioning." },
        { q: "Why was he not worth mentioning, per Ibn Kathir?", a: "His lowliness and weakness", wrong: ["His great size", "His wealth", "His noise"], why: "Due to his lowliness and weakness." },
        { tf: false, q: "Man has always existed.", why: "Has there not been over man a period of time, when he was not a thing worth mentioning?" }
      ]
    },
    {
      slug: "made-to-be-tested",
      title: "Made to be tested",
      line: "Allah gave us hearing and sight to test how we use them.",
      facts: ["Ibtila': a test", "Ayah 67:2"],
      quote: q76(2),
      source: ik(2, "Ibn Kathir says Allah created man to test him, and gave him hearing and sight to use in obeying or disobeying.", "the faculties of hearing and sight so that he would be able to use them for obedience and disobedience"),
      difficulty: 2,
      questions: [
        { q: "Why did Allah create man, per 76:2?", a: "To try him", wrong: ["To rest", "To build cities only", "To play"], why: "Verily, We have created man from Nutfah Amshaj, in order to try him." },
        { q: "What two gifts does 76:2 name?", a: "Hearing and sight", wrong: ["Gold and silver", "Hands and feet", "Food and drink"], why: "So, We made him hearer and seer." },
        { tf: true, q: "Ayah 67:2 also says Allah tests which of us does best.", why: "That He may test you which of you is best in deed. (67:2)" }
      ]
    },
    {
      slug: "shown-the-way",
      title: "Shown the way",
      line: "Allah showed man the way; he is grateful or ungrateful.",
      facts: ["Shakir: grateful", "Kufr: ingratitude"],
      quote: q76(3),
      source: ik(3, "Ibn Kathir says Allah explained the way to man and made it clear; he then chooses to be grateful or ungrateful.", "We explained it to him, made it clear to him and showed it to him"),
      difficulty: 2,
      questions: [
        { q: "What did Allah do for man, per 76:3?", a: "Guided him to the way", wrong: ["Hid the way", "Left him alone", "Made him a king"], why: "Verily, We guided him to the way." },
        { q: "What two paths did Allah explain, per Ibn Kathir?", a: "Good and evil", wrong: ["East and west", "Land and sea", "Day and night"], why: "We explained to him the path of good and the path of evil." },
        { tf: true, q: "After being shown the way, man is grateful or ungrateful.", why: "Whether he be grateful or ungrateful." }
      ]
    },
    {
      slug: "selling-your-soul-each-morning",
      title: "Every morning a trade",
      line: "Each day we free our souls by good, or ruin them.",
      facts: ["Every day is a choice", "Prayer is a light"],
      quote: q76(3),
      source: hadith("muslim", "223", "Abu Malik al-Ash'ari", "Sahih", "The Prophet ﷺ said all people go out in the morning and sell themselves, setting themselves free or destroying themselves.", "All men go out early in the morning and sell themselves"),
      difficulty: 2,
      questions: [
        { q: "What do all people do each morning?", a: "Sell themselves", wrong: ["Sleep in", "Count stars", "Stay silent"], why: "All men go out early in the morning and sell themselves." },
        { q: "What two results does the hadith name?", a: "Freeing or ruining themselves", wrong: ["Winning or tying", "Eating or fasting", "Walking or riding"], why: "Thereby setting themselves free or destroying themselves." },
        { q: "What does the same hadith call prayer?", a: "A light", wrong: ["A burden", "A game", "A wall"], why: "And prayer is a light, and charity is proof of one's faith." }
      ]
    },
    {
      slug: "a-cup-mixed-with-kafur",
      title: "A cup mixed with Kafur",
      line: "The righteous drink a cool, fragrant cup in Jannah.",
      facts: ["Abrar: the righteous", "Kafur: camphor"],
      quote: q76(5),
      source: ik(5, "Ibn Kathir says Kafur is known for being cooling and fragrant, and its taste will be delicious in Paradise.", "cooling, having a nice fragrance and in addition to this its taste will be delicious in Paradise"),
      difficulty: 1,
      questions: [
        { q: "Who drinks the cup mixed with Kafur?", a: "The Abrar, the righteous", wrong: ["The proud", "The lazy", "The liars"], why: "Verily, the Abrar, righteous believers, shall drink of a cup mixed with Kafur." },
        { q: "What is Kafur known for?", a: "Cooling and fragrance", wrong: ["Being bitter", "Being salty", "Being heavy"], why: "Cooling, having a nice fragrance and in addition to this its taste will be delicious in Paradise." },
        { tf: false, q: "The drinks of Jannah will taste plain.", why: "Its taste will be delicious in Paradise." }
      ]
    },
    {
      slug: "a-spring-they-direct",
      title: "A spring they direct",
      line: "Allah's servants make the spring flow wherever they wish.",
      facts: ["Tafjir: making it gush", "From their own homes"],
      quote: q76(6),
      source: ik(6, "Ibn Kathir says they will make the spring flow to their castles and homes; Ath-Thawri said wherever they wish.", "They will cause it to flow wherever they wish"),
      difficulty: 2,
      questions: [
        { q: "Who drinks from the spring, per 76:6?", a: "The servants of Allah", wrong: ["The kings", "The poets", "The traders"], why: "A spring wherefrom the servants of Allah will drink, causing it to gush forth abundantly." },
        { q: "Where can they make it flow, per Ath-Thawri?", a: "Wherever they wish", wrong: ["Only downhill", "Only on Fridays", "Nowhere"], why: "Ath-Thawri said, They will cause it to flow wherever they wish." },
        { tf: true, q: "They can reach the spring from their own castles and homes.", why: "They will have access to it from their castles, their homes, their sitting rooms and their residences." }
      ]
    }
  ]
};

/** Ayahs 7 to 12: the deeds of the righteous: vows, feeding others, sincerity, and patience. */
const INSAN_TWO: DeepUnit = {
  key: "insan2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-76",
  name: "Al-Insan, ayahs 7-12",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Insan",
  lessons: [
    {
      slug: "keeping-vows",
      title: "Keeping vows",
      line: "The righteous keep their promises of obedience to Allah.",
      facts: ["Nadhr: a vow", "Only vow to obey Allah"],
      quote: q76(7),
      source: hadith("bukhari", "6696", "Aishah", "Sahih", "The Prophet ﷺ said whoever vows to obey Allah should obey Him, and whoever vows to disobey Allah should not disobey Him.", "should remain obedient to Him"),
      difficulty: 2,
      questions: [
        { q: "What do the righteous fulfill, per 76:7?", a: "Their vows", wrong: ["Their games", "Their bets", "Their boasts"], why: "They fulfill vows, and they fear a Day whose evil will be wide-spreading." },
        { q: "What if someone vows to disobey Allah?", a: "He must not do it", wrong: ["He must do it", "He must do it twice", "He must tell everyone"], why: "Whoever made a vow that he will disobey Allah, should not disobey Him." },
        { tf: true, q: "A vow to obey Allah should be kept.", why: "Whoever vows that he will be obedient to Allah, should remain obedient to Him." }
      ]
    },
    {
      slug: "a-day-of-spreading-evil",
      title: "A day of spreading evil",
      line: "They fear a Day whose hardship spreads, except for the forgiven.",
      facts: ["Mustatir: spreading", "Fear leads to good deeds"],
      quote: q76(7),
      source: ik(7, "Ibn Kathir says the righteous avoid forbidden things, fearing the Day when evil spreads except over those Allah shows mercy.", "the evil will spread out among all people except for those upon whom Allah has had mercy"),
      difficulty: 2,
      questions: [
        { q: "What do the righteous fear, per 76:7?", a: "A Day of wide-spreading evil", wrong: ["The rain", "The night", "Their neighbors"], why: "And they fear a Day whose evil will be wide-spreading." },
        { q: "Who is safe from it, per Ibn Kathir?", a: "Those Allah has mercy on", wrong: ["The richest", "The strongest", "The tallest"], why: "Except for those upon whom Allah has had mercy." },
        { tf: false, q: "Fear of that Day made them careless about sins.", why: "These people also abandon those forbidden things which He has prohibited for them." }
      ]
    },
    {
      slug: "food-they-love",
      title: "Giving food they love",
      line: "They give food away even though they love and want it.",
      facts: ["Ayah 3:92", "Give what you love"],
      quote: q76(8),
      source: ik(8, "Ibn Kathir says the clearest meaning is that they give food while they themselves love it and want it.", "they give food while they themselves love it and desire it"),
      difficulty: 2,
      questions: [
        { q: "Whom do they feed, per 76:8?", a: "The poor, the orphan and the captive", wrong: ["Only the rich", "Only their friends", "Only guests of honor"], why: "And they give food, inspite of their love for it, to the poor, the orphan and the captive." },
        { q: "What does in spite of their love for it mean, per Ibn Kathir?", a: "They love the food themselves", wrong: ["They hate the food", "The food is spoiled", "They have too much"], why: "They give food while they themselves love it and desire it." },
        { tf: true, q: "Ayah 3:92 says we reach righteousness by spending what we love.", why: "By no means shall you attain Al-Birr unless you spend of that which you love. (3:92)" }
      ]
    },
    {
      slug: "the-best-charity",
      title: "The best charity",
      line: "The best charity is given while healthy and wanting wealth.",
      facts: ["Do not delay giving", "Give while you can"],
      quote: q76(8),
      source: hadith("bukhari", "1419", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the best charity is given while you are healthy, eager for wealth and afraid of poverty, not delayed to the end.", "The charity which you practice while you are healthy"),
      difficulty: 2,
      questions: [
        { q: "Which charity is best, per the hadith?", a: "Given while healthy", wrong: ["Given only when rich", "Given only at death", "Given only on Eid"], why: "The charity which you practice while you are healthy, niggardly and afraid of poverty." },
        { tf: false, q: "Delaying charity until the last moment is just as good.", why: "Do not delay it to the time of approaching death." },
        { q: "How does the giver feel about wealth, per the hadith?", a: "He wishes to become wealthy", wrong: ["He hates money", "He has plenty", "He never thinks of it"], why: "Afraid of poverty and wish to become wealthy." }
      ]
    },
    {
      slug: "kindness-to-captives",
      title: "Kindness to captives",
      line: "At Badr, captives were treated with respect and fed first.",
      facts: ["Asir: a captive", "Mercy even to enemies"],
      quote: q76(8),
      source: ik(8, "Ibn Kathir says at Badr the Messenger of Allah commanded his Companions to treat the captives respectfully, and they fed them first.", "commanded his Companions to treat the captives respectfully"),
      difficulty: 3,
      questions: [
        { q: "How were the captives of Badr treated?", a: "With respect", wrong: ["Harshly", "With neglect", "With mockery"], why: "On the day of Badr the Messenger of Allah commanded his Companions to treat the captives respectfully." },
        { q: "Who ate first when meals came?", a: "The captives", wrong: ["The leaders", "The soldiers", "The horses"], why: "They would give them preference over themselves when eating their meals." },
        { tf: true, q: "Ibn Abbas said the captives back then were idol worshippers.", why: "Ibn Abbas said, At that time their captives were idolators." }
      ]
    },
    {
      slug: "for-allahs-face-only",
      title: "For Allah's Face only",
      line: "They feed others only for Allah, wanting no thanks.",
      facts: ["Ikhlas: sincerity", "No reward from people"],
      quote: q76(9),
      source: ik(9, "Ibn Kathir says they hope only for Allah's reward and pleasure; Mujahid said Allah knows this in their hearts.", "hoping for the reward of Allah and His pleasure"),
      difficulty: 2,
      questions: [
        { q: "Why do they feed others, per 76:9?", a: "Seeking Allah's Face only", wrong: ["To be famous", "To be thanked", "To be repaid"], why: "We feed you seeking Allah's Face only." },
        { q: "What do they not want from people?", a: "Reward or thanks", wrong: ["Food or water", "Peace", "Good health"], why: "We wish for no reward, nor thanks from you." },
        { tf: false, q: "Mujahid said they say these words aloud to everyone.", why: "They do not say this with their tongues, but rather, Allah knows it in their hearts." }
      ]
    },
    {
      slug: "deeds-by-intentions",
      title: "Deeds by intentions",
      line: "Every deed is rewarded by the intention behind it.",
      facts: ["Niyyah: intention", "The first hadith in Bukhari"],
      quote: q76(9),
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ said the reward of deeds depends on intentions, and each person gets what he intended.", "The reward of deeds depends upon the intentions"),
      difficulty: 1,
      questions: [
        { q: "What does the reward of deeds depend on?", a: "Intentions", wrong: ["Money", "Height", "Noise"], why: "The reward of deeds depends upon the intentions." },
        { q: "What will each person get?", a: "What he intended", wrong: ["What others think", "What he hides", "Nothing"], why: "Every person will get the reward according to what he has intended." },
        { tf: true, q: "Feeding for Allah alone is a deed with a sincere intention.", why: "We feed you seeking Allah's Face only." }
      ]
    },
    {
      slug: "a-hard-and-long-day",
      title: "A hard and long day",
      line: "They feared a Day that is hard and long, hoping for mercy.",
      facts: ["Abus: hard", "Qamtarir: long"],
      quote: q76(10),
      source: ik(10, "Ibn Abbas said Abus means difficult and Qamtarir means long; they do good hoping Allah treats them gently.", "Abus means difficult and Qamtarir means long"),
      difficulty: 2,
      questions: [
        { q: "What does Abus mean, per Ibn Abbas?", a: "Difficult", wrong: ["Easy", "Bright", "Short"], why: "Abus means difficult and Qamtarir means long." },
        { q: "What does Qamtarir mean, per Ibn Abbas?", a: "Long", wrong: ["Cold", "Quiet", "Happy"], why: "Abus means difficult and Qamtarir means long." },
        { tf: true, q: "They did good hoping Allah would be gentle with them.", why: "Perhaps Allah may have mercy on us and treat us with gentleness." }
      ]
    },
    {
      slug: "light-and-joy",
      title: "Light and joy",
      line: "Allah saves them and gives their faces light and hearts joy.",
      facts: ["Nadrah: light of beauty", "Surur: joy"],
      quote: q76(11),
      source: ik(11, "Ibn Kathir says Allah gives light to their faces and joy to their hearts, for when the heart is happy the face shines.", "if the heart is happy, then the face will be enlightened"),
      difficulty: 1,
      questions: [
        { q: "Where is the Nadrah, per Ibn Kathir?", a: "In their faces", wrong: ["In their hands", "On their clothes", "In the sky"], why: "And gave them Nadrah, a light of beauty, meaning, in their faces." },
        { q: "Where is the joy, per Ibn Kathir?", a: "In their hearts", wrong: ["In their pockets", "In their homes", "In their feet"], why: "And joy in their hearts." },
        { tf: true, q: "When the Prophet ﷺ was happy, his face shone like the moon.", why: "Whenever he was happy, then his face will be radiant until it will be as if it is a piece of the moon." }
      ]
    },
    {
      slug: "reward-for-patience",
      title: "Reward for patience",
      line: "Jannah and silk are the reward for being patient.",
      facts: ["Sabr: patience", "Leaving desires for Allah"],
      quote: q76(12),
      source: ik(12, "Abu Sulayman Ad-Darani said they were patient in leaving off their desires in this world.", "Because they were patient in leaving off their desires in the world"),
      difficulty: 2,
      questions: [
        { q: "What is their reward, per 76:12?", a: "Paradise and silken garments", wrong: ["Gold coins", "A big army", "Fame"], why: "And their recompense shall be Paradise, and silken garments, because they were patient." },
        { q: "Patient in what, per Abu Sulayman Ad-Darani?", a: "Leaving off desires", wrong: ["Waiting for food", "Long journeys", "Sleeping late"], why: "Because they were patient in leaving off their desires in the world." },
        { tf: false, q: "The reward in 76:12 is for wealth, not patience.", why: "Because they were patient." }
      ]
    }
  ]
};

/** Ayahs 13 to 22: the delights of Jannah: shade, fruit, silver cups, Salsabil, and a purifying drink. */
const INSAN_THREE: DeepUnit = {
  key: "insan3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-76",
  name: "Al-Insan, ayahs 13-22",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Insan",
  lessons: [
    {
      slug: "no-heat-no-cold",
      title: "No heat, no cold",
      line: "In Jannah there is no harsh heat or bitter cold.",
      facts: ["Ara'ik: raised couches", "Always pleasant weather"],
      quote: q76(13),
      source: ik(13, "Ibn Kathir says there will be no disturbing heat or painful cold, only one lasting climate they will never want changed.", "there will only be one climate that will be always and eternal"),
      difficulty: 1,
      questions: [
        { q: "On what do they recline, per 76:13?", a: "Raised couches", wrong: ["Rocks", "Sand", "Wooden boxes"], why: "Reclining therein on raised couches." },
        { q: "What will they not see in Jannah?", a: "Harsh heat or bitter cold", wrong: ["Green gardens", "Rivers", "Fruit"], why: "They will see there neither the excessive heat, nor the excessive bitter cold." },
        { tf: false, q: "The people of Jannah will wish the weather would change.", why: "There will only be one climate that will be always and eternal and they will not want it to be changed." }
      ]
    },
    {
      slug: "fruit-within-reach",
      title: "Fruit within reach",
      line: "Fruit in Jannah lowers itself to be picked easily.",
      facts: ["Dhilal: shade", "Qutuf: bunches of fruit"],
      quote: q76(14),
      source: ik(14, "Ibn Kathir says whenever someone reaches for fruit, it comes nearer as if it hears and obeys.", "it will come nearer to him and come down from its highest branch as if it hears and obeys"),
      difficulty: 1,
      questions: [
        { q: "What is close upon them, per 76:14?", a: "The shade", wrong: ["The sun", "The wind", "The sea"], why: "And the shade thereof is close upon them." },
        { q: "What does fruit do if one sits, per Mujahid?", a: "Lowers itself", wrong: ["Rises higher", "Falls away", "Disappears"], why: "If he sits it will lower itself for him so that he can reach it." },
        { tf: true, q: "Qatadah said no thorn or distance keeps hands from the fruit.", why: "No thorn or distance will repel their hands away from it." }
      ]
    },
    {
      slug: "silver-clear-as-glass",
      title: "Silver clear as glass",
      line: "Their cups are silver, yet clear as glass.",
      facts: ["Qawarir: crystal", "Nothing like it in this world"],
      quote: q76(16),
      source: ik(16, "Ibn Abbas and others said the cups have the whiteness of silver with the clearness of glass, unlike anything in this world.", "the whiteness of silver in the transparency of glass"),
      difficulty: 2,
      questions: [
        { q: "What are the vessels made of, per 76:15?", a: "Silver", wrong: ["Clay", "Wood", "Iron"], why: "And among them will be passed round vessels of silver and cups of crystal." },
        { q: "What makes these cups special?", a: "Silver you can see through", wrong: ["They are very heavy", "They are very old", "They are dark"], why: "The whiteness of silver in the transparency of glass." },
        { tf: true, q: "Each cup holds just the amount that quenches thirst.", why: "Rather it will be prepared in an amount that is suitable for quenching the thirst of their drinkers." }
      ]
    },
    {
      slug: "ginger-and-salsabil",
      title: "Ginger and Salsabil",
      line: "They drink ginger cups from a spring called Salsabil.",
      facts: ["Zanjabil: ginger", "Salsabil: a spring"],
      quote: q76(18),
      source: ik(18, "Ikrimah said Salsabil is the name of a spring in Paradise; Mujahid said it is named for its steady flowing.", "is the name of a spring in Paradise"),
      difficulty: 2,
      questions: [
        { q: "What is the cup mixed with, per 76:17?", a: "Zanjabil, ginger", wrong: ["Salt", "Honey only", "Lemon"], why: "And they will be given to drink there of a cup mixed with Zanjabil, ginger." },
        { q: "What is Salsabil, per Ikrimah?", a: "A spring in Paradise", wrong: ["A tree", "A palace", "A horse"], why: "Ikrimah said, It is the name of a spring in Paradise." },
        { tf: true, q: "Kafur drinks are cool and ginger drinks are warm.", why: "Given a drink that is mixed with camphor, and it is cool. Then a drink mixed with ginger, and it is hot." }
      ]
    },
    {
      slug: "like-scattered-pearls",
      title: "Like scattered pearls",
      line: "Young servants of Jannah look like scattered pearls.",
      facts: ["Mukhalladun: ever young", "Lu'lu': pearls"],
      quote: q76(19),
      source: ik(19, "Ibn Kathir says when you see the young servants moving about, with their fine faces and clothes, you would think them scattered pearls.", "you would think that they were scattered pearls"),
      difficulty: 1,
      questions: [
        { q: "What do the servants look like, per 76:19?", a: "Scattered pearls", wrong: ["Falling leaves", "Clouds", "Sand"], why: "If you see them, you would think them scattered pearls." },
        { q: "What does everlasting youth mean, per Ibn Kathir?", a: "They never grow older", wrong: ["They sleep a lot", "They are very tall", "They are very loud"], why: "In one state forever which they will be never changing from, they will not increase in age." },
        { tf: true, q: "Ibn Kathir says nothing is nicer to see than scattered pearls.", why: "There is nothing nicer to look at than scattered pearls in a beautiful place." }
      ]
    },
    {
      slug: "a-great-kingdom",
      title: "A great kingdom",
      line: "Even the last to enter Jannah gets ten times this world.",
      facts: ["Mulk kabir: a great kingdom", "The least gets ten worlds"],
      quote: q76(20),
      source: ik(20, "Ibn Kathir says Allah will tell the last person to enter Paradise that he will have the world and ten worlds like it.", "you will have similar to the world and ten worlds like it"),
      difficulty: 2,
      questions: [
        { q: "What will one see in Jannah, per 76:20?", a: "Delight and a great dominion", wrong: ["Dust and wind", "Walls and gates only", "Nothing"], why: "You will see a delight, and a great dominion." },
        { q: "What does the last person to enter Jannah get?", a: "The world and ten like it", wrong: ["One small room", "Half the world", "Only a garden"], why: "Verily, you will have similar to the world and ten worlds like it." },
        { tf: true, q: "Those higher in Jannah get even more than that.", why: "Then what do you think about the one who will have a higher status and will be favored even more by Allah." }
      ]
    },
    {
      slug: "green-silk-and-silver",
      title: "Green silk and silver",
      line: "They wear green silk and are adorned with silver bracelets.",
      facts: ["Sundus: fine silk", "Istabraq: shining velvet"],
      quote: q76(21),
      source: ik(21, "Ibn Kathir says the people of Paradise wear silk and Sundus, a high quality silk, and Istabraq that shimmers.", "among the garments of the people of Paradise is silk and Sundus"),
      difficulty: 2,
      questions: [
        { q: "What color is their silk, per 76:21?", a: "Green", wrong: ["Black", "Gray", "Brown"], why: "Their garments will be of fine green silk, and Istabraq." },
        { q: "What are their bracelets made of, per 76:21?", a: "Silver", wrong: ["Iron", "Rope", "Stone"], why: "They will be adorned with bracelets of silver." },
        { tf: true, q: "Sundus is a high quality silk.", why: "Silk and Sundus, which is a high quality silk." }
      ]
    },
    {
      slug: "a-purifying-drink",
      title: "A purifying drink",
      line: "Allah gives them a drink that cleans hearts of envy and hate.",
      facts: ["Sharab tahur: pure drink", "Pure hearts in Jannah"],
      quote: q76(21),
      source: ik(21, "Ibn Kathir says the purifying drink cleans their insides of envy, hatred and every bad trait.", "it will purify their insides of envy"),
      difficulty: 2,
      questions: [
        { q: "Who gives them the purifying drink?", a: "Their Lord", wrong: ["Their friends", "The angels' guards", "The kings"], why: "And their Lord will give them a purifying drink." },
        { q: "What does the drink remove, per Ibn Kathir?", a: "Envy and hatred", wrong: ["Hunger only", "Their memory", "Their names"], why: "It will purify their insides of envy, despise, hatred, harm." },
        { tf: true, q: "Ali said they bathe in a second spring and glow with delight.", why: "Then they will bathe in the other spring and a glow of delight will run all over them." }
      ]
    },
    {
      slug: "your-effort-is-accepted",
      title: "Your effort is accepted",
      line: "Allah rewards small deeds with a great reward.",
      facts: ["Sa'y: effort", "Mashkur: appreciated"],
      quote: q76(22),
      source: ik(22, "Ibn Kathir says your endeavor has been accepted means Allah rewards a small amount of deeds with a large reward.", "Allah the Exalted will reward you for a small amount"),
      difficulty: 1,
      questions: [
        { q: "What is said to them in 76:22?", a: "Your endeavor has been accepted", wrong: ["Try again", "Wait outside", "Go back"], why: "Verily, this is a reward for you, and your endeavor has been accepted." },
        { q: "How does Allah reward small deeds?", a: "With a large reward", wrong: ["With nothing", "With a small reward", "With a warning"], why: "Allah the Exalted will reward you for a small amount of deeds with a large amount of reward." },
        { tf: false, q: "Small good deeds are worthless.", why: "Allah the Exalted will reward you for a small amount with a large amount." }
      ]
    }
  ]
};

/** Ayahs 23 to 31: patience, remembering Allah morning, evening and night, and guidance from Allah. */
const INSAN_FOUR: DeepUnit = {
  key: "insan4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-76",
  name: "Al-Insan, ayahs 23-31",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Insan",
  lessons: [
    {
      slug: "be-patient-with-allahs-decree",
      title: "Be patient with Allah's decree",
      line: "The Quran came in stages, so be patient and trust Allah.",
      facts: ["Tanzil: sent down", "Athim: sinner in deeds"],
      quote: q76(24),
      source: ik(24, "Ibn Kathir says be patient with Allah's decree, knowing He will handle your affairs well, and do not obey those who turn you from the truth.", "know that He will handle your affairs in a good manner"),
      difficulty: 2,
      questions: [
        { q: "How was the Quran sent down, per 76:23?", a: "By stages", wrong: ["All at once", "In a dream", "On a mountain"], why: "Verily, it is We Who have sent down the Quran to you by stages." },
        { q: "What does Athim mean, per Ibn Kathir?", a: "The sinner in his deeds", wrong: ["A good friend", "A teacher", "A traveler"], why: "The Athim is the sinner in his deeds and the Kafur is the disbeliever in his heart." },
        { tf: true, q: "Being patient includes trusting Allah to handle our affairs.", why: "Be patient with His decree and decision and know that He will handle your affairs in a good manner." }
      ]
    },
    {
      slug: "morning-and-evening",
      title: "Remember Allah morning and evening",
      line: "Remember Allah's Name at the start and end of each day.",
      facts: ["Bukrah: morning", "Asil: late afternoon"],
      quote: q76(25),
      source: ik(25, "Ibn Kathir says every morning and afternoon means at the beginning of the day and at its end.", "at the beginning of the day and at its end"),
      difficulty: 1,
      questions: [
        { q: "When should we remember Allah, per 76:25?", a: "Every morning and afternoon", wrong: ["Only once a year", "Only on Eid", "Only when sad"], why: "And remember the Name of your Lord every morning and afternoon." },
        { q: "What does morning and afternoon mean?", a: "Start and end of the day", wrong: ["Only midday", "Only at night", "Only Friday"], why: "Meaning, at the beginning of the day and at its end." },
        { tf: true, q: "Remembering Allah should frame our whole day.", why: "At the beginning of the day and at its end." }
      ]
    },
    {
      slug: "the-master-of-forgiveness",
      title: "The best way to seek forgiveness",
      line: "Sayyid al-Istighfar said with faith can earn Jannah.",
      facts: ["Sayyid al-Istighfar", "Allahumma anta Rabbi"],
      quote: q76(25),
      source: hadith("bukhari", "6306", "Shaddad ibn Aws", "Sahih", "The Prophet ﷺ taught the best way to ask forgiveness, Allahumma anta Rabbi, and said whoever says it with firm faith in the day or night is from the people of Paradise.", "The most superior way of asking for forgiveness from Allah is"),
      difficulty: 3,
      questions: [
        { q: "How does Sayyid al-Istighfar begin?", a: "Allahumma anta Rabbi", wrong: ["Bismillah", "SubhanAllah", "Allahu Akbar"], why: "The most superior way of asking for forgiveness from Allah is: Allahumma anta Rabbi la ilaha illa anta." },
        { q: "How must it be said to earn the reward?", a: "With firm faith", wrong: ["Very loudly", "In a group only", "In a hurry"], why: "If somebody recites it during the day with firm faith in it." },
        { tf: true, q: "Sayyid al-Istighfar can be said by day and at night.", why: "If somebody recites it during the day with firm faith in it, and if somebody recites it at night." }
      ]
    },
    {
      slug: "prostrate-at-night",
      title: "Prostrate at night",
      line: "Pray and glorify Allah in the long night.",
      facts: ["Qiyam al-Layl", "Allah answers in the last third"],
      quote: q76(26),
      source: hadith("bukhari", "1145", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said our Lord comes down to the nearest heaven in the last third of every night, asking who will call on Him, ask Him, or seek His forgiveness.", "Is there anyone seeking My forgiveness"),
      difficulty: 2,
      questions: [
        { q: "What does 76:26 tell us to do at night?", a: "Prostrate and glorify Him", wrong: ["Only sleep", "Only eat", "Only travel"], why: "And during the night, prostrate yourself to Him, and glorify Him a long night through." },
        { q: "When does Allah ask who will call on Him?", a: "The last third of the night", wrong: ["At noon", "At sunset", "At sunrise"], why: "When the last third of the night remains, saying: Is there anyone to invoke Me?" },
        { tf: true, q: "Allah asks if anyone is seeking His forgiveness.", why: "Is there anyone seeking My forgiveness, so that I may forgive him?" }
      ]
    },
    {
      slug: "a-heavy-day-left-behind",
      title: "A heavy Day left behind",
      line: "Loving this world, they ignore the heavy Day of Judgement.",
      facts: ["Yawm thaqil: a heavy Day", "First creation proves the next"],
      quote: q76(27),
      source: ik(28, "Ibn Kathir says the One who made them with strong build will raise them again; the first creation proves the second.", "the beginning of their creation is a proof for the repetition of their creation"),
      difficulty: 2,
      questions: [
        { q: "What do they put behind them, per 76:27?", a: "A heavy Day", wrong: ["A heavy bag", "Their friends", "Their homes"], why: "Verily, these love the present life of this world, and put behind them a heavy Day." },
        { q: "What is the heavy Day?", a: "The Day of Judgement", wrong: ["A rainy day", "A market day", "A wedding day"], why: "And put behind them a heavy Day, meaning, the Day of Judgement." },
        { tf: true, q: "Allah could replace them with other people if He willed.", why: "If We wish We can bring another group of people besides them." }
      ]
    },
    {
      slug: "a-path-to-your-lord",
      title: "A path to your Lord",
      line: "The surah is a reminder: whoever wills takes a path to Allah.",
      facts: ["Tadhkirah: a reminder", "Sabil: a path"],
      quote: q76(29),
      source: ik(29, "Ibn Kathir says this surah is a reminder, so whoever wishes to be guided by the Quran takes a path to his Lord.", "this Surah is a reminder"),
      difficulty: 1,
      questions: [
        { q: "What is the surah called in 76:29?", a: "An admonition", wrong: ["A poem", "A story", "A riddle"], why: "Verily, this is an admonition, meaning, this Surah is a reminder." },
        { q: "What should whoever wills take?", a: "A path to his Lord", wrong: ["A ship", "A rest", "A gift"], why: "So whosoever wills, let him take a path to his Lord." },
        { tf: false, q: "The surah is only a story with no reminder in it.", why: "Verily, this is an admonition, meaning, this Surah is a reminder." }
      ]
    },
    {
      slug: "unless-allah-wills",
      title: "Unless Allah wills",
      line: "We only will what Allah wills; He knows who deserves guidance.",
      facts: ["Mashi'ah: Allah's will", "Al-Alim, Al-Hakim"],
      quote: q76(30),
      source: ik(30, "Ibn Kathir says no one can guide himself unless Allah wills; He knows best who deserves guidance and makes it easy for him.", "He is Most Knowledgeable of who deserves to be guided"),
      difficulty: 3,
      questions: [
        { q: "What does 76:30 say about our will?", a: "We cannot will unless Allah wills", wrong: ["We control everything", "Our will is nothing", "Allah has no will"], why: "But you cannot will, unless Allah wills." },
        { q: "Whom does Allah make guidance easy for?", a: "Whoever deserves it", wrong: ["Only the rich", "Only the old", "Only the strong"], why: "He is Most Knowledgeable of who deserves to be guided. So, He makes guidance easy for him." },
        { tf: true, q: "Whoever Allah guides, no one can lead astray.", why: "Whoever He guides, there is no one who can lead him astray." }
      ]
    },
    {
      slug: "changer-of-hearts",
      title: "O Changer of hearts",
      line: "The Prophet ﷺ often asked Allah to keep his heart firm.",
      facts: ["Ya Muqallib al-Qulub", "Ask for a firm heart"],
      quote: q76(30),
      source: hadith("tirmidhi", "3522", "Umm Salamah", "Sahih", "Umm Salamah said his most frequent dua was: O Changer of the hearts, make my heart firm upon Your religion.", "O Changer of the hearts, make my heart firm upon Your religion"),
      difficulty: 2,
      questions: [
        { q: "What dua did he say most often, per Umm Salamah?", a: "O Changer of the hearts, make my heart firm", wrong: ["O Allah, make me rich", "O Allah, make me famous", "O Allah, give me a palace"], why: "The supplication he said most frequently was: O Changer of the hearts, make my heart firm upon Your religion." },
        { q: "Who asked him why he said it so often?", a: "Umm Salamah", wrong: ["Abu Jahl", "A merchant", "A child"], why: "So I said: O Messenger of Allah, why do you supplicate so frequently?" },
        { tf: true, q: "Hearts are firm only when Allah makes them firm.", why: "So whomsoever He wills He makes steadfast." }
      ]
    }
  ]
};

export const INSAN_UNITS: readonly DeepUnit[] = [INSAN_ONE, INSAN_TWO, INSAN_THREE, INSAN_FOUR];
