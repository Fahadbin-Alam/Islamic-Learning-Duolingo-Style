import { hadith, type DeepUnit } from "./deepKit";

// One more Marriage and family unit: faith at home, from Sunan Ibn Majah, Sunan Abi Dawud, Sahih al-Bukhari and Sunan
// an-Nasa'i. A share of prayer for the house, Allah's name at the door and at dinner, the siwak first on coming home,
// waking for witr, a du'a for a wife and her husband, and prayer as his comfort. Every card is one sahih hadith with
// its number, narrator and grade, and its exact English words to highlight, and none of them is taught anywhere else
// in the app.

const HOME: DeepUnit = {
  key: "marriage-faith-at-home",
  topicId: "marriage",
  branchId: "marriage-faith-at-home",
  branch: { title: "Faith at home", description: "A share of prayer for the house, Allah's name at the door, the siwak first, waking for witr, a blessing for wife and husband, and comfort in prayer." },
  name: "faith at home",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-share-for-the-house",
      title: "A share for the house",
      line: "Give your house a share of your prayer; Allah puts good there.",
      facts: ["Told by Abu Sa'id al-Khudri", "Pray some of your prayer at home too", "Allah puts good in the house through it"],
      source: hadith("ibnmajah", "1376", "Abu Sa'id al-Khudri", "Sahih (Al-Albani)", "Abu Sa'id al-Khudri said: the Prophet ﷺ said: when one of you has finished his prayer, let him give his house a share of it, for Allah will put something good in his house because of that prayer.", "let him give his house a share of that, for Allah will put something good in his house because of that prayer"),
      difficulty: 1,
      questions: [
        { q: "What should your house get from your prayer?", a: "A share of it", wrong: ["Nothing at all", "Only the call to prayer", "Only on Eid"], why: "Let him give his house a share of that prayer, the Prophet ﷺ said." },
        { q: "What does Allah put in a house that gets a share of prayer?", a: "Something good", wrong: ["More furniture", "A new door", "Heavy silence"], why: "Allah will put something good in his house because of that prayer, he ﷺ said." },
        { q: "All prayer should be kept out of the home.", tf: false, why: "No. Give your house a share of your prayer, he ﷺ said." }
      ]
    },
    {
      slug: "allahs-name-at-the-door",
      title: "Allah's name at the door",
      line: "Say Allah's name at the door and the meal; Shaytan gets nothing.",
      facts: ["Told by Jabir ibn Abdullah", "Mention Allah on coming in and over the food", "Shaytan: no place to sleep, no supper"],
      source: hadith("abudawud", "3765", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: the Prophet ﷺ said: when a man enters his house and mentions Allah's name on entering and over his food, the devil says: you have no place to spend the night and no evening meal. When he enters without mentioning Allah's name, the devil says: you have found a place to spend the night; and when he does not mention Allah's name at his food, he says: you have found a place to spend the night and an evening meal.", "the devil says: You have no place to spend the night and no evening meal"),
      difficulty: 1,
      questions: [
        { q: "When should you mention Allah at home, he ﷺ said?", a: "On coming in and at the meal", wrong: ["Only when leaving town", "Only on Fridays", "Only when guests come"], why: "When a man mentions Allah's name on entering and on his food, he ﷺ said." },
        { q: "What does the devil say when Allah is mentioned at the door and the meal?", a: "No place to stay, no supper", wrong: ["I found a place to stay", "I found a supper", "I found a bed and a meal"], why: "You have no place to spend the night and no evening meal, the devil says." },
        { q: "Forgetting Allah's name at dinner lets the devil share the meal.", tf: true, why: "You have found a place to spend the night and an evening meal, the devil says." }
      ]
    },
    {
      slug: "the-siwak-first",
      title: "The siwak first",
      line: "Coming home, the first thing he ﷺ did was use the siwak.",
      facts: ["Told by Aishah", "Shurayh ibn Hani asked her", "The siwak: a tooth stick for cleaning teeth"],
      source: hadith("ibnmajah", "290", "Aishah", "Sahih (Al-Albani)", "Shurayh ibn Hani said: I said to Aishah: tell me, what was the first thing the Messenger of Allah ﷺ did when he came in to you? She said: the first thing he would do was use the tooth stick, the siwak.", "The first thing he would do would be to use the tooth stick"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do first on coming home?", a: "Used the siwak", wrong: ["Ate some dates", "Lay down to sleep", "Asked for news"], why: "The first thing he would do would be to use the tooth stick, Aishah said." },
        { q: "Who asked Aishah what he ﷺ did first at home?", a: "Shurayh ibn Hani", wrong: ["Abu Hurairah", "Anas ibn Malik", "Abdullah ibn Umar"], why: "Shurayh said: I asked Aishah what he ﷺ did first when he came home." },
        { q: "A siwak is a small stick for cleaning the teeth.", tf: true, why: "Aishah called it the tooth stick; he ﷺ used it first on coming home." }
      ]
    },
    {
      slug: "woken-for-witr",
      title: "Woken for witr",
      line: "He ﷺ prayed at night, then woke Aishah to pray witr too.",
      facts: ["Told by Aishah", "She slept while he ﷺ prayed at night", "He woke her when it was time for witr"],
      source: hadith("bukhari", "997", "Aishah", "Sahih", "Aishah said: the Prophet ﷺ used to pray his night prayer while I slept across his bed. When he wanted to pray witr, he would wake me, and I would pray witr too.", "Whenever he intended to offer the witr prayer, he used to wake me up and I would offer the witr prayer too"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ wake Aishah?", a: "When he was about to pray witr", wrong: ["At sunrise to eat", "At noon for a walk", "When guests came"], why: "Whenever he intended to offer the witr prayer, he used to wake me, Aishah said." },
        { q: "What did Aishah do once he ﷺ woke her?", a: "Prayed witr too", wrong: ["Made breakfast", "Slept on till morning", "Read a letter"], why: "He used to wake me up and I would offer the witr prayer too, Aishah said." },
        { q: "A husband can help his wife to worship at night.", tf: true, why: "He ﷺ woke Aishah for witr, and she prayed it too." }
      ]
    },
    {
      slug: "a-blessing-for-you-both",
      title: "A blessing for you both",
      line: "Asked to pray for her and her husband, he ﷺ blessed both.",
      facts: ["Told by Jabir ibn Abdullah", "A woman asked for a du'a for her and her husband", "May Allah send blessing on you and your husband"],
      source: hadith("abudawud", "1533", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: a woman said to the Prophet ﷺ: pray for blessing on me and on my husband. The Prophet ﷺ said: may Allah send blessing on you and on your husband.", "May Allah send blessing on you and your husband"),
      difficulty: 2,
      questions: [
        { q: "What did the woman ask him ﷺ for?", a: "A du'a for her and her husband", wrong: ["Money for a trip", "A new house", "A camel to ride"], why: "Invoke blessing on me as well as on my husband, she said." },
        { q: "Whom did his ﷺ du'a include?", a: "Her and her husband", wrong: ["Only her", "Only her husband", "Only her children"], why: "May Allah send blessing on you and your husband, he ﷺ said." },
        { q: "Asking someone to pray for your family is allowed.", tf: true, why: "A woman asked him ﷺ to pray for her and her husband, and he did." }
      ]
    },
    {
      slug: "comfort-in-prayer",
      title: "Comfort in prayer",
      line: "Women and perfume were dear to him ﷺ; his comfort was prayer.",
      facts: ["Told by Anas ibn Malik", "Made dear to him: women and perfume", "His comfort, the coolness of his eye: prayer"],
      source: hadith("nasai", "3940", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: the Messenger of Allah ﷺ said: women and perfume have been made dear to me, but my comfort, the coolness of my eye, has been placed in prayer.", "Women and perfume have been made dear to me, but my comfort has been provided in prayer"),
      difficulty: 3,
      questions: [
        { q: "Where did he ﷺ find his comfort?", a: "In prayer", wrong: ["In wealth", "In sleep", "In travel"], why: "But my comfort has been provided in prayer, the Messenger of Allah ﷺ said." },
        { q: "Besides women, what was made dear to him ﷺ?", a: "Perfume", wrong: ["Gold", "Silk", "Fame"], why: "Women and perfume have been made dear to me, he ﷺ said." },
        { q: "Prayer can be a comfort for the heart, as it was for him ﷺ.", tf: true, why: "My comfort has been provided in prayer, he ﷺ said." }
      ]
    }
  ]
};

export const MARRIAGE_HOME_UNITS: DeepUnit[] = [HOME];
