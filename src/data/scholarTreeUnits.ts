import type { LessonSource } from "../types";
import type { DeepUnit } from "./deepUnits";

// Lessons for the people on the Scholars family tree who had none: the Sahabah at its top, the Tabi'in, and the
// imams and hadith masters between them. Each unit is about the person's knowledge: what they learned, taught and
// passed on (Aishah's life as a wife of the Prophet ﷺ is in Great Women; Umar's life is in Sahabah).
// Every fact is from a hadith in Sahih al-Bukhari or Sahih Muslim (checked in the Arabic and English texts), or
// from adh-Dhahabi's Siyar A'lam an-Nubala by volume/page (checked in the Arabic text). Only what the source states
// plainly is used; anything it hedges, calls weak, or gives differing reports on is left out.

function hadith(book: "bukhari" | "muslim", number: string, narrator: string, summary: string): LessonSource {
  const [collection, collector] = book === "bukhari" ? ["Sahih al-Bukhari", "Imam al-Bukhari"] : ["Sahih Muslim", "Imam Muslim"];
  return {
    id: `deep_${book}_${number.replace(/\W+/g, "_")}`,
    site: "Sunnah.com",
    category: "hadith",
    title: `${collection} ${number}`,
    url: `https://sunnah.com/${book}:${number}`,
    reference: `${collection} ${number}`,
    from: `${narrator}; collected by ${collector}`,
    grade: "Sahih",
    summary
  };
}

function siyar(volume: number, page: number, summary: string): LessonSource {
  return {
    id: `deep_siyar_${volume}_${page}`,
    site: "Shamela",
    category: "biography",
    title: `Siyar A'lam an-Nubala ${volume}/${page}`,
    url: "https://shamela.ws/book/10906",
    reference: `Siyar A'lam an-Nubala ${volume}/${page}`,
    from: "Siyar A'lam an-Nubala by adh-Dhahabi (Arabic, on Shamela)",
    grade: "Biography",
    summary
  };
}

const LATER = ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"] as const;

const AISHAH: DeepUnit = {
  key: "tree-aishah",
  topicId: "scholars",
  branchId: "scholar-aishah",
  name: "Aishah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "most-fiqh",
      title: "The most fiqh of all women",
      line: "Aishah had the most fiqh of all the women of this Ummah.",
      facts: ["Fiqh: understanding the rulings of the religion", "Daughter of Abu Bakr"],
      source: siyar(2, 135, "Aishah, daughter of Abu Bakr, Mother of the Believers, wife of the Prophet ﷺ: the woman with the most fiqh in the whole Ummah."),
      difficulty: 1,
      questions: [
        { q: "What is fiqh?", a: "Understanding the rulings of the religion", wrong: ["Writing Arabic poems", "Learning the stars", "Telling old stories"], why: "Fiqh tells you how to pray, fast, trade and live by Islam." },
        { q: "Whose daughter was Aishah?", a: "Abu Bakr", wrong: ["Umar", "Uthman", "Ali"], why: "She was the daughter of Abu Bakr as-Siddiq." },
        { q: "Of all the women of this Ummah, Aishah had the most fiqh.", tf: true, why: "Adh-Dhahabi says so at the start of her life story." }
      ]
    },
    {
      slug: "asked-until-understood",
      title: "She asked until she understood",
      line: "Aishah kept asking until she understood.",
      facts: ["She asked about Quran 84:8", "Easy reckoning: deeds are only shown"],
      source: hadith("bukhari", "103", "Ibn Abi Mulaykah", "Whenever Aishah heard something she did not understand, she asked about it again until she understood. She asked about 'an easy reckoning' (84:8), and the Prophet ﷺ said it is only the showing of the deeds."),
      difficulty: 2,
      questions: [
        { q: "What did Aishah do when she did not understand something?", a: "She asked again until she understood", wrong: ["She stayed quiet", "She guessed the meaning", "She waited for years"], why: "A good student asks." },
        { q: "Which ayah did Aishah ask the Prophet ﷺ about?", a: "He will have an easy reckoning", wrong: ["Read in the name of your Lord", "Say: He is Allah, One", "By time"], why: "Surah Al-Inshiqaq 84:8." },
        { q: "The Prophet ﷺ said the easy reckoning is only the showing of the deeds.", tf: true, why: "Whoever is argued with over his deeds is ruined." }
      ]
    },
    {
      slug: "her-hadith",
      title: "2,210 hadith",
      line: "Aishah narrated about 2,210 hadith from the Prophet ﷺ.",
      facts: ["174 are in both al-Bukhari and Muslim", "Al-Bukhari alone: 54. Muslim alone: 69."],
      source: siyar(2, 139, "The Musnad of Aishah reaches 2,210 hadith. Al-Bukhari and Muslim both have 174 of them; al-Bukhari alone has 54, and Muslim alone 69."),
      difficulty: 2,
      questions: [
        { q: "About how many hadith did Aishah narrate?", a: "2,210", wrong: ["22", "210", "22,000"], why: "Adh-Dhahabi counts 2,210 in her Musnad." },
        { q: "How many of her hadith are in BOTH al-Bukhari and Muslim?", a: "174", wrong: ["4", "54", "2,210"], why: "54 more are in al-Bukhari alone, and 69 in Muslim alone." },
        { q: "Only men narrated hadith from the Prophet ﷺ.", tf: false, why: "Aishah alone narrated over two thousand." }
      ]
    },
    {
      slug: "her-students",
      title: "Even Sahabah learned from her",
      line: "Sahabah like Ibn Umar and Ibn Abbas narrated hadith from Aishah.",
      facts: ["Ata ibn Abi Rabah too", "And a great many Tabi'in"],
      source: siyar(2, 137, "Among those who narrated from her: Ibn Umar, Ibn Abbas, Ata ibn Abi Rabah, Alqamah, Alqamah ibn Waqqas, and a great many others."),
      difficulty: 3,
      questions: [
        { q: "Which of these men narrated hadith from Aishah?", a: "Ibn Abbas", wrong: [...LATER], why: "The other three lived long after her." },
        { q: "Which Tabi'i on the tree also narrated from Aishah?", a: "Ata ibn Abi Rabah", wrong: [...LATER], why: "Ata later taught Abu Hanifah." },
        { q: "Aishah taught both Sahabah and Tabi'in.", tf: true, why: "Even great Sahabah came to learn from her." }
      ]
    },
    {
      slug: "inheritance",
      title: "The elders asked her",
      line: "The senior Sahabah asked Aishah about the shares of inheritance.",
      facts: ["Masruq saw it himself", "Inheritance shares: al-fara'id"],
      source: siyar(2, 182, "Masruq was asked: did Aishah know the shares of inheritance well? He said: By Allah, I saw the senior companions of Muhammad ﷺ asking her about them."),
      difficulty: 3,
      questions: [
        { q: "What did the senior Sahabah ask Aishah about?", a: "The shares of inheritance", wrong: ["Trade routes", "Building houses", "Poetry contests"], why: "Masruq swore he saw it." },
        { q: "Who said he saw the senior Sahabah asking her?", a: "Masruq", wrong: [...LATER], why: "Masruq was a Tabi'i who learned from her." },
        { q: "The senior Sahabah never asked a woman about the religion.", tf: false, why: "They asked Aishah, because she knew." }
      ]
    },
    {
      slug: "what-she-knew",
      title: "Ayahs, sunnah and medicine",
      line: "Urwah: no one knew more Quran, sunnah or medicine than her.",
      facts: ["Also inheritance, history and family lines", "She learned medicine by listening"],
      source: siyar(2, 183, "Urwah: I never saw anyone who knew more about an ayah that came down, an obligation, a sunnah, poetry, the days of the Arabs, family lines, judging or medicine than her. She said she learned medicine by hearing people describe cures, and memorizing it."),
      difficulty: 4,
      questions: [
        { q: "How did Aishah learn medicine?", a: "By listening and memorizing", wrong: ["From Greek books", "At a school in Sham", "She never learned it"], why: "She heard people describe cures, and kept them in memory." },
        { q: "Urwah listed what Aishah knew well. Which was NOT on his list?", a: "Building ships", wrong: ["Poetry", "Medicine", "Family lines"], why: "He named the Quran, sunnah, poetry, history, lineage, judging and medicine." },
        { q: "Aishah's knowledge was only about women's matters.", tf: false, why: "She knew the Quran, sunnah, inheritance, poetry, history and medicine." }
      ]
    },
    {
      slug: "ata-and-zuhri",
      title: "What the Tabi'in said",
      line: "Az-Zuhri: Aishah's knowledge outweighs that of all women.",
      facts: ["Ata: she had the most fiqh of people", "Ata and az-Zuhri are on the tree"],
      source: siyar(2, 185, "Ata ibn Abi Rabah said: Aishah had the most fiqh of people, and the best opinion. Az-Zuhri said: if Aishah's knowledge were gathered beside the knowledge of all the women, hers would be greater."),
      difficulty: 5,
      questions: [
        { q: "Az-Zuhri said: put Aishah's knowledge beside all the women's, and...", a: "hers would be greater", wrong: ["they would be equal", "hers would be less", "no one could tell"], why: "He was a great scholar of Madinah." },
        { q: "Ata said Aishah had the most ___ of people.", a: "fiqh", wrong: ["wealth", "servants", "camels"], why: "Ata himself was the mufti of Makkah." },
        { q: "Ata and az-Zuhri, who praised her, are both on the scholars tree.", tf: true, why: "Ata taught Abu Hanifah; az-Zuhri taught Imam Malik." }
      ]
    }
  ]
};

const UMAR: DeepUnit = {
  key: "tree-umar",
  topicId: "scholars",
  branchId: "scholar-umar",
  name: "Umar",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "milk-of-knowledge",
      title: "The milk of knowledge",
      line: "In a dream, the Prophet ﷺ gave Umar milk: knowledge.",
      facts: ["The Prophet ﷺ drank his fill first", "Then he gave Umar the rest"],
      source: hadith("bukhari", "82", "Ibn Umar", "The Prophet ﷺ saw in a dream a cup of milk; he drank, then gave what was left to Umar. Asked what it meant, he said: knowledge."),
      difficulty: 1,
      questions: [
        { q: "In the dream, what did the Prophet ﷺ give Umar?", a: "His leftover milk", wrong: ["A sword", "A ring", "A book"], why: "He drank his fill, then gave Umar the rest." },
        { q: "What did the milk in the dream mean?", a: "Knowledge", wrong: ["Wealth", "Power", "A long life"], why: "The Prophet ﷺ explained it himself." },
        { q: "Umar's knowledge came from the Prophet ﷺ.", tf: true, why: "The milk passed from the Prophet ﷺ to him." }
      ]
    },
    {
      slug: "on-the-minbar",
      title: "Actions are by intentions",
      line: "Umar taught from the minbar: actions are only by intentions.",
      facts: ["The first hadith in Sahih al-Bukhari", "Umar heard it from the Prophet ﷺ"],
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Umar said on the minbar: I heard the Messenger of Allah ﷺ say: Actions are only by intentions, and each person gets what he intended."),
      difficulty: 2,
      questions: [
        { q: "Which hadith did Umar teach from the minbar?", a: "Actions are only by intentions", wrong: ["Smiling is charity", "Do not be angry", "The strong man controls himself"], why: "Every deed is judged by why you did it." },
        { q: "Where is this hadith in Sahih al-Bukhari?", a: "It is the very first", wrong: ["It is the last", "It is not in it", "It is in the middle"], why: "Al-Bukhari opened his book with it." },
        { q: "Al-Bukhari's chain for this hadith goes through Umar to the Prophet ﷺ.", tf: true, why: "Tap Umar on the tree to see the whole chain." }
      ]
    },
    {
      slug: "jibril-came",
      title: "When Jibril came to teach",
      line: "Umar saw Jibril come as a man to teach the religion.",
      facts: ["Very white clothes, very black hair", "He asked, the Prophet ﷺ answered"],
      source: hadith("muslim", "8a", "Umar ibn al-Khattab", "Umar: while we sat with the Messenger of Allah ﷺ, a man in very white clothes came and asked about Islam, Iman, Ihsan and the Hour. The Prophet ﷺ said: That was Jibril, who came to teach you your religion."),
      difficulty: 2,
      questions: [
        { q: "Who came in very white clothes to ask the Prophet ﷺ?", a: "Jibril", wrong: ["Abu Bakr", "A trader from Yemen", "Bilal"], why: "The Prophet ﷺ said: That was Jibril." },
        { q: "Which three did Jibril ask about?", a: "Islam, Iman and Ihsan", wrong: ["Salah, Zakah and Hajj", "Makkah, Madinah and Quds", "Musa, Isa and Ibrahim"], why: "Then he asked about the Hour." },
        { q: "Why did Jibril come?", a: "To teach the Muslims their religion", wrong: ["To bring a new book", "To lead the prayer", "To warn of an army"], why: "The Prophet ﷺ said he came to teach you your religion." }
      ]
    },
    {
      slug: "inspired",
      title: "The inspired one",
      line: "If anyone in this Ummah is inspired, it is Umar.",
      facts: ["Inspired: guided to the right view", "He was not a prophet"],
      source: hadith("bukhari", "3689", "Abu Hurayrah", "The Prophet ﷺ said: Among the nations before you were people who were inspired, though not prophets. If there is such a one in my Ummah, it is Umar."),
      difficulty: 3,
      questions: [
        { q: "Who did the Prophet ﷺ say would be the inspired one of his Ummah?", a: "Umar", wrong: ["Abu Jahl", "Abu Sufyan", "Khalid ibn al-Walid"], why: "If there is one, it is Umar." },
        { q: "What does 'inspired' mean in this hadith?", a: "Guided to the right view, but not a prophet", wrong: ["A new prophet", "Someone who knows the unseen", "A poet"], why: "The hadith says: though they were not prophets." },
        { q: "Umar was a prophet.", tf: false, why: "Muhammad ﷺ is the last prophet." }
      ]
    },
    {
      slug: "bring-a-witness",
      title: "Bring a witness",
      line: "Umar asked Abu Musa for a witness before he took his hadith.",
      facts: ["Abu Sa'id al-Khudri bore witness", "Umar: I was busy in the markets"],
      source: hadith("bukhari", "2062", "Ubayd ibn Umayr", "Abu Musa said they were told to leave after asking three times to come in. Umar said: bring a witness for it. Abu Sa'id al-Khudri bore witness, and Umar said: this was hidden from me; trading in the markets kept me busy."),
      difficulty: 4,
      questions: [
        { q: "What did Umar ask Abu Musa to bring?", a: "A witness for the hadith", wrong: ["A gift", "His sword", "A written book"], why: "Umar was careful with what was said about the Prophet ﷺ." },
        { q: "Who bore witness for Abu Musa?", a: "Abu Sa'id al-Khudri", wrong: ["Abu Bakr", "Uthman", "Ali"], why: "The youngest of the Ansar who were sitting there." },
        { q: "Umar said he missed this hadith because trade in the markets kept him busy.", tf: true, why: "Even Umar did not know every hadith." }
      ]
    },
    {
      slug: "a-teacher-for-kufa",
      title: "A teacher for Kufa",
      line: "Umar sent Ibn Mas'ud to teach the people of Kufa.",
      facts: ["Both fought at Badr", "Umar: I preferred you over myself"],
      source: siyar(1, 486, "Umar wrote to the people of Kufa: I have sent you Ammar as governor and Ibn Mas'ud as teacher and helper, both of the people of Badr; listen to them. I have preferred you over myself with Abdullah."),
      difficulty: 4,
      questions: [
        { q: "Whom did Umar send to Kufa as its teacher?", a: "Abdullah ibn Mas'ud", wrong: ["Abu Hurayrah", "Salman al-Farisi", "Bilal"], why: "And Ammar ibn Yasir as governor." },
        { q: "What did Umar mean by 'I preferred you over myself'?", a: "He gave up a scholar he needed", wrong: ["He wanted to leave Madinah", "He disliked Ibn Mas'ud", "He was sending gold"], why: "He kept less knowledge near him so Kufa could have more." },
        { q: "Ammar and Ibn Mas'ud had both fought at Badr.", tf: true, why: "Umar called them of the noblest companions, people of Badr." }
      ]
    },
    {
      slug: "young-ibn-abbas",
      title: "Knowledge before age",
      line: "Umar sat young Ibn Abbas with the elders, for his knowledge.",
      facts: ["He tested them on Surah An-Nasr", "Ibn Abbas: it told of the Prophet's ﷺ passing"],
      source: hadith("bukhari", "4970", "Ibn Abbas", "Umar made Ibn Abbas sit with the elders of Badr, because of his knowledge. He asked them about Surah An-Nasr; Ibn Abbas said it told the Prophet ﷺ his time was near, and Umar said: I know of it only what you know."),
      difficulty: 5,
      questions: [
        { q: "Why did Umar seat young Ibn Abbas with the elders of Badr?", a: "Because of his knowledge", wrong: ["Because he was rich", "Because he was the oldest", "Because he was a governor"], why: "Umar honoured knowledge, not age." },
        { q: "Which surah did Umar ask them about?", a: "An-Nasr", wrong: ["Al-Fatihah", "Al-Ikhlas", "Al-Asr"], why: "When the help of Allah and the victory come." },
        { q: "Umar agreed with Ibn Abbas's meaning of the surah.", tf: true, why: "He said: I know of it only what you know." }
      ]
    }
  ]
};

