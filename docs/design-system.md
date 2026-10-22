# Muslimo design system (v2)

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
   (it sinks into its lip) and plays the kit feedback itself. A tap that cannot do anything still
   sounds: a shop row that cannot be bought buzzes like its locked button, and a hearts row with full
   hearts plays a soft tap and says hearts are full. A shop row and its BUY button are two separate
   buttons side by side (never one inside the other): BUY buys, and a tap anywhere else on the card,
   its edge too, answers as the row.
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
  picker), streak, gems, hearts. Icons plus numbers only. Streak and gems read the same in the top bar, the Shop
  card and Me: "1,000", "12,345", then "123k" (screen readers hear the full number); every count-up writes
  its comma too.
- **Bottom tabs**: Learn, Practice, Crew, Shop, Me.
- **Learn** is the path itself: a unit banner per branch, then zig-zag nodes, chests and the
  mascot. A small camel (`src/ui/Camel.tsx`, saddle cloth in the unit color) walks back and forth
  beside the circle after the one to play next, and stands by the trophy (a victory lap once the topic
  is done). Topic pictures (`src/ui/PathScenery.tsx`) stand beside the path about every fourth row:
  a book stand for Quran, a tent and well for Sahabah, ink and paper for Hadith, a date palm for
  Women, and so on. Only plain, undisputed things: no crescents, stars, lanterns or rings. Plants
  sway only in the units next to the current one, everything runs on the native driver, and all of
  it stands still when the phone asks for reduced motion. Each unit has its own sky
  (`src/ui/PathWeather.tsx`): sunny, breezy, cloudy, a little rain or a sunset, taking turns down
  the path, with clouds drifting, the sun's rays turning, gusts and raindrops. Only the current
  unit's sky moves. No moon or stars. Tapping a node opens a small card under it with the lesson name, its Arabic word and
  a START button.
- **Lesson**: close button, progress bar, hearts. Steps: one learn card (Arabic word, one
  short line from the mascot, optional source chip), an optional ordering game (prayer only),
  then the questions. Answers are big tiles. CHECK slides up a feedback sheet: "Great job!" or
  "Correct answer: …" with a hidden "Why?" line. Every wrong answer costs a heart, a missed question
  asked again too. A missed question comes back at the end of the lesson with a "Try again!" label and its
  tiles in a new order, again each time it is missed, until it is answered right; the lesson is done only
  when every question has been right once, and the progress bar fills one step per question answered
  right. At 0 hearts the out-of-hearts sheet opens (one free refill, then "Full hearts again tomorrow!"),
  so a learner who keeps tapping wrong stops there. Stars count the questions missed on their first try.
  A test-out (JUMP HERE) asks each question once, costs no hearts and ends as soon as it cannot be
  passed. Practice sessions keep their own rules.
  A lesson question that fits its screen sits in the middle of the room above CHECK, from the first frame it
  shows (never at the top first), and keeps that place
  when CHECK is tapped, its Why line opens or tiles fold; it scrolls only when the sheet would cover the
  green tile, and only as far as that needs. A question taller than its room (a long "Try again!" question
  on a small phone) draws its tiles tight, with less padding in each, from the first frame it shows, so
  every answer is in sight and whole, never one cut by the room's bottom edge; it keeps them so through
  the sheet, and the next try is measured again. Only a question too tall even then scrolls as before, and its
  last tile can then show cut at the room's edge; no question in the course is that tall at 320 px.
  The sheet never covers the prompt or the green tile, its Why line open. The question gives its room
  first: on a short phone the grey tiles fold away and the mascot hides (until the next question), so the
  sheet can stay full size. Only when that is not enough does the sheet go slim (less padding, a smaller
  button), and only then does the Why text alone scroll, from its top, in whole lines, with the arrow in the
  gap above the button (it turns to point up at the end, so the gap is never empty). The heading, the
  "Correct answer" line and the Why pill always show whole. A tile the sheet's top edge would cut is gone
  at once while the sheet is up, in the very frame the sheet starts to cover it (never the green tile, nor
  the picked tile when it sits whole above the sheet), and fades back with the next try; tiles wholly under
  the sheet stay. When the learner opens the Why line and the sheet grows, the question moves in that same
  frame, not after it; it glides as the sheet comes up or shrinks. It only ever goes where it ends: it waits
  while a hiding mascot lets the prompt wrap anew, and its content never gets shorter under it on the way, so
  it never jumps or turns back. The sheet is never taller than its room, not even in the frame its Why line
  opens. The small chips above the prompt
  (REVIEW, "Try again!", practice's topic label) are gone while the question sits scrolled past their top,
  and already from the frame its own scroll (CHECK, Why) starts towards a place past them, so no frame
  shows them cut; they are back, whole and in place, when it is scrolled up to them. In the ordering game the prompt stays on screen above the sheet, placed tiles the sheet would
  cut fold away before its edge reaches them as it rises (and only ever more while it is up) until TRY AGAIN, and the "Correct order" list shows whole rows only: it starts at the top,
  scrolls by whole rows, and its arrow points down while rows are hidden and up at the end. The rows the
  learner had in another place get a white band and a red ✕ in that list, and the list opens where they
  show, so the mistake is in sight even when its red tiles fold away. Practice (Level check, Daily, Review) uses the same rule and code (`src/ui/lesson/sheetFit.ts`).
- **Lesson complete**: confetti, cheering mascot, three counting stat cards, CONTINUE.

## Copy bank

Praise (random): Great job!, Nice!, Excellent!, Amazing!, You got it!, MashaAllah!
Wrong title: Correct answer:
Retry label: Try again
Buttons: START, CONTINUE, CHECK, GOT IT, KEEP LEARNING, END LESSON
