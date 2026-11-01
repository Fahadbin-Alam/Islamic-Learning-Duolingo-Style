import { hadith, quran, quranQuote, type DeepUnit } from "./deepKit";

// The lives of the prophets, in depth, in the order of Ibn Kathir's Stories of the Prophets. Each prophet's lessons
// join his own unit on the path (src/data/unitPlans.ts), after its first circles. Every card is from the Quran or a
// hadith checked on sunnah.com (number and grade as sunnah.com gives them). What the scholars differ on (dates,
// places, names the Quran does not give) is left out, and no prophet is ever drawn.

const unit = (key: string, branchId: string, name: string, lessons: DeepUnit["lessons"]): DeepUnit => ({
  key,
  topicId: "prophets",
  branchId,
  name,
  kind: "skill",
  lessonType: "skill",
  lessons
});

const ADAM = unit("prophet-adam", "prophets-unit-adam", "Adam", [
  {
    slug: "khalifah",
    title: "A new creation on earth",
    line: "Allah told the angels He would place a successor on earth.",
    facts: ["Quran 2:30", "The angels asked why", "Allah knows what they don't"],
    quote: quranQuote(2, 30),
    source: quran(2, 30, "Your Lord said to the angels: I will place a successor on earth. They asked: will You place one who spreads corruption? He said: I know what you do not know."),
    difficulty: 1,
    questions: [
      { q: "Who did Allah tell about the new creation first?", a: "The angels", wrong: ["The jinn", "The animals", "The mountains"], why: "Quran 2:30." },
      { q: "What did Allah answer the angels?", a: "I know what you do not know", wrong: ["You are right", "Wait a year", "Ask Iblis"], why: "Allah's knowledge is complete." },
      { q: "Adam was made to live on the earth as a successor.", tf: true, why: "Allah said: I will place a successor on earth." }
    ]
  },
  {
    slug: "soul",
    title: "Clay, then a soul",
    line: "Allah shaped Adam, then breathed into him the soul He created.",
    facts: ["Quran 15:29", "Made from clay", "Sixty cubits tall"],
    quote: quranQuote(15, 29),
    source: quran(15, 29, "When I have proportioned him and breathed into him of the soul I created, fall down to him in prostration."),
    difficulty: 1,
    questions: [
      { q: "What did Allah breathe into Adam?", a: "A soul He created", wrong: ["Fire", "Light only", "Nothing"], why: "Quran 15:29." },
      { q: "How tall was Adam, in the hadith?", a: "Sixty cubits", wrong: ["Six cubits", "Two cubits", "A thousand cubits"], why: "Sahih al-Bukhari 3326." },
      { q: "Adam was shaped first, and then given his soul.", tf: true, why: "When I have proportioned him and breathed into him." }
    ]
  },
  {
    slug: "salam",
    title: "The first salam",
    line: "Adam's first words to the angels were: as-salamu alaykum.",
    facts: ["Sahih al-Bukhari 3326", "They added: wa rahmatullah"],
    source: hadith("bukhari", "3326", "Abu Hurairah", "Sahih", "Allah created Adam sixty cubits tall and told him: go and greet those angels and listen to their reply, for it is your greeting and your children's. He said: as-salamu alaykum. They said: as-salamu alayka wa rahmatullah."),
    difficulty: 2,
    questions: [
      { q: "What did Adam say to the angels?", a: "As-salamu alaykum", wrong: ["Good morning", "Bismillah", "Allahu akbar"], why: "Sahih al-Bukhari 3326." },
      { q: "What did the angels add to their reply?", a: "Wa rahmatullah", wrong: ["Wa barakatuh only", "Nothing", "Ahlan"], why: "Peace and the mercy of Allah be on you." },
      { q: "Whose greeting is the salam, as Allah told Adam?", a: "His and his children's", wrong: ["Only the angels'", "Only kings'", "No one's"], why: "It is your greeting and your offspring's." }
    ]
  },
  {
    slug: "iblis",
    title: "Iblis refuses",
    line: "All bowed to Adam except Iblis, who said: I am better.",
    facts: ["Quran 7:12", "He was made from fire", "Pride was his sin"],
    quote: quranQuote(7, 12),
    source: quran(7, 12, "Allah said: what stopped you from prostrating when I commanded you? He said: I am better than him. You created me from fire and him from clay."),
    difficulty: 2,
    questions: [
      { q: "Who refused to bow to Adam?", a: "Iblis", wrong: ["Jibril", "Mika'il", "Every angel"], why: "Quran 7:11-12." },
      { q: "What was Iblis made from?", a: "Fire", wrong: ["Clay", "Light", "Water"], why: "You created me from fire." },
      { q: "What was the real reason Iblis refused?", a: "Pride", wrong: ["He was asleep", "He did not hear", "He was far away"], why: "He refused and was arrogant (Quran 2:34)." }
    ]
  },
  {
    slug: "tree",
    title: "The tree in Jannah",
    line: "Adam and his wife lived in Jannah, kept from one tree.",
    facts: ["Quran 2:35", "Shaytan made them slip"],
    quote: quranQuote(2, 35),
    source: quran(2, 35, "We said: O Adam, live with your wife in Jannah and eat freely from wherever you like, but do not come near this tree, or you will be wrongdoers."),
    difficulty: 2,
    questions: [
      { q: "Where did Adam and his wife live at first?", a: "In Jannah", wrong: ["In Makkah", "On a ship", "In a cave"], why: "Quran 2:35." },
      { q: "What were they told to stay away from?", a: "One tree", wrong: ["A river", "A mountain", "Each other"], why: "Do not come near this tree." },
      { q: "Who made them slip?", a: "Shaytan", wrong: ["An angel", "A bird", "Their children"], why: "Quran 2:36." }
    ]
  },
  {
    slug: "dua",
    title: "The dua of Adam",
    line: "Adam and Hawwa said: our Lord, we have wronged ourselves.",
    facts: ["Quran 7:23", "Allah accepted their repentance"],
    quote: quranQuote(7, 23),
    source: quran(7, 23, "They said: Our Lord, we have wronged ourselves; if You do not forgive us and have mercy on us, we will surely be among the losers."),
    difficulty: 3,
    questions: [
      { q: "What did Adam and his wife do after their mistake?", a: "Asked Allah to forgive them", wrong: ["Blamed Iblis", "Hid forever", "Said nothing"], why: "Quran 7:23." },
      { q: "Who accepts repentance, as Quran 2:37 says?", a: "Allah, the Merciful", wrong: ["The angels", "Iblis", "No one"], why: "He is the Accepting of repentance, the Merciful." },
      { q: "This dua teaches us to admit our mistakes to Allah.", tf: true, why: "Unlike Iblis, Adam did not argue." }
    ]
  },
  {
    slug: "earth",
    title: "Down to the earth",
    line: "Allah sent them down to earth, to live there for a time.",
    facts: ["Quran 2:36", "Guidance would come"],
    quote: quranQuote(2, 38),
    source: quran(2, 38, "We said: go down from it, all of you. When guidance comes to you from Me, whoever follows My guidance will have no fear and will not grieve."),
    difficulty: 3,
    questions: [
      { q: "Where did Adam live after Jannah?", a: "On the earth", wrong: ["In the sky", "On the moon", "Under the sea"], why: "Quran 2:36." },
      { q: "What did Allah promise to send to people on earth?", a: "Guidance", wrong: ["Gold", "Kings", "Nothing"], why: "Quran 2:38." },
      { q: "Who will have no fear and no grief?", a: "Whoever follows Allah's guidance", wrong: ["Whoever is rich", "Whoever is strong", "Everyone"], why: "Quran 2:38." }
    ]
  },
  {
    slug: "father",
    title: "The father of mankind",
    line: "Every person is a child of Adam: one father, one family.",
    facts: ["Quran 7:11", "First human and prophet"],
    quote: quranQuote(7, 11),
    source: quran(7, 11, "We created you, gave you shape, and then told the angels to prostrate to Adam."),
    difficulty: 3,
    questions: [
      { q: "Who is the father of all people?", a: "Adam", wrong: ["Nuh", "Ibrahim", "Iblis"], why: "We are all children of Adam." },
      { q: "Who do people go to first for help on the Day of Judgment?", a: "Adam", wrong: ["Musa", "Isa", "Nuh"], why: "Sahih al-Bukhari 4712." },
      { q: "Adam was a prophet whom Allah spoke to.", tf: true, why: "Allah taught him and spoke to him (Quran 2:33-37)." }
    ]
  }
]);

const IDRIS = unit("prophet-idris", "prophets-unit-idris", "Idris", [
  {
    slug: "truthful",
    title: "A man of truth",
    line: "The Quran calls Idris a man of truth and a prophet.",
    facts: ["Quran 19:56", "Raised to a high place"],
    quote: quranQuote(19, 56),
    source: quran(19, 56, "Mention in the Book Idris. He was a man of truth and a prophet."),
    difficulty: 2,
    questions: [
      { q: "What does the Quran call Idris?", a: "A man of truth and a prophet", wrong: ["A king", "A poet", "An angel"], why: "Quran 19:56." },
      { q: "Where did Allah raise Idris?", a: "To a high place", wrong: ["To a palace", "To a mountain top", "Nowhere"], why: "Quran 19:57." },
      { q: "Quran 21:85 names Idris among the patient.", tf: true, why: "Ismail, Idris and Dhul-Kifl: all were patient." }
    ]
  },
  {
    slug: "fourth-heaven",
    title: "Met on the Night Journey",
    line: "On the Night Journey, he ﷺ met Idris in the fourth heaven.",
    facts: ["Sahih al-Bukhari 3887", "Welcome, brother and prophet"],
    source: hadith("bukhari", "3887", "Malik ibn Sa'sa'ah", "Sahih", "When I went over the fourth heaven, there I saw Idris. Jibril said: this is Idris, greet him. I greeted him and he returned it and said: welcome, O pious brother and pious prophet."),
    difficulty: 3,
    questions: [
      { q: "In which heaven did the Prophet ﷺ meet Idris?", a: "The fourth", wrong: ["The first", "The seventh", "The second"], why: "Sahih al-Bukhari 3887." },
      { q: "What did Idris call him ﷺ?", a: "Pious brother and prophet", wrong: ["My son", "A stranger", "My king"], why: "Welcome, O pious brother and pious prophet." },
      { q: "Who showed the Prophet ﷺ who Idris was?", a: "Jibril", wrong: ["Adam", "Musa", "Abu Bakr"], why: "Jibril said: this is Idris, greet him." }
    ]
  }
]);

const NUH = unit("prophet-nuh", "prophets-unit-nuh", "Nuh", [
  {
    slug: "idols-names",
    title: "Where idols began",
    line: "Nuh's people made statues of good men, then worshipped them.",
    facts: ["Sahih al-Bukhari 4920", "Wadd, Suwa', Yaghuth", "Ya'uq and Nasr"],
    source: hadith("bukhari", "4920", "Ibn Abbas", "Sahih", "The names of the idols were names of righteous men of Nuh's people. When they died, Shaytan told their people to set up statues where they used to sit and to name them after them. They were not worshipped until those people died and knowledge was forgotten."),
    difficulty: 2,
    questions: [
      { q: "Who were the idols of Nuh's people named after?", a: "Righteous men who had died", wrong: ["Kings", "Stars", "Animals"], why: "Sahih al-Bukhari 4920." },
      { q: "When did people start worshipping the statues?", a: "When knowledge was forgotten", wrong: ["Right away", "Never", "When Nuh asked"], why: "Shaytan waited until the knowledge was gone." },
      { q: "Which is a name of one of those idols?", a: "Wadd", wrong: ["Hubal", "Ba'l", "Al-Uzza"], why: "Wadd, Suwa', Yaghuth, Ya'uq and Nasr (Quran 71:23)." }
    ]
  },
  {
    slug: "night-day",
    title: "Calling night and day",
    line: "Nuh called his people night and day, openly and in secret.",
    facts: ["Quran 71:5-9", "They put fingers in ears"],
    quote: quranQuote(71, 5),
    source: quran(71, 5, "He said: My Lord, I called my people night and day, but my call only made them run further away."),
    difficulty: 2,
    questions: [
      { q: "When did Nuh call his people?", a: "Night and day", wrong: ["Only on Fridays", "Once a year", "Only at night"], why: "Quran 71:5." },
      { q: "What did his people do when he called them?", a: "Put their fingers in their ears", wrong: ["Listened gladly", "Gave him gifts", "Made him king"], why: "Quran 71:7." },
      { q: "Nuh tried both public and secret calling.", tf: true, why: "I called them openly, and spoke to them in secret (Quran 71:8-9)." }
    ]
  },
  {
    slug: "istighfar",
    title: "Ask forgiveness, get rain",
    line: "Nuh said: ask Allah's forgiveness, and He sends rain.",
    facts: ["Quran 71:10-12", "Rain, wealth, children"],
    quote: quranQuote(71, 10),
    source: quran(71, 10, "I said: ask forgiveness of your Lord; He is ever forgiving. He will send the sky down on you in abundant rain, and give you wealth and children, gardens and rivers."),
    difficulty: 3,
    questions: [
      { q: "What did Nuh tell his people to ask Allah for?", a: "Forgiveness", wrong: ["Gold", "A new king", "Revenge"], why: "Quran 71:10." },
      { q: "Which is a blessing Nuh promised for istighfar?", a: "Abundant rain", wrong: ["A long sleep", "Fame", "Swords"], why: "Quran 71:11." },
      { q: "Asking forgiveness can bring good in this life too.", tf: true, why: "Rain, wealth, children, gardens and rivers (Quran 71:11-12)." }
    ]
  },
  {
    slug: "mocked",
    title: "Laughed at while building",
    line: "Each time the chiefs passed the Ark, they laughed at Nuh.",
    facts: ["Quran 11:38", "Built under Allah's eyes"],
    quote: quranQuote(11, 38),
    source: quran(11, 38, "He was building the ship, and whenever the chiefs of his people passed by him they mocked him. He said: if you mock us, we will mock you just as you mock."),
    difficulty: 3,
    questions: [
      { q: "What did the chiefs do when they passed Nuh?", a: "Mocked him", wrong: ["Helped him", "Gave him wood", "Prayed with him"], why: "Quran 11:38." },
      { q: "What was Nuh building?", a: "A ship", wrong: ["A tower", "A wall", "A palace"], why: "Construct the ship under Our eyes (Quran 11:37)." },
      { q: "What was the ship made of, as Quran 54:13 says?", a: "Planks and nails", wrong: ["Stone", "Gold", "Reeds only"], why: "We carried him on planks and nails." }
    ]
  },
  {
    slug: "flood",
    title: "The gates of the sky",
    line: "Rain poured, springs burst, and the waters met.",
    facts: ["Quran 54:11-12", "Waves like mountains"],
    quote: quranQuote(54, 11),
    source: quran(54, 11, "We opened the gates of the sky with pouring water, and made the earth burst with springs, and the waters met for a matter already decreed."),
    difficulty: 3,
    questions: [
      { q: "Where did the flood water come from?", a: "The sky and springs in the earth", wrong: ["Only a river", "Only the sea", "A broken dam"], why: "Quran 54:11-12." },
      { q: "How big were the waves?", a: "Like mountains", wrong: ["Like small ripples", "Like hills of sand", "There were none"], why: "Quran 11:42." },
      { q: "The ship sailed under Allah's watch.", tf: true, why: "Sailing under Our eyes (Quran 54:14)." }
    ]
  },
  {
    slug: "son",
    title: "Nuh calls his son",
    line: "Nuh's son hoped a mountain would save him. Only mercy saves.",
    facts: ["Quran 11:42-43", "Only Allah's mercy saves"],
    quote: quranQuote(11, 43),
    source: quran(11, 43, "He said: I will go to a mountain that will protect me from the water. Nuh said: today nothing protects from Allah's decree except for whom He has mercy. And the waves came between them."),
    difficulty: 4,
    questions: [
      { q: "Where did Nuh's son think he would be safe?", a: "On a mountain", wrong: ["In the Ark", "In a cave", "In a city"], why: "Quran 11:43." },
      { q: "What did Nuh say protects that day?", a: "Only Allah's mercy", wrong: ["High mountains", "Strong walls", "Good swimming"], why: "Nothing protects except for whom He has mercy." },
      { q: "Being a prophet's son was enough to be saved.", tf: false, why: "Faith saves, not family (Quran 11:46)." }
    ]
  },
  {
    slug: "judi",
    title: "Resting on al-Judi",
    line: "The earth swallowed the water, and the Ark rested on al-Judi.",
    facts: ["Quran 11:44", "The sky held back"],
    quote: quranQuote(11, 44),
    source: quran(11, 44, "It was said: O earth, swallow your water; O sky, hold back. The water sank, the matter was done, and the ship came to rest on al-Judi."),
    difficulty: 4,
    questions: [
      { q: "Where did the Ark come to rest?", a: "On al-Judi", wrong: ["On Uhud", "On Sinai", "In Makkah"], why: "Quran 11:44." },
      { q: "What was the earth told to do?", a: "Swallow its water", wrong: ["Shake", "Grow trees", "Split open"], why: "O earth, swallow your water." },
      { q: "Who will witness for Nuh on the Day that he gave the message?", a: "Muhammad ﷺ and his ummah", wrong: ["His son", "The angels only", "No one"], why: "Sahih al-Bukhari 3339." }
    ]
  }
]);

