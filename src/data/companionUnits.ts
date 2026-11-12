import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// More companions, each a unit of its own in the Sahabah topic, told in the order their lives happened. Every
// lesson rests on a sahih hadith from Bukhari or Muslim (or an ayah of the Quran), with the words on the
// sunnah.com page lit up. Stories from weak chains, and anything the scholars differ on, are left out.

// Ka'b ibn Malik tells his own story of Tabuk (Sahih al-Bukhari 4418), from the night of Al-Aqabah to the
// day Allah accepted his repentance.
const KAB: DeepUnit = {
  key: "kab",
  topicId: "sahabah",
  branchId: "sahabi-kab-ibn-malik",
  branch: { title: "Ka'b ibn Malik", description: "The companion who stayed behind from Tabuk, told the truth, and was forgiven by Allah." },
  name: "Ka'b ibn Malik",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "aqabah",
      title: "The night of Al-Aqabah",
      line: "Ka'b pledged to the Prophet ﷺ on the night of Al-Aqabah.",
      facts: ["Ka'b was one of the Ansar of Madinah.", "He loved that night more than the Battle of Badr.", "He was not at Badr, and no one was blamed for missing it."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Ka'b said: I was at the night of Al-Aqabah when we pledged for Islam, and I would not swap it for Badr, though Badr is better known among the people.", "when we pledged for Islam"),
      difficulty: 2,
      questions: [
        { q: "Which night did Ka'b see with the Prophet ﷺ?", a: "The night of Al-Aqabah", wrong: ["The night of the Hijrah", "The night of Badr", "The night of Isra"], why: "He pledged for Islam on that night." },
        { q: "Which did Ka'b love more: Al-Aqabah or Badr?", a: "Al-Aqabah", wrong: ["Badr", "He loved neither", "Uhud"], why: "He said he would not swap Al-Aqabah for Badr." },
        { q: "Ka'b was blamed for missing the Battle of Badr.", tf: false, why: "Allah did not blame anyone who missed Badr." }
      ]
    },
    {
      slug: "strongest",
      title: "Never stronger, never richer",
      line: "When Tabuk came, Ka'b had two camels and was never stronger.",
      facts: ["It was his first time owning two she-camels.", "Tabuk was far away, in great heat, against a big army.", "The Prophet ﷺ told everyone clearly where they were going."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Ka'b said: I had never been stronger or richer than when I stayed behind from Tabuk; I owned two she-camels for the first time. The march was in great heat, over a long desert, against a large enemy.", "I had never been stronger or wealthier than I was when I remained behind"),
      difficulty: 2,
      questions: [
        { q: "How many she-camels did Ka'b own before Tabuk?", a: "Two", wrong: ["None", "Ten", "One hundred"], why: "It was the first time he had two." },
        { q: "What was the weather when the army left for Tabuk?", a: "Very hot", wrong: ["Snowy", "Rainy and cold", "Mild spring"], why: "Tabuk was fought in severe heat." },
        { q: "Ka'b stayed behind because he was too poor to go.", tf: false, why: "He was never stronger or richer than then." },
        { q: "For Tabuk, the Prophet ﷺ said clearly where the army was going.", tf: true, why: "So that the Muslims could get ready for the long trip." }
      ]
    },
    {
      slug: "delay",
      title: "\"I can do it tomorrow\"",
      line: "Ka'b kept saying \"later\" until the army had gone.",
      facts: ["Each morning he went out to get ready and came back with nothing done.", "He told himself he would catch up in a day or two.", "Putting off a good deed can make you miss it."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Ka'b said: I would tell myself, I can do that, and I kept delaying, until the people had left and I had prepared nothing.", "So I kept on delaying it every now and then till the people got ready"),
      difficulty: 2,
      questions: [
        { q: "Why did Ka'b miss the army leaving for Tabuk?", a: "He kept putting it off", wrong: ["He was sick", "He was told to stay", "He had no camel"], why: "He kept delaying until they left." },
        { q: "What did Ka'b tell himself each time?", a: "I can do that", wrong: ["I will never go", "I am afraid", "It is too hot"], why: "He was sure he could catch up later." },
        { q: "What does Ka'b's delay teach us?", a: "Do a good deed now, not later", wrong: ["Wait for the perfect day", "Good deeds can always wait", "Never travel in summer"], why: "Putting it off made him miss it." }
      ]
    },
    {
      slug: "at-tabuk",
      title: "\"What did Ka'b do?\"",
      line: "At Tabuk, Mu'adh spoke up for the absent Ka'b.",
      facts: ["A man said Ka'b stayed home proud of his fine clothes.", "Mu'adh ibn Jabal said: we know only good about him.", "In Madinah, Ka'b saw only the excused and those accused of hypocrisy."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "At Tabuk the Prophet ﷺ asked: what did Ka'b do? A man blamed his fine clothes. Mu'adh ibn Jabal said: what a bad thing you said! We know nothing about him but good.", "We know nothing about him but good"),
      difficulty: 3,
      questions: [
        { q: "Who spoke up for Ka'b at Tabuk?", a: "Mu'adh ibn Jabal", wrong: ["Abu Bakr", "Khalid ibn al-Walid", "Abu Hurairah"], why: "He said: we know nothing about him but good." },
        { q: "What did Mu'adh say about Ka'b?", a: "We know nothing but good about him", wrong: ["He is a hypocrite", "He is lazy", "He is proud"], why: "He would not let a brother be spoken badly of." },
        { q: "Who did Ka'b see left behind in Madinah?", a: "The excused and those accused of hypocrisy", wrong: ["Only the scholars", "All the young men", "The whole army"], why: "It grieved him to see who stayed back." },
        { q: "Defending an absent brother's honor is a good deed.", tf: true, why: "Mu'adh did it, and Ka'b never forgot it." }
      ]
    },
    {
      slug: "truth",
      title: "Only the truth",
      line: "More than eighty men made up excuses. Ka'b told the truth.",
      facts: ["The Prophet ﷺ accepted their words and left their hearts to Allah.", "Ka'b said: I had no excuse.", "The Prophet ﷺ said: this man has told the truth."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Ka'b said: I knew a lie would never save me, so I decided to speak the truth. Over eighty men gave excuses with oaths. I said: by Allah, I had no excuse. The Prophet ﷺ said: as for this man, he has told the truth.", "Then I decided firmly to speak the truth"),
      difficulty: 3,
      questions: [
        { q: "About how many men gave excuses after Tabuk?", a: "Over eighty", wrong: ["Three", "Ten", "Over a thousand"], why: "Something over eighty men came with excuses." },
        { q: "What did Ka'b decide to tell the Prophet ﷺ?", a: "The plain truth", wrong: ["A clever excuse", "Nothing at all", "That he was sick"], why: "He knew a lie could never save him." },
        { q: "What did the Prophet ﷺ say about Ka'b?", a: "He has told the truth", wrong: ["He is lying", "He is excused", "He must leave Madinah"], why: "Then he told him to wait for Allah's decision." },
        { q: "Ka'b said he had a good excuse for staying behind.", tf: false, why: "He said: by Allah, I had no excuse." }
      ]
    },
    {
      slug: "three",
      title: "The three",
      line: "Ka'b was not alone: Murarah and Hilal had told the truth too.",
      facts: ["Murarah ibn ar-Rabi and Hilal ibn Umayyah were good men.", "Both had fought at Badr.", "People told Ka'b to go back and make an excuse, but he stayed firm."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "People from his tribe blamed Ka'b for not giving an excuse. He asked if anyone else was in his place. They said: Murarah ibn ar-Rabi and Hilal ibn Umayyah, two righteous men who fought at Badr.", "two pious men who had attended the Ghazwa (Battle) of Badr"),
      difficulty: 3,
      questions: [
        { q: "Who were the other two who told the truth?", a: "Murarah and Hilal", wrong: ["Abu Bakr and Umar", "Talhah and Zubayr", "Khalid and Bilal"], why: "Murarah ibn ar-Rabi and Hilal ibn Umayyah." },
        { q: "Which battle had Murarah and Hilal fought in?", a: "Badr", wrong: ["Mu'tah", "Hunayn", "Yarmuk"], why: "They were two pious men of Badr." },
        { q: "Ka'b went back and made an excuse after people blamed him.", tf: false, why: "When he heard of the other two, he stayed firm." }
      ]
    },
    {
      slug: "fifty-nights",
      title: "Fifty silent nights",
      line: "For fifty nights, no one in Madinah spoke to the three.",
      facts: ["Ka'b still prayed with the Muslims and greeted the Prophet ﷺ.", "Even Abu Qatadah, his dear cousin, did not answer him.", "Abu Qatadah only said: Allah and His Messenger know best."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "The Prophet ﷺ told the Muslims not to speak to the three. We stayed like that for fifty nights. Ka'b climbed his cousin Abu Qatadah's wall and greeted him, but he did not answer.", "We remained in that condition for fifty nights"),
      difficulty: 3,
      questions: [
        { q: "How long did people not speak to the three?", a: "Fifty nights", wrong: ["Three nights", "Seven nights", "One year"], why: "We remained in that condition for fifty nights." },
        { q: "During those nights, Ka'b kept praying with the Muslims.", tf: true, why: "He went to the prayers and greeted the Prophet ﷺ." },
        { q: "Which cousin did Ka'b visit over the wall?", a: "Abu Qatadah", wrong: ["Abu Hurairah", "Abu Dharr", "Abu Talhah"], why: "He was the dearest person to Ka'b." },
        { q: "What did Abu Qatadah finally say to him?", a: "Allah and His Messenger know best", wrong: ["Go away", "I forgive you", "Leave Madinah"], why: "Ka'b's eyes filled with tears." }
      ]
    },
    {
      slug: "kings-letter",
      title: "A letter from a king",
      line: "A king offered Ka'b a home. Ka'b burned the letter.",
      facts: ["The letter came from the king of Ghassan.", "It said: come to us, we will comfort you.", "Ka'b said: this is another test."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "A man from Sham brought Ka'b a letter from the king of Ghassan inviting him to come and be comforted. Ka'b said: this too is a test, and put it in the oven.", "This is also a sort of a test"),
      difficulty: 3,
      questions: [
        { q: "Who sent Ka'b the letter?", a: "The king of Ghassan", wrong: ["The king of Persia", "The Negus", "Abu Sufyan"], why: "He wanted Ka'b to leave the Muslims." },
        { q: "What did Ka'b do with the letter?", a: "Burned it in the oven", wrong: ["Wrote back yes", "Kept it in secret", "Showed it off"], why: "He said: this is also a test." },
        { q: "Ka'b left Madinah to join the king.", tf: false, why: "He burned the letter and stayed." }
      ]
    },
    {
      slug: "be-happy",
      title: "\"O Ka'b, be happy!\"",
      line: "On the fiftieth morning, a voice called: O Ka'b, good news!",
      facts: ["The call came from the mountain of Sala'.", "Ka'b fell into sujud to Allah.", "He gave his only clothes to the man with the good news."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "After Fajr on the fiftieth morning, a man on the mountain of Sala' called: O Ka'b ibn Malik, be happy! I fell down in prostration, knowing relief had come.", "I fell down in prostration before Allah"),
      difficulty: 3,
      questions: [
        { q: "What did Ka'b do when he heard the good news?", a: "He fell into sujud", wrong: ["He ran away", "He shouted back", "He slept"], why: "He fell down in prostration before Allah." },
        { q: "After which prayer did the good news come?", a: "Fajr", wrong: ["Dhuhr", "Asr", "Isha"], why: "On the fiftieth morning, after Fajr." },
        { q: "What did Ka'b give the man who brought the news?", a: "His clothes", wrong: ["A camel", "Gold", "His house"], why: "They were the only clothes he owned that day." }
      ]
    },
    {
      slug: "best-day",
      title: "The best day of your life",
      line: "Talhah ran to greet him, and the Prophet ﷺ smiled with joy.",
      facts: ["Talhah stood up, shook his hand and congratulated him.", "The Prophet's ﷺ face shone like a piece of the moon.", "He said the forgiveness came from Allah."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Talhah ibn Ubaydillah rushed to shake my hand. The Prophet ﷺ, his face bright with joy, said: be happy with the best day you have had since your mother gave birth to you.", "Be happy with the best day that you have got ever since your mother delivered you"),
      difficulty: 3,
      questions: [
        { q: "Which Muhajir stood up to congratulate Ka'b?", a: "Talhah", wrong: ["Umar", "Ali", "Bilal"], why: "Ka'b said he would never forget this for Talhah." },
        { q: "What did the Prophet ﷺ call that day for Ka'b?", a: "His best day since he was born", wrong: ["A sad day", "A normal day", "His last day"], why: "The best day since your mother gave birth to you." },
        { q: "Ka'b's forgiveness came from Allah.", tf: true, why: "The Prophet ﷺ said: no, it is from Allah." }
      ]
    },
    {
      slug: "allah-forgave",
      title: "Allah forgave the three",
      line: "Allah sent down: and the three who were left behind.",
      facts: ["The earth felt narrow to them, wide as it was.", "They knew there was no escape from Allah but to Him.", "Then Allah turned to them so they could repent."],
      quote: quranQuote(9, 118),
      source: quran(9, 118, "And to the three who were left behind, until the earth closed in on them despite its vastness, and they knew there was no refuge from Allah except in Him. Then He turned to them so they could repent. Allah is the Accepting of repentance, the Merciful."),
      difficulty: 4,
      questions: [
        { q: "In which surah are the three mentioned?", a: "At-Tawbah", wrong: ["Al-Baqarah", "Al-Kahf", "Yasin"], why: "Quran 9:118, in Surah At-Tawbah." },
        { q: "How did the earth feel to the three?", a: "Narrow, wide as it was", wrong: ["Very wide", "Cold", "Full of friends"], why: "The earth closed in on them despite its vastness." },
        { q: "Where did they learn the only refuge from Allah is?", a: "In Allah Himself", wrong: ["In a king", "In their tribe", "In their wealth"], why: "There was no refuge from Allah except in Him." }
      ]
    },
    {
      slug: "truth-forever",
      title: "Truthful for life",
      line: "Truth saved Ka'b, so he promised to tell only the truth.",
      facts: ["He wanted to give all his wealth away; he was told to keep some.", "Allah said: be with those who are truthful.", "Ka'b never meant to lie again."],
      source: hadith("bukhari", "4418", "Ka'b ibn Malik", "Sahih", "Ka'b said: Allah saved me for telling the truth, so part of my repentance is to speak only the truth as long as I live. Then Allah revealed: and be with those who are truthful (9:119).", "it is a part of my repentance not to tell but the truth as long as I am alive"),
      difficulty: 4,
      questions: [
        { q: "What did Ka'b promise after his repentance?", a: "To tell only the truth", wrong: ["To never travel", "To give up prayer at night", "To stay silent"], why: "As long as he was alive." },
        { q: "The Prophet ﷺ told Ka'b to keep some of his wealth.", tf: true, why: "Keep some of your wealth; it is better for you." },
        { q: "Which ayah came down with Ka'b's story?", a: "Be with those who are truthful", wrong: ["Read in the name of your Lord", "Allah is One", "By time"], why: "Quran 9:119, after the three were forgiven." },
        { q: "What saved Ka'b in the end?", a: "Telling the truth", wrong: ["A clever excuse", "His wealth", "His tribe"], why: "He said Allah saved him for telling the truth." }
      ]
    }
  ]
};

// Abu Hurairah, who came at Khaybar, stayed close to the Prophet ﷺ, and carried more of his hadith than anyone.
const ABU_HURAIRAH: DeepUnit = {
  key: "abu-hurairah",
  topicId: "sahabah",
  branchId: "sahabi-abu-hurairah",
  branch: { title: "Abu Hurairah", description: "The poor man of the Suffah who stayed close to the Prophet ﷺ and kept his words for us." },
  name: "Abu Hurairah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "khaybar",
      title: "He came at Khaybar",
      line: "Abu Hurairah reached the Prophet ﷺ at Khaybar.",
      facts: ["Khaybar had just fallen to the Muslims.", "He asked the Prophet ﷺ for a share of Khaybar.", "From then on he stayed close to the Prophet ﷺ."],
      source: hadith("bukhari", "2827", "Abu Hurairah", "Sahih", "Abu Hurairah said: I came to the Messenger of Allah ﷺ while he was at Khaybar, after it had fallen to the Muslims.", "while he was at Khaibar after it had fallen"),
      difficulty: 2,
      questions: [
        { q: "Where did Abu Hurairah reach the Prophet ﷺ?", a: "At Khaybar", wrong: ["At Badr", "In the cave of Hira", "At Taif"], why: "He came while the Prophet ﷺ was at Khaybar." },
        { q: "Was Khaybar already conquered when he came?", a: "Yes, it had just fallen", wrong: ["No, not yet", "It was never conquered", "It was years later"], why: "He came after it had fallen to the Muslims." },
        { q: "Abu Hurairah was one of the first Muslims in Makkah.", tf: false, why: "He came later, at the time of Khaybar." }
      ]
    },
    {
      slug: "his-mother",
      title: "A dua for his mother",
      line: "The Prophet ﷺ made dua, and his mother accepted Islam.",
      facts: ["Abu Hurairah came to the Prophet ﷺ crying.", "He ran home and found the door closed; she was washing.", "He came back crying again, this time from joy."],
      source: hadith("muslim", "2491", "Abu Hurairah", "Sahih", "Abu Hurairah said: I invited my mother to Islam and she refused. The Prophet ﷺ prayed: O Allah, guide the mother of Abu Hurairah. When I got home she bore witness that there is no god but Allah and that Muhammad is His slave and Messenger.", "O Allah, set the mother of Abu Huraira on the right path"),
      difficulty: 2,
      questions: [
        { q: "What did Abu Hurairah ask the Prophet ﷺ?", a: "To make dua for his mother", wrong: ["To give him money", "To let him travel", "To teach him poetry"], why: "His mother had refused Islam." },
        { q: "What happened when he got home?", a: "His mother became Muslim", wrong: ["She was not there", "She was angry", "She left Madinah"], why: "She said the Shahadah at the door." },
        { q: "Abu Hurairah cried a second time, from joy.", tf: true, why: "He shed tears of joy at Allah's answer." },
        { q: "What does this teach about our parents?", a: "Keep making dua for them", wrong: ["Give up on them", "Leave them alone", "Argue with them"], why: "Abu Hurairah asked for dua, and Allah answered." }
      ]
    },
    {
      slug: "loved",
      title: "Loved by the believers",
      line: "A dua that the believers love him and his mother.",
      facts: ["Abu Hurairah asked for this dua himself.", "He said: every believer who hears of me loves me.", "Loving the believers is part of faith."],
      source: hadith("muslim", "2491", "Abu Hurairah", "Sahih", "The Prophet ﷺ prayed: O Allah, make these servants of Yours, Abu Hurairah and his mother, loved by the believers, and make the believers loved by them.", "let there be love of these servants of yours"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ pray for Abu Hurairah and his mother?", a: "That the believers love them", wrong: ["That they become rich", "That they live long", "That they become kings"], why: "And that they love the believers too." },
        { q: "Who asked for this dua?", a: "Abu Hurairah", wrong: ["His mother", "Umar", "Aishah"], why: "He asked right after his mother became Muslim." },
        { q: "Abu Hurairah said believers who hear of him love him.", tf: true, why: "He said the dua was answered that well." }
      ]
    },
    {
      slug: "hunger",
      title: "A stone for hunger",
      line: "Abu Hurairah was so hungry he tied a stone over his stomach.",
      facts: ["He waited by the road, hoping someone would feed him.", "He asked Abu Bakr and Umar about an ayah; they walked on.", "The Prophet ﷺ smiled: he knew what was in his heart."],
      source: hadith("bukhari", "6452", "Abu Hurairah", "Sahih", "Abu Hurairah said: I used to tie a stone over my belly from hunger. One day I sat by the road. The Prophet ﷺ passed, smiled when he saw me, for he knew what was in my heart and on my face, and said: follow me.", "he smiled when he saw me"),
      difficulty: 2,
      questions: [
        { q: "What did Abu Hurairah tie over his stomach?", a: "A stone", wrong: ["A rope", "A cloth of gold", "A leather bag"], why: "Because of hunger." },
        { q: "What did the Prophet ﷺ do when he saw him?", a: "He smiled and said: follow me", wrong: ["He walked past", "He scolded him", "He sent him away"], why: "He knew what was on his face and in his heart." },
        { q: "Who walked past before the Prophet ﷺ came?", a: "Abu Bakr and Umar", wrong: ["Uthman and Ali", "Khalid and Bilal", "No one"], why: "He asked them about an ayah, hoping they would feed him." }
      ]
    },
    {
      slug: "milk-bowl",
      title: "One bowl of milk",
      line: "One bowl of milk filled all the people of the Suffah.",
      facts: ["The Suffah were poor guests of Islam with no family or money.", "Abu Hurairah served them one by one.", "Then he drank until full, and the Prophet ﷺ drank last."],
      source: hadith("bukhari", "6452", "Abu Hurairah", "Sahih", "The Prophet ﷺ told me to call the people of the Suffah. I gave the one bowl to each man until all had drunk their fill. He said: there remain you and I. Drink. I drank until I had no room, and he drank what was left.", "There remain you and I"),
      difficulty: 3,
      questions: [
        { q: "Who were the people of the Suffah?", a: "Poor guests of Islam", wrong: ["Rich traders", "Soldiers of Rome", "The Prophet's ﷺ family"], why: "They had no family, no money and no one to rely on." },
        { q: "How many bowls of milk were there?", a: "One", wrong: ["Ten", "One for each man", "Seventy"], why: "One bowl filled them all, by Allah's blessing." },
        { q: "Who drank last?", a: "The Prophet ﷺ", wrong: ["Abu Hurairah", "Abu Bakr", "The youngest man"], why: "He drank what remained, after everyone." },
        { q: "Abu Hurairah drank before the people of the Suffah.", tf: false, why: "He served them all first." }
      ]
    },
    {
      slug: "never-forgot",
      title: "He never forgot",
      line: "Abu Hurairah spread his cloak, and after that he never forgot.",
      facts: ["He told the Prophet ﷺ: I hear many hadith and forget them.", "The Prophet ﷺ moved his hands as if filling the cloak.", "Abu Hurairah wrapped it to himself."],
      source: hadith("bukhari", "119", "Abu Hurairah", "Sahih", "I said: I hear many things from you but I forget them. He said: spread your cloak. I spread it, he moved his hands as if filling it, and said: wrap it around you. After that I never forgot anything.", "after that I never forgot any thing"),
      difficulty: 3,
      questions: [
        { q: "What was Abu Hurairah's problem?", a: "He forgot the hadith he heard", wrong: ["He could not read", "He had no clothes", "He lived too far"], why: "He told the Prophet ﷺ he forgot them." },
        { q: "What did the Prophet ﷺ tell him to spread?", a: "His cloak", wrong: ["His hands", "A prayer mat", "A scroll"], why: "Then he told him to wrap it around himself." },
        { q: "After that day, Abu Hurairah never forgot anything.", tf: true, why: "After that I never forgot any thing." }
      ]
    },
    {
      slug: "why-so-many",
      title: "Why so many hadith?",
      line: "Others traded and farmed; he stayed by the Prophet ﷺ.",
      facts: ["The Muhajirun were busy in the markets.", "The Ansar were busy with their farms.", "He was happy with just enough food to fill his stomach."],
      source: hadith("bukhari", "118", "Abu Hurairah", "Sahih", "People say Abu Hurairah narrates a lot. Were it not for two ayahs (2:159-160) I would not narrate a single hadith. My brothers were busy in the markets and the farms, while I stayed with the Prophet ﷺ, content with what filled my stomach.", "contented with what will fill my stomach"),
      difficulty: 3,
      questions: [
        { q: "Why do we have so many hadith from Abu Hurairah?", a: "He stayed close to the Prophet ﷺ", wrong: ["He wrote books", "He lived in Makkah", "He was a king"], why: "He was there when others were busy." },
        { q: "What kept the Ansar busy?", a: "Their farms", wrong: ["The market", "Travel", "Poetry"], why: "And the Muhajirun were busy trading." },
        { q: "Ayahs of the Quran warn against hiding knowledge.", tf: true, why: "Abu Hurairah said those ayahs (2:159-160) made him narrate." }
      ]
    },
    {
      slug: "eager",
      title: "The keen student",
      line: "He asked who is luckiest with the intercession.",
      facts: ["The Prophet ﷺ knew he would be the first to ask.", "It was because of his love for hadith.", "The answer: whoever says la ilaha illallah sincerely from the heart."],
      source: hadith("bukhari", "99", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: O Abu Hurairah, I thought no one would ask me this before you, as I know your eagerness for hadith. The luckiest with my intercession is whoever says la ilaha illallah sincerely from his heart.", "I have thought that none will ask me about it before you"),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ expect Abu Hurairah to ask first?", a: "His love for hadith", wrong: ["He was the oldest", "He was his cousin", "He asked every day"], why: "I know your eagerness for hadith." },
        { q: "Who is luckiest with the Prophet's ﷺ intercession?", a: "Whoever says la ilaha illallah sincerely", wrong: ["Whoever is richest", "Whoever lives longest", "Whoever is from Makkah"], why: "Sincerely, from the bottom of the heart." },
        { q: "Asking good questions is part of seeking knowledge.", tf: true, why: "The Prophet ﷺ praised his eagerness." }
      ]
    },
    {
      slug: "three-things",
      title: "Three things for life",
      line: "Three deeds the Prophet ﷺ taught him, kept for life.",
      facts: ["Fast three days every month.", "Pray the Duha prayer.", "Pray witr before sleeping."],
      source: hadith("bukhari", "1178", "Abu Hurairah", "Sahih", "My friend ﷺ advised me to do three things, and I will not leave them until I die: fasting three days every month, the Duha prayer, and witr before sleeping.", "To fast three days every month"),
      difficulty: 2,
      questions: [
        { q: "How many days a month did he fast on this advice?", a: "Three", wrong: ["One", "Ten", "Fifteen"], why: "Fast three days every month." },
        { q: "Which prayer did he pray in the late morning?", a: "Duha", wrong: ["Tahajjud", "Eid", "Janazah"], why: "The Duha prayer was one of the three." },
        { q: "When did he pray witr?", a: "Before sleeping", wrong: ["After Fajr", "Only in Ramadan", "At noon"], why: "Witr before sleeping." },
        { q: "Abu Hurairah stopped these deeds when he grew old.", tf: false, why: "He said he would not leave them until he died." }
      ]
    }
  ]
};

// Ja'far ibn Abi Talib, the Prophet's ﷺ cousin: the Muslims' leader in Abyssinia, the father of the poor, and a
// leader at Mu'tah.
const JAFAR: DeepUnit = {
  key: "jafar",
  topicId: "sahabah",
  branchId: "sahabi-jafar-ibn-abi-talib",
  branch: { title: "Ja'far ibn Abi Talib", description: "The Prophet's ﷺ cousin who led the Muslims in Abyssinia and fell at Mu'tah." },
  name: "Ja'far ibn Abi Talib",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "abyssinia",
      title: "Far away in Abyssinia",
      line: "Ja'far led the Muslims who lived with the Negus in Abyssinia.",
      facts: ["The Prophet ﷺ had told them to stay there.", "Abu Musa's people came by ship from Yemen and found him.", "Ja'far told them: stay with us."],
      source: hadith("bukhari", "3136", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa said: our ship took us to the Negus in Abyssinia, and there we found Ja'far and his companions. Ja'far said: the Messenger of Allah ﷺ sent us here and told us to stay, so stay with us.", "has sent us here and ordered us to stay here"),
      difficulty: 2,
      questions: [
        { q: "Where did Ja'far live for years?", a: "Abyssinia", wrong: ["Persia", "Rome", "Yemen"], why: "With the Negus, the just king." },
        { q: "Who told Ja'far to stay in Abyssinia?", a: "The Prophet ﷺ", wrong: ["The Negus", "Abu Sufyan", "His father"], why: "He said: the Messenger of Allah ﷺ sent us here." },
        { q: "How did Abu Musa's people reach Abyssinia?", a: "By ship", wrong: ["On horses", "On foot", "By camel caravan"], why: "Their ship took them to the Negus." }
      ]
    },
    {
      slug: "khaybar",
      title: "Home at Khaybar",
      line: "Ja'far came back just as Khaybar was won, and got a share.",
      facts: ["The people of the ship came with him.", "They had not fought at Khaybar.", "The Prophet ﷺ still gave them a share."],
      source: hadith("bukhari", "3136", "Abu Musa al-Ash'ari", "Sahih", "We stayed until we all left and met the Prophet ﷺ when he had conquered Khaybar. He gave shares only to those who fought, except the people of our ship, with Ja'far and his companions.", "except the people of our ship"),
      difficulty: 3,
      questions: [
        { q: "When did Ja'far return to the Prophet ﷺ?", a: "When Khaybar was conquered", wrong: ["Before Badr", "At the Hijrah", "After the Prophet ﷺ died"], why: "They met him at the conquest of Khaybar." },
        { q: "Ja'far's group got a share of Khaybar though they did not fight.", tf: true, why: "The people of the ship were the only exception." },
        { q: "Who came back with Ja'far?", a: "The people of the ship", wrong: ["The army of Rome", "The Quraysh", "The people of Taif"], why: "Abu Musa and his people came with him." }
      ]
    },
    {
      slug: "like-me",
      title: "\"You look like me\"",
      line: "The Prophet ﷺ told Ja'far: you resemble me in looks and manners.",
      facts: ["Ali, Ja'far and Zayd each wanted to care for Hamzah's daughter.", "She went to her aunt, Ja'far's wife.", "The Prophet ﷺ said: the aunt is like the mother."],
      source: hadith("bukhari", "4251", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ gave Hamzah's daughter to her aunt, saying: the aunt is like the mother. He said to Ali: you are from me and I am from you; to Ja'far: you resemble me in appearance and character; and to Zayd: you are our brother.", "You resemble me in appearance and character"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ tell Ja'far?", a: "You resemble me in looks and manners", wrong: ["You are the bravest", "You are the richest", "You are the oldest"], why: "In appearance and character." },
        { q: "Who got to care for Hamzah's daughter?", a: "Her aunt, Ja'far's wife", wrong: ["Ali", "Zayd", "Abu Bakr"], why: "The aunt is like the mother." },
        { q: "The Prophet ﷺ spoke kindly to all three cousins.", tf: true, why: "Each one heard a sweet word from him." }
      ]
    },
    {
      slug: "the-poor",
      title: "Best to the poor",
      line: "Ja'far was the most generous of all people to the poor.",
      facts: ["He took the poor to his home.", "He gave them whatever he had.", "Once he even split a butter skin so they could lick it."],
      source: hadith("bukhari", "3708", "Abu Hurairah", "Sahih", "Abu Hurairah said: the most generous of people to the poor was Ja'far ibn Abi Talib. He took us to his home and fed us what he had, even an empty butter skin, which we split open and licked.", "the most generous of all the people to the poor"),
      difficulty: 3,
      questions: [
        { q: "Who was the most generous to the poor, said Abu Hurairah?", a: "Ja'far", wrong: ["Abu Sufyan", "Abu Jahl", "No one"], why: "He took the poor to his home." },
        { q: "What did Ja'far split open for the poor?", a: "An empty butter skin", wrong: ["A watermelon", "A bag of gold", "A loaf of bread"], why: "So they could lick what was left inside." },
        { q: "Ja'far gave even when he had very little.", tf: true, why: "He offered whatever was in his home." }
      ]
    },
    {
      slug: "mutah",
      title: "Second to carry the flag",
      line: "At Mu'tah, the Prophet ﷺ named Ja'far to lead after Zayd.",
      facts: ["Zayd ibn Harithah led first.", "Then Ja'far, then Abdullah ibn Rawahah.", "All three were martyred carrying the flag."],
      source: hadith("bukhari", "4262", "Anas ibn Malik", "Sahih", "The Prophet ﷺ told the people of the deaths of Zayd, Ja'far and Ibn Rawahah before the news arrived, his eyes full of tears. Then a sword of Allah took the flag and Allah gave victory.", "had informed the people of the martyrdom of Zaid"),
      difficulty: 3,
      questions: [
        { q: "Who led the army at Mu'tah first?", a: "Zayd ibn Harithah", wrong: ["Ja'far", "Khalid", "Umar"], why: "Then Ja'far, then Ibn Rawahah." },
        { q: "How did the people of Madinah first hear the news?", a: "The Prophet ﷺ told them", wrong: ["A letter came", "A traveler", "They saw it"], why: "He told them before the news arrived." },
        { q: "The Prophet ﷺ cried when he told of their deaths.", tf: true, why: "His eyes were shedding tears." }
      ]
    },
    {
      slug: "wounds",
      title: "No wound in his back",
      line: "Ja'far had fifty wounds, and not one was in his back.",
      facts: ["Ibn Umar stood by him and counted them.", "Every wound was in front.", "He never turned his back to run."],
      source: hadith("bukhari", "4260", "Abdullah ibn Umar", "Sahih", "Ibn Umar said that on the day of Mu'tah he stood beside Ja'far, who had been killed, and counted fifty wounds from stabs and blows, and none of them was in his back.", "none of those wounds was in his back"),
      difficulty: 4,
      questions: [
        { q: "How many wounds did Ibn Umar count on Ja'far?", a: "Fifty", wrong: ["Two", "Ten", "Five hundred"], why: "Fifty wounds, from stabs and blows." },
        { q: "Where were none of his wounds?", a: "In his back", wrong: ["In his chest", "In his arms", "On his face"], why: "He faced the enemy and never ran." },
        { q: "Who counted the wounds?", a: "Ibn Umar", wrong: ["Abu Hurairah", "Khalid", "Anas"], why: "He stood beside Ja'far that day." }
      ]
    },
    {
      slug: "two-wings",
      title: "The one with two wings",
      line: "Ibn Umar called Ja'far's son: son of the two-winged one.",
      facts: ["Ja'far is known as Dhul-Janahayn: the one with two wings.", "Ibn Umar said this every time he greeted Ja'far's son.", "It honors Ja'far, who gave his life at Mu'tah."],
      source: hadith("bukhari", "3709", "Ash-Sha'bi", "Sahih", "Whenever Ibn Umar greeted the son of Ja'far, he said: peace be upon you, O son of the one with two wings.", "O son of Dhu-l-Janahain"),
      difficulty: 4,
      questions: [
        { q: "What was Ja'far called?", a: "The one with two wings", wrong: ["The sword of Allah", "The truthful one", "The lion of Allah"], why: "Dhul-Janahayn, the one with two wings." },
        { q: "Whom did Ibn Umar greet this way?", a: "Ja'far's son", wrong: ["Ja'far himself", "Khalid", "The Negus"], why: "Peace on you, son of the two-winged one." },
        { q: "Ibn Umar greeted him this way only once.", tf: false, why: "He said it whenever he greeted him." }
      ]
    }
  ]
};

