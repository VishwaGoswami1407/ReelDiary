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
