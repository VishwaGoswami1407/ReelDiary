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
