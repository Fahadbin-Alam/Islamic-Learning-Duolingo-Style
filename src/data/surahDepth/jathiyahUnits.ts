import type { LessonSource } from "../../types";
import { hadith, quranQuote, type DeepUnit } from "../deepKit";

// Surah Jathiyah ayah by ayah, the way the surahs before it are taught: every ayah or small group of ayahs gets a lesson,
// explained as Tafsir Ibn Kathir explains it (the abridged English on quran.com), with a sahih hadith where one explains
// the ayah. Each source opens at the highlighted words that say the lesson's point.

/** Tafsir Ibn Kathir on Jathiyah 45:ayah, on quran.com, opened at `highlight` (words copied from that page). */
function ik(ayah: number, summary: string, highlight: string): LessonSource {
  return {
    id: `deep_ibn_kathir_45_${ayah}`,
    site: "Quran.com",
    category: "tafsir",
    title: `Tafsir Ibn Kathir on Jathiyah 45:${ayah}`,
    url: `https://quran.com/45:${ayah}/tafsirs/en-tafisr-ibn-kathir`,
    reference: `Tafsir Ibn Kathir 45:${ayah}`,
    from: "Tafsir Ibn Kathir (abridged English), on Quran.com",
    grade: "Tafsir",
    summary,
    highlight
  };
}

const q45 = (ayah: number) => quranQuote(45, ayah);

