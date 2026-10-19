# Importing Obsidian notes as lessons

`scripts/obsidian-import` turns a folder of Obsidian notes into lessons and questions for the app
and the backend seed.

```bash
npm run import:notes -- "C:/Users/ME/Documents/Obsidian/Islamic Notes" --dry-run   # preview + warnings
npm run import:notes -- "C:/Users/ME/Documents/Obsidian/Islamic Notes"             # write the files
npm run backend:seed                                                              # load into the database
```

It writes two files, both safe to commit:

- `src/data/importedNotes.generated.ts`: lessons the app shows. `src/data/importedNotes.ts` places them in the course
  (see "Where imported lessons go" below).
- `backend/data/obsidian_import.json`: the same content for `backend/app/catalog_seed.py`.

Each run replaces both files with whatever the folder contains now, so the notes stay the source of truth.

Options: `--topic <id>` for notes that don't name a topic, `--strict` to fail on any warning,
`--out` and `--backend-out` to write somewhere else.

## How notes map to the app

| Obsidian | App |
| --- | --- |
| Topic folder (`Sahabah/`, `Quran/`, `Manners/`...) or `topic:` property | Topic section |
| One note | One branch (path of lessons) |
| Text above the first `##` heading | Branch description |
| Each `## Heading` | One lesson, unlocked after the previous one |
| A note with no `##` headings | A branch with a single lesson |
| `### Key takeaway`, `### Why it matters`, `### Story moment` under a lesson | Those lesson panels |
| Quran.com, Sunnah.com, YouTube or Yaqeen Institute links | Lesson sources ("Open source" button) |

Topic folder names that work: `Sahabah`/`Sahaba`/`Sahabi`/`Companions`, `Quran`/`Tafsir`,
`Prophets`/`Seerah`, `Manners`/`Adab`/`Akhlaq`, `Prayer`/`Salah`, `Aqidah`/`Iman`, `Fasting`/`Ramadan`,
`Zakat`, `Hajj`, `Marriage`/`Nikah`, `Women`, `Foundation`/`Basics`. Any folder depth works, so
`Islam/Sahabah/Abu Bakr.md` is fine.

Lessons named with "review", "quiz", "recap" or "mastery" become review lessons. Difficulty climbs from 1
through the note unless the note sets `difficulty:`.

## Structured notes (`type: person`, `surah`, `hadith`)