const IBN_UMAR: DeepUnit = {
  key: "tree-ibn-umar",
  topicId: "scholars",
  branchId: "scholar-ibn-umar",
  name: "Ibn Umar",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "much-knowledge",
      title: "Umar's son",
      line: "Ibn Umar narrated much knowledge from the Prophet ﷺ.",
      facts: ["Also from his father, Abu Bakr, Uthman and Ali", "Too young for Uhud; first battle: the Trench"],
      source: siyar(3, 204, "Too young at Uhud, his first battle was the Trench, and he gave the pledge under the tree. He narrated much beneficial knowledge from the Prophet ﷺ, his father, Abu Bakr, Uthman, Ali and others."),
      difficulty: 1,
      questions: [
        { q: "Who was Abdullah ibn Umar's father?", a: "Umar ibn al-Khattab", wrong: ["Abu Bakr", "Uthman", "Abu Hurayrah"], why: "Ibn Umar means Umar's son." },
        { q: "What was Ibn Umar's first battle?", a: "The Trench", wrong: ["Badr", "Uhud", "Yarmuk"], why: "He was too young for Uhud." },
        { q: "Ibn Umar narrated from Abu Bakr, Uthman and Ali as well as the Prophet ﷺ.", tf: true, why: "He learned from the greatest Sahabah." }
      ]
    },
    {
      slug: "a-righteous-man",
      title: "A righteous man",
      line: "What a good man Abdullah is, if only he prayed at night!",
      facts: ["After that he slept only a little at night", "Hafsah, his sister, told the Prophet ﷺ his dream"],
      source: hadith("bukhari", "3739", "Ibn Umar", "Ibn Umar told Hafsah a dream, and she told the Prophet ﷺ, who said: What an excellent man Abdullah is, if only he prayed at night. After that, Abdullah slept only a little at night."),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ wish Ibn Umar would do?", a: "Pray at night", wrong: ["Trade more", "Move to Makkah", "Write poetry"], why: "What an excellent man, if only he prayed at night." },
        { q: "Who took Ibn Umar's dream to the Prophet ﷺ?", a: "Hafsah, his sister", wrong: ["Aishah", "His mother", "Abu Bakr"], why: "Hafsah was a wife of the Prophet ﷺ and Umar's daughter." },
        { q: "After this, Ibn Umar slept only a little at night.", tf: true, why: "He acted on the advice straight away." }
      ]
    },
    {
      slug: "sixty-years",
      title: "Sixty years of fatwa",
      line: "Imam Malik: Ibn Umar gave the people fatwa for sixty years.",
      facts: ["Fatwa: an answer on a matter of religion", "Madinah's imam after Zayd ibn Thabit"],
      source: siyar(3, 221, "Malik said: the imam of the people here after Zayd ibn Thabit was Abdullah ibn Umar; he stayed sixty years giving the people fatwa."),
      difficulty: 2,
      questions: [
        { q: "For how long did Ibn Umar give fatwa?", a: "Sixty years", wrong: ["Six months", "Six years", "Six hundred years"], why: "Imam Malik said so." },
        { q: "What is a fatwa?", a: "An answer on a matter of religion", wrong: ["A tax", "A battle plan", "A kind of prayer"], why: "People asked; the scholar answered." },
        { q: "Imam Malik, from Madinah, praised Ibn Umar as an imam of Madinah.", tf: true, why: "He was the imam after Zayd ibn Thabit." }
      ]
    },
    {
      slug: "careful-answers",
      title: "Careful with answers",
      line: "Ibn Umar turned away more questions than he answered.",
      facts: ["Ibn Abbas answered every question", "Nafi sat with both of them"],
      source: siyar(3, 222, "Nafi: Ibn Umar and Ibn Abbas sat for the people when the pilgrims came. Ibn Abbas answered and gave fatwa on everything he was asked, and Ibn Umar turned back more than he answered."),
      difficulty: 3,
      questions: [
        { q: "Who answered almost every question at Hajj time?", a: "Ibn Abbas", wrong: ["Ibn Umar", "Nafi", "Imam Malik"], why: "Ibn Umar held back more often." },
        { q: "Why would a scholar turn a question away?", a: "To avoid speaking about Allah's religion without sure knowledge", wrong: ["He was lazy", "He disliked people", "He was paid not to answer"], why: "Saying something wrong about the religion is serious." },
        { q: "Nafi sat with Ibn Umar one day and Ibn Abbas the next.", tf: true, why: "So he saw how each of them answered." }
      ]
    },
    {
      slug: "follow-the-sunnah",
      title: "Following the Prophet ﷺ",
      line: "Ibn Umar followed the Prophet's ﷺ way with great care.",
      facts: ["Malik reported it", "He watched how the Prophet ﷺ did things"],
      source: siyar(3, 213, "Malik: Ibn Umar followed the affair of the Messenger of Allah ﷺ, his traces and his ways, and cared about it greatly."),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Umar care about most?", a: "Following the Prophet's ﷺ way", wrong: ["Gathering wealth", "Becoming caliph", "Winning debates"], why: "He wanted to do things as the Prophet ﷺ did." },
        { q: "Which imam reported this about Ibn Umar?", a: "Imam Malik", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "Malik of Madinah, who learned through Nafi." },
        { q: "The sunnah is the way of the Prophet ﷺ.", tf: true, why: "His words, his deeds and what he approved." }
      ]
    },
    {
      slug: "all-knowledge",
      title: "Write me all knowledge",
      line: "Asked to write all knowledge, Ibn Umar gave four rules.",
      facts: ["Meet Allah free of people's blood and wealth", "Hold your tongue from their honour; stay with the Muslims"],
      source: siyar(3, 222, "A man wrote to Ibn Umar: write me all of knowledge. He wrote back: knowledge is a lot, but if you can meet Allah with no people's blood on you, none of their wealth in your stomach, your tongue held back from their honour, and keeping to their jama'ah, then do so."),
      difficulty: 4,
      questions: [
        { q: "What did Ibn Umar say first, when asked for all knowledge?", a: "Knowledge is a lot", wrong: ["Here it is", "Ask my father", "Come back next year"], why: "No one can write all of it." },
        { q: "He said: meet Allah with none of people's ___ on you.", a: "blood", wrong: ["letters", "camels", "poems"], why: "Then their wealth, then their honour." },
        { q: "His advice was to keep to the main body (jama'ah) of the Muslims.", tf: true, why: "Do not split from them." }
      ]
    },
    {
      slug: "nafi-and-malik",
      title: "Malik, from Nafi, from Ibn Umar",
      line: "Ibn Umar's freed servant Nafi carried his hadith to Imam Malik.",
      facts: ["Nafi was his mawla", "Prayer together: 27 times better"],
      source: hadith("muslim", "650a", "Ibn Umar", "Malik, from Nafi, from Ibn Umar: the Messenger of Allah ﷺ said prayer in congregation is twenty-seven degrees better than prayer alone."),
      difficulty: 5,
      questions: [
        { q: "Who was Nafi?", a: "Ibn Umar's freed servant", wrong: ["Ibn Umar's father", "A Sahabi from Yemen", "A judge of Kufa"], why: "A mawla: freed, but still of his household." },
        { q: "Prayer in congregation is how many degrees better than alone?", a: "Twenty-seven", wrong: ["Two", "Seven", "Seventy"], why: "Malik, from Nafi, from Ibn Umar." },
        { q: "This chain runs: Malik, then Nafi, then Ibn Umar, then the Prophet ﷺ.", tf: true, why: "It is on the tree." }
      ]
    }
  ]
};

const IBN_ABBAS: DeepUnit = {
  key: "tree-ibn-abbas",
  topicId: "scholars",
  branchId: "scholar-ibn-abbas",
  name: "Ibn Abbas",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "teach-him-the-book",
      title: "Teach him the Book",
      line: "O Allah, teach him the Book: a dua for Ibn Abbas.",
      facts: ["The Book: the Quran", "Ibn Abbas was his cousin"],
      source: hadith("bukhari", "75", "Ibn Abbas", "The Prophet ﷺ embraced me and said: O Allah, teach him the Book."),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ ask Allah to teach Ibn Abbas?", a: "The Book (the Quran)", wrong: ["Trade", "Archery", "Poetry"], why: "O Allah, teach him the Book." },
        { q: "What was Ibn Abbas to the Prophet ﷺ?", a: "His cousin", wrong: ["His son", "His uncle", "His grandson"], why: "His father al-Abbas was the Prophet's ﷺ uncle." },
        { q: "The Prophet ﷺ made dua for Ibn Abbas while hugging him.", tf: true, why: "He embraced him, then made the dua." }
      ]
    },
    {
      slug: "water-for-wudu",
      title: "The water for wudu",
      line: "Ibn Abbas set out water, and got a dua for understanding.",
      facts: ["O Allah, give him understanding of the religion", "A small kind deed"],
      source: hadith("bukhari", "143", "Ibn Abbas", "The Prophet ﷺ found water placed for his wudu and asked who put it. Told it was Ibn Abbas, he said: O Allah, give him understanding of the religion."),
      difficulty: 1,
      questions: [
        { q: "What had Ibn Abbas put out for the Prophet ﷺ?", a: "Water for wudu", wrong: ["Dates for iftar", "A cushion", "His sandals"], why: "The Prophet ﷺ asked who put it there." },
        { q: "What did the Prophet ﷺ ask Allah to give him?", a: "Understanding of the religion", wrong: ["Gold", "A large family", "A strong horse"], why: "Fiqh in the religion." },
        { q: "A small kindness earned Ibn Abbas a great dua.", tf: true, why: "Serving the Prophet ﷺ brought him knowledge." }
      ]
    },
    {
      slug: "his-titles",
      title: "The scholar of the Ummah",
      line: "Ibn Abbas: the scholar of the Ummah, imam of tafsir.",
      facts: ["Hibr al-Ummah: its great scholar", "Tafsir: explaining the Quran"],
      source: siyar(3, 331, "Abdullah ibn Abbas: the great scholar (hibr) of the Ummah, the faqih of his time, the imam of tafsir, cousin of the Messenger of Allah ﷺ."),
      difficulty: 2,
      questions: [
        { q: "What is tafsir?", a: "Explaining the meaning of the Quran", wrong: ["Learning to write", "Counting stars", "A kind of fast"], why: "Ibn Abbas is called the imam of tafsir." },
        { q: "Which title belongs to Ibn Abbas?", a: "Scholar of the Ummah", wrong: ["Sword of Allah", "The Truthful", "Lion of Allah"], why: "Hibr al-Ummah. The others are Khalid, Abu Bakr and Hamzah." },
        { q: "The Prophet's ﷺ dua for Ibn Abbas came true.", tf: true, why: "He became the great scholar of the Quran." }
      ]
    },
    {
      slug: "at-the-door",
      title: "Waiting at the door",
      line: "Ibn Abbas waited in the dust at a teacher's door.",
      facts: ["He used his cloak as a pillow", "I have more right to come to you"],
      source: siyar(3, 343, "If a hadith reached me from a man, I went to him while he napped, rested my head on my cloak at his door, with the wind blowing dust on me. He would come out and say: Cousin of the Messenger of Allah, why did you not send for me? I said: I have more right to come to you and ask."),
      difficulty: 3,
      questions: [
        { q: "What did Ibn Abbas do while the Sahabi napped?", a: "Waited at his door", wrong: ["Woke him up", "Went home", "Sent a servant"], why: "He rested his head on his cloak in the dust." },
        { q: "Why did he not let the man come to him?", a: "The student should go to the teacher", wrong: ["He was too tired", "He was not allowed", "He wanted a gift"], why: "I have more right to come to you." },
        { q: "Ibn Abbas used his family's rank to make scholars come to him.", tf: false, why: "He went to them himself, and waited." }
      ]
    },
    {
      slug: "thirty-sahabah",
      title: "Thirty Sahabah, one question",
      line: "Ibn Abbas asked up to thirty Sahabah about one single matter.",
      facts: ["Adh-Dhahabi: its chain is sahih", "He checked from many sides"],
      source: siyar(3, 344, "Ibn Abbas said: I would ask thirty of the companions of the Prophet ﷺ about one matter. Adh-Dhahabi: its chain is sahih."),
      difficulty: 3,
      questions: [
        { q: "How many Sahabah did Ibn Abbas ask about one matter?", a: "Thirty", wrong: ["One", "Three", "Three hundred"], why: "He wanted the whole picture." },
        { q: "What does this teach a student?", a: "Check carefully before you are sure", wrong: ["Ask only one person", "Never ask anyone", "Trust any rumour"], why: "Knowledge needs care." },
        { q: "Adh-Dhahabi said the chain of this report is sahih.", tf: true, why: "Sahih: sound and authentic." }
      ]
    },
    {
      slug: "the-sea",
      title: "Al-Bahr: the sea",
      line: "Ibn Abbas was called al-Bahr, the sea, for how much he knew.",
      facts: ["Mujahid, his student, said it", "Tawus: no one knew more"],
      source: siyar(3, 350, "Tawus said: I saw none more learned than Ibn Abbas. Mujahid said: Ibn Abbas was called al-Bahr (the sea) because of his much knowledge."),
      difficulty: 4,
      questions: [
        { q: "What was Ibn Abbas called because of his knowledge?", a: "Al-Bahr, the sea", wrong: ["Al-Faruq", "As-Siddiq", "Dhun-Nurayn"], why: "His knowledge was wide and deep, like a sea." },
        { q: "Which of his students said he was called the sea?", a: "Mujahid", wrong: [...LATER], why: "Mujahid learned tafsir from him." },
        { q: "Tawus said he saw no one more learned than Ibn Abbas.", tf: true, why: "Tawus was one of the Tabi'in of Yemen." }
      ]
    },
    {
      slug: "interpreter-of-the-quran",
      title: "Interpreter of the Quran",
      line: "Ibn Mas'ud: Ibn Abbas is an excellent interpreter of the Quran.",
      facts: ["Tarjuman al-Quran", "Ibn Mas'ud was much older"],
      source: siyar(3, 347, "Abdullah ibn Mas'ud said: what an excellent interpreter (tarjuman) of the Quran Ibn Abbas is. He also said: if he had reached our age, none of us would come near him."),
      difficulty: 4,
      questions: [
        { q: "What did Ibn Mas'ud call Ibn Abbas?", a: "Interpreter of the Quran", wrong: ["Sword of Islam", "The caller to prayer", "The trustee of the Ummah"], why: "Tarjuman al-Quran." },
        { q: "Ibn Mas'ud said: if Ibn Abbas had reached our age...", a: "none of us would come near him", wrong: ["he would be caliph", "he would forget it all", "he would leave Makkah"], why: "He was young, yet already so learned." },
        { q: "Ibn Mas'ud was jealous of young Ibn Abbas.", tf: false, why: "He praised him highly." }
      ]
    },
    {
      slug: "his-students",
      title: "Student, then teacher",
      line: "Ibn Abbas learned from Ubayy and Zayd, then taught Mujahid.",
      facts: ["Sa'id ibn Jubayr read it to him too", "Ikrimah, Urwah and Tawus narrated from him"],
      source: siyar(3, 332, "Ibn Abbas read the Quran to Ubayy and Zayd. Mujahid, Sa'id ibn Jubayr and others read it to him. Among those who narrated from him: Ikrimah, Urwah ibn az-Zubayr, Tawus and many more."),
      difficulty: 5,
      questions: [
        { q: "To whom did Ibn Abbas read the Quran?", a: "Ubayy ibn Ka'b and Zayd ibn Thabit", wrong: ["Mujahid and Ata", "Malik and Nafi", "Al-Bukhari and Muslim"], why: "Two great Quran teachers among the Sahabah." },
        { q: "Who read the Quran to Ibn Abbas?", a: "Mujahid and Sa'id ibn Jubayr", wrong: ["Ubayy and Zayd", "Umar and Abu Bakr", "Malik and ash-Shafi'i"], why: "They became great scholars of tafsir." },
        { q: "Ibn Abbas was a student before he became a teacher.", tf: true, why: "Every teacher was first a student." }
      ]
    }
  ]
};

