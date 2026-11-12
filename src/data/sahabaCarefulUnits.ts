import { hadith, type DeepUnit } from "./deepKit";

// One more Sahabah unit: how carefully the Companions passed on the words of the Prophet ﷺ, from Sahih al-Bukhari
// and Sunan Ibn Majah. Talhah speaking of Uhud while the others narrated nothing, Ibn Mas'ud's tears and his "or
// close to that", Anas adding "or as he said", Zaid ibn Arqam who had grown old, Ali on thinking the best of him ﷺ,
// and Ibn Abbas on careless narrating. Every card is one sahih hadith with its number, narrator and grade, and its
// exact English words to highlight, and none of them is taught anywhere else in the app. No Companion is drawn or
// shown as a person.

const CAREFUL: DeepUnit = {
  key: "careful-with-his-words",
  topicId: "sahabah",
  branchId: "sahabi-careful-with-his-words",
  branch: { title: "Careful with his words ﷺ", description: "Talhah on Uhud, Ibn Mas'ud's tears, Anas: or as he said, Zaid ibn Arqam grown old, Ali on thinking the best, and Ibn Abbas on care." },
  name: "how they guarded his words ﷺ",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "talhah-spoke-of-uhud",
      title: "Talhah spoke of Uhud",
      line: "As-Sa'ib heard them narrate nothing, but Talhah told of Uhud.",
      facts: ["Told by As-Sa'ib ibn Yazid", "With Talhah, Sa'd, Al-Miqdad and Abdur-Rahman", "Only Talhah spoke, of the day of Uhud"],
      source: hadith("bukhari", "2824", "As-Sa'ib ibn Yazid", "Sahih", "As-Sa'ib ibn Yazid said: I kept company with Talhah ibn Ubaidullah, Sa'd, Al-Miqdad ibn al-Aswad and Abdur-Rahman ibn Awf, and I did not hear any of them narrate anything from the Messenger of Allah ﷺ, except that I heard Talhah speak about the day of Uhud.", "I heard none of them narrating anything from"),
      difficulty: 1,
      questions: [
        { q: "What did As-Sa'ib hear Talhah talk about?", a: "The day of Uhud", wrong: ["The day of Badr", "The day of the Trench", "The day of Hunain"], why: "Talhah was talking about the day of the battle of Uhud, As-Sa'ib said." },
        { q: "What did As-Sa'ib hear the other three narrate from him ﷺ?", a: "Nothing at all", wrong: ["A hadith every day", "A long story each night", "Stories of every battle"], why: "He heard none of them narrating anything from the Messenger of Allah ﷺ, but Talhah." },
        { q: "As-Sa'ib kept company with Abdur-Rahman ibn Awf.", tf: true, why: "He was with Talhah, Sa'd, Al-Miqdad ibn al-Aswad and Abdur-Rahman ibn Awf." }
      ]
    },
    {
      slug: "or-close-to-that",
      title: "Or close to that",
      line: "When Ibn Mas'ud quoted him ﷺ, his eyes filled with tears.",
      facts: ["Told by Amr ibn Maimun", "He visited Ibn Mas'ud every Thursday", "Ibn Mas'ud added: or close to that"],
      source: hadith("ibnmajah", "23", "Amr ibn Maimun", "Sahih (Al-Albani)", "Amr ibn Maimun said: I visited Ibn Mas'ud every Thursday evening and never heard him say: the Messenger of Allah ﷺ said. One evening he said: the Messenger of Allah ﷺ said, then he lowered his head. His eyes filled with tears and his veins swelled, and he said: or more than that, or less than that, or close to that, or something like it.", "Or more than that, or less than that, or close to that or something similar"),
      difficulty: 1,
      questions: [
        { q: "How often did Amr ibn Maimun visit Ibn Mas'ud?", a: "Every Thursday", wrong: ["Every Friday", "Once a year", "Every morning"], why: "Amr ibn Maimun visited Ibn Mas'ud every Thursday afternoon." },
        { q: "What did Ibn Mas'ud add after quoting him ﷺ?", a: "Or close to that, or similar", wrong: ["Or exactly these words", "Or in a louder voice", "Or ask someone else"], why: "Or more than that, or less than that, or close to that, Ibn Mas'ud said." },
        { q: "Ibn Mas'ud's eyes filled with tears when he quoted him ﷺ.", tf: true, why: "His eyes were filled with tears and his veins were bulging, Amr ibn Maimun said." }
      ]
    },
    {
      slug: "or-as-he-said",
      title: "Or as he ﷺ said",
      line: "After each hadith, Anas would add: or as he ﷺ said.",
      facts: ["Told by Muhammad ibn Sirin", "Anas ibn Malik said it after every hadith", "A way to be careful with his ﷺ words"],
      source: hadith("ibnmajah", "24", "Muhammad ibn Sirin", "Sahih (Al-Albani)", "Muhammad ibn Sirin said: whenever Anas ibn Malik finished narrating a hadith from the Messenger of Allah ﷺ, he would say: or as the Messenger of Allah ﷺ said.", "Whenever Anas bin Malik finished narrating a Hadith from the Messenger of Allah"),
      difficulty: 1,
      questions: [
        { q: "What would Anas say after narrating a hadith?", a: "Or as he ﷺ said", wrong: ["That is all I know", "Write that down", "Go and rest now"], why: "Whenever Anas finished a hadith, he would say: or as the Messenger of Allah ﷺ said." },
        { q: "When would Anas add: or as he ﷺ said?", a: "Whenever he finished a hadith", wrong: ["Only on Fridays", "Only when he was ill", "Only in the masjid"], why: "Whenever Anas finished narrating a hadith, he would say it, Muhammad ibn Sirin said." },
        { q: "Anas was careful when he passed on the words of the Messenger ﷺ.", tf: true, why: "Whenever Anas finished narrating a hadith, he would say: or as he ﷺ said." }
      ]
    },
    {
      slug: "we-have-grown-old",
      title: "We have grown old",
      line: "Asked for a hadith, Zaid ibn Arqam said: we have grown old.",
      facts: ["Told by Abdur-Rahman ibn Abi Laila", "Zaid ibn Arqam was asked for a hadith", "Passing on his ﷺ words is a weighty matter"],
      source: hadith("ibnmajah", "25", "Abdur-Rahman ibn Abi Laila", "Sahih (Al-Albani)", "Abdur-Rahman ibn Abi Laila said: we said to Zaid ibn Arqam: tell us a hadith from the Messenger of Allah ﷺ. He said: we have grown old and forgotten, and narrating from the Messenger of Allah ﷺ is a weighty matter.", "We have grown old and have forgotten"),
      difficulty: 1,
      questions: [
        { q: "Why did Zaid ibn Arqam hold back from narrating?", a: "He had grown old and forgotten", wrong: ["He had never met him ﷺ", "He was on a journey", "He did not know Arabic"], why: "We have grown old and have forgotten, Zaid ibn Arqam said." },
        { q: "What is narrating his ﷺ words, Zaid ibn Arqam said?", a: "Something difficult", wrong: ["Something easy", "Something small", "Something for fun"], why: "Narrating Ahadith from the Messenger of Allah ﷺ is difficult, Zaid ibn Arqam said." },
        { q: "Zaid ibn Arqam said narrating his ﷺ words is easy.", tf: false, why: "No. Narrating Ahadith from the Messenger of Allah ﷺ is difficult, Zaid ibn Arqam said." }
      ]
    },
    {
      slug: "think-the-best-of-him",
      title: "Think the best of him ﷺ",
      line: "Ali said: think of him ﷺ as the best and most guided.",
      facts: ["Told by Ali ibn Abi Talib", "Said when he narrated a hadith", "Taqwa: being mindful of Allah"],
      source: hadith("ibnmajah", "20", "Ali ibn Abi Talib", "Sahih (Al-Albani)", "Ali ibn Abi Talib said: when I narrate to you a hadith from the Messenger of Allah ﷺ, think of him in the best way: the most rightly guided and the one with the most taqwa.", "then think of him as being the best, the most rightly guided and the one with the utmost Taqwa"),
      difficulty: 1,
      questions: [
        { q: "When did Ali say to think the best of him ﷺ?", a: "When he narrated a hadith to them", wrong: ["When they ate a meal", "When they set out to travel", "When it rained heavily"], why: "When I narrate a Hadith from him ﷺ to you, think of him as the best, Ali said." },
        { q: "What does taqwa mean?", a: "Being mindful of Allah always", wrong: ["Being rich in wealth", "Being strong in body", "Being known by people"], why: "Taqwa is being mindful of Allah; Ali said he ﷺ had the utmost taqwa." },
        { q: "Ali said he ﷺ was the most rightly guided.", tf: true, why: "Think of him as being the best, the most rightly guided, Ali said." }
      ]
    },
    {
      slug: "memorized-with-care",
      title: "Memorized with care",
      line: "We memorized hadith from him ﷺ, Ibn Abbas said.",
      facts: ["Told by Tawus", "Ibn Abbas memorized hadith from him ﷺ", "Careless narrating cannot be trusted"],
      source: hadith("ibnmajah", "27", "Tawus", "Sahih (Al-Albani)", "Tawus said: I heard Ibn Abbas say: we used to memorize hadith, and hadith were memorized from the Messenger of Allah ﷺ. But when you go to extremes, careless or exaggerating, there is no way we can trust your hadith.", "We used to memorize Ahadith, and Ahadith were memorized from the Messenger of Allah"),
      difficulty: 2,
      questions: [
        { q: "How did they keep his ﷺ hadith, Ibn Abbas said?", a: "By memorizing them", wrong: ["By carving them on rocks", "By painting them on walls", "By singing them as poems"], why: "We used to memorize Ahadith from the Messenger of Allah ﷺ, Ibn Abbas said." },
        { q: "Whose hadith did Ibn Abbas say cannot be trusted?", a: "Those who are careless in narrating", wrong: ["Those who narrate slowly", "Those who narrate at night", "Those who narrate in a masjid"], why: "Exaggeration or negligence in narrating; there is no way we can trust it, Ibn Abbas said." },
        { q: "Ibn Abbas said careless narrating can be trusted.", tf: false, why: "No. If you go to extremes of exaggeration or negligence, we cannot trust your Ahadith." }
      ]
    }
  ]
};

export const SAHABA_CAREFUL_UNITS: readonly DeepUnit[] = [CAREFUL];