// Sa'd ibn Mu'adh, chief of the Aws in Madinah: brave in Makkah, wounded at the Trench, and honored at his death.
const SAD_MUADH: DeepUnit = {
  key: "sad-muadh",
  topicId: "sahabah",
  branchId: "sahabi-sad-ibn-muadh",
  branch: { title: "Sa'd ibn Mu'adh", description: "The chief of the Ansar whose death shook the Throne of the Most Merciful." },
  name: "Sa'd ibn Mu'adh",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "umrah",
      title: "Brave at the Kaaba",
      line: "In Makkah, Sa'd stood up to Abu Jahl at the Kaaba.",
      facts: ["Sa'd came to Makkah for Umrah.", "Abu Jahl tried to stop his tawaf.", "Sa'd said: stop me, and I will block your trade road to Sham."],
      source: hadith("bukhari", "3632", "Abdullah ibn Mas'ud", "Sahih", "Sa'd ibn Mu'adh came to Makkah for Umrah. While he made tawaf, Abu Jahl said: you go around the Kaaba safely though you sheltered Muhammad? Sa'd said: if you stop me, I will spoil your trade with Sham.", "I will spoil your trade with Sham"),
      difficulty: 2,
      questions: [
        { q: "Why did Sa'd go to Makkah?", a: "To do Umrah", wrong: ["To trade", "To fight", "To visit family"], why: "He came to make tawaf around the Kaaba." },
        { q: "Who tried to stop Sa'd's tawaf?", a: "Abu Jahl", wrong: ["Abu Sufyan", "Abu Talib", "Abu Lahab"], why: "He was angry that Madinah sheltered the Muslims." },
        { q: "What did Sa'd say he would block?", a: "Their trade road to Sham", wrong: ["Their well of Zamzam", "Their markets in Yemen", "Their Kaaba"], why: "I will spoil your trade with Sham." },
        { q: "Sa'd was afraid and left without tawaf.", tf: false, why: "He stood firm against Abu Jahl." }
      ]
    },
    {
      slug: "wound",
      title: "A tent in the mosque",
      line: "At the Trench, an arrow struck Sa'd's arm.",
      facts: ["The arrow cut the big vein of his arm.", "The Prophet ﷺ put up a tent for him in the mosque.", "So he could be near and visit him often."],
      source: hadith("bukhari", "4122", "Aishah", "Sahih", "Sa'd was wounded on the day of the Trench by an arrow in the vein of his arm. The Prophet ﷺ pitched a tent for him in the mosque so that he could visit him from near.", "so that he might be near to the Prophet"),
      difficulty: 2,
      questions: [
        { q: "In which battle was Sa'd wounded?", a: "The Trench", wrong: ["Badr", "Hunayn", "Tabuk"], why: "On the day of Al-Khandaq, the Trench." },
        { q: "Where did the Prophet ﷺ put a tent for Sa'd?", a: "In the mosque", wrong: ["In the desert", "On a mountain", "In Makkah"], why: "So he could be near and visit him." },
        { q: "What hit Sa'd's arm?", a: "An arrow", wrong: ["A sword", "A stone", "A spear"], why: "An arrow cut the vein of his arm." }
      ]
    },
    {
      slug: "dua",
      title: "Sa'd's dua",
      line: "Sa'd asked Allah: keep me alive only if more fighting is left.",
      facts: ["He loved striving for Allah more than anything.", "He asked: if the war is over, let this wound be my end.", "His wound bled again, and he passed away."],
      source: hadith("bukhari", "4122", "Aishah", "Sahih", "Sa'd prayed: O Allah, nothing is more beloved to me than to strive in Your cause against those who denied Your Messenger. If any fight with them remains, keep me alive for it; if You have ended it, let this wound open. It bled, and he died.", "keep me alive till I fight against them for Your Sake"),
      difficulty: 3,
      questions: [
        { q: "What did Sa'd love most?", a: "Striving in Allah's cause", wrong: ["His wealth", "His farms", "Being chief"], why: "Nothing was more beloved to him." },
        { q: "What did Sa'd ask, if the war was over?", a: "That his wound be his end", wrong: ["To become rich", "To travel to Sham", "To be made king"], why: "Let this wound burst, he prayed." },
        { q: "Sa'd's dua was answered.", tf: true, why: "His wound bled, and he died in his tent." }
      ]
    },
    {
      slug: "your-chief",
      title: "\"Stand for your chief\"",
      line: "The Prophet ﷺ told the Ansar: stand up for your chief.",
      facts: ["Sa'd came riding a donkey, still wounded.", "A tribe had agreed to accept his judgment.", "The Prophet ﷺ said: you judged with Allah's judgment."],
      source: hadith("bukhari", "4121", "Abu Sa'id al-Khudri", "Sahih", "When Sa'd came riding a donkey and neared the mosque, the Prophet ﷺ said to the Ansar: get up for your chief, or the best among you. After Sa'd judged, he said: you have judged with Allah's judgment.", "Get up for your chief"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ tell the Ansar when Sa'd came?", a: "Stand up for your chief", wrong: ["Sit down", "Go home", "Bring your swords"], why: "Get up for your chief, or the best among you." },
        { q: "What was Sa'd riding?", a: "A donkey", wrong: ["A horse", "A camel", "Nothing; he walked"], why: "He was still wounded from the Trench." },
        { q: "The Prophet ﷺ said Sa'd judged with Allah's judgment.", tf: true, why: "You have judged according to Allah's judgment." }
      ]
    },
    {
      slug: "throne",
      title: "The Throne shook",
      line: "When Sa'd died, the Throne of the Most Merciful shook.",
      facts: ["The Prophet ﷺ said this himself.", "Jabir heard him say it.", "It shows how great Sa'd was with Allah."],
      source: hadith("bukhari", "3803", "Jabir ibn Abdullah", "Sahih", "I heard the Prophet ﷺ say: the Throne of the Most Merciful shook at the death of Sa'd ibn Mu'adh.", "The Throne of the Beneficent shook"),
      difficulty: 3,
      questions: [
        { q: "What shook when Sa'd ibn Mu'adh died?", a: "The Throne of the Most Merciful", wrong: ["The Kaaba", "Mount Uhud", "The mosque"], why: "The Prophet ﷺ said the Throne shook." },
        { q: "Who heard the Prophet ﷺ say this?", a: "Jabir ibn Abdullah", wrong: ["Abu Jahl", "Ka'b ibn Malik", "Abu Musa"], why: "Jabir narrated it in Bukhari 3803." },
        { q: "This shows Sa'd's high place with Allah.", tf: true, why: "Such honor was told of very few." }
      ]
    },
    {
      slug: "handkerchiefs",
      title: "Softer than silk",
      line: "Sa'd's handkerchiefs in Paradise are softer than silk.",
      facts: ["Someone gave the Prophet ﷺ a silk cloth.", "The companions touched it and loved its softness.", "He said Sa'd's handkerchiefs in Paradise are better."],
      source: hadith("bukhari", "3802", "Al-Bara ibn Azib", "Sahih", "A silk cloth was given to the Prophet ﷺ and his companions admired its softness. He said: you admire its softness? The handkerchiefs of Sa'd ibn Mu'adh in Paradise are better and softer.", "are better and softer than it"),
      difficulty: 3,
      questions: [
        { q: "What did the companions admire?", a: "A soft silk cloth", wrong: ["A golden sword", "A fast horse", "A big house"], why: "They touched it and loved its softness." },
        { q: "What of Sa'd's is better in Paradise?", a: "His handkerchiefs", wrong: ["His sword", "His house", "His camel"], why: "Even his handkerchiefs there are better and softer." },
        { q: "The best things of this world are small next to Paradise.", tf: true, why: "Even a handkerchief there beats fine silk here." }
      ]
    }
  ]
};

// Abdur-Rahman ibn Awf: an early Muslim from Makkah who started again with nothing in Madinah, grew rich, and
// stayed humble.
const ABDUR_RAHMAN: DeepUnit = {
  key: "abdur-rahman",
  topicId: "sahabah",
  branchId: "sahabi-abdur-rahman-ibn-awf",
  branch: { title: "Abdur-Rahman ibn Awf", description: "The Muhajir who asked only for the market, grew rich, and wept that he might have his reward in this world." },
  name: "Abdur-Rahman ibn Awf",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "brother",
      title: "A brother in Madinah",
      line: "In Madinah, the Prophet ﷺ made Sa'd ibn ar-Rabi his brother.",
      facts: ["Sa'd ibn ar-Rabi was a rich man of the Ansar.", "He offered Abdur-Rahman half of all he owned.", "This was the brotherhood of the Muhajirun and the Ansar."],
      source: hadith("bukhari", "3781", "Anas ibn Malik", "Sahih", "When Abdur-Rahman ibn Awf came to us, the Prophet ﷺ made him a brother of Sa'd ibn ar-Rabi, a rich man, who said: I will divide my property into two halves between me and you.", "I will divide my property into two parts between me and you"),
      difficulty: 2,
      questions: [
        { q: "Who became Abdur-Rahman's brother in Madinah?", a: "Sa'd ibn ar-Rabi", wrong: ["Sa'd ibn Mu'adh", "Abu Bakr", "Bilal"], why: "The Prophet ﷺ joined them as brothers." },
        { q: "What did Sa'd ibn ar-Rabi offer him?", a: "Half of his property", wrong: ["A horse", "Nothing", "A job"], why: "I will divide my property between me and you." },
        { q: "Sa'd ibn ar-Rabi was from the Ansar.", tf: true, why: "He was a rich man of the Ansar of Madinah." }
      ]
    },
    {
      slug: "market",
      title: "\"Show me the market\"",
      line: "Abdur-Rahman said: Allah bless your wealth. Show me the market.",
      facts: ["He did not take his brother's wealth.", "He traded and came back with butter and dried yogurt.", "He earned his own living from his first day."],
      source: hadith("bukhari", "2049", "Anas ibn Malik", "Sahih", "Abdur-Rahman said: may Allah bless you in your family and your property. Show me the market. He did not come back until he had earned some dried yogurt and butter.", "Show me the market"),
      difficulty: 2,
      questions: [
        { q: "What did Abdur-Rahman ask his new brother for?", a: "The way to the market", wrong: ["Half his money", "A house", "A camel"], why: "He said: show me the market." },
        { q: "What did he bring home from the market?", a: "Dried yogurt and butter", wrong: ["Gold coins", "A sheep", "Silk"], why: "His first profit from trading." },
        { q: "Abdur-Rahman took half of Sa'd's wealth.", tf: false, why: "He made dua for him and went to trade instead." }
      ]
    },
    {
      slug: "wedding",
      title: "Even with one sheep",
      line: "At his wedding: hold a walimah, even with one sheep.",
      facts: ["He married a woman of the Ansar.", "Her mahr was gold the weight of a date stone.", "The Prophet ﷺ made dua for barakah for him."],
      source: hadith("bukhari", "5155", "Anas ibn Malik", "Sahih", "The Prophet ﷺ saw traces of yellow scent on Abdur-Rahman and asked about it. He said: I married a woman for gold the weight of a date stone. He said: may Allah bless you. Offer a wedding feast, even with one sheep.", "Offer a wedding banquet even with one sheep"),
      difficulty: 3,
      questions: [
        { q: "How did the Prophet ﷺ know he had married?", a: "He saw yellow scent on him", wrong: ["Someone wrote a letter", "He heard drums", "Abdur-Rahman shouted it"], why: "He saw the traces of yellow perfume." },
        { q: "What mahr did Abdur-Rahman give?", a: "Gold the weight of a date stone", wrong: ["A hundred camels", "A house", "Nothing"], why: "Gold equal to the weight of a date stone." },
        { q: "What did the Prophet ﷺ tell him to do?", a: "Give a walimah, even with one sheep", wrong: ["Keep it secret", "Leave Madinah", "Give away his gold"], why: "A wedding feast, even with one sheep." }
      ]
    },
    {
      slug: "badr",
      title: "Two boys at Badr",
      line: "At Badr, two Ansari boys asked him: where is Abu Jahl?",
      facts: ["Abu Jahl insulted the Prophet ﷺ.", "Abdur-Rahman pointed him out.", "The two boys were both named Mu'adh."],
      source: hadith("bukhari", "3141", "Abdur-Rahman ibn Awf", "Sahih", "At Badr I saw two young Ansari boys beside me. Each asked: uncle, do you know Abu Jahl? I heard he insults the Messenger of Allah ﷺ. When I pointed him out, they both went for him.", "saw two young Ansari boys"),
      difficulty: 3,
      questions: [
        { q: "Who asked Abdur-Rahman about Abu Jahl at Badr?", a: "Two young Ansari boys", wrong: ["Two old men", "Two Makkan leaders", "Two women"], why: "Each one asked him on his own." },
        { q: "Why did the boys look for Abu Jahl?", a: "He insulted the Prophet ﷺ", wrong: ["He owed them money", "He was their uncle", "He was lost"], why: "They heard he abused the Messenger of Allah ﷺ." },
        { q: "What was the name of both boys?", a: "Mu'adh", wrong: ["Ali", "Zayd", "Anas"], why: "Mu'adh ibn Afra and Mu'adh ibn Amr ibn al-Jamuh." }
      ]
    },
    {
      slug: "tears",
      title: "Tears at iftar",
      line: "Rich and fasting, he wept remembering Mus'ab and Hamzah.",
      facts: ["Mus'ab had only one sheet to be shrouded in.", "He said Hamzah was better than him too.", "He feared getting his reward in this world."],
      source: hadith("bukhari", "1275", "Ibrahim", "Sahih", "Food was brought to Abdur-Rahman ibn Awf while he was fasting. He said: Mus'ab was better than me and was shrouded in one sheet; Hamzah was better than me. Now the world has been opened for us. I fear our rewards were given early in this world. Then he wept and left the food.", "I fear that the rewards of my deeds might have been given earlier in this world"),
      difficulty: 4,
      questions: [
        { q: "Whom did Abdur-Rahman remember at his meal?", a: "Mus'ab and Hamzah", wrong: ["Abu Jahl and Abu Lahab", "Khalid and Amr", "His children"], why: "Both were better than him, he said." },
        { q: "What was Mus'ab shrouded in?", a: "A single sheet", wrong: ["Fine silk", "Three white cloths", "His armor"], why: "Cover his head and his feet showed." },
        { q: "What did Abdur-Rahman fear?", a: "Getting his reward in this world", wrong: ["Losing his money", "Being hungry", "Going on a journey"], why: "So he wept and left the food." },
        { q: "Wealth made Abdur-Rahman proud and careless.", tf: false, why: "He wept, afraid of being rewarded only in this life." }
      ]
    },
    {
      slug: "shura",
      title: "Choosing the next caliph",
      line: "Abdur-Rahman stepped aside so he could help choose the caliph.",
      facts: ["Umar named a small group to choose among themselves.", "Abdur-Rahman barely slept for three nights, asking people.", "Then the people pledged to Uthman."],
      source: hadith("bukhari", "7207", "Al-Miswar ibn Makhramah", "Sahih", "Abdur-Rahman told the group Umar had named: I will not compete with you for this, but if you wish I will choose for you one of you. He consulted the people for three nights, and then they gave the pledge to Uthman.", "I am not going to compete with you in this matter"),
      difficulty: 4,
      questions: [
        { q: "What did Abdur-Rahman do for the caliphate?", a: "Stepped aside to help choose", wrong: ["Took it by force", "Left Madinah", "Refused to help"], why: "I am not going to compete with you in this matter." },
        { q: "How long did he consult the people?", a: "Three nights", wrong: ["One hour", "A month", "A year"], why: "He hardly slept for three nights." },
        { q: "Who became caliph after Umar?", a: "Uthman", wrong: ["Ali", "Abdur-Rahman", "Talhah"], why: "The people gave the pledge to Uthman." }
      ]
    }
  ]
};

// Mu'adh ibn Jabal: a young man of the Ansar who knew halal and haram best, and was sent to teach Yemen.
const MUADH: DeepUnit = {
  key: "muadh",
  topicId: "sahabah",
  branchId: "sahabi-muadh-ibn-jabal",
  branch: { title: "Mu'adh ibn Jabal", description: "The young scholar of the Ansar the Prophet ﷺ loved and sent to teach Yemen." },
  name: "Mu'adh ibn Jabal",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "four-teachers",
      title: "Learn the Quran from four",
      line: "One of four people to learn the Quran from.",
      facts: ["The four: Ibn Mas'ud, Salim, Ubayy ibn Ka'b and Mu'adh.", "They recited the Quran very well.", "Abdullah ibn Amr heard the Prophet ﷺ say this."],
      source: hadith("bukhari", "3758", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: learn the recitation of the Quran from four: Abdullah ibn Mas'ud, Salim the freed slave of Abu Hudhayfah, Ubayy ibn Ka'b and Mu'adh ibn Jabal.", "four persons"),
      difficulty: 2,
      questions: [
        { q: "How many people did the Prophet ﷺ name to learn the Quran from?", a: "Four", wrong: ["Two", "Ten", "Seventy"], why: "Learn the Quran from four people." },
        { q: "Who was NOT one of the four?", a: "Abu Hurairah", wrong: ["Ibn Mas'ud", "Ubayy ibn Ka'b", "Salim"], why: "The four were Ibn Mas'ud, Salim, Ubayy and Mu'adh." },
        { q: "The Prophet ﷺ trusted Mu'adh to teach the Quran.", tf: true, why: "He named him among the four." }
      ]
    },
    {
      slug: "riding-behind",
      title: "Riding behind the Prophet ﷺ",
      line: "Riding behind him, Mu'adh learned Allah's right on us.",
      facts: ["The Prophet ﷺ called his name three times.", "Allah's right: worship Him alone.", "Their right on Him: He will not punish those who do so."],
      source: hadith("bukhari", "6500", "Mu'adh ibn Jabal", "Sahih", "I was riding behind the Prophet ﷺ with only the back of the saddle between us. He said: O Mu'adh, do you know Allah's right over His servants? To worship Him and join nothing with Him. And their right on Allah is that He does not punish them.", "there was nothing between me and him except the back of the saddle"),
      difficulty: 2,
      questions: [
        { q: "What is Allah's right over His servants?", a: "To worship Him alone", wrong: ["To pay taxes", "To travel", "To build houses"], why: "Worship Him and join nothing with Him." },
        { q: "Where was Mu'adh when he learned this?", a: "Riding behind the Prophet ﷺ", wrong: ["In the market", "At Badr", "In Yemen"], why: "Only the back of the saddle was between them." },
        { q: "The Prophet ﷺ called Mu'adh only once.", tf: false, why: "He called him again and again, to make him listen well." }
      ]
    },
    {
      slug: "i-love-you",
      title: "\"I love you, Mu'adh\"",
      line: "The Prophet ﷺ held his hand: by Allah, I love you, Mu'adh.",
      facts: ["Then he taught him a dua for after every prayer.", "O Allah, help me remember You, thank You, and worship You well.", "Mu'adh passed it on to his students."],
      source: hadith("abudawud", "1522", "Mu'adh ibn Jabal", "Sahih", "The Prophet ﷺ took Mu'adh's hand and said: by Allah, I love you, Mu'adh. Never leave saying after every prayer: O Allah, help me to remember You, to thank You and to worship You well.", "By Allah, I love you"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ tell Mu'adh as he held his hand?", a: "By Allah, I love you", wrong: ["Go to Yemen now", "You are late", "Pray more"], why: "Then he gave him advice." },
        { q: "When should this dua be said?", a: "After every prayer", wrong: ["Only on Friday", "Only in Ramadan", "Before eating"], why: "Never leave it after every prayer." },
        { q: "What do we ask Allah's help for in this dua?", a: "Remembering, thanking and worshipping Him well", wrong: ["Getting rich fast", "Winning arguments", "Becoming famous"], why: "Help me to remember You, thank You and worship You well." }
      ]
    },
    {
      slug: "halal-haram",
      title: "Knows halal and haram best",
      line: "Mu'adh knew best of all the ummah what is halal and haram.",
      facts: ["The Prophet ﷺ praised several companions for one gift each.", "Abu Bakr was the most merciful.", "Mu'adh knew best the lawful and the unlawful."],
      source: hadith("tirmidhi", "3790", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: the most merciful of my ummah is Abu Bakr... the most knowledgeable of the lawful and unlawful is Mu'adh ibn Jabal... and the trustworthy one of this ummah is Abu Ubaydah.", "concerning the lawful and unlawful"),
      difficulty: 3,
      questions: [
        { q: "What did Mu'adh know best of all?", a: "What is halal and haram", wrong: ["Poetry", "Trade", "Horse riding"], why: "The most knowledgeable of the lawful and unlawful." },
        { q: "Whom did the Prophet ﷺ call the most merciful of the ummah?", a: "Abu Bakr", wrong: ["Umar", "Mu'adh", "Khalid"], why: "The most merciful of my ummah is Abu Bakr." },
        { q: "Who was called the trustworthy one of this ummah?", a: "Abu Ubaydah", wrong: ["Mu'adh", "Uthman", "Ali"], why: "Every nation has a trustworthy one." }
      ]
    },
    {
      slug: "long-prayer",
      title: "Keep it light",
      line: "Mu'adh led Isha with Al-Baqarah and was told: lighter!",
      facts: ["A tired farmer left the long prayer.", "The Prophet ﷺ asked: are you putting people to trial?", "Behind the imam are the old, the weak and the needy."],
      source: hadith("bukhari", "705", "Jabir ibn Abdullah", "Sahih", "Mu'adh recited Al-Baqarah in Isha and a man with his camels left. The Prophet ﷺ said: O Mu'adh, are you putting the people to trial? Recite Al-A'la, Ash-Shams or Al-Layl, for the old, the weak and the needy pray behind you.", "for the old, the weak and the needy pray behind you"),
      difficulty: 3,
      questions: [
        { q: "Which surah did Mu'adh recite in Isha?", a: "Al-Baqarah", wrong: ["Al-Ikhlas", "Al-Kawthar", "Al-Asr"], why: "A very long surah for a tired man." },
        { q: "Which surahs did the Prophet ﷺ suggest instead?", a: "Al-A'la, Ash-Shams, Al-Layl", wrong: ["Al-Baqarah and Ali Imran", "No surahs at all", "Only Al-Kahf"], why: "Shorter surahs for the people." },
        { q: "Why should an imam keep the prayer light?", a: "The old, weak and needy pray behind", wrong: ["Imams must hurry home", "Long prayers are always wrong", "To finish before the market"], why: "He cares for everyone behind him." }
      ]
    },
    {
      slug: "make-it-easy",
      title: "\"Make things easy\"",
      line: "Sending him to Yemen, the Prophet ﷺ said: make things easy.",
      facts: ["Mu'adh and Abu Musa each led one part of Yemen.", "Give good news, do not drive people away.", "When near each other's land, they visited each other."],
      source: hadith("bukhari", "4341", "Abu Burdah", "Sahih", "The Prophet ﷺ sent Abu Musa and Mu'adh to Yemen, each over one province, and said: make things easy for the people and do not make them hard; give good news and do not drive them away.", "Facilitate things for the people and do not make things difficult for them"),
      difficulty: 3,
      questions: [
        { q: "Where was Mu'adh sent?", a: "Yemen", wrong: ["Sham", "Egypt", "Persia"], why: "With Abu Musa, each over one part." },
        { q: "What was the Prophet's ﷺ advice to them?", a: "Make things easy, not hard", wrong: ["Be very strict", "Take their wealth", "Stay silent"], why: "Facilitate, and give good news." },
        { q: "Who went to Yemen with Mu'adh?", a: "Abu Musa al-Ash'ari", wrong: ["Abu Jahl", "Abu Hurairah", "Abu Dharr"], why: "Yemen had two provinces, one each." }
      ]
    },
    {
      slug: "first-things-first",
      title: "First things first",
      line: "Teach Tawhid first, then prayer, then zakat.",
      facts: ["Zakat is taken from the rich and given to their poor.", "Do not take the best of their wealth.", "Fear the dua of the oppressed: nothing blocks it from Allah."],
      source: hadith("bukhari", "1496", "Ibn Abbas", "Sahih", "The Prophet ﷺ told Mu'adh: invite them first to the testimony of faith, then the five prayers, then zakat from their rich to their poor. Avoid taking the best of their wealth, and fear the dua of the oppressed, for there is no screen between it and Allah.", "there is no screen between his invocation and Allah"),
      difficulty: 4,
      questions: [
        { q: "What was Mu'adh to teach first?", a: "The testimony of faith", wrong: ["Zakat", "Hajj", "Trade rules"], why: "Tawhid comes first, then prayer, then zakat." },
        { q: "Whose dua has no screen before Allah?", a: "The oppressed", wrong: ["The richest man", "The king", "Only the scholars"], why: "Fear the dua of the oppressed." },
        { q: "Zakat is taken from the poor and given to the rich.", tf: false, why: "It is taken from the rich and given to the poor." }
      ]
    }
  ]
};

// Ubayy ibn Ka'b, the master of the reciters, whose name Allah mentioned to the Prophet ﷺ.
const UBAYY: DeepUnit = {
  key: "ubayy",
  topicId: "sahabah",
  branchId: "sahabi-ubayy-ibn-kab",
  branch: { title: "Ubayy ibn Ka'b", description: "The best reciter of the Quran, whose name Allah Himself mentioned." },
  name: "Ubayy ibn Ka'b",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "named-by-allah",
      title: "Allah mentioned his name",
      line: "Allah told the Prophet ﷺ to recite the Quran to Ubayy.",
      facts: ["Ubayy asked: did Allah mention me by name?", "The Prophet ﷺ said: yes.", "Ubayy burst into tears."],
      source: hadith("bukhari", "4961", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said to Ubayy ibn Ka'b: Allah has ordered me to recite the Quran to you. Ubayy said: did Allah mention me by name? He said: yes. Ubayy said: was I mentioned by the Lord of the worlds? He said: yes. Then Ubayy burst into tears.", "Then Ubai burst into tears"),
      difficulty: 2,
      questions: [
        { q: "What did Allah order the Prophet ﷺ to do for Ubayy?", a: "Recite the Quran to him", wrong: ["Give him gold", "Make him a king", "Send him to Rome"], why: "Allah has ordered me to recite the Quran to you." },
        { q: "What did Ubayy ask?", a: "Did Allah mention me by name?", wrong: ["Can I go home?", "Where is my reward?", "Who told you?"], why: "And the Prophet ﷺ said: yes." },
        { q: "How did Ubayy react?", a: "He burst into tears", wrong: ["He laughed", "He ran away", "He stayed silent"], why: "He wept that the Lord of the worlds named him." }
      ]
    },
    {
      slug: "greatest-ayah",
      title: "The greatest ayah",
      line: "Ubayy knew the greatest ayah: Ayat al-Kursi.",
      facts: ["The Prophet ﷺ called him Abul-Mundhir.", "He asked: which ayah is the greatest?", "The Prophet ﷺ struck his chest: may knowledge delight you!"],
      source: hadith("muslim", "810", "Ubayy ibn Ka'b", "Sahih", "The Prophet ﷺ asked: Abul-Mundhir, which ayah of Allah's Book is the greatest? I said: Allah, there is no god but He, the Living, the Eternal. He struck my chest and said: may knowledge be pleasant for you, Abul-Mundhir.", "May knowledge be pleasant for you"),
      difficulty: 3,
      questions: [
        { q: "Which ayah did Ubayy say is the greatest?", a: "Ayat al-Kursi", wrong: ["The last ayah of Al-Baqarah", "The first ayah of Al-Fatihah", "An ayah of Yasin"], why: "Allah, there is no god but He, the Living, the Eternal." },
        { q: "What did the Prophet ﷺ call Ubayy?", a: "Abul-Mundhir", wrong: ["Abu Hurairah", "Abu Turab", "Abu Bakr"], why: "His kunyah was Abul-Mundhir." },
        { q: "The Prophet ﷺ was pleased with Ubayy's answer.", tf: true, why: "May knowledge be pleasant for you, he said." }
      ]
    },
    {
      slug: "best-reciter",
      title: "The best reciter",
      line: "The Prophet ﷺ said Ubayy was the best reciter of his ummah.",
      facts: ["The same hadith praises many companions.", "Zayd ibn Thabit knew inheritance best.", "Ubayy recited the Quran best of all."],
      source: hadith("tirmidhi", "3790", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: ... the most knowledgeable of inheritance is Zayd ibn Thabit, and the best reciter among them is Ubayy ibn Ka'b.", "the best reciter"),
      difficulty: 3,
      questions: [
        { q: "Who was the best reciter of the ummah?", a: "Ubayy ibn Ka'b", wrong: ["Abu Jahl", "Khalid ibn al-Walid", "Abu Sufyan"], why: "The best reciter among them is Ubayy ibn Ka'b." },
        { q: "Who knew inheritance best?", a: "Zayd ibn Thabit", wrong: ["Ubayy ibn Ka'b", "Bilal", "Abu Hurairah"], why: "The most knowledgeable of inheritance is Zayd." },
        { q: "Ubayy was famous for poetry, not the Quran.", tf: false, why: "He was the best reciter of the Quran." }
      ]
    },
    {
      slug: "musa-and-khidr",
      title: "The story of Musa and Al-Khidr",
      line: "Ubayy passed on the story of Musa and Al-Khidr.",
      facts: ["He heard it from the Prophet ﷺ.", "Ibn Abbas learned it from Ubayy.", "It is the same story told in Surah Al-Kahf."],
      source: hadith("bukhari", "122", "Ubayy ibn Ka'b", "Sahih", "Ubayy ibn Ka'b narrated that the Prophet ﷺ said: once Prophet Musa stood up and addressed the Children of Israel... and then told the story of his journey with Al-Khidr.", "Once the Prophet Moses"),
      difficulty: 3,
      questions: [
        { q: "Which story did Ubayy narrate from the Prophet ﷺ?", a: "Musa and Al-Khidr", wrong: ["Yusuf and his brothers", "Nuh and the flood", "Yunus and the whale"], why: "Bukhari 122, narrated by Ubayy." },
        { q: "Which companion learned this story from Ubayy?", a: "Ibn Abbas", wrong: ["Abu Jahl", "Ka'b ibn Malik", "Khalid"], why: "Ibn Abbas passed it on from Ubayy." },
        { q: "In which surah is this story told?", a: "Al-Kahf", wrong: ["Al-Fatihah", "Al-Ikhlas", "An-Nas"], why: "Musa's journey with Al-Khidr is in Surah Al-Kahf." }
      ]
    },
    {
      slug: "witness",
      title: "\"The youngest will go\"",
      line: "When Abu Musa needed a witness, Ubayy sent the youngest of them.",
      facts: ["Umar asked Abu Musa for a witness to a hadith.", "Ubayy said: the youngest of us will go with you.", "Abu Sa'id went, and Umar accepted it."],
      source: hadith("bukhari", "6245", "Abu Sa'id al-Khudri", "Sahih", "Abu Musa asked the Ansar if anyone had heard the hadith about asking permission three times. Ubayy ibn Ka'b said: by Allah, none will go with you but the youngest of the people. I was the youngest, so I went and told Umar.", "none will go with you but the youngest of the people"),
      difficulty: 4,
      questions: [
        { q: "Who did Ubayy send as the witness?", a: "The youngest of them", wrong: ["The oldest man", "Ubayy himself", "No one"], why: "It showed the hadith was well known to all of them." },
        { q: "Who was the youngest, who went?", a: "Abu Sa'id al-Khudri", wrong: ["Abu Musa", "Umar", "Mu'adh"], why: "Abu Sa'id went and told Umar." },
        { q: "Why send the youngest?", a: "Even the youngest knew that hadith", wrong: ["He was the strongest", "He was the richest", "He was the leader"], why: "No need for an elder: everyone knew it." }
      ]
    },
    {
      slug: "taraweeh",
      title: "Leading the night prayer",
      line: "Umar gathered the people for Ramadan night prayer behind Ubayy.",
      facts: ["People were praying in small, separate groups.", "Umar wanted them behind one reciter.", "He chose Ubayy ibn Ka'b."],
      source: hadith("bukhari", "2010", "Abdur-Rahman ibn Abd al-Qari", "Sahih", "One night in Ramadan Umar found the people praying in separate groups in the mosque. He decided to gather them behind one reciter, and he gathered them behind Ubayy ibn Ka'b.", "congregate them behind Ubai"),
      difficulty: 3,
      questions: [
        { q: "In which month did Umar gather the people behind Ubayy?", a: "Ramadan", wrong: ["Muharram", "Shawwal", "Rajab"], why: "It was the Ramadan night prayer." },
        { q: "How were people praying before?", a: "In small separate groups", wrong: ["They did not pray", "Only at home", "Behind Umar"], why: "A man alone, or a man with a small group." },
        { q: "Umar chose Ubayy to lead because he recited so well.", tf: true, why: "He was the best reciter among them." }
      ]
    }
  ]
};

// Zayd ibn Thabit, the young scribe of the revelation who gathered the Quran into one book.
const ZAYD_THABIT: DeepUnit = {
  key: "zayd-thabit",
  topicId: "sahabah",
  branchId: "sahabi-zayd-ibn-thabit",
  branch: { title: "Zayd ibn Thabit", description: "The young scribe who wrote the revelation and gathered the Quran into one book." },
  name: "Zayd ibn Thabit",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "scribe",
      title: "\"Call Zayd\"",
      line: "A new ayah came down: call Zayd to write it!",
      facts: ["Zayd brought a board, an inkpot and a shoulder bone.", "He wrote down ayah 95 of An-Nisa.", "Then Allah added the words for those with an excuse."],
      source: hadith("bukhari", "4990", "Al-Bara ibn Azib", "Sahih", "When 'Not equal are those believers who sit at home' (4:95) came down, the Prophet ﷺ said: call Zayd and let him bring the board, the inkpot and the shoulder bone. Then he said: write.", "Call Zaid for me and let him bring the board"),
      difficulty: 2,
      questions: [
        { q: "What job did Zayd do for the Prophet ﷺ?", a: "He wrote down the revelation", wrong: ["He cooked", "He guarded the door", "He traded"], why: "Call Zayd and let him bring the board." },
        { q: "What did Zayd write on?", a: "A board and a shoulder bone", wrong: ["Printed paper", "A laptop", "Silk sheets"], why: "He brought the board, the inkpot and the shoulder bone." },
        { q: "Which ayah did he write that day?", a: "An-Nisa 4:95", wrong: ["Al-Fatihah 1:1", "Al-Ikhlas 112:1", "Yasin 36:1"], why: "Not equal are those believers who sit at home." }
      ]
    },
    {
      slug: "four-collectors",
      title: "One of four",
      line: "Zayd was one of four Ansar who gathered the whole Quran.",
      facts: ["They did it in the Prophet's ﷺ lifetime.", "The four: Ubayy, Mu'adh, Abu Zayd and Zayd.", "All four were from the Ansar."],
      source: hadith("bukhari", "3810", "Anas ibn Malik", "Sahih", "Anas said: the Quran was collected in the lifetime of the Prophet ﷺ by four men, all of them from the Ansar: Ubayy, Mu'adh ibn Jabal, Abu Zayd and Zayd ibn Thabit.", "was collected in the lifetime of the Prophet"),
      difficulty: 3,
      questions: [
        { q: "How many Ansar collected the Quran in the Prophet's ﷺ lifetime, said Anas?", a: "Four", wrong: ["One", "Ten", "Forty"], why: "Ubayy, Mu'adh, Abu Zayd and Zayd ibn Thabit." },
        { q: "Which of these was NOT one of the four?", a: "Abu Hurairah", wrong: ["Ubayy", "Mu'adh", "Abu Zayd"], why: "The four were all from the Ansar." },
        { q: "All four were from the Ansar.", tf: true, why: "All of whom were from the Ansar." }
      ]
    },
    {
      slug: "chosen",
      title: "\"A wise young man\"",
      line: "After Yamamah, Abu Bakr chose Zayd to gather the Quran.",
      facts: ["Many Quran memorizers died at the Battle of Yamamah.", "Umar feared parts of the Quran could be lost.", "Abu Bakr said: you are a wise young man we trust."],
      source: hadith("bukhari", "4986", "Zayd bin Thabit", "Sahih", "Abu Bakr called me after many reciters were killed at Yamamah and said: you are a wise young man, we do not suspect you, and you used to write the revelation, so search for the Quran and collect it.", "You are a wise young man"),
      difficulty: 3,
      questions: [
        { q: "After which battle was the Quran gathered into one book?", a: "Yamamah", wrong: ["Badr", "Uhud", "Khaybar"], why: "Many reciters were killed there." },
        { q: "Who first suggested gathering the Quran?", a: "Umar", wrong: ["Zayd", "Ali", "Abu Hurairah"], why: "Umar feared parts could be lost." },
        { q: "Why did Abu Bakr choose Zayd?", a: "Young, wise, trusted, a scribe of revelation", wrong: ["He was the oldest", "He was the richest", "He was a king"], why: "You used to write the revelation." }
      ]
    },
    {
      slug: "heavier-than-mountains",
      title: "Heavier than a mountain",
      line: "Moving a mountain would have been lighter for Zayd.",
      facts: ["He gathered the Quran from what was written and from hearts.", "He found the end of At-Tawbah only with Abu Khuzaymah.", "The pages stayed with Abu Bakr, then Umar, then Hafsah."],
      source: hadith("bukhari", "4986", "Zayd bin Thabit", "Sahih", "Zayd said: by Allah, if they had told me to move a mountain it would not have been heavier than gathering the Quran. I gathered it from what was written and from the men who knew it by heart, and found the end of At-Tawbah with Abu Khuzaymah al-Ansari.", "it would not have been heavier for me than this"),
      difficulty: 4,
      questions: [
        { q: "What did Zayd say would be lighter than gathering the Quran?", a: "Moving a mountain", wrong: ["Crossing a sea", "Fasting a year", "Building a house"], why: "It would not have been heavier for me than this." },
        { q: "Where did Zayd gather the Quran from?", a: "Written pieces and people's memory", wrong: ["Only one old book", "Dreams", "Poets"], why: "From what was written and from the men who knew it by heart." },
        { q: "Who kept the pages after Umar?", a: "Hafsah", wrong: ["Zayd", "Aishah", "Ali"], why: "With Abu Bakr, then Umar, then Hafsah, Umar's daughter." }
      ]
    },
    {
      slug: "two-witnesses",
      title: "Worth two witnesses",
      line: "One ayah of Al-Ahzab, Zayd found only with Khuzaymah ibn Thabit.",
      facts: ["Zayd had heard the Prophet ﷺ recite it.", "The Prophet ﷺ counted Khuzaymah's witness as two men.", "The ayah: among the believers are men true to their promise."],
      source: hadith("bukhari", "2807", "Zayd ibn Thabit", "Sahih", "Zayd said: an ayah of Al-Ahzab I used to hear the Prophet ﷺ recite was missing; I found it only with Khuzaymah ibn Thabit, whose witness the Prophet ﷺ counted as equal to two men: among the believers are men who were true to their covenant with Allah (33:23).", "equal to the witness of two men"),
      difficulty: 4,
      questions: [
        { q: "With whom did Zayd find the ayah of Al-Ahzab?", a: "Khuzaymah ibn Thabit", wrong: ["Abu Jahl", "Abu Sufyan", "Ubayy ibn Ka'b"], why: "I found it only with Khuzaymah ibn Thabit." },
        { q: "Khuzaymah's witness counted as how many men?", a: "Two", wrong: ["One", "Ten", "Half"], why: "Equal to the witness of two men." },
        { q: "Zayd had never heard that ayah before.", tf: false, why: "He used to hear the Prophet ﷺ recite it." }
      ]
    },
    {
      slug: "uthman-copies",
      title: "One Quran for every land",
      line: "Uthman had Zayd write copies of the Quran for every land.",
      facts: ["People in different lands began to recite differently.", "Uthman took Abu Bakr's pages from Hafsah.", "Copies were sent out to every region."],
      source: hadith("bukhari", "4987", "Anas ibn Malik", "Sahih", "Hudhayfah warned Uthman about people differing in recitation. Uthman got the pages from Hafsah and ordered Zayd ibn Thabit and others to write them into copies, and sent a copy to every region.", "ordered Zaid bin Thabit"),
      difficulty: 4,
      questions: [
        { q: "Which caliph had Zayd write copies of the Quran?", a: "Uthman", wrong: ["Abu Bakr", "Umar", "Mu'awiyah"], why: "He ordered Zayd and others to make the copies." },
        { q: "Who warned Uthman about people differing?", a: "Hudhayfah", wrong: ["Zayd", "Ka'b", "Bilal"], why: "Save this nation before they differ about the Book." },
        { q: "Where were the pages of Abu Bakr kept?", a: "With Hafsah", wrong: ["In Zayd's house", "In Makkah", "In Sham"], why: "Uthman sent for them from Hafsah." }
      ]
    }
  ]
};

