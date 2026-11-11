import { hadith, type DeepUnit } from "./deepKit";

// One more unit for the Day of Judgment topic: hoping for Paradise, from Sahih al-Bukhari, Jami' at-Tirmidhi and
// Sunan Ibn Majah. A man who asks to farm in Paradise, Harithah in the highest Firdaws, a tent of one hollow pearl,
// a fingernail's worth of its beauty, asking for it three times, and where to look for him ﷺ on that Day. Every card
// is one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight, and
// none of them is taught anywhere else in the app.

const HOPE: DeepUnit = {
  key: "akhirah-hoping-paradise",
  topicId: "akhirah",
  branchId: "akhirah-hoping-paradise",
  branch: { title: "Hoping for Paradise", description: "A farmer in Paradise, Harithah in Firdaws, a tent of one pearl, a fingernail of its beauty, asking three times, and where to find him ﷺ." },
  name: "hoping for Paradise",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-farmer-of-paradise",
      title: "The farmer of Paradise",
      line: "A man in Paradise will ask Allah to let him farm.",
      facts: ["Told by Abu Hurairah", "His crops will ripen within seconds", "A bedouin's words made him ﷺ smile"],
      source: hadith("bukhari", "7519", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ was speaking while a bedouin sat there. He said: a man of the people of Paradise will ask Allah to let him farm the land. Allah will say to him: do you not have all that you wish for? He will say: yes, but I love to farm. He will sow the seeds, and within seconds the plants will grow and ripen, and be harvested and piled up like mountains. Allah will say: take it, O son of Adam, for nothing fills you. The bedouin said: O Messenger of Allah, that man must be from Quraysh or the Ansar, for they are farmers and we are not. And the Messenger of Allah ﷺ smiled.", "will request Allah to allow him to cultivate the land"),
      difficulty: 1,
      questions: [
        { q: "What will the man in Paradise ask Allah to let him do?", a: "Farm the land", wrong: ["Herd camels", "Sail the sea", "Climb a mountain"], why: "He will request Allah to allow him to cultivate the land, he ﷺ said." },
        { q: "How fast will his crops grow and ripen?", a: "Within seconds", wrong: ["In one year", "In seven days", "In forty days"], why: "Within seconds the plants will grow and ripen, and be piled up like mountains." },
        { q: "The bedouin said such a man must be from Quraysh or the Ansar.", tf: true, why: "They are farmers while we are not, the bedouin said, and he ﷺ smiled." }
      ]
    },
    {
      slug: "harithah-in-firdaws",
      title: "Harithah in Firdaws",
      line: "Harithah died a martyr at Badr; he is in the highest Firdaws.",
      facts: ["Told by Anas ibn Malik", "An arrow from an unknown thrower struck him", "Paradise has many gardens"],
      source: hadith("bukhari", "2809", "Anas ibn Malik", "Sahih", "Anas said: the mother of Harithah ibn Suraqah came to the Prophet ﷺ. Harithah had been killed at Badr by an arrow from a thrower no one knew. She said: O Prophet of Allah, will you tell me about Harithah? If he is in Paradise, I will be patient; if not, I will weep hard for him. He ﷺ said: O mother of Harithah, there are many gardens in Paradise, and your son has reached Al-Firdaws al-A'la, the highest place in Paradise.", "There are Gardens in Paradise and your son got the Firdaus al-ala"),
      difficulty: 1,
      questions: [
        { q: "At which battle was Harithah martyred?", a: "Badr", wrong: ["Uhud", "Khaybar", "Hunayn"], why: "Harithah was martyred on the day of Badr by an arrow from an unknown thrower." },
        { q: "What did Harithah's mother want to know?", a: "If he was in Paradise", wrong: ["Who threw the arrow", "Where he was buried", "When the battle ended"], why: "If he is in Paradise, I will be patient; otherwise, I will weep bitterly, she said." },
        { q: "Paradise has only one garden.", tf: false, why: "No. There are many gardens in Paradise, he ﷺ told the mother of Harithah." }
      ]
    },
    {
      slug: "a-tent-of-one-pearl",
      title: "A tent of one pearl",
      line: "In Paradise, a believer's tent is one hollow pearl.",
      facts: ["Told by Abu Musa al-Ash'ari", "Thirty miles high, he ﷺ said", "Sixty miles, in another report"],
      source: hadith("bukhari", "3243", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa, Abdullah ibn Qais al-Ash'ari, said: the Prophet ﷺ said: a tent in Paradise is like a hollow pearl, thirty miles high, and in every corner of it the believer has a family that the others do not see. In another report: the tent is sixty miles high.", "is like a hollow pearl which is thirty miles in height"),
      difficulty: 1,
      questions: [
        { q: "What is a believer's tent in Paradise like, he ﷺ said?", a: "A hollow pearl", wrong: ["A tent of wool", "A tent of leather", "A hut of palm leaves"], why: "A tent in Paradise is like a hollow pearl, thirty miles in height, he ﷺ said." },
        { q: "How big is the pearl tent?", a: "Many miles high", wrong: ["As tall as a palm tree", "As tall as a man", "As tall as a house"], why: "The tent is thirty miles in height, he ﷺ said; sixty, in another narration." },
        { q: "In every corner of the tent, the believer has a family.", tf: true, why: "On every corner the believer will have a family that cannot be seen by the others." }
      ]
    },
    {
      slug: "a-fingernail-of-paradise",
      title: "A fingernail of Paradise",
      line: "A fingernail of Paradise would beautify the heavens and earth.",
      facts: ["Told by Sa'd ibn Abi Waqqas", "His bracelets would outshine the sun", "As the sun outshines the stars"],
      source: hadith("tirmidhi", "2538", "Sa'd ibn Abi Waqqas", "Sahih (Al-Albani)", "Sa'd said: the Prophet ﷺ said: if as little of what is in Paradise as fits on a fingernail were to appear, it would beautify all the far corners of the heavens and the earth. And if a man of the people of Paradise were to look out and his bracelets appeared, they would blot out the light of the sun, as the sun blots out the light of the stars.", "it would have beautified all the far corners of the heavens and the earth"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say a fingernail's worth of Paradise would do?", a: "Beautify the heavens and earth", wrong: ["Fill a small cup", "Light one room", "Feed one bird"], why: "All the far corners of the heavens and the earth would be beautified, he ﷺ said." },
        { q: "The bracelets would blot out the sun, as the sun blots out what?", a: "The light of the stars", wrong: ["The clouds", "The sea", "The mountains"], why: "As the sun blots out the light of the stars, he ﷺ said of the bracelets." },
        { q: "Paradise is more beautiful than anything in this world.", tf: true, why: "Even a fingernail's worth would beautify the far corners of the heavens and earth." }
      ]
    },
    {
      slug: "ask-for-paradise-three-times",
      title: "Ask for Paradise three times",
      line: "Ask Allah for Paradise three times, and Paradise asks for you.",
      facts: ["Told by Anas ibn Malik", "Paradise says: O Allah, admit him", "Hell says: O Allah, save him"],
      source: hadith("ibnmajah", "4340", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: the Messenger of Allah ﷺ said: whoever asks for Paradise three times, Paradise will say: O Allah, admit him to Paradise. And whoever asks to be saved from Hell three times, Hell will say: O Allah, save him from Hell.", "Whoever asks for Paradise, three times, Paradise will say:"),
      difficulty: 1,
      questions: [
        { q: "How many times should we ask Allah for Paradise, he ﷺ said?", a: "Three times", wrong: ["Once a year", "Seventy times", "A thousand times"], why: "Whoever asks for Paradise three times, Paradise will say: O Allah, admit him." },
        { q: "What does Paradise say for the one who asks for it?", a: "O Allah, admit him", wrong: ["Wait at the gate", "Come back later", "Bring more deeds"], why: "Paradise will say: O Allah, admit him to Paradise, he ﷺ said." },
        { q: "Hell asks Allah to save the one who seeks refuge from it.", tf: true, why: "Whoever asks to be saved from Hell three times, Hell will say: O Allah, save him." }
      ]
    },
    {
      slug: "seek-me-at-three-places",
      title: "Seek me at three places",
      line: "Seek him ﷺ at the Sirat, the Scales, then the Pool.",
      facts: ["Told by Anas ibn Malik", "Anas asked him ﷺ to intercede for him", "He ﷺ will not be missed at these three"],
      source: hadith("tirmidhi", "2433", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: I asked the Prophet ﷺ to intercede for me on the Day of Judgement. He said: I will do it. I said: O Messenger of Allah, then where shall I look for you? He said: look for me first at the Sirat. I said: and if I do not meet you at the Sirat? He said: then look for me at the Mizan, the Scales. I said: and if I do not meet you at the Mizan? He said: then look for me at the Hawd, the Pool, for I will not be missed at these three places.", "to intercede for me on the Day of Judgement"),
      difficulty: 2,
      questions: [
        { q: "What did Anas ask him ﷺ to do for him?", a: "Intercede for him", wrong: ["Teach him to read", "Give him a camel", "Make him a leader"], why: "Anas asked him ﷺ to intercede for him on the Day of Judgement." },
        { q: "Where should Anas look for him ﷺ first?", a: "At the Sirat", wrong: ["At the Pool", "At the Scales", "At the gate of Paradise"], why: "The first time you should seek me is on the Sirat, he ﷺ told Anas." },
        { q: "He ﷺ will be found at the Sirat, the Scales or the Pool.", tf: true, why: "I will not be missed at these three locations, he ﷺ told Anas." }
      ]
    }
  ]
};

export const AKHIRAH_HOPE_UNITS: DeepUnit[] = [HOPE];
