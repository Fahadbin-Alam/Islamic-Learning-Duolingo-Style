import { hadith, type DeepUnit } from "./deepKit";

// Two more units for the Hadith topic: the stories the Prophet ﷺ told about people before us, and the hadith
// qudsi, where he ﷺ tells what Allah said. Each card is one sahih hadith (Sahih al-Bukhari, or at-Tirmidhi where
// sunnah.com grades it sahih), with its exact English words to highlight. Only what is agreed on.

const STORIES: DeepUnit = {
  key: "hadith-stories",
  topicId: "hadith",
  branchId: "hadith-stories",
  branch: { title: "Stories the Prophet ﷺ told", description: "Three men in a cave, a loan sent across the sea, a thirsty dog, and a wise judge." },
  name: "the stories he ﷺ told",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-cave",
      title: "Three men in a cave",
      line: "A rock trapped three men in a cave, so they prayed.",
      facts: [
        "Each man asked Allah by one good deed done only for Him.",
        "One had served his old parents milk before anyone else.",
        "Another gave a worker his lost wage, grown into a herd."
      ],
      source: hadith("bukhari", "2272", "Abdullah ibn Umar", "Sahih", "Three men were shut in a cave by a rock. They said: nothing can save you but asking Allah by a good deed you did for His sake. Each one did, and the rock moved away.", "Nothing could save you from this rock but to invoke Allah by giving reference to the righteous deed"),
      difficulty: 1,
      questions: [
        { q: "What trapped the three men in the cave?", a: "A big rock rolled over its mouth", wrong: ["A flood filled it", "A wild animal blocked it", "Thieves locked them in"], why: "A big rock rolled down the mountain and closed the mouth of the cave." },
        { q: "How did they ask Allah to save them?", a: "By a good deed each did for Him", wrong: ["By shouting for help", "By digging with their hands", "By promising gold"], why: "Each asked Allah by a righteous deed done for His sake only." },
        { q: "One man had waited all night to give his parents their milk.", tf: true, why: "He held the bowl till dawn, so they could drink first." },
        { q: "What did another man give back to his worker?", a: "His wage, grown into a herd", wrong: ["Only half his wage", "Nothing at all", "A letter of thanks"], why: "He said: all the camels, cows and sheep you see are your wage." }
      ]
    },
    {
      slug: "the-wooden-box",
      title: "A loan sent across the sea",
      line: "With no ship, he trusted Allah and sent the money by sea.",
      facts: [
        "A man borrowed a thousand dinars, with Allah as his witness.",
        "When no ship came, he put the money in a piece of wood.",
        "He threw it in the sea, and it reached the lender."
      ],
      source: hadith("bukhari", "2291", "Abu Hurairah", "Sahih", "A man borrowed a thousand dinars, saying Allah is enough as a witness and a guarantor. When he found no ship to repay on time, he put the money and a letter in a piece of wood and threw it into the sea. The lender found it and opened it.", "Allah is sufficient as a witness"),
      difficulty: 2,
      questions: [
        { q: "Whom did the borrower name as his witness?", a: "Allah", wrong: ["The judge", "His brother", "No one"], why: "He said: Allah is sufficient as a witness." },
        { q: "How did he send the money when he had no ship?", a: "Inside a piece of wood in the sea", wrong: ["With a bird", "With a passing trader", "He did not send it"], why: "He put it in a hollow piece of wood and threw it into the sea." },
        { q: "The lender found the wood and the money inside it.", tf: true, why: "He took the wood home for firewood and found his money and the letter." }
      ]
    },
    {
      slug: "the-thirsty-dog",
      title: "Water for a thirsty dog",
      line: "A man gave water to a thirsty dog, and Allah forgave him.",
      facts: [
        "He was thirsty too, and drank from a well.",
        "He saw a dog licking mud from thirst.",
        "He filled his shoe with water for it, and Allah thanked him."
      ],
      source: hadith("bukhari", "2466", "Abu Hurairah", "Sahih", "A thirsty man drank from a well, then saw a dog panting and licking mud from thirst. He went down again, filled his shoe with water and gave it to the dog. Allah thanked him and forgave him. He ﷺ said: there is a reward for serving any living being.", "Allah thanked him for that deed and forgave him"),
      difficulty: 3,
      questions: [
        { q: "How did the man carry water for the dog?", a: "In his shoe", wrong: ["In a bucket", "In his hands", "In a cup"], why: "He filled his shoe with water and watered it." },
        { q: "What did Allah do for him?", a: "Allah thanked him and forgave him", wrong: ["Nothing at all", "Allah gave him a palace on earth", "Allah made him a king"], why: "Allah thanked him for that deed and forgave him." },
        { q: "There is a reward for being kind to any living being.", tf: true, why: "Yes, there is a reward for serving any living being." }
      ]
    },
    {
      slug: "the-two-mothers",
      title: "Sulayman and the two mothers",
      line: "Two mothers claimed one baby, and Sulayman found the true one.",
      facts: [
        "A wolf had taken one woman's child.",
        "Sulayman said: bring a knife, I will split the baby.",
        "The real mother cried: do not, give it to her! So he knew."
      ],
      source: hadith("bukhari", "3427", "Abu Hurairah", "Sahih", "Two women each had a child, and a wolf took one. They argued over the other. Sulayman said: bring me a knife to cut him in two. The younger said: do not, may Allah have mercy on you, he is her son. So he gave the child to her.", "So he gave the child to the younger lady"),
      difficulty: 5,
      questions: [
        { q: "Which prophet judged between the two mothers?", a: "Sulayman", wrong: ["Musa", "Yusuf", "Nuh"], why: "Both took their case to Sulayman ibn Dawud." },
        { q: "How did Sulayman know the real mother?", a: "She begged him not to harm the baby", wrong: ["She was older", "She cried the loudest", "She brought witnesses"], why: "She said: do not do it, he is her son. Her mercy showed she was his mother." },
        { q: "Sulayman really meant to cut the baby.", tf: false, why: "It was a wise test to find the true mother." }
      ]
    },
    {
      slug: "the-forgiving-trader",
      title: "The forgiving trader",
      line: "A trader forgave poor debtors, so Allah forgave him.",
      facts: [
        "He used to lend money to people.",
        "When someone could not pay, he told his workers: let him off.",
        "He hoped that Allah would let him off too."
      ],
      source: hadith("bukhari", "2078", "Abu Hurairah", "Sahih", "There was a merchant who lent to people. Whenever a debtor was in hardship, he told his employees: forgive him, so that Allah may forgive us. So Allah forgave him.", "Forgive him so that Allah may forgive us"),
      difficulty: 3,
      questions: [
        { q: "What did the trader do when a debtor could not pay?", a: "He forgave him", wrong: ["He took his house", "He sent him to prison", "He doubled the debt"], why: "He said: forgive him, so that Allah may forgive us." },
        { q: "What did Allah do for the trader?", a: "Allah forgave him", wrong: ["Allah made him poor", "Nothing changed", "Allah gave him a palace on earth"], why: "So Allah forgave him." },
        { q: "Being easy on people in debt is loved by Allah.", tf: true, why: "The trader was forgiven because he forgave others." }
      ]
    },
    {
      slug: "the-cat",
      title: "The woman and the cat",
      line: "A woman locked up a cat with no food until it died.",
      facts: [
        "She neither fed it nor let it go to find food.",
        "She was punished in the Fire because of it.",
        "Being cruel to animals is a sin in Islam."
      ],
      source: hadith("bukhari", "3482", "Abdullah ibn Umar", "Sahih", "A woman was punished because of a cat she locked up until it died. She neither gave it food or water, nor set it free to eat from the creatures of the earth.", "she neither gave it food nor water as she had imprisoned it"),
      difficulty: 4,
      questions: [
        { q: "Why was the woman punished?", a: "She locked up a cat until it died", wrong: ["She fed stray cats", "She kept a cat at home", "She sold a cat"], why: "She imprisoned it till it died, giving it no food or water." },
        { q: "What should she have done, at least?", a: "Let it go to find its own food", wrong: ["Kept it locked up", "Given it away to a king", "Nothing, it was fine"], why: "She did not set it free to eat from the creatures of the earth." },
        { q: "Cruelty to an animal can lead a person to the Fire.", tf: true, why: "She entered the Fire because of the cat." }
      ]
    }
  ]
};

