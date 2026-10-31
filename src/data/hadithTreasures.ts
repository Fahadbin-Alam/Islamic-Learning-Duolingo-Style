import type { LessonSource, UserProfile } from "../types";

// Hadith treasures: hadith cards bought with gems in the Shop, one new card per chest, kept in "My hadith" for good.
// They are bonus reading, never a lesson the path needs. Every quote is sunnah.com's English (Sahih al-Bukhari,
// Muhsin Khan) word for word: the Prophet's ﷺ own words, never cut inside a sentence. None of them is taught by a
// lesson already. Nothing disputed. The cards ship inside the app, so they open offline.

export type HadithCard = {
  id: string;
  title: string;
  /** What it teaches, in a child's words. */
  line: string;
  quote: string;
  reference: string;
  source: LessonSource;
};

/** One card for one hadith of Sahih al-Bukhari; `number` is sunnah.com's (bukhari:6011). */
function card(id: string, number: number, narrator: string, title: string, line: string, quote: string): HadithCard {
  const reference = `Sahih al-Bukhari ${number}`;
  return {
    id,
    title,
    line,
    quote,
    reference,
    source: {
      id: `treasure_bukhari_${number}`,
      site: "Sunnah.com",
      category: "hadith",
      title: reference,
      url: `https://sunnah.com/bukhari:${number}`,
      reference,
      from: `Narrated by ${narrator}`,
      grade: "Sahih",
      summary: quote
    }
  };
}

/** In the order the chest gives them out. */
export const HADITH_TREASURES: HadithCard[] = [
  card(
    "hadith-one-body",
    6011,
    "An-Nu'man bin Bashir",
    "One body",
    "Believers care for each other like one body.",
    "You see the believers as regards their being merciful among themselves and showing love among themselves and being kind, resembling one body, so that, if any part of the body is not well then the whole body shares the sleeplessness (insomnia) and fever with it."
  ),
  card(
    "hadith-two-blessings",
    6412,
    "Ibn 'Abbas",
    "Two big gifts",
    "Use your health and free time well.",
    "There are two blessings that many people are deceived into losing: health and free time."
  ),
  // sunnah.com writes the two phrases with a stray space and backtick ("Al- `Azim"); only the quote marks are tidied.
  card(
    "hadith-light-words",
    6406,
    "Abu Huraira",
    "Light words, heavy reward",
    "Two short words of dhikr weigh a lot with Allah.",
    "There are two expressions which are very easy for the tongue to say, but they are very heavy in the balance and are very dear to The Beneficent (Allah), and they are, 'Subhan Allah Al-'Azim' and 'Subhan Allah wa bihamdihi'."
  ),
  card(
    "hadith-best-manners",
    6035,
    "Masruq",
    "Best manners",
    "The best people have the best manners.",
    "The best among you are the best in character (having good manners)."
  ),
  card(
    "hadith-building",
    6026,
    "Abu Musa",
    "A strong building",
    "Muslims hold each other up, like bricks in a wall.",
    "A believer to another believer is like a building whose different parts enforce each other."
  ),
  card(
    "hadith-feed-and-visit",
    5649,
    "Abu Musa Al-Ash'ari",
    "Help people",
    "Feed the hungry and visit the sick.",
    "Feed the hungry, visit the sick, and set free the captives."
  ),
  card(
    "hadith-religion-easy",
    39,
    "Abu Huraira",
    "Islam is easy",
    "Keep your worship steady, not too much at once.",
    "Religion is very easy and whoever overburdens himself in his religion will not be able to continue in that way."
  ),
  card(
    "hadith-giving-hand",
    1429,
    "Ibn 'Umar",
    "The giving hand",
    "Giving is better than asking.",
    "The upper hand is better than the lower hand. The upper hand is that of the giver and the lower (hand) is that of the beggar."
  ),
  card(
    "hadith-brothers",
    2442,
    "'Abdullah bin 'Umar",
    "Brothers in Islam",
    "A Muslim never wrongs another Muslim.",
    "A Muslim is a brother of another Muslim, so he should not oppress him, nor should he hand him over to an oppressor."
  ),
  card(
    "hadith-be-brothers",
    6065,
    "Anas bin Malik",
    "No hate, no jealousy",
    "Don't hate or envy each other. Be brothers.",
    "Do not hate one another, and do not be jealous of one another, and do not desert each other, and O, Allah's worshipers! Be brothers."
  ),
  card(
    "hadith-remember-allah",
    6407,
    "Abu Musa",
    "Remember Allah",
    "Remembering Allah keeps your heart alive.",
    "The example of the one who celebrates the Praises of his Lord (Allah) in comparison to the one who does not celebrate the Praises of his Lord, is that of a living creature compared to a dead one."
  ),
  card(
    "hadith-traveler",
    6416,
    "Mujahid",
    "Like a traveler",
    "This world is a short trip. Live like a traveler.",
    "Be in this world as if you were a stranger or a traveler."
  )
];

export const HADITH_CARD_PRICE = 40;

export function ownedHadith(user: Pick<UserProfile, "ummah">) {
  const owned = user.ummah?.hadith ?? [];
  return HADITH_TREASURES.filter((card) => owned.includes(card.id));
}

/** The card the next chest gives, or undefined once every card is owned. */
export function nextHadith(user: Pick<UserProfile, "ummah">) {
  const owned = user.ummah?.hadith ?? [];
  return HADITH_TREASURES.find((card) => !owned.includes(card.id));
}

/** Opens a chest: the next card for its gems. Does nothing when every card is owned or gems are short. */
export function buyHadith(user: UserProfile): { user: UserProfile; card?: HadithCard } {
  const next = nextHadith(user);
  if (!next || user.gems < HADITH_CARD_PRICE) return { user };
  const ummah = { trophies: 0, best: 0, battles: 0, wins: 0, ...(user.ummah ?? {}) };
  return { user: { ...user, gems: user.gems - HADITH_CARD_PRICE, ummah: { ...ummah, hadith: [...(ummah.hadith ?? []), next.id] } }, card: next };
}
