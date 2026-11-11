import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: when he ﷺ prayed, from the Book of the Times of Prayer in Sahih al-Bukhari. The time of each
// of the five prayers, Zuhr when the heat breaks, the worth of Asr, Maghrib while it is still light, glad news at a
// late Isha, and Fajr in the dark. Every card is one sahih hadith with its number and narrator, and its exact English
// words to highlight, and none of them is taught anywhere else in the app.

const TIMES: DeepUnit = {
  key: "prayer-sunnah-times",
  topicId: "prayer",
  branchId: "prayer-sunnah-times",
  branch: { title: "When he ﷺ prayed", description: "The time of each prayer, Zuhr when it cools, the worth of Asr, Maghrib in the light, glad news at Isha, and Fajr in the dark." },
  name: "when he ﷺ prayed",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-times-of-the-five-prayers",
      title: "The times of the five prayers",
      line: "Abu Barzah told how he ﷺ timed each of the five prayers.",
      facts: ["Told by Abu Barzah al-Aslami", "Zuhr came just after midday", "He ﷺ liked to pray Isha later"],
      source: hadith("bukhari", "547", "Abu Barzah al-Aslami", "Sahih", "Sayyar ibn Salamah said: my father and I went to Abu Barzah al-Aslami, and my father asked him how the Messenger of Allah ﷺ prayed the five prayers. Abu Barzah said: he prayed Zuhr, which you call the first prayer, when the sun had just passed its height at midday. He prayed Asr, and after it a man could reach his house at the far end of Madinah while the sun was still hot. (The narrator forgot what he said about Maghrib.) He liked to delay Isha, which you call al-Atamah, and he disliked sleeping before it and talking after it. He would finish the Fajr prayer when a man could recognize the one sitting beside him, and he recited from 60 to 100 ayat in it.", "he disliked sleeping before it and speaking after it"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ pray Zuhr, Abu Barzah said?", a: "When the sun passed midday", wrong: ["Right at sunrise", "Just before sunset", "In the dark of night"], why: "He prayed Zuhr at midday when the sun had just declined, Abu Barzah said." },
        { q: "What did he ﷺ dislike doing before Isha?", a: "Sleeping", wrong: ["Making wudu", "Praying sunnah", "Saying the adhan"], why: "He disliked sleeping before Isha and speaking after it, Abu Barzah said." },
        { q: "He ﷺ recited many ayat in the Fajr prayer.", tf: true, why: "He used to recite between 60 and 100 ayat in Fajr, Abu Barzah said." }
      ]
    },
    {
      slug: "let-it-cool-down",
      title: "Let it cool down",
      line: "In great heat, he ﷺ said: wait for Zuhr until it cools.",
      facts: ["Told by Abu Dharr", "They were on a journey", "They waited till the hills cast shadows"],
      source: hadith("bukhari", "539", "Abu Dharr", "Sahih", "Abu Dharr said: we were with the Prophet ﷺ on a journey, and the mu'adhdhin wanted to call the adhan for Zuhr. The Prophet ﷺ said: let it become cooler. Later he wanted to call the adhan again, and he ﷺ said: let it become cooler, until we see the shadows of the hillocks. Then the Prophet ﷺ said: the fierce heat is from the raging of Hell, so when the heat is very great, pray Zuhr when it becomes cooler.", "Let it become cooler till we see the shadows of hillocks"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell the mu'adhdhin before Zuhr?", a: "Let it become cooler", wrong: ["Call it at once", "Call it twice", "Call it from the roof"], why: "Let it become cooler till we see the shadows of the hillocks, he ﷺ said." },
        { q: "Where were they when he ﷺ said to wait for the cool?", a: "On a journey", wrong: ["In the masjid", "At home", "At the market"], why: "Abu Dharr was with the Prophet ﷺ on a journey when Zuhr came." },
        { q: "In very hot weather, Zuhr may wait until it is cooler.", tf: true, why: "In very hot weather pray Zuhr when it becomes cooler, he ﷺ said." }
      ]
    },
    {
      slug: "do-not-miss-asr",
      title: "Do not miss Asr",
      line: "Missing Asr is like losing your family and your wealth.",
      facts: ["Told by Abdullah ibn Umar", "Asr is the afternoon prayer", "Pray it before the sun sets"],
      source: hadith("bukhari", "552", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: the Messenger of Allah ﷺ said: whoever misses the Asr prayer, it is as if he lost his family and his wealth.", "then it is as if he lost his family and property"),
      difficulty: 1,
      questions: [
        { q: "Missing Asr is like losing what, he ﷺ said?", a: "Your family and wealth", wrong: ["A day of work", "One night of sleep", "A small coin"], why: "Whoever misses the Asr prayer, it is as if he lost his family and property, he ﷺ said." },
        { q: "When is the Asr prayer?", a: "In the afternoon", wrong: ["At dawn", "At midnight", "At sunrise"], why: "Asr is the afternoon prayer, prayed before the sun sets." },
        { q: "Missing Asr is a small loss.", tf: false, why: "No. Missing Asr is as if one lost his family and property, he ﷺ said." }
      ]
    },
    {
      slug: "maghrib-in-the-light",
      title: "Maghrib in the light",
      line: "They prayed Maghrib early: after it, they could still see far.",
      facts: ["Told by Rafi' ibn Khadij", "Maghrib comes just after sunset", "As far as an arrow could fly"],
      source: hadith("bukhari", "559", "Rafi' ibn Khadij", "Sahih", "Rafi' ibn Khadij said: we used to pray Maghrib with the Prophet ﷺ, and when one of us left after the prayer, he could still see as far as the place where his arrow would land.", "after finishing the prayer one of us may go away and could still see"),
      difficulty: 1,
      questions: [
        { q: "After Maghrib, how far could they still see?", a: "As far as an arrow flies", wrong: ["Only to their feet", "Not at all", "Only by lamplight"], why: "He could still see as far as the spots where an arrow might reach, Rafi' said." },
        { q: "When did they pray Maghrib with him ﷺ?", a: "Soon after sunset", wrong: ["Late at night", "Just before dawn", "At noon"], why: "After praying Maghrib, one could still see where an arrow would land, Rafi' said." },
        { q: "They prayed Maghrib while there was still daylight.", tf: true, why: "After the prayer, one of them could still see as far as an arrow's reach." }
      ]
    },
    {
      slug: "glad-news-at-isha",
      title: "Glad news at Isha",
      line: "He ﷺ told them: none but you prays at this hour.",
      facts: ["Told by Abu Musa al-Ash'ari", "His boat companions took turns at Isha", "He ﷺ was busy, so Isha came late"],
      source: hadith("bukhari", "567", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa said: my companions who came with me on the boat and I stayed at a place called Baqi' Buthan, while the Prophet ﷺ was in Madinah. Every night, one of us would go in turn to the Prophet ﷺ at the time of the Isha prayer. One night my companions and I went to him, and he was busy with some of his affairs, so Isha was delayed until the middle of the night. Then he came out and led the people in prayer. When he finished, he said to those there: wait, do not go. Have glad news: it is a blessing of Allah upon you that no one among the people has prayed at this hour except you. Abu Musa said: so we went back happy with what we had heard from the Messenger of Allah ﷺ.", "It is from the blessing of Allah upon you that none amongst mankind has prayed at this time save you"),
      difficulty: 2,
      questions: [
        { q: "Why was Isha late that night?", a: "He ﷺ was busy", wrong: ["The rain was heavy", "The imam was away", "The lamps went out"], why: "He was busy in some of his affairs, so the Isha prayer was delayed, Abu Musa said." },
        { q: "What glad news did he ﷺ give after the prayer?", a: "None but them prayed at that hour", wrong: ["Rain would come soon", "They had won a battle", "A guest was coming"], why: "None amongst mankind has prayed at this time save you, he ﷺ said." },
        { q: "Abu Musa and his companions went home happy.", tf: true, why: "So we returned happily after what we heard from Allah's Messenger ﷺ, Abu Musa said." }
      ]
    },
    {
      slug: "fajr-in-the-dark",
      title: "Fajr in the dark",
      line: "Women prayed Fajr with him ﷺ while it was still dark.",
      facts: ["Told by Aishah", "They came wrapped in their sheets", "No one could recognize them in the dark"],
      source: hadith("bukhari", "578", "Aishah", "Sahih", "Aishah said: the believing women, wrapped in their sheets, used to attend the Fajr prayer with the Messenger of Allah ﷺ. After the prayer they went back to their homes, and no one could recognize them because of the darkness.", "after finishing the prayer they would return to their home and nobody could recognize them because of darkness"),
      difficulty: 1,
      questions: [
        { q: "Why could no one recognize the women after Fajr?", a: "Because of the darkness", wrong: ["They walked very fast", "They left before the prayer", "Their homes were far away"], why: "Nobody could recognize them because of darkness, Aishah said." },
        { q: "Where did the women go after the Fajr prayer?", a: "Back to their homes", wrong: ["To the market", "To the date farms", "To a feast"], why: "After finishing the prayer they would return to their home, Aishah said." },
        { q: "Believing women attended the Fajr prayer with him ﷺ.", tf: true, why: "The believing women used to attend Fajr with Allah's Messenger ﷺ, Aishah said." }
      ]
    }
  ]
};

export const PRAYER_TIMES_UNITS: DeepUnit[] = [TIMES];
