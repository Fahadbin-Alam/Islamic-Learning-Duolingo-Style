import { hadith, type DeepUnit } from "./deepKit";

// One more Manners unit: staying safe and keeping others safe, from Sahih al-Bukhari, Jami at-Tirmidhi and Sunan
// Abi Dawud. Arrows held by their heads in the masjid and the market, never pointing a weapon at a Muslim, not
// travelling alone at night, camping away from the road, not sleeping on a roof without a wall, and washing grease
// off the hands before sleep. Every card is one sahih hadith with its number, narrator and grade, and its exact
// English words to highlight. Points the schools differ on are left out, and none of these hadith is taught
// anywhere else in the app.

const SAFE: DeepUnit = {
  key: "manners-staying-safe",
  topicId: "manners",
  branchId: "manners-staying-safe",
  branch: { title: "Staying safe", description: "Arrows held by their heads, never pointing a weapon, not alone at night, camping off the road, a roof with a wall, and clean hands at bedtime." },
  name: "staying safe",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "hold-the-sharp-end",
      title: "Hold the sharp end",
      line: "Carrying something sharp among people? Hold the sharp end.",
      facts: ["Told by Abu Musa al-Ash'ari", "In the masjid or the market", "So that no Muslim gets hurt"],
      source: hadith("bukhari", "7075", "Abu Musa al-Ash'ari", "Sahih", "Abu Musa said: the Prophet ﷺ said: if any of you passes through our masjid or our market carrying arrows, let him hold their iron heads in his hand, so that he does not hurt any Muslim with them.", "If anyone of you passed through our mosque or through our market while carrying arrows, he should hold the iron heads"),
      difficulty: 1,
      questions: [
        { q: "Carrying arrows among people, what should you hold?", a: "Their sharp iron heads", wrong: ["Only the feathers", "The bow string", "Nothing, just walk fast"], why: "He should hold the iron heads, lest he should injure one of the Muslims with it." },
        { q: "Where did he ﷺ say to take this care?", a: "In the masjid and the market", wrong: ["Only in the desert", "Only at sea", "Only on a farm"], why: "If anyone of you passed through our mosque or through our market carrying arrows." },
        { q: "Care with sharp things keeps others from getting hurt.", tf: true, why: "Hold the heads lest you injure one of the Muslims with it, he ﷺ said." }
      ]
    },
    {
      slug: "never-point-a-weapon",
      title: "Never point a weapon",
      line: "Never point a weapon at a fellow Muslim.",
      facts: ["Told by Abu Hurairah", "No one knows what may happen", "Shaytan may push the hand to strike"],
      source: hadith("bukhari", "7072", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: none of you should point a weapon at his Muslim brother, for he does not know: Shaytan may push his hand to strike him, and he would fall into a pit of the Fire.", "None of you should point out towards his Muslim brother with a weapon"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ forbid us to point at a Muslim?", a: "A weapon", wrong: ["A torch", "A map", "A book"], why: "None of you should point out towards his Muslim brother with a weapon, he ﷺ said." },
        { q: "Why is it so dangerous, he ﷺ said?", a: "Shaytan may push the hand", wrong: ["The wind may blow", "The sun may blind him", "A bird may land on it"], why: "Satan may tempt him to hit him, and he would fall into a pit of fire, he ﷺ said." },
        { q: "Pointing a weapon at a friend is fine as a joke.", tf: false, why: "No. Never point a weapon: Satan may tempt him to hit him, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "not-alone-at-night",
      title: "Not alone at night",
      line: "Try not to travel alone at night.",
      facts: ["Told by Abdullah ibn Umar", "He ﷺ knew of dangers people did not", "Travel with others when you can"],
      source: hadith("bukhari", "2998", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: the Prophet ﷺ said: if people knew what I know about travelling alone, no rider would travel alone at night.", "If the people knew what I know about traveling alone, then nobody would travel alone at night"),
      difficulty: 1,
      questions: [
        { q: "When did he ﷺ warn against travelling alone?", a: "At night", wrong: ["At noon", "On Fridays", "In the rain"], why: "Nobody would travel alone at night, if they knew what I know, he ﷺ said." },
        { q: "What is safer for a journey at night?", a: "Going with others", wrong: ["Going alone", "Going without water", "Going without telling anyone"], why: "If the people knew what I know about traveling alone, nobody would travel alone." },
        { q: "He ﷺ knew of dangers in travelling alone that others did not.", tf: true, why: "If the people knew what I know, nobody would travel alone at night, he ﷺ said." }
      ]
    },
    {
      slug: "camp-off-the-road",
      title: "Camp away from the road",
      line: "Stopping for the night? Camp away from the road.",
      facts: ["Told by Abu Hurairah", "Let the camels graze on fertile land", "At night, animals and stinging creatures use the road"],
      source: hadith("tirmidhi", "2858", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Messenger of Allah ﷺ said: when you travel through fertile land, give the camels their share of it; when you travel in a drought, hurry while they still have strength; and when you camp at night, keep away from the road, for it is the path of animals and the home of stinging creatures at night.", "when you camp late, then stay away from the road, for indeed it is the route of the beasts and the abode of poisonous vermin in the night"),
      difficulty: 2,
      questions: [
        { q: "Camping at night, where should travellers stay?", a: "Away from the road", wrong: ["Right on the road", "In the middle of the path", "Where animals walk"], why: "When you camp late, then stay away from the road, he ﷺ said." },
        { q: "Why is the road unsafe at night?", a: "Animals and stinging creatures use it", wrong: ["The dust is too thick", "Its stones are cold", "Traders are noisy there"], why: "For it is the route of the beasts and the abode of poisonous vermin in the night." },
        { q: "On fertile land, he ﷺ said to let the camels graze.", tf: true, why: "When you travel through fertile land, give the camels their fill of the land." }
      ]
    },
    {
      slug: "a-roof-with-a-wall",
      title: "A roof with a wall",
      line: "Never sleep on a roof that has no wall around it.",
      facts: ["Told by Ali ibn Shayban", "A palisade: a low wall around the roof", "The wall stops a sleeper from rolling off"],
      source: hadith("abudawud", "5041", "Ali ibn Shayban", "Sahih (Al-Albani)", "Ali ibn Shayban said: the Prophet ﷺ said: whoever spends the night on the roof of a house with no wall around it, Allah's promise to guard him no longer applies.", "If anyone spends the night on the roof of a house with no stone palisade"),
      difficulty: 1,
      questions: [
        { q: "What roof did he ﷺ warn against sleeping on?", a: "One with no wall around it", wrong: ["One made of palm leaves", "One with a staircase", "One near the masjid"], why: "If anyone spends the night on the roof of a house with no stone palisade, he ﷺ said." },
        { q: "What does a palisade on a roof do?", a: "Stops a sleeper from falling", wrong: ["Holds rain water", "Lets in more light", "Locks the door"], why: "A roof with no stone palisade leaves a sleeper with nothing to stop a fall." },
        { q: "Sleeping on a roof with no wall is risky.", tf: true, why: "Allah's responsibility to guard him no longer applies, the Prophet ﷺ said." }
      ]
    },
    {
      slug: "clean-hands-at-bedtime",
      title: "Clean hands at bedtime",
      line: "Wash greasy hands before you go to sleep.",
      facts: ["Told by Abu Hurairah", "Grease left on the hand overnight", "He has only himself to blame"],
      source: hadith("abudawud", "3852", "Abu Hurairah", "Sahih (Al-Albani)", "Abu Hurairah said: the Prophet ﷺ said: whoever spends the night with grease on his hand that he has not washed off, and some harm comes to him, let him blame no one but himself.", "If anyone spends the night with grease on his hand which he has not washed away, he can blame only himself if some trouble comes to him"),
      difficulty: 1,
      questions: [
        { q: "What should you wash off before sleeping?", a: "Grease from food on your hand", wrong: ["The dust of your shoes", "The ink of your pen", "Nothing at all"], why: "If anyone spends the night with grease on his hand which he has not washed away." },
        { q: "If harm comes to him, whom can he blame?", a: "No one but himself", wrong: ["The people next door", "His cook", "The night"], why: "He can blame only himself if some trouble comes to him, he ﷺ said." },
        { q: "Clean hands at bedtime help keep you safe.", tf: true, why: "Unwashed grease overnight can bring trouble, and he can blame only himself, he ﷺ said." }
      ]
    }
  ]
};

export const MANNERS_SAFETY_UNITS: readonly DeepUnit[] = [SAFE];
