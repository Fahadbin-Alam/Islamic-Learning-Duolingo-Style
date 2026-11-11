# Fahadbin-Alam.github.io

The files for the GitHub user site `https://fahadbin-alam.github.io`. They live in the Muslimo repo under
`user-site/` and are copied into the `Fahadbin-Alam.github.io` repository, which GitHub publishes from its
`main` branch.

Why it exists: the Muslimo repo used to be called `Islamic-Learning-Duolingo-Style`, and GitHub Pages does not
redirect a project site after a rename. Store listings, Play's Data safety form and every app build made before
the rename still open `https://fahadbin-alam.github.io/Islamic-Learning-Duolingo-Style/...`, so this site keeps
those links alive:

- `Islamic-Learning-Duolingo-Style/*.html` send the reader on to the same page under `/Muslimo/`.
- `Islamic-Learning-Duolingo-Style/app-version.json` is a real copy, not a redirect, because old builds fetch it
  for the "update available" banner. Every app that reads this old address is a pre-rename build, so once the
  first post-rename builds are live in both stores, set this copy to those build numbers once and leave it.
- `index.html` at the root sends visitors to the Muslimo support page. An AdMob `app-ads.txt` can go here too,
  since AdMob only looks at the root of the domain.
