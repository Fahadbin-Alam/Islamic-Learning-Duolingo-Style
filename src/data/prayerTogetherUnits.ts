import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: together at the masjid, from Sunan Abi Dawud and Sahih al-Bukhari. The wolf and the lone sheep,
// the more the dearer to Allah, walking out like a pilgrim, a place ready in Paradise, late but still rewarded, and
// joining the row. Every card is one sahih or hasan hadith with its number, narrator and grade, and its exact
// English words to highlight, and none of them is taught anywhere else in the app.

const TOGETHER: DeepUnit = {
  key: "prayer-together",
  topicId: "prayer",
  branchId: "prayer-together",
  branch: { title: "Together at the masjid", description: "The wolf and the lone sheep, the more the dearer to Allah, walking out like a pilgrim, a place in Paradise, late but rewarded, and joining the row." },
  name: "praying together at the masjid",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-lone-sheep",
      title: "The wolf and the lone sheep",
      line: "Pray together: the wolf eats the sheep that strays alone.",
      facts: ["Told by Abu ad-Darda", "Even just three men in a village"],
      source: hadith("abudawud", "547", "Abu ad-Darda", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: if three men in a village or in the desert do not pray together, Shaytan takes hold of them. So keep to the congregation, for the wolf eats only the sheep that strays from the flock.", "for the wolf eats only the straggling animal"),
      difficulty: 1,
      questions: [
        { q: "Which sheep does the wolf eat, he ﷺ said?", a: "The one that strays alone", wrong: ["The biggest sheep", "The fastest sheep", "The one in the middle"], why: "So keep to the congregation, for the wolf eats only the straggler." },
        { q: "What happens to three men in a village who do not pray together?", a: "Shaytan takes hold of them", wrong: ["They grow very rich", "They become very strong", "They all sleep well"], why: "The devil has got the mastery over them, he ﷺ said." },
        { q: "Praying together keeps you safe, like sheep in a flock.", tf: true, why: "For the wolf eats only the straggling animal, he ﷺ said." }
      ]
    },
    {
      slug: "the-more-the-dearer",
      title: "The more, the dearer to Allah",
      line: "The more people pray together, the more it pleases Allah.",
      facts: ["Told by Ubayy ibn Ka'b", "Said after the dawn prayer"],
      source: hadith("abudawud", "554", "Ubayy ibn Ka'b", "Hasan (Al-Albani)", "After the dawn prayer the Prophet ﷺ said: the first row is like the row of the angels. A man's prayer with one other is purer than his prayer alone, his prayer with two is purer than with one, and the more there are, the more pleasing it is to Allah.", "his prayer with two men is purer than his prayer with one, but if there are more it is more pleasing to Allah"),
      difficulty: 2,
      questions: [
        { q: "What is the first row like, he ﷺ said?", a: "The row of the angels", wrong: ["The row of the kings", "The back of the masjid", "The row of the guards"], why: "If you knew its excellence, you would race to join it." },
        { q: "Which is purer than praying all alone?", a: "Praying with one other person", wrong: ["Praying in a hurry", "Praying half asleep", "Praying very loudly"], why: "And with two men is purer than with one, he ﷺ said." },
        { q: "Allah is more pleased when more people pray together.", tf: true, why: "His prayer with two is purer than with one, and more is better still." }
      ]
    },
    {
      slug: "like-a-pilgrim",
      title: "Walking out like a pilgrim",
      line: "Walking to the masjid with wudu is like setting out for Hajj.",
      facts: ["Told by Abu Umamah", "Duha brings the reward of Umrah"],
      source: hadith("abudawud", "558", "Abu Umamah", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: whoever leaves his house with wudu for an obligatory prayer has a reward like a pilgrim in ihram. Whoever goes out only for the Duha prayer has a reward like one doing Umrah. A prayer after a prayer, with no idle talk between them, is written in Illiyyun.", "his reward will be like that of one who goes for hajj pilgrimage after wearing ihram"),
      difficulty: 2,
      questions: [
        { q: "Leaving home with wudu for an obligatory prayer is like what?", a: "Setting out for Hajj in ihram", wrong: ["Buying a new house", "Planting a date palm", "Riding a fast horse"], why: "His reward will be like a pilgrim who has put on ihram." },
        { q: "Going out for the Duha prayer earns a reward like what?", a: "Umrah", wrong: ["Zakat", "A month of fasting", "Three times Hajj"], why: "He who goes out for the mid-morning prayer gets the reward of one doing umrah." },
        { q: "A prayer after a prayer, with no idle talk between, is written in Illiyyun.", tf: true, why: "It will be recorded in Illiyyun, he ﷺ said." }
      ]
    },
    {
      slug: "a-place-in-paradise",
      title: "A place ready in Paradise",
      line: "Each trip to the masjid, Allah readies a place in Paradise.",
      facts: ["Told by Abu Hurairah", "Morning and afternoon, every time"],
      source: hadith("bukhari", "662", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: whoever goes to the mosque in the morning and in the afternoon, Allah prepares for him an honored place in Paradise each time he goes.", "an honorable place in Paradise with good hospitality"),
      difficulty: 1,
      questions: [
        { q: "What does Allah prepare for whoever goes to the masjid?", a: "An honored place in Paradise", wrong: ["A bag of gold coins", "A big house in town", "A fast new horse"], why: "With good hospitality, for every morning and afternoon going." },
        { q: "How often does Allah prepare it?", a: "Every time he goes", wrong: ["Only once a year", "Only on Eid", "Only in Ramadan"], why: "For every morning and afternoon going, he ﷺ said." },
        { q: "Going to the masjid only counts on Fridays.", tf: false, why: "No. Every morning and afternoon going to the masjid counts." }
      ]
    },
    {
      slug: "late-but-rewarded",
      title: "Late, but still rewarded",
      line: "If you came with wudu but missed it, Allah still rewards you.",
      facts: ["Told by Abu Hurairah", "Their own reward is not cut"],
      source: hadith("abudawud", "564", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: whoever makes wudu well, then goes to the mosque and finds the people have finished the prayer, Allah gives him a reward like those who prayed in congregation, and nothing is taken from their reward.", "Allah will give him a reward like one who prayed in congregation and attended it"),
      difficulty: 2,
      questions: [
        { q: "What does Allah give the man who found the prayer already over?", a: "The reward of those who prayed", wrong: ["Nothing at all", "Half a reward", "A sin for being late"], why: "Allah will give him a reward like one who prayed in congregation." },
        { q: "What must he do well before he goes, he ﷺ said?", a: "His wudu", wrong: ["His meal", "His errands", "His chores"], why: "Whoever performs ablution, and performs his ablution perfectly." },
        { q: "Those who prayed on time lose some reward to the latecomer.", tf: false, why: "No. The reward of those who prayed will not be curtailed." }
      ]
    },
    {
      slug: "join-the-row",
      title: "Join the row",
      line: "Stand shoulder to shoulder, and close the gaps in the row.",
      facts: ["Told by Abdullah ibn Umar", "Leave no openings for Shaytan"],
      source: hadith("abudawud", "666", "Abdullah ibn Umar", "Sahih (Al-Albani)", "The Prophet ﷺ said: set the rows straight, stand shoulder to shoulder, close the gaps, let your brothers move you gently into line, and leave no openings for Shaytan. Whoever joins up a row, Allah joins him; whoever breaks a row, Allah cuts him off.", "If anyone joins up a row, Allah will join him up"),
      difficulty: 1,
      questions: [
        { q: "How should people stand in the row, he ﷺ said?", a: "Shoulder to shoulder", wrong: ["Far apart", "One behind another", "Facing each other"], why: "Close the gaps, and do not leave openings for the devil." },
        { q: "What does Allah do for whoever joins up a row?", a: "Allah joins him up", wrong: ["Allah makes him imam", "Allah gives him a horse", "Allah lets him leave early"], why: "But whoever breaks a row, Allah will cut him off." },
        { q: "Gaps in the row leave openings for Shaytan.", tf: true, why: "Do not leave openings for the devil, he ﷺ said." }
      ]
    }
  ]
};

export const PRAYER_TOGETHER_UNITS: DeepUnit[] = [TOGETHER];
