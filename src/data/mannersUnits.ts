import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Manners taught in depth: mercy, the rights people have in public, honesty, humility, patience and thanks,
// brotherhood, cleanliness and modesty. Each card is one sahih or hasan hadith (number and grade as sunnah.com
// gives them) or an ayah, told with the story around it, so the questions can be answered from what the card says.

const MERCY: DeepUnit = {
  key: "mercy",
  topicId: "manners",
  branchId: "manners-rahmah",
  name: "mercy",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "kissing-children",
      title: "Kissing the children",
      line: "The Prophet ﷺ kissed his grandson al-Hasan in front of people.",
      facts: ["A man said: I have ten children and never kissed one.", "The Prophet ﷺ looked at him and answered him.", "Whoever shows no mercy is shown no mercy."],
      source: hadith("bukhari", "5997", "Abu Hurayrah", "Sahih", "The Prophet ﷺ kissed al-Hasan ibn Ali while al-Aqra ibn Habis sat with him. Al-Aqra said: I have ten children and have never kissed one of them. He ﷺ said: whoever is not merciful will not be shown mercy.", "Whoever is not merciful to others will not be treated mercifully"),
      difficulty: 1,
      questions: [
        { q: "Whom did the Prophet ﷺ kiss in front of al-Aqra?", a: "His grandson al-Hasan", wrong: ["A guest from Yemen", "A young camel", "A new Muslim"], why: "He ﷺ kissed al-Hasan, the son of Ali and Fatimah." },
        { q: "How many children did al-Aqra say he had?", a: "Ten", wrong: ["Two", "Five", "Twenty"], why: "He had ten children and had never kissed one of them." },
        { q: "Showing love to children is part of mercy.", tf: true, why: "Whoever is not merciful to others will not be shown mercy." }
      ]
    },
    {
      slug: "shortened-prayer",
      title: "A baby cries in prayer",
      line: "The Prophet ﷺ shortened his prayer when he heard a baby cry.",
      facts: ["He ﷺ stood to pray, meaning to make it long.", "Then a child cried behind the rows.", "He ﷺ did not want to trouble the mother."],
      source: hadith("bukhari", "707", "Abu Qatadah", "Sahih", "The Prophet ﷺ said: I stand for prayer meaning to make it long, then I hear a child crying, so I make it short, as I dislike making things hard for his mother.", "on hearing the cries of a child, I cut it short"),
      difficulty: 1,
      questions: [
        { q: "What made the Prophet ﷺ shorten his prayer?", a: "A baby crying", wrong: ["A storm outside", "A late guest", "Being hungry"], why: "On hearing the cries of a child, I cut it short." },
        { q: "Whom did he ﷺ not want to trouble?", a: "The child's mother", wrong: ["The imam of Quba", "The traders", "The guards"], why: "He disliked to trouble the child's mother." },
        { q: "The Prophet ﷺ thought of others even while leading prayer.", tf: true, why: "He made his prayer shorter for a mother and her child." }
      ]
    },
    {
      slug: "the-thirsty-dog",
      title: "Water for a thirsty dog",
      line: "A man gave a thirsty dog water, and Allah forgave him.",
      facts: ["He climbed down a well and drank.", "He filled his shoe and carried it in his teeth.", "There is reward in kindness to any living thing."],
      source: hadith("bukhari", "2363", "Abu Hurairah", "Sahih", "A thirsty man went down a well and drank. He came out and saw a dog licking mud from thirst, so he went down again, filled his shoe with water and gave the dog a drink. Allah thanked him and forgave him. There is a reward for serving any living being.", "there is a reward for serving any animate"),
      difficulty: 1,
      questions: [
        { q: "How did the man carry water up to the dog?", a: "In his shoe", wrong: ["In a bucket", "In his hat", "In a clay jar"], why: "He filled his shoe with water and held it with his teeth." },
        { q: "What did Allah do for the man?", a: "Forgave him", wrong: ["Gave him a horse", "Made him a king", "Nothing"], why: "Allah thanked him for his deed and forgave him." },
        { q: "There is reward only for kindness to people, not animals.", tf: false, why: "He ﷺ said there is a reward for serving any living being." }
      ]
    },
    {
      slug: "the-cat",
      title: "The cat that was locked up",
      line: "A woman was punished for a cat she locked up and starved.",
      facts: ["She tied the cat up.", "She gave it no food.", "She did not let it go to find food itself."],
      source: hadith("bukhari", "3318", "Ibn Umar", "Sahih", "A woman entered the Fire because of a cat she tied up, neither feeding it nor setting it free to eat from the insects of the earth.", "neither giving it food nor setting it free"),
      difficulty: 2,
      questions: [
        { q: "Why was the woman punished?", a: "She starved a cat", wrong: ["She lost a cat", "She sold a cat", "She fed stray cats"], why: "She tied it, neither giving it food nor setting it free." },
        { q: "What should she have done, at the least?", a: "Fed it or let it go", wrong: ["Sold it", "Given it away to a king", "Painted it"], why: "She neither fed it nor set it free to eat from the earth." },
        { q: "Being cruel to an animal is a sin in Islam.", tf: true, why: "Allah punished her because of what she did to a cat." }
      ]
    },
    {
      slug: "the-orphan",
      title: "Caring for an orphan",
      line: "Caring for an orphan brings you near the Prophet ﷺ in Jannah.",
      facts: ["An orphan is a child whose father has died.", "He ﷺ held up two fingers close together.", "The two fingers were his index and middle fingers."],
      source: hadith("bukhari", "5304", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ said: I and the one who looks after an orphan will be like this in Paradise, and he showed his index and middle fingers.", "I and the one who looks after an orphan will be like this in Paradise"),
      difficulty: 2,
      questions: [
        { q: "Who will be close to the Prophet ﷺ in Jannah, like two fingers?", a: "One who cares for an orphan", wrong: ["One who travels far", "One who owns a lot", "One who speaks loudly"], why: "I and the one who looks after an orphan will be like this in Paradise." },
        { q: "How did he ﷺ show how close they will be?", a: "With two fingers together", wrong: ["With his whole hand", "With a stick", "By drawing a line"], why: "He showed his middle and index fingers." },
        { q: "Which two fingers did he ﷺ show?", a: "Index and middle", wrong: ["Thumb and little finger", "Two thumbs", "Ring and little finger"], why: "Showing his middle and index fingers." }
      ]
    },
    {
      slug: "plant-a-tree",
      title: "Plant something",
      line: "Plant a tree: what people or animals eat from it is charity.",
      facts: ["Any Muslim who plants a plant gets this reward.", "A bird, an animal or a person may eat from it.", "The reward is as if he gave charity."],
      source: hadith("bukhari", "6012", "Anas ibn Malik", "Sahih", "If any Muslim plants a plant and a person or an animal eats from it, he is rewarded as if he had given that much in charity.", "he will be rewarded as if he had given that much in charity"),
      difficulty: 2,
      questions: [
        { q: "An animal eats from a tree you planted. What do you get?", a: "Reward like charity", wrong: ["Nothing at all", "A fine", "Only a thank-you"], why: "He will be rewarded as if he had given that much in charity." },
        { q: "Who can eat from the plant and still bring you reward?", a: "A person or an animal", wrong: ["Only your family", "Only the poor", "No one"], why: "If a human being or an animal eats of it, he is rewarded." },
        { q: "Planting can be a good deed in Islam.", tf: true, why: "What is eaten from it counts as charity." }
      ]
    },
    {
      slug: "mercy-to-all",
      title: "Mercy to everyone",
      line: "Whoever is not merciful to people, Allah is not merciful to him.",
      facts: ["Jarir ibn Abdullah heard the Prophet ﷺ say it.", "Mercy is for family, strangers and the weak.", "Showing mercy is a way to receive Allah's mercy."],
      source: hadith("bukhari", "6013", "Jarir bin Abdullah", "Sahih", "The Prophet ﷺ said: whoever is not merciful to others will not be treated mercifully.", "He who is not merciful to others, will not be treated mercifully"),
      difficulty: 3,
      questions: [
        { q: "Who heard the Prophet ﷺ say: whoever is not merciful is not shown mercy?", a: "Jarir ibn Abdullah", wrong: ["Abu Jahl", "Al-Aqra ibn Habis", "Abu Lahab"], why: "Jarir ibn Abdullah narrated it." },
        { q: "How can you hope for Allah's mercy, from this lesson?", a: "Be merciful to others", wrong: ["Stay away from people", "Be harsh to be respected", "Only pray at night"], why: "He who is not merciful to others will not be treated mercifully." },
        { q: "Mercy in Islam is only for your own family.", tf: false, why: "Mercy is for all: family, strangers, the weak and animals." }
      ]
    }
  ]
};

