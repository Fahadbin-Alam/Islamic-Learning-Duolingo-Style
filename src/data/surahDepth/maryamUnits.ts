import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Maryam ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Maryam 19:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_19_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Maryam 19:${ayah}`,
    url: `https://quran.com/19:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 19:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q19 = (ayah: number) => quranQuote(19, ayah);

/** Ayahs 1 to 40: Zakariyya's quiet prayer, Yahya, Maryam and the birth of Isa, Isa speaking from the cradle, and the Day of regret. */
const MARYAM_ONE: DeepUnit = {
  key: "maryam1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-maryam",
  name: "Maryam, ayahs 1 to 40",
  kind: "skill",
  lessonType: "surah",
  surahName: "Maryam",
  lessons: [
    {
      slug: "a-quiet-prayer",
      title: "A quiet prayer",
      line: "Zakariyya called on his Lord quietly, in secret.",
      facts: ["A secret prayer is beloved", "Allah hears the hidden voice"],
      quote: q19(3),
      source: ik(3, "The surah opens with Allah's mercy to Zakariyya. He prayed to his Lord in secret, because a quiet prayer is more beloved to Allah, who hears the hidden voice.", "He only made his supplication secretly because it is more beloved to Allah"),
      difficulty: 2,
      questions: [
        { q: "How did Zakariyya call his Lord, in 19:3?", a: "In secret", wrong: ["With a shout", "In a crowd", "With a drum"], why: "When he called his Lord with a call in secret." },
        { q: "Why did he pray quietly, per Ibn Kathir?", a: "It is more beloved to Allah", wrong: ["He was shy", "He had no voice", "It was night"], why: "He only made his supplication secretly because it is more beloved to Allah." },
        { q: "What does Allah hear, per Qatadah?", a: "The hidden voice", wrong: ["Only loud calls", "Only Arabic", "Only in a masjid"], why: "Verily, Allah knows the pious heart and he hears the hidden voice." }
      ]
    },
    {
      slug: "never-let-down-in-dua",
      title: "Never let down in dua",
      line: "Old and weak, Zakariyya said Allah had never let his dua down.",
      facts: ["Grey hair, weak bones", "Keep asking Allah"],
      quote: q19(4),
      source: ik(4, "Zakariyya told Allah his bones were weak and his hair was grey, then said he had never been let down when he called on Him.", "I have not experienced from You except that You would respond to my supplication"),
      difficulty: 2,
      questions: [
        { q: "What had grown weak, in 19:4?", a: "His bones", wrong: ["His eyes", "His voice", "His faith"], why: "My Lord! Indeed my bones have grown feeble." },
        { q: "What had spread on his head, in 19:4?", a: "Grey hair", wrong: ["A crown", "A turban", "Dust"], why: "And gray hair has spread on my head." },
        { q: "Zakariyya said Allah always answered his prayers, per Ibn Kathir.", tf: true, why: "I have not experienced from You except that You would respond to my supplication." }
      ]
    },
    {
      slug: "asking-through-weakness",
      title: "Asking through weakness",
      line: "Showing Allah your weakness is a way of asking He loves.",
      facts: ["As-Sa'di explains", "Tawassul in dua"],
      quote: q19(4),
      source: saadi(19, 4, "As-Sa'di says Zakariyya came to Allah through his weakness and old age, one of the means most loved by Allah, since it shows a person has no power of his own; then through Allah's past favours, asking the One who was good before to complete His goodness.", "وهذا من أحب الوسائل إلى الله"),
      difficulty: 2,
      questions: [
        { q: "How did Zakariyya come close to Allah in his dua, per as-Sa'di?", a: "Through his weakness", wrong: ["Through his wealth", "Through his fame", "Through his family name"], why: "He showed his weakness and age, a means Allah loves." },
        { q: "Why does Allah love a dua made through weakness, per as-Sa'di on 19:4?", a: "It shows reliance on Allah's power", wrong: ["It is shorter", "It is louder", "It needs no words"], why: "It shows freedom from one's own power and trust in Allah's." },
        { tf: true, q: "Zakariyya also asked by Allah's past answers to his duas.", why: "As-Sa'di on 19:4." }
      ]
    },
    {
      slug: "an-heir-for-guidance",
      title: "An heir for guidance",
      line: "He asked for a son to guide people, not to keep wealth.",
      facts: ["He feared a bad generation", "Not worried about wealth"],
      quote: q19(6),
      source: ik(5, "Zakariyya feared the people after him would go astray, so he asked for a son who would be a Prophet and guide them. Ibn Kathir explains he was not worried about his wealth.", "he was not afraid of them inheriting his wealth"),
      difficulty: 3,
      questions: [
        { q: "What did Zakariyya fear, per Ibn Kathir?", a: "A wicked generation after him", wrong: ["Losing his house", "Poverty", "Enemies at war"], why: "He was afraid that the generation that would succeed him would be a wicked generation." },
        { q: "What kind of son did he ask for?", a: "A Prophet to guide them", wrong: ["A rich trader", "A strong soldier", "A king"], why: "He asked Allah for a son who would be a Prophet after him, who would guide them." },
        { q: "Was he worried about his wealth, per Ibn Kathir?", a: "No", wrong: ["Yes, greatly", "Yes, a little", "Only his land"], why: "He was not afraid of them inheriting his wealth." }
      ]
    },
    {
      slug: "zakariyya-the-carpenter",
      title: "Zakariyya the carpenter",
      line: "Zakariyya, a great Prophet, earned his living as a carpenter.",
      facts: ["Honest work is noble", "Prophets worked with their hands"],
      quote: q19(2),
      source: hadith("muslim", "2379", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said that Zakariyya was a carpenter.", "Zakariyya (peace be upon him) was a carpenter"),
      difficulty: 1,
      questions: [
        { q: "What was Zakariyya's work, in the hadith?", a: "A carpenter", wrong: ["A shepherd", "A farmer", "A trader"], why: "Zakariyya (peace be upon him) was a carpenter." },
        { q: "How did he earn his food, per Ibn Kathir?", a: "With his own hands", wrong: ["From gifts", "From a king", "From taxes"], why: "He was a carpenter who ate from the earnings of his own hand." },
        { q: "Earning with your own hands is a way of the Prophets.", tf: true, why: "He was a carpenter who used to eat from what he earned with his own hand." }
      ]
    },
    {
      slug: "his-name-is-yahya",
      title: "His name is Yahya",
      line: "Allah gave Zakariyya the good news of a son named Yahya.",
      facts: ["The prayer was answered", "A new name"],
      quote: q19(7),
      source: ik(7, "Zakariyya's prayer was answered with the good news of a son named Yahya, a name no one had before him.", "This means that no one had this name before him"),
      difficulty: 1,
      questions: [
        { q: "What was the son's name, in 19:7?", a: "Yahya", wrong: ["Isa", "Ishaq", "Yusuf"], why: "We give you the good news of a son, whose name will be Yahya." },
        { q: "Had anyone been named Yahya before, per Ibn Kathir?", a: "No one before him", wrong: ["Many people", "His father", "His grandfather"], why: "This means that no one had this name before him." },
        { q: "The good news showed Zakariyya's prayer was answered.", tf: true, why: "This statement implies what is not mentioned, that his supplication was answered." }
      ]
    },
    {
      slug: "it-is-easy-for-me",
      title: "It is easy for Me",
      line: "Amazed in old age, Zakariyya heard: it is easy for Allah.",
      facts: ["His wife could not have children", "Allah made us from nothing"],
      quote: q19(9),
      source: ik(9, "Zakariyya was overjoyed and amazed, since he was old and his wife had never had children. Allah said it is easy for Him, as He created Zakariyya when he was nothing.", "it is simple and easy for Allah to do"),
      difficulty: 2,
      questions: [
        { q: "Why was Zakariyya amazed, in 19:8?", a: "He was old and his wife barren", wrong: ["He was young", "He was rich", "He was far away"], why: "How can I have a son, when my wife is barren, and I have reached the extreme old age." },
        { q: "What did Allah say, in 19:9?", a: "It is easy for Me", wrong: ["It is impossible", "Wait ten years", "Ask again"], why: "Thus your Lord says: It is easy for Me." },
        { q: "What did Allah remind him of, in 19:9?", a: "He was once nothing", wrong: ["His old house", "His father", "His work"], why: "Certainly I have created you before, when you had been nothing!" }
      ]
    },
    {
      slug: "three-silent-nights",
      title: "Three silent nights",
      line: "His sign: three nights unable to speak, though fully healthy.",
      facts: ["He spoke by gestures", "He kept glorifying Allah"],
      quote: q19(10),
      source: ik(10, "Zakariyya asked for a sign. For three nights he could not speak to people though he was healthy, so he signed to them to glorify Allah morning and evening.", "your tongue will be prevented from speaking for three nights while you are healthy and fit"),
      difficulty: 2,
      questions: [
        { q: "What was the sign, in 19:10?", a: "Not speaking for three nights", wrong: ["A bright star", "Rain", "A dream"], why: "Your sign is that you shall not speak unto mankind for three nights." },
        { q: "Was he sick, per Ibn Kathir?", a: "No, healthy and fit", wrong: ["Yes, very sick", "Yes, a fever", "He was hurt"], why: "Your tongue will be prevented from speaking for three nights while you are healthy and fit." },
        { q: "What did he signal people to do, in 19:11?", a: "Glorify Allah morning and evening", wrong: ["Go home", "Bring food", "Stay silent"], why: "He indicated to them by signs to glorify Allah in the morning and in the afternoon." }
      ]
    },
    {
      slug: "yahya-holds-the-book",
      title: "Yahya holds the Book",
      line: "Young Yahya was told to hold the Book firmly, and given wisdom.",
      facts: ["Learn with zeal", "Wisdom while a child"],
      quote: q19(12),
      source: ik(12, "Yahya was told to hold fast to the Tawrah, learning it well with zeal and effort. Allah gave him understanding and wisdom while he was still a child.", "learn it well, with zeal and studious effort"),
      difficulty: 2,
      questions: [
        { q: "What was Yahya told, in 19:12?", a: "Hold fast to the Scripture", wrong: ["Build a ship", "Travel far", "Rule a land"], why: "O Yahya! Hold fast to the Scripture." },
        { q: "How should he learn it, per Ibn Kathir?", a: "Well, with zeal and effort", wrong: ["Quickly and lightly", "Only once", "In secret"], why: "Learn it well, with zeal and studious effort." },
        { q: "When was he given wisdom, in 19:12?", a: "While yet a child", wrong: ["In old age", "At forty", "After travelling"], why: "And We gave him wisdom while yet a child." }
      ]
    },
    {
      slug: "kind-pure-and-dutiful",
      title: "Kind, pure and dutiful",
      line: "Yahya was gentle, pure, pious and dutiful to his parents.",
      facts: ["Hanan means tenderness", "Never arrogant"],
      quote: q19(14),
      source: ik(13, "Allah made Yahya full of compassion and purity. He was pious, dutiful to his parents, and never proud or disobedient to them in word or deed.", "Hanan means the love for affection and tenderness"),
      difficulty: 3,
      questions: [
        { q: "What does Hanan mean, per Ibn Kathir?", a: "Affection and tenderness", wrong: ["Strength", "Wealth", "Speed"], why: "Hanan means the love for affection and tenderness towards others." },
        { q: "How was Yahya to his parents, in 19:14?", a: "Dutiful", wrong: ["Distant", "Harsh", "Careless"], why: "And dutiful to his parents, and he was not arrogant or disobedient." },
        { q: "What does Zakah mean for Yahya, per Ibn Kathir?", a: "Purity from sins", wrong: ["Giving money", "Fasting", "Travel"], why: "The word Zakah means purity from filth, wickedness and sins." }
      ]
    },
    {
      slug: "peace-on-three-days",
      title: "Peace on three days",
      line: "Peace on Yahya at birth, at death, and when raised again.",
      facts: ["Three lonely moments", "Honoured with safety"],
      quote: q19(15),
      source: ik(15, "Allah gave Yahya peace on the day of his birth, his death and his raising. Sufyan said these are the three loneliest times for a person.", "This means that he had security and safety in these three circumstances"),
      difficulty: 2,
      questions: [
        { q: "On which days is peace on Yahya, in 19:15?", a: "Birth, death and being raised", wrong: ["Friday only", "Eid days", "His wedding"], why: "Peace be on him the day he was born, and the day he dies, and the day he will be raised up to life again." },
        { q: "What did peace mean for him, per Ibn Kathir?", a: "Security and safety", wrong: ["Riches", "Fame", "Long life"], why: "This means that he had security and safety in these three circumstances." },
        { q: "Who said these are the loneliest times?", a: "Sufyan bin Uyaynah", wrong: ["Mujahid", "Qatadah", "Ikrimah"], why: "Sufyan bin Uyaynah said: The loneliest that a man will ever feel is in three situations." }
      ]
    },
    {
      slug: "maryam-the-worshipper",
      title: "Maryam the worshipper",
      line: "Maryam was a devoted worshipper, raised in Zakariyya's care.",
      facts: ["From a good family", "Fruit out of season"],
      quote: q19(16),
      source: ik(16, "Maryam bint Imran came from a good family. She was known for her worship and devotion, raised under Zakariyya's care, who found her given food from Allah.", "She was one of the female worshippers, well-known for her remarkable acts of worship"),
      difficulty: 2,
      questions: [
        { q: "Whose daughter was Maryam, per Ibn Kathir?", a: "Imran", wrong: ["Zakariyya", "Harun", "Yahya"], why: "She was Maryam bint Imran from the family lineage of Dawud." },
        { q: "Who cared for her, per Ibn Kathir?", a: "Zakariyya", wrong: ["Yahya", "Musa", "A king"], why: "She lived under the care of her brother-in-law, Zakariyya." },
        { q: "What was she known for, per Ibn Kathir?", a: "Her worship and devotion", wrong: ["Her wealth", "Her trade", "Her travels"], why: "She was one of the female worshippers, well-known for her remarkable acts of worship, devotion and perseverance." }
      ]
    },
    {
      slug: "jibril-brings-good-news",
      title: "Jibril brings good news",
      line: "Jibril came to Maryam with news of a pure son, Allah's sign.",
      facts: ["She sought refuge in Allah", "A son without a father"],
      quote: q19(19),
      source: ik(19, "Allah sent Jibril to Maryam in the form of a man. She sought refuge in Allah from him, and he told her he was a messenger bringing news of a righteous son.", "It means Jibril"),
      difficulty: 3,
      questions: [
        { q: "Who was Our Ruh in 19:17, per Ibn Kathir?", a: "Jibril", wrong: ["Mika'il", "Israfil", "A Prophet"], why: "Mujahid, Ad-Dahhak, Qatadah and others said: It means Jibril." },
        { q: "What did Maryam say first, in 19:18?", a: "I seek refuge with the Most Gracious", wrong: ["Welcome", "Who are you?", "Go away now"], why: "Verily, I seek refuge with the Most Gracious from you, if you do fear Allah." },
        { q: "What news did he bring, in 19:19?", a: "The gift of a righteous son", wrong: ["Great wealth", "A long trip", "A new home"], why: "I am only a messenger from your Lord, to announce to you the gift of a righteous son." }
      ]
    },
    {
      slug: "a-sign-and-a-mercy",
      title: "A sign and a mercy",
      line: "Allah made Isa a sign for people and a mercy.",
      facts: ["Easy for Allah", "Already decreed"],
      quote: q19(21),
      source: ik(21, "Maryam asked how she could have a son, and was told it is easy for Allah. Isa would be a sign of Allah's power and a mercy to people.", "a sign to mankind and a mercy from Us"),
      difficulty: 3,
      questions: [
        { q: "What would Isa be, in 19:21?", a: "A sign and a mercy", wrong: ["A king", "A trader", "A warrior"], why: "And We wish to appoint him as a sign to mankind and a mercy from Us." },
        { q: "How hard is it for Allah, in 19:21?", a: "It is easy for Him", wrong: ["Very hard", "Impossible", "Slow"], why: "Thus says your Lord: That is easy for Me." },
        { q: "Was the matter already decreed, per 19:21?", a: "Yes", wrong: ["No", "Not yet", "Only partly"], why: "And it is a matter already decreed by Allah." }
      ]
    },
    {
      slug: "a-far-place",
      title: "A far place",
      line: "Maryam accepted Allah's decree and went to a far-off place.",
      facts: ["She trusted Allah's plan", "Allah cares for the patient"],
      quote: q19(22),
      source: ik(22, "When Jibril told Maryam what Allah had said, she accepted Allah's decree. Carrying the child, she withdrew from people to a far-off place.", "she accepted the decree of Allah"),
      difficulty: 3,
      questions: [
        { q: "Where did Maryam go, in 19:22?", a: "To a remote place", wrong: ["To the market", "To Makkah", "To the palace"], why: "And she withdrew with him to a remote place." },
        { q: "How did she take Allah's decree, per Ibn Kathir?", a: "She accepted it", wrong: ["She ran from it", "She argued", "She laughed"], why: "When Jibril had spoken to her about what Allah said, she accepted the decree of Allah." },
        { tf: false, q: "In 19:22 Maryam stayed among crowds of people.", why: "She withdrew with him to a remote place." }
      ]
    },
    {
      slug: "by-the-palm-tree",
      title: "By the palm tree",
      line: "In pain by a palm, Maryam feared no one would believe her.",
      facts: ["Hard moments pass", "Allah was with her"],
      quote: q19(23),
      source: ik(23, "The pains of birth brought Maryam to a palm trunk. She knew people would not believe her story, so she wished she had been forgotten.", "She knew that she was going to be tested with the birth"),
      difficulty: 4,
      questions: [
        { q: "Where did the pains bring her, in 19:23?", a: "The trunk of a date palm", wrong: ["A river bank", "A cave", "A city gate"], why: "And the pains of childbirth drove her to the trunk of a date palm." },
        { q: "What did she fear, per Ibn Kathir?", a: "People would not believe her", wrong: ["The weather", "Losing money", "A long trip"], why: "The people would not assist her, and they would not believe her story." },
        { q: "What does out of sight mean, per Qatadah?", a: "Unknown and forgotten", wrong: ["Very rich", "Very famous", "Far away at sea"], why: "This means something unknown, forgotten and no one knew who I was." }
      ]
    },
    {
      slug: "dates-and-a-stream",
      title: "Dates and a stream",
      line: "Maryam was told not to grieve, and given water and dates.",
      facts: ["Shake the palm trunk", "Eat, drink and be glad"],
      quote: q19(25),
      source: ik(24, "Maryam was told not to grieve. Allah placed a small stream below her and told her to shake the palm trunk so fresh dates would fall. She should eat, drink and be glad.", "Sariy means a river"),
      difficulty: 2,
      questions: [
        { q: "What was she told first, in 19:24?", a: "Grieve not", wrong: ["Run away", "Hide", "Call for help"], why: "Grieve not: your Lord has provided a Sariy under you." },
        { q: "What is Sariy, per Ibn Abbas?", a: "A river or stream", wrong: ["A tree", "A cave", "A cloud"], why: "Ibn Abbas said, Sariy means a river." },
        { q: "What fell from the palm, in 19:25?", a: "Fresh ripe dates", wrong: ["Leaves", "Rain", "Figs"], why: "It will let fall fresh ripe dates upon you." }
      ]
    },
    {
      slug: "a-vow-of-silence",
      title: "A vow of silence",
      line: "Maryam kept silent, trusting Allah to take care of her.",
      facts: ["She signalled, not spoke", "Her proof would come"],
      quote: q19(26),
      source: ik(26, "If she saw anyone, Maryam was to show by signs that she had vowed a fast of silence that day. Anas and Ibn Abbas explained it as a vow of silence.", "A vow of silence"),
      difficulty: 3,
      questions: [
        { q: "What had she vowed, in 19:26?", a: "A fast for the Most Gracious", wrong: ["A journey", "A feast", "A gift"], why: "Verily, I have vowed a fast for the Most Gracious so I shall not speak to any human being today." },
        { q: "What was the fast, per Anas?", a: "A vow of silence", wrong: ["No water", "No sleep", "No walking"], why: "Anas bin Malik said: A vow of silence." },
        { q: "How would she tell people, per Ibn Kathir?", a: "By signs, not speech", wrong: ["By letter", "Loudly", "Through a friend"], why: "Meaning, by signaling with gestures, not a statement by speech." }
      ]
    },
    {
      slug: "sister-of-harun",
      title: "Sister of Harun",
      line: "People named children after the Prophets and the righteous.",
      facts: ["Not Musa's brother himself", "A family of righteous names"],
      quote: q19(28),
      source: hadith("muslim", "2135", "Al-Mughirah ibn Shu'bah", "Sahih", "People asked how Maryam could be called sister of Harun when Musa lived long before. The Prophet ﷺ said people used to name others after earlier Prophets and pious people.", "used to give names (to their persons) after the names of Apostles and pious persons who had gone before them"),
      difficulty: 4,
      questions: [
        { q: "What were people of old used to doing, in the hadith?", a: "Naming children after Prophets", wrong: ["Naming after kings", "Using numbers", "Giving no names"], why: "They used to give names after the names of Apostles and pious persons who had gone before them." },
        { q: "Where did Al-Mughirah get the question?", a: "In Najran", wrong: ["In Makkah", "In Egypt", "In Syria"], why: "When I came to Najran, they asked me about O sister of Harun." },
        { q: "What did O sister of Harun mean, per Ibn Kathir?", a: "One like Harun in worship", wrong: ["His real sister", "His mother", "His neighbour"], why: "This means, O one resembling Harun in worship." }
      ]
    },
    {
      slug: "she-pointed-to-him",
      title: "She pointed to him",
      line: "When people blamed her, Maryam simply pointed to her baby.",
      facts: ["She stayed silent", "They doubted a baby could speak"],
      quote: q19(29),
      source: ik(29, "When people blamed Maryam, she kept her fast of silence and pointed to the baby. They asked how they could talk to a child in the cradle.", "she referred all speech to him"),
      difficulty: 2,
      questions: [
        { q: "What did Maryam do, in 19:29?", a: "Pointed to the baby", wrong: ["Ran away", "Argued", "Cried out"], why: "Then she pointed to him." },
        { q: "What did the people ask, in 19:29?", a: "How can we talk to a baby?", wrong: ["Where is your home?", "What is his name?", "Who is your father?"], why: "How can we talk to one who is a child in the cradle?" },
        { q: "Why did she not speak, per Ibn Kathir?", a: "She was fasting and silent", wrong: ["She was sick", "She was scared", "She forgot"], why: "On that day she was fasting and keeping silent." }
      ]
    },
    {
      slug: "i-am-a-servant-of-allah",
      title: "I am a servant of Allah",
      line: "Baby Isa spoke: I am Allah's servant, made a Prophet.",
      facts: ["His first words", "Prayer, zakah, kindness to mother"],
      quote: q19(30),
      source: ik(30, "Isa spoke from the cradle. His first words were that he is a servant of Allah, given the Scripture and made a Prophet, blessed, told to pray, give zakah and be dutiful to his mother.", "Verily, I am a servant of Allah"),
      difficulty: 3,
      questions: [
        { q: "What were Isa's first words, in 19:30?", a: "I am a servant of Allah", wrong: ["I am a king", "I am hungry", "I am the son of Allah"], why: "He said: Verily, I am a servant of Allah." },
        { q: "What was he told to do as long as he lived, in 19:31?", a: "Pray and give zakah", wrong: ["Travel", "Rule", "Fight"], why: "And has enjoined on me Salah and Zakah, as long as I live." },
        { q: "To whom was he dutiful, in 19:32?", a: "His mother", wrong: ["A king", "A teacher", "A tribe"], why: "And to be dutiful to my mother, and made me not arrogant." }
      ]
    },
    {
      slug: "blessed-wherever-he-was",
      title: "Blessed wherever he was",
      line: "Isa's blessing was teaching good wherever he went.",
      facts: ["As-Sa'di explains", "Barakah"],
      quote: q19(31),
      source: saadi(19, 31, "As-Sa'di says Isa's blessing, in every place and time, was teaching good, calling to it and to Allah, and forbidding evil, so everyone who sat with him gained from his blessing; and he was told to keep up prayer, Allah's right, and zakah, the right of His servants, all his life.", "فكل من جالسه، أو اجتمع به، نالته بركته"),
      difficulty: 2,
      questions: [
        { q: "What was Isa's blessing, per as-Sa'di on 19:31?", a: "Teaching good and calling to Allah", wrong: ["Great wealth", "A big house", "Many servants"], why: "It was teaching good, calling to Allah and forbidding evil." },
        { q: "Who gained from Isa's blessing, per as-Sa'di?", a: "Everyone who sat with him", wrong: ["Only kings", "Only his family", "No one"], why: "Everyone who sat or met with him got some of his blessing." },
        { tf: true, q: "Prayer is Allah's right, and zakah is the right of His servants.", why: "As-Sa'di on 19:31." }
      ]
    },
    {
      slug: "be-and-it-is",
      title: "Be, and it is",
      line: "Allah has no son; He only says Be, and it is.",
      facts: ["Isa is like Adam", "Worship Allah alone"],
      quote: q19(35),
      source: ik(35, "It does not befit Allah to take a son. When He wants something, He only commands Be, and it is. Isa told people that Allah is his Lord and their Lord, so worship Him.", "Whenever He wants something, He merely commands it and it happens as He wills"),
      difficulty: 3,
      questions: [
        { q: "What does 19:35 say befits not Allah?", a: "Having a son", wrong: ["Having mercy", "Hearing prayers", "Creating"], why: "It befits not the majesty of Allah that He should beget a son. Glorified be He." },
        { q: "What does Allah say to create, in 19:35?", a: "Be", wrong: ["Wait", "Grow", "Come"], why: "When He decrees a thing, He only says to it: Be! and it is." },
        { q: "Who else was created without a father, per Ibn Kathir?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Musa"], why: "The likeness of Isa before Allah is the likeness of Adam. He created him from dust." }
      ]
    },
    {
      slug: "that-is-the-straight-path",
      title: "That is the straight path",
      line: "Isa said: Allah is my Lord and yours, so worship Him.",
      facts: ["Isa called to Tawhid", "Whoever follows is guided"],
      quote: q19(36),
      source: ik(36, "From the cradle Isa said that Allah is his Lord and their Lord, and told them to worship Him alone, which is the straight path.", "he commanded them to worship Him alone"),
      difficulty: 2,
      questions: [
        { q: "What did Isa say about Allah, in 19:36?", a: "He is my Lord and your Lord", wrong: ["He is far", "He is my father", "He sleeps"], why: "And verily, Allah is my Lord and your Lord. So worship Him." },
        { q: "What is the straight path, in 19:36?", a: "Worshipping Allah alone", wrong: ["Getting rich", "Travelling", "Being famous"], why: "So worship Him. That is the straight path." },
        { q: "Whoever follows the path is guided, per Ibn Kathir.", tf: true, why: "Whoever follows it will be rightly guided and whoever opposes it will deviate and go astray." }
      ]
    },
    {
      slug: "the-day-of-regret",
      title: "The Day of regret",
      line: "Warn of the Day of regret, while people are careless now.",
      facts: ["Seeing clearly too late", "Allah inherits the earth"],
      quote: q19(39),
      source: ik(39, "On the Day of Judgment people will see and hear clearly, but too late. Allah tells us to warn of the Day of regret while people are careless now, and that the earth and all on it return to Him.", "when the people of Paradise and the people of Hell will be sorted out"),
      difficulty: 3,
      questions: [
        { q: "What is the Day called, in 19:39?", a: "The Day of grief and regret", wrong: ["The Day of rest", "The Day of trade", "The Day of games"], why: "And warn them of the Day of grief and regrets, when the case has been decided." },
        { q: "What state are people in now, in 19:39?", a: "Carelessness", wrong: ["Fear", "Joy", "Sleep"], why: "While now they are in a state of carelessness, and they believe not." },
        { q: "Who will inherit the earth, in 19:40?", a: "Allah", wrong: ["The kings", "The angels", "No one"], why: "Verily, We will inherit the earth and whatsoever is thereon. And to Us they all shall be returned." }
      ]
    }
  ]
};