const HUD = unit("prophet-hud", "prophets-unit-hud", "Hud", [
  {
    slug: "ad",
    title: "Sent to 'Ad",
    line: "Allah sent Hud to his people, 'Ad: worship Allah alone.",
    facts: ["Quran 7:65", "Their brother Hud"],
    quote: quranQuote(7, 65),
    source: quran(7, 65, "To 'Ad We sent their brother Hud. He said: O my people, worship Allah; you have no god but Him. Will you not fear Him?"),
    difficulty: 1,
    questions: [
      { q: "Which people was Hud sent to?", a: "'Ad", wrong: ["Thamud", "Madyan", "Pharaoh's people"], why: "Quran 7:65." },
      { q: "What did Hud call them to?", a: "Worship Allah alone", wrong: ["Build towers", "Follow their king", "Leave their land"], why: "You have no god but Him." },
      { q: "The Quran calls Hud their brother.", tf: true, why: "He was one of them." }
    ]
  },
  {
    slug: "ahqaf",
    title: "The land of the sandhills",
    line: "Hud warned his people in al-Ahqaf, the land of curved sandhills.",
    facts: ["Quran 46:21", "Surah Al-Ahqaf"],
    quote: quranQuote(46, 21),
    source: quran(46, 21, "Mention the brother of 'Ad, when he warned his people at al-Ahqaf: worship none but Allah; I fear for you the punishment of a terrible day."),
    difficulty: 2,
    questions: [
      { q: "Where did Hud warn his people?", a: "Al-Ahqaf", wrong: ["Madyan", "Egypt", "Babylon"], why: "Quran 46:21." },
      { q: "Which surah is named after their land?", a: "Al-Ahqaf", wrong: ["Hud", "Al-Hijr", "Al-Kahf"], why: "Surah 46." },
      { q: "Hud feared a terrible day for his people.", tf: true, why: "I fear for you the punishment of a terrible day." }
    ]
  },
  {
    slug: "towers",
    title: "Towers for showing off",
    line: "'Ad built towers on every hill just to show off.",
    facts: ["Quran 26:128-129", "Strong and proud"],
    quote: quranQuote(26, 128),
    source: quran(26, 128, "Do you build a landmark on every high place for amusement, and take for yourselves strongholds as if you will live forever?"),
    difficulty: 2,
    questions: [
      { q: "What did 'Ad build on every high place?", a: "Landmarks to show off", wrong: ["Mosques", "Wells", "Schools"], why: "Quran 26:128." },
      { q: "What did they act as if?", a: "They would live forever", wrong: ["They were poor", "They were sick", "They were sorry"], why: "Quran 26:129." },
      { q: "Their strength made them proud instead of thankful.", tf: true, why: "They said: who is stronger than us? (Quran 41:15)." }
    ]
  },
  {
    slug: "cloud",
    title: "A cloud that was not rain",
    line: "'Ad saw a cloud and said: rain! It was a punishing wind.",
    facts: ["Quran 46:24", "Seven nights, eight days"],
    quote: quranQuote(46, 24),
    source: quran(46, 24, "When they saw it as a cloud coming toward their valleys, they said: this cloud will bring us rain. No, it is what you were rushing for: a wind with a painful punishment."),
    difficulty: 3,
    questions: [
      { q: "What did 'Ad think the cloud was?", a: "Rain", wrong: ["Smoke", "Birds", "An army"], why: "Quran 46:24." },
      { q: "How long did the wind blow?", a: "Seven nights and eight days", wrong: ["One hour", "Forty days", "Three nights"], why: "Quran 69:7." },
      { q: "Who did Allah save from the wind?", a: "Hud and the believers", wrong: ["No one", "Only the strong", "The kings"], why: "Quran 11:58." }
    ]
  },
  {
    slug: "winds",
    title: "Two winds",
    line: "The east wind helped him ﷺ; the west wind took 'Ad.",
    facts: ["Sahih al-Bukhari 1035", "As-saba and ad-dabur"],
    source: hadith("bukhari", "1035", "Ibn Abbas", "Sahih", "The Prophet ﷺ said: I was given victory by the east wind (as-saba), and 'Ad were destroyed by the west wind (ad-dabur)."),
    difficulty: 4,
    questions: [
      { q: "Which wind took 'Ad?", a: "The west wind", wrong: ["The east wind", "No wind", "A warm breeze"], why: "Sahih al-Bukhari 1035." },
      { q: "Which wind helped the Prophet ﷺ?", a: "The east wind", wrong: ["The west wind", "A storm at sea", "A sandstorm in Egypt"], why: "As at the battle of the Trench." },
      { q: "When he ﷺ saw a dark cloud, he worried until it rained.", tf: true, why: "He feared it could be like the cloud of 'Ad (Bukhari 3206)." }
    ]
  }
]);

const SALIH = unit("prophet-salih", "prophets-unit-salih", "Salih", [
  {
    slug: "rock-homes",
    title: "Homes in the mountains",
    line: "Thamud carved fine homes out of the mountains.",
    facts: ["Quran 26:149", "Their brother Salih"],
    quote: quranQuote(26, 149),
    source: quran(26, 149, "And you carve homes out of the mountains with great skill."),
    difficulty: 1,
    questions: [
      { q: "What did Thamud carve from the mountains?", a: "Homes", wrong: ["Ships", "Idols only", "Wells"], why: "Quran 26:149." },
      { q: "Who was sent to Thamud?", a: "Salih", wrong: ["Hud", "Lut", "Shu'ayb"], why: "Quran 7:73." },
      { q: "Their homes can still be seen at al-Hijr.", tf: true, why: "The Prophet ﷺ passed them on the way to Tabuk (Bukhari 3378)." }
    ]
  },
  {
    slug: "turns",
    title: "Water by turns",
    line: "The camel drank one day, the people the next: water by turns.",
    facts: ["Quran 54:28", "Do not harm her"],
    quote: quranQuote(54, 28),
    source: quran(54, 28, "Tell them the water is shared between them, each drink by turn."),
    difficulty: 2,
    questions: [
      { q: "How was the water shared with the she-camel?", a: "By turns", wrong: ["The camel got none", "The people got none", "It was sold"], why: "Quran 54:28." },
      { q: "What did Salih warn them not to do?", a: "Harm the camel", wrong: ["Feed the camel", "Pray", "Plant trees"], why: "Quran 7:73." },
      { q: "The she-camel was a sign from Allah.", tf: true, why: "This is the she-camel of Allah, a sign for you (Quran 7:73)." }
    ]
  },
  {
    slug: "wretched",
    title: "The worst of them",
    line: "The worst of Thamud rose up and harmed the she-camel.",
    facts: ["Quran 91:12-14", "Surah Ash-Shams"],
    quote: quranQuote(91, 13),
    source: quran(91, 13, "The messenger of Allah said to them: leave Allah's she-camel and her drink. But they denied him and harmed her."),
    difficulty: 3,
    questions: [
      { q: "Which surah tells this story at its end?", a: "Ash-Shams", wrong: ["Al-Fil", "Al-Ikhlas", "An-Nas"], why: "Quran 91:11-14." },
      { q: "Who rose up to harm the camel?", a: "The worst of them", wrong: ["Salih", "A lion", "A child"], why: "When the most wretched of them rose up (Quran 91:12)." },
      { q: "The people then asked Salih to bring the punishment.", tf: true, why: "They said: bring us what you promise us (Quran 7:77)." }
    ]
  },
  {
    slug: "three-days",
    title: "Three days",
    line: "Salih said: enjoy your homes three days. Then the blast came.",
    facts: ["Quran 11:65-67", "Salih and believers saved"],
    quote: quranQuote(11, 65),
    source: quran(11, 65, "But they harmed her, so he said: enjoy yourselves in your homes for three days; that is a promise that will not be denied."),
    difficulty: 3,
    questions: [
      { q: "How many days were Thamud given?", a: "Three", wrong: ["Seven", "Forty", "One"], why: "Quran 11:65." },
      { q: "Who did Allah save?", a: "Salih and the believers", wrong: ["No one", "Only the camel", "The chiefs"], why: "Quran 11:66." },
      { q: "What took Thamud?", a: "A mighty blast", wrong: ["A flood", "A wind", "A fire from a mountain"], why: "The shriek seized the wrongdoers (Quran 11:67)." }
    ]
  },
  {
    slug: "hijr",
    title: "Passing al-Hijr",
    line: "At al-Hijr, he ﷺ said: only enter such places weeping.",
    facts: ["Sahih al-Bukhari 433", "Water from the camel's well"],
    source: hadith("bukhari", "433", "Abdullah ibn Umar", "Sahih", "Do not enter the places of those people on whom Allah's punishment fell unless you are weeping; if you are not weeping, do not enter, so that what struck them does not strike you."),
    difficulty: 4,
    questions: [
      { q: "How should we pass places punished by Allah?", a: "Weeping and humble", wrong: ["Laughing", "Taking photos for fun", "Racing"], why: "Sahih al-Bukhari 433." },
      { q: "Which well did he ﷺ let them drink from?", a: "The she-camel's well", wrong: ["Any well", "None at all", "The chief's well"], why: "Sahih al-Bukhari 3379." },
      { q: "What did they do with dough made from the other wells?", a: "Fed it to the camels", wrong: ["Ate it", "Sold it", "Buried gold in it"], why: "Sahih al-Bukhari 3379." }
    ]
  }
]);

const IBRAHIM = unit("prophet-ibrahim", "prophets-unit-ibrahim", "Ibrahim", [
  {
    slug: "stars",
    title: "The star, the moon, the sun",
    line: "Ibrahim showed his people: what sets cannot be a lord.",
    facts: ["Quran 6:76-79", "I love not what sets"],
    quote: quranQuote(6, 76),
    source: quran(6, 76, "When the night covered him, he saw a star and said: this is my lord? But when it set, he said: I do not love things that set."),
    difficulty: 2,
    questions: [
      { q: "What did Ibrahim see first that night?", a: "A star", wrong: ["The sun", "A fire", "A ship"], why: "Quran 6:76." },
      { q: "Why can't the sun be a lord?", a: "It sets and disappears", wrong: ["It is too hot", "It is too small", "It is yellow"], why: "Quran 6:78." },
      { q: "Who did Ibrahim turn his face to?", a: "The Creator of the heavens and earth", wrong: ["The moon", "His father's idols", "The king"], why: "Quran 6:79." }
    ]
  },
  {
    slug: "father",
    title: "Gentle with his father",
    line: "Ibrahim asked his father kindly: why worship what cannot hear?",
    facts: ["Quran 19:42-47", "He said: peace be on you"],
    quote: quranQuote(19, 42),
    source: quran(19, 42, "He said to his father: O my father, why do you worship what does not hear, does not see and cannot help you at all?"),
    difficulty: 2,
    questions: [
      { q: "How did Ibrahim speak to his father?", a: "Kindly: O my father", wrong: ["Rudely", "With shouting", "He never spoke"], why: "Quran 19:42." },
      { q: "What could the idols not do?", a: "Hear, see or help", wrong: ["Be carved", "Be carried", "Stand"], why: "Quran 19:42." },
      { q: "Even when his father threatened him, Ibrahim said: peace be on you.", tf: true, why: "Quran 19:47." }
    ]
  },
  {
    slug: "big-idol",
    title: "Ask the big one",
    line: "Ibrahim left the biggest idol and said: ask him, if they speak.",
    facts: ["Quran 21:58-63", "To make them think"],
    quote: quranQuote(21, 63),
    source: quran(21, 63, "He said: rather, this biggest one of them did it, so ask them, if they can speak."),
    difficulty: 3,
    questions: [
      { q: "Which idol did Ibrahim leave whole?", a: "The biggest one", wrong: ["The smallest", "None", "The gold one"], why: "Quran 21:58." },
      { q: "Why did he say: ask them?", a: "To show idols cannot speak", wrong: ["He was joking", "He was scared", "He forgot"], why: "They knew the idols could not speak (Quran 21:65)." },
      { q: "His people admitted for a moment they were wrong.", tf: true, why: "They turned to themselves and said: you are the wrongdoers (Quran 21:64)." }
    ]
  },
  {
    slug: "fire",
    title: "O fire, be cool",
    line: "They threw Ibrahim in a fire. Allah said: be cool and safe.",
    facts: ["Quran 21:69", "Hasbunallah wa ni'mal wakil"],
    quote: quranQuote(21, 69),
    source: quran(21, 69, "We said: O fire, be coolness and safety for Ibrahim."),
    difficulty: 3,
    questions: [
      { q: "What did Allah tell the fire?", a: "Be cool and safe for Ibrahim", wrong: ["Burn hotter", "Go out forever", "Move away"], why: "Quran 21:69." },
      { q: "What did Ibrahim say when thrown in?", a: "Allah is enough for me", wrong: ["Help me, idols", "Nothing", "I give up"], why: "Hasbunallah wa ni'mal wakil (Bukhari 4563)." },
      { q: "The fire harmed Ibrahim a little.", tf: false, why: "It was coolness and safety for him." }
    ]
  },
  {
    slug: "king",
    title: "Bring the sun from the west",
    line: "Ibrahim told the proud king: Allah brings the sun from the east.",
    facts: ["Quran 2:258", "The king was left speechless"],
    quote: quranQuote(2, 258),
    source: quran(2, 258, "Ibrahim said: Allah brings the sun from the east, so you bring it from the west. The disbeliever was left speechless."),
    difficulty: 3,
    questions: [
      { q: "What did Ibrahim ask the king to do?", a: "Bring the sun from the west", wrong: ["Make it rain", "Build a tower", "Free the prisoners"], why: "Quran 2:258." },
      { q: "What happened to the king?", a: "He was speechless", wrong: ["He did it", "He became a prophet", "He laughed"], why: "The disbeliever was overwhelmed." },
      { q: "Why did the king argue?", a: "Allah gave him power and he grew proud", wrong: ["He was poor", "He was a prophet", "He was lost"], why: "Because Allah had given him kingship." }
    ]
  },
  {
    slug: "birds",
    title: "Four birds",
    line: "Ibrahim asked to see how Allah gives life, so his heart rests.",
    facts: ["Quran 2:260", "Four birds came flying"],
    quote: quranQuote(2, 260),
    source: quran(2, 260, "Ibrahim said: My Lord, show me how You give life to the dead. He said: do you not believe? He said: yes, but so my heart may be at rest."),
    difficulty: 4,
    questions: [
      { q: "Why did Ibrahim ask this?", a: "So his heart could be at rest", wrong: ["He did not believe", "To show off", "To test Allah"], why: "Quran 2:260." },
      { q: "How many birds was he told to take?", a: "Four", wrong: ["Two", "Seven", "Ten"], why: "Quran 2:260." },
      { q: "When he called them, what did the birds do?", a: "Came flying to him", wrong: ["Flew away", "Stayed still", "Turned to stone"], why: "They will come to you in haste." }
    ]
  },
  {
    slug: "guests",
    title: "The honored guests",
    line: "Ibrahim hurried to serve his guests a fat roasted calf.",
    facts: ["Quran 51:24-28", "They were angels", "News of a son"],
    quote: quranQuote(51, 26),
    source: quran(51, 26, "Then he went quietly to his family and brought a fat calf."),
    difficulty: 3,
    questions: [
      { q: "What did Ibrahim serve his guests?", a: "A fat roasted calf", wrong: ["Bread only", "Nothing", "Fish"], why: "Quran 51:26." },
      { q: "Who were the guests really?", a: "Angels", wrong: ["Kings", "Traders", "His sons"], why: "They brought good news and then went to Lut's people (Quran 51:28-32)." },
      { q: "What good news did they bring?", a: "A knowledgeable son", wrong: ["A palace", "Rain", "Gold"], why: "Quran 51:28." }
    ]
  },
  {
    slug: "dream",
    title: "The dream of the sacrifice",
    line: "In a dream Ibrahim saw he must sacrifice his son.",
    facts: ["Quran 37:102-107", "A great sacrifice instead"],
    quote: quranQuote(37, 102),
    source: quran(37, 102, "He said: O my son, I have seen in a dream that I must sacrifice you, so what do you think? He said: O my father, do as you are commanded; you will find me, if Allah wills, of the patient."),
    difficulty: 4,
    questions: [
      { q: "What did the son say?", a: "Do as you are commanded", wrong: ["Run away", "Never", "Ask someone else"], why: "Quran 37:102." },
      { q: "What did Allah give in his son's place?", a: "A great sacrifice", wrong: ["Nothing", "Gold", "A new house"], why: "Quran 37:107." },
      { q: "Muslims remember this test at Eid al-Adha.", tf: true, why: "The sacrifice of Eid follows Ibrahim's way." }
    ]
  },
  {
    slug: "imam",
    title: "A leader for all people",
    line: "Ibrahim passed Allah's tests and became a leader for all.",
    facts: ["Quran 2:124", "The close friend of Allah"],
    quote: quranQuote(2, 124),
    source: quran(2, 124, "When his Lord tested Ibrahim with commands and he fulfilled them, Allah said: I will make you a leader for the people."),
    difficulty: 4,
    questions: [
      { q: "What did Allah make Ibrahim after his tests?", a: "A leader for the people", wrong: ["A rich trader", "A king of Egypt", "A sailor"], why: "Quran 2:124." },
      { q: "In every prayer we ask Allah to bless Muhammad ﷺ as He blessed whom?", a: "Ibrahim and his family", wrong: ["Musa and Harun", "Nuh", "Adam"], why: "As You blessed Ibrahim (Bukhari 3370)." },
      { q: "Who is called to Hajj by Ibrahim's call?", a: "All people", wrong: ["Only kings", "Only his sons", "Only angels"], why: "Proclaim the Hajj to the people (Quran 22:27)." }
    ]
  }
]);

