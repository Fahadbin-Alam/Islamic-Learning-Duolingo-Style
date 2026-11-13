import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: learning and teaching, from Jami at-Tirmidhi, Sunan Abi Dawud and Sahih
// al-Bukhari. Even the ant and the fish pray for one who teaches good, Ash-Shifa who taught Hafsah to write, a prayer
// shown on the minbar so people could learn it, never hiding what you know, the sin of answering without knowledge, and
// a man at sea who asked about wudu. Every card is one sahih or hasan hadith with its number, narrator and grade, and its
// exact English words to highlight, and none of them is taught anywhere else in the app.

const LEARNING: DeepUnit = {
  key: "kids-learning",
  topicId: "hadith",
  branchId: "hadith-learning",
  branch: { title: "Learning and teaching", description: "Teachers of good, a lesson in writing, a prayer shown on the minbar, never hiding what you know, careful answers, and a question at sea." },
  name: "learning and teaching",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "teachers-of-good",
      title: "Teachers of good",
      line: "Even the ant and the fish pray for one who teaches good.",
      facts: ["Told by Abu Umamah al-Bahili", "The scholar is above the worshipper", "Allah and His angels bless the teacher of good"],
      source: hadith("tirmidhi", "2685", "Abu Umamah al-Bahili", "Hasan (Darussalam)", "Abu Umamah al-Bahili said: a worshipper and a scholar were mentioned to the Messenger of Allah ﷺ. He ﷺ said: the scholar is above the worshipper as I am above the least of you. Then he ﷺ said: Allah, His angels, and those in the heavens and the earth, even the ant in its hole and even the fish, send blessings on the one who teaches people good.", "the one who teaches the people to do good"),
      difficulty: 1,
      questions: [
        { q: "Which tiny creature in its hole prays for the teacher of good?", a: "The ant", wrong: ["The bee", "The cat", "The bird"], why: "Even the ant in his hole, even the fish, say Salat upon the one who teaches good." },
        { q: "Who did he ﷺ say is above the worshipper?", a: "The scholar", wrong: ["The trader", "The rich man", "The traveller"], why: "The scholar is above the worshiper as he ﷺ is above the least of us." },
        { q: "Allah and His angels bless the one who teaches people good.", tf: true, why: "Allah, His angels and even the fish say Salat upon the one who teaches the people good." }
      ]
    },
    {
      slug: "she-taught-her-to-write",
      title: "She taught her to write",
      line: "Ash-Shifa had taught Hafsah how to write.",
      facts: ["Told by Ash-Shifa bint Abdullah", "She was with Hafsah when he ﷺ came in", "He ﷺ asked her to teach a healing du'a too"],
      source: hadith("abudawud", "3887", "Ash-Shifa bint Abdullah", "Sahih (Al-Albani)", "Ash-Shifa bint Abdullah said: the Messenger of Allah ﷺ came in while I was with Hafsah, and he said to me: why do you not teach her the healing words for skin sores, as you taught her writing?", "invocation for skin eruptions as you taught her writing"),
      difficulty: 1,
      questions: [
        { q: "What had Ash-Shifa already taught Hafsah?", a: "Writing", wrong: ["Sewing", "Cooking", "Swimming"], why: "Why do you not teach this one the invocation as you taught her writing, he ﷺ asked." },
        { q: "Who was with Ash-Shifa when he ﷺ came in?", a: "Hafsah", wrong: ["Aishah", "Asma", "Sawdah"], why: "The Messenger of Allah ﷺ entered when I was with Hafsah, Ash-Shifa said." },
        { q: "He ﷺ wanted Hafsah to learn a healing du'a too.", tf: true, why: "Why do you not teach this one the invocation for skin eruptions, he ﷺ asked Ash-Shifa." }
      ]
    },
    {
      slug: "learn-the-way-i-pray",
      title: "Learn the way I pray",
      line: "He ﷺ prayed on the minbar so all could learn his prayer.",
      facts: ["Told by Sahl ibn Sa'd", "The minbar was made of tamarisk wood", "He ﷺ came down to prostrate at its foot"],
      source: hadith("bukhari", "917", "Sahl ibn Sa'd", "Sahih", "Sahl ibn Sa'd said: a carpenter made the minbar for the Messenger of Allah ﷺ from tamarisk wood. I saw him ﷺ pray on it and bow on it, then step back, come down and prostrate at its foot, and go back up. When he finished, he faced the people and said: I did this so that you may follow me and learn the way I pray.", "follow me and learn the way I pray"),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ pray on the minbar?", a: "So people could learn his prayer", wrong: ["So people could hear the rain", "So people could see the city", "So people could count the rows"], why: "I have done this so that you may follow me and learn the way I pray, he ﷺ said." },
        { q: "What wood was the minbar made from?", a: "Tamarisk wood", wrong: ["Palm wood", "Olive wood", "Cedar wood"], why: "He made it from the tamarisk of the forest, Sahl said of the pulpit." },
        { q: "He ﷺ came down from the minbar to prostrate on the ground.", tf: true, why: "He stepped back, got down and prostrated on the ground near the foot of the pulpit." }
      ]
    },
    {
      slug: "never-hide-what-you-know",
      title: "Never hide what you know",
      line: "When asked what you know, do not hide it.",
      facts: ["Told by Abu Hurairah", "Asked about something he knows", "A bridle of fire for one who hides it"],
      source: hadith("abudawud", "3658", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: whoever is asked about something he knows and hides it will have a bridle of fire put on him on the Day of Resurrection.", "will have a bridle of fire put on him"),
      difficulty: 2,
      questions: [
        { q: "What should you do when asked about something you know?", a: "Share it, do not hide it", wrong: ["Hide it from them", "Pretend you forgot", "Ask for money first"], why: "One who hides what he knows when asked will have a bridle of fire, he ﷺ said." },
        { q: "What will be put on the one who hides what he knows?", a: "A bridle of fire", wrong: ["A crown of light", "A robe of honor", "A ring of gold"], why: "He will have a bridle of fire put on him on the Day of Resurrection, he ﷺ said." },
        { q: "Hiding what you know when asked is a good habit.", tf: false, why: "No. He who is asked something he knows and conceals it will have a bridle of fire." }
      ]
    },
    {
      slug: "careful-answers",
      title: "Careful answers",
      line: "If someone answers without knowledge, the sin is on him.",
      facts: ["Told by Abu Hurairah", "A fatwa: an answer about the religion", "The sin is on the one who gave it"],
      source: hadith("abudawud", "3657", "Abu Hurairah", "Hasan (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: if someone is given a fatwa without knowledge, the sin is on the one who gave it.", "the sin rests on the one who gave it"),
      difficulty: 2,
      questions: [
        { q: "Who carries the sin of a fatwa given without knowledge?", a: "The one who gave it", wrong: ["The one who asked", "The one who heard", "The one who wrote it down"], why: "The sin rests on the one who gave it, if he gave it without knowledge, he ﷺ said." },
        { q: "What must a person have before giving a fatwa?", a: "Real knowledge", wrong: ["A loud voice", "A fine robe", "A big crowd"], why: "If anyone is given a legal decision ignorantly, the sin rests on the one who gave it." },
        { q: "Giving answers about the religion without knowledge is a sin.", tf: true, why: "The sin rests on the one who gave it, he ﷺ said of a decision given ignorantly." }
      ]
    },
    {
      slug: "a-question-at-sea",
      title: "A question at sea",
      line: "A man asked about wudu with sea water: its water is pure.",
      facts: ["Told by Abu Hurairah", "Using their water for wudu would leave them thirsty", "Wudu: washing before the prayer"],
      source: hadith("abudawud", "83", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: a man asked the Messenger of Allah ﷺ: we travel on the sea and take only a little water; if we use it for wudu, we will be thirsty. Can we make wudu with sea water? He ﷺ said: its water is pure, and what dies in it is lawful food.", "Its water is pure and what dies in it is lawful food"),
      difficulty: 1,
      questions: [
        { q: "Why did the man not want to use his water for wudu?", a: "They would be thirsty", wrong: ["The water was salty", "The water was hot", "The water was dirty"], why: "If we use this for ablution, we would suffer from thirst, the man said." },
        { q: "What did he ﷺ say about the water of the sea?", a: "Its water is pure", wrong: ["Its water is unsafe", "Its water is only for ships", "Its water is too salty to use"], why: "Its water is pure and what dies in it is lawful food, he ﷺ replied." },
        { q: "They could make wudu with sea water, he ﷺ said.", tf: true, why: "Can we perform ablution with sea water? Its water is pure, he ﷺ replied." }
      ]
    }
  ]
};

export const KIDS_LEARNING_UNITS: readonly DeepUnit[] = [LEARNING];
