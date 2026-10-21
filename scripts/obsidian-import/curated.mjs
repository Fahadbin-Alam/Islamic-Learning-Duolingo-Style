// Hand-checked wording for notes already in the vault, keyed so a re-import keeps it: people by the slug of
// their note's name, hadith by their reference ("Sahih Muslim 134a"). A note's own properties win over these
// (title:, learn_line:, quote:, lesson_title:), so new notes never need an entry here.

// One spelling per person, in simple English transliteration. The generic rules in facts.mjs (plainName)
// already fix doubled vowels, "Ibn" and "al-" spellings; these are the names those rules cannot get right.
export const DISPLAY_NAMES = {
  // Sahabah
  "lyaash-ibn-abi-rabiyyah": "'Ayyash ibn Abi Rabi'ah",
  "abdullah-ibn-zubair": "Abdullah ibn az-Zubayr",
  "abu-al-as-ibn-al-rabi": "Abu al-As ibn ar-Rabi'",
  // His father: ar-Rabi' (الربيع), spelled as in his son's name, Abu al-As ibn ar-Rabi'.
  "al-rabi-ibn-abd-al-uzza": "Ar-Rabi' ibn Abd al-Uzza",
  // Khalid's and al-Walid's father: al-Walid ibn al-Mughirah (الوليد بن المغيرة), as in Khalid ibn al-Walid.
  "walid-ibn-al-mughira": "Al-Walid ibn al-Mughirah",
  // Khalid's brother: الْوَلِيدُ بْنُ الْوَلِيدِ, with the article, like his father Al-Walid ibn al-Mughirah.
  "walid-ibn-al-walid-ibn-al-mughirah": "Al-Walid ibn al-Walid ibn al-Mughirah",
  "abu-hurayra": "Abu Hurayrah",
  "abu-lubaba-ibn-abd-al-mundhir": "Abu Lubabah ibn Abd al-Mundhir",
  // Az-Zubayr's father: al-Awwam (العوام), as in his son's name, Az-Zubayr ibn al-Awwam.
  "awwam-ibn-khuwaylid": "Al-Awwam ibn Khuwaylid",
  "asad-ibn-zoraarah": "As'ad ibn Zurarah",
  "asma-bint-umays": "Asma bint Umays",
  bilal: "Bilal ibn Rabah",
  "ghailan-b-salama-ath-thaqafi": "Ghaylan ibn Salamah ath-Thaqafi",
  "haarith-ibn-hishaan": "Al-Harith ibn Hisham",
  "hamza-ibn-abdul-muttalib": "Hamzah ibn Abd al-Muttalib",
  "kaab-ibn-zuhair": "Ka'b ibn Zuhayr",
  "kaab-ibn-malik": "Ka'b ibn Malik",
  "khabbaab-ibn-al-arat": "Khabbab ibn al-Aratt",
  "makhrama-ibn-nawfal": "Makhramah ibn Nawfal",
  "maria-al-qibtiyya": "Mariyah al-Qibtiyyah",
  "musab-ibn-umair": "Mus'ab ibn Umayr",
  "safwan-ibn-muattal": "Safwan ibn al-Mu'attal",
  "suhaib-al-rumi": "Suhayb ar-Rumi",
  "suhail-ibn-amr": "Suhayl ibn Amr",
  "suraqa-ibn-malik": "Suraqah ibn Malik",
  thalabah: "Tha'labah ibn Hatib",
  "usama-ibn-zayd": "Usamah ibn Zayd",
  "zubayr-ibn-al-awwam": "Az-Zubayr ibn al-Awwam",
  // Prophets: the spelling the built-in course uses
  alyasa: "Al-Yasa'",
  "dhu-al-kifl": "Dhul-Kifl",
  noah: "Nuh",
  shaleh: "Salih",
  shuaib: "Shu'ayb",
  sulaiman: "Sulayman",
  yaqub: "Ya'qub",
  "yusha-ibn-nun": "Yusha' ibn Nun",
  zakaria: "Zakariyya",
  // Women
  "aisha-bint-abu-bakr": "Aishah bint Abi Bakr",
  "barrah-bint-samuel": "Barrah bint Samaw'al",
  // The Quran calls her امْرَأَتُ عِمْرَانَ, the wife of Imran (3:35): a title, so it keeps its "The".
  "grandmother-of-isa-wife-of-imran": "The wife of Imran",
  "hafsa-bint-umar": "Hafsah bint Umar",
  "halima-al-sadeya": "Halimah as-Sa'diyyah",
  // Of Banu Hanifah, so al-Hanafiyyah (الحنفية), as in her son's name, Muhammad ibn al-Hanafiyyah.
  "khawlah-bint-jafar-al-hanifiyyah": "Khawlah bint Ja'far al-Hanafiyyah",
  "juwayriya-bint-al-harith": "Juwayriyah bint al-Harith",
  "sayyida-nafisa": "Sayyidah Nafisah",
  "umayma-bint-abd-al-muttalib": "Umaymah bint Abd al-Muttalib",
  // The note's facts (owner of Khabbab, from Khuza'a) are those of Umm Anmar; "Umm 'Ammaar" was a slip.
  "umm-ammaar": "Umm Anmar",
  "umm-salamah-wife-of-the-prophet": "Umm Salamah",
  "zaynab-bint-khuzayma": "Zaynab bint Khuzaymah"
};