const LUT = unit("prophet-lut", "prophets-unit-lut", "Lut", [
  {
    slug: "believed",
    title: "Lut believed Ibrahim",
    line: "Lut believed in Ibrahim and left home with him for Allah.",
    facts: ["Quran 29:26", "Ibrahim's nephew"],
    quote: quranQuote(29, 26),
    source: quran(29, 26, "Lut believed him. And Ibrahim said: I am emigrating to my Lord; He is the Mighty, the Wise."),
    difficulty: 2,
    questions: [
      { q: "Whose message did Lut believe?", a: "Ibrahim's", wrong: ["Hud's", "Nuh's", "Musa's"], why: "Quran 29:26." },
      { q: "What did Ibrahim do then?", a: "Emigrated for Allah", wrong: ["Became a king", "Built a ship", "Stayed home"], why: "I am emigrating to my Lord." },
      { q: "Allah later sent Lut as a prophet to a town of his own.", tf: true, why: "Quran 7:80." }
    ]
  },
  {
    slug: "angels",
    title: "Guests at night",
    line: "Angels came to Lut and said: leave by night, don't look back.",
    facts: ["Quran 11:81", "The morning was near"],
    quote: quranQuote(11, 81),
    source: quran(11, 81, "They said: O Lut, we are messengers of your Lord; they will not reach you. Leave with your family in part of the night, and let none of you look back, except your wife."),
    difficulty: 3,
    questions: [
      { q: "Who were Lut's guests?", a: "Angels", wrong: ["Traders", "Kings", "Shepherds"], why: "We are messengers of your Lord (Quran 11:81)." },
      { q: "When was Lut told to leave?", a: "In part of the night", wrong: ["At noon", "After a year", "Never"], why: "Quran 11:81." },
      { q: "Lut's wife was saved with him.", tf: false, why: "She stayed with the wrongdoers (Quran 66:10)." }
    ]
  },
  {
    slug: "strong-support",
    title: "A strong support",
    line: "He ﷺ said: Allah have mercy on Lut, who wished for support.",
    facts: ["Sahih al-Bukhari 3375", "Allah is the strongest support"],
    source: hadith("bukhari", "3375", "Abu Hurairah", "Sahih", "The Prophet ﷺ said: may Allah forgive Lut; he wished for a strong support."),
    difficulty: 3,
    questions: [
      { q: "What did Lut wish for when his people troubled him?", a: "A strong support", wrong: ["A ship", "A palace", "A long sleep"], why: "Sahih al-Bukhari 3375." },
      { q: "Who was really his strongest support?", a: "Allah", wrong: ["His tribe", "His wife", "The king"], why: "Allah sent the angels to save him." },
      { q: "The Prophet ﷺ spoke of Lut with mercy and love.", tf: true, why: "May Allah have mercy on Lut." }
    ]
  },
  {
    slug: "stones",
    title: "The town turned over",
    line: "Allah turned the town over and rained clay stones on it.",
    facts: ["Quran 11:82", "At morning"],
    quote: quranQuote(11, 82),
    source: quran(11, 82, "When Our command came, We turned the town upside down and rained on it stones of baked clay, layer on layer."),
    difficulty: 4,
    questions: [
      { q: "What did Allah do to the town?", a: "Turned it upside down", wrong: ["Flooded it", "Froze it", "Moved it to Egypt"], why: "Quran 11:82." },
      { q: "What rained on it?", a: "Stones of baked clay", wrong: ["Fire", "Hail", "Sand"], why: "Quran 11:82." },
      { q: "When did the punishment come?", a: "In the morning", wrong: ["At midnight", "After a year", "At sunset"], why: "Their appointment is the morning (Quran 11:81)." }
    ]
  }
]);

const SHUAIB = unit("prophet-shuaib", "prophets-unit-shuaib", "Shu'ayb", [
  {
    slug: "measure",
    title: "Give full measure",
    line: "Shu'ayb told Madyan: give full measure and weight, cheat no one.",
    facts: ["Quran 11:84-85", "Honest trade is worship"],
    quote: quranQuote(11, 85),
    source: quran(11, 85, "O my people, give full measure and weight with justice; do not cheat people of their things, and do not spread corruption on earth."),
    difficulty: 1,
    questions: [
      { q: "What did Madyan do wrong in trade?", a: "Cheated on measure and weight", wrong: ["Gave too much", "Gave free food", "Traded only on Fridays"], why: "Quran 11:84." },
      { q: "What did Shu'ayb ask them to give?", a: "Full measure and weight", wrong: ["Their idols", "Their houses", "Half price"], why: "Quran 11:85." },
      { q: "Cheating people even a little is a wrong in Islam.", tf: true, why: "Do not cheat people of their things." }
    ]
  },
  {
    slug: "reform",
    title: "Only to set things right",
    line: "Shu'ayb said: I only want to set things right as I can.",
    facts: ["Quran 11:88", "My success is from Allah"],
    quote: quranQuote(11, 88),
    source: quran(11, 88, "I only want to set things right as far as I can. My success is only through Allah. In Him I trust and to Him I turn."),
    difficulty: 2,
    questions: [
      { q: "What did Shu'ayb want?", a: "To set things right", wrong: ["To be king", "To get rich", "To take revenge"], why: "Quran 11:88." },
      { q: "Where did Shu'ayb say his success comes from?", a: "Only from Allah", wrong: ["From his family", "From trade", "From the king"], why: "Wa ma tawfiqi illa billah." },
      { q: "Shu'ayb did himself what he told others to do.", tf: true, why: "I don't want to do what I forbid you (Quran 11:88)." }
    ]
  },
  {
    slug: "threat",
    title: "Leave our town!",
    line: "Madyan's chiefs said: return to our religion or leave.",
    facts: ["Quran 7:88", "He trusted Allah"],
    quote: quranQuote(7, 88),
    source: quran(7, 88, "The proud chiefs said: we will drive you out of our town, O Shu'ayb, and those who believe with you, unless you return to our religion."),
    difficulty: 3,
    questions: [
      { q: "What did the chiefs threaten Shu'ayb with?", a: "Driving him out of town", wrong: ["Making him king", "Giving him gold", "Building him a house"], why: "Quran 7:88." },
      { q: "What did they want him to do?", a: "Return to their religion", wrong: ["Teach them", "Lead their trade", "Leave Islam alone"], why: "Unless you return to our religion." },
      { q: "Shu'ayb put his trust in Allah when threatened.", tf: true, why: "Upon Allah we rely (Quran 7:89)." }
    ]
  },
  {
    slug: "blast",
    title: "Saved by mercy",
    line: "Allah saved Shu'ayb's believers; a blast seized the rest.",
    facts: ["Quran 11:94", "Shu'ayb had warned them"],
    quote: quranQuote(11, 94),
    source: quran(11, 94, "When Our command came, We saved Shu'ayb and those who believed with him by Our mercy, and the blast seized those who did wrong."),
    difficulty: 4,
    questions: [
      { q: "How were Shu'ayb and the believers saved?", a: "By Allah's mercy", wrong: ["By running fast", "By their wealth", "By a ship"], why: "Quran 11:94." },
      { q: "What did Shu'ayb say as he turned away?", a: "I gave you the message", wrong: ["I will come back", "I am sorry", "Nothing"], why: "I conveyed my Lord's messages and advised you (Quran 7:93)." },
      { q: "Which prophets' peoples were both seized by a blast?", a: "Salih's and Shu'ayb's", wrong: ["Nuh's and Hud's", "Musa's and Isa's", "Adam's and Idris's"], why: "Quran 11:67 and 11:94." }
    ]
  }
]);

const ISMAIL = unit("prophet-ismail", "prophets-unit-ismail", "Ismail", [
  {
    slug: "valley",
    title: "A valley with no crops",
    line: "Ibrahim prayed for his family in a valley with no crops.",
    facts: ["Quran 14:37", "Near Allah's sacred House"],
    quote: quranQuote(14, 37),
    source: quran(14, 37, "Our Lord, I have settled some of my children in a valley without crops near Your sacred House, so they may establish prayer; make people's hearts incline to them and give them fruits."),
    difficulty: 1,
    questions: [
      { q: "Where did Ibrahim leave baby Ismail and his mother?", a: "A valley with no crops", wrong: ["A green garden", "A big city", "An island"], why: "Quran 14:37." },
      { q: "What did Ibrahim ask for people's hearts?", a: "To incline to them", wrong: ["To fear them", "To forget them", "To fight them"], why: "Quran 14:37." },
      { q: "That valley became Makkah.", tf: true, why: "Near Your sacred House." }
    ]
  },
  {
    slug: "jurhum",
    title: "Growing up with Jurhum",
    line: "Jurhum settled by Zamzam, and Ismail grew up among them.",
    facts: ["Sahih al-Bukhari 3364", "He learned Arabic from them"],
    source: hadith("bukhari", "3364", "Ibn Abbas", "Sahih", "People of the tribe of Jurhum passed by, saw birds over the water, asked Hajar's leave to settle, and stayed. The child grew up, learned Arabic from them, and they loved and admired him."),
    difficulty: 2,
    questions: [
      { q: "Which tribe settled near Zamzam?", a: "Jurhum", wrong: ["Quraysh", "Thamud", "'Ad"], why: "Sahih al-Bukhari 3364." },
      { q: "What did Ismail learn from them?", a: "Arabic", wrong: ["Sailing", "Farming wheat", "Greek"], why: "He learned Arabic from them." },
      { q: "How did they find the water?", a: "Birds circling over it", wrong: ["A map", "A dream", "Smoke"], why: "Birds fly only over water." }
    ]
  },
  {
    slug: "building",
    title: "Raising the House together",
    line: "Ibrahim and Ismail raised the House, praying: accept it from us.",
    facts: ["Quran 2:127", "They prayed for a messenger"],
    quote: quranQuote(2, 127),
    source: quran(2, 127, "When Ibrahim was raising the foundations of the House with Ismail: Our Lord, accept this from us; You are the Hearing, the Knowing."),
    difficulty: 2,
    questions: [
      { q: "What did they ask while building?", a: "Our Lord, accept this from us", wrong: ["Make us famous", "Make it gold", "Finish it fast"], why: "Quran 2:127." },
      { q: "Whose coming did they pray for in 2:129?", a: "A messenger from their children", wrong: ["A king", "An army", "Rain"], why: "That prayer was answered with Muhammad ﷺ." },
      { q: "The Ka'bah was the first mosque built on earth.", tf: true, why: "Then al-Aqsa, forty years later (Bukhari 3366)." }
    ]
  },
  {
    slug: "promise",
    title: "True to his promise",
    line: "Ismail kept his promises and told his family to pray.",
    facts: ["Quran 19:54-55", "A messenger and prophet"],
    quote: quranQuote(19, 54),
    source: quran(19, 54, "Mention in the Book Ismail. He was true to his promise, and he was a messenger and a prophet."),
    difficulty: 3,
    questions: [
      { q: "What is Ismail praised for in Quran 19:54?", a: "Keeping his promise", wrong: ["His wealth", "His strength", "His poetry"], why: "He was true to his promise." },
      { q: "What did he tell his family to do?", a: "Pray and give zakah", wrong: ["Trade more", "Travel", "Sleep early"], why: "Quran 19:55." },
      { q: "Allah was pleased with Ismail.", tf: true, why: "He was pleasing to his Lord (Quran 19:55)." }
    ]
  },
  {
    slug: "archer",
    title: "Your father was an archer",
    line: "He ﷺ said: shoot, children of Ismail; your father was an archer.",
    facts: ["Sahih al-Bukhari 2899", "Ancestor of the Arabs"],
    source: hadith("bukhari", "2899", "Salamah ibn al-Akwa'", "Sahih", "The Prophet ﷺ passed people of Aslam practicing archery and said: shoot, O children of Ismail, for your father was an archer."),
    difficulty: 4,
    questions: [
      { q: "What was Ismail good at?", a: "Archery", wrong: ["Sailing", "Writing", "Farming"], why: "Sahih al-Bukhari 2899." },
      { q: "Who did the Prophet ﷺ call children of Ismail?", a: "Arabs practicing archery", wrong: ["The Romans", "The Persians", "Angels"], why: "People of the tribe of Aslam." },
      { q: "The Prophet ﷺ himself was from Ismail's children.", tf: true, why: "Through Quraysh, from Ismail son of Ibrahim." }
    ]
  }
]);

