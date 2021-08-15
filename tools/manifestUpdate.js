const bungie = require("../index.js")
const fs = require("fs")

function write(path, data){
	fs.writeFileSync(`../data/${path}`, data, "utf8")
	console.log(`Wrote to data/${path}`)
}

const key = JSON.parse(fs.readFileSync('../secrets.json', 'utf8'))["key"]

const b = new bungie(key)
b.core.Destiny2_GetDestinyManifest()
.then(r => {
	write('manifest.json', JSON.stringify(r))
})