// Abu Musa al-Ash'ari, from Yemen, with the sweetest voice of the Quran.
const ABU_MUSA: DeepUnit = {
  key: "abu-musa",
  topicId: "sahabah",
  branchId: "sahabi-abu-musa-al-ashari",
  branch: { title: "Abu Musa al-Ash'ari", description: "The companion from Yemen with a voice like the family of Dawud." },
  name: "Abu Musa al-Ash'ari",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "soft-hearts",
      title: "Soft hearts from Yemen",
      line: "The people of Yemen have come, with soft hearts.",
      facts: ["Abu Musa and his people came from Yemen.", "Faith is Yemeni, wisdom is Yemeni.", "They were gentle and soft-hearted."],
      source: hadith("bukhari", "4388", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: the people of Yemen have come to you, and they are gentler and softer of heart. Faith is Yemeni and wisdom is Yemeni.", "more gentle and soft-hearted"),
      difficulty: 2,
      questions: [
        { q: "Where did Abu Musa's people come from?", a: "Yemen", wrong: ["Persia", "Rome", "Egypt"], why: "He was from the Ash'aris of Yemen." },
        { q: "How did the Prophet ﷺ describe the people of Yemen?", a: "Gentle and soft-hearted", wrong: ["Hard and proud", "Rich and lazy", "Loud and angry"], why: "More gentle and soft-hearted." },
        { q: "The Prophet ﷺ said faith and wisdom are Yemeni.", tf: true, why: "Faith is Yemeni and wisdom is Yemeni." }
      ]
    },
    {
      slug: "voice-of-dawud",
      title: "A voice like Dawud's family",
      line: "Abu Musa was given a voice like Dawud's family.",
      facts: ["Abu Musa recited the Quran beautifully.", "Prophet Dawud was known for his lovely voice.", "A beautiful voice is a gift from Allah."],
      source: hadith("bukhari", "5048", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said to Abu Musa: you have been given one of the sweet voices of the family of Dawud.", "one of the mazamir"),
      difficulty: 2,
      questions: [
        { q: "What gift did Abu Musa have?", a: "A beautiful voice for the Quran", wrong: ["Great wealth", "A huge army", "A big palace"], why: "One of the sweet voices of Dawud's family." },
        { q: "Whose family's voice was his compared to?", a: "Prophet Dawud's", wrong: ["Prophet Nuh's", "Prophet Yusuf's", "Prophet Hud's"], why: "The family of Dawud." },
        { q: "The Prophet ﷺ praised Abu Musa's recitation.", tf: true, why: "He said he was given a voice like Dawud's family." }
      ]
    },
    {
      slug: "night-recitation",
      title: "Known by their recitation",
      line: "The Ash'aris' houses were known by their Quran at night.",
      facts: ["The Ash'aris were Abu Musa's tribe.", "They recited the Quran in their homes at night.", "He knew their houses by their voices, without seeing them by day."],
      source: hadith("bukhari", "4232", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: I recognize the voices of the Ash'aris reciting the Quran when they go home at night, and I know their houses from their voices at night, though I did not see their houses by day.", "I recognize the voice of the group of Al"),
      difficulty: 3,
      questions: [
        { q: "How did the Prophet ﷺ recognize the Ash'aris' houses?", a: "By their Quran at night", wrong: ["By their flags", "By big doors", "By their camels"], why: "He knew their houses from their voices." },
        { q: "Who were the Ash'aris?", a: "Abu Musa's tribe", wrong: ["A Roman army", "Makkan traders", "The people of Taif"], why: "Abu Musa came with his people, the Ash'aris." },
        { q: "What does this teach about a home?", a: "Fill it with the Quran", wrong: ["Keep it silent always", "Only decorate it", "Keep the Quran outside"], why: "Their homes were known by the Quran." }
      ]
    },
    {
      slug: "treasure",
      title: "A treasure of Paradise",
      line: "Abu Musa learned a treasure of Paradise.",
      facts: ["Abu Musa was saying it quietly to himself.", "Earlier: you call One who hears and sees, so no need to shout.", "It means: there is no power or might except with Allah."],
      source: hadith("bukhari", "6384", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ came to me while I was saying quietly: la hawla wa la quwwata illa billah. He said: O Abdullah ibn Qays, say la hawla wa la quwwata illa billah, for it is one of the treasures of Paradise.", "it is one of the treasures of Paradise"),
      difficulty: 3,
      questions: [
        { q: "Which words did the Prophet ﷺ call a treasure of Paradise?", a: "La hawla wa la quwwata illa billah", wrong: ["Good morning", "Thank you", "See you later"], why: "It is one of the treasures of Paradise." },
        { q: "What was Abu Musa's real name?", a: "Abdullah ibn Qays", wrong: ["Abdullah ibn Umar", "Abdur-Rahman", "Zayd ibn Thabit"], why: "The Prophet ﷺ called him O Abdullah ibn Qays." },
        { q: "We must shout our dhikr so Allah hears it.", tf: false, why: "You call One who hears and sees, not someone deaf or far." }
      ]
    },
    {
      slug: "awtas",
      title: "A dua after Awtas",
      line: "After Awtas, the Prophet ﷺ prayed: forgive Abdullah ibn Qays.",
      facts: ["Abu Musa's uncle Abu Amir fell at Awtas, after Hunayn.", "Abu Musa led the army after him.", "The Prophet ﷺ made wudu and raised his hands in dua."],
      source: hadith("bukhari", "4323", "Abu Musa al-Ash'ari", "Sahih", "After Hunayn, Abu Amir led an army to Awtas and was struck by an arrow; he made Abu Musa his successor. The Prophet ﷺ made wudu, raised his hands and prayed for Abu Amir, then said: O Allah, forgive the sins of Abdullah ibn Qays and admit him to a noble entrance on the Day of Resurrection.", "forgive the sins of"),
      difficulty: 4,
      questions: [
        { q: "Who led the army at Awtas first?", a: "Abu Amir, Abu Musa's uncle", wrong: ["Abu Musa", "Khalid", "Ali"], why: "Abu Amir made Abu Musa his successor." },
        { q: "What did the Prophet ﷺ do before the dua?", a: "He made wudu and raised his hands", wrong: ["He slept", "He ate", "He rode away"], why: "He asked for water, made wudu and raised his hands." },
        { q: "What did the Prophet ﷺ ask for Abu Musa?", a: "Forgiveness and a noble entrance", wrong: ["Gold and silver", "A long life only", "A kingdom"], why: "Admit him to a noble entrance on the Day of Resurrection." }
      ]
    },
    {
      slug: "three-knocks",
      title: "Ask three times",
      line: "Abu Musa knocked three times on Umar's door, then left.",
      facts: ["The Prophet ﷺ said: ask permission three times; if not allowed, go back.", "Umar asked for a witness.", "Abu Sa'id al-Khudri came and said he heard it too."],
      source: hadith("bukhari", "6245", "Abu Sa'id al-Khudri", "Sahih", "Abu Musa said: I asked permission to enter on Umar three times and was not given it, so I went back, for the Messenger of Allah ﷺ said: if one of you asks permission three times and is not given it, let him go back.", "I asked permission three times, and I was not given it"),
      difficulty: 3,
      questions: [
        { q: "How many times should you ask to enter?", a: "Three times", wrong: ["Once", "Ten times", "Until they open"], why: "If not allowed after three, go back." },
        { q: "What should you do if no one allows you in?", a: "Go back politely", wrong: ["Break the door", "Shout louder", "Wait all night"], why: "Then he should return." },
        { q: "Who backed up Abu Musa's hadith?", a: "Abu Sa'id al-Khudri", wrong: ["Abu Jahl", "Abu Sufyan", "No one"], why: "He was the youngest, and he went with him to Umar." }
      ]
    }
  ]
};

const JABIR: DeepUnit = {
  key: "jabir",
  topicId: "sahabah",
  branchId: "sahabi-jabir-ibn-abdullah",
  branch: { title: "Jabir ibn Abdullah", description: "The young Ansari who lost his father at Uhud and cared for his sisters." },
  name: "Jabir ibn Abdullah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "father-at-uhud",
      title: "His father at Uhud",
      line: "Jabir's father was martyred at Uhud.",
      facts: ["Jabir lifted the cloth from his father's face and wept.", "The Prophet ﷺ did not stop him from weeping.", "The angels kept shading his father with their wings."],
      source: hadith("bukhari", "1244", "Jabir ibn Abdullah", "Sahih", "When my father was martyred I lifted the sheet from his face and wept, and the Prophet ﷺ did not forbid me. He said: the angels kept shading him with their wings until you moved him.", "The angels were shading him continuously with their wings"),
      difficulty: 2,
      questions: [
        { q: "Where was Jabir's father martyred?", a: "At Uhud", wrong: ["At Badr", "At Tabuk", "At Khaybar"], why: "His father fell at the battle of Uhud." },
        { q: "What were the angels doing for his father?", a: "Shading him with their wings", wrong: ["Carrying swords", "Building a house", "Calling the adhan"], why: "The angels kept shading him with their wings." },
        { q: "The Prophet ﷺ forbade Jabir from crying.", tf: false, why: "The Prophet ﷺ did not forbid him." }
      ]
    },
    {
      slug: "fathers-debt",
      title: "Blessing in the dates",
      line: "Jabir's father left debts, and the dates were blessed.",
      facts: ["The lenders thought his dates would not cover the debt.", "The Prophet ﷺ sat on the dates and made dua.", "All was paid, and thirteen loads of dates were left over."],
      source: hadith("bukhari", "2709", "Jabir ibn Abdullah", "Sahih", "My father died in debt. The Prophet ﷺ came with Abu Bakr and Umar, sat on the dates and asked Allah to bless them. I paid every lender in full and thirteen wasqs of dates were left over.", "thirteen extra Wasqs of dates remained"),
      difficulty: 3,
      questions: [
        { q: "What did Jabir's father leave behind?", a: "Debts", wrong: ["A palace", "Gold mines", "A big army"], why: "My father died and was in debt." },
        { q: "What did the Prophet ﷺ do with the dates?", a: "Sat on them and made dua", wrong: ["Sold them", "Threw them away", "Gave them to Rome"], why: "He sat on the dates and asked Allah to bless them." },
        { q: "How many loads were left after paying everyone?", a: "Thirteen", wrong: ["None", "Two", "One hundred"], why: "Thirteen wasqs of dates remained." }
      ]
    },
    {
      slug: "his-sisters",
      title: "Caring for his sisters",
      line: "Jabir married to care for his young sisters.",
      facts: ["His father left seven or nine daughters.", "Jabir married a woman who had been married before.", "She could look after his sisters, and the Prophet ﷺ blessed him."],
      source: hadith("bukhari", "5367", "Jabir ibn Abdullah", "Sahih", "My father died and left seven or nine girls, so I married a woman who had been married before, so that she could look after them. The Prophet ﷺ said: may Allah bless you.", "so that she may look after them"),
      difficulty: 3,
      questions: [
        { q: "Why did Jabir marry an older woman?", a: "To look after his sisters", wrong: ["For her money", "To travel far", "To leave Madinah"], why: "So that she could look after them." },
        { q: "How many sisters did Jabir have?", a: "Seven or nine", wrong: ["One", "Two", "Twenty"], why: "His father left seven or nine girls." },
        { q: "The Prophet ﷺ made dua for Jabir.", tf: true, why: "He said: may Allah bless you." }
      ]
    },
    {
      slug: "trench-feast",
      title: "The feast at the Trench",
      line: "Jabir's small meal fed the whole army at the Trench.",
      facts: ["Jabir saw the Prophet ﷺ very hungry while digging.", "He had one goat and some barley at home.", "About a thousand ate, and the pot was still full."],
      source: hadith("bukhari", "4102", "Jabir ibn Abdullah", "Sahih", "At the Trench I saw the Prophet ﷺ very hungry, so we cooked a small goat and some barley. He called: O people of the Trench, Jabir has made food. About a thousand ate and the pot was still full.", "Jabir has prepared a meal so let us go"),
      difficulty: 3,
      questions: [
        { q: "Why did Jabir prepare food?", a: "He saw the Prophet ﷺ hungry", wrong: ["It was Eid", "A guest from Rome came", "He sold his camel"], why: "I saw the Prophet ﷺ in severe hunger." },
        { q: "About how many people ate from it?", a: "About a thousand", wrong: ["Two", "Ten", "Fifty"], why: "They were a thousand, and all of them ate." },
        { q: "The food ran out before everyone ate.", tf: false, why: "The pot was still bubbling as if nothing was taken." }
      ]
    },
    {
      slug: "the-camel",
      title: "Jabir's tired camel",
      line: "The Prophet ﷺ bought Jabir's camel, then gave it back.",
      facts: ["Jabir's camel was slow and tired.", "After the Prophet's ﷺ dua it ran faster than ever.", "He paid its price, then gave the camel back as a gift."],
      source: hadith("bukhari", "2718", "Jabir ibn Abdullah", "Sahih", "My camel was tired; the Prophet ﷺ struck it and prayed for it and it became fast. He bought it from me, paid me in Madinah, then said: take your camel as a gift.", "Take your camel as a gift for you"),
      difficulty: 3,
      questions: [
        { q: "What happened to the camel after the dua?", a: "It became very fast", wrong: ["It ran away", "It fell asleep", "It got lost"], why: "It became fast as never before." },
        { q: "What did the Prophet ﷺ do after paying?", a: "Gave the camel back as a gift", wrong: ["Sold it again", "Kept it", "Asked for more"], why: "Take your camel as a gift for you." },
        { q: "The Prophet ﷺ paid for the camel.", tf: true, why: "He gave Jabir its price." }
      ]
    },
    {
      slug: "the-visit",
      title: "A visit when he was sick",
      line: "The Prophet ﷺ visited Jabir when he was very sick.",
      facts: ["Jabir was so sick he had fainted.", "The Prophet ﷺ made wudu and sprinkled the water on him.", "Jabir asked about inheritance, and the verses of shares came."],
      source: hadith("bukhari", "194", "Jabir ibn Abdullah", "Sahih", "The Prophet ﷺ visited me when I was sick and unconscious. He made wudu and sprinkled the water on me and I woke up. I asked about my inheritance, and the verses of inheritance were revealed.", "He performed ablution and sprinkled the remaining water on me"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ sprinkle on Jabir?", a: "His wudu water", wrong: ["Perfume", "Milk", "Sand"], why: "He made wudu and sprinkled the water on him." },
        { q: "What did Jabir ask about?", a: "His inheritance", wrong: ["The weather", "A battle", "A camel race"], why: "To whom will my inheritance go?" },
        { q: "Visiting the sick is part of the sunnah.", tf: true, why: "The Prophet ﷺ himself visited Jabir." }
      ]
    }
  ]
};

const ABU_TALHAH: DeepUnit = {
  key: "abu-talhah",
  topicId: "sahabah",
  branchId: "sahabi-abu-talhah",
  branch: { title: "Abu Talhah al-Ansari", description: "The brave archer of Uhud who gave his best garden for Allah." },
  name: "Abu Talhah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "anas-serves",
      title: "A servant for the Prophet ﷺ",
      line: "Abu Talhah brought young Anas to serve the Prophet ﷺ.",
      facts: ["The Prophet ﷺ had no servant when he came to Madinah.", "Abu Talhah was Anas's stepfather.", "Anas served him at home and on journeys."],
      source: hadith("bukhari", "2768", "Anas", "Sahih", "When the Prophet ﷺ came to Madinah he had no servant. Abu Talhah took me to him and said: Anas is a wise boy, let him serve you. So I served him at home and on journeys.", "Anas is a wise boy, so let him serve you"),
      difficulty: 2,
      questions: [
        { q: "Who brought Anas to serve the Prophet ﷺ?", a: "Abu Talhah", wrong: ["Abu Jahl", "Abu Musa", "Abu Sufyan"], why: "Abu Talhah took Anas to him." },
        { q: "How was Abu Talhah related to Anas?", a: "His stepfather", wrong: ["His teacher", "His grandson", "His neighbor only"], why: "Abu Talhah was Anas's stepfather." },
        { q: "Anas served the Prophet ﷺ only at home.", tf: false, why: "He served him at home and on journeys." }
      ]
    },
    {
      slug: "shield-at-uhud",
      title: "A shield at Uhud",
      line: "At Uhud, Abu Talhah stood as a shield for the Prophet ﷺ.",
      facts: ["Many people ran, but Abu Talhah stayed in front.", "He was a strong archer and broke two or three bows.", "He said: let my neck be hit instead of yours."],
      source: hadith("bukhari", "3811", "Anas ibn Malik", "Sahih", "At Uhud, when people ran, Abu Talhah shielded the Prophet ﷺ. He was a strong archer and broke two or three bows, and said: do not raise your head, let my neck and chest be hit instead of yours.", "Let my neck and chest be wounded instead of yours"),
      difficulty: 3,
      questions: [
        { q: "What did Abu Talhah do at Uhud?", a: "Shielded the Prophet ﷺ", wrong: ["Ran away", "Stayed home", "Joined Quraysh"], why: "He was shielding the Prophet ﷺ with his shield." },
        { q: "What was Abu Talhah known for in battle?", a: "Archery", wrong: ["Cooking", "Poetry", "Trading"], why: "He was a strong, experienced archer." },
        { q: "What did he ask the Prophet ﷺ not to do?", a: "Raise his head", wrong: ["Speak", "Eat", "Pray"], why: "Do not raise your head, lest an arrow hit you." }
      ]
    },
    {
      slug: "bayruha",
      title: "The garden of Bayruha",
      line: "Abu Talhah gave his most loved garden for Allah.",
      facts: ["Bayruha was his favorite garden, facing the masjid.", "When 3:92 came, he gave it in charity.", "The Prophet ﷺ told him to give it to his relatives."],
      quote: quranQuote(3, 92),
      source: hadith("bukhari", "1461", "Anas ibn Malik", "Sahih", "Abu Talhah's most loved property was Bayruha garden, facing the masjid. When 'you will not attain righteousness until you spend from what you love' came down, he gave it for Allah, and the Prophet ﷺ told him to give it to his relatives.", "So I want to give it in charity"),
      difficulty: 3,
      questions: [
        { q: "Which ayah made Abu Talhah give his garden?", a: "Spend from what you love", wrong: ["The ayah of the veil", "The ayah of fasting", "The ayah of Hajj"], why: "Righteousness comes by spending from what you love, Quran 3:92." },
        { q: "Whom did the Prophet ﷺ tell him to give it to?", a: "His relatives", wrong: ["The army", "Rome", "Nobody"], why: "He gave it to his relatives and cousins." },
        { q: "Bayruha was the garden Abu Talhah loved least.", tf: false, why: "It was the most loved of all his property." }
      ]
    },
    {
      slug: "the-guest",
      title: "The guest and the lamp",
      line: "Abu Talhah fed a guest and his family slept hungry.",
      facts: ["A hungry man came, and the Prophet's ﷺ homes had only water.", "Abu Talhah put out the lamp so the guest ate alone.", "Allah was pleased with what they did."],
      source: hadith("muslim", "2054c", "Abu Hurairah", "Sahih", "A hungry man came and the Prophet's ﷺ homes had only water. Abu Talhah took him home, put out the lamp and let the guest eat while his family went without. Allah was pleased, and the verse about preferring others came down.", "A person from the Ansar who was called Abu Talha stood up"),
      difficulty: 3,
      questions: [
        { q: "Why did they put out the lamp?", a: "So the guest would eat alone", wrong: ["To sleep early", "To save oil", "To hide from enemies"], why: "So he thought they were eating too." },
        { q: "What did the Prophet's ﷺ homes have that night?", a: "Only water", wrong: ["Meat", "Bread", "Honey"], why: "There is nothing with me but water." },
        { q: "Allah was pleased with Abu Talhah and his wife.", tf: true, why: "Allah was well pleased with what you both did." }
      ]
    },
    {
      slug: "the-horse",
      title: "The fast horse",
      line: "The Prophet ﷺ rode Abu Talhah's horse in a scare.",
      facts: ["Madinah was frightened one night.", "The Prophet ﷺ borrowed Abu Talhah's horse, Al-Mandub.", "He found nothing to fear and said the horse was fast."],
      source: hadith("bukhari", "2627", "Anas", "Sahih", "Madinah was frightened, so the Prophet ﷺ borrowed Abu Talhah's horse Al-Mandub and rode it. He came back and said: we saw nothing, and we found the horse fast like the sea.", "the horse was very fast"),
      difficulty: 2,
      questions: [
        { q: "Whose horse did the Prophet ﷺ borrow?", a: "Abu Talhah's", wrong: ["Abu Jahl's", "Caesar's", "A stranger's"], why: "He borrowed a horse from Abu Talhah." },
        { q: "What did the Prophet ﷺ find when he rode out?", a: "Nothing to fear", wrong: ["A big army", "A lion", "A fire"], why: "We have not seen anything to be afraid of." },
        { q: "What was the horse's name?", a: "Al-Mandub", wrong: ["Al-Buraq", "Al-Qaswa", "Duldul"], why: "A horse from Abu Talha called Al-Mandub." }
      ]
    },
    {
      slug: "patient-night",
      title: "A patient night",
      line: "Abu Talhah's son died, and his wife broke it gently.",
      facts: ["His son died while he was away.", "His wife Umm Sulaym told him only in the morning.", "The Prophet ﷺ prayed for blessing on their night."],
      source: hadith("bukhari", "1301", "Anas ibn Malik", "Sahih", "A son of Abu Talhah died while he was away. His wife prepared him and told Abu Talhah only in the morning. The Prophet ﷺ said: may Allah bless you in your night. They later had nine sons who all knew the Quran.", "May Allah bless you concerning your night"),
      difficulty: 4,
      questions: [
        { q: "Who was Abu Talhah's wife?", a: "Umm Sulaym", wrong: ["Umm Salamah", "Hafsah", "Asma"], why: "Umm Sulaym was Abu Talhah's wife and Anas's mother." },
        { q: "What did the Prophet ﷺ pray for them?", a: "Blessing in their night", wrong: ["Wealth", "A long journey", "A big house"], why: "May Allah bless you concerning your night." },
        { q: "Their later sons all became reciters of the Quran.", tf: true, why: "They had nine sons, all reciters of the Quran." }
      ]
    }
  ]
};

const HUDHAYFAH: DeepUnit = {
  key: "hudhayfah",
  topicId: "sahabah",
  branchId: "sahabi-hudhayfah-ibn-al-yaman",
  branch: { title: "Hudhayfah ibn al-Yaman", description: "The companion who asked about the trials to come, and kept his word." },
  name: "Hudhayfah ibn al-Yaman",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "kept-his-word",
      title: "Keeping a promise",
      line: "Hudhayfah missed Badr because of a promise.",
      facts: ["Quraysh caught Hudhayfah and his father on the road.", "They let them go after a promise not to fight.", "The Prophet ﷺ said: we will keep our word to them."],
      source: hadith("muslim", "1787", "Hudhayfah ibn al-Yaman", "Sahih", "Quraysh caught me and my father and took a promise that we would not fight with the Prophet ﷺ. He said: go back to Madinah; we will keep our promise to them and ask Allah for help against them.", "we will fulfil the covenant made with them"),
      difficulty: 3,
      questions: [
        { q: "Why did Hudhayfah miss Badr?", a: "He had made a promise", wrong: ["He was sick", "He was asleep", "He was in Yemen"], why: "Quraysh took a promise that they would not fight." },
        { q: "What did the Prophet ﷺ tell them to do?", a: "Keep the promise", wrong: ["Break the promise", "Hide", "Fight anyway"], why: "We will fulfil the covenant made with them." },
        { q: "Muslims keep their promises, even to enemies.", tf: true, why: "The Prophet ﷺ kept the promise made to Quraysh." }
      ]
    },
    {
      slug: "his-father",
      title: "Forgiving at Uhud",
      line: "Hudhayfah forgave those who killed his father by mistake.",
      facts: ["In the confusion at Uhud, Muslims fought each other.", "Hudhayfah's father was killed by mistake.", "Hudhayfah said: may Allah forgive you."],
      source: hadith("bukhari", "4065", "Aishah", "Sahih", "At Uhud, in the confusion, Muslims struck Hudhayfah's father al-Yaman by mistake. Hudhayfah said: may Allah forgive you, and he kept asking forgiveness for them until he died.", "May Allah forgive you"),
      difficulty: 4,
      questions: [
        { q: "What did Hudhayfah say about his father's killers?", a: "May Allah forgive you", wrong: ["I will take revenge", "Leave Madinah", "Nothing at all"], why: "Hudhayfah said: may Allah forgive you." },
        { q: "Was Hudhayfah's father killed on purpose?", a: "No, by mistake", wrong: ["Yes, by Quraysh", "Yes, by Rome", "He was not killed"], why: "In the confusion, they did not know him." },
        { q: "Hudhayfah kept praying for them his whole life.", tf: true, why: "He kept asking forgiveness for them until he died." }
      ]
    },
    {
      slug: "night-mission",
      title: "The cold night mission",
      line: "On a freezing night, Hudhayfah went to spy on the enemy.",
      facts: ["It was the night of the Confederates, cold and windy.", "No one answered, so the Prophet ﷺ called Hudhayfah by name.", "He saw Abu Sufyan but did not shoot, as he was told."],
      source: hadith("muslim", "1788", "Hudhayfah", "Sahih", "On the night of the Confederates, in wind and cold, the Prophet ﷺ said: get up Hudhayfah and bring me news of the enemy, and do not provoke them. I saw Abu Sufyan and could have shot him, but I remembered his words.", "Get up Hudhaifa, bring me the news of the enemy"),
      difficulty: 4,
      questions: [
        { q: "What was Hudhayfah sent to do?", a: "Bring news of the enemy", wrong: ["Cook food", "Carry water", "Build a wall"], why: "Bring me the news of the enemy." },
        { q: "Why did Hudhayfah not shoot Abu Sufyan?", a: "He was told not to provoke them", wrong: ["He had no arrows", "He fell asleep", "He was afraid"], why: "Do nothing that may provoke them." },
        { q: "The night was warm and calm.", tf: false, why: "It was a night of violent wind and severe cold." }
      ]
    },
    {
      slug: "asked-about-evil",
      title: "Asking about evil",
      line: "Hudhayfah asked about evil so it would not catch him.",
      facts: ["People asked the Prophet ﷺ about good things.", "Hudhayfah asked about evil, to stay safe from it.", "He was told to stick with the Muslims and their leader."],
      source: hadith("bukhari", "3606", "Hudhayfah ibn al-Yaman", "Sahih", "People asked about good, but I asked about evil for fear it would reach me. The Prophet ﷺ told me to stick to the group of Muslims and their leader, and if there are none, to keep away from all the sects.", "but I used to ask him about evil for fear that it might overtake me"),
      difficulty: 4,
      questions: [
        { q: "Why did Hudhayfah ask about evil?", a: "So it would not catch him", wrong: ["To do it", "To scare people", "For fun"], why: "For fear that it might overtake me." },
        { q: "What did the Prophet ﷺ tell him to stick to?", a: "The Muslims and their leader", wrong: ["The richest man", "His own tribe only", "Living alone always"], why: "Adhere to the group of Muslims and their chief." },
        { q: "Knowing about dangers helps you stay safe.", tf: true, why: "Hudhayfah asked so that evil would not overtake him." }
      ]
    },
    {
      slug: "trust-leaves",
      title: "When trust leaves hearts",
      line: "Hudhayfah learned how honesty would leave people's hearts.",
      facts: ["Honesty was placed deep in people's hearts.", "Then they learned it from the Quran and the Sunnah.", "Later, trustworthy people would become rare."],
      source: hadith("bukhari", "6497", "Hudhayfah", "Sahih", "The Prophet ﷺ told us that honesty came down into the roots of men's hearts, then they learned it from the Quran and the Sunnah. Then it will be taken away, until a trustworthy man is hard to find.", "honesty was preserved in the roots of the hearts of men"),
      difficulty: 5,
      questions: [
        { q: "Where was honesty first placed?", a: "In the roots of hearts", wrong: ["In the markets", "In gold", "In the sky"], why: "Honesty was preserved in the roots of men's hearts." },
        { q: "Where did people then learn honesty from?", a: "The Quran and the Sunnah", wrong: ["Poets", "Kings", "Traders"], why: "They learnt it from the Quran, then from the Sunnah." },
        { q: "Trustworthy people will always be easy to find.", tf: false, why: "There will hardly be any trustworthy people among them." }
      ]
    },
    {
      slug: "the-door",
      title: "Umar and the door",
      line: "Hudhayfah told Umar about a closed door before the trials.",
      facts: ["Umar asked about trials that spread like sea waves.", "Hudhayfah said a closed door stands before them.", "Later he explained: the door was Umar himself."],
      source: hadith("bukhari", "525", "Hudhayfah", "Sahih", "Umar asked about the trial that would spread like the waves of the sea. Hudhayfah said: there is a closed door between you and it, and it will be broken. Later he said the door was Umar himself.", "there is a closed door between you and it"),
      difficulty: 5,
      questions: [
        { q: "What were the trials compared to?", a: "Waves of the sea", wrong: ["Falling stars", "Desert sand", "Rain clouds"], why: "Trials that spread like the waves of the sea." },
        { q: "Who was the closed door?", a: "Umar himself", wrong: ["Abu Bakr", "Hudhayfah", "A city gate"], why: "Hudhayfah said the door was Umar." },
        { q: "Would the door be opened or broken?", a: "Broken", wrong: ["Opened", "Locked forever", "Painted"], why: "It will be broken, and never closed again." }
      ]
    }
  ]
};

