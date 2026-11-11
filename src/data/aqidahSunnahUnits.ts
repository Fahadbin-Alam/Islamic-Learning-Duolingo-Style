import { hadith, type DeepUnit } from "./deepKit";

// One more Aqidah unit: following the Sunnah, from Sahih al-Bukhari and Sunan Abi Dawud. The angels' parable of the
// house and the feast, nothing new in the religion, the man on his couch, the rings the Companions threw away, the two
// Umar followed, and Ibn Mas'ud on the best way. Every card is one sahih hadith with its number, narrator and grade,
// and its exact English words to highlight, and none of them is taught anywhere else in the app.

const SUNNAH: DeepUnit = {
  key: "aqidah-sunnah",
  topicId: "aqidah",
  branchId: "aqidah-sunnah",
  branch: { title: "Following the Sunnah", description: "The angels' parable of the feast, nothing new in the religion, the man on his couch, rings thrown away, the two Umar followed, and the best way." },
  name: "following the Sunnah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-house-and-the-feast",
      title: "The house and the feast",
      line: "Angels told a parable: Paradise is a house with a feast.",
      facts: ["Told by Jabir ibn Abdullah", "Angels came while he ﷺ slept", "His eyes slept, but his heart was awake"],
      source: hadith("bukhari", "7281", "Jabir ibn Abdullah", "Sahih", "Jabir said: angels came to the Prophet ﷺ while he slept and told a parable. A man built a house, set out a feast in it, and sent someone to invite the people. Whoever accepted the invitation entered the house and ate, and whoever refused did not. The house is Paradise, and the one who invites is Muhammad ﷺ. Whoever obeys Muhammad ﷺ obeys Allah, and whoever disobeys him disobeys Allah.", "The houses stands for Paradise and the call maker is Muhammad"),
      difficulty: 2,
      questions: [
        { q: "In the angels' parable, what does the house stand for?", a: "Paradise", wrong: ["A palace on earth", "A king's court", "A busy market"], why: "The house stands for Paradise, the angels said, and the one who invites is Muhammad ﷺ." },
        { q: "Who is the one sent to invite the people, in the parable?", a: "Muhammad ﷺ", wrong: ["One of the angels", "A wise king", "A traveller"], why: "The call maker is Muhammad ﷺ, and whoever accepts enters the house and eats." },
        { q: "In the parable, whoever refused the invitation still ate from the feast.", tf: false, why: "No. Whoever refused the invitation did not enter the house or eat, the angels said." }
      ]
    },
    {
      slug: "nothing-new-in-the-religion",
      title: "Nothing new in the religion",
      line: "Anything added to the religion that is not from it is rejected.",
      facts: ["Told by Aishah", "Follow what he ﷺ brought, and add nothing to it"],
      source: hadith("bukhari", "2697", "Aishah", "Sahih", "The Messenger of Allah ﷺ said: whoever brings into this religion of ours something that is not in harmony with it, it is rejected.", "If somebody innovates something which is not in harmony with the principles of our religion, that thing is rejected"),
      difficulty: 2,
      questions: [
        { q: "What happens to something added to the religion that is not from it?", a: "It is rejected", wrong: ["It earns a double reward", "It becomes a duty", "It is kept forever"], why: "That thing is rejected, he ﷺ said of what is not in harmony with our religion." },
        { q: "A deed must match what, to be accepted?", a: "What the religion teaches", wrong: ["The latest fashion", "What most people like", "Your own new idea"], why: "Whatever is not in harmony with the principles of our religion is rejected, he ﷺ said." },
        { q: "Adding to the religion what is not from it earns extra reward.", tf: false, why: "No. That thing is rejected, he ﷺ said, if it is not in harmony with our religion." }
      ]
    },
    {
      slug: "the-man-on-his-couch",
      title: "The man on his couch",
      line: "Do not set his ﷺ commands aside, saying the Quran is enough.",
      facts: ["Told by Abu Rafi'", "A man on his couch says he follows only the Book"],
      source: hadith("abudawud", "4605", "Abu Rafi'", "Sahih (Al-Albani)", "The Prophet ﷺ said: let me not find one of you reclining on his couch when a command or a ban of mine reaches him, and he says: we do not know; what we found in the Book of Allah, we follow.", "Let me not find one of you reclining on his couch"),
      difficulty: 3,
      questions: [
        { q: "Where is the man he ﷺ warned about, when the command reaches him?", a: "On his couch", wrong: ["In the masjid", "On a camel", "At the market"], why: "Let me not find one of you reclining on his couch, he ﷺ said." },
        { q: "What does the man say when a command of his ﷺ reaches him?", a: "We follow only the Book", wrong: ["I will obey it gladly", "Teach me more of it", "Let me ask about it"], why: "We do not know; what we found in the Book of Allah, we follow, the man says." },
        { q: "Following only the Quran, and leaving his ﷺ commands, is enough.", tf: false, why: "No. He ﷺ warned the one who says: what we found in Allah's Book we have followed." }
      ]
    },
    {
      slug: "rings-thrown-away",
      title: "They threw their rings away",
      line: "When he ﷺ threw his gold ring away, the people did too.",
      facts: ["Told by Abdullah ibn Umar", "He ﷺ said he would never wear it again"],
      source: hadith("bukhari", "7298", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: the Prophet ﷺ wore a gold ring, and the people wore gold rings too. Then he ﷺ threw it away and said: I will never wear it. So the people threw their rings away too.", "Thereupon the people also threw their rings away"),
      difficulty: 1,
      questions: [
        { q: "What did the people do when he ﷺ wore a gold ring?", a: "They wore gold rings too", wrong: ["They did nothing at all", "They asked for his ring", "They waited a whole year"], why: "The people followed him and wore gold rings too, Ibn Umar said." },
        { q: "What did the people do when he ﷺ threw his ring away?", a: "Threw their rings away too", wrong: ["Kept wearing theirs", "Gave theirs as gifts", "Sold theirs in the market"], why: "They copied him, and the people also threw their rings away, Ibn Umar said." },
        { q: "The Companions followed what he ﷺ did, even in small things.", tf: true, why: "When he ﷺ threw his ring away, they threw theirs away too, Ibn Umar said." }
      ]
    },
    {
      slug: "the-two-to-follow",
      title: "The two to follow",
      line: "Umar kept to what the Prophet ﷺ and Abu Bakr had done.",
      facts: ["Told by Abu Wa'il, from Shaybah", "Umar wished to share out the Ka'bah's gold and silver", "Shaybah said: your two companions did not do it"],
      source: hadith("bukhari", "7275", "Abu Wa'il, from Shaybah", "Sahih", "Abu Wa'il said: I sat with Shaybah in the Sacred Mosque, and he said: Umar once sat with me in this same spot and said: I would like to share out all the gold and silver in the Ka'bah among the Muslims. I said: you cannot do that. He said: why? I said: your two companions, the Prophet ﷺ and Abu Bakr, did not do it. Umar said: they are the two whom one must follow.", "They are the two persons whom one must follow"),
      difficulty: 2,
      questions: [
        { q: "What did Umar wish to share out among the Muslims?", a: "The gold and silver of the Ka'bah", wrong: ["The dates of Madinah", "The camels of Makkah", "The swords of the army"], why: "I would like to distribute all the gold and silver in the Ka'bah, Umar told Shaybah." },
        { q: "Why did Shaybah say Umar should not do it?", a: "His two companions did not do it", wrong: ["The gold was too heavy", "The people did not want it", "It belonged to Shaybah"], why: "Your two companions, the Prophet ﷺ and Abu Bakr, did not do it, Shaybah said." },
        { q: "Umar told Shaybah he would share out the gold anyway.", tf: false, why: "No. They are the two persons whom one must follow, Umar said." }
      ]
    },
    {
      slug: "the-best-way",
      title: "The best way",
      line: "Ibn Mas'ud: the best way is the way of Muhammad ﷺ.",
      facts: ["Told by Abdullah ibn Mas'ud", "The best speech is Allah's Book"],
      source: hadith("bukhari", "7277", "Abdullah ibn Mas'ud", "Sahih", "Abdullah ibn Mas'ud said: the best speech is the Book of Allah, and the best way is the way of Muhammad ﷺ. The worst of matters are the new things brought into the religion, and what you have been promised will surely come, and you cannot escape it.", "and the best way is the way of Muhammad, and the worst matters are the heresies"),
      difficulty: 2,
      questions: [
        { q: "What is the best speech, Ibn Mas'ud said?", a: "The Book of Allah", wrong: ["The words of poets", "The talk of kings", "The tales of old"], why: "The best talk is Allah's Book, and the best way is the way of Muhammad ﷺ, he said." },
        { q: "Whose way is the best way, Ibn Mas'ud said?", a: "The way of Muhammad ﷺ", wrong: ["The way of our forefathers", "The way of the rich", "The way of the crowd"], why: "The best way is the way of Muhammad ﷺ, and the worst matters are the heresies, he said." },
        { q: "Ibn Mas'ud called new things in the religion the best of matters.", tf: false, why: "No. The worst matters are the new things brought into the religion, Ibn Mas'ud said." }
      ]
    }
  ]
};

export const AQIDAH_SUNNAH_UNITS: DeepUnit[] = [SUNNAH];
