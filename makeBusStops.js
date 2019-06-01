var fetch = require('node-fetch')

var obj = {
   timestamp: 0,
   stops: []
};

var url = 'https://wt-5a6110d2d10be45a74f37503ca30869c-0.sandbox.auth0-extend.com/get-bus-stops?skip='
var value = []
var timestamp = null;

const request = async (numSkip) => {
    const response = await fetch(url + numSkip, {
            method: 'GET',
            headers: {
              'accept': 'application/json'
            }
        });
    const result = await response.json();
    if (!timestamp){ timestamp = result.timestamp }
    if (result.data.value.length){
        obj.stops.push(...result.data.value);
    }
    console.log(numSkip);
    return (result.data.value.length > 0)
}

async function repeat() {
    var qq = true
    var start = 0
    do {
        qq = await request(start)
        start += 500
    } while (qq === true);
    return true;
}

async function doStuff() {
    const aa = await repeat();
    obj.timestamp = timestamp;
    var json = JSON.stringify(obj);
    var callback = function() { console.log('donezo'); }
    var fs = require('fs');
    fs.writeFile('BusStops.json', json, 'utf8', callback);
}

doStuff();