const ZAYD_HARITHAH: DeepUnit = {
  key: "zayd-harithah",
  topicId: "sahabah",
  branchId: "sahabi-zayd-ibn-harithah",
  branch: { title: "Zayd ibn Harithah", description: "The beloved freed slave of the Prophet ﷺ, named in the Quran, who led the army at Mu'tah." },
  name: "Zayd ibn Harithah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "zayd-ibn-muhammad",
      title: "Called by his father's name",
      line: "People called him Zayd ibn Muhammad, until an ayah came.",
      facts: ["Zayd was the freed slave the Prophet ﷺ raised like a son.", "People called him Zayd ibn Muhammad.", "Allah said: call them by their fathers' names."],
      quote: quranQuote(33, 5),
      source: hadith("bukhari", "4782", "Abdullah ibn Umar", "Sahih", "We used to call Zayd ibn Harithah only Zayd ibn Muhammad, until the ayah came: call them by their fathers; that is more just with Allah.", "Call them (adopted sons) by (the names of) their fathers"),
      difficulty: 2,
      questions: [
        { q: "What did people call Zayd at first?", a: "Zayd ibn Muhammad", wrong: ["Zayd ibn Umar", "Zayd ibn Thabit", "Zayd al-Yamani"], why: "They called him Zayd ibn Muhammad." },
        { q: "What did the ayah tell people to do?", a: "Call them by their fathers' names", wrong: ["Give them new names", "Never use names", "Call them by tribes only"], why: "Call them by the names of their fathers." },
        { q: "Who was Zayd's real father?", a: "Harithah", wrong: ["Muhammad ﷺ", "Abu Talib", "Thabit"], why: "He is Zayd ibn Harithah." }
      ]
    },
    {
      slug: "named-in-quran",
      title: "Named in the Quran",
      line: "Allah mentions Zayd by name in Surah Al-Ahzab.",
      facts: ["Zayd's name comes in Quran 33:37.", "It is the only place in the Quran that names him.", "Surah Al-Ahzab is the 33rd surah."],
      quote: quranQuote(33, 37),
      source: quran(33, 37, "Allah mentions Zayd by name in Surah Al-Ahzab, ayah 37."),
      difficulty: 3,
      questions: [
        { q: "In which surah is Zayd named?", a: "Al-Ahzab", wrong: ["Al-Baqarah", "Yusuf", "Al-Kahf"], why: "Zayd's name comes in Quran 33:37." },
        { q: "Which number is Surah Al-Ahzab?", a: "33", wrong: ["2", "12", "18"], why: "Al-Ahzab is the 33rd surah." },
        { q: "Zayd's name appears in the Quran.", tf: true, why: "Allah names him in 33:37." }
      ]
    },
    {
      slug: "same-feet",
      title: "Father and son",
      line: "A man saw Zayd's and Usamah's feet and knew they were family.",
      facts: ["Zayd and his son Usamah were asleep under a cover.", "An expert in family looks saw only their feet.", "He said they were father and son, and the Prophet ﷺ was pleased."],
      source: hadith("bukhari", "3731", "Aishah", "Sahih", "Usamah ibn Zayd and Zayd ibn Harithah were lying asleep. A man skilled in family likeness said: these feet are from one another. The Prophet ﷺ was pleased and told Aishah about it.", "These feet (of Usama and his father) are of persons belonging to the same lineage"),
      difficulty: 3,
      questions: [
        { q: "Who was Zayd's son?", a: "Usamah", wrong: ["Anas", "Jabir", "Ka'b"], why: "Usamah ibn Zayd was his son." },
        { q: "What did the man look at?", a: "Their feet", wrong: ["Their faces", "Their clothes", "Their camels"], why: "These feet are of persons of the same lineage." },
        { q: "The Prophet ﷺ was happy with what he said.", tf: true, why: "The Prophet ﷺ was pleased and told Aishah." }
      ]
    },
    {
      slug: "our-brother",
      title: "Our brother",
      line: "The Prophet ﷺ told Zayd: you are our brother.",
      facts: ["After Umrat al-Qada, Ali, Ja'far and Zayd each wanted to care for Hamzah's daughter.", "The Prophet ﷺ gave each of them kind words.", "To Zayd he said: you are our brother and our freed slave."],
      source: hadith("bukhari", "2699", "Al-Bara ibn Azib", "Sahih", "Ali, Ja'far and Zayd each asked to care for Hamzah's daughter. The Prophet ﷺ gave her to her aunt, and said to Zayd: you are our brother and our freed slave.", "You are our brother (in faith) and our freed slave"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ call Zayd?", a: "Our brother", wrong: ["A stranger", "Our guest", "Our enemy"], why: "You are our brother and our freed slave." },
        { q: "Whose daughter did they all want to care for?", a: "Hamzah's", wrong: ["Abu Jahl's", "Umar's", "Uthman's"], why: "They each asked to care for Hamzah's daughter." },
        { q: "Zayd was harshly sent away.", tf: false, why: "He was told: you are our brother." }
      ]
    },
    {
      slug: "commander-mutah",
      title: "Commander at Mu'tah",
      line: "Zayd was made the first commander of the army at Mu'tah.",
      facts: ["The Prophet ﷺ chose Zayd to lead the army.", "If Zayd fell, Ja'far would lead; then Abdullah ibn Rawahah.", "Mu'tah was a battle against the Romans."],
      source: hadith("bukhari", "4261", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ made Zayd ibn Harithah commander at Mu'tah and said: if Zayd is killed, Ja'far; and if Ja'far is killed, Abdullah ibn Rawahah.", "appointed Zaid bin Haritha as the commander of the army"),
      difficulty: 3,
      questions: [
        { q: "Who was the first commander at Mu'tah?", a: "Zayd ibn Harithah", wrong: ["Khalid ibn al-Walid", "Abu Bakr", "Umar"], why: "He appointed Zayd as the commander." },
        { q: "Who would lead if Zayd fell?", a: "Ja'far", wrong: ["Ali", "Usamah", "Bilal"], why: "If Zayd is martyred, Ja'far takes over." },
        { q: "Who was third in line?", a: "Abdullah ibn Rawahah", wrong: ["Hamzah", "Anas", "Abu Hurairah"], why: "Then Abdullah ibn Rawahah." }
      ]
    },
    {
      slug: "tears-for-zayd",
      title: "Tears for Zayd",
      line: "The Prophet ﷺ told of Zayd's death with tears in his eyes.",
      facts: ["Zayd took the flag first and was martyred.", "The Prophet ﷺ told the people before the news came.", "Then Khalid, a Sword of Allah, took the flag."],
      source: hadith("bukhari", "4262", "Anas ibn Malik", "Sahih", "Before the news came, the Prophet ﷺ said with tears: Zayd took the flag and was martyred, then Ja'far, then Ibn Rawahah; then a Sword of Allah took it and Allah gave them victory.", "Zaid took the flag (as the commander of the army) and was martyred"),
      difficulty: 4,
      questions: [
        { q: "How did the Prophet ﷺ know before the news?", a: "He told them before it came", wrong: ["A letter came first", "Zayd wrote to him", "A trader told him"], why: "He informed them before the news reached." },
        { q: "Who took the flag after the three martyrs?", a: "Khalid, a Sword of Allah", wrong: ["Usamah", "Abu Musa", "Hudhayfah"], why: "A Sword amongst the Swords of Allah took it." },
        { q: "The Prophet ﷺ wept for them.", tf: true, why: "The Prophet's ﷺ eyes were shedding tears." }
      ]
    }
  ]
};

const USAMAH: DeepUnit = {
  key: "usamah",
  topicId: "sahabah",
  branchId: "sahabi-usamah-ibn-zayd",
  branch: { title: "Usamah ibn Zayd", description: "The beloved son of a beloved father, who led an army while still young." },
  name: "Usamah ibn Zayd",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "loved-child",
      title: "A loved child",
      line: "The Prophet ﷺ held Usamah and Al-Hasan and prayed for them.",
      facts: ["Usamah was the son of Zayd ibn Harithah.", "The Prophet ﷺ took him and Al-Hasan on his lap.", "He said: O Allah, love them, for I love them."],
      source: hadith("bukhari", "3735", "Usamah ibn Zayd", "Sahih", "The Prophet ﷺ used to take me and Al-Hasan and say: O Allah, love them, for I love them.", "O Allah! Love them, as I love them"),
      difficulty: 2,
      questions: [
        { q: "Who was Usamah's father?", a: "Zayd ibn Harithah", wrong: ["Zayd ibn Thabit", "Abu Bakr", "Hamzah"], why: "Usamah was the son of Zayd ibn Harithah." },
        { q: "Who was held with Usamah?", a: "Al-Hasan", wrong: ["Anas", "Ibn Umar", "Jabir"], why: "He took Usamah and Al-Hasan." },
        { q: "What did the Prophet ﷺ pray for them?", a: "That Allah loves them", wrong: ["That they get rich", "That they travel", "That they become kings"], why: "O Allah, love them, as I love them." }
      ]
    },
    {
      slug: "to-allah-belongs",
      title: "What Allah takes",
      line: "Usamah heard the Prophet ﷺ teach patience at a child's death.",
      facts: ["A daughter of the Prophet ﷺ sent word that her child was dying.", "He sent: what Allah takes and gives belongs to Him.", "When he saw the child, his eyes filled with tears."],
      source: hadith("bukhari", "1284", "Usamah ibn Zayd", "Sahih", "The Prophet's ﷺ daughter sent for him as her child was dying. He sent her his salam and said: whatever Allah takes is His and whatever He gives is His; so be patient. Then he went, and his eyes shed tears.", "Whatever Allah takes is for Him and whatever He gives, is for Him"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ say belongs to Allah?", a: "What He takes and what He gives", wrong: ["Only gold", "Only the sky", "Only the Kaaba"], why: "Whatever Allah takes and gives is for Him." },
        { q: "What did he tell his daughter to be?", a: "Patient", wrong: ["Angry", "Silent forever", "Afraid"], why: "She should be patient and hope for reward." },
        { q: "Crying with tears from sadness is allowed.", tf: true, why: "The Prophet's ﷺ own eyes shed tears." }
      ]
    },
    {
      slug: "his-heart",
      title: "Did you open his heart?",
      line: "Usamah learned not to judge what is in a heart.",
      facts: ["In a raid, a man said la ilaha illallah and Usamah still struck him.", "Usamah thought he said it only out of fear.", "The Prophet ﷺ asked: did you open his heart to know?"],
      source: hadith("muslim", "96a", "Usamah ibn Zayd", "Sahih", "In a raid a man said: there is no god but Allah, and I killed him. The Prophet ﷺ said: did you cut open his heart to find out? He kept repeating it until I wished I had become Muslim only that day.", "Did you tear his heart in order to find out whether it had professed or not"),
      difficulty: 4,
      questions: [
        { q: "What did the man say before Usamah struck him?", a: "La ilaha illallah", wrong: ["I surrender my camel", "Spare my tribe", "Nothing"], why: "He said: there is no god but Allah." },
        { q: "What is the lesson for us?", a: "Only Allah knows the heart", wrong: ["Guess people's hearts", "Trust nobody", "Words never matter"], why: "Did you open his heart to find out?" },
        { q: "The Prophet ﷺ said it only once.", tf: false, why: "He kept repeating it to Usamah." }
      ]
    },
    {
      slug: "from-arafah",
      title: "Riding behind the Prophet ﷺ",
      line: "On Hajj, Usamah rode behind the Prophet ﷺ from Arafah.",
      facts: ["It was the Farewell Hajj.", "Usamah rode behind him from Arafah to Muzdalifah.", "Al-Fadl rode behind him from Muzdalifah to Mina."],
      source: hadith("bukhari", "1544", "Ibn Abbas", "Sahih", "Usamah rode behind the Prophet ﷺ from Arafah to Muzdalifah, then Al-Fadl rode behind him from Muzdalifah to Mina, and he kept saying the talbiyah.", "Usama rode behind … Messenger"),
      difficulty: 3,
      questions: [
        { q: "Where did Usamah ride behind the Prophet ﷺ?", a: "From Arafah to Muzdalifah", wrong: ["From Makkah to Taif", "From Madinah to Uhud", "From Mina to Yemen"], why: "Usamah rode behind him from Arafah to Muzdalifah." },
        { q: "Who rode behind him after Muzdalifah?", a: "Al-Fadl", wrong: ["Usamah again", "Abu Bakr", "Bilal"], why: "Al-Fadl rode from Muzdalifah to Mina." },
        { q: "The Prophet ﷺ kept saying the talbiyah.", tf: true, why: "He kept on reciting the talbiyah." }
      ]
    },
    {
      slug: "worthy-leader",
      title: "Worthy to lead",
      line: "Some doubted young Usamah as leader; the Prophet ﷺ defended him.",
      facts: ["The Prophet ﷺ made Usamah commander of an army.", "Some had also doubted his father Zayd as leader.", "He said both were worthy, and among the dearest to him."],
      source: hadith("bukhari", "3730", "Abdullah ibn Umar", "Sahih", "Some criticized Usamah's command. The Prophet ﷺ said: you criticized his father's command before. By Allah, he was worthy of it and among the dearest people to me, and this one is among the dearest to me after him.", "He was worthy of leadership"),
      difficulty: 4,
      questions: [
        { q: "What did some people do when Usamah was made leader?", a: "Criticized it", wrong: ["Ran away", "Made him king", "Gave him gold"], why: "Some people criticized his leadership." },
        { q: "Whose leadership was criticized before?", a: "His father Zayd's", wrong: ["Abu Bakr's", "Umar's", "Ali's"], why: "You used to criticize his father's leadership before." },
        { q: "The Prophet ﷺ said Zayd was worthy to lead.", tf: true, why: "By Allah, he was worthy of leadership." }
      ]
    },
    {
      slug: "most-beloved",
      title: "The army to Sham",
      line: "Usamah led the army to Sham, loved by the Prophet ﷺ.",
      facts: ["The army was being sent to Sham, toward the Romans.", "People spoke about Usamah leading it.", "The Prophet ﷺ said: he is most beloved of people to me."],
      source: hadith("bukhari", "4468", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ made Usamah commander of the army to Sham. When people spoke about him, he said: I have heard what you said about Usamah; he is the most beloved of people to me.", "he is the most beloved of all people to me"),
      difficulty: 4,
      questions: [
        { q: "Where was Usamah's army going?", a: "Sham", wrong: ["Yemen", "Persia", "Egypt"], why: "The troops were sent to Syria, called Sham." },
        { q: "What did the Prophet ﷺ say about Usamah?", a: "He is most beloved to me", wrong: ["He is too young", "Send someone else", "He must stay home"], why: "He is the most beloved of all people to me." },
        { q: "Being young stopped Usamah from leading.", tf: false, why: "The Prophet ﷺ made him commander." }
      ]
    }
  ]
};

const HAMZAH: DeepUnit = {
  key: "hamzah",
  topicId: "sahabah",
  branchId: "sahabi-hamzah-ibn-abdul-muttalib",
  branch: { title: "Hamzah ibn Abdul-Muttalib", description: "The brave uncle of the Prophet ﷺ, a hero of Badr, martyred at Uhud." },
  name: "Hamzah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "uncle-and-brother",
      title: "Uncle and foster brother",
      line: "Hamzah was the Prophet's ﷺ uncle and his foster brother.",
      facts: ["Hamzah was the son of Abdul-Muttalib, the Prophet's ﷺ grandfather.", "He and the Prophet ﷺ were nursed by the same woman.", "So the Prophet ﷺ called him his foster brother."],
      source: hadith("bukhari", "2645", "Ibn Abbas", "Sahih", "The Prophet ﷺ said about Hamzah's daughter: she is not lawful for me, for foster ties count like blood ties; she is the daughter of my foster brother.", "She is the daughter of my foster brother"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call Hamzah besides uncle?", a: "His foster brother", wrong: ["His teacher", "His servant", "His neighbor"], why: "She is the daughter of my foster brother." },
        { q: "Who was Hamzah's father?", a: "Abdul-Muttalib", wrong: ["Abu Talib", "Abu Lahab", "Harithah"], why: "He is Hamzah ibn Abdul-Muttalib." },
        { q: "Foster ties count like blood ties for marriage.", tf: true, why: "Foster relations are treated like blood relations." }
      ]
    },
    {
      slug: "duel-at-badr",
      title: "The duel at Badr",
      line: "At Badr, Hamzah stepped out first to fight in single combat.",
      facts: ["Hamzah, Ali and Ubaydah faced three leaders of Quraysh.", "They faced Utbah, Shaybah and Al-Walid.", "Allah revealed 22:19 about these two sides."],
      quote: quranQuote(22, 19),
      source: hadith("bukhari", "3969", "Abu Dharr", "Sahih", "Abu Dharr swore that the ayah 'these two opponents dispute about their Lord' came down about those who fought at Badr: Hamzah, Ali and Ubaydah ibn al-Harith against Utbah, Shaybah and Al-Walid.", "namely, Hamza"),
      difficulty: 3,
      questions: [
        { q: "Who stepped out with Hamzah at Badr?", a: "Ali and Ubaydah", wrong: ["Abu Bakr and Umar", "Zayd and Usamah", "Bilal and Anas"], why: "Hamzah, Ali and Ubaydah ibn al-Harith." },
        { q: "Which ayah came down about them?", a: "22:19", wrong: ["2:255", "112:1", "3:92"], why: "These two opponents dispute about their Lord, 22:19." },
        { q: "Hamzah stayed away from Badr.", tf: false, why: "He was among the first to fight at Badr." }
      ]
    },
    {
      slug: "lion-at-uhud",
      title: "Bravery at Uhud",
      line: "At Uhud, Hamzah bravely answered a challenge to a duel.",
      facts: ["An enemy fighter called out for a duel.", "Hamzah stepped out and asked: do you challenge Allah and His Messenger?", "Hamzah defeated him."],
      source: hadith("bukhari", "4072", "Wahshi ibn Harb", "Sahih", "At Uhud, Siba' called for a duel. Hamzah came out and said: do you challenge Allah and His Messenger? and he defeated him.", "Do you challenge Allah and His Apostle"),
      difficulty: 3,
      questions: [
        { q: "What did Hamzah say to the challenger?", a: "Do you challenge Allah and His Messenger?", wrong: ["I give up", "Let us make peace", "Wait for tomorrow"], why: "Do you challenge Allah and His Apostle?" },
        { q: "Who won the duel?", a: "Hamzah", wrong: ["Siba'", "Nobody", "It was stopped"], why: "Hamzah attacked and defeated him." },
        { q: "Hamzah was a brave fighter.", tf: true, why: "He stepped out to answer the challenge." }
      ]
    },
    {
      slug: "martyr",
      title: "Martyred at Uhud",
      line: "Hamzah was martyred at Uhud by Wahshi's spear.",
      facts: ["Wahshi was a slave promised freedom if he killed Hamzah.", "He hid behind a rock and threw his spear.", "Hamzah fell as a martyr at Uhud."],
      source: hadith("bukhari", "4072", "Wahshi ibn Harb", "Sahih", "My master promised me freedom if I killed Hamzah. At Uhud I hid behind a rock and, when he came near, I threw my spear and he died.", "I hid myself under a rock"),
      difficulty: 3,
      questions: [
        { q: "Who killed Hamzah?", a: "Wahshi", wrong: ["Abu Jahl", "Abu Sufyan", "Khalid"], why: "Wahshi threw his spear at him." },
        { q: "What was Wahshi promised?", a: "His freedom", wrong: ["A palace", "A sword", "A camel race"], why: "If you kill Hamzah, you will be set free." },
        { q: "In which battle was Hamzah martyred?", a: "Uhud", wrong: ["Badr", "Khaybar", "Tabuk"], why: "He was killed at the battle of Uhud." }
      ]
    },
    {
      slug: "remembered",
      title: "Remembered with tears",
      line: "Abdur-Rahman ibn Awf wept remembering Hamzah.",
      facts: ["Abdur-Rahman was given food while fasting.", "He said: Hamzah was martyred, and he was better than me.", "He feared his reward had come in this world, and wept."],
      source: hadith("bukhari", "4045", "Sa'd ibn Ibrahim", "Sahih", "Food was brought to Abdur-Rahman ibn Awf while he was fasting. He said: Mus'ab was martyred and he was better than me; Hamzah was martyred and he was better than me. Then wealth was given to us; we fear our reward came early. He wept and left the food.", "Hamza was martyred and he was better than I"),
      difficulty: 4,
      questions: [
        { q: "Who wept remembering Hamzah?", a: "Abdur-Rahman ibn Awf", wrong: ["Abu Jahl", "Wahshi", "Abu Lahab"], why: "Abdur-Rahman wept and left the food." },
        { q: "What did he say about Hamzah?", a: "He was better than me", wrong: ["He was weak", "He was rich", "He was a trader"], why: "Hamzah was martyred and he was better than I." },
        { q: "Abdur-Rahman was fasting at the time.", tf: true, why: "The meal came while he was fasting." }
      ]
    },
    {
      slug: "wahshi-returns",
      title: "Wahshi comes to Islam",
      line: "Years later, Wahshi came to the Prophet ﷺ as a Muslim.",
      facts: ["Wahshi came with the delegation of Taif.", "The Prophet ﷺ asked: can you keep your face from me?", "Wahshi later fought Musaylimah the liar to make amends."],
      source: hadith("bukhari", "4072", "Wahshi ibn Harb", "Sahih", "I came to the Prophet ﷺ with the people of Taif. He asked: are you Wahshi, who killed Hamzah? Then he said: can you hide your face from me? Later I went out against Musaylimah to make amends for Hamzah.", "Can you hide your face from me"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ ask Wahshi?", a: "Can you hide your face from me?", wrong: ["Leave Arabia now", "Pay a fine", "Fight me"], why: "Can you hide your face from me?" },
        { q: "Whom did Wahshi later fight to make amends?", a: "Musaylimah the liar", wrong: ["Abu Bakr", "The Persians only", "Hamzah's family"], why: "He went out to Musaylimah to make amends for killing Hamzah." },
        { q: "Wahshi came with the delegation of Taif.", tf: true, why: "He went out with the messengers of Taif to the Prophet ﷺ." }
      ]
    }
  ]
};

const AMMAR: DeepUnit = {
  key: "ammar",
  topicId: "sahabah",
  branchId: "sahabi-ammar-ibn-yasir",
  branch: { title: "Ammar ibn Yasir", description: "One of the very first Muslims, called the pure and purified one." },
  name: "Ammar ibn Yasir",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "first-believers",
      title: "Among the first",
      line: "Ammar saw Islam when only a handful believed.",
      facts: ["Ammar was one of the earliest Muslims.", "He saw the Prophet ﷺ with only five slaves, two women and Abu Bakr.", "Those were all the Muslims at that time."],
      source: hadith("bukhari", "3660", "Ammar ibn Yasir", "Sahih", "I saw the Prophet ﷺ when there was none with him but five slaves, two women and Abu Bakr.", "there was none with him but five slaves, two women and Abu Bakr"),
      difficulty: 2,
      questions: [
        { q: "Who was with the Prophet ﷺ when Ammar saw him?", a: "Five slaves, two women and Abu Bakr", wrong: ["A big army", "All of Makkah", "Only Umar"], why: "There was none with him but five slaves, two women and Abu Bakr." },
        { q: "Ammar was one of the earliest Muslims.", tf: true, why: "He saw Islam when only a few believed." },
        { q: "How many Muslims were there then?", a: "Very few", wrong: ["Thousands", "Hundreds", "Nobody"], why: "Only a handful were with the Prophet ﷺ." }
      ]
    },
    {
      slug: "tayammum",
      title: "Rolling in the dust",
      line: "Ammar rolled in the dust, and learned the easy tayammum.",
      facts: ["On a journey Ammar needed a bath but had no water.", "He rolled on the ground like an animal, then prayed.", "The Prophet ﷺ showed him: strike the earth, wipe face and hands."],
      source: hadith("bukhari", "338", "Abd ar-Rahman ibn Abza", "Sahih", "Ammar reminded Umar that on a journey he rolled in the dust because there was no water. The Prophet ﷺ said: this would have been enough, and struck the earth lightly, blew off the dust and wiped his face and hands.", "It would have been sufficient for you to do like this"),
      difficulty: 3,
      questions: [
        { q: "Why did Ammar roll in the dust?", a: "There was no water", wrong: ["To play", "To hide", "To get warm"], why: "No water was available." },
        { q: "What did the Prophet ﷺ show him?", a: "Wipe face and hands after striking the earth", wrong: ["Roll in sand again", "Wait for rain", "Skip the prayer"], why: "He struck the earth and wiped his face and hands." },
        { q: "Without water, a Muslim can make tayammum.", tf: true, why: "The Prophet ﷺ taught Ammar how." }
      ]
    },
    {
      slug: "pure-one",
      title: "The pure and purified",
      line: "The Prophet ﷺ welcomed Ammar as the pure and purified one.",
      facts: ["Ammar asked permission to enter.", "The Prophet ﷺ said: let him in.", "He greeted him: welcome, the pure, the purified."],
      source: hadith("tirmidhi", "3798", "Ali ibn Abi Talib", "Sahih", "Ammar asked permission to come in to the Prophet ﷺ, who said: let him in; welcome to the pure one, the purified.", "greetings to the pure one, the purified"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ call Ammar?", a: "The pure and purified", wrong: ["The traveler", "The trader", "The poet"], why: "Greetings to the pure one, the purified." },
        { q: "Ammar asked permission before entering.", tf: true, why: "Ammar came seeking permission to enter." },
        { q: "Who narrated the welcome?", a: "Ali", wrong: ["Abu Jahl", "Wahshi", "Abu Sufyan"], why: "Ali narrated it." }
      ]
    },
    {
      slug: "protected",
      title: "Protected from Shaytan",
      line: "Abu Darda said Ammar was protected from Shaytan.",
      facts: ["Abu Darda lived in Sham and met a man from Kufa.", "He asked about the man protected from Shaytan.", "That man was Ammar, by the Prophet's ﷺ dua."],
      source: hadith("bukhari", "3743", "Ibrahim an-Nakha'i", "Sahih", "Abu Darda asked a man from Kufa: is not among you the one whom Allah protected from Shaytan through the dua of His Prophet ﷺ, namely Ammar?", "the person whom Allah gave Refuge from Satan through the invocation of His Prophet namely"),
      difficulty: 4,
      questions: [
        { q: "From whom was Ammar protected?", a: "Shaytan", wrong: ["Rain", "Lions", "The cold"], why: "Allah gave him refuge from Satan." },
        { q: "How was he protected?", a: "By the Prophet's ﷺ dua", wrong: ["By a sword", "By a wall", "By gold"], why: "Through the invocation of His Prophet ﷺ." },
        { q: "Who called Ammar protected from Shaytan?", a: "Abu Darda", wrong: ["Abu Jahl", "Abu Talib", "Abu Lahab"], why: "Abu Darda asked the man from Kufa." }
      ]
    },
    {
      slug: "governor",
      title: "Governor of Kufa",
      line: "Umar made Ammar the leader of Kufa.",
      facts: ["The people of Kufa complained about Sa'd.", "Umar removed Sa'd and appointed Ammar.", "Kufa was a new city in Iraq."],
      source: hadith("bukhari", "755", "Jabir ibn Samurah", "Sahih", "The people of Kufa complained about Sa'd to Umar, so he removed him and made Ammar their leader.", "dismissed him and appointed"),
      difficulty: 3,
      questions: [
        { q: "Who made Ammar the leader of Kufa?", a: "Umar", wrong: ["Abu Jahl", "Caesar", "Abu Sufyan"], why: "Umar appointed Ammar as their chief." },
        { q: "Whom did Ammar replace?", a: "Sa'd", wrong: ["Khalid", "Bilal", "Zayd"], why: "Umar dismissed Sa'd and appointed Ammar." },
        { q: "Kufa is a city in Iraq.", tf: true, why: "Kufa was built in Iraq." }
      ]
    },
    {
      slug: "short-khutbah",
      title: "A short khutbah",
      line: "Ammar gave a short khutbah, as the Prophet ﷺ taught.",
      facts: ["Ammar's khutbah was short and clear.", "People wished it had been longer.", "He said: a long prayer and a short khutbah show understanding."],
      source: hadith("muslim", "869", "Abu Wa'il", "Sahih", "Ammar gave a short, eloquent khutbah. He said: I heard the Prophet ﷺ say: a long prayer and a short khutbah are a sign of a man's understanding, so lengthen the prayer and shorten the khutbah.", "The lengthening of prayer by a man and the shortness of the sermon is the sign of his understanding"),
      difficulty: 4,
      questions: [
        { q: "What kind of khutbah did Ammar give?", a: "Short and clear", wrong: ["Very long", "Silent", "In a whisper"], why: "It was short and eloquent." },
        { q: "What should be long, the prayer or the khutbah?", a: "The prayer", wrong: ["The khutbah", "Both very long", "Neither"], why: "Lengthen the prayer and shorten the sermon." },
        { q: "A short khutbah is a sign of understanding.", tf: true, why: "It is the sign of his understanding." }
      ]
    }
  ]
};

const ABU_AYYUB: DeepUnit = {
  key: "abu-ayyub",
  topicId: "sahabah",
  branchId: "sahabi-abu-ayyub-al-ansari",
  branch: { title: "Abu Ayyub al-Ansari", description: "The host of the Prophet ﷺ in Madinah, who strove in Allah's way to old age." },
  name: "Abu Ayyub al-Ansari",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-host",
      title: "The Prophet's ﷺ host",
      line: "In Madinah, the Prophet ﷺ stayed in Abu Ayyub's house.",
      facts: ["After the Hijrah, the Prophet ﷺ stayed with Abu Ayyub.", "The Prophet ﷺ lived downstairs; Abu Ayyub upstairs.", "Abu Ayyub could not bear walking above him, so they swapped."],
      source: hadith("muslim", "2053c", "Aflah, freed slave of Abu Ayyub", "Sahih", "The Prophet ﷺ stayed in Abu Ayyub's house on the lower floor. Abu Ayyub said: we walk above the head of the Messenger of Allah ﷺ! He would not live above him, so the Prophet ﷺ moved upstairs.", "that we walk above the head of … Messenger"),
      difficulty: 2,
      questions: [
        { q: "Where did the Prophet ﷺ stay when he came to Madinah?", a: "In Abu Ayyub's house", wrong: ["In a tent", "In Umar's house", "In the market"], why: "He alighted in the house of Abu Ayyub." },
        { q: "Why was Abu Ayyub upset?", a: "He was walking above the Prophet ﷺ", wrong: ["The house was small", "It was too hot", "He had no food"], why: "We walk above the head of the Messenger of Allah ﷺ." },
        { q: "In the end, the Prophet ﷺ moved upstairs.", tf: true, why: "Abu Ayyub would not live above him." }
      ]
    },
    {
      slug: "the-garlic",
      title: "What he did not like",
      line: "Garlic was left uneaten, so Abu Ayyub disliked it too.",
      facts: ["The Prophet ﷺ sent his leftover food to Abu Ayyub.", "One day he had not eaten it, as it had garlic.", "Garlic was not forbidden; he disliked its smell."],
      source: hadith("muslim", "2053a", "Abu Ayyub al-Ansari", "Sahih", "The Prophet ﷺ sent me his leftovers, and one day he had not eaten from it because of garlic. I asked: is it forbidden? He said: no, but I dislike its smell. I said: then I dislike what you dislike.", "Then I also do not like what you do not like"),
      difficulty: 3,
      questions: [
        { q: "Why did the Prophet ﷺ not eat the food?", a: "It had garlic", wrong: ["It was cold", "It was too salty", "It was old"], why: "It included garlic." },
        { q: "Is garlic forbidden?", a: "No", wrong: ["Yes", "Only on Fridays", "Only in Ramadan"], why: "He said: no, but I dislike its smell." },
        { q: "What did Abu Ayyub say?", a: "I dislike what you dislike", wrong: ["I will eat it all", "Give it away", "Throw it out"], why: "Then I also do not like what you do not like." }
      ]
    },
    {
      slug: "qiblah-respect",
      title: "Respect for the qiblah",
      line: "Abu Ayyub taught not to face the qiblah in the toilet.",
      facts: ["The Prophet ﷺ said: do not face or turn your back to the qiblah when relieving yourself.", "In Sham, some toilets faced the qiblah.", "Abu Ayyub turned away and asked Allah's forgiveness."],
      source: hadith("bukhari", "394", "Abu Ayyub al-Ansari", "Sahih", "The Prophet ﷺ said: when relieving yourself, do not face the qiblah or turn your back to it. Abu Ayyub said: in Sham we found toilets facing the qiblah, so we turned aside and asked Allah's forgiveness.", "we turned ourselves while using them and asked for … forgiveness"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ teach about the toilet?", a: "Do not face the qiblah", wrong: ["Face the qiblah", "Pray there", "Recite Quran there"], why: "Neither face nor turn your back to the qiblah." },
        { q: "What did Abu Ayyub do in Sham?", a: "Turned aside and asked forgiveness", wrong: ["Ignored it", "Broke the toilets", "Left Sham"], why: "We turned ourselves and asked for Allah's forgiveness." },
        { q: "Abu Ayyub respected the qiblah even far from Madinah.", tf: true, why: "He turned aside in Sham." }
      ]
    },
    {
      slug: "three-nights",
      title: "Not more than three nights",
      line: "Abu Ayyub taught: do not cut off a brother over three nights.",
      facts: ["It is not allowed to cut off a Muslim brother over three nights.", "Two people meet and each turns away.", "The better one is the one who says salam first."],
      source: hadith("bukhari", "6077", "Abu Ayyub al-Ansari", "Sahih", "The Prophet ﷺ said: it is not lawful to cut off a brother for more than three nights, each turning away when they meet; the better of the two is the one who greets first.", "the better of the two will be the one who greets the other first"),
      difficulty: 3,
      questions: [
        { q: "How long at most can you stay cut off from a Muslim?", a: "Three nights", wrong: ["One year", "Forty days", "Forever"], why: "Not more than three nights." },
        { q: "Who is the better of the two?", a: "The one who greets first", wrong: ["The older one", "The richer one", "The louder one"], why: "The better is the one who greets the other first." },
        { q: "Saying salam first is a good deed.", tf: true, why: "The one who greets first is better." }
      ]
    },
    {
      slug: "six-of-shawwal",
      title: "Six days of Shawwal",
      line: "Abu Ayyub taught the reward of six fasts in Shawwal.",
      facts: ["Shawwal is the month after Ramadan.", "Fast Ramadan, then six days of Shawwal.", "It is like fasting the whole year."],
      source: hadith("muslim", "1164", "Abu Ayyub al-Ansari", "Sahih", "The Prophet ﷺ said: whoever fasts Ramadan and follows it with six days of Shawwal, it is as if he fasted for all time.", "followed it with six"),
      difficulty: 2,
      questions: [
        { q: "How many days of Shawwal are in the hadith?", a: "Six", wrong: ["Ten", "Three", "Thirty"], why: "Six fasts of Shawwal." },
        { q: "What is the reward like?", a: "Fasting all the time", wrong: ["One day", "One week", "Nothing"], why: "As if he fasted perpetually." },
        { q: "Shawwal comes right after Ramadan.", tf: true, why: "Shawwal is the month after Ramadan." }
      ]
    },
    {
      slug: "constantinople",
      title: "Striving to the end",
      line: "Abu Ayyub kept striving and was buried at Constantinople.",
      facts: ["In old age he went with the army to Constantinople.", "He explained 2:195: ruin is leaving the effort for wealth.", "He kept striving until he was buried there."],
      quote: quranQuote(2, 195),
      source: hadith("abudawud", "2512", "Abu Ayyub", "Sahih", "At Constantinople, Abu Ayyub said 2:195 came about the Ansar: when Islam grew strong, they thought to stay with their wealth. Ruin was leaving the effort. He kept striving in Allah's way until he was buried in Constantinople.", "AbuAyyub continued to strive in the cause of Allah until he (died and) was buried in Constantinople"),
      difficulty: 5,
      questions: [
        { q: "Where was Abu Ayyub buried?", a: "Constantinople", wrong: ["Madinah", "Makkah", "Kufa"], why: "He was buried in Constantinople." },
        { q: "What did he say ruin meant in 2:195?", a: "Leaving the effort for wealth", wrong: ["Fighting bravely", "Giving charity", "Praying at night"], why: "Staying with wealth and leaving the effort." },
        { q: "Abu Ayyub stopped striving when he grew old.", tf: false, why: "He continued until he died there." }
      ]
    }
  ]
};

