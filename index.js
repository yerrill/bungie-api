const https = require('https')
const fs = require("fs")

// Load API key from secrets file (synchonously)
const apikey = JSON.parse(fs.readFileSync('./secrets.json', 'utf-8'))["key"]

// Make API request
function API_GET(req_path, key){
  const API_BASE_ENDPOINT = 'www.bungie.net'
  const API_ENPOINT_PATH = '/Platform'
  
  const options = {
    hostname: API_BASE_ENDPOINT,
    port: 443,
    path: API_ENPOINT_PATH + req_path,
    method: 'GET',
    headers: {
      'X-API-Key': key
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

  req.end()
}

function Destiny2_GetDestinyManifest(){
  // https://bungie-net.github.io/multi/operation_get_Destiny2-GetDestinyManifest.html#operation_get_Destiny2-GetDestinyManifest

  API_GET('/Destiny2/Manifest/', apikey);
}

//Destiny2_GetDestinyManifest()

function Destiny2_SearchDestinyPlayer(membershipType, displayName, original){
  // https://bungie-net.github.io/multi/operation_get_Destiny2-SearchDestinyPlayer.html#operation_get_Destiny2-SearchDestinyPlayer
  // /Destiny2/SearchDestinyPlayer/{membershipType}/{displayName}/

  API_GET(`/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/?returnOriginalProfile=${original}`, apikey);
};

console.log(apikey)
Destiny2_SearchDestinyPlayer('-1', 'Prophet', 'false')