// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');

// Router
const router = require(path.join(__dirname, '..', 'routing', 'routing'));

// Middlewares init function
async function init(app) {
	// Middlewares
	app.use(bodyParser());
	app.use((ctx, next) => {
		if (ctx.secure) {
			next();
		} else {
			const httpsPath = `https://${ctx.host}${ctx.url}`;
			ctx.redirect(httpsPath);
		}
	});
	
	// Routes
	app.use(router.routes());

	console.log(`=> Middlewares were initialized!`);
};

// Exports
module.exports = {
	init
};