const IBN_RAWAHAH: DeepUnit = {
  key: "ibn-rawahah",
  topicId: "sahabah",
  branchId: "sahabi-abdullah-ibn-rawahah",
  branch: { title: "Abdullah ibn Rawahah", description: "The poet of the Prophet ﷺ, who fasted in the heat and fell at Mu'tah." },
  name: "Abdullah ibn Rawahah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-poet",
      title: "A poet with clean words",
      line: "The Prophet ﷺ praised Ibn Rawahah's clean poetry.",
      facts: ["Ibn Rawahah was a poet of the Ansar.", "The Prophet ﷺ said: your brother does not say bad words.", "His poem praised the Prophet ﷺ reciting at night."],
      source: hadith("bukhari", "1155", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: your brother Abdullah ibn Rawahah does not say obscene things. His poem: among us is the Messenger of Allah ﷺ, who recites His Book at dawn, and spends his nights with his side away from his bed.", "does not say obscene"),
      difficulty: 2,
      questions: [
        { q: "What was Ibn Rawahah known for?", a: "Poetry", wrong: ["Trading", "Archery only", "Farming"], why: "He was a poet of the Ansar." },
        { q: "What did the Prophet ﷺ say about his words?", a: "He does not say bad words", wrong: ["He talks too much", "He is too quiet", "He should stop"], why: "Your brother does not say obscene." },
        { q: "His poem said the Prophet ﷺ prayed at night.", tf: true, why: "His sides do not touch his bed." }
      ]
    },
    {
      slug: "trench-verses",
      title: "Verses at the Trench",
      line: "At the Trench, the Prophet ﷺ sang Ibn Rawahah's verses.",
      facts: ["The Prophet ﷺ carried earth while digging the Trench.", "He recited verses made by Ibn Rawahah.", "O Allah, without You we would not be guided."],
      source: hadith("bukhari", "4106", "Al-Bara ibn Azib", "Sahih", "At the Trench I saw the Prophet ﷺ carrying earth and reciting the verses of Ibn Rawahah: O Allah, without You we would not have been guided, nor given charity, nor prayed; so send calm upon us.", "I heard him reciting the poetic verses composed by Ibn Rawaha"),
      difficulty: 3,
      questions: [
        { q: "Whose verses did the Prophet ﷺ recite at the Trench?", a: "Ibn Rawahah's", wrong: ["Abu Jahl's", "A Roman poet's", "Nobody's"], why: "The poetic verses composed by Ibn Rawaha." },
        { q: "What did the verses say?", a: "Without You we would not be guided", wrong: ["We are the strongest", "We will win by ourselves", "Let us go home"], why: "O Allah, without You we would not have been guided." },
        { q: "The Prophet ﷺ carried earth with the companions.", tf: true, why: "I saw him carrying earth out of the trench." }
      ]
    },
    {
      slug: "fasting-in-heat",
      title: "Fasting in the heat",
      line: "On a burning day, only the Prophet ﷺ and Ibn Rawahah fasted.",
      facts: ["It was a very hot day on a journey.", "People put their hands on their heads from the heat.", "Only the Prophet ﷺ and Ibn Rawahah were fasting."],
      source: hadith("bukhari", "1945", "Abu Darda", "Sahih", "We set out with the Prophet ﷺ on a very hot day, so hot that one put his hand on his head. None of us was fasting except the Prophet ﷺ and Ibn Rawahah.", "None of us was fasting except the Prophet and Ibn Rawaha"),
      difficulty: 3,
      questions: [
        { q: "Who was fasting on that hot day?", a: "The Prophet ﷺ and Ibn Rawahah", wrong: ["Everyone", "Nobody", "Only Abu Darda"], why: "None was fasting except the Prophet ﷺ and Ibn Rawahah." },
        { q: "How hot was it?", a: "Very hot", wrong: ["Cold", "Rainy", "Snowy"], why: "One had to put his hand over his head." },
        { q: "A traveler may choose not to fast.", tf: true, why: "The others on the journey were not fasting." }
      ]
    },
    {
      slug: "umrah-poetry",
      title: "Poetry at the Umrah",
      line: "At the Umrah of Qada, Ibn Rawahah recited before the Prophet ﷺ.",
      facts: ["The Prophet ﷺ entered Makkah for Umrat al-Qada.", "Ibn Rawahah walked in front, reciting poetry.", "Umar objected; the Prophet ﷺ said: leave him."],
      source: hadith("tirmidhi", "2847", "Anas ibn Malik", "Sahih", "The Prophet ﷺ entered Makkah at Umrat al-Qada with Ibn Rawahah walking ahead reciting poetry. Umar objected, and the Prophet ﷺ said: leave him, O Umar, for it hits them faster than arrows.", "For it is quicker upon them than the raining arrow"),
      difficulty: 4,
      questions: [
        { q: "Who walked in front of the Prophet ﷺ into Makkah?", a: "Ibn Rawahah", wrong: ["Abu Lahab", "Wahshi", "Abu Sufyan"], why: "Abdullah ibn Rawahah was walking in front of him." },
        { q: "Who objected to the poetry?", a: "Umar", wrong: ["Ali", "Bilal", "Anas"], why: "Umar said: in the sanctuary you utter poetry?" },
        { q: "What did the Prophet ﷺ say?", a: "Leave him", wrong: ["Stop him", "Send him home", "Take his sword"], why: "Leave him, O Umar." }
      ]
    },
    {
      slug: "are-you-so",
      title: "Are you really so?",
      line: "Ibn Rawahah feared praise he did not deserve.",
      facts: ["He fainted, and his sister cried out his good qualities.", "When he woke he said: I was asked, are you really so?", "So she did not wail at his death."],
      source: hadith("bukhari", "4267", "An-Nu'man ibn Bashir", "Sahih", "Abdullah ibn Rawahah fainted and his sister cried, listing his good qualities. When he woke he said: every time you said something, I was asked: are you really so?", "Are you really so"),
      difficulty: 4,
      questions: [
        { q: "What did his sister do when he fainted?", a: "Cried out his good qualities", wrong: ["Laughed", "Ran away", "Sang"], why: "She went on calling him by his good qualities." },
        { q: "What was he asked each time?", a: "Are you really so?", wrong: ["Are you hungry?", "Where are you?", "Who is she?"], why: "I was asked: are you really so?" },
        { q: "Ibn Rawahah liked being praised loudly.", tf: false, why: "He warned his sister against it." }
      ]
    },
    {
      slug: "third-commander",
      title: "The third commander",
      line: "At Mu'tah, Ibn Rawahah took the flag third and was martyred.",
      facts: ["The Prophet ﷺ named three leaders for Mu'tah.", "Zayd first, then Ja'far, then Abdullah ibn Rawahah.", "All three were martyred, one after the other."],
      source: hadith("bukhari", "4261", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ made Zayd commander at Mu'tah and said: if Zayd is killed, Ja'far; and if Ja'far is killed, Abdullah ibn Rawahah.", "Abdullah bin Rawaha should take over his position"),
      difficulty: 3,
      questions: [
        { q: "Which leader was Ibn Rawahah at Mu'tah?", a: "The third", wrong: ["The first", "The second", "He stayed home"], why: "If Ja'far is martyred, Abdullah ibn Rawahah takes over." },
        { q: "Who led before Ibn Rawahah?", a: "Zayd and Ja'far", wrong: ["Abu Bakr and Umar", "Khalid and Amr", "Ali and Hamzah"], why: "Zayd first, then Ja'far." },
        { q: "All three leaders at Mu'tah were martyred.", tf: true, why: "Each took the flag and was martyred." }
      ]
    }
  ]
};

const KHABBAB: DeepUnit = {
  key: "khabbab",
  topicId: "sahabah",
  branchId: "sahabi-khabbab-ibn-al-aratt",
  branch: { title: "Khabbab ibn al-Aratt", description: "The blacksmith who stayed firm under torture in Makkah, and feared the riches that came later." },
  name: "Khabbab ibn al-Aratt",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-blacksmith",
      title: "The blacksmith's debt",
      line: "Khabbab the blacksmith refused to leave Islam for his money.",
      facts: ["Khabbab was a blacksmith in Makkah.", "Al-As ibn Wail owed him money and said: leave Islam first.", "Khabbab refused, and Allah revealed 19:77 about Al-As."],
      quote: quranQuote(19, 77),
      source: hadith("bukhari", "2091", "Khabbab ibn al-Aratt", "Sahih", "I was a blacksmith, and Al-As ibn Wail owed me money. He said: I will not pay you unless you disbelieve in Muhammad ﷺ. I refused. Then the ayah came: have you seen the one who disbelieved in Our signs and said: I will surely be given wealth and children?", "I was a blacksmith in the Pre-Islamic period"),
      difficulty: 2,
      questions: [
        { q: "What was Khabbab's job?", a: "Blacksmith", wrong: ["Farmer", "Sailor", "Shepherd"], why: "I was a blacksmith." },
        { q: "What did Al-As want before paying?", a: "That Khabbab leave Islam", wrong: ["More time", "A new sword", "A camel"], why: "I will not pay you unless you disbelieve in Muhammad ﷺ." },
        { q: "Khabbab gave up Islam to get his money.", tf: false, why: "He refused." }
      ]
    },
    {
      slug: "in-the-shade",
      title: "Patience by the Kaaba",
      line: "Khabbab asked for help, and was taught patience and hope.",
      facts: ["The Muslims suffered greatly in Makkah.", "Khabbab asked the Prophet ﷺ to make dua for help.", "He was told: earlier believers bore worse, and Islam will be complete."],
      source: hadith("bukhari", "3852", "Khabbab ibn al-Aratt", "Sahih", "We were suffering from the pagans and I asked the Prophet ﷺ in the shade of the Kaaba to pray for us. He said believers before were combed with iron combs and did not leave their faith, and Allah will complete this religion until a rider travels from Sana to Hadramawt fearing none but Allah.", "Allah will surely complete this religion"),
      difficulty: 3,
      questions: [
        { q: "Where was the Prophet ﷺ when Khabbab came?", a: "In the shade of the Kaaba", wrong: ["In Madinah", "In a cave", "In the market"], why: "He was leaning in the shade of the Kaaba." },
        { q: "What did the Prophet ﷺ promise?", a: "Allah will complete this religion", wrong: ["They will get rich", "The pain will stop that day", "They must leave Islam"], why: "Allah will surely complete this religion." },
        { q: "Earlier believers also suffered for their faith.", tf: true, why: "They were combed with iron combs and stayed firm." }
      ]
    },
    {
      slug: "beard-moving",
      title: "Watching the Prophet ﷺ pray",
      line: "Khabbab knew the Prophet ﷺ recited in Dhuhr by his beard moving.",
      facts: ["Dhuhr and Asr are recited silently.", "Khabbab was asked how he knew the Prophet ﷺ recited in them.", "He said: by the movement of his beard."],
      source: hadith("bukhari", "746", "Abu Ma'mar", "Sahih", "We asked Khabbab whether the Prophet ﷺ recited in Dhuhr and Asr. He said yes. We asked how he knew, and he said: by the movement of his beard.", "By the movement of his beard"),
      difficulty: 3,
      questions: [
        { q: "How did Khabbab know the Prophet ﷺ recited in Dhuhr?", a: "His beard moved", wrong: ["He heard it loudly", "Someone told him", "He guessed"], why: "By the movement of his beard." },
        { q: "Which prayers are recited silently?", a: "Dhuhr and Asr", wrong: ["Fajr and Maghrib", "Isha only", "Eid"], why: "He was asked about Dhuhr and Asr." },
        { q: "The Prophet ﷺ recited in Dhuhr and Asr.", tf: true, why: "Khabbab replied in the affirmative." }
      ]
    },
    {
      slug: "musabs-cloak",
      title: "Mus'ab's short cloak",
      line: "Khabbab remembered Mus'ab, buried in one short cloak.",
      facts: ["Mus'ab ibn Umayr was martyred at Uhud.", "His cloak covered either his head or his feet.", "They covered his head and put grass on his feet."],
      source: hadith("bukhari", "3897", "Abu Wa'il", "Sahih", "Khabbab said: some of us died without taking any reward in this world; one was Mus'ab ibn Umayr, martyred at Uhud, leaving only a cloak. Covering his head left his feet bare, so the Prophet ﷺ told us to cover his head and put idhkhir grass on his feet.", "who was martyred on the day (of the battle) of Uhud leaving a striped woolen cloak"),
      difficulty: 3,
      questions: [
        { q: "Who did Khabbab remember?", a: "Mus'ab ibn Umayr", wrong: ["Abu Jahl", "Abu Lahab", "Abu Sufyan"], why: "One of them was Mus'ab ibn Umayr." },
        { q: "What did they put on Mus'ab's feet?", a: "Grass", wrong: ["His sword", "Sand", "Palm leaves"], why: "Idhkhir grass on his feet." },
        { q: "Mus'ab left behind great riches.", tf: false, why: "He left only a woolen cloak." }
      ]
    },
    {
      slug: "fearing-riches",
      title: "Afraid of riches",
      line: "When rich and sick, Khabbab feared the world's wealth.",
      facts: ["Khabbab was very sick, with seven burn treatments.", "He said: our friends left without enjoying this world.", "He would have wished for death, but the Prophet ﷺ forbade it."],
      source: hadith("bukhari", "5672", "Qays ibn Abi Hazim", "Sahih", "We visited Khabbab, who had been cauterized seven times. He said: our companions who died left without their reward being reduced by this world, but we have so much wealth. Had the Prophet ﷺ not forbidden us to wish for death, I would have wished for it.", "Had the Prophet not forbidden us to wish for death, I would have wished for it"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ forbid?", a: "Wishing for death", wrong: ["Visiting the sick", "Building houses", "Eating dates"], why: "The Prophet ﷺ forbade us to wish for death." },
        { q: "Why was Khabbab worried?", a: "He had much wealth", wrong: ["He was poor", "He was lost", "He had no friends"], why: "We have got so much wealth." },
        { q: "A Muslim should not wish for death.", tf: true, why: "The Prophet ﷺ forbade wishing for death." }
      ]
    }
  ]
};

const ABU_SAID: DeepUnit = {
  key: "abu-said",
  topicId: "sahabah",
  branchId: "sahabi-abu-said-al-khudri",
  branch: { title: "Abu Sa'id al-Khudri", description: "The young Ansari who learned and passed on a great amount of the Sunnah." },
  name: "Abu Sa'id al-Khudri",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "a-day-for-women",
      title: "A day for the women",
      line: "Abu Sa'id told how women asked for their own lesson day.",
      facts: ["The men took most of the Prophet's ﷺ time.", "The women asked for a day of their own.", "He gave them a day to teach them."],
      source: hadith("bukhari", "101", "Abu Sa'id al-Khudri", "Sahih", "Some women asked the Prophet ﷺ to fix a day for them, as the men took all his time. He promised them a day for lessons and commands.", "Some women requested the Prophet"),
      difficulty: 2,
      questions: [
        { q: "What did the women ask for?", a: "A day of lessons for them", wrong: ["A new masjid", "Gold", "A journey"], why: "They asked him to fix a day for them." },
        { q: "Did the Prophet ﷺ agree?", a: "Yes, he gave them a day", wrong: ["No", "Only once a year", "He sent them away"], why: "He promised them one day for religious lessons." },
        { q: "Women in the Prophet's ﷺ time learned the religion.", tf: true, why: "He gave them a day for lessons." }
      ]
    },
    {
      slug: "fatihah-ruqyah",
      title: "Al-Fatihah as a cure",
      line: "Companions cured a stung chief by reciting Al-Fatihah.",
      facts: ["A tribe refused the companions as guests.", "Their chief was stung, and one companion recited Al-Fatihah over him.", "He got up healed, and the Prophet ﷺ said: you did right."],
      quote: quranQuote(1, 2),
      source: hadith("bukhari", "2276", "Abu Sa'id al-Khudri", "Sahih", "A tribe refused the companions hospitality; then their chief was stung. One companion recited Al-Fatihah and blew over him, and he got up as if freed from a chain. The Prophet ﷺ said: how did you know it is a ruqyah? You did right.", "How did you come to know that Surat-ul-Fatiha was recited as Ruqya"),
      difficulty: 3,
      questions: [
        { q: "Which surah did the companion recite?", a: "Al-Fatihah", wrong: ["Al-Baqarah", "Yasin", "Al-Kahf"], why: "One of them recited Surat-ul-Fatiha." },
        { q: "What happened to the chief?", a: "He got up healed", wrong: ["He got worse", "He ran away", "Nothing"], why: "He got up as if released from a chain." },
        { q: "The Prophet ﷺ said they did right.", tf: true, why: "You have done the right thing." }
      ]
    },
    {
      slug: "mud-and-water",
      title: "Mud on his forehead",
      line: "Abu Sa'id saw mud on the Prophet's ﷺ forehead on Laylat al-Qadr.",
      facts: ["The Prophet ﷺ saw himself prostrating in mud and water.", "He said: seek Laylat al-Qadr in the odd last ten nights.", "That night it rained and the masjid roof leaked."],
      source: hadith("bukhari", "2027", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: I saw myself prostrating in mud and water on the morning of that night, so seek it in the odd nights of the last ten. It rained that night, the roof leaked, and I saw mud on his forehead on the morning of the twenty-first.", "I saw myself prostrating in mud and water"),
      difficulty: 4,
      questions: [
        { q: "When should we seek Laylat al-Qadr?", a: "Odd nights of the last ten", wrong: ["The first night", "Any day in Shawwal", "Only the 15th"], why: "Look for it in the last ten nights and the odd ones." },
        { q: "What did the Prophet ﷺ see himself doing?", a: "Prostrating in mud and water", wrong: ["Riding a camel", "Climbing a mountain", "Swimming"], why: "I saw myself prostrating in mud and water." },
        { q: "Rain fell on that night of Laylat al-Qadr.", tf: true, why: "It rained that night and the roof dribbled." }
      ]
    },
    {
      slug: "a-third",
      title: "A third of the Quran",
      line: "Abu Sa'id taught that Al-Ikhlas equals a third of the Quran.",
      facts: ["A man kept reciting Qul huwa Allahu ahad.", "Another thought that was too little.", "The Prophet ﷺ said: it equals a third of the Quran."],
      quote: quranQuote(112, 1),
      source: hadith("bukhari", "5013", "Abu Sa'id al-Khudri", "Sahih", "A man heard another reciting Say: He is Allah, One, again and again, and thought it was little. The Prophet ﷺ said: by Him in Whose hand is my soul, it equals a third of the Quran.", "this Surah is equal to one-third"),
      difficulty: 2,
      questions: [
        { q: "Which surah equals a third of the Quran?", a: "Al-Ikhlas", wrong: ["Al-Fatihah", "An-Nas", "Al-Kawthar"], why: "This surah is equal to one-third of the Quran." },
        { q: "How does Al-Ikhlas begin?", a: "Say: He is Allah, One", wrong: ["In the name of Allah", "Read!", "By the dawn"], why: "Say He is Allah, (the) One, 112:1." },
        { q: "The man thought reciting it was not enough.", tf: true, why: "He thought that it was not enough to recite." }
      ]
    },
    {
      slug: "my-companions",
      title: "Do not curse my companions",
      line: "Abu Sa'id narrated: do not curse my companions.",
      facts: ["The Prophet ﷺ said: do not abuse my companions.", "Gold like Mount Uhud from you would not equal their handful.", "This shows the high rank of the Sahabah."],
      source: hadith("bukhari", "3673", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said: do not abuse my companions; if one of you spent gold like Uhud, it would not equal a mudd of theirs, or even half of it.", "Do not abuse my companions"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ forbid about his companions?", a: "Abusing them", wrong: ["Learning from them", "Loving them", "Following them"], why: "Do not abuse my companions." },
        { q: "What would gold like Uhud not equal?", a: "A handful of theirs", wrong: ["A palace", "A big army", "A city"], why: "It would not equal a mudd or half a mudd of theirs." },
        { q: "The Sahabah have a very high rank.", tf: true, why: "Their small charity outweighs a mountain of ours." }
      ]
    },
    {
      slug: "changing-evil",
      title: "Change it with your hand",
      line: "Abu Sa'id taught: change wrong with hand, tongue or heart.",
      facts: ["A man spoke up when a governor put the Eid khutbah first.", "Abu Sa'id said: he has done his duty.", "Change wrong with your hand, then tongue, then heart."],
      source: hadith("muslim", "49a", "Abu Sa'id al-Khudri", "Sahih", "When the khutbah was put before the Eid prayer, a man objected. Abu Sa'id said: he has done his duty; I heard the Prophet ﷺ say: whoever sees a wrong, let him change it with his hand, if not then with his tongue, if not then hate it in his heart, and that is the weakest faith.", "He who amongst you sees something abominable should modify it with the help of his hand"),
      difficulty: 4,
      questions: [
        { q: "What is the first way to change a wrong?", a: "With your hand", wrong: ["With your heart", "By ignoring it", "By shouting"], why: "Modify it with the help of his hand." },
        { q: "What is the weakest level of faith?", a: "Hating it in your heart", wrong: ["Changing it by hand", "Speaking up", "Doing nothing"], why: "That is the least of faith." },
        { q: "Who said the man had done his duty?", a: "Abu Sa'id", wrong: ["Marwan", "Abu Jahl", "Wahshi"], why: "Abu Sa'id remarked: he has performed his duty." }
      ]
    }
  ]
};

const UTHMAN_MAZUN: DeepUnit = {
  key: "uthman-mazun",
  topicId: "sahabah",
  branchId: "sahabi-uthman-ibn-mazun",
  branch: { title: "Uthman ibn Maz'un", description: "An early emigrant devoted to worship, whose good deeds flowed like a spring." },
  name: "Uthman ibn Maz'un",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "balance",
      title: "No giving up marriage",
      line: "The Prophet ﷺ told Uthman ibn Maz'un not to give up marriage.",
      facts: ["Uthman ibn Maz'un wanted to give up marriage for worship.", "The Prophet ﷺ did not allow it.", "Islam asks for balance, not leaving the world."],
      source: hadith("bukhari", "5073", "Sa'd ibn Abi Waqqas", "Sahih", "The Prophet ﷺ forbade Uthman ibn Maz'un from giving up marriage; had he allowed him, others would have done the same.", "to abstain from marrying"),
      difficulty: 3,
      questions: [
        { q: "What did Uthman ibn Maz'un want to give up?", a: "Marriage", wrong: ["Prayer", "Fasting", "Charity"], why: "He wished to abstain from marrying." },
        { q: "Did the Prophet ﷺ allow it?", a: "No", wrong: ["Yes", "Only for a year", "Only in Makkah"], why: "He forbade Uthman ibn Maz'un." },
        { q: "Islam teaches balance in worship and life.", tf: true, why: "He was not allowed to leave marriage." }
      ]
    },
    {
      slug: "drawn-by-lot",
      title: "A home with the Ansar",
      line: "Uthman ibn Maz'un was given a home by lot with the Ansar.",
      facts: ["In Madinah, the Ansar drew lots to host the emigrants.", "Uthman came to the house of Umm al-Ala.", "She nursed him when he fell ill."],
      source: hadith("bukhari", "3929", "Umm al-Ala", "Sahih", "The Ansar drew lots for where the emigrants would live, and Uthman ibn Maz'un came to us. He fell ill and I nursed him until he died.", "the Ansar drew lots concerning the dwelling of the Emigrants"),
      difficulty: 2,
      questions: [
        { q: "How did the Ansar share out the emigrants?", a: "By drawing lots", wrong: ["By a race", "By money", "By age"], why: "The Ansar drew lots for the emigrants." },
        { q: "Whose house did Uthman live in?", a: "Umm al-Ala's", wrong: ["Abu Jahl's", "Caesar's", "Abu Lahab's"], why: "Uthman was decided to dwell with them." },
        { q: "Umm al-Ala nursed him when he was ill.", tf: true, why: "I nursed him till he died." }
      ]
    },
    {
      slug: "how-do-you-know",
      title: "How do you know?",
      line: "At his death, the Prophet ﷺ taught: only Allah knows our end.",
      facts: ["Umm al-Ala said: I testify that Allah has honored you.", "The Prophet ﷺ asked: how do you know?", "He said: I wish him good, but only Allah knows."],
      source: hadith("bukhari", "1243", "Umm al-Ala", "Sahih", "When Uthman ibn Maz'un died, I said: I testify that Allah has honored you. The Prophet ﷺ said: how do you know Allah has honored him? I wish him good, but by Allah, I do not know what Allah will do, though I am His Messenger.", "How do you know that Allah has honored him"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ ask Umm al-Ala?", a: "How do you know?", wrong: ["Where is he?", "Who washed him?", "Why cry?"], why: "How do you know that Allah has honored him?" },
        { q: "What does this teach us?", a: "Only Allah knows a person's end", wrong: ["We can be sure of Paradise", "Do not pray for the dead", "Never speak at funerals"], why: "I do not know what Allah will do." },
        { q: "Umm al-Ala later stopped declaring people righteous.", tf: true, why: "She said she would never attest anyone's righteousness after that." }
      ]
    },
    {
      slug: "flowing-spring",
      title: "A flowing spring",
      line: "Umm al-Ala dreamt of a flowing spring for Uthman ibn Maz'un.",
      facts: ["After his death, Umm al-Ala saw a dream.", "She saw a spring flowing for Uthman.", "The Prophet ﷺ said: it is his good deeds, still flowing."],
      source: hadith("bukhari", "7018", "Umm al-Ala", "Sahih", "Later I saw in a dream a flowing spring for Uthman. I told the Prophet ﷺ and he said: that is his good deeds, still going on for him.", "That is (the symbol of) his good deeds"),
      difficulty: 3,
      questions: [
        { q: "What did Umm al-Ala see in her dream?", a: "A flowing spring", wrong: ["A tall tree", "A palace", "A ship"], why: "I saw in a dream a flowing spring for Uthman." },
        { q: "What did the spring stand for?", a: "His good deeds", wrong: ["His wealth", "His house", "His camels"], why: "That is his good deeds." },
        { q: "Good deeds can keep giving reward after death.", tf: true, why: "Their reward is going on for him." }
      ]
    }
  ]
};

const ABU_DARDA: DeepUnit = {
  key: "abu-darda",
  topicId: "sahabah",
  branchId: "sahabi-abu-ad-darda",
  branch: { title: "Abu ad-Darda", description: "The Ansari who gathered the Quran and taught it in Damascus." },
  name: "Abu ad-Darda",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "four-who-gathered",
      title: "One of four",
      line: "Abu ad-Darda was one of four who gathered the whole Quran.",
      facts: ["Anas named four Ansar who had gathered the Quran.", "They were Abu ad-Darda, Mu'adh, Zayd ibn Thabit and Abu Zayd.", "He knew the whole Quran in the Prophet's ﷺ lifetime."],
      source: hadith("bukhari", "5004", "Anas ibn Malik", "Sahih", "When the Prophet ﷺ died, none had collected the Quran but four: Abu ad-Darda, Mu'adh ibn Jabal, Zayd ibn Thabit and Abu Zayd.", "none had collected … but four persons"),
      difficulty: 2,
      questions: [
        { q: "What had Abu ad-Darda gathered?", a: "The whole Quran", wrong: ["Gold coins", "An army", "Camels"], why: "None had collected the Quran but four." },
        { q: "Who else was among the four?", a: "Mu'adh ibn Jabal", wrong: ["Abu Jahl", "Abu Lahab", "Musaylimah"], why: "Mu'adh, Zayd ibn Thabit and Abu Zayd were the others." },
        { q: "Anas named four men who had gathered the Quran.", tf: true, why: "None had collected the Quran but four persons." }
      ]
    },
    {
      slug: "three-things",
      title: "Three things he never left",
      line: "Abu ad-Darda kept three things his Friend ﷺ taught him.",
      facts: ["Fast three days every month.", "Pray the forenoon prayer, called Duha.", "Do not sleep before praying Witr."],
      source: hadith("muslim", "722", "Abu Darda", "Sahih", "My Friend ﷺ told me to do three things I will never leave as long as I live: three fasts each month, the forenoon prayer, and not to sleep until I pray Witr.", "instructed me in three"),
      difficulty: 3,
      questions: [
        { q: "How many fasts each month did he keep?", a: "Three", wrong: ["One", "Ten", "Twenty"], why: "Three fasts during every month." },
        { q: "Which prayer did he pray before sleeping?", a: "Witr", wrong: ["Duha", "Eid", "Jumu'ah"], why: "I should not sleep till I have observed the Witr prayer." },
        { q: "Who did Abu ad-Darda call my Friend?", a: "The Prophet ﷺ", wrong: ["Salman", "Mu'awiyah", "Alqamah"], why: "My Friend ﷺ instructed me in three acts." }
      ]
    },
    {
      slug: "heaviest-on-the-scale",
      title: "Heaviest on the Scale",
      line: "Abu ad-Darda taught: good character is heaviest on the Scale.",
      facts: ["On the Day of Judgment, deeds are weighed.", "Nothing weighs more than good character.", "Allah dislikes the rude, foul-mouthed person."],
      source: hadith("tirmidhi", "2002", "Abu Darda", "Sahih (Al-Albani)", "Nothing is heavier on the believer's Scale on the Day of Judgment than good character, and Allah is angered by the shameless, obscene person.", "Nothing is heavier on the … Scale on the Day of Judgment than good character"),
      difficulty: 2,
      questions: [
        { q: "What is heaviest on the believer's Scale?", a: "Good character", wrong: ["Prayer at night", "Fasting", "Charity"], why: "Nothing is heavier than good character." },
        { q: "Whom does Allah dislike?", a: "The rude, foul-mouthed person", wrong: ["The kind person", "The patient person", "The shy person"], why: "Allah is angered by the shameless obscene person." },
        { q: "Good manners count on the Day of Judgment.", tf: true, why: "They are weighed on the Scale." }
      ]
    },
    {
      slug: "path-to-knowledge",
      title: "A journey for one hadith",
      line: "A man came to Damascus just to hear one hadith from him.",
      facts: ["Abu ad-Darda lived in Damascus.", "A man came all the way from Madinah only for a hadith.", "Seeking knowledge makes the road to Paradise easy."],
      source: hadith("tirmidhi", "2682", "Abu Darda", "Sahih (Al-Albani)", "A man came from Madinah to Abu ad-Darda in Damascus only to hear a hadith. He said: I heard the Prophet ﷺ say: whoever takes a path seeking knowledge, Allah makes a path to Paradise easy for him, and the angels lower their wings for the seeker of knowledge.", "Allah makes a path to Paradise easy for him"),
      difficulty: 3,
      questions: [
        { q: "Why did the man travel to Damascus?", a: "To hear one hadith", wrong: ["To trade", "To fight", "To visit family"], why: "I did not come except seeking this hadith." },
        { q: "What does Allah make easy for a seeker of knowledge?", a: "A path to Paradise", wrong: ["A path to riches", "A long life", "Many camels"], why: "Allah makes a path to Paradise easy for him." },
        { q: "Angels lower their wings for the seeker of knowledge.", tf: true, why: "The angels lower their wings in approval." }
      ]
    },
    {
      slug: "no-cursing",
      title: "Cursers cannot intercede",
      line: "Abu ad-Darda warned: people who curse will not intercede.",
      facts: ["Some people curse others easily.", "On Judgment Day they will not be witnesses.", "They will not intercede for anyone either."],
      source: hadith("muslim", "2598c", "Abu Darda", "Sahih", "I heard the Prophet ﷺ say: those who curse will be neither witnesses nor intercessors on the Day of Resurrection.", "neither be witness nor intercessor"),
      difficulty: 3,
      questions: [
        { q: "What will a curser not be on Judgment Day?", a: "A witness or intercessor", wrong: ["A guest", "A traveler", "A king"], why: "Neither witness nor intercessor." },
        { q: "What should a Muslim do with his tongue?", a: "Keep it from cursing", wrong: ["Curse when angry", "Shout at people", "Mock others"], why: "Cursing costs a great honor on that Day." },
        { q: "Cursing people is a small, harmless thing.", tf: false, why: "Cursers lose the honor of interceding." }
      ]
    },
    {
      slug: "prayer-remains",
      title: "Only the prayer is left",
      line: "In old age, Abu ad-Darda grieved that good habits were fading.",
      facts: ["He came home angry near the end of his life.", "People had left many good habits of the early days.", "Only the prayer in congregation still remained."],
      source: hadith("bukhari", "650", "Umm ad-Darda", "Sahih", "Abu ad-Darda came in angry and said: by Allah, I do not see the followers of Muhammad ﷺ keep the good they used to do, except praying in congregation.", "except the offering of congregational prayer"),
      difficulty: 4,
      questions: [
        { q: "Why was Abu ad-Darda angry?", a: "People left their good habits", wrong: ["He lost money", "He was hungry", "Someone took his camel"], why: "I do not find them doing the good things they used to do." },
        { q: "Which good deed did people still keep?", a: "Praying in congregation", wrong: ["Fasting every day", "Night travel", "Long trade trips"], why: "Except the offering of congregational prayer." },
        { q: "Who told this story about Abu ad-Darda?", a: "His wife Umm ad-Darda", wrong: ["Abu Jahl", "Caesar", "Alqamah"], why: "Salim heard Umm ad-Darda saying it." }
      ]
    }
  ]
};

const UBADAH: DeepUnit = {
  key: "ubadah",
  topicId: "sahabah",
  branchId: "sahabi-ubadah-ibn-as-samit",
  branch: { title: "Ubadah ibn as-Samit", description: "A leader of the Ansar at Aqabah who spoke the truth without fear." },
  name: "Ubadah ibn as-Samit",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "aqabah-and-badr",
      title: "From Aqabah to Badr",
      line: "Ubadah pledged at Aqabah and later fought at Badr.",
      facts: ["He was one of the Ansar at the night of Aqabah.", "He pledged to worship Allah alone and avoid sins.", "He then fought at Badr with the Prophet ﷺ."],
      source: hadith("bukhari", "3892", "Ubadah ibn as-Samit", "Sahih", "Ubadah, who fought at Badr and was at the Aqabah pledge, said: the Prophet ﷺ said: pledge to me not to worship anything besides Allah, not to steal and not to disobey me in good. So I gave him the pledge.", "had taken part in the battle of Badr"),
      difficulty: 2,
      questions: [
        { q: "Where did Ubadah give his first pledge?", a: "At Aqabah", wrong: ["At Tabuk", "In Taif", "In Sham"], why: "He was among the companions on the night of Aqabah." },
        { q: "Which battle did Ubadah fight in?", a: "Badr", wrong: ["Qadisiyyah", "Yarmuk only", "None"], why: "He had taken part in the battle of Badr." },
        { q: "The pledge said: worship nothing besides Allah.", tf: true, why: "You will not worship anything besides Allah." }
      ]
    },
    {
      slug: "speak-the-truth",
      title: "No fear of blame",
      line: "Ubadah pledged to say the truth and fear no one's blame.",
      facts: ["They pledged to listen and obey, active or tired.", "They promised to say the truth wherever they were.", "For Allah, they would not fear anyone's blame."],
      source: hadith("bukhari", "7199", "Ubadah ibn as-Samit", "Sahih", "We pledged to listen and obey when active and when tired, to say the truth wherever we were, and not to fear the blame of anyone for the sake of Allah.", "would not be afraid of the blame of the blamers"),
      difficulty: 3,
      questions: [
        { q: "What did they promise to say wherever they were?", a: "The truth", wrong: ["Only nice things", "Nothing at all", "Poems"], why: "We would say the truth wherever we might be." },
        { q: "What would they not fear for Allah's sake?", a: "People's blame", wrong: ["Allah", "The Day of Judgment", "Sins"], why: "We would not be afraid of the blame of the blamers." },
        { q: "They pledged to obey only when they felt active.", tf: false, why: "Both when active and when tired." }
      ]
    },
    {
      slug: "quarrel-and-qadr",
      title: "A quarrel and a lost date",
      line: "Ubadah told how a quarrel hid the date of Laylat al-Qadr.",
      facts: ["The Prophet ﷺ came out to tell the night's date.", "Two Muslims were quarreling, so the knowledge was taken.", "He said: that might be better; seek it on the 29th, 27th and 25th."],
      source: hadith("bukhari", "2023", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ came to tell us the date of the Night of Qadr, but two Muslims were quarreling, so it was taken away. That might be for your own good, so seek it on the 29th, 27th and 25th.", "that might be for your own good"),
      difficulty: 3,
      questions: [
        { q: "Why was the date of Laylat al-Qadr taken away?", a: "Two Muslims were quarreling", wrong: ["Rain fell", "The Quran ended", "A war began"], why: "Such-and-such persons were quarreling." },
        { q: "Which nights did he say to search?", a: "The 29th, 27th and 25th", wrong: ["The 1st and 2nd", "Only the 15th", "Any night of Shawwal"], why: "Search for it on the 29th, 27th and 25th." },
        { q: "Quarreling can take away blessings.", tf: true, why: "The news was taken away because of the quarrel." }
      ]
    },
    {
      slug: "ask-for-firdaus",
      title: "Ask for Al-Firdaus",
      line: "Ubadah narrated: Paradise has a hundred levels.",
      facts: ["Between two levels is like heaven and earth.", "Al-Firdaus is the highest level.", "The four rivers of Paradise flow from it."],
      source: hadith("tirmidhi", "2531", "Ubadah ibn as-Samit", "Sahih (Al-Albani)", "In Paradise there are a hundred levels; between every two is like between heaven and earth. Al-Firdaus is the highest, the four rivers flow from it, so when you ask Allah, ask Him for Al-Firdaus.", "ask Him for Al-Firdaus"),
      difficulty: 2,
      questions: [
        { q: "How many levels does Paradise have?", a: "A hundred", wrong: ["Seven", "Ten", "Three"], why: "In Paradise there are a hundred levels." },
        { q: "What is the highest level called?", a: "Al-Firdaus", wrong: ["Al-Kawthar", "As-Sirat", "Al-Bayt"], why: "Al-Firdaus is its highest level." },
        { q: "What should we ask Allah for?", a: "Al-Firdaus", wrong: ["The lowest level", "Only this world", "Nothing"], why: "When you ask Allah, ask Him for Al-Firdaus." }
      ]
    },
    {
      slug: "good-dreams",
      title: "A believer's good dream",
      line: "Ubadah narrated that a believer's good dream has great worth.",
      facts: ["Good dreams can come to a believer.", "They are one part of forty-six parts of prophethood.", "Prophethood ended, but good dreams remain."],
      source: hadith("bukhari", "6987", "Ubadah ibn as-Samit", "Sahih", "The Prophet ﷺ said: the good dream of a believer is one of forty-six parts of prophethood.", "forty-six parts of prophetism"),
      difficulty: 3,
      questions: [
        { q: "A good dream is one of how many parts?", a: "Forty-six", wrong: ["Ten", "Seven", "A hundred"], why: "A part of the forty-six parts of prophetism." },
        { q: "Whose good dreams are meant?", a: "A believer's", wrong: ["Anyone's at all", "Only kings'", "Only children's"], why: "The good dreams of a faithful believer." },
        { q: "Good dreams are a gift to believers.", tf: true, why: "They are a part of prophethood." }
      ]
    },
    {
      slug: "by-the-sea",
      title: "A home by the sea",
      line: "Ubadah later lived by the sea at Hims with Umm Haram.",
      facts: ["His wife was Umm Haram bint Milhan.", "She heard about the first sea army of Muslims.", "The Prophet ﷺ told her: you are among them."],
      source: hadith("bukhari", "2924", "Umm Haram", "Sahih", "Umair visited Ubadah ibn as-Samit at his house on the coast of Hims with his wife Umm Haram. She said she heard the Prophet ﷺ say: Paradise is granted to the first of my ummah who sail to fight in Allah's way. She asked: will I be among them? He said: you are among them.", "the first batch of my followers who will undertake a naval expedition"),
      difficulty: 4,
      questions: [
        { q: "Where did Ubadah live in later years?", a: "By the sea at Hims", wrong: ["In Yemen", "In Makkah", "In Egypt"], why: "His house at the sea-shore of Hims." },
        { q: "Who was Ubadah's wife?", a: "Umm Haram", wrong: ["Umm Salamah", "Umm Ayman", "Umm al-Ala"], why: "He stayed with his wife Um Haram." },
        { q: "What was promised to the first sea army?", a: "Paradise", wrong: ["Gold", "Ships", "Land"], why: "Paradise is granted to the first batch." }
      ]
    },
    {
      slug: "last-hadith",
      title: "Saved for his last day",
      line: "Before dying, Ubadah shared a hadith he had kept back.",
      facts: ["A student cried at his bedside.", "Ubadah said: I kept one hadith to tell you now.", "Whoever testifies to the Shahadah, Allah forbids him the Fire."],
      source: hadith("muslim", "29", "Ubadah ibn as-Samit", "Sahih", "As-Sunabihi visited Ubadah at his death and wept. Ubadah said: I have told you all I heard that benefits you, except one hadith I tell you today: whoever testifies there is no god but Allah and Muhammad is His Messenger, Allah forbids the Fire for him.", "Allah would prohibit the fire of Hell for him"),
      difficulty: 4,
      questions: [
        { q: "When did Ubadah share that hadith?", a: "At his deathbed", wrong: ["At Badr", "In Ramadan", "At a wedding"], why: "I am going to breathe my last." },
        { q: "What does Allah forbid for one who says the Shahadah?", a: "The Fire", wrong: ["Hunger", "Sadness", "Questioning in the grave"], why: "Allah would prohibit the fire of Hell for him." },
        { q: "Who wept at Ubadah's bedside?", a: "As-Sunabihi", wrong: ["Abu Jahl", "Umm Haram", "Alqamah"], why: "Sunabihi went to him when he was about to die." }
      ]
    }
  ]
};

