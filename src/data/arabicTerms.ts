// Every term here was checked by two reviewers. Only add a term you are sure of.

export interface ArabicTerm {
  ar: string;
  translit: string;
  meaning: string;
}

export const TOPIC_ARABIC: Record<string, ArabicTerm> = {
  foundation: { ar: "الأساسيات", translit: "Al-asasiyyat", meaning: "The basics" },
  prayer: { ar: "الصلاة", translit: "As-salah", meaning: "Prayer" },
  aqidah: { ar: "العقيدة والإيمان", translit: "Al-aqidah wal-iman", meaning: "Creed and faith" },
  quran_tafseer: { ar: "القرآن والتفسير", translit: "Al-Quran wat-tafsir", meaning: "Quran and its explanation" },
  manners: { ar: "الآداب", translit: "Al-adab", meaning: "Manners" },
  fasting: { ar: "الصيام", translit: "As-siyam", meaning: "Fasting" },
  zakat: { ar: "الزكاة", translit: "Az-zakah", meaning: "Purifying charity" },
  hajj: { ar: "الحج", translit: "Al-Hajj", meaning: "Pilgrimage" },
  marriage: { ar: "الزواج", translit: "Az-zawaj", meaning: "Marriage" },
  sahabah: { ar: "الصحابة", translit: "As-Sahabah", meaning: "The Companions" },
  prophets: { ar: "قصص الأنبياء", translit: "Qasas al-anbiya", meaning: "Stories of the prophets" },
  women_of_the_book: { ar: "نساء القرآن", translit: "Nisa al-Quran", meaning: "Women of the Quran" },
  hadith: { ar: "الحديث", translit: "Al-hadith", meaning: "The Prophet's sayings" }
};

