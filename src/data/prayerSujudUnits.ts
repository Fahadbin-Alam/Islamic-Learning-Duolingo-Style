import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: ruku' and sujud for Allah, from Sunan an-Nasa'i, Sunan Ibn Majah, Sahih al-Bukhari and Jami
// at-Tirmidhi. Glorifying the Lord in ruku' and striving in du'a in sujud, the praise that fills the heavens and the
// earth on rising from ruku', a sujud as long as fifty verses at night, his ﷺ du'a in the night's sujud, Rabi'ah
// asking to be with him ﷺ in Paradise, and the marks of sujud the Fire cannot eat. Every card is one sahih hadith
// with its number, narrator and grade, and its exact English words to highlight. Points the schools differ on are
// left out, and none of these hadith is taught anywhere else in the app.

const SUJUD: DeepUnit = {
  key: "prayer-ruku-and-sujud-for-allah",
  topicId: "prayer",
  branchId: "prayer-ruku-and-sujud-for-allah",
  branch: { title: "Ruku' and sujud for Allah", description: "Glory in ruku', du'a in sujud, praise that fills the heavens, a long sujud at night, his ﷺ du'a in sujud, and marks the Fire cannot eat." },
  name: "ruku' and sujud for Allah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "glory-in-ruku-dua-in-sujud",
      title: "Glory in ruku', du'a in sujud",
      line: "Glorify Allah in ruku', and strive in du'a during sujud.",
      facts: ["Told by Ibn Abbas", "He ﷺ drew back the curtain and saw the rows", "The Quran is not recited in ruku' or sujud"],
      source: hadith("nasai", "1045", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ drew back the curtain while the people were in rows behind Abu Bakr, and said: I have been forbidden to recite the Quran when bowing or prostrating. As for bowing, glorify the Lord in it, and as for prostration, strive hard in du'a, for it is more deserving of a response.", "As for bowing, glorify the Lord therein, and as for prostration, strive hard in supplication for it is more deserving of a response"),
      difficulty: 1,
      questions: [
        { q: "What should we do in ruku', he ﷺ said?", a: "Glorify the Lord", wrong: ["Recite a long surah", "Talk to the person beside us", "Look up at the sky"], why: "As for bowing, glorify the Lord therein, he ﷺ said." },
        { q: "Why strive hard in du'a during sujud?", a: "More likely to be answered", wrong: ["So the prayer ends sooner", "So people can hear us", "To keep the sujud short"], why: "Strive hard in supplication, for it is more deserving of a response, he ﷺ said." },
        { q: "The Quran is not recited in ruku' or sujud.", tf: true, why: "I have been forbidden to recite the Quran when bowing or prostrating, he ﷺ said." }
      ]
    },
    {
      slug: "praise-that-fills-the-heavens",
      title: "Praise that fills the heavens",
      line: "Rising from ruku': praise that fills the heavens and earth.",
      facts: ["Told by Abdullah ibn Abi Awfa", "Mil' as-samawat: as much as fills the heavens", "And as much as You will after that"],
      source: hadith("ibnmajah", "878", "Abdullah ibn Abi Awfa", "Sahih (Al-Albani)", "Ibn Abi Awfa said: when the Messenger of Allah ﷺ raised his head from ruku', he said: Sami' Allahu liman hamidah, Allahumma Rabbana lakal-hamd, mil' as-samawati wa mil' al-ard wa mil' ma shi'ta min shay'in ba'd: Allah hears whoever praises Him. O Allah, our Lord, to You is the praise, as much as fills the heavens, as much as fills the earth, and as much as You will after that.", "O our Lord, to You is the praise as much as fills the heavens, as much as fills the earth and as much as You will after that"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ praise Allah to fill the heavens and earth?", a: "On rising from ruku'", wrong: ["Before the first takbir", "While leaving the masjid", "After the final salam"], why: "When he raised his head from ruku', he said: Rabbana lakal-hamd, Ibn Abi Awfa said." },
        { q: "How much praise does the du'a give Allah?", a: "As much as fills the heavens and earth", wrong: ["Just a little", "As much as one hand holds", "As much as one day"], why: "To You is the praise, as much as fills the heavens and the earth, he ﷺ said." },
        { q: "Sami' Allahu liman hamidah means: Allah hears whoever praises Him.", tf: true, why: "He ﷺ said it as he rose from ruku', then praised his Lord." }
      ]
    },
    {
      slug: "a-sujud-of-fifty-verses",
      title: "A sujud of fifty verses",
      line: "At night, his ﷺ sujud lasted as long as fifty verses.",
      facts: ["Told by Aishah", "This was in his ﷺ prayer at night", "One could recite fifty verses before he rose"],
      source: hadith("bukhari", "1123", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ prayed at night, and he made his sujud so long that one of you could recite fifty verses of the Quran before he raised his head.", "He used to prolong the prostration to such an extent that one could recite fifty verses"),
      difficulty: 2,
      questions: [
        { q: "How long was his ﷺ sujud in the night prayer?", a: "As long as fifty verses", wrong: ["One quick breath", "A whole night", "Five short words"], why: "One could recite fifty verses before he would lift his head, Aishah said." },
        { q: "When did he ﷺ make such long sujud?", a: "In his prayer at night", wrong: ["Only at Jumu'ah", "Only on Eid", "Only on journeys"], why: "Aishah was telling of his prayer at night, in which he lengthened the prostration." },
        { q: "His ﷺ sujud at night was long and unhurried.", tf: true, why: "He used to prolong the prostration so much that one could recite fifty verses." }
      ]
    },
    {
      slug: "refuge-in-his-pleasure",
      title: "His du'a in the night's sujud",
      line: "In sujud he ﷺ sought refuge in Allah's pleasure from His anger.",
      facts: ["Told by Aishah", "She looked for him ﷺ in the night", "He ﷺ was in sujud, saying this du'a"],
      source: hadith("tirmidhi", "3493", "Aishah", "Sahih (Al-Albani)", "Aishah said: I was sleeping beside the Messenger of Allah ﷺ and missed him in the night. I felt for him, and my hand fell on his feet while he was in sujud, saying: I seek refuge in Your pleasure from Your anger, and in Your pardon from Your punishment. I cannot count Your praises. You are as You have praised Yourself.", "I seek refuge in Your pleasure from Your anger, and in Your pardon from Your punishment"),
      difficulty: 2,
      questions: [
        { q: "Where did Aishah find him ﷺ that night?", a: "In sujud, making du'a", wrong: ["Out in the market", "Asleep in his bed", "Reciting on the roof"], why: "My hand fell upon his feet while he was prostrating, Aishah said." },
        { q: "In Allah's pardon, he ﷺ sought refuge from what?", a: "His punishment", wrong: ["His mercy", "His blessings", "His help"], why: "I seek refuge in Your pardon from Your punishment, he ﷺ said in sujud." },
        { q: "In the du'a he ﷺ said: I cannot count Your praises.", tf: true, why: "You are as You have praised Yourself, he ﷺ went on, still in sujud." }
      ]
    },
    {
      slug: "help-me-with-much-sujud",
      title: "Help me with much sujud",
      line: "To be with him ﷺ in Paradise, prostrate a great deal.",
      facts: ["Told by Rabi'ah ibn Ka'b al-Aslami", "He brought him ﷺ water for wudu and served him", "Ask of me, he ﷺ told him"],
      source: hadith("nasai", "1138", "Rabi'ah ibn Ka'b al-Aslami", "Sahih (Al-Albani)", "Rabi'ah ibn Ka'b al-Aslami said: I used to bring the Messenger of Allah ﷺ water for wudu and serve him. He said: ask of me. I said: I want to be with you in Paradise. He said: is there anything else? I said: that is all. He said: then help me to fulfil your wish by prostrating a great deal.", "Help me to fulfill your wish by prostrating a great deal"),
      difficulty: 1,
      questions: [
        { q: "What did Rabi'ah ask for when told: ask of me?", a: "To be with him ﷺ in Paradise", wrong: ["A house in Madinah", "A fast horse", "A bag of gold"], why: "I want to be with you in Paradise, Rabi'ah ibn Ka'b told him." },
        { q: "How did he ﷺ tell Rabi'ah to help with his wish?", a: "By prostrating a great deal", wrong: ["By running every day", "By building a house", "By selling his camel"], why: "Help me to fulfill your wish by prostrating a great deal, he ﷺ said." },
        { q: "Much sujud can bring a person near him ﷺ in Paradise.", tf: true, why: "He ﷺ told Rabi'ah to help with his wish to be with him by prostrating a great deal." }
      ]
    },
    {
      slug: "marks-the-fire-cannot-eat",
      title: "Marks the Fire cannot eat",
      line: "Allah forbade the Fire to eat the marks of sujud.",
      facts: ["Told by Abu Hurairah", "Some believers will be taken out of the Fire", "The angels know them by their marks of sujud"],
      source: hadith("bukhari", "806", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said, telling of the Day of Resurrection: Allah will order the angels to take out of the Fire those who worshipped none but Him. The angels will know them by the traces of prostration, for Allah has forbidden the Fire to eat away those traces.", "The angels will take them out by recognizing them from the traces of prostrations"),
      difficulty: 3,
      questions: [
        { q: "How will the angels know whom to take out of the Fire?", a: "By their marks of sujud", wrong: ["By their fine clothes", "By their loud voices", "By their tall height"], why: "They will recognize them from the traces of prostrations, he ﷺ said." },
        { q: "What has Allah forbidden the Fire to eat?", a: "The marks of sujud", wrong: ["Only the hair", "Only the hands", "Nothing at all"], why: "The angels know them by the traces of prostration, which the Fire cannot touch." },
        { q: "Those taken out had worshipped none but Allah.", tf: true, why: "Allah orders the angels to take out those who worshipped none but Him, he ﷺ said." }
      ]
    }
  ]
};

export const PRAYER_SUJUD_UNITS: readonly DeepUnit[] = [SUJUD];