const SAD_UBADAH: DeepUnit = {
  key: "sad-ubadah",
  topicId: "sahabah",
  branchId: "sahabi-sad-ibn-ubadah",
  branch: { title: "Sa'd ibn Ubadah", description: "The generous chief of the Khazraj, famous for his charity." },
  name: "Sa'd ibn Ubadah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "into-the-sea",
      title: "Into the sea with you",
      line: "Before Badr, Sa'd said: we would ride into the sea for you.",
      facts: ["News came that Abu Sufyan's caravan was near.", "The Prophet ﷺ asked his companions for advice.", "Sa'd stood up for the Ansar and promised to follow."],
      source: hadith("muslim", "1779", "Anas ibn Malik", "Sahih", "When news of Abu Sufyan came, the Prophet ﷺ asked for advice. Sa'd ibn Ubadah stood and said: you want us to speak? By Allah, if you order us to plunge our horses into the sea, we would do so. Then they set out and camped at Badr.", "plunge our horses into the sea, we would do so"),
      difficulty: 3,
      questions: [
        { q: "What did Sa'd say they would ride into?", a: "The sea", wrong: ["A fire", "A cave", "A desert storm"], why: "If you order us to plunge our horses into the sea, we would." },
        { q: "Where did the Muslims camp after that?", a: "At Badr", wrong: ["At Tabuk", "At Hunayn", "At Khaybar"], why: "They set out and encamped at Badr." },
        { q: "The Prophet ﷺ asked his companions for advice.", tf: true, why: "He held consultations with his Companions." }
      ]
    },
    {
      slug: "garden-for-mother",
      title: "A garden for his mother",
      line: "Sa'd gave his garden Al-Mikhraf as charity for his mother.",
      facts: ["His mother died while he was away.", "He asked: will charity for her benefit her?", "The Prophet ﷺ said yes, so he gave his garden."],
      source: hadith("bukhari", "2756", "Ibn Abbas", "Sahih", "Sa'd ibn Ubadah's mother died while he was away. He asked: will charity on her behalf benefit her? The Prophet ﷺ said yes. Sa'd said: I make you witness that my garden Al-Mikhraf is charity for her.", "I gave my garden called Al Makhraf in charity on her behalf"),
      difficulty: 2,
      questions: [
        { q: "What did Sa'd give for his mother?", a: "His garden", wrong: ["His sword", "His house", "His camel"], why: "I gave my garden called Al-Makhraf in charity." },
        { q: "Does charity for a dead parent help them?", a: "Yes", wrong: ["No", "Only gold helps", "Only in Ramadan"], why: "The Prophet ﷺ said yes." },
        { q: "Sa'd was with his mother when she died.", tf: false, why: "She died in his absence." }
      ]
    },
    {
      slug: "her-vow",
      title: "Keeping her promise",
      line: "Sa'd asked what to do about a vow his mother never kept.",
      facts: ["His mother made a vow to Allah.", "She died before she could fulfil it.", "The Prophet ﷺ told Sa'd: fulfil it for her."],
      source: hadith("bukhari", "6959", "Ibn Abbas", "Sahih", "Sa'd ibn Ubadah asked the Prophet ﷺ about a vow his mother made and died before keeping. He said: fulfil it on her behalf.", "Fulfill it on her behalf"),
      difficulty: 3,
      questions: [
        { q: "What had his mother left unfinished?", a: "A vow", wrong: ["A journey", "A house", "A poem"], why: "A vow made by his mother who died before fulfilling it." },
        { q: "What did the Prophet ﷺ tell Sa'd to do?", a: "Fulfil it for her", wrong: ["Forget it", "Pay a fine", "Wait a year"], why: "Fulfill it on her behalf." },
        { q: "A child can help a parent after death.", tf: true, why: "He could fulfil her vow for her." }
      ]
    },
    {
      slug: "visiting-sad",
      title: "Barefoot to visit him",
      line: "The Prophet ﷺ and his companions walked barefoot to visit Sa'd.",
      facts: ["The Prophet ﷺ asked: how is my brother Sa'd?", "He asked: who will visit him with me?", "Over ten went, without shoes, across rough ground."],
      source: hadith("muslim", "925", "Abdullah ibn Umar", "Sahih", "The Prophet ﷺ asked an Ansari: how is my brother Sa'd ibn Ubadah? Then he said: who will visit him? He stood and more than ten of us went with him, without shoes or caps, across barren land until we reached him.", "Who amongst you would visit him"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ call Sa'd?", a: "My brother", wrong: ["My son", "My servant", "My guard"], why: "How is my brother Sa'd?" },
        { q: "How many went with the Prophet ﷺ?", a: "More than ten", wrong: ["Two", "A hundred", "None"], why: "We were more than ten persons." },
        { q: "Visiting the sick is a good Sunnah.", tf: true, why: "The Prophet ﷺ himself went to visit Sa'd." }
      ]
    },
    {
      slug: "tears-are-allowed",
      title: "Tears are not a sin",
      line: "At Sa'd's sickbed, the Prophet ﷺ wept and taught about tears.",
      facts: ["Sa'd was very ill, with his family around him.", "The Prophet ﷺ wept, and the people wept too.", "He said: Allah does not punish for tears or a sad heart."],
      source: hadith("bukhari", "1304", "Abdullah ibn Umar", "Sahih", "Sa'd ibn Ubadah fell ill and the Prophet ﷺ visited him with Abdur-Rahman ibn Awf, Sa'd ibn Abi Waqqas and Ibn Mas'ud. He wept and the people wept. He said: Allah does not punish for tears or for the grief of the heart, but for this, and he pointed to his tongue.", "Allah does not punish for shedding tears, nor for the grief of the heart"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ do at Sa'd's bedside?", a: "He wept", wrong: ["He laughed", "He left", "He shouted"], why: "The Prophet ﷺ wept and the people wept." },
        { q: "What does Allah not punish for?", a: "Tears and a sad heart", wrong: ["Lying", "Stealing", "Cursing"], why: "Allah does not punish for shedding tears." },
        { q: "To what did he point as the real danger?", a: "His tongue", wrong: ["His eyes", "His hands", "His feet"], why: "He pointed to his tongue." }
      ]
    },
    {
      slug: "among-the-best",
      title: "Among the best is enough",
      line: "Sa'd learned that being among the best is enough.",
      facts: ["The Prophet ﷺ ranked the best families of the Ansar.", "Sa'd's clan, Banu Sa'idah, came fourth.", "He was told: is being among the best not enough?"],
      source: hadith("bukhari", "3791", "Abu Humayd as-Sa'idi", "Sahih", "The Prophet ﷺ named the best homes of the Ansar, with Banu Sa'idah after three others, and said: in all the homes of the Ansar there is good. Sa'd ibn Ubadah said: you made us last. He said: is it not enough that you are among the best?", "sufficient that you are regarded amongst the best"),
      difficulty: 4,
      questions: [
        { q: "What was Sa'd's clan called?", a: "Banu Sa'idah", wrong: ["Banu Hashim", "Banu Umayyah", "Quraysh"], why: "Then that of Banu Saida." },
        { q: "What did the Prophet ﷺ say about all Ansar homes?", a: "There is good in all of them", wrong: ["Some are bad", "Only one is good", "None is good"], why: "There is good in all the homes of the Ansar." },
        { q: "Sa'd's clan was named among the best.", tf: true, why: "You are regarded amongst the best." }
      ]
    }
  ]
};

const IBN_AMR: DeepUnit = {
  key: "ibn-amr",
  topicId: "sahabah",
  branchId: "sahabi-abdullah-ibn-amr",
  branch: { title: "Abdullah ibn Amr", description: "The young companion who wrote down hadith and loved worship." },
  name: "Abdullah ibn Amr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "write-it-down",
      title: "Write it down",
      line: "Abdullah ibn Amr wrote down what he heard from the Prophet ﷺ.",
      facts: ["He wrote every word to memorise it.", "Some told him to stop, as people speak in anger too.", "The Prophet ﷺ said: write, only truth comes from me."],
      source: hadith("abudawud", "3646", "Abdullah ibn Amr", "Sahih (Al-Albani)", "I used to write everything I heard from the Prophet ﷺ to memorise it. Quraysh told me to stop, saying he speaks in anger and pleasure. He pointed to his mouth and said: write, by Him in Whose hand is my soul, only truth comes out of it.", "only right comes out from it"),
      difficulty: 2,
      questions: [
        { q: "What did Abdullah ibn Amr do with hadith?", a: "He wrote them down", wrong: ["He hid them", "He sold them", "He forgot them"], why: "I used to write everything which I heard." },
        { q: "What did the Prophet ﷺ tell him?", a: "Write", wrong: ["Stop writing", "Burn them", "Only listen"], why: "Write, only right comes out from it." },
        { q: "The Prophet ﷺ only spoke the truth.", tf: true, why: "Only right comes out from it." }
      ]
    },
    {
      slug: "more-than-abu-hurairah",
      title: "Even more than Abu Hurairah",
      line: "Abu Hurairah said Abdullah ibn Amr had more hadith: he wrote.",
      facts: ["Abu Hurairah narrated a great number of hadith.", "He said only Abdullah ibn Amr had more.", "Writing them down kept them safe."],
      source: hadith("bukhari", "113", "Abu Hurairah", "Sahih", "None of the companions narrated more hadith than me except Abdullah ibn Amr, who used to write them, and I did not.", "who used to write them and I never did the same"),
      difficulty: 3,
      questions: [
        { q: "Who said Abdullah ibn Amr had more hadith?", a: "Abu Hurairah", wrong: ["Abu Jahl", "Wahshi", "Caesar"], why: "There is none who narrated more than I except Abdullah ibn Amr." },
        { q: "Why did Abdullah ibn Amr have more?", a: "He wrote them down", wrong: ["He was older", "He was a king", "He traveled less"], why: "He used to write them and I never did the same." },
        { q: "Abu Hurairah also wrote his hadith down.", tf: false, why: "I never did the same." }
      ]
    },
    {
      slug: "seven-days",
      title: "Not faster than seven days",
      line: "He was told: never finish the Quran in under seven days.",
      facts: ["He wanted to recite the whole Quran very often.", "The Prophet ﷺ first said: finish it in a month.", "He asked for more, and was told: not less than seven days."],
      source: hadith("bukhari", "5054", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: recite the whole Quran in a month. I said: I can do more. He said: then finish it in seven days, and not in less than that.", "in seven days, and do not finish it in less than this period"),
      difficulty: 3,
      questions: [
        { q: "What was the first advice for finishing the Quran?", a: "Once a month", wrong: ["Once a year", "Once a day", "Never"], why: "Recite the whole Quran in one month." },
        { q: "What was the shortest time he was allowed?", a: "Seven days", wrong: ["One day", "Three hours", "One night"], why: "Do not finish it in less than this period." },
        { q: "Islam asks for steady worship we can keep.", tf: true, why: "He was given a limit he could keep up." }
      ]
    },
    {
      slug: "fast-of-dawud",
      title: "The fast of Prophet Dawud",
      line: "Abdullah ibn Amr learned the best fast: one day on, one off.",
      facts: ["He vowed to fast every day and pray all night.", "The Prophet ﷺ said: you cannot keep that up.", "The best is Dawud's fast: fast one day, eat the next."],
      source: hadith("bukhari", "1976", "Abdullah ibn Amr", "Sahih", "I had vowed to fast daily and pray all night. The Prophet ﷺ said: you cannot do that; fast three days a month. I said I could do more, until he said: fast one day and leave one day, that is the fasting of Dawud, and it is the best fasting.", "that is the fasting of Prophet David and that is the best fasting"),
      difficulty: 4,
      questions: [
        { q: "What had Abdullah ibn Amr vowed?", a: "To fast every day", wrong: ["To never fast", "To travel", "To build a masjid"], why: "I had taken an oath to fast daily." },
        { q: "What is the fast of Dawud?", a: "One day on, one day off", wrong: ["Every single day", "Once a year", "Only Mondays"], why: "Fast one day and give up fasting for a day." },
        { q: "Which fast did the Prophet ﷺ call the best?", a: "The fast of Dawud", wrong: ["Fasting every day", "Fasting with no suhur", "Fasting all year"], why: "That is the best fasting." }
      ]
    },
    {
      slug: "tongue-and-hand",
      title: "Safe from your tongue",
      line: "He narrated: a Muslim keeps people safe from his tongue.",
      facts: ["A true Muslim does not hurt people.", "Not with words, and not with his hands.", "A true emigrant leaves what Allah forbade."],
      source: hadith("bukhari", "10", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: a Muslim is one from whose tongue and hand the Muslims are safe, and an emigrant is one who leaves what Allah has forbidden.", "A Muslim is the one who avoids harming Muslims with his tongue and hands"),
      difficulty: 2,
      questions: [
        { q: "A Muslim keeps others safe from what?", a: "His tongue and hand", wrong: ["His money", "His house", "His camel"], why: "Avoids harming Muslims with his tongue and hands." },
        { q: "Who is a true emigrant?", a: "One who leaves what Allah forbade", wrong: ["One who moves often", "One who travels for trade", "One who never moves"], why: "Gives up all that Allah has forbidden." },
        { q: "Hurtful words go against being a good Muslim.", tf: true, why: "A Muslim avoids harm with his tongue." }
      ]
    },
    {
      slug: "even-one-ayah",
      title: "Pass on even one ayah",
      line: "He narrated: pass on from me, even if just one ayah.",
      facts: ["Everyone can teach something they know.", "Even one sentence of the religion is worth passing on.", "Lying about the Prophet ﷺ is a grave sin."],
      source: hadith("bukhari", "3461", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said: convey from me even if it is one ayah. Whoever lies about me on purpose, let him take his seat in the Fire.", "Convey (my teachings) to the people even if it were a single sentence"),
      difficulty: 3,
      questions: [
        { q: "How much should we pass on?", a: "Even one ayah", wrong: ["Only whole books", "Nothing", "Only when old"], why: "Even if it were a single sentence." },
        { q: "What is the punishment for lying about him ﷺ on purpose?", a: "A seat in the Fire", wrong: ["Nothing", "A small fine", "A warning only"], why: "He will surely take his place in the Fire." },
        { q: "Only scholars may share what they learned.", tf: false, why: "Convey even a single sentence." }
      ]
    }
  ]
};

const IBN_SALAM: DeepUnit = {
  key: "ibn-salam",
  topicId: "sahabah",
  branchId: "sahabi-abdullah-ibn-salam",
  branch: { title: "Abdullah ibn Salam", description: "A learned rabbi of Madinah who knew the truth and accepted Islam." },
  name: "Abdullah ibn Salam",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "not-a-liars-face",
      title: "Not the face of a liar",
      line: "One look at the Prophet's ﷺ face, and Abdullah saw truth.",
      facts: ["People rushed out when the Prophet ﷺ reached Madinah.", "Abdullah looked at his face and saw honesty.", "His first words: spread salam, feed people, pray at night."],
      source: hadith("tirmidhi", "2485", "Abdullah ibn Salam", "Sahih (Al-Albani)", "When the Prophet ﷺ arrived in Madinah I went to look at him, and when I saw his face I knew it was not the face of a liar. The first thing he said was: spread the salam, feed people, and pray while people sleep; you will enter Paradise in peace.", "this face was not the face of a liar"),
      difficulty: 2,
      questions: [
        { q: "What did Abdullah see in the Prophet's ﷺ face?", a: "Truthfulness", wrong: ["Anger", "Fear", "Pride"], why: "This face was not the face of a liar." },
        { q: "Which deed was among the first words?", a: "Spread the salam", wrong: ["Build towers", "Collect gold", "Fight everyone"], why: "Spread the Salam, feed others." },
        { q: "He told people to pray while others sleep.", tf: true, why: "Perform Salat while the people are sleeping." }
      ]
    },
    {
      slug: "three-questions",
      title: "Three questions",
      line: "He asked three questions only a prophet could answer.",
      facts: ["He asked about the first sign of the Hour.", "He asked about the first food of Paradise.", "Hearing the answers, he said: you are Allah's Messenger."],
      source: hadith("bukhari", "3329", "Anas ibn Malik", "Sahih", "Abdullah ibn Salam came and said: I will ask you three things only a prophet knows: the first sign of the Hour, the first meal of the people of Paradise, and why a child looks like a parent. The Prophet ﷺ answered, and Abdullah said: I testify that you are the Messenger of Allah.", "I testify that you are the Messenger of Allah"),
      difficulty: 3,
      questions: [
        { q: "How many questions did he ask?", a: "Three", wrong: ["One", "Ten", "Seven"], why: "I am going to ask you about three things." },
        { q: "Who could answer such questions, he said?", a: "Only a prophet", wrong: ["Any poet", "A king", "A merchant"], why: "Nobody knows them except a prophet." },
        { q: "What did he say after the answers?", a: "You are Allah's Messenger", wrong: ["I need more time", "I will ask my friends", "I am not sure"], why: "I testify that you are the Messenger of Allah." }
      ]
    },
    {
      slug: "a-witness",
      title: "A witness from Bani Isra'il",
      line: "Sa'd said Abdullah ibn Salam was named a man of Paradise.",
      facts: ["Sa'd heard the Prophet ﷺ say he is of Paradise's people.", "An ayah tells of a witness from Bani Isra'il.", "The witness believed, as Abdullah did."],
      quote: quranQuote(46, 10),
      source: hadith("bukhari", "3812", "Sa'd ibn Abi Waqqas", "Sahih", "I never heard the Prophet ﷺ say of anyone walking on earth that he is of the people of Paradise except Abdullah ibn Salam, and about him came the ayah: a witness from the Children of Israel testifies.", "And a witness from the children of Israel testifies"),
      difficulty: 3,
      questions: [
        { q: "Who told of his place in Paradise?", a: "Sa'd ibn Abi Waqqas", wrong: ["Abu Jahl", "Abu Lahab", "Musaylimah"], why: "Sa'd heard the Prophet ﷺ say it." },
        { q: "Where is the ayah about the witness?", a: "Surah Al-Ahqaf", wrong: ["Surah Al-Fatihah", "Surah An-Nas", "Surah Al-Kawthar"], why: "Quran 46:10, in Surah Al-Ahqaf." },
        { q: "The witness came from Bani Isra'il.", tf: true, why: "A witness from the children of Israel testifies." }
      ]
    },
    {
      slug: "the-handhold",
      title: "The firm handhold",
      line: "Abdullah dreamt he held a handhold at the top of a pillar.",
      facts: ["He saw a green garden with a tall pillar.", "He climbed it and held a handhold at the top.", "The Prophet ﷺ said: you will hold Islam until you die."],
      source: hadith("bukhari", "7010", "Abdullah ibn Salam", "Sahih", "People said he is of the people of Paradise. He said: they should not say what they do not know. I dreamt of a pillar in a green garden with a handhold at its top, and I climbed and held it. The Prophet ﷺ said: Abdullah will die holding the firm handhold.", "will die while still holding the firm reliable handhold"),
      difficulty: 4,
      questions: [
        { q: "What did he hold in his dream?", a: "A handhold on a pillar", wrong: ["A sword", "A lamp", "A book"], why: "I got hold of the handhold." },
        { q: "What does the firm handhold mean?", a: "Islam", wrong: ["Wealth", "The tribe", "The sword"], why: "The firm reliable handhold, which is Islam." },
        { q: "What did he say about praising people?", a: "Do not say what you do not know", wrong: ["Praise everyone", "Praise only kings", "Never speak"], why: "They ought not to have said things of which they have no knowledge." }
      ]
    },
    {
      slug: "a-blessed-bowl",
      title: "A bowl he drank from",
      line: "Ibn Salam served guests from a bowl the Prophet ﷺ used.",
      facts: ["Abu Burdah visited him in Madinah.", "He served him sawiq and dates.", "He let him drink from a bowl the Prophet ﷺ drank from."],
      source: hadith("bukhari", "7342", "Abu Burdah", "Sahih", "When I came to Madinah, Abdullah ibn Salam said: come to my house so I can give you a drink from a bowl the Prophet ﷺ drank from, and you can pray in the masjid he prayed in. He gave me sawiq and dates, then I prayed in his masjid.", "drink from a bowl from which … used to drink"),
      difficulty: 2,
      questions: [
        { q: "What did he serve his guest?", a: "Sawiq and dates", wrong: ["Roast meat", "Honey cakes", "Nothing"], why: "He made me drink Sawiq and gave me dates." },
        { q: "What was special about the bowl?", a: "The Prophet ﷺ drank from it", wrong: ["It was gold", "It was huge", "It came from Rome"], why: "A bowl from which the Messenger ﷺ used to drink." },
        { q: "Abdullah ibn Salam was a kind host.", tf: true, why: "He invited his guest home and fed him." }
      ]
    }
  ]
};

const BARA: DeepUnit = {
  key: "bara",
  topicId: "sahabah",
  branchId: "sahabi-al-bara-ibn-azib",
  branch: { title: "Al-Bara ibn Azib", description: "A young Ansari who grew up beside the Prophet ﷺ and told what he saw." },
  name: "Al-Bara ibn Azib",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "too-young-for-badr",
      title: "Too young for Badr",
      line: "Al-Bara and Ibn Umar were sent home, too young for Badr.",
      facts: ["Al-Bara wanted to join the army at Badr.", "He and Ibn Umar were judged too young.", "The emigrants at Badr were over sixty men."],
      source: hadith("bukhari", "3956", "Al-Bara ibn Azib", "Sahih", "I and Ibn Umar were considered too young for Badr. The emigrants there were over sixty and the Ansar over two hundred and forty.", "were considered too young (to take part) in the battle of Badr"),
      difficulty: 2,
      questions: [
        { q: "Why did Al-Bara miss Badr?", a: "He was too young", wrong: ["He was ill", "He was traveling", "He was afraid"], why: "We were considered too young." },
        { q: "Who else was too young for Badr?", a: "Ibn Umar", wrong: ["Hamzah", "Abu Bakr", "Umar"], why: "I and Ibn Umar were considered too young." },
        { q: "Young companions were eager to serve Islam.", tf: true, why: "They came forward even as boys." }
      ]
    },
    {
      slug: "the-new-qiblah",
      title: "Turning to the Kaaba",
      line: "Al-Bara told how the qiblah turned from Jerusalem to the Kaaba.",
      facts: ["In Madinah, Muslims first faced Jerusalem in prayer.", "That lasted sixteen or seventeen months.", "Then the qiblah became the Kaaba, first at Asr."],
      source: hadith("bukhari", "40", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ prayed facing Jerusalem for sixteen or seventeen months, wishing to face the Kaaba. The first prayer he prayed facing the Kaaba was Asr. A man who prayed with him passed people bowing toward Jerusalem, told them, and they turned to the Kaaba at once.", "for sixteen or seventeen months"),
      difficulty: 3,
      questions: [
        { q: "Which way did Muslims first pray in Madinah?", a: "Toward Jerusalem", wrong: ["Toward Yemen", "Toward the sea", "Any direction"], why: "He offered his prayers facing Baitul-Maqdis." },
        { q: "Which was the first prayer toward the Kaaba?", a: "Asr", wrong: ["Fajr", "Isha", "Jumu'ah"], why: "The first prayer facing the Kaaba was the Asr prayer." },
        { q: "The people bowing turned to the Kaaba right away.", tf: true, why: "They changed their direction immediately." }
      ]
    },
    {
      slug: "bedtime-dua",
      title: "Words before sleep",
      line: "The Prophet ﷺ taught Al-Bara a du'a to say before sleeping.",
      facts: ["Make wudu, then lie on your right side.", "Say: O Allah, I surrender myself to You.", "If you die that night, you die on Islam."],
      source: hadith("bukhari", "247", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ told me: when you go to bed, make wudu as for prayer, lie on your right side and say: O Allah, I submit myself to You, entrust my affairs to You and rely on You. If you die that night, you die on the fitrah; make these your last words.", "lie on your right side"),
      difficulty: 3,
      questions: [
        { q: "What should you do before bed?", a: "Make wudu", wrong: ["Eat a big meal", "Watch the stars", "Run"], why: "Perform ablution like that for the prayer." },
        { q: "On which side should you lie?", a: "The right side", wrong: ["The left side", "On your back", "Face down"], why: "Lie on your right side." },
        { q: "What if you die that night?", a: "You die on Islam", wrong: ["Nothing at all", "You lose reward", "You wake up"], why: "You will die with faith." }
      ]
    },
    {
      slug: "digging-the-trench",
      title: "Dust on his chest",
      line: "Al-Bara saw the Prophet ﷺ carry earth while digging the Trench.",
      facts: ["The Muslims dug a trench around Madinah.", "The Prophet ﷺ carried earth until dust covered him.", "He sang: without You, O Allah, we would have no guidance."],
      source: hadith("bukhari", "2837", "Al-Bara ibn Azib", "Sahih", "On the day of Al-Ahzab I saw the Prophet ﷺ carrying earth until it covered his belly, and he was saying: O Allah, without You we would not have been guided, nor given charity, nor prayed; send down calm on us and make our feet firm.", "Without You (O Allah!) we would have got no guidance"),
      difficulty: 2,
      questions: [
        { q: "What was the Prophet ﷺ carrying?", a: "Earth from the trench", wrong: ["A flag", "Water jars", "Swords"], why: "I saw the Prophet ﷺ carrying earth." },
        { q: "What did he ask Allah for?", a: "Calm and firm feet", wrong: ["Gold and silver", "A palace", "Rain"], why: "Bless us with tranquility and make firm our feet." },
        { q: "The Prophet ﷺ worked alongside his companions.", tf: true, why: "He carried earth himself." }
      ]
    },
    {
      slug: "seven-and-seven",
      title: "Seven to do",
      line: "Al-Bara narrated seven good things the Prophet ﷺ told us to do.",
      facts: ["Follow funerals and visit the sick.", "Accept invitations and help the wronged.", "Keep oaths, return salam, and answer a sneezer."],
      source: hadith("bukhari", "1239", "Al-Bara ibn Azib", "Sahih", "The Prophet ﷺ ordered us seven things: to follow funerals, visit the sick, accept invitations, help the oppressed, fulfil oaths, return the greeting and reply to one who sneezes. He forbade us silver vessels, gold rings and silk.", "ordered us to do seven things"),
      difficulty: 3,
      questions: [
        { q: "How many things were they ordered to do?", a: "Seven", wrong: ["Two", "Ten", "Forty"], why: "He ordered us to do seven things." },
        { q: "Which is one of the seven?", a: "Visiting the sick", wrong: ["Skipping prayer", "Mocking others", "Wasting food"], why: "To visit the sick." },
        { q: "Helping the wronged is one of the seven.", tf: true, why: "To help the oppressed." }
      ]
    },
    {
      slug: "no-retreat",
      title: "He did not run",
      line: "Al-Bara told how the Prophet ﷺ stood firm at Hunayn.",
      facts: ["Arrows fell on the Muslims at Hunayn.", "Hasty ones ran, but the Prophet ﷺ did not.", "On his white mule he said: I am the Prophet ﷺ in truth."],
      source: hadith("bukhari", "2874", "Al-Bara ibn Azib", "Sahih", "A man asked: did you flee at Hunayn? He said: no, by Allah, the Prophet ﷺ did not flee, but hasty people did when Hawazin shot arrows. He was on his white mule saying: I am the Prophet in truth, I am the son of Abdul-Muttalib.", "the Prophet (ﷺ) did not flee"),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ ride at Hunayn?", a: "A white mule", wrong: ["A black horse", "A camel", "A donkey"], why: "He was riding his white mule." },
        { q: "What did the Prophet ﷺ say?", a: "I am the Prophet ﷺ in truth", wrong: ["Run away", "I give up", "Hide quickly"], why: "I am the Prophet ﷺ in truth." },
        { q: "The Prophet ﷺ fled from the arrows.", tf: false, why: "The Prophet ﷺ did not flee." }
      ]
    }
  ]
};

const ASMA: DeepUnit = {
  key: "asma",
  topicId: "sahabah",
  branchId: "sahabi-asma-bint-abi-bakr",
  branch: { title: "Asma bint Abi Bakr", description: "Abu Bakr's brave daughter, who helped the Hijrah and lived a life of giving." },
  name: "Asma bint Abi Bakr",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "two-belts",
      title: "The woman of two belts",
      line: "Asma cut her belt in two to tie food for the Hijrah.",
      facts: ["She packed food for the Prophet ﷺ and Abu Bakr.", "Nothing was found to tie the bags with.", "She split her waist belt and was called Dhat an-Nitaqayn."],
      source: hadith("bukhari", "2979", "Asma bint Abi Bakr", "Sahih", "I prepared the journey food for the Prophet ﷺ in Abu Bakr's house when he set out for Madinah, and found nothing to tie it with except my waist belt. Abu Bakr said: cut it in two, and tie the water skin with one and the food with the other. So she was called Dhat an-Nitaqayn.", "except my waist belt"),
      difficulty: 2,
      questions: [
        { q: "What did Asma use to tie the food?", a: "Her waist belt, cut in two", wrong: ["A camel rope", "Her shoes", "A palm leaf"], why: "I do not find anything to tie except my waist belt." },
        { q: "What does Dhat an-Nitaqayn mean?", a: "The one with two belts", wrong: ["The brave rider", "The poet", "The trader"], why: "That was the reason for calling her two-belted woman." },
        { q: "Asma helped the Hijrah journey.", tf: true, why: "She prepared the journey food." }
      ]
    },
    {
      slug: "hard-work",
      title: "Date stones on her head",
      line: "Asma carried date stones on her head from far fields.",
      facts: ["Her husband was Az-Zubair ibn al-Awwam.", "She carried date stones from his land.", "She walked about two miles each way."],
      source: hadith("bukhari", "3151", "Asma bint Abi Bakr", "Sahih", "I used to carry date stones on my head from the land of Az-Zubair that the Prophet ﷺ had given him, two thirds of a farsakh from my house.", "I used to carry the date stones on my head"),
      difficulty: 3,
      questions: [
        { q: "What did Asma carry on her head?", a: "Date stones", wrong: ["Gold", "Books", "Water only"], why: "I used to carry the date stones on my head." },
        { q: "Who was Asma's husband?", a: "Az-Zubair", wrong: ["Khalid", "Bilal", "Salman"], why: "From the land of Az-Zubair." },
        { q: "Asma worked hard for her family.", tf: true, why: "She carried loads from a far field." }
      ]
    },
    {
      slug: "give-freely",
      title: "Do not hold it back",
      line: "The Prophet ﷺ told Asma: give charity and do not hold back.",
      facts: ["Asma had only what her husband gave her.", "She asked: may I give charity from it?", "He said: give, or Allah will hold back from you."],
      source: hadith("bukhari", "2590", "Asma bint Abi Bakr", "Sahih", "I said: I have nothing except what Az-Zubair gives me; may I give charity? He said: give in charity and do not hold it back, or Allah will hold it back from you.", "Give in charity and do not withhold it"),
      difficulty: 2,
      questions: [
        { q: "What did Asma ask the Prophet ﷺ?", a: "May I give charity?", wrong: ["May I travel?", "May I fast?", "May I sell land?"], why: "May I give in charity?" },
        { q: "What happens if we hold back charity?", a: "Allah holds back from us", wrong: ["Nothing", "We get richer", "We get praise"], why: "Otherwise Allah will withhold it back from you." },
        { q: "Even a little charity is worth giving.", tf: true, why: "He told her to give from what she had." }
      ]
    },
    {
      slug: "her-mother",
      title: "Kind to her mother",
      line: "Asma was told: be kind to your mother, though not Muslim.",
      facts: ["Her mother visited during the treaty with Quraysh.", "Asma asked if she should keep good ties.", "The Prophet ﷺ said: yes, keep good ties with her."],
      quote: quranQuote(60, 8),
      source: hadith("bukhari", "3183", "Asma bint Abi Bakr", "Sahih", "During the treaty with Quraysh my mother came to visit me, and she was not Muslim. I asked the Prophet ﷺ: shall I keep good ties with her? He said: yes, keep good ties with her.", "Yes, keep good relation with her"),
      difficulty: 3,
      questions: [
        { q: "Who came to visit Asma?", a: "Her mother", wrong: ["Her uncle", "A king", "A trader"], why: "My mother came to visit me." },
        { q: "What did the Prophet ﷺ tell her?", a: "Keep good ties with her", wrong: ["Send her away", "Do not speak to her", "Ignore her"], why: "Yes, keep good relation with her." },
        { q: "Muslims are kind to parents who are not Muslim.", tf: true, why: "She was told to keep good ties." }
      ]
    },
    {
      slug: "the-eclipse",
      title: "The day of the eclipse",
      line: "During an eclipse, Asma prayed so long she nearly fainted.",
      facts: ["She saw people praying and asked Aishah why.", "Aishah pointed to the sky: a sign.", "After it, the Prophet ﷺ spoke of the questions in the grave."],
      source: hadith("bukhari", "184", "Asma bint Abi Bakr", "Sahih", "During the eclipse I came to Aishah while people prayed. She pointed to the sky and said: Subhan Allah. I stood to pray until I nearly fainted. Afterwards the Prophet ﷺ said: you will be tested in your graves, and asked: what do you know about this man?", "you will be put to trials in your graves"),
      difficulty: 4,
      questions: [
        { q: "What happened in the sky that day?", a: "An eclipse", wrong: ["A storm", "A rainbow", "A meteor"], why: "I came to Aishah during the solar eclipse." },
        { q: "What did the Prophet ﷺ speak about after?", a: "The test in the grave", wrong: ["Trade", "Poetry", "Farming"], why: "You will be put to trials in your graves." },
        { q: "What will a believer answer in the grave?", a: "He is Muhammad, Allah's Messenger ﷺ", wrong: ["I do not know", "I heard people say", "He was a poet"], why: "A believer will reply: he is Muhammad, Allah's Messenger." }
      ]
    }
  ]
};

