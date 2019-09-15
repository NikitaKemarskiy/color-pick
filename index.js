// Modules
const path = require('path');

// Libs
const { getColors, getTop, getDifference } = require(path.join(__dirname, 'libs', 'colors'));

// Constants
const IMG_PATH = path.join(__dirname, 'img', 'audi.jpg');

async function main() {
    const colors = await getColors(IMG_PATH); // Get the colors array
    const stats = new Map(); // Create stats Map

    for (let i = 0; i < colors.length - 1; i++) {
        if (stats.has(colors[i].number)) { // Color is already in Map
            const data = stats.get(colors[i].number); // Get value object
            data.count++; // Increment count (number of repeats)
        } else {
            const { red, green, blue } = colors[i];
            stats.set(colors[i].number, { // Set value object
                red,
                green,
                blue,
                count: 1
            });
        }
    }

    const top = getTop(stats, 2000); // Get top colors

    top.forEach((item) => {
        console.log(item);
    });
}

main();