// The mascot's line on a person's learn card: what the note's known_for says, in 12 words or fewer that a
// young child knows. Each line starts with He, She or His where it can, so the lesson can ask "Who ...?".
export const LEARN_LINES = {
  // Sahabah
  "abd-allah-ibn-umar": "He was Umar's son and passed on very many hadiths.",
  "abd-allah-ibn-masuud": "He was the best explainer of the Quran in his time.",
  "lyaash-ibn-abi-rabiyyah": "He was an early Muslim tricked back to Makkah by Abu Jahl.",
  "abbas-ibn-abd-al-muttalib": "He was the Prophet's ﷺ uncle and looked after Zamzam.",
  "abdullah-ibn-amr-ibn-al-aas": "He wrote down hadiths in the earliest known hadith book.",
  "abdullah-ibn-amr-ibn-haram": "He was a chief at Aqabah and an early martyr at Uhud.",
  "abdullah-ibn-jahsh": "He led the Nakhla raid and was martyred at Uhud.",
  "abdullah-ibn-jubayr": "He led the archers at Uhud and was martyred at his post.",
  "abdullah-ibn-rawahah": "He was a poet and Mu'tah's third commander, martyred there.",
  "abdullah-ibn-zubair": "He led a caliphate from Makkah during a civil war.",
  "abu-al-as-ibn-al-rabi": "He married the Prophet's ﷺ daughter and was Khadijah's nephew.",
  "abu-bakr-as-siddiq": "The first caliph, he was with the Prophet ﷺ in the cave.",
  "abu-dharr-al-ghifaariy": "He was one of the very first people to accept Islam.",
  "abu-hurayra": "He passed on more hadiths than any other companion.",
  "abu-lubaba-ibn-abd-al-mundhir": "He tied himself to a pillar of the mosque to repent.",
  "abu-muusaa-al-ashariy": "He was a governor of Basra and Kufa.",
  "abu-sufyan-ibn-harb": "He led Quraysh at Uhud, then became Muslim when Makkah was opened.",
  "abu-ubaydah-ibn-al-jarrah": "He was called the Trustee of this Ummah.",
  "abu-umamah-al-bahili": "He was the last companion to pass away in Syria.",
  "al-hasan-ibn-ali": "He was the Prophet's ﷺ grandson and made peace with Mu'awiyah.",
  "al-husayn-ibn-ali": "He was the Prophet's ﷺ grandson, martyred at Karbala.",
  "ali-ibn-abi-talib": "He was the fourth caliph and the first child to accept Islam.",
  "ammar-ibn-yasir": "His parents were the first martyrs of Islam.",
  "amr-ibn-al-as": "He won Egypt for the Muslims and became its governor.",
  "amr-ibn-al-jamuh": "He was the chief of Banu Salamah, martyred at Uhud.",
  "anas-ibn-malik": "He served the Prophet ﷺ for ten years.",
  "asad-ibn-zoraarah": "He was the first chief in Madinah to accept Islam.",
  "asma-bint-umays": "She was one of the Muslims who emigrated to Abyssinia.",
  bilal: "He was the first to call the adhan in Islam.",
  "fatimah-al-zahra": "She was the youngest daughter of the Prophet ﷺ.",
  "fatimah-bint-asad": "She was Ali's mother and raised the Prophet ﷺ in her home.",
  // His other well-known story (ten wives, told to keep four) is left off the path.
  "ghailan-b-salama-ath-thaqafi": "He was a man of Thaqif, from Ta'if, who accepted Islam.",
  "haarith-ibn-hishaan": "He was Abu Jahl's brother and became Muslim when Makkah was opened.",
  "hakim-ibn-hizam": "He was Khadijah's nephew and a generous merchant.",
  "hamza-ibn-abdul-muttalib": "He was the Prophet's ﷺ uncle, called the Lion of Allah.",
  "hanzalah-ibn-abi-amir": "He left his wedding night to fight at Uhud and was martyred.",
  "ikrimah-ibn-abi-jahl": "He once fought Islam, then became a companion of the Prophet ﷺ.",
  "jafar-ibn-abi-taalib": "He led the Muslims who emigrated to Abyssinia.",
  "jabir-ibn-abdullah": "He passed on very many hadiths.",
  "jubayr-ibn-mutim": "He opposed Islam at first, then became Muslim.",
  julaybib: "He married at the Prophet's ﷺ request and was later martyred.",
  "kaab-ibn-zuhair": "He was an Arabian poet who accepted Islam.",
  "kaab-ibn-malik": "He was one of the three forgiven for staying behind from Tabuk.",
  "khabbaab-ibn-al-arat": "He was one of the first Muslims and stayed firm in Islam.",
  "khalid-ibn-al-walid": "He was called the Sword of Allah.",
  "khawlah-bint-hakim": "She was an early Muslim woman, the wife of Uthman ibn Maz'un.",
  "makhrama-ibn-nawfal": "He was a noble of Banu Zuhrah and father of al-Miswar.",
  "maria-al-qibtiyya": "She was the mother of the Prophet's ﷺ son Ibrahim.",
  "muawiyah-ibn-abi-sufyan": "He founded the Umayyad caliphate.",
  "musab-ibn-umair": "He was the first one sent to Madinah to call to Islam.",
  "nuayman-ibn-amr": "He fought at Badr and was famous for his jokes.",
  "ruqayyah-bint-muhammad": "She was the Prophet's ﷺ daughter and Uthman's first wife.",
  "sad-ibn-ubaadah": "He was the chief of the Khazraj tribe.",
  "sad-ibn-muaadh": "He was the chief of the Aws tribe in Madinah.",
  "safwan-ibn-muattal": "He brought Aishah back to the army when she was left behind.",
  "salmaan-al-faarisiy": "A Persian, he searched for the truth until he found Islam.",
  "suhaib-al-rumi": "He was an early Muslim who grew up among the Romans.",
  "suhail-ibn-amr": "He spoke for Quraysh at the Treaty of Hudaybiyyah.",
  "suraqa-ibn-malik": "He chased the Prophet ﷺ during the Hijrah for a reward.",
  "tamim-al-dari": "He was a Christian before he became Muslim.",
  "thaabit-ibn-aqram": "He picked up the banner at Mu'tah and gave it to Khalid.",
  // His note's known_for is a story about refusing zakat (Quran 9:75) that many hadith scholars hold weak, and it
  // accuses a man of Badr; only that he fought at Badr is taught.
  thalabah: "He was one of the companions who fought at Badr.",
  "ubaydah-ibn-al-harith": "He was the first Muslim martyred in battle, at Badr.",
  "umar-ibn-al-khattab": "He was the second caliph, called al-Faruq.",
  "umm-ayman": "She cared for the young Prophet ﷺ and was an early Muslim.",
  "umm-kulthum-bint-muhammad": "She was the Prophet's ﷺ daughter and married Uthman.",
  "umm-ruman": "She was Abu Bakr's wife and Aishah's mother.",
  "urwah-ibn-abi-al-jad-al-bariqi": "The Prophet ﷺ blessed his trade: one dinar became two sheep.",
  "usama-ibn-zayd": "Loved by the Prophet ﷺ, he led an army to Syria.",
  "usayd-ibn-hudayr": "He was a leader of the Aws before Islam.",
  "uthman-ibn-affan": "The third caliph, he made one standard copy of the Quran.",
  "walid-ibn-al-walid-ibn-al-mughirah": "He was Khalid's brother and later emigrated to Madinah.",
  "yazid-ibn-abi-sufyan": "He led troops in Syria and was governor of Damascus.",
  "zayd-ibn-harithah": "He is the only companion named in the Quran.",
  "zayd-ibn-thabit": "He wrote down the revelation and collected the Quran.",
  "zaynab-bint-muhammad": "She was the eldest daughter of the Prophet ﷺ.",
  "zubayr-ibn-al-awwam": "He was the Prophet's ﷺ cousin, one of ten promised Paradise.",
  "abd-allah-ibn-abbas": "He was called the Explainer of the Quran.",
  "umayr-ibn-wahb-al-jumahi": "He came to harm the Prophet ﷺ but accepted Islam instead.",
  // Prophets
  adam: "He was the first human being and the first prophet.",
  alyasa: "He was the prophet who came after Ilyas.",
  // Quran 21:83-84 and 38:41-44: his patience through harm and loss, then Allah removed his harm.
  ayyub: "He stayed patient through illness and loss, and Allah healed him.",
  dawud: "He defeated Jalut, became a king, and received the Zabur.",
  "dhu-al-kifl": "The Quran praises him as one of the patient.",
  harun: "He was the brother and helper of Musa.",
  hud: "He was sent to the people of 'Ad.",
  ibrahim: "He was the friend of Allah and built the Ka'bah with Ismail.",
  idris: "Allah raised him to a high place.",
  ilyas: "He called Bani Isra'il away from worshipping Ba'l.",
  isa: "He was born to Maryam without a father and received the Injil.",
  ishaq: "He was the son of Ibrahim and Sarah, and Ya'qub's father.",
  ismail: "He helped his father Ibrahim build the Ka'bah.",
  lut: "He was Ibrahim's nephew and a prophet sent to Sodom.",
  muhammad: "He is the last messenger Allah sent.",
  musa: "He spoke with Allah and received the Tawrah.",
  noah: "He built the Ark and was a messenger of firm resolve.",
  shaleh: "He was sent to Thamud, with the she-camel of Allah.",
  shuaib: "He was a prophet sent to the people of Madyan.",
  sulaiman: "He was a prophet-king who ruled the jinn and spoke with animals.",
  yahya: "He was a prophet who confirmed that Isa would come.",
  yaqub: "He was the father of the twelve tribes of Israel.",
  yunus: "He was swallowed by the whale, and his people repented.",
  "yusha-ibn-nun": "He helped Musa, then led Bani Isra'il into the Holy Land.",
  yusuf: "He explained dreams and became a minister of Egypt.",
  zakaria: "He looked after Maryam and was the father of Yahya.",
  // Women
  "aisha-bint-abu-bakr": "She was the Prophet's ﷺ wife and a great scholar of hadith.",
  "al-sahba-al-taghlibiyyah": "She was a wife of Ali ibn Abi Talib.",
  "aminah-bint-wahb": "She was the mother of the Prophet ﷺ.",
  "barrah-bint-samuel": "She was the mother of Safiyyah bint Huyayy.",
  "grandmother-of-isa-wife-of-imran": "She gave Maryam to Allah's service before Maryam was born.",
  "hafsa-bint-umar": "She was the Prophet's ﷺ wife and kept the first written mushaf.",
  hajar: "She was Ismail's mother and ran between Safa and Marwah.",
  "halima-al-sadeya": "She nursed the Prophet ﷺ as a baby in the desert.",
  "juwayriya-bint-al-harith": "She married the Prophet ﷺ, and her people were set free.",
  "khadijah-bint-khuwaylid": "She was the Prophet's ﷺ first wife and first to believe him.",
  "khawlah-bint-jafar-al-hanifiyyah": "She was Ali's wife and the mother of Muhammad ibn al-Hanafiyyah.",
  "layla-bint-masud-al-tamimiyyah": "She was a wife of Ali ibn Abi Talib.",
  maryam: "She is the only woman named in the Quran.",
  "maymunah-bint-al-harith": "She was the last woman the Prophet ﷺ married.",
  "safiyyah-bint-huyayy": "She was the Prophet's ﷺ wife, daughter of a Banu Nadir chief.",
  sarah: "She was Ibrahim's wife and the mother of Ishaq.",
  "sawdah-bint-zamah": "She was the second wife of the Prophet ﷺ.",
  "sayyida-nafisa": "From the Prophet's ﷺ family, she taught hadith in Egypt.",
  "umayma-bint-abd-al-muttalib": "She was the Prophet's ﷺ aunt and mother of Zaynab bint Jahsh.",
  "umm-ammaar": "She owned Khabbab in Makkah and hurt him for his Islam.",
  "umm-al-banin": "She was Ali's wife and the mother of al-Abbas ibn Ali.",
  "umm-habibah": "She was the Prophet's ﷺ wife and emigrated to Abyssinia.",
  "umm-jamil": "The Quran calls her the carrier of firewood.",
  // Her note also says she "survived Karbala"; most Sunni historians say she died in Madinah before it.
  "umm-kulthoom-bint-ali": "She was the Prophet's ﷺ granddaughter, daughter of Ali and Fatimah.",
  "umm-said-bint-urwah-al-thaqafiyyah": "She was a wife of Ali ibn Abi Talib.",
  "umm-salamah-wife-of-the-prophet": "She was the last of the Prophet's ﷺ wives to pass away.",
  "zaynab-bint-ali": "She spoke out in Yazid's court after Karbala.",
  "zaynab-bint-jahsh": "She was the Prophet's ﷺ cousin and wife.",
  "zaynab-bint-khuzayma": "She was called the Mother of the Poor."
};

