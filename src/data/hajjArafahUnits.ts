import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: the day of Arafah, from Sunan Abi Dawud, Sahih al-Bukhari and Sunan an-Nasa'i. Talbiyah and
// takbir on the road from Mina, a lost camel and a man of Quraysh standing at Arafat, standing up in the stirrups, the
// heritage of Ibrahim, a hand kept raised in du'a, and a modest pace on the way out. Every card is one sahih or hasan
// hadith with its number, narrator and grade, and its exact English words to highlight. Points the schools differ on
// (such as when the talbiyah stops) are left out, and none of these hadith is taught anywhere else in the app.

const ARAFAH: DeepUnit = {
  key: "hajj-the-day-of-arafah",
  topicId: "hajj",
  branchId: "hajj-the-day-of-arafah",
  branch: { title: "The day of Arafah", description: "Talbiyah and takbir from Mina, a lost camel, standing in the stirrups, the heritage of Ibrahim, hands raised in du'a, and a modest pace." },
  name: "the day of Arafah",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "from-mina-to-arafat",
      title: "From Mina to Arafat",
      line: "On the road to Arafat some said the talbiyah, some the takbir.",
      facts: ["Told by Abdullah ibn Umar", "Talbiyah: Labbayk Allahumma labbayk", "Takbir: saying Allahu akbar"],
      source: hadith("abudawud", "1816", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Abdullah ibn Umar said: we went with the Messenger of Allah ﷺ from Mina to Arafat; some of us were saying the talbiyah and the others were saying: Allah is most great.", "some of us were uttering talbiyah and the others were shouting"),
      difficulty: 2,
      questions: [
        { q: "Where were they going with him ﷺ?", a: "From Mina to Arafat", wrong: ["From Madinah to Badr", "From Taif to Makkah", "From Makkah to Jeddah"], why: "We proceeded along with the Messenger of Allah ﷺ from Mina to Arafat, Ibn Umar said." },
        { q: "Besides the talbiyah, what did the others say?", a: "Allahu akbar", wrong: ["Alhamdulillah", "Astaghfirullah", "Subhan Allah"], why: "The others were shouting: Allah is most great, Ibn Umar said of the road from Mina." },
        { q: "Some of them said the talbiyah on the way to Arafat.", tf: true, why: "Some of us were uttering talbiyah and the others were shouting the takbir, Ibn Umar said." }
      ]
    },
    {
      slug: "a-lost-camel",
      title: "A lost camel",
      line: "Looking for his camel, Jubair saw him ﷺ standing at Arafat.",
      facts: ["Told by Jubair ibn Mut'im", "It was the day of Arafat", "Quraysh were called the Hums"],
      source: hadith("bukhari", "1664", "Jubair ibn Mut'im", "Sahih", "Jubair ibn Mut'im said: my camel was lost, and I went out looking for it on the day of Arafat, and I saw the Prophet ﷺ standing at Arafat. I said to myself: by Allah, he is one of the Hums; what has brought him here?", "My camel was lost and I went out in search of it"),
      difficulty: 2,
      questions: [
        { q: "What was Jubair looking for on the day of Arafat?", a: "His lost camel", wrong: ["His lost sword", "His lost sandals", "His lost bag"], why: "My camel was lost and I went out in search of it on the day of Arafat, Jubair said." },
        { q: "Why was Jubair surprised to see him ﷺ there?", a: "He was one of the Hums of Quraysh", wrong: ["He was a trader from Sham", "He was a stranger from Yemen", "He was a traveler from Persia"], why: "By Allah he is from the Hums. What has brought him here? Jubair said to himself." },
        { q: "Jubair saw him ﷺ standing at Arafat on the day of Arafat.", tf: true, why: "I saw the Prophet ﷺ standing in Arafat, Jubair said, while he looked for his camel." }
      ]
    },
    {
      slug: "standing-in-the-stirrups",
      title: "Standing in the stirrups",
      line: "On 9 Dhul-Hijjah he ﷺ stood up in the stirrups of his camel.",
      facts: ["Told by Al-Adda' ibn Khalid", "9 Dhul-Hijjah is the day of Arafah", "Stirrups: foot rests hanging from a saddle"],
      source: hadith("abudawud", "1917", "Al-Adda' ibn Khalid", "Sahih (Al-Albani)", "Al-Adda' ibn Khalid said: I saw the Messenger of Allah ﷺ on the ninth of Dhul-Hijjah on a camel, standing up in the stirrups.", "on 9 Dhul-Hijjah on a camel standing at the stirrups"),
      difficulty: 2,
      questions: [
        { q: "Where was he ﷺ when Al-Adda' saw him on 9 Dhul-Hijjah?", a: "On a camel", wrong: ["On a horse", "On a mule", "On a donkey"], why: "I saw the Messenger of Allah ﷺ on 9 Dhul-Hijjah on a camel, Al-Adda' said." },
        { q: "Which day is 9 Dhul-Hijjah?", a: "The day of Arafah", wrong: ["The day of Eid", "The day of Ashura", "The first of Ramadan"], why: "The ninth of Dhul-Hijjah is the day of Arafah, when he ﷺ stood in the stirrups." },
        { q: "Al-Adda' saw him ﷺ standing up in the stirrups of his camel.", tf: true, why: "On 9 Dhul-Hijjah on a camel standing at the stirrups, Al-Adda' said he saw him." }
      ]
    },
    {
      slug: "heirs-of-ibrahim",
      title: "Heirs of Ibrahim",
      line: "Stay where you stand at Arafat; you are heirs of Ibrahim.",
      facts: ["Told by Yazid ibn Shayban", "Ibn Mirba' al-Ansari brought the message", "Their place seemed far from the imam"],
      source: hadith("abudawud", "1919", "Yazid ibn Shayban", "Sahih (Al-Albani)", "Yazid ibn Shayban said: we were at a place of standing at Arafat that Amr thought was very far from where the imam stood, when Ibn Mirba' al-Ansari came to us and said: I am a messenger to you from the Messenger of Allah ﷺ. He tells you: stand where you are performing your rites, for you are heirs to the heritage of Ibrahim.", "Station where you are performing your devotions for you are an heir to the heritage of Abraham"),
      difficulty: 2,
      questions: [
        { q: "What message did Ibn Mirba' bring from him ﷺ?", a: "Stay where you are standing", wrong: ["Move closer to the imam", "Wait for him at Mina", "Come to his tent"], why: "Station where you are performing your devotions, he ﷺ sent word with Ibn Mirba'." },
        { q: "Whose heritage are they heirs to, he ﷺ said?", a: "Ibrahim's", wrong: ["Nuh's", "Musa's", "Dawud's"], why: "You are heirs to the heritage of Abraham, the message from him ﷺ said." },
        { q: "Their place at Arafat seemed far from where the imam stood.", tf: true, why: "Amr thought it was very far away from where the imam was stationing, Yazid said." }
      ]
    },
    {
      slug: "a-hand-raised-in-dua",
      title: "A hand raised in du'a",
      line: "At Arafat he ﷺ raised his hands high in du'a.",
      facts: ["Told by Usamah ibn Zaid", "He rode behind him ﷺ at Arafat", "Halter: the rope that leads a camel"],
      source: hadith("nasai", "3011", "Usamah ibn Zaid", "Hasan (Darussalam)", "Usamah ibn Zaid said: I was riding behind the Prophet ﷺ at Arafat. He raised his hands in supplication; his she-camel leaned and he dropped her halter, so he took the halter with one hand while still raising the other hand.", "so he took the halter with one of his hands while he was raising the other hand"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do with his hands at Arafat?", a: "Raised them in du'a", wrong: ["Rested them on the saddle", "Kept them by his sides", "Put them behind his back"], why: "He raised his hands in supplication at Arafat, Usamah said, riding behind him ﷺ." },
        { q: "What did he ﷺ do when the halter dropped?", a: "Took it with one hand", wrong: ["Got down from the camel", "Called for someone to help", "Let the camel walk free"], why: "He took the halter with one of his hands while he was raising the other hand." },
        { q: "Usamah was riding behind him ﷺ at Arafat.", tf: true, why: "Usamah ibn Zaid said he was a companion rider with the Prophet ﷺ at Arafat." }
      ]
    },
    {
      slug: "a-modest-pace",
      title: "A modest pace",
      line: "Leaving Arafat he ﷺ went gently, faster where there was room.",
      facts: ["Told by Urwah ibn az-Zubair", "Usamah was asked about his ﷺ pace", "It was the Farewell Hajj"],
      source: hadith("bukhari", "1666", "Urwah ibn az-Zubair", "Sahih", "Urwah said: Usamah was asked in my presence how the Messenger of Allah ﷺ moved when leaving Arafat on the Farewell Hajj. Usamah said: he went at a modest pace, and when there was open space he went very fast.", "proceeded on with a modest pace, and when there was enough space"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ do when there was enough space?", a: "He went faster", wrong: ["He turned back to Arafat", "He went back to Mina", "He tied up his camel"], why: "When there was enough space he would go very fast, Usamah replied." },
        { q: "On which Hajj was Usamah asked about this?", a: "The Farewell Hajj", wrong: ["The Umrah of Hudaybiyah", "The Hajj of Abu Bakr", "The first Umrah"], why: "How was his ﷺ speed when leaving Arafat in the Farewell Hajj? Usamah was asked." },
        { q: "Usamah said he ﷺ went at a modest pace from Arafat.", tf: true, why: "The Prophet ﷺ proceeded on with a modest pace, Usamah replied when he was asked." }
      ]
    }
  ]
};

export const HAJJ_ARAFAH_UNITS: readonly DeepUnit[] = [ARAFAH];
