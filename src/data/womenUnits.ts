import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// Great Women, in depth: the Mothers of the Believers in the order they joined the Prophet's ﷺ home, and the women
// the Quran tells about. Every card is from the Quran or a hadith checked on sunnah.com (its number and grade as
// sunnah.com gives them). Anything the scholars differ on (dates, ages, which marriage came first, weak reports)
// is left out.

const MOTHERS: DeepUnit = {
  key: "mothers",
  topicId: "women_of_the_book",
  branchId: "women-mothers",
  name: "the Mothers of the Believers",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "mothers-of-believers",
      title: "Mothers of the Believers",
      line: "Allah calls the Prophet's ﷺ wives the mothers of the believers.",
      facts: ["Allah says it in Surah Al-Ahzab.", "Each is honored like a mother.", "Here you learn them in order."],
      quote: quranQuote(33, 6),
      source: quran(33, 6, "The Prophet is closer to the believers than their own selves, and his wives are their mothers."),
      difficulty: 2,
      questions: [
        { q: "What does the Quran call the Prophet's ﷺ wives?", a: "Mothers of the believers", wrong: ["Queens of Arabia", "Daughters of Makkah", "Sisters of the Ansar"], why: "Quran 33:6 calls them the believers' mothers." },
        { q: "In which surah are they called mothers of the believers?", a: "Al-Ahzab", wrong: ["Al-Baqarah", "Maryam", "An-Nisa"], why: "Ayah 6 of Surah Al-Ahzab, the 33rd surah." },
        { q: "Believers should honor the Prophet's ﷺ wives like their own mothers.", tf: true, why: "That is why Allah gave them this name." }
      ]
    },
    {
      slug: "khadijah-best",
      title: "Khadijah: best of her time",
      line: "Khadijah was the best woman of her time, like Maryam.",
      facts: ["She was his first wife.", "Said by the Prophet ﷺ", "Told by Ali"],
      source: hadith("bukhari", "3815", "Ali ibn Abi Talib", "Sahih", "The Prophet ﷺ said: the best of the world's women in her time was Maryam, and the best of the world's women in her time is Khadijah."),
      difficulty: 2,
      questions: [
        { q: "The Prophet ﷺ named two best women, each of her own time. Who were they?", a: "Maryam and Khadijah", wrong: ["Hawwa and Sarah", "Hajar and Asiyah", "Aishah and Hafsah"], why: "Ali heard him say it." },
        { q: "Which wife was the first to marry the Prophet ﷺ?", a: "Khadijah", wrong: ["Aishah", "Sawdah", "Hafsah"], why: "She is the first Mother of the Believers." },
        { q: "The Prophet ﷺ said Khadijah was the best woman of her time.", tf: true, why: "Just as Maryam was the best of hers." }
      ]
    },
    {
      slug: "khadijah-remembered",
      title: "He never forgot her",
      line: "Years later, he still sent meat to Khadijah's friends.",
      facts: ["He spoke of her often.", "He said: from her I had children.", "Aishah told this story."],
      source: hadith("bukhari", "3818", "Aishah", "Sahih", "The Prophet ﷺ mentioned Khadijah often; when he slaughtered a sheep he sent parts of it to her friends, and said: she was such and such, and from her I had children."),
      difficulty: 3,
      questions: [
        { q: "After Khadijah died, what did the Prophet ﷺ do when he sacrificed a sheep?", a: "Sent meat to her friends", wrong: ["Gave it all to the masjid", "Sold it in the market", "Kept it for guests only"], why: "He kept honoring her through her friends." },
        { q: "What did he say Khadijah gave him that the others did not?", a: "Children", wrong: ["A house in Madinah", "A camel", "Gold coins"], why: "He said: from her I had children." },
        { q: "What does this teach about a good husband?", a: "Stay loyal, even after death", wrong: ["Forget the past quickly", "Speak only of new things", "Keep gifts for yourself"], why: "He kept her friends close for her sake." }
      ]
    },
    {
      slug: "khadijah-palace",
      title: "A palace with no noise",
      line: "Jibril brought Khadijah news of a calm palace in Paradise.",
      facts: ["It is made of hollow pearl (qasab).", "There is no noise and no tiredness there.", "Jibril brought her salam from her Lord."],
      source: hadith("bukhari", "3820", "Abu Hurairah", "Sahih", "Jibril said: Khadijah is coming with a dish; greet her from her Lord and from me, and give her the news of a palace of qasab in Paradise, with no noise and no tiredness."),
      difficulty: 3,
      questions: [
        { q: "What was Khadijah bringing when Jibril came?", a: "A dish of food", wrong: ["A letter", "A sword", "A copy of a scroll"], why: "She was bringing food or drink to the Prophet ﷺ." },
        { q: "What will her palace in Paradise NOT have?", a: "Noise or tiredness", wrong: ["Gardens", "Rivers", "Light"], why: "No noise and no tiredness in it." },
        { q: "Who sent salam to Khadijah, along with Jibril?", a: "Her Lord, Allah", wrong: ["Abu Bakr", "Her father", "The angels of Badr"], why: "Greet her from her Lord and from me." }
      ]
    },
    {
      slug: "sawdah-her-day",
      title: "Sawdah's gift",
      line: "Sawdah gave her day with the Prophet ﷺ to Aishah.",
      facts: ["Each wife had her own day.", "He drew lots for who would travel with him.", "Her full name was Sawdah bint Zam'ah."],
      source: hadith("bukhari", "2593", "Aishah", "Sahih", "The Prophet ﷺ drew lots for which wife went on a journey and gave each a day and a night; Sawdah bint Zam'ah gave her day and night to Aishah, seeking his pleasure."),
      difficulty: 3,
      questions: [
        { q: "How did the Prophet ﷺ choose which wife went on a journey?", a: "He drew lots", wrong: ["The eldest always went", "He asked their fathers", "The newest wife went"], why: "Drawing lots was fair to all of them." },
        { q: "What did Sawdah give to Aishah?", a: "Her day and night", wrong: ["Her house", "Her jewelry", "Her camel"], why: "She gave her turn with the Prophet ﷺ." },
        { q: "Why did Sawdah give her day away?", a: "To please the Prophet ﷺ", wrong: ["She was angry", "She moved to Makkah", "Her father told her to"], why: "She was seeking his pleasure." }
      ]
    },
    {
      slug: "sawdah-early",
      title: "Leaving early",
      line: "Sawdah moved slowly, so she left Muzdalifah early.",
      facts: ["It was in Hajj, on the night at Muzdalifah.", "She asked his permission first.", "He said yes."],
      source: hadith("bukhari", "1680", "Aishah", "Sahih", "Sawdah asked the Prophet ﷺ to let her leave early on the night of Jam' (Muzdalifah), as she was a heavy, slow woman, and he gave her permission."),
      difficulty: 3,
      questions: [
        { q: "Where did Sawdah ask to leave early during Hajj?", a: "Muzdalifah", wrong: ["Arafah", "Madinah", "Mount Uhud"], why: "The night of Jam' is the night at Muzdalifah." },
        { q: "Why did she ask to leave before the crowds?", a: "She moved slowly", wrong: ["She was afraid of the dark", "She had finished Hajj", "She was going home"], why: "She was a heavy, slow woman." },
        { q: "What does this teach about Islam?", a: "It makes things easy for the weak", wrong: ["Rules never change", "Only the strong do Hajj", "Asking is wrong"], why: "He gave her permission at once." }
      ]
    },
    {
      slug: "sawdah-loved",
      title: "I wished to be like her",
      line: "Aishah said she wished she could be just like Sawdah.",
      facts: ["No woman was dearer to Aishah.", "She was full of spirit."],
      source: hadith("muslim", "1463", "Aishah", "Sahih", "Aishah said: I never saw a woman I would rather be like than Sawdah bint Zam'ah; when she grew old she gave her day to Aishah."),
      difficulty: 3,
      questions: [
        { q: "What did Aishah wish about Sawdah?", a: "To be just like her", wrong: ["That she would move away", "To have her house", "To travel with her"], why: "Aishah loved her deeply." },
        { q: "Sawdah and Aishah were enemies.", tf: false, why: "Aishah wished she could be just like Sawdah." },
        { q: "When did Sawdah give her day to Aishah?", a: "When she grew old", wrong: ["On her wedding day", "After Badr", "In Ramadan only"], why: "Aishah said: when she grew old." }
      ]
    },
    {
      slug: "aishah-tharid",
      title: "Like the best dish",
      line: "Aishah's virtue over women is like tharid over other food.",
      facts: ["Tharid: bread soaked in broth", "It was the best Arab dish.", "Told by Anas"],
      source: hadith("bukhari", "3770", "Anas ibn Malik", "Sahih", "The Prophet ﷺ said: the superiority of Aishah over other women is like the superiority of tharid over other food."),
      difficulty: 3,
      questions: [
        { q: "What is tharid?", a: "Bread soaked in meat broth", wrong: ["A sweet date drink", "Roasted barley", "A kind of fish"], why: "It was the most loved dish of the Arabs." },
        { q: "The Prophet ﷺ compared Aishah's virtue over women to what?", a: "Tharid over other food", wrong: ["Gold over silver", "The moon over stars", "Rain over sand"], why: "Tharid was the best of meals to them." },
        { q: "Who reported Aishah's likeness to tharid?", a: "Anas ibn Malik", wrong: ["Abu Bakr", "Aishah herself", "Umar"], why: "Anas served the Prophet ﷺ for years." }
      ]
    },
    {
      slug: "aishah-jibril",
      title: "Jibril greets Aishah",
      line: "The Prophet ﷺ told Aishah: this is Jibril, greeting you.",
      facts: ["She returned his salam.", "She said: you see what I don't see."],
      source: hadith("bukhari", "3768", "Aishah", "Sahih", "The Prophet ﷺ said: O Aishah, this is Jibril greeting you. She said: and upon him be peace and Allah's mercy and blessings; you see what I do not see."),
      difficulty: 3,
      questions: [
        { q: "Who sent greetings of peace to Aishah?", a: "Jibril", wrong: ["Mika'il", "Her father Abu Bakr", "The Negus"], why: "The Prophet ﷺ passed on Jibril's salam." },
        { q: "What did Aishah say she could not do?", a: "See what he sees", wrong: ["Read the Quran", "Hear the adhan", "Travel far"], why: "She said: you see what I do not see." },
        { q: "Aishah answered Jibril's salam.", tf: true, why: "She said: and upon him be peace and Allah's mercy." }
      ]
    },
    {
      slug: "aishah-choice",
      title: "She chose Allah",
      line: "Given a choice, Aishah chose Allah and His Messenger ﷺ.",
      facts: ["Quran 33:28-29", "He told her: ask your parents first.", "The other wives chose the same."],
      quote: quranQuote(33, 29),
      source: hadith("bukhari", "4785", "Aishah", "Sahih", "When Allah told the Prophet ﷺ to give his wives a choice, he started with Aishah and told her to consult her parents; she said she wanted Allah, His Messenger and the Home of the Hereafter."),
      difficulty: 4,
      questions: [
        { q: "What did the Prophet ﷺ tell Aishah before she answered?", a: "Ask your parents first", wrong: ["Answer right now", "Ask Umar", "Wait a year"], why: "He did not want her to hurry." },
        { q: "What did Aishah choose?", a: "Allah, His Messenger ﷺ and the Hereafter", wrong: ["The riches of this world", "To go back to her father", "A house in Makkah"], why: "She did not even need to ask her parents." },
        { q: "The choice was between this world's riches and what?", a: "Allah, His Messenger ﷺ and the Hereafter", wrong: ["A bigger house", "Leaving for Makkah", "More servants"], why: "Quran 33:28-29." },
        { q: "Aishah was the only wife who chose the Prophet ﷺ.", tf: false, why: "The other wives chose the same." }
      ]
    },
    {
      slug: "aishah-loved",
      title: "Who he loved most",
      line: "Asked who he loved most, he said Aishah; of men, her father.",
      facts: ["Amr ibn al-As asked him.", "After him, he named Umar."],
      source: hadith("bukhari", "3662", "Amr ibn al-As", "Sahih", "Amr asked: who is most beloved to you? He said: Aishah. Among men? He said: her father. Then who? He said: Umar ibn al-Khattab."),
      difficulty: 4,
      questions: [
        { q: "Among men, who did he say he loved most?", a: "Abu Bakr, her father", wrong: ["Umar", "Ali", "Amr ibn al-As"], why: "He said: her father." },
        { q: "Who asked the Prophet ﷺ this question?", a: "Amr ibn al-As", wrong: ["Abu Hurayrah", "Anas", "Bilal"], why: "He had just led an army." },
        { q: "Who came next after Abu Bakr?", a: "Umar ibn al-Khattab", wrong: ["Uthman", "Khalid", "Sa'd"], why: "Then Umar, then other men." }
      ]
    },
    {
      slug: "aishah-last-days",
      title: "In Aishah's house",
      line: "The Prophet ﷺ passed away in Aishah's house, resting on her.",
      facts: ["It was on the day of her turn.", "She softened a siwak for him."],
      source: hadith("bukhari", "3100", "Aishah", "Sahih", "The Prophet ﷺ died in my house on my day, leaning on my chest; Abd ar-Rahman came with a siwak, and I chewed it soft and gave it to him."),
      difficulty: 4,
      questions: [
        { q: "In whose house did the Prophet ﷺ pass away?", a: "Aishah's", wrong: ["Hafsah's", "Umm Salamah's", "Fatimah's"], why: "It was the day of her turn." },
        { q: "What did Aishah soften for him in his last hours?", a: "A siwak", wrong: ["Bread", "A cushion", "Dates"], why: "He was too weak, so she chewed it soft." },
        { q: "Even at the end, the Prophet ﷺ cleaned his teeth.", tf: true, why: "He used the siwak she softened." }
      ]
    },
    {
      slug: "hafsah-widow",
      title: "Hafsah, a young widow",
      line: "Hafsah lost her husband, and the Prophet ﷺ married her.",
      facts: ["First husband: Khunays", "Umar first asked Uthman, then Abu Bakr.", "Then the Prophet ﷺ asked to marry her."],
      source: hadith("bukhari", "5122", "Ibn Umar", "Sahih", "When Hafsah was widowed by Khunays ibn Hudhafah, Umar offered her to Uthman, then to Abu Bakr; then the Prophet ﷺ asked for her and married her."),
      difficulty: 3,
      questions: [
        { q: "Who was Hafsah's father?", a: "Umar ibn al-Khattab", wrong: ["Abu Bakr", "Abu Sufyan", "Al-Abbas"], why: "She was Hafsah bint Umar." },
        { q: "Who did Umar first offer Hafsah to in marriage?", a: "Uthman", wrong: ["Ali", "Khalid", "Bilal"], why: "Then Abu Bakr, who kept quiet." },
        { q: "Why did Abu Bakr keep quiet when Umar asked him?", a: "The Prophet ﷺ had spoken of her", wrong: ["He was angry with Umar", "He was traveling", "He did not hear"], why: "Abu Bakr would not tell the Prophet's ﷺ secret." }
      ]
    },
    {
      slug: "hafsah-sheets",
      title: "Hafsah's sheets",
      line: "Uthman copied the Quran from the sheets kept with Hafsah.",
      facts: ["The Quran was gathered under Abu Bakr.", "Umar kept the sheets, then Hafsah.", "Copies were sent to every land."],
      source: hadith("bukhari", "4987", "Anas ibn Malik", "Sahih", "Uthman sent to Hafsah for the sheets of the Quran, had Zayd ibn Thabit and others copy them, returned them to her, and sent a copy to every land."),
      difficulty: 4,
      questions: [
        { q: "Whose sheets did Uthman copy the Quran from?", a: "Hafsah's", wrong: ["Aishah's", "Ali's", "Ubayy's"], why: "Abu Bakr's sheets were kept with her." },
        { q: "What did Uthman do with the sheets after copying them?", a: "Gave them back to Hafsah", wrong: ["Burned them", "Kept them himself", "Buried them"], why: "He returned them to her." },
        { q: "Who led the writing of the copies?", a: "Zayd ibn Thabit", wrong: ["Hafsah", "Abu Hurayrah", "Mu'awiyah"], why: "With three men from Quraysh." }
      ]
    },
    {
      slug: "umm-salamah-dua",
      title: "Umm Salamah's du'a",
      line: "Umm Salamah asked Allah for better, and got the Prophet ﷺ.",
      facts: ["First husband: Abu Salamah", "Say: inna lillahi wa inna ilayhi raji'un", "Then ask Allah for something better."],
      source: hadith("muslim", "918", "Umm Salamah", "Sahih", "The Prophet ﷺ taught: say 'we belong to Allah and to Him we return; O Allah reward me for my loss and give me better'. When Abu Salamah died she said it, and Allah gave her the Prophet ﷺ."),
      difficulty: 3,
      questions: [
        { q: "What did Umm Salamah ask Allah for after Abu Salamah died?", a: "Something better than him", wrong: ["To go back to Makkah", "Riches", "A long life"], why: "She said the du'a the Prophet ﷺ taught." },
        { q: "Who was 'better' that Allah gave her?", a: "The Prophet ﷺ", wrong: ["Umar", "Her son", "Khalid"], why: "He married her after her loss." },
        { q: "What do Muslims say at a loss, from this du'a?", a: "We belong to Allah and to Him we return", wrong: ["This is bad luck", "Why me?", "I will never smile again"], why: "Inna lillahi wa inna ilayhi raji'un." }
      ]
    },
    {
      slug: "umm-salamah-advice",
      title: "Wise advice at Hudaybiyah",
      line: "At Hudaybiyah, Umm Salamah said: go out and sacrifice first.",
      facts: ["At first, the people did not move.", "He did it first, and they all followed."],
      source: hadith("bukhari", "2731", "Al-Miswar and Marwan", "Sahih", "After the treaty no one got up to sacrifice and shave. Umm Salamah said: go out, speak to no one, sacrifice and have your head shaved. He did, and they all followed."),
      difficulty: 4,
      questions: [
        { q: "What did the companions fail to do after the treaty at first?", a: "Sacrifice and shave", wrong: ["Pray Asr", "Go back home", "Sign the treaty"], why: "They were sad about the treaty." },
        { q: "What did Umm Salamah advise?", a: "Do it yourself first, without a word", wrong: ["Shout at them", "Leave them there", "Ask Abu Bakr to order them"], why: "When they saw him do it, they rushed to follow." },
        { q: "The Prophet ﷺ took his wife's advice.", tf: true, why: "He went out and did exactly as she said." },
        { q: "What does the story teach?", a: "Leading by example works", wrong: ["Women's advice is not needed", "Orders must be shouted", "Treaties are always bad"], why: "Actions moved them more than words." }
      ]
    },
    {
      slug: "zaynab-jahsh-married",
      title: "Married by Allah",
      line: "Zaynab said: Allah married me from above seven heavens.",
      facts: ["Quran 33:37", "Before: wife of Zayd ibn Harithah", "She was his cousin."],
      quote: quranQuote(33, 37),
      source: hadith("bukhari", "7420", "Anas ibn Malik", "Sahih", "Zaynab used to tell the other wives: your families married you off, but Allah married me from above seven heavens. Quran 33:37 came about her and Zayd."),
      difficulty: 4,
      questions: [
        { q: "What did Zaynab say made her marriage special?", a: "Allah married her to him", wrong: ["Her father arranged it", "It was in Makkah", "It was the first"], why: "Quran 33:37 tells of her marriage." },
        { q: "Who was Zaynab married to before?", a: "Zayd ibn Harithah", wrong: ["Abu Salamah", "Khunays", "Abdullah ibn Jahsh"], why: "Zayd had been raised in the Prophet's ﷺ home." },
        { q: "Which ayah tells about Zaynab's marriage?", a: "Quran 33:37", wrong: ["Quran 2:255", "Quran 112:1", "Quran 1:5"], why: "In Surah Al-Ahzab." }
      ]
    },
    {
      slug: "zaynab-longest-hand",
      title: "The longest hand",
      line: "Zaynab had the 'longest hand': she worked and gave in charity.",
      facts: ["She was the first wife to follow him in death.", "She worked with her own hands."],
      source: hadith("muslim", "2452", "Aishah", "Sahih", "The Prophet ﷺ said: the one with the longest hand will join me first. It was Zaynab, for she worked with her hands and gave in charity."),
      difficulty: 4,
      questions: [
        { q: "What did 'the longest hand' really mean?", a: "Giving the most charity", wrong: ["Being the tallest", "Writing the most", "Having long fingers"], why: "The wives measured hands at first, then understood." },
        { q: "How did Zaynab earn what she gave away?", a: "Working with her own hands", wrong: ["Gifts from kings", "Trading camels", "From her father"], why: "She worked and spent it on charity." },
        { q: "The 'longest hand' would be the first to do what?", a: "Join the Prophet ﷺ after death", wrong: ["Lead the prayer", "Go on Hajj", "Learn the Quran"], why: "She was the first wife to die after him." }
      ]
    },
    {
      slug: "juwayriyah-blessing",
      title: "A blessing for her people",
      line: "His marriage to Juwayriyah freed a hundred families.",
      facts: ["Tribe: Banu al-Mustaliq", "The companions freed her relatives.", "Hasan hadith"],
      source: hadith("abudawud", "3931", "Aishah", "Hasan (Al-Albani)", "When people heard the Prophet ﷺ married Juwayriyah, they freed their captives, saying they are his in-laws. A hundred families of Banu al-Mustaliq were freed because of her."),
      difficulty: 4,
      questions: [
        { q: "Which tribe was Juwayriyah from?", a: "Banu al-Mustaliq", wrong: ["Quraysh", "Banu Nadir", "Thaqif"], why: "Her father al-Harith was its chief." },
        { q: "Why did the companions free their captives?", a: "They were now his in-laws", wrong: ["They were paid gold", "The war was lost", "Umar ordered it"], why: "They would not keep his wife's family as captives." },
        { q: "How many families were freed because of her?", a: "One hundred", wrong: ["Ten", "Forty", "One thousand"], why: "Aishah said no woman brought more blessing to her people." }
      ]
    },
    {
      slug: "juwayriyah-words",
      title: "Four heavy words",
      line: "Four phrases outweighed Juwayriyah's whole morning of dhikr.",
      facts: ["She sat in dhikr from Fajr until forenoon.", "Subhanallahi wa bihamdihi", "As many times as His creation."],
      source: hadith("muslim", "2726", "Juwayriyah", "Sahih", "The Prophet ﷺ found Juwayriyah still in her place of prayer and said: I said four phrases three times; weighed against all you said, they would outweigh it: glory and praise to Allah, as many as His creation, as He is pleased, the weight of His Throne, the ink of His words."),
      difficulty: 5,
      questions: [
        { q: "How long had Juwayriyah been sitting in dhikr?", a: "From Fajr until forenoon", wrong: ["Five minutes", "All night", "Since Asr"], why: "He left at dawn and came back in the forenoon." },
        { q: "How many times did he say the four phrases?", a: "Three times", wrong: ["Once", "Seven times", "One hundred times"], why: "Yet they outweighed her whole morning." },
        { q: "Which of these is part of those words?", a: "As many as His creation", wrong: ["As many as the stars only", "As loud as thunder", "As long as a year"], why: "Subhanallahi wa bihamdihi, 'adada khalqihi." },
        { q: "What does the hadith teach about dhikr?", a: "Choosing deep words brings great reward", wrong: ["Long sitting is useless", "Dhikr is only for men", "Words do not matter"], why: "Some words of dhikr are heavier than others." }
      ]
    },
    {
      slug: "umm-habibah-twelve",
      title: "A house for twelve",
      line: "Twelve sunnah rak'ahs a day: a house in Paradise.",
      facts: ["Umm Habibah was Abu Sufyan's daughter.", "She never stopped praying them."],
      source: hadith("muslim", "728", "Umm Habibah", "Sahih", "The Prophet ﷺ said: whoever prays twelve rak'ahs in a day and night, a house is built for him in Paradise. Umm Habibah said: I never left them since."),
      difficulty: 3,
      questions: [
        { q: "How many voluntary rak'ahs a day earn a house in Paradise?", a: "Twelve", wrong: ["Two", "Five", "Forty"], why: "Twelve rak'ahs in a day and a night." },
        { q: "What did Umm Habibah do after hearing it?", a: "Never stopped praying them", wrong: ["Prayed them once", "Told no one", "Waited for Ramadan"], why: "She acted on it for life." },
        { q: "Who was Umm Habibah's father?", a: "Abu Sufyan", wrong: ["Abu Bakr", "Abu Talib", "Abu Lahab"], why: "The chief of Makkah, who later became Muslim." }
      ]
    },
    {
      slug: "umm-habibah-mourning",
      title: "Three days of mourning",
      line: "Umm Habibah mourned her father only three days, as taught.",
      facts: ["Then she put on perfume.", "For a husband: 4 months, 10 days"],
      source: hadith("bukhari", "1280", "Zaynab bint Abi Salamah", "Sahih", "When news came that Abu Sufyan died, Umm Habibah put on perfume on the third day, saying: I heard the Prophet ﷺ say a believing woman may not mourn more than three days, except for a husband: four months and ten days."),
      difficulty: 5,
      questions: [
        { q: "Why did Umm Habibah put on perfume on the third day?", a: "To show mourning had ended", wrong: ["She was going to a wedding", "She forgot her father", "It was Eid"], why: "She did not need perfume, but obeyed the Sunnah." },
        { q: "How long may a woman mourn a relative who is not her husband?", a: "Three days", wrong: ["One day", "Forty days", "One year"], why: "No more than three days." },
        { q: "How long is mourning for a husband?", a: "Four months and ten days", wrong: ["Three days", "One month", "Seven days"], why: "The Prophet ﷺ said it in this hadith." }
      ]
    },
    {
      slug: "safiyyah-freed",
      title: "Her freedom, her mahr",
      line: "The Prophet ﷺ freed Safiyyah, and her freedom was her mahr.",
      facts: ["Mahr: the bride's gift", "This was after Khaybar.", "Told by Anas"],
      source: hadith("bukhari", "5086", "Anas ibn Malik", "Sahih", "The Prophet ﷺ freed Safiyyah and made her freedom her mahr."),
      difficulty: 3,
      questions: [
        { q: "What was Safiyyah's mahr?", a: "Her freedom", wrong: ["A garden", "A hundred camels", "A gold ring"], why: "He freed her and married her." },
        { q: "What is a mahr?", a: "A gift the groom gives the bride", wrong: ["A gift to the bride's father", "A wedding meal", "A tax"], why: "It belongs to the bride." },
        { q: "Who reported that Safiyyah's freedom was her mahr?", a: "Anas ibn Malik", wrong: ["Aishah", "Umar", "Bilal"], why: "Anas was in the Prophet's ﷺ service." }
      ]
    },
    {
      slug: "safiyyah-honor",
      title: "Daughter of a prophet",
      line: "Safiyyah: a prophet's daughter, married to a prophet.",
      facts: ["She was from Bani Isra'il.", "Her uncle: a prophet", "Sahih (Al-Albani)"],
      source: hadith("tirmidhi", "3894", "Anas ibn Malik", "Sahih (Al-Albani)", "Safiyyah cried when called 'daughter of a Jew'. The Prophet ﷺ said: you are the daughter of a prophet, your uncle is a prophet, and you are married to a prophet; so what can she boast over you?"),
      difficulty: 4,
      questions: [
        { q: "Why was Safiyyah crying?", a: "She was mocked for her family", wrong: ["She was sick", "She lost her money", "She missed Khaybar"], why: "Someone called her 'the daughter of a Jew'." },
        { q: "Whose daughter did he say she was?", a: "A prophet's", wrong: ["A king's", "A poet's", "A trader's"], why: "She descended from Harun, the brother of Musa." },
        { q: "What does this teach when someone is mocked for their family?", a: "Comfort them with their honor", wrong: ["Laugh along", "Stay silent", "Mock back"], why: "He turned her sadness into pride." }
      ]
    },
    {
      slug: "safiyyah-itikaf",
      title: "This is Safiyyah",
      line: "He walked Safiyyah home and said to two men: this is Safiyyah.",
      facts: ["It was during i'tikaf in Ramadan.", "He said it to stop wrong thoughts."],
      source: hadith("bukhari", "2035", "Safiyyah", "Sahih", "Safiyyah visited the Prophet ﷺ in i'tikaf. He walked her back, and told two Ansari men: this is my wife Safiyyah, for Satan runs in a person like blood."),
      difficulty: 4,
      questions: [
        { q: "Where was the Prophet ﷺ when Safiyyah visited him?", a: "In i'tikaf in the masjid", wrong: ["On a journey", "At the market", "At Uhud"], why: "In the last ten days of Ramadan." },
        { q: "Why did he tell the two men 'this is Safiyyah'?", a: "So no one would think badly", wrong: ["They did not know him", "To show her off", "They asked her name"], why: "He closed the door to suspicion." },
        { q: "A Muslim should avoid things that make others suspect them.", tf: true, why: "The Prophet ﷺ did it himself." }
      ]
    },
    {
      slug: "maymunah-ghusl",
      title: "Maymunah teaches ghusl",
      line: "Maymunah described the Prophet's ﷺ ghusl, step by step.",
      facts: ["First hands, private parts, then wudu.", "Then water over the head and body.", "The feet are washed last."],
      source: hadith("bukhari", "274", "Maymunah", "Sahih", "Maymunah described the Prophet's ﷺ ghusl: he washed his hands, private parts, rinsed mouth and nose, face and forearms, poured water over his head and body, then moved and washed his feet."),
      difficulty: 4,
      questions: [
        { q: "What did Maymunah teach the Muslims?", a: "How he did ghusl", wrong: ["How to bake bread", "How to fight", "How to write"], why: "She described his full bath step by step." },
        { q: "In her description, what did he wash last?", a: "His feet", wrong: ["His face", "His hands", "His head"], why: "He moved from that spot and washed his feet." },
        { q: "What did he refuse at the end?", a: "A cloth to dry off", wrong: ["The water", "Soap", "Help with his feet"], why: "He wiped the water off with his hand." }
      ]
    },
    {
      slug: "maymunah-gentle",
      title: "Gently, she is his wife",
      line: "At Maymunah's funeral, Ibn Abbas said: carry her gently.",
      facts: ["It was at Sarif, near Makkah.", "He said: this is the Prophet's ﷺ wife."],
      source: hadith("bukhari", "5067", "Ata", "Sahih", "At Maymunah's funeral at Sarif, Ibn Abbas said: this is the wife of the Prophet ﷺ; when you lift her bier, do not shake it, walk gently."),
      difficulty: 5,
      questions: [
        { q: "Where was Maymunah's funeral?", a: "Sarif", wrong: ["Madinah", "Taif", "Jerusalem"], why: "Ibn Abbas led the people there." },
        { q: "What did Ibn Abbas tell the people carrying her?", a: "Walk gently, don't shake it", wrong: ["Hurry up", "Sing as you walk", "Put it down"], why: "Out of respect: she was the Prophet's ﷺ wife." },
        { q: "Ibn Abbas was Maymunah's nephew. What do his words show?", a: "Love and respect for the Mothers", wrong: ["He was in a rush", "He disliked her", "He was a stranger"], why: "Believers honor the Mothers even after death." }
      ]
    }
  ]
};

