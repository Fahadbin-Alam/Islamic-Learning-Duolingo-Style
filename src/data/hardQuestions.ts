import type { Challenge, LessonSource, TopicId } from "../types";
import { ayah, bukhari, muslim } from "./scalableCurriculum";

/**
 * Harder questions for the topics with the fewest questions to ask from memory (prayer, aqidah, fasting, zakat,
 * Hajj, hadith). They come into lessons from challenge level 3 (challengeLevel.ts): a long streak, "Hard" or
 * "Really hard". Each one is a fact its source says in so many words, checked on the cited ayah or hadith
 * (sunnah.com numbering); nothing scholars differ on.
 */

// The right answer's place among the four choices: each question puts it one place on from the one before, so it
// is in every place as often and cannot be guessed.
let nextPlace = 0;

function hard(id: string, prompt: string, answer: string, wrong: [string, string, string], why: string, source: LessonSource): Challenge {
  const labels = [...wrong];
  labels.splice(nextPlace, 0, answer);
  nextPlace = (nextPlace + 1) % 4;
  const choices = labels.map((label, index) => ({ id: String.fromCharCode(97 + index), label }));
  return {
    id: `hard_${id}`,
    type: "multiple_choice",
    prompt,
    choices,
    correctChoiceId: choices[labels.indexOf(answer)].id,
    explanation: why,
    source,
    resourceLabel: "Open source",
    resourceUrl: source.url
  };
}

