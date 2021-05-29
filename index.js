const https = require('https')
const fs = require("fs")
const bInt = require("./BungieInterface.js")
const EventEm = require('events');

// Load API key from secrets file (synchonously)
//const key = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))["key"]
//console.log(key)

/*
interface.on('BungieReturn', (d)=> {
  			console.log(JSON.stringify(d, null, 2));
		});*/

class Bungie{
	constructor(key){
		this.interface = new bInt(key);
		this.Events = new EventEm();
	};

	get apiInterface() {
		return this.interface;
	};

	getManifest(callback) {
		this.interface.on('BungieReturn', callback); // Register Callback function for return
		this.interface.Destiny2_GetDestinyManifest();
	};
};

module.exports = Bungie;