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

## Shamela (the old Arabic books)

Siyar A'lam an-Nubala, Al-Isabah, Tabaqat Ibn Sa'd and Al-Ijma' are cited by printed volume/page. Each source
opens on its own Shamela page (`src/data/shamelaPages.json`, `book:volume/page` → Shamela page id, used by
`shamelaUrl` in `src/data/shamelaPages.ts`) with the Arabic line that says the fact highlighted
(`sourceHighlights.json`, keyed the same way as the English ones).

- The lines were picked by hand from the OpenITI copies of the same Shamela editions
  (raw.githubusercontent.com/OpenITI, files ending `Shamela0010906`, `Shamela0009767`, `Shamela0001686`,
  `Shamela0012445`), where `PageVxxPyyy` closes each printed page. Every start and end term was checked to be
  on that page, in order, and a sample was checked on shamela.ws itself.
- Text fragments ignore Arabic vowel marks, so a plain line matches Shamela's vowelled text.
- Page ids: Siyar (10906) = 0-based OpenITI page index + 167; Al-Isabah (9767) = 0-based index. Tabaqat (1686)
  and Al-Ijma' (12445) have no fixed offset, so their ids were read off shamela.ws one by one (Tabaqat 3/54 has
  no page of its own and shares id 735 with 3/51).
- A page not in the map falls back to the book's front page, so add new pages to the map with the line.
- `src/ui/lesson/LookFor.tsx` can show the line under a source chip ("On the page, look for"), with the English
  summary for an Arabic line. The simple lesson pages (#474) leave it out, so the line shows on the page itself.

## The last Sunnah.com sources (picked by hand)

The 240 Sunnah.com sources `match.py` left without a line were picked one by one from the same hadith-api texts, and
each line was checked to be on its page word for word (the books with no text there, such as Riyad as-Salihin, Hisn
al-Muslim and al-Adab al-Mufrad, still open at the top). A line may start after a narrator's colon (Sunnah.com shows
the narrator in a block of its own); a two-part line, `A … B`, lights A through B, so it can step over a quote, a
bracket or an apostrophe.

Sahih Muslim pages show one narration each:

- `sunnah.com/muslim:2564` shows only 2564a. A line from 2564b or 2564c is not on it, so a source citing that
  narration links `muslim:2564c` (`hadith("muslim", "2564c", …)`).
- The letters are the hadith-api ones: `arabicnumber` 2564.03 is 2564c, and the in-book references match too.
- Sunnah.com gives some one-line notes ("A hadith like this has been narrated…") a number of their own: muslim:1469
  and muslim:2653a are such notes, so the famous texts are muslim:1468b and muslim:2653b.

The browser lights the first place a link's words appear. A line of up to nine words is matched whole, a longer one
by its first four and last four words, so those words should not appear earlier on the page. In bukhari:1238,
"Anyone who dies worshipping others along with Allah will definitely enter the Fire" comes first, so the Paradise line
starts "who dies worshipping none", not "Anyone who dies worshipping". A cut word matches nothing ("should m" lights
no line at all), so a line always ends on a whole word.
