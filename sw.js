self.addEventListener('install', function(event) {
    console.log('The service worker is being installed.');
    event.waitUntil(
        caches.open('medicine').then(function(cache) {
            return cache.addAll([
                './index.html',
                './404.html',
                './medicine_list.html',
                './js/index.css',
                './js/medicine_list.css',
                './js/404.css',
                './favicon.svg',
                './favicon.ico',
                './android-chrome-192x192.png',
                './android-chrome-512x512.png',
                './browserconfig.xml',
                './apple-touch-icon.png',
                './favicon-16x16.png',
                './favicon-32x32.png',
                './manifest.json',
                './assets/csv.svg',
                './assets/dark.svg',
                './assets/deny.svg',
                './assets/edit.svg',
                './assets/export.svg',
                './assets/import.svg',
                './assets/info.svg',
                './assets/light.svg',
                './assets/medicine.svg',
                './assets/ok.svg',
                './assets/placebo.svg',
                './assets/plus.svg',
                './assets/previous.svg',
                './assets/profile.svg',
                './assets/remove.svg',
                './assets/scan.svg',
                './js/index.js',
                './js/medicine_list.js',
                './js/quagga.min.js',
                './js/install.js',
                './js/404.js'
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    console.log('The service worker is serving the asset.');
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || caches.match('/medicine/index.html');
        })
    );
});