const PUBLIC_ADAB: DeepUnit = {
  key: "adab",
  topicId: "manners",
  branchId: "manners-public-conduct",
  name: "manners with people",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "six-rights",
      title: "Six rights of a Muslim",
      line: "Every Muslim has six rights over another Muslim.",
      facts: ["Greet him with salam, and accept his invitation.", "Give him sincere advice when he asks.", "Answer his sneeze, visit him ill, follow his funeral."],
      source: hadith("muslim", "2162b", "Abu Hurairah", "Sahih", "Six are the rights of a Muslim over another Muslim: when you meet him, greet him; when he invites you, accept; when he asks your advice, advise him; when he sneezes and praises Allah, say yarhamukallah; when he is ill, visit him; and when he dies, follow his funeral.", "Six are the rights of a Muslim over another Muslim"),
      difficulty: 1,
      questions: [
        { q: "How many rights did the Prophet ﷺ name, of one Muslim over another?", a: "Six", wrong: ["Two", "Ten", "Forty"], why: "Six are the rights of a Muslim over another Muslim." },
        { q: "Your friend is ill. Which right does he have?", a: "That you visit him", wrong: ["That you text him once", "That you avoid him", "That you pay for him"], why: "When he falls ill, visit him." },
        { q: "Which of these is NOT one of the six rights?", a: "Lending him money", wrong: ["Greeting him with salam", "Accepting his invitation", "Following his funeral"], why: "The six are salam, invitation, advice, the sneeze, visiting the sick and the funeral." }
      ]
    },
    {
      slug: "who-greets-first",
      title: "Who greets first?",
      line: "The young greet the old; the walker greets the one sitting.",
      facts: ["The small group greets the large group.", "Abu Hurairah narrated these rules.", "Anyone may greet first; these are the best ways."],
      source: hadith("bukhari", "6231", "Abu Hurairah", "Sahih", "The young should greet the old, the one passing by should greet the one sitting, and the small group should greet the large group.", "The young should greet the old"),
      difficulty: 1,
      questions: [
        { q: "You walk past an old man sitting. Who greets first?", a: "You do", wrong: ["He does", "No one", "Whoever is taller"], why: "The young greet the old, and the passer-by greets the one sitting." },
        { q: "A group of three meets a group of ten. Who greets first?", a: "The group of three", wrong: ["The group of ten", "Neither", "The oldest of the ten"], why: "The small group should greet the large group." },
        { q: "The one sitting greets the one walking by.", tf: false, why: "The passer-by should greet the one sitting." }
      ]
    },
    {
      slug: "the-sneeze",
      title: "When someone sneezes",
      line: "Sneeze and say Alhamdulillah; others answer: Yarhamukallah.",
      facts: ["Alhamdulillah: all praise is for Allah.", "Yarhamukallah: may Allah have mercy on you.", "Reply: Yahdikumullah wa yuslihu balakum."],
      source: hadith("bukhari", "6224", "Abu Hurairah", "Sahih", "If one of you sneezes, let him say Alhamdulillah, and let his brother say to him Yarhamukallah. When he says that, let the sneezer say: Yahdikumullah wa yuslihu balakum, may Allah guide you and set your affairs right.", "If anyone of you sneezes, he should say"),
      difficulty: 1,
      questions: [
        { q: "What does the one who sneezes say?", a: "Alhamdulillah", wrong: ["Bismillah", "Allahu akbar", "Astaghfirullah"], why: "He should say Al-Hamdulillah, praise be to Allah." },
        { q: "What do you say to someone who sneezed and praised Allah?", a: "Yarhamukallah", wrong: ["Mashallah", "Bismillah", "Salam"], why: "Yarhamukallah means: may Allah have mercy on you." },
        { q: "What does the sneezer say back?", a: "Yahdikumullah wa yuslihu balakum", wrong: ["Jazakallah khayran", "Inshallah", "Subhanallah"], why: "May Allah guide you and set your affairs right." }
      ]
    },
    {
      slug: "the-yawn",
      title: "When you yawn",
      line: "When you yawn, hold it back as much as you can.",
      facts: ["Allah likes sneezing and dislikes yawning.", "A yawn comes from Shaytan.", "Do not let out a loud Haa sound."],
      source: hadith("bukhari", "6223", "Abu Hurairah", "Sahih", "Allah likes sneezing and dislikes yawning. Yawning is from Shaytan, so let one of you hold it back as much as he can, and not say Haa, for Shaytan laughs at him.", "Allah likes sneezing and dislikes yawning"),
      difficulty: 2,
      questions: [
        { q: "Which does Allah like: sneezing or yawning?", a: "Sneezing", wrong: ["Yawning", "Both the same", "Neither"], why: "Allah likes sneezing and dislikes yawning." },
        { q: "What should you do when a yawn comes?", a: "Hold it back as you can", wrong: ["Yawn as loud as you can", "Clap", "Say Bismillah loudly"], why: "One must try one's best to stop it." },
        { q: "Yawning loudly with a Haa is good manners.", tf: false, why: "If one says Haa when yawning, Shaytan laughs at him." }
      ]
    },
    {
      slug: "three-people",
      title: "No secrets in a group of three",
      line: "When three sit together, two should not whisper apart.",
      facts: ["Whispering leaves the third person out.", "It can make him sad or worried.", "Abdullah ibn Mas'ud narrated it."],
      source: hadith("bukhari", "6288", "Abdullah ibn Mas'ud", "Sahih", "When three people are together, two of them should not talk secretly, leaving out the third.", "no two of them should hold secret counsel excluding the third person"),
      difficulty: 2,
      questions: [
        { q: "Three friends sit together. What should two of them not do?", a: "Whisper and leave one out", wrong: ["Laugh together", "Share food", "Say salam"], why: "No two of them should hold secret counsel excluding the third." },
        { q: "Why is it wrong to whisper and leave one person out?", a: "It can make him sad", wrong: ["Whispering is too quiet", "It wastes time", "It is not wrong"], why: "It leaves the third out and can hurt his feelings." },
        { q: "Two of three may whisper, leaving the third out.", tf: false, why: "No two of them should whisper apart from the third." }
      ]
    },
    {
      slug: "your-seat",
      title: "Do not take his seat",
      line: "Do not make someone stand up so you can take his seat.",
      facts: ["Ibn Umar narrated it.", "Instead, the people should make room.", "Quran 58:11 also says: make room in gatherings."],
      source: hadith("bukhari", "6269", "Ibn Umar", "Sahih", "A man should not make another man get up from his seat in a gathering in order to sit there himself.", "A man should not make another man get up from his"),
      difficulty: 2,
      questions: [
        { q: "You come late to a full gathering. What should you not do?", a: "Make someone get up", wrong: ["Say salam", "Sit where there is room", "Ask people to make room"], why: "A man should not make another man get up from his seat." },
        { q: "What should people in a gathering do for someone new?", a: "Make room for him", wrong: ["Send him away", "Ignore him", "Make him stand"], why: "Quran 58:11: make room in the gatherings." },
        { q: "You may move someone so you can sit in his place.", tf: false, why: "A man should not make another man get up from his seat." }
      ]
    },
    {
      slug: "knock-three-times",
      title: "Ask three times",
      line: "Ask to come in three times; if no one answers, go back.",
      facts: ["Abu Musa asked three times at Umar's door.", "No one answered, so he went home.", "Umar asked for a witness; a companion confirmed it."],
      source: hadith("bukhari", "6245", "Abu Sa'id al-Khudri", "Sahih", "Abu Musa asked permission to enter on Umar three times, and was not given it, so he went back. He said the Prophet ﷺ said: if one of you asks permission three times and it is not given, let him go back. Umar asked for a witness, and Abu Sa'id went with him and confirmed it.", "If anyone of you asks the permission to enter thrice, and the permission is not given, then he should return"),
      difficulty: 3,
      questions: [
        { q: "How many times should you ask to come in?", a: "Three", wrong: ["Once", "Ten", "Until they open"], why: "If anyone asks permission thrice and it is not given, he should return." },
        { q: "Whose door did Abu Musa knock on?", a: "Umar's", wrong: ["Abu Bakr's", "Ali's", "Bilal's"], why: "I asked permission to enter upon Umar three times." },
        { q: "If no one answers after three times, what do you do?", a: "Go back", wrong: ["Walk in anyway", "Shout louder", "Wait all night"], why: "Then he should return." }
      ]
    },
    {
      slug: "rights-of-the-road",
      title: "Rights of the road",
      line: "Sitting by a road? Give the road its rights.",
      facts: ["Lower your gaze, and harm no one.", "Return the greeting of salam.", "Call to good and stop what is wrong."],
      source: hadith("bukhari", "2465", "Abu Sa'id al-Khudri", "Sahih", "Avoid sitting on the roads. They said: we have no choice, we sit there to talk. He ﷺ said: then give the road its rights: lowering the gaze, not harming people, returning salam, and calling to good and forbidding evil.", "observe the rights of the way"),
      difficulty: 3,
      questions: [
        { q: "Which of these is a right of the road?", a: "Returning salam", wrong: ["Blocking the path", "Staring at people", "Shouting at drivers"], why: "Returning greetings is one of the rights of the way." },
        { q: "Which of these is NOT a right of the road?", a: "Selling food to all", wrong: ["Lowering your gaze", "Not harming people", "Calling to good"], why: "The rights: lowering the gaze, no harm, returning salam, good and stopping evil." },
        { q: "The companions first said they had to sit by the roads.", tf: true, why: "They said: there is no way out of it, these are our sitting places." }
      ]
    }
  ]
};

