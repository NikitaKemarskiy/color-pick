// Modules
const path = require('path');
const koaMulter = require('@koa/multer');

// Multer
const upload = koaMulter({
	storage: koaMulter.memoryStorage(),
	fileFilter(req, file, callback) {
		const ext = path.extname(file.originalname);
		if (ext !== '.jpg' && ext !== '.jpeg') {
			return callback(new Error('Only JPEG are allowed'));
		}
		callback(null, true);
	},
	limits: {
		fields: 0,
		files: 1,
		fileSize: 1024 * 1024 * 5 // 5MB
	}
}).single('image');

// Exports
module.exports = upload;
