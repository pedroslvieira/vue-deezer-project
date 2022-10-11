const cacheName = 'offline';
const contentToCache = 'offline.html';

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.add(new Request(contentToCache, {cache: 'reload'}));
    })());
});