const HONESTY: DeepUnit = {
  key: "honesty",
  topicId: "manners",
  branchId: "manners-honesty",
  branch: { title: "Honesty and trust", description: "Keeping promises, returning trusts, fair trade and paying people what they are owed." },
  name: "honesty",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "return-trusts",
      title: "Give back what is trusted",
      line: "Allah commands you to give back trusts to their owners.",
      facts: ["A trust, amanah, is anything left in your care.", "It can be money, a secret or a job.", "The ayah also says: judge between people fairly."],
      quote: quranQuote(4, 58),
      source: quran(4, 58, "Allah commands you to return trusts to their owners, and when you judge between people, to judge with justice."),
      difficulty: 1,
      questions: [
        { q: "What does Allah command about trusts?", a: "Give them back to their owners", wrong: ["Keep them safe forever", "Share them with friends", "Spend them carefully"], why: "Quran 4:58: return trusts to their owners." },
        { q: "Which of these can be an amanah?", a: "A friend's secret", wrong: ["Only gold", "Only a house", "Nothing small"], why: "A trust is anything left in your care: money, a secret, a job." },
        { q: "The same ayah tells us to judge fairly.", tf: true, why: "When you judge between people, judge with justice." }
      ]
    },
    {
      slug: "three-signs",
      title: "Three signs of a hypocrite",
      line: "A hypocrite lies, breaks his promises and betrays a trust.",
      facts: ["A hypocrite shows faith he does not truly have.", "A Muslim works to stay far from all three.", "Abu Hurairah narrated it."],
      source: hadith("bukhari", "33", "Abu Hurayrah", "Sahih", "The signs of a hypocrite are three: when he speaks, he lies; when he promises, he breaks it; and when he is trusted, he betrays.", "The signs of a hypocrite are three"),
      difficulty: 1,
      questions: [
        { q: "How many signs of a hypocrite did the Prophet ﷺ name?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "The signs of a hypocrite are three." },
        { q: "Which is a sign of a hypocrite?", a: "Breaking promises", wrong: ["Giving charity", "Praying on time", "Smiling"], why: "Whenever he promises, he breaks it." },
        { q: "Keeping your promise is part of good character.", tf: true, why: "Breaking promises is a sign of a hypocrite, so a Muslim keeps them." }
      ]
    },
    {
      slug: "the-wet-grain",
      title: "The wet grain",
      line: "A seller hid wet grain under dry grain. That is cheating.",
      facts: ["The Prophet ﷺ put his hand into a heap of food.", "His fingers came out wet from rain.", "He said: whoever cheats is not one of us."],
      source: hadith("muslim", "102", "Abu Hurairah", "Sahih", "The Prophet ﷺ passed a heap of food and put his hand in it, and his fingers became wet. He asked what this was. The man said: rain fell on it. He said: why not put it on top so people can see it? Whoever cheats is not of me.", "He who deceives is not of me"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ find inside the heap of food?", a: "Wet grain", wrong: ["Stones", "Gold", "Insects"], why: "His fingers were moistened, as rain had fallen on it." },
        { q: "What should the seller have done with the wet part?", a: "Put it on top to be seen", wrong: ["Hidden it better", "Thrown it in the sea", "Sold it at night"], why: "Why did you not place it over the rest, so people could see it?" },
        { q: "Hiding a fault in what you sell is fine if no one asks.", tf: false, why: "He who deceives is not of me." }
      ]
    },
    {
      slug: "honest-trade",
      title: "Blessing in honest trade",
      line: "Buyer and seller who tell the truth are blessed in their deal.",
      facts: ["Both should tell the faults of what is sold.", "Lies and hiding faults take the blessing away.", "Hakim ibn Hizam narrated it."],
      source: hadith("bukhari", "2079", "Hakim ibn Hizam", "Sahih", "If buyer and seller speak the truth and make clear the faults, their deal is blessed. If they lie and hide things, the blessing of their deal is wiped out.", "they would be blessed in their transaction"),
      difficulty: 2,
      questions: [
        { q: "What brings blessing into a sale?", a: "Truth and showing faults", wrong: ["A high price", "A fast deal", "A loud market"], why: "If both spoke the truth and described the defects, they would be blessed." },
        { q: "What happens if they lie and hide faults?", a: "The blessing is lost", wrong: ["They earn more", "Nothing happens", "The price goes up"], why: "The blessings of their transaction would be lost." },
        { q: "Who narrated the hadith about honest buying and selling?", a: "Hakim ibn Hizam", wrong: ["Abu Jahl", "Ka'b ibn Malik", "Abu Musa"], why: "Hakim ibn Hizam was a trader of Makkah who became Muslim." }
      ]
    },
    {
      slug: "pay-the-worker",
      title: "Pay the worker on time",
      line: "Give the worker his wages before his sweat dries.",
      facts: ["Pay people fully and quickly.", "Delaying a worker's pay is unfair to him.", "Abdullah ibn Umar narrated it."],
      source: hadith("ibnmajah", "2443", "Abdullah ibn Umar", "Sahih (Al-Albani)", "The Messenger of Allah ﷺ said: give the worker his wages before his sweat dries.", "Give the worker his wages before his sweat dries"),
      difficulty: 2,
      questions: [
        { q: "When should a worker be paid?", a: "Before his sweat dries", wrong: ["Next year", "Only if he asks", "When you feel like it"], why: "Give the worker his wages before his sweat dries." },
        { q: "What does before his sweat dries teach?", a: "Pay quickly and fully", wrong: ["Work in the heat", "Pay half now", "Pay only in food"], why: "Do not make a worker wait for what he has earned." },
        { q: "Making a worker wait for his pay is good manners.", tf: false, why: "Pay him before his sweat dries." }
      ]
    },
    {
      slug: "unpaid-worker",
      title: "Allah is against three",
      line: "Allah is against one who keeps back a worker's pay.",
      facts: ["Allah says it in a hadith qudsi.", "Also against one who breaks a promise in His name.", "And one who sells a free man as a slave."],
      source: hadith("bukhari", "2227", "Abu Hurairah", "Sahih", "Allah says: I will be against three on the Day of Resurrection: one who makes a promise in My name and betrays it, one who sells a free man and eats his price, and one who hires a worker, takes full work from him and does not pay him.", "employs a laborer and gets the full work done by him but does not pay him his wages"),
      difficulty: 3,
      questions: [
        { q: "Who is one of the three Allah is against?", a: "One who does not pay a worker", wrong: ["One who works hard", "One who gives gifts", "One who travels"], why: "One who employs a laborer and does not pay him his wages." },
        { q: "Which promise is also named among the three?", a: "A promise made in Allah's name", wrong: ["A promise to a child", "A promise to visit", "A promise of a gift"], why: "One who makes a covenant in My name, but proves treacherous." },
        { q: "A hadith qudsi is words of Allah told by the Prophet ﷺ.", tf: true, why: "Allah says, in this hadith told by the Prophet ﷺ." }
      ]
    },
    {
      slug: "lying-to-joke",
      title: "No lies, even to joke",
      line: "Woe to one who lies to make people laugh.",
      facts: ["He ﷺ said woe to him three times.", "Jokes are fine when they are true.", "Mu'awiyah ibn Haydah narrated it."],
      source: hadith("abudawud", "4990", "Mu'awiyah ibn Haydah", "Hasan (Al-Albani)", "The Messenger of Allah ﷺ said: woe to the one who speaks and lies to make people laugh. Woe to him, woe to him.", "Woe to him who tells things, speaking falsely, to make people laugh"),
      difficulty: 3,
      questions: [
        { q: "What kind of joke is warned against?", a: "A joke with a lie in it", wrong: ["Any joke at all", "A short joke", "A joke about food"], why: "Woe to him who speaks falsely to make people laugh." },
        { q: "How many times did he ﷺ say woe to him?", a: "Three", wrong: ["Once", "Seven", "Ten"], why: "Woe to him! Woe to him! Woe to him." },
        { q: "A Muslim may joke if what he says is true.", tf: true, why: "The warning is for lying to make people laugh." }
      ]
    }
  ]
};

