self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('sery-cache').then(cache =>
      cache.addAll([
        './',
        './index.html',
        './detail.html',
        './settings.html',
        './style.css',
        './app.js',
        './logic.js',
        './data.js'
      ])
    )
  );
});