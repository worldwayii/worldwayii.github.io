'use strict';

// SW cache name
var currencyCache = 'abdul_sw';

// SW Files to cache
var cacheFiles = ['/', 
    '/index.html', 
    '/js', 
    '/css',  
    '/less/style.less',
    '/js/currencyConvert',
    '/js/sw.js',
    '/js/sw_main.js',
    'js/index.js',
    'css/style.css'
];

// install event
self.addEventListener('install', function (event) {
    event.waitUntil(caches.open(currencyCache).then(function (cache) {
        return cache.addAll(cacheFiles);
    }));
});

// Added Vent
self.addEventListener('activate', function (event) {
    // wait until we get all caches and delete; except the current cache
    event.waitUntil(caches.keys().then(function (currencyCaches) {
        return Promise.all(currencyCaches.map(function (olderCurrencyCaches) {
            if (olderCurrencyCaches !== currencyCache) {
                return caches.delete(olderCurrencyCaches);
            }
        }));
    }));
});

// fetch event
self.addEventListener('fetch', function (event) {
    // respond with a matching request from the cache
    event.respondWith(caches.match(event.request).then(function (response) {
        if (response) {
            return response;
        } else return fetch(event.request);

        // if we dont have the response in our cache, we cache the reponse from network
        var requestClone = event.request.clone();
        fetch(requestClone).then(function (response) {
            if (!response) {
                return response;
            } else {
                var responseClone = response.clone();
                caches.open(currencyCache).then(function (cache) {
                    cache.put(event.request, responseClone);
                    return response;
                });
            }
        });
    }));
});