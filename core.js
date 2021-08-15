//const conn = require("./connection.js")

class Core{
	constructor(conn){
		this.web = conn
	}

	Destiny2_GetDestinyManifest(){
		return this.web.APIAccess('/Destiny2/Manifest/');
	};

	Destiny2_SearchDestinyPlayer(membershipType, displayName, original){
		return this.web.APIAccess(`/Destiny2/SearchDestinyPlayer/${membershipType}/${displayName}/?returnOriginalProfile=${original}`);
		// Query string possibly not working. Maybe relating to types.
	};

	Destiny2_GetLinkedProfiles(membershipType, membershipId, allMems=false){
		return this.web.APIAccess(`/Destiny2/${membershipType}/Profile/${membershipId}/LinkedProfiles/?getAllMemberships=${allMems}`);
	};

	Destiny2_GetProfile(membershipType, destinyMembershipId, components){
		return this.web.APIAccess(`/Destiny2/${membershipType}/Profile/${destinyMembershipId}/?components=${components}`);
	};

	Destiny2_GetActivityHistory(membershipType, destinyMembershipId, characterId, count, mode, page){
		return this.web.APIAccess(`/Destiny2/${membershipType}/Account/${destinyMembershipId}/Character/${characterId}/Stats/Activities/?count=${count}&mode=${mode}&page=${page}`);
		// destinyMembershipId = membershipId
	};

	Destiny2_GetPostGameCarnageReport(activityId){
		return this.web.APIAccess(`/Destiny2/Stats/PostGameCarnageReport/${activityId}/`, this.stats=true);
		// activityId -> instanceId from Activity History
	};
}

module.exports = Core