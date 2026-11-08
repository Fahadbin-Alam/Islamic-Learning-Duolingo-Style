import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Marriage taught in depth: before the wedding, what a husband should know, what a wife should know, and the
// mistakes people often make. Each card is one sahih or hasan hadith (number and grade as sunnah.com gives them)
// or an ayah. Matters the scholars differ on (the wali's role, witnesses, triple talaq, a wife's duties to his
// family) are left out.

const BEFORE: DeepUnit = {
  key: "before-marriage",
  topicId: "marriage",
  branchId: "marriage-foundations",
  name: "getting married",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "her-yes",
      title: "She must agree",
      line: "A woman is not married off without her own agreement.",
      facts: ["A woman married before must be asked and give her word.", "A shy first-time bride may say yes by her silence.", "No one may force her, not even her father."],
      source: hadith("bukhari", "5136", "Abu Hurairah", "Sahih", "A woman who was married before is not married off until she is consulted, and a virgin is not married off until her permission is asked. They said: how is her permission? He ﷺ said: her silence.", "a virgin should not be given in marriage except after her permission"),
      difficulty: 1,
      questions: [
        { q: "Can a woman be married off without agreeing?", a: "No, she must agree", wrong: ["Yes, if her father wants", "Yes, if the man is rich", "Only on Eid"], why: "She should not be given in marriage except after her permission." },
        { q: "How may a shy first-time bride show her yes?", a: "By her silence", wrong: ["By running away", "By crying loudly", "By saying no"], why: "Her silence indicates her permission." },
        { q: "A woman married before only needs to be told, not asked.", tf: false, why: "A matron should not be given in marriage except after consulting her." }
      ]
    },
    {
      slug: "khansa",
      title: "Khansa's marriage undone",
      line: "Khansa was married off against her will; the Prophet ﷺ undid it.",
      facts: ["Khansa bint Khidam was from the Ansar.", "She disliked the marriage and went to the Prophet ﷺ.", "He ﷺ declared the marriage invalid."],
      source: hadith("bukhari", "5138", "Khansa bint Khidam", "Sahih", "Her father married her off when she had been married before, and she disliked it. She went to the Messenger of Allah ﷺ, and he cancelled the marriage.", "he declared that marriage invalid"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ do about Khansa's forced marriage?", a: "He cancelled it", wrong: ["He let it stand", "He told her to be patient", "He sent her away"], why: "He declared that marriage invalid." },
        { q: "Who married Khansa off without her agreeing?", a: "Her father", wrong: ["Her brother", "Her uncle", "A judge"], why: "Her father gave her in marriage and she disliked it." },
        { q: "Forcing a woman into marriage is allowed in Islam.", tf: false, why: "The Prophet ﷺ cancelled Khansa's marriage because she did not want it." }
      ]
    },
    {
      slug: "look-at-her",
      title: "See each other first",
      line: "Al-Mughirah wanted to marry. The Prophet ﷺ said: go and see her.",
      facts: ["Seeing each other helps love last.", "The meeting is proper, not alone in secret.", "Al-Mughirah ibn Shu'bah was the man."],
      source: hadith("tirmidhi", "1087", "Al-Mughirah ibn Shu'bah", "Sahih (Al-Albani)", "Al-Mughirah ibn Shu'bah proposed to a woman. The Prophet ﷺ said: look at her, for that is more likely to make things good between you.", "Look at her, for indeed that is more likely to make things better between the two of you"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ tell Al-Mughirah before he married?", a: "To see the woman first", wrong: ["To marry without seeing", "To ask only his friends", "To wait ten years"], why: "Look at her, for that is more likely to make things better between you." },
        { q: "Why should a couple see each other first?", a: "It helps love between them", wrong: ["To judge her clothes", "To bargain the mahr", "There is no reason"], why: "That is more likely to make things better between the two of you." },
        { q: "Who wanted to marry, in this hadith?", a: "Al-Mughirah ibn Shu'bah", wrong: ["Abu Lahab", "Abdur-Rahman ibn Awf", "Iyad ibn Himar"], why: "Al-Mughirah bin Shu'bah proposed to a woman." }
      ]
    },
    {
      slug: "faith-and-character",
      title: "Faith and good character",
      line: "A man of good faith and character proposes? Do not refuse him.",
      facts: ["Look at his deen and his manners first.", "Turning such men away brings trouble on earth.", "Abu Hurairah narrated it."],
      source: hadith("tirmidhi", "1084", "Abu Hurairah", "Hasan (Al-Albani)", "When someone whose religion and character you are pleased with proposes, marry him. If you do not, there will be trouble in the land and great harm.", "When someone whose religion and character you are pleased with proposes"),
      difficulty: 2,
      questions: [
        { q: "What two things should a family look for in a man who proposes?", a: "His religion and character", wrong: ["His car and house", "His height and looks", "His tribe and fame"], why: "When someone whose religion and character you are pleased with proposes, marry him." },
        { q: "What happens if such men are turned away, says the hadith?", a: "Trouble in the land", wrong: ["Nothing at all", "More money for all", "Faster weddings"], why: "There will be turmoil in the land and abounding discord." },
        { q: "Money matters more than faith when choosing.", tf: false, why: "Religion and character come first." }
      ]
    },
    {
      slug: "no-double-proposal",
      title: "Do not propose over him",
      line: "Do not propose to a woman another Muslim has already asked for.",
      facts: ["Wait until he gives up or allows it.", "It is like not breaking another's deal.", "Ibn Umar narrated it."],
      source: hadith("bukhari", "5142", "Ibn Umar", "Sahih", "A man should not ask for the hand of a woman his Muslim brother has already asked for, unless the first one leaves it or gives him permission.", "a man should not ask for the hand of a girl who is already engaged to his Muslim brother"),
      difficulty: 2,
      questions: [
        { q: "Someone has already proposed to her. What should you do?", a: "Wait until he leaves it", wrong: ["Propose quickly first", "Offer a bigger mahr", "Tell her bad things about him"], why: "Unless the first suitor gives her up, or allows him to ask for her hand." },
        { q: "When may a second man propose?", a: "If the first gives up or allows it", wrong: ["Any time", "After one day", "Never in any case"], why: "Unless the first suitor gives her up, or allows him." },
        { q: "Proposing over a brother's proposal can hurt hearts.", tf: true, why: "That is why the Prophet ﷺ forbade it." }
      ]
    },
    {
      slug: "walimah",
      title: "The wedding meal",
      line: "Give a wedding meal, even if with one sheep.",
      facts: ["Abdur-Rahman ibn Awf married in Madinah.", "His mahr was a date-stone's weight of gold.", "A walimah is a meal to share the joy."],
      source: hadith("bukhari", "5167", "Anas ibn Malik", "Sahih", "Abdur-Rahman ibn Awf married a woman of the Ansar, and gave a mahr of gold the weight of a date-stone. The Prophet ﷺ said to him: give a walimah, even with one sheep.", "Give a banquet, even if with one sheep"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ tell Abdur-Rahman to give?", a: "A wedding meal", wrong: ["A big house", "A new horse", "A gold ring"], why: "Give a banquet, even if with one sheep." },
        { q: "What was Abdur-Rahman's mahr?", a: "A date-stone's weight of gold", wrong: ["A thousand camels", "A palace", "Nothing at all"], why: "Gold equal to the weight of a date stone." },
        { q: "A walimah must be huge and costly.", tf: false, why: "Even with one sheep, he said." }
      ]
    },
    {
      slug: "the-dua",
      title: "The du'a for a new couple",
      line: "Bless a new couple with the du'a: Barakallahu lakuma.",
      facts: ["Barakallahu laka: may Allah bless it for you.", "Wa baraka alayka: and bless you.", "Wa jama'a baynakuma fi khayr: and join you in good."],
      source: hadith("abudawud", "2130", "Abu Hurairah", "Sahih (Al-Albani)", "When the Prophet ﷺ congratulated a man on his marriage he said: May Allah bless it for you, and bless you, and bring you together in good.", "May Allah bless for you, and may He bless on you, and combine both of you in good"),
      difficulty: 3,
      questions: [
        { q: "What does Wa jama'a baynakuma fi khayr mean?", a: "And join you both in good", wrong: ["Happy birthday", "Have a safe trip", "Pray on time"], why: "Combine both of you in good." },
        { q: "When did the Prophet ﷺ say this du'a?", a: "When congratulating a new couple", wrong: ["When someone sneezed", "Before sleeping", "At a funeral"], why: "When the Prophet ﷺ congratulated a man on his marriage." },
        { q: "In this du'a, we ask Allah to bless the couple.", tf: true, why: "May Allah bless for you, and may He bless on you." }
      ]
    }
  ]
};

