const CACHE_NAME = 'switchee-troubleshooting-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/global.css',
  '/leaf.png', // Add this line
  '/history.html',
  '/builder.html',
  '/situation1.html',
  '/situation2.html',
  '/situation3.html',
  '/situation4-1.html',
  '/situation4-2.html',
  '/situation5.html',
  '/econa/index.html',
  '/econa/builder.html',
  '/mobile/index.html',
  '/mobile/builder.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Return cached response if available
        }
        return fetch(event.request); // Otherwise, fetch from network
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});