const IBN_MASUD: DeepUnit = {
  key: "tree-ibn-masud",
  topicId: "scholars",
  branchId: "scholar-ibn-masud",
  name: "Ibn Mas'ud",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-shepherd-boy",
      title: "The shepherd boy",
      line: "You are a boy who will be taught, said the Prophet ﷺ.",
      facts: ["He asked: teach me these words", "Adh-Dhahabi: its chain is sahih"],
      source: siyar(1, 465, "Ibn Mas'ud herded sheep for Uqbah ibn Abi Mu'ayt when the Prophet ﷺ and Abu Bakr passed by. Later he said: teach me. The Prophet ﷺ wiped his head and said: May Allah have mercy on you, you are a little boy who will be taught. Adh-Dhahabi: its chain is sahih."),
      difficulty: 1,
      questions: [
        { q: "What was Ibn Mas'ud's work as a boy?", a: "Herding sheep", wrong: ["Selling cloth", "Making swords", "Fishing"], why: "He herded sheep in Makkah." },
        { q: "What did the Prophet ﷺ say to him?", a: "You are a boy who will be taught", wrong: ["Go home", "You will be rich", "You will be a king"], why: "And he became a great teacher." },
        { q: "Ibn Mas'ud asked the Prophet ﷺ to teach him.", tf: true, why: "He said: teach me these words." }
      ]
    },
    {
      slug: "seventy-surahs",
      title: "Seventy surahs",
      line: "Ibn Mas'ud took seventy surahs from the Prophet ﷺ himself.",
      facts: ["The Sahabah knew he knew the Quran well", "Yet he said: I am not the best of them"],
      source: hadith("bukhari", "5000", "Shaqiq ibn Salamah", "Ibn Mas'ud said: By Allah, I took over seventy surahs from the mouth of the Messenger of Allah ﷺ. The companions know I am of those who know the Book of Allah best, yet I am not the best of them."),
      difficulty: 2,
      questions: [
        { q: "How many surahs did Ibn Mas'ud learn straight from the Prophet ﷺ?", a: "Over seventy", wrong: ["Seven", "Seventeen", "Seven hundred"], why: "From his blessed mouth." },
        { q: "What did Ibn Mas'ud say after this?", a: "I am not the best of them", wrong: ["I am the best of them", "Do not ask others", "I know everything"], why: "Knowledge and humility together." },
        { q: "The Sahabah knew Ibn Mas'ud was among those who knew the Quran best.", tf: true, why: "No one in his gathering disagreed." }
      ]
    },
    {
      slug: "learn-from-four",
      title: "Learn the Quran from four",
      line: "Learn the Quran from four: Ibn Mas'ud was named first.",
      facts: ["With Salim, Ubayy and Mu'adh", "Abdullah ibn Amr narrated it"],
      source: hadith("bukhari", "3758", "Masruq", "Abdullah ibn Amr said: I heard the Messenger of Allah ﷺ say: learn the recitation of the Quran from four: Abdullah ibn Mas'ud, Salim the freed slave of Abu Hudhayfah, Ubayy ibn Ka'b and Mu'adh ibn Jabal."),
      difficulty: 2,
      questions: [
        { q: "Whose name came first among the four Quran teachers?", a: "Abdullah ibn Mas'ud", wrong: ["Mu'adh ibn Jabal", "Ubayy ibn Ka'b", "Salim"], why: "The hadith begins with him." },
        { q: "Which of these was NOT one of the four?", a: "Abu Hurayrah", wrong: ["Ubayy ibn Ka'b", "Mu'adh ibn Jabal", "Salim"], why: "The four were Ibn Mas'ud, Salim, Ubayy and Mu'adh." },
        { q: "The Prophet ﷺ chose Ibn Mas'ud as a teacher of the Quran.", tf: true, why: "Learn it from four." }
      ]
    },
    {
      slug: "recite-to-me",
      title: "Recite to me",
      line: "The Prophet ﷺ asked Ibn Mas'ud to recite, and wept.",
      facts: ["I like to hear it from others", "Surah An-Nisa"],
      source: hadith("bukhari", "4582", "Abdullah ibn Mas'ud", "The Prophet ﷺ said: recite to me. I said: shall I recite to you when it was sent down to you? He said: I like to hear it from others. I recited An-Nisa until 4:41, and his eyes overflowed with tears."),
      difficulty: 3,
      questions: [
        { q: "Which surah did Ibn Mas'ud recite to the Prophet ﷺ?", a: "An-Nisa", wrong: ["Al-Baqarah", "Yasin", "Al-Mulk"], why: "Until ayah 41." },
        { q: "Why did the Prophet ﷺ want to hear it from him?", a: "He liked to hear it from others", wrong: ["He had forgotten it", "To test his Arabic", "To end a dispute"], why: "He said: I like to hear it from others." },
        { q: "The Prophet ﷺ wept when Ibn Mas'ud reached 4:41.", tf: true, why: "The ayah about bringing a witness from every nation." }
      ]
    },
    {
      slug: "every-ayah",
      title: "Every ayah",
      line: "Ibn Mas'ud knew where every surah came down.",
      facts: ["He would travel to anyone who knew more", "Even if only camels could reach him"],
      source: hadith("bukhari", "5002", "Abdullah ibn Mas'ud", "By Allah, there is no surah but I know where it came down, and no ayah but I know about whom it came down. If I knew of anyone who knew the Book of Allah better, and camels could reach him, I would ride to him."),
      difficulty: 4,
      questions: [
        { q: "What did Ibn Mas'ud say he knew about every surah?", a: "Where it came down", wrong: ["How much it weighs", "Which tribe liked it best", "How long it takes to read"], why: "And about whom every ayah came." },
        { q: "What would he do if someone knew the Quran better?", a: "Travel to him to learn", wrong: ["Ignore him", "Argue with him", "Write him a letter"], why: "If camels could reach him, he would go." },
        { q: "Even a great scholar keeps wanting to learn more.", tf: true, why: "That is what Ibn Mas'ud said." }
      ]
    },
    {
      slug: "full-of-knowledge",
      title: "Full of knowledge",
      line: "Umar called short Ibn Mas'ud a vessel full of knowledge.",
      facts: ["Ibn Mas'ud was very short", "Umar smiled as they talked"],
      source: siyar(1, 491, "Ibn Mas'ud came while Umar sat, and was so short the seated men nearly hid him. Umar talked and laughed with him, watched him leave, and said: a small vessel filled with knowledge."),
      difficulty: 4,
      questions: [
        { q: "What did Umar call Ibn Mas'ud?", a: "A small vessel full of knowledge", wrong: ["A tall tree", "A lion of war", "A rich merchant"], why: "He was small in body, great in knowledge." },
        { q: "What does this teach?", a: "Worth is in knowledge and faith, not looks", wrong: ["Tall people are wiser", "Only rich people learn", "Looks matter most"], why: "Umar honoured him for what he carried inside." },
        { q: "Ibn Mas'ud was very tall.", tf: false, why: "The seated men nearly hid him." }
      ]
    },
    {
      slug: "school-of-kufa",
      title: "The school of Kufa",
      line: "In Kufa, Alqamah learned from Ibn Mas'ud and became like him.",
      facts: ["Ibn Mas'ud was like the Prophet ﷺ in his manner", "Alqamah was like Ibn Mas'ud"],
      source: siyar(1, 485, "Alqamah said: Abdullah resembled the Prophet ﷺ in his guidance, manner and bearing; and Alqamah was likened to Abdullah."),
      difficulty: 5,
      questions: [
        { q: "Which student of Ibn Mas'ud grew to be like him?", a: "Alqamah ibn Qays", wrong: ["Abu Jahl", "Abu Lahab", "Musaylimah"], why: "Alqamah was likened to Abdullah." },
        { q: "Who did Ibn Mas'ud resemble in his manner?", a: "The Prophet ﷺ", wrong: ["Abu Bakr", "Umar", "Khalid"], why: "In his guidance, manner and bearing." },
        { q: "Students learn manners from teachers, not only facts.", tf: true, why: "Alqamah took on his teacher's way." }
      ]
    }
  ]
};

// The Tabi'in on the tree: the students of the Sahabah, and their students. Their years are left out where the reports differ.

const ALQAMAH_WAQQAS: DeepUnit = {
  key: "tree-alqamah-waqqas",
  topicId: "scholars",
  branchId: "scholar-alqamah-waqqas",
  name: "Alqamah ibn Waqqas",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "heard-umar",
      title: "He heard Umar on the minbar",
      line: "Alqamah ibn Waqqas heard Umar teach from the minbar.",
      facts: ["Hadith: actions are by intentions", "It is the first hadith in Sahih al-Bukhari"],
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Alqamah ibn Waqqas heard Umar say on the minbar: I heard the Messenger of Allah ﷺ say, actions are only by intentions."),
      difficulty: 1,
      questions: [
        { q: "Who did Alqamah ibn Waqqas hear on the minbar?", a: "Umar ibn al-Khattab", wrong: [...LATER], why: "Umar told the people a hadith from the Prophet ﷺ." },
        { q: "Which hadith did he hear from Umar?", a: "Actions are by intentions", wrong: ["Smiling is charity", "Cleanliness is half of faith", "The strong man controls his anger"], why: "It opens Sahih al-Bukhari." },
        { q: "Alqamah ibn Waqqas was a student of the Sahabah.", tf: true, why: "He was a Tabi'i who heard Umar himself." }
      ]
    },
    {
      slug: "scholar-of-madinah",
      title: "A scholar of Madinah",
      line: "Alqamah ibn Waqqas was one of the scholars of Madinah.",
      facts: ["He learned from Umar, Aishah and Ibn Umar", "He did not narrate many hadith"],
      source: siyar(4, 61, "Alqamah ibn Waqqas al-Laythi, one of the scholars of Madinah. He narrated from Umar, Aishah, Ibn Umar and others, and did not narrate many hadith."),
      difficulty: 2,
      questions: [
        { q: "In which city was Alqamah ibn Waqqas a scholar?", a: "Madinah", wrong: ["Kufa", "Baghdad", "Cairo"], why: "He is counted among the scholars of Madinah." },
        { q: "Which of these did he learn from?", a: "Aishah", wrong: [...LATER], why: "He narrated from Umar, Aishah and Ibn Umar." },
        { q: "Alqamah ibn Waqqas narrated thousands of hadith.", tf: false, why: "Adh-Dhahabi says he did not narrate many." }
      ]
    },
    {
      slug: "trusted",
      title: "Trusted by the experts",
      line: "Hadith experts called Alqamah ibn Waqqas thiqah: trustworthy.",
      facts: ["Ibn Sa'd and an-Nasa'i said it", "His hadith are in all six books"],
      source: siyar(4, 61, "Ibn Sa'd and an-Nasa'i said: thiqah (trustworthy). His hadith are in all six books of hadith."),
      difficulty: 3,
      questions: [
        { q: "What does thiqah mean?", a: "Trustworthy", wrong: ["Weak", "Unknown", "Forgetful"], why: "It is praise for a narrator who is honest and precise." },
        { q: "Where are his hadith found?", a: "In all six books of hadith", wrong: ["In no books", "Only in poems", "Only in history books"], why: "Al-Bukhari, Muslim, Abu Dawud, at-Tirmidhi, an-Nasa'i and Ibn Majah." },
        { q: "A narrator can be trusted even if he narrated only a few hadith.", tf: true, why: "Alqamah narrated few, and was called trustworthy." }
      ]
    },
    {
      slug: "his-students",
      title: "His students",
      line: "Az-Zuhri and Muhammad at-Taymi learned from Alqamah.",
      facts: ["At-Taymi passed on 'actions are by intentions'", "Both are on the tree"],
      source: siyar(4, 61, "Among those who narrated from Alqamah ibn Waqqas: his son Abdullah, Ibn Shihab az-Zuhri and Muhammad ibn Ibrahim at-Taymi."),
      difficulty: 4,
      questions: [
        { q: "Which student passed on Umar's hadith of intentions from him?", a: "Muhammad at-Taymi", wrong: [...LATER], why: "Umar, then Alqamah, then at-Taymi." },
        { q: "Which great scholar of Madinah also learned from him?", a: "Az-Zuhri", wrong: ["Abu Jahl", "Musaylimah", "Abu Lahab"], why: "Az-Zuhri later taught Imam Malik." },
        { q: "Put the chain in order, from the top.", a: "Umar, Alqamah, at-Taymi", wrong: ["At-Taymi, Alqamah, Umar", "Alqamah, Umar, at-Taymi", "Umar, at-Taymi, Alqamah"], why: "A teacher comes before his student." }
      ]
    }
  ]
};

const URWAH: DeepUnit = {
  key: "tree-urwah",
  topicId: "scholars",
  branchId: "scholar-urwah",
  name: "Urwah ibn az-Zubayr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "aishahs-nephew",
      title: "Aishah's nephew",
      line: "Urwah stayed close to his aunt Aishah and learned fiqh from her.",
      facts: ["His mother: Asma, daughter of Abu Bakr", "His father: az-Zubayr ibn al-Awwam"],
      source: siyar(4, 421, "Urwah, son of az-Zubayr and of Asma daughter of Abu Bakr, one of the seven fuqaha of Madinah. He kept close to his aunt Aishah and learned fiqh from her."),
      difficulty: 1,
      questions: [
        { q: "Who was Urwah's aunt and teacher?", a: "Aishah", wrong: ["Khadijah", "Fatimah", "Maryam"], why: "His mother Asma was Aishah's sister." },
        { q: "Who was Urwah's mother?", a: "Asma, daughter of Abu Bakr", wrong: ["Aishah", "Fatimah", "Hafsah"], why: "Asma was Aishah's older sister." },
        { q: "Urwah was one of the seven fuqaha of Madinah.", tf: true, why: "The seven great scholars of fiqh there." }
      ]
    },
    {
      slug: "his-students",
      title: "His students",
      line: "Az-Zuhri and Urwah's son Hisham learned from him.",
      facts: ["Abu az-Zinad too", "Az-Zuhri later taught Imam Malik"],
      source: siyar(4, 422, "Among those who narrated from Urwah: his son Hisham, Ibn Shihab az-Zuhri and Abu az-Zinad."),
      difficulty: 2,
      questions: [
        { q: "Which of these was Urwah's student?", a: "His son Hisham", wrong: ["Aishah", "Asma", "Umar ibn al-Khattab"], why: "The others were older, from the Sahabah." },
        { q: "Which of his students taught Imam Malik?", a: "Az-Zuhri", wrong: [...LATER], why: "Aishah, Urwah, az-Zuhri, Malik: a chain on the tree." },
        { q: "Urwah's own son Hisham learned from him.", tf: true, why: "Hisham ibn Urwah became a scholar too." }
      ]
    },
    {
      slug: "every-hadith",
      title: "Every hadith she had",
      line: "Urwah made sure he had every hadith Aishah narrated.",
      facts: ["He told young people: learn now", "He sat at Sahabah's doors to ask them"],
      source: siyar(4, 424, "Urwah told the young: learn, for you are the young of a people and will be their elders. He said he made sure he had every hadith of Aishah, and would go to a companion's door to ask him."),
      difficulty: 3,
      questions: [
        { q: "What did Urwah tell young people?", a: "Learn now, you will be the elders", wrong: ["Play now, learn later", "Only old people should learn", "Do not ask questions"], why: "Today's young are tomorrow's teachers." },
        { q: "How did Urwah learn from the Sahabah?", a: "He went to their doors to ask them", wrong: ["He waited for letters", "He read it in newspapers", "He never asked anyone"], why: "Students went to the teachers." },
        { q: "Urwah tried to collect every hadith Aishah had.", tf: true, why: "He made sure none of hers was missing." }
      ]
    },
    {
      slug: "a-sea",
      title: "A sea of knowledge",
      line: "Az-Zuhri: Urwah is a sea that buckets cannot make muddy.",
      facts: ["So much knowledge it never ran low", "Umar ibn Abd al-Aziz praised him too"],
      source: siyar(4, 425, "Az-Zuhri said: I found Urwah a sea that the buckets do not make muddy. Umar ibn Abd al-Aziz said none was more knowledgeable than Urwah."),
      difficulty: 4,
      questions: [
        { q: "What did az-Zuhri compare Urwah to?", a: "A sea that buckets cannot muddy", wrong: ["A small well", "A dry river", "A cup of water"], why: "Take as much as you like, and it stays clear and full." },
        { q: "Which ruler, known for justice, praised Urwah?", a: "Umar ibn Abd al-Aziz", wrong: ["Fir'awn", "Abu Jahl", "Namrud"], why: "He said none was more knowledgeable." },
        { q: "Az-Zuhri, who praised him, was his student.", tf: true, why: "Students know their teacher best." }
      ]
    },
    {
      slug: "patience",
      title: "His patience",
      line: "When Urwah lost his leg, he thanked Allah for what remained.",
      facts: ["He said: You took, but You left", "He kept his Quran reading that night"],
      source: siyar(4, 430, "When Urwah's leg was cut off, he said: O Allah, if You took, You have left; and if You tested, You have kept well. He did not leave his part of the Quran that night."),
      difficulty: 5,
      questions: [
        { q: "What did Urwah say when he lost his leg?", a: "You took, but You left me much", wrong: ["Why me?", "I give up", "Nothing is left"], why: "He looked at what Allah had left him." },
        { q: "What does Urwah's story teach?", a: "Patience and thanks in hard times", wrong: ["Complain loudly", "Stop worshipping", "Blame others"], why: "A scholar lives by what he knows." },
        { q: "Urwah's test made him stop his worship.", tf: false, why: "He kept up his Quran and thanked Allah." }
      ]
    }
  ]
};

