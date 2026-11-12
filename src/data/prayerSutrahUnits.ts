import { hadith, type DeepUnit } from "./deepKit";

// One more unit for the prayer topic: the sutrah, something set in front of one who prays. Waiting rather than passing in
// front of someone praying, room for a sheep between him ﷺ and the wall, keeping close to the sutrah, a short spear on
// Eid, something like the back of a saddle, and his camel as a sutrah. Every card is one sahih hadith (number as
// sunnah.com gives it) with its exact English words to highlight, and none of them is taught anywhere else in the app.
// No card asks what cuts a prayer or what to do with one who keeps trying to pass, as the schools take those
// differently, and none asks forty of what, as the narrator did not remember.

const SUTRAH: DeepUnit = {
  key: "prayer-sutrah",
  topicId: "prayer",
  branchId: "prayer-the-sutrah",
  branch: { title: "A sutrah for your prayer", description: "Waiting rather than passing in front, room for a sheep, keeping close, a short spear on Eid, a saddle's back, and his camel as a sutrah." },
  name: "the sutrah in prayer",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "better-to-wait",
      title: "Better to wait",
      line: "Do not pass in front of someone who is praying.",
      facts: ["Told by Abu Juhaim", "Zayd ibn Khalid sent someone to ask him", "Waiting is better than passing"],
      source: hadith("bukhari", "510", "Abu Juhaim", "Sahih", "Busr ibn Sa'id said that Zayd ibn Khalid sent him to Abu Juhaim to ask what he had heard from the Messenger of Allah ﷺ about a person passing in front of someone who is praying. Abu Juhaim said: the Messenger of Allah ﷺ said: if the person who passes in front of another person in prayer knew the magnitude of his sin, he would prefer to wait for forty rather than pass in front of him. Abu an-Nadr said: I do not remember whether he said forty days, months or years.", "If the person who passes in front of another person in prayer knew the magnitude of his sin"),
      difficulty: 3,
      questions: [
        { q: "What would the passer prefer, if he knew his sin?", a: "To wait instead", wrong: ["To run past quickly", "To walk past slowly", "To pass by twice"], why: "He would prefer to wait rather than pass in front of him, he ﷺ said." },
        { q: "Someone is praying between you and the door. What fits his ﷺ words?", a: "Wait until he finishes", wrong: ["Walk right in front", "Run quickly past him", "Step over his mat"], why: "If the passer knew the size of his sin, he would rather wait, he ﷺ said." },
        { q: "Passing in front of someone who is praying is a small matter.", tf: false, why: "No. If the one passing in front knew his sin, he would rather wait, he ﷺ said." }
      ]
    },
    {
      slug: "room-for-a-sheep",
      title: "Room for a sheep",
      line: "He ﷺ prayed near the wall, leaving room for a sheep.",
      facts: ["Told by Sahl ibn Sa'd", "Musalla: the place where one prays", "Pray close to your sutrah"],
      source: hadith("bukhari", "496", "Sahl ibn Sa'd", "Sahih", "Sahl ibn Sa'd said: the distance between the place where the Messenger of Allah ﷺ prayed and the wall was just enough for a sheep to pass through.", "was just sufficient for a sheep to pass through"),
      difficulty: 3,
      questions: [
        { q: "How much room was between his ﷺ prayer place and the wall?", a: "Room for a sheep", wrong: ["Room for a camel", "Room for a horse", "Room for ten men"], why: "The space was just enough for a sheep to pass through, Sahl ibn Sa'd said." },
        { q: "He ﷺ prayed close to the wall in front of him.", tf: true, why: "Between his prayer place and the wall was just room for a sheep to pass, Sahl said." },
        { q: "You pray facing a wall at home. Where should you stand?", a: "Close to the wall", wrong: ["Far from the wall", "Across the room", "In the doorway"], why: "Between his ﷺ prayer place and the wall was just room for a sheep, Sahl said." }
      ]
    },
    {
      slug: "stay-close-to-it",
      title: "Stay close to it",
      line: "When you pray facing a sutrah, stay close to it.",
      facts: ["Told by Sahl ibn Abi Hathmah", "Sutrah: something in front of one who prays", "Do not let Shaytan cut in"],
      source: hadith("abudawud", "695", "Sahl ibn Abi Hathmah", "Sahih (Al-Albani)", "Sahl ibn Abi Hathmah said: the Prophet ﷺ said: when one of you prays facing a sutrah, he should keep close to it, and not let the devil interrupt his prayer.", "he should keep close to it, and not let the devil interrupt his prayer"),
      difficulty: 3,
      questions: [
        { q: "You put a bag in front of you as a sutrah. Where should you stand?", a: "Close to it", wrong: ["Far from it", "Across the room", "Out in the hall"], why: "When one of you prays facing a sutrah, he should keep close to it, he ﷺ said." },
        { q: "Whom should you not let interrupt your prayer, he ﷺ said?", a: "Shaytan", wrong: ["The angels", "The imam", "The neighbors"], why: "Keep close to it, and do not let the devil interrupt the prayer, he ﷺ said." },
        { q: "He ﷺ said not to let the devil interrupt the prayer.", tf: true, why: "Keep close to the sutrah, and do not let the devil interrupt the prayer, he ﷺ said." }
      ]
    },
    {
      slug: "a-spear-in-front-of-him",
      title: "A spear in front of him",
      line: "On Eid, a short spear was his ﷺ sutrah.",
      facts: ["Told by Abdullah ibn Umar", "Harbah: a short spear", "The people prayed behind him ﷺ"],
      source: hadith("bukhari", "494", "Abdullah ibn Umar", "Sahih", "Ibn Umar said: whenever the Messenger of Allah ﷺ went out on the day of Eid, he would order a short spear to be planted in front of him, and he would pray facing it with the people behind him. He did the same on journeys, and after him the Muslim rulers did the same.", "to be planted in front of him"),
      difficulty: 3,
      questions: [
        { q: "What was planted in front of him ﷺ on Eid?", a: "A short spear", wrong: ["A tall flag", "A wooden chair", "A stone pillar"], why: "On Eid he ﷺ would order a short spear to be planted in front of him, Ibn Umar said." },
        { q: "Where were the people as he ﷺ prayed facing it?", a: "Right behind him", wrong: ["In front of him", "Beside the spear", "On the rooftops"], why: "He would pray facing it with the people behind him, Ibn Umar said." },
        { q: "He ﷺ also used a sutrah like this on journeys.", tf: true, why: "He used to do the same while on a journey, Ibn Umar said." }
      ]
    },
    {
      slug: "like-the-back-of-a-saddle",
      title: "Like the back of a saddle",
      line: "Something like a saddle's back post can be your sutrah.",
      facts: ["Told by Talhah ibn Ubaydillah", "Rahl: a camel saddle", "Who passes beyond it need not worry you"],
      source: hadith("tirmidhi", "335", "Talhah ibn Ubaydillah", "Sahih (Darussalam)", "Musa ibn Talhah narrated from his father Talhah that the Messenger of Allah ﷺ said: when one of you places something like the back post of a camel saddle in front of him, then let him pray, and not concern himself with who passes beyond that.", "let him perform Salat and not concern himself with who passes beyond that"),
      difficulty: 3,
      questions: [
        { q: "Something like what should be in front of you, he ﷺ said?", a: "The post of a camel saddle", wrong: ["The hump of a camel", "The rope of a camel", "The tail of a camel"], why: "Place something like the post of a camel saddle in front of you, then pray, he ﷺ said." },
        { q: "Once your sutrah is in front, whose passing need not worry you?", a: "Those beyond it", wrong: ["Those between you and it", "Those right in front of you", "Those crossing your place"], why: "Let him pray and not concern himself with who passes beyond that, he ﷺ said." },
        { q: "With a sutrah in front, one need not mind who passes beyond it.", tf: true, why: "Then let him pray, and not concern himself with who passes beyond that, he ﷺ said." }
      ]
    },
    {
      slug: "his-camel-as-a-sutrah",
      title: "His camel as a sutrah",
      line: "He ﷺ would pray facing his she-camel as a sutrah.",
      facts: ["Told by Abdullah ibn Umar", "She-camel: a female camel", "Ibn Umar did the same"],
      source: hadith("bukhari", "507", "Abdullah ibn Umar", "Sahih", "Nafi said: Ibn Umar said: the Prophet ﷺ used to make his she-camel sit across and he would pray facing it. I asked: what would he do if the camel moved? He said: he would take its saddle, put it in front of him and pray facing its back part. And Ibn Umar used to do the same.", "used to make his she-camel sit across and he would pray facing it"),
      difficulty: 3,
      questions: [
        { q: "What did he ﷺ make sit across in front of him?", a: "His she-camel", wrong: ["His goat", "His mule", "His donkey"], why: "He used to make his she-camel sit across and he would pray facing it, Ibn Umar said." },
        { q: "If the camel moved, what did he ﷺ pray facing?", a: "Its saddle", wrong: ["Its rope", "Its water bowl", "Its feed bag"], why: "He would put its saddle in front of him and pray facing its back part, Ibn Umar said." },
        { q: "Ibn Umar used to do the same as he ﷺ did.", tf: true, why: "Nafi, who learned from Ibn Umar, saw him follow the Prophet ﷺ in this." }
      ]
    }
  ]
};

export const PRAYER_SUTRAH_UNITS: DeepUnit[] = [SUTRAH];
