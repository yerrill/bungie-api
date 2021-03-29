const https = require('https')
const fs = require("fs")

// Load API key from secrets file
var key = null

fs.readFile('secrets.json', 'utf-8', (err, data) => {
  if (err) throw err;
  key = JSON.parse(data)["key"];
});


// Make API request
const API_BASE_ENDPOINT = 'www.bungie.net'
const API_ENPOINT_PATH = '/Platform'

const data = JSON.stringify({
  'X-API-Key': key
})

const options = {
  hostname: API_BASE_ENDPOINT,
  port: 443,
  path: API_ENPOINT_PATH + '/Destiny2/Manifest/',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.write(data)
req.end()