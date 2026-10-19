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
  "abu-hurayra": "Abu Hurayrah",
  "abu-lubaba-ibn-abd-al-mundhir": "Abu Lubabah ibn Abd al-Mundhir",
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
  "grandmother-of-isa-wife-of-imran": "Wife of Imran",
  "hafsa-bint-umar": "Hafsah bint Umar",
  "halima-al-sadeya": "Halimah as-Sa'diyyah",
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
  "ghailan-b-salama-ath-thaqafi": "He became Muslim with ten wives and was told to keep four.",
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
  "khabbaab-ibn-al-arat": "He was one of the first Muslims and was tortured for Islam.",
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
  thalabah: "He fought at Badr; a well-known story about zakat names him.",
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
  ibrahim: "He was the friend of Allah and built the Kaaba with Ismail.",
  idris: "Allah raised him to a high place.",
  ilyas: "He called Bani Isra'il away from worshipping Ba'l.",
  isa: "He was born to Maryam without a father and received the Injil.",
  ishaq: "He was the son of Ibrahim and Sarah, and Ya'qub's father.",
  ismail: "He helped his father Ibrahim build the Kaaba.",
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
  "umm-kulthoom-bint-ali": "She was the Prophet's ﷺ granddaughter and survived Karbala.",
  "umm-said-bint-urwah-al-thaqafiyyah": "She was a wife of Ali ibn Abi Talib.",
  "umm-salamah-wife-of-the-prophet": "She was the last of the Prophet's ﷺ wives to pass away.",
  "zaynab-bint-ali": "She spoke out in Yazid's court after Karbala.",
  "zaynab-bint-jahsh": "She was the Prophet's ﷺ cousin and wife.",
  "zaynab-bint-khuzayma": "She was called the Mother of the Poor."
};

// Lines that would also fit someone else as a "Who ...?" question: Quran 21:85 calls Ismail, Idris and
// Dhul-Kifl all patient, and many companions fought at Badr. These lessons ask a True/False instead.
export const NO_WHO_QUESTION = new Set(["dhu-al-kifl", "thalabah"]);

