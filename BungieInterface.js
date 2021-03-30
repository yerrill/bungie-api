const https = require('https');


class BInterface{
	constructor(key){
		this.apikey = key;
	}

	// Make API request
	API_GET(req_path, stats=false){
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
				'X-API-Key': this.apikey
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
	};

	/*
		Bungie's Destiny 2 API calls (Limited)
	*/

	Destiny2_GetDestinyManifest(){
		this.API_GET('/Destiny2/Manifest/');
	};

	Destiny2_SearchDestinyPlayer(membershipType, displayName, original){
		this.API_GET(`/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/?returnOriginalProfile=${original}`);
		// Query string possibly not working. Maybe relating to types.
	};

	Destiny2_GetLinkedProfiles(membershipType, membershipId, allMems=false){
		this.API_GET(`/Destiny2/${membershipType}/Profile/${membershipId}/LinkedProfiles/?getAllMemberships=${allMems}`);
	};

	Destiny2_GetProfile(membershipType, destinyMembershipId, components){
		this.API_GET(`/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=${components}`);
	};

	Destiny2_GetActivityHistory(membershipType, destinyMembershipId, characterId, count, mode, page){
		this.API_GET(`/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/?count=${count}&mode=${mode}&page=${page}`);
		// destinyMembershipId = membershipId
	};

	Destiny2_GetPostGameCarnageReport(activityId){
		this.API_GET(`/Destiny2/Stats/PostGameCarnageReport/${activityId}/`, this.stats=true);
		// activityId -> instanceId from Activity History
	};
};

module.exports = BInterface;