export const BRANCH_ARABIC: Record<string, ArabicTerm> = {
  // Foundation: greetings, daily words and first worship
  "foundation-greetings": { ar: "التحية", translit: "At-tahiyyah", meaning: "The greeting" },
  "foundation-daily-words": { ar: "الأذكار اليومية", translit: "Al-adhkar al-yawmiyyah", meaning: "Daily remembrances" },
  "foundation-phrases-rhythm": { ar: "العبارات اليومية", translit: "Al-'ibarat al-yawmiyyah", meaning: "Daily phrases" },
  "foundation-home-adab": { ar: "آداب البيت والطعام", translit: "Adab al-bayt wat-ta'am", meaning: "Home and food manners" },
  "foundation-first-worship-rhythm": { ar: "بِدَايَةُ الْعِبَادَةِ", translit: "Bidayat al-'ibadah", meaning: "Starting worship" },

  // Prayer: wudu, salah and its parts
  "prayer-wudu": { ar: "الوضوء", translit: "Al-wudu", meaning: "Washing for prayer" },
  "prayer-salah-basics": { ar: "أساسيات الصلاة", translit: "Asasiyyat as-salah", meaning: "Prayer basics" },
  "prayer-times": { ar: "أوقات الصلاة", translit: "Awqat as-salah", meaning: "Prayer times" },
  "prayer-adhan-and-iqamah": { ar: "الأذان والإقامة", translit: "Al-adhan wal-iqamah", meaning: "Calls to prayer" },
  "prayer-ruku-and-sujud": { ar: "الركوع والسجود", translit: "Ar-ruku was-sujud", meaning: "Bowing and prostrating" },
  "prayer-tashahhud": { ar: "التشهد", translit: "At-tashahhud", meaning: "The testimony in prayer" },
  "prayer-khushu": { ar: "الخشوع", translit: "Al-khushu", meaning: "Humble focus" },
  "prayer-invalidators-of-salah": { ar: "مبطلات الصلاة", translit: "Mubtilat as-salah", meaning: "Prayer breakers" },
  "prayer-congregational-prayer": { ar: "صلاة الجماعة", translit: "Salat al-jama'ah", meaning: "Group prayer" },
  "prayer-missed-prayers": { ar: "قضاء الصلاة", translit: "Qada as-salah", meaning: "Making up prayers" },

  // Aqidah: belief in Allah and the pillars of faith
  "aqidah-tawhid": { ar: "التوحيد", translit: "At-tawhid", meaning: "Oneness of Allah" },
  "aqidah-pillars-of-iman": { ar: "أركان الإيمان", translit: "Arkan al-iman", meaning: "Pillars of faith" },
  "aqidah-names-and-attributes": { ar: "الأسماء والصفات", translit: "Al-asma was-sifat", meaning: "Names and attributes" },
  "aqidah-lived-iman": { ar: "الإيمان والعمل", translit: "Al-iman wal-amal", meaning: "Faith and deeds" },

  // Quran and tafsir: one branch per surah
  "quran-surah-fatihah": { ar: "سورة الفاتحة", translit: "Surat Al-Fatihah", meaning: "The Opening" },
  "quran-surah-baqarah": { ar: "سورة البقرة", translit: "Surat Al-Baqarah", meaning: "The Cow" },
  "quran-surah-ali-imran": { ar: "سورة آل عمران", translit: "Surat Ali Imran", meaning: "Family of Imran" },
  "quran-surah-nisa": { ar: "سورة النساء", translit: "Surat An-Nisa", meaning: "The Women" },
  "quran-surah-maidah": { ar: "سورة المائدة", translit: "Surat Al-Ma'idah", meaning: "The Table Spread" },
  "quran-surah-yusuf": { ar: "سورة يوسف", translit: "Surat Yusuf", meaning: "Joseph" },
  "quran-surah-maryam": { ar: "سورة مريم", translit: "Surat Maryam", meaning: "Mary" },
  "quran-surah-kahf": { ar: "سورة الكهف", translit: "Surat Al-Kahf", meaning: "The Cave" },
  "quran-surah-yasin": { ar: "سورة يس", translit: "Surat Ya-Sin", meaning: "Letters Ya and Sin" },
  "quran-surah-mulk": { ar: "سورة الملك", translit: "Surat Al-Mulk", meaning: "The Kingdom" },

  // Manners: everyday adab
  "manners-parents-family": { ar: "بر الوالدين", translit: "Birr al-walidayn", meaning: "Kindness to parents" },
  "manners-rahmah": { ar: "الرحمة", translit: "Ar-rahmah", meaning: "Mercy" },

  // Fasting: purpose, rules and Ramadan
  "fasting-purpose": { ar: "حكمة الصيام", translit: "Hikmat as-siyam", meaning: "Wisdom of fasting" },
  "fasting-times-and-rules": { ar: "أحكام الصيام", translit: "Ahkam as-siyam", meaning: "Rules of fasting" },
  "fasting-protection": { ar: "حفظ الصيام", translit: "Hifz as-siyam", meaning: "Protecting the fast" },
  "fasting-ramadan-growth": { ar: "شهر رمضان", translit: "Shahr Ramadan", meaning: "Month of Ramadan" },

  // Zakat: duty, recipients and generosity
  "zakat-recipients": { ar: "مصارف الزكاة", translit: "Masarif az-zakah", meaning: "Zakat recipients" },

  // Hajj: duty, rites and sacred sites
  "hajj-duty": { ar: "فريضة الحج", translit: "Faridat al-Hajj", meaning: "The duty of Hajj" },
  "hajj-rites": { ar: "مناسك الحج", translit: "Manasik al-Hajj", meaning: "Rites of Hajj" },
  "hajj-major-stations": { ar: "المشاعر المقدسة", translit: "Al-Masha'ir al-Muqaddasah", meaning: "Sacred sites" },
  "hajj-lessons": { ar: "دروس الحج", translit: "Durus al-Hajj", meaning: "Lessons of Hajj" },

  // Sahabah: one branch per companion
  "sahabi-abu-bakr": { ar: "أبو بكر الصديق", translit: "Abu Bakr as-Siddiq", meaning: "The truthful one" },
  "sahabi-umar-ibn-al-khattab": { ar: "عمر بن الخطاب", translit: "Umar ibn al-Khattab", meaning: "Second caliph" },
  "sahabi-uthman-ibn-affan": { ar: "عثمان بن عفان", translit: "Uthman ibn Affan", meaning: "Third caliph" },
  "sahabi-ali-ibn-abi-talib": { ar: "علي بن أبي طالب", translit: "Ali ibn Abi Talib", meaning: "Fourth caliph" },
  "sahabi-khalid-ibn-al-walid": { ar: "خالد بن الوليد", translit: "Khalid ibn al-Walid", meaning: "Sword of Allah" },
  "sahabi-bilal-ibn-rabah": { ar: "بلال بن رباح", translit: "Bilal ibn Rabah", meaning: "First muezzin" },
  "sahabi-abu-ubaydah-ibn-al-jarrah": { ar: "أبو عبيدة بن الجراح", translit: "Abu Ubaydah ibn al-Jarrah", meaning: "Trustee of the Ummah" },
  "sahabi-talhah-ibn-ubaydillah": { ar: "طلحة بن عبيد الله", translit: "Talhah ibn Ubaydillah", meaning: "Promised Paradise" },
  "sahabi-az-zubayr-ibn-al-awwam": { ar: "الزبير بن العوام", translit: "Az-Zubayr ibn al-Awwam", meaning: "The Prophet's disciple" },
  "sahabi-sad-ibn-abi-waqqas": { ar: "سعد بن أبي وقاص", translit: "Sa'd ibn Abi Waqqas", meaning: "First arrow for Islam" },
  "sahabi-salman-al-farisi": { ar: "سلمان الفارسي", translit: "Salman al-Farisi", meaning: "Salman the Persian" },
  "sahabi-abu-dharr-al-ghifari": { ar: "أبو ذر الغفاري", translit: "Abu Dharr al-Ghifari", meaning: "From Ghifar tribe" },
  "sahabi-abdullah-ibn-masud": { ar: "عبد الله بن مسعود", translit: "Abdullah ibn Mas'ud", meaning: "Quran reciter" },
  "sahabi-anas-ibn-malik": { ar: "أنس بن مالك", translit: "Anas ibn Malik", meaning: "The Prophet's servant" },

  // Women of the Book: women of the Quran and the Mothers of the Believers
  "women-quran": { ar: "النساء في القرآن", translit: "An-nisa fil-Quran", meaning: "Women in the Quran" },
  "women-mothers": { ar: "أمهات المؤمنين", translit: "Ummahat al-muminin", meaning: "Mothers of the Believers" },
  "women-quran-depth": { ar: "النساء في القرآن", translit: "An-nisa fil-Quran", meaning: "Women in the Quran" },
  "women-mothers-depth": { ar: "أمهات المؤمنين", translit: "Ummahat al-muminin", meaning: "Mothers of the Believers" },
  "women-virtues-and-legacy": { ar: "الفضائل والإرث", translit: "Al-fada'il wal-irth", meaning: "Virtues and legacy" },
};

