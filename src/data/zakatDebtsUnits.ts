import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: debts, paid with care, from Jami at-Tirmidhi, Sunan Ibn Majah and Sahih al-Bukhari. Dying
// free of pride, ghulul and debt, a martyr forgiven all but his debt, the borrowed returned and the debt repaid, asking
// for a right decently, Khawlah's dates lent to repay a Bedouin, and debts and families he ﷺ took on. Every card is one
// sahih or hasan hadith with its number, narrator and grade, and its exact English words to highlight. Points the
// schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const DEBTS: DeepUnit = {
  key: "zakat-debts-paid-with-care",
  topicId: "zakat",
  branchId: "zakat-debts-paid-with-care",
  branch: { title: "Debts, paid with care", description: "Free of three, all but the debt, the debt is repaid, asking decently, Khawlah's dates, and debts he ﷺ took on." },
  name: "debts paid with care",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "free-of-three",
      title: "Free of three",
      line: "Die free of pride, stolen spoils and debt, and enter Paradise.",
      facts: ["Told by Thawban", "Kibr: pride", "Ghulul: taking from the spoils of war"],
      source: hadith("tirmidhi", "1572", "Thawban", "Sahih (Darussalam)", "Thawban said: the Messenger of Allah ﷺ said: whoever dies free of three, pride, ghulul and debt, will enter Paradise.", "Whoever dies and he is free of three"),
      difficulty: 1,
      questions: [
        { q: "Which of these is one of the three to be free of?", a: "Debt", wrong: ["Wealth", "Children", "Journeys"], why: "Whoever dies free of three, Kibr, Ghulul and debt, will enter Paradise, he ﷺ said." },
        { q: "Which word means pride?", a: "Kibr", wrong: ["Ghulul", "Sabr", "Riba"], why: "Kibr means pride, and it is one of the three he ﷺ named." },
        { q: "Ghulul means taking from the spoils of war before they are shared.", tf: true, why: "Ghulul refers to goods taken from the spoils of war before they are divided." }
      ]
    },
    {
      slug: "all-but-the-debt",
      title: "All but the debt",
      line: "Killed in Allah's cause, all is forgiven except the debt.",
      facts: ["Told by Abu Qatadah", "Patient, seeking the reward, not fleeing", "Jibril told him ﷺ about the debt"],
      source: hadith("tirmidhi", "1712", "Abu Qatadah", "Sahih (Darussalam)", "Abu Qatadah said: a man asked the Messenger of Allah ﷺ: if I am killed in the cause of Allah, will my sins be forgiven? He ﷺ said: yes, if you are patient, seeking the reward, advancing and not fleeing, except debt. Jibril told me that.", "except debt. For Jibril said that to me"),
      difficulty: 2,
      questions: [
        { q: "What did the man ask about being killed in Allah's cause?", a: "If his sins would be forgiven", wrong: ["If his wealth would be shared", "If his house would be kept", "If his horse would be saved"], why: "Yes, if you are patient, seeking the reward, not fleeing, he ﷺ answered the man." },
        { q: "Who told him ﷺ about the debt?", a: "Jibril", wrong: ["Abu Bakr", "Umar", "Uthman"], why: "Except debt, for Jibril said that to me, he ﷺ said." },
        { q: "Even a martyr must still have his debt paid.", tf: true, why: "Yes, if you are patient, seeking the reward, except debt, he ﷺ said." }
      ]
    },
    {
      slug: "the-debt-is-repaid",
      title: "The debt is repaid",
      line: "What is borrowed is returned, and a debt is repaid.",
      facts: ["Told by Abu Umamah", "In his ﷺ khutbah at the Farewell Hajj", "The guarantor is responsible"],
      source: hadith("tirmidhi", "1265", "Abu Umamah", "Hasan (Darussalam)", "Abu Umamah said: in the year of the Farewell Hajj, I heard the Prophet ﷺ say in his khutbah: what is borrowed is to be returned, the guarantor is responsible, and the debt is to be repaid.", "and the debt is to be repaid"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ say the debt is to be repaid?", a: "In the Farewell Hajj khutbah", wrong: ["In a Friday khutbah", "In an Eid khutbah", "In a rain prayer"], why: "Abu Umamah heard it in the khutbah of the Farewell Pilgrimage." },
        { q: "What must be done with something borrowed?", a: "Give it back", wrong: ["Keep it forever", "Sell it at once", "Hide it at home"], why: "The borrowed is to be returned, he ﷺ said in his khutbah." },
        { q: "The one who guarantees a debt is responsible for it.", tf: true, why: "And the guarantor is responsible, and the debt is to be repaid, he ﷺ said." }
      ]
    },
    {
      slug: "ask-for-it-decently",
      title: "Ask for it decently",
      line: "When you ask for what is yours, ask in a decent way.",
      facts: ["Told by Ibn Umar and Aishah", "Whoever asks for his rights", "As decently as he can"],
      source: hadith("ibnmajah", "2421", "Ibn Umar and Aishah", "Hasan (Darussalam)", "Ibn Umar and Aishah said: the Messenger of Allah ﷺ said: whoever asks for his rights, let him ask in a decent manner, as much as he can.", "in a decent manner as much as he can"),
      difficulty: 1,
      questions: [
        { q: "How should you ask for what someone owes you?", a: "In a decent manner", wrong: ["In a rough manner", "In a mocking manner", "In a loud manner"], why: "Whoever demands his rights let him do so in a decent manner, he ﷺ said." },
        { q: "You may ask for a right that is yours.", tf: true, why: "Whoever demands his rights let him do so in a decent manner, he ﷺ said." },
        { q: "Asking for your rights must always be harsh.", tf: false, why: "No. Whoever demands his rights should do so in a decent manner, he ﷺ said." }
      ]
    },
    {
      slug: "khawlahs-dates",
      title: "Khawlah's dates",
      line: "He ﷺ borrowed Khawlah's dates to repay a Bedouin in full.",
      facts: ["Told by Abu Sa'eed al-Khudri", "The Bedouin spoke harshly about his right", "He ﷺ paid him back and fed him"],
      source: hadith("ibnmajah", "2426", "Abu Sa'eed al-Khudri", "Hasan (Darussalam)", "Abu Sa'eed al-Khudri said: a Bedouin came to the Prophet ﷺ to ask for a debt and spoke harshly. The companions scolded him, and he said: I am only asking for my right. He ﷺ said: why do you not support the one who has a right? Then he sent to Khawlah bint Qais: if you have dates, lend them to us until our dates come. He repaid the Bedouin and fed him, and said: a nation in which the weak cannot get their rights without trouble is not purified.", "lend them to us until our dates come"),
      difficulty: 2,
      questions: [
        { q: "Whom did he ﷺ ask to lend him dates?", a: "Khawlah bint Qais", wrong: ["Asma bint Abi Bakr", "Umm Sulaim bint Milhan", "Ar-Rubayyi bint Muawwidh"], why: "He ﷺ sent word to Khawlah bint Qais: lend us dates until ours come." },
        { q: "What did the Bedouin say when the companions scolded him?", a: "I only ask for my right", wrong: ["I will leave it for now", "I forgive the whole debt", "I came to learn the Quran"], why: "I am only asking for my rights, the Bedouin said." },
        { q: "He ﷺ paid the Bedouin back and also fed him.", tf: true, why: "So she gave him a loan, and he paid back the Bedouin and fed him." }
      ]
    },
    {
      slug: "debts-he-took-on",
      title: "Debts he ﷺ took on",
      line: "Wealth goes to the heirs, and he ﷺ took on debts left behind.",
      facts: ["Told by Abu Hurairah", "Property left goes to the heirs", "A debt or dependants: we will take care of them"],
      source: hadith("bukhari", "6763", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: if a Muslim dies and leaves property, it goes to his heirs; and if he leaves a debt or dependants, we will take care of them.", "a debt or dependants, we will take care of them"),
      difficulty: 2,
      questions: [
        { q: "Besides a debt, what else did he ﷺ say he would take care of?", a: "Dependants left behind", wrong: ["Houses left behind", "Camels left behind", "Shops left behind"], why: "If he leaves a debt or dependants, we will take care of them, he ﷺ said." },
        { q: "Property a Muslim leaves goes to his heirs.", tf: true, why: "If somebody dies leaving some property, the property will go to his heirs, he ﷺ said." },
        { q: "Who narrated the saying about heirs and debts?", a: "Abu Hurairah", wrong: ["Abu Musa", "Abu Dharr", "Abu Ayyub"], why: "Abu Hurairah narrated it: a debt or dependants, we will take care of them." }
      ]
    }
  ]
};

export const ZAKAT_DEBTS_UNITS: readonly DeepUnit[] = [DEBTS];
