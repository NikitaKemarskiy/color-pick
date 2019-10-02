// Modules
const path = require('path');
const bodyParser = require('koa-bodyparser');
const koaRouter = require('@koa/router');
const koaMulter = require('@koa/multer');

// Libs
const colors = require(path.join(__dirname, '..', 'libs', 'colors'));

// Router
const router = new koaRouter();

// Multer
const upload = koaMulter({
	storage: koaMulter.memoryStorage(),
	limits: {
		fields: 0,
		files: 1,
		fileSize: 1024 * 1024 * 5 // 5 MB
	}
});

// Routes
router.get('/', (ctx) => { // Home page
	ctx.body = 'Home page';
});

router.post('/colors', upload.single('image'), (ctx) => {
	console.dir(ctx.file);
	ctx.body = 'Image was send'
});

// Exports
module.exports = router;