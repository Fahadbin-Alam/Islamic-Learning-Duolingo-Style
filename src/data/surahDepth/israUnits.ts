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

export const ISRA_UNITS: readonly DeepUnit[] = [ISRA_ONE];