const SAHL: DeepUnit = {
  key: "sahl",
  topicId: "sahabah",
  branchId: "sahabi-sahl-ibn-sad",
  branch: { title: "Sahl ibn Sa'd", description: "An Ansari who was a boy in the Prophet's ﷺ time and told many small, warm stories." },
  name: "Sahl ibn Sa'd",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "friday-lunch",
      title: "Looking forward to Friday",
      line: "Sahl remembered a kind old woman who fed them on Fridays.",
      facts: ["She grew silq, a leafy plant, by the streams.", "On Fridays she cooked its roots with barley.", "After Jumu'ah she fed them, so they loved Fridays."],
      source: hadith("bukhari", "938", "Sahl ibn Sa'd", "Sahih", "A woman among us grew silq by the streams. On Fridays she cooked its roots with barley; after the Jumu'ah prayer we greeted her and she gave us that food, so we looked forward to Friday.", "we used to look forward to Friday"),
      difficulty: 2,
      questions: [
        { q: "What did the woman cook on Fridays?", a: "Silq roots with barley", wrong: ["Roast lamb", "Honey cake", "Fish"], why: "She put a handful of powdered barley over it and cooked it." },
        { q: "When did she feed them?", a: "After Jumu'ah", wrong: ["Before Fajr", "At midnight", "In Ramadan only"], why: "After finishing the Jumua prayer we used to greet her." },
        { q: "Small kindness can make people love a day.", tf: true, why: "Because of that meal, we used to look forward to Friday." }
      ]
    },
    {
      slug: "the-boy-on-the-right",
      title: "The boy on the right",
      line: "The Prophet ﷺ asked a boy's permission before serving old men.",
      facts: ["A boy sat on his right, old men on his left.", "He asked the boy: may I give the drink to them?", "The boy wished to drink after him, and he gave it to him."],
      source: hadith("bukhari", "2351", "Sahl ibn Sa'd", "Sahih", "A drink was brought to the Prophet ﷺ and he drank. A boy, the youngest, was on his right and old men on his left. He said: boy, will you allow me to give it to the old men? The boy said: I will not give anyone my share of what is left from you. So he gave it to him.", "will you allow me to give it"),
      difficulty: 3,
      questions: [
        { q: "Who sat on the Prophet's ﷺ right?", a: "A young boy", wrong: ["An old man", "A king", "Nobody"], why: "On his right side there was sitting a boy." },
        { q: "What did the Prophet ﷺ do first?", a: "Asked the boy's permission", wrong: ["Gave it to the old men", "Poured it away", "Drank it all"], why: "Will you allow me to give it to the old men?" },
        { q: "The right side has the first turn when serving.", tf: true, why: "He asked the boy because he was on the right." }
      ]
    },
    {
      slug: "ar-rayyan",
      title: "The gate of Ar-Rayyan",
      line: "Sahl narrated: Paradise has a gate only for those who fast.",
      facts: ["The gate's name is Ar-Rayyan.", "Only people who fasted will enter by it.", "Once they are in, it will be closed."],
      source: hadith("bukhari", "1896", "Sahl bin Sa'd", "Sahih", "There is a gate in Paradise called Ar-Rayyan; those who fast will enter through it on the Day of Resurrection and none but them. Once they enter, it is closed.", "There is a gate in Paradise called Ar-Raiyan"),
      difficulty: 2,
      questions: [
        { q: "What is the gate called?", a: "Ar-Rayyan", wrong: ["Al-Firdaus", "Al-Kawthar", "As-Salam"], why: "A gate in Paradise called Ar-Raiyan." },
        { q: "Who enters by that gate?", a: "Those who fasted", wrong: ["Everyone", "Only kings", "Traders"], why: "Those who observe fasts will enter through it." },
        { q: "The gate closes once they have entered.", tf: true, why: "After their entry the gate will be closed." }
      ]
    },
    {
      slug: "two-things-to-guard",
      title: "Guard two things",
      line: "Sahl narrated: guard tongue and chastity, and win Paradise.",
      facts: ["The Prophet ﷺ named two things to guard.", "The tongue, from bad words.", "And chastity, from what Allah forbade."],
      source: hadith("bukhari", "6474", "Sahl ibn Sa'd", "Sahih", "The Prophet ﷺ said: whoever guarantees me what is between his jaws and what is between his legs, I guarantee him Paradise.", "I guarantee Paradise for him"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ promise for guarding both?", a: "Paradise", wrong: ["A long life", "Wealth", "Victory"], why: "I guarantee Paradise for him." },
        { q: "Which body part speaks words?", a: "The tongue", wrong: ["The feet", "The ears", "The hair"], why: "What is between his two jaw-bones, his tongue." },
        { q: "Guarding the tongue is part of faith.", tf: true, why: "The tongue is one of the two things to guard." }
      ]
    },
    {
      slug: "caring-for-orphans",
      title: "Like two fingers",
      line: "Sahl narrated: an orphan's carer is near him ﷺ in Paradise.",
      facts: ["He held up two fingers side by side.", "The one who looks after an orphan will be that close.", "Caring for orphans is a great deed."],
      source: hadith("bukhari", "5304", "Sahl bin Sa'd", "Sahih", "The Prophet ﷺ said: I and the one who looks after an orphan will be like this in Paradise, showing his index and middle fingers.", "I and the one who looks after an orphan will be like this in Paradise"),
      difficulty: 2,
      questions: [
        { q: "Whom should we look after?", a: "Orphans", wrong: ["Only the rich", "Only ourselves", "Nobody"], why: "The one who looks after an orphan." },
        { q: "What did he show with his hand?", a: "Two fingers together", wrong: ["A fist", "An open palm", "One finger"], why: "Showing his middle and index fingers." },
        { q: "Caring for orphans brings one near him in Paradise.", tf: true, why: "Will be like this in Paradise." }
      ]
    }
  ]
};

const ABU_QATADAH: DeepUnit = {
  key: "abu-qatadah",
  topicId: "sahabah",
  branchId: "sahabi-abu-qatadah",
  branch: { title: "Abu Qatadah al-Ansari", description: "The Prophet's ﷺ horseman, who kept him steady on a night journey." },
  name: "Abu Qatadah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "night-ride",
      title: "Holding him steady",
      line: "Abu Qatadah held the sleepy Prophet ﷺ steady on his camel.",
      facts: ["On a night journey, the Prophet ﷺ dozed on his camel.", "Three times Abu Qatadah held him up without waking him.", "He prayed: may Allah protect you as you protected His Prophet."],
      source: hadith("muslim", "681", "Abu Qatadah", "Sahih", "On a night journey the Prophet ﷺ dozed and leaned on his camel. Three times I supported him without waking him. He asked: who is this? I said: Abu Qatadah. He said: may Allah protect you, as you have protected His Messenger.", "May Allah protect you, as you have protected His Apostle"),
      difficulty: 3,
      questions: [
        { q: "What happened to the Prophet ﷺ on the ride?", a: "He dozed off", wrong: ["He fell ill", "He got lost", "He sang"], why: "He began to doze and leaned to one side." },
        { q: "How many times did Abu Qatadah hold him up?", a: "Three", wrong: ["Once", "Ten", "Never"], why: "He leaned three times and was supported." },
        { q: "What du'a did Abu Qatadah receive?", a: "May Allah protect you", wrong: ["May you be rich", "May you be king", "May you be famous"], why: "May Allah protect you, as you have protected His Apostle." }
      ]
    },
    {
      slug: "the-wild-donkey",
      title: "A meal from Allah",
      line: "Abu Qatadah hunted a wild donkey, and it fed the pilgrims.",
      facts: ["His companions were in ihram, but he was not.", "He hunted a wild donkey alone.", "The Prophet ﷺ said: a meal Allah has fed you."],
      source: hadith("bukhari", "2914", "Abu Qatadah", "Sahih", "On the road to Makkah my companions were in ihram and I was not. I saw a wild donkey; they would not hand me my whip or spear, so I took it and hunted it. Some ate and some refused. The Prophet ﷺ said: that was a meal Allah fed you.", "That was a meal Allah fed you with"),
      difficulty: 4,
      questions: [
        { q: "Why did the others not help him hunt?", a: "They were in ihram", wrong: ["They were asleep", "They were afraid", "They were full"], why: "They were in a state of Ihram, while he was not." },
        { q: "What did he hunt?", a: "A wild donkey", wrong: ["A lion", "A deer", "A bird"], why: "He saw an onager and killed it." },
        { q: "What did the Prophet ﷺ call it?", a: "A meal Allah fed you", wrong: ["A sin", "A waste", "A mistake"], why: "That was a meal Allah fed you with." }
      ]
    },
    {
      slug: "day-of-arafah",
      title: "The fast of Arafah",
      line: "Abu Qatadah narrated the great reward for fasting on Arafah.",
      facts: ["The day of Arafah is the 9th of Dhul-Hijjah.", "Fasting it wipes out sins of two years.", "Fasting Ashura wipes out a year."],
      source: hadith("muslim", "1162b", "Abu Qatadah", "Sahih", "The Prophet ﷺ was asked about fasting the day of Arafah and said it expiates the sins of the year before and the year after; and Ashura expiates the year before.", "It expiates the sins of the preceding year and the coming year"),
      difficulty: 3,
      questions: [
        { q: "Fasting Arafah covers sins of how many years?", a: "Two", wrong: ["One", "Ten", "Five"], why: "The preceding year and the coming year." },
        { q: "When is the day of Arafah?", a: "9th of Dhul-Hijjah", wrong: ["1st of Ramadan", "10th of Muharram", "27th of Rajab"], why: "The day of Arafa, 9th of Dhu'l-Hijja." },
        { q: "Fasting Ashura wipes out one year of sins.", tf: true, why: "It expiates the sins of the preceding year." }
      ]
    },
    {
      slug: "good-and-bad-dreams",
      title: "Good dreams and bad dreams",
      line: "Abu Qatadah taught what to do after a bad dream.",
      facts: ["A good dream is from Allah.", "A bad dream is from Shaytan.", "Spit lightly to the left and seek Allah's refuge."],
      source: hadith("bukhari", "3292", "Abu Qatadah", "Sahih", "A good dream is from Allah and a bad dream is from Shaytan; if one of you has a bad dream that frightens him, let him spit to his left and seek refuge with Allah from its evil, and it will not harm him.", "A good dream is from Allah"),
      difficulty: 2,
      questions: [
        { q: "Where does a good dream come from?", a: "From Allah", wrong: ["From Shaytan", "From food", "From nowhere"], why: "A good dream is from Allah." },
        { q: "What should you do after a bad dream?", a: "Seek Allah's refuge", wrong: ["Tell everyone", "Stay up all night", "Be scared"], why: "Seek refuge with Allah from its evil." },
        { q: "A bad dream will not harm you if you seek refuge.", tf: true, why: "Then it will not harm him." }
      ]
    },
    {
      slug: "umamah-in-prayer",
      title: "A child in his arms",
      line: "Abu Qatadah saw the Prophet ﷺ pray carrying his granddaughter.",
      facts: ["Umamah was the daughter of Zaynab.", "He carried her while standing in prayer.", "When he went down to prostrate, he set her down."],
      source: hadith("bukhari", "516", "Abu Qatadah", "Sahih", "The Prophet ﷺ prayed carrying Umamah, daughter of Zaynab. When he prostrated he put her down, and when he stood he carried her.", "When he prostrated, he put her down"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Prophet ﷺ carry in prayer?", a: "Umamah, his granddaughter", wrong: ["A lamb", "A sword", "A book"], why: "He was carrying Umama the daughter of Zainab." },
        { q: "What did he do when prostrating?", a: "Put her down", wrong: ["Kept holding her", "Stopped praying", "Called someone"], why: "When he prostrated, he put her down." },
        { q: "The Prophet ﷺ was gentle with children.", tf: true, why: "He carried his granddaughter even in prayer." }
      ]
    },
    {
      slug: "greet-the-masjid",
      title: "Two rak'ahs first",
      line: "He narrated: pray two rak'ahs before sitting in a masjid.",
      facts: ["When you enter a masjid, do not sit straight away.", "First pray two rak'ahs.", "This prayer honors the house of Allah."],
      source: hadith("bukhari", "1167", "Abu Qatadah", "Sahih", "The Prophet ﷺ said: if one of you enters a masjid, let him not sit until he has prayed two rak'ahs.", "he should not sit until he has offered a two-rak"),
      difficulty: 2,
      questions: [
        { q: "What do we do before sitting in a masjid?", a: "Pray two rak'ahs", wrong: ["Read the Quran", "Make wudu again", "Sit facing the qiblah"], why: "He should not sit until he has offered two rak'ahs." },
        { q: "How many rak'ahs are prayed?", a: "Two", wrong: ["Four", "One", "Ten"], why: "A two-rak'ah prayer." },
        { q: "You should sit first, then pray later.", tf: false, why: "He should not sit until he has prayed." }
      ]
    }
  ]
};

const NUMAN: DeepUnit = {
  key: "numan",
  topicId: "sahabah",
  branchId: "sahabi-an-numan-ibn-bashir",
  branch: { title: "An-Nu'man ibn Bashir", description: "The first Ansari baby born after the Hijrah, who passed on wise parables." },
  name: "An-Nu'man ibn Bashir",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "a-fair-gift",
      title: "Fair to every child",
      line: "Nu'man's father learned to be fair with gifts to his children.",
      facts: ["His father gave him a gift.", "His mother asked for the Prophet ﷺ as witness.", "He said: fear Allah and be just to your children."],
      source: hadith("bukhari", "2587", "An-Nu'man ibn Bashir", "Sahih", "My father gave me a gift, and my mother wanted the Prophet ﷺ as witness. He asked: have you given the same to all your sons? He said no. He said: fear Allah and be just to your children. So my father took back the gift.", "be just to your children"),
      difficulty: 2,
      questions: [
        { q: "What did the Prophet ﷺ ask Nu'man's father?", a: "Did all your sons get the same?", wrong: ["How much was it?", "Where is your house?", "Who is your king?"], why: "Have you given the like of it to everyone of your sons?" },
        { q: "What did he tell parents to be?", a: "Just to their children", wrong: ["Strict only", "Rich", "Silent"], why: "Be afraid of Allah, and be just to your children." },
        { q: "Nu'man's father took the gift back.", tf: true, why: "My father then returned and took back his gift." }
      ]
    },
    {
      slug: "clear-and-doubtful",
      title: "Clear and doubtful",
      line: "Nu'man narrated: halal and haram are clear; avoid the doubtful.",
      facts: ["Some things are clearly halal, some clearly haram.", "In between are doubtful things.", "Whoever avoids them keeps his religion and honor safe."],
      source: hadith("bukhari", "52", "An-Nu'man bin Bashir", "Sahih", "The halal is clear and the haram is clear, and between them are doubtful things many do not know. Whoever avoids them protects his religion and honor. In the body is a piece of flesh: if it is good the whole body is good. It is the heart.", "Both legal and illegal things are evident"),
      difficulty: 3,
      questions: [
        { q: "What lies between halal and haram?", a: "Doubtful things", wrong: ["Nothing", "Only halal", "Only gold"], why: "In between them there are doubtful things." },
        { q: "What does avoiding doubtful things protect?", a: "Religion and honor", wrong: ["Wealth only", "Health", "Friendships"], why: "He saves his religion and his honor." },
        { q: "Which body part decides if the body is good?", a: "The heart", wrong: ["The hand", "The foot", "The eye"], why: "There is a piece of flesh in the body: the heart." }
      ]
    },
    {
      slug: "one-body",
      title: "Like one body",
      line: "Nu'man narrated: believers are like one body in mercy.",
      facts: ["Believers love and care for each other.", "When one part hurts, the whole body feels it.", "So a Muslim feels his brother's pain."],
      source: hadith("bukhari", "6011", "An-Nu'man ibn Bashir", "Sahih", "You see the believers in their mercy, love and kindness to each other like one body: if one part is ill, the whole body shares the sleeplessness and fever.", "resembling one body"),
      difficulty: 2,
      questions: [
        { q: "Believers are like what?", a: "One body", wrong: ["Separate stones", "Strangers", "Rival teams"], why: "Resembling one body." },
        { q: "What happens when one part hurts?", a: "The whole body feels it", wrong: ["Nothing", "Only that part feels it", "The body gets stronger"], why: "The whole body shares the sleeplessness and fever." },
        { q: "Muslims should care when others suffer.", tf: true, why: "They are like one body." }
      ]
    },
    {
      slug: "the-ship",
      title: "Holes in the ship",
      line: "Nu'man narrated the parable of people sharing one ship.",
      facts: ["Some sat on the top deck, some below.", "Those below wanted to drill a hole for water.", "If stopped, all are saved; if not, all drown."],
      source: hadith("bukhari", "2493", "An-Nu'man ibn Bashir", "Sahih", "Those who keep Allah's limits and those who break them are like people sharing a ship by lot, some above and some below. Those below said: let us make a hole in our part for water. If the others let them, all would drown; if they stopped them, all would be saved.", "all the people of the ship would be destroyed"),
      difficulty: 3,
      questions: [
        { q: "What did the people below want to do?", a: "Make a hole for water", wrong: ["Swim to the shore", "Leave the ship", "Fish from below"], why: "Let us make a hole in our share of the ship." },
        { q: "What if nobody stopped them?", a: "Everyone would drown", wrong: ["Only they would drown", "Nothing", "The ship would fly"], why: "All the people of the ship would be destroyed." },
        { q: "Stopping wrong protects the whole community.", tf: true, why: "If they prevented them, both parties would be safe." }
      ]
    },
    {
      slug: "straight-rows",
      title: "Straighten the rows",
      line: "Nu'man narrated: straighten your rows in prayer.",
      facts: ["Rows in prayer should be straight.", "Crooked rows can bring division.", "Straight rows unite the hearts."],
      source: hadith("muslim", "436a", "An-Nu'man ibn Bashir", "Sahih", "I heard the Prophet ﷺ say: straighten your rows, or Allah will put division between you.", "Straighten your rows"),
      difficulty: 2,
      questions: [
        { q: "How should prayer rows be?", a: "Straight", wrong: ["Crooked", "Far apart", "In circles"], why: "Straighten your rows." },
        { q: "What may crooked rows bring?", a: "Division between people", wrong: ["More reward", "Rain", "Wealth"], why: "Or Allah would create dissension amongst you." },
        { q: "Standing straight in rows is a small, unimportant thing.", tf: false, why: "Crooked rows can bring division." }
      ]
    },
    {
      slug: "jumuah-surahs",
      title: "Surahs for Friday and Eid",
      line: "Nu'man told which surahs the Prophet ﷺ read on Friday and Eid.",
      facts: ["He recited Al-A'la in the first rak'ah.", "He recited Al-Ghashiyah in the second.", "He did this on Jumu'ah and both Eids."],
      quote: quranQuote(87, 1),
      source: hadith("muslim", "878a", "An-Nu'man ibn Bashir", "Sahih", "The Prophet ﷺ used to recite on the two Eids and on Friday: Glorify the name of your Lord, the Most High, and: Has there come to you the news of the Overwhelming.", "used to recite on two"),
      difficulty: 3,
      questions: [
        { q: "Which surah did he recite first?", a: "Al-A'la", wrong: ["Al-Baqarah", "Yasin", "Al-Kahf"], why: "Glorify the name of your Lord, the Most High, 87:1." },
        { q: "Which surah came second?", a: "Al-Ghashiyah", wrong: ["Al-Fatihah", "An-Nas", "Al-Ikhlas"], why: "Has there come to you the news of the overwhelming event." },
        { q: "When did he recite these two?", a: "Jumu'ah and the two Eids", wrong: ["Only at Fajr", "Only in Ramadan", "Only at funerals"], why: "On two Ids and in Friday prayer." }
      ]
    }
  ]
};

const JARIR: DeepUnit = {
  key: "jarir",
  topicId: "sahabah",
  branchId: "sahabi-jarir-ibn-abdullah",
  branch: { title: "Jarir ibn Abdullah al-Bajali", description: "The chief of Bajilah, met with a smile and sent to tear down an idol house." },
  name: "Jarir ibn Abdullah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "always-a-smile",
      title: "Always a smile",
      line: "The Prophet ﷺ always met Jarir with a smile.",
      facts: ["Since Jarir became Muslim, he was always welcomed in.", "The Prophet ﷺ smiled every time he saw him.", "A smile to your brother is a good deed."],
      source: hadith("bukhari", "3035", "Jarir ibn Abdullah", "Sahih", "Since I became Muslim the Prophet ﷺ never kept me away, and whenever he saw me he smiled. I told him I could not sit firm on a horse, so he struck my chest and said: O Allah, make him firm and make him a guide, rightly guided.", "he would receive me with a smile"),
      difficulty: 2,
      questions: [
        { q: "How did the Prophet ﷺ greet Jarir?", a: "With a smile", wrong: ["With a frown", "In silence", "With a shout"], why: "Whenever he saw me he would receive me with a smile." },
        { q: "What was Jarir's problem with horses?", a: "He could not sit firm", wrong: ["He had none", "He feared them", "He sold them"], why: "I could not sit firm on horses." },
        { q: "The Prophet ﷺ made du'a to make Jarir firm.", tf: true, why: "O Allah! Make him firm." }
      ]
    },
    {
      slug: "sincere-to-all",
      title: "Sincere to every Muslim",
      line: "Jarir pledged to pray, pay zakat and be sincere to every Muslim.",
      facts: ["Jarir gave his pledge to the Prophet ﷺ.", "He promised prayer and zakat.", "He also promised good will to every Muslim."],
      source: hadith("bukhari", "57", "Jarir ibn Abdullah", "Sahih", "I pledged to the Prophet ﷺ to pray perfectly, pay zakat, and be sincere and true to every Muslim.", "be sincere and true to every Muslim"),
      difficulty: 2,
      questions: [
        { q: "To whom did Jarir pledge sincerity?", a: "Every Muslim", wrong: ["Only his tribe", "Only kings", "Only himself"], why: "Be sincere and true to every Muslim." },
        { q: "Which worship was in his pledge?", a: "Prayer and zakat", wrong: ["Only Hajj", "Only fasting", "None"], why: "Offer prayers perfectly and pay the Zakat." },
        { q: "Wishing good for others is part of Islam.", tf: true, why: "He pledged sincerity to every Muslim." }
      ]
    },
    {
      slug: "the-full-moon",
      title: "Like the full moon",
      line: "Jarir heard: believers will see their Lord like the full moon.",
      facts: ["They sat with the Prophet ﷺ on a full moon night.", "He said believers will see their Lord clearly.", "So do not miss Fajr and Asr."],
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ looked at the full moon and said: you will see your Lord as you see this moon, with no trouble. So if you can, do not miss the prayer before sunrise and the prayer before sunset.", "Certainly you will see your Lord as you see this moon"),
      difficulty: 3,
      questions: [
        { q: "What were they looking at?", a: "The full moon", wrong: ["The sun", "A star", "The sea"], why: "He looked at the moon, the full moon." },
        { q: "Which two prayers did he urge them to keep?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Eid and Jumu'ah", "Witr and Duha"], why: "Before the sunrise and before sunset." },
        { q: "Believers will see their Lord in the Hereafter.", tf: true, why: "You will see your Lord as you see this moon." }
      ]
    },
    {
      slug: "dhul-khalasah",
      title: "The false Kaaba of Yemen",
      line: "Jarir was sent to tear down an idol house in Yemen.",
      facts: ["Dhul-Khalasah was an idol house of the Khath'am tribe.", "Jarir rode out with 150 horsemen of Ahmas.", "He took it down and sent the good news."],
      source: hadith("bukhari", "3020", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ said: will you relieve me of Dhul-Khalasah, an idol house of Khath'am called the Yemeni Kaaba? I set out with 150 horsemen of Ahmas, pulled it down and burnt it, and sent word to the Prophet ﷺ.", "Will you relieve me from Dhul-Khalasa"),
      difficulty: 4,
      questions: [
        { q: "What was Dhul-Khalasah?", a: "An idol house", wrong: ["A masjid", "A market", "A well"], why: "A house of an idol belonging to the tribe of Khath'am." },
        { q: "How many horsemen went with Jarir?", a: "150", wrong: ["10", "1,000", "3"], why: "One hundred and fifty cavalry men from Ahmas." },
        { q: "Jarir brought down the idol house.", tf: true, why: "He dismantled and burnt it." }
      ]
    },
    {
      slug: "be-merciful",
      title: "Mercy for mercy",
      line: "Jarir narrated: Allah is not merciful to the merciless.",
      facts: ["Mercy to people brings Allah's mercy.", "Whoever has no mercy for people loses it.", "Be kind to everyone around you."],
      source: hadith("bukhari", "7376", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ said: Allah will not be merciful to those who are not merciful to people.", "Allah will not be merciful to those who are not merciful to mankind"),
      difficulty: 2,
      questions: [
        { q: "Who does not receive Allah's mercy?", a: "Those with no mercy for people", wrong: ["The poor", "Travelers", "Children"], why: "Those who are not merciful to mankind." },
        { q: "What brings Allah's mercy?", a: "Being merciful to people", wrong: ["Being harsh", "Being proud", "Being lazy"], why: "Allah is merciful to the merciful." },
        { q: "Mercy is only for family, not strangers.", tf: false, why: "Merciful to mankind." }
      ]
    },
    {
      slug: "gentleness",
      title: "Gentleness is good",
      line: "Jarir narrated: whoever loses gentleness loses all good.",
      facts: ["Gentleness makes things beautiful.", "Harshness spoils them.", "Without gentleness, much good is lost."],
      source: hadith("muslim", "2592a", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ said: whoever is deprived of gentleness is deprived of good.", "deprived of good"),
      difficulty: 3,
      questions: [
        { q: "Whoever lacks gentleness loses what?", a: "Good", wrong: ["Wealth", "Friends only", "Respect"], why: "He who is deprived of tenderly feelings is deprived of good." },
        { q: "Which is better in dealing with people?", a: "Gentleness", wrong: ["Harshness", "Shouting", "Ignoring"], why: "Gentleness brings good." },
        { q: "Being harsh brings more good than being gentle.", tf: false, why: "Without gentleness good is lost." }
      ]
    }
  ]
};

const THAWBAN: DeepUnit = {
  key: "thawban",
  topicId: "sahabah",
  branchId: "sahabi-thawban",
  branch: { title: "Thawban", description: "The freed servant of the Prophet ﷺ who stayed close to him and passed on his words." },
  name: "Thawban",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "many-sajdahs",
      title: "Prostrate often",
      line: "Thawban taught: prostrate often, each sajdah raises you a level.",
      facts: ["A man asked him three times for the most loved deed.", "Thawban said he had asked the Prophet ﷺ the same.", "Each sajdah raises a level and removes a sin."],
      source: hadith("muslim", "488", "Thawban", "Sahih", "Ma'dan asked Thawban, freed servant of the Prophet ﷺ, about a deed that takes one to Paradise. On the third ask he said: I asked the Prophet ﷺ and he said: prostrate often to Allah, for every prostration raises you a degree and removes a sin.", "Make frequent prostrations before Allah"),
      difficulty: 3,
      questions: [
        { q: "What deed did Thawban recommend?", a: "Prostrating often", wrong: ["Traveling far", "Buying land", "Sleeping early"], why: "Make frequent prostrations before Allah." },
        { q: "What does each sajdah do?", a: "Raises a level, removes a sin", wrong: ["Nothing", "Makes you rich", "Makes you tired"], why: "Raising you a degree and removing a sin." },
        { q: "Thawban was a freed servant of the Prophet ﷺ.", tf: true, why: "Thauban, the freed slave of Allah's Messenger." }
      ]
    },
    {
      slug: "after-the-prayer",
      title: "Words after salah",
      line: "Thawban told what the Prophet ﷺ said after each prayer.",
      facts: ["He asked Allah's forgiveness three times.", "Then he said: O Allah, You are As-Salam.", "And peace comes from You, Owner of Majesty."],
      source: hadith("muslim", "591", "Thawban", "Sahih", "When the Prophet ﷺ finished his prayer he asked forgiveness three times and said: O Allah, You are Peace and from You is peace; blessed are You, Owner of Majesty and Honor.", "He begged forgiveness three times"),
      difficulty: 2,
      questions: [
        { q: "How many times did he ask forgiveness?", a: "Three", wrong: ["One", "Seven", "Ten"], why: "He begged forgiveness three times." },
        { q: "Which name of Allah did he say next?", a: "As-Salam", wrong: ["Al-Malik", "Al-Ghani", "Al-Qawi"], why: "O Allah! Thou art Peace." },
        { q: "He said Astaghfirullah after finishing prayer.", tf: true, why: "I beg forgiveness from Allah." }
      ]
    },
    {
      slug: "best-dinar",
      title: "The best coin",
      line: "Thawban narrated: the best coin is the one spent on family.",
      facts: ["A coin spent on your family is the best.", "Then one spent on a mount in Allah's way.", "Then one spent on companions in Allah's way."],
      source: hadith("muslim", "994", "Thawban", "Sahih", "The best dinar is one a man spends on his family, then one he spends on his mount in Allah's way, then one he spends on his companions in Allah's way.", "The most excellent dinar is one that a person spends on his family"),
      difficulty: 3,
      questions: [
        { q: "Which coin is the best?", a: "One spent on your family", wrong: ["One kept hidden", "One spent on games", "One thrown away"], why: "The most excellent dinar is one spent on his family." },
        { q: "Spending on family earns reward.", tf: true, why: "It is the most excellent dinar." },
        { q: "What comes after family in the list?", a: "A mount in Allah's way", wrong: ["New clothes", "A palace", "Perfume"], why: "The dinar which he spends on his animal in Allah's path." }
      ]
    },
    {
      slug: "garden-of-fruit",
      title: "In Paradise's orchard",
      line: "Thawban narrated: visiting the sick is picking Paradise fruit.",
      facts: ["Visiting a sick Muslim is a great deed.", "While visiting, you are in Paradise's orchard.", "Khurfat al-Jannah means its fruit garden."],
      source: hadith("muslim", "2568d", "Thawban", "Sahih", "The Prophet ﷺ said: whoever visits the sick remains in the khurfah of Paradise. He was asked: what is the khurfah? He said: its harvest of fruit.", "It is a place abounding in fruits"),
      difficulty: 2,
      questions: [
        { q: "Visiting the sick is like being where?", a: "In Paradise's fruit garden", wrong: ["In a market", "At sea", "In a desert"], why: "He remains in the fruit garden of Paradise." },
        { q: "What is Khurfat al-Jannah?", a: "Paradise's fruit garden", wrong: ["A river", "A gate", "A tent"], why: "It is a place abounding in fruits." },
        { q: "Visiting the sick brings great reward.", tf: true, why: "Until he returns, he is in Paradise's garden." }
      ]
    },
    {
      slug: "like-foam",
      title: "Foam on the flood",
      line: "Thawban warned: many but weak, like foam on a flood.",
      facts: ["Nations will call each other against Muslims like diners to a dish.", "Muslims will be many, but like foam on a flood.", "The cause: love of this world and dislike of death."],
      source: hadith("abudawud", "4297", "Thawban", "Sahih (Al-Albani)", "Nations will call each other against you as diners call each other to a dish. Will we be few? No, you will be many, but like the foam of a flood, and Allah will put wahn in your hearts. What is wahn? Love of the world and dislike of death.", "Love of the world and dislike of death"),
      difficulty: 4,
      questions: [
        { q: "Will Muslims be few at that time?", a: "No, they will be many", wrong: ["Yes, very few", "None will remain", "Only ten"], why: "No, you will be numerous at that time." },
        { q: "What is wahn?", a: "Love of the world and dislike of death", wrong: ["Love of prayer", "Fear of Allah", "Hard work"], why: "Love of the world and dislike of death." },
        { q: "Being many is enough without strong faith.", tf: false, why: "They will be many but like foam." }
      ]
    }
  ]
};

