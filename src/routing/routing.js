// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('@koa/router');

// Libs
const colors = require(path.join(__dirname, '..', 'libs', 'colors'));

// Multer
const upload = require(path.join(__dirname, '..', 'init', 'multer'));

// Router
const router = new koaRouter();

// Routes
router.get('/', (ctx) => {
	// Home page
	ctx.body = 'Home page';
});

router.post('/colors', async (ctx) => {
	try {
		const file = await upload(ctx);
		ctx.body = 'Image was send';
	} catch (err) {
        /*
         * File didn't pass multer filter
         * Definitely it's too large or
         * has wrong extension (not JPEG / JPG)
        */
	}
});

// Exports
module.exports = router;