const NAFI: DeepUnit = {
  key: "tree-nafi",
  topicId: "scholars",
  branchId: "scholar-nafi",
  name: "Nafi",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "ibn-umars-man",
      title: "With Ibn Umar",
      line: "Nafi was freed by Ibn Umar, and learned from him.",
      facts: ["Mawla: a freed man, tied to the family", "Mufti and scholar of Madinah"],
      source: siyar(5, 95, "Nafi, the mawla of Ibn Umar, the mufti and scholar of Madinah. He narrated from Ibn Umar, Aishah, Abu Hurayrah and others."),
      difficulty: 1,
      questions: [
        { q: "Which Sahabi was Nafi's teacher?", a: "Abdullah ibn Umar", wrong: [...LATER], why: "Nafi was his freed man and student." },
        { q: "Nafi became the mufti of which city?", a: "Madinah", wrong: ["Kufa", "Baghdad", "Cairo"], why: "Mufti: a scholar who answers questions on the religion." },
        { q: "A freed man could become a great scholar.", tf: true, why: "Nafi became the mufti of Madinah." }
      ]
    },
    {
      slug: "golden-chain",
      title: "The soundest chain",
      line: "Al-Bukhari: the soundest chain is Malik, Nafi, Ibn Umar.",
      facts: ["Chain: who heard it from whom", "Nafi links Malik to Ibn Umar"],
      source: siyar(5, 97, "Al-Bukhari said: the soundest of chains is Malik, from Nafi, from Ibn Umar."),
      difficulty: 2,
      questions: [
        { q: "Al-Bukhari called which chain the soundest?", a: "Malik, from Nafi, from Ibn Umar", wrong: ["Ibn Baz, from Ibn Taymiyyah", "Abu Jahl, from Abu Lahab", "Nafi, from Imam al-Bukhari"], why: "Each one in it was very precise." },
        { q: "Who is in the middle of this chain?", a: "Nafi", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "Malik heard from Nafi, and Nafi from Ibn Umar." },
        { q: "Imam Malik learned from Nafi.", tf: true, why: "Malik came to him as a youth." }
      ]
    },
    {
      slug: "twenty-seven",
      title: "A hadith through Nafi",
      line: "Prayer in congregation is 27 times better than praying alone.",
      facts: ["Ibn Umar heard it from the Prophet ﷺ", "Then Nafi, then Malik"],
      source: hadith("muslim", "650a", "Malik, from Nafi, from Ibn Umar", "The Messenger of Allah ﷺ said: prayer in congregation is twenty-seven degrees better than prayer alone."),
      difficulty: 3,
      questions: [
        { q: "How much better is prayer in congregation?", a: "27 degrees", wrong: ["2 degrees", "7 degrees", "100 degrees"], why: "The Prophet ﷺ said so, and Nafi passed it on." },
        { q: "Who passed this hadith from Ibn Umar to Malik?", a: "Nafi", wrong: [...LATER], why: "Ibn Umar, then Nafi, then Malik." },
        { q: "Praying together has more reward than praying alone.", tf: true, why: "Twenty-seven degrees more." }
      ]
    },
    {
      slug: "sent-to-egypt",
      title: "Sent to teach",
      line: "Umar ibn Abd al-Aziz sent Nafi to Egypt to teach the sunnah.",
      facts: ["He made Hajj and Umrah with Ibn Umar 30-some times", "Malik came to learn from him as a youth"],
      source: siyar(5, 97, "Nafi went on Hajj and Umrah with Ibn Umar thirty-some times. Umar ibn Abd al-Aziz sent him to Egypt to teach the people the sunnah."),
      difficulty: 4,
      questions: [
        { q: "Where was Nafi sent to teach the sunnah?", a: "Egypt", wrong: ["India", "China", "Spain"], why: "Umar ibn Abd al-Aziz sent him." },
        { q: "About how many times did Nafi do Hajj and Umrah with Ibn Umar?", a: "Thirty-some", wrong: ["Once", "Three", "Three hundred"], why: "He was always beside his teacher." },
        { q: "Nafi learned by travelling with his teacher.", tf: true, why: "Years beside Ibn Umar, on Hajj and Umrah." }
      ]
    },
    {
      slug: "seal-it",
      title: "Seal it",
      line: "Malik: when Nafi says something, seal it.",
      facts: ["Seal it: it is certain, no need to check", "Ibn Khirash: trustworthy, noble"],
      source: siyar(5, 98, "Malik said: when Nafi says something, put a seal on it. Abd ar-Rahman ibn Khirash said: Nafi is trustworthy and noble."),
      difficulty: 5,
      questions: [
        { q: "What did Malik say about Nafi's words?", a: "Seal it", wrong: ["Check it ten times", "Throw it away", "Ask someone else"], why: "He trusted Nafi completely." },
        { q: "What makes a narrator trusted?", a: "Honesty and precision", wrong: ["Wealth", "Height", "A loud voice"], why: "Nafi had both." },
        { q: "Malik thought Nafi's words needed checking with others.", tf: false, why: "He said: seal it." }
      ]
    }
  ]
};

const ATA: DeepUnit = {
  key: "tree-ata",
  topicId: "scholars",
  branchId: "scholar-ata",
  name: "Ata ibn Abi Rabah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "mufti-of-makkah",
      title: "The mufti of Makkah",
      line: "Ata ibn Abi Rabah was the mufti of the Haram in Makkah.",
      facts: ["He learned from Aishah, Ibn Abbas and Abu Hurayrah", "Abu Hanifah learned from him"],
      source: siyar(5, 79, "Ata was born in the caliphate of Uthman. He narrated from Aishah, Ibn Abbas, Abu Hurayrah and others, and Abu Hanifah was among those who learned from him."),
      difficulty: 1,
      questions: [
        { q: "Where did Ata give fatwa?", a: "At the Haram in Makkah", wrong: ["In Baghdad", "In Cairo", "In Damascus"], why: "He was the mufti of the Haram." },
        { q: "Which of the four imams learned from Ata?", a: "Abu Hanifah", wrong: ["Imam Ahmad", "Ash-Shafi'i", "None of them"], why: "Ata was his greatest teacher." },
        { q: "Ata learned from Sahabah like Ibn Abbas and Aishah.", tf: true, why: "He was a Tabi'i." }
      ]
    },
    {
      slug: "looks-dont-matter",
      title: "Knowledge, not looks",
      line: "Ata was dark, lame and later blind, yet led Makkah in knowledge.",
      facts: ["Later he lost his sight", "Trustworthy, with much hadith"],
      source: siyar(5, 80, "The fatwa of Makkah came to rest with Ata. He was black, lame and weak in one hand, and later went blind, yet he led the people of Makkah in knowledge."),
      difficulty: 2,
      questions: [
        { q: "What made Ata great?", a: "His knowledge and taqwa", wrong: ["His looks", "His money", "His tribe"], why: "Allah raises people by knowledge and faith." },
        { q: "What happened to Ata's sight later?", a: "He went blind", wrong: ["It got better", "Nothing", "He wore glasses"], why: "And he kept teaching." },
        { q: "Ata's looks kept him from leading in knowledge.", tf: false, why: "He became the mufti of Makkah." }
      ]
    },
    {
      slug: "two-hundred",
      title: "Two hundred Sahabah",
      line: "Ata met about two hundred of the Sahabah.",
      facts: ["None knew the Hajj rites better", "Abu Ja'far al-Baqir said so"],
      source: siyar(5, 81, "Ata said: I met two hundred of the companions of the Messenger of Allah ﷺ. Abu Ja'far said: none was left on earth who knew the rites of Hajj better than Ata."),
      difficulty: 3,
      questions: [
        { q: "About how many Sahabah did Ata meet?", a: "200", wrong: ["2", "20", "2,000"], why: "He said he met two hundred." },
        { q: "What did Ata know better than anyone of his time?", a: "The rites of Hajj", wrong: ["Sailing ships", "Building forts", "Trading horses"], why: "He was the mufti of the Haram." },
        { q: "Ata learned from many of the Sahabah.", tf: true, why: "He met about two hundred of them." }
      ]
    },
    {
      slug: "no-fatwa-but-ata",
      title: "Only Ata gives fatwa",
      line: "At Hajj it was called out: no one gives fatwa but Ata.",
      facts: ["He made Hajj more than 70 times", "Called out by the rulers of the time"],
      source: siyar(5, 82, "In the days of Hajj a caller would announce: no one gives fatwa to the people but Ata. He made Hajj more than seventy times."),
      difficulty: 4,
      questions: [
        { q: "What was called out at Hajj?", a: "No one gives fatwa but Ata", wrong: ["No one may pray", "Leave Makkah now", "Only buy from Ata"], why: "So pilgrims got answers from the best scholar." },
        { q: "About how many times did Ata make Hajj?", a: "More than 70", wrong: ["Once", "Seven", "More than 700"], why: "He lived in Makkah." },
        { q: "Pilgrims were told to take fatwa from Ata.", tf: true, why: "He knew the Hajj best." }
      ]
    },
    {
      slug: "abu-hanifahs-praise",
      title: "Abu Hanifah's teacher",
      line: "Abu Hanifah: I never saw anyone better than Ata.",
      facts: ["Abu Hanifah met many scholars", "Ata stood above them all for him"],
      source: siyar(5, 83, "Abu Hanifah said: of all I met, I never saw anyone better than Ata ibn Abi Rabah."),
      difficulty: 5,
      questions: [
        { q: "What did Abu Hanifah say about Ata?", a: "I never saw anyone better", wrong: ["He was too strict", "He knew nothing", "I never met him"], why: "Ata was his greatest teacher." },
        { q: "Put the chain in order, from the top.", a: "Ibn Abbas, Ata, Abu Hanifah", wrong: ["Abu Hanifah, Ata, Ibn Abbas", "Ata, Ibn Abbas, Abu Hanifah", "Ibn Abbas, Abu Hanifah, Ata"], why: "A teacher comes before his student." },
        { q: "Abu Hanifah is linked to Ibn Abbas through Ata.", tf: true, why: "Ibn Abbas taught Ata, and Ata taught Abu Hanifah." }
      ]
    }
  ]
};

const ALQAMAH_QAYS: DeepUnit = {
  key: "tree-alqamah-qays",
  topicId: "scholars",
  branchId: "scholar-alqamah-qays",
  name: "Alqamah ibn Qays",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "faqih-of-kufa",
      title: "The faqih of Kufa",
      line: "Alqamah ibn Qays was the faqih and Quran reciter of Kufa.",
      facts: ["Born in the Prophet's ﷺ lifetime", "Uncle of Ibrahim an-Nakha'i"],
      source: siyar(4, 53, "Alqamah ibn Qays, the faqih of Kufa, its scholar and its reciter. He was born in the lifetime of the Prophet ﷺ, and was the maternal uncle of Ibrahim an-Nakha'i."),
      difficulty: 1,
      questions: [
        { q: "In which city was Alqamah ibn Qays the faqih?", a: "Kufa", wrong: ["Madinah", "Makkah", "Cairo"], why: "He was its scholar and reciter." },
        { q: "Which scholar was his nephew?", a: "Ibrahim an-Nakha'i", wrong: [...LATER], why: "Adh-Dhahabi calls Alqamah his uncle." },
        { q: "Alqamah was born in the lifetime of the Prophet ﷺ.", tf: true, why: "But he did not meet him, so he is a Tabi'i." }
      ]
    },
    {
      slug: "with-ibn-masud",
      title: "Ibn Mas'ud's student",
      line: "Alqamah stayed with Ibn Mas'ud and perfected the Quran with him.",
      facts: ["He also learned from Umar, Uthman, Ali and Aishah", "He became like his teacher"],
      source: siyar(4, 54, "Alqamah kept close to Ibn Mas'ud until he led in knowledge, and perfected the Quran with him. He narrated from Umar, Uthman, Ali, Aishah and others."),
      difficulty: 2,
      questions: [
        { q: "Who was Alqamah's main teacher?", a: "Abdullah ibn Mas'ud", wrong: [...LATER], why: "He stayed with him until he led in knowledge." },
        { q: "What did he perfect with Ibn Mas'ud?", a: "The Quran", wrong: ["Poetry", "Trade", "Archery"], why: "Ibn Mas'ud was a master of the Quran." },
        { q: "Alqamah learned from only one Sahabi.", tf: false, why: "Also Umar, Uthman, Ali, Aishah and more." }
      ]
    },
    {
      slug: "like-paper",
      title: "Like reading from paper",
      line: "Alqamah: what I learned young, I still see as if on paper.",
      facts: ["Learn while young", "Imam Ahmad: trustworthy, of the good people"],
      source: siyar(4, 55, "Alqamah said: what I memorized when young, it is as if I look at it on a sheet of paper. Ahmad ibn Hanbal said: Alqamah is trustworthy, one of the people of good."),
      difficulty: 3,
      questions: [
        { q: "What did Alqamah say about what he learned young?", a: "It stayed like writing on paper", wrong: ["He forgot it all", "It was useless", "He never learned young"], why: "Learning young stays with you." },
        { q: "What did Imam Ahmad call Alqamah?", a: "Trustworthy, one of the good", wrong: ["Weak", "Unknown", "Forgetful"], why: "High praise from a great imam." },
        { q: "What you learn young can stay with you for life.", tf: true, why: "Alqamah saw it in himself." }
      ]
    },
    {
      slug: "if-you-see-alqamah",
      title: "Like seeing Abdullah",
      line: "Seeing Alqamah was nearly like seeing Ibn Mas'ud.",
      facts: ["Abdullah: Ibn Mas'ud", "And Ibrahim was most like Alqamah"],
      source: siyar(4, 55, "If you see Alqamah, it does not harm you not to see Abdullah: he is the most like him in manner and guidance. And if you see Ibrahim an-Nakha'i, it does not harm you not to see Alqamah."),
      difficulty: 4,
      questions: [
        { q: "Why was seeing Alqamah like seeing Ibn Mas'ud?", a: "He was most like him in manner", wrong: ["They were twins", "He wore his clothes", "He lived in his house"], why: "He took his teacher's way." },
        { q: "And who was most like Alqamah?", a: "Ibrahim an-Nakha'i", wrong: [...LATER], why: "Ibn Mas'ud, Alqamah, Ibrahim: each like his teacher." },
        { q: "A student can carry on his teacher's way.", tf: true, why: "Alqamah carried Ibn Mas'ud's." }
      ]
    },
    {
      slug: "humble",
      title: "He disliked fame",
      line: "Alqamah disliked crowds following him for fame.",
      facts: ["He wanted no fame", "He read the whole Quran in five days"],
      source: siyar(4, 59, "Alqamah disliked that people walk behind him and say: this is Alqamah."),
      difficulty: 5,
      questions: [
        { q: "What did Alqamah dislike?", a: "People following him for fame", wrong: ["Teaching", "Reading Quran", "Giving charity"], why: "He wanted his deeds for Allah alone." },
        { q: "What does this teach a student?", a: "Humility, not showing off", wrong: ["Seek fame", "Boast of knowledge", "Look down on others"], why: "Knowledge should make you humble." },
        { q: "Alqamah enjoyed being famous.", tf: false, why: "He disliked it." }
      ]
    }
  ]
};

const TAYMI: DeepUnit = {
  key: "tree-taymi",
  topicId: "scholars",
  branchId: "scholar-taymi",
  name: "Muhammad at-Taymi",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "scholar-of-madinah",
      title: "A scholar of Madinah",
      line: "Muhammad at-Taymi was a scholar of Madinah, with Salim and Nafi.",
      facts: ["His grandfather was a Muhajir", "He saw Sa'd ibn Abi Waqqas"],
      source: siyar(5, 294, "Muhammad ibn Ibrahim at-Taymi, the hafiz, one of the scholars of Madinah along with Salim and Nafi. His grandfather al-Harith was a Muhajir, a cousin of Abu Bakr. He saw Sa'd ibn Abi Waqqas."),
      difficulty: 1,
      questions: [
        { q: "In which city was at-Taymi a scholar?", a: "Madinah", wrong: ["Kufa", "Basra", "Makkah"], why: "Alongside Salim and Nafi." },
        { q: "Which Sahabi did he see?", a: "Sa'd ibn Abi Waqqas", wrong: [...LATER], why: "He was a Tabi'i." },
        { q: "His grandfather made the Hijrah.", tf: true, why: "Al-Harith was one of the Muhajirun." }
      ]
    },
    {
      slug: "his-teachers",
      title: "His teachers",
      line: "At-Taymi learned from Ibn Umar, Jabir, Anas and Alqamah.",
      facts: ["Also from Abu Sa'id al-Khudri", "Yahya al-Ansari learned from him"],
      source: siyar(5, 294, "He narrated from Ibn Umar, Abu Sa'id, Jabir, Anas and Alqamah ibn Waqqas. Yahya ibn Sa'id al-Ansari, Hisham ibn Urwah, az-Zuhri and al-Awza'i narrated from him."),
      difficulty: 2,
      questions: [
        { q: "Which Tabi'i on the tree taught at-Taymi?", a: "Alqamah ibn Waqqas", wrong: [...LATER], why: "Alqamah had heard Umar." },
        { q: "Which of his students is on the tree?", a: "Yahya ibn Sa'id al-Ansari", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "Yahya then taught Sufyan." },
        { q: "At-Taymi learned from Sahabah and from Tabi'in.", tf: true, why: "Ibn Umar and Anas, and also Alqamah." }
      ]
    },
    {
      slug: "intentions",
      title: "The hadith of intentions",
      line: "At-Taymi alone passed on the intentions hadith from Alqamah.",
      facts: ["Umar, then Alqamah, then at-Taymi", "The Sahih books accepted it"],
      source: siyar(5, 295, "The hadith 'actions are by intentions' is his alone: he narrated it from Alqamah, from Umar, and the authors of the Sahih collections accepted it."),
      difficulty: 3,
      questions: [
        { q: "Which famous hadith came through at-Taymi?", a: "Actions are by intentions", wrong: ["Smiling is charity", "Cleanliness is half of faith", "The strong man controls his anger"], why: "Umar, Alqamah, at-Taymi, then Yahya." },
        { q: "Who did at-Taymi hear it from?", a: "Alqamah ibn Waqqas", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "And Alqamah heard Umar." },
        { q: "The authors of the Sahih books accepted this hadith.", tf: true, why: "Al-Bukhari put it first in his Sahih." }
      ]
    },
    {
      slug: "one-chain",
      title: "One link at a time",
      line: "One trusted link at a time, the hadith reached al-Bukhari.",
      facts: ["Yahya, Sufyan and al-Humaydi came after", "Each heard it from the one before"],
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Al-Bukhari's first hadith comes through al-Humaydi, Sufyan, Yahya ibn Sa'id, Muhammad ibn Ibrahim at-Taymi, Alqamah ibn Waqqas, and Umar, from the Prophet ﷺ."),
      difficulty: 4,
      questions: [
        { q: "Who heard the hadith of intentions from at-Taymi?", a: "Yahya ibn Sa'id al-Ansari", wrong: ["Umar", "Alqamah ibn Waqqas", "Imam al-Bukhari"], why: "Umar and Alqamah came before him; al-Bukhari much later." },
        { q: "Put the chain in order, from the top.", a: "Alqamah, at-Taymi, Yahya", wrong: ["Yahya, at-Taymi, Alqamah", "At-Taymi, Alqamah, Yahya", "Alqamah, Yahya, at-Taymi"], why: "A teacher comes before his student." },
        { q: "If one link in a chain is weak, the whole chain is weakened.", tf: true, why: "That is why every link was checked." }
      ]
    }
  ]
};

