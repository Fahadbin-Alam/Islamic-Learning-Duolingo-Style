import { hadith, type DeepUnit } from "./deepKit";

// One more Hajj unit: Makkah, the beloved city, from Jami at-Tirmidhi, Sunan Ibn Majah, Sunan an-Nasa'i, Sunan Abi
// Dawud and Sahih al-Bukhari. The best land on Allah's earth, a prayer in the Sacred Mosque worth a hundred thousand,
// the Hijr that is part of the House, the du'a between the two corners, a night and a bath before entering Makkah, and
// Hajj that goes on even after Ya'juj and Ma'juj. Every card is one sahih or hasan hadith with its number, narrator and
// grade, and its exact English words to highlight, and none of these hadith is taught anywhere else in the app.

const MAKKAH: DeepUnit = {
  key: "hajj-makkah-the-beloved-city",
  topicId: "hajj",
  branchId: "hajj-makkah-the-beloved-city",
  branch: { title: "Makkah, the beloved city", description: "The best land on Allah's earth, a hundred thousand prayers, part of the House, a du'a between the corners, a bath before entering, and Hajj to the very end." },
  name: "Makkah, the beloved city",
  kind: "skill",
  lessonType: "skill",
  lessons: [
    {
      slug: "the-best-of-allahs-earth",
      title: "The best of Allah's earth",
      line: "He ﷺ told Makkah: you are the land most beloved to Allah.",
      facts: ["Told by Abdullah ibn Adi", "He ﷺ stood at al-Hazwarah in Makkah", "He ﷺ left only because he was driven out"],
      source: hadith("tirmidhi", "3925", "Abdullah ibn Adi ibn al-Hamra", "Sahih (Al-Albani)", "Abdullah ibn Adi ibn al-Hamra said: I saw the Messenger of Allah ﷺ standing at al-Hazwarah, and he said: by Allah, you are the best of Allah's earth and the most beloved of Allah's earth to Allah, and had I not been driven out of you, I would not have left.", "and if it were not that I was expelled from you I would not have left"),
      difficulty: 1,
      questions: [
        { q: "What did he ﷺ call Makkah?", a: "The best of Allah's earth", wrong: ["A small market town", "A land of rivers", "A city of kings"], why: "By Allah, you are the best of Allah's earth, he ﷺ said to Makkah." },
        { q: "What made him ﷺ leave Makkah, he said?", a: "Being driven out", wrong: ["A great flood", "The wells running dry", "A cold winter"], why: "Had I not been driven out of you, I would not have left, he ﷺ told Makkah." },
        { q: "Makkah is the land most beloved to Allah.", tf: true, why: "The most beloved of Allah's earth to Allah, he ﷺ said, standing in Makkah." }
      ]
    },
    {
      slug: "a-hundred-thousand-prayers",
      title: "A hundred thousand prayers",
      line: "One prayer in the Sacred Mosque is better than 100,000.",
      facts: ["Told by Jabir ibn Abdullah", "The Sacred Mosque is around the Ka'bah", "In his ﷺ masjid: better than 1,000"],
      source: hadith("ibnmajah", "1406", "Jabir ibn Abdullah", "Sahih (Al-Albani)", "Jabir said: the Messenger of Allah ﷺ said: one prayer in my masjid is better than a thousand prayers elsewhere, except the Sacred Mosque, and one prayer in the Sacred Mosque is better than a hundred thousand prayers elsewhere.", "and one prayer in the Sacred Mosque is better than one hundred thousand prayers elsewhere"),
      difficulty: 1,
      questions: [
        { q: "One prayer in the Sacred Mosque is better than how many?", a: "A hundred thousand", wrong: ["Ten", "Seventy", "Five hundred"], why: "Better than one hundred thousand prayers elsewhere, he ﷺ said of the Sacred Mosque." },
        { q: "Which masjid is built around the Ka'bah?", a: "The Sacred Mosque", wrong: ["Masjid Quba", "Al-Aqsa", "Masjid al-Qiblatayn"], why: "Al-Masjid al-Haram, the Sacred Mosque, surrounds the Ka'bah in Makkah." },
        { q: "A prayer in the Sacred Mosque counts as just one prayer.", tf: false, why: "No. One prayer in the Sacred Mosque is better than 100,000 prayers elsewhere, he ﷺ said." }
      ]
    },
    {
      slug: "part-of-the-house",
      title: "Part of the House",
      line: "The Hijr beside the Ka'bah is part of the House.",
      facts: ["Told by Aishah", "Aishah wanted to pray inside the House", "Her people built the Ka'bah too small"],
      source: hadith("nasai", "2912", "Aishah", "Hasan Sahih (Al-Albani)", "Aishah said: I wanted to enter the House and pray in it, so the Messenger of Allah ﷺ took me by the hand into the Hijr and said: if you want to enter the House, pray here, for it is part of the House, but your people made it too small when they built it.", "If you want to enter the House, then pray here, for it is part of the House, but your people made it too small when they built it"),
      difficulty: 2,
      questions: [
        { q: "Where did he ﷺ take Aishah to pray?", a: "Into the Hijr", wrong: ["Onto the roof", "Out to the valley", "Into a tent"], why: "He ﷺ took her by the hand into the Hijr and said: pray here." },
        { q: "Why could Aishah pray in the Hijr instead?", a: "The Hijr is part of the House", wrong: ["The Hijr has more shade", "The Hijr is cooler", "The Hijr is closer to Zamzam"], why: "Pray here, for it is part of the House, he ﷺ told Aishah." },
        { q: "Her people built the Ka'bah smaller than it was meant to be.", tf: true, why: "Your people made it too small when they built it, he ﷺ told Aishah." }
      ]
    },
    {
      slug: "between-the-two-corners",
      title: "Between the two corners",
      line: "Between the two corners, he ﷺ asked for good in both worlds.",
      facts: ["Told by Abdullah ibn as-Sa'ib", "The Yemeni Corner and the Black Stone", "Said while going around the Ka'bah"],
      source: hadith("abudawud", "1892", "Abdullah ibn as-Sa'ib", "Hasan (Al-Albani)", "Abdullah ibn as-Sa'ib said: I heard the Messenger of Allah ﷺ say between the two corners: our Lord, give us good in this world and good in the Hereafter, and guard us from the punishment of the Fire.", "O Allah, bring us a blessing in this world and a blessing in the next and guard us from punishment of Hell"),
      difficulty: 2,
      questions: [
        { q: "What did he ﷺ ask for between the two corners?", a: "Good in this world and the next", wrong: ["Rain for the crops", "A long, easy road", "A big house"], why: "A blessing in this world and a blessing in the next, he ﷺ asked between the corners." },
        { q: "What did he ﷺ ask Allah to guard us from?", a: "The punishment of the Fire", wrong: ["The summer heat", "The big crowds", "Hunger on the road"], why: "Guard us from punishment of Hell, he ﷺ said between the two corners." },
        { q: "He ﷺ made this du'a while going around the Ka'bah.", tf: true, why: "Between the two corners of the Ka'bah, Abdullah ibn as-Sa'ib heard him ﷺ say it." }
      ]
    },
    {
      slug: "ready-to-enter-makkah",
      title: "Ready to enter Makkah",
      line: "Ibn Umar slept at Dhi Tuwa, then bathed before entering Makkah.",
      facts: ["Told by Nafi'", "Dhi Tuwa: a valley at the edge of Makkah", "The Prophet ﷺ did the same"],
      source: hadith("bukhari", "1573", "Nafi'", "Sahih", "Nafi' said: when Ibn Umar reached the sacred land of Makkah, he would spend the night at Dhi Tuwa, then pray Fajr and take a bath, and he said the Prophet ﷺ used to do the same.", "he would pass the night at Dhi-Tuwa and then offer the Fajr prayer and take a bath"),
      difficulty: 2,
      questions: [
        { q: "Where did Ibn Umar spend the night before Makkah?", a: "At Dhi Tuwa", wrong: ["At Badr", "At Uhud", "At Tabuk"], why: "He would pass the night at Dhi-Tuwa, then pray Fajr and take a bath, Nafi' said." },
        { q: "What did Ibn Umar do after Fajr, before entering?", a: "He took a bath", wrong: ["He slept again", "He ate a big meal", "He rode away"], why: "Then offer the Fajr prayer and take a bath, Nafi' said of Ibn Umar." },
        { q: "Ibn Umar said the Prophet ﷺ did the same.", tf: true, why: "He used to say that the Prophet ﷺ used to do the same, Nafi' said." }
      ]
    },
    {
      slug: "hajj-to-the-very-end",
      title: "Hajj to the very end",
      line: "People will keep making Hajj even after Ya'juj and Ma'juj.",
      facts: ["Told by Abu Sa'id al-Khudri", "Ya'juj and Ma'juj: Gog and Magog", "Hajj and Umrah to the Ka'bah go on"],
      source: hadith("bukhari", "1593", "Abu Sa'id al-Khudri", "Sahih", "Abu Sa'id al-Khudri said: the Prophet ﷺ said: people will keep performing Hajj and Umrah to the Ka'bah even after Ya'juj and Ma'juj come out.", "even after the appearance of Gog and Magog"),
      difficulty: 3,
      questions: [
        { q: "What will people keep doing after Ya'juj and Ma'juj?", a: "Hajj and Umrah", wrong: ["Racing horses", "Sailing to islands", "Hunting in the hills"], why: "People will keep performing Hajj and Umrah even after Gog and Magog, he ﷺ said." },
        { q: "Where will people keep going for Hajj and Umrah?", a: "To the Ka'bah", wrong: ["To a new city", "To a far island", "To the mountains"], why: "Hajj and Umrah to the Ka'bah even after Gog and Magog appear, he ﷺ said." },
        { q: "Hajj will stop the day Ya'juj and Ma'juj come out.", tf: false, why: "No. People will keep making Hajj even after the appearance of Gog and Magog, he ﷺ said." }
      ]
    }
  ]
};

export const HAJJ_MAKKAH_UNITS: DeepUnit[] = [MAKKAH];
