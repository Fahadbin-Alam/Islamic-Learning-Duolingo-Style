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

/** The tree's own units, oldest first: they join the Scholars topic beside the seven imams and scholars. */
export const SCHOLAR_TREE_UNITS: readonly DeepUnit[] = [
  UMAR, AISHAH, IBN_MASUD, IBN_ABBAS, IBN_UMAR,
  ALQAMAH_WAQQAS, URWAH, NAFI, ATA, ALQAMAH_QAYS, TAYMI, ZUHRI, NAKHAI, YAHYA_ANSARI, HAMMAD
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
  { id: "scholar-hammad", title: "Hammad", description: "Abu Hanifah's teacher of fiqh." }
];
