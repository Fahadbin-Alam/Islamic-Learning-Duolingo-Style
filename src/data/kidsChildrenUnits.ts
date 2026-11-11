import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: children who knew him ﷺ, from Sahih al-Bukhari, Sahih Muslim and Sunan
// Abi Dawud. A boy of five who never forgot a splash of water, a boy of seven on Hajj, boys who went out to welcome
// him, little Anas sent on an errand, Anas and an orphan praying in a row behind him, and a pat on every child's
// cheek. Every card is one sahih or hasan hadith with its number and narrator, and its exact English words to
// highlight, and none of them is taught anywhere else in the app. Anas keeping his ﷺ secret is left out, as the
// Sahabah path already teaches it (Muslim 2482).

const CHILDREN_WHO_KNEW_HIM: DeepUnit = {
  key: "kids-children",
  topicId: "hadith",
  branchId: "hadith-children",
  branch: { title: "Children who knew him ﷺ", description: "A boy of five, Hajj at seven, boys out to welcome him, little Anas on an errand, two boys praying behind him, and a pat on every child's cheek." },
  name: "children who knew him ﷺ",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-boy-of-five",
      title: "A boy of five",
      line: "Mahmud was five when he ﷺ sprayed water on his face.",
      facts: [
        "Mahmud ibn ar-Rabi' told it.",
        "He was a boy of five.",
        "The water came from a bucket from the well."
      ],
      source: hadith("bukhari", "77", "Mahmud ibn ar-Rabi'", "Sahih", "Mahmud ibn ar-Rabi' said: when I was a boy of five, I remember, the Prophet ﷺ took water from a bucket with his mouth and sprayed it on my face.", "When I was a boy of five, I remember"),
      difficulty: 1,
      questions: [
        { q: "How old was Mahmud then?", a: "Five years old", wrong: ["Fifteen years old", "Ten years old", "Twenty years old"], why: "When I was a boy of five, I remember it, Mahmud said." },
        { q: "What did he ﷺ spray on Mahmud's face?", a: "Water from a bucket", wrong: ["Sand from the ground", "Milk from a cup", "Rain from the sky"], why: "He took water from a bucket from the well with his mouth." },
        { q: "Mahmud still remembered it, though he was only five.", tf: true, why: "When I was a boy of five, I remember, Mahmud said." }
      ]
    },
    {
      slug: "hajj-at-seven",
      title: "Hajj at seven",
      line: "As-Sa'ib was seven when he went on Hajj with him ﷺ.",
      facts: [
        "As-Sa'ib ibn Yazid told it.",
        "He was a seven-year-old boy.",
        "He went on Hajj with the Messenger of Allah ﷺ."
      ],
      source: hadith("bukhari", "1858", "As-Sa'ib ibn Yazid", "Sahih", "As-Sa'ib ibn Yazid said: I was taken on Hajj with the Messenger of Allah ﷺ, and I was a seven-year-old boy then.", "and I was a seven-year-old boy then"),
      difficulty: 1,
      questions: [
        { q: "How old was As-Sa'ib on that Hajj?", a: "Seven years old", wrong: ["Seventeen years old", "Twelve years old", "Thirty years old"], why: "He was only a boy, yet he went on Hajj with the Messenger of Allah ﷺ." },
        { q: "Who did young As-Sa'ib go on Hajj with?", a: "The Messenger of Allah ﷺ", wrong: ["A group of traders", "His teacher only", "A king's army"], why: "He was taken along as a seven-year-old boy, As-Sa'ib said." },
        { q: "Children went on Hajj with him ﷺ too.", tf: true, why: "As-Sa'ib was a boy of seven on Hajj with him ﷺ." }
      ]
    },
    {
      slug: "out-to-welcome-him",
      title: "Out to welcome him",
      line: "The boys went out to welcome him ﷺ back from Tabuk.",
      facts: [
        "As-Sa'ib ibn Yazid told it.",
        "They met him at Thaniyyat al-Wada'.",
        "He ﷺ was coming back from Tabuk."
      ],
      source: hadith("bukhari", "4427", "As-Sa'ib ibn Yazid", "Sahih", "As-Sa'ib ibn Yazid said: I remember I went out with the boys to Thaniyyat al-Wada' to welcome the Prophet ﷺ when he came back from Tabuk.", "I remember I went out with the boys"),
      difficulty: 1,
      questions: [
        { q: "Who went out with As-Sa'ib to welcome him ﷺ?", a: "The other boys", wrong: ["The old men only", "A few soldiers", "A few traders"], why: "They went out to Thaniyyat al-Wada' together, As-Sa'ib said." },
        { q: "Where did the boys meet him ﷺ?", a: "Thaniyyat al-Wada'", wrong: ["Mount Uhud", "The masjid of Quba'", "The valley of Mina"], why: "He ﷺ was coming back from Tabuk, and they met him there." },
        { q: "He ﷺ was coming back from Tabuk.", tf: true, why: "The boys went out to Thaniyyat al-Wada' to welcome him back." }
      ]
    },
    {
      slug: "go-little-anas",
      title: "Go, little Anas",
      line: "He ﷺ laughed and told little Anas: go where I sent you.",
      facts: [
        "Anas ibn Malik told it.",
        "Anas stopped by boys playing in the street.",
        "He ﷺ was laughing, not angry."
      ],
      source: hadith("abudawud", "4773", "Anas ibn Malik", "Hasan (Al-Albani)", "Anas said: he ﷺ sent me on an errand, and I came upon some boys playing in the street. Then he ﷺ came up behind me and took me by the back of the neck, and when I looked at him he was laughing. He said: go where I ordered you, little Anas. I said: yes, I am going, O Messenger of Allah.", "He said: Go where I ordered you, little Anas"),
      difficulty: 1,
      questions: [
        { q: "What did Anas find on the way?", a: "Boys playing in the street", wrong: ["A lost camel", "A big market", "A heavy rain"], why: "He had been sent on an errand when he saw them, Anas said." },
        { q: "How did he ﷺ look when Anas turned around?", a: "Laughing kindly", wrong: ["Frowning and angry", "Tired and sleepy", "Crying sadly"], why: "He ﷺ said: go where I ordered you, little Anas." },
        { q: "He ﷺ scolded Anas for stopping to watch the boys.", tf: false, why: "No. He ﷺ was laughing, and said: go where I ordered you, little Anas." }
      ]
    },
    {
      slug: "a-row-behind-him",
      title: "Anas and the orphan",
      line: "Anas and an orphan prayed in a row behind him ﷺ.",
      facts: [
        "Anas ibn Malik told it.",
        "An old lady, Mulaykah, made him ﷺ a meal.",
        "Anas washed an old mat for him ﷺ to pray on."
      ],
      source: hadith("bukhari", "380", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: Mulaykah invited the Messenger of Allah ﷺ to a meal she had made. He ate, then said: stand up, I will lead you in prayer. I washed our old mat, dark from long use, and he ﷺ stood on it. The orphan and I lined up behind him, and the old lady stood behind us. He led us in two rak'ahs and then left.", "and I aligned behind him and the old lady"),
      difficulty: 1,
      questions: [
        { q: "Who lined up with Anas behind him ﷺ?", a: "An orphan boy", wrong: ["A tall soldier", "A rich trader", "A tribal chief"], why: "Anas and the orphan made one row, and the old lady stood behind them." },
        { q: "What did Anas do for him ﷺ to pray on?", a: "He washed an old mat", wrong: ["He built a new wall", "He brought a soft rug", "He swept the street"], why: "It had become dark from long use, so he washed it with water." },
        { q: "The old lady stood behind the two boys.", tf: true, why: "The orphan and I lined up behind him, and the old lady behind us, Anas said." }
      ]
    },
    {
      slug: "a-pat-on-the-cheek",
      title: "A pat on the cheek",
      line: "He ﷺ patted the cheek of every child he met.",
      facts: [
        "Jabir ibn Samurah told it.",
        "He ﷺ met some children on his way home.",
        "His hand was as if from a perfume bag."
      ],
      source: hadith("muslim", "2329", "Jabir ibn Samurah", "Sahih", "Jabir ibn Samurah said: I prayed with the Messenger of Allah ﷺ, then he went to his family and I went with him. Some children met him, and he began to pat the cheeks of each one of them. He patted my cheek too, and I felt a coolness or a fragrance in his hand, as if it had come out of a perfumer's bag.", "He began to pat the cheeks of each one of them"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do when the children met him?", a: "Patted each one's cheek", wrong: ["Walked past them", "Sent them home", "Gave them a test"], why: "He began to pat the cheeks of each one of them, Jabir said." },
        { q: "What was his ﷺ hand like, Jabir said?", a: "As if from a perfume bag", wrong: ["Rough like a rock", "Hot like the sun", "Wet like the rain"], why: "I felt a coolness or a fragrance in his hand, Jabir said." },
        { q: "He ﷺ left some of the children out.", tf: false, why: "No. He patted the cheeks of each one of them, and Jabir's too." }
      ]
    }
  ]
};

export const KIDS_CHILDREN_UNITS: DeepUnit[] = [CHILDREN_WHO_KNEW_HIM];