// Lines that would also fit someone else as a "Who ...?" question: Quran 21:85 calls Ismail, Idris and
// Dhul-Kifl all patient, and many companions fought at Badr. These lessons ask a True/False instead.
export const NO_WHO_QUESTION = new Set(["dhu-al-kifl", "thalabah"]);

// Facts in a note that don't come from Islamic sources, or that the sources dispute, are left off the learn
// card and out of the questions. Where the prophets were born, died and are buried comes from the Isra'iliyyat
// and Biblical tradition (Ur, Hebron, Machaerus ...), so those places are dropped for every prophet but the
// Prophet Muhammad ﷺ; so are parents' names that only those books give (Yukabid, Rifqa, Lamech).
export const UNSURE_FACTS_BY_TOPIC = {
  prophets: { facts: ["birth_place", "death_place", "burial_place"], except: ["muhammad"] }
};
export const UNSURE_FACTS = {
  harun: ["father", "mother"],
  musa: ["father", "mother"],
  noah: ["father"],
  lut: ["father"],
  yahya: ["mother"],
  yaqub: ["mother"],
  // Women: Ur and Hebron for Sarah, Jerusalem for Maryam, and places the sources disagree on.
  sarah: ["birth_place", "death_place", "burial_place"],
  hajar: ["birth_place"],
  maryam: ["death_place"],
  "halima-al-sadeya": ["death_place"],
  "zaynab-bint-khuzayma": ["birth_place"],
  "khawlah-bint-jafar-al-hanifiyyah": ["birth_place", "death_place"],
  // Her note says she "survived Karbala"; Sunni historians say she died in Madinah before 61 AH. Her lesson
  // keeps the hand-checked line instead.
  "umm-kulthoom-bint-ali": ["known_for"],
  // His note's known_for is the zakat story of Quran 9:75, which many hadith scholars hold weak.
  thalabah: ["known_for"],
  // The note says Hantamah bint Hisham; Ibn Abd al-Barr and others give bint Hashim and call "bint Hisham" a slip.
  "umar-ibn-al-khattab": ["mother"],
  // Their notes give the tribe as Quraysh, but their own full names say al-Asadi: their father Jahsh ibn Ri'ab was
  // of Banu Asad ibn Khuzaymah, allies of Quraysh in Makkah, and only their mother Umaymah was of Quraysh. A
  // "Which tribe?" question would have no one right answer, so it is not asked.
  "zaynab-bint-jahsh": ["tribe"],
  "abdullah-ibn-jahsh": ["tribe"]
};

