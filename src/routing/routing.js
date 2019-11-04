// Modules
const path = require('path');
const sendFile = require('koa-sendfile');
const KoaRouter = require('@koa/router');

// Libs
const colors = require(path.join(__dirname, '..', 'libs', 'colors'));

// Multer
const upload = require(path.join(__dirname, '..', 'init', 'multer'));

// Router
const router = new KoaRouter();

// Constants
const STATIC_PATH = path.join(__dirname, '..', '..', 'public');

// Routes
router.get('/', async(ctx) => {
	await sendFile(ctx, path.join(STATIC_PATH, 'index.html'));
});

router.post('/colors', async(ctx) => {
	const { getColors, pickColors } = colors;
	try {
		const data = await upload(ctx);
		const colors = getColors(data.file.buffer);
		const picked = pickColors(colors, 32);

		ctx.type = 'application/json';
		ctx.body = picked;
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
