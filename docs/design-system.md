# Sira Path design system (v2)

Who it is for: learners aged 6 to 30 and new Muslims. A 7-year-old must be able to play a
lesson without reading more than a few words, and an adult must not feel talked down to.

Feel: a bright mobile game, like Duolingo, with its own identity. The path winds through a
green oasis. Each topic is a "world" with its own color. Arabic sits next to the English for
key words so learners pick it up as they go.

## Rules that apply everywhere

1. **Few words.** No eyebrow labels, no subtitles that explain the screen. One short line at most
   under a title. Buttons are one or two words. Feedback is a praise word, not a paragraph.
2. **Every tap makes a sound** and, on phones, a light haptic. Use `GameButton`, `ChoiceTile`,
   `Tappable` from `src/ui`; they play the sound for you. Never use a bare `Pressable`. The one
   exception is the path's `PathNode`: like `GameButton` it is a 3D button built on `Pressable`
   (it sinks into its lip) and plays the kit feedback itself.
3. **Everything moves a little.** Buttons press down (3D lip), tiles pop when picked, sheets
   spring up, numbers count up, the current path node bounces, the mascot bobs.
4. **Nothing overflows.** Text wraps inside its container (`flexShrink: 1`), rows wrap, tiles are
   full width or a fixed share of the row. Test at 320, 390 and 430 px wide.
5. **Phone layout on every platform.** On web the app is a centered phone column (max 520 px)
   with a tinted backdrop, never a stretched website.
6. **Arabic is real text**, shown with the Arabic face, right-to-left, a size larger than the
   English around it. Only show Arabic we are sure of (see `src/data/arabicTerms.ts`).

## Tokens (`src/ui/theme.ts`)

| Token | Value | Use |
|---|---|---|
| `green` / `greenLip` | `#21B573` / `#178A56` | primary buttons, correct, current node |
| `gold` / `goldLip` | `#FFC21A` / `#E09B00` | XP, stars, finished nodes, chests |
| `flame` | `#FF8A1F` | streak |
| `gem` / `gemLip` | `#2FA8FF` / `#1683D1` | gems, selected answer |
| `heart` / `heartLip` | `#FF4D5E` / `#D3374A` | hearts, wrong |
| `ink` | `#1F2D27` | main text |
| `inkSoft` | `#6A7A73` | secondary text |
| `line` / `lineLip` | `#E3EAE6` / `#CCD6D1` | tile borders and their lip |
| `snow` | `#FFFFFF` | screen background |
| `mist` | `#F3F8F5` | backdrop, inactive surfaces |
| `locked` / `lockedLip` | `#E4E9E6` / `#C7D0CB` | locked nodes, disabled buttons |
| `correctBg` / `correctInk` | `#DDF7E8` / `#13804C` | correct sheet |
| `wrongBg` / `wrongInk` | `#FFE3E5` / `#D3374A` | wrong sheet |

Topic worlds use `section.accentColor` from the course data, with `lip = darken(accent)`.

Type: **Baloo Bhaijaan 2** (rounded, has Arabic and Latin) for titles, numbers, buttons and all
Arabic. **Nunito** for body text. Scale: 34 / 26 / 20 / 17 / 15 / 13. Buttons are uppercase
Baloo 17 with 0.6 letter spacing.

Shape: buttons radius 16 with a 4 px lip; tiles radius 18 with a 2 px border and 4 px lip;
path nodes are 72 px circles with a 7 px lip; sheets radius 24 on top.

## App structure

- **Top bar** (outside lessons): topic world button (emblem in topic color, opens the topic
  picker), streak, gems, hearts. Icons plus numbers only.
- **Bottom tabs**: Learn, Practice, Crew, Shop, Me.
- **Learn** is the path itself: a unit banner per branch, then zig-zag nodes, chests and the
  mascot. Tapping a node opens a small card under it with the lesson name, its Arabic word and
  a START button.
- **Lesson**: close button, progress bar, hearts. Steps: one learn card (Arabic word, one
  short line from the mascot, optional source chip), an optional ordering game (prayer only),
  then the questions. Answers are big tiles. CHECK slides up a feedback sheet: "Great job!" or
  "Correct answer: …" with a hidden "Why?" line. A wrong answer is retried once.
- **Lesson complete**: confetti, cheering mascot, three counting stat cards, CONTINUE.

## Copy bank

Praise (random): Great job!, Nice!, Excellent!, Amazing!, You got it!, MashaAllah!
Wrong title: Correct answer:
Retry label: Try again
Buttons: START, CONTINUE, CHECK, GOT IT, KEEP LEARNING, END LESSON
