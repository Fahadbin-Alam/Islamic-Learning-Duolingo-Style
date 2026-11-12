import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Yusuf ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point. The test in the house of the 'Aziz
// is told gently, for every age: she called him to wrong, he refused and chose prison.

/** Tafsir Ibn Kathir on Yusuf 12:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_12_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Yusuf 12:${ayah}`,
    url: `https://quran.com/12:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 12:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q12 = (ayah: number) => quranQuote(12, ayah);

/** Ayahs 1 to 20: the best of stories, the dream of eleven stars, the brothers' envy, the well and the caravan. */
const YUSUF_ONE: DeepUnit = {
  key: "yusuf1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yusuf",
  name: "Yusuf, ayahs 1 to 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yusuf",
  lessons: [
    {
      slug: "the-best-of-stories",
      title: "The best of stories",
      line: "Allah calls the story of Yusuf the best of stories.",
      facts: ["An Arabic Quran to understand", "A clear Book"],
      quote: q12(3),
      source: ik(1, "The Quran is a clear Book sent down in Arabic so that people understand. Allah relates the best of stories in it, and it is enough with no need for other books.", "We relate unto you the best of stories through Our revelations unto you"),
      difficulty: 2,
      questions: [
        { q: "What does Allah relate in 12:3?", a: "The best of stories", wrong: ["Old poems", "Tales of kings only", "Market news"], why: "We relate unto you the best of stories through Our revelations unto you." },
        { q: "In which language was the Quran sent down, per 12:2?", a: "Arabic", wrong: ["Persian", "Greek", "Hebrew"], why: "Verily, We have sent it down as an Arabic Qur'an in order that you may understand." },
        { q: "Ibn Kathir says the Quran needs other books to be complete.", tf: false, why: "He says the Quran is sufficient and needs no other book besides it." }
      ]
    },
    {
      slug: "eleven-stars-sun-and-moon",
      title: "Eleven stars, the sun and the moon",
      line: "Young Yusuf saw eleven stars, the sun and moon bow to him.",
      facts: ["Stars were his eleven brothers", "Sun and moon were his parents"],
      quote: q12(4),
      source: ik(4, "Yusuf told his father Ya'qub about his dream. The eleven stars were his brothers, and the sun and the moon were his father and mother. The dreams of Prophets are revelation.", "the eleven stars represent his brothers, who were eleven, and the sun and the moon represent his father and mother"),
      difficulty: 2,
      questions: [
        { q: "How many stars did Yusuf see, in 12:4?", a: "Eleven", wrong: ["Seven", "Twelve", "Three"], why: "O my father! Verily, I saw eleven stars and the sun and the moon." },
        { q: "Whom did the sun and the moon stand for?", a: "His father and mother", wrong: ["Two kings", "Two angels", "Two cities"], why: "The sun and the moon represent his father and mother." },
        { q: "Ibn Abbas said the dreams of Prophets are revelation from Allah.", tf: true, why: "Abdullah bin Abbas stated that the dreams of Prophets are revelations from Allah." }
      ]
    },
    {
      slug: "keep-the-dream-quiet",
      title: "Keep the dream quiet",
      line: "Ya'qub told Yusuf not to tell his brothers, lest they envy him.",
      facts: ["Shaytan is an open enemy", "Hide a blessing until it comes"],
      quote: q12(5),
      source: ik(5, "Ya'qub feared the brothers would envy Yusuf and plot against him if they heard the dream. Ibn Kathir says one should keep a coming blessing quiet until it arrives.", "they would envy him and conspire evil plots against him"),
      difficulty: 2,
      questions: [
        { q: "Whom should Yusuf not tell, in 12:5?", a: "His brothers", wrong: ["His father", "The caravan", "The king"], why: "O my son! Relate not your vision to your brothers." },
        { q: "What did Ya'qub fear the brothers would feel?", a: "Envy", wrong: ["Joy", "Fear of wolves", "Hunger"], why: "Ya'qub feared they would envy him and plot evil against him." },
        { q: "In 12:5, Shaytan is called an open enemy to man.", tf: true, why: "Verily, Shaytan is to man an open enemy!" }
      ]
    },
    {
      slug: "a-dream-you-like",
      title: "A dream you like, a dream you dislike",
      line: "Thank Allah for a good dream; seek refuge from a bad one.",
      facts: ["A good dream is from Allah", "A bad dream will not harm you"],
      quote: q12(5),
      source: hadith("bukhari", "6985", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said a dream you like is from Allah, so thank Him and tell it. A dream you dislike is from Shaytan, so seek refuge with Allah and tell no one, and it will not harm you.", "he should seek refuge with Allah from its evil, and he should not mention it to anybody"),
      difficulty: 2,
      questions: [
        { q: "Where does a dream you like come from, per the hadith?", a: "From Allah", wrong: ["From food", "From Shaytan", "From the stars"], why: "If anyone of you sees a dream that he likes, then it is from Allah." },
        { q: "What should you do after a bad dream?", a: "Seek refuge with Allah", wrong: ["Tell everyone", "Stay awake all week", "Ask a fortune teller"], why: "He should seek refuge with Allah from its evil." },
        { q: "A bad dream should be told to many people.", tf: false, why: "He should not mention it to anybody, for it will not harm him." }
      ]
    },
    {
      slug: "chosen-and-taught",
      title: "Chosen and taught",
      line: "Allah would choose Yusuf and teach him to explain dreams.",
      facts: ["Prophethood for Yusuf", "Like Ibrahim and Ishaq before"],
      quote: q12(6),
      source: ik(6, "Ya'qub said Allah would choose Yusuf as a Prophet, teach him the meaning of dreams and complete His favor on him, as He did on Ibrahim and Ishaq.", "Mujahid and several other scholars said that this part of the Ayah is in reference to the interpreting of dreams"),
      difficulty: 2,
      questions: [
        { q: "What would Allah teach Yusuf, in 12:6?", a: "The meaning of dreams", wrong: ["Building ships", "Writing poems", "Farming dates"], why: "Thus will your Lord choose you and teach you the interpretation of dreams." },
        { q: "On whom had Allah perfected His favor before, in 12:6?", a: "Ibrahim and Ishaq", wrong: ["Nuh and Hud", "Musa and Harun", "Dawud and Sulayman"], why: "As He perfected it on your fathers, Ibrahim and Ishaq aforetime!" },
        { q: "Allah knows best whom to choose for His Message.", tf: true, why: "Allah knows best whom to chose for His Messages." }
      ]
    },
    {
      slug: "the-noble-son-of-the-noble",
      title: "The noble son of the noble",
      line: "The Prophet ﷺ named Yusuf the noble son of three noble Prophets.",
      facts: ["Yusuf son of Ya'qub", "Son of Ishaq, son of Ibrahim"],
      quote: q12(6),
      source: hadith("bukhari", "3390", "Ibn Umar", "Sahih", "The Prophet ﷺ said the honorable son of the honorable, son of the honorable, son of the honorable was Yusuf, son of Ya'qub, son of Ishaq, son of Ibrahim.", "The honorable, the son of the honorable, the son of the honorable"),
      difficulty: 2,
      questions: [
        { q: "Who was Yusuf's father?", a: "Ya'qub", wrong: ["Ibrahim", "Isma'il", "Musa"], why: "Yusuf, the son of Ya'qub, the son of Ishaq, the son of Ibrahim." },
        { q: "Who was Yusuf's great-grandfather?", a: "Ibrahim", wrong: ["Nuh", "Adam", "Hud"], why: "Yusuf, the son of Ya'qub, the son of Ishaq, the son of Ibrahim." },
        { q: "Yusuf, his father, grandfather and great-grandfather were all Prophets.", tf: true, why: "Ibrahim, Ishaq, Ya'qub and Yusuf were all Prophets, father to son." }
      ]
    },
    {
      slug: "envy-of-the-brothers",
      title: "The brothers' envy",
      line: "The brothers envied Yusuf and Binyamin for their father's love.",
      facts: ["Signs for those who ask", "They planned to repent after"],
      quote: q12(8),
      source: ik(7, "The brothers said Yusuf and his full brother Binyamin were dearer to their father. They wanted Yusuf gone so the father's love would be theirs alone.", "Remove Yusuf, who competes with you for your father … love"),
      difficulty: 2,
      questions: [
        { q: "Who was Yusuf's full brother?", a: "Binyamin", wrong: ["Rubil", "Yahudha", "Sham'un"], why: "Yusuf and his brother Binyamin, Yusuf's full brother." },
        { q: "Why did the brothers want Yusuf gone, in 12:9?", a: "To have their father's favor", wrong: ["To find water", "To win a race", "To sell grain"], why: "So that the favor of your father may be given to you alone." },
        { q: "They planned to become righteous after their wrong.", tf: true, why: "And after that you will be righteous folk, intending repentance before the sin." }
      ]
    },
    {
      slug: "a-well-not-worse",
      title: "Throw him in a well instead",
      line: "One brother said: do not harm him, leave him in a well.",
      facts: ["The eldest spoke up", "A caravan would find him"],
      quote: q12(10),
      source: ik(7, "One brother, the eldest according to Qatadah, said not to take Yusuf's life but to leave him in a well where a caravan would pick him up. Allah willed that Yusuf live to become a Prophet.", "Allah the Exalted willed that Yusuf fulfill a mission that must be fulfilled and complete"),
      difficulty: 3,
      questions: [
        { q: "Where did one brother suggest putting Yusuf, in 12:10?", a: "At the bottom of a well", wrong: ["On a ship", "In a cave", "In a tower"], why: "Throw him down to the bottom of a well." },
        { q: "Who would pick Yusuf up, per 12:10?", a: "A caravan of travelers", wrong: ["A king's army", "His father", "Sailors"], why: "He will be picked up by some caravan of travelers." },
        { q: "Their plan could have stopped Allah's will for Yusuf.", tf: false, why: "Allah the Exalted willed that Yusuf fulfill a mission that must be fulfilled and complete." }
      ]
    },
    {
      slug: "trust-us-with-yusuf",
      title: "Trust us with Yusuf",
      line: "The brothers asked to take Yusuf out to play the next day.",
      facts: ["Ya'qub feared a wolf", "They used his words later"],
      quote: q12(13),
      source: ik(13, "Ya'qub was sad to let Yusuf go and feared a wolf might eat him while they were careless. The brothers heard this and used those very words in their lie later.", "They heard these words from his mouth and used them in their response for what they did afterwards"),
      difficulty: 3,
      questions: [
        { q: "What did the brothers say they would do, in 12:12?", a: "Enjoy and play", wrong: ["Go to war", "Sell sheep", "Travel to Egypt"], why: "Send him with us tomorrow to enjoy himself and play." },
        { q: "What did Ya'qub fear, in 12:13?", a: "A wolf would eat him", wrong: ["A flood", "A lion", "A storm"], why: "I fear lest a wolf should devour him, while you are careless of him." },
        { q: "The brothers later used their father's own words in their lie.", tf: true, why: "They heard these words from his mouth and used them later." }
      ]
    },
    {
      slug: "comfort-in-the-well",
      title: "Comfort in the well",
      line: "In the well, Allah promised Yusuf he would one day tell them.",
      facts: ["Allah's mercy in hard times", "A good end was promised"],
      quote: q12(15),
      source: ik(15, "When the brothers left Yusuf in the well, Allah revealed to him to comfort him: you will have a way out and one day remind them of what they did.", "Allah mentions His mercy and compassion and His compensation and relief that He sends in times of distress"),
      difficulty: 3,
      questions: [
        { q: "What did Allah reveal to Yusuf in the well, in 12:15?", a: "He would one day tell them of it", wrong: ["He would stay there forever", "He would become a sailor", "He should run home"], why: "Indeed, you shall one day inform them of this their affair, when they know you not." },
        { q: "What did this revelation give Yusuf?", a: "Comfort and strength", wrong: ["A map", "Food", "A rope"], why: "Allah revealed to Yusuf to comfort his heart and strengthen his resolve." },
        { q: "Allah sends relief in times of distress.", tf: true, why: "Allah mentions His mercy and His relief that He sends in times of distress." }
      ]
    },
    {
      slug: "patience-most-fitting",
      title: "Patience is most fitting",
      line: "They brought a shirt with false blood; Ya'qub chose patience.",
      facts: ["They forgot to tear the shirt", "Help is sought from Allah"],
      quote: q12(18),
      source: ik(16, "The brothers came weeping at night and said a wolf ate Yusuf. They brought his shirt with false blood but forgot to tear it, so Ya'qub did not believe them and chose beautiful patience.", "But, they forgot to tear the shirt"),
      difficulty: 3,
      questions: [
        { q: "When did the brothers come back, in 12:16?", a: "Early in the night, weeping", wrong: ["At dawn, laughing", "At noon, singing", "After a year"], why: "And they came to their father in the early part of the night weeping." },
        { q: "Why did Ya'qub not believe the shirt?", a: "It was not torn", wrong: ["It was too big", "It was green", "It was new"], why: "They forgot to tear the shirt, and this is why Ya'qub did not believe them." },
        { q: "What did Ya'qub say is most fitting, in 12:18?", a: "Patience", wrong: ["Anger", "Revenge", "Running away"], why: "So (for me) patience is most fitting." }
      ]
    },
    {
      slug: "what-beautiful-patience-is",
      title: "What beautiful patience is",
      line: "Beautiful patience has no anger and no complaining to people.",
      facts: ["As-Sa'di explains", "Sabr jamil"],
      quote: q12(18),
      source: saadi(12, 18, "As-Sa'di says Ya'qub promised beautiful patience, free of anger and of complaining to people, seeking Allah's help, not his own strength; and later he complained only to Allah, because complaining to the Creator does not go against beautiful patience.", "لأن الشكوى إلى الخالق لا تنافي الصبر الجميل"),
      difficulty: 2,
      questions: [
        { q: "What is beautiful patience free of, per as-Sa'di on 12:18?", a: "Anger and complaining to people", wrong: ["Dua", "Hope", "Tears to Allah"], why: "It is free of anger and of complaining to the creation." },
        { q: "Does complaining to Allah break beautiful patience, per as-Sa'di?", a: "No, it does not", wrong: ["Yes, always", "Only at night", "Only for Prophets"], why: "Complaining to the Creator does not go against beautiful patience." },
        { tf: true, q: "Ya'qub sought Allah's help, not his own strength, to be patient.", why: "As-Sa'di on 12:18." }
      ]
    },
    {
      slug: "patience-at-the-first-blow",
      title: "Patience at the first blow",
      line: "Real patience is shown at the first moment of hardship.",
      facts: ["Like Ya'qub's beautiful patience", "No complaint to people"],
      quote: q12(18),
      source: hadith("bukhari", "1302", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said real patience is at the first stroke of a calamity.", "The real patience is at the first stroke of a calamity"),
      difficulty: 3,
      questions: [
        { q: "When is real patience shown, per the hadith?", a: "At the first stroke of hardship", wrong: ["A year later", "After crying for days", "Only in old age"], why: "The real patience is at the first stroke of a calamity." },
        { q: "Who narrated the hadith on real patience?", a: "Anas ibn Malik", wrong: ["Abu Bakr", "Umar", "Aishah"], why: "Narrated Anas: The Prophet ﷺ said, the real patience is at the first stroke." },
        { q: "Ya'qub chose patience the moment he heard the news.", tf: true, why: "Nay, but your own selves have made up a tale. So (for me) patience is most fitting." }
      ]
    },
    {
      slug: "sold-for-a-few-coins",
      title: "Sold for a few coins",
      line: "A caravan drew Yusuf out; he was sold for a few dirhams.",
      facts: ["Twenty dirhams, said Ibn Mas'ud", "Allah knew all they did"],
      quote: q12(20),
      source: ik(19, "A caravan's water-drawer let down his bucket and Yusuf held on. Yusuf was sold for a tiny price, twenty dirhams, because they did not know his rank with Allah.", "twenty Dirhams, according to"),
      difficulty: 3,
      questions: [
        { q: "What did the water-drawer say, in 12:19?", a: "What good news! Here is a boy", wrong: ["The well is dry", "A treasure is here", "Run away"], why: "He said: What good news! Here is a boy." },
        { q: "How much was Yusuf sold for, per Ibn Mas'ud?", a: "Twenty dirhams", wrong: ["A thousand dinars", "A camel", "Nothing at all"], why: "For a few Dirhams, twenty Dirhams, according to Abdullah bin Mas'ud." },
        { q: "Allah did not know what they did to Yusuf.", tf: false, why: "And Allah was the All-Knower of what they did." }
      ]
    }
  ]
};

/** Ayahs 21 to 42: a home in Egypt, the test in the house of the 'Aziz, prison, and the call to Tawhid. */
const YUSUF_TWO: DeepUnit = {
  key: "yusuf2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yusuf",
  name: "Yusuf, ayahs 21 to 42",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yusuf",
  lessons: [
    {
      slug: "a-home-in-egypt",
      title: "A home in Egypt",
      line: "The 'Aziz of Egypt bought Yusuf and told his wife: honor him.",
      facts: ["The 'Aziz was a minister", "Allah has full power"],
      quote: q12(21),
      source: ik(21, "The man who bought Yusuf was the minister of Egypt, called the 'Aziz. He told his wife to make Yusuf's stay comfortable, hoping he would benefit them or become their son.", "The man who bought Yusuf was the minister of Egypt at the time"),
      difficulty: 3,
      questions: [
        { q: "Who bought Yusuf in Egypt?", a: "The 'Aziz, a minister", wrong: ["A farmer", "A sailor", "The king's cook"], why: "The man who bought Yusuf was the minister of Egypt, and his title was 'Aziz." },
        { q: "What did he tell his wife, in 12:21?", a: "Make his stay comfortable", wrong: ["Send him to work", "Sell him again", "Keep him outside"], why: "Make his stay comfortable, maybe he will profit us or we shall adopt him as a son." },
        { q: "Most people know Allah's wisdom in what He decrees.", tf: false, why: "And Allah has full power and control over His affairs, but most of men know not." }
      ]
    },
    {
      slug: "wisdom-and-knowledge",
      title: "Wisdom and knowledge",
      line: "When Yusuf grew up, Allah gave him wisdom and knowledge.",
      facts: ["This was prophethood", "A reward for doing good"],
      quote: q12(22),
      source: ik(21, "When Yusuf reached full strength of mind and body, Allah gave him wisdom and knowledge, which is prophethood, because he did good in obeying Allah.", "which is the prophethood that Allah sent him with for the people he lived among"),
      difficulty: 3,
      questions: [
        { q: "What did Allah give Yusuf when he grew up, in 12:22?", a: "Wisdom and knowledge", wrong: ["Gold and silver", "An army", "A palace"], why: "We gave him wisdom and knowledge, thus We reward the doers of good." },
        { q: "What were the wisdom and knowledge, per Ibn Kathir?", a: "Prophethood", wrong: ["Medicine", "Farming", "Poetry"], why: "Which is the prophethood that Allah sent him with." },
        { q: "Allah rewards the doers of good, in 12:22.", tf: true, why: "Thus We reward the doers of good." }
      ]
    },
    {
      slug: "i-seek-refuge-in-allah",
      title: "I seek refuge in Allah",
      line: "The 'Aziz's wife called Yusuf to wrong; he refused firmly.",
      facts: ["He would not betray his master", "Wrongdoers never succeed"],
      quote: q12(23),
      source: ik(23, "The wife of the 'Aziz shut the doors and called Yusuf to a sin. He refused and said: I seek refuge in Allah. Her husband had been kind to him, and he would never betray him.", "But he categorically refused her call"),
      difficulty: 3,
      questions: [
        { q: "What did Yusuf say first, in 12:23?", a: "I seek refuge in Allah", wrong: ["Let me think", "Ask the king", "Wait until night"], why: "He said: I seek refuge in Allah!" },
        { q: "Why would Yusuf not betray the 'Aziz?", a: "He had been kind to him", wrong: ["He feared the guards", "He wanted money", "He was leaving"], why: "Your husband is my master who provided me with comfortable living and was kind to me." },
        { q: "Wrongdoers will never be successful, in 12:23.", tf: true, why: "Verily, the wrongdoers will never be successful." }
      ]
    },
    {
      slug: "turned-away-from-evil",
      title: "Allah turned evil away",
      line: "Allah turned evil away from Yusuf, His sincere servant.",
      facts: ["He saw a sign from his Lord", "Chosen and purified"],
      quote: q12(24),
      source: ik(24, "Yusuf saw a sign from his Lord that turned him from the wrong. Ibn Jarir says the exact sign is left unnamed, as Allah left it. Allah kept every evil away from him.", "There are no clear proofs to support any of these statements in specific, so it should be left vague, as Allah left it"),
      difficulty: 3,
      questions: [
        { q: "What did Allah turn away from Yusuf, in 12:24?", a: "Evil and sin", wrong: ["His brothers", "His dreams", "His wealth"], why: "Thus it was, that We might turn away from him evil and immoral sins." },
        { q: "What kind of servant was Yusuf, in 12:24?", a: "Sincere and chosen", wrong: ["Proud", "Careless", "Forgetful"], why: "Surely, he was one of Our Mukhlasin servants, chosen and purified." },
        { q: "Ibn Jarir names exactly what sign Yusuf saw.", tf: false, why: "He says it should be left vague, as Allah left it." }
      ]
    },
    {
      slug: "patience-by-choice",
      title: "Patience by choice",
      line: "Patience by choice is greater than patience you cannot avoid.",
      facts: ["As-Sa'di explains", "Two kinds of patience"],
      quote: q12(24),
      source: saadi(12, 24, "As-Sa'di says the trial in the 'Aziz's house was greater for Yusuf than the trial of his brothers, and his patience in it earned more reward, because it was patience by choice, though many things pushed toward the sin, while his patience with his brothers was patience he had no way to avoid, like an illness.", "لأنه صبر اختيار مع وجود الدواعي الكثيرة"),
      difficulty: 3,
      questions: [
        { q: "Which patience of Yusuf earned more reward, per as-Sa'di on 12:24?", a: "Refusing the sin by choice", wrong: ["Staying in the well", "Being sold as a boy", "Waiting for food"], why: "It was patience by choice, though much pushed him to the sin." },
        { q: "What is patience with an illness like, per as-Sa'di?", a: "Patience one cannot avoid", wrong: ["Patience by choice", "No patience at all", "Patience for show"], why: "Hardships that come without choice are borne by forced patience." },
        { tf: true, q: "Yusuf put the love of Allah before his own desire.", why: "As-Sa'di on 12:24." }
      ]
    },
    {
      slug: "leaving-a-sin-for-allah",
      title: "Leaving a sin for Allah",
      line: "A bad deed left for Allah's sake is written as good.",
      facts: ["A good deed counts ten times", "Up to seven hundred times"],
      quote: q12(24),
      source: hadith("bukhari", "7501", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah says: if My slave means to do a bad deed but leaves it for My sake, write it as a good deed. A good deed done is written ten times, up to seven hundred.", "if he refrains from doing it for My Sake, then write it as a good deed"),
      difficulty: 3,
      questions: [
        { q: "What is written if you leave a bad deed for Allah?", a: "A good deed", wrong: ["A bad deed", "Nothing at all", "Two bad deeds"], why: "If he refrains from doing it for My Sake, then write it as a good deed." },
        { q: "How many times is a good deed written when done?", a: "Ten, up to seven hundred", wrong: ["Once only", "Twice", "Three times"], why: "Write it for him as ten good deeds up to seven-hundred times." },
        { q: "Yusuf left the wrong for Allah's sake.", tf: true, why: "He refused all this and preferred prison, for he feared Allah and hoped to earn His reward." }
      ]
    },
    {
      slug: "the-torn-shirt",
      title: "The shirt torn from the back",
      line: "His shirt torn from the back proved Yusuf told the truth.",
      facts: ["He ran to the door", "A witness from her family"],
      quote: q12(27),
      source: ik(25, "Yusuf ran to the door and she tore his shirt from behind. A witness from her family said: if it is torn from the back, he is truthful. So the truth became clear.", "But if it be that his shirt is torn from the back, then she has told a lie and he is speaking the truth"),
      difficulty: 3,
      questions: [
        { q: "Where was Yusuf's shirt torn, in 12:25?", a: "From the back", wrong: ["From the front", "At the sleeve", "Not at all"], why: "And she tore his shirt from the back." },
        { q: "Who gave the test of the shirt, in 12:26?", a: "A witness of her household", wrong: ["The king", "Yusuf's father", "A traveler"], why: "And a witness of her household bore witness." },
        { q: "A shirt torn from the back showed Yusuf was running away.", tf: true, why: "Had Yusuf run away from her, she would have held to his shirt from the back." }
      ]
    },
    {
      slug: "a-noble-angel",
      title: "This is a noble angel",
      line: "The women saw Yusuf, cut their hands, and called him an angel.",
      facts: ["A banquet with knives", "Beautiful inside and out"],
      quote: q12(31),
      source: ik(30, "Women of the city blamed the 'Aziz's wife. She invited them, gave each a knife, and called Yusuf out. Amazed by his beauty, they cut their hands and said: this is no man but a noble angel.", "They never saw anyone like Yusuf before"),
      difficulty: 3,
      questions: [
        { q: "What did the women do when they saw Yusuf, in 12:31?", a: "Cut their hands", wrong: ["Ran away", "Fell asleep", "Sang songs"], why: "Then, when they saw him, they exalted him and cut their hands." },
        { q: "What did the women call Yusuf, in 12:31?", a: "A noble angel", wrong: ["A king", "A poet", "A stranger"], why: "No man is this! This is none other than a noble angel!" },
        { q: "Some scholars said she then praised his inner purity too.", tf: true, why: "She told them about his inner beauty, being chaste and beautiful from the inside and outside." }
      ]
    },
    {
      slug: "prison-is-dearer",
      title: "Prison is dearer to me",
      line: "Yusuf prayed: prison is dearer to me than their call.",
      facts: ["He relied on Allah, not himself", "Allah answered his prayer"],
      quote: q12(33),
      source: ik(30, "When threatened with prison, Yusuf asked Allah not to leave him to himself. Allah answered him. He chose prison over sin because he feared Allah and hoped for His reward.", "He refused all this and preferred prison, for he feared Allah and hoped to earn His reward"),
      difficulty: 4,
      questions: [
        { q: "What did Yusuf say is dearer to him, in 12:33?", a: "Prison", wrong: ["The palace", "Gold", "Going home"], why: "O my Lord! Prison is dearer to me than that to which they invite me." },
        { q: "What did Allah do, in 12:34?", a: "Answered his prayer", wrong: ["Sent rain", "Sent an army", "Moved him home"], why: "So his Lord answered his invocation and turned away from him their plot." },
        { q: "Yusuf trusted his own strength, not Allah.", tf: false, why: "Please, do not abandon me and leave me to rely on myself." }
      ]
    },
    {
      slug: "shade-for-one-who-fears-allah",
      title: "Shade on that Day",
      line: "Allah shades one who refuses a wrong call, saying: I fear Allah.",
      facts: ["Seven are shaded that Day", "A youth raised in worship too"],
      quote: q12(33),
      source: hadith("bukhari", "660", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah will shade seven on the Day with no shade but His, among them a youth raised in worship and a man who refuses a wrong call and says: I am afraid of Allah.", "a youth who has been brought up in the worship of Allah"),
      difficulty: 4,
      questions: [
        { q: "How many will Allah shade, per the hadith?", a: "Seven", wrong: ["Three", "Ten", "Forty"], why: "Allah will give shade to seven, on the Day when there will be no shade but His." },
        { q: "Which youth is shaded, per the hadith?", a: "One raised in worship of Allah", wrong: ["The strongest youth", "The richest youth", "The fastest runner"], why: "A youth who has been brought up in the worship of Allah." },
        { q: "Ibn Kathir links the hadith of the seven to Yusuf's choice.", tf: true, why: "He cites it right after Yusuf chose prison out of fear of Allah." }
      ]
    },
    {
      slug: "jailed-though-innocent",
      title: "Jailed though innocent",
      line: "They saw he was innocent but still put Yusuf in prison.",
      facts: ["To hide the talk in town", "His name was cleared later"],
      quote: q12(35),
      source: ik(35, "Even after seeing proof of his innocence, they jailed Yusuf for a time to quiet the talk. Later he refused to leave prison until his innocence was made clear.", "even after they were convinced of his innocence and saw the proofs of his truth, honesty and chastity"),
      difficulty: 4,
      questions: [
        { q: "Did they know Yusuf was innocent, per 12:35?", a: "Yes, they had seen proof", wrong: ["No, they had no idea", "Only the king knew", "Only Yusuf knew"], why: "After they had seen the proofs of his innocence, to imprison him for a time." },
        { q: "How long was he to be jailed, in 12:35?", a: "For a time", wrong: ["One night", "Forever", "Until he paid"], why: "To imprison him for a time." },
        { q: "Yusuf later left prison with his honor intact.", tf: true, why: "When this was successfully achieved, Yusuf left the prison with his honor intact." }
      ]
    },
    {
      slug: "two-dreams-in-prison",
      title: "Two dreams in prison",
      line: "Two young men in prison asked Yusuf to explain their dreams.",
      facts: ["The king's drink-maker", "The king's baker"],
      quote: q12(36),
      source: ik(36, "Two young men entered prison with Yusuf, the king's drink-maker and his baker. Each saw a dream and asked Yusuf for its meaning, seeing him as a doer of good.", "and the other was his baker"),
      difficulty: 4,
      questions: [
        { q: "Who were the two men, per Qatadah?", a: "The king's drink-maker and baker", wrong: ["Two princes", "Two soldiers", "Two farmers"], why: "One of them was the king's distiller and the other was his baker." },
        { q: "What did one man see on his head, in 12:36?", a: "Bread with birds eating it", wrong: ["A crown", "A basket of fish", "A lamp"], why: "I saw myself carrying bread on my head and birds were eating thereof." },
        { q: "They asked Yusuf because they saw him as a doer of good.", tf: true, why: "Verily, we think you are one of the doers of good." }
      ]
    },
    {
      slug: "tawhid-before-dreams",
      title: "Tawhid before the dreams",
      line: "First Yusuf told them he follows the faith of his fathers.",
      facts: ["Ibrahim, Ishaq and Ya'qub", "No partners with Allah"],
      quote: q12(38),
      source: ik(37, "Yusuf said his knowledge was from Allah because he left the religion of disbelievers and followed Ibrahim, Ishaq and Ya'qub. Tawhid is a grace from Allah to them and to mankind.", "affirming that there is no deity worthy of worship except Allah alone without partners"),
      difficulty: 4,
      questions: [
        { q: "Whose religion did Yusuf follow, in 12:38?", a: "Ibrahim, Ishaq and Ya'qub", wrong: ["The 'Aziz", "The Egyptian priests", "The caravan"], why: "And I have followed the religion of my fathers, Ibrahim, Ishaq and Ya'qub." },
        { q: "Where did Yusuf's knowledge come from, in 12:37?", a: "His Lord taught him", wrong: ["Old books", "The priests", "The stars"], why: "This is of that which my Lord has taught me." },
        { q: "Most people thank Allah for sending Messengers.", tf: false, why: "But most men thank not." }
      ]
    },
    {
      slug: "many-lords-or-one",
      title: "Many lords, or Allah the One?",
      line: "Are many gods better, or Allah, the One, the Irresistible?",
      facts: ["Only names they made up", "That is the straight religion"],
      quote: q12(39),
      source: ik(39, "Yusuf called his two companions to worship Allah alone. The idols are only names they and their fathers made up, with no proof from Allah. The command is for Allah alone.", "They have no proof or authority that supports this practice"),
      difficulty: 4,
      questions: [
        { q: "What did Yusuf ask, in 12:39?", a: "Are many lords better or Allah, the One?", wrong: ["Who is your king?", "Where is your home?", "What did you eat?"], why: "Are many different lords better or Allah, the One, the Irresistible?" },
        { q: "What are the idols, per 12:40?", a: "Only names they made up", wrong: ["Angels", "Wise kings", "Old Prophets"], why: "You do not worship besides Him but only names which you have named." },
        { q: "To whom is the command, in 12:40?", a: "Allah alone", wrong: ["The king", "The priests", "Their fathers"], why: "The command is for none but Allah." }
      ]
    },
    {
      slug: "the-dreams-explained",
      title: "The dreams explained",
      line: "One would serve the king drink again; the other would not live.",
      facts: ["He spoke gently to the sad one", "The matter was decided"],
      quote: q12(41),
      source: ik(41, "Yusuf told the drink-maker he would serve his master again. He told the other his end gently, without facing him directly, to lessen his grief.", "He did not direct this speech at him, however, so that to lessen the grief of the other person"),
      difficulty: 4,
      questions: [
        { q: "What would the drink-maker do, in 12:41?", a: "Serve his master drink again", wrong: ["Become king", "Stay in prison", "Travel far"], why: "As for one of you, he will pour out wine for his master to drink." },
        { q: "Why did Yusuf speak indirectly?", a: "To lessen the other's grief", wrong: ["He was unsure", "He was afraid", "He forgot"], why: "He did not direct this speech at him, so as to lessen the grief of the other person." },
        { q: "Yusuf said the matter they asked about was decided.", tf: true, why: "Thus is the case judged concerning which you both did inquire." }
      ]
    },
    {
      slug: "mention-me-to-your-king",
      title: "Mention me to your king",
      line: "Yusuf asked to be mentioned; Shaytan made the man forget.",
      facts: ["A few more years in prison", "Three to nine years"],
      quote: q12(42),
      source: ik(42, "Yusuf asked the man who would be saved to mention him to the king. Shaytan made the man forget, so Yusuf stayed in prison a few more years, three to nine.", "it means between three and nine, according to Mujahid and Qatadah"),
      difficulty: 4,
      questions: [
        { q: "What did Yusuf ask the freed man, in 12:42?", a: "Mention me to your king", wrong: ["Bring me food", "Tell my father", "Open the door"], why: "Mention me to your king." },
        { q: "Who made the man forget, in 12:42?", a: "Shaytan", wrong: ["The king", "The 'Aziz", "The guards"], why: "But Shaytan made him forget to mention it to his master." },
        { q: "How many years is a few, per Mujahid and Qatadah?", a: "Three to nine", wrong: ["One or two", "Twenty", "Forty"], why: "It means between three and nine, according to Mujahid and Qatadah." }
      ]
    }
  ]
};

/** Ayahs 43 to 57: the king's dream, a plan for the hard years, Yusuf's name cleared, and trust over the storehouses. */
const YUSUF_THREE: DeepUnit = {
  key: "yusuf3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yusuf",
  name: "Yusuf, ayahs 43 to 57",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yusuf",
  lessons: [
    {
      slug: "seven-fat-cows",
      title: "Seven fat cows, seven lean",
      line: "The king dreamt seven lean cows ate seven fat ones.",
      facts: ["Seven green ears, seven dry", "His chiefs could not explain"],
      quote: q12(43),
      source: ik(43, "The king saw seven fat cows eaten by seven lean ones, and seven green ears of grain and seven dry. His chiefs called it mixed-up dreams and could not explain it.", "He gathered the priests, the chiefs of his state and the princes and told them what he had seen in a dream"),
      difficulty: 4,
      questions: [
        { q: "What ate the seven fat cows, in 12:43?", a: "Seven lean cows", wrong: ["Seven lions", "Seven wolves", "Seven birds"], why: "I saw seven fat cows, whom seven lean ones were devouring." },
        { q: "What did the chiefs call the dream, in 12:44?", a: "Mixed-up false dreams", wrong: ["A true vision", "A warning from stars", "A poem"], why: "They said: Mixed up false dreams and we are not skilled in the interpretation of dreams." },
        { q: "The king's chiefs explained the dream well.", tf: false, why: "We are not skilled in the interpretation of dreams." }
      ]
    },
    {
      slug: "the-man-remembers",
      title: "The freed man remembers",
      line: "The freed man remembered Yusuf, the man of truth, at last.",
      facts: ["Years after he forgot", "Yusuf did not blame him"],
      quote: q12(45),
      source: ik(43, "The man saved from prison finally remembered Yusuf and asked to be sent to him. Yusuf explained the dream without blaming him for forgetting, and without asking to be freed first.", "without criticizing the man for forgetting his request that he had made to him"),
      difficulty: 4,
      questions: [
        { q: "What did the freed man call Yusuf, in 12:46?", a: "The man of truth", wrong: ["The king's son", "The stranger", "The poet"], why: "O Yusuf, the man of truth! Explain to us seven fat cows." },
        { q: "Did Yusuf blame the man for forgetting?", a: "No, he explained at once", wrong: ["Yes, harshly", "He refused to speak", "He asked for gold first"], why: "Without criticizing the man for forgetting his request that he had made to him." },
        { q: "Yusuf demanded to be freed before explaining the dream.", tf: false, why: "Neither did he make a precondition that he be released before explaining the meaning." }
      ]
    },
    {
      slug: "store-it-in-the-ear",
      title: "Store it in the ear",
      line: "Sow for seven years and store the grain left in its ears.",
      facts: ["Eat only a little", "Then seven hard years"],
      quote: q12(47),
      source: ik(43, "Yusuf said the cows were years. Seven good years would come, so store the harvest in its ears to keep it fresh and eat little, for seven hard years would follow.", "leave it in the ears so as to preserve"),
      difficulty: 4,
      questions: [
        { q: "What did the cows stand for, per Yusuf?", a: "Years", wrong: ["Kings", "Rivers", "Cities"], why: "He interpreted the cows to be years." },
        { q: "How should they store the harvest, in 12:47?", a: "Left in its ears", wrong: ["Ground into flour", "Thrown in the river", "Sold to traders"], why: "That which you reap you shall leave it in the ears." },
        { q: "Yusuf told them to eat freely in the good years.", tf: false, why: "Except a little of it which you may eat. Stay away from extravagance." }
      ]
    },
    {
      slug: "a-year-of-relief",
      title: "Then a year of rain",
      line: "After the hard years would come a year of plenty and rain.",
      facts: ["Good news beyond the dream", "People would press oil again"],
      quote: q12(49),
      source: ik(43, "Yusuf also gave good news not in the dream: after the seven years of drought would come a year of rain when the land would give in plenty.", "He delivered the good news to them that after the consecutive years of drought, there will come a fertile year"),
      difficulty: 4,
      questions: [
        { q: "What came after the seven hard years, in 12:49?", a: "A year of abundant rain", wrong: ["Seven more hard years", "A flood", "A war"], why: "Then thereafter will come a year in which people will have abundant rain." },
        { q: "What would people press in that year, in 12:49?", a: "Grapes and oil", wrong: ["Gold", "Stones", "Wool"], why: "And in which they will press (wine and oil)." },
        { q: "Yusuf added good news beyond what the dream showed.", tf: true, why: "He delivered the good news to them that after the years of drought, there will come a fertile year." }
      ]
    },
    {
      slug: "clear-my-name-first",
      title: "Clear my name first",
      line: "Yusuf would not leave prison until his innocence was clear.",
      facts: ["Ask about the women", "He wanted no doubt left"],
      quote: q12(50),
      source: ik(50, "When the king sent for him, Yusuf refused to leave until the king looked into the women who cut their hands, so all would know he was jailed unjustly.", "Yusuf refused to leave the prison until the king and his subjects declare his innocence"),
      difficulty: 4,
      questions: [
        { q: "What did Yusuf say to the king's messenger, in 12:50?", a: "Ask about the women", wrong: ["Bring me gold", "Free my friends", "Come back tomorrow"], why: "Return to your king and ask him, what happened to the women who cut their hands?" },
        { q: "Why did Yusuf wait?", a: "To clear his name first", wrong: ["He liked prison", "He was ill", "He feared the king"], why: "He wanted them to know that sending him to prison was an act of injustice." },
        { q: "Yusuf rushed out the moment he was called.", tf: false, why: "Yusuf refused to leave the prison until the king and his subjects declare his innocence." }
      ]
    },
    {
      slug: "the-patience-of-yusuf",
      title: "The patience of Yusuf",
      line: "The Prophet ﷺ praised how long Yusuf waited in prison.",
      facts: ["Mercy on Lut too", "Humble praise of a brother"],
      quote: q12(50),
      source: hadith("bukhari", "3372", "Abu Hurairah", "Sahih", "The Prophet ﷺ said that had he stayed in prison as long as Yusuf did, he would have accepted the offer of release. This humbly praises Yusuf's patience.", "If I were to stay in prison for such a long time as Joseph did I would have accepted the offer"),
      difficulty: 4,
      questions: [
        { q: "What would the Prophet ﷺ have done in Yusuf's place?", a: "Accepted the offer to leave", wrong: ["Stayed forever", "Asked for gold", "Written a letter"], why: "If I were to stay in prison for such a long time I would have accepted the offer." },
        { q: "What does the hadith on the long prison stay praise?", a: "His patience", wrong: ["His wealth", "His strength", "His speed"], why: "The Sunnah of our Prophet ﷺ praised Prophet Yusuf and asserted his patience." },
        { q: "The hadith also asks Allah's mercy on Lut.", tf: true, why: "And may Allah send His mercy on Lut! He wished to have powerful support!" }
      ]
    },
    {
      slug: "the-truth-is-clear",
      title: "Now the truth is clear",
      line: "The women cleared Yusuf; the 'Aziz's wife admitted the truth.",
      facts: ["No evil known of him", "He is of the truthful"],
      quote: q12(51),
      source: ik(50, "The king asked the women. They said they knew no evil of Yusuf. The 'Aziz's wife said the truth is now clear: it was her doing, and he is truthful.", "Now the truth is manifest"),
      difficulty: 4,
      questions: [
        { q: "What did the women say, in 12:51?", a: "No evil know we against him", wrong: ["He is guilty", "We do not remember", "Ask his brothers"], why: "Allah forbid! No evil know we against him!" },
        { q: "What did the 'Aziz's wife say, in 12:51?", a: "Now the truth is clear", wrong: ["Keep him in prison", "He must leave Egypt", "I do not know him"], why: "Now the truth is manifest (to all)... and he is surely of the truthful." },
        { q: "The inquiry left doubt about Yusuf.", tf: false, why: "And he is surely of the truthful." }
      ]
    },
    {
      slug: "the-self-inclines-to-evil",
      title: "The self inclines to evil",
      line: "The self leans to evil, except whom Allah shows mercy.",
      facts: ["No one frees himself of blame", "Allah forgives and has mercy"],
      quote: q12(53),
      source: ik(50, "In 12:53 the self is said to lean toward evil, except those to whom Allah gives His mercy. Allah is Oft-Forgiving, Most Merciful.", "except when my Lord bestows His mercy"),
      difficulty: 4,
      questions: [
        { q: "What is the self inclined to, in 12:53?", a: "Evil", wrong: ["Only good", "Sleep", "Nothing"], why: "Verily, the self is inclined to evil." },
        { q: "Who is protected from it, in 12:53?", a: "Those shown Allah's mercy", wrong: ["The rich", "The strong", "The old"], why: "Except when my Lord bestows His mercy (upon whom He wills)." },
        { q: "12:53 ends with: my Lord is Oft-Forgiving, Most Merciful.", tf: true, why: "Verily, my Lord is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "high-in-rank-and-trusted",
      title: "High in rank and trusted",
      line: "The king spoke with Yusuf and made him close and trusted.",
      facts: ["He saw his wisdom and manners", "Free, with his honor clear"],
      quote: q12(54),
      source: ik(54, "Once Yusuf's innocence was clear, the king brought him close. When he spoke with him and saw his wisdom and good manners, he said: today you are high in rank and fully trusted.", "You have assumed an exalted status with us and are indeed fully trusted"),
      difficulty: 4,
      questions: [
        { q: "What did the king say to Yusuf, in 12:54?", a: "You are high in rank and trusted", wrong: ["Go back to prison", "Leave Egypt", "Work in the fields"], why: "Verily, this day, you are with us high in rank and fully trusted." },
        { q: "When did the king honor him so?", a: "After speaking with him", wrong: ["Before meeting him", "After a battle", "After a year"], why: "Then, when he spoke to him, he said: this day, you are with us high in rank." },
        { q: "The king wanted Yusuf among his close aides.", tf: true, why: "That I may make him among my close aids and associates." }
      ]
    },
    {
      slug: "guard-with-knowledge",
      title: "A guard with knowledge",
      line: "Yusuf asked to run the storehouses: an honest, knowing guard.",
      facts: ["Ready for the hard years", "Self-praise allowed when needed"],
      quote: q12(55),
      source: ik(54, "Yusuf asked to be put over the storehouses so he could share the grain wisely in the hard years. He described himself as honest and knowing, which is allowed when there is a need.", "Yusuf praised himself, for this is allowed when"),
      difficulty: 5,
      questions: [
        { q: "What did Yusuf ask to be put over, in 12:55?", a: "The storehouses of the land", wrong: ["The army", "The palace kitchen", "The ships"], why: "Set me over the storehouses of the land." },
        { q: "How did Yusuf describe himself, in 12:55?", a: "A guard with knowledge", wrong: ["A strong fighter", "A rich man", "A fast rider"], why: "I will indeed guard them with full knowledge." },
        { q: "Praising your own skill is never allowed.", tf: false, why: "This is allowed when one's abilities are unknown and there is a need to do so." }
      ]
    },
    {
      slug: "reward-not-lost",
      title: "No reward is lost",
      line: "Allah gave Yusuf power in Egypt; good deeds are never wasted.",
      facts: ["Free after slavery and prison", "Patience rewarded"],
      quote: q12(56),
      source: ik(56, "Allah gave Yusuf authority in Egypt to go where he liked. Allah did not let his patience with his brothers and in prison be lost, but rewarded it.", "We did not let the patience of Yusuf"),
      difficulty: 5,
      questions: [
        { q: "What did Allah give Yusuf in the land, in 12:56?", a: "Full authority", wrong: ["A small farm", "A ship", "A shop"], why: "Thus did We give full authority to Yusuf in the land." },
        { q: "Whose reward does Allah never let be lost, in 12:56?", a: "The good-doers", wrong: ["The proud", "The rich", "The loud"], why: "And We make not to be lost the reward of the good doers." },
        { q: "Yusuf's patience went unrewarded.", tf: false, why: "We did not let the patience of Yusuf be lost." }
      ]
    },
    {
      slug: "better-in-the-hereafter",
      title: "Better in the Hereafter",
      line: "The reward of the Hereafter is better for believers with Taqwa.",
      facts: ["Greater than any kingdom", "Faith and Taqwa together"],
      quote: q12(57),
      source: ik(56, "What Allah prepared for Yusuf in the Hereafter is far greater than the power He gave him in this life. The Hereafter is better for those who believe and have Taqwa.", "is much greater, substantial and honored than the authority He gave him in this life"),
      difficulty: 5,
      questions: [
        { q: "What is better, in 12:57?", a: "The reward of the Hereafter", wrong: ["Power in Egypt", "Gold", "Long life"], why: "And verily, the reward of the Hereafter is better." },
        { q: "For whom is it better, in 12:57?", a: "Those who believe and have Taqwa", wrong: ["Kings only", "Traders", "Poets"], why: "For those who believed and had Taqwa." },
        { q: "Yusuf's power in Egypt was his greatest reward.", tf: false, why: "His reward in the Hereafter is much greater than the authority He gave him in this life." }
      ]
    },
    {
      slug: "the-most-honorable",
      title: "The most honorable",
      line: "The most honorable are the most God-fearing, then came Yusuf.",
      facts: ["Then he named Yusuf", "A Prophet son of Prophets"],
      quote: q12(57),
      source: hadith("bukhari", "3383", "Abu Hurairah", "Sahih", "Asked who is the most honorable, the Prophet ﷺ said the most God-fearing. Asked again, he named Yusuf, Allah's Prophet, son of Allah's Prophet, son of Allah's Prophet, son of Allah's Khalil.", "The most honorable person is"),
      difficulty: 5,
      questions: [
        { q: "Who is most honorable, per the first answer?", a: "The most God-fearing", wrong: ["The richest", "The strongest", "The oldest"], why: "Who is the most honorable amongst the people? He replied, the most Allah fearing." },
        { q: "Whom did the Prophet ﷺ name next?", a: "Yusuf", wrong: ["Sulayman", "Dawud", "Nuh"], why: "The most honorable person is Yusuf, Allah's Prophet, the son of Allah's Prophet." },
        { q: "Taqwa is the first measure of honor.", tf: true, why: "He replied, the most Allah fearing." }
      ]
    }
  ]
};

/** Ayahs 58 to 82: the brothers come for grain, Binyamin, the king's cup, and the eldest brother stays behind. */
const YUSUF_FOUR: DeepUnit = {
  key: "yusuf4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yusuf",
  name: "Yusuf, ayahs 58 to 82",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yusuf",
  lessons: [
    {
      slug: "brothers-come-for-grain",
      title: "The brothers come for grain",
      line: "The drought brought the brothers to Egypt; Yusuf knew them.",
      facts: ["They did not know him", "Binyamin stayed home"],
      quote: q12(58),
      source: ik(58, "The drought reached Kana'an, so ten brothers came to Egypt to buy food. Yusuf knew them at once, but they did not know him, for they had lost him as a boy.", "he knew them the minute he saw them"),
      difficulty: 4,
      questions: [
        { q: "Did the brothers know Yusuf, in 12:58?", a: "No, but he knew them", wrong: ["Yes, at once", "Only the eldest did", "They guessed later that day"], why: "And he recognized them, but they recognized him not." },
        { q: "Why did they come to Egypt?", a: "To buy food in the drought", wrong: ["To find Yusuf", "To trade horses", "To meet the king"], why: "The drought also reached the area of Kana'an, where Ya'qub and his children resided." },
        { q: "Ya'qub kept Binyamin at home that first time.", tf: true, why: "They were ten, because Ya'qub kept his son and Yusuf's brother Binyamin with him." }
      ]
    },
    {
      slug: "a-mercy-for-egypt",
      title: "A mercy for Egypt",
      line: "Yusuf shared the grain fairly and ate little himself.",
      facts: ["One camel load a family", "One meal a day at court"],
      quote: q12(58),
      source: ik(58, "Yusuf guarded the harvest and gave each family one camel load a year. He and the king ate only one meal a day so the food would last. He was a mercy to the people of Egypt.", "Indeed, Yusuf was a mercy from Allah sent to the people of Egypt"),
      difficulty: 4,
      questions: [
        { q: "How much did each family get a year?", a: "One camel load", wrong: ["Ten camel loads", "A ship's load", "Nothing"], why: "Yusuf would not give a family man more than whatever a camel could carry." },
        { q: "How did Yusuf eat in those years?", a: "Without filling himself", wrong: ["Feasts every day", "Only meat", "Only sweets"], why: "Yusuf himself did not fill his stomach from this food." },
        { q: "Ibn Kathir calls Yusuf a mercy to the people of Egypt.", tf: true, why: "Indeed, Yusuf was a mercy from Allah sent to the people of Egypt." }
      ]
    },
    {
      slug: "bring-your-brother",
      title: "Bring me your brother",
      line: "Yusuf asked them to bring their other brother next time.",
      facts: ["Full measure, the best host", "No grain without him"],
      quote: q12(59),
      source: ik(58, "Yusuf gave them what they needed and told them to bring the brother they had mentioned. If they came without him, there would be no grain for them.", "Bring me your brother from your father … side whom you mentioned"),
      difficulty: 4,
      questions: [
        { q: "Whom did Yusuf ask them to bring, in 12:59?", a: "Their brother from their father", wrong: ["Their mother", "Their cousins", "A camel"], why: "Bring me a brother of yours from your father." },
        { q: "What if they came without him, in 12:60?", a: "No grain for them", wrong: ["Double grain", "A prize", "A free ride"], why: "But if you bring him not to me, there shall be no measure (of corn) for you with me." },
        { q: "Yusuf called himself the best of hosts.", tf: true, why: "See you not that I give full measure, and that I am the best of the hosts?" }
      ]
    },
    {
      slug: "money-in-their-bags",
      title: "Money back in their bags",
      line: "Yusuf quietly had their money put back in their bags.",
      facts: ["So they would come again", "They might have nothing left"],
      quote: q12(62),
      source: ik(58, "Yusuf told his servants to put their goods back into their bags without them knowing, so they would return. It was said he feared they had nothing more to trade.", "because he feared that his brothers might not have any more merchandise"),
      difficulty: 4,
      questions: [
        { q: "What did Yusuf have put in their bags, in 12:62?", a: "Their money", wrong: ["A letter", "A gold cup", "A map"], why: "And Yusuf told his servants to put their money into their bags." },
        { q: "Why did he do it, in 12:62?", a: "So they would come again", wrong: ["To test the guards", "To get rid of it", "By mistake"], why: "In order that they might come again." },
        { q: "The brothers saw the servants do it.", tf: false, why: "To put their money into their bags, while they were unaware." }
      ]
    },
    {
      slug: "allah-is-the-best-guard",
      title: "Allah is the best guardian",
      line: "Ya'qub said: Allah is the best guardian, Most Merciful.",
      facts: ["He remembered their promise before", "He trusted Allah, not them"],
      quote: q12(64),
      source: ik(63, "The brothers promised to guard Binyamin, as they had promised about Yusuf. Ya'qub reminded them, then said Allah is the best guard and the Most Merciful of those who show mercy.", "Allah has the most mercy with me among all those who show mercy"),
      difficulty: 4,
      questions: [
        { q: "What did Ya'qub ask, in 12:64?", a: "Shall I trust you as with Yusuf?", wrong: ["Where is the gold?", "Who is the king?", "When is the harvest?"], why: "Can I entrust him to you except as I entrusted his brother [Yusuf] to you aforetime?" },
        { q: "Who is the best guardian, in 12:64?", a: "Allah", wrong: ["The brothers", "The king", "The 'Aziz"], why: "But Allah is the Best to guard." },
        { q: "The brothers used the same promise as with Yusuf.", tf: true, why: "This is what they said to Ya'qub about their brother Yusuf: verily, we will take care of him." }
      ]
    },
    {
      slug: "an-oath-by-allah",
      title: "An oath by Allah",
      line: "Ya'qub sent Binyamin only after they swore a firm oath by Allah.",
      facts: ["Unless they were overpowered", "Allah is Witness"],
      quote: q12(66),
      source: ik(65, "They found their money returned and pressed to take Binyamin. Ya'qub sent him only after they swore by Allah to bring him back unless overpowered, since the family needed food.", "until you swear by Allah with the strongest oath"),
      difficulty: 4,
      questions: [
        { q: "What did they find in their bags, in 12:65?", a: "Their money returned", wrong: ["Stones", "Letters", "Nothing"], why: "They found their money had been returned to them." },
        { q: "What did Ya'qub require, in 12:66?", a: "A solemn oath by Allah", wrong: ["A gold payment", "A written deal", "A hostage"], why: "Until you swear a solemn oath to me in Allah's Name, that you will bring him back." },
        { q: "Who did Ya'qub say is Witness, in 12:66?", a: "Allah", wrong: ["The eldest son", "The neighbors", "The caravan"], why: "Allah is the Witness to what we have said." }
      ]
    },
    {
      slug: "different-gates",
      title: "Enter by different gates",
      line: "Ya'qub told his sons: enter by different gates, trust Allah.",
      facts: ["He feared the evil eye", "The decision is Allah's alone"],
      quote: q12(67),
      source: ik(67, "Ya'qub told his sons to enter Egypt by different gates, since he feared the evil eye on them. Yet he said this cannot stop Allah's decree; in Him he put his trust.", "he feared the evil eye for them"),
      difficulty: 5,
      questions: [
        { q: "How should the sons enter, in 12:67?", a: "By different gates", wrong: ["By one gate", "At night only", "By boat"], why: "Do not enter by one gate, but enter by different gates." },
        { q: "What did Ya'qub fear, per Ibn Abbas and others?", a: "The evil eye", wrong: ["Robbers", "Wild animals", "Rain"], why: "He feared the evil eye for them, because they were handsome." },
        { q: "Ya'qub said his advice could block Allah's decree.", tf: false, why: "And I cannot avail you against Allah at all. Verily, the decision rests only with Allah." }
      ]
    },
    {
      slug: "the-evil-eye-is-real",
      title: "The evil eye is real",
      line: "The Prophet ﷺ said the effect of the evil eye is a fact.",
      facts: ["Take care, then trust Allah", "Nothing beats Allah's decree"],
      quote: q12(67),
      source: hadith("bukhari", "5740", "Abu Hurairah", "Sahih", "The Prophet ﷺ said the effect of an evil eye is a fact.", "The effect of an evil eye is a fact"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say about the evil eye?", a: "Its effect is a fact", wrong: ["It is a myth", "It is only for kings", "It helps people"], why: "The effect of an evil eye is a fact." },
        { q: "What did Ya'qub do after taking care?", a: "Trusted in Allah", wrong: ["Hired guards", "Stayed home", "Cancelled the trip"], why: "In Him, I put my trust and let all those that trust, put their trust in Him." },
        { q: "Taking care and trusting Allah go together.", tf: true, why: "It was but a need of Ya'qub's inner self which he discharged, while trusting Allah." }
      ]
    },
    {
      slug: "i-am-your-brother",
      title: "I am your brother",
      line: "Yusuf told Binyamin in secret: I am your brother, do not grieve.",
      facts: ["Honored as guests", "Binyamin kept the secret"],
      quote: q12(69),
      source: ik(69, "Yusuf honored the brothers as guests, then met Binyamin alone and told him he was his brother. He asked him not to be sad and to keep the news to himself.", "He met his brother in confidence and told him"),
      difficulty: 5,
      questions: [
        { q: "What did Yusuf tell Binyamin, in 12:69?", a: "I am your brother", wrong: ["I am the king", "Go home now", "I am a stranger"], why: "Verily, I am your brother, so grieve not for what they used to do." },
        { q: "How did Yusuf tell him?", a: "In private", wrong: ["Before everyone", "By letter", "In a dream"], why: "He met his brother in confidence and told him the story." },
        { q: "Binyamin told the others at once.", tf: false, why: "He ordered Binyamin to hide the news from them." }
      ]
    },
    {
      slug: "the-kings-cup",
      title: "The king's cup",
      line: "Yusuf had the king's cup placed in Binyamin's bag.",
      facts: ["Used to measure grain", "A camel load as reward"],
      quote: q12(70),
      source: ik(70, "Yusuf had the king's cup, used to drink and to measure grain, placed in Binyamin's bag. A caller cried out that the caravan had stolen, offering a camel load to whoever returned it.", "Yusuf had the bowl placed in … bag while they were unaware"),
      difficulty: 5,
      questions: [
        { q: "Where was the cup placed, in 12:70?", a: "In Binyamin's bag", wrong: ["In the eldest's bag", "Under a tent", "On a camel"], why: "He put the bowl in his brother's bag." },
        { q: "What was the reward for finding it, in 12:72?", a: "A camel load", wrong: ["A palace", "Ten slaves", "A sword"], why: "And for him who produces it is (the reward of) a camel load." },
        { q: "The cup was also used to measure grain.", tf: true, why: "Later, it measured food grains since food became scarce in that time." }
      ]
    },
    {
      slug: "by-their-own-ruling",
      title: "By their own ruling",
      line: "The brothers named the penalty; by it, Binyamin was kept.",
      facts: ["Not the law of the king", "Allah planned it for Yusuf"],
      quote: q12(76),
      source: ik(73, "The brothers swore they were no thieves and said the one with the cup should be held. Yusuf searched their bags first, then Binyamin's. Allah planned this, for Egypt's law would not allow it.", "Allah only allowed Yusuf to take his brother as a captive after his brothers agreed to this judgement beforehand"),
      difficulty: 5,
      questions: [
        { q: "Whose bags were searched first, in 12:76?", a: "The other brothers'", wrong: ["Binyamin's", "The servants'", "None"], why: "So he began (the search) in their bags before the bag of his brother." },
        { q: "Who set the penalty for the thief?", a: "The brothers themselves", wrong: ["The king", "Ya'qub", "The caravan"], why: "His penalty should be that he, in whose bag it is found, should be held." },
        { q: "The king's law in Egypt allowed keeping Binyamin.", tf: false, why: "He could not take his brother by the law of the king, except that Allah willed it." }
      ]
    },
    {
      slug: "above-every-knower",
      title: "Above every knower",
      line: "Over everyone with knowledge is the All-Knowing, Allah.",
      facts: ["Allah raises whom He wills", "All knowledge ends with Him"],
      quote: q12(76),
      source: ik(73, "Allah raises whom He wills in degrees. Al-Hasan said every knowing person has someone who knows more, until it ends with Allah.", "There is no knowledgeable person, but there is another person with more knowledge until it ends at Allah"),
      difficulty: 5,
      questions: [
        { q: "Who is above all who have knowledge, in 12:76?", a: "The All-Knowing, Allah", wrong: ["The king", "The scholars", "The elders"], why: "But over all those endowed with knowledge is the All-Knowing." },
        { q: "Where does knowledge end, per Al-Hasan?", a: "With Allah", wrong: ["With books", "With kings", "With the old"], why: "There is another person with more knowledge until it ends at Allah." },
        { q: "Allah raises in degrees whom He wills, in 12:76.", tf: true, why: "We raise to degrees whom We will." }
      ]
    },
    {
      slug: "kept-it-to-himself",
      title: "He kept it to himself",
      line: "They blamed Yusuf too; he answered only in his heart.",
      facts: ["He revealed nothing yet", "Allah knows best what they say"],
      quote: q12(77),
      source: ik(77, "The brothers said a brother of his had stolen before, meaning Yusuf. Yusuf did not answer aloud; he said only within himself that Allah knows best what they describe.", "Yusuf said this to himself and did not utter it aloud"),
      difficulty: 5,
      questions: [
        { q: "Whom did they blame along with Binyamin, in 12:77?", a: "Yusuf", wrong: ["The 'Aziz", "The caravan", "Ya'qub"], why: "If he steals, there was a brother of his who did steal before (him)." },
        { q: "How did Yusuf answer, in 12:77?", a: "Only in his heart", wrong: ["Loudly", "In a letter", "With anger"], why: "Yusuf said this to himself and did not utter it aloud." },
        { q: "Yusuf revealed who he was right then.", tf: false, why: "But these things did Yusuf keep in himself, revealing not the secrets to them." }
      ]
    },
    {
      slug: "take-one-of-us",
      title: "Take one of us instead",
      line: "They begged him to take another; Yusuf would wrong no one.",
      facts: ["Their old father would grieve", "Only the one with the cup"],
      quote: q12(79),
      source: ik(78, "The brothers asked the 'Aziz to take one of them in Binyamin's place for their father's sake. He said it would be wrong to take an innocent man for the one they had judged.", "if we take an innocent man instead of the guilty man"),
      difficulty: 5,
      questions: [
        { q: "What did the brothers offer, in 12:78?", a: "Take one of us in his place", wrong: ["A bag of gold", "Their camels", "To leave Egypt"], why: "So take one of us in his place." },
        { q: "Why did they say Binyamin must go home?", a: "He has an old father", wrong: ["He is ill", "He is a prince", "He has a farm"], why: "Verily, he has an old father (who will grieve for him)." },
        { q: "Yusuf agreed to take another brother instead.", tf: false, why: "Allah forbid, that we should take anyone but him with whom we found our property." }
      ]
    },
    {
      slug: "the-eldest-stays",
      title: "The eldest stays behind",
      line: "The eldest stayed in Egypt, ashamed to face his father.",
      facts: ["They had sworn an oath", "Ask the town and the caravan"],
      quote: q12(80),
      source: ik(80, "Having failed their oath to Ya'qub, the brothers talked in private. The eldest said he would not leave Egypt until his father allowed it or Allah judged. The rest went home to tell the truth.", "I will not leave Egypt"),
      difficulty: 5,
      questions: [
        { q: "What did the eldest remind them of, in 12:80?", a: "Their oath to their father", wrong: ["Their debts", "Their camels", "A dream"], why: "Know you not that your father did take an oath from you in Allah's Name?" },
        { q: "What did the eldest decide, in 12:80?", a: "To stay in Egypt", wrong: ["To fight the guards", "To go home first", "To hide in the desert"], why: "Therefore I will not leave this land until my father permits me." },
        { q: "They told Ya'qub to ask the town and the caravan.", tf: true, why: "And ask (the people of) the town where we have been, and the caravan in which we returned." }
      ]
    }
  ]
};

/** Ayahs 83 to 101: Ya'qub's patience and hope, "I am Yusuf", forgiveness, the shirt and the scent, the dream fulfilled. */
const YUSUF_FIVE: DeepUnit = {
  key: "yusuf5",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yusuf",
  name: "Yusuf, ayahs 83 to 101",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yusuf",
  lessons: [
    {
      slug: "patience-once-more",
      title: "Patience once more",
      line: "Losing Binyamin, Ya'qub chose patience again, full of hope.",
      facts: ["Maybe Allah brings them all", "The All-Knowing, All-Wise"],
      quote: q12(83),
      source: ik(83, "Ya'qub answered with the same words as before: patience is most fitting. He hoped Allah would bring back all three sons, Yusuf, Binyamin and the eldest.", "He then begged Allah to bring back his three sons"),
      difficulty: 4,
      questions: [
        { q: "What did Ya'qub say again, in 12:83?", a: "Patience is most fitting", wrong: ["I give up", "Bring me the king", "Go to war"], why: "So patience is most fitting (for me)." },
        { q: "How many sons did he hope to have back?", a: "Three", wrong: ["One", "Two", "Ten"], why: "He then begged Allah to bring back his three sons: Yusuf, Binyamin and Rubil." },
        { q: "Ya'qub said Allah may bring them all back to him.", tf: true, why: "May be Allah will bring them (back) all to me." }
      ]
    },
    {
      slug: "complaint-only-to-allah",
      title: "My complaint is to Allah",
      line: "Ya'qub grieved for Yusuf but complained only to Allah.",
      facts: ["He wept until his sight went", "He knew Allah would fulfill the dream"],
      quote: q12(86),
      source: ik(83, "The new loss renewed Ya'qub's old grief, and his sight faded from sorrow. He held it in and complained to no created being, only to Allah, sure that Yusuf's dream would come true.", "suppressed his sorrow and did not complain to a created being"),
      difficulty: 4,
      questions: [
        { q: "To whom did Ya'qub complain, in 12:86?", a: "Only to Allah", wrong: ["To the king", "To his sons", "To the neighbors"], why: "I only complain of my grief and sorrow to Allah." },
        { q: "What happened to his sight, in 12:84?", a: "He lost it from sorrow", wrong: ["It grew sharper", "Nothing", "He hurt it in a fall"], why: "And he lost his sight because of the sorrow that he was suppressing." },
        { q: "What did Ya'qub know from Allah, per Ibn Abbas?", a: "Yusuf's dream would come true", wrong: ["Binyamin stole", "The king would die", "A flood was near"], why: "The vision that Yusuf saw is truthful and Allah will certainly make it come true." }
      ]
    },
    {
      slug: "never-despair",
      title: "Never despair of Allah's mercy",
      line: "Go and search for Yusuf; never lose hope in Allah's mercy.",
      facts: ["Only disbelievers despair", "Search in a good way"],
      quote: q12(87),
      source: ik(87, "Ya'qub sent his sons to look for Yusuf and his brother in a good way, gave them good news, and told them never to despair of Allah's mercy.", "He ordered them to never give up hope in Allah"),
      difficulty: 4,
      questions: [
        { q: "What did Ya'qub tell his sons to do, in 12:87?", a: "Search for Yusuf and his brother", wrong: ["Stay home", "Sell the flock", "Build a well"], why: "O my sons! Go you and inquire about Yusuf and his brother." },
        { q: "Who despairs of Allah's mercy, in 12:87?", a: "The people who disbelieve", wrong: ["The patient", "The prophets", "The poor"], why: "Certainly no one despairs of Allah's mercy, except the people who disbelieve." },
        { q: "Ya'qub had given up hope after so many years.", tf: false, why: "He ordered them to never give up hope in Allah." }
      ]
    },
    {
      slug: "hope-makes-you-try",
      title: "Hope makes you try",
      line: "Hope pushes you to work hard; despair makes you lazy.",
      facts: ["As-Sa'di explains", "Raja'"],
      quote: q12(87),
      source: saadi(12, 87, "As-Sa'di says Ya'qub told his sons to search hard and not despair, for hope makes a servant strive for what he hopes for, while despair makes him slow and lazy; and a servant's hope in Allah's mercy grows with his faith.", "فإن الرجاء يوجب للعبد السعي والاجتهاد فيما رجاه"),
      difficulty: 2,
      questions: [
        { q: "What does hope lead a person to do, per as-Sa'di on 12:87?", a: "Strive and work hard", wrong: ["Sit and wait", "Give up", "Sleep more"], why: "Hope makes a servant strive for what he hopes for." },
        { q: "What does despair cause, per as-Sa'di on 12:87?", a: "Slowness and laziness", wrong: ["More effort", "More faith", "More joy"], why: "Despair makes a person slow and heavy." },
        { tf: true, q: "The stronger a person's faith, the more he hopes for Allah's mercy.", why: "As-Sa'di on 12:87." }
      ]
    },
    {
      slug: "be-charitable-to-us",
      title: "Be charitable to us",
      line: "The brothers came back poor and asked for kindness.",
      facts: ["Hard times hit their family", "They brought little money"],
      quote: q12(88),
      source: ik(87, "Back before Yusuf, they said hardship had struck them, they had brought little money, so give full measure and be charitable. Allah rewards the charitable.", "we brought money for the food we want to buy, but it is not substantial"),
      difficulty: 4,
      questions: [
        { q: "What had hit the family, in 12:88?", a: "A hard time", wrong: ["Great wealth", "A wedding", "A flood of gold"], why: "O Aziz! A hard time has hit us and our family." },
        { q: "What did they ask for, in 12:88?", a: "Full measure and charity", wrong: ["A palace", "An army", "A ship"], why: "So pay us full measure and be charitable to us." },
        { q: "Whom does Allah reward, in 12:88?", a: "The charitable", wrong: ["The proud", "The stingy", "The loud"], why: "Truly, Allah does reward the charitable." }
      ]
    },
    {
      slug: "i-am-yusuf",
      title: "I am Yusuf",
      line: "Yusuf wept and said: I am Yusuf, and this is my brother.",
      facts: ["Taqwa and patience win", "After hardship comes ease"],
      quote: q12(90),
      source: ik(89, "Seeing their hardship and remembering his father's grief, Yusuf wept and told them who he was. He said whoever has Taqwa and patience, Allah never lets his reward be lost.", "so he cried and revealed his true identity to them"),
      difficulty: 5,
      questions: [
        { q: "What did the brothers ask, in 12:90?", a: "Are you indeed Yusuf?", wrong: ["Where is the cup?", "Who is the king?", "Can we go home?"], why: "They said: Are you indeed Yusuf?" },
        { q: "What brings a reward that is never lost, in 12:90?", a: "Taqwa and patience", wrong: ["Wealth and power", "Beauty and youth", "Luck"], why: "He who has Taqwa, and is patient, then surely, Allah makes not the reward of the gooddoers to be lost." },
        { q: "Yusuf told them who he was with a laugh of triumph.", tf: false, why: "He felt compassion and pity, so he cried and revealed his true identity to them." }
      ]
    },
    {
      slug: "no-blame-on-you-today",
      title: "No blame on you today",
      line: "They admitted their wrong; Yusuf said: no blame on you today.",
      facts: ["He would never remind them", "He prayed for their forgiveness"],
      quote: q12(92),
      source: ik(89, "The brothers admitted Allah had preferred Yusuf and they had sinned. He told them there was no blame on them, he would not remind them again, and prayed Allah forgive them.", "There will be no blame for you today or admonishment"),
      difficulty: 5,
      questions: [
        { q: "What did the brothers admit, in 12:91?", a: "We have been sinners", wrong: ["We are kings", "We did nothing", "We will leave"], why: "Indeed Allah has preferred you above us, and we certainly have been sinners." },
        { q: "What did Yusuf say, in 12:92?", a: "No reproach on you this day", wrong: ["You will be punished", "Go to prison", "Pay me back"], why: "He said: No reproach on you this day; may Allah forgive you." },
        { q: "Yusuf promised not to bring up their wrong again.", tf: true, why: "I will not remind you after today of your error against me." }
      ]
    },
    {
      slug: "forgiving-raises-honor",
      title: "Forgiving raises your honor",
      line: "Whoever forgives, Allah only raises his honor.",
      facts: ["Charity does not lessen wealth", "Humility lifts your rank"],
      quote: q12(92),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, no one forgives except that Allah increases his honor, and no one humbles himself for Allah except that Allah raises him.", "no one forgives another except that Allah increases his honor"),
      difficulty: 5,
      questions: [
        { q: "What does Allah give one who forgives?", a: "More honor", wrong: ["Less respect", "Nothing", "More enemies"], why: "No one forgives another except that Allah increases his honor." },
        { q: "What happens to wealth given in charity?", a: "It does not decrease", wrong: ["It is lost", "It halves", "It is taxed"], why: "Charity does not decrease wealth." },
        { q: "Yusuf's forgiveness of his brothers fits the hadith on forgiving.", tf: true, why: "No reproach on you this day; may Allah forgive you." }
      ]
    },
    {
      slug: "the-scent-of-yusuf",
      title: "The scent of Yusuf",
      line: "As the caravan left Egypt, Ya'qub sensed the scent of Yusuf.",
      facts: ["Eight days' journey away", "They called it old error"],
      quote: q12(94),
      source: ik(93, "Yusuf sent his shirt to be cast on his father's face. When the caravan left Egypt, the wind carried its scent to Ya'qub from eight days away, though his sons said he was in his old error.", "He found his scent from a distance of eight days away"),
      difficulty: 5,
      questions: [
        { q: "What did Yusuf send to his father, in 12:93?", a: "His shirt", wrong: ["A letter", "A ring", "A camel"], why: "Go with this shirt of mine, and cast it over the face of my father." },
        { q: "How far away did Ya'qub sense the scent, per Ibn Abbas?", a: "Eight days away", wrong: ["One step away", "A year away", "Next door"], why: "He found his scent from a distance of eight days away!" },
        { q: "Qatadah said their harsh reply to their father was wrong.", tf: true, why: "So they uttered a harsh word to their father that they should never have uttered." }
      ]
    },
    {
      slug: "his-sight-returns",
      title: "His sight returns",
      line: "The shirt was cast on his face, and Ya'qub could see again.",
      facts: ["I know from Allah what you do not", "He would seek forgiveness for them"],
      quote: q12(96),
      source: ik(96, "The bearer of good news cast the shirt on Ya'qub's face and his sight returned. The sons asked him to seek forgiveness for them, and he said he would ask his Lord.", "sight was restored to him"),
      difficulty: 5,
      questions: [
        { q: "What happened when the shirt touched his face, in 12:96?", a: "His sight returned", wrong: ["He fell asleep", "He wept more", "Nothing changed"], why: "He cast it over his face, and his vision returned." },
        { q: "What did the sons ask Ya'qub, in 12:97?", a: "Ask forgiveness for us", wrong: ["Give us gold", "Let us rule", "Forget Yusuf"], why: "O our father! Ask forgiveness (from Allah) for our sins." },
        { q: "Ya'qub refused to pray for them.", tf: false, why: "I will ask my Lord for forgiveness for you, verily, He! Only He is the Oft-Forgiving." }
      ]
    },
    {
      slug: "the-dream-comes-true",
      title: "The dream comes true",
      line: "In Egypt the family bowed; Yusuf's childhood dream came true.",
      facts: ["Eleven brothers and his parents", "Raised to his seat of honor"],
      quote: q12(100),
      source: ik(99, "Yusuf welcomed his family to Egypt in safety and raised his parents to his seat. They bowed before him, and he said: this is the meaning of my dream; my Lord made it come true.", "reference to the dream that he narrated to his father"),
      difficulty: 5,
      questions: [
        { q: "What did Yusuf say when they bowed, in 12:100?", a: "This is the meaning of my dream", wrong: ["Stand up now", "Go home", "Bring the cup"], why: "O my father! This is the interpretation of my dream aforetime!" },
        { q: "Whom did Yusuf raise to his seat, in 12:100?", a: "His parents", wrong: ["His brothers", "The king", "The 'Aziz"], why: "And he raised his parents to the throne." },
        { q: "Who sowed enmity among the brothers, per 12:100?", a: "Shaytan", wrong: ["The king", "Binyamin", "The caravan"], why: "After Shaytan had sown enmity between me and my brothers." }
      ]
    },
    {
      slug: "prostration-only-to-allah",
      title: "Prostration only to Allah",
      line: "Bowing to rulers was allowed then; Islam keeps it for Allah.",
      facts: ["Allowed from Adam to Isa", "Forbidden in our law"],
      quote: q12(100),
      source: ik(99, "In the laws of earlier Prophets, people could bow before men of authority. Islam made prostration only for Allah, the Exalted.", "Islam made prostration exclusively for Allah Alone"),
      difficulty: 5,
      questions: [
        { q: "To whom is prostration in Islam?", a: "Allah alone", wrong: ["Kings", "Parents", "Scholars"], why: "Islam made prostration exclusively for Allah Alone." },
        { q: "Bowing to men of authority was allowed in earlier laws.", tf: true, why: "This practice was allowed in the law of Adam until the law of Isa." },
        { q: "Muslims today may prostrate to a ruler.", tf: false, why: "This practice was later prohibited in our law." }
      ]
    },
    {
      slug: "let-me-die-a-muslim",
      title: "Let me die a Muslim",
      line: "Yusuf prayed: let me die a Muslim and join the righteous.",
      facts: ["After every blessing was complete", "Allah is his Wali in both worlds"],
      quote: q12(101),
      source: ik(101, "With his family together and his blessings complete, Yusuf asked Allah to keep His favor into the Hereafter: to die as a Muslim and join the righteous Prophets.", "He begged Him that, when he dies, he dies as a Muslim"),
      difficulty: 5,
      questions: [
        { q: "How did Yusuf ask to die, in 12:101?", a: "As a Muslim", wrong: ["As a king", "Rich", "In Egypt"], why: "Cause me to die as a Muslim, and join me with the righteous." },
        { q: "Whom did he ask to join, in 12:101?", a: "The righteous", wrong: ["The kings", "The rich", "The poets"], why: "And join me with the righteous." },
        { q: "Whom did Yusuf call his Wali in both worlds?", a: "Allah", wrong: ["The king", "His father", "The 'Aziz"], why: "You are my Wali in this world and in the Hereafter." }
      ]
    },
    {
      slug: "the-highest-companion",
      title: "The highest companion",
      line: "The last words of the Prophet ﷺ chose the highest companions.",
      facts: ["Like Yusuf, he chose Allah", "Prophets are given the choice"],
      quote: q12(101),
      source: hadith("bukhari", "4463", "Aishah", "Sahih", "Aishah said that as death came, the Prophet ﷺ looked up and said: O Allah, with the highest companions. A Prophet is shown his place in Paradise and given the choice.", "O Allah! (with) the highest companions"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ say at the end?", a: "O Allah, the highest companions", wrong: ["Bring me water", "Call Abu Bakr", "Close the door"], why: "He then looked at the ceiling of the house and said, O Allah! (with) the highest companions." },
        { q: "Who narrated the hadith of the highest companions?", a: "Aishah", wrong: ["Ali", "Anas", "Umar"], why: "Narrated Aishah: When death approached him while his head was on my thigh." },
        { q: "Ibn Kathir links this to Yusuf's prayer in 12:101.", tf: true, why: "It is possible that Yusuf said this supplication while dying, like the Prophet ﷺ." }
      ]
    }
  ]
};

/** Ayahs 102 to 111: news of the Unseen, the signs people pass by, the way of the Messenger, and lessons for those who think. */
const YUSUF_SIX: DeepUnit = {
  key: "yusuf6",
  topicId: "quran_tafseer",
  branchId: "quran-surah-yusuf",
  name: "Yusuf, ayahs 102 to 111",
  kind: "skill",
  lessonType: "surah",
  surahName: "Yusuf",
  lessons: [
    {
      slug: "news-of-the-unseen",
      title: "News of the Unseen",
      line: "The Prophet ﷺ was not there; Allah told him the story.",
      facts: ["Revealed, not witnessed", "A sign he is a Messenger"],
      quote: q12(102),
      source: ik(102, "The story of Yusuf is news of the Unseen revealed to the Prophet ﷺ. He was not with the brothers when they plotted; Allah taught it to him by revelation.", "you did not witness their conference nor saw them"),
      difficulty: 5,
      questions: [
        { q: "How did the Prophet ﷺ know this story, in 12:102?", a: "Allah revealed it", wrong: ["He read old books", "Travelers told him", "He was there"], why: "That is of the news of the Ghayb (Unseen) which We reveal to you." },
        { q: "Was the Prophet ﷺ there when the brothers plotted?", a: "No", wrong: ["Yes", "Only at the end", "Only at the well"], why: "You were not (present) with them when they arranged their plan together." },
        { q: "Most people believe even when the Prophet ﷺ greatly wishes it.", tf: false, why: "And most of mankind will not believe even if you desire it eagerly." }
      ]
    },
    {
      slug: "no-reward-asked",
      title: "No payment asked",
      line: "The Prophet ﷺ asked no pay; the Quran is a reminder for all.",
      facts: ["For mankind and jinn", "Sincere advice for Allah"],
      quote: q12(104),
      source: ik(102, "The Prophet ﷺ asked no price for his call. He gave sincere advice seeking Allah's Face. The Quran is a reminder for all the worlds.", "Rather, you do so seeking … Face and to deliver good and sincere advice to His creatures"),
      difficulty: 5,
      questions: [
        { q: "What did the Prophet ﷺ ask for his call, in 12:104?", a: "No reward at all", wrong: ["Gold", "A palace", "Land"], why: "And no reward you ask of them for it." },
        { q: "What is the Quran, in 12:104?", a: "A reminder to all the worlds", wrong: ["A book for one tribe", "A poem", "A history only"], why: "It (the Quran) is no less than a Reminder unto the Alamin (men and Jinn)." },
        { q: "He called people seeking Allah's Face.", tf: true, why: "You do so seeking Allah's Face and to deliver good and sincere advice." }
      ]
    },
    {
      slug: "signs-they-pass-by",
      title: "Signs they pass by",
      line: "People pass countless signs in sky and earth, and turn away.",
      facts: ["Stars, seas and mountains", "Fruits of every taste"],
      quote: q12(105),
      source: ik(105, "Most people do not think about Allah's signs in the heavens and earth: stars, mountains, seas, deserts, and fruits alike in shape but different in taste.", "Allah states that most people do not think about His signs"),
      difficulty: 5,
      questions: [
        { q: "What do people do with the signs, in 12:105?", a: "Pass by and turn away", wrong: ["Study them all", "Write poems", "Count them"], why: "And how many a sign in the heavens and the earth they pass by, while they are averse therefrom." },
        { q: "Where are the signs, in 12:105?", a: "In the heavens and the earth", wrong: ["Only in books", "Only in Makkah", "Only at night"], why: "And how many a sign in the heavens and the earth." },
        { q: "Ibn Kathir mentions fruits alike in shape but different in taste.", tf: true, why: "Plants and fruits that are similar in shape, but different in taste, scent, color." }
      ]
    },
    {
      slug: "faith-mixed-with-shirk",
      title: "Faith mixed with shirk",
      line: "Many say Allah created all, yet worship others with Him.",
      facts: ["They admitted Allah created", "Swearing by other than Allah"],
      quote: q12(106),
      source: ik(106, "Ibn Abbas said many admit Allah created the heavens and earth, yet worship others with Him. Ibn Kathir also warns of hidden shirk, like swearing by other than Allah.", "They have a part of faith"),
      difficulty: 5,
      questions: [
        { q: "What do most of them do, in 12:106?", a: "Believe, yet add partners", wrong: ["Believe purely", "Deny all gods", "Worship nothing"], why: "And most of them believe not in Allah except that they attribute partners unto Him." },
        { q: "Who did they say created the heavens, per Ibn Abbas?", a: "Allah", wrong: ["Their idols", "The stars", "Nobody"], why: "When they are asked, Who created the heavens? They say, Allah did." },
        { q: "Ibn Kathir lists swearing by other than Allah as shirk.", tf: true, why: "He who swears by other than Allah, commits Shirk." }
      ]
    },
    {
      slug: "swear-only-by-allah",
      title: "Swear only by Allah",
      line: "Swearing by other than Allah is a form of shirk.",
      facts: ["Not by the Ka'bah either", "Ibn Umar corrected a man"],
      quote: q12(106),
      source: hadith("tirmidhi", "1535", "Ibn Umar", "Sahih", "Ibn Umar heard a man swear by the Ka'bah and told him not to swear by other than Allah, for the Prophet ﷺ said whoever swears by other than Allah has committed disbelief or shirk.", "Nothing is sworn by other than Allah"),
      difficulty: 5,
      questions: [
        { q: "What did the man swear by?", a: "The Ka'bah", wrong: ["Allah", "The Quran", "His father"], why: "Ibn Umar heard a man saying: No by the Kabah." },
        { q: "By whom alone may we swear?", a: "Allah", wrong: ["The Ka'bah", "Our parents", "The Prophets"], why: "Nothing is sworn by other than Allah." },
        { q: "Swearing by a holy place is fine in Islam.", tf: false, why: "Whoever swears by other than Allah, he has committed disbelief or shirk." }
      ]
    },
    {
      slug: "this-is-my-way",
      title: "This is my way",
      line: "Say: this is my way; I call to Allah with sure knowledge.",
      facts: ["The Prophet ﷺ and his followers", "Glory be to Allah, no partner"],
      quote: q12(108),
      source: ik(108, "The Prophet's ﷺ way is to call to the testimony that none is worshipped but Allah, with sure knowledge and proof. Those who follow him call to the same.", "calls to this testimonial with sure knowledge, certainty and firm evidence"),
      difficulty: 5,
      questions: [
        { q: "How does the Prophet ﷺ call to Allah, in 12:108?", a: "With sure knowledge", wrong: ["With force", "With guesses", "With magic"], why: "I invite unto Allah with sure knowledge, I and whosoever follows me." },
        { q: "Who else calls this way, in 12:108?", a: "Whoever follows him", wrong: ["Only kings", "Only angels", "No one"], why: "I and whosoever follows me." },
        { q: "The Prophet ﷺ said he is not of the idolaters.", tf: true, why: "And Glorified and Exalted be Allah. And I am not of the idolators." }
      ]
    },
    {
      slug: "a-call-and-its-reward",
      title: "A call and its reward",
      line: "Whoever calls to good gets the reward of all who follow.",
      facts: ["Their reward is not lessened", "Calling to wrong carries sin"],
      quote: q12(108),
      source: hadith("muslim", "2674", "Abu Hurairah", "Sahih", "The Prophet ﷺ said whoever calls to guidance has a reward like those who follow it, without lessening theirs; whoever calls to error carries its sin like those who do it.", "He who called (people) to righteousness, there would be reward (assured) for him like the rewards of those who adhered to it"),
      difficulty: 5,
      questions: [
        { q: "What does one who calls to good receive?", a: "The reward of those who follow", wrong: ["Nothing extra", "Only praise", "Gold"], why: "There would be reward for him like the rewards of those who adhered to it." },
        { q: "Does it lessen the followers' reward?", a: "No, not at all", wrong: ["Yes, by half", "Yes, fully", "Only a little"], why: "Without their rewards being diminished in any respect." },
        { q: "Calling others to wrong carries a share of the sin.", tf: true, why: "He who called people to error, he shall have to carry the burden of its sin." }
      ]
    },
    {
      slug: "messengers-were-men",
      title: "Messengers were human",
      line: "Allah sent Messengers who were men from the towns, not angels.",
      facts: ["They ate food and walked markets", "Travel and see the end of deniers"],
      quote: q12(109),
      source: ik(109, "Allah sent Messengers from among humans, not angels, from the people of towns. People should travel and see how deniers ended, and know the Hereafter is better.", "They were not from among the residents of the heaven"),
      difficulty: 5,
      questions: [
        { q: "Whom did Allah send as Messengers, in 12:109?", a: "Men He revealed to", wrong: ["Angels", "Jinn", "Kings only"], why: "And We sent not before you any but men unto whom We revealed." },
        { q: "Where were they from, in 12:109?", a: "The people of towns", wrong: ["The sea", "The sky", "Far deserts only"], why: "From among the people of townships." },
        { q: "What is best for those with Taqwa, in 12:109?", a: "The home of the Hereafter", wrong: ["A palace here", "Long life", "Fame"], why: "And verily, the home of the Hereafter is the best for those who have Taqwa." }
      ]
    },
    {
      slug: "a-lesson-for-those-who-think",
      title: "A lesson for those who think",
      line: "In these stories is a lesson for people of understanding.",
      facts: ["Not a made-up tale", "Confirms the Books before"],
      quote: q12(111),
      source: ik(111, "The stories of the Messengers, how believers were saved and deniers ruined, are a lesson for people of sound mind. The Quran was not forged; it confirms the Books before it.", "it truly came from Allah"),
      difficulty: 5,
      questions: [
        { q: "For whom are the stories a lesson, in 12:111?", a: "Men of understanding", wrong: ["Only children", "Only kings", "No one"], why: "Indeed in their stories, there is a lesson for men of understanding." },
        { q: "Is the Quran a forged statement, per 12:111?", a: "No, it confirms what came before", wrong: ["Yes", "Partly", "No one knows"], why: "It is not a forged statement but a confirmation of that which was before it." },
        { q: "Surah Yusuf ends by calling the Quran a guide and mercy.", tf: true, why: "And a guide and a mercy for the people who believe." }
      ]
    },
    {
      slug: "a-detailed-explanation",
      title: "A detailed explanation",
      line: "The Quran explains everything: what is allowed and what is not.",
      facts: ["Worship and right conduct", "Allah's Names and Attributes"],
      quote: q12(111),
      source: ik(111, "The Quran is a detailed explanation of everything: the allowed and the forbidden, acts of worship, and Allah's Names and Attributes. It guides hearts from misguidance to guidance.", "Meaning the allowed, the prohibited, the preferred and the disliked matters"),
      difficulty: 5,
      questions: [
        { q: "What is the Quran a detailed explanation of, in 12:111?", a: "Everything", wrong: ["Only history", "Only poems", "Only stories"], why: "And a detailed explanation of everything." },
        { q: "What does the Quran teach about Allah, per Ibn Kathir?", a: "His Names and Attributes", wrong: ["His likeness to creation", "Nothing", "Only His anger"], why: "The Quran tells us about the Lord and about His Names and Attributes." },
        { q: "The Quran guides hearts from misguidance to guidance.", tf: true, why: "With which their hearts are directed from misguidance to guidance." }
      ]
    }
  ]
};

export const YUSUF_UNITS: readonly DeepUnit[] = [YUSUF_ONE, YUSUF_TWO, YUSUF_THREE, YUSUF_FOUR, YUSUF_FIVE, YUSUF_SIX];
