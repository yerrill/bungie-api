const https = require("https")

class Web{
	constructor(bungieKEY){
		this.APIKEY = bungieKEY
	}

	httpsGET(headers){
		let p = new Promise(async (resolve, reject) => {

			const options = headers

			const req = await https.request(options, res => {
				console.log(`statusCode: ${res.statusCode}`)
				var buff = []

				res.on('data', d => {
					buff.push(d);
				})

				res.on('end', () => {
					resolve(JSON.parse(Buffer.concat(buff).toString("utf8")));
				})
			})

			req.on('error', error => {reject(error)});
			req.end();
			})

		return p;
	}

	APIAccess(req_path, stats=false){
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
				'X-API-Key': this.APIKEY
			}
		}

		return this.httpsGET(options)
	}
}

module.exports = Web