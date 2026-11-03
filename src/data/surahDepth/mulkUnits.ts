import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-Mulk ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-Mulk 67:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_67_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-Mulk 67:${ayah}`,
    url: `https://quran.com/67:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 67:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q67 = (ayah: number) => quranQuote(67, ayah);

/** Ayahs 1 to 5: the surah that intercedes, the dominion, death and life as a test, and the flawless heavens. */
const MULK_ONE: DeepUnit = {
  key: "mulk1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-mulk",
  name: "Al-Mulk, ayahs 1 to 5",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mulk",
  lessons: [
    {
      slug: "the-surah-that-intercedes",
      title: "The surah that intercedes",
      line: "A surah of thirty ayahs pleads for its reciter until forgiven.",
      facts: ["Al-Mulk has 30 ayahs", "Also called Tabarak"],
      quote: q67(1),
      source: hadith("tirmidhi", "2891", "Abu Hurayrah", "Hasan (Darussalam)", "The Prophet ﷺ said a surah of thirty ayahs intercedes for a man until he is forgiven: Tabarak Alladhi Biyadihil-Mulk.", "which intercedes for a man until he is forgiven"),
      difficulty: 1,
      questions: [
        { q: "How many ayahs does Al-Mulk have?", a: "Thirty", wrong: ["Seven", "Ten", "One hundred"], why: "There is a Surah in the Quran of thirty Ayat, which intercedes for a man until he is forgiven." },
        { q: "What does the surah do for its reciter?", a: "Intercedes until he is forgiven", wrong: ["Makes him rich", "Makes him famous", "Nothing at all"], why: "Which intercedes for a man until he is forgiven. It is Tabarak Alladhi Biyadihil-Mulk." },
        { tf: true, q: "Al-Mulk is also known by its first word, Tabarak.", why: "It is Surah Tabarak Alladhi Biyadihil-Mulk." }
      ]
    },
    {
      slug: "dominion-in-his-hand",
      title: "All dominion is His",
      line: "Allah owns all control; no one can undo what He decrees.",
      facts: ["Al-Mulk: the dominion", "Tabarak: blessed is He"],
      quote: q67(1),
      source: ik(1, "Ibn Kathir says the dominion is in Allah's Hand: He deals with His creatures as He wishes and none can reverse His decree.", "He deals with all of His creatures however He wishes and there is none who can reverse His decree"),
      difficulty: 2,
      questions: [
        { q: "In whose Hand is the dominion?", a: "Allah's", wrong: ["The kings'", "The rich", "No one's"], why: "Blessed be He in Whose Hand is the dominion; and He is Able to do all things." },
        { q: "Who can reverse Allah's decree?", a: "No one", wrong: ["A strong king", "A large army", "A clever man"], why: "There is none who can reverse His decree." },
        { tf: false, q: "Some rulers can overturn what Allah decides.", why: "He deals with all of His creatures however He wishes and there is none who can reverse His decree." }
      ]
    },
    {
      slug: "able-to-do-all-things",
      title: "Able to do all things",
      line: "Allah is never questioned, for His power, wisdom and justice.",
      facts: ["Power with wisdom", "Always just"],
      quote: q67(1),
      source: ik(1, "Ibn Kathir says Allah is not questioned about what He does, because of His force, His wisdom and His justice.", "He is not questioned concerning what He does because of His force, His wisdom and His justice"),
      difficulty: 2,
      questions: [
        { q: "How does 67:1 end?", a: "He is Able to do all things", wrong: ["He is far away", "He is tired", "He needs help"], why: "And He is Able to do all things." },
        { q: "Which three things does Ibn Kathir name?", a: "His force, wisdom and justice", wrong: ["His wealth and army", "His palace and gold", "His age and size"], why: "Because of His force, His wisdom and His justice." },
        { tf: true, q: "Allah's power always comes with wisdom and justice.", why: "He is not questioned concerning what He does because of His force, His wisdom and His justice." }
      ]
    },
    {
      slug: "death-and-life-a-test",
      title: "Death and life are a test",
      line: "Allah created death and life to test who is best in deeds.",
      facts: ["Life is a test", "Death is also created"],
      quote: q67(2),
      source: ik(2, "Ibn Kathir says Allah brought creation into existence from nothing to test it and see who is best in deeds.", "He brought creation into existence from nothing in order to test the creatures"),
      difficulty: 2,
      questions: [
        { q: "Why did Allah create death and life?", a: "To test us", wrong: ["For no reason", "To scare us", "For fun"], why: "Who has created death and life that He may test you which of you is best in deed." },
        { q: "From what did Allah bring creation?", a: "From nothing", wrong: ["From old stars", "From the sea", "From other gods"], why: "He brought creation into existence from nothing in order to test the creatures." },
        { tf: false, q: "Life has no purpose in Islam.", why: "Who has created death and life that He may test you which of you is best in deed." }
      ]
    },
    {
      slug: "best-not-most",
      title: "Best, not most",
      line: "Allah asks who is best in deeds, not who does the most.",
      facts: ["Quality over quantity", "Sincere and correct"],
      quote: q67(2),
      source: ik(2, "Ibn Kathir points out that Allah said best in deeds, and did not say who does the most deeds.", "It should be noted that Allah did not say"),
      difficulty: 3,
      questions: [
        { q: "What does Allah test us for?", a: "Who is best in deed", wrong: ["Who is richest", "Who is tallest", "Who talks most"], why: "That He may test you which of you is best in deed." },
        { q: "What did Allah not say, per Ibn Kathir?", a: "Who does the most deeds", wrong: ["Who is best", "Who is tested", "Who is created"], why: "It should be noted that Allah did not say which of you does the most deeds." },
        { tf: true, q: "Doing a deed well matters more than doing many.", why: "Allah said best in deed. Allah did not say which of you does the most deeds." }
      ]
    },
    {
      slug: "mighty-yet-forgiving",
      title: "Mighty, yet forgiving",
      line: "Allah is the Almighty, yet He forgives all who turn back.",
      facts: ["Al-Aziz: the Almighty", "Al-Ghafur: the Forgiving"],
      quote: q67(2),
      source: ik(2, "Ibn Kathir says even though Allah is Almighty, He forgives, shows mercy, pardons and excuses those who repent.", "Even though Allah is Almighty, He also forgives, shows mercy, pardons and excuses"),
      difficulty: 2,
      questions: [
        { q: "Which two Names end 67:2?", a: "Almighty, Oft-Forgiving", wrong: ["Hearing, Seeing", "First, Last", "King, Holy"], why: "And He is the Almighty, the Oft-Forgiving." },
        { q: "Whom does Allah forgive, per Ibn Kathir?", a: "Whoever turns to Him", wrong: ["No one", "Only angels", "Only kings"], why: "He is Most Forgiving to whoever turns to Him in repentance and seeks His pardon." },
        { tf: false, q: "Allah's might stops Him from forgiving.", why: "Even though Allah is Almighty, He also forgives, shows mercy, pardons and excuses." }
      ]
    },
    {
      slug: "seven-heavens",
      title: "Seven heavens",
      line: "Allah made seven heavens, one above the other.",
      facts: ["Seven layers above us", "Seen in the Night Journey"],
      quote: q67(3),
      source: ik(3, "Ibn Kathir says the seven heavens are stacked one on top of the other.", "meaning stacked one on top of the other"),
      difficulty: 1,
      questions: [
        { q: "How many heavens did Allah create?", a: "Seven", wrong: ["Two", "Ten", "One"], why: "Who has created the seven heavens one above the other." },
        { q: "How are the heavens arranged?", a: "One above the other", wrong: ["Side by side", "Upside down", "In a circle on earth"], why: "Meaning stacked one on top of the other." },
        { tf: true, q: "The heavens are in layers above each other.", why: "Who has created the seven heavens one above the other." }
      ]
    },
    {
      slug: "no-flaw-in-creation",
      title: "No flaw at all",
      line: "Look at the sky: you will not find a single flaw.",
      facts: ["Allah's work is perfect", "Look and reflect"],
      quote: q67(3),
      source: ik(3, "Ibn Kathir says the heavens were made flawlessly, with no conflict, deficiency, flaw or defect.", "having no disunion, conflict, inconsistency, deficiency, flaw or defect"),
      difficulty: 2,
      questions: [
        { q: "What do we see in the Most Gracious's creation?", a: "No fault", wrong: ["Many cracks", "Big holes", "Broken parts"], why: "You can see no fault in the creation of the Most Gracious." },
        { q: "What does rifts mean, per Ibn Abbas?", a: "Cracks", wrong: ["Clouds", "Birds", "Rain"], why: "Ibn Abbas, Mujahid, Ad-Dahhak and others said it means cracks." },
        { tf: false, q: "The sky is full of cracks and tears.", why: "Having no disunion, conflict, inconsistency, deficiency, flaw or defect." }
      ]
    },
    {
      slug: "look-again",
      title: "Look again and again",
      line: "Look again and again: your sight returns tired, finding no flaw.",
      facts: ["Khasi: humbled", "No flaw to be found"],
      quote: q67(4),
      source: ik(4, "Ibn Kathir says no matter how long you look, your sight returns to you, unable to find any flaw.", "if you continuously looked, no matter how much you look, your sight will return to you"),
      difficulty: 2,
      questions: [
        { q: "What happens to your sight after looking again?", a: "Returns tired, finding no flaw", wrong: ["Finds many flaws", "Becomes sharper", "Sees a door"], why: "Your sight will return to you Khasi, and worn out." },
        { q: "What does Khasi mean, per Ibn Abbas?", a: "Humbled", wrong: ["Happy", "Angry", "Sleepy"], why: "Ibn Abbas said that Khasi means humiliated." },
        { tf: true, q: "Looking closely at the sky shows Allah's perfect work.", why: "Due to the inability to see any flaw or defect in Allah's creation." }
      ]
    },
    {
      slug: "worn-out-sight",
      title: "Worn out from looking",
      line: "The eyes tire from looking, yet find no defect anywhere.",
      facts: ["Hasir: worn out", "Creation is perfect"],
      quote: q67(4),
      source: ik(4, "Ibn Kathir says the sight becomes exhausted from looking again and again without finding any deficiency.", "exhausted and broken down feebleness due to the great amount of repeated looking without being able to detect any deficiency"),
      difficulty: 3,
      questions: [
        { q: "Why does the sight get worn out?", a: "Repeated looking, no flaw found", wrong: ["Bright sunlight", "Lack of sleep", "Too much dust"], why: "Due to the great amount of repeated looking without being able to detect any deficiency." },
        { q: "What did Qatadah say look again means?", a: "Look twice", wrong: ["Close your eyes", "Look away", "Never look"], why: "Then look again and yet again, Qatadah said: it means look twice." },
        { tf: false, q: "With enough looking, you will find a flaw.", why: "Without being able to detect any deficiency." }
      ]
    },
    {
      slug: "lamps-in-the-sky",
      title: "Lamps in the sky",
      line: "Allah adorned the nearest heaven with stars like lamps.",
      facts: ["Stars beautify the sky", "Some move, some stay"],
      quote: q67(5),
      source: ik(5, "Ibn Kathir says the lamps are the stars placed in the heavens, some moving and some stationary.", "This refers to the stars which have been placed in the heavens, some moving and some stationary"),
      difficulty: 1,
      questions: [
        { q: "What are the lamps in 67:5?", a: "The stars", wrong: ["Candles", "Lanterns", "Fireflies"], why: "This refers to the stars which have been placed in the heavens." },
        { q: "Which heaven did Allah adorn with them?", a: "The nearest heaven", wrong: ["The seventh", "The earth", "The sea"], why: "And indeed We have adorned the nearest heaven with lamps." },
        { tf: true, q: "Some stars move and some stay in place.", why: "Some moving and some stationary." }
      ]
    },
    {
      slug: "three-purposes-of-stars",
      title: "Why the stars were made",
      line: "Qatadah: stars beautify the sky, guard it and guide travelers.",
      facts: ["Beauty, guarding, guiding", "No fortune-telling"],
      quote: q67(5),
      source: ik(5, "Qatadah said stars were created for three purposes: adornment for the sky, missiles against the devils, and signs for navigation.", "Allah created them as adornment for the heaven … as signs for navigation"),
      difficulty: 2,
      questions: [
        { q: "How many purposes for the stars did Qatadah name?", a: "Three", wrong: ["Ten", "One", "Seven"], why: "These stars were only created for three purposes." },
        { q: "Which is one of those purposes?", a: "Signs for navigation", wrong: ["Telling fortunes", "Choosing names", "Predicting luck"], why: "As adornment for the heaven, as missiles for the devils and as signs for navigation." },
        { tf: false, q: "Stars tell us our future and luck.", why: "Whoever seeks to interpret any other meanings for them has spoken with his own opinion." }
      ]
    },
    {
      slug: "guarding-the-sky",
      title: "Guarding the sky",
      line: "Meteors from the stars drive the devils away from the sky.",
      facts: ["Shayatin: devils", "The sky is guarded"],
      quote: q67(5),
      source: ik(5, "Ibn Kathir explains that the stars themselves are not thrown; it is the meteors beneath them that are thrown at the devils.", "it is the meteors beneath them that are thrown"),
      difficulty: 3,
      questions: [
        { q: "What is thrown at the devils?", a: "Meteors beneath the stars", wrong: ["The stars themselves", "The moon", "Clouds"], why: "It is the meteors beneath them that are thrown and they are taken from the stars." },
        { q: "Whom are the missiles against?", a: "The devils", wrong: ["The birds", "The angels", "The people"], why: "And We have made such lamps as missiles to drive away the Shayatin." },
        { tf: true, q: "Allah guards the sky from the devils.", why: "As missiles for the devils." }
      ]
    }
  ]
};

