import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: the manners of a sitting, from Sunan Abi Dawud and Jami at-Tirmidhi. Every card is one
// sahih hadith (number, narrator and grade as sunnah.com gives them), with its exact English words to highlight,
// and none of them is taught anywhere else in the app.

const GATHERINGS: DeepUnit = {
  key: "manners-gatherings",
  topicId: "manners",
  branchId: "manners-gatherings",
  branch: { title: "Manners of gatherings", description: "Room for everyone, your seat when you come back, keeping a secret, correcting kindly, thanking helpers, and closing a sitting." },
  name: "the manners of gatherings",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "room-for-all",
      title: "Room for everyone",
      line: "The best places to sit are the ones with the most room.",
      facts: ["Told by Abu Sa'id al-Khudri", "Khayrul-majalisi awsa'uha"],
      source: hadith("abudawud", "4820", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "The Prophet ﷺ said: the best gatherings are the most spacious.", "The best places to sit are those which provide most room"),
      difficulty: 1,
      questions: [
        { q: "Which places to sit did he ﷺ call the best?", a: "Those with the most room", wrong: ["Those nearest the door", "Those with soft cushions", "Those with the best view"], why: "The best places to sit are those which provide most room." },
        { q: "A friend arrives and the circle is tight. What fits the Sunnah?", a: "Make space for him", wrong: ["Spread out your things", "Pretend you did not see", "Tell him to stand"], why: "The best sittings are the roomy ones, so make space." },
        { q: "A crowded, tight sitting is the best kind.", tf: false, why: "No. The best places to sit are those which provide most room." }
      ]
    },
    {
      slug: "your-seat",
      title: "Your seat when you come back",
      line: "If you get up and come back, your seat is still yours.",
      facts: ["Told by Abu Hurairah", "A boy got up, then came back"],
      source: hadith("abudawud", "4853", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Salih said: I sat with my father and a boy, who got up and came back. My father then told from Abu Hurairah that the Prophet ﷺ said: whoever gets up from his place and comes back to it has the most right to it.", "If anyone gets up from where he has been sitting and comes back to it, he has most right to it"),
      difficulty: 1,
      questions: [
        { q: "Who has the most right to a seat he left and came back to?", a: "The one who sat there first", wrong: ["Whoever sits there next", "The oldest person there", "The last one to arrive"], why: "If anyone gets up and comes back to it, he has most right to it." },
        { q: "In the story, who got up and then came back?", a: "A young boy", wrong: ["An old man", "A teacher", "A guest"], why: "A boy sitting with them got up, then returned to his place." },
        { q: "If someone steps out for a moment, you may keep his seat.", tf: false, why: "No. If he comes back to his seat, he has most right to it." }
      ]
    },
    {
      slug: "keep-a-secret",
      title: "Keeping what you are told",
      line: "When someone tells you something and leaves, it is a trust.",
      facts: ["Told by Jabir ibn Abdullah", "An amanah: something to keep safe"],
      source: hadith("abudawud", "4868", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "The Prophet ﷺ said: when a man tells you something and then goes away, what he said is a trust.", "When a man tells something and then departs, it is a trust"),
      difficulty: 1,
      questions: [
        { q: "What is it, when someone tells you something and then leaves?", a: "A trust", wrong: ["News to spread", "A joke to retell", "Nothing at all"], why: "When a man tells something and then departs, it is a trust." },
        { q: "What should you do with a trust?", a: "Keep it safe", wrong: ["Tell everyone", "Post it online", "Forget it on purpose"], why: "An amanah is kept safe, not spread to others." },
        { q: "Sharing what a friend told you is fine once he has left.", tf: false, why: "No. What he told you before he left is a trust." }
      ]
    },
    {
      slug: "correct-kindly",
      title: "Correcting without names",
      line: "He ﷺ corrected mistakes without naming the person.",
      facts: ["Told by Aishah", "Ma balu aqwamin: what is wrong with people"],
      source: hadith("abudawud", "4788", "Aishah", "Sahih (Al-Albani)", "Aishah said: when the Prophet ﷺ heard something about a man, he would not say: what is wrong with so-and-so, that he says this? He would say: what is wrong with people who say such and such?", "What is the matter with the people that they say such and such"),
      difficulty: 2,
      questions: [
        { q: "What would he ﷺ say when he heard of someone's mistake?", a: "What is the matter with people", wrong: ["Tell me his name", "Bring that man to me", "Who said such a thing"], why: "He did not name the man, but spoke of people in general." },
        { q: "Who told how he ﷺ corrected people?", a: "Aishah", wrong: ["Abu Hurairah", "Anas ibn Malik", "Bilal"], why: "Aishah described how he ﷺ spoke when told about a man." },
        { q: "He ﷺ named people in front of others to correct them.", tf: false, why: "No. He spoke of what people say, without naming anyone." }
      ]
    },
    {
      slug: "thank-helpers",
      title: "Thanking those who help you",
      line: "Pray for those who help you, and speak well of them.",
      facts: ["Told by Anas ibn Malik", "The Muhajirun and the Ansar"],
      source: hadith("abudawud", "4812", "Anas ibn Malik", "Sahih (Al-Albani)", "The Muhajirun said: Messenger of Allah, the Ansar have taken all the reward. He ﷺ said: no, as long as you pray to Allah for them and praise them.", "no, so long as you pray to Allah for them and praise them"),
      difficulty: 2,
      questions: [
        { q: "Who feared the Ansar had taken all the reward?", a: "The Muhajirun", wrong: ["The Quraysh", "The Bedouins", "The people of Ta'if"], why: "The Muhajirun came from Makkah, and the Ansar of Madinah took them in." },
        { q: "How could the Muhajirun share in that reward?", a: "Pray for the Ansar and praise them", wrong: ["Pay them back in gold", "Leave Madinah", "Work twice as hard"], why: "So long as you pray to Allah for them and praise them." },
        { q: "The Prophet ﷺ said the Ansar had taken all the reward.", tf: false, why: "No. They had not taken all the reward while you pray for them and praise them." }
      ]
    },
    {
      slug: "closing-a-sitting",
      title: "Closing a sitting",
      line: "Before you get up, say: Subhanaka Allahumma wa bihamdika.",
      facts: ["Jami at-Tirmidhi 3433", "Told by Abu Hurairah"],
      source: hadith("tirmidhi", "3433", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: whoever sits in a gathering with much idle talk, and before he gets up says: Subhanaka Allahumma wa bihamdika, ashhadu an la ilaha illa anta, astaghfiruka wa atubu ilayk, is forgiven what happened in that gathering.", "whatever occurred in that sitting would be forgiven to him"),
      difficulty: 2,
      questions: [
        { q: "When do we say Subhanaka Allahumma wa bihamdika, in Tirmidhi 3433?", a: "Before getting up from a sitting", wrong: ["Before eating", "When it rains", "When we sneeze"], why: "Said before rising, it brings forgiveness for the idle talk of that sitting." },
        { q: "What does saying it before rising bring?", a: "Forgiveness for that sitting", wrong: ["A new friend", "A longer sitting", "Nothing at all"], why: "Whatever occurred in that sitting would be forgiven to him." },
        { q: "The words end with: astaghfiruka wa atubu ilayk.", tf: true, why: "I seek Your forgiveness, and I repent to You." }
      ]
    }
  ]
};

export const MANNERS_GATHERING_UNITS: DeepUnit[] = [GATHERINGS];