const HUMILITY: DeepUnit = {
  key: "humility",
  topicId: "manners",
  branchId: "manners-humility",
  branch: { title: "Humility, not pride", description: "What pride really is, and how the Prophet ﷺ lived humbly at home and with people." },
  name: "humility",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "what-pride-is",
      title: "What pride really is",
      line: "Pride is rejecting the truth and looking down on people.",
      facts: ["A mustard seed of pride keeps one from Jannah.", "A man asked: I like nice clothes and shoes.", "He ﷺ said: Allah is beautiful and loves beauty."],
      source: hadith("muslim", "91", "Abdullah ibn Mas'ud", "Sahih", "Whoever has a mustard seed of pride in his heart will not enter Paradise. A man said: a person likes his clothes and shoes to be nice. He ﷺ said: Allah is beautiful and loves beauty. Pride is rejecting the truth and looking down on people.", "Pride is disdaining the truth"),
      difficulty: 1,
      questions: [
        { q: "What is pride, as the Prophet ﷺ explained it?", a: "Rejecting truth and looking down on people", wrong: ["Wearing nice clothes", "Being happy", "Having money"], why: "Pride is disdaining the truth and contempt for the people." },
        { q: "Is liking nice clothes pride?", a: "No, Allah loves beauty", wrong: ["Yes, always", "Only on Friday", "Only for men"], why: "Allah is beautiful and He loves beauty." },
        { q: "How much pride keeps a person from Jannah?", a: "Even a mustard seed", wrong: ["A mountain of it", "A bucket", "None at all"], why: "He who has a mustard seed of pride shall not enter Paradise." }
      ]
    },
    {
      slug: "raised-up",
      title: "Humble and raised up",
      line: "Whoever is humble for Allah, Allah raises him up.",
      facts: ["Charity never makes wealth less.", "Forgiving others makes you more honoured.", "Abu Hurairah narrated these three."],
      source: hadith("muslim", "2588", "Abu Hurairah", "Sahih", "Charity does not lessen wealth; Allah adds to the honour of one who forgives; and no one is humble for the sake of Allah except that Allah raises him.", "no one humbles himself for the sake of Allah except that Allah raises his status"),
      difficulty: 1,
      questions: [
        { q: "What does Allah do for someone humble for His sake?", a: "Raises him", wrong: ["Makes him poor", "Forgets him", "Makes him famous on earth only"], why: "No one humbles himself for Allah except that Allah raises his status." },
        { q: "Does charity make your wealth less?", a: "No", wrong: ["Yes, always", "Only on Fridays", "Only big charity"], why: "Charity does not decrease wealth." },
        { q: "Forgiving people lowers your honour.", tf: false, why: "No one forgives another except that Allah increases his honour." }
      ]
    },
    {
      slug: "at-home",
      title: "He helped at home",
      line: "At home the Prophet ﷺ was busy helping his family.",
      facts: ["Al-Aswad asked Aishah what he ﷺ did at home.", "He helped with the work of the house.", "When it was prayer time, he went to pray."],
      source: hadith("bukhari", "676", "Al-Aswad from Aishah", "Sahih", "Al-Aswad asked Aishah what the Prophet ﷺ used to do in his house. She said: he used to busy himself serving his family, and when the time for prayer came he went out for it.", "He used to keep himself busy serving his family"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ do at home?", a: "Helped his family", wrong: ["Only rested", "Only gave orders", "Stayed out all day"], why: "He used to keep himself busy serving his family." },
        { q: "What did he ﷺ do when prayer time came?", a: "Went out to pray", wrong: ["Kept working", "Slept", "Ate first"], why: "When it was time for prayer, he would go for it." },
        { q: "Who told al-Aswad how he ﷺ was at home?", a: "Aishah", wrong: ["Abu Hurairah", "Anas", "Bilal"], why: "Al-Aswad asked Aishah, and she answered him." }
      ]
    },
    {
      slug: "shepherds",
      title: "Every prophet a shepherd",
      line: "Every prophet looked after sheep, the Prophet ﷺ too.",
      facts: ["He ﷺ looked after Makkah's sheep for a small wage.", "The pay was a few qirats.", "Simple work teaches patience and care."],
      source: hadith("bukhari", "2262", "Abu Hurairah", "Sahih", "Allah did not send any prophet who did not look after sheep. They asked: and you? He ﷺ said: yes, I looked after the sheep of the people of Makkah for a few qirats.", "I used to shepherd the sheep of the people of Mecca for some Qirats"),
      difficulty: 2,
      questions: [
        { q: "What work did every prophet do, the Prophet ﷺ said?", a: "Looking after sheep", wrong: ["Building ships", "Trading gold", "Making swords"], why: "Allah did not send any prophet but shepherded sheep." },
        { q: "Whose sheep did the Prophet ﷺ look after?", a: "The people of Makkah's", wrong: ["The king of Persia's", "His own only", "Madinah's people's"], why: "I used to shepherd the sheep of the people of Makkah." },
        { q: "What was he ﷺ paid for it?", a: "A few qirats", wrong: ["A palace", "A hundred camels", "Nothing ever"], why: "For some qirats, a small amount of money." }
      ]
    },
    {
      slug: "be-humble",
      title: "No one above another",
      line: "Allah revealed: be humble, so no one boasts over another.",
      facts: ["The Prophet ﷺ said it in a sermon.", "No one should wrong another either.", "Iyad ibn Himar narrated it."],
      source: hadith("muslim", "2865d", "Iyad ibn Himar", "Sahih", "Allah revealed to me that you should be humble towards one another, so that no one boasts over another and no one wrongs another.", "Allah revealed to me that we should be humble amongst ourselves"),
      difficulty: 2,
      questions: [
        { q: "What did Allah reveal about how we treat each other?", a: "Be humble with each other", wrong: ["Compete to be first", "Stay away from people", "Speak loudly"], why: "Allah revealed to me that we should be humble amongst ourselves." },
        { q: "Because of humility, no one should do what?", a: "Boast over another", wrong: ["Help another", "Greet another", "Visit another"], why: "None should show pride upon the others." },
        { q: "Who narrated the hadith about being humble?", a: "Iyad ibn Himar", wrong: ["Abu Lahab", "Hakim ibn Hizam", "Al-Aqra ibn Habis"], why: "Iyad ibn Himar heard it in a sermon." }
      ]
    },
    {
      slug: "walk-humbly",
      title: "Do not turn your cheek",
      line: "Luqman told his son: do not turn from people in pride.",
      facts: ["Do not walk on earth full of yourself.", "Allah does not love the proud who boast.", "Luqman's advice is in Surah Luqman."],
      quote: quranQuote(31, 18),
      source: quran(31, 18, "Luqman told his son: do not turn your cheek away from people in pride, and do not walk proudly on the earth. Allah does not love anyone proud and boastful."),
      difficulty: 3,
      questions: [
        { q: "Who gave this advice to his son?", a: "Luqman", wrong: ["Firawn", "Qarun", "Haman"], why: "Quran 31:18 is Luqman's advice to his son." },
        { q: "Whom does Allah not love, in the ayah?", a: "The proud who boast", wrong: ["The quiet", "The poor", "The young"], why: "Allah does not love anyone proud and boastful." },
        { q: "Turning your face away from people in pride is good.", tf: false, why: "Do not turn your cheek away from people in pride." }
      ]
    }
  ]
};

