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
      source: hadith("bukhari", "1461", "Anas ibn Malik", "Sahih", "Abu Talhah's most loved property was Bayruha garden, facing the masjid. When 'you will not attain righteousness until you spend from what you love' came down, he gave it for Allah, and the Prophet ﷺ told him to give it to his relatives.", "So I want to give it in charity in Allah"),
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

export const COMPANION_UNITS: DeepUnit[] = [JAFAR, ABU_HURAIRAH, KAB, SAD_MUADH, ABDUR_RAHMAN, MUADH, UBAYY, ZAYD_THABIT, ABU_MUSA, JABIR, ABU_TALHAH, HUDHAYFAH];