const HUSBANDS: DeepUnit = {
  key: "husbands",
  topicId: "marriage",
  branchId: "marriage-husbands",
  branch: { title: "For husbands", description: "What the Prophet ﷺ taught a husband: her rights, his time, play, gentle words and love." },
  name: "husbands",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "her-right",
      title: "Your wife has a right on you",
      line: "Your body, your eyes and your wife have a right on you.",
      facts: ["Abdullah ibn Amr fasted every day and prayed all night.", "The Prophet ﷺ told him: do not do that.", "Fast some days, sleep some of the night."],
      source: hadith("bukhari", "5199", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said to Abdullah ibn Amr: do not fast every day and pray all night. Fast and break your fast, pray and sleep, for your body has a right on you, your eyes have a right on you, and your wife has a right on you.", "your wife has a right over you"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ tell Abdullah ibn Amr?", a: "Your wife has a right on you", wrong: ["Pray all night forever", "Fast every single day", "Stay away from home"], why: "Your body, your eyes and your wife have a right over you." },
        { q: "What was Abdullah ibn Amr doing too much of?", a: "Fasting every day, praying all night", wrong: ["Sleeping all day", "Trading in the market", "Travelling far"], why: "Have I not been told that you fast all day and stand in prayer all night?" },
        { q: "Even worship should leave time for your wife.", tf: true, why: "Your wife has a right over you." }
      ]
    },
    {
      slug: "salman-and-abu-darda",
      title: "Salman visits Abu ad-Darda",
      line: "Salman saw his brother had no time for his wife.",
      facts: ["Umm ad-Darda looked uncared for.", "Abu ad-Darda fasted all day and prayed all night.", "The Prophet ﷺ said: Salman has spoken the truth."],
      source: hadith("bukhari", "1968", "Abu Juhaifa", "Sahih", "Salman visited Abu ad-Darda and found Umm ad-Darda neglected. He told Abu ad-Darda: your Lord has a right on you, your self has a right on you, and your family has a right on you, so give each its right. The Prophet ﷺ said: Salman has spoken the truth.", "Salman has spoken the truth"),
      difficulty: 2,
      questions: [
        { q: "Why was Umm ad-Darda looking uncared for?", a: "Her husband gave her no time", wrong: ["She was ill", "She was travelling", "She lost her home"], why: "Her husband was busy with worship and not with her." },
        { q: "What did the Prophet ﷺ say about Salman's advice?", a: "Salman spoke the truth", wrong: ["Salman was wrong", "Salman should be quiet", "Ask someone else"], why: "Salman has spoken the truth." },
        { q: "Salman said: give each one who has a right its right.", tf: true, why: "Your Lord, your self and your family each have a right on you." }
      ]
    },
    {
      slug: "the-race",
      title: "Racing with Aishah",
      line: "The Prophet ﷺ raced Aishah on a journey, and they laughed.",
      facts: ["The first time she won.", "Years later he won, and said: this is for that one.", "Play and fun belong in a happy marriage."],
      source: hadith("abudawud", "2578", "Aishah", "Sahih (Al-Albani)", "On a journey I raced him on foot and I beat him. Later, when I had put on weight, I raced him again and he beat me. He said: this is for that win.", "I had a race with him"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ and Aishah do on a journey?", a: "They had a race", wrong: ["They built a tent", "They wrote poems", "They sold camels"], why: "I had a race with him and I outstripped him." },
        { q: "Who won the first race?", a: "Aishah", wrong: ["The Prophet ﷺ", "No one", "A friend"], why: "I outstripped him on my feet." },
        { q: "Having fun together is part of a good marriage.", tf: true, why: "The Prophet ﷺ raced and joked with his wife." }
      ]
    },
    {
      slug: "glass-vessels",
      title: "Gently with the glass",
      line: "Go gently, Anjashah, with the glass vessels, he ﷺ said of women.",
      facts: ["Anjashah drove the camels the women rode.", "He sang so the camels went very fast.", "The Prophet ﷺ called women glass: handle with care."],
      source: hadith("bukhari", "6209", "Anas ibn Malik", "Sahih", "On a journey the camel driver sang to make the camels go fast. The Prophet ﷺ said: gently, Anjashah, with the glass vessels.", "Drive slowly with the glass vessels, O Anjasha"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ compare the women to?", a: "Glass vessels", wrong: ["Iron pots", "Stones", "Feathers"], why: "Drive slowly with the glass vessels, O Anjasha." },
        { q: "What did he ﷺ tell Anjashah to do?", a: "Go gently", wrong: ["Go faster", "Stop singing forever", "Leave the women"], why: "Take care, drive slowly with the glass vessels." },
        { q: "Calling women glass means treat them with care.", tf: true, why: "Glass is precious and needs gentle handling." }
      ]
    },
    {
      slug: "the-cup",
      title: "Where her lips had been",
      line: "He ﷺ drank from the very spot on the cup where Aishah drank.",
      facts: ["Aishah would drink and hand him the cup.", "He ﷺ put his mouth where hers had been.", "Small acts of love matter in marriage."],
      source: hadith("muslim", "300", "Aishah", "Sahih", "I would drink, then hand the cup to the Prophet ﷺ, and he would put his mouth where mine had been and drink.", "he would put his mouth where mine had been"),
      difficulty: 2,
      questions: [
        { q: "Where on the cup did the Prophet ﷺ drink?", a: "Where Aishah had drunk", wrong: ["The other side", "From a new cup", "He did not drink"], why: "He would put his mouth where mine had been, and drink." },
        { q: "What does this teach husbands?", a: "Show love in small ways", wrong: ["Never share cups", "Drink alone", "Eat in silence"], why: "Little signs of love keep a marriage warm." },
        { q: "Who told us about the cup?", a: "Aishah", wrong: ["Abu Bakr", "Bilal", "Anas"], why: "Aishah reported it herself." }
      ]
    },
    {
      slug: "abu-zar",
      title: "Like Abu Zar to Umm Zar",
      line: "Aishah told a story of eleven wives; he ﷺ listened to the end.",
      facts: ["Each wife described her husband.", "Umm Zar's husband, Abu Zar, was the kindest.", "He ﷺ said: I am to you as Abu Zar was to Umm Zar."],
      source: hadith("bukhari", "5189", "Aishah", "Sahih", "Eleven women sat and described their husbands, and Umm Zar praised Abu Zar for his kindness. Aishah told the whole story, and the Messenger of Allah ﷺ said to her: I am to you as Abu Zar was to Umm Zar.", "I am to you as Abu Zar was to his wife Um Zar"),
      difficulty: 3,
      questions: [
        { q: "How many women described their husbands in Aishah's story?", a: "Eleven", wrong: ["Two", "Five", "Forty"], why: "Eleven women sat and talked about their husbands." },
        { q: "What did the Prophet ﷺ say to Aishah after the story?", a: "I am to you as Abu Zar to Umm Zar", wrong: ["That story is too long", "Do not tell stories", "Abu Zar was unkind"], why: "I am to you as Abu Zar was to his wife Umm Zar." },
        { q: "Listening to your wife's stories is good manners.", tf: true, why: "He listened to her long story, then answered with love." }
      ]
    },
    {
      slug: "most-beloved",
      title: "He said her name",
      line: "Asked who he loved most, the Prophet ﷺ said: Aishah.",
      facts: ["Amr ibn al-As asked him in front of people.", "Then among men: her father, Abu Bakr.", "A husband can say his love openly."],
      source: hadith("bukhari", "3662", "Amr ibn al-As", "Sahih", "I asked: who is the most beloved person to you? He ﷺ said: Aishah. I said: and among men? He said: her father.", "Who is the most beloved person to you"),
      difficulty: 3,
      questions: [
        { q: "Who did the Prophet ﷺ name as most beloved to him?", a: "Aishah", wrong: ["Umar", "Bilal", "Amr ibn al-As"], why: "Who is the most beloved person to you? He said: Aishah." },
        { q: "Among men, whom did he ﷺ name?", a: "Her father, Abu Bakr", wrong: ["Ali", "Khalid", "Uthman"], why: "Among the men? He said: her father." },
        { q: "Who asked the Prophet ﷺ this question?", a: "Amr ibn al-As", wrong: ["Abu Jahl", "Anjashah", "Salman"], why: "Amr ibn al-As asked him." }
      ]
    }
  ]
};

