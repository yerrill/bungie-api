const https = require('https')
const fs = require("fs")

// Load API key from secrets file (synchonously)
const apikey = JSON.parse(fs.readFileSync('secrets.json', 'utf-8'))["key"]
console.log(apikey)

// Make API request
function API_GET(req_path, key, stats=false){
  const BUNGIE = 'bungie.net'
  const API_ENDPOINT_PATH = '/Platform'
  var API_ENDPOINT = null

  if(stats) {
    API_ENDPOINT = 'stats.' + BUNGIE
  } else {
    API_ENDPOINT = 'www.' + BUNGIE
  }
  
  const options = {
    hostname: API_ENDPOINT,
    port: 443,
    path: API_ENDPOINT_PATH + req_path,
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
};

//Destiny2_GetDestinyManifest()

function Destiny2_SearchDestinyPlayer(membershipType, displayName, original){
  // https://bungie-net.github.io/multi/operation_get_Destiny2-SearchDestinyPlayer.html#operation_get_Destiny2-SearchDestinyPlayer

  API_GET(`/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/?returnOriginalProfile=${original}`, apikey);
  // Query string possibly not working. Maybe relating to types.
};

//Destiny2_SearchDestinyPlayer('3', 'Your Name Here', true);

function Destiny2_GetLinkedProfiles(membershipType, membershipId, allMems=false){
  // https://bungie-net.github.io/multi/operation_get_Destiny2-GetLinkedProfiles.html#operation_get_Destiny2-GetLinkedProfiles

  API_GET(`/Destiny2/${membershipType}/Profile/${membershipId}/LinkedProfiles/?getAllMemberships=${allMems}`, apikey)
};

//Destiny2_GetLinkedProfiles('2', 'MemberId', false)

function Destiny2_GetProfile(membershipType, destinyMembershipId, components){
  //https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile
  //https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html#schema_Destiny-DestinyComponentType

  API_GET(`/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=${components}`, apikey)
}

//Destiny2_GetProfile('2', 'MemID', [200])

function Destiny2_GetActivityHistory(membershipType, destinyMembershipId, characterId, count, mode, page){
  // https://bungie-net.github.io/multi/operation_get_Destiny2-GetActivityHistory.html#operation_get_Destiny2-GetActivityHistory
  // https://bungie-net.github.io/multi/schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType.html#schema_Destiny-HistoricalStats-Definitions-DestinyActivityModeType

  API_GET(`/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/?count=${count}&mode=${mode}&page=${page}`, apikey)
}

//Destiny2_GetActivityHistory('2', 'memID', 'charID', 1, 32, 0)

function Destiny2_GetPostGameCarnageReport(activityId){
  // https://bungie-net.github.io/multi/operation_get_Destiny2-GetPostGameCarnageReport.html#operation_get_Destiny2-GetPostGameCarnageReport

  API_GET(`/Destiny2/Stats/PostGameCarnageReport/${activityId}/`, apikey, stats=true)
}

//Destiny2_GetPostGameCarnageReport("activityId (instanceID)")