const CACHE_NAME = "pomodoro-cache-v1";
const urlsToCache = [
    "/pomodoro/",
    "/pomodoro/index.html",
    "/pomodoro/script.js",
    "/pomodoro/style.css",
    "/pomodoro/assets/bgg.png",
    "/pomodoro/assets/5mins.png",
    "/pomodoro/assets/10mins.png",
    "/pomodoro/assets/15mins.png",
    "/pomodoro/assets/25mins.png",
    "/pomodoro/assets/stop.png",
    "/pomodoro/assets/start.png",
    "/pomodoro/assets/timesUp.mp3",
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