// Facts left out of a child's lesson because they are for older learners. Ghaylan's ten wives (Mishkat al-Masabih
// 3176) are left off the path too. A known_for that tells of violence (Khabbab "tortured for Islam") is left out
// by rule (FRIGHTENING_TEXT in facts.mjs), so the lesson keeps only its gentle hand-checked line.
export const ADULT_FACTS = {
  "ghailan-b-salama-ath-thaqafi": ["known_for"]
};

// People left off the path, and never used for another lesson's wrong choices. Women of the Book is for women to
// look up to: Umm Jamil fought the Prophet ﷺ (Surah al-Masad is about her) and Umm Anmar tortured Khabbab for his
// Islam; their stories are told with Surah al-Masad and with Khabbab. As-Sahba' at-Taghlibiyyah, Layla bint Mas'ud
// and Umm Sa'id bint Urwah have nothing certain to teach but that they were wives of Ali, so three lessons would
// say the same line. Keyed like LEARN_LINES.
export const LEFT_OUT_PEOPLE = new Set([
  "umm-jamil",
  "umm-ammaar",
  "al-sahba-al-taghlibiyyah",
  "layla-bint-masud-al-tamimiyyah",
  "umm-said-bint-urwah-al-thaqafiyyah"
]);

// Surahs whose names mean the same thing in plain words: Al-Muzzammil ("The Wrapped One") and Al-Muddaththir
// ("The Covered One") both call the Prophet ﷺ wrapped in his garment, so neither is the other's wrong choice.
export const SAME_MEANING = { 73: [74], 74: [73] };

