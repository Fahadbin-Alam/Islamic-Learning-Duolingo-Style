import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: the words said inside the salah, from Sunan Abi Dawud and Sahih al-Bukhari. How he ﷺ opened
// the prayer, what he said in a long ruku' at night, Subbuhun Quddus in ruku' and sujud, Rabbana lakal hamd that
// matches the angels, the praise that over thirty angels raced to write, and asking forgiveness for every sin in
// sujud. Every card is one sahih hadith with its number, narrator and grade, and its exact English words to
// highlight. Points the schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const WORDS: DeepUnit = {
  key: "prayer-words-of-salah",
  topicId: "prayer",
  branchId: "prayer-words-of-salah",
  branch: { title: "Words inside the salah", description: "How he ﷺ opened the salah, what he said in ruku' and sujud, the praise over thirty angels raced to write, and asking forgiveness for every sin." },
  name: "words inside the salah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "opening-the-salah",
      title: "Opening the salah",
      line: "He ﷺ opened his salah with: Subhanakallahumma wa bihamdik.",
      facts: ["Told by Aishah", "Subhanakallahumma wa bihamdik: glory and praise to You, O Allah", "Wa tabarakasmuk: and blessed is Your name"],
      source: hadith("abudawud", "776", "Aishah", "Sahih (Al-Albani)", "Aishah said: when the Messenger of Allah ﷺ began his prayer, he said: glory be to You, O Allah, and praise be to You; blessed is Your name, exalted is Your majesty, and none has the right to be worshipped but You.", "Blessed is Thy name, and Exalted is Thy greatness"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ say Subhanakallahumma wa bihamdik?", a: "When he began his prayer", wrong: ["When he finished eating", "When he saw the new moon", "When he heard thunder"], why: "When the Messenger of Allah ﷺ began his prayer, he said it, Aishah said." },
        { q: "What does wa tabarakasmuk mean?", a: "Blessed is Your name", wrong: ["Great is Your house", "Near is Your help", "Wide is Your mercy"], why: "Then: wa ta'ala jadduk, exalted is Your majesty, and none is worshipped but You." },
        { q: "He ﷺ began his prayer by praising Allah's name and majesty.", tf: true, why: "Blessed is Your name, and exalted is Your majesty, he ﷺ said as he began." }
      ]
    },
    {
      slug: "glory-in-a-long-ruku",
      title: "Glory in a long ruku'",
      line: "In a long night ruku', he ﷺ glorified Allah's might.",
      facts: ["Told by Awf ibn Malik", "At an ayah of mercy he ﷺ stopped and asked", "In ruku': Subhana dhil-jabaruti wal-malakut"],
      source: hadith("abudawud", "873", "Awf ibn Malik", "Sahih (Al-Albani)", "Awf ibn Malik said: I stood in prayer with the Messenger of Allah ﷺ. He recited al-Baqarah, stopping at every ayah of mercy to ask and at every ayah of punishment to seek refuge. Then he bowed as long as he had stood, saying in his ruku': glory be to the Owner of might, dominion, grandeur and majesty.", "Glory be to the Possessor of greatness, the Kingdom, grandeur and majesty"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do at each ayah of mercy?", a: "He stopped and asked Allah", wrong: ["He bowed right away", "He sat down", "He said salam"], why: "At an ayah of punishment he stopped and sought refuge in Allah, Awf said." },
        { q: "What did he ﷺ say in that long ruku'?", a: "Subhana dhil-jabarut", wrong: ["Allahu akbar kabira", "Rabbana atina", "Hasbunallah"], why: "Glory be to the Owner of might, dominion, grandeur and majesty, he ﷺ said." },
        { q: "His ruku' that night was as long as his standing.", tf: true, why: "Then he bowed and paused as long as he stood reciting al-Baqarah, Awf said." }
      ]
    },
    {
      slug: "subbuhun-quddus",
      title: "Subbuhun Quddus",
      line: "In ruku' and sujud he ﷺ said: Subbuhun Quddus.",
      facts: ["Told by Aishah", "Subbuhun Quddusun Rabbul-mala'ikati war-ruh", "Lord of the angels and the Spirit"],
      source: hadith("abudawud", "872", "Aishah", "Sahih (Al-Albani)", "Aishah said: when bowing and prostrating, the Prophet ﷺ used to say: All-Glorious, All-Holy, Lord of the angels and the Spirit.", "All-Glorious, All-Holy, Lord of the angels and spirit"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ say Subbuhun Quddus?", a: "In ruku' and sujud", wrong: ["Before the adhan", "After eating", "When it rained"], why: "All-Glorious, All-Holy, Lord of the angels and the Spirit, he ﷺ used to say." },
        { q: "What does Quddus mean?", a: "Pure, far above every fault", wrong: ["Seeing all things", "Hearing all things", "Knowing all things"], why: "Subbuhun is the All-Glorious; Quddus, the All-Holy, far above every fault." },
        { q: "Subbuhun Quddus praises Allah as Lord of the angels.", tf: true, why: "Lord of the angels and the Spirit, he ﷺ said in his ruku' and sujud." }
      ]
    },
    {
      slug: "rabbana-lakal-hamd",
      title: "Rabbana lakal hamd",
      line: "When your hamd matches the angels', past sins are forgiven.",
      facts: ["Told by Abu Hurairah", "The imam says: Sami'Allahu liman hamidah", "You say: Allahumma Rabbana lakal hamd"],
      source: hadith("bukhari", "796", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: when the imam says: Sami'Allahu liman hamidah, say: Allahumma Rabbana lakal hamd. Whoever's words match the words of the angels will have his past sins forgiven.", "And if the saying of any one of you coincides with that of the angels, all his past sins will be forgiven"),
      difficulty: 1,
      questions: [
        { q: "When the imam says Sami'Allahu liman hamidah, what do you say?", a: "Allahumma Rabbana lakal hamd", wrong: ["Allahu akbar", "Amin", "Astaghfirullah"], why: "Whoever's words match the angels' will have past sins forgiven, he ﷺ said." },
        { q: "What is forgiven for one whose words match the angels'?", a: "His past sins", wrong: ["Only his debts", "Only one sin", "Nothing at all"], why: "Allahumma Rabbana lakal hamd: say it as the imam rises, he ﷺ said." },
        { q: "The angels also say Rabbana lakal hamd at that moment.", tf: true, why: "If the saying of one of you coincides with the angels', past sins are forgiven." }
      ]
    },
    {
      slug: "thirty-angels-raced",
      title: "Over thirty angels",
      line: "Over thirty angels raced to write one man's praise.",
      facts: ["Told by Rifa'ah ibn Rafi'", "Rabbana wa lakal-hamd, hamdan kathiran tayyiban mubarakan fih", "Much praise, good and blessed"],
      source: hadith("bukhari", "799", "Rifa'ah ibn Rafi'", "Sahih", "Rifa'ah said: we were praying behind the Prophet ﷺ. When he raised his head from ruku' and said Sami'Allahu liman hamidah, a man behind him said: our Lord, to You is all praise, much good and blessed praise. After the prayer he ﷺ asked who had said it, and said: I saw over thirty angels racing to be the first to write it.", "I saw over thirty angels competing to write it first"),
      difficulty: 2,
      questions: [
        { q: "How many angels raced to write the man's words?", a: "Over thirty", wrong: ["Exactly two", "Over a thousand", "Only one angel"], why: "Rabbana wa lakal-hamd, hamdan kathiran tayyiban mubarakan fih, the man had said." },
        { q: "When did the man say hamdan kathiran tayyiban?", a: "On rising from ruku'", wrong: ["Before the takbir", "In the last sitting", "After the salam"], why: "As he ﷺ raised his head from bowing and said Sami'Allahu liman hamidah, Rifa'ah said." },
        { q: "He ﷺ asked after the prayer who had said those words.", tf: true, why: "When the prayer ended he ﷺ asked who said them, and the man said: I." }
      ]
    },
    {
      slug: "forgive-me-all-my-sins",
      title: "Forgive me all my sins",
      line: "In sujud he ﷺ asked: forgive me all my sins.",
      facts: ["Told by Abu Hurairah", "Allahummaghfir li dhanbi kullah", "Small and great, first and last, open and secret"],
      source: hadith("abudawud", "878", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: in sujud, the Prophet ﷺ used to say: O Allah, forgive me all my sins, the small and the great, the first and the last, the open and the secret.", "O Allah. Forgive me all my sins, small and great, first and last"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ ask: forgive me all my sins?", a: "In sujud", wrong: ["In the adhan", "At iftar", "In the khutbah"], why: "Small and great, first and last, he ﷺ asked for them all, Abu Hurairah said." },
        { q: "Which sins did he ﷺ ask Allah to forgive?", a: "Every one of them", wrong: ["Only the great ones", "Only the new ones", "Only the hidden ones"], why: "Small and great, first and last, open and secret: he ﷺ named them all." },
        { q: "He ﷺ asked forgiveness for small sins as well as great ones.", tf: true, why: "O Allah, forgive me all my sins, small and great, first and last, he ﷺ said." }
      ]
    }
  ]
};

export const PRAYER_WORDS_UNITS: DeepUnit[] = [WORDS];
