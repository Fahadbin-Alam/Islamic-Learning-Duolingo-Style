# Instagram (@muslimo.learningapp)

The plan, bio, rules and captions live in the Claude Doc "Muslimo Instagram plan":
https://claude.ai/artifact/SV4USSJf1a4Vupgf1yZC25

- `posts/`: feed images, 1080x1350. `01-intro-*` is one carousel (post it once the Play listing is public),
  `02-*` and `03-*` are two-slide quiz carousels, `04-hadith-smile` is a single image.
- `reels/`: 1080x1920 MP4s, about 17 seconds, silent. They are git-ignored because of their size, so they
  live only in the Desktop copy; run `scripts/reels.mjs` to make them again.
- `scripts/`: how the images and reels were made. Run them from a folder that has `playwright` and
  `mp4-muxer` installed (`npm i playwright mp4-muxer`). They use the installed Google Chrome
  (`channel: "chrome"`), the app's fonts from `node_modules/@expo-google-fonts`, the camel art in
  `store/graphics/source/cover/` and the store screenshots in `store/graphics/google-play/phone/`.
  `node slides.mjs <out dir>` writes the posts; `node reels.mjs` writes to `./out/` and `./frames/`.

Every hadith on a post uses the app's own checked wording and shows its reference: Sahih al-Bukhari 6114,
3757 (summary) and 28, and Sahih Muslim 2626.