/** Ayahs 41 to 98: Ibrahim and his father, the Prophets honoured in the surah, guarding the prayer, Paradise, and Allah's love. */
const MARYAM_TWO: DeepUnit = {
  key: "maryam2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-maryam",
  name: "Maryam, ayahs 41 to 98",
  kind: "skill",
  lessonType: "surah",
  surahName: "Maryam",
  lessons: [
    {
      slug: "ibrahim-a-man-of-truth",
      title: "Ibrahim, a man of truth",
      line: "Ibrahim gently asked his father why he worshipped idols.",
      facts: ["Idols cannot hear or see", "He said: O my father"],
      quote: q19(42),
      source: ik(42, "Ibrahim was a truthful Prophet. He gently asked his father why he worshipped things that cannot hear, see, help or protect him.", "these idols will not benefit you, nor can they protect you from any harm"),
      difficulty: 2,
      questions: [
        { q: "How is Ibrahim described in 19:41?", a: "A man of truth, a Prophet", wrong: ["A king", "A trader", "A poet"], why: "Verily, he was a man of truth, a Prophet." },
        { q: "What can the idols not do, in 19:42?", a: "Hear or see", wrong: ["Be carved", "Be carried", "Be painted"], why: "Why do you worship that which hears not, sees not and cannot avail you in anything?" },
        { q: "How did Ibrahim call his father?", a: "O my father", wrong: ["O old man", "O idol maker", "O you"], why: "When he said to his father: O my father!" }
      ]
    },
    {
      slug: "follow-me-i-will-guide-you",
      title: "Follow me, I will guide you",
      line: "Ibrahim said he had knowledge from Allah, and could guide him.",
      facts: ["Do not obey Shaytan", "He feared for his father"],
      quote: q19(43),
      source: ik(43, "Ibrahim told his father that, though he was his son, Allah had given him knowledge his father did not have, so he should follow him to the straight path and not obey Shaytan.", "I have received knowledge from Allah that you do not know"),
      difficulty: 3,
      questions: [
        { q: "What had come to Ibrahim, in 19:43?", a: "Knowledge his father lacked", wrong: ["Great wealth", "An army", "A palace"], why: "Verily, there has come to me the knowledge of that which came not unto you." },
        { q: "What did he warn against, in 19:44?", a: "Worshipping Shaytan", wrong: ["Travelling", "Trading", "Farming"], why: "O my father! Worship not Shaytan." },
        { q: "How is Shaytan described in 19:44?", a: "A rebel against the Most Gracious", wrong: ["A helper", "A friend", "A guide"], why: "Verily, Shaytan has been a rebel against the Most Gracious." }
      ]
    },
    {
      slug: "peace-be-on-you",
      title: "Peace be on you",
      line: "Threatened by his father, Ibrahim answered with peace.",
      facts: ["Respect for parents", "He kept praying for him"],
      quote: q19(47),
      source: ik(47, "When his father threatened him, Ibrahim answered: Peace be on you. Out of respect for his father he would not harm him, and he would ask Allah to guide and forgive him.", "You will not receive any insult or harm from me"),
      difficulty: 3,
      questions: [
        { q: "How did Ibrahim answer, in 19:47?", a: "Peace be on you", wrong: ["I will leave you", "You are wrong", "Be quiet"], why: "Ibrahim said: Peace be on you! I will ask forgiveness of my Lord for you." },
        { q: "What did Ibrahim's peace mean, per Ibn Kathir?", a: "No insult or harm from him", wrong: ["Goodbye forever", "I win", "Let us fight"], why: "You will not receive any insult or harm from me." },
        { q: "Why did he speak so, per Ibn Kathir?", a: "Respect for his father", wrong: ["Fear", "Tiredness", "Hunger"], why: "This is due to the respect and honor of fatherhood." }
      ]
    },
    {
      slug: "ishaq-and-yaqub",
      title: "Ishaq and Ya'qub",
      line: "Leaving idols behind, Ibrahim was given Ishaq and Ya'qub.",
      facts: ["Both were Prophets", "Allah gave something better"],
      quote: q19(49),
      source: ik(49, "When Ibrahim left his people for Allah's sake, Allah gave him better in their place: his son Ishaq and grandson Ya'qub, both Prophets.", "Allah gave him in exchange those who were better than them"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah give Ibrahim, in 19:49?", a: "Ishaq and Ya'qub", wrong: ["Musa and Harun", "Dawud and Sulayman", "Nuh and Hud"], why: "We gave him Ishaq and Ya'qub, and each one of them We made a Prophet." },
        { q: "Who was Ya'qub to Ibrahim, per Ibn Kathir?", a: "His grandson", wrong: ["His brother", "His uncle", "His friend"], why: "His son, Ishaq, and Ishaq's son, Ya'qub." },
        { q: "What does Allah give one who leaves wrong for Him?", a: "Something better", wrong: ["Nothing", "Less", "Only worry"], why: "Allah gave him in exchange those who were better than them." }
      ]
    },
    {
      slug: "musa-and-harun",
      title: "Musa and Harun",
      line: "Allah spoke to Musa and made his brother Harun a Prophet.",
      facts: ["Musa was chosen", "He pleaded for his brother"],
      quote: q19(53),
      source: ik(53, "Musa was devoted and chosen, a Messenger and Prophet. Allah called him at the Mount and answered his plea to make his brother Harun a Prophet.", "No one in this life pleaded on behalf of someone else more than Musa pleaded for his brother"),
      difficulty: 3,
      questions: [
        { q: "Where did Allah call Musa, in 19:52?", a: "The right side of the Mount", wrong: ["In Egypt", "On a ship", "In a cave"], why: "And We called him from the right side of the Mount." },
        { q: "Who was made a Prophet with him, in 19:53?", a: "His brother Harun", wrong: ["His son", "Yusha", "Shuayb"], why: "And We granted him his brother Harun, also a Prophet, out of Our mercy." },
        { q: "What did the Salaf say of Musa's plea?", a: "No one pleaded more for another", wrong: ["He asked for wealth", "He asked to rule", "He never asked"], why: "No one in this life pleaded on behalf of someone else more than Musa pleaded for his brother to be a Prophet." }
      ]
    },
    {
      slug: "ismail-true-to-his-promise",
      title: "Isma'il kept his promise",
      line: "Isma'il always kept his word and told his family to pray.",
      facts: ["Promises kept", "Salah and Zakah at home"],
      quote: q19(54),
      source: ik(54, "Isma'il was praised as true to his promise. He fulfilled every promise to his Lord and urged his family to pray and give zakah, and Allah was pleased with him.", "He did not make any promise to his Lord, except that he fulfilled it"),
      difficulty: 2,
      questions: [
        { q: "What is Isma'il praised for, in 19:54?", a: "Keeping his promises", wrong: ["His wealth", "His speed", "His height"], why: "Verily, he was true to what he promised." },
        { q: "What did he urge his family to do, in 19:55?", a: "Pray and give zakah", wrong: ["Travel", "Trade", "Build"], why: "And he would enjoin on his family and his people the Salah and the Zakah." },
        { q: "Was Allah pleased with Isma'il, per 19:55?", a: "Yes", wrong: ["No", "Not yet", "Only once"], why: "And his Lord was pleased with him." }
      ]
    },
    {
      slug: "keep-your-promises",
      title: "Keep your promises",
      line: "Breaking promises is a sign of a hypocrite, so keep your word.",
      facts: ["Speak the truth", "Return what is trusted"],
      quote: q19(54),
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The Prophet ﷺ said the signs of a hypocrite are three: he lies when he speaks, breaks his promises, and betrays a trust.", "Whenever he promises, he always breaks it"),
      difficulty: 2,
      questions: [
        { q: "How many signs of a hypocrite are named?", a: "Three", wrong: ["One", "Five", "Seven"], why: "The signs of a hypocrite are three." },
        { q: "What does a hypocrite do with promises?", a: "Breaks them", wrong: ["Keeps them", "Writes them", "Forgets nothing"], why: "Whenever he promises, he always breaks it." },
        { q: "Keeping promises is a sign of a true believer, per Ibn Kathir.", tf: true, why: "If these are the characteristics of the hypocrites, then behaving contrary to these is a characteristic of the true believer." }
      ]
    },
    {
      slug: "idris-raised-high",
      title: "Idris raised high",
      line: "Idris was a truthful Prophet whom Allah raised to a high place.",
      facts: ["Seen on the Night Journey", "In the fourth heaven"],
      quote: q19(57),
      source: ik(57, "Allah praised Idris as a truthful Prophet and raised him to a high station. The Prophet ﷺ passed him in the fourth heaven on the Night Journey.", "This means the fourth heaven"),
      difficulty: 2,
      questions: [
        { q: "How is Idris described in 19:56?", a: "A man of truth, a Prophet", wrong: ["A king", "A sailor", "A builder"], why: "Verily, he was a man of truth, and a Prophet." },
        { q: "What did Allah do for Idris, in 19:57?", a: "Raised him to a high station", wrong: ["Gave him a city", "Made him rich", "Gave him a ship"], why: "And We raised him to a high station." },
        { q: "Where did Mujahid say the high station is?", a: "The fourth heaven", wrong: ["The first heaven", "A mountain", "A palace"], why: "Mujahid said: This means the fourth heaven." }
      ]
    },
    {
      slug: "they-fell-down-weeping",
      title: "They fell down weeping",
      line: "Hearing Allah's ayahs, the Prophets fell in sujud, weeping.",
      facts: ["Chosen and guided", "Moved by the Quran"],
      quote: q19(58),
      source: ik(58, "These Prophets, from the children of Adam, Nuh, Ibrahim and Israel, were blessed and chosen. When Allah's ayahs were recited they fell in prostration, weeping.", "When the Ayat of the Most Gracious were recited unto them, they fell down prostrate and weeping"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophets do on hearing the ayahs, in 19:58?", a: "Fell in sujud, weeping", wrong: ["Walked away", "Laughed", "Slept"], why: "When the Ayat of the Most Gracious were recited unto them, they fell down prostrate and weeping." },
        { q: "Does 19:58 mean only the Prophets named in Maryam?", a: "No, all the Prophets", wrong: ["Yes, only these", "Only Ibrahim", "Only Musa"], why: "This does not mean only these Prophets who were mentioned in this Surah. Rather, it is referring to all of those who were Prophets." },
        { q: "Who is the offspring of Adam in 19:58, per As-Suddi?", a: "Idris", wrong: ["Nuh", "Musa", "Isa"], why: "That which is meant by the offspring of Adam is Idris." }
      ]
    },
    {
      slug: "do-not-lose-the-prayer",
      title: "Do not lose the prayer",
      line: "Later people lost the prayer, but those who repent are welcomed.",
      facts: ["Prayer is the pillar", "Repentance opens Paradise"],
      quote: q19(60),
      source: ik(59, "Later generations lost the prayer and chased desires. Prayer is the pillar of the religion. Those who repent, believe and do good will enter Paradise and not be wronged.", "the prayer is the pillar and foundation of the religion"),
      difficulty: 3,
      questions: [
        { q: "What did later people lose, in 19:59?", a: "The Salah", wrong: ["Their homes", "Their money", "Their land"], why: "Then, there has succeeded them a posterity who have lost the Salah and have followed lusts." },
        { q: "What is prayer, per Ibn Kathir?", a: "The pillar of the religion", wrong: ["Something extra", "Only for elders", "Only on Friday"], why: "The prayer is the pillar and foundation of the religion. It is the best of the servants' deeds." },
        { q: "Who will enter Paradise, in 19:60?", a: "Those who repent and do good", wrong: ["Only the rich", "No one", "Only the old"], why: "Except those who repent and believe, and work righteousness. Such will enter Paradise." }
      ]
    },
    {
      slug: "lose-prayer-lose-the-rest",
      title: "Lose prayer, lose the rest",
      line: "Whoever neglects the prayer will neglect the rest even more.",
      facts: ["As-Sa'di explains", "The pillar of the religion"],
      quote: q19(59),
      source: saadi(19, 59, "As-Sa'di says the prayer is the pillar of the religion and the scale of faith, so those who waste it waste the rest of their religion even more; the cause was following their desires and putting them before Allah's rights.", "كانوا لما سواها من دينهم أضيع"),
      difficulty: 2,
      questions: [
        { q: "What happens to those who waste the prayer, per as-Sa'di on 19:59?", a: "They waste the rest even more", wrong: ["Nothing else changes", "They gain more time", "They become stronger"], why: "Wasting the pillar leads to wasting all else even more." },
        { q: "Why did later people lose the prayer, per as-Sa'di?", a: "They followed their desires", wrong: ["They were too busy praying", "They lost the Quran", "They had no masjids"], why: "They put their desires before Allah's rights." },
        { tf: true, q: "The prayer is the pillar of the religion and the scale of faith.", why: "As-Sa'di on 19:59." }
      ]
    },
    {
      slug: "gardens-of-adn",
      title: "Gardens of Adn",
      line: "In Paradise there is no idle talk, only greetings of peace.",
      facts: ["Promised in the unseen", "Provision morning and evening"],
      quote: q19(62),
      source: ik(62, "The Gardens of Adn are promised in the unseen, and Allah's promise will come. There is no useless talk there, only peace, with provision morning and evening.", "there is no ignorant, wasteful and useless speech"),
      difficulty: 2,
      questions: [
        { q: "What do they hear in Paradise, in 19:62?", a: "Only Salam", wrong: ["Arguments", "Noise", "Lies"], why: "They shall not hear therein any Laghw, but only Salam." },
        { q: "What is missing in Paradise, per Ibn Kathir?", a: "Useless, wasteful speech", wrong: ["Food", "Friends", "Light"], why: "In these gardens of Paradise there is no ignorant, wasteful and useless speech." },
        { q: "When do they get provision, in 19:62?", a: "Morning and afternoon", wrong: ["Once a year", "Never", "Only at night"], why: "And they will have therein their sustenance, morning and afternoon." }
      ]
    },
    {
      slug: "angels-come-by-allahs-command",
      title: "Angels come by His command",
      line: "Jibril visits only by Allah's command, and Allah never forgets.",
      facts: ["The Prophet ﷺ missed Jibril", "All is Allah's"],
      quote: q19(64),
      source: hadith("bukhari", "4731", "Ibn Abbas", "Sahih", "The Prophet ﷺ asked Jibril why he did not visit more often, and 19:64 was revealed: angels descend only by Allah's command.", "What prevents you from visiting us more often than you visit us now"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ ask Jibril?", a: "To visit more often", wrong: ["To bring food", "To stay away", "To bring rain"], why: "What prevents you from visiting us more often than you visit us now?" },
        { q: "How do angels descend, in 19:64?", a: "Only by Allah's command", wrong: ["Whenever they like", "Every hour", "Never"], why: "And we descend not except by the command of your Lord." },
        { q: "What does 19:64 say of Allah?", a: "He is never forgetful", wrong: ["He sleeps", "He gets tired", "He forgets"], why: "And your Lord is never forgetful." }
      ]
    },
    {
      slug: "is-there-any-like-him",
      title: "Is there any like Him?",
      line: "Worship Allah patiently; nothing is like Him.",
      facts: ["Be patient in worship", "None is equal to Allah"],
      quote: q19(65),
      source: ik(65, "Allah is Lord of the heavens, the earth and all between, so worship Him and be patient in it. Nothing is similar to Him.", "Do you know of any who is similar to Him"),
      difficulty: 2,
      questions: [
        { q: "What should we do, in 19:65?", a: "Worship Him patiently", wrong: ["Rest", "Travel", "Argue"], why: "So worship Him and abide patiently in His worship." },
        { q: "Whose Lord is He, in 19:65?", a: "The heavens, earth and all between", wrong: ["Only the earth", "Only the sky", "Only Arabia"], why: "Lord of the heavens and the earth, and all that is between them." },
        { q: "Is anyone similar to Allah, per 19:65?", a: "No one", wrong: ["Kings", "Angels", "Prophets"], why: "Do you know of any who is similar to Him?" }
      ]
    },
    {
      slug: "nothing-before",
      title: "Nothing before",
      line: "People ask how they will rise; Allah made them from nothing.",
      facts: ["First creation is proof", "Raising again is easier"],
      quote: q19(67),
      source: ik(67, "Some wonder how they will be raised after death. Allah reminds them He created them when they were nothing, so the first creation proves the second.", "Allah uses the beginning of creation as a proof for its repetition"),
      difficulty: 2,
      questions: [
        { q: "What does man ask, in 19:66?", a: "Will I be raised alive after death?", wrong: ["Where is the sea?", "Who is king?", "When is rain?"], why: "And man says: When I am dead, shall I then be raised up alive?" },
        { q: "What should man remember, in 19:67?", a: "He was once nothing", wrong: ["His wealth", "His house", "His name"], why: "Does not man remember that We created him before, while he was nothing?" },
        { q: "What proves the raising, per Ibn Kathir?", a: "The first creation", wrong: ["Old stories", "Dreams", "Stars"], why: "Allah uses the beginning of creation as a proof for its repetition." }
      ]
    },
    {
      slug: "gathered-around-hell",
      title: "Gathered together",
      line: "Allah swears He will gather deniers and devils on that Day.",
      facts: ["The gathering is certain", "Choose your company well"],
      quote: q19(68),
      source: ik(68, "Allah swears by Himself that He will gather those who worshipped others besides Him, together with their devils, around Hell.", "swears by His Noble Self that He will definitely gather"),
      difficulty: 4,
      questions: [
        { q: "Who are gathered with them, in 19:68?", a: "The Shayatin", wrong: ["The angels", "The Prophets", "The birds"], why: "Surely We shall gather them together, and (also) the Shayatin." },
        { q: "By what does Allah swear, per Ibn Kathir?", a: "His Noble Self", wrong: ["The moon", "The sea", "A mountain"], why: "The Lord swears by His Noble Self that He will definitely gather them." },
        { tf: true, q: "Ibn Abbas said Jithiyya in 19:68 means sitting.", why: "Ibn Abbas said: This means sitting." }
      ]
    },
    {
      slug: "the-worst-rebels-first",
      title: "The worst rebels first",
      line: "From every group, the worst rebels are taken out first.",
      facts: ["Leaders of evil carry more", "Do not lead others astray"],
      quote: q19(69),
      source: ik(69, "Allah will take from every nation those most rebellious against the Most Gracious, beginning with the greatest of them in crime.", "Allah will begin with the greatest of them in crime"),
      difficulty: 4,
      questions: [
        { q: "Who are taken out, in 19:69?", a: "The worst in rebellion", wrong: ["The kindest", "The youngest", "The poorest"], why: "All those who were worst in obstinate rebellion against the Most Gracious." },
        { q: "Whom does Allah begin with, per Ibn Masud?", a: "The greatest in crime", wrong: ["The smallest", "The newest", "The richest"], why: "Allah will begin with the greatest of them in crime and continue in succession." },
        { q: "What does every sect mean, per Mujahid?", a: "Every nation", wrong: ["Every house", "Every tree", "Every city wall"], why: "This means from every nation. This is what Mujahid said." }
      ]
    },
    {
      slug: "allah-knows-best-who-deserves",
      title: "Allah knows best",
      line: "Allah knows best who deserves the Fire; His judgment is perfect.",
      facts: ["Allah is the perfect Judge", "No one is wronged"],
      quote: q19(70),
      source: ik(70, "Allah knows best which of His creatures deserve the Fire and whose punishment is doubled.", "Allah best knows which of His creatures deserve"),
      difficulty: 4,
      questions: [
        { q: "Who knows best who is most worthy, in 19:70?", a: "Allah", wrong: ["The people", "The angels", "The devils"], why: "Then, verily, We know best those who are most worthy." },
        { q: "What does Allah know, per Ibn Kathir?", a: "Who deserves the Fire", wrong: ["Only the weather", "Only the past", "Nothing hidden"], why: "Allah best knows which of His creatures deserve to be burned in the fire." },
        { tf: true, q: "Ibn Kathir links 19:70 to 7:38 about double punishment.", why: "He will say: For each one there is double, but you know not. (7:38)" }
      ]
    },
    {
      slug: "everyone-passes-over",
      title: "Everyone passes over",
      line: "Every person will pass over it; this is Allah's firm decree.",
      facts: ["Prepare with good deeds", "Speed depends on deeds"],
      quote: q19(71),
      source: ik(71, "Ibn Masud explained that people cross the bridge over Hell. Some pass like lightning, some like wind, some like fast horses, as their deeds allow.", "The first group to cross it will pass like a flash of lightning"),
      difficulty: 4,
      questions: [
        { q: "Who will pass over it, in 19:71?", a: "Every one of you", wrong: ["Only kings", "No one", "Only angels"], why: "There is not one of you but will pass over it." },
        { q: "How does the first group cross, per Ibn Masud?", a: "Like a flash of lightning", wrong: ["Like a turtle", "Very slowly", "By boat"], why: "The first group to cross it will pass like a flash of lightning." },
        { q: "What do the angels say, per Ibn Masud?", a: "O Allah save them", wrong: ["Hurry up", "Go back", "Stop there"], why: "The angels will be saying: O Allah save them, save them." }
      ]
    },
    {
      slug: "the-pious-are-saved",
      title: "The pious are saved",
      line: "Allah saves those with Taqwa; the wrongdoers are left behind.",
      facts: ["Taqwa saves", "Allah keeps His promise"],
      quote: q19(72),
      source: hadith("muslim", "2496", "Umm Mubashshir", "Sahih", "The Prophet ﷺ said the people of the Tree would not enter the Fire. Hafsah recited 19:71, and he recited 19:72 about Allah rescuing the God-conscious.", "We would rescue those persons who are God-conscious"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah save, in 19:72?", a: "Those who had Taqwa", wrong: ["The proud", "The rich", "The loud"], why: "Then We shall save those who had Taqwa." },
        { q: "Which ayah did Hafsah recite, in the hadith?", a: "19:71", wrong: ["1:1", "2:255", "112:1"], why: "Hafsa said: And there is none amongst you but shall have to pass over that." },
        { q: "Who would not enter the Fire, in the hadith?", a: "The people of the Tree", wrong: ["The people of the sea", "The traders", "The poets"], why: "The people of the Tree would never enter the fire of Hell." }
      ]
    },
    {
      slug: "guidance-grows",
      title: "Guidance grows",
      line: "Allah gives more guidance to the guided; good deeds last.",
      facts: ["Guidance increases", "Good deeds are better"],
      quote: q19(76),
      source: ik(76, "Allah increases the guided in guidance, and the good deeds that last are better with Him in reward and in the end.", "He informs of the increase in guidance of those who are rightly guided"),
      difficulty: 2,
      questions: [
        { q: "Whom does Allah give more guidance, in 19:76?", a: "Those who walk aright", wrong: ["The proud", "The rich", "The careless"], why: "And Allah increases in guidance those who walk aright." },
        { q: "What is better with Allah, in 19:76?", a: "Good deeds that last", wrong: ["Gold", "Big houses", "Fame"], why: "And the righteous good deeds that last are better with your Lord for reward." },
        { q: "Guidance can grow and increase, per Ibn Kathir.", tf: true, why: "He informs of the increase in guidance of those who are rightly guided." }
      ]
    },
    {
      slug: "khabbab-and-the-debt",
      title: "Khabbab and the debt",
      line: "A denier mocked Khabbab, boasting of wealth after rising again.",
      facts: ["Khabbab stayed firm", "No one knows the unseen"],
      quote: q19(77),
      source: hadith("bukhari", "4733", "Khabbab ibn al-Aratt", "Sahih", "Khabbab, a blacksmith in Makkah, asked Al-As bin Wail for his pay. He refused unless Khabbab left Islam, and mocked that he would have wealth and children after rising. Allah revealed 19:77-78.", "I was a blacksmith in Mecca"),
      difficulty: 4,
      questions: [
        { q: "What was Khabbab's work, in the hadith?", a: "A blacksmith", wrong: ["A farmer", "A tailor", "A sailor"], why: "I was a blacksmith in Makkah." },
        { q: "What did Khabbab refuse to do?", a: "Disbelieve in Muhammad ﷺ", wrong: ["Make a sword", "Leave Makkah", "Ask for pay"], why: "I shall not disbelieve in Muhammad till Allah makes you die and then bring you to life again." },
        { q: "What does 19:78 ask the boaster?", a: "Has he known the Unseen?", wrong: ["Is he rich?", "Is he strong?", "Is he old?"], why: "Has he known the Unseen or has he taken a covenant from the Most Gracious?" }
      ]
    },
    {
      slug: "false-gods-for-honor",
      title: "Seeking honor from idols",
      line: "They sought honor from false gods, who will turn on them.",
      facts: ["Honor is from Allah", "Idols cannot help"],
      quote: q19(81),
      source: ik(81, "The idol worshippers thought their gods would give them honor and power. The matter is not as they claim and will not be as they hope.", "the matter is not as they claim, and it will not be as they hope"),
      difficulty: 3,
      questions: [
        { q: "Why did they take gods besides Allah, in 19:81?", a: "For honor, power and glory", wrong: ["For rain", "For food", "For fun"], why: "That they might give them honor, power and glory." },
        { q: "Will their hope come true, per Ibn Kathir?", a: "No", wrong: ["Yes", "Partly", "Later"], why: "The matter is not as they claim, and it will not be as they hope." },
        { tf: false, q: "In 19:81 the false gods truly give honor.", why: "The matter is not as they claim, and it will not be as they hope." }
      ]
    },
    {
      slug: "idols-become-enemies",
      title: "Idols become enemies",
      line: "On that Day, the worshipped will deny worship and become foes.",
      facts: ["Only Allah stays loyal", "Worship Allah alone"],
      quote: q19(82),
      source: ik(82, "On the Day of Judgment the false gods will deny being worshipped and will become enemies of those who worshipped them.", "This means enemies"),
      difficulty: 3,
      questions: [
        { q: "What will the false gods deny, in 19:82?", a: "Their worship", wrong: ["Their names", "Their homes", "Their food"], why: "Nay, but they will deny their worship of them." },
        { q: "What does adversaries mean, per Ad-Dahhak?", a: "Enemies", wrong: ["Friends", "Servants", "Guests"], why: "Ad-Dahhak said: This means enemies." },
        { tf: true, q: "Ibn Kathir links 19:82 to 46:5-6.", why: "When mankind are gathered, they will become their enemies and will deny their worshipping. (46:5-6)" }
      ]
    },
    {
      slug: "devils-push-to-evil",
      title: "Devils push to evil",
      line: "Devils push the disbelievers toward evil.",
      facts: ["Remember Allah often", "Dhikr protects the heart"],
      quote: q19(83),
      source: ik(83, "Ibn Abbas said the devils lead them astray with temptation. Whoever turns from Allah's remembrance is given a devil as a companion.", "They will lead them astray with temptation"),
      difficulty: 4,
      questions: [
        { q: "Whom are the Shayatin sent against, in 19:83?", a: "The disbelievers", wrong: ["The angels", "The birds", "The Prophets"], why: "We have sent the Shayatin against the disbelievers to push them to do evil." },
        { q: "How do devils mislead, per Ibn Abbas?", a: "With temptation", wrong: ["With gifts", "With rain", "With songs"], why: "They will lead them astray with temptation." },
        { q: "Which ayah does Ibn Zayd link to 19:83?", a: "43:36", wrong: ["2:255", "1:1", "112:1"], why: "We appoint for him a Shaytan to be a companion for him. (43:36)" }
      ]
    },
    {
      slug: "days-are-counted",
      title: "Their days are counted",
      line: "Do not rush against them; Allah counts out their limited time.",
      facts: ["Allah is never unaware", "Every day is counted"],
      quote: q19(84),
      source: ik(84, "The Prophet ﷺ is told not to hasten their punishment. Allah delays them only for a fixed, counted time.", "We are only delaying them for a fixed appointment whose time is numbered"),
      difficulty: 4,
      questions: [
        { q: "What does Allah count out, in 19:84?", a: "A limited number", wrong: ["Gold coins", "Stars", "Trees"], why: "We only count out to them a (limited) number." },
        { q: "What is counted, per As-Suddi?", a: "Years, months, days and hours", wrong: ["Coins", "Camels", "Houses"], why: "As-Suddi said: means years, months, days and hours." },
        { tf: false, q: "Ibn Kathir says Allah is unaware of what wrongdoers do.", why: "And consider not that Allah is unaware of that which the wrongdoers do. (14:42)" }
      ]
    },
    {
      slug: "a-delegation-to-the-most-gracious",
      title: "Guests of the Most Gracious",
      line: "The God-fearing will come to Allah like an honoured delegation.",
      facts: ["Riding mounts of light", "Honoured guests"],
      quote: q19(85),
      source: ik(85, "On the Day of Resurrection the God-fearing will be gathered to the Most Gracious like an honoured delegation, riding noble mounts of light.", "They will come riding upon noble steeds of light"),
      difficulty: 2,
      questions: [
        { q: "How will the God-fearing come, in 19:85?", a: "Like a delegation", wrong: ["Alone and lost", "Walking slowly", "In chains"], why: "The Day We shall gather those with Taqwa unto the Most Gracious, like a delegation." },
        { q: "What will they ride, per Ibn Kathir?", a: "Noble steeds of light", wrong: ["Camels of gold", "Ships", "Clouds"], why: "They will come riding upon noble steeds of light." },
        { q: "Can anyone intercede without Allah's permission, per 19:87?", a: "No", wrong: ["Yes, anyone", "Yes, kings", "Yes, idols"], why: "None shall have the power of intercession, but such a one as has received permission from the Most Gracious." }
      ]
    },
    {
      slug: "driven-thirsty",
      title: "Driven thirsty",
      line: "The criminals are driven to Hell thirsty, while the pious ride.",
      facts: ["The pious are honored", "Deeds decide our end"],
      quote: q19(86),
      source: ik(86, "The pious come to Allah like an honored delegation, while the criminals who denied the Messengers are driven to Hell, parched and thirsty.", "This means parched and thirsting for drink"),
      difficulty: 4,
      questions: [
        { q: "In what state are the criminals driven, in 19:86?", a: "Thirsty", wrong: ["Full", "Asleep", "Joyful"], why: "And We shall drive the criminals to Hell, in a thirsty state." },
        { q: "How do the pious arrive, per Ibn Kathir?", a: "Riding like a delegation", wrong: ["Crawling", "Hiding", "Running away"], why: "They will come riding upon noble steeds of light." },
        { tf: true, q: "Ibn Abbas and others said it means parched for drink.", why: "This means parched and thirsting for drink. This was stated by Ibn Abbas." }
      ]
    },
    {
      slug: "a-terrible-claim",
      title: "A terrible claim",
      line: "Claiming Allah has a son is so grave the heavens nearly tear.",
      facts: ["Allah has no child", "All creation is His"],
      quote: q19(92),
      source: ik(88, "Saying the Most Gracious has a son is a terrible claim. The heavens, earth and mountains nearly break at it, because Allah has no partner, no child and no equal.", "He has no partners, no peer, no child, no mate and no coequal"),
      difficulty: 3,
      questions: [
        { q: "How does 19:89 call the claim of a son?", a: "A terrible thing", wrong: ["A small thing", "A kind thing", "A wise thing"], why: "Indeed you have brought forth a thing Idda. Ibn Abbas, Mujahid, Qatadah and Malik all said: Terrible." },
        { q: "What nearly happens at the claim, in 19:90?", a: "The heavens nearly tear", wrong: ["Rain falls", "Stars shine", "Seas freeze"], why: "Whereby the heavens are almost torn, and the earth is split asunder, and the mountains fall." },
        { q: "Is it fitting for Allah to have a son, per 19:92?", a: "No", wrong: ["Yes", "Maybe", "Only one"], why: "But it is not suitable for the Most Gracious that He should beget a son." }
      ]
    },
    {
      slug: "each-comes-alone",
      title: "Each comes alone",
      line: "Everyone comes to Allah as a servant, and alone on that Day.",
      facts: ["Allah counts everyone", "No one is forgotten"],
      quote: q19(95),
      source: ik(93, "Everyone in the heavens and earth comes to the Most Gracious as a servant. He knows and has counted each one, and each will come to Him alone on the Day of Resurrection.", "There is none in the heavens and the earth but comes unto the Most Gracious as a slave"),
      difficulty: 3,
      questions: [
        { q: "How does everyone come to Allah, in 19:93?", a: "As His servant", wrong: ["As His partner", "As His equal", "As His child"], why: "There is none in the heavens and the earth but comes unto the Most Gracious as a slave." },
        { q: "What has Allah done, in 19:94?", a: "Counted everyone fully", wrong: ["Forgotten some", "Lost track", "Counted only kings"], why: "Verily, He knows each one of them, and has counted them a full counting." },
        { q: "How will each come on the Last Day, in 19:95?", a: "Alone", wrong: ["With his wealth", "With his army", "With his idols"], why: "And everyone of them will come to Him alone on the Day of Resurrection." }
      ]
    },
    {
      slug: "allah-places-love",
      title: "Allah places love",
      line: "For believers who do good, Allah places love in people's hearts.",
      facts: ["Love from the Most Gracious", "Good deeds bring love"],
      quote: q19(96),
      source: ik(96, "For believers who do righteous deeds, the Most Gracious puts love for them in the hearts of His righteous servants.", "He plants love for them in the hearts of His righteous servants"),
      difficulty: 2,
      questions: [
        { q: "What will the Most Gracious give, in 19:96?", a: "Love for them", wrong: ["Gold for them", "Fear of them", "Fame only"], why: "Verily, those who believe and work deeds of righteousness, the Most Gracious will bestow love for them." },
        { q: "Where does Allah plant love, per Ibn Kathir?", a: "In righteous hearts", wrong: ["In gold", "In rocks", "In books"], why: "He plants love for them in the hearts of His righteous servants." },
        { q: "Who earns the love, in 19:96?", a: "Believers who do good", wrong: ["The proud", "The famous", "The loud"], why: "Those who believe and work deeds of righteousness." }
      ]
    },
    {
      slug: "when-allah-loves-a-servant",
      title: "When Allah loves a servant",
      line: "When Allah loves someone, Jibril and the heavens love him too.",
      facts: ["Jibril announces it", "Accepted on earth"],
      quote: q19(96),
      source: hadith("bukhari", "3209", "Abu Hurairah", "Sahih", "If Allah loves a person, He tells Jibril to love him. Jibril announces it in the heavens, the dwellers there love him, and he is accepted on earth.", "If Allah loves a person, He calls Gabriel"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah call first, in the hadith?", a: "Jibril", wrong: ["Mika'il", "Israfil", "The kings"], why: "If Allah loves a person, He calls Jibril saying: Allah loves so-and-so; love him." },
        { q: "Who loves him after Jibril, in the hadith?", a: "The dwellers of heaven", wrong: ["No one", "Only animals", "Only kings"], why: "And so all the inhabitants of the Heaven would love him." },
        { q: "What does he receive on earth, in the hadith?", a: "Acceptance among people", wrong: ["Riches", "A palace", "A crown"], why: "And then he is granted the pleasure of the people on the earth." }
      ]
    },
    {
      slug: "made-easy-in-your-tongue",
      title: "Made easy to understand",
      line: "Allah made the Quran easy, bringing good news and warning.",
      facts: ["Easy to read and learn", "Past nations left no trace"],
      quote: q19(97),
      source: ik(97, "Allah made the Quran easy in the Prophet's ﷺ own language, to give good news to the God-fearing and warn the stubborn. Many nations before were destroyed and not even a whisper of them remains.", "So, We have made this easy in your own tongue"),
      difficulty: 2,
      questions: [
        { q: "How did Allah make the Quran, in 19:97?", a: "Easy, in his own tongue", wrong: ["Hard to read", "Secret", "For scholars only"], why: "So, We have made this easy in your own tongue." },
        { q: "To whom is it good news, in 19:97?", a: "Those who have Taqwa", wrong: ["The stubborn", "The proud", "Everyone equally"], why: "Only that you may give glad tidings to those who have Taqwa." },
        { q: "What remains of past nations, in 19:98?", a: "Not even a whisper", wrong: ["Great cities", "Their kings", "Their armies"], why: "Can you find a single one of them or hear even a whisper of them?" }
      ]
    }
  ]
};

export const MARYAM_UNITS: readonly DeepUnit[] = [MARYAM_ONE, MARYAM_TWO];
