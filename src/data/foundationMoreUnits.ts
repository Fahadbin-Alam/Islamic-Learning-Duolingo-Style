import { hadith, type DeepUnit } from "./deepKit";

// One more Foundation unit: little sunnahs from waking up to going to bed. Every card is one sahih hadith of
// al-Bukhari (number as sunnah.com gives it), with its exact English words to highlight, and none of them is
// taught anywhere else in the app.

const DAY_AND_NIGHT: DeepUnit = {
  key: "found-day-night",
  topicId: "foundation",
  branchId: "foundation-day-and-night",
  branch: { title: "Sunnahs of day and night", description: "Little sunnahs from waking up to bedtime: clean hands, handshakes, meals, journeys and a safe home." },
  name: "sunnahs of day and night",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "wash-hands-on-waking",
      title: "Wash your hands on waking",
      line: "When you wake up, wash your hands before dipping them in water.",
      facts: ["Told by Abu Hurairah", "No one knows where a sleeping hand was"],
      source: hadith("bukhari", "162", "Abu Hurairah", "Sahih", "Whoever wakes up from sleep should wash his hands before putting them into the water for wudu, because no one knows where his hands were while he slept.", "whoever wakes up from his sleep should wash his hands before putting them in the water for ablution"),
      difficulty: 1,
      questions: [
        { q: "You wake up and want to make wudu from a bowl. What comes first?", a: "Wash your hands", wrong: ["Dip your hands in", "Drink the water", "Go back to sleep"], why: "Whoever wakes up from his sleep should wash his hands before putting them in the water." },
        { q: "Why wash your hands after sleep?", a: "No one knows where they were", wrong: ["They are cold", "It is a game", "To wake the family"], why: "Because nobody knows where his hands were during sleep." },
        { q: "Islam teaches us to be clean from the moment we wake.", tf: true, why: "Wash your hands before putting them in the water." }
      ]
    },
    {
      slug: "shaking-hands",
      title: "Shaking hands",
      line: "The Sahabah shook hands with each other when they met.",
      facts: ["Qatadah asked Anas", "Anas answered: yes"],
      source: hadith("bukhari", "6263", "Qatadah", "Sahih", "Qatadah asked Anas: was it the way of the Companions of the Prophet ﷺ to shake hands with one another? He said: yes.", "Was it a custom of the companions of the Prophet"),
      difficulty: 1,
      questions: [
        { q: "What did Qatadah ask Anas about?", a: "Whether the Sahabah shook hands", wrong: ["Whether they wrote letters", "Whether they raced horses", "Whether they ate together"], why: "Was it a custom of the companions of the Prophet ﷺ to shake hands with one another?" },
        { q: "What did Anas answer?", a: "Yes", wrong: ["No", "Only on Eid", "Only with kings"], why: "He said, Yes." },
        { q: "Shaking hands when they met was a habit of the Sahabah.", tf: true, why: "Anas said yes, it was their custom." }
      ]
    },
    {
      slug: "lick-your-fingers",
      title: "Every last bite",
      line: "After eating, lick your fingers before you wipe your hands.",
      facts: ["Told by Ibn Abbas", "Then wipe your hands"],
      source: hadith("bukhari", "5456", "Ibn Abbas", "Sahih", "When you eat, do not wipe your hand until you have licked it, or had it licked.", "When you eat, do not wipe your hands till you have licked it"),
      difficulty: 1,
      questions: [
        { q: "What should you do before wiping your hand after eating?", a: "Lick your fingers", wrong: ["Wash the plate", "Clap your hands", "Shake it dry"], why: "Do not wipe your hands till you have licked it." },
        { q: "Who told us Bukhari 5456?", a: "Ibn Abbas", wrong: ["Anas", "Jabir", "Abu Dharr"], why: "Narrated Ibn Abbas." },
        { q: "Even small sunnahs at the table are worth keeping.", tf: true, why: "He ﷺ taught us how to finish a meal." }
      ]
    },
    {
      slug: "going-up-going-down",
      title: "Going up, going down",
      line: "Going up, say Allahu akbar; going down, say Subhanallah.",
      facts: ["Told by Jabir ibn Abdullah", "The Sahabah did it on journeys"],
      source: hadith("bukhari", "2993", "Jabir ibn Abdullah", "Sahih", "Whenever we went up a place we would say Allahu akbar, and whenever we went down we would say Subhanallah.", "Whenever we went up a place we would say"),
      difficulty: 1,
      questions: [
        { q: "What did the Sahabah say going up a hill?", a: "Allahu akbar", wrong: ["Subhanallah", "Alhamdulillah", "Astaghfirullah"], why: "Whenever we went up a place we would say Allahu Akbar." },
        { q: "What did they say going down?", a: "Subhanallah", wrong: ["Allahu akbar", "Bismillah", "Amin"], why: "Whenever we went down a place we would say Subhan Allah." },
        { q: "We can remember Allah even while we travel.", tf: true, why: "They said takbir going up and tasbih going down." }
      ]
    },
    {
      slug: "gift-of-perfume",
      title: "He never refused perfume",
      line: "He ﷺ never turned down a gift of perfume.",
      facts: ["Told by Anas ibn Malik", "Anas kept the same habit"],
      source: hadith("bukhari", "2582", "Anas ibn Malik", "Sahih", "Thumamah gave Azra some perfume and said that Anas never refused perfume, because Anas said: the Prophet ﷺ never refused a gift of perfume.", "used not to reject the gifts of perfume"),
      difficulty: 2,
      questions: [
        { q: "Which gift did he ﷺ never turn down?", a: "Perfume", wrong: ["Silk clothes", "Gold rings", "Ivory combs"], why: "The Prophet ﷺ used not to reject the gifts of perfume." },
        { q: "Which habit of his ﷺ did Anas follow?", a: "Never refusing perfume", wrong: ["Never eating dates", "Never wearing shoes", "Never riding camels"], why: "Anas would not reject the gifts of perfume." },
        { q: "Smelling nice is part of the sunnah.", tf: true, why: "He ﷺ never rejected the gifts of perfume." }
      ]
    },
    {
      slug: "before-bed",
      title: "Before bed: lamps and doors",
      line: "Before bed, put out lamps, close doors and cover food and drink.",
      facts: ["Told by Jabir ibn Abdullah", "A safe home at night"],
      source: hadith("bukhari", "5624", "Jabir ibn Abdullah", "Sahih", "Put out the lamps when you go to bed, close your doors, tie the mouths of your water skins, and cover your food and drink, even by laying a stick across the container.", "Extinguish the lamps when you go to bed"),
      difficulty: 2,
      questions: [
        { q: "Which of these did he ﷺ tell us to do before bed?", a: "Put out the lamps", wrong: ["Leave the fire burning", "Leave the doors open", "Leave food uncovered"], why: "Extinguish the lamps when you go to bed; close your doors." },
        { q: "No lid at hand? How can you cover a cup?", a: "Lay a stick across it", wrong: ["Leave it open", "Pour it away", "Hide it in a bag"], why: "Even with a stick you place across the container." },
        { q: "Leaving a fire burning while everyone sleeps is fine.", tf: false, why: "Extinguish the lamps when you go to bed." }
      ]
    }
  ]
};

export const FOUNDATION_MORE_UNITS: DeepUnit[] = [DAY_AND_NIGHT];
