# Source highlights

`src/data/sourceHighlights.json` holds, for Quran.com Tafsir Ibn Kathir pages and Sunnah.com hadith pages, the
page's own words that say a lesson's fact, so the source opens scrolled to them, highlighted.

How it was made (`match.py`):
1. Dump every source without a highlight, with its summary and its lesson's text, to `/tmp/claude-0/t/sources.json`.
2. Texts come from raw.githubusercontent.com (quran.com and sunnah.com are not reachable from the cloud):
   - Tafsir Ibn Kathir English: `spa5k/tafsir_api/main/tafsir/en-tafisr-ibn-kathir/<surah>.json` (the same
     abridged text quran.com shows)
   - Hadith English: `fawazahmed0/hadith-api/1/editions/eng-<book>.json`; a Sahih Muslim letter number (2404d) is
     `arabicnumber` 2404.04.
3. For each source, the run of plain words (7 to 40 words, no quotes, brackets or Arabic) that shares the most words
   with its summary and lesson wins, if it shares enough; its first words must not occur earlier on the page.
4. Keys are `<url>#<FNV-1a of the summary>` (summaryKey in sourceHighlights.ts).

Sources it found no good line for keep opening at the top of their page.
