import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: helping people, from Sahih al-Bukhari, Sunan Abi Dawud and Jami at-Tirmidhi.
// Showing someone the way, sitting with a woman who needed him ﷺ, never saying no, the masjid helper, leading someone
// to good, and the help that comes through the poor. Every card is one sahih or hasan hadith with its number, narrator
// and grade, and its exact English words to highlight, and none of them is taught anywhere else in the app.

const HELPING: DeepUnit = {
  key: "kids-helping-people",
  topicId: "hadith",
  branchId: "hadith-helping",
  branch: { title: "Helping people", description: "Showing the way, sitting with someone who needs you, never saying no, caring for the masjid helper, leading to good, and help through the poor." },
  name: "helping people",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "show-someone-the-way",
      title: "Show someone the way",
      line: "Giving milk or silver, or showing the way, earns a big reward.",
      facts: [
        "Al-Bara ibn Azib told it.",
        "Its reward is like freeing a slave.",
        "Showing someone the way is a gift too."
      ],
      source: hadith("tirmidhi", "1957", "Al-Bara ibn Azib", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ said: whoever gives someone some milk or silver, or guides him through a narrow lane, has a reward like freeing a slave.", "Whoever gives someone some milk or silver, or guides him through a strait, then he will have the reward similar to freeing a slave"),
      difficulty: 1,
      questions: [
        { q: "What reward is it to show a lost person the way?", a: "Like freeing a slave", wrong: ["Like eating a meal", "Like winning a race", "Like buying a toy"], why: "He will have the reward similar to freeing a slave, he ﷺ said." },
        { q: "Which of these did he ﷺ say brings that reward?", a: "Giving milk or silver", wrong: ["Keeping all your toys", "Hiding your snacks", "Running ahead alone"], why: "Whoever gives someone some milk or silver has that reward, he ﷺ said." },
        { q: "Helping someone find their way is a good deed.", tf: true, why: "Guiding someone through a narrow lane has a reward like freeing a slave, he ﷺ said." }
      ]
    },
    {
      slug: "he-sat-with-her",
      title: "He sat with her",
      line: "He ﷺ sat in the street with a woman who needed him.",
      facts: [
        "Anas ibn Malik told it.",
        "A woman said: I need something from you.",
        "He ﷺ let her choose the place to sit."
      ],
      source: hadith("abudawud", "4818", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas said: a woman came to the Messenger of Allah ﷺ and said: Messenger of Allah, I need something from you. He ﷺ said: mother of so-and-so, sit in the corner of any street you wish, and I shall sit with you. She sat, and he ﷺ sat with her until she had what she needed.", "sit in the corner of any street you wish and I shall sit with you"),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ tell the woman to sit?", a: "Any street corner she liked", wrong: ["Only at his house", "Far outside the city", "On top of a hill"], why: "Sit in the corner of any street you wish, and I shall sit with you, he ﷺ said." },
        { q: "How long did he ﷺ stay with her?", a: "Until she had what she needed", wrong: ["Just one minute", "Until it got dark", "Only until lunch"], why: "He ﷺ sat with her till she fulfilled her need, Anas said." },
        { q: "He ﷺ made time for a woman who needed help.", tf: true, why: "He ﷺ sat with the woman in the street till her need was met, Anas said." }
      ]
    },
    {
      slug: "never-said-no",
      title: "He never said no",
      line: "When asked for something, he ﷺ never answered no.",
      facts: [
        "Jabir ibn Abdullah told it.",
        "People often asked him ﷺ for things.",
        "He ﷺ would give what he was asked."
      ],
      source: hadith("bukhari", "6034", "Jabir ibn Abdullah", "Sahih", "Jabir said: the Prophet ﷺ was never asked for anything and answered no.", "asked for a thing to be given for which his answer was"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ never say when asked for something?", a: "No", wrong: ["Yes", "Thank you", "Bismillah"], why: "Jabir said he ﷺ was never asked for a thing and answered no." },
        { q: "A friend asks to borrow your pencil. What follows his ﷺ way?", a: "Give it to your friend", wrong: ["Say no and walk away", "Hide it in your bag", "Pretend you have none"], why: "He ﷺ gave what he was asked for, so be glad to share too." },
        { q: "He ﷺ was very generous with what people asked for.", tf: true, why: "Never was he ﷺ asked for a thing to be given and his answer was no, Jabir said." }
      ]
    },
    {
      slug: "the-masjid-helper",
      title: "The masjid helper",
      line: "Someone who swept the masjid died, and he ﷺ asked after them.",
      facts: [
        "Abu Hurairah told it.",
        "He ﷺ asked why they did not inform him.",
        "He ﷺ prayed for the helper at the grave."
      ],
      source: hadith("bukhari", "458", "Abu Hurairah", "Sahih", "Abu Hurairah said: a man or a woman who used to sweep the masjid died. The Prophet ﷺ asked about them and was told they had died. He said: why did you not inform me? Show me the grave. Then he ﷺ went to the grave and prayed the funeral prayer there.", "Why did you not inform me? Show me his grave"),
      difficulty: 1,
      questions: [
        { q: "What job did the masjid helper do?", a: "Swept the masjid", wrong: ["Called the adhan", "Led the prayer", "Sold dates outside"], why: "A man or a woman used to sweep the mosque, Abu Hurairah said." },
        { q: "What did he ﷺ ask to be shown?", a: "The helper's grave", wrong: ["The helper's broom", "The helper's house", "The helper's family"], why: "Show me his grave, he ﷺ said, and then he went and prayed there." },
        { q: "To him ﷺ, even the masjid helper was important.", tf: true, why: "He ﷺ asked why they did not inform him, then prayed at the grave." }
      ]
    },
    {
      slug: "leading-to-good",
      title: "Leading someone to good",
      line: "Whoever leads someone to good is like the one who does it.",
      facts: [
        "Anas ibn Malik told it.",
        "A man needed a ride, but he ﷺ had none to give.",
        "The man was sent to someone who gave him one."
      ],
      source: hadith("tirmidhi", "2670", "Anas ibn Malik", "Hasan Sahih (Al-Albani)", "Anas said: a man came to the Prophet ﷺ asking for an animal to ride, but he ﷺ had none to give him. The man was sent to another person, who gave him one. He came back and told the Prophet ﷺ, who said: whoever leads to good is like the one who does it.", "Whoever leads to good, he is like the one who does it"),
      difficulty: 1,
      questions: [
        { q: "What did the man come to the Prophet ﷺ for?", a: "Something to ride", wrong: ["A new house", "A warm coat", "A bag of gold"], why: "A man came to the Prophet ﷺ to get a mount, Anas said, but he ﷺ had none." },
        { q: "Whoever leads someone to good is like whom, he ﷺ said?", a: "The one who does it", wrong: ["The one who forgets it", "The one who hides it", "The one who ignores it"], why: "Whoever leads to good is like its doer, he ﷺ told the man when he came back." },
        { q: "Sending someone to a person who can help is a good deed.", tf: true, why: "Whoever leads to good is like the one who does it, he ﷺ said." }
      ]
    },
    {
      slug: "help-through-the-poor",
      title: "Help comes through the poor",
      line: "Allah gives us help and food because of the poor among us.",
      facts: [
        "Mus'ab ibn Sa'd told it.",
        "He ﷺ said it to Mus'ab's father, Sa'd.",
        "Never look down on the poor."
      ],
      source: hadith("bukhari", "2896", "Mus'ab ibn Sa'd", "Sahih", "Mus'ab ibn Sa'd said: Sa'd thought he was above those below him. The Prophet ﷺ said: you are only helped and given provision because of the poor among you.", "You gain no victory or livelihood except through"),
      difficulty: 1,
      questions: [
        { q: "Because of whom are we helped and given food, he ﷺ said?", a: "The poor among us", wrong: ["The richest people", "The strongest people", "The loudest people"], why: "You gain no victory or livelihood except through the poor amongst you, he ﷺ said." },
        { q: "What did he ﷺ teach about people who have less?", a: "They bring help to us", wrong: ["They are not important", "They should stay away", "They slow us down"], why: "He ﷺ said it when Sa'd thought he was above those below him." },
        { q: "Being rich makes you better than a poor person.", tf: false, why: "No. He ﷺ told Sa'd that help and food come through the poor." }
      ]
    }
  ]
};

export const KIDS_HELPING_UNITS: DeepUnit[] = [HELPING];
