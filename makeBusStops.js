const fetch = require('node-fetch')

const obj = {
  timestamp: 0,
  stops: []
}

const url = 'https://wt-5a6110d2d10be45a74f37503ca30869c-0.sandbox.auth0-extend.com/get-bus-stops?skip='
// const value = []
let timestamp = null

const request = async (numSkip) => {
  const response = await fetch(url + numSkip, {
    method: 'GET',
    headers: {
      accept: 'application/json'
    }
  })
  const result = await response.json()
  if (!timestamp) { timestamp = result.timestamp }
  if (result.data.value.length) {
    obj.stops.push(...result.data.value)
  }
  // console.log(numSkip)
  return (result.data.value.length > 0)
}

async function repeat() {
  let qq = true
  let start = 0
  do {
    qq = await request(start)
    start += 500
  } while (qq === true)
  return true
}

async function doStuff() {
  await repeat()
  obj.timestamp = timestamp
  const json = JSON.stringify(obj)
  const callback = function () {
    // eslint-disable-next-line no-console
    console.log('donezo')
  }
  const fs = require('fs')
  fs.writeFile('BusStops.json', json, 'utf8', callback)
}

doStuff()