const PATIENCE: DeepUnit = {
  key: "patience",
  topicId: "manners",
  branchId: "manners-patience",
  branch: { title: "Patience and thanks", description: "How a believer is patient in hard times and thankful in good times." },
  name: "patience and thanks",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "always-good",
      title: "Always good for a believer",
      line: "A believer is thankful in good times, patient in hard ones.",
      facts: ["Both ways, it is good for him.", "This is only so for a believer.", "Suhaib narrated it."],
      source: hadith("muslim", "2999", "Suhaib", "Sahih", "How wonderful is the affair of the believer: all of it is good. If something good happens he is thankful, and that is good for him. If something bad happens he is patient, and that is good for him.", "there is good in every affair of his"),
      difficulty: 1,
      questions: [
        { q: "What does a believer do when something good happens?", a: "Thanks Allah", wrong: ["Shows off", "Forgets Allah", "Hides it"], why: "If he has an occasion to feel delight, he thanks Allah." },
        { q: "What does a believer do when something hard happens?", a: "Is patient", wrong: ["Gives up", "Blames others", "Stops praying"], why: "If he gets into trouble and is patient, there is good for him." },
        { q: "For a believer, both good and hard times can be good.", tf: true, why: "There is good in every affair of his." }
      ]
    },
    {
      slug: "first-moment",
      title: "Patience at the first shock",
      line: "Real patience is at the first moment of a hard thing.",
      facts: ["A woman was crying hard at a grave.", "He ﷺ told her: fear Allah and be patient.", "She did not know him, then came to say sorry."],
      source: hadith("bukhari", "1283", "Anas ibn Malik", "Sahih", "The Prophet ﷺ passed a woman crying at a grave and told her to fear Allah and be patient. She said: go away, you have not had a loss like mine, not knowing him. Later she came to him and said: I did not know you. He said: patience is at the first stroke of a calamity.", "the patience is at the first stroke of a calamity"),
      difficulty: 1,
      questions: [
        { q: "When is real patience shown?", a: "At the first moment", wrong: ["A year later", "Only at night", "After you complain"], why: "Patience is at the first stroke of a calamity." },
        { q: "Why did the woman speak harshly to him ﷺ?", a: "She did not know him", wrong: ["She was angry at Islam", "She was a stranger in Makkah", "She was joking"], why: "She did not recognize him." },
        { q: "The woman later came to his ﷺ house.", tf: true, why: "She went to the house of the Prophet ﷺ and found no guard." }
      ]
    },
    {
      slug: "best-gift",
      title: "The best gift",
      line: "No one is given a gift better than patience.",
      facts: ["The Ansar asked and he ﷺ gave until nothing was left.", "Whoever tries to be patient, Allah makes him patient.", "Abu Sa'id al-Khudri narrated it."],
      source: hadith("bukhari", "1469", "Abu Sa'id al-Khudri", "Sahih", "Some of the Ansar asked the Prophet ﷺ and he gave them until what he had ran out. He said: whoever keeps from asking, Allah makes him content; whoever tries to be patient, Allah makes him patient; and no one is given a gift better and wider than patience.", "Nobody can be given a blessing better and greater than patience"),
      difficulty: 2,
      questions: [
        { q: "What is the best gift a person can be given?", a: "Patience", wrong: ["Wealth", "Children", "Health"], why: "Nobody can be given a blessing better and greater than patience." },
        { q: "What does Allah do for one who tries to be patient?", a: "Makes him patient", wrong: ["Makes him rich at once", "Nothing", "Makes him sad"], why: "Whoever remains patient, Allah will make him patient." },
        { q: "The Prophet ﷺ kept back some of what he had from the Ansar.", tf: false, why: "He gave them until all that was with him was finished." }
      ]
    },
    {
      slug: "even-a-thorn",
      title: "Even a thorn",
      line: "Even a thorn's prick wipes away some sins of a Muslim.",
      facts: ["Tiredness, illness, worry and sadness too.", "Allah turns hard moments into good.", "Abu Sa'id and Abu Hurairah narrated it."],
      source: hadith("bukhari", "5641", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "No tiredness, illness, worry, sadness, hurt or distress befalls a Muslim, even the prick of a thorn, but Allah wipes away some of his sins by it.", "even if it were the prick he receives from a thorn"),
      difficulty: 2,
      questions: [
        { q: "What does even a thorn's prick do for a Muslim?", a: "Wipes away some sins", wrong: ["Nothing", "Takes away reward", "Makes him weak"], why: "Allah expiates some of his sins for that." },
        { q: "Which of these is also named in the hadith?", a: "Sadness", wrong: ["Wealth", "Laughter", "Travel"], why: "Nor sorrow, nor sadness, nor hurt befalls a Muslim but sins are wiped." },
        { q: "Hard moments can be a mercy for a believer.", tf: true, why: "Allah wipes away sins by them." }
      ]
    },
    {
      slug: "look-below",
      title: "Look at who has less",
      line: "Look at those who have less than you, not those with more.",
      facts: ["It helps you see Allah's gifts to you.", "Looking only up can make you ungrateful.", "Abu Hurairah narrated it."],
      source: hadith("muslim", "2963c", "Abu Hurairah", "Sahih", "Look at those below you and do not look at those above you, for that is better so that you do not belittle the blessings of Allah upon you.", "Look at those who stand at a lower level than you"),
      difficulty: 2,
      questions: [
        { q: "To stay thankful, whom should you look at?", a: "Those who have less", wrong: ["Only the richest", "Only famous people", "No one"], why: "Look at those who stand at a lower level than you." },
        { q: "What does looking only at those above you lead to?", a: "Belittling Allah's blessings", wrong: ["Being humble", "Being thankful", "Getting rich"], why: "That is better so that you do not disparage Allah's favors." },
        { q: "Looking at those with less helps you be thankful.", tf: true, why: "So that you do not belittle the blessings of Allah." }
      ]
    },
    {
      slug: "thank-people",
      title: "Thank people too",
      line: "Whoever does not thank people has not thanked Allah.",
      facts: ["Say thank you, or Jazakallahu khayran.", "Thanking people is part of thanking Allah.", "Abu Hurairah narrated it."],
      source: hadith("abudawud", "4811", "Abu Hurayrah", "Sahih (Al-Albani)", "The Prophet ﷺ said: whoever does not thank people has not thanked Allah.", "He who does not thank the people is not thankful to Allah"),
      difficulty: 2,
      questions: [
        { q: "Someone helps you. What should you do?", a: "Thank them", wrong: ["Ignore them", "Thank only Allah, not them", "Ask for more"], why: "He who does not thank the people is not thankful to Allah." },
        { q: "What is a good way to thank someone?", a: "Jazakallahu khayran", wrong: ["Astaghfirullah", "Inna lillah", "A'udhu billah"], why: "It means: may Allah reward you with good." },
        { q: "Thanking people has nothing to do with thanking Allah.", tf: false, why: "He who does not thank people is not thankful to Allah." }
      ]
    },
    {
      slug: "do-not-say-if-only",
      title: "Do not say: if only",
      line: "A strong believer seeks Allah's help and never gives up.",
      facts: ["The strong believer is more loved by Allah.", "There is good in every believer.", "Say: Allah decreed it, and did what He willed."],
      source: hadith("muslim", "2664", "Abu Hurairah", "Sahih", "The strong believer is better and more loved by Allah than the weak believer, and in both there is good. Strive for what benefits you, seek Allah's help and do not give up. If something befalls you, do not say: if only I had done such, but say: Allah decreed and did what He willed, for if only opens the door to Shaytan.", "seek help from Allah and do not lose heart"),
      difficulty: 3,
      questions: [
        { q: "What should you say after something goes wrong?", a: "Allah decreed and did what He willed", wrong: ["If only I had done it differently", "It is all their fault", "Nothing matters"], why: "Do not say if only, but say: Allah decreed and did what He willed." },
        { q: "Which believer is more loved by Allah?", a: "The strong believer", wrong: ["The one who gives up", "The richest believer", "The loudest believer"], why: "A strong believer is better and more lovable to Allah." },
        { q: "Saying if only opens a door to Shaytan.", tf: true, why: "Your if only opens the gate for Shaytan." }
      ]
    }
  ]
};

