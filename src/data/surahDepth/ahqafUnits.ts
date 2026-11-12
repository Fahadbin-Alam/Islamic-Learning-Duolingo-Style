import type { LessonSource } from "../../types";
import { hadith, quranQuote, saadi, type DeepUnit } from "../deepKit";

// Surah Ahqaf ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Ahqaf 46:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_46_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Ahqaf 46:${ayah}`,
    url: `https://quran.com/46:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 46:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q46 = (ayah: number) => quranQuote(46, ayah);

/** Ayahs 1 to 14: creation with truth, idols that cannot answer, a witness from the Children of Israel, and those who stand firm. */
const AHQAF_ONE: DeepUnit = {
  key: "ahqaf1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-46",
  name: "Al-Ahqaf, ayahs 1 to 14",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ahqaf",
  lessons: [
    {
      slug: "ha-mim-opens-ahqaf",
      title: "Ha Mim opens Al-Ahqaf",
      line: "Al-Ahqaf opens with Ha Mim, the last of the Ha Mim surahs.",
      facts: ["Al-Ahqaf means The Sand Dunes", "Named after 46:21"],
      quote: q46(1),
      source: ik(1, "Ibn Kathir says Allah tells us He revealed the Book to His servant and Messenger Muhammad.", "Allah informs that He has revealed the Book to His servant and Messenger Muhammad"),
      difficulty: 1,
      questions: [
        { q: "Which letters open Al-Ahqaf, in 46:1?", a: "Ha Mim", wrong: ["Alif Lam Mim", "Ta Sin", "Nun"], why: "The surah opens: Ha Mim." },
        { q: "What does Al-Ahqaf mean?", a: "The Sand Dunes", wrong: ["The Kneeling", "The Smoke", "The Rooms"], why: "Ahqaf is plural of Haqf; Ibn Zayd said it means a sand dune." },
        { tf: true, q: "Al-Ahqaf is the seventh and last surah opening with Ha Mim.", why: "Surahs 40 to 46 all open with Ha Mim, and Al-Ahqaf is 46." }
      ]
    },
    {
      slug: "the-book-from-the-wise",
      title: "The Book from the All-Wise",
      line: "The Book is sent down from Allah, the Almighty, the All-Wise.",
      facts: ["The same words as 45:2", "Allah is wise in word and deed"],
      quote: q46(2),
      source: ik(2, "Ibn Kathir says Allah describes Himself as having unimaginable glory and ultimate wisdom in His words and actions.", "possessing ultimate wisdom in His statements and actions"),
      difficulty: 1,
      questions: [
        { q: "From whom is the Book sent down, in 46:2?", a: "Allah, the Almighty, the All-Wise", wrong: ["A wise man", "The jinn", "A king"], why: "The revelation of the Book is from Allah, the Almighty, the All-Wise." },
        { q: "In what is Allah wise, per Ibn Kathir?", a: "His statements and actions", wrong: ["Only His actions", "Only in the past", "Nothing"], why: "Possessing ultimate wisdom in His statements and actions." },
        { tf: true, q: "Al-Jathiyah 45:2 and Al-Ahqaf 46:2 say the same words.", why: "Both say the revelation of the Book is from Allah, the Almighty, the All-Wise." }
      ]
    },
    {
      slug: "created-for-a-set-term",
      title: "Created for a set term",
      line: "Heaven and earth were made with truth and for a fixed term.",
      facts: ["Not made for idle play", "The term will not grow or shrink"],
      quote: q46(3),
      source: ik(3, "Ibn Kathir says Allah did not create them in idle play, and they last for a fixed duration that will not increase or decrease.", "not in idle play and falsehood"),
      difficulty: 2,
      questions: [
        { q: "How were the heavens and earth made, in 46:3?", a: "With truth, for a set term", wrong: ["For play", "By chance", "Forever with no end"], why: "We created not the heavens and the earth except with truth, and for a specified term." },
        { q: "What does the set term mean, per Ibn Kathir?", a: "A fixed time that will not change", wrong: ["Any length", "A guess", "No end at all"], why: "For a fixed and specified duration that will not increase or decrease." },
        { tf: true, q: "Those who disbelieve turn away from the warning.", why: "But those who disbelieve, turn away from that whereof they are warned." }
      ]
    },
    {
      slug: "what-have-idols-created",
      title: "What have idols created?",
      line: "Show me one thing on earth that your idols have created.",
      facts: ["They own nothing at all", "Not even a date seed skin"],
      quote: q46(4),
      source: ik(4, "Ibn Kathir says they are not partners in anything in the heavens or earth, and do not own even the thin skin on a date seed.", "They do not own even the thin membrane covering a date"),
      difficulty: 2,
      questions: [
        { q: "What challenge is given in 46:4?", a: "Show what the idols created", wrong: ["Build a tower", "Count the stars", "Cross the sea"], why: "Show me what have they created of the earth?" },
        { q: "What do idols not own, per Ibn Kathir?", a: "Even a date seed's thin skin", wrong: ["Only gold", "Only the sky", "Only rivers"], why: "They do not own even the thin membrane covering a date's pit." },
        { q: "What proof are they asked to bring, in 46:4?", a: "A scripture or trace of knowledge", wrong: ["A sword", "A crown", "A camel"], why: "Bring me a scripture prior to this or some trace of knowledge, if you are truthful!" }
      ]
    },
    {
      slug: "no-proof-for-shirk",
      title: "No proof for shirk",
      line: "No book and no sound reason ever told people to worship idols.",
      facts: ["No proof from revelation", "No proof from reason"],
      quote: q46(4),
      source: ik(4, "Ibn Kathir says they have absolutely no evidence, neither from revelation nor from reason.", "neither textual"),
      difficulty: 3,
      questions: [
        { q: "What evidence do idol worshippers have, per Ibn Kathir?", a: "None at all", wrong: ["Many books", "Strong reason", "A prophet's order"], why: "You have absolutely no evidence for that, neither textual nor rational." },
        { q: "What does trace of knowledge mean, per Mujahid?", a: "Knowledge inherited from before", wrong: ["Footprints in sand", "Old coins", "A map"], why: "Or anyone who has inherited any knowledge." },
        { tf: false, q: "An earlier scripture commanded worshipping idols.", why: "They are asked to bring a book from the Books of Allah that commands idol worship, and they cannot." }
      ]
    },
    {
      slug: "who-is-more-astray",
      title: "Who is more astray?",
      line: "None is more lost than one calling what cannot answer.",
      facts: ["Idols cannot hear or see", "Only Allah answers prayers"],
      quote: q46(5),
      source: ik(5, "Ibn Kathir says no one is more misguided than those who call on idols instead of Allah, which can neither hear, see nor act.", "they can neither hear, see, or act"),
      difficulty: 2,
      questions: [
        { q: "Until when will idols not answer, in 46:5?", a: "Until the Day of Resurrection", wrong: ["Until tomorrow", "Until Ramadan", "Until noon"], why: "Others who will not answer them until the Day of Resurrection." },
        { q: "What can idols do, per Ibn Kathir?", a: "Nothing: not hear, see or act", wrong: ["Hear only", "See only", "Give rain"], why: "They can neither hear, see, or act." },
        { tf: true, q: "Idols are unaware of the prayers made to them.", why: "And who are unaware of their invocations to them." }
      ]
    },
    {
      slug: "false-gods-become-enemies",
      title: "False gods become enemies",
      line: "On the Last Day, false gods will deny being worshipped.",
      facts: ["They betray when most needed", "Like 19:81-82"],
      quote: q46(6),
      source: ik(6, "Ibn Kathir says the false gods will betray their worshippers when they need them the most.", "they will betray them when they need them the most"),
      difficulty: 2,
      questions: [
        { q: "What will false gods become, in 46:6?", a: "Enemies of their worshippers", wrong: ["Their helpers", "Their kings", "Their friends"], why: "They (false deities) will become their enemies." },
        { q: "What will false gods deny, in 46:6?", a: "Being worshipped", wrong: ["Being made", "Being old", "Being stone"], why: "And will deny their worship." },
        { tf: true, q: "False gods betray people just when they are most needed.", why: "They will betray them when they need them the most." }
      ]
    },
    {
      slug: "they-called-it-magic",
      title: "They called it magic",
      line: "Hearing clear ayahs, the deniers said: this is plain magic.",
      facts: ["They lied about the Quran", "Truth reached them, and they refused"],
      quote: q46(7),
      source: ik(7, "Ibn Kathir says in this claim they lied, invented falsehood, went astray and disbelieved.", "they have lied, invented a falsehood, went astray and disbelieved"),
      difficulty: 1,
      questions: [
        { q: "What did deniers call the ayahs, in 46:7?", a: "Plain magic", wrong: ["Poetry", "A song", "A riddle"], why: "This is plain magic!" },
        { q: "When did they say it, in 46:7?", a: "When the truth reached them", wrong: ["Before hearing it", "In a dream", "Never"], why: "The disbelievers say of the truth when it reaches them." },
        { tf: false, q: "Ibn Kathir says their claim of magic was honest.", why: "They have lied, invented a falsehood, went astray and disbelieved." }
      ]
    },
    {
      slug: "allah-is-sufficient-witness",
      title: "Allah is enough as witness",
      line: "Had he made it up, none could shield him from Allah.",
      facts: ["Allah knows what they say", "He is Forgiving, Merciful"],
      quote: q46(8),
      source: ik(8, "Ibn Kathir says if he had lied against Allah, no one on earth could protect him from Allah's punishment.", "No one on the earth"),
      difficulty: 3,
      questions: [
        { q: "What did deniers claim, in 46:8?", a: "He fabricated it", wrong: ["He copied a poet", "He found it in a cave", "He bought it"], why: "Or say they: He has fabricated it." },
        { q: "Who is enough as a witness, in 46:8?", a: "Allah", wrong: ["The people", "A judge", "No one"], why: "Sufficient is He as a witness between me and you!" },
        { q: "Why does 46:8 end with Forgiving, Merciful?", a: "To invite them to repent", wrong: ["To scare them away", "To end the talk", "For rhyme only"], why: "This is an encouragement for them to repent and turn to Allah." }
      ]
    },
    {
      slug: "not-a-new-messenger",
      title: "Not a new Messenger",
      line: "The Prophet ﷺ was not the first Messenger. Many came before him.",
      facts: ["He follows only revelation", "A clear warner"],
      quote: q46(9),
      source: ik(9, "Ibn Kathir says the Prophet ﷺ was not the first Messenger, for many Messengers came before him to the nations.", "I am not the first Messenger who ever came to the world"),
      difficulty: 2,
      questions: [
        { q: "What does 46:9 say he is not?", a: "A new thing among the Messengers", wrong: ["A human", "A warner", "A believer"], why: "Say: I am not a new thing among the Messengers." },
        { q: "What does he follow, in 46:9?", a: "Only what is revealed to him", wrong: ["His own wishes", "Old poems", "The crowd"], why: "I only follow that which is revealed to me." },
        { tf: true, q: "The Prophet ﷺ called himself a plain warner.", why: "And I am but a plain warner." }
      ]
    },
    {
      slug: "a-witness-from-israel",
      title: "A witness from Bani Israel",
      line: "A witness from the Children of Israel testified and believed.",
      facts: ["Earlier books foretold it", "Many say: Abdullah ibn Salam"],
      quote: q46(10),
      source: ik(10, "Ibn Kathir says the earlier scriptures all testify to the truth of the Quran, and the witness includes Abdullah ibn Salam and others.", "The witness here refers to any witness in general"),
      difficulty: 3,
      questions: [
        { q: "Who testified, in 46:10?", a: "A witness from the Children of Israel", wrong: ["A Roman king", "A jinn", "A poet"], why: "A witness from among the Children of Israel has testified to something similar and believed." },
        { q: "What did the witness do, in 46:10?", a: "Believed", wrong: ["Mocked", "Ran away", "Stayed silent"], why: "And believed while you rejected the truth!" },
        { tf: true, q: "Ibn Kathir says earlier scriptures testify to the Quran.", why: "The previous Scriptures that were revealed to the Prophets before me all testify to its truthfulness." }
      ]
    },
    {
      slug: "abdullah-ibn-salam",
      title: "Abdullah ibn Salam",
      line: "The Prophet ﷺ named Abdullah ibn Salam a man of Paradise.",
      facts: ["A former rabbi of Madinah", "46:10 was revealed about him"],
      quote: q46(10),
      source: hadith("bukhari", "3812", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said he never heard the Prophet ﷺ say of anyone walking on earth that he is of Paradise except Abdullah ibn Salam, and 46:10 was revealed about him.", "The following Verse was revealed concerning him"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Prophet ﷺ call of Paradise, per Bukhari 3812?", a: "Abdullah ibn Salam", wrong: ["Abu Lahab", "A king of Rome", "A poet"], why: "Except Abdullah bin Salam." },
        { q: "Who narrates Bukhari 3812?", a: "Sa'd ibn Abi Waqqas", wrong: ["Abu Hurairah", "Aishah", "Anas"], why: "Narrated Sa'd bin Abi Waqqas." },
        { q: "Which ayah was revealed about him, per Sa'd?", a: "46:10", wrong: ["46:1", "46:35", "46:29"], why: "And a witness from the children of Israel testifies that this Quran is true." }
      ]
    },
    {
      slug: "if-it-were-good",
      title: "If it were good, they said",
      line: "The proud said: were it good, the weak would not be first.",
      facts: ["Bilal, Ammar, Suhayb, Khabbab", "Allah honors the humble"],
      quote: q46(11),
      source: ik(11, "Ibn Kathir says by the weak they meant Bilal, Ammar, Suhayb, Khabbab and others like them, and the pagans thought they held a high status with Allah.", "By that, they meant Bilal"),
      difficulty: 3,
      questions: [
        { q: "What did the deniers say, in 46:11?", a: "The poor would not have beaten us to it", wrong: ["We love the poor", "We were first", "We agree"], why: "Had it been a good thing, they would not have preceded us to it!" },
        { q: "Whom did they mean, per Ibn Kathir?", a: "Bilal, Ammar, Suhayb, Khabbab", wrong: ["Kings of Persia", "Their own chiefs", "The angels"], why: "By that, they meant Bilal, Ammar, Suhayb, Khabbab." },
        { q: "What did they call the Quran, in 46:11?", a: "Ancient falsehood", wrong: ["New wisdom", "A gift", "A song"], why: "They say: This is ancient falsehood!" }
      ]
    },
    {
      slug: "what-pride-really-is",
      title: "What pride really is",
      line: "Pride is rejecting truth and looking down on people.",
      facts: ["Allah is Beautiful, loves beauty", "Nice clothes are not pride"],
      quote: q46(11),
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "The Prophet ﷺ said Allah is Graceful and loves grace; pride is disdaining the truth and looking down on people.", "Pride is disdaining the truth"),
      difficulty: 3,
      questions: [
        { q: "What is pride, per Muslim 91?", a: "Rejecting truth, looking down on people", wrong: ["Wearing nice clothes", "Good shoes", "Being clean"], why: "Pride is disdaining the truth and contempt for the people." },
        { q: "Is liking nice clothes pride, per Muslim 91?", a: "No, Allah loves grace", wrong: ["Yes, always", "Only on Eid", "Only for men"], why: "Verily, Allah is Graceful and He loves Grace." },
        { q: "How does Ibn Kathir link it to 46:11?", a: "They belittled the Quran and its people", wrong: ["They loved the poor", "They praised Bilal", "They read the Quran"], why: "Thereby belittling the Quran and its followers. This is clear arrogance." }
      ]
    },
    {
      slug: "the-book-of-musa-before",
      title: "The Book of Musa before",
      line: "Before the Quran came the Tawrah, a guide and mercy.",
      facts: ["The Quran confirms earlier books", "Warning and glad tidings"],
      quote: q46(12),
      source: ik(12, "Ibn Kathir says the Scripture of Musa was the Tawrah, and the Quran confirms the books before it, in clear Arabic.", "and it was the Tawrah"),
      difficulty: 2,
      questions: [
        { q: "What came before the Quran, in 46:12?", a: "The Scripture of Musa", wrong: ["The Zabur only", "Nothing", "Greek books"], why: "And before this was the Scripture of Musa as a guide and a mercy." },
        { q: "In what tongue is the Quran, in 46:12?", a: "Arabic", wrong: ["Hebrew", "Greek", "Persian"], why: "And this is a Book confirming in the Arabic tongue." },
        { q: "Whom does the Quran give glad tidings, in 46:12?", a: "The doers of good", wrong: ["The proud", "The idle", "The liars"], why: "To warn those who do wrong, and as glad tidings for the doers of good." }
      ]
    },
    {
      slug: "say-allah-then-stand-firm",
      title: "Say Allah, then stand firm",
      line: "Say our Lord is Allah, stay firm, and have no fear.",
      facts: ["No fear for what is ahead", "No grief for what is left"],
      quote: q46(13),
      source: ik(13, "Ibn Kathir says no fear concerns their future, and no grief concerns what they left behind.", "meaning, over what they have left behind"),
      difficulty: 2,
      questions: [
        { q: "What do they say, in 46:13?", a: "Our Lord is Allah", wrong: ["We are rich", "We are strong", "We are first"], why: "Verily, those who say: Our Lord is only Allah, and thereafter stand firm." },
        { q: "What is promised to them, in 46:13?", a: "No fear and no grief", wrong: ["Gold on earth", "Fame", "Long life"], why: "On them shall be no fear, nor shall they grieve." },
        { tf: true, q: "Ibn Kathir says they will not grieve over what they left behind.", why: "Nor shall they grieve, meaning, over what they have left behind." }
      ]
    },
    {
      slug: "believe-then-be-steadfast",
      title: "Believe, then be steadfast",
      line: "The Prophet ﷺ said: say I believe in Allah, then stand firm.",
      facts: ["Short words, deep meaning", "Matches 46:13 and 41:30"],
      quote: q46(13),
      source: hadith("muslim", "38", "Sufyan ibn Abdullah ath-Thaqafi", "Sahih", "Sufyan asked for one thing about Islam he need never ask anyone else, and the Prophet ﷺ said: say I believe in Allah, then remain steadfast.", "Say I affirm my faith in Allah and then remain steadfast to it"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ tell Sufyan, per Muslim 38?", a: "Say I believe in Allah, then stand firm", wrong: ["Travel far", "Stay silent", "Give up work"], why: "Say I affirm my faith in Allah and then remain steadfast to it." },
        { q: "Which ayah carries the same idea?", a: "46:13", wrong: ["46:7", "46:24", "46:1"], why: "Those who say: Our Lord is Allah, and thereafter stand firm." },
        { tf: true, q: "Sufyan wanted advice he would never need to ask anyone else about.", why: "Tell me about Islam a thing which might dispense with the necessity of my asking anybody after you." }
      ]
    },
    {
      slug: "dwellers-of-paradise",
      title: "Dwellers of Paradise",
      line: "The firm in faith live in Paradise forever, a reward.",
      facts: ["Deeds are a cause", "Allah's mercy surrounds them"],
      quote: q46(14),
      source: ik(14, "Ibn Kathir says their deeds are a cause for attaining Allah's mercy and being surrounded by it.", "the deeds are a cause for their attaining the mercy"),
      difficulty: 2,
      questions: [
        { q: "Where will they dwell, in 46:14?", a: "In Paradise, forever", wrong: ["In a palace for a year", "On a mountain", "In the sea"], why: "Such shall be the dwellers of Paradise, abiding therein forever." },
        { q: "Why are they rewarded, in 46:14?", a: "For what they used to do", wrong: ["For their wealth", "For their family name", "For nothing"], why: "A reward for what they used to do." },
        { tf: true, q: "Ibn Kathir says deeds are a cause for reaching Allah's mercy.", why: "The deeds are a cause for their attaining the mercy." }
      ]
    }
  ]
};

/** Ayahs 15 to 25: kindness to parents, the dua at forty, the child who says uff, and the wind that came on 'Ad. */
const AHQAF_TWO: DeepUnit = {
  key: "ahqaf2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-46",
  name: "Al-Ahqaf, ayahs 15 to 25",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ahqaf",
  lessons: [
    {
      slug: "be-kind-to-parents",
      title: "Be kind to your parents",
      line: "Allah commands us to treat our parents well, with compassion.",
      facts: ["Worship Allah, then honor parents", "Like 17:23 and 31:14"],
      quote: q46(15),
      source: ik(15, "Ibn Kathir says Allah commanded us to treat them well and show compassion towards them, right after His command to worship Him alone.", "We have commanded him to treat them well and show compassion towards them"),
      difficulty: 1,
      questions: [
        { q: "What has Allah enjoined on man, in 46:15?", a: "Kindness to his parents", wrong: ["Travel", "Trade", "Silence"], why: "And We have enjoined on man to be dutiful and kind to his parents." },
        { q: "What comes before parents in many ayahs?", a: "Worshipping Allah alone", wrong: ["Making money", "Building homes", "Hunting"], why: "Your Lord has decreed that you worship none but Him, and that you be dutiful to your parents (17:23)." },
        { tf: true, q: "Ibn Kathir says we must show compassion to parents.", why: "We have commanded him to treat them well and show compassion towards them." }
      ]
    },
    {
      slug: "your-mother-three-times",
      title: "Your mother, three times",
      line: "Who deserves our kindness most? The Prophet ﷺ said: your mother.",
      facts: ["Mother three times, then father", "Honor both parents"],
      quote: q46(15),
      source: hadith("bukhari", "5971", "Abu Hurairah", "Sahih", "A man asked who most deserves his good company. The Prophet ﷺ said your mother three times, then your father.", "Who is more entitled to be treated with the best companionship by me"),
      difficulty: 2,
      questions: [
        { q: "How many times did the Prophet ﷺ say your mother?", a: "Three", wrong: ["One", "Two", "Four"], why: "Your mother, your mother, your mother, then your father." },
        { q: "Who came fourth, per Bukhari 5971?", a: "Your father", wrong: ["Your friend", "Your neighbor", "Your teacher"], why: "The man asked for the fourth time, and the Prophet ﷺ said: Your father." },
        { q: "Which ayah tells of a mother's hardship?", a: "46:15", wrong: ["46:1", "46:29", "46:35"], why: "His mother bears him with hardship. And she delivers him with hardship." }
      ]
    },
    {
      slug: "a-mothers-hardship",
      title: "A mother's hardship",
      line: "A mother carries her child in hardship and births in pain.",
      facts: ["Tiredness, sickness, heaviness", "Remember her care"],
      quote: q46(15),
      source: ik(15, "Ibn Kathir lists the hardship of carrying a child: fatigue, sickness, heaviness and distress, then the pains of labor.", "such as fatigue, sickness, vomiting, heaviness, distress"),
      difficulty: 2,
      questions: [
        { q: "How does a mother carry her child, in 46:15?", a: "With hardship", wrong: ["With ease", "With no effort", "With joy only"], why: "His mother bears him with hardship." },
        { q: "Which hardship does Ibn Kathir list?", a: "Fatigue and heaviness", wrong: ["Boredom only", "Nothing", "Hunger for gold"], why: "Such as fatigue, sickness, vomiting, heaviness, distress." },
        { tf: true, q: "Giving birth is also named a hardship in 46:15.", why: "And she delivers him with hardship." }
      ]
    },
    {
      slug: "thirty-months",
      title: "Thirty months",
      line: "Carrying and weaning a child together take thirty months.",
      facts: ["Weaning in two years (31:14)", "Thirty minus 24 leaves six"],
      quote: q46(15),
      source: ik(15, "Ibn Kathir says Ali used 46:15 with 31:14 and 2:233 to show the shortest pregnancy is six months, and Uthman and other Companions agreed.", "the minimum period of pregnancy"),
      difficulty: 3,
      questions: [
        { q: "How long are carrying and weaning, in 46:15?", a: "Thirty months", wrong: ["Ten months", "Two months", "Fifty months"], why: "His gestation and the weaning of him is thirty months." },
        { q: "How long is full nursing, in 2:233?", a: "Two complete years", wrong: ["One year", "Three years", "Six months"], why: "The mothers suckle their children two complete years." },
        { q: "What did Ali learn from 46:15 and 2:233?", a: "The shortest pregnancy is six months", wrong: ["Babies need no milk", "Nine months is the least", "Nothing"], why: "Thirty months minus two years leaves six months, the minimum period of pregnancy." }
      ]
    },
    {
      slug: "the-dua-at-forty",
      title: "The dua at forty",
      line: "At forty, a believer asks Allah to make him thankful and good.",
      facts: ["Forty is full maturity", "Renew repentance at forty"],
      quote: q46(15),
      source: ik(15, "Ibn Kathir says this teaches anyone who reaches forty to renew his repentance and turn to Allah with strong resolve.", "renew his repentance and turn to Allah with strong resolution"),
      difficulty: 2,
      questions: [
        { q: "At what age is the dua in 46:15?", a: "Forty years", wrong: ["Ten years", "Twenty years", "Seventy years"], why: "Till when he attains full strength and reaches forty years." },
        { q: "What does he ask for his offspring?", a: "That they be made good", wrong: ["That they be rich", "That they be famous", "Nothing"], why: "And make my offspring good." },
        { q: "For whose favor is he thankful, in 46:15?", a: "On him and his parents", wrong: ["Only on himself", "On his enemies", "On no one"], why: "That I may be grateful for Your favor which You have bestowed upon me and upon my parents." }
      ]
    },
    {
      slug: "blessings-on-parents",
      title: "Blessings on parents",
      line: "Blessings given to parents are blessings on their children too.",
      facts: ["As-Sa'di explains", "Shukr"],
      quote: q46(15),
      source: saadi(46, 15, "As-Sa'di says the child at forty thanks Allah for blessings on his parents too, because blessings on parents reach their children; and thanks means using blessings to obey the Giver.", "والنعم على الوالدين نعم على أولادهم وذريتهم"),
      difficulty: 2,
      questions: [
        { q: "Why thank Allah for blessings on your parents, per as-Sa'di?", a: "They reach the children too", wrong: ["Parents ask for it", "It is a custom", "No reason"], why: "Blessings on parents are blessings on their children, says as-Sa'di." },
        { q: "How do we truly thank Allah for a blessing?", a: "Use it to obey Him", wrong: ["Hide it", "Boast about it", "Waste it"], why: "Thanks is using blessings in obeying the One who gave them." },
        { tf: true, q: "Parents carry and nurse a child for a long time, not an hour or two.", why: "As-Sa'di on 46:15." }
      ]
    },
    {
      slug: "best-deeds-accepted",
      title: "Best deeds accepted",
      line: "Allah accepts their best deeds and overlooks their faults.",
      facts: ["Repentance opens the door", "A true promise"],
      quote: q46(16),
      source: ik(16, "Ibn Kathir says those who repent and seek forgiveness will have the best of their deeds accepted and many errors forgiven.", "Many of their errors will be forgiven"),
      difficulty: 2,
      questions: [
        { q: "What does Allah accept from them, in 46:16?", a: "The best of their deeds", wrong: ["Only big deeds", "Nothing", "Only gold"], why: "We shall accept the best of their deeds." },
        { q: "What does Allah do with their faults, in 46:16?", a: "Overlooks them", wrong: ["Doubles them", "Shows them to all", "Writes them twice"], why: "And overlook their evil deeds." },
        { tf: true, q: "46:16 calls it a promise of truth.", why: "That is a promise of truth that they had been promised." }
      ]
    },
    {
      slug: "the-child-who-says-uff",
      title: "The child who says uff",
      line: "A child tells his parents uff and mocks the Resurrection.",
      facts: ["Parents pray for his guidance", "Uff is a word of disrespect"],
      quote: q46(17),
      source: ik(17, "Ibn Kathir says this is a general description of anyone who says uff to his parents, and they ask Allah to guide him.", "it is a general description applying to anyone who says it to his parents"),
      difficulty: 2,
      questions: [
        { q: "What does the child say to his parents, in 46:17?", a: "Uff to you", wrong: ["Thank you", "Peace be on you", "I love you"], why: "But he who says to his parents: Uff to you!" },
        { q: "What do his parents do, in 46:17?", a: "Ask Allah to help and guide him", wrong: ["Ignore him", "Leave home", "Laugh"], why: "While they invoke Allah for help: Woe to you! Believe!" },
        { q: "Whom does uff in 46:17 describe, per Ibn Kathir?", a: "Anyone who says it to parents", wrong: ["Only one man", "Only kings", "No one now"], why: "It is a general description applying to anyone who says it to his parents." }
      ]
    },
    {
      slug: "legends-of-the-ancients",
      title: "Legends of the ancients",
      line: "He calls Allah's promise old legends and denies rising again.",
      facts: ["Others passed and did not return", "Allah's promise is true"],
      quote: q46(17),
      source: ik(17, "Ibn Kathir says he argues that generations have passed away and none returned, so he denies being resurrected.", "none of them has ever returned to tell"),
      difficulty: 3,
      questions: [
        { q: "What does the child deny, in 46:17?", a: "Being raised up again", wrong: ["Being hungry", "Being young", "Being tired"], why: "Do you promise me that I will be raised up when generations before me have passed?" },
        { q: "What do the parents say Allah's promise is?", a: "True", wrong: ["A legend", "A guess", "A joke"], why: "Believe! Verily, the promise of Allah is true." },
        { q: "What does he call it, in 46:17?", a: "Legends of the ancient", wrong: ["New news", "Wise advice", "A gift"], why: "This is nothing but the legends of the ancient." }
      ]
    },
    {
      slug: "the-losers",
      title: "Ever the losers",
      line: "They join the losing nations of jinn and mankind before.",
      facts: ["Undutiful and denying", "Al-Hasan and Qatadah explain"],
      quote: q46(18),
      source: ik(18, "Al-Hasan and Qatadah said it applies to the disbelieving, sinful person who is undutiful to his parents and denies the Resurrection.", "This applies to the disbelieving, sinful person who is undutiful to his parents"),
      difficulty: 3,
      questions: [
        { q: "Among whom are they counted, in 46:18?", a: "Past nations of jinn and mankind", wrong: ["The angels", "The prophets", "The martyrs"], why: "Among the previous generations of Jinn and mankind that have passed away." },
        { q: "What are they called at the end of 46:18?", a: "The losers", wrong: ["The winners", "The patient", "The wise"], why: "Verily, they are ever the losers." },
        { tf: true, q: "Al-Hasan says it applies to one undutiful to parents who denies the Resurrection.", why: "This applies to the disbelieving, sinful person who is undutiful to his parents and who denies resurrection." }
      ]
    },
    {
      slug: "degrees-for-all",
      title: "Degrees for everyone",
      line: "Each person gets a level matching his deeds, with no wrong.",
      facts: ["Paradise levels rise", "Fire levels descend"],
      quote: q46(19),
      source: ik(19, "Abdur-Rahman ibn Zayd said the levels of the Fire go down and the levels of Paradise go up.", "The levels of the Fire descend, and those of Paradise ascend"),
      difficulty: 2,
      questions: [
        { q: "What will there be for all, in 46:19?", a: "Degrees by what they did", wrong: ["The same reward", "Nothing", "Random places"], why: "For all, there will be degrees according to that which they did." },
        { q: "Which way do Paradise's levels go?", a: "Up", wrong: ["Down", "Sideways", "Nowhere"], why: "The levels of the Fire descend, and those of Paradise ascend." },
        { tf: true, q: "No one will be wronged, even by a speck of dust.", why: "Allah will not be unjust to them even in the amount of a speck of dust or less." }
      ]
    },
    {
      slug: "umar-and-the-good-things",
      title: "Umar and the good things",
      line: "Umar held back from luxuries, fearing to use up his reward.",
      facts: ["You received your good things", "Thankful, simple living"],
      quote: q46(20),
      source: ik(20, "Ibn Kathir says Umar ibn al-Khattab gave up many joys of food and drink, fearing to be like those blamed in 46:20.", "gave up many of the joys of food and drink"),
      difficulty: 3,
      questions: [
        { q: "What is said to deniers, in 46:20?", a: "You took your good things in the world", wrong: ["Your reward waits", "You did well", "Enter in peace"], why: "You received your good things in the life of the world, and you took your pleasure therein." },
        { q: "What did Umar give up, per Ibn Kathir?", a: "Many joys of food and drink", wrong: ["Prayer", "Fasting", "Charity"], why: "Gave up many of the joys of food and drink." },
        { q: "Why were they humiliated, in 46:20?", a: "Arrogance and rebellion", wrong: ["Hunger", "Bad luck", "Being poor"], why: "Because you were arrogant upon the earth without a right, and because you used to rebel." }
      ]
    },
    {
      slug: "the-brother-of-ad",
      title: "The brother of 'Ad",
      line: "Hud warned his people, 'Ad, who lived among the sand dunes.",
      facts: ["Ahqaf: sand dunes", "'Ad lived in Yemen, at Ash-Shihr"],
      quote: q46(21),
      source: ik(21, "Ibn Kathir says the brother of 'Ad is Hud, sent to the first people of 'Ad who lived in Al-Ahqaf, a land of sand dunes in Yemen.", "This refers to Hud"),
      difficulty: 1,
      questions: [
        { q: "Who is the brother of 'Ad, in 46:21?", a: "Hud", wrong: ["Salih", "Shu'ayb", "Lut"], why: "And remember the brother of 'Ad: this refers to Hud." },
        { q: "Where did 'Ad live?", a: "Al-Ahqaf, the sand dunes", wrong: ["Egypt", "Rome", "Makkah"], why: "When he warned his people in Al-Ahqaf." },
        { q: "What was Hud's message, in 46:21?", a: "Worship none but Allah", wrong: ["Build more towers", "Leave your homes", "Fight your neighbors"], why: "Worship none but Allah; truly, I fear for you the torment of a mighty Day." }
      ]
    },
    {
      slug: "warners-before-and-after",
      title: "Warners before and after",
      line: "Other warners came before and after Hud with the same call.",
      facts: ["One message: worship Allah", "Like 41:13-14"],
      quote: q46(21),
      source: ik(21, "Ibn Kathir says Allah sent Messengers and warners to the towns around the land of 'Ad.", "Allah had sent Messengers and warners to the towns surrounding the land of"),
      difficulty: 2,
      questions: [
        { q: "Did warners come only to 'Ad?", a: "No, before and after Hud too", wrong: ["Yes, only to 'Ad", "None ever came", "Only after Isa"], why: "Warners had already passed on before him and after him." },
        { q: "Where did Allah send them, per Ibn Kathir?", a: "To towns around 'Ad", wrong: ["Only to Rome", "Only to India", "To the moon"], why: "Allah had sent Messengers and warners to the towns surrounding the land of 'Ad." },
        { tf: true, q: "All warners called people to worship Allah alone.", why: "Worship none but Allah." }
      ]
    },
    {
      slug: "bring-what-you-promise",
      title: "Bring it on, they said",
      line: "'Ad dared Hud: bring the punishment, if you are truthful.",
      facts: ["They thought it would never come", "Only Allah knows when"],
      quote: q46(22),
      source: ik(22, "Ibn Kathir says they sought to hasten Allah's punishment, believing it would not happen.", "believing that it will not happen"),
      difficulty: 2,
      questions: [
        { q: "What did 'Ad accuse Hud of, in 46:22?", a: "Turning them from their gods", wrong: ["Stealing", "Lying about rain", "Being rich"], why: "Have you come to delude us from our gods?" },
        { q: "What did they demand, in 46:22?", a: "Bring the threatened punishment", wrong: ["Bring food", "Bring a king", "Bring water"], why: "Then bring us that with which you threaten us, if you are one of the truthful!" },
        { tf: true, q: "They asked for the punishment because they did not believe it would come.", why: "They sought to hasten Allah's torment and punishment, believing that it will not happen." }
      ]
    },
    {
      slug: "knowledge-is-with-allah",
      title: "Knowledge is with Allah",
      line: "Hud said: only Allah knows when; I deliver the message.",
      facts: ["A prophet conveys", "Allah decides the timing"],
      quote: q46(23),
      source: ik(23, "Ibn Kathir says Hud meant: Allah knows best about you, and my duty is to deliver my message to you.", "my duty is to deliver my message to you"),
      difficulty: 2,
      questions: [
        { q: "With whom is the knowledge, in 46:23?", a: "Allah only", wrong: ["Hud", "The stars", "The chiefs"], why: "The knowledge of that is only with Allah." },
        { q: "What was Hud's duty, per Ibn Kathir?", a: "To deliver his message", wrong: ["To punish them", "To rule them", "To hide"], why: "As for me, my duty is to deliver my message to you." },
        { q: "How did Hud describe his people, in 46:23?", a: "A people given to ignorance", wrong: ["A wise people", "A kind people", "A thankful people"], why: "But I see that you are a people given to ignorance!" }
      ]
    },
    {
      slug: "a-cloud-they-misread",
      title: "A cloud they misread",
      line: "'Ad cheered at a cloud, hoping for rain, but it held wind.",
      facts: ["They had a drought", "Never feel safe from Allah's plan"],
      quote: q46(24),
      source: ik(24, "Ibn Kathir says when they saw the punishment coming, they thought it was a rain cloud and were happy, because they had a drought.", "they thought it to be clouds full of rain"),
      difficulty: 2,
      questions: [
        { q: "What did 'Ad think the cloud was, in 46:24?", a: "A cloud bringing rain", wrong: ["Smoke", "Birds", "Dust"], why: "They said: This is a cloud bringing us rain!" },
        { q: "Why were they glad, per Ibn Kathir?", a: "They had a drought", wrong: ["They loved storms", "It was Eid", "They were bored"], why: "That made them happy and joyful, because they had a drought and needed rain." },
        { q: "What was it really, in 46:24?", a: "A wind with a painful torment", wrong: ["Gentle rain", "Snow", "Nothing"], why: "Nay, but it is a wind wherein is a painful torment." }
      ]
    },
    {
      slug: "worry-at-the-clouds",
      title: "Worry at the clouds",
      line: "The Prophet ﷺ grew uneasy at clouds, recalling 'Ad.",
      facts: ["He mostly smiled", "Hope and fear together"],
      quote: q46(24),
      source: hadith("bukhari", "4829", "Aishah", "Sahih", "Aishah said whenever the Prophet ﷺ saw clouds or wind, concern showed on his face, because some people were punished with wind while thinking it a rain cloud.", "since some people were punished with a wind"),
      difficulty: 3,
      questions: [
        { q: "What showed on his face at clouds, per Bukhari 4829?", a: "Deep concern", wrong: ["Laughter", "Anger at people", "Nothing"], why: "Whenever he saw clouds or winds, signs of deep concern would appear on his face." },
        { q: "Why was he concerned?", a: "Some people were punished with wind", wrong: ["He disliked rain", "He was cold", "He was tired"], why: "Since some people were punished with a wind." },
        { tf: true, q: "Aishah said he mostly smiled rather than laughed loudly.", why: "I never saw him laughing loudly enough to see his uvula, but he used to smile only." }
      ]
    },
    {
      slug: "dua-when-the-wind-blows",
      title: "Dua when the wind blows",
      line: "In strong wind, ask Allah for its good, and refuge from harm.",
      facts: ["Ask for the good it brings", "Rain is a mercy"],
      quote: q46(25),
      source: hadith("muslim", "899b", "Aishah", "Sahih", "When the wind was stormy the Prophet ﷺ said: O Allah, I ask You for its good, and seek refuge with You from its evil.", "I ask Thee for what is good in it, and the good which it contains"),
      difficulty: 2,
      questions: [
        { q: "What did he ask for in a storm, per Muslim 899?", a: "The good in the wind", wrong: ["Only shelter", "Nothing", "That it never stops"], why: "O Allah! I ask Thee for what is good in it, and the good which it contains." },
        { q: "What did he seek refuge from?", a: "Its evil", wrong: ["Its coolness", "Its sound", "Its color"], why: "I seek refuge with Thee from what is evil in it." },
        { q: "What did he call rain when it fell?", a: "A mercy", wrong: ["A test", "A loss", "A warning"], why: "When he saw rainfall he said: It is the mercy of Allah." }
      ]
    },
    {
      slug: "only-their-homes-remained",
      title: "Only their homes remained",
      line: "The wind destroyed all by Allah's command. Only homes stood.",
      facts: ["Nothing it reached was spared", "Like 51:42"],
      quote: q46(25),
      source: ik(25, "Ibn Kathir says the wind had Allah's permission to destroy every part of their land that could be destroyed.", "destroying every part of their land that could normally be destroyed"),
      difficulty: 2,
      questions: [
        { q: "By whose command did the wind act, in 46:25?", a: "Its Lord", wrong: ["The clouds", "Hud", "The sea"], why: "Destroying everything by the command of its Lord!" },
        { q: "What could still be seen, in 46:25?", a: "Only their dwellings", wrong: ["Their farms", "Their armies", "Their gold"], why: "So they became such that nothing could be seen except their dwellings!" },
        { tf: true, q: "Allah says this is how He repays the criminal people.", why: "Thus do We recompense the criminal people!" }
      ]
    }
  ]
};

/** Ayahs 26 to 35: strength that did not help, the jinn who listened to the Quran, and patience like the Messengers of firm resolve. */
const AHQAF_THREE: DeepUnit = {
  key: "ahqaf3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-46",
  name: "Al-Ahqaf, ayahs 26 to 35",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Ahqaf",
  lessons: [
    {
      slug: "strength-that-did-not-help",
      title: "Strength that did not help",
      line: "Past nations had more power, yet their senses did not save them.",
      facts: ["Hearing, sight and hearts", "Beware of being like them"],
      quote: q46(26),
      source: ik(26, "Ibn Kathir says earlier nations had far more wealth and children, and listeners must beware of being like them.", "you listeners must beware of being like them"),
      difficulty: 2,
      questions: [
        { q: "What did Allah give past nations, in 46:26?", a: "Hearing, vision and hearts", wrong: ["Nothing", "Only gold", "Only land"], why: "We also gave them hearing, vision, and hearts." },
        { q: "Why did their senses not help, in 46:26?", a: "They denied Allah's ayahs", wrong: ["They were too young", "They were asleep", "They were too far"], why: "Since they used to deny the Ayat of Allah." },
        { tf: true, q: "Ibn Kathir warns listeners not to be like them.", why: "You listeners must beware of being like them." }
      ]
    },
    {
      slug: "towns-around-makkah",
      title: "Towns around Makkah",
      line: "Ruined towns stood near Makkah: 'Ad, Thamud, Saba, Madyan, Lut.",
      facts: ["Signs shown in many ways", "So that they might return"],
      quote: q46(27),
      source: ik(27, "Ibn Kathir names the nations around Makkah: 'Ad in Hadramawt, Thamud between Makkah and Sham, Saba in Yemen, Madyan, and the people of Lut.", "This is addressed to the people of Makkah"),
      difficulty: 3,
      questions: [
        { q: "To whom is 46:27 addressed, per Ibn Kathir?", a: "The people of Makkah", wrong: ["The people of Rome", "The jinn", "The angels"], why: "This is addressed to the people of Makkah." },
        { q: "Which nation lived in Yemen, per Ibn Kathir?", a: "Saba", wrong: ["Thamud", "Madyan", "Lut's people"], why: "Saba who were in Yemen." },
        { q: "Why were signs shown in many ways, in 46:27?", a: "So they might return", wrong: ["For fun", "To confuse", "For no reason"], why: "We have shown them the signs in various ways so that they might return." }
      ]
    },
    {
      slug: "idols-vanished",
      title: "Their idols vanished",
      line: "When ruin came, the idols they relied on vanished from them.",
      facts: ["Idols were their lie", "Only Allah can help"],
      quote: q46(28),
      source: ik(28, "Ibn Kathir says the idols left them alone when they needed them the most.", "they completely left them alone when they needed them the most"),
      difficulty: 2,
      questions: [
        { q: "Why did they take idols, in 46:28?", a: "As a way to approach Allah", wrong: ["To sell them", "As toys", "For decoration"], why: "As the means of approach to Him." },
        { q: "What happened to the idols, in 46:28?", a: "They vanished from them", wrong: ["They fought for them", "They saved them", "They spoke"], why: "Nay, but they vanished completely from them." },
        { tf: true, q: "46:28 calls their idol worship falsehood and fabrication.", why: "And that was their falsehood, and what they were fabricating." }
      ]
    },
    {
      slug: "jinn-listen-to-the-quran",
      title: "The jinn listen",
      line: "Jinn came to hear the Quran and told each other: be quiet!",
      facts: ["At Nakhlah, near Makkah", "They listened in silence"],
      quote: q46(29),
      source: ik(29, "Ibn Kathir reports that the jinn heard the Prophet ﷺ reciting at a place called Nakhlah, and said to each other: hush!", "They were at a place called Nakhlah"),
      difficulty: 2,
      questions: [
        { q: "Who came to listen to the Quran, in 46:29?", a: "A group of jinn", wrong: ["A group of angels", "Roman soldiers", "Birds"], why: "When We sent toward you a group of the Jinn, to listen to the Quran." },
        { q: "What did they say to each other, in 46:29?", a: "Listen quietly", wrong: ["Let us leave", "Speak louder", "Fight"], why: "When they attended it, they said: Listen quietly!" },
        { q: "What did they do after it ended, in 46:29?", a: "Went to warn their people", wrong: ["Stayed forever", "Forgot it", "Slept"], why: "They returned to their people, as warners." }
      ]
    },
    {
      slug: "helpers-among-the-jinn",
      title: "Helpers among the jinn",
      line: "Jinn heard him ﷺ, then spread his call among the jinn.",
      facts: ["As-Sa'di explains", "Message to jinn and humans"],
      quote: q46(29),
      source: saadi(46, 29, "As-Sa'di says the Prophet ﷺ was sent to humans and jinn alike; Allah turned a group of jinn toward him to hear the Quran, and they went back as warners, helping spread his call among the jinn.", "وقيضهم الله معونة لرسوله صلى الله عليه وسلم في نشر دعوته في الجن"),
      difficulty: 2,
      questions: [
        { q: "Who was the Prophet ﷺ sent to, per as-Sa'di?", a: "Humans and jinn", wrong: ["Only Arabs", "Only humans", "Only angels"], why: "He ﷺ was sent to all creation, humans and jinn." },
        { q: "What did the jinn do after hearing the Quran?", a: "Warned their people", wrong: ["Forgot it", "Hid it", "Mocked it"], why: "They went back to their people as warners." },
        { tf: true, q: "Allah made the jinn who heard the Quran helpers in spreading the call.", why: "As-Sa'di on 46:29." }
      ]
    },
    {
      slug: "the-sky-was-guarded",
      title: "The sky was guarded",
      line: "Blocked from the sky's news, jinn searched and found the Quran.",
      facts: ["Flames chased the devils", "Found at the Fajr prayer"],
      quote: q46(29),
      source: hadith("bukhari", "4921", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said the devils were blocked from the news of the heavens, so they searched east and west, and some found the Prophet ﷺ leading the Fajr prayer.", "travel all over the world, east and west, and try to find out what has happened"),
      difficulty: 3,
      questions: [
        { q: "What blocked the devils, per Bukhari 4921?", a: "Flames sent down on them", wrong: ["Rain", "Clouds", "Mountains"], why: "Flames were sent down upon them, so the devils returned." },
        { q: "Where did they search?", a: "East and west, all over the world", wrong: ["Only Makkah", "Only the sea", "Nowhere"], why: "Travel all over the world, east and west, and try to find out what has happened." },
        { q: "Toward which market was the Prophet ﷺ going?", a: "'Ukaz", wrong: ["Madinah market", "Damascus", "Basra"], why: "He went out along with a group of his companions towards 'Ukaz Market." }
      ]
    },
    {
      slug: "a-book-after-musa",
      title: "A Book after Musa",
      line: "The jinn said: we heard a Book after Musa, guiding to truth.",
      facts: ["Truth in belief", "The straight path in deeds"],
      quote: q46(30),
      source: ik(30, "Ibn Kathir says the Quran guides to the truth in belief and information, and to the straight path in deeds.", "means in belief and information"),
      difficulty: 3,
      questions: [
        { q: "After whom did the jinn say the Book came, in 46:30?", a: "Musa", wrong: ["Nuh", "Adam", "Hud"], why: "We have heard a Book sent down after Musa." },
        { q: "What does guiding to the truth mean, per Ibn Kathir?", a: "In belief and information", wrong: ["In trade", "In poetry", "In sports"], why: "It guides to the truth, in belief and information." },
        { q: "What does the straight path refer to, per Ibn Kathir?", a: "Deeds", wrong: ["Roads", "Rivers", "Maps"], why: "And to the straight path, which means, in deeds." }
      ]
    },
    {
      slug: "respond-to-allahs-caller",
      title: "Answer Allah's caller",
      line: "The jinn told their people: answer Allah's caller and believe.",
      facts: ["The Prophet ﷺ was sent to jinn too", "Forgiveness for those who answer"],
      quote: q46(31),
      source: ik(31, "Ibn Kathir says this proves Muhammad ﷺ was sent to both humans and jinn.", "has been sent to both the human beings and the Jinns"),
      difficulty: 2,
      questions: [
        { q: "Whom did the jinn tell their people to answer, in 46:31?", a: "Allah's Caller", wrong: ["Their king", "A sorcerer", "No one"], why: "O our people! Respond to Allah's Caller, and believe in him." },
        { q: "To whom was the Prophet ﷺ sent, per Ibn Kathir?", a: "Humans and jinn", wrong: ["Only Arabs", "Only humans", "Only Makkah"], why: "Muhammad has been sent to both the human beings and the Jinns." },
        { tf: true, q: "Answering Allah's caller brings forgiveness and protection.", why: "He will forgive you some of your sins, and protect you from a painful torment." }
      ]
    },
    {
      slug: "jinn-warners-not-messengers",
      title: "Jinn warners, not Messengers",
      line: "The jinn have warners among them, but Messengers were all human.",
      facts: ["Messengers were men (12:109)", "Jinn warn their own people"],
      quote: q46(32),
      source: ik(32, "Ibn Kathir says the ayah shows the jinn have warners among themselves, but Allah did not send Messengers from among the jinn.", "the Jinns have warners from among themselves, but no Messengers"),
      difficulty: 3,
      questions: [
        { q: "What do jinn have among them, per Ibn Kathir?", a: "Warners", wrong: ["Messengers", "Prophets with books", "Kings of men"], why: "The Jinns have warners from among themselves, but no Messengers." },
        { q: "What happens to one who does not answer, in 46:32?", a: "He cannot escape on earth", wrong: ["He gets a reward", "He is ignored", "He becomes a king"], why: "He cannot escape on earth, and he will not have besides Allah any protectors." },
        { tf: true, q: "Many jinn later came to the Prophet ﷺ in groups.", why: "Many of the Jinns took heed and came to the Messenger of Allah in successive delegations." }
      ]
    },
    {
      slug: "not-wearied-by-creation",
      title: "Not tired by creation",
      line: "Allah made all without tiring, so He can raise the dead.",
      facts: ["He says Be, and it is", "Bigger than making people"],
      quote: q46(33),
      source: ik(33, "Ibn Kathir says creating the heavens and earth did not exhaust Allah; He said Be, and they were, without refusal or delay.", "the creation of the heavens and earth did not exhaust Him"),
      difficulty: 2,
      questions: [
        { q: "Was Allah tired by creating the heavens and earth, in 46:33?", a: "No, never", wrong: ["Yes, a little", "Yes, for seven days", "Only by the earth"], why: "And was not wearied by their creation." },
        { q: "What can Allah do, in 46:33?", a: "Give life to the dead", wrong: ["Nothing more", "Only make stars", "Only make rain"], why: "Is Able to give life to the dead. Yes, He surely is Able to do all things." },
        { q: "Which is greater, per 40:57?", a: "Creating the heavens and earth", wrong: ["Creating people", "Both equal", "Neither"], why: "The creation of the heavens and earth is greater than the creation of the people." }
      ]
    },
    {
      slug: "is-this-not-the-truth",
      title: "Is this not the truth?",
      line: "Deniers will be asked: is this not the truth? They say yes.",
      facts: ["No choice but to confess", "Better to believe now"],
      quote: q46(34),
      source: ik(34, "Ibn Kathir says they will have no choice but to confess.", "they will have no choice but to confess"),
      difficulty: 2,
      questions: [
        { q: "What will deniers be asked, in 46:34?", a: "Is this not the truth?", wrong: ["Are you hungry?", "Where is your home?", "How old are you?"], why: "Is this not the truth?" },
        { q: "What will they answer, in 46:34?", a: "Yes, by our Lord!", wrong: ["No", "We do not know", "Maybe"], why: "They will say: Yes, by our Lord!" },
        { tf: true, q: "Ibn Kathir says they will have no choice but to confess.", why: "They will have no choice but to confess." }
      ]
    },
    {
      slug: "messengers-of-firm-resolve",
      title: "Messengers of firm resolve",
      line: "Be patient like the firmest Messengers: Nuh, Ibrahim, Musa, Isa.",
      facts: ["And Muhammad ﷺ, the last", "Named in 33:7 and 42:13"],
      quote: q46(35),
      source: ik(35, "Ibn Kathir says those of determination among the Messengers are Nuh, Ibrahim, Musa, Isa and the last of all the Prophets, Muhammad.", "and the last of all of the Prophets, Muhammad"),
      difficulty: 3,
      questions: [
        { q: "Whose patience is the model, in 46:35?", a: "The Messengers of firm resolve", wrong: ["Kings", "Poets", "Merchants"], why: "Therefore be patient as did those of determination among the Messengers." },
        { q: "Which of these is among them, per Ibn Kathir?", a: "Nuh", wrong: ["Yunus", "Adam", "Lut"], why: "Those of determination among the Messengers are Nuh, Ibrahim, Musa, Isa and Muhammad." },
        { q: "Where are their names together, per Ibn Kathir?", a: "33:7 and 42:13", wrong: ["1:1 and 2:2", "112:1", "114:6"], why: "Allah has specifically mentioned their names in two Ayat: 33:7 and 42:13." }
      ]
    },
    {
      slug: "like-an-hour-of-a-day",
      title: "Like an hour of a day",
      line: "On that Day, life in this world will feel like one hour.",
      facts: ["Life is short", "Allah is just"],
      quote: q46(35),
      source: ik(35, "Ibn Kathir says Allah only destroys those who choose the way of destruction, and it is part of His justice that He punishes only those who deserve it.", "Allah does not destroy anyone except those who choose the way of destruction"),
      difficulty: 2,
      questions: [
        { q: "How long will worldly life feel, in 46:35?", a: "Like an hour of a day", wrong: ["Like a thousand years", "Like a week", "Forever"], why: "It will be as though they had not remained in the world except an hour in a day." },
        { q: "Whom does Allah destroy, per Ibn Kathir?", a: "Only those who choose destruction", wrong: ["Anyone at random", "The weak", "The poor"], why: "Allah does not destroy anyone except those who choose the way of destruction." },
        { tf: true, q: "46:35 calls the Quran a clear message.", why: "This is a clear Message." }
      ]
    }
  ]
};

export const AHQAF_UNITS: readonly DeepUnit[] = [AHQAF_ONE, AHQAF_TWO, AHQAF_THREE];
