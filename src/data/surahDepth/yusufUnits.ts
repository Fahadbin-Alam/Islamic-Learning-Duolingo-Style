import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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
      source: ik(7, "The brothers said Yusuf and his full brother Binyamin were dearer to their father. They wanted Yusuf gone so the father's love would be theirs alone.", "Remove Yusuf, who competes with you for your father"),
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

export const YUSUF_UNITS: readonly DeepUnit[] = [YUSUF_ONE, YUSUF_TWO];
