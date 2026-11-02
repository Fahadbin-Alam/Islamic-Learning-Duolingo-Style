// The app asks questions in more than one way (gap, puzzle, true or false, matching: src/ui/lesson/questionFormats.ts).
// Most app tests were written for answer tiles, so they run with tiles only; tests of the other ways turn it back on.
globalThis.__QUESTION_VARIETY__ = false;