export const NODE_ARABIC: Record<string, ArabicTerm> = {
  // Foundation: greetings, daily words and first worship
  "foundation-niyyah": { ar: "السَّلَامُ عَلَيْكُمْ", translit: "As-salamu alaykum", meaning: "Peace be upon you" },
  "foundation-character": { ar: "وَعَلَيْكُمُ السَّلَامُ", translit: "Wa alaykum as-salam", meaning: "And upon you peace" },
  "foundation-guidance": { ar: "الْحَمْدُ لِلَّهِ", translit: "Al-hamdu lillah", meaning: "All praise to Allah" },
  "foundation-bismillah": { ar: "بِسْمِ اللَّهِ", translit: "Bismillah", meaning: "In Allah's name" },
  "foundation-sneeze": { ar: "يَرْحَمُكَ اللَّهُ", translit: "Yarhamuk-Allah", meaning: "Allah have mercy" },
  "foundation-phrases-rhythm-morning-remembrance": { ar: "أذكار الصباح", translit: "Adhkar as-sabah", meaning: "Morning remembrance" },
  "foundation-phrases-rhythm-thanks-language": { ar: "الشكر", translit: "Ash-shukr", meaning: "Gratitude" },
  "foundation-phrases-rhythm-future-speech": { ar: "إِنْ شَاءَ اللَّهُ", translit: "In sha Allah", meaning: "If Allah wills" },
  "foundation-phrases-rhythm-seeking-forgiveness": { ar: "أَسْتَغْفِرُ اللَّهَ", translit: "Astaghfirullah", meaning: "I seek Allah's forgiveness" },
  "foundation-home-adab-entering-home": { ar: "السَّلَامُ عَلَيْكُمْ", translit: "As-salamu alaykum", meaning: "Peace be upon you" },
  "foundation-home-adab-table-beginning": { ar: "بِسْمِ اللَّهِ", translit: "Bismillah", meaning: "In Allah's name" },
  "foundation-home-adab-right-hand": { ar: "كُلْ بِيَمِينِكَ", translit: "Kul bi-yaminik", meaning: "Eat with your right hand" },
  "foundation-home-adab-after-food": { ar: "الْحَمْدُ لِلَّهِ", translit: "Al-hamdu lillah", meaning: "All praise to Allah" },
  "foundation-first-worship-rhythm-clean-before-prayer": { ar: "الطهارة", translit: "At-taharah", meaning: "Purity" },
  "foundation-first-worship-rhythm-hear-the-call": { ar: "الصلاة", translit: "As-salah", meaning: "Prayer" },

  // Prayer: wudu, salah and its parts
  "prayer-wudu-what-wudu-is": { ar: "الوضوء", translit: "Al-wudu", meaning: "Washing for prayer" },
  "prayer-wudu-conditions-before-wudu": { ar: "شروط الوضوء", translit: "Shurut al-wudu", meaning: "Conditions of wudu" },
  "prayer-wudu-intention-basics": { ar: "النية", translit: "An-niyyah", meaning: "Intention" },
  "prayer-wudu-rinse-mouth": { ar: "المضمضة", translit: "Al-madmadah", meaning: "Rinsing the mouth" },
  "prayer-wudu-rinse-nose": { ar: "الاستنشاق", translit: "Al-istinshaq", meaning: "Rinsing the nose" },
  "prayer-wudu-wash-face": { ar: "غسل الوجه", translit: "Ghasl al-wajh", meaning: "Washing the face" },
  "prayer-wudu-wash-arms": { ar: "غسل اليدين إلى المرفقين", translit: "Ghasl al-yadayn ila al-mirfaqayn", meaning: "Washing arms to the elbows" },
  "prayer-wudu-wipe-head": { ar: "مسح الرأس", translit: "Mash ar-ra's", meaning: "Wiping the head" },
  "prayer-wudu-wash-feet": { ar: "غسل الرجلين", translit: "Ghasl ar-rijlayn", meaning: "Washing the feet" },
  "prayer-wudu-fard-acts": { ar: "فرائض الوضوء", translit: "Fara'id al-wudu", meaning: "Required acts of wudu" },
  "prayer-wudu-sunnah-acts": { ar: "سنن الوضوء", translit: "Sunan al-wudu", meaning: "Sunnah acts of wudu" },
  "prayer-wudu-what-breaks-wudu": { ar: "نواقض الوضوء", translit: "Nawaqid al-wudu", meaning: "Wudu breakers" },
  "prayer-wudu-bathroom-etiquette": { ar: "آداب قضاء الحاجة", translit: "Adab qada al-hajah", meaning: "Bathroom manners" },
  "prayer-salah-basics-five-daily-prayers": { ar: "الصلوات الخمس", translit: "As-salawat al-khams", meaning: "The five prayers" },
  "prayer-salah-basics-rakah-overview": { ar: "الركعة", translit: "Ar-rak'ah", meaning: "One prayer unit" },
  "prayer-salah-basics-conditions-before-salah": { ar: "شروط الصلاة", translit: "Shurut as-salah", meaning: "Conditions of prayer" },
  "prayer-salah-basics-pillars-and-obligations": { ar: "أركان الصلاة وواجباتها", translit: "Arkan as-salah wa wajibatuha", meaning: "Pillars and duties of prayer" },
  "prayer-times-fajr-to-isha": { ar: "من الفجر إلى العشاء", translit: "Min al-fajr ila al-isha", meaning: "From dawn to night" },
  "prayer-times-guarding-the-first-part": { ar: "أول الوقت", translit: "Awwal al-waqt", meaning: "Start of the time" },
  "prayer-adhan-and-iqamah-what-the-adhan-is": { ar: "الأذان", translit: "Al-adhan", meaning: "Call to prayer" },
  "prayer-adhan-and-iqamah-what-the-iqamah-does": { ar: "الإقامة", translit: "Al-iqamah", meaning: "Call to stand" },
  "prayer-ruku-and-sujud-what-ruku-teaches": { ar: "الركوع", translit: "Ar-ruku", meaning: "Bowing" },
  "prayer-ruku-and-sujud-rising-from-ruku": { ar: "الرفع من الركوع", translit: "Ar-raf' min ar-ruku", meaning: "Rising from bowing" },
  "prayer-ruku-and-sujud-what-sujud-teaches": { ar: "السجود", translit: "As-sujud", meaning: "Prostration" },
  "prayer-ruku-and-sujud-seven-points-of-sujud": { ar: "أعضاء السجود السبعة", translit: "A'da as-sujud as-sab'ah", meaning: "Seven prostration points" },
  "prayer-ruku-and-sujud-sitting-between-sujud": { ar: "الجلسة بين السجدتين", translit: "Al-jalsah bayna as-sajdatayn", meaning: "Sitting between prostrations" },
  "prayer-tashahhud-wording-of-tashahhud": { ar: "التَّحِيَّاتُ لِلَّهِ", translit: "At-tahiyyatu lillah", meaning: "Greetings are for Allah" },
  "prayer-tashahhud-taslim-ends-the-prayer": { ar: "التسليم", translit: "At-taslim", meaning: "Ending with salam" },
  "prayer-khushu-what-khushu-is": { ar: "الخشوع", translit: "Al-khushu", meaning: "Humble focus" },
  "prayer-invalidators-of-salah-what-invalidates-salah": { ar: "مبطلات الصلاة", translit: "Mubtilat as-salah", meaning: "Prayer breakers" },
  "prayer-invalidators-of-salah-purity-and-prayer-validity": { ar: "الطهارة", translit: "At-taharah", meaning: "Purity" },
  "prayer-congregational-prayer-why-jamaah-matters": { ar: "صلاة الجماعة", translit: "Salat al-jama'ah", meaning: "Group prayer" },
  "prayer-congregational-prayer-following-the-imam": { ar: "متابعة الإمام", translit: "Mutaba'at al-imam", meaning: "Following the imam" },
  "prayer-congregational-prayer-joining-late": { ar: "المسبوق", translit: "Al-masbuq", meaning: "Late joiner" },
  "prayer-congregational-prayer-masjid-etiquette": { ar: "آداب المسجد", translit: "Adab al-masjid", meaning: "Mosque manners" },

  // Aqidah: belief in Allah and the pillars of faith
  "aqidah-tawhid-allah-alone": { ar: "لَا إِلَهَ إِلَّا اللَّهُ", translit: "La ilaha illallah", meaning: "No god but Allah" },
  "aqidah-tawhid-ikhlas-and-purity": { ar: "الإخلاص", translit: "Al-ikhlas", meaning: "Sincerity" },
  "aqidah-tawhid-calling-on-allah": { ar: "الدعاء", translit: "Ad-du'a", meaning: "Calling on Allah" },
  "aqidah-pillars-of-iman-what-iman-covers": { ar: "الإيمان", translit: "Al-iman", meaning: "Faith" },
  "aqidah-pillars-of-iman-angels-books-messengers": { ar: "الملائكة والكتب والرسل", translit: "Al-mala'ikah wal-kutub war-rusul", meaning: "Angels, books, messengers" },
  "aqidah-pillars-of-iman-the-last-day": { ar: "اليوم الآخر", translit: "Al-yawm al-akhir", meaning: "The Last Day" },
  "aqidah-pillars-of-iman-qadar": { ar: "القدر", translit: "Al-qadar", meaning: "Divine decree" },
  "aqidah-names-and-attributes-why-names-matter": { ar: "معرفة الله", translit: "Ma'rifatullah", meaning: "Knowing Allah" },
  "aqidah-names-and-attributes-mercy-and-knowledge": { ar: "الرحمن، العليم", translit: "Ar-Rahman, Al-Alim", meaning: "Most Merciful, All-Knowing" },
  "aqidah-names-and-attributes-majesty-and-authority": { ar: "الملك، العزيز", translit: "Al-Malik, Al-Aziz", meaning: "The King, The Mighty" },
  "aqidah-names-and-attributes-using-the-names": { ar: "أسماء الله الحسنى", translit: "Asma Allah al-husna", meaning: "Allah's beautiful names" },
  "aqidah-lived-iman-belief-and-obedience": { ar: "الطاعة", translit: "At-ta'ah", meaning: "Obedience" },
  "aqidah-lived-iman-belief-under-pressure": { ar: "الثبات", translit: "Ath-thabat", meaning: "Steadfastness" },
  "aqidah-lived-iman-repentance-and-hope": { ar: "التوبة والرجاء", translit: "At-tawbah war-raja", meaning: "Repentance and hope" },
  "aqidah-lived-iman-certainty-and-humility": { ar: "اليقين والتواضع", translit: "Al-yaqin wat-tawadu", meaning: "Certainty and humility" },

  // Quran and tafsir: one branch per surah
  "quran-surah-fatihah-opening-and-names": { ar: "فاتحة الكتاب", translit: "Fatihat al-Kitab", meaning: "Opening of the Book" },
  "quran-surah-fatihah-praise-and-lordship": { ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translit: "Al-hamdu lillahi rabbil-alamin", meaning: "All praise is for Allah, Lord of the worlds" },
  "quran-surah-fatihah-worship-and-help": { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translit: "Iyyaka na'budu wa iyyaka nasta'in", meaning: "You alone we worship, You alone we ask for help" },
  "quran-surah-fatihah-straight-path": { ar: "الصراط المستقيم", translit: "As-sirat al-mustaqim", meaning: "The straight path" },
  "quran-surah-baqarah-opening-guidance": { ar: "هُدًى لِلْمُتَّقِينَ", translit: "Hudan lil-muttaqin", meaning: "Guidance for the God-conscious" },
  "quran-surah-baqarah-qualities-of-guided": { ar: "يُؤْمِنُونَ بِالْغَيْبِ", translit: "Yu'minuna bil-ghayb", meaning: "They believe in the unseen" },
  "quran-surah-baqarah-ayat-al-kursi": { ar: "آية الكرسي", translit: "Ayat al-Kursi", meaning: "The Throne Verse" },
  "quran-surah-baqarah-ending-belief": { ar: "خواتيم البقرة", translit: "Khawatim al-Baqarah", meaning: "Last verses of Baqarah" },
  "quran-surah-ali-imran-steadfastness": { ar: "الثبات", translit: "Ath-thabat", meaning: "Standing firm" },
  "quran-surah-ali-imran-holding-the-rope": { ar: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا", translit: "Wa'tasimu bi-hablillahi jami'a", meaning: "Hold Allah's rope together" },
  "quran-surah-ali-imran-truth-and-tests": { ar: "الابتلاء", translit: "Al-ibtila'", meaning: "Being tested" },
  "quran-surah-ali-imran-dialogue-and-clarity": { ar: "أهل الكتاب", translit: "Ahl al-Kitab", meaning: "People of the Book" },
  "quran-surah-nisa-social-justice": { ar: "العدل", translit: "Al-adl", meaning: "Justice" },
  "quran-surah-nisa-rights-of-people": { ar: "حقوق العباد", translit: "Huquq al-ibad", meaning: "Rights of people" },
  "quran-surah-nisa-family-duty": { ar: "صلة الرحم", translit: "Silat ar-rahim", meaning: "Keeping family ties" },
  "quran-surah-nisa-belief-and-order": { ar: "أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ", translit: "Ati'ullaha wa ati'ur-rasul", meaning: "Obey Allah and obey the Messenger" },
  "quran-surah-maidah-fulfill-covenants": { ar: "أَوْفُوا بِالْعُقُودِ", translit: "Awfu bil-uqud", meaning: "Keep your promises" },
  "quran-surah-maidah-purity-and-prayer": { ar: "الطهارة", translit: "At-taharah", meaning: "Purity" },
  "quran-surah-maidah-lawful-living": { ar: "الحلال والحرام", translit: "Al-halal wal-haram", meaning: "Allowed and forbidden" },
  "quran-surah-maidah-loyalty-to-revelation": { ar: "مَا أَنْزَلَ اللَّهُ", translit: "Ma anzalallah", meaning: "What Allah revealed" },
  "quran-surah-yusuf-beautiful-story": { ar: "أحسن القصص", translit: "Ahsan al-qasas", meaning: "The best of stories" },
  "quran-surah-yusuf-temptation-and-purity": { ar: "العفة", translit: "Al-iffah", meaning: "Purity and self-control" },
  "quran-surah-yusuf-prison-and-patience": { ar: "الصبر", translit: "As-sabr", meaning: "Patience" },
  "quran-surah-yusuf-forgiveness-and-reunion": { ar: "العفو", translit: "Al-afw", meaning: "Forgiveness" },
  "quran-surah-maryam-mercy-at-the-opening": { ar: "الرحمة", translit: "Ar-rahmah", meaning: "Mercy" },
  "quran-surah-maryam-family-and-dua": { ar: "الدعاء", translit: "Ad-du'a", meaning: "Asking Allah" },
  "quran-surah-maryam-maryam-her-trust": { ar: "التوكل", translit: "At-tawakkul", meaning: "Trust in Allah" },
  "quran-surah-maryam-prophetic-links": { ar: "الأنبياء", translit: "Al-anbiya", meaning: "The prophets" },
  "quran-surah-kahf-faith-under-trial": { ar: "أصحاب الكهف", translit: "Ashab al-Kahf", meaning: "People of the Cave" },
  "quran-surah-kahf-wealth-and-gardens": { ar: "صاحب الجنتين", translit: "Sahib al-jannatayn", meaning: "Owner of two gardens" },
  "quran-surah-kahf-knowledge-and-khidr": { ar: "موسى والخضر", translit: "Musa wal-Khidr", meaning: "Musa and Khidr" },
  "quran-surah-kahf-power-and-dhulqarnayn": { ar: "ذو القرنين", translit: "Dhul-Qarnayn", meaning: "He of Two Horns" },
  "quran-surah-yasin-revelation-and-warning": { ar: "الوحي والإنذار", translit: "Al-wahy wal-indhar", meaning: "Revelation and warning" },
  "quran-surah-yasin-signs-in-creation": { ar: "آيات الله", translit: "Ayat Allah", meaning: "Allah's signs" },
  "quran-surah-yasin-resurrection": { ar: "البعث", translit: "Al-ba'th", meaning: "Rising after death" },
  "quran-surah-yasin-messengers-and-response": { ar: "الرسل", translit: "Ar-rusul", meaning: "The messengers" },
  "quran-surah-mulk-dominion-of-allah": { ar: "بِيَدِهِ الْمُلْكُ", translit: "Biyadihil-mulk", meaning: "All power is His" },
  "quran-surah-mulk-life-as-test": { ar: "أَيُّكُمْ أَحْسَنُ عَمَلًا", translit: "Ayyukum ahsanu amala", meaning: "Whose deeds are best" },
  "quran-surah-mulk-looking-at-creation": { ar: "فَارْجِعِ الْبَصَرَ", translit: "Farji'il-basar", meaning: "Look again" },
  "quran-surah-mulk-warning-and-security": { ar: "الغفلة", translit: "Al-ghaflah", meaning: "Heedlessness" },

  // Manners: everyday adab
  "manners-salam": { ar: "السَّلَامُ عَلَيْكُمْ", translit: "As-salamu alaykum", meaning: "Peace be upon you" },
  "manners-truthful": { ar: "الصدق", translit: "As-sidq", meaning: "Truthfulness" },
  "manners-service": { ar: "التواضع", translit: "At-tawadu", meaning: "Humility" },
  "manners-eating": { ar: "آداب الطعام", translit: "Adab at-ta'am", meaning: "Eating manners" },
  "manners-neighbors-and-guests-neighbor-rights": { ar: "حق الجار", translit: "Haqq al-jar", meaning: "Neighbor's right" },
  "manners-neighbors-and-guests-guest-honor": { ar: "إكرام الضيف", translit: "Ikram ad-dayf", meaning: "Honoring the guest" },
  "manners-emotional-discipline-anger-and-restraint": { ar: "كظم الغيظ", translit: "Kazm al-ghayz", meaning: "Holding back anger" },
  "manners-emotional-discipline-gentleness": { ar: "الرفق", translit: "Ar-rifq", meaning: "Gentleness" },
  "manners-emotional-discipline-self-awareness": { ar: "محاسبة النفس", translit: "Muhasabat an-nafs", meaning: "Checking yourself" },
  "manners-public-conduct-masjid-adab": { ar: "آداب المسجد", translit: "Adab al-masjid", meaning: "Masjid manners" },
  "manners-public-conduct-disagreement": { ar: "أدب الخلاف", translit: "Adab al-khilaf", meaning: "Manners of disagreeing" },

  // Fasting: purpose, rules and Ramadan
  "fasting-purpose-what-taqwa-means": { ar: "التقوى", translit: "At-taqwa", meaning: "Mindfulness of Allah" },
  "fasting-purpose-ramadan-and-quran": { ar: "نزول القرآن", translit: "Nuzul al-Quran", meaning: "Revelation of the Quran" },
  "fasting-times-and-rules-suhur-and-intent": { ar: "السحور", translit: "As-suhur", meaning: "Pre-dawn meal" },
  "fasting-times-and-rules-breaking-the-fast": { ar: "الإفطار", translit: "Al-iftar", meaning: "Breaking the fast" },
  "fasting-times-and-rules-who-is-exempt": { ar: "الرُّخْصَة", translit: "Ar-rukhsa", meaning: "Concession (exemption)" },
  "fasting-protection-invalidators": { ar: "المُفَطِّرات", translit: "Al-mufattirat", meaning: "Things that break the fast" },
  "fasting-protection-tongue-and-character": { ar: "حفظ اللسان", translit: "Hifz al-lisan", meaning: "Guarding the tongue" },
  "fasting-ramadan-growth-night-worship": { ar: "صلاة التراويح", translit: "Salat at-tarawih", meaning: "Ramadan night prayer" },
  "fasting-ramadan-growth-quran-in-ramadan": { ar: "تلاوة القرآن", translit: "Tilawat al-Quran", meaning: "Reciting the Quran" },
  "fasting-ramadan-growth-laylat-al-qadr": { ar: "ليلة القدر", translit: "Laylat al-qadr", meaning: "Night of Power" },

  // Zakat: duty, recipients and generosity
  "zakat-meaning-and-duty-what-zakat-is": { ar: "الزكاة", translit: "Az-zakah", meaning: "Purifying charity" },
  "zakat-meaning-and-duty-nisab-and-threshold": { ar: "النصاب", translit: "An-nisab", meaning: "Minimum amount" },
  "zakat-recipients-eligible-groups": { ar: "الأصناف الثمانية", translit: "Al-asnaf ath-thamaniyah", meaning: "The eight groups" },
  "zakat-character-and-intention-sincerity": { ar: "الإخلاص", translit: "Al-ikhlas", meaning: "Sincerity" },
  "zakat-character-and-intention-humility": { ar: "التواضع", translit: "At-tawadu", meaning: "Humility" },
  "zakat-broader-generosity-zakat-and-sadaqah": { ar: "الصدقة", translit: "As-sadaqah", meaning: "Voluntary charity" },
  "zakat-broader-generosity-family-support-and-duty": { ar: "النفقة", translit: "An-nafaqah", meaning: "Family support" },

  // Hajj: duty, rites and sacred sites
  "hajj-duty-who-must-go": { ar: "الاستطاعة", translit: "Al-Istita'ah", meaning: "Being able" },
  "hajj-duty-intending-the-journey": { ar: "النية", translit: "An-Niyyah", meaning: "Intention" },
  "hajj-duty-sacred-house": { ar: "البيت الحرام", translit: "Al-Bayt al-Haram", meaning: "The Sacred House" },
  "hajj-rites-ihram": { ar: "الإحرام", translit: "Al-Ihram", meaning: "Pilgrim's sacred state" },
  "hajj-rites-tawaf": { ar: "الطواف", translit: "At-Tawaf", meaning: "Circling the Ka'bah" },
  "hajj-rites-sai": { ar: "السعي", translit: "As-Sa'i", meaning: "Walking Safa to Marwah" },
  "hajj-major-stations-arafah": { ar: "عرفة", translit: "Arafah", meaning: "Plain of Arafah" },
  "hajj-major-stations-muzdalifah": { ar: "مزدلفة", translit: "Muzdalifah", meaning: "Overnight resting place" },
  "hajj-major-stations-mina": { ar: "منى", translit: "Mina", meaning: "Valley of tents" },
  "hajj-major-stations-sacrifice-and-release": { ar: "الهدي والتحلل", translit: "Al-Hady wat-Tahallul", meaning: "Sacrifice and release" },
  "hajj-lessons-humility": { ar: "التواضع", translit: "At-Tawadu'", meaning: "Humility" },
  "hajj-lessons-unity": { ar: "وحدة الأمة", translit: "Wahdat al-Ummah", meaning: "Unity of believers" },
  "hajj-lessons-patience": { ar: "الصبر", translit: "As-Sabr", meaning: "Patience" },

  // Marriage: purpose, rights and repair
  "marriage-purpose": { ar: "السكينة", translit: "As-sakinah", meaning: "Tranquility" },
  "marriage-choose": { ar: "الدين", translit: "Ad-deen", meaning: "Faith" },
  "marriage-kindness": { ar: "بالمعروف", translit: "Bil-ma'ruf", meaning: "With kindness" },
  "marriage-clothing": { ar: "لباس", translit: "Libas", meaning: "Clothing" },
  "marriage-mercy": { ar: "الرحمة", translit: "Ar-rahmah", meaning: "Mercy" },
  "marriage-rights-and-trust-rights-are-trusts": { ar: "أمانة", translit: "Amanah", meaning: "A trust" },
  "marriage-rights-and-trust-provision-and-care": { ar: "النفقة", translit: "An-nafaqah", meaning: "Provision" },
  "marriage-conflict-and-repair-argue-with-adab": { ar: "الأدب", translit: "Al-adab", meaning: "Good manners" },
  "marriage-conflict-and-repair-repair-after-harm": { ar: "الإصلاح", translit: "Al-islah", meaning: "Making things right" },
  "marriage-conflict-and-repair-bring-in-help-wisely": { ar: "حَكَم", translit: "Hakam", meaning: "Arbiter" },
  "marriage-spiritual-home-pray-together": { ar: "الصلاة", translit: "As-salah", meaning: "Prayer" },
  "marriage-spiritual-home-dua-for-the-home": { ar: "الدعاء", translit: "Ad-du'a", meaning: "Supplication" },
  "marriage-spiritual-home-patience-and-growth": { ar: "الصبر", translit: "As-sabr", meaning: "Patience" },

  // Prophets: names and the lesson each story teaches
  "prophets-adam": { ar: "آدم", translit: "Adam", meaning: "Prophet Adam" },
  "prophets-nuh": { ar: "نوح", translit: "Nuh", meaning: "Prophet Noah" },
  "prophets-ibrahim": { ar: "إبراهيم", translit: "Ibrahim", meaning: "Prophet Abraham" },
  "prophets-yusuf": { ar: "يوسف", translit: "Yusuf", meaning: "Prophet Joseph" },
  "prophets-musa": { ar: "موسى", translit: "Musa", meaning: "Prophet Moses" },
  "prophets-isa": { ar: "عيسى", translit: "Isa", meaning: "Prophet Jesus" },
  "prophets-muhammad": { ar: "محمد ﷺ", translit: "Muhammad", meaning: "Prophet Muhammad" },
  "prophets-early-messengers-adam-and-repentance": { ar: "التوبة", translit: "At-tawbah", meaning: "Repentance" },
  "prophets-early-messengers-nuh-and-patience": { ar: "الصبر", translit: "As-sabr", meaning: "Patience" },
  "prophets-early-messengers-hud-and-salih": { ar: "هود وصالح", translit: "Hud wa Salih", meaning: "Prophets Hud and Salih" },
  "prophets-early-messengers-lut-and-purity": { ar: "لوط", translit: "Lut", meaning: "Prophet Lot" },
  "prophets-family-and-sacrifice-ibrahim-and-tawhid": { ar: "التوحيد", translit: "At-tawhid", meaning: "Oneness of Allah" },
  "prophets-family-and-sacrifice-ismail-and-submission": { ar: "إسماعيل", translit: "Ismail", meaning: "Prophet Ishmael" },
  "prophets-family-and-sacrifice-yaqub-and-sabr": { ar: "صبر جميل", translit: "Sabrun jamil", meaning: "Beautiful patience" },
  "prophets-family-and-sacrifice-yusuf-and-purity": { ar: "العفة", translit: "Al-iffah", meaning: "Purity" },
  "prophets-power-and-deliverance-musa-and-fear": { ar: "موسى", translit: "Musa", meaning: "Prophet Moses" },
  "prophets-power-and-deliverance-harun-and-support": { ar: "هارون", translit: "Harun", meaning: "Prophet Aaron" },
  "prophets-power-and-deliverance-dawud-and-justice": { ar: "العدل", translit: "Al-adl", meaning: "Justice" },
  "prophets-power-and-deliverance-sulayman-and-gratitude": { ar: "الشكر", translit: "Ash-shukr", meaning: "Gratitude" },

  // Women of the Book: women of the Quran and the Mothers of the Believers
  "women-hawwa": { ar: "حواء", translit: "Hawwa", meaning: "Eve, first woman" },
  "women-mother-musa": { ar: "أم موسى", translit: "Umm Musa", meaning: "Mother of Musa" },
  "women-asiyah": { ar: "آسية", translit: "Asiyah", meaning: "Pharaoh's believing wife" },
  "women-maryam": { ar: "مريم", translit: "Maryam", meaning: "Mary, mother of Isa" },
  "women-khadijah": { ar: "خديجة", translit: "Khadijah", meaning: "Prophet's first wife" },
  "women-aishah": { ar: "عائشة", translit: "Aishah", meaning: "Mother of the Believers" },
  "women-hafsah": { ar: "حفصة", translit: "Hafsah", meaning: "Daughter of Umar" },
  "women-quran-depth-hawwa-and-return": { ar: "التوبة", translit: "At-tawbah", meaning: "Returning to Allah" },
  "women-quran-depth-mother-of-musa-and-trust": { ar: "التوكل", translit: "At-tawakkul", meaning: "Trust in Allah" },
  "women-quran-depth-asiyah-and-steadfastness": { ar: "الثبات", translit: "Ath-thabat", meaning: "Steadfastness" },
  "women-quran-depth-maryam-and-purity": { ar: "الطهارة", translit: "At-taharah", meaning: "Purity" },
  "women-mothers-depth-khadijah-and-support": { ar: "المؤازرة", translit: "Al-mu'azarah", meaning: "Support" },
  "women-mothers-depth-sawdah-and-stability": { ar: "سودة", translit: "Sawdah", meaning: "Mother of the Believers" },
  "women-mothers-depth-aishah-and-knowledge": { ar: "العلم", translit: "Al-ilm", meaning: "Knowledge" },
  "women-mothers-depth-hafsah-and-preservation": { ar: "الحفظ", translit: "Al-hifz", meaning: "Preservation" },
  "women-virtues-and-legacy-courage-under-pressure": { ar: "الشجاعة", translit: "Ash-shaja'ah", meaning: "Courage" },
  "women-virtues-and-legacy-worship-and-devotion": { ar: "العبادة", translit: "Al-ibadah", meaning: "Worship" },
  "women-virtues-and-legacy-service-to-revelation": { ar: "خدمة الوحي", translit: "Khidmat al-wahy", meaning: "Service to revelation" },
};

function lookup(table: Record<string, ArabicTerm>, id: string | undefined): ArabicTerm | undefined {
  if (!id || !Object.prototype.hasOwnProperty.call(table, id)) return undefined;
  return table[id];
}

export function getTopicArabic(topicId: string): ArabicTerm | undefined {
  return lookup(TOPIC_ARABIC, topicId);
}

export function getBranchArabic(branchId: string): ArabicTerm | undefined {
  return lookup(BRANCH_ARABIC, branchId);
}

// Node term first, then its branch term.
export function getLessonArabic(nodeId: string, branchId?: string): ArabicTerm | undefined {
  return lookup(NODE_ARABIC, nodeId) ?? lookup(BRANCH_ARABIC, branchId);
}
