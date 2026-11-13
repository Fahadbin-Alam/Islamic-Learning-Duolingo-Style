import { hadith, type DeepUnit } from "./deepKit";

// One more unit for people new to Islam: starting out, from Sahih al-Bukhari, Jami at-Tirmidhi, Sunan Abi Dawud and
// Sunan Ibn Majah. Abu Hurairah's long night on the way to Islam, a bath with water and sidr, words that are enough for
// one who cannot yet memorize the Quran, meat brought by people new to Islam, teaching the one who does not know, and
// keeping to what is right though no one can do every good deed. Every card is one sahih or hasan hadith with its
// number, narrator and grade, and its exact English words to highlight. Points the schools differ on are left out, and
// none of these hadith is taught anywhere else in the app.

const STARTING_OUT: DeepUnit = {
  key: "intro-starting-out",
  topicId: "intro",
  branchId: "intro-starting-out",
  branch: { title: "Starting out in Islam", description: "A long night on the way to Islam, a first bath, words that are enough, meat from new Muslims, teaching the one who does not know, and keeping on." },
  name: "starting out in Islam",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-long-night-ends",
      title: "A long night ends",
      line: "Abu Hurairah gave his pledge, then freed his slave for Allah.",
      facts: ["Told by Abu Hurairah", "On the way he recited: what a long, tiring night", "His slave had run away on the road"],
      source: hadith("bukhari", "2531", "Abu Hurairah", "Sahih", "Abu Hurairah said: on my way to the Prophet ﷺ I was reciting: what a long, tiring night! Yet it has saved us from the land of disbelief. A slave of mine ran away from me on the way. When I came to the Prophet ﷺ and gave the pledge of Islam, the slave appeared while I was still with him, and he said: Abu Hurairah, here is your slave! I said: he is free for the sake of Allah, and I freed him.", "I had a slave who ran away from me on the way"),
      difficulty: 1,
      questions: [
        { q: "What did Abu Hurairah do when his slave came back?", a: "He freed him for Allah", wrong: ["He gave him to a friend", "He sent him back home", "He kept him as a helper"], why: "I manumit him for the sake of Allah, and so I freed him, Abu Hurairah said." },
        { q: "What did Abu Hurairah call the night of his journey?", a: "Long and tiring", wrong: ["Short and easy", "Cold and rainy", "Bright and calm"], why: "What a long tedious tiresome night, he recited; yet it saved us from the land of disbelief." },
        { q: "Abu Hurairah's slave ran away from him on the way.", tf: true, why: "I had a slave who ran away from me on the way, Abu Hurairah said." }
      ]
    },
    {
      slug: "a-bath-to-begin",
      title: "A bath to begin",
      line: "When Qais ibn Asim accepted Islam, he ﷺ told him to bathe.",
      facts: ["Told by Qais ibn Asim", "Ghusl: washing the whole body", "Sidr: leaves of the lote tree"],
      source: hadith("tirmidhi", "605", "Qais ibn Asim", "Sahih (Darussalam)", "Qais ibn Asim said that he accepted Islam, and the Prophet ﷺ told him to take a bath (ghusl) with water and sidr, the leaves of the lote tree.", "he accepted Islam and the Prophet ordered him to perform Ghusl with water and Sidr"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell Qais to do when he accepted Islam?", a: "Take a bath", wrong: ["Fast for three days", "Travel to Makkah first", "Pray all night long"], why: "He accepted Islam and the Prophet ﷺ ordered him to perform ghusl with water and sidr." },
        { q: "What did Qais bathe with, besides water?", a: "Sidr, lote tree leaves", wrong: ["Rose petals", "Sea salt", "Olive oil"], why: "Ghusl with water and sidr, the leaves of the lote tree, he ﷺ told Qais ibn Asim." },
        { q: "Ghusl means washing the whole body.", tf: true, why: "Ghusl is washing the whole body, as Qais was told to do with water and sidr." }
      ]
    },
    {
      slug: "words-that-are-enough",
      title: "Words that are enough",
      line: "He ﷺ taught dhikr to a man who could not memorize the Quran.",
      facts: ["Told by Abdullah ibn Abi Awfa", "Subhan Allah, Alhamdulillah, La ilaha illallah", "Allahu akbar, la hawla wa la quwwata illa billah"],
      source: hadith("abudawud", "832", "Abdullah ibn Abi Awfa", "Hasan (Al-Albani)", "Abdullah ibn Abi Awfa said: a man came to the Prophet ﷺ and said: I cannot memorize anything of the Quran, so teach me something that will be enough for me. He said: say Subhan Allah, Alhamdulillah, La ilaha illallah, Allahu akbar, and la hawla wa la quwwata illa billah. The man said: this is for Allah; what is for me? He said: say: O Allah, have mercy on me, provide for me, keep me well and guide me. When he stood up he made a sign with his hand, and the Messenger of Allah ﷺ said: he has filled his hand with good.", "so teach me something which is sufficient for me"),
      difficulty: 2,
      questions: [
        { q: "What did the man say he could not do yet?", a: "Memorize from the Quran", wrong: ["Walk to the masjid", "Fast in the heat", "Give in charity"], why: "I cannot memorise anything from the Qur'an, so teach me something sufficient, he said." },
        { q: "Which of these was among the words he ﷺ taught him?", a: "La hawla wa la quwwata illa billah", wrong: ["Hasbunallahu wa ni'mal wakil", "Inna lillahi wa inna ilayhi raji'un", "Radiyallahu anhu"], why: "Say: there is no might and no strength but in Allah, he ﷺ taught with four more." },
        { q: "He ﷺ said the man filled his hand with good.", tf: true, why: "As the man stood up, the Messenger of Allah ﷺ said: he filled his hand with virtues." }
      ]
    },
    {
      slug: "say-bismillah-and-eat",
      title: "Say Bismillah and eat",
      line: "Meat from new Muslims: say Allah's name on it and eat.",
      facts: ["Told by Aishah", "Bismillah: in the name of Allah", "The people had become Muslim recently"],
      source: hadith("bukhari", "7398", "Aishah", "Sahih", "Aishah said: people said to the Prophet ﷺ: Messenger of Allah, here are people who have recently embraced Islam, and they bring us meat, and we do not know whether they mentioned Allah's name over it or not. He said: you mention Allah's name, and eat.", "Here are people who have recently embraced Islam and they bring meat"),
      difficulty: 1,
      questions: [
        { q: "Who were bringing the meat?", a: "People new to Islam", wrong: ["Traders from Rome", "Travelers from Persia", "Hunters from Yemen"], why: "Here are people who have recently embraced Islam and they bring meat, they told him ﷺ." },
        { q: "What did he ﷺ tell them to do with the meat?", a: "Say Allah's name and eat", wrong: ["Ask each one first", "Wait one more day", "Cook it once more"], why: "You should mention Allah's Name and eat, the Prophet ﷺ said." },
        { q: "They knew for sure that Allah's name was said on the meat.", tf: false, why: "No. We do not know whether they had mentioned Allah's Name, they said to him ﷺ." }
      ]
    },
    {
      slug: "teach-the-one-who-does-not-know",
      title: "Teach the one who does not know",
      line: "He ﷺ said: you did not teach him, nor feed him when hungry.",
      facts: ["Told by Abbad ibn Shurahbil", "It was a year of hunger", "He got back his garment and some grain"],
      source: hadith("abudawud", "2620", "Abbad ibn Shurahbil", "Sahih (Al-Albani)", "Abbad ibn Shurahbil said: I was struck by hunger, so I went into a garden in Madinah, rubbed out some ears of grain, ate, and put some in my garment. The owner came, struck me and took my garment. He went to the Messenger of Allah ﷺ, who said to him: you did not teach him when he did not know, and you did not feed him when he was hungry. He told him to give back my garment, and he gave me a wasq or half a wasq of grain.", "You did not teach him if he was ignorant"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say the garden owner had not done?", a: "Taught him or fed him", wrong: ["Hired him or paid him", "Greeted him or welcomed him", "Visited him or called him"], why: "You did not teach him if he was ignorant, nor feed him if he was hungry, he ﷺ said." },
        { q: "Why had Abbad taken grain from the garden?", a: "He was hungry", wrong: ["He was gathering seeds", "He was helping the owner", "He was feeding his camel"], why: "He suffered from drought, and he ﷺ said: you did not feed him if he was hungry." },
        { q: "Abbad got his garment back in the end.", tf: true, why: "He ordered him, so he returned my garment to me and gave me some corn, Abbad said." }
      ]
    },
    {
      slug: "keep-going-straight",
      title: "Keep going straight",
      line: "Keep to what is right, though you cannot do every good deed.",
      facts: ["Told by Thawban", "The best of your deeds is the prayer", "Only a believer keeps up his wudu"],
      source: hadith("ibnmajah", "277", "Thawban", "Hasan (Darussalam)", "Thawban said: the Messenger of Allah ﷺ said: keep to what is right, though you will not be able to do every good deed. Know that the best of your deeds is the prayer, and none keeps up his wudu except a believer.", "Adhere to righteousness even though you will not be able to do all acts of virtue"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ say is the best of your deeds?", a: "The prayer", wrong: ["The trade", "The journey", "The feast"], why: "Know that the best of your deeds is Salat, he ﷺ said, so keep to what is right." },
        { q: "Who keeps up his wudu, he ﷺ said?", a: "Only a believer", wrong: ["Only a scholar", "Only an old man", "Only a traveler"], why: "No one maintains his ablution except a believer, he ﷺ said." },
        { q: "Even if you cannot do every good deed, keep to what is right.", tf: true, why: "Adhere to righteousness though you cannot do all acts of virtue, he ﷺ said." }
      ]
    }
  ]
};

export const INTRO_STARTING_OUT_UNITS: readonly DeepUnit[] = [STARTING_OUT];
