import { hadith, type DeepUnit } from "./deepKit";

// One more book for the Bukhari and Muslim topic: al-Bukhari's Book of the Prophets. Three men put to the test, a
// jar of gold nobody would keep, a prophet who prayed for the people who hurt him, souls drawn to their like,
// patience when plague comes, and two men who recited an ayah two ways. Every card is one sahih hadith of that book
// (number as sunnah.com gives it) with its exact English words to highlight, and none of them is taught anywhere
// else in the app.

const PROPHETS: DeepUnit = {
  key: "book-anbiya",
  topicId: "sahihayn",
  branchId: "hadith-book-anbiya",
  branch: { title: "The Book of the Prophets", description: "From al-Bukhari's Book of the Prophets: stories of the nations before us, and what they teach." },
  name: "the Book of the Prophets",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "three-men-tested",
      title: "Three men put to the test",
      line: "Three men were healed and made rich, then tested by an angel.",
      facts: ["Told by Abu Hurairah", "A leper, a bald man and a blind man", "Only one of them shared what he had"],
      source: hadith("bukhari", "3464", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah tested three men of Bani Israel, a leper, a bald man and a blind man. An angel healed each of them and gave them a she-camel, a cow and a sheep, and in time each had a valley full. Then the angel came to each looking as he once was, a poor traveller, and asked for help. The first two said their wealth came from their forefathers, and the angel said: if you are lying, may Allah make you as you were. The one who had been blind said: I was blind and Allah gave me back my sight; I was poor and Allah made me rich, so take what you wish. The angel said: keep your wealth; you have all been tested, and Allah is pleased with you and angry with your two companions.", "I was blind and Allah gave me back my eye-sight; I was poor and Allah made me rich"),
      difficulty: 2,
      questions: [
        { q: "What did the angel give the man who had been blind?", a: "A sheep", wrong: ["A camel", "A cow", "A horse"], why: "The angel gave him a pregnant sheep, and in time he had a valley full of sheep." },
        { q: "What did the first two men say about their wealth?", a: "It came from their forefathers", wrong: ["Allah gave it to them", "They had earned it all", "It belonged to the angel"], why: "I got this property through inheritance from my fore-fathers, the first man said." },
        { q: "The angel said Allah was pleased with all three men.", tf: false, why: "No. Allah was pleased with the one who gave, and angry with the other two." }
      ]
    },
    {
      slug: "the-jar-of-gold",
      title: "The jar of gold",
      line: "A buyer found gold in the land, and would not keep it.",
      facts: ["Told by Abu Hurairah", "The seller would not take it back either", "The rest was given in charity"],
      source: hadith("bukhari", "3472", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: a man bought land from another man and found in it a clay jar full of gold. He said to the seller: take your gold, for I bought only the land from you, not the gold. The seller said: I sold you the land with all that is in it. They took their case to a man, who asked if they had children. One had a son and the other a daughter. He said: marry them to each other, spend some of it on them, and give the rest in charity.", "Take your gold, as I have bought only the land from you, but I have not bought the gold from you"),
      difficulty: 1,
      questions: [
        { q: "What did the buyer find in the land?", a: "A jar full of gold", wrong: ["A well of water", "An old sword", "A box of books"], why: "The buyer found an earthenware jar filled with gold in the land, he ﷺ said." },
        { q: "Why did the buyer say the gold was not his?", a: "He had bought only the land", wrong: ["The gold was too heavy", "He was afraid of it", "It was not real gold"], why: "Take your gold, as I have bought only the land from you, the buyer said." },
        { q: "The rest of the gold was given away in charity.", tf: true, why: "Spend the money on both of them and give the rest of it in charity, the man said." }
      ]
    },
    {
      slug: "forgive-my-people",
      title: "Forgive my people",
      line: "A prophet, hurt by his people, prayed that Allah forgive them.",
      facts: ["Told by Abdullah ibn Mas'ud", "He was wiping the blood from his face"],
      source: hadith("bukhari", "3477", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud said: it is as if I can still see the Prophet ﷺ telling of one of the prophets, whose people beat him until he bled. He wiped the blood from his face and said: O Allah, forgive my people, for they do not know.", "O Allah! Forgive my nation, for they have no knowledge"),
      difficulty: 1,
      questions: [
        { q: "What did that prophet ask Allah for his people?", a: "To forgive them", wrong: ["To send them away", "To make them sorry", "To give him their land"], why: "O Allah, forgive my nation, for they have no knowledge, he said." },
        { q: "What was he doing as he made that du'a?", a: "Wiping blood from his face", wrong: ["Packing to leave the town", "Calling his friends to help", "Hiding from the people"], why: "He was cleaning the blood off his face and saying: O Allah, forgive my nation." },
        { q: "Ibn Mas'ud remembered the Prophet ﷺ telling it as if he could still see it.", tf: true, why: "As if I saw the Prophet ﷺ talking about one of the prophets, Ibn Mas'ud said." }
      ]
    },
    {
      slug: "souls-like-troops",
      title: "Souls like gathered troops",
      line: "Souls that are alike are drawn to each other, he ﷺ said.",
      facts: ["Told by Aishah", "Souls that are unlike keep apart"],
      source: hadith("bukhari", "3336", "Aishah", "Sahih", "Aishah said she heard the Prophet ﷺ say: souls are like troops gathered together. Those with like qualities are drawn to each other, and those with unlike qualities keep apart.", "Souls are like recruited troops: Those who are like qualities are inclined to each other"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say souls are like?", a: "Troops gathered together", wrong: ["Birds in the sky", "Stars at night", "Waves of the sea"], why: "Souls are like recruited troops, he ﷺ said, as Aishah heard." },
        { q: "Which souls are drawn to each other?", a: "Those with like qualities", wrong: ["Those who live nearby", "Those who are rich", "Those of the same age"], why: "Those of like qualities are inclined to each other, he ﷺ said." },
        { q: "Souls with unlike qualities keep apart, he ﷺ said.", tf: true, why: "Those who have dissimilar qualities differ, he ﷺ said." }
      ]
    },
    {
      slug: "patient-in-a-plague",
      title: "Patient when plague comes",
      line: "Staying patient in a plague earns the reward of a martyr.",
      facts: ["Told by Aishah", "She asked him ﷺ about the plague", "Nothing befalls us but what Allah wrote"],
      source: hadith("bukhari", "3474", "Aishah", "Sahih", "Aishah asked the Messenger of Allah ﷺ about the plague. He told her it was a punishment Allah sent on whom He wished, and that Allah made it a mercy for the believers: whoever stays in his land when plague comes, patient and hoping for Allah's reward, and knowing that nothing will befall him except what Allah has written for him, will have the reward of a martyr.", "believing that nothing will befall him except what Allah has written for him, he will get the reward of a martyr"),
      difficulty: 2,
      questions: [
        { q: "What did Allah make the plague for the believers?", a: "A mercy", wrong: ["A time to run away", "A test with no reward", "A sign of bad luck"], why: "Allah made it a source of mercy for the believers, he ﷺ told Aishah." },
        { q: "What reward does the patient believer get, staying in a land with plague?", a: "The reward of a martyr", wrong: ["A bag of gold", "A long life", "A new house"], why: "He will get the reward of a martyr, if he stays patiently hoping for Allah's reward." },
        { q: "The believer should run away from his land when plague comes.", tf: false, why: "No. The believer stays patiently in his land when plague comes, hoping for Allah's reward." }
      ]
    },
    {
      slug: "both-are-correct",
      title: "Both of you are correct",
      line: "Two men recited an ayah differently, and both were right.",
      facts: ["Told by Abdullah ibn Mas'ud", "He saw dislike on the Prophet's ﷺ face"],
      source: hadith("bukhari", "3476", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud said: I heard a man recite an ayah one way, and I had heard the Prophet ﷺ recite it another way. I took him to the Prophet ﷺ and told him, and I saw dislike on his face. He ﷺ said: both of you are correct, so do not differ, for the nations before you differed and were destroyed.", "for the nations before you differed, so they were destroyed"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say about the two ways of reciting?", a: "Both men are correct", wrong: ["Only Ibn Mas'ud is right", "Only the other man is right", "Neither one is right"], why: "Both of you are correct, so do not differ, he ﷺ said." },
        { q: "What happened to the nations before, he ﷺ said, when they differed?", a: "They were destroyed", wrong: ["They grew stronger", "They became rich", "They were forgiven"], why: "He ﷺ told the two men not to differ, for that destroyed the nations before." },
        { q: "Ibn Mas'ud saw dislike on the Prophet's ﷺ face when he told him.", tf: true, why: "I noticed the sign of disapproval on his face, Ibn Mas'ud said." }
      ]
    }
  ]
};

export const HADITH_BOOK_PROPHETS_UNITS: DeepUnit[] = [PROPHETS];
