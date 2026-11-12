import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: du'as for other people, from Jami at-Tirmidhi, Sunan Abi Dawud and Sahih al-Bukhari. Seven
// times for one who is ill, a blessing for the host, a du'a after eating with a family, forgiveness for the living
// and the dead in the funeral prayer, guidance for the tribe of Daws, and blessed food measures for Madinah. Every
// card is one sahih hadith with its number, narrator and grade, and its exact English words to highlight. Points the
// schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const FOR_OTHERS: DeepUnit = {
  key: "duas-for-others",
  topicId: "duas",
  branchId: "duas-for-other-people",
  branch: { title: "Du'as for other people", description: "Seven times for the sick, a blessing for the host, thanks for a meal, the living and the dead, guidance for a tribe, and blessed food." },
  name: "du'as for other people",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "seven-times-for-the-sick",
      title: "Seven times for the sick",
      line: "Visiting the sick? Ask Allah seven times to cure them.",
      facts: ["Told by Ibn Abbas", "As'alullah al-'Azim, Rabbal-'Arshil-'Azim, an yashfiyak", "Said seven times at the side of one who is ill"],
      source: hadith("tirmidhi", "2083", "Ibn Abbas", "Sahih (Al-Albani)", "Ibn Abbas said: the Prophet ﷺ said: no Muslim visits someone who is ill, whose time of death has not come, and says seven times: I ask Allah the Magnificent, Lord of the Magnificent Throne, to cure you, except that he will be cured.", "I ask Allah the Magnificent, Lord of the Magnificent Throne"),
      difficulty: 1,
      questions: [
        { q: "How many times does the visitor say the du'a?", a: "Seven", wrong: ["Once", "Twice", "Forty"], why: "And he says seven times: I ask Allah the Magnificent to cure you, he ﷺ said." },
        { q: "Whom do we ask to cure the sick person?", a: "Allah, Lord of the Throne", wrong: ["The stars", "A lucky charm", "The wind"], why: "I ask Allah the Magnificent, Lord of the Magnificent Throne, to cure you." },
        { q: "We can make du'a for a sick friend when we visit.", tf: true, why: "Visiting one who is ill, say seven times: I ask Allah to cure you." }
      ]
    },
    {
      slug: "bless-the-host",
      title: "A blessing for the host",
      line: "Asked by his host, he ﷺ prayed: O Allah, bless them.",
      facts: ["Told by Abdullah ibn Busr", "He ﷺ was a guest of Abdullah's father", "His host held the rein of his ride and asked for a du'a"],
      source: hadith("abudawud", "3729", "Abdullah ibn Busr", "Sahih (Al-Albani)", "Abdullah ibn Busr said: the Messenger of Allah ﷺ came to my father as his guest. He offered him food, and then a drink. When he ﷺ got up to leave, my father held the rein of his mount and said: pray to Allah for me. He ﷺ said: O Allah, bless them in what You have provided them, and have mercy on them.", "O Allah, bless them in what you provided them, and have mercy on them"),
      difficulty: 1,
      questions: [
        { q: "What did the host ask for as he ﷺ was leaving?", a: "A du'a for him", wrong: ["A gift of gold", "A new camel", "A book of poems"], why: "My father held the rein of his mount and said: Pray to Allah for me." },
        { q: "What did he ﷺ ask Allah to bless them in?", a: "What Allah provided them", wrong: ["Their fame", "Their big houses", "Their fine clothes"], why: "O Allah, bless them in what you provided them, he ﷺ said." },
        { q: "A guest can make du'a for the people who fed him.", tf: true, why: "Asked by his host, he ﷺ said: O Allah, bless them and have mercy on them." }
      ]
    },
    {
      slug: "after-eating-with-a-family",
      title: "Thanks for a meal",
      line: "After a meal, he ﷺ prayed: may the pious eat your food.",
      facts: ["Told by Anas ibn Malik", "He ﷺ visited Sa'd ibn Ubadah", "He ﷺ asked that the angels pray for blessing on them"],
      source: hadith("abudawud", "3854", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Prophet ﷺ came to visit Sa'd ibn Ubadah, who brought him bread and olive oil, and he ate. Then he ﷺ said: may those who fast break their fast with you, may the pious eat your food, and may the angels pray for blessing on you.", "break their fast with you, and the pious eat your food, and the angels pray for blessing on you"),
      difficulty: 2,
      questions: [
        { q: "What did Sa'd bring him ﷺ to eat?", a: "Bread and olive oil", wrong: ["Roast meat", "Dates and milk", "Honey cakes"], why: "He brought bread and olive oil, and he ﷺ ate, Anas said." },
        { q: "In his du'a, who would pray for blessing on Sa'd's family?", a: "The angels", wrong: ["The market traders", "The poets", "The guards"], why: "And the angels pray for blessing on you, he ﷺ said." },
        { q: "He ﷺ prayed that the pious would eat Sa'd's food.", tf: true, why: "And the pious eat your food, he ﷺ said after eating with Sa'd." }
      ]
    },
    {
      slug: "the-living-and-the-dead",
      title: "For the living and the dead",
      line: "He ﷺ prayed for our living and our dead, young and old.",
      facts: ["Told by Abu Hurairah", "Said in the funeral prayer", "Our young and our old, our men and our women"],
      source: hadith("abudawud", "3201", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: when the Messenger of Allah ﷺ prayed the funeral prayer, he said: O Allah, forgive those of us who are living and those of us who are dead, those present and those absent, our young and our old, our men and our women. O Allah, whoever of us You keep alive, keep him alive as a believer, and whoever of us You take, take him as a follower of Islam. O Allah, do not keep from us the reward, and do not let us go astray after him.", "O Allah, forgive those of us who are living and those of us who are dead"),
      difficulty: 2,
      questions: [
        { q: "When did he ﷺ say the du'a for our living and our dead?", a: "In the funeral prayer", wrong: ["At a wedding feast", "On the way to market", "At the Eid meal"], why: "When he prayed over a dead person, he said: O Allah, forgive those of us living." },
        { q: "Whom did he ﷺ ask Allah to forgive?", a: "Our living and our dead", wrong: ["Only our old", "Only those present", "Only our men"], why: "Forgive those of us who are living and those of us who are dead, he ﷺ said." },
        { q: "Our young and our old are named in the du'a.", tf: true, why: "Our young and our old, our male and our female, he ﷺ said." }
      ]
    },
    {
      slug: "guide-them",
      title: "Guide them, O Allah",
      line: "Asked to pray against a tribe, he ﷺ asked for its guidance.",
      facts: ["Told by Abu Hurairah", "At-Tufail ibn Amr came from the tribe of Daws", "People thought he ﷺ would pray against them"],
      source: hadith("bukhari", "6397", "Abu Hurairah", "Sahih", "Abu Hurairah said: at-Tufail ibn Amr came to the Messenger of Allah ﷺ and said: the tribe of Daws has disobeyed and refused Islam, so pray to Allah against them. The people thought he ﷺ would pray against them, but he said: O Allah, guide the tribe of Daws and bring them to us.", "O Allah! Guide the tribe Of Daus and let them come to us"),
      difficulty: 2,
      questions: [
        { q: "Why did at-Tufail ask him ﷺ to pray against Daws?", a: "They had refused Islam", wrong: ["They had no water", "They lived far away", "They were too few"], why: "The tribe of Daus has disobeyed and refused to embrace Islam, at-Tufail said." },
        { q: "What did he ﷺ ask Allah for, for Daws?", a: "Guidance for them", wrong: ["Wealth for them", "Rain for them", "Fame for them"], why: "O Allah! Guide the tribe of Daus and let them come to us, he ﷺ said." },
        { q: "People thought he ﷺ would pray against Daws.", tf: true, why: "The people thought so, but he prayed for Daws to be guided instead." }
      ]
    },
    {
      slug: "bless-their-measures",
      title: "Blessed food for Madinah",
      line: "He ﷺ asked Allah to bless the food measures of Madinah.",
      facts: ["Told by Anas ibn Malik", "The mudd and the sa' were measures for food", "He ﷺ meant the people of Madinah"],
      source: hadith("bukhari", "2130", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: the Messenger of Allah ﷺ said: O Allah, bless their measures, bless their mudd and their sa'. He ﷺ meant the people of Madinah.", "O Allah bestow your blessings on their measures, bless their Mudd and Sa"),
      difficulty: 1,
      questions: [
        { q: "For which people did he ﷺ make du'a?", a: "The people of Madinah", wrong: ["The people of Rome", "The people of Persia", "The traders of Egypt"], why: "The Prophet ﷺ meant the people of Medina, Anas said." },
        { q: "What did he ﷺ ask Allah to bless?", a: "Their food measures", wrong: ["Their horses", "Their palaces", "Their city walls"], why: "O Allah, bestow your blessings on their measures, their Mudd and Sa." },
        { q: "The mudd and the sa' were used to measure food.", tf: true, why: "Bless their Mudd and Sa, he ﷺ said: the measures they used." }
      ]
    }
  ]
};

export const DUA_FOR_OTHERS_UNITS: readonly DeepUnit[] = [FOR_OTHERS];
