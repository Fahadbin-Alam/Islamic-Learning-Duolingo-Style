import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: rain, cold and heat, from Sahih al-Bukhari, Jami at-Tirmidhi and Sunan Abi Dawud. Pray in your
// homes on a cold, stormy night, a rainy Friday without walking in mud, praying in place in the rain on a journey, the
// prayer early in the cold, clothes spread to prostrate on in the heat, and pebbles cooled in the hand. Every card is
// one sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight. Points the
// schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const WEATHER: DeepUnit = {
  key: "prayer-rain-cold-and-heat",
  topicId: "prayer",
  branchId: "prayer-rain-cold-and-heat",
  branch: { title: "Rain, cold and heat", description: "Pray in your homes on a stormy night, a muddy Friday, praying in place in the rain, early in the cold, and clothes and pebbles in the heat." },
  name: "praying in rain, cold and heat",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "pray-in-your-homes",
      title: "Pray in your homes",
      line: "On cold, rainy nights, he ﷺ had the caller say: pray at home.",
      facts: ["Told by Ibn Umar", "A very cold and stormy night", "Mu'adhdhin: the one who calls the adhan"],
      source: hadith("bukhari", "666", "Ibn Umar", "Sahih", "Nafi said: on a very cold and stormy night, Ibn Umar called the adhan and then said: pray in your homes. He said: on very cold and rainy nights, the Messenger of Allah ﷺ used to tell the mu'adhdhin to say: pray in your homes.", "Once on a very cold and stormy night"),
      difficulty: 1,
      questions: [
        { q: "On what kind of night did Ibn Umar say: pray in your homes?", a: "A very cold, stormy night", wrong: ["A hot, still night", "A clear, warm night", "A calm, dry night"], why: "Nafi said: once on a very cold and stormy night, Ibn Umar called the adhan for the prayer." },
        { q: "Whom did he ﷺ tell to say: pray in your homes?", a: "The mu'adhdhin", wrong: ["The traders", "The children", "The water carriers"], why: "On very cold and rainy nights he ﷺ told the mu'adhdhin to say so, Ibn Umar said." },
        { q: "On very cold, rainy nights, people could pray in their homes.", tf: true, why: "Ibn Umar said he ﷺ used to tell the mu'adhdhin to say so on such nights." }
      ]
    },
    {
      slug: "mud-and-slush",
      title: "Mud and slush",
      line: "On a rainy Friday, Ibn Abbas spared people walking in mud.",
      facts: ["Told by Ibn Abbas", "A rainy day of Jumu'ah", "Pray in your houses"],
      source: hadith("bukhari", "901", "Ibn Abbas", "Sahih", "Muhammad ibn Sirin said: on a rainy day Ibn Abbas told his mu'adhdhin to say: pray in your houses. People disliked it, and he said: one much better than I, the Prophet ﷺ, did it. Jumu'ah is compulsory, but I dislike to make you walk out in mud and slush.", "I dislike to put you to task by bringing you out walking in mud and slush"),
      difficulty: 2,
      questions: [
        { q: "What did Ibn Abbas not want people to walk through?", a: "Mud and slush", wrong: ["Sand and dust", "Thorns and stones", "Grass and leaves"], why: "I dislike to bring you out walking in mud and slush, Ibn Abbas said on that rainy day." },
        { q: "Who told his mu'adhdhin to say on a rainy day: pray in your houses?", a: "Ibn Abbas", wrong: ["Ibn Masud", "Ibn Amr", "Ibn az-Zubayr"], why: "Ibn Abbas did so on a rainy Friday, saying one much better than he had done it." },
        { q: "Ibn Abbas said one much better than he had done the same.", tf: true, why: "One much better than I, the Prophet ﷺ, did it, Ibn Abbas said." }
      ]
    },
    {
      slug: "pray-where-you-are",
      title: "Pray where you are",
      line: "When rain fell on a journey, they could pray where they were.",
      facts: ["Told by Jabir ibn Abdullah", "On a journey, in the rain", "Whoever wishes"],
      source: hadith("tirmidhi", "409", "Jabir ibn Abdullah", "Sahih (Darussalam)", "Jabir said: we were with the Prophet ﷺ on a journey when it started to rain on us, so the Prophet ﷺ said: whoever wishes, let him pray in his place.", "Whoever wishes, let him perform Salat in his place"),
      difficulty: 1,
      questions: [
        { q: "Where were they when the rain started?", a: "On a journey", wrong: ["In the market", "At a funeral", "At a wedding feast"], why: "Jabir and others were with him ﷺ on a journey when it started to rain on them." },
        { q: "On that journey, everyone had to pray together in the rain.", tf: false, why: "No. When rain fell on the journey, he ﷺ said: whoever wishes, let him pray in his place." },
        { q: "Who could pray in his place, he ﷺ said?", a: "Whoever wished", wrong: ["Only the old men", "Only the sick men", "Only the young men"], why: "Whoever wishes, let him perform Salat in his place, he ﷺ said on the journey." }
      ]
    },
    {
      slug: "early-in-the-cold",
      title: "Early in the cold",
      line: "In very cold weather, he ﷺ offered the prayer early.",
      facts: ["Told by Anas ibn Malik", "When it was very cold", "He ﷺ offered the prayer earlier"],
      source: hadith("bukhari", "906", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: the Prophet ﷺ used to offer the prayer earlier if it was very cold, and if it was very hot he used to delay it, meaning the Jumu'ah prayer.", "used to offer the prayer earlier if it was very cold"),
      difficulty: 1,
      questions: [
        { q: "What weather made him ﷺ offer the prayer earlier?", a: "Very cold weather", wrong: ["Very hot weather", "Very windy weather", "Very dry weather"], why: "If it was very cold, he ﷺ used to offer the prayer earlier, Anas said." },
        { q: "In very cold weather, he ﷺ used to offer the prayer earlier.", tf: true, why: "The Prophet ﷺ used to offer the prayer earlier if it was very cold, Anas ibn Malik said." },
        { q: "Who told how he ﷺ prayed when it was very cold?", a: "Anas ibn Malik", wrong: ["Sa'd ibn Abi Waqqas", "Ubayy ibn Ka'b", "Talhah ibn Ubaydullah"], why: "Anas ibn Malik said he ﷺ used to offer the prayer earlier if it was very cold." }
      ]
    },
    {
      slug: "clothes-in-the-heat",
      title: "Prostrating on clothes",
      line: "In scorching heat, some spread their clothes to prostrate on.",
      facts: ["Told by Anas ibn Malik", "Praying with him ﷺ in scorching heat", "Too hot to put the face on the earth"],
      source: hadith("bukhari", "1208", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: we used to pray with the Prophet ﷺ in scorching heat, and if one of us could not put his face on the earth because of the heat, he would spread his clothes and prostrate on them.", "then he would spread his clothes and prostrate over them"),
      difficulty: 1,
      questions: [
        { q: "Why could some not put their face on the earth?", a: "Because of the heat", wrong: ["Because of the rain", "Because of the cold", "Because of the mud"], why: "Anas prayed with him ﷺ in scorching heat, when the earth was too hot." },
        { q: "Anas prayed with him ﷺ even in scorching heat.", tf: true, why: "If one of them could not put his face on the earth, he spread his clothes, Anas said." },
        { q: "What did some spread on the hot earth to prostrate on?", a: "Their clothes", wrong: ["Their shields", "Their saddle cloths", "Their water skins"], why: "He would spread his clothes and prostrate over them, Anas said of the scorching heat." }
      ]
    },
    {
      slug: "cool-pebbles",
      title: "Cooling the pebbles",
      line: "Jabir cooled pebbles in his hand to prostrate on them.",
      facts: ["Told by Jabir ibn Abdullah", "At the noon prayer, in great heat", "Pebbles: small stones"],
      source: hadith("abudawud", "399", "Jabir ibn Abdullah", "Hasan (Al-Albani)", "Jabir ibn Abdullah said: I would pray the noon prayer with the Messenger of Allah ﷺ and take a handful of pebbles so they would become cold in my hand, and place them to put my forehead on when I prostrated. I did this because of the intense heat.", "took a handful of gravels so that they might become cold in my hand"),
      difficulty: 2,
      questions: [
        { q: "What did Jabir cool in his hand to prostrate on?", a: "Stones", wrong: ["Dates", "Bread", "Figs"], why: "He took a handful of small stones so they might become cold in his hand, Jabir said." },
        { q: "Which prayer was Jabir praying when it was so hot?", a: "The noon prayer", wrong: ["The dawn prayer", "The night prayer", "The sunset prayer"], why: "Jabir would offer his noon prayer with the Messenger of Allah ﷺ in the intense heat." },
        { q: "Jabir cooled the pebbles because of the intense heat.", tf: true, why: "He placed them so he could put his forehead on them when he prostrated, Jabir said." }
      ]
    }
  ]
};

export const PRAYER_WEATHER_UNITS: readonly DeepUnit[] = [WEATHER];