/** Ayahs 6 to 14: the warners who came, regret for not listening, fearing Allah unseen, and the Knower of hearts. */
const MULK_TWO: DeepUnit = {
  key: "mulk2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-mulk",
  name: "Al-Mulk, ayahs 6 to 14",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mulk",
  lessons: [
    {
      slug: "the-worst-destination",
      title: "The worst destination",
      line: "Those who reject their Lord face the worst of endings.",
      facts: ["Choose the good path", "Allah warns out of mercy"],
      quote: q67(6),
      source: ik(6, "Ibn Kathir says the punishment for those who disbelieve in their Lord is the worst end and a terrible destiny.", "This means that this will be the worst end and a terrible destiny"),
      difficulty: 2,
      questions: [
        { q: "What does 67:6 call that destination?", a: "The worst destination", wrong: ["A resting place", "A fair place", "A garden"], why: "And worst indeed is that destination." },
        { q: "Whom does 67:6 warn?", a: "Those who disbelieve in their Lord", wrong: ["The angels", "The prophets", "The believers"], why: "And for those who disbelieve in their Lord is the torment of Hell." },
        { tf: true, q: "Allah warns us so that we choose the right path.", why: "This means that this will be the worst end and a terrible destiny." }
      ]
    },
    {
      slug: "the-fire-is-angry",
      title: "The Fire is angry",
      line: "The Fire nearly bursts with anger at those who rejected Allah.",
      facts: ["Hell is real", "Stay far from it"],
      quote: q67(7),
      source: ik(7, "Ibn Kathir says parts of the Fire almost break apart from each other because of the severity of its anger.", "some parts of it almost break apart from other parts due to the severity of its rage"),
      difficulty: 3,
      questions: [
        { q: "What does the Fire almost do?", a: "Burst with fury", wrong: ["Go out", "Freeze", "Fall asleep"], why: "It almost bursts up with fury." },
        { q: "What did Ibn Jarir say Shahiq means?", a: "The sound of shouting", wrong: ["A soft breeze", "A song", "Silence"], why: "Ibn Jarir said, This means the sound of shouting." },
        { tf: false, q: "Hell is calm and quiet.", why: "Some parts of it almost break apart from other parts due to the severity of its rage." }
      ]
    },
    {
      slug: "did-no-warner-come",
      title: "Did no warner come?",
      line: "The keepers ask: did no warner come to you?",
      facts: ["Allah sent warners", "Allah is always just"],
      quote: q67(8),
      source: ik(8, "Ibn Kathir says these ayahs remind us of Allah's justice: He punishes no one until proof is established and a Messenger is sent.", "He does not punish anyone until the proof has been established against them and a Messenger has been sent to them"),
      difficulty: 2,
      questions: [
        { q: "What do the keepers ask each group?", a: "Did no warner come to you?", wrong: ["Are you hungry?", "Where is your home?", "What is your name?"], why: "Its keepers will ask: Did no warner come to you?" },
        { q: "When does Allah punish, per Ibn Kathir?", a: "After a Messenger is sent", wrong: ["Without warning", "At random", "Before any proof"], why: "He does not punish anyone until the proof has been established and a Messenger has been sent to them." },
        { tf: true, q: "Allah is just and warns before He punishes.", why: "And We never punish until We have sent a Messenger." }
      ]
    },
    {
      slug: "they-rejected-the-warner",
      title: "They rejected the warner",
      line: "They admit a warner came, but they rejected him.",
      facts: ["The message reached them", "They chose to deny"],
      quote: q67(9),
      source: ik(9, "Ibn Kathir links 67:9 to 17:15: Allah never punishes until He has sent a Messenger.", "And We never punish until We have sent a Messenger"),
      difficulty: 2,
      questions: [
        { q: "What will they answer the keepers?", a: "A warner came, but we rejected him", wrong: ["No one came", "We were never told", "We were busy"], why: "Yes, indeed a warner did come to us, but we rejected him." },
        { q: "Which ayah does Ibn Kathir compare?", a: "17:15, never punish without a Messenger", wrong: ["2:255", "1:1", "112:1"], why: "And We never punish until We have sent a Messenger, 17:15." },
        { tf: false, q: "They will say no warner ever came.", why: "They will say: Yes, indeed a warner did come to us, but we rejected him." }
      ]
    },
    {
      slug: "if-only-we-had-listened",
      title: "If only we had listened",
      line: "They regret: had we listened or thought, we would be saved.",
      facts: ["Listen to the truth", "Use your mind"],
      quote: q67(10),
      source: ik(10, "Ibn Kathir explains their regret: if they had used their minds or listened to the truth Allah revealed, they would not have disbelieved.", "if we would have benefited from our intellects or listened to the truth that Allah revealed"),
      difficulty: 2,
      questions: [
        { q: "What two things do they wish they had done?", a: "Listened and used their minds", wrong: ["Eaten and slept", "Run and hid", "Bought and sold"], why: "Had we but listened or used our intelligence, we would not have been among the dwellers of the blazing Fire." },
        { q: "What did they fail to listen to?", a: "The truth Allah revealed", wrong: ["Music", "Gossip", "Old stories"], why: "If we would have benefited from our intellects or listened to the truth that Allah revealed." },
        { tf: true, q: "Islam asks us to listen and to think.", why: "Had we but listened or used our intelligence." }
      ]
    },
    {
      slug: "they-confess",
      title: "They confess their sin",
      line: "In the end they confess, but too late to help them.",
      facts: ["Regret then is useless", "Repent now"],
      quote: q67(11),
      source: ik(11, "Ibn Kathir quotes a report that people will not be destroyed until they themselves confess their guilt.", "The people will not be destroyed until they themselves confess their guilt"),
      difficulty: 3,
      questions: [
        { q: "What will they finally do?", a: "Confess their sin", wrong: ["Deny everything", "Blame the angels", "Stay silent"], why: "Then they will confess their sin." },
        { q: "When is regret useless?", a: "On that Day, when it is too late", wrong: ["Today", "In Ramadan", "While alive"], why: "They will feel remorseful when such remorse will be of no benefit to them." },
        { tf: false, q: "Confessing on that Day will save them.", why: "They will feel remorseful when such remorse will be of no benefit to them." }
      ]
    },
    {
      slug: "fear-him-unseen",
      title: "Fear Him unseen",
      line: "Fear Allah when alone, and gain forgiveness and great reward.",
      facts: ["Allah sees when no one does", "Private goodness counts"],
      quote: q67(12),
      source: ik(12, "Ibn Kathir says this person avoids sin and obeys Allah when no one sees him except Allah, so he gets forgiveness and a great reward.", "he performs acts of obedience when no one sees him except Allah"),
      difficulty: 2,
      questions: [
        { q: "What do those who fear Allah unseen get?", a: "Forgiveness and a great reward", wrong: ["Nothing", "Only praise", "Only money"], why: "Theirs will be forgiveness and a great reward." },
        { q: "When does this person obey Allah?", a: "Even when no one sees", wrong: ["Only in public", "Only when praised", "Never"], why: "He performs acts of obedience when no one sees him except Allah." },
        { tf: true, q: "Doing good in private is loved by Allah.", why: "Verily, those who fear their Lord unseen, theirs will be forgiveness and a great reward." }
      ]
    },
    {
      slug: "secret-charity",
      title: "Secret charity",
      line: "Allah shades one whose left hand knows not what his right gave.",
      facts: ["Seven under His shade", "Hide your charity"],
      quote: q67(12),
      source: hadith("bukhari", "660", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah will shade seven people on a Day with no shade but His, including one who gives charity so secretly that his left hand does not know what his right gave.", "a man who gives charitable gifts so secretly that his left hand does not know what his right hand has given"),
      difficulty: 2,
      questions: [
        { q: "How many people get Allah's shade in the hadith?", a: "Seven", wrong: ["Two", "Forty", "One"], why: "Allah will give shade, to seven, on the Day when there will be no shade but His." },
        { q: "How secretly does the man give charity?", a: "His left hand does not know", wrong: ["He tells everyone", "He posts it online", "He shouts it"], why: "A man who gives charitable gifts so secretly that his left hand does not know what his right hand has given." },
        { tf: false, q: "Charity counts only if people see it.", why: "His left hand does not know what his right hand has given." }
      ]
    },
    {
      slug: "secret-or-open",
      title: "Secret or open",
      line: "Whisper or speak aloud, Allah knows what is in every heart.",
      facts: ["Allah knows thoughts", "Keep the heart clean"],
      quote: q67(13),
      source: ik(13, "Ibn Kathir says Allah knows what is in the breasts, meaning what occurs in the hearts.", "meaning, that which occurs in the hearts"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, per 67:13?", a: "What is in the breasts", wrong: ["Only loud words", "Only actions", "Only the past"], why: "Verily, He is the All-Knower of what is in the breasts." },
        { q: "What does in the breasts mean?", a: "What occurs in the hearts", wrong: ["The lungs", "Clothes", "Pockets"], why: "Meaning, that which occurs in the hearts." },
        { tf: true, q: "Allah knows our hidden thoughts.", why: "Whether you keep your talk secret or disclose it, He is the All-Knower of what is in the breasts." }
      ]
    },
    {
      slug: "allah-looks-at-hearts",
      title: "Allah looks at hearts",
      line: "Allah looks not at bodies or faces, but at hearts.",
      facts: ["Looks do not matter to Him", "The heart matters most"],
      quote: q67(13),
      source: hadith("muslim", "2564", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah does not look to your bodies nor your faces, but He looks to your hearts.", "Allah does not look to your bodies nor to your faces but He looks to your hearts"),
      difficulty: 2,
      questions: [
        { q: "What does Allah look to?", a: "Our hearts", wrong: ["Our faces", "Our clothes", "Our houses"], why: "Allah does not look to your bodies nor to your faces but He looks to your hearts." },
        { q: "Where did the Prophet ﷺ point?", a: "Toward the heart", wrong: ["To the sky", "To his feet", "To the door"], why: "And he pointed towards the heart with his fingers." },
        { tf: false, q: "Allah judges us by our looks.", why: "Allah does not look to your bodies nor to your faces but He looks to your hearts." }
      ]
    },
    {
      slug: "the-creator-knows",
      title: "The Creator knows",
      line: "Would the One who created not know His creation?",
      facts: ["The Maker knows His work", "Nothing is hidden"],
      quote: q67(14),
      source: ik(14, "Ibn Kathir explains 67:14 as: does the Creator not know?", "Should not He Who has created know"),
      difficulty: 2,
      questions: [
        { q: "What does 67:14 ask?", a: "Should not the Creator know?", wrong: ["Who made the sky?", "Where is the sea?", "When is night?"], why: "Should not He Who has created know?" },
        { q: "Why must Allah know everything about us?", a: "He created us", wrong: ["Someone told Him", "He guessed", "He read a book"], why: "Should not He Who has created know? This means, does the Creator not know?" },
        { tf: true, q: "Our Creator knows us better than we know ourselves.", why: "Should not He Who has created know? And He is the Most Kind and Courteous, All-Aware." }
      ]
    },
    {
      slug: "al-latif-al-khabir",
      title: "The Most Kind, All-Aware",
      line: "Allah is Al-Latif, the Most Kind, and Al-Khabir, the All-Aware.",
      facts: ["Al-Latif: Subtle and Kind", "Al-Khabir: All-Aware"],
      quote: q67(14),
      source: ik(14, "Ibn Kathir quotes the end of 67:14: He is the Most Kind and Courteous, All-Aware of everything.", "And He is the Most Kind and Courteous, All-Aware"),
      difficulty: 2,
      questions: [
        { q: "Which two Names end 67:14?", a: "Most Kind, All-Aware", wrong: ["Mighty, Severe", "First, Last", "Living, Eternal"], why: "And He is the Most Kind and Courteous, All-Aware." },
        { q: "What does Al-Khabir mean?", a: "All-Aware", wrong: ["All-Rich", "All-Strong", "All-Holy"], why: "And He is the Most Kind and Courteous, All-Aware of everything." },
        { tf: false, q: "Allah is unaware of small matters.", why: "And He is the Most Kind and Courteous, All-Aware of everything." }
      ]
    }
  ]
};

/** Ayahs 15 to 22: the earth made easy, trusting Allah like the birds, His patience, and walking upright. */
const MULK_THREE: DeepUnit = {
  key: "mulk3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-mulk",
  name: "Al-Mulk, ayahs 15 to 22",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mulk",
  lessons: [
    {
      slug: "earth-made-easy",
      title: "The earth made easy",
      line: "Allah made the earth a steady home for us to live on.",
      facts: ["Mountains and springs", "Paths and fruits"],
      quote: q67(15),
      source: ik(15, "Ibn Kathir says Allah made the earth subservient by making it a stable home, with mountains, springs, paths and fertile land.", "This is by His making it a stable abode and dwelling place"),
      difficulty: 1,
      questions: [
        { q: "What did Allah make the earth for us?", a: "A stable home", wrong: ["A shaking boat", "A hot oven", "A dark cave"], why: "This is by His making it a stable abode and dwelling place." },
        { q: "What did Allah place in the earth?", a: "Mountains and springs", wrong: ["Nothing at all", "Only sand", "Only ice"], why: "He placed in it mountains and caused water springs to gush forth from it." },
        { tf: true, q: "The steady earth is a gift from Allah.", why: "He it is Who has made the earth subservient to you." }
      ]
    },
    {
      slug: "walk-in-its-paths",
      title: "Walk in its paths",
      line: "Travel the earth to earn and trade, then eat of His provision.",
      facts: ["Work is encouraged", "Provision is from Allah"],
      quote: q67(15),
      source: ik(15, "Ibn Kathir says walk in its paths means travel wherever you wish to seek earnings and trade, knowing efforts only help if Allah makes things easy.", "travel wherever you wish throughout its regions"),
      difficulty: 2,
      questions: [
        { q: "What does walk in its paths mean?", a: "Travel to earn and trade", wrong: ["Stay home always", "Never move", "Only sleep"], why: "Travel wherever you wish throughout its regions to seek earnings and trade." },
        { q: "Whose provision do we eat?", a: "Allah's", wrong: ["The king's", "Our own only", "The stars'"], why: "And eat of His provision." },
        { tf: false, q: "Our efforts succeed without Allah's help.", why: "Know that your efforts will not benefit you anything unless Allah makes matters easy for you." }
      ]
    },
    {
      slug: "work-and-trust",
      title: "Work and trust Allah",
      line: "Working hard does not cancel trusting Allah; we do both.",
      facts: ["Tawakkul: trust in Allah", "Take the means"],
      quote: q67(15),
      source: ik(15, "Ibn Kathir says striving by using the means does not cancel the need to depend upon Allah.", "does not negate the necessity of depending upon Allah"),
      difficulty: 3,
      questions: [
        { q: "What is Tawakkul?", a: "Trusting and depending on Allah", wrong: ["Being lazy", "Never working", "Worrying a lot"], why: "Striving by using the means does not negate the necessity of depending upon Allah." },
        { q: "Should we work if we trust Allah?", a: "Yes, we do both", wrong: ["No, just wait", "Only on Fridays", "Only if rich"], why: "Striving by using the means does not negate the necessity of depending upon Allah." },
        { tf: true, q: "A Muslim works hard and trusts Allah.", why: "Does not negate the necessity of depending upon Allah." }
      ]
    },
    {
      slug: "like-the-birds",
      title: "Like the birds",
      line: "Trust Allah truly and He provides as He provides for birds.",
      facts: ["Birds leave hungry", "They return full"],
      quote: q67(15),
      source: hadith("tirmidhi", "2344", "Umar ibn al-Khattab", "Sahih", "The Prophet ﷺ said if you relied on Allah truly, He would provide for you as He provides for a bird that goes out hungry in the morning and returns full.", "it goes out in the morning empty, and returns full"),
      difficulty: 2,
      questions: [
        { q: "How do the birds leave in the morning?", a: "Empty", wrong: ["Full", "Asleep", "Angry"], why: "It goes out in the morning empty, and returns full." },
        { q: "Who narrated the hadith of the birds?", a: "Umar ibn al-Khattab", wrong: ["Abu Jahl", "Firawn", "Qarun"], why: "Umar bin Al-Khattab narrated that the Messenger of Allah said: rely upon Allah." },
        { tf: false, q: "The birds stay in their nests and wait for food.", why: "The bird searches morning and evening for its sustenance while depending upon Allah." }
      ]
    },
    {
      slug: "to-him-the-return",
      title: "To Him is the return",
      line: "After all our travels, we all return to Allah.",
      facts: ["The Day of Judgement", "Live for the return"],
      quote: q67(15),
      source: ik(15, "Ibn Kathir says and to Him will be the resurrection means the place of return on the Day of Judgement.", "meaning, the place of return on the Day of Judgement"),
      difficulty: 1,
      questions: [
        { q: "How does 67:15 end?", a: "To Him will be the resurrection", wrong: ["To the sea we go", "To dust only", "To nowhere"], why: "And to Him will be the resurrection." },
        { q: "What is the return, per Ibn Kathir?", a: "The Day of Judgement", wrong: ["Going home", "A holiday", "A new job"], why: "Meaning, the place of return on the Day of Judgement." },
        { tf: true, q: "Everyone will return to Allah.", why: "And to Him will be the resurrection." }
      ]
    },
    {
      slug: "allah-is-patient",
      title: "Allah is patient with us",
      line: "Allah could punish at once, yet He forgives and gives time.",
      facts: ["Al-Halim: the Forbearing", "Time to repent"],
      quote: q67(16),
      source: ik(16, "Ibn Kathir says this shows Allah's gentleness and mercy: He is forbearing, pardons and gives time without hastening.", "He is forbearing, He pardons, and He gives respite for an appointed time without hastening"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give people before punishing?", a: "Time to return", wrong: ["Nothing", "Only riches", "A secret"], why: "He gives respite for an appointed time without hastening." },
        { q: "What does 67:16 ask?", a: "Do you feel secure?", wrong: ["Are you hungry?", "Who are you?", "Where is the sea?"], why: "Do you feel secure that He, Who is over the heaven, will not cause the earth to sink with you?" },
        { tf: false, q: "Allah rushes to punish people.", why: "He is forbearing, He pardons, and He gives respite for an appointed time without hastening." }
      ]
    },
    {
      slug: "do-not-feel-too-safe",
      title: "Do not feel too safe",
      line: "Allah can send a storm of stones; do not forget His warning.",
      facts: ["Hasib: a stony wind", "Take warnings seriously"],
      quote: q67(17),
      source: ik(17, "Ibn Kathir says a Hasib is a wind with gravel that would strike them.", "a wind containing gravel that will strike you"),
      difficulty: 3,
      questions: [
        { q: "What is a Hasib, per Ibn Kathir?", a: "A wind with gravel", wrong: ["A rainbow", "A gentle rain", "A bird"], why: "Meaning, a wind containing gravel that will strike you." },
        { q: "What will they come to know?", a: "How His warning was", wrong: ["How to fly", "How to hide", "Nothing"], why: "Then you shall know how has been My warning." },
        { tf: true, q: "We should take Allah's warnings seriously.", why: "Then you shall know how has been My warning." }
      ]
    },
    {
      slug: "those-before-them",
      title: "Those who came before",
      line: "Earlier nations rejected too, and His reproach was severe.",
      facts: ["Learn from history", "Nations were warned"],
      quote: q67(18),
      source: ik(18, "Ibn Kathir says those before them means the previous nations and old generations that have passed.", "from the previous nations and the old generations that have passed"),
      difficulty: 2,
      questions: [
        { q: "Who rejected before them?", a: "Previous nations", wrong: ["The angels", "The birds", "No one"], why: "Meaning, from the previous nations and the old generations that have passed." },
        { q: "What should we learn from them?", a: "Not to reject the truth", wrong: ["To copy them", "To forget them", "Nothing"], why: "And indeed those before them rejected, then how terrible was My reproach." },
        { tf: false, q: "No nation before ever rejected its messenger.", why: "And indeed those before them rejected." }
      ]
    },
    {
      slug: "birds-held-up",
      title: "Who holds up the birds?",
      line: "Only the Most Gracious holds the birds up in the air.",
      facts: ["Flight is a sign", "Allah sees everything"],
      quote: q67(19),
      source: ik(19, "Ibn Kathir says Allah holds the birds in the air by making the air serve them, out of His mercy and gentleness.", "Allah holds them up in the air by subjecting the air to them out of His mercy and His gentleness"),
      difficulty: 1,
      questions: [
        { q: "Who holds the birds up?", a: "The Most Gracious", wrong: ["The wind alone", "The clouds", "Nobody"], why: "None upholds them except the Most Gracious." },
        { q: "Why does Allah hold them up?", a: "Out of His mercy", wrong: ["By accident", "For a prize", "Because they asked"], why: "Out of His mercy and His gentleness." },
        { tf: true, q: "A flying bird is a sign of Allah's mercy.", why: "Allah holds them up in the air by subjecting the air to them out of His mercy." }
      ]
    },
    {
      slug: "gliding-and-flapping",
      title: "Gliding and flapping",
      line: "Birds spread their wings to glide and fold them to fly.",
      facts: ["Allah sees all things", "Watch and reflect"],
      quote: q67(19),
      source: ik(19, "Ibn Kathir says birds sometimes spread their wings out in the wind, gliding, and other times flap them.", "sometimes they spread their wings out in the wind"),
      difficulty: 2,
      questions: [
        { q: "What do birds do with their wings in 67:19?", a: "Spread and fold them", wrong: ["Hide them", "Lose them", "Paint them"], why: "Spreading out their wings and folding them in." },
        { q: "How does 67:19 end?", a: "He is the All-Seer of everything", wrong: ["He is tired", "He is far", "He forgets"], why: "Verily, He is the All-Seer of everything." },
        { tf: false, q: "Birds fly by their own power alone.", why: "None upholds them except the Most Gracious." }
      ]
    },
    {
      slug: "no-army-but-him",
      title: "No helper but Him",
      line: "No army can help you against the Most Gracious.",
      facts: ["Allah is the true Helper", "Idols cannot help"],
      quote: q67(20),
      source: ik(20, "Ibn Kathir says there is no protector or helper for you besides Allah.", "there is no protector or helper for you besides Him"),
      difficulty: 2,
      questions: [
        { q: "Who can be an army besides the Most Gracious?", a: "No one", wrong: ["Idols", "Kings", "Stars"], why: "Meaning, there is no protector or helper for you besides Him." },
        { q: "What are the disbelievers in, per 67:20?", a: "Delusion", wrong: ["Safety", "Truth", "Paradise"], why: "The disbelievers are in nothing but delusion." },
        { tf: true, q: "Allah is our only true protector.", why: "There is no protector or helper for you besides Him." }
      ]
    },
    {
      slug: "who-provides",
      title: "Who else could provide?",
      line: "If Allah held back His provision, no one else could give it.",
      facts: ["Ar-Razzaq: the Provider", "Thank Him for food"],
      quote: q67(21),
      source: ik(21, "Ibn Kathir says there is no one who gives, withholds, creates, provides and helps other than Allah alone.", "There is no one who gives, withholds, creates, provides and helps other than Allah alone"),
      difficulty: 2,
      questions: [
        { q: "Who can provide if Allah withholds?", a: "No one", wrong: ["The market", "The king", "The bank"], why: "There is no one who gives, withholds, creates, provides and helps other than Allah alone." },
        { q: "What do the rejecters persist in?", a: "Pride and fleeing", wrong: ["Thanks and prayer", "Charity", "Patience"], why: "Nay, but they continue to be in pride, and flee." },
        { tf: false, q: "Idols can give provision.", why: "There is no one who gives, withholds, creates, provides and helps other than Allah alone." }
      ]
    },
    {
      slug: "walking-upright",
      title: "Walking upright",
      line: "The believer walks upright; the denier stumbles face down.",
      facts: ["A parable of two people", "Guidance is clear sight"],
      quote: q67(22),
      source: ik(22, "Ibn Kathir says 67:22 is a parable of the believer and the disbeliever: one walks bent over, lost, the other upright on a clear path.", "This is a parable which Allah made of the believer and the disbeliever"),
      difficulty: 2,
      questions: [
        { q: "Who walks upright on a straight path?", a: "The believer", wrong: ["The disbeliever", "The idol", "No one"], why: "This is a parable which Allah made of the believer and the disbeliever." },
        { q: "What is the denier like?", a: "Walking bent, not knowing the way", wrong: ["Running fast", "Flying high", "Sleeping well"], why: "This person does not know where he is going or how. Rather, he is lost, astray and confused." },
        { tf: true, q: "Guidance is like walking with clear sight.", why: "This person who walks upright is on a clear path." }
      ]
    },
    {
      slug: "straight-inside-and-out",
      title: "Straight inside and out",
      line: "The believer is upright within and his path is straight too.",
      facts: ["Same in both lives", "Gathered as they lived"],
      quote: q67(22),
      source: ik(22, "Ibn Kathir says the upright walker is straight within himself and his path is straight, and the same will be true in the Hereafter.", "he is straight within himself while his path is straight as well"),
      difficulty: 3,
      questions: [
        { q: "What is straight about the believer?", a: "Himself and his path", wrong: ["Only his clothes", "Only his hair", "Nothing"], why: "He is straight within himself while his path is straight as well." },
        { q: "When will this likeness also apply?", a: "In the Hereafter too", wrong: ["Never", "Only at night", "Only in dreams"], why: "This is their likeness in this world, and their likeness will be the same in the Hereafter." },
        { tf: false, q: "How we live has no link to how we are raised.", why: "This is their likeness in this world, and their likeness will be the same in the Hereafter." }
      ]
    },
    {
      slug: "the-one-who-made-us-walk",
      title: "He made us walk",
      line: "The One who made people walk on feet can do anything.",
      facts: ["Anas narrated it", "Allah is All-Powerful"],
      quote: q67(22),
      source: hadith("bukhari", "4760", "Anas ibn Malik", "Sahih", "Asked how people could be gathered on their faces, the Prophet ﷺ said the One who made them walk on their feet is able to do that.", "Will not the One Who made him walk on his feet in this world"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ point to as proof of power?", a: "Allah made us walk on feet", wrong: ["The size of mountains", "The color of the sea", "The speed of horses"], why: "Will not the One Who made him walk on his feet in this world, be able to make him walk on his face?" },
        { q: "Who narrated the walking hadith?", a: "Anas ibn Malik", wrong: ["Abu Lahab", "Haman", "Qarun"], why: "Narrated Anas bin Malik: A man said, O Allah's Prophet!" },
        { tf: true, q: "Nothing is too hard for the One who created us.", why: "Will not the One Who made him walk on his feet in this world, be able to make him walk on his face?" }
      ]
    }
  ]
};

/** Ayahs 23 to 30: hearing, sight and hearts, the gathering, only Allah knows the Hour, trusting Him, and the gift of water. */
const MULK_FOUR: DeepUnit = {
  key: "mulk4",
  topicId: "quran_tafseer",
  branchId: "quran-surah-mulk",
  name: "Al-Mulk, ayahs 23 to 30",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Mulk",
  lessons: [
    {
      slug: "hearing-sight-hearts",
      title: "Hearing, sight and hearts",
      line: "Allah created us and gave us hearing, sight and minds.",
      facts: ["Hearts here: minds", "Gifts to use well"],
      quote: q67(23),
      source: ik(23, "Ibn Kathir says Allah created you from nothing and gave you hearing, sight and hearts, meaning intellects and powers of reasoning.", "meaning, intellects and powers of reasoning"),
      difficulty: 1,
      questions: [
        { q: "Which three gifts are named in 67:23?", a: "Hearing, seeing and hearts", wrong: ["Gold, silver and silk", "Wings, fins and horns", "Houses, cars and land"], why: "And endowed you with hearing and seeing, and hearts." },
        { q: "What does hearts mean, per Ibn Kathir?", a: "Intellects and reasoning", wrong: ["Blood", "Feelings only", "Bones"], why: "Meaning, intellects and powers of reasoning." },
        { tf: true, q: "Our minds are a gift from Allah.", why: "And endowed you with hearing and seeing, and hearts, meaning intellects and powers of reasoning." }
      ]
    },
    {
      slug: "little-thanks",
      title: "Little thanks",
      line: "Not using these gifts to obey Allah is giving little thanks.",
      facts: ["Thanks is shown in deeds", "Use gifts for good"],
      quote: q67(23),
      source: ik(23, "Ibn Kathir says little thanks means how little you use the abilities Allah gave you to obey Him.", "how little you use these abilities that Allah has blessed you with to obey Him"),
      difficulty: 2,
      questions: [
        { q: "How does 67:23 end?", a: "Little thanks you give", wrong: ["Much thanks you give", "You sleep well", "You are rich"], why: "Little thanks you give." },
        { q: "How do we truly thank Allah for our senses?", a: "Use them to obey Him", wrong: ["Hide them", "Use them for sin", "Ignore them"], why: "How little you use these abilities that Allah has blessed you with to obey Him." },
        { tf: false, q: "Thanking Allah is only by words, never by deeds.", why: "How little you use these abilities to obey Him, to act according to His commandments." }
      ]
    },
    {
      slug: "spread-over-the-earth",
      title: "Spread over the earth",
      line: "Allah spread us across the earth with many languages and colors.",
      facts: ["Diversity is His sign", "All from one Creator"],
      quote: q67(24),
      source: ik(24, "Ibn Kathir says Allah spread people through the regions of the earth with differing languages, colors, shapes and forms.", "with your differing languages, colors, shapes, appearances and forms"),
      difficulty: 1,
      questions: [
        { q: "How did Allah spread us across the earth?", a: "With many languages and colors", wrong: ["All exactly alike", "In one city", "Only by the sea"], why: "With your differing languages, colors, shapes, appearances and forms." },
        { q: "Who created us on the earth?", a: "Allah", wrong: ["Chance", "The stars", "The sea"], why: "Say: It is He Who has created you on the earth." },
        { tf: true, q: "Different languages and colors are part of Allah's design.", why: "He has spread and distributed you all with your differing languages, colors, shapes." }
      ]
    },
    {
      slug: "gathered-again",
      title: "Gathered again",
      line: "As He spread us out, Allah will gather us all again.",
      facts: ["Al-Hashr: the gathering", "None will be missed"],
      quote: q67(24),
      source: ik(24, "Ibn Kathir says Allah will gather you all just as He separated you, and bring you back as He began you.", "He will gather you all just as He separated you"),
      difficulty: 2,
      questions: [
        { q: "To whom shall we be gathered?", a: "To Allah", wrong: ["To the kings", "To the sea", "To nowhere"], why: "And to Him shall you be gathered." },
        { q: "How will Allah gather us?", a: "As He separated us", wrong: ["Only some of us", "Never", "Only the rich"], why: "He will gather you all just as He separated you." },
        { tf: false, q: "Some people will be forgotten and not gathered.", why: "He will gather you all just as He separated you." }
      ]
    },
    {
      slug: "when-is-the-promise",
      title: "When is the promise?",
      line: "Deniers mock: when will this promise come, if you are truthful?",
      facts: ["The promise is true", "Prepare, do not mock"],
      quote: q67(25),
      source: ik(25, "Ibn Kathir says the deniers asked when the gathering after separation would happen.", "when will this gathering after separation that you are informing us of, occur"),
      difficulty: 2,
      questions: [
        { q: "What did the deniers ask?", a: "When will this promise come?", wrong: ["Who made the sky?", "What is for dinner?", "Where is Makkah?"], why: "They say: When will this promise come to pass, if you are telling the truth?" },
        { q: "What promise did they doubt?", a: "The gathering after death", wrong: ["Rain tomorrow", "A trade deal", "A new king"], why: "When will this gathering after separation that you are informing us of, occur?" },
        { tf: true, q: "Mocking the Day of Judgement does not stop it coming.", why: "Everything that is to occur will occur, even if it takes a long time." }
      ]
    },
    {
      slug: "only-allah-knows-the-hour",
      title: "Only Allah knows the Hour",
      line: "Only Allah knows exactly when the Day of Judgement will come.",
      facts: ["Hidden knowledge", "Be ready always"],
      quote: q67(26),
      source: ik(26, "Ibn Kathir says no one knows the time of the Day of Judgement exactly except Allah, but it is real and will surely happen.", "no one knows the time of the Day of Judgement exactly except Allah"),
      difficulty: 2,
      questions: [
        { q: "Who knows when the Day will come?", a: "Allah only", wrong: ["Fortune-tellers", "Astrologers", "Kings"], why: "No one knows the time of the Day of Judgement exactly except Allah." },
        { q: "What did the Prophet ﷺ say he was?", a: "A plain warner", wrong: ["A fortune-teller", "A king", "A magician"], why: "And I am only a plain warner." },
        { tf: false, q: "Someone can tell the exact date of the Hour.", why: "No one knows the time of the Day of Judgement exactly except Allah." }
      ]
    },
    {
      slug: "jibril-asked-about-the-hour",
      title: "Jibril asked about the Hour",
      line: "Asked about the Hour, he said: the one asked knows no more.",
      facts: ["Jibril came as a man", "He taught the religion"],
      quote: q67(26),
      source: hadith("bukhari", "50", "Abu Hurairah", "Sahih", "When Jibril asked when the Hour would be, the Prophet ﷺ said the one asked knows no more than the one asking.", "The answerer has no better knowledge than the questioner"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ answer about the Hour?", a: "The answerer knows no more", wrong: ["Next year", "In ten days", "Never"], why: "The answerer has no better knowledge than the questioner." },
        { q: "What did he tell about instead?", a: "Its signs", wrong: ["Its date", "Its hour", "Its weather"], why: "But I will inform you about its portents." },
        { tf: true, q: "Even the Prophet ﷺ did not know the time of the Hour.", why: "The answerer has no better knowledge than the questioner." }
      ]
    },
    {
      slug: "only-to-convey",
      title: "His duty is to convey",
      line: "The Prophet's ﷺ duty was to convey, and he did it fully.",
      facts: ["Mubin: clear", "The message reached us"],
      quote: q67(26),
      source: ik(26, "Ibn Kathir explains plain warner as: I am only obligated to convey, and I have done my duty.", "I am only obligated to convey"),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet ﷺ obligated to do?", a: "Convey the message", wrong: ["Force people", "Know the Hour", "Rule the world"], why: "I am only obligated to convey, and verily I have performed my duty." },
        { q: "Did he complete his duty?", a: "Yes, fully", wrong: ["No", "Half of it", "Not yet"], why: "And verily I have performed my duty of conveying towards you." },
        { tf: false, q: "The Prophet ﷺ failed to deliver the message.", why: "Verily I have performed my duty of conveying towards you." }
      ]
    },
    {
      slug: "what-you-were-calling-for",
      title: "What you asked for",
      line: "When it comes near, deniers grieve: it is what they rushed.",
      facts: ["The Day will surely come", "Do not rush the warning"],
      quote: q67(27),
      source: ik(27, "Ibn Kathir says everything that is to occur will occur, even if it takes a long time.", "everything that is to occur will occur, even if it takes a long time"),
      difficulty: 3,
      questions: [
        { q: "How will the deniers' faces look?", a: "Sad and grieving", wrong: ["Happy", "Calm", "Proud"], why: "The faces of those who disbelieve will be sad and grievous." },
        { q: "What will be said to them?", a: "This is what you were calling for", wrong: ["Welcome home", "Go back", "Rest now"], why: "And it will be said: This is what you were calling for!" },
        { tf: true, q: "What Allah promised will surely happen.", why: "Everything that is to occur will occur, even if it takes a long time." }
      ]
    },
    {
      slug: "save-yourselves",
      title: "Save yourselves",
      line: "Our fate cannot save deniers; only repentance can.",
      facts: ["Look to your own soul", "Repentance rescues"],
      quote: q67(28),
      source: ik(28, "Ibn Kathir says nothing can rescue them from Allah except repentance and returning to His religion.", "there is nothing that can rescue you from Allah except repentance"),
      difficulty: 3,
      questions: [
        { q: "What alone can rescue them, per Ibn Kathir?", a: "Repentance", wrong: ["Wealth", "Wishing harm on others", "Hiding"], why: "There is nothing that can rescue you from Allah except repentance." },
        { q: "Would the believers dying save the deniers?", a: "No", wrong: ["Yes", "Partly", "Only on Fridays"], why: "Whether Allah punishes us or has mercy on us, there is no escaping for you." },
        { tf: false, q: "Hoping others are harmed helps a person.", why: "Your hopes that torment will strike us, will not benefit you." }
      ]
    },
    {
      slug: "in-him-we-believe-and-rely",
      title: "We believe and rely on Him",
      line: "We believe in the Most Gracious and rely on Him alone.",
      facts: ["Iman and Tawakkul", "Rely in all affairs"],
      quote: q67(29),
      source: ik(29, "Ibn Kathir explains: we believe in the Lord of all that exists and rely upon Him in all of our affairs.", "upon Him we rely in all of our affairs"),
      difficulty: 1,
      questions: [
        { q: "In whom do the believers trust?", a: "The Most Gracious", wrong: ["Their money", "Their army", "Luck"], why: "He is the Most Gracious, in Him we believe, and upon Him we rely." },
        { q: "In which affairs do we rely on Allah?", a: "All of our affairs", wrong: ["Only big ones", "Only in danger", "None"], why: "Upon Him we rely in all of our affairs." },
        { tf: true, q: "Believers rely on Allah in everything.", why: "And upon Him we rely in all of our affairs." }
      ]
    },
    {
      slug: "you-will-come-to-know",
      title: "You will come to know",
      line: "In time, all will see who was truly in clear error.",
      facts: ["Truth wins in the end", "Patience pays"],
      quote: q67(29),
      source: ik(29, "Ibn Kathir says they will come to know who is in error and to whom the final end belongs, in this life and the Hereafter.", "and to whom the final end"),
      difficulty: 2,
      questions: [
        { q: "What will they come to know?", a: "Who is in manifest error", wrong: ["Who is richest", "Who is tallest", "Nothing"], why: "So, you will come to know who it is that is in manifest error." },
        { q: "Where will the final end show, per Ibn Kathir?", a: "This life and the Hereafter", wrong: ["Only in dreams", "Nowhere", "Only in books"], why: "And to whom the final end will be for in this life and in the Hereafter." },
        { tf: false, q: "The truth will never become clear.", why: "So, you will come to know who it is that is in manifest error." }
      ]
    },
    {
      slug: "if-your-water-sank",
      title: "If your water sank away",
      line: "If water sank deep into the earth, who could bring it back?",
      facts: ["Ghawr: sinking deep", "Water is a mercy"],
      quote: q67(30),
      source: ik(30, "Ibn Kathir says if the water sank to the lowest depths, it could not be reached with iron axes nor strong arms.", "it would not be reachable with iron axes nor strong arms"),
      difficulty: 2,
      questions: [
        { q: "What does 67:30 ask?", a: "Who could bring flowing water?", wrong: ["Who owns the sea?", "Who built wells?", "Who sells water?"], why: "If all your water were to sink away, who then can supply you with flowing water?" },
        { q: "Could people dig to reach it?", a: "No, not with axes or arms", wrong: ["Yes, easily", "With a spoon", "With magic"], why: "It would not be reachable with iron axes nor strong arms." },
        { tf: true, q: "Only Allah can give us flowing water.", why: "This means that no one is able to do this except Allah." }
      ]
    },
    {
      slug: "water-is-his-favor",
      title: "Water is His favor",
      line: "Every spring that flows is a favor and grace from Allah.",
      facts: ["Ma Main: flowing water", "Thank Allah for water"],
      quote: q67(30),
      source: ik(30, "Ibn Kathir says it is only out of His favor and grace that Allah makes water spring forth and flow to every region.", "it is merely out of His favor and His grace that He causes water to spring forth for you"),
      difficulty: 2,
      questions: [
        { q: "Why does water spring forth, per Ibn Kathir?", a: "Out of Allah's favor and grace", wrong: ["By luck", "Because we earned it", "By itself"], why: "It is merely out of His favor and His grace that He causes water to spring forth for you." },
        { q: "How does Allah send water to lands?", a: "In amounts suited to needs", wrong: ["Randomly", "Only to kings", "Never enough"], why: "In an amount that is suitable for the needs of servants, be it little or abundant." },
        { tf: false, q: "Water is something we can make without Allah.", why: "This means that no one is able to do this except Allah." }
      ]
    },
    {
      slug: "praise-after-drinking",
      title: "Praise Him after drinking",
      line: "Allah is pleased when we say Alhamdulillah as we eat and drink.",
      facts: ["Say Alhamdulillah", "Small words, big reward"],
      quote: q67(30),
      source: hadith("muslim", "2734", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said Allah is pleased with His servant who praises Him when eating a bite and when drinking.", "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food and while drinking"),
      difficulty: 1,
      questions: [
        { q: "What should we say after drinking?", a: "Alhamdulillah", wrong: ["Nothing", "Goodbye", "Hurry"], why: "Allah is pleased with His servant who says: Al-Hamdu lillah while taking a morsel of food and while drinking." },
        { q: "How does Allah feel about this praise?", a: "Pleased", wrong: ["Angry", "Bored", "Unaware"], why: "Allah is pleased with His servant who says: Al-Hamdu lillah." },
        { tf: true, q: "Thanking Allah for water and food pleases Him.", why: "Allah is pleased with His servant who says: Al-Hamdu lillah while drinking." }
      ]
    }
  ]
};

export const MULK_UNITS: readonly DeepUnit[] = [MULK_ONE, MULK_TWO, MULK_THREE, MULK_FOUR];
