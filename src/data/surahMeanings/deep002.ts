import type { PassageDeep } from "./types";

/**
 * Al-Baqarah in depth, passage by passage (the same passages as s002.ts): what the ayahs mean, the story they
 * tell, what to take home, and two harder questions that need the meaning, not only the card's line. Our own
 * plain summary of Tafsir Ibn Kathir (abridged English, Quran.com) and Tafsir as-Sa'di; nothing quoted from them,
 * and anything the scholars differ on (the details of Harut and Marut, which ayah came down last...) is left out.
 * A question's answer is always on the card: in its meaning, story or take-home lines.
 */
export const DEEP_002: Record<string, PassageDeep> = {
  "1-7": {
    meaning: [
      "Alif Lam Mim are letters; Allah knows best their full meaning.",
      "The mindful believe in the unseen, like Allah, the angels and the Last Day; they pray and give.",
      "Those who kept rejecting the truth gain nothing from warnings; their hearts are sealed."
    ],
    takeaway: "Guidance is for those who act on faith: prayer, giving and belief in the unseen.",
    q: [
      ["What does believing in the unseen include?", "Allah, the angels and the Last Day", "Only what you can see", "Only the stars", "Only old stories"],
      ["Why are some hearts sealed, in ayahs 6-7?", "They kept rejecting the truth", "They never heard of Allah", "They were too young", "They lived far away"]
    ]
  },
  "8-20": {
    meaning: [
      "The hypocrites say 'we believe' but do not, thinking they fool Allah and the believers.",
      "A sickness is in their hearts, and they call their corruption 'putting things right'.",
      "Two examples: a fire that goes out and leaves them in darkness, and a storm with lightning."
    ],
    takeaway: "Faith must be in the heart and in deeds, not only on the tongue.",
    q: [
      ["In the fire example, what happens to the hypocrites?", "Their light goes; darkness stays", "The fire keeps them warm", "They find a river", "They become kings"],
      ["What do the hypocrites call their own corruption?", "Putting things right", "Seeking knowledge", "Fasting", "Being patient"]
    ]
  },
  "21-29": {
    meaning: [
      "Allah calls all people: worship your Lord, who made you and those before you.",
      "He challenged doubters to bring one surah like it; no one can, for it is the speech of Allah.",
      "Allah gives examples, even of a mosquito; the believers know they are the truth."
    ],
    takeaway: "Allah alone made us and gives us everything, so He alone deserves worship.",
    q: [
      ["What small creature is an example in ayah 26?", "A mosquito", "A lion", "A whale", "An eagle"],
      ["Why can no one bring a surah like the Quran?", "It is the speech of Allah", "It is too long to copy", "Nobody ever tried", "It was hidden away"]
    ]
  },
  "30-39": {
    meaning: [
      "Allah told the angels He would place a khalifah, a successor, on the earth.",
      "He taught Adam the names of things; the angels said: we know only what You taught us.",
      "Iblis refused out of pride. Adam slipped, then took words from Allah and repented."
    ],
    story: "The angels bowed to Adam, but Iblis was too proud. Shaytan tempted Adam and his wife to eat from the tree; they repented and Allah forgave them.",
    takeaway: "Pride ruined Iblis; repentance saved Adam. When you slip, turn back to Allah.",
    q: [
      ["What made Iblis refuse to bow?", "Pride", "Fear", "Hunger", "Sleep"],
      ["What did Adam do after his slip?", "Repented with words from Allah", "Blamed Iblis forever", "Hid from Allah", "Stopped praying"]
    ]
  },
  "40-46": {
    meaning: [
      "The Children of Israel are reminded of Allah's favours and told to keep their covenant.",
      "Do you tell others to do good and forget to do it yourselves, while you read the Book?",
      "Seek help in patience and prayer; it is hard except for the humble who expect to meet Allah."
    ],
    takeaway: "Do what you tell others to do, and lean on patience and prayer.",
    q: [
      ["Ayah 44 blames people who told others to do good. Why?", "They forget to do it themselves", "They spoke too softly", "They did it too much", "They were too young"],
      ["Who finds prayer easy, in ayahs 45-46?", "The humble who expect to meet Allah", "The rich and famous", "Those who sleep a lot", "Those who never make mistakes"]
    ]
  },
  "47-59": {
    meaning: [
      "Allah saved the Children of Israel from Pharaoh, who killed their sons, and drowned his army.",
      "While Musa was away forty nights they worshipped a calf, yet Allah forgave them.",
      "He shaded them with clouds and fed them manna and quails; some changed the word they were told to say."
    ],
    story: "Allah parted the sea. The Children of Israel crossed safely, and Pharaoh's army drowned behind them as they watched.",
    takeaway: "Allah's favours call for thanks, and His door of forgiveness stays open.",
    q: [
      ["How long was Musa away when they took the calf?", "Forty nights", "Seven days", "One year", "Three nights"],
      ["What did Allah send down to feed them?", "Manna and quails", "Bread and milk", "Dates and honey", "Fish and rice"]
    ]
  },
  "60-61": {
    meaning: [
      "When they were thirsty, Musa prayed; Allah told him to strike the rock, and twelve springs gushed.",
      "Each tribe knew its spring. They were told: eat and drink, and do not spread corruption.",
      "Later they tired of one food and asked for herbs, onions and lentils, swapping better for worse."
    ],
    takeaway: "Be grateful for what Allah gives; don't swap the better for the worse.",
    q: [
      ["Why were there twelve springs?", "One for each tribe", "One for each month", "For twelve prophets", "To fill twelve seas"],
      ["What did Musa ask when they wanted onions and lentils?", "Will you swap better for worse?", "Shall I cook for you?", "Why not fast instead?", "Do you want gold too?"]
    ]
  },
  "62-71": {
    meaning: [
      "Those who broke the Sabbath were punished, as a lesson for others.",
      "Told to sacrifice a cow, they asked its age, then its colour, bright yellow, then which one.",
      "Each question made it harder; they did it at last, though they almost did not."
    ],
    story: "Ibn Abbas said: had they sacrificed any cow, it would have been enough. They kept asking, so it was made harder, until only one cow would do.",
    takeaway: "Obey Allah's command simply; making it hard for yourself only adds burden.",
    q: [
      ["What was their mistake with the cow?", "Questions instead of obeying", "They chose a sheep", "They sold the cow", "They forgot the order"],
      ["What colour was the cow, in ayah 69?", "Bright yellow", "Pure white", "Jet black", "Spotted brown"]
    ]
  },
  "72-82": {
    meaning: [
      "A man was killed and they argued about who did it; Allah brought the dead to life as a sign.",
      "Even so their hearts grew hard like stone, or harder; some stones split and let water out.",
      "Some wrote words with their own hands and said: this is from Allah, to sell it for a small price."
    ],
    story: "Allah told them to strike the dead man with part of the cow, and He brought him back to life, to show that He can raise the dead.",
    takeaway: "A heart that sees signs and does not soften grows harder; keep yours soft with the Quran.",
    q: [
      ["Ayah 74: why are some stones better than those hearts?", "Water bursts out of some stones", "Stones can speak", "Stones never break", "Stones are heavier"],
      ["What did some do, in ayah 79?", "Wrote words and called them Allah's", "Memorized the whole Book", "Gave the Book away free", "Read it every night"]
    ]
  },
  "83-86": {
    meaning: [
      "Their covenant: worship only Allah, and be good to parents, relatives, orphans and the poor.",
      "Speak good words to people; do not shed each other's blood or drive each other from home.",
      "They believed in part of the Book and rejected part, choosing this life over the Hereafter."
    ],
    takeaway: "Take all of Allah's guidance, not only the parts you like.",
    q: [
      ["Ayah 83: how should you speak to people?", "With good words", "Say nothing at all", "Speak only to friends", "Speak loudly"],
      ["What did ayah 85 blame them for?", "Taking part of the Book, not all", "Reading the Book too often", "Teaching it to children", "Writing it down"]
    ]
  },
  "87-96": {
    meaning: [
      "Allah gave Musa the Book, sent messengers after him, then Isa with clear signs and Jibril's help.",
      "When a messenger brought what they did not like, some denied him and some killed.",
      "They knew a prophet was coming, yet when he came they rejected him out of envy."
    ],
    takeaway: "Envy can make a person reject a truth they already know.",
    q: [
      ["Ayah 90: why did some reject the Prophet ﷺ?", "Envy that Allah chose him", "They never heard of him", "He spoke another language", "He was too young"],
      ["Who helped Isa, in ayah 87?", "The Holy Spirit, Jibril", "An army of kings", "A magician", "His tribe only"]
    ]
  },
  "97-103": {
    meaning: [
      "Jibril brought the Quran down to the Prophet's ﷺ heart, by Allah's permission.",
      "The devils taught people magic; Sulayman never disbelieved.",
      "Magic harms no one except by Allah's permission, and those who buy it lose the Hereafter."
    ],
    takeaway: "Stay far from magic; nothing harms or helps except by Allah's permission.",
    q: [
      ["What does ayah 102 say about Sulayman?", "He did not disbelieve", "He taught magic", "He was a magician", "He hid the Book"],
      ["Can magic harm anyone on its own?", "No, only by Allah's permission", "Yes, always", "Only at night", "Only in the desert"]
    ]
  },
  "104-112": {
    meaning: [
      "Believers were told to say 'Unzurna', look at us, not 'Ra'ina', a word others twisted into an insult.",
      "When Allah replaces an ayah, He brings one as good or better.",
      "Many wished to turn believers back out of envy; forgive and pardon, and keep praying and giving."
    ],
    takeaway: "Claims need proof: the reward is for whoever submits to Allah and does good.",
    q: [
      ["Ayah 104: why say 'Unzurna' and not 'Ra'ina'?", "Others twisted 'Ra'ina' into an insult", "It is shorter", "It rhymes better", "It is a new name"],
      ["Ayah 109: what should believers do when envied?", "Forgive and pardon for now", "Hate them back", "Stop praying", "Leave their homes"]
    ]
  },
  "113-121": {
    meaning: [
      "Each group said only it was right; Allah will judge between them on the Day of Resurrection.",
      "Who is more unjust than one who stops Allah's name being remembered in His mosques?",
      "Allah has no son; all is His. When He wills a thing, He only says 'Be' and it is."
    ],
    takeaway: "Protect the mosques, and remember that Allah owns everything and needs no one.",
    q: [
      ["Ayah 114: who is the most unjust?", "One who blocks Allah's name in mosques", "One who builds a mosque", "One who travels far", "One who fasts often"],
      ["How does Allah create, in ayah 117?", "He says 'Be', and it is", "Slowly, with helpers", "Only with tools", "He needs to rest"]
    ]
  },
  "122-129": {
    meaning: [
      "Allah tested Ibrahim with commands; he fulfilled them, so Allah made him a leader for people.",
      "The House is a place of return and safety; take the Station of Ibrahim as a place of prayer.",
      "Ibrahim and Ismail raised its foundations, praying: our Lord, accept from us, and send a messenger."
    ],
    story: "Ibrahim and his son Ismail raised the walls of the Ka'bah together. As they built, they asked Allah to accept it, and to send a messenger from their children. That messenger is Muhammad ﷺ.",
    takeaway: "They built for Allah and still asked Him to accept it: do good and stay humble.",
    q: [
      ["What did Ibrahim and Ismail ask while building?", "Our Lord, accept from us", "Make us rich", "Make it the tallest", "Let us rest"],
      ["Which messenger answered their dua?", "Prophet Muhammad ﷺ", "Prophet Musa", "Prophet Isa", "Prophet Nuh"]
    ]
  },
  "130-141": {
    meaning: [
      "Only a foolish soul turns from the way of Ibrahim, who submitted to the Lord of the worlds.",
      "Dying, Yaqub asked his sons: what will you worship after me? They said: your God, the One God.",
      "Say: we believe in all the prophets, from Ibrahim to Musa and Isa, with no division between them."
    ],
    takeaway: "Every prophet taught the same Islam: submission to the One God.",
    q: [
      ["What did Yaqub ask his sons as he was dying?", "What will you worship after me?", "Who will get my wealth?", "Where will you live?", "Who will be king?"],
      ["Ayah 136: which prophets do Muslims believe in?", "All of them, without division", "Only Ibrahim", "Only the last one", "None before Musa"]
    ]
  },
  "142-147": {
    meaning: [
      "Foolish people asked why the qiblah changed; the east and the west belong to Allah.",
      "Allah made the Muslims a middle, balanced nation, witnesses over people.",
      "The change showed who follows the Messenger ﷺ; prayers made before it were not lost."
    ],
    story: "In Madinah the Muslims faced Jerusalem in prayer for sixteen or seventeen months. The Prophet ﷺ longed for the Ka'bah, and Allah turned the qiblah to it.",
    takeaway: "Follow Allah's command, even when it changes what you are used to.",
    q: [
      ["What does 'a middle nation' mean in ayah 143?", "Balanced and just", "Living in the Middle East", "Average and weak", "Halfway to faith"],
      ["Before the Ka'bah, which way did Muslims face?", "Jerusalem", "Madinah", "Ta'if", "Yemen"]
    ]
  },
  "148-152": {
    meaning: [
      "Every nation has a direction it turns to, so race each other to do good.",
      "Turn your face to the Sacred Mosque wherever you are, so people have no argument against you.",
      "Allah sent a messenger who recites, purifies and teaches; so remember Him and be grateful."
    ],
    takeaway: "If you remember Allah, He remembers you: keep dhikr and thanks.",
    q: [
      ["What does ayah 148 tell us to race in?", "Doing good deeds", "Getting rich", "Winning arguments", "Being first in line"],
      ["Ayah 152: what does Allah promise those who remember Him?", "He will remember them", "They will never be tested", "They will be kings", "They will never sleep"]
    ]
  },
  "153-163": {
    meaning: [
      "Seek help in patience and prayer; Allah is with the patient.",
      "Do not call those killed in Allah's way dead; they are alive, though you cannot sense it.",
      "Allah tests with fear, hunger and loss; the patient say: to Allah we belong and to Him we return."
    ],
    takeaway: "Tests are certain; patience and 'Inna lillahi' turn them into reward.",
    q: [
      ["What do the patient say when loss strikes?", "To Allah we belong and return", "Why me?", "It was bad luck", "I give up"],
      ["Ayah 154 says martyrs are what?", "Alive, though we can't sense it", "Gone forever", "Asleep until Hajj", "Turned into angels"]
    ]
  },
  "164-167": {
    meaning: [
      "The heavens and earth, night and day, ships, rain and wind are signs for people who reason.",
      "Some take others as equals to Allah and love them as only Allah should be loved.",
      "The believers love Allah more strongly; on the Day, leaders and followers will disown each other."
    ],
    takeaway: "Look at creation and think: it points to the One Creator who deserves your greatest love.",
    q: [
      ["Ayah 165: who loves Allah most strongly?", "The believers", "The idol worshippers", "The proud leaders", "Those who doubt"],
      ["Who are the signs in ayah 164 for?", "People who use their reason", "Only scientists", "Only sailors", "Only angels"]
    ]
  },
  "168-176": {
    meaning: [
      "Eat what is lawful and good on earth, and do not follow the footsteps of Shaytan.",
      "Do not blindly follow forefathers who had no understanding or guidance.",
      "Forbidden: dead animals, blood, pork, and what is offered to other than Allah, except in real need."
    ],
    takeaway: "Halal, good food is a blessing; thank Allah for it and do not follow blind habits.",
    q: [
      ["Ayah 173: when may a person eat forbidden food?", "When forced by real need", "When it tastes good", "On holidays", "When friends do"],
      ["What did ayah 170 blame people for?", "Following forefathers blindly", "Eating too little", "Asking good questions", "Travelling to learn"]
    ]
  },
  "177-182": {
    meaning: [
      "Goodness is not just facing east or west; it is faith in Allah, the Last Day, angels, Books and prophets.",
      "It is giving wealth you love to relatives, orphans, the poor and travellers, and keeping promises.",
      "Qisas, fair retribution, means life for you; and a will should be fair to parents and relatives."
    ],
    takeaway: "Real goodness is belief and action together: giving, praying, keeping promises, patience.",
    q: [
      ["Ayah 177: is goodness only facing a direction?", "No, it is faith and good deeds too", "Yes, that is all", "Only facing east", "Only facing west"],
      ["Ayah 179 says fair retribution brings what?", "Life for people", "More fighting", "Wealth", "Nothing at all"]
    ]
  },
  "183-188": {
    meaning: [
      "Fasting was prescribed as it was for those before you, so you may become mindful of Allah.",
      "Ramadan is the month the Quran came down; the sick or travelling make up the days later.",
      "Allah is near and answers the caller; eat until dawn's white thread shows, then fast till night."
    ],
    takeaway: "Ramadan builds taqwa, and Allah is close to anyone who calls on Him.",
    q: [
      ["Ayah 186: what does Allah say when asked about Him?", "I am near; I answer the caller", "I am far away", "Ask the angels", "Wait for Ramadan"],
      ["Ayah 187: when does the fast start?", "When dawn's white thread shows", "At noon", "At sunset", "When you wake up"]
    ]
  },
  "189-196": {
    meaning: [
      "New moons mark times for people and for Hajj; goodness is taqwa, not entering homes from the back.",
      "Fight only those who fight you, and do not go too far; Allah does not love aggressors.",
      "Complete Hajj and Umrah for Allah; whoever has no animal to sacrifice fasts ten days."
    ],
    takeaway: "Even in conflict Islam sets limits, and worship is done fully for Allah.",
    q: [
      ["Ayah 190: who may Muslims fight?", "Only those who fight them", "Anyone at all", "All travellers", "Their neighbours"],
      ["Ayah 196: no animal to sacrifice? How many days are fasted?", "Ten days", "Three days", "Thirty days", "One day"]
    ]
  },
  "197-210": {
    meaning: [
      "Hajj is in known months: no bad talk, sin or arguing in it; the best provision is taqwa.",
      "It is no sin to seek trade in Hajj; remember Allah at al-Mash'ar al-Haram as He guided you.",
      "Ask for good in this world, good in the Hereafter, and protection from the Fire."
    ],
    takeaway: "Ask for the best of both worlds, and carry taqwa as your best provision.",
    q: [
      ["Which dua does ayah 201 teach?", "Good in this world and the next", "Riches in this world only", "Only a long life", "Only to win arguments"],
      ["Ayah 197: what is the best provision?", "Taqwa, mindfulness of Allah", "Lots of food", "A fast camel", "Gold coins"]
    ]
  },
  "211-216": {
    meaning: [
      "People were one nation; Allah sent prophets with good news and warnings, and the Book to judge.",
      "Do you think you will enter Paradise without trials like those before you? Allah's help is near.",
      "Spend on parents, relatives, orphans, the poor and travellers; you may dislike what is good for you."
    ],
    takeaway: "Trust Allah's plan: what you dislike may be good, and what you love may be bad.",
    q: [
      ["Ayah 214: what were believers told after hard trials?", "Allah's help is near", "There is no help", "Go back home", "Wait a hundred years"],
      ["Ayah 215: who comes first in spending?", "Parents and relatives", "Strangers only", "Rich friends", "Nobody"]
    ]
  },
  "217-221": {
    meaning: [
      "Fighting in the sacred months is serious, but turning people from Allah's way is worse.",
      "Wine and gambling have some benefit, but their sin is greater than their benefit.",
      "Spend what is beyond your needs; treat orphans well; marry believers, not idol worshippers."
    ],
    takeaway: "Islam weighs harm and benefit: wine and gambling were later fully forbidden (5:90).",
    q: [
      ["Why does ayah 219 warn against wine and gambling?", "Their sin is greater than their benefit", "They cost too much", "They take time", "They are boring"],
      ["Which surah later forbade wine fully?", "Al-Ma'idah (5:90)", "Al-Fatihah", "Al-Ikhlas", "An-Nas"]
    ]
  },
  "222-228": {
    meaning: [
      "In menstruation, husbands keep away from intimacy until the wife is clean; Allah loves the clean.",
      "Do not use oaths in Allah's name to stop doing good; a husband may not swear off his wife over four months.",
      "Divorced women wait three cycles; women have rights like their duties, in fairness."
    ],
    takeaway: "Marriage in Islam means rights on both sides, with fairness and kindness.",
    q: [
      ["Ayah 228: do wives have rights?", "Yes, like the duties they owe", "No rights at all", "Only after ten years", "Only if they are rich"],
      ["Ayah 224: may you swear by Allah to stop doing good?", "No, oaths must not block good", "Yes, any time", "Only on Fridays", "Only in Ramadan"]
    ]
  },
  "229-231": {
    meaning: [
      "A divorce may be taken back twice; then keep the wife kindly or let her go kindly.",
      "These are the limits of Allah; whoever crosses them does wrong.",
      "Do not hold a wife back to harm her, and do not make fun of Allah's ayahs."
    ],
    takeaway: "Even at the end of a marriage, Allah commands kindness and no harm.",
    q: [
      ["Ayah 229: how many times may a divorce be taken back?", "Twice", "Once", "Ten times", "Never"],
      ["What does ayah 231 forbid?", "Holding a wife back to harm her", "Talking to her family", "Giving her gifts", "Being kind to her"]
    ]
  },
  "232-235": {
    meaning: [
      "Do not stop a divorced woman remarrying her husband if they agree kindly.",
      "Mothers may nurse two full years; the father provides food and clothing fairly.",
      "No soul is burdened beyond its ability; a widow waits four months and ten days."
    ],
    takeaway: "Islam protects the child: both parents care for the baby, even after divorce.",
    q: [
      ["Ayah 233: who gives the nursing mother food and clothes?", "The father, fairly", "Nobody", "The baby's uncle only", "The neighbours"],
      ["Ayah 234: how long does a widow wait?", "Four months and ten days", "One week", "Two years", "Forty days"]
    ]
  },
  "236-242": {
    meaning: [
      "A wife divorced before a dowry gets a gift; spouses must not forget kindness between them.",
      "Guard the prayers, especially the middle prayer, and stand before Allah humbly.",
      "Even in fear, pray walking or riding; when safe again, pray as you were taught."
    ],
    takeaway: "Prayer never stops, not even in danger; it is the believer's anchor.",
    q: [
      ["Ayah 239: how do you pray in fear or danger?", "Walking or riding", "You skip it", "Next week", "Only at home"],
      ["Ayah 237: what should spouses not forget?", "Kindness between them", "Their old arguments", "Their wedding food", "Their debts to friends"]
    ]
  },
  "243-248": {
    meaning: [
      "Thousands fled their homes fearing death; Allah caused them to die, then gave them life.",
      "Who will lend Allah a goodly loan? He will multiply it many times over.",
      "A prophet told the Children of Israel that Allah chose Talut as king; they objected he was not rich."
    ],
    story: "After Musa, the Children of Israel asked their prophet for a king. Allah chose Talut for his knowledge and strength. The sign of his kingship was the Ark, carried by angels.",
    takeaway: "Allah chooses leaders for knowledge and strength, not wealth.",
    q: [
      ["Why did they object to Talut as king?", "He was not rich", "He was too tall", "He was too young", "He was a foreigner"],
      ["What was the sign of Talut's kingship?", "The Ark, carried by angels", "A golden crown", "A huge army", "A talking bird"]
    ]
  },
  "249-253": {
    meaning: [
      "Talut tested the army at a river: only those who drank little could go on.",
      "The few said: how often has a small group beaten a big one, by Allah's permission.",
      "Dawud killed Jalut; Allah gave him kingship and wisdom. Some messengers were raised above others."
    ],
    story: "Talut's army was small and Jalut's was huge. The believers asked Allah for patience and firm feet, and by Allah's permission Dawud killed Jalut.",
    takeaway: "Numbers do not decide victory; patience and trust in Allah do.",
    q: [
      ["How did Talut test his army?", "Drinking from a river", "Racing camels", "Lifting stones", "Fasting a month"],
      ["What did the believers ask Allah before the battle?", "Patience and firm feet", "Gold and horses", "More soldiers", "A place to hide"]
    ]
  },
  "254-257": {
    meaning: [
      "Spend before a Day comes with no trade, no friendship and no intercession.",
      "Allah is the Ever-Living Sustainer; His Kursi holds the heavens and earth, and guarding them never tires Him.",
      "There is no compulsion in religion; Allah is the ally of believers, bringing them from darkness to light."
    ],
    takeaway: "Ayat al-Kursi is the greatest ayah of the Quran: it tells you who Allah is.",
    q: [
      ["Ayat al-Kursi: does guarding the heavens tire Allah?", "No, it never tires Him", "Yes, at night", "Only in winter", "Angels do it for Him"],
      ["Ayah 256: is there compulsion in religion?", "No compulsion in religion", "Yes, always", "Only for children", "Only on Fridays"]
    ]
  },
  "258-260": {
    meaning: [
      "A king argued with Ibrahim; Ibrahim said: Allah brings the sun from the east, so bring it from the west.",
      "A man passing a ruined town wondered how it would live again; Allah made him die 100 years, then raised him.",
      "Ibrahim asked to see how Allah gives life; four birds came back to life and flew to him."
    ],
    story: "Allah made a man die for a hundred years, then raised him. His food had not spoiled, but his donkey was bones; he watched Allah join the bones and clothe them with flesh.",
    takeaway: "Allah gives life and death; raising the dead is easy for Him.",
    q: [
      ["How did Ibrahim silence the king?", "Bring the sun from the west", "Make it rain gold", "Fly to the moon", "Count the stars"],
      ["How long was the man in ayah 259 dead?", "A hundred years", "Ten years", "Seven days", "Forty years"]
    ]
  },
  "261-266": {
    meaning: [
      "Spending for Allah is like one seed that grows seven ears, each with a hundred grains.",
      "Kind words and forgiveness are better than charity followed by hurt.",
      "Showing off wipes out charity, like soil washed off a smooth rock by heavy rain."
    ],
    takeaway: "Give sincerely and quietly; never remind people of what you gave.",
    q: [
      ["Ayah 263: what is better than charity followed by hurt?", "Kind words and forgiveness", "Giving nothing at all", "Bragging politely", "Giving twice as much"],
      ["What is showing off with charity like, in ayah 264?", "Soil on a rock, washed away", "A tree full of fruit", "A river of honey", "A strong wall"]
    ]
  },
  "267-273": {
    meaning: [
      "Give from the good things you earn; do not pick out the bad to give away.",
      "Shaytan threatens you with poverty; Allah promises forgiveness and bounty. Wisdom is a great good.",
      "Giving to the poor in secret is better; seek out the poor who are too shy to beg."
    ],
    takeaway: "Give your best, give in secret, and look for the shy poor.",
    q: [
      ["What does Allah promise givers, in ayah 268?", "Forgiveness and bounty", "Poverty", "Nothing", "Only fame"],
      ["Ayah 273: which poor should you seek out?", "Those too shy to beg", "Only those who shout", "Only the rich", "Nobody"]
    ]
  },
  "274-281": {
    meaning: [
      "Those who devour riba will rise like one driven mad by Shaytan's touch.",
      "Allah destroys riba and grows charity; leave what remains of riba, if you believe.",
      "Give a debtor in hardship time, and forgiving the debt is better. Fear a Day you return to Allah."
    ],
    takeaway: "Riba is war against Allah's way; charity and easing debts bring blessing.",
    q: [
      ["Ayah 280: what do you do for a debtor in hardship?", "Give him time, or forgive", "Take his house", "Shout at him", "Double the debt"],
      ["Ayah 276: what does Allah do to riba and charity?", "Destroys riba, grows charity", "Grows both", "Destroys both", "Leaves both alone"]
    ]
  },
  "282-283": {
    meaning: [
      "The longest ayah in the Quran tells believers to write down a debt for a set time.",
      "A fair scribe writes; the one who owes dictates and fears Allah. Bring two witnesses.",
      "On a journey with no scribe, a pledge is taken; never hide testimony."
    ],
    takeaway: "Islam protects people's rights: write things down and be honest witnesses.",
    q: [
      ["Ayah 282 is famous for being what?", "The longest ayah in the Quran", "The shortest ayah", "The first ayah", "The last ayah"],
      ["Ayah 283: no scribe on a journey. What then?", "Take a pledge as security", "Forget the debt", "Ask a child", "Wait a year"]
    ]
  },
  "284-286": {
    meaning: [
      "All in the heavens and earth is Allah's; He knows what you show and what you hide.",
      "The Messenger and the believers believe in Allah, His angels, Books and messengers: we hear and obey.",
      "Allah burdens no soul beyond its ability; the surah ends with a dua for forgiveness and help."
    ],
    takeaway: "The Prophet ﷺ said: recite the last two ayahs at night, and they are enough for you.",
    hadith: { collection: "bukhari", number: 5009, narrator: "Abu Mas'ud al-Badri", text: "Whoever recites the last two ayahs of Surah Al-Baqarah at night, they will be enough for him." },
    q: [
      ["What did the Prophet ﷺ say of the last two ayahs at night?", "They are enough for you", "Read them only once", "They are only for Hajj", "Read them at noon"],
      ["Ayah 286: what does its dua ask?", "Forgive us if we forget or err", "Make us famous", "Give us a palace now", "Make the night longer"]
    ]
  }
};