const ZUHRI: DeepUnit = {
  key: "tree-zuhri",
  topicId: "scholars",
  branchId: "scholar-zuhri",
  name: "Az-Zuhri",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "imam-of-his-time",
      title: "Imam of his time",
      line: "Ibn Shihab az-Zuhri was the great hadith master of his time.",
      facts: ["Hafiz: one who memorizes a great deal of hadith", "From Madinah"],
      source: siyar(5, 326, "Muhammad ibn Muslim ibn Shihab az-Zuhri, the imam, the scholar, the hafiz of his time."),
      difficulty: 1,
      questions: [
        { q: "What is a hafiz of hadith?", a: "One who memorizes much hadith", wrong: ["A guard at a gate", "A fast runner", "A ship captain"], why: "Az-Zuhri was the hafiz of his time." },
        { q: "Az-Zuhri is also called...", a: "Ibn Shihab", wrong: ["Ibn Baz", "Ibn Taymiyyah", "Ibn Kathir"], why: "After his ancestor Shihab." },
        { q: "Az-Zuhri was a Tabi'i.", tf: true, why: "He learned from the Sahabah and their students." }
      ]
    },
    {
      slug: "his-teachers",
      title: "Eight years with Sa'id",
      line: "Az-Zuhri sat with Sa'id ibn al-Musayyab for eight years.",
      facts: ["He also learned from Urwah", "And from Alqamah ibn Waqqas"],
      source: siyar(5, 327, "Az-Zuhri sat with Sa'id ibn al-Musayyab for eight years and learned fiqh from him. He also learned from Alqamah ibn Waqqas and Urwah ibn az-Zubayr."),
      difficulty: 2,
      questions: [
        { q: "How long did az-Zuhri sit with Sa'id ibn al-Musayyab?", a: "Eight years", wrong: ["Eight days", "Eight weeks", "Eight minutes"], why: "He learned fiqh from him." },
        { q: "Which Tabi'i on the tree taught him Aishah's hadith?", a: "Urwah ibn az-Zubayr", wrong: [...LATER], why: "Aishah, Urwah, az-Zuhri." },
        { q: "Az-Zuhri learned from just one teacher.", tf: false, why: "Sa'id, Urwah, Alqamah and many more." }
      ]
    },
    {
      slug: "never-forgot",
      title: "He never forgot",
      line: "Az-Zuhri: I never trusted my heart with knowledge and it forgot.",
      facts: ["He memorized the Quran in 80 nights", "He wrote everything on tablets too"],
      source: siyar(5, 332, "Az-Zuhri said: I never entrusted my heart with knowledge and then forgot it. He memorized the Quran in eighty nights."),
      difficulty: 3,
      questions: [
        { q: "In how many nights did az-Zuhri memorize the Quran?", a: "80", wrong: ["8", "800", "8,000"], why: "About two and a half months." },
        { q: "What did he say about his memory?", a: "He never forgot what he learned", wrong: ["He forgot everything", "He could not memorize", "He only remembered poems"], why: "Allah gave him a strong memory." },
        { q: "Az-Zuhri memorized the Quran.", tf: true, why: "In eighty nights." }
      ]
    },
    {
      slug: "his-students",
      title: "His students",
      line: "Malik, al-Layth and Sufyan learned from az-Zuhri.",
      facts: ["About 2,000 hadith, said Ibn al-Madini", "Abu Dawud: about 2,200"],
      source: siyar(5, 328, "Among those who narrated from him: Malik, al-Layth and Sufyan ibn Uyaynah. Ali ibn al-Madini said he had about two thousand hadith; Abu Dawud said two thousand two hundred."),
      difficulty: 4,
      questions: [
        { q: "Which of the four imams learned from az-Zuhri?", a: "Imam Malik", wrong: ["Imam Ahmad", "Ash-Shafi'i", "None of them"], why: "Aishah, Urwah, az-Zuhri, Malik." },
        { q: "About how many hadith did az-Zuhri have, said Ibn al-Madini?", a: "2,000", wrong: ["20", "200", "200,000"], why: "A great store of hadith." },
        { q: "Sufyan ibn Uyaynah, on the tree, learned from az-Zuhri.", tf: true, why: "Sufyan later taught al-Humaydi." }
      ]
    },
    {
      slug: "who-you-take-from",
      title: "Whom you learn from",
      line: "Malik: this knowledge is religion, so choose your teachers.",
      facts: ["Malik left 70 who were honest but not experts", "Students crowded at az-Zuhri's door"],
      source: siyar(5, 343, "Malik said: this knowledge is religion, so look at whom you take it from. I met seventy in the masjid who narrated, honest enough to guard a treasury, yet took nothing from them, as they were not experts in it; and when az-Zuhri came, we crowded at his door."),
      difficulty: 5,
      questions: [
        { q: "Malik said: this knowledge is religion, so...", a: "look whom you take it from", wrong: ["take it from anyone", "do not learn it", "only read it alone"], why: "Learn from trusted, upright scholars." },
        { q: "Why did Malik not take from seventy honest men?", a: "They were not experts in hadith", wrong: ["They were liars", "They lived far away", "They were too young"], why: "Honesty alone is not enough; precision is needed too." },
        { q: "Whom you learn the religion from does not matter.", tf: false, why: "Malik said to look carefully." }
      ]
    }
  ]
};

const NAKHAI: DeepUnit = {
  key: "tree-nakhai",
  topicId: "scholars",
  branchId: "scholar-nakhai",
  name: "Ibrahim an-Nakha'i",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "faqih-of-iraq",
      title: "The faqih of Iraq",
      line: "Ibrahim an-Nakha'i was the faqih of Iraq, in Kufa.",
      facts: ["He learned from Alqamah and Masruq", "And from his uncle al-Aswad"],
      source: siyar(4, 520, "Ibrahim an-Nakha'i, the imam, the hafiz, the faqih of Iraq. He narrated from his uncle al-Aswad, Masruq, Alqamah ibn Qays and many senior Tabi'in."),
      difficulty: 1,
      questions: [
        { q: "Ibrahim an-Nakha'i was the faqih of which land?", a: "Iraq", wrong: ["Egypt", "Yemen", "Sham"], why: "He lived in Kufa." },
        { q: "Which student of Ibn Mas'ud taught him?", a: "Alqamah ibn Qays", wrong: [...LATER], why: "Ibn Mas'ud, Alqamah, Ibrahim." },
        { q: "Ibrahim learned from senior Tabi'in.", tf: true, why: "Alqamah, Masruq, al-Aswad and many more." }
      ]
    },
    {
      slug: "ibn-masuds-knowledge",
      title: "Ibn Mas'ud's knowledge",
      line: "Through Alqamah, Ibrahim held the knowledge of Ibn Mas'ud.",
      facts: ["Mufti of Kufa, with ash-Sha'bi", "As a boy he went in to see Aishah"],
      source: siyar(4, 521, "Ibrahim knew the knowledge of Ibn Mas'ud well. As a boy he entered upon Aishah. He was the mufti of Kufa along with ash-Sha'bi, and al-A'mash said he was the money-changer of hadith."),
      difficulty: 2,
      questions: [
        { q: "Whose knowledge reached Ibrahim through Alqamah?", a: "Ibn Mas'ud's", wrong: ["Imam al-Bukhari's", "Ibn Taymiyyah's", "Ibn Baz's"], why: "Ibn Mas'ud, Alqamah, Ibrahim." },
        { q: "Why was he called the money-changer of hadith?", a: "He could tell sound from weak", wrong: ["He sold coins", "He was a banker", "He loved money"], why: "As a money-changer spots fake coins." },
        { q: "As a boy, Ibrahim saw Aishah.", tf: true, why: "He went in to see her as a child." }
      ]
    },
    {
      slug: "more-than-one",
      title: "Heard from many",
      line: "Ibrahim: 'Abdullah said' means I heard it from many.",
      facts: ["Abdullah: Ibn Mas'ud", "Many sources make a report stronger"],
      source: siyar(4, 522, "Al-A'mash asked Ibrahim to give his chain for what he told from Abdullah. Ibrahim said: when I say 'Abdullah said', I have heard it from more than one; when I say 'so-and-so told me', that one told me."),
      difficulty: 3,
      questions: [
        { q: "When Ibrahim said 'Abdullah said', what did it mean?", a: "He heard it from more than one", wrong: ["He made it up", "He heard it once", "He read it in a dream"], why: "More than one person had told him." },
        { q: "Who is 'Abdullah' here?", a: "Ibn Mas'ud", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "The teacher of Kufa." },
        { q: "Hearing a report from many people makes it stronger.", tf: true, why: "That is why he said it." }
      ]
    },
    {
      slug: "you-ask-me",
      title: "You ask me?",
      line: "Sa'id ibn Jubayr: why ask me, while Ibrahim is among you?",
      facts: ["Scholars praised one another", "Sa'id was a great Tabi'i himself"],
      source: siyar(4, 523, "Sa'id ibn Jubayr said to the people of Kufa: you ask me for fatwa, while Ibrahim an-Nakha'i is among you?"),
      difficulty: 4,
      questions: [
        { q: "What did Sa'id ibn Jubayr tell the people of Kufa?", a: "Ask Ibrahim, he is among you", wrong: ["Never ask anyone", "Go to Egypt", "Ask the rulers"], why: "He honoured Ibrahim's knowledge." },
        { q: "What does this show about the scholars?", a: "They honoured each other", wrong: ["They were jealous", "They never met", "They hid knowledge"], why: "They pointed people to each other." },
        { q: "Great scholars sent people to other scholars.", tf: true, why: "Sa'id sent them to Ibrahim." }
      ]
    },
    {
      slug: "toward-abu-hanifah",
      title: "On to Abu Hanifah",
      line: "Ibrahim taught Hammad, and Hammad taught Abu Hanifah.",
      facts: ["Ibn Mas'ud, Alqamah, Ibrahim, Hammad, Abu Hanifah", "The school of Kufa"],
      source: siyar(5, 231, "Hammad learned fiqh from Ibrahim an-Nakha'i and was the most learned of his students; Abu Hanifah learned from Hammad."),
      difficulty: 5,
      questions: [
        { q: "Who was Ibrahim's top student in fiqh?", a: "Hammad ibn Abi Sulayman", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "Hammad then taught Abu Hanifah." },
        { q: "Put the Kufa chain in order, from the top.", a: "Alqamah, Ibrahim, Hammad", wrong: ["Hammad, Ibrahim, Alqamah", "Ibrahim, Alqamah, Hammad", "Alqamah, Hammad, Ibrahim"], why: "A teacher comes before his student." },
        { q: "Abu Hanifah's fiqh goes back to Ibn Mas'ud through Kufa.", tf: true, why: "Ibn Mas'ud, Alqamah, Ibrahim, Hammad, Abu Hanifah." }
      ]
    }
  ]
};

const YAHYA_ANSARI: DeepUnit = {
  key: "tree-yahya-ansari",
  topicId: "scholars",
  branchId: "scholar-yahya-ansari",
  name: "Yahya al-Ansari",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "scholar-of-madinah",
      title: "Student of the seven",
      line: "Yahya al-Ansari learned from the seven fuqaha of Madinah.",
      facts: ["He heard Anas ibn Malik", "He was an Ansari, of Banu an-Najjar"],
      source: siyar(5, 468, "Yahya ibn Sa'id al-Ansari, the scholar of Madinah in his time, the student of the seven fuqaha. He heard Anas ibn Malik, Sa'id ibn al-Musayyab, Nafi, az-Zuhri and many others."),
      difficulty: 1,
      questions: [
        { q: "Whose student was Yahya al-Ansari?", a: "The seven fuqaha of Madinah", wrong: ["The scholars of China", "Later scholars", "No one"], why: "He learned from them in Madinah." },
        { q: "Which Sahabi did he hear?", a: "Anas ibn Malik", wrong: [...LATER], why: "So he is a Tabi'i." },
        { q: "Yahya al-Ansari came from the Ansar.", tf: true, why: "From Banu an-Najjar of Madinah." }
      ]
    },
    {
      slug: "his-students",
      title: "Great students",
      line: "Malik, Sufyan ath-Thawri and Shu'bah learned from Yahya.",
      facts: ["Older az-Zuhri narrated from him too", "Also Abu Yusuf and Ibn al-Mubarak"],
      source: siyar(5, 468, "Az-Zuhri narrated from him though he was older; and Ibn Abi Dhi'b, Shu'bah, Malik, Sufyan ath-Thawri, al-Awza'i, al-Layth and many more."),
      difficulty: 2,
      questions: [
        { q: "Which of the four imams learned from Yahya?", a: "Imam Malik", wrong: ["Imam Ahmad", "Ash-Shafi'i", "None of them"], why: "Malik was from Madinah too." },
        { q: "Which older scholar still narrated from Yahya?", a: "Az-Zuhri", wrong: [...LATER], why: "Good scholars learn even from younger ones." },
        { q: "An older scholar can learn from a younger one.", tf: true, why: "Az-Zuhri did." }
      ]
    },
    {
      slug: "intentions",
      title: "The hadith of intentions",
      line: "Through Yahya, 'actions are by intentions' spread far and wide.",
      facts: ["About 200 people narrated it from him", "He heard it from at-Taymi"],
      source: siyar(5, 469, "He is the narrator of the hadith 'actions are by intentions', and it became famous through him: it is said about two hundred narrated it from him."),
      difficulty: 3,
      questions: [
        { q: "About how many people narrated the hadith of intentions from Yahya?", a: "About 200", wrong: ["2", "20", "20,000"], why: "From one chain to two hundred students." },
        { q: "Who did Yahya hear it from?", a: "Muhammad at-Taymi", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "Umar, Alqamah, at-Taymi, Yahya." },
        { q: "The hadith of intentions became famous through Yahya.", tf: true, why: "So many learned it from him." }
      ]
    },
    {
      slug: "judge",
      title: "Judge of Madinah",
      line: "Yahya was the judge and mufti of the Prophet's ﷺ city.",
      facts: ["He saw Ibn Umar", "A judge settles people's disputes"],
      source: siyar(5, 470, "Al-Hakim said: he was the judge of the city of the Messenger of Allah ﷺ and its mufti in his time. He saw Abdullah ibn Umar."),
      difficulty: 4,
      questions: [
        { q: "What work did Yahya do in Madinah?", a: "Judge and mufti", wrong: ["Soldier", "Merchant", "Poet"], why: "He judged and answered questions." },
        { q: "Which Sahabi did Yahya see?", a: "Abdullah ibn Umar", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "As well as hearing Anas." },
        { q: "Yahya judged people in Madinah.", tf: true, why: "He was its judge." }
      ]
    },
    {
      slug: "most-precise",
      title: "Most precise",
      line: "Imam Ahmad: Yahya al-Ansari was the most precise of people.",
      facts: ["Hisham ibn Urwah: just, pleasing, trustworthy", "Precise: careful with every word"],
      source: siyar(5, 471, "Ahmad ibn Hanbal said: Yahya ibn Sa'id al-Ansari was the most precise of people. Hisham ibn Urwah called him the just, the pleasing, the trustworthy."),
      difficulty: 5,
      questions: [
        { q: "What did Imam Ahmad say about Yahya?", a: "The most precise of people", wrong: ["Too slow", "Often wrong", "Unknown"], why: "High praise from a great imam." },
        { q: "How did Hisham ibn Urwah describe him?", a: "Just, pleasing, trustworthy", wrong: ["Rich and famous", "Strong and tall", "Fast and loud"], why: "Hisham was Urwah's son." },
        { q: "Precision matters when passing on hadith.", tf: true, why: "Each word of the Prophet ﷺ must be kept." }
      ]
    }
  ]
};

