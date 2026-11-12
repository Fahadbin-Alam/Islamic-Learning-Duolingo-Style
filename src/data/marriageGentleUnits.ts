import { hadith, type DeepUnit } from "./deepKit";

// One more Marriage and family unit: gentle with children, from Sahih Muslim, Sunan an-Nasa'i, Jami at-Tirmidhi and
// Sahih al-Bukhari. He ﷺ went into a smoky house to kiss his baby son, stayed in sujud while a child rode on his back,
// came down from the minbar for two stumbling boys, Abu Bakr kissed his sick daughter's cheek, children are kept close
// at nightfall, and a father who lost his son was told the boy waits at Paradise's gate. Every card is one sahih hadith
// with its number, narrator and grade, and its exact English words to highlight, and none of them is taught anywhere
// else in the app.

const GENTLE: DeepUnit = {
  key: "marriage-gentle-with-children",
  topicId: "marriage",
  branchId: "marriage-gentle-with-children",
  branch: { title: "Gentle with children", description: "Kindest to his family, a child on his back in sujud, two boys at the minbar, a father's kiss, home at nightfall, and a son waiting at Paradise." },
  name: "gentleness with children",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "kindest-to-his-family",
      title: "Kindest to his family",
      line: "No one was kinder to his family than he ﷺ was.",
      facts: ["Told by Anas ibn Malik", "His baby son Ibrahim stayed with a nurse near Madinah", "He ﷺ went into the smoky house to kiss him"],
      source: hadith("muslim", "2316", "Anas ibn Malik", "Sahih", "Anas said: I have never seen anyone kinder to his family than the Messenger of Allah ﷺ. His son Ibrahim was being nursed on the edge of Madinah. He ﷺ would go there, and we went with him. He went into the house, which was full of smoke because the nurse's husband was a smith, took his son and kissed him, then came back.", "He used to go there and we accompanied him. He entered the house, and it was filled with smoke"),
      difficulty: 1,
      questions: [
        { q: "Why did he ﷺ go to the house near Madinah?", a: "To kiss his baby son", wrong: ["To buy iron tools", "To meet a caravan", "To dig a well"], why: "He took his son Ibrahim and kissed him, then came back, Anas said." },
        { q: "What was the nurse's house full of?", a: "Smoke", wrong: ["Sweet perfume", "Fresh flowers", "Cool water"], why: "The house was full of smoke, as the nurse's husband was a smith, Anas said." },
        { q: "Showing love to little children is only a mother's job.", tf: false, why: "No. He ﷺ, a father, went himself to show his love and kiss his baby son, Anas said." }
      ]
    },
    {
      slug: "a-child-on-his-back",
      title: "A child on his back",
      line: "He ﷺ stayed in sujud until the child on his back was done.",
      facts: ["Told by Shaddad ibn al-Had", "The child was one of his little grandsons", "The people thought something had happened"],
      source: hadith("nasai", "1141", "Shaddad ibn al-Had", "Sahih (Al-Albani)", "Shaddad said: the Messenger of Allah ﷺ came out to us for one of the night prayers, carrying Hasan or Husayn. He put him down, said the takbir and prayed, and made one sujud very long. I raised my head and saw the child on his back while he ﷺ was in sujud. After the prayer the people said: you made the sujud so long that we thought something had happened, or that revelation was coming to you. He ﷺ said: none of that happened, but my son was riding on my back, and I did not want to hurry him until he had enough.", "But my son was riding on my back and I did not like to disturb him until he had enough"),
      difficulty: 2,
      questions: [
        { q: "Why was his ﷺ sujud so long that night?", a: "A child was riding on his back", wrong: ["Rain was falling hard", "A guest was waiting", "The lamps went out"], why: "My son was riding on my back, and I did not want to hurry him, he ﷺ said." },
        { q: "What did he ﷺ carry when he came out to pray?", a: "A little child", wrong: ["A basket of dates", "A water skin", "A lamp"], why: "He ﷺ came out for a night prayer carrying Hasan or Husayn, Shaddad said." },
        { q: "He ﷺ let the child stay until he had enough.", tf: true, why: "I did not want to hurry him until he had enough, he ﷺ said of the child on his back." }
      ]
    },
    {
      slug: "down-from-the-minbar",
      title: "Down from the minbar",
      line: "He ﷺ paused his khutbah to lift two stumbling little boys.",
      facts: ["Told by Buraydah", "The boys wore red shirts and kept tripping", "He ﷺ recited 64:15: your wealth and children are a trial"],
      source: hadith("tirmidhi", "3774", "Buraydah", "Sahih (Al-Albani)", "Buraydah said: the Messenger of Allah ﷺ was giving us a khutbah when Al-Hasan and Al-Husayn came, wearing red shirts, walking and tripping. He ﷺ came down from the minbar, carried them and put them in front of him, then said: Allah spoke the truth: your wealth and your children are a trial (64:15). I looked at these two boys walking and tripping, and I could not wait, so I stopped my talk and picked them up.", "I looked at these two children walking and falling down, and I could not bear patiently anymore until I interrupted my talk and picked them up"),
      difficulty: 2,
      questions: [
        { q: "What were the two little boys wearing?", a: "Red shirts", wrong: ["Green cloaks", "White turbans", "Blue robes"], why: "They came wearing red shirts, walking and tripping, Buraydah said." },
        { q: "Which ayah did he ﷺ recite after lifting them?", a: "Your wealth and children are a trial", wrong: ["Allah is with the patient", "With hardship comes ease", "Allah loves those who do good"], why: "Allah spoke the truth: your wealth and your children are a trial, he ﷺ said (64:15)." },
        { q: "He ﷺ came down from the minbar for the two boys.", tf: true, why: "He ﷺ came down from the minbar, carried them and put them in front of him, Buraydah said." }
      ]
    },
    {
      slug: "how-are-you-little-daughter",
      title: "How are you, little daughter?",
      line: "Abu Bakr kissed his sick daughter's cheek: how are you?",
      facts: ["Told by Al-Bara ibn Azib", "Aishah lay in bed with a high fever", "This was soon after they came to Madinah"],
      source: hadith("bukhari", "3918", "Al-Bara ibn Azib", "Sahih", "Al-Bara said: I went with Abu Bakr into his home and saw his daughter Aishah lying in bed with a high fever. I saw her father Abu Bakr kiss her cheek and say: how are you, little daughter?", "I saw her father Abu Bakr kissing her cheek and saying"),
      difficulty: 1,
      questions: [
        { q: "Where did Abu Bakr kiss his sick daughter?", a: "On her cheek", wrong: ["On her hand", "On her feet", "On her shoulder"], why: "I saw her father Abu Bakr kissing her cheek, Al-Bara said." },
        { q: "What did Abu Bakr ask his daughter?", a: "How are you, little daughter?", wrong: ["Where is your mother?", "What did you eat today?", "Who came to see you?"], why: "He kissed her cheek and said: how are you, little daughter? Al-Bara said." },
        { q: "A father can show his love with a kiss and a kind word.", tf: true, why: "Abu Bakr kissed his sick daughter's cheek and asked how she was, Al-Bara said." }
      ]
    },
    {
      slug: "home-at-nightfall",
      title: "Home at nightfall",
      line: "Keep your children close when night first falls.",
      facts: ["Told by Jabir ibn Abdullah", "The devils spread out as night begins", "Close the door with Allah's name"],
      source: hadith("bukhari", "3304", "Jabir ibn Abdullah", "Sahih", "Jabir said: the Messenger of Allah ﷺ said: when night falls, keep your children close to you, for the devils spread out at that time. When an hour of the night has passed, you can let them go. Close the doors and mention the name of Allah, for Satan does not open a closed door.", "keep your children close to you for the devils spread out at that time"),
      difficulty: 1,
      questions: [
        { q: "When should children be kept close, he ﷺ said?", a: "When night first falls", wrong: ["At noon", "At sunrise", "After Fajr"], why: "When night falls, keep your children close to you, he ﷺ said." },
        { q: "What should you say as you close the door at night?", a: "Allah's name", wrong: ["A line of poetry", "Your own name", "The time of day"], why: "Close the doors and mention the name of Allah; Satan does not open a closed door, he ﷺ said." },
        { q: "Children should be kept close all night long.", tf: false, why: "No. When an hour of the night has passed, you can let them go, he ﷺ said." }
      ]
    },
    {
      slug: "waiting-at-the-gate",
      title: "Waiting at the gate",
      line: "He ﷺ told a sad father his son waits at Paradise.",
      facts: ["Told by Qurrah ibn Iyas", "The father loved his little son very much", "After the boy died, he ﷺ asked about the father"],
      source: hadith("nasai", "1870", "Qurrah ibn Iyas", "Sahih (Al-Albani)", "Mu'awiyah ibn Qurrah reported from his father: a man came to the Prophet ﷺ with his son. He ﷺ asked: do you love him? The man said: may Allah love you as I love him. Then the boy died, and he ﷺ noticed the man was missing and asked about him. He ﷺ said: would it not make you happy that you will not come to any gate of Paradise without finding him there, trying to open it for you?", "you will not come to any of the gates of Paradise but you will find him there"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask the man about his son?", a: "Do you love him?", wrong: ["How old is he?", "Can he read yet?", "Where does he sleep?"], why: "He ﷺ asked: do you love him? And the man said: may Allah love you as I love him." },
        { q: "Where will the father find his son, he ﷺ said?", a: "At a gate of Paradise", wrong: ["On a high mountain", "By a river in Madinah", "In a busy market"], why: "You will not come to any gate of Paradise but you will find him there, he ﷺ said." },
        { q: "The boy will try to open Paradise's gate for his father.", tf: true, why: "You will find him there, trying to open it for you, he ﷺ told the father." }
      ]
    }
  ]
};

export const MARRIAGE_GENTLE_UNITS: DeepUnit[] = [GENTLE];