const WIVES: DeepUnit = {
  key: "wives",
  topicId: "marriage",
  branchId: "marriage-wives",
  branch: { title: "For wives", description: "A wife's voice, her money, her charity and her rights, from the women around the Prophet ﷺ." },
  name: "wives",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "umm-salamah",
      title: "Umm Salamah's advice",
      line: "At Hudaybiyah the Prophet ﷺ took his wife Umm Salamah's advice.",
      facts: ["The people did not move when told to end their ihram.", "Umm Salamah said: go out, say nothing, and do it first.", "He ﷺ did; then everyone followed."],
      source: hadith("bukhari", "2731", "Al-Miswar and Marwan", "Sahih", "After the treaty of Hudaybiyah the companions did not get up when told to offer their sacrifices and shave. The Prophet ﷺ told Umm Salamah, and she said: go out and say nothing to anyone until you have offered your sacrifice and shaved your head. He did, and they all followed him.", "Do you want your order to be carried out"),
      difficulty: 1,
      questions: [
        { q: "Whose advice did the Prophet ﷺ take at Hudaybiyah?", a: "His wife Umm Salamah", wrong: ["Abu Jahl", "A Roman king", "No one"], why: "He went to Umm Salamah and told her what had happened." },
        { q: "What did Umm Salamah advise him to do?", a: "Go out and do it first", wrong: ["Shout at the people", "Go home to Makkah", "Wait a year"], why: "Go out and do not say a word till you have offered your sacrifice and shaved." },
        { q: "A wife's good advice can be taken by her husband.", tf: true, why: "The Prophet ﷺ himself followed Umm Salamah's advice." }
      ]
    },
    {
      slug: "her-own-money",
      title: "Her own money",
      line: "Men and women each keep what they have earned, says the Quran.",
      facts: ["A wife's earnings and mahr are her own.", "Do not envy what Allah gave others.", "Ask Allah from His bounty."],
      quote: quranQuote(4, 32),
      source: quran(4, 32, "Do not wish for what Allah gave some of you over others. Men have a share of what they earned, and women have a share of what they earned. Ask Allah of His bounty."),
      difficulty: 1,
      questions: [
        { q: "What does Quran 4:32 say about what women earn?", a: "Women have a share of what they earn", wrong: ["It goes to the husband", "It goes to the brothers", "Women cannot earn"], why: "Women have a share of what they have earned." },
        { q: "Whose is a wife's mahr?", a: "Hers alone", wrong: ["Her father's", "Her husband's", "Her brother's"], why: "The mahr is a gift that belongs to the wife." },
        { q: "The ayah says to ask Allah from His bounty.", tf: true, why: "Ask Allah of His bounty." }
      ]
    },
    {
      slug: "maymunah",
      title: "Maymunah frees a girl",
      line: "Maymunah freed her slave-girl by her own choice.",
      facts: ["She told the Prophet ﷺ after she had done it.", "He did not undo it.", "He said: giving her to your uncles had more reward."],
      source: hadith("bukhari", "2592", "Kurayb", "Sahih", "Maymunah bint al-Harith freed her slave-girl without asking the Prophet ﷺ. When she told him, he said: did you? She said yes. He said: you would have had more reward if you had given her to your maternal uncles.", "You would have got more reward if you had given her"),
      difficulty: 2,
      questions: [
        { q: "What did Maymunah do with her own property?", a: "Freed a slave-girl", wrong: ["Sold her house", "Bought a horse", "Built a well"], why: "She manumitted a slave-girl without asking first." },
        { q: "Did the Prophet ﷺ undo what Maymunah did?", a: "No", wrong: ["Yes, at once", "Yes, the next day", "He told her to buy her back"], why: "He only said giving her to her uncles had more reward." },
        { q: "A wife may give from her own money.", tf: true, why: "Maymunah freed the girl with her own wealth." }
      ]
    },
    {
      slug: "charity-from-home",
      title: "Charity from the home",
      line: "A wife who gives food from home, not wastefully, is rewarded.",
      facts: ["Her husband also gets reward for earning it.", "No one's reward is less because of another's.", "Aishah narrated it."],
      source: hadith("bukhari", "1425", "Aishah", "Sahih", "When a woman gives in charity from the food of her house without wasting it, she has the reward for what she gave, her husband has the reward for earning it, and the keeper has the same; none lessens the reward of another.", "she will receive the reward for what she has spent"),
      difficulty: 2,
      questions: [
        { q: "A wife gives some of the home's food to the poor. Who is rewarded?", a: "Both her and her husband", wrong: ["Only the husband", "Only the poor", "No one"], why: "She is rewarded for giving and her husband for earning it." },
        { q: "What must she avoid when giving from the home?", a: "Wasting it", wrong: ["Smiling", "Saying Bismillah", "Telling him later"], why: "Without spoiling it, she will receive the reward." },
        { q: "One person's reward makes another's smaller.", tf: false, why: "The reward of one will not decrease the reward of the others." }
      ]
    },
    {
      slug: "best-women",
      title: "The best women of Quraysh",
      line: "Best are women kind to their children and careful with the home.",
      facts: ["The Prophet ﷺ praised the women of Quraysh.", "Kindest to their children when small.", "Most careful with what their husbands own."],
      source: hadith("bukhari", "5082", "Abu Hurairah", "Sahih", "The best women who ride camels are the righteous women of Quraysh: the kindest to their children when small, and the most careful with what their husbands own.", "They are the kindest women to their children in their childhood"),
      difficulty: 2,
      questions: [
        { q: "Which two qualities did the Prophet ﷺ praise?", a: "Kind to children, careful with the home", wrong: ["Rich and famous", "Tall and strong", "Loud and quick"], why: "Kindest to their children and most careful of their husbands' property." },
        { q: "Whose women did he ﷺ praise in this hadith?", a: "The women of Quraysh", wrong: ["The women of Rome", "The women of Persia", "No one's"], why: "The righteous among the women of Quraysh." },
        { q: "Being gentle with children is praised in Islam.", tf: true, why: "They are the kindest women to their children." }
      ]
    },
    {
      slug: "khadijah-greeting",
      title: "Salam from Allah to Khadijah",
      line: "Jibril brought Khadijah salam from Allah and a palace in Jannah.",
      facts: ["She was bringing the Prophet ﷺ food.", "Her palace has no noise and no tiredness.", "She supported him from the very start."],
      source: hadith("bukhari", "3820", "Abu Hurairah", "Sahih", "Jibril came and said: Khadijah is coming with a dish of food. When she reaches you, give her salam from her Lord and from me, and give her good news of a palace in Paradise with no noise and no tiredness.", "greet her on behalf of her Lord"),
      difficulty: 3,
      questions: [
        { q: "Who sent salam to Khadijah?", a: "Allah, through Jibril", wrong: ["The king of Yemen", "Her father", "Abu Talib"], why: "Greet her on behalf of her Lord and on my behalf." },
        { q: "What was Khadijah bringing when Jibril came?", a: "A dish of food", wrong: ["A letter", "A sword", "A book"], why: "Khadija coming to you with a dish having meat soup." },
        { q: "What is her palace in Jannah free of?", a: "Noise and tiredness", wrong: ["Gardens and rivers", "Light", "Friends"], why: "Wherein there will be neither any noise nor any fatigue." }
      ]
    },
    {
      slug: "khul",
      title: "A wife may ask to part",
      line: "Thabit's wife asked to part, and gave back his garden.",
      facts: ["She did not blame his religion or character.", "She feared she could not be a good wife to him.", "This is called khul'."],
      source: hadith("bukhari", "5273", "Ibn Abbas", "Sahih", "The wife of Thabit ibn Qays came and said: I do not blame him in character or religion, but I fear falling short in Islam. He ﷺ said: will you give back his garden? She said yes, and he told Thabit to accept it and separate from her.", "Will you give back the garden which your husband has given you"),
      difficulty: 3,
      questions: [
        { q: "What did Thabit's wife give back to end the marriage?", a: "The garden he gave as mahr", wrong: ["Her house", "Her clothes", "Nothing"], why: "Will you give back the garden which your husband has given you?" },
        { q: "Did she blame his faith or character?", a: "No", wrong: ["Yes, both", "Only his faith", "Only his character"], why: "I do not blame Thabit for defects in his character or religion." },
        { q: "What is a wife's asking to part, by giving back, called?", a: "Khul'", wrong: ["Mahr", "Walimah", "Iddah"], why: "A wife ending the marriage this way is khul'." }
      ]
    }
  ]
};

