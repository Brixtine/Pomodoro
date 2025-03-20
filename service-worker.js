const CACHE_NAME = "pomodoro-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/script.js",
    "/style.css",
    "/assets/bgg.png",
    "/assets/5mins.png",
    "/assets/10mins.png",
    "/assets/15mins.png",
    "/assets/25mins.png",
    "/assets/stop.png",
    "/assets/start.png",
    "/assets/timesUp.mp3",
    "/assets/icon-192.png",
    "/assets/icon-512.png"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
            caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
            caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if(!cacheWhitelist.includes(cacheName)){
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});