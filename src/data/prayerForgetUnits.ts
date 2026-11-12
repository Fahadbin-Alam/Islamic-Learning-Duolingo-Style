import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: forgetting in salah, from Sahih al-Bukhari and Sunan Abi Dawud. He ﷺ rose after two rak'ahs
// without sitting, said he was a human being who forgets and asked to be reminded, finished a prayer after two rak'ahs
// until Dhul-Yadayn asked, and taught what to do when Shaytan brings doubts, when unsure how much was prayed, and when
// an imam stands up after two rak'ahs. Every card is one sahih or hasan hadith with its number, narrator and grade, and
// its exact English words to highlight. None of these hadith is taught anywhere else in the app. No card asks whether
// the two prostrations come before or after the salam, as the narrations differ and the schools take them differently.

const FORGET: DeepUnit = {
  key: "prayer-forgetting-in-salah",
  topicId: "prayer",
  branchId: "prayer-forgetting-in-salah",
  branch: { title: "Forgetting in salah", description: "Rising without sitting, remind me if I forget, Dhul-Yadayn's question, doubts from Shaytan, building on what you are sure of, and an imam who stands up." },
  name: "forgetting in salah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "he-stood-up-without-sitting",
      title: "Standing up without sitting",
      line: "He ﷺ once rose after two rak'ahs without sitting.",
      facts: ["Told by Abdullah ibn Buhaynah", "Sahw: forgetting in the prayer", "The people rose with him ﷺ"],
      source: hadith("bukhari", "1224", "Abdullah ibn Buhaynah", "Sahih", "Abdullah ibn Buhaynah said: the Messenger of Allah ﷺ once led us in prayer. After two rak'ahs he got up without sitting, and the people also got up with him. When he was about to finish the prayer, and we waited for his salam, he said Allahu akbar, made two prostrations while sitting, and then ended the prayer with the salam.", "The people also got up with him"),
      difficulty: 3,
      questions: [
        { q: "After how many rak'ahs did he ﷺ rise without sitting?", a: "Two rak'ahs", wrong: ["One rak'ah", "Three rak'ahs", "Four rak'ahs"], why: "He offered two rak'ahs and got up without sitting, Abdullah ibn Buhaynah said." },
        { q: "What did the people behind him ﷺ do?", a: "They stood up with him", wrong: ["They stayed sitting", "They went into sujud", "They went into ruku'"], why: "The people also got up with him, Ibn Buhaynah said; they followed their imam." },
        { q: "He ﷺ made two prostrations while sitting, near the end of that prayer.", tf: true, why: "When he was about to finish, he made two prostrations while sitting, Ibn Buhaynah said." }
      ]
    },
    {
      slug: "a-human-who-forgets",
      title: "Remind me if I forget",
      line: "He ﷺ said: I am human and may forget, so remind me.",
      facts: ["Told by Abdullah ibn Mas'ud", "Sajdah: a prostration", "He ﷺ faced the qiblah for two sajdahs"],
      source: hadith("bukhari", "401", "Abdullah ibn Mas'ud", "Sahih", "Abdullah ibn Mas'ud said: the Prophet ﷺ prayed, and when he finished he was asked: has there been a change in the prayer? They told him what he had prayed, so he bent his legs, faced the qiblah, made two prostrations and ended with the salam. Then he turned to us and said: if anything had changed in the prayer, I would have told you. But I am a human being like you and liable to forget like you, so if I forget, remind me.", "I am a human being like you and liable to forget like you"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ ask the people to do if he forgot?", a: "Remind him", wrong: ["Say nothing to him", "Pray it again later", "Wait for the next day"], why: "So if I forget, remind me, he ﷺ said after turning to face them." },
        { q: "Which way did he ﷺ face for the two prostrations?", a: "Toward the qiblah", wrong: ["Toward the people", "Toward the door", "Toward the minbar"], why: "He bent his legs, faced the qiblah and made two prostrations, Ibn Mas'ud said." },
        { q: "He ﷺ said he is a human being who can forget.", tf: true, why: "I am a human being like you and liable to forget like you, he ﷺ said." }
      ]
    },
    {
      slug: "dhul-yadayn-asks",
      title: "Dhul-Yadayn asks",
      line: "Dhul-Yadayn asked: was the prayer shortened, or did you forget?",
      facts: ["Told by Abu Hurairah", "Dhul-Yadayn: a man with long hands", "Two more rak'ahs were then prayed"],
      source: hadith("bukhari", "1229", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ prayed one of the evening prayers and finished it after two rak'ahs. He stood by a piece of wood in front of the masjid and put his hand on it. Abu Bakr and Umar were there, but out of respect they did not dare speak to him. A man the Prophet ﷺ called Dhul-Yadayn said: has the prayer been reduced, or have you forgotten? He said: I have not forgotten, and it has not been reduced. He said: surely you have forgotten. So the Prophet ﷺ prayed two more rak'ahs, gave the salam, then said Allahu akbar and made two prostrations, each like his usual one or a bit longer.", "Has the prayer been reduced or have you forgotten?"),
      difficulty: 3,
      questions: [
        { q: "What did Dhul-Yadayn ask him ﷺ after two rak'ahs?", a: "Was the prayer reduced, or did you forget?", wrong: ["Shall we pray again tomorrow?", "May I lead the next prayer?", "Why was the prayer so long?"], why: "He ﷺ had ended the prayer after two rak'ahs, so Dhul-Yadayn asked if it had been reduced." },
        { q: "How many more rak'ahs did he ﷺ pray to complete it?", a: "Two rak'ahs", wrong: ["One rak'ah", "Three rak'ahs", "Four rak'ahs"], why: "The Prophet ﷺ prayed two more rak'ahs; then he made two prostrations, Abu Hurairah said." },
        { q: "Abu Bakr and Umar were present at that prayer.", tf: true, why: "Abu Bakr and Umar were there, but out of respect they did not dare speak to him ﷺ." }
      ]
    },
    {
      slug: "doubts-from-shaytan",
      title: "When Shaytan brings doubts",
      line: "Unsure how many rak'ahs? Make two sajdahs while sitting.",
      facts: ["Told by Abu Hurairah", "Shaytan comes when one stands to pray", "He brings doubts about the rak'ahs"],
      source: hadith("bukhari", "1232", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: when one of you stands to pray, Shaytan comes and puts doubts in him until he forgets how many rak'ahs he has prayed. If this happens to one of you, he should make two prostrations of sahw while sitting.", "he should perform two prostrations of Sahu while sitting"),
      difficulty: 3,
      questions: [
        { q: "When does Shaytan come to make one forget the rak'ahs?", a: "When one stands to pray", wrong: ["When one walks home", "When one greets a friend", "When one plants a tree"], why: "When one of you stands to pray, Shaytan comes and brings doubts, he ﷺ said." },
        { q: "What should one do if Shaytan makes him forget the count?", a: "Make two prostrations while sitting", wrong: ["Leave the prayer at once", "Pray the whole prayer twice", "Call the adhan again"], why: "He should perform two prostrations of sahw while sitting, the Messenger of Allah ﷺ said." },
        { q: "Forgetting how many rak'ahs can come from Shaytan's doubts.", tf: true, why: "Shaytan comes and puts him in doubts until he forgets how many he prayed, he ﷺ said." }
      ]
    },
    {
      slug: "throw-away-the-doubt",
      title: "Throw away the doubt",
      line: "Unsure of your prayer? Build on what you know for sure.",
      facts: ["Told by Abu Sa'id al-Khudri", "Doubt: not sure how much was prayed", "Then make two sajdahs"],
      source: hadith("abudawud", "1024", "Abu Sa'id al-Khudri", "Hasan Sahih (Al-Albani)", "Abu Sa'id al-Khudri said: the Messenger of Allah ﷺ said: when one of you is in doubt about his prayer, he should throw away his doubt and base his prayer on what he is sure of. When he is sure it is complete, he should make two prostrations. If the prayer was already complete, the extra rak'ah and the two prostrations are a voluntary prayer; if it was short, the extra rak'ah completes it, and the two prostrations are a disgrace for Shaytan.", "he should throw away his doubt and base his prayer on what he is sure of"),
      difficulty: 3,
      questions: [
        { q: "What should one in doubt do with that doubt?", a: "Throw it away", wrong: ["Act upon it", "Hold on to it", "Ask about it later"], why: "He should throw away his doubt and base his prayer on what he is sure of, he ﷺ said." },
        { q: "What are the two prostrations for Shaytan, he ﷺ said?", a: "A disgrace", wrong: ["A gift", "A reward", "A victory"], why: "When the extra rak'ah completes it, the two prostrations disgrace Shaytan, he ﷺ said." },
        { q: "If the prayer was already complete, the extra rak'ah is lost.", tf: false, why: "No. If the prayer was complete, the extra rak'ah counts as voluntary prayer, he ﷺ said." }
      ]
    },
    {
      slug: "when-the-imam-stands-up",
      title: "If the imam stands up",
      line: "An imam fully up by mistake should not sit back down.",
      facts: ["Told by Al-Mughirah ibn Shu'bah", "Not yet straight up: he sits back down", "Fully up: he makes two sajdahs of sahw"],
      source: hadith("abudawud", "1036", "Al-Mughirah ibn Shu'bah", "Sahih (Al-Albani)", "Al-Mughirah ibn Shu'bah said: the Prophet ﷺ said: when an imam stands up after two rak'ahs, if he remembers before standing straight up, he should sit down; but if he has stood straight up, he must not sit down, and he should make the two prostrations of forgetfulness.", "if he remembers before standing straight up, he should sit down"),
      difficulty: 3,
      questions: [
        { q: "If the imam remembers before standing straight up, what does he do?", a: "Sit back down", wrong: ["Keep standing", "Leave the prayer", "Start again"], why: "Not fully up yet, he goes back to sitting, as Al-Mughirah reported from him ﷺ." },
        { q: "If he is already fully up, what should he make instead?", a: "Two prostrations of forgetfulness", wrong: ["Two extra rak'ahs", "Two more salams", "Two more adhans"], why: "If he stands straight up, he must not sit down; he makes the two prostrations, he ﷺ said." },
        { q: "An imam who stood straight up should not sit back down.", tf: true, why: "Once fully up, he does not sit back, Al-Mughirah reported; the two sajdahs make up for it." }
      ]
    }
  ]
};

export const PRAYER_FORGET_UNITS: DeepUnit[] = [FORGET];
