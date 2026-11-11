import { hadith, type DeepUnit } from "./deepKit";

// One more Prayer unit: calm and focus in the salah, from Sahih al-Bukhari, Sunan Ibn Majah and Sunan an-Nasa'i.
// Eyes kept off the sky, resting first when drowsy, a back that settles in ruku' and sujud, Anas standing long after
// ruku' as he saw the Prophet ﷺ pray, the sound of his ﷺ weeping in prayer, and the Companions waiting for his
// sujud. Every card is one sahih hadith with its number, narrator and grade, and its exact English words to
// highlight. Points the schools differ on are left out, and none of these hadith is taught anywhere else in the app.

const CALM: DeepUnit = {
  key: "prayer-calm-and-focus",
  topicId: "prayer",
  branchId: "prayer-calm-and-focus",
  branch: { title: "Calm and focus in prayer", description: "Eyes off the sky, resting when drowsy, a settled back, a long calm standing, tears in prayer, and waiting for the sujud." },
  name: "calm and focus in prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "eyes-off-the-sky",
      title: "Eyes off the sky",
      line: "He ﷺ warned people not to look up at the sky in prayer.",
      facts: ["Told by Anas ibn Malik", "His words grew stern as he spoke", "They should stop, he ﷺ said"],
      source: hadith("bukhari", "750", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: the Prophet ﷺ said: what is wrong with people who look up at the sky in their prayer? His words grew stern, and he said: they must stop, or their eyesight will be taken away.", "What is wrong with those people who look towards the sky during the prayer"),
      difficulty: 1,
      questions: [
        { q: "Where did he ﷺ warn people not to look in prayer?", a: "Up at the sky", wrong: ["Down at the floor", "Toward the qiblah", "Straight ahead"], why: "What is wrong with those who look towards the sky during the prayer, he ﷺ said." },
        { q: "How did his ﷺ words sound as he warned them?", a: "Stern", wrong: ["Joking", "Like a whisper", "Like a song"], why: "His talk grew stern while delivering this speech, Anas said." },
        { q: "He ﷺ said their eyesight could be taken away.", tf: true, why: "They should stop, otherwise their eyesight would be taken away, he ﷺ said." }
      ]
    },
    {
      slug: "drowsy-in-prayer",
      title: "Too drowsy to pray",
      line: "If you feel drowsy while praying, sleep until it passes.",
      facts: ["Told by Aishah", "A drowsy person may not know what he asks", "He may ask for something bad by mistake"],
      source: hadith("bukhari", "212", "Aishah", "Sahih", "Aishah said: the Messenger of Allah ﷺ said: if one of you feels drowsy while praying, let him sleep until his sleepiness goes, for when he prays drowsy he does not know if he is asking forgiveness or saying something bad against himself.", "in praying while drowsy one does not know whether one is asking for forgiveness or for a bad thing for oneself"),
      difficulty: 1,
      questions: [
        { q: "What should a drowsy person do, he ﷺ said?", a: "Sleep until it passes", wrong: ["Pray much faster", "Keep praying anyway", "Pray twice as long"], why: "He should go to bed till his slumber is over, he ﷺ said." },
        { q: "Why is praying while drowsy a problem?", a: "He may not know what he asks", wrong: ["It makes the prayer short", "It wakes up the house", "It is too cold at night"], why: "One does not know whether one is asking for forgiveness or for a bad thing." },
        { q: "A drowsy person always knows what he is asking for.", tf: false, why: "No. Praying while drowsy, one does not know what one is asking for." }
      ]
    },
    {
      slug: "a-settled-back",
      title: "Let your back settle",
      line: "Let your back settle and rest in ruku' and sujud.",
      facts: ["Told by Ali ibn Shayban, of a delegation", "He ﷺ saw a man from the corner of his eye", "He ﷺ spoke after the prayer"],
      source: hadith("ibnmajah", "871", "Ali ibn Shayban", "Sahih (Al-Albani)", "Ali ibn Shayban came in a delegation, gave the pledge and prayed behind the Prophet ﷺ. He ﷺ glanced at a man who did not settle his back in ruku' and sujud, and after the prayer said: O Muslims, there is no prayer for one who does not settle his back when bowing and prostrating.", "there is no prayer for the one who does not settle his spine when bowing and prostrating"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ see the man doing wrong?", a: "Not settling his back", wrong: ["Praying too slowly", "Reciting too loudly", "Standing too far back"], why: "He was not settling his spine when he bowed and prostrated." },
        { q: "How did he ﷺ see the man during the prayer?", a: "From the corner of his eye", wrong: ["By turning fully around", "In a dream", "Someone told him"], why: "He glanced out of the corner of his eye at a man, Ali ibn Shayban said." },
        { q: "A prayer with rushed ruku' and sujud is still fine.", tf: false, why: "No. No prayer for one who does not settle his spine in ruku' and sujud, he ﷺ said." }
      ]
    },
    {
      slug: "a-long-calm-standing",
      title: "A long, calm standing",
      line: "Anas stood long after ruku', as he saw the Prophet ﷺ pray.",
      facts: ["Told by Thabit, from Anas", "Some thought he had forgotten", "He also sat long between the two sujud"],
      source: hadith("bukhari", "821", "Thabit, from Anas", "Sahih", "Thabit said: Anas said: I will not fail to show you the prayer as I saw the Prophet ﷺ lead us in it. Anas would stand after ruku' so long that one would say he had forgotten, and sit between the two sujud so long that one would say he had forgotten.", "He used to stand after the bowing for such a long time that one would think that he had forgotten"),
      difficulty: 2,
      questions: [
        { q: "What did people think when Anas stood so long after ruku'?", a: "That he had forgotten", wrong: ["That he was tired", "That he was ill", "That he was lost"], why: "One would think that he had forgotten the prostrations, Thabit said." },
        { q: "Where else did Anas pause for a long time?", a: "Between the two sujud", wrong: ["Before the first takbir", "After the salam", "At the masjid door"], why: "He used to sit in-between the prostrations so long, Thabit said." },
        { q: "Anas prayed the way he had seen the Prophet ﷺ pray.", tf: true, why: "I will make you offer the prayer as I have seen the Prophet ﷺ do it, Anas said." }
      ]
    },
    {
      slug: "tears-in-prayer",
      title: "Tears in his prayer",
      line: "He ﷺ wept in prayer; his chest sounded like boiling water.",
      facts: ["Told by Abdullah ibn ash-Shikhkhir", "His son Mutarrif passed it on", "The sound came from weeping"],
      source: hadith("nasai", "1214", "Abdullah ibn ash-Shikhkhir", "Sahih (Al-Albani)", "Mutarrif said his father said: I came to the Prophet ﷺ while he was praying, and there was a sound from his chest like the sound of water boiling, from his weeping.", "there was a sound coming from his chest like the sound of water boiling"),
      difficulty: 1,
      questions: [
        { q: "What did his ﷺ chest sound like as he prayed?", a: "Water boiling", wrong: ["Wind in the trees", "A beating drum", "Birds singing"], why: "A sound was coming from his chest like the sound of water boiling." },
        { q: "Why did that sound come from his ﷺ chest?", a: "He was weeping", wrong: ["He was out of breath", "He was reciting loudly", "He was coughing"], why: "Like the sound of water boiling, meaning he was weeping." },
        { q: "The Prophet ﷺ was moved to tears in his prayer.", tf: true, why: "A sound came from his chest like water boiling, meaning he was weeping." }
      ]
    },
    {
      slug: "waiting-for-the-sujud",
      title: "Waiting for the sujud",
      line: "The Companions stayed standing until he ﷺ went into sujud.",
      facts: ["Told by Al-Bara ibn Azib", "The one who heard him said: he was no liar", "They did not go down before him ﷺ"],
      source: hadith("bukhari", "747", "Al-Bara ibn Azib", "Sahih", "Al-Bara, who was no liar, said: when we prayed with the Prophet ﷺ and he raised his head from ruku', we stayed standing until we saw him go down into sujud.", "and he raised his head from the bowing, we used to remain standing till we saw him prostrating"),
      difficulty: 1,
      questions: [
        { q: "What did they do when he ﷺ rose from ruku'?", a: "Stayed standing", wrong: ["Went down first", "Sat down right away", "Left the row"], why: "We used to remain standing till we saw him prostrating, Al-Bara said." },
        { q: "Until when did they stay standing?", a: "Until they saw him in sujud", wrong: ["Until the adhan", "Until the sun rose", "Until he spoke to them"], why: "We used to remain standing till we saw him prostrating." },
        { q: "Al-Bara said they waited until he ﷺ went into sujud.", tf: true, why: "We used to remain standing till we saw him prostrating, Al-Bara said." }
      ]
    }
  ]
};

export const PRAYER_CALM_UNITS: readonly DeepUnit[] = [CALM];
