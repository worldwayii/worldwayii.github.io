// currency converter
var currencyConvert = function currencyConvert() {
    var from = document.getElementById('fromCurrency').value;
    var to = document.getElementById('toCurrency').value;
    var query = from + '_' + to;
    var xmlhttp = new XMLHttpRequest();
    var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=ultra';
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = xmlhttp.responseText;
            var jsResult = JSON.parse(result);
            var ans = jsResult[query];
            var amt_from = document.getElementById('amount').value;
            document.getElementById('reslt').value = ans * amt_from;

            dbPromise.then(function (db) {
                var tx = db.transaction('currencies', 'readwrite');
                var currenciesStore = tx.objectStore('currencies');
                currenciesStore.put(ans, query);
                return tx.complete;
            });
        } else if (xmlhttp.readyState !== 2 && xmlhttp.readyState !== 3) {
            dbPromise.then(function (db) {
                var currenciesStore = db.transaction('currencies').objectStore('currencies');
                return currenciesStore.get(query).then(function (val) {
                    var amt_frm = document.getElementById('amount').value;
                    document.getElementById('reslt').value = val * amt_frm;
                });
            });
        }
    };
};