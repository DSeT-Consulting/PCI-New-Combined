const CACHE_NAME = 'pci-v1.0.0';
const STATIC_CACHE = [
  '/',
  '/fonts/sora.css',
  '/fonts/sora-400-normal.woff2',
  '/fonts/sora-600-normal.woff2',
  '/fonts/sora-700-normal.woff2',
  '/assets/logo-lightbg.png',
  '/assets/home/pci-hero-slider6.png',
];

// Install event
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(STATIC_CACHE);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function() {
        return self.clients.claim();
      })
  );
});

// Fetch event - Cache first strategy for assets, network first for pages
self.addEventListener('fetch', function(event) {
  var request = event.request;
  var url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) return;

  // Cache first for static assets
  if (request.destination === 'image' ||
      request.destination === 'font' ||
      request.destination === 'style' ||
      request.url.includes('/assets/') ||
      request.url.includes('/fonts/')) {

    event.respondWith(
      caches.match(request)
        .then(function(response) {
          if (response) return response;

          return fetch(request)
            .then(function(response) {
              if (response.status === 200) {
                var responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            });
        })
    );
  }

  // Network first for pages and API calls
  else if (request.destination === 'document' || request.url.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(function(response) {
          if (response.status === 200 && request.destination === 'document') {
            var responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(function() {
          return caches.match(request);
        })
    );
  }
});