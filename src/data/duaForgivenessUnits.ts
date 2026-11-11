import { hadith, type DeepUnit } from "./deepKit";

// One more Du'as unit: asking Allah to forgive, from Jami at-Tirmidhi, Sunan Ibn Majah and Sunan Abi Dawud. A
// hundred times in one sitting, Rabbighfir li between the two sajdahs, the istighfar that forgives even fleeing a
// battle, a record full of istighfar, sins falling like dry leaves, and a du'a at a brother's grave. Every card is one
// sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight, and none of
// them is taught anywhere else in the app.

const FORGIVE: DeepUnit = {
  key: "duas-asking-forgiveness",
  topicId: "duas",
  branchId: "duas-asking-forgiveness",
  branch: { title: "Asking Allah to forgive", description: "A hundred times in one sitting, between the two sajdahs, a du'a that forgives even fleeing a battle, a record full of istighfar, sins falling like leaves, and a du'a at the grave." },
  name: "asking Allah to forgive",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-hundred-times-in-one-sitting",
      title: "A hundred times in one sitting",
      line: "In one sitting, he ﷺ asked forgiveness a hundred times.",
      facts: ["Told by Ibn Umar", "Rabbighfir li wa tub alayya", "Innaka antat-Tawwabul-Ghafur"],
      source: hadith("tirmidhi", "3434", "Ibn Umar", "Sahih (Al-Albani)", "Ibn Umar said: in one sitting of the Messenger of Allah ﷺ, you could count him saying a hundred times before he got up: O my Lord, forgive me and accept my repentance; You are the Oft-Returning, the Most Forgiving.", "O my Lord, forgive me, and accept my repentance. Verily, You are the Oft-Returning, the Most Forgiving"),
      difficulty: 1,
      questions: [
        { q: "How many times could they count it in one sitting?", a: "One hundred times", wrong: ["Three times", "Seven times", "Only once"], why: "Before he got up, he ﷺ said it a hundred times, Ibn Umar said." },
        { q: "Besides forgiveness, what did he ﷺ ask Allah to accept?", a: "His tawbah", wrong: ["His fasting", "His sadaqah", "His hajj"], why: "Wa tub alayya: and accept my repentance, he ﷺ would say." },
        { q: "He ﷺ called Allah the Oft-Returning, the Most Forgiving.", tf: true, why: "Innaka antat-Tawwabul-Ghafur ends the du'a he ﷺ said a hundred times." }
      ]
    },
    {
      slug: "between-the-two-sajdahs",
      title: "Between the two sajdahs",
      line: "Between his two sajdahs he ﷺ said: Rabbighfir li.",
      facts: ["Told by Hudhayfah", "He ﷺ said: Rabbighfir li, Rabbighfir li", "Meaning: O my Lord, forgive me"],
      source: hadith("ibnmajah", "897", "Hudhayfah", "Sahih (Al-Albani)", "Hudhayfah said: between the two prostrations, the Prophet ﷺ used to say: Rabbighfir li, Rabbighfir li, O my Lord, forgive me, O my Lord, forgive me.", "used to say between the two prostrations"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ say Rabbighfir li, Rabbighfir li?", a: "Between the two sajdahs", wrong: ["Before the adhan", "After eating", "On waking up"], why: "Hudhayfah said he ﷺ used to say it between the two prostrations." },
        { q: "What do you ask Allah for with Rabbighfir li?", a: "Forgiveness", wrong: ["Rain", "Food", "Wealth"], why: "Rabbighfir li means: O my Lord, forgive me." },
        { q: "He ﷺ asked Allah for forgiveness inside his prayer.", tf: true, why: "Between the two prostrations he ﷺ would say: O my Lord, forgive me." }
      ]
    },
    {
      slug: "even-if-he-fled-a-battle",
      title: "Even if he fled a battle",
      line: "With this istighfar, Allah forgives even fleeing from battle.",
      facts: ["Told by Zayd, freed slave of the Prophet ﷺ", "Astaghfirullahal-Azim alladhi la ilaha illa huwal-Hayyul-Qayyum", "Wa atubu ilayh: and I repent to Him"],
      source: hadith("tirmidhi", "3577", "Zayd, freed slave of the Prophet ﷺ", "Sahih (Al-Albani)", "Bilal ibn Yasar ibn Zayd said: my father told me from my grandfather that he heard the Prophet ﷺ say: whoever says: I seek forgiveness from Allah, the Magnificent, there is none worthy of worship but Him, the Living, the Sustainer of all, and I repent to Him, then Allah will forgive him, even if he had fled from battle.", "then Allah will forgive him, even if he fled from battle"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say Allah will do for whoever says it?", a: "Forgive him", wrong: ["Give him a palace", "Give him much gold", "Give him a crown"], why: "Allah will forgive him, even if he had fled from battle, he ﷺ said." },
        { q: "Which two names follow la ilaha illa huwa in it?", a: "Al-Hayy, Al-Qayyum", wrong: ["Al-Malik, Al-Quddus", "Al-Khaliq, Al-Bari", "Al-Awwal, Al-Akhir"], why: "Huwal-Hayyul-Qayyum: He is the Living, the Sustainer of all." },
        { q: "These words end with: wa atubu ilayh, and I repent to Him.", tf: true, why: "I seek forgiveness from Allah, the Magnificent, and I repent to Him." }
      ]
    },
    {
      slug: "a-record-full-of-istighfar",
      title: "A record full of istighfar",
      line: "Glad tidings to those whose record has much istighfar.",
      facts: ["Told by Abdullah ibn Busr", "Istighfar: asking Allah to forgive", "Our deeds are kept in a record"],
      source: hadith("ibnmajah", "3818", "Abdullah ibn Busr", "Sahih (Al-Albani)", "Abdullah ibn Busr said: the Prophet ﷺ said: glad tidings to the one who finds much seeking of forgiveness in the record of his deeds.", "Glad tidings to those who find a lot of seeking forgiveness in the record of their deeds"),
      difficulty: 1,
      questions: [
        { q: "Who did he ﷺ give glad tidings to?", a: "Those whose record has much istighfar", wrong: ["Those with the most gold", "Those with the biggest houses", "Those with the most friends"], why: "Those who find a lot of seeking forgiveness in the record of their deeds, he ﷺ said." },
        { q: "Where will a person find their istighfar?", a: "In the record of their deeds", wrong: ["Under their pillow", "In a box of gold", "On a mountain top"], why: "Glad tidings to those who find a lot of seeking forgiveness there, he ﷺ said." },
        { q: "Asking Allah for forgiveness a lot brings glad tidings.", tf: true, why: "Glad tidings to those who find much istighfar in their record, he ﷺ said." }
      ]
    },
    {
      slug: "sins-fall-like-leaves",
      title: "Sins fall like leaves",
      line: "Four words make sins fall, like dry leaves from a tree.",
      facts: ["Told by Anas ibn Malik", "He ﷺ struck a dry tree with his staff", "Alhamdulillah, Subhanallah, La ilaha illallah, Allahu akbar"],
      source: hadith("tirmidhi", "3533", "Anas ibn Malik", "Hasan (Al-Albani)", "Anas ibn Malik said: the Prophet ﷺ passed by a tree with dry leaves. He struck it with his staff and the leaves fell. Then he said: Alhamdulillah, Subhanallah, La ilaha illallah and Allahu akbar make the sins of a servant fall, just as the leaves of this tree fall.", "cause the sins to fall from the worshipper, just as the leaves of this tree fall"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ strike the dry tree with?", a: "His staff", wrong: ["His sandal", "A stone", "His hand"], why: "He ﷺ struck it with his staff, and its dry leaves fell, Anas said." },
        { q: "What do the four words make fall from a servant?", a: "His sins", wrong: ["His good deeds", "His riches", "His happiness"], why: "Just as the leaves of the tree fall, he ﷺ said of the four words." },
        { q: "Alhamdulillah and Subhanallah are among the four words.", tf: true, why: "With La ilaha illallah and Allahu akbar, they make sins fall like leaves." }
      ]
    },
    {
      slug: "at-a-brothers-grave",
      title: "At a brother's grave",
      line: "After a burial, ask Allah to forgive and keep him firm.",
      facts: ["Told by Uthman ibn Affan", "He ﷺ would stand at the grave after a burial", "The one buried is being questioned"],
      source: hadith("abudawud", "3221", "Uthman ibn Affan", "Sahih (Al-Albani)", "Uthman ibn Affan said: whenever the Prophet ﷺ finished burying someone, he would stand by the grave and say: ask forgiveness for your brother, and ask that he be kept firm, for he is being questioned now.", "Seek forgiveness for your brother, and beg steadfastness for him, for he will be questioned now"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell people to ask for their buried brother?", a: "Forgiveness and steadfastness", wrong: ["Gold and silver", "A long journey", "A big house"], why: "For he is being questioned now, he ﷺ said, standing at the grave." },
        { q: "Why did he ﷺ say to pray for him right then?", a: "He is being questioned now", wrong: ["He is hungry now", "He is asleep now", "He is far away"], why: "Seek forgiveness for your brother, and beg steadfastness for him, he ﷺ said." },
        { q: "He ﷺ stood by the grave after a burial to make du'a.", tf: true, why: "When he ﷺ finished burying the dead, he would stand at the grave, Uthman said." }
      ]
    }
  ]
};

export const DUA_FORGIVENESS_UNITS: DeepUnit[] = [FORGIVE];