/** Ayahs 1 to 20: signs in creation, the sinful liar, all things made of service, and a clear way to follow. */
const JATHIYAH_ONE: DeepUnit = {
  key: "jathiyah1",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-45",
  name: "Al-Jathiyah, ayahs 1 to 20",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jathiyah",
  lessons: [
    {
      slug: "ha-mim-opens-jathiyah",
      title: "Ha Mim opens Al-Jathiyah",
      line: "Al-Jathiyah opens with Ha Mim, like the six surahs before it.",
      facts: ["Al-Jathiyah means The Kneeling", "Named after 45:28"],
      quote: q45(1),
      source: ik(1, "Ibn Kathir lists the opening: Ha Mim, then the Book sent down from Allah, the Almighty, the All-Wise.", "The revelation of the Book is from Allah, the Almighty, the All-Wise"),
      difficulty: 1,
      questions: [
        { q: "Which letters open Al-Jathiyah, in 45:1?", a: "Ha Mim", wrong: ["Alif Lam Mim", "Ta Ha", "Qaf"], why: "The surah opens: Ha Mim." },
        { q: "What does Al-Jathiyah mean?", a: "The Kneeling", wrong: ["The Smoke", "The Sand Dunes", "The Gold"], why: "Each nation will be seen kneeling, in 45:28." },
        { tf: true, q: "Al-Jathiyah comes right after Ad-Dukhan.", why: "Al-Jathiyah is surah 45, after Ad-Dukhan, surah 44." }
      ]
    },
    {
      slug: "the-book-from-the-almighty",
      title: "The Book from the Almighty",
      line: "The Book is sent down from Allah, the Almighty, the All-Wise.",
      facts: ["Al-Aziz: the Almighty", "Al-Hakim: the All-Wise"],
      quote: q45(2),
      source: ik(2, "Ibn Kathir lists the ayah: the revelation of the Book is from Allah, the Almighty, the All-Wise.", "The revelation of the Book is from Allah, the Almighty, the All-Wise"),
      difficulty: 1,
      questions: [
        { q: "From whom is the Book sent down, in 45:2?", a: "Allah, the Almighty, the All-Wise", wrong: ["A poet", "A king", "The angels on their own"], why: "The revelation of the Book is from Allah, the Almighty, the All-Wise." },
        { q: "Which two Names end 45:2?", a: "The Almighty, the All-Wise", wrong: ["The Most Kind, the Near", "The First, the Last", "The Hearing, the Seeing"], why: "From Allah, the Almighty, the All-Wise." },
        { tf: true, q: "Ad-Dukhan, Az-Zukhruf and Al-Jathiyah all begin by praising the Book.", why: "Each opens with Ha Mim and then speaks of the Book." }
      ]
    },
    {
      slug: "signs-in-heavens-and-earth",
      title: "Signs in sky and earth",
      line: "The heavens and the earth are full of signs for believers.",
      facts: ["Look at the sky and the land", "Each part points to the Maker"],
      quote: q45(3),
      source: ik(3, "Ibn Kathir says Allah directs His servants to think about His favors and His great power, shown by creating the heavens and the earth.", "Allah directs His servants to contemplate His favors and gifts"),
      difficulty: 1,
      questions: [
        { q: "Where are signs for believers, in 45:3?", a: "In the heavens and the earth", wrong: ["Only in books", "Only in dreams", "Nowhere"], why: "Verily, in the heavens and the earth are signs for the believers." },
        { q: "What does Allah direct His servants to do?", a: "Think about His favors", wrong: ["Forget the sky", "Stop asking", "Only sleep"], why: "Allah directs His servants to contemplate His favors and gifts." },
        { tf: false, q: "The signs in 45:3 are meant for nobody in particular.", why: "They are signs for the believers." }
      ]
    },
    {
      slug: "signs-in-your-own-creation",
      title: "Signs in your own creation",
      line: "Your own creation and every animal are signs from Allah.",
      facts: ["Look at yourself", "Angels, jinn, people, birds, sea creatures"],
      quote: q45(4),
      source: ik(4, "Ibn Kathir lists the many creatures Allah made: angels, jinn, humans, animals, birds, insects and kinds of sea creatures.", "There are the angels, Jinns, humans, animals, birds, beasts"),
      difficulty: 2,
      questions: [
        { q: "Which signs are named in 45:4?", a: "Your creation and moving creatures", wrong: ["Gold and silver", "Old palaces", "Famous kings"], why: "And in your creation, and what He spread of moving creatures are signs." },
        { q: "For whom are these signs, in 45:4?", a: "People who have faith with certainty", wrong: ["People who doubt", "Only scholars", "Only angels"], why: "Signs for people who have faith with certainty." },
        { q: "Which of these does Ibn Kathir list among creatures?", a: "Sea creatures", wrong: ["Robots", "Dragons", "Statues"], why: "Various kinds of sea creatures." }
      ]
    },
    {
      slug: "night-day-rain-and-wind",
      title: "Night, day, rain and wind",
      line: "Night, day, rain and turning winds are signs to understand.",
      facts: ["Rain is called provision", "Winds blow from every side"],
      quote: q45(5),
      source: ik(5, "Ibn Kathir says Allah calls rain provision because it brings out all kinds of provision, and the winds turn north and south, east and west.", "because it is the resource that produces various provisions"),
      difficulty: 2,
      questions: [
        { q: "Why is rain called provision, per Ibn Kathir?", a: "It brings out many kinds of provision", wrong: ["It is sold in shops", "It falls on Fridays", "It is salty"], why: "Because it is the resource that produces various provisions." },
        { q: "What does rain do to the earth, in 45:5?", a: "Revives it after its death", wrong: ["Burns it", "Hides it", "Moves it"], why: "And revives therewith the earth after its death." },
        { tf: true, q: "Some winds bring rain and some help plants pollinate.", why: "Some winds bring rain, some cause pollination." }
      ]
    },
    {
      slug: "believe-know-understand",
      title: "Believe, be certain, understand",
      line: "The ayahs climb: believers, the certain, then the wise.",
      facts: ["Each stage is higher", "Like 2:164 in Al-Baqarah"],
      quote: q45(5),
      source: ik(5, "Ibn Kathir says the ayahs move from believers, to those certain in faith, to those who understand, climbing from one honored stage to a higher one.", "thus ascending from one honorable stage to what is more honorable and higher in grade"),
      difficulty: 3,
      questions: [
        { q: "Which group comes first, in 45:3?", a: "The believers", wrong: ["Those who understand", "The scholars", "The angels"], why: "Signs for the believers, then those with certainty, then those who understand." },
        { q: "What does the order of the three groups show?", a: "A climb to higher stages", wrong: ["Random order", "Going down", "Three separate surahs"], why: "Ascending from one honorable stage to what is more honorable." },
        { q: "Which Al-Baqarah ayah is similar, per Ibn Kathir?", a: "2:164", wrong: ["2:255", "2:286", "2:1"], why: "These Ayat are similar to an Ayah in Surat Al-Baqarah, 2:164." }
      ]
    },
    {
      slug: "which-speech-after-allah",
      title: "Which speech after this?",
      line: "If they reject Allah's ayahs, what speech will they believe?",
      facts: ["The ayahs are truth from the Truth", "Nothing greater can come"],
      quote: q45(6),
      source: ik(6, "Ibn Kathir says these ayahs contain the truth from Allah, so if people reject them, what speech after them will they believe in?", "what speech after Allah and His Ayat will they then believe in"),
      difficulty: 2,
      questions: [
        { q: "How are Allah's ayahs recited, in 45:6?", a: "With truth", wrong: ["With doubt", "With jokes", "In secret"], why: "Which We recite to you with truth." },
        { q: "What does 45:6 ask the deniers?", a: "Which speech will they believe after this?", wrong: ["Which city they live in", "Which food they like", "How old they are"], why: "Then in which speech after Allah and His Ayat will they believe?" },
        { tf: true, q: "The ayahs of Allah refer to the Quran with its proofs.", why: "These are the Ayat of Allah, in reference to the Quran with the proofs." }
      ]
    },
    {
      slug: "woe-to-every-sinful-liar",
      title: "Woe to the sinful liar",
      line: "Woe to every sinful liar who hears the ayahs and turns away.",
      facts: ["He acts as if he heard nothing", "Pride blocks the truth"],
      quote: q45(7),
      source: ik(7, "Ibn Kathir describes him: one who lies in his speech, swears often, and disbelieves in Allah's ayahs.", "who lies in his speech, often swears"),
      difficulty: 2,
      questions: [
        { q: "Who is warned in 45:7?", a: "Every sinful liar", wrong: ["Every traveler", "Every farmer", "Every child"], why: "Woe to every sinful liar." },
        { q: "How does Ibn Kathir describe him?", a: "Lies in speech and swears often", wrong: ["Speaks little and truly", "Helps the poor", "Prays at night"], why: "Who lies in his speech, often swears." },
        { tf: true, q: "Lying and swearing a lot are warned against in 45:7.", why: "Woe to every sinful liar, who lies in his speech and often swears." }
      ]
    },
    {
      slug: "as-if-he-heard-nothing",
      title: "As if he heard nothing",
      line: "He hears the ayahs, then goes on proudly as if deaf.",
      facts: ["Hearing is not the same as heeding", "Pride keeps him stuck"],
      quote: q45(8),
      source: ik(8, "Ibn Kathir says he persists in his denial and pride, as if he did not hear the ayahs being recited to him.", "as if he did not hear them being recited to him"),
      difficulty: 2,
      questions: [
        { q: "What does the man do after hearing, in 45:8?", a: "Persists with pride", wrong: ["Thanks Allah", "Asks to learn more", "Cries and repents"], why: "Yet persists with pride as if he heard them not." },
        { q: "How does he act, in 45:8?", a: "As if he heard them not", wrong: ["As if he loved them", "As if he wrote them", "As if he taught them"], why: "As if he heard them not." },
        { tf: false, q: "Simply hearing the Quran is enough, even if we ignore it.", why: "The man in 45:8 heard the ayahs, yet is warned because he ignored them with pride." }
      ]
    },
    {
      slug: "do-not-mock-the-quran",
      title: "Never mock the ayahs",
      line: "Whoever learns an ayah and turns it into a joke is warned.",
      facts: ["Respect the Quran always", "Jokes about ayahs are serious"],
      quote: q45(9),
      source: ik(9, "Ibn Kathir says if he learns anything of the Quran, he takes it as a subject of jest, and so earns a humiliating punishment.", "takes it as the subject of jest and ridicule"),
      difficulty: 2,
      questions: [
        { q: "What does the man do with the ayahs, in 45:9?", a: "Makes them a jest", wrong: ["Memorizes them", "Teaches them", "Writes them nicely"], why: "When he learns something of Our Ayat, he makes them a jest." },
        { q: "What kind of punishment is named in 45:9?", a: "A humiliating one", wrong: ["A light one", "None at all", "Only a fine"], why: "For such there will be a humiliating torment." },
        { q: "What did the Prophet ﷺ forbid, per Ibn Kathir on 45:9?", a: "Taking the Quran to enemy lands", wrong: ["Reading the Quran at night", "Teaching children", "Writing the Quran"], why: "He prohibited traveling with the Quran to enemy lands for fear it might be desecrated." }
      ]
    },
    {
      slug: "wealth-will-not-help",
      title: "Wealth will not help",
      line: "On that Day, wealth and false friends will not help at all.",
      facts: ["Money cannot buy safety", "False gods cannot save"],
      quote: q45(10),
      source: ik(10, "Ibn Kathir says their wealth and children will not avail them, nor will the false gods they worshipped.", "their wealth and children will not avail them"),
      difficulty: 2,
      questions: [
        { q: "What will not profit the deniers, in 45:10?", a: "What they earned", wrong: ["Their good deeds", "Their prayers", "Their kindness"], why: "That which they have earned will be of no profit to them." },
        { q: "Who else cannot help them, in 45:10?", a: "Friends they took besides Allah", wrong: ["The angels of mercy", "Their good deeds", "The believers"], why: "Nor those whom they have taken as protective friends besides Allah." },
        { tf: true, q: "Ibn Kathir says their wealth and children will not help them.", why: "Their wealth and children will not avail them." }
      ]
    },
    {
      slug: "this-is-guidance",
      title: "This is guidance",
      line: "Allah calls the Quran guidance, a light for whoever follows it.",
      facts: ["Huda means guidance", "Rejecting it is a great loss"],
      quote: q45(11),
      source: ik(11, "Ibn Kathir says this is guidance, in reference to the Quran.", "This is Huda"),
      difficulty: 1,
      questions: [
        { q: "What is called guidance, in 45:11?", a: "The Quran", wrong: ["Poetry", "Old stories", "The stars"], why: "This is Huda (guidance), in reference to the Quran." },
        { q: "What does Huda mean?", a: "Guidance", wrong: ["Gold", "Smoke", "Night"], why: "This is Huda (guidance)." },
        { tf: false, q: "Rejecting the ayahs of Allah carries no warning.", why: "Those who disbelieve in the Ayat of their Lord, for them there is a painful torment." }
      ]
    },
    {
      slug: "the-sea-made-of-service",
      title: "The sea made to serve you",
      line: "Allah made the sea carry ships, so we trade and give thanks.",
      facts: ["Ships sail by His command", "Goods come from far lands"],
      quote: q45(12),
      source: ik(12, "Ibn Kathir says Allah ordered the sea to carry ships, so people trade and thank Him for provisions brought from far away.", "Who ordered the sea to carry ships"),
      difficulty: 2,
      questions: [
        { q: "What did Allah subject to us, in 45:12?", a: "The sea", wrong: ["The sun only", "The angels", "The jinn"], why: "Allah, it is He Who has subjected to you the sea." },
        { q: "Why do ships sail, per 45:12?", a: "By His command", wrong: ["By luck", "By magic", "By themselves"], why: "That ships may sail through it by His command." },
        { q: "What should the blessing lead us to, in 45:12?", a: "Being thankful", wrong: ["Being proud", "Being lazy", "Being greedy"], why: "And that you may be thankful." }
      ]
    },
    {
      slug: "everything-is-from-him",
      title: "Everything is from Him",
      line: "All in the heavens and earth serves us, all from Him.",
      facts: ["Stars, mountains, seas, rivers", "Allah alone gives every gift"],
      quote: q45(13),
      source: ik(13, "Ibn Kathir names the stars, mountains, seas and rivers, and says they are all from Allah alone, with no partner in giving any of it.", "Alone without partners in giving any of it"),
      difficulty: 2,
      questions: [
        { q: "What has Allah subjected to us, in 45:13?", a: "All in the heavens and the earth", wrong: ["Only the sea", "Only animals", "Nothing"], why: "And has subjected to you all that is in the heavens and all that is on the earth." },
        { q: "Who shares in giving these gifts?", a: "No one, only Allah", wrong: ["The stars", "Kings", "Idols"], why: "Alone without partners in giving any of it." },
        { q: "Who in 45:13 sees these signs?", a: "A people who think deeply", wrong: ["People who sleep", "People who boast", "Nobody"], why: "Verily, in it are signs for a people who think deeply." }
      ]
    },
    {
      slug: "forgive-those-who-hurt",
      title: "Patience with those who hurt",
      line: "Early Muslims were told to forgive and bear the harm patiently.",
      facts: ["Patience can soften hearts", "Allah repays everyone fairly"],
      quote: q45(14),
      source: ik(14, "Ibn Kathir says the believers were told to forgive the disbelievers and endure their harm, so their hearts might turn to Islam.", "let the believers forgive the disbelievers and endure the harm"),
      difficulty: 3,
      questions: [
        { q: "What were believers told to do, in 45:14?", a: "Forgive and be patient", wrong: ["Shout back", "Give up Islam", "Hide forever"], why: "Let the believers forgive the disbelievers and endure the harm." },
        { q: "Why were early Muslims told to be patient?", a: "So hearts may incline to Islam", wrong: ["To look weak", "To win money", "For no reason"], why: "So that their hearts may incline towards Islam." },
        { q: "What does Mujahid say about not hoping for the Days of Allah?", a: "They do not appreciate His favors", wrong: ["They count the days", "They fast every day", "They love the night"], why: "They do not appreciate Allah's favors." }
      ]
    },
    {
      slug: "good-deeds-are-for-yourself",
      title: "Your deeds come back to you",
      line: "Every good deed helps the doer, and every wrong harms the doer.",
      facts: ["We all return to Allah", "Good for good, evil for evil"],
      quote: q45(15),
      source: ik(15, "Ibn Kathir says we will all return to Allah, our deeds shown before Him, and He repays good for good and evil for evil.", "good for good and evil for evil"),
      difficulty: 2,
      questions: [
        { q: "Whom does a good deed help, in 45:15?", a: "The one who does it", wrong: ["Only others", "No one", "Only the angels"], why: "Whosoever does a good deed, it is for himself." },
        { q: "To whom will we all return, in 45:15?", a: "Our Lord", wrong: ["Our homes", "Our kings", "Nowhere"], why: "Then to your Lord you will be made to return." },
        { tf: true, q: "Allah repays good for good and evil for evil.", why: "He will recompense you for your deeds, good for good and evil for evil." }
      ]
    },
    {
      slug: "you-cannot-harm-allah",
      title: "Our deeds do not touch Allah",
      line: "Our deeds cannot harm or benefit Allah. They are for us.",
      facts: ["A hadith qudsi", "Allah needs nothing from us"],
      quote: q45(15),
      source: hadith("muslim", "2577", "Abu Dharr", "Sahih", "Allah says: O My servants, you will never be able to harm Me or benefit Me.", "you will not attain harming Me so as to harm Me"),
      difficulty: 3,
      questions: [
        { q: "Can our deeds harm Allah, per Muslim 2577?", a: "No, never", wrong: ["Yes, a little", "Only big sins", "Only on Fridays"], why: "You will not attain harming Me so as to harm Me." },
        { q: "What does Allah say He has forbidden for Himself?", a: "Oppression", wrong: ["Mercy", "Forgiveness", "Giving"], why: "O My servants, I have forbidden oppression for Myself." },
        { q: "Who narrates Muslim 2577?", a: "Abu Dharr", wrong: ["Abu Bakr", "Anas", "Aishah"], why: "Abu Dharr reported it from the Messenger of Allah ﷺ." }
      ]
    },
    {
      slug: "gifts-to-the-children-of-israel",
      title: "Gifts to the Children of Israel",
      line: "Allah gave the Children of Israel scripture, rule and prophets.",
      facts: ["Preferred over nations of their time", "Given good food and drink"],
      quote: q45(16),
      source: ik(16, "Ibn Kathir says Allah gave them Divine Books, sent Messengers to them and gave them kingship, preferring them over the nations of their time.", "revealing the Divine Books to them, sending the Messengers to them and granting them kingship"),
      difficulty: 2,
      questions: [
        { q: "What did the Children of Israel receive, in 45:16?", a: "Scripture, rule and prophethood", wrong: ["Only gold", "Nothing", "Only land"], why: "We gave the Children of Israel the Scripture, the understanding and the prophethood." },
        { q: "Above whom were they preferred, per Ibn Kathir?", a: "The nations of their time", wrong: ["All people forever", "The angels", "The prophets"], why: "And preferred them above the nations of their time." },
        { tf: true, q: "Ibn Kathir says the good things include foods and drinks.", why: "And provided them with good things, such as foods and drinks." }
      ]
    },
    {
      slug: "they-split-out-of-envy",
      title: "They split out of envy",
      line: "They split only after knowledge came, because of envy.",
      facts: ["Knowledge came first", "Allah will judge between them"],
      quote: q45(17),
      source: ik(17, "Ibn Kathir says the proof was established against them, yet they differed after it came, out of transgression against each other.", "they differed among themselves after the proof came to them"),
      difficulty: 3,
      questions: [
        { q: "When did they differ, in 45:17?", a: "After knowledge came to them", wrong: ["Before any prophet", "Only in Makkah", "Never"], why: "They differed not until after the knowledge came to them." },
        { q: "Why did they differ, in 45:17?", a: "Envy among themselves", wrong: ["Lack of proof", "Hunger", "Bad weather"], why: "Through envy among themselves." },
        { q: "Who will judge between them, in 45:17?", a: "Your Lord, on the Day of Resurrection", wrong: ["A king", "Their own scholars", "No one"], why: "Your Lord will judge between them on the Day of Resurrection." }
      ]
    },
    {
      slug: "follow-the-clear-way",
      title: "Follow the clear way",
      line: "Allah set us on a clear Shariah. Follow it, not empty desires.",
      facts: ["Shariah means a clear way", "Do not copy those who stray"],
      quote: q45(18),
      source: ik(18, "Ibn Kathir says the ayah warns this Ummah not to take the path of earlier peoples, and to follow what was revealed.", "It warns them not to take the path the Jews took nor adopt their ways"),
      difficulty: 3,
      questions: [
        { q: "What did Allah put us on, in 45:18?", a: "A way of commandment", wrong: ["A dark road", "A guessing game", "A long holiday"], why: "Then We have put you on a legal way of commandment. So follow you that." },
        { q: "Whose desires must we not follow, in 45:18?", a: "Those who know not", wrong: ["The prophets", "The righteous", "Our parents in good"], why: "And follow not the desires of those who know not." },
        { tf: true, q: "Ibn Kathir says 45:18 carries a warning for this Ummah too.", why: "This Ayah contains a warning to the Muslim Ummah as well." }
      ]
    },
    {
      slug: "do-not-copy-blindly",
      title: "Do not copy blindly",
      line: "The Prophet ﷺ warned we would copy earlier nations step by step.",
      facts: ["Even into a lizard hole", "Be careful whom you follow"],
      quote: q45(18),
      source: hadith("bukhari", "7320", "Abu Sa'id al-Khudri", "Sahih", "The Prophet ﷺ said you will follow the ways of nations before you, span by span, even into a lizard's hole.", "You will follow the ways of those nations who were before you, span by span and cubit by cubit"),
      difficulty: 3,
      questions: [
        { q: "How closely would people copy, per Bukhari 7320?", a: "Span by span, cubit by cubit", wrong: ["Not at all", "Only a little", "Only in food"], why: "Span by span and cubit by cubit." },
        { q: "Into what hole would they follow?", a: "A lizard's hole", wrong: ["A well", "A cave", "A tunnel of gold"], why: "Even if they entered a hole of a mastigure, you would follow them." },
        { q: "Which ayah warns us to follow our own clear way?", a: "45:18", wrong: ["45:1", "45:37", "45:5"], why: "We have put you on a way of commandment, so follow that." }
      ]
    },
    {
      slug: "allah-protects-the-mindful",
      title: "Allah protects the mindful",
      line: "Wrongdoers back each other, but Allah protects those with Taqwa.",
      facts: ["False friends bring loss", "Allah brings out to the light"],
      quote: q45(19),
      source: ik(19, "Ibn Kathir says Allah is the Protector of the pious and brings them out of darkness into light.", "He will deliver them from the darkness to the light"),
      difficulty: 2,
      questions: [
        { q: "Who is the Protector of the mindful, in 45:19?", a: "Allah", wrong: ["Wealth", "Armies", "Friends of wrongdoers"], why: "But Allah is the Protector of those who have Taqwa." },
        { q: "Where does Allah bring the pious, per Ibn Kathir?", a: "From darkness to light", wrong: ["From light to darkness", "Into confusion", "Nowhere"], why: "He will deliver them from the darkness to the light." },
        { tf: true, q: "Wrongdoers being friends to each other will not save them.", why: "All they will earn from their protecting friends is more loss." }
      ]
    },
    {
      slug: "clear-insight-for-mankind",
      title: "Clear insight for mankind",
      line: "The Quran is insight, guidance and mercy for the certain.",
      facts: ["Basa'ir: clear insights", "Mercy for those who are certain"],
      quote: q45(20),
      source: ik(20, "Ibn Kathir says this clear insight refers to the Quran.", "This is a clear insight and evidence for mankind"),
      difficulty: 2,
      questions: [
        { q: "What does 45:20 call the Quran?", a: "Clear insight, guidance and mercy", wrong: ["A storybook", "A riddle", "A song"], why: "This is a clear insight and evidence for mankind, and a guidance and a mercy." },
        { q: "For whom is the Quran a mercy, in 45:20?", a: "People with certain faith", wrong: ["People who mock", "No one", "Only kings"], why: "A guidance and a mercy for people who have faith with certainty." },
        { tf: true, q: "The Quran is evidence for all mankind.", why: "This is a clear insight and evidence for mankind." }
      ]
    }
  ]
};

