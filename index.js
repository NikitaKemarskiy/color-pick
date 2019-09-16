// Modules
const path = require('path');

// Libs
const { getColors, pickColors, getDifference } = require(path.join(__dirname, 'libs', 'colors'));

// Constants
const IMG_PATH = path.join(__dirname, 'img', 'colorful.jpg');

async function main() {
    const colors = await getColors(IMG_PATH); // Get the colors array
    const picked = pickColors(colors, 16);
}

main();