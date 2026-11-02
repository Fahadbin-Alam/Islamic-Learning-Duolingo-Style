import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

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

export const MARYAM_UNITS: readonly DeepUnit[] = [MARYAM_ONE];
