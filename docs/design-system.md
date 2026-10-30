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
  is done). Topic pictures (`src/ui/PathScenery.tsx`) stand beside the path about every third row:
  a book stand for Quran, a tent and well for Sahabah, ink and paper for Hadith, a date palm for
  Women, plus sheep, an oasis, a basket of dates, rocks and bushes, with grass tufts and pebbles on the
  empty rows. Only plain, undisputed things: no crescents, stars, lanterns or rings. Everything beside
  the path can be tapped: the camel leaps with a silly grunt and a puff of dust, the well drops its
  bucket with a splash, the rest hop with a boing. Plants
  sway only in the units next to the current one, everything runs on the native driver, and all of
  it stands still when the phone asks for reduced motion. Each unit has its own sky
  (`src/ui/PathWeather.tsx`): sunny, breezy, cloudy, a little rain or a sunset, taking turns down
  the path, with clouds drifting, the sun's rays turning, gusts and raindrops. Only the current
  unit's sky moves, and birds fly across the clear skies. No moon or stars. Only units within a screen's
  height of the screen draw their sky, pictures and circle icons; the rest keep plain circles of the
  same size, so long topics (Quran, Sahabah: 22 units each) scroll smoothly on cheap phones. Circles have
  a darker lower half, a light rim, a shine and a soft ground shadow; the circle to play next glows
  with a slow pulse. Tapping a node opens a small card under it with the lesson name, its Arabic word and
  a START button.
