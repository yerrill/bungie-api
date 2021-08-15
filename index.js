const https = require('https')
const fs = require("fs")
const EventE = require('events');
const conn = require("./connection.js")

//API CALLS
const core = require("./core.js")

// Load API key from secrets file (synchonously)
//const key = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))["key"]
//console.log(key)


class Bungie{
	constructor(key){
		this.apikey = key;
		this.Event = new EventE();
		this.web = new conn(this.apikey)
		this.API_core = new core(this.web)
	}

	get core(){
		return this.API_core;
	}
};

/*
const b = new Bungie(key)
b.core.Destiny2_GetDestinyManifest()
.then(r => console.log(r))*/

module.exports = Bungie;