// Facts in a note that don't come from Islamic sources and are left off the learn card. Machaerus is where
// Josephus places the death of John the Baptist; Muslim scholars give other places.
export const UNSURE_FACTS = {
  yahya: ["death_place"]
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
// with short choices a child can read. level 1 suits young children; level 5 is for adults (marriage), so the
// path puts those last. A hadith whose whole wording is for adults has no quote.
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
      { statement: "This hadith tells us to keep asking who created Allah.", answer: false, explanation: "It tells us to stop and say: I affirm my faith in Allah." }
    ]
  },
  "Sahih al-Bukhari 3276": {
    title: "Seek refuge with Allah",
    level: 1,
    learnLine: "When Shaytan puts a bad question in your mind, seek Allah's protection.",
    quote: "So, when he inspires such a question, one should seek refuge with Allah and give up such thoughts.",
    questions: [
      {
        prompt: "What should you do when Shaytan whispers a bad question?",
        answer: "Seek refuge with Allah and stop",
        wrong: ["Keep thinking about it", "Ask Shaytan for the answer"],
        explanation: "Seek refuge with Allah and give up such thoughts."
      },
      { statement: "In this hadith, Shaytan is the one who brings the bad question.", answer: true, explanation: "Shaytan comes and asks, until he asks: Who created your Lord?" }
    ]
  },
  "Sahih Muslim 1218a": {
    title: "Hold on to Allah's Book",
    level: 2,
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
        prompt: "Where was the Prophet ﷺ when he said this?",
        answer: "On his Hajj",
        wrong: ["In a cave", "On a ship"],
        explanation: "Jabir told how the Prophet ﷺ said it during his Hajj."
      }
    ]
  },
  "Sahih Muslim 2933a": {
    title: "Every prophet warned",
    level: 3,
    learnLine: "Every prophet warned his people about the one-eyed liar.",
    quote: "There is never a prophet who has not warned the Ummah of that one-eyed liar; behold he is one-eyed and your Lord is not one-eyed.",
    questions: [
      {
        prompt: "Who warned their people about the one-eyed liar?",
        answer: "Every prophet",
        wrong: ["Only one prophet", "No one"],
        explanation: "There is no prophet who did not warn his people."
      },
      { statement: "Only Prophet Muhammad ﷺ warned about the one-eyed liar.", answer: false, explanation: "Every prophet warned his people about him." }
    ]
  },
  "Sahih al-Bukhari 7407": {
    title: "The Dajjal's blind eye",
    level: 3,
    learnLine: "The Dajjal is blind in his right eye; Allah is not one-eyed.",
    quote:
      "The Prophet (ﷺ) said, \"Allah is not hidden from you; He is not one-eyed,\" and pointed with his hand towards his eye, adding, \"While Al-Masih Ad-Dajjal is blind in the right eye and his eye looks like a protruding grape.\"",
    questions: [
      {
        prompt: "Which eye of the Dajjal is blind?",
        answer: "The right eye",
        wrong: ["The left eye", "Neither eye"],
        explanation: "Ad-Dajjal is blind in the right eye."
      },
      {
        prompt: "What does the Dajjal's eye look like?",
        answer: "A grape",
        wrong: ["A star", "A pearl"],
        explanation: "His eye looks like a protruding grape."
      }
    ]
  },
  "Sahih Muslim 169e": {
    title: "A warning about the Dajjal",
    level: 3,
    learnLine: "The Prophet ﷺ warned people about the Dajjal and his blind eye.",
    quote: "Allah is not one-eyed and behold that Dajjal is blind of the right eye and his eye would be like a floating grape.",
    questions: [
      {
        prompt: "Who did the Prophet ﷺ warn the people about?",
        answer: "The Dajjal",
        wrong: ["A wild lion", "A bad storm"],
        explanation: "He spoke about the Dajjal in front of the people."
      },
      {
        prompt: "The Dajjal's eye is like a floating what?",
        answer: "Grape",
        wrong: ["Star", "Ball"],
        explanation: "His eye would be like a floating grape."
      }
    ]
  },
  "Sahih Muslim 2930a": {
    title: "Ibn Sayyad and the Dajjal",
    level: 3,
    learnLine: "The Prophet ﷺ tested Ibn Sayyad and warned us about the Dajjal.",
    quote: "I warn you of him and there is no Prophet who has not warned his people against the Dajjal.",
    questions: [
      {
        prompt: "Who did the Prophet ﷺ warn us about?",
        answer: "The Dajjal",
        wrong: ["A wild lion", "A bad storm"],
        explanation: "He said: I warn you of him, the Dajjal."
      },
      {
        prompt: "Which other prophets warned about the Dajjal?",
        answer: "Every prophet",
        wrong: ["None of them", "Only one"],
        explanation: "There is no Prophet who has not warned his people against the Dajjal."
      },
      { statement: "Even Nuh warned his people about the Dajjal.", answer: true, explanation: "The Prophet ﷺ said: Even Noah warned against him." }
    ]
  },
  "Sahih Muslim 2813b": {
    title: "Iblis and his troops",
    level: 3,
    learnLine: "Iblis praises the devil who makes a husband and wife fight.",
    quote:
      "Iblis places his throne upon water; he then sends detachments (for creating dissension); the nearer to him in rank are those who are most notorious in creating dissension.",
    questions: [
      {
        prompt: "Where does Iblis place his throne?",
        answer: "Upon water",
        wrong: ["On a mountain", "In a tree"],
        explanation: "Iblis places his throne upon water."
      },
      {
        prompt: "Which devils are nearest to Iblis?",
        answer: "Those who cause the most trouble",
        wrong: ["The quietest ones", "The youngest ones"],
        explanation: "The nearest to him are the most notorious in creating dissension."
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
      { statement: "This hadith says money is the best thing in this world.", answer: false, explanation: "It says a righteous wife is the best provision." }
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
      { statement: "This hadith says to look only at a man's wealth.", answer: false, explanation: "It points to his religion and character." }
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
        prompt: "How many times did the man come to ask?",
        answer: "Three",
        wrong: ["One", "Five"],
        explanation: "He came a first, second and third time."
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
        prompt: "Who was the Prophet ﷺ speaking to here?",
        answer: "Young people",
        wrong: ["Old people", "Kings"],
        explanation: "He said: O young people!"
      }
    ]
  },
  "Sahih Muslim 1400a": {
    title: "Advice to young men",
    level: 5,
    learnLine: "Young men who can support a wife should marry; others should fast.",
    questions: [
      {
        prompt: "What should young men who cannot support a wife do?",
        answer: "Fast",
        wrong: ["Travel far", "Sleep more"],
        explanation: "Those who cannot should devote themselves to fasting."
      },
      {
        prompt: "Who should marry, says this hadith?",
        answer: "Young men who can support a wife",
        wrong: ["Only old men", "Nobody at all"],
        explanation: "Those among you who can support a wife should marry."
      }
    ]
  },
  "Mishkat al-Masabih 3176": {
    title: "Keep four",
    level: 5,
    learnLine: "Ghaylan became Muslim with ten wives and was told to keep four.",
    quote:
      "Ibn ‘Umar told that Ghailan b. Salama ath-Thaqafi accepted Islam and that he had had ten wives in the pre-Islamic period who accepted Islam along with him; so the Prophet told him to keep four and separate from the rest of them.",
    questions: [
      {
        prompt: "How many wives was Ghaylan told to keep?",
        answer: "Four",
        wrong: ["Ten", "Two"],
        explanation: "The Prophet ﷺ told him to keep four."
      },
      { statement: "Ghaylan's wives accepted Islam along with him.", answer: true, explanation: "His ten wives accepted Islam along with him." }
    ]
  }
};
