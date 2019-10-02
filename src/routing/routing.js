// Modules
const path = require('path');
const koaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');

// Libs
const colors = require(path.join(__dirname, '..', 'libs', 'colors'));

// Router
const router = new koaRouter();

// Routes
router.get('/', (ctx) => { // Home page
	ctx.body = ctx.path + ' ' + ctx.url;
});

router.post('/colors', (ctx) => {
	console.dir(ctx.request.body);
});

// Exports
module.exports = router;