/* eslint-disable no-console, semi */
// opens BusStops.json and converts it into a lookup table json

const fs = require('fs')
fs.readFile('BusStops.json', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  const mapping = {};
  const d = JSON.parse(data);
  d.stops.forEach((element) => {
    mapping[element.BusStopCode] = element.Description;
  });

  const j = JSON.stringify(mapping);
  const callback = () => { console.log('donezo'); }
  fs.writeFile('StopLookupName.json', j, 'utf8', callback);
});
