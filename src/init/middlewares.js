// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');

// Router
const router = require(path.join(__dirname, '..', 'routing', 'routing'));

// Middlewares init function
async function init(app) {
	app.use(bodyParser());
	app.use(router.routes());

	console.log(`=> Middlewares were initialized!`);
};