const QUDSI: DeepUnit = {
  key: "hadith-qudsi",
  topicId: "hadith",
  branchId: "hadith-qudsi",
  branch: { title: "Allah says: hadith qudsi", description: "Words the Prophet ﷺ told from his Lord: His mercy, His nearness, and His reward." },
  name: "the hadith qudsi",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "what-is-qudsi",
      title: "What a hadith qudsi is",
      line: "In a hadith qudsi, he ﷺ tells us what Allah said.",
      facts: [
        "Qudsi means holy: the meaning is from Allah.",
        "It is not part of the Quran.",
        "One says: fasting is for Me, and I reward it."
      ],
      source: hadith("bukhari", "1904", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah said, All the deeds of the son of Adam are for him, except fasting, which is for Me, and I will reward it.", "except fasting which is for Me, and I will give the reward for it"),
      difficulty: 1,
      questions: [
        { q: "Whose words does a hadith qudsi tell?", a: "Allah's, told by the Prophet ﷺ", wrong: ["An angel's own words", "A Companion's words", "A scholar's words"], why: "In a hadith qudsi he ﷺ tells what Allah said." },
        { q: "Which deed did Allah say is for Him?", a: "Fasting", wrong: ["Sleeping", "Trading", "Travelling"], why: "All deeds are for him, except fasting, which is for Me." },
        { q: "A hadith qudsi is part of the Quran.", tf: false, why: "It is a hadith; its meaning is from Allah but it is not Quran." }
      ]
    },
    {
      slug: "as-he-thinks",
      title: "As My servant thinks",
      line: "Allah says: I am as My servant thinks I am.",
      facts: [
        "Think good of Allah: that He forgives and helps.",
        "Remember Him with people, and He remembers you with better.",
        "Come to Him walking, and He comes to you running."
      ],
      source: hadith("bukhari", "7405", "Abu Hurairah", "Sahih", "Allah says: I am as My servant thinks I am, and I am with him when he remembers Me. If he remembers Me in himself, I remember him in Myself; if he remembers Me in a gathering, I remember him in a better gathering.", "remembers Me in a group of people, I remember him in a group that is better than they"),
      difficulty: 1,
      questions: [
        { q: "How should we think of Allah?", a: "With good hope", wrong: ["As far away", "As not caring", "As harsh only"], why: "I am as My servant thinks I am, so think good of Him." },
        { q: "What happens when you remember Allah in a gathering?", a: "He remembers you in a better gathering", wrong: ["Nothing happens", "Only the people hear", "You lose a reward"], why: "I remember him in a group that is better than they." },
        { q: "Allah is with His servant when he remembers Him.", tf: true, why: "I am with him when he remembers Me." },
        { q: "If you come walking to Allah, how does He come?", a: "Running", wrong: ["Walking slowly", "Not at all", "After a long time"], why: "If he comes to Me walking, I go to him running." }
      ]
    },
    {
      slug: "good-intentions",
      title: "Written down",
      line: "Plan a good deed, and it is written for you, even undone.",
      facts: [
        "Do the good deed, and it is ten to seven hundred times.",
        "Plan a bad deed but leave it, and it is written as good.",
        "Do the bad deed, and only one bad deed is written."
      ],
      source: hadith("bukhari", "6491", "Ibn Abbas", "Sahih", "Allah ordered good and bad deeds written. Whoever intends a good deed and does not do it, Allah writes it as a full good deed. If he does it, it is written as ten to seven hundred times or more. A bad deed intended and left is written as a good deed; done, it is written as one.", "Allah will write for him a full good deed"),
      difficulty: 2,
      questions: [
        { q: "What is written if you plan a good deed but cannot do it?", a: "A full good deed", wrong: ["Nothing", "A bad deed", "Half a good deed"], why: "Allah writes for him a full good deed." },
        { q: "How many times can a good deed done be multiplied?", a: "Ten to seven hundred times, or more", wrong: ["Only once", "Twice", "Three times"], why: "From ten to seven hundred times to many more." },
        { q: "A bad deed done is written as ten bad deeds.", tf: false, why: "It is written as only one bad deed." }
      ]
    },
    {
      slug: "mercy-before-anger",
      title: "My mercy comes first",
      line: "Allah wrote: My mercy overpowers My anger.",
      facts: [
        "Allah wrote this when He finished creating.",
        "It is in a Book with Him, above His Throne.",
        "So never give up hope in Allah's mercy."
      ],
      source: hadith("bukhari", "3194", "Abu Hurairah", "Sahih", "When Allah completed the creation, He wrote in His Book, which is with Him on His Throne: My mercy overpowers My anger.", "My Mercy overpowers My Anger"),
      difficulty: 3,
      questions: [
        { q: "What did Allah write about His mercy?", a: "It overpowers His anger", wrong: ["It is less than His anger", "It is only for angels", "It ends one day"], why: "My Mercy overpowers My Anger." },
        { q: "When did Allah write it?", a: "When He completed the creation", wrong: ["On the Day of Judgment", "In Ramadan", "When Adam came down"], why: "When Allah completed the creation, He wrote in His Book." },
        { q: "Allah's mercy should make us hopeful.", tf: true, why: "His mercy comes before His anger." }
      ]
    },
    {
      slug: "hundred-parts",
      title: "A hundred parts of mercy",
      line: "Allah made mercy in a hundred parts and sent one to earth.",
      facts: [
        "He kept ninety-nine parts with Him.",
        "From the one part, all creatures are kind to each other.",
        "Even a horse lifts its hoof so it will not step on its foal."
      ],
      source: hadith("bukhari", "6000", "Abu Hurairah", "Sahih", "Allah divided mercy into one hundred parts. He kept ninety-nine with Him and sent one part to earth. Because of that one part, creatures are merciful to each other, so that even a mare lifts her hoof away from her foal.", "so that even the mare lifts up its hoofs away from its baby animal"),
      difficulty: 3,
      questions: [
        { q: "How many parts of mercy did Allah keep with Him?", a: "Ninety-nine", wrong: ["One", "Fifty", "Ten"], why: "He kept ninety-nine parts with Him." },
        { q: "What does the mare do because of the one part of mercy?", a: "Lifts her hoof off her foal", wrong: ["Runs away from it", "Kicks it", "Leaves it alone"], why: "Even the mare lifts up its hoofs away from its baby." },
        { q: "All the mercy among creatures comes from just one part.", tf: true, why: "He sent down one part, and from it creatures are merciful to each other." }
      ]
    },
    {
      slug: "the-mother",
      title: "More merciful than a mother",
      line: "Allah is more merciful to us than a mother to her child.",
      facts: [
        "A mother who had lost her baby found him and held him close.",
        "He ﷺ asked: would she throw her child into a fire?",
        "They said: never. He ﷺ said: Allah is more merciful."
      ],
      source: hadith("bukhari", "5999", "Umar ibn al-Khattab", "Sahih", "A woman found her lost child and nursed him. The Prophet ﷺ asked: Do you think she would throw her son into the fire? They said no. He said: Allah is more merciful to His servants than this woman to her son.", "Allah is more merciful to His slaves than this lady to her son"),
      difficulty: 4,
      questions: [
        { q: "Who did he ﷺ compare with Allah's mercy?", a: "A mother with her child", wrong: ["A king with his army", "A teacher with a student", "A trader with his money"], why: "Allah is more merciful to His slaves than this lady to her son." },
        { q: "Would the mother throw her child into a fire?", a: "No, never", wrong: ["Yes, if angry", "Only at night", "If told to"], why: "They replied: no." },
        { q: "Allah's mercy is even greater than a mother's.", tf: true, why: "He ﷺ said so, pointing to the mother." }
      ]
    }
  ]
};