const ISHAQ_YAQUB = unit("prophet-ishaq-yaqub", "prophets-unit-ishaq-yaqub", "Ishaq and Ya'qub", [
  {
    slug: "good-news",
    title: "Good news for Sarah",
    line: "Sarah smiled at the good news: Ishaq, and after him Ya'qub.",
    facts: ["Quran 11:71", "She was old", "Ibrahim was old too"],
    quote: quranQuote(11, 71),
    source: quran(11, 71, "His wife was standing, and she smiled. Then We gave her good news of Ishaq, and after Ishaq, Ya'qub."),
    difficulty: 1,
    questions: [
      { q: "Who was given the good news of Ishaq?", a: "Sarah, Ibrahim's wife", wrong: ["Hajar", "Maryam", "Asiyah"], why: "Quran 11:71." },
      { q: "Who would come after Ishaq, in the same good news?", a: "Ya'qub", wrong: ["Musa", "Yunus", "Dawud"], why: "And after Ishaq, Ya'qub." },
      { q: "Sarah was amazed because she and Ibrahim were old.", tf: true, why: "Shall I give birth while I am an old woman? (Quran 11:72)" }
    ]
  },
  {
    slug: "prophet-righteous",
    title: "A prophet from the righteous",
    line: "Allah gave Ibrahim Ishaq, a prophet from among the righteous.",
    facts: ["Quran 37:112", "Allah blessed them both"],
    quote: quranQuote(37, 112),
    source: quran(37, 112, "We gave him good news of Ishaq, a prophet from among the righteous."),
    difficulty: 1,
    questions: [
      { q: "What was Ishaq, as Quran 37:112 says?", a: "A prophet from the righteous", wrong: ["A king of Egypt", "A merchant only", "An angel"], why: "Quran 37:112." },
      { q: "Whose son was Ishaq?", a: "Ibrahim's", wrong: ["Nuh's", "Musa's", "Lut's"], why: "Allah gave Ibrahim the good news of him." },
      { q: "Allah blessed both Ibrahim and Ishaq.", tf: true, why: "We blessed him and Ishaq (Quran 37:113)." }
    ]
  },
  {
    slug: "each-a-prophet",
    title: "Each one a prophet",
    line: "Ibrahim left the idols, and Allah gave him Ishaq and Ya'qub.",
    facts: ["Quran 19:49", "Both were prophets"],
    quote: quranQuote(19, 49),
    source: quran(19, 49, "When he left them and what they worshipped besides Allah, We gave him Ishaq and Ya'qub, and each of them We made a prophet."),
    difficulty: 2,
    questions: [
      { q: "What did Ibrahim leave before this gift came?", a: "His people and their idols", wrong: ["His home in Jannah", "The Ka'bah", "His ship"], why: "Quran 19:49." },
      { q: "How many of Ishaq and Ya'qub were made prophets?", a: "Both of them", wrong: ["Only Ishaq", "Only Ya'qub", "Neither"], why: "Each of them We made a prophet." },
      { q: "What is Ya'qub to Ibrahim?", a: "His grandson", wrong: ["His brother", "His father", "His uncle"], why: "Ya'qub is the son of Ishaq, son of Ibrahim." }
    ]
  },
  {
    slug: "strength-vision",
    title: "Strength and vision",
    line: "Allah praised Ibrahim, Ishaq and Ya'qub for strength and vision.",
    facts: ["Quran 38:45", "Chosen and the best"],
    quote: quranQuote(38, 45),
    source: quran(38, 45, "Remember Our servants Ibrahim, Ishaq and Ya'qub, people of strength and vision."),
    difficulty: 2,
    questions: [
      { q: "What two things does Quran 38:45 praise them for?", a: "Strength and vision", wrong: ["Wealth and land", "Poems and songs", "Height and speed"], why: "Those of strength and vision." },
      { q: "What does Allah call them in that ayah?", a: "Our servants", wrong: ["Our kings", "Our angels", "Our judges"], why: "Remember Our servants." },
      { q: "Muslims believe in Ishaq and Ya'qub as prophets.", tf: true, why: "We believe in what was revealed to Ibrahim, Ismail, Ishaq and Ya'qub (Quran 2:136)." }
    ]
  },
  {
    slug: "last-words",
    title: "Ya'qub's last question",
    line: "Dying, Ya'qub asked his sons: what will you worship after me?",
    facts: ["Quran 2:133", "They said: your God", "One God"],
    quote: quranQuote(2, 133),
    source: quran(2, 133, "When death came to Ya'qub, he said to his sons: what will you worship after me? They said: we will worship your God, the God of your fathers Ibrahim, Ismail and Ishaq, one God, and we submit to Him."),
    difficulty: 3,
    questions: [
      { q: "What did Ya'qub ask his sons as he was dying?", a: "What will you worship after me?", wrong: ["Who gets my sheep?", "Where will you live?", "Who is the eldest?"], why: "Quran 2:133." },
      { q: "Which fathers did his sons name?", a: "Ibrahim, Ismail and Ishaq", wrong: ["Nuh, Hud and Salih", "Musa and Harun", "Adam and Idris"], why: "The God of your fathers Ibrahim, Ismail and Ishaq." },
      { q: "What did Ibrahim and Ya'qub tell their sons, in Quran 2:132?", a: "Do not die except as Muslims", wrong: ["Build a big city", "Never travel", "Stay rich"], why: "Allah has chosen this religion for you." }
    ]
  }
]);

const YUSUF = unit("prophet-yusuf", "prophets-unit-yusuf", "Yusuf", [
  {
    slug: "honorable",
    title: "Honorable, son of the honorable",
    line: "Yusuf, son of Ya'qub, son of Ishaq, son of Ibrahim.",
    facts: ["Sahih al-Bukhari 3390", "Four prophets in a row"],
    source: hadith("bukhari", "3390", "Ibn Umar", "Sahih", "The honorable, son of the honorable, son of the honorable, son of the honorable: Yusuf son of Ya'qub son of Ishaq son of Ibrahim."),
    difficulty: 1,
    questions: [
      { q: "Who was Yusuf's father?", a: "Ya'qub", wrong: ["Ibrahim", "Musa", "Ismail"], why: "Sahih al-Bukhari 3390." },
      { q: "Who was Yusuf's great-grandfather?", a: "Ibrahim", wrong: ["Nuh", "Adam", "Lut"], why: "Yusuf son of Ya'qub son of Ishaq son of Ibrahim." },
      { q: "Who is the most honorable of people, the Prophet ﷺ said first?", a: "The one who fears Allah most", wrong: ["The richest", "The tallest", "The oldest"], why: "Sahih al-Bukhari 3374." }
    ]
  },
  {
    slug: "dream",
    title: "Eleven stars, the sun and the moon",
    line: "Yusuf saw eleven stars, the sun and the moon bow to him.",
    facts: ["Quran 12:4", "Keep it secret", "Shaytan is an enemy"],
    quote: quranQuote(12, 4),
    source: quran(12, 4, "Yusuf said to his father: O my father, I saw eleven stars and the sun and the moon; I saw them bowing to me."),
    difficulty: 1,
    questions: [
      { q: "How many stars did Yusuf see in his dream?", a: "Eleven", wrong: ["Seven", "Twelve", "Forty"], why: "Quran 12:4." },
      { q: "What did Ya'qub tell him about the dream?", a: "Do not tell your brothers", wrong: ["Tell everyone", "Write it down", "Forget it"], why: "They will plot against you (Quran 12:5)." },
      { q: "Who did Ya'qub warn is man's open enemy?", a: "Shaytan", wrong: ["The king", "The wolf", "The stars"], why: "Quran 12:5." }
    ]
  },
  {
    slug: "well",
    title: "Down the well",
    line: "His brothers threw Yusuf into a well, but Allah comforted him.",
    facts: ["Quran 12:15", "Allah inspired him"],
    quote: quranQuote(12, 15),
    source: quran(12, 15, "When they took him and agreed to put him at the bottom of the well, We inspired him: you will one day tell them about what they did, while they do not know you."),
    difficulty: 2,
    questions: [
      { q: "Where did the brothers put Yusuf?", a: "At the bottom of a well", wrong: ["On a ship", "In a palace", "In a cave"], why: "Quran 12:15." },
      { q: "What did Allah tell Yusuf in the well?", a: "One day you will tell them of this", wrong: ["Stay here forever", "Run to Egypt", "Fight them"], why: "Quran 12:15." },
      { q: "Yusuf was alone in the well, without Allah's help.", tf: false, why: "Allah inspired and comforted him there." }
    ]
  },
  {
    slug: "beautiful-patience",
    title: "Beautiful patience",
    line: "Shown a shirt with false blood, Ya'qub chose beautiful patience.",
    facts: ["Quran 12:18", "Sabrun jamil", "Allah is the helper"],
    quote: quranQuote(12, 18),
    source: quran(12, 18, "They brought his shirt with false blood on it. He said: your souls have tempted you into something, so patience is most fitting, and Allah is the One whose help is sought."),
    difficulty: 2,
    questions: [
      { q: "What did the brothers bring back to Ya'qub?", a: "Yusuf's shirt with false blood", wrong: ["His sandals", "A letter", "Nothing"], why: "Quran 12:18." },
      { q: "What did Ya'qub choose?", a: "Beautiful patience", wrong: ["Anger at his sons", "To give up", "Revenge"], why: "Sabrun jamil: patience is most fitting." },
      { q: "Whose help did Ya'qub seek?", a: "Allah's", wrong: ["The king's", "His neighbors'", "No one's"], why: "Allah is the One whose help is sought." }
    ]
  },
  {
    slug: "refuge",
    title: "I seek refuge in Allah",
    line: "When tempted to sin, Yusuf said: I seek refuge in Allah.",
    facts: ["Quran 12:23", "He said no to sin"],
    quote: quranQuote(12, 23),
    source: quran(12, 23, "The woman in whose house he lived tried to tempt him and closed the doors. He said: I seek refuge in Allah. Wrongdoers never succeed."),
    difficulty: 2,
    questions: [
      { q: "What did Yusuf say when he was tempted?", a: "I seek refuge in Allah", wrong: ["Maybe later", "Nobody will know", "Let me think"], why: "Quran 12:23." },
      { q: "Who did Yusuf say will never succeed?", a: "Wrongdoers", wrong: ["Travelers", "The poor", "Shepherds"], why: "Quran 12:23." },
      { q: "Yusuf turned to Allah to stay away from sin.", tf: true, why: "He sought Allah's refuge." }
    ]
  },
  {
    slug: "prison",
    title: "Prison is dearer to me",
    line: "Yusuf said prison was better than doing what they asked.",
    facts: ["Quran 12:33", "He asked Allah's help"],
    quote: quranQuote(12, 33),
    source: quran(12, 33, "He said: my Lord, prison is dearer to me than what they invite me to. If You do not turn their plan away from me, I may lean towards them."),
    difficulty: 3,
    questions: [
      { q: "What did Yusuf prefer over sin?", a: "Prison", wrong: ["Running away", "Gold", "A new home"], why: "Quran 12:33." },
      { q: "Who did Yusuf ask to keep him safe from their plan?", a: "His Lord", wrong: ["The king", "His brothers", "The guards"], why: "If You do not turn their plan away from me." },
      { q: "What did the Prophet ﷺ say of Yusuf's long time in prison?", a: "He would have left sooner", wrong: ["Yusuf was wrong", "It was short", "Nothing at all"], why: "He praised Yusuf's patience (Sahih al-Bukhari 3372)." }
    ]
  },
  {
    slug: "one-allah",
    title: "Calling in prison",
    line: "In prison Yusuf asked: many lords, or Allah, the One?",
    facts: ["Quran 12:39", "He taught tawhid first"],
    quote: quranQuote(12, 39),
    source: quran(12, 39, "O my two prison companions, are many different lords better, or Allah, the One, the Supreme?"),
    difficulty: 3,
    questions: [
      { q: "Who did Yusuf call to Allah in prison?", a: "His two prison companions", wrong: ["The king", "His brothers", "The guards"], why: "Quran 12:39." },
      { q: "What did Yusuf teach before explaining their dreams?", a: "That Allah is One", wrong: ["How to escape", "How to trade", "Poetry"], why: "Quran 12:37-40." },
      { q: "Yusuf stopped calling to Allah once he was in prison.", tf: false, why: "He called even there." }
    ]
  },
  {
    slug: "kings-dream",
    title: "Seven fat cows",
    line: "The king dreamt of seven fat cows eaten by seven thin ones.",
    facts: ["Quran 12:43", "Seven good years", "Then seven hard years"],
    quote: quranQuote(12, 47),
    source: quran(12, 47, "Yusuf said: plant for seven years as usual, and leave what you harvest in its ears, except a little that you eat."),
    difficulty: 3,
    questions: [
      { q: "What ate the seven fat cows in the king's dream?", a: "Seven thin cows", wrong: ["Seven lions", "Seven birds", "A flood"], why: "Quran 12:43." },
      { q: "What did Yusuf say to do with the harvest?", a: "Leave it stored in its ears", wrong: ["Sell it all", "Burn it", "Eat it at once"], why: "Quran 12:47." },
      { q: "What job did Yusuf ask the king for?", a: "Over the storehouses", wrong: ["Army chief", "Royal poet", "Ship captain"], why: "Appoint me over the storehouses (Quran 12:55)." }
    ]
  },
  {
    slug: "no-despair",
    title: "Never lose hope",
    line: "Ya'qub told his sons: never lose hope in Allah's mercy.",
    facts: ["Quran 12:87", "He complained to Allah"],
    quote: quranQuote(12, 87),
    source: quran(12, 87, "O my sons, go and search for Yusuf and his brother, and do not lose hope in Allah's mercy. Only disbelieving people lose hope in Allah's mercy."),
    difficulty: 4,
    questions: [
      { q: "Who did Ya'qub say loses hope in Allah's mercy?", a: "Disbelieving people", wrong: ["Old people", "Travelers", "Children"], why: "Quran 12:87." },
      { q: "Who did Ya'qub complain to about his grief?", a: "Only to Allah", wrong: ["To the king", "To everyone", "To no one, not even Allah"], why: "I complain of my grief only to Allah (Quran 12:86)." },
      { q: "Ya'qub kept hoping for years that Yusuf would return.", tf: true, why: "Go and search for Yusuf and his brother." }
    ]
  },
  {
    slug: "no-blame",
    title: "No blame on you today",
    line: "Yusuf forgave his brothers: no blame on you today.",
    facts: ["Quran 12:92", "Allah will forgive you"],
    quote: quranQuote(12, 92),
    source: quran(12, 92, "He said: no blame on you today. Allah will forgive you, and He is the Most Merciful of the merciful."),
    difficulty: 4,
    questions: [
      { q: "What did Yusuf say to the brothers who wronged him?", a: "No blame on you today", wrong: ["You will pay", "Leave Egypt", "I will never forget"], why: "Quran 12:92." },
      { q: "What did Yusuf send to make his father see again?", a: "His shirt", wrong: ["Medicine", "A letter", "Gold"], why: "Cast it over my father's face (Quran 12:93)." },
      { q: "Yusuf had the power to punish them, yet he forgave.", tf: true, why: "He was in charge in Egypt and still forgave." }
    ]
  },
  {
    slug: "dream-true",
    title: "The dream comes true",
    line: "His parents and brothers bowed: the old dream came true.",
    facts: ["Quran 12:100", "Allah is Subtle", "Die as a Muslim"],
    quote: quranQuote(12, 101),
    source: quran(12, 101, "My Lord, You have given me power and taught me the meaning of dreams. Creator of the heavens and earth, You are my protector in this life and the next. Let me die a Muslim and join me with the righteous."),
    difficulty: 5,
    questions: [
      { q: "What did the eleven stars stand for, as the story ends?", a: "His eleven brothers", wrong: ["Eleven kings", "Eleven years", "Eleven cities"], why: "His parents and brothers bowed (Quran 12:100)." },
      { q: "In his last dua, how did Yusuf ask to die?", a: "As a Muslim", wrong: ["As a king", "As a rich man", "Far from home"], why: "Quran 12:101." },
      { q: "After all his power, Yusuf still asked to join the righteous.", tf: true, why: "Join me with the righteous." }
    ]
  }
]);

