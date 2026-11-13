import { hadith, type DeepUnit } from "./deepKit";

// Two more Sahabah units, from Sahih al-Bukhari and Sunan an-Nasa'i. The Ansar: the name Allah gave them, their
// followers counted with them, his ﷺ du'a for them and their children, and the day of Bu'ath. Abdullah ibn Abi Awfa:
// shielding him ﷺ at Umrah, a scar from Hunayn, locusts on the campaigns, the Prophet's ﷺ son Ibrahim, and walking
// with the widow and the poor. Every card is one sahih or hasan hadith with its number, narrator and grade, and its
// exact English words to highlight. Details that differ between narrations are not asked, and none of these hadith is
// taught anywhere else in the app.

const ANSAR: DeepUnit = {
  key: "ansar",
  topicId: "sahabah",
  branchId: "sahabi-ansar",
  branch: { title: "The Ansar", description: "The name Allah gave them, their followers, a du'a for their children, and the day of Bu'ath." },
  name: "the Ansar",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "named-by-allah",
      title: "The name Allah gave them",
      line: "Allah Himself gave the Ansar their name, Anas said.",
      facts: ["Ghaylan ibn Jarir asked Anas", "Ansar means the helpers", "Anas told of the Ansar's deeds"],
      source: hadith("bukhari", "3776", "Anas ibn Malik", "Sahih", "Ghaylan ibn Jarir said: I asked Anas: tell me about the name Ansar. Did you call yourselves by it, or did Allah call you by it? He said: Allah called us by it. We used to visit Anas, and he would tell us of the virtues and deeds of the Ansar.", "Allah called us by it"),
      difficulty: 2,
      questions: [
        { q: "Who gave the Ansar their name, Anas said?", a: "Allah", wrong: ["The Ansar themselves", "Quraysh", "The Muhajirun"], why: "Did you call yourselves by it, or did Allah? Allah called us by it, Anas said." },
        { q: "What did Anas tell his visitors about?", a: "The deeds of the Ansar", wrong: ["The kings of Persia", "The rivers of Iraq", "The markets of Basra"], why: "He used to tell us of the virtues and deeds of the Ansar, Ghaylan said of Anas." },
        { q: "The Ansar chose that name for themselves.", tf: false, why: "No. Asked if they named themselves, Anas said: Allah called us by it." }
      ]
    },
    {
      slug: "their-followers",
      title: "Their followers too",
      line: "The Ansar asked him ﷺ to pray for their followers too.",
      facts: ["Told by Zayd ibn Arqam", "Every prophet has followers", "He ﷺ made the du'a they asked for"],
      source: hadith("bukhari", "3787", "Zayd ibn Arqam", "Sahih", "Zayd ibn Arqam said: the Ansar said: O Messenger of Allah, every prophet has his followers, and we have followed you. So pray to Allah that our followers be counted as being from us. So he prayed to Allah for it.", "So he invoked Allah accordingly"),
      difficulty: 2,
      questions: [
        { q: "What did the Ansar ask him ﷺ to pray for?", a: "That their followers count as Ansar", wrong: ["That their crops grow well", "That their wells stay full", "That their flocks grow large"], why: "Pray to Allah that our followers be counted as being from us, the Ansar asked." },
        { q: "What did the Ansar say every prophet has?", a: "His own followers", wrong: ["His own city", "His own soldiers", "His own treasure"], why: "Every prophet has his followers, and we have followed you, the Ansar said to him ﷺ." },
        { q: "He ﷺ made the du'a that the Ansar asked for.", tf: true, why: "So he invoked Allah accordingly, Zayd ibn Arqam said of the Ansar's request." }
      ]
    },
    {
      slug: "forgive-the-ansar",
      title: "Forgive the Ansar",
      line: "He ﷺ prayed: O Allah, forgive the Ansar and their children.",
      facts: ["Zayd ibn Arqam wrote it to Anas", "Anas was grieving for the Ansar", "A du'a for the Ansar's children too"],
      source: hadith("bukhari", "4906", "Zayd ibn Arqam", "Sahih", "Anas ibn Malik said: I grieved greatly over the Ansar who had been killed. When Zayd ibn Arqam heard how great my grief was, he wrote me a letter, saying that he had heard the Messenger of Allah ﷺ say: O Allah, forgive the Ansar and the children of the Ansar.", "Forgive the Ansar and the Ansar children"),
      difficulty: 2,
      questions: [
        { q: "With the Ansar, whom else did he ﷺ ask Allah to forgive?", a: "The children of the Ansar", wrong: ["The guests of the Ansar", "The neighbours of the Ansar", "The friends of the Ansar"], why: "O Allah, forgive the Ansar and the Ansar's children, Zayd heard him ﷺ say." },
        { q: "What did Zayd ibn Arqam do when he heard of Anas's grief?", a: "He wrote him a letter", wrong: ["He came to visit him", "He sent him a gift", "He gave a sermon"], why: "Zayd heard how great my grief was, and wrote to me, Anas said." },
        { q: "Zayd ibn Arqam heard this du'a from him ﷺ himself.", tf: true, why: "Zayd wrote that he had heard the Messenger of Allah ﷺ say it, Anas said." }
      ]
    },
    {
      slug: "the-day-of-buath",
      title: "The day of Bu'ath",
      line: "Bu'ath came about for the good of the Prophet ﷺ, Aishah said.",
      facts: ["Told by Aishah", "Bu'ath was before he ﷺ came to Madinah", "The tribes of Madinah had lost their chiefs"],
      source: hadith("bukhari", "3777", "Aishah", "Sahih", "Aishah said: the day of Bu'ath, a day of fighting between the two tribes of the Ansar, the Aws and the Khazraj, was brought about by Allah for the good of His Messenger ﷺ. When the Messenger of Allah ﷺ came to Madinah, its tribes were divided, and their chiefs had been killed or wounded. So Allah brought it about for the good of His Messenger ﷺ, so that they would enter Islam.", "brought about by Allah for the good of His Apostle"),
      difficulty: 3,
      questions: [
        { q: "Which two tribes fought on the day of Bu'ath?", a: "The Aws and the Khazraj", wrong: ["Quraysh and Thaqif", "Hawazin and Ghatafan", "Tamim and Asad"], why: "Bu'ath was a day of fighting between the two tribes of the Ansar, the Aws and Khazraj." },
        { q: "Why did Allah bring that day about, Aishah said?", a: "So the Ansar would enter Islam", wrong: ["So the Ansar would leave Madinah", "So the Ansar would trade with Sham", "So the Ansar would grow rich"], why: "Allah brought it about for the good of His Messenger ﷺ, so that they would embrace Islam." },
        { q: "The day of Bu'ath came before he ﷺ reached Madinah.", tf: true, why: "He ﷺ came to Madinah after its tribes had split and lost their chiefs, Aishah said." }
      ]
    }
  ]
};

