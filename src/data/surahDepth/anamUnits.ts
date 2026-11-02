import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Al-An'am ayah by ayah, the way Ali 'Imran, An-Nisa and Al-Ma'idah are taught: every ayah or small group of
// ayahs gets a lesson, explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih
// hadith where one explains the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Al-An'am 6:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_6_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Al-An'am 6:${ayah}`,
    url: `https://quran.com/6:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 6:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q6 = (ayah: number) => quranQuote(6, ayah);

/** Ayahs 1 to 58: the Creator praised, mercy written on Himself, the signs ignored, the weak believers honored. */
const ANAM_ONE: DeepUnit = {
  key: "anam1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-6",
  name: "Al-An'am, ayahs 1 to 58",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-An'am",
  lessons: [
    {
      slug: "all-praise",
      title: "All praise to the Creator",
      line: "Al-An'am opens by praising Allah who made heaven and earth.",
      facts: ["Al-hamd: all praise", "A Makkan surah"],
      quote: q6(1),
      source: ik(1, "Allah praises Himself for creating the heavens and the earth as a home for His servants, and the darkness and the light for their night and day. Ibn Abbas said the whole surah came down in Makkah.", "Allah praises and glorifies His Most Honorable Self for creating the heavens and earth"),
      difficulty: 2,
      questions: [
        { q: "How does Al-An'am begin?", a: "All praise be to Allah", wrong: ["O mankind", "By the dawn", "Read in the name"], why: "Al-hamdu lillahil-ladhi khalaqas-samawati wal-ard." },
        { q: "Where did Al-An'am come down, per Ibn Abbas?", a: "Makkah", wrong: ["Madinah", "Ta'if", "Jerusalem"], why: "Ibn Abbas said all of it came down in Makkah." },
        { q: "Allah made the heavens and earth a home for His servants.", tf: true, why: "Ibn Kathir: as a dwelling for His servants." }
      ]
    },
    {
      slug: "darkness-light",
      title: "Many darknesses, one light",
      line: "Darkness is plural in 6:1, but light is one: light is nobler.",
      facts: ["Zulumat: darknesses", "An-Nur: the light"],
      quote: q6(1),
      source: ik(1, "Allah says darknesses, zulumat, in the plural, but light, an-nur, in the singular, because light is more honored. In the same way the straight path is one, and the wrong ways are many.", "while describing the light in the singular, An-Nur, because An-Nur is more honored"),
      difficulty: 3,
      questions: [
        { q: "In 6:1, which word is plural?", a: "Darkness (zulumat)", wrong: ["Light (nur)", "Earth (ard)", "Lord (rabb)"], why: "Wa ja'alaz-zulumati wan-nur." },
        { q: "Why is light singular, per Ibn Kathir?", a: "Light is more honored", wrong: ["It is smaller", "It is newer", "It was a mistake"], why: "An-Nur is more honored." },
        { q: "The truth is one path, and the wrong paths are many.", tf: true, why: "Ibn Kathir links it to 6:153, the one straight path." }
      ]
    },
    {
      slug: "from-clay",
      title: "Made from clay",
      line: "Allah made us from clay and set a time for each life.",
      facts: ["Tin: clay", "Ajal: a set term"],
      quote: q6(2),
      source: ik(2, "Created from clay means Adam, the father of mankind. The first term is each person's death, and the second term, kept with Allah, is the Day of Resurrection, as Ibn Abbas said.", "refers to the father of mankind, Adam, from whom mankind originated"),
      difficulty: 2,
      questions: [
        { q: "What were we created from, in 6:2?", a: "Clay", wrong: ["Fire", "Light", "Smoke"], why: "Khalaqakum min tin: through Adam." },
        { q: "What is the first set term in 6:2, per Ibn Abbas?", a: "Death", wrong: ["Marriage", "Ramadan", "Old age"], why: "The second term is the Day of Resurrection." },
        { q: "The second term in 6:2 is known to every person.", tf: false, why: "It is with Him: only Allah knows it." }
      ]
    },
    {
      slug: "secret-open",
      title: "He knows the hidden",
      line: "Allah knows what you hide, what you show, and what you earn.",
      facts: ["Sirr: secret", "Jahr: open"],
      quote: q6(3),
      source: ik(3, "He is the One worshipped in the heavens and the earth. He knows what you hide and what you show, and everything you earn of good and bad.", "He knows what you conceal and what you reveal, and He knows what you earn"),
      difficulty: 2,
      questions: [
        { q: "What does Allah know, in 6:3?", a: "Our secret and our open deeds", wrong: ["Only what we say", "Only big deeds", "Only the past"], why: "Ya'lamu sirrakum wa jahrakum." },
        { q: "A deed done in secret is hidden from Allah.", tf: false, why: "He knows what you conceal and what you reveal." },
        { q: "What else does He know, besides secret and open?", a: "What you earn", wrong: ["Nothing else", "Only your name", "Only your city"], why: "Wa ya'lamu ma taksibun." }
      ]
    },
    {
      slug: "nations-before",
      title: "Stronger nations before",
      line: "Earlier nations had more, yet sin destroyed them.",
      facts: ["Qarn: a generation", "Rain and rivers given"],
      quote: q6(6),
      source: ik(6, "The nations before had more wealth, children and buildings, with rain and rivers. Yet their sins destroyed them, and new generations came. You are not dearer to Allah than they were.", "you are not dearer to Allah than these previous nations"),
      difficulty: 3,
      questions: [
        { q: "What did the earlier nations have, in 6:6?", a: "More power and rain", wrong: ["Nothing at all", "No rivers", "No homes"], why: "We established them as We have not established you." },
        { q: "Why were they destroyed?", a: "For their sins", wrong: ["By chance", "For being poor", "For being few"], why: "Fa-ahlaknahum bi-dhunubihim." },
        { q: "Ibn Kathir: no later people are dearer to Allah than those nations were.", tf: true, why: "So beware of the same end." }
      ]
    },
    {
      slug: "human-messenger",
      title: "Why a human messenger",
      line: "Even an angel messenger would come as a man.",
      facts: ["Malak: angel", "Rajul: a man"],
      quote: q6(9),
      source: ik(9, "If Allah sent an angel as a messenger to people, he would come in the shape of a man so they could talk to him and learn from him. Sending human messengers is a mercy.", "he would be in the shape of a man so that they would be able to speak to him and benefit from his teachings"),
      difficulty: 3,
      questions: [
        { q: "If an angel were sent as messenger, how would he come?", a: "In the shape of a man", wrong: ["As a bright star", "As a voice only", "As a bird"], why: "La-ja'alnahu rajulan." },
        { q: "Why a man, per Ibn Kathir?", a: "So people could learn from him", wrong: ["To scare people", "To hide the truth", "To end the world"], why: "So they could speak to him and benefit." },
        { q: "What did the deniers ask for, in 6:8?", a: "An angel sent down", wrong: ["More rain", "A king", "A city"], why: "Law la unzila 'alayhi malak." }
      ]
    },
    {
      slug: "travel-see",
      title: "Travel and see",
      line: "Travel the land and see how the deniers ended.",
      facts: ["Siru: travel", "Unzuru: look and think"],
      quote: q6(11),
      source: ik(11, "Travel and think about the troubles Allah sent on earlier nations who denied His messengers, and how He saved the believers.", "contemplate about yourselves and think about the afflictions Allah struck the previous nations with"),
      difficulty: 3,
      questions: [
        { q: "What does 6:11 tell people to do?", a: "Travel and see the deniers' end", wrong: ["Stay home always", "Build towers", "Count stars"], why: "Qul siru fil-ardi thumman-zuru." },
        { q: "What is the point of the travel, per Ibn Kathir?", a: "To think and take a lesson", wrong: ["To trade only", "To find gold", "To escape"], why: "Contemplate and think about the afflictions." },
        { q: "Who mocked messengers before, in 6:10?", a: "Earlier peoples", wrong: ["The angels", "No one", "The birds"], why: "Messengers were mocked before you." }
      ]
    },
    {
      slug: "mercy-written",
      title: "Mercy written on Himself",
      line: "Allah wrote mercy on Himself: His mercy beats His anger.",
      facts: ["Kataba: He wrote", "Rahmah: mercy"],
      quote: q6(12),
      source: hadith("bukhari", "7404", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: when Allah created the creation, He wrote in His Book, which is with Him on the Throne: My mercy overcomes My anger.", "Verily My Mercy overcomes My Anger"),
      difficulty: 3,
      questions: [
        { q: "What did Allah write on Himself, in 6:12?", a: "Mercy", wrong: ["Anger", "Silence", "Distance"], why: "Kataba 'ala nafsihir-rahmah." },
        { q: "In Bukhari 7404, what overcomes Allah's anger?", a: "His mercy", wrong: ["His power", "His silence", "Our deeds"], why: "My Mercy overcomes My Anger." },
        { q: "Who narrated Bukhari 7404?", a: "Abu Hurairah", wrong: ["Anas ibn Malik", "Aishah", "Ibn Umar"], why: "Abu Hurairah narrated it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "only-he-harms",
      title: "Only He removes harm",
      line: "If Allah touches you with harm, only He can remove it.",
      facts: ["Durr: harm", "Khayr: good"],
      quote: q6(17),
      source: hadith("bukhari", "844", "Al-Mughirah ibn Shu'bah", "Sahih", "After every obligatory prayer the Prophet ﷺ said: O Allah, no one can hold back what You give, and no one can give what You hold back.", "Nobody can hold back what you gave"),
      difficulty: 3,
      questions: [
        { q: "Who can remove a harm Allah sends, in 6:17?", a: "Only Allah", wrong: ["A strong friend", "A charm", "A star"], why: "Fala kashifa lahu illa hu." },
        { q: "When did the Prophet ﷺ say the dua in Bukhari 844?", a: "After every obligatory prayer", wrong: ["Only on Eid", "Only when sick", "Only at night"], why: "Al-Mughirah wrote it to Mu'awiyah." },
        { q: "Someone can hold back a good that Allah gives.", tf: false, why: "Nobody can hold back what You gave." }
      ]
    },
    {
      slug: "whom-it-reaches",
      title: "A warning to all it reaches",
      line: "The Quran warns everyone it reaches, in every age.",
      facts: ["Andhir: warn", "Man balagh: whom it reaches"],
      quote: q6(19),
      source: ik(19, "Allah is the greatest witness. The Quran warns all who hear it. Ar-Rabi said: those who follow the Messenger ﷺ should call to what he called to and warn of what he warned of.", "ought to call to what the Messenger of Allah ﷺ called to and warn against what he warned against"),
      difficulty: 3,
      questions: [
        { q: "Whom does the Quran warn, in 6:19?", a: "Everyone it reaches", wrong: ["Only Makkah", "Only Arabs", "Only scholars"], why: "Li-undhirakum bihi wa man balagh." },
        { q: "Who is the greatest witness, in 6:19?", a: "Allah", wrong: ["The angels", "The people", "The stars"], why: "Qulillahu shahidun bayni wa baynakum." },
        { q: "Followers of the Messenger ﷺ should call to what he called to.", tf: true, why: "Ar-Rabi bin Anas, in Ibn Kathir." }
      ]
    },
    {
      slug: "where-partners",
      title: "Where are your partners?",
      line: "On that Day the idols vanish, and their worshippers deny it.",
      facts: ["Shuraka: partners", "Their lie vanishes"],
      quote: q6(24),
      source: ik(22, "On the Day of Resurrection Allah will ask about the idols they worshipped instead of Him. They will swear they never did, and their invented lie will disappear.", "when He will ask them about the idols and rivals that they worshipped instead of Him"),
      difficulty: 3,
      questions: [
        { q: "What will Allah ask the idol worshippers, in 6:22?", a: "Where are your partners?", wrong: ["How old are you?", "Where is your home?", "What did you eat?"], why: "Ayna shuraka'ukum." },
        { q: "What will they swear, in 6:23?", a: "We never joined partners", wrong: ["We were believers always", "We had no idols nearby", "We did not hear"], why: "Wallahi rabbina ma kunna mushrikin." },
        { q: "What happens to their lie, in 6:24?", a: "It disappears from them", wrong: ["It saves them", "It is believed", "It grows"], why: "Wa dalla 'anhum ma kanu yaftarun." }
      ]
    },
    {
      slug: "wish-return",
      title: "If only we could go back",
      line: "Before the Fire they will wish to return and believe.",
      facts: ["Nuraddu: sent back", "Too late"],
      quote: q6(27),
      source: ik(27, "Standing before the Fire, the deniers will wish to be sent back to do good and believe. Allah says even if they were sent back, they would return to what they were forbidden.", "They wish that they would be sent back to the life of the world so that they could perform righteous deeds"),
      difficulty: 4,
      questions: [
        { q: "What will the deniers wish, in 6:27?", a: "To be sent back to believe", wrong: ["To sleep longer", "To be angels", "To be forgotten"], why: "Ya laytana nuraddu." },
        { q: "If they were sent back, what would they do, per 6:28?", a: "Return to what was forbidden", wrong: ["Become prophets", "Never sin again", "Teach others"], why: "La'adu lima nuhu 'anhu." },
        { q: "The time to do good deeds is this life, before death.", tf: true, why: "The wish to return will not be granted." }
      ]
    },
    {
      slug: "play-amusement",
      title: "This life is mostly play",
      line: "This world is play and amusement; the Hereafter is better.",
      facts: ["La'ib: play", "Lahw: amusement"],
      quote: q6(32),
      source: ik(32, "The life of this world is mostly play and amusement, but the home of the Hereafter is far better for those who have taqwa.", "most of it is play and amusement"),
      difficulty: 3,
      questions: [
        { q: "What is this worldly life called, in 6:32?", a: "Play and amusement", wrong: ["Rest and sleep", "Wealth and fame", "Work only"], why: "Wa mal-hayatud-dunya illa la'ibun wa lahw." },
        { q: "For whom is the Hereafter better?", a: "Those who have taqwa", wrong: ["The richest", "The loudest", "Everyone equally"], why: "Khayrun lil-ladhina yattaqun." },
        { q: "Ibn Kathir says ALL of this life is play.", tf: false, why: "He says most of it is play and amusement." }
      ]
    },
    {
      slug: "not-you",
      title: "It is not you they deny",
      line: "Allah comforted the Prophet ﷺ: they deny Allah's ayahs, not you.",
      facts: ["Huzn: grief", "They knew he was truthful"],
      quote: q6(33),
      source: ik(33, "Allah comforts the Prophet ﷺ in his grief. They did not call him a liar; it is the truth they rejected. Abu Jahl and others even listened secretly to his recitation at night.", "It is only the truth that they reject and refuse"),
      difficulty: 3,
      questions: [
        { q: "Whom did the deniers really reject, in 6:33?", a: "The ayahs of Allah", wrong: ["The Prophet's ﷺ honesty", "Their own tribe", "The traders"], why: "Walakin-naz-zalimina bi-ayatillahi yajhadun." },
        { q: "Who listened in secret to the Quran at night, per Ibn Kathir?", a: "Abu Jahl and two others", wrong: ["Only angels", "Nobody", "The Roman king"], why: "They met each other on the way back three nights." },
        { q: "Allah knew the Prophet ﷺ was sad.", tf: true, why: "Qad na'lamu innahu la-yahzunuka." }
      ]
    },
    {
      slug: "patient-messengers",
      title: "Patient like the messengers",
      line: "Messengers before were denied and patient until help came.",
      facts: ["Sabaru: they were patient", "Nasr: help"],
      quote: q6(34),
      source: ik(34, "Earlier messengers were denied and hurt, and they were patient until Allah's help came. Allah promised His Messenger ﷺ victory as the earlier messengers were victorious.", "He also promised him victory, just as the previous Messengers were victorious"),
      difficulty: 3,
      questions: [
        { q: "What did earlier messengers do when denied, in 6:34?", a: "Stayed patient", wrong: ["Gave up", "Hid forever", "Took revenge"], why: "Fa-sabaru 'ala ma kudhdhibu." },
        { q: "Until what were they patient?", a: "Until Allah's help came", wrong: ["Until they got rich", "Until they slept", "Until they left"], why: "Hatta atahum nasruna." },
        { q: "Who can change the words of Allah, in 6:34?", a: "No one", wrong: ["Kings", "Poets", "Scholars"], why: "Wa la mubaddila li-kalimatillah." }
      ]
    },
    {
      slug: "nations-like-you",
      title: "Animals are nations too",
      line: "Every animal and bird lives in communities like ours.",
      facts: ["Umam: nations", "All gathered to Allah"],
      quote: q6(38),
      source: ik(38, "Every creature on land and every bird lives in kinds and communities. Qatadah said birds are a nation, people are a nation and jinn are a nation. Allah forgets none of them or their food.", "Birds are an Ummah, humans are an Ummah and the Jinns are an Ummah"),
      difficulty: 3,
      questions: [
        { q: "What are animals and birds, in 6:38?", a: "Nations like you", wrong: ["Only food", "Without purpose", "Forgotten"], why: "Illa umamun amthalukum." },
        { q: "Per Qatadah, which are each an ummah?", a: "Birds, humans and jinn", wrong: ["Only humans", "Only angels", "Only fish"], why: "Quoted in Ibn Kathir on 6:38." },
        { q: "Allah forgets the food of small creatures.", tf: false, why: "He never forgets any creature or its provision." }
      ]
    },
    {
      slug: "only-him",
      title: "In trouble, only Him",
      line: "In real danger even idol worshippers call only Allah.",
      facts: ["Tad'un: you call", "Idols forgotten"],
      quote: q6(41),
      source: ik(41, "When disaster or the Hour comes, people call on Allah alone, because they know only He can remove it. In times of need they forget their idols.", "in times of necessity, you only call on Allah and forget your idols and false deities"),
      difficulty: 3,
      questions: [
        { q: "Whom do people call in real disaster, in 6:41?", a: "Allah alone", wrong: ["Their idols", "Their ancestors", "No one"], why: "Bal iyyahu tad'un." },
        { q: "What do they forget then, per Ibn Kathir?", a: "Their idols", wrong: ["Their names", "Their food", "Their homes"], why: "They forget their idols and false deities." },
        { q: "Calling Allah only in danger, then forgetting Him, is the right way.", tf: false, why: "6:41 shows it as a proof against shirk." }
      ]
    },
    {
      slug: "soft-hearts",
      title: "Hardship to soften hearts",
      line: "Hardship came so people would turn humble and call Allah.",
      facts: ["Tadarru: humbling yourself", "Hearts grew hard"],
      quote: q6(43),
      source: ik(43, "Allah tested nations with poverty and illness so they would humble themselves and call Him. Instead their hearts grew hard, and Shaytan made their deeds look good to them.", "for their hearts are not soft or humble"),
      difficulty: 4,
      questions: [
        { q: "Why were nations tested with hardship, in 6:42?", a: "So they would humble themselves", wrong: ["To make them rich", "For no reason", "To end them at once"], why: "La'allahum yatadarra'un." },
        { q: "What happened to their hearts, in 6:43?", a: "They grew hard", wrong: ["They grew soft", "They grew wise", "Nothing"], why: "Wa lakin qasat qulubuhum." },
        { q: "Who made their bad deeds look good, in 6:43?", a: "Shaytan", wrong: ["Their prophets", "The angels", "Their children"], why: "Wa zayyana lahumush-shaytan." }
      ]
    },
    {
      slug: "gates-opened",
      title: "Every door opened",
      line: "After they forgot, Allah opened every door, then took them.",
      facts: ["Abwab: doors", "Blessings can be a test"],
      quote: q6(44),
      source: ik(44, "When they ignored the reminder, Allah opened the gates of provision for them. While they enjoyed it, punishment came suddenly. We seek refuge with Allah from such an end.", "We opened the gates of provisions for them from wherever they wished"),
      difficulty: 4,
      questions: [
        { q: "What did Allah open after they forgot, in 6:44?", a: "The gates of every good thing", wrong: ["The gates of a prison", "A new sea", "A cave"], why: "Fatahna 'alayhim abwaba kulli shay." },
        { q: "Ease and wealth always mean Allah is pleased with you.", tf: false, why: "6:44: open gates came before sudden punishment." },
        { q: "How did the punishment come, in 6:44?", a: "Suddenly, while they enjoyed", wrong: ["Slowly, with warning", "Never", "Only in sleep"], why: "Akhadhnahum baghtatan." }
      ]
    },
    {
      slug: "no-unseen",
      title: "Not owner of the unseen",
      line: "The Prophet ﷺ owns no treasures and knows only what is revealed.",
      facts: ["Ghayb: the unseen", "He follows revelation"],
      quote: q6(50),
      source: ik(50, "The Messenger ﷺ says he does not own Allah's treasures, does not know the unseen except what Allah tells him, and is not an angel. He is a human who follows revelation.", "I do not say that I know the Unseen, because its knowledge is with Allah"),
      difficulty: 4,
      questions: [
        { q: "What does the Prophet ﷺ say he is not, in 6:50?", a: "An angel", wrong: ["A human", "A messenger", "A servant of Allah"], why: "Wa la aqulu lakum inni malak." },
        { q: "Whose knowledge is the unseen?", a: "Allah's alone", wrong: ["Fortune tellers'", "Every prophet's fully", "The jinn's"], why: "Its knowledge is with Allah." },
        { q: "What does the Prophet ﷺ follow, in 6:50?", a: "Only what is revealed to him", wrong: ["His own wishes", "His tribe's customs", "Dreams of others"], why: "In attabi'u illa ma yuha ilayy." }
      ]
    },
    {
      slug: "keep-weak",
      title: "Never push the poor away",
      line: "Do not send away the poor believers who call Allah daily.",
      facts: ["La tatrud: do not drive away", "Morning and evening"],
      quote: q6(52),
      source: hadith("muslim", "2413", "Sa'd ibn Abi Waqqas", "Sahih", "Sa'd said the idol worshippers asked the Prophet ﷺ to send away six poor believers, among them Sa'd, Ibn Mas'ud and Bilal. Then Allah revealed: do not drive away those who call upon their Lord morning and evening.", "Drive not away those who call upon their Lord morning and evening"),
      difficulty: 4,
      questions: [
        { q: "Who asked for the poor believers to be sent away, per Muslim 2413?", a: "The idol worshippers", wrong: ["The poor themselves", "The angels", "The Romans"], why: "They said: drive them away." },
        { q: "Which Companion was among the six, per Sa'd?", a: "Bilal", wrong: ["Abu Jahl", "Heraclius", "Al-Akhnas"], why: "Sa'd named himself, Ibn Mas'ud, a man of Hudhayl and Bilal." },
        { q: "When do these believers call their Lord, in 6:52?", a: "Morning and evening", wrong: ["Only on Friday", "Once a year", "Only when rich"], why: "Bil-ghadati wal-'ashiyy." }
      ]
    },
    {
      slug: "followers-poor",
      title: "Followers of the messengers",
      line: "Most early believers were poor, as with every messenger.",
      facts: ["Fitnah: a test", "The weak believed first"],
      quote: q6(53),
      source: hadith("bukhari", "7", "Ibn Abbas", "Sahih", "Heraclius asked Abu Sufyan whether the nobles or the poor followed the Prophet ﷺ. He said the poor. Heraclius said all messengers have been followed by such people.", "all the Apostle have been followed by this very class of people"),
      difficulty: 4,
      questions: [
        { q: "What did the chiefs mock, in 6:53?", a: "Allah favoring poor believers", wrong: ["The rain", "Their own wealth", "The stars"], why: "A ha'ula'i mannallahu 'alayhim min baynina?" },
        { q: "Who followed the Prophet ﷺ, per Abu Sufyan to Heraclius?", a: "Mostly the poor", wrong: ["Only kings", "Only the rich", "No one"], why: "Bukhari 7: it is the poor who follow him." },
        { q: "Who knows best who is grateful, in 6:53?", a: "Allah", wrong: ["The chiefs", "The traders", "The poets"], why: "A laysallahu bi-a'lama bish-shakirin?" }
      ]
    },
    {
      slug: "hearts-deeds",
      title: "Allah looks at hearts",
      line: "Allah does not look at faces and wealth, but hearts and deeds.",
      facts: ["Qalb: heart", "Not status or looks"],
      quote: q6(53),
      source: hadith("muslim", "2564", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: Allah does not look at your bodies or your faces, but He looks at your hearts and your deeds. Ibn Kathir quotes it on 6:53.", "Verily Allah does not look to your bodies nor to your faces but He looks to your hearts"),
      difficulty: 4,
      questions: [
        { q: "What does Allah look at, per Muslim 2564?", a: "Hearts and deeds", wrong: ["Faces and bodies", "Wealth and clothes", "Family names"], why: "He looks to your hearts." },
        { q: "A poor believer can be dearer to Allah than a rich chief.", tf: true, why: "6:52-53 and Muslim 2564." },
        { q: "Who narrated Muslim 2564?", a: "Abu Hurairah", wrong: ["Sa'd ibn Abi Waqqas", "Ibn Abbas", "Bilal"], why: "Abu Hurairah reported it from the Prophet ﷺ." }
      ]
    },
    {
      slug: "say-salam",
      title: "Greet them with salam",
      line: "When believers come, greet them: peace be upon you.",
      facts: ["Salamun alaykum", "Honor the believers"],
      quote: q6(54),
      source: ik(54, "Honor the believers by returning their salam and giving them the good news of Allah's mercy. Whoever does wrong in ignorance, then repents and does good, Allah forgives.", "honor them by returning the Salam"),
      difficulty: 4,
      questions: [
        { q: "What should the Prophet ﷺ say to believers who come, in 6:54?", a: "Salamun alaykum", wrong: ["Go away", "Pay first", "Come tomorrow"], why: "Fa-qul salamun 'alaykum." },
        { q: "Whoever sins, then repents and does good, Allah...", a: "Forgives and has mercy", wrong: ["Never forgives", "Forgets him", "Doubles his sin"], why: "Fa-annahu ghafurun rahim." },
        { q: "In 6:54, what has Allah written on Himself again?", a: "Mercy", wrong: ["Anger", "Wealth", "Silence"], why: "Kataba rabbukum 'ala nafsihir-rahmah." }
      ]
    },
    {
      slug: "decision-allah",
      title: "The judgment is Allah's",
      line: "The Prophet ﷺ stands on clear proof; the decision is Allah's.",
      facts: ["Bayyinah: clear proof", "Al-hukm lillah"],
      quote: q6(57),
      source: ik(57, "The Prophet ﷺ has clear knowledge of what Allah revealed. The punishment they rush for is not in his hands: Allah decides, punishing soon or giving time, by His wisdom.", "I have a clear understanding of the Law of Allah that He has revealed to me"),
      difficulty: 5,
      questions: [
        { q: "Whose is the decision, in 6:57?", a: "Allah's alone", wrong: ["The Prophet's ﷺ", "The chiefs'", "The people's vote"], why: "Inil-hukmu illa lillah." },
        { q: "What were the deniers rushing for, per Ibn Kathir?", a: "The punishment", wrong: ["Rain", "Gold", "A feast"], why: "I do not have what you are hastily seeking." },
        { q: "Why might Allah delay punishment, per Ibn Kathir?", a: "Out of His great wisdom", wrong: ["He forgot", "He is unable", "By accident"], why: "He gives respite out of His great wisdom." }
      ]
    }
  ]
};

/** Ayahs 59 to 110: the keys of the unseen, Ibrahim and the star, moon and sun, the prophets to follow, signs in nature. */
const ANAM_TWO: DeepUnit = {
  key: "anam2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-6",
  name: "Al-An'am, ayahs 59 to 110",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-An'am",
  lessons: [
    {
      slug: "keys-unseen",
      title: "The keys of the unseen",
      line: "Only Allah holds the keys of the unseen: there are five.",
      facts: ["Mafatih: keys", "Ghayb: the unseen"],
      quote: q6(59),
      source: hadith("bukhari", "4627", "Abdullah ibn Umar", "Sahih", "The Messenger of Allah ﷺ said: the keys of the unseen are five: the knowledge of the Hour, the coming of rain, what is in the wombs, what a soul will earn tomorrow, and the land where it will die.", "The keys of the Unseen are five"),
      difficulty: 2,
      questions: [
        { q: "Who knows the keys of the unseen, in 6:59?", a: "Allah alone", wrong: ["Fortune tellers", "Star readers", "The jinn"], why: "Wa 'indahu mafatihul-ghayb, la ya'lamuha illa hu." },
        { q: "How many keys of the unseen, per Bukhari 4627?", a: "Five", wrong: ["Three", "Seven", "Ten"], why: "The keys of the Unseen are five." },
        { q: "Which is one of the five?", a: "The land where a soul dies", wrong: ["Tomorrow's sunrise time", "The number of stars", "A city's name"], why: "No soul knows in what land it will die." }
      ]
    },
    {
      slug: "every-leaf",
      title: "Not a leaf falls",
      line: "No leaf falls and no seed hides without Allah knowing.",
      facts: ["Waraqah: a leaf", "Kitab mubin: clear record"],
      quote: q6(59),
      source: ik(59, "Allah knows the movement of everything, even a falling leaf. If He knows things without life, how much more does He know the living, who are told to worship Him.", "He knows the movements of everything including inanimate things"),
      difficulty: 2,
      questions: [
        { q: "What falls that Allah knows, in 6:59?", a: "Every leaf", wrong: ["Only big trees", "Only rain", "Nothing small"], why: "Wa ma tasqutu min waraqatin illa ya'lamuha." },
        { q: "Where is every grain and fresh or dry thing, in 6:59?", a: "In a clear record", wrong: ["Lost forever", "Hidden from Him", "In the sea only"], why: "Illa fi kitabin mubin." },
        { q: "A seed in the dark earth is hidden from Allah.", tf: false, why: "Not a grain in the darkness of the earth, but He knows it." }
      ]
    },
    {
      slug: "sleep-death",
      title: "Sleep, the small death",
      line: "Each night Allah takes our souls in sleep, then wakes us.",
      facts: ["Yatawaffakum: takes your souls", "Sleep: minor death"],
      quote: q6(60),
      source: ik(60, "Allah takes souls in sleep at night, for sleep is a minor death, and knows what we did by day. Then He wakes us until our set term ends, and then we return to Him.", "for sleep is minor death"),
      difficulty: 3,
      questions: [
        { q: "What does Allah take each night, in 6:60?", a: "Our souls, in sleep", wrong: ["Our money", "Our names", "Our homes"], why: "Wa huwal-ladhi yatawaffakum bil-layl." },
        { q: "What does Ibn Kathir call sleep?", a: "Minor death", wrong: ["Wasted time", "A long trip", "A reward"], why: "For sleep is minor death." },
        { q: "Allah knows what we did during the day.", tf: true, why: "Wa ya'lamu ma jarahtum bin-nahar." }
      ]
    },
    {
      slug: "waking-dua",
      title: "The waking dua",
      line: "On waking the Prophet ﷺ praised Allah who gave life after death.",
      facts: ["Ahyana: gave us life", "An-nushur: rising"],
      quote: q6(60),
      source: hadith("bukhari", "6312", "Hudhayfah", "Sahih", "When going to bed the Prophet ﷺ said: in Your name I die and live. When he woke he said: praise be to Allah who gave us life after He made us die, and to Him is the rising.", "Bismika amutu wa ahya"),
      difficulty: 3,
      questions: [
        { q: "What did the Prophet ﷺ say on waking, per Bukhari 6312?", a: "Praise Allah who gave us life", wrong: ["I am still tired", "Nothing at all", "Good morning, world"], why: "Al-hamdu lillahil-ladhi ahyana." },
        { q: "What did he say going to bed?", a: "In Your name I die and live", wrong: ["I will wake early", "Goodbye", "Close the door"], why: "Bismika amutu wa ahya." },
        { q: "Who narrated Bukhari 6312?", a: "Hudhayfah", wrong: ["Aishah", "Anas ibn Malik", "Abu Hurairah"], why: "Narrated Hudhayfah." }
      ]
    },
    {
      slug: "guardian-angels",
      title: "Angels who guard",
      line: "Allah sends angels who guard us, then angels take the soul.",
      facts: ["Hafazah: guardians", "Al-Qahir: All-Controlling"],
      quote: q6(61),
      source: ik(61, "Al-Qahir is the One who controls everything. He sends guarding angels over people, and when death comes, His angel messengers take the soul and never fail in their duty.", "angels who guard mankind"),
      difficulty: 3,
      questions: [
        { q: "Whom does Allah send over us, in 6:61?", a: "Guarding angels", wrong: ["Jinn", "Kings", "Birds"], why: "Wa yursilu 'alaykum hafazah." },
        { q: "What does Al-Qahir mean, per Ibn Kathir?", a: "The One who controls everything", wrong: ["The One who sleeps", "The One who forgets", "A king of Persia"], why: "All are subservient to Him." },
        { q: "The angels who take souls sometimes fail in their duty.", tf: false, why: "Wa hum la yufarritun." }
      ]
    },
    {
      slug: "land-sea",
      title: "Saved in the storm",
      line: "In storms on land and sea, people call Allah alone.",
      facts: ["Zulumat: dark troubles", "Then they forget"],
      quote: q6(63),
      source: ik(63, "Allah saves people in the dark troubles of land and sea, like storms. Then they call Him alone and promise to be grateful, but after He saves them, many go back to shirk.", "In such cases, they call on Allah alone, without partners, in supplication"),
      difficulty: 3,
      questions: [
        { q: "What do people promise in danger, in 6:63?", a: "To be grateful", wrong: ["To travel again", "To get rich", "To be silent"], why: "La-nakunanna minash-shakirin." },
        { q: "What do many do after being saved, in 6:64?", a: "Go back to shirk", wrong: ["Thank Allah forever", "Build a ship", "Become prophets"], why: "Thumma antum tushrikun." },
        { q: "Who rescues from every distress, in 6:64?", a: "Allah", wrong: ["The captain", "Luck", "The stars"], why: "Qulillahu yunajjikum minha wa min kulli karb." }
      ]
    },
    {
      slug: "leave-mockers",
      title: "Leave those who mock",
      line: "When people mock Allah's ayahs, leave until they change topic.",
      facts: ["Yakhuduna: they mock", "Sit with them after? No"],
      quote: q6(68),
      source: ik(68, "When you see people mocking and denying the ayahs, leave them until they talk about something else. If Shaytan makes you forget, do not keep sitting with them once you remember.", "until they talk about a subject other than the denial they were engaged in"),
      difficulty: 3,
      questions: [
        { q: "What should you do when people mock the ayahs, in 6:68?", a: "Leave until they change topic", wrong: ["Join the jokes", "Laugh quietly", "Stay to listen"], why: "Fa-a'rid 'anhum hatta yakhudu fi hadithin ghayrih." },
        { q: "If Shaytan made you forget, what then?", a: "Leave once you remember", wrong: ["Stay all night", "It is fine forever", "Join them"], why: "Fala taq'ud ba'dadh-dhikra." },
        { q: "Who can make you forget, in 6:68?", a: "Shaytan", wrong: ["The angels", "Your parents", "The Quran"], why: "Wa imma yunsiyannakash-shaytan." }
      ]
    },
    {
      slug: "remind-quran",
      title: "Remind with the Quran",
      line: "Leave those who make religion a game, but remind with the Quran.",
      facts: ["Dhakkir: remind", "No ransom accepted"],
      quote: q6(70),
      source: ik(70, "Leave those who treat religion as play, and remind people with the Quran before a soul is held back by what it earned. On that Day no ransom will be accepted.", "whatever the ransom such people offer, it will not be accepted from them"),
      difficulty: 3,
      questions: [
        { q: "What do some take their religion as, in 6:70?", a: "Play and amusement", wrong: ["A serious duty", "A light", "A shield"], why: "Ittakhadhu dinahum la'iban wa lahwa." },
        { q: "With what should we remind, in 6:70?", a: "The Quran", wrong: ["Poetry", "Gossip", "Jokes"], why: "Wa dhakkir bihi." },
        { q: "On that Day a big ransom can buy freedom.", tf: false, why: "Even if he offers every ransom, it will not be accepted." }
      ]
    },
    {
      slug: "lost-traveler",
      title: "The lost traveler",
      line: "Leaving faith is like a lost man ignoring friends who call him.",
      facts: ["Hayran: confused", "Huda Allah: true guidance"],
      quote: q6(71),
      source: ik(71, "As-Suddi said: whoever leaves faith after guidance is like a man lost in the land, led by devils, while his companions on the road call him back to the path, and he refuses.", "his companions on the road were calling him to come to them"),
      difficulty: 4,
      questions: [
        { q: "In the parable of 6:71, who calls the lost man?", a: "His companions on the path", wrong: ["The idols", "Nobody", "A king"], why: "Lahu ashabun yad'unahu ilal-huda." },
        { q: "What is the only true guidance, in 6:71?", a: "Allah's guidance", wrong: ["Any path you like", "Ancestors' ways", "Fortune telling"], why: "Inna hudallahi huwal-huda." },
        { q: "What are believers commanded in 6:72?", a: "Establish prayer and have taqwa", wrong: ["Travel the sea", "Build towers", "Count gold"], why: "Wa an aqimus-salata wattaquh." }
      ]
    },
    {
      slug: "ibrahim-father",
      title: "Ibrahim and his father",
      line: "Ibrahim told his father Azar: idols as gods is clear error.",
      facts: ["Azar: his father", "Asnam: idols"],
      quote: q6(74),
      source: ik(74, "Ibrahim advised his father and forbade him from worshipping idols, telling him gently that he and his people were in clear error.", "Ibrahim advised, discouraged and forbade his father from worshipping idols"),
      difficulty: 3,
      questions: [
        { q: "What was Ibrahim's father called, in 6:74?", a: "Azar", wrong: ["Imran", "Lut", "Ya'qub"], why: "Wa idh qala Ibrahimu li-abihi Azar." },
        { q: "What did Ibrahim call worshipping idols?", a: "Clear error", wrong: ["A good custom", "A small thing", "Wisdom"], why: "Fi dalalin mubin." },
        { q: "What did Allah show Ibrahim, in 6:75?", a: "The kingdom of heaven and earth", wrong: ["A treasure", "A palace", "A sea route"], why: "Malakutas-samawati wal-ard." }
      ]
    },
    {
      slug: "star-moon-sun",
      title: "The star, moon and sun",
      line: "Ibrahim showed his people that what sets cannot be a god.",
      facts: ["Afala: it set", "A debate, not doubt"],
      quote: q6(76),
      source: ik(76, "Ibrahim pointed at a star, the moon and the sun, and each one set. Ibn Kathir says he was debating with his people, showing them the error of worshipping heavenly bodies.", "was debating with his people, explaining to them the error of their way in worshipping idols and images"),
      difficulty: 4,
      questions: [
        { q: "What did Ibrahim say when the star set, in 6:76?", a: "I do not love what sets", wrong: ["I will follow it", "It is the greatest", "Bring it back"], why: "La uhibbul-afilin." },
        { q: "In what order did Ibrahim point, in 6:76-78?", a: "Star, moon, sun", wrong: ["Sun, moon, star", "Moon, sun, star", "Sun, star, moon"], why: "Kawkab, then qamar, then shams." },
        { q: "Per Ibn Kathir, Ibrahim was really unsure who his Lord was.", tf: false, why: "He was debating with his people." }
      ]
    },
    {
      slug: "hanif",
      title: "Turned to Allah, hanif",
      line: "I turn my face to the Creator, upright, not a mushrik.",
      facts: ["Hanif: upright, away from shirk", "Wajjahtu: I turned"],
      quote: q6(79),
      source: ik(79, "Ibrahim said he made his worship sincere for the One who made heaven and earth, hanif: avoiding shirk and holding to tawhid.", "avoiding Shirk and embracing Tawhid"),
      difficulty: 4,
      questions: [
        { q: "Toward whom did Ibrahim turn his face, in 6:79?", a: "The Creator of heaven and earth", wrong: ["The sun", "The moon", "His father's idols"], why: "Wajjahtu wajhiya lil-ladhi fataras-samawati wal-ard." },
        { q: "What does hanif mean, per Ibn Kathir?", a: "Avoiding shirk, holding tawhid", wrong: ["Being rich", "Being a king", "Living alone"], why: "Avoiding Shirk and embracing Tawhid." },
        { q: "Ibrahim said: I am free of what you join with Allah.", tf: true, why: "Inni bari'un mimma tushrikun, 6:78." }
      ]
    },
    {
      slug: "zulm-shirk",
      title: "Faith not mixed with wrong",
      line: "Safety is for believers who never mix faith with shirk.",
      facts: ["Zulm here: shirk", "Amn: safety"],
      quote: q6(82),
      source: hadith("bukhari", "32", "Abdullah ibn Mas'ud", "Sahih", "When 6:82 came down the Companions asked: who among us has not done wrong? Allah revealed: joining others with Allah is a great wrong. So zulm here means shirk.", "joining others in worship with Allah is a great injustice"),
      difficulty: 4,
      questions: [
        { q: "Who has security, in 6:82?", a: "Believers who avoid shirk", wrong: ["The richest people", "Anyone at all", "The strongest"], why: "Lam yalbisu imanahum bi-zulm." },
        { q: "What is the zulm of 6:82, per Bukhari 32?", a: "Shirk", wrong: ["Any small mistake", "Being poor", "Forgetting"], why: "Joining others in worship with Allah is a great injustice." },
        { q: "Why were the Companions worried about 6:82?", a: "Everyone does some wrong", wrong: ["They were sick", "They were lost", "They had no food"], why: "Who is amongst us who had not done injustice?" }
      ]
    },
    {
      slug: "eighteen-prophets",
      title: "Prophets named together",
      line: "6:83-86 names eighteen prophets, from Nuh to Lut.",
      facts: ["Ishaq and Ya'qub", "Each was righteous"],
      quote: q6(84),
      source: ik(86, "Allah gave Ibrahim Ishaq and Ya'qub in old age. He guided Nuh before, and from his line Dawud, Sulayman, Ayyub, Yusuf, Musa, Harun and more. Some of their fathers, children and brothers were also chosen.", "mentions that some of these Prophets"),
      difficulty: 4,
      questions: [
        { q: "Whom did Allah give Ibrahim, in 6:84?", a: "Ishaq and Ya'qub", wrong: ["Musa and Harun", "Dawud and Sulayman", "Yunus and Lut"], why: "Wa wahabna lahu Ishaqa wa Ya'qub." },
        { q: "Which prophet is named in 6:86?", a: "Yunus", wrong: ["Hud", "Salih", "Shu'ayb"], why: "Wa Isma'ila wal-Yasa'a wa Yunusa wa Luta." },
        { q: "Whom did Allah guide before Ibrahim, in 6:84?", a: "Nuh", wrong: ["Musa", "Isa", "Yusuf"], why: "Wa Nuhan hadayna min qabl." }
      ]
    },
    {
      slug: "shirk-erases",
      title: "Shirk wipes out deeds",
      line: "Had even prophets done shirk, their deeds would be lost.",
      facts: ["Habita: was lost", "The danger of shirk"],
      quote: q6(88),
      source: ik(88, "Allah says that if even these prophets had joined others with Him, all their deeds would be lost. This shows how serious and dangerous shirk is.", "This magnifies the serious danger of Shirk and the gravity of committing it"),
      difficulty: 4,
      questions: [
        { q: "What would happen to deeds mixed with shirk, in 6:88?", a: "They would be lost", wrong: ["They would double", "Nothing", "They would be saved"], why: "La-habita 'anhum ma kanu ya'malun." },
        { q: "Why does 6:88 say it even about prophets?", a: "To show how serious shirk is", wrong: ["They did shirk", "To blame them", "By mistake"], why: "It magnifies the danger of shirk." },
        { q: "Whose guidance guided these prophets, in 6:88?", a: "Allah's guidance", wrong: ["Their own ideas", "Their kings", "Their wealth"], why: "Dhalika hudallah." }
      ]
    },
    {
      slug: "follow-guidance",
      title: "Follow their guidance",
      line: "The Prophet ﷺ was told: follow the guidance of those prophets.",
      facts: ["Iqtadih: follow it", "No pay asked"],
      quote: q6(90),
      source: hadith("bukhari", "4632", "Ibn Abbas", "Sahih", "Mujahid asked Ibn Abbas about the prostration in Surah Sad. Ibn Abbas recited 6:90 and said Dawud is one of those prophets, and your Prophet ﷺ was told to follow them.", "Your Prophet (Muhammad) was one of those who were ordered to follow them"),
      difficulty: 5,
      questions: [
        { q: "What was the Prophet ﷺ told in 6:90?", a: "Follow their guidance", wrong: ["Forget them", "Change their message", "Ask for payment"], why: "Fa-bi-hudahumuqtadih." },
        { q: "Which prophet did Ibn Abbas name, explaining the sajdah in Sad?", a: "Dawud", wrong: ["Yunus", "Nuh", "Musa"], why: "He (David) is one of them, Bukhari 4632." },
        { q: "What does the Prophet ﷺ ask for the Quran, in 6:90?", a: "No reward at all", wrong: ["Gold", "A palace", "Half their wealth"], why: "La as'alukum 'alayhi ajra." }
      ]
    },
    {
      slug: "musa-book",
      title: "Who sent Musa's book?",
      line: "To those who deny revelation: who sent the Tawrah to Musa?",
      facts: ["Tawrah: light and guidance", "Musa son of Imran"],
      quote: q6(91),
      source: ik(91, "Some said Allah never sent anything down to a human. Allah answers: who sent the book of Musa, a light and guidance for people? It was Allah.", "Allah sent the Tawrah as a light and a guidance for people"),
      difficulty: 4,
      questions: [
        { q: "Which book is named in 6:91?", a: "The book of Musa", wrong: ["The Injil", "The Zabur", "A poem book"], why: "Man anzalal-kitabal-ladhi ja'a bihi Musa." },
        { q: "What was the Tawrah, per 6:91?", a: "A light and guidance", wrong: ["A song", "A story only", "A law of kings"], why: "Nuran wa hudan lin-nas." },
        { q: "Who sent it down?", a: "Allah", wrong: ["Musa himself", "Fir'awn", "The priests"], why: "Qulillah." }
      ]
    },
    {
      slug: "mother-of-towns",
      title: "The Mother of Towns",
      line: "The blessed Quran warns Makkah and all the world around it.",
      facts: ["Umm al-Qura: Makkah", "Mubarak: blessed"],
      quote: q6(92),
      source: ik(92, "The Quran is a blessed Book confirming earlier books, sent to warn the Mother of Towns, Makkah, and all around it, Arabs and non-Arabs alike.", "refering to the Arabs and the rest of the children of Adam, Arabs and non-Arabs alike"),
      difficulty: 4,
      questions: [
        { q: "What is the Mother of Towns, per Ibn Kathir?", a: "Makkah", wrong: ["Madinah", "Jerusalem", "Damascus"], why: "Umm al-Qura is Makkah." },
        { q: "Who is around it, per Ibn Kathir?", a: "All people, Arab and non-Arab", wrong: ["Only Quraysh", "Only traders", "Nobody"], why: "The rest of the children of Adam." },
        { q: "What do believers in the Hereafter guard, in 6:92?", a: "Their prayers", wrong: ["Their gold", "Their poems", "Their idols"], why: "Wa hum 'ala salatihim yuhafizun." }
      ]
    },
    {
      slug: "false-prophet",
      title: "The worst lie",
      line: "None is worse than one who falsely claims revelation.",
      facts: ["Musaylimah the liar", "Iftara: invented"],
      quote: q6(93),
      source: ik(93, "None is more unjust than one who lies about Allah, or claims revelation came to him when it did not. Ikrimah and Qatadah said it came down about Musaylimah the liar.", "this Ayah was revealed about Musaylimah Al-Kadhdhab"),
      difficulty: 4,
      questions: [
        { q: "Who is most unjust, in 6:93?", a: "One who lies against Allah", wrong: ["One who is poor", "One who travels", "One who sleeps late"], why: "Wa man azlamu mimmaniftara 'alallahi kadhiba." },
        { q: "About whom was 6:93 revealed, per Ikrimah and Qatadah?", a: "Musaylimah the liar", wrong: ["Abu Bakr", "Heraclius", "Bilal"], why: "Musaylimah Al-Kadhdhab." },
        { q: "Anyone can produce something like the Quran.", tf: false, why: "6:93 condemns that claim as a lie." }
      ]
    },
    {
      slug: "come-alone",
      title: "You come alone",
      line: "We return to Allah alone, leaving all our wealth behind.",
      facts: ["Furada: alone", "Wealth left behind"],
      quote: q6(94),
      source: ik(94, "On the Day of Resurrection people come to Allah alone, as He created them the first time, leaving behind everything He gave them. The partners they hoped in are gone.", "just as We started your creation, We brought you back"),
      difficulty: 4,
      questions: [
        { q: "How do we come to Allah, in 6:94?", a: "Alone, as first created", wrong: ["With our wealth", "With our servants", "With our idols"], why: "Wa laqad ji'tumuna furada." },
        { q: "What is left behind, in 6:94?", a: "All Allah had given", wrong: ["Nothing", "Only clothes", "Only our names"], why: "Wa taraktum ma khawwalnakum wara'a zuhurikum." },
        { q: "What should you send ahead, per Al-Hasan in Ibn Kathir?", a: "Good deeds", wrong: ["Gold", "Letters", "Servants"], why: "Where is what you sent forth for yourself?" }
      ]
    },
    {
      slug: "seed-split",
      title: "He splits the seed",
      line: "Allah splits the seed and date stone so plants grow.",
      facts: ["Faliq: splitter", "Habb wan-nawa: seed and stone"],
      quote: q6(95),
      source: ik(95, "Allah splits seeds and fruit stones in the soil so plants of many kinds, colors and tastes grow. He brings the living plant out of the lifeless seed.", "He causes the seed grain and the fruit stone to split and sprout in the ground"),
      difficulty: 3,
      questions: [
        { q: "What does Allah split, in 6:95?", a: "The seed and the fruit stone", wrong: ["The mountain", "The moon", "The sea"], why: "Innallaha faliqul-habbi wan-nawa." },
        { q: "He brings the living from the dead, like...", a: "A plant from a dry seed", wrong: ["Gold from rock", "Rain from dust", "Fire from water"], why: "Ibn Kathir: the living plant from the lifeless seed." },
        { q: "What else does He split, in 6:96?", a: "The daybreak", wrong: ["The clouds", "The rivers", "The trees"], why: "Faliqul-isbah." }
      ]
    },
    {
      slug: "stars-guide",
      title: "Stars to guide you",
      line: "Allah set the stars to guide travelers on land and sea.",
      facts: ["Nujum: stars", "Three purposes"],
      quote: q6(97),
      source: ik(97, "Allah made the stars to guide travelers in the dark on land and sea. Some of the early scholars said stars were made for three things: to beautify the sky, to strike devils, and for directions.", "Indeed Allah made them as decorations for the heavens"),
      difficulty: 4,
      questions: [
        { q: "What do stars help with, in 6:97?", a: "Finding your way in the dark", wrong: ["Telling the future", "Bringing luck", "Making rain"], why: "Li-tahtadu biha fi zulumatil-barri wal-bahr." },
        { q: "Stars can tell your future.", tf: false, why: "Whoever believes other than three things about them made a mistake." },
        { q: "Which is one of the three purposes of stars?", a: "Beauty for the sky", wrong: ["Choosing a spouse", "Naming babies", "Healing"], why: "Decorations for the heavens." }
      ]
    },
    {
      slug: "rain-gardens",
      title: "Rain and gardens",
      line: "From one rain come grain, dates, grapes, olives, pomegranates.",
      facts: ["Ma: water", "Zaytun: olive"],
      quote: q6(99),
      source: ik(99, "Allah sends rain as a blessing and provision for His servants. From it come green plants, clustered grain, low-hanging dates, and gardens of grapes, olives and pomegranates.", "as a blessing and provision for the servants"),
      difficulty: 3,
      questions: [
        { q: "What does Allah send to grow plants, in 6:99?", a: "Water from the sky", wrong: ["Sand", "Fire", "Wind only"], why: "Anzala minas-sama'i ma'a." },
        { q: "Which fruit is in 6:99?", a: "Pomegranates", wrong: ["Bananas", "Apples", "Mangoes"], why: "Waz-zaytuna war-rumman." },
        { q: "What should we look at, in 6:99?", a: "Fruits as they ripen", wrong: ["Gold coins", "Our faces", "The ground only"], why: "Unzuru ila thamarihi idha athmara wa yan'ih." }
      ]
    },
    {
      slug: "badi",
      title: "Al-Badi, the Originator",
      line: "Allah made heaven and earth with no example; He has no child.",
      facts: ["Badi: Originator", "No wife, no child"],
      quote: q6(101),
      source: ik(101, "Badi means He made them with no example before. A child comes from two spouses alike, and Allah has no equal, so how could He have a child?", "Meaning He originated, created, invented and brought them into existence without precedence"),
      difficulty: 4,
      questions: [
        { q: "What does Badi mean, in 6:101?", a: "Originator with no example", wrong: ["Copier", "Builder of houses", "Judge"], why: "He made them without precedence." },
        { q: "Allah has a child.", tf: false, why: "Anna yakunu lahu waladun wa lam takun lahu sahibah." },
        { q: "Which word shares a root with Badi?", a: "Bid'ah", wrong: ["Barakah", "Bayt", "Bahr"], why: "Something with no precedent." }
      ]
    },
    {
      slug: "see-lord",
      title: "Eyes cannot grasp Him",
      line: "No eye grasps Allah here; believers will see Him in Paradise.",
      facts: ["La tudrikuhu: cannot grasp Him", "Seen in the Hereafter"],
      quote: q6(103),
      source: hadith("bukhari", "554", "Jarir ibn Abdullah", "Sahih", "The Prophet ﷺ looked at the full moon and said: you will see your Lord as you see this moon, with no trouble. So do not miss the prayers before sunrise and before sunset.", "Certainly you will see your Lord as you see this moon"),
      difficulty: 5,
      questions: [
        { q: "Can eyes grasp Allah in this life, in 6:103?", a: "No", wrong: ["Yes, at night", "Yes, on mountains", "Yes, in dreams always"], why: "La tudrikuhul-absar." },
        { q: "How will believers see their Lord, per Bukhari 554?", a: "As they see the full moon", wrong: ["Never", "Only in books", "Through a cloud"], why: "You will see your Lord as you see this moon." },
        { q: "Which prayers did he urge after this, in Bukhari 554?", a: "Fajr and Asr", wrong: ["Dhuhr and Isha", "Only Jumu'ah", "Only Witr"], why: "Before sunrise and before sunset." }
      ]
    },
    {
      slug: "basair",
      title: "Proofs that open eyes",
      line: "Clear proofs came: seeing helps you, turning blind harms you.",
      facts: ["Basa'ir: clear proofs", "Hafiz: not a guard over you"],
      quote: q6(104),
      source: ik(104, "Basa'ir are the proofs in the Quran and the Message. Whoever sees helps himself, and whoever blinds himself only harms himself, for it is not the eyes that grow blind, but the hearts.", "it is not the eyes that grow blind, but it is the hearts which are in the breasts that grow blind"),
      difficulty: 4,
      questions: [
        { q: "Whom does a person help by seeing the truth, in 6:104?", a: "Himself", wrong: ["Only the Prophet ﷺ", "Only his king", "Nobody"], why: "Fa-man absara fa-li-nafsih." },
        { q: "Which go blind, per the ayah Ibn Kathir quotes?", a: "Hearts in the chests", wrong: ["Only eyes", "Only ears", "Stars"], why: "It is the hearts which grow blind, 22:46." },
        { q: "The Prophet ﷺ is a guard who forces people to believe.", tf: false, why: "Wa ma ana 'alaykum bi-hafiz." }
      ]
    },
    {
      slug: "only-convey",
      title: "Your job is to convey",
      line: "Follow revelation and turn from the mushrikin: you only convey.",
      facts: ["Ittabi: follow", "Balagh: conveying"],
      quote: q6(106),
      source: ik(106, "Follow what is revealed and bear people's harm with patience. The Messenger ﷺ is not a watcher over them or in charge of their affairs; his job is to convey.", "your only job is to convey"),
      difficulty: 4,
      questions: [
        { q: "What must the Prophet ﷺ follow, in 6:106?", a: "What is revealed from his Lord", wrong: ["The crowd", "Old customs", "The poets"], why: "Ittabi' ma uhiya ilayka min rabbik." },
        { q: "What is the Messenger's ﷺ only job, per Ibn Kathir?", a: "To convey", wrong: ["To force faith", "To count deeds", "To rule the world"], why: "Your only job is to convey." },
        { q: "Had Allah willed, they would not have done shirk.", tf: true, why: "Wa law sha'allahu ma ashraku, 6:107." }
      ]
    },
    {
      slug: "no-insult",
      title: "Do not insult their idols",
      line: "Do not insult what others worship, so they do not insult Allah.",
      facts: ["La tasubbu: do not insult", "Avoid the bigger harm"],
      quote: q6(108),
      source: ik(108, "Believers are forbidden to insult the idols of others, because it would lead to a bigger harm: they would insult Allah in return without knowledge.", "Insulting their deities will lead to a bigger evil than its benefit"),
      difficulty: 4,
      questions: [
        { q: "Why not insult what others worship, in 6:108?", a: "They may insult Allah back", wrong: ["Idols are right", "It is too hard", "No reason"], why: "Fa-yasubbullaha 'adwan bi-ghayri 'ilm." },
        { q: "What rule does Ibn Kathir draw from 6:108?", a: "Leave a benefit to avoid a bigger harm", wrong: ["Always argue loudly", "Never speak of faith", "Insult first"], why: "A bigger evil than its benefit." },
        { q: "Which Sahih hadith does Ibn Kathir link to 6:108?", a: "Cursing your own parents", wrong: ["The five keys", "The full moon", "The waking dua"], why: "Insult a man's father and he insults yours." }
      ]
    },
    {
      slug: "curse-parents",
      title: "Cursing your own parents",
      line: "Insult someone's parents and they insult yours: a great sin.",
      facts: ["Akbar al-kaba'ir", "Words come back"],
      quote: q6(108),
      source: hadith("bukhari", "5973", "Abdullah ibn Amr", "Sahih", "The Prophet ﷺ said it is one of the greatest sins to curse your parents. Asked how, he said: a man abuses another man's father, and that man abuses his father and his mother.", "It is one of the greatest sins that a man should curse his parents"),
      difficulty: 5,
      questions: [
        { q: "How does a man curse his own parents, per Bukhari 5973?", a: "By abusing another's parents", wrong: ["By moving away", "By being quiet", "By working late"], why: "The other man then abuses his parents." },
        { q: "Bukhari 5973 calls it...", a: "One of the greatest sins", wrong: ["A small slip", "A joke", "Allowed when angry"], why: "It is one of the greatest sins." },
        { q: "Who narrated Bukhari 5973?", a: "Abdullah ibn Amr", wrong: ["Abdullah ibn Mas'ud", "Jarir ibn Abdullah", "Hudhayfah"], why: "Narrated Abdullah bin Amr." }
      ]
    },
    {
      slug: "signs-with-allah",
      title: "Signs are with Allah",
      line: "They swore they would believe with a sign, but would not.",
      facts: ["Ayat: signs", "Oaths not kept"],
      quote: q6(109),
      source: ik(109, "The idol worshippers swore that if a miracle came they would believe. Allah decides whether to send signs, and even if one came, they would still not believe.", "The matter of sending signs is for Allah"),
      difficulty: 5,
      questions: [
        { q: "What did the deniers swear, in 6:109?", a: "They would believe with a sign", wrong: ["They would leave Makkah", "They would fast", "They would fight"], why: "La-in ja'athum ayatun la-yu'minunna biha." },
        { q: "With whom are the signs, in 6:109?", a: "With Allah", wrong: ["With the Prophet ﷺ to choose", "With the chiefs", "With the poets"], why: "Qul innamal-ayatu 'indallah." },
        { q: "Why were their hearts turned, in 6:110?", a: "They refused the first time", wrong: ["They were too young", "They never heard", "They were sick"], why: "Kama lam yu'minu bihi awwala marrah." }
      ]
    }
  ]
};

/** Ayahs 111 to 165: every prophet has enemies, the open chest, the ten commands, the one straight path, my prayer for Allah. */
const ANAM_THREE: DeepUnit = {
  key: "anam3",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-6",
  name: "Al-An'am, ayahs 111 to 165",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-An'am",
  lessons: [
    {
      slug: "every-prophet-enemies",
      title: "Every prophet had enemies",
      line: "Allah gave every prophet enemies from people and jinn.",
      facts: ["Aduww: enemy", "Zukhruf: fancy words"],
      quote: q6(112),
      source: hadith("bukhari", "3", "Aishah", "Sahih", "When revelation first came, Waraqah ibn Nawfal told the Messenger of Allah ﷺ that anyone who came with what he brought was treated with hostility.", "Anyone (man) who came with something similar to what you have brought was treated with hostility"),
      difficulty: 2,
      questions: [
        { q: "Whom did Allah give enemies, in 6:112?", a: "Every prophet", wrong: ["Only Musa", "Only kings", "No one"], why: "Wa kadhalika ja'alna li-kulli nabiyyin 'aduwwa." },
        { q: "Enemies of the prophets come from...", a: "People and jinn", wrong: ["Only animals", "Only angels", "Only one city"], why: "Shayatinal-insi wal-jinn." },
        { q: "Who told the Prophet ﷺ every messenger faced hostility, per Bukhari 3?", a: "Waraqah ibn Nawfal", wrong: ["Abu Jahl", "Heraclius", "Abu Sufyan"], why: "Waraqah, at the start of revelation." }
      ]
    },
    {
      slug: "truth-justice",
      title: "Words of truth and justice",
      line: "Allah's Word is complete: true in news, just in rulings.",
      facts: ["Sidq: truth", "Adl: justice"],
      quote: q6(115),
      source: ik(115, "Qatadah said: true in what He tells and just in what He rules. Everything Allah says is true, and all His commands are pure justice; no one can change His words.", "In truth concerning what He stated and in justice concerning what He decided"),
      difficulty: 3,
      questions: [
        { q: "How is Allah's Word completed, in 6:115?", a: "In truth and justice", wrong: ["In anger and haste", "In riddles", "Half finished"], why: "Sidqan wa 'adla." },
        { q: "Per Qatadah, Allah's Word is true in what?", a: "What He tells us", wrong: ["Only His rules", "Only stories", "Nothing"], why: "In truth concerning what He stated." },
        { q: "Someone can change the words of Allah.", tf: false, why: "La mubaddila li-kalimatih." }
      ]
    },
    {
      slug: "most-people",
      title: "Not just the majority",
      line: "Following most people on earth can lead away from Allah's path.",
      facts: ["Akthar: most", "Zann: guesswork"],
      quote: q6(116),
      source: ik(116, "Most people on earth are misguided. They follow guesses and wishful thinking. Truth is not decided by the crowd.", "Allah states that most of the people of the earth, are misguided"),
      difficulty: 3,
      questions: [
        { q: "What happens if you obey most people on earth, in 6:116?", a: "They mislead you", wrong: ["They guide you", "You get rich", "Nothing"], why: "Yudillaka 'an sabilillah." },
        { q: "What do they follow, in 6:116?", a: "Guesswork", wrong: ["Clear proof", "Revelation", "Science only"], why: "In yattabi'una illaz-zann." },
        { q: "Something is right just because most people do it.", tf: false, why: "6:116 warns against following the majority over truth." }
      ]
    },
    {
      slug: "sin-open-secret",
      title: "Leave sin, open and hidden",
      line: "Leave sins done openly and in secret; each gets its payback.",
      facts: ["Ithm: sin", "Zahir and batin"],
      quote: q6(120),
      source: hadith("muslim", "2553", "An-Nawwas ibn Sam'an", "Sahih", "An-Nawwas asked the Messenger of Allah ﷺ about virtue and sin. He said: virtue is good character, and sin is what bothers your heart and you would hate people to find out. Ibn Kathir quotes it on 6:120.", "vice is what rankles in your heart and that you disapprove that people should come to know of it"),
      difficulty: 3,
      questions: [
        { q: "Which sins should we leave, in 6:120?", a: "Open and secret ones", wrong: ["Only public ones", "Only big ones", "Only old ones"], why: "Wa dharu zahiral-ithmi wa batinah." },
        { q: "What is sin, per Muslim 2553?", a: "What troubles your heart", wrong: ["Whatever is fun", "Whatever is new", "Only crimes"], why: "Vice is what rankles in your heart." },
        { q: "What is virtue, per Muslim 2553?", a: "Good character", wrong: ["Wealth", "Fame", "Strength"], why: "Virtue is a kind disposition." }
      ]
    },
    {
      slug: "dead-given-light",
      title: "Dead, then given light",
      line: "A heart brought to life with light is unlike one in darkness.",
      facts: ["Mayt: dead", "Nur: the Quran, Islam"],
      quote: q6(122),
      source: ik(122, "The believer was dead in confusion, then Allah gave his heart life with faith and a light to walk by. Ibn Abbas said the light is the Quran; As-Suddi said Islam. Both meanings are correct.", "Both meanings are correct"),
      difficulty: 3,
      questions: [
        { q: "What was the believer before, in 6:122?", a: "Dead, then given life", wrong: ["A king", "An angel", "A rich man"], why: "Awa man kana maytan fa-ahyaynahu." },
        { q: "What is the light, per Ibn Abbas?", a: "The Quran", wrong: ["The sun", "A lamp", "Gold"], why: "As-Suddi said Islam; both are correct." },
        { q: "The one in darkness, in 6:122, can never come out by himself.", tf: true, why: "Laysa bi-kharijin minha." }
      ]
    },
    {
      slug: "who-gets-message",
      title: "Allah chooses His messenger",
      line: "Chiefs wanted revelation too, but Allah knows whom to choose.",
      facts: ["Risalah: the message", "Akabir: chiefs"],
      quote: q6(124),
      source: ik(124, "The chiefs said they would not believe until they got what the messengers got. Allah knows best which of His creatures is fit to carry His Message.", "He knows best with whom His Message should be given and which of His creatures are suitable for it"),
      difficulty: 3,
      questions: [
        { q: "What did the chiefs demand, in 6:124?", a: "Revelation like the messengers", wrong: ["More gold", "A new city", "Rain"], why: "Hatta nu'ta mithla ma utiya rusulullah." },
        { q: "Who knows best where to place His Message?", a: "Allah", wrong: ["The chiefs", "The richest", "A vote"], why: "Allahu a'lamu haythu yaj'alu risalatah." },
        { q: "In every town there were great ones who plotted, in 6:123.", tf: true, why: "But they plot only against themselves." }
      ]
    },
    {
      slug: "open-chest",
      title: "A chest opened to Islam",
      line: "Whom Allah guides, He opens his chest to Islam.",
      facts: ["Sharh as-sadr: opening the chest", "Like climbing the sky"],
      quote: q6(125),
      source: ik(125, "Allah makes Islam easy for the one He guides. For the other, faith feels as hard as climbing into the sky. Ibn Abbas said: He opens his heart to tawhid and faith.", "He makes Islam easy for him and strengthens his resolve to embrace it"),
      difficulty: 4,
      questions: [
        { q: "What does Allah open for one He guides, in 6:125?", a: "His chest to Islam", wrong: ["A treasure", "A door", "A road"], why: "Yashrah sadrahu lil-islam." },
        { q: "The closed chest feels like what, in 6:125?", a: "Climbing into the sky", wrong: ["Swimming", "Sleeping", "Running downhill"], why: "Ka-annama yassa''adu fis-sama." },
        { q: "Finding Islam easy and loved in your heart is a good sign.", tf: true, why: "Ibn Kathir: these are good signs." }
      ]
    },
    {
      slug: "abode-peace",
      title: "The Home of Peace",
      line: "For those who take heed: the Home of Peace with their Lord.",
      facts: ["Dar as-Salam: Paradise", "Allah their Wali"],
      quote: q6(127),
      source: ik(127, "Paradise is called the Home of Peace because its people are safe, having walked the straight path of the prophets. Allah will be their protector as a reward for their deeds.", "Allah described Paradise as"),
      difficulty: 3,
      questions: [
        { q: "What is Dar as-Salam, in 6:127?", a: "Paradise", wrong: ["Makkah", "A palace on earth", "The grave"], why: "Lahum darus-salami 'inda rabbihim." },
        { q: "Why is it called the Home of Peace, per Ibn Kathir?", a: "Its people are safe", wrong: ["It is quiet", "It is small", "It is empty"], why: "Its residents are safe." },
        { q: "Who will be their Wali, in 6:127?", a: "Allah", wrong: ["The angels only", "Their tribe", "Their wealth"], why: "Wa huwa waliyyuhum." }
      ]
    },
    {
      slug: "jinn-mislead",
      title: "Jinn who misled people",
      line: "On that Day the jinn who misled people must answer.",
      facts: ["Ma'shar al-jinn", "We used each other"],
      quote: q6(128),
      source: ik(128, "Allah will gather the jinn and the people who followed them. Al-Hasan said they used each other: the jinn gave orders and people obeyed.", "They benefited from each other when the Jinns merely commanded and mankind obeyed"),
      difficulty: 4,
      questions: [
        { q: "Whom does Allah address on that Day, in 6:128?", a: "The assembly of jinn", wrong: ["The angels", "The prophets", "The birds"], why: "Ya ma'sharal-jinn." },
        { q: "How did they benefit from each other, per Al-Hasan?", a: "Jinn commanded, people obeyed", wrong: ["They traded food", "They built houses", "They prayed together"], why: "Quoted in Ibn Kathir on 6:128." },
        { q: "Asking jinn for protection is a safe practice.", tf: false, why: "6:128 shows it led people astray." }
      ]
    },
    {
      slug: "messengers-came",
      title: "Did no messengers come?",
      line: "Jinn and people will admit: yes, messengers came to us.",
      facts: ["Rusul minkum", "No excuse left"],
      quote: q6(130),
      source: ik(131, "Allah sent messengers and books so no one could say he was punished without hearing the message. He never punishes a nation before sending a messenger.", "We did not punish any of the nations, except after sending Messengers to them"),
      difficulty: 4,
      questions: [
        { q: "What will jinn and people admit, in 6:130?", a: "Messengers came to them", wrong: ["No one warned them", "They were angels", "They were asleep"], why: "Shahidna 'ala anfusina." },
        { q: "Does Allah punish a nation before sending a messenger, per 6:131?", tf: false, why: "Not while its people were unaware." },
        { q: "What deceived them, in 6:130?", a: "The life of this world", wrong: ["The angels", "The Quran", "The prophets"], why: "Wa gharrat-humul-hayatud-dunya." }
      ]
    },
    {
      slug: "degrees",
      title: "Levels by deeds",
      line: "Everyone gets a level by what they did; Allah is never unaware.",
      facts: ["Darajat: levels", "Good for good"],
      quote: q6(132),
      source: ik(132, "At-Tabari said every person, obedient or not, has ranks by their deeds, given as reward: good for good and evil for evil.", "has grades and ranks according to their works"),
      difficulty: 4,
      questions: [
        { q: "What decides each person's level, in 6:132?", a: "What they did", wrong: ["Their family", "Their wealth", "Their looks"], why: "Wa li-kullin darajatun mimma 'amilu." },
        { q: "Allah is unaware of some of our deeds.", tf: false, why: "Wa ma rabbuka bi-ghafilin 'amma ya'malun." },
        { q: "Who explained these levels, per Ibn Kathir?", a: "At-Tabari", wrong: ["Heraclius", "Waraqah", "Abu Jahl"], why: "At-Tabari: grades and ranks by works." }
      ]
    },
    {
      slug: "al-ghani",
      title: "Al-Ghani, needing no one",
      line: "Allah needs no one; He could replace us with others.",
      facts: ["Al-Ghani: Free of need", "Dhur-rahmah: full of mercy"],
      quote: q6(133),
      source: ik(133, "Al-Ghani means Allah does not need His creatures in any way, while they need Him always. He is full of mercy, and if He willed, He could bring other people in our place.", "free from needing His creatures in any way or form, while they stand in need of Him in all situations"),
      difficulty: 4,
      questions: [
        { q: "What does Al-Ghani mean, in 6:133?", a: "Free of all need", wrong: ["The Strong", "The Near", "The Judge"], why: "Free from needing His creatures." },
        { q: "Who needs whom, per Ibn Kathir?", a: "We always need Allah", wrong: ["Allah needs us", "No one needs anyone", "Angels need us"], why: "They stand in need of Him in all situations." },
        { q: "Allah could replace a people with others, in 6:133.", tf: true, why: "Wa yastakhlif min ba'dikum ma yasha." }
      ]
    },
    {
      slug: "share-for-idols",
      title: "A share for the idols",
      line: "Pagans gave crops to Allah and idols, favoring the idols.",
      facts: ["Harth: crops", "An'am: livestock"],
      quote: q6(136),
      source: ik(136, "Ibn Abbas said: they gave part of their crops to Allah and part to the idol. Anything from Allah's share that fell into the idol's share stayed there, but never the other way.", "they would assign a part of it to Allah and another part to the idol"),
      difficulty: 4,
      questions: [
        { q: "What did the pagans divide, in 6:136?", a: "Crops and livestock", wrong: ["Gold and silver", "Houses", "Books"], why: "Mimma dhara'a minal-harthi wal-an'am." },
        { q: "Which share did they protect more, per Ibn Abbas?", a: "The idol's share", wrong: ["Allah's share", "The poor's share", "Neither"], why: "Anything that fell from Allah's share went to the idol." },
        { q: "How does Allah describe their judgment?", a: "Evil", wrong: ["Fair", "Wise", "Kind"], why: "Sa'a ma yahkumun." }
      ]
    },
    {
      slug: "made-up-rules",
      title: "Rules they made up",
      line: "They forbade animals and crops by their own claims, not Allah's.",
      facts: ["Hijr: forbidden by them", "Lying against Allah"],
      quote: q6(138),
      source: ik(138, "Qatadah said these bans were set by the devils, an extreme that did not come from Allah. Only Allah decides what is lawful and unlawful.", "a type of exaggeration and extremism that did not come from Allah"),
      difficulty: 4,
      questions: [
        { q: "Who made the hijr bans, per 6:138?", a: "The pagans, by their claim", wrong: ["Allah", "The prophets", "The angels"], why: "Bi-za'mihim: by their claim." },
        { q: "Per Qatadah, these bans were...", a: "Extremism not from Allah", wrong: ["Wise laws", "From the Tawrah", "From the Prophet ﷺ"], why: "Exaggeration and extremism that did not come from Allah." },
        { q: "Who decides what is halal and haram?", a: "Allah", wrong: ["Any chief", "Custom", "Each family"], why: "6:138: they lied against Allah." }
      ]
    },
    {
      slug: "harvest-due",
      title: "Give on harvest day",
      line: "Eat the fruit, give its due at harvest, and never waste.",
      facts: ["Haqq: its due", "Israf: waste"],
      quote: q6(141),
      source: ik(141, "Allah made gardens, dates, olives and pomegranates. Mujahid said: when the poor are present at harvest, give them some. And do not waste, for Allah does not love the wasteful.", "When the poor people are present (on the day of harvest), give them some of the produce"),
      difficulty: 4,
      questions: [
        { q: "When is the due of crops paid, in 6:141?", a: "On harvest day", wrong: ["Every Friday", "Never", "Ten years later"], why: "Wa atu haqqahu yawma hasadih." },
        { q: "Whom should you give at harvest, per Mujahid?", a: "The poor who are present", wrong: ["The rich", "Only family", "Nobody"], why: "Give them some of the produce." },
        { q: "Whom does Allah not love, in 6:141?", a: "The wasteful", wrong: ["The farmers", "The poor", "The travelers"], why: "Innahu la yuhibbul-musrifin." }
      ]
    },
    {
      slug: "eight-pairs",
      title: "Eight pairs of livestock",
      line: "Sheep, goats, camels, cattle: Allah made them all for our good.",
      facts: ["Thamaniyah azwaj", "Who forbade them?"],
      quote: q6(143),
      source: ik(143, "Allah made sheep, goats, camels and cattle, male and female, and forbade none of them. They were made for people's food, travel, work and milk.", "Allah did not prohibit any of these cattle or their offspring"),
      difficulty: 4,
      questions: [
        { q: "How many pairs of livestock are in 6:143-144?", a: "Eight", wrong: ["Four", "Six", "Ten"], why: "Thamaniyata azwaj." },
        { q: "Which animals are named?", a: "Sheep, goats, camels, cattle", wrong: ["Horses, donkeys, mules", "Lions and wolves", "Birds and fish"], why: "Ad-da'n, al-ma'z, al-ibil, al-baqar." },
        { q: "What does Allah ask the pagans, in 6:143?", a: "Bring knowledge if truthful", wrong: ["Bring gold", "Bring an army", "Stay silent"], why: "Nabbi'uni bi-'ilmin in kuntum sadiqin." }
      ]
    },
    {
      slug: "vast-mercy",
      title: "Vast mercy, real warning",
      line: "Allah's mercy is vast, yet His punishment reaches criminals.",
      facts: ["Rahmah wasi'ah", "Hope and fear together"],
      quote: q6(147),
      source: ik(147, "Allah invites them to His vast mercy and warns them of His punishment. He often joins hope with warning in the Quran.", "Allah often joins encouragement with threats"),
      difficulty: 4,
      questions: [
        { q: "How is Allah's mercy described, in 6:147?", a: "Vast", wrong: ["Small", "Only for some", "Limited"], why: "Rabbukum dhu rahmatin wasi'ah." },
        { q: "What does the Quran often join, per Ibn Kathir?", a: "Hope and warning", wrong: ["Stories and poems", "Laws and taxes", "Jokes and songs"], why: "Encouragement with threats." },
        { q: "Because mercy is vast, warnings do not matter.", tf: false, why: "His wrath is not turned back from criminals." }
      ]
    },
    {
      slug: "if-allah-willed",
      title: "No excuse in Allah's will",
      line: "They said: had Allah willed, we would not have done shirk.",
      facts: ["Hujjah balighah", "Following guesses"],
      quote: q6(148),
      source: ik(148, "The idol worshippers blamed Allah's will for their shirk. Allah answers: bring knowledge if you have it. You only follow doubts and wishful thinking.", "you only follow the Zann) doubts and wishful thinking"),
      difficulty: 5,
      questions: [
        { q: "What excuse did the mushrikin give, in 6:148?", a: "Had Allah willed, no shirk", wrong: ["We never heard", "We were children", "We were sick"], why: "Law sha'allahu ma ashrakna." },
        { q: "With whom is the perfect proof, in 6:149?", a: "With Allah", wrong: ["With the pagans", "With poets", "With no one"], why: "Qul fa-lillahil-hujjatul-balighah." },
        { q: "What do they follow, in 6:148?", a: "Guesswork", wrong: ["Clear proof", "A book", "A prophet"], why: "In tattabi'una illaz-zann." }
      ]
    },
    {
      slug: "ten-commands",
      title: "The ten commands",
      line: "6:151-153 lists what Allah forbade and commanded: a final will.",
      facts: ["Ta'alaw: come", "The Prophet's ﷺ will"],
      quote: q6(151),
      source: ik(151, "Ibn Mas'ud said: whoever wants to read the will of the Messenger of Allah ﷺ, sealed by him, let him read 6:151 to 6:153. The first command: join nothing with Allah.", "let him read these Ayat"),
      difficulty: 4,
      questions: [
        { q: "What is the first command of 6:151?", a: "Join nothing with Allah", wrong: ["Build a mosque", "Fast Mondays", "Travel for Hajj"], why: "Alla tushriku bihi shay'a." },
        { q: "What did Ibn Mas'ud call 6:151-153?", a: "The Prophet's ﷺ sealed will", wrong: ["A poem", "A story of Musa", "A trade law"], why: "The will and testament he sealed." },
        { q: "How does 6:151 begin?", a: "Come, I will recite", wrong: ["O you who believe", "By the sun", "Read in the name"], why: "Qul ta'alaw atlu." }
      ]
    },
    {
      slug: "kind-parents",
      title: "Be good to parents",
      line: "Right after tawhid, Allah commands kindness to parents.",
      facts: ["Ihsan: kindness", "Right after tawhid"],
      quote: q6(151),
      source: hadith("bukhari", "527", "Abdullah ibn Mas'ud", "Sahih", "Ibn Mas'ud asked the Prophet ﷺ which deed Allah loves most. He said: prayer at its time. Then? Being good and dutiful to your parents.", "To be good and dutiful to your parents"),
      difficulty: 4,
      questions: [
        { q: "What comes right after tawhid in 6:151?", a: "Kindness to parents", wrong: ["Trade rules", "Fasting", "Travel"], why: "Wa bil-walidayni ihsana." },
        { q: "Per Bukhari 527, which deed is dearest to Allah?", a: "Prayer at its time", wrong: ["Wealth", "Poetry", "Sleep"], why: "Then being good to parents." },
        { q: "Kindness to parents is ranked near the top of deeds.", tf: true, why: "Second in Bukhari 527." }
      ]
    },
    {
      slug: "provide-children",
      title: "Allah provides for children",
      line: "Do not fear poverty for your children: Allah provides for all.",
      facts: ["Imlaq: poverty", "Rizq is from Allah"],
      quote: q6(151),
      source: ik(151, "Some feared poverty because of their children. Allah says He provides for you and for them, so do not fear poverty because of feeding your children.", "do not fear poverty because of feeding your children"),
      difficulty: 4,
      questions: [
        { q: "Who provides for parents and children, in 6:151?", a: "Allah", wrong: ["Only the father", "The king", "Luck"], why: "Nahnu narzuqukum wa iyyahum." },
        { q: "Children are a reason to fear poverty.", tf: false, why: "Their provision is provided by Allah." },
        { q: "What else does 6:151 forbid?", a: "Shameful deeds, open or secret", wrong: ["Eating dates", "Travelling", "Buying land"], why: "Wa la taqrabul-fawahisha ma zahara minha wa ma batan." }
      ]
    },
    {
      slug: "orphan-measure",
      title: "Orphans and fair weight",
      line: "Guard the orphan's wealth, and give full, fair measure.",
      facts: ["Yatim: orphan", "Kayl and mizan"],
      quote: q6(152),
      source: ik(152, "Do not touch an orphan's wealth except to improve it, until they come of age. Give full measure and weight: it is a command to be just in giving and taking.", "is a command to establish justice while giving and taking"),
      difficulty: 4,
      questions: [
        { q: "How may you touch an orphan's wealth, in 6:152?", a: "Only to improve it", wrong: ["Any way you like", "To borrow it", "To spend it"], why: "Illa bil-lati hiya ahsan." },
        { q: "What does Allah not burden a soul with, in 6:152?", a: "More than it can bear", wrong: ["Any duty", "Prayer", "Kindness"], why: "La nukallifu nafsan illa wus'aha." },
        { q: "Full measure is a command for justice in trade.", tf: true, why: "Justice while giving and taking." }
      ]
    },
    {
      slug: "speak-justly",
      title: "Speak justly, even to family",
      line: "Speak justly even about relatives, and keep Allah's covenant.",
      facts: ["Fa'dilu: be just", "Ahd Allah: His covenant"],
      quote: q6(152),
      source: ik(152, "Allah commands justice in action and speech, with near relatives and distant ones, for everyone at all times, and to fulfill His covenant by obeying Him.", "Allah commands justice in action and statement, with both near relatives and distant relatives"),
      difficulty: 5,
      questions: [
        { q: "When must you speak justly, in 6:152?", a: "Even about a relative", wrong: ["Only with strangers", "Only in court", "Never"], why: "Wa idha qultum fa'dilu wa law kana dha qurba." },
        { q: "What should you fulfill, in 6:152?", a: "Allah's covenant", wrong: ["A tribe's custom", "A king's order", "A poet's dream"], why: "Wa bi-'ahdillahi awfu." },
        { q: "Justice is owed only to friends.", tf: false, why: "Justice for everyone at all times." }
      ]
    },
    {
      slug: "one-path",
      title: "One straight path",
      line: "This is My straight path: follow it, not the scattered ways.",
      facts: ["Sirat mustaqim", "Subul: other paths"],
      quote: q6(153),
      source: ik(153, "Ibn Abbas said Allah commanded the believers to stay together and forbade division and disputes, for those before were destroyed by division in religion.", "forbade them from causing divisions and disputes"),
      difficulty: 4,
      questions: [
        { q: "How many straight paths are in 6:153?", a: "One", wrong: ["Two", "Many", "None"], why: "Wa anna hadha sirati mustaqima." },
        { q: "What do the other paths do, in 6:153?", a: "Split you from His path", wrong: ["Lead to Paradise", "Make you rich", "Nothing"], why: "Fa-tafarraqa bikum 'an sabilih." },
        { q: "What destroyed earlier nations, per Ibn Abbas?", a: "Division in religion", wrong: ["Too much rain", "Too many books", "Unity"], why: "Destroyed because of divisions and disputes." }
      ]
    },
    {
      slug: "no-excuse-book",
      title: "No excuse left",
      line: "The Quran came, so no one can claim no Book reached them.",
      facts: ["Ta'ifatayn: two groups", "Bayyinah: clear proof"],
      quote: q6(157),
      source: ik(156, "Ibn Jarir said Allah sent the Quran so the Arabs could not say the Book came only to the Jews and Christians. Now a clear proof has come, so there is no excuse.", "This way, you will have no excuse"),
      difficulty: 5,
      questions: [
        { q: "Who are the two groups in 6:156, per Ibn Abbas?", a: "Jews and Christians", wrong: ["Persians and Romans", "Jinn and angels", "Makkah and Ta'if"], why: "To two sects before us." },
        { q: "What has come to them, in 6:157?", a: "Clear proof, guidance and mercy", wrong: ["Nothing new", "Only a warning", "A king"], why: "Fa-qad ja'akum bayyinatun min rabbikum." },
        { q: "Which book is praised with the Quran, in 6:154?", a: "The book of Musa", wrong: ["A book of poems", "A Persian book", "No book"], why: "Thumma atayna Musal-kitab." }
      ]
    },
    {
      slug: "sun-west",
      title: "When the sun rises in the west",
      line: "When the sun rises from the west, new faith will not help.",
      facts: ["A sign of the Hour", "Then it is too late"],
      quote: q6(158),
      source: hadith("bukhari", "4635", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: the Hour will not come until the sun rises from the west. When people see it, all will believe, but that is when belief will not help one who did not believe before.", "The Hour will not be established until the sun rises from the West"),
      difficulty: 5,
      questions: [
        { q: "Which sign closes the door of new faith, per Bukhari 4635?", a: "The sun rising from the west", wrong: ["A big storm", "A long winter", "A full moon"], why: "No good will it do a soul to believe then." },
        { q: "When does faith help, per 6:158?", a: "Before the signs come", wrong: ["Only after them", "Any time, always", "Only in old age"], why: "Lam takun amanat min qabl." },
        { q: "Who narrated Bukhari 4635?", a: "Abu Hurairah", wrong: ["Ibn Abbas", "Aishah", "Hudhayfah"], why: "Narrated Abu Hurairah." }
      ]
    },
    {
      slug: "one-religion",
      title: "Prophets share one religion",
      line: "Sects that split the religion are not of the Prophet ﷺ.",
      facts: ["Shiya': sects", "One religion for all prophets"],
      quote: q6(159),
      source: hadith("bukhari", "3443", "Abu Hurairah", "Sahih", "The Messenger of Allah ﷺ said: the prophets are brothers with different mothers, but their religion is one. Ibn Kathir quotes this on 6:159.", "The prophets are paternal brothers; their mothers are different, but their religion is one"),
      difficulty: 5,
      questions: [
        { q: "What does 6:159 say about those who split into sects?", a: "The Prophet ﷺ is not of them", wrong: ["They are the best", "They are prophets", "They are angels"], why: "Lasta minhum fi shay." },
        { q: "What do all prophets share, per Bukhari 3443?", a: "One religion", wrong: ["One mother", "One city", "One language"], why: "Their religion is one." },
        { q: "Whose affair are the sects, in 6:159?", a: "Allah's", wrong: ["The chiefs'", "The poets'", "Nobody's"], why: "Innama amruhum ilallah." }
      ]
    },
    {
      slug: "tenfold",
      title: "A good deed times ten",
      line: "A good deed counts ten times; a bad deed counts only once.",
      facts: ["Ashr amthaliha: ten like it", "Up to 700 and more"],
      quote: q6(160),
      source: hadith("bukhari", "6491", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: whoever intends a good deed and does not do it gets one full good deed. If he does it, ten to seven hundred times or more. A bad deed intended but left gets a good deed; if done, only one.", "from ten to seven hundred times to many more times"),
      difficulty: 5,
      questions: [
        { q: "How many times is a good deed counted, in 6:160?", a: "Ten times at least", wrong: ["Once", "Twice", "Never"], why: "Fa-lahu 'ashru amthaliha." },
        { q: "Per Bukhari 6491, a bad deed you meant but left is...", a: "Written as a good deed", wrong: ["Written as a sin", "Doubled", "Written twice"], why: "Allah will write a full good deed." },
        { q: "How high can a good deed go, per Bukhari 6491?", a: "700 times and more", wrong: ["Only ten", "Only twenty", "Only once"], why: "From ten to seven hundred times to many more." }
      ]
    },
    {
      slug: "my-prayer",
      title: "My prayer is for Allah",
      line: "My prayer, sacrifice, life and death are all for Allah.",
      facts: ["Salati wa nusuki", "Mahyaya wa mamati"],
      quote: q6(162),
      source: hadith("muslim", "771", "Ali ibn Abi Talib", "Sahih", "When the Messenger of Allah ﷺ stood for prayer at night he said: I turn my face to the Originator of the heavens and earth... my prayer, my sacrifice, my living and my dying are for Allah, the Lord of the worlds.", "Verily my prayer, my sacrifice, my living and my dying are for Allah, the Lord of the worlds"),
      difficulty: 5,
      questions: [
        { q: "What is for Allah, in 6:162?", a: "Prayer, sacrifice, life, death", wrong: ["Only prayer", "Only charity", "Only Ramadan"], why: "Inna salati wa nusuki wa mahyaya wa mamati lillah." },
        { q: "When did the Prophet ﷺ say 6:162, per Muslim 771?", a: "Opening his prayer", wrong: ["At the market", "In battle", "Before sleep only"], why: "When he got up for prayer." },
        { q: "Whose religion is the straight path, in 6:161?", a: "Ibrahim's, hanif", wrong: ["The pagans'", "The Romans'", "Any religion"], why: "Millata Ibrahima hanifa." }
      ]
    },
    {
      slug: "own-burden",
      title: "Each carries his own load",
      line: "No soul carries another's sins; each answers for its own.",
      facts: ["Wizr: burden", "Allah is perfectly just"],
      quote: q6(164),
      source: ik(164, "On the Day of Resurrection every soul is repaid for its own deeds, good for good and evil for evil. No one carries another's burden, which shows Allah's perfect justice.", "No person shall carry the burden of another person"),
      difficulty: 5,
      questions: [
        { q: "Who carries a soul's sins, in 6:164?", a: "Only that soul", wrong: ["Its parents", "Its children", "Its friends"], why: "Wa la taziru waziratun wizra ukhra." },
        { q: "What is the Prophet ﷺ told to ask, in 6:164?", a: "Shall I seek a lord besides Allah?", wrong: ["Shall I build a tower?", "Shall I leave Makkah?", "Shall I write poems?"], why: "A-ghayrallahi abghi rabba." },
        { q: "6:164 teaches trust in Allah, as 6:162 teaches worship of Him alone.", tf: true, why: "Ibn Kathir: the two are often mentioned together." }
      ]
    },
    {
      slug: "successors-tested",
      title: "Successors, put to the test",
      line: "Allah made us successors on earth, ranked, to test us.",
      facts: ["Khala'if: successors", "Darajat: ranks"],
      quote: q6(165),
      source: hadith("muslim", "2742", "Abu Sa'id al-Khudri", "Sahih", "The Messenger of Allah ﷺ said: the world is sweet and green, and Allah is placing you in it as successors to see how you act.", "Allah is going to install you as vicegerent in it in order to see how you act"),
      difficulty: 5,
      questions: [
        { q: "What did Allah make us, in 6:165?", a: "Successors on the earth", wrong: ["Angels", "Owners forever", "Visitors only"], why: "Ja'alakum khala'ifal-ard." },
        { q: "Why are some raised above others, in 6:165?", a: "To test us", wrong: ["By chance", "Because some are loved more", "No reason"], why: "Li-yabluwakum fi ma atakum." },
        { q: "How does Al-An'am end?", a: "Swift in punishment, forgiving, merciful", wrong: ["With a story of Musa", "With a dua for rain", "With a list of foods"], why: "Inna rabbaka sari'ul-'iqab, wa innahu la-ghafurun rahim." }
      ]
    }
  ]
};

export const ANAM_UNITS: readonly DeepUnit[] = [ANAM_ONE, ANAM_TWO, ANAM_THREE];
