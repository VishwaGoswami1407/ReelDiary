# ReelDiary: complete source

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

## Code, file by file

### .github/workflows/pages.yml

```yaml
name: Deploy ReelDiary

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true
      - name: Build site
        run: bundle exec jekyll build
        env:
          JEKYLL_ENV: production
      - uses: actions/upload-pages-artifact@v3
        with:
          path: _site
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### .gitignore

```text
_site/
.jekyll-cache/
.sass-cache/
vendor/
.bundle/
```

### Gemfile

```ruby
source "https://rubygems.org"

gem "jekyll", "~> 4.4"
gem "jekyll-seo-tag", "~> 2.8"
gem "jekyll-sitemap", "~> 1.4"
gem "webrick", "~> 1.8"
gem "tzinfo", "~> 2.0"
gem "tzinfo-data", platforms: [:windows]
```

### Gemfile.lock

```text
GEM
  remote: https://rubygems.org/
  specs:
    addressable (2.9.0)
      public_suffix (>= 2.0.2, < 8.0)
    base64 (0.3.0)
    bigdecimal (4.1.3)
    colorator (1.1.0)
    concurrent-ruby (1.3.8)
    csv (3.3.6)
    em-websocket (0.5.3)
      eventmachine (>= 0.12.9)
      http_parser.rb (~> 0)
    eventmachine (1.2.7)
    ffi (1.17.4-x64-mingw-ucrt)
    ffi (1.17.4-x86_64-linux-gnu)
    forwardable-extended (2.6.0)
    google-protobuf (4.36.2-x64-mingw-ucrt)
      bigdecimal
      rake (~> 13.3)
    google-protobuf (4.36.2-x86_64-linux-gnu)
      bigdecimal
      rake (~> 13.3)
    http_parser.rb (0.8.1)
    i18n (1.15.2)
      concurrent-ruby (~> 1.0)
    jekyll (4.4.1)
      addressable (~> 2.4)
      base64 (~> 0.2)
      colorator (~> 1.0)
      csv (~> 3.0)
      em-websocket (~> 0.5)
      i18n (~> 1.0)
      jekyll-sass-converter (>= 2.0, < 4.0)
      jekyll-watch (~> 2.0)
      json (~> 2.6)
      kramdown (~> 2.3, >= 2.3.1)
      kramdown-parser-gfm (~> 1.0)
      liquid (~> 4.0)
      mercenary (~> 0.3, >= 0.3.6)
      pathutil (~> 0.9)
      rouge (>= 3.0, < 5.0)
      safe_yaml (~> 1.0)
      terminal-table (>= 1.8, < 4.0)
      webrick (~> 1.7)
    jekyll-sass-converter (3.1.0)
      sass-embedded (~> 1.75)
    jekyll-seo-tag (2.9.1)
      jekyll (>= 3.8, < 5.0)
    jekyll-sitemap (1.4.0)
      jekyll (>= 3.7, < 5.0)
    jekyll-watch (2.2.1)
      listen (~> 3.0)
    json (2.21.2)
    kramdown (2.5.2)
      rexml (>= 3.4.4)
    kramdown-parser-gfm (1.1.0)
      kramdown (~> 2.0)
    liquid (4.0.4)
    listen (3.10.1)
      logger
      rb-fsevent (~> 0.10, >= 0.10.3)
      rb-inotify (~> 0.9, >= 0.9.10)
    logger (1.7.0)
    mercenary (0.4.0)
    pathutil (0.16.2)
      forwardable-extended (~> 2.6)
    public_suffix (7.0.5)
    rake (13.4.2)
    rb-fsevent (0.11.2)
    rb-inotify (0.11.1)
      ffi (~> 1.0)
    rexml (3.4.4)
    rouge (4.7.0)
    safe_yaml (1.0.5)
    sass-embedded (1.105.1-x64-mingw-ucrt)
      google-protobuf (~> 4.31)
    sass-embedded (1.105.1-x86_64-linux-gnu)
      google-protobuf (~> 4.31)
    terminal-table (3.0.2)
      unicode-display_width (>= 1.1.1, < 3)
    tzinfo (2.0.6)
      concurrent-ruby (~> 1.0)
    tzinfo-data (1.2026.5)
      tzinfo (>= 1.0.0)
    unicode-display_width (2.6.0)
    webrick (1.9.2)

PLATFORMS
  x64-mingw-ucrt
  x86_64-linux

DEPENDENCIES
  jekyll (~> 4.4)
  jekyll-seo-tag (~> 2.8)
  jekyll-sitemap (~> 1.4)
  tzinfo (~> 2.0)
  tzinfo-data
  webrick (~> 1.8)

CHECKSUMS
  addressable (2.9.0) sha256=7fdf6ac3660f7f4e867a0838be3f6cf722ace541dd97767fa42bc6cfa980c7af
  base64 (0.3.0) sha256=27337aeabad6ffae05c265c450490628ef3ebd4b67be58257393227588f5a97b
  bigdecimal (4.1.3) sha256=61ebe1e5e559bdc3cc6f2c0ee7f427321fc838f59611c294356eb04d6e21cf66
  bundler (4.0.15) sha256=a4ceb882fe94a0e0ac63cd0813932bbfd631a14e5ac0b7975189b19a4d28d9e7
  colorator (1.1.0) sha256=e2f85daf57af47d740db2a32191d1bdfb0f6503a0dfbc8327d0c9154d5ddfc38
  concurrent-ruby (1.3.8) sha256=b2f1be836e968ccc78ccfce277ea79c72a88633f22306782c16ff23fb415d1e1
  csv (3.3.6) sha256=aba61e7e507a66f03d45cb1f3c4b6359861c3504038b422962875dce099e4456
  em-websocket (0.5.3) sha256=f56a92bde4e6cb879256d58ee31f124181f68f8887bd14d53d5d9a292758c6a8
  eventmachine (1.2.7) sha256=994016e42aa041477ba9cff45cbe50de2047f25dd418eba003e84f0d16560972
  ffi (1.17.4-x64-mingw-ucrt) sha256=f6ff9618cfccc494138bddade27aa06c74c6c7bc367a1ea1103d80c2fcb9ed35
  ffi (1.17.4-x86_64-linux-gnu) sha256=9d3db14c2eae074b382fa9c083fe95aec6e0a1451da249eab096c34002bc752d
  forwardable-extended (2.6.0) sha256=1bec948c469bbddfadeb3bd90eb8c85f6e627a412a3e852acfd7eaedbac3ec97
  google-protobuf (4.36.2-x64-mingw-ucrt) sha256=02b55d56c1c56a58a5e1cc3a7dda87e97343574ea5aa4f0e503379ba2647bbd1
  google-protobuf (4.36.2-x86_64-linux-gnu) sha256=d25a820873e423f1d209ae8c672a4a28b019e2429debd0901d26670a0b4e14db
  http_parser.rb (0.8.1) sha256=9ae8df145b39aa5398b2f90090d651c67bd8e2ebfe4507c966579f641e11097a
  i18n (1.15.2) sha256=00f9eb62412fe593b2a65a97daa75300d37abb8f7202ec748e94b6d46a9dd1b5
  jekyll (4.4.1) sha256=4c1144d857a5b2b80d45b8cf5138289579a9f8136aadfa6dd684b31fe2bc18c1
  jekyll-sass-converter (3.1.0) sha256=83925d84f1d134410c11d0c6643b0093e82e3a3cf127e90757a85294a3862443
  jekyll-seo-tag (2.9.1) sha256=ed5c757a091048b6ef9109f856f84a29beaeb70f531ba5775a5e92129a28093e
  jekyll-sitemap (1.4.0) sha256=0de08c5debc185ea5a8f980e1025c7cd3f8e0c35c8b6ef592f15c46235cf4218
  jekyll-watch (2.2.1) sha256=bc44ed43f5e0a552836245a54dbff3ea7421ecc2856707e8a1ee203a8387a7e1
  json (2.21.2) sha256=1f1d3b7cf2b3ba1a69beca0bb6db13d5438b80bff3cd54cdaaa620b9b07c1c6a
  kramdown (2.5.2) sha256=1ba542204c66b6f9111ff00dcc26075b95b220b07f2905d8261740c82f7f02fa
  kramdown-parser-gfm (1.1.0) sha256=fb39745516427d2988543bf01fc4cf0ab1149476382393e0e9c48592f6581729
  liquid (4.0.4) sha256=4fcfebb1a045e47918388dbb7a0925e7c3893e58d2bd6c3b3c73ec17a2d8fdb3
  listen (3.10.1) sha256=4c3f32855657f348747da4dd2372ff3790d90a6b1d3e4f21a3706adb2d04783c
  logger (1.7.0) sha256=196edec7cc44b66cfb40f9755ce11b392f21f7967696af15d274dde7edff0203
  mercenary (0.4.0) sha256=b25a1e4a59adca88665e08e24acf0af30da5b5d859f7d8f38fba52c28f405138
  pathutil (0.16.2) sha256=e43b74365631cab4f6d5e4228f812927efc9cb2c71e62976edcb252ee948d589
  public_suffix (7.0.5) sha256=1a8bb08f1bbea19228d3bed6e5ed908d1cb4f7c2726d18bd9cadf60bc676f623
  rake (13.4.2) sha256=cb825b2bd5f1f8e91ca37bddb4b9aaf345551b4731da62949be002fa89283701
  rb-fsevent (0.11.2) sha256=43900b972e7301d6570f64b850a5aa67833ee7d87b458ee92805d56b7318aefe
  rb-inotify (0.11.1) sha256=a0a700441239b0ff18eb65e3866236cd78613d6b9f78fea1f9ac47a85e47be6e
  rexml (3.4.4) sha256=19e0a2c3425dfbf2d4fc1189747bdb2f849b6c5e74180401b15734bc97b5d142
  rouge (4.7.0) sha256=dba5896715c0325c362e895460a6d350803dbf6427454f49a47500f3193ea739
  safe_yaml (1.0.5) sha256=a6ac2d64b7eb027bdeeca1851fe7e7af0d668e133e8a88066a0c6f7087d9f848
  sass-embedded (1.105.1-x64-mingw-ucrt) sha256=88ac2fe925056ac3a6c52f2d21464c9e3b57a4c3a85058d0c9b62c5eb2a75a1d
  sass-embedded (1.105.1-x86_64-linux-gnu) sha256=9038bc2256d7ecbfd352c15b77a3c8b6f0b72b763348d26564b5c0a123f48351
  terminal-table (3.0.2) sha256=f951b6af5f3e00203fb290a669e0a85c5dd5b051b3b023392ccfd67ba5abae91
  tzinfo (2.0.6) sha256=8daf828cc77bcf7d63b0e3bdb6caa47e2272dcfaf4fbfe46f8c3a9df087a829b
  tzinfo-data (1.2026.5) sha256=0bdc3c5a540b1704f73a7b5c9be5c90bd0a5866c8e9e8e8a7885977d23a81645
  unicode-display_width (2.6.0) sha256=12279874bba6d5e4d2728cef814b19197dbb10d7a7837a869bab65da943b7f5a
  webrick (1.9.2) sha256=beb4a15fc474defed24a3bda4ffd88a490d517c9e4e6118c3edce59e45864131

BUNDLED WITH
  4.0.15
```

### _config.yml

```yaml
title: ReelDiary
description: A personal archive of films, feelings, and frames worth remembering.
url: "https://VishwaGoswami1407.github.io"
baseurl: "/ReelDiary"
lang: en
author: ReelDiary
timezone: Asia/Kolkata

# Leave blank for an explicitly labeled browser-only preview.
# Use a public/publishable key, never a service-role or secret key.
scene_thoughts:
  supabase_url: ""
  public_key: ""

collections:
  movies:
    output: true
    permalink: /movies/:name/

defaults:
  - scope:
      path: ""
    values:
      layout: default
  - scope:
      path: ""
      type: movies
    values:
      layout: movie
      format: Movie
      cinema: Other

plugins:
  - jekyll-seo-tag
  - jekyll-sitemap

exclude:
  - _examples
  - README.md
  - SOURCE.md
  - PENDING_TITLES.md
  - Gemfile
  - Gemfile.lock
  - vendor
  - node_modules
  - supabase
  - tests
```

### _examples/movies/dune-part-two.md

```markdown
---
sample: true
title: "Dune: Part Two"
year: 2024
poster: https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg
format: Movie
cinema: Hollywood
genre: Sci-Fi
rating: 9
status: watching
date_watched:
language: English
review: "Still making my way across Arrakis. Every scene feels impossibly big."
---
```

### _examples/movies/everything-everywhere-all-at-once.md

```markdown
---
sample: true
title: Everything Everywhere All at Once
year: 2022
poster: https://image.tmdb.org/t/p/w780/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg
format: Movie
cinema: Hollywood
genre: Adventure
rating: 9
status: watched
date_watched: 2026-04-18
language: English
review: "Wildly inventive chaos with a tender center. Somehow a googly eye says everything."
---
```

### _examples/movies/inception.md

```markdown
---
sample: true
title: Inception
year: 2010
poster: https://image.tmdb.org/t/p/w780/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg
format: Movie
cinema: Hollywood
genre: Sci-Fi
rating: 9
status: watched
date_watched: 2026-01-12
language: English
review: "A puzzle box with a heartbeat. The hallway scene still makes my brain do a little backflip."
---
```

### _examples/movies/interstellar.md

```markdown
---
sample: true
title: Interstellar
year: 2014
poster: https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg
format: Movie
cinema: Hollywood
genre: Sci-Fi
rating: 10
status: watched
date_watched: 2026-02-03
language: English
review: "Vast, intimate, and overwhelming in the best way. I came for space and stayed for the love story."
---
```

### _examples/movies/oppenheimer.md

```markdown
---
sample: true
title: Oppenheimer
year: 2023
poster: https://image.tmdb.org/t/p/w780/ptpr0kGAckfQkJeJIt8st5dglvd.jpg
format: Movie
cinema: Hollywood
genre: Drama
rating: 9
status: watched
date_watched: 2026-06-09
language: English
review: "A three-hour thunderclap. The sound and performances make history feel dangerously close."
---
```

### _examples/movies/parasite.md

```markdown
---
sample: true
title: Parasite
year: 2019
poster: https://image.tmdb.org/t/p/w780/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg
format: Movie
cinema: Korean
genre: Thriller
rating: 10
status: watched
date_watched: 2026-03-21
language: Korean
review: "Every frame has a purpose. Funny until it isn't, then impossible to shake."
---
```

### _examples/movies/the-batman.md

```markdown
---
sample: true
title: The Batman
year: 2022
poster: https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg
format: Movie
cinema: Hollywood
genre: Crime
rating: 8
status: watching
date_watched:
language: English
review: "Gotham looks soaked in rain and secrets. I'm enjoying the detective story so far."
---
```

### _examples/movies/the-dark-knight.md

```markdown
---
sample: true
title: The Dark Knight
year: 2008
poster: https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg
format: Movie
cinema: Hollywood
genre: Action
rating: 9
status: watchlist
date_watched:
language: English
review: "On my list for its reputation, its Gotham, and that much-discussed Joker performance."
---
```

### _examples/movies/the-matrix.md

```markdown
---
sample: true
title: The Matrix
year: 1999
poster: https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg
format: Movie
cinema: Hollywood
genre: Sci-Fi
rating: 10
status: watchlist
date_watched:
language: English
review: "A classic I've somehow missed. Saving a night to finally take the red pill."
---
```

### _examples/movies/whiplash.md

```markdown
---
sample: true
title: Whiplash
year: 2014
poster: https://image.tmdb.org/t/p/w780/7fn624j5lj3xTme2SgiLCeuedmO.jpg
format: Movie
cinema: Hollywood
genre: Drama
rating: 9
status: watched
date_watched: 2026-07-30
language: English
review: "Relentless from the first beat to the last. I was holding my breath through the finale."
---
```

### _includes/footer.html

```html
<footer class="site-footer">
  <div class="container footer-inner">
    <div><a class="brand" href="{{ '/' | relative_url }}">REEL<span>DIARY</span><span class="brand-dot">.</span></a><p>A life in frames, one film at a time.</p></div>
    <p class="footer-credit">Made for the love of cinema <span aria-hidden="true">✦</span> {{ 'now' | date: '%Y' }}</p>
  </div>
