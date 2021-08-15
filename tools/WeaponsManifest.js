const fs = require("fs")

const inv = JSON.parse(fs.readFileSync('../data/DestinyInventoryItemLiteDefinition.json', 'utf8'))

const acceptableHashes = [1]
const acceptableTier = ["Legendary", "Exotic"]

var original = inv
var filtered = {}

for(const key in original){
	var categoryHashes = original[key]["itemCategoryHashes"]

	for(const hash in categoryHashes){
		if (acceptableHashes.includes(categoryHashes[hash])){
			filtered[key] = original[key]
		}
	}
}

original = filtered
filtered = {}

for(const key in original){
	var tier = original[key]["inventory"]["tierTypeName"]

	if (acceptableTier.includes(tier)){
		filtered[key] = original[key]
	}
}

fs.writeFileSync(`../data/weapons.json`, JSON.stringify(filtered), "utf8")