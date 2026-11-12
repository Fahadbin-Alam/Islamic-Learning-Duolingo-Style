import { hadith, type DeepUnit } from "./deepKit";

// One more Foundations unit: Sunnahs of the journey, from Sahih al-Bukhari and Sunan Abi Dawud. Setting out on a
// Thursday, the du'a for blessed early mornings, travelling by night, camping close together, riding at the back to
// help the weak, and hurrying home once the work is done. Every card is one sahih or hasan hadith with its number,
// narrator and grade, and its exact English words to highlight. Points the schools differ on are left out, and none
// of these hadith is taught anywhere else in the app.

const JOURNEY: DeepUnit = {
  key: "found-journey",
  topicId: "foundation",
  branchId: "foundation-journey",
  branch: { title: "Sunnahs of the journey", description: "Setting out on a Thursday, blessed early mornings, travelling by night, camping close together, caring for the weak, and hurrying home." },
  name: "sunnahs of the journey",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "set-out-on-thursday",
      title: "Setting out on a Thursday",
      line: "He ﷺ usually set out on his journeys on a Thursday.",
      facts: ["Told by Ka'b ibn Malik", "Al-khamis: Thursday", "He ﷺ rarely set out on another day"],
      source: hadith("bukhari", "2949", "Ka'b ibn Malik", "Sahih", "Ka'b ibn Malik used to say: rarely did the Messenger of Allah ﷺ set out on a journey on any day other than Thursday.", "set out for a journey on a day other than Thursday"),
      difficulty: 1,
      questions: [
        { q: "On which day did he ﷺ usually set out on a journey?", a: "Thursday", wrong: ["Saturday", "Sunday", "Tuesday"], why: "He ﷺ seldom set out for a journey on a day other than Thursday, Ka'b said." },
        { q: "How often did he ﷺ start a journey on another day?", a: "Rarely", wrong: ["Every week", "Always", "Every morning"], why: "Scarcely did he ﷺ set out on a day other than Thursday, Ka'b ibn Malik said." },
        { q: "Ka'b ibn Malik is the one who told us of the Thursday journeys.", tf: true, why: "Ka'b used to say: he ﷺ rarely set out on a day other than Thursday." }
      ]
    },
    {
      slug: "blessed-early-mornings",
      title: "Blessed early mornings",
      line: "He ﷺ asked Allah to bless his Ummah in its early mornings.",
      facts: ["Told by Sakhr al-Ghamidi", "He ﷺ sent groups out at the start of the day", "Sakhr, a trader, sent his goods out early and grew rich"],
      source: hadith("abudawud", "2606", "Sakhr al-Ghamidi", "Sahih (Al-Albani)", "Sakhr al-Ghamidi said: the Prophet ﷺ said: O Allah, bless my Ummah in their early mornings. When he ﷺ sent out a group, he sent them at the start of the day. Sakhr was a trader who sent out his goods at the start of the day, and he became rich and had much wealth.", "O Allah, bless my people in their early mornings"),
      difficulty: 1,
      questions: [
        { q: "Which part of the day did he ﷺ ask Allah to bless?", a: "The early morning", wrong: ["The midday heat", "Just before sunset", "Late at night"], why: "O Allah, bless my people in their early mornings, he ﷺ said." },
        { q: "Sakhr sent his goods out early in the day. What happened to him?", a: "He grew very rich", wrong: ["He lost everything", "He gave up trading", "He stopped sending goods"], why: "Sakhr sent his goods at the start of the day, and he had much wealth." },
        { q: "He ﷺ sent out groups at the start of the day.", tf: true, why: "When he sent out a group or an army, he sent them at the beginning of the day." }
      ]
    },
    {
      slug: "travel-by-night",
      title: "Travelling by night",
      line: "He ﷺ said: travel by night, the earth is crossed more easily.",
      facts: ["Told by Anas ibn Malik", "Ad-duljah: travelling in the night", "The road feels shorter at night"],
      source: hadith("abudawud", "2571", "Anas ibn Malik", "Sahih (Al-Albani)", "Anas ibn Malik said: the Messenger of Allah ﷺ said: keep to travelling by night, for the earth is crossed more easily at night.", "Keep to travelling by night, for the earth is traversed"),
      difficulty: 2,
      questions: [
        { q: "Why did he ﷺ say to keep to travelling by night?", a: "The earth is crossed easily", wrong: ["The shops are open", "The stars are bright", "The camels like it"], why: "For the earth is traversed more easily by night, he ﷺ said." },
        { q: "What does ad-duljah mean?", a: "Travelling by night", wrong: ["Resting at noon", "Riding very fast", "Camping by a well"], why: "Keep to ad-duljah, travelling by night, he ﷺ said." },
        { q: "Travelling part of the night can make the road feel shorter.", tf: true, why: "The earth is traversed more easily by night, he ﷺ said." }
      ]
    },
    {
      slug: "camp-close-together",
      title: "Camp close together",
      line: "Camping on a journey? Stay close together, not scattered.",
      facts: ["Told by Abu Tha'labah al-Khushani", "People had spread out in the valleys", "Then they camped so close a cloth could cover them"],
      source: hadith("abudawud", "2628", "Abu Tha'labah al-Khushani", "Sahih (Al-Albani)", "Abu Tha'labah al-Khushani said: when the people camped, they spread out in the mountain passes and valleys. The Messenger of Allah ﷺ said: your spreading out in these passes and valleys is only from Shaytan. After that, whenever they camped, they kept so close together that it was said: if a cloth were spread over them, it would cover them all.", "if a cloth were spread over them, it would cover them all"),
      difficulty: 2,
      questions: [
        { q: "When they camped, where had the people spread out?", a: "In the valleys and passes", wrong: ["On the city walls", "Inside the mosque", "On the ships"], why: "The people scattered in the glens and wadis, Abu Tha'labah said." },
        { q: "After his words, how did they camp?", a: "Close together", wrong: ["Far apart", "In the river", "On the hilltops"], why: "If a cloth were spread over them, it would cover them all, people said." },
        { q: "He ﷺ said spreading out in the valleys was from Shaytan.", tf: true, why: "Your scattering in these glens and wadis is only of the devil, he ﷺ said." }
      ]
    },
    {
      slug: "caring-for-the-weak",
      title: "At the back, for the weak",
      line: "On journeys, he ﷺ rode at the back to help the weak.",
      facts: ["Told by Jabir ibn Abdullah", "He ﷺ urged on the weak and slow", "He ﷺ let someone ride behind him, and made du'a for all"],
      source: hadith("abudawud", "2639", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir ibn Abdullah said: the Messenger of Allah ﷺ used to stay at the back when travelling, urging on the weak. He would let someone ride behind him, and he made du'a for them all.", "used to keep to the rear when travelling and urge on the weak"),
      difficulty: 1,
      questions: [
        { q: "Which part of the group did he ﷺ keep to when travelling?", a: "The back", wrong: ["The very front", "Far ahead", "Far to one side"], why: "He ﷺ used to keep to the rear when travelling, Jabir said." },
        { q: "Whom did he ﷺ urge on, riding at the back?", a: "The weak", wrong: ["The fastest riders", "The camels in front", "The guards ahead"], why: "He ﷺ would keep to the rear and urge on the weak, Jabir said." },
        { q: "He ﷺ would let someone ride behind him on his mount.", tf: true, why: "He would take someone up behind him and make du'a for them all." }
      ]
    },
    {
      slug: "hurry-home",
      title: "Hurry home when it is done",
      line: "Travel is hard; when your work is done, hurry home.",
      facts: ["Told by Abu Hurairah", "Travel keeps you from good food, drink and sleep", "When your work is done, go back quickly to your family"],
      source: hadith("bukhari", "1804", "Abu Hurairah", "Sahih", "Abu Hurairah said: the Prophet ﷺ said: travel is a piece of hardship, for it keeps a person from eating, drinking and sleeping properly. So when you have finished what you went for, hurry back to your family.", "as it prevents one from eating, drinking and sleeping properly"),
      difficulty: 1,
      questions: [
        { q: "What does travel keep a person from, he ﷺ said?", a: "Eating, drinking and sleeping well", wrong: ["Praying and fasting", "Speaking and smiling", "Reading and writing"], why: "Travel prevents one from eating, drinking and sleeping properly, he ﷺ said." },
        { q: "When your work on a journey is done, what should you do?", a: "Hurry back to your family", wrong: ["Stay away for a year", "Start another trip", "Wait for winter"], why: "When one's needs are fulfilled, one should return quickly to one's family." },
        { q: "Once your work is done, it is best to stay away a long time.", tf: false, why: "No. When your work is done, hurry back to your family, he ﷺ said." }
      ]
    }
  ]
};

export const FOUNDATION_JOURNEY_UNITS: readonly DeepUnit[] = [JOURNEY];