const IBN_ABI_AWFA: DeepUnit = {
  key: "ibn-abi-awfa",
  topicId: "sahabah",
  branchId: "sahabi-abdullah-ibn-abi-awfa",
  branch: { title: "Abdullah ibn Abi Awfa", description: "Shielding him ﷺ at Umrah, a scar from Hunayn, locusts on the campaigns, the Prophet's ﷺ son Ibrahim, and the widow and the poor." },
  name: "Abdullah ibn Abi Awfa",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "shielding-him-at-umrah",
      title: "Shielding him ﷺ at Umrah",
      line: "At Umrah, they shielded him ﷺ from the people of Makkah.",
      facts: ["Told by Abdullah ibn Abi Awfa", "They made tawaf with him ﷺ", "Then they went to As-Safa and Al-Marwah"],
      source: hadith("bukhari", "1791", "Abdullah ibn Abi Awfa", "Sahih", "Abdullah ibn Abi Awfa said: the Messenger of Allah ﷺ performed Umrah, and we performed Umrah with him. When he entered Makkah he made tawaf, and we made it with him. Then he came to As-Safa and Al-Marwah, and we came to them with him. We were shielding him from the people of Makkah, lest anyone hit him with an arrow.", "We were shielding him from the people of Mecca"),
      difficulty: 2,
      questions: [
        { q: "They shielded him ﷺ from the people of which city?", a: "Makkah", wrong: ["Ta'if", "Khaybar", "Najran"], why: "Ibn Abi Awfa said: we were shielding him from the people of Makkah, lest anyone hit him." },
        { q: "After the tawaf, where did they go with him ﷺ?", a: "To As-Safa and Al-Marwah", wrong: ["To Mount Arafah", "To Mina", "To the cave of Hira"], why: "Then he came to As-Safa and Al-Marwah, and we came to them with him, Ibn Abi Awfa said." },
        { q: "Ibn Abi Awfa made Umrah along with him ﷺ.", tf: true, why: "He ﷺ performed Umrah and we performed Umrah with him, Ibn Abi Awfa said." }
      ]
    },
    {
      slug: "a-scar-from-hunayn",
      title: "A scar from Hunayn",
      line: "Ibn Abi Awfa bore a scar from Hunayn on his hand.",
      facts: ["Told by Isma'il ibn Abi Khalid", "He got the blow while with him ﷺ", "He had fought in battles before Hunayn"],
      source: hadith("bukhari", "4314", "Abdullah ibn Abi Awfa", "Sahih", "Isma'il ibn Abi Khalid said: I saw the mark of a healed blow on the hand of Ibn Abi Awfa. He said: I received that blow in the battle of Hunayn, with the Prophet ﷺ. I asked: were you at Hunayn? He said: yes, and in battles before it.", "battle of Hunain in the company of the Prophet"),
      difficulty: 2,
      questions: [
        { q: "Where was the healed blow that Isma'il saw?", a: "On his hand", wrong: ["On his face", "On his foot", "On his shoulder"], why: "I saw the mark of a healed blow on the hand of Ibn Abi Awfa, Isma'il said." },
        { q: "In which battle did Ibn Abi Awfa get that blow?", a: "Hunayn", wrong: ["Badr", "Uhud", "Tabuk"], why: "I received that blow in the battle of Hunayn, with the Prophet ﷺ, Ibn Abi Awfa said." },
        { q: "Hunayn was the very first battle Ibn Abi Awfa fought in.", tf: false, why: "No. Asked if he was at Hunayn, he said: yes, and in battles before it." }
      ]
    },
    {
      slug: "locusts-on-the-campaigns",
      title: "Locusts on the campaigns",
      line: "On the campaigns with him ﷺ, they used to eat locusts.",
      facts: ["Told by Abdullah ibn Abi Awfa", "A ghazwah is a campaign he ﷺ went on", "They ate locusts on those journeys"],
      source: hadith("bukhari", "5495", "Abdullah ibn Abi Awfa", "Sahih", "Ibn Abi Awfa said: we went out with the Prophet ﷺ on six or seven campaigns, and we used to eat locusts with him.", "we used to eat locusts with him"),
      difficulty: 1,
      questions: [
        { q: "What did Ibn Abi Awfa say they ate on those campaigns?", a: "Locusts", wrong: ["Potatoes", "Corn", "Tomatoes"], why: "Ibn Abi Awfa said: on the campaigns, we used to eat locusts with him ﷺ." },
        { q: "What is a ghazwah?", a: "A campaign he ﷺ went on", wrong: ["A trade journey", "A trip for Hajj", "A visit to a tribe"], why: "Ghazawat are the campaigns that he ﷺ himself went out on with his Companions." },
        { q: "Ibn Abi Awfa went out on campaigns with him ﷺ.", tf: true, why: "Ibn Abi Awfa said they went out with him ﷺ on six or seven campaigns." }
      ]
    },
    {
      slug: "the-prophets-son-ibrahim",
      title: "The Prophet's ﷺ son Ibrahim",
      line: "Ibn Abi Awfa spoke of Ibrahim, the son of the Prophet ﷺ.",
      facts: ["Told by Isma'il ibn Abi Khalid", "Ibrahim died as a little child", "There is no prophet after him ﷺ"],
      source: hadith("bukhari", "6194", "Abdullah ibn Abi Awfa", "Sahih", "Isma'il ibn Abi Khalid said: I asked Ibn Abi Awfa: did you see Ibrahim, the son of the Prophet ﷺ? He said: he died when he was a little child. Had there been a prophet after Muhammad ﷺ, his son would have lived, but there is no prophet after him.", "but there is no Prophet after him"),
      difficulty: 2,
      questions: [
        { q: "What did Isma'il ask Ibn Abi Awfa?", a: "If he had seen Ibrahim", wrong: ["If he had been at Badr", "If he had met Bilal", "If he had been to Yemen"], why: "Did you see Ibrahim, the son of the Prophet ﷺ? Isma'il asked Ibn Abi Awfa." },
        { q: "At what age did Ibrahim die, Ibn Abi Awfa said?", a: "As a little child", wrong: ["As a young man", "As a grown man", "As an old man"], why: "He died in his early childhood, Ibn Abi Awfa said of Ibrahim." },
        { q: "Ibn Abi Awfa said there is no prophet after him ﷺ.", tf: true, why: "Had there been a prophet after him ﷺ, his son would have lived; but there is none." }
      ]
    },
    {
      slug: "the-widow-and-the-poor",
      title: "The widow and the poor",
      line: "He ﷺ walked with the widow and the poor, to help them.",
      facts: ["Told by Abdullah ibn Abi Awfa", "He ﷺ spoke little idle talk", "He ﷺ was never too proud to help"],
      source: hadith("nasai", "1414", "Abdullah ibn Abi Awfa", "Hasan (Darussalam)", "Abdullah ibn Abi Awfa said: the Messenger of Allah ﷺ used to remember Allah a great deal and speak little idle talk. He made the prayer long and the khutbah short, and he did not hold back from walking with a widow or a poor person, to see to their needs.", "walking with a widow or poor person"),
      difficulty: 2,
      questions: [
        { q: "Whom would he ﷺ walk with, to see to their needs?", a: "A widow or a poor person", wrong: ["A soldier or a rider", "A guard or a scribe", "A trader or a farmer"], why: "He would not refrain from walking with a widow or poor person and tending to their needs." },
        { q: "What did he ﷺ do a great deal of, Ibn Abi Awfa said?", a: "Making dhikr", wrong: ["Travelling far", "Buying and selling", "Horse riding"], why: "He ﷺ used to recite a great deal of remembrance and engage little in idle talk." },
        { q: "He ﷺ made the prayer long and the khutbah short.", tf: true, why: "He used to make the prayer long and keep the khutbah short, Ibn Abi Awfa said." }
      ]
    }
  ]
};

export const SAHABA_ANSAR_UNITS: readonly DeepUnit[] = [ANSAR, IBN_ABI_AWFA];