const AYYUB = unit("prophet-ayyub", "prophets-unit-ayyub", "Ayyub", [
  {
    slug: "called",
    title: "Hardship has touched me",
    line: "Ayyub called: hardship has touched me; You are Most Merciful.",
    facts: ["Quran 21:83", "He did not complain"],
    quote: quranQuote(21, 83),
    source: quran(21, 83, "Ayyub called to his Lord: hardship has touched me, and You are the Most Merciful of the merciful."),
    difficulty: 1,
    questions: [
      { q: "What did Ayyub say had touched him?", a: "Hardship", wrong: ["Wealth", "Fame", "Laziness"], why: "Quran 21:83." },
      { q: "What name of Allah did Ayyub call on?", a: "Most Merciful of the merciful", wrong: ["The Avenger", "The King only", "None"], why: "Quran 21:83." },
      { q: "Ayyub turned to Allah in his hardship.", tf: true, why: "He called to his Lord." }
    ]
  },
  {
    slug: "spring",
    title: "Strike the ground",
    line: "Allah told Ayyub to strike the ground: out came a cool spring.",
    facts: ["Quran 38:42", "Bathe and drink"],
    quote: quranQuote(38, 42),
    source: quran(38, 42, "Strike the ground with your foot: here is cool water to wash in and to drink."),
    difficulty: 2,
    questions: [
      { q: "What was Ayyub told to strike?", a: "The ground, with his foot", wrong: ["A rock, with a staff", "The sea", "A tree"], why: "Quran 38:42." },
      { q: "What came out for him?", a: "Cool water to wash and drink", wrong: ["Gold", "Fire", "Bread"], why: "Quran 38:42." },
      { q: "What did Allah give back to Ayyub?", a: "His family, and as many again", wrong: ["Only his house", "Nothing", "A kingdom"], why: "Quran 21:84 and 38:43." }
    ]
  },
  {
    slug: "excellent",
    title: "An excellent servant",
    line: "Allah said: We found him patient. What an excellent servant!",
    facts: ["Quran 38:44", "Always turning to Allah"],
    quote: quranQuote(38, 44),
    source: quran(38, 44, "We found him patient. What an excellent servant! He was always turning back to Allah."),
    difficulty: 3,
    questions: [
      { q: "What did Allah find Ayyub to be?", a: "Patient", wrong: ["Angry", "Impatient", "Lazy"], why: "Quran 38:44." },
      { q: "What did Allah call him?", a: "An excellent servant", wrong: ["A great king", "A rich man", "A poet"], why: "Quran 38:44." },
      { q: "Ayyub's story is a reminder for worshippers.", tf: true, why: "A mercy from Us and a reminder (Quran 21:84)." }
    ]
  },
  {
    slug: "locusts",
    title: "Golden locusts",
    line: "Golden locusts fell on Ayyub, and he gathered Allah's blessing.",
    facts: ["Sahih al-Bukhari 279", "No one is above blessings"],
    source: hadith("bukhari", "279", "Abu Hurairah", "Sahih", "While Ayyub was bathing, golden locusts fell on him and he gathered them. His Lord called: have I not made you rich enough? He said: yes, by Your might, but I can never do without Your blessing."),
    difficulty: 4,
    questions: [
      { q: "What fell on Ayyub after his cure?", a: "Golden locusts", wrong: ["Rain only", "Stones", "Leaves"], why: "Sahih al-Bukhari 279." },
      { q: "Why did Ayyub gather them, though he was rich?", a: "He always needs Allah's blessing", wrong: ["He was greedy", "To sell them", "To feed birds"], why: "I can never do without Your blessing." },
      { q: "Whose hadith tells this story?", a: "Abu Hurairah's", wrong: ["Aishah's", "Ibn Umar's", "Anas's"], why: "Sahih al-Bukhari 279." }
    ]
  }
]);

const YUNUS = unit("prophet-yunus", "prophets-unit-yunus", "Yunus", [
  {
    slug: "ship",
    title: "Onto the ship",
    line: "Yunus left his people in anger and boarded a full ship.",
    facts: ["Quran 37:139-140", "He was a messenger"],
    quote: quranQuote(37, 140),
    source: quran(37, 140, "Yunus was one of the messengers, when he ran away to the loaded ship."),
    difficulty: 1,
    questions: [
      { q: "Where did Yunus go when he left his people?", a: "Onto a loaded ship", wrong: ["Into a cave", "Up a mountain", "Into a palace"], why: "Quran 37:140." },
      { q: "How did Yunus leave, as Quran 21:87 says?", a: "In anger", wrong: ["Laughing", "With the king", "With his whole town"], why: "When he went off in anger." },
      { q: "Yunus was one of Allah's messengers.", tf: true, why: "Quran 37:139." }
    ]
  },
  {
    slug: "fish",
    title: "Inside the fish",
    line: "Lots were drawn on the ship, and a great fish swallowed Yunus.",
    facts: ["Quran 37:141-142", "Man of the fish"],
    quote: quranQuote(37, 142),
    source: quran(37, 142, "Then the fish swallowed him, while he was to blame."),
    difficulty: 2,
    questions: [
      { q: "What swallowed Yunus?", a: "A great fish", wrong: ["The earth", "A storm cloud", "A lion"], why: "Quran 37:142." },
      { q: "What was drawn on the ship?", a: "Lots", wrong: ["Maps", "Pictures", "Swords"], why: "He drew lots and lost (Quran 37:141)." },
      { q: "What is Yunus called in Quran 21:87?", a: "The man of the fish", wrong: ["The man of the cave", "The man of the ark", "The man of the well"], why: "Dhun-Nun." }
    ]
  },
  {
    slug: "darkness",
    title: "A dua in the darkness",
    line: "In the darkness he said: none but You; glory be to You.",
    facts: ["Quran 21:87-88", "Allah saved him"],
    quote: quranQuote(21, 87),
    source: quran(21, 87, "He called out in the darkness: there is no god but You, glory be to You; I have been one of the wrongdoers. So We answered him and saved him from distress."),
    difficulty: 2,
    questions: [
      { q: "Where did Yunus make his dua?", a: "In the darkness", wrong: ["On a mountain", "In a masjid", "In a palace"], why: "Quran 21:87." },
      { q: "What did Yunus admit in his dua?", a: "I have been a wrongdoer", wrong: ["I am the best", "It was their fault", "Nothing"], why: "Quran 21:87." },
      { q: "Allah says He saves believers the same way.", tf: true, why: "Thus do We save the believers (Quran 21:88)." }
    ]
  },
  {
    slug: "dua-answered",
    title: "A dua that is answered",
    line: "Any Muslim who calls with Yunus's dua, Allah answers him.",
    facts: ["Jami at-Tirmidhi 3505", "Graded Sahih"],
    source: hadith("tirmidhi", "3505", "Sa'd ibn Abi Waqqas", "Sahih", "The dua of Dhun-Nun in the belly of the fish: la ilaha illa anta, subhanaka, inni kuntu minaz-zalimin. No Muslim calls with it for anything except that Allah answers him."),
    difficulty: 3,
    questions: [
      { q: "Who answers the Muslim who makes Yunus's dua?", a: "Allah", wrong: ["The angels only", "No one", "His friends"], why: "Jami at-Tirmidhi 3505." },
      { q: "Which words begin the dua of Yunus?", a: "La ilaha illa anta", wrong: ["Rabbana atina", "Bismillah", "Allahu akbar"], why: "There is no god but You." },
      { q: "Who narrated the hadith of Yunus's dua?", a: "Sa'd ibn Abi Waqqas", wrong: ["Abu Hurairah", "Aishah", "Anas"], why: "Jami at-Tirmidhi 3505." }
    ]
  },
  {
    slug: "shore",
    title: "The shore and the gourd",
    line: "He would have stayed in the fish, but he glorified Allah.",
    facts: ["Quran 37:143-146", "A gourd plant shaded him"],
    quote: quranQuote(37, 146),
    source: quran(37, 146, "Had he not been one who glorified Allah, he would have stayed in its belly until the Day they are raised. We cast him onto the open shore, sick, and made a gourd plant grow over him."),
    difficulty: 4,
    questions: [
      { q: "Why was Yunus let out of the fish?", a: "He glorified Allah", wrong: ["He was strong", "The fish was full", "Sailors saved him"], why: "Quran 37:143-144." },
      { q: "What grew over him on the shore?", a: "A gourd plant", wrong: ["A palm tree", "Roses", "Nothing"], why: "Quran 37:146." },
      { q: "How was Yunus when he reached the shore?", a: "Sick", wrong: ["Rich", "Asleep for years", "Angry"], why: "We cast him onto the open shore, sick." }
    ]
  },
  {
    slug: "town-believed",
    title: "A whole town believed",
    line: "His people believed in time, and the punishment was lifted.",
    facts: ["Quran 10:98", "A hundred thousand or more"],
    quote: quranQuote(10, 98),
    source: quran(10, 98, "No town believed and was helped by its faith except the people of Yunus. When they believed, We lifted from them the punishment of disgrace."),
    difficulty: 4,
    questions: [
      { q: "Which people were saved because they believed in time?", a: "The people of Yunus", wrong: ["The people of Nuh", "The people of Lut", "Pharaoh's people"], why: "Quran 10:98." },
      { q: "How many people was Yunus sent to?", a: "A hundred thousand or more", wrong: ["Only ten", "Only his family", "Seven"], why: "Quran 37:147." },
      { q: "What did the Prophet ﷺ say about Yunus ibn Matta?", a: "None should say: I am better than him", wrong: ["He was not a prophet", "Forget his story", "He was a king"], why: "Sahih al-Bukhari 3416." }
    ]
  }
]);

