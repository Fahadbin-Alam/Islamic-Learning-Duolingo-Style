import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: good names, from Sahih al-Bukhari and Sunan Abi Dawud. Muhammad and not
// Mudhammam, a baby named on his ﷺ thigh, baby Ibrahim and a soft date, Asram made Zur'ah, Hazn who kept his
// name, and Al-Hakam, a name of Allah. Every card is one sahih hadith with its number, narrator and grade, and its
// exact English words to highlight, and none of them is taught anywhere else in the app.

const NAMES: DeepUnit = {
  key: "kids-good-names",
  topicId: "hadith",
  branchId: "hadith-names",
  branch: { title: "Good names", description: "Muhammad ﷺ, the praised one, a baby named Al-Mundhir, baby Ibrahim, Asram made Zur'ah, Hazn and Sahl, and Allah the Judge." },
  name: "good names",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "muhammad-the-praised",
      title: "Muhammad ﷺ, the praised one",
      line: "Quraysh cursed the name Mudhammam, but he ﷺ is Muhammad.",
      facts: [
        "Abu Hurairah told it.",
        "Mudhammam means the blamed one.",
        "Allah kept their bad words away from his ﷺ name."
      ],
      source: hadith("bukhari", "3533", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: does it not amaze you how Allah keeps the insults and curses of Quraysh away from me? They insult Mudhammam and curse Mudhammam, while I am Muhammad.", "They abuse Mudhammam and curse Mudhammam while I am Muhammad"),
      difficulty: 1,
      questions: [
        { q: "What name did Quraysh use to insult him ﷺ?", a: "Mudhammam", wrong: ["Muhammad", "Ahmad", "Al-Amin"], why: "They abuse Mudhammam and curse Mudhammam, while I am Muhammad, he ﷺ said." },
        { q: "Who kept the bad words away from his ﷺ name?", a: "Allah", wrong: ["The Romans", "The Persians", "The poets"], why: "Allah protects me from the abusing and cursing of Quraysh, he ﷺ said." },
        { q: "The bad words of Quraysh did not fall on his ﷺ name, Muhammad.", tf: true, why: "They curse Mudhammam, while I am Muhammad, he ﷺ said." }
      ]
    },
    {
      slug: "his-name-is-al-mundhir",
      title: "His name is Al-Mundhir",
      line: "He ﷺ held a baby on his thigh, then named him Al-Mundhir.",
      facts: [
        "Sahl ibn Sa'd told it.",
        "The baby was the son of Abu Usaid.",
        "He ﷺ asked: where is the boy?"
      ],
      source: hadith("bukhari", "6191", "Sahl ibn Sa'd", "Sahih", "Sahl said: when Al-Mundhir, the son of Abu Usaid, was born, he was brought to the Prophet ﷺ, who placed him on his thigh. The Prophet ﷺ became busy with something, so Abu Usaid had the baby taken home. When he ﷺ finished, he asked: where is the boy? He asked his name, and said: no, his name is Al-Mundhir. So he was called Al-Mundhir from that day.", "So he called him Al-Mundhir from that day"),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ place the newborn baby?", a: "On his thigh", wrong: ["In a basket", "On a cushion", "In a cradle"], why: "He was brought to the Prophet ﷺ, who placed him on his thigh, Sahl said." },
        { q: "What name did he ﷺ give the baby?", a: "Al-Mundhir", wrong: ["Al-Qasim", "Abdullah", "Ibrahim"], why: "No, his name is Al-Mundhir, he ﷺ said, and so he was called from that day." },
        { q: "He ﷺ asked after the baby when he had finished his work.", tf: true, why: "Where is the boy, he ﷺ asked, when he finished what he was busy with." }
      ]
    },
    {
      slug: "a-baby-named-ibrahim",
      title: "A baby named Ibrahim",
      line: "He ﷺ named Abu Musa's son Ibrahim and prayed for him.",
      facts: [
        "Abu Musa told it.",
        "He ﷺ put a little soft date in the baby's mouth.",
        "He ﷺ asked Allah to bless the baby."
      ],
      source: hadith("bukhari", "5467", "Abu Musa", "Sahih", "Abu Musa said: a son was born to me, and I took him to the Prophet ﷺ. He named him Ibrahim, gave him a taste of a date he had softened, asked Allah to bless him, and gave him back to me. He was Abu Musa's eldest son.", "named him Ibrahim, did Tahnik for him with a date, invoked Allah to bless him and returned him to me"),
      difficulty: 1,
      questions: [
        { q: "What name did he ﷺ give Abu Musa's son?", a: "Ibrahim", wrong: ["Musa", "Yusuf", "Dawud"], why: "A son was born to me, and he ﷺ named him Ibrahim, Abu Musa said." },
        { q: "What did he ﷺ put in the baby's mouth?", a: "A little soft date", wrong: ["A drop of honey", "A sip of milk", "A piece of bread"], why: "He ﷺ did tahnik for him with a date, Abu Musa said." },
        { q: "He ﷺ asked Allah to bless the baby.", tf: true, why: "He invoked Allah to bless him and returned him to me, Abu Musa said." }
      ]
    },
    {
      slug: "asram-becomes-zurah",
      title: "A new name: Zur'ah",
      line: "A man named Asram came, and he ﷺ called him Zur'ah instead.",
      facts: [
        "Usamah ibn Akhdari told it.",
        "Asram comes from a word for cutting off.",
        "Zur'ah comes from a word for planting."
      ],
      source: hadith("abudawud", "4954", "Usamah ibn Akhdari", "Sahih (Al-Albani)", "Usamah ibn Akhdari said: a man called Asram was among those who came to the Messenger of Allah ﷺ. He asked: what is your name? He said: Asram. He ﷺ said: no, you are Zur'ah.", "A man called Asram was among those who came to the Messenger of Allah"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ ask the man first?", a: "What his name was", wrong: ["Where he came from", "How old he was", "What he had brought"], why: "What is your name, he ﷺ asked, and the man replied: Asram." },
        { q: "What new name did he ﷺ give him?", a: "Zur'ah", wrong: ["Asram", "Hazn", "Harb"], why: "No, you are Zur'ah, he ﷺ said to the man called Asram." },
        { q: "He ﷺ changed the man's name from Asram to Zur'ah.", tf: true, why: "The man said his name was Asram, and he ﷺ said: no, you are Zur'ah." }
      ]
    },
    {
      slug: "hazn-and-sahl",
      title: "Hazn and Sahl",
      line: "He ﷺ offered Hazn the name Sahl, meaning easy, but he refused.",
      facts: [
        "Al-Musayyib told it about his father.",
        "Hazn means rough ground, and Sahl means smooth ground.",
        "His family said roughness stayed with them."
      ],
      source: hadith("bukhari", "6190", "Al-Musayyib ibn Hazn", "Sahih", "Al-Musayyib said: my father Hazn went to the Prophet ﷺ, who asked: what is your name? He said: Hazn. He ﷺ said: you are Sahl. Hazn said: I will not change the name my father gave me. Sa'id ibn al-Musayyib added: roughness has stayed with us ever since.", "I will not change the name with which my father has named me"),
      difficulty: 1,
      questions: [
        { q: "What new name did he ﷺ offer Hazn?", a: "Sahl", wrong: ["Zur'ah", "Asram", "Al-Mundhir"], why: "When Hazn told him his name, he ﷺ said: you are Sahl." },
        { q: "What did Hazn say about changing his name?", a: "He would keep his father's name", wrong: ["He loved the new name", "He would think about it", "He asked for another"], why: "I will not change the name with which my father has named me, Hazn said." },
        { q: "Hazn happily took the new name Sahl.", tf: false, why: "No. I will not change the name my father gave me, Hazn said." }
      ]
    },
    {
      slug: "allah-the-judge",
      title: "Allah is the Judge",
      line: "A man was called Abul-Hakam, but Al-Hakam is a name of Allah.",
      facts: [
        "Hani ibn Yazid told it.",
        "Hani made peace when his people argued.",
        "His new name was Abu Shurayh, after his eldest son."
      ],
      source: hadith("abudawud", "4955", "Hani ibn Yazid", "Sahih (Al-Albani)", "Hani ibn Yazid came to the Messenger of Allah ﷺ with his people, who called him Abul-Hakam. He ﷺ called him and said: Allah is Al-Hakam, the Judge, and judgment is His; why are you called Abul-Hakam? He said: when my people disagree, they come to me, I judge between them, and both sides are pleased. He ﷺ said: how good this is! He asked about his children: Shurayh, Muslim and Abdullah. Shurayh was the eldest, so he ﷺ said: then you are Abu Shurayh.", "and to Him judgment belongs. Why are you given the kunyah AbulHakam"),
      difficulty: 1,
      questions: [
        { q: "Al-Hakam, the Judge, is a name of whom?", a: "Allah", wrong: ["Hani's people", "The kings", "The poets"], why: "Allah is the judge, al-Hakam, and to Him judgment belongs, he ﷺ said." },
        { q: "What new name did he ﷺ give Hani?", a: "Abu Shurayh", wrong: ["Abul-Hakam", "Abu Muslim", "Abu Abdullah"], why: "Shurayh was his eldest son, so he ﷺ said: then you are Abu Shurayh." },
        { q: "He ﷺ praised Hani for making peace between his people.", tf: true, why: "How good this is, he ﷺ said, when both sides were pleased with Hani's decision." }
      ]
    }
  ]
};

export const KIDS_NAMES_UNITS: DeepUnit[] = [NAMES];
