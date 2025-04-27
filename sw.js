const CACHE_NAME = 'switchee-cache-v1';
const ASSETS = [
  '/', '/index.html', '/global.css', '/leaf.png', '/manifest.json', '/sw.js',
  '/builder.html','/history.html',
  '/situation1.html','/situation2.html','/situation3.html','/situation4-1.html','/situation4-2.html','/situation5.html','/situation6.html',
  '/mobile/index.html','/mobile/builder.html',
  '/econa/index.html','/econa/builder.html'
];
self.addEventListener('install', e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate', e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