const MUSA = unit("prophet-musa", "prophets-unit-musa", "Musa and Harun", [
  {
    slug: "river",
    title: "A baby on the river",
    line: "Allah told Musa's mother: put him in the river, do not fear.",
    facts: ["Quran 28:7", "Allah promised to return him"],
    quote: quranQuote(28, 7),
    source: quran(28, 7, "We inspired Musa's mother: nurse him, and when you fear for him, put him in the river. Do not fear and do not grieve. We will return him to you and make him a messenger."),
    difficulty: 1,
    questions: [
      { q: "Where did Musa's mother put her baby?", a: "In the river", wrong: ["In a cave", "On a mountain", "In a well"], why: "Quran 28:7." },
      { q: "What two things did Allah promise her?", a: "Return him and make him a messenger", wrong: ["Gold and land", "A palace", "Nothing"], why: "Quran 28:7." },
      { q: "Allah told her not to fear and not to grieve.", tf: true, why: "Quran 28:7." }
    ]
  },
  {
    slug: "returned",
    title: "Back to his mother",
    line: "Allah brought baby Musa back to nurse with his own mother.",
    facts: ["Quran 28:13", "Allah's promise is true"],
    quote: quranQuote(28, 13),
    source: quran(28, 13, "So We returned him to his mother so she would be comforted and not grieve, and know that Allah's promise is true."),
    difficulty: 1,
    questions: [
      { q: "Who nursed Musa in the end?", a: "His own mother", wrong: ["Pharaoh", "A stranger", "No one"], why: "Quran 28:13." },
      { q: "What did his mother learn from this?", a: "Allah's promise is true", wrong: ["Rivers are safe", "Kings are kind", "Nothing"], why: "Quran 28:13." },
      { q: "Musa grew up in the house of Pharaoh.", tf: true, why: "Pharaoh's family picked him up (Quran 28:8-9)." }
    ]
  },
  {
    slug: "forgive-me",
    title: "My Lord, forgive me",
    line: "After a fight went wrong, Musa said: my Lord, forgive me.",
    facts: ["Quran 28:16", "Allah forgave him"],
    quote: quranQuote(28, 16),
    source: quran(28, 16, "He said: my Lord, I have wronged myself, so forgive me. So He forgave him. He is the Forgiving, the Merciful."),
    difficulty: 2,
    questions: [
      { q: "What did Musa do after his mistake?", a: "Asked Allah to forgive him", wrong: ["Hid it", "Blamed others", "Bragged"], why: "Quran 28:16." },
      { q: "What did Allah do?", a: "He forgave him", wrong: ["Ignored him", "Sent him away", "Nothing"], why: "So He forgave him." },
      { q: "Musa called the fight the work of Shaytan.", tf: true, why: "This is from Shaytan's work (Quran 28:15)." }
    ]
  },
  {
    slug: "madyan",
    title: "At the well of Madyan",
    line: "In Madyan, Musa watered two women's flock, then made a dua.",
    facts: ["Quran 28:24", "I am in need"],
    quote: quranQuote(28, 24),
    source: quran(28, 24, "So he watered their flock for them, then went back to the shade and said: my Lord, I am in need of whatever good You send down to me."),
    difficulty: 2,
    questions: [
      { q: "How did Musa help the two women?", a: "He watered their flock", wrong: ["He built them a house", "He gave them gold", "He sold their sheep"], why: "Quran 28:23-24." },
      { q: "What did Musa say in the shade?", a: "My Lord, I am in need", wrong: ["I am tired of this", "Nobody helps me", "I am rich"], why: "Quran 28:24." },
      { q: "Why did the woman say her father should hire Musa?", a: "He was strong and trustworthy", wrong: ["He was rich", "He was famous", "He was a prince"], why: "Quran 28:26." }
    ]
  },
  {
    slug: "tuwa",
    title: "The sacred valley",
    line: "In the valley of Tuwa, Allah spoke: take off your sandals.",
    facts: ["Quran 20:12-14", "Allah spoke to Musa"],
    quote: quranQuote(20, 14),
    source: quran(20, 14, "Indeed, I am Allah. There is no god but Me, so worship Me and establish prayer to remember Me."),
    difficulty: 2,
    questions: [
      { q: "What was Musa told to take off?", a: "His sandals", wrong: ["His cloak", "His ring", "His turban"], why: "Quran 20:12." },
      { q: "What was the valley called?", a: "Tuwa", wrong: ["Badr", "Uhud", "Arafah"], why: "The sacred valley of Tuwa (Quran 20:12)." },
      { q: "Why does Allah say to pray, in Quran 20:14?", a: "To remember Him", wrong: ["To be seen", "To rest", "To get rich"], why: "Establish prayer to remember Me." }
    ]
  },
  {
    slug: "staff",
    title: "The staff and the hand",
    line: "Musa's staff became a moving snake, and his hand shone white.",
    facts: ["Quran 20:17-22", "Two signs"],
    quote: quranQuote(20, 20),
    source: quran(20, 20, "So he threw it down, and suddenly it was a snake, moving fast."),
    difficulty: 3,
    questions: [
      { q: "What did Musa use his staff for at first?", a: "Leaning and his sheep", wrong: ["Fighting", "Fishing", "Writing"], why: "Quran 20:18." },
      { q: "What did the staff become when thrown?", a: "A moving snake", wrong: ["A tree", "A bird", "Gold"], why: "Quran 20:20." },
      { q: "What was the second sign Allah gave?", a: "His hand came out white", wrong: ["He could fly", "Rain fell", "A star moved"], why: "White without disease (Quran 20:22)." }
    ]
  },
  {
    slug: "open-my-chest",
    title: "Expand my chest",
    line: "Musa asked: expand my chest, ease my task, untie my tongue.",
    facts: ["Quran 20:25-28", "Harun as his helper"],
    quote: quranQuote(20, 25),
    source: quran(20, 25, "Musa said: my Lord, expand my chest for me, make my task easy for me, and untie the knot from my tongue, so they understand my speech."),
    difficulty: 3,
    questions: [
      { q: "What did Musa ask Allah to untie?", a: "The knot from his tongue", wrong: ["His sandals", "A rope", "A boat"], why: "Quran 20:27." },
      { q: "Whom did Musa ask for as his helper?", a: "His brother Harun", wrong: ["His father", "Pharaoh", "Al-Khidr"], why: "Quran 20:29-30." },
      { q: "Muslims still say this dua before hard tasks.", tf: true, why: "Rabbi-shrah li sadri: expand my chest." }
    ]
  },
  {
    slug: "harun",
    title: "Harun, a prophet too",
    line: "Out of His mercy, Allah made Harun a prophet for Musa.",
    facts: ["Quran 19:53", "Musa's brother"],
    quote: quranQuote(19, 53),
    source: quran(19, 53, "And out of Our mercy We gave him his brother Harun as a prophet."),
    difficulty: 3,
    questions: [
      { q: "Who was Harun to Musa?", a: "His brother", wrong: ["His son", "His uncle", "His teacher"], why: "Quran 19:53." },
      { q: "Why did Allah give Musa Harun as a prophet?", a: "Out of His mercy", wrong: ["Harun asked for it", "By chance", "For money"], why: "Out of Our mercy." },
      { q: "Allah spoke to Musa directly.", tf: true, why: "Allah spoke to Musa with speech (Quran 4:164)." }
    ]
  },
  {
    slug: "gentle-words",
    title: "Speak to him gently",
    line: "Allah sent Musa and Harun to Pharaoh: speak to him gently.",
    facts: ["Quran 20:43-44", "Even to a tyrant"],
    quote: quranQuote(20, 44),
    source: quran(20, 44, "Speak to him with gentle words, so perhaps he may remember or fear Allah."),
    difficulty: 3,
    questions: [
      { q: "How were Musa and Harun told to speak to Pharaoh?", a: "Gently", wrong: ["Loudly", "Rudely", "Not at all"], why: "Quran 20:44." },
      { q: "Why speak gently?", a: "So he might remember Allah", wrong: ["To get gifts", "To trick him", "To be famous"], why: "So perhaps he may remember or fear." },
      { q: "Pharaoh had gone beyond all limits.", tf: true, why: "He has transgressed (Quran 20:43)." }
    ]
  },
  {
    slug: "magicians",
    title: "The magicians bow",
    line: "Pharaoh's magicians saw the truth and fell down in sajdah.",
    facts: ["Quran 7:120-122", "Lord of Musa and Harun"],
    quote: quranQuote(7, 121),
    source: quran(7, 121, "The magicians fell down in prostration. They said: we believe in the Lord of the worlds, the Lord of Musa and Harun."),
    difficulty: 4,
    questions: [
      { q: "What did the magicians do when they saw the sign?", a: "Fell in prostration to Allah", wrong: ["Ran away", "Laughed", "Attacked Musa"], why: "Quran 7:120." },
      { q: "Whom did they believe in?", a: "The Lord of Musa and Harun", wrong: ["Pharaoh", "Their idols", "No one"], why: "Quran 7:122." },
      { q: "The magicians came as Pharaoh's helpers but became believers.", tf: true, why: "They saw Musa's sign was not magic." }
    ]
  },
  {
    slug: "sea",
    title: "The sea splits",
    line: "Trapped at the sea, Musa said: my Lord is with me.",
    facts: ["Quran 26:61-63", "Like great mountains"],
    quote: quranQuote(26, 62),
    source: quran(26, 62, "Musa said: no! My Lord is with me; He will guide me."),
    difficulty: 4,
    questions: [
      { q: "What did Musa's people fear at the sea?", a: "Being caught", wrong: ["Rain", "Hunger", "Sleep"], why: "We will surely be overtaken (Quran 26:61)." },
      { q: "What did Musa strike the sea with?", a: "His staff", wrong: ["His hand", "A sword", "A stone"], why: "Quran 26:63." },
      { q: "What did each part of the split sea look like?", a: "A great mountain", wrong: ["A small stream", "A cloud", "A bridge"], why: "Quran 26:63." }
    ]
  },
  {
    slug: "ashura",
    title: "The day of Ashura",
    line: "Musa fasted the day Allah saved him; the Prophet ﷺ fasted too.",
    facts: ["Sahih al-Bukhari 3397", "Fast of gratitude"],
    source: hadith("bukhari", "3397", "Ibn Abbas", "Sahih", "In Madinah the Prophet ﷺ found people fasting Ashura. They said: this is the day Allah saved Musa and drowned Pharaoh's people, and Musa fasted it in thanks. He said: I am closer to Musa than they are, and he fasted it and told Muslims to fast."),
    difficulty: 4,
    questions: [
      { q: "What happened on the day of Ashura?", a: "Allah saved Musa", wrong: ["Nuh's ark landed", "Yusuf left prison", "Adam was made"], why: "Sahih al-Bukhari 3397." },
      { q: "Why did Musa fast that day?", a: "To thank Allah", wrong: ["He was sick", "He was lost", "For a contest"], why: "As a sign of gratitude." },
      { q: "What did the Prophet ﷺ say about Musa?", a: "I am closer to Musa", wrong: ["Musa was wrong", "Forget Musa", "Nothing"], why: "Sahih al-Bukhari 3397." }
    ]
  },
  {
    slug: "pharaoh-drowns",
    title: "Too late for Pharaoh",
    line: "Only when drowning did Pharaoh say he believed: too late.",
    facts: ["Quran 10:90-91", "His body kept as a sign"],
    quote: quranQuote(10, 90),
    source: quran(10, 90, "We took the Children of Isra'il across the sea, and Pharaoh and his soldiers chased them. When drowning overtook him, he said: I believe there is no god but the One that the Children of Isra'il believe in."),
    difficulty: 5,
    questions: [
      { q: "When did Pharaoh say he believed?", a: "When he was drowning", wrong: ["As a child", "At the start", "Never"], why: "Quran 10:90." },
      { q: "Was his belief accepted then?", a: "No, it was too late", wrong: ["Yes, fully", "Only half", "It was delayed"], why: "Now? when you disobeyed before? (Quran 10:91)." },
      { q: "What did Allah keep as a sign for later people?", a: "Pharaoh's body", wrong: ["His crown", "His palace", "His army"], why: "Quran 10:92." }
    ]
  },
  {
    slug: "twelve-springs",
    title: "Twelve springs",
    line: "Musa struck a rock with his staff, and twelve springs gushed.",
    facts: ["Quran 2:60", "Each tribe knew its place"],
    quote: quranQuote(2, 60),
    source: quran(2, 60, "Musa asked for water for his people, and We said: strike the rock with your staff. Twelve springs gushed out, and each people knew its drinking place."),
    difficulty: 4,
    questions: [
      { q: "How many springs came from the rock?", a: "Twelve", wrong: ["Seven", "Three", "Forty"], why: "Quran 2:60." },
      { q: "What did Musa strike the rock with?", a: "His staff", wrong: ["His foot", "A hammer", "His hand"], why: "Quran 2:60." },
      { q: "What did Allah also send down in the desert, in Quran 2:57?", a: "Manna and quails", wrong: ["Gold coins", "Bread from Egypt", "Nothing"], why: "We sent down manna and quails." }
    ]
  },
  {
    slug: "mountain",
    title: "The mountain crumbles",
    line: "Musa asked to see Allah; the mountain crumbled, and he fainted.",
    facts: ["Quran 7:143", "He repented at once"],
    quote: quranQuote(7, 143),
    source: quran(7, 143, "Musa said: my Lord, show Yourself to me. He said: you will not see Me, but look at the mountain. When his Lord appeared to the mountain, He made it level, and Musa fell unconscious. When he woke he said: glory be to You, I turn to You."),
    difficulty: 5,
    questions: [
      { q: "What did Musa ask Allah?", a: "To see Him", wrong: ["For gold", "For a kingdom", "To fly"], why: "Quran 7:143." },
      { q: "What happened to the mountain?", a: "It was made level", wrong: ["It grew", "It moved away", "Nothing"], why: "Quran 7:143." },
      { q: "How long was Musa's appointment with Allah?", a: "Forty nights", wrong: ["Seven days", "One year", "One night"], why: "Thirty nights, completed with ten (Quran 7:142)." }
    ]
  },
  {
    slug: "tablets",
    title: "The Tablets",
    line: "Allah wrote guidance for Musa on Tablets: hold them firmly.",
    facts: ["Quran 7:145", "The Tawrah"],
    quote: quranQuote(7, 145),
    source: quran(7, 145, "We wrote for him on the Tablets advice and details of all things: hold them firmly and tell your people to take the best of it."),
    difficulty: 4,
    questions: [
      { q: "What did Allah write the guidance on?", a: "Tablets", wrong: ["Paper scrolls", "Sand", "Leaves"], why: "Quran 7:145." },
      { q: "How was Musa told to take them?", a: "Firmly", wrong: ["Lightly", "Secretly", "Later"], why: "Hold them firmly." },
      { q: "Who led the people while Musa was away?", a: "Harun", wrong: ["Pharaoh", "Al-Khidr", "Qarun"], why: "Take my place among my people (Quran 7:142)." }
    ]
  },
  {
    slug: "calf",
    title: "The golden calf",
    line: "While Musa was away, as-Samiri made a calf to worship.",
    facts: ["Quran 20:88", "A great wrong"],
    quote: quranQuote(20, 88),
    source: quran(20, 88, "He brought out for them a calf, a body that made a lowing sound, and they said: this is your god and Musa's god, but he forgot."),
    difficulty: 5,
    questions: [
      { q: "Who made the calf, as Surah Ta-Ha names him?", a: "As-Samiri", wrong: ["Harun", "Qarun", "Pharaoh"], why: "Quran 20:85-88." },
      { q: "What sound did the calf make?", a: "A lowing sound", wrong: ["Music", "Words", "None"], why: "Quran 20:88." },
      { q: "A calf that cannot speak or help is not a god.", tf: true, why: "It could not reply to them, nor harm or help (Quran 20:89)." }
    ]
  },
  {
    slug: "khidr",
    title: "The journey with al-Khidr",
    line: "Musa travelled to learn from al-Khidr, whom Allah taught.",
    facts: ["Quran 18:65-66", "Sahih al-Bukhari 3401"],
    quote: quranQuote(18, 66),
    source: quran(18, 66, "Musa said to him: may I follow you, so that you teach me some of the right guidance you have been taught?"),
    difficulty: 5,
    questions: [
      { q: "Why did Musa follow al-Khidr?", a: "To learn from him", wrong: ["To sell him sheep", "To fight him", "To find gold"], why: "Quran 18:66." },
      { q: "Why did al-Khidr damage the boat?", a: "A king seized good boats", wrong: ["He disliked boats", "By mistake", "For fun"], why: "Quran 18:79." },
      { q: "Whose treasure was under the wall?", a: "Two orphan boys'", wrong: ["The king's", "Musa's", "Al-Khidr's"], why: "Their father was righteous (Quran 18:82)." }
    ]
  },
  {
    slug: "forty-years",
    title: "Forty years of wandering",
    line: "Bani Isra'il refused the Holy Land and wandered forty years.",
    facts: ["Quran 5:21-26", "Two men urged them on"],
    quote: quranQuote(5, 26),
    source: quran(5, 26, "Allah said: then it is forbidden to them for forty years; they will wander in the land. So do not grieve over the disobedient people."),
    difficulty: 5,
    questions: [
      { q: "What did the people tell Musa about the Holy Land?", a: "Go, you and your Lord", wrong: ["We are ready", "Let us pray", "Thank you"], why: "Quran 5:24." },
      { q: "How long did they wander?", a: "Forty years", wrong: ["Four years", "Forty days", "A hundred years"], why: "Quran 5:26." },
      { q: "What did the two believing men tell them?", a: "Enter, and rely on Allah", wrong: ["Go back to Egypt", "Give up", "Wait forever"], why: "Quran 5:23." }
    ]
  },
  {
    slug: "qarun",
    title: "Qarun's treasure",
    line: "Qarun boasted of his treasure, and the earth swallowed him.",
    facts: ["Quran 28:76-81", "Do not be arrogant"],
    quote: quranQuote(28, 81),
    source: quran(28, 81, "We made the earth swallow him and his home, and he had no group to help him besides Allah."),
    difficulty: 5,
    questions: [
      { q: "Whose people was Qarun from?", a: "Musa's people", wrong: ["Nuh's people", "The jinn", "Romans"], why: "Quran 28:76." },
      { q: "How heavy were Qarun's keys?", a: "Too heavy for strong men", wrong: ["Light as feathers", "One small key", "He had none"], why: "Quran 28:76." },
      { q: "What happened to Qarun and his home?", a: "The earth swallowed them", wrong: ["A flood came", "He became king", "Nothing"], why: "Quran 28:81." }
    ]
  },
  {
    slug: "patient-musa",
    title: "Musa was patient",
    line: "Hurt by words, he ﷺ said: Musa was hurt more and stayed patient.",
    facts: ["Sahih al-Bukhari 3405", "Mercy on Musa"],
    source: hadith("bukhari", "3405", "Abdullah ibn Mas'ud", "Sahih", "A man said a share was not given fairly. The Prophet ﷺ became angry and said: may Allah have mercy on Musa; he was hurt more than this, and he was patient."),
    difficulty: 5,
    questions: [
      { q: "What did the Prophet ﷺ remember when he was hurt by words?", a: "Musa's patience", wrong: ["Pharaoh's army", "Yusuf's dream", "Nuh's ark"], why: "Sahih al-Bukhari 3405." },
      { q: "What did Musa urge on the Night Journey?", a: "Ask for fewer prayers", wrong: ["Go home", "Pray more", "Stay in heaven"], why: "Fifty became five (Sahih al-Bukhari 349)." },
      { q: "Musa was hurt by his own people and kept patient.", tf: true, why: "He was hurt more than this, and he was patient." }
    ]
  }
]);

const YUSHA = unit("prophet-yusha", "prophets-unit-yusha", "Yusha'", [
  {
    slug: "helper",
    title: "Musa's young helper",
    line: "Yusha' ibn Nun went with Musa to where two seas meet.",
    facts: ["Sahih al-Bukhari 3401", "Quran 18:60"],
    quote: quranQuote(18, 60),
    source: hadith("bukhari", "3401", "Ubayy ibn Ka'b", "Sahih", "Musa took a fish in a basket and set out with his young helper, Yusha' ibn Nun, until they reached the rock."),
    difficulty: 3,
    questions: [
      { q: "Who travelled with Musa to meet al-Khidr?", a: "Yusha' ibn Nun", wrong: ["Harun", "Qarun", "Pharaoh"], why: "Sahih al-Bukhari 3401." },
      { q: "What did they carry in a basket?", a: "A fish", wrong: ["Bread", "Gold", "A lamp"], why: "Sahih al-Bukhari 3401." },
      { q: "Where were they heading?", a: "Where the two seas meet", wrong: ["To Egypt", "To Makkah", "To a mountain"], why: "Quran 18:60." }
    ]
  },
  {
    slug: "fish-forgot",
    title: "The fish slips away",
    line: "The fish slipped into the sea, and Yusha' forgot to tell Musa.",
    facts: ["Quran 18:61-63", "That was the sign"],
    quote: quranQuote(18, 63),
    source: quran(18, 63, "He said: do you remember when we rested at the rock? I forgot the fish, and none made me forget to mention it except Shaytan. It made its way into the sea in a wondrous way."),
    difficulty: 4,
    questions: [
      { q: "What did the fish do at the rock?", a: "Slipped into the sea", wrong: ["Flew away", "Was eaten", "Turned to gold"], why: "Quran 18:61." },
      { q: "Who did Yusha' say made him forget?", a: "Shaytan", wrong: ["Musa", "The fish", "A bird"], why: "Quran 18:63." },
      { q: "The place the fish was lost was where they would find al-Khidr.", tf: true, why: "That is what we were seeking (Quran 18:64)." }
    ]
  }
]);

