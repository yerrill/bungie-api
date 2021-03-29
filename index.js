const https = require('https')
const fs = require("fs")

// Load API key from secrets file
var apikey = null

fs.readFile('secrets.json', 'utf-8', (err, data) => {
  if (err) throw err;
  apikey = JSON.parse(data)["key"];
});


// Make API request
function API_request(req_path, req_method, key){
  const API_BASE_ENDPOINT = 'www.bungie.net'
  const API_ENPOINT_PATH = '/Platform'
  
  const data = JSON.stringify({
    'X-API-Key': key
  })
  
  const options = {
    hostname: API_BASE_ENDPOINT,
    port: 443,
    path: API_ENPOINT_PATH + req_path,
    method: req_method,
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
}

function Destiny2_GetDestinyManifest(){
  API_request('/Destiny2/Manifest/', 'GET', apikey)
}

//Destiny2_GetDestinyManifest()

function Destiny2_SearchDestinyPlayer(){
  
}