- **Lesson**: close button, progress bar, hearts. Steps: one learn card (Arabic word, one
  short line from the mascot, optional source chip), an optional ordering game (prayer only),
  then the questions. Answers are big tiles. CHECK slides up a feedback sheet: "Great job!" or
  "Correct answer: …" with a hidden "Why?" line. Every wrong answer costs a heart, a missed question
  asked again too (except in a new learner's first 3 lessons, `WARM_UP_LESSONS`, which cost none). A missed question comes back at the end of the lesson with a "Try again!" label and its
  tiles in a new order, again each time it is missed, until it is answered right; the lesson is done only
  when every question has been right once, and the progress bar fills one step per question answered
  right. At 0 hearts the out-of-hearts sheet opens (one free refill, then "Full hearts again tomorrow!"
  with a gold FREE HEART video button first when the build has ads, and the lesson goes on with that heart),
  so a learner who keeps tapping wrong stops there. Stars count the questions missed on their first try.
  A test-out (JUMP HERE) asks each question once, costs no hearts and ends as soon as it cannot be
  passed. Practice sessions keep their own rules.
  A lesson question that fits its screen sits in the middle of the room above CHECK, from the first frame it
  shows (never at the top first), and keeps that place
  when CHECK is tapped, its Why line opens or tiles fold; it scrolls only when the sheet would cover the
  green tile, and only as far as that needs. A question taller than its room (a long "Try again!" question
  on a small phone, a long Urdu or Arabic one) takes the steps of its fit (`FIT_STEPS` in
  `src/ui/lesson/sheetFit.ts`), one at a time and only as far as it needs to show every answer whole: tight
  tiles (less padding, never under 44 px), then the smaller text of long answers (15 px, Arabic script at the
  20 px of a long Arabic answer), then a 2 px smaller prompt across the full width (no mascot), then smaller
  gaps. Each step is drawn and measured before the frame is painted, so the question shows from its first
  frame with the look it keeps; it keeps it through CHECK and the sheet, and the next try is measured
  again. A question too tall even at the last step keeps its usual look and shows the arrow from its first
  frame; it sits moved down just so far that the room's edge (the arrow's room taken) falls between two
  tiles, so every tile in sight is whole and the next one starts below the edge. A tap on the arrow scrolls it a
  page down to the next place where every part in sight is whole (the room's top edge just above a part, its
  bottom edge between two); at the end the arrow turns to point up, and a tap goes back to the top. The arrow's
  room stays in the bar all through the try, at the end too and through the sheet (which covers the bar), so the
  room above it keeps its height. Practice uses the same steps, its sorting and matching games too, and measures
  each question before its first frame; the screen stays up from question to question, so the last question's
  arrow, scroll and look are reset before the next one is drawn. At CHECK its answers are read again before that
  frame is drawn (a typed answer turns into tiles), so nothing is placed from the answers as they were before.
  Tiles slide up into their places as a question first shows, never from under the room's bottom edge: a tile
  resting near the edge starts closer to its place, and one out of sight under it only fades in.
  The sheet never covers the prompt or the green tile, its Why line open, while anything can make room. The
  question gives its room first: on a short phone the grey tiles fold away and the mascot hides (until the
  next question), so the sheet can stay full size. Only when that is not enough does the sheet go slim (less
  padding, a smaller button), and only then does the Why text alone scroll, from its top, in whole lines,
  with the arrow in the gap above the button (it turns to point up at the end, so the gap is never empty),
  and only where that makes the sheet shorter than slim with the whole text (two lines whole take less room
  than one line over the arrow's room) or the whole text would not fit the sheet's share of the screen.
  The heading, the "Correct answer" line and the Why pill always show whole. When even the sheet at its
  least (slim, its Why text one line) would reach into the green tile's text (a long translated prompt,
  which never scrolls away, over a long answer the sheet says again) the picked tile folds away too,
  when it sits above the green one (in a pick-all-that-fit question, the wrong picks above the first right
  answer) and that keeps the sheet's edge under the green tile's text: the sheet
  still says it was wrong. While the sheet at its least reaches no further into the green tile than under
  its text, the picked tile stays, and the Why text scrolls instead. Once folded it stays so while the sheet
  is up, also when the Why line opens and the sheet grows, so the green tile never moves back down under the
  sheet. A
  tile the sheet's top edge would cut is gone at once while the sheet is up, in the very frame the sheet
  starts to cover it, and fades back with the next try; tiles wholly under the sheet stay. The green tile
  and the picked one above it stay while the sheet's edge reaches no further into them than under their text
  (their lip, border and padding); only when nothing gives the sheet its room and its edge would cross the
  green tile's text (or the row of True and False) is that tile gone too, so the edge never cuts a line of it,
  and the sheet's "Correct answer" line names it. When the learner opens the Why line and the sheet grows,
  the question moves in that same frame, not after it; it glides as the sheet comes up or shrinks. The sheet's
  height is read before its first frame is drawn, so the question starts to move in the frame the sheet opens.
  As the sheet opens its parts are read too, and the question hears its full and least heights from them
  in the same pass: CHECK draws the question twice before the sheet's first frame, as it did before these
  fit rules (three times where a hiding mascot lets the prompt wrap anew), so the sheet comes up about as
  soon. Nothing is set again that has not changed, and a tile or the prompt is drawn again only when what
  it shows changes. That holds in practice too (Level check, Daily, Review, My lessons, every game). There
  a question answered with tiles, a matching game and a sorting game with every step placed keep their
  parts as they are at CHECK, so the render CHECK draws already places them from what was read before it:
  CHECK draws them once where the sheet's heights are the same as for the question before (a right answer,
  most often), and twice where they are new, as before these fit rules. Only a typed answer turning into
  tiles, or the steps left to place going away, waits for the read. The later draws change only where the
  question sits, which parts fade under the sheet's edge and the sheet's room. Each answer tile, sorting
  slot and matching row, the prompt, the topic label, the bar with CHECK and the sheet's title, answer,
  list of steps and button keep the same taps and layout reports from render to render (a tap does what
  the latest render says), so none of them is drawn again for it; a tile that fades under the sheet's edge
  draws only its fade.
  Where the picked tile may still fold, it waits for the sheet's least height too (also read before that frame),
  so it never starts towards a place it then leaves, nor hides the chips for a scroll it never makes.
  It springs up but never past its place, so on its way up its edge never crosses what it keeps clear.
  While the sheet comes up, a tile that folds away (in practice too, and the lines a prompt gives up as the
  mascot hides) leaves its room, which closes with the sheet's own spring and in step with it (room that opens
  a frame or two after the sheet set off closes as the rest of the sheet's way goes, and is shut in the very
  frame the sheet reaches its place): the green tile never moves in one frame, it glides up as the sheet
  rises, never behind its edge, and the prompt above it stays put. A question the learner left scrolled
  down (by hand or with the arrow) scrolls up with what folds above the green tile instead, in that
  frame, so the green tile stays where it showed, and it goes no further back: it does not slide the green tile
  down to show the prompt the learner scrolled away. It moves on only where the sheet needs it to (the
  green tile then goes up, as far as that needs), or where the room's top edge would then cross a line
  of the prompt or of a tile above the green one: to the nearer place either way where that edge falls
  between two parts (`keptScrollY` in `sheetFit.ts`). Practice keeps its right answer the same way.
  The tiles the sheet's edge would cut are found where the question sits (kept, and once the Why line is open
  no less far than it was sent), not where the sheet alone would put it: the picked tile, a grey one under
  the green tile or a right answer the learner missed stays whenever it sits wholly above the sheet there.
  A tile whose text did not show whole in the room as CHECK was tapped (the green tile of a question
  too tall for its room, resting out of sight under the room's edge or over its top) is gone while it
  glides into sight with the question and fades in once it shows whole (or, where the question comes to rest
  with it still cut, once it has), so the room's edge never cuts its lines on the way; the sheet's "Correct
  answer" line names it meanwhile. Once the Why line is open the sheet has grown at once, so what folds then
  goes at once and the question goes on at once, in that frame; it never goes back to a place less far than it
  was sent, so the prompt, moved up at CHECK, never moves back down (the green tile, risen with a fold, then
  sits a little higher above the sheet). The Why text fades in where it stays, with no slide, so its box never
  cuts a line of it.
  It only ever goes where it ends: it waits while a hiding mascot lets the prompt wrap anew (on the web the new
  prompt is read before that frame is drawn, so the wait ends in it), and its content never gets shorter under
  it on the way, so it never jumps or turns back. The sheet is never taller than its room, not even in the
  frame its Why line opens. The small chips above the prompt
  (REVIEW, "Try again!", practice's topic label) are gone while the question sits scrolled past their top
  (by a hand or the arrow before CHECK too), and already from the frame its own scroll (CHECK, Why) starts
  towards a place past them, so no frame
  shows them cut; they are back, whole and in place, when it is scrolled up to them. In the ordering game the prompt stays on screen above the sheet, placed tiles the sheet would
  cut fold away before its edge reaches them as it rises (and only ever more while it is up) until TRY AGAIN;
  the steps that come back under it then, and the tiles to place again, show once it has gone and fade in. The "Correct order" list shows whole rows only: it starts at the top,
  scrolls by whole rows, and its arrow points down while rows are hidden and up at the end. The rows the
  learner had in another place get a white band and a red ✕ in that list, and the list opens where they
  show, so the mistake is in sight even when its red tiles fold away. Practice (Level check, Daily, Review) uses the same rule and code (`src/ui/lesson/sheetFit.ts`);
  in its sorting and matching games a row the list sheet's top edge would cut is gone while the sheet is up.
  Right to left (Urdu, Arabic) the screens mirror: the "more below" arrow sits in the middle of its gap the
  same in both directions, and a row tile's text starts where its line starts (on the right), Latin words and
  numbers in it too; True and False keep their centred text. Scores ("2/6", "10/40") read left to right in
  every language.
- **Lesson complete**: confetti, cheering mascot, three counting stat cards, CONTINUE.

## Copy bank

Praise (random): Great job!, Nice!, Excellent!, Amazing!, You got it!, MashaAllah!
Wrong title: Correct answer:
Retry label: Try again
Buttons: START, CONTINUE, CHECK, GOT IT, KEEP LEARNING, END LESSON