const ILYAS_ALYASA = unit("prophet-ilyas-alyasa", "prophets-unit-ilyas-alyasa", "Ilyas and Al-Yasa'", [
  {
    slug: "messenger",
    title: "Ilyas, a messenger",
    line: "Ilyas, a messenger, asked his people: will you not fear Allah?",
    facts: ["Quran 37:123-124", "Sent to his people"],
    quote: quranQuote(37, 123),
    source: quran(37, 123, "Ilyas was one of the messengers, when he said to his people: will you not fear Allah?"),
    difficulty: 2,
    questions: [
      { q: "What was Ilyas, as Quran 37:123 says?", a: "One of the messengers", wrong: ["A king", "A magician", "An angel"], why: "Quran 37:123." },
      { q: "What did Ilyas ask his people?", a: "Will you not fear Allah?", wrong: ["Will you pay me?", "Where is the king?", "Who is strongest?"], why: "Quran 37:124." },
      { q: "Ilyas called his people back to Allah alone.", tf: true, why: "Quran 37:124-126." }
    ]
  },
  {
    slug: "baal",
    title: "The idol Ba'l",
    line: "His people prayed to an idol called Ba'l and left Allah.",
    facts: ["Quran 37:125", "Allah, best of creators"],
    quote: quranQuote(37, 125),
    source: quran(37, 125, "Do you call on Ba'l and leave the Best of creators, Allah, your Lord and the Lord of your forefathers?"),
    difficulty: 3,
    questions: [
      { q: "What was the name of the idol of Ilyas's people?", a: "Ba'l", wrong: ["Hubal", "Al-Lat", "Wadd"], why: "Quran 37:125." },
      { q: "What does Ilyas call Allah in Quran 37:125?", a: "The Best of creators", wrong: ["The god of the sea", "One of many", "The sun"], why: "And leave the Best of creators." },
      { q: "Whose Lord did Ilyas say Allah is?", a: "Theirs and their forefathers'", wrong: ["Only the king's", "Only his", "No one's"], why: "Your Lord and the Lord of your forefathers (Quran 37:126)." }
    ]
  },
  {
    slug: "peace",
    title: "Peace upon Ilyas",
    line: "Allah sends peace upon Ilyas, a believing servant.",
    facts: ["Quran 37:130", "Among the doers of good"],
    quote: quranQuote(37, 130),
    source: quran(37, 130, "Peace be upon Ilyas. This is how We reward those who do good. He was one of Our believing servants."),
    difficulty: 3,
    questions: [
      { q: "What does Allah send upon Ilyas in Quran 37:130?", a: "Peace", wrong: ["Wealth", "Anger", "A storm"], why: "Quran 37:130." },
      { q: "What kind of servant was Ilyas?", a: "A believing servant", wrong: ["A lazy servant", "A king's servant", "A runaway"], why: "Quran 37:132." },
      { q: "Allah rewards those who do good like this.", tf: true, why: "This is how We reward the doers of good (Quran 37:131)." }
    ]
  },
  {
    slug: "alyasa",
    title: "Al-Yasa', among the best",
    line: "The Quran names Al-Yasa' among the chosen and the best.",
    facts: ["Quran 38:48", "Quran 6:86"],
    quote: quranQuote(38, 48),
    source: quran(38, 48, "And remember Ismail, Al-Yasa' and Dhul-Kifl: each of them was among the best."),
    difficulty: 4,
    questions: [
      { q: "How does Quran 38:48 describe Al-Yasa'?", a: "Among the best", wrong: ["Among the losers", "A tyrant", "Unknown"], why: "Each of them was among the best." },
      { q: "Who is named with Al-Yasa' in Quran 38:48?", a: "Ismail and Dhul-Kifl", wrong: ["Pharaoh and Haman", "Qarun", "Iblis"], why: "Quran 38:48." },
      { q: "In Quran 6:86, Allah preferred Al-Yasa' over the worlds.", tf: true, why: "All of them We preferred over the worlds." }
    ]
  }
]);

const DAWUD = unit("prophet-dawud", "prophets-unit-dawud", "Dawud", [
  {
    slug: "jalut",
    title: "Dawud and Jalut",
    line: "Dawud defeated Jalut, and Allah gave him a kingdom and wisdom.",
    facts: ["Quran 2:251", "Kingship and wisdom"],
    quote: quranQuote(2, 251),
    source: quran(2, 251, "They defeated them by Allah's permission, and Dawud killed Jalut, and Allah gave him the kingdom and wisdom and taught him what He willed."),
    difficulty: 1,
    questions: [
      { q: "Whom did Dawud defeat?", a: "Jalut", wrong: ["Pharaoh", "Qarun", "Namrud"], why: "Quran 2:251." },
      { q: "By whose permission did they win?", a: "Allah's", wrong: ["The king's", "Their own", "The giant's"], why: "By Allah's permission." },
      { q: "What did Allah give Dawud after that?", a: "Kingdom and wisdom", wrong: ["Only gold", "A ship", "Nothing"], why: "Quran 2:251." }
    ]
  },
  {
    slug: "zabur",
    title: "The Zabur",
    line: "Allah gave Dawud a book called the Zabur.",
    facts: ["Quran 17:55", "Recited quickly"],
    quote: quranQuote(17, 55),
    source: quran(17, 55, "We have made some prophets better than others, and to Dawud We gave the Zabur."),
    difficulty: 1,
    questions: [
      { q: "Which book did Allah give Dawud?", a: "The Zabur", wrong: ["The Tawrah", "The Injil", "The Quran"], why: "Quran 17:55." },
      { q: "How fast could Dawud recite the Zabur?", a: "Before his animals were saddled", wrong: ["In a year", "Never in one go", "In a month"], why: "Sahih al-Bukhari 3417." },
      { q: "The Zabur was given to Musa.", tf: false, why: "It was given to Dawud." }
    ]
  },
  {
    slug: "mountains-birds",
    title: "Mountains and birds praise",
    line: "The mountains and birds praised Allah along with Dawud.",
    facts: ["Quran 34:10", "Iron made soft"],
    quote: quranQuote(34, 10),
    source: quran(34, 10, "We gave Dawud a favor from Us: O mountains and birds, praise along with him. And We made iron soft for him."),
    difficulty: 2,
    questions: [
      { q: "What praised Allah along with Dawud?", a: "The mountains and the birds", wrong: ["The fish", "The stars", "The kings"], why: "Quran 34:10." },
      { q: "Which metal did Allah make soft for Dawud?", a: "Iron", wrong: ["Gold", "Silver", "Copper"], why: "Quran 34:10." },
      { q: "What did Dawud make from the iron?", a: "Coats of armor", wrong: ["Swords for sale", "Crowns", "Coins"], why: "Quran 34:11 and 21:80." }
    ]
  },
  {
    slug: "own-hands",
    title: "Food from his own work",
    line: "Though a king, Dawud ate only from his own hands' work.",
    facts: ["Sahih al-Bukhari 2072", "Best food is earned"],
    source: hadith("bukhari", "2072", "Al-Miqdam ibn Ma'dikarib", "Sahih", "No one has eaten better food than what he earned with his own hands, and Allah's prophet Dawud used to eat from the work of his own hands."),
    difficulty: 2,
    questions: [
      { q: "What is the best food, the Prophet ﷺ said?", a: "What you earn with your hands", wrong: ["A king's feast", "Free food", "Food from far away"], why: "Sahih al-Bukhari 2072." },
      { q: "Whose example did he ﷺ give?", a: "Dawud's", wrong: ["Pharaoh's", "Qarun's", "Yunus's"], why: "Dawud ate from the work of his hands." },
      { q: "Dawud lived off the treasury because he was king.", tf: false, why: "He ate from his own work." }
    ]
  },
  {
    slug: "fast-of-dawud",
    title: "The fast of Dawud",
    line: "The fast Allah loves most: Dawud's, fasting every other day.",
    facts: ["Sahih al-Bukhari 1131", "Also his night prayer"],
    source: hadith("bukhari", "1131", "Abdullah ibn Amr", "Sahih", "The prayer most loved by Allah is Dawud's and the fast most loved by Allah is Dawud's. He slept half the night, prayed a third, and slept a sixth, and he fasted every other day."),
    difficulty: 3,
    questions: [
      { q: "How did Dawud fast?", a: "Every other day", wrong: ["Every day", "Once a year", "Only Mondays"], why: "Sahih al-Bukhari 1131." },
      { q: "How much of the night did Dawud pray?", a: "A third", wrong: ["All of it", "None", "A tenth"], why: "He prayed a third of the night." },
      { q: "Whose fast did the Prophet ﷺ call most loved by Allah?", a: "Dawud's", wrong: ["Musa's", "Isa's", "Nuh's"], why: "Sahih al-Bukhari 1131." }
    ]
  },
  {
    slug: "judge",
    title: "Judge with truth",
    line: "Allah told Dawud: judge between people with truth, not desire.",
    facts: ["Quran 38:26", "A successor on earth"],
    quote: quranQuote(38, 26),
    source: quran(38, 26, "O Dawud, We have made you a successor on earth, so judge between people with truth and do not follow desire, for it will lead you away from Allah's path."),
    difficulty: 4,
    questions: [
      { q: "How was Dawud told to judge?", a: "With truth", wrong: ["With guesses", "With desire", "With gifts"], why: "Quran 38:26." },
      { q: "What did Allah warn would lead him astray?", a: "Following desire", wrong: ["Praying", "Fasting", "Working"], why: "Do not follow desire." },
      { q: "What does Quran 38:17 call Dawud?", a: "A man of strength, always turning to Allah", wrong: ["A weak man", "A careless king", "A poet"], why: "The possessor of strength; he always turned back to Allah." }
    ]
  }
]);

const SULAYMAN = unit("prophet-sulayman", "prophets-unit-sulayman", "Sulayman", [
  {
    slug: "birds",
    title: "The language of birds",
    line: "Sulayman, Dawud's heir, was taught the speech of the birds.",
    facts: ["Quran 27:16", "A clear favor"],
    quote: quranQuote(27, 16),
    source: quran(27, 16, "Sulayman inherited from Dawud and said: O people, we have been taught the speech of birds and given from everything. This is a clear favor."),
    difficulty: 1,
    questions: [
      { q: "Whose speech was Sulayman taught?", a: "The birds'", wrong: ["The fish's", "The stars'", "The kings'"], why: "Quran 27:16." },
      { q: "Who was Sulayman's father?", a: "Dawud", wrong: ["Musa", "Ibrahim", "Zakariyya"], why: "Sulayman inherited from Dawud." },
      { q: "What did Sulayman call these gifts?", a: "A clear favor", wrong: ["His own skill", "Luck", "Magic"], why: "This is a clear favor." }
    ]
  },
  {
    slug: "field",
    title: "The sheep in the field",
    line: "Allah gave Sulayman understanding in the case of the field.",
    facts: ["Quran 21:78-79", "Both had wisdom"],
    quote: quranQuote(21, 79),
    source: quran(21, 79, "We made Sulayman understand the case, and to each of them We gave judgment and knowledge."),
    difficulty: 2,
    questions: [
      { q: "What ruined the field in the case?", a: "Sheep, at night", wrong: ["A flood", "Locusts", "Fire"], why: "Quran 21:78." },
      { q: "Who did Allah give understanding of the case?", a: "Sulayman", wrong: ["The farmer", "The shepherd", "No one"], why: "Quran 21:79." },
      { q: "Allah gave Dawud and Sulayman both judgment and knowledge.", tf: true, why: "To each of them We gave judgment and knowledge." }
    ]
  },
  {
    slug: "two-mothers",
    title: "The two mothers",
    line: "Sulayman found a baby's true mother by her mercy.",
    facts: ["Sahih al-Bukhari 3427", "A wise judge"],
    source: hadith("bukhari", "3427", "Abu Hurairah", "Sahih", "A wolf took one of two women's babies, and both claimed the living one. Sulayman called for a knife to divide it. The younger said: don't, may Allah have mercy on you, it is hers. So he gave the baby to the younger."),
    difficulty: 3,
    questions: [
      { q: "How did Sulayman find the true mother?", a: "She would give up the baby to save it", wrong: ["She shouted louder", "She was older", "She paid him"], why: "Sahih al-Bukhari 3427." },
      { q: "Who got the baby in the end?", a: "The younger woman", wrong: ["The older woman", "Sulayman", "No one"], why: "He gave the child to the younger." },
      { q: "Sulayman really meant to cut the baby.", tf: false, why: "It was a test to show who the real mother was." }
    ]
  },
  {
    slug: "ant",
    title: "The ant's warning",
    line: "An ant warned the others, and Sulayman smiled and thanked Allah.",
    facts: ["Quran 27:18-19", "Make me grateful"],
    quote: quranQuote(27, 19),
    source: quran(27, 19, "He smiled, amused at her words, and said: my Lord, inspire me to be grateful for Your favor on me and my parents, and to do good that pleases You."),
    difficulty: 3,
    questions: [
      { q: "What did the ant tell the other ants?", a: "Go into your homes", wrong: ["Attack the army", "Climb a tree", "Run to the sea"], why: "So Sulayman's army does not crush you (Quran 27:18)." },
      { q: "What did Sulayman do when he heard the ant?", a: "Smiled and thanked Allah", wrong: ["Got angry", "Ignored it", "Stepped on it"], why: "Quran 27:19." },
      { q: "Sulayman asked Allah to make him grateful.", tf: true, why: "My Lord, inspire me to be grateful." }
    ]
  },
  {
    slug: "hoopoe",
    title: "The hoopoe's news",
    line: "The hoopoe brought news of Saba, a land ruled by a queen.",
    facts: ["Quran 27:22-24", "Sure news from Saba"],
    quote: quranQuote(27, 22),
    source: quran(27, 22, "The hoopoe did not stay away long and said: I know something you do not, and I have come to you from Saba with sure news."),
    difficulty: 4,
    questions: [
      { q: "Which bird brought Sulayman news?", a: "The hoopoe", wrong: ["The crow", "The eagle", "The dove"], why: "Quran 27:20-22." },
      { q: "Where did the news come from?", a: "Saba", wrong: ["Egypt", "Madyan", "Babylon"], why: "I have come from Saba." },
      { q: "What did the people of Saba worship?", a: "The sun", wrong: ["The moon", "A calf", "Fire"], why: "Quran 27:24." }
    ]
  },
  {
    slug: "queen",
    title: "The queen submits",
    line: "The queen of Saba said: I submit with Sulayman to Allah.",
    facts: ["Quran 27:44", "Her throne was brought"],
    quote: quranQuote(27, 44),
    source: quran(27, 44, "She said: my Lord, I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds."),
    difficulty: 4,
    questions: [
      { q: "What did the queen of Saba do in the end?", a: "Submitted to Allah", wrong: ["Went to war", "Ran away", "Built an idol"], why: "Quran 27:44." },
      { q: "How fast was her throne brought?", a: "In the blink of an eye", wrong: ["In a year", "In a month", "Never"], why: "Before your glance returns (Quran 27:40)." },
      { q: "What did Sulayman call it when he saw the throne?", a: "A favor from my Lord, to test me", wrong: ["My own power", "Magic", "Luck"], why: "Quran 27:40." }
    ]
  },
  {
    slug: "wind-jinn",
    title: "The wind and the jinn",
    line: "Allah put the wind and some jinn to work for Sulayman.",
    facts: ["Quran 34:12", "A month's journey"],
    quote: quranQuote(34, 12),
    source: quran(34, 12, "And to Sulayman the wind: its morning course a month and its evening course a month. And some jinn worked for him by his Lord's permission."),
    difficulty: 4,
    questions: [
      { q: "What did Allah make serve Sulayman?", a: "The wind and some jinn", wrong: ["The sun", "The angels", "The sea monsters"], why: "Quran 34:12." },
      { q: "How far did the wind carry him in a morning?", a: "A month's journey", wrong: ["One mile", "A year's journey", "Nowhere"], why: "Quran 34:12." },
      { q: "What did Sulayman ask for in Quran 38:35?", a: "Forgiveness and a unique kingdom", wrong: ["Long life only", "Many sons", "Revenge"], why: "My Lord, forgive me and give me a kingdom." }
    ]
  },
  {
    slug: "staff",
    title: "The staff and the jinn",
    line: "Sulayman died leaning on his staff, and the jinn did not know.",
    facts: ["Quran 34:14", "Only Allah knows the unseen"],
    quote: quranQuote(34, 14),
    source: quran(34, 14, "When We decreed his death, nothing showed the jinn he had died except a creature of the earth eating his staff. When he fell, the jinn saw that had they known the unseen, they would not have stayed in hard work."),
    difficulty: 5,
    questions: [
      { q: "What showed the jinn that Sulayman had died?", a: "A creature eating his staff", wrong: ["A loud voice", "An angel", "A dream"], why: "Quran 34:14." },
      { q: "What does this teach about the jinn?", a: "They do not know the unseen", wrong: ["They know everything", "They never die", "They are angels"], why: "Had they known the unseen..." },
      { q: "Who alone knows the unseen?", a: "Allah", wrong: ["The jinn", "Fortune tellers", "Kings"], why: "Quran 27:65." }
    ]
  }
]);

