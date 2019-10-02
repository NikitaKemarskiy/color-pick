// Modules
const path = require('path');
const koaRouter = require('koa-router');

// Libs
const colors = require(path.join(__dirname, '..', 'libs', 'colors'));

// Router
const router = new koaRouter();

// Routes
router.get('/', (ctx) => {
	ctx.body = 'Hello, World!';
});

router.post('');

// Exports
module.exports = router;