const BROTHERHOOD: DeepUnit = {
  key: "brotherhood",
  topicId: "manners",
  branchId: "manners-brotherhood",
  branch: { title: "Brothers and sisters in faith", description: "How Muslims love, help and stand by one another, like one body." },
  name: "brotherhood",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "what-you-love",
      title: "Want for him what you want",
      line: "Want for your brother what you want for yourself.",
      facts: ["The brother here means a fellow Muslim.", "Be happy when good comes to others.", "Anas ibn Malik narrated it."],
      source: hadith("bukhari", "13", "Anas ibn Malik", "Sahih", "None of you truly believes until he wishes for his brother what he wishes for himself.", "None of you will have faith till he wishes for his (Muslim) brother what he likes for himself"),
      difficulty: 1,
      questions: [
        { q: "When is a person's faith complete, in this hadith?", a: "When he wants for others what he wants", wrong: ["When he is rich", "When he lives alone", "When he wins"], why: "None of you will have faith till he wishes for his brother what he likes for himself." },
        { q: "Your friend gets the prize you wanted. What fits this lesson?", a: "Be happy for him", wrong: ["Be jealous", "Stop talking to him", "Say it is unfair"], why: "Wish for your brother what you like for yourself." },
        { q: "Wanting good only for yourself is complete faith.", tf: false, why: "Faith is not complete until you want it for your brother too." }
      ]
    },
    {
      slug: "one-body",
      title: "Like one body",
      line: "Believers are like one body: when one part hurts, all hurts.",
      facts: ["In love, mercy and care for each other.", "The whole body cannot sleep and gets a fever.", "An-Nu'man ibn Bashir narrated it."],
      source: hadith("muslim", "2586a", "An-Nu'man ibn Bashir", "Sahih", "The believers in their love, mercy and care for one another are like one body: when one part of it aches, the whole body aches with sleeplessness and fever.", "is that of one body"),
      difficulty: 1,
      questions: [
        { q: "The believers are like what, in their care for each other?", a: "One body", wrong: ["A crowd", "A market", "Two teams"], why: "Their likeness is that of one body." },
        { q: "When one part of the body hurts, what happens?", a: "The whole body feels it", wrong: ["Nothing", "Only that part", "It falls off"], why: "When any limb of it aches, the whole body aches." },
        { q: "Muslims should care when other Muslims suffer.", tf: true, why: "Like one body, the pain of one is felt by all." }
      ]
    },
    {
      slug: "a-building",
      title: "Like a building",
      line: "Believers are like a building: each part holds up another.",
      facts: ["The Prophet ﷺ laced his fingers together.", "Then a man came asking for help.", "He ﷺ said: speak up for him and be rewarded."],
      source: hadith("bukhari", "6026", "Abu Musa", "Sahih", "A believer to another believer is like a building whose parts hold each other up, and he laced his fingers. Then a man came asking for something, and he ﷺ said: help him and speak for him, and you will be rewarded.", "like a building whose different parts enforce each other"),
      difficulty: 2,
      questions: [
        { q: "A believer to a believer is like what?", a: "A building", wrong: ["A river", "A tree", "A road"], why: "Like a building whose different parts enforce each other." },
        { q: "What did the Prophet ﷺ do with his hands to show it?", a: "Laced his fingers", wrong: ["Clapped", "Raised one hand", "Drew a house"], why: "He clasped his hands with the fingers interlaced." },
        { q: "When a man came asking, the Prophet ﷺ told them to help him.", tf: true, why: "Help and recommend him, and you will receive the reward." }
      ]
    },
    {
      slug: "help-your-brother",
      title: "Help him even when he is wrong",
      line: "Help your brother, wronged or doing wrong.",
      facts: ["They asked: how do we help one doing wrong?", "He ﷺ said: stop him from wronging others.", "Anas ibn Malik narrated it."],
      source: hadith("bukhari", "2444", "Anas ibn Malik", "Sahih", "Help your brother whether he wrongs others or is wronged. They said: we help him when he is wronged, but how when he wrongs others? He said: by stopping him from wronging others.", "By preventing him from oppressing others"),
      difficulty: 2,
      questions: [
        { q: "How do you help a brother who is wronging others?", a: "Stop him from doing it", wrong: ["Join him", "Cheer him on", "Look away"], why: "By preventing him from oppressing others." },
        { q: "Your friend is bullying someone. What fits this lesson?", a: "Stop your friend", wrong: ["Laugh along", "Film it", "Walk off silently"], why: "Help him by preventing him from oppressing others." },
        { q: "Helping a brother means always taking his side.", tf: false, why: "If he is wronging others, help him by stopping him." }
      ]
    },
    {
      slug: "do-not-wrong-him",
      title: "Meet his need, Allah meets yours",
      line: "Whoever meets his brother's need, Allah meets his need.",
      facts: ["A Muslim does not wrong his brother.", "He does not leave him to someone who harms him.", "Hide his faults, and Allah hides yours."],
      source: hadith("bukhari", "2442", "Abdullah ibn Umar", "Sahih", "A Muslim is the brother of a Muslim: he does not wrong him or hand him over. Whoever meets his brother's need, Allah meets his need. Whoever relieves a Muslim of a hardship, Allah relieves him of a hardship of the Day of Resurrection. Whoever covers a Muslim, Allah covers him on the Day of Resurrection.", "Whoever fulfilled the needs of his brother, Allah will fulfill his needs"),
      difficulty: 2,
      questions: [
        { q: "You help a friend with what he needs. What does Allah do?", a: "Meets your needs", wrong: ["Nothing", "Takes your reward", "Makes you tired"], why: "Whoever fulfilled the needs of his brother, Allah will fulfill his needs." },
        { q: "You know a friend's private mistake. What should you do?", a: "Cover it", wrong: ["Post it online", "Tell everyone", "Laugh about it"], why: "Whoever screened a Muslim, Allah will screen him on the Day of Resurrection." },
        { q: "A Muslim may hand his brother over to someone who harms him.", tf: false, why: "He should not oppress him, nor hand him over to an oppressor." }
      ]
    },
    {
      slug: "piety-is-here",
      title: "Taqwa is here",
      line: "Taqwa is here, he ﷺ said, pointing to his chest three times.",
      facts: ["Do not envy, hate or turn your backs on each other.", "Be brothers, servants of Allah.", "It is evil enough to look down on your brother."],
      source: hadith("muslim", "2564a", "Abu Hurairah", "Sahih", "Do not envy one another, do not hate one another, do not turn away from one another; be servants of Allah, brothers. A Muslim is the brother of a Muslim: he does not wrong him, let him down or look down on him. Taqwa is here, and he pointed to his chest three times. It is evil enough for a man to look down on his Muslim brother.", "The piety is here"),
      difficulty: 3,
      questions: [
        { q: "Where did the Prophet ﷺ point when he said: taqwa is here?", a: "His chest", wrong: ["His head", "The sky", "The Kaaba"], why: "He pointed towards his chest thrice." },
        { q: "What is evil enough for a Muslim, in this hadith?", a: "Looking down on his brother", wrong: ["Being poor", "Being tired", "Asking a question"], why: "It is a serious evil for a Muslim to look down upon his brother." },
        { q: "Which of these did the Prophet ﷺ forbid in this hadith?", a: "Envying one another", wrong: ["Greeting one another", "Visiting one another", "Giving gifts"], why: "Do not envy, do not hate, do not turn away from one another." }
      ]
    },
    {
      slug: "visit-for-allah",
      title: "A visit for Allah's sake",
      line: "A man visited a brother for Allah, and an angel met him.",
      facts: ["He was going to see a brother in another town.", "He wanted nothing from him in return.", "The angel said: Allah loves you as you love him."],
      source: hadith("muslim", "2567a", "Abu Hurairah", "Sahih", "A man set out to visit a brother in another town, and Allah sent an angel to wait on his road. The angel asked where he was going and whether he wanted something from his brother. He said: no, I love him for the sake of Allah. The angel said: I am a messenger from Allah to you, that Allah loves you as you love him.", "Allah loves you as you love him"),
      difficulty: 3,
      questions: [
        { q: "Why was the man visiting his brother?", a: "He loved him for Allah", wrong: ["To ask for money", "To trade", "He was lost"], why: "I love him for the sake of Allah." },
        { q: "Whom did Allah send to meet him on the road?", a: "An angel", wrong: ["A king", "A prophet", "A trader"], why: "Allah deputed an angel to wait for him on his way." },
        { q: "What did the angel tell him?", a: "Allah loves you as you love him", wrong: ["Go back home", "Your brother has moved", "Bring a gift"], why: "Allah loves you as you love him for His sake." }
      ]
    }
  ]
};