const QURAN_WOMEN: DeepUnit = {
  key: "quranwomen",
  topicId: "women_of_the_book",
  branchId: "women-quran",
  name: "the women in the Quran",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "imran-vow",
      title: "The wife of Imran's vow",
      line: "Imran's wife promised her unborn child to Allah's service.",
      facts: ["She was the grandmother of Isa.", "She prayed: accept it from me."],
      quote: quranQuote(3, 35),
      source: quran(3, 35, "The wife of Imran said: my Lord, I have vowed to You what is in my womb, set free for Your service, so accept it from me."),
      difficulty: 2,
      questions: [
        { q: "What did the wife of Imran promise to Allah?", a: "Her unborn child", wrong: ["Her house", "Her gold", "A camel"], why: "She vowed the child to Allah's service." },
        { q: "Who was the child she was carrying?", a: "Maryam", wrong: ["Isa", "Yahya", "Musa"], why: "Maryam, the mother of Isa." },
        { q: "What did she ask Allah to do with her gift?", a: "Accept it from her", wrong: ["Return it", "Make it rich", "Keep it secret"], why: "Accept this from me, You are the Hearing, the Knowing." }
      ]
    },
    {
      slug: "maryam-named",
      title: "I named her Maryam",
      line: "She named her daughter Maryam and asked Allah to protect her.",
      facts: ["She had hoped for a boy.", "She asked: protect her and her children.", "She asked for protection from Shaytan."],
      quote: quranQuote(3, 36),
      source: quran(3, 36, "When she gave birth she said: I have delivered a girl; I named her Maryam, and I seek refuge for her and her children in You from Satan."),
      difficulty: 2,
      questions: [
        { q: "Who did Maryam's mother ask Allah to protect her from?", a: "Shaytan", wrong: ["Pharaoh", "Wild animals", "Her own family"], why: "From Satan, the expelled." },
        { q: "Who else did she ask protection for?", a: "Maryam's children", wrong: ["Her husband", "Her tribe", "Zakariyya"], why: "Her and her descendants." },
        { q: "Maryam's mother named her daughter herself.", tf: true, why: "She said: I have named her Maryam." }
      ]
    },
    {
      slug: "maryam-provision",
      title: "It is from Allah",
      line: "Zakariyya found food with Maryam; she said: it is from Allah.",
      facts: ["Zakariyya took care of her.", "It was in her prayer room (mihrab)."],
      quote: quranQuote(3, 37),
      source: quran(3, 37, "Allah put Maryam in Zakariyya's care. Whenever he entered her prayer chamber he found food with her; she said: it is from Allah, who provides without measure."),
      difficulty: 3,
      questions: [
        { q: "Who looked after Maryam as she grew up?", a: "Zakariyya", wrong: ["Imran", "Yusuf", "Harun"], why: "Allah placed her in his care." },
        { q: "What did Zakariyya find each time he entered her room?", a: "Food", wrong: ["A letter", "Gold", "A lamp"], why: "Provision that no one had brought her." },
        { q: "What did Maryam answer when asked where it came from?", a: "It is from Allah", wrong: ["From my mother", "From the market", "From the priests"], why: "Allah gives to whom He wills without measure." }
      ]
    },
    {
      slug: "maryam-chosen",
      title: "Chosen above all women",
      line: "Angels said: Allah chose Maryam above all women.",
      facts: ["She was chosen twice over.", "Allah purified her.", "The angels told her this."],
      quote: quranQuote(3, 42),
      source: quran(3, 42, "The angels said: O Maryam, Allah has chosen you, purified you, and chosen you above the women of the worlds."),
      difficulty: 3,
      questions: [
        { q: "Who told Maryam she had been chosen?", a: "The angels", wrong: ["Zakariyya", "Her mother", "A dream"], why: "Quran 3:42." },
        { q: "Above whom did Allah choose Maryam?", a: "The women of the worlds", wrong: ["Only her village", "The men of Bani Isra'il", "The prophets"], why: "Chosen above the women of the worlds." },
        { q: "Maryam is the only woman named in the Quran.", tf: true, why: "She is the one woman the Quran calls by name." }
      ]
    },
    {
      slug: "maryam-palm",
      title: "Shake the palm tree",
      line: "In pain, Maryam was told: shake the palm, fresh dates will fall.",
      facts: ["A stream flowed below her.", "She was told: eat, drink, be glad."],
      quote: quranQuote(19, 25),
      source: quran(19, 25, "She was told: shake the trunk of the palm tree toward you; it will drop ripe, fresh dates on you."),
      difficulty: 3,
      questions: [
        { q: "Where did Maryam go when the birth pains came?", a: "To the trunk of a palm tree", wrong: ["Into the city", "To the Ka'bah", "To a cave"], why: "Quran 19:23." },
        { q: "What would fall when she shook the trunk?", a: "Fresh, ripe dates", wrong: ["Leaves", "Water", "Stones"], why: "Quran 19:25." },
        { q: "What was placed below her to drink from?", a: "A stream", wrong: ["A well", "A jug", "Rain"], why: "Your Lord has put a stream beneath you." },
        { q: "What does this show?", a: "Allah cares in hard moments", wrong: ["Pain means Allah is angry", "She was alone forever", "Trees are holy"], why: "Allah provided food, drink and comfort." }
      ]
    },
    {
      slug: "maryam-silence",
      title: "A fast from speaking",
      line: "Maryam was told: say you vowed a fast from speaking.",
      facts: ["Then baby Isa spoke.", "Quran 19:26-30"],
      quote: quranQuote(19, 26),
      source: quran(19, 26, "Eat and drink and be content; and if you see anyone, say: I have vowed a fast to the Most Merciful, so I will not speak to anyone today."),
      difficulty: 4,
      questions: [
        { q: "What kind of fast did Maryam vow?", a: "A fast from speaking", wrong: ["A fast from water", "A month-long fast", "A fast from sleep"], why: "I will not speak to anyone today." },
        { q: "To whom did she make the vow?", a: "The Most Merciful", wrong: ["Her people", "Zakariyya", "The angels"], why: "Ar-Rahman, Allah." },
        { q: "Who spoke for her when people blamed her?", a: "Baby Isa", wrong: ["Zakariyya", "Jibril", "Her mother"], why: "Isa spoke from the cradle (19:29-30)." }
      ]
    },
    {
      slug: "musa-mother-promise",
      title: "A promise to Musa's mother",
      line: "Allah promised: We will return him and make him a messenger.",
      facts: ["She was told: nurse him first.", "Do not fear, and do not grieve."],
      quote: quranQuote(28, 7),
      source: quran(28, 7, "We inspired Musa's mother: nurse him, and when you fear for him, cast him into the river; do not fear or grieve, We will return him to you and make him a messenger."),
      difficulty: 3,
      questions: [
        { q: "What two promises did Allah make Musa's mother?", a: "Return him, and make him a messenger", wrong: ["Make him rich and a king", "Keep him in Egypt forever", "Give her a palace"], why: "Both came true." },
        { q: "What was she told to do first?", a: "Nurse him", wrong: ["Hide him in the desert", "Give him to Pharaoh", "Run away"], why: "Then the river, if she feared for him." },
        { q: "Allah told her to feel afraid and sad.", tf: false, why: "He said: do not fear and do not grieve." }
      ]
    },
    {
      slug: "musa-mother-heart",
      title: "An empty heart",
      line: "Her heart felt empty, but Allah made it firm.",
      facts: ["She almost told everyone.", "Allah made her heart firm."],
      quote: quranQuote(28, 10),
      source: quran(28, 10, "The heart of Musa's mother became empty; she nearly revealed him, had We not bound her heart firm so she would be a believer."),
      difficulty: 4,
      questions: [
        { q: "How did Musa's mother feel after casting him in the river?", a: "Her heart felt empty", wrong: ["Proud", "Relieved", "Angry"], why: "She could think of nothing but him." },
        { q: "What nearly happened?", a: "She almost revealed him", wrong: ["She almost drowned", "She almost left Egypt", "She almost forgot"], why: "Quran 28:10." },
        { q: "What did Allah do for her heart?", a: "Made it firm", wrong: ["Made her forget", "Took her worry away forever", "Nothing"], why: "So she would be among the believers." }
      ]
    },
    {
      slug: "musa-sister",
      title: "Musa's clever sister",
      line: "Musa's sister followed him and offered a family to nurse him.",
      facts: ["Baby Musa refused every nurse.", "She watched from far away."],
      quote: quranQuote(28, 12),
      source: quran(28, 12, "Allah kept Musa from all nurses. His sister said: shall I show you a household who will care for him and be sincere to him?"),
      difficulty: 4,
      questions: [
        { q: "What did Musa's mother tell his sister to do?", a: "Follow him", wrong: ["Hide at home", "Tell the guards", "Find water"], why: "She watched him from a distance (28:11)." },
        { q: "Why did Pharaoh's family need help?", a: "Baby Musa refused every nurse", wrong: ["He was sick", "He kept crying at night", "They had no milk"], why: "Allah had kept all nurses from him." },
        { q: "Whose household did the sister really mean?", a: "Their own mother's", wrong: ["Pharaoh's", "A stranger's", "Asiyah's"], why: "So Musa was returned to his mother (28:13)." }
      ]
    },
    {
      slug: "asiyah-dont-kill",
      title: "Let the baby live",
      line: "Pharaoh's wife said: let him live, he may benefit us.",
      facts: ["She said: maybe we will adopt him.", "They did not know Allah's plan."],
      quote: quranQuote(28, 9),
      source: quran(28, 9, "Pharaoh's wife said: a comfort for me and you; do not kill him, perhaps he will benefit us or we may adopt him, while they did not perceive."),
      difficulty: 3,
      questions: [
        { q: "What did Asiyah ask Pharaoh not to do?", a: "Harm the baby", wrong: ["Leave Egypt", "Build a tower", "Punish her"], why: "Pharaoh feared the baby boys of Bani Isra'il." },
        { q: "What did she hope they might do with him?", a: "Adopt him as a son", wrong: ["Sell him", "Send him away", "Make him a servant"], why: "Or that he would benefit them." },
        { q: "'They did not perceive' means what?", a: "They did not know Allah's plan", wrong: ["They could not see well", "They were asleep", "They did not like him"], why: "This baby would end Pharaoh's rule." }
      ]
    },
    {
      slug: "asiyah-perfect",
      title: "Reaching perfection",
      line: "Few women reached perfection, among them Asiyah and Maryam.",
      facts: ["Many men reached it.", "Said by the Prophet ﷺ", "Told by Abu Musa"],
      source: hadith("bukhari", "3411", "Abu Musa al-Ash'ari", "Sahih", "The Prophet ﷺ said: many men reached perfection, but none of the women except Asiyah, Pharaoh's wife, and Maryam, daughter of Imran."),
      difficulty: 4,
      questions: [
        { q: "Which two women did the Prophet ﷺ name as reaching perfection?", a: "Asiyah and Maryam", wrong: ["Sarah and Hajar", "Hawwa and Khadijah", "Bilqis and Asiyah"], why: "Bukhari 3411." },
        { q: "Asiyah was the wife of whom?", a: "Pharaoh", wrong: ["Musa", "Haman", "Imran"], why: "She believed though married to a tyrant." },
        { q: "A bad husband stopped Asiyah from reaching Allah's pleasure.", tf: false, why: "Her own faith raised her to perfection." }
      ]
    },
    {
      slug: "asiyah-example",
      title: "An example for believers",
      line: "Allah made Asiyah an example for all believers, men and women.",
      facts: ["Quran 66:11", "She prayed: save me from Pharaoh's deeds."],
      quote: quranQuote(66, 11),
      source: quran(66, 11, "Allah gives an example for the believers: Pharaoh's wife, who said: my Lord, build me a house near You in Paradise, and save me from Pharaoh and his deeds."),
      difficulty: 4,
      questions: [
        { q: "Asiyah is an example for whom?", a: "All believers", wrong: ["Only queens", "Only women", "Only the people of Egypt"], why: "Allah presents an example for those who believed." },
        { q: "Besides a house near Allah, what else did she ask for?", a: "To be saved from Pharaoh's deeds", wrong: ["A bigger palace", "A long life", "To rule Egypt"], why: "She wanted no part in his wrong." },
        { q: "What does her du'a teach?", a: "Being near Allah matters most", wrong: ["Palaces bring happiness", "Hide your faith always", "Give up on du'a"], why: "She chose a house near Allah over a palace." }
      ]
    },
    {
      slug: "two-wives-warning",
      title: "A warning: two wives",
      line: "The wives of Nuh and Lut married prophets but were not saved.",
      facts: ["Quran 66:10", "Your faith is your own."],
      quote: quranQuote(66, 10),
      source: quran(66, 10, "Allah gives an example of the disbelievers: the wife of Nuh and the wife of Lut; they betrayed two righteous servants, and their husbands could not help them against Allah."),
      difficulty: 5,
      questions: [
        { q: "Whose wives are given as a warning?", a: "Nuh's and Lut's", wrong: ["Ibrahim's and Musa's", "Adam's and Idris's", "Yusuf's and Dawud's"], why: "Quran 66:10." },
        { q: "Could their prophet husbands save them?", a: "No", wrong: ["Yes, fully", "Only one of them", "Only in this world"], why: "They could not help them against Allah at all." },
        { q: "Asiyah was saved with a bad husband; these two lost with good ones. What is the lesson?", a: "Each soul answers for its own faith", wrong: ["Marriage decides everything", "Husbands choose for wives", "Family names save people"], why: "Read 66:10 and 66:11 together." }
      ]
    },
    {
      slug: "madyan-sisters",
      title: "The two sisters of Madyan",
      line: "At Madyan's well, two sisters waited for the shepherds to go.",
      facts: ["Their father was very old.", "Musa watered their flock for them."],
      quote: quranQuote(28, 23),
      source: quran(28, 23, "At the well of Madyan Musa found two women holding back their flock. They said: we do not water until the shepherds leave, and our father is a very old man."),
      difficulty: 3,
      questions: [
        { q: "Why were the two sisters waiting at the well?", a: "Until the shepherds left", wrong: ["For rain", "For their brothers", "For the market"], why: "They kept apart from the crowd of men." },
        { q: "Why were they doing their father's work?", a: "He was very old", wrong: ["He was traveling", "He was a king", "He was angry"], why: "Our father is a very old man." },
        { q: "What did Musa do for them?", a: "Watered their flock", wrong: ["Gave them money", "Fought the shepherds", "Walked them home"], why: "Then he sat in the shade and made du'a." }
      ]
    },
    {
      slug: "madyan-shyness",
      title: "Walking with shyness",
      line: "One sister came back to Musa, walking with shyness.",
      facts: ["Her father invited him.", "He wanted to reward him."],
      quote: quranQuote(28, 25),
      source: quran(28, 25, "One of the two came to him walking with shyness, and said: my father invites you to reward you for watering for us."),
      difficulty: 4,
      questions: [
        { q: "How does the Quran describe the way she walked?", a: "With shyness", wrong: ["Running", "With pride", "Laughing"], why: "Quran 28:25 praises her modesty." },
        { q: "Why did she come back to Musa?", a: "Her father invited him", wrong: ["To ask for help again", "To buy his staff", "To chase him away"], why: "To reward him for his help." },
        { q: "Modesty (haya) is praised in the Quran.", tf: true, why: "Allah tells us how she walked." }
      ]
    },
    {
      slug: "madyan-strong-trustworthy",
      title: "Strong and trustworthy",
      line: "She told her father: hire him, he is strong and trustworthy.",
      facts: ["These are two qualities of a good worker.", "Quran 28:26"],
      quote: quranQuote(28, 26),
      source: quran(28, 26, "One of them said: father, hire him; the best one you can hire is the strong and the trustworthy."),
      difficulty: 4,
      questions: [
        { q: "What two qualities did she see in Musa?", a: "Strong and trustworthy", wrong: ["Rich and famous", "Tall and young", "Funny and kind"], why: "The best to hire has both." },
        { q: "What did she advise her father?", a: "Hire him", wrong: ["Send him away", "Pay him and forget him", "Make him a guard"], why: "Musa later worked for him for years." },
        { q: "Why are both qualities needed in a worker?", a: "Skill to do it, honesty to do it right", wrong: ["Strength is all that matters", "Honesty is not needed", "Neither matters"], why: "Strength without trust, or trust without strength, falls short." }
      ]
    },
    {
      slug: "saba-queen",
      title: "The queen of Saba",
      line: "The hoopoe told Sulayman of a queen with a great throne.",
      facts: ["Her people worshipped the sun.", "A hoopoe bird brought this news."],
      quote: quranQuote(27, 23),
      source: quran(27, 23, "The hoopoe said: I found a woman ruling them, given of all things, and she has a great throne."),
      difficulty: 3,
      questions: [
        { q: "Who brought Sulayman news of the queen?", a: "A hoopoe bird", wrong: ["A jinn", "A trader", "An ant"], why: "Quran 27:20-23." },
        { q: "What did the hoopoe say she had?", a: "A great throne", wrong: ["A great army of jinn", "A golden Ka'bah", "A flying carpet"], why: "She has been given of all things." },
        { q: "What did her people worship?", a: "The sun", wrong: ["Allah alone", "Fire", "The moon"], why: "Quran 27:24." }
      ]
    },
    {
      slug: "saba-submits",
      title: "She submits to Allah",
      line: "The queen said: I submit with Sulayman to Allah.",
      facts: ["She thought the glass floor was water.", "She said: I have wronged myself."],
      quote: quranQuote(27, 44),
      source: quran(27, 44, "She thought the palace floor was water; it was smooth glass. She said: my Lord, I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds."),
      difficulty: 4,
      questions: [
        { q: "What did the queen think the palace floor was?", a: "Water", wrong: ["Gold", "Sand", "Ice"], why: "It was made of smooth glass." },
        { q: "What did she say about her past?", a: "I have wronged myself", wrong: ["I was always right", "My people forced me", "I knew nothing"], why: "She owned her mistake." },
        { q: "To whom did she submit, with Sulayman?", a: "Allah, Lord of the worlds", wrong: ["Sulayman himself", "The sun", "Her people"], why: "Not to Sulayman, but with him to Allah." }
      ]
    },
    {
      slug: "sarah-smiled",
      title: "Sarah smiled",
      line: "Sarah smiled, and was given news of Ishaq, and after him Ya'qub.",
      facts: ["Sarah was Ibrahim's wife.", "She was already old.", "Angels brought the good news."],
      quote: quranQuote(11, 71),
      source: quran(11, 71, "His wife was standing and she smiled; We gave her good news of Ishaq, and after Ishaq, Ya'qub."),
      difficulty: 3,
      questions: [
        { q: "What news did Sarah receive?", a: "A son, Ishaq", wrong: ["A new house", "Ibrahim's return", "Rain"], why: "And after Ishaq, a grandson, Ya'qub." },
        { q: "Why was she amazed?", a: "She and Ibrahim were old", wrong: ["She did not like children", "It was winter", "She was a queen"], why: "Quran 11:72." },
        { q: "Who would come after Ishaq?", a: "Ya'qub", wrong: ["Ismail", "Yusuf", "Lut"], why: "Two generations of prophets in one piece of news." }
      ]
    },
    {
      slug: "hajar-trust",
      title: "Then He won't abandon us",
      line: "Hajar said: if Allah ordered this, He won't abandon us.",
      facts: ["She was there with baby Ismail.", "It was near where the Ka'bah stands."],
      source: hadith("bukhari", "3364", "Ibn Abbas", "Sahih", "Ibrahim left Hajar and baby Ismail in Makkah with dates and water. She asked: has Allah ordered you to do this? He said yes. She said: then He will not neglect us."),
      difficulty: 3,
      questions: [
        { q: "What did Hajar ask Ibrahim as he left?", a: "Has Allah ordered you to do this?", wrong: ["When will you be back?", "Why are you angry?", "Where is the city?"], why: "Her question was about Allah, not herself." },
        { q: "What did she say when he said yes?", a: "Then He will not abandon us", wrong: ["Then I will leave too", "Then we will starve", "Then take us back"], why: "Total trust in Allah." },
        { q: "Where were Hajar and Ismail left?", a: "The valley of Makkah", wrong: ["Jerusalem", "Egypt", "Madinah"], why: "Near the spot of Zamzam and the Ka'bah." }
      ]
    },
    {
      slug: "hajar-safa-marwah",
      title: "Seven runs and Zamzam",
      line: "Hajar ran seven times between Safa and Marwah. Then: Zamzam.",
      facts: ["Pilgrims still do it: sa'i", "An angel uncovered the water."],
      source: hadith("bukhari", "3364", "Ibn Abbas", "Sahih", "Hajar ran between Safa and Marwah seven times looking for help; the Prophet ﷺ said this is why people walk between them. Then an angel struck the ground at Zamzam and water flowed."),
      difficulty: 4,
      questions: [
        { q: "How many times did Hajar go between Safa and Marwah?", a: "Seven", wrong: ["Three", "Five", "Ten"], why: "Pilgrims do the same seven in sa'i." },
        { q: "What was she looking for?", a: "Someone to help, and water", wrong: ["A lost camel", "Ibrahim", "A place to sleep"], why: "She and her baby were very thirsty." },
        { q: "What came out at the spot of Zamzam?", a: "Water", wrong: ["Gold", "A palm tree", "A spring of milk"], why: "An angel dug the ground and water flowed." },
        { q: "Why do pilgrims walk between Safa and Marwah today?", a: "Because Hajar did", wrong: ["It is the way to Mina", "To exercise", "It was Sulayman's road"], why: "The Prophet ﷺ said this is its origin." }
      ]
    },
    {
      slug: "woman-who-argued",
      title: "Allah heard her",
      line: "A wife complained about her husband, and Allah heard her.",
      facts: ["Surah Al-Mujadilah: the arguing woman", "Quran 58:1"],
      quote: quranQuote(58, 1),
      source: quran(58, 1, "Allah has heard the words of the woman who argued with you about her husband and complained to Allah; Allah hears your conversation."),
      difficulty: 5,
      questions: [
        { q: "What does 'Al-Mujadilah', the surah's name, mean?", a: "The woman who argues", wrong: ["The patient woman", "The queen", "The mother"], why: "Named after her complaint." },
        { q: "To whom did she complain besides the Prophet ﷺ?", a: "Allah", wrong: ["Her tribe", "Umar", "A judge in Sham"], why: "She directed her complaint to Allah." },
        { q: "What does Quran 58:1 teach women wronged at home?", a: "Allah hears them; speak up", wrong: ["Stay silent always", "Nobody cares", "Only men can complain"], why: "Allah answered her from above the heavens." }
      ]
    }
  ]
};

export const WOMEN_UNITS: readonly DeepUnit[] = [QURAN_WOMEN, MOTHERS];
