self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('medicine').then(function (cache) {
            return cache.addAll([
                './index.html',
                './index.css',
                './favicon.svg',
                './images/icons/icon-180x180.png',
                './images/icons/icon-192x192.png',
                './images/icons/icon-256x256.png',
                './images/icons/icon-384x384.png',
                './images/icons/icon-512x512.png',
                './manifest.json',
                './images/icons/facebook.svg',
                './images/icons/instagram.svg',
                './images/icons/info.svg',
                './images/icons/invisible.svg',
                './images/icons/plus.svg',
                './images/icons/ranking.svg',
                './images/icons/remove.svg',
                './images/icons/stats.svg',
                './images/icons/twitter.svg',
                './images/icons/visible.svg',
                './js/index.js',
                './js/medicine_list.js',
                './js/quagga.min.js',
                './js/install.js',
                './js/404.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || caches.match('/medicine/index.html');
        })
    );
});