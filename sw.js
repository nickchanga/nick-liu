/* Shiti app shell. Generated from this build's checksummed assets. */
const PREFIX = 'shiti-' + self.registration.scope.replace(/[^a-z0-9]/gi, '_') + '-';
const CACHE = PREFIX + "39f202414c30";
const ASSETS = ["assets/index-BilgkUrT.css","assets/index-djsAna0q.js","favicon.svg","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest"].map(path => new URL(path, self.registration.scope).href);
const INDEX = new URL('index.html', self.registration.scope).href;
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS))));
self.addEventListener('activate', event => event.waitUntil(
  caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim())
));
self.addEventListener('message', event => { if (event.data?.type === 'SKIP_WAITING') self.skipWaiting(); });
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || !request.url.startsWith(self.registration.scope)) return;
  if (request.mode === 'navigate') {
    const appPaths = [new URL('./', self.registration.scope).pathname, new URL('index.html', self.registration.scope).pathname];
    if (!appPaths.includes(url.pathname)) return;
    event.respondWith(fetch(request).then(response => {
      if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(INDEX, copy))); }
      return response;
    }).catch(() => caches.match(INDEX).then(cached => cached || new Response('请先联网打开拾题，完成离线准备。', {status: 503, headers: {'Content-Type': 'text/plain; charset=utf-8'}}))));
    return;
  }
  if (!ASSETS.includes(url.href)) return;
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(request, copy))); }
    return response;
  })));
});
