const https = require('https')
const fs = require("fs")
const bInt = require("./BungieInterface.js")

// Load API key from secrets file (synchonously)
const key = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))["key"]
console.log(key)

var bungie = new bInt(key);

bungie.on('BungieReturn', (d)=> {
  console.log(JSON.stringify(d, null, 2));
});


bungie.Destiny2_GetDestinyManifest()
