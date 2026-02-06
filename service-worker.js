self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("sr-board").then(c =>
      c.addAll([
        "index.html",
        "detail.html",
        "settings.html",
        "style.css",
        "logic.js",
        "app.js"
      ])
    )
  );
});