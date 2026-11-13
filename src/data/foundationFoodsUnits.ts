import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: foods he ﷺ ate, from Sunan Abi Dawud, Sahih al-Bukhari and Jami at-Tirmidhi. Melon with
// fresh dates, fresh dates with cucumber, chicken, cheese at Tabuk cut after saying Allah's name, butter and dates on a
// visit, and old dates looked over before eating. Every card is one sahih or hasan hadith with its number, narrator and
// grade, and its exact English words to highlight. Points the schools differ on are left out, and none of these hadith
// is taught anywhere else in the app.

const FOODS: DeepUnit = {
  key: "found-foods-he-ate",
  topicId: "foundation",
  branchId: "foundation-foods-he-ate",
  branch: { title: "Foods he ﷺ ate", description: "Melon and cucumber with fresh dates, chicken, cheese at Tabuk, butter and dates, and old dates looked over." },
  name: "foods he ﷺ ate",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "melon-with-fresh-dates",
      title: "Melon with fresh dates",
      line: "He ﷺ ate melon with fresh dates.",
      facts: ["Told by Aishah", "Melon and fresh dates together", "The heat of one, the coolness of the other"],
      source: hadith("abudawud", "3836", "Aishah", "Hasan (Al-Albani)", "Aishah said: the Messenger of Allah ﷺ used to eat melon with fresh dates, and he said: the heat of the one is broken by the coolness of the other, and the coolness of the one by the heat of the other.", "used to eat melon with fresh dates"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ eat with fresh dates, Aishah said?", a: "Melon", wrong: ["Rice", "Lentils", "Beans"], why: "The Messenger of Allah ﷺ used to eat melon with fresh dates, Aishah said." },
        { q: "What breaks the heat of the one, he ﷺ said?", a: "The coolness of the other", wrong: ["The salt of the other", "The sweetness of the other", "The smell of the other"], why: "And the coolness of the one is broken by the heat of the other, he ﷺ said." },
        { q: "He ﷺ ate melon together with fresh dates.", tf: true, why: "Aishah said he ﷺ used to eat melon with fresh dates, each one with the other." }
      ]
    },
    {
      slug: "dates-with-cucumber",
      title: "Dates with cucumber",
      line: "He ﷺ ate fresh dates with cucumber.",
      facts: ["Told by Abdullah ibn Ja'far", "Fresh dates: soft and ripe", "Snake cucumber: a long, thin cucumber"],
      source: hadith("bukhari", "5447", "Abdullah ibn Ja'far", "Sahih", "Abdullah ibn Ja'far said: I saw the Prophet ﷺ eating fresh dates with snake cucumbers.", "eating fresh dates with snake cucumbers"),
      difficulty: 1,
      questions: [
        { q: "What did Abdullah ibn Ja'far see him ﷺ eat with fresh dates?", a: "Cucumber", wrong: ["Fish", "Eggs", "Carrots"], why: "I saw the Prophet ﷺ eating fresh dates with snake cucumbers, Abdullah ibn Ja'far said." },
        { q: "Who saw him ﷺ eat fresh dates with snake cucumbers?", a: "Abdullah ibn Ja'far", wrong: ["Abu Dharr", "Salman al-Farisi", "Ammar ibn Yasir"], why: "Abdullah ibn Ja'far saw it and told it, in Sahih al-Bukhari 5447." },
        { q: "He ﷺ ate fresh dates with snake cucumbers.", tf: true, why: "Abdullah ibn Ja'far said: I saw the Prophet ﷺ eating them together." }
      ]
    },
    {
      slug: "sit-and-eat",
      title: "Sit down and eat",
      line: "Abu Musa ate chicken, for he had seen him ﷺ eat it.",
      facts: ["Told by Zahdam al-Jarmi", "Abu Musa al-Ash'ari was eating", "Sit and eat, he told Zahdam"],
      source: hadith("tirmidhi", "1826", "Abu Musa al-Ash'ari", "Sahih (Darussalam)", "Zahdam al-Jarmi said: I came in to Abu Musa while he was eating chicken, and he said: sit and eat, for I saw the Messenger of Allah ﷺ eating it.", "while he was eating chicken"),
      difficulty: 1,
      questions: [
        { q: "What was Abu Musa eating when Zahdam came in?", a: "Chicken", wrong: ["Fish", "Lamb", "Camel meat"], why: "Abu Musa was eating chicken, and he told Zahdam al-Jarmi: sit and eat." },
        { q: "Why did Abu Musa say to Zahdam: sit and eat?", a: "He had seen him ﷺ eat it", wrong: ["The food was a gift", "It was a day of Eid", "The food would soon spoil"], why: "Sit and eat, for I saw the Messenger of Allah ﷺ eating it, Abu Musa said." },
        { q: "Abu Musa saw him ﷺ eat chicken.", tf: true, why: "Abu Musa told Zahdam: I saw the Messenger of Allah ﷺ eating it, so sit and eat." }
      ]
    },
    {
      slug: "cheese-at-tabuk",
      title: "Cheese at Tabuk",
      line: "At Tabuk, he ﷺ said Allah's name and cut a piece of cheese.",
      facts: ["Told by Ibn Umar", "Tabuk: far to the north of Madinah", "He called for a knife"],
      source: hadith("abudawud", "3819", "Ibn Umar", "Hasan isnad (Al-Albani)", "Ibn Umar said: a piece of cheese was brought to the Prophet ﷺ at Tabuk. He called for a knife, mentioned Allah's name and cut it.", "He called for a knife … name and cut it"),
      difficulty: 2,
      questions: [
        { q: "What was brought to him ﷺ at Tabuk?", a: "A piece of cheese", wrong: ["A piece of honeycomb", "A bowl of soup", "A basket of figs"], why: "The Prophet ﷺ was brought a piece of cheese in Tabuk, Ibn Umar said." },
        { q: "What did he ﷺ call for, to cut it?", a: "A knife", wrong: ["A spoon", "A plate", "A cup"], why: "He called for a knife, mentioned Allah's name and cut it, Ibn Umar said." },
        { q: "He ﷺ said Allah's name before he cut the cheese.", tf: true, why: "Ibn Umar said: he ﷺ mentioned Allah's name and then cut it, at Tabuk." }
      ]
    },
    {
      slug: "butter-and-dates",
      title: "Butter and dates",
      line: "On a visit, he ﷺ was offered butter and dates, which he liked.",
      facts: ["Told by Abdullah ibn Busr", "He ﷺ came to visit them", "He liked butter and dates"],
      source: hadith("abudawud", "3837", "Abdullah ibn Busr", "Sahih (Al-Albani)", "Abdullah ibn Busr said: the Messenger of Allah ﷺ came to visit us, and we offered him butter and dates, for he liked butter and dates.", "for he liked butter and dates"),
      difficulty: 1,
      questions: [
        { q: "What did Abdullah ibn Busr's family offer him ﷺ?", a: "Butter and dates", wrong: ["Meat and rice", "Figs and grapes", "Fish and lentils"], why: "He ﷺ came to visit us and we offered him butter and dates, Abdullah ibn Busr said." },
        { q: "Why did they offer him ﷺ butter and dates?", a: "He liked butter and dates", wrong: ["They were cheap that year", "Nothing else was ripe", "A guest had sent them"], why: "We offered him butter and dates, for he ﷺ liked them, Abdullah ibn Busr said." },
        { q: "He ﷺ came to visit the family of Abdullah ibn Busr.", tf: true, why: "Abdullah ibn Busr said: the Messenger of Allah ﷺ came to visit us." }
      ]
    },
    {
      slug: "old-dates-looked-over",
      title: "Old dates, looked over",
      line: "He ﷺ looked over old dates and took the worms out.",
      facts: ["Told by Anas ibn Malik", "Old dates can have worms", "He looked them over first"],
      source: hadith("abudawud", "3832", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: when the Prophet ﷺ was brought some old dates, he began to examine them and remove the worms from them.", "examine them and remove the worms from them"),
      difficulty: 2,
      questions: [
        { q: "Who told how he ﷺ looked over old dates?", a: "Anas ibn Malik", wrong: ["Abu Bakrah", "Ka'b ibn Malik", "Usamah ibn Zayd"], why: "Anas ibn Malik told it, in Sunan Abi Dawud 3832, graded sahih by Al-Albani." },
        { q: "What did he ﷺ take out of the old dates?", a: "The worms", wrong: ["The sand", "The salt", "The honey"], why: "He began to examine them and remove the worms from them, Anas said." },
        { q: "When old dates were brought, he ﷺ looked them over.", tf: true, why: "When he ﷺ was brought some old dates, he began to examine them, Anas said." }
      ]
    }
  ]
};

export const FOUNDATION_FOODS_UNITS: readonly DeepUnit[] = [FOODS];