const HAMMAD: DeepUnit = {
  key: "tree-hammad",
  topicId: "scholars",
  branchId: "scholar-hammad",
  name: "Hammad ibn Abi Sulayman",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "faqih-of-iraq",
      title: "The faqih of Iraq",
      line: "Hammad ibn Abi Sulayman was a faqih of Iraq, in Kufa.",
      facts: ["He heard Anas ibn Malik", "Ibrahim an-Nakha'i taught him fiqh"],
      source: siyar(5, 231, "Hammad ibn Abi Sulayman, the faqih of Iraq. He narrated from Anas ibn Malik, and learned fiqh from Ibrahim an-Nakha'i, the noblest and most learned of his students."),
      difficulty: 1,
      questions: [
        { q: "Who taught Hammad fiqh?", a: "Ibrahim an-Nakha'i", wrong: [...LATER], why: "Hammad was his top student." },
        { q: "Which Sahabi did Hammad hear?", a: "Anas ibn Malik", wrong: ["Imam al-Bukhari", "Ibn Taymiyyah", "Ibn Baz"], why: "So he is one of the younger Tabi'in." },
        { q: "Hammad lived in Kufa.", tf: true, why: "He was a faqih of Iraq." }
      ]
    },
    {
      slug: "ask-hammad",
      title: "Ask Hammad",
      line: "Ibrahim was asked who to ask after him. He said: Hammad.",
      facts: ["Hammad had asked him about everything", "A teacher choosing his heir"],
      source: siyar(5, 232, "Ibrahim an-Nakha'i was asked: whom shall we ask after you? He said: Hammad. He also said: go to Hammad, for he asked me about all that people asked me."),
      difficulty: 2,
      questions: [
        { q: "Who did Ibrahim say to ask after him?", a: "Hammad", wrong: [...LATER], why: "His best student." },
        { q: "Why was Hammad ready?", a: "He had asked about everything", wrong: ["He was rich", "He was old", "He was tall"], why: "A good student asks many questions." },
        { q: "Asking many questions helped Hammad learn.", tf: true, why: "Ibrahim said so himself." }
      ]
    },
    {
      slug: "generous",
      title: "Iftar for 500",
      line: "In Ramadan, Hammad gave iftar to 500 people every day.",
      facts: ["After Eid he gave each 100 dirhams", "Allah gave him wealth, and he shared it"],
      source: siyar(5, 234, "It reached us that Hammad was wealthy, and gave iftar to five hundred people in Ramadan, and after Eid gave each of them a hundred dirhams."),
      difficulty: 3,
      questions: [
        { q: "How many people did Hammad feed for iftar in Ramadan?", a: "500", wrong: ["5", "50", "5,000"], why: "He was generous with his wealth." },
        { q: "What did he give them after Eid?", a: "100 dirhams each", wrong: ["Nothing", "A camel each", "A house each"], why: "A gift on top of the meals." },
        { q: "A scholar can also be wealthy and generous.", tf: true, why: "Hammad was both." }
      ]
    },
    {
      slug: "teacher-of-abu-hanifah",
      title: "Teacher of Abu Hanifah",
      line: "Hammad taught fiqh to Abu Hanifah, the first of the four imams.",
      facts: ["Abu Hanifah's greatest shaykh was Ata", "Hammad taught him fiqh in Kufa"],
      source: siyar(6, 391, "Abu Hanifah narrated from Ata ibn Abi Rabah, his greatest shaykh, and from Hammad ibn Abi Sulayman, with whom he learned fiqh."),
      difficulty: 4,
      questions: [
        { q: "Which imam learned fiqh from Hammad?", a: "Abu Hanifah", wrong: ["Imam Malik", "Imam Ahmad", "Ash-Shafi'i"], why: "Hammad was his fiqh teacher in Kufa." },
        { q: "Put the chain in order, from the top.", a: "Ibrahim, Hammad, Abu Hanifah", wrong: ["Abu Hanifah, Hammad, Ibrahim", "Hammad, Ibrahim, Abu Hanifah", "Ibrahim, Abu Hanifah, Hammad"], why: "A teacher comes before his student." },
        { q: "Abu Hanifah learned from both Ata and Hammad.", tf: true, why: "Ata in Makkah, Hammad in Kufa." }
      ]
    }
  ]
};


// The students of the Tabi'in's students, and the hadith masters after them, down to al-Bukhari, Muslim, Abu Dawud and at-Tirmidhi.

const SUFYAN: DeepUnit = {
  key: "tree-sufyan",
  topicId: "scholars",
  branchId: "scholar-sufyan",
  name: "Sufyan ibn Uyaynah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "hafiz-of-his-age",
      title: "Hafiz of his age",
      line: "Sufyan ibn Uyaynah was the great hadith master of his age.",
      facts: ["Born in Kufa, lived in Makkah", "Called Shaykh al-Islam"],
      source: siyar(8, 454, "Sufyan ibn Uyaynah, the great imam, the hafiz of the age, Shaykh al-Islam, from Kufa, then Makkah."),
      difficulty: 1,
      questions: [
        { q: "Where did Sufyan ibn Uyaynah live and teach?", a: "Makkah", wrong: ["Cairo", "Baghdad", "Damascus"], why: "He was born in Kufa and settled in Makkah." },
        { q: "What was Sufyan a master of?", a: "Hadith", wrong: ["Sailing", "Trade", "Poetry only"], why: "He was the hafiz of his age." },
        { q: "Sufyan ibn Uyaynah was born in Kufa.", tf: true, why: "Then he made Makkah his home." }
      ]
    },
    {
      slug: "learned-young",
      title: "He started as a boy",
      line: "Sufyan sought hadith as a boy, from az-Zuhri and others.",
      facts: ["Also from Yahya al-Ansari", "And from Amr ibn Dinar, most of all"],
      source: siyar(8, 455, "He sought hadith as a boy and met the great scholars. He heard from Amr ibn Dinar, a great deal, from Ibn Shihab az-Zuhri, Yahya ibn Sa'id al-Ansari and many more."),
      difficulty: 2,
      questions: [
        { q: "When did Sufyan start seeking hadith?", a: "As a boy", wrong: ["At sixty", "Never", "After he retired"], why: "He met the great scholars while young." },
        { q: "Which Tabi'i on the tree taught Sufyan?", a: "Az-Zuhri", wrong: [...LATER], why: "And Yahya al-Ansari too." },
        { q: "Sufyan learned from Yahya ibn Sa'id al-Ansari.", tf: true, why: "That is how he got the hadith of intentions." }
      ]
    },
    {
      slug: "his-students",
      title: "Teachers became students",
      line: "Even Sufyan's own teachers, like Shu'bah, narrated from him.",
      facts: ["Ash-Shafi'i and Ahmad learned from him", "Al-Humaydi too, and Ibn al-Madini"],
      source: siyar(8, 456, "Al-A'mash, Ibn Jurayj and Shu'bah, who were among his teachers, narrated from him; and Ibn al-Mubarak, ash-Shafi'i, al-Humaydi, Ahmad ibn Hanbal, Ibn al-Madini and Yahya ibn Ma'in."),
      difficulty: 3,
      questions: [
        { q: "Which two of the four imams learned from Sufyan?", a: "Ash-Shafi'i and Ahmad", wrong: ["Abu Hanifah and Malik", "Malik and Ahmad", "None of them"], why: "Both narrated from him." },
        { q: "Which student of his taught al-Bukhari?", a: "Al-Humaydi", wrong: ["Umar", "Ata", "Nafi"], why: "Sufyan, al-Humaydi, al-Bukhari." },
        { q: "Some of Sufyan's teachers later narrated from him.", tf: true, why: "Shu'bah and al-A'mash among them." }
      ]
    },
    {
      slug: "knowledge-of-hijaz",
      title: "Hajj to meet him",
      line: "Students made Hajj just to meet Sufyan ibn Uyaynah.",
      facts: ["Ash-Shafi'i: without Malik and Sufyan, Hijaz's knowledge goes", "He held nearly every hadith of rulings"],
      source: siyar(8, 457, "Many students of hadith made Hajj with no other aim than to meet Sufyan. Ash-Shafi'i said: were it not for Malik and Sufyan ibn Uyaynah, the knowledge of the Hijaz would have gone."),
      difficulty: 4,
      questions: [
        { q: "Why did many students make the trip to Makkah?", a: "To meet Sufyan and learn", wrong: ["To trade", "To see the sea", "To fight"], why: "His chains were short and high." },
        { q: "Ash-Shafi'i said: without Malik and Sufyan, what would have gone?", a: "The knowledge of the Hijaz", wrong: ["The wells of Makkah", "The date palms", "The trade routes"], why: "They held the hadith of Makkah and Madinah." },
        { q: "Ash-Shafi'i praised Sufyan ibn Uyaynah.", tf: true, why: "Sufyan was his teacher." }
      ]
    },
    {
      slug: "tafsir",
      title: "Master of tafsir",
      line: "Ibn Wahb: none knew Quran tafsir better than Sufyan.",
      facts: ["Ash-Shafi'i: none was slower to give fatwa", "Ibn al-Madini: az-Zuhri's most precise student"],
      source: siyar(8, 458, "Ash-Shafi'i said: I never saw anyone more careful to hold back from fatwa than him. Ibn Wahb said: I know no one more learned in the tafsir of the Quran than Ibn Uyaynah. Ibn al-Madini said: none of az-Zuhri's students was more precise."),
      difficulty: 5,
      questions: [
        { q: "What did Ibn Wahb praise Sufyan for?", a: "Tafsir of the Quran", wrong: ["Building", "Archery", "Medicine"], why: "None knew it better, he said." },
        { q: "What did ash-Shafi'i notice about Sufyan and fatwa?", a: "He held back from giving fatwa", wrong: ["He gave fatwa on everything", "He never studied fiqh", "He sold fatwas"], why: "Great scholars feared speaking without knowledge." },
        { q: "Being slow to give fatwa is a sign of taqwa.", tf: true, why: "They feared saying about Allah what they did not know." }
      ]
    }
  ]
};

const YAHYA_YAHYA: DeepUnit = {
  key: "tree-yahya-yahya",
  topicId: "scholars",
  branchId: "scholar-yahya-yahya",
  name: "Yahya ibn Yahya",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "scholar-of-khurasan",
      title: "Scholar of Khurasan",
      line: "Yahya ibn Yahya at-Tamimi was the scholar of Khurasan.",
      facts: ["From Nishapur", "He wrote hadith in Hijaz, Iraq, Sham and Egypt"],
      source: siyar(10, 512, "Yahya ibn Yahya at-Tamimi, Shaykh al-Islam, scholar of Khurasan, of Nishapur. He wrote hadith in his city, the Hijaz, Iraq, Sham and Egypt."),
      difficulty: 1,
      questions: [
        { q: "Which land was Yahya ibn Yahya the scholar of?", a: "Khurasan", wrong: ["Yemen", "Spain", "Egypt"], why: "He lived in Nishapur." },
        { q: "Where did he travel to write hadith?", a: "Hijaz, Iraq, Sham and Egypt", wrong: ["Nowhere", "Only his street", "China and India"], why: "Scholars travelled far for hadith." },
        { q: "Yahya ibn Yahya stayed home and never travelled.", tf: false, why: "He wrote hadith in many lands." }
      ]
    },
    {
      slug: "read-to-malik",
      title: "He read to Malik",
      line: "Yahya read hadith to Imam Malik, and Muslim learned from Yahya.",
      facts: ["Malik, from Nafi, from Ibn Umar", "Malik, Yahya, Muslim: a chain on the tree"],
      source: hadith("muslim", "650a", "Yahya ibn Yahya, from Malik, from Nafi, from Ibn Umar", "Yahya ibn Yahya said: I read to Malik, from Nafi, from Ibn Umar: the Messenger of Allah ﷺ said, prayer in congregation is twenty-seven degrees better than prayer alone."),
      difficulty: 2,
      questions: [
        { q: "Which imam did Yahya read hadith to?", a: "Imam Malik", wrong: ["Imam Ahmad", "Ibn Taymiyyah", "Ibn Baz"], why: "In Madinah." },
        { q: "Which great collector learned from Yahya?", a: "Imam Muslim", wrong: ["Umar", "Ata", "Urwah"], why: "Malik, Yahya, Muslim: a chain on the tree." },
        { q: "Prayer in congregation is 27 degrees better.", tf: true, why: "This hadith came down through Yahya." }
      ]
    },
    {
      slug: "his-students",
      title: "Al-Bukhari and Muslim",
      line: "Both al-Bukhari and Muslim learned hadith from Yahya ibn Yahya.",
      facts: ["He learned from Malik and al-Layth", "He met some younger Tabi'in"],
      source: siyar(10, 512, "He met some of the younger Tabi'in, and learned from Malik, al-Layth ibn Sa'd and many more. Al-Bukhari and Muslim narrated from him."),
      difficulty: 3,
      questions: [
        { q: "Which two famous collectors learned from Yahya?", a: "Al-Bukhari and Muslim", wrong: ["Umar and Ali", "Ata and Nafi", "Ibn Baz and al-Albani"], why: "Both narrated from him." },
        { q: "Which great scholar of Egypt taught Yahya?", a: "Al-Layth ibn Sa'd", wrong: ["Abu Jahl", "Fir'awn", "Qarun"], why: "Along with Malik." },
        { q: "Yahya ibn Yahya met some of the Tabi'in.", tf: true, why: "Some of the younger ones." }
      ]
    },
    {
      slug: "praise",
      title: "None like him",
      line: "Imam Ahmad: people never saw anyone like Yahya ibn Yahya.",
      facts: ["Ishaq ibn Rahwayh: I never saw his like", "Born in 142 AH"],
      source: siyar(10, 513, "Ishaq ibn Rahwayh said: I never saw the like of Yahya ibn Yahya. Ahmad ibn Hanbal said: Yahya ibn Yahya never saw his own like, and people never saw his like."),
      difficulty: 4,
      questions: [
        { q: "What did Imam Ahmad say about Yahya?", a: "People never saw his like", wrong: ["He was weak", "He was unknown", "He was rude"], why: "High praise from a great imam." },
        { q: "Who else said he never saw Yahya's like?", a: "Ishaq ibn Rahwayh", wrong: ["Abu Jahl", "Abu Lahab", "Musaylimah"], why: "Ishaq was a great imam of Khurasan." },
        { q: "Great scholars praised Yahya ibn Yahya.", tf: true, why: "Ahmad and Ishaq among them." }
      ]
    },
    {
      slug: "travel-to-him",
      title: "Worth the journey",
      line: "Imam Ahmad: if I had the money, I would travel to Yahya.",
      facts: ["Ishaq: he shared what to share, held back the rest", "He died an imam of the people"],
      source: siyar(10, 514, "Ahmad ibn Hanbal said: Yahya ibn Yahya was an imam to me; if I had the money, I would have travelled to him. Ishaq said: he brought out of his knowledge what he should, and held back what he should."),
      difficulty: 5,
      questions: [
        { q: "What would Imam Ahmad do if he had the money?", a: "Travel to learn from Yahya", wrong: ["Buy a palace", "Start a trade", "Stay home"], why: "Knowledge was worth the journey." },
        { q: "What did Ishaq praise in how Yahya taught?", a: "He knew what to share and what to hold", wrong: ["He talked nonstop", "He never taught", "He hid all he knew"], why: "Wisdom is saying the right thing at the right time." },
        { q: "A wise scholar shares what helps people.", tf: true, why: "And holds back what does not." }
      ]
    }
  ]
};

const ABU_YUSUF: DeepUnit = {
  key: "tree-abu-yusuf",
  topicId: "scholars",
  branchId: "scholar-abu-yusuf",
  name: "Abu Yusuf",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "best-student",
      title: "Abu Hanifah's best student",
      line: "Abu Yusuf stayed with Abu Hanifah and was his best student.",
      facts: ["He also heard Hisham ibn Urwah", "And Yahya al-Ansari"],
      source: siyar(8, 536, "Abu Yusuf narrated from Hisham ibn Urwah, Yahya ibn Sa'id al-Ansari and Abu Hanifah, whom he stayed with and learned fiqh from; he was the noblest and most learned of his students."),
      difficulty: 1,
      questions: [
        { q: "Whose best student was Abu Yusuf?", a: "Abu Hanifah", wrong: ["Imam Malik", "Imam Ahmad", "Ash-Shafi'i"], why: "He was the most learned of his students." },
        { q: "Which Tabi'i on the tree also taught Abu Yusuf?", a: "Yahya al-Ansari", wrong: [...LATER], why: "He heard hadith from him." },
        { q: "Abu Yusuf learned fiqh from Abu Hanifah.", tf: true, why: "He stayed with him for years." }
      ]
    },
    {
      slug: "a-hundred-dirhams",
      title: "Stay in the circle",
      line: "Abu Yusuf was poor, so Abu Hanifah paid him to keep studying.",
      facts: ["100 dirhams, again and again", "Stay in the circle, he said"],
      source: siyar(8, 536, "Abu Yusuf's father was poor and told him to work. Abu Hanifah gave Abu Yusuf a hundred dirhams and said: stay in the circle, and when this runs out, tell me. Days later he gave him another hundred."),
      difficulty: 2,
      questions: [
        { q: "Why did Abu Hanifah give Abu Yusuf money?", a: "So he could keep studying", wrong: ["To buy a horse", "To pay a debt", "To start a shop"], why: "His family was poor." },
        { q: "What did Abu Hanifah tell him?", a: "Stay in the circle", wrong: ["Go home", "Stop learning", "Find a job"], why: "The study circle, where knowledge was taught." },
        { q: "A teacher can help a poor student keep learning.", tf: true, why: "Abu Hanifah did." }
      ]
    },
    {
      slug: "seventeen-years",
      title: "Seventeen years",
      line: "Abu Yusuf stayed with Abu Hanifah for seventeen years.",
      facts: ["Ibn Ma'in: most precise in hadith of the people of ra'y", "He prayed 200 rak'ahs a day"],
      source: siyar(8, 537, "Abu Yusuf said: I was with Abu Hanifah seventeen years. Ibn Ma'in said: among the people of ra'y, none was more precise in hadith than Abu Yusuf. His daily prayer was two hundred rak'ahs."),
      difficulty: 3,
      questions: [
        { q: "How long was Abu Yusuf with Abu Hanifah?", a: "Seventeen years", wrong: ["Seven days", "One month", "Seventy years"], why: "Long years of learning." },
        { q: "What did Ibn Ma'in praise Abu Yusuf for?", a: "Precision in hadith", wrong: ["Building mosques", "Poetry", "Wealth"], why: "None of his group was more precise." },
        { q: "Abu Yusuf knew hadith as well as fiqh.", tf: true, why: "He also knew tafsir and history." }
      ]
    },
    {
      slug: "teacher-of-ahmad",
      title: "Imam Ahmad's first teacher",
      line: "Imam Ahmad first wrote hadith with Abu Yusuf.",
      facts: ["Muhammad ash-Shaybani learned from him", "Yahya ibn Ma'in too"],
      source: siyar(8, 536, "Muhammad ibn al-Hasan was among those who studied under him; Yahya ibn Ma'in and Ahmad ibn Hanbal narrated from him. Ahmad said: when I first wrote hadith, I went to Abu Yusuf."),
      difficulty: 4,
      questions: [
        { q: "Which imam first wrote hadith with Abu Yusuf?", a: "Imam Ahmad", wrong: ["Imam Malik", "Abu Hanifah", "Ibn Taymiyyah"], why: "Ahmad said so himself." },
        { q: "Which student of Abu Yusuf is on the tree?", a: "Muhammad ash-Shaybani", wrong: ["Umar", "Ata", "Nafi"], why: "Ash-Shaybani completed his fiqh with him." },
        { q: "Abu Yusuf links Abu Hanifah to Imam Ahmad.", tf: true, why: "Abu Hanifah, Abu Yusuf, Ahmad." }
      ]
    },
    {
      slug: "back-to-the-sources",
      title: "Back to the Quran and sunnah",
      line: "Abu Yusuf: drop any fatwa of mine against the Quran and sunnah.",
      facts: ["He said it as he was dying", "Yahya ibn Yahya heard him"],
      source: siyar(8, 537, "Yahya ibn Yahya at-Tamimi said: I heard Abu Yusuf say as he was dying: every fatwa I gave, I take back, except what agrees with the Book and the sunnah."),
      difficulty: 5,
      questions: [
        { q: "What did Abu Yusuf say about his fatwas?", a: "Keep only what agrees with Quran and sunnah", wrong: ["Follow all of them", "Burn the Quran", "Never read hadith"], why: "The sources come first." },
        { q: "Who heard him say it?", a: "Yahya ibn Yahya", wrong: ["Umar", "Ata", "Urwah"], why: "Yahya ibn Yahya at-Tamimi of Nishapur." },
        { q: "The Quran and sunnah come before any scholar's opinion.", tf: true, why: "Abu Yusuf said so himself." }
      ]
    }
  ]
};

