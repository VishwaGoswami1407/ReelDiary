# ReelDiary

A personal screen diary built with Jekyll, vanilla JavaScript, and CSS. Includes 37 identified titles from your lists, ten preserved sample films, six pages, individual detail pages, live search and filters, Chart.js statistics, and a persistent light/dark theme.

## Folder structure

```text
ReelDiary/
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- .gitignore
|-- Gemfile
|-- Gemfile.lock
|-- _config.yml
|-- _examples/
|   `-- movies/
|       |-- dune-part-two.md
|       |-- everything-everywhere-all-at-once.md
|       |-- inception.md
|       |-- interstellar.md
|       |-- oppenheimer.md
|       |-- parasite.md
|       |-- the-batman.md
|       |-- the-dark-knight.md
|       |-- the-matrix.md
|       `-- whiplash.md
|-- _includes/
|   |-- footer.html
|   |-- header.html
|   |-- movie-card.html
|   `-- scene-thoughts.html
|-- _layouts/
|   |-- default.html
|   `-- movie.html
|-- _movies/
|   |-- anjaana-anjaani.md
|   |-- boys-over-flowers.md
|   |-- business-proposal.md
|   |-- crash-landing-on-you.md
|   |-- dear-zindagi.md
|   |-- descendants-of-the-sun.md
|   |-- dil-chahta-hai.md
|   |-- extraordinary-you.md
|   |-- goblin.md
|   |-- highway.md
|   |-- jab-we-met.md
|   |-- karwaan.md
|   |-- lighter-and-princess.md
|   |-- love-o2o.md
|   |-- lucifer.md
|   |-- maxton-hall.md
|   |-- mismatched.md
|   |-- money-heist.md
|   |-- mujhse-dosti-karoge.md
|   |-- mujhse-shaadi-karogi.md
|   |-- my-fault.md
|   |-- pinocchio.md
|   |-- queen-of-tears.md
|   |-- queen.md
|   |-- squid-game.md
|   |-- start-up.md
|   |-- tamasha.md
|   |-- the-founder.md
|   |-- the-kissing-booth.md
|   |-- the-pursuit-of-happyness.md
|   |-- the-summer-i-turned-pretty.md
|   |-- thor-love-and-thunder.md
|   |-- vivah.md
|   |-- wake-up-sid.md
|   |-- when-life-gives-you-tangerines.md
|   |-- yeh-jawaani-hai-deewani.md
|   `-- zindagi-na-milegi-dobara.md
|-- assets/
|   |-- css/
|   |   |-- cards.css
|   |   |-- scene-thoughts.css
|   |   `-- style.css
|   |-- favicon.svg
|   |-- js/
|   |   |-- main.js
|   |   |-- scene-core.mjs
|   |   |-- scene-store.js
|   |   |-- scene-thoughts.js
|   |   `-- stats.js
|   `-- poster-fallback.svg
|-- about/
|   `-- index.html
|-- movies/
|   `-- index.html
|-- stats/
|   `-- index.html
|-- watched/
|   `-- index.html
|-- watching/
|   `-- index.html
|-- supabase/
|   |-- README.md
|   `-- schema.sql
|-- tests/
|   `-- scene-core.test.mjs
|-- index.html
|-- 404.html
|-- README.md
|-- PENDING_TITLES.md
`-- SOURCE.md
```

## Run locally from scratch

Install Ruby 3.2 or newer and Bundler. On Windows, use RubyInstaller with Devkit and complete its MSYS2 setup. Then open a terminal in this directory:

```powershell
gem install bundler
bundle install
bundle exec jekyll serve
```

Open **http://localhost:4000/ReelDiary/**. Jekyll watches files and rebuilds changes. Restart the server after editing `_config.yml`. Stop the server with Ctrl+C.

For a production build:

```powershell
bundle exec jekyll build
```

The generated site is in `_site/`. Do not edit that directory directly.

## Add a movie

Create a Markdown file in `_movies/`, for example `_movies/arrival.md`:

```yaml
---
title: Arrival
year: 2016
poster: "https://example.com/arrival-poster.jpg"
genre: Sci-Fi
rating: 9
status: watched
date_watched: 2026-10-03
language: English
format: Movie
cinema: Hollywood
summary: "A linguist works to understand the language of visitors from another world."
review: "Quiet, beautiful, and unexpectedly moving. A story I kept thinking about for days."
---
```

Replace the example poster URL with a working HTTPS image URL. Keep `genre` as one text value and `rating` as a number from 1 through 10, or leave it blank until you have rated the title. Use exactly `watched`, `watching`, or `watchlist` for status. Leave `date_watched:` blank for unfinished titles. Optional Markdown beneath the front matter appears after the short review on the detail page.

Use `format: Movie`, `format: Web Series`, or `format: Short Film`. Set `cinema` to `Hollywood`, `Bollywood`, `Korean`, `Gujarati`, or another category you prefer. Set `language` independently (for example, `English`, `Hindi`, `Korean`, or `Gujarati`). All titles stay in `_movies/` for a single searchable collection. Missing format defaults to Movie; missing cinema defaults to Other. Format and cinema filters are ready for your entries even if a category has no samples yet.

