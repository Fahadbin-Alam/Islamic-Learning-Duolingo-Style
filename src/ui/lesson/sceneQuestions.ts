import type { Challenge } from "../../types";
import { SIGN_SCENES, type SignKind, type SignScene } from "../../data/signScenes";
import { signArt } from "../journey/signArt";

/**
 * Story questions asked on their living scene (src/ui/lesson/SceneGame.tsx): a question about a moment of one of the
 * scenes that lessons open on (Nuh's ark coming to rest on al-Judi, the twelve springs, the ant calling the others
 * into their homes, the birds held up in the sky) shows that scene playing up to just before the moment, then
 * waiting, with a "?" over it. Once the learner has answered, right or wrong, the scene plays the moment, with its
 * words. Nothing new is written: the question, its answers, its right answer and its source stay the checked ones;
 * the scene only shows what the ayahs (or the hadith) say happened.
 *
 * Each question was read with its scene: its right answer is what the moment shows, and the scene up to the moment
 * does not show it (a question about what is there from the start, such as Thamud's homes or the dog at the cave,
 * stays as it is). A question is found by its English prompt and right answer, so the same question in a review or a
 * quiz is asked the same way.
 */

/** A question (its English prompt, its right answer) and the words of the moments its scene plays once answered. */
type Ask = readonly [prompt: string, answer: string, from: string, to?: string];

