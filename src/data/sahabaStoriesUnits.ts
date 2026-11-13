import { hadith, type DeepUnit } from "./deepKit";

// One more Sahabah unit: small stories of the Sahabah, from Jami at-Tirmidhi, Sahih Muslim and Sahih al-Bukhari.
// How Abu Hurairah got his name, Jarir serving Anas, a du'a for Abu Zayd, Abdur-Rahman ibn Awf and the Mothers of the
// Believers, Jibril asking about Badr, the Companions as a safety for the Ummah, what Adi ibn Hatim lived to see, what
// Umar said of Adi, and the horse race Ibn Umar took part in. Every card is one sahih or hasan hadith with its number,
// narrator and grade, and its exact English words to highlight. None of these hadith is taught anywhere else in the
// app, and the distances in the horse race (a later narrator's words) are not asked.

const STORIES: DeepUnit = {
  key: "sahaba-small-stories",
  topicId: "sahabah",
  branchId: "sahaba-small-stories",
  branch: { title: "Small stories of the Sahabah", description: "Abu Hurairah's kitten, Jarir serving Anas, a du'a for Abu Zayd, a gift for the Mothers, the best at Badr, a safety for the Ummah, Adi's two stories, and a horse race." },
  name: "small stories of the Sahabah",
  kind: "story",
  lessonType: "story",
  lessons: [
    {
      slug: "the-little-kitten",
      title: "Why Abu Hurairah?",
      line: "Abu Hurairah got his name from a little kitten he kept.",
      facts: ["Told by Abu Hurairah", "Hurairah means a little cat", "He took it along while tending sheep"],
      source: hadith("tirmidhi", "3840", "Abu Hurairah", "Hasan (Al-Albani)", "Abdullah ibn Rafi' said: I asked Abu Hurairah why he was called Abu Hurairah. He said: I used to tend my people's sheep, and I had a small kitten. At night I would put it in a tree, and by day I took it with me and played with it, so they called me Abu Hurairah.", "I used to tend the sheep of my people, and I had a small kitten"),
      difficulty: 1,
      questions: [
        { q: "What little pet did Abu Hurairah have?", a: "A kitten", wrong: ["A puppy", "A parrot", "A rabbit"], why: "I used to tend the sheep of my people, and I had a small kitten, he said." },
        { q: "Where did he put the kitten at night?", a: "In a tree", wrong: ["In a box", "In a tent", "In a cave"], why: "I used to place it in a tree at night, Abu Hurairah said." },
        { q: "Abu Hurairah got his name because of a small kitten.", tf: true, why: "He played with his small kitten, so his people named him Abu Hurairah." }
      ]
    },
    {
      slug: "jarir-served-anas",
      title: "Jarir served Anas",
      line: "Jarir, though older, served Anas on a journey.",
      facts: ["Told by Anas ibn Malik", "Jarir was older than Anas", "Anas was one of the Ansar"],
      source: hadith("muslim", "2513", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: I set out on a journey with Jarir ibn Abdullah al-Bajali, and he would serve me. I said: do not do that. He said: I have seen what the Ansar did for the Messenger of Allah ﷺ, and I swore by Allah that whenever I travel with any of the Ansar, I would serve him. Jarir was older than Anas.", "I swore by Allah whenever I accompany any one of the Ansar, I would serve him"),
      difficulty: 1,
      questions: [
        { q: "Why did Jarir serve Anas on the journey?", a: "He saw how the Ansar honored him ﷺ", wrong: ["He was paid to do it", "Anas was much older", "Anas had asked him to"], why: "I have seen the Ansar doing this with Allah's Messenger ﷺ, Jarir said." },
        { q: "What did Anas first tell Jarir?", a: "Do not do that", wrong: ["Serve me more", "Carry my bag", "Walk ahead of me"], why: "Don't do that, Anas said to Jarir when he served him." },
        { q: "Jarir swore to serve any of the Ansar he traveled with.", tf: true, why: "I swore by Allah whenever I accompany any one of the Ansar, I would serve him, Jarir said." }
      ]
    },
    {
      slug: "a-dua-for-abu-zayd",
      title: "A du'a for Abu Zayd",
      line: "He ﷺ wiped Abu Zayd's face and made du'a for him.",
      facts: ["Told by Abu Zayd ibn Akhtab", "Azrah said he lived to 120", "His head had only a few gray hairs"],
      source: hadith("tirmidhi", "3629", "Abu Zayd ibn Akhtab", "Sahih (Al-Albani)", "Abu Zayd ibn Akhtab said: the Messenger of Allah ﷺ wiped his hand over my face and made du'a for me. Azrah, one of the narrators, said: he lived to one hundred and twenty, and there were only a few gray hairs on his head.", "wiped his hand over my face and supplicated for me"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do for Abu Zayd ibn Akhtab?", a: "Wiped his face and made du'a", wrong: ["Gave him a horse", "Built him a house", "Gave him a sword"], why: "He ﷺ wiped his hand over my face and supplicated for me, Abu Zayd said." },
        { q: "What was his hair like in old age, Azrah said?", a: "Only a few gray hairs", wrong: ["All of it white", "All of it gone", "Many gray hairs"], why: "There were only a few small gray hairs on his head, Azrah said." },
        { q: "He ﷺ made du'a for Abu Zayd ibn Akhtab.", tf: true, why: "The Messenger of Allah ﷺ wiped his hand over my face and made du'a for me, Abu Zayd said." }
      ]
    },
    {
      slug: "for-the-mothers",
      title: "For the Mothers",
      line: "Abdur-Rahman ibn Awf kept up ties with the Prophet's ﷺ wives.",
      facts: ["Told by Aishah", "Abu Salamah was his son", "Salsabil is a spring in Paradise"],
      source: hadith("tirmidhi", "3749", "Aishah", "Hasan (Al-Albani)", "Abu Salamah said: Aishah told me that the Messenger of Allah ﷺ used to say to his wives: your affair is among what worries me after I am gone, and only the patient will be patient with you. Then Aishah said: may Allah give your father a drink from Salsabil in Paradise, meaning Abdur-Rahman ibn Awf, who had kept up ties with the wives of the Prophet ﷺ with his wealth.", "So may Allah give your father drink from the Salsabil of Paradise"),
      difficulty: 2,
      questions: [
        { q: "What did Aishah ask Allah to give Abdur-Rahman ibn Awf?", a: "A drink from Salsabil", wrong: ["A big house in Madinah", "A strong, fast camel", "A garden of date palms"], why: "May Allah give your father drink from the Salsabil of Paradise, Aishah said." },
        { q: "What is Salsabil?", a: "A spring in Paradise", wrong: ["A well in Madinah", "A river in Iraq", "A garden in Ta'if"], why: "A spring there named Salsabil, Allah says of Paradise in Surah al-Insan." },
        { q: "Abdur-Rahman ibn Awf kept up ties with the Mothers of the Believers.", tf: true, why: "He had kept up ties with the wives of the Prophet ﷺ with his wealth." }
      ]
    },
    {
      slug: "jibril-asked-about-badr",
      title: "Jibril asked about Badr",
      line: "Those who fought at Badr are among the best Muslims.",
      facts: ["Told by Rifa'ah ibn Rafi'", "Rifa'ah himself fought at Badr", "Angels came down to help at Badr"],
      source: hadith("bukhari", "3992", "Rifa'ah ibn Rafi'", "Sahih", "Rifa'ah ibn Rafi', who fought at Badr, said: Jibril came to the Prophet ﷺ and asked: how do you count the people of Badr among you? He ﷺ said: among the best of the Muslims, or words like that. Jibril said: and so are the angels who were at Badr.", "And so are the Angels who participated in the Badr"),
      difficulty: 1,
      questions: [
        { q: "Who came to ask him ﷺ about the people of Badr?", a: "Jibril", wrong: ["Mikail", "Israfil", "Malik"], why: "Gabriel came to the Prophet ﷺ and asked about the warriors of Badr, Rifa'ah said." },
        { q: "How did he ﷺ count the Muslims who fought at Badr?", a: "Among the best of the Muslims", wrong: ["Among the youngest Muslims", "Among the richest Muslims", "Among the last Muslims"], why: "As the best of the Muslims, he ﷺ said, or words like it." },
        { q: "Jibril said the angels at Badr are also among the best.", tf: true, why: "And so are the angels who took part in Badr, Jibril said." }
      ]
    },
    {
      slug: "a-safety-for-the-ummah",
      title: "A safety for the Ummah",
      line: "He ﷺ said his Companions are a safety for the Ummah.",
      facts: ["Told by Abu Musa al-Ash'ari", "They waited after Maghrib to pray Isha with him ﷺ", "The stars are a safety for the sky"],
      source: hadith("muslim", "2531", "Abu Musa al-Ash'ari", "Sahih", "Abu Burdah said from his father Abu Musa: we prayed Maghrib with the Messenger of Allah ﷺ, then said: let us sit and pray Isha with him. He came out and said: you are still here? We told him, and he said: you have done well. Then he raised his head to the sky and said: the stars are a safety for the sky; when the stars go, the sky will meet what it was promised. I am a safety for my Companions; when I go, my Companions will meet what they were promised. And my Companions are a safety for my Ummah; when they go, my Ummah will meet what it was promised.", "my Companions are a source of security for the Umma"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ say the stars are for the sky?", a: "A source of safety", wrong: ["A source of rain", "A source of luck", "A source of fear"], why: "The stars are a source of security for the sky, he ﷺ said." },
        { q: "Which prayer did they wait to pray with him ﷺ?", a: "Isha", wrong: ["Fajr", "Zuhr", "Asr"], why: "After Maghrib they sat on, to pray Isha with him ﷺ, Abu Musa said." },
        { q: "He ﷺ said his Companions are a safety for the Ummah.", tf: true, why: "My Companions are a source of security for the Umma, he ﷺ said." }
      ]
    },
    {
      slug: "the-lady-from-al-hirah",
      title: "The lady from al-Hirah",
      line: "Adi lived to see a lady travel safely from al-Hirah.",
      facts: ["Told by Adi ibn Hatim", "A howdah is a covered seat on a camel", "He ﷺ told Adi what he would live to see"],
      source: hadith("bukhari", "3595", "Adi ibn Hatim", "Sahih", "Adi ibn Hatim said: I was with the Prophet ﷺ when a man came and complained of poverty, and another complained of robbers on the roads. He ﷺ said: Adi, have you seen al-Hirah? If you live long, you will see a lady in a howdah travel from al-Hirah until she goes round the Ka'bah, fearing no one but Allah. And if you live long, the treasures of Khosrau will be opened. Adi later said: I saw a lady in a howdah travel from al-Hirah and go round the Ka'bah, fearing no one but Allah, and I was one of those who opened the treasures of Khosrau, son of Hurmuz.", "I saw a lady in a Howdah traveling from Al-Hira"),
      difficulty: 2,
      questions: [
        { q: "Where did the lady in the howdah travel from?", a: "Al-Hirah", wrong: ["Khaybar", "Najran", "Tabuk"], why: "I saw a lady in a howdah traveling from al-Hirah, Adi ibn Hatim said." },
        { q: "What did Adi say he helped to open?", a: "The treasures of Khosrau", wrong: ["The gates of Khaybar", "The forts of Ta'if", "The gates of Makkah"], why: "Adi said he was one of those who opened the treasures of Khosrau, son of Hurmuz." },
        { q: "The lady went round the Ka'bah fearing no one but Allah.", tf: true, why: "She would go round the Ka'bah fearing none but Allah, he ﷺ had told Adi, and Adi saw it." }
      ]
    },
    {
      slug: "umar-knew-adi",
      title: "Umar knew his worth",
      line: "Umar praised Adi for holding firm when others turned away.",
      facts: ["Told by Adi ibn Hatim", "He came to Umar with a delegation", "Umar called the men one by one"],
      source: hadith("bukhari", "4394", "Adi ibn Hatim", "Sahih", "Adi ibn Hatim said: we came to Umar in a delegation, and he began calling the men one by one, each by his name. I said: do you not know me, O Commander of the Believers? He said: yes. You accepted Islam when they disbelieved, you came when they turned away, you kept your promises when they broke theirs, and you knew the truth when they denied it. Adi said: then I do not mind.", "you fulfilled your promises when they broke theirs"),
      difficulty: 2,
      questions: [
        { q: "How did Umar call the men of the delegation?", a: "One by one, by name", wrong: ["All at once", "Tribe by tribe", "Oldest first"], why: "He started calling the men one by one, calling each by his name, Adi said." },
        { q: "What did Umar say Adi did when the others broke their promises?", a: "He kept his promises", wrong: ["He went on a journey", "He sold his camels", "He wrote them a letter"], why: "You fulfilled your promises when they broke theirs, Umar told Adi." },
        { q: "Umar said Adi accepted Islam when others disbelieved.", tf: true, why: "You embraced Islam when they disbelieved, Umar told Adi ibn Hatim." }
      ]
    },
    {
      slug: "the-horse-race",
      title: "The horse race",
      line: "Ibn Umar took part in a horse race the Prophet ﷺ held.",
      facts: ["Told by Abdullah ibn Umar", "Lean horses ran from al-Hafya' to Thaniyat al-Wada'", "The others ran on to the masjid of Bani Zurayq"],
      source: hadith("bukhari", "2868", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: the Prophet ﷺ held a race for the horses that had been made lean, from al-Hafya' to Thaniyat al-Wada', and for the horses that had not been made lean, from Thaniyah to the masjid of Bani Zurayq. And I was one of those who took part in that race.", "I was also amongst those who took part in that horse race"),
      difficulty: 2,
      questions: [
        { q: "Where did the horses not made lean race to?", a: "The masjid of Bani Zurayq", wrong: ["The masjid of Quba", "The masjid of Bani Salimah", "The masjid at Dhul-Hulayfah"], why: "From Thaniyah, the other horses raced to the masjid of Bani Zurayq, Ibn Umar said." },
        { q: "Who said he took part in that horse race?", a: "Abdullah ibn Umar", wrong: ["Abdullah ibn Abbas", "Abdullah ibn Mas'ud", "Abdullah ibn Amr"], why: "Ibn Umar said he was among them when the Prophet ﷺ held that race." },
        { q: "He ﷺ held a race between horses.", tf: true, why: "The Prophet ﷺ arranged for a horse race, and Ibn Umar took part in it." }
      ]
    }
  ]
};

export const SAHABA_STORIES_UNITS: readonly DeepUnit[] = [STORIES];
