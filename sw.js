// ─────────────────────────────────────────────────────────────────────────────
// Vortex Remastered — Service Worker
// Caches all game assets on first load for full offline play.
// Cache version: bump CACHE_NAME whenever you push an update to the game,
// so players get the new version instead of the stale cached one.
// ─────────────────────────────────────────────────────────────────────────────

const CACHE_NAME = 'vortex-v2';

// Every file in the repo that the game needs
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-512.svg',
];

// ── Install: cache all assets ─────────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  // Activate immediately rather than waiting for old tabs to close
  self.skipWaiting();
});

// ── Activate: delete any old caches ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: serve from cache, fall back to network ────────────────────────────
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      // Not in cache — fetch from network and cache for next time
      return fetch(event.request).then(response => {
        // Only cache same-origin, successful responses
        if (
          !response ||
          response.status !== 200 ||
          response.type !== 'basic'
        ) {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then(cache =>
          cache.put(event.request, responseToCache)
        );
        return response;
      });
    })
  );
});
