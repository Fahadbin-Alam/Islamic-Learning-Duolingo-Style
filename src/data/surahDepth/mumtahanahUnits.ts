import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Mumtahanah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Mumtahanah 60:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_60_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Mumtahanah 60:${ayah}`,
    url: `https://quran.com/60:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 60:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q60 = (ayah: number) => quranQuote(60, ayah);

/** Ayahs 1 to 3: the story of Hatib's letter, and loyalty to Allah over every other tie. */
const MUMTAHANAH_ONE: DeepUnit = {
  key: "mumtahanah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-60",
  name: "Al-Mumtahanah, ayahs 1 to 3",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mumtahanah",
  lessons: [
    {
      slug: "why-mumtahanah-came",
      title: "Why the surah came",
      line: "The story of Hatib is why the start of Al-Mumtahanah came down.",
      facts: ["Al-Mumtahanah means the woman who is tested", "Revealed in Madinah"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says the story of Hatib bin Abi Balta'ah is the reason behind revealing the beginning of this surah.", "is the reason behind revealing the beginning of this honorable Surah"),
      difficulty: 2,
      questions: [
        { q: "Whose story explains the start of Al-Mumtahanah?", a: "Hatib bin Abi Balta'ah", wrong: ["Abu Lahab", "Qarun", "Firawn"], why: "The story of Hatib bin Abi Balta'ah is the reason behind revealing the beginning of this Surah." },
        { q: "What does Al-Mumtahanah mean?", a: "The woman who is tested", wrong: ["The cave", "The iron", "The night"], why: "The surah is named after the believing women who were examined in 60:10." },
        { tf: true, q: "Al-Mumtahanah begins with a story from the Prophet's ﷺ time.", why: "The story of Hatib is the reason behind revealing the beginning of this Surah." }
      ]
    },
    {
      slug: "who-was-hatib",
      title: "Who was Hatib?",
      line: "Hatib was an early emigrant who fought at Badr.",
      facts: ["He had family and wealth in Makkah", "He was not from Quraysh"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says Hatib was among the Early Emigrants and fought at Badr, and he had children and wealth in Makkah.", "Hatib was among the Early Emigrants and participated in the battle of Badr"),
      difficulty: 2,
      questions: [
        { q: "Which battle did Hatib take part in?", a: "Badr", wrong: ["Hunayn", "Tabuk", "Mu'tah"], why: "Hatib was among the Early Emigrants and participated in the battle of Badr." },
        { q: "What did Hatib have in Makkah?", a: "Children and wealth", wrong: ["A palace", "An army", "Nothing at all"], why: "Hatib had children and wealth in Makkah." },
        { tf: true, q: "Hatib belonged to the tribe of Quraysh.", why: "He was not from the tribe of Quraysh; he was an ally of Uthman." }
      ]
    },
    {
      slug: "keep-our-news-hidden",
      title: "Keep our news hidden",
      line: "Before the march to Makkah, the Prophet ﷺ prayed for secrecy.",
      facts: ["Makkah had broken the treaty", "The march was kept secret"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says when the Prophet ﷺ decided to go to Makkah after its people broke the treaty, he said: O Allah, keep our news concealed from them.", "Keep our news concealed from them"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ ask Allah before the march?", a: "To keep the news hidden", wrong: ["To send rain", "To delay it", "To bring gold"], why: "O Allah! Keep our news concealed from them." },
        { q: "Why did the Muslims march to Makkah?", a: "Its people broke the treaty", wrong: ["For trade", "For a feast", "To find water"], why: "After its people broke the peace treaty between them." },
        { tf: true, q: "Allah accepted the Prophet's ﷺ dua to hide the news.", why: "Because He accepted the Prophet's ﷺ invocation to conceal the news." }
      ]
    },
    {
      slug: "the-secret-letter",
      title: "The secret letter",
      line: "Hatib secretly wrote to Makkah about the coming march.",
      facts: ["He hoped they would guard his family", "A woman carried the letter"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says Hatib wrote a letter and sent it with a woman to the people of Makkah, telling them of the Messenger's ﷺ plan.", "Hatib wrote a letter and sent it to the people of Makkah"),
      difficulty: 2,
      questions: [
        { q: "To whom did Hatib send the letter?", a: "The people of Makkah", wrong: ["The people of Taif", "The Romans", "The Persians"], why: "Hatib wrote a letter and sent it to the people of Makkah." },
        { q: "What did Hatib hope for in return?", a: "Safety for his family", wrong: ["Money", "A high rank", "Land"], why: "So that they would grant safety to his family in Makkah." },
        { tf: true, q: "Allah told His Messenger about the letter.", why: "Allah the Exalted conveyed this matter to His Messenger." }
      ]
    },
    {
      slug: "riders-to-rawdat-khakh",
      title: "Riders to Rawdat Khakh",
      line: "The Prophet ﷺ sent Ali, Az-Zubair and Al-Miqdad to fetch it.",
      facts: ["He told them the exact place", "They brought the letter back"],
      quote: q60(1),
      source: hadith("bukhari", "4890", "Ali ibn Abi Talib", "Sahih", "Ali said the Prophet ﷺ sent him with Az-Zubair and Al-Miqdad to Rawdat Khakh, where a lady had a letter, and they brought it back.", "Proceed till you reach a place called Raudat-Khakh"),
      difficulty: 3,
      questions: [
        { q: "Where were the riders sent?", a: "Rawdat Khakh", wrong: ["Uhud", "Quba", "Badr"], why: "Proceed till you reach a place called Raudat-Khakh." },
        { q: "Who went with Ali?", a: "Az-Zubair and Al-Miqdad", wrong: ["Abu Bakr and Umar", "Bilal and Salman", "Khalid and Amr"], why: "Allah's Messenger sent me along with Az-Zubair and Al-Miqdad." },
        { tf: true, q: "The Prophet ﷺ knew where the letter would be.", why: "There is a lady travelling in a howda on a camel. She has a letter." }
      ]
    },
    {
      slug: "hatib-explains",
      title: "Hatib explains",
      line: "Hatib said he did not do it out of disbelief.",
      facts: ["He wanted to protect his relatives", "He told the truth"],
      quote: q60(1),
      source: hadith("bukhari", "4890", "Ali ibn Abi Talib", "Sahih", "Hatib said he only wanted a favor from Quraysh to protect his relatives, and he did not do it out of disbelief.", "I did not do this out of disbelief or an inclination to desert my religion"),
      difficulty: 3,
      questions: [
        { q: "Why did Hatib send the letter?", a: "To protect his relatives", wrong: ["To leave Islam", "To earn money", "To start a war"], why: "I intended to do them some favor so that they might protect my relatives." },
        { q: "What did Hatib say he did not act from?", a: "Disbelief", wrong: ["Love", "Fear", "Hunger"], why: "I did not do this out of disbelief or an inclination to desert my religion." },
        { tf: true, q: "The Prophet ﷺ said Hatib had told the truth.", why: "The Prophet ﷺ then said to his companions: he has told you the truth." }
      ]
    },
    {
      slug: "the-people-of-badr",
      title: "The people of Badr",
      line: "The Prophet ﷺ forgave Hatib because he had fought at Badr.",
      facts: ["Badr had a special rank", "Mercy for an honest mistake"],
      quote: q60(1),
      source: hadith("bukhari", "4890", "Ali ibn Abi Talib", "Sahih", "The Prophet ﷺ said Hatib witnessed Badr, and perhaps Allah looked at the people of Badr and said: do what you want, I have forgiven you.", "He is one of those who witnessed"),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ pardon Hatib?", a: "He had fought at Badr", wrong: ["He was rich", "He was young", "He was a poet"], why: "He is one of those who witnessed the Battle of Badr." },
        { q: "What did Allah say to the people of Badr?", a: "I have forgiven you", wrong: ["Go home", "Fight again", "Be silent"], why: "Do what you want as I have forgiven you." },
        { tf: true, q: "Hatib was among the people of Badr.", why: "He is one of those who witnessed the Battle of Badr." }
      ]
    },
    {
      slug: "told-you-the-truth",
      title: "He told you the truth",
      line: "The Prophet ﷺ accepted Hatib's honest excuse.",
      facts: ["Hear a person out before judging", "Honesty brings mercy"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir reports the Prophet ﷺ said to his Companions about Hatib: he has told you the truth.", "Regarding him, he has told you the truth"),
      difficulty: 2,
      questions: [
        { q: "What did Hatib ask the Prophet ﷺ first?", a: "Not to judge him in haste", wrong: ["To leave Madinah", "To give him land", "To hide him"], why: "O Allah's Messenger! Do not make a hasty decision about me." },
        { q: "What did the Prophet ﷺ say about Hatib?", a: "He told you the truth", wrong: ["He must leave", "He is a liar", "He is a king"], why: "Regarding him, he has told you the truth." },
        { tf: true, q: "The Prophet ﷺ listened to Hatib before judging him.", why: "O Hatib! What is this? Then Hatib explained himself." }
      ]
    },
    {
      slug: "not-allies-of-enemies",
      title: "Not allies of the enemies",
      line: "60:1 forbids alliance with those at war with the believers.",
      facts: ["They fought Allah's Messenger", "Loyalty belongs to the believers"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says 60:1 refers to the idolators and disbelievers who were fighting Allah, His Messenger and the believers.", "who are combatants against Allah"),
      difficulty: 3,
      questions: [
        { q: "Whom does 60:1 refer to, per Ibn Kathir?", a: "Those fighting the believers", wrong: ["All neighbors", "All traders", "All children"], why: "The disbelievers who are combatants against Allah, His Messenger and the believers." },
        { q: "What does 60:1 forbid with them?", a: "Taking them as protecting friends", wrong: ["Speaking at all", "Trading fairly", "Being honest"], why: "Allah has forbidden the believers to take them as friends, supporters or companions." },
        { tf: true, q: "60:8 later allows kindness to those who do not fight.", why: "Allah does not forbid you to deal justly and kindly with those who fought not against you." }
      ]
    },
    {
      slug: "driven-out-for-faith",
      title: "Driven out for their faith",
      line: "Believers were driven from Makkah only for believing in Allah.",
      facts: ["Their only fault was their faith", "85:8 says the same"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says their only fault was believing in Allah, and quotes 85:8: they had no fault except that they believed in Allah.", "And they had no fault except that they believed in Allah"),
      difficulty: 3,
      questions: [
        { q: "Why were the believers driven out, per 60:1?", a: "They believed in Allah", wrong: ["They stole", "They lied", "They were poor"], why: "Because you believe in Allah, your Lord!" },
        { q: "Which ayah does Ibn Kathir add?", a: "85:8", wrong: ["2:255", "1:2", "112:1"], why: "And they had no fault except that they believed in Allah, Almighty, Al-Hamid! (85:8)" },
        { tf: true, q: "The Messenger ﷺ was also driven out of Makkah.", why: "And have driven out the Messenger ﷺ and yourselves." }
      ]
    },
    {
      slug: "for-my-cause",
      title: "For My cause",
      line: "If you left home for Allah, do not side with His enemies.",
      facts: ["Hijrah was for Allah's pleasure", "Actions must match intentions"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir explains: if you migrated for My cause and My pleasure, do not take My enemies and yours as protecting friends.", "If you migrated in Jihad for My cause and for seeking My pleasure"),
      difficulty: 3,
      questions: [
        { q: "Why did the emigrants leave home, in 60:1?", a: "To seek Allah's pleasure", wrong: ["To get rich", "To see the sea", "To find fame"], why: "If you have come forth to strive in My cause and to seek My good pleasure." },
        { q: "What should those emigrants not do?", a: "Side with Allah's enemies", wrong: ["Pray at night", "Help the poor", "Fast"], why: "Then do not take My enemies and your enemies as protecting friends." },
        { tf: true, q: "Their enemies had taken their homes and property.", why: "After they expelled you from your homes and property." }
      ]
    },
    {
      slug: "allah-knows-secrets",
      title: "Allah knows every secret",
      line: "A secret letter cannot be hidden from Allah.",
      facts: ["He knows what you hide and show", "He knows intentions too"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir explains Allah asks: do you do this while I know the secrets of the hearts, the intentions and all apparent things?", "I know the secrets of the hearts, the intentions and all apparent things"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 60:1?", a: "What you hide and reveal", wrong: ["Only what you say", "Only the past", "Only actions"], why: "I am All-Aware of what you conceal and what you reveal." },
        { q: "What else does Allah know, per Ibn Kathir?", a: "The intentions of hearts", wrong: ["Nothing hidden", "Only words", "Only numbers"], why: "I know the secrets of the hearts, the intentions and all apparent things." },
        { tf: true, q: "Hatib's letter was hidden from Allah.", why: "Allah the Exalted conveyed this matter to His Messenger." }
      ]
    },
    {
      slug: "leaving-the-straight-path",
      title: "Leaving the straight path",
      line: "Siding with Allah's enemies leads off the straight path.",
      facts: ["A clear warning", "Loyalty to Allah keeps us on track"],
      quote: q60(1),
      source: ik(1, "Ibn Kathir says whoever does this has gone astray from the straight path.", "then indeed he has gone astray from the straight path"),
      difficulty: 2,
      questions: [
        { q: "What happens to whoever does this, in 60:1?", a: "He goes astray", wrong: ["He gets rich", "He is praised", "Nothing"], why: "Then indeed he has gone astray from the straight path." },
        { q: "From which path does he stray?", a: "The straight path", wrong: ["The mountain path", "The sea route", "The trade road"], why: "He has gone astray from the straight path." },
        { tf: true, q: "60:1 ends with a warning.", why: "And whosoever of you does that, then indeed he has gone astray." }
      ]
    },
    {
      slug: "their-true-wish",
      title: "Their true wish",
      line: "Hostile enemies wish to harm believers and see them disbelieve.",
      facts: ["Harm by hand and tongue", "They wish you lose your faith"],
      quote: q60(2),
      source: ik(2, "Ibn Kathir says if they gained the upper hand they would harm the believers in words and action, and they desire that you disbelieve.", "they would use every type of harm in their disposal to hurt you in words and action"),
      difficulty: 3,
      questions: [
        { q: "What would they do if they had the upper hand?", a: "Harm the believers", wrong: ["Help them", "Leave them", "Pay them"], why: "They would use every type of harm in their disposal to hurt you in words and action." },
        { q: "What do they wish for the believers, in 60:2?", a: "That they disbelieve", wrong: ["That they grow rich", "That they travel", "That they rest"], why: "And they desire that you should disbelieve." },
        { tf: true, q: "Their enmity was both outward and inward.", why: "Therefore, their enmity to you is outward and inward." }
      ]
    },
    {
      slug: "relatives-will-not-help",
      title: "Relatives will not help",
      line: "On Judgment Day, relatives and children cannot save you.",
      facts: ["Each person stands alone", "Only deeds and faith help"],
      quote: q60(3),
      source: ik(3, "Ibn Kathir explains 60:3: your family relations will not benefit you with Allah.", "your family relations will not benefit you with Allah"),
      difficulty: 2,
      questions: [
        { q: "What will not benefit you on Judgment Day, in 60:3?", a: "Relatives and children", wrong: ["Good deeds", "Faith", "Allah's mercy"], why: "Neither your relatives nor your children will benefit you on the Day of Resurrection." },
        { q: "Why did Hatib send the letter?", a: "For his family", wrong: ["For fame", "For gold", "For a horse"], why: "So that they would grant safety to his family in Makkah." },
        { tf: true, q: "60:3 speaks of the Day of Resurrection.", why: "Neither your relatives nor your children will benefit you on the Day of Resurrection." }
      ]
    },
    {
      slug: "do-not-anger-allah",
      title: "Do not anger Allah to please them",
      line: "Pleasing family by angering Allah brings no benefit.",
      facts: ["Allah comes first", "Even a Prophet's kin need their own faith"],
      quote: q60(3),
      source: ik(3, "Ibn Kathir says your relations will not benefit you if you please them with what angers Allah.", "Your relations will not benefit you if you please them with what angers Allah"),
      difficulty: 3,
      questions: [
        { q: "When will relations not benefit you?", a: "When you anger Allah to please them", wrong: ["When you visit them", "When you help them", "When you pray"], why: "Your relations will not benefit you if you please them with what angers Allah." },
        { q: "Does being related to a Prophet save someone?", a: "No, not without faith", wrong: ["Yes, always", "Only on Fridays", "Only the eldest"], why: "Their relation will not benefit them with Allah, even if their relation was with a Prophet." },
        { tf: true, q: "We may anger Allah to keep family happy.", why: "Your relations will not benefit you if you please them with what angers Allah." }
      ]
    },
    {
      slug: "he-will-judge",
      title: "He will judge between you",
      line: "Allah will judge between people and sees all they do.",
      facts: ["Al-Basir: the All-Seer", "Families are separated by deeds"],
      quote: q60(3),
      source: ik(3, "Ibn Kathir quotes 60:3: He will judge between you, and Allah is the All-Seer of what you do.", "He will judge between you. And Allah is the All-Seer of what you do"),
      difficulty: 2,
      questions: [
        { q: "Who will judge between people, in 60:3?", a: "Allah", wrong: ["Their parents", "Their kings", "Their friends"], why: "He will judge between you." },
        { q: "What does Allah see, in 60:3?", a: "All that you do", wrong: ["Only big deeds", "Only words", "Only the past"], why: "And Allah is the All-Seer of what you do." },
        { tf: true, q: "Allah is the All-Seer of our deeds.", why: "And Allah is the All-Seer of what you do." }
      ]
    }
  ]
};

/** Ayahs 4 to 6: the excellent example of Ibrahim and those with him, and their dua. */
const MUMTAHANAH_TWO: DeepUnit = {
  key: "mumtahanah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-60",
  name: "Al-Mumtahanah, ayahs 4 to 6",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mumtahanah",
  lessons: [
    {
      slug: "an-excellent-example",
      title: "An excellent example",
      line: "Ibrahim and those with him are an excellent example for us.",
      facts: ["Uswah hasanah: a fine example", "Allah points us to Ibrahim"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir quotes 60:4: indeed there has been an excellent example for you in Ibrahim and those with him.", "Indeed there has been an excellent example for you in Ibrahim and those with him"),
      difficulty: 1,
      questions: [
        { q: "Who is the excellent example in 60:4?", a: "Ibrahim and those with him", wrong: ["Firawn and his army", "Qarun", "The people of Ad"], why: "Indeed there has been an excellent example for you in Ibrahim and those with him." },
        { q: "What kind of example is Ibrahim?", a: "An excellent one", wrong: ["A warning only", "A sad one", "A forgotten one"], why: "There has been an excellent example for you in Ibrahim." },
        { tf: true, q: "Allah tells us to learn from Ibrahim.", why: "Indeed there has been an excellent example for you in Ibrahim." }
      ]
    },
    {
      slug: "those-with-him",
      title: "Those with him",
      line: "Those with Ibrahim were the people who believed in him.",
      facts: ["Few, but firm", "They stood together for Allah"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir says those with him means his followers who believed in him.", "meaning, his followers who believed in him"),
      difficulty: 2,
      questions: [
        { q: "Who were those with Ibrahim, per Ibn Kathir?", a: "His followers who believed", wrong: ["His enemies", "Travelling traders", "Angels only"], why: "Meaning, his followers who believed in him." },
        { q: "To whom did they speak, in 60:4?", a: "Their own people", wrong: ["Their animals", "The angels", "The kings of Rome"], why: "When they said to their people." },
        { tf: true, q: "Ibrahim stood alone with no believers beside him.", why: "Ibrahim and those with him, meaning, his followers who believed in him." }
      ]
    },
    {
      slug: "free-from-idols",
      title: "Free from the idols",
      line: "They told their people: we are free of you and your idols.",
      facts: ["They rejected idol worship", "Tawhid came before all ties"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir explains their words as: we disbelieve in your religion and way.", "we disbelieve in your religion and way"),
      difficulty: 2,
      questions: [
        { q: "What were they free from, in 60:4?", a: "Their people and their idols", wrong: ["Their homes", "Their food", "Their work"], why: "Verily, we are free from you and whatever you worship besides Allah." },
        { q: "What did they reject, per Ibn Kathir?", a: "Their people's religion and way", wrong: ["Their language", "Their clothes", "Their market"], why: "We disbelieve in your religion and way." },
        { tf: true, q: "Ibrahim's people worshipped others besides Allah.", why: "We are free from you and whatever you worship besides Allah." }
      ]
    },
    {
      slug: "until-you-believe",
      title: "Until you believe",
      line: "The split would last until their people worshipped Allah alone.",
      facts: ["The door to faith stays open", "Belief ends the enmity"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir says: unless and until you worship Allah alone without partners and leave the idols.", "unless, and until, you worship Allah alone without partners"),
      difficulty: 3,
      questions: [
        { q: "How long would the split last, in 60:4?", a: "Until they believe in Allah alone", wrong: ["One year", "Forever, no matter what", "Until sunset"], why: "Until you believe in Allah alone." },
        { q: "What would end it, per Ibn Kathir?", a: "Worshipping Allah alone", wrong: ["Paying money", "Moving away", "A feast"], why: "Unless, and until, you worship Allah alone without partners." },
        { tf: true, q: "Faith could end the enmity at any time.", why: "Until you believe in Allah alone." }
      ]
    },
    {
      slug: "the-promise-to-his-father",
      title: "The promise to his father",
      line: "Ibrahim's prayer for his father came from an earlier promise.",
      facts: ["He had promised to pray for him", "9:114 explains it"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir says Ibrahim's prayer for his father was a promise that he made for his father.", "it was a promise that he made for his father"),
      difficulty: 3,
      questions: [
        { q: "Why did Ibrahim pray for his father?", a: "He had promised to", wrong: ["He was ordered to", "His father asked twice", "To win an argument"], why: "It was a promise that he made for his father." },
        { q: "Which ayah does Ibn Kathir link?", a: "9:114", wrong: ["2:255", "18:10", "36:1"], why: "And Ibrahim's request for his father's forgiveness was only because of a promise he made to him. (9:114)" },
        { tf: true, q: "60:4 names one exception in Ibrahim's example.", why: "Except the saying of Ibrahim to his father." }
      ]
    },
    {
      slug: "when-it-became-clear",
      title: "When it became clear",
      line: "Once his father's enmity to Allah was clear, Ibrahim left him.",
      facts: ["Ibrahim was Awwah, often turning to Allah", "He was forbearing"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir says when Ibrahim became sure that his father was an enemy of Allah, he declared himself innocent of him.", "When Ibrahim became sure that his father was an enemy of Allah, he declared himself innocent of him"),
      difficulty: 3,
      questions: [
        { q: "When did Ibrahim step away from his father?", a: "When his enmity to Allah was clear", wrong: ["At once", "When he grew old", "When he moved"], why: "When Ibrahim became sure that his father was an enemy of Allah, he declared himself innocent of him." },
        { q: "How does 9:114 describe Ibrahim?", a: "Awwah and forbearing", wrong: ["Harsh and proud", "Rich and famous", "Quiet and lazy"], why: "Verily, Ibrahim was Awwah and was forbearing." },
        { tf: true, q: "Ibrahim was patient and gentle with his father first.", why: "Ibrahim was Awwah and was forbearing." }
      ]
    },
    {
      slug: "no-power-before-allah",
      title: "No power before Allah",
      line: "Ibrahim told his father: I have no power for you before Allah.",
      facts: ["Only Allah decides", "Even a Prophet cannot save another"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir quotes Ibrahim's words: I will ask forgiveness for you, but I have no power to do anything for you before Allah.", "but I have no power to do anything for you before Allah"),
      difficulty: 2,
      questions: [
        { q: "What did Ibrahim say he had no power to do?", a: "Anything for him before Allah", wrong: ["Build a house", "Walk far", "Read"], why: "But I have no power to do anything for you before Allah." },
        { q: "Who alone decides who is forgiven?", a: "Allah", wrong: ["A Prophet", "A parent", "A king"], why: "I have no power to do anything for you before Allah." },
        { tf: true, q: "Ibrahim could save his father by his own power.", why: "But I have no power to do anything for you before Allah." }
      ]
    },
    {
      slug: "in-you-we-trust",
      title: "In You we trust",
      line: "Ibrahim's people prayed: Our Lord, in You we put our trust.",
      facts: ["Tawakkul: relying on Allah", "They handed every matter to Him"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir explains their dua: we trust in You for all matters, we surrender all of our affairs to You.", "we trust in You for all matters, we surrender all of our affairs to You"),
      difficulty: 2,
      questions: [
        { q: "In whom did they put their trust?", a: "Allah", wrong: ["Their tribe", "Their wealth", "Their walls"], why: "Our Lord! In You we put our trust." },
        { q: "What did they hand over to Allah, per Ibn Kathir?", a: "All of their affairs", wrong: ["Only money", "Only food", "Nothing"], why: "We trust in You for all matters, we surrender all of our affairs to You." },
        { tf: true, q: "They made this dua after leaving their people.", why: "Ibrahim and his companions, who parted with their people, said afterwards." }
      ]
    },
    {
      slug: "like-the-birds",
      title: "Like the birds",
      line: "Trust Allah fully, and He provides like He feeds the birds.",
      facts: ["Birds go out hungry, return full", "Trust and still make effort"],
      quote: q60(4),
      source: hadith("tirmidhi", "2344", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ said if you relied on Allah as you should, He would provide for you as He provides for a bird that goes out hungry and returns full.", "If you were to rely upon Allah with the required reliance"),
      difficulty: 2,
      questions: [
        { q: "How does a bird go out, in the hadith?", a: "Hungry in the morning", wrong: ["Full at night", "Asleep", "With a nest"], why: "It goes out in the morning empty, and returns full." },
        { q: "What does true reliance on Allah bring?", a: "Allah's provision", wrong: ["Laziness", "Bad luck", "Nothing"], why: "Then He would provide for you just as a bird is provided for." },
        { tf: true, q: "The bird still flies out to look for food.", why: "It goes out in the morning empty, and returns full." }
      ]
    },
    {
      slug: "to-you-we-return",
      title: "To You we return",
      line: "They said: to You we repent, and to You we all return.",
      facts: ["Tawbah: turning back to Allah", "Every journey ends with Him"],
      quote: q60(4),
      source: ik(4, "Ibn Kathir explains: and to You is the final Return in the Hereafter.", "and to You is the final Return in the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "To whom did they turn in repentance?", a: "Allah", wrong: ["Their elders", "Their idols", "No one"], why: "And to You we turn in repentance." },
        { q: "Where is the final return, per Ibn Kathir?", a: "To Allah in the Hereafter", wrong: ["To the city", "To the sea", "To the market"], why: "And to You is the final Return in the Hereafter." },
        { tf: true, q: "The dua in 60:4 includes repentance.", why: "And to You we turn in repentance." }
      ]
    },
    {
      slug: "not-a-trial",
      title: "Do not make us a trial",
      line: "They prayed: do not let the disbelievers overpower us.",
      facts: ["Qatadah explained it", "Ibn Jarir preferred this meaning"],
      quote: q60(5),
      source: ik(5, "Ibn Kathir quotes Qatadah: do not give the disbelievers victory over us, subjecting us to trials by their hands.", "Do not give the disbelievers victory over us"),
      difficulty: 3,
      questions: [
        { q: "What did they ask in 60:5?", a: "Not to be a trial for the disbelievers", wrong: ["To be rich", "To be famous", "To be kings"], why: "Our Lord! Make us not a trial for the disbelievers." },
        { q: "What does it mean, per Qatadah?", a: "Do not give them victory over us", wrong: ["Make us travel", "Give us gold", "Make us sleep"], why: "Do not give the disbelievers victory over us." },
        { tf: true, q: "Ibn Jarir preferred Qatadah's meaning.", why: "This is the meaning that Ibn Jarir preferred." }
      ]
    },
    {
      slug: "why-not-a-trial",
      title: "So they would not be misled",
      line: "If believers lost, the disbelievers might think they were right.",
      facts: ["Winning is not proof of truth", "Believers ask Allah for protection"],
      quote: q60(5),
      source: ik(5, "Ibn Kathir quotes Qatadah: if You do so, they would think they were given victory over us because they are on the truth.", "they would then think that they were given victory over us because they are on the truth"),
      difficulty: 4,
      questions: [
        { q: "What might the disbelievers think if they won?", a: "That they were on the truth", wrong: ["That they were tired", "That it rained", "That they were lost"], why: "They would then think that they were given victory over us because they are on the truth." },
        { q: "Whose words does Ibn Kathir quote?", a: "Qatadah", wrong: ["Abu Jahl", "Firawn", "Haman"], why: "Qatadah said: do not give the disbelievers victory over us." },
        { tf: true, q: "Winning a battle always proves who is right.", why: "They would then think that they were given victory over us because they are on the truth." }
      ]
    },
    {
      slug: "cover-our-mistakes",
      title: "Cover our mistakes",
      line: "They asked Allah to forgive them and hide their mistakes.",
      facts: ["Maghfirah also means covering", "Forgiveness between us and Allah"],
      quote: q60(5),
      source: ik(5, "Ibn Kathir explains forgive us as: cover our mistakes from being exposed to other than You, and forgive us.", "cover our mistakes from being exposed to other than You"),
      difficulty: 2,
      questions: [
        { q: "What did they ask Allah to cover?", a: "Their mistakes", wrong: ["Their houses", "Their faces", "Their wells"], why: "Cover our mistakes from being exposed to other than You." },
        { q: "Whom did they ask for forgiveness, in 60:5?", a: "Our Lord", wrong: ["Their leaders", "Their idols", "Their friends"], why: "And forgive us, Our Lord!" },
        { tf: true, q: "Even the best believers asked Allah for forgiveness.", why: "And forgive us, Our Lord! Verily, You, only You, are the Almighty, the All-Wise." }
      ]
    },
    {
      slug: "refuge-in-his-majesty",
      title: "Refuge in His majesty",
      line: "Whoever seeks refuge in the Almighty is never treated unjustly.",
      facts: ["Al-Aziz: the Almighty", "Al-Hakim: wise in all He decrees"],
      quote: q60(5),
      source: ik(5, "Ibn Kathir says those who seek refuge in Your majesty are never dealt with unjustly, and You are All-Wise in Your statements, actions and decrees.", "those who seek refuge in Your majesty are never dealt with unjustly"),
      difficulty: 3,
      questions: [
        { q: "Which two Names end 60:5?", a: "The Almighty, the All-Wise", wrong: ["The King, the Pure", "The First, the Last", "The Rich, the Praised"], why: "Verily, You, only You, are the Almighty, the All-Wise." },
        { q: "What happens to those who seek refuge in Allah?", a: "They are never treated unjustly", wrong: ["They are forgotten", "They lose", "Nothing"], why: "Those who seek refuge in Your majesty are never dealt with unjustly." },
        { tf: true, q: "Allah is wise in His laws and decrees.", why: "The All-Wise in Your statements, actions, legislation and decrees." }
      ]
    },
    {
      slug: "for-those-who-hope",
      title: "For those who hope",
      line: "Ibrahim's example is for those who hope to meet Allah.",
      facts: ["60:6 repeats the call", "Hope in the Last Day moves us"],
      quote: q60(6),
      source: ik(6, "Ibn Kathir says 60:6 encourages the believers who believe in Allah and the Return to Him.", "thus encouraging the believers who believe in Allah and the Return to Him"),
      difficulty: 2,
      questions: [
        { q: "For whom is the example, in 60:6?", a: "Those who look forward to Allah", wrong: ["Only kings", "Only the old", "Only travelers"], why: "For those who look forward to (the meeting with) Allah and the Last Day." },
        { q: "What does 60:6 do, per Ibn Kathir?", a: "Encourages the believers", wrong: ["Ends the surah", "Tells a joke", "Lists prices"], why: "Thus encouraging the believers who believe in Allah and the Return to Him." },
        { tf: true, q: "60:6 mentions the Last Day.", why: "For those who look forward to Allah and the Last Day." }
      ]
    },
    {
      slug: "allah-al-ghani",
      title: "Al-Ghani, the Rich",
      line: "Allah needs no one; whoever turns away harms only himself.",
      facts: ["Al-Ghani: perfectly rich", "14:8 says the same"],
      quote: q60(6),
      source: ik(6, "Ibn Kathir reports Ibn Abbas: Al-Ghani is the One Who is perfectly rich, and that is Allah.", "is the One Who is perfectly rich"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Ghani mean, per Ibn Abbas?", a: "Perfectly rich", wrong: ["Very strong", "Very near", "Very kind"], why: "Ghani is the One Who is perfectly rich." },
        { q: "Which ayah does Ibn Kathir add?", a: "14:8", wrong: ["2:286", "55:1", "67:1"], why: "If you disbelieve, you and all on the earth together, then verily! Allah is Ghani, Hamid. (14:8)" },
        { tf: true, q: "Allah needs people to worship Him.", why: "Verily, Allah is Al-Ghani, Al-Hamid." }
      ]
    },
    {
      slug: "allah-al-hamid",
      title: "Al-Hamid, the Praiseworthy",
      line: "Allah is Al-Hamid, praised in all He says and does.",
      facts: ["Al-Hamid: the Praiseworthy", "He has no equal"],
      quote: q60(6),
      source: ik(6, "Ibn Kathir says Hamid means the praiseworthy, in all His statements and actions, and there is no true god except Him.", "the praiseworthy, in all His statements and actions"),
      difficulty: 2,
      questions: [
        { q: "What does Al-Hamid mean, per Ibn Kathir?", a: "The Praiseworthy", wrong: ["The Hidden", "The Last", "The Strong"], why: "Hamid means the praiseworthy, in all His statements and actions." },
        { q: "How does 60:6 end?", a: "Allah is Al-Ghani, Al-Hamid", wrong: ["Allah is Near", "Allah is First", "Allah is Light"], why: "Verily, Allah is Al-Ghani, Al-Hamid." },
        { tf: true, q: "Allah has no equal, per Ibn Kathir.", why: "Surely, He has no equal, none like unto Him." }
      ]
    }
  ]
};

/** Ayahs 7 to 9: hearts can change, and kindness and justice to those who do not fight us. */
const MUMTAHANAH_THREE: DeepUnit = {
  key: "mumtahanah3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-60",
  name: "Al-Mumtahanah, ayahs 7 to 9",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mumtahanah",
  lessons: [
    {
      slug: "friendship-after-enmity",
      title: "Friendship after enmity",
      line: "Allah may turn today's enemies into tomorrow's friends.",
      facts: ["Hearts can change", "Many Makkans later became Muslim"],
      quote: q60(7),
      source: ik(7, "Ibn Kathir says 60:7 means affection after animosity, tenderness after coldness and coming together after parting.", "affection after animosity, tenderness after coldness and coming together after parting from each other"),
      difficulty: 2,
      questions: [
        { q: "What may Allah place between enemies, in 60:7?", a: "Friendship", wrong: ["A wall", "A river", "Silence"], why: "Perhaps Allah will make friendship between you and those whom you hold as enemies." },
        { q: "What comes after animosity, per Ibn Kathir?", a: "Affection", wrong: ["More anger", "Distance", "Sadness"], why: "Affection after animosity, tenderness after coldness." },
        { tf: true, q: "60:7 gives hope that hearts can change.", why: "Perhaps Allah will make friendship between you and those whom you hold as enemies." }
      ]
    },
    {
      slug: "allah-joins-hearts",
      title: "Allah joins hearts",
      line: "Allah can bring together hearts that once were hostile.",
      facts: ["Al-Qadir: All-Able", "Only Allah truly unites hearts"],
      quote: q60(7),
      source: ik(7, "Ibn Kathir says Allah is able to gather opposites and bring together hearts after hostility and hardness.", "Allah is able to gather opposites and bring together hearts"),
      difficulty: 2,
      questions: [
        { q: "What is Allah able to do, per Ibn Kathir?", a: "Bring hearts together", wrong: ["Nothing new", "Only end things", "Only count"], why: "Allah is able to gather opposites and bring together hearts." },
        { q: "What does 60:7 say Allah has?", a: "Power over all things", wrong: ["A helper", "A partner", "A limit"], why: "And Allah has power over all things." },
        { tf: true, q: "Hostile hearts can never come together.", why: "Allah is able to gather opposites and bring together hearts." }
      ]
    },
    {
      slug: "brothers-by-his-grace",
      title: "Brothers by His grace",
      line: "Allah turned the feuding Ansar into brothers.",
      facts: ["3:103 reminds them", "Aws and Khazraj were once enemies"],
      quote: q60(7),
      source: ik(7, "Ibn Kathir quotes 3:103 about the Ansar: you were enemies, but He joined your hearts, and by His grace you became brethren.", "He joined your hearts together, so that, by His grace, you became brethren"),
      difficulty: 3,
      questions: [
        { q: "Which ayah does Ibn Kathir quote about the Ansar?", a: "3:103", wrong: ["2:1", "9:40", "48:29"], why: "And remember Allah's favor on you, for you were enemies one to another. (3:103)" },
        { q: "What did the Ansar become by Allah's grace?", a: "Brothers", wrong: ["Kings", "Strangers", "Rivals"], why: "He joined your hearts together, so that, by His grace, you became brethren." },
        { tf: true, q: "The Ansar had been enemies to one another before Islam.", why: "For you were enemies one to another but He joined your hearts together." }
      ]
    },
    {
      slug: "brought-together-through-me",
      title: "Brought together through me",
      line: "The Prophet ﷺ reminded the Ansar: Allah united you through me.",
      facts: ["Said after Hunayn", "Guidance, unity and wealth came from Allah"],
      quote: q60(7),
      source: hadith("bukhari", "4330", "Abdullah ibn Zaid", "Sahih", "The Prophet ﷺ told the Ansar: did I not find you astray and Allah guided you through me, and divided and Allah brought you together through me?", "You were divided into groups, and Allah brought you together through me"),
      difficulty: 3,
      questions: [
        { q: "How were the Ansar before, in the hadith?", a: "Divided into groups", wrong: ["Rich and united", "Living in Makkah", "Traders at sea"], why: "You were divided into groups, and Allah brought you together through me." },
        { q: "After which battle was this said?", a: "Hunayn", wrong: ["Badr", "Uhud", "Khaybar"], why: "When Allah gave to His Apostle the war booty on the day of Hunain." },
        { tf: true, q: "The Prophet ﷺ also said Allah made them rich through him.", why: "You were poor and Allah made you rich through me." }
      ]
    },
    {
      slug: "only-allah-unites",
      title: "Only Allah unites",
      line: "All the world's wealth could not unite hearts; Allah did.",
      facts: ["8:63 says so", "Unity is a gift from Allah"],
      quote: q60(7),
      source: ik(7, "Ibn Kathir quotes 8:63: if you had spent all that is in the earth, you could not have united their hearts, but Allah united them.", "If you had spent all that is in the earth, you could not have united their hearts, but Allah has united them"),
      difficulty: 3,
      questions: [
        { q: "Could all the world's wealth unite hearts, in 8:63?", a: "No", wrong: ["Yes", "Only gold", "Only land"], why: "If you had spent all that is in the earth, you could not have united their hearts." },
        { q: "Who united their hearts?", a: "Allah", wrong: ["Kings", "Money", "Poets"], why: "But Allah has united them." },
        { tf: true, q: "Ibn Kathir uses 8:63 to explain 60:7.", why: "He it is Who has supported you with His help and with the believers. And He has united their hearts. (8:62-63)" }
      ]
    },
    {
      slug: "forgiving-to-those-who-turn",
      title: "Forgiving to those who turn",
      line: "Allah forgives anyone who repents and turns to Him in Islam.",
      facts: ["Al-Ghafur: Oft-Forgiving", "Ar-Rahim: Most Merciful"],
      quote: q60(7),
      source: ik(7, "Ibn Kathir says Allah forgives the disbelief of the disbelievers if they repent, return to their Lord and surrender to Him in Islam.", "Allah forgives the disbelief of the disbelievers if they repent from it"),
      difficulty: 2,
      questions: [
        { q: "Which two Names end 60:7?", a: "Oft-Forgiving, Most Merciful", wrong: ["Almighty, All-Wise", "Rich, Praised", "First, Last"], why: "And Allah is Oft-Forgiving, Most Merciful." },
        { q: "Whom does Allah forgive, per Ibn Kathir?", a: "Those who repent to Him", wrong: ["No one", "Only kings", "Only the rich"], why: "He is the Oft-Forgiving, the Most-Merciful to those who repent to Him from their sins." },
        { tf: true, q: "Some sins are too big for Allah to forgive after repentance.", why: "To those who repent to Him from their sins, no matter what type of the sin it is." }
      ]
    },
    {
      slug: "kindness-is-allowed",
      title: "Kindness is allowed",
      line: "Be kind and fair to non-Muslims who do not fight you.",
      facts: ["60:8 allows kindness", "Justice is for everyone"],
      quote: q60(8),
      source: ik(8, "Ibn Kathir says Allah does not forbid you from being kind to the disbelievers who do not fight you because of the religion.", "Allah does not forbid you from being kind to the disbelievers who do not fight you because of the religion"),
      difficulty: 1,
      questions: [
        { q: "To whom may Muslims be kind, in 60:8?", a: "Those who do not fight them", wrong: ["No one outside Islam", "Only rich people", "Only relatives"], why: "Allah does not forbid you to deal justly and kindly with those who fought not against you." },
        { q: "What two things does 60:8 allow?", a: "Justice and kindness", wrong: ["Anger and pride", "Lies and tricks", "Silence and distance"], why: "Allah does not forbid you to deal justly and kindly." },
        { tf: true, q: "Islam allows kindness to peaceful non-Muslims.", why: "Allah does not forbid you from being kind to the disbelievers who do not fight you." }
      ]
    },
    {
      slug: "allah-loves-the-just",
      title: "Allah loves the just",
      line: "Allah loves those who are fair to everyone.",
      facts: ["Al-Muqsitin: the fair ones", "Fairness is worship"],
      quote: q60(8),
      source: ik(8, "Ibn Kathir quotes the end of 60:8: verily, Allah loves those who deal with equity.", "Verily, Allah loves those who deal with equity"),
      difficulty: 1,
      questions: [
        { q: "Whom does Allah love, in 60:8?", a: "Those who deal with equity", wrong: ["The proud", "The loud", "The rich"], why: "Verily, Allah loves those who deal with equity." },
        { q: "What does equity mean?", a: "Being fair", wrong: ["Being fast", "Being rich", "Being quiet"], why: "Justly with those, to be fair with them." },
        { tf: true, q: "Being fair to others earns Allah's love.", why: "Verily, Allah loves those who deal with equity." }
      ]
    },
    {
      slug: "be-good-to-your-mother",
      title: "Be good to your mother",
      line: "The Prophet ﷺ told Asma to stay kind to her non-Muslim mother.",
      facts: ["Her mother came during the peace treaty", "Family ties matter"],
      quote: q60(8),
      source: hadith("bukhari", "2620", "Asma bint Abi Bakr", "Sahih", "Asma asked if she should keep good relations with her pagan mother who came to her, and the Prophet ﷺ said: yes, keep good relation with her.", "Yes, keep good relation with her"),
      difficulty: 2,
      questions: [
        { q: "Who came to visit Asma?", a: "Her mother", wrong: ["Her sister", "A trader", "A poet"], why: "My mother came to me during the lifetime of Allah's Messenger." },
        { q: "What did the Prophet ﷺ tell Asma?", a: "Keep good relations with her", wrong: ["Send her away", "Ignore her", "Hide from her"], why: "Yes, keep good relation with her." },
        { tf: true, q: "Asma's mother was not a Muslim at the time.", why: "My mother came to me and she was a pagan." }
      ]
    },
    {
      slug: "then-allah-revealed",
      title: "Then Allah revealed",
      line: "Ibn Uyaynah said 60:8 was revealed after Asma's question.",
      facts: ["A real question, a Quranic answer", "Narrated in Bukhari"],
      quote: q60(8),
      source: hadith("bukhari", "5978", "Asma bint Abi Bakr", "Sahih", "Asma asked if she could treat her mother kindly and the Prophet ﷺ said yes; Ibn Uyaynah said Allah then revealed 60:8.", "Then Allah revealed"),
      difficulty: 3,
      questions: [
        { q: "What did Asma ask the Prophet ﷺ?", a: "May I treat her kindly?", wrong: ["May I travel?", "May I fast?", "May I sell?"], why: "I asked the Prophet ﷺ: may I treat her kindly? He replied: yes." },
        { q: "Who linked the revelation of 60:8 to her story?", a: "Ibn Uyaynah", wrong: ["Abu Jahl", "Umar", "Bilal"], why: "Ibn Uyaina said: then Allah revealed." },
        { tf: true, q: "The Prophet ﷺ answered Asma with yes.", why: "He replied: yes." }
      ]
    },
    {
      slug: "gifts-from-her-mother",
      title: "Gifts from her mother",
      line: "Asma was told to accept her mother's gifts and let her in.",
      facts: ["Her mother was Qutaylah", "She brought cheese and butter"],
      quote: q60(8),
      source: ik(8, "Ibn Kathir reports that Qutaylah came visiting her daughter Asma with gifts, and the Prophet ﷺ told Asma to accept them and let her in.", "Qutaylah came visiting her daughter"),
      difficulty: 3,
      questions: [
        { q: "What was the name of Asma's mother?", a: "Qutaylah", wrong: ["Khadijah", "Sumayyah", "Hind"], why: "Qutaylah came visiting her daughter, Asma bint Abi Bakr." },
        { q: "What did her mother bring?", a: "Gifts like cheese and butter", wrong: ["A sword", "A horse", "Nothing"], why: "With some gifts, such as Dibab, cheese and clarified butter." },
        { tf: true, q: "Asma was told to let her mother into her house.", why: "Allah's Messenger ordered Asma to accept her mother's gifts and to let her enter her house." }
      ]
    },
    {
      slug: "pulpits-of-light",
      title: "Pulpits of light",
      line: "The just will sit on pulpits of light near the Most Merciful.",
      facts: ["Fair in rules and with family", "A great reward"],
      quote: q60(8),
      source: hadith("muslim", "1827", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ said the just will be on pulpits of light on the right of the Most Merciful: those fair in their rule, with their families and in their duties.", "the Dispensers of justice will be seated on the pulpits of light"),
      difficulty: 3,
      questions: [
        { q: "Where will the just be seated?", a: "On pulpits of light", wrong: ["On thrones of gold", "On the ground", "In a garden only"], why: "The Dispensers of justice will be seated on the pulpits of light." },
        { q: "With whom should we be just, in the hadith?", a: "Our families too", wrong: ["Only strangers", "Only rulers", "No one"], why: "Those who do justice in their rules, in matters relating to their families." },
        { tf: true, q: "Ibn Kathir mentions this reward under 60:8.", why: "The just, who are fair in their decisions, families and those under their authority, will be on podiums made of light." }
      ]
    },
    {
      slug: "those-who-fought-you",
      title: "Those who fought you",
      line: "60:9 forbids friendship only with those at war with you.",
      facts: ["They fought you for your faith", "They drove you from your homes"],
      quote: q60(9),
      source: ik(9, "Ibn Kathir says Allah forbids befriending the disbelievers who are openly hostile, who fought against you, expelled you and helped to expel you.", "the disbelievers who are openly hostile to you, those who fought against you, expelled you and helped to expel you"),
      difficulty: 2,
      questions: [
        { q: "With whom is friendship forbidden, in 60:9?", a: "Those who fought you for your faith", wrong: ["All neighbors", "All strangers", "All traders"], why: "Those who fought against you on account of religion." },
        { q: "What else had they done, in 60:9?", a: "Driven believers from their homes", wrong: ["Built them homes", "Fed them", "Taught them"], why: "And have driven you out of your homes, and helped to drive you out." },
        { tf: true, q: "60:9 is about those openly hostile to the believers.", why: "The disbelievers who are openly hostile to you, those who fought against you." }
      ]
    },
    {
      slug: "three-signs-of-hostility",
      title: "Three signs of hostility",
      line: "60:9 names three things: fighting, expelling and helping expel.",
      facts: ["The line is clear", "Peaceful people are treated kindly"],
      quote: q60(9),
      source: ik(9, "Ibn Kathir quotes 60:9: those who fought against you on account of religion, drove you out of your homes, and helped to drive you out.", "It is only as regards those who fought against you on account of religion"),
      difficulty: 3,
      questions: [
        { q: "Which is one of the three signs in 60:9?", a: "Helping to drive believers out", wrong: ["Trading with them", "Living nearby", "Speaking another language"], why: "And have driven you out of your homes, and helped to drive you out." },
        { q: "Why had they fought the believers?", a: "On account of religion", wrong: ["Over water", "Over land", "Over a game"], why: "Those who fought against you on account of religion." },
        { tf: true, q: "60:8 and 60:9 draw a clear line between two groups.", why: "Allah does not forbid you with those who fought not against you... It is only as regards those who fought against you." }
      ]
    },
    {
      slug: "such-are-the-wrongdoers",
      title: "Such are the wrongdoers",
      line: "Whoever befriends those at war with the believers does wrong.",
      facts: ["Az-Zalimun: the wrongdoers", "Loyalty to believers comes first"],
      quote: q60(9),
      source: ik(9, "Ibn Kathir says Allah stresses His warning: whosoever will befriend them, then such are the wrongdoers.", "And whosoever will befriend them, then such are the wrongdoers"),
      difficulty: 2,
      questions: [
        { q: "What does 60:9 call those who befriend them?", a: "The wrongdoers", wrong: ["The winners", "The wise", "The patient"], why: "And whosoever will befriend them, then such are the wrongdoers." },
        { q: "What does Ibn Kathir say Allah stresses?", a: "His warning", wrong: ["A joke", "A trade deal", "A story"], why: "Then Allah stresses His threat against being friends with them." },
        { tf: true, q: "60:9 ends with a warning.", why: "Then such are the wrongdoers." }
      ]
    }
  ]
};

/** Ayahs 10 to 13: the believing women who emigrated, the women's pledge, and the closing warning. */
const MUMTAHANAH_FOUR: DeepUnit = {
  key: "mumtahanah4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-60",
  name: "Al-Mumtahanah, ayahs 10-13",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mumtahanah",
  lessons: [
    {
      slug: "women-who-emigrated",
      title: "The women who emigrated",
      line: "Believing women fled to Madinah, and Allah said: test them.",
      facts: ["The surah is named after them", "They came after Al-Hudaybiyyah"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir says Allah ordered His faithful servants to test the faith of women who emigrate to them.", "ordered His faithful servants to test the faith of women who emigrate to them"),
      difficulty: 2,
      questions: [
        { q: "What were the believers told to do, in 60:10?", a: "Examine the women", wrong: ["Send them all back", "Ignore them", "Make them pay"], why: "When believing women come to you as emigrants, examine them." },
        { q: "What was tested, per Ibn Kathir?", a: "Their faith", wrong: ["Their wealth", "Their strength", "Their speed"], why: "To test the faith of women who emigrate to them." },
        { tf: true, q: "Al-Mumtahanah takes its name from these tested women.", why: "When believing women come to you as emigrants, examine them." }
      ]
    },
    {
      slug: "the-testimony-test",
      title: "The test of faith",
      line: "Ibn Abbas said the test was asking them to testify to Tawhid.",
      facts: ["La ilaha illallah", "Muhammad is Allah's servant and Messenger"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir reports from Ibn Abbas that their examination was asking them to testify to La ilaha illallah and that Muhammad is His Messenger.", "Their examination was asking them to testify to La ilaha illallah"),
      difficulty: 2,
      questions: [
        { q: "What was their test, per Ibn Abbas?", a: "Testifying to La ilaha illallah", wrong: ["Lifting stones", "Reciting poems", "Paying gold"], why: "Their examination was asking them to testify to La ilaha illallah." },
        { q: "What else did they testify, per Ibn Abbas?", a: "Muhammad is Allah's Messenger", wrong: ["Makkah is best", "They were rich", "They were tired"], why: "And that Muhammad is Allah's servant and His Messenger." },
        { tf: true, q: "The test was about belief in Allah and His Messenger.", why: "To testify to La ilaha illallah, and that Muhammad is Allah's servant and His Messenger." }
      ]
    },
    {
      slug: "why-did-you-come",
      title: "Why did you come?",
      line: "Mujahid said they were asked why they had migrated.",
      facts: ["Faith had to be the reason", "Not anger or other reasons"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir quotes Mujahid: ask them why they migrated; the reason had to be faith.", "Ask them why they migrated"),
      difficulty: 3,
      questions: [
        { q: "What did Mujahid say to ask them?", a: "Why they migrated", wrong: ["Their age", "Their wealth", "Their tribe"], why: "Ask them why they migrated." },
        { q: "What had to be the reason, per Mujahid?", a: "Faith in Islam", wrong: ["Anger", "Trade", "Travel"], why: "And you realized that they did not embrace the faith, then send them back." },
        { tf: true, q: "Leaving home for Allah needed a true intention.", why: "Ask them why they migrated." }
      ]
    },
    {
      slug: "allah-knows-their-faith",
      title: "Allah knows their faith best",
      line: "People judge what they see; Allah knows what is in hearts.",
      facts: ["We judge by the outward", "Hearts are for Allah"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir says 60:10 shows faith can be recognized and affirmed, while Allah knows best as to their faith.", "This Ayah indicates that faith can be recognized and affirmed"),
      difficulty: 3,
      questions: [
        { q: "Who knows best about their faith, in 60:10?", a: "Allah", wrong: ["Their families", "The traders", "The poets"], why: "Allah knows best as to their faith." },
        { q: "What does 60:10 show, per Ibn Kathir?", a: "Faith can be recognized", wrong: ["Faith is a secret", "Faith does not matter", "Faith is wealth"], why: "This Ayah indicates that faith can be recognized and affirmed." },
        { tf: true, q: "People can judge only what they see.", why: "Allah knows best as to their faith; if you ascertain that they are true believers." }
      ]
    },
    {
      slug: "not-sent-back",
      title: "Not sent back",
      line: "Believing women were not to be sent back to the disbelievers.",
      facts: ["Their safety was protected", "A clear command from Allah"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir says when they are sure that the women are faithful, they should not send them back to the disbelievers.", "When they are sure that they are faithful, they should not send them back to the disbelievers"),
      difficulty: 2,
      questions: [
        { q: "What were the believers told not to do?", a: "Send them back", wrong: ["Feed them", "Shelter them", "Teach them"], why: "Then if you ascertain that they are true believers, send them not back." },
        { q: "When could they keep them, per Ibn Kathir?", a: "When sure they were faithful", wrong: ["When they were rich", "When they were old", "Never"], why: "When they are sure that they are faithful, they should not send them back." },
        { tf: true, q: "60:10 protected the believing women.", why: "Send them not back to the disbelievers." }
      ]
    },
    {
      slug: "umm-kulthum",
      title: "Umm Kulthum",
      line: "Umm Kulthum fled to Madinah; the Prophet ﷺ did not return her.",
      facts: ["Her relatives asked for her", "60:10 had come down about the women"],
      quote: q60(10),
      source: hadith("bukhari", "2711", "Marwan and Al-Miswar ibn Makhramah", "Sahih", "Umm Kulthum bint Uqbah came as a believing emigrant; her relatives asked for her, but the Prophet ﷺ did not return her because Allah had revealed 60:10.", "did not return her to them for Allah had revealed the following Verse regarding women"),
      difficulty: 3,
      questions: [
        { q: "Who was one of the women emigrants?", a: "Umm Kulthum bint Uqbah", wrong: ["Hind bint Utbah", "Asma bint Abi Bakr", "Sumayyah"], why: "Some believing women emigrants including Um Kulthum bint Uqba." },
        { q: "Why was she not sent back?", a: "Allah had revealed 60:10", wrong: ["She was rich", "She hid", "She was ill"], why: "Did not return her to them for Allah had revealed the following Verse regarding women." },
        { tf: true, q: "Her relatives came to ask for her return.", why: "Her relative came to the Prophet ﷺ and asked him to return her." }
      ]
    },
    {
      slug: "the-hudaybiyyah-condition",
      title: "The Hudaybiyyah condition",
      line: "The treaty said Makkans who came over were to be returned.",
      facts: ["The Muslims disliked the condition", "60:10 kept the women safe"],
      quote: q60(10),
      source: hadith("bukhari", "2711", "Marwan and Al-Miswar ibn Makhramah", "Sahih", "Suhail stipulated in the treaty that anyone coming from the pagans should be returned, even a Muslim, and the Muslims disliked it.", "The Muslims did not like this condition"),
      difficulty: 4,
      questions: [
        { q: "Who insisted on the condition?", a: "Suhail bin Amr", wrong: ["Abu Sufyan", "Khalid", "Abu Bakr"], why: "When Suhail bin Amr agreed to the Treaty, one of the things he stipulated." },
        { q: "How did the Muslims feel about it?", a: "They disliked it", wrong: ["They loved it", "They laughed", "They forgot it"], why: "The Muslims did not like this condition." },
        { tf: true, q: "The Prophet ﷺ kept his word in the treaty.", why: "So, the Prophet ﷺ agreed to that condition and returned Abu Jandal." }
      ]
    },
    {
      slug: "zaynabs-necklace",
      title: "Zaynab's necklace",
      line: "Zaynab sent her mother Khadijah's necklace to free her husband.",
      facts: ["The Prophet ﷺ was moved to tears", "Her husband later became Muslim"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir tells how Zaynab sent a necklace of Khadijah as ransom for her husband after Badr, and the Prophet ﷺ became very emotional.", "When he was captured during the battle of Badr, his wife, Zaynab, sent his ransom"),
      difficulty: 3,
      questions: [
        { q: "What did Zaynab send as ransom?", a: "A necklace of Khadijah", wrong: ["A horse", "A sword", "A house"], why: "A necklace that belonged to the Prophet's ﷺ first wife Khadijah." },
        { q: "How did the Prophet ﷺ feel seeing it?", a: "Very emotional", wrong: ["Angry", "Bored", "Nothing"], why: "The Prophet ﷺ became very emotional when he saw the necklace." },
        { tf: true, q: "Zaynab was the Prophet's ﷺ daughter.", why: "Abu Al-As bin Ar-Rabi was married to Zaynab, the Prophet's ﷺ daughter." }
      ]
    },
    {
      slug: "zaynab-reunited",
      title: "Zaynab's husband believes",
      line: "Abu Al-As kept his promise and later embraced Islam.",
      facts: ["He sent Zaynab to Madinah", "He accepted Islam in year 8 AH"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir says Abu Al-As kept his promise and sent Zaynab to Madinah, and he embraced Islam in the eighth year after the Hijrah.", "embraced Islam in the eighth year after the Hijrah"),
      difficulty: 3,
      questions: [
        { q: "When did Abu Al-As embrace Islam?", a: "In the eighth year after Hijrah", wrong: ["Before Hijrah", "At Badr", "Never"], why: "Embraced Islam in the eighth year after the Hijrah." },
        { q: "Who went with Zaynab to Madinah?", a: "Zayd bin Harithah", wrong: ["Khalid", "Abu Jahl", "Suhail"], why: "Sent Zaynab to Allah's Messenger along with Zayd bin Harithah." },
        { tf: true, q: "Abu Al-As kept his promise to send Zaynab.", why: "Abu Al-As fulfilled his promise and sent Zaynab." }
      ]
    },
    {
      slug: "fairness-with-the-dowry",
      title: "Fairness with the dowry",
      line: "Even with the other side, the mahr was returned fairly.",
      facts: ["Mahr: the marriage gift", "Justice even in hard times"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir says the husbands of the emigrant women were to be given back the dowery they had paid.", "return the dowery that they gave to their wives"),
      difficulty: 3,
      questions: [
        { q: "What was given back to the husbands?", a: "The dowry they paid", wrong: ["Their land", "Their camels", "Nothing"], why: "Return the dowery that they gave to their wives." },
        { q: "Who explained it this way?", a: "Ibn Abbas, Mujahid and others", wrong: ["Firawn", "Haman", "Qarun"], why: "This was said by Ibn Abbas, Mujahid, Qatadah, Az-Zuhri and several others." },
        { tf: true, q: "Islam asked for fairness even with the other side.", why: "But give them that which they have spent." }
      ]
    },
    {
      slug: "the-judgement-of-allah",
      title: "The judgement of Allah",
      line: "These rules are Allah's judgement; He knows what benefits us.",
      facts: ["Al-Alim: All-Knowing", "Al-Hakim: All-Wise"],
      quote: q60(10),
      source: ik(10, "Ibn Kathir says Allah knows what benefits His servants and is the Most Wise about that.", "He knows what benefits His servants and is the Most Wise about that"),
      difficulty: 2,
      questions: [
        { q: "Whose judgement is described in 60:10?", a: "Allah's", wrong: ["A king's", "A tribe's", "A trader's"], why: "That is the judgement of Allah, He judges between you." },
        { q: "What does Allah know, per Ibn Kathir?", a: "What benefits His servants", wrong: ["Only the past", "Only words", "Nothing hidden"], why: "He knows what benefits His servants and is the Most Wise about that." },
        { tf: true, q: "60:10 ends with All-Knowing, All-Wise.", why: "And Allah is All-Knowing, All-Wise." }
      ]
    },
    {
      slug: "the-believers-kept-their-side",
      title: "The believers kept their side",
      line: "The believers obeyed Allah's ruling even when others did not.",
      facts: ["Az-Zuhri reported it", "60:11 settled what was owed"],
      quote: q60(11),
      source: ik(11, "Ibn Kathir reports Az-Zuhri: the believers abided by Allah's decree and paid what they owed, but the idolators refused.", "The believers abided by Allah"),
      difficulty: 4,
      questions: [
        { q: "Who abided by Allah's ruling, per Az-Zuhri?", a: "The believers", wrong: ["The idolators", "No one", "Only traders"], why: "The believers abided by Allah's decree and paid what they owed." },
        { q: "What did the other side do?", a: "They refused", wrong: ["They paid double", "They thanked them", "They became Muslim"], why: "However, the idolators refused to accept Allah's judgement." },
        { tf: true, q: "60:11 made sure Muslim husbands were not wronged.", why: "Then pay those whose wives have gone, the equivalent of what they had spent." }
      ]
    },
    {
      slug: "taqwa-of-allah",
      title: "Have Taqwa of Allah",
      line: "60:11 ends: fear Allah, the One in Whom you believe.",
      facts: ["Faith brings Taqwa", "Taqwa keeps us fair"],
      quote: q60(11),
      source: ik(11, "Ibn Kathir quotes the end of 60:11: and have Taqwa of Allah, the One in Whom you are believers.", "And have Taqwa of Allah, the One in Whom your are believers"),
      difficulty: 1,
      questions: [
        { q: "How does 60:11 end?", a: "Have Taqwa of Allah", wrong: ["Go to sleep", "Count your wealth", "Leave the city"], why: "And have Taqwa of Allah, the One in Whom you are believers." },
        { q: "In whom do the believers believe?", a: "Allah", wrong: ["Idols", "Kings", "Stars"], why: "The One in Whom you are believers." },
        { tf: true, q: "Taqwa is linked to faith in 60:11.", why: "And have Taqwa of Allah, the One in Whom you are believers." }
      ]
    },
    {
      slug: "the-womens-pledge",
      title: "The women's pledge",
      line: "Believing women pledged faith and goodness to the Prophet ﷺ.",
      facts: ["Bay'ah: a pledge", "Aishah described it"],
      quote: q60(12),
      source: hadith("bukhari", "4891", "Aishah", "Sahih", "Aishah said the Prophet ﷺ examined the believing women by 60:12, and when one accepted, he said: I have accepted your pledge of allegiance.", "I have accepted your pledge of allegiance"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ say to a woman who agreed?", a: "I have accepted your pledge", wrong: ["Go home", "Pay first", "Come tomorrow"], why: "I have accepted your pledge of allegiance." },
        { q: "Who described the women's pledge?", a: "Aishah", wrong: ["Hind", "Asma", "Hafsah"], why: "Aisha the wife of the Prophet ﷺ said, Allah's Messenger used to examine the believing women." },
        { tf: true, q: "He took the women's pledge by words.", why: "He did not receive their pledge except by saying: I have accepted your pledge." }
      ]
    },
    {
      slug: "no-partners-no-stealing",
      title: "No partners, no stealing",
      line: "They pledged to worship Allah alone and never steal.",
      facts: ["Shirk is the greatest sin", "Stealing means others' property"],
      quote: q60(12),
      source: ik(12, "Ibn Kathir explains they will not steal as meaning the property of other people.", "meaning, the property of other people"),
      difficulty: 1,
      questions: [
        { q: "What is the first promise in 60:12?", a: "Not to associate anything with Allah", wrong: ["Not to travel", "Not to trade", "Not to speak"], why: "That they will not associate anything with Allah." },
        { q: "What does not stealing cover, per Ibn Kathir?", a: "The property of others", wrong: ["Only gold", "Only food", "Only animals"], why: "That they will not steal, meaning, the property of other people." },
        { tf: true, q: "The pledge begins with Tawhid.", why: "That they will not associate anything with Allah." }
      ]
    },
    {
      slug: "a-clean-honest-life",
      title: "A clean, honest life",
      line: "They promised chastity, care for children and no slander.",
      facts: ["Protect every child's life", "No false claims about others"],
      quote: q60(12),
      source: ik(12, "Ibn Kathir says people before Islam used to harm their children because they feared poverty, and Islam forbade it.", "because they feared poverty"),
      difficulty: 3,
      questions: [
        { q: "Why did some people before Islam harm their children?", a: "They feared poverty", wrong: ["They were bored", "They were rich", "For fun"], why: "The people of Jahiliyyah used to kill their children because they feared poverty." },
        { q: "What did they promise not to utter, in 60:12?", a: "Slander", wrong: ["Prayers", "Greetings", "Thanks"], why: "And that they will not utter slander." },
        { tf: true, q: "Islam protects the lives of children.", why: "That they will not kill their children." }
      ]
    },
    {
      slug: "obey-in-what-is-good",
      title: "Obey in what is good",
      line: "They pledged to obey the Prophet ﷺ in Ma'ruf, what is good.",
      facts: ["Ma'ruf: what is right and good", "Obedience to him is in good only"],
      quote: q60(12),
      source: ik(12, "Ibn Kathir quotes Ibn Abbas: this was one of the conditions which Allah imposed on the women.", "This was one of the conditions which Allah imposed on the women"),
      difficulty: 3,
      questions: [
        { q: "In what did they pledge to obey?", a: "In Ma'ruf, what is good", wrong: ["In everything bad", "In trade only", "In nothing"], why: "And that they will not disobey you in Ma'ruf (good)." },
        { q: "What did Maymun bin Mihran say?", a: "Ma'ruf is itself obedience", wrong: ["Obey anyone", "Obey no one", "Obey kings"], why: "Allah did not order obedience to His Prophet for other than Ma'ruf, and Ma'ruf is itself obedience." },
        { tf: true, q: "The Prophet ﷺ only ever ordered what is good.", why: "Allah commanded that His Messenger, the best of His creation, be obeyed in that which is Ma'ruf." }
      ]
    },
    {
      slug: "as-much-as-you-can",
      title: "As much as you can",
      line: "The Prophet ﷺ told the women: as much as you are able.",
      facts: ["Umaymah narrated it", "Allah does not burden beyond ability"],
      quote: q60(12),
      source: hadith("nasai", "4190", "Umaymah bint Ruqayqah", "Sahih", "Umaymah said they pledged to the Prophet ﷺ among a group of women, and he said: in as much as you can and are able.", "In as much as you can and are able"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ add to their pledge?", a: "As much as you are able", wrong: ["Do it all today", "Only on Fridays", "Only when rich"], why: "In as much as you can and are able." },
        { q: "Who narrated this?", a: "Umaymah bint Ruqayqah", wrong: ["Hind bint Utbah", "Umm Kulthum", "Zaynab"], why: "It was narrated that Umaimah bint Ruqaiqah said." },
        { tf: true, q: "The women said Allah and His Messenger are merciful to them.", why: "Allah and His Messenger are more merciful to us than we are to ourselves." }
      ]
    },
    {
      slug: "ask-forgiveness-for-them",
      title: "Ask forgiveness for them",
      line: "Accept their pledge and ask Allah to forgive them.",
      facts: ["Allah is Oft-Forgiving", "Allah is Most Merciful"],
      quote: q60(12),
      source: ik(12, "Ibn Kathir quotes 60:12: then accept their pledge, and ask Allah to forgive them; verily, Allah is Oft-Forgiving, Most Merciful.", "then accept their pledge, and ask Allah to forgive them"),
      difficulty: 1,
      questions: [
        { q: "What was the Prophet ﷺ told to do after the pledge?", a: "Ask Allah to forgive them", wrong: ["Send them away", "Test them again", "Charge a fee"], why: "Then accept their pledge, and ask Allah to forgive them." },
        { q: "Which two Names end 60:12?", a: "Oft-Forgiving, Most Merciful", wrong: ["Almighty, All-Wise", "Rich, Praised", "King, Pure"], why: "Verily, Allah is Oft-Forgiving, Most Merciful." },
        { tf: true, q: "60:12 ends with hope and mercy.", why: "Verily, Allah is Oft-Forgiving, Most Merciful." }
      ]
    },
    {
      slug: "the-closing-warning",
      title: "The closing warning",
      line: "The surah ends as it began, warning against wrong alliances.",
      facts: ["Start and end match", "Loyalty belongs to Allah"],
      quote: q60(13),
      source: ik(13, "Ibn Kathir says just like in the beginning of the surah, Allah forbids taking the disbelievers as protecting friends at the end.", "Just like in the beginning of the Surah, Allah the Exalted forbids taking the disbelievers as protecting friends"),
      difficulty: 2,
      questions: [
        { q: "How does the surah end, per Ibn Kathir?", a: "As it began", wrong: ["With a story", "With a list", "With a question"], why: "Just like in the beginning of the Surah, Allah the Exalted forbids taking the disbelievers as protecting friends." },
        { q: "Whom should believers not take as friends, in 60:13?", a: "Those Allah is angry with", wrong: ["Their neighbors", "Their parents", "Their teachers"], why: "Take not as friends the people who incurred the wrath of Allah." },
        { tf: true, q: "60:1 and 60:13 give the same warning.", why: "Just like in the beginning of the Surah, Allah forbids taking the disbelievers as protecting friends at the end." }
      ]
    },
    {
      slug: "despair-of-the-hereafter",
      title: "Despair of the Hereafter",
      line: "Deniers of the Hereafter lose hope of meeting the dead again.",
      facts: ["Believers hope to meet again", "Faith in the Hereafter gives hope"],
      quote: q60(13),
      source: ik(13, "Ibn Kathir gives one meaning: the disbelievers despair of meeting their buried relatives again, because they do not believe in Resurrection.", "the disbelievers despair of ever again meeting their relatives buried in graves"),
      difficulty: 3,
      questions: [
        { q: "Why do they lose hope of meeting the dead?", a: "They deny the Resurrection", wrong: ["They forgot them", "They moved far", "They are busy"], why: "Because they do not believe in Resurrection or being brought back to life." },
        { q: "How many meanings does Ibn Kathir give?", a: "Two", wrong: ["One", "Five", "Ten"], why: "This has two possible meanings." },
        { tf: true, q: "Belief in the Hereafter gives believers hope.", why: "They have no hope that they will meet them again, according to their creed." }
      ]
    }
  ]
};

export const MUMTAHANAH_UNITS: readonly DeepUnit[] = [MUMTAHANAH_ONE, MUMTAHANAH_TWO, MUMTAHANAH_THREE, MUMTAHANAH_FOUR];
