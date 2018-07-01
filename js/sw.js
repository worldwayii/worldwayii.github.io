// ServiceWorker Registration Begins Hetre
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw_main.js');
}

// IndexedDB - opening idb
var dbPromise = idb.open('currencyDB', 1, function (upgradeDB) {
    upgradeDB.createObjectStore('currencies');
});