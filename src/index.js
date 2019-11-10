// Modules
const path = require('path');
const Koa = require('koa');

// Init
const server = require(path.join(__dirname, 'init', 'server'));
const middlewares = require(path.join(__dirname, 'init', 'middlewares'));

// Koa
const app = new Koa();

async function main() {
	await server.init(app); // Init server
	await middlewares.init(app); // Init middlewares
}

main();

console.log('===================');
console.log(process.env.NODE_ENV);
console.log(process.env.DOCKER_USERNAME);
console.log(process.env.DOCKER_PASSWORD);
console.log('===================');
