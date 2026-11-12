import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: sunnahs of the night prayer, from Sahih al-Bukhari, Jami at-Tirmidhi and Sunan Abi Dawud.
// Waking the household one night, sleeping early and rising late, reciting sitting in old age, making up a missed
// night portion before Zuhr, Abu Bakr's and Umar's voices, and reciting quietly or aloud. Every card is one sahih
// hadith with its number, narrator and grade, and its exact English words to highlight. None of these hadith is
// taught anywhere else in the app.

const NIGHT: DeepUnit = {
  key: "prayer-night-sunnahs",
  topicId: "prayer",
  branchId: "prayer-night-sunnahs",
  branch: { title: "Sunnahs of the night prayer", description: "Waking the household, sleeping early and rising late, sitting in old age, a missed portion, a middle voice, and reciting quietly or aloud." },
  name: "sunnahs of the night prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "wake-the-sleepers",
      title: "Wake the sleepers",
      line: "One night he ﷺ asked for his sleeping wives to be woken.",
      facts: ["Told by Umm Salamah", "Subhan Allah, he ﷺ said when he woke", "Trials and treasures came down that night"],
      source: hadith("bukhari", "1126", "Umm Salamah", "Sahih", "Umm Salamah said: one night the Prophet ﷺ woke up and said: Subhan Allah! How many trials Allah has sent down tonight, and how many treasures have been opened! Go and wake the sleeping women of these rooms to pray. Perhaps one well dressed in this world will be bare in the Hereafter.", "Go and wake the sleeping lady occupants of these dwellings up"),
      difficulty: 1,
      questions: [
        { q: "Whom did he ﷺ want woken that night?", a: "The sleeping women of the rooms", wrong: ["The traders in the market", "The guards at the gate", "The travelers outside"], why: "Go and wake the sleeping lady occupants of these dwellings up, he ﷺ said." },
        { q: "What came down that night, he ﷺ said?", a: "Trials and treasures", wrong: ["Snow and wind", "Stars and stones", "Food and drink"], why: "How many afflictions Allah has revealed tonight, and how many treasures, he ﷺ said." },
        { q: "He ﷺ had the sleepers of his home woken to pray.", tf: true, why: "Go and wake the sleeping women of these rooms to pray, he ﷺ said." }
      ]
    },
    {
      slug: "sleep-early-rise-late",
      title: "Sleep early, rise to pray",
      line: "He ﷺ slept early and rose in the last part of the night.",
      facts: ["Told by Aishah", "Al-Aswad asked her about his ﷺ night prayer", "After praying he ﷺ went back to bed"],
      source: hadith("bukhari", "1146", "Aishah", "Sahih", "Al-Aswad said: I asked Aishah about the night prayer of the Prophet ﷺ. She said: he used to sleep early in the night, rise in its last part to pray, and then go back to his bed. When the muadhdhin called the adhan, he would get up, wash or make wudu, and go out to pray.", "He used to sleep early at night, and get up in its last part to pray"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ do after praying in the night, Aishah said?", a: "He went back to his bed", wrong: ["He walked to the market", "He sat until noon", "He rode out of town"], why: "Then he would return to his bed, Aishah told Al-Aswad." },
        { q: "When did he ﷺ get up for the dawn prayer, Aishah said?", a: "When he heard the adhan", wrong: ["When the sun rose", "When a bell rang", "When a drum beat"], why: "When the muadhdhin called the adhan, he would get up, Aishah said." },
        { q: "He ﷺ slept in the early part of the night.", tf: true, why: "He used to sleep early at night, and get up in its last part to pray, Aishah said." }
      ]
    },
    {
      slug: "sitting-then-standing",
      title: "Sitting, then standing",
      line: "When old, he ﷺ recited sitting, then stood for the last ayahs.",
      facts: ["Told by Aishah", "Only in old age did he ﷺ recite sitting", "He stood for the last thirty or forty ayahs"],
      source: hadith("bukhari", "1148", "Aishah", "Sahih", "Aishah said: I never saw the Prophet ﷺ recite in the night prayer while sitting until he grew old. Then he would recite sitting, and when thirty or forty ayahs of the surah were left, he would stand, recite them, and then bow.", "when thirty or forty verses remained from the Sura, he would get up and recite them and then bow"),
      difficulty: 2,
      questions: [
        { q: "When the last ayahs were left, what did he ﷺ do?", a: "He stood up and recited them", wrong: ["He recited them sitting", "He bowed at once", "He began a new surah"], why: "When thirty or forty verses remained, he would get up and recite them and then bow." },
        { q: "How many ayahs were left when he ﷺ stood up?", a: "Thirty or forty", wrong: ["One or two", "Seven or eight", "Over a hundred"], why: "When thirty or forty verses remained from the surah, he would get up, Aishah said." },
        { q: "In old age he ﷺ recited some of the night prayer sitting.", tf: true, why: "He recited sitting when he became old, and stood for the last ayahs, Aishah said." }
      ]
    },
    {
      slug: "missed-at-night",
      title: "Missed at night",
      line: "Slept through your night portion? Recite it before Zuhr.",
      facts: ["Told by Umar ibn al-Khattab", "Your portion: the Quran you recite at night", "Between Fajr and Zuhr it still counts"],
      source: hadith("tirmidhi", "581", "Umar ibn al-Khattab", "Sahih (Al-Albani)", "Umar ibn al-Khattab said: the Messenger of Allah ﷺ said: whoever sleeps and misses his portion of the night, or some of it, and recites it between the Fajr prayer and the Zuhr prayer, it is written for him as if he had recited it in the night.", "then he recited it between the Fajr prayer and the Zuhr prayer, it is written for him as if he had recited it in the night"),
      difficulty: 1,
      questions: [
        { q: "When can you make up a missed night portion, he ﷺ said?", a: "Between Fajr and Zuhr", wrong: ["Between Asr and Maghrib", "Only on a Friday", "Only in Ramadan"], why: "Then he recited it between the Fajr prayer and the Zuhr prayer, he ﷺ said." },
        { q: "How is it written for him, he ﷺ said?", a: "As if he recited it at night", wrong: ["As half a reward", "As a missed deed", "As nothing at all"], why: "It is written for him as if he had recited it in the night, he ﷺ said." },
        { q: "If you sleep through your night portion, its reward is lost for good.", tf: false, why: "No. Recited between Fajr and Zuhr, it is written as if recited at night, he ﷺ said." }
      ]
    },
    {
      slug: "a-middle-voice",
      title: "A little higher, a little lower",
      line: "He ﷺ asked Abu Bakr and Umar for a middle voice at night.",
      facts: ["Told by Abu Qatadah", "Abu Bakr: the One I call on hears me", "Umar: I wake the sleepy and drive Shaytan away"],
      source: hadith("abudawud", "1329", "Abu Qatadah", "Sahih (Al-Albani)", "Abu Qatadah said: the Prophet ﷺ went out at night and found Abu Bakr praying in a low voice, and passed Umar praying in a loud voice. When they came to him, he asked them. Abu Bakr said: I let the One I am speaking to hear me. Umar said: I wake the sleepy and drive away Shaytan. He ﷺ said: Abu Bakr, raise your voice a little. And to Umar: lower your voice a little.", "Raise your voice a little, AbuBakr, and he said to Umar: Lower your voice a little"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ tell Abu Bakr about his voice?", a: "Raise it a little", wrong: ["Keep it silent", "Raise it very loud", "Keep it the same"], why: "Raise your voice a little, Abu Bakr, he ﷺ said." },
        { q: "Why did Umar pray in a loud voice?", a: "To wake the sleepy and drive Shaytan away", wrong: ["To call the traders to work", "To teach the children a poem", "To warn of a coming storm"], why: "Awakening the drowsy and driving away the Devil, Umar told him ﷺ." },
        { q: "Abu Bakr prayed at night in a low voice.", tf: true, why: "He found Abu Bakr praying in a low voice, Abu Qatadah said." }
      ]
    },
    {
      slug: "loud-or-quiet",
      title: "Loud or quiet",
      line: "At night he ﷺ recited sometimes quietly, sometimes aloud.",
      facts: ["Told by Aishah", "Abdullah ibn Abi Qais asked her", "Allah made the matter wide for us"],
      source: hadith("tirmidhi", "449", "Aishah", "Sahih (Al-Albani)", "Abdullah ibn Abi Qais said: I asked Aishah how the Prophet ﷺ recited at night, quietly or aloud. She said: he did both. Sometimes he recited quietly and sometimes aloud. I said: praise be to Allah, who made the matter wide.", "Sometimes he was silent with his recitation and sometimes it was audible"),
      difficulty: 1,
      questions: [
        { q: "How did he ﷺ recite at night, Aishah said?", a: "Sometimes quietly, sometimes aloud", wrong: ["Always in a whisper", "Always very loudly", "Only in his heart"], why: "Sometimes he was silent with his recitation and sometimes it was audible, Aishah said." },
        { q: "What did Abdullah ibn Abi Qais thank Allah for?", a: "Making the matter wide", wrong: ["Giving him a horse", "Sending down rain", "A safe journey home"], why: "All praise is due to Allah, the One who made the matter broad, he said." },
        { q: "He ﷺ sometimes recited aloud in his night prayer.", tf: true, why: "Sometimes he was silent with his recitation and sometimes it was audible, Aishah said." }
      ]
    }
  ]
};

export const PRAYER_NIGHT_SUNNAH_UNITS: readonly DeepUnit[] = [NIGHT];
