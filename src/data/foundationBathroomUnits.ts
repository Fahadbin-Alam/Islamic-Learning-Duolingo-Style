import { hadith, type DeepUnit } from "./deepKit";

// One more Foundation unit: sunnahs of the bathroom, from Sunan Abi Dawud, Sahih Muslim and Sahih al-Bukhari. Going
// far away, keeping paths and shade clean, no urine in still water, stones but not bones or dung, water to wash with,
// and keeping clean of urine. Every card is one sahih hadith with its number, narrator and grade, and its exact
// English words to highlight. None of these hadith is taught anywhere else in the app.

const BATHROOM: DeepUnit = {
  key: "found-bathroom",
  topicId: "foundation",
  branchId: "foundation-bathroom",
  branch: { title: "Sunnahs of the bathroom", description: "Going far away, not on paths or in the shade, not in still water, stones and not bones, water to wash with, and keeping clean of urine." },
  name: "sunnahs of the bathroom",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "a-far-off-place",
      title: "A far-off place",
      line: "To relieve himself, he ﷺ went to a far-off place.",
      facts: ["Told by Al-Mughirah ibn Shu'bah", "He ﷺ kept himself private", "A closed door keeps us private today"],
      source: hadith("abudawud", "1", "Al-Mughirah ibn Shu'bah", "Hasan Sahih (Al-Albani)", "Al-Mughirah ibn Shu'bah said: when the Prophet ﷺ went out to relieve himself, he went to a far-off place.", "to relieve himself, he went to a far-off place"),
      difficulty: 1,
      questions: [
        { q: "Who told us he ﷺ went to a far-off place?", a: "Al-Mughirah ibn Shu'bah", wrong: ["Abu Dharr", "Salman al-Farsi", "Abu Bakr"], why: "He went far away to relieve himself, Al-Mughirah ibn Shu'bah said." },
        { q: "Out camping with no toilet near, what fits his ﷺ way?", a: "Go far from the people", wrong: ["Stay close to the tents", "Use the path everyone walks", "Pick the shade people sit in"], why: "When he went out to relieve himself, he ﷺ went to a far-off place." },
        { q: "He ﷺ went far away when he needed to relieve himself.", tf: true, why: "When the Prophet ﷺ went out to relieve himself, he went to a far-off place." }
      ]
    },
    {
      slug: "paths-and-shade",
      title: "Not on paths or in shade",
      line: "Never relieve yourself on paths or in the shade people use.",
      facts: ["Told by Abu Hurairah", "These two things make people curse", "Paths and shade are for everyone"],
      source: hadith("muslim", "269", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Messenger of Allah ﷺ said: beware of the two things that make people curse. They asked: O Messenger of Allah, what are they? He said: relieving oneself on the paths people use, or in the shade where they rest.", "Be on your guard against two things which provoke cursing"),
      difficulty: 1,
      questions: [
        { q: "Which two places did he ﷺ warn about?", a: "Paths and shade", wrong: ["Hills and valleys", "Deserts and dunes", "Fields and farms"], why: "He ﷺ named easing on the thoroughfares or under the shades." },
        { q: "Why are these two things to be avoided?", a: "They make people curse", wrong: ["They waste water", "They scare the animals", "They take too long"], why: "Be on your guard against two things which provoke cursing, he ﷺ said." },
        { q: "Relieving yourself where people rest in the shade is bad manners.", tf: true, why: "Easing on the thoroughfares or under the shades provokes cursing, he ﷺ said." }
      ]
    },
    {
      slug: "not-in-still-water",
      title: "Not in still water",
      line: "Never pass urine into still water that does not flow.",
      facts: ["Told by Abu Hurairah", "Still water is like a pond or a tank", "People may need that water to wash"],
      source: hadith("bukhari", "239", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: none of you should pass urine into still water that does not flow, and then wash in it.", "You should not pass urine in stagnant water which is not flowing then"),
      difficulty: 1,
      questions: [
        { q: "Which water did he ﷺ say not to pass urine into?", a: "Still water that does not flow", wrong: ["Hot water", "Salty water", "Rain water"], why: "You should not pass urine in stagnant water which is not flowing, he ﷺ said." },
        { q: "What might a person need that water for later?", a: "To wash in it", wrong: ["To plant seeds", "To build a house", "To paint a wall"], why: "Do not pass urine in still water and then wash in it, he ﷺ said." },
        { q: "Passing urine into a still pond is fine.", tf: false, why: "No. You should not pass urine in stagnant water which is not flowing, he ﷺ said." }
      ]
    },
    {
      slug: "stones-not-bones",
      title: "Stones, not bones",
      line: "He ﷺ asked for stones to clean himself, not bone or dung.",
      facts: ["Told by Abu Hurairah", "He ﷺ did not look this way or that", "Abu Hurairah brought them in his garment"],
      source: hadith("bukhari", "155", "Abu Hurairah", "Sahih", "Abu Hurairah said: I followed the Prophet ﷺ when he went out to relieve himself, and he did not look this way or that. When I came near, he said: bring me some stones to clean myself with, and do not bring a bone or dung. So I brought stones in the corner of my garment, put them by his side and went away. When he finished, he used them.", "and do not bring a bone or a piece of dung"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask Abu Hurairah to bring?", a: "Some stones", wrong: ["A bucket of sand", "A piece of cloth", "A handful of leaves"], why: "Fetch for me some stones for cleaning, and do not bring a bone or dung, he ﷺ said." },
        { q: "What did he ﷺ say not to bring?", a: "A bone or dung", wrong: ["Leaves or grass", "Sand or dust", "Cloth or wool"], why: "And do not bring a bone or a piece of dung, he ﷺ told Abu Hurairah." },
        { q: "Abu Hurairah carried the stones in his garment.", tf: true, why: "So I brought the stones in the corner of my garment, Abu Hurairah said." }
      ]
    },
    {
      slug: "water-to-wash-with",
      title: "Water to wash with",
      line: "Anas and another boy brought water for him ﷺ to wash.",
      facts: ["Told by Anas ibn Malik", "Anas was a boy who served him ﷺ", "They carried a small pot of water"],
      source: hadith("bukhari", "150", "Anas ibn Malik", "Sahih", "Anas ibn Malik said: whenever the Messenger of Allah ﷺ went out to relieve himself, I and another boy would go with him carrying a small pot of water, so that he could wash with it.", "I along with another boy used to accompany him with a tumbler full of water"),
      difficulty: 1,
      questions: [
        { q: "What did Anas and the other boy carry for him ﷺ?", a: "A pot full of water", wrong: ["A basket of dates", "A sack of flour", "A pillow and a mat"], why: "I along with another boy used to accompany him with a tumbler full of water, Anas said." },
        { q: "What was the water for?", a: "For washing himself", wrong: ["For the camels to drink", "For making bread", "For washing clothes"], why: "He ﷺ used the water to wash himself clean, the narrator Hisham explained." },
        { q: "Washing with water after the toilet is from his ﷺ way.", tf: true, why: "Anas and a boy brought him a tumbler full of water each time he went out." }
      ]
    },
    {
      slug: "two-graves",
      title: "Two graves",
      line: "Keeping clean from urine is a serious matter, he ﷺ taught.",
      facts: ["Told by Abdullah ibn Abbas", "He ﷺ passed by two graves", "The other sin was carrying tales"],
      source: hadith("muslim", "292a", "Abdullah ibn Abbas", "Sahih", "Ibn Abbas said: the Messenger of Allah ﷺ passed by two graves and said: these two are being punished. One of them used to carry tales, and the other did not keep himself clean from urine.", "One of them carried tales and the other did not keep himself safe from being defiled by urine"),
      difficulty: 2,
      questions: [
        { q: "Why was one of the two being punished?", a: "He did not keep clean of urine", wrong: ["He forgot to water his garden", "He slept late one day", "He lost his sheep"], why: "The other did not keep himself safe from being defiled by urine, he ﷺ said." },
        { q: "What did the other one use to do?", a: "He carried tales", wrong: ["He sold goats", "He built houses", "He dug wells"], why: "One of them carried tales, he ﷺ said, passing by the two graves." },
        { q: "He ﷺ warned us to keep ourselves clean from urine.", tf: true, why: "The other did not keep himself safe from being defiled by urine, he ﷺ said of the graves." }
      ]
    }
  ]
};

export const FOUNDATION_BATHROOM_UNITS: readonly DeepUnit[] = [BATHROOM];
