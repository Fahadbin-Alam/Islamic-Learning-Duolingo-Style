import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: easy words with big rewards, from Jami at-Tirmidhi and Sunan Ibn Majah. A du'a for debts, a
// thousand good deeds for a hundred tasbih, praise after food, three phrases that pardon sins, what he ﷺ whispered
// about in prayer, and asking simply for Paradise. Every card is one sahih or hasan hadith with its number, narrator
// and grade, and its exact English words to highlight. None of these hadith is taught anywhere else in the app.

const EASY_WORDS: DeepUnit = {
  key: "duas-easy-words",
  topicId: "duas",
  branchId: "duas-easy-words",
  branch: { title: "Easy words, big rewards", description: "A du'a for debts, a thousand good deeds, praise after food, three phrases that pardon sins, what he ﷺ whispered about, and asking simply." },
  name: "easy words with big rewards",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-dua-for-debts",
      title: "A du'a for debts",
      line: "With this du'a, Allah pays even a mountain of debt.",
      facts: ["Told by Ali ibn Abi Talib", "A mukatib asked him for help", "A mukatib is a slave buying his freedom"],
      source: hadith("tirmidhi", "3563", "Ali ibn Abi Talib", "Hasan (Al-Albani)", "A mukatib, a slave paying to buy his freedom, came to Ali and said: I cannot pay what I owe, so help me. Ali said: shall I not teach you words the Messenger of Allah ﷺ taught me? Even if you had a debt like a mountain, Allah would pay it for you. Say: O Allah, make what You made lawful enough for me, so I need nothing You made unlawful, and by Your grace make me need no one but You.", "O Allah, suffice me with Your lawful against Your prohibited, and make me independent of all those besides You"),
      difficulty: 2,
      questions: [
        { q: "Who came to Ali asking for help?", a: "A slave buying his freedom", wrong: ["A trader who lost his goods", "A farmer whose crops failed", "A traveler who lost his camel"], why: "A mukatib came and said: I am not able to pay my contract, so help me, Ali said." },
        { q: "What does the du'a ask Allah to make enough for us?", a: "What He made lawful", wrong: ["What belongs to others", "What we find by chance", "What we take by force"], why: "O Allah, suffice me with Your lawful against Your prohibited, the du'a begins." },
        { q: "In this du'a, we ask Allah to make us need no one but Him.", tf: true, why: "Make me independent of all those besides You, the du'a says." }
      ]
    },
    {
      slug: "a-thousand-good-deeds",
      title: "A thousand good deeds",
      line: "A hundred tasbih bring a thousand good deeds, he ﷺ said.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "Tasbih is saying Subhan Allah", "He ﷺ asked: is anyone unable to earn it?"],
      source: hadith("tirmidhi", "3463", "Sa'd ibn Abi Waqqas", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ asked those sitting with him: is one of you unable to earn a thousand good deeds? Someone asked: how can one of us earn a thousand good deeds? He said: when one of you says a hundred tasbih, a thousand good deeds are written for him, and a thousand bad deeds are wiped away from him.", "a thousand good deeds are written for him, and a thousand evil deeds are wiped away from him"),
      difficulty: 1,
      questions: [
        { q: "How many good deeds are written for a hundred tasbih?", a: "A thousand good deeds", wrong: ["Ten good deeds", "Seventy good deeds", "Forty good deeds"], why: "When one of you recites a hundred tasbih, a thousand good deeds are written for him." },
        { q: "Who asked how one could earn them?", a: "A man sitting with him", wrong: ["A king from far away", "A trader in the market", "A shepherd on a hill"], why: "One of those seated with him asked how they could earn them, and he ﷺ told them." },
        { q: "He ﷺ asked if anyone was unable to earn a thousand good deeds.", tf: true, why: "Is one of you unable to earn a thousand good deeds, he ﷺ asked those with him." }
      ]
    },
    {
      slug: "allah-fed-me-this",
      title: "Allah fed me this",
      line: "Praise Allah after eating, and your past sins are forgiven.",
      facts: ["Told by Mu'adh ibn Anas", "Al-hamdu lillahil-ladhi at'amani hadha", "Food comes from Allah, not our own power"],
      source: hadith("tirmidhi", "3458", "Mu'adh ibn Anas", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: whoever eats food and then says: all praise is for Allah, who fed me this and gave it to me as provision, without any effort or power from me, his past sins are forgiven.", "All praise is due to Allah who fed me this and granted it as provision to me, without any effort from me nor power"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ say to praise Allah with these words?", a: "After eating food", wrong: ["Before going to sleep", "On waking up", "On leaving home"], why: "Whoever eats food and then says it, his past sins are forgiven, he ﷺ said." },
        { q: "How did we get our food, the du'a says?", a: "Allah gave it, not our own power", wrong: ["We earned it by our strength", "A king gave it to us", "We found it by chance"], why: "Who fed me this and granted it to me, without any effort from me nor power." },
        { q: "His past sins are forgiven for saying it after food.", tf: true, why: "His past sins shall be forgiven, he ﷺ said of the one who says it after eating." }
      ]
    },
    {
      slug: "three-phrases-sins-pardoned",
      title: "Three phrases, sins pardoned",
      line: "Anyone on earth who says these words has his sins pardoned.",
      facts: ["Told by Abdullah ibn Amr", "La ilaha illallah, wa Allahu akbar", "Wa la hawla wa la quwwata illa billah"],
      source: hadith("tirmidhi", "3460", "Abdullah ibn Amr", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: there is no one on earth who says: none has the right to be worshipped but Allah, Allah is the Greatest, and there is no might nor power except by Allah, except that his sins are pardoned, even if they were like the foam of the sea.", "except that his sins shall be pardoned, even if they were like the foam of the sea"),
      difficulty: 2,
      questions: [
        { q: "Who can have sins pardoned by saying these words?", a: "Anyone on earth who says them", wrong: ["Only the scholars", "Only the elderly", "Only those in Makkah"], why: "There is not anyone upon the earth who says them but his sins are pardoned, he ﷺ said." },
        { q: "Which words begin this dhikr?", a: "La ilaha illallah", wrong: ["Subhan Allah", "Alhamdulillah", "Astaghfirullah"], why: "None has the right to be worshipped but Allah, La ilaha illallah, comes first." },
        { q: "These words include Allahu akbar, Allah is the Greatest.", tf: true, why: "The words are La ilaha illallah, wa Allahu akbar, wa la hawla wa la quwwata illa billah." }
      ]
    },
    {
      slug: "what-we-whisper-about",
      title: "What we whisper about",
      line: "His ﷺ quiet du'as were about Paradise and the Fire.",
      facts: ["Told by Abu Hurairah", "The man asked for Paradise and refuge from Hell", "He could not follow their quiet words"],
      source: hadith("ibnmajah", "3847", "Abu Hurairah", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ asked a man: what do you say in your prayer? He said: I recite the tashahhud, then I ask Allah for Paradise and seek refuge with Him from Hell, but by Allah, I do not understand your whispering or the whispering of Mu'adh. He ﷺ said: it is about them, Paradise and Hell, that we whisper.", "but by Allah I do not understand your whispering"),
      difficulty: 2,
      questions: [
        { q: "What did the man ask Allah for after the tashahhud?", a: "Paradise", wrong: ["Gold", "A long life", "Many children"], why: "I ask Allah for Paradise and seek refuge with Him from Hell, the man said." },
        { q: "What did he ﷺ say his quiet du'as were about?", a: "Paradise and the Fire", wrong: ["Wealth and trade", "Homes and land", "Fame and power"], why: "It is concerning them, Paradise and Hell, that we are whispering, he ﷺ said." },
        { q: "Asking for Paradise and refuge from the Fire is a fine du'a.", tf: true, why: "The man asked only for these, and he ﷺ said their own du'as were about them too." }
      ]
    },
    {
      slug: "ask-simply-for-paradise",
      title: "Ask simply for Paradise",
      line: "Ask Allah for Paradise, and do not go too far in du'a.",
      facts: ["Told by Abdullah ibn Mughaffal", "His son asked for a white palace", "Some people will go too far in du'a"],
      source: hadith("ibnmajah", "3864", "Abdullah ibn Mughaffal", "Sahih (Al-Albani)", "Abdullah ibn Mughaffal heard his son say: O Allah, I ask You for the white palace on the right side of Paradise when I enter it. He said: my son, ask Allah for Paradise and seek refuge with Him from Hell, for I heard the Messenger of Allah ﷺ say: there will be people who go too far in supplication.", "There will be people who will transgress in supplication"),
      difficulty: 2,
      questions: [
        { q: "What did the son ask for in his du'a?", a: "A white palace in Paradise", wrong: ["A grand house in town", "A fast horse", "A tall palm tree"], why: "O Allah, I ask You for the white palace on the right side of Paradise, he said." },
        { q: "What did his father tell him to ask for instead?", a: "Paradise, and refuge from the Fire", wrong: ["Wealth, and a long life", "Fame, and many friends", "Power, and a big house"], why: "O my son, ask Allah for Paradise and seek refuge with Him from Hell, Abdullah said." },
        { q: "He ﷺ said some people will go too far in du'a.", tf: true, why: "There will be people who will transgress in supplication, he ﷺ said." }
      ]
    }
  ]
};

export const DUA_EASY_WORDS_UNITS: readonly DeepUnit[] = [EASY_WORDS];