const CLEAN: DeepUnit = {
  key: "clean",
  topicId: "manners",
  branchId: "manners-cleanliness",
  branch: { title: "Clean and tidy", description: "Cleanliness as part of faith: the body, the teeth, the nails and the masjid." },
  name: "cleanliness",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "half-of-faith",
      title: "Half of faith",
      line: "Being clean and pure is half of faith.",
      facts: ["Alhamdulillah fills the scale of good deeds.", "Prayer is a light.", "Abu Malik al-Ash'ari narrated it."],
      source: hadith("muslim", "223", "Abu Malik al-Ash'ari", "Sahih", "Purity is half of faith, Alhamdulillah fills the scale, and prayer is a light.", "Cleanliness is half of faith"),
      difficulty: 1,
      questions: [
        { q: "How much of faith is purity?", a: "Half", wrong: ["A tenth", "None", "A little bit"], why: "Cleanliness is half of faith." },
        { q: "What fills the scale, in the same hadith?", a: "Alhamdulillah", wrong: ["Water", "Gold", "Silence"], why: "Al-Hamdu Lillah fills the scale." },
        { q: "In the same hadith, prayer is called a light.", tf: true, why: "Prayer is a light." }
      ]
    },
    {
      slug: "siwak",
      title: "Clean teeth",
      line: "The Prophet ﷺ loved the siwak, a stick for cleaning teeth.",
      facts: ["He ﷺ would have ordered it before every prayer.", "He did not, so it would not be hard on us.", "A toothbrush also keeps this sunnah's purpose."],
      source: hadith("bukhari", "887", "Abu Hurairah", "Sahih", "If it were not hard on my people, I would have ordered them to use the siwak for every prayer.", "I would have ordered them to clean their teeth with Siwak for every prayer"),
      difficulty: 1,
      questions: [
        { q: "What is a siwak used for?", a: "Cleaning teeth", wrong: ["Writing", "Cooking", "Combing hair"], why: "To clean their teeth with siwak." },
        { q: "Why did he ﷺ not order siwak before every prayer?", a: "So it would not be hard on us", wrong: ["He did not like it", "Siwak was too costly", "It was only for him"], why: "If I had not found it hard for my followers, I would have ordered it." },
        { q: "Using the siwak before prayer is a loved sunnah.", tf: true, why: "He would have ordered it for every prayer, if it were not hard on us." }
      ]
    },
    {
      slug: "fitrah",
      title: "The natural way",
      line: "Clipping nails and trimming the moustache are fitrah.",
      facts: ["Fitrah means the natural way Allah made us.", "The Prophet ﷺ named five such habits.", "They keep the body clean and neat."],
      source: hadith("bukhari", "5889", "Abu Hurairah", "Sahih", "Five things are part of the fitrah, the natural way, among them clipping the nails and trimming the moustache.", "Five practices are characteristics of the Fitra"),
      difficulty: 2,
      questions: [
        { q: "Which of these is part of the fitrah?", a: "Clipping the nails", wrong: ["Growing long nails", "Never bathing", "Painting the teeth"], why: "Clipping the nails is one of the five practices of the fitrah." },
        { q: "What does fitrah mean?", a: "The natural way Allah made us", wrong: ["A kind of food", "A city", "A prayer time"], why: "The fitrah is the natural way of a person." },
        { q: "How many fitrah practices are named in the hadith?", a: "Five", wrong: ["Two", "Ten", "Forty"], why: "Five practices are characteristics of the fitrah." }
      ]
    },
    {
      slug: "no-bad-smell",
      title: "Fresh for the masjid",
      line: "Ate raw garlic or onion? Keep away from the masjid.",
      facts: ["A strong smell bothers the people praying.", "Jabir ibn Abdullah narrated it.", "Come to the masjid clean and fresh."],
      source: hadith("bukhari", "855", "Jabir ibn Abdullah", "Sahih", "Whoever eats garlic or onion should keep away from our masjid, or stay in his house.", "Whoever eats garlic or onion should keep away from our mosque"),
      difficulty: 2,
      questions: [
        { q: "Why stay away from the masjid after raw garlic?", a: "Its smell bothers others", wrong: ["Garlic is haram", "The masjid is closed", "It makes you sleepy"], why: "Whoever eats garlic or onion should keep away from our mosque." },
        { q: "Which two foods are named in the hadith?", a: "Garlic and onion", wrong: ["Dates and milk", "Bread and honey", "Rice and meat"], why: "Whoever eats garlic or onion." },
        { q: "Garlic itself is haram to eat.", tf: false, why: "It is not haram; the point is not to bother people in the masjid." }
      ]
    },
    {
      slug: "praise-after-food",
      title: "Praise after eating",
      line: "Allah is pleased by Alhamdulillah after food and drink.",
      facts: ["Say it after eating a meal.", "Say it after a drink too.", "Anas ibn Malik narrated it."],
      source: hadith("muslim", "2734a", "Anas ibn Malik", "Sahih", "Allah is pleased with His servant who eats a meal and praises Him for it, or drinks a drink and praises Him for it.", "Allah is pleased with His servant"),
      difficulty: 2,
      questions: [
        { q: "What pleases Allah after you eat or drink?", a: "Saying Alhamdulillah", wrong: ["Leaving the plate", "Eating fast", "Talking loudly"], why: "Allah is pleased with His servant who says Al-Hamdu lillah." },
        { q: "Is it only after food, or after drinks too?", a: "After drinks too", wrong: ["Only after food", "Only on Eid", "Only at night"], why: "While taking a morsel of food and while drinking." },
        { q: "Thanking Allah after a meal is a small but loved deed.", tf: true, why: "Allah is pleased with it." }
      ]
    }
  ]
};