The title automatically appears in the archive, relevant status page, filters, counters, and charts after rebuilding. Your collection currently contains 36 watched titles and Lighter & Princess as currently watching. Supplied personal thoughts are preserved in `review`; missing ratings, thoughts, and watch dates are blank. `summary` contains an objective story synopsis and is displayed separately from your thoughts. The original ten demo films and illustrative reviews are preserved in `_examples/movies/`, which is excluded from the published site. Copy any example into `_movies/` if you want to reuse it. Ambiguous titles awaiting your clarification are saved in `PENDING_TITLES.md`.

## How it works

- Search matches titles without regard to case; all selected filters apply together.
- Format, cinema, and language can be combined with genre, year, rating, and status filters.
- Rating filters show the selected score and higher. Newest/oldest sort by release year.
- Favorite genre is the most common genre among watched films; its counter shows the number of watched films in that genre. Ties sort alphabetically.
- Charts count all entries, including watchlist entries. The year chart uses release year; the rating chart only counts rated entries. The watched preview uses release year because personal watch dates have not been supplied.
- Cards link to permanent film detail pages that work without JavaScript.
- Theme preference is saved as `reeldiary-theme` in localStorage. Reduced motion settings disable decorative animation and tilt.
- Series metadata and posters are sourced from [TVmaze](https://www.tvmaze.com/); film metadata and posters are referenced through Wikipedia. Each entry has a source link. Demo film posters use TMDB's image CDN. An included SVG is used when a poster fails. Fonts load from Google Fonts and Chart.js loads from jsDelivr. Those resources need an internet connection; the core Jekyll site is static.
- Cards animate from alternating sides on scroll and use a slight pointer tilt. Each diary card has a synopsis, personal thoughts, and rating or an explicit unrated label.

## Scene Thoughts

Every title page includes a scene discussion with Beginning, Interval, Climax, Ending, and custom timestamps. Visitors choose a mood, write up to 1000 characters, mark spoilers, and toggle emoji reactions. Selecting a scene ranks matching thoughts first; total reactions and then newest timestamp break ties. Other scenes follow below. Spoilers are hidden until revealed, and the reader's Hide spoilers toggle can hide them again.

The default is an explicitly labeled **local preview**: thoughts persist only in that browser, separately for each title. To share thoughts and reactions across visitors, follow [supabase/README.md](supabase/README.md), run the supplied SQL, and add your project's public connection settings to `_config.yml`. The adapter uses plain HTTP requests and anonymous visitor accounts. No private server key belongs in this project. Shared mode has not been connected to a live project in this workspace.

Run the meaningful logic checks with `node --test tests/scene-core.test.mjs` (Node.js is only needed for tests, not for the Jekyll site). They verify ranking priority, timestamp boundaries, and input validation. SQL permissions and actual multi-browser shared writes should be checked against your configured Supabase project using the setup guide.

## Customize

Edit `title`, `description`, `author`, `url`, and `baseurl` in `_config.yml`. Edit the About page to introduce yourself. Theme colors and responsive styles are in `assets/css/style.css`, diary cards in `assets/css/cards.css`, and Scene Thoughts in `assets/css/scene-thoughts.css`. Interactions are in `assets/js/main.js`, charts in `assets/js/stats.js`, and scene discussions in the `scene-*` JavaScript modules.

The three primary colors are midnight black `#101014`, oxblood red `#942C3B`, and warm gold `#D8B777`, with neutral text and lighter tints for readability. The film-club references informed the scroll movement; the reel hero, journal layout, color system, and card composition are original to this project.

The `jekyll-seo-tag` and `jekyll-sitemap` plugins generate metadata and `/sitemap.xml`. Set your real URL before publishing so canonical URLs and sitemap links point to your site.

If Windows reports `cannot load such file -- tzinfo`, run `bundle install` again before starting Jekyll. The Gemfile includes both `tzinfo` and the Windows `tzinfo-data` package. The optional `wdm` notice is harmless; file watching uses polling without it.

## Deploy to GitHub Pages

1. Push this project to a GitHub repository. The workflow expects the `main` branch; change `.github/workflows/pages.yml` if your default branch differs.
2. Set `url: "https://YOUR-USERNAME.github.io"` and `baseurl: "/YOUR-REPOSITORY"` in `_config.yml`. For a repository named `YOUR-USERNAME.github.io`, use `baseurl: ""`.
3. Open the repository's **Settings → Pages** and choose **GitHub Actions** as the source.
4. Push the configuration change to `main`. The included workflow installs gems, builds Jekyll, and deploys `_site` using the official Pages actions.
5. Open the URL shown by the completed deployment. Future pushes deploy automatically.

Commit `Gemfile.lock` for reproducible builds. The site uses Jekyll 4 with an Actions build, so it does not depend on GitHub's legacy branch-based Jekyll build environment. No Node.js build step or backend is required.

## Full source

`SOURCE.md` contains the folder structure followed by every authored code file and the local run commands. Files in the actual folders remain the source of truth when making changes.