const UQBAH: DeepUnit = {
  key: "uqbah",
  topicId: "sahabah",
  branchId: "sahabi-uqbah-ibn-amir",
  branch: { title: "Uqbah ibn Amir al-Juhani", description: "A shepherd of the Suffah who loved the Quran and taught the two surahs of refuge." },
  name: "Uqbah ibn Amir",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-two-refuges",
      title: "Verses like no others",
      line: "Uqbah heard about two surahs of refuge sent down in one night.",
      facts: ["The Prophet ﷺ told Uqbah about wonderful new verses.", "They were Al-Falaq and An-Nas.", "Nothing like them had been seen before."],
      quote: quranQuote(113, 1),
      source: hadith("muslim", "814a", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ said: What wonderful verses have been sent down today, the like of which has never been seen! They are: Say, I seek refuge with the Lord of the dawn, and Say, I seek refuge with the Lord of mankind.", "What wonderful verses have been sent down today"),
      difficulty: 2,
      questions: [
        { q: "Which two surahs did the Prophet ﷺ praise to Uqbah?", a: "Al-Falaq and An-Nas", wrong: ["Al-Baqarah and Al-Imran", "Yasin and Al-Mulk", "Al-Kahf and Maryam"], why: "Say: I seek refuge with the Lord of the dawn, and with the Lord of mankind." },
        { q: "Verses like these had been seen many times before.", tf: false, why: "The like of which has never been seen." },
        { q: "What do both surahs begin with?", a: "Say: I seek refuge", wrong: ["Praise be to Allah", "O you who believe", "By the time"], why: "Say: I seek refuge with the Lord." }
      ]
    },
    {
      slug: "better-than-camels",
      title: "Better than camels",
      line: "Uqbah learned two verses are worth more than two big camels.",
      facts: ["Uqbah was one of the people of the Suffah.", "Everyone wanted two fine she-camels.", "Learning two verses in the masjid is better."],
      source: hadith("muslim", "803", "Uqbah ibn Amir", "Sahih", "We were in the Suffah when the Prophet ﷺ asked who would like to bring home two big she-camels each morning. We all said yes. He said: going to the masjid to learn or recite two verses of Allah's Book is better than two she-camels, three verses better than three, and so on.", "That is better for him than two she-camels"),
      difficulty: 2,
      questions: [
        { q: "What is better than two big she-camels?", a: "Learning two verses", wrong: ["Two horses", "A new house", "A bag of gold"], why: "Two verses from the Book of Allah are better than two she-camels." },
        { q: "Where was Uqbah when he heard this?", a: "In the Suffah", wrong: ["In Yemen", "At sea", "In a market"], why: "When we were in Suffa." },
        { q: "Three verses are better than three she-camels.", tf: true, why: "Three verses are better than three she-camels." }
      ]
    },
    {
      slug: "fear-of-the-world",
      title: "Not shirk but the world",
      line: "Uqbah heard the Prophet ﷺ fear a race for this world.",
      facts: ["He prayed for the martyrs of Uhud.", "Then he spoke from the minbar like a farewell.", "He feared competing for this world, not shirk."],
      source: hadith("bukhari", "6426", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ prayed for the martyrs of Uhud, then went up the minbar and said: I am your predecessor and a witness over you. By Allah, I see my Cistern now. I do not fear that you will worship others after me, but I fear you will compete for this world.", "I am afraid that you will start competing for"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ fear most for his ummah?", a: "Racing for this world", wrong: ["Worshipping idols", "Too much prayer", "Learning too much"], why: "I am afraid that you will start competing for this world." },
        { q: "Whom did he pray for before this speech?", a: "The martyrs of Uhud", wrong: ["The people of Badr", "A king", "The Jinn"], why: "He offered the funeral prayer for the martyrs of Uhud." },
        { q: "What did he say he was looking at?", a: "His Cistern", wrong: ["The sea", "Makkah", "A mountain"], why: "By Allah, I am now looking at my Tank-lake." }
      ]
    },
    {
      slug: "the-last-goat",
      title: "The last young goat",
      line: "Uqbah shared out sheep for Eid and got the last one himself.",
      facts: ["The Prophet ﷺ gave Uqbah sheep to share for sacrifice.", "One young goat was left over.", "He told Uqbah: sacrifice it yourself."],
      source: hadith("bukhari", "2500", "Uqbah ibn Amir", "Sahih", "The Prophet ﷺ gave him sheep to share among his companions for sacrifice, and one young goat was left. He told the Prophet ﷺ, who said: sacrifice it on your behalf.", "Sacrifice it on your behalf"),
      difficulty: 1,
      questions: [
        { q: "What job did Uqbah get?", a: "Sharing out sheep", wrong: ["Guarding a gate", "Writing letters", "Building a wall"], why: "He gave him some sheep to distribute among his companions." },
        { q: "What did he do with the last young goat?", a: "Sacrificed it himself", wrong: ["Sold it", "Set it free", "Gave it back"], why: "Sacrifice it on your behalf." },
        { q: "Uqbah was trusted to share things fairly.", tf: true, why: "He was given the sheep to distribute." }
      ]
    },
    {
      slug: "brother-of-a-believer",
      title: "Your brother's deal",
      line: "Uqbah said from the minbar: a believer is a believer's brother.",
      facts: ["A believer is the brother of a believer.", "Do not outbid your brother in a sale.", "Do not propose where he already proposed."],
      source: hadith("muslim", "1414", "Uqbah ibn Amir", "Sahih", "Uqbah said on the minbar that the Prophet ﷺ said: A believer is the brother of a believer, so he must not outbid his brother, nor propose marriage over his brother's proposal until he leaves it.", "A believer is the brother of a believer"),
      difficulty: 2,
      questions: [
        { q: "What is a believer to another believer?", a: "His brother", wrong: ["His rival", "His servant", "A stranger"], why: "A believer is the brother of a believer." },
        { q: "What must you not do in your brother's sale?", a: "Outbid him", wrong: ["Greet him", "Help him", "Pray for him"], why: "It is not lawful for a believer to outbid his brother." },
        { q: "You may propose marriage over your brother's proposal.", tf: false, why: "He should not propose when his brother has proposed until he gives it up." }
      ]
    },
    {
      slug: "the-guest-right",
      title: "The right of a guest",
      line: "Uqbah asked what to do when hosts would not feed travelers.",
      facts: ["The Prophet ﷺ sent Uqbah and others on trips.", "Some people did not host them.", "A guest has a right, and good hosts honor it."],
      source: hadith("bukhari", "6137", "Uqbah ibn Amir", "Sahih", "We said: you send us out and we stay with people who do not host us. He said: if they host you as a guest should be hosted, accept it; if not, take from them the right of the guest that they should give.", "the right of the guest"),
      difficulty: 3,
      questions: [
        { q: "What was Uqbah's problem on trips?", a: "Hosts did not feed them", wrong: ["They got lost", "Their camels ran off", "They had no shoes"], why: "We stay with such people as do not entertain us." },
        { q: "What does a traveler guest have?", a: "A right to hosting", wrong: ["No rights", "A right to gold", "A right to rule"], why: "The right of the guest, which they ought to give." },
        { q: "When hosts are good, what should guests do?", a: "Accept their hosting", wrong: ["Refuse it", "Leave at once", "Complain"], why: "If they entertain you as they should for a guest, accept it." }
      ]
    }
  ]
};

const ABU_UMAMAH: DeepUnit = {
  key: "abu-umamah",
  topicId: "sahabah",
  branchId: "sahabi-abu-umamah",
  branch: { title: "Abu Umamah al-Bahili", description: "A companion who settled in Hims and passed on words about the Quran and good deeds." },
  name: "Abu Umamah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-intercessor",
      title: "The Quran will speak up",
      line: "Abu Umamah heard: the Quran will plead for those who read it.",
      facts: ["The Quran will intercede on the Day of Resurrection.", "Al-Baqarah and Al Imran will come like two clouds.", "Reading Al-Baqarah is a blessing."],
      source: hadith("muslim", "804a", "Abu Umamah", "Sahih", "Recite the Quran, for on the Day of Resurrection it will come as an intercessor for its readers. Recite the two bright ones, Al-Baqarah and Al Imran, for they will come like two clouds or two flocks of birds pleading for their readers.", "it will come as an intercessor"),
      difficulty: 2,
      questions: [
        { q: "What will the Quran do for its readers?", a: "Intercede for them", wrong: ["Forget them", "Judge them harshly", "Stay silent"], why: "It will come as an intercessor for those who recite it." },
        { q: "Which are the two bright surahs?", a: "Al-Baqarah and Al Imran", wrong: ["Al-Falaq and An-Nas", "Yasin and Ar-Rahman", "Al-Mulk and Al-Kahf"], why: "Recite the two bright ones, al-Baqara and Surah Al Imran." },
        { q: "How will the two surahs come?", a: "Like two clouds", wrong: ["Like two lions", "Like two rivers", "Like two stars"], why: "They will come as two clouds or two shades." }
      ]
    },
    {
      slug: "the-upper-hand",
      title: "The upper hand",
      line: "Abu Umamah narrated: spend what is extra, start with family.",
      facts: ["Spending your extra wealth is good for you.", "Holding it back is bad for you.", "Begin with those you look after."],
      source: hadith("muslim", "1036", "Abu Umamah", "Sahih", "O son of Adam, spending your surplus is better for you, and holding it back is bad for you. There is no blame for keeping what you need to live. Begin with your dependents, and the upper hand is better than the lower hand.", "the upper hand is better than the lower hand"),
      difficulty: 2,
      questions: [
        { q: "Whom should you begin your charity with?", a: "Your dependents", wrong: ["Strangers only", "The rich", "Nobody"], why: "Begin charity with your dependents." },
        { q: "Which hand is better?", a: "The upper, giving hand", wrong: ["The lower hand", "The left hand", "An empty hand"], why: "The upper hand is better than the lower hand." },
        { q: "Keeping what you need to live is blamed.", tf: false, why: "There is no reproach for you if you withhold what you need for a living." }
      ]
    },
    {
      slug: "prayer-wipes-sin",
      title: "Wudu and prayer cleanse",
      line: "Abu Umamah saw a sorry man forgiven after wudu and prayer.",
      facts: ["A man kept saying he had sinned.", "The Prophet ﷺ was silent, then prayed with him.", "He said Allah had forgiven his sin."],
      source: hadith("muslim", "2765", "Abu Umamah", "Sahih", "A man kept saying he had done a sin. The Prophet ﷺ stayed silent and the prayer began. Afterward he asked: did you make wudu well and pray with us? He said yes. He said: Allah has forgiven you your sin.", "Allah has exempted you"),
      difficulty: 3,
      questions: [
        { q: "What had the man done before the reply?", a: "Made wudu and prayed", wrong: ["Paid money", "Left the city", "Fasted a month"], why: "You performed ablution well, then you observed prayer along with us." },
        { q: "Abu Umamah followed to hear the answer.", tf: true, why: "I too followed so that I should know what answer he would give." },
        { q: "What did the man get in the end?", a: "Forgiveness from Allah", wrong: ["A punishment", "A reward of gold", "A new job"], why: "Allah has exempted you from your sin." }
      ]
    },
    {
      slug: "thanks-after-eating",
      title: "Thanks after a meal",
      line: "Abu Umamah taught the praise the Prophet ﷺ said after meals.",
      facts: ["The Prophet ﷺ praised Allah when he finished eating.", "He thanked Allah for food and drink.", "No one can repay Allah's favor."],
      source: hadith("bukhari", "5459", "Abu Umamah", "Sahih", "When the Prophet ﷺ finished his meal he would say: Praise be to Allah who has satisfied our needs and quenched our thirst. Your favor cannot be repaid or denied.", "Praise be to Allah Who has satisfied our needs"),
      difficulty: 1,
      questions: [
        { q: "When did the Prophet ﷺ say this praise?", a: "After finishing a meal", wrong: ["Before sleep", "At sunrise", "In the market"], why: "Whenever the Prophet ﷺ finished his meals." },
        { q: "What did he thank Allah for?", a: "Food and drink", wrong: ["Victory", "Wealth", "His health"], why: "Satisfied our needs and quenched our thirst." },
        { q: "Allah's favor can be fully paid back.", tf: false, why: "Your favor cannot be compensated." }
      ]
    },
    {
      slug: "leave-the-argument",
      title: "A house in Paradise",
      line: "Abu Umamah narrated: leave arguing, lying, and gain a house.",
      facts: ["Leave arguing even when right: a house in Paradise.", "Leave lying even in jest: a house in its middle.", "Good character: a house at its top."],
      source: hadith("abudawud", "4800", "Abu Umamah", "Hasan (Al-Albani)", "The Prophet ﷺ said: I guarantee a house on the edge of Paradise for one who leaves arguing even if he is right, one in the middle for one who leaves lying even in jest, and one at the top for one with good character."),
      difficulty: 3,
      questions: [
        { q: "What earns a house at Paradise's edge?", a: "Leaving arguing when right", wrong: ["Winning every debate", "Being loud", "Telling jokes"], why: "One who leaves arguing even if he is right." },
        { q: "What earns the house at the top?", a: "Good character", wrong: ["Praying the most", "Giving the most", "Fasting the most"], why: "One at the top for one with good character." },
        { q: "Lying is fine if only joking.", tf: false, why: "One who leaves lying even in jest." }
      ]
    },
    {
      slug: "plain-swords",
      title: "Plain swords, open lands",
      line: "Abu Umamah saw that the first Muslims lived without luxury.",
      facts: ["Early Muslims reached many lands.", "Their swords had no gold or silver.", "The swords had leather, lead and iron."],
      source: hadith("bukhari", "2909", "Abu Umamah", "Sahih", "Some people opened many lands, and their swords were decorated neither with gold nor silver, but with leather, lead and iron.", "decorated neither with gold nor silver"),
      difficulty: 2,
      questions: [
        { q: "How were the early swords decorated?", a: "With leather, lead and iron", wrong: ["With gold", "With silver", "With jewels"], why: "Decorated with leather, lead and iron." },
        { q: "The early Muslims loved showing off wealth.", tf: false, why: "Their swords had neither gold nor silver." },
        { q: "What lesson does Abu Umamah teach?", a: "Simple living is strength", wrong: ["Gold wins battles", "Swords must shine", "Wealth comes first"], why: "They opened lands without gold or silver." }
      ]
    }
  ]
};

const IMRAN: DeepUnit = {
  key: "imran-ibn-husayn",
  topicId: "sahabah",
  branchId: "sahabi-imran-ibn-husayn",
  branch: { title: "Imran ibn Husayn", description: "A patient companion of Khuza'ah who kept praying through long illness." },
  name: "Imran ibn Husayn",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "pray-as-you-can",
      title: "Pray as you can",
      line: "Imran was ill and asked how to pray when standing is hard.",
      facts: ["Imran had a painful illness.", "Pray standing; if you cannot, sit.", "If you cannot sit, pray on your side."],
      source: hadith("bukhari", "1117", "Imran ibn Husayn", "Sahih", "I had piles, so I asked the Prophet ﷺ about prayer. He said: pray standing, and if you cannot, then sitting, and if you cannot, then lying on your side.", "pray while sitting"),
      difficulty: 1,
      questions: [
        { q: "If you cannot stand, how do you pray?", a: "Sitting", wrong: ["You skip it", "Running", "Only in your mind"], why: "If you can't, pray while sitting." },
        { q: "If you cannot sit, how do you pray?", a: "Lying on your side", wrong: ["You skip it", "Standing on one leg", "Next week"], why: "If you cannot do even that, then pray lying on your side." },
        { q: "Islam makes prayer easy for the sick.", tf: true, why: "Each person prays as he is able." }
      ]
    },
    {
      slug: "earth-instead-of-water",
      title: "No water? Tayammum",
      line: "Imran saw a man taught tayammum when there was no water.",
      facts: ["A man sat apart and did not pray.", "He needed ghusl but had no water.", "The Prophet ﷺ told him: use clean earth."],
      source: hadith("bukhari", "348", "Imran ibn Husayn", "Sahih", "The Prophet ﷺ saw a man not praying with the people and asked why. He said: I need a bath and there is no water. He said: do tayammum with clean earth, that is enough for you.", "Perform Tayammum with clean earth"),
      difficulty: 2,
      questions: [
        { q: "Why did the man not pray with them?", a: "He had no water for ghusl", wrong: ["He was asleep", "He was eating", "He was traveling ahead"], why: "I am Junub and there is no water." },
        { q: "What did the Prophet ﷺ tell him to use?", a: "Clean earth", wrong: ["Sea water", "Perfume", "Sand from Makkah only"], why: "Perform Tayammum with clean earth." },
        { q: "Tayammum was enough for him to pray.", tf: true, why: "That will be sufficient for you." }
      ]
    },
    {
      slug: "the-water-skins",
      title: "The blessed water-skins",
      line: "Imran saw forty thirsty men drink from one woman's water-skins.",
      facts: ["On a journey the army ran out of water.", "They found a woman with two water-skins.", "Forty men drank and filled their vessels."],
      source: hadith("bukhari", "3571", "Imran ibn Husayn", "Sahih", "On a journey we became very thirsty and met a woman with two water-skins. The Prophet ﷺ rubbed their mouths, and forty of us drank and filled our vessels. She went back to her people, and they all accepted Islam.", "we drank till we quenched our thirst and we were forty men"),
      difficulty: 3,
      questions: [
        { q: "How many men drank from the water-skins?", a: "Forty", wrong: ["Four", "Ten", "Two hundred"], why: "We drank till we quenched our thirst and we were forty men." },
        { q: "What happened to the woman's people?", a: "They accepted Islam", wrong: ["They moved away", "They went to war", "They forgot her"], why: "She embraced Islam and they all embraced Islam." },
        { q: "The water-skins were nearly bursting full.", tf: true, why: "The waterskin was so full that it was almost about to burst." }
      ]
    },
    {
      slug: "the-best-generation",
      title: "The best generation",
      line: "Imran narrated: the best people are the Prophet's ﷺ generation.",
      facts: ["The best are the Prophet's ﷺ own generation.", "Then those after them, then those after them.", "Later some will break trust and promises."],
      source: hadith("bukhari", "3650", "Imran ibn Husayn", "Sahih", "The best of my ummah are my generation, then those who follow them, then those who follow them. After you will come people who testify without being asked, betray trusts and do not keep their vows.", "The best of my followers are those living in my generation"),
      difficulty: 2,
      questions: [
        { q: "Which generation is the best?", a: "The Prophet's ﷺ own", wrong: ["The last one", "Ours", "None"], why: "The best of my followers are those living in my generation." },
        { q: "What will some later people fail to keep?", a: "Their vows", wrong: ["Their houses", "Their names", "Their camels"], why: "They will vow and never fulfill their vows." },
        { q: "Imran was sure how many generations were named.", tf: false, why: "I do not remember whether he mentioned two or three generations." }
      ]
    },
    {
      slug: "made-easy",
      title: "Made easy for each",
      line: "Imran heard: each person is helped toward deeds for his end.",
      facts: ["A man asked why people should do deeds.", "Each is eased toward the deeds he was made for.", "So keep doing good deeds."],
      source: hadith("bukhari", "6596", "Imran ibn Husayn", "Sahih", "A man asked: can the people of Paradise be known from the people of the Fire? He said yes. He asked: then why do people do deeds? He said: everyone will do the deeds he was created for, or that are made easy for him.", "made easy for him to do"),
      difficulty: 3,
      questions: [
        { q: "What did the man ask about?", a: "Why people do deeds", wrong: ["When to eat", "How to trade", "Where to travel"], why: "Why do people try to do good deeds?" },
        { q: "What is made easy for each person?", a: "The deeds he was made for", wrong: ["Wealth", "A long life", "Every deed he wants"], why: "Everyone will do the deeds for which he has been created." },
        { q: "The answer means we should stop doing deeds.", tf: false, why: "Everyone will do the deeds which will be made easy for him." }
      ]
    },
    {
      slug: "modesty-brings-good",
      title: "Modesty brings good",
      line: "Imran narrated: modesty brings nothing but good.",
      facts: ["Haya means modesty and shyness from wrong.", "Haya brings only good.", "Imran put the Prophet's ﷺ words above books of wisdom."],
      source: hadith("muslim", "37a", "Imran ibn Husayn", "Sahih", "The Prophet ﷺ said: modesty brings nothing but good. A man said the books of wisdom say it brings calm. Imran said: I tell you the words of the Messenger of Allah ﷺ and you talk of your books?", "Modesty brings forth nothing but goodness"),
      difficulty: 2,
      questions: [
        { q: "What does modesty bring?", a: "Nothing but good", wrong: ["Weakness", "Sadness", "Loss"], why: "Modesty brings forth nothing but goodness." },
        { q: "Why was Imran upset with the man?", a: "He compared the hadith to books", wrong: ["He was late", "He was rude to a guest", "He forgot salah"], why: "I am narrating the tradition and you talk of your books." },
        { q: "What is the Arabic word for modesty?", a: "Haya", wrong: ["Sabr", "Shukr", "Zuhd"], why: "Haya means modesty." }
      ]
    }
  ]
};

const IBN_MUGHAFFAL: DeepUnit = {
  key: "ibn-mughaffal",
  topicId: "sahabah",
  branchId: "sahabi-abdullah-ibn-mughaffal",
  branch: { title: "Abdullah ibn Mughaffal al-Muzani", description: "A companion of the Tree pledge who remembered the Prophet's ﷺ recitation at the Conquest." },
  name: "Abdullah ibn Mughaffal",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "surah-al-fath-on-the-camel",
      title: "Al-Fath on the camel",
      line: "Ibn Mughaffal saw the Prophet ﷺ recite Al-Fath entering Makkah.",
      facts: ["The day Makkah was opened, he rode his she-camel.", "He recited Surah Al-Fath in a moving voice.", "Ibn Mughaffal never forgot that sound."],
      quote: quranQuote(48, 1),
      source: hadith("bukhari", "4281", "Abdullah ibn Mughaffal", "Sahih", "I saw the Prophet ﷺ on the day of the Conquest of Makkah on his she-camel, reciting Surah Al-Fath in a beautiful, vibrating voice.", "reciting Surat-al-Fath in a vibrant quivering tone"),
      difficulty: 1,
      questions: [
        { q: "Which surah did the Prophet ﷺ recite at the Conquest?", a: "Al-Fath", wrong: ["Al-Fatihah", "Al-Kahf", "Yasin"], why: "Reciting Surat-al-Fath on the day of the Conquest of Mecca." },
        { q: "What was he riding?", a: "His she-camel", wrong: ["A horse", "A donkey", "A boat"], why: "Over his she-camel." },
        { q: "Al-Fath means the victory or opening.", tf: true, why: "Indeed, We have given you a clear victory, 48:1." }
      ]
    },
    {
      slug: "prayer-between-adhans",
      title: "A prayer between two calls",
      line: "Ibn Mughaffal heard: there is a prayer between adhan and iqamah.",
      facts: ["The Prophet ﷺ said it three times.", "There is a voluntary prayer between the two calls.", "The third time he said: for whoever wishes."],
      source: hadith("bukhari", "624", "Abdullah ibn Mughaffal", "Sahih", "The Prophet ﷺ said three times: there is a prayer between every two calls, and the third time he added: for whoever wishes.", "There is a prayer between the two Adhans"),
      difficulty: 2,
      questions: [
        { q: "When is this extra prayer?", a: "Between adhan and iqamah", wrong: ["After sunset only", "At midnight only", "After Eid only"], why: "There is a prayer between the two Adhans." },
        { q: "How many times did he say it?", a: "Three", wrong: ["Once", "Seven", "Ten"], why: "Allah's Messenger ﷺ said it three times." },
        { q: "This prayer is a must for everyone.", tf: false, why: "For the one who wants to pray." }
      ]
    },
    {
      slug: "the-bag-of-fat",
      title: "Shy at Khaybar",
      line: "Ibn Mughaffal ran for a bag of fat, then felt shy.",
      facts: ["During the siege of Khaybar, a bag of fat was thrown out.", "Ibn Mughaffal rushed to grab it.", "He turned, saw the Prophet ﷺ, and felt shy."],
      source: hadith("bukhari", "4214", "Abdullah ibn Mughaffal", "Sahih", "While we were besieging Khaybar, someone threw out a leather bag of fat and I ran to take it. I turned and saw the Prophet ﷺ behind me, and I felt shy.", "So I felt shy"),
      difficulty: 2,
      questions: [
        { q: "What was thrown from the fort?", a: "A leather bag of fat", wrong: ["A sword", "A letter", "A shield"], why: "A person threw a leather container containing some fat." },
        { q: "Why did he stop?", a: "He felt shy before the Prophet ﷺ", wrong: ["He was hurt", "The bag broke", "It was locked"], why: "I looked behind and the Prophet ﷺ was there, so I felt shy." },
        { q: "Where did this happen?", a: "At Khaybar", wrong: ["At Badr", "In Makkah", "At Tabuk"], why: "While we were besieging Khaibar." }
      ]
    },
    {
      slug: "no-flicking-stones",
      title: "Do not flick stones",
      line: "Ibn Mughaffal taught: flicking stones only breaks eyes, teeth.",
      facts: ["The Prophet ﷺ forbade flicking small stones.", "A flicked stone does not hunt or stop an enemy.", "Harm comes from it, like a hurt eye."],
      source: hadith("bukhari", "6220", "Abdullah ibn Mughaffal", "Sahih", "The Prophet ﷺ forbade flicking stones with the fingers and said: it neither hunts game nor hurts an enemy, but it puts out an eye or breaks a tooth.", "it gouges out an eye or breaks a tooth"),
      difficulty: 1,
      questions: [
        { q: "What kind of throwing did the Prophet ﷺ forbid?", a: "Flicking small stones", wrong: ["Swimming", "Archery", "Riding"], why: "He forbade the throwing of stones with the fingers." },
        { q: "What harm can a flicked stone do?", a: "Hurt an eye or tooth", wrong: ["Nothing at all", "Catch a fish", "Stop an army"], why: "It gouges out an eye or breaks a tooth." },
        { q: "Flicking stones is a good way to hunt.", tf: false, why: "It neither hunts a game nor kills an enemy." }
      ]
    }
  ]
};

const MUGHIRAH: DeepUnit = {
  key: "mughirah",
  topicId: "sahabah",
  branchId: "sahabi-al-mughirah-ibn-shubah",
  branch: { title: "Al-Mughirah ibn Shu'bah", description: "A clever companion who served the Prophet ﷺ on journeys and told how he worshipped." },
  name: "Al-Mughirah ibn Shu'bah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "wiping-the-khuffs",
      title: "Wiping over leather socks",
      line: "Mughirah poured water as the Prophet ﷺ made wudu on a journey.",
      facts: ["Mughirah carried water for the Prophet ﷺ.", "He helped him make wudu.", "The Prophet ﷺ wiped over his leather socks."],
      source: hadith("bukhari", "388", "Al-Mughirah ibn Shu'bah", "Sahih", "I helped the Prophet ﷺ make wudu, and he wiped his wet hands over his leather socks and prayed.", "he passed his wet hands over his Khuffs and prayed"),
      difficulty: 1,
      questions: [
        { q: "What did the Prophet ﷺ wipe over?", a: "His leather socks", wrong: ["His sandals", "His turban only", "His cloak"], why: "He passed his wet hands over his Khuffs." },
        { q: "How did Mughirah help?", a: "He poured water", wrong: ["He cooked", "He led prayer", "He rode ahead"], why: "I poured water and he performed ablution." },
        { q: "Wiping over khuffs makes wudu easier on journeys.", tf: true, why: "He wiped over his Khuffs and prayed." }
      ]
    },
    {
      slug: "the-eclipse",
      title: "The eclipse and Ibrahim",
      line: "Mughirah heard: eclipses are not for anyone's death or birth.",
      facts: ["The sun eclipsed the day Ibrahim, the Prophet's ﷺ son, died.", "People said it was because of his death.", "He said: pray and call on Allah at an eclipse."],
      source: hadith("bukhari", "1043", "Al-Mughirah ibn Shu'bah", "Sahih", "The sun eclipsed on the day Ibrahim died and people said it was for his death. The Prophet ﷺ said: the sun and moon do not eclipse for anyone's death or birth. When you see it, pray and call on Allah.", "do not eclipse because of the death or life"),
      difficulty: 2,
      questions: [
        { q: "What did people wrongly think?", a: "The eclipse was for Ibrahim", wrong: ["The sun was gone forever", "Rain was coming", "Night had ended"], why: "The people said that the sun had eclipsed because of the death of Ibrahim." },
        { q: "What should we do at an eclipse?", a: "Pray and call on Allah", wrong: ["Stay inside", "Fast that day", "Look at the sky"], why: "When you see the eclipse pray and invoke Allah." },
        { q: "The Prophet ﷺ let a wrong belief spread to honor his son.", tf: false, why: "He said the sun and moon do not eclipse because of anyone's death." }
      ]
    },
    {
      slug: "forbidden-and-disliked",
      title: "What Allah dislikes",
      line: "Mughirah narrated what Allah forbade and what He dislikes.",
      facts: ["Allah forbade harming mothers and burying daughters.", "He forbade withholding rights and begging.", "He dislikes gossip, too many questions and waste."],
      source: hadith("bukhari", "2408", "Al-Mughirah ibn Shu'bah", "Sahih", "Allah has forbidden you to be undutiful to mothers, to bury daughters alive, to withhold others' rights, and to beg. He dislikes idle talk, asking too many questions, and wasting wealth.", "Allah has forbidden for you"),
      difficulty: 3,
      questions: [
        { q: "Who did Allah forbid us to be undutiful to?", a: "Our mothers", wrong: ["Our rivals", "Strangers only", "Kings"], why: "Allah has forbidden for you to be undutiful to your mothers." },
        { q: "Which of these does Allah dislike?", a: "Wasting wealth", wrong: ["Giving charity", "Saying salam", "Smiling"], why: "And to waste the wealth by extravagance." },
        { q: "Idle talk about others is loved by Allah.", tf: false, why: "Allah has hated for you vain, useless talk." }
      ]
    },
    {
      slug: "a-thankful-servant",
      title: "A thankful servant",
      line: "Mughirah saw the Prophet ﷺ pray until his feet swelled.",
      facts: ["The Prophet ﷺ prayed long at night.", "His feet would swell from standing.", "He said: shall I not be a thankful servant?"],
      source: hadith("bukhari", "6471", "Al-Mughirah ibn Shu'bah", "Sahih", "The Prophet ﷺ used to pray so long that his feet swelled. When asked why, he said: shall I not be a thankful servant?", "Shall I not be a thankful slave"),
      difficulty: 2,
      questions: [
        { q: "What happened to his feet?", a: "They swelled", wrong: ["They bled", "They froze", "Nothing"], why: "His feet used to become swollen." },
        { q: "Why did he pray so much?", a: "To be a thankful servant", wrong: ["To be seen", "Out of fear of people", "To win a prize"], why: "Shall I not be a thankful slave to Allah?" },
        { q: "Worship is a way of saying thank you to Allah.", tf: true, why: "Shall I not be a thankful slave?" }
      ]
    },
    {
      slug: "a-group-on-the-truth",
      title: "Always a group on the truth",
      line: "Mughirah heard: some of this ummah will stay on the truth.",
      facts: ["A group of the ummah will always stay on the truth.", "They will remain until the Last Day.", "So the truth will never be lost."],
      source: hadith("bukhari", "3640", "Al-Mughirah ibn Shu'bah", "Sahih", "The Prophet ﷺ said: some of my followers will remain victorious on the truth until the Last Day comes, and they will still be victorious.", "Some of my followers will remain victorious"),
      difficulty: 2,
      questions: [
        { q: "How long will this group remain?", a: "Until the Last Day", wrong: ["One year", "Until Badr", "Ten years"], why: "Till the Last Day comes." },
        { q: "The truth will one day vanish completely.", tf: false, why: "Some of my followers will remain victorious till the Last Day." },
        { q: "What will the group stay on?", a: "The truth", wrong: ["Wealth", "Power only", "A mountain"], why: "They will remain on the right path." }
      ]
    },
    {
      slug: "questions-about-dajjal",
      title: "Asking about Dajjal",
      line: "Mughirah asked more about Dajjal than anyone else.",
      facts: ["Mughirah asked many questions about Dajjal.", "People said Dajjal would bring bread and water.", "He said: Dajjal is too low before Allah for that."],
      source: hadith("bukhari", "7122", "Al-Mughirah ibn Shu'bah", "Sahih", "Nobody asked the Prophet ﷺ as much about Dajjal as I did. He asked: what worries you? I said: people say he will have mountains of bread and rivers of water. He said: he is too lowly before Allah for that.", "Nobody asked the Prophet"),
      difficulty: 3,
      questions: [
        { q: "What did Mughirah ask about most?", a: "Dajjal", wrong: ["Trade", "Poetry", "Horses"], why: "Nobody asked as many questions as I asked regarding Ad-Dajjal." },
        { q: "What did people say Dajjal would carry?", a: "Bread and water", wrong: ["Gold coins", "Swords", "Books"], why: "A mountain of bread and a river of water." },
        { q: "Dajjal is honored by Allah.", tf: false, why: "He is too mean to be allowed such a thing by Allah." }
      ]
    }
  ]
};

const SAMURAH: DeepUnit = {
  key: "samurah",
  topicId: "sahabah",
  branchId: "sahabi-samurah-ibn-jundub",
  branch: { title: "Samurah ibn Jundub", description: "A young companion who told the long dream the Prophet ﷺ described after Fajr." },
  name: "Samurah ibn Jundub",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "who-saw-a-dream",
      title: "Who saw a dream?",
      line: "Samurah said the Prophet ﷺ asked after Fajr who saw a dream.",
      facts: ["After Fajr he would face the people.", "He asked: who among you saw a dream?", "One day he told his own long dream."],
      source: hadith("bukhari", "1386", "Samurah ibn Jundub", "Sahih", "Whenever the Prophet ﷺ finished the morning prayer, he faced us and asked: who among you saw a dream last night? One day he said: I saw that two men came to me and took me by the hands.", "Who amongst you had a dream last night"),
      difficulty: 1,
      questions: [
        { q: "When did the Prophet ﷺ ask about dreams?", a: "After the Fajr prayer", wrong: ["At noon", "Before sleep", "On Eid only"], why: "Whenever the Prophet ﷺ finished the morning prayer." },
        { q: "What did he ask the people?", a: "Who saw a dream last night?", wrong: ["Who ate today?", "Who is tired?", "Who has money?"], why: "Who amongst you had a dream last night?" },
        { q: "He faced the people after the prayer.", tf: true, why: "He would face us and ask." }
      ]
    },
    {
      slug: "the-torn-cheek",
      title: "The punishment of lying",
      line: "Samurah told of the liar in the dream whose lies spread far.",
      facts: ["In the dream a man's cheek was being torn.", "He was a liar whose lies spread everywhere.", "Lies told to many bring a heavy punishment."],
      source: hadith("bukhari", "6096", "Samurah ibn Jundub", "Sahih", "The one whose cheek you saw being torn was a liar who told lies that people spread all over the world. He will be punished like that until the Day of Resurrection.", "was a liar and used to tell lies"),
      difficulty: 2,
      questions: [
        { q: "What sin did the torn-cheek man do?", a: "Telling lies", wrong: ["Stealing food", "Missing Eid", "Being lazy"], why: "He was a liar and used to tell lies." },
        { q: "How far did his lies go?", a: "All over the world", wrong: ["Only his home", "Nowhere", "One street"], why: "The people would report those lies till they spread all over the world." },
        { q: "Spreading lies is a small matter.", tf: false, why: "He will be punished like that till the Day of Resurrection." }
      ]
    },
    {
      slug: "the-crushed-head",
      title: "Quran without action",
      line: "Samurah told of one who learned the Quran but ignored it.",
      facts: ["A man's head was struck with a rock in the dream.", "He learned the Quran but did not act on it.", "He slept through the obligatory prayers."],
      source: hadith("bukhari", "1143", "Samurah ibn Jundub", "Sahih", "The one whose head was being crushed with a stone learned the Quran but never acted on it, and slept through the obligatory prayers.", "never acted on it"),
      difficulty: 2,
      questions: [
        { q: "What did the man fail to do?", a: "Act on the Quran", wrong: ["Learn to swim", "Build a house", "Travel"], why: "One who learnt the Quran but never acted on it." },
        { q: "What did he sleep through?", a: "The obligatory prayers", wrong: ["A wedding", "The market", "A journey"], why: "Slept ignoring the compulsory prayers." },
        { q: "Knowing the Quran is enough without acting.", tf: false, why: "He learnt the Quran but never acted on it." }
      ]
    },
    {
      slug: "the-river-of-blood",
      title: "The river of blood",
      line: "Samurah told of a riba-eater in a river of blood.",
      facts: ["In the dream a man stood in a river of blood.", "Each time he tried to leave, a stone pushed him back.", "He was one who ate riba, interest."],
      source: hadith("bukhari", "2085", "Samurah ibn Jundub", "Sahih", "We reached a river of blood with a man in it. Whenever he tried to come out, a man on the bank threw a stone into his mouth. I was told: the person in the river was a riba-eater.", "The person in the river was a Riba-eater"),
      difficulty: 3,
      questions: [
        { q: "Who was the man in the river?", a: "One who ate riba", wrong: ["A thief of camels", "A lazy guard", "A poet"], why: "The person in the river was a Riba-eater." },
        { q: "What was the river made of?", a: "Blood", wrong: ["Milk", "Honey", "Water"], why: "We reached a river of blood." },
        { q: "Riba means taking interest on loans.", tf: true, why: "Those dealing in Riba (usury)." }
      ]
    },
    {
      slug: "ibrahim-and-the-children",
      title: "Ibrahim and the children",
      line: "Samurah told of Prophet Ibrahim with children in a garden.",
      facts: ["The dream reached a green garden with a great tree.", "Ibrahim sat at its root with children.", "They were children who died on the fitrah."],
      source: hadith("bukhari", "7047", "Samurah ibn Jundub", "Sahih", "In the green garden was an old man with children around him. He was Ibrahim, and the children around him were those who die on the fitrah, the natural faith.", "those children who die with Al-Fitra"),
      difficulty: 2,
      questions: [
        { q: "Who sat with the children in the garden?", a: "Prophet Ibrahim", wrong: ["Prophet Nuh", "A king", "An angel of rain"], why: "Abraham and the children around him." },
        { q: "Who were the children?", a: "Children who died on the fitrah", wrong: ["Children of kings", "Angels", "Grown men"], why: "Those children who die with Al-Fitra." },
        { q: "Where was this scene?", a: "A green garden", wrong: ["A desert", "A river", "A cave"], why: "A well-flourished green garden having a huge tree." }
      ]
    }
  ]
};

export const COMPANION_UNITS: DeepUnit[] = [JAFAR, ABU_HURAIRAH, KAB, SAD_MUADH, ABDUR_RAHMAN, MUADH, UBAYY, ZAYD_THABIT, ABU_MUSA, JABIR, ABU_TALHAH, HUDHAYFAH, HAMZAH, ZAYD_HARITHAH, USAMAH, AMMAR, ABU_AYYUB, IBN_RAWAHAH, KHABBAB, UTHMAN_MAZUN, ABU_SAID, ABU_DARDA, UBADAH, SAD_UBADAH, BARA, IBN_AMR, IBN_SALAM, ASMA, SAHL, ABU_QATADAH, NUMAN, JARIR, THAWBAN, UQBAH, ABU_UMAMAH, IMRAN, IBN_MUGHAFFAL, MUGHIRAH, SAMURAH];
