import { hadith, type DeepUnit } from "./deepKit";

// One more Zakat unit: the manners of giving, from the Book of Zakat in Jami at-Tirmidhi. Every card is one sahih
// hadith (number, narrator and grade as sunnah.com gives them), with its exact English words to highlight, and
// none of them is taught anywhere else in the app.

const GIVING: DeepUnit = {
  key: "zakat-manners-of-giving",
  topicId: "zakat",
  branchId: "zakat-manners-of-giving",
  branch: { title: "The manners of giving", description: "Zakat on the road to Paradise, a pleased collector, charity or a gift, giving even a little, hearts won by giving, and never taking it back." },
  name: "the manners of giving",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "road-to-paradise",
      title: "Zakat on the road to Paradise",
      line: "Pray, fast, pay your zakat, and enter your Lord's Paradise.",
      facts: ["Told by Abu Umamah, who was thirty", "A sermon at the Farewell Hajj"],
      source: hadith("tirmidhi", "616", "Abu Umamah", "Sahih (Al-Albani)", "Abu Umamah heard the Prophet ﷺ say in his Farewell Hajj sermon: fear your Lord, pray your five, fast your month, pay the zakat on your wealth, obey those in charge of you, and you will enter the Paradise of your Lord.", "and fast your month, and pay the Zakat on your wealth"),
      difficulty: 1,
      questions: [
        { q: "Where did Abu Umamah hear that sermon?", a: "At the Farewell Hajj", wrong: ["At the Battle of Uhud", "At the Treaty of Hudaybiyah", "At the Conquest of Makkah"], why: "Abu Umamah was thirty years old when he heard it." },
        { q: "Where do taqwa, prayer, fasting and zakat lead, he ﷺ said?", a: "To the Paradise of your Lord", wrong: ["To great wealth", "To a long life", "To many children"], why: "He ﷺ also named obeying those in charge of you." },
        { q: "In that sermon, zakat stands beside prayer and fasting.", tf: true, why: "Pray your five, fast your month, and pay the zakat on your wealth." }
      ]
    },
    {
      slug: "pleased-collector",
      title: "A pleased zakat collector",
      line: "When the zakat collector comes, let him leave pleased.",
      facts: ["Told by Jarir ibn Abdullah", "Al-musaddiq: the zakat collector"],
      source: hadith("tirmidhi", "647", "Jarir ibn Abdullah", "Sahih (Al-Albani)", "The Prophet ﷺ said: when the zakat collector comes to you, let him leave you only when he is pleased.", "When the charity collector comes to you, then he should not depart from you except while pleased"),
      difficulty: 1,
      questions: [
        { q: "How should the zakat collector leave you?", a: "Pleased with you", wrong: ["Angry", "Empty-handed", "In a hurry"], why: "Give what is due gladly, so he does not depart unhappy." },
        { q: "Who told the hadith about the zakat collector?", a: "Jarir ibn Abdullah", wrong: ["Abu Dharr", "Mu'adh ibn Jabal", "Abdullah ibn Umar"], why: "Jarir heard him ﷺ say the collector should leave pleased." },
        { q: "Arguing until the zakat collector leaves upset fits the Sunnah.", tf: false, why: "No. The collector should not leave you except pleased." }
      ]
    },
    {
      slug: "charity-or-gift",
      title: "Charity or a gift",
      line: "He ﷺ would not eat charity, but he would eat a gift.",
      facts: ["Sadaqah: charity", "Hadiyyah: a gift"],
      source: hadith("tirmidhi", "656", "Bahz ibn Hakim, from his grandfather", "Hasan Sahih (Al-Albani)", "When something was brought to the Prophet ﷺ, he would ask: is this charity or a gift? If they said charity, he did not eat it, and if they said a gift, he ate it.", "When something was brought to him, the Messenger of Allah would ask"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask when food was brought to him?", a: "Is it charity or a gift?", wrong: ["Who cooked it?", "Is there more?", "How much did it cost?"], why: "He would not eat charity, but he would eat a gift." },
        { q: "What did he ﷺ do with a gift of food?", a: "He ate from it", wrong: ["He kept it for later", "He gave it to others", "He returned it"], why: "He ﷺ accepted gifts, but charity was not for him to eat." },
        { q: "He ﷺ ate from the charity that was brought to him.", tf: false, why: "No. If they said it was charity, he would not eat it." }
      ]
    },
    {
      slug: "even-a-little",
      title: "Give even a little",
      line: "Give the needy at your door, even a burnt sheep's foot.",
      facts: ["Told by Umm Bujaid", "She gave the pledge to him ﷺ"],
      source: hadith("tirmidhi", "665", "Umm Bujaid", "Sahih (Al-Albani)", "Umm Bujaid said: a needy person stands at my door and I find nothing to give him. The Prophet ﷺ said: if you find nothing to give him but a burnt trotter, put it in his hand.", "If you do not find anything to give him except a burnt trotter then hand it over to him"),
      difficulty: 1,
      questions: [
        { q: "Who stood at Umm Bujaid's door?", a: "A needy person", wrong: ["A trader", "A guest from Makkah", "A neighbor's child"], why: "She could not find anything to give him." },
        { q: "What did he ﷺ say she could give, if nothing else?", a: "A burnt sheep's foot", wrong: ["A bag of gold", "Her best dress", "Nothing at all"], why: "Even a burnt trotter: hand it over to him." },
        { q: "If you have only a little, you should give nothing.", tf: false, why: "No. Give even a little, like a burnt trotter." }
      ]
    },
    {
      slug: "hearts-won",
      title: "Giving that wins hearts",
      line: "His ﷺ giving turned Safwan's heart to love him most.",
      facts: ["Told by Safwan ibn Umayyah", "On the day of Hunayn"],
      source: hadith("tirmidhi", "666", "Safwan ibn Umayyah", "Sahih (Al-Albani)", "Safwan ibn Umayyah said: the Prophet ﷺ gave to me on the day of Hunayn, when I disliked him more than anyone, and he kept giving to me until he was the one I loved most.", "But he did not stop giving to me until he was the most loved creature to me"),
      difficulty: 2,
      questions: [
        { q: "On which day did he ﷺ give to Safwan?", a: "The day of Hunayn", wrong: ["The day of Badr", "The day of Uhud", "The day of the Trench"], why: "He kept giving to Safwan until Safwan loved him most." },
        { q: "What did his ﷺ giving do to Safwan's heart?", a: "Filled it with love", wrong: ["Made it proud", "Made it jealous", "Left it the same"], why: "He did not stop giving to me until he was the most loved to me." },
        { q: "Kind giving can turn a heart from dislike to love.", tf: true, why: "Safwan came to love him ﷺ more than anyone because of his giving." }
      ]
    },
    {
      slug: "never-take-back",
      title: "Never take back your charity",
      line: "What you give in charity, do not take back, even by buying.",
      facts: ["Told by Abdullah ibn Umar", "Umar gave a horse for Allah's cause"],
      source: hadith("tirmidhi", "668", "Abdullah ibn Umar", "Sahih (Al-Albani)", "Umar gave a horse to be used in Allah's cause, then saw it being sold and wanted to buy it. The Prophet ﷺ said: do not take back what you have given in charity.", "Do not take back what you have given in charity"),
      difficulty: 2,
      questions: [
        { q: "What did Umar give in Allah's cause?", a: "A horse", wrong: ["A she-camel", "A sword", "A garden"], why: "Then he saw it being sold, and wanted to buy it." },
        { q: "Why did Umar not buy his horse back?", a: "He ﷺ told him not to", wrong: ["The price was too high", "The seller refused", "The horse ran away"], why: "Do not take back what you have given in charity." },
        { q: "Buying back your own charity is a good idea.", tf: false, why: "No. Do not take back what you have given in charity." }
      ]
    }
  ]
};

export const ZAKAT_GIVING_UNITS: DeepUnit[] = [GIVING];