// Surahs the scholars of the Quran disagree on, Makkan or Madinan (as-Suyuti lists them in al-Itqan): their lesson
// never says where they were revealed, so no true or false question is half true.
export const DISPUTED_REVELATION = new Set([1, 13, 22, 55, 61, 64, 76, 83, 97, 98, 99, 100, 102, 107, 108, 112, 113, 114]);

// The English names of a few surahs in plain words a child knows, each a standard meaning of the Arabic name
// (Quran.com's "The Traducer" is al-Humazah, the backbiter). These win over the note's English name. Al-Fatihah
// and Al-Mulk use the words of their own unit's banner.
export const SURAH_MEANINGS = {
  1: "The Opening",
  67: "The Kingdom",
  73: "The Wrapped One",
  74: "The Covered One",
  76: "The Human",
  77: "Those Sent Forth",
  78: "The News",
  81: "The Folding Up",
  82: "The Splitting Open",
  83: "Those Who Cheat",
  84: "The Splitting Apart",
  100: "The Runners",
  102: "Competing for More",
  103: "Time",
  104: "The Backbiter",
  110: "The Help"
};

// Surahs whose English name is not a meaning: their opening letters (Ta-Ha, Ya Sin, 'The Letter "Saad"') or a
// name (Hud, "Jonah" for Yunus). Their learn card says what they are named after instead, by surah number,
// and their name is never asked or offered as a meaning.
export const SURAH_NAMED_AFTER = {
  10: "Prophet Yunus",
  11: "Prophet Hud",
  12: "Prophet Yusuf",
  14: "Prophet Ibrahim",
  19: "Maryam",
  20: "its opening letters, Ta Ha",
  31: "Luqman",
  34: "the people of Saba",
  36: "its opening letters, Ya Sin",
  38: "its opening letter, Sad",
  47: "Prophet Muhammad ﷺ",
  50: "its opening letter, Qaf",
  71: "Prophet Nuh",
  106: "the tribe of Quraysh"
};

