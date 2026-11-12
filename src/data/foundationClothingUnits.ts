import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: sunnahs of clothing, from Sunan Abi Dawud, Sahih al-Bukhari, Sunan Ibn Majah and Jami
// at-Tirmidhi. Two green garments, a black turban on the pulpit, the two simple garments he ﷺ died in, sandals with
// two straps, a garment worn for pride, and fine clothes left out of humility. Every card is one sahih or hasan hadith
// with its number, narrator and grade, and its exact English words to highlight. Points the schools differ on are left
// out, and none of these hadith is taught anywhere else in the app.

const CLOTHING: DeepUnit = {
  key: "found-sunnahs-of-clothing",
  topicId: "foundation",
  branchId: "foundation-sunnahs-of-clothing",
  branch: { title: "Sunnahs of clothing", description: "Two green garments, a black turban on the pulpit, his two simple garments, sandals with two straps, a garment of pride, and fine clothes left for Allah." },
  name: "sunnahs of clothing",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "two-green-garments",
      title: "Two green garments",
      line: "Abu Rimthah saw him ﷺ wearing two green garments.",
      facts: ["Told by Abu Rimthah", "He came with his father to the Prophet ﷺ", "Green: a color he ﷺ wore"],
      source: hadith("abudawud", "4065", "Abu Rimthah", "Sahih (Al-Albani)", "Abu Rimthah said: I went with my father to the Prophet ﷺ and saw two green garments over him.", "and saw two green garments over him"),
      difficulty: 1,
      questions: [
        { q: "What color were the two garments Abu Rimthah saw?", a: "Green", wrong: ["Red", "Yellow", "Black"], why: "Abu Rimthah went with his father and saw two green garments over him ﷺ." },
        { q: "Who went with Abu Rimthah to the Prophet ﷺ?", a: "His father", wrong: ["His brother", "His uncle", "His friend"], why: "He came with his father, Abu Rimthah said, and saw him ﷺ dressed in green." },
        { q: "Abu Rimthah saw the Prophet ﷺ in two green garments.", tf: true, why: "He saw two green garments over him ﷺ when he came with his father." }
      ]
    },
    {
      slug: "a-black-turban",
      title: "A black turban",
      line: "On the pulpit he ﷺ wore a black turban.",
      facts: ["Told by Amr ibn Huraith", "Seen on the pulpit", "Both ends hung between his ﷺ shoulders"],
      source: hadith("abudawud", "4077", "Amr ibn Huraith", "Sahih (Al-Albani)", "Amr ibn Huraith reported: I saw the Prophet ﷺ on the pulpit wearing a black turban, and he let both of its ends hang down between his shoulders.", "on the pulpit and he wore a black turban, and he let both the ends hang between his shoulders"),
      difficulty: 1,
      questions: [
        { q: "What color was the turban he ﷺ wore on the pulpit?", a: "Black", wrong: ["White", "Green", "Yellow"], why: "He wore a black turban on the pulpit, with both of its ends hanging down." },
        { q: "Where did he ﷺ let the two ends of the turban hang?", a: "Between his shoulders", wrong: ["Over his chest", "Down to his feet", "Around his neck"], why: "He let both the ends hang between his shoulders, Amr ibn Huraith said." },
        { q: "He ﷺ was seen on the pulpit wearing a turban.", tf: true, why: "On the pulpit he wore a black turban, and both its ends hung between his shoulders." }
      ]
    },
    {
      slug: "his-two-simple-garments",
      title: "His two simple garments",
      line: "Aishah showed the two simple garments he ﷺ died in.",
      facts: ["Told by Abu Burdah", "Kisa: a square black woolen cloth", "Izar: a cloth for the lower body"],
      source: hadith("bukhari", "5818", "Abu Burdah", "Sahih", "Abu Burdah said: Aishah brought out to us a kisa and an izar and said: the Prophet ﷺ died while wearing these two. A kisa is a square black woolen cloth, and an izar is a sheet worn over the lower half of the body.", "Aisha brought out to us a Kisa and an Izar and said"),
      difficulty: 2,
      questions: [
        { q: "What did Aishah bring out to show them?", a: "A kisa and an izar", wrong: ["A bowl and a cup", "A sword and a shield", "A mat and a pillow"], why: "He ﷺ died while wearing these two, Aishah said of the kisa and the izar." },
        { q: "What is a kisa?", a: "A square black woolen cloth", wrong: ["A soft silk shirt", "A tall gold crown", "A long leather belt"], why: "The source explains kisa as a square black piece of woolen cloth." },
        { q: "Aishah showed people the two garments he ﷺ died in.", tf: true, why: "She brought out a kisa and an izar and said he ﷺ died while wearing these two." }
      ]
    },
    {
      slug: "sandals-with-two-straps",
      title: "Sandals with two straps",
      line: "Anas showed his ﷺ two sandals, which had two straps.",
      facts: ["Told by Isa ibn Tahman", "Anas ibn Malik brought them out", "Thabit al-Bunani said whose they were"],
      source: hadith("bukhari", "5858", "Isa ibn Tahman", "Sahih", "Isa ibn Tahman said: Anas ibn Malik brought out to us two sandals with two straps. Thabit al-Bunani said: these were the sandals of the Prophet ﷺ.", "Anas bin Malik brought out for us, two sandals having two straps"),
      difficulty: 2,
      questions: [
        { q: "Who brought out the two sandals?", a: "Anas ibn Malik", wrong: ["Zayd ibn Thabit", "Salman al-Farisi", "Mu'adh ibn Jabal"], why: "Anas bin Malik brought out the two sandals, and Thabit said whose they were." },
        { q: "How many straps did the sandals have?", a: "Two straps", wrong: ["One strap", "Three straps", "No straps"], why: "Two sandals having two straps, Isa ibn Tahman said, and they were his ﷺ." },
        { q: "Thabit al-Bunani said these were the sandals of the Prophet ﷺ.", tf: true, why: "When Anas brought them out, Thabit said they were the sandals of the Prophet ﷺ." }
      ]
    },
    {
      slug: "a-garment-of-pride",
      title: "A garment of pride",
      line: "A garment worn for pride brings humiliation on that Day.",
      facts: ["Told by Abdullah ibn Umar", "A garment of pride: worn to show off", "Allah clothes him in humiliation"],
      source: hadith("ibnmajah", "3606", "Abdullah ibn Umar", "Hasan (Al-Albani)", "Ibn Umar said: the Messenger of Allah ﷺ said: whoever wears a garment of pride and vanity, Allah will clothe him on the Day of Resurrection in a garment of humiliation.", "Whoever wears a garment of pride and vanity, Allah will clothe him, on the Day of Resurrection, in a garment of humiliation"),
      difficulty: 2,
      questions: [
        { q: "What will Allah clothe the proud dresser in on that Day?", a: "A garment of humiliation", wrong: ["A garment of light", "A crown of honor", "A robe of silk"], why: "Allah will clothe him, on the Day of Resurrection, in a garment of humiliation." },
        { q: "What kind of garment brings humiliation, he ﷺ said?", a: "One worn for pride and vanity", wrong: ["One worn to keep warm", "One worn for prayer", "One worn to work in"], why: "Whoever wears a garment of pride and vanity, Allah clothes him in humiliation." },
        { q: "Wearing clothes to show off brings honor on Judgment Day.", tf: false, why: "No. A garment of pride brings a garment of humiliation on the Day of Resurrection." }
      ]
    },
    {
      slug: "fine-clothes-left-for-allah",
      title: "Fine clothes left for Allah",
      line: "Leaving fine clothes out of humility earns garments of faith.",
      facts: ["Told by Mu'adh ibn Anas", "Left while he could afford them", "Hulal of faith: garments of Paradise"],
      source: hadith("tirmidhi", "2481", "Mu'adh ibn Anas", "Hasan (Al-Albani)", "Mu'adh ibn Anas said: the Messenger of Allah ﷺ said: whoever leaves fine clothes out of humility to Allah while he is able to afford them, Allah will call him before the heads of creation on the Day of Judgement so that he may choose whichever garments of faith he wishes to wear. The garments of faith are the garments of Paradise given to the people of faith.", "Allah will call him before the heads of creation on the Day of Judgement so that he can chose whichever Hulal of faith he wishes to wear"),
      difficulty: 3,
      questions: [
        { q: "Why does he leave the fine clothes, he ﷺ said?", a: "Out of humility to Allah", wrong: ["Out of shortage of money", "Out of fear of people", "Out of love of fame"], why: "He leaves fine dress out of humility to Allah while he is able to afford it." },
        { q: "What may he choose before all creation on that Day?", a: "Garments of faith", wrong: ["Chests of silver", "Fields of wheat", "Herds of camels"], why: "He may choose whichever garments of faith he wishes, the garments of Paradise." },
        { q: "He must be unable to afford fine clothes to earn this.", tf: false, why: "No. He leaves fine clothes while he is able to afford them, out of humility." }
      ]
    }
  ]
};

export const FOUNDATION_CLOTHING_UNITS: readonly DeepUnit[] = [CLOTHING];
