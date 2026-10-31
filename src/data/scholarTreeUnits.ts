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

/** The tree's own units, oldest first: they join the Scholars topic beside the seven imams and scholars. */
export const SCHOLAR_TREE_UNITS: readonly DeepUnit[] = [UMAR, AISHAH, IBN_MASUD, IBN_ABBAS, IBN_UMAR];

/** Their units in the Scholars topic: title and the one line under it. */
export const SCHOLAR_TREE_BRANCHES: readonly { id: string; title: string; description: string }[] = [
  { id: "scholar-umar", title: "Umar's knowledge", description: "The milk of knowledge, and the teachers he sent out." },
  { id: "scholar-aishah", title: "Aishah's knowledge", description: "The woman with the most fiqh in the Ummah." },
  { id: "scholar-ibn-masud", title: "Ibn Mas'ud", description: "Teacher of the Quran, and of Kufa." },
  { id: "scholar-ibn-abbas", title: "Ibn Abbas", description: "Scholar of the Ummah, imam of tafsir." },
  { id: "scholar-ibn-umar", title: "Ibn Umar", description: "Sixty years of fatwa in Madinah." }
];
