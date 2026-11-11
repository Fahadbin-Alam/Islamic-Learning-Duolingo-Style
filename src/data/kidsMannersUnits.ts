import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: everyday manners, from Sahih al-Bukhari and Sunan Abi Dawud. Salam for
// children, never taking a friend's things as a joke, no scary tricks, Bismillah when you trip, a quiet sneeze, and
// not passing on everything you hear. Every card is one sahih or hasan hadith with its number, narrator and grade,
// and its exact English words to highlight, and none of them is taught anywhere else in the app.

const MANNERS: DeepUnit = {
  key: "kids-everyday-manners",
  topicId: "hadith",
  branchId: "hadith-manners",
  branch: { title: "Everyday manners", description: "Salam for children, no taking things as a joke, no scary tricks, Bismillah when you trip, a quiet sneeze, and not passing on all you hear." },
  name: "everyday manners",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "salam-to-the-children",
      title: "Salam to the children",
      line: "Anas greeted some boys, just as the Prophet ﷺ did.",
      facts: [
        "Anas ibn Malik told it.",
        "He passed by a group of boys.",
        "He said salam to them, like the Prophet ﷺ."
      ],
      source: hadith("bukhari", "6247", "Anas ibn Malik", "Sahih", "Anas ibn Malik passed by some boys and greeted them with salam, and said: the Prophet ﷺ used to do so.", "he passed by a group of boys and greeted them"),
      difficulty: 1,
      questions: [
        { q: "Whom did Anas greet as he passed by?", a: "A group of boys", wrong: ["A group of kings", "A herd of camels", "A crowd of soldiers"], why: "He said salam to a group of boys, as the Prophet ﷺ used to." },
        { q: "Why did Anas say salam to the boys?", a: "The Prophet ﷺ used to do so", wrong: ["He wanted their sweets", "He had lost his way", "They called him first"], why: "He passed some boys, greeted them, and said: the Prophet ﷺ used to do so." },
        { q: "Saying salam to children is part of the Sunnah.", tf: true, why: "Anas greeted the boys and said: the Prophet ﷺ used to do so." }
      ]
    },
    {
      slug: "not-even-as-a-joke",
      title: "Not even as a joke",
      line: "Never take your friend's things, not even as a joke.",
      facts: [
        "Abdullah ibn as-Sa'ib told it.",
        "Not as a joke, and not for real.",
        "If you take his stick, give it back."
      ],
      source: hadith("abudawud", "5003", "Abdullah ibn as-Sa'ib ibn Yazid", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: none of you should take his brother's things, not as a joke and not for real. If anyone takes his brother's stick, he should give it back.", "If anyone takes the staff of his brother, he should return it"),
      difficulty: 1,
      questions: [
        { q: "If you took your brother's stick, what must you do?", a: "Give it back", wrong: ["Hide it well", "Break it in two", "Keep it forever"], why: "If anyone takes the staff of his brother, he should return it, he ﷺ said." },
        { q: "Who told the hadith about not taking things as a joke?", a: "Abdullah ibn as-Sa'ib", wrong: ["Abu Hurairah", "Anas ibn Malik", "Aishah"], why: "Abdullah ibn as-Sa'ib told it from his father, from his grandfather." },
        { q: "Taking a friend's things as a joke is fine.", tf: false, why: "No. None of you should take his brother's things, as a joke or for real." }
      ]
    },
    {
      slug: "no-scary-tricks",
      title: "No scary tricks",
      line: "A Muslim must never frighten another Muslim.",
      facts: [
        "The Companions told it to Ibn Abi Layla.",
        "A man took a sleeping friend's rope.",
        "The sleeping man woke up scared."
      ],
      source: hadith("abudawud", "5004", "Abdur-Rahman ibn Abi Layla", "Sahih (Al-Albani)", "Abdur-Rahman ibn Abi Layla said: the Companions of the Prophet ﷺ told us that they were travelling with him. One of them fell asleep, and another went and took his rope, and he woke up frightened. The Prophet ﷺ said: it is not allowed for a Muslim to frighten a Muslim.", "It is not lawful for a Muslim that he frightens a Muslim"),
      difficulty: 1,
      questions: [
        { q: "What did one traveller take from his sleeping friend?", a: "His rope", wrong: ["His shoes", "His water", "His food"], why: "One of them went to the rope he had with him and took it." },
        { q: "How did the sleeping man feel when he woke?", a: "He woke up scared", wrong: ["He woke up happy", "He woke up hungry", "He woke up laughing"], why: "He took it, by which he was frightened, the Companions said." },
        { q: "Scaring a Muslim for fun is a good joke.", tf: false, why: "No. It is not lawful for a Muslim to frighten a Muslim, he ﷺ said." }
      ]
    },
    {
      slug: "bismillah-when-you-trip",
      title: "Say Bismillah when you trip",
      line: "Say Bismillah, and Shaytan shrinks as small as a fly.",
      facts: [
        "A man rode behind the Prophet ﷺ.",
        "The animal tripped, and he cursed Shaytan.",
        "Cursing Shaytan makes him swell like a house."
      ],
      source: hadith("abudawud", "4982", "Abu al-Malih, from a man", "Sahih (Al-Albani)", "A man said: I was riding behind the Prophet ﷺ when the animal stumbled, and I said: may Shaytan perish! He said: do not say that, for then he swells up as big as a house and says: by my power. Say instead: Bismillah, in the name of Allah, for then he shrinks until he is as small as a fly.", "But say: in the name of Allah; for when you say that, he will diminish so much so that he will be like a fly"),
      difficulty: 1,
      questions: [
        { q: "What should you say when you trip, he ﷺ said?", a: "Bismillah", wrong: ["May Shaytan perish", "Oh no, oh no", "Nothing at all"], why: "Say: in the name of Allah, for then he shrinks like a fly." },
        { q: "How small does Shaytan get when you say Bismillah?", a: "As small as a fly", wrong: ["As small as a cat", "As small as a house", "As small as a camel"], why: "He will diminish so much so that he will be like a fly." },
        { q: "Cursing Shaytan makes him small and weak.", tf: false, why: "No. Cursing makes Shaytan swell like a house; Bismillah makes him small." }
      ]
    },
    {
      slug: "a-quiet-sneeze",
      title: "A quiet sneeze",
      line: "When he ﷺ sneezed, he covered his mouth and kept it quiet.",
      facts: [
        "Abu Hurairah told it.",
        "He used his hand or his cloth.",
        "He kept the sound of the sneeze low."
      ],
      source: hadith("abudawud", "5029", "Abu Hurairah", "Hasan Sahih (Al-Albani)", "Abu Hurairah said: when the Messenger of Allah ﷺ sneezed, he put his hand or his cloth over his mouth and kept the sound low.", "he placed his hand or a garment on his mouth, and lessened the noise"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ put over his mouth when he sneezed?", a: "His hand or his cloth", wrong: ["A big leaf", "A cup of water", "Nothing at all"], why: "He placed his hand or a garment on his mouth, Abu Hurairah said." },
        { q: "How loud did he ﷺ let his sneeze be?", a: "Low and quiet", wrong: ["As loud as he could", "Loud like a horn", "Loud like thunder"], why: "He lessened the noise of the sneeze, Abu Hurairah said." },
        { q: "Covering your mouth when you sneeze is a Sunnah.", tf: true, why: "He placed his hand or a garment on his mouth, and lessened the noise." }
      ]
    },
    {
      slug: "not-everything-you-hear",
      title: "Not everything you hear",
      line: "Do not pass on everything you hear: some of it is false.",
      facts: [
        "Abu Hurairah told it.",
        "Some things you hear are not true.",
        "Telling all you hear is enough of a lie."
      ],
      source: hadith("abudawud", "4992", "Abu Hurairah", "Sahih (Al-Albani)", "The Prophet ﷺ said: it is enough of a lie for a man to tell everything he hears.", "It is enough falsehood for a man to relate everything he hears"),
      difficulty: 1,
      questions: [
        { q: "What is telling everything you hear, he ﷺ said?", a: "Enough of a lie", wrong: ["Very kind", "Very brave", "Very smart"], why: "It is enough falsehood for a man to relate everything he hears." },
        { q: "Why should you not pass on everything you hear?", a: "Some of it is false", wrong: ["Talking is tiring", "Nobody listens anyway", "Secrets are boring"], why: "Relating everything he hears is falsehood enough, he ﷺ said." },
        { q: "Everything people say is always true.", tf: false, why: "No. Telling everything people say is enough falsehood, he ﷺ said." }
      ]
    }
  ]
};

export const KIDS_MANNERS_UNITS: DeepUnit[] = [MANNERS];
