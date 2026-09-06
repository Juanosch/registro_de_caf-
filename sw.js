const CACHE = 'mis-cafes-v1';
const ASSETS = [
  '/registro_de_caf-/',
  '/registro_de_caf-/index.html',
  '/registro_de_caf-/manifest.json',
  '/registro_de_caf-/icon-192.png',
  '/registro_de_caf-/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