const ASKS: Record<string, readonly Ask[]> = {
  // Nuh's ark: built, the pairs aboard, the gates of the sky, waves like mountains, al-Judi (11:37 to 11:44, 54:11 to 54:13).
  "sign-ark": [
    ["Allah told Nuh to take the animals in ____.", "pairs", "Of each kind, two"],
    ["What was Nuh building?", "A ship", "Build the ark"],
    ["What was the ship made of, as Quran 54:13 says?", "Planks and nails", "Build the ark"],
    ["Where did the flood water come from?", "The sky and springs in the earth", "The gates of the sky opened"],
    ["How big were the waves?", "Like mountains", "Waves like mountains"],
    ["Where did the Ark come to rest?", "On al-Judi", "It came to rest on al-Judi"],
    ["What was the earth told to do?", "Swallow its water", "It came to rest on al-Judi"],
    ["Ayah 44: where did the ark come to rest?", "On Mount Judi", "It came to rest on al-Judi"],
    ["What did Allah tell Nuh to build, in Al-Mu'minun?", "The ark", "Build the ark"],
    ["Ayahs 23-32: what are they about?", "Nuh builds the ark", "Build the ark"],
    ["What were the waves like, in 11:42?", "Like mountains", "Waves like mountains"],
    ["What was the earth told to do, in 11:44?", "Swallow its water", "It came to rest on al-Judi"],
    ["Where did the ship rest, in 11:44?", "On Mount Judi", "It came to rest on al-Judi"],
    ["The sky was told to keep raining.", "False", "It came to rest on al-Judi"],
    ["What filled the laden ship, per Ibn Kathir?", "Cargo and pairs of every species", "Of each kind, two"],
    ["Where did the ship remain, per Qatadah?", "On Mount Judi", "It came to rest on al-Judi"],
    ["Per Ibn Abbas, where did that water come from?", "The opened gates of the sky", "The gates of the sky opened"],
    ["The flood water came only from normal rain clouds.", "False", "The gates of the sky opened"],
    ["What was the ship made of, in 54:13?", "Planks and nails", "Build the ark"],
    ["What does Dusur mean, per Ibn Abbas?", "Nails", "Build the ark"],
    ["What did Allah tell Nuh to build?", "A ship", "Build the ark"],
    ["What did Nuh build?", "The Ark", "Build the ark"]
  ],
  // The sea split for Musa, each side like a great mountain (26:63).
  "sign-sea": [
    ["What did each part of the split sea look like?", "A great mountain", "The sea split", "Each side like a great mountain"],
    ["How did Allah save them from Pharaoh?", "He parted the sea", "The sea split"],
    ["Ayahs 53-69: what are they about?", "The sea splits", "The sea split"],
    ["Ayah 63: what was each part of the split sea like?", "A great mountain", "The sea split", "Each side like a great mountain"]
  ],
  // The clouds' shade, the manna and quails, the twelve springs (2:57, 2:60, 7:160).
  "sign-springs": [
    ["How many springs came from the rock?", "Twelve", "Twelve springs gushed out"],
    ["What did Allah also send down in the desert, in Quran 2:57?", "Manna and quails", "Manna and quails"],
    ["Ayahs 60-61: what are they about?", "Twelve springs", "Twelve springs gushed out"],
    ["Ayahs 60-61 say: Musa struck a rock and twelve springs gushed out.", "True", "Twelve springs gushed out"],
    ["Why were there twelve springs?", "One for each tribe", "Each knew its drinking place"],
    ["What shaded them in the desert?", "Clouds", "Shaded by clouds"],
    ["What food did Allah send down?", "Manna and quails", "Manna and quails"],
    ["How many springs came out?", "Twelve", "Twelve springs gushed out"],
    ["Each tribe knew its own spring.", "True", "Each knew its drinking place"],
    ["How many springs burst out, in 7:160?", "Twelve", "Twelve springs gushed out"],
    ["What food was sent down, in 7:160?", "Manna and quails", "Manna and quails"],
    ["Each tribe knew its own drinking place.", "True", "Each knew its drinking place"],
    ["Ayah 160: how many springs gushed from the rock?", "Twelve", "Twelve springs gushed out"],
    ["Ayah 160: what did Allah send them to eat?", "Manna and quails", "Manna and quails"],
    ["What food came from the sky, in 20:80?", "Manna and quail", "Manna and quails"]
  ],
  // Salih's she-camel, her day to drink and theirs, "Do not harm her" (26:155, 26:156, 91:13).
  "sign-she-camel": [
    ["Allah sent Salih's people a special camel as a sign.", "True", "The she-camel of Allah"],
    ["How was the water shared with the she-camel?", "By turns", "Her day to drink", "Your day to drink"],
    ["What did Salih warn them not to do?", "Harm the camel", "Do not harm her"],
    ["The she-camel was a sign from Allah.", "True", "The she-camel of Allah"],
    ["Ayahs 141-159: what are they about?", "Salih and the camel", "The she-camel of Allah"],
    ["Ayah 155: how was the water shared with the camel?", "She had her turn to drink", "Her day to drink", "Your day to drink"],
    ["Ayahs 11-15: what are they about?", "The she-camel of Allah", "The she-camel of Allah"],
    ["Ayah 13: what were they told to leave alone?", "Allah's she-camel and her drink", "The she-camel of Allah", "Her day to drink"],
    ["What did Salih tell them about the camel, in 7:73?", "Let her graze, do not harm her", "Do not harm her"],
    ["The camel is called Allah's camel in 7:73.", "True", "The she-camel of Allah"],
    ["What was Thamud told to do with the she-camel, in 11:64?", "Leave her to graze", "Do not harm her"],
    ["How was the water shared, in 26:155?", "Each on its own day", "Her day to drink", "Your day to drink"],
    ["What did Salih warn them, in 26:156?", "Do not harm her", "Do not harm her"],
    ["What did he warn them about?", "Harming the she-camel", "Do not harm her"],
    ["Ayah 27: what did Allah send Thamud as a test?", "The she-camel", "The she-camel of Allah"],
    ["The she-camel was the sign given to Prophet Salih.", "True", "The she-camel of Allah"]
  ],
  // The valley of the ants (27:18, 27:19).
  "sign-ants": [
    ["What did the ant tell the other ants?", "Go into your homes", "Into your homes!"],
    ["What did Sulayman do when he heard the ant?", "Smiled and thanked Allah", "He smiled and thanked Allah"],
    ["Ayah 18: what did the ant tell the ants to do?", "Go into your homes", "Into your homes!"],
    ["What did the ant tell the others, in 27:18?", "Enter your dwellings", "Into your homes!"],
    ["What did Sulayman do, in 27:19?", "He smiled", "He smiled and thanked Allah"]
  ],
  // The hoopoe and the news from Saba (27:20, 27:22).
  "sign-hoopoe": [
    ["What did Sulayman ask, in 27:20?", "Why do I not see the hoopoe?", "Where is the hoopoe?"],
    ["Where did the news come from?", "Saba", "News from Saba"],
    ["Who brought Sulayman news of the queen?", "A hoopoe bird", "Where is the hoopoe?", "News from Saba"]
  ],
  // The king's dream (12:43, 12:47 to 12:49).
  "sign-dream": [
    ["What ate the seven fat cows in the king's dream?", "Seven thin cows", "Eaten by seven lean ones"],
    ["What did Yusuf say to do with the harvest?", "Leave it stored in its ears", "Store the grain in its ears"],
    ["Ayah 43: what ate the seven fat cows in the dream?", "Seven thin cows", "Eaten by seven lean ones"],
    ["Ayah 47: how did Yusuf say to store the grain?", "Left in its ears", "Store the grain in its ears"],
    ["What ate the seven fat cows, in 12:43?", "Seven lean cows", "Eaten by seven lean ones"],
    ["How should they store the harvest, in 12:47?", "Left in its ears", "Store the grain in its ears"],
    ["Yusuf told them to eat freely in the good years.", "False", "Store the grain in its ears"],
    ["What came after the seven hard years, in 12:49?", "A year of abundant rain", "Then a year of rain"]
  ],
  // The cave (18:11, 18:17).
  "sign-cave": [
    ["Ayah 17: what did the sun do at their cave?", "It turned away from them", "The sun turned from their cave"],
    ["What did Allah do once they entered, in 18:11?", "Made them sleep for years", "Years of sleep"]
  ],
  // The elephant held back, the birds in flocks, the stones of baked clay, eaten straw (105:1 to 105:5).
  "sign-elephant": [
    ["Ayahs 1-2: what are they about?", "The army of the elephant", "The army of the elephant"],
    ["What did the birds throw?", "Stones of baked clay", "Birds in flocks", "Stones of baked clay"],
    ["Ayahs 3-5: what are they about?", "Birds with stones", "Birds in flocks", "Stones of baked clay"],
    ["Ayah 4: what did the birds throw?", "Stones of baked clay", "Birds in flocks", "Stones of baked clay"],
    ["Ayah 5: what did the army end up like?", "Eaten straw", "Like eaten straw"],
    ["Whom does 105:1 ask about?", "The Owners of the Elephant", "The army of the elephant"],
    ["What did the elephant do facing Makkah?", "Knelt down", "The elephant was held back"],
    ["The elephant would walk any way but toward Makkah.", "True", "The elephant was held back"],
    ["What did Allah send in 105:3?", "Birds in flocks", "Birds in flocks"],
    ["What two things make up Sijjil?", "Stone and clay", "Birds in flocks", "Stones of baked clay"],
    ["The birds threw soft mud at the army.", "False", "Birds in flocks", "Stones of baked clay"],
    ["What did Allah make them like, per 105:5?", "Eaten straw", "Like eaten straw"],
    ["What is Al-Asf, per Said bin Jubayr?", "Straw", "Like eaten straw"]
  ],
  // Quraysh's winter and summer journeys, fed against hunger, safe from fear (106:1 to 106:4).
  "sign-journeys": [
    ["Which journeys did Quraysh make?", "Winter and summer", "The winter journey", "The summer journey"],
    ["Ayahs 1-2: what are they about?", "Two journeys", "The winter journey", "The summer journey"],
    ["Ayahs 1-2 say: Allah made the winter and summer journeys easy for Quraysh.", "True", "The winter journey", "The summer journey"],
    ["Ayah 2: which two journeys did Quraysh make?", "Winter and summer", "The winter journey", "The summer journey"],
    ["What did Allah save Quraysh from?", "Hunger and fear", "Fed against hunger", "Safe from fear"],
    ["Ayah 4: what did Allah protect Quraysh from?", "Hunger and fear", "Fed against hunger", "Safe from fear"],
    ["What did Allah save them from, per 106:4?", "Hunger", "Fed against hunger"],
    ["What did Allah make them safe from?", "Fear", "Safe from fear"]
  ],
  // Musa at Tur: the fire on the side of the mount, the call from the tree, the holy valley of Tuwa, the staff a snake (20:10 to 20:20, 27:7, 28:29, 28:30, 79:16).
  "sign-tur": [
    ["What was the valley called?", "Tuwa", "The holy valley of Tuwa"],
    ["Ayahs 1-24: what are they about?", "Musa at the valley", "The holy valley of Tuwa"],
    ["Ayahs 1-24 say: Musa saw a fire; Allah spoke to him in the holy valley.", "True", "A fire on the side of the mountain", "The holy valley of Tuwa"],
    ["Ayahs 1-14: what are they about?", "Musa and the fire", "A fire on the side of the mountain"],
    ["Ayahs 29-42: what are they about?", "The fire on the mountain", "A fire on the side of the mountain"],
    ["What did Musa see, in 20:10?", "A fire", "A fire on the side of the mountain"],
    ["What is Tuwa, per Ibn Abbas?", "The name of the valley", "The holy valley of Tuwa"],
    ["What did the stick become, in 20:20?", "A moving snake", "The staff became a snake"],
    ["Where was the fire burning, per Ibn Kathir?", "In a green bush", "Called from the tree"],
    ["Where did Musa see the fire, in 28:29?", "Toward At-Tur", "A fire on the side of the mountain"],
    ["Where did the call come from, in 28:30?", "The tree in the blessed place", "Called from the tree"],
    ["Where was the fire burning?", "In a green bush", "Called from the tree"],
    ["Allah told Musa: I am Allah, Lord of all that exists.", "True", "Called from the tree"],
    ["Where did Allah call Musa, per 79:16?", "In the holy valley of Tuwa", "The holy valley of Tuwa"],
    ["Tuwa is the name of a valley.", "True", "The holy valley of Tuwa"]
  ],
  // The staff and the sorcerers: their ropes and staffs, seeming to move, the staff swallowing what they faked (7:117, 7:118, 20:66 to 20:69, 26:44, 26:45).
  "sign-staff": [
    ["What did Musa's staff swallow, in Al-A'raf?", "The magicians' tricks", "It swallowed what they faked"],
    ["Ayahs 109-126: what are they about?", "The staff swallows", "It swallowed what they faked"],
    ["Ayahs 109-126 say: Musa's staff swallowed the magicians' tricks, and they believed.", "True", "It swallowed what they faked", "The truth stood firm"],
    ["Ayahs 55-76 say: Musa's staff beat the magicians' tricks, and they believed.", "True", "It swallowed what they faked", "The truth stood firm"],
    ["Ayah 45: what did Musa's staff swallow?", "All their tricks", "It swallowed what they faked"],
    ["What did the staff do, in 7:117?", "Swallowed their tricks", "It swallowed what they faked"],
    ["Who threw first, in 20:66?", "The magicians", "Their ropes and staffs"],
    ["Did the ropes really move, in 20:66?", "No, they only seemed to", "They seemed to move"],
    ["What did the staff do, in 20:69?", "Swallowed what they made", "It swallowed what they faked"],
    ["The magician will never succeed, whatever his skill, per 20:69.", "True", "It swallowed what they faked", "The truth stood firm"],
    ["What did Musa's stick do, in 26:45?", "Swallowed what they faked", "It swallowed what they faked"],
    ["Faith and falsehood never meet without faith winning.", "True", "It swallowed what they faked", "The truth stood firm"]
  ],
  // Al-Khidr's journey: the fish taking its way into the sea, the wall set straight, the orphans' treasure beneath it (18:61, 18:63, 18:77, 18:82).
  "sign-khidr": [
    ["Whose treasure was under the wall?", "Two orphan boys'", "The orphans' treasure beneath"],
    ["What did the fish do at the rock?", "Slipped into the sea", "The fish took its way into the sea"],
    ["The place the fish was lost was where they would find al-Khidr.", "True", "The fish took its way into the sea"],
    ["Ayah 63: what was the sign of the place?", "Their fish slipped into the sea", "The fish took its way into the sea"],
    ["Why was the wall rebuilt, in Al-Kahf?", "To keep two orphans' treasure safe", "The orphans' treasure beneath"],
    ["Ayah 82: what was under the wall?", "Two orphans' treasure", "The orphans' treasure beneath"],
    ["How did the fish go into the sea, in 18:61?", "As in a tunnel", "The fish took its way into the sea"],
    ["What did Al-Khidr fix, in 18:77?", "A wall about to fall", "A wall about to fall", "It was set straight"],
    ["What was under the wall, in 18:82?", "A treasure for two orphans", "The orphans' treasure beneath"]
  ],
  // The barrier between two mountains: blocks of iron up to their tops, molten copper poured over it (18:96).
  "sign-barrier": [
    ["Dhul-Qarnayn was a strong ruler who built a great ____.", "wall", "Blocks of iron", "Molten copper poured over it"],
    ["What did Dhul-Qarnayn build the barrier from, in Al-Kahf?", "Iron and copper", "Blocks of iron", "Molten copper poured over it"],
    ["Ayahs 83-101: what are they about?", "Dhul-Qarnayn's barrier", "Blocks of iron", "Molten copper poured over it"],
    ["Ayahs 83-101 say: Dhul-Qarnayn built a barrier of iron and molten copper.", "True", "Blocks of iron", "Molten copper poured over it"],
    ["Ayah 96: what did Dhul-Qarnayn build the barrier from?", "Iron and melted copper", "Blocks of iron", "Molten copper poured over it"],
    ["What did he ask for first, in 18:96?", "Pieces of iron", "Blocks of iron"],
    ["What is Qitran, per Ibn Kathir?", "Copper", "Molten copper poured over it"],
    ["How high did the blocks go, per Ibn Kathir?", "To the tops of the mountains", "Blocks of iron"]
  ],
  // Yunus: the great fish, the darknesses, the open shore, the gourd plant, his people who believed (37:142 to 37:148, 21:87, 10:98).
  "sign-yunus": [
    ["What swallowed Yunus?", "A great fish", "A great fish"],
    ["What is Yunus called in Quran 21:87?", "The man of the fish", "A great fish"],
    ["Where did Yunus make his dua?", "In the darkness", "In the darknesses"],
    ["What grew over him on the shore?", "A gourd plant", "A gourd plant grew"],
    ["Which people were saved because they believed in time?", "The people of Yunus", "His people believed"],
    ["Where was Yunus when he made this dua?", "In the darkness, inside the whale", "A great fish", "In the darknesses"],
    ["Which people believed in time and were spared, in Yunus?", "Yunus's people", "His people believed"],
    ["Ayahs 94-103: what are they about?", "Yunus's people", "His people believed"],
    ["Ayahs 94-103 say: Yunus's people believed in time, so the punishment was lifted.", "True", "His people believed"],
    ["Ayahs 139-182: what are they about?", "Yunus and the whale", "A great fish"],
    ["Ayahs 139-182 say: Yunus glorified Allah in the whale, and Allah saved him.", "True", "A great fish", "Cast on the open shore"],
    ["Which people were spared after believing, in 10:98?", "The people of Yunus", "His people believed"],
    ["Which three darknesses, per Ibn Mas'ud?", "Fish, sea and night", "In the darknesses"],
    ["What does the name Dhun-Nun mean?", "The one of the fish", "A great fish"],
    ["What swallowed Yunus, in 37:142?", "A big fish", "A great fish"],
    ["What grew over him, in 37:146?", "A gourd plant", "A gourd plant grew"],
    ["What did his people do, in 37:148?", "They believed", "His people believed"]
  ],
  // Maryam's palm tree: the stream beneath her, the fresh ripe dates (19:24, 19:25).
  "sign-maryam": [
    ["What fell from the palm tree?", "Fresh ripe dates", "Fresh ripe dates fell"],
    ["What did Allah give her below her?", "A stream", "A stream beneath"],
    ["What would fall when she shook the trunk?", "Fresh, ripe dates", "Fresh ripe dates fell"],
    ["What was placed below her to drink from?", "A stream", "A stream beneath"],
    ["Ayah 25: what fell when Maryam shook the palm?", "Fresh dates", "Fresh ripe dates fell"],
    ["What is Sariy, per Ibn Abbas?", "A river or stream", "A stream beneath"],
    ["What fell from the palm, in 19:25?", "Fresh ripe dates", "Fresh ripe dates fell"]
  ],
  // Dawud: the birds gathered with him, and the coats of mail he made from the iron, their rings just right (21:79, 21:80, 34:10, 34:11, 38:19).
  "sign-dawud": [
    ["What did Dawud make from the iron?", "Coats of armor", "Make coats of mail"],
    ["What did the birds do, per Ibn Kathir?", "Hovered and repeated after him", "And the birds, gathered"],
    ["What did Allah teach Dawud to make, in 21:80?", "Coats of mail", "Make coats of mail"],
    ["Dawud was the first to make armor of linked rings, per Qatadah.", "True", "Make coats of mail", "The rings just right"],
    ["What was Dawud told to make, in 34:11?", "Coats of mail", "Make coats of mail"],
    ["How should the rings be, per Mujahid?", "Just right", "Make coats of mail", "The rings just right"],
    ["What did a passing bird do, per Ibn Kathir?", "Hovered and glorified Allah", "And the birds, gathered"]
  ],
  // The House: its foundations raised, our Lord, accept from us, the call to Hajj, the camels from every distant path (2:127, 22:26, 22:27).
  "sign-house": [
    ["Ismail helped his father Ibrahim build the ____.", "Ka'bah", "Raising the foundations of the House"],
    ["Ismail helped his father Ibrahim build the ark.", "False", "Raising the foundations of the House"],
    ["What did they ask while building?", "Our Lord, accept from us", "Our Lord, accept from us"],
    ["How would the pilgrims come?", "On foot and on camels", "From every distant path"],
    ["Pilgrims come from every distant place.", "True", "From every distant path"],
    ["What did they ask while building?", "Our Lord, accept this from us", "Our Lord, accept from us"],
    ["Ayahs 122-129: what are they about?", "Building the Kabah", "Raising the foundations of the House"],
    ["Ayahs 122-129 say: Ibrahim and Ismail built the Kabah and asked Allah to accept.", "True", "Raising the foundations of the House", "Our Lord, accept from us"],
    ["What did Ibrahim and Ismail ask while building?", "Our Lord, accept from us", "Our Lord, accept from us"],
    ["Ayahs 26-33: what are they about?", "The call to Hajj", "Proclaim the Hajj to the people"],
    ["Ayah 27: how will people come to Hajj?", "On foot and on lean camels", "From every distant path"],
    ["What did they pray while working?", "Our Lord, accept from us", "Our Lord, accept from us"],
    ["After a good deed, what does their dua teach?", "Ask Allah to accept it", "Our Lord, accept from us"],
    ["What was Ibrahim told to proclaim, in 22:27?", "The Hajj", "Proclaim the Hajj to the people"],
    ["How will people come, in 22:27?", "On foot and lean camels", "From every distant path"],
    ["What was Ibrahim told when he worried his voice was weak?", "Call, and Allah conveys it", "Proclaim the Hajj to the people", "From every distant path"]
  ],
  // Safa and Marwah: the seven times between them, the water of Zamzam, the bird circling over it (2:158; Sahih al-Bukhari 3364).
  "sign-zamzam": [
    ["____ is walking between Safa and Marwah seven times.", "Sa'i", "Seven times between them"],
    ["What is Hajar known for?", "She was Ismail's mother and ran between Safa and Marwah.", "Seven times between them"],
    ["How many times did Hajar go between Safa and Marwah?", "Seven", "Seven times between them"],
    ["What was she looking for?", "Someone to help, and water", "Seven times between them", "The water of Zamzam"],
    ["What came out at the spot of Zamzam?", "Water", "The water of Zamzam"],
    ["How did they find the water?", "Birds circling over it", "A bird circling over the water"]
  ],
  // The queen's throne: brought before the glance returns, the favor of his Lord, the palace paved with glass over water (27:40, 27:44).
  "sign-throne": [
    ["How fast was her throne brought?", "In the blink of an eye", "Before your glance returns"],
    ["What did Sulayman call it when he saw the throne?", "A favor from my Lord, to test me", "From the favor of my Lord"],
    ["Ayah 40: what did Sulayman call the throne's swift arrival?", "My Lord's favour, to test me", "From the favor of my Lord"],
    ["How fast was the throne brought, in 27:40?", "In the blink of an eye", "Before your glance returns"],
    ["What did Sulayman call it?", "The grace of my Lord", "From the favor of my Lord"],
    ["What was under the glass floor?", "Flowing water", "A palace paved with glass"],
    ["What did she think it was?", "A pool", "A palace paved with glass"]
  ],
  // The mihrab: the provision Zakariyya found with Maryam, from Allah, and his call to his Lord there (3:37, 3:38).
  "sign-mihrab": [
    ["What did Zakariyya find with Maryam?", "Food from Allah", "He found provision with her", "It is from Allah"],
    ["Zakariyya made his du'a when he saw Allah's provision with Maryam.", "True", "He found provision with her", "There, Zakariyya called on his Lord"],
    ["What did Zakariyya find each time he entered her room?", "Food", "He found provision with her"],
    ["What did Maryam answer when asked where it came from?", "It is from Allah", "It is from Allah"],
    ["What did Zakariyya find with her?", "Food from Allah", "He found provision with her", "It is from Allah"]
  ],
  // The fire made coolness and safety for Ibrahim (21:69, 29:24, 37:98).
  "sign-cool-fire": [
    ["What did Allah tell the fire?", "Be cool and safe for Ibrahim", "O fire, be coolness", "And safety for Ibrahim"],
    ["The fire harmed Ibrahim a little.", "False", "O fire, be coolness", "And safety for Ibrahim"],
    ["What did Allah tell the fire to be for Ibrahim?", "Cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["Ayahs 51-75 say: Ibrahim broke the idols; Allah made the fire cool and safe.", "True", "O fire, be coolness", "And safety for Ibrahim"],
    ["Ayah 69: what did Allah tell the fire to be?", "Cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["What did Allah command the fire, in 21:69?", "Be cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["How did Allah save him, per Ibn Kathir?", "Made the fire cool and safe", "O fire, be coolness", "And safety for Ibrahim"],
    ["What did Allah do for Ibrahim, per Ibn Kathir?", "Saved him from the fire", "O fire, be coolness", "And safety for Ibrahim"]
  ],
  // 'Ad: their towers on every high place, the cloud facing their valleys, the wind of seven nights and eight days, only their homes left (26:128, 46:24, 69:7, 46:25; Sahih al-Bukhari 1035).
  "sign-ad-wind": [
    ["What did 'Ad build on every high place?", "Landmarks to show off", "Towers on every high place"],
    ["Ayahs 123-140 say: Hud warned Ad not to build monuments in vanity.", "True", "Towers on every high place"],
    ["Ayah 128: why did Ad build monuments?", "Just to show off", "Towers on every high place"],
    ["Why did 'Ad build their landmarks?", "To show off their strength", "Towers on every high place"],
    ["What did 'Ad think the cloud was?", "Rain", "A cloud facing their valleys"],
    ["What did Ad think the coming cloud was?", "A rain cloud", "A cloud facing their valleys"],
    ["What did 'Ad think the cloud was, in 46:24?", "A cloud bringing rain", "A cloud facing their valleys"],
    ["What was it really, in 46:24?", "A wind with a painful torment", "A wind with a painful punishment"],
    ["Which wind took 'Ad?", "The west wind", "A wind with a painful punishment"],
    ["What destroyed 'Ad, in Bukhari 1035?", "The west wind", "A wind with a painful punishment"],
    ["What destroyed 'Ad, per the hadith?", "A wind", "A wind with a painful punishment"],
    ["Which wind ended Ad, per Bukhari 1035?", "Ad-Dabur, the west wind", "A wind with a painful punishment"],
    ["Which wind destroyed Ad?", "Ad-Dabur, the westerly", "A wind with a painful punishment"],
    ["Which wind destroyed Ad?", "Ad-Dabur, the west wind", "A wind with a painful punishment"],
    ["What was sent upon Ad, in 41:16?", "A Sarsar wind", "A wind with a painful punishment"],
    ["What was sent against Ad, in 51:41?", "The barren wind", "A wind with a painful punishment"],
    ["What did Allah send on Ad, in 54:19?", "A violently cold wind", "A wind with a painful punishment"],
    ["The wind sent on Ad was a gentle breeze.", "False", "A wind with a painful punishment"],
    ["How long did the wind blow?", "Seven nights and eight days", "Seven nights and eight days"],
    ["How long did it last, per 69:7?", "Seven nights and eight days", "Seven nights and eight days"],
    ["How long did the wind last, in 69:7?", "Seven nights, eight days", "Seven nights and eight days"],
    ["How long did the wind blow on Ad?", "Seven nights and eight days", "Seven nights and eight days"],
    ["What does Husum mean?", "In succession", "Seven nights and eight days"],
    ["The wind on Ad stopped after one night.", "False", "Seven nights and eight days"],
    ["How were they destroyed, per 69:7?", "A furious wind for 7 nights and 8 days", "A wind with a painful punishment", "Seven nights and eight days"],
    ["Ayah 25: what was left of Ad after the wind?", "Only their homes", "Nothing seen but their homes"]
  ],
  // Musa's mother: the chest cast into the river, do not fear, his sister following him, and Musa returned to her (20:39, 28:7, 28:11, 28:13).
  "sign-river": [
    ["Where did Musa's mother put baby Musa?", "In the river", "Cast it into the river"],
    ["Allah told Musa's mother to put baby Musa in a cave.", "False", "Cast it into the river"],
    ["Where did Musa's mother put her baby?", "In the river", "Cast it into the river"],
    ["Where did Musa's mother place him?", "In the river", "Cast it into the river"],
    ["Ayah 7: where was Musa's mother told to put him?", "In the river", "Cast it into the river"],
    ["What was she told to do if she feared, in 28:7?", "Put him in the river", "Cast it into the river"],
    ["Where was baby Musa put, in 20:39?", "In a box on the river", "Put him into the chest", "Cast it into the river"],
    ["Allah told her not to fear and not to grieve.", "True", "Do not fear, do not grieve"],
    ["Allah told her to feel afraid and sad.", "False", "Do not fear, do not grieve"],
    ["What did Musa's mother tell his sister to do?", "Follow him", "Follow him"],
    ["Whom did the mother send, in 28:11?", "His sister", "Follow him"],
    ["How did the sister watch him?", "From afar, quietly", "Follow him"],
    ["Ayahs 1-13 say: Musa's mother put him in the river; Allah brought him back.", "True", "Cast it into the river", "We returned him to his mother"],
    ["Allah brought baby Musa back to his ____.", "mother", "We returned him to his mother"],
    ["Who nursed Musa in the end?", "His own mother", "We returned him to his mother"],
    ["Who alone was to nurse him?", "His own mother", "We returned him to his mother"],
    ["Ayah 13: why did Allah return Musa to his mother?", "So her eyes would be cooled", "We returned him to his mother"]
  ],
  // Qarun: the keys of his treasures, a load for strong men, his going out in his finery, the earth swallowing him and his home (28:76, 28:79, 28:81).
  "sign-qarun": [
    ["How heavy were Qarun's keys?", "Too heavy for strong men", "Treasures with heavy keys"],
    ["Ayah 76: what was heavy even for strong men?", "Qarun's keys", "Treasures with heavy keys"],
    ["What was heavy for strong men?", "The keys to his treasures", "Treasures with heavy keys"],
    ["How did Qarun go out, in 28:79?", "In his finery", "He went out in his finery"],
    ["What happened to Qarun and his home?", "The earth swallowed them", "The earth swallowed his home"],
    ["What happened to Qarun?", "The earth swallowed him", "The earth swallowed his home"],
    ["What happened to Qarun, in 28:81?", "The earth swallowed him", "The earth swallowed his home"],
    ["Could his wealth save him?", "No, it could not", "The earth swallowed his home"],
    ["No group could help him against Allah.", "True", "No one could help him"]
  ],
  // The well of Madyan: two women holding back their flock, Musa watering for them, then his call in the shade (28:23, 28:24).
  "sign-madyan": [
    ["Why were the two sisters waiting at the well?", "Until the shepherds left", "Two women held back their flock"],
    ["Why were the women waiting, in 28:23?", "For the shepherds to finish", "Two women held back their flock"],
    ["How did Musa help the two women?", "He watered their flock", "So he watered for them"],
    ["What did Musa do for them?", "Watered their flock", "So he watered for them"],
    ["What did Musa do at the well of Madyan?", "Helped two women water their flock", "So he watered for them"],
    ["Ayahs 22-28 say: At Madyan's well, Musa helped two women water their flock.", "True", "So he watered for them"],
    ["What did Musa say in the shade?", "My Lord, I am in need", "My Lord, I am in need"],
    ["Ayah 24: what did Musa pray in the shade?", "I need any good You send", "My Lord, I am in need"],
    ["What did Musa say, in 28:24?", "I am in need of Your good", "My Lord, I am in need"]
  ],
  // Ayyub: the ground struck with his foot, the cool water to wash and drink, the golden locusts, an excellent servant (38:42, 38:44; Sahih al-Bukhari 279).
  "sign-ayyub": [
    ["What was Ayyub told to strike?", "The ground, with his foot", "Strike the ground with your foot"],
    ["Ayah 42: what did Ayyub strike the ground with?", "His foot", "Strike the ground with your foot"],
    ["What was Ayyub told, in 38:42?", "Strike the ground with your foot", "Strike the ground with your foot"],
    ["What came out for him?", "Cool water to wash and drink", "Cool water to wash and drink"],
    ["What happened after washing, per Ibn Kathir?", "His bodily pain left", "Cool water to wash and drink"],
    ["What fell on Ayyub after his cure?", "Golden locusts", "Golden locusts fell"],
    ["Why did Ayyub gather them, though he was rich?", "He always needs Allah's blessing", "Golden locusts fell"],
    ["What did Allah find Ayyub to be?", "Patient", "What an excellent servant!"],
    ["What did Allah call him?", "An excellent servant", "What an excellent servant!"],
    ["Ayah 44: what did Allah call Ayyub?", "An excellent servant", "What an excellent servant!"],
    ["Why did Allah call Ayyub an excellent servant, per as-Sa'di?", "He served Allah in ease and hardship", "What an excellent servant!"]
  ],
  // Yusuf's dream: eleven stars, the sun and the moon, bowing to him, kept from his brothers, then made true (12:4, 12:5, 12:100).
  "sign-yusuf-dream": [
    ["How many stars did Yusuf see in his dream?", "Eleven", "Eleven stars"],
    ["Ayah 4: how many stars bowed in Yusuf's dream?", "Eleven stars", "Eleven stars"],
    ["How many stars did Yusuf see, in 12:4?", "Eleven", "Eleven stars"],
    ["Ayahs 1-6 say: Yusuf dreamed eleven stars, the sun and the moon bowing to him.", "True", "Eleven stars", "I saw them bowing to me"],
    ["What did Ya'qub tell him about the dream?", "Do not tell your brothers", "Do not tell your brothers"],
    ["Ayah 5: whom did Yaqub tell Yusuf not to tell?", "His brothers", "Do not tell your brothers"],
    ["Whom should Yusuf not tell, in 12:5?", "His brothers", "Do not tell your brothers"],
    ["What did Yusuf say when they bowed, in 12:100?", "This is the meaning of my dream", "My Lord has made it true"],
    ["Ayahs 94-104: what are they about?", "The dream comes true", "My Lord has made it true"],
    ["What did the eleven stars stand for, as the story ends?", "His eleven brothers", "My Lord has made it true"],
    ["Whom did the sun and the moon stand for?", "His father and mother", "My Lord has made it true"]
  ],
  // Fair measure: taken in full, given less, then given in full, and weighed with a straight balance (83:1-3, 26:181-182, 17:35).
  "sign-measure": [
    ["What do the cheaters do?", "Take in full, give less", "When they take, they take in full", "When they give, they give less"],
    ["Ayahs 1-17 say: Woe to cheaters who take in full but give short.", "True", "When they take, they take in full", "When they give, they give less"],
    ["Ayahs 1-17: what are they about?", "Cheating in measure", "When they take, they take in full", "When they give, they give less"],
    ["What did Madyan do wrong in trade?", "Cheated on measure and weight", "When they take, they take in full", "When they give, they give less"],
    ["What were they doing, per Ibn Kathir?", "Cheating in buying and selling", "When they take, they take in full", "When they give, they give less"],
    ["How did they cheat, per Ibn Kathir?", "In weights and measures", "When they take, they take in full", "When they give, they give less"],
    ["What do they demand when receiving, per 83:2?", "Full measure", "When they take, they take in full"],
    ["Ayah 3: what do the cheats do when they give?", "They give less", "When they give, they give less"],
    ["What do they do when giving, per 83:3?", "Give less than due", "When they give, they give less"],
    ["What wrong did Shu'ayb forbid, in 11:84?", "Short measure and weight", "When they give, they give less"],
    ["What is Tatfif, per Ibn Kathir?", "Being stingy in measure and weight", "When they give, they give less"],
    ["What did Shu'ayb teach about trade, in Ash-Shu'ara?", "Give full, fair measure", "Give full measure"],
    ["Ayahs 176-191: what are they about?", "Shu'ayb and fair measure", "Give full measure"],
    ["How should we measure, in 17:35?", "Give full measure", "Give full measure"],
    ["What is the rule of fair trade, per Ibn Kathir?", "Give as you take", "Give full measure"],
    ["What did Madinah's traders do after it came down?", "They gave good measure", "Give full measure"],
    ["Full measure is a command for justice in trade.", "True", "Give full measure"],
    ["What did Shu'ayb ask them to give?", "Full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What did Shu'ayb tell Madyan, in 7:85?", "Give full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What did Shu'ayb tell the people of Madyan, in Al-A'raf?", "Give full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What must they give, in 11:85?", "Full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["What did Allah command, per Ibn Kathir?", "Give measure and weight in full", "Give full measure", "Weigh with a straight balance"],
    ["Ayah 152: what must we give in trade?", "Full measure and weight", "Give full measure", "Weigh with a straight balance"],
    ["Ayah 182: with what kind of balance should we weigh?", "An honest, straight balance", "Weigh with a straight balance"],
    ["What must the balance be, in 26:182?", "True and straight", "Weigh with a straight balance"],
    ["What does a straight balance mean, per Ibn Kathir?", "Scales that are not distorted", "Weigh with a straight balance"]
  ],
  // Ibrahim's dream: the dream, the son's answer, both submitting, the call, and the great ram (37:102-107).
  "sign-ram": [
    ["What did the son say?", "Do as you are commanded", "Do what you are commanded"],
    ["What did the son answer?", "Do as you are commanded", "Do what you are commanded"],
    ["Ayah 102: what did the son tell his father?", "Do as you are told", "Do what you are commanded"],
    ["What did the son say, in 37:102?", "Do what you are commanded", "Do what you are commanded"],
    ["What did both do, in 37:103?", "Submit to Allah", "When they had both submitted"],
    ["Who called Ibrahim, in 37:104?", "Allah", "O Ibrahim, you have fulfilled the dream"],
    ["What did Ibrahim fulfil, in 37:105?", "The dream", "O Ibrahim, you have fulfilled the dream"],
    ["Allah stopped the sacrifice of the son.", "True", "O Ibrahim, you have fulfilled the dream", "We ransomed him with a great sacrifice"],
    ["Ibrahim's son was harmed in the end.", "False", "O Ibrahim, you have fulfilled the dream", "We ransomed him with a great sacrifice"],
    ["Ayahs 75-113 say: Ibrahim was ready to sacrifice his son; Allah ransomed him.", "True", "When they had both submitted", "We ransomed him with a great sacrifice"],
    ["What did Allah give in his son's place?", "A great sacrifice", "We ransomed him with a great sacrifice"],
    ["What did Allah send in place of Ibrahim's son?", "A great sacrifice, a ram", "We ransomed him with a great sacrifice"],
    ["What did Allah give in place of Ibrahim's son?", "A great sacrifice", "We ransomed him with a great sacrifice"],
    ["Ayah 107: what did Allah ransom the son with?", "A great sacrifice", "We ransomed him with a great sacrifice"],
    ["How was the son ransomed, in 37:107?", "With a great sacrifice", "We ransomed him with a great sacrifice"],
    ["What did he see when he turned, per Ibn Abbas?", "A horned white ram", "We ransomed him with a great sacrifice"],
    ["Ayahs 75-113: what are they about?", "Ibrahim's sacrifice", "We ransomed him with a great sacrifice"]
  ],
  // The qiblah: toward Jerusalem at first, the face turning to the sky, turned toward the Ka'bah, and everywhere (Bukhari 40, 2:144).
  "sign-qiblah": [
    ["Which way did Muslims first pray in Madinah?", "Toward Jerusalem", "Facing Jerusalem at first"],
    ["Before the Ka'bah, which way did Muslims face?", "Jerusalem", "Facing Jerusalem at first"],
    ["Which way did the Muslims face before the Ka'bah?", "Jerusalem (Bayt al-Maqdis)", "Facing Jerusalem at first"],
    ["Why did he ﷺ keep looking to the sky?", "Hoping the qiblah would change", "Your face turning to the sky", "Turn toward al-Masjid al-Haram"],
    ["Why did the Prophet ﷺ keep looking at the sky?", "He hoped for a new qiblah", "Your face turning to the sky", "Turn toward al-Masjid al-Haram"],
    ["Which way did the qiblah turn to?", "The Sacred Mosque in Makkah", "Turn toward al-Masjid al-Haram"],
    ["Ayahs 142-147 say: Allah turned the qiblah toward the Sacred Mosque in Makkah.", "True", "Turn toward al-Masjid al-Haram"],
    ["Ayahs 142-147: what are they about?", "The new qiblah", "Turn toward al-Masjid al-Haram"],
    ["Which way do Muslims face in prayer since 2:144?", "The Ka'bah in Makkah", "Turn toward al-Masjid al-Haram"],
    ["What did foolish people question, in 2:142?", "The change of qiblah", "Turn toward al-Masjid al-Haram"],
    ["Which way do Muslims face to pray?", "Toward the Kaaba", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"],
    ["Only people in Makkah must face the Kaaba.", "False", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"],
    ["Muslims from every country face one ____ together.", "Ka'bah", "Turn toward al-Masjid al-Haram", "Wherever you are, turn to it"],
    ["Do Muslims everywhere face the same Ka'bah?", "Yes, wherever they are", "Wherever you are, turn to it"]
  ],
  // Saba: two gardens, eat and be grateful, the flood of the dam, bitter fruit and tamarisk, scattered (34:15-19).
  "sign-saba": [
    ["What did Saba have, in 34:15?", "Two gardens", "Two gardens, right and left"],
    ["What were they told, in 34:15?", "Eat and be grateful", "Eat, and be grateful to Him"],
    ["What did Allah send, in 34:16?", "A flood from the dam", "The flood of the dam"],
    ["Why is it called Surah Saba?", "The people of Saba, who lost their gardens", "The flood of the dam", "Bitter fruit and tamarisk"],
    ["What did the gardens become, in 34:16?", "Bitter fruit gardens", "Bitter fruit and tamarisk"],
    ["What happened to them, in 34:19?", "They were dispersed", "Scattered far and wide"]
  ],
  // The cow: the old one and the calf go, then the ones that are not yellow, as the bright yellow cow comes (2:67-71).
  "sign-cow": [
    ["What color was the cow?", "Yellow", "Bright yellow, pleasing to see"],
    ["What colour was the cow, in ayah 69?", "Bright yellow", "Bright yellow, pleasing to see"],
    ["What color was the cow, in 2:69?", "Bright yellow", "Bright yellow, pleasing to see"]
  ],
  // Rain on a dead land (7:57, 35:9, 16:65).
  "sign-rain": [
    ["What does Allah send down to grow our food?", "Rain", "The winds bring the clouds", "The rain falls"],
    ["What does Allah send to grow plants, in 6:99?", "Water from the sky", "The winds bring the clouds", "The rain falls"],
    ["What comes before Allah's mercy, the rain, in 7:57?", "The winds", "The winds bring the clouds"],
    ["What does the rain do to the earth, in 16:65?", "Revives it after its death", "The land comes to life"],
    ["What happens when rain falls on dry earth, in 22:5?", "It stirs and grows plants", "The land comes to life"],
    ["What do some winds do, per Ibn Kathir?", "Form and drive the clouds", "The winds bring the clouds"],
    ["What is the mercy, per Ibn Kathir?", "The rain", "The winds bring the clouds", "The rain falls"],
    ["What is the sign, in 36:33?", "The dead land given life", "The land comes to life"],
    ["What happens to barren earth with rain, in 41:39?", "It stirs to life", "The land comes to life"],
    ["What does rain do to the earth, in 45:5?", "Revives it after its death", "The land comes to life"],
    ["What does Allah send down, in 50:9?", "Blessed water", "The winds bring the clouds", "The rain falls"],
    ["Seeds grow without any water.", "False", "The rain falls", "The land comes to life"]
  ],
  // The clouds piled up, the rain coming out from within (24:43).
  "sign-clouds": [
    ["What does Allah do with the clouds, per Ibn Kathir?", "Piles them up in layers", "He piles them up"],
    ["Where does the rain come from, in 24:43?", "From between the clouds", "Rain comes out from within"],
    ["Ayah 43: what comes out of the piled-up clouds?", "Rain", "Rain comes out from within"]
  ],
  // Green, then yellow, then broken straw scattered by the winds (57:20, 18:45, 39:21).
  "sign-fade": [
    ["What scatters the dry plants, in 18:45?", "The winds", "Scattered by the winds"],
    ["What happens to the crops, in 39:21?", "They wither and break", "Then yellow", "Then broken straw"],
    ["What happens to the crops, in 57:20?", "Yellow, then straw", "Then yellow", "Then broken straw"],
    ["The green fades and becomes scattered pieces of dust.", "True", "Then yellow", "Scattered by the winds"]
  ],
  // One seed, seven ears, a hundred grains in each (2:261).
  "sign-seed": [
    ["One seed grows how many ears in this ayah?", "Seven", "Seven ears"],
    ["How many grains in each ear?", "A hundred", "A hundred grains in each"],
    ["Allah can multiply it even more.", "True", "Allah gives more to whom He wills"],
    ["Charity for Allah grows like a seed giving how many ears?", "Seven", "Seven ears"],
    ["Ayahs 261-266: what are they about?", "A seed of seven ears", "One seed", "Seven ears"],
    ["How many grains come from one, in 2:261?", "Seven hundred", "Seven ears", "A hundred grains in each"],
    ["Can Allah give even more?", "Yes, for whom He wills", "Allah gives more to whom He wills"]
  ],
  // The two seas and the barrier between them (25:53, 55:19, 55:20, 27:61).
  "sign-seas": [
    ["What two seas are in 25:53?", "Sweet and salty", "Sweet water", "Salty water"],
    ["What is between them, in 25:53?", "A barrier and partition", "A barrier between them"],
    ["What are the two seas, per Ibn Kathir?", "Fresh and salty waters", "Sweet water", "Salty water"],
    ["What is between the two seas, in 55:20?", "A barrier", "A barrier between them"],
    ["Why is the barrier there, per Ibn Kathir?", "So neither spoils the other", "A barrier between them"],
    ["Ayah 53: what is between the sweet and salty seas?", "A barrier", "A barrier between them"],
    ["What is between the two seas, in 27:61?", "A barrier", "A barrier between them"]
  ],
  // The ships, tall like mountains, sailing by His command (22:65, 42:32, 45:12, 55:24).
  "sign-ships": [
    ["Who makes ships sail, in Al-Hajj?", "Allah", "By His command"],
    ["Ayah 65: by whose command do ships sail?", "By Allah's command", "By His command"],
    ["Ayah 12: by whose command do ships sail the sea?", "By Allah's command", "By His command"],
    ["Who drives the ship through the sea, in 17:66?", "Allah", "By His command"],
    ["How do ships sail, per Ibn Kathir?", "By His command", "By His command"],
    ["Why do ships sail, per 45:12?", "By His command", "By His command"],
    ["What are the ships like, in 55:24?", "Mountains", "The ships sail the sea", "Tall like mountains"]
  ],
  // The earth spread out, the mountains set firm like pegs (78:6, 78:7, 16:15, 21:31).
  "sign-mountains": [
    ["What are the mountains like, in An-Naba?", "Pegs holding the earth", "Like pegs"],
    ["Ayah 7: what are the mountains like?", "Pegs", "Like pegs"],
    ["Ayahs 1-16 say: Allah made the earth a bed and the mountains like pegs.", "True", "The earth spread out", "Like pegs"],
    ["What did Allah place in the earth, in 15:19?", "Firm mountains", "Mountains set firm"],
    ["Why were mountains set firm, in 16:15?", "So the earth does not shake", "The earth stays steady"],
    ["Why were mountains placed, in 21:31?", "So the earth would not shake", "The earth stays steady"],
    ["What makes the earth steady, per Ibn Kathir?", "Firm mountains", "Mountains set firm"],
    ["What did Allah place on the earth, in 41:10?", "Firm mountains", "Mountains set firm"],
    ["What are Rawasi, per Ibn Kathir?", "Mountains", "Mountains set firm"],
    ["What did Allah do to the earth, in 50:7?", "Spread it out", "The earth spread out"],
    ["Mountains keep the earth steady for its people.", "True", "The earth stays steady"],
    ["What are the fixed towers, per Ibn Kathir?", "The mountains", "Mountains set firm"],
    ["Mountains make the earth shake and sway.", "False", "The earth stays steady"],
    ["What are the mountains, per 78:7?", "Pegs", "Like pegs"],
    ["Why are they like pegs, per Ibn Kathir?", "To hold the earth in place", "The earth stays steady"],
    ["Why are the mountains firm, per Ibn Kathir?", "So the earth is calmly settled", "The earth stays steady"]
  ],
  // The bee and its honey of many colors, with healing in it (16:68, 16:69).
  "sign-bee": [
    ["What comes from bees, in An-Nahl?", "Honey with healing", "Honey of many colors", "Healing for people"],
    ["Ayah 69: what is in the bee's drink for people?", "Healing", "Healing for people"],
    ["What did the Prophet ﷺ say to give the man with stomach pain?", "Honey", "Honey of many colors"],
    ["What comes from the bees, in 16:69?", "A drink of varying colors", "Honey of many colors"],
    ["What is in honey, in 16:69?", "A cure for people", "Healing for people"],
    ["Why does honey have different colors, per Ibn Kathir?", "What the bees eat", "Eat from every fruit", "Honey of many colors"],
    ["What happened in the end, in the hadith?", "He was cured", "Healing for people"]
  ],
  // The spider's house, the weakest of houses (29:41).
  "sign-spider": [
    ["What are false protectors like, in Al-Ankabut?", "A spider's house", "The spider builds a house"],
    ["Ayahs 31-44: what are they about?", "The spider's house", "The spider builds a house"],
    ["Ayah 41: what is the weakest of houses?", "The spider's house", "The spider builds a house", "The weakest of houses"],
    ["What is the weakest house, in 29:41?", "The spider's house", "The spider builds a house", "The weakest of houses"],
    ["Whom are idol worshippers like, per Ibn Kathir?", "One holding a spider's web", "The spider builds a house"],
    ["What does the name Surah Al-'Ankabut mean?", "The Spider", "The spider builds a house"],
    ["Why is it called Surah Al-'Ankabut?", "The spider's house, the weakest of all houses", "The spider builds a house", "The weakest of houses"]
  ],
  // The good tree, its root firm and its branches in the sky (14:24, 14:25).
  "sign-tree": [
    ["What is a good word like, in Ibrahim?", "A good tree", "Its root is firm", "Its branches are in the sky"],
    ["Ayahs 22-27: what are they about?", "The good tree", "Its root is firm", "Its branches are in the sky"],
    ["Ayah 24: a good word is like what?", "A good tree", "Its root is firm", "Its branches are in the sky"],
    ["Which tree did the Prophet ﷺ liken to a Muslim?", "The date palm", "Its root is firm", "Its branches are in the sky"],
    ["What is a good word like, in 14:24?", "A good tree", "Its root is firm", "Its branches are in the sky"],
    ["When does the tree give fruit, in 14:25?", "At all times, by its Lord's leave", "Its fruit at every time"],
    ["Which tree is like the Muslim?", "The date palm", "Its root is firm", "Its branches are in the sky"]
  ],
  // The camels, the sky, the mountains and the earth (88:17 to 88:20).
  "sign-look": [
    ["What should we look at, per 88:17?", "The camels, how they are created", "The camels, how they were created"],
    ["What should we look at, per 88:18?", "The heaven, how it is raised", "The sky, how it was raised"],
    ["What should we look at, per 88:19?", "The mountains, how they are rooted", "The mountains, how they were set firm"],
    ["How is the earth, per 88:20?", "Outspread", "The earth, how it was spread out"]
  ],
  // The birds, their wings spread and folded in, held up by the Most Merciful (67:19, 16:79).
  "sign-birds": [
    ["Who holds the birds up in the air?", "Ar-Rahman", "None holds them up but the Most Merciful"],
    ["What do the birds do with their wings in the ayah?", "Spread and fold them", "Birds in the sky", "And folded in"],
    ["Ibn Kathir says Allah keeps them up out of His ____.", "mercy", "None holds them up but the Most Merciful"],
    ["Who holds the birds up in the sky, in Al-Mulk?", "The Merciful", "None holds them up but the Most Merciful"],
    ["Ayahs 15-22 say: Who holds the birds up in the sky but the Merciful?", "True", "None holds them up but the Most Merciful"],
    ["Ayah 19: what are the birds doing?", "Spreading and folding wings", "Birds in the sky", "And folded in"],
    ["Who holds the birds up, in 16:79?", "Allah", "None holds them up but the Most Merciful"],
    ["Who holds the birds up?", "The Most Gracious", "None holds them up but the Most Merciful"],
    ["Why does Allah hold them up?", "Out of His mercy", "None holds them up but the Most Merciful"],
    ["A flying bird is a sign of Allah's mercy.", "True", "None holds them up but the Most Merciful"],
    ["What do birds do with their wings in 67:19?", "Spread and fold them", "Birds in the sky", "And folded in"],
    ["Birds fly by their own power alone.", "False", "None holds them up but the Most Merciful"]
  ],
  // The seed we sow, which Allah makes grow (56:63, 56:64).
  "sign-sow": [
    ["Who makes the crops grow, in Al-Waqi'ah?", "Allah", "Allah makes it grow"],
    ["Ayah 64: who makes the crops grow?", "Allah, the Grower", "Allah makes it grow"],
    ["Who is the Grower, in 56:64?", "Allah", "Allah makes it grow"],
    ["What does Allah do to the seeds?", "Keeps them firm and grows them", "Allah makes it grow"],
    ["What does Allah ask us to see, in 56:63?", "What we sow", "The seed you sow"]
  ],
  // The water we drink (56:68 to 56:70).
  "sign-water": [
    ["What does 56:70 ask at the end?", "Why do you not give thanks?", "So give thanks"]
  ],
  // The shade, the sun its guide (25:45).
  "sign-shade": [
    ["What did Allah spread, in 25:45?", "The shadow", "He stretches the shade"]
  ],
  // The foam that passes away, and what benefits people, which remains (13:17).
  "sign-foam": [
    ["What happens to the foam, in 13:17?", "It passes away as scum", "The foam passes away"],
    ["What remains in the earth, in 13:17?", "What benefits mankind", "What benefits people remains"]
  ],
  // The rain on three lands (Sahih al-Bukhari 79).
  "sign-lands": [
    ["Which land is like someone who learns and teaches?", "Land that drinks and grows plants", "Good land grows grass"],
    ["What is the Prophet's ﷺ guidance compared to?", "Abundant rain", "Rain falls on three lands"],
    ["What does barren land do with rain?", "Neither holds it nor grows plants", "Barren land keeps nothing"]
  ],
  // Deeds like ashes in a stormy wind (14:18).
  "sign-ashes": [["Can they keep any of what they earned, in 14:18?", "No, nothing", "Nothing is left"]],
  // The garden struck at night, black and bare by morning (68:19, 68:20).
  "sign-garden": [
    ["What happened to the garden owners' garden?", "Destroyed overnight", "At night, it was struck", "By morning, black and bare"],
    ["Ayah 20: what did the garden look like by morning?", "Like a burnt field", "At night, it was struck", "By morning, black and bare"],
    ["What did Ibn Abbas say the garden became like?", "The dark night", "At night, it was struck", "By morning, black and bare"],
    ["Allah can take away wealth in one night.", "True", "At night, it was struck", "By morning, black and bare"]
  ],
  // The two gardens of grapes, the river between, the fruit ruined (18:32, 18:33, 18:42).
  "sign-two-gardens": [
    ["What were the two gardens of, in 18:32?", "Grapes, with date palms around", "Two gardens of grapes", "Palms around, crops between"],
    ["What flowed between the gardens, in 18:33?", "A river", "A river flowing between"],
    ["What happened to his fruits, in 18:42?", "They were ruined", "Then all the fruit was ruined"]
  ]
};

/** How long before the end of its last moment the scene stops, so that moment's words still show. */
const WORDS_HOLD = 0.03;

export type SceneQuestion = {
  scene: SignScene;
  /** Where the scene waits for the answer: the end of the moment before (its start, for the first). */
  pause: number;
  /** Where it stops once answered: the end of the moment asked about (just before, while its words show). */
  reveal: number;
};

/** Where a scene waits and where it stops, for a question on its moments `from` to `to` (each a moment's words). */
export function sceneMoment(kind: SignKind, from: string, to: string = from) {
  const words = signArt(kind).words;
  const first = words.findIndex((word) => word.text === from);
  const last = words.findIndex((word) => word.text === to);
  if (first < 0 || last < first) return undefined;
  const end = words[last].to;
  return { pause: first > 0 ? words[first - 1].to : 0, reveal: end >= 1 ? 1 : Number((end - WORDS_HOLD).toFixed(3)) };
}

const key = (prompt: string, answer: string) => `${prompt.trim()}\n${answer.trim()}`;

let index: Map<string, { sceneId: string; from: string; to?: string }> | undefined;

/** Every story question, by its English prompt and right answer (for the tests). */
export function sceneAsks() {
  return Object.entries(ASKS).flatMap(([sceneId, asks]) => asks.map(([prompt, answer, from, to]) => ({ sceneId, prompt, answer, from, to: to ?? from })));
}

/** The scene a question is asked on, and where it waits and stops; read on the English question. */
export function sceneQuestionFor(challenge: Pick<Challenge, "prompt" | "choices" | "correctChoiceId">): SceneQuestion | undefined {
  if (!index) {
    index = new Map();
    for (const ask of sceneAsks()) index.set(key(ask.prompt, ask.answer), ask);
  }
  const right = challenge.choices.find((choice) => choice.id === challenge.correctChoiceId)?.label;
  const ask = right ? index.get(key(challenge.prompt, right)) : undefined;
  const scene = ask ? SIGN_SCENES.find((each) => each.id === ask.sceneId) : undefined;
  const moment = ask && scene ? sceneMoment(scene.kind, ask.from, ask.to) : undefined;
  return scene && moment ? { scene, ...moment } : undefined;
}
