import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// One more unit for Eid and special days: the day of Eid itself. The takbir, the prayer with no adhan, two
// rak'ahs, and children coming along. Every card is one ayah or one sahih hadith of al-Bukhari (number as
// sunnah.com gives it), with its exact English words to highlight.

const EID_ORDER: DeepUnit = {
  key: "eid-order",
  topicId: "eid",
  branchId: "eid-day-of-eid",
  branch: { title: "The day of Eid", description: "The takbir, the Eid prayer with no adhan, two rak'ahs, and children and charity at Eid." },
  name: "the day of Eid",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "takbir",
      title: "Allahu akbar for His guidance",
      line: "Finish Ramadan's days, then say Allahu akbar for His guidance.",
      facts: ["Quran 2:185", "The takbir of Eid"],
      quote: quranQuote(2, 185),
      source: quran(2, 185, "Allah wants ease for you and does not want hardship for you, so that you complete the number of days and glorify Allah for having guided you, and that you may be grateful."),
      difficulty: 1,
      questions: [
        { q: "What do we glorify Allah for when Ramadan ends?", a: "For guiding us", wrong: ["For good weather", "For new clothes only", "For winning games"], why: "Glorify Allah for having guided you." },
        { q: "What do we complete before the takbir of Eid?", a: "The number of fasting days", wrong: ["A hundred prayers", "A trip to Makkah", "A big meal"], why: "So that you complete the number of days and glorify Allah." },
        { q: "Saying Allahu akbar is part of the joy of Eid.", tf: true, why: "Glorify Allah for having guided you, and be grateful." }
      ]
    },
    {
      slug: "no-adhan",
      title: "No adhan for Eid",
      line: "In his ﷺ time, the Eid prayer was never called with an adhan.",
      facts: ["Told by Ibn Abbas and Jabir", "Eid al-Fitr and Eid al-Adha"],
      source: hadith("bukhari", "960", "Ibn Abbas and Jabir", "Sahih", "Ata said: Ibn Abbas and Jabir ibn Abdullah told me there was no adhan for the prayer of Eid al-Fitr or Eid al-Adha.", "There was no Adhan for the prayer of"),
      difficulty: 1,
      questions: [
        { q: "What was never called for the Eid prayer in his ﷺ time?", a: "The adhan", wrong: ["The takbir", "The khutbah", "The prayer itself"], why: "There was no Adhan for the prayer of Id-ul-Fitr and Id-ul-Adha." },
        { q: "Which prayers had no adhan, say Ibn Abbas and Jabir?", a: "Eid al-Fitr and Eid al-Adha", wrong: ["Fajr and Isha", "Jumu'ah only", "All five prayers"], why: "There was no Adhan for the prayer of Id-ul-Fitr and Id-ul-Adha." },
        { q: "The Eid prayer starts with an adhan, like Dhuhr.", tf: false, why: "The Adhan for the Id Prayer was never pronounced in the life time of Allah's Messenger ﷺ." }
      ]
    },
    {
      slug: "two-rakahs",
      title: "Two rak'ahs on Eid",
      line: "On Eid he ﷺ prayed two rak'ahs, with no prayer before or after.",
      facts: ["Told by Ibn Abbas", "Then the women gave charity"],
      source: hadith("bukhari", "964", "Ibn Abbas", "Sahih", "On the day of Eid al-Fitr the Prophet ﷺ prayed two rak'ahs and did not pray before or after them. Then he went with Bilal to the women and told them to give charity, and they began giving their earrings and necklaces.", "he did not pray before or after it"),
      difficulty: 1,
      questions: [
        { q: "How many rak'ahs is the Eid prayer?", a: "Two", wrong: ["Four", "Three", "One"], why: "The Prophet ﷺ offered a two rak'at prayer on the Day of Id ul Fitr." },
        { q: "Did he ﷺ pray anything else before or after it?", a: "No, nothing", wrong: ["Yes, two more", "Yes, four more", "Yes, at sunrise"], why: "He did not pray before or after it." },
        { q: "What did the women give in charity?", a: "Earrings and necklaces", wrong: ["Horses", "Dates only", "Houses"], why: "They started giving their earrings and necklaces." }
      ]
    },
    {
      slug: "a-boy-at-eid",
      title: "Ibn Abbas, a boy at Eid",
      line: "Young Ibn Abbas went to the Eid prayer with the Prophet ﷺ.",
      facts: ["Ibn Abbas was a child then", "Bilal held out his cloth"],
      source: hadith("bukhari", "977", "Ibn Abbas", "Sahih", "Ibn Abbas was asked if he had been at the Eid prayer with the Prophet ﷺ. He said: yes, and I could not have been there had I not been young. He ﷺ prayed, gave the khutbah, then went to the women with Bilal and told them to give charity. I saw the women putting their jewellery into Bilal's cloth.", "And I could not have joined him had I not been young"),
      difficulty: 2,
      questions: [
        { q: "How old was Ibn Abbas at that Eid prayer?", a: "Still a young boy", wrong: ["A grown man", "An old man", "A tiny baby"], why: "I could not have joined him had I not been young." },
        { q: "What did the women put into Bilal's cloth?", a: "Their jewellery, as charity", wrong: ["Dates for the men", "Letters", "Flowers"], why: "I saw the women putting their ornaments into Bilal's garment." },
        { q: "Children can come to the Eid prayer too.", tf: true, why: "Ibn Abbas joined him while he was young." }
      ]
    }
  ]
};

export const EID_MORE_UNITS: DeepUnit[] = [EID_ORDER];
