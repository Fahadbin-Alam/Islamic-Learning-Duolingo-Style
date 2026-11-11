import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: not asking people, from Sahih al-Bukhari, Sunan Abi Dawud and Sunan an-Nasa'i. A face worn
// away by asking, how bad begging is, the two times asking is not blamed, two strong men at the Farewell Hajj, never
// pushing when you ask, and the man of Banu Asad who went home without asking. Every card is one sahih or hasan hadith
// with its number, narrator and grade, and its exact English words to highlight, and none of them is taught anywhere
// else in the app. The amount that makes asking too much is not asked about, as the narrations and scholars differ.

const ASKING: DeepUnit = {
  key: "zakat-not-asking-people",
  topicId: "zakat",
  branchId: "zakat-not-asking-people",
  branch: { title: "Not asking people", description: "A face worn away by asking, how bad begging is, when asking is not blamed, two strong men, never pushing, and the man who went home without asking." },
  name: "not asking people",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-face-without-flesh",
      title: "A face without flesh",
      line: "A man who keeps asking comes with no flesh on his face.",
      facts: ["Told by Abdullah ibn Umar", "He keeps on asking people for things", "Seen on the Day of Resurrection"],
      source: hadith("bukhari", "1474", "Abdullah ibn Umar", "Sahih", "Abdullah ibn Umar said: the Prophet ﷺ said: a man keeps on asking people for things until he comes on the Day of Resurrection without a piece of flesh on his face.", "A man keeps on asking others for something till he comes on the Day of Resurrection without any piece of flesh on his face"),
      difficulty: 1,
      questions: [
        { q: "What is gone from the face of a man who keeps asking?", a: "Its flesh", wrong: ["Its color", "Its smile", "Its beard"], why: "He comes on the Day of Resurrection without any piece of flesh on his face." },
        { q: "When does he come without flesh on his face?", a: "On the Day of Resurrection", wrong: ["In his old age", "In his dreams", "On his wedding day"], why: "A man keeps on asking till he comes on the Day of Resurrection like that, he ﷺ said." },
        { q: "Asking people again and again is praised in Islam.", tf: false, why: "No. A man who keeps on asking comes with no flesh on his face, he ﷺ said." }
      ]
    },
    {
      slug: "if-you-only-knew",
      title: "If you only knew",
      line: "If you knew how bad begging is, no one would ask anyone.",
      facts: ["Told by A'idh ibn Amr", "A man asked, and he ﷺ gave him", "He ﷺ spoke as the man stepped out of the door"],
      source: hadith("nasai", "2586", "A'idh ibn Amr", "Hasan (Al-Albani)", "A'idh ibn Amr said: a man came to the Prophet ﷺ and asked him, and he gave him. When the man put his foot on the threshold, the Messenger of Allah ﷺ said: if you knew how bad begging is, no one would go to anyone else and ask him for anything.", "If you knew how bad begging is, no one would go to anyone else and ask him for anything"),
      difficulty: 1,
      questions: [
        { q: "Where was the man when he ﷺ spoke about begging?", a: "At the door, stepping out", wrong: ["At the market", "On a mountain", "Far in the desert"], why: "When he placed his foot on the threshold, the Messenger of Allah ﷺ spoke." },
        { q: "If people knew how bad begging is, what would happen?", a: "No one would ask anyone", wrong: ["Everyone would ask more", "The markets would close", "No one would trade"], why: "No one would go to anyone else and ask him for anything, he ﷺ said." },
        { q: "He ﷺ gave the man what he asked for before he spoke.", tf: true, why: "A man asked him and he gave him; then, at the threshold, he ﷺ spoke." }
      ]
    },
    {
      slug: "when-asking-is-not-blamed",
      title: "When asking is not blamed",
      line: "Begging scars the face, except asking a ruler or in real need.",
      facts: ["Told by Samurah ibn Jundub", "Begging leaves scratches on a man's own face", "Not blamed: asking the ruler, or when it is a must"],
      source: hadith("abudawud", "1639", "Samurah ibn Jundub", "Sahih (Al-Albani)", "Samurah ibn Jundub said: the Prophet ﷺ said: begging is scratches with which a man scars his own face, so whoever wishes keeps his honor, and whoever wishes lets it go; but this is not so for one who asks a ruler, or asks when there is no other way.", "but this does not apply to one who begs from a ruler, or in a situation which makes it necessary"),
      difficulty: 2,
      questions: [
        { q: "What does begging do to a man's face?", a: "Leaves scratches on it", wrong: ["Makes it shine", "Makes it look young", "Leaves it as it was"], why: "Acts of begging are lacerations with which a man disfigures his face, he ﷺ said." },
        { q: "Which asking is not blamed, he ﷺ said?", a: "Asking a ruler, or in real need", wrong: ["Asking to get richer", "Asking out of habit", "Asking to show off"], why: "Not one who begs from a ruler, or when it is necessary, he ﷺ said." },
        { q: "Every kind of asking is blamed, even in real need.", tf: false, why: "No. He ﷺ excused asking a ruler, and asking when it is necessary." }
      ]
    },
    {
      slug: "two-strong-men",
      title: "Two strong men",
      line: "Charity is not for the rich or the strong who can earn.",
      facts: ["Told by Ubaydullah ibn Adiyy, from the two men", "At the Farewell Hajj, as he ﷺ gave out sadaqah", "He ﷺ looked them up and down"],
      source: hadith("abudawud", "1633", "Ubaydullah ibn Adiyy ibn al-Khiyar", "Sahih (Al-Albani)", "Ubaydullah ibn Adiyy ibn al-Khiyar said: two men told me they came to the Prophet ﷺ at the Farewell Hajj while he was giving out the sadaqah, and asked him for some of it. He looked them up and down and saw they were strong, and said: if you wish, I will give you, but there is no share in it for a rich man, nor for one who is strong and able to earn a living.", "there is nothing spare in it for a rich man or for one who is strong and able to earn a living"),
      difficulty: 2,
      questions: [
        { q: "When did the two strong men ask him ﷺ for sadaqah?", a: "At the Farewell Hajj", wrong: ["At the Battle of Badr", "In the cave of Hira", "At the Treaty of Hudaybiyah"], why: "They came to him ﷺ at the Farewell Pilgrimage, as he gave out the sadaqah." },
        { q: "Who has no share in sadaqah, he ﷺ said?", a: "The rich and the strong earner", wrong: ["The poor and the needy", "The traveler in need", "The one in heavy debt"], why: "Nothing in it for a rich man, or one strong and able to earn a living, he ﷺ said." },
        { q: "He ﷺ looked the two men up and down before he answered.", tf: true, why: "He looked them up and down and saw that they were strong." }
      ]
    },
    {
      slug: "do-not-push-when-asking",
      title: "Do not push when asking",
      line: "Do not push when asking; an unwilling gift has no blessing.",
      facts: ["Told by Mu'awiyah", "Ilhaf: pushing hard when you ask", "What is given unwillingly holds no barakah"],
      source: hadith("nasai", "2593", "Mu'awiyah", "Sahih (Al-Albani)", "Mu'awiyah said: the Messenger of Allah ﷺ said: do not be pushy when asking. If one of you asks me for something and I give it unwillingly, there will be no blessing in it.", "Do not be demanding when asking. If one of you asks me for anything and I give it reluctantly, there will be no blessing in it"),
      difficulty: 2,
      questions: [
        { q: "How should you not be when you ask, he ﷺ said?", a: "Pushy and demanding", wrong: ["Polite and gentle", "Quiet and patient", "Clear and brief"], why: "Do not be demanding when asking, the Messenger of Allah ﷺ said." },
        { q: "What is missing from a gift given unwillingly?", a: "Blessing", wrong: ["Its price", "Its wrapping", "Its smell"], why: "If I give it reluctantly, there will be no blessing in it, he ﷺ said." },
        { q: "Pressing someone hard to give you something brings blessing.", tf: false, why: "No. What is given reluctantly has no blessing in it, he ﷺ said." }
      ]
    },
    {
      slug: "home-without-asking",
      title: "Home without asking",
      line: "Hearing him ﷺ, a man of Banu Asad went home without asking.",
      facts: ["Told by a man of Banu Asad, through Ata ibn Yasar", "His wife sent him to ask for food", "Later Allah made them free of need"],
      source: hadith("abudawud", "1627", "A man of Banu Asad", "Sahih (Al-Albani)", "Ata ibn Yasar said: a man of Banu Asad said: my family and I stopped at Baqi al-Gharqad, and my wife sent me to ask the Messenger of Allah ﷺ for something to eat. I found a man asking him, and he ﷺ was saying: I have nothing to give you. The man turned away angry. He ﷺ said: whoever asks while he has an uqiyah or its worth has asked too much. I said: our she-camel is better than an uqiyah, so I went back and did not ask him. Later barley and raisins were brought to him ﷺ and he gave us a share, until Allah made us free of need.", "I therefore returned and did not beg from him"),
      difficulty: 3,
      questions: [
        { q: "Who sent the man of Banu Asad to ask?", a: "His wife", wrong: ["His chief", "A trader he met", "A man in the market"], why: "My wife said to me: go to the Messenger of Allah ﷺ and ask him for food." },
        { q: "What did the man of Banu Asad do in the end?", a: "Went back without asking", wrong: ["Asked twice as much", "Asked at the market", "Asked the next day"], why: "I therefore returned and did not beg from him, the man of Banu Asad said." },
        { q: "Allah later made the man of Banu Asad free of need.", tf: true, why: "He ﷺ gave them barley and raisins, until Allah made them self-sufficient." }
      ]
    }
  ]
};

export const ZAKAT_ASKING_UNITS: DeepUnit[] = [ASKING];
