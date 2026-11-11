import { hadith, type DeepUnit } from "./deepKit";

// One more unit on the kids' Hadith path: signs Allah gave him ﷺ, all from Sahih al-Bukhari. Two lights on a dark
// night, a few loaves that fed seventy, the last of the food on one leather sheet, a sick boy's head, a boy too young
// for the pledge, and a wound at Khaybar that never hurt again. Every card is one sahih hadith with its number and
// narrator, and its exact English words to highlight, and none of them is taught anywhere else in the app.

const SIGNS: DeepUnit = {
  key: "kids-signs",
  topicId: "hadith",
  branchId: "hadith-signs",
  branch: { title: "Signs Allah gave him ﷺ", description: "Two lights on a dark night, bread for seventy, food on one leather sheet, a hand on a sick boy's head, a boy too young for the pledge, and a wound at Khaybar." },
  name: "signs Allah gave him ﷺ",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "two-lights-on-a-dark-night",
      title: "Two lights on a dark night",
      line: "Two companions walked home with two lights ahead of them.",
      facts: [
        "Anas ibn Malik told it.",
        "They left the Prophet's ﷺ house on a very dark night.",
        "Each light went with one man to his home."
      ],
      source: hadith("bukhari", "3639", "Anas ibn Malik", "Sahih", "Anas said: two of the companions of the Prophet ﷺ left his house on a very dark night. Two things like two lamps went with them, lighting the way in front of them. When the two men parted, each one had one of the lights with him until he reached his home.", "They were accompanied by two things that resembled two lamps lighting the way in front of them"),
      difficulty: 1,
      questions: [
        { q: "What lit the way for the two companions?", a: "Two lights like lamps", wrong: ["The full moon", "A big fire", "A torch they carried"], why: "Two things like two lamps went with them, shining on the road in front of them." },
        { q: "What happened when the two men parted?", a: "Each one kept one light", wrong: ["Both lights went out", "The lights flew away", "They lost their way"], why: "When they parted, each man had one light with him until he reached his home." },
        { q: "The night was very dark when they walked home.", tf: true, why: "They left the house of the Prophet ﷺ on a very dark night, Anas said." }
      ]
    },
    {
      slug: "bread-for-seventy",
      title: "Bread for seventy",
      line: "A few loaves of barley fed seventy or eighty men.",
      facts: [
        "Anas ibn Malik told it.",
        "Umm Sulaym sent the bread with young Anas.",
        "The men came in, ten at a time."
      ],
      source: hadith("bukhari", "3578", "Anas ibn Malik", "Sahih", "Anas said: Abu Talhah told Umm Sulaym that he heard weakness in the voice of the Messenger of Allah ﷺ, from hunger. She wrapped some barley loaves in her cloth and sent Anas with them. The Prophet ﷺ came with the people. Umm Sulaym brought the bread, it was broken into pieces, and she poured some butter on it. Then he ﷺ said: let ten come in. Ten came in, ate their fill and went out, then ten more, and ten more, until all of them had eaten their fill. They were seventy or eighty men.", "Ten persons were admitted, ate their fill and went out"),
      difficulty: 1,
      questions: [
        { q: "What did Umm Sulaym send to the Prophet ﷺ?", a: "Loaves of barley bread", wrong: ["A pot of honey", "A bowl of milk", "A basket of figs"], why: "She wrapped some barley loaves in her cloth and sent young Anas with them." },
        { q: "How many men came in to eat at a time?", a: "Ten at a time", wrong: ["Two at a time", "Fifty at a time", "All at once"], why: "Let ten come in, he ﷺ said, and ten came in, ate their fill and went out." },
        { q: "Everyone there ate until they were full.", tf: true, why: "In the end all of them ate their fill, and they were seventy or eighty men." }
      ]
    },
    {
      slug: "food-on-one-leather-sheet",
      title: "Food on one leather sheet",
      line: "A little food on one sheet was enough for everyone.",
      facts: [
        "Salamah ibn al-Akwa told it.",
        "Their food was running out on a journey.",
        "He ﷺ asked Allah to bless the food."
      ],
      source: hadith("bukhari", "2484", "Salamah ibn al-Akwa", "Sahih", "Salamah said: once on a journey our food ran low and the people became very poor. Umar went to the Prophet ﷺ, and he ﷺ told Umar: call the people to bring what is left of their food. A leather sheet was spread and all the food was heaped on it. He ﷺ stood and asked Allah to bless it, then told everyone to come with their pots, and they took from it until every one of them had enough. Then he ﷺ said: I testify that none has the right to be worshipped but Allah, and that I am His Messenger.", "invoked Allah to bless it, and then directed all the people to come with their utensils"),
      difficulty: 1,
      questions: [
        { q: "Where was all the food put together?", a: "On one leather sheet", wrong: ["In a big tent", "In a deep well", "On a tall rock"], why: "A leather sheet was spread, and all the food that was left was heaped up on it." },
        { q: "What did he ﷺ do before the people took the food?", a: "Asked Allah to bless it", wrong: ["Counted every piece", "Sent for more food", "Hid some of it away"], why: "He ﷺ stood up, made du'a over it, and then called everyone to come with their pots." },
        { q: "There was not enough food for everyone.", tf: false, why: "No. They took from it until every one of them had what was enough for them." }
      ]
    },
    {
      slug: "a-hand-on-his-head",
      title: "A hand on his head",
      line: "He ﷺ touched a sick boy's head and asked Allah to bless him.",
      facts: [
        "As-Sa'ib ibn Yazid told it.",
        "His aunt took him when he was ill.",
        "He saw the seal of prophethood between his ﷺ shoulders."
      ],
      source: hadith("bukhari", "5670", "As-Sa'ib ibn Yazid", "Sahih", "As-Sa'ib said: my aunt took me to the Messenger of Allah ﷺ and said: O Messenger of Allah, my nephew is ill. He ﷺ touched my head with his hand and asked Allah to bless me. Then he made wudu, and I drank from the water left from his wudu. I stood behind him and saw the seal of prophethood between his shoulders, like the button of a tent.", "touched my head with his hand and invoked Allah to bless me"),
      difficulty: 1,
      questions: [
        { q: "Who took As-Sa'ib to the Prophet ﷺ?", a: "His aunt", wrong: ["His teacher", "His big brother", "His neighbor"], why: "His aunt took him and said: O Messenger of Allah, my nephew is ill." },
        { q: "What did he ﷺ ask Allah for the sick boy?", a: "To bless him", wrong: ["To make him tall", "To make him rich", "To make him a king"], why: "He ﷺ touched the boy's head with his hand and made du'a for blessing." },
        { q: "As-Sa'ib saw the seal of prophethood between his ﷺ shoulders.", tf: true, why: "Standing behind him, As-Sa'ib saw it, like the button of a tent." }
      ]
    },
    {
      slug: "too-young-for-the-pledge",
      title: "Too young for the pledge",
      line: "His ﷺ du'a for a boy blessed the boy's trade.",
      facts: [
        "Abdullah ibn Hisham told it.",
        "His mother Zaynab bint Humayd brought him.",
        "Ibn Umar and Ibn az-Zubayr asked him to be their partner."
      ],
      source: hadith("bukhari", "2501", "Abdullah ibn Hisham", "Sahih", "Abdullah ibn Hisham's mother, Zaynab bint Humayd, took him to the Prophet ﷺ and said: O Messenger of Allah, take his pledge. He said: he is still too young for the pledge, and he passed his hand over his head and asked Allah to bless him. Years later, when Abdullah went to the market to buy food, Ibn Umar and Ibn az-Zubayr would meet him and say: be our partner, for the Prophet ﷺ asked Allah to bless you. He would be their partner, and very often he won a whole camel's load and sent it home.", "He is still too young for the pledge"),
      difficulty: 1,
      questions: [
        { q: "Why did he ﷺ not take the boy's pledge?", a: "He was still too young", wrong: ["He was too far away", "He came too late", "He was very ill"], why: "He ﷺ passed his hand over the boy's head and asked Allah to bless him instead." },
        { q: "What did Ibn Umar and Ibn az-Zubayr ask him?", a: "To be their partner", wrong: ["To teach them to read", "To lend them a camel", "To lead the prayer"], why: "Be our partner, for the Prophet ﷺ asked Allah to bless you, they would say." },
        { q: "The boy's trade was often blessed when he grew up.", tf: true, why: "Very often he won a whole camel's load and sent it home." }
      ]
    },
    {
      slug: "the-wound-at-khaybar",
      title: "The wound at Khaybar",
      line: "He ﷺ blew on Salamah's wound, and it never hurt again.",
      facts: [
        "Yazid ibn Abi Ubayd told it.",
        "He saw the mark of a wound on Salamah's leg.",
        "He ﷺ blew on it three times."
      ],
      source: hadith("bukhari", "4206", "Yazid ibn Abi Ubayd", "Sahih", "Yazid said: I saw the mark of a wound on Salamah's leg and asked him: O Abu Muslim, what is this wound? He said: I got it on the day of Khaybar, and the people said: Salamah has been hurt. I went to the Prophet ﷺ and he blew on it three times, and since then I have had no pain in it until this hour.", "since then I have not had any pain in it till this hour"),
      difficulty: 1,
      questions: [
        { q: "Where was Salamah's leg hurt?", a: "At Khaybar", wrong: ["At Badr", "At Uhud", "At the Trench"], why: "Salamah got the wound on the day of Khaybar, and the people said he was hurt." },
        { q: "What did he ﷺ do to the wound?", a: "Blew on it three times", wrong: ["Tied it with cloth", "Washed it in the sea", "Put honey on it"], why: "He ﷺ blew on it three times, and from then on it gave Salamah no pain at all." },
        { q: "Salamah's leg still hurt him for many years.", tf: false, why: "No. Since then I have not had any pain in it till this hour, Salamah said." }
      ]
    }
  ]
};

export const KIDS_SIGNS_UNITS: DeepUnit[] = [SIGNS];