const ZAKARIYYA = unit("prophet-zakariyya", "prophets-unit-zakariyya", "Zakariyya", [
  {
    slug: "maryam",
    title: "Caring for Maryam",
    line: "Zakariyya cared for Maryam and found food with her from Allah.",
    facts: ["Quran 3:37", "Allah provides"],
    quote: quranQuote(3, 37),
    source: quran(3, 37, "She was put in Zakariyya's care. Whenever he came to her in the prayer room, he found food with her. He said: Maryam, where is this from? She said: from Allah."),
    difficulty: 1,
    questions: [
      { q: "Who looked after Maryam?", a: "Zakariyya", wrong: ["Musa", "Yahya", "Dawud"], why: "Quran 3:37." },
      { q: "What did Zakariyya find with Maryam?", a: "Food from Allah", wrong: ["Gold", "Books", "Nothing"], why: "Quran 3:37." },
      { q: "What was Zakariyya's work, the Prophet ﷺ said?", a: "A carpenter", wrong: ["A king", "A sailor", "A merchant"], why: "Sahih Muslim 2379." }
    ]
  },
  {
    slug: "quiet-dua",
    title: "A quiet dua",
    line: "Old and grey, Zakariyya asked Allah quietly for a child.",
    facts: ["Quran 19:3-5", "Never let down by dua"],
    quote: quranQuote(19, 4),
    source: quran(19, 4, "My Lord, my bones have weakened and my head is white with grey, and I have never been disappointed in calling on You."),
    difficulty: 2,
    questions: [
      { q: "How old was Zakariyya when he asked for a child?", a: "Very old", wrong: ["Young", "A boy", "Middle-aged"], why: "My bones have weakened (Quran 19:4)." },
      { q: "How did Zakariyya make his dua?", a: "Quietly", wrong: ["Shouting", "Through a messenger", "In a letter"], why: "He called his Lord in secret (Quran 19:3)." },
      { q: "Zakariyya said he was never let down when he called on Allah.", tf: true, why: "Quran 19:4." }
    ]
  },
  {
    slug: "sign",
    title: "Three days of silence",
    line: "Given the good news, Zakariyya could not speak for three nights.",
    facts: ["Quran 19:10", "Glorify Allah"],
    quote: quranQuote(19, 10),
    source: quran(19, 10, "He said: my Lord, give me a sign. He said: your sign is that you will not speak to people for three nights, though you are well."),
    difficulty: 3,
    questions: [
      { q: "What was the sign given to Zakariyya?", a: "He could not speak for three nights", wrong: ["A star fell", "Rain came", "He grew young"], why: "Quran 19:10." },
      { q: "Was Zakariyya sick during the sign?", a: "No, he was well", wrong: ["Yes, very sick", "He slept", "He fainted"], why: "Though you are well." },
      { q: "What did he tell people to do, by signs?", a: "Glorify Allah morning and evening", wrong: ["Go home", "Bring gifts", "Be quiet forever"], why: "Quran 19:11." }
    ]
  },
  {
    slug: "hasten",
    title: "Hurrying to good",
    line: "Allah answered him: they hurried to good, with hope and fear.",
    facts: ["Quran 21:89-90", "His wife was healed"],
    quote: quranQuote(21, 90),
    source: quran(21, 90, "We answered him and gave him Yahya and made his wife able to bear a child. They used to hurry to good deeds and call on Us in hope and fear, and they were humble before Us."),
    difficulty: 4,
    questions: [
      { q: "What did Zakariyya's family hurry to?", a: "Good deeds", wrong: ["The market", "Wars", "Games"], why: "Quran 21:90." },
      { q: "How did they call on Allah?", a: "In hope and fear", wrong: ["Proudly", "Rarely", "Only in joy"], why: "Quran 21:90." },
      { q: "What did Allah do for Zakariyya's wife?", a: "Made her able to have a child", wrong: ["Made her a queen", "Nothing", "Sent her away"], why: "Quran 21:90." }
    ]
  }
]);

const YAHYA = unit("prophet-yahya", "prophets-unit-yahya", "Yahya", [
  {
    slug: "name",
    title: "A brand new name",
    line: "Allah named the boy Yahya, a name given to no one before.",
    facts: ["Quran 19:7", "Good news to Zakariyya"],
    quote: quranQuote(19, 7),
    source: quran(19, 7, "O Zakariyya, We give you good news of a boy named Yahya. We have not given that name to anyone before."),
    difficulty: 1,
    questions: [
      { q: "Who named Yahya?", a: "Allah", wrong: ["His mother", "The king", "His neighbors"], why: "Quran 19:7." },
      { q: "What was special about the name Yahya?", a: "No one had it before", wrong: ["It meant king", "It was very long", "Nothing"], why: "Quran 19:7." },
      { q: "Yahya was Zakariyya's son.", tf: true, why: "Good news of a boy for Zakariyya." }
    ]
  },
  {
    slug: "wise-boy",
    title: "Wise as a boy",
    line: "Hold the Book firmly, Yahya: Allah gave him wisdom as a boy.",
    facts: ["Quran 19:12", "Kind and pure"],
    quote: quranQuote(19, 12),
    source: quran(19, 12, "O Yahya, hold the Book firmly. And We gave him wisdom while still a boy."),
    difficulty: 2,
    questions: [
      { q: "When was Yahya given wisdom?", a: "As a boy", wrong: ["At sixty", "Never", "After death"], why: "Quran 19:12." },
      { q: "How was Yahya told to hold the Book?", a: "Firmly", wrong: ["Lightly", "Secretly", "Never"], why: "Quran 19:12." },
      { q: "What two things came with his wisdom, in Quran 19:13?", a: "Tenderness and purity", wrong: ["Gold and land", "Fame and power", "Swords"], why: "Affection from Us and purity." }
    ]
  },
  {
    slug: "parents",
    title: "Good to his parents",
    line: "Yahya was dutiful to his parents, never proud or disobedient.",
    facts: ["Quran 19:14", "Peace on him"],
    quote: quranQuote(19, 14),
    source: quran(19, 14, "He was dutiful to his parents, and he was not a proud, disobedient tyrant."),
    difficulty: 3,
    questions: [
      { q: "How was Yahya to his parents?", a: "Dutiful", wrong: ["Rude", "Distant", "Careless"], why: "Quran 19:14." },
      { q: "On which three days is there peace on Yahya?", a: "Born, dying, and raised", wrong: ["Every Friday", "Eid days", "Only his birthday"], why: "Quran 19:15." },
      { q: "Yahya was a proud tyrant.", tf: false, why: "He was not a proud, disobedient tyrant." }
    ]
  },
  {
    slug: "second-heaven",
    title: "Yahya and Isa together",
    line: "On the Night Journey, he ﷺ met Yahya and Isa together.",
    facts: ["Sahih al-Bukhari 3887", "They were cousins"],
    source: hadith("bukhari", "3887", "Malik ibn Sa'sa'ah", "Sahih", "When I went over the second heaven, there I saw Yahya and Isa, who were cousins. Jibril said: these are Yahya and Isa, greet them. I greeted them, and they said: welcome, O pious brother and pious prophet."),
    difficulty: 4,
    questions: [
      { q: "In which heaven did he ﷺ meet Yahya and Isa?", a: "The second", wrong: ["The fourth", "The seventh", "The first"], why: "Sahih al-Bukhari 3887." },
      { q: "How were Yahya and Isa related?", a: "Cousins", wrong: ["Father and son", "Brothers", "Not related"], why: "They were cousins." },
      { q: "Who were Yahya's parents?", a: "Zakariyya and his wife", wrong: ["Musa and Asiyah", "Dawud and his wife", "Unknown"], why: "Quran 19:7 and 21:90." }
    ]
  }
]);

const ISA = unit("prophet-isa", "prophets-unit-isa", "Isa", [
  {
    slug: "maryam-chosen",
    title: "Maryam is chosen",
    line: "The angels said: Maryam, Allah chose you above all women.",
    facts: ["Quran 3:42", "Purified and chosen"],
    quote: quranQuote(3, 42),
    source: quran(3, 42, "The angels said: O Maryam, Allah has chosen you, purified you, and chosen you above the women of the worlds."),
    difficulty: 1,
    questions: [
      { q: "Who told Maryam she was chosen?", a: "The angels", wrong: ["Zakariyya", "The king", "Her neighbors"], why: "Quran 3:42." },
      { q: "Above whom was Maryam chosen?", a: "The women of the worlds", wrong: ["Only her town", "The angels", "The prophets"], why: "Quran 3:42." },
      { q: "Isa's mother is Maryam.", tf: true, why: "He is called Isa son of Maryam." }
    ]
  },
  {
    slug: "palm-tree",
    title: "Under the palm tree",
    line: "Under a palm tree, Allah gave Maryam a stream and fresh dates.",
    facts: ["Quran 19:24-25", "Do not grieve"],
    quote: quranQuote(19, 25),
    source: quran(19, 25, "Shake the trunk of the palm tree towards you, and fresh ripe dates will fall on you."),
    difficulty: 2,
    questions: [
      { q: "Where did Maryam give birth?", a: "By a palm tree", wrong: ["In a palace", "On a ship", "In a city"], why: "Quran 19:23." },
      { q: "What fell from the palm tree?", a: "Fresh ripe dates", wrong: ["Apples", "Leaves only", "Nothing"], why: "Quran 19:25." },
      { q: "What did Allah give her below her?", a: "A stream", wrong: ["A well", "A house", "A rug"], why: "Quran 19:24." }
    ]
  },
  {
    slug: "cradle",
    title: "A baby speaks",
    line: "Baby Isa spoke from the cradle: I am the servant of Allah.",
    facts: ["Quran 19:29-30", "A prophet"],
    quote: quranQuote(19, 30),
    source: quran(19, 30, "He said: I am the servant of Allah. He has given me the Book and made me a prophet."),
    difficulty: 2,
    questions: [
      { q: "What were Isa's first words, from the cradle?", a: "I am the servant of Allah", wrong: ["I am a king", "I am God", "Hello, mother"], why: "Quran 19:30." },
      { q: "Why did people speak to the baby?", a: "Maryam pointed to him", wrong: ["He cried", "He was lost", "He was sick"], why: "Quran 19:29." },
      { q: "Isa called himself Allah's servant, not God.", tf: true, why: "I am the servant of Allah." }
    ]
  },
  {
    slug: "like-adam",
    title: "Like Adam",
    line: "Isa's creation is like Adam's: Allah said Be, and he was.",
    facts: ["Quran 3:59", "No father"],
    quote: quranQuote(3, 59),
    source: quran(3, 59, "The example of Isa with Allah is like that of Adam. He created him from dust, then said to him: Be, and he was."),
    difficulty: 3,
    questions: [
      { q: "Whom is Isa compared to in Quran 3:59?", a: "Adam", wrong: ["Musa", "Nuh", "Yusuf"], why: "Quran 3:59." },
      { q: "Why the comparison?", a: "Both came without a father", wrong: ["Both were kings", "Both sailed", "Both were rich"], why: "Adam had neither father nor mother." },
      { q: "What word did Allah say to create?", a: "Be", wrong: ["Go", "Wait", "Grow"], why: "He said to him: Be, and he was." }
    ]
  },
  {
    slug: "miracles",
    title: "Miracles by Allah's permission",
    line: "Isa healed the blind and the sick, all by Allah's permission.",
    facts: ["Quran 3:49", "A bird from clay"],
    quote: quranQuote(3, 49),
    source: quran(3, 49, "I make for you from clay the shape of a bird, then breathe into it and it becomes a bird by Allah's permission. I heal the blind and the leper, and bring the dead to life by Allah's permission."),
    difficulty: 3,
    questions: [
      { q: "How did Isa do his miracles?", a: "By Allah's permission", wrong: ["By his own power", "By magic", "By tricks"], why: "Quran 3:49 says it again and again." },
      { q: "What did Isa make from clay?", a: "The shape of a bird", wrong: ["A house", "A pot", "A camel"], why: "Quran 3:49." },
      { q: "Whom did Isa heal?", a: "The blind and the leper", wrong: ["Only kings", "No one", "Only animals"], why: "Quran 3:49." }
    ]
  },
  {
    slug: "table",
    title: "The table from heaven",
    line: "The disciples asked for a table from heaven, and Isa prayed.",
    facts: ["Quran 5:112-115", "A sign and a feast"],
    quote: quranQuote(5, 114),
    source: quran(5, 114, "Isa son of Maryam said: O Allah, our Lord, send down to us a table from heaven, to be a feast for the first and last of us and a sign from You. Provide for us; You are the best of providers."),
    difficulty: 4,
    questions: [
      { q: "Who asked for a table from heaven?", a: "The disciples", wrong: ["The Romans", "Pharaoh", "The jinn"], why: "Quran 5:112." },
      { q: "What did Isa call Allah in his dua?", a: "The best of providers", wrong: ["The king of Rome", "The god of bread", "The sun"], why: "Quran 5:114." },
      { q: "Which surah is named after this table?", a: "Al-Ma'idah", wrong: ["Al-Baqarah", "Maryam", "Yusuf"], why: "Al-Ma'idah means the table spread." }
    ]
  },
  {
    slug: "ahmad",
    title: "Good news of Ahmad",
    line: "Isa gave good news of a messenger after him named Ahmad.",
    facts: ["Quran 61:6", "Confirming the Tawrah"],
    quote: quranQuote(61, 6),
    source: quran(61, 6, "Isa son of Maryam said: O Children of Isra'il, I am Allah's messenger to you, confirming the Tawrah before me and giving good news of a messenger after me whose name is Ahmad."),
    difficulty: 4,
    questions: [
      { q: "What name did Isa give the messenger after him?", a: "Ahmad", wrong: ["Musa", "Yahya", "Dawud"], why: "Quran 61:6." },
      { q: "Which book did Isa confirm?", a: "The Tawrah", wrong: ["The Zabur only", "No book", "A new law of Rome"], why: "Quran 61:6." },
      { q: "Was there any prophet between Isa and Muhammad ﷺ?", a: "No", wrong: ["Yes, three", "Yes, one", "Many"], why: "Sahih al-Bukhari 3442." }
    ]
  },
  {
    slug: "raised",
    title: "Raised up to Allah",
    line: "Isa was not killed or crucified; Allah raised him up to Himself.",
    facts: ["Quran 4:157-158", "Allah is Mighty, Wise"],
    quote: quranQuote(4, 158),
    source: quran(4, 158, "Rather, Allah raised him up to Himself. Allah is Mighty and Wise."),
    difficulty: 5,
    questions: [
      { q: "Was Isa crucified, as the Quran says?", a: "No", wrong: ["Yes", "Only for a day", "Nobody knows"], why: "They did not crucify him (Quran 4:157)." },
      { q: "What did Allah do with Isa?", a: "Raised him up to Himself", wrong: ["Hid him in a cave", "Made him a king", "Nothing"], why: "Quran 4:158." },
      { q: "What will Isa say about worshipping him and his mother?", a: "I never told them to", wrong: ["It is right", "Only sometimes", "Ask Maryam"], why: "Quran 5:116-117." }
    ]
  },
  {
    slug: "return",
    title: "Isa will come back",
    line: "Before the Hour, Isa will come down and judge with justice.",
    facts: ["Sahih al-Bukhari 3448", "A sign of the Hour"],
    source: hadith("bukhari", "3448", "Abu Hurairah", "Sahih", "By Him in whose hand is my soul, the son of Maryam will soon come down among you as a just judge. He will break the cross, wealth will overflow, and one prostration will be better than the world and all in it."),
    difficulty: 5,
    questions: [
      { q: "How will Isa rule when he comes back?", a: "As a just judge", wrong: ["As a tyrant", "As a new prophet with a new book", "He will not rule"], why: "Sahih al-Bukhari 3448." },
      { q: "What will one prostration be worth then?", a: "More than the world", wrong: ["Nothing", "One coin", "A day"], why: "Sahih al-Bukhari 3448." },
      { q: "Who said: I am the closest of people to the son of Maryam?", a: "Muhammad ﷺ", wrong: ["Musa", "Yahya", "Dawud"], why: "Sahih al-Bukhari 3442." }
    ]
  }
]);

export const PROPHET_UNITS: readonly DeepUnit[] = [ADAM, IDRIS, NUH, HUD, SALIH, IBRAHIM, LUT, SHUAIB, ISMAIL, ISHAQ_YAQUB, YUSUF, AYYUB, YUNUS, MUSA, YUSHA, ILYAS_ALYASA, DAWUD, SULAYMAN, ZAKARIYYA, YAHYA, ISA];
