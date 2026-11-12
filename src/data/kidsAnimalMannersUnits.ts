import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: animals and good manners, from Sunan Abi Dawud, Sunan Ibn Majah and Sahih
// al-Bukhari. Frogs left alone, blessing in sheep, good in horses, a horse fed for Allah, asking before milking, and the
// owner riding in front. Every card is one sahih hadith with its number, narrator and grade, and its exact English
// words to highlight, and none of them is taught anywhere else in the app.

const ANIMAL_MANNERS: DeepUnit = {
  key: "kids-animal-manners",
  topicId: "hadith",
  branchId: "hadith-animal-manners",
  branch: { title: "Animals and good manners", description: "Frogs left alone, blessing in sheep, good in horses, a horse fed for Allah, asking before milking, and the owner riding in front." },
  name: "animals and good manners",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "leave-the-frogs-alone",
      title: "Leave the frogs alone",
      line: "A doctor asked about frogs for medicine; he ﷺ said no.",
      facts: [
        "Abd ar-Rahman ibn Uthman told it.",
        "A doctor wanted to put frogs in his medicine.",
        "He ﷺ said the frogs must not be killed."
      ],
      source: hadith("abudawud", "3871", "Abd ar-Rahman ibn Uthman", "Sahih (Al-Albani)", "Abd ar-Rahman ibn Uthman said: a doctor asked the Prophet ﷺ about putting frogs in medicine, and he forbade him from killing them.", "about putting frogs in medicine, he forbade him"),
      difficulty: 1,
      questions: [
        { q: "What did the doctor want to put in his medicine?", a: "Frogs", wrong: ["Snails", "Lizards", "Beetles"], why: "A physician asked about putting frogs in medicine, Abd ar-Rahman said." },
        { q: "What did he ﷺ say about the frogs?", a: "They must not be killed", wrong: ["They may be caught for fun", "They are good for medicine", "They should be chased away"], why: "He ﷺ forbade the doctor from killing the frogs, Abd ar-Rahman said." },
        { q: "Frogs are among the animals he ﷺ said not to kill.", tf: true, why: "He ﷺ forbade the doctor from killing frogs for his medicine." }
      ]
    },
    {
      slug: "blessing-in-sheep",
      title: "Blessing in sheep",
      line: "Keep sheep, for there is blessing in them, he ﷺ said.",
      facts: [
        "Umm Hani told it.",
        "He ﷺ said it to her.",
        "Sheep give us milk, wool and more."
      ],
      source: hadith("ibnmajah", "2304", "Umm Hani", "Sahih (Al-Albani)", "Umm Hani said: the Prophet ﷺ said to her: keep sheep, for in them is blessing.", "Keep sheep, for in them is blessing"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ tell Umm Hani to keep?", a: "Sheep", wrong: ["Bears", "Snakes", "Wolves"], why: "Keep sheep, for in them is blessing, he ﷺ said to Umm Hani." },
        { q: "What did he ﷺ say is in sheep?", a: "Blessing", wrong: ["Danger", "Sorrow", "Trouble"], why: "Keep sheep, for in them is blessing, Umm Hani heard him ﷺ say." },
        { q: "He ﷺ said there is blessing in keeping sheep.", tf: true, why: "For in them is blessing, he ﷺ told Umm Hani about sheep." }
      ]
    },
    {
      slug: "good-in-horses",
      title: "Good in horses",
      line: "Good will stay in the foreheads of horses until the Last Day.",
      facts: [
        "Abdullah ibn Umar told it.",
        "The forehead is the front of the head.",
        "Good stays with horses till the Day of Resurrection."
      ],
      source: hadith("bukhari", "2849", "Abdullah ibn Umar", "Sahih", "Abdullah ibn Umar said: the Messenger of Allah ﷺ said: good will remain in the foreheads of horses till the Day of Resurrection.", "in the foreheads of horses till the Day of Resurrection"),
      difficulty: 1,
      questions: [
        { q: "Which animals did he ﷺ say have good in their foreheads?", a: "Horses", wrong: ["Goats", "Donkeys", "Cows"], why: "Good will remain in the foreheads of horses, Abdullah ibn Umar heard him ﷺ say." },
        { q: "Until when will the good stay in them?", a: "The Day of Resurrection", wrong: ["The end of summer", "The next full moon", "The day they grow old"], why: "Till the Day of Resurrection, good will remain in the foreheads of horses, he ﷺ said." },
        { q: "The good in horses will end very soon.", tf: false, why: "No. Good will remain in the foreheads of horses till the Day of Resurrection." }
      ]
    },
    {
      slug: "a-horse-kept-for-allah",
      title: "A horse kept for Allah",
      line: "A horse kept for Allah: what it eats and drinks earns reward.",
      facts: [
        "Abu Hurairah told it.",
        "The horse is kept in Allah's cause, with faith in His promise.",
        "Its owner is rewarded for what it eats and drinks."
      ],
      source: hadith("bukhari", "2853", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: whoever keeps a horse in Allah's cause, out of faith in Allah and belief in His promise, will be rewarded on the Day of Resurrection for what the horse has eaten and drunk.", "he will be rewarded on the Day of Resurrection for what the horse has eaten or drunk"),
      difficulty: 1,
      questions: [
        { q: "What will the owner be rewarded for?", a: "What the horse eats and drinks", wrong: ["How fast the horse runs", "How tall the horse grows", "How much the horse costs"], why: "He will be rewarded on the Day of Resurrection for what the horse has eaten or drunk." },
        { q: "Why does the owner keep the horse?", a: "To serve Allah's cause", wrong: ["To win prizes at races", "To show off to others", "To sell it for money"], why: "He keeps a horse in Allah's cause, out of faith in Allah and belief in His promise." },
        { q: "Looking after a horse kept for Allah brings reward.", tf: true, why: "He will be rewarded for what the horse has eaten or drunk, Abu Hurairah heard him ﷺ say." }
      ]
    },
    {
      slug: "ask-before-milking",
      title: "Ask before milking",
      line: "Never milk someone's animal without the owner's permission.",
      facts: [
        "Abdullah ibn Umar told it.",
        "An animal's udder is like its owner's food store.",
        "Nobody likes someone breaking into his store."
      ],
      source: hadith("bukhari", "2435", "Abdullah ibn Umar", "Sahih", "Abdullah ibn Umar said: the Messenger of Allah ﷺ said: an animal should not be milked without the permission of its owner. Would any of you like someone to come to his store, break his container and take his food? The udders of animals are the stores of their owners.", "An animal should not be milked without the permission of its owner"),
      difficulty: 1,
      questions: [
        { q: "What must you have before milking someone's animal?", a: "The owner's permission", wrong: ["A clean bucket", "A friend to help", "A sunny day"], why: "An animal should not be milked without its owner's permission, Ibn Umar heard him ﷺ say." },
        { q: "What did he ﷺ compare an animal's udder to?", a: "The owner's food store", wrong: ["A river of milk", "A gift for anyone", "A public well"], why: "The udders of the animals are the stores of their owners, where their food is kept." },
        { q: "Milking a neighbor's animal without asking is fine.", tf: false, why: "No. Nobody should milk another's animal without asking its owner, he ﷺ said." }
      ]
    },
    {
      slug: "the-owner-rides-in-front",
      title: "The owner rides in front",
      line: "The owner has more right to ride in front on his animal.",
      facts: [
        "Buraydah ibn al-Hasib told it.",
        "A man offered him ﷺ a ride on his donkey.",
        "The man moved to the back of his donkey."
      ],
      source: hadith("abudawud", "2572", "Buraydah ibn al-Hasib", "Hasan Sahih (Al-Albani)", "Buraydah ibn al-Hasib said: while the Messenger of Allah ﷺ was walking, a man with a donkey came and said: Messenger of Allah, ride; and he moved to the back of the animal. He ﷺ said: no, you have more right to ride in front on your animal than me, unless you give that right to me. The man said: I give it to you. So he rode.", "you have more right to ride in front on your animal than me unless you grant that right to me"),
      difficulty: 1,
      questions: [
        { q: "Who has more right to ride in front on an animal?", a: "Its owner", wrong: ["The oldest rider", "The tallest rider", "The first to arrive"], why: "You have more right to ride in front on your animal than me, he ﷺ told the man." },
        { q: "What did the man do when he offered the ride?", a: "Moved to the back", wrong: ["Got off and walked", "Ran away fast", "Sat on the side"], why: "Messenger of Allah ﷺ, ride, he said, and moved to the back of the animal, Buraydah said." },
        { q: "The owner can give his front seat to someone else.", tf: true, why: "Unless you grant that right to me, he ﷺ said, and the man granted it." }
      ]
    }
  ]
};

export const KIDS_ANIMAL_MANNERS_UNITS: DeepUnit[] = [ANIMAL_MANNERS];