Notes with one of these `type:` properties don't need written questions; the importer quizzes their facts,
taking wrong choices from the same fact on other notes of the same type (never one that overlaps the right
answer, so two choices can't both be true: Quraysh is never offered against Kinanah, nor Uhud against Madinah).

| `type:` | Goes to | Lessons | Learn card and questions from |
| --- | --- | --- | --- |
| `person` tagged `Mothers-of-the-Believers` or `Women-of-Islam` | Women of the Book, "Women 1" and so on | one per person, 10 per unit | `learn_line:` (or `known_for`), and up to 3 fact chips from `father`, `mother`, `tribe`, `clan`, `birth_place`, `death_place` |
| `person` tagged `Prophet` | Lives of the Prophets, "Prophets 1"... | same | same |
| `person` tagged `Sahabi` | Sahabah, "Companions 1"... | same | same |
| `surah` | Quran and Tafseer, "Surahs 1-10" and so on | one per surah | `**English name:**`, `**Revelation:**`, `**Ayahs:**` lines, and the `### Quran 103:1` ayahs |
| `hadith` | Hadith (a new topic) | one per hadith | `lesson_title:`, `learn_line:`, `quote:`, `level:` and the note's `Q:`/`A:` lines |

Other people (scholars, Tabi'in) and other note types are skipped and counted in one warning. Sources come
from Sunnah.com and Quran.com links in the note, and `source_url:`; Wikipedia and other sites are left out.

### Learn cards

Each structured lesson opens with a short learn card, and its questions ask only about what that card shows.

- **People:** one line of 12 words or fewer (`learn_line:`, else `known_for` when it is that short) and up
  to 3 chips of 5 words or fewer ("Tribe: Quraysh", "Born in Makkah"). A chip the note is unsure of ("Makkah
  or Kufa", "possibly ...") is left out. The questions are the chips first (at most 3), then "What is X
  known for?" when there are too few chips. The rest of a person note (lists, asides, family trees) stays in
  the vault.
- **Surahs:** the name's meaning (or what it is named after, for a surah named after a person or its opening
  letters, such as Surah Hud or Surah Ya-Sin), the ayah count and where it was revealed, and the surah's first ayah in
  full (after any opening letters such as Alif Lam Mim) when it is short. Only the first 10 ayahs are
  quizzed. An ayah that is only letters, is for adults, or would frighten a young child when read alone is
  never shown on its own or offered as a choice.
- **Hadith:** a title about what the hadith teaches (`lesson_title:`), the line the mascot says
  (`learn_line:`), and one key sentence (`quote:`) shown as the Prophet's ﷺ words with the reference and its
  grade ("Jami' at-Tirmidhi 1956 (Sahih, Darussalam)"). The quote must be in the note word for word, or it is
  left out with a warning. Choices are never cut short. `level: 1` suits young children and `level: 5` is
  for adults (marriage); the path puts lower levels first.

```yaml
---
type: hadith
collection: Sahih Muslim
reference: 134a
lesson_title: I believe in Allah
learn_line: "If you wonder who created Allah, say: I believe in Allah."
quote: "He who found himself confronted with such a situation should say: I affirm my faith in Allah."
level: 1
---
```

### Hand-checked wording (`curated.mjs`)

Notes already in the vault get their wording from `scripts/obsidian-import/curated.mjs`. A note's own
properties win over it, so a new note never needs an entry there.

- `DISPLAY_NAMES`: one simple spelling per person, where the general rules can't get it right.
- `LEARN_LINES`: a checked learn line per person.
- `HADITH_LESSONS`: title, learn line, quote, level and questions per hadith, keyed by reference.
- `NO_WHO_QUESTION`: people whose line would also fit someone else (Quran 21:85 calls several prophets
  patient), so they get a True/False instead of "Who ...?".
- `UNSURE_FACTS`: facts left off the learn card because they don't come from Islamic sources.
- `SURAH_NAMED_AFTER`: surahs whose English name is not a meaning ("Ya Sin", "Hud", "Jonah"); the learn
  card says what each is named after, and that name is never asked or offered as a meaning.

### Names, ids and order

Names are shown in one plain spelling: doubled vowels are collapsed ("Aa" to "a", "Ash-Shuraa" to "Ash-Shura"),
and "ibn", "bint" and "al-" are written the same way everywhere. Lesson and unit ids still come from the note's
own name and the units' first titles, and lessons are grouped in the order of the note names as typed, so a
better title never moves a lesson or loses saved progress.

### Warnings to fix in the vault

`--dry-run` lists these; `--strict` fails on them.

- a name with a doubled vowel or an `l` typed for `I` ("'Lyaash"), so the note can be renamed;
- "Allah" used as a common noun ("your Allah is One Allah"; the importer writes "God" here);
- a space after the article's hyphen ("Al- Fatihah"; fixed on import);
- a rude word;
- a person with no learn line, or a hadith with no `lesson_title:`, `learn_line:` or questions;
- a quote that is not in the note word for word.

## Where imported lessons go

`src/data/importedNotes.ts` merges the generated lessons into the course:

- **Quran:** in learning order. Al-Fatihah first, then Juz Amma from An-Nas back to An-Naba, then the rest
  in mushaf order. Imported surahs are regrouped into units of 10 or fewer between the built-in surah units
  ("Surahs 114-105", "Surahs 104-96" ...).
- **Sahabah, Prophets, Women:** the built-in units come first (Abu Bakr, Umar, Uthman, Ali ...), then the
  imported people. A person who already has a built-in lesson (Nuh, Maryam, Khadijah ...) is not shown twice:
  the imported lesson's chips and line go onto the built-in one.
- **Hadith:** ordered by `level:`, so the lessons for young children come first and marriage comes last.

## Writing questions

Any of these can go under a lesson heading:

```markdown
Q: Who was among the people Abu Bakr brought to Islam?
- [x] Uthman ibn Affan
- [ ] Abu Jahl
- [ ] Abu Lahab
Explanation: Abu Bakr's dawah brought several of the earliest Muslims.

Q: Where did the Prophet ﷺ and Abu Bakr hide during the Hijrah?
A: The cave of Thawr

T/F: Abu Bakr stayed behind in Makkah during the Hijrah.
A: False
> He travelled with the Prophet ﷺ and was his companion in the cave.

Which surah mentions the two in the cave?:: Surah at-Tawbah
```

- `- [x]` / `- [ ]` options give the best quizzes because you choose the wrong answers.
- `Q:` with `A:`, or a `question:: answer` flashcard (the Spaced Repetition plugin style), becomes a
  multiple-choice question whose wrong choices are other answers from the same note. Choices that share a
  word with the right answer are left out so two choices never both look right. A note needs at least
  three such answers before this works.
- `A: True` / `A: False` makes a true/false question.
- `Explanation:` or a `>` line right after a question is shown after the learner answers; otherwise the
  lesson's first sentence is used.
- `key:: value` lines with a short key (Dataview fields like `born:: 573 CE`) are left alone.
- A lesson with no questions gets one generated "Which point comes from this lesson?" question built from
  the first sentences of the note's other lessons, with a warning so you can write real ones.

## Properties

```yaml
---
title: Abu Bakr as-Siddiq     # branch name (default: the file name)
topic: sahabah                # overrides the folder
description: ...              # overrides the first paragraph
order: 1                      # position among imported branches in the topic
difficulty: 2                 # 1-5 for every lesson in the note
learn_line: ...               # structured notes: the learn card's line (12 words or fewer)
lesson_title: ...             # hadith notes: the lesson's title
quote: ...                    # hadith notes: the sentence the learn card shows, word for word from the note
level: 1                      # hadith notes: 1 for young children up to 5 for adults
premium: true                 # premium-only branch
import: false                 # leave this note out
sources:
  - "Quran 9:40 https://quran.com/9/40"
---
```

Wikilinks, highlights, tags, `%%comments%%`, embeds and bare URLs are cleaned out of the lesson text.

`scripts/obsidian-import/sample-vault` has two example notes; `npm run test:notes` runs the importer's tests.