const HAYA: DeepUnit = {
  key: "haya",
  topicId: "manners",
  branchId: "manners-haya",
  branch: { title: "Haya: modesty", description: "Haya, a shyness from doing wrong, in what we say, wear and look at." },
  name: "haya",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "only-good",
      title: "Haya brings only good",
      line: "Haya brings nothing but good.",
      facts: ["Haya is shyness from doing what is wrong.", "Imran ibn Husayn narrated it.", "It keeps a person away from bad deeds."],
      source: hadith("bukhari", "6117", "Imran ibn Husayn", "Sahih", "The Prophet ﷺ said: haya does not bring anything except good.", "does not bring anything except good"),
      difficulty: 1,
      questions: [
        { q: "What does haya bring?", a: "Only good", wrong: ["Only trouble", "Weakness", "Nothing"], why: "Haya does not bring anything except good." },
        { q: "What is haya?", a: "Shyness from doing wrong", wrong: ["Being rude", "Being lazy", "Fear of people"], why: "It is a shyness that keeps you from bad deeds." },
        { q: "Haya stops a person from doing bad deeds.", tf: true, why: "That is why it brings only good." }
      ]
    },
    {
      slug: "early-prophets",
      title: "Words of the early prophets",
      line: "If you have no haya, do as you wish, said earlier prophets.",
      facts: ["People kept this saying from the first prophets.", "Without haya, nothing holds a person back.", "Abu Mas'ud al-Ansari narrated it."],
      source: hadith("bukhari", "6120", "Abu Mas'ud al-Ansari", "Sahih", "Among the words people have kept from the first prophethood: if you feel no shame, then do whatever you wish.", "do whatever you like"),
      difficulty: 2,
      questions: [
        { q: "Where does the saying about having no haya come from?", a: "The early prophets", wrong: ["A poet of Makkah", "A king of Persia", "A Roman book"], why: "One of the sayings of the early prophets which people have got." },
        { q: "What does the saying warn about?", a: "Having no haya at all", wrong: ["Being too shy to pray", "Eating too much", "Travelling alone"], why: "Without haya, a person does whatever he likes." },
        { q: "The saying means doing whatever you want is good.", tf: false, why: "It is a warning: without haya nothing holds you back." }
      ]
    },
    {
      slug: "more-shy",
      title: "Shyer than a girl in her room",
      line: "The Prophet ﷺ was shyer than a young girl behind her curtain.",
      facts: ["He ﷺ did not speak rudely or show off.", "When he disliked something, it showed on his face.", "Abu Sa'id al-Khudri narrated it."],
      source: hadith("bukhari", "3562", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ was shyer than a young girl kept behind her curtain.", "was shier than a veiled virgin girl"),
      difficulty: 2,
      questions: [
        { q: "How shy was the Prophet ﷺ?", a: "Shyer than a girl behind her curtain", wrong: ["Not shy at all", "Shy only with kings", "Shy only as a child"], why: "He was shier than a veiled virgin girl." },
        { q: "Who described his ﷺ shyness?", a: "Abu Sa'id al-Khudri", wrong: ["Abu Jahl", "Hakim ibn Hizam", "Al-Aqra ibn Habis"], why: "Abu Sa'id al-Khudri narrated it." },
        { q: "Haya was part of the Prophet's ﷺ character.", tf: true, why: "He was shier than a girl behind her curtain." }
      ]
    },
    {
      slug: "lower-the-gaze-men",
      title: "Men: lower your gaze",
      line: "Allah tells believing men: lower your gaze, guard chastity.",
      facts: ["Lowering the gaze: not staring at what is not allowed.", "This is purer for them.", "Allah knows all they do."],
      quote: quranQuote(24, 30),
      source: quran(24, 30, "Tell the believing men to lower their gaze and guard their chastity. That is purer for them. Allah knows well what they do."),
      difficulty: 3,
      questions: [
        { q: "What are believing men told to lower?", a: "Their gaze", wrong: ["Their voices only", "Their heads in sujud", "Their prices"], why: "Quran 24:30: tell the believing men to lower their gaze." },
        { q: "Why is lowering the gaze good for men, says the ayah?", a: "It is purer for them", wrong: ["It saves time", "It looks humble", "It is a custom"], why: "That is purer for them." },
        { q: "Lowering the gaze is only asked of women.", tf: false, why: "Quran 24:30 asks it of men; 24:31 asks it of women too." }
      ]
    },
    {
      slug: "lower-the-gaze-women",
      title: "Women: lower your gaze too",
      line: "Allah tells believing women: lower your gaze, guard chastity.",
      facts: ["The next ayah, 24:31, speaks to women.", "They also cover their beauty, except what shows.", "Haya is for men and women alike."],
      quote: quranQuote(24, 31),
      source: quran(24, 31, "Tell the believing women to lower their gaze, guard their chastity, and not show their adornment except what normally appears."),
      difficulty: 3,
      questions: [
        { q: "Which ayah tells believing women to lower their gaze?", a: "Quran 24:31", wrong: ["Quran 2:255", "Quran 1:1", "Quran 112:1"], why: "Quran 24:31 comes right after the ayah for men." },
        { q: "Is haya for men, women or both?", a: "Both", wrong: ["Men only", "Women only", "Children only"], why: "24:30 tells the men and 24:31 the women." },
        { q: "Women are also told to cover their adornment.", tf: true, why: "And not show their adornment except what normally appears." }
      ]
    }
  ]
};

export const MANNERS_UNITS: readonly DeepUnit[] = [MERCY, PUBLIC_ADAB, HONESTY, HUMILITY, PATIENCE, BROTHERHOOD, CLEAN, HAYA];
