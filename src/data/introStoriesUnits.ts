import { hadith, type DeepUnit } from "./deepKit";

// One more unit for people new to Islam: how the first Muslims came to Islam, from Sahih Muslim, Sunan Abi Dawud,
// Sunan an-Nasa'i and Sahih al-Bukhari. Dimad heard his ﷺ words three times, Amr ibn Abasah went looking for the
// truth, Islam was cast into Abu Rafi's heart, Umm Sulaym asked for Islam as her mahr, a man in armour did little and
// was rewarded much, and a man who came for a gift found Islam dearer than the world. Every card is one sahih hadith
// with its number, narrator and grade, and its exact English words to highlight, and none of them is taught anywhere
// else in the app.

const STORIES: DeepUnit = {
  key: "how-they-came-to-islam",
  topicId: "intro",
  branchId: "intro-how-they-came-to-islam",
  branch: { title: "How they came to Islam", description: "Words like no other, a free man and a slave, Islam cast into a heart, a mahr of Islam, a little work with a great reward, and dearer than the world." },
  name: "coming to Islam",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "words-like-no-other",
      title: "Words like no other",
      line: "Dimad heard his ﷺ words three times, then became Muslim.",
      facts: ["Told by Ibn Abbas", "Dimad, of the tribe of Azd, treated the sick with ruqyah", "He ﷺ began: praise is for Allah"],
      source: hadith("muslim", "868", "Ibn Abbas", "Sahih", "Ibn Abbas said: Dimad, of the tribe of Azd, came to Makkah; he used to treat people with ruqyah. He heard foolish people of Makkah claim that Muhammad ﷺ was under a spell, so he offered to treat him. He ﷺ said: praise is for Allah; we praise Him and ask His help. Whomever Allah guides, no one can lead astray, and whomever He leaves astray, no one can guide. I bear witness that there is no god but Allah, alone with no partner, and that Muhammad is His servant and messenger. Dimad said: say these words to me again, and he ﷺ said them three times. Dimad said: I have heard soothsayers, magicians and poets, but never words like yours; give me your hand, so I may pledge myself to Islam.", "I have heard the words of soothsayers and the words of magicians, and the words of poets, but I have never heard such words as yours"),
      difficulty: 2,
      questions: [
        { q: "How many times did he ﷺ say the words to Dimad?", a: "Three times", wrong: ["Once", "Five times", "Seven times"], why: "Say these words to me again, Dimad asked, and he ﷺ said them three times." },
        { q: "Whose words did Dimad say he had heard before?", a: "Soothsayers, magicians and poets", wrong: ["Kings, judges and generals", "Farmers, sailors and builders", "Doctors, traders and guards"], why: "I have heard soothsayers, magicians and poets, but never words like yours, Dimad said." },
        { q: "Dimad became Muslim after hearing these words.", tf: true, why: "Give me your hand so I may pledge myself to Islam, Dimad said, and he pledged." }
      ]
    },
    {
      slug: "a-free-man-and-a-slave",
      title: "A free man and a slave",
      line: "Amr ibn Abasah saw idol worship was wrong and sought him ﷺ.",
      facts: ["Told by Amr ibn Abasah", "With him then: Abu Bakr and Bilal", "He ﷺ said: go home now, and come back later"],
      source: hadith("muslim", "832", "Amr ibn Abasah", "Sahih", "Amr ibn Abasah said: before Islam I felt that people were astray, worshipping idols. I heard of a man in Makkah who was giving news, so I rode to him. I asked: who are you? He ﷺ said: a prophet; Allah has sent me. I asked: with what? He ﷺ said: to join the ties of kinship, to break the idols, and to declare Allah One, with nothing joined to Him. I asked: who is with you in this? He ﷺ said: a free man and a slave; Abu Bakr and Bilal were with him then. I said: I will follow you. He ﷺ said: you cannot do that now; go back to your people, and when you hear that I have won, come to me.", "to break the Idols, and to proclaim the oneness of Allah"),
      difficulty: 2,
      questions: [
        { q: "What was he ﷺ sent with, he told Amr?", a: "Family ties and Allah's oneness", wrong: ["Building towers and palaces", "Winning gold and land", "Taxes and tolls"], why: "To join the ties of kinship; to break the idols and declare Allah One, he ﷺ told Amr." },
        { q: "Who did he ﷺ say was with him then?", a: "A free man and a slave", wrong: ["A king and his army", "A rich tribe", "Many traders"], why: "Who is with you in this? A free man and a slave, he ﷺ told Amr." },
        { q: "He ﷺ told Amr to go home first and come back later.", tf: true, why: "Go back to your people, and when you hear I have won, come to me, he ﷺ told Amr." }
      ]
    },
    {
      slug: "cast-into-his-heart",
      title: "Cast into his heart",
      line: "Abu Rafi' saw him ﷺ, and Islam entered his heart.",
      facts: ["Told by Abu Rafi'", "Quraysh had sent him with a message", "He ﷺ said: I do not break a covenant"],
      source: hadith("abudawud", "2758", "Abu Rafi'", "Sahih (Al-Albani)", "Abu Rafi' said: Quraysh sent me to the Messenger of Allah ﷺ. When I saw him, Islam was cast into my heart, and I said: O Messenger of Allah, by Allah, I will never go back to them. He ﷺ said: I do not break a covenant, nor do I keep messengers. Go back, and if you still feel as you do now, come back. So I went, then came to the Prophet ﷺ and became Muslim.", "Islam was cast into my heart, so I said: Messenger of Allah, I swear by Allah, I shall never return to them"),
      difficulty: 2,
      questions: [
        { q: "Who had sent Abu Rafi' to him ﷺ?", a: "Quraysh", wrong: ["The Romans", "The Persians", "The people of Yemen"], why: "Quraysh sent me to the Messenger of Allah ﷺ, Abu Rafi' said." },
        { q: "Why did he ﷺ send Abu Rafi' back at first?", a: "He never broke a covenant", wrong: ["The road was closed", "It was the month of Hajj", "Abu Rafi' was ill"], why: "I do not break a covenant or keep messengers, he ﷺ said; go back, then come." },
        { q: "Abu Rafi' never came back to the Prophet ﷺ.", tf: false, why: "No. He went home, then came back to the Prophet ﷺ and became Muslim, Abu Rafi' said." }
      ]
    },
    {
      slug: "a-mahr-of-islam",
      title: "A mahr of Islam",
      line: "Umm Sulaym asked for no mahr but Abu Talhah's Islam.",
      facts: ["Told by Anas, her son", "Mahr: the gift a groom gives his bride", "Thabit: no mahr was ever more precious"],
      source: hadith("nasai", "3341", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: Abu Talhah asked to marry Umm Sulaym. She said: by Allah, a man like you is not turned down, O Abu Talhah, but you do not believe and I am a Muslim, and I may not marry you. If you become Muslim, that will be my mahr, and I will ask you for nothing else. So he became Muslim, and that was her mahr. Thabit said: I never heard of a woman whose mahr was more precious than Umm Sulaym's: Islam.", "If you become Muslim, that will be my dowry, and I will not ask you for anything else"),
      difficulty: 1,
      questions: [
        { q: "What did Umm Sulaym ask for as her mahr?", a: "That he become Muslim", wrong: ["A garden of dates", "A hundred camels", "A house of stone"], why: "If you become Muslim, that will be my mahr, Umm Sulaym told Abu Talhah." },
        { q: "What did Thabit say about her mahr?", a: "None was ever more precious", wrong: ["The most gold ever paid", "It was paid in camels", "It was paid years later"], why: "I never heard of a woman whose mahr was more precious than Islam, Thabit said." },
        { q: "Abu Talhah became Muslim, and that was her mahr.", tf: true, why: "So he became Muslim, and that was her mahr, Anas said." }
      ]
    },
    {
      slug: "a-little-work-a-great-reward",
      title: "A little work, a great reward",
      line: "He became Muslim first; his deeds were few, his reward great.",
      facts: ["Told by Al-Bara ibn Azib", "He came covered in iron armour", "He ﷺ said: become Muslim first"],
      source: hadith("bukhari", "2808", "Al-Bara ibn Azib", "Sahih", "Al-Bara said: a man covered in iron armour came to the Prophet ﷺ and asked: O Messenger of Allah, shall I fight, or become Muslim first? He ﷺ said: become Muslim, then fight. So he became Muslim, fought and was martyred. The Messenger of Allah ﷺ said: he did little, but he is rewarded much.", "A Little work, but a great reward"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell the man to do first?", a: "Become Muslim first", wrong: ["Go home first", "Sell the armour first", "Wait a full year"], why: "Embrace Islam first, and then fight, he ﷺ told the man in armour." },
        { q: "What was the man wearing when he came?", a: "Iron armour over his face", wrong: ["A white turban", "A silk robe", "A shepherd's cloak"], why: "A man whose face was covered with an iron mask came to the Prophet ﷺ, Al-Bara said." },
        { q: "A short time of good deeds can earn a great reward.", tf: true, why: "A little work, but a great reward, he ﷺ said of the man." }
      ]
    },
    {
      slug: "dearer-than-the-world",
      title: "Islam, dearer than the world",
      line: "A man came for a gift; Islam became dearer than the world.",
      facts: ["Told by Anas ibn Malik", "He ﷺ gave the man a huge flock of sheep", "The man told his people: become Muslim"],
      source: hadith("muslim", "2312b", "Anas ibn Malik", "Sahih", "Anas said: a man asked the Messenger of Allah ﷺ for a very large flock of sheep, and he gave it to him. The man went back to his people and said: my people, become Muslim, for by Allah, Muhammad gives like one who has no fear of being poor. Anas said: a man would become Muslim only for the world, then before long Islam would be dearer to him than the world and all it holds.", "Islam became dearer to him than the world and what it contains"),
      difficulty: 1,
      questions: [
        { q: "What did the man ask his people to do?", a: "That they become Muslim", wrong: ["That they move to Madinah", "That they sell the sheep", "That they dig a well"], why: "My people, embrace Islam, for Muhammad gives like one who has no fear of want, he said." },
        { q: "What did Islam become for such a man, Anas said?", a: "Dearer to him than the world", wrong: ["A way to get rich", "A hard duty", "A passing interest"], why: "Islam became dearer to him than the world and what it contains, Anas said." },
        { q: "Islam can only grow dear to those born Muslim.", tf: false, why: "No. A man came for the world, then Islam grew dearer to him than the world, Anas said." }
      ]
    }
  ]
};

export const INTRO_STORIES_UNITS: DeepUnit[] = [STORIES];
