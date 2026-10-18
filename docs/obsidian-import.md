# Importing Obsidian notes as lessons

`scripts/obsidian-import` turns a folder of Obsidian notes into lessons and questions for the app
and the backend seed.

```bash
npm run import:notes -- "C:/Users/ME/Documents/Obsidian/Islamic Notes" --dry-run   # preview + warnings
npm run import:notes -- "C:/Users/ME/Documents/Obsidian/Islamic Notes"             # write the files
npm run backend:seed                                                              # load into the database
```

It writes two files, both safe to commit:

- `src/data/importedNotes.generated.ts`: lessons the app shows, added after each topic's built-in branches.
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
answer, so two choices can't both be true).

| `type:` | Goes to | Lessons | Questions from |
| --- | --- | --- | --- |
| `person` tagged `Mothers-of-the-Believers` or `Women-of-Islam` | Women of the Book | one per person, 10 per branch | `tribe`, `clan`, `known_for`, `died`, `death_place`, `birth_place`, `father`, `mother`, `burial_place` |
| `person` tagged `Prophet` | Lives of the Prophets | same | same |
| `person` tagged `Sahabi` | Sahabi | same | same |
| `surah` | Quran and Tafseer, "Surahs 1-10" and so on | one per surah | `**English name:**`, `**Revelation:**`, `**Ayahs:**` lines, and the `### Quran 103:1` ayahs (Arabic shown, pick the meaning) |
| `hadith` | Hadith (a new topic) | one per hadith | the English text and `collection:` |

Other people (scholars, Tabi'in) and other note types are skipped and counted in one warning. Sources come
from Sunnah.com and Quran.com links in the note, and `source_url:`; Wikipedia and other sites are left out.

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
premium: true                 # premium-only branch
import: false                 # leave this note out
sources:
  - "Quran 9:40 https://quran.com/9/40"
---
```

Wikilinks, highlights, tags, `%%comments%%`, embeds and bare URLs are cleaned out of the lesson text.

`scripts/obsidian-import/sample-vault` has two example notes; `npm run test:notes` runs the importer's tests.