// Hadith lessons: a title about what the hadith teaches, the line the mascot says, the key sentence the learn
// card shows (copied exactly from the note; the importer checks it is there), and questions about its meaning
// with short choices a child can read. Every question names what it asks about ("when he told us to hold on to
// Allah's Book", never "when he said this"), so it still reads right when it comes back as a review in
// another lesson, and asks only what the card shows. level 1 to 3 suits young children; level 4 and 5 are for
// older learners (marriage, and the home), and the path keeps those in a last unit that opens later. A quote
// that spells a name another way than the card ("Ghailan b. Salama") is left out.
export const HADITH_LESSONS = {
  "Sahih Muslim 134a": {
    title: "I believe in Allah",
    level: 1,
    learnLine: "If you wonder who created Allah, say: I believe in Allah.",
    quote: "He who found himself confronted with such a situation should say: I affirm my faith in Allah.",
    questions: [
      {
        prompt: "What should you say when someone asks who created Allah?",
        answer: "I affirm my faith in Allah",
        wrong: ["Let's keep arguing", "I don't care"],
        explanation: "The Prophet ﷺ taught us to say: I affirm my faith in Allah."
      },
      { statement: "We should keep asking who created Allah.", answer: false, explanation: "Stop and say: I affirm my faith in Allah." }
    ]
  },
  "Sahih Muslim 1218a": {
    title: "Hold on to Allah's Book",
    level: 1,
    learnLine: "On Hajj, the Prophet ﷺ said: hold on to Allah's Book.",
    quote: "I have left among you the Book of Allah, and if you hold fast to it, you would never go astray.",
    questions: [
      {
        prompt: "What did the Prophet ﷺ leave us, so we never go astray?",
        answer: "The Book of Allah",
        wrong: ["A big treasure", "A golden crown"],
        explanation: "He left the Book of Allah: hold fast to it and you will not go astray."
      },
      {
        prompt: "Where was the Prophet ﷺ when he told us to hold on to Allah's Book?",
        answer: "On his Hajj",
        wrong: ["In a cave", "On a ship"],
        explanation: "Jabir told how the Prophet ﷺ said it during his Hajj."
      }
    ]
  },
  "Sahih al-Bukhari 3276": {
    title: "Seek refuge with Allah",
    level: 2,
    learnLine: "When Shaytan puts a bad question in your mind, seek Allah's protection.",
    quote: "So, when he inspires such a question, one should seek refuge with Allah and give up such thoughts.",
    questions: [
      {
        prompt: "What should you do when Shaytan whispers a bad question?",
        answer: "Seek refuge with Allah and stop",
        wrong: ["Keep thinking about it", "Ask Shaytan for the answer"],
        explanation: "Seek refuge with Allah and give up such thoughts."
      },
      { statement: "Shaytan is the one who whispers bad questions.", answer: true, explanation: "Shaytan comes and asks, until he asks: Who created your Lord?" }
    ]
  },
  // The one lesson on the Dajjal: the warning only, with no description of him.
  "Sahih Muslim 2930a": {
    title: "Every prophet warned",
    level: 3,
    learnLine: "Every prophet warned his people about the Dajjal, a great liar.",
    quote: "I warn you of him and there is no Prophet who has not warned his people against the Dajjal.",
    questions: [
      {
        prompt: "Who did the Prophet ﷺ warn us about?",
        answer: "The Dajjal",
        wrong: ["A lost cat", "A rainy day"],
        explanation: "He said: I warn you of him, the Dajjal."
      },
      {
        prompt: "Which prophets warned their people about the Dajjal?",
        answer: "Every prophet",
        wrong: ["None of them", "Only one"],
        explanation: "There is no Prophet who has not warned his people against the Dajjal."
      }
    ]
  },
  "Sunan Ibn Majah 1855": {
    title: "A righteous wife",
    level: 4,
    learnLine: "Nothing in this world is better to have than a righteous wife.",
    quote: "This world is but provisions, and there is no provision in this world better than a righteous wife.",
    questions: [
      {
        prompt: "What is the best provision in this world?",
        answer: "A righteous wife",
        wrong: ["Lots of money", "A big house"],
        explanation: "There is no provision in this world better than a righteous wife."
      },
      { statement: "The Prophet ﷺ said money is the best thing to have in this world.", answer: false, explanation: "He said a righteous wife is the best provision." }
    ]
  },
  "Mishkat al-Masabih 3096": {
    title: "Half of the religion",
    level: 4,
    learnLine: "Marrying completes half the religion; keep fearing Allah in the rest.",
    quote: "When a man marries he has fulfilled half of the religion; so let him fear God regarding the remaining half.",
    questions: [
      {
        prompt: "When a man marries, how much of the religion has he fulfilled?",
        answer: "Half",
        wrong: ["All of it", "None of it"],
        explanation: "He has fulfilled half of the religion."
      },
      { statement: "After marrying, a man can stop caring about the rest of the religion.", answer: false, explanation: "He should fear Allah regarding the remaining half." }
    ]
  },
  // In the Marriage topic, for older learners: the card quotes the part about a husband and wife.
  "Sahih Muslim 2813b": {
    title: "Iblis and his troops",
    level: 5,
    learnLine: "Iblis praises the devil who comes between a husband and wife.",
    // sunnah.com's words, from the opening quote mark to the closing one, so the card shows whole quotes.
    quote: '"I did not spare so and so until I sowed the seed of discord between a husband and a wife." The Satan goes near him and says: "You have done well."',
    questions: [
      {
        prompt: "Which devil does Iblis praise, saying: You have done well?",
        answer: "The one who came between a husband and wife",
        wrong: ["The one who stayed quiet", "The one who went to sleep"],
        explanation: "Iblis praises the devil who comes between a husband and wife."
      },
      {
        statement: "Iblis is pleased when a devil comes between a husband and wife.",
        answer: true,
        explanation: "Iblis says to that devil: You have done well."
      }
    ]
  },
  "Jami' at-Tirmidhi 1084": {
    title: "Faith and good character",
    level: 5,
    learnLine: "If a man of good faith and manners proposes, accept him.",
    quote: "When someone whose religion and character you are pleased with proposes to (someone under the care) of one of you, then marry to him.",
    questions: [
      {
        prompt: "What should we look for when a man proposes?",
        answer: "Good faith and character",
        wrong: ["Lots of money", "A famous name"],
        explanation: "Marry to the one whose religion and character you are pleased with."
      },
      { statement: "The hadith about proposals says to look only at a man's wealth.", answer: false, explanation: "It points to his religion and character." }
    ]
  },
  "Sunan an-Nasa'i 3227": {
    title: "Choosing a wife",
    level: 5,
    learnLine: "Marry a loving wife who can have children, the Prophet ﷺ said.",
    quote: "Marry the one who is fertile and loving, for I will boast of your great numbers.",
    questions: [
      {
        prompt: "What kind of wife did the Prophet ﷺ advise?",
        answer: "Loving and fertile",
        wrong: ["Rich and famous", "Tall and strong"],
        explanation: "He said: Marry the one who is fertile and loving."
      },
      {
        statement: "The Prophet ﷺ said he will boast of your great numbers.",
        answer: true,
        explanation: "He said: for I will boast of your great numbers."
      }
    ]
  },
  "Sahih al-Bukhari 5066": {
    title: "Marriage or fasting",
    level: 5,
    learnLine: "Young people who can marry should marry; others should fast.",
    questions: [
      {
        prompt: "What should a young person who cannot marry do?",
        answer: "Fast",
        wrong: ["Travel far", "Sleep more"],
        explanation: "Whoever is not able to marry should fast."
      },
      {
        prompt: "Who did the Prophet ﷺ tell to marry, or else to fast?",
        answer: "Young people",
        wrong: ["Old people", "Kings"],
        explanation: "He said: O young people!"
      }
    ]
  },
  "Mishkat al-Masabih 3176": {
    title: "Keep four",
    level: 5,
    learnLine: "Ghaylan became Muslim with ten wives and was told to keep four.",
    questions: [
      {
        prompt: "How many wives was Ghaylan told to keep?",
        answer: "Four",
        wrong: ["Ten", "Two"],
        explanation: "The Prophet ﷺ told him to keep four."
      },
      { statement: "Ghaylan was told to keep all ten of his wives.", answer: false, explanation: "The Prophet ﷺ told him to keep four." }
    ]
  }
};

