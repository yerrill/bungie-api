const fs = require("fs")

function hasOneOf(search, key){
  var contains = false;

  for(const item in search){
    if(contains){ break; }

    for(const keyItem in key){
      console.log(`${search[item]} ${key[keyItem]}  ${search[item] === key[keyItem]}`)
      if(search[item] === key[keyItem]){
        contains = true
        break
      }
    }
  }

  return contains
}

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