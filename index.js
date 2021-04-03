const https = require('https')
const fs = require("fs")
const bInt = require("./BungieInterface.js")

// Load API key from secrets file (synchonously)
const key = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))["key"]
console.log(key)

var bungie = new bInt(key);

//Destiny2_GetDestinyManifest()

//Destiny2_SearchDestinyPlayer('3', 'Your Name Here', true);

//Destiny2_GetLinkedProfiles('2', 'MemberId', false)

//Destiny2_GetProfile('2', 'MemID', [200])

//Destiny2_GetActivityHistory('2', 'memID', 'charID', 1, 32, 0)
bungie.on('BungieReturn', (d)=> {
  console.log(JSON.stringify(d, null, 2));
});

bungie.Destiny2_GetPostGameCarnageReport("8237845454")
