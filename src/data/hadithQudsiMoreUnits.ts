import { hadith, type DeepUnit } from "./deepKit";

// A second hadith qudsi unit for the Hadith path, from Sahih al-Bukhari, Sunan Abi Dawud, Sahih Muslim and Jami
// at-Tirmidhi: words the Prophet ﷺ told from his Lord. Angels who look for people remembering Allah, the shepherd
// whose lone adhan on a mountain pleases Allah, Paradise for patience when a loved one dies, "I was sick and you did
// not visit Me", making time for worship, and the much easier thing Allah asked of us: to worship none but Him. Every
// card is one sahih hadith with its number, narrator and grade, and its exact English words to highlight, and none
// of these hadith is taught anywhere else in the app.

const QUDSI_MORE: DeepUnit = {
  key: "hadith-qudsi-more",
  topicId: "hadith",
  branchId: "hadith-qudsi-more",
  branch: { title: "Allah says: more hadith qudsi", description: "Angels who seek dhikr, a shepherd's adhan, Paradise for patience, I was sick, time for worship, and something much easier." },
  name: "Allah's words to His servants",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "angels-who-seek-dhikr",
      title: "Angels who seek dhikr",
      line: "Angels go looking for people who remember Allah.",
      facts: ["Told by Abu Hurairah", "They circle the gathering up to the sky", "Allah says: I have forgiven them"],
      source: hadith("bukhari", "6408", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: Allah has angels who go about the roads looking for people who remember Allah. When they find them, they call each other and surround them with their wings up to the sky. Their Lord asks them, though He knows better: what do My servants say? They say: they glorify You, say Allahu Akbar and praise You. They ask You for Paradise and seek refuge with You from the Fire. Allah says: I make you witnesses that I have forgiven them.", "I make you witnesses that I have forgiven them"),
      difficulty: 1,
      questions: [
        { q: "What are some angels always looking for?", a: "People remembering Allah", wrong: ["People asleep at night", "People in the market", "People counting money"], why: "Allah has angels who look for those who celebrate His praises on the roads, he ﷺ said." },
        { q: "What does Allah say to the angels at the end?", a: "I have forgiven them", wrong: ["Count them again", "Wait one more day", "Go to another place"], why: "I make you witnesses that I have forgiven them, Allah says to His angels." },
        { q: "Allah asks the angels, though He knows better than them.", tf: true, why: "Their Lord asks them what His servants say, though He knows best, he ﷺ said." }
      ]
    },
    {
      slug: "the-shepherd-on-the-mountain",
      title: "The shepherd on the mountain",
      line: "A shepherd's adhan alone on a mountain pleases Allah.",
      facts: ["Told by Uqbah ibn Amir", "He calls the adhan, then prays", "Allah forgives him and admits him to Paradise"],
      source: hadith("abudawud", "1203", "Uqbah ibn Amir", "Sahih (Al-Albani)", "Uqbah ibn Amir said: I heard the Messenger of Allah ﷺ say: Allah is pleased with a shepherd of goats who calls the adhan on the peak of a mountain and prays. Allah says: look at this servant of Mine; he calls the adhan and prays, and he fears Me. So I forgive him and admit him to Paradise.", "Look at this servant of Mine; he calls to prayer and offers it and he fears Me"),
      difficulty: 1,
      questions: [
        { q: "Where was the shepherd when he called the adhan?", a: "On the peak of a mountain", wrong: ["In a crowded city", "On a ship at sea", "Inside a palace"], why: "A shepherd of goats who calls to prayer at the peak of a mountain, he ﷺ said." },
        { q: "What does Allah do for the shepherd?", a: "Forgives him and admits him to Paradise", wrong: ["Gives him more goats", "Makes him a king", "Sends him to the city"], why: "So I forgive him and admit him to paradise, Allah says of the shepherd." },
        { q: "Allah sees our prayers even when no one else is around.", tf: true, why: "Look at this servant of Mine: alone on a mountain, he calls the adhan and prays." }
      ]
    },
    {
      slug: "paradise-for-patience",
      title: "Patient when a loved one dies",
      line: "Allah's reward for patience when a loved one dies: Paradise.",
      facts: ["Told by Abu Hurairah", "Safiy: someone dearly loved", "Patient, and hoping for Allah's reward"],
      source: hadith("bukhari", "6424", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: Allah says: I have nothing to give but Paradise as a reward to My believing servant who, when I take his dearly loved one from the people of this world, stays patient and hopes for My reward.", "I have nothing to give but Paradise as a reward to my believer slave"),
      difficulty: 2,
      questions: [
        { q: "What is Allah's reward for the believer who stays patient?", a: "Paradise", wrong: ["A long life", "Great wealth", "Fame among people"], why: "I have nothing to give but Paradise as a reward to My believing servant, Allah says." },
        { q: "What does the believer do when a loved one dies?", a: "Stays patient, hoping for reward", wrong: ["Wails and tears his clothes", "Stops praying", "Gives up hope"], why: "He remains patient and hopes for Allah's reward, and Paradise is his reward." },
        { q: "Patience when we lose someone we love has a great reward.", tf: true, why: "Allah has nothing to give such a patient believer but Paradise." }
      ]
    },
    {
      slug: "i-was-sick",
      title: "I was sick, and you did not visit",
      line: "Allah will ask why we did not visit His sick servant.",
      facts: ["Told by Abu Hurairah", "The servant asks: how, when You are Lord of the worlds?", "Allah will also ask about feeding and giving drink"],
      source: hadith("muslim", "2569", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: Allah will say on the Day of Resurrection: O son of Adam, I was sick and you did not visit Me. He will say: my Lord, how could I visit You when You are the Lord of the worlds? Allah will say: did you not know that My servant so-and-so was sick and you did not visit him? Had you visited him, you would have found Me with him. Allah will ask the same about food and drink a servant asked for and was not given.", "O son of Adam, I was sick but you did not visit Me"),
      difficulty: 2,
      questions: [
        { q: "Who was really sick, Allah explains?", a: "A servant of His", wrong: ["One of the angels", "Nobody was sick", "A mighty king"], why: "Did you not know that such and such servant of Mine was sick? Allah will say." },
        { q: "Besides visiting the sick, what else will Allah ask about?", a: "Feeding and giving drink", wrong: ["Building tall houses", "Winning races", "Buying new clothes"], why: "O son of Adam, I asked food from you and you did not feed Me, Allah will say." },
        { q: "Allah Himself can never be sick or hungry.", tf: true, why: "He is the Lord of the worlds; it was His servant who was sick and hungry." }
      ]
    },
    {
      slug: "make-time-for-worship",
      title: "Make time for worship",
      line: "Give time to worship, and Allah fills your heart with riches.",
      facts: ["Told by Abu Hurairah", "Allah also takes away your poverty", "Turn from worship, and your hands stay busy"],
      source: hadith("tirmidhi", "2466", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: Allah Most High says: O son of Adam, devote yourself to My worship, and I will fill your chest with riches and remove your poverty. If you do not, I will fill your hands with busy work and not remove your poverty.", "Devote yourself to My worship, I will fill your chest with riches and alleviate your poverty"),
      difficulty: 2,
      questions: [
        { q: "What does Allah promise one who makes time for His worship?", a: "A heart full of riches", wrong: ["More gold and silver", "Fame in the land", "A faster horse"], why: "I will fill your chest with riches and alleviate your poverty, Allah says." },
        { q: "What happens to one who will not make that time?", a: "Busy hands, still in need", wrong: ["Riches and rest", "A long holiday", "Nothing at all"], why: "I will fill your hands with work and not remove your poverty, Allah says." },
        { q: "Time given to worship is time lost from our life.", tf: false, why: "No. Devote yourself to My worship, and I will fill your chest with riches, Allah says." }
      ]
    },
    {
      slug: "something-much-easier",
      title: "Something much easier",
      line: "Allah asked for something easy: worship none but Him.",
      facts: ["Told by Anas ibn Malik", "Even the whole earth could not buy him free", "Shirk: worshipping others besides Allah"],
      source: hadith("bukhari", "6557", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: the Prophet ﷺ said: Allah will say to the one with the least punishment in the Fire on the Day of Resurrection: if you had all that is on the earth, would you give it to ransom yourself? He will say: yes. Allah will say: I asked you for something much easier than this while you were in the backbone of Adam: not to worship others besides Me, but you refused.", "I asked you a much easier thing than this while you were in the backbone of Adam"),
      difficulty: 3,
      questions: [
        { q: "What would the man give to be saved from the Fire?", a: "All that is on the earth", wrong: ["Only one coin", "Nothing at all", "Half a date"], why: "If you had all that is on the earth, would you ransom yourself? He will say: yes." },
        { q: "What much easier thing had Allah asked of him?", a: "To worship none but Him", wrong: ["To build a big masjid", "To fast all his life", "To travel far away"], why: "Not to worship others besides Me, Allah will say, but you refused." },
        { q: "Allah asks every person to worship Him alone.", tf: true, why: "Allah asked it of us while we were still in the backbone of Adam, he ﷺ said." }
      ]
    }
  ]
};

export const HADITH_QUDSI_MORE_UNITS: readonly DeepUnit[] = [QUDSI_MORE];
