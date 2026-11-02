import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Isra ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Isra 17:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_17_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Isra 17:${ayah}`,
    url: `https://quran.com/17:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 17:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q17 = (ayah: number) => quranQuote(17, ayah);

/** Ayahs 1 to 25: the Night Journey, Musa and Nuh, the Quran that guides, the book of deeds, and kindness to parents. */
const ISRA_ONE: DeepUnit = {
  key: "isra1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-17",
  name: "Al-Isra, ayahs 1 to 25",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Isra",
  lessons: [
    {
      slug: "the-night-journey",
      title: "The Night Journey",
      line: "Allah took His servant by night from Makkah to Jerusalem.",
      facts: ["From Al-Masjid Al-Haram", "To Al-Masjid Al-Aqsa"],
      quote: q17(1),
      source: ik(1, "Allah glorifies Himself for taking His servant Muhammad ﷺ by night from the Sacred Masjid in Makkah to Al-Masjid Al-Aqsa in Jerusalem, the land of the Prophets since Ibrahim.", "means the Sacred House which is in Jerusalem, the origin of the Prophets from the time of Ibrahim Al-Khalil"),
      difficulty: 2,
      questions: [
        { q: "Where did the Night Journey begin, in 17:1?", a: "Al-Masjid Al-Haram", wrong: ["Al-Masjid An-Nabawi", "Mount Sinai", "Ta'if"], why: "Who took His servant for a Journey by Night from Al-Masjid Al-Haram to Al-Masjid Al-Aqsa." },
        { q: "Where is Al-Masjid Al-Aqsa, per Ibn Kathir?", a: "Jerusalem", wrong: ["Makkah", "Madinah", "Egypt"], why: "It means the Sacred House which is in Jerusalem, the origin of the Prophets from the time of Ibrahim Al-Khalil." },
        { q: "The Night Journey took place in the depths of the night.", tf: true, why: "By Night means in the depths of the night, per Ibn Kathir." }
      ]
    },
    {
      slug: "leading-the-prophets",
      title: "Leading the Prophets in prayer",
      line: "The Prophets gathered in Jerusalem and he ﷺ led them in prayer.",
      facts: ["Their own homeland", "He is the greatest leader"],
      quote: q17(1),
      source: ik(1, "The Prophets all gathered at Al-Aqsa, and Muhammad ﷺ led them in prayer in their own homeland, showing that he is the greatest leader of them all.", "led them in prayer in their own homeland"),
      difficulty: 3,
      questions: [
        { q: "Who led the Prophets in prayer at Al-Aqsa?", a: "Muhammad ﷺ", wrong: ["Ibrahim", "Musa", "Isa"], why: "The Prophets all gathered there, and he led them in prayer in their own homeland." },
        { q: "Why is Jerusalem called their homeland, per Ibn Kathir?", a: "Prophets came from it since Ibrahim", wrong: ["They were all born in Makkah", "It was a market town", "It had a king"], why: "It is the origin of the Prophets from the time of Ibrahim Al-Khalil." },
        { q: "What does leading them show, per Ibn Kathir?", a: "He is the greatest leader of all", wrong: ["He was the oldest", "He arrived first", "He knew the town"], why: "This indicates that he is the greatest leader of all, may peace and blessings be upon him and upon them." }
      ]
    },
    {
      slug: "choosing-the-milk",
      title: "Choosing the milk",
      line: "He ﷺ chose milk over wine: the natural choice, said Jibril.",
      facts: ["Al-Buraq carried him", "Two rak'ahs at Al-Aqsa"],
      quote: q17(1),
      source: hadith("muslim", "162", "Anas ibn Malik", "Sahih", "The Prophet ﷺ rode Al-Buraq to Jerusalem, prayed two rak'ahs in the masjid, and was offered wine and milk. He chose the milk, and Jibril said he had chosen the natural thing.", "You have chosen the natural thing"),
      difficulty: 3,
      questions: [
        { q: "What animal carried him to Jerusalem, in the hadith?", a: "Al-Buraq", wrong: ["A camel", "A horse named Sakb", "A mule"], why: "I was brought Al-Buraq, an animal white and long, larger than a donkey but smaller than a mule." },
        { q: "Which drink did he ﷺ choose, in the hadith?", a: "Milk", wrong: ["Wine", "Honey", "Water"], why: "Gabriel brought me a vessel of wine and a vessel of milk. I chose the milk." },
        { q: "What did Jibril say about his choice?", a: "You have chosen the natural thing", wrong: ["You have chosen wealth", "You have chosen rest", "Choose again"], why: "Gabriel said: You have chosen the natural thing." }
      ]
    },
    {
      slug: "fifty-prayers-became-five",
      title: "Fifty prayers became five",
      line: "On that night Allah gave fifty prayers, then made them five.",
      facts: ["An act of mercy", "Shows how great prayer is"],
      quote: q17(1),
      source: ik(1, "During the journey Allah enjoined fifty prayers, then reduced them to five as a mercy to His servants. This shows the greatness and virtue of the prayer.", "Allah enjoined upon him fifty prayers, then reduced it to five, as an act of mercy and kindness towards His servants"),
      difficulty: 3,
      questions: [
        { q: "How many prayers were first enjoined, per Ibn Kathir?", a: "Fifty", wrong: ["Five", "Ten", "Seventy"], why: "Allah enjoined upon him fifty prayers, then reduced it to five." },
        { q: "Why were the prayers reduced to five, per Ibn Kathir?", a: "As mercy and kindness", wrong: ["People refused", "The night ended", "Angels asked"], why: "As an act of mercy and kindness towards His servants." },
        { q: "Prayer being given on that night shows its greatness.", tf: true, why: "In this is a strong indication of the greatness and virtue of the prayers." }
      ]
    },
    {
      slug: "the-much-frequented-house",
      title: "The Much-Frequented House",
      line: "In the seventh heaven is a House that angels visit each day.",
      facts: ["Al-Bayt Al-Ma'mur", "Ibrahim leaned against it"],
      quote: q17(1),
      source: ik(1, "In the seventh heaven he saw Al-Bayt Al-Ma'mur, the heavenly Ka'bah, with Ibrahim leaning back against it. Seventy thousand angels enter it every day and never return to it.", "every day, seventy thousand angels enter and worship therein"),
      difficulty: 4,
      questions: [
        { q: "Who leaned against Al-Bayt Al-Ma'mur, per Ibn Kathir?", a: "Ibrahim", wrong: ["Adam", "Musa", "Nuh"], why: "He saw Al-Bayt Al-Ma'mur, and Ibrahim Al-Khalil, the builder of the earthly Ka'bah, leaning back against it." },
        { q: "How many angels enter it each day, per Ibn Kathir?", a: "Seventy thousand", wrong: ["Seven hundred", "Seven", "One thousand"], why: "Every day, seventy thousand angels enter and worship therein." },
        { q: "What is Al-Bayt Al-Ma'mur called, per Ibn Kathir?", a: "The heavenly Ka'bah", wrong: ["The first masjid", "A palace of gold", "The Lote tree"], why: "Ibrahim, the builder of the earthly Ka'bah, was leaning back against it, the heavenly Ka'bah." }
      ]
    },
    {
      slug: "awake-in-body-and-soul",
      title: "Awake, in body and soul",
      line: "The journey was real, with body and soul, not a dream.",
      facts: ["Subhan is for great matters", "A dream would be no sign"],
      quote: q17(1),
      source: ik(1, "Ibn Kathir explains that the Prophet ﷺ was taken with body and soul while awake. The ayah opens by glorifying Allah, which is said for great matters, so it was no dream.", "with body and soul, he was awake, not asleep"),
      difficulty: 4,
      questions: [
        { q: "Was the Night Journey a dream, per Ibn Kathir?", a: "No, he was awake in body and soul", wrong: ["Yes, only a dream", "Only his soul went", "No one knows"], why: "The Prophet ﷺ was taken on the Night Journey with body and soul, he was awake, not asleep." },
        { q: "Which word in 17:1 shows it was a great matter?", a: "Glorified be He", wrong: ["By night", "His servant", "We have blessed"], why: "Glorified (and exalted) be Allah is spoken in the case of serious matters, so it was no dream." },
        { q: "Ibn Kathir says a mere dream would not be a great sign.", tf: true, why: "If it had been a dream, it would not have been a sign of such a serious matter, per Ibn Kathir." }
      ]
    },
    {
      slug: "musa-and-the-scripture",
      title: "Musa and the Scripture",
      line: "Musa was given the Tawrah to guide the Children of Israel.",
      facts: ["Muhammad and Musa often named together", "Take none but Allah as Wakil"],
      quote: q17(2),
      source: ik(2, "After the Night Journey, Allah mentions Musa and the Tawrah. Allah often mentions Muhammad and Musa together, and the Quran and the Tawrah together. Its message: take no protector but Allah.", "Allah often mentions Muhammad and Musa together"),
      difficulty: 3,
      questions: [
        { q: "Which Scripture was given to Musa, per Ibn Kathir?", a: "The Tawrah", wrong: ["The Injil", "The Zabur", "The Suhuf of Ibrahim"], why: "And We gave Musa the Scripture, meaning the Tawrah." },
        { q: "Which two Prophets does Allah often mention together?", a: "Muhammad and Musa", wrong: ["Nuh and Hud", "Yusuf and Yaqub", "Isa and Yahya"], why: "Allah often mentions Muhammad and Musa together, and He mentions the Tawrah and the Qur'an together." },
        { q: "What does Wakil mean in 17:2, per Ibn Kathir?", a: "Protector, supporter, god", wrong: ["A king", "A scribe", "A traveller"], why: "You have no protector, supporter or god besides Me." }
      ]
    },
    {
      slug: "nuh-the-grateful-servant",
      title: "Nuh, the grateful servant",
      line: "Nuh was a grateful servant, so follow his footsteps.",
      facts: ["All are from those in the ship", "Thank Allah for food and drink"],
      quote: q17(3),
      source: ik(3, "People today descend from those carried in the ship with Nuh, so they are reminded to follow their father Nuh, who was a grateful servant.", "follow in the footsteps of your father"),
      difficulty: 3,
      questions: [
        { q: "How does 17:3 describe Nuh?", a: "A grateful servant", wrong: ["A great king", "A rich man", "A poet"], why: "Verily, he was a grateful servant." },
        { q: "Whose descendants are addressed in 17:3?", a: "Those carried in the ship with Nuh", wrong: ["The people of Fir'awn", "The people of Ad", "The angels"], why: "O offspring of those whom We carried (in the ship) with Nuh." },
        { q: "What should the descendants do, per Ibn Kathir?", a: "Follow Nuh's footsteps", wrong: ["Build ships", "Leave their homes", "Fear the sea"], why: "Follow in the footsteps of your father; verily, he was a grateful servant." }
      ]
    },
    {
      slug: "praise-for-each-bite",
      title: "Praise for each bite",
      line: "Allah is pleased when we praise Him for food and drink.",
      facts: ["Say Al-Hamdu lillah", "Like Nuh, be grateful"],
      quote: q17(3),
      source: hadith("muslim", "2734", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said that Allah is pleased with His servant who praises Him when he eats a morsel and when he drinks.", "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food and while drinking"),
      difficulty: 3,
      questions: [
        { q: "What pleases Allah, in the hadith?", a: "Praising Him for food and drink", wrong: ["Eating in silence", "Eating a lot", "Skipping meals"], why: "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food and while drinking." },
        { q: "What should a grateful servant say after a sip of water?", a: "Al-Hamdu lillah", wrong: ["Nothing", "Bismillah only", "Ameen"], why: "Allah is pleased with His servant who says Al-Hamdu lillah while drinking." },
        { q: "Ibn Kathir links the hadith to Nuh being grateful.", tf: true, why: "After he was a grateful servant, Ibn Kathir quotes the hadith that Allah is pleased when His servant praises Him for food and drink." }
      ]
    },
    {
      slug: "the-quran-guides",
      title: "The Quran guides",
      line: "The Quran guides to what is most just and brings good news.",
      facts: ["The best and clearest way", "A great reward for doers"],
      quote: q17(9),
      source: ik(9, "Allah praises His Book: it directs people to the best and clearest way, and gives good news of a great reward to believers who do righteous deeds.", "It directs people to the best and clearest of ways"),
      difficulty: 3,
      questions: [
        { q: "To what does the Quran guide, in 17:9?", a: "What is most just and right", wrong: ["Wealth alone", "Old customs", "Fame"], why: "Verily, this Qur'an guides to that which is most just and right." },
        { q: "Who gets the good news, in 17:9?", a: "Believers who do good deeds", wrong: ["Everyone equally", "Only scholars", "Only kings"], why: "It gives good news to those who believe, those who do righteous deeds, that they will have a great reward." },
        { q: "How does Ibn Kathir describe the Quran's way?", a: "The best and clearest of ways", wrong: ["A hidden path", "A hard riddle", "One of many"], why: "It directs people to the best and clearest of ways." }
      ]
    },
    {
      slug: "man-is-hasty",
      title: "Man is ever hasty",
      line: "In haste a person may pray for harm on himself.",
      facts: ["Do not pray against yourself", "Haste and worry cause it"],
      quote: q17(11),
      source: ik(11, "Sometimes in haste and anger a person prays for bad things to happen to himself, his children or his wealth. If Allah answered, he would be harmed. This comes from worry and haste.", "What makes the son of Adam do that is his anxiety and haste"),
      difficulty: 3,
      questions: [
        { q: "How is man described at the end of 17:11?", a: "Ever hasty", wrong: ["Ever patient", "Ever thankful", "Ever silent"], why: "And man is ever hasty." },
        { q: "What may a hasty person do, per Ibn Kathir?", a: "Pray against himself or family", wrong: ["Pray too much", "Give too much", "Sleep too long"], why: "He sometimes prays against himself or his children or his wealth, praying for something bad to happen." },
        { q: "What makes people pray for harm, per Ibn Kathir?", a: "Anxiety and haste", wrong: ["Too much knowledge", "Patience", "Hunger"], why: "What makes the son of Adam do that is his anxiety and haste." }
      ]
    },
    {
      slug: "night-and-day-signs",
      title: "Night and day are signs",
      line: "Night is for rest; day is for work and counting time.",
      facts: ["Seek bounty by day", "Count the years"],
      quote: q17(12),
      source: ik(12, "Allah made night and day two signs: night for rest, day for work and travel, and their turning lets us count days, months and years for worship and dealings.", "so that people may rest at night, and go out and earn a living"),
      difficulty: 3,
      questions: [
        { q: "What are night and day called, in 17:12?", a: "Two signs", wrong: ["Two kings", "Two rivers", "Two books"], why: "And We have appointed the night and the day as two Ayat (signs)." },
        { q: "What is the night for, per Ibn Kathir?", a: "Rest", wrong: ["Trade", "Travel only", "Farming"], why: "So that people may rest at night, and go out and earn a living during the day." },
        { q: "What does the turning of day and night let us know?", a: "The number of the years", wrong: ["The weight of mountains", "The names of stars", "Hidden secrets"], why: "That you may know the number of the years and to count periods of time." }
      ]
    },
    {
      slug: "a-book-wide-open",
      title: "A book wide open",
      line: "Each person meets a book of their deeds on the Last Day.",
      facts: ["Good and bad both recorded", "Read your own Book"],
      quote: q17(13),
      source: ik(13, "Each person's deeds, good and bad, are fastened to him. On the Day of Resurrection he is given his Book wide open and told to read it himself.", "It includes both good deeds and bad deeds"),
      difficulty: 4,
      questions: [
        { q: "What does Ta'irah mean in 17:13, per Ibn Kathir?", a: "A person's deeds", wrong: ["A bird", "A wish", "A name"], why: "The word Ta'irah, something that flies, means the deeds that fly from a person." },
        { q: "How is the Book found, in 17:13?", a: "Wide open", wrong: ["Sealed shut", "Torn", "Blank"], why: "We shall bring out for him a Book which he will find wide open." },
        { q: "Who reads the Book, in 17:14?", a: "The person himself", wrong: ["Only the angels", "His friends", "No one"], why: "Read your Book. You yourself are sufficient as a reckoner against you this Day." }
      ]
    },
    {
      slug: "no-one-carries-anothers-load",
      title: "No one carries another's load",
      line: "Guidance helps the guided; no one bears another's sins.",
      facts: ["A Messenger warns first", "Each is responsible"],
      quote: q17(15),
      source: ik(15, "Whoever follows guidance gains its good for himself, and whoever strays harms only himself. No one will carry the sins of another, and Allah does not punish before sending a Messenger.", "no one will have to bear the sins of another"),
      difficulty: 3,
      questions: [
        { q: "Who benefits when someone is guided, in 17:15?", a: "The guided one himself", wrong: ["Only his family", "His enemies", "No one"], why: "Whoever goes right, then he goes right only for the benefit of himself." },
        { q: "Can one person carry another's sins, per 17:15?", a: "No", wrong: ["Yes, always", "Only parents", "Only friends"], why: "No one laden with burdens can bear another's burden." },
        { q: "Allah punishes a people before sending a Messenger.", tf: false, why: "And We never punish until We have sent a Messenger (to give warning)." }
      ]
    },
    {
      slug: "striving-for-the-hereafter",
      title: "Striving for the Hereafter",
      line: "Whoever seeks the Hereafter and strives with faith is rewarded.",
      facts: ["Seek it the right way", "Follow the Messenger ﷺ"],
      quote: q17(19),
      source: ik(19, "Whoever wants the Hereafter, strives for it in the right way by following the Messenger ﷺ, and has faith in his heart, his striving will be appreciated and rewarded.", "wanting the Hereafter and its blessings and delights"),
      difficulty: 4,
      questions: [
        { q: "What three things are named in 17:19?", a: "Desire, striving and faith", wrong: ["Wealth, fame and power", "Sleep, food and rest", "Travel, trade and war"], why: "Whoever desires the Hereafter and strives for it, with the necessary effort due for it while he is a believer." },
        { q: "What is the right way to strive, per Ibn Kathir?", a: "Following the Messenger ﷺ", wrong: ["Any way one likes", "Copying elders blindly", "Living alone"], why: "Seeking it in the right way, which is following the Messenger ﷺ." },
        { q: "What happens to their striving, in 17:19?", a: "It is appreciated", wrong: ["It is lost", "It is delayed forever", "It is forgotten"], why: "Then such are the ones whose striving shall be appreciated (rewarded by Allah)." }
      ]
    },
    {
      slug: "bounties-for-all",
      title: "Bounties for all",
      line: "Allah gives to all from His bounty; none can stop it.",
      facts: ["Some rich, some poor", "Hereafter's ranks are greater"],
      quote: q17(20),
      source: ik(20, "Allah gives from His bounty to both those who want this world and those who want the Hereafter, and no one can hold it back. The ranks of the Hereafter are far greater than this world's.", "no one can withhold or prevent them"),
      difficulty: 4,
      questions: [
        { q: "Can anyone block Allah's bounty, in 17:20?", a: "No, it can never be forbidden", wrong: ["Yes, kings can", "Yes, the rich can", "Only on Fridays"], why: "And the bounties of your Lord can never be forbidden, meaning no one can withhold or prevent them." },
        { q: "Where are the differences in rank greater, per 17:21?", a: "In the Hereafter", wrong: ["In this world", "In the market", "They are equal"], why: "And verily, the Hereafter will be greater in degrees and greater in preferment." },
        { q: "Some are rich and some poor in this world, per Ibn Kathir.", tf: true, why: "See how We prefer one above another, meaning in this world, so that some are rich and some are poor." }
      ]
    },
    {
      slug: "no-other-god",
      title: "No other god with Allah",
      line: "Whoever worships others is left to what cannot help him.",
      facts: ["Only Allah benefits or harms", "Ask Allah in hardship"],
      quote: q17(22),
      source: ik(22, "Whoever sets up partners with Allah is left without help, handed to what he worshipped, which cannot benefit or harm. Only Allah has power to benefit or harm.", "the Only One Who has the power to benefit or to harm is Allah alone"),
      difficulty: 4,
      questions: [
        { q: "What does 17:22 forbid?", a: "Setting up another god with Allah", wrong: ["Working hard", "Travelling", "Sleeping"], why: "Set not up with Allah any other ilah (god)." },
        { q: "Who alone can benefit or harm, per Ibn Kathir?", a: "Allah alone", wrong: ["Idols", "Stars", "Kings"], why: "The Only One Who has the power to benefit or to harm is Allah alone, with no partner." },
        { q: "Whom should a poor person ask for help, in the hadith?", a: "Allah", wrong: ["Only people", "No one", "Fortune tellers"], why: "If he asks Allah for help, then Allah will grant him the means of independence sooner or later." }
      ]
    },
    {
      slug: "not-even-uff",
      title: "Not even a sigh",
      line: "Worship Allah alone and be good to parents, without a sigh.",
      facts: ["Worship and parents together", "Speak to them kindly"],
      quote: q17(23),
      source: ik(23, "Allah joins worship of Him with kindness to parents. In their old age, do not let them hear even the smallest word of annoyance, do not scold them, and speak to them gently.", "which is the mildest word of disrespect"),
      difficulty: 3,
      questions: [
        { q: "What comes right after worship of Allah in 17:23?", a: "Being dutiful to parents", wrong: ["Fasting", "Travelling", "Trade"], why: "Your Lord has decreed that you worship none but Him. And that you be dutiful to your parents." },
        { q: "Which word must not be said to parents in 17:23?", a: "Uff", wrong: ["Salam", "Thank you", "Please"], why: "Do not let them hear anything offensive from you, not even Uff, the mildest word of disrespect." },
        { q: "How should we speak to parents, in 17:23?", a: "With a generous, kind word", wrong: ["Loudly", "Rarely", "Rudely"], why: "But address them in terms of honor." }
      ]
    },
    {
      slug: "lower-the-wing",
      title: "Lower the wing of mercy",
      line: "Be humble to parents and pray: Lord, have mercy on them.",
      facts: ["Humble in actions", "Pray for them always"],
      quote: q17(24),
      source: ik(24, "Lower to parents the wing of humility out of mercy, be humble in what you do for them, and pray for Allah's mercy on them as they cared for you when you were small.", "be humble towards them in your actions"),
      difficulty: 3,
      questions: [
        { q: "What should be lowered to parents, in 17:24?", a: "The wing of humility", wrong: ["The voice only", "The eyes only", "The flag"], why: "And lower unto them the wing of submission and humility through mercy." },
        { q: "What should we pray for parents, in 17:24?", a: "Lord, have mercy on them", wrong: ["Make them rich", "Make them quiet", "Nothing"], why: "My Lord! Bestow on them Your mercy as they did bring me up when I was small." },
        { q: "Ibn Kathir says humility is in actions too, not only words.", tf: true, why: "Be humble towards them in your actions." }
      ]
    },
    {
      slug: "your-mother-three-times",
      title: "Your mother, three times",
      line: "Your mother comes first for kindness, three times, then father.",
      facts: ["Mother, mother, mother", "Then your father"],
      quote: q17(24),
      source: hadith("bukhari", "5971", "Abu Hurairah", "Sahih", "A man asked who most deserves his good company. The Prophet ﷺ said your mother three times, and then your father.", "Who is more entitled to be treated with the best companionship by me"),
      difficulty: 4,
      questions: [
        { q: "Who most deserves good company, in the hadith?", a: "Your mother", wrong: ["Your friend", "Your teacher", "Your neighbour"], why: "The Prophet ﷺ said, Your mother." },
        { q: "How many times was the mother named?", a: "Three", wrong: ["One", "Two", "Five"], why: "He was asked who is next, and said your mother, three times, then your father." },
        { q: "Who came after the mother, in the hadith?", a: "Your father", wrong: ["Your brother", "Your uncle", "Your child"], why: "The man asked for the fourth time, Who is next? The Prophet ﷺ said, Your father." }
      ]
    },
    {
      slug: "allah-knows-the-heart",
      title: "Allah knows what is in hearts",
      line: "If we slip with parents and turn back, Allah forgives.",
      facts: ["He knows your intention", "Repent again and again"],
      quote: q17(25),
      source: ik(25, "Allah knows what is in our hearts. If someone slips with his parents without meaning harm and turns back to Allah, He is Ever Forgiving to those who return.", "it refers to the one who repents after committing sin"),
      difficulty: 4,
      questions: [
        { q: "Who knows best what is in our souls, in 17:25?", a: "Allah", wrong: ["Our friends", "Our parents", "No one"], why: "Your Lord knows best what is in your souls." },
        { q: "Whom does Allah forgive, in 17:25?", a: "Those who turn to Him", wrong: ["Only the perfect", "No one", "Only the old"], why: "He is Ever Most Forgiving to those who turn to Him in repentance." },
        { q: "What did the Prophet ﷺ say returning from a journey?", a: "We return repenting and praising", wrong: ["We are tired", "We are rich", "Nothing at all"], why: "We have returned repenting, worshipping and praising our Lord." }
      ]
    }
  ]
};

/** Ayahs 26 to 55: kin and the poor, the middle way in spending, honest dealing, humility, and everything praising Allah. */
const ISRA_TWO: DeepUnit = {
  key: "isra2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-17",
  name: "Al-Isra, ayahs 26 to 55",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Isra",
  lessons: [
    {
      slug: "give-kin-their-due",
      title: "Give relatives their due",
      line: "After parents, give to relatives, the poor and the traveller.",
      facts: ["Closest relatives first", "Then the poor and wayfarer"],
      quote: q17(26),
      source: ik(26, "After honouring parents, Allah commands kindness to relatives and keeping family ties, then giving to the poor and the stranded traveller.", "your closest relatives and the next closest"),
      difficulty: 2,
      questions: [
        { q: "Who is named first in 17:26?", a: "The kinsman", wrong: ["The king", "The merchant", "The guest"], why: "And give to the kinsman his due, and to the Miskin (poor), and to the wayfarer." },
        { q: "What does Allah mention right after parents, per Ibn Kathir?", a: "Kindness to relatives", wrong: ["Trade rules", "Travel rules", "War"], why: "When Allah mentions honoring one's parents, He follows this with the command to treat one's relatives well." },
        { q: "Who is the wayfarer in 17:26?", a: "A traveller in need", wrong: ["A rich neighbour", "A shop owner", "A soldier"], why: "The wayfarer is the traveller far from home, named with the poor among those to be given their due." }
      ]
    },
    {
      slug: "family-ties-bring-blessing",
      title: "Family ties bring blessing",
      line: "Keeping family ties brings more provision and a longer life.",
      facts: ["Visit and help relatives", "Allah blesses your provision"],
      quote: q17(26),
      source: hadith("bukhari", "5986", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said whoever loves to be given more provision and a longer life should keep good relations with his relatives.", "should keep good relations with his Kith and kin"),
      difficulty: 3,
      questions: [
        { q: "What brings more provision, in the hadith?", a: "Keeping ties with relatives", wrong: ["Avoiding relatives", "Keeping secrets", "Sleeping early"], why: "Whoever loves that he be granted more wealth should keep good relations with his kith and kin." },
        { q: "What else is prolonged by family ties, in the hadith?", a: "A person's life", wrong: ["The night", "The journey", "A friendship only"], why: "And that his lease of life be prolonged, then he should keep good relations with his kith and kin." },
        { q: "Ibn Kathir quotes a hadith on family ties under 17:26.", tf: true, why: "Whoever would like to see his provision expanded and his life extended, let him maintain his ties of kinship." }
      ]
    },
    {
      slug: "do-not-waste",
      title: "Do not waste",
      line: "Spendthrifts are brothers of the devils, so do not waste.",
      facts: ["Waste is spending on wrong", "Shaytan is ungrateful"],
      quote: q17(27),
      source: ik(27, "Allah forbids wasteful spending. Spendthrifts are like the devils in waste, foolishness and disobedience, and Shaytan is ungrateful to his Lord.", "they are their brothers in extravagance, foolishness"),
      difficulty: 3,
      questions: [
        { q: "Whose brothers are the spendthrifts, in 17:27?", a: "The Shayatin", wrong: ["The angels", "The Prophets", "The poor"], why: "Verily, the spendthrifts are brothers of the Shayatin (devils)." },
        { q: "What is extravagance, per Qatadah in Ibn Kathir?", a: "Spending on sin and wrong", wrong: ["Any spending at all", "Giving charity", "Buying food"], why: "Extravagance means spending money on sin in disobeying Allah, and on wrongful and corrupt things." },
        { q: "How is Shaytan described in 17:27?", a: "Ungrateful to his Lord", wrong: ["Thankful", "Forgetful only", "Sleepy"], why: "And the Shaytan is ever ungrateful to his Lord." }
      ]
    },
    {
      slug: "a-soft-kind-word",
      title: "A soft, kind word",
      line: "If you have nothing to give, still answer with a kind word.",
      facts: ["Do not be harsh", "Promise when you can"],
      quote: q17(28),
      source: ik(28, "If relatives or the needy ask and you have nothing to give, do not turn them away harshly. Speak to them softly and kindly, with a promise to give when you can.", "meaning, with a promise"),
      difficulty: 3,
      questions: [
        { q: "What should you say when you have nothing to give, in 17:28?", a: "A soft, kind word", wrong: ["Nothing at all", "A harsh word", "A joke"], why: "Then, speak unto them a soft, kind word." },
        { q: "What is the soft word, per Ibn Kathir?", a: "A promise to give later", wrong: ["A complaint", "A lecture", "A refusal"], why: "Speak unto them a soft, kind word, meaning, with a promise." },
        { q: "17:28 allows being harsh when you cannot give.", tf: false, why: "If you turn away because you have nothing to give, then speak unto them a soft, kind word." }
      ]
    },
    {
      slug: "the-middle-way-in-spending",
      title: "The middle way in spending",
      line: "Do not be stingy, and do not spend everything away.",
      facts: ["Hand not tied to the neck", "Hand not fully stretched"],
      quote: q17(29),
      source: ik(29, "Allah commands moderation. A miser is blamed and no one relies on him, and one who spends more than he can afford is left worn out with nothing.", "Allah enjoins moderation in living"),
      difficulty: 3,
      questions: [
        { q: "What does a hand tied to the neck mean, per Ibn Kathir?", a: "Being stingy", wrong: ["Being generous", "Being sick", "Being tired"], why: "This means, do not be miserly and stingy, never giving anything to anyone." },
        { q: "What does overextending the hand mean, per Ibn Kathir?", a: "Spending more than you can", wrong: ["Shaking hands", "Working hard", "Praying long"], why: "Nor be extravagant in spending and giving more than you can afford." },
        { q: "What does Allah enjoin in 17:29, per Ibn Kathir?", a: "Moderation", wrong: ["Hoarding", "Giving away all", "Borrowing"], why: "Allah enjoins moderation in living. He condemns miserliness and forbids extravagance." }
      ]
    },
    {
      slug: "charity-never-lessens-wealth",
      title: "Charity never lessens wealth",
      line: "Charity does not lessen wealth, and humility raises you.",
      facts: ["Forgiving brings honour", "Humble for Allah is raised"],
      quote: q17(29),
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "The Prophet ﷺ said charity does not decrease wealth, Allah increases in honour the one who forgives, and raises the one who is humble for His sake.", "Charity does not decrease wealth"),
      difficulty: 3,
      questions: [
        { q: "What does charity not do, in the hadith?", a: "Decrease wealth", wrong: ["Bring reward", "Please Allah", "Help the poor"], why: "Charity does not decrease wealth." },
        { q: "What does Allah give the one who forgives?", a: "More honour", wrong: ["Less respect", "More worry", "Nothing"], why: "No one forgives another except that Allah increases his honor." },
        { q: "Who is raised in status, in the hadith?", a: "The humble, for Allah's sake", wrong: ["The proud", "The loud", "The richest"], why: "No one humbles himself for the sake of Allah except that Allah raises his status." }
      ]
    },
    {
      slug: "allah-gives-provision",
      title: "Allah gives provision",
      line: "Allah gives more to some and less to others, by His wisdom.",
      facts: ["He sees His servants", "Rich and poor both tested"],
      quote: q17(30),
      source: ik(30, "Allah is the One Who provides or holds back. He makes rich and poor by His wisdom, and He knows and sees who is best served by each.", "He knows and sees who deserves to be rich and who deserves to be poor"),
      difficulty: 4,
      questions: [
        { q: "Who expands and straitens provision, in 17:30?", a: "Allah", wrong: ["Kings", "Luck", "The market"], why: "Truly, your Lord expands the provision for whom He wills and straitens (for whom He wills)." },
        { q: "By what does Allah make some rich and some poor?", a: "His wisdom", wrong: ["Chance", "Their names", "Their homes"], why: "He makes rich whomever He wills, and He makes poor whomever He wills, by the wisdom that is His." },
        { q: "Which names end 17:30?", a: "All-Knower, All-Seer", wrong: ["Most Merciful, Most Kind", "All-Mighty, All-Wise", "Most High, Most Great"], why: "Verily, He is Ever All-Knower, All-Seer of His servants." }
      ]
    },
    {
      slug: "orphans-and-promises",
      title: "Orphans and promises",
      line: "Guard an orphan's wealth, and keep every promise.",
      facts: ["Only to improve it", "Promises will be asked about"],
      quote: q17(34),
      source: ik(34, "Do not touch an orphan's wealth except to improve it until he grows up. Keep every promise and agreement, because each person will be asked about them.", "everything that you promise people"),
      difficulty: 3,
      questions: [
        { q: "When may one go near an orphan's property, in 17:34?", a: "Only to improve it", wrong: ["To borrow it", "To spend it", "Never to check it"], why: "And come not near to the orphan's property except to improve it." },
        { q: "What will be questioned about, in 17:34?", a: "The covenant", wrong: ["The weather", "Our clothes", "Our height"], why: "And fulfill (every) covenant. Verily, the covenant will be questioned about." },
        { q: "What does covenant include, per Ibn Kathir?", a: "Every promise we make", wrong: ["Only big treaties", "Only written deals", "Only oaths to kings"], why: "Meaning, everything that you promise people, and the covenants that you agree to." }
      ]
    },
    {
      slug: "a-straight-balance",
      title: "A straight balance",
      line: "Give full measure and weigh with a straight balance.",
      facts: ["Never cheat on weight", "Better in the end"],
      quote: q17(35),
      source: ik(35, "Give full measure and weigh honestly, without making things weigh less or wronging people. That is good in this life and better in the Hereafter.", "do not try to make it weigh less nor wrong people with their belongings"),
      difficulty: 3,
      questions: [
        { q: "How should we measure, in 17:35?", a: "Give full measure", wrong: ["Give a little less", "Guess the weight", "Skip measuring"], why: "And give full measure when you measure, and weigh with a balance that is straight." },
        { q: "What does a straight balance mean, per Ibn Kathir?", a: "Scales that are not distorted", wrong: ["A tall shelf", "A new shop", "A heavy stone"], why: "Meaning scales that are straight, not distorted nor causing confusion." },
        { q: "Honest weighing is better in the end, per 17:35.", tf: true, why: "That is good (advantageous) and better in the end." }
      ]
    },
    {
      slug: "do-not-speak-without-knowledge",
      title: "Do not speak without knowledge",
      line: "Do not follow or say what you do not know.",
      facts: ["Avoid suspicion", "Do not say I saw if you did not"],
      quote: q17(36),
      source: ik(36, "Allah forbids speaking without knowledge, only from suspicion. Do not say you saw, heard or know something when you did not.", "Allah forbids speaking without knowledge and only on the basis of suspicion"),
      difficulty: 3,
      questions: [
        { q: "What does 17:36 forbid?", a: "Following what we do not know", wrong: ["Learning new things", "Asking questions", "Reading books"], why: "And follow not that of which you have no knowledge." },
        { q: "What is speech built on suspicion, per Ibn Kathir?", a: "Forbidden", wrong: ["Recommended", "Always true", "A good habit"], why: "Allah forbids speaking without knowledge and only on the basis of suspicion." },
        { q: "What did Qatadah warn against saying falsely?", a: "I have seen or heard", wrong: ["Thank you", "Salam", "Bismillah"], why: "Do not say, I have seen, when you did not see anything, or I have heard, when you did not hear anything." }
      ]
    },
    {
      slug: "hearing-sight-and-heart",
      title: "Hearing, sight and heart",
      line: "Our hearing, sight and heart will each be asked about.",
      facts: ["Gifts we must use well", "Asked on the Last Day"],
      quote: q17(36),
      source: ik(36, "Hearing, sight and the heart will each be asked about on the Day of Resurrection: how a person used them.", "the person will be asked about them on the Day of Resurrection"),
      difficulty: 4,
      questions: [
        { q: "Which three are questioned, in 17:36?", a: "Hearing, sight and heart", wrong: ["Hands, feet and hair", "Wealth, house and car", "Name, age and town"], why: "Verily, the hearing, and the sight, and the heart of each of those ones will be questioned." },
        { q: "What will a person be asked about them, per Ibn Kathir?", a: "What he did with them", wrong: ["Their colour", "Their size", "Nothing"], why: "The person will be asked about them on the Day of Resurrection, and what he did with them." },
        { q: "Ibn Kathir says the faculties will be asked about the person too.", tf: true, why: "And they will be asked about him and what he did with them." }
      ]
    },
    {
      slug: "walk-humbly",
      title: "Walk humbly",
      line: "Walk humbly: pride cannot split the earth or match mountains.",
      facts: ["Arrogance is hateful to Allah", "Be humble in walking"],
      quote: q17(37),
      source: ik(37, "Allah forbids walking with pride. However proud a person walks, he cannot pierce the earth with his steps or grow as tall as the mountains.", "you cannot penetrate the earth with your walking"),
      difficulty: 3,
      questions: [
        { q: "How should we not walk, in 17:37?", a: "With conceit and arrogance", wrong: ["Quickly", "Slowly", "Barefoot"], why: "And walk not on the earth with conceit and arrogance." },
        { q: "What can a proud walker not do, in 17:37?", a: "Reach the mountains in height", wrong: ["Walk at all", "Speak", "See"], why: "Nor can you attain a stature like the mountains in height." },
        { q: "How does Allah view these bad deeds, in 17:38?", a: "Hateful to Him", wrong: ["Small matters", "Allowed", "Rewarded"], why: "All the bad aspects of these are hateful to your Lord." }
      ]
    },
    {
      slug: "this-is-wisdom",
      title: "This is wisdom",
      line: "All these commands are part of the wisdom Allah revealed.",
      facts: ["Good manners commanded", "Bad traits forbidden"],
      quote: q17(39),
      source: ik(39, "Everything commanded from 17:23 onward is good manners, and everything forbidden is a bad trait. Allah revealed this wisdom so it could be taught to people.", "What We have commanded you to do is part of good manners"),
      difficulty: 3,
      questions: [
        { q: "What does 17:39 call these teachings?", a: "Al-Hikmah, wisdom", wrong: ["A poem", "A story", "A riddle"], why: "This is (part) of Al-Hikmah (wisdom) which your Lord has revealed to you." },
        { q: "What are the commands, per Ibn Kathir?", a: "Good manners", wrong: ["Old customs", "Hard tests", "Secrets"], why: "What We have commanded you to do is part of good manners, and what We have forbidden you are evil qualities." },
        { q: "Which sin does 17:39 warn of again?", a: "Setting up another god", wrong: ["Laziness", "Hunger", "Travel"], why: "And set not up with Allah any other god." }
      ]
    },
    {
      slug: "no-go-between-needed",
      title: "No go-between needed",
      line: "Even false gods would seek Allah, so worship Him directly.",
      facts: ["Allah is far above partners", "Call on Him alone"],
      quote: q17(42),
      source: ik(42, "If there were other gods, they themselves would worship Allah and seek to come close to Him. So worship Him alone: no one needs a go-between with Him.", "You have no need of a deity to be an intermediary between you and Him"),
      difficulty: 4,
      questions: [
        { q: "What would other gods seek, in 17:42?", a: "A way to the Lord of the Throne", wrong: ["Gold", "A kingdom", "Rest"], why: "If there had been other gods along with Him, they would certainly have sought out a way to the Lord of the Throne." },
        { q: "Do we need a go-between with Allah, per Ibn Kathir?", a: "No", wrong: ["Yes, always", "Only for big needs", "Only on Fridays"], why: "You have no need of a deity to be an intermediary between you and Him." },
        { q: "What does 17:43 say of Allah?", a: "Exalted high above what they say", wrong: ["He has a partner", "He sleeps", "He needs help"], why: "Glorified and Exalted is He high above what they say." }
      ]
    },
    {
      slug: "everything-praises-allah",
      title: "Everything praises Allah",
      line: "Heavens, earth and all within them glorify Allah's praise.",
      facts: ["We do not understand it", "Animals, plants and more"],
      quote: q17(44),
      source: ik(44, "Every created thing, animals, plants and even the inanimate, glorifies Allah in its own way, though people do not understand their praise.", "there is no created being that does not celebrate the praises of Allah"),
      difficulty: 3,
      questions: [
        { q: "What glorifies Allah, in 17:44?", a: "Everything", wrong: ["Only angels", "Only people", "Only birds"], why: "There is not a thing but glorifies His praise." },
        { q: "Why do we not understand their glorification?", a: "It is not like our languages", wrong: ["It is silent", "It is rare", "It is a secret code"], why: "You do not understand them, O mankind, because it is not like your languages." },
        { q: "Which names end 17:44?", a: "Forbearing, Oft-Forgiving", wrong: ["Mighty, Wise", "Hearing, Seeing", "Rich, Praised"], why: "Truly, He is Ever Forbearing, Oft-Forgiving." }
      ]
    },
    {
      slug: "the-food-glorified-allah",
      title: "The food glorified Allah",
      line: "The Companions heard food glorifying Allah as it was eaten.",
      facts: ["Water flowed from his fingers", "Blessing is from Allah"],
      quote: q17(44),
      source: hadith("bukhari", "3579", "Abdullah ibn Mas'ud", "Sahih", "On a journey short of water, the Prophet ﷺ put his hand in a little water and it flowed from between his fingers. Ibn Mas'ud said they heard the food glorifying Allah as it was eaten.", "we heard the meal glorifying Allah, when it was being eaten"),
      difficulty: 4,
      questions: [
        { q: "What did the Companions hear, in the hadith?", a: "The food glorifying Allah", wrong: ["Birds singing", "Thunder", "A far call"], why: "No doubt, we heard the meal glorifying Allah, when it was being eaten." },
        { q: "What flowed from between his ﷺ fingers?", a: "Water", wrong: ["Milk", "Honey", "Oil"], why: "I saw the water flowing from among the fingers of the Messenger ﷺ." },
        { q: "Whom did he ﷺ say the blessing was from?", a: "Allah", wrong: ["The water", "The travellers", "The town"], why: "Come to the blessed water, and the Blessing is from Allah." }
      ]
    },
    {
      slug: "who-will-bring-us-back",
      title: "Who will bring us back?",
      line: "The One who made you first will raise you again.",
      facts: ["Even stones or iron", "It may be near"],
      quote: q17(51),
      source: ik(51, "Deniers asked how dust and bones could live again. Allah says: even if you were stone or iron, He Who created you from nothing will bring you back.", "He Who created you when you were nothing"),
      difficulty: 3,
      questions: [
        { q: "Who will bring people back, in 17:51?", a: "He Who created you first", wrong: ["No one", "The angels alone", "Their families"], why: "Say: He Who created you first!" },
        { q: "What harder things are named in 17:50?", a: "Stones or iron", wrong: ["Wood or clay", "Water or air", "Sand or salt"], why: "Say: Be you stones or iron." },
        { q: "What should one say when asked when it will be?", a: "Perhaps it is near", wrong: ["Never", "In a thousand years", "Nobody cares"], why: "And say: When will that be? Say: Perhaps it is near!" }
      ]
    },
    {
      slug: "it-will-feel-short",
      title: "It will feel so short",
      line: "On rising, people will feel they stayed only a little while.",
      facts: ["Answering with His praise", "Life will seem brief"],
      quote: q17(52),
      source: ik(52, "On that Day Allah will call, and everyone will rise from the earth in obedience. Life in this world will then feel as if it lasted only a little while.", "you will all rise up in response to His command and in obedience to His will"),
      difficulty: 4,
      questions: [
        { q: "How will people answer the call, in 17:52?", a: "With His praise", wrong: ["With silence", "With laughter", "With refusal"], why: "On the Day when He will call you, and you will answer with (words of) His praise and obedience." },
        { q: "How long will life seem, in 17:52?", a: "A little while", wrong: ["A very long time", "Forever", "Exactly a year"], why: "And you will think that you have stayed (in this world) but a little while." },
        { q: "People will rise in obedience to His command, per Ibn Kathir.", tf: true, why: "You will all rise up in response to His command and in obedience to His will." }
      ]
    },
    {
      slug: "say-the-best-words",
      title: "Say the best words",
      line: "Speak with the best words, or Shaytan stirs up quarrels.",
      facts: ["Shaytan is a clear enemy", "Words can lead to fights"],
      quote: q17(53),
      source: ik(53, "Believers should speak to one another with the best and politest words. If not, Shaytan sows discord, words turn into actions, and quarrels break out.", "with the best and politest of words"),
      difficulty: 3,
      questions: [
        { q: "What words should believers say, in 17:53?", a: "The best words", wrong: ["Any words", "Few words", "Loud words"], why: "And say to My servants that they should say those words that are best." },
        { q: "What does Shaytan do with bad words, per Ibn Kathir?", a: "Sows discord", wrong: ["Stays away", "Brings peace", "Forgets them"], why: "Shaytan will sow discord among them, and words will lead to actions." },
        { q: "How is Shaytan described in 17:53?", a: "A plain enemy", wrong: ["A friend", "A teacher", "A helper"], why: "Surely, Shaytan is to man a plain enemy." }
      ]
    },
    {
      slug: "dawud-and-the-zabur",
      title: "Dawud and the Zabur",
      line: "Allah gave Dawud the Zabur, and made reciting it easy for him.",
      facts: ["Some Prophets given more", "He ate from his own work"],
      quote: q17(55),
      source: hadith("bukhari", "3417", "Abu Hurairah", "Sahih", "The Prophet ﷺ said reciting the Zabur was made easy for Dawud: he finished it while his riding animals were being saddled, and he ate only from the work of his own hands.", "would finish reciting the Zabur before they were saddled"),
      difficulty: 4,
      questions: [
        { q: "Which Book was given to Dawud, in 17:55?", a: "The Zabur", wrong: ["The Tawrah", "The Injil", "The Quran"], why: "And to Dawud We gave the Zabur." },
        { q: "When did Dawud finish reciting the Zabur?", a: "Before his animals were saddled", wrong: ["Over a whole year", "Only at night", "Never"], why: "He used to order that his riding animals be saddled, and would finish reciting the Zabur before they were saddled." },
        { q: "How did Dawud earn his food, in the hadith?", a: "From his own handiwork", wrong: ["From gifts", "From taxes", "From hunting only"], why: "And he would never eat except from the earnings of his manual work." }
      ]
    }
  ]
};

export const ISRA_UNITS: readonly DeepUnit[] = [ISRA_ONE, ISRA_TWO];