// One lesson per teaching. A second narration of the same words, or a second lesson on the same thing, is left
// out while the narration it repeats is in the vault: Muslim 1400a is Bukhari 5066 (Ibn Mas'ud: marry, or else
// fast), Muslim 134a says what Bukhari 3276 says (seek refuge from the whisper "who created Allah?"), and
// Muslim 2933a gives the warning of Muslim 2930a, that every prophet warned about the Dajjal.
export const REPEATED_HADITH = {
  "Sahih Muslim 1400a": "Sahih al-Bukhari 5066",
  "Sahih Muslim 134a": "Sahih al-Bukhari 3276",
  "Sahih Muslim 2933a": "Sahih Muslim 2930a"
};

// Hadith never put on the path: the Dajjal's eye described (Bukhari 7407, Muslim 169e) would frighten a young
// child, and the Dajjal is taught once, by the warning in Muslim 2930a. A hadith graded Da'if is left out too.
// "Keep four" (Mishkat al-Masabih 3176: Ghaylan, who had ten wives, was told to keep four) is left off the path:
// it does not fit the Marriage topic, which teaches a kind home, and its card has no quote.
export const LEFT_OUT_HADITH = new Set(["Sahih al-Bukhari 7407", "Sahih Muslim 169e", "Mishkat al-Masabih 3176"]);