</footer>
```

### _includes/header.html

```html
<header class="site-header" id="site-header">
  <nav class="nav container" aria-label="Main navigation">
    <a class="brand" href="{{ '/' | relative_url }}" aria-label="ReelDiary home"><span class="brand-mark" aria-hidden="true">✦</span> REEL<span>DIARY</span><span class="brand-dot">.</span></a>
    <button class="menu-toggle" type="button" aria-controls="nav-links" aria-expanded="false" aria-label="Open menu"><span></span><span></span><span></span></button>
    <div class="nav-links" id="nav-links">
      <a href="{{ '/' | relative_url }}" {% if page.url == '/' %}aria-current="page"{% endif %}>Home</a>
      <a href="{{ '/movies/' | relative_url }}" {% if page.url == '/movies/' %}aria-current="page"{% endif %}>All Movies</a>
      <a href="{{ '/watching/' | relative_url }}" {% if page.url == '/watching/' %}aria-current="page"{% endif %}>Watching</a>
      <a href="{{ '/watched/' | relative_url }}" {% if page.url == '/watched/' %}aria-current="page"{% endif %}>Watched</a>
      <a href="{{ '/stats/' | relative_url }}" {% if page.url == '/stats/' %}aria-current="page"{% endif %}>Stats</a>
      <a href="{{ '/about/' | relative_url }}" {% if page.url == '/about/' %}aria-current="page"{% endif %}>About</a>
      <button class="theme-toggle" type="button" aria-label="Switch to light theme" title="Toggle theme"><span class="theme-icon" aria-hidden="true">☼</span></button>
    </div>
  </nav>
</header>
```

### _includes/movie-card.html

```html
<a class="movie-card reveal {% if include.movie.status == 'watching' %}is-watching{% endif %}"
   href="{{ include.movie.url | relative_url }}"
   data-title="{{ include.movie.title | downcase | escape }}"
   data-year="{{ include.movie.year }}"
   data-genre="{{ include.movie.genre | escape }}"
   data-rating="{{ include.movie.rating }}"
   data-status="{{ include.movie.status }}"
   data-format="{{ include.movie.format | escape }}"
   data-cinema="{{ include.movie.cinema | escape }}"
   data-language="{{ include.movie.language | escape }}"
   aria-label="Read my diary entry for {{ include.movie.title | escape }}">
  <div class="poster-frame">
    <img src="{{ include.movie.poster | escape }}" alt="{{ include.movie.title | escape }} poster" loading="lazy" width="400" height="600" onerror="this.onerror=null;this.src='{{ '/assets/poster-fallback.svg' | relative_url }}'">
    <span class="poster-badge {% unless include.movie.status == 'watching' %}muted-badge{% endunless %}">
      {% if include.movie.status == 'watching' %}<span class="pulse-dot"></span>{% endif %}
      {{ include.movie.status | capitalize }}
    </span>
    <span class="poster-shine" aria-hidden="true"></span>
  </div>
  <div class="diary-card-body">
    <p class="card-kicker">{{ include.movie.format }} <span> / </span> {{ include.movie.cinema }}</p>
    <h3>{{ include.movie.title }}</h3>
    <p class="card-meta">{{ include.movie.year }} <span>·</span> {{ include.movie.genre }} <span>·</span> {{ include.movie.language }}</p>
    <div class="card-summary">
      <span class="card-section-label">THE STORY</span>
      <p>{{ include.movie.summary | default: 'A story in my personal diary. Summary coming soon.' }}</p>
    </div>
    <div class="card-thoughts">
      <span class="card-section-label">MY THOUGHTS</span>
      <p>{{ include.movie.review | default: 'I haven’t written my thoughts yet.' }}</p>
    </div>
    <div class="card-bottom">
      {% if include.movie.rating %}<span class="card-rating" aria-label="My rating: {{ include.movie.rating }} out of 10"><span aria-hidden="true">★</span> {{ include.movie.rating }}<small> / 10</small></span>{% else %}<span class="card-unrated">Not rated yet</span>{% endif %}
      <span class="card-read">Open diary <span aria-hidden="true">↗</span></span>
    </div>
  </div>
</a>
```

### _includes/scene-thoughts.html

```html
<section class="scene-thoughts container" id="scene-thoughts"
         data-movie-id="{{ page.slug | escape }}"
         data-supabase-url="{{ site.scene_thoughts.supabase_url | escape }}"
         data-public-key="{{ site.scene_thoughts.public_key | escape }}">
  <div class="section-heading">
    <div><p class="eyebrow">A MOMENT WORTH TALKING ABOUT</p><h2>SCENE <em>THOUGHTS.</em></h2></div>
    <span class="scene-count" id="scene-count"></span>
  </div>
  <p class="scene-intro">Pin a feeling to a moment. A beginning, a twist, a final frame.</p>
  <p class="scene-storage-note" id="scene-storage-note"></p>
  <noscript><p>Enable JavaScript to read and share Scene Thoughts.</p></noscript>

  <form class="scene-form" id="scene-form">
    <div class="scene-form-top">
      <label>Choose a moment
        <select name="scene" id="thought-scene">
          <option value="beginning">Beginning</option>
          <option value="interval">Interval</option>
          <option value="climax">Climax</option>
          <option value="ending">Ending</option>
          <option value="custom">Custom timestamp</option>
        </select>
      </label>
      <label id="timestamp-field" hidden>Timestamp
        <input name="timestamp" id="thought-timestamp" type="text" placeholder="1:45:20" maxlength="8" inputmode="numeric" aria-describedby="timestamp-help">
        <small id="timestamp-help">Use mm:ss or hh:mm:ss.</small>
      </label>
    </div>
    <label for="thought-body">Your thought</label>
    <textarea name="body" id="thought-body" rows="3" minlength="3" maxlength="1000" required placeholder="That one moment I keep thinking about…"></textarea>
    <div class="scene-character-count"><span id="thought-character-count">0</span> / 1000</div>
    <fieldset class="scene-moods">
      <legend>How did it feel?</legend>
      <label><input type="radio" name="mood" value="🥰" checked><span title="Loved it" aria-label="Loved it">🥰</span></label>
      <label><input type="radio" name="mood" value="😂"><span title="Made me laugh" aria-label="Made me laugh">😂</span></label>
      <label><input type="radio" name="mood" value="😢"><span title="Moved me" aria-label="Moved me">😢</span></label>
      <label><input type="radio" name="mood" value="😮"><span title="Surprised me" aria-label="Surprised me">😮</span></label>
      <label><input type="radio" name="mood" value="🤯"><span title="Mind blown" aria-label="Mind blown">🤯</span></label>
      <label><input type="radio" name="mood" value="😡"><span title="Frustrated me" aria-label="Frustrated me">😡</span></label>
    </fieldset>
    <div class="scene-form-bottom">
      <label class="check-label"><input type="checkbox" name="spoiler" checked> Contains a spoiler</label>
      <button class="button button-primary" id="post-thought" type="submit">Pin this thought <span aria-hidden="true">↗</span></button>
    </div>
  </form>

  <div class="scene-reader-toolbar">
    <div class="scene-filters" role="group" aria-label="Prioritize thoughts by scene">
      <button type="button" data-scene="all" aria-pressed="true">All</button>
      <button type="button" data-scene="beginning" aria-pressed="false">Beginning</button>
      <button type="button" data-scene="interval" aria-pressed="false">Interval</button>
      <button type="button" data-scene="climax" aria-pressed="false">Climax</button>
      <button type="button" data-scene="ending" aria-pressed="false">Ending</button>
      <button type="button" data-scene="custom" aria-pressed="false">Timestamps</button>
    </div>
    <label class="check-label"><input type="checkbox" id="hide-spoilers" checked> Hide spoilers</label>
  </div>
  <div class="scene-ranking-line"><p id="scene-ranking">Most reactions first, then newest.</p><button type="button" class="scene-refresh" id="refresh-thoughts">Refresh ↻</button></div>
  <p class="scene-message" id="scene-message" role="status" aria-live="polite"></p>
  <div class="scene-list" id="scene-list" aria-busy="true"></div>
  <button class="button button-outline scene-more" id="more-thoughts" type="button" hidden>More thoughts ↓</button>
</section>
```

### _layouts/default.html

```html
<!doctype html>
<html lang="{{ site.lang | default: 'en' }}" data-theme="dark">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#100c0e">
    {% seo %}
    <link rel="icon" type="image/svg+xml" href="{{ '/assets/favicon.svg' | relative_url }}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ '/assets/css/style.css' | relative_url }}">
    <link rel="stylesheet" href="{{ '/assets/css/cards.css' | relative_url }}">
    {% if page.collection == 'movies' %}
    <link rel="stylesheet" href="{{ '/assets/css/scene-thoughts.css' | relative_url }}">
    <script type="module" src="{{ '/assets/js/scene-thoughts.js' | relative_url }}"></script>
    {% endif %}
    <script>try{document.documentElement.dataset.theme=localStorage.getItem('reeldiary-theme')||'dark'}catch(e){}</script>
    <script src="{{ '/assets/js/main.js' | relative_url }}" defer></script>
    {% if page.url == '/stats/' %}<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.8/dist/chart.umd.min.js" defer></script><script src="{{ '/assets/js/stats.js' | relative_url }}" defer></script>{% endif %}
  </head>
  <body class="page-enter">
    <a class="skip-link" href="#main-content">Skip to content</a>
    <div class="grain" aria-hidden="true"></div>
    {% include header.html %}
    <main id="main-content">{{ content }}</main>
    {% include footer.html %}
  </body>
</html>
```

### _layouts/movie.html

```html
---
layout: default
---
<section class="detail-hero container">
  <a class="back-link" href="{{ '/movies/' | relative_url }}">← Back to all movies</a>
  <div class="detail-grid">
    <div class="detail-poster-wrap reveal">
      <img class="detail-poster" src="{{ page.poster | escape }}" alt="{{ page.title | escape }} poster" onerror="this.onerror=null;this.src='{{ '/assets/poster-fallback.svg' | relative_url }}'">
    </div>
    <div class="detail-copy reveal">
      <p class="eyebrow">The film file <span class="dot"></span> {{ page.status | replace: '-', ' ' | capitalize }}</p>
      <h1>{{ page.title }}</h1>
      <p class="detail-meta">{{ page.year }} <span>✦</span> {{ page.genre }} <span>✦</span> {{ page.language }}</p>
      <p class="detail-meta">{{ page.format }} <span>✦</span> {{ page.cinema }}</p>
      {% if page.rating %}<div class="detail-score"><span aria-hidden="true">★</span> {{ page.rating }}<small>/ 10</small></div>{% else %}<p class="detail-meta">Not yet rated</p>{% endif %}
      <div class="detail-divider"></div>
      {% if page.summary %}<p class="eyebrow">The story</p><p class="story-summary">{{ page.summary }}</p>{% endif %}
      <p class="eyebrow">My thoughts</p>
      <p class="review">{{ page.review | default: 'No review yet.' }}</p>
      {% if content != '' %}<div class="detail-body">{{ content }}</div>{% endif %}
      {% if page.date_watched %}<p class="watched-date">Watched on {{ page.date_watched | date: '%B %-d, %Y' }}</p>{% endif %}
      {% if page.metadata_source %}<p class="watched-date"><a href="{{ page.metadata_source | escape }}" target="_blank" rel="noopener noreferrer">Title information and poster: {{ page.metadata_provider | default: 'TVmaze' }} ↗</a></p>{% endif %}
      <a class="button button-outline" href="{{ '/movies/' | relative_url }}">Explore more films <span aria-hidden="true">↗</span></a>
    </div>
  </div>
