import { hadith, type DeepUnit } from "./deepKit";

// One more unit for Eid and special days: the day of sacrifice. Camels that came close to him ﷺ, waiting to eat until
// after the prayer of Eid al-Adha, the sacrifice at the prayer place, four animals that will not do, a sharp blade, and
// meat kept for the road home. Every card is one sahih or hasan hadith (number as sunnah.com gives it) with its exact
// English words to highlight, and none of them is taught anywhere else in the app. No card asks which day of the year is
// the greatest, as the scholars weigh the day of Arafah and the day of sacrifice differently, and Tirmidhi 542 is taught
// only for its part on Eid al-Adha, as its part on Eid al-Fitr is taught as Bukhari 953.

const SACRIFICE: DeepUnit = {
  key: "eid-sacrifice-day",
  topicId: "eid",
  branchId: "eid-the-day-of-sacrifice",
  branch: { title: "The day of sacrifice", description: "Camels that came close, eating after the prayer, the sacrifice at the prayer place, four animals that will not do, a sharp blade, and meat for the road home." },
  name: "the day of sacrifice",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "camels-that-came-close",
      title: "Camels that came close",
      line: "The camels drew near, to see which he ﷺ would offer first.",
      facts: ["Told by Abdullah ibn Qurt", "Budn: camels brought for sacrifice", "They came near on their own"],
      source: hadith("abudawud", "1765", "Abdullah ibn Qurt", "Sahih (Al-Albani)", "Abdullah ibn Qurt said: five or six camels for sacrifice were brought to the Messenger of Allah ﷺ, and they began to draw near to see which he would sacrifice first.", "they began to draw near to see which he would sacrifice first"),
      difficulty: 3,
      questions: [
        { q: "What did the camels do when brought to him ﷺ?", a: "They came close to him", wrong: ["They ran off", "They lay down to rest", "They turned back home"], why: "They began to draw near to see which he would sacrifice first, Abdullah ibn Qurt said." },
        { q: "Why did the camels draw near, Abdullah ibn Qurt said?", a: "To be sacrificed first", wrong: ["To drink some water", "To eat some grass", "To find some shade"], why: "Each came closer to see which of them he ﷺ would offer first." },
        { q: "The camels moved away from him ﷺ.", tf: false, why: "No. The camels began to draw near him, to see which he would sacrifice first." }
      ]
    },
    {
      slug: "eating-after-the-prayer",
      title: "Eating after the prayer",
      line: "On Eid al-Adha, he ﷺ ate only after the prayer.",
      facts: ["Told by Buraydah ibn al-Hasib", "Adha: the Eid of the sacrifice", "On Eid al-Fitr, he ﷺ ate first"],
      source: hadith("tirmidhi", "542", "Buraydah ibn al-Hasib", "Hasan (Darussalam)", "Abdullah ibn Buraydah narrated from his father: the Prophet ﷺ would not leave on the day of Fitr until he had eaten, and he would not eat on the day of Adha until he had prayed.", "he would not eat on the day of Adha until he prayed"),
      difficulty: 3,
      questions: [
        { q: "When did he ﷺ eat on the day of Adha?", a: "After the prayer", wrong: ["Before the prayer", "Before dawn", "At sunset only"], why: "He would not eat on the day of Adha until he prayed, Buraydah said." },
        { q: "On the morning of Eid al-Adha, what fits his ﷺ way?", a: "Eat after the Eid prayer", wrong: ["Eat a big meal first", "Skip the Eid prayer", "Fast the whole day"], why: "On the day of Adha he ﷺ would not eat until he had prayed, Buraydah said." },
        { q: "On Eid al-Adha, the sunnah is to eat after the prayer.", tf: true, why: "He ﷺ would not eat on the day of Adha until he prayed, Buraydah said." }
      ]
    },
    {
      slug: "at-the-prayer-place",
      title: "At the prayer place",
      line: "He ﷺ offered his sacrifice at the Eid prayer place.",
      facts: ["Told by Abdullah ibn Umar", "Musalla: the open Eid prayer place", "Nafi heard it from Ibn Umar"],
      source: hadith("nasai", "4366", "Abdullah ibn Umar", "Sahih (Darussalam)", "Nafi said: Abdullah ibn Umar told him that the Messenger of Allah ﷺ used to offer the sacrifice at the prayer place.", "used to offer the sacrifice at the prayer place"),
      difficulty: 3,
      questions: [
        { q: "Where did he ﷺ use to offer the sacrifice, Ibn Umar said?", a: "At the prayer place", wrong: ["At the market", "Beside the sea", "On a mountain top"], why: "He ﷺ used to offer the sacrifice at the prayer place, Ibn Umar told Nafi." },
        { q: "Who told Nafi where he ﷺ offered the sacrifice?", a: "Abdullah ibn Umar", wrong: ["Abu Hurairah", "Anas ibn Malik", "Jabir ibn Abdullah"], why: "Abdullah ibn Umar told Nafi that he ﷺ used to sacrifice at the prayer place." },
        { q: "He ﷺ used to offer his sacrifice where the Eid prayer was held.", tf: true, why: "The Messenger of Allah ﷺ used to offer the sacrifice at the prayer place, Ibn Umar said." }
      ]
    },
    {
      slug: "four-that-will-not-do",
      title: "Four that will not do",
      line: "Four kinds of animal will not do as a sacrifice.",
      facts: ["Told by Al-Bara ibn Azib", "Udhiyah: the Eid sacrifice", "Choose a healthy animal"],
      source: hadith("nasai", "4369", "Al-Bara ibn Azib", "Sahih (Darussalam)", "Ubayd ibn Fayruz said: I asked Al-Bara ibn Azib about the sacrifices the Messenger of Allah ﷺ disliked or forbade. He said: the Messenger of Allah ﷺ stood up among us and said: there are four that will not do as sacrifices: an animal with one clearly bad eye, an animal that is clearly sick, a lame animal with an obvious limp, and an animal so thin that it is as if there is no marrow in its bones.", "There are four that will not do as sacrifices"),
      difficulty: 3,
      questions: [
        { q: "How many kinds will not do as sacrifices, he ﷺ said?", a: "Four kinds", wrong: ["Two kinds", "Six kinds", "Ten kinds"], why: "There are four that will not do as sacrifices, Al-Bara heard him ﷺ say." },
        { q: "Which of these will not do as a sacrifice?", a: "A clearly sick animal", wrong: ["A healthy sheep", "A strong camel", "A well-fed cow"], why: "An animal that is obviously sick is one of the four that will not do, he ﷺ said." },
        { q: "A lame animal with a clear limp will not do as a sacrifice.", tf: true, why: "The lame animal with an obvious limp is one of the four that will not do, he ﷺ said." }
      ]
    },
    {
      slug: "a-sharp-blade",
      title: "A sharp blade",
      line: "Sharpen the blade, and put the animal at ease.",
      facts: ["Told by Shaddad ibn Aws", "Ihsan: doing a thing well", "Mercy to the animal"],
      source: hadith("tirmidhi", "1409", "Shaddad ibn Aws", "Sahih (Darussalam)", "Shaddad ibn Aws said: the Prophet ﷺ said: indeed Allah has decreed ihsan, doing things well, in everything. So when you sacrifice an animal or prepare one for food, do it well: let one of you sharpen his blade, and let him comfort his animal.", "Let one of you sharpen his blade"),
      difficulty: 3,
      questions: [
        { q: "What has Allah decreed in everything, he ﷺ said?", a: "Doing things well", wrong: ["Doing things fast", "Doing things alone", "Doing things later"], why: "Indeed Allah has decreed ihsan in everything, he ﷺ said." },
        { q: "Before a sacrifice, what should one do to his blade?", a: "Sharpen it", wrong: ["Leave it dull", "Paint it red", "Bend it a little"], why: "Let one of you sharpen his blade, and let him comfort his animal, he ﷺ said." },
        { q: "One should put his animal at ease before the sacrifice.", tf: true, why: "Let him comfort his animal, he ﷺ said, after he sharpens his blade." }
      ]
    },
    {
      slug: "meat-for-the-road",
      title: "Meat for the road",
      line: "On a journey, he ﷺ had his sacrifice meat kept for the road.",
      facts: ["Told by Thawban", "Thawban served the Prophet ﷺ", "The meat lasted until Madinah"],
      source: hadith("abudawud", "2814", "Thawban", "Sahih (Al-Albani)", "Thawban said: the Messenger of Allah ﷺ offered a sacrifice during a journey and then said: Thawban, mend the meat of this goat. So I kept on giving him of its meat until we reached Madinah.", "Thawban, mend the meat of this goat"),
      difficulty: 3,
      questions: [
        { q: "Whom did he ﷺ ask to prepare the meat?", a: "Thawban", wrong: ["Bilal ibn Rabah", "Anas ibn Malik", "Abu Hurairah"], why: "Thawban, mend the meat of this goat, he ﷺ said on the journey." },
        { q: "Until when did the meat last?", a: "Until they reached Madinah", wrong: ["Until that evening", "Until the next morning", "Until they reached Makkah"], why: "I kept on giving him of its meat until we reached Madinah, Thawban said." },
        { q: "He ﷺ offered a sacrifice while on a journey.", tf: true, why: "The Messenger of Allah ﷺ sacrificed during a journey, Thawban said." }
      ]
    }
  ]
};

export const EID_SACRIFICE_UNITS: DeepUnit[] = [SACRIFICE];