/** Ayahs 21 to 37: good and evil are not equal, those who blame time, the kneeling nations, and the Book that speaks with truth. */
const JATHIYAH_TWO: DeepUnit = {
  key: "jathiyah2",
  topicId: "quran_tafseer",
  branchId: "quran-surah-meaning-45",
  name: "Al-Jathiyah, ayahs 21 to 37",
  kind: "skill",
  lessonType: "surah",
  surahName: "Al-Jathiyah",
  lessons: [
    {
      slug: "good-and-evil-not-equal",
      title: "Good and evil are not equal",
      line: "Allah will never treat good people like evil people.",
      facts: ["Not equal in life or after death", "Allah is perfectly just"],
      quote: q45(21),
      source: ik(21, "Ibn Kathir says the believers and the disbelievers are never equal, and thinking otherwise is a bad thought about Allah's justice.", "the believers and the disbelievers are never equal"),
      difficulty: 2,
      questions: [
        { q: "What do some evildoers wrongly think, in 45:21?", a: "They will be treated like believers", wrong: ["They will be punished more", "They are angels", "They never die"], why: "Or do those who earn evil deeds think that We shall hold them equal with those who believe?" },
        { q: "How does Allah describe that thought?", a: "Worst is the judgement they make", wrong: ["A wise idea", "A fair guess", "A kind hope"], why: "Worst is the judgement that they make." },
        { q: "Which ayah says the people of Fire and Paradise are not equal?", a: "59:20", wrong: ["2:255", "1:1", "112:1"], why: "Not equal are the dwellers of the Fire and the dwellers of the Paradise (59:20)." }
      ]
    },
    {
      slug: "tamim-prays-all-night",
      title: "One ayah all night",
      line: "Tamim ad-Dari once prayed all night repeating only 45:21.",
      facts: ["Reflect deeply on one ayah", "Quality over speed"],
      quote: q45(21),
      source: ik(21, "Ibn Kathir reports that Tamim ad-Dari stood in voluntary prayer through the night until morning, reciting only this ayah.", "stood in voluntary prayer through the night until the morning only reciting this Ayah"),
      difficulty: 3,
      questions: [
        { q: "What did Tamim ad-Dari repeat all night?", a: "45:21", wrong: ["Al-Fatihah only", "Ayat al-Kursi", "An-Nas"], why: "Only reciting this Ayah: Or do those who earn evil deeds think." },
        { q: "Until when did he pray?", a: "Until the morning", wrong: ["Until midnight", "Until noon", "One minute"], why: "Through the night until the morning." },
        { tf: true, q: "Reading one ayah slowly with reflection is a good deed.", why: "Tamim ad-Dari stood all night reflecting on one ayah." }
      ]
    },
    {
      slug: "created-with-truth",
      title: "Created with truth",
      line: "Allah made heaven and earth with truth, so each gets its due.",
      facts: ["With truth means with justice", "No one will be wronged"],
      quote: q45(22),
      source: ik(22, "Ibn Kathir explains that created with truth means in justice.", "with truth,) meaning, in justice"),
      difficulty: 2,
      questions: [
        { q: "How were heaven and earth created, in 45:22?", a: "With truth", wrong: ["By chance", "For play", "Without purpose"], why: "And Allah has created the heavens and the earth with truth." },
        { q: "What does with truth mean, per Ibn Kathir?", a: "In justice", wrong: ["In haste", "In secret", "In anger"], why: "With truth, meaning, in justice." },
        { tf: false, q: "Some people will be wronged on the Day of Judgement.", why: "And they will not be wronged." }
      ]
    },
    {
      slug: "desire-as-a-god",
      title: "Desire as a god",
      line: "Some obey their desire in everything, as if it were their god.",
      facts: ["Desire is a bad master", "Follow Allah, not every wish"],
      quote: q45(23),
      source: ik(23, "Ibn Kathir says such a person does whatever his desire shows as good and leaves whatever it shows as bad.", "whatever his lust portrays as good he implements it"),
      difficulty: 3,
      questions: [
        { q: "Whom does 45:23 describe?", a: "One who takes his desire as his god", wrong: ["One who prays", "One who fasts", "One who reads"], why: "Have you seen him who takes his own lust as his god?" },
        { q: "How does that person decide, per Ibn Kathir?", a: "Whatever his desire likes", wrong: ["What Allah commands", "What scholars teach", "What is fair"], why: "Whatever his lust portrays as good he implements it." },
        { q: "What happens to his hearing and heart, in 45:23?", a: "They are sealed", wrong: ["They grow stronger", "They stay open", "Nothing"], why: "And sealed his hearing and his heart, and put a cover on his sight." }
      ]
    },
    {
      slug: "who-guides-after-allah",
      title: "Who guides after Allah?",
      line: "If one rejects guidance after knowing, who will guide him then?",
      facts: ["Astray after knowledge came", "Ask Allah to keep you guided"],
      quote: q45(23),
      source: ik(23, "Ibn Kathir says one meaning is that Allah left him astray after knowledge reached him and the proof was set before him.", "Allah led this person astray after knowledge reached him"),
      difficulty: 3,
      questions: [
        { q: "When was he left astray, per Ibn Kathir?", a: "After knowledge reached him", wrong: ["Before he was born", "Without any proof", "In his sleep"], why: "After knowledge reached him and the proof was established." },
        { q: "What does 45:23 ask at the end?", a: "Will you not then remember?", wrong: ["Will you not then eat?", "Will you not travel?", "Will you not sleep?"], why: "Who then will guide him after Allah? Will you not then remember?" },
        { tf: true, q: "With his heart sealed, he does not see the proof that would guide him.", why: "Sees not the evidence with which he can be enlightened." }
      ]
    },
    {
      slug: "only-this-life-they-say",
      title: "Only this life, they say",
      line: "Deniers say there is only this life and time alone destroys us.",
      facts: ["They deny the Resurrection", "They have no knowledge, only guesses"],
      quote: q45(24),
      source: ik(24, "Ibn Kathir says they claim there is only this life, some die and others are born, without Resurrection or Judgement, and they only guess.", "they speculate and guess"),
      difficulty: 2,
      questions: [
        { q: "What do the deniers say destroys them, in 45:24?", a: "Time", wrong: ["Allah", "Angels", "Hunger"], why: "Nothing destroys us except Ad-Dahr (time)." },
        { q: "What do they have, according to 45:24?", a: "Only guesses", wrong: ["Firm knowledge", "Clear proof", "A book"], why: "They have no knowledge of it, they only presume." },
        { tf: true, q: "They denied the Resurrection and the Judgement.", why: "Without Resurrection or Judgement." }
      ]
    },
    {
      slug: "do-not-curse-time",
      title: "Do not curse time",
      line: "Allah turns night and day, so do not curse time.",
      facts: ["A hadith qudsi", "Say Alhamdulillah instead"],
      quote: q45(24),
      source: hadith("bukhari", "4826", "Abu Hurairah", "Sahih", "Allah said: the son of Adam hurts Me when he abuses Time, though I am Time; in My Hands are all things, and I turn the night and day.", "in My Hands are all things, and I cause the revolution of day and night"),
      difficulty: 3,
      questions: [
        { q: "What should we not abuse, per Bukhari 4826?", a: "Time", wrong: ["The rain", "Our food", "The wind only"], why: "The son of Adam hurts me for he abuses Time." },
        { q: "Who turns night and day, per Bukhari 4826?", a: "Allah", wrong: ["The sun alone", "Luck", "The stars"], why: "I cause the revolution of day and night." },
        { tf: false, q: "Ibn Kathir says Ad-Dahr is one of Allah's Names.", why: "He says Ibn Hazm made an error when he included Ad-Dahr among Allah's Names." }
      ]
    },
    {
      slug: "why-cursing-time-is-wrong",
      title: "Why cursing time is wrong",
      line: "Arabs blamed time for disasters, but Allah decrees all.",
      facts: ["Explained by Ash-Shafi'i", "Blame is misplaced"],
      quote: q45(24),
      source: ik(24, "Ibn Kathir reports Ash-Shafi'i and others: the Arabs blamed calamities on time, yet Allah causes all things to happen.", "Surely, it is Allah the Exalted and Most Honored Who causes these"),
      difficulty: 3,
      questions: [
        { q: "What did Arabs say in Jahiliyyah when disaster struck?", a: "Woe to time", wrong: ["Praise be to Allah", "We are patient", "Nothing"], why: "The Arabs used to say, Woe to Ad-Dahr (time)!" },
        { q: "Who truly causes events, per Ibn Kathir?", a: "Allah", wrong: ["Time", "The stars", "Luck"], why: "It is Allah the Exalted and Most Honored Who causes these things to happen." },
        { q: "Which Imam explained the hadith this way?", a: "Ash-Shafi'i", wrong: ["Ibn Hazm", "Al-Bukhari only", "No one"], why: "Ash-Shafi'i, Abu Ubaydah and several other Imams of Tafsir explained it." }
      ]
    },
    {
      slug: "bring-back-our-fathers",
      title: "Bring back our fathers",
      line: "Deniers said: bring our dead fathers back, if you are truthful.",
      facts: ["Their only argument", "The Resurrection is on its Day, not now"],
      quote: q45(25),
      source: ik(25, "Ibn Kathir says when the proof was made plain, their only reply was: bring them back to life, if what you say is true.", "bring them back to life, if what you say is true"),
      difficulty: 2,
      questions: [
        { q: "What did deniers demand, in 45:25?", a: "Bring back our fathers", wrong: ["Bring us gold", "Bring us rain", "Bring us a king"], why: "Bring back our (dead) fathers, if you are truthful!" },
        { q: "When are the ayahs recited to them, what is their argument?", a: "Only that demand", wrong: ["A strong proof", "A long book", "Nothing at all"], why: "Their argument is no other than that they say: Bring back our fathers." },
        { tf: true, q: "The Resurrection happens on its Day, not when deniers demand it.", why: "When He resurrects you, it will be on and for the Day of Resurrection, not in this life." }
      ]
    },
    {
      slug: "he-gives-life-then-gathers",
      title: "He gives life, then gathers",
      line: "Allah gives life, causes death, then gathers all of us.",
      facts: ["He began creation", "Repeating it is easier"],
      quote: q45(26),
      source: ik(26, "Ibn Kathir says the One able to begin creation is able to repeat it, as 30:27 says it is easier for Him.", "He Who is able to initiate creation, is able to restart it"),
      difficulty: 2,
      questions: [
        { q: "What three things does Allah do, in 45:26?", a: "Gives life, causes death, gathers", wrong: ["Sleeps, wakes, eats", "Hides, shows, forgets", "Only gives life"], why: "Allah gives you life, then causes you to die, then He will assemble you." },
        { q: "Why can Allah repeat creation?", a: "He began it the first time", wrong: ["He learned how", "Angels help Him", "He cannot"], why: "He Who is able to initiate creation, is able to restart it." },
        { tf: true, q: "Most people do not know the Day is certain.", why: "But most of mankind know not." }
      ]
    },
    {
      slug: "the-losers-of-falsehood",
      title: "The followers of falsehood lose",
      line: "Allah owns all. On the Hour, followers of falsehood lose.",
      facts: ["Allah is King now and then", "Truth wins in the end"],
      quote: q45(27),
      source: ik(27, "Ibn Kathir says Allah is the King and Owner of the heavens and earth, the only Ruler in this life and the Hereafter.", "the Only Ruler over them in this life and the Hereafter"),
      difficulty: 2,
      questions: [
        { q: "To whom belongs the kingdom, in 45:27?", a: "Allah", wrong: ["Kings", "Rich people", "No one"], why: "And to Allah belongs the kingdom of the heavens and the earth." },
        { q: "Who loses on the Day of the Hour, in 45:27?", a: "The followers of falsehood", wrong: ["The patient", "The truthful", "The prayerful"], why: "On that Day the followers of falsehood shall lose." },
        { tf: true, q: "Allah is the Ruler in this life and the next.", why: "The Only Ruler over them in this life and the Hereafter." }
      ]
    },
    {
      slug: "every-nation-kneeling",
      title: "Every nation kneeling",
      line: "Each nation will kneel in awe, called to its record.",
      facts: ["Jathiyah means kneeling", "This ayah names the surah"],
      quote: q45(28),
      source: ik(28, "Ibn Kathir says they will be kneeling, fearful of the great events of that Day.", "kneeling, fearful of the tremendous calamity and events"),
      difficulty: 2,
      questions: [
        { q: "How will each nation be, in 45:28?", a: "Kneeling", wrong: ["Dancing", "Sleeping", "Running"], why: "And you will see each nation humbled to their knees (Jathiyah)." },
        { q: "To what is each nation called, in 45:28?", a: "Its record of deeds", wrong: ["A feast", "A market", "A race"], why: "Each nation will be called to its Record." },
        { q: "What will people be repaid for, in 45:28?", a: "What they used to do", wrong: ["What others did", "Their looks", "Their wealth"], why: "This Day you shall be recompensed for what you used to do." }
      ]
    },
    {
      slug: "the-record-speaks-with-truth",
      title: "The record speaks with truth",
      line: "The record speaks with truth, nothing added, nothing left out.",
      facts: ["Angels write our deeds", "Nothing small is missed"],
      quote: q45(29),
      source: ik(29, "Ibn Kathir says the record contains all your actions, without addition or deletion, and Allah ordered the scribe angels to write them.", "without addition or deletion"),
      difficulty: 2,
      questions: [
        { q: "How does the Record speak, in 45:29?", a: "With truth", wrong: ["With lies", "With jokes", "Not at all"], why: "This Our Record speaks about you with truth." },
        { q: "Who writes our deeds, per Ibn Kathir?", a: "The scribe angels", wrong: ["Our friends", "The jinn", "No one"], why: "We ordered Our scribe angels to record your deeds." },
        { tf: true, q: "Ibn Abbas said the records are compared and not a letter is changed.", why: "They will compare their records and find out that not a single letter was added or deleted." }
      ]
    },
    {
      slug: "how-good-deeds-are-written",
      title: "How good deeds are written",
      line: "A good intention earns reward; a good deed, ten or more.",
      facts: ["Up to 700 times and more", "A dropped bad idea earns good"],
      quote: q45(29),
      source: hadith("bukhari", "6491", "Abdullah ibn Abbas", "Sahih", "The Prophet ﷺ said Allah ordered good and bad deeds to be written: a good intention is written as a good deed, and a done good deed as ten to seven hundred or more.", "Allah ordered (the appointed angels over you) that the good and the bad deeds be written"),
      difficulty: 3,
      questions: [
        { q: "What is written for a good intention not done, per Bukhari 6491?", a: "A full good deed", wrong: ["Nothing", "A bad deed", "Half a deed"], why: "Then Allah will write for him a full good deed." },
        { q: "How much is a done good deed multiplied?", a: "Ten to seven hundred times or more", wrong: ["Only once", "Twice", "Never"], why: "From ten to seven hundred times to many more times." },
        { q: "What is written if one drops a bad intention?", a: "A full good deed", wrong: ["A bad deed", "Nothing at all", "Two bad deeds"], why: "If somebody intended to do a bad deed and he does not do it, then Allah will write a full good deed." }
      ]
    },
    {
      slug: "into-his-mercy",
      title: "Into His mercy",
      line: "Believers who do good enter Allah's mercy, the clear success.",
      facts: ["The mercy here is Paradise", "Faith in the heart, deeds in action"],
      quote: q45(30),
      source: ik(30, "Ibn Kathir says these are the ones whose hearts believed and whose limbs did good deeds, and the mercy they enter is Paradise.", "Those whose hearts believed and their limbs performed good deeds"),
      difficulty: 2,
      questions: [
        { q: "Where will believers who do good be admitted, in 45:30?", a: "Into His mercy", wrong: ["Into a palace on earth", "Into the sea", "Nowhere"], why: "Their Lord will admit them to His mercy." },
        { q: "What does 45:30 call that?", a: "The evident success", wrong: ["A small win", "A test", "A loss"], why: "That will be the evident success." },
        { q: "What is the mercy, per Ibn Kathir?", a: "Paradise", wrong: ["Rain", "Wealth", "Long life"], why: "Their Lord will admit them to His mercy, and that is Paradise." }
      ]
    },
    {
      slug: "you-are-my-mercy",
      title: "You are My mercy",
      line: "Allah said to Paradise: you are My mercy for whom I wish.",
      facts: ["Paradise is a mercy", "Allah wrongs no one"],
      quote: q45(30),
      source: hadith("bukhari", "4850", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah said to Paradise: you are My mercy which I bestow on whoever I wish of My servants.", "You are My Mercy which I bestow on whoever I wish of my servants"),
      difficulty: 2,
      questions: [
        { q: "What did Allah call Paradise, per Bukhari 4850?", a: "My mercy", wrong: ["My army", "My palace", "My garden of stone"], why: "You are My Mercy which I bestow on whoever I wish of my servants." },
        { q: "Who among people enters Paradise, per Bukhari 4850?", a: "The weak and the humble", wrong: ["Only the rich", "Only kings", "Only the strong"], why: "Why do only the weak and the humble among the people enter me?" },
        { tf: true, q: "Bukhari 4850 ends saying Allah wrongs none of His creation.", why: "And Allah will not wrong any of His created beings." }
      ]
    },
    {
      slug: "were-not-the-ayahs-recited",
      title: "Were not the ayahs recited?",
      line: "Deniers will be asked: were the ayahs not recited to you?",
      facts: ["They turned away in pride", "Each heard the message"],
      quote: q45(31),
      source: ik(31, "Ibn Kathir says they will be blamed because they did not follow the ayahs out of pride and turned away on hearing them.", "But you did not follow them out of pride and turned away upon hearing them"),
      difficulty: 2,
      questions: [
        { q: "What question is asked in 45:31?", a: "Were not Our ayahs recited to you?", wrong: ["Did you eat well?", "Where did you live?", "How rich were you?"], why: "Were not Our Ayat recited to you?" },
        { q: "Why did they not follow, per Ibn Kathir?", a: "Pride", wrong: ["They never heard", "They were asleep", "No one told them"], why: "You did not follow them out of pride." },
        { tf: true, q: "Pride can stop a person from following the truth.", why: "But you were proud, and you were a people who were criminals." }
      ]
    },
    {
      slug: "we-only-guess-they-said",
      title: "We only guess, they said",
      line: "Told the Hour is true, they said: we only guess.",
      facts: ["Doubt was their excuse", "Allah's promise is true"],
      quote: q45(32),
      source: ik(32, "Ibn Kathir says when the believers told them the Hour is true, they said they only remotely thought it might come.", "we only remotely think that it might come"),
      difficulty: 2,
      questions: [
        { q: "What were they told, in 45:32?", a: "Allah's promise is the truth", wrong: ["Life lasts forever", "There is no Day", "Wealth saves"], why: "Verily, Allah's promise is the truth." },
        { q: "What did they answer, in 45:32?", a: "We only guess", wrong: ["We are certain", "We believe", "We will prepare"], why: "We do not think it but conjecture." },
        { tf: false, q: "They said they were sure about the Hour.", why: "And we have no firm convincing belief therein." }
      ]
    },
    {
      slug: "deeds-show-themselves",
      title: "Deeds show themselves",
      line: "On that Day, the results of their deeds become clear.",
      facts: ["What they mocked surrounds them", "Every action has a result"],
      quote: q45(33),
      source: ik(33, "Ibn Kathir says the results of their evil deeds will become apparent to them, and surround them from all directions.", "the repercussion of their evil deeds will become apparent to them"),
      difficulty: 2,
      questions: [
        { q: "What will appear to them, in 45:33?", a: "The evil of what they did", wrong: ["Hidden gold", "A new chance", "Nothing"], why: "And the evil of what they did will appear to them." },
        { q: "From where will it surround them, per Ibn Kathir?", a: "All directions", wrong: ["Only the front", "Only above", "Nowhere"], why: "Will completely encircle them, from all directions." },
        { tf: true, q: "The very thing they mocked will surround them.", why: "That which they used to mock at will completely encircle them." }
      ]
    },
    {
      slug: "forgotten-as-they-forgot",
      title: "Forgotten as they forgot",
      line: "They forgot the meeting with Allah, so they are left forgotten.",
      facts: ["Prepare for the meeting", "Remember Allah, He remembers you"],
      quote: q45(34),
      source: ik(34, "Ibn Kathir says they did not work for that Day because they did not believe it would come.", "did not work for it because you did not believe in its coming"),
      difficulty: 3,
      questions: [
        { q: "What did they forget, in 45:34?", a: "The meeting of this Day", wrong: ["Their names", "Their homes", "Their food"], why: "As you forgot the meeting of this Day of yours." },
        { q: "Why did they not prepare, per Ibn Kathir?", a: "They did not believe it would come", wrong: ["They were too busy praying", "They were too young", "No one asked"], why: "Did not work for it because you did not believe in its coming." },
        { tf: true, q: "Nobody will help them on that Day.", why: "And there is none to help you." }
      ]
    },
    {
      slug: "did-you-think-you-would-meet-me",
      title: "Did you think you would meet Me?",
      line: "Allah will ask a man: did you think you would meet Us?",
      facts: ["He was given spouse, horses, camels", "Gifts should lead to thanks"],
      quote: q45(34),
      source: hadith("muslim", "2968", "Abu Hurairah", "Sahih", "The Prophet ﷺ said Allah will remind a servant of the honor, spouse, horses and camels He gave him, then ask: did you not think you would meet Us?", "Well, We forget you as you forgot Us"),
      difficulty: 3,
      questions: [
        { q: "What did Allah give the man, per Muslim 2968?", a: "Honor, a spouse, horses and camels", wrong: ["Nothing", "Only a sword", "Only a house"], why: "Did I not honour you and make you the chief and provide you the spouse and subdue for you horses, camels?" },
        { q: "What is he asked next?", a: "Did you think you would meet Us?", wrong: ["Were you rich?", "Were you tall?", "Did you travel?"], why: "Did you not think that you would meet Us?" },
        { q: "Which ayah matches Muslim 2968?", a: "45:34", wrong: ["45:1", "45:13", "45:5"], why: "This Day We will forget you as you forgot the meeting of this Day of yours." }
      ]
    },
    {
      slug: "fooled-by-this-world",
      title: "Fooled by this world",
      line: "They mocked the ayahs and let this world fool them.",
      facts: ["This world can distract", "No return for another chance"],
      quote: q45(35),
      source: ik(35, "Ibn Kathir says this life fooled them and they were drawn to it, so they became the losers.", "this life fooled you"),
      difficulty: 2,
      questions: [
        { q: "What deceived them, in 45:35?", a: "The life of the world", wrong: ["The Quran", "The prophets", "The angels"], why: "And the life of the world deceived you." },
        { q: "What did they do with Allah's ayahs, in 45:35?", a: "Mocked them", wrong: ["Memorized them", "Taught them", "Loved them"], why: "Because you took the revelations of Allah in mockery." },
        { tf: false, q: "They will be sent back to the world for another chance.", why: "Nor shall they be returned to the worldly life." }
      ]
    },
    {
      slug: "all-praise-to-the-lord",
      title: "All praise to the Lord",
      line: "All praise is for Allah, Lord of heaven, earth and all.",
      facts: ["He owns all that is in them", "The surah ends with praise"],
      quote: q45(36),
      source: ik(36, "Ibn Kathir says after mentioning His judgement, Allah says all praise is His, the Owner of the heavens and earth and all in them.", "He is their Owner and the Owner of all that is in and on them"),
      difficulty: 1,
      questions: [
        { q: "To whom is all praise due, in 45:36?", a: "Allah", wrong: ["Kings", "Poets", "Ourselves"], why: "So all praise is due to Allah." },
        { q: "Lord of what, in 45:36?", a: "The heavens, the earth and all that exists", wrong: ["Only Makkah", "Only the sea", "Only people"], why: "The Lord of the heavens and the Lord of the earth, and the Lord of all that exists." },
        { tf: true, q: "Al-Fatihah also opens with praise for the Lord of all that exists.", why: "Both say all praise is for Allah, the Lord of all that exists (1:2)." }
      ]
    },
    {
      slug: "his-is-the-majesty",
      title: "His is the majesty",
      line: "All majesty is Allah's, the Almighty, the All-Wise.",
      facts: ["Everything needs Him", "He needs nothing"],
      quote: q45(37),
      source: ik(37, "Ibn Kathir says everything and everyone is subservient to Allah and in complete need of Him.", "everything and everyone is subservient and in complete need of and dependent upon Him"),
      difficulty: 2,
      questions: [
        { q: "Whose is the majesty, in 45:37?", a: "Allah's", wrong: ["Kings'", "Armies'", "The stars'"], why: "And His is the majesty in the heavens and the earth." },
        { q: "Which two Names end the surah?", a: "Al-Aziz, Al-Hakim", wrong: ["Ar-Rahman, Ar-Rahim", "Al-Awwal, Al-Akhir", "As-Sami, Al-Basir"], why: "And He is Al-Aziz, Al-Hakim." },
        { tf: true, q: "The surah begins and ends with the Almighty, the All-Wise.", why: "45:2 and 45:37 both name Allah the Almighty, the All-Wise." }
      ]
    },
    {
      slug: "pride-belongs-to-allah",
      title: "Pride belongs to Allah",
      line: "Glory and majesty belong to Allah alone. So stay humble.",
      facts: ["A hadith qudsi", "Arrogance is a great danger"],
      quote: q45(37),
      source: hadith("muslim", "2620", "Abu Sa'id al-Khudri and Abu Hurairah", "Sahih", "Allah said: glory is His lower garment and majesty is His cloak, and whoever contends with Him in them will be punished.", "Glory is His lower garment and Majesty is His cloak"),
      difficulty: 3,
      questions: [
        { q: "What does Muslim 2620 call majesty?", a: "Allah's cloak", wrong: ["A king's crown", "A gift to all", "A bird"], why: "Majesty is His cloak." },
        { q: "What lesson does Muslim 2620 teach us?", a: "Stay humble", wrong: ["Show off", "Boast", "Look down on others"], why: "He who contends with Me in regard to them I shall torment him." },
        { q: "Which ayah does Ibn Kathir link Muslim 2620 with?", a: "45:37", wrong: ["45:1", "45:24", "45:12"], why: "And His is the majesty in the heavens and the earth." }
      ]
    }
  ]
};

export const JATHIYAH_UNITS: readonly DeepUnit[] = [JATHIYAH_ONE, JATHIYAH_TWO];