// Who narrated each hadith the notes link to, and its grade, checked on its sunnah.com page (2026-10-21). Bukhari
// and Muslim carry no grade there because both are accepted as authentic. A sunnah.com link missing from this list
// is left off the lesson, with a warning, until it is checked and added: a citation never shows without a narrator.
export const HADITH_CITATIONS = {
  "abudawud:2665": { narrator: "Ali ibn Abi Talib", grade: "Sahih (Al-Albani)" },
  "bukhari:3276": { narrator: "Abu Hurayrah", grade: "Sahih" },
  "bukhari:3642": { narrator: "Urwah al-Bariqi", grade: "Sahih" },
  "bukhari:3744": { narrator: "Anas ibn Malik", grade: "Sahih" },
  "bukhari:3966": { narrator: "Abu Dharr", grade: "Sahih" },
  "bukhari:3969": { narrator: "Abu Dharr", grade: "Sahih" },
  "bukhari:4261": { narrator: "Abdullah ibn Umar", grade: "Sahih" },
  "bukhari:4560": { narrator: "Abu Hurayrah", grade: "Sahih" },
  "bukhari:5018": { narrator: "Usayd ibn Hudayr", grade: "Sahih" },
  "bukhari:5066": { narrator: "Abdullah ibn Mas'ud", grade: "Sahih" },
  "ibnmajah:1855": { narrator: "Abdullah ibn Amr", grade: "Sahih (Darussalam)" },
  "mishkat:3096": { narrator: "Anas ibn Malik", grade: "Hasan (Al-Albani)" },
  "muslim:121": { narrator: "Amr ibn al-As", grade: "Sahih" },
  "muslim:1218a": { narrator: "Jabir ibn Abdullah", grade: "Sahih" },
  "muslim:2471b": { narrator: "Jabir ibn Abdullah", grade: "Sahih" },
  "muslim:2813b": { narrator: "Jabir ibn Abdullah", grade: "Sahih" },
  "muslim:2930a": { narrator: "Abdullah ibn Umar", grade: "Sahih" },
  "nasai:3227": { narrator: "Ma'qil ibn Yasar", grade: "Hasan (Darussalam)" }
};

// Hadith links kept off lessons although the notes have them: Tirmidhi 1143 (Zaynab returned to Abu al-As) is
// graded Da'if, and Muslim 976a and 976b (the Prophet ﷺ visits his mother's grave) say nothing a question on
// Aminah asks and are too heavy for a young learner. Links that are not one hadith (a narrator's page, or a
// book-and-chapter link such as muslim/15/159) are left off as well.
export const LEFT_OUT_SOURCES = new Set(["tirmidhi:1143", "muslim:976a", "muslim:976b"]);
