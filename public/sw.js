importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

const CACHE_NAME = 'minint-prep-v2';
const KB_CACHE_NAME = 'kb-data-v1';

// Workbox Configuration & Fallback Setup
if (typeof workbox !== 'undefined' && workbox) {
  console.log('🚀 [Workbox] Carregado e ativo no Service Worker.');

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // 1. Estratégia Stale-While-Revalidate para dados e endpoints da KnowledgeBase
  workbox.routing.registerRoute(
    ({ url }) =>
      url.pathname.includes('/api/knowledge-base') ||
      url.pathname.includes('/data/') ||
      url.pathname.endsWith('.json'),
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: KB_CACHE_NAME,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Dias de Validade no Cache
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 2. Estratégia Stale-While-Revalidate para todos os Assets Estáticos da Aplicação (JS, CSS, Fontes, Imagens)
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === 'script' ||
      request.destination === 'style' ||
      request.destination === 'image' ||
      request.destination === 'font' ||
      request.destination === 'manifest',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: CACHE_NAME,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  // 3. Estratégia Network-First para a Navegação SPA (App Shell index.html)
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'minint-appshell-v2',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );
} else {
  console.warn('⚠️ Workbox CDN indisponível. A executar Service Worker nativo para cache offline.');
}

// Essential App Shell & Static assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.svg',
  '/api/knowledge-base.json'
];

// Install Event - Precache core App Shell resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching App Shell & KnowledgeBase assets');
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[Service Worker] Aviso de pre-cache parcial:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== KB_CACHE_NAME && !cacheName.startsWith('workbox-')) {
            console.log('[Service Worker] A limpar versão antiga de cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Native Fetch Event Fallback para requisições offline
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // Stale-While-Revalidate Fallback
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          return cachedResponse || caches.match('/index.html') || caches.match('/');
        });

      return cachedResponse || fetchPromise;
    })
  );
});

// Message Listener
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});