const SHAYBANI: DeepUnit = {
  key: "tree-shaybani",
  topicId: "scholars",
  branchId: "scholar-shaybani",
  name: "Muhammad ash-Shaybani",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "faqih-of-iraq",
      title: "The faqih of Iraq",
      line: "Muhammad ash-Shaybani was a faqih of Iraq, raised in Kufa.",
      facts: ["He learned from Abu Hanifah", "Then finished fiqh with Abu Yusuf"],
      source: siyar(9, 134, "Muhammad ibn al-Hasan ash-Shaybani, faqih of Iraq, companion of Abu Hanifah. Born in Wasit, raised in Kufa. He took some fiqh from Abu Hanifah and completed it with Abu Yusuf, and narrated from Malik."),
      difficulty: 1,
      questions: [
        { q: "Who did ash-Shaybani finish his fiqh with?", a: "Abu Yusuf", wrong: [...LATER], why: "After learning from Abu Hanifah." },
        { q: "Where did he grow up?", a: "Kufa", wrong: ["Makkah", "Cairo", "Madinah"], why: "He was born in Wasit and raised in Kufa." },
        { q: "Ash-Shaybani learned from Abu Hanifah.", tf: true, why: "Then from his student Abu Yusuf." }
      ]
    },
    {
      slug: "three-years-with-malik",
      title: "Three years with Malik",
      line: "Ash-Shaybani spent three years with Malik, hearing 700 hadith.",
      facts: ["He learned from both Iraq and Madinah", "He judged for Harun ar-Rashid"],
      source: siyar(9, 135, "Muhammad ibn al-Hasan said: I stayed with Malik three years and more, and heard seven hundred hadith from his own mouth. He became judge for ar-Rashid after Abu Yusuf."),
      difficulty: 2,
      questions: [
        { q: "How long did ash-Shaybani stay with Imam Malik?", a: "Three years and more", wrong: ["One day", "Thirty years", "He never met him"], why: "He heard 700 hadith from him." },
        { q: "How many hadith did he hear from Malik's own mouth?", a: "700", wrong: ["7", "70", "70,000"], why: "Seven hundred." },
        { q: "Ash-Shaybani learned from both Abu Hanifah and Malik.", tf: true, why: "Iraq and Madinah." }
      ]
    },
    {
      slug: "teacher-of-shafii",
      title: "Ash-Shafi'i's teacher",
      line: "Ash-Shafi'i wrote a camel-load of notes from ash-Shaybani.",
      facts: ["He was famous for his sharp mind", "Ash-Shafi'i praised his clear Arabic"],
      source: siyar(9, 135, "Ash-Shafi'i used to say: I wrote from him a camel-load, and I never debated anyone sharper. Ash-Shafi'i took from him a great deal."),
      difficulty: 3,
      questions: [
        { q: "How much did ash-Shafi'i write from him?", a: "A camel-load", wrong: ["One line", "A single page", "Nothing"], why: "A great deal of knowledge." },
        { q: "What was ash-Shaybani famous for?", a: "His sharp mind", wrong: ["His wealth", "His height", "His voice"], why: "His intelligence became a proverb." },
        { q: "Ash-Shafi'i learned from ash-Shaybani.", tf: true, why: "So ash-Shafi'i links back to Abu Hanifah." }
      ]
    },
    {
      slug: "his-books",
      title: "His books",
      line: "Imam Ahmad learned fine fiqh from ash-Shaybani's books.",
      facts: ["One book: al-Jami' as-Saghir", "Ibn Ma'in wrote it down from him"],
      source: siyar(9, 136, "Ibn Ma'in said: I wrote down al-Jami' as-Saghir from him. Ibrahim al-Harbi asked Imam Ahmad: where did you get these fine questions? He said: from the books of Muhammad ibn al-Hasan."),
      difficulty: 4,
      questions: [
        { q: "Which book did Ibn Ma'in write down from him?", a: "Al-Jami' as-Saghir", wrong: ["Sahih al-Bukhari", "The Muwatta", "Riyad as-Salihin"], why: "A book of fiqh by ash-Shaybani." },
        { q: "Where did Imam Ahmad get fine fiqh questions from?", a: "Ash-Shaybani's books", wrong: ["Old poems", "Greek books", "His dreams"], why: "Ahmad said so himself." },
        { q: "Scholars of different schools learned from each other.", tf: true, why: "Ahmad read ash-Shaybani's books." }
      ]
    }
  ]
};

const HUMAYDI: DeepUnit = {
  key: "tree-humaydi",
  topicId: "scholars",
  branchId: "scholar-humaydi",
  name: "Al-Humaydi",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "shaykh-of-the-haram",
      title: "Shaykh of the Haram",
      line: "Al-Humaydi was an imam of Makkah and wrote the book al-Musnad.",
      facts: ["He learned from Sufyan ibn Uyaynah", "And from ash-Shafi'i"],
      source: siyar(10, 616, "Al-Humaydi, the imam, hafiz and faqih, Shaykh of the Haram, of Makkah, author of al-Musnad. He narrated a great deal from Sufyan ibn Uyaynah, and from ash-Shafi'i; al-Bukhari narrated from him."),
      difficulty: 1,
      questions: [
        { q: "Which book did al-Humaydi write?", a: "Al-Musnad", wrong: ["Sahih Muslim", "The Muwatta", "Al-Umm"], why: "A collection of hadith." },
        { q: "Where did al-Humaydi teach?", a: "At the Haram in Makkah", wrong: ["In Baghdad", "In Cairo", "In Kufa"], why: "He was Shaykh of the Haram." },
        { q: "Al-Humaydi learned from ash-Shafi'i.", tf: true, why: "And most of all from Sufyan." }
      ]
    },
    {
      slug: "nineteen-years",
      title: "Nineteen years with Sufyan",
      line: "Al-Humaydi sat with Sufyan ibn Uyaynah for about nineteen years.",
      facts: ["Head of Sufyan's students", "Imam Ahmad: al-Humaydi is an imam"],
      source: siyar(10, 617, "Ahmad said: al-Humaydi is an imam to us. Abu Hatim said: the most precise in Ibn Uyaynah is al-Humaydi, head of his students. Al-Humaydi said: I sat with Sufyan nineteen years or so."),
      difficulty: 2,
      questions: [
        { q: "How long did al-Humaydi sit with Sufyan?", a: "About nineteen years", wrong: ["Nineteen days", "Nine weeks", "One year"], why: "Long years with one teacher." },
        { q: "What did Imam Ahmad call al-Humaydi?", a: "An imam", wrong: ["A beginner", "Weak", "Unknown"], why: "Ahmad honoured him." },
        { q: "Al-Humaydi led Sufyan's students.", tf: true, why: "Abu Hatim called him their head." }
      ]
    },
    {
      slug: "ten-thousand",
      title: "Ten thousand hadith",
      line: "Al-Humaydi memorized ten thousand hadith from Sufyan.",
      facts: ["Ash-Shafi'i praised his memory", "Ibn Sa'd: trustworthy, many hadith"],
      source: siyar(10, 618, "Ash-Shafi'i said: I never saw anyone with a better memory than al-Humaydi; he had memorized ten thousand hadith from Sufyan ibn Uyaynah."),
      difficulty: 3,
      questions: [
        { q: "How many hadith did al-Humaydi memorize from Sufyan?", a: "10,000", wrong: ["10", "100", "1,000,000"], why: "Ash-Shafi'i said so." },
        { q: "Who praised al-Humaydi's memory?", a: "Ash-Shafi'i", wrong: ["Abu Jahl", "Fir'awn", "Qarun"], why: "His own teacher." },
        { q: "Al-Humaydi had a weak memory.", tf: false, why: "Ten thousand hadith from one teacher." }
      ]
    },
    {
      slug: "first-hadith",
      title: "Al-Bukhari's first hadith",
      line: "Al-Bukhari's very first hadith comes from al-Humaydi.",
      facts: ["Actions are by intentions", "Al-Humaydi, from Sufyan, from Yahya al-Ansari"],
      source: hadith("bukhari", "1", "Umar ibn al-Khattab", "Al-Bukhari opens his Sahih: al-Humaydi told us, Sufyan told us, Yahya ibn Sa'id al-Ansari told us, through at-Taymi and Alqamah, from Umar: actions are only by intentions."),
      difficulty: 4,
      questions: [
        { q: "Whose hadith opens Sahih al-Bukhari?", a: "Al-Humaydi's, from Sufyan", wrong: ["Ibn Taymiyyah's", "Ibn Baz's", "Al-Albani's"], why: "The first name al-Bukhari says is al-Humaydi." },
        { q: "Put the chain in order, from Umar.", a: "Umar, Alqamah, at-Taymi, Yahya", wrong: ["Yahya, Umar, Alqamah, at-Taymi", "At-Taymi, Yahya, Umar, Alqamah", "Alqamah, Umar, Yahya, at-Taymi"], why: "Then Sufyan, al-Humaydi and al-Bukhari." },
        { q: "Al-Bukhari was al-Humaydi's student.", tf: true, why: "He narrated from him." }
      ]
    }
  ]
};

const BUKHARI: DeepUnit = {
  key: "tree-bukhari",
  topicId: "scholars",
  branchId: "scholar-bukhari",
  name: "Imam al-Bukhari",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "memorizing-at-ten",
      title: "Memorizing at ten",
      line: "Al-Bukhari began memorizing hadith at ten years old.",
      facts: ["By sixteen he knew whole books by heart", "Then Hajj with his mother and brother"],
      source: siyar(12, 393, "Al-Bukhari said: I was inspired to memorize hadith while at school, at ten or younger. By sixteen I had memorized the books of Ibn al-Mubarak and Waki'. Then I went to Makkah with my mother and brother."),
      difficulty: 1,
      questions: [
        { q: "At what age did al-Bukhari start memorizing hadith?", a: "About ten", wrong: ["Forty", "Sixty", "Two"], why: "While still at school." },
        { q: "Who went to Makkah with him?", a: "His mother and brother", wrong: ["His teacher only", "A king", "No one"], why: "For Hajj, and he stayed to learn." },
        { q: "Children can start learning hadith young.", tf: true, why: "Al-Bukhari did at about ten." }
      ]
    },
    {
      slug: "his-history-book",
      title: "A book by moonlight",
      line: "Al-Bukhari wrote his History by moonlight in Madinah.",
      facts: ["The book: at-Tarikh", "Almost every name in it has a story"],
      source: siyar(12, 400, "Al-Bukhari said: I wrote the book at-Tarikh then, beside the grave of the Messenger of Allah ﷺ, on moonlit nights. Hardly a name in it is without a story."),
      difficulty: 2,
      questions: [
        { q: "Which book did al-Bukhari write by moonlight in Madinah?", a: "At-Tarikh, his History", wrong: ["The Muwatta", "Al-Umm", "Sahih Muslim"], why: "A book about the narrators of hadith." },
        { q: "Where did he write it?", a: "By the Prophet's ﷺ grave", wrong: ["In a palace", "On a ship", "In a market"], why: "In Madinah, on moonlit nights." },
        { q: "Al-Bukhari wrote more than one book.", tf: true, why: "His Sahih and his History, and others." }
      ]
    },
    {
      slug: "the-sahih",
      title: "How the Sahih began",
      line: "One friend's wish started Sahih al-Bukhari.",
      facts: ["Someone said: collect a short book of sunnah", "It stayed in al-Bukhari's heart"],
      source: siyar(12, 401, "Al-Bukhari said: I was with Ishaq ibn Rahwayh, and one of us said: if only you would gather a short book of the sunnah of the Prophet ﷺ. It stayed in my heart, and I began gathering this book."),
      difficulty: 3,
      questions: [
        { q: "Where was al-Bukhari when the idea came?", a: "With Ishaq ibn Rahwayh", wrong: ["With Ibn Taymiyyah", "With Ibn Baz", "With al-Albani"], why: "Ishaq was one of his teachers." },
        { q: "What was the idea?", a: "A short book of only sound sunnah", wrong: ["A book of poems", "A book of stories", "A map of the world"], why: "That became Sahih al-Bukhari." },
        { q: "One good idea can lead to a great work.", tf: true, why: "The Sahih began with one wish." }
      ]
    },
    {
      slug: "six-hundred-thousand",
      title: "Chosen with care",
      line: "Al-Bukhari chose his Sahih from about 600,000 hadith.",
      facts: ["He made ghusl and prayed before each hadith", "Two rak'ahs for every entry"],
      source: siyar(12, 402, "Al-Bukhari said: I brought this book out of about six hundred thousand hadith. And: I never put a hadith in my Sahih without first taking a bath and praying two rak'ahs."),
      difficulty: 4,
      questions: [
        { q: "From about how many hadith did he choose the Sahih?", a: "600,000", wrong: ["600", "6,000", "60"], why: "He kept only what was sound." },
        { q: "What did he do before writing each hadith?", a: "Ghusl and two rak'ahs", wrong: ["Ate a meal", "Slept", "Went to market"], why: "He treated the work as worship." },
        { q: "Al-Bukhari put every hadith he heard into his Sahih.", tf: false, why: "He chose only the sound ones." }
      ]
    },
    {
      slug: "teacher-of-teachers",
      title: "Teacher of teachers",
      line: "Imam Muslim called al-Bukhari the teacher of teachers.",
      facts: ["Physician of hadith's hidden flaws", "At-Tirmidhi learned from him too"],
      source: siyar(12, 432, "Muslim ibn al-Hajjaj came to al-Bukhari and said: let me kiss your feet, teacher of teachers, master of the hadith scholars. At-Tirmidhi said: in Iraq and Khurasan I saw none more learned in hidden flaws, history and chains."),
      difficulty: 5,
      questions: [
        { q: "What did Imam Muslim call al-Bukhari?", a: "Teacher of teachers", wrong: ["My student", "A beginner", "A poet"], why: "Muslim learned from him." },
        { q: "Which two collectors on the tree learned from al-Bukhari?", a: "Muslim and at-Tirmidhi", wrong: ["Umar and Ali", "Ata and Nafi", "Ibn Baz and al-Albani"], why: "Both were his students." },
        { q: "At-Tirmidhi praised al-Bukhari's knowledge of chains.", tf: true, why: "He saw none more learned in it." }
      ]
    }
  ]
};

