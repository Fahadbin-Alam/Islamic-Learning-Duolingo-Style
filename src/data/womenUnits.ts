import { hadith, quran, quranQuote, siyar, type DeepUnit } from "./deepKit";

// Great Women, in depth: the Mothers of the Believers in the order they joined the Prophet's ﷺ home, and the Women
// of Islam: the women the Quran tells about, then women of the Prophet's ﷺ time who did great things (Sumayyah, the
// first martyr, and more). The order on the path is in UNIT_PLANS (unitPlans.ts). Every card is from the Quran or a
// hadith checked on sunnah.com (its number and grade as sunnah.com gives them), or adh-Dhahabi's Siyar for Sumayyah. Anything the scholars differ on (dates, ages, which marriage came first, weak reports)
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
      slug: "wives-not-like-others",
      title: "Not like other women",
      line: "Allah told the Prophet's ﷺ wives: you are not like others.",
      facts: ["Allah speaks to them directly in Surah Al-Ahzab.", "Their high rank comes with fearing Allah.", "So they were careful in how they spoke and lived."],
      quote: quranQuote(33, 32),
      source: quran(33, 32, "O wives of the Prophet ﷺ, you are not like anyone among women, if you fear Allah."),
      difficulty: 2,
      questions: [
        { q: "What did Allah tell the wives of the Prophet ﷺ in Quran 33:32?", a: "You are not like other women", wrong: ["You must live in Makkah", "You will rule after him", "You must never speak"], why: "O wives of the Prophet ﷺ, you are not like anyone among women." },
        { q: "Their high rank in Quran 33:32 comes with what?", a: "Fearing Allah", wrong: ["Being rich", "Being from Quraysh", "Being young"], why: "The ayah says: if you fear Allah." },
        { q: "Allah speaks to the Prophet's ﷺ wives directly in the Quran.", tf: true, why: "Quran 33:32 begins: O wives of the Prophet ﷺ." }
      ]
    },
    {
      slug: "khadijah-never-disgrace",
      title: "Allah will never disgrace you",
      line: "Khadijah calmed the Prophet ﷺ after the first revelation.",
      facts: ["He came home from the cave of Hira afraid.", "She said: Allah will never disgrace you.", "She named his good deeds: kind to family, helps the poor, honors guests."],
      source: hadith("bukhari", "3", "Aishah", "Sahih", "After the first revelation in the cave of Hira, the Prophet ﷺ came home afraid; Khadijah said: Never! By Allah, Allah will never disgrace you. You keep ties with your relatives, help the poor and serve your guests.", "Allah will never disgrace you"),
      difficulty: 2,
      questions: [
        { q: "Where was the Prophet ﷺ when the first revelation came?", a: "The cave of Hira", wrong: ["The Kaaba", "Mount Uhud", "His house in Madinah"], why: "He used to worship alone in the cave of Hira." },
        { q: "What did Khadijah say when he came home afraid?", a: "Allah will never disgrace you", wrong: ["Stay home and rest", "Go and ask the priests", "Forget what you saw"], why: "Never! By Allah, Allah will never disgrace you." },
        { q: "Which good deed did Khadijah name to comfort him?", a: "He helps the poor", wrong: ["He is rich", "He is a great poet", "He wins every fight"], why: "She said he keeps ties with family, helps the poor and serves guests." }
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
      slug: "aishah-necklace",
      title: "A lost necklace, a new ruling",
      line: "Aishah's lost necklace led to the ayah of tayammum.",
      facts: ["The army stopped to look for it, with no water near.", "Allah allowed tayammum: wiping with clean earth.", "Usayd said: this is not your family's first blessing."],
      source: hadith("bukhari", "334", "Aishah", "Sahih", "Aishah's necklace was lost on a journey and the people stopped where there was no water; Allah revealed the verses of tayammum, and Usayd ibn Hudayr said: O family of Abu Bakr, this is not the first blessing of yours.", "This is not the first blessing of yours"),
      difficulty: 3,
      questions: [
        { q: "What did Aishah lose on the journey?", a: "Her necklace", wrong: ["Her camel", "Her Quran", "Her shoes"], why: "The army stopped to search for her necklace." },
        { q: "What did Allah allow when there was no water for wudu?", a: "Tayammum with clean earth", wrong: ["Skipping the prayer", "Praying without wudu", "Waiting until Madinah"], why: "Allah revealed the verses of tayammum." },
        { q: "Usayd ibn Hudayr called it the first blessing from Abu Bakr's family.", tf: false, why: "He said it is not the first blessing of yours." }
      ]
    },
    {
      slug: "aishah-innocent",
      title: "Cleared from above the heavens",
      line: "Allah sent ayahs in Surah An-Nur to clear Aishah's name.",
      facts: ["The ayahs are Quran 24:11 to 20.", "She said: I will thank no one but Allah.", "Allah told believers not to pass on rumors."],
      quote: quranQuote(24, 11),
      source: hadith("bukhari", "4750", "Aishah", "Sahih", "When people spread the slander about Aishah, Allah revealed: Those who brought the lie are a group among you (24:11-20), to confirm her innocence.", "So Allah revealed: \"Verily! They who spread the Slander are a gang among you"),
      difficulty: 4,
      questions: [
        { q: "In which surah did Allah clear Aishah's name?", a: "An-Nur", wrong: ["Al-Baqarah", "Yusuf", "Al-Kahf"], why: "Ayahs 11 to 20 of Surah An-Nur, the 24th surah." },
        { q: "Whom did Aishah say she would thank for clearing her?", a: "Only Allah", wrong: ["The poets", "Her neighbors", "The judge"], why: "She said: I will not thank anybody but Allah." },
        { q: "What do these ayahs teach about rumors?", a: "Do not pass them on", wrong: ["Share them quickly", "Believe the loudest person", "Rumors are harmless"], why: "Allah blamed those who spread the lie without proof." }
      ]
    },
    {
      slug: "aishah-scholar",
      title: "The Sahabah asked Aishah",
      line: "The Sahabah asked Aishah when a hadith was unclear.",
      facts: ["Abu Musa al-Ash'ari said this.", "She taught for many years after the Prophet ﷺ.", "Grown men came to learn from her."],
      source: hadith("tirmidhi", "3883", "Abu Musa al-Ashari", "Sahih", "Abu Musa said: whenever a hadith was unclear to us, the Companions of the Messenger of Allah, and we asked Aishah, we found she had knowledge about it.", "except that we found some knowledge concerning it with her"),
      difficulty: 3,
      questions: [
        { q: "Whom did the Sahabah ask when a hadith was unclear?", a: "Aishah", wrong: ["The poets of Makkah", "The traders", "No one"], why: "Abu Musa said they always found knowledge with her." },
        { q: "Who said the Sahabah found knowledge with Aishah?", a: "Abu Musa al-Ash'ari", wrong: ["Abu Jahl", "Abu Lahab", "Abu Talib"], why: "Jami at-Tirmidhi 3883, graded sahih." },
        { q: "Aishah was one of the great teachers of the Ummah.", tf: true, why: "Even the Sahabah came to learn from her." }
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
      slug: "umm-salamah-jibril",
      title: "Umm Salamah saw Jibril",
      line: "Umm Salamah saw Jibril, looking like a man named Dihyah.",
      facts: ["She thought it was Dihyah, a Sahabi.", "Later the Prophet ﷺ said it was Jibril.", "Usamah ibn Zayd told this."],
      source: hadith("bukhari", "3634", "Usamah ibn Zayd", "Sahih", "Jibril came to the Prophet ﷺ while Umm Salamah was there; she thought he was Dihyah, until she heard the Prophet ﷺ speak about Jibril in his sermon.", "I thought he was none but Dihya"),
      difficulty: 3,
      questions: [
        { q: "Who did Umm Salamah think the visitor was?", a: "Dihyah, a Sahabi", wrong: ["Abu Bakr", "A trader from Sham", "Her brother"], why: "Jibril came in the form of Dihyah." },
        { q: "Who was the visitor really?", a: "The angel Jibril", wrong: ["Umar", "A king's messenger", "Bilal"], why: "The Prophet ﷺ spoke of Jibril in his sermon." },
        { q: "Umm Salamah was there when Jibril came.", tf: true, why: "Jibril came while Umm Salamah was present." }
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
      slug: "zaynab-jahsh-generous",
      title: "No woman better in religion",
      line: "Aishah never saw a woman better in religion than Zaynab.",
      facts: ["More God-fearing and more truthful", "Kind to her relatives", "Gave the most in charity"],
      source: hadith("muslim", "2442", "Aishah", "Sahih", "Aishah said: I have never seen a woman more advanced in religion than Zaynab, more God-conscious, more truthful, kinder to relatives and more generous in charity.", "I have never seen a woman more advanced in religious piety than Zainab"),
      difficulty: 3,
      questions: [
        { q: "Who praised Zaynab bint Jahsh as the best in religion?", a: "Aishah", wrong: ["Abu Sufyan", "Her enemy", "A poet"], why: "Aishah said she never saw a woman better in religion." },
        { q: "Which good quality did Aishah praise in Zaynab?", a: "Giving charity", wrong: ["Winning races", "Writing poems", "Being rich"], why: "She was more generous and charitable than others." },
        { q: "The wives of the Prophet ﷺ could praise each other.", tf: true, why: "Aishah praised Zaynab with many good words." }
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
      slug: "juwayriyah-name",
      title: "A new name",
      line: "The Prophet ﷺ changed the name Barrah to Juwayriyah.",
      facts: ["Barrah means 'pious'.", "He did not want people to say: he left Barrah (the pious one).", "Ibn Abbas told this."],
      source: hadith("muslim", "2140", "Abdullah ibn Abbas", "Sahih", "The name of Juwayriyah was Barrah; the Messenger of Allah ﷺ changed her name to Juwayriyah, as he did not like it to be said: he has left Barrah.", "changed her name to Juwairiya"),
      difficulty: 3,
      questions: [
        { q: "What was Juwayriyah's name before?", a: "Barrah", wrong: ["Hind", "Sumayyah", "Layla"], why: "The Prophet ﷺ changed Barrah to Juwayriyah." },
        { q: "Who told about Juwayriyah's name change?", a: "Abdullah ibn Abbas", wrong: ["Abu Jahl", "Her father", "Khalid ibn al-Walid"], why: "Sahih Muslim 2140, from Ibn Abbas." },
        { q: "The Prophet ﷺ sometimes changed people's names.", tf: true, why: "He changed Barrah to Juwayriyah." }
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
    },
    {
      slug: "maymunah-night-prayer",
      title: "A night at Maymunah's house",
      line: "Ibn Abbas learned the night prayer in Maymunah's house.",
      facts: ["Maymunah was Ibn Abbas's aunt.", "The Prophet ﷺ woke at night and made wudu.", "Ibn Abbas stood and prayed beside him."],
      source: hadith("bukhari", "183", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas stayed overnight in the house of Maymunah, the wife of the Prophet ﷺ and his aunt; the Prophet ﷺ woke in the night, made wudu and prayed, and Ibn Abbas prayed beside him.", "he stayed overnight in the house of Maimuna the wife of the Prophet, his aunt"),
      difficulty: 3,
      questions: [
        { q: "How was Maymunah related to Ibn Abbas?", a: "She was his aunt", wrong: ["She was his sister", "She was his teacher's wife", "She was his grandmother"], why: "Ibn Abbas called her his aunt." },
        { q: "What did Ibn Abbas learn at Maymunah's house?", a: "The Prophet's ﷺ night prayer", wrong: ["How to trade", "How to ride a horse", "Poetry"], why: "He watched and prayed beside the Prophet ﷺ." },
        { q: "The homes of the Mothers of the Believers were places of learning.", tf: true, why: "Ibn Abbas learned the night prayer in Maymunah's house." }
      ]
    }
  ]
};

const QURAN_WOMEN: DeepUnit = {
  key: "quranwomen",
  topicId: "women_of_the_book",
  branchId: "women-quran",
  name: "the women of Islam",
  kind: "story",
  lessonType: "story",
  lessons: [
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
      slug: "sumayyah-first-seven",
      title: "Sumayyah: one of the first seven",
      line: "Sumayyah was one of the first seven to show Islam openly.",
      facts: ["The seven: the Prophet ﷺ, Abu Bakr, Ammar, Sumayyah, Suhayb, Bilal and Al-Miqdad.", "She had no tribe to protect her.", "The idolaters hurt the weak Muslims in the hot sun."],
      source: hadith("ibnmajah", "150", "Abdullah ibn Masud", "Hasan", "The first seven to show their Islam openly were the Messenger of Allah ﷺ, Abu Bakr, Ammar and his mother Sumayyah, Suhayb, Bilal and Al-Miqdad; the idolaters seized the weak ones and tortured them in the heat of the sun.", "The first people to declare their Islam publicly were seven"),
      difficulty: 2,
      questions: [
        { q: "Who was Sumayyah's son?", a: "Ammar ibn Yasir", wrong: ["Bilal", "Abu Bakr", "Suhayb"], why: "Ibn Mas'ud said: Ammar and his mother Sumayyah." },
        { q: "How many people first showed their Islam openly?", a: "Seven", wrong: ["Two", "Forty", "Twelve"], why: "Ibn Mas'ud counted seven, Sumayyah among them." },
        { q: "Sumayyah hid her Islam until the conquest of Makkah.", tf: false, why: "She was one of the first seven to show it openly." }
      ]
    },
    {
      slug: "sumayyah-first-martyr",
      title: "The first martyr in Islam",
      line: "Sumayyah gave her life for Islam, its very first martyr.",
      facts: ["She would not leave Islam.", "Abu Jahl killed her with his spear.", "Adh-Dhahabi writes: she was the first martyr in Islam."],
      source: siyar(1, 409, "Ammar ibn Yasir", "Adh-Dhahabi reports, through Mujahid, that Abu Jahl killed Sumayyah, the mother of Ammar, and that she was the first martyr in Islam.", "فكانت أول شهيدة في الإسلام"),
      difficulty: 3,
      questions: [
        { q: "Who was the first martyr in Islam?", a: "Sumayyah, Ammar's mother", wrong: ["Hamzah", "Mus'ab ibn Umayr", "Sa'd ibn Mu'adh"], why: "Adh-Dhahabi writes: she was the first martyr in Islam." },
        { q: "Who killed Sumayyah?", a: "Abu Jahl", wrong: ["Abu Sufyan", "Abu Talib", "Abu Lahab's son"], why: "Abu Jahl killed her with his spear." },
        { q: "What does Sumayyah teach us?", a: "Hold on to your faith", wrong: ["Hide when it is hard", "Give up when hurt", "Faith is only for men"], why: "She gave her life rather than leave Islam." }
      ]
    },
    {
      slug: "women-ask-a-day",
      title: "A day for the women",
      line: "The women asked the Prophet ﷺ for a day to learn.",
      facts: ["They said: the men take all your time.", "He promised them a day and taught them.", "Abu Sa'id al-Khudri told this."],
      source: hadith("bukhari", "101", "Abu Sa'id al-Khudri", "Sahih", "Some women asked the Prophet ﷺ to fix a day for them, as the men were taking all his time; he promised them a day for lessons and teaching.", "Some women requested the Prophet (ﷺ) to fix a day for them"),
      difficulty: 2,
      questions: [
        { q: "What did the women ask the Prophet ﷺ for?", a: "A day to learn", wrong: ["A new masjid", "Gold", "A market"], why: "They asked for a day of their own." },
        { q: "Why did the women ask?", a: "The men took all his time", wrong: ["They were bored", "It was Ramadan", "They wanted to travel"], why: "They said the men were taking all his time." },
        { q: "The Prophet ﷺ said no to the women.", tf: false, why: "He promised them a day and taught them." }
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
    },
    {
      slug: "umm-umarah-ayah",
      title: "And the Muslim women",
      line: "Umm Umarah's question brought an ayah naming the women too.",
      facts: ["She was a woman of the Ansar.", "Quran 33:35 says: Muslim men and Muslim women.", "Allah promises both forgiveness and a great reward."],
      quote: quranQuote(33, 35),
      source: hadith("tirmidhi", "3211", "Umm Umarah al-Ansariyyah", "Sahih", "Umm Umarah said to the Prophet ﷺ: I see that everything is for the men, and women are not mentioned; so the ayah was revealed: Indeed the Muslim men and the Muslim women, the believing men and the believing women.", "I do not see but that everything is for the men"),
      difficulty: 3,
      questions: [
        { q: "What did Umm Umarah ask about?", a: "Why only men were mentioned", wrong: ["Where to live", "How to trade", "When Ramadan starts"], why: "She said: I see that everything is for the men." },
        { q: "Which ayah came after her question?", a: "Quran 33:35", wrong: ["Quran 2:255", "Quran 112:1", "Quran 1:1"], why: "Indeed the Muslim men and the Muslim women..." },
        { q: "In Quran 33:35, Allah promises a great reward to both men and women.", tf: true, why: "Forgiveness and a great reward for all of them." }
      ]
    },
    {
      slug: "rubayyi-water",
      title: "Water for the wounded",
      line: "Ar-Rubayyi' and other women gave water to the wounded.",
      facts: ["They gave water to the thirsty.", "They treated the wounded.", "They carried the fallen back to Madinah."],
      source: hadith("bukhari", "2882", "Ar-Rubayyi' bint Mu'awwidh", "Sahih", "Ar-Rubayyi' said: we were with the Prophet ﷺ giving water to the people, treating the wounded and bringing the killed back to Madinah.", "providing the wounded with water and treating them"),
      difficulty: 2,
      questions: [
        { q: "What did Ar-Rubayyi' and other women do in battle?", a: "Gave water and treated the wounded", wrong: ["Sold goods", "Wrote poems", "Stayed asleep"], why: "She said: giving water and treating the wounded." },
        { q: "Where did they carry the fallen?", a: "Back to Madinah", wrong: ["To Makkah", "To Sham", "To Yemen"], why: "Bringing the killed back to Madinah." },
        { q: "Women of the Sahabah helped in times of war.", tf: true, why: "Ar-Rubayyi' tells how they cared for the wounded." }
      ]
    },
    {
      slug: "umm-sulaym-patience",
      title: "Umm Sulaym's patience",
      line: "Umm Sulaym stayed patient when her little son died.",
      facts: ["She was the wife of Abu Talhah and mother of Anas.", "She told the news gently.", "Allah gave them a new son, and Anas carried him to the Prophet ﷺ."],
      source: hadith("bukhari", "5470", "Anas ibn Malik", "Sahih", "Abu Talhah's sick son died; Umm Sulaym stayed calm and told him gently, and the Prophet ﷺ said: O Allah, bless them; then Umm Sulaym gave birth to a boy.", "Bestow your blessing on them"),
      difficulty: 3,
      questions: [
        { q: "Whose mother was Umm Sulaym?", a: "Anas ibn Malik", wrong: ["Bilal", "Ammar", "Ibn Abbas"], why: "Anas tells this story about his mother." },
        { q: "How did Umm Sulaym act when her son died?", a: "Calm and patient", wrong: ["She screamed at people", "She ran away", "She blamed Allah"], why: "She stayed calm and told her husband gently." },
        { q: "What did the Prophet ﷺ ask Allah for her family?", a: "Blessing", wrong: ["Wealth", "A long trip", "A big house"], why: "He said: O Allah, bless them." }
      ]
    },
    {
      slug: "umm-khalid-dress",
      title: "Umm Khalid's new dress",
      line: "He ﷺ dressed little Umm Khalid and prayed for her long life.",
      facts: ["She was so small that she was carried to him.", "He called the dress sanah: beautiful, in the language of Abyssinia.", "He put it on her with his own hands."],
      source: hadith("bukhari", "5823", "Umm Khalid bint Khalid", "Sahih", "Some clothes were brought to the Prophet ﷺ, among them a small black cloak. He asked for little Umm Khalid, dressed her in it with his own hands, and said: may you live long enough to wear it out and mend it many times. Looking at its patterns, he said: Umm Khalid, this is sanah, which means beautiful in the Abyssinian language.", "May you live so long that your dress will wear out and you will mend it many times"),
      difficulty: 2,
      questions: [
        { q: "Whom did he ﷺ choose to wear the black cloak?", a: "Little Umm Khalid", wrong: ["A rich trader", "A tall soldier", "A visiting king"], why: "Fetch Um Khalid for me. I was brought carried, as I was a small girl." },
        { q: "What does 'sanah' mean?", a: "Beautiful", wrong: ["Too big", "Very old", "Costly"], why: "Sanah is an Ethiopian word meaning beautiful." },
        { q: "He ﷺ made du'a that Umm Khalid would live long.", tf: true, why: "May you live so long that your dress will wear out and you will mend it many times." }
      ]
    },
    {
      slug: "zaynab-two-rewards",
      title: "Zaynab's two rewards",
      line: "Zaynab gave charity to her own family and got two rewards.",
      facts: ["She was the wife of Abdullah ibn Mas'ud.", "She looked after her husband and orphans in her care.", "One reward for family ties, one for the charity."],
      source: hadith("bukhari", "1466", "Zaynab, wife of Ibn Mas'ud", "Sahih", "Zaynab, the wife of Abdullah ibn Mas'ud, asked Bilal to ask whether her charity could go to her husband and the orphans in her care. He ﷺ asked: which Zaynab? Bilal said: the wife of Abdullah. He said: yes, and she will have two rewards, one for family ties and one for the charity.", "and she will receive a double reward"),
      difficulty: 3,
      questions: [
        { q: "How many rewards did he ﷺ say Zaynab would get?", a: "Two", wrong: ["One", "Ten", "None"], why: "She will receive a double reward: one for helping relatives, and the other for the charity." },
        { q: "What did he ﷺ ask when Bilal said her name?", a: "Which Zaynab?", wrong: ["Where is she?", "Is she rich?", "Is she from Makkah?"], why: "The Prophet ﷺ asked: Which Zainab? Bilal said: The wife of Abdullah." },
        { q: "Giving to your own needy family can bring a double reward.", tf: true, why: "One reward for helping relatives, and the other for giving charity." }
      ]
    },
    {
      slug: "umm-zufar-patience",
      title: "Umm Zufar chose patience",
      line: "Umm Zufar chose patience, and he ﷺ promised her Jannah.",
      facts: ["Ibn Abbas called her a woman of the people of Jannah.", "She had an illness that made her fall and become uncovered.", "He ﷺ made du'a that she would stay covered."],
      source: hadith("bukhari", "5652", "Ibn Abbas", "Sahih", "Ibn Abbas said: shall I show you a woman of the people of Paradise? This woman came to the Prophet ﷺ and said: I have fits of an illness and my body becomes uncovered, so make du'a for me. He said: if you wish, be patient and you will have Paradise; and if you wish, I will ask Allah to cure you. She said: I will be patient, but make du'a that I do not become uncovered. So he made du'a for her.", "Shall I show you a woman of the people of Paradise"),
      difficulty: 3,
      questions: [
        { q: "What did Umm Zufar choose?", a: "To be patient, for Jannah", wrong: ["To be cured at once", "To keep it a secret", "To ask someone else"], why: "If you wish, be patient and you will have Paradise. She said: I will remain patient." },
        { q: "What did she still ask him ﷺ to make du'a for?", a: "That she would stay covered", wrong: ["That she would be rich", "That she would travel", "That she would be famous"], why: "Please invoke Allah for me that I may not become uncovered. So he invoked Allah for her." },
        { q: "Patience with an illness can be rewarded with Jannah.", tf: true, why: "If you wish, be patient and you will have Paradise." }
      ]
    },
    {
      slug: "umm-al-fadl-milk",
      title: "Umm al-Fadl's bowl of milk",
      line: "Unsure if he ﷺ was fasting, Umm al-Fadl sent him milk.",
      facts: ["It was the day of Arafah, at Hajj.", "Some said he was fasting, and some said he was not.", "He drank it on his camel, and the question was settled."],
      source: hadith("bukhari", "1661", "Umm al-Fadl bint al-Harith", "Sahih", "On the day of Arafah, people with Umm al-Fadl differed over whether the Prophet ﷺ was fasting. She sent him a bowl of milk while he was on his camel, and he drank it.", "So I sent a bowl full of milk to him while he was riding his camel"),
      difficulty: 3,
      questions: [
        { q: "What did the people differ over on the day of Arafah?", a: "Whether he ﷺ was fasting", wrong: ["Where to camp", "Who would lead the prayer", "How long Hajj lasts"], why: "Some said that he was fasting while others said that he was not fasting." },
        { q: "How did Umm al-Fadl find out?", a: "She sent him a bowl of milk", wrong: ["She shouted the question", "She waited a week", "She asked a stranger"], why: "So I sent a bowl full of milk to him while he was riding his camel, and he drank that milk." },
        { q: "A question can be settled wisely, without a quarrel.", tf: true, why: "She sent the milk, he drank it, and everyone saw." }
      ]
    },
    {
      slug: "umm-haram-sea",
      title: "Umm Haram sails the sea",
      line: "Umm Haram was among the first Muslims to sail for Allah.",
      facts: ["He smiled after a dream of Muslims on ships like kings on thrones.", "She asked: pray that I am one of them.", "It came true in the time of Mu'awiyah."],
      source: hadith("bukhari", "2788", "Anas ibn Malik", "Sahih", "The Prophet ﷺ dreamt of his followers sailing the sea in Allah's cause like kings on thrones; Umm Haram asked to be one of them and he said: you are among the first; she sailed in the time of Mu'awiyah.", "You are amongst the first ones"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ see in his dream at Umm Haram's house?", a: "Muslims sailing the sea", wrong: ["A great flood", "A new city", "A golden palace"], why: "They sailed like kings on thrones." },
        { q: "What did Umm Haram ask for?", a: "To be one of them", wrong: ["A ship of her own", "To stay home", "Gold from the sea"], why: "She said: ask Allah to make me one of them." },
        { q: "What did he tell her?", a: "You are among the first", wrong: ["You will never sail", "You will be a queen", "Wait for the next dream"], why: "And she sailed in the time of Mu'awiyah." }
      ]
    },
    {
      slug: "umm-ayman-visit",
      title: "Visiting Umm Ayman",
      line: "Abu Bakr and Umar visited Umm Ayman, as the Prophet ﷺ did.",
      facts: ["This was after the Prophet ﷺ had died.", "She wept: revelation from the sky has stopped.", "Abu Bakr and Umar wept with her."],
      source: hadith("muslim", "2454", "Anas ibn Malik", "Sahih", "After the Prophet ﷺ died, Abu Bakr said to Umar: let us visit Umm Ayman as the Messenger of Allah ﷺ used to visit her; she wept because revelation from the heaven had stopped, and they wept with her.", "Let us visit Umm Aiman"),
      difficulty: 3,
      questions: [
        { q: "Why did Abu Bakr and Umar visit Umm Ayman?", a: "The Prophet ﷺ used to visit her", wrong: ["She invited them to dinner", "She was a queen", "She sold dates"], why: "They kept up his good habit." },
        { q: "Why did Umm Ayman weep?", a: "Revelation had stopped", wrong: ["She was hungry", "She lost her house", "She was afraid of them"], why: "No more revelation would come from the sky." },
        { q: "What does this teach?", a: "Keep visiting those he loved", wrong: ["Forget old friends", "Visit only the rich", "Never cry"], why: "Abu Bakr and Umar honored her after he died." }
      ]
    }
  ]
};

export const WOMEN_UNITS: readonly DeepUnit[] = [QURAN_WOMEN, MOTHERS];