const S = {
  q2_255: ayah("2:255", "Ayat al-Kursi", "Allah: there is no god but Him, the Ever-Living, the Sustainer. Neither drowsiness nor sleep overtakes Him."),
  b5013: bukhari(5013, "Abu Sa'id al-Khudri", "A third of the Quran", "The Prophet ﷺ said Surah Al-Ikhlas is equal to one third of the Quran."),
  q50_16: ayah("50:16", "Closer than the jugular vein", "We created man and know what his soul whispers to him, and We are closer to him than his jugular vein."),
  q2_97: ayah("2:97", "Jibril brought the Quran", "Jibril brought the Quran down upon the Prophet's heart, by Allah's permission."),
  m8: muslim(8, "Umar ibn al-Khattab", "The hadith of Jibril", "Iman is to believe in Allah, His angels, His Books, His messengers, the Last Day, and the Decree, its good and its bad."),
  b2736: bukhari(2736, "Abu Hurairah", "Ninety-nine names", "Allah has ninety-nine names, one hundred less one; whoever learns them will enter Paradise."),
  q42_11: ayah("42:11", "Nothing is like Him", "There is nothing like Him, and He is the All-Hearing, the All-Seeing."),
  q97_3: ayah("97:3", "Better than a thousand months", "The Night of Decree is better than a thousand months."),
  b38: bukhari(38, "Abu Hurairah", "Fasting Ramadan with faith", "Whoever fasts Ramadan with faith, hoping for Allah's reward, has all his past sins forgiven."),
  m1162: muslim(1162, "Abu Qatadah", "Fasting Arafah and Ashura", "Fasting the day of Arafah atones for the year before and the year after; fasting Ashura atones for the year before."),
  b1896: bukhari(1896, "Sahl ibn Sa'd", "The gate of Ar-Rayyan", "Paradise has a gate called Ar-Rayyan; only those who fasted will enter through it."),
  b1923: bukhari(1923, "Anas ibn Malik", "Blessing in suhur", "Take suhur, for there is blessing in it."),
  b1957: bukhari(1957, "Sahl ibn Sa'd", "Hurry to break the fast", "People will stay on the right path as long as they hurry to break the fast."),
  q2_184: ayah("2:184", "Making up missed fasts", "Whoever is ill or on a journey fasts the same number of other days."),
  q9_60: ayah("9:60", "Who zakat is for", "Zakat is for the poor, the needy, its collectors, bringing hearts together, freeing captives, people in debt, the cause of Allah and the stranded traveler."),
  m2588: muslim(2588, "Abu Hurairah", "Charity does not decrease wealth", "Charity does not decrease wealth, and Allah raises whoever is humble for His sake."),
  b1429: bukhari(1429, "Ibn Umar", "The upper hand", "The upper hand is better than the lower hand: the upper hand gives, the lower hand asks."),
  b1503: bukhari(1503, "Ibn Umar", "Zakat al-Fitr", "Zakat al-Fitr is one sa' of dates or barley on every Muslim, paid before people go out to the Eid prayer."),
  q2_276: ayah("2:276", "Allah grows charity", "Allah destroys interest and gives increase to charity."),
  q3_97: ayah("3:97", "Hajj for whoever is able", "Pilgrimage to the House is a duty to Allah on whoever is able to find a way to it."),
  b1773: bukhari(1773, "Abu Hurairah", "Hajj Mabrur", "One Umrah to the next wipes out the sins between them, and an accepted Hajj has no reward but Paradise."),
  b1521: bukhari(1521, "Abu Hurairah", "Coming back new", "Whoever does Hajj for Allah without evil talk or sin comes back as on the day his mother bore him."),
  q2_198: ayah("2:198", "Leaving Arafat", "When you leave Arafat, remember Allah at al-Mash'ar al-Haram."),
  q2_158: ayah("2:158", "Safa and Marwah", "As-Safa and al-Marwah are among the symbols of Allah."),
  q3_96: ayah("3:96", "The first House", "The first House set up for mankind is the one at Bakkah (Makkah), blessed and a guidance."),
  q2_127: ayah("2:127", "Raising the Ka'bah", "Ibrahim raised the foundations of the House with Ismail: our Lord, accept this from us."),
  b645: bukhari(645, "Ibn Umar", "Praying together", "Prayer in congregation is twenty-seven times better than prayer alone."),
  m82: muslim(82, "Jabir ibn Abdullah", "Leaving the prayer", "Between a man and shirk and disbelief is leaving the prayer."),
  b528: bukhari(528, "Abu Hurairah", "A river at the door", "The five prayers are like a river at your door that you wash in five times a day: no dirt is left."),
  q2_238: ayah("2:238", "The middle prayer", "Guard the prayers, and the middle prayer, and stand before Allah in devotion."),
  q29_45: ayah("29:45", "Prayer stops wrong", "Prayer keeps one away from indecency and wrongdoing, and remembering Allah is greater."),
  b631: bukhari(631, "Malik ibn al-Huwayrith", "Pray as you saw me pray", "The Prophet ﷺ said: pray as you have seen me praying."),
  b574: bukhari(574, "Abu Musa", "The two cool prayers", "Whoever prays the two cool prayers, Fajr and Asr, will enter Paradise."),
  b1: bukhari(1, "Umar ibn al-Khattab", "Actions and intentions", "Actions are only by intentions, and each person gets what they intended."),
  b13: bukhari(13, "Anas ibn Malik", "Love for your brother", "None of you truly believes until he wants for his brother what he wants for himself."),
  b6018: bukhari(6018, "Abu Hurayrah", "Say good or stay quiet", "Whoever believes in Allah and the Last Day should say what is good or keep quiet."),
  b6114: bukhari(6114, "Abu Hurayrah", "The truly strong", "The strong one is not the wrestler; the strong one controls himself when angry."),
  m55: muslim(55, "Tamim ad-Dari", "The religion is sincerity", "The religion is sincerity: to Allah, His Book, His Messenger, the leaders of the Muslims and all of them."),
  b69: bukhari(69, "Anas ibn Malik", "Make things easy", "Make things easy and do not make them hard; give good news and do not drive people away."),
  b10: bukhari(10, "Abdullah ibn Amr", "Safe from your tongue and hand", "A Muslim is one whose tongue and hand the Muslims are safe from.")
};