const MISTAKES: DeepUnit = {
  key: "marriage-mistakes",
  topicId: "marriage",
  branchId: "marriage-mistakes",
  branch: { title: "Common mistakes", description: "What people often get wrong about marriage, and what the Quran and Sunnah say instead." },
  name: "marriage mistakes",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "too-holy-to-marry",
      title: "Mistake: marriage is less holy",
      line: "Three men thought giving up marriage was better. He ﷺ said no.",
      facts: ["One would pray all night; one fast always.", "One would never marry.", "He ﷺ said: I marry; whoever leaves my sunnah is not of me."],
      source: hadith("bukhari", "5063", "Anas ibn Malik", "Sahih", "Three men said: one will pray all night, one will fast every day, and one will never marry. The Prophet ﷺ said: I fear Allah most, yet I fast and break my fast, pray and sleep, and I marry women. Whoever turns away from my sunnah is not of me.", "I will keep away from the women and will not marry forever"),
      difficulty: 1,
      questions: [
        { q: "What did one of the three men want to give up?", a: "Marriage", wrong: ["Prayer", "Charity", "Fasting"], why: "I will keep away from the women and will not marry forever." },
        { q: "What did the Prophet ﷺ say about marriage?", a: "He married; it is his sunnah", wrong: ["It is for weak people", "It is only for kings", "Avoid it"], why: "I marry women; whoever turns away from my sunnah is not of me." },
        { q: "Never marrying makes you more pious.", tf: false, why: "The most pious of all, the Prophet ﷺ, married." }
      ]
    },
    {
      slug: "huge-mahr",
      title: "Mistake: a huge mahr",
      line: "Umar said: do not go too far with the mahr.",
      facts: ["If it were an honour, the Prophet ﷺ would have done it.", "He ﷺ gave no more than twelve uqiyah.", "A costly wedding makes marriage hard for the young."],
      source: hadith("abudawud", "2106", "Abul-Ajfa as-Sulami", "Hasan Sahih (Al-Albani)", "Umar said in a speech: do not go to extremes in women's mahr. If it were an honour in this world or piety before Allah, the Prophet ﷺ would have done it most, yet he did not give or take more than twelve uqiyah.", "Do not go to extremes in giving women their dower"),
      difficulty: 1,
      questions: [
        { q: "What did Umar warn against?", a: "A very big mahr", wrong: ["Any mahr at all", "Small weddings", "Marrying young"], why: "Do not go to extremes in giving women their dower." },
        { q: "How much did the Prophet ﷺ give in mahr, at most?", a: "Twelve uqiyah", wrong: ["A thousand camels", "A mountain of gold", "Nothing ever"], why: "Not more than twelve uqiyahs." },
        { q: "A bigger mahr means more piety.", tf: false, why: "If it did, the Prophet ﷺ would have given the most." }
      ]
    },
    {
      slug: "taking-back",
      title: "Mistake: taking the mahr back",
      line: "Even a heap of gold given as mahr is not taken back.",
      facts: ["The ayah speaks of a man changing his wife.", "Taking it back is a clear sin.", "The mahr is hers for good."],
      quote: quranQuote(4, 20),
      source: quran(4, 20, "If you want to replace one wife with another and you have given one of them a great amount, do not take any of it back. Would you take it unjustly and as a clear sin?"),
      difficulty: 2,
      questions: [
        { q: "A man gave a heap of gold as mahr, then parts. Can he take it back?", a: "No, not any of it", wrong: ["Yes, all of it", "Half of it", "If he asks nicely"], why: "Quran 4:20: do not take any of it back." },
        { q: "What does the ayah call taking it back?", a: "A clear sin", wrong: ["A good deal", "A small mistake", "A right"], why: "Would you take it unjustly and as a clear sin?" },
        { q: "The mahr belongs to the wife.", tf: true, why: "That is why it is not taken back." }
      ]
    },
    {
      slug: "looking-for-faults",
      title: "Mistake: hunting for faults",
      line: "After a long trip, do not come home suddenly by night.",
      facts: ["Let your family know you are coming.", "Do not try to catch your spouse out.", "Jabir ibn Abdullah narrated it."],
      source: hadith("bukhari", "5244", "Jabir ibn Abdullah", "Sahih", "When one of you has been away from home a long time, let him not come back to his family at night.", "he should not return to his family at night"),
      difficulty: 2,
      questions: [
        { q: "Back from a long trip, how should you come home?", a: "Not suddenly at night", wrong: ["At midnight by surprise", "Through the window", "Without telling anyone"], why: "He should not return to his family at night." },
        { q: "What spirit does this teach?", a: "Trust, not catching out", wrong: ["Spying on family", "Testing your spouse", "Surprise checks"], why: "Do not try to find faults in your family." },
        { q: "A husband should try to catch his wife out.", tf: false, why: "He was told to come home in a way that respects her." }
      ]
    },
    {
      slug: "describing-others",
      title: "Mistake: describing other women",
      line: "A wife should not describe another woman's looks to her husband.",
      facts: ["As if he could see her himself.", "It can bring jealousy and wrong thoughts.", "Abdullah ibn Mas'ud narrated it."],
      source: hadith("bukhari", "5240", "Abdullah ibn Mas'ud", "Sahih", "A woman should not describe another woman to her husband as if he were looking at her.", "as if he was actually looking at her"),
      difficulty: 2,
      questions: [
        { q: "What should a wife not do, in this hadith?", a: "Describe another woman's looks to him", wrong: ["Talk to her friends", "Cook for guests", "Visit her family"], why: "A woman should not describe another woman to her husband as if he were looking at her." },
        { q: "Why is describing others like this harmful?", a: "It brings jealousy and bad thoughts", wrong: ["It takes too long", "It is boring", "It is not harmful"], why: "It opens the door to looking where one should not." },
        { q: "Who narrated this hadith?", a: "Abdullah ibn Mas'ud", wrong: ["Hakim ibn Hizam", "Al-Mughirah", "Abu Lahab"], why: "Abdullah bin Mas'ud narrated it." }
      ]
    },
    {
      slug: "her-sister",
      title: "Mistake: pushing out another",
      line: "Do not ask a man to divorce his wife to marry you.",
      facts: ["She only gets what Allah wrote for her.", "Breaking another home is not the way.", "Abu Hurairah narrated it."],
      source: hadith("bukhari", "5152", "Abu Hurairah", "Sahih", "It is not allowed for a woman to ask for her sister's divorce to have everything for herself, for she will only have what was written for her.", "she will take only what has been written for her"),
      difficulty: 3,
      questions: [
        { q: "What may a woman not ask of the man she will marry?", a: "To divorce his wife", wrong: ["To give a mahr", "To be kind", "To pray"], why: "It is not lawful for a woman to ask for the divorce of her sister." },
        { q: "What will she get in the end, the hadith says?", a: "Only what Allah wrote for her", wrong: ["Everything she wants", "Double the share", "Nothing at all"], why: "She will take only what has been written for her." },
        { q: "Breaking up another's marriage to win is allowed.", tf: false, why: "It is not lawful for her to ask for it." }
      ]
    },
    {
      slug: "holding-to-harm",
      title: "Mistake: keeping her to hurt her",
      line: "Do not keep a wife only to harm her, says the Quran.",
      facts: ["Keep her kindly, or let her go kindly.", "Whoever does harm wrongs himself.", "Do not make fun of Allah's ayat."],
      source: quran(2, 231, "When you divorce women and they reach their term, keep them in kindness or release them in kindness. Do not keep them to harm them and wrong them; whoever does that has wronged himself. Do not take Allah's verses in jest."),
      difficulty: 3,
      questions: [
        { q: "What may a husband never do, says Quran 2:231?", a: "Keep her only to harm her", wrong: ["Be kind to her", "Let her go kindly", "Keep her kindly"], why: "Do not keep them to harm them." },
        { q: "Whom does a man who does this really wrong?", a: "Himself", wrong: ["No one", "Only her family", "The neighbours"], why: "Whoever does that has wronged himself." },
        { q: "The Quran says: keep kindly or part kindly.", tf: true, why: "Keep them in kindness or release them in kindness." }
      ]
    }
  ]
};

export const MARRIAGE_UNITS: readonly DeepUnit[] = [BEFORE, HUSBANDS, WIVES, MISTAKES];