</section>
{% include scene-thoughts.html %}
```

### _movies/anjaana-anjaani.md

```markdown
---
title: "Anjaana Anjaani"
year: 2010
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/b/bf/AnjaanaAnjaani.jpg/250px-AnjaanaAnjaani.jpg
format: Movie
cinema: Bollywood
genre: Romance
rating:
status: watched
date_watched:
language: Hindi
summary: "Two strangers facing personal crises form an unexpected bond while travelling together and reconsidering their futures."
review: "Two people travelling together and finding a different perspective on life."
metadata_source: https://en.wikipedia.org/wiki/Anjaana_Anjaani
metadata_provider: Wikipedia
---
```

### _movies/boys-over-flowers.md

```markdown
---
title: "Boys Over Flowers"
year: 2009
poster: https://static.tvmaze.com/uploads/images/original_untouched/581/1454035.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "A scholarship student challenges an elite school's powerful clique and becomes entangled in an unlikely romance."
metadata_source: https://www.tvmaze.com/shows/3637/boys-over-flowers
---
```

### _movies/business-proposal.md

```markdown
---
title: "Business Proposal"
year: 2022
poster: https://static.tvmaze.com/uploads/images/original_untouched/394/986401.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "A woman stands in for a friend on a blind date, only to discover that her date is her own company's CEO."
metadata_source: https://www.tvmaze.com/shows/59755/business-proposal
---
```

### _movies/crash-landing-on-you.md

```markdown
---
title: "Crash Landing on You"
year: 2019
poster: https://static.tvmaze.com/uploads/images/original_untouched/235/588087.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "A South Korean businesswoman lands across the border during a paragliding accident and finds an unexpected protector."
metadata_source: https://www.tvmaze.com/shows/42756/crash-landing-on-you
---
```

### _movies/dear-zindagi.md

```markdown
---
title: "Dear Zindagi"
year: 2016
poster: https://upload.wikimedia.org/wikipedia/en/9/9e/Dear_Zindagi_poster.jpg
format: Movie
cinema: Bollywood
genre: Drama
rating:
status: watched
date_watched:
language: Hindi
summary: "A young cinematographer begins to understand her relationships and emotional patterns through conversations with a therapist."
review: "Life, relationships, emotional growth and learning to enjoy yourself."
metadata_source: https://en.wikipedia.org/wiki/Dear_Zindagi
metadata_provider: Wikipedia
---
```

### _movies/descendants-of-the-sun.md

```markdown
---
title: "Descendants of the Sun"
year: 2016
poster: https://static.tvmaze.com/uploads/images/original_untouched/46/115575.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "A surgeon and a soldier fall for each other while their work pulls them into dangerous situations far from home."
metadata_source: https://www.tvmaze.com/shows/9426/descendants-of-the-sun
---
```

### _movies/dil-chahta-hai.md

```markdown
---
title: "Dil Chahta Hai"
year: 2001
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/d/db/Dil_Chahta_Hai.jpg/250px-Dil_Chahta_Hai.jpg
format: Movie
cinema: Bollywood
genre: Drama
rating:
status: watched
date_watched:
language: Hindi
summary: "Three close friends take different paths into adulthood as love and changing priorities reshape their bond."
review: "Friendship, travel, adulthood and different ways of living."
metadata_source: https://en.wikipedia.org/wiki/Dil_Chahta_Hai
metadata_provider: Wikipedia
---
```

### _movies/extraordinary-you.md

```markdown
---
title: "Extraordinary You"
year: 2019
poster: https://static.tvmaze.com/uploads/images/original_untouched/211/527722.jpg
format: Web Series
cinema: Korean
genre: Fantasy
rating:
status: watched
date_watched:
language: Korean
summary: "A student discovers she is a supporting character in a comic and sets out to rewrite the future its author has planned."
review:
metadata_source: https://www.tvmaze.com/shows/42757/extraordinary-you
metadata_provider: TVmaze
---
```

### _movies/goblin.md

```markdown
---
title: "Goblin"
year: 2016
poster: https://static.tvmaze.com/uploads/images/original_untouched/532/1330901.jpg
format: Web Series
cinema: Korean
genre: Fantasy
rating:
status: watched
date_watched:
language: Korean
review:
summary: "An immortal guardian meets a young woman whose unusual connection to him could change the fate he has carried for centuries."
metadata_source: https://www.tvmaze.com/shows/16150/guardian-the-lonely-and-great-god
---
```

### _movies/highway.md

```markdown
---
title: "Highway"
year: 2014
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/7/72/Highway_Hindi_Film_Poster.jpg/250px-Highway_Hindi_Film_Poster.jpg
format: Movie
cinema: Bollywood
genre: Drama
rating:
status: watched
date_watched:
language: Hindi
summary: "A young woman's abduction takes her across the country and forces buried memories and complicated feelings into the open."
review: "Road journey, freedom and discovering yourself."
metadata_source: https://en.wikipedia.org/wiki/Highway_(2014_Hindi_film)
metadata_provider: Wikipedia
---
```

### _movies/jab-we-met.md

```markdown
---
title: "Jab We Met"
year: 2007
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/9/9f/Jab_We_Met_Poster.jpg/250px-Jab_We_Met_Poster.jpg
format: Movie
cinema: Bollywood
genre: Romance
rating:
status: watched
date_watched:
language: Hindi
summary: "A troubled businessman meets an exuberant woman on a train, and an unplanned journey changes the course of both their lives."
review: "Travel, love, personal growth and enjoying the journey."
metadata_source: https://en.wikipedia.org/wiki/Jab_We_Met
metadata_provider: Wikipedia
---
```

### _movies/karwaan.md

```markdown
---
title: "Karwaan"
year: 2018
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/0/03/Karwaan_-_Movie_Poster.jpg/250px-Karwaan_-_Movie_Poster.jpg
format: Movie
cinema: Bollywood
genre: Comedy
rating:
status: watched
date_watched:
language: Hindi
summary: "A mix-up sends three unlikely companions on a journey through southern India, bringing unexpected conversations and connections."
review: "Road journey, unexpected friendships and a relaxed life vibe."
metadata_source: https://en.wikipedia.org/wiki/Karwaan
metadata_provider: Wikipedia
---
```

### _movies/lighter-and-princess.md

```markdown
---
title: "Lighter & Princess"
year: 2022
poster: https://static.tvmaze.com/uploads/images/original_untouched/429/1073254.jpg
format: Web Series
cinema: Chinese
genre: Romance
rating:
status: watching
date_watched:
language: Chinese
review:
summary: "A gifted programmer and a determined classmate grow closer as university life tests their ambitions and trust."
metadata_source: https://www.tvmaze.com/shows/64996/lighter-and-princess
---
```

### _movies/love-o2o.md

```markdown
---
title: "Love O2O"
year: 2016
poster: https://static.tvmaze.com/uploads/images/original_untouched/72/180410.jpg
format: Web Series
cinema: Chinese
genre: Romance
rating:
status: watched
date_watched:
language: Chinese
review:
summary: "Two university students connect through an online game before their partnership becomes a real-world romance."
metadata_source: https://www.tvmaze.com/shows/20388/a-smile-is-beautiful
---
```

### _movies/lucifer.md

```markdown
---
title: "Lucifer"
year: 2016
poster: https://static.tvmaze.com/uploads/images/original_untouched/346/865655.jpg
format: Web Series
cinema: Hollywood
genre: Fantasy
rating:
status: watched
date_watched:
language: English
summary: "After leaving Hell for Los Angeles, Lucifer becomes involved in a murder investigation and discovers an unfamiliar interest in humanity."
review:
metadata_source: https://www.tvmaze.com/shows/1859/lucifer
metadata_provider: TVmaze
---
```

### _movies/maxton-hall.md

```markdown
---
title: "Maxton Hall"
year: 2024
poster: https://static.tvmaze.com/uploads/images/original_untouched/641/1602804.jpg
format: Web Series
cinema: German
genre: Romance
rating:
status: watched
date_watched:
language: German
summary: "A scholarship student witnesses a secret at an exclusive school and clashes with a wealthy heir whose life could unravel."
review:
metadata_source: https://www.tvmaze.com/shows/63973/maxton-hall
metadata_provider: TVmaze
---
```

### _movies/mismatched.md

```markdown
---
title: "Mismatched"
year: 2020
poster: https://static.tvmaze.com/uploads/images/original_untouched/284/711038.jpg
format: Web Series
cinema: Bollywood
genre: Romance
rating:
status: watched
date_watched:
language: Hindi
summary: "Two teenagers brought together by their families navigate a summer course, competing ambitions, and unexpected feelings."
review:
metadata_source: https://www.tvmaze.com/shows/52027/mismatched
metadata_provider: TVmaze
---
```

### _movies/money-heist.md

```markdown
---
title: "Money Heist"
year: 2017
poster: https://static.tvmaze.com/uploads/images/original_untouched/376/940830.jpg
format: Web Series
cinema: Spanish
genre: Thriller
rating:
status: watched
date_watched:
language: Spanish
summary: "A mysterious planner assembles a team of robbers for an audacious heist that becomes a battle of strategy and nerves."
review:
metadata_source: https://www.tvmaze.com/shows/27436/la-casa-de-papel
metadata_provider: TVmaze
---
```

### _movies/mujhse-dosti-karoge.md

```markdown
---
title: "Mujhse Dosti Karoge!"
year: 2002
poster: https://upload.wikimedia.org/wikipedia/en/a/ab/Mujhse_Dosti_Karoge_Film_Poster.jpg
format: Movie
cinema: Bollywood
genre: Romance
rating:
status: watched
date_watched:
language: Hindi
summary: "A long-distance friendship built through messages leads three childhood friends into a complicated misunderstanding."
review: 
metadata_source: https://en.wikipedia.org/wiki/Mujhse_Dosti_Karoge!
metadata_provider: Wikipedia
---
```

### _movies/mujhse-shaadi-karogi.md

```markdown
---
title: "Mujhse Shaadi Karogi"
year: 2004
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/1/1f/MSK_officialposter.jpg/250px-MSK_officialposter.jpg
format: Movie
cinema: Bollywood
genre: Comedy
rating:
status: watched
date_watched:
language: Hindi
summary: "A short-tempered man starts over in Goa and competes with his mischievous roommate for the same woman's affection."
review: 
metadata_source: https://en.wikipedia.org/wiki/Mujhse_Shaadi_Karogi
metadata_provider: Wikipedia
---
```

### _movies/my-fault.md

```markdown
---
title: "My Fault"
year: 2023
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/7/70/My_Fault_%28film%29_poster.jpg/250px-My_Fault_%28film%29_poster.jpg
format: Movie
cinema: Spanish
genre: Romance
rating:
status: watched
date_watched:
language: Spanish
summary: "A teenager moves into her mother's new husband's home, where conflict with her stepbrother develops into a complicated attraction."
review:
metadata_source: https://en.wikipedia.org/wiki/My_Fault_(film)
metadata_provider: Wikipedia
---
```

### _movies/pinocchio.md

```markdown
---
title: "Pinocchio"
year: 2014
poster: https://static.tvmaze.com/uploads/images/original_untouched/18/45357.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "Young reporters struggle with ambition, buried family history, and the responsibility of telling the truth."
metadata_source: https://www.tvmaze.com/shows/3446/pinocchio
---
```

### _movies/queen-of-tears.md

```markdown
---
title: "Queen of Tears"
year: 2024
poster: https://static.tvmaze.com/uploads/images/original_untouched/507/1269260.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "A wealthy heiress and her husband face a crisis that forces them to reconsider their troubled marriage."
metadata_source: https://www.tvmaze.com/shows/67633/queen-of-tears
---
```

### _movies/queen.md

```markdown
---
title: "Queen"
year: 2013
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/4/45/QueenMoviePoster7thMarch.jpg/250px-QueenMoviePoster7thMarch.jpg
format: Movie
cinema: Bollywood
genre: Drama
rating:
status: watched
date_watched:
language: Hindi
summary: "After her wedding is called off, a young woman takes her honeymoon alone and discovers a new sense of independence."
review: "Independence, self-discovery and experiencing life alone."
metadata_source: https://en.wikipedia.org/wiki/Queen_(2013_film)
metadata_provider: Wikipedia
---
```

### _movies/squid-game.md

```markdown
---
title: "Squid Game"
year: 2021
poster: https://static.tvmaze.com/uploads/images/original_untouched/576/1440521.jpg
format: Web Series
cinema: Korean
genre: Thriller
rating:
status: watched
date_watched:
language: Korean
review:
summary: "People overwhelmed by debt enter a secret competition where familiar childhood games become a fight for survival."
metadata_source: https://www.tvmaze.com/shows/43687/squid-game
---
```

### _movies/start-up.md

```markdown
---
title: "Start-Up"
year: 2020
poster: https://static.tvmaze.com/uploads/images/original_untouched/274/685409.jpg
format: Web Series
cinema: Korean
genre: Romance
rating:
status: watched
date_watched:
language: Korean
review:
summary: "Aspiring entrepreneurs chase their dreams in a competitive technology hub while old misunderstandings complicate new relationships."
metadata_source: https://www.tvmaze.com/shows/49929/start-up
---
```

### _movies/tamasha.md

```markdown
---
title: "Tamasha"
year: 2015
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/0/0c/Tamasha_%28film_poster%29.jpg/250px-Tamasha_%28film_poster%29.jpg
format: Movie
cinema: Bollywood
genre: Drama
rating:
status: watched
date_watched:
language: Hindi
summary: "An uninhibited holiday encounter leads a man to confront the gap between his everyday routine and his creative identity."
review: "Finding yourself, breaking routine and living the life you actually want."
metadata_source: https://en.wikipedia.org/wiki/Tamasha_(2015_film)
metadata_provider: Wikipedia
---
```

### _movies/the-founder.md

```markdown
---
title: "The Founder"
year: 2016
poster: https://upload.wikimedia.org/wikipedia/en/6/68/The_Founder_poster.png
format: Movie
cinema: Hollywood
genre: Drama
rating:
status: watched
date_watched:
language: English
summary: "A salesman sees the potential in a fast-food restaurant and turns its small operation into a vast business empire."
review: 
metadata_source: https://en.wikipedia.org/wiki/The_Founder
metadata_provider: Wikipedia
---
```

### _movies/the-kissing-booth.md

```markdown
---
title: "The Kissing Booth"
year: 2018
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/3/3b/The_Kissing_Booth.png/250px-The_Kissing_Booth.png
format: Movie
cinema: Hollywood
genre: Romance
rating:
status: watched
date_watched:
language: English
summary: "A school fundraiser brings a teenager closer to her best friend's older brother, putting a treasured friendship under strain."
review:
metadata_source: https://en.wikipedia.org/wiki/The_Kissing_Booth
metadata_provider: Wikipedia
---
```

### _movies/the-pursuit-of-happyness.md

```markdown
---
title: "The Pursuit of Happyness"
year: 2006
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/8/81/Poster-pursuithappyness.jpg/250px-Poster-pursuithappyness.jpg
format: Movie
cinema: Hollywood
genre: Drama
rating:
status: watched
date_watched:
language: English
summary: "A struggling father works toward a new career while trying to provide stability for his young son."
review: 
metadata_source: https://en.wikipedia.org/wiki/The_Pursuit_of_Happyness
metadata_provider: Wikipedia
---
```

### _movies/the-summer-i-turned-pretty.md

```markdown
---
title: "The Summer I Turned Pretty"
year: 2022
poster: https://static.tvmaze.com/uploads/images/original_untouched/576/1440848.jpg
format: Web Series
cinema: Hollywood
genre: Romance
rating:
status: watched
date_watched:
language: English
summary: "A familiar summer at the beach becomes a turning point for Belly as friendships shift and first love gets complicated."
review:
metadata_source: https://www.tvmaze.com/shows/53443/the-summer-i-turned-pretty
metadata_provider: TVmaze
---
```

### _movies/thor-love-and-thunder.md

```markdown
---
title: "Thor: Love and Thunder"
year: 2022
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/8/88/Thor_Love_and_Thunder_poster.jpeg/250px-Thor_Love_and_Thunder_poster.jpeg
format: Movie
cinema: Hollywood
genre: Action
rating:
status: watched
date_watched:
language: English
summary: "Thor's search for peace is interrupted by a threat to the gods and the return of Jane Foster wielding his former hammer."
review:
metadata_source: https://en.wikipedia.org/wiki/Thor:_Love_and_Thunder
metadata_provider: Wikipedia
---
```

### _movies/vivah.md

```markdown
---
title: "Vivah"
year: 2006
poster: https://upload.wikimedia.org/wikipedia/en/4/41/Vivah_%282006_film%29_poster.jpg
format: Movie
cinema: Bollywood
genre: Romance
rating:
status: watched
date_watched:
language: Hindi
summary: "Two people grow close after an arranged engagement, before an unexpected crisis tests their commitment."
review: 
metadata_source: https://en.wikipedia.org/wiki/Vivah
metadata_provider: Wikipedia
---
```

### _movies/wake-up-sid.md

```markdown
---
title: "Wake Up Sid"
year: 2009
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/9/9f/Wake_up_Sid.jpg/250px-Wake_up_Sid.jpg
format: Movie
cinema: Bollywood
genre: Drama
rating:
status: watched
date_watched:
language: Hindi
summary: "A directionless young man begins to find purpose through friendship, responsibility, and an emerging passion for photography."
review: "Growing up, finding your passion and figuring out life."
metadata_source: https://en.wikipedia.org/wiki/Wake_Up_Sid
metadata_provider: Wikipedia
---
```

### _movies/when-life-gives-you-tangerines.md

```markdown
---
title: "When Life Gives You Tangerines"
year: 2025
poster: https://static.tvmaze.com/uploads/images/original_untouched/553/1383936.jpg
format: Web Series
cinema: Korean
genre: Drama
rating:
status: watched
date_watched:
language: Korean
review:
summary: "Two young people from Jeju build a life together through changing seasons, family struggles, and enduring love."
metadata_source: https://www.tvmaze.com/shows/74399/when-life-gives-you-tangerines
---
```

### _movies/yeh-jawaani-hai-deewani.md

```markdown
---
title: "Yeh Jawaani Hai Deewani"
year: 2013
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/1/15/Yeh_jawani_hai_deewani.jpg/250px-Yeh_jawani_hai_deewani.jpg
format: Movie
cinema: Bollywood
genre: Romance
rating:
status: watched
date_watched:
language: Hindi
summary: "A mountain trip brings four friends together, while the years that follow test their dreams, relationships, and ideas of happiness."
review: "I’ve never watched this type of movie before, but I love the idea of it. I love the way they live, the “26 pe chhori…” dialogue, the sunset thoughts, the Manali vibe, the road-trip feeling, and the way the movie connects four different stories through songs and friendship."
metadata_source: https://en.wikipedia.org/wiki/Yeh_Jawaani_Hai_Deewani
metadata_provider: Wikipedia
---
```

### _movies/zindagi-na-milegi-dobara.md

```markdown
---
title: "Zindagi Na Milegi Dobara"
year: 2011
poster: https://thumb.wikimedia.org/wikipedia/en/thumb/1/17/Zindagi_Na_Milegi_Dobara.jpg/250px-Zindagi_Na_Milegi_Dobara.jpg
format: Movie
cinema: Bollywood
genre: Adventure
rating:
status: watched
date_watched:
language: Hindi
summary: "Three friends travel across Spain and face challenges that lead them to reconsider their fears and priorities."
review: "Road trip, friendship, freedom, travel and enjoying life."
metadata_source: https://en.wikipedia.org/wiki/Zindagi_Na_Milegi_Dobara
metadata_provider: Wikipedia
---
```

### assets/css/cards.css

```css
/* Diary entries: alternating pages of a personal film journal. */
.movie-grid {
  display: grid;
  grid-template-columns: minmax(0,1fr);
  gap: 30px;
  counter-reset: entry;
}
.movie-card {
  --enter-x: -75px;
  display: grid;
  grid-template-columns: 88px minmax(0,1fr);
  column-gap: 18px;
  row-gap: 6px;
  min-width: 0;
  padding: 20px;
  position: relative;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 9px;
  counter-increment: entry;
  transform: perspective(1400px) rotateX(var(--tilt-x,0deg)) rotateY(var(--tilt-y,0deg));
  transition: translate .85s cubic-bezier(.16,1,.3,1), opacity .7s ease,
    transform .25s ease, border-color .3s, box-shadow .3s;
}
.movie-card:nth-child(even) {
  --enter-x: 75px;
}
.movie-card:hover {
  border-color: var(--gold);
  box-shadow: 0 18px 45px #0002;
}
.movie-card.reveal-pending {
  opacity: 0;
  translate: var(--enter-x) 25px;
}
.movie-card.reveal.visible,.movie-card.reveal-pending:focus-visible {
  animation: none;
  opacity: 1;
  translate: 0 0;
}
.poster-frame {
  grid-column: 1;
  grid-row: 1 / 4;
  position: relative;
  align-self: start;
  aspect-ratio: 2/3;
  overflow: hidden;
  border-radius: 5px;
  background: var(--bg);
}
.poster-frame img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .7s ease;
}
.movie-card:hover .poster-frame img {
  transform: scale(1.045);
}
.poster-badge {
  position: absolute;
  left: 5px;
  right: 5px;
  bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 4px 6px;
  background: #101014db;
  color: #d8b777;
  border: 1px solid #d8b77738;
  border-radius: 3px;
  font-size: 7px;
  text-transform: uppercase;
  letter-spacing: .08em;
}
.poster-shine {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--shine-x,50%) var(--shine-y,50%),#ffffff25,transparent 60%);
  opacity: 0;
  transition: opacity .3s;
  pointer-events: none;
}
.movie-card:hover .poster-shine {
  opacity: 1;
}
.diary-card-body {
  display: contents;
}
.card-kicker,.diary-card-body h3,.card-meta {
  grid-column: 2;
  margin: 0;
}
.card-kicker {
  color: var(--gold);
  font-size: 8px;
  letter-spacing: .1em;
  text-transform: uppercase;
  align-self: end;
}
.card-kicker:before {
  content: counter(entry,decimal-leading-zero) "  ·  ";
  color: var(--muted);
}
.card-kicker>span {
  padding-inline: 3px;
}
.diary-card-body h3 {
  font-family: 'Bebas Neue',sans-serif;
  font-weight: 400;
  font-size: clamp(1.6rem,4.5vw,2.6rem);
  letter-spacing: .015em;
  line-height: 1.08;
  align-self: center;
}
.card-meta {
  color: var(--muted);
  font-size: 9px;
  align-self: start;
}
.card-meta>span {
  color: var(--gold);
  padding-inline: 4px;
}
.card-summary,.card-thoughts,.card-bottom {
  grid-column: 1 / -1;
}
.card-summary {
  margin-top: 18px;
}
.card-section-label {
  display: block;
  color: var(--gold);
  font-size: 8px;
  font-weight: 600;
  letter-spacing: .18em;
  margin-bottom: 6px;
}
.card-summary p {
  color: var(--muted);
  font-size: 11px;
  line-height: 1.9;
  margin: 0;
}
.card-thoughts {
  margin-top: 12px;
  padding: 13px 16px;
  border-left: 2px solid var(--red);
  background: color-mix(in srgb,var(--red) 8%,transparent);
}
.card-thoughts p {
  font-family: Georgia,serif;
  font-size: 14px;
  font-style: italic;
  line-height: 1.6;
  margin: 0;
}
.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  margin-top: 10px;
  border-top: 1px solid var(--line);
}
.card-unrated,.card-rating small {
  color: var(--muted);
  font-size: 9px;
}
.card-rating {
  color: var(--text);
  font-size: 13px;
}
.card-rating>span {
  color: var(--gold);
  margin-right: 4px;
}
.card-read {
  font-size: 10px;
  color: var(--gold);
}
.card-read>span {
  display: inline-block;
  margin-left: 10px;
  transition: transform .3s;
}
.movie-card:hover .card-read>span {
  transform: translate(3px,-3px);
}
.movie-card.is-watching {
  border-color: color-mix(in srgb,var(--red) 65%,var(--line));
  box-shadow: inset 3px 0 var(--red);
}
.is-watching .poster-frame {
  animation: card-glow 3s ease-in-out infinite;
}
.story-summary {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.9;
  margin-bottom: 30px;
}
@media(min-width:650px) {
  .movie-grid {
    max-width: 1050px;
    margin-inline: auto;
    gap: 38px;
  }
  .movie-card {
    grid-template-columns: 190px minmax(0,1fr);
    gap: 30px;
    padding: 28px;
    width: calc(100% - 35px);
  }
  .movie-card:nth-child(even) {
    margin-left: 35px;
    grid-template-columns: minmax(0,1fr) 190px;
  }
  .poster-frame {
    grid-row: auto;
    grid-column: auto;
    align-self: center;
  }
  .movie-card:nth-child(even) .poster-frame {
    grid-column: 2;
    grid-row: 1;
  }
  .movie-card:nth-child(even) .diary-card-body {
    grid-column: 1;
    grid-row: 1;
  }
  .diary-card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .diary-card-body h3,.card-kicker,.card-meta {
    align-self: auto;
  }
  .card-kicker {
    margin-bottom: 10px;
  }
  .diary-card-body h3 {
    margin-bottom: 8px;
  }
  .card-meta {
    font-size: 10px;
  }
  .card-summary {
    margin-top: 18px;
  }
  .card-summary p {
    font-size: 12px;
  }
  .poster-badge {
    left: 12px;
    right: 12px;
    bottom: 12px;
    font-size: 8px;
    padding: 6px;
  }
}
@media(prefers-reduced-motion:reduce) {
  .movie-card,.movie-card.reveal-pending {
    opacity: 1;
    translate: none;
    transform: none;
  }
}
```

### assets/css/scene-thoughts.css

```css
.scene-thoughts {
  padding-block: 35px 85px;
  border-top: 1px solid var(--line);
}
.scene-intro,.scene-storage-note {
  color: var(--muted);
  font-size: 12px;
}
.scene-storage-note {
  border-left: 2px solid var(--gold);
  padding-left: 12px;
  margin-bottom: 28px;
  font-size: 10px;
}
.scene-count {
  font-size: 10px;
  color: var(--muted);
}
.scene-form {
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: 8px;
  padding: 22px;
}
.scene-form label,.scene-moods legend {
  font-size: 11px;
  color: var(--muted);
}
.scene-form-top {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 20px;
}
.scene-form-top>label {
  display: flex;
  flex: 1;
  min-width: 160px;
  flex-direction: column;
  gap: 7px;
}
.scene-form input[type=text],.scene-form select,.scene-form textarea {
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 11px 13px;
  font: 12px/1.7 Poppins,sans-serif;
  width: 100%;
}
.scene-form textarea {
  resize: vertical;
  min-height: 95px;
  display: block;
  margin-top: 8px;
}
.scene-form small,.scene-character-count {
  font-size: 9px;
  color: var(--muted);
}
.scene-character-count {
  text-align: right;
  margin-top: 6px;
}
.scene-moods {
  border: 0;
  padding: 0;
  margin: 10px 0 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.scene-moods legend {
  margin-bottom: 10px;
}
.scene-moods label {
  position: relative;
}
.scene-moods input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
}
.scene-moods span {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 50%;
  cursor: pointer;
  font-size: 21px;
  transition: transform .2s,border-color .2s;
}
.scene-moods input:checked+span {
  border-color: var(--gold);
  background: color-mix(in srgb,var(--gold) 10%,transparent);
  transform: translateY(-3px);
}
.scene-moods input:focus-visible+span {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}
.scene-form-bottom,.scene-reader-toolbar,.scene-ranking-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.check-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
}
.check-label input {
  accent-color: var(--gold);
  width: 15px;
  height: 15px;
}
.scene-reader-toolbar {
  padding-top: 30px;
}
.scene-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.scene-filters button,.scene-refresh {
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 4px;
  padding: 7px 11px;
  font-size: 10px;
}
.scene-filters button[aria-pressed=true] {
  color: var(--gold);
  border-color: var(--gold);
}
.scene-ranking-line {
  margin-block: 18px;
}
.scene-ranking-line p {
  font-size: 10px;
  color: var(--muted);
  margin: 0;
}
.scene-refresh {
  border: 0;
  color: var(--gold);
}
.scene-message {
  font-size: 11px;
  color: var(--gold);
}
.scene-message:empty {
  display: none;
}
.scene-message.is-error {
  color: #e68992;
}
.scene-list {
  display: grid;
  gap: 14px;
}
.thought-card {
  border: 1px solid var(--line);
  border-radius: 7px;
  padding: 20px;
  background: var(--surface);
}
.thought-card.is-match {
  border-left: 3px solid var(--gold);
}
.thought-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  margin-bottom: 14px;
}
.thought-heading h3 {
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}
.thought-date {
  color: var(--muted);
  font-size: 9px;
}
.thought-mood {
  margin-right: 9px;
  font-size: 22px;
  vertical-align: middle;
}
.thought-body {
  color: var(--text);
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 13px;
  line-height: 1.9;
  margin-bottom: 18px;
}
.spoiler-reveal {
  display: block;
  width: 100%;
  border: 1px dashed var(--line);
  border-radius: 5px;
  background: color-mix(in srgb,var(--red) 10%,transparent);
  padding: 20px;
  color: var(--gold);
  font-size: 11px;
  margin-bottom: 18px;
}
.thought-reactions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}
.reaction-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  background: var(--bg);
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 20px;
  font-size: 12px;
}
.reaction-button[aria-pressed=true] {
  border-color: var(--gold);
  color: var(--gold);
}
.reaction-button:active {
  transform: scale(.92);
}
.reaction-total {
  font-size: 9px;
  color: var(--muted);
  margin-left: auto;
}
.scene-more {
  margin: 25px auto 0;
}
.scene-thoughts button:disabled {
  opacity: .5;
  cursor: wait;
}
@media(min-width:700px) {
  .scene-form {
    padding: 30px;
  }
  .scene-thoughts {
    max-width: 1000px;
  }
}
```

### assets/css/style.css

```css
:root {
  color-scheme:dark;
  --bg:#101014;
  --surface:#1a161b;
  --text:#f4eee7;
  --muted:#a29998;
  --line:#302629;
  --gold:#d8b777;
  --red:#942c3b;
  --chart-grid:#302629
}
:root[data-theme=light] {
  color-scheme:light;
  --bg:#f7f2ea;
  --surface:#fffaf4;
  --text:#271b1e;
  --muted:#75666a;
  --line:#e0d6cd;
  --gold:#96651e;
  --red:#a1303a;
  --chart-grid:#e0d6cd
}
* {
  box-sizing:border-box
}
html {
  overflow-x:clip;
  scroll-behavior:smooth;
  scroll-padding-top:90px
}
body {
  overflow-x:clip;
  margin:0;
  background:var(--bg);
  color:var(--text);
  font-family:Poppins,sans-serif;
  font-size:14px;
  line-height:1.7;
  transition:background .3s,color .3s
}
a {
  color:inherit;
  text-decoration:none
}
button,input,select {
  font:inherit
}
button,a,input,select {
  -webkit-tap-highlight-color:transparent
}
button {
  cursor:pointer
}
button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible {
  outline:2px solid var(--gold);
  outline-offset:5px
}
img {
  display:block;
  max-width:100%
}
[hidden] {
  display:none!important
}
h1,h2,h3,p {
  margin-top:0
}
h1,h2 {
  font-family:'Bebas Neue',sans-serif;
  font-weight:400;
  line-height:1;
  letter-spacing:.015em
}
h1 em,h2 em {
  font-style:normal;
  color:var(--gold)
}
h2 {
  font-size:clamp(2.4rem,5vw,3.3rem)
}
.container {
  width:min(1180px,calc(100% - 40px));
  margin-inline:auto
}
.section {
  padding-block:68px
}
.eyebrow {
  display:flex;
  align-items:center;
  gap:10px;
  font-size:10px;
  letter-spacing:.22em;
  font-weight:600;
  color:var(--gold);
  margin-bottom:18px
}
.sr-only {
  position:absolute;
  width:1px;
  height:1px;
  padding:0;
  margin:-1px;
  overflow:hidden;
  clip:rect(0,0,0,0);
  white-space:nowrap;
  border:0
}
.skip-link {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
  padding: 10px 18px;
  background: var(--gold);
  color: var(--bg);
  transform: translateY(-150%);
}
.skip-link:focus {
  transform: translateY(0);
}
.page-enter {
  animation:page-in .65s ease both
}
.grain {
  position:fixed;
  inset:0;
  pointer-events:none;
  z-index:10;
  opacity:.035;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' filter='url(%23n)' d='M0 0h180v180H0z'/%3E%3C/svg%3E")
}
.site-header {
  position:sticky;
  top:0;
  z-index:20;
  background:var(--bg);
  border-bottom:1px solid var(--line);
  transition:box-shadow .3s,background .3s
}
.site-header.scrolled {
  box-shadow:0 8px 35px #0002
}
.nav {
  min-height:78px;
  display:flex;
  align-items:center;
  justify-content:space-between
}
.brand {
  font-family:'Bebas Neue',sans-serif;
  font-size:28px;
  letter-spacing:.025em;
  display:inline-flex;
  align-items:center;
  line-height:1
}
.brand>span:not(.brand-mark):not(.brand-dot) {
  color:var(--gold)
}
.brand-mark {
  color:var(--gold);
  margin-right:9px;
  font-size:30px
}
.brand-dot {
  color:var(--red)
}
.nav-links {
  display:none;
  position:absolute;
  top:78px;
  left:0;
  right:0;
  padding:20px;
  background:var(--surface);
  border-bottom:1px solid var(--line)
}
.nav-links.open {
  display:flex;
  flex-direction:column;
  align-items:stretch;
  gap:16px
}
.nav-links>a {
  font-size:12px;
  color:var(--muted);
  position:relative
}
.nav-links>a:hover,.nav-links>a[aria-current] {
  color:var(--gold)
}
.theme-toggle {
  width:35px;
  height:35px;
  display:grid;
  place-items:center;
  border:1px solid var(--line);
  border-radius:50%;
  color:var(--gold);
  background:transparent;
  font-size:22px
}
.menu-toggle {
  width:36px;
  height:36px;
  background:none;
  border:0;
  display:flex;
  flex-direction:column;
  justify-content:center;
  gap:5px
}
.menu-toggle span {
  display:block;
  width:24px;
  height:2px;
  background:var(--text);
  transition:transform .2s
}
.menu-toggle[aria-expanded=true] span:first-child {
  transform:translateY(7px) rotate(45deg)
}
.menu-toggle[aria-expanded=true] span:nth-child(2) {
  opacity:0
}
.menu-toggle[aria-expanded=true] span:last-child {
  transform:translateY(-7px) rotate(-45deg)
}
.hero {
  overflow:hidden;
  position:relative;
  border-bottom:1px solid var(--line);
  background:radial-gradient(ellipse at 87% 50%,#8d263331,transparent 55%)
}
.hero-content {
  position:relative;
  z-index:2;
  padding-block:62px 40px
}
.hero-kicker {
  font-size:9px
}
.line {
  width:28px;
  height:1px;
  background:var(--gold)
}
.hero h1 {
  font-size:clamp(4.3rem,10.3vw,8.25rem);
  margin-bottom:25px;
  line-height:.94;
  max-width:820px
}
.hero-tagline {
  font-size:clamp(.9rem,2vw,1.2rem);
  margin-bottom:13px;
  display:flex;
  align-items:center
}
.typing-text {
  display:inline-block;
  max-width:max-content;
  overflow:hidden;
  white-space:nowrap;
  animation:type-in 2.2s steps(31,end) .4s both
}
.cursor {
  color:var(--gold);
  animation:blink .9s step-end infinite;
  margin-left:3px
}
.hero-intro {
  max-width:430px;
  color:var(--muted);
  font-size:12px;
  line-height:1.9
}
.hero-actions {
  display:flex;
  gap:22px;
  align-items:center;
  flex-wrap:wrap;
  margin-top:27px
}
.button {
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:24px;
  padding:13px 21px;
  font-size:11px;
  font-weight:600;
  border:1px solid transparent;
  border-radius:4px;
  transition:transform .2s,background .2s
}
.button:hover {
  transform:translateY(-3px)
}
.button-primary {
  background:var(--gold);
  color:var(--bg)
}
.button-outline {
  border-color:var(--line);
  color:var(--text)
}
.button-outline:hover {
  border-color:var(--gold)
}
.text-link,.section-link {
  font-size:11px;
  color:var(--muted)
}
.text-link span,.section-link span {
  color:var(--gold);
  margin-left:12px
}
.hero-stats {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  max-width:525px;
  gap:15px;
  margin-top:44px;
  padding-top:25px;
  border-top:1px solid var(--line)
}
.hero-stats>div {
  display:flex;
  flex-direction:column
}
.hero-stats strong {
  font:40px/1 'Bebas Neue',sans-serif;
  color:var(--gold)
}
.hero-stats span {
  font-size:9px;
  color:var(--muted);
  margin-top:7px
}
.hero-stats b {
  font-weight:500;
  display:block
}
.hero-side-note {
  display:none
}
.hero-reel {
  position:absolute;
  border:3px solid #bf8d6a20;
  border-radius:50%;
  width:390px;
  height:390px;
  right:-240px;
  top:110px;
  animation:reel-spin 70s linear infinite;
  opacity:.6;
  background:radial-gradient(circle at 50% 21%,transparent 0 34px,#be896919 35px 52px,transparent 53px),radial-gradient(circle at 78% 42%,transparent 0 34px,#be896919 35px 52px,transparent 53px),radial-gradient(circle at 68% 77%,transparent 0 34px,#be896919 35px 52px,transparent 53px),radial-gradient(circle at 32% 77%,transparent 0 34px,#be896919 35px 52px,transparent 53px),radial-gradient(circle at 22% 42%,transparent 0 34px,#be896919 35px 52px,transparent 53px)
}
.hero-reel:after {
  content:'';
  position:absolute;
  inset:43%;
  border-radius:50%;
  border:14px solid #be896925
}
.reel-two {
  width:190px;
  height:190px;
  top:400px;
  right:-90px;
  opacity:.25;
  animation-direction:reverse
}
.film-strip {
  position:absolute;
  width:800px;
  height:125px;
  right:-450px;
  transform:rotate(-30deg);
  border-block:15px solid #8e574721;
  background:repeating-linear-gradient(90deg,transparent 0 105px,#be896912 105px 112px);
  opacity:.5
}
.film-strip:after {
  content:'';
  position:absolute;
  inset:-10px 0;
  background:repeating-linear-gradient(90deg,#bf8d6a35 0 12px,transparent 12px 24px) top/100% 5px no-repeat,repeating-linear-gradient(90deg,#bf8d6a35 0 12px,transparent 12px 24px) bottom/100% 5px no-repeat
}
.strip-top {
  top:10px
}
.strip-bottom {
  bottom:40px
}
.section-heading {
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:15px;
  margin-bottom:28px
}
.section-heading .eyebrow {
  font-size:8px;
  margin-bottom:12px
}
.section-heading h2 {
  margin:0;
  font-size:clamp(2rem,5vw,3.2rem)
}
.section-link {
  white-space:nowrap;
  font-size:10px;
  margin-bottom:5px
}
.live-dot,.pulse-dot {
  display:inline-block;
  width:6px;
  height:6px;
  border-radius:50%;
  background:#d45a5f;
  box-shadow:0 0 0 4px #d45a5f15;
  animation:pulse 2.4s infinite
}
.feature-section {
  background:var(--surface);
  border-block:1px solid var(--line)
}
.quote-section {
  text-align:center;
  padding-block:65px 80px
}
.quote-mark {
  font:90px/1 Georgia,serif;
  color:var(--gold);
  height:55px;
  display:block
}
.quote-section p {
  font-family:Georgia,serif;
  font-size:clamp(1.1rem,3vw,1.7rem);
  line-height:1.6;
  margin-bottom:25px
}
.quote-section em {
  color:var(--muted)
}
.site-footer {
  border-top:1px solid var(--line);
  padding-block:32px
}
.footer-inner {
  display:flex;
  flex-wrap:wrap;
  gap:20px;
  align-items:center;
  justify-content:space-between
}
.site-footer .brand {
  font-size:23px
}
.site-footer p {
  font-size:9px;
  color:var(--muted);
  margin:8px 0 0
}
.footer-credit span {
  color:var(--gold);
  padding-inline:8px
}
.page-heading {
  padding-block:65px 38px
}
.page-heading h1 {
  font-size:clamp(3.4rem,8vw,6rem);
  max-width:1000px;
  margin-bottom:20px
}
.page-heading>p:last-child {
  color:var(--muted);
  font-size:12px
}
.archive {
  padding-bottom:80px
}
.archive-toolbar {
  display:flex;
  gap:15px;
  flex-wrap:wrap;
  justify-content:space-between;
  margin:8px 0 24px
}
.search-field {
  border:1px solid var(--line);
  border-radius:5px;
  display:flex;
  gap:12px;
  align-items:center;
  flex:1;
  min-width:220px;
  max-width:480px;
  padding:7px 14px;
  background:var(--surface)
}
.search-field>span:first-child {
  font-size:25px;
  color:var(--gold)
}
.search-field input {
  width:100%;
  background:none;
  border:0;
  color:var(--text);
  font-size:12px;
  padding:5px
}
.search-field input::placeholder {
  color:var(--muted)
}
.sort-field {
  display:flex;
  align-items:center;
  gap:10px;
  color:var(--muted);
  font-size:10px
}
.sort-field select {
  padding:10px 12px;
  border:1px solid var(--line);
  border-radius:4px;
  background:var(--surface);
  color:var(--text);
  font-size:11px
}
.filter-panel {
  padding:20px;
  border:1px solid var(--line);
  border-radius:6px;
  background:var(--surface)
}
.filter-row {
  display:flex;
  flex-direction:column;
  gap:7px
}
.filter-row+.filter-row {
  margin-top:14px
}
.filter-label {
  color:var(--muted);
  font-size:9px;
  letter-spacing:.1em;
  padding-top:6px
}
.filter-options {
  display:flex;
  gap:6px;
  flex-wrap:wrap
}
.filter-button {
  border:1px solid transparent;
  border-radius:3px;
  color:var(--muted);
  background:transparent;
  padding:5px 10px;
  font-size:10px;
  transition:color .2s,background .2s
}
.filter-button:hover {
  color:var(--text);
  background:var(--line)
}
.filter-button.active {
  color:var(--gold);
  border-color:var(--gold);
  background:color-mix(in srgb,var(--gold) 8%,transparent)
}
.archive-count {
  display:flex;
  gap:18px;
  align-items:center;
  color:var(--muted);
  font-size:10px;
  margin-block:30px 24px
}
.rule {
  height:1px;
  flex:1;
  background:var(--line)
}
.inner-list {
  padding-top:10px;
  min-height:45vh
}
.empty-state {
  padding:45px;
  text-align:center;
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:7px;
  color:var(--muted)
}
.detail-hero {
  padding-block:35px 80px
}
.back-link {
  font-size:11px;
  color:var(--muted);
  display:inline-block;
  margin-bottom:35px
}
.detail-grid {
  display:grid;
  gap:35px
}
.detail-poster {
  width:100%;
  max-width:400px;
  border-radius:8px;
  box-shadow:0 24px 70px #0004;
  aspect-ratio:2/3;
  object-fit:cover
}
.detail-copy {
  padding-top:15px
}
.detail-copy h1 {
  font-size:clamp(3.8rem,7vw,6rem);
  margin-bottom:18px
}
.detail-meta {
  font-size:12px;
  color:var(--muted)
}
.detail-meta>span {
  color:var(--gold);
  margin-inline:10px
}
.detail-score {
  font:42px 'Bebas Neue',sans-serif;
  color:var(--gold)
}
.detail-score>span {
  font-size:25px
}
.detail-score small {
  font:14px Poppins,sans-serif;
  color:var(--muted);
  margin-left:5px
}
.detail-divider {
  height:1px;
  background:var(--line);
  margin-block:25px
}
.review {
  font-size:17px;
  line-height:1.9;
  max-width:600px
}
.detail-body,.watched-date {
  color:var(--muted);
  font-size:12px
}
.watched-date {
  margin-bottom:25px
}
.dot {
  height:4px;
  width:4px;
  background:var(--gold);
  border-radius:50%
}
.stats-content {
  padding-bottom:80px
}
.stats-overview {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  margin-bottom:30px
}
.stats-overview>div {
  display:flex;
  flex-direction:column;
  background:var(--surface);
  border:1px solid var(--line);
  padding:22px 15px;
  border-radius:7px
}
.stats-overview strong {
  font:42px 'Bebas Neue',sans-serif
}
.stats-overview span:last-child {
  color:var(--muted);
  font-size:10px
}
.stat-icon {
  color:var(--gold);
  margin-bottom:10px
}
.chart-grid {
  display:grid;
  gap:20px
}
.chart-card {
  padding:25px;
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:7px;
  min-width:0
}
.chart-card .eyebrow {
  font-size:8px;
  margin-bottom:10px
}
.chart-card h2 {
  font-size:28px;
  margin-bottom:25px
}
.chart-wrap {
  position:relative;
  height:270px
}
.stats-note {
  color:var(--muted);
  font-size:10px;
  margin-top:20px
}
.stats-table {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 7px;
  font-size: 12px;
}
.stats-table summary {
  cursor: pointer;
  color: var(--gold);
}
.table-scroll {
  overflow-x: auto;
}
.stats-table table {
  border-collapse: collapse;
  width: 100%;
  text-align: left;
}
.stats-table th,.stats-table td {
  padding: 12px;
  border-bottom: 1px solid var(--line);
}
.stats-table caption {
  text-align: left;
  padding: 15px 12px;
  color: var(--muted);
}
.about-content {
  display:grid;
  gap:40px;
  padding-bottom:90px
}
.about-art {
  display:flex;
  min-height:300px;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  border-radius:7px;
  border:1px solid var(--line);
  background:radial-gradient(circle,#87333b40,transparent 70%),var(--surface)
}
.about-reel {
  display:grid;
  place-items:center;
  width:170px;
  height:170px;
  border-radius:50%;
  border:14px double var(--gold);
  font-size:100px;
  color:var(--gold);
  line-height:1;
  animation:reel-spin 60s linear infinite
}
.about-art>span {
  color:var(--muted);
  font-size:8px;
  letter-spacing:.2em;
  margin-top:30px
}
.about-copy>p:not(.eyebrow) {
  color:var(--muted);
  font-size:13px;
  line-height:1.95
}
.about-copy .button {
  margin-top:14px
}
.about-copy h2 {
  font-size:3.5rem
}
@media(min-width:600px) {
  .container {
    width:min(1180px,calc(100% - 64px))
  }
  .hero-content {
    padding-block:75px 50px
  }
  .hero-stats b {
    display:inline
  }
  .hero-reel {
    right:-130px
  }
  .filter-row {
    flex-direction:row
  }
  .filter-label {
    flex:0 0 60px
  }
  .detail-grid {
    grid-template-columns:1fr 1.4fr
  }
  .stats-overview>div {
    padding:25px
  }
  .chart-grid {
    grid-template-columns:repeat(2,minmax(0,1fr))
  }
  .chart-wide {
    grid-column:1/-1
  }
  .about-content {
    grid-template-columns:1fr 1.3fr
  }
  .hero-stats span {
    font-size:10px
  }
}
@media(min-width:960px) {
  .menu-toggle {
    display:none
  }
  .nav-links,.nav-links.open {
    display:flex;
    position:static;
    flex-direction:row;
    align-items:center;
    gap:27px;
    padding:0;
    border:0;
    background:transparent
  }
  .nav-links>a[aria-current]:after {
    content:'';
    position:absolute;
    bottom:-27px;
    left:0;
    right:0;
    height:2px;
    background:var(--gold)
  }
  .hero-content {
    padding-block:75px 45px
  }
  .hero-reel {
    width:450px;
    height:450px;
    right:5%;
    top:75px;
    opacity:.85;
    background-size:auto
  }
  .reel-two {
    width:230px;
    height:230px;
    right:2%;
    top:410px;
    opacity:.25
  }
  .film-strip {
    right:-80px;
    opacity:.6
  }
  .hero-side-note {
    display:block;
    position:absolute;
    right:25px;
    bottom:65px;
    writing-mode:vertical-rl;
    font-size:8px;
    letter-spacing:.3em;
    color:var(--muted)
  }
  .section {
    padding-block:65px
  }
  .section-heading .eyebrow {
    font-size:9px
  }
  .detail-grid {
    grid-template-columns:360px 1fr;
    gap:65px
  }
  .detail-copy {
    padding-top:25px
  }
  .about-content {
    gap:75px;
    align-items:center
  }
  .about-art {
    min-height:440px
  }
  .about-copy {
    max-width:520px
  }
  .hero-stats {
    margin-top:38px
  }
}
@keyframes page-in {
  from {
    opacity:0
  }
  to {
    opacity:1
  }
}
@keyframes type-in {
  from {
    width:0
  }
  to {
    width:32ch
  }
}
@keyframes blink {
  50% {
    opacity:0
  }
}
@keyframes reel-spin {
  to {
    transform:rotate(360deg)
  }
}
@keyframes pulse {
  50% {
    box-shadow:0 0 0 6px #d45a5f05;
    opacity:.65
  }
}
@keyframes card-glow {
  50% {
    box-shadow:0 0 25px #9e303825
  }
}
@keyframes reveal-in {
  from {
    opacity:0;
    translate:0 18px
  }
  to {
    opacity:1;
    translate:0 0
  }
}
.reveal.visible {
  animation:reveal-in .7s ease both
}
@media(prefers-reduced-motion:reduce) {
  html {
    scroll-behavior:auto
  }
  *,*:before,*:after {
    animation:none!important;
    transition:none!important
  }
  .typing-text {
    width:auto
  }
  .cursor {
    display:none
  }
}
```

### assets/favicon.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#100d0f"/><circle cx="32" cy="32" r="22" fill="#d7ac67"/><g fill="#100d0f"><circle cx="32" cy="18" r="6"/><circle cx="46" cy="32" r="6"/><circle cx="32" cy="46" r="6"/><circle cx="18" cy="32" r="6"/><circle cx="32" cy="32" r="3"/></g></svg>
```

### assets/js/main.js

```javascript
(() => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const themeButton = document.querySelector('.theme-toggle');
  const updateThemeButton = () => {
    const light = root.dataset.theme === 'light';
    themeButton?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
    const icon = themeButton?.querySelector('.theme-icon');
    if (icon) icon.textContent = light ? '☾' : '☼';
  };
  updateThemeButton();
  themeButton?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('reeldiary-theme', root.dataset.theme); } catch (e) { /* storage may be disabled */ }
    updateThemeButton();
    window.dispatchEvent(new Event('reeldiary:theme'));
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open menu');
    navLinks?.classList.remove('open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    navLinks?.classList.toggle('open', open);
  });
  navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!event.target.closest('.nav') && navLinks?.classList.contains('open')) closeMenu();
  });

  const header = document.getElementById('site-header');
  const setHeader = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', setHeader, { passive: true });
  setHeader();

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 35px 0px' });
    revealElements.forEach(element => {
      if (element.classList.contains('movie-card')) element.classList.add('reveal-pending');
      observer.observe(element);
    });
  } else revealElements.forEach(element => element.classList.add('visible'));

  const animateCount = (element, target) => {
    if (prefersReducedMotion) { element.textContent = String(target); return; }
    const start = performance.now();
    const duration = 1150;
    const tick = now => {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const counts = document.querySelectorAll('.count-up');
  if (counts.length) {
    const genreCounts = {};
    document.querySelectorAll('.movie-data [data-status="watched"]').forEach(movie => {
      const genre = movie.dataset.genre;
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
    const favorite = Object.entries(genreCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
    const favoriteCount = document.querySelector('[data-favorite-count]');
    const favoriteLabel = document.querySelector('[data-favorite-genre]');
    if (favoriteCount) favoriteCount.dataset.target = favorite ? String(favorite[1]) : '0';
    if (favoriteLabel) favoriteLabel.textContent = favorite ? `· ${favorite[0]}` : '';
    const runCounters = () => counts.forEach(el => animateCount(el, Number(el.dataset.target || 0)));
    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { runCounters(); counterObserver.disconnect(); }
      }, { threshold: 0.3 });
      counterObserver.observe(document.querySelector('.hero-stats'));
    } else runCounters();
  }

  if (!prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.movie-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--tilt-x', `${-y * 3}deg`);
        card.style.setProperty('--tilt-y', `${x * 3}deg`);
        card.style.setProperty('--shine-x', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--shine-y', `${(y + 0.5) * 100}%`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  const archive = document.querySelector('[data-archive]');
  if (archive) {
    const grid = document.getElementById('archive-grid');
    const cards = [...grid.querySelectorAll('.movie-card')];
    const search = document.getElementById('movie-search');
    const sort = document.getElementById('movie-sort');
    const state = { genre: 'all', year: 'all', rating: 'all', status: 'all', format: 'all', cinema: 'all', language: 'all' };
    const labels = { status: { watched: 'Watched', watching: 'Watching', watchlist: 'Watchlist' } };
    const unique = key => [...new Set(cards.map(card => card.dataset[key]))].sort((a, b) => key === 'year' ? Number(b) - Number(a) : a.localeCompare(b));
    const makeFilters = (key, values) => {
      const container = archive.querySelector(`[data-filter="${key}"]`);
      values.forEach((value, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `filter-button${index === 0 ? ' active' : ''}`;
        button.dataset.value = value;
        button.setAttribute('aria-pressed', String(index === 0));
        button.textContent = value === 'all' ? 'All' : key === 'rating' ? `${value}+` : labels[key]?.[value] || value;
        button.addEventListener('click', () => {
          state[key] = value;
          container.querySelectorAll('button').forEach(item => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', String(active));
          });
          applyFilters();
        });
        container.append(button);
      });
    };
    makeFilters('genre', ['all', ...unique('genre')]);
    makeFilters('year', ['all', ...unique('year')]);
    makeFilters('rating', ['all', '9', '8', '7']);
    makeFilters('status', ['all', 'watched', 'watching', 'watchlist']);
    makeFilters('format', ['all', ...new Set(['Movie', 'Web Series', 'Short Film', ...unique('format')])]);
    makeFilters('cinema', ['all', ...new Set(['Hollywood', 'Bollywood', 'Korean', 'Gujarati', ...unique('cinema')])]);
    makeFilters('language', ['all', ...unique('language')]);

    const applyFilters = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const sorted = [...cards].sort((a, b) => {
        if (sort.value === 'oldest') return Number(a.dataset.year) - Number(b.dataset.year) || a.dataset.title.localeCompare(b.dataset.title);
        if (sort.value === 'rating') return Number(b.dataset.rating) - Number(a.dataset.rating) || Number(b.dataset.year) - Number(a.dataset.year);
        if (sort.value === 'az') return a.dataset.title.localeCompare(b.dataset.title);
        return Number(b.dataset.year) - Number(a.dataset.year) || a.dataset.title.localeCompare(b.dataset.title);
      });
      let visible = 0;
      sorted.forEach(card => {
        const match = card.dataset.title.includes(query) &&
          (state.genre === 'all' || card.dataset.genre === state.genre) &&
          (state.year === 'all' || card.dataset.year === state.year) &&
          (state.rating === 'all' || Number(card.dataset.rating) >= Number(state.rating)) &&
          (state.status === 'all' || card.dataset.status === state.status) &&
          (state.format === 'all' || card.dataset.format === state.format) &&
          (state.cinema === 'all' || card.dataset.cinema === state.cinema) &&
          (state.language === 'all' || card.dataset.language === state.language);
        card.hidden = !match;
        if (match) visible++;
        grid.append(card);
      });
      document.getElementById('result-count').textContent = `${visible} title${visible === 1 ? '' : 's'}`;
      document.getElementById('no-results').hidden = visible !== 0;
    };
    search.addEventListener('input', applyFilters);
    sort.addEventListener('change', applyFilters);
    applyFilters();
  }
})();
```

### assets/js/scene-core.mjs

```javascript
export const SCENES = { beginning: 'Beginning', interval: 'Interval', climax: 'Climax', ending: 'Ending', custom: 'Timestamp' };
export const MOODS = { '🥰': 'Loved it', '😂': 'Made me laugh', '😢': 'Moved me', '😮': 'Surprised me', '🤯': 'Mind blown', '😡': 'Frustrated me' };
export const REACTIONS = { '❤️': 'Love', '😂': 'Laugh', '😮': 'Surprise', '😢': 'Moved' };

export function parseTimestamp(value) {
  const text = String(value).trim();
  if (!/^\d{1,2}:\d{2}(?::\d{2})?$/.test(text)) return null;
  const parts = text.split(':').map(Number);
  const [hours, minutes, seconds] = parts.length === 3 ? parts : [0, ...parts];
  if (minutes > 59 || seconds > 59) return null;
  return hours * 3600 + minutes * 60 + seconds;
}

export function formatTimestamp(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const rest = String(seconds % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${rest}` : `${minutes}:${rest}`;
}

export function validateThought(input) {
  if (!Object.hasOwn(SCENES, input.scene)) throw new Error('Choose a scene first.');
  const body = input.body.trim();
  if (body.length < 3 || body.length > 1000) throw new Error('Write a thought between 3 and 1000 characters.');
  if (!Object.hasOwn(MOODS, input.mood)) throw new Error('Choose a mood.');
  const timestamp = input.scene === 'custom' ? parseTimestamp(input.timestamp) : null;
  if (input.scene === 'custom' && timestamp === null) throw new Error('Enter a timestamp such as 12:30 or 1:45:20.');
  return { scene: input.scene, body, mood: input.mood, spoiler: Boolean(input.spoiler), timestamp_seconds: timestamp };
}

export function rankThoughts(thoughts, scene = 'all') {
  return [...thoughts].sort((a, b) => {
    const matchA = scene !== 'all' && a.scene === scene ? 1 : 0;
    const matchB = scene !== 'all' && b.scene === scene ? 1 : 0;
    return matchB - matchA || Number(b.reaction_total) - Number(a.reaction_total) ||
      Date.parse(b.created_at) - Date.parse(a.created_at) || b.id.localeCompare(a.id);
  });
}
```

### assets/js/scene-store.js

```javascript
import { rankThoughts } from './scene-core.mjs';

function readStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}

class LocalSceneStore {
  mode = 'local';
  constructor(movieId) { this.key = `reeldiary-scenes-v1:${movieId}`; }
  read() {
    const entries = readStorage(this.key, []);
    if (!Array.isArray(entries)) throw new Error('Saved thoughts could not be read.');
    return entries;
  }
  write(entries) {
    try { localStorage.setItem(this.key, JSON.stringify(entries)); }
    catch { throw new Error('Your browser could not save this thought. Check that local storage is enabled.'); }
  }
  async list(scene, offset, limit) {
    const thoughts = this.read().map(entry => ({ ...entry,
      reaction_counts: entry.reactions || {},
      my_reactions: Object.keys(entry.reactions || {}),
      reaction_total: Object.values(entry.reactions || {}).reduce((sum, value) => sum + value, 0),
      is_own: true
    }));
    return rankThoughts(thoughts, scene).slice(offset, offset + limit);
  }
  async create(thought) {
    const entries = this.read();
    entries.push({ ...thought, id: crypto.randomUUID(), created_at: new Date().toISOString(), reactions: {} });
    this.write(entries);
  }
  async react(id, emoji) {
    const entries = this.read();
    const entry = entries.find(item => item.id === id);
    if (!entry) throw new Error('This thought is no longer available. Refresh the list.');
    entry.reactions ||= {};
    if (entry.reactions[emoji]) delete entry.reactions[emoji];
    else entry.reactions[emoji] = 1;
    this.write(entries);
  }
}

class SharedSceneStore {
  mode = 'shared';
  constructor(url, key, movieId) {
    this.url = url.replace(/\/$/, '');
    this.key = key;
    this.movieId = movieId;
    this.sessionKey = `reeldiary-session:${this.url}`;
    try { this.session = readStorage(this.sessionKey, null); } catch { this.session = null; }
  }
  async request(path, { method = 'GET', body, token } = {}) {
    const headers = { apikey: this.key, 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(`${this.url}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: controller.signal });
      if (!response.ok) {
        if (response.status === 429) throw new Error('Too many requests. Please wait a moment and try again.');
        if (response.status === 401 || response.status === 403) throw new Error('The shared diary could not authorize this action. Check the Scene Thoughts setup.');
        throw new Error('The shared diary is unavailable. Please try again.');
      }
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    } catch (error) {
      if (error.name === 'AbortError' || error instanceof TypeError) throw new Error('Could not reach the shared diary. Check your connection and retry.');
      throw error;
    } finally { clearTimeout(timer); }
  }
  async authenticate(required = false) {
    if (!this.session && !required) return null;
    if (this.session?.expires_at > Date.now() / 1000 + 60) return this.session.access_token;
    if (!this.authPromise) {
      this.authPromise = (async () => {
        const refreshing = Boolean(this.session?.refresh_token);
        const result = await this.request(refreshing ? '/auth/v1/token?grant_type=refresh_token' : '/auth/v1/signup', {
          method: 'POST', body: refreshing ? { refresh_token: this.session.refresh_token } : {}
        });
        this.session = { access_token: result.access_token, refresh_token: result.refresh_token,
          user_id: result.user.id, expires_at: result.expires_at || Date.now() / 1000 + result.expires_in };
        try { localStorage.setItem(this.sessionKey, JSON.stringify(this.session)); } catch { /* session lasts until this tab closes */ }
        return this.session.access_token;
      })().finally(() => { this.authPromise = null; });
    }
    return this.authPromise;
  }
  async list(scene, offset, limit) {
    const token = await this.authenticate();
    return await this.request('/rest/v1/rpc/get_scene_thoughts', { method: 'POST', token,
      body: { p_movie_id: this.movieId, p_scene: scene, p_limit: limit, p_offset: offset } });
  }
  async create(thought) {
    const token = await this.authenticate(true);
    await this.request('/rest/v1/scene_thoughts', { method: 'POST', token,
      body: { ...thought, movie_id: this.movieId } });
  }
  async react(id, emoji, active) {
    const token = await this.authenticate(true);
    if (active) {
      const query = new URLSearchParams({ thought_id: `eq.${id}`, user_id: `eq.${this.session.user_id}`, emoji: `eq.${emoji}` });
      await this.request(`/rest/v1/scene_reactions?${query}`, { method: 'DELETE', token });
    } else {
      await this.request('/rest/v1/scene_reactions', { method: 'POST', token, body: { thought_id: id, emoji } });
    }
  }
}

export function createSceneStore({ url, key, movieId }) {
  if (!url && !key) return new LocalSceneStore(movieId);
  if (!url || !key || !/^https:\/\//.test(url) || key.startsWith('sb_secret_')) {
    throw new Error('Scene Thoughts needs a valid Supabase URL and public key.');
  }
  return new SharedSceneStore(url, key, movieId);
}
```

### assets/js/scene-thoughts.js

```javascript
import { SCENES, MOODS, REACTIONS, formatTimestamp, validateThought } from './scene-core.mjs';
import { createSceneStore } from './scene-store.js';

const section = document.getElementById('scene-thoughts');
if (section) initializeSceneThoughts(section);

function initializeSceneThoughts(section) {
  const find = selector => section.querySelector(selector);
  const form = find('#scene-form');
  const list = find('#scene-list');
  const message = find('#scene-message');
  const more = find('#more-thoughts');
  const hideSpoilers = find('#hide-spoilers');
  const state = { scene: 'all', thoughts: [], revealed: new Set(), request: 0, reacting: false };
  const pageSize = 20;
  const notify = (text, error = false) => {
    message.textContent = text;
    message.classList.toggle('is-error', error);
  };
  let store;
  try {
    store = createSceneStore({ url: section.dataset.supabaseUrl, key: section.dataset.publicKey, movieId: section.dataset.movieId });
  } catch (error) {
    notify(error.message, true);
    find('#post-thought').disabled = true;
    list.setAttribute('aria-busy', 'false');
    return;
  }
  find('#scene-storage-note').textContent = store.mode === 'local'
    ? 'Local preview · Thoughts and reactions are saved only in this browser. They are not shared with other visitors yet.'
    : 'Shared diary · Thoughts are public. Your browser remembers your reactions without an email or password.';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function render() {
    list.replaceChildren();
    if (!state.thoughts.length) {
      list.append(element('p', 'empty-state', 'No thoughts pinned yet. Which moment stayed with you?'));
      find('#scene-count').textContent = 'Be the first';
      return;
    }
    find('#scene-count').textContent = `${state.thoughts.length} thought${state.thoughts.length === 1 ? '' : 's'} shown`;
    for (const thought of state.thoughts) {
      const card = element('article', 'thought-card');
      card.dataset.thoughtId = thought.id;
      card.classList.toggle('is-match', state.scene !== 'all' && thought.scene === state.scene);
      const heading = element('div', 'thought-heading');
      const title = element('h3');
      const mood = element('span', 'thought-mood', thought.mood);
      mood.setAttribute('role', 'img');
      mood.setAttribute('aria-label', MOODS[thought.mood] || 'Mood');
      title.append(mood, document.createTextNode(thought.scene === 'custom'
        ? `At ${formatTimestamp(thought.timestamp_seconds)}` : SCENES[thought.scene]));
      const time = element('time', 'thought-date', new Date(thought.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }));
      time.dateTime = thought.created_at;
      heading.append(title, time);
      card.append(heading);
      const content = element('div');
      const showBody = () => {
        content.replaceChildren(element('p', 'thought-body', thought.body));
      };
      if (thought.spoiler && hideSpoilers.checked && !state.revealed.has(thought.id)) {
        const reveal = element('button', 'spoiler-reveal', 'Spoiler hidden · Click to reveal');
        reveal.type = 'button';
        reveal.addEventListener('click', () => {
          state.revealed.add(thought.id);
          showBody();
          const body = content.querySelector('.thought-body');
          body.tabIndex = -1;
          body.focus({ preventScroll: true });
        });
        content.append(reveal);
      } else showBody();
      card.append(content);
      const reactions = element('div', 'thought-reactions');
      reactions.setAttribute('role', 'group');
      reactions.setAttribute('aria-label', 'React to this thought');
      for (const [emoji, label] of Object.entries(REACTIONS)) {
        const count = Number(thought.reaction_counts?.[emoji] || 0);
        const active = thought.my_reactions?.includes(emoji) || false;
        const button = element('button', 'reaction-button', `${emoji} ${count}`);
        button.type = 'button';
        button.dataset.emoji = emoji;
        button.setAttribute('aria-label', `${label}: ${count} reaction${count === 1 ? '' : 's'}`);
        button.setAttribute('aria-pressed', String(active));
        button.addEventListener('click', async () => {
          if (state.reacting) return;
          state.reacting = true;
          list.querySelectorAll('.reaction-button').forEach(item => { item.disabled = true; });
          try {
            await store.react(thought.id, emoji, active);
            await reload();
            const updatedCard = [...list.children].find(item => item.dataset.thoughtId === thought.id);
            [...(updatedCard?.querySelectorAll('.reaction-button') || [])].find(item => item.dataset.emoji === emoji)?.focus({ preventScroll: true });
            notify(active ? 'Reaction removed.' : 'Reaction added.');
          } catch (error) { notify(error.message, true); }
          finally {
            state.reacting = false;
            list.querySelectorAll('.reaction-button').forEach(item => { item.disabled = false; });
          }
        });
        reactions.append(button);
      }
      const total = Number(thought.reaction_total || 0);
      reactions.append(element('span', 'reaction-total', `${total} reaction${total === 1 ? '' : 's'}`));
      card.append(reactions);
      list.append(card);
    }
  }

  async function reload(append = false) {
    const request = ++state.request;
    list.setAttribute('aria-busy', 'true');
    more.disabled = true;
    try {
      const thoughts = await store.list(state.scene, append ? state.thoughts.length : 0, pageSize);
      if (request !== state.request) return;
      state.thoughts = append ? [...state.thoughts, ...thoughts.filter(item => !state.thoughts.some(old => old.id === item.id))] : thoughts;
      more.hidden = thoughts.length < pageSize;
      render();
    } finally {
      if (request === state.request) { list.setAttribute('aria-busy', 'false'); more.disabled = false; }
    }
  }

  const updateTimestamp = () => {
    const custom = find('#thought-scene').value === 'custom';
    find('#timestamp-field').hidden = !custom;
    find('#thought-timestamp').required = custom;
  };
  find('#thought-scene').addEventListener('change', updateTimestamp);
  find('#thought-body').addEventListener('input', event => { find('#thought-character-count').textContent = event.target.value.length; });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const button = find('#post-thought');
    if (button.disabled) return;
    try {
      const fields = new FormData(form);
      const thought = validateThought({ scene: fields.get('scene'), body: fields.get('body'), mood: fields.get('mood'), timestamp: fields.get('timestamp'), spoiler: fields.has('spoiler') });
      button.disabled = true;
      await store.create(thought);
      form.reset();
      updateTimestamp();
      find('#thought-character-count').textContent = '0';
      await reload();
      notify(store.mode === 'local' ? 'Thought saved in this browser.' : 'Your thought is now shared.');
    } catch (error) { notify(error.message, true); }
    finally { button.disabled = false; }
  });
  find('.scene-filters').addEventListener('click', async event => {
    const button = event.target.closest('[data-scene]');
    if (!button) return;
    state.scene = button.dataset.scene;
    find('.scene-filters').querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    find('#scene-ranking').textContent = state.scene === 'all' ? 'Most reactions first, then newest.' : `${SCENES[state.scene]} matches first, then most reactions, then newest. Other scenes follow.`;
    notify('');
    try { await reload(); } catch (error) { notify(error.message, true); }
  });
  hideSpoilers.addEventListener('change', () => { state.revealed.clear(); render(); });
  more.addEventListener('click', async () => { try { await reload(true); } catch (error) { notify(error.message, true); } });
  find('#refresh-thoughts').addEventListener('click', async () => {
    notify('');
    try { await reload(); notify('Thoughts refreshed.'); } catch (error) { notify(error.message, true); }
  });
  window.addEventListener('storage', event => {
    if (event.key === store.key) reload().catch(error => notify(error.message, true));
  });
  reload().catch(error => notify(error.message, true));
}
```

### assets/js/stats.js

```javascript
(() => {
  const data = [...document.querySelectorAll('#stats-data span')].map(item => ({
    year: item.dataset.year, genre: item.dataset.genre, rating: Number(item.dataset.rating)
  }));
  if (!data.length || typeof Chart === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) Chart.defaults.animation = false;

  const countBy = key => data.reduce((counts, item) => {
    counts[item[key]] = (counts[item[key]] || 0) + 1;
    return counts;
  }, {});
  const years = countBy('year');
  const genres = countBy('genre');
  const ratings = countBy('rating');
  document.getElementById('ratings-empty').hidden = data.some(item => item.rating >= 1 && item.rating <= 10);
  const yearLabels = Object.keys(years).sort((a, b) => Number(a) - Number(b));
  const genreLabels = Object.keys(genres).sort((a, b) => genres[b] - genres[a]);
  const ratingLabels = Array.from({ length: 10 }, (_, index) => String(index + 1));
  const charts = [];
  const palette = ['#d8b777', '#942c3b', '#a99065', '#682b36', '#d7c8a8', '#4d343b', '#877557'];
  const colors = () => ({ text: getComputedStyle(document.documentElement).getPropertyValue('--muted').trim(), grid: getComputedStyle(document.documentElement).getPropertyValue('--chart-grid').trim() });
  const common = () => ({
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#21191b', titleColor: '#fff', bodyColor: '#fff', padding: 12, cornerRadius: 8 } },
    scales: { x: { ticks: { color: colors().text }, grid: { display: false }, border: { display: false } }, y: { beginAtZero: true, ticks: { color: colors().text, precision: 0, stepSize: 1 }, grid: { color: colors().grid }, border: { display: false } } }
  });
  charts.push(new Chart(document.getElementById('year-chart'), { type: 'bar', data: { labels: yearLabels, datasets: [{ data: yearLabels.map(year => years[year]), backgroundColor: '#d7ac67', borderRadius: 6, maxBarThickness: 44 }] }, options: common() }));
  charts.push(new Chart(document.getElementById('genre-chart'), { type: 'doughnut', data: { labels: genreLabels, datasets: [{ data: genreLabels.map(genre => genres[genre]), backgroundColor: palette, borderWidth: 0, hoverOffset: 8 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'bottom', labels: { color: colors().text, padding: 16, usePointStyle: true, pointStyle: 'circle' } }, tooltip: { backgroundColor: '#21191b', padding: 12, cornerRadius: 8 } } } }));
  charts.push(new Chart(document.getElementById('rating-chart'), { type: 'bar', data: { labels: ratingLabels, datasets: [{ data: ratingLabels.map(rating => ratings[rating] || 0), backgroundColor: ratingLabels.map(rating => Number(rating) >= 8 ? '#d7ac67' : '#803b3f'), borderRadius: 6, maxBarThickness: 52 }] }, options: common() }));

  window.addEventListener('reeldiary:theme', () => {
    charts.forEach((chart, index) => {
      if (index === 1) chart.options.plugins.legend.labels.color = colors().text;
      else {
        chart.options.scales.x.ticks.color = colors().text;
        chart.options.scales.y.ticks.color = colors().text;
        chart.options.scales.y.grid.color = colors().grid;
      }
      chart.update();
    });
  });
})();
```

### assets/poster-fallback.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600"><defs><radialGradient id="g"><stop stop-color="#59242e"/><stop offset="1" stop-color="#171115"/></radialGradient></defs><path fill="url(#g)" d="M0 0h400v600H0z"/><g fill="none" stroke="#d7ac67" opacity=".7"><circle cx="200" cy="265" r="80"/><circle cx="200" cy="265" r="12"/><circle cx="200" cy="218" r="20"/><circle cx="245" cy="280" r="20"/><circle cx="165" cy="298" r="20"/></g><text x="200" y="400" fill="#d7ac67" font-family="sans-serif" font-size="24" text-anchor="middle" letter-spacing="5">REELDIARY</text><text x="200" y="433" fill="#a29998" font-family="sans-serif" font-size="12" text-anchor="middle">A STORY WORTH REMEMBERING</text></svg>
```

### about/index.html

```html
---
title: About
permalink: /about/
description: Why I keep a diary of the films I watch.
---
<section class="page-heading container"><p class="eyebrow">A NOTE FROM THE CURATOR</p><h1>HELLO, <em>FELLOW FILM LOVER.</em></h1><p>Welcome to the little archive in my head, made visible.</p></section>
<section class="about-content container"><div class="about-art reveal" aria-hidden="true"><div class="about-reel">✦</div><span>EST. 2026 / ALWAYS ROLLING</span></div><div class="about-copy reveal"><p class="eyebrow">WHY REELDIARY EXISTS</p><h2>Because stories<br><em>deserve to stay.</em></h2><p>Movies have a way of finding us at just the right moment. ReelDiary is where I keep the ones I’ve watched, the ones I’m living with now, and the ones I can’t wait to discover.</p><p>The ratings are personal, the notes are honest, and the watchlist is always longer than it should be. Think of this as an open notebook for anyone who loves the feeling of the lights going down.</p><a class="button button-primary" href="{{ '/movies/' | relative_url }}">Browse the diary <span aria-hidden="true">↗</span></a></div></section>
```

### movies/index.html

```html
---
title: All Movies
permalink: /movies/
description: Browse every film in the ReelDiary collection.
---
<section class="page-heading container"><p class="eyebrow">THE COMPLETE COLLECTION</p><h1>THE SCREEN <em>ARCHIVE.</em></h1><p>Movies, web series, and short films. Every language, every story.</p></section>
<section class="archive container" data-archive>
  <div class="archive-toolbar"><label class="search-field"><span aria-hidden="true">⌕</span><span class="sr-only">Search movies by title</span><input id="movie-search" type="search" placeholder="Search a title..." autocomplete="off"></label><label class="sort-field">Sort by <select id="movie-sort" aria-label="Sort movies"><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="rating">Highest rated</option><option value="az">A–Z</option></select></label></div>
  <div class="filter-panel">
    <div class="filter-row"><span class="filter-label">FORMAT</span><div class="filter-options" data-filter="format"></div></div>
    <div class="filter-row"><span class="filter-label">CINEMA</span><div class="filter-options" data-filter="cinema"></div></div>
    <div class="filter-row"><span class="filter-label">LANGUAGE</span><div class="filter-options" data-filter="language"></div></div>
    <div class="filter-row"><span class="filter-label">GENRE</span><div class="filter-options" data-filter="genre"></div></div>
    <div class="filter-row"><span class="filter-label">YEAR</span><div class="filter-options" data-filter="year"></div></div>
    <div class="filter-row"><span class="filter-label">RATING</span><div class="filter-options" data-filter="rating"></div></div>
    <div class="filter-row"><span class="filter-label">STATUS</span><div class="filter-options" data-filter="status"></div></div>
  </div>
  <div class="archive-count"><span id="result-count" role="status" aria-live="polite">{{ site.movies | size }} titles</span><span class="rule"></span></div>
  <div class="movie-grid" id="archive-grid">{% for movie in site.movies %}{% include movie-card.html movie=movie %}{% endfor %}</div>
  <p class="empty-state" id="no-results" hidden>No titles match those filters yet. Try another search.</p>
</section>
```

### stats/index.html

```html
---
title: Stats
permalink: /stats/
description: A visual look at the films, genres, and ratings in ReelDiary.
---
{% assign watched = site.movies | where: 'status', 'watched' %}
{% assign watching = site.movies | where: 'status', 'watching' %}
<section class="page-heading container"><p class="eyebrow">BEHIND THE NUMBERS</p><h1>THE BIG <em>PICTURE.</em></h1><p>A few ways to see a movie habit take shape.</p></section>
<section class="container stats-content">
  <div class="stats-overview reveal"><div><span class="stat-icon">▣</span><strong>{{ site.movies | size }}</strong><span>Total titles</span></div><div><span class="stat-icon">★</span><strong>{{ watched | size }}</strong><span>Watched</span></div><div><span class="stat-icon">◉</span><strong>{{ watching | size }}</strong><span>In progress</span></div></div>
  <div class="chart-grid"><div class="chart-card reveal"><p class="eyebrow">THE TIMELINE</p><h2>Films by year</h2><div class="chart-wrap"><canvas id="year-chart" role="img" aria-label="Bar chart showing movies by release year"></canvas></div></div><div class="chart-card reveal"><p class="eyebrow">THE MIX</p><h2>Genre split</h2><div class="chart-wrap"><canvas id="genre-chart" role="img" aria-label="Doughnut chart showing genre split"></canvas></div></div><div class="chart-card chart-wide reveal"><p class="eyebrow">THE VERDICT</p><h2>Rating distribution</h2><div class="chart-wrap"><canvas id="rating-chart" role="img" aria-label="Bar chart showing rating distribution"></canvas></div></div></div>
  <p class="stats-note">Charts include movies, web series, and short films, including your watchlist. Years are release years; unrated titles are excluded from the rating chart.</p>
  <p class="stats-note" id="ratings-empty" hidden>No personal ratings yet. Add a rating to an entry to start your rating chart.</p>
  <details class="stats-table">
    <summary>View the chart data</summary>
    <div class="table-scroll">
      <table><caption>All diary entries</caption><thead><tr><th scope="col">Title</th><th scope="col">Format</th><th scope="col">Year</th><th scope="col">Genre</th><th scope="col">Rating</th></tr></thead><tbody>{% for movie in site.movies %}<tr><th scope="row">{{ movie.title }}</th><td>{{ movie.format }}</td><td>{{ movie.year }}</td><td>{{ movie.genre }}</td><td>{{ movie.rating | default: 'Unrated' }}</td></tr>{% endfor %}</tbody></table>
    </div>
  </details>
  <div id="stats-data" hidden>{% for movie in site.movies %}<span data-year="{{ movie.year }}" data-genre="{{ movie.genre | escape }}" data-rating="{{ movie.rating }}"></span>{% endfor %}</div>
</section>
```

### watched/index.html

```html
---
title: Watched
permalink: /watched/
description: All the films I have watched and reviewed.
---
{% assign watched = site.movies | where: 'status', 'watched' | sort: 'year' | reverse %}
<section class="page-heading container"><p class="eyebrow">ROLL THE CREDITS</p><h1>STORIES <em>WATCHED.</em></h1><p>The finished stories, the lasting impressions. Listed by release year.</p></section>
<section class="container section inner-list"><div class="movie-grid">{% for movie in watched %}{% include movie-card.html movie=movie %}{% endfor %}</div>{% if watched.size == 0 %}<p class="empty-state">No films logged yet. Your story starts with one.</p>{% endif %}</section>
```

### watching/index.html

```html
---
title: Currently Watching
permalink: /watching/
description: The films currently playing in my personal movie diary.
---
{% assign watching = site.movies | where: 'status', 'watching' %}
<section class="page-heading container"><p class="eyebrow"><span class="live-dot"></span> ON THE SCREEN RIGHT NOW</p><h1>CURRENTLY <em>WATCHING.</em></h1><p>Stories in progress. The final verdict can wait.</p></section>
<section class="container section inner-list"><div class="movie-grid">{% for movie in watching %}{% include movie-card.html movie=movie %}{% endfor %}</div>{% if watching.size == 0 %}<p class="empty-state">Nothing on the screen right now. Check back soon.</p>{% endif %}</section>
```

### supabase/README.md

````markdown
# Shared Scene Thoughts setup

GitHub Pages hosts the Jekyll site. Supabase stores public scene thoughts and reactions. No server code or JavaScript framework is added to the website.

1. Create a Supabase project at https://supabase.com/.
2. In **Authentication → Sign In / Providers**, enable **Anonymous Sign-Ins**. Visitors get an anonymous account when they first post or react; they do not enter an email address.
3. Open the SQL editor and run the complete `supabase/schema.sql` once. It creates the tables, permissions, posting limit, and ranking function.
4. Copy the project URL and publishable key (or legacy `anon` key) from the project's API settings.
5. Set the public configuration in `_config.yml`:

   ```yaml
   scene_thoughts:
     supabase_url: "https://YOUR-PROJECT.supabase.co"
     public_key: "YOUR-PUBLISHABLE-OR-ANON-KEY"
   ```

6. Restart Jekyll locally or push the change to rebuild GitHub Pages. Each detail page will say **Shared diary** instead of **Local preview**.
7. Open a detail page in two different browsers. Post a thought in one, refresh Scene Thoughts in the other, and react. Refresh in the first browser to see the updated count.

Use only a public key in the config; never put a `service_role` or `sb_secret_` key in a static site. Row Level Security is enforced for every write. The visitor ID and creation time come from Supabase, and each visitor can react once with each emoji to a thought. Clicking again removes that reaction. Separate browsers represent separate anonymous visitors.

Ranking happens in the database before pagination: matching scene first, total reactions second, creation time third, stable ID last. The page loads 20 thoughts at a time. A scene selection prioritizes that scene; other scenes remain below it. Refresh fetches other visitors' changes; the feature does not use a realtime subscription.

In local preview, data is stored only in that browser's localStorage, separated by title. Local preview comments are not uploaded automatically when shared mode is enabled. The site never silently falls back to local storage when a configured shared backend fails.

Owners can remove unwanted thoughts in Supabase's table editor; dependent reactions are deleted automatically. The schema limits each anonymous account to five new thoughts per minute. Supabase Auth's own rate limits also apply. If you enable a CAPTCHA requirement for anonymous sign-in, extend the form to collect its token and include it in the `/auth/v1/signup` request before publishing that configuration.

Implementation references: [anonymous sign-ins](https://supabase.com/docs/guides/auth/auth-anonymous), [Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security), and [public API keys](https://supabase.com/docs/guides/getting-started/api-keys).
````

### supabase/schema.sql

```sql
-- Run once in the Supabase SQL editor. The site uses only a public key.
create table public.scene_thoughts (
  id uuid primary key default gen_random_uuid(),
  movie_id text not null check (movie_id ~ '^[a-z0-9][a-z0-9-]{0,159}$'),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  scene text not null check (scene in ('beginning','interval','climax','ending','custom')),
  timestamp_seconds integer,
  body text not null check (char_length(btrim(body)) between 3 and 1000),
  mood text not null check (mood in ('🥰','😂','😢','😮','🤯','😡')),
  spoiler boolean not null default true,
  created_at timestamptz not null default now(),
  constraint valid_scene_timestamp check (
    (scene = 'custom' and timestamp_seconds is not null and timestamp_seconds between 0 and 359999)
    or (scene <> 'custom' and timestamp_seconds is null)
  )
);

create table public.scene_reactions (
  thought_id uuid not null references public.scene_thoughts(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  emoji text not null check (emoji in ('❤️','😂','😮','😢')),
  created_at timestamptz not null default now(),
  primary key (thought_id,user_id,emoji)
);

create index scene_thoughts_movie_date on public.scene_thoughts(movie_id,created_at desc);
create index scene_thoughts_user_date on public.scene_thoughts(user_id,created_at desc);
create index scene_reactions_user on public.scene_reactions(user_id);

alter table public.scene_thoughts enable row level security;
alter table public.scene_reactions enable row level security;

create policy "Public thoughts are readable" on public.scene_thoughts
  for select to anon,authenticated using (true);
create policy "Visitors create their own thoughts" on public.scene_thoughts
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Visitors can remove their own thoughts" on public.scene_thoughts
  for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Public reactions are readable" on public.scene_reactions
  for select to anon,authenticated using (true);
create policy "Visitors create their own reactions" on public.scene_reactions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Visitors remove their own reactions" on public.scene_reactions
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Clients cannot set identity, dates, or aggregate reaction counts.
revoke all on public.scene_thoughts,public.scene_reactions from anon,authenticated;
grant select on public.scene_thoughts,public.scene_reactions to anon,authenticated;
grant insert (movie_id,scene,timestamp_seconds,body,mood,spoiler) on public.scene_thoughts to authenticated;
grant insert (thought_id,emoji) on public.scene_reactions to authenticated;
grant delete on public.scene_thoughts,public.scene_reactions to authenticated;

-- Limit posting bursts for each anonymous account, including concurrent requests.
create function public.limit_scene_thought_posts() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtextextended(new.user_id::text,0));
  if (select count(*) from public.scene_thoughts
      where user_id = new.user_id and created_at > now() - interval '1 minute') >= 5 then
    raise exception 'Please wait a minute before posting another thought.';
  end if;
  return new;
end;
$$;
revoke all on function public.limit_scene_thought_posts() from public,anon,authenticated;
create trigger scene_thought_post_limit before insert on public.scene_thoughts
  for each row execute function public.limit_scene_thought_posts();

-- Rank the entire title's collection before pagination. RLS still applies.
create function public.get_scene_thoughts(
  p_movie_id text,
  p_scene text default 'all',
  p_limit integer default 20,
  p_offset integer default 0
) returns table (
  id uuid, scene text, timestamp_seconds integer, body text, mood text,
  spoiler boolean, created_at timestamptz, reaction_counts jsonb,
  my_reactions text[], reaction_total bigint, is_own boolean
)
language sql stable security invoker set search_path = '' as $$
  select t.id,t.scene,t.timestamp_seconds,t.body,t.mood,t.spoiler,t.created_at,
    r.counts,r.mine,r.total,coalesce(t.user_id = auth.uid(),false)
  from public.scene_thoughts t
  cross join lateral (
    select
      coalesce(jsonb_object_agg(grouped.emoji,grouped.n),'{}'::jsonb) as counts,
      coalesce(array_agg(grouped.emoji) filter (where grouped.is_mine),'{}'::text[]) as mine,
      coalesce(sum(grouped.n),0)::bigint as total
    from (
      select reaction.emoji,count(*) as n,bool_or(reaction.user_id = auth.uid()) as is_mine
      from public.scene_reactions reaction
      where reaction.thought_id = t.id
      group by reaction.emoji
    ) grouped
  ) r
  where t.movie_id = p_movie_id
  order by (p_scene <> 'all' and t.scene = p_scene) desc,
    r.total desc,t.created_at desc,t.id desc
  limit least(greatest(p_limit,1),100)
  offset greatest(p_offset,0);
$$;
revoke all on function public.get_scene_thoughts(text,text,integer,integer) from public;
grant execute on function public.get_scene_thoughts(text,text,integer,integer) to anon,authenticated;
```

### tests/scene-core.test.mjs

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseTimestamp, formatTimestamp, validateThought, rankThoughts } from '../assets/js/scene-core.mjs';

test('timestamps accept zero and hours, reject overflow and ambiguous input', () => {
  assert.equal(parseTimestamp('0:00'), 0);
  assert.equal(parseTimestamp('12:30'), 750);
  assert.equal(parseTimestamp('1:45:20'), 6320);
  assert.equal(formatTimestamp(6320), '1:45:20');
  for (const value of ['', '1:60', '-1:30', '100:00:00', '12:3', '2:70:10']) assert.equal(parseTimestamp(value), null);
});

test('scene match outranks popularity, then reactions outrank recency', () => {
  const thoughts = [
    { id: 'a', scene: 'ending', reaction_total: 40, created_at: '2026-10-03T12:00:00Z' },
    { id: 'b', scene: 'beginning', reaction_total: 1, created_at: '2026-10-01T12:00:00Z' },
    { id: 'c', scene: 'beginning', reaction_total: 1, created_at: '2026-10-02T12:00:00Z' },
    { id: 'd', scene: 'beginning', reaction_total: 3, created_at: '2026-09-01T12:00:00Z' }
  ];
  assert.deepEqual(rankThoughts(thoughts, 'beginning').map(item => item.id), ['d','c','b','a']);
  assert.deepEqual(rankThoughts(thoughts).map(item => item.id), ['a','d','c','b']);
  assert.deepEqual(thoughts.map(item => item.id), ['a','b','c','d']);
});

test('validation keeps user text intact and removes unrelated timestamps', () => {
  const input = { scene: 'beginning', body: '  <b>My thought</b>  ', mood: '😮', spoiler: true, timestamp: '1:02:03' };
  assert.deepEqual(validateThought(input), { scene: 'beginning', body: '<b>My thought</b>', mood: '😮', spoiler: true, timestamp_seconds: null });
  assert.equal(validateThought({ ...input, scene: 'custom', timestamp: '0:00' }).timestamp_seconds, 0);
  assert.throws(() => validateThought({ ...input, body: '  ' }));
  assert.throws(() => validateThought({ ...input, scene: 'custom', timestamp: 'bad' }));
  assert.throws(() => validateThought({ ...input, mood: 'unknown' }));
});
```

### index.html

```html
---
title: Home
description: A personal movie diary for the films that stay with me.
---
{% assign watched = site.movies | where: 'status', 'watched' %}
{% assign watching = site.movies | where: 'status', 'watching' %}
{% assign featured = watched | sort: 'year' | reverse %}
<section class="hero">
  <div class="hero-reel reel-one" aria-hidden="true"><span></span></div>
  <div class="hero-reel reel-two" aria-hidden="true"><span></span></div>
  <div class="film-strip strip-top" aria-hidden="true"></div>
  <div class="film-strip strip-bottom" aria-hidden="true"></div>
  <div class="hero-content container">
    <p class="eyebrow hero-kicker"><span class="line"></span> THE PERSONAL FILM ARCHIVE</p>
    <h1>EVERY FRAME<br><em>HAS A STORY.</em></h1>
    <p class="hero-tagline"><span class="typing-text">Every movie I've ever watched</span><span class="cursor" aria-hidden="true">|</span></p>
    <p class="hero-intro">Hollywood, Bollywood, Korean, and Gujarati stories. Movies, web series, and short films worth remembering.</p>
    <div class="hero-actions"><a class="button button-primary" href="{{ '/movies/' | relative_url }}">Explore the diary <span aria-hidden="true">↗</span></a><a class="text-link" href="{{ '/about/' | relative_url }}">The story behind it <span aria-hidden="true">→</span></a></div>
    <div class="hero-stats">
      <div><strong class="count-up" data-target="{{ watched | size }}">0</strong><span>Titles watched</span></div>
      <div><strong class="count-up" data-target="{{ watching | size }}">0</strong><span>Currently watching</span></div>
      <div><strong class="count-up" data-favorite-count>0</strong><span>Favorite genre <b data-favorite-genre></b></span></div>
    </div>
  </div>
  <span class="hero-side-note" aria-hidden="true">SCROLL TO EXPLORE ↓</span>
</section>

<div class="movie-data" hidden>{% for movie in site.movies %}<span data-genre="{{ movie.genre | escape }}" data-status="{{ movie.status }}"></span>{% endfor %}</div>

<section class="section container watching-section" id="currently-watching">
  <div class="section-heading reveal"><div><p class="eyebrow"><span class="live-dot"></span> ON THE SCREEN RIGHT NOW</p><h2>CURRENTLY <em>WATCHING</em></h2></div><a class="section-link" href="{{ '/watching/' | relative_url }}">View all <span aria-hidden="true">↗</span></a></div>
  {% if watching.size > 0 %}
    <div class="movie-grid">{% for movie in watching %}{% include movie-card.html movie=movie %}{% endfor %}</div>
  {% else %}<p class="empty-state">The screen is quiet for now. Pick a title from the watchlist.</p>{% endif %}
</section>

<section class="section feature-section"><div class="container"><div class="section-heading reveal"><div><p class="eyebrow">FROM YOUR WATCHED LIST</p><h2>STORIES <em>REMEMBERED</em></h2></div><a class="section-link" href="{{ '/watched/' | relative_url }}">The whole archive <span aria-hidden="true">↗</span></a></div><div class="movie-grid">{% for movie in featured limit: 4 %}{% include movie-card.html movie=movie %}{% endfor %}</div></div></section>

<section class="quote-section container reveal"><span class="quote-mark" aria-hidden="true">“</span><p>Some films end when the credits roll.<br><em>The best ones stay with you.</em></p><a class="button button-outline" href="{{ '/about/' | relative_url }}">More about this diary <span aria-hidden="true">↗</span></a></section>
```

### 404.html

```html
---
title: Page not found
permalink: /404.html
---
<section class="page-heading container"><p class="eyebrow">A MISSING FRAME</p><h1>SCENE <em>NOT FOUND.</em></h1><p>This page isn't in the archive.</p><a class="button button-primary" href="{{ '/' | relative_url }}">Back to the diary →</a></section>
```

### README.md

````markdown
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
````

### PENDING_TITLES.md

```markdown
# Titles awaiting clarification

These have not been published because the intended titles are unclear:

- `MUMPUS OFF`
- `YEAR AFTER` — Your Fault, After, or another title?
- `CAPUST SCOLL DAY COLLAGE DAY` — Campus Diaries, School Days, College Romance, or separate titles?
- More Hindi web series — exact titles not yet provided.
- `F*** the Prom? / The Network Million Dollar` — exact title(s) unclear.
- `The Title Story`
- `Rocket 2`
- `Love Aaj Kal` — 2009 or 2020 version?

All clearly identified entries are in `_movies/`. Supplied personal thoughts are preserved. Missing ratings, reviews, and watch dates are intentionally blank.
```

## Run step by step

1. Install Ruby with Devkit (Windows) and open a terminal in ReelDiary.
2. Install dependencies:

```powershell
gem install bundler
bundle install
```

3. Start the site:

```powershell
bundle exec jekyll serve
```

4. Open http://localhost:4000/ReelDiary/.

Shared Scene Thoughts requires the Supabase setup included above.