const FORGIVES: DeepUnit = {
  key: "hadith-forgives",
  topicId: "hadith",
  branchId: "hadith-forgives",
  branch: { title: "Allah forgives", description: "A man who turned back, a sinner who feared his Lord, the last third of the night, and sins up to the clouds." },
  name: "Allah's forgiveness",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-killer-who-repented",
      title: "The man who killed a hundred",
      line: "A man who killed many set out to repent, and was forgiven.",
      facts: [
        "He asked a monk if he could repent, and was told no.",
        "A scholar told him: yes, go to a land of good people.",
        "He died on the way, a span closer to the good land."
      ],
      source: hadith("bukhari", "3470", "Abu Said Al-Khudri", "Sahih", "A man who had killed ninety-nine people set out asking if his repentance could be accepted. Death came to him on the way, and he was found one span closer to the village he was going to, so he was forgiven.", "So he was found to be one span closer to the village"),
      difficulty: 2,
      questions: [
        { q: "Where did he die?", a: "On the way to the good village", wrong: ["In his old village", "In the monk's house", "At sea"], why: "Death overtook him on the way." },
        { q: "How much closer was he to the good village?", a: "One span", wrong: ["One mile", "Ten steps", "One day's walk"], why: "He was found to be one span closer to the village he was going to." },
        { q: "The door of repentance is open while you are alive.", tf: true, why: "Even this man was forgiven when he turned back to Allah." }
      ]
    },
    {
      slug: "fear-of-allah",
      title: "Afraid of his Lord",
      line: "A sinner feared Allah so much that Allah forgave him.",
      facts: [
        "He told his sons to burn him and scatter the ashes after he died.",
        "Allah gathered him back and asked him why.",
        "He said: out of fear of You, my Lord. So Allah forgave him."
      ],
      source: hadith("bukhari", "3481", "Abu Hurairah", "Sahih", "A man who had sinned told his sons to burn him after death and scatter him. Allah brought him back and asked why he did it. He said: O my Lord, I was afraid of You. So Allah forgave him.", "I was afraid of You"),
      difficulty: 4,
      questions: [
        { q: "Why did the man ask his sons to burn him?", a: "He was afraid of Allah", wrong: ["He wanted to be famous", "He was angry with them", "It was a custom"], why: "He said: O my Lord, I was afraid of You." },
        { q: "What did Allah do with him?", a: "Allah forgave him", wrong: ["Allah left him as ashes", "Allah punished him at once", "Allah sent him back to earth"], why: "So Allah forgave him." },
        { q: "True fear of Allah is something Allah loves.", tf: true, why: "His fear of Allah was the reason he was forgiven." }
      ]
    },
    {
      slug: "last-third",
      title: "The last third of the night",
      line: "In the night's last third, Allah calls: who will ask Me?",
      facts: [
        "Every night, when a third of it is left.",
        "Allah asks: who will call on Me, that I answer him?",
        "Who will ask My forgiveness, that I forgive him?"
      ],
      source: hadith("bukhari", "1145", "Abu Hurayrah", "Sahih", "Every night, when the last third of the night remains, our Lord comes down to the nearest heaven and says: Who will call on Me, that I may answer him? Who will ask of Me, that I may give him? Who will seek My forgiveness, that I may forgive him?", "Is there anyone seeking My forgiveness, so that I may forgive him"),
      difficulty: 4,
      questions: [
        { q: "When is this special time each night?", a: "The last third of the night", wrong: ["Right after Maghrib", "At noon", "Only in Ramadan"], why: "When the last third of the night remains." },
        { q: "What does Allah offer the one who seeks forgiveness then?", a: "That He will forgive him", wrong: ["Nothing", "Only gold", "A long life"], why: "Who will seek My forgiveness, that I may forgive him?" },
        { q: "This happens every night, not just once a year.", tf: true, why: "Every night, when the last third remains." }
      ]
    },
    {
      slug: "sins-to-the-clouds",
      title: "Sins up to the clouds",
      line: "Even if your sins reached the clouds, ask, and Allah forgives.",
      facts: [
        "Allah says: O son of Adam, call on Me and hope in Me.",
        "If your sins reached the clouds and you asked, I would forgive.",
        "Come to Me with no shirk, and find forgiveness as big."
      ],
      source: hadith("tirmidhi", "3540", "Anas ibn Malik", "Sahih", "Allah said: O son of Adam, as long as you call on Me and hope in Me, I forgive you. If your sins reached the clouds of the sky and you asked My forgiveness, I would forgive you. If you came to Me with sins nearly as great as the earth, without associating anything with Me, I would come to you with forgiveness nearly as great.", "Were your sins to reach the clouds of the sky, then you sought forgiveness from Me, I would forgive you"),
      difficulty: 5,
      questions: [
        { q: "What if your sins reached the clouds and you asked forgiveness?", a: "Allah would forgive you", wrong: ["It would be too late", "Only half would go", "Nothing would change"], why: "Were your sins to reach the clouds, then you sought forgiveness, I would forgive you." },
        { q: "What must you not bring with you to Allah?", a: "Shirk, worshipping others with Him", wrong: ["Your good deeds", "Your du'as", "Your hope"], why: "Met Me not associating anything with Me." },
        { q: "Calling on Allah with hope is the start of forgiveness.", tf: true, why: "As long as you call on Me and hope in Me, I forgive you." }
      ]
    }
  ]
};

export const HADITH_STORY_UNITS: readonly DeepUnit[] = [STORIES, QUDSI, FORGIVES];
