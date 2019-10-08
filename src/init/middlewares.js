// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');

// Router
const router = require(path.join(__dirname, '..', 'routing', 'routing'));

// Middlewares init function
async function init(app) {
	// Middlewares
	app.use(bodyParser()); // Body parser

	app.use(async (ctx, next) => {
		// https redirect from http
		if (ctx.secure) {
			await next();
		} else {
			const httpsPath = `https://${ctx.host}${ctx.url}`;
			ctx.redirect(httpsPath);
		}
	});

	// Routes
	app.use(router.routes());

	console.log(`=> Middlewares were initialized!`);
}

// Exports
module.exports = {
	init
};