const MUSLIM: DeepUnit = {
  key: "tree-muslim",
  topicId: "scholars",
  branchId: "scholar-muslim",
  name: "Imam Muslim",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "author-of-the-sahih",
      title: "Author of the Sahih",
      line: "Imam Muslim of Nishapur wrote Sahih Muslim.",
      facts: ["His first teacher: Yahya ibn Yahya", "He made Hajj as a young man"],
      source: siyar(12, 558, "Muslim ibn al-Hajjaj, the great imam and hafiz, of Nishapur, author of the Sahih. He first heard hadith from Yahya ibn Yahya at-Tamimi, and made Hajj while still young."),
      difficulty: 1,
      questions: [
        { q: "Which famous book did Imam Muslim write?", a: "Sahih Muslim", wrong: ["Sahih al-Bukhari", "The Muwatta", "Al-Umm"], why: "One of the two Sahih books." },
        { q: "Who was his first teacher of hadith?", a: "Yahya ibn Yahya", wrong: [...LATER], why: "In Nishapur." },
        { q: "Imam Muslim was from Nishapur.", tf: true, why: "A city of Khurasan." }
      ]
    },
    {
      slug: "his-travels",
      title: "His travels",
      line: "Muslim heard hadith in Iraq, the two Harams and Egypt.",
      facts: ["He learned from Imam Ahmad", "And from Ishaq ibn Rahwayh"],
      source: siyar(12, 558, "He heard hadith in Iraq, the two Harams and Egypt. Among his teachers: Ahmad ibn Hanbal and Ishaq ibn Rahwayh."),
      difficulty: 2,
      questions: [
        { q: "Which of the four imams taught Muslim?", a: "Imam Ahmad", wrong: ["Abu Hanifah", "Imam Malik", "None of them"], why: "Ahmad lived in his time." },
        { q: "Where did Muslim travel for hadith?", a: "Iraq, the two Harams and Egypt", wrong: ["China and Japan", "Nowhere", "Only Nishapur"], why: "Makkah and Madinah are the two Harams." },
        { q: "Imam Muslim learned from Ishaq ibn Rahwayh.", tf: true, why: "So did al-Bukhari." }
      ]
    },
    {
      slug: "three-hundred-thousand",
      title: "From 300,000",
      line: "Muslim compiled his Sahih from 300,000 hadith he had heard.",
      facts: ["He chose only sound hadith", "One of the two Sahih books"],
      source: siyar(12, 565, "Muslim said: I compiled this Musnad Sahih from three hundred thousand hadith that I heard."),
      difficulty: 3,
      questions: [
        { q: "From how many hadith did Muslim compile his Sahih?", a: "300,000", wrong: ["300", "3,000", "30"], why: "He kept only the sound ones." },
        { q: "What does 'Sahih' mean?", a: "Sound, authentic", wrong: ["Long", "Old", "Secret"], why: "A book of sound hadith." },
        { q: "Muslim put every hadith he heard in his Sahih.", tf: false, why: "He chose carefully." }
      ]
    },
    {
      slug: "four-huffaz",
      title: "One of four",
      line: "Muslim was named one of the world's four hadith masters.",
      facts: ["Abu Zur'ah in Rayy, Muslim in Nishapur", "Ad-Darimi in Samarqand, al-Bukhari in Bukhara"],
      source: siyar(12, 564, "Muhammad ibn Bashshar said: the huffaz of the world are four: Abu Zur'ah in Rayy, Muslim in Nishapur, Abdullah ad-Darimi in Samarqand, and Muhammad ibn Isma'il in Bukhara."),
      difficulty: 4,
      questions: [
        { q: "Where was Muslim named as the hadith master?", a: "Nishapur", wrong: ["Rayy", "Samarqand", "Bukhara"], why: "The others were in the other cities." },
        { q: "Which other master on the tree was in the list?", a: "Al-Bukhari", wrong: ["Ibn Taymiyyah", "Ibn Baz", "Al-Albani"], why: "Muhammad ibn Isma'il is al-Bukhari." },
        { q: "Muslim and al-Bukhari lived at the same time.", tf: true, why: "Muslim even learned from him." }
      ]
    },
    {
      slug: "al-bukharis-student",
      title: "Al-Bukhari's student",
      line: "Muslim asked al-Bukhari about a hadith's hidden flaw.",
      facts: ["He kissed him between the eyes", "Then asked: what is its flaw?"],
      source: siyar(12, 436, "Muslim came to al-Bukhari, kissed him between the eyes and said: let me kiss your feet. Then he asked him about the hidden flaw in a hadith on the expiation of a sitting."),
      difficulty: 5,
      questions: [
        { q: "What did Muslim call al-Bukhari?", a: "Teacher of teachers", wrong: ["My student", "A beginner", "A poet"], why: "Out of deep respect." },
        { q: "What is a hidden flaw ('illah) in a hadith?", a: "A hidden weakness only experts spot", wrong: ["A spelling mistake", "A long chain", "A happy ending"], why: "Al-Bukhari was an expert in spotting them." },
        { q: "Great scholars showed respect to their teachers.", tf: true, why: "Muslim did to al-Bukhari." }
      ]
    }
  ]
};

const ABU_DAWUD: DeepUnit = {
  key: "tree-abu-dawud",
  topicId: "scholars",
  branchId: "scholar-abu-dawud",
  name: "Abu Dawud",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "shaykh-of-sunnah",
      title: "Shaykh of the sunnah",
      line: "Abu Dawud of Sijistan was a leading hadith master of Basra.",
      facts: ["He travelled, collected and wrote", "Called Shaykh as-Sunnah"],
      source: siyar(13, 203, "Abu Dawud as-Sijistani, the imam, Shaykh of the sunnah, foremost of the huffaz, the hadith scholar of Basra."),
      difficulty: 1,
      questions: [
        { q: "Abu Dawud was the hadith scholar of which city?", a: "Basra", wrong: ["Makkah", "Cairo", "Cordoba"], why: "He came from Sijistan." },
        { q: "What was he called?", a: "Shaykh of the sunnah", wrong: ["King of poets", "Lord of ships", "Master of trade"], why: "For his care for the sunnah." },
        { q: "Abu Dawud was a scholar of hadith.", tf: true, why: "One of the foremost." }
      ]
    },
    {
      slug: "his-teachers",
      title: "Teachers in many lands",
      line: "Abu Dawud learned from Imam Ahmad in Baghdad, and many more.",
      facts: ["Ishaq ibn Rahwayh in Khurasan", "Qutaybah in Balkh, others in Egypt"],
      source: siyar(13, 205, "He heard from Ishaq ibn Rahwayh in Khurasan, Ahmad ibn Hanbal in Baghdad, Qutaybah ibn Sa'id in Balkh, Ahmad ibn Salih in Egypt, and many others."),
      difficulty: 2,
      questions: [
        { q: "Where did Abu Dawud learn from Imam Ahmad?", a: "Baghdad", wrong: ["Makkah", "Cairo", "Damascus"], why: "Ahmad taught in Baghdad." },
        { q: "Which of these was NOT a place he learned in?", a: "Spain", wrong: ["Baghdad", "Khurasan", "Egypt"], why: "He travelled east and west, but not to Spain." },
        { q: "Abu Dawud learned in many lands.", tf: true, why: "Iraq, Khurasan, Sham, Egypt and more." }
      ]
    },
    {
      slug: "the-sunan",
      title: "The Sunan",
      line: "Abu Dawud chose 4,800 hadith from 500,000 for his Sunan.",
      facts: ["His book: Sunan Abi Dawud", "Sound hadith and those close to it"],
      source: siyar(13, 210, "Abu Dawud said: I wrote five hundred thousand hadith from the Messenger of Allah ﷺ and chose from them what is in this book, the Sunan: four thousand eight hundred hadith, the sound and what is like it and close to it."),
      difficulty: 3,
      questions: [
        { q: "How many hadith are in Abu Dawud's Sunan?", a: "About 4,800", wrong: ["48", "480", "48,000"], why: "Chosen from 500,000." },
        { q: "What is his famous book called?", a: "Sunan Abi Dawud", wrong: ["Sahih Muslim", "The Muwatta", "Al-Musnad"], why: "One of the six books of hadith." },
        { q: "Abu Dawud chose carefully what went in his book.", tf: true, why: "Fewer than one in a hundred." }
      ]
    },
    {
      slug: "like-iron",
      title: "Soft as iron for Dawud",
      line: "Hadith was made easy for Abu Dawud, like iron for Prophet Dawud.",
      facts: ["Al-Hakim: imam of the hadith people in his time", "He knew 100,000 hadith for review"],
      source: siyar(13, 212, "When Abu Dawud wrote the Sunan, it was said: hadith was made soft for Abu Dawud as iron was made soft for Dawud, peace be upon him. Al-Hakim said: Abu Dawud was the imam of the hadith people in his time, without dispute."),
      difficulty: 4,
      questions: [
        { q: "What was made soft for Prophet Dawud?", a: "Iron", wrong: ["Stone", "Gold", "Water"], why: "Allah softened iron for him." },
        { q: "What did al-Hakim call Abu Dawud?", a: "Imam of the hadith people", wrong: ["A weak narrator", "A poet", "A trader"], why: "Without dispute, in his time." },
        { q: "The saying means hadith came easily to Abu Dawud.", tf: true, why: "Like iron in Dawud's hands." }
      ]
    },
    {
      slug: "student-of-ahmad",
      title: "Imam Ahmad's student",
      line: "Abu Dawud: Imam Ahmad's top student, and a great faqih.",
      facts: ["He asked Ahmad about fine points of fiqh", "He stayed in Ahmad's circle for a time"],
      source: siyar(13, 215, "Abu Dawud, besides leading in hadith, was among the great fuqaha; he was one of Imam Ahmad's best students, stayed in his circle for a time, and asked him about fine questions."),
      difficulty: 5,
      questions: [
        { q: "Whose best students was Abu Dawud among?", a: "Imam Ahmad's", wrong: ["Ibn Taymiyyah's", "Ibn Baz's", "Al-Albani's"], why: "He sat in his circle." },
        { q: "Besides hadith, what else was Abu Dawud great in?", a: "Fiqh", wrong: ["Sailing", "Poetry", "Trade"], why: "His book shows it." },
        { q: "Abu Dawud was only a hadith scholar, not a faqih.", tf: false, why: "Adh-Dhahabi counts him among the great fuqaha." }
      ]
    }
  ]
};

const TIRMIDHI: DeepUnit = {
  key: "tree-tirmidhi",
  topicId: "scholars",
  branchId: "scholar-tirmidhi",
  name: "At-Tirmidhi",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "author-of-al-jami",
      title: "Author of al-Jami'",
      line: "At-Tirmidhi wrote al-Jami', a famous book of hadith.",
      facts: ["Also a book on hidden flaws: al-'Ilal", "He lost his sight in old age"],
      source: siyar(13, 270, "At-Tirmidhi, the hafiz and imam, author of al-Jami' and of the book al-'Ilal. The sound view is that he lost his sight in old age, after his travels and writing."),
      difficulty: 1,
      questions: [
        { q: "Which book did at-Tirmidhi write?", a: "Al-Jami'", wrong: ["The Muwatta", "Sahih Muslim", "Al-Umm"], why: "Also called Sunan at-Tirmidhi." },
        { q: "What happened to his sight?", a: "He lost it in old age", wrong: ["It was perfect always", "He was born blind", "He wore glasses"], why: "After his travels and writing." },
        { q: "At-Tirmidhi wrote more than one book.", tf: true, why: "Al-Jami' and al-'Ilal, and more." }
      ]
    },
    {
      slug: "student-of-al-bukhari",
      title: "Al-Bukhari's student",
      line: "At-Tirmidhi learned much from al-Bukhari.",
      facts: ["He travelled to Khurasan, Iraq and the two Harams", "Also Qutaybah and Ishaq ibn Rahwayh"],
      source: siyar(13, 271, "He travelled and heard hadith in Khurasan, Iraq and the two Harams, from Qutaybah ibn Sa'id, Ishaq ibn Rahwayh and many others, and he narrated a great deal from al-Bukhari."),
      difficulty: 2,
      questions: [
        { q: "Which great collector taught at-Tirmidhi a lot?", a: "Al-Bukhari", wrong: ["Ibn Taymiyyah", "Ibn Baz", "Al-Albani"], why: "Al-Bukhari, then at-Tirmidhi." },
        { q: "Where did at-Tirmidhi travel for hadith?", a: "Khurasan, Iraq and the two Harams", wrong: ["Spain and France", "Nowhere", "China"], why: "Makkah and Madinah are the two Harams." },
        { q: "At-Tirmidhi travelled to learn.", tf: true, why: "Like the scholars before him." }
      ]
    },
    {
      slug: "teacher-heard-him",
      title: "His teacher heard him",
      line: "Al-Bukhari himself heard a hadith from at-Tirmidhi.",
      facts: ["A great honour for a student", "A teacher learning from his student"],
      source: siyar(13, 272, "His shaykh al-Bukhari wrote from him: at-Tirmidhi said of one hadith, Muhammad ibn Isma'il heard this hadith from me."),
      difficulty: 3,
      questions: [
        { q: "Who heard a hadith from at-Tirmidhi?", a: "His teacher al-Bukhari", wrong: ["Umar", "Ata", "Nafi"], why: "A teacher learning from his student." },
        { q: "What does this show?", a: "Great scholars learned from anyone", wrong: ["Al-Bukhari forgot things", "Students are better", "Teachers never listen"], why: "They took knowledge wherever it was." },
        { q: "A teacher can learn from his student.", tf: true, why: "Al-Bukhari did." }
      ]
    },
    {
      slug: "memory-and-piety",
      title: "None like him in Khurasan",
      line: "After al-Bukhari, none in Khurasan matched at-Tirmidhi.",
      facts: ["His memory was a proverb", "He wept out of fear of Allah"],
      source: siyar(13, 273, "Abu Sa'd al-Idrisi said: at-Tirmidhi's memory was a proverb. Umar ibn Allak said: al-Bukhari died and left none in Khurasan like Abu Isa in knowledge, memory, piety and zuhd."),
      difficulty: 4,
      questions: [
        { q: "What was at-Tirmidhi's memory like?", a: "A proverb, it was so strong", wrong: ["Very weak", "Average", "He never memorized"], why: "People used it as an example." },
        { q: "After whom was none in Khurasan like him?", a: "Al-Bukhari", wrong: ["Ibn Taymiyyah", "Ibn Baz", "Al-Albani"], why: "His teacher." },
        { q: "At-Tirmidhi was known for piety as well as knowledge.", tf: true, why: "And zuhd: not loving this world." }
      ]
    },
    {
      slug: "shown-to-scholars",
      title: "Checked by the scholars",
      line: "Scholars of three lands checked al-Jami' and approved it.",
      facts: ["Hijaz, Iraq and Khurasan", "Adh-Dhahabi: it holds useful knowledge"],
      source: siyar(13, 274, "At-Tirmidhi said: I wrote this book and showed it to the scholars of the Hijaz, Iraq and Khurasan, and they were pleased with it. Adh-Dhahabi said: al-Jami' holds useful knowledge and many benefits."),
      difficulty: 5,
      questions: [
        { q: "Who did at-Tirmidhi show his book to?", a: "Scholars of Hijaz, Iraq and Khurasan", wrong: ["No one", "Only his family", "Kings only"], why: "So it could be checked." },
        { q: "Why show your work to other scholars?", a: "So mistakes can be caught", wrong: ["To boast", "To sell it", "To hide it"], why: "Checking keeps knowledge sound." },
        { q: "The scholars approved of al-Jami'.", tf: true, why: "They were pleased with it." }
      ]
    }
  ]
};

/** The tree's own units, oldest first: they join the Scholars topic beside the seven imams and scholars. */
export const SCHOLAR_TREE_UNITS: readonly DeepUnit[] = [
  UMAR, AISHAH, IBN_MASUD, IBN_ABBAS, IBN_UMAR,
  ALQAMAH_WAQQAS, URWAH, NAFI, ATA, ALQAMAH_QAYS, TAYMI, ZUHRI, NAKHAI, YAHYA_ANSARI, HAMMAD,
  SUFYAN, YAHYA_YAHYA, ABU_YUSUF, SHAYBANI, HUMAYDI, BUKHARI, MUSLIM, ABU_DAWUD, TIRMIDHI
];

/** Their units in the Scholars topic: title and the one line under it. */
export const SCHOLAR_TREE_BRANCHES: readonly { id: string; title: string; description: string }[] = [
  { id: "scholar-umar", title: "Umar's knowledge", description: "The milk of knowledge, and the teachers he sent out." },
  { id: "scholar-aishah", title: "Aishah's knowledge", description: "The woman with the most fiqh in the Ummah." },
  { id: "scholar-ibn-masud", title: "Ibn Mas'ud", description: "Teacher of the Quran, and of Kufa." },
  { id: "scholar-ibn-abbas", title: "Ibn Abbas", description: "Scholar of the Ummah, imam of tafsir." },
  { id: "scholar-ibn-umar", title: "Ibn Umar", description: "Sixty years of fatwa in Madinah." },
  { id: "scholar-alqamah-waqqas", title: "Alqamah ibn Waqqas", description: "Heard Umar on the minbar." },
  { id: "scholar-urwah", title: "Urwah ibn az-Zubayr", description: "Aishah's nephew and student." },
  { id: "scholar-nafi", title: "Nafi", description: "Ibn Umar's student, Malik's teacher." },
  { id: "scholar-ata", title: "Ata ibn Abi Rabah", description: "The mufti of Makkah." },
  { id: "scholar-alqamah-qays", title: "Alqamah ibn Qays", description: "Ibn Mas'ud's student in Kufa." },
  { id: "scholar-taymi", title: "Muhammad at-Taymi", description: "Passed on the hadith of intentions." },
  { id: "scholar-zuhri", title: "Az-Zuhri", description: "Hadith master of Madinah." },
  { id: "scholar-nakhai", title: "Ibrahim an-Nakha'i", description: "The faqih of Iraq." },
  { id: "scholar-yahya-ansari", title: "Yahya al-Ansari", description: "Judge of Madinah." },
  { id: "scholar-hammad", title: "Hammad", description: "Abu Hanifah's teacher of fiqh." },
  { id: "scholar-sufyan", title: "Sufyan ibn Uyaynah", description: "Hadith master of Makkah." },
  { id: "scholar-yahya-yahya", title: "Yahya ibn Yahya", description: "Scholar of Khurasan, Muslim's teacher." },
  { id: "scholar-abu-yusuf", title: "Abu Yusuf", description: "Abu Hanifah's best student." },
  { id: "scholar-shaybani", title: "Muhammad ash-Shaybani", description: "Ash-Shafi'i's teacher from Iraq." },
  { id: "scholar-humaydi", title: "Al-Humaydi", description: "Al-Bukhari's first teacher in his Sahih." },
  { id: "scholar-bukhari", title: "Imam al-Bukhari", description: "Author of Sahih al-Bukhari." },
  { id: "scholar-muslim", title: "Imam Muslim", description: "Author of Sahih Muslim." },
  { id: "scholar-abu-dawud", title: "Abu Dawud", description: "Author of the Sunan." },
  { id: "scholar-tirmidhi", title: "At-Tirmidhi", description: "Author of al-Jami'." }
];
