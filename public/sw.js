const CACHE_NAME = 'ninas-quest-v2'; // Bumped version to invalidate old cache

// Install Event
self.addEventListener('install', (e) => {
  self.skipWaiting();
});

// Activate Event - immediately clear all old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Network-First Strategy
// We fetch from the network first to guarantee the latest files (no white screens due to stale JS bundles).
// If the network is down, we fall back to the cache if available.
self.addEventListener('fetch', (e) => {
  // Only handle HTTP/HTTPS requests
  if (!e.request.url.startsWith('http')) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // If we get a valid response, cache a clone for offline use
        if (response && response.status === 200 && response.type === 'basic') {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache if network is completely offline
        return caches.match(e.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // If offline and requesting navigation, fall back to cached index
          if (e.request.mode === 'navigate') {
            return caches.match('/');
          }
        });
      })
  );
});

