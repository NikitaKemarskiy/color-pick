// Modules
const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const { promisify } = require('util');

// Config
const config = require(path.join(__dirname, '..', '..', 'config', 'config'));

// SSL
/*const SSL = {
	key: fs.readFileSync(config.ssl.keyPath),
	cert: fs.readFileSync(config.ssl.certPath),
	ca: fs.readFileSync(config.ssl.chainPath)
};*/

// Server init function
async function init(app) {
	const httpServer = http.createServer(app.callback()); // Http server
	// const httpsServer = https.createServer(SSL, app.callback()); // Https server
	try {
		await promisify(httpServer.listen).call(httpServer, 80);
		// await promisify(httpsServer.listen).call(httpsServer, 443);
		console.log(`=> Server was initialized!`);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

// Exports
module.exports = {
	init
};
