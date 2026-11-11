import { hadith, type DeepUnit } from "./deepKit";

// One more Marriage unit: the family a marriage builds, from Sunan an-Nasa'i, Sunan Ibn Majah, Sunan Abi Dawud and
// Jami at-Tirmidhi. Paradise beneath a mother's feet, the father as its middle door, making parents laugh again,
// knowing your family, the ties Allah named after Ar-Rahman, and caring for those you feed. Every card is one sahih
// or hasan hadith with its number, narrator and grade, and its exact English words to highlight, and none of them
// is taught anywhere else in the app.

const FAMILY: DeepUnit = {
  key: "marriage-family-ties",
  topicId: "marriage",
  branchId: "marriage-family-ties",
  branch: { title: "Family ties and Paradise", description: "Paradise beneath a mother's feet, the father as its middle door, making parents laugh, knowing your family, ties named after Ar-Rahman, and caring for those you feed." },
  name: "family ties and Paradise",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "paradise-at-her-feet",
      title: "Paradise at her feet",
      line: "Paradise is beneath your mother's feet, he ﷺ said.",
      facts: ["Told by Mu'awiyah ibn Jahimah", "His father came to ask advice"],
      source: hadith("nasai", "3104", "Mu'awiyah ibn Jahimah", "Hasan Sahih (Al-Albani)", "Mu'awiyah ibn Jahimah said: his father Jahimah came to the Prophet ﷺ and said: O Messenger of Allah, I want to go out and fight, and I have come to ask your advice. He ﷺ asked: do you have a mother? He said: yes. He ﷺ said: then stay with her, for Paradise is beneath her feet.", "Then stay with her, for Paradise is beneath her feet"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask the man who came for advice?", a: "Do you have a mother?", wrong: ["Do you have a horse?", "Do you have a sword?", "Do you have a camel?"], why: "The man said yes, so he ﷺ told him to stay with her." },
        { q: "Where is Paradise, he ﷺ told the man?", a: "Beneath his mother's feet", wrong: ["Beyond the far mountains", "Under the big palm tree", "Across the wide sea"], why: "Then stay with her, for Paradise is beneath her feet." },
        { q: "He ﷺ told the man to stay and look after his mother.", tf: true, why: "Stay with her, he ﷺ said, for Paradise is beneath her feet." }
      ]
    },
    {
      slug: "the-middle-door",
      title: "The middle door of Paradise",
      line: "A father is the middle door of Paradise, he ﷺ said.",
      facts: ["Told by Abu ad-Darda", "Use it or lose it: your choice"],
      source: hadith("ibnmajah", "3663", "Abu ad-Darda", "Sahih (Al-Albani)", "Abu ad-Darda heard the Prophet ﷺ say: the father is the middle door of Paradise, the best way into it, so it is up to you whether you make use of it or not.", "The father is the middle door of Paradise"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ call the father?", a: "The middle door of Paradise", wrong: ["The roof of the house", "The key to the market", "The wall of the city"], why: "The best way to Paradise, so make use of it." },
        { q: "Whose choice is it to use that door?", a: "Your own choice", wrong: ["Your neighbor's choice", "Your teacher's choice", "Nobody's choice"], why: "It is up to you whether you take advantage of it or not." },
        { q: "Being good to your father can be your way into Paradise.", tf: true, why: "The father is the middle door of Paradise, he ﷺ said." }
      ]
    },
    {
      slug: "make-them-laugh",
      title: "Make them laugh again",
      line: "He ﷺ sent a man home to make his weeping parents laugh.",
      facts: ["Told by Abdullah ibn Amr", "He had come to pledge to emigrate"],
      source: hadith("abudawud", "2528", "Abdullah ibn Amr", "Sahih (Al-Albani)", "A man came to the Messenger of Allah ﷺ and said: I came to pledge to you that I will emigrate, and I left my parents weeping. He ﷺ said: go back to them and make them laugh as you made them weep.", "Return to them and make them laugh as you made them weep"),
      difficulty: 1,
      questions: [
        { q: "How were the man's parents when he left home?", a: "They were weeping", wrong: ["They were laughing", "They were asleep", "They were away traveling"], why: "I left my parents weeping, the man said." },
        { q: "What did he ﷺ tell the man to do?", a: "Go back and make them laugh", wrong: ["Stay and never go home", "Send them a short letter", "Forget about them"], why: "As you made them weep, he ﷺ said." },
        { q: "Making your parents happy is a good deed.", tf: true, why: "He ﷺ sent the man back to make them laugh." }
      ]
    },
    {
      slug: "know-your-family",
      title: "Know your family tree",
      line: "Learn your family tree, so you can keep close to relatives.",
      facts: ["Told by Abu Hurairah", "Family ties bring love and more"],
      source: hadith("tirmidhi", "1979", "Abu Hurairah", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ said: learn enough about your lineage to keep your ties of kinship, for keeping the ties of kinship brings love among relatives, more wealth and a longer life.", "Learn enough about your lineage to facilitate keeping your ties of kinship"),
      difficulty: 2,
      questions: [
        { q: "Why should you learn about your family line?", a: "To keep ties with relatives", wrong: ["To boast over others", "To win an argument", "To look down on people"], why: "Learn enough about your lineage to keep your ties of kinship." },
        { q: "What does keeping family ties bring among relatives?", a: "Love", wrong: ["Arguments", "Jealousy", "Boredom"], why: "Keeping ties encourages affection among the relatives." },
        { q: "Keeping family ties increases a person's wealth and life.", tf: true, why: "It increases the wealth, and increases the lifespan, he ﷺ said." }
      ]
    },
    {
      slug: "named-after-ar-rahman",
      title: "Named after Ar-Rahman",
      line: "Allah gave family ties a name from His own Name.",
      facts: ["Told by Abdur-Rahman ibn Awf", "Known as the best at keeping ties"],
      source: hadith("tirmidhi", "1907", "Abdur-Rahman ibn Awf", "Sahih (Al-Albani)", "Abdur-Rahman ibn Awf visited a sick man, who said he was the best of them at keeping ties. He said: I heard the Messenger of Allah ﷺ say: Allah said: I am Allah, and I am Ar-Rahman. I created the Rahim, the ties of the womb, and named it after My Name. Whoever keeps it, I keep ties with him, and whoever cuts it, I cut him off.", "and named it after My Name. So whoever keeps good relations with it, I keep good relation with him"),
      difficulty: 2,
      questions: [
        { q: "After whose Name did Allah name the Rahim, family ties?", a: "His own Name, Ar-Rahman", wrong: ["The name of a king", "The name of a city", "The name of a river"], why: "I am Ar-Rahman. I created the Rahim, and named it after My Name." },
        { q: "What does Allah do for whoever keeps family ties?", a: "He keeps ties with him", wrong: ["He makes him a king", "He gives him a horse", "He makes him famous"], why: "Whoever keeps good relations with it, I keep good relation with him." },
        { q: "Cutting off family ties pleases Allah.", tf: false, why: "No. Allah cuts off whoever cuts off family ties." }
      ]
    },
    {
      slug: "those-you-feed",
      title: "Caring for those you feed",
      line: "Do not neglect the people you are meant to provide for.",
      facts: ["Told by Abdullah ibn Amr", "Neglect alone is sin enough"],
      source: hadith("abudawud", "1692", "Abdullah ibn Amr", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: it is enough of a sin for a man that he neglects those he is responsible for.", "It is sufficient sin for a man that he neglects him whom he maintains"),
      difficulty: 2,
      questions: [
        { q: "What is enough of a sin for a man, he ﷺ said?", a: "Neglecting those he provides for", wrong: ["Walking too slowly", "Living in a small house", "Riding an old camel"], why: "He neglects him whom he maintains, he ﷺ said." },
        { q: "Which of these is a man's duty at home?", a: "Caring for his family", wrong: ["Ignoring their needs", "Spending only on himself", "Leaving them hungry"], why: "It is sufficient sin for a man that he neglects him whom he maintains." },
        { q: "Neglecting your family is only a small matter.", tf: false, why: "No. Neglecting them is enough of a sin, he ﷺ said." }
      ]
    }
  ]
};

export const MARRIAGE_FAMILY_UNITS: DeepUnit[] = [FAMILY];
