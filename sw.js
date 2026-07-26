// Service Worker for UMC Minot Website
// Provides basic caching for offline functionality

const CACHE_NAME = 'umc-minot-v22';
const urlsToCache = [
    '/',
    '/index.html',
    '/bible-study.html',
    '/pastoral-care.html',
    '/calendar.html',
    '/invite.ics',
    '/styles.css',
    '/script.js',
    '/images/umc-logo.png',
    '/images/church-exterior.jpg',
    '/images/worship-service.jpg',
    '/images/food-pantry.jpg',
    '/images/community-dinner.jpg',
    '/images/habitat-build.jpg',
    'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500;600;700&family=Changa+One:wght@400&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version or fetch from network
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});