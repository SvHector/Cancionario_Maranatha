
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("cancionero-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "style.css",
        "app.js",
        "firebase-config.js",
        "icon-192.png",
        "icon-512.png",
        "manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