export const HARD_QUESTIONS: Partial<Record<TopicId, Challenge[]>> = {
  aqidah: [
    hard("aqidah_kursi", "Ayat al-Kursi is ayah ____ of Surah Al-Baqarah.", "255", ["183", "286", "152"], "Ayat al-Kursi is Al-Baqarah 2:255.", S.q2_255),
    hard("aqidah_ikhlas", "The Prophet ﷺ said Surah Al-Ikhlas equals ____ of the Quran.", "one third", ["one half", "one tenth", "one quarter"], "Surah Al-Ikhlas equals one third of the Quran.", S.b5013),
    hard("aqidah_vein", "Allah says He is closer to a person than their ____ vein.", "jugular", ["hand", "heart", "leg"], "Allah is closer to us than our jugular vein.", S.q50_16),
    hard("aqidah_jibril", "The angel who brought the Quran down to the Prophet ﷺ is ____.", "Jibril", ["Mikail", "Israfil", "Malik"], "Jibril brought the Quran down, by Allah's permission.", S.q2_97),
    hard("aqidah_qadr", "The sixth pillar of iman is belief in the ____.", "Decree (Qadr)", ["stars", "dreams", "saints"], "Iman: Allah, angels, Books, messengers, the Last Day and the Decree.", S.m8),
    hard("aqidah_names", "Allah has ____ names; whoever learns them enters Paradise.", "99", ["40", "70", "100"], "Allah has ninety-nine names, one hundred less one.", S.b2736),
    hard("aqidah_like", "\"There is nothing like Him\" is in Surah ____.", "Ash-Shura", ["Al-Fil", "Al-Kawthar", "Quraysh"], "Ash-Shura 42:11: there is nothing like Him.", S.q42_11)
  ],
  fasting: [
    hard("fasting_qadr", "Laylat al-Qadr is better than a thousand ____.", "months", ["days", "nights", "weeks"], "The Night of Decree is better than a thousand months.", S.q97_3),
    hard("fasting_faith", "Whoever fasts Ramadan with faith, hoping for reward, has past ____ forgiven.", "sins", ["debts", "fasts", "prayers"], "Fasting Ramadan with faith and hope wipes out past sins.", S.b38),
    hard("fasting_arafah", "Fasting the day of ____ wipes out sins of the year before and after.", "Arafah", ["Ashura", "Eid", "Friday"], "Arafah covers two years; Ashura covers one.", S.m1162),
    hard("fasting_ashura", "Fasting the day of Ashura wipes out the sins of the year ____.", "before", ["after", "of birth", "of Hajj"], "Ashura atones for the year before.", S.m1162),
    hard("fasting_rayyan", "The gate of Paradise only for those who fasted is called ____.", "Ar-Rayyan", ["As-Salam", "Al-Firdaws", "Al-Kawthar"], "Ar-Rayyan is the gate of those who fasted.", S.b1896),
    hard("fasting_suhur", "The Prophet ﷺ said: take suhur, for there is ____ in it.", "blessing", ["sleep", "danger", "nothing"], "There is blessing (barakah) in suhur.", S.b1923),
    hard("fasting_hurry", "People stay on the right path as long as they ____ to break the fast.", "hurry", ["wait", "forget", "refuse"], "Breaking the fast quickly keeps people on the right path.", S.b1957),
    hard("fasting_makeup", "A sick person or a traveler who misses fasts makes them up on ____.", "other days", ["Eid day", "no day", "Friday only"], "They fast the same number of other days.", S.q2_184)
  ],
  zakat: [
    hard("zakat_eight", "The Quran names ____ groups that zakat may go to.", "eight", ["three", "five", "twelve"], "At-Tawbah 9:60 names eight groups.", S.q9_60),
    hard("zakat_debt", "One group that zakat may go to is people in ____.", "debt", ["power", "sport", "school"], "People in debt are one of the eight groups.", S.q9_60),
    hard("zakat_decrease", "The Prophet ﷺ said charity does not ____ wealth.", "decrease", ["need", "follow", "change"], "Charity does not decrease wealth.", S.m2588),
    hard("zakat_upper", "The upper hand is better than the lower hand; the upper hand is the one that ____.", "gives", ["asks", "holds", "hides"], "The upper hand gives; the lower hand asks.", S.b1429),
    hard("zakat_fitr_when", "Zakat al-Fitr is paid before people go out to the ____ prayer.", "Eid", ["Fajr", "Jumu'ah", "Tarawih"], "It is paid before the Eid prayer.", S.b1503),
    hard("zakat_fitr_amount", "Zakat al-Fitr is one ____ of dates or barley.", "sa'", ["sack", "cup", "bag"], "One sa' of dates or barley, on every Muslim.", S.b1503),
    hard("zakat_increase", "Allah destroys interest and gives ____ to charity.", "increase", ["an end", "a limit", "a cost"], "Allah grows charity and destroys interest.", S.q2_276)
  ],
  hajj: [
    hard("hajj_able", "Hajj is a duty on whoever is ____ to make the journey.", "able", ["from Makkah", "an Arab", "over sixty"], "Hajj is due on whoever is able to find a way.", S.q3_97),
    hard("hajj_mabrur", "An accepted Hajj (Hajj Mabrur) has no reward but ____.", "Paradise", ["gold", "fame", "rest"], "The reward of an accepted Hajj is Paradise.", S.b1773),
    hard("hajj_umrah", "One Umrah to the next wipes out the sins ____ them.", "between", ["after", "before", "outside"], "Umrah to Umrah atones for what is between them.", S.b1773),
    hard("hajj_born", "Whoever does Hajj without evil talk or sin comes back like the day they were ____.", "born", ["married", "named", "taught"], "They come back free of sin, as on the day they were born.", S.b1521),
    hard("hajj_arafat", "Pilgrims leave ____ and remember Allah at al-Mash'ar al-Haram.", "Arafat", ["Madinah", "Taif", "Badr"], "Al-Baqarah 2:198: when you leave Arafat, remember Allah.", S.q2_198),
    hard("hajj_safa", "As-Safa and al-Marwah are among the ____ of Allah.", "symbols", ["cities", "angels", "names"], "As-Safa and al-Marwah are among the symbols of Allah.", S.q2_158),
    hard("hajj_bakkah", "The first House set up for people is the one at ____.", "Bakkah", ["Madinah", "Quds", "Taif"], "Bakkah is a name of Makkah, where the first House stands.", S.q3_96),
    hard("hajj_ismail", "Ibrahim raised the foundations of the Ka'bah with his son ____.", "Ismail", ["Ishaq", "Yusuf", "Yaqub"], "Ibrahim and Ismail raised the House together.", S.q2_127)
  ],
  prayer: [
    hard("prayer_27", "Prayer in congregation is ____ times better than praying alone.", "27", ["2", "10", "70"], "Praying together is twenty-seven times better.", S.b645),
    hard("prayer_leaving", "The Prophet ﷺ said between a man and shirk is leaving the ____.", "prayer", ["fast", "Hajj", "zakat"], "Leaving the prayer is what stands between a man and shirk.", S.m82),
    hard("prayer_river", "The five prayers are like washing in a ____ five times a day.", "river", ["desert", "cave", "garden"], "Five washes a day leave no dirt; so the prayers wipe out sins.", S.b528),
    hard("prayer_middle", "Allah says: guard the prayers, and the ____ prayer.", "middle", ["first", "last", "night"], "Al-Baqarah 2:238 names the middle prayer.", S.q2_238),
    hard("prayer_stops", "Prayer keeps a person away from indecency and ____.", "wrongdoing", ["sleep", "food", "travel"], "Al-Ankabut 29:45: prayer stops indecency and wrongdoing.", S.q29_45),
    hard("prayer_seen", "The Prophet ﷺ said: pray as you have ____ me praying.", "seen", ["heard", "read", "dreamed"], "We learn the prayer from how he ﷺ prayed.", S.b631),
    hard("prayer_cool", "The two cool prayers that bring Paradise are Fajr and ____.", "Asr", ["Isha", "Maghrib", "Dhuhr"], "Whoever prays Fajr and Asr enters Paradise.", S.b574)
  ],
  hadith: [
    hard("hadith_intention", "The first hadith of Sahih al-Bukhari: actions are judged by ____.", "intentions", ["results", "looks", "numbers"], "Actions are only by intentions.", S.b1),
    hard("hadith_brother", "None truly believes until he wants for his brother what he wants for ____.", "himself", ["his teacher", "his king", "no one"], "Want for others the good you want for yourself.", S.b13),
    hard("hadith_silent", "Whoever believes in Allah and the Last Day should say good or stay ____.", "quiet", ["home", "awake", "away"], "Say what is good, or keep quiet.", S.b6018),
    hard("hadith_anger", "The truly strong one controls himself when ____.", "angry", ["hungry", "tired", "rich"], "Real strength is holding yourself back in anger.", S.b6114),
    hard("hadith_sincerity", "The Prophet ﷺ said: the religion is ____.", "sincerity", ["rules", "wealth", "speech"], "The religion is sincerity, to Allah, His Book, His Messenger and the Muslims.", S.m55),
    hard("hadith_easy", "The Prophet ﷺ said: make things easy, do not make them ____.", "hard", ["short", "late", "loud"], "Make things easy and give good news.", S.b69),
    hard("hadith_tongue", "A Muslim is one whose tongue and ____ other Muslims are safe from.", "hand", ["house", "wealth", "eyes"], "A Muslim harms no one with his tongue or hand.", S.b10)
  ]
};

/** Every hard question, for the content tests and the translation list. */
export const ALL_HARD_QUESTIONS: Challenge[] = Object.values(HARD_QUESTIONS).flat();
