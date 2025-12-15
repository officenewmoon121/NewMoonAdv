// Service Worker for New Moon PWA
const CACHE_NAME = 'newmoon-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/products.html',
  '/services.html',
  '/portfolio.html',
  '/companies.html',
  '/about.html',
  '/contact.html',
  '/faq.html',
  '/testimonials.html',
  '/blog.html',
  '/css/variables.css',
  '/css/style.css',
  '/css/animations.css',
  '/css/nav.css',
  '/nav.html',
  '/footer.html'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch Strategy: Network First, fallback to Cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone response
        const responseClone = response.clone();
        
        // Update cache
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseClone);
        });
        
        return response;
      })
      .catch(() => {
        // If network fails, return from cache
        return caches.match(event